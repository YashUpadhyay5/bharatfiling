/**
 * Constants for Virtual CFO & Accounting Services Module
 * Tailored for startups, SMEs, and growth enterprises
 */

export const CFO_HERO = {
  hindiNotice: 'Now you can read this page in Hindi. Change language to हिन्दी',
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Virtual CFO & Online Accounting Services in India',
  cardTitle: 'Virtual CFO & Accounting',
  bullets: [
    'Daily bookkeeping & ledger reconciliation in Zoho Books, Tally Prime, or QuickBooks.',
    'Monthly MIS reports: Profit & Loss, Balance Sheet, Working Capital & Cash Burn analysis.',
    'Strategic tax planning, board deck assistance, and direct advisory by a Senior FCA.',
  ],
  guideLinkText: 'Complete guide on Virtual CFO & Accounting',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'Compliance', href: '/services' },
    { title: 'Virtual CFO & Accounting', href: '/services/virtual-cfo' },
  ],
  pricingNote: {
    original: 5999,
    current: 2999,
    unit: 'per month / quarterly retainer',
  },
};

export const TRUSTED_PARTNERS = [
  { name: 'Zoho Books Certified Partner', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Zoho_Corporation_2019_logo.svg' },
  { name: 'Tally Prime Cloud Integrated', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' },
  { name: 'QuickBooks Advanced ProAdvisor', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'HDFC Corporate Treasury Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  { name: 'ICICI Banking API Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg' },
  { name: 'Indian Venture Capital & Angel Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
];

export const CORE_FEATURES = [
  {
    id: 1,
    title: 'Daily Bookkeeping & Bank Reconciliation',
    desc: 'Automated 2-way bank feed synchronization, categorization of operational expenses, vendor debit vouchers, and customer receipts.',
    icon: 'Calculator',
  },
  {
    id: 2,
    title: 'Monthly Financial MIS Statements',
    desc: 'Audited monthly Profit & Loss statement, Balance Sheet, Cash Flow, debtor aging analysis, and unit economics delivered by the 10th.',
    icon: 'FileSpreadsheet',
  },
  {
    id: 3,
    title: 'Statutory Tax Compliance Oversight',
    desc: 'Seamless coordination for monthly GST returns (GSTR-1 & 3B), TDS challans (ITNS 281), PF/ESI remittances, and advance tax projections.',
    icon: 'ShieldCheck',
  },
  {
    id: 4,
    title: 'Cash Flow Forecasting & Runway Modeling',
    desc: 'Dynamic 12-month forward rolling cash flow models, runway estimations, burn-rate optimization, and capital expenditure planning.',
    icon: 'TrendingUp',
  },
  {
    id: 5,
    title: 'Vendor Bill Processing & Payroll Integration',
    desc: 'End-to-end accounts payable management, three-way purchase order matching, vendor payouts, and payroll journal entries.',
    icon: 'Briefcase',
  },
  {
    id: 6,
    title: 'Investor Reporting & Due Diligence Desk',
    desc: 'Preparation of cap table models, investor quarterly MIS updates, audit readiness dossiers, and representation during financial due diligence.',
    icon: 'Users',
  },
];

export const CFO_SERVICES_MATRIX = [
  {
    category: 'Bookkeeping & Ledgers',
    frequency: 'Daily / Weekly',
    scope: 'Invoicing, vendor bill booking, expense reimbursement, bank & credit card reconciliation',
    tools: 'Zoho Books / Tally / QB',
    badge: 'Foundational',
  },
  {
    category: 'Monthly Financial Close',
    frequency: 'Monthly (by 10th)',
    scope: 'Depreciation schedules, prepaid expense amortization, accrued liabilities, P&L and Balance Sheet',
    tools: 'Statutory Financials',
    badge: 'Core Deliverable',
  },
  {
    category: 'Direct & Indirect Tax Filings',
    frequency: 'Monthly / Quarterly',
    scope: 'GST 3B/1, Section 194C/J TDS, Advance Tax computation, Form 26AS & AIS reconciliation',
    tools: 'e-Filing Portals',
    badge: 'Compliance',
  },
  {
    category: 'Budgeting & Runway Analysis',
    frequency: 'Monthly Rolling',
    scope: 'Scenario modeling, variance analysis (Budget vs Actual), gross margin breakdown, runway calculation',
    tools: 'Financial Models',
    badge: 'Strategic',
  },
  {
    category: 'Accounts Payable & Receivable',
    frequency: 'Weekly Cycle',
    scope: 'Aging reports, debtor follow-ups, payment batch approval files, vendor dispute resolution',
    tools: 'Treasury Desk',
    badge: 'Working Capital',
  },
  {
    category: 'Senior CA Advisory Sessions',
    frequency: 'Bi-Weekly / Monthly',
    scope: '1-on-1 strategy calls with a dedicated FCA on corporate structuring, ESOP pools, and fundraise metrics',
    tools: 'FCA Direct Line',
    badge: 'Executive',
  },
];

export const WHO_NEEDS_CFO = [
  {
    type: 'Funded & Bootstrapped Tech Startups',
    reason: 'Need reliable monthly MIS for angel investors, venture funds, and burn-rate tracking without hiring a ₹35L+ full-time CFO.',
    icon: 'Rocket',
  },
  {
    type: 'D2C Brands & E-Commerce Sellers',
    reason: 'Multi-channel reconciliation across Amazon, Shopify, Flipkart, and payment gateways with automated inventory COGS tracking.',
    icon: 'ShoppingCart',
  },
  {
    type: 'SaaS & Subscription Companies',
    reason: 'Tracking SaaS metrics: MRR, ARR, CAC, LTV, churn rate, ASC 606 revenue recognition, and international client billing.',
    icon: 'Laptop',
  },
  {
    type: 'Service Agencies & Consultancies',
    reason: 'Project-wise profitability analysis, billable hours tracking, client retainers, and GST input tax credit maximization.',
    icon: 'Building2',
  },
  {
    type: 'Manufacturing & Distribution SMEs',
    reason: 'Bill of materials (BOM) cost accounting, raw material inventory reconciliation, and working capital credit line compliance.',
    icon: 'Factory',
  },
  {
    type: 'Import / Export Businesses',
    reason: 'Managing foreign currency receipts, EDPMS/IDPMS reconciliation, hedging strategy, and advance remittance certificates.',
    icon: 'Globe',
  },
];

export const COMPLIANCE_WORKFLOW = [
  {
    step: '01',
    title: 'Cloud Accounting Setup & Chart of Accounts',
    desc: 'We configure your Zoho Books or Tally Prime ledger hierarchy, customize cost centers, and connect direct automated bank feeds.',
  },
  {
    step: '02',
    title: 'Ongoing Invoicing & Expense Processing',
    desc: 'Your team or our dedicated accountant inputs customer sales invoices and vendor bills with accurate GST and TDS tax rates.',
  },
  {
    step: '03',
    title: 'Bank & Payment Gateway Reconciliation',
    desc: 'Weekly 2-way matching of bank statements, Razorpay/Stripe feeds, and credit card expenses to eliminate reconciliation gaps.',
  },
  {
    step: '04',
    title: 'Monthly Statutory Tax Computations',
    desc: 'Before the 7th and 11th, we compute exact monthly TDS liabilities and GSTR-3B tax figures to prevent late filing surcharges.',
  },
  {
    step: '05',
    title: 'Monthly Financial MIS Delivery',
    desc: 'By the 10th of every month, we deliver detailed financial dashboards: comparative P&L, balance sheet, and unit economics.',
  },
  {
    step: '06',
    title: 'Strategic CA Review & Board Call',
    desc: 'A 45-minute monthly review call with your assigned Senior FCA to discuss cash burn, working capital, tax savings, and growth plans.',
  },
];

export const PENALTY_AVOIDANCE = [
  {
    provision: 'Inaccurate Books & Tax Audit Disallowance',
    statutoryCost: 'Up to ₹1,50,000 penalty under Section 271A/271B',
    impact: 'Failure to maintain books under 44AA or delayed tax audit report under 44AB',
    bharatfilingSolution: 'Real-time bookkeeping and year-round audit-ready cloud ledgers',
  },
  {
    provision: 'Unreconciled GST Input Tax Credit (ITC)',
    statutoryCost: 'Up to 24% interest on erroneous ITC claims',
    impact: 'Mismatch between GSTR-2B and purchase registers leads to frozen credits',
    bharatfilingSolution: '100% monthly invoice-level GSTR-2B purchase reconciliation',
  },
  {
    provision: 'Cash Burn Blindspots & Sudden Insolvency',
    statutoryCost: 'Critical cash crunch & delayed payroll risk',
    impact: 'Lack of forward runway visibility forces emergency dilutive bridge rounds',
    bharatfilingSolution: '12-month rolling cash flow forecast updated every single month',
  },
  {
    provision: 'Investor Due Diligence Failure',
    statutoryCost: 'Term-sheet cancellation or valuation haircut',
    impact: 'Unverified financials and missing statutory receipts derail funding rounds',
    bharatfilingSolution: 'Institutional-grade data room and clean financial statements',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter Bookkeeping & MIS',
    badge: 'Popular for Seed Startups',
    price: 2999,
    originalPrice: 5999,
    period: 'per month',
    volume: 'Up to 50 Transactions / Month',
    description: 'Essential accounting and monthly financial reporting for early-stage companies and professional service firms.',
    features: [
      'Cloud accounting software setup (Zoho / Tally)',
      'Monthly bank & payment gateway reconciliation',
      'Monthly Profit & Loss and Balance Sheet',
      'Monthly GSTR-1 & GSTR-3B tax data preparation',
      'Monthly TDS deduction computation & challans',
      'Debtor & Creditor aging statement',
      'Dedicated Junior Accountant & Email Support',
    ],
    cta: 'Choose Starter Plan',
    popular: true,
  },
  {
    id: 'growth',
    name: 'Growth Virtual CFO',
    badge: 'Most Comprehensive',
    price: 6999,
    originalPrice: 12999,
    period: 'per month',
    volume: 'Up to 200 Transactions / Month',
    description: 'Comprehensive financial stewardship, cash flow forecasting, and monthly advisory for scaling businesses.',
    features: [
      'Everything in Starter Plan',
      'Up to 200 monthly transaction vouchers',
      '12-month rolling cash flow & runway model',
      'Unit economics & departmental budget tracking',
      'Vendor bill processing & batch payment files',
      'GSTR-2B purchase matching & ITC optimization',
      'Advance tax quarterly projection & planning',
      'Monthly 45-min strategic call with Senior FCA',
    ],
    cta: 'Choose Growth CFO',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Full Corporate CFO & Advisory',
    badge: 'Series A+ & Multi-Entity',
    price: 14999,
    originalPrice: 24999,
    period: 'per month',
    volume: 'Unlimited Transactions & Multi-Branch',
    description: 'Dedicated financial leadership, board room presentations, due diligence support, and cross-border accounting.',
    features: [
      'Everything in Growth Virtual CFO',
      'Unlimited transactions and multi-entity consolidation',
      'Investor quarterly MIS & Cap Table maintenance',
      'Financial due diligence audit representation',
      'ESOP pool planning & valuation coordination',
      'FEMA / Transfer Pricing & overseas tax advisory',
      'Weekly financial pulse calls with CFO Practice Head',
      'Direct WhatsApp access to Partner-level FCA',
    ],
    cta: 'Contact for Enterprise',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Abhishek Kulkarni',
    company: 'FinTrack Technologies Pvt Ltd',
    role: 'Founder & CEO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    review:
      'Hiring a full-time CFO was going to cost us ₹40 Lakhs a year. BharatFiling’s Virtual CFO practice set up our entire Zoho Books infrastructure, delivers crisp MIS by the 8th of every month, and helped us close our ₹4 Cr seed round with clean due diligence.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Pooja Venkatesh',
    company: 'Saffron Threads Apparel',
    role: 'Managing Director',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    review:
      'Reconciling multiple payment gateways and Amazon settlement sheets used to take 10 days every month. BharatFiling automated our reconciliations, fixed our inventory valuation, and optimized our working capital cycles.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Nitin Bansal',
    company: 'QuantLogix Solutions',
    role: 'Co-Founder & COO',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    review:
      'Their monthly advisory calls with the Senior Chartered Accountant are pure gold. They identified ₹3.5 Lakhs of missed input tax credits and helped restructure our SaaS contracts for international customers.',
    rating: 5,
  },
];

export const FAQS = [
  {
    question: 'What is a Virtual CFO service?',
    answer:
      'A Virtual CFO (Chief Financial Officer) provides high-level financial leadership, strategic tax planning, bookkeeping oversight, budgeting, cash flow forecasting, and statutory compliance on a flexible outsourced retainer basis at a fraction of the cost of a full-time in-house executive.',
  },
  {
    question: 'Which accounting software do you support?',
    answer:
      'We support all leading accounting and ERP platforms including Zoho Books, Tally Prime, Tally on Cloud, QuickBooks Online, Busy Accounting, SAP Business One, and custom ERPs via API feeds.',
  },
  {
    question: 'What financial reports do we receive every month?',
    answer:
      'Every month by the 10th, you receive: 1) Profit & Loss Statement (comparative with previous periods), 2) Balance Sheet, 3) Cash Flow Statement, 4) Accounts Receivable & Payable Aging, 5) GSTR-2B vs Books reconciliation, and 6) Runway and burn-rate report.',
  },
  {
    question: 'How do you handle daily bookkeeping and bills?',
    answer:
      'You can simply share invoices, bank statements, and bills via email, our secure client dashboard, or a dedicated WhatsApp folder. Our accountants record entries, attach digital vouchers, categorize expenses, and reconcile bank accounts on a rolling weekly schedule.',
  },
  {
    question: 'Does the Virtual CFO service include GST and TDS filing?',
    answer:
      'Yes. Our Virtual CFO retainers calculate and prepare monthly GSTR-1, GSTR-3B, and Challan ITNS 281 TDS payments, ensuring zero interest penalties and seamless tax compliance.',
  },
  {
    question: 'Can you assist us during fundraising or investor due diligence?',
    answer:
      'Absolutely. Our Growth and Enterprise plans include investor MIS preparation, historical data room structuring, financial model stress-testing, and direct representation with investor audit teams during financial due diligence.',
  },
  {
    question: 'How do we communicate with our assigned Senior CA / CFO?',
    answer:
      'You are paired with a dedicated Lead Accountant for day-to-day queries and a Senior Fellow Chartered Accountant (FCA) for strategic reviews. Communication is conducted via scheduled video calls, phone, email, and dedicated WhatsApp workspace channels.',
  },
  {
    question: 'What is the difference between an accountant and a Virtual CFO?',
    answer:
      'An accountant looks backward to record past historical transactions and tally books. A Virtual CFO looks forward: analyzing unit economics, optimizing cash runway, planning tax strategies, managing capital structure, and guiding the founders on business profitability.',
  },
  {
    question: 'Is our financial data safe and confidential?',
    answer:
      'Yes. BharatFiling operates an ISO 27001 certified platform with 256-bit SSL encryption. We sign mutual Non-Disclosure Agreements (NDAs) and follow strict role-based data isolation for all client financial records.',
  },
  {
    question: 'Can you help clean up previous messy accounting books?',
    answer:
      'Yes. If your books are outdated or have accumulated unreconciled balances, our team performs back-period ledger cleanup, prior-year adjustments, and reconciliations to bring your financial records up to date.',
  },
  {
    question: 'Can we switch plans as our transaction volume grows?',
    answer:
      'Yes! You can upgrade, downgrade, or customize your plan at any time with zero penalty or locked contracts.',
  },
  {
    question: 'How soon can we onboard and begin Virtual CFO services?',
    answer:
      'Onboarding begins within 24 hours of payment. Your assigned CFO conducts an initial discovery call, audits existing software access, and establishes the monthly reporting calendar immediately.',
  },
];

export const CFO_CHECKOUT = {
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
