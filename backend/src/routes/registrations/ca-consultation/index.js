import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /lead
 * Captures online CA consultation inquiry from landing page.
 */
router.post('/lead', optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      language = 'English',
      problemType = 'Business Structure Consultation',
      whatsappUpdates = true,
      name = 'Client',
    } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and phone number are required.',
      });
    }

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'CA' + Math.floor(100000 + Math.random() * 900000);

    const newApplication = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'ca-consultation',
      service_name: 'Online CA Consultation & Advisory',
      module_type: 'CA_CONSULTATION',
      status: 'LEAD_CAPTURED',
      payment_completed: false,
      assigned_officer: 'CA Rajesh Narang (Fellow Chartered Accountant, ICAI)',
      fields_data: {
        applicant_name: name,
        email,
        phone,
        language,
        problem_type: problemType,
        whatsapp_opt_in: whatsappUpdates,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.push(newApplication);
    db.saveApplications(apps);

    res.status(201).json({
      success: true,
      message: 'CA consultation inquiry received. A senior CA will connect with you shortly.',
      leadId: appId,
      applicationNumber: appNumber,
      assignedCA: 'CA Rajesh Narang (Fellow Chartered Accountant, ICAI)',
      problemType,
      language,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to record CA consultation inquiry.',
      error: err.message,
    });
  }
});

/**
 * POST /quote
 * Computes fee for consultation packages.
 */
router.post('/quote', (req, res) => {
  try {
    const { plan = 'starter' } = req.body;
    const norm = String(plan).toLowerCase();

    let fee = 499;
    let original = 799;
    let name = 'Basic CA Consultation (30 Mins)';

    if (norm === 'standard') {
      fee = 999;
      original = 1999;
      name = 'Senior CA Consultation + Document Review (45 Mins)';
    } else if (norm === 'elite' || norm === 'business') {
      fee = 2499;
      original = 4999;
      name = 'Comprehensive Business & Corporate Retainer (60 Mins)';
    }

    const gst = Math.round(fee * 0.18);
    const total = fee + gst;

    res.json({
      success: true,
      plan: norm,
      planName: name,
      baseFee: fee,
      originalFee: original,
      gst,
      totalAmount: total,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to compute CA consultation fee.',
      error: err.message,
    });
  }
});

export default router;
