import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';

const router = express.Router();

/**
 * POST /checkout/:orderId/pay
 * Simulates / processes payment for an EPF order and dispatches application to CA desk.
 */
router.post('/checkout/:orderId/pay', optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      paymentMethod = 'UPI',
      upiApp = 'phonepe',
      transactionId,
      amount,
    } = req.body;

    const orders = db.getOrders();
    const order = orders.find((o) => o.id === orderId || o.order_number === orderId);

    const generatedTxnId = transactionId || `BFP-EPF-${Math.floor(100000 + Math.random() * 900000)}`;

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
        app.assigned_officer = 'CS Rajesh Varma (Sr. Labour Law Officer)';
        app.updated_at = new Date().toISOString();
        db.saveApplications(apps);
      }
    }

    // Record transaction
    const newTransaction = {
      id: uuidv4(),
      order_id: order?.id || orderId,
      transaction_id: generatedTxnId,
      amount: amount || order?.amount || 3561,
      currency: 'INR',
      status: 'SUCCESS',
      payment_method: paymentMethod,
      gateway: 'BHARATFILING_MOCK_GATEWAY',
      created_at: new Date().toISOString(),
    };

    if (typeof db.getTransactions === 'function') {
      const txns = db.getTransactions();
      txns.push(newTransaction);
      if (typeof db.saveTransactions === 'function') {
        db.saveTransactions(txns);
      }
    }

    res.json({
      success: true,
      message: 'Payment completed successfully. EPF application dispatched to EPFO CA desk.',
      transaction: newTransaction,
      receipt: {
        orderId: order?.id || orderId,
        orderNumber: order?.order_number || `#EPF-${Math.floor(100000 + Math.random() * 900000)}`,
        transactionId: generatedTxnId,
        amount: newTransaction.amount,
        status: 'PAID',
        paymentMethod,
        date: new Date().toISOString(),
        caAssigned: 'CS Rajesh Varma (Sr. Labour Law Officer)',
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Payment processing failed.',
      error: err.message,
    });
  }
});

/**
 * GET /checkout/:orderId/receipt
 * Retrieves tax invoice receipt for an EPF order.
 */
router.get('/checkout/:orderId/receipt', (req, res) => {
  try {
    const { orderId } = req.params;
    const order = db.getOrders().find((o) => o.id === orderId || o.order_number === orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const app = db.getApplications().find((a) => a.id === order.application_id);

    res.json({
      success: true,
      receipt: {
        orderId: order.id,
        orderNumber: order.order_number,
        transactionId: order.transaction_id || `BFP-${order.id.slice(0, 8)}`,
        amount: order.amount,
        pricing: order.pricing,
        status: order.status,
        customer: order.customer,
        applicationNumber: app?.application_number || 'EPF-PENDING',
        businessName: app?.fields_data?.businessName || 'Business Establishment',
        date: order.updated_at || order.created_at,
        caAssigned: app?.assigned_officer || 'CS Rajesh Varma (Sr. Labour Law Officer)',
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve receipt.',
      error: err.message,
    });
  }
});

export default router;
