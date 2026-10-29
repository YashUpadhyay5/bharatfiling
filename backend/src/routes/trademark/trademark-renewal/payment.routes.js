import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';

const router = express.Router();

/**
 * POST /checkout/:orderId/pay
 * Simulates payment for trademark renewal (Form TM-R) and assigns dedicated IP counsel.
 */
router.post('/checkout/:orderId/pay', optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      paymentMethod = 'UPI',
      upiApp = 'phonepe',
      transactionId,
      amount,
      customerEmail,
      customerPhone,
    } = req.body;

    const orders = db.getOrders();
    const order = orders.find((o) => o.id === orderId || o.order_number === orderId);

    const generatedTxnId =
      transactionId || `BFP-TMREN-${Math.floor(100000 + Math.random() * 900000)}`;

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
        app.assigned_officer = 'Adv. Lakshita Arya (Senior Trademark & IP Attorney)';
        app.updated_at = new Date().toISOString();
        db.saveApplications(apps);
      }
    }

    // Record transaction
    const newTransaction = {
      id: uuidv4(),
      order_id: order?.id || orderId,
      transaction_id: generatedTxnId,
      amount: amount || order?.amount || 1769,
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
      message:
        'Payment completed successfully. Form TM-R drafting and IP India e-Register renewal assigned to Adv. Lakshita Arya.',
      transaction: newTransaction,
      order: order || null,
      assigned_officer: 'Adv. Lakshita Arya (Senior Trademark & IP Attorney)',
      guaranteedTimeline: 'Form TM-R Drafting & Filing within 24 Hours',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Payment processing failed.',
      error: err.message,
    });
  }
});

export default router;
