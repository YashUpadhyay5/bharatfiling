export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export const BUSINESS_NATURES = [
  'Retail Trade',
  'Wholesale / Distribution',
  'E-Commerce Seller (Amazon, Flipkart, Meesho)',
  'Software & Information Technology',
  'Manufacturing',
  'Professional Services / Freelancer',
  'Works Contract / Construction',
  'Hospitality & Restaurants',
  'Logistics & Transport',
  'Healthcare / Clinic',
  'Export / Import (IEC)',
  'Other Commercial Services',
];

export const PROPERTY_TYPES = [
  'Family Owned Property',
  'Owned Property',
  'Rented / Leased Property',
  'Shared Office Space',
  'Virtual / Co-working Office',
];

export const GST_APPLY_REASONS = [
  'To Start a New Business',
  'Selling on Amazon, Flipkart, Etc.',
  'Freelancing',
  'Already Running a Business, Need Compliance',
  'Just Exploring, Not Sure Yet!',
];

/**
 * GST Registration pricing tiers (Standard / Premium / Elite).
 * Mirrors backend/src/config/gstPlans.js — keep both in sync.
 */
export const GST_PLANS = [
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'Best for businesses that want GST form filing in 48 hours.',
    originalPrice: 999,
    discountPercent: 60,
    price: 399,
    recommended: false,
    features: [
      'GST form filing in 48 hours',
      'GST registration support',
      'ARN tracking & status updates',
      'GST Registration Certificate',
      'Money-back guarantee',
      'Chat support',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Best for businesses that need fast-track, error-free GST form filing in 24 hours.',
    originalPrice: 3999,
    discountPercent: 50,
    price: 1999,
    recommended: true,
    features: [
      'GST form filing in 24 hours',
      'Priority ARN generation',
      'Registration under Rule 14A',
      'Error-free documentation',
      'GSTIN issuance support',
      'GST Registration Certificate',
      'MSME Registration',
      'GST compliance checklist',
      'Dedicated GST expert',
      '1-minute query resolution',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'GST registration plus 12 months of GST return filing.',
    originalPrice: 7999,
    discountPercent: 35,
    price: 4999,
    recommended: false,
    features: [
      'Expert-assisted GST registration',
      'GST Registration Certificate',
      'MSME Registration',
      'GST filing for 12 months (up to 300 transactions, ₹20 lakh turnover in the 1st year)',
      'Free GST Kithab software (1 year)',
      'Quarterly GST health check',
      'Dedicated compliance manager',
      'Chat support',
    ],
  },
];

export function getGstPlan(planId) {
  return GST_PLANS.find((p) => p.id === planId) || GST_PLANS[0];
}
