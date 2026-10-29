import express from 'express';
import { db } from '../../database/db.js';
import { authenticate } from '../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../middleware/ownership.js';

const router = express.Router();

const PACKAGE_FEES = {
  starter: 2499,
  standard: 4999,
  commercial: 8999,
};

const STATUTORY_GOVT_FEES = {
  literary: 500,
  software: 500,
  artistic: 2000,
  musical: 2000,
  cinematograph: 5000,
  sound_recording: 2000,
};

/**
 * POST /quote/calculate
 * Calculates breakdown of copyright legal fees, statutory government fees, GST, and Labour Welfare.
 */
router.post('/quote/calculate', (req, res) => {
  try {
    const {
      packageId = 'standard',
      category = 'literary',
      worksCount = 1,
      includeGovtFee = false,
      includeLabourWelfare = false,
      coupon = '',
    } = req.body;

    const baseFee = PACKAGE_FEES[packageId] || PACKAGE_FEES.standard;

    let discount = 500;
    const cleanCoupon = String(coupon).trim().toUpperCase();
    if (cleanCoupon === 'SAVE40' || cleanCoupon === 'DIWALI') {
      discount = Math.round(baseFee * 0.4);
    } else if (cleanCoupon === 'ONLINE500' || cleanCoupon === 'HOORAY500' || !coupon) {
      discount = 500;
    }

    const professionalFee = Math.max(0, baseFee - discount);
    const gstOnProfessional = Math.round(professionalFee * 0.18);

    const statutoryFeePerWork = STATUTORY_GOVT_FEES[category] || STATUTORY_GOVT_FEES.literary;
    const count = Math.max(1, Number(worksCount) || 1);
    const totalGovtFee = statutoryFeePerWork * count;

    const labourWelfare = includeLabourWelfare ? 399 : 0;
    const gstOnLabour = includeLabourWelfare ? Math.round(399 * 0.18) : 0; // 72

    const taxesAndCharges = gstOnProfessional + labourWelfare + gstOnLabour;

    const totalPayable = includeGovtFee
      ? professionalFee + taxesAndCharges + totalGovtFee
      : professionalFee + taxesAndCharges;

    res.json({
      success: true,
      quote: {
        packageId,
        category,
        worksCount: count,
        baseProfessionalFee: baseFee,
        discount,
        professionalFee,
        gstOnProfessional,
        labourWelfare,
        gstOnLabour,
        taxesAndCharges,
        totalTaxesAndCharges: taxesAndCharges,
        statutoryFeePerWork,
        totalGovtFee,
        includeGovtFee,
        includeLabourWelfare,
        totalPayable,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate copyright registration quote.',
      error: err.message,
    });
  }
});

/**
 * GET /applications
 * Retrieves customer copyright applications.
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
      count: apps.length,
      applications: apps,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve copyright applications.',
      error: err.message,
    });
  }
});

export default router;
