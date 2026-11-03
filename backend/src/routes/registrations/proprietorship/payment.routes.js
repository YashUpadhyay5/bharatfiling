import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';

const router = express.Router();

/**
 * Helper to process and record payment for Sole Proprietorship
 */
function processProprietorshipPayment(orderId, paymentMethod = 'UPI', amount, res) {
  const orders = db.getOrders();
  const order = orders.find((o) => o.id === orderId || o.order_number === orderId);

  const generatedTxnId = `BFP-PROP-${Date.now().toString().slice(-8)}`;

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
      app.assigned_officer = 'CA Aditya Verma (Sr. MSME & Business Registration Specialist)';
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
    message: 'Payment verified and Sole Proprietorship order confirmed.',
    transactionId: generatedTxnId,
    orderId: order?.id || orderId,
    orderNumber: order?.order_number || `#PROP-${Math.floor(100000 + Math.random() * 900000)}`,
    status: 'PAID',
    assignedOfficer: 'CA Aditya Verma (Sr. MSME & Business Registration Specialist)',
    nextSteps: [
      'CA Relationship Manager will contact you within 15 minutes',
      'Ministry of MSME Udyam Certificate generation within 24 hours',
      'Priority Zero-Balance Current Account opening assistance',
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
    return processProprietorshipPayment(orderId, paymentMethod, amount, res);
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
    return processProprietorshipPayment(orderId, paymentMethod, amountPaid, res);
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
 * Retrieves full order details and invoice data for Sole Proprietorship.
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
      order,
      application: app || null,
      invoice: {
        invoiceNumber: `INV-${order.order_number.replace('#', '')}`,
        invoiceDate: order.created_at,
        service: 'Sole Proprietorship Registration',
        tradeName: app?.fields_data?.trade_name || 'My Sole Proprietorship',
        baseAmount: order.base_amount || 999,
        taxes: order.taxes_amount || 239,
        total: order.amount || 1238,
        status: order.payment_status || 'PAID',
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve order details.',
      error: err.message,
    });
  }
});

export default router;
