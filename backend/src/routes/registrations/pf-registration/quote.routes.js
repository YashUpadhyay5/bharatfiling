import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid PF (EPF) applications for customer.
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
          a.module_type === 'PF' ||
          a.module_type === 'EPF' ||
          a.service_id === 'pf-registration' ||
          a.service_id === 'epf-registration' ||
          a.service_id === 'pf-esi-registration' ||
          a.service_id === 'pf' ||
          a.service_id === 'epf'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve PF applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single PF application.
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
 * Computes quotation for EPF Registration based on plan, employee count, and addons.
 */
router.post('/quote', (req, res) => {
  try {
    const {
      plan = 'standard',
      employeeCount = 20,
      monthlyWage = 15000,
      includeLabourWelfare = true,
      addonDsc = false,
      addonEsi = false,
    } = req.body;

    const normPlan = String(plan).toLowerCase();
    let professionalFee = 2999;
    let planName = 'Standard (EPF + 3 Months ECR)';

    if (normPlan === 'starter' || normPlan === 'basic') {
      professionalFee = 1999;
      planName = 'Starter (EPF Allotment)';
    } else if (normPlan === 'standard' || normPlan === 'express') {
      professionalFee = 2999;
      planName = 'Standard (EPF + 3 Months ECR)';
    } else if (normPlan === 'combo' || normPlan === 'all_in_one') {
      professionalFee = 4499;
      planName = 'PF + ESI Compliance Combo';
    }

    let addonFee = 0;
    if (addonDsc) addonFee += 1499;
    if (addonEsi && normPlan !== 'combo') addonFee += 1999;

    const subtotal = professionalFee + addonFee;
    const gstOnFee = Math.round(subtotal * 0.18);
    const labourWelfare = includeLabourWelfare ? 120 : 0;
    const gstOnLabour = includeLabourWelfare ? 22 : 0;
    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = subtotal + totalTaxes;

    // Wage simulation
    const wageBase = Math.min(Math.max(Number(monthlyWage) || 15000, 1000), 15000);
    const employeeDeduction = Math.round(wageBase * 0.12);
    const employerEpf = Math.round(wageBase * 0.0367);
    const employerEps = Math.round(wageBase * 0.0833);
    const employerEdli = Math.round(wageBase * 0.005);
    const employerAdmin = Math.max(Math.round(wageBase * 0.005), 75);
    const totalEmployerContribution = employerEpf + employerEps + employerEdli + employerAdmin;

    res.json({
      success: true,
      quote: {
        plan: normPlan,
        planName,
        professionalFee,
        addonFee,
        subtotal,
        gstOnFee,
        labourWelfare,
        gstOnLabour,
        totalTaxes,
        totalAmount,
        govtFee: 0,
        tat: normPlan === 'standard' ? '3 working days' : '3-5 working days',
        statutoryContribution: {
          wageBase,
          employeeDeduction,
          employerEpf,
          employerEps,
          employerEdli,
          employerAdmin,
          totalEmployerContribution,
          combinedMonthlyDeposit: employeeDeduction + totalEmployerContribution,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to compute PF quotation.',
      error: err.message,
    });
  }
});

export default router;
