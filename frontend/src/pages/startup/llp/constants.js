/**
 * Constants for LLP Registration Module (Limited Liability Partnership)
 * Governed under the Limited Liability Partnership Act, 2008 & MCA Rules.
 * 1:1 Parity with Vakilsearch / Zolvit LLP Registration specifications.
 */

export const LLP_HERO = {
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'LLP Registration in India (Limited Liability Partnership)',
  bullets: [
    'Register your LLP with expert guidance from trusted professionals. T&C*',
    'Get started at just ₹999 + Govt Fee. Clear pricing, no surprises.',
    'Enjoy a smooth and error-free process to protect your business.',
    'Get fast, reliable support for your hassle-free LLP registration.',
  ],
  quickLinks: [
    { id: 'video', label: 'Know about LLP registration in 60 sec', icon: 'Play' },
    { id: 'sample', label: 'View Sample Certificate', icon: 'FileText' },
    { id: 'pricing', label: 'View Package', icon: 'Package' },
  ],
  stats: [
    { label: 'LLPs Registered', value: '50,000+' },
    { label: 'Client Rating', value: '4.9/5' },
    { label: 'Turnaround Time', value: '7-10 Days' },
    { label: 'MCA Approved', value: '100% Online' },
  ],
};

export const TRUSTED_PARTNERS = [
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Axis Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg' },
  { name: 'GlobalLinker', logo: 'https://d2q79iu7y44aq9.cloudfront.net/globallinker/images/gl-logo.png' },
  { name: 'Flipkart', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg' },
  { name: 'Yes Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'PayU', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/PayU_logo.svg' },
  { name: 'Payoneer', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Payoneer_logo.svg' },
  { name: 'E-Cell', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
  { name: 'Digital Showroom', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-store-1780512-1514197.png' },
  { name: 'Tata Tele Business', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg' },
];

export const LLP_BENEFITS = [
  {
    title: 'Limited Liability Protection',
    desc: 'Each partner’s personal assets are 100% safeguarded. A partner is never liable for the independent acts, debts, or gross negligence of other partners.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Separate Legal Entity',
    desc: 'An LLP is an independent juridical person with perpetual succession. It holds property, signs agreements, and can sue or be sued in its corporate name.',
    icon: 'Building2',
  },
  {
    title: 'Zero Minimum Capital Requirement',
    desc: 'Founders can incorporate an LLP with zero statutory minimum capital. Even a nominal capital contribution of ₹1,000 is legally acceptable.',
    icon: 'Coins',
  },
  {
    title: 'Lower Compliance & Audit Exemption',
    desc: 'Unlike Private Limited companies, an LLP requires NO statutory audit unless annual turnover exceeds ₹40 Lakhs or partner contribution exceeds ₹25 Lakhs.',
    icon: 'FileCheck',
  },
  {
    title: 'No Dividend Distribution Tax',
    desc: 'Profits distributed among partners are completely exempt from tax in the hands of the partners under Section 10(2A) of the Income Tax Act.',
    icon: 'Percent',
  },
  {
    title: 'Flexible Internal Agreement',
    desc: 'Mutual rights, operational duties, profit-sharing ratios, voting quotas, and exit clauses are governed entirely by a customizable LLP Agreement.',
    icon: 'Scale',
  },
];

export const LLP_VS_OTHERS = [
  {
    feature: 'Governing Legislation',
    llp: 'Limited Liability Partnership Act, 2008',
    pvtLtd: 'Companies Act, 2013',
    traditional: 'Indian Partnership Act, 1932',
  },
  {
    feature: 'Legal Status of Entity',
    llp: 'Separate legal entity registered with MCA (7-digit LLPIN)',
    pvtLtd: 'Separate corporate entity registered with MCA (21-digit CIN)',
    traditional: 'Not a separate legal entity; partners & firm are identical',
  },
  {
    feature: 'Personal Liability of Partners',
    llp: 'Strictly limited to the agreed capital contribution',
    pvtLtd: 'Strictly limited to unpaid share capital held',
    traditional: 'Unlimited; joint and several liability extending to personal property',
  },
  {
    feature: 'Number of Members/Partners',
    llp: 'Minimum 2 partners, NO upper ceiling limit',
    pvtLtd: 'Minimum 2, Maximum 200 shareholders',
    traditional: 'Minimum 2, Maximum 50 partners',
  },
  {
    feature: 'Statutory Annual Audit',
    llp: 'Exempt unless turnover > ₹40L or capital > ₹25L',
    pvtLtd: 'Mandatory every financial year irrespective of turnover',
    traditional: 'Tax audit only if turnover exceeds ₹1 Cr / ₹2 Cr',
  },
  {
    feature: 'Board Meetings & AGM Mandatory?',
    llp: 'No statutory requirement for board meetings or AGM',
    pvtLtd: 'Mandatory 4 Board Meetings per year + 1 AGM',
    traditional: 'No legal meeting requirements',
  },
  {
    feature: 'Venture Capital & Equity Funding',
    llp: 'Internal capital & debt only; cannot issue ESOPs or equity shares',
    pvtLtd: 'Ideal for raising VC, Angel, and private equity investments',
    traditional: 'Strictly restricted to partner capital and commercial loans',
  },
  {
    feature: 'Annual Filings with ROC',
    llp: 'Only Form 11 (Annual Return) & Form 8 (Statement of Accounts)',
    pvtLtd: 'Form AOC-4 (Financials), MGT-7 (Annual Return) & DIR-3 KYC',
    traditional: 'No ROC filing; only annual Income Tax return (ITR-5)',
  },
];

export const DOCUMENTS_REQUIRED = [
  {
    category: 'Designated Partners (Min. 2)',
    items: [
      { name: 'PAN Card Copy', desc: 'Permanent Account Number mandatory for all Indian designated partners.' },
      { name: 'Identity Proof', desc: 'Aadhaar Card, Passport, Voter ID, or Driving License copy.' },
      { name: 'Address Proof (Recent)', desc: 'Bank Statement, Electricity Bill, or Mobile Bill (not older than 2 months).' },
      { name: 'Passport Size Photos', desc: '2 recent colored passport photographs for digital documentation.' },
    ],
  },
  {
    category: 'Registered Business Office',
    items: [
      { name: 'Utility Bill Proof', desc: 'Electricity, Gas, or Water bill of office premises (less than 2 months old).' },
      { name: 'No Objection Certificate (NOC)', desc: 'Signed declaration from property owner permitting commercial address usage.' },
      { name: 'Rent Agreement / Title Deed', desc: 'Registered lease deed or municipal property tax receipt copy.' },
      { name: 'Jurisdictional ROC Details', desc: 'State and postal pincode mapping for jurisdictional RoC filing.' },
    ],
  },
  {
    category: 'Digital Signatures & DPIN',
    items: [
      { name: 'Class-3 DSC with Token', desc: 'Class-3 Digital Signature Certificate for signing electronic FiLLiP forms.' },
      { name: 'DPIN / DIN Allotment', desc: 'Designated Partner Identification Number generated via SPICe+ / FiLLiP.' },
      { name: 'Form 9 Consent Letters', desc: 'Signed consent of every designated partner to act in fiduciary capacity.' },
      { name: 'Subscriber Sheet Signature', desc: 'Digitally executed subscription agreement of capital contributions.' },
    ],
  },
  {
    category: 'LLP Agreement (Form 3)',
    items: [
      { name: 'Capital Contribution Details', desc: 'Percentage contribution and initial funding commitments of each partner.' },
      { name: 'Profit & Loss Sharing Ratio', desc: 'Contractual profit and remuneration split among designated partners.' },
      { name: 'State Non-Judicial Stamp Paper', desc: 'State-specific non-judicial stamp paper valuation based on capital.' },
      { name: 'Notary Attestation', desc: 'Notarized execution of LLP Agreement before submission on MCA portal.' },
    ],
  },
];

export const REGISTRATION_PROCESS_STEPS = [
  {
    step: '01',
    title: 'DSC & Name Reservation (RUN-LLP)',
    days: 'Day 1',
    desc: 'We procure Class-3 Digital Signature Certificates (DSC) for partners and submit up to 2 unique proposed names on the MCA RUN-LLP portal.',
  },
  {
    step: '02',
    title: 'DPIN & Document Compilation',
    days: 'Day 2',
    desc: 'Our legal team prepares Form 9 consents, subscriber sheets, and KYC documentation to generate Designated Partner Identification Numbers (DPIN).',
  },
  {
    step: '03',
    title: 'FiLLiP Incorporation Form Filing',
    days: 'Day 3-4',
    desc: 'Submission of the unified FiLLiP (Form for incorporation of Limited Liability Partnership) with the jurisdictional Registrar of Companies (RoC).',
  },
  {
    step: '04',
    title: 'Certificate of Incorporation (COI) & PAN/TAN',
    days: 'Day 5-7',
    desc: 'RoC approves the application and issues the Certificate of Incorporation containing your 7-digit LLPIN, alongside corporate PAN and TAN.',
  },
  {
    step: '05',
    title: 'Drafting LLP Agreement & Form 3 Filing',
    days: 'Day 7-10',
    desc: 'We draft your customized LLP Agreement, get it executed on state stamp paper, and file Form 3 on the MCA portal within the statutory 30-day window.',
  },
];

export const STATE_STAMP_DUTY = [
  { state: 'Maharashtra', stampDuty: '1% of Capital (Min ₹500, Max ₹15,000)', authority: 'e-SBTR / GRAS Portal', popular: true },
  { state: 'Delhi NCR', stampDuty: 'Fixed ₹100 e-Stamp + Form 3 filing', authority: 'Stock Holding Corp (SHCIL)', popular: true },
  { state: 'Karnataka', stampDuty: 'Ad-valorem ₹1,000 for every ₹1 Lakh capital', authority: 'Kaveri Online Services', popular: true },
  { state: 'Tamil Nadu', stampDuty: '₹100 to ₹500 non-judicial stamp paper', authority: 'TNREGINET Portal', popular: true },
  { state: 'Uttar Pradesh', stampDuty: '₹500 fixed non-judicial e-stamp paper', authority: 'IGRSUP Portal', popular: true },
  { state: 'Gujarat', stampDuty: '3.5% of Capital Contribution', authority: 'Garvi Gujarat Portal', popular: true },
  { state: 'West Bengal', stampDuty: '₹150 to ₹500 based on initial capital', authority: 'Directorate of Stamp Revenue', popular: false },
  { state: 'Telangana', stampDuty: '₹500 fixed stamp duty under state schedule', authority: 'Registration & Stamps Dept', popular: false },
];

export const BUNDLED_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    badge: '',
    subtitle: 'Ideal for starting Limited Liability Partnership',
    tagline: 'Best for founders who want essential LLP registration, no extras',
    originalPrice: 1999,
    discount: '50% off',
    discountAmount: 500,
    price: 999,
    govtFeeNote: '+ Govt. Fee',
    emiText: 'EMI option available.',
    recommended: false,
    theme: 'light',
    features: [
      'Expert assisted process',
      'LLP Name Reservation guidance (RUN-LLP)',
      '2 Class-3 Digital Signature Certificates (DSC)',
      'Drafting of Subscriber Sheet & Form 9 Consents',
      'FiLLiP Form filing assistance with RoC',
      'Zero-balance corporate current account opening guidance',
      'Standard digital certificate delivered via email & WhatsApp',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    badge: 'Recommended',
    subtitle: 'Complete LLP Incorporation + DSC + DPIN + Form 3',
    tagline: 'Full LLP registration with 2 DSCs, 2 DPINs, RoC CoI, PAN, TAN & LLP Agreement Form 3',
    originalPrice: 4999,
    discount: '50% off',
    discountAmount: 2500,
    price: 2499,
    govtFeeNote: '+ Govt. Fee',
    emiText: 'EMI option available.',
    recommended: true,
    theme: 'dark',
    features: [
      'Expert assisted process',
      '2 Class-3 Digital Signature Certificates (DSC) with USB tokens',
      '2 Designated Partner Identification Numbers (DPIN/DIN)',
      'LLP Name Reservation on MCA RUN-LLP portal',
      'FiLLiP Incorporation filing with jurisdictional RoC',
      'Certificate of Incorporation (COI) with 7-digit LLPIN',
      'Corporate PAN and TAN allotment',
      'Customized LLP Agreement drafting compliant with LLP Act 2008',
      'MCA Form 3 filing within statutory 30-day window',
      'Zero balance corporate current account with partner banks',
      '1 Year Invoicing & Accounting software license',
      'Dedicated relationship manager on WhatsApp',
    ],
  },
  {
    id: 'premium',
    name: 'Complete',
    badge: '',
    subtitle: 'Full LLP Launchpad + GST + MSME + 1st Year Compliance',
    tagline: 'End-to-end launchpad: LLP CoI, Form 3, GST, MSME Udyam & 1st Year Form 11/8 Consultation',
    originalPrice: 9999,
    discount: '50% off',
    discountAmount: 5000,
    price: 4999,
    govtFeeNote: '+ Govt. Fee',
    emiText: 'EMI option available.',
    recommended: false,
    theme: 'light',
    features: [
      'Dedicated Chartered Accountant & Company Secretary manager',
      'Everything in Standard package (2 DSCs, 2 DPINs, CoI, PAN/TAN, Form 3)',
      'Government GST Registration (Form GST REG-06)',
      'MSME / Udyam Registration Certificate',
      'Trademark availability search & brand protection advisory',
      '1st Year Annual Filing consultation (MCA Form 11 & Form 8)',
      'Zero balance corporate current account with 7% interest',
      '1 Year dedicated corporate legal & tax compliance helpline',
    ],
  },
];

export const PRICING_PACKAGES = BUNDLED_PLANS;

export const FAQS = [
  {
    q: 'What is a Limited Liability Partnership (LLP)?',
    a: 'A Limited Liability Partnership (LLP) is a hybrid business entity introduced under the Limited Liability Partnership Act, 2008. It combines the organizational flexibility and internal contractual freedom of a partnership firm with the limited liability benefits and corporate personality of a private limited company.',
  },
  {
    q: 'How many partners are required to register an LLP?',
    a: 'A minimum of 2 partners are required to incorporate an LLP. There is no maximum limit on the number of partners. At least 2 partners must be Designated Partners, and at least one Designated Partner must be an Indian resident (stayed in India for not less than 120 days during the financial year).',
  },
  {
    q: 'Is there a minimum capital required to register an LLP in India?',
    a: 'No. The LLP Act, 2008 does not prescribe any minimum paid-up capital. An LLP can be formed with any capital contribution agreed upon by the partners, even as low as ₹1,000.',
  },
  {
    q: 'What is an LLP Agreement and why is Form 3 mandatory?',
    a: 'The LLP Agreement is the foundational constitutional document governing mutual rights, duties, profit-sharing ratios, voting power, capital contributions, and dissolution rules between partners. Under Section 23 of the LLP Act, this agreement must be executed on appropriate state stamp paper and submitted to the Registrar of Companies in Form 3 within 30 days of incorporation.',
  },
  {
    q: 'What are the consequences if Form 3 is not filed within 30 days?',
    a: 'Failing to file Form 3 within 30 days of incorporation attracts an uncapped statutory penalty of ₹100 per day of delay under the LLP Act, which can accumulate to thousands of rupees. BharatFiling ensures prompt agreement drafting and filing within the statutory deadline.',
  },
  {
    q: 'Is a statutory audit mandatory for every LLP in India?',
    a: 'No. Unlike Private Limited companies, an LLP is exempt from mandatory statutory audit unless its turnover in any financial year exceeds ₹40 Lakhs OR its contribution exceeds ₹25 Lakhs. This significantly lowers ongoing legal and accounting overheads for startups.',
  },
  {
    q: 'Can NRIs, Foreign Nationals, or Foreign Companies be partners in an Indian LLP?',
    a: 'Yes. Non-Resident Indians (NRIs), Persons of Indian Origin (PIOs), Foreign Nationals, and Foreign Corporate Bodies can be partners in an LLP under the automatic FDI route, provided at least one Designated Partner is an Indian resident and KYC documents are duly apostilled/notarized.',
  },
  {
    q: 'Can an existing Partnership Firm or Private Limited Company be converted into an LLP?',
    a: 'Yes. The Second, Third, and Fourth Schedules of the LLP Act, 2008 provide clear legal frameworks to convert a traditional partnership firm, an unlisted private company, or an unlisted public company into an LLP seamlessly with zero capital gains tax (subject to specified conditions).',
  },
  {
    q: 'What are the annual ROC compliances for an LLP?',
    a: 'An LLP must file two primary annual returns with the MCA: Form 11 (Annual Return) on or before May 30th every year, and Form 8 (Statement of Account & Solvency) on or before October 30th every year. Additionally, an annual Income Tax Return (ITR-5) must be filed by July 31st (or October 31st if audit is applicable).',
  },
  {
    q: 'Can an LLP open a Current Account with any bank?',
    a: 'Yes. Once the Certificate of Incorporation (with LLPIN) and dedicated LLP PAN card are issued, any leading scheduled commercial bank (HDFC, ICICI, Axis, SBI, Yes Bank) will open a corporate Current Account in the name of the LLP.',
  },
];
