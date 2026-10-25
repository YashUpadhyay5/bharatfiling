import express from 'express';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';

const router = express.Router();

/**
 * POST /applicant/check-pan
 * Screen 1 (Applicant & Identification): looks up whether this PAN already has an
 * in-progress or paid GST registration, so the applicant isn't filed twice.
 */
router.post('/applicant/check-pan', optionalAuth, (req, res) => {
  try {
    const { pan } = req.body;
    const cleanPan = String(pan || '').toUpperCase().trim();

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(cleanPan)) {
      return res.status(400).json({ success: false, message: 'A valid 10-character PAN is required.' });
    }

    const existing = db
      .getApplications()
      .filter((a) => a.module_type === 'GST' && a.fields_data?.pan_number === cleanPan)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

    if (!existing) {
      return res.json({ success: true, hasExistingApplication: false });
    }

    res.json({
      success: true,
      hasExistingApplication: true,
      status: existing.payment_completed ? 'PAID' : 'DRAFT',
      application_number: existing.application_number,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to check PAN.', error: err.message });
  }
});

export default router;
