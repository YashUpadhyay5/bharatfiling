import express from 'express';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';
import { emitToCADesk } from '../../../services/socket.service.js';
import { createAndDispatchNotification } from '../../../services/notification.service.js';
import { ENV } from '../../../config/env.js';

const router = express.Router();

const MODE_LABEL = { UPI_QR: 'UPI', AUTOPAY: 'UPI AutoPay', CARD: 'Card', NETBANKING: 'Net Banking' };

/**
 * POST /payment/verify (Screen 4: Payment)
 * Confirms UPI / UPI AutoPay / Card / Net Banking payment for a GST registration order.
 */
router.post('/payment/verify', optionalAuth, (req, res) => {
  try {
    if (!ENV.ALLOW_SIMULATED_PAYMENTS) {
      return res.status(503).json({
        success: false,
        message: 'Online payments are being enabled for this service. Please contact support to complete your order.',
      });
    }

    const { order_id, payment_id, vpa, mandate_id } = req.body;
    let { payment_mode = 'UPI_QR' } = req.body;
    if (!['UPI_QR', 'AUTOPAY', 'CARD', 'NETBANKING'].includes(payment_mode)) {
      payment_mode = 'UPI_QR';
    }
    const modeLabel = MODE_LABEL[payment_mode] || 'UPI';

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
    if (existingOrder.status === 'PAID' || existingOrder.status === 'ACTIVE_AUTOPAY') {
      const paidApp = db.getApplications().find((a) => a.id === existingOrder.application_id) || null;
      return res.json({
        success: true,
        message: 'Payment already verified.',
        transaction_id: existingOrder.transaction_id,
        order: existingOrder,
        application: paidApp,
      });
    }

    const paymentTxnId = `gst_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    let updatedOrder;
    {
      orders[orderIndex] = {
        ...orders[orderIndex],
        status: payment_mode === 'AUTOPAY' ? 'ACTIVE_AUTOPAY' : 'PAID',
        payment_mode,
        payment_id: payment_id || `pay_${uuidv4().slice(0, 8)}`,
        mandate_id: mandate_id || `man_${uuidv4().slice(0, 8)}`,
        vpa: vpa || orders[orderIndex].customer_phone + '@upi',
        transaction_id: paymentTxnId,
        paid_amount: orders[orderIndex].amount,
        paid_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
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
          title: payment_mode === 'AUTOPAY' ? 'Payment Confirmed & AutoPay Activated' : `Payment Confirmed via ${modeLabel}`,
          description: `Verified ₹${updatedOrder?.amount} via ${modeLabel} (Ref: ${paymentTxnId}) for ${updatedOrder?.service_name || 'GST Registration'}. Ready for document upload.`,
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
            message: `Your ${modeLabel} payment of ₹${updatedOrder?.amount || 1769} has been verified. Case transferred to CA verification desk.`,
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
          message: `${updatedOrder?.customer_name || 'Customer'} paid ₹${updatedOrder?.amount || 1769} via ${modeLabel} for ${updatedOrder?.service_name || 'GST Registration'}.`,
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
      message: payment_mode === 'AUTOPAY'
        ? 'UPI AutoPay mandate established successfully! Recurring billing activated.'
        : `${modeLabel} payment verified successfully! GST filing service is now initiated.`,
      transaction_id: paymentTxnId,
      order: updatedOrder,
      application: updatedApp,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Payment verification failed.', error: err.message });
  }
});

export default router;
