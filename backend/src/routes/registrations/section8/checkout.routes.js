import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates draft application and pending order for Section 8 Company.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      name = 'Yash Upadhyay',
      email = 'yashupadhyay@example.com',
      phone = '+91 7668976193',
      whatsappOptIn = true,
      proposedFoundationName = 'Hope India Welfare Foundation',
      charitableObjective = 'Education, Literacy & Skill Development',
      directorsCount = '2',
      authorizedCapital = '0',
      state = 'Delhi',
      plan = 'starter',
      includeLabourWelfare = true,
      addon12A80G = false,
      addonNitiAayog = false,
      addonCsr1 = false,
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'SEC8' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#SEC8-${Math.floor(100000 + Math.random() * 900000)}`;

    const normPlan = String(plan).toLowerCase();
    let baseFee = 999;
    let originalPrice = 1999;
    let discount = 1000;
    let planName = 'Starter (Section 8 Company Incorporation)';

    if (normPlan === 'starter' || normPlan === 'basic') {
      baseFee = 999;
      originalPrice = 1999;
      discount = 1000;
      planName = 'Starter (Section 8 Company Incorporation)';
    } else if (normPlan === 'standard') {
      baseFee = 2499;
      originalPrice = 4999;
      discount = 2500;
      planName = 'Standard (Incorporation + Form INC-16 Central Govt License)';
    } else if (normPlan === 'complete' || normPlan === 'enterprise') {
      baseFee = 4999;
      originalPrice = 9999;
      discount = 5000;
      planName = 'Complete (Section 8 + 12A + 80G + NGO Darpan Suite)';
    }

    let addonFee = 0;
    if (addon12A80G && normPlan !== 'complete') addonFee += 4999;
    if (addonNitiAayog && normPlan !== 'complete') addonFee += 1499;
    if (addonCsr1 && normPlan !== 'complete') addonFee += 1999;

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
      service_id: 'section-8-company',
      service_name: 'Section 8 Company Registration (Non-Profit NGO)',
      module_type: 'SECTION_8',
      plan: normPlan,
      plan_name: planName,
      status: 'DRAFT',
      payment_completed: false,
      fields_data: {
        applicant_name: name,
        email,
        phone,
        whatsapp_opt_in: whatsappOptIn,
        proposed_foundation_name: proposedFoundationName,
        charitable_objective: charitableObjective,
        directors_count: directorsCount,
        authorized_capital: authorizedCapital,
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
      service_id: 'section-8-company',
      service_name: 'Section 8 Company Registration',
      plan: normPlan,
      plan_name: planName,
      amount: totalAmount,
      base_fee: baseFee,
      addon_fee: addonFee,
      discount,
      gst_amount: gstOnFee,
      labour_welfare: labourWelfare + gstOnLabour,
      currency: 'INR',
      status: 'PENDING',
      payment_status: 'PENDING',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.push(newApplication);
    db.saveApplications(apps);

    const orders = db.getOrders();
    orders.push(newOrder);
    db.saveOrders(orders);

    res.status(201).json({
      success: true,
      message: 'Section 8 draft application and order created successfully.',
      orderId,
      orderNumber,
      applicationId: appId,
      applicationNumber: appNumber,
      amount: totalAmount,
      plan: normPlan,
      planName,
      currency: 'INR',
      application: newApplication,
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create Section 8 draft checkout.',
      error: err.message,
    });
  }
});

export default router;
