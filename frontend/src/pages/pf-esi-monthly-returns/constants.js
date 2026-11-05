/**
 * Constants for PF & ESI Monthly Returns & Compliance Module
 * Based on EPFO Unified Portal & ESIC Portal statutory standards
 */

export const PF_ESI_HERO = {
  hindiNotice: 'Now you can read this page in Hindi. Change language to हिन्दी',
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'PF & ESI Monthly Return Filing & Compliance Online',
  cardTitle: 'PF & ESI Monthly Returns',
  bullets: [
    'Automated Monthly ECR (Electronic Challan cum Return) generation for EPFO.',
    'Flawless ESIC monthly contribution filing before the strict 15th deadline.',
    'Zero Section 14B damages & Section 7Q interest with automated UAN & IP linking.',
  ],
  guideLinkText: 'Complete guide on PF & ESI Monthly Filing',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'Compliance', href: '/services' },
    { title: 'PF & ESI Monthly Returns', href: '/services/pf-esi-monthly-returns' },
  ],
  pricingNote: {
    original: 1999,
    current: 999,
    unit: 'per month (up to 15 employees)',
  },
};

export const TRUSTED_PARTNERS = [
  { name: 'EPFO Unified Portal Integration', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' },
  { name: 'ESIC Shram Suvidha Verified', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'HDFC Corporate Salary Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  { name: 'ICICI iProcess Payroll Partner', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg' },
  { name: 'National Labour Law Advisory', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
  { name: 'Zoho Payroll Integration Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Zoho_Corporation_2019_logo.svg' },
];

export const CORE_FEATURES = [
  {
    id: 1,
    title: 'Monthly ECR Generation & Validation',
    desc: 'Automated wage calculation, A/c 1 (EPF), A/c 2 (Admin), A/c 10 (EPS), A/c 21 (EDLI), and A/c 22 split file with official EPFO portal checksum validation.',
    icon: 'FileSpreadsheet',
  },
  {
    id: 2,
    title: 'ESIC Monthly Contribution Filing',
    desc: 'Computation of 0.75% employee and 3.25% employer contributions on gross wages up to ₹21,000 with online challan generation before the 15th.',
    icon: 'ShieldCheck',
  },
  {
    id: 3,
    title: 'New Joinee UAN & IP Number Linking',
    desc: 'Instant Aadhaar-based UAN generation, member detail KYC upload, nomination seeding, and ESIC insurance number generation for new hires in 24 hours.',
    icon: 'Users',
  },
  {
    id: 4,
    title: 'Monthly Challan Preparation (TRRN & CRN)',
    desc: 'Direct generation of Temporary Return Reference Number (TRRN) for EPF and Challan Reference Number (CRN) for ESIC for 1-click corporate net banking payment.',
    icon: 'Calculator',
  },
  {
    id: 5,
    title: 'Exit Date Seeding & Settlement Audit',
    desc: 'Prompt Date of Exit (DOE) recording and reason marking on the EPFO portal for resigned staff to ensure hassle-free transfer or final PF settlement.',
    icon: 'RefreshCw',
  },
  {
    id: 6,
    title: 'Labour Law Inspection & Notice Desk',
    desc: 'Dedicated assistance by labor law advocates for 7A/14B EPFO show-cause notices, C-18 ESIC demand notices, and statutory inspection defense.',
    icon: 'Award',
  },
];

export const STATUTORY_HEADS = [
  {
    head: 'EPF Employee Share (A/c 1)',
    rate: '12% of Basic + DA',
    wageCap: 'Capped at ₹15,000/mo (Optional on higher wages)',
    description: 'Deducted from employee monthly wages and credited into the employee retirement provident fund corpus.',
    badge: 'Employee Deductible',
  },
  {
    head: 'EPS Employer Share (A/c 10)',
    rate: '8.33% of Basic + DA',
    wageCap: 'Capped at ₹1,250/mo (₹15,000 ceiling)',
    description: 'Employer contribution routed to Employee Pension Scheme to provide monthly lifelong post-retirement pension.',
    badge: 'Employer Funded',
  },
  {
    head: 'EPF Employer Balance (A/c 1)',
    rate: '3.67% of Basic + DA',
    wageCap: 'Balance of 12% total employer contribution',
    description: 'Remaining portion of 12% employer contribution credited into member EPF accumulation account.',
    badge: 'Employer Funded',
  },
  {
    head: 'EDLI & Admin Charges (A/c 2 & 21)',
    rate: '0.50% EDLI + 0.50% Admin',
    wageCap: 'Admin minimum ₹500/mo or ₹75/mo (non-functional)',
    description: 'Provides ₹7,00,000 term life insurance to employee families and covers EPFO administrative maintenance.',
    badge: 'Statutory Levy',
  },
  {
    head: 'ESIC Employee Contribution',
    rate: '0.75% of Gross Wages',
    wageCap: 'Applies to employees earning up to ₹21,000/mo',
    description: 'Mandatory health insurance deduction granting full medical care, sickness benefits, and maternity support.',
    badge: 'Employee Deductible',
  },
  {
    head: 'ESIC Employer Contribution',
    rate: '3.25% of Gross Wages',
    wageCap: 'Applies to employees earning up to ₹21,000/mo',
    description: 'Employer funded portion providing social security, disability compensation, and medical infrastructure.',
    badge: 'Employer Funded',
  },
];

export const WHO_NEEDS_PF_ESI = [
  {
    type: 'Establishments with 20+ Employees',
    reason: 'Mandatory EPF registration & monthly ECR filing under Section 1(3)(a) of the Employees Provident Funds Act, 1952.',
    icon: 'Building2',
  },
  {
    type: 'Establishments with 10+ Employees',
    reason: 'Mandatory ESIC coverage under Section 2(12) of ESI Act in implemented areas for staff earning up to ₹21,000/mo.',
    icon: 'Briefcase',
  },
  {
    type: 'Startups with Voluntary EPF Coverage',
    reason: 'Voluntary registration under Section 1(4) with mutual consent of employer and employees to offer competitive social benefits.',
    icon: 'Rocket',
  },
  {
    type: 'Factory, Retail & Hospitality Units',
    reason: 'High turnover shop-floor and service staff requiring prompt UAN generation, ESIC Pehchan cards, and monthly challan audits.',
    icon: 'Store',
  },
  {
    type: 'IT & Consulting Firms',
    reason: 'Comprehensive compliance ensuring zero 7A notices during client vendor audits and smooth executive background checks.',
    icon: 'Laptop',
  },
  {
    type: 'Manpower & Security Agencies',
    reason: 'Strict principal employer compliance requirements demanding monthly paid challans before client invoice clearances.',
    icon: 'ShieldCheck',
  },
];

export const COMPLIANCE_WORKFLOW = [
  {
    step: '01',
    title: 'Attendance & Wage Register Audit',
    desc: 'By the 5th of each month, our team ingests your monthly salary sheet, overtime, and leave records to determine eligible PF & ESI gross wages.',
  },
  {
    step: '02',
    title: 'New Member Seeding & KYC Check',
    desc: 'We verify Aadhaar, PAN, and bank details for new joinees, link existing UANs, and generate fresh ESIC Insurance Numbers (IP).',
  },
  {
    step: '03',
    title: 'ECR & ESIC Data Formulation',
    desc: 'We structure the text formatted ECR file with correct NCP (Non-Contributing Period) days and compute wage-wise ESIC contribution.',
  },
  {
    step: '04',
    title: 'Portal Upload & Checksum Verification',
    desc: 'We upload files to the EPFO Unified Portal and ESIC Portal by the 10th to generate official TRRN and Challan Reference Numbers (CRN).',
  },
  {
    step: '05',
    title: 'Challan Payment Advice',
    desc: 'We deliver pre-filled challan advice to your finance team for seamless one-click internet banking payment before the 15th deadline.',
  },
  {
    step: '06',
    title: 'Receipts & Compliance Dossier',
    desc: 'We capture paid payment confirmation receipts, update member passbooks, and deliver monthly compliance certificates for your records.',
  },
];

export const PENALTY_AVOIDANCE = [
  {
    provision: 'Section 14B Penal Damages (EPFO)',
    statutoryCost: 'Up to 25% per annum of default amount',
    impact: 'Graded damages: 5% (<2 mos), 10% (2-4 mos), 15% (4-6 mos), 25% (>6 mos)',
    bharatfilingSolution: 'Strict pre-15th filing schedule preventing any delayed damage notices',
  },
  {
    provision: 'Section 7Q Simple Interest (EPFO)',
    statutoryCost: '12% per annum simple interest',
    impact: 'Compulsory interest computed from the due date until the actual date of payment',
    bharatfilingSolution: 'Automated 10th-of-month challan release ensures on-time payment',
  },
  {
    provision: 'Section 85 ESIC Non-Filing Penalties',
    statutoryCost: 'Interest at 12% p.a. + Damages up to 25%',
    impact: 'Revenue recovery warrants, bank account attachment, and prosecution of directors',
    bharatfilingSolution: 'Direct liaison with local ESIC branch to resolve notices instantly',
  },
  {
    provision: 'Income Tax Sec 36(1)(va) Disallowance',
    statutoryCost: '100% employee contribution added to taxable profit',
    impact: 'Late deposit past due date permanently disallows business expense deduction',
    bharatfilingSolution: 'Guaranteed deposit within statutory window to protect tax write-off',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter PF & ESI Retainer',
    badge: 'Popular for Small Teams',
    price: 999,
    originalPrice: 1999,
    period: 'per month',
    volume: 'Up to 15 Employees / Month',
    description: 'Perfect for startups and small establishments with standard monthly payroll and low turnover.',
    features: [
      'Monthly ECR preparation & EPFO portal filing',
      'Monthly ESIC contribution filing & challan generation',
      'Generation of TRRN and CRN payment challans',
      'New joinee UAN generation & Aadhaar seeding (up to 3/mo)',
      'Date of Exit marking for outgoing staff',
      'Monthly paid challan receipts dossier',
      'WhatsApp compliance manager assistance',
    ],
    cta: 'Choose Starter Retainer',
    popular: true,
  },
  {
    id: 'growth',
    name: 'Growth Establishment',
    badge: 'Most Comprehensive',
    price: 1999,
    originalPrice: 3499,
    period: 'per month',
    volume: 'Up to 50 Employees / Month',
    description: 'End-to-end statutory management for expanding teams with higher headcount changes and multiple branches.',
    features: [
      'Everything in Starter Retainer',
      'Up to 50 employee records per month',
      'Unlimited UAN generation & KYC problem resolution',
      'ESIC Pehchan digital card generation for all staff',
      'Joint declaration submission for member name/DOB errors',
      'Monthly wage audit for Section 36(1)(va) compliance',
      'Half-yearly ESIC Form 5 return compilation',
      'Priority phone support with Senior Labor Law Advocate',
    ],
    cta: 'Choose Growth Retainer',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Corporate & Multi-Branch Retainer',
    badge: 'Enterprise & Multi-Establishment',
    price: 3999,
    originalPrice: 7999,
    period: 'per month',
    volume: '50 to 150+ Employees / Month',
    description: 'Full-spectrum labor compliance with principal employer certification and audit representation.',
    features: [
      'Everything in Growth Establishment',
      'Multiple establishment codes & sub-code branch management',
      'Contractor & vendor PF/ESI compliance audit',
      'Principal employer monthly compliance certificate (Form 21A)',
      'Handling EPFO 7A/7B proceedings & inspection representation',
      'Resolution of legacy arrears and recovery notices',
      'Dedicated Labor Law Partner & SLA response within 2 hours',
    ],
    cta: 'Contact for Enterprise',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Suresh Narayanan',
    company: 'Zenith Logistics & Transport LLP',
    role: 'Managing Partner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    review:
      'Our previous payroll clerk regularly missed the 15th EPFO deadline, racking up Section 14B penalty notices from the Regional PF Commissioner. BharatFiling took charge, cleared our backlogged ECRs, and sends us TRRN challans on the 8th of every month. Zero default in 2 years!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Meenakshi Sundaram',
    company: 'FreshBites Cloud Kitchens',
    role: 'Head of Human Resources',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    review:
      'With over 35 delivery riders and kitchen workers, managing new UAN generation and ESIC insurance cards was a nightmare. BharatFiling handles our full onboarding and monthly returns effortlessly for just ₹1,999/mo.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Kunal Singhania',
    company: 'Apex Tech Labs Pvt Ltd',
    role: 'Chief Executive Officer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    review:
      'Their team guided us on the voluntary EPF coverage scheme and helped structure our CTC without employee friction. Clean execution and responsive labor law experts.',
    rating: 5,
  },
];

export const FAQS = [
  {
    question: 'What is the monthly deadline to file and pay PF and ESI returns?',
    answer:
      'Both EPF (Employees Provident Fund) and ESIC (Employees State Insurance) monthly returns and payments must be completed on or before the 15th day of the subsequent month (e.g., April contributions must be deposited by May 15th).',
  },
  {
    question: 'When is PF registration mandatory for a company in India?',
    answer:
      'Under the Employees Provident Funds and Miscellaneous Provisions Act, 1952, EPF registration is mandatory for any commercial establishment employing 20 or more persons. Any establishment employing fewer than 20 persons can also register voluntarily under Section 1(4).',
  },
  {
    question: 'When is ESIC registration mandatory for an establishment?',
    answer:
      'Under the ESI Act, 1948, ESIC registration is mandatory for non-seasonal factories and establishments employing 10 or more persons (20 or more in Maharashtra and a few specific sectors) located in implemented geographic areas, where employees draw gross wages up to ₹21,000 per month (₹25,000 for persons with disabilities).',
  },
  {
    question: 'What is an ECR (Electronic Challan cum Return)?',
    answer:
      'An ECR is a digitally structured monthly statement uploaded to the EPFO Unified Portal that itemizes member-wise details including gross wages, EPF wages, EPS wages, EDLI wages, employee share (12%), employer shares (3.67% and 8.33%), and Non-Contributing Period (NCP) days. Once validated, it generates a TRRN challan.',
  },
  {
    question: 'What is TRRN and how is payment completed?',
    answer:
      'TRRN stands for Temporary Return Reference Number. Once the monthly ECR file is uploaded and approved on the EPFO Unified Portal, a 13-digit TRRN is generated. The employer logs into their authorized corporate internet banking portal, selects EPFO e-payment, quotes the TRRN, and authorizes payment.',
  },
  {
    question: 'What happens if our company misses the 15th monthly deadline?',
    answer:
      'Late payment attracts: 1) Section 7Q simple interest at 12% per annum, 2) Section 14B penal damages ranging from 5% to 25% per annum depending on the duration of default, and 3) Permanent disallowance of employee contributions under Section 36(1)(va) of the Income Tax Act.',
  },
  {
    question: 'Can you generate UAN for employees who never had a PF number before?',
    answer:
      'Yes. Our team generates fresh 12-digit Universal Account Numbers (UAN) for new hires using their Aadhaar details through the employer portal and activates their member profile in 24 hours.',
  },
  {
    question: 'How do we link an employee who already has an existing UAN from their previous employer?',
    answer:
      'We simply require the existing UAN, full legal name, date of birth, and date of joining. We link the member profile to your establishment ID on the EPFO portal so contributions seamlessly aggregate without creating duplicate UANs.',
  },
  {
    question: 'What is an ESIC Pehchan Card and how do workers get it?',
    answer:
      'The Pehchan Card is an e-Pehchan certificate issued via the ESIC Portal bearing the employee’s Insurance Number (IP), family details, and dispensary allocation. We generate and deliver printable e-Pehchan cards immediately upon onboarding.',
  },
  {
    question: 'What documents are required to start monthly PF & ESI return filing?',
    answer:
      'We require: 1) Your establishment EPFO & ESIC portal usernames and passwords, 2) Monthly wage/salary sheet with attendance records, and 3) New joinee details (Aadhaar, PAN, date of birth, date of joining).',
  },
  {
    question: 'Can you help resolve past EPFO 7A inquiry notices or damages?',
    answer:
      'Yes. Our team includes senior labor law advocates who represent employers in Section 7A (assessment of dues), Section 7B (review), and Section 14B/7Q (damages and interest) proceedings before the Regional PF Commissioner.',
  },
  {
    question: 'Does BharatFiling handle both EPF and ESIC together under one plan?',
    answer:
      'Yes! All our monthly plans (Starter ₹999/mo, Growth ₹1,999/mo, Enterprise ₹3,999/mo) include complete end-to-end management for BOTH EPFO and ESIC monthly returns without hidden fees.',
  },
];

export const PF_ESI_CHECKOUT = {
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
