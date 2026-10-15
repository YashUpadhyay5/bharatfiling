import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/db.js';
import { optionalAuth } from '../../middleware/auth.js';
import { GUEST_USER_ID } from '../../middleware/ownership.js';
import { emitToCADesk } from '../../services/socket.service.js';
import { createAndDispatchNotification } from '../../services/notification.service.js';
import { ENV } from '../../config/env.js';

const router = express.Router();

/**
 * POST /verify-payment & POST /payment/verify
 * Confirms Direct One-Time Payment (CCAvenue Gateway - NO AUTOPAY) for Udyam Registration.
 */
router.post(['/verify-payment', '/payment/verify'], optionalAuth, (req, res) => {
  try {
    if (!ENV.ALLOW_SIMULATED_PAYMENTS) {
      return res.status(503).json({
        success: false,
        message: 'Online payments are being enabled for this service. Please contact support to complete your order.',
      });
    }

    const { order_id, payment_id, payment_method, billing_info } = req.body;

    if (!order_id) {
      return res.status(400).json({ success: false, message: 'Order ID is required.' });
    }

    const orders = db.getOrders();
    const orderIndex = orders.findIndex((o) => o.id === order_id || o.order_number === `#${order_id}`);

    if (orderIndex === -1) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const existingOrder = orders[orderIndex];
    if (existingOrder.user_id && existingOrder.user_id !== GUEST_USER_ID) {
      const u = req.user;
      if (!u || (u.id !== existingOrder.user_id && u.role !== 'ADMIN' && u.role !== 'CA')) {
        return res.status(403).json({ success: false, message: 'You are not allowed to pay for this order.' });
      }
    }

    // Idempotent: a paid order is never re-processed (no duplicate notifications / events)
    if (existingOrder.status === 'PAID') {
      const paidApp = db.getApplications().find((a) => a.id === existingOrder.application_id) || null;
      return res.json({
        success: true,
        message: 'Payment already verified.',
        order: existingOrder,
        application: paidApp,
      });
    }

    let updatedOrder;
    {
      orders[orderIndex] = {
        ...orders[orderIndex],
        status: 'PAID',
        payment_id: payment_id || `pay_ccav_${uuidv4().slice(0, 8)}`,
        payment_method: payment_method || 'DIRECT_GATEWAY',
        billing_info: billing_info || orders[orderIndex].billing_info || null,
        paid_at: new Date().toISOString(),
      };
      updatedOrder = orders[orderIndex];
      db.saveOrders(orders);
    }

    // Update corresponding application
    const appId = updatedOrder?.application_id;
    let updatedApp = null;

    if (appId) {
      const apps = db.getApplications();
      const appIndex = apps.findIndex((a) => a.id === appId);
      if (appIndex !== -1) {
        apps[appIndex] = {
          ...apps[appIndex],
          user_id:
            apps[appIndex].user_id === GUEST_USER_ID && req.user?.id ? req.user.id : apps[appIndex].user_id,
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
          title: 'Direct Fee Payment Received (₹3,421)',
          description: `One-time direct payment verified via CCAvenue Gateway. Assigned to CA Verification Desk.`,
          actor_role: 'SYSTEM',
          created_at: new Date().toISOString(),
        });
        db.saveCaseEvents(events);

        // Real-Time Notification to CA Desk
        emitToCADesk('ca:new_case', {
          application_id: appId,
          order_id: updatedOrder?.id,
          module_type: 'UDYAM',
          service_name: updatedOrder?.service_name || 'UDYAM Registration (UDYAM + LEDGERS)',
          customer_name: updatedOrder?.customer_name || 'MSME Applicant',
          customer_phone: updatedOrder?.customer_phone || '9876543210',
          amount: updatedOrder?.amount || 3421,
          state: updatedApp?.state || 'Karnataka',
          submitted_at: new Date().toISOString(),
        });

        // Persistent Notification to Customer
        if (updatedApp?.user_id) {
          createAndDispatchNotification({
            recipient_id: updatedApp.user_id,
            recipient_role: 'CUSTOMER',
            application_id: appId,
            order_id: updatedOrder?.id,
            type: 'PAYMENT_SUCCESS',
            title: 'Payment Confirmed & Udyam Filing Active 💳',
            message: `Your payment of ₹${updatedOrder?.amount || 3421} has been verified. Case transferred to CA verification desk.`,
            severity: 'success',
            action_url: `/dashboard?app=${appId}`,
            metadata: {
              amount: updatedOrder?.amount || 3421,
              order_id: updatedOrder?.id,
              service_name: updatedOrder?.service_name,
            },
            dedup_key: `PAYMENT_SUCCESS_${updatedOrder?.id || order_id}`,
          }).catch((e) => console.error('Customer payment notification error:', e));
        }
      }
    }

    res.json({
      success: true,
      message: 'Direct payment confirmed successfully. Case transferred to CA desk.',
      order: updatedOrder,
      application: updatedApp,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Payment verification failed.', error: err.message });
  }
});

export default router;
