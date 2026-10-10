import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/db.js';
import { authenticate, optionalAuth } from '../../middleware/auth.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid compliance applications for the authenticated customer.
 */
router.get('/applications', authenticate, (req, res) => {
  try {
    const isDemoCustomer = req.user.id === 'usr_cust_001' || req.user.id === 'usr_cust_demo_bf' || req.user.email?.includes('customer');
    const apps = db.getApplications().filter((a) => {
      if (req.user.role === 'ADMIN') return true;
      if (a.user_id === req.user.id) return a.payment_completed === true;
      if (
        a.fields_data?.email &&
        a.fields_data.email.toLowerCase() === req.user.email?.toLowerCase() &&
        a.payment_completed === true
      ) {
        a.user_id = req.user.id;
        return true;
      }
      if (isDemoCustomer && (a.user_id === 'usr_cust_001' || a.user_id === 'usr_cust_demo_bf')) return a.payment_completed === true;
      return false;
    });
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
 * Retrieves a single compliance application.
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
 * Generates an instant quotation and initial application draft based on Screens 1 & 2 for all statutory modules.
 */
router.post(['/onboarding-quote', '/quote'], optionalAuth, (req, res) => {
  try {
    const {
      name,
      phone,
      pan,
      state = 'Karnataka',
      businessType = 'Proprietorship',
      email = '',
      serviceSlug = 'gst-registration',
      serviceType = 'GST',
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and Phone number are required.' });
    }

    const userId = req.user?.id || 'usr_guest_lead';
    const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
    const cleanPan = (pan || '').toUpperCase().trim();
    const cleanEmail = email || `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;

    // Multi-module configuration catalog
    let moduleType = 'GST';
    let prefix = 'GST-2026-';
    let serviceName = 'GST Registration (Form REG-01 + Monthly Filing)';
    let totalAmount = 1769;
    let subtotal = 1499;
    let gstAmount = 270;

    const slug = (serviceSlug || '').toLowerCase();
    const type = (serviceType || '').toUpperCase();

    if (slug.includes('company') || type === 'COMPANY' || slug.includes('pvt-ltd')) {
      moduleType = 'COMPANY';
      prefix = 'MCA-2026-';
      serviceName = 'Private Limited Company Incorporation (MCA SPICe+)';
      totalAmount = 4999;
      subtotal = 4236;
      gstAmount = 763;
    } else if (slug.includes('income-tax') || slug.includes('itr') || type === 'ITR') {
      moduleType = 'ITR';
      prefix = 'ITR-2026-';
      serviceName = 'Income Tax Return Filing (ITR-1 to 4)';
      totalAmount = 999;
      subtotal = 846;
      gstAmount = 153;
    } else if (slug.includes('trademark') || type === 'TRADEMARK') {
      moduleType = 'TRADEMARK';
      prefix = 'TM-2026-';
      serviceName = 'Trademark Registration (Form TM-A)';
      totalAmount = 1999;
      subtotal = 1694;
      gstAmount = 305;
    } else if (slug.includes('llp') || type === 'LLP') {
      moduleType = 'LLP';
      prefix = 'LLP-2026-';
      serviceName = 'Limited Liability Partnership (MCA FiLLiP)';
      totalAmount = 3999;
      subtotal = 3388;
      gstAmount = 611;
    } else if (slug.includes('return') || type === 'GST_RETURN') {
      moduleType = 'GST_RETURN';
      prefix = 'GSTR-2026-';
      serviceName = 'GST Return Filing (GSTR-1 & 3B Monthly Returns)';
      totalAmount = 799;
      subtotal = 677;
      gstAmount = 122;
    }

    // Unique order ID e.g. est1791262...d
    const orderId = `est${Date.now()}${Math.floor(1000 + Math.random() * 9000)}d`;
    const appId = `app_${moduleType.toLowerCase()}_${uuidv4().slice(0, 8)}`;
    const allApps = db.getApplications();
    const appSeq = String(allApps.length + 1).padStart(6, '0');
    const appNumber = `${prefix}${appSeq}`;

    // Clean initial application draft (No 11 steps!)
    const newApp = {
      id: appId,
      application_number: appNumber,
      module_type: moduleType,
      service_name: serviceName,
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

    // Create Order record
    const newOrder = {
      id: orderId,
      order_number: `#${orderId}`,
      application_id: appId,
      application_number: appNumber,
      module_type: moduleType,
      user_id: userId,
      service_name: serviceName,
      amount: totalAmount,
      subtotal: subtotal,
      gst_amount: gstAmount,
      currency: 'INR',
      status: 'CREATED',
      billing_cycle: 'One-Time Filing',
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
