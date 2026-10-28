import express from 'express';
import { db } from '../../../database/db.js';
import { authenticate } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active APEDA applications for customer.
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
          a.module_type === 'APEDA' ||
          a.service_id === 'apeda-registration' ||
          a.service_id === 'apeda' ||
          a.service_id === 'rcmc'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve APEDA applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single APEDA application.
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
 * Computes quotation for APEDA Consultation matching screenshot media_1793179244243_9e915d29.png
 */
router.post('/quote', (req, res) => {
  try {
    const {
      coupon = 'MAKEININDIA',
      includeLabourWelfare = true,
    } = req.body;

    const consultationFee = 999;
    const discount = String(coupon).toUpperCase() === 'MAKEININDIA' ? 500 : 0;
    const subtotal = consultationFee - discount;

    const labourWelfare = includeLabourWelfare ? 22 : 0;
    const gstOnLabour = includeLabourWelfare ? 4 : 0;
    const taxesAndCharges = labourWelfare + gstOnLabour;
    const totalAmount = subtotal + taxesAndCharges;

    res.json({
      success: true,
      quote: {
        serviceName: 'APEDA Registration & RCMC Expert Consultation',
        consultationFee,
        couponCode: coupon,
        discount,
        subtotal,
        labourWelfare,
        gstOnLabour,
        taxesAndCharges,
        totalAmount,
        breakdown: {
          welfareIncluded: includeLabourWelfare,
          couponApplied: discount > 0,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate APEDA quotation.',
      error: err.message,
    });
  }
});

export default router;
