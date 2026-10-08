import express from 'express';
import quoteRouter from './quote.routes.js';
import checkoutRouter from './checkout.routes.js';
import paymentRouter from './payment.routes.js';
import dossierRouter from './dossier.routes.js';

const router = express.Router();

// Mount all modular sub-routers for GST Registration
router.use(quoteRouter);
router.use(checkoutRouter);
router.use(paymentRouter);
router.use(dossierRouter);

export default router;
