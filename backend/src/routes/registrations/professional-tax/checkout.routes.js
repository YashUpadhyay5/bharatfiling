import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates an in-flight draft application for PT registration.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      cityPincode,
      whatsappOptIn = true,
      entityType = 'Pvt. Ltd',
      employeeCount = '10 - 20',
      operatingState = 'Maharashtra',
      plan = 'elite',
      certificateType = 'both',
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'PT' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#PT-${Math.floor(100000 + Math.random() * 900000)}`;

    const isStarter = String(plan).toLowerCase() === 'starter';
    const planPrice = isStarter ? 2999 : 5999;
    const totalAmount = isStarter ? 3359 : 6359;

    const applicationRecord = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'professional-tax',
      service_name: `Professional Tax (${isStarter ? 'Starter' : 'Elite'})`,
      module_type: 'PT',
      status: 'AWAITING_PAYMENT',
      payment_completed: false,
      amount: totalAmount,
      fields_data: {
        email,
        phone,
        cityPincode,
        whatsappOptIn,
        entityType,
        employeeCount,
        operatingState,
        plan: isStarter ? 'starter' : 'elite',
        certificateType,
      },
      documents: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const orderRecord = {
      id: orderId,
      order_number: orderNumber,
      user_id: userId,
      service_id: 'professional-tax',
      service_name: `Professional Tax (${isStarter ? 'Starter' : 'Elite'})`,
      application_id: appId,
      package_tier: isStarter ? 'starter' : 'elite',
      plan_id: isStarter ? 'starter' : 'elite',
      payment_status: 'PENDING',
      amount: totalAmount,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save to database store & persist to disk
    const apps = db.getApplications();
    apps.unshift(applicationRecord);
    db.saveApplications(apps);

    const orders = db.getOrders();
    orders.unshift(orderRecord);
    db.saveOrders(orders);

    return res.status(201).json({
      success: true,
      message: 'Professional Tax draft created and saved to database.',
      orderId,
      applicationId: appId,
      applicationNumber: appNumber,
      orderNumber,
      amount: totalAmount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create draft order.',
      error: err.message,
    });
  }
});

/**
 * GET /checkout/:orderId
 * Fetches order details for checkout
 */
router.get(['/checkout/:orderId', '/checkout-order/:orderId'], optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = db.getOrders();
    const order = orders.find(
      (o) => o.id === orderId || o.order_number === orderId || o.application_id === orderId
    );

    const apps = db.getApplications();
    const app = apps.find(
      (a) => a.id === orderId || a.application_number === orderId || (order && a.id === order.application_id)
    );

    if (!app && !order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    return res.json({
      success: true,
      order: order || null,
      application: app || null,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve order.',
      error: err.message,
    });
  }
});

export default router;
