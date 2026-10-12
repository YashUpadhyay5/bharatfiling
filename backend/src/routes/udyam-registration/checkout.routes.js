import express from 'express';
import { db } from '../../database/db.js';
import { optionalAuth } from '../../middleware/auth.js';
import { GUEST_USER_ID } from '../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /checkout-order/:orderId & GET /checkout/:orderId
 * Retrieves official Udyam quotation order details for Screen 3.
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
    res.status(500).json({ success: false, message: 'Failed to retrieve Udyam checkout order.', error: err.message });
  }
});

export default router;
