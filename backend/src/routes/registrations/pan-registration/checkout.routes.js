import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates draft application and pending order for PAN Registration.
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
      entityType = 'individual',
      appType = 'new',
      state = 'Karnataka',
      plan = 'standard',
      includeLabourWelfare = true,
      addonDsc = false,
      addonAffidavit = false,
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'PAN' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#PAN-${Math.floor(100000 + Math.random() * 900000)}`;

    const normPlan = String(plan).toLowerCase();
    let baseFee = 499;
    let planName = 'Standard (Physical PVC Card + e-PAN)';

    if (normPlan === 'starter' || normPlan === 'epan' || normPlan === 'basic') {
      baseFee = 299;
      planName = 'Starter (Instant e-PAN Digital)';
    } else if (normPlan === 'standard' || normPlan === 'physical') {
      baseFee = 499;
      planName = 'Standard (Physical PVC Card + e-PAN)';
    } else if (normPlan === 'combo' || normPlan === 'pan_tan_combo') {
      baseFee = 999;
      planName = 'Business Entity PAN + TAN Combo';
    }

    let addonFee = 0;
    if (addonDsc) addonFee += 1499;
    if (addonAffidavit) addonFee += 499;

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
      service_id: 'pan-registration',
      module_type: 'PAN',
      status: 'DRAFT',
      payment_completed: false,
      amount: totalAmount,
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
        addonDsc,
        addonAffidavit,
        subtotal,
        gstOnFee,
        labourWelfare,
        gstOnLabour,
        totalAmount,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.push(applicationRecord);
    db.saveApplications(apps);

    // Save draft pending order
    const orderRecord = {
      id: orderId,
      order_number: orderNumber,
      user_id: userId,
      application_id: appId,
      service_id: 'pan-registration',
      module_type: 'PAN',
      plan: normPlan,
      plan_name: planName,
      amount: totalAmount,
      currency: 'INR',
      status: 'PENDING',
      payment_status: 'PENDING',
      items: [
        {
          name: planName,
          type: 'SERVICE_FEE',
          price: baseFee,
        },
        ...(addonDsc ? [{ name: 'Class 3 DSC Token', type: 'ADDON', price: 1499 }] : []),
        ...(addonAffidavit ? [{ name: 'Name Mismatch Legal Affidavit', type: 'ADDON', price: 499 }] : []),
        {
          name: 'GST (18%)',
          type: 'TAX',
          price: gstOnFee,
        },
        ...(includeLabourWelfare
          ? [
              { name: 'Taxpayer Welfare Endowment', type: 'CHARGE', price: labourWelfare },
              { name: 'GST on Welfare Endowment (18%)', type: 'TAX', price: gstOnLabour },
            ]
          : []),
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const orders = db.getOrders();
    orders.push(orderRecord);
    db.saveOrders(orders);

    res.status(201).json({
      success: true,
      message: 'PAN draft created successfully.',
      application: applicationRecord,
      order: orderRecord,
      quote: {
        subtotal,
        gstOnFee,
        labourWelfare,
        totalTaxes,
        totalAmount,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create draft PAN application.',
      error: err.message,
    });
  }
});

/**
 * GET /checkout/draft/:id
 * Retrieves draft order or application for resuming checkout.
 */
router.get('/checkout/draft/:id', optionalAuth, (req, res) => {
  try {
    const { id } = req.params;
    const order = db.getOrders().find((o) => o.id === id || o.order_number === id);

    if (order) {
      const app = db.getApplications().find((a) => a.id === order.application_id);
      return res.json({
        success: true,
        order,
        application: app || null,
      });
    }

    const app = db.getApplications().find((a) => a.id === id || a.application_number === id);
    if (app) {
      return res.json({
        success: true,
        application: app,
        order: null,
      });
    }

    res.status(404).json({ success: false, message: 'Draft record not found.' });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch draft.',
      error: err.message,
    });
  }
});

export default router;
