import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates draft application and pending order for Indian Subsidiary.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      name = 'Yash Upadhyay',
      email = 'yashupadhyay@example.com',
      phone = '+91 7668976193',
      whatsappOptIn = true,
      proposedSubsidiaryName = 'Acme Global Tech (India) Private Limited',
      parentCountry = 'United States',
      directorsCount = '2',
      authorizedCapital = '100000',
      state = 'Maharashtra',
      plan = 'starter',
      includeLabourWelfare = true,
      addonGst = false,
      addonResidentDirector = false,
      addonRbiFcGpr = false,
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'ISUB' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#ISUB-${Math.floor(100000 + Math.random() * 900000)}`;

    const normPlan = String(plan).toLowerCase();
    let baseFee = 999;
    let originalPrice = 1999;
    let discount = 1000;
    let planName = 'Starter (Indian Subsidiary Incorporation)';

    if (normPlan === 'starter' || normPlan === 'basic') {
      baseFee = 999;
      originalPrice = 1999;
      discount = 1000;
      planName = 'Starter (Indian Subsidiary Incorporation)';
    } else if (normPlan === 'standard') {
      baseFee = 2499;
      originalPrice = 4999;
      discount = 2500;
      planName = 'Standard (Incorporation + DSC + DIN + PAN/TAN)';
    } else if (normPlan === 'complete' || normPlan === 'enterprise') {
      baseFee = 4999;
      originalPrice = 9999;
      discount = 5000;
      planName = 'Complete (Cross-Border Enterprise Setup Suite)';
    }

    let addonFee = 0;
    if (addonGst && normPlan !== 'complete') addonFee += 1499;
    if (addonResidentDirector) addonFee += 9999;
    if (addonRbiFcGpr && normPlan !== 'complete') addonFee += 4999;

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
      service_id: 'indian-subsidiary',
      service_name: 'Indian Subsidiary Registration (Foreign Holding)',
      module_type: 'INDIAN_SUBSIDIARY',
      plan: normPlan,
      plan_name: planName,
      status: 'DRAFT',
      payment_completed: false,
      fields_data: {
        applicant_name: name,
        email,
        phone,
        whatsapp_opt_in: whatsappOptIn,
        proposed_subsidiary_name: proposedSubsidiaryName,
        parent_country: parentCountry,
        directors_count: directorsCount,
        authorized_capital: authorizedCapital,
        state,
        plan_selected: normPlan,
        fdi_route: '100% FDI Automatic Route',
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const newOrder = {
      id: orderId,
      order_number: orderNumber,
      user_id: userId,
      application_id: appId,
      service_id: 'indian-subsidiary',
      service_name: 'Indian Subsidiary Registration',
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
      message: 'Indian Subsidiary draft application & order created successfully.',
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
      message: 'Failed to create Indian Subsidiary draft.',
      error: err.message,
    });
  }
});

export default router;
