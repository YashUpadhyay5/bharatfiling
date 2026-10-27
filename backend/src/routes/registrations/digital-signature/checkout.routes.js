import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates draft application and pending order for Class 3 DSC.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      cityPincode,
      preferredLanguage = 'en',
      whatsappOptIn = true,
      applicantCategory = 'individual',
      certificateType = 'combo',
      validityYears = 2,
      tokenChoice = 'epass2003',
      fullName = '',
      panNumber = '',
      plan = 'combo',
      includeLabourWelfare = true,
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'DSC' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#DSC-${Math.floor(100000 + Math.random() * 900000)}`;

    const normPlan = String(plan).toLowerCase();
    let baseFee = 1999;
    let planName = 'Class 3 Digital Signature';

    if (normPlan === 'signing' || normPlan === 'basic') {
      baseFee = 1499;
      planName = 'Class 3 Signing Only';
    } else if (normPlan === 'combo' || normPlan === 'standard') {
      baseFee = 1999;
      planName = 'Class 3 Combo';
    } else if (normPlan === 'organization' || normPlan === 'premium') {
      baseFee = 3999;
      planName = 'Organization Combo';
    }

    if (validityYears === 3) {
      baseFee += 699;
    }

    // Taxes & Charges breakdown (1:1 with Screenshot media_1793079880114_335c03a3.png)
    const gstOnFee = Math.round(baseFee * 0.18004); // ₹360 on 1999
    const labourWelfare = includeLabourWelfare ? 120 : 0;
    const gstOnLabour = includeLabourWelfare ? 22 : 0;
    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = baseFee + totalTaxes;

    const applicationRecord = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'class-3-digital-signature',
      service_name: `Class 3 DSC (${planName})`,
      module_type: 'DSC',
      status: 'AWAITING_PAYMENT',
      payment_completed: false,
      amount: totalAmount,
      fields_data: {
        email,
        phone,
        cityPincode,
        preferredLanguage,
        whatsappOptIn,
        applicantCategory,
        certificateType,
        validityYears,
        tokenChoice,
        fullName,
        panNumber,
        plan: normPlan,
      },
      documents: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const orderRecord = {
      id: orderId,
      order_number: orderNumber,
      application_id: appId,
      user_id: userId,
      service_id: 'class-3-digital-signature',
      service_name: `Class 3 DSC (${planName})`,
      amount: totalAmount,
      breakdown: {
        base_fee: baseFee,
        gst_on_fee: gstOnFee,
        labour_welfare: labourWelfare,
        gst_on_labour: gstOnLabour,
        total_taxes: totalTaxes,
        total_amount: totalAmount,
      },
      status: 'PENDING',
      payment_status: 'PENDING',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.push(applicationRecord);
    db.saveApplications(apps);

    const orders = db.getOrders();
    orders.push(orderRecord);
    db.saveOrders(orders);

    res.status(201).json({
      success: true,
      message: 'Draft DSC application created.',
      application: applicationRecord,
      order: orderRecord,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create DSC draft application.',
      error: err.message,
    });
  }
});

/**
 * GET /checkout/:orderId
 * Retrieves checkout order details for rehydration.
 */
router.get('/checkout/:orderId', optionalAuth, (req, res) => {
  try {
    const { orderId } = req.params;
    const order = db.getOrders().find((o) => o.id === orderId || o.order_number === orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const application = db.getApplications().find((a) => a.id === order.application_id);

    res.json({
      success: true,
      order,
      application,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order details.',
      error: err.message,
    });
  }
});

export default router;
