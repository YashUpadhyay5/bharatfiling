import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import crypto from 'crypto';
import { authenticate, optionalAuth } from '../../../middleware/auth.js';
import { canAccessApplication, GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * GET /applications
 * Retrieves active paid PT applications for the authenticated customer.
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
        (a) => a.module_type === 'PT' || a.service_id === 'professional-tax' || a.service_id === 'pt-registration'
      ),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve Professional Tax applications.',
      error: err.message,
    });
  }
});

/**
 * GET /applications/:id
 * Retrieves a single PT application.
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
        .json({ success: false, message: 'Professional Tax application not found.' });
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
 * Calculates real-time Professional Tax quotation based on state, entity type and employee size.
 */
router.post('/quote', (req, res) => {
  try {
    const {
      plan = 'elite',
      operatingState = 'Maharashtra',
      entityType = 'Pvt. Ltd',
      employeeCount = '10 - 20',
      includeLabourWelfare = true,
    } = req.body;

    const isStarter = String(plan).toLowerCase() === 'starter';
    const planPrice = isStarter ? 2999 : 5999;
    const baseFee = isStarter ? 2541 : 5083;
    const gstOnFee = isStarter ? 458 : 916;

    const labourWelfare = includeLabourWelfare ? (isStarter ? 200 : 305) : 0;
    const gstOnLabour = includeLabourWelfare ? (isStarter ? 36 : 55) : 0;

    const totalTaxes = gstOnFee + labourWelfare + gstOnLabour;
    const totalAmount = baseFee + totalTaxes;

    return res.json({
      success: true,
      quote: {
        plan: isStarter ? 'starter' : 'elite',
        planName: isStarter ? 'Starter' : 'Elite',
        operatingState,
        entityType,
        employeeCount,
        baseFee,
        gstOnFee,
        labourWelfare,
        gstOnLabour,
        taxesAndCharges: totalTaxes,
        totalAmount,
        tat: isStarter ? '48 Hours Filing' : 'Priority 48 Hours Filing',
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to compute Professional Tax quote.',
      error: err.message,
    });
  }
});

export default router;
