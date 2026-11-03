import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates draft application and pending order for Trust Registration.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      name = 'Yash Upadhyay',
      email = 'yashupadhyay@example.com',
      phone = '+91 7668976193',
      whatsappOptIn = true,
      trustName = 'Vidya Jyoti Educational & Charitable Trust',
      trustCategory = 'public_charitable',
      trusteesCount = '3_to_5',
      corpusFund = '10000',
      state = 'Delhi NCR',
      officeType = 'rented',
      plan = 'standard',
      includeLabourWelfare = true,
      addon12A80G = false,
      addonDarpan = false,
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'TRST' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#TRST-${Math.floor(100000 + Math.random() * 900000)}`;

    const normPlan = String(plan).toLowerCase();
    let baseFee = 9999;
    let planName = 'Standard (Trust Formation + Sub-Registrar Filing)';

    if (normPlan === 'starter' || normPlan === 'drafting' || normPlan === 'basic') {
      baseFee = 4999;
      planName = 'Starter (Trust Deed Drafting)';
    } else if (normPlan === 'standard' || normPlan === 'registration') {
      baseFee = 9999;
      planName = 'Standard (Trust Formation + Sub-Registrar Filing)';
    } else if (normPlan === 'premium' || normPlan === 'ngo_suite' || normPlan === 'complete') {
      baseFee = 18999;
      planName = 'Premium (Complete Non-Profit Suite: Trust + 12A + 80G + Darpan)';
    }

    let addonFee = 0;
    if (addon12A80G && normPlan !== 'premium') addonFee += 4999;
    if (addonDarpan && normPlan !== 'premium') addonFee += 1999;

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
      service_id: 'trust',
      service_name: 'Trust Registration (Public Charitable / Religious)',
      module_type: 'TRUST',
      plan: normPlan,
      plan_name: planName,
      status: 'DRAFT',
      payment_completed: false,
      fields_data: {
        applicant_name: name,
        email,
        phone,
        whatsapp_opt_in: whatsappOptIn,
        trust_name: trustName,
        trust_category: trustCategory,
        trustees_count: trusteesCount,
        corpus_fund: corpusFund,
        state,
        office_type: officeType,
        plan: normPlan,
        plan_name: planName,
        include_labour_welfare: includeLabourWelfare,
        addon_12a_80g: addon12A80G,
        addon_darpan: addonDarpan,
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
      service_type: 'trust',
      module_type: 'TRUST',
      plan: normPlan,
      plan_name: planName,
      amount: totalAmount,
      currency: 'INR',
      status: 'PENDING',
      payment_status: 'PENDING',
      breakdown: {
        baseFee,
        addonFee,
        onlineDiscount,
        subTotalAmount: subtotal,
        gstOnFee,
        labourWelfare,
        gstOnLabour,
        totalTaxes,
        totalAmount,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.push(newApplication);
    db.saveApplications(apps);

    const orders = db.getOrders();
    orders.push(newOrder);
    db.saveOrders(orders);

    res.json({
      success: true,
      applicationId: appId,
      applicationNumber: appNumber,
      orderId,
      orderNumber,
      amount: totalAmount,
      breakdown: newOrder.breakdown,
      draft: newApplication,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create Trust draft checkout application.',
      error: err.message,
    });
  }
});

/**
 * GET /checkout/draft/:id
 */
router.get('/checkout/draft/:id', optionalAuth, (req, res) => {
  try {
    const { id } = req.params;
    const apps = db.getApplications();
    const app = apps.find((a) => a.id === id || a.application_number === id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Draft not found.' });
    }

    const orders = db.getOrders();
    const order = orders.find((o) => o.application_id === app.id);

    res.json({
      success: true,
      draft: app,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch draft.',
      error: err.message,
    });
  }
});

export default router;
