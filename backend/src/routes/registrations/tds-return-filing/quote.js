import { LABOUR_WELFARE_FEE, TDS_CONSULTATION_FEE, TDS_COUPON } from './service.js';

export const GST_RATE = 0.18;

// The time the offer is judged against. Tests replace it to check the offer on both sides of its end.
export const clock = { now: () => new Date() };

export const isCouponLive = (now = clock.now()) => now.getTime() <= new Date(TDS_COUPON.expiresAt).getTime();

// The consultation fee already includes GST. The labour welfare add-on is optional and carries its own GST.
export function computeQuote({ couponApplied, includeLabourWelfare }) {
  const consultationFee = TDS_CONSULTATION_FEE;
  const couponDiscount = couponApplied ? TDS_COUPON.discount : 0;
  const subTotal = consultationFee - couponDiscount;
  const labourWelfare = includeLabourWelfare ? LABOUR_WELFARE_FEE : 0;
  const gstOnLabour = Math.round(labourWelfare * GST_RATE);
  const taxesAndCharges = labourWelfare + gstOnLabour;
  return {
    consultationFee,
    couponCode: couponApplied ? TDS_COUPON.code : null,
    couponDiscount,
    subTotal,
    labourWelfare,
    gstOnLabour,
    taxesAndCharges,
    totalAmount: subTotal + taxesAndCharges,
  };
}
