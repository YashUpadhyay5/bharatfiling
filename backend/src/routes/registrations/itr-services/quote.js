export const GST_RATE = 0.18;

// The consultation fee is the only chargeable item; GST is added on top.
export function computeQuote(consultationFee) {
  const gst = Math.round(consultationFee * GST_RATE);
  return { consultationFee, gst, totalAmount: consultationFee + gst };
}
