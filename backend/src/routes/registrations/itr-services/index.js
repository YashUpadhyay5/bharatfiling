import express from 'express';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';
import { createPayHandler, readLanguage, readLead, saveDraftOrder } from '../shared/checkout.js';
import {
  ITR_CONSULTATION_FEE,
  ITR_MODULE_TYPE,
  SOURCES_OF_INCOME,
  filingYears,
  getItrService,
} from './service.js';
import { computeQuote } from './quote.js';

const router = express.Router();

const fail = (res, status, message) => res.status(status).json({ success: false, message });

function resolveService(req, res, next) {
  const service = getItrService(req.params.service);
  if (!service) return fail(res, 404, 'Service not found.');
  req.itrService = service;
  next();
}

router.post('/:service/checkout/draft', resolveService, optionalAuth, (req, res) => {
  try {
    const service = req.itrService;
    const body = req.body || {};
    const { lead, error } = readLead(body);
    if (error) return fail(res, 400, error);
    if (!SOURCES_OF_INCOME.includes(body.sourceOfIncome)) {
      return fail(res, 400, 'Please tell us your source of income.');
    }
    const year = filingYears().find((y) => y.value === body.financialYear);
    if (!year) return fail(res, 400, 'Please choose a valid financial year.');
    // Only some landing pages ask for it; the CA desk uses it to pick the language of the call.
    const { language, error: languageError } = readLanguage(body);
    if (languageError) return fail(res, 400, languageError);

    const quote = computeQuote(ITR_CONSULTATION_FEE);
    const { application, order } = saveDraftOrder({
      slug: service.slug,
      moduleType: ITR_MODULE_TYPE,
      serviceName: `${service.name} (FY ${year.value})`,
      userId: req.user?.id || GUEST_USER_ID,
      quote,
      lead,
      answers: {
        language,
        sourceOfIncome: body.sourceOfIncome,
        financialYear: year.value,
        returnType: year.returnType,
      },
    });

    return res.status(201).json({ success: true, order, applicationNumber: application.application_number, quote });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Could not create your order.', error: err.message });
  }
});

router.post(
  '/:service/checkout/:orderId/pay',
  resolveService,
  optionalAuth,
  createPayHandler({
    moduleType: ITR_MODULE_TYPE,
    expertLabel: 'ITR',
    paymentMethods: ['UPI', 'CARD', 'NETBANKING', 'EMI'],
    serviceIdOf: (req) => req.itrService.slug,
  })
);

export default router;
