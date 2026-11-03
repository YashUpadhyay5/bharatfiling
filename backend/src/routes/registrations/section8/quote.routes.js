import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid Section 8 Company applications for customer.
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
          a.module_type === 'SECTION_8' ||
          a.service_id === 'section-8' ||
          a.service_id === 'section-8-company' ||
          a.service_id === 'section8' ||
          a.service_id === 'ngo-registration'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Section 8 Company applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single Section 8 Company application.
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
 * Computes quotation for Section 8 Company Registration based on plan and add-ons.
 */
router.post('/quote', (req, res) => {
  try {
    const {
      plan = 'starter',
      includeLabourWelfare = true,
      addon12A80G = false,
      addonNitiAayog = false,
      addonCsr1 = false,
      proposedFoundationName = 'Hope India Welfare Foundation',
      charitableObjective = 'Education, Literacy & Skill Development',
    } = req.body;

    const normPlan = String(plan).toLowerCase();
    let professionalFee = 999;
    let originalFee = 1999;
    let planName = 'Starter (Section 8 Company Incorporation)';

    if (normPlan === 'starter' || normPlan === 'basic') {
      professionalFee = 999;
      originalFee = 1999;
      planName = 'Starter (Section 8 Company Incorporation)';
    } else if (normPlan === 'standard') {
      professionalFee = 2499;
      originalFee = 4999;
      planName = 'Standard (Incorporation + Form INC-16 Central Govt License)';
    } else if (normPlan === 'complete' || normPlan === 'enterprise') {
      professionalFee = 4999;
      originalFee = 9999;
      planName = 'Complete (Section 8 + 12A + 80G + NGO Darpan Suite)';
    }

    // Optional Add-ons
    let addonFee = 0;
    const activeAddons = [];

    if (addon12A80G && normPlan !== 'complete') {
      addonFee += 4999;
      activeAddons.push({ name: 'Section 12A & 80G Tax Exemption (Form 10A/10AB)', fee: 4999 });
    }
    if (addonNitiAayog && normPlan !== 'complete') {
      addonFee += 1499;
      activeAddons.push({ name: 'NITI Aayog NGO Darpan Enrollment', fee: 1499 });
    }
    if (addonCsr1 && normPlan !== 'complete') {
      addonFee += 1999;
      activeAddons.push({ name: 'Form CSR-1 Corporate CSR Grant Eligibility', fee: 1999 });
    }

    const grossFee = professionalFee + addonFee;
    const onlineDiscount = normPlan === 'starter' ? 1000 : 500;
    const subtotal = Math.max(0, grossFee - (normPlan === 'starter' ? 0 : onlineDiscount));

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
        discount: normPlan === 'starter' ? 1000 : onlineDiscount,
        subtotal,
        gstRate: '18%',
        gstAmount,
        labourWelfare: {
          charge: labourWelfare,
          gst: labourWelfareGst,
          total: labourWelfare + labourWelfareGst,
        },
        proposedFoundationName,
        charitableObjective,
        totalPayable,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate quotation for Section 8 Company.',
      error: err.message,
    });
  }
});

export default router;
