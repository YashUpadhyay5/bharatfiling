import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates draft application and pending order for Sole Proprietorship.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      name = 'Yash Upadhyay',
      email = 'ya*****************@com',
      phone = '+91-*******193',
      whatsappOptIn = true,
      tradeName = 'Apex Retail Enterprises',
      industryType = 'Retail / General Store / Supermarket',
      state = 'Maharashtra',
      plan = 'starter',
      includeLabourWelfare = true,
      addonShopAct = false,
      addonTrademark = false,
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'PROP' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#PROP-${Math.floor(100000 + Math.random() * 900000)}`;

    const normPlan = String(plan).toLowerCase();
    let baseFee = 999;
    let planName = 'Starter (MSME Udyam Registration)';

    if (normPlan === 'starter' || normPlan === 'udyam' || normPlan === 'basic') {
      baseFee = 999;
      planName = 'Starter (MSME Udyam Registration)';
    } else if (normPlan === 'standard' || normPlan === 'gst' || normPlan === 'proprietorship_gst') {
      baseFee = 2499;
      planName = 'Standard (Proprietorship + GST Registration)';
    } else if (normPlan === 'premium' || normPlan === 'complete' || normPlan === 'launchpad') {
      baseFee = 4999;
      planName = 'Premium (Complete Business Launchpad)';
    }

    let addonFee = 0;
    if (addonShopAct) addonFee += 999;
    if (addonTrademark) addonFee += 1999;

    const subtotal = baseFee + addonFee;
    const gstOnFee = Math.round(subtotal * 0.18);
    const labourWelfare = includeLabourWelfare ? 50 : 0;
    const gstOnLabour = includeLabourWelfare ? 9 : 0;
    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = subtotal + totalTaxes;

    const newApplication = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'proprietorship',
      service_name: 'Sole Proprietorship Registration',
      module_type: 'PROPRIETORSHIP',
      plan: normPlan,
      plan_name: planName,
      status: 'DRAFT',
      payment_completed: false,
      fields_data: {
        applicant_name: name,
        email,
        phone,
        whatsapp_opt_in: whatsappOptIn,
        trade_name: tradeName,
        industry_type: industryType,
        state,
        plan: normPlan,
        plan_name: planName,
        include_labour_welfare: includeLabourWelfare,
        addon_shop_act: addonShopAct,
        addon_trademark: addonTrademark,
      },
      documents: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const newOrder = {
      id: orderId,
      order_number: orderNumber,
      user_id: userId,
      application_id: appId,
      service_type: 'proprietorship',
      module_type: 'PROPRIETORSHIP',
      plan: normPlan,
      plan_name: planName,
      amount: totalAmount,
      base_amount: subtotal,
      taxes_amount: totalTaxes,
      discount_amount: 1000,
      currency: 'INR',
      status: 'PENDING',
      payment_status: 'PENDING',
      payment_method: null,
      transaction_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save to DB store
    const apps = db.getApplications();
    apps.push(newApplication);
    db.saveApplications(apps);

    const orders = db.getOrders();
    orders.push(newOrder);
    db.saveOrders(orders);

    res.json({
      success: true,
      message: 'Draft application and order created successfully.',
      applicationId: appId,
      applicationNumber: appNumber,
      orderId,
      orderNumber,
      quote: {
        plan: normPlan,
        planName,
        professionalFee: baseFee,
        addonFee,
        subtotal,
        taxesAndCharges: totalTaxes,
        totalAmount,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create checkout draft.',
      error: err.message,
    });
  }
});

/**
 * GET /checkout/draft/:id
 * Fetches draft by application ID or order ID.
 */
router.get('/checkout/draft/:id', optionalAuth, (req, res) => {
  try {
    const { id } = req.params;
    const apps = db.getApplications();
    const app = apps.find(
      (a) => a.id === id || a.application_number === id
    );

    const orders = db.getOrders();
    const order = orders.find(
      (o) => o.id === id || o.order_number === id || o.application_id === id
    );

    if (!app && !order) {
      return res.status(404).json({ success: false, message: 'Draft not found.' });
    }

    res.json({
      success: true,
      application: app || null,
      order: order || null,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve draft.',
      error: err.message,
    });
  }
});

export default router;
