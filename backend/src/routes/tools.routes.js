/**
 * BharatFiling - Financial & Compliance Tools Routes
 * Mounts on /api/v1/tools
 */

import { Router } from 'express';
import { calculateHra } from '../controllers/hra.controller.js';
import { calculateIncomeTax } from '../controllers/incomeTax.controller.js';
import { checkFirmNameAvailability, autocompleteFirmName } from '../modules/nameChecker/controllers/nameChecker.controller.js';

const router = Router();

// POST /api/v1/tools/hra/calculate
router.post('/hra/calculate', calculateHra);

// POST /api/v1/tools/income-tax/calculate
router.post('/income-tax/calculate', calculateIncomeTax);

// POST /api/v1/tools/firm-name/check
router.post('/firm-name/check', checkFirmNameAvailability);

// GET /api/v1/tools/firm-name/autocomplete
router.get('/firm-name/autocomplete', autocompleteFirmName);

export default router;
