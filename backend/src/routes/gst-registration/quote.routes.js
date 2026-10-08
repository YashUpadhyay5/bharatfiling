import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/db.js';
import { authenticate, optionalAuth } from '../../middleware/auth.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves GST applications for the authenticated customer.
 */
router.get('/applications', authenticate, (req, res) => {
  try {
    const apps = db.getApplications().filter((a) => a.user_id === req.user.id || req.user.role === 'ADMIN');
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
 * Retrieves a single GST application.
 */
router.get('/applications/:id', optionalAuth, (req, res) => {
  try {
    const { id } = req.params;
    const app = db.getApplications().find((a) => a.id === id || a.application_number === id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }
    res.json({
      success: true,
      application: app,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve application.', error: err.message });
  }
});

/**
 * POST /onboarding-quote & POST /quote
 * Generates an instant quotation and initial application draft based on Screens 1 & 2.
 */
router.post(['/onboarding-quote', '/quote'], optionalAuth, (req, res) => {
  try {
    const { name, phone, pan, state = 'Karnataka', businessType = 'Proprietorship', email = '' } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and Phone number are required.' });
    }

    const userId = req.user?.id || 'usr_guest_lead';
    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    const cleanPan = (pan || '').toUpperCase().trim();
    const cleanEmail = email || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;

    // Unique order ID e.g. est1791262...d
    const orderId = `est${Date.now()}${Math.floor(1000 + Math.random() * 9000)}d`;
    const appId = `app_gst_${uuidv4().slice(0, 8)}`;
    const allApps = db.getApplications();
    const appSeq = String(allApps.length + 1).padStart(6, '0');
    const appNumber = `GST-2026-${appSeq}`;

    // Clean initial application draft (No 11 steps!)
    const newApp = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      business_id: `biz_${uuidv4().slice(0, 8)}`,
      business_type: businessType,
      state: state,
      customer_status: 'Quote Generated',
      internal_status: 'PAYMENT_PENDING',
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

    // Create Order with monthly breakdown ₹1,499 + ₹270 (18% GST) = ₹1,769
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

export default router;
