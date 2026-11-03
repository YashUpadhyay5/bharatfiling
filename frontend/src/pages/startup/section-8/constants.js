/**
 * Constants for Section 8 Company Registration Module (Non-Profit / NGO Incorporation)
 * Governed under Section 8 of the Indian Companies Act, 2013 & Central Government Licensing Rules.
 * 1:1 Parity with Vakilsearch / Zolvit specifications.
 */

export const SECTION8_HERO = {
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Section 8 Company Registration in India (Non-Profit NGO)',
  bullets: [
    'Incorporate a prestigious non-profit company with central government license (Form INC-16).',
    'Get started at just ₹999 + Govt Fee. Transparent pricing, zero surprises.',
    'Exempted from adding "Limited" or "Private Limited" to your foundation name.',
    'Fast-track legal assistance with Section 12A, 80G tax exemptions & CSR-1 registration.',
  ],
  quickLinks: [
    { id: 'video', label: 'Know about Section 8 in 60 sec', icon: 'Play' },
    { id: 'sample', label: 'View Sample License & Certificate', icon: 'FileText' },
    { id: 'pricing', label: 'View Package', icon: 'Package' },
  ],
  stats: [
    { label: 'Section 8 NGOs Formed', value: '12,000+' },
    { label: 'CSR Grants Facilitated', value: '₹500 Cr+' },
    { label: 'Tax Exemption (12A/80G)', value: '100% Guaranteed' },
    { label: 'Turnaround Time', value: '10-14 Days' },
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

export const SECTION8_BENEFITS = [
  {
    title: 'Highest Institutional Credibility',
    desc: 'Regulated directly by the Ministry of Corporate Affairs (MCA) and Central Government. Commands greater trust from domestic philanthropists, international donors, and banks than traditional Trusts or Societies.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Eligible for Corporate CSR Funding',
    desc: 'Section 8 companies are the preferred vehicle for corporate CSR grants under Section 135 of the Companies Act. Form CSR-1 filing provides instant eligibility to receive statutory CSR expenditure.',
    icon: 'HeartHandshake',
  },
  {
    title: 'No "Limited" / "Pvt Ltd" Suffix Required',
    desc: 'Under Section 8(5), companies are granted a special Central Government license to drop "Limited" or "Private Limited" and operate under proud non-profit suffixes like Foundation, Forum, Council, or Association.',
    icon: 'Award',
  },
  {
    title: '100% Tax Exemption under 12A & 80G',
    desc: 'Income earned is 100% exempt from income tax under Section 12A/12AB. Donors get a 50% deduction on their taxable income under Section 80G, significantly incentivizing charitable contributions.',
    icon: 'Percent',
  },
  {
    title: 'Separate Legal Entity & Perpetual Succession',
    desc: 'Holds property, accepts institutional bequests, signs contracts, and can sue or be sued in its corporate name. The company’s legal existence continues unaffected by changes in directors or members.',
    icon: 'Building2',
  },
  {
    title: 'Zero Statutory Minimum Capital',
    desc: 'No minimum paid-up capital requirement under the Companies Act. You can incorporate and start your philanthropic, educational, or environmental initiative with zero mandatory initial funding.',
    icon: 'Coins',
  },
];

export const SECTION8_VS_OTHERS = [
  {
    feature: 'Governing Act & Authority',
    section8: 'Companies Act, 2013 (MCA & Central Govt)',
    trust: 'Indian Trusts Act, 1882 (Sub-Registrar)',
    society: 'Societies Registration Act, 1860 (Registrar of Societies)',
  },
  {
    feature: 'Statutory License Required',
    section8: 'Yes (Form INC-16 Central Govt. License)',
    trust: 'No (Sub-Registrar Trust Deed registration)',
    society: 'No (Registration Certificate from State Registrar)',
  },
  {
    feature: 'Corporate CSR Grant Eligibility',
    section8: 'High (Preferred vehicle for corporate CSR-1)',
    trust: 'Moderate (Requires 3-year track record)',
    society: 'Moderate (Requires 3-year track record)',
  },
  {
    feature: 'Geographical Operation Scope',
    section8: 'Pan-India & Global without separate state registrations',
    trust: 'State-specific jurisdiction unless registered as national trust',
    society: 'State-bound unless registered under multi-state act',
  },
  {
    feature: 'Minimum Promoters / Members',
    section8: 'Min 2 Directors & 2 Members (Shareholders)',
    trust: 'Min 2 Trustees (Settlor + Trustee)',
    society: 'Min 7 Members (From different families/states)',
  },
  {
    feature: 'Transparency & Governance',
    section8: 'Very High (Online MCA public records, digital ROC filing)',
    trust: 'Low (Manual local recordkeeping at sub-registrar)',
    society: 'Moderate (Annual physical filing with state registrar)',
  },
];

export const DOCUMENTS_REQUIRED = [
  {
    category: 'Directors & Members KYC',
    items: [
      { name: 'PAN Card Copy', desc: 'Mandatory self-attested PAN card copy for all proposed Indian directors and members.' },
      { name: 'Identity Proof', desc: 'Aadhaar Card / Voter ID / Passport / Driving Licence (clear self-attested copy).' },
      { name: 'Residential Address Proof', desc: 'Bank statement / Electricity bill / Mobile bill not older than 2 months.' },
      { name: 'Passport Photographs', desc: 'Recent passport-size color photographs on clean white background.' },
    ],
  },
  {
    category: 'Non-Profit Charter & Declarations',
    items: [
      { name: 'Memorandum of Association (MoA)', desc: 'Customized non-profit charter drafted under Form INC-13 strictly prohibiting dividend distribution.' },
      { name: 'Articles of Association (AoA)', desc: 'Internal governance bylaws defining membership, board meetings, and voting rules.' },
      { name: 'Form INC-14 (Professional Declaration)', desc: 'Statutory certificate by practicing CA / CS confirming compliance with Section 8 rules.' },
      { name: 'Form INC-15 (Director Declaration)', desc: 'Sworn declarations by proposed directors regarding charitable intentions and clean record.' },
    ],
  },
  {
    category: 'Future Projections & Asset Statement',
    items: [
      { name: '3-Year Financial Projections', desc: 'Detailed projected income and expenditure statements for the next 3 operational years.' },
      { name: 'Statement of Assets & Liabilities', desc: 'Certified estimate of current assets, seed grants, and liabilities.' },
      { name: 'Proposed Work Plan / Project Brief', desc: 'Narrative outline of charitable, educational, healthcare, or environmental activities.' },
      { name: 'Grounds of Application', desc: 'Legal memorandum detailing why Section 8 license should be granted.' },
    ],
  },
  {
    category: 'Registered Office in India',
    items: [
      { name: 'Electricity / Gas / Water Bill', desc: 'Recent utility bill for premise not older than 2 months.' },
      { name: 'No Objection Certificate (NOC)', desc: 'Signed NOC from property owner permitting registered office usage.' },
      { name: 'Rent Agreement / Title Deed', desc: 'Registered lease agreement or ownership deed for the office address.' },
      { name: 'Virtual Address Assistance', desc: 'BharatFiling can arrange compliant virtual office address for MCA registration.' },
    ],
  },
];

export const REGISTRATION_PROCESS_STEPS = [
  {
    step: '01',
    title: 'RUN Name Reservation',
    days: 'Day 1-2',
    desc: 'Procurement of Class-3 Digital Signatures (DSC) and submission of 2 non-profit name choices on the MCA SPICe+ Part A portal (e.g. Foundation, Council, Forum).',
  },
  {
    step: '02',
    title: 'Charter & Projections Drafting',
    days: 'Day 3-5',
    desc: 'Our legal team prepares Form INC-13 MoA, AoA, 3-year projected financial budgets, statement of assets, and Form INC-14 professional certifications.',
  },
  {
    step: '03',
    title: 'Section 8 License Filing (INC-12)',
    days: 'Day 6-8',
    desc: 'Submission of Form INC-12 with Central Registration Centre (CRC) to secure the official Central Government Section 8 Non-Profit License (Form INC-16).',
  },
  {
    step: '04',
    title: 'SPICe+ Part B Incorporation Filing',
    days: 'Day 9-11',
    desc: 'Integrated submission covering DIN allotment, Certificate of Incorporation with CIN, PAN, TAN, EPFO, ESIC, and zero-balance corporate bank account.',
  },
  {
    step: '05',
    title: 'COI Issuance & Tax Exemption Support',
    days: 'Day 12-14',
    desc: 'Receipt of official Certificate of Incorporation. We initiate Section 12A, Section 80G tax exemptions, and NITI Aayog NGO Darpan portal enrollment.',
  },
];

export const BUNDLED_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    badge: '',
    subtitle: 'Ideal for starting Section 8 Company registration',
    preBundleSubtitle: 'Standard application filing: Regular processing time',
    originalPrice: 1999,
    discount: '50% discount',
    price: 999,
    govtFeeNote: '+ Govt. Fee',
    emiText: 'EMI option available.',
    recommended: false,
    theme: 'light',
    features: [
      'Expert assisted process',
      'Name Reservation on RUN-MCA portal',
      '2 Class-3 Digital Signatures (DSC)',
      'Drafting of Section 8 MoA (Form INC-13) & AoA',
      'SPICe+ Part A & B incorporation assistance',
      'Zero-balance corporate current account opening',
      'Standard digital certificate delivered via email & WhatsApp',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    badge: 'Recommended',
    subtitle: 'Complete Section 8 Incorporation + Central Govt License (INC-16)',
    preBundleSubtitle: 'Standard application filing: Regular processing time',
    originalPrice: 4999,
    discount: '50% discount',
    price: 2499,
    govtFeeNote: '+ Govt. Fee',
    emiText: 'EMI option available.',
    recommended: true,
    theme: 'dark',
    features: [
      'Expert assisted process',
      'Name Approval on RUN-MCA (up to 2 choices)',
      '2 Class-3 Digital Signature Certificates (DSC)',
      '2 Director Identification Numbers (DIN)',
      'Drafting of MoA, AoA, & 3-year projected financial budget',
      'Form INC-12 Central Government License filing',
      'Issuance of Section 8 License (Form INC-16)',
      'Certificate of Incorporation (CIN), PAN & TAN',
      'Dedicated relationship manager on WhatsApp',
    ],
  },
  {
    id: 'complete',
    name: 'Complete',
    badge: '',
    subtitle: 'Complete NGO Suite: Section 8 + 12A + 80G + NGO Darpan',
    preBundleSubtitle: 'Fast-track priority filing: Expedited processing time',
    originalPrice: 9999,
    discount: '50% discount',
    price: 4999,
    govtFeeNote: '+ Govt. Fee',
    emiText: 'EMI option available.',
    recommended: false,
    theme: 'light',
    features: [
      'Dedicated Senior NGO & Corporate Law CA manager',
      'Complete Section 8 Incorporation (DSC, DIN, MoA, AoA)',
      'Central Govt Section 8 License (Form INC-16)',
      'Income Tax Section 12A/12AB tax exemption filing',
      'Income Tax Section 80G donor deduction registration',
      'NITI Aayog NGO Darpan Portal registration (Unique ID)',
      'Ministry of Corporate Affairs Form CSR-1 filing',
      '1 Year Accounting & NGO donor management software',
    ],
  },
];

export const FAQS = [
  {
    question: 'What is a Section 8 Company under the Companies Act, 2013?',
    answer: 'A Section 8 Company is a registered non-profit corporate organization incorporated for promoting charitable objectives like commerce, art, science, sports, education, research, social welfare, religion, charity, or environmental protection. It applies its profits solely to promote its objects and prohibits dividend payouts to members.',
  },
  {
    question: 'Why choose a Section 8 Company over a Trust or Society?',
    answer: 'A Section 8 Company enjoys the highest credibility among Indian and international grantmakers, venture philanthropists, and corporate CSR committees. Unlike trusts and societies, it is governed by uniform central corporate law, has transparent digital filings with MCA, offers pan-India operational authority without local sub-registrar hurdles, and has limited liability.',
  },
  {
    question: 'Is it true that a Section 8 company does not need "Limited" in its name?',
    answer: 'Yes! Under Section 8(5) of the Companies Act, 2013, the Central Government exempts licensed companies from adding "Private Limited" or "Limited" to their names. They can instead use respected non-profit identifiers such as Foundation, Forum, Association, Council, Confederation, or Federation.',
  },
  {
    question: 'What is Form INC-12 and Form INC-16?',
    answer: 'Form INC-12 is the statutory application submitted to the Central Registration Centre (CRC) / Regional Director seeking a non-profit license under Section 8. Upon verifying the non-profit charter, 3-year projections, and declarations, the government issues the official Section 8 License in Form INC-16.',
  },
  {
    question: 'Can directors and members draw a salary in a Section 8 company?',
    answer: 'Section 8 companies strictly prohibit paying dividends or profit shares to members. However, reasonable remuneration or honorarium can be paid to directors for actual professional or administrative services rendered, provided it is sanctioned in the Articles of Association (AoA) and approved by the Board of Directors.',
  },
  {
    question: 'How do Section 12A and Section 80G registrations benefit the NGO?',
    answer: 'Section 12A exempts all donations, grants, and income earned by the Section 8 company from 100% income tax. Section 80G grants donors a 50% tax deduction on their contributions, which makes corporate and individual donors far more inclined to donate funds.',
  },
  {
    question: 'What is Form CSR-1 and why is it important?',
    answer: 'Form CSR-1 is mandatory for any NGO wanting to receive Corporate Social Responsibility (CSR) funds from Indian corporations under Section 135. Upon filing Form CSR-1 on the MCA portal, a unique CSR Registration Number is allotted within 24 hours.',
  },
  {
    question: 'Can a Section 8 company accept foreign donations under FCRA?',
    answer: 'Yes! A Section 8 Company is fully eligible to apply for Foreign Contribution Regulation Act (FCRA) registration with the Ministry of Home Affairs (MHA) to accept donations from foreign citizens, foundations, and global agencies after meeting the statutory 3-year track record (or via prior permission route).',
  },
  {
    question: 'What is the minimum number of directors and members required?',
    answer: 'A minimum of 2 directors (for private limited structure) and 2 members (shareholders) are required. One person can simultaneously act as both a director and a member. There is no ceiling on the maximum number of members.',
  },
  {
    question: 'How long does the entire Section 8 incorporation take?',
    answer: 'With BharatFiling, the entire process—including Class-3 DSC issuance, RUN name reservation, INC-12 license approval, and final Certificate of Incorporation with PAN & TAN—is completed within 10 to 14 business days.',
  },
];
