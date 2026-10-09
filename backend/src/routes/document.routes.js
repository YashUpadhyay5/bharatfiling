import express from 'express';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';
import { authenticate } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { processDocumentOCR } from '../services/ocrPipeline.js';
import { createAndDispatchNotification } from '../services/notification.service.js';

const router = express.Router();

// Upload document for an application
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const { application_id, document_type } = req.body;
    if (!application_id || !document_type) {
      return res.status(400).json({ success: false, message: 'application_id and document_type are required.' });
    }

    const app = db.getApplications().find((a) => a.id === application_id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    // Process AI / OCR
    const ocrResult = await processDocumentOCR({
      filePath: file.path,
      originalName: file.originalname,
      documentType: document_type,
      applicationData: app.fields_data || {},
    });

    const docId = `doc_${uuidv4().slice(0, 8)}`;
    const relativeUrl = `/uploads/${file.filename}`;

    const newDoc = {
      id: docId,
      application_id,
      user_id: req.user.id,
      document_type,
      original_name: file.originalname,
      file_name: file.filename,
      file_path: file.path,
      file_url: relativeUrl,
      mime_type: file.mimetype,
      file_size: file.size,
      status: (ocrResult.confidence < 0.6 || (ocrResult.mismatch_warnings && ocrResult.mismatch_warnings.length > 0)) ? 'FLAGGED_MISMATCH' : 'AI_CHECKED',
      document_classification: ocrResult.document_classification || document_type,
      ocr_extracted_data: ocrResult.extracted_fields || {},
      ai_confidence: typeof ocrResult.confidence === 'number' ? ocrResult.confidence : 0.95,
      mismatch_flags: ocrResult.mismatch_warnings || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save document
    const docs = db.getDocuments();
    // If a document of the same type already exists for this app, replace or append
    const existingIndex = docs.findIndex((d) => d.application_id === application_id && d.document_type === document_type);
    if (existingIndex !== -1) {
      docs[existingIndex] = newDoc;
    } else {
      docs.push(newDoc);
    }
    db.saveDocuments(docs);

    // Add Timeline Event
    const events = db.getCaseEvents();
    events.push({
      id: `evt_${uuidv4().slice(0, 8)}`,
      application_id,
      title: `Document Uploaded: ${document_type.replace(/_/g, ' ')}`,
      description: `${file.originalname} processed by AI/OCR pipeline with ${(newDoc.ai_confidence * 100).toFixed(0)}% confidence.`,
      actor_role: 'CUSTOMER',
      created_at: new Date().toISOString(),
    });
    db.saveCaseEvents(events);

    // Persistent Notification to CA Desk
    createAndDispatchNotification({
      recipient_id: null,
      recipient_role: 'CA',
      application_id,
      type: 'DOCUMENT_UPLOADED',
      title: 'Customer Uploaded Document 📄',
      message: `${req.user.full_name || 'Customer'} uploaded ${document_type.replace(/_/g, ' ')} for Application #${app.application_number || app.id}.`,
      severity: 'info',
      action_url: `/ca/dashboard?caseId=${application_id}`,
      metadata: { document_type, filename: file.originalname },
      dedup_key: `DOC_UPLOAD_${docId}`,
    });

    res.status(201).json({
      success: true,
      message: 'Document uploaded and verified by AI pipeline successfully.',
      document: newDoc,
      ocr: ocrResult,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Document upload failed.', error: err.message });
  }
});

// List documents for an application
router.get('/application/:appId', authenticate, (req, res) => {
  try {
    const { appId } = req.params;
    const docs = db.getDocuments().filter((d) => d.application_id === appId);
    res.json({
      success: true,
      documents: docs,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve documents.', error: err.message });
  }
});

// Delete document
router.delete('/:id', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const docs = db.getDocuments();
    const index = docs.findIndex((d) => d.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    const doc = docs[index];
    // Remove local file if exists
    if (fs.existsSync(doc.file_path)) {
      try {
        fs.unlinkSync(doc.file_path);
      } catch (e) {}
    }

    docs.splice(index, 1);
    db.saveDocuments(docs);

    res.json({
      success: true,
      message: 'Document deleted successfully.',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete document.', error: err.message });
  }
});

// CA status update on document (Approve, Reject, Request Correction)
router.put('/:id/status', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const { status, ca_notes } = req.body;

    const docs = db.getDocuments();
    const doc = docs.find((d) => d.id === id);

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    doc.status = status || doc.status;
    doc.ca_notes = ca_notes || doc.ca_notes;
    doc.updated_at = new Date().toISOString();
    db.saveDocuments(docs);

    res.json({
      success: true,
      message: `Document status updated to ${status}.`,
      document: doc,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Status update failed.', error: err.message });
  }
});

export default router;
