/**
 * Constants for Secretarial Audit & Statutory Registers Module
 * Based on Companies Act 2013, ICSI Secretarial Standards SS-1 & SS-2, and MCA guidelines
 */

export const SECRETARIAL_HERO = {
  hindiNotice: 'Now you can read this page in Hindi. Change language to हिन्दी',
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Secretarial Audit & Statutory Registers Online in India',
  cardTitle: 'Secretarial Audit & Registers',
  bullets: [
    'Comprehensive MCA Secretarial Audit under Section 204 in Form MR-3 by a Practising CS.',
    'Maintenance of mandatory Statutory Registers (MGT-1, MBP-2, MBP-4, Form SH-4, and BEN-3).',
    'Board meeting minutes & AGM resolution drafting compliant with ICSI SS-1 and SS-2.',
  ],
  guideLinkText: 'Complete guide on Secretarial Audit & Statutory Registers',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'Compliance', href: '/services' },
    { title: 'Secretarial Audit & Registers', href: '/services/secretarial-audit-registers' },
  ],
  pricingNote: {
    original: 12999,
    current: 6999,
    unit: 'per year / annual secretarial audit',
  },
};

export const TRUSTED_PARTNERS = [
  { name: 'ICSI Practising CS Network', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' },
  { name: 'MCA V3 Portal Integration Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'HDFC Escrow & Custody Services', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  { name: 'ICICI Secretarial Banking Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg' },
  { name: 'National Stock Exchange SME Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
  { name: 'Bombay Stock Exchange Startups Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Zoho_Corporation_2019_logo.svg' },
];

export const CORE_FEATURES = [
  {
    id: 1,
    title: 'Secretarial Audit Report (Form MR-3)',
    desc: 'Mandatory audit under Section 204 verifying compliance with the Companies Act 2013, SEBI Regulations, FEMA, FDI guidelines, and industry-specific statutes.',
    icon: 'FileSpreadsheet',
  },
  {
    id: 2,
    title: 'Mandatory Statutory Registers Maintenance',
    desc: 'Creation and digital updating of Section 88 Register of Members (MGT-1), Directors & KMP (DIR-12), Loans & Investments (MBP-2), and Related Party Contracts (MBP-4).',
    icon: 'Calculator',
  },
  {
    id: 3,
    title: 'Minutes Drafting (ICSI SS-1 & SS-2)',
    desc: 'Drafting compliant Board Meeting minutes, Committee resolutions, and Annual General Meeting (AGM) proceedings within strict 30-day statutory timeframes.',
    icon: 'FileText',
  },
  {
    id: 4,
    title: 'Significant Beneficial Ownership (BEN-1 to BEN-4)',
    desc: 'Section 90 SBO audit, issuance of notices in Form BEN-4, declaration filing in BEN-2, and maintenance of Register of Significant Beneficial Owners in Form BEN-3.',
    icon: 'ShieldCheck',
  },
  {
    id: 5,
    title: 'Corporate Share Transfer & Allotment Audit',
    desc: 'Verification of share certificates, stamp duty franking on Form SH-4 transfers, Form PAS-3 return of allotment, and dematerialization compliance (Form PAS-6).',
    icon: 'RefreshCw',
  },
  {
    id: 6,
    title: 'ROC Show-Cause Notice & Compounding Desk',
    desc: 'Representation before the Registrar of Companies (ROC) and Regional Director (RD) for compounding of past procedural non-compliances and disqualification removal.',
    icon: 'Award',
  },
];

export const STATUTORY_REGISTERS_LIST = [
  {
    register: 'Register of Members (MGT-1)',
    section: 'Section 88(1)(a)',
    description: 'Contains folio-wise details of equity & preference shareholders, dates of becoming member, and shares transferred.',
    mandatoryFor: 'All Companies (Private & Public)',
  },
  {
    register: 'Register of Directors & KMP (DIR-12)',
    section: 'Section 170(1)',
    description: 'Records DIN, full legal names, residential addresses, changes in designation, and security holdings of all officers.',
    mandatoryFor: 'All Companies',
  },
  {
    register: 'Register of Contracts & Arrangements (MBP-4)',
    section: 'Section 189(1)',
    description: 'Discloses transactions with related parties, director-interested firms, contracts entered under Section 184 and 188.',
    mandatoryFor: 'All Companies',
  },
  {
    register: 'Register of Loans, Guarantees & Securities (MBP-2)',
    section: 'Section 186(9)',
    description: 'Tracks inter-corporate loans, financial guarantees, and equity acquisitions made by the company.',
    mandatoryFor: 'All Companies',
  },
  {
    register: 'Register of Significant Beneficial Owners (BEN-3)',
    section: 'Section 90(4)',
    description: 'Records individuals holding 10% or more indirect voting rights, dividend entitlements, or significant influence.',
    mandatoryFor: 'All Corporate Entities',
  },
  {
    register: 'Register of Charges & Debentures (CHG-7 / MGT-2)',
    section: 'Section 85(1) & 88(1)(b)',
    description: 'Details of all hypothecations, banking liens, mortgages created on corporate assets, and debenture holders.',
    mandatoryFor: 'All Companies with Bank Credit / Debentures',
  },
];

export const WHO_NEEDS_SECRETARIAL = [
  {
    type: 'Private Limited Companies (All Sizes)',
    reason: 'Mandatory under Section 88 & 170 to maintain updated statutory registers at the registered office; failure risks ₹3,00,000+ fines.',
    icon: 'Building2',
  },
  {
    type: 'Companies Seeking Venture Capital / PE',
    reason: 'Investors demand certified statutory registers, clean minute books, and Form PAS-6 demat records during legal due diligence.',
    icon: 'Rocket',
  },
  {
    type: 'Public Companies (Listed & Unlisted)',
    reason: 'Mandatory annual Secretarial Audit under Section 204 if paid-up capital ≥ ₹50 Cr or annual turnover ≥ ₹250 Cr.',
    icon: 'Briefcase',
  },
  {
    type: 'Companies with Bank Borrowings ≥ ₹100 Cr',
    reason: 'Mandatory Secretarial Audit under Companies (Appointment & Remuneration of Managerial Personnel) Rules, 2014.',
    icon: 'Landmark',
  },
  {
    type: 'Startups Planning ESOPs or M&A',
    reason: 'Accurate maintenance of Register of Employee Stock Options (Form SH-6) and share transfers (SH-4) is essential.',
    icon: 'Laptop',
  },
  {
    type: 'Subsidiaries of Foreign Entities',
    reason: 'Strict adherence to Indian secretarial standards and FEMA compliance for overseas reporting and annual audit clearances.',
    icon: 'Globe',
  },
];

export const COMPLIANCE_WORKFLOW = [
  {
    step: '01',
    title: 'Secretarial Gap Audit & Ingestion',
    desc: 'Our Practising CS examines your MOA, AOA, Certificate of Incorporation, past ROC filings, and MCA master data to identify missing registers.',
  },
  {
    step: '02',
    title: 'Statutory Register Reconstruction',
    desc: 'We draft and balance Section 88 Member Registers (MGT-1), Director disclosures (DIR-8 / MBP-1), and Loans Registers (MBP-2).',
  },
  {
    step: '03',
    title: 'Board & Shareholder Minutes Structuring',
    desc: 'We formulate structured minute books for all board meetings and AGM/EGM proceedings compliant with ICSI Secretarial Standards (SS-1 and SS-2).',
  },
  {
    step: '04',
    title: 'SBO & Dematerialization Verification',
    desc: 'We verify compliance with Significant Beneficial Ownership rules (Form BEN-2) and private company share dematerialization (Rule 9B).',
  },
  {
    step: '05',
    title: 'Secretarial Audit Report Drafting (MR-3)',
    desc: 'Our Practising Company Secretary conducts the formal compliance audit and issues an official Secretarial Audit Report with certified opinions.',
  },
  {
    step: '06',
    title: 'Dossier Delivery & Annual Sign-Off',
    desc: 'We deliver digitally bound, print-ready statutory registers and board resolutions along with a CS certification memo for your statutory auditors.',
  },
];

export const PENALTY_AVOIDANCE = [
  {
    provision: 'Section 88 Penalty for Non-Maintenance of Registers',
    statutoryCost: 'Company: ₹3,00,000 | Officer in Default: ₹50,000',
    impact: 'Continuing failure attracts additional daily fines of ₹1,000 per day',
    bharatfilingSolution: '100% compliant statutory registers maintained in digital & physical formats',
  },
  {
    provision: 'Section 204 Failure in Secretarial Audit',
    statutoryCost: 'Fine of ₹2,00,000 to ₹5,00,000 on the Company & Officers',
    impact: 'Non-annexation of Secretarial Audit Report (MR-3) invalidates Board Report',
    bharatfilingSolution: 'Official MR-3 audit executed by a Fellow Practising Company Secretary',
  },
  {
    provision: 'Section 90 Significant Beneficial Ownership Default',
    statutoryCost: 'Fine of ₹1,00,000 to ₹10,00,000 + Daily fines',
    impact: 'High-risk MCA scrutiny trigger leading to freezing of voting rights & dividends',
    bharatfilingSolution: 'Full BEN-1 / BEN-2 reconciliation and compliant BEN-3 register',
  },
  {
    provision: 'Section 118 Non-Compliance with Secretarial Standards',
    statutoryCost: 'Company: ₹25,000 | Officer in Default: ₹5,000',
    impact: 'Improper minutes invalidate board resolutions and transactions in legal challenges',
    bharatfilingSolution: 'Minutes strictly drafted per ICSI SS-1 and SS-2 procedural guidelines',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Statutory Registers & Gap Audit',
    badge: 'Popular for Private Limited',
    price: 6999,
    originalPrice: 12999,
    period: 'per year',
    volume: 'Private Limited Companies up to ₹5 Cr Turnover',
    description: 'Complete maintenance of all mandatory statutory registers, director disclosures, and secretarial gap review.',
    features: [
      'Drafting of Register of Members (MGT-1)',
      'Drafting of Register of Directors & KMP (DIR-12)',
      'Drafting of Register of Contracts (MBP-4)',
      'Drafting of Register of Loans & Guarantees (MBP-2)',
      'SBO Register in Form BEN-3',
      'Annual secretarial compliance gap report',
      'Dedicated Company Secretary Consultation (30 mins)',
    ],
    cta: 'Choose Starter Audit',
    popular: true,
  },
  {
    id: 'growth',
    name: 'Complete Secretarial & Minutes Retainer',
    badge: 'Comprehensive Compliance',
    price: 14999,
    originalPrice: 24999,
    period: 'per year',
    volume: 'Expanding Private & Unlisted Entities',
    description: 'End-to-end secretarial stewardship including full-year Board & AGM minutes drafting and share transfer Franking audit.',
    features: [
      'Everything in Starter Audit',
      'Drafting of 4 Board Meeting Minutes (SS-1 Compliant)',
      'Drafting of Annual General Meeting (AGM) Minutes & Notice',
      'Drafting of Director Annual Disclosures (DIR-8 & MBP-1)',
      'Share transfer audit (Form SH-4 stamp duty verification)',
      'Private company share dematerialization review (Rule 9B)',
      'Priority phone & video conference with Practising CS Partner',
    ],
    cta: 'Choose Complete Retainer',
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Comprehensive Secretarial Audit (MR-3)',
    badge: 'Large Corporate & Audit Mandate',
    price: 29999,
    originalPrice: 49999,
    period: 'per year',
    volume: 'Turnover > ₹50 Cr or Listed Entities',
    description: 'Formal Secretarial Audit under Section 204 with independent Practising Company Secretary certification in Form MR-3.',
    features: [
      'Everything in Complete Retainer',
      'Formal Secretarial Audit under Section 204 of Companies Act',
      'Issuance of Secretarial Audit Report in Form MR-3',
      'Audit of FEMA, FDI, and sectoral regulatory compliances',
      'Representation before ROC / RD for compounding if required',
      'Verification of Board Composition & Independent Directors',
      'Dedicated Senior FCS Partner & Audit Sign-Off',
    ],
    cta: 'Contact for Enterprise Audit',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Harish Chandra',
    company: 'Nexus Precision Auto Parts Pvt Ltd',
    role: 'Managing Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    review:
      'During our Series A due diligence, the investor counsel raised serious red flags because our statutory registers had not been updated since incorporation 4 years ago. BharatFiling reconstructed all our registers in 7 days, drafted our minute books, and issued clean CS certificates. Saved our deal!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Anupama Sengupta',
    company: 'BioPharma Health Sciences Ltd',
    role: 'Company Secretary & Compliance Officer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    review:
      'We engaged BharatFiling for our Section 204 Secretarial Audit in Form MR-3. Their team’s knowledge of MCA V3 portal filings and ICSI Secretarial Standards SS-1/SS-2 is unmatched. Highly professional and thorough.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Vikram Malhotra',
    company: 'Skyline Real Estate Ventures',
    role: 'Chief Operating Officer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    review:
      'Their MBP-4 and SBO BEN-3 register maintenance resolved an open ROC scrutiny inquiry for us within 15 days. Clean documentation and great responsiveness.',
    rating: 5,
  },
];

export const FAQS = [
  {
    question: 'What are Statutory Registers and why are they mandatory?',
    answer:
      'Statutory Registers are legally mandated records that every company registered in India must maintain at its registered office under the Companies Act, 2013. They record ownership, governance, borrowings, and contracts: including the Register of Members (Section 88), Register of Directors & KMP (Section 170), Register of Loans & Guarantees (Section 186), and Register of Contracts (Section 189).',
  },
  {
    question: 'What is a Secretarial Audit under Section 204?',
    answer:
      'A Secretarial Audit is an independent compliance audit conducted by a Practising Company Secretary (PCS) to evaluate whether a company complies with the provisions of various corporate laws, including the Companies Act, SEBI regulations, SCRA, Depositories Act, FEMA, and other industry-specific regulations. The auditor issues a formal Secretarial Audit Report in Form MR-3.',
  },
  {
    question: 'Who is required to undergo a mandatory Secretarial Audit?',
    answer:
      'Under Section 204 and Rule 9 of Companies (Appointment & Remuneration of Managerial Personnel) Rules, 2014, Secretarial Audit is mandatory for: 1) Every listed company, 2) Every public company having paid-up share capital ≥ ₹50 Crore, 3) Every public company having turnover ≥ ₹250 Crore, and 4) Every company having outstanding loans or borrowings from banks/financial institutions ≥ ₹100 Crore.',
  },
  {
    question: 'Can private limited companies maintain statutory registers electronically?',
    answer:
      'Yes. Under Section 88 and the Companies (Management and Administration) Rules, 2014, companies can maintain statutory registers in electronic form, provided the records are securely stored, timestamped, tamper-proof, and easily retrievable for inspection.',
  },
  {
    question: 'What are ICSI Secretarial Standards SS-1 and SS-2?',
    answer:
      'Issued by the Institute of Company Secretaries of India (ICSI) and notified under Section 118(10) of the Companies Act, SS-1 governs meetings of the Board of Directors (notice, agenda, quorum, minutes), while SS-2 governs General Meetings (AGM and EGM). Compliance with both is mandatory for all companies.',
  },
  {
    question: 'What happens if a company fails to maintain statutory registers?',
    answer:
      'Under Section 88(5), failure to maintain registers attracts a penalty of ₹3,00,000 on the company and ₹50,000 on every officer who is in default, with continuing daily fines of ₹1,000 per day during which the default continues.',
  },
  {
    question: 'What is Significant Beneficial Ownership (SBO) and Form BEN-3?',
    answer:
      'Under Section 90, every individual who directly or indirectly holds ≥ 10% shares, voting rights, or right to receive dividends in a company is a Significant Beneficial Owner (SBO). The company must maintain a Register of SBOs in Form BEN-3 and file details in Form BEN-2 with the ROC.',
  },
  {
    question: 'Can BharatFiling reconstruct missing statutory registers from past years?',
    answer:
      'Yes. If your company never maintained registers or lost previous physical binders, our secretarial team analyzes your incorporation records, annual returns (MGT-7), financial statements, and board minutes to reconstruct complete statutory registers from the date of incorporation.',
  },
  {
    question: 'What documents are required to initiate our Secretarial Audit & Register review?',
    answer:
      'We require: 1) MOA and AOA, 2) Past filed MCA forms (MGT-7, AOC-4, DIR-12, PAS-3, SH-7), 3) Existing minute books (if any), 4) Current list of shareholders and directors, and 5) Financial statements for the financial years under review.',
  },
  {
    question: 'How long does it take to prepare and deliver the statutory registers?',
    answer:
      'Standard statutory register drafting and reconstruction takes 10 to 15 working days. Formal Secretarial Audit (Form MR-3) for eligible companies takes 15 to 25 working days depending on transaction volume.',
  },
  {
    question: 'Do we get a formal certificate signed by a Practising Company Secretary (PCS)?',
    answer:
      'Yes! All our secretarial audit reports and compliance gap reviews are verified, certified, and digitally signed by an Associate or Fellow Practising Company Secretary holding a valid Certificate of Practice (COP) from the ICSI.',
  },
  {
    question: 'Can you help with private company share dematerialization (Rule 9B)?',
    answer:
      'Yes. MCA has mandated that all private companies (except small companies) must dematerialize their securities. We facilitate ISIN generation with NSDL/CDSL, RTA appointment, and filing of half-yearly Form PAS-6.',
  },
];

export const SECRETARIAL_CHECKOUT = {
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
