import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';
import { emitToCADesk } from '../../../services/socket.service.js';
import { createAndDispatchNotification } from '../../../services/notification.service.js';
import { ENV } from '../../../config/env.js';

const router = express.Router();

/**
 * POST /verify-payment & POST /payment/verify
 * Confirms Direct Payment (UPI/Cards/NetBanking) for FSSAI Registration.
 */
router.post(['/verify-payment', '/payment/verify'], optionalAuth, (req, res) => {
  try {
    if (!ENV.ALLOW_SIMULATED_PAYMENTS) {
      return res.status(503).json({
        success: false,
        message:
          'Online payments are being enabled for this service. Please contact support to complete your order.',
      });
    }

    const {
      order_id,
      payment_id,
      payment_method = 'UPI',
      upi_app = 'PhonePe',
      billing_info,
    } = req.body;

    if (!order_id) {
      return res.status(400).json({ success: false, message: 'Order ID is required.' });
    }

    const orders = db.getOrders();
    const orderIndex = orders.findIndex(
      (o) => o.id === order_id || o.order_number === `#${order_id}`
    );

    if (orderIndex === -1) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const existingOrder = orders[orderIndex];
    if (existingOrder.user_id && existingOrder.user_id !== GUEST_USER_ID) {
      const u = req.user;
      if (
        !u ||
        (u.id !== existingOrder.user_id && u.role !== 'ADMIN' && u.role !== 'CA')
      ) {
        return res
          .status(403)
          .json({ success: false, message: 'You are not allowed to pay for this order.' });
      }
    }

    // Idempotent: a paid order is never re-processed
    if (existingOrder.payment_status === 'COMPLETED') {
      const allPayments = db.getPayments();
      const existingPayment = allPayments.find((p) => p.order_id === existingOrder.id);
      return res.json({
        success: true,
        message: 'Order was already paid.',
        payment: existingPayment || null,
        order: existingOrder,
      });
    }

    const resolvedPaymentId = payment_id || `PAY-FSSAI-${uuidv4().substring(0, 8).toUpperCase()}`;

    // Record payment
    const payments = db.getPayments();
    const newPayment = {
      id: uuidv4(),
      payment_id: resolvedPaymentId,
      order_id: existingOrder.id,
      user_id: req.user ? req.user.id : existingOrder.user_id,
      amount: existingOrder.amount,
      currency: 'INR',
      status: 'SUCCESS',
      payment_method: payment_method.toUpperCase(),
      upi_app,
      billing_info: billing_info || null,
      created_at: new Date().toISOString(),
    };
    payments.unshift(newPayment);
    db.savePayments(payments);

    // Update Order Status
    orders[orderIndex] = {
      ...existingOrder,
      payment_status: 'COMPLETED',
      payment_method: payment_method.toUpperCase(),
      payment_id: resolvedPaymentId,
      user_id: req.user ? req.user.id : existingOrder.user_id,
      paid_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    db.saveOrders(orders);

    // Update Application status
    const apps = db.getApplications();
    const appIndex = apps.findIndex((a) => a.id === existingOrder.application_id);
    let updatedApp = null;

    if (appIndex !== -1) {
      apps[appIndex] = {
        ...apps[appIndex],
        status: 'SUBMITTED',
        payment_completed: true,
        payment_id: resolvedPaymentId,
        user_id: req.user ? req.user.id : apps[appIndex].user_id,
        updated_at: new Date().toISOString(),
      };
      db.saveApplications(apps);
      updatedApp = apps[appIndex];
    }

    // Notify CA compliance desk via real-time WebSockets
    try {
      emitToCADesk('new_application', {
        type: 'FSSAI_REGISTRATION_PAID',
        application_id: existingOrder.application_id,
        order_id: existingOrder.id,
        amount: existingOrder.amount,
        customer_email: existingOrder.fields_data?.email || req.user?.email,
      });
    } catch {
      // Ignore
    }

    // Dispatch confirmation notification
    try {
      createAndDispatchNotification({
        userId: req.user ? req.user.id : existingOrder.user_id,
        title: 'FSSAI License Order Placed',
        message: `Your payment of ₹${existingOrder.amount} for FSSAI registration was successful. Order ID: ${existingOrder.order_number}`,
        type: 'PAYMENT_SUCCESS',
      });
    } catch {
      // Ignore
    }

    res.json({
      success: true,
      message: 'FSSAI registration payment verified and application submitted to FoSCoS desk.',
      payment: newPayment,
      order: orders[orderIndex],
      application: updatedApp,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Payment verification failed.',
      error: err.message,
    });
  }
});

export default router;
