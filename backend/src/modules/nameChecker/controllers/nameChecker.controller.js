/**
 * BharatFiling - Firm / Business Name Availability Checker Controller
 */

import { validateNameCheckRequest } from '../validators/nameChecker.validator.js';
import { runComprehensiveNameCheck } from '../services/nameSearch.service.js';
import { searchMcaAutocomplete } from '../providers/mca.provider.js';

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

export async function autocompleteFirmName(req, res) {
  try {
    const q = req.query.q || req.query.query || '';
    if (!q || typeof q !== 'string' || q.trim().length < 2) {
      return res.status(200).json({ success: true, data: [] });
    }

    const limit = Math.min(20, Math.max(1, parseInt(req.query.limit, 10) || 8));
    const results = await searchMcaAutocomplete(q.trim(), limit);

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('[FirmNameChecker] Autocomplete Error:', error);
    return res.status(200).json({ success: true, data: [] });
  }
}
