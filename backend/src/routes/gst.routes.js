import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { getRequirementsForBusinessType } from '../services/fieldEngine.js';
import { detectCrossFieldMismatches } from '../services/validationEngine.js';

const router = express.Router();

// GET all GST applications for current user
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

// GET single GST application by ID
router.get('/applications/:id', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const app = db.getApplications().find((a) => a.id === id || a.application_number === id);

    if (!app) {
      return res.status(404).json({ success: false, message: 'GST Application not found.' });
    }

    // Role check: customer can only access own application; CA/Admin can access any
    if (req.user.role === 'CUSTOMER' && app.user_id !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    const docs = db.getDocuments().filter((d) => d.application_id === app.id);
    const events = db.getCaseEvents().filter((e) => e.application_id === app.id);
    const requirements = getRequirementsForBusinessType(app.business_type, app.state);

    res.json({
      success: true,
      application: app,
      documents: docs,
      timeline: events,
      requirements,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving application.', error: err.message });
  }
});

// CREATE new GST application
router.post('/applications', authenticate, (req, res) => {
  try {
    const { business_type = 'Proprietorship', state = 'Karnataka', business_id } = req.body;

    const allApps = db.getApplications();
    const appSeq = String(allApps.length + 1).padStart(6, '0');
    const appNumber = `GST-2026-${appSeq}`;
    const appId = `app_gst_${uuidv4().slice(0, 8)}`;

    // Prefill data from Master Customer Profile
    const profile = db.getProfiles().find((p) => p.user_id === req.user.id);
    const business = business_id ? db.getBusinesses().find((b) => b.id === business_id) : null;

    const prefilledFields = {
      applicant_name: profile?.personal_info?.full_name || req.user.full_name || '',
      father_name: profile?.personal_info?.father_name || '',
      dob: profile?.personal_info?.dob || '',
      pan_number: profile?.identity_info?.pan_number || '',
      aadhaar_number: profile?.identity_info?.aadhaar_number || '',
      mobile_number: profile?.contact_info?.mobile_number || req.user.phone || '',
      email: profile?.contact_info?.email || req.user.email || '',
      business_type,
      state,
      legal_name: business?.legal_name || '',
      trade_name: business?.trade_name || '',
      address_line_1: business?.address_line_1 || profile?.address_info?.address_line_1 || '',
      city: business?.city || profile?.address_info?.city || '',
      pincode: business?.pincode || profile?.address_info?.pincode || '',
      business_activity: business?.business_activity || '',
      bank_account_no: business?.bank_account_no || '',
      bank_ifsc: business?.bank_ifsc || '',
      bank_name: business?.bank_name || '',
      hsn_sac_codes: [],
    };

    const newApp = {
      id: appId,
      application_number: appNumber,
      user_id: req.user.id,
      business_id: business_id || (business?.id || `biz_${uuidv4().slice(0, 8)}`),
      business_type,
      state,
      current_step: 1,
      customer_status: 'Profile',
      internal_status: 'DRAFT',
      fields_data: prefilledFields,
      payment_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    allApps.push(newApp);
    db.saveApplications(allApps);

    // Record Event
    const events = db.getCaseEvents();
    events.push({
      id: `evt_${uuidv4().slice(0, 8)}`,
      application_id: appId,
      title: 'GST Application Draft Created',
      description: `Application ${appNumber} initiated. Reusable Master Profile fields prefilled automatically.`,
      actor_role: 'CUSTOMER',
      created_at: new Date().toISOString(),
    });
    db.saveCaseEvents(events);

    res.status(201).json({
      success: true,
      message: 'GST Application created successfully.',
      application: newApp,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create GST application.', error: err.message });
  }
});

// AUTOSAVE / UPDATE step form data
router.put('/applications/:id/step', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const { step, fields_data, customer_status, internal_status } = req.body;

    const apps = db.getApplications();
    const index = apps.findIndex((a) => a.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    const currentApp = apps[index];

    // Check ownership if customer
    if (req.user.role === 'CUSTOMER' && currentApp.user_id !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    const updatedApp = {
      ...currentApp,
      current_step: step !== undefined ? step : currentApp.current_step,
      customer_status: customer_status || currentApp.customer_status,
      internal_status: internal_status || currentApp.internal_status,
      fields_data: {
        ...currentApp.fields_data,
        ...(fields_data || {}),
      },
      updated_at: new Date().toISOString(),
    };

    apps[index] = updatedApp;
    db.saveApplications(apps);

    res.json({
      success: true,
      message: 'Form data autosaved successfully.',
      application: updatedApp,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Autosave failed.', error: err.message });
  }
});

// AI PRE-CHECK before submission/payment
router.post('/applications/:id/precheck', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const apps = db.getApplications();
    const app = apps.find((a) => a.id === id);

    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    const requirements = getRequirementsForBusinessType(app.business_type, app.state);
    const docs = db.getDocuments().filter((d) => d.application_id === app.id);

    // Calculate filled required fields
    const filledFields = Object.keys(app.fields_data).filter(
      (k) => app.fields_data[k] !== undefined && app.fields_data[k] !== '' && app.fields_data[k] !== null
    );

    // Check cross-field document mismatches
    const mismatches = detectCrossFieldMismatches(app.fields_data, docs);

    const uploadedDocTypes = new Set(docs.map((d) => d.document_type));
    const missingDocs = requirements.required_documents.filter((d) => !uploadedDocTypes.has(d.type));

    const readyForReview = missingDocs.length === 0 && mismatches.filter((m) => m.severity === 'ERROR').length === 0;

    const summary = {
      completed_fields: filledFields.length,
      total_required_fields: requirements.required_fields.length,
      uploaded_docs: docs.length,
      required_docs: requirements.required_documents.length,
      missing_documents: missingDocs.map((d) => d.title),
      mismatches,
      ready_for_review: readyForReview,
      checked_at: new Date().toISOString(),
    };

    // Update application summary
    const index = apps.findIndex((a) => a.id === id);
    apps[index].ai_precheck_summary = summary;
    if (readyForReview && apps[index].internal_status === 'DRAFT') {
      apps[index].internal_status = 'AI_PRECHECK';
      apps[index].customer_status = 'CA Review';
    }
    db.saveApplications(apps);

    res.json({
      success: true,
      summary,
      application: apps[index],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'AI Pre-check failed.', error: err.message });
  }
});

// GET timeline events
router.get('/applications/:id/timeline', authenticate, (req, res) => {
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

// POST Onboarding Quote (4-Stage Lead Onboarding Funnel)
router.post('/onboarding-quote', optionalAuth, (req, res) => {
  try {
    const { name, phone, pan, state = 'Karnataka', businessType = 'Proprietorship', email = '' } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and Phone number are required.' });
    }

    const userId = req.user?.id || 'usr_guest_lead';
    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    const cleanPan = (pan || '').toUpperCase().trim();
    const cleanEmail = email || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;

    // Generate unique order reference matching IndiaFilings style e.g. est1791262...
    const orderId = `est${Date.now()}${Math.floor(1000 + Math.random() * 9000)}d`;
    const appId = `app_gst_${uuidv4().slice(0, 8)}`;
    const allApps = db.getApplications();
    const appSeq = String(allApps.length + 1).padStart(6, '0');
    const appNumber = `GST-2026-${appSeq}`;

    const newApp = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      business_id: `biz_${uuidv4().slice(0, 8)}`,
      business_type: businessType,
      state: state,
      current_step: 1,
      customer_status: 'Quote Generated',
      internal_status: 'DRAFT',
      fields_data: {
        applicant_name: name,
        mobile_number: cleanPhone,
        pan_number: cleanPan,
        email: cleanEmail,
        state: state,
        business_type: businessType,
      },
      assigned_ca_id: null,
      payment_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    allApps.push(newApp);
    db.saveApplications(allApps);

    // Create Order with monthly breakdown ₹1,499 + ₹270 = ₹1,769
    const newOrder = {
      id: orderId,
      order_number: `#${orderId}`,
      application_id: appId,
      application_number: appNumber,
      user_id: userId,
      service_name: 'GST Registration (GST Registration + Monthly Filing)',
      amount: 1769,
      subtotal: 1499,
      gst_amount: 270,
      currency: 'INR',
      status: 'CREATED',
      billing_cycle: 'Monthly',
      customer_name: name,
      customer_phone: cleanPhone,
      customer_pan: cleanPan,
      customer_email: cleanEmail,
      state: state,
      business_type: businessType,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const orders = db.getOrders();
    orders.push(newOrder);
    db.saveOrders(orders);

    res.json({
      success: true,
      orderId,
      order: newOrder,
      application: newApp,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create quote order.', error: err.message });
  }
});

// GET Checkout Order by Order ID (Refresh resilience)
router.get('/checkout-order/:orderId', optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = db.getOrders();
    let order = orders.find((o) => o.id === orderId || o.order_number === `#${orderId}`);

    // If order not yet in orders DB (e.g. mock generator or fresh lead), generate default template
    if (!order) {
      order = {
        id: orderId,
        order_number: `#${orderId}`,
        application_id: `app_${orderId}`,
        service_name: 'GST Registration (GST Registration + Monthly Filing)',
        amount: 1769,
        subtotal: 1499,
        gst_amount: 270,
        currency: 'INR',
        status: 'CREATED',
        billing_cycle: 'Monthly',
        customer_name: 'GST Applicant',
        customer_phone: '9876543210',
        customer_pan: '',
        customer_email: 'applicant@gmail.com',
        state: 'Karnataka',
        business_type: 'Proprietorship',
        created_at: new Date().toISOString(),
      };
    }

    const apps = db.getApplications();
    const app = apps.find((a) => a.id === order.application_id);

    res.json({
      success: true,
      order,
      application: app || null,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve checkout order.', error: err.message });
  }
});

export default router;

