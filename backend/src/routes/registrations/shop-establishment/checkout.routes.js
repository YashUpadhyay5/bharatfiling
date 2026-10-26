import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates in-flight draft application and pending order for Shop & Establishment.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      cityPincode,
      whatsappOptIn = true,
      companyName = 'My Business',
      isCommercialPlace = 'Yes',
      plan = 'standard',
      includeLabourWelfare = true,
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'SE' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#SE-${Math.floor(100000 + Math.random() * 900000)}`;

    const normPlan = String(plan).toLowerCase();
    let baseFee = 3999;
    let planName = 'Standard';

    if (normPlan === 'starter' || normPlan === 'basic') {
      baseFee = 1999;
      planName = 'Starter';
    } else if (normPlan === 'premium' || normPlan === 'all_in_one') {
      baseFee = 5499;
      planName = 'Premium';
    }

    const gstOnFee = Math.round(baseFee * 0.18004);
    const labourWelfare = includeLabourWelfare ? 240 : 0;
    const gstOnLabour = includeLabourWelfare ? 44 : 0;
    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = baseFee + totalTaxes;

    const applicationRecord = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'shop-establishment',
      service_name: `Shop & Establishment (${planName})`,
      module_type: 'SE',
      status: 'AWAITING_PAYMENT',
      payment_completed: false,
      amount: totalAmount,
      fields_data: {
        email,
        phone,
        cityPincode,
        whatsappOptIn,
        companyName,
        isCommercialPlace,
        plan: normPlan,
      },
      documents: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const orderRecord = {
      id: orderId,
      order_number: orderNumber,
      user_id: userId,
      service_id: 'shop-establishment',
      service_name: `Shop & Establishment (${planName})`,
      application_id: appId,
      package_tier: normPlan,
      plan_id: normPlan,
      status: 'PENDING',
      payment_status: 'PENDING',
      amount: totalAmount,
      currency: 'INR',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save to DatabaseStore
    const apps = db.getApplications();
    apps.push(applicationRecord);
    db.saveApplications(apps);

    const orders = db.getOrders();
    orders.push(orderRecord);
    db.saveOrders(orders);

    return res.status(201).json({
      success: true,
      message: 'Draft Shop & Establishment application registered successfully.',
      order: orderRecord,
      application: applicationRecord,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create Shop & Establishment draft order.',
      error: err.message,
    });
  }
});

/**
 * GET /checkout/:orderId
 * Retrieves order details and linked application.
 */
router.get('/checkout/:orderId', optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = db.getOrders();
    const order = orders.find(
      (o) => o.id === orderId || o.order_number === orderId || o.application_id === orderId
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Shop & Establishment Order not found.',
      });
    }

    const apps = db.getApplications();
    const app = apps.find((a) => a.id === order.application_id);

    return res.json({
      success: true,
      order,
      application: app || null,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve order details.',
      error: err.message,
    });
  }
});

export default router;
