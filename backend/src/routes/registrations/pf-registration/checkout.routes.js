import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /checkout/draft
 * Creates or updates draft application and pending order for EPF Registration.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      whatsappOptIn = true,
      businessName,
        cinGstin,
        wantDbsAccount,
        employeeCoverage,
      entityType = 'company',
      coverageType = 'mandatory',
      employeeCount = 20,
      eligibleWageEmployees = 15,
      entityPan = '',
      state = 'Karnataka',
      authorizedSignatory = '',
      signatoryDesignation = 'Director',
      plan = 'standard',
      includeLabourWelfare = true,
      addonDsc = false,
      addonEsi = false,
    } = req.body;

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'EPF' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#EPF-${Math.floor(100000 + Math.random() * 900000)}`;

    const normPlan = String(plan).toLowerCase();
    let baseFee = 2999;
    let planName = 'Standard (EPF + 3 Months ECR)';

    if (normPlan === 'starter' || normPlan === 'basic') {
      baseFee = 1999;
      planName = 'Starter (EPF Allotment)';
    } else if (normPlan === 'standard' || normPlan === 'express') {
      baseFee = 2999;
      planName = 'Standard (EPF + 3 Months ECR)';
    } else if (normPlan === 'combo' || normPlan === 'all_in_one') {
      baseFee = 4499;
      planName = 'PF + ESI Compliance Combo';
    }

    let addonFee = 0;
    if (addonDsc) addonFee += 1499;
    if (addonEsi && normPlan !== 'combo') addonFee += 1999;

    const subtotal = baseFee + addonFee;
    const gstOnFee = Math.round(subtotal * 0.18);
    const labourWelfare = includeLabourWelfare ? 120 : 0;
    const gstOnLabour = includeLabourWelfare ? 22 : 0;
    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = subtotal + totalTaxes;

    // Save draft application
    const applicationRecord = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'pf-registration',
      module_type: 'PF',
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
        wantDbsAccount,
        employeeCoverage,
        entityType,
        coverageType,
        employeeCount,
        eligibleWageEmployees,
        entityPan,
        state,
        authorizedSignatory,
        signatoryDesignation,
        plan: normPlan,
        planName,
        addonDsc,
        addonEsi,
        subtotal,
        totalTaxes,
        totalAmount,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Save pending order
    const orderRecord = {
      id: orderId,
      order_number: orderNumber,
      application_id: appId,
      user_id: userId,
      status: 'PENDING',
      payment_status: 'PENDING',
      amount: totalAmount,
      currency: 'INR',
      service_name: `EPF Registration (${planName})`,
      pricing: {
        baseFee,
        addonFee,
        subtotal,
        gstOnFee,
        labourWelfare,
        gstOnLabour,
        totalTaxes,
        totalAmount,
        govtFee: 0,
      },
      customer: {
        name: name || authorizedSignatory || 'Business Owner',
        email,
        phone,
      },
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
      message: 'Draft EPF application created.',
      order: orderRecord,
      application: applicationRecord,
      orderId,
      orderNumber,
      applicationId: appId,
      applicationNumber: appNumber,
      amount: totalAmount,
      plan: normPlan,
      planName,
      pricing: orderRecord.pricing,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create EPF checkout draft.',
      error: err.message,
    });
  }
});

/**
 * GET /checkout/:orderId
 * Retrieves checkout details by order ID.
 */
router.get('/checkout/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    const order = db.getOrders().find((o) => o.id === orderId || o.order_number === orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    const app = db.getApplications().find((a) => a.id === order.application_id);

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
