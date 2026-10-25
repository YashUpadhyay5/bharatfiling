import express from 'express';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /checkout-order/:orderId & GET /checkout/:orderId
 * Retrieves official IEC quotation order details for Step 3 and Step 4.
 */
router.get(['/checkout-order/:orderId', '/checkout/:orderId'], optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = db.getOrders();
    const order = orders.find((o) => o.id === orderId || o.order_number === `#${orderId}`);

    if (!order) {
      return res.status(404).json({ success: false, message: 'IEC order not found.' });
    }

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
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve IEC checkout order.',
      error: err.message,
    });
  }
});

/**
 * POST /checkout-order/:orderId/plan
 * Updates plan tier or toggles Labour Welfare addon.
 */
router.post(['/checkout-order/:orderId/plan', '/checkout/:orderId/plan'], optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const { includeLabourWelfare = true, plan = 'starter' } = req.body;

    const orders = db.getOrders();
    const orderIndex = orders.findIndex((o) => o.id === orderId || o.order_number === `#${orderId}`);

    if (orderIndex === -1) {
      return res.status(404).json({ success: false, message: 'IEC order not found.' });
    }

    const baseFee = 1270;
    const gstFee = 229;
    const labourWelfare = includeLabourWelfare ? 77 : 0;
    const gstLabour = includeLabourWelfare ? 14 : 0;
    const totalTaxes = gstFee + labourWelfare + gstLabour;
    const totalAmount = baseFee + totalTaxes;

    orders[orderIndex] = {
      ...orders[orderIndex],
      package_tier: plan,
      plan_id: plan,
      pricing: {
        base_price: baseFee,
        gst_on_fee: gstFee,
        labour_welfare: labourWelfare,
        gst_on_labour: gstLabour,
        total_taxes: totalTaxes,
        original_price: 1999,
        discount: 500,
        total_amount: totalAmount,
      },
      amount: totalAmount,
      updated_at: new Date().toISOString(),
    };

    db.saveOrders(orders);

    res.json({
      success: true,
      order: orders[orderIndex],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update order plan.',
      error: err.message,
    });
  }
});

export default router;
