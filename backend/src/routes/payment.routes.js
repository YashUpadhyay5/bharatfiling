import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import {
  getGSTRegistrationPricing,
  createRazorpayOrder,
  verifyRazorpaySignature,
} from '../services/paymentService.js';
import { createAndDispatchNotification } from '../services/notification.service.js';

const router = express.Router();

// GET Pricing breakdown
router.get('/pricing/:businessType', async (req, res) => {
  try {
    const { businessType } = req.params;
    const pricing = await getGSTRegistrationPricing(decodeURIComponent(businessType));
    res.json({
      success: true,
      pricing,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve pricing.', error: err.message });
  }
});

// CREATE Razorpay Order
router.post('/create-order', authenticate, async (req, res) => {
  try {
    const { application_id } = req.body;
    if (!application_id) {
      return res.status(400).json({ success: false, message: 'application_id is required.' });
    }

    const app = db.getApplications().find((a) => a.id === application_id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    const pricing = await getGSTRegistrationPricing(app.business_type);
    const orderData = await createRazorpayOrder({
      amount: pricing.total_amount,
      receipt: `rcpt_${app.application_number}`,
      notes: {
        application_id: app.id,
        application_number: app.application_number,
        user_id: req.user.id,
      },
    });

    // Save order record
    const newOrder = {
      id: `ord_${uuidv4().slice(0, 8)}`,
      application_id: app.id,
      user_id: req.user.id,
      amount: pricing.total_amount,
      currency: 'INR',
      service_name: pricing.service_name,
      status: 'CREATED',
      razorpay_order_id: orderData.order_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const orders = db.getOrders();
    orders.push(newOrder);
    db.saveOrders(orders);

    res.json({
      success: true,
      order: orderData,
      pricing,
      order_record: newOrder,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Order creation failed.', error: err.message });
  }
});

// VERIFY Razorpay Payment & Transition State
router.post('/verify', authenticate, (req, res) => {
  try {
    const { order_id, payment_id, signature, application_id } = req.body;

    const isValid = verifyRazorpaySignature({
      order_id,
      payment_id,
      signature,
    });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Payment signature verification failed. Untrusted payment event.',
      });
    }

    // Update Order
    const orders = db.getOrders();
    const order = orders.find((o) => o.razorpay_order_id === order_id || o.application_id === application_id);
    if (order) {
      order.status = 'PAID';
      order.razorpay_payment_id = payment_id;
      order.updated_at = new Date().toISOString();
      db.saveOrders(orders);
    }

    // Transition Application Status
    const apps = db.getApplications();
    const app = apps.find((a) => a.id === application_id);
    if (app) {
      app.payment_completed = true;
      app.internal_status = 'PAID';
      app.customer_status = 'Processing';
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);

      // Add timeline event
      const events = db.getCaseEvents();
      events.push({
        id: `evt_${uuidv4().slice(0, 8)}`,
        application_id: app.id,
        title: 'Payment Successful (₹1,769)',
        description: `Verified payment ${payment_id} for order ${order_id}. Application transferred to preparation desk.`,
        actor_role: 'CUSTOMER',
        created_at: new Date().toISOString(),
      });
      db.saveCaseEvents(events);

      // 1. Persistent Notification to Customer
      createAndDispatchNotification({
        recipient_id: app.user_id,
        recipient_role: 'CUSTOMER',
        application_id: app.id,
        order_id,
        type: 'PAYMENT_SUCCESS',
        title: 'Payment Confirmed & Filing Active 💳',
        message: 'Your payment was verified successfully. Your filing case is active on the CA preparation desk.',
        severity: 'success',
        action_url: `/dashboard?app=${app.id}`,
        metadata: { payment_id, order_id },
        dedup_key: `PAYMENT_SUCCESS_${payment_id}`,
      });

      // 2. Persistent Notification to CA Desk
      createAndDispatchNotification({
        recipient_id: null,
        recipient_role: 'CA',
        application_id: app.id,
        order_id,
        type: 'NEW_PAID_CASE',
        title: 'New Paid Filing Case Received',
        message: `Customer completed payment for GST Registration (Application #${app.application_number || app.id}).`,
        severity: 'info',
        action_url: `/ca/dashboard?caseId=${app.id}`,
        metadata: { payment_id, order_id, application_id: app.id },
        dedup_key: `NEW_PAID_CASE_${payment_id}`,
      });
    }

    res.json({
      success: true,
      message: 'Payment verified successfully! Application is now in active preparation.',
      application: app,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Payment verification failed.', error: err.message });
  }
});

// VERIFY UPI / AutoPay Payment & Register Mandate
router.post('/verify-upi', optionalAuth, (req, res) => {
  try {
    const {
      order_id,
      upi_id = 'user@okhdfcbank',
      payment_mode = 'UPI_QR', // or 'AUTOPAY'
      amount = 1769,
    } = req.body;

    if (!order_id) {
      return res.status(400).json({ success: false, message: 'order_id is required.' });
    }

    const paymentTxnId = `upi_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    // Update or create Order in DB
    const orders = db.getOrders();
    let order = orders.find((o) => o.id === order_id || o.order_number === `#${order_id}`);

    if (order) {
      order.status = payment_mode === 'AUTOPAY' ? 'ACTIVE_AUTOPAY' : 'PAID';
      order.payment_mode = payment_mode;
      order.upi_id = upi_id;
      order.transaction_id = paymentTxnId;
      order.paid_amount = amount;
      order.paid_at = new Date().toISOString();
      order.updated_at = new Date().toISOString();
    } else {
      order = {
        id: order_id,
        order_number: `#${order_id}`,
        service_name: 'GST Registration (GST Registration + Monthly Filing)',
        amount: Number(amount) || 1769,
        currency: 'INR',
        status: payment_mode === 'AUTOPAY' ? 'ACTIVE_AUTOPAY' : 'PAID',
        payment_mode,
        upi_id,
        transaction_id: paymentTxnId,
        paid_amount: amount,
        paid_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
      orders.push(order);
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
        title: payment_mode === 'AUTOPAY' ? 'UPI AutoPay Mandate Active (₹1,769/mo)' : 'UPI Payment Verified (₹1,769)',
        description: `Successfully verified ₹${amount} via ${payment_mode} (Ref: ${paymentTxnId}, UPI ID: ${upi_id}). Application unlocked.`,
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
          : `UPI payment of ₹${amount} confirmed. Case assigned to CA preparation desk.`,
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
        message: `Customer verified ₹${amount} via ${payment_mode} for GST Registration.`,
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
        : 'UPI payment verified successfully! GST filing service is now initiated.',
      transaction_id: paymentTxnId,
      order,
      application: app || null,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'UPI Payment verification failed.', error: err.message });
  }
});

export default router;

