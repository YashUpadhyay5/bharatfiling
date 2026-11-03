import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';

const router = express.Router();

function processSubsidiaryPayment(orderId, paymentMethod = 'UPI', amount, res) {
  const orders = db.getOrders();
  const order = orders.find((o) => o.id === orderId || o.order_number === orderId);

  const generatedTxnId = `BFP-ISUB-${Date.now().toString().slice(-8)}`;

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
      app.assigned_officer = 'CS Ananya Sen (Cross-Border Corporate Law Specialist, ICSI)';
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
    message: 'Payment verified and Indian Subsidiary registration order confirmed.',
    transactionId: generatedTxnId,
    orderId: order?.id || orderId,
    orderNumber: order?.order_number || `#ISUB-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'PAID',
    assignedOfficer: 'CS Ananya Sen (Cross-Border Corporate Law Specialist, ICSI)',
    nextSteps: [
      'CS Ananya Sen will review Parent Entity apostille documents within 15 minutes',
      'Procurement of Class-3 Digital Signatures (DSC) for foreign & resident directors',
      'RUN-MCA name reservation with RoC appending "India Private Limited"',
      'SPICe+ Part B incorporation filing with DIN, MoA, AoA, PAN, and TAN',
      'Certificate of Incorporation (COI) issuance in 10-14 business days',
      'Guidance on FIRC inward remittance and RBI Form FC-GPR filing on FIRMS portal',
    ],
  });
}

/**
 * POST /payment
 * Settle payment for Indian Subsidiary registration.
 */
router.post('/payment', optionalAuth, (req, res) => {
  try {
    const { orderId, paymentMethod = 'UPI', amount } = req.body;
    return processSubsidiaryPayment(orderId, paymentMethod, amount, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to process Indian Subsidiary payment.',
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
    return processSubsidiaryPayment(orderId, paymentMethod, null, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment.',
      error: err.message,
    });
  }
});

export default router;
