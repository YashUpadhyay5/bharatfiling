import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import crypto from 'crypto';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid IEC applications for the authenticated customer.
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
        (a) => a.module_type === 'IEC' || a.service_id === 'import-export-code'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve IEC applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single IEC compliance application.
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
        .json({ success: false, message: 'IEC application not found.' });
    }
    if (!canAccessApplication(req.user, app)) {
      return res
        .status(404)
        .json({ success: false, message: 'Application not found.' });
    }
    res.json({
      success: true,
      application: app,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve application.',
      error: err.message,
    });
  }
});

/**
 * POST /onboarding-quote & POST /quote
 * Generates an instant quotation and initial application draft based on Screens 1 & 2 for IEC Registration.
 */
router.post(['/onboarding-quote', '/quote'], optionalAuth, (req, res) => {
  try {
    const {
      name = '',
      phone = '',
      email = '',
      cityPincode = '',
      whatsappOptIn = true,
      enterpriseName = '',
      organizationType = 'Sole Proprietorship',
      exportActivity = 'Merchant Exporter (Trading of physical goods)',
      isIntoGoods = 'yes',
      wantDbsAccount = 'yes',
      annualTurnover = '10 lakhs - 1 crore',
      pan = '',
      plan = 'starter',
      includeLabourWelfare = true,
    } = req.body;

    const userId = req.user?.id || GUEST_USER_ID;
    const cleanPhone = String(phone || '9876543210')
      .replace(/\D/g, '')
      .slice(-10);
    const cleanPan = (pan || '').toUpperCase().trim();
    const cleanName = (enterpriseName || name || 'IEC Applicant').trim();
    const cleanEmail =
      email ||
      `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'applicant'}@gmail.com`;

    const moduleType = 'IEC';

    // Pricing calculation matching reference screenshots
    // Base professional fee: ₹1270
    // GST (18%): ₹229 (Base + GST = ₹1499)
    // Labour Welfare: ₹77, GST on labour: ₹14 (Total with welfare = ₹1590)
    const baseFee = 1270;
    const gstFee = 229;
    const labourWelfare = includeLabourWelfare ? 77 : 0;
    const gstLabour = includeLabourWelfare ? 14 : 0;
    const totalTaxes = gstFee + labourWelfare + gstLabour;
    const totalAmount = baseFee + totalTaxes;

    const orderId = `ord_iec_${uuidv4().slice(0, 8)}`;
    const randomSuffix = crypto.randomInt(1000, 9999);
    const orderNumber = `#BF-IEC-${randomSuffix}`;

    // Create or locate business
    const businesses = db.getBusinesses();
    let business = businesses.find((b) => {
      if (cleanPan && b.pan === cleanPan) return true;
      if (b.user_id === userId && b.name.toLowerCase() === cleanName.toLowerCase())
        return true;
      return false;
    });

    if (!business) {
      business = {
        id: `biz_${uuidv4().slice(0, 8)}`,
        user_id: userId,
        name: cleanName,
        legal_name: cleanName,
        constitution: organizationType,
        pan: cleanPan || 'NOT_PROVIDED',
        nature_of_business: exportActivity,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      businesses.push(business);
      db.saveBusinesses(businesses);
    }

    // Create Draft Application
    const apps = db.getApplications();
    const applicationId = `app_iec_${uuidv4().slice(0, 8)}`;
    const appRandomSuffix = crypto.randomInt(1000, 9999);
    const appNumber = `IEC-${new Date().getFullYear()}-${appRandomSuffix}`;

    const newApplication = {
      id: applicationId,
      user_id: userId,
      business_id: business.id,
      service_id: 'import-export-code',
      module_type: moduleType,
      application_number: appNumber,
      service_name: 'Import Export Code (IEC) Registration',
      customer_status: 'Payment Pending',
      internal_status: 'PAYMENT_PENDING',
      payment_completed: false,
      progress_pct: 25,
      current_step: 3,
      sla_deadline: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
      fields_data: {
        applicantName: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        cityPincode,
        whatsappOptIn,
        organizationType,
        exportActivity,
        isIntoGoods,
        wantDbsAccount,
        annualTurnover,
        pan: cleanPan,
        plan,
        orderId,
      },
      documents: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    apps.push(newApplication);
    db.saveApplications(apps);

    // Create Pending Order
    const orders = db.getOrders();
    const newOrder = {
      id: orderId,
      order_number: orderNumber,
      user_id: userId,
      application_id: applicationId,
      service_id: 'import-export-code',
      package_tier: plan,
      plan_id: plan,
      status: 'PENDING',
      pricing: {
        base_price: baseFee,
        gst_on_fee: gstFee,
        labour_welfare: labourWelfare,
        gst_on_labour: gstLabour,
        total_taxes: totalTaxes,
        original_price: 1999,
        discount: 500,
        total_amount: totalAmount,
      },
      amount: totalAmount,
      currency: 'INR',
      created_at: new Date().toISOString(),
    };

    orders.push(newOrder);
    db.saveOrders(orders);

    res.json({
      success: true,
      message: 'IEC quotation generated successfully.',
      orderId,
      orderNumber,
      applicationId,
      applicationNumber: appNumber,
      plan,
      totalAmount,
      pricing: newOrder.pricing,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate IEC quotation.',
      error: err.message,
    });
  }
});

export default router;
