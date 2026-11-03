import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * State-specific stamp duty on LLP Agreement (Form 3) under state stamp acts
 */
const STATE_STAMP_SCHEDULE = {
  maharashtra: { rate: '1% of Capital', min: 500, max: 15000, fixed: 500 },
  delhi: { rate: 'Fixed e-Stamp', fixed: 100 },
  karnataka: { rate: 'Ad-valorem', fixed: 1000 },
  'tamil nadu': { rate: 'Non-judicial stamp', fixed: 300 },
  'uttar pradesh': { rate: 'Fixed non-judicial', fixed: 500 },
  gujarat: { rate: '3.5% of Capital', fixed: 1000 },
  'west bengal': { rate: 'Capital tier', fixed: 250 },
  telangana: { rate: 'Fixed stamp schedule', fixed: 500 },
};

/**
 * GET /applications
 * Retrieves active paid LLP registration applications for customer.
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
        (a) =>
          a.module_type === 'LLP' ||
          a.service_id === 'llp' ||
          a.service_id === 'llp-registration' ||
          a.service_id === 'limited-liability-partnership'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve LLP applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single LLP registration application.
 */
router.get('/applications/:id', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const app = db
      .getApplications()
      .find((a) => a.id === id || a.application_number === id);
    if (!app) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    if (!canAccessApplication(req.user, app)) {
      return res.status(403).json({ success: false, message: 'Unauthorized access.' });
    }

    res.json({ success: true, application: app });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve application details.',
      error: err.message,
    });
  }
});

/**
 * POST /quote
 * Computes quotation for LLP Registration based on plan, capital contribution, and add-ons.
 */
router.post('/quote', (req, res) => {
  try {
    const {
      plan = 'standard',
      includeLabourWelfare = true,
      addonGst = false,
      addonCompliance = false,
      addonTrademark = false,
      state = 'Maharashtra',
      capitalContribution = 100000,
    } = req.body;

    const normPlan = String(plan).toLowerCase();
    let professionalFee = 2499;
    let originalFee = 4999;
    let planName = 'Standard (LLP Incorporation + DSC + DPIN + Form 3)';

    if (normPlan === 'starter' || normPlan === 'basic') {
      professionalFee = 999;
      originalFee = 1999;
      planName = 'Starter (Basic LLP Incorporation)';
    } else if (normPlan === 'standard') {
      professionalFee = 2499;
      originalFee = 4999;
      planName = 'Standard (LLP Incorporation + DSC + DPIN + Form 3)';
    } else if (normPlan === 'complete' || normPlan === 'premium') {
      professionalFee = 4999;
      originalFee = 9999;
      planName = 'Complete (LLP + GST + Annual Compliance Support)';
    }

    // Optional Add-ons calculation
    let addonFee = 0;
    const activeAddons = [];

    if (addonGst && normPlan !== 'complete') {
      addonFee += 1499;
      activeAddons.push({ name: 'GST Registration (REG-06)', fee: 1499 });
    }
    if (addonCompliance && normPlan !== 'complete') {
      addonFee += 4999;
      activeAddons.push({ name: 'Annual MCA Compliance (Form 8 & Form 11)', fee: 4999 });
    }
    if (addonTrademark) {
      addonFee += 1999;
      activeAddons.push({ name: 'Trademark Filing & Brand Protection Guidance', fee: 1999 });
    }

    // State stamp duty estimation on Form 3
    const stateKey = String(state).toLowerCase().trim();
    const stampInfo = STATE_STAMP_SCHEDULE[stateKey] || { rate: 'Standard', fixed: 500 };
    const estimatedStampDuty = stampInfo.fixed || 500;

    // Subtotal & Discount
    const grossFee = professionalFee + addonFee;
    const onlineDiscount = 500;
    const subtotal = Math.max(0, grossFee - onlineDiscount);

    // GST & Welfare
    const gstAmount = Math.round(subtotal * 0.18);
    const labourWelfare = includeLabourWelfare ? 50 : 0;
    const labourWelfareGst = includeLabourWelfare ? 9 : 0;
    const totalTaxes = gstAmount + labourWelfare + labourWelfareGst;
    const totalPayable = subtotal + totalTaxes;

    res.json({
      success: true,
      quotation: {
        plan: normPlan,
        planName,
        originalFee,
        professionalFee,
        addons: activeAddons,
        addonTotal: addonFee,
        grossFee,
        discount: onlineDiscount,
        subtotal,
        gstRate: '18%',
        gstAmount,
        labourWelfare: {
          charge: labourWelfare,
          gst: labourWelfareGst,
          total: labourWelfare + labourWelfareGst,
        },
        estimatedStampDuty,
        stateStampAuthority: stampInfo.rate,
        totalPayable,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate quotation for LLP Registration.',
      error: err.message,
    });
  }
});

export default router;
