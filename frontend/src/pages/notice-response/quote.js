import { GST_RATE } from '../../data/serviceCatalog.js';

// The up-front fee for a call with a tax expert at the booked time, before GST. Must match
// backend/src/routes/registrations/notice-response/service.js (enforced by tests/noticeResponseE2E.test.js).
export const NOTICE_CONSULTATION_FEE = 499;

// Mirrors backend/src/routes/registrations/notice-response/quote.js, which decides the amount charged.
export function computeQuote(consultationFee = NOTICE_CONSULTATION_FEE) {
  const gst = Math.round(consultationFee * GST_RATE);
  return { consultationFee, gst, totalAmount: consultationFee + gst };
}
