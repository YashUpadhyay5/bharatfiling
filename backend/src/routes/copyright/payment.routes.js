import express from 'express';
import { db } from '../../database/db.js';

const router = express.Router();

/**
 * POST /checkout/:orderId/pay
 * Simulates payment completion for copyright registration.
 */
router.post('/checkout/:orderId/pay', (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentMethod = 'UPI', upiApp = 'phonepe', amount } = req.body;

    const orders = db.getOrders();
    const order = orders.find((o) => o.id === orderId || o.order_number === orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Copyright order not found for payment.',
      });
    }

    order.status = 'PAID';
    order.payment_status = 'PAID';
    order.payment_method = paymentMethod;
    order.payment_app = upiApp;
    order.paid_amount = amount || order.amount;
    order.paid_at = new Date().toISOString();
    order.updated_at = new Date().toISOString();
    db.saveOrders(orders);

    const apps = db.getApplications();
    const app = apps.find((a) => a.id === order.application_id);
    if (app) {
      app.status = 'UNDER_REVIEW';
      app.payment_completed = true;
      app.assigned_officer = 'Adv. Raghavan Nambiar (Senior IP Advocate, Copyright & Software Division)';
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);
    }

    res.json({
      success: true,
      message: 'Copyright payment processed successfully. Application submitted to Copyright Registry desk.',
      order,
      application: app,
      assigned_officer: app ? app.assigned_officer : 'Adv. Raghavan Nambiar (Senior IP Advocate)',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to process copyright payment.',
      error: err.message,
    });
  }
});

export default router;
