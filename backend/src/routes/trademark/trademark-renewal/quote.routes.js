import express from 'express';
import { db } from '../../../database/db.js';
import { authenticate } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

const PACKAGE_FEES = {
  consultation: 499,
  full_service: 24999,
  standard: 1999,
  late_renewal: 3499,
  restoration: 5999,
};

const STATUTORY_GOVT_FEES = {
  timely: { govtFee: 9000, surcharge: 0 },
  late: { govtFee: 9000, surcharge: 4500 },
  restoration: { govtFee: 9000, surcharge: 5000 },
};

/**
 * POST /quote/calculate
 * Calculates breakdown of trademark renewal legal fees, statutory government fees, and GST.
 */
router.post('/quote/calculate', (req, res) => {
  try {
    const {
      packageId = 'standard',
      renewalTiming = 'timely',
      classesCount = 1,
      includeGovtFee = false,
      coupon = '',
    } = req.body;

    const baseFee = PACKAGE_FEES[packageId] || PACKAGE_FEES.standard;

    let discount = packageId === 'consultation' ? 0 : 500;
    const cleanCoupon = String(coupon).trim().toUpperCase();
    if (cleanCoupon === 'SAVE40' || cleanCoupon === 'DIWALI') {
      discount = Math.round(baseFee * 0.4);
    } else if (cleanCoupon === 'ONLINE500' || cleanCoupon === 'HOORAY500') {
      discount = Math.min(500, baseFee);
    } else if (!coupon && packageId !== 'consultation') {
      discount = 500;
    }

    const professionalFee = Math.max(0, baseFee - discount);
    const gstOnProfessional = Math.round(professionalFee * 0.18);

    const statutory = STATUTORY_GOVT_FEES[renewalTiming] || STATUTORY_GOVT_FEES.timely;
    const totalGovtFee = (statutory.govtFee + statutory.surcharge) * Math.max(1, Number(classesCount) || 1);

    const totalPayable = includeGovtFee
      ? professionalFee + gstOnProfessional + totalGovtFee
      : professionalFee + gstOnProfessional;

    res.json({
      success: true,
      quote: {
        packageId,
        renewalTiming,
        classesCount,
        baseProfessionalFee: baseFee,
        discount,
        professionalFee,
        gstOnProfessional,
        govtFeePerClass: statutory.govtFee,
        statutorySurcharge: statutory.surcharge,
        totalGovtFee,
        includeGovtFee,
        totalPayable,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate trademark renewal quote.',
      error: err.message,
    });
  }
});

/**
 * GET /applications
 * Retrieves customer trademark renewal applications.
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
          a.module_type === 'TRADEMARK_RENEWAL' ||
          a.service_id === 'trademark-renewal' ||
          a.service_id === 'tm-renewal'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve trademark renewal applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single trademark renewal application.
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
