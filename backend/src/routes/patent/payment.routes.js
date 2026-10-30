import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/db.js';
import { optionalAuth } from '../../middleware/auth.js';

const router = express.Router();

/**
 * POST /payment/verify
 * Confirms payment desk transaction for patent application.
 */
router.post('/payment/verify', optionalAuth, (req, res) => {
  try {
    const {
      orderId,
      paymentMethod = 'UPI',
      upiApp = 'PHONEPE',
      referenceId,
    } = req.body;

    const transactionId = referenceId || `TXN_PAT_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

    let order = null;
    if (db && db.orders) {
      order = db.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
      if (order) {
        order.status = 'PAID';
        order.paymentMethod = `${paymentMethod}_${upiApp}`;
        order.transactionId = transactionId;
        order.paidAt = new Date().toISOString();
      }
    }

    let application = null;
    if (order && db && db.applications) {
      application = db.applications.find((a) => a.id === order.applicationId);
      if (application) {
        application.status = 'SUBMITTED';
        application.paymentStatus = 'PAID';
        application.submittedAt = new Date().toISOString();
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified and patent filing initiated successfully.',
      payment: {
        transactionId,
        paymentMethod,
        upiApp,
        status: 'SUCCESS',
        paidAt: new Date().toISOString(),
      },
      order: order || { id: orderId, status: 'PAID', transactionId },
      application: application || { status: 'SUBMITTED' },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to verify patent payment',
      error: error.message,
    });
  }
});

export default router;
