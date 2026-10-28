import express from 'express';
import { db } from '../../../database/db.js';
import { authenticate } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

const PLAN_FEES = {
  starter: 1199,
  standard: 1999,
  defense: 4999,
};

const GOVT_FEES = {
  individual: 4500, // Individual / Sole Proprietor / Startup / MSME
  startup: 4500,
  company: 9000,    // Company / LLP / Others
};

/**
 * POST /quote/calculate
 * Calculates breakdown of professional fee, GST, and statutory IP India fees.
 */
router.post('/quote/calculate', (req, res) => {
  try {
    const {
      planId = 'standard',
      applicantType = 'individual',
      classesCount = 1,
      coupon = '',
    } = req.body;

    const baseFee = PLAN_FEES[planId] || PLAN_FEES.standard;
    const numClasses = Math.max(1, parseInt(classesCount, 10) || 1);
    const govtFeePerClass = GOVT_FEES[applicantType] || GOVT_FEES.individual;
    const totalGovtFee = govtFeePerClass * numClasses;

    let discount = 0;
    const cleanCoupon = String(coupon).trim().toUpperCase();
    if (cleanCoupon === 'SAVE40' || cleanCoupon === 'DIWALI') {
      discount = Math.round(baseFee * 0.4);
    }

    const professionalFee = Math.max(0, baseFee - discount);
    const gstOnProfessional = Math.round(professionalFee * 0.18);
    const totalPayable = professionalFee + gstOnProfessional + totalGovtFee;

    res.json({
      success: true,
      quote: {
        planId,
        applicantType,
        classesCount: numClasses,
        baseProfessionalFee: baseFee,
        discount,
        professionalFee,
        gstOnProfessional,
        govtFeePerClass,
        totalGovtFee,
        totalPayable,
        isMsmeRebateApplied: govtFeePerClass === 4500,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate trademark quote.',
      error: err.message,
    });
  }
});

/**
 * GET /applications
 * Retrieves active trademark applications for customer.
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
          a.module_type === 'TRADEMARK' ||
          a.service_id === 'trademark-registration' ||
          a.service_id === 'trademark'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve trademark applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single trademark application.
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

export default router;
