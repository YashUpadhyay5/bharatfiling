/**
 * GST Registration pricing tiers (Standard / Premium / Elite).
 * Mirrors frontend/src/pages/gst-registration/constants.js (GST_PLANS) — keep both in sync.
 */
export const GST_PLANS = {
  standard: {
    id: 'standard',
    name: 'Standard',
    serviceName: 'GST Registration — Standard (48 Hour Filing)',
    amount: 399,
    subtotal: 338,
    gstAmount: 61,
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    serviceName: 'GST Registration — Premium (24 Hour Priority Filing)',
    amount: 1999,
    subtotal: 1694,
    gstAmount: 305,
  },
  elite: {
    id: 'elite',
    name: 'Elite',
    serviceName: 'GST Registration — Elite (+ 12 Months GST Return Filing)',
    amount: 4999,
    subtotal: 4236,
    gstAmount: 763,
  },
};

export const DEFAULT_GST_PLAN = 'standard';

export function resolveGstPlan(planId) {
  return GST_PLANS[String(planId || '').toLowerCase()] || GST_PLANS[DEFAULT_GST_PLAN];
}
