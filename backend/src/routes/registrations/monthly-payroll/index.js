import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /lead
 * Captures Online Payroll Management System inquiry from landing page.
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
    const appNumber = 'PAYROLL' + Math.floor(100000 + Math.random() * 900000);

    const newApplication = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'monthly-payroll',
      service_name: 'Monthly Payroll Management System',
      module_type: 'MONTHLY_PAYROLL_MANAGEMENT',
      status: 'LEAD_CAPTURED',
      payment_completed: false,
      assigned_officer: 'Senior Payroll & Labor Law Compliance Specialist',
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
      message: 'Payroll management inquiry received. Our payroll specialist will connect with you shortly.',
      leadId: appId,
      applicationNumber: appNumber,
      cityPincode,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to record payroll management inquiry.',
      error: err.message,
    });
  }
});

/**
 * POST /quote
 * Computes fee for monthly payroll plans.
 */
router.post('/quote', (req, res) => {
  try {
    const { plan = 'starter', employeeCount = 10 } = req.body;
    const norm = String(plan).toLowerCase();

    let fee = 1999;
    let original = 3999;
    let name = 'Starter Payroll (Up to 10 Employees)';

    if (norm === 'growth' || employeeCount > 10) {
      fee = 3999;
      original = 6999;
      name = 'Growth Payroll & Statutory Returns (Up to 30 Employees)';
    }
    if (norm === 'enterprise' || employeeCount > 30) {
      fee = 7999;
      original = 14999;
      name = 'Enterprise HR Retainer (30 to 100+ Employees)';
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
      message: 'Failed to compute payroll quote.',
      error: err.message,
    });
  }
});

/**
 * POST /payment
 * Settles payment for Payroll Expert Consultation / Management and confirms appointment.
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

    const generatedTxnId = `BFP-PAY-${Date.now().toString().slice(-8)}`;
    const resolvedOrderId = orderId || `#PAY-${Math.floor(100000 + Math.random() * 900000)}`;

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
        service_id: 'monthly-payroll',
        service_name: 'Monthly Payroll Management System',
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
      app.assigned_officer = 'Senior Payroll & Labor Law Compliance Specialist';
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
      message: 'Payment verified and payroll expert consultation confirmed.',
      transactionId: generatedTxnId,
      orderNumber: resolvedOrderId,
      amount,
      assignedSpecialist: 'Senior Payroll & Labor Law Compliance Specialist',
      callNotice: 'Our senior payroll specialist will call you shortly from 80448 *****.',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to settle payroll payment.',
      error: err.message,
    });
  }
});

export default router;
