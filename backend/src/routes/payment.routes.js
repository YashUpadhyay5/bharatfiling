import express from 'express';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';
import { optionalAuth } from '../middleware/auth.js';
import { GUEST_USER_ID } from '../middleware/ownership.js';
import { createAndDispatchNotification } from '../services/notification.service.js';
import { ENV } from '../config/env.js';

const router = express.Router();

// VERIFY UPI / AutoPay / Card / Net Banking Payment & Register Mandate
router.post('/verify-upi', optionalAuth, (req, res) => {
  try {
    if (!ENV.ALLOW_SIMULATED_PAYMENTS) {
      return res.status(503).json({
        success: false,
        message: 'Online payments are being enabled for this service. Please contact support to complete your order.',
      });
    }

    const { order_id } = req.body;
    let { upi_id = 'user@okhdfcbank', payment_mode = 'UPI_QR' } = req.body;

    if (!order_id || typeof order_id !== 'string') {
      return res.status(400).json({ success: false, message: 'order_id is required.' });
    }
    if (!['UPI_QR', 'AUTOPAY', 'CARD', 'NETBANKING'].includes(payment_mode)) {
      payment_mode = 'UPI_QR';
    }
    // UPI VPA format only applies to the UPI payment modes; card/netbanking carry no VPA
    if (payment_mode === 'UPI_QR' || payment_mode === 'AUTOPAY') {
      upi_id = String(upi_id).slice(0, 80);
      if (!/^[A-Za-z0-9._-]{2,64}@[A-Za-z0-9.-]{2,32}$/.test(upi_id)) {
        upi_id = 'unspecified@upi';
      }
    } else {
      upi_id = '';
    }

    const paymentTxnId = `upi_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    // Only an order created by our own quote flow can be settled
    const orders = db.getOrders();
    let order = orders.find((o) => o.id === order_id || o.order_number === `#${order_id}`);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }
    if (order.user_id && order.user_id !== GUEST_USER_ID) {
      const u = req.user;
      if (!u || (u.id !== order.user_id && u.role !== 'ADMIN' && u.role !== 'CA')) {
        return res.status(403).json({ success: false, message: 'You are not allowed to pay for this order.' });
      }
    }
    if (order.status === 'PAID' || order.status === 'ACTIVE_AUTOPAY') {
      return res.json({
        success: true,
        message: 'Payment already verified.',
        transaction_id: order.transaction_id,
        order,
        application: db.getApplications().find((a) => a.id === order.application_id) || null,
      });
    }
    // The charged amount is whatever the server quoted - never a client supplied figure
    const amount = order.amount;
    const modeLabel = { UPI_QR: 'UPI', AUTOPAY: 'UPI AutoPay', CARD: 'Card', NETBANKING: 'Net Banking' }[payment_mode] || 'UPI';

    {
      order.status = payment_mode === 'AUTOPAY' ? 'ACTIVE_AUTOPAY' : 'PAID';
      order.payment_mode = payment_mode;
      order.upi_id = upi_id;
      order.transaction_id = paymentTxnId;
      order.paid_amount = amount;
      order.paid_at = new Date().toISOString();
      order.updated_at = new Date().toISOString();
    }
    db.saveOrders(orders);

    // Update application if linked
    const apps = db.getApplications();
    const app = apps.find((a) => a.id === order.application_id || a.application_number === order.application_number);
    if (app) {
      app.payment_completed = true;
      app.internal_status = 'PAID';
      app.customer_status = 'Filing Dossier Active';
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);

      const events = db.getCaseEvents();
      events.push({
        id: `evt_${uuidv4().slice(0, 8)}`,
        application_id: app.id,
        title: payment_mode === 'AUTOPAY' ? `UPI AutoPay Mandate Active (₹${amount}/mo)` : `${modeLabel} Payment Verified (₹${amount})`,
        description: `Successfully verified ₹${amount} via ${modeLabel} (Ref: ${paymentTxnId}${upi_id ? `, UPI ID: ${upi_id}` : ''}). Application unlocked.`,
        actor_role: 'CUSTOMER',
        created_at: new Date().toISOString(),
      });
      db.saveCaseEvents(events);

      // 1. Persistent Notification to Customer
      createAndDispatchNotification({
        recipient_id: app.user_id,
        recipient_role: 'CUSTOMER',
        application_id: app.id,
        order_id: order?.id,
        type: payment_mode === 'AUTOPAY' ? 'AUTOPAY_ACTIVATED' : 'PAYMENT_SUCCESS',
        title: payment_mode === 'AUTOPAY' ? 'UPI AutoPay Mandate Active ⚡' : 'Payment Verified Successfully 💳',
        message: payment_mode === 'AUTOPAY'
          ? `AutoPay recurring mandate of ₹${amount}/mo authorized. Filing dossier activated.`
          : `${modeLabel} payment of ₹${amount} confirmed. Case assigned to CA preparation desk.`,
        severity: 'success',
        action_url: `/dashboard?app=${app.id}`,
        metadata: { paymentTxnId, upi_id, amount, payment_mode },
        dedup_key: `PAYMENT_UPI_${paymentTxnId}`,
      });

      // 2. Persistent Notification to CA Desk
      createAndDispatchNotification({
        recipient_id: null,
        recipient_role: 'CA',
        application_id: app.id,
        order_id: order?.id,
        type: 'NEW_PAID_CASE',
        title: 'New Paid Filing Case Received',
        message: `Customer verified ₹${amount} via ${modeLabel} for GST Registration.`,
        severity: 'info',
        action_url: `/ca/dashboard?caseId=${app.id}`,
        metadata: { paymentTxnId, amount, payment_mode },
        dedup_key: `NEW_PAID_CASE_${paymentTxnId}`,
      });
    }

    res.json({
      success: true,
      message: payment_mode === 'AUTOPAY'
        ? 'UPI AutoPay mandate established successfully! Recurring billing activated.'
        : `${modeLabel} payment verified successfully! GST filing service is now initiated.`,
      transaction_id: paymentTxnId,
      order,
      application: app || null,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'UPI Payment verification failed.', error: err.message });
  }
});

export default router;
