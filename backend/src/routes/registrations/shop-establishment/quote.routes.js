import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid Shop & Establishment applications for customer.
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
          a.module_type === 'SE' ||
          a.service_id === 'shop-establishment' ||
          a.service_id === 'shop-and-establishment' ||
          a.service_id === 'shop-and-establishment-license' ||
          a.service_id === 'gumasta-license'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Shop and Establishment applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single Shop application.
 */
router.get('/applications/:id', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const app = db
      .getApplications()
      .find((a) => a.id === id || a.application_number === id);
    if (!app) {
      return res
        .status(404)
        .json({ success: false, message: 'Shop and Establishment application not found.' });
    }

    if (!canAccessApplication(req.user, app)) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to this application.',
      });
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
 * Computes exact quote and taxes matching Screenshot 4 arithmetic.
 */
router.post('/quote', (req, res) => {
  try {
    const {
      plan = 'standard',
      companyName = 'My Business',
      isCommercialPlace = 'Yes',
      includeLabourWelfare = true,
    } = req.body;

    const normPlan = String(plan).toLowerCase();
    let baseFee = 3999;
    let planName = 'Standard';

    if (normPlan === 'starter' || normPlan === 'basic') {
      baseFee = 1999;
      planName = 'Starter';
    } else if (normPlan === 'premium' || normPlan === 'all_in_one') {
      baseFee = 5499;
      planName = 'Premium';
    }

    const gstOnFee = Math.round(baseFee * 0.18004); // e.g. 720 for 3999, 360 for 1999, 990 for 5499
    const labourWelfare = includeLabourWelfare ? 240 : 0;
    const gstOnLabour = includeLabourWelfare ? 44 : 0; // 18% of 240 = 43.2 -> 44

    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour; // 720 + 240 + 44 = 1004
    const totalAmount = baseFee + totalTaxes; // 3999 + 1004 = 5003

    return res.json({
      success: true,
      quote: {
        plan: normPlan,
        planName,
        companyName,
        isCommercialPlace,
        professionalFee: baseFee,
        gstOnFee,
        labourWelfare,
        gstOnLabour,
        taxesAndCharges: totalTaxes,
        totalAmount,
        tat: 'Application filing in just 4 days',
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to compute Shop & Establishment quote.',
      error: err.message,
    });
  }
});

export default router;
