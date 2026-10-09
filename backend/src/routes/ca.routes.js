import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';
import { authenticate, requireRole } from '../middleware/auth.js';
import { emitToApplication, emitToCADesk, emitToUser } from '../services/socket.service.js';
import { createAndDispatchNotification } from '../services/notification.service.js';

const router = express.Router();

// Enforce CA or Admin access
router.use(authenticate, requireRole(['CA', 'ADMIN']));

// GET list of CA cases with full customer context and metrics
router.get('/cases', (req, res) => {
  try {
    const rawApps = db.getApplications();
    const docs = db.getDocuments();
    const orders = db.getOrders();
    const users = db.getUsers();

    // Only paid cases reach the CA desk
    const apps = rawApps.filter((a) => a.payment_completed === true || (a.internal_status && a.internal_status !== 'PAYMENT_PENDING'));

    const cases = apps.map((app) => {
      const user = users.find((u) => u.id === app.user_id);
      const appDocs = docs.filter((d) => d.application_id === app.id);
      const appOrder = orders.find((o) => o.application_id === app.id || o.id === app.id);

      const moduleType = app.module_type || appOrder?.module_type || 'GST';
      const serviceName = app.service_name || appOrder?.service_name || (
        moduleType === 'COMPANY' ? 'Private Limited Company Incorporation (MCA SPICe+)' :
        moduleType === 'ITR' ? 'Income Tax Return Filing (ITR-1 to 4)' :
        moduleType === 'TRADEMARK' ? 'Trademark Registration (Form TM-A)' :
        moduleType === 'LLP' ? 'Limited Liability Partnership (MCA FiLLiP)' :
        'GST Registration (Form REG-01)'
      );

      const customerName = user?.full_name || app.fields_data?.applicant_name || appOrder?.customer_name || 'Compliance Applicant';
      const customerEmail = user?.email || app.fields_data?.email || appOrder?.customer_email || 'client@example.com';
      const customerPhone = user?.phone || app.fields_data?.mobile_number || appOrder?.customer_phone || '9876543210';
      const state = app.state || app.fields_data?.state || appOrder?.state || 'Karnataka';
      const businessType = app.business_type || app.fields_data?.business_type || appOrder?.business_type || 'Proprietorship';
      const legalName = app.fields_data?.legal_name || app.fields_data?.trade_name || `${customerName} Enterprise`;
      const panNumber = app.fields_data?.pan_number || appOrder?.customer_pan || 'ABCDE1234F';
      const amountPaid = appOrder?.amount || (moduleType === 'COMPANY' ? 4999 : moduleType === 'ITR' ? 999 : moduleType === 'TRADEMARK' ? 1999 : moduleType === 'LLP' ? 3999 : 1769);
      const orderNumber = appOrder?.order_number || appOrder?.id || '#est2026';
      const submittedAt = app.created_at || appOrder?.created_at || new Date().toISOString();

      return {
        ...app,
        module_type: moduleType,
        service_name: serviceName,
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

    const moduleType = app.module_type || 'GST';

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

        let step1Title = 'Step 1: CA Verified Documents & Business Identity';
        let step1Desc = `All statutory documents verified by ${req.user.full_name}. Data integrity confirmed for filing dossier.`;
        if (moduleType === 'COMPANY') {
          step1Title = 'Step 1: CA Verified Director KYC & SPICe+ Dossier';
          step1Desc = `PAN, Aadhaar, DIN details, registered office address proof and MOA/AOA drafted and certified by ${req.user.full_name}.`;
        } else if (moduleType === 'ITR') {
          step1Title = 'Step 1: CA Verified Financial Statements & 26AS/AIS Tax Credits';
          step1Desc = `Form 16, balance sheets, capital gains schedules, and TDS credits verified by ${req.user.full_name}.`;
        } else if (moduleType === 'TRADEMARK') {
          step1Title = 'Step 1: CA & IP Attorney Verified Brand Logo & Class Specification';
          step1Desc = `Public search report completed and Form TM-A schedule drafted under Nice classification by ${req.user.full_name}.`;
        } else if (moduleType === 'LLP') {
          step1Title = 'Step 1: CA Verified Partner KYC & FiLLiP Dossier';
          step1Desc = `Designated partner DPIN, contribution agreement, and office proof verified by ${req.user.full_name}.`;
        }

        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: app.id,
          title: step1Title,
          description: step1Desc,
          actor_role: 'CA',
          created_at: new Date().toISOString(),
        });
        break;

      // -------------------------------------------------------------
      // STAGE 2: CA SUBMITS TO GOVT COMMON PORTAL & RECORDS ACK/ARN/SRN
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
            message: 'Interdependency Violation: Please verify customer documents in Step 1 before submitting to the Government Portal.',
          });
        }

        let defaultArn = `AA290826${Math.floor(1000000 + Math.random() * 9000000)}`;
        let step2Title = `Step 2: Form REG-01 Filed on GST Portal (ARN: ${arn || defaultArn})`;
        let step2Desc = `Application officially transmitted to GST Portal. 15-digit statutory ARN generated. Transferred to Jurisdictional Tax Officer.`;

        if (moduleType === 'COMPANY') {
          defaultArn = `MCA-SRN-T${Math.floor(10000000 + Math.random() * 90000000)}`;
          step2Title = `Step 2: SPICe+ Dossier Filed on MCA Portal (SRN: ${arn || defaultArn})`;
          step2Desc = `Incorporation dossier submitted to Ministry of Corporate Affairs. Service Request Number (SRN) generated. Transferred to Registrar of Companies.`;
        } else if (moduleType === 'ITR') {
          defaultArn = `ITR-ACK-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
          step2Title = `Step 2: Return Filed on Income Tax E-filing Portal (Ack: ${arn || defaultArn})`;
          step2Desc = `Statutory tax return transmitted to ITD portal. Centralized Acknowledgement Number generated.`;
        } else if (moduleType === 'TRADEMARK') {
          defaultArn = `TM-APP-${Math.floor(1000000 + Math.random() * 9000000)}`;
          step2Title = `Step 2: Form TM-A Filed on IP India Portal (Application No: ${arn || defaultArn})`;
          step2Desc = `Trademark application submitted to Trade Marks Registry. Statutory Application Number generated.`;
        } else if (moduleType === 'LLP') {
          defaultArn = `LLP-SRN-L${Math.floor(10000000 + Math.random() * 90000000)}`;
          step2Title = `Step 2: Form FiLLiP Filed on MCA Portal (SRN: ${arn || defaultArn})`;
          step2Desc = `LLP incorporation dossier filed with ROC. Service Request Number (SRN) generated.`;
        }

        const genArn = arn || defaultArn;
        app.arn = genArn;
        app.arn_generated_at = new Date().toISOString();
        app.internal_status = 'GOVERNMENT_PROCESSING';
        app.customer_status = 'Submitted to Govt (Ack Issued)';
        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: app.id,
          title: step2Title,
          description: step2Desc,
          actor_role: 'CA',
          created_at: new Date().toISOString(),
        });
        break;

      // -------------------------------------------------------------
      // STAGE 3: GOVERNMENT APPROVAL & STATUTORY IDENTIFIER ALLOTMENT
      // -------------------------------------------------------------
      case 'RECORD_GOVT_APPROVAL':
        // Interdependency check: Step 2 must be completed (valid ARN/SRN exists)
        if (!app.arn) {
          return res.status(400).json({
            success: false,
            message: 'Interdependency Violation: Cannot record Government Approval without a valid Portal Reference Number (ARN/SRN) from Step 2.',
          });
        }

        let defaultGstin = '29AABCB1234F1Z9';
        let step3Title = `Step 3: Government Approval Granted (GSTIN: ${gstin || defaultGstin})`;
        let step3Desc = `Application approved by Jurisdictional Tax Officer. Unique 15-digit GSTIN allotted.`;

        if (moduleType === 'COMPANY') {
          defaultGstin = `U72200KA2026PTC${Math.floor(100000 + Math.random() * 900000)}`;
          step3Title = `Step 3: ROC Approval Granted (CIN: ${gstin || defaultGstin})`;
          step3Desc = `Company incorporation approved by Registrar of Companies (ROC). Corporate Identity Number (CIN) allotted.`;
        } else if (moduleType === 'ITR') {
          defaultGstin = `CPC/2026/INT/${Math.floor(1000000 + Math.random() * 9000000)}`;
          step3Title = `Step 3: CPC Intimation u/s 143(1) Approved`;
          step3Desc = `Return successfully processed by Centralized Processing Centre (CPC Bangalore). Refund / Nil liability determined.`;
        } else if (moduleType === 'TRADEMARK') {
          defaultGstin = `TM-REG-${Math.floor(1000000 + Math.random() * 9000000)}`;
          step3Title = `Step 3: Trademark Registry Acceptance & Examination Passed`;
          step3Desc = `Form TM-A accepted by Examiner of Trade Marks and advertised in Trade Marks Journal.`;
        } else if (moduleType === 'LLP') {
          defaultGstin = `LLPIN-AAA-${Math.floor(1000 + Math.random() * 9000)}`;
          step3Title = `Step 3: ROC Approval Granted (LLPIN: ${gstin || defaultGstin})`;
          step3Desc = `LLP incorporation approved by ROC. Limited Liability Partnership Identification Number allotted.`;
        }

        const allottedGstin = gstin || defaultGstin;
        app.gstin = allottedGstin;
        app.approved_at = new Date().toISOString();
        app.internal_status = 'GOVERNMENT_APPROVED';
        app.customer_status = 'Approved by Government';
        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: app.id,
          title: step3Title,
          description: step3Desc,
          actor_role: 'GOVERNMENT',
          created_at: new Date().toISOString(),
        });
        break;

      // -------------------------------------------------------------
      // STAGE 4: CA DISPATCHES OFFICIAL REGISTRATION CERTIFICATE
      // -------------------------------------------------------------
      case 'DISPATCH_CERTIFICATE':
      case 'ISSUE_CERTIFICATE_AND_COMPLETE':
        // Interdependency check: Must have ARN and GSTIN/CIN
        if (!app.arn) {
          return res.status(400).json({
            success: false,
            message: 'Interdependency Violation: Case must be filed on portal (Step 2) before issuing certificate.',
          });
        }

        let defaultCertUrl = '/sample_gst_certificate.pdf';
        let step4Title = 'Step 4: Form REG-06 Certificate Dispatched to Customer';
        let step4Desc = 'Official Government GST Registration Certificate (Form REG-06) dispatched directly to customer dashboard.';

        if (moduleType === 'COMPANY') {
          defaultCertUrl = '/sample_gst_certificate.pdf'; // Will download with COI naming
          step4Title = 'Step 4: Certificate of Incorporation (COI) Dispatched to Customer';
          step4Desc = 'Official MCA Certificate of Incorporation along with corporate PAN and TAN letters dispatched to customer dashboard.';
        } else if (moduleType === 'ITR') {
          defaultCertUrl = '/sample_gst_certificate.pdf';
          step4Title = 'Step 4: ITR-V Verification & CPC Assessment Order Dispatched';
          step4Desc = 'Official Income Tax E-filing Acknowledgement (ITR-V) and CPC Assessment Intimation delivered to customer dashboard.';
        } else if (moduleType === 'TRADEMARK') {
          defaultCertUrl = '/sample_gst_certificate.pdf';
          step4Title = 'Step 4: Official Trademark Registration Certificate Dispatched';
          step4Desc = 'Official Trademark Registration Certificate issued under Section 23(2) dispatched directly to customer dashboard.';
        } else if (moduleType === 'LLP') {
          defaultCertUrl = '/sample_gst_certificate.pdf';
          step4Title = 'Step 4: LLP Certificate of Incorporation Dispatched';
          step4Desc = 'Official ROC Certificate of Incorporation for Limited Liability Partnership delivered to customer dashboard.';
        }

        const finalGstin = gstin || app.gstin || 'STATUTORY-REG-COMPLETED';
        app.gstin = finalGstin;
        app.certificate_url = certificate_url || defaultCertUrl;
        app.internal_status = 'COMPLETED';
        app.customer_status = 'Completed';
        app.certificate_dispatched_at = new Date().toISOString();
        app.certificate_dispatched_by = req.user.full_name;

        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: app.id,
          title: step4Title,
          description: step4Desc,
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

    // -------------------------------------------------------------
    // PERSISTENT & REAL-TIME NOTIFICATION DISPATCH (AUDITABLE)
    // -------------------------------------------------------------
    let notifTitle = 'Application Status Updated';
    let notifMessage = `Your filing has been updated to ${app.customer_status}.`;
    let notifSeverity = 'info';
    let notifType = `CA_ACTION_${action_type}`;

    if (action_type === 'VERIFY_DOCS' || action_type === 'APPROVE_CA_REVIEW') {
      notifTitle = 'Documents Verified by CA';
      notifMessage = `${req.user.full_name} verified your submitted documents. Form REG-01 preparation is complete.`;
      notifSeverity = 'success';
      notifType = 'DOCS_VERIFIED';
    } else if (action_type === 'SUBMIT_TO_PORTAL') {
      notifTitle = 'Form REG-01 Filed on GST Portal';
      notifMessage = `Your application was submitted to the tax portal. ARN: ${app.arn}.`;
      notifSeverity = 'success';
      notifType = 'ARN_GENERATED';
    } else if (action_type === 'RECORD_GOVT_APPROVAL') {
      notifTitle = 'Government Approval Granted! 🎉';
      notifMessage = `Your GST registration was approved by tax authorities. GSTIN: ${app.gstin}.`;
      notifSeverity = 'success';
      notifType = 'GOVT_APPROVED';
    } else if (action_type === 'DISPATCH_CERTIFICATE' || action_type === 'ISSUE_CERTIFICATE_AND_COMPLETE') {
      notifTitle = 'Official Registration Certificate Ready! 📜';
      notifMessage = `Your statutory Form REG-06 registration certificate is ready for download.`;
      notifSeverity = 'success';
      notifType = 'CERTIFICATE_ISSUED';
    } else if (action_type === 'FLAG_CLARIFICATION') {
      notifTitle = 'Clarification Required (REG-03)';
      notifMessage = clarification_text || 'Tax officer or CA requested additional document clarification.';
      notifSeverity = 'warning';
      notifType = 'CLARIFICATION_REQUIRED';
    } else if (action_type === 'SUBMIT_CLARIFICATION_REPLY') {
      notifTitle = 'Clarification Reply Filed (REG-04)';
      notifMessage = `CA submitted clarification reply to tax authorities on your behalf.`;
      notifSeverity = 'info';
      notifType = 'CLARIFICATION_REPLIED';
    }

    createAndDispatchNotification({
      recipient_id: app.user_id,
      recipient_role: 'CUSTOMER',
      application_id: app.id,
      type: notifType,
      title: notifTitle,
      message: notifMessage,
      severity: notifSeverity,
      action_url: `/dashboard?app=${app.id}`,
      metadata: {
        action_type,
        internal_status: app.internal_status,
        customer_status: app.customer_status,
        arn: app.arn,
        gstin: app.gstin,
        certificate_url: app.certificate_url,
        ca_name: req.user.full_name,
      },
      dedup_key: `${notifType}_${app.id}_${app.internal_status}_${app.arn || ''}_${app.gstin || ''}`,
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
