/**
 * BharatFiling - HRA Controller
 * Handles POST /api/v1/tools/hra/calculate
 */

import { computeHraExemption } from '../services/hraCalculator.service.js';
import { validateHraPayload } from '../validators/hra.validator.js';

export async function calculateHra(req, res) {
  try {
    const validation = validateHraPayload(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid HRA calculation parameters.',
        errors: validation.errors,
      });
    }

    const result = computeHraExemption(req.body);

    return res.status(200).json({
      success: true,
      message: 'HRA calculation computed successfully.',
      data: result,
    });
  } catch (error) {
    console.error('HRA Calculator Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process HRA exemption computation.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
