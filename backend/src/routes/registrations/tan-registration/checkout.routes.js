import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates draft application and pending order for TAN Registration.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      name = 'Yash Upadhyay',
      email = 'ya*****************@com',
      phone = '+91-*******193',
      whatsappOptIn = true,
      businessName,
      cinGstin,
      entityType = 'company',
      appType = 'new',
      state = 'Karnataka',
      plan = 'standard',
      includeLabourWelfare = true,
      addonDsc = false,
      addonExpress = false,
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'TAN' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#TAN-${Math.floor(100000 + Math.random() * 900000)}`;

    const normPlan = String(plan).toLowerCase();
    let baseFee = 999;
    let planName = 'Standard (TAN Allotment + TRACES Portal Setup)';

    if (normPlan === 'starter' || normPlan === 'basic' || normPlan === 'form49b_basic') {
      baseFee = 499;
      planName = 'Starter (Basic Form 49B Filing)';
    } else if (normPlan === 'standard' || normPlan === 'tan_traces') {
      baseFee = 999;
      planName = 'Standard (TAN Allotment + TRACES Portal Setup)';
    } else if (normPlan === 'combo' || normPlan === 'tan_tds_combo') {
      baseFee = 1999;
      planName = 'Business TAN + 1st Quarter TDS Return Combo';
    }

    let addonFee = 0;
    if (addonDsc) addonFee += 1499;
    if (addonExpress) addonFee += 499;

    const subtotal = baseFee + addonFee;
    const gstOnFee = Math.round(subtotal * 0.18);
    const labourWelfare = includeLabourWelfare ? (normPlan === 'combo' ? 180 : 80) : 0;
    const gstOnLabour = includeLabourWelfare ? Math.round(labourWelfare * 0.18) : 0;
    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = subtotal + totalTaxes;

    // Save draft application
    const applicationRecord = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'tan-registration',
      module_type: 'TAN',
      status: 'DRAFT',
      payment_completed: false,
      fields_data: {
        name,
        email,
        phone,
        whatsappOptIn,
        businessName,
        cinGstin,
        entityType,
        appType,
        state,
        plan: normPlan,
        planName,
        includeLabourWelfare,
        addonDsc,
        addonExpress,
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
      service_id: 'tan-registration',
      module_type: 'TAN',
      plan: normPlan,
      plan_name: planName,
      amount: totalAmount,
      base_amount: baseFee,
      addon_fee: addonFee,
      subtotal,
      taxes_and_charges: totalTaxes,
      gst_amount: gstOnFee + gstOnLabour,
      labour_welfare: labourWelfare,
      status: 'PENDING',
      payment_status: 'PENDING',
      customer_details: {
        name,
        email,
        phone,
        state,
        cinGstin,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const orders = db.getOrders();
    orders.push(orderRecord);
    db.saveOrders(orders);

    res.status(201).json({
      success: true,
      message: 'TAN Draft application and checkout order created successfully.',
      order: orderRecord,
      application: applicationRecord,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create TAN draft order.',
      error: err.message,
    });
  }
});

/**
 * GET /checkout/:orderId
 * Fetches order details by order ID or order number.
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
