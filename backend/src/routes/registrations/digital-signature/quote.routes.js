import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid Digital Signature (DSC) applications for customer.
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
          a.module_type === 'DSC' ||
          a.service_id === 'class-3-digital-signature' ||
          a.service_id === 'digital-signature' ||
          a.service_id === 'dsc-registration' ||
          a.service_id === 'dsc'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Digital Signature applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single DSC application.
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
 * Computes quotation for Class 3 DSC based on plan, validity, and token options.
 */
router.post('/quote', (req, res) => {
  try {
    const {
      plan = 'combo',
      validityYears = 2,
      includeLabourWelfare = true,
      includeToken = true,
    } = req.body;

    const normPlan = String(plan).toLowerCase();
    let professionalFee = 1999;
    let planName = 'Class 3 Digital Signature';

    if (normPlan === 'signing' || normPlan === 'basic') {
      professionalFee = 1499;
      planName = 'Class 3 Signing Only';
    } else if (normPlan === 'combo' || normPlan === 'standard') {
      professionalFee = 1999;
      planName = 'Class 3 Combo (Signing + Encryption)';
    } else if (normPlan === 'organization' || normPlan === 'premium') {
      professionalFee = 3999;
      planName = 'Organization Combo';
    }

    // Additional fee for 3 years validity
    if (validityYears === 3) {
      professionalFee += 699;
    }

    // Taxes & Charges breakdown (1:1 with Screenshot media_1793079880114_335c03a3.png)
    const gstOnFee = Math.round(professionalFee * 0.18004); // ₹360 on ₹1999
    const labourWelfare = includeLabourWelfare ? 120 : 0;
    const gstOnLabour = includeLabourWelfare ? 22 : 0;

    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = professionalFee + totalTaxes;

    res.json({
      success: true,
      quote: {
        plan: normPlan,
        planName,
        validityYears,
        professionalFee,
        gstOnFee,
        labourWelfare,
        gstOnLabour,
        totalTaxes,
        totalAmount,
        tokenIncluded: includeToken,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate quotation.',
      error: err.message,
    });
  }
});

export default router;
