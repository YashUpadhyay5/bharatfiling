import express from 'express';
import quoteRouter from './quote.routes.js';
import checkoutRouter from './checkout.routes.js';
import paymentRouter from './payment.routes.js';

const router = express.Router();

// Mount all modular sub-routers for 3-Screen GST Registration
router.use(quoteRouter);
router.use(checkoutRouter);
router.use(paymentRouter);

export default router;
