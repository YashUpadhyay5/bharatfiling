import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/db.js';
import { authenticate, optionalAuth } from '../../middleware/auth.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves GST applications for the authenticated user.
 */
router.get('/applications', authenticate, (req, res) => {
  try {
    const apps = db.getApplications().filter((a) => a.user_id === req.user.id);
    res.json({
      success: true,
      applications: apps,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve applications.', error: err.message });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single application dossier with uploaded documents and timeline.
 */
router.get('/applications/:id', optionalAuth, (req, res) => {
  try {
    const { id } = req.params;
    const app = db.getApplications().find((a) => a.id === id || a.application_number === id);

    if (!app) {
      return res.status(404).json({ success: false, message: 'GST Application not found.' });
    }

    // Role check: if authenticated customer, enforce ownership
    if (req.user && req.user.role === 'CUSTOMER' && app.user_id !== req.user.id && app.user_id !== 'usr_guest_lead') {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    const docs = db.getDocuments().filter((d) => d.application_id === app.id);
    const events = db.getCaseEvents().filter((e) => e.application_id === app.id);

    res.json({
      success: true,
      application: app,
      documents: docs,
      timeline: events,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving application.', error: err.message });
  }
});

/**
 * POST /applications/:id/documents
 * Uploads a statutory document to the filing dossier.
 */
router.post('/applications/:id/documents', optionalAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { document_type, title, file_url, file_name } = req.body;

    const newDoc = {
      id: `doc_${uuidv4().slice(0, 8)}`,
      application_id: id,
      document_type: document_type || 'GENERAL',
      title: title || 'Uploaded Document',
      file_name: file_name || 'document.pdf',
      file_url: file_url || `/uploads/${id}/${document_type || 'doc'}.pdf`,
      verification_status: 'VERIFIED',
      uploaded_at: new Date().toISOString(),
    };

    const docs = db.getDocuments();
    docs.push(newDoc);
    db.saveDocuments(docs);

    // Update application status to CA_REVIEW if all documents in place
    const apps = db.getApplications();
    const appIndex = apps.findIndex((a) => a.id === id);
    if (appIndex !== -1) {
      apps[appIndex].customer_status = 'CA Review';
      apps[appIndex].internal_status = 'CA_REVIEW';
      apps[appIndex].updated_at = new Date().toISOString();
      db.saveApplications(apps);
    }

    res.status(201).json({
      success: true,
      message: 'Document uploaded to dossier successfully.',
      document: newDoc,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to upload document.', error: err.message });
  }
});

/**
 * GET /applications/:id/timeline
 * Retrieves timeline events for application tracking.
 */
router.get('/applications/:id/timeline', optionalAuth, (req, res) => {
  try {
    const { id } = req.params;
    const events = db.getCaseEvents().filter((e) => e.application_id === id);
    res.json({
      success: true,
      timeline: events,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch timeline.', error: err.message });
  }
});

export default router;
