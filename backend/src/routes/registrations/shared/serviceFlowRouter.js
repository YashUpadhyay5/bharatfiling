import express from 'express';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';
import { computeQuote } from '../itr-services/quote.js';
import { readAnswers } from '../itr-services/service.js';
import { createPayHandler, readLanguage, readLead, saveDraftOrder } from './checkout.js';

const fail = (res, status, message) => res.status(status).json({ success: false, message });

const NEEDS_REVIEW = 'This case needs a review by our team before it can be filed. Please contact us and we will guide you.';

/**
 * Draft and pay routes of a config-driven service flow (landing page, questionnaire, payment).
 *
 *  moduleType  - ITR, MCA ...: prefix of the application and order numbers, and the CA desk case type
 *  expertLabel - names the expert desk in the customer notification
 *  getService  - (slug) => { slug, name, fee, fields, feeOf?, unitsOf? }, or null for an unknown slug.
 *                A field can list `blocked` answers: those cases are reviewed by the team, never charged.
 */
export function createServiceFlowRouter({ moduleType, expertLabel, getService }) {
  const router = express.Router();

  const resolveService = (req, res, next) => {
    const service = getService(req.params.service);
    if (!service) return fail(res, 404, 'Service not found.');
    req.flowService = service;
    next();
  };

  router.post('/:service/checkout/draft', resolveService, optionalAuth, (req, res) => {
    try {
      const service = req.flowService;
      const body = req.body || {};
      const { lead, error } = readLead(body);
      if (error) return fail(res, 400, error);
      const { answers, error: answerError } = readAnswers(service.fields, body);
      if (answerError) return fail(res, 400, answerError);
      if (Object.entries(service.fields).some(([key, spec]) => spec.blocked?.includes(answers[key]))) {
        return fail(res, 422, NEEDS_REVIEW);
      }
      // Only some landing pages ask for it; the CA desk uses it to pick the language of the call.
      const { language, error: languageError } = readLanguage(body);
      if (languageError) return fail(res, 400, languageError);

      // The fee can depend on an answer, and services priced per unit (Form 16: per batch of employees) multiply it.
      const fee = service.feeOf ? service.feeOf(answers) : service.fee;
      const units = service.unitsOf ? service.unitsOf(answers) : 1;
      const quote = computeQuote(fee * units);
      const { application, order } = saveDraftOrder({
        slug: service.slug,
        moduleType,
        serviceName: answers.financialYear ? `${service.name} (FY ${answers.financialYear})` : service.name,
        userId: req.user?.id || GUEST_USER_ID,
        quote,
        lead,
        answers: { language, ...answers, ...(service.unitsOf ? { units } : {}) },
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
      moduleType,
      expertLabel,
      paymentMethods: ['UPI', 'CARD', 'NETBANKING', 'EMI'],
      serviceIdOf: (req) => req.flowService.slug,
    })
  );

  return router;
}
