import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';

const router = express.Router();

function processSection8Payment(orderId, paymentMethod = 'UPI', amount, res) {
  const orders = db.getOrders();
  const order = orders.find((o) => o.id === orderId || o.order_number === orderId);

  const generatedTxnId = `BFP-SEC8-${Date.now().toString().slice(-8)}`;

  if (order) {
    order.status = 'PAID';
    order.payment_status = 'PAID';
    order.payment_method = paymentMethod;
    order.transaction_id = generatedTxnId;
    order.updated_at = new Date().toISOString();
    db.saveOrders(orders);

    const apps = db.getApplications();
    const app = apps.find((a) => a.id === order.application_id);
    if (app) {
      app.status = 'UNDER_REVIEW';
      app.payment_completed = true;
      app.assigned_officer = 'CS Vikramaditya Rao (Senior NGO & Section 8 Law Specialist, ICSI)';
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);
    }
  }

  // Record transaction
  const newTransaction = {
    id: uuidv4(),
    order_id: order?.id || orderId,
    transaction_id: generatedTxnId,
    amount: amount || order?.amount || 1238,
    currency: 'INR',
    status: 'SUCCESS',
    payment_method: paymentMethod,
    gateway: 'BHARATFILING_MOCK_GATEWAY',
    created_at: new Date().toISOString(),
  };

  if (typeof db.getTransactions === 'function' && typeof db.saveTransactions === 'function') {
    const txns = db.getTransactions();
    txns.push(newTransaction);
    db.saveTransactions(txns);
  }

  return res.json({
    success: true,
    message: 'Payment verified and Section 8 Company registration order confirmed.',
    transactionId: generatedTxnId,
    orderId: order?.id || orderId,
    orderNumber: order?.order_number || `#SEC8-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'PAID',
    assignedOfficer: 'CS Vikramaditya Rao (Senior NGO & Section 8 Law Specialist, ICSI)',
    nextSteps: [
      'CS Vikramaditya Rao will review Form INC-13 charitable objects within 15 minutes',
      'Procurement of Class-3 Digital Signatures (DSC) for proposed directors',
      'RUN-MCA name reservation with non-profit suffix (Foundation/Council/Forum)',
      'Drafting of Memorandum of Association (MoA INC-13), AoA, and 3-Year Financial Projections',
      'Form INC-12 submission to Central Registration Centre for Central Govt License (INC-16)',
      'SPICe+ Part B incorporation filing with DIN, MoA, AoA, PAN, TAN, and Certificate of Incorporation (CIN)',
      'Initiation of Section 12A, Section 80G tax exemptions and NITI Aayog NGO Darpan portal enrollment',
    ],
  });
}

/**
 * POST /payment
 * Settle payment for Section 8 Company registration.
 */
router.post('/payment', optionalAuth, (req, res) => {
  try {
    const { orderId, paymentMethod = 'UPI', amount } = req.body;
    return processSection8Payment(orderId, paymentMethod, amount, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to process Section 8 Company payment.',
      error: err.message,
    });
  }
});

/**
 * POST /payment/settle
 * Frontend payment desk settlement endpoint.
 */
router.post('/payment/settle', optionalAuth, (req, res) => {
  try {
    const { orderId, method = 'UPI', amount } = req.body;
    return processSection8Payment(orderId, method, amount, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to settle Section 8 payment.',
      error: err.message,
    });
  }
});

/**
 * POST /verify-payment
 * Verify gateway webhook or payment callback.
 */
router.post('/verify-payment', optionalAuth, (req, res) => {
  try {
    const { orderId, paymentMethod = 'UPI' } = req.body;
    return processSection8Payment(orderId, paymentMethod, null, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment.',
      error: err.message,
    });
  }
});

export default router;
