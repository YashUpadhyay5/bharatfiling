import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid PAN applications for customer.
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
          a.module_type === 'PAN' ||
          a.service_id === 'pan-registration' ||
          a.service_id === 'pan' ||
          a.service_id === 'pan-card'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve PAN applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single PAN application.
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
 * Computes quotation for PAN Registration based on plan and add-ons.
 */
router.post('/quote', (req, res) => {
  try {
    const {
      plan = 'standard',
      includeLabourWelfare = true,
      addonDsc = false,
      addonAffidavit = false,
    } = req.body;

    const normPlan = String(plan).toLowerCase();
    let professionalFee = 499;
    let planName = 'Standard (Physical PVC Card + e-PAN)';

    if (normPlan === 'starter' || normPlan === 'epan' || normPlan === 'basic') {
      professionalFee = 299;
      planName = 'Starter (Instant e-PAN Digital)';
    } else if (normPlan === 'standard' || normPlan === 'physical') {
      professionalFee = 499;
      planName = 'Standard (Physical PVC Card + e-PAN)';
    } else if (normPlan === 'combo' || normPlan === 'pan_tan_combo') {
      professionalFee = 999;
      planName = 'Business Entity PAN + TAN Combo';
    }

    let addonFee = 0;
    if (addonDsc) addonFee += 1499;
    if (addonAffidavit) addonFee += 499;

    const subtotal = professionalFee + addonFee;
    const gstOnFee = Math.round(subtotal * 0.18);
    const labourWelfare = includeLabourWelfare ? (normPlan === 'combo' ? 180 : 80) : 0;
    const gstOnLabour = includeLabourWelfare ? Math.round(labourWelfare * 0.18) : 0;
    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = subtotal + totalTaxes;

    res.json({
      success: true,
      quote: {
        plan: normPlan,
        planName,
        professionalFee,
        basePrice: professionalFee,
        addonFee,
        subtotal,
        gstOnFee,
        labourWelfare,
        labourWelfareAmount: labourWelfare,
        gstOnLabour,
        taxesAndCharges: totalTaxes,
        totalAmount,
        breakdown: {
          gstRate: '18%',
          labourWelfareIncluded: includeLabourWelfare,
          hasDscAddon: addonDsc,
          hasAffidavitAddon: addonAffidavit,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to compute PAN quotation.',
      error: err.message,
    });
  }
});

/**
 * GET /plans
 * Public endpoint returning all available PAN packages.
 */
router.get('/plans', (req, res) => {
  res.json({
    success: true,
    plans: [
      {
        id: 'starter',
        name: 'Starter (Instant e-PAN Digital)',
        price: 299,
        originalPrice: 499,
        gstRate: 0.18,
        tat: '2-3 working days',
        recommended: false,
      },
      {
        id: 'standard',
        name: 'Standard (Physical PVC Card + e-PAN)',
        price: 499,
        originalPrice: 799,
        gstRate: 0.18,
        tat: '2-4 working days',
        recommended: true,
      },
      {
        id: 'combo',
        name: 'Business Entity PAN + TAN Combo',
        price: 999,
        originalPrice: 1499,
        gstRate: 0.18,
        tat: '3-4 working days',
        recommended: false,
      },
    ],
  });
});

export default router;
