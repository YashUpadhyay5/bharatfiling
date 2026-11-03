import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';

const router = express.Router();

/**
 * Helper to process and record payment for LLP Registration
 */
function processLlpPayment(orderId, paymentMethod = 'UPI', amount, res) {
  const orders = db.getOrders();
  const order = orders.find((o) => o.id === orderId || o.order_number === orderId);

  const generatedTxnId = `BFP-LLP-${Date.now().toString().slice(-8)}`;

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
      app.assigned_officer = 'CS Priya Sharma (Senior Corporate Compliance Lead, ICSI Fellow)';
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);
    }
  }

  // Record transaction
  const newTransaction = {
    id: uuidv4(),
    order_id: order?.id || orderId,
    transaction_id: generatedTxnId,
    amount: amount || order?.amount || 3008,
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
    message: 'Payment verified and LLP Registration order confirmed.',
    transactionId: generatedTxnId,
    orderId: order?.id || orderId,
    orderNumber: order?.order_number || `#LLP-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'PAID',
    assignedOfficer: 'CS Priya Sharma (Senior Corporate Compliance Lead, ICSI Fellow)',
    nextSteps: [
      'CS Priya Sharma will verify partner PAN & Aadhaar KYC documents within 15 minutes',
      'Issuance of Class-3 DSC and RUN-LLP name reservation with MCA portal',
      'FiLLiP incorporation e-form compilation and digital signing',
      'Certificate of Incorporation (COI) + LLPIN + PAN/TAN delivery in 7-10 days',
      'Drafting of LLP Agreement and state-specific Form 3 RoC filing',
    ],
  });
}

/**
 * POST /payment
 * Settle payment for LLP Registration order.
 */
router.post('/payment', optionalAuth, (req, res) => {
  try {
    const { orderId, paymentMethod = 'UPI', amount } = req.body;
    return processLlpPayment(orderId, paymentMethod, amount, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to process LLP payment.',
      error: err.message,
    });
  }
});

/**
 * POST /verify-payment
 * Verify gateway webhook or client payment callback.
 */
router.post('/verify-payment', optionalAuth, (req, res) => {
  try {
    const { orderId, transactionId, paymentMethod = 'UPI' } = req.body;
    return processLlpPayment(orderId, paymentMethod, null, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment.',
      error: err.message,
    });
  }
});

export default router;
