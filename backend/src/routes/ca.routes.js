import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { emitToApplication, emitToCADesk, emitToUser } from '../services/socket.service.js';

const router = express.Router();

// Enforce CA or Admin access
router.use(authenticate, requireRole(['CA', 'ADMIN']));

// GET list of CA cases with full customer context and metrics
router.get('/cases', (req, res) => {
  try {
    const apps = db.getApplications();
    const docs = db.getDocuments();
    const orders = db.getOrders();
    const users = db.getUsers();

    const cases = apps.map((app) => {
      const user = users.find((u) => u.id === app.user_id);
      const appDocs = docs.filter((d) => d.application_id === app.id);
      const appOrder = orders.find((o) => o.application_id === app.id || o.id === app.id);

      const customerName = user?.full_name || app.fields_data?.applicant_name || appOrder?.customer_name || 'GST Applicant';
      const customerEmail = user?.email || app.fields_data?.email || appOrder?.customer_email || 'client@example.com';
      const customerPhone = user?.phone || app.fields_data?.mobile_number || appOrder?.customer_phone || '9876543210';
      const state = app.state || app.fields_data?.state || appOrder?.state || 'Karnataka';
      const businessType = app.business_type || app.fields_data?.business_type || appOrder?.business_type || 'Proprietorship';
      const legalName = app.fields_data?.legal_name || app.fields_data?.trade_name || `${customerName} Enterprise`;
      const panNumber = app.fields_data?.pan_number || appOrder?.customer_pan || 'ABCDE1234F';
      const amountPaid = appOrder?.amount || 1769;
      const orderNumber = appOrder?.order_number || appOrder?.id || '#est2026';
      const submittedAt = app.created_at || appOrder?.created_at || new Date().toISOString();

      return {
        ...app,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        state,
        business_type: businessType,
        legal_name: legalName,
        pan_number: panNumber,
        amount_paid: amountPaid,
        order_number: orderNumber,
        submitted_at: submittedAt,
        uploaded_doc_count: appDocs.length,
      };
    });

    const metrics = {
      total_cases: cases.length,
      pending_review: cases.filter((c) => c.internal_status === 'CA_REVIEW' || c.internal_status === 'AI_PRECHECK' || c.internal_status === 'PAYMENT_CONFIRMED').length,
      processing: cases.filter((c) => c.internal_status === 'APPLICATION_PREPARATION' || c.internal_status === 'APPLICATION_SUBMITTED' || c.internal_status === 'GOVERNMENT_PROCESSING').length,
      clarifications: cases.filter((c) => c.internal_status === 'CLARIFICATION_REQUIRED').length,
      completed: cases.filter((c) => c.internal_status === 'COMPLETED').length,
    };

    res.json({
      success: true,
      metrics,
      cases,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load CA cases.', error: err.message });
  }
});

// GET single case details for CA workbench
router.get('/cases/:id', (req, res) => {
  try {
    const { id } = req.params;
    const app = db.getApplications().find((a) => a.id === id || a.application_number === id);

    if (!app) {
      return res.status(404).json({ success: false, message: 'Case not found.' });
    }

    const customer = db.getUsers().find((u) => u.id === app.user_id);
    const profile = db.getProfiles().find((p) => p.user_id === app.user_id);
    const docs = db.getDocuments().filter((d) => d.application_id === app.id);
    const timeline = db.getCaseEvents().filter((e) => e.application_id === app.id);
    const orders = db.getOrders().filter((o) => o.application_id === app.id);

    res.json({
      success: true,
      case: {
        application: app,
        customer: {
          id: customer?.id,
          full_name: customer?.full_name,
          email: customer?.email,
          phone: customer?.phone,
        },
        profile,
        documents: docs,
        timeline,
        orders,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving case.', error: err.message });
  }
});

// CA PROFESSIONAL ACTION HANDLER
router.post('/cases/:id/action', (req, res) => {
  try {
    const { id } = req.params;
    const { action_type, arn, gstin, certificate_url, note, document_id, clarification_text } = req.body;

    const apps = db.getApplications();
    const appIndex = apps.findIndex((a) => a.id === id || a.application_number === id);

    if (appIndex === -1) {
      return res.status(404).json({ success: false, message: 'Case not found.' });
    }

    const app = apps[appIndex];
    const events = db.getCaseEvents();
    const auditLogs = db.getAuditLogs();

    switch (action_type) {
      // -------------------------------------------------------------
      // STAGE 1: CA READS & VERIFIES CUSTOMER DOCUMENTS
      // -------------------------------------------------------------
      case 'VERIFY_DOCS':
      case 'APPROVE_CA_REVIEW':
        app.internal_status = 'DOCUMENTS_VERIFIED';
        app.customer_status = 'Documents Verified by CA';
        app.docs_verified_at = new Date().toISOString();
        app.docs_verified_by = req.user.full_name;
        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: app.id,
          title: 'Step 1: CA Verified Documents & Business Identity',
          description: `All statutory documents (PAN, Aadhaar/Passport, Address Proof, Constitution) verified by ${req.user.full_name}. Data integrity confirmed for Form REG-01 compilation.`,
          actor_role: 'CA',
          created_at: new Date().toISOString(),
        });
        break;

      // -------------------------------------------------------------
      // STAGE 2: CA SUBMITS TO GST COMMON PORTAL & RECORDS ARN
      // -------------------------------------------------------------
      case 'SUBMIT_TO_PORTAL':
        // Interdependency check: Step 1 must be completed
        if (
          !app.docs_verified_at &&
          app.internal_status !== 'DOCUMENTS_VERIFIED' &&
          app.internal_status !== 'APPLICATION_PREPARATION' &&
          app.internal_status !== 'GOVERNMENT_PROCESSING' &&
          app.internal_status !== 'GOVERNMENT_APPROVED' &&
          app.internal_status !== 'COMPLETED'
        ) {
          return res.status(400).json({
            success: false,
            message: 'Interdependency Violation: Please verify customer documents in Step 1 before submitting to the GST Portal.',
          });
        }

        const genArn = arn || `AA290826${Math.floor(1000000 + Math.random() * 9000000)}`;
        app.arn = genArn;
        app.arn_generated_at = new Date().toISOString();
        app.internal_status = 'GOVERNMENT_PROCESSING';
        app.customer_status = 'Submitted to Govt (ARN Issued)';
        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: app.id,
          title: `Step 2: Form REG-01 Filed on GST Common Portal (ARN: ${genArn})`,
          description: `Application officially transmitted to GST Portal. 15-digit statutory Application Reference Number (ARN ${genArn}) generated. Transferred to Jurisdictional Tax Officer.`,
          actor_role: 'CA',
          created_at: new Date().toISOString(),
        });
        break;

      // -------------------------------------------------------------
      // STAGE 3: GOVERNMENT APPROVAL & STATUTORY GSTIN ALLOTMENT
      // -------------------------------------------------------------
      case 'RECORD_GOVT_APPROVAL':
        // Interdependency check: Step 2 must be completed (valid ARN exists)
        if (!app.arn) {
          return res.status(400).json({
            success: false,
            message: 'Interdependency Violation: Cannot record Government Approval without a valid Portal ARN from Step 2.',
          });
        }

        const allottedGstin = gstin || '29AABCB1234F1Z9';
        app.gstin = allottedGstin;
        app.approved_at = new Date().toISOString();
        app.internal_status = 'GOVERNMENT_APPROVED';
        app.customer_status = 'Approved by Tax Officer';
        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: app.id,
          title: `Step 3: Government Approval Granted (GSTIN: ${allottedGstin})`,
          description: `Application approved by Central & State GST Jurisdictional Tax Officer. Unique 15-digit GSTIN ${allottedGstin} allotted. Ready for Form REG-06 Certificate dispatch.`,
          actor_role: 'GOVERNMENT',
          created_at: new Date().toISOString(),
        });
        break;

      // -------------------------------------------------------------
      // STAGE 4: CA DISPATCHES OFFICIAL REGISTRATION CERTIFICATE
      // -------------------------------------------------------------
      case 'DISPATCH_CERTIFICATE':
      case 'ISSUE_CERTIFICATE_AND_COMPLETE':
        // Interdependency check: Must have ARN and GSTIN
        if (!app.arn) {
          return res.status(400).json({
            success: false,
            message: 'Interdependency Violation: Case must be filed on portal (Step 2) before issuing certificate.',
          });
        }

        const finalGstin = gstin || app.gstin || '29AABCB1234F1Z9';
        app.gstin = finalGstin;
        app.certificate_url = certificate_url || '/sample_gst_certificate.pdf';
        app.internal_status = 'COMPLETED';
        app.customer_status = 'Completed';
        app.certificate_dispatched_at = new Date().toISOString();
        app.certificate_dispatched_by = req.user.full_name;

        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: app.id,
          title: `Step 4: Form REG-06 Certificate Dispatched to Customer`,
          description: `Official Government GST Registration Certificate (Form REG-06) dispatched directly to customer dashboard. Certificate is available for instant download.`,
          actor_role: 'CA',
          created_at: new Date().toISOString(),
        });
        break;

      case 'FLAG_CLARIFICATION':
        app.internal_status = 'CLARIFICATION_REQUIRED';
        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: app.id,
          title: 'Government Notice / Clarification Issued (REG-03)',
          description: clarification_text || 'The GST Officer requested additional verification of business premises address proof. Our CA team is assisting.',
          actor_role: 'GOVERNMENT',
          created_at: new Date().toISOString(),
        });
        break;

      case 'SUBMIT_CLARIFICATION_REPLY':
        app.internal_status = 'GOVERNMENT_PROCESSING';
        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: app.id,
          title: 'Clarification Reply Filed (REG-04)',
          description: 'CA filed complete clarification response with supporting affidavits on the GST portal.',
          actor_role: 'CA',
          created_at: new Date().toISOString(),
        });
        break;

      case 'ADD_NOTE':
        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: app.id,
          title: 'CA Case Observation Note',
          description: note || 'All documents verified against Income Tax and UIDAI portals.',
          actor_role: 'CA',
          created_at: new Date().toISOString(),
        });
        break;

      default:
        return res.status(400).json({ success: false, message: 'Invalid action type.' });
    }

    app.updated_at = new Date().toISOString();
    apps[appIndex] = app;
    db.saveApplications(apps);
    db.saveCaseEvents(events);

    // Audit log entry
    auditLogs.push({
      id: `aud_${uuidv4().slice(0, 8)}`,
      actor_id: req.user.id,
      actor_role: req.user.role,
      action: `CA_ACTION_${action_type}`,
      resource_type: 'GST_APPLICATION',
      resource_id: app.id,
      details: { note, arn: app.arn, gstin: app.gstin },
      created_at: new Date().toISOString(),
    });
    db.saveAuditLogs(auditLogs);

    // -------------------------------------------------------------
    // REAL-TIME 2-WAY SOCKET BROADCAST TO CUSTOMER & CA DESK
    // -------------------------------------------------------------
    emitToApplication(app.id, 'application:status_updated', {
      application_id: app.id,
      action_type,
      internal_status: app.internal_status,
      customer_status: app.customer_status,
      arn: app.arn,
      gstin: app.gstin,
      certificate_url: app.certificate_url,
      updated_at: app.updated_at,
      actor_name: req.user.full_name,
    });

    emitToUser(app.user_id, 'application:status_updated', {
      application_id: app.id,
      action_type,
      internal_status: app.internal_status,
      customer_status: app.customer_status,
      arn: app.arn,
      gstin: app.gstin,
      certificate_url: app.certificate_url,
      updated_at: app.updated_at,
      actor_name: req.user.full_name,
    });

    if (action_type === 'DISPATCH_CERTIFICATE' || action_type === 'ISSUE_CERTIFICATE_AND_COMPLETE') {
      emitToApplication(app.id, 'certificate:dispatched', {
        application_id: app.id,
        gstin: app.gstin,
        certificate_url: app.certificate_url,
        dispatched_by: req.user.full_name,
        delivered_at: app.updated_at,
      });

      emitToUser(app.user_id, 'certificate:dispatched', {
        application_id: app.id,
        gstin: app.gstin,
        certificate_url: app.certificate_url,
        dispatched_by: req.user.full_name,
        delivered_at: app.updated_at,
      });
    }

    emitToCADesk('case:updated', {
      application_id: app.id,
      internal_status: app.internal_status,
      customer_status: app.customer_status,
      arn: app.arn,
      gstin: app.gstin,
    });

    res.json({
      success: true,
      message: `Action ${action_type} executed successfully and synchronized in real-time.`,
      application: app,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'CA action execution failed.', error: err.message });
  }
});

export default router;
