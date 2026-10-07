import express from 'express';
import { getFieldDefinitions, getRequirementsForBusinessType } from '../services/fieldEngine.js';

const router = express.Router();

// GET all centralized field definitions
router.get('/definitions', (req, res) => {
  try {
    const definitions = getFieldDefinitions();
    res.json({
      success: true,
      definitions,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch field definitions.', error: err.message });
  }
});

// GET dynamic requirements for business type
router.get('/requirements/:businessType', (req, res) => {
  try {
    const { businessType } = req.params;
    const { state } = req.query;
    const requirements = getRequirementsForBusinessType(decodeURIComponent(businessType), state);

    res.json({
      success: true,
      requirements,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to calculate requirements.', error: err.message });
  }
});

export default router;
