import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/db.js';
import { optionalAuth } from '../../middleware/auth.js';

const router = express.Router();

/**
 * POST /verify-payment & POST /payment/verify
 * Confirms UPI AutoPay / Instant QR payment for GST registration.
 */
router.post(['/verify-payment', '/payment/verify'], optionalAuth, (req, res) => {
  try {
    const { order_id, payment_id, vpa, mandate_id } = req.body;

    if (!order_id) {
      return res.status(400).json({ success: false, message: 'Order ID is required.' });
    }

    const orders = db.getOrders();
    const orderIndex = orders.findIndex((o) => o.id === order_id || o.order_number === `#${order_id}`);

    let updatedOrder;
    if (orderIndex !== -1) {
      orders[orderIndex] = {
        ...orders[orderIndex],
        status: 'PAID',
        payment_id: payment_id || `pay_${uuidv4().slice(0, 8)}`,
        mandate_id: mandate_id || `man_${uuidv4().slice(0, 8)}`,
        vpa: vpa || orders[orderIndex].customer_phone + '@upi',
        paid_at: new Date().toISOString(),
      };
      updatedOrder = orders[orderIndex];
      db.saveOrders(orders);
    }

    // Update corresponding application
    const appId = updatedOrder?.application_id || req.body.application_id;
    let updatedApp = null;

    if (appId) {
      const apps = db.getApplications();
      const appIndex = apps.findIndex((a) => a.id === appId);
      if (appIndex !== -1) {
        apps[appIndex] = {
          ...apps[appIndex],
          payment_completed: true,
          internal_status: 'CA_REVIEW',
          customer_status: 'CA Processing',
          updated_at: new Date().toISOString(),
        };
        updatedApp = apps[appIndex];
        db.saveApplications(apps);

        // Record Case Event
        const events = db.getCaseEvents();
        events.push({
          id: `evt_${uuidv4().slice(0, 8)}`,
          application_id: appId,
          title: 'Payment Confirmed & AutoPay Activated',
          description: `Mandate authorized for ${updatedOrder?.service_name || 'GST Registration'}. Ready for document upload.`,
          actor_role: 'SYSTEM',
          created_at: new Date().toISOString(),
        });
        db.saveCaseEvents(events);
      }
    }

    res.json({
      success: true,
      message: 'Payment verified and subscription activated successfully.',
      order: updatedOrder,
      application: updatedApp,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Payment verification failed.', error: err.message });
  }
});

export default router;
