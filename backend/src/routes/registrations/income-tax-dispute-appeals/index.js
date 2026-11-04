import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /lead
 * Captures Income Tax dispute & appeal inquiry from landing page.
 */
router.post('/lead', optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      language = 'English',
      problemType = 'Section 148A(b) Show Cause Notice Defense',
      whatsappUpdates = true,
      name = 'Taxpayer',
    } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and phone number are required.',
      });
    }

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'ITDSP' + Math.floor(100000 + Math.random() * 900000);

    const newApplication = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'income-tax-dispute-appeals',
      service_name: 'Income Tax Dispute & Appeals',
      module_type: 'INCOME_TAX_DISPUTE_APPEALS',
      status: 'LEAD_CAPTURED',
      payment_completed: false,
      assigned_officer: 'CA & Senior Tax Advocate Harishchandra Dave (Ex-ITAT Member Advisor & Senior Partner)',
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
      message: 'Income Tax dispute inquiry received. Senior Tax Counsel will connect with you shortly.',
      leadId: appId,
      applicationNumber: appNumber,
      assignedCounsel: 'CA & Senior Tax Advocate Harishchandra Dave (Ex-ITAT Member Advisor & Senior Partner)',
      problemType,
      language,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to record Income Tax dispute inquiry.',
      error: err.message,
    });
  }
});

/**
 * POST /quote
 * Computes fee for Income Tax dispute & appeal packages.
 */
router.post('/quote', (req, res) => {
  try {
    const { plan = 'starter' } = req.body;
    const norm = String(plan).toLowerCase();

    let fee = 7999;
    let original = 14999;
    let name = 'Assessment Scrutiny & Appeal Strategy Memo';

    if (norm === 'standard' || norm === 'form35' || norm === 'cita') {
      fee = 19999;
      original = 34999;
      name = 'Complete CIT(Appeals) Filing & Faceless Representation (Form 35)';
    } else if (norm === 'elite' || norm === 'form36' || norm === 'itat') {
      fee = 49999;
      original = 89999;
      name = 'Income Tax Appellate Tribunal (ITAT) Appeal Representation (Form 36)';
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
      message: 'Failed to compute Income Tax dispute fee.',
      error: err.message,
    });
  }
});

/**
 * POST /schedule
 * Saves scheduled date and time slot for case conference.
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
      message: 'Dispute conference slot successfully scheduled.',
      scheduledDate,
      scheduledTimeSlot,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to schedule dispute conference slot.',
      error: err.message,
    });
  }
});

/**
 * POST /payment
 * Settles payment for Income Tax dispute advisory (from ₹7,999) and confirms appointment.
 */
router.post('/payment', optionalAuth, (req, res) => {
  try {
    const {
      orderId,
      method = 'UPI',
      subMethod = 'PhonePe',
      amount = 7999,
      scheduledDate = '4 November 2026',
      scheduledTimeSlot = '1:30 PM',
      problemType = 'Section 148A(b) Show Cause Notice Defense',
      applicantEmail = 'taxpayer@bharatfiling.com',
      applicantPhone = '9876543210',
    } = req.body;

    const generatedTxnId = `BFP-ITD-${Date.now().toString().slice(-8)}`;
    const resolvedOrderId = orderId || `#IT-DSP-${Math.floor(100000 + Math.random() * 900000)}`;

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
        service_id: 'income-tax-dispute-appeals',
        service_name: 'Income Tax Dispute & Appeals',
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
      app.assigned_officer = 'CA & Senior Tax Advocate Harishchandra Dave (Ex-ITAT Member Advisor & Senior Partner)';
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
      message: 'Payment verified and Income Tax appellate counsel confirmed.',
      transactionId: generatedTxnId,
      orderNumber: resolvedOrderId,
      amount,
      scheduledDate,
      scheduledTimeSlot,
      assignedCounsel: 'CA & Senior Tax Advocate Harishchandra Dave (Ex-ITAT Member Advisor & Senior Partner)',
      callNotice: 'Our senior tax counsel will call you shortly from 80448 ***** at your booked slot.',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to settle Income Tax dispute payment.',
      error: err.message,
    });
  }
});

export default router;
