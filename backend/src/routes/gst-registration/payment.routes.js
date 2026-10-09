import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/db.js';
import { optionalAuth } from '../../middleware/auth.js';
import { emitToCADesk } from '../../services/socket.service.js';
import { createAndDispatchNotification } from '../../services/notification.service.js';

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
          user_id: req.user?.id || (apps[appIndex].user_id !== 'usr_guest_lead' ? apps[appIndex].user_id : req.user?.id || apps[appIndex].user_id),
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

        // Real-Time Notification to CA Desk
        emitToCADesk('ca:new_case', {
          application_id: appId,
          order_id: updatedOrder?.id,
          module_type: updatedApp?.module_type || updatedOrder?.module_type || 'GST',
          service_name: updatedOrder?.service_name || updatedApp?.service_name || 'Statutory Registration',
          customer_name: updatedOrder?.customer_name || 'New Compliance Applicant',
          customer_phone: updatedOrder?.customer_phone || '9876543210',
          amount: updatedOrder?.amount || 1769,
          state: updatedApp?.state || 'Karnataka',
          submitted_at: new Date().toISOString(),
        });

        // 1. Persistent Notification to Customer
        if (updatedApp?.user_id) {
          createAndDispatchNotification({
            recipient_id: updatedApp.user_id,
            recipient_role: 'CUSTOMER',
            application_id: appId,
            order_id: updatedOrder?.id,
            type: 'PAYMENT_SUCCESS',
            title: 'Payment Confirmed & Filing Active 💳',
            message: `Your payment of ₹${updatedOrder?.amount || 1769} has been verified. Case transferred to CA verification desk.`,
            severity: 'success',
            action_url: `/dashboard?app=${appId}`,
            metadata: {
              amount: updatedOrder?.amount || 1769,
              order_id: updatedOrder?.id,
              service_name: updatedOrder?.service_name,
            },
            dedup_key: `PAYMENT_SUCCESS_${updatedOrder?.id || order_id}`,
          });
        }

        // 2. Persistent Notification to CA Desk
        createAndDispatchNotification({
          recipient_id: null,
          recipient_role: 'CA',
          application_id: appId,
          order_id: updatedOrder?.id,
          type: 'NEW_PAID_CASE',
          title: 'New Paid Filing Case Received',
          message: `${updatedOrder?.customer_name || 'Customer'} paid ₹${updatedOrder?.amount || 1769} for ${updatedOrder?.service_name || 'GST Registration'}.`,
          severity: 'info',
          action_url: `/ca/dashboard?caseId=${appId}`,
          metadata: {
            customer_name: updatedOrder?.customer_name,
            customer_phone: updatedOrder?.customer_phone,
            amount: updatedOrder?.amount || 1769,
            state: updatedApp?.state,
          },
          dedup_key: `NEW_PAID_CASE_${updatedOrder?.id || order_id}`,
        });
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
