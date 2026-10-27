import { GST_RATE } from '../../data/serviceCatalog.js';

export const LABOUR_WELFARE_FEE = 50;

// Mirrors backend/src/routes/registrations/gst-services/quote.js, which decides the amount charged.
export function computeQuote(professionalFee, includeLabourWelfare) {
  const gstOnFee = Math.round(professionalFee * GST_RATE);
  const labourWelfare = includeLabourWelfare ? LABOUR_WELFARE_FEE : 0;
  const gstOnLabour = Math.round(labourWelfare * GST_RATE);
  const taxesAndCharges = gstOnFee + labourWelfare + gstOnLabour;
  return {
    professionalFee,
    gstOnFee,
    labourWelfare,
    gstOnLabour,
    taxesAndCharges,
    totalAmount: professionalFee + taxesAndCharges,
  };
}
