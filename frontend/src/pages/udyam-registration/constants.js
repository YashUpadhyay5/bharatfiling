export const UDYAM_PLANS = [
  {
    id: 'standard',
    name: 'Standard',
    badge: 'Basic Filing',
    tagline: 'Best for new micro entrepreneurs seeking simple government registration.',
    originalPrice: 999,
    discountPercent: 50,
    price: 499,
    gstRate: 0.18,
    tat: '48 Hours',
    features: [
      'Statutory Udyam Application Preparation',
      'NIC 5-Digit Code Classification Assistance',
      'CA Review & PAN / Aadhaar Cross-Verification',
      'Official URN (Udyam Registration Number) Generation',
      'Digital Udyam Certificate with Dynamic QR Code',
      'Email Delivery & Lifetime Cloud Storage',
    ],
  },
  {
    id: 'fast-track',
    name: 'Fast-Track Priority',
    badge: 'Most Popular',
    popular: true,
    tagline: 'Dedicated CA filing desk with 24-hour turnaround & banking kit.',
    originalPrice: 2999,
    discountPercent: 50,
    price: 1499,
    gstRate: 0.18,
    tat: '24 Hours',
    features: [
      'Everything in Standard Plan',
      'Priority 24-Hour Fast-Track Processing Desk',
      'Dedicated Chartered Accountant Phone & WhatsApp Support',
      'MSME Bank Loan Eligibility Kit (MUDRA / CGTMSE)',
      'Government Tender Exemption & Subsidy Guidance',
      'Official Form Download with Verified Digital Signature',
      'Zero-Penalty Error Rectification Guarantee',
    ],
  },
  {
    id: 'elite',
    name: 'Elite Enterprise',
    badge: 'Complete Growth',
    tagline: 'All-inclusive 1-year MSME compliance, credit advisory & IP subsidy desk.',
    originalPrice: 5999,
    discountPercent: 42,
    price: 3499,
    gstRate: 0.18,
    tat: 'Same Day Filing',
    features: [
      'Everything in Fast-Track Priority',
      '1-Year Dedicated MSME Compliance & Annual Return Filing',
      '50% Government Trademark / Patent Subsidy Assistance',
      'Collateral-Free Loan Scheme & Banker Liaison Report',
      'MSMED Act Delayed Payment Legal Notice Support',
      'Customized ISO 9001 / 27001 Readiness Consultation',
      'Direct WhatsApp Line to Senior Regulatory Lawyer',
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'Professional, reliable, and genuinely dedicated. They made every step feel simple and assured. I’m happy with the entire journey.',
    name: 'Priya Mehra',
    role: 'Founder, EcoWellness Ventures',
    location: 'Bengaluru',
  },
  {
    id: 2,
    quote:
      'Got our official Udyam certificate within 24 hours without any tedious portal glitches. The CA team mapped our NIC codes perfectly.',
    name: 'Rajesh Sharma',
    role: 'Managing Director, Apex AgroTech',
    location: 'Indore',
  },
  {
    id: 3,
    quote:
      'Quickest government filing experience ever. Transparent pricing, zero hidden charges, and direct WhatsApp updates throughout.',
    name: 'Anita Deshmukh',
    role: 'Proprietor, Crafted Living Studios',
    location: 'Pune',
  },
];

export const ORGANIZATION_TYPES = [
  'Sole Proprietorship',
  'Pvt. Ltd',
  'LLP',
  'Person Company',
  'Partnership Firm',
  'Public Limited Company',
  'Hindu Undivided Family (HUF)',
  'Society / Trust / Club',
];

export const MAJOR_ACTIVITIES = ['Services', 'Manufacturing', 'Trading'];

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

export function getUdyamPlan(planId) {
  const normalized = String(planId || 'standard').toLowerCase();
  return (
    UDYAM_PLANS.find((p) => p.id === normalized) ||
    UDYAM_PLANS[0]
  );
}
