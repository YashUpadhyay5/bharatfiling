import express from 'express';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';
import { resolveGstPlan } from '../../../config/gstPlans.js';

const router = express.Router();

/**
 * GET /checkout-order/:orderId & GET /checkout/:orderId
 * Retrieves official quotation order details for Screen 3.
 */
router.get(['/checkout-order/:orderId', '/checkout/:orderId'], optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = db.getOrders();
    let order = orders.find((o) => o.id === orderId || o.order_number === `#${orderId}`);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    // Orders created by a signed-in customer are private to that customer (and staff)
    if (order.user_id && order.user_id !== GUEST_USER_ID) {
      const u = req.user;
      const allowed = u && (u.id === order.user_id || u.role === 'ADMIN' || u.role === 'CA');
      if (!allowed) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }
    }

    const apps = db.getApplications();
    const app = apps.find((a) => a.id === order.application_id);

    res.json({
      success: true,
      order,
      application: app || null,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to retrieve checkout order.', error: err.message });
  }
});

/**
 * PATCH /checkout-order/:orderId/plan & PATCH /checkout/:orderId/plan
 * Lets the customer switch between the Standard / Premium / Elite GST plan tiers
 * from the checkout screen, before payment is made.
 */
router.patch(['/checkout-order/:orderId/plan', '/checkout/:orderId/plan'], optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const { plan } = req.body;

    const orders = db.getOrders();
    const orderIndex = orders.findIndex((o) => o.id === orderId || o.order_number === `#${orderId}`);

    if (orderIndex === -1) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const order = orders[orderIndex];

    if (order.module_type !== 'GST') {
      return res.status(400).json({ success: false, message: 'Plan tiers are only available for GST Registration.' });
    }

    if (order.user_id && order.user_id !== GUEST_USER_ID) {
      const u = req.user;
      const allowed = u && (u.id === order.user_id || u.role === 'ADMIN' || u.role === 'CA');
      if (!allowed) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }
    }

    if (order.status !== 'CREATED') {
      return res.status(409).json({ success: false, message: 'This order has already been paid and its plan can no longer be changed.' });
    }

    const gstPlan = resolveGstPlan(plan);
    orders[orderIndex] = {
      ...order,
      plan: gstPlan.id,
      service_name: gstPlan.serviceName,
      amount: gstPlan.amount,
      subtotal: gstPlan.subtotal,
      gst_amount: gstPlan.gstAmount,
      updated_at: new Date().toISOString(),
    };
    db.saveOrders(orders);

    // Keep the linked application's service name in sync for the CA desk / dashboard
    const apps = db.getApplications();
    const appIndex = apps.findIndex((a) => a.id === order.application_id);
    if (appIndex !== -1) {
      apps[appIndex] = {
        ...apps[appIndex],
        plan: gstPlan.id,
        service_name: gstPlan.serviceName,
        updated_at: new Date().toISOString(),
      };
      db.saveApplications(apps);
    }

    res.json({
      success: true,
      order: orders[orderIndex],
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update plan.', error: err.message });
  }
});

export default router;
