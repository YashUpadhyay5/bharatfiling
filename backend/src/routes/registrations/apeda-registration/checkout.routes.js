import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates draft consultation order for APEDA registration.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      email = 'yashupadhyay@example.com',
      phone = '+91-7668976193',
      cityPincode = 'Bengaluru, 560001',
      language = 'English',
      whatsappUpdates = true,
      coupon = 'MAKEININDIA',
      includeLabourWelfare = true,
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'APEDA' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#APEDA-${Math.floor(100000 + Math.random() * 900000)}`;

    const consultationFee = 999;
    const discount = String(coupon).toUpperCase() === 'MAKEININDIA' ? 500 : 0;
    const subtotal = consultationFee - discount;

    const labourWelfare = includeLabourWelfare ? 22 : 0;
    const gstOnLabour = includeLabourWelfare ? 4 : 0;
    const taxesAndCharges = labourWelfare + gstOnLabour;
    const totalAmount = subtotal + taxesAndCharges;

    // Save draft application
    const applicationRecord = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'apeda-registration',
      module_type: 'APEDA',
      status: 'DRAFT',
      payment_completed: false,
      fields_data: {
        email,
        phone,
        cityPincode,
        language,
        whatsappUpdates,
        coupon,
        discount,
        subtotal,
        includeLabourWelfare,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.push(applicationRecord);
    db.saveApplications(apps);

    // Save order
    const orderRecord = {
      id: orderId,
      order_number: orderNumber,
      application_id: appId,
      user_id: userId,
      service_id: 'apeda-registration',
      module_type: 'APEDA',
      plan: 'expert_consultation',
      plan_name: 'APEDA 15-Minute Expert Consultation',
      amount: totalAmount,
      base_amount: consultationFee,
      discount,
      subtotal,
      taxes_and_charges: taxesAndCharges,
      labour_welfare: labourWelfare,
      status: 'PENDING',
      payment_status: 'PENDING',
      customer_details: {
        email,
        phone,
        cityPincode,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const orders = db.getOrders();
    orders.push(orderRecord);
    db.saveOrders(orders);

    res.status(201).json({
      success: true,
      message: 'APEDA consultation draft created successfully.',
      order: orderRecord,
      application: applicationRecord,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create APEDA draft order.',
      error: err.message,
    });
  }
});

/**
 * GET /checkout/:orderId
 * Fetches order details.
 */
router.get('/checkout/:orderId', optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = db.getOrders();
    const order = orders.find(
      (o) => o.id === orderId || o.order_number === orderId || o.order_number === `#${orderId}`
    );

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
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
      message: 'Failed to retrieve order details.',
      error: err.message,
    });
  }
});

export default router;
