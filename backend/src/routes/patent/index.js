import express from 'express';
import quoteRoutes from './quote.routes.js';
import checkoutRoutes from './checkout.routes.js';
import paymentRoutes from './payment.routes.js';

const router = express.Router();

// Mount root routes
router.use('/', quoteRoutes);
router.use('/', checkoutRoutes);
router.use('/', paymentRoutes);

// Mount provisional patent aliases
router.use('/provisional', quoteRoutes);
router.use('/provisional', checkoutRoutes);
router.use('/provisional', paymentRoutes);
router.use('/provisional-patent', quoteRoutes);
router.use('/provisional-patent', checkoutRoutes);
router.use('/provisional-patent', paymentRoutes);

export default router;
