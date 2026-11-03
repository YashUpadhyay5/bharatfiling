import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid Sole Proprietorship applications for customer.
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
          a.module_type === 'PROPRIETORSHIP' ||
          a.service_id === 'proprietorship' ||
          a.service_id === 'sole-proprietorship' ||
          a.service_id === 'proprietorship-registration'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Proprietorship applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single Sole Proprietorship application.
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
 * Computes quotation for Sole Proprietorship Registration based on plan and add-ons.
 */
router.post('/quote', (req, res) => {
  try {
    const {
      plan = 'starter',
      includeLabourWelfare = true,
      addonShopAct = false,
      addonTrademark = false,
    } = req.body;

    const normPlan = String(plan).toLowerCase();
    let professionalFee = 999;
    let planName = 'Starter (MSME Udyam Registration)';

    if (normPlan === 'starter' || normPlan === 'udyam' || normPlan === 'basic') {
      professionalFee = 999;
      planName = 'Starter (MSME Udyam Registration)';
    } else if (normPlan === 'standard' || normPlan === 'gst' || normPlan === 'proprietorship_gst') {
      professionalFee = 2499;
      planName = 'Standard (Proprietorship + GST Registration)';
    } else if (normPlan === 'premium' || normPlan === 'complete' || normPlan === 'launchpad') {
      professionalFee = 4999;
      planName = 'Premium (Complete Business Launchpad)';
    }

    let addonFee = 0;
    if (addonShopAct) addonFee += 999;
    if (addonTrademark) addonFee += 1999;

    const subtotal = professionalFee + addonFee;
    const gstOnFee = Math.round(subtotal * 0.18);
    const labourWelfare = includeLabourWelfare ? 50 : 0;
    const gstOnLabour = includeLabourWelfare ? 9 : 0;
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
          hasShopActAddon: addonShopAct,
          hasTrademarkAddon: addonTrademark,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to compute quotation.',
      error: err.message,
    });
  }
});

export default router;
