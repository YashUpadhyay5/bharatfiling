import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import crypto from 'crypto';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid FSSAI applications for the authenticated customer.
 */
router.get('/applications', authenticate, (req, res) => {
  try {
    const apps = db.getApplications().filter((a) => {
      if (req.user.role === 'ADMIN') return true;
      if (a.user_id === req.user.id) return a.payment_completed === true;
      if (
        a.user_id === GUEST_USER_ID &&
        a.fields_data?.email &&
        a.fields_data.email.toLowerCase() === req.user.email?.toLowerCase() &&
        a.payment_completed === true
      ) {
        a.user_id = req.user.id;
        return true;
      }
      return false;
    });

    res.json({
      success: true,
      applications: apps.filter(
        (a) => a.module_type === 'FSSAI' || a.service_id === 'fssai-food-license' || a.service_id === 'fssai-registration'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve FSSAI applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single FSSAI food licensing application.
 */
router.get('/applications/:id', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const app = db
      .getApplications()
      .find((a) => a.id === id || a.application_number === id);
    if (!app) {
      return res
        .status(404)
        .json({ success: false, message: 'FSSAI application not found.' });
    }

    if (!canAccessApplication(req.user, app)) {
      return res
        .status(404)
        .json({ success: false, message: 'Application not found.' });
    }

    res.json({ success: true, application: app });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to load FSSAI application.',
      error: err.message,
    });
  }
});

/**
 * POST /quick-quote & POST /apply
 * Generates an FSSAI filing order & quotation.
 */
router.post(['/quick-quote', '/apply'], optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      cityPincode = '',
      businessName = '',
      businessType = 'restaurant_cloud_kitchen',
      turnover = 'under_12_lakh',
      validityYears = 1,
      premiseType = 'rented',
      address = '',
      stateName = 'Maharashtra',
      foodCategory = 'Ready-to-eat savouries & meals',
      plan = 'basic',
      whatsappOptIn = true,
      includeLabourWelfare = true,
    } = req.body;

    if (!phone && !email) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number or email is required to initiate FSSAI registration.',
      });
    }

    // Determine plan pricing matching Vakilsearch model
    let baseFee = 677;
    let gstFee = 122;
    let planName = 'Starter FSSAI Registration';
    let formType = 'Basic Registration';
    let govtFee = 100 * (Number(validityYears) || 1);

    if (plan === 'standard' || plan === 'state') {
      baseFee = 3389;
      gstFee = 610;
      planName = 'Standard FSSAI + GST Combo';
      formType = 'License + GST';
      govtFee = 100 * (Number(validityYears) || 1);
    } else if (plan === 'elite' || plan === 'central') {
      baseFee = 4236;
      gstFee = 763;
      planName = 'Elite Food License + Brand Protection';
      formType = 'License + GST + Trademark';
      govtFee = 100 * (Number(validityYears) || 1);
    }

    const labourWelfare = includeLabourWelfare ? 77 : 0;
    const gstLabour = includeLabourWelfare ? 14 : 0;
    const totalTaxes = gstFee + labourWelfare + gstLabour;
    const totalAmount = baseFee + totalTaxes;

    const appId = uuidv4();
    const appNumber = `FSSAI-${new Date().getFullYear()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const orderId = uuidv4();
    const orderNumber = `#FSSAI-${Math.floor(100000 + Math.random() * 900000)}`;

    const userId = req.user ? req.user.id : GUEST_USER_ID;

    const newApp = {
      id: appId,
      application_number: appNumber,
      service_id: 'fssai-food-license',
      service_name: 'FSSAI Food License Registration',
      module_type: 'FSSAI',
      status: 'AWAITING_PAYMENT',
      payment_completed: false,
      user_id: userId,
      fields_data: {
        email,
        phone,
        cityPincode,
        businessName,
        businessType,
        turnover,
        validityYears,
        premiseType,
        address,
        stateName,
        foodCategory,
        plan,
        formType,
        whatsappOptIn,
        govtFee,
      },
      documents: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const newOrder = {
      id: orderId,
      order_number: orderNumber,
      user_id: userId,
      service_id: 'fssai-food-license',
      service_name: `FSSAI Food License (${planName})`,
      application_id: appId,
      package_tier: plan,
      plan_id: plan,
      payment_status: 'PENDING',
      pricing: {
        base_price: baseFee,
        gst_on_fee: gstFee,
        labour_welfare: labourWelfare,
        gst_on_labour: gstLabour,
        total_taxes: totalTaxes,
        govt_fee: govtFee,
        total_amount: totalAmount,
      },
      amount: totalAmount,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.unshift(newApp);
    db.saveApplications(apps);

    const orders = db.getOrders();
    orders.unshift(newOrder);
    db.saveOrders(orders);

    res.status(201).json({
      success: true,
      message: 'FSSAI registration order created successfully.',
      application: newApp,
      order: newOrder,
      redirect_url: `/checkout/fssai/${orderId}`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to process FSSAI registration quotation.',
      error: err.message,
    });
  }
});

export default router;
