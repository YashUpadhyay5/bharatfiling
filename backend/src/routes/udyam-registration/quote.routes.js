import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/db.js';
import crypto from 'crypto';
import { authenticate, optionalAuth } from '../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid Udyam applications for the authenticated customer.
 */
router.get('/applications', authenticate, (req, res) => {
  try {
    const apps = db.getApplications().filter((a) => {
      if (req.user.role === 'ADMIN') return true;
      if (a.user_id === req.user.id) return a.payment_completed === true;
      if (
        a.user_id === GUEST_USER_ID &&
        a.fields_data?.email &&
        a.fields_data.email.toLowerCase() === req.user.email?.toLowerCase() &&
        a.payment_completed === true
      ) {
        a.user_id = req.user.id;
        return true;
      }
      return false;
    });

    res.json({
      success: true,
      applications: apps.filter((a) => a.module_type === 'UDYAM' || a.module_type === 'MSME'),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve Udyam applications.', error: err.message });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single Udyam compliance application.
 */
router.get('/applications/:id', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const app = db.getApplications().find((a) => a.id === id || a.application_number === id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Udyam application not found.' });
    }
    if (!canAccessApplication(req.user, app)) {
      // Same response as 'not found' so application numbers cannot be enumerated
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
 * Generates an instant quotation and initial application draft based on Screens 1 & 2 for Udyam Registration.
 */
router.post(['/onboarding-quote', '/quote'], optionalAuth, (req, res) => {
  try {
    const {
      name,
      phone,
      pan,
      aadhaar = '',
      nicDivision = '',
      nicSubDivision = '',
      nicSubClass = '',
      enterpriseName = '',
      organizationType = 'Proprietorship',
      majorActivity = 'Services',
      plantAddress = '',
      bankAccountNo = '',
      bankIfsc = '',
      state = 'Karnataka',
      businessType = 'Proprietorship',
      email = '',
    } = req.body;

    if (!pan) {
      return res.status(400).json({ success: false, message: 'PAN or GSTIN is required.' });
    }

    const userId = req.user?.id || 'usr_guest_lead';
    const cleanPhone = String(phone || '9876543210').replace(/\D/g, '').slice(-10);
    const cleanPan = (pan || '').toUpperCase().trim();
    const cleanAadhaar = String(aadhaar || '').replace(/\D/g, '');
    const cleanName = (name || enterpriseName || 'Udyam Applicant').trim();
    const cleanEmail = email || `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'applicant'}@gmail.com`;

    const moduleType = 'UDYAM';
    const prefix = 'UDYAM-2026-';
    const serviceName = 'UDYAM Registration (UDYAM + LEDGERS)';
    const totalAmount = 3421;
    const subtotal = 2899;
    const gstAmount = 522;

    // Unique order ID matching format e.g. est1791262017350202692f1b
    const orderId = `est${Date.now()}${crypto.randomBytes(8).toString('hex')}`;
    const appId = `app_udyam_${uuidv4().replace(/-/g, '').slice(0, 20)}`;
    const allApps = db.getApplications();
    const appSeq = String(allApps.length + 1).padStart(6, '0');
    const appNumber = `${prefix}${appSeq}`;

    // Clean initial application draft
    const newApp = {
      id: appId,
      application_number: appNumber,
      module_type: moduleType,
      service_name: serviceName,
      user_id: userId,
      business_id: `biz_${uuidv4().slice(0, 8)}`,
      business_type: organizationType || businessType,
      state: state || 'Karnataka',
      customer_status: 'Quote Generated',
      internal_status: 'PAYMENT_PENDING',
      fields_data: {
        applicant_name: cleanName,
        mobile_number: cleanPhone,
        pan_number: cleanPan,
        aadhaar_number: cleanAadhaar,
        nic_division: nicDivision,
        nic_sub_division: nicSubDivision,
        nic_sub_class: nicSubClass,
        enterprise_name: enterpriseName || `${cleanName} Enterprises`,
        organization_type: organizationType,
        major_activity: majorActivity,
        plant_address: plantAddress,
        bank_account_no: bankAccountNo,
        bank_ifsc: bankIfsc,
        email: cleanEmail,
        state: state,
        business_type: organizationType || businessType,
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
      billing_cycle: 'One-Time Statutory Filing',
      customer_name: cleanName,
      customer_phone: cleanPhone,
      customer_pan: cleanPan,
      customer_email: cleanEmail,
      state: state,
      business_type: organizationType || businessType,
      aadhaar_number: cleanAadhaar,
      nic_division: nicDivision,
      nic_sub_division: nicSubDivision,
      nic_sub_class: nicSubClass,
      enterprise_name: enterpriseName || `${cleanName} Enterprises`,
      plant_address: plantAddress,
      bank_account_no: bankAccountNo,
      bank_ifsc: bankIfsc,
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
      applicationId: appId,
      applicationNumber: appNumber,
      message: 'Quotation created successfully. Ready for Screen 3 Checkout.',
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to generate Udyam quote.', error: err.message });
  }
});

export default router;
