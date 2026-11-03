import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid Trust registration applications for customer.
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
          a.module_type === 'TRUST' ||
          a.service_id === 'trust' ||
          a.service_id === 'trust-registration' ||
          a.service_id === 'public-trust'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Trust applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single Trust registration application.
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
 * Computes quotation for Trust Registration based on plan, corpus fund, and add-ons.
 */
router.post('/quote', (req, res) => {
  try {
    const {
      plan = 'standard',
      includeLabourWelfare = true,
      addon12A80G = false,
      addonDarpan = false,
      state = 'Delhi NCR',
      corpus = 10000,
    } = req.body;

    const normPlan = String(plan).toLowerCase();
    let professionalFee = 9999;
    let planName = 'Standard (Trust Formation + Sub-Registrar Filing)';

    if (normPlan === 'starter' || normPlan === 'drafting' || normPlan === 'basic') {
      professionalFee = 4999;
      planName = 'Starter (Trust Deed Drafting)';
    } else if (normPlan === 'standard' || normPlan === 'registration') {
      professionalFee = 9999;
      planName = 'Standard (Trust Formation + Sub-Registrar Filing)';
    } else if (normPlan === 'premium' || normPlan === 'ngo_suite' || normPlan === 'complete') {
      professionalFee = 18999;
      planName = 'Premium (Complete Non-Profit Suite: Trust + 12A + 80G + Darpan)';
    }

    let addonFee = 0;
    if (addon12A80G && normPlan !== 'premium') addonFee += 4999;
    if (addonDarpan && normPlan !== 'premium') addonFee += 1999;

    const grossFee = professionalFee + addonFee;
    const onlineDiscount = 500;
    const subtotal = Math.max(0, grossFee - onlineDiscount);

    const gstOnFee = Math.round(subtotal * 0.18);
    const labourWelfare = includeLabourWelfare ? 50 : 0;
    const gstOnLabour = includeLabourWelfare ? 9 : 0;
    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = subtotal + totalTaxes;

    // Estimated State Stamp Duty
    let estimatedStampDuty = 500;
    if (String(state).toLowerCase().includes('maharashtra')) estimatedStampDuty = 1000;
    if (String(state).toLowerCase().includes('karnataka')) estimatedStampDuty = Math.max(500, Math.round(corpus * 0.05));
    if (String(state).toLowerCase().includes('tamil nadu')) estimatedStampDuty = 1000;

    res.json({
      success: true,
      quote: {
        plan: normPlan,
        planName,
        professionalFee,
        addonFee,
        grossFee,
        onlineDiscount,
        subTotalAmount: subtotal,
        gstOnFee,
        labourWelfare,
        gstOnLabour,
        totalTaxes,
        totalAmount,
        estimatedStampDuty,
        currency: 'INR',
        breakdownText: `Professional Fee: ₹${grossFee} - Discount ₹${onlineDiscount} + 18% GST ₹${gstOnFee} + Welfare ₹${labourWelfare + gstOnLabour} = ₹${totalAmount}`,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to compute Trust registration quotation.',
      error: err.message,
    });
  }
});

export default router;
