/**
 * Constants for Shop Act License Renewal & State Compliance Module
 * Covers State-wise Shops & Commercial Establishments Acts across India
 */

export const SHOP_ACT_HERO = {
  hindiNotice: 'Now you can read this page in Hindi. Change language to हिन्दी',
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Shop & Establishment License Renewal Online in India',
  cardTitle: 'Shop Act Renewal',
  bullets: [
    'Quick online renewal of Gumasta / Shop & Establishment Certificate across 28+ states.',
    'Avoid up to 50% state late surcharge fees and municipal sealing inspection notices.',
    'Government certificate delivered directly to your email in 3 to 5 working days.',
  ],
  guideLinkText: 'Complete guide on Shop Act Renewal & Timelines',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'Compliance', href: '/services' },
    { title: 'Shop Act Renewal', href: '/services/shop-act-renewal' },
  ],
  pricingNote: {
    original: 2999,
    current: 1499,
    unit: 'per renewal / state fee at actuals',
  },
};

export const TRUSTED_PARTNERS = [
  { name: 'Maharashtra Aaple Sarkar Integration', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' },
  { name: 'Karnataka e-Karmika Portal Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'Delhi Labour Department Portal', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  { name: 'Telangana Labour Commissioner Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg' },
  { name: 'UP Nivesh Mitra Single Window', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
  { name: 'Tamil Nadu Labour Portal Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Zoho_Corporation_2019_logo.svg' },
];

export const CORE_FEATURES = [
  {
    id: 1,
    title: 'Multi-State Portal Integration',
    desc: 'Seamless renewal filing across Aaple Sarkar (Maharashtra), e-Karmika (Karnataka), Nivesh Mitra (UP), Delhi Labour, and all state single-window portals.',
    icon: 'Globe',
  },
  {
    id: 2,
    title: 'Zero Municipal Late Surcharge',
    desc: 'Pre-expiry tracking and submission within the 30-day statutory renewal window to prevent 25%–50% state penalty surcharges and compounding.',
    icon: 'ShieldCheck',
  },
  {
    id: 3,
    title: 'Headcount & Establishment Amendment',
    desc: 'Update business address proof, additional commercial branches, partner/director changes, and updated employee headcount during renewal.',
    icon: 'Users',
  },
  {
    id: 4,
    title: 'Express 3 to 5 Day Processing',
    desc: 'Priority verification by local municipal liaison counsels ensures your renewed certificate is cleared and delivered in minimal turnaround time.',
    icon: 'Clock',
  },
  {
    id: 5,
    title: 'Digital Vault & Next-Renewal Alert',
    desc: 'Your renewed digital certificate is archived in your BharatFiling vault with automated SMS and WhatsApp reminders 60 days before the next renewal.',
    icon: 'RefreshCw',
  },
  {
    id: 6,
    title: 'Municipal Inspector Representation Desk',
    desc: 'Direct consultation and legal drafting support from senior labor law advocates if you receive a show-cause or non-renewal notice from local inspectors.',
    icon: 'Award',
  },
];

export const STATE_PORTALS_MATRIX = [
  {
    state: 'Maharashtra (Gumasta)',
    validity: 'Lifetime (Intimation) / 1-3 Yrs (Registration)',
    portal: 'Aaple Sarkar / MCGM',
    leadTime: '2-4 Working Days',
    badge: 'High Volume',
  },
  {
    state: 'Karnataka (e-Karmika)',
    validity: '5 Years / Annual',
    portal: 'e-Karmika Labour Portal',
    leadTime: '3-5 Working Days',
    badge: 'Strict Inspection',
  },
  {
    state: 'Delhi NCR',
    validity: 'Annual / Continuous',
    portal: 'Delhi Labour Department',
    leadTime: '2-3 Working Days',
    badge: 'Fast Clearance',
  },
  {
    state: 'Telangana & AP',
    validity: '1 to 3 Years',
    portal: 'Labour Department Portal',
    leadTime: '3-5 Working Days',
    badge: 'Single Window',
  },
  {
    state: 'Uttar Pradesh',
    validity: '1 to 5 Years',
    portal: 'Nivesh Mitra Portal',
    leadTime: '3-6 Working Days',
    badge: 'Single Window',
  },
  {
    state: 'Tamil Nadu & Kerala',
    validity: '1 to 3 Years',
    portal: 'State Labour Portals',
    leadTime: '3-5 Working Days',
    badge: 'Direct Clearance',
  },
];

export const WHO_NEEDS_RENEWAL = [
  {
    type: 'Retail Stores, Showrooms & Boutiques',
    reason: 'Subject to sudden municipal inspection; expired licenses risk store closure orders, inventory confiscation, and court summons.',
    icon: 'Store',
  },
  {
    type: 'Restaurants, Cafes & Cloud Kitchens',
    reason: 'FSSAI health licenses and municipal eating-house permits require an active, unexpired Shop & Establishment certificate.',
    icon: 'Factory',
  },
  {
    type: 'IT Startups & Corporate Offices',
    reason: 'Essential for opening and operating corporate current accounts, vendor empanelment, and proving legal office address proof.',
    icon: 'Laptop',
  },
  {
    type: 'Warehouses & Logistics Hubs',
    reason: 'Continuous local municipal compliance required to avoid transport disruptions and inter-state tax clearance issues.',
    icon: 'Building2',
  },
  {
    type: 'Service Agencies & Freelance Studios',
    reason: 'Maintains legal validity as a commercial establishment and protects against local municipal shop inspection penalties.',
    icon: 'Briefcase',
  },
  {
    type: 'E-Commerce Fulfillment Centers',
    reason: 'Required by marketplace aggregators (Amazon, Flipkart) to maintain active seller and vendor fulfillment accounts.',
    icon: 'ShoppingCart',
  },
];

export const COMPLIANCE_WORKFLOW = [
  {
    step: '01',
    title: 'License & Document Audit',
    desc: 'Upload your expired or expiring Shop Act Certificate along with recent electricity bill, rent agreement, and updated staff list.',
  },
  {
    step: '02',
    title: 'State Act & Surcharge Calculation',
    desc: 'Our compliance team checks your state-specific renewal rules and verifies whether late filing surcharges apply.',
  },
  {
    step: '03',
    title: 'Application Drafting & Upload',
    desc: 'We draft the formal renewal application (Form B / Form C depending on state rules) and upload files to the state labor department portal.',
  },
  {
    step: '04',
    title: 'Government Challan Payment',
    desc: 'We process the statutory municipal fees and obtain the official Application Acknowledgement / Reference Number.',
  },
  {
    step: '05',
    title: 'Municipal Officer Follow-Up',
    desc: 'Our dedicated liaison officers follow up with the Ward Inspector / Labour Officer to resolve any queries and secure clearance.',
  },
  {
    step: '06',
    title: 'Delivery of Renewed Certificate',
    desc: 'Your renewed, watermarked government Shop & Establishment certificate is delivered via email and WhatsApp with auto-renewal tracking.',
  },
];

export const PENALTY_AVOIDANCE = [
  {
    provision: 'Operating with Expired Shop Act License',
    statutoryCost: 'Fines of ₹5,000 to ₹50,000 + Daily default fees',
    impact: 'Municipal inspectors can issue immediate stop-work or sealing notices',
    bharatfilingSolution: 'Renewal processed 30 days prior to expiry with provisional validity',
  },
  {
    provision: 'State Late Renewal Surcharge Fees',
    statutoryCost: '25% to 50% additional penalty on statutory fee',
    impact: 'Accumulates every month past the renewal window across all municipal zones',
    bharatfilingSolution: 'Timely submission avoids all late renewal surcharges completely',
  },
  {
    provision: 'Bank Account Freezing by Current Account Desk',
    statutoryCost: 'Frozen operating cash flows and vendor payout delays',
    impact: 'Banks freeze debit operations if renewed KYC / trade license is missing',
    bharatfilingSolution: 'Immediate issuance of renewal acknowledgement to keep accounts active',
  },
  {
    provision: 'Court Prosecution of Proprietor / Directors',
    statutoryCost: 'Criminal complaint filed by Chief Inspector of Shops',
    impact: 'Requires personal appearance in metropolitan magistrate court for compounding',
    bharatfilingSolution: 'Legal representation by labor advocates to resolve pending notices',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Standard Shop Act Renewal',
    badge: 'Popular for Single Store',
    price: 1499,
    originalPrice: 2999,
    period: 'per renewal',
    volume: '1 Commercial Establishment / Branch',
    description: 'Fast, hassle-free online renewal for retail shops, offices, and small service establishments.',
    features: [
      'Document audit & state portal verification',
      'Drafting of Form B / Form C renewal petition',
      'Filing on state labour portal (Aaple Sarkar, e-Karmika, etc.)',
      'Government fee challan generation & submission',
      'Direct municipal liaison follow-up',
      'Delivery of renewed government certificate (PDF)',
      'Automated renewal tracking for next cycle',
    ],
    cta: 'Choose Standard Renewal',
    popular: true,
  },
  {
    id: 'growth',
    name: 'Renewal + Modification Plan',
    badge: 'Headcount & Address Changes',
    price: 2499,
    originalPrice: 4499,
    period: 'per renewal',
    volume: '1 Branch with Amendments',
    description: 'Ideal if you also need to update your business address, partner names, or increased employee headcount.',
    features: [
      'Everything in Standard Renewal',
      'Establishment address modification filing',
      'Partner / Director addition or deletion',
      'Employee headcount slab amendment',
      'Statutory notice inspection defense advisory',
      'Priority processing within 48 to 72 hours',
      'Dedicated Labor Law Counsel phone support',
    ],
    cta: 'Choose Renewal + Changes',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Multi-Branch & Retail Chain Retainer',
    badge: 'Retail Chains & Franchises',
    price: 4999,
    originalPrice: 9999,
    period: 'per year',
    volume: 'Up to 5 Branches across India',
    description: 'Centralized compliance management for retail brands, restaurant chains, and corporate multi-location offices.',
    features: [
      'Everything in Renewal + Modification',
      'Up to 5 branch renewals across multiple states',
      'Centralized compliance tracker dashboard',
      'Handling of municipal inspection notices for all branches',
      'Display board compliance checklist (local language boards)',
      'Labour welfare fund (LWF) state compliance review',
      'Dedicated Account Manager & 24/7 SLA guarantee',
    ],
    cta: 'Contact for Multi-Branch',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Mahesh B. Kadam',
    company: 'Kadam Electronics & Appliances',
    role: 'Proprietor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    review:
      'Our Mumbai Gumasta license had been expired for 2 months and the ward inspector issued a notice. BharatFiling filed our renewal under the Aaple Sarkar portal within 24 hours, resolved the surcharge, and delivered our new certificate in 3 days. Excellent service!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sunita Rao',
    company: 'Bloom Floral Boutiques',
    role: 'Founder & Owner',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    review:
      'We had to update our store address and renew our e-Karmika certificate in Bengaluru at the same time. The team handled both together seamlessly without requiring any physical visit to the labour office.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Abhay Chawla',
    company: 'Chawla Footwear Emporium',
    role: 'Partner',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    review:
      'Our current account bank was threatening to freeze our credit line due to an expired Shop Act. BharatFiling expedited our renewal and sent us the official acknowledgement on Day 1. Total lifesaver.',
    rating: 5,
  },
];

export const FAQS = [
  {
    question: 'What is Shop Act Renewal and why is it necessary?',
    answer:
      'Every commercial establishment, retail shop, restaurant, and office registered under the State Shops and Commercial Establishments Act must periodically renew its registration before its expiry date. Operating with an expired certificate is illegal and attracts municipal penalties, sealing orders, and bank account freeze.',
  },
  {
    question: 'How often does a Shop Act License need to be renewed?',
    answer:
      'Renewal frequency depends on state legislation. In states like Karnataka and Telangana, licenses are typically valid for 1 to 5 years. In Maharashtra, establishments with 10+ employees receive certificates with 1 to 3 years validity, while smaller units under the 2017 amendment receive lifetime intimation receipts.',
  },
  {
    question: 'When should we apply for Shop Act Renewal?',
    answer:
      'You should ideally apply at least 30 to 45 days before the expiry date printed on your existing certificate to prevent late renewal penalty surcharges levied by municipal labor departments.',
  },
  {
    question: 'What documents are required for Shop Act Renewal?',
    answer:
      'We require: 1) Copy of existing Shop Act Certificate, 2) Recent electricity bill or water bill for address proof, 3) Rent agreement (if rented) or property tax receipt (if owned), 4) Current list of employees, and 5) Photo of shop/office front showing signboard in the local language.',
  },
  {
    question: 'What is the government fee for Shop Act Renewal?',
    answer:
      'Government fees vary by state and employee headcount: ranging from ₹150 for zero-employee establishments up to ₹5,000+ for large corporate offices. Government fees are paid at actuals with official treasury e-challans.',
  },
  {
    question: 'Can we update our business address or partners during renewal?',
    answer:
      'Yes! Our "Renewal + Modification" plan allows you to simultaneously update registered office address, proprietor/partner details, and employee headcount slabs without filing a separate amendment application.',
  },
  {
    question: 'What happens if our license is already expired?',
    answer:
      'If your license has already lapsed, most state portals permit late renewal upon payment of a statutory late fee (usually 25% to 50% extra). We calculate the exact penalty and file an expedited restoration application.',
  },
  {
    question: 'Do we need to visit the local municipal or labour department in person?',
    answer:
      'No! The entire process with BharatFiling is 100% digital and paperless. You upload your documents online, and our team coordinates with the municipal department on your behalf.',
  },
  {
    question: 'How long does it take to receive the renewed certificate?',
    answer:
      'Standard turnaround time is 3 to 5 working days from the date of government fee deposit, depending on state department processing speed.',
  },
  {
    question: 'Can an expired Shop Act affect our business current account?',
    answer:
      'Yes. Reserve Bank of India (RBI) KYC guidelines require commercial banks to maintain valid trade licenses on file. If your certificate expires, banks can freeze incoming and outgoing transactions.',
  },
  {
    question: 'Is a local language display board mandatory for commercial shops?',
    answer:
      'Yes. Most states (including Maharashtra, Karnataka, Tamil Nadu, and Punjab) strictly enforce that shop display nameboards must prominently feature the local state language in font size equal to or larger than English.',
  },
  {
    question: 'Do you provide renewal reminders so we never miss a deadline?',
    answer:
      'Yes! Once renewed through BharatFiling, your license validity is tracked in our automated compliance engine, and you will receive automated alerts via SMS, email, and WhatsApp 60 and 30 days before your next renewal.',
  },
];

export const SHOP_ACT_CHECKOUT = {
  expertTitle: 'Consult an expert',
  expertBullets: [
    '1. 15-minute call with an expert.',
    '2. Get guidance on the next steps for your requirements.',
  ],
  fee: 999,
  coupon: {
    code: 'MAKEININDIA',
    discount: 500,
    expiresText: 'expires in 2 days',
  },
  labourWelfare: 22,
  labourWelfareGst: 4,
};

export const POPULAR_BANKS = [
  { name: 'State Bank of India', code: 'SBI' },
  { name: 'HDFC Bank', code: 'HDFC' },
  { name: 'ICICI Bank', code: 'ICICI' },
  { name: 'Axis Bank', code: 'AXIS' },
  { name: 'Kotak Mahindra Bank', code: 'KOTAK' },
  { name: 'Punjab National Bank', code: 'PNB' },
];

export const ALL_NET_BANKS = [
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Bank of India',
  'IndusInd Bank',
  'Federal Bank',
  'Yes Bank',
  'IDFC FIRST Bank',
  'Central Bank of India',
  'Indian Overseas Bank',
];
