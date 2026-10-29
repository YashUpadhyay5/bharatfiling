import express from 'express';
import { db } from '../../../database/db.js';
import { authenticate } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

const PACKAGE_FEES = {
  starter: 3499,
  standard: 7999,
  premium: 13999,
  procedural: 1499,
  substantive: 2999,
  comprehensive: 5999,
};

/**
 * POST /quote/calculate
 * Calculates breakdown of legal objection drafting fees, online discounts, and GST.
 */
router.post('/quote/calculate', (req, res) => {
  try {
    const {
      packageId = 'substantive',
      coupon = '',
      includeLabourWelfare = false,
    } = req.body;

    const baseFee = PACKAGE_FEES[packageId] || PACKAGE_FEES.substantive;

    let discount = 500;
    const cleanCoupon = String(coupon).trim().toUpperCase();
    if (cleanCoupon === 'SAVE40' || cleanCoupon === 'DIWALI') {
      discount = Math.round(baseFee * 0.4);
    } else if (cleanCoupon === 'ONLINE500' || cleanCoupon === 'HOORAY500') {
      discount = 500;
    } else if (!coupon && packageId === 'premium' && includeLabourWelfare) {
      discount = 0;
    } else if (!coupon) {
      discount = 500;
    }

    const professionalFee = Math.max(0, baseFee - discount);
    const gstOnProfessional = Math.round(professionalFee * 0.18);
    const labourWelfare = includeLabourWelfare ? 399 : 0;
    const gstOnLabour = includeLabourWelfare ? Math.round(399 * 0.18) : 0; // 72
    const totalTaxesAndCharges = gstOnProfessional + labourWelfare + gstOnLabour;
    const totalPayable = professionalFee + totalTaxesAndCharges;

    res.json({
      success: true,
      quote: {
        packageId,
        baseProfessionalFee: baseFee,
        discount,
        professionalFee,
        gstOnProfessional,
        labourWelfare,
        gstOnLabour,
        totalTaxesAndCharges,
        totalPayable,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to calculate trademark objection quote.',
      error: err.message,
    });
  }
});

/**
 * GET /applications
 * Retrieves active trademark objection applications for customer.
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
          a.module_type === 'TRADEMARK_OBJECTION' ||
          a.service_id === 'trademark-objection' ||
          a.service_id === 'tm-objection'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve trademark objection applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single trademark objection application.
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
