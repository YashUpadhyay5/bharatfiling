import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';

const router = express.Router();

/**
 * Helper to process and record payment for Trust Registration
 */
function processTrustPayment(orderId, paymentMethod = 'UPI', amount, res) {
  const orders = db.getOrders();
  const order = orders.find((o) => o.id === orderId || o.order_number === orderId);

  const generatedTxnId = `BFP-TRST-${Date.now().toString().slice(-8)}`;

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
      app.assigned_officer = 'Adv. Sunita Kulkarni (Senior NGO & Trust Law Specialist, High Court)';
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);
    }
  }

  // Record transaction
  const newTransaction = {
    id: uuidv4(),
    order_id: order?.id || orderId,
    transaction_id: generatedTxnId,
    amount: amount || order?.amount || 11268,
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
    message: 'Payment verified and Trust Registration order confirmed.',
    transactionId: generatedTxnId,
    orderId: order?.id || orderId,
    orderNumber: order?.order_number || `#TRST-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'PAID',
    assignedOfficer: 'Adv. Sunita Kulkarni (Senior NGO & Trust Law Specialist, High Court)',
    nextSteps: [
      'Senior Advocate will review Trustee KYC within 15 minutes',
      'Trust Deed drafting on state-specific stamp paper within 48 hours',
      'Sub-Registrar appointment slot coordination and execution guide',
      'Filing of Section 12A & 80G tax exemptions upon registration',
    ],
  });
}

/**
 * POST /checkout/:orderId/pay
 */
router.post('/checkout/:orderId/pay', optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentMethod = 'UPI', amount } = req.body;
    return processTrustPayment(orderId, paymentMethod, amount, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to process payment.',
      error: err.message,
    });
  }
});

/**
 * POST /payment/verify
 * Direct payment verification endpoint called by frontend payment page
 */
router.post('/payment/verify', optionalAuth, (req, res) => {
  try {
    const { orderId, paymentMethod = 'UPI', amountPaid } = req.body;
    return processTrustPayment(orderId, paymentMethod, amountPaid, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment.',
      error: err.message,
    });
  }
});

/**
 * GET /orders/:orderId
 * Fetches order details & tax invoice
 */
router.get('/orders/:orderId', optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = db.getOrders();
    const order = orders.find((o) => o.id === orderId || o.order_number === orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const apps = db.getApplications();
    const app = apps.find((a) => a.id === order.application_id);

    res.json({
      success: true,
      order: {
        ...order,
        application: app,
        invoiceNumber: `INV-TRST-${order.order_number?.replace(/\D/g, '') || '001'}`,
        invoiceDate: order.created_at,
        hsnCode: '998231', // Legal advisory and representation services
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details.',
      error: err.message,
    });
  }
});

export default router;
