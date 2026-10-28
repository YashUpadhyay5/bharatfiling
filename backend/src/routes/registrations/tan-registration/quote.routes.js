import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid TAN applications for customer.
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
          a.module_type === 'TAN' ||
          a.service_id === 'tan-registration' ||
          a.service_id === 'tan' ||
          a.service_id === 'form-49b'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve TAN applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single TAN application.
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
 * Computes quotation for TAN Registration based on plan and add-ons.
 */
router.post('/quote', (req, res) => {
  try {
    const {
      plan = 'standard',
      includeLabourWelfare = true,
      addonDsc = false,
      addonExpress = false,
    } = req.body;

    const normPlan = String(plan).toLowerCase();
    let professionalFee = 999;
    let planName = 'Standard (TAN Allotment + TRACES Portal Setup)';

    if (normPlan === 'starter' || normPlan === 'basic' || normPlan === 'form49b_basic') {
      professionalFee = 499;
      planName = 'Starter (Basic Form 49B Filing)';
    } else if (normPlan === 'standard' || normPlan === 'tan_traces') {
      professionalFee = 999;
      planName = 'Standard (TAN Allotment + TRACES Portal Setup)';
    } else if (normPlan === 'combo' || normPlan === 'tan_tds_combo') {
      professionalFee = 1999;
      planName = 'Business TAN + 1st Quarter TDS Return Combo';
    }

    let addonFee = 0;
    if (addonDsc) addonFee += 1499;
    if (addonExpress) addonFee += 499;

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
          hasExpressAddon: addonExpress,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate quotation.',
      error: err.message,
    });
  }
});

export default router;
