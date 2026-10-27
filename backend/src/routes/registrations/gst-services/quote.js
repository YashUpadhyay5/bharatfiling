export const GST_RATE = 0.18;
export const LABOUR_WELFARE_FEE = 50;

export function computeQuote(professionalFee, includeLabourWelfare = true) {
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
