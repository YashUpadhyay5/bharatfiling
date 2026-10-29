import { GST_RATE } from '../../data/serviceCatalog.js';

// Mirrors backend/src/routes/registrations/itr-services/quote.js, which decides the amount charged.
export function computeQuote(consultationFee) {
  const gst = Math.round(consultationFee * GST_RATE);
  return { consultationFee, gst, totalAmount: consultationFee + gst };
}
