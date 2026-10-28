import express from 'express';
import trademarkRegistrationRoutes from './trademark-registration/index.js';

const router = express.Router();

// Mount trademark registration
router.use('/registration', trademarkRegistrationRoutes);
router.use('/', trademarkRegistrationRoutes);

export default router;
