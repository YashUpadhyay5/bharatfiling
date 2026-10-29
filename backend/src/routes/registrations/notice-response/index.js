import express from 'express';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';
import { createPayHandler, readLanguage, readLead, saveDraftOrder } from '../shared/checkout.js';
import { NOTICE_SERVICE } from './service.js';
import { computeQuote } from './quote.js';
import { clock, formatSlotDate, formatSlotTime, isSlotAvailable } from './slots.js';

const router = express.Router();

const fail = (res, status, message) => res.status(status).json({ success: false, message });

router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const body = req.body || {};
    const { lead, error } = readLead(body);
    if (error) return fail(res, 400, error);
    const { language, error: languageError } = readLanguage(body);
    if (languageError) return fail(res, 400, languageError);
    if (!isSlotAvailable(body.slotDate, body.slotTime, clock.now())) {
      return fail(res, 400, 'Please choose an available date and time.');
    }

    const quote = computeQuote();
    const { application, order } = saveDraftOrder({
      slug: NOTICE_SERVICE.slug,
      moduleType: NOTICE_SERVICE.moduleType,
      serviceName: `${NOTICE_SERVICE.name} consultation (${formatSlotDate(body.slotDate)}, ${formatSlotTime(body.slotTime)})`,
      userId: req.user?.id || GUEST_USER_ID,
      quote,
      lead,
      answers: { language, slotDate: body.slotDate, slotTime: body.slotTime },
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
    moduleType: NOTICE_SERVICE.moduleType,
    expertLabel: 'tax notice',
    paymentMethods: ['UPI', 'CARD', 'NETBANKING'],
    serviceIdOf: () => NOTICE_SERVICE.slug,
    // A draft left open past its booked time must not turn into a booking in the past.
    validateOrder: (order, application) => {
      const { slotDate, slotTime } = application?.fields_data || {};
      return isSlotAvailable(slotDate, slotTime, clock.now())
        ? null
        : 'This time slot is no longer available. Please choose another date or time.';
    },
  })
);

export default router;
