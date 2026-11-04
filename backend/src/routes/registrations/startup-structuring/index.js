import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /lead
 * Captures startup structuring inquiry from landing page.
 */
router.post('/lead', optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      language = 'English',
      problemType = 'Co-Founder Equity Split & Reverse Vesting (4-Yr / 1-Yr Cliff)',
      whatsappUpdates = true,
      name = 'Founder',
    } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and phone number are required.',
      });
    }

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'STU' + Math.floor(100000 + Math.random() * 900000);

    const newApplication = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'startup-structuring-advisory',
      service_name: 'Startup Structuring Advisory',
      module_type: 'STARTUP_STRUCTURING',
      status: 'LEAD_CAPTURED',
      payment_completed: false,
      assigned_officer: 'Advocate Vikramaditya Singhal & CA Ananya Verma (VC & Startup Desk)',
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
      message: 'Startup structuring advisory inquiry received. Senior VC counsel will connect with you shortly.',
      leadId: appId,
      applicationNumber: appNumber,
      assignedAdvisor: 'Advocate Vikramaditya Singhal & CA Ananya Verma (VC & Startup Desk)',
      problemType,
      language,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to record startup advisory inquiry.',
      error: err.message,
    });
  }
});

/**
 * POST /quote
 * Computes fee for startup advisory packages.
 */
router.post('/quote', (req, res) => {
  try {
    const { plan = 'starter' } = req.body;
    const norm = String(plan).toLowerCase();

    let fee = 1499;
    let original = 2499;
    let name = 'Essential Structuring Advisory (60 Mins)';

    if (norm === 'standard' || norm === 'investment_ready') {
      fee = 2999;
      original = 4999;
      name = 'Investment-Ready Advisory + Term Sheet Review (90 Mins)';
    } else if (norm === 'elite' || norm === 'retainer') {
      fee = 6999;
      original = 12999;
      name = 'Full Founder Institutional Retainer (120 Mins / Monthly)';
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
      message: 'Failed to compute startup structuring fee.',
      error: err.message,
    });
  }
});

/**
 * POST /schedule
 * Saves scheduled date and time slot for startup advisory.
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
      message: 'Advisory slot successfully scheduled.',
      scheduledDate,
      scheduledTimeSlot,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to schedule advisory slot.',
      error: err.message,
    });
  }
});

/**
 * POST /payment
 * Settles payment for Startup Structuring Advisory (₹1,499) and confirms appointment.
 */
router.post('/payment', optionalAuth, (req, res) => {
  try {
    const {
      orderId,
      method = 'UPI',
      subMethod = 'PhonePe',
      amount = 1499,
      scheduledDate = '4 November 2026',
      scheduledTimeSlot = '1:30 PM',
      problemType = 'Co-Founder Equity Split & Reverse Vesting',
      applicantEmail = 'founder@bharatfiling.com',
      applicantPhone = '9876543210',
    } = req.body;

    const generatedTxnId = `BFP-STU-${Date.now().toString().slice(-8)}`;
    const resolvedOrderId = orderId || `#STARTUP-${Math.floor(100000 + Math.random() * 900000)}`;

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
        service_id: 'startup-structuring-advisory',
        service_name: 'Startup Structuring Advisory (60 Mins)',
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
      app.assigned_officer = 'Advocate Vikramaditya Singhal & CA Ananya Verma (VC & Startup Desk)';
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
      message: 'Payment verified and Startup Structuring Advisory confirmed.',
      transactionId: generatedTxnId,
      orderNumber: resolvedOrderId,
      amount,
      scheduledDate,
      scheduledTimeSlot,
      assignedAdvisors: 'Advocate Vikramaditya Singhal & CA Ananya Verma (VC & Startup Desk)',
      callNotice: 'Our senior startup counsel will call you shortly from 80448 ***** at your scheduled time slot.',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to settle startup advisory payment.',
      error: err.message,
    });
  }
});

export default router;
