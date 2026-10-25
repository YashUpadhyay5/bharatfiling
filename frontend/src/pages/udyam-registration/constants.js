export const UDYAM_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Ideal for starting MSME registration',
    originalPrice: 999,
    discountLabel: '₹300 off',
    discountPercent: 30,
    price: 699,
    gstRate: 0.18,
    tat: '48 Hours',
    features: [
      'Expert assistance in every steps',
      'MSME Udyam',
      'GST Registration',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    recommended: true,
    subtitle: 'Perfect for MSME Udyam + GSTR filing',
    originalPrice: 3339,
    discountLabel: '25% off',
    discountPercent: 25,
    price: 2499,
    gstRate: 0.18,
    tat: '24 Hours',
    hasEmi: true,
    features: [
      'Expert assistance in every steps',
      'MSME Udyam',
      'GST Registration',
      'GSTR-1 & 3B for 12 months (Upto 300 transactions)',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'Complete solution for MSME Registration',
    originalPrice: 7999,
    discountLabel: '50% off',
    discountPercent: 50,
    price: 3999,
    gstRate: 0.18,
    tat: 'Priority',
    hasEmi: true,
    features: [
      'Dedicated Account Manager',
      'MSME Udyam Registration',
      'GST Registration',
      'GSTR-1 & 3B for 12 months (Upto 300 transactions)',
      'Accounting Software (1-year License)',
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

export const ANNUAL_TURNOVER_OPTIONS = [
  'Less than 10 lakhs',
  '10 lakhs - 1 crore',
  '1 crore - 5 crore',
  '5 crore - 50 crore',
  'Above 50 crore',
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
    UDYAM_PLANS[1] || // Standard as default
    UDYAM_PLANS[0]
  );
}
