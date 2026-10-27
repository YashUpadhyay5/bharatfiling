import express from 'express';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/:orderId/pay & POST /verify-payment
 * Simulates / processes payment for a Digital Signature Certificate (DSC) application.
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

    const txnId = 'BFP-DSC-' + Math.floor(100000 + Math.random() * 900000);
    const paidAt = new Date().toISOString();

    const assignedCa = {
      name: 'CA Rajesh Sharma (FCA, DISA)',
      membership_number: 'ICAI-54219',
      desk: 'CCA Licensed Registration Authority Compliance Desk',
      phone: '+91 98112 23344',
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
        amount: amount || orders[orderIndex].amount,
        updated_at: paidAt,
      };
      db.saveOrders(orders);
    }

    // Update linked application if found
    if (appIndex !== -1) {
      apps[appIndex] = {
        ...apps[appIndex],
        status: 'SUBMITTED',
        payment_completed: true,
        assigned_ca: assignedCa,
        transaction_id: txnId,
        paid_at: paidAt,
        amount: amount || apps[appIndex].amount,
        updated_at: paidAt,
      };
      db.saveApplications(apps);
    }

    res.json({
      success: true,
      message: 'Payment received. Class 3 DSC application submitted for Video KYC.',
      transactionId: txnId,
      order: orderIndex !== -1 ? orders[orderIndex] : null,
      application: appIndex !== -1 ? apps[appIndex] : null,
      assignedCa,
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
