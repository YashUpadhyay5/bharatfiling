import express from 'express';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';
import { createPayHandler, readLead, saveDraftOrder } from '../shared/checkout.js';
import { FILING_FOR, RETURN_PERIODS, TDS_COUPON, TDS_SERVICE, financialYears } from './service.js';
import { computeQuote, isCouponLive } from './quote.js';

const router = express.Router();

const fail = (res, status, message) => res.status(status).json({ success: false, message });

router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const body = req.body || {};
    const { lead, error } = readLead(body);
    if (error) return fail(res, 400, error);
    if (!RETURN_PERIODS.includes(body.returnPeriod)) return fail(res, 400, 'Please choose your TDS return period.');
    const year = financialYears().find((y) => y.value === body.financialYear);
    if (!year) return fail(res, 400, 'Please choose a valid financial year.');
    if (!FILING_FOR.includes(body.filingFor)) return fail(res, 400, 'Please tell us who the TDS filing is for.');

    // The offer is applied only while it is live. The customer's screen is told the real total in the response.
    const couponApplied = String(body.couponCode || '').trim().toUpperCase() === TDS_COUPON.code && isCouponLive();
    const includeLabourWelfare = body.includeLabourWelfare !== false;
    const quote = computeQuote({ couponApplied, includeLabourWelfare });

    const { application, order } = saveDraftOrder({
      slug: TDS_SERVICE.slug,
      moduleType: TDS_SERVICE.moduleType,
      serviceName: `${TDS_SERVICE.name} (FY ${year.value}, ${body.returnPeriod.toUpperCase()})`,
      userId: req.user?.id || GUEST_USER_ID,
      quote,
      lead,
      answers: {
        returnPeriod: body.returnPeriod,
        financialYear: year.value,
        filingFor: body.filingFor,
      },
    });

    return res.status(201).json({ success: true, order, applicationNumber: application.application_number, quote });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Could not create your order.', error: err.message });
  }
});

router.post(
  '/checkout/:orderId/pay',
  optionalAuth,
  createPayHandler({
    moduleType: TDS_SERVICE.moduleType,
    expertLabel: 'TDS',
    paymentMethods: ['UPI', 'CARD', 'NETBANKING'],
    serviceIdOf: () => TDS_SERVICE.slug,
  })
);

export default router;
