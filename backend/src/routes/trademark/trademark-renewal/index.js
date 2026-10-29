import express from 'express';
import quoteRoutes from './quote.routes.js';
import checkoutRoutes from './checkout.routes.js';
import paymentRoutes from './payment.routes.js';

const router = express.Router();

router.use(quoteRoutes);
router.use(checkoutRoutes);
router.use(paymentRoutes);

export default router;
