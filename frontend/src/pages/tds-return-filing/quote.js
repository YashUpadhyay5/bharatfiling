import { GST_RATE } from '../../data/serviceCatalog.js';

// Mirrors backend/src/routes/registrations/tds-return-filing/service.js and quote.js, which decide the
// amount charged. Enforced by tests/tdsReturnFilingE2E.test.js.

// What the customer pays up front for a call with an expert, GST included.
export const TDS_CONSULTATION_FEE = 999;

// Optional add-on the customer can remove at checkout. GST is charged on top of it.
export const LABOUR_WELFARE_FEE = 22;

// Festive offer applied automatically while it is live. The offer ends at the end of 10 Nov 2026, IST.
export const TDS_COUPON = { code: 'MAKEININDIA', discount: 500, expiresAt: '2026-11-10T23:59:59+05:30' };

const DAY_MS = 24 * 60 * 60 * 1000;

export const isCouponLive = (now = new Date()) => now.getTime() <= new Date(TDS_COUPON.expiresAt).getTime();

// "expires in 13 days", counted in whole days left (a part of a day counts as a day).
export function couponExpiryLabel(now = new Date()) {
  const days = Math.ceil((new Date(TDS_COUPON.expiresAt).getTime() - now.getTime()) / DAY_MS);
  if (days <= 1) return 'expires today';
  return `expires in ${days} days`;
}

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
