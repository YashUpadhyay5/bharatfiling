import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates draft application and pending order for LLP Registration.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      name = 'Yash Upadhyay',
      email = 'yashupadhyay@example.com',
      phone = '+91 7668976193',
      whatsappOptIn = true,
      proposedLlpName = 'Bharat Innovation Tech LLP',
      businessAge = 'Less than 1 year',
      partnersCount = '2',
      contributionAmount = '100000',
      state = 'Maharashtra',
      plan = 'standard',
      includeLabourWelfare = true,
      addonGst = false,
      addonCompliance = false,
      addonTrademark = false,
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'LLP' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#LLP-${Math.floor(100000 + Math.random() * 900000)}`;

    const normPlan = String(plan).toLowerCase();
    let baseFee = 2499;
    let planName = 'Standard (LLP Incorporation + DSC + DPIN + Form 3)';

    if (normPlan === 'starter' || normPlan === 'basic') {
      baseFee = 999;
      planName = 'Starter (Basic LLP Incorporation)';
    } else if (normPlan === 'standard') {
      baseFee = 2499;
      planName = 'Standard (LLP Incorporation + DSC + DPIN + Form 3)';
    } else if (normPlan === 'complete' || normPlan === 'premium') {
      baseFee = 4999;
      planName = 'Complete (LLP + GST + Annual Compliance Support)';
    }

    let addonFee = 0;
    if (addonGst && normPlan !== 'complete') addonFee += 1499;
    if (addonCompliance && normPlan !== 'complete') addonFee += 4999;
    if (addonTrademark) addonFee += 1999;

    const grossFee = baseFee + addonFee;
    const onlineDiscount = 500;
    const subtotal = Math.max(0, grossFee - onlineDiscount);

    const gstOnFee = Math.round(subtotal * 0.18);
    const labourWelfare = includeLabourWelfare ? 50 : 0;
    const gstOnLabour = includeLabourWelfare ? 9 : 0;
    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = subtotal + totalTaxes;

    const newApplication = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'llp',
      service_name: 'Limited Liability Partnership (LLP) Registration',
      module_type: 'LLP',
      plan: normPlan,
      plan_name: planName,
      status: 'DRAFT',
      payment_completed: false,
      fields_data: {
        applicant_name: name,
        email,
        phone,
        whatsapp_opt_in: whatsappOptIn,
        proposed_llp_name: proposedLlpName,
        business_age: businessAge,
        partners_count: partnersCount,
        capital_contribution: contributionAmount,
        state,
        plan_selected: normPlan,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const newOrder = {
      id: orderId,
      order_number: orderNumber,
      user_id: userId,
      application_id: appId,
      service_id: 'llp',
      service_name: 'LLP Registration',
      plan: normPlan,
      plan_name: planName,
      amount: totalAmount,
      base_fee: baseFee,
      addon_fee: addonFee,
      discount: onlineDiscount,
      gst_amount: gstOnFee,
      labour_welfare: labourWelfare + gstOnLabour,
      currency: 'INR',
      status: 'PENDING',
      payment_status: 'PENDING',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save into database
    const apps = db.getApplications();
    apps.push(newApplication);
    db.saveApplications(apps);

    const orders = db.getOrders();
    orders.push(newOrder);
    db.saveOrders(orders);

    res.status(201).json({
      success: true,
      message: 'LLP Registration draft application & order created successfully.',
      orderId,
      orderNumber,
      applicationId: appId,
      applicationNumber: appNumber,
      amount: totalAmount,
      plan: normPlan,
      planName,
      currency: 'INR',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create LLP checkout draft.',
      error: err.message,
    });
  }
});

export default router;
