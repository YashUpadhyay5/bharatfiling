import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /lead
 * Captures Trademark Hearing support inquiry from landing page.
 */
router.post('/lead', optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      language = 'English',
      problemType = 'Section 9 Absolute Grounds of Refusal',
      whatsappUpdates = true,
      name = 'Applicant',
    } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and phone number are required.',
      });
    }

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'TMHR' + Math.floor(100000 + Math.random() * 900000);

    const newApplication = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'trademark-hearing-support',
      service_name: 'Trademark Hearing Support',
      module_type: 'TRADEMARK_HEARING_SUPPORT',
      status: 'LEAD_CAPTURED',
      payment_completed: false,
      assigned_officer: 'Advocate Neha Rajyaguru (Registered Trademark Agent & IP Litigation Counsel)',
      fields_data: {
        applicant_name: name,
        email,
        phone,
        language,
        problem_type: problemType,
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
      message: 'Trademark hearing inquiry received. A registered trademark attorney will connect with you shortly.',
      leadId: appId,
      applicationNumber: appNumber,
      assignedCounsel: 'Advocate Neha Rajyaguru (Registered Trademark Agent & IP Litigation Counsel)',
      problemType,
      language,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to record Trademark hearing inquiry.',
      error: err.message,
    });
  }
});

/**
 * POST /quote
 * Computes fee for Trademark Hearing packages.
 */
router.post('/quote', (req, res) => {
  try {
    const { plan = 'starter' } = req.body;
    const norm = String(plan).toLowerCase();

    let fee = 3499;
    let original = 5999;
    let name = 'Single Hearing Appearance before Registrar';

    if (norm === 'standard' || norm === 'written') {
      fee = 6999;
      original = 11999;
      name = 'Written Submissions & Evidence Compilation + Hearing Appearance';
    } else if (norm === 'elite' || norm === 'opposition' || norm === 'tmo') {
      fee = 12999;
      original = 22999;
      name = 'Section 21 Contested Opposition Defense (Form TM-O)';
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
      message: 'Failed to compute Trademark hearing fee.',
      error: err.message,
    });
  }
});

/**
 * POST /schedule
 * Saves scheduled date and time slot for pre-hearing briefing.
 */
router.post('/schedule', optionalAuth, (req, res) => {
  try {
    const {
      leadId,
      applicationId,
      scheduledDate = '4 November 2026',
      scheduledTimeSlot = '1:30 PM',
    } = req.body;

    const targetId = leadId || applicationId;
    const apps = db.getApplications();
    const app = apps.find((a) => a.id === targetId || a.application_number === targetId);

    if (app) {
      app.scheduled_date = scheduledDate;
      app.scheduled_time_slot = scheduledTimeSlot;
      app.status = 'SCHEDULED';
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);
    }

    res.json({
      success: true,
      message: 'Hearing briefing slot successfully scheduled.',
      scheduledDate,
      scheduledTimeSlot,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to schedule hearing briefing slot.',
      error: err.message,
    });
  }
});

/**
 * POST /payment
 * Settles payment for Trademark Hearing Support (from ₹3,499) and confirms appointment.
 */
router.post('/payment', optionalAuth, (req, res) => {
  try {
    const {
      orderId,
      method = 'UPI',
      subMethod = 'PhonePe',
      amount = 3499,
      scheduledDate = '4 November 2026',
      scheduledTimeSlot = '1:30 PM',
      problemType = 'Section 9 Absolute Grounds of Refusal',
      applicantEmail = 'brand@bharatfiling.com',
      applicantPhone = '9876543210',
    } = req.body;

    const generatedTxnId = `BFP-TMH-${Date.now().toString().slice(-8)}`;
    const resolvedOrderId = orderId || `#TM-HR-${Math.floor(100000 + Math.random() * 900000)}`;

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
        service_id: 'trademark-hearing-support',
        service_name: 'Trademark Hearing Support',
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
      app.scheduled_date = scheduledDate;
      app.scheduled_time_slot = scheduledTimeSlot;
      app.assigned_officer = 'Advocate Neha Rajyaguru (Registered Trademark Agent & IP Litigation Counsel)';
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
      message: 'Payment verified and Trademark hearing counsel confirmed.',
      transactionId: generatedTxnId,
      orderNumber: resolvedOrderId,
      amount,
      scheduledDate,
      scheduledTimeSlot,
      assignedCounsel: 'Advocate Neha Rajyaguru (Registered Trademark Agent & IP Litigation Counsel)',
      callNotice: 'Our registered trademark attorney will call you shortly from 80448 ***** at your booked slot.',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to settle Trademark hearing payment.',
      error: err.message,
    });
  }
});

export default router;
