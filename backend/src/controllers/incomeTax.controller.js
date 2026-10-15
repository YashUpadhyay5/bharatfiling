/**
 * BharatFiling - Income Tax Controller
 * Handles POST /api/v1/tools/income-tax/calculate
 */

import { calculateIncomeTaxComparison } from '../modules/incomeTax/incomeTaxCalculator.service.js';
import { validateIncomeTaxPayload } from '../validators/incomeTax.validator.js';

export async function calculateIncomeTax(req, res) {
  try {
    const validation = validateIncomeTaxPayload(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Income Tax calculation parameters.',
        errors: validation.errors,
      });
    }

    const comparisonResult = calculateIncomeTaxComparison(req.body);

    return res.status(200).json({
      success: true,
      message: 'Income Tax calculation computed successfully.',
      data: comparisonResult,
    });
  } catch (error) {
    console.error('Income Tax Controller Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process Income Tax computation.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}

export default {
  calculateIncomeTax,
};
