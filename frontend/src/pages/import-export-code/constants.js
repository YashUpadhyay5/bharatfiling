export const IEC_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Essential DGFT IEC code for new exporters',
    originalPrice: 2499,
    discountLabel: '40% off',
    discountPercent: 40,
    price: 1499,
    gstRate: 0.18,
    tat: '2-3 Days',
    features: [
      '10-Digit IEC Code from DGFT',
      'Document cross-verification by Export Specialist',
      'DGFT Portal profile creation & registration',
      'Digital e-IEC Certificate issuance',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    recommended: true,
    subtitle: 'Most popular for expanding import/export businesses',
    originalPrice: 4999,
    discountLabel: '40% off',
    discountPercent: 40,
    price: 2999,
    gstRate: 0.18,
    tat: '24-48 Hours',
    hasEmi: true,
    features: [
      '10-Digit IEC Code from DGFT',
      'Document cross-verification by Export Specialist',
      'DGFT Portal profile creation & registration',
      'Digital Signature Certificate (DSC) support',
      'Bank AD Code (Authorized Dealer) linking assistance',
      'Export Promotion Council (RCMC) guidance',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Fastrack',
    subtitle: 'All-inclusive priority export compliance bundle',
    originalPrice: 8999,
    discountLabel: '45% off',
    discountPercent: 45,
    price: 4999,
    gstRate: 0.18,
    tat: 'Express 24 Hours',
    hasEmi: true,
    features: [
      'Priority 24-Hour Express Filing',
      'Dedicated Senior International Trade CA/CS',
      'DGFT Portal setup & Class-3 DSC assistance',
      'Bank AD Code registration & Port ICEGATE clearance guide',
      'Complete RCMC Application assistance',
      '1-Year Free Annual IEC Update on DGFT portal',
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
      'Excellent service and support. The team was prompt, professional, and helped us register our import entity smoothly within 2 days.',
    name: 'Rachna Pathania',
    role: 'Founder & CEO, SchnellTek Software Pvt. Ltd.',
    location: 'Gurugram',
  },
  {
    id: 3,
    quote:
      'A supportive and efficient team to work with. Always prompt, clear, and respectful in communication. Seamless DGFT filing experience.',
    name: 'Siddharth Rao',
    role: 'Director, InnovEdge Technologies',
    location: 'Mumbai',
  },
];

export const ENTITY_TYPES = [
  'Sole Proprietorship',
  'Partnership Firm',
  'Limited Liability Partnership (LLP)',
  'Private Limited Company',
  'Public Limited Company',
  'Hindu Undivided Family (HUF)',
  'Society / Trust / NGO',
];

export const EXPORT_ACTIVITIES = [
  'Merchant Exporter (Trading of physical goods)',
  'Manufacturer Exporter (Manufacturing & exporting)',
  'Service Exporter (IT, Consulting, Design, Freelance)',
  'Merchant-cum-Manufacturer Exporter',
  'Importer of Goods & Raw Materials',
];

export const ANNUAL_TURNOVER_OPTIONS = [
  'Less than 10 lakhs',
  '10 lakhs - 1 crore',
  '1 crore - 5 crore',
  '5 crore - 25 crore',
  'Above 25 crore',
];

export const IEC_DOCUMENTS = {
  proprietorship: [
    'Individual PAN Card of the Proprietor',
    'Aadhaar Card / Voter ID / Passport',
    'Cancelled cheque or Bank Certificate showing business account details',
    'Proof of business address (Electricity bill, Rent agreement, or Property tax receipt)',
  ],
  partnership: [
    'Partnership Firm PAN Card',
    'Registered Partnership Deed',
    'PAN and Aadhaar of all managing partners',
    'Cancelled cheque of the firm’s bank account',
    'Address proof of the registered office',
  ],
  llp_company: [
    'Company / LLP PAN Card',
    'Certificate of Incorporation (COI)',
    'MOA & AOA / LLP Agreement',
    'Board Resolution authorizing director/partner to apply for IEC',
    'PAN and ID proof of all Directors / Designated Partners',
    'Bank account statement / cancelled cheque in entity name',
    'Address proof of registered office (Utility bill / Rent Deed + NOC)',
  ],
  trust_society: [
    'Trust / Society PAN Card',
    'Registration Certificate / Trust Deed',
    'List of Trustees / Governing Body Members with PAN and ID proofs',
    'Bank account details and authorization resolution',
    'Registered office premises proof',
  ],
};

export const IEC_FAQS = [
  {
    question: 'How Long Does IEC Registration Take?',
    answer:
      'IEC registration typically takes 2 to 5 working days after submitting the application on the DGFT portal, provided all submitted documents match your official PAN and bank credentials accurately.',
  },
  {
    question: 'What Are the Costs Involved in IEC Registration?',
    answer:
      'The government statutory application fee for IEC registration on the DGFT portal is nominal (INR 500). Professional services charges cover document validation, DGFT portal registration, DSC mapping, and end-to-end procedural support.',
  },
  {
    question: 'Can I Use a Single IEC for Multiple Businesses?',
    answer:
      'No. An IEC is issued based on the unique PAN of the legal entity. Each separate business entity with a distinct PAN requires its own IEC. However, a single IEC is valid for all branches, divisions, factories, and port locations belonging to the same legal entity.',
  },
  {
    question: 'Is IEC Mandatory for Service Exporters?',
    answer:
      'An IEC is not mandatory for service exporters unless they are availing export incentives or subsidies under the Foreign Trade Policy (like SEIS) or require official AD Code bank clearance for specialized cross-border financial transactions.',
  },
  {
    question: 'How to Check the Status of My IEC Application?',
    answer:
      'You can verify the real-time status of your IEC application directly on the official DGFT portal using your application reference number. Our expert desk also provides automated status updates via SMS and WhatsApp.',
  },
  {
    question: 'Does the IEC Code Expire or Require Annual Renewal?',
    answer:
      'An IEC has lifetime validity once issued and does not expire. However, according to recent DGFT foreign trade regulations, all IEC holders must electronically validate and confirm their IEC details once every year between April and June.',
  },
];

export const getIecPlan = (planId) => {
  return IEC_PLANS.find((p) => p.id === planId) || IEC_PLANS[1];
};
