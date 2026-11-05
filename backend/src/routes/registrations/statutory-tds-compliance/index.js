import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /lead
 * Captures Statutory TDS Compliance & Return Filing inquiry from landing page.
 */
router.post('/lead', optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      cityPincode = '',
      whatsappUpdates = true,
      name = 'Tax Deductor',
    } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and mobile number are required.',
      });
    }

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'TDS' + Math.floor(100000 + Math.random() * 900000);

    const newApplication = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'statutory-tds-compliance',
      service_name: 'Statutory TDS Compliance & Return Filing',
      module_type: 'STATUTORY_TDS_COMPLIANCE',
      status: 'LEAD_CAPTURED',
      payment_completed: false,
      assigned_officer: 'CA & Senior Tax Advocate Pankaj Agarwal (Direct Tax Partner)',
      fields_data: {
        applicant_name: name,
        email,
        phone,
        city_pincode: cityPincode,
        whatsapp_opt_in: whatsappUpdates,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.push(newApplication);
    db.saveApplications(apps);

    res.status(201).json({
      success: true,
      message: 'Statutory TDS compliance inquiry received. Our direct tax partner will connect with you shortly.',
      leadId: appId,
      applicationNumber: appNumber,
      cityPincode,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to record TDS compliance inquiry.',
      error: err.message,
    });
  }
});

/**
 * POST /quote
 * Computes fee for statutory TDS compliance tiers.
 */
router.post('/quote', (req, res) => {
  try {
    const { plan = 'starter', deducteeCount = 15 } = req.body;
    const norm = String(plan).toLowerCase();

    let fee = 1499;
    let original = 2999;
    let name = 'Starter TDS Retainer (Up to 20 Deductees)';

    if (norm === 'growth' || deducteeCount > 20) {
      fee = 2999;
      original = 4999;
      name = 'Growth & Multi-Category TDS (Up to 75 Deductees)';
    }
    if (norm === 'enterprise' || deducteeCount > 75) {
      fee = 5999;
      original = 9999;
      name = 'Enterprise & International TDS Retainer (Unlimited Deductees)';
    }

    const gst = Math.round(fee * 0.18);
    const total = fee + gst;

    res.json({
      success: true,
      plan: norm,
      planName: name,
      baseFee: fee,
      originalFee: original,
      gst,
      totalAmount: total,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to compute TDS quote.',
      error: err.message,
    });
  }
});

/**
 * POST /payment
 * Settles payment for TDS Expert Consultation / Retainer and confirms appointment.
 */
router.post('/payment', optionalAuth, (req, res) => {
  try {
    const {
      orderId,
      method = 'UPI',
      subMethod = 'PhonePe',
      amount = 525,
      includeLabourWelfare = true,
      applicantEmail = 'tax@bharatfiling.com',
      applicantPhone = '9876543210',
      cityPincode = '',
    } = req.body;

    const generatedTxnId = `BFP-TDS-${Date.now().toString().slice(-8)}`;
    const resolvedOrderId = orderId || `#TDS-${Math.floor(100000 + Math.random() * 900000)}`;

    const orders = db.getOrders();
    let order = orders.find((o) => o.id === orderId || o.order_number === orderId);

    if (order) {
      order.status = 'PAID';
      order.payment_status = 'PAID';
      order.payment_method = method;
      order.transaction_id = generatedTxnId;
      order.updated_at = new Date().toISOString();
    } else {
      order = {
        id: uuidv4(),
        order_number: resolvedOrderId,
        user_id: req.user ? req.user.id : GUEST_USER_ID,
        service_id: 'statutory-tds-compliance',
        service_name: 'Statutory TDS Compliance & Return Filing',
        amount,
        currency: 'INR',
        status: 'PAID',
        payment_status: 'PAID',
        payment_method: method,
        transaction_id: generatedTxnId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      orders.push(order);
    }
    db.saveOrders(orders);

    const apps = db.getApplications();
    let app = apps.find((a) => a.id === orderId || a.id === order.application_id);
    if (app) {
      app.status = 'CONFIRMED';
      app.payment_completed = true;
      app.assigned_officer = 'CA & Senior Tax Advocate Pankaj Agarwal (Direct Tax Partner)';
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);
    }

    // Save transaction
    if (typeof db.getTransactions === 'function' && typeof db.saveTransactions === 'function') {
      const txns = db.getTransactions();
      txns.push({
        id: uuidv4(),
        order_id: order.id,
        transaction_id: generatedTxnId,
        amount,
        currency: 'INR',
        status: 'SUCCESS',
        payment_method: method,
        gateway: 'BHARATFILING_MOCK_GATEWAY',
        created_at: new Date().toISOString(),
      });
      db.saveTransactions(txns);
    }

    res.json({
      success: true,
      message: 'Payment verified and TDS expert consultation confirmed.',
      transactionId: generatedTxnId,
      orderNumber: resolvedOrderId,
      amount,
      assignedSpecialist: 'CA & Senior Tax Advocate Pankaj Agarwal (Direct Tax Partner & TRACES Compliance Specialist)',
      callNotice: 'Our senior TDS compliance specialist will call you shortly from 80448 ***** at your booked slot.',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to settle TDS payment.',
      error: err.message,
    });
  }
});

export default router;
