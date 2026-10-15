/**
 * BharatFiling - Financial & Compliance Tools Routes
 * Mounts on /api/v1/tools
 */

import { Router } from 'express';
import { calculateHra } from '../controllers/hra.controller.js';

const router = Router();

// POST /api/v1/tools/hra/calculate
router.post('/hra/calculate', calculateHra);

export default router;
