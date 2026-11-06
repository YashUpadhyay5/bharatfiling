/**
 * Constants & Configuration for Loans Module
 * Covering Business Loans, MUDRA Loans, Working Capital, Machinery Loans, LAP, and CMA Project Reports.
 */

export const LOANS_HERO = {
  badge: 'Only ISO 27001 Certified Lending & Compliance Platform in 🇮🇳',
  title: 'Fast & Hassle-Free Business Loans in India',
  subtitle:
    'Get collateral-free business loans up to ₹50 Lakhs and government-backed MSME credit schemes up to ₹5 Crore with instant digital eligibility and ex-banker guidance.',
  highlights: [
    'Quick in-principle sanction in 24-48 hours with 35+ top banks & NBFC partners',
    'Collateral-free options under MUDRA (PMMY) & CGTMSE credit guarantee schemes',
    'Complete assistance with CA-certified CMA data & Bank Project Reports',
  ],
  guideLinkText: 'Complete Guide on MSME & Business Loans in India',
};

export const LENDING_PARTNERS = [
  { name: 'State Bank of India', code: 'SBI', type: 'Public Sector Bank', maxFunding: '₹50 Cr' },
  { name: 'HDFC Bank', code: 'HDFC', type: 'Private Bank', maxFunding: '₹25 Cr' },
  { name: 'ICICI Bank', code: 'ICICI', type: 'Private Bank', maxFunding: '₹20 Cr' },
  { name: 'Axis Bank', code: 'AXIS', type: 'Private Bank', maxFunding: '₹15 Cr' },
  { name: 'Kotak Mahindra', code: 'KOTAK', type: 'Private Bank', maxFunding: '₹10 Cr' },
  { name: 'SIDBI', code: 'SIDBI', type: 'Apex MSME Financer', maxFunding: '₹100 Cr' },
  { name: 'Bajaj Finserv', code: 'BAJAJ', type: 'NBFC', maxFunding: '₹50 L' },
  { name: 'Tata Capital', code: 'TATA', type: 'NBFC', maxFunding: '₹75 L' },
  { name: 'Lendingkart', code: 'LKART', type: 'Fintech NBFC', maxFunding: '₹40 L' },
];

export const LOAN_SCHEMES = [
  {
    id: 'unsecured-business',
    name: 'Unsecured Business Loan',
    slug: 'business-loan',
    badge: 'Most Popular',
    category: 'Fast Capital',
    amount: '₹1 Lakh to ₹50 Lakhs',
    interestRate: 'From 11.99% p.a.',
    tenure: '12 to 60 Months',
    collateral: 'Zero Collateral Required',
    disbursal: '24 - 48 Hours',
    description:
      'Ideal for working capital, business expansion, bulk inventory purchase, and marketing campaigns without pledging any business assets.',
    keyFeatures: [
      '100% Paperless & digital verification',
      'No property or asset mortgage required',
      'Flexible daily, weekly, or monthly repayment options',
      'Nil prepayment penalty after 6 months (select lenders)',
    ],
    eligibility: {
      minVintage: '1 Year in Operations',
      minTurnover: '₹20 Lakhs p.a.',
      minCibil: '650+',
      entities: ['Sole Proprietor', 'Partnership', 'LLP', 'Pvt Ltd'],
    },
    popularFor: 'E-commerce, Retailers, Wholesalers, Service Providers & Agencies',
  },
  {
    id: 'mudra-pmmy',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    slug: 'mudra-loan',
    badge: 'Govt. Subsidized',
    category: 'Govt Scheme',
    amount: 'Up to ₹20 Lakhs',
    interestRate: '8.50% - 11.50% p.a.',
    tenure: 'Up to 5 Years',
    collateral: '100% Collateral-Free (NCGTC Guarantee)',
    disbursal: '5 - 7 Working Days',
    description:
      'Government of India initiative to provide institutional credit to micro and small businesses across Shishu, Kishor, and Tarun categories.',
    keyFeatures: [
      'Subsidized low-interest rates linked to bank MCLR',
      'Categorized into Shishu (≤₹50k), Kishor (₹50k-₹5L), Tarun (₹5L-₹20L)',
      'Zero processing fees for Shishu & Kishor segments',
      'MUDRA Debit Card issued for seamless working capital access',
    ],
    eligibility: {
      minVintage: 'Fresh Startups & Existing Units Eligible',
      minTurnover: 'No minimum turnover cap',
      minCibil: '600+',
      entities: ['Micro Enterprises', 'Shopkeepers', 'Artisans', 'Food Units'],
    },
    popularFor: 'Small Retail Shops, Food Stalls, Repair Workshops & Artisans',
  },
  {
    id: 'working-capital-cgtmse',
    name: 'CGTMSE MSME Working Capital',
    slug: 'working-capital',
    badge: 'High Limit Credit',
    category: 'Liquidity & CC/OD',
    amount: 'Up to ₹5 Crore',
    interestRate: 'From 9.25% p.a.',
    tenure: '12 Months (Renewable Annually)',
    collateral: 'Collateral-Free up to ₹5 Cr (CGTMSE Trust)',
    disbursal: '7 - 10 Working Days',
    description:
      'Cash Credit (CC) and Overdraft (OD) limit to manage recurring debtor receivables, vendor supply chains, and day-to-day liquidity gaps.',
    keyFeatures: [
      'Credit guarantee coverage up to 85% by Ministry of MSME',
      'Pay interest only on the utilized credit limit, not full sanction',
      'Instant letter of credit (LC) and bank guarantee (BG) bundling',
      'Helps bridge 60-to-120-day corporate receivable cycles',
    ],
    eligibility: {
      minVintage: '2 Years in Operations',
      minTurnover: '₹50 Lakhs p.a.',
      minCibil: '680+',
      entities: ['MSME Manufacturing & Service Units with Udyam Certificate'],
    },
    popularFor: 'Exporters, Component Manufacturers, Contractors & Tech Vendors',
  },
  {
    id: 'machinery-equipment',
    name: 'Machinery & Equipment Loan',
    slug: 'machinery-loan',
    badge: 'Asset Finance',
    category: 'Capital Expenditure',
    amount: '₹5 Lakhs to ₹5 Crore',
    interestRate: 'From 9.50% p.a.',
    tenure: 'Up to 7 Years (84 Months)',
    collateral: 'Hypothecation of Purchased Machinery',
    disbursal: '5 - 7 Working Days',
    description:
      'Procure cutting-edge industrial machines, CNC tools, packaging lines, diagnostic medical equipment, or IT server racks with up to 90% funding.',
    keyFeatures: [
      'Up to 90% LTV of the equipment proforma invoice',
      'No secondary property needed; machinery itself serves as primary security',
      'Structured balloon/step-up repayment schedules matching cash flows',
      'Eligible for government capital investment subsidies (e.g., CLCSS)',
    ],
    eligibility: {
      minVintage: '1 Year in Operations',
      minTurnover: '₹30 Lakhs p.a.',
      minCibil: '650+',
      entities: ['Manufacturing Units', 'Diagnostic Labs', 'Printing Presses'],
    },
    popularFor: 'Factories, Diagnostic Centers, Fabrication Units & Packaging Plants',
  },
  {
    id: 'loan-against-property',
    name: 'Loan Against Property (LAP)',
    slug: 'loan-against-property',
    badge: 'Lowest Interest',
    category: 'Secured Mortgage',
    amount: '₹10 Lakhs to ₹15 Crore',
    interestRate: 'From 8.75% p.a.',
    tenure: 'Up to 15 Years (180 Months)',
    collateral: 'Residential / Commercial / Industrial Property',
    disbursal: '7 - 14 Working Days',
    description:
      'Unlock the highest loan amounts and longest repayment horizons at the lowest possible interest rates by pledging commercial or residential real estate.',
    keyFeatures: [
      'Lowest borrowing rates among all business credit instruments',
      'Extended tenure up to 15 years keeps monthly EMIs ultra-low',
      'Option of term loan or overdraft against mortgaged property',
      'Higher loan sanction up to 75% of fair market property valuation',
    ],
    eligibility: {
      minVintage: '2 Years in Operations',
      minTurnover: '₹40 Lakhs p.a.',
      minCibil: '700+',
      entities: ['Property Owners', 'Established Enterprises', 'Directors'],
    },
    popularFor: 'Substantial Plant Expansions, Multi-location Outlets & Long-term Debt Refinancing',
  },
  {
    id: 'cma-project-report',
    name: 'Bank CMA & Detailed Project Report',
    slug: 'cma-project-report',
    badge: 'Bank Sanction Ready',
    category: 'CA Financial Advisory',
    amount: 'Mandatory for Loans > ₹25 Lakhs',
    interestRate: 'CA Advisory Service',
    tenure: 'Ready in 3 - 5 Working Days',
    collateral: 'Increases Sanction Probability to 95%',
    disbursal: 'Direct CA Certified Report',
    description:
      'Comprehensive 5-Year Credit Monitoring Arrangement (CMA) data, projected balance sheets, DSCR calculations, and Bank Project Report required by all commercial banks.',
    keyFeatures: [
      'Prepared by Ex-Bank Credit Appraisal Managers and Practicing CAs',
      'Includes Ratio Analysis, MPBF (Tandon/Chore Committee norms), and DSCR',
      'Compliant with SBI, PNB, BoB, HDFC, and ICICI credit manuals',
      'Includes 1-on-1 bank defense consultation for promoter interview',
    ],
    eligibility: {
      minVintage: 'All Loan Applicants seeking Bank CC/OD or Term Loans',
      minTurnover: 'Applicable across all loan ticket sizes',
      minCibil: 'N/A (Advisory)',
      entities: ['All Business Entities applying for formal bank debt'],
    },
    popularFor: 'Entrepreneurs presenting dossiers to Nationalized & Private Bank Credit Committees',
  },
  {
    id: 'custom-loan-advisory',
    name: 'Custom Loan & Debt Advisory',
    slug: 'custom-loan-advisory',
    badge: 'Tailored Solution',
    category: 'Expert Advisory',
    amount: 'Custom (₹10 Lakhs to ₹50+ Cr)',
    interestRate: 'Bank Negotiated / Subsidized',
    tenure: 'Flexible (12 to 180 Months)',
    collateral: 'Collateral-free or Asset-backed options',
    disbursal: 'Fast-Track 1-on-1 Consultation',
    description:
      'Looking for a loan scheme not listed in the standard catalog (e.g. Export Credit, Healthcare, Educational Institute, Green Energy/Solar, Builder Finance, Venture Debt, or Stressed Asset Refinancing)? Our Senior CA & Ex-Banker Credit Committee structures customized proposals across 35+ partner institutions.',
    keyFeatures: [
      'Dedicated Senior Credit Appraisal Manager & CA assigned to your case',
      'Multi-bank syndication across 35+ PSU, Private & NBFC credit committees',
      'Custom debt structuring for unlisted industries & non-standard cash flows',
      'Assistance with credit bureau dispute resolution & collateral substitution',
    ],
    eligibility: {
      minVintage: 'All stages (Startups, Growing MSMEs & Corporates)',
      minTurnover: 'Custom evaluation based on contracts & banking transactions',
      minCibil: 'All credit profiles reviewed by advisory panel',
      entities: ['Any registered business, firm, LLP, company or promoter'],
    },
    popularFor: 'Startups, Specialized Sectors, Non-Standard Collateral & Custom Debt Restructuring',
  },
];

export const LOAN_STEPS = [
  {
    step: '01',
    title: 'Instant Eligibility & Matchmaking',
    desc: 'Share your basic business details and turnover. Our algorithm evaluates eligibility across 35+ top banks and NBFCs instantly.',
  },
  {
    step: '02',
    title: 'CA Dossier & Document Curation',
    desc: 'Our financial advisory team assists you with GST returns, banking statements, ITR computation, and CMA data preparation.',
  },
  {
    step: '03',
    title: 'In-Principle Credit Sanction',
    desc: 'Receive formal loan sanction letters from multiple shortlisted lenders with transparent interest rates and repayment tenures.',
  },
  {
    step: '04',
    title: 'Direct Bank Disbursal',
    desc: 'Complete digital e-signing of the loan agreement. Funds are transferred directly to your current bank account within 24-48 hours.',
  },
];

export const REQUIRED_DOCUMENTS = [
  { id: 'kyc', title: 'KYC of Promoters / Partners', items: ['PAN Card', 'Aadhaar Card', 'Passport / Voter ID', 'Passport Size Photo'] },
  { id: 'entity_proof', title: 'Business Entity Proof', items: ['Certificate of Incorporation / Partnership Deed', 'GST Registration Certificate', 'Udyam MSME Certificate', 'Shop & Establishment License'] },
  { id: 'financials', title: 'Financial Records', items: ['Last 6 to 12 Months Current Bank Statements (PDF)', 'Last 2 to 3 Years ITR with Computation of Income', 'Audited Balance Sheet & Profit & Loss Statement (if applicable)'] },
  { id: 'taxation', title: 'Taxation & Invoices', items: ['Last 12 Months GSTR-3B and GSTR-1 filings', 'Proforma Invoice / Quotations (for Machinery/Equipment Loans)', 'Property Title Deeds (for Loan Against Property only)'] },
];

export const BUSINESS_ENTITIES = [
  { id: 'proprietorship', name: 'Sole Proprietorship', desc: 'Single business owner' },
  { id: 'partnership', name: 'Partnership Firm', desc: 'Registered / Unregistered partnership' },
  { id: 'llp', name: 'Limited Liability Partnership (LLP)', desc: 'MCA incorporated entity' },
  { id: 'pvt_ltd', name: 'Private Limited Company', desc: 'Corporate / Startup with share capital' },
  { id: 'individual', name: 'Self-Employed Professional', desc: 'Doctors, CAs, Architects, Consultants' },
];

export const TURNOVER_SLABS = [
  { id: 'below_20l', label: 'Below ₹20 Lakhs' },
  { id: '20l_to_50l', label: '₹20 Lakhs - ₹50 Lakhs' },
  { id: '50l_to_1cr', label: '₹50 Lakhs - ₹1 Crore' },
  { id: '1cr_to_5cr', label: '₹1 Crore - ₹5 Crore' },
  { id: 'above_5cr', label: 'Above ₹5 Crore' },
];

export const CIBIL_RANGES = [
  { id: '750_plus', label: '750+ (Excellent - Instant Best Rates)' },
  { id: '700_749', label: '700 - 749 (Good - High Approval Rate)' },
  { id: '650_699', label: '650 - 699 (Fair - NBFC & Govt Scheme Friendly)' },
  { id: 'new_to_credit', label: 'Below 650 or No Credit History' },
];

export const LOAN_PURPOSES = [
  'Working Capital & Daily Cash Flow Gap',
  'Purchasing New Machinery or Equipment',
  'Bulk Inventory & Raw Material Purchase',
  'Business Expansion & Opening New Branch',
  'Paying High-Cost Vendor Dues / Debt Consolidation',
  'Office Renovation or Infrastructure Upgrade',
  'Marketing, Brand Promotion & Hiring',
  'Specialized / Custom Loan Advisory (Loan Not Listed)',
];

export const LOAN_CHECKOUT = {
  consultationFee: 999,
  couponDiscount: 500,
  subTotal: 499,
  labourWelfare: 22,
  labourWelfareGst: 4,
  taxesAndCharges: 26,
  totalAmount: 525,
  couponCode: 'MAKEININDIA',
};

export const POPULAR_BANKS = [
  { id: 'sbi', name: 'State Bank of India', code: 'SBI' },
  { id: 'hdfc', name: 'HDFC Bank', code: 'HDFC' },
  { id: 'icici', name: 'ICICI Bank', code: 'ICICI' },
  { id: 'axis', name: 'Axis Bank', code: 'AXIS' },
  { id: 'kotak', name: 'Kotak Mahindra Bank', code: 'KOTAK' },
  { id: 'pnb', name: 'Punjab National Bank', code: 'PNB' },
];

export const ALL_NET_BANKS = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'IndusInd Bank',
  'Federal Bank',
  'IDFC FIRST Bank',
  'Yes Bank',
  'SIDBI Small Industries Bank',
];

export const TESTIMONIALS = [
  {
    name: 'Suresh Patel',
    role: 'Managing Director, Patel Agro Industries (Surat)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    content:
      'We urgently needed ₹35 Lakhs for raw material procurement during peak harvesting season. BharatFiling connected us with an NBFC partner and secured in-principle sanction in under 36 hours without any collateral. Phenomenal turnaround!',
    rating: 5,
    amount: '₹35 Lakhs Approved',
  },
  {
    name: 'Ananya Deshmukh',
    role: 'Founder, Zest Digital Marketing (Pune)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    content:
      'As a services company, conventional banks repeatedly rejected our loan requests demanding commercial property. BharatFiling prepared our CMA report and helped us get a ₹15 Lakh unsecured business loan with 12.5% interest. Highly recommended!',
    rating: 5,
    amount: '₹15 Lakhs Approved',
  },
  {
    name: 'Vikramjit Singh',
    role: 'Owner, Guru Nanak Auto Components (Ludhiana)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    content:
      'The team assisted us in preparing a detailed project report and applying under the CGTMSE credit guarantee scheme. We secured a ₹1.2 Crore working capital credit line from a nationalized bank with zero third-party collateral!',
    rating: 5,
    amount: '₹1.2 Crore Approved',
  },
];

export const FAQS = [
  {
    q: 'What is the maximum loan amount I can obtain without pledging collateral?',
    a: 'Under Unsecured Business Loans, eligible businesses can obtain up to ₹50 Lakhs without pledging property or assets. Under the government-backed CGTMSE scheme, MSMEs can access working capital credit facilities up to ₹5 Crore with collateral-free credit guarantee coverage.',
  },
  {
    q: 'How fast can a business loan be sanctioned and disbursed?',
    a: 'For digital unsecured business loans with complete banking records and GST data, in-principle approval takes between 4 to 24 hours. Full disbursal to your current account is typically completed within 24 to 48 hours. Government schemes like MUDRA or CGTMSE typically take 5 to 7 business days.',
  },
  {
    q: 'Can a startup with less than 1 year of operations get a loan?',
    a: 'Yes. Startups and newly registered micro-enterprises can apply under the Pradhan Mantri MUDRA Yojana (PMMY) Shishu category (up to ₹50,000) or Kishor category (up to ₹5 Lakhs). Additionally, specialized venture debt and angel-backed startup credit facilities are accessible through our lender network.',
  },
  {
    q: 'Is GST registration mandatory to apply for a business loan?',
    a: 'For loan amounts exceeding ₹15 Lakhs, most scheduled banks and NBFCs require GST returns (last 6-12 months of GSTR-3B/1). However, for smaller ticket sizes up to ₹10 Lakhs under MUDRA, businesses exempt from GST can apply using bank statements, Udyam registration, and sales records.',
  },
  {
    q: 'What is CMA Data and why do banks demand it for business loans?',
    a: 'Credit Monitoring Arrangement (CMA) Data is a standardized financial report required by Reserve Bank of India guidelines for all bank credit limits above ₹25 Lakhs. It analyzes your past 2 years of financial performance, current year estimates, and 3-to-5-year financial projections including DSCR, MPBF, and working capital cycle ratios.',
  },
  {
    q: 'What is the minimum CIBIL score required for a business loan?',
    a: 'A CIBIL / Experian score of 700+ offers the fastest approvals and lowest interest rates. However, applicants with scores between 650 and 699 are eligible for select NBFC and MSME schemes. Even with no prior credit history, fresh entrepreneurs can apply under MUDRA Shishu.',
  },
  {
    q: 'Can I repay or foreclose my business loan early?',
    a: 'Yes. Most lenders permit foreclosure or part-prepayment after an initial lock-in period (typically 6 months). For individual and micro-enterprise floating-rate loans, RBI mandates zero foreclosure penalties. For fixed-rate non-individual loans, prepayment charges generally range between 2% and 4% + GST.',
  },
  {
    q: 'How does BharatFiling assist in securing a loan?',
    a: 'BharatFiling acts as your strategic financial advisory partner. We review your financials, identify the highest-probability loan scheme across 35+ partner banks & NBFCs, prepare your CA-certified project report/CMA data, resolve compliance queries, and coordinate with credit appraisal officers for swift sanction.',
  },
  {
    q: 'What is the interest rate range across different loan types?',
    a: 'Loan Against Property (LAP) offers rates from 8.75% to 10.50% p.a. Machinery & Term Loans start from 9.50% p.a. Government-backed MUDRA loans range between 8.50% and 11.50% p.a. Unsecured Business Loans typically range from 11.99% to 18% p.a. depending on your business vintage and turnover.',
  },
  {
    q: 'What documents are required to initiate the loan application?',
    a: 'To start, you only need PAN and Aadhaar of the applicant, the last 6 months of current bank statements in PDF, business registration proof (GST or Udyam), and 2 years of ITR if available.',
  },
];
