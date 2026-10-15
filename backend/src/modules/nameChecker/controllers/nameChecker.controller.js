/**
 * BharatFiling - Firm / Business Name Availability Checker Controller
 */

import { validateNameCheckRequest } from '../validators/nameChecker.validator.js';
import { runComprehensiveNameCheck } from '../services/nameSearch.service.js';

export async function checkFirmNameAvailability(req, res) {
  try {
    const validation = validateNameCheckRequest(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: validation.errors.join(' '),
          details: validation.errors,
        },
      });
    }

    const searchResult = await runComprehensiveNameCheck(validation.sanitized);

    return res.status(200).json({
      success: true,
      data: searchResult,
    });
  } catch (error) {
    console.error('[FirmNameChecker] Internal Controller Error:', error);
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred while processing the name availability check.',
      },
    });
  }
}
