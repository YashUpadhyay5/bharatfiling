import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /lead
 * Captures PF & ESI Monthly Returns & Compliance inquiry from landing page.
 */
router.post('/lead', optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      cityPincode = '',
      whatsappUpdates = true,
      name = 'Employer',
    } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and mobile number are required.',
      });
    }

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'PFESI' + Math.floor(100000 + Math.random() * 900000);

    const newApplication = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'pf-esi-monthly-returns',
      service_name: 'PF & ESI Monthly Returns & Compliance',
      module_type: 'PF_ESI_MONTHLY_RETURNS',
      status: 'LEAD_CAPTURED',
      payment_completed: false,
      assigned_officer: 'Labor Law Advocate & Senior EPFO/ESIC Lead Rajeshwar Rao',
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
      message: 'PF & ESI monthly returns inquiry received. Our labor law specialist will connect with you shortly.',
      leadId: appId,
      applicationNumber: appNumber,
      cityPincode,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to record PF & ESI inquiry.',
      error: err.message,
    });
  }
});

/**
 * POST /quote
 * Computes fee for PF & ESI monthly return tiers.
 */
router.post('/quote', (req, res) => {
  try {
    const { plan = 'starter', employeeCount = 10 } = req.body;
    const norm = String(plan).toLowerCase();

    let fee = 999;
    let original = 1999;
    let name = 'Starter PF & ESI Retainer (Up to 15 Employees)';

    if (norm === 'growth' || employeeCount > 15) {
      fee = 1999;
      original = 3499;
      name = 'Growth Establishment (Up to 50 Employees)';
    }
    if (norm === 'enterprise' || employeeCount > 50) {
      fee = 3999;
      original = 7999;
      name = 'Corporate & Multi-Branch Retainer (50 to 150+ Employees)';
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
      message: 'Failed to compute PF & ESI quote.',
      error: err.message,
    });
  }
});

/**
 * POST /payment
 * Settles payment for PF & ESI Expert Consultation / Retainer and confirms appointment.
 */
router.post('/payment', optionalAuth, (req, res) => {
  try {
    const {
      orderId,
      method = 'UPI',
      subMethod = 'PhonePe',
      amount = 525,
      includeLabourWelfare = true,
      applicantEmail = 'employer@bharatfiling.com',
      applicantPhone = '9876543210',
      cityPincode = '',
    } = req.body;

    const generatedTxnId = `BFP-PFESI-${Date.now().toString().slice(-8)}`;
    const resolvedOrderId = orderId || `#PFESI-${Math.floor(100000 + Math.random() * 900000)}`;

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
        service_id: 'pf-esi-monthly-returns',
        service_name: 'PF & ESI Monthly Returns & Compliance',
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
      app.assigned_officer = 'Labor Law Advocate & Senior EPFO/ESIC Lead Rajeshwar Rao';
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
      message: 'Payment verified and PF & ESI expert consultation confirmed.',
      transactionId: generatedTxnId,
      orderNumber: resolvedOrderId,
      amount,
      assignedSpecialist: 'Labor Law Advocate & Senior EPFO/ESIC Lead Rajeshwar Rao',
      callNotice: 'Our senior PF & ESI compliance specialist will call you shortly from 80448 ***** at your booked slot.',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to settle PF & ESI payment.',
      error: err.message,
    });
  }
});

export default router;
