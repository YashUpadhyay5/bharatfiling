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
 * Confirms Direct Payment (UPI/Cards/NetBanking) for IEC Registration.
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
    if (existingOrder.status === 'PAID') {
      const paidApp =
        db.getApplications().find((a) => a.id === existingOrder.application_id) || null;
      return res.json({
        success: true,
        message: 'Payment already verified.',
        order: existingOrder,
        application: paidApp,
      });
    }

    const assignedPaymentId = payment_id || `pay_iec_${uuidv4().slice(0, 8)}`;
    orders[orderIndex] = {
      ...orders[orderIndex],
      status: 'PAID',
      payment_id: assignedPaymentId,
      payment_method: payment_method || 'UPI',
      upi_app: upi_app || 'PhonePe',
      billing_info: billing_info || orders[orderIndex].billing_info || null,
      paid_at: new Date().toISOString(),
    };
    const updatedOrder = orders[orderIndex];
    db.saveOrders(orders);

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
            apps[appIndex].user_id === GUEST_USER_ID && req.user?.id
              ? req.user.id
              : apps[appIndex].user_id,
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
          title: `Direct Fee Payment Received (₹${updatedOrder.amount || 1590})`,
          description: `One-time direct payment verified via ${payment_method}${
            upi_app ? ` (${upi_app})` : ''
          }. Assigned to Export CA Verification Desk.`,
          actor_role: 'SYSTEM',
          created_at: new Date().toISOString(),
        });
        db.saveCaseEvents(events);

        // Notify CA Desk in Real-Time via WebSockets
        try {
          emitToCADesk('NEW_CASE_ASSIGNED', {
            applicationId: appId,
            applicationNumber: updatedApp.application_number,
            serviceName: 'Import Export Code (IEC) Registration',
            customerName:
              updatedApp.fields_data?.applicantName || 'IEC Applicant',
            paidAt: updatedOrder.paid_at,
          });
        } catch {
          // Non-blocking socket notification
        }

        // Send Push / System Notification
        if (updatedApp.user_id && updatedApp.user_id !== GUEST_USER_ID) {
          createAndDispatchNotification({
            userId: updatedApp.user_id,
            title: 'Payment Confirmed - IEC Registration',
            message: `Payment of ₹${updatedOrder.amount || 1590} confirmed for Application #${
              updatedApp.application_number
            }. Our CA team has commenced DGFT filing.`,
            type: 'PAYMENT',
            referenceId: appId,
          });
        }
      }
    }

    res.json({
      success: true,
      message: 'Payment verified and IEC application assigned to CA verification desk.',
      order: updatedOrder,
      application: updatedApp,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify IEC payment.',
      error: err.message,
    });
  }
});

export default router;
