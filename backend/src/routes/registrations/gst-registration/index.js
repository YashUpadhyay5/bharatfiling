import express from 'express';
import applicantRouter from './1-applicant.routes.js';
import jurisdictionRouter from './2-jurisdiction.routes.js';
import checkoutRouter from './3-checkout.routes.js';
import paymentRouter from './4-payment.routes.js';

const router = express.Router();

// One router per screen of the 4-screen GST Registration flow:
// 1. Applicant & Identification  2. Jurisdiction & Package  3. Checkout  4. Payment
router.use(applicantRouter);
router.use(jurisdictionRouter);
router.use(checkoutRouter);
router.use(paymentRouter);

export default router;
