import express from 'express';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/:orderId/pay & POST /verify-payment
 * Simulates / processes payment for a PT registration application.
 */
router.post(['/checkout/:orderId/pay', '/verify-payment', '/payment/verify'], optionalAuth, (req, res) => {
  try {
    const orderId = req.params.orderId || req.body.order_id || req.body.orderId;
    const {
      paymentMethod = 'UPI',
      upiApp = 'PhonePe',
      amount,
    } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: 'Order ID is required.' });
    }

    const orders = db.getOrders();
    const orderIndex = orders.findIndex(
      (o) => o.id === orderId || o.order_number === orderId || o.application_id === orderId
    );

    const apps = db.getApplications();
    const appIndex = apps.findIndex(
      (a) => a.id === orderId || a.application_number === orderId || (orderIndex !== -1 && a.id === orders[orderIndex]?.application_id)
    );

    if (orderIndex === -1 && appIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Order or Application not found for payment processing.',
      });
    }

    const txnId = 'BFP-PT-' + Math.floor(100000 + Math.random() * 900000);
    const paidAt = new Date().toISOString();

    const assignedCa = {
      name: 'CA Rajesh Sharma',
      membership_number: 'ICAI-54219',
      desk: 'Professional Tax & Statutory Payroll Compliance Desk',
      phone: '+91 98765 43210',
    };

    // Update order if found
    if (orderIndex !== -1) {
      orders[orderIndex] = {
        ...orders[orderIndex],
        status: 'PAID',
        payment_status: 'COMPLETED',
        payment_method: paymentMethod.toUpperCase(),
        upi_app: upiApp,
        transaction_id: txnId,
        paid_at: paidAt,
        updated_at: paidAt,
      };
      db.saveOrders(orders);
    }

    // Update application if found
    if (appIndex !== -1) {
      apps[appIndex] = {
        ...apps[appIndex],
        status: 'SUBMITTED',
        payment_completed: true,
        payment_method: paymentMethod.toUpperCase(),
        upi_app: upiApp,
        transaction_id: txnId,
        assigned_ca: assignedCa,
        paid_at: paidAt,
        updated_at: paidAt,
      };
      db.saveApplications(apps);
    }

    // Emit socket event if io instance is present
    const io = req.app.get('io');
    if (io) {
      io.emit('PT_REGISTRATION_PAID', {
        orderId,
        transactionId: txnId,
        amount: orderIndex !== -1 ? orders[orderIndex].amount : (apps[appIndex]?.amount || 6359),
        customerEmail: apps[appIndex]?.fields_data?.email,
        assignedCa,
      });
    }

    return res.json({
      success: true,
      message: 'Payment received successfully and persisted to database.',
      transactionId: txnId,
      status: 'PAYMENT_COMPLETED',
      assignedCa,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process payment.',
      error: err.message,
    });
  }
});

export default router;
