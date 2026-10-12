import express from 'express';
import { db } from '../../database/db.js';
import { optionalAuth } from '../../middleware/auth.js';

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

    // Fallback template if fresh guest checkout
    if (!order) {
      order = {
        id: orderId,
        order_number: `#${orderId}`,
        application_id: `app_${orderId}`,
        service_name: 'UDYAM Registration (UDYAM + LEDGERS)',
        amount: 3421,
        subtotal: 2899,
        gst_amount: 522,
        currency: 'INR',
        status: 'CREATED',
        billing_cycle: 'One-Time Statutory Filing',
        customer_name: 'Udyam Applicant',
        customer_phone: '9876543210',
        customer_pan: 'AOOPU9849P',
        customer_email: 'applicant@gmail.com',
        state: 'Karnataka',
        business_type: 'Proprietorship',
        created_at: new Date().toISOString(),
      };
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
