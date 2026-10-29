import express from 'express';
import trademarkRegistrationRoutes from './trademark-registration/index.js';
import trademarkObjectionRoutes from './trademark-objection/index.js';

const router = express.Router();

// Mount trademark objection routes
router.use('/objection', trademarkObjectionRoutes);
router.use('/trademark-objection', trademarkObjectionRoutes);

// Mount trademark registration routes
router.use('/registration', trademarkRegistrationRoutes);
router.use('/', trademarkRegistrationRoutes);

export default router;
