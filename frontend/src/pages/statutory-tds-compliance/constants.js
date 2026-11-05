/**
 * Constants for Statutory TDS Compliance & Return Filing Module
 * Based on Vakilsearch & IndiaFilings TDS compliance standards
 */

export const TDS_HERO = {
  hindiNotice: 'Now you can read this page in Hindi. Change language to हिन्दी',
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Statutory TDS Compliance & Return Filing Online',
  cardTitle: 'Statutory TDS Compliance',
  bullets: [
    'Zero-default TDS calculation across Section 194C, 194J, 194I, 194Q, and 192.',
    'Accurate quarterly 24Q, 26Q, 27Q, and 27EQ e-filing with TRACES validation on the go',
    'Avoid ₹200/day Section 234E penalties with 1-click Form 16/16A generation and challan audit.',
  ],
  guideLinkText: 'Complete guide on Statutory TDS Compliance',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'Compliance', href: '/services' },
    { title: 'Statutory TDS Compliance', href: '/services/statutory-tds-compliance' },
  ],
  pricingNote: {
    original: 2999,
    current: 1499,
    unit: 'per month / quarterly compliance retainer',
  },
};

export const TRUSTED_PARTNERS = [
  { name: 'TRACES CPC Portal Integrated', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' },
  { name: 'Income Tax e-Filing Certified', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'HDFC Corporate Tax Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  { name: 'ICICI iProcess Tax Solutions', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg' },
  { name: 'Zoho Books Tax Compliance Partner', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Zoho_Corporation_2019_logo.svg' },
  { name: 'All India Federation of Tax Practitioners', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
];

export const CORE_FEATURES = [
  {
    id: 1,
    title: 'Monthly TDS Computation & Challan ITNS 281',
    desc: 'Verify monthly tax deductions across all vendor bills, contractual invoices, and salaries. Generate pre-filled ITNS 281 challans before the 7th deadline.',
    icon: 'Calculator',
  },
  {
    id: 2,
    title: 'Quarterly e-Filing (24Q, 26Q, 27Q, 27EQ)',
    desc: 'Error-free preparation and e-filing of quarterly TDS returns with official TIN-FC File Validation Utility (FVU) verification and token confirmation.',
    icon: 'FileSpreadsheet',
  },
  {
    id: 3,
    title: 'TRACES Justification Report & Default Audit',
    desc: 'Regularly monitor TRACES for short deduction, short payment, late filing fee demands, and PAN mismatch alerts to prevent coercive demand notices.',
    icon: 'ShieldCheck',
  },
  {
    id: 4,
    title: 'Bulk Form 16 & Form 16A Generation',
    desc: 'Download and distribute digitally signed Part A and Part B certificates for employees and Form 16A certificates for vendors and contractors in 1 click.',
    icon: 'Mail',
  },
  {
    id: 5,
    title: 'Correction & Revised Statement Filing (C1 to C9)',
    desc: 'Swift correction of incorrect PANs, challan mismatches, deductee additions, or amount reconciliations without incurring additional statutory interest.',
    icon: 'RefreshCw',
  },
  {
    id: 6,
    title: 'Senior Chartered Accountant & Tax Partner Desk',
    desc: 'Direct consultation on Section 195 foreign remittances, Form 15CA/15CB certificates, lower deduction certificates (Form 13), and Section 206AB audit.',
    icon: 'Users',
  },
];

export const SECTIONS_COVERED = [
  {
    section: 'Section 194C',
    name: 'Contractor & Sub-Contractor Payments',
    rate: '1% (Ind/HUF) | 2% (Others)',
    threshold: '₹30,000 (single) / ₹1,00,000 (aggregate p.a.)',
    appliesTo: 'Advertising, transport, civil works, catering, event management contracts',
    badge: 'High Frequency',
  },
  {
    section: 'Section 194J',
    name: 'Fees for Professional & Technical Services',
    rate: '10% (Prof) | 2% (Tech / Call Centre)',
    threshold: '₹30,000 per financial year',
    appliesTo: 'Legal, CA, medical, architectural, marketing, and software consultancy',
    badge: 'Critical Audit',
  },
  {
    section: 'Section 194I',
    name: 'Rent of Land, Building or Machinery',
    rate: '2% (Plant/Machinery) | 10% (Land/Building)',
    threshold: '₹2,40,000 per financial year',
    appliesTo: 'Commercial office rent, godown lease, equipment and server hardware rental',
    badge: 'Monthly Recurring',
  },
  {
    section: 'Section 194Q',
    name: 'TDS on Purchase of Goods',
    rate: '0.1% (5% if no PAN)',
    threshold: 'Exceeding ₹50 Lakh in a Financial Year',
    appliesTo: 'Buyers whose turnover > ₹10 Cr purchasing goods from resident suppliers',
    badge: 'Turnover Triggered',
  },
  {
    section: 'Section 192',
    name: 'TDS on Salaries & Wages',
    rate: 'Average Slab Rate (Old / New Regime)',
    threshold: 'Basic Exemption Limit (₹3L / ₹2.5L)',
    appliesTo: 'Full-time salaried staff, executive payroll, variable bonus payouts',
    badge: 'Form 24Q Quarterly',
  },
  {
    section: 'Section 195',
    name: 'Payments to Non-Residents & Foreign Vendors',
    rate: 'DTAA Treaty Rate / Domestic Rates',
    threshold: 'Nil (Deductible on every rupee)',
    appliesTo: 'Software SaaS, cloud hosting, foreign royalties, overseas consultancies',
    badge: '15CA / 15CB Mandatory',
  },
];

export const WHO_NEEDS_TDS = [
  {
    type: 'Private Limited & OPC Companies',
    reason: 'Mandatory statutory deduction on all vendor bills, director salaries, and contractor invoices regardless of annual turnover.',
    icon: 'Building2',
  },
  {
    type: 'Proprietorships & LLPs (Tax Audit Cases)',
    reason: 'Businesses whose turnover exceeded ₹1 Crore (business) or ₹50 Lakh (profession) in preceding year must deduct TDS.',
    icon: 'Briefcase',
  },
  {
    type: 'D2C Brands & E-Commerce Sellers',
    reason: 'Subject to Section 194C logistics, 194Q raw material purchasing, and Section 194-O marketplace e-commerce tax deduction.',
    icon: 'ShoppingCart',
  },
  {
    type: 'Tech Startups & Agencies',
    reason: 'High volume Section 194J consultant payouts, overseas SaaS subscriptions under Section 195, and co-working office rentals.',
    icon: 'Laptop',
  },
  {
    type: 'Manufacturers & Wholesalers',
    reason: 'Mandatory Section 194Q compliance for bulk purchases exceeding ₹50 Lakh and factory lease agreements under Section 194I.',
    icon: 'Factory',
  },
  {
    type: 'Exporters & Cross-Border Firms',
    reason: 'Withholding compliance for overseas consultants, foreign commissions, and issuance of 15CA/15CB remittance certificates.',
    icon: 'Globe',
  },
];

export const COMPLIANCE_WORKFLOW = [
  {
    step: '01',
    title: 'Monthly Deduction Audit',
    desc: 'By the 3rd of every month, our team scans your expense ledger, vendor invoices, and salary registers to calculate exact TDS amounts per section.',
  },
  {
    step: '02',
    title: 'ITNS 281 Challan Creation',
    desc: 'We prepare pre-filled Challan ITNS 281 with correct major head (0020 for companies / 0021 for non-companies) and minor head 200 before the 7th.',
  },
  {
    step: '03',
    title: 'Challan BSR & CIN Verification',
    desc: 'Once deposited via net banking, we record the BSR code, deposit date, and Challan Identification Number (CIN) into the TRACES staging database.',
  },
  {
    step: '04',
    title: 'NSDL FVU File Generation',
    desc: 'At quarter end, we compile deductee PAN records, validate them with NSDL File Validation Utility (FVU), and generate token-ready return files.',
  },
  {
    step: '05',
    title: 'TIN-FC Portal Submission',
    desc: 'We upload your Form 24Q, 26Q, 27Q, or 27EQ directly on the Income Tax e-Filing portal and issue an official Provisional Receipt Number (PRN).',
  },
  {
    step: '06',
    title: 'Form 16 / 16A TRACES Issuance',
    desc: 'Within 15 days of processing, we download digitally signed Form 16 (for staff) and Form 16A (for vendors) with official TRACES watermarks.',
  },
];

export const PENALTY_AVOIDANCE = [
  {
    provision: 'Section 234E Late Filing Fee',
    statutoryCost: '₹200 per day until default is remedied',
    impact: 'Accumulates daily and cannot be waived or appealed even in tribunal',
    bharatfilingSolution: 'Guaranteed e-filing 5 days prior to quarterly deadline',
  },
  {
    provision: 'Section 271H Penalty',
    statutoryCost: '₹10,000 to ₹1,00,000 levied by Assessing Officer',
    impact: 'Levied for non-filing or furnishing incorrect information/PANs',
    bharatfilingSolution: '100% pre-filing PAN verification against NSDL database',
  },
  {
    provision: 'Section 201(1A) Interest on Late Deposit',
    statutoryCost: '1% per month for non-deduction, 1.5% for late deposit',
    impact: 'Calculated from date of deduction to actual date of challan deposit',
    bharatfilingSolution: 'Monthly deduction audit on the 3rd to deposit challans by the 7th',
  },
  {
    provision: 'Section 40(a)(ia) 30% Expense Disallowance',
    statutoryCost: '30% of expenditure disallowed from taxable profit',
    impact: 'Directly spikes your company’s annual corporate income tax burden',
    bharatfilingSolution: 'Full reconciliation to ensure 100% expense tax deductibility',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter TDS Retainer',
    badge: 'Popular for Small Businesses',
    price: 1499,
    originalPrice: 2999,
    period: 'per month',
    volume: 'Up to 20 Deductees / Quarter',
    description: 'Ideal for startups and growing offices with standard vendor, rent, and contractor payouts.',
    features: [
      'Monthly TDS deduction calculation & advice',
      'Preparation of monthly Challan ITNS 281 before 7th',
      'Quarterly Form 26Q (Resident Vendor/Contractor) e-filing',
      'Quarterly Form 24Q (Salary TDS) return preparation',
      'Pre-filing PAN validity check against NSDL',
      'Generation of Form 16A certificates via TRACES',
      'Dedicated WhatsApp compliance manager',
    ],
    cta: 'Choose Starter Retainer',
    popular: true,
  },
  {
    id: 'growth',
    name: 'Growth & Multi-Category',
    badge: 'Comprehensive Compliance',
    price: 2999,
    originalPrice: 4999,
    period: 'per month',
    volume: 'Up to 75 Deductees / Quarter',
    description: 'End-to-end statutory management including Section 194Q goods audit and TRACES default resolution.',
    features: [
      'Everything in Starter Retainer',
      'Up to 75 deductee records per quarter',
      'Section 194Q purchase of goods threshold monitoring',
      'Section 206AB higher-rate non-filer compliance audit',
      'TRACES justification report audit & mismatch resolution',
      'Quarterly TCS return filing (Form 27EQ) if applicable',
      'Annual Form 16 (Part A & B) preparation for employees',
      'Priority phone & video conference with Senior CA',
    ],
    cta: 'Choose Growth Retainer',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise & International TDS',
    badge: 'Corporate & NRI Tax',
    price: 5999,
    originalPrice: 9999,
    period: 'per month',
    volume: 'Unlimited Deductees / Quarter',
    description: 'Full-spectrum direct tax compliance with foreign remittance 195 and Form 15CA/15CB support.',
    features: [
      'Everything in Growth & Multi-Category',
      'Unlimited deductee records and multiple TAN branches',
      'Form 27Q (Payments to Non-Residents / Foreign Vendors)',
      'DTAA tax treaty relief & withholding rate advisory',
      'Form 15CA generation & Form 15CB CA certification desk',
      'Filing of correction statements (C1 to C9) for past quarters',
      'Handling Income Tax Department intimations & demand notices',
      'Dedicated Senior Direct Tax Partner & SLA guarantee',
    ],
    cta: 'Contact for Enterprise',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Gaurav Singhania',
    company: 'Apex Supply Chain Solutions',
    role: 'Director of Finance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    review:
      'We had accumulated over ₹85,000 in Section 234E late fees due to missed filings by our previous accountant. BharatFiling took over, filed our revised returns, and resolved our TRACES defaults in 10 days. Their monthly challan reminder on the 3rd is a lifesaver.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Shreya Nambiar',
    company: 'PixelCraft Creative Agency',
    role: 'Co-Founder & COO',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    review:
      'Managing 194J deductions for 30+ freelance video editors, copywriters, and developers used to be chaos. BharatFiling calculates the exact TDS, issues challans, and sends out Form 16A certificates automatically every quarter. 100% stress-free.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Rajesh M. Patel',
    company: 'Patel Engineering & Infra Pvt Ltd',
    role: 'Managing Director',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    review:
      'The Section 194Q purchase of goods threshold was tricky for our wholesale business. BharatFiling audited our suppliers, matched our turnover limits, and filed our 26Q flawlessly without any assessment notice.',
    rating: 5,
  },
];

export const FAQS = [
  {
    question: 'What is Statutory TDS Compliance?',
    answer:
      'Statutory TDS (Tax Deducted at Source) Compliance is a mandatory legal obligation under the Indian Income Tax Act, 1961. Any person or business making specified payments (such as salaries, contractor fees, professional fees, rent, technical services, or interest) must deduct tax at source at the prescribed rate, deposit it with the Central Government by the 7th of the following month, and submit quarterly returns (Forms 24Q, 26Q, 27Q) to the Income Tax Department.',
  },
  {
    question: 'What is the monthly deadline to deposit TDS to the government?',
    answer:
      'TDS deducted during any calendar month must be deposited on or before the 7th day of the subsequent month using Challan ITNS 281. The only exception is tax deducted in March, which can be deposited up to April 30th.',
  },
  {
    question: 'What are the quarterly deadlines for filing TDS returns?',
    answer:
      'Quarterly TDS return deadlines are: Q1 (April to June) – July 31st; Q2 (July to September) – October 31st; Q3 (October to December) – January 31st; and Q4 (January to March) – May 31st.',
  },
  {
    question: 'What happens if our company misses the quarterly filing deadline?',
    answer:
      'Under Section 234E of the Income Tax Act, a mandatory late filing fee of ₹200 per day is charged for every day the default continues, up to the total amount of tax deductible. Furthermore, the Assessing Officer can levy a penalty under Section 271H ranging from ₹10,000 to ₹1,00,000.',
  },
  {
    question: 'What is the difference between Form 24Q and Form 26Q?',
    answer:
      'Form 24Q is filed quarterly for tax deducted on salary payments made to employees under Section 192. Form 26Q is filed for tax deducted on all non-salary payments made to resident individuals and entities, such as professional fees (194J), contractor payments (194C), rent (194I), and interest (194A).',
  },
  {
    question: 'What is Form 27Q and when is it required?',
    answer:
      'Form 27Q is required whenever tax is deducted on payments made to Non-Resident Indians (NRIs) or foreign companies under Section 195 or other non-resident provisions. It is often accompanied by Form 15CA and Form 15CB documentation for foreign outward remittances.',
  },
  {
    question: 'What is Section 206AB and how do you protect us from it?',
    answer:
      'Section 206AB mandates deductors to deduct tax at a higher rate (double the normal rate or 5%) if the deductee has not filed their income tax return for the preceding financial year and their aggregate TDS was ₹50,000 or more. We run an automated compliance check on the e-filing portal to identify non-filers before you release payment.',
  },
  {
    question: 'How do vendors and employees receive their TDS certificates (Form 16 / 16A)?',
    answer:
      'After the quarterly return is processed by TRACES, we download digitally signed Form 16A certificates (for non-salary payees) and Form 16 certificates (for employees) bearing the official TRACES watermarked PKI signature and distribute them directly via email.',
  },
  {
    question: 'Can you fix mistakes in previously filed TDS returns (Correction Returns)?',
    answer:
      'Yes. If you made errors such as entering an incorrect PAN, wrong challan BSR code, incorrect section code, or omitting a deductee, we file a revised/correction statement (C1, C2, C3, C4, C5, or C9) through the TRACES portal to rectify the records and extinguish any demand notice.',
  },
  {
    question: 'What documents are required to start our Statutory TDS Compliance?',
    answer:
      'We only require: 1) Your 10-digit Tax Deduction Account Number (TAN), 2) Login credentials for the Income Tax e-filing and TRACES portals, 3) Monthly expense/purchase register or tally data, and 4) Deductee PAN cards and invoices.',
  },
  {
    question: 'What is the difference between Section 194C and Section 194J?',
    answer:
      'Section 194C covers work contracts, advertising, catering, carriage of goods, and construction (1% for individual/HUF, 2% for others). Section 194J covers professional services like legal, medical, engineering, accountancy, or consultancy (10% rate) and technical services/BPO services (2% rate).',
  },
  {
    question: 'What is Section 194Q and does it apply to our business?',
    answer:
      'Section 194Q applies to buyers whose total turnover exceeded ₹10 Crore in the preceding financial year. Such buyers must deduct TDS at 0.1% on purchase of goods from any resident seller exceeding ₹50 Lakh in a financial year.',
  },
];

export const TDS_CHECKOUT = {
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
