import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid ESI (ESIC) applications for customer.
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
          a.module_type === 'ESI' ||
          a.module_type === 'ESIC' ||
          a.service_id === 'esi-registration' ||
          a.service_id === 'esic-registration' ||
          a.service_id === 'pf-esi-registration' ||
          a.service_id === 'esi' ||
          a.service_id === 'esic'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve ESI applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single ESI application.
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
 * Computes quotation for ESI Registration based on plan, employee count, and addons.
 */
router.post('/quote', (req, res) => {
  try {
    const {
      plan = 'standard',
      employeeCount = 12,
      monthlyWage = 15000,
      includeLabourWelfare = true,
      addonDsc = false,
      addonPf = false,
    } = req.body;

    const normPlan = String(plan).toLowerCase();
    let professionalFee = 2999;
    let planName = 'Standard (ESIC Code + 3 Months Monthly Return)';

    if (normPlan === 'starter' || normPlan === 'basic') {
      professionalFee = 1999;
      planName = 'Starter (17-Digit ESIC Code)';
    } else if (normPlan === 'standard' || normPlan === 'express') {
      professionalFee = 2999;
      planName = 'Standard (ESIC Code + 3 Months Monthly Return)';
    } else if (normPlan === 'combo' || normPlan === 'all_in_one') {
      professionalFee = 4499;
      planName = 'ESI + PF Compliance Combo';
    }

    let addonFee = 0;
    if (addonDsc) addonFee += 1499;
    if (addonPf && normPlan !== 'combo') addonFee += 1999;

    const subtotal = professionalFee + addonFee;
    const gstOnFee = Math.round(subtotal * 0.18);
    const labourWelfare = includeLabourWelfare ? 120 : 0;
    const gstOnLabour = includeLabourWelfare ? 22 : 0;
    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = subtotal + totalTaxes;

    // Statutory 4.0% Contribution calculation under ESI Act
    // Employee: 0.75% (0% if wage <= 176/day), Employer: 3.25%
    const wagePerEmployee = Math.min(Number(monthlyWage) || 15000, 21000);
    const count = Number(employeeCount) || 12;
    const monthlyWageBill = wagePerEmployee * count;

    const employeeContribution = Math.round(monthlyWageBill * 0.0075);
    const employerContribution = Math.round(monthlyWageBill * 0.0325);
    const totalMonthlyEsiContribution = employeeContribution + employerContribution;

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
          hasPfAddon: addonPf,
        },
        statutoryEst: {
          employeeCount: count,
          wagePerEmployee,
          monthlyWageBill,
          employeeRate: '0.75%',
          employerRate: '3.25%',
          totalRate: '4.00%',
          monthlyEmployeeShare: employeeContribution,
          monthlyEmployerShare: employerContribution,
          totalMonthlyStatutoryDeposit: totalMonthlyEsiContribution,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to compute ESI quotation.',
      error: err.message,
    });
  }
});

/**
 * GET /plans
 * Public endpoint returning all available ESI packages.
 */
router.get('/plans', (req, res) => {
  res.json({
    success: true,
    plans: [
      {
        id: 'starter',
        name: 'Starter (17-Digit ESIC Code)',
        price: 1999,
        originalPrice: 2999,
        gstRate: 0.18,
        tat: '3-5 working days',
        recommended: false,
      },
      {
        id: 'standard',
        name: 'Standard (ESIC Code + 3 Months Monthly Return)',
        price: 2999,
        originalPrice: 4999,
        gstRate: 0.18,
        tat: '3 working days',
        recommended: true,
      },
      {
        id: 'combo',
        name: 'ESI + PF Compliance Combo',
        price: 4499,
        originalPrice: 6999,
        gstRate: 0.18,
        tat: '3 working days',
        recommended: false,
      },
    ],
  });
});

export default router;
