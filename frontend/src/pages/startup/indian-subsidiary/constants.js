/**
 * Constants for Indian Subsidiary Registration Module (Foreign Subsidiary Company)
 * Governed under the Companies Act, 2013, FDI Policy & RBI/FEMA Regulations.
 * 1:1 Parity with Vakilsearch / Zolvit specifications.
 */

export const SUBSIDIARY_HERO = {
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Indian Subsidiary Registration for Foreign Companies',
  bullets: [
    'Set up a 100% Wholly Owned Subsidiary (WOS) or Joint Venture under 100% FDI Automatic Route.',
    'Get started at just ₹999 + Govt Fee. Clear pricing, no surprises.',
    'Resident Indian Director nominee assistance & complete FEMA/RBI compliance guidance.',
    'Fast-track incorporation done within 10-14 days with full Apostille & Notarization support.',
  ],
  quickLinks: [
    { id: 'video', label: 'Know about Indian Subsidiary in 60 sec', icon: 'Play' },
    { id: 'sample', label: 'View Sample Certificate', icon: 'FileText' },
    { id: 'pricing', label: 'View Package', icon: 'Package' },
  ],
  stats: [
    { label: 'Subsidiaries Formed', value: '5,000+' },
    { label: 'Countries Represented', value: '45+' },
    { label: 'FDI Approval Rate', value: '100% Compliant' },
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

export const SUBSIDIARY_BENEFITS = [
  {
    title: '100% Foreign Direct Investment (FDI)',
    desc: 'Under the Automatic Route, foreign holding companies can own up to 100% equity in most sectors including SaaS, IT, Manufacturing, and Consulting without prior RBI or government approval.',
    icon: 'Globe2',
  },
  {
    title: 'Independent Legal Entity & Limited Liability',
    desc: 'The subsidiary functions as an independent Indian domestic body corporate. The foreign parent company’s financial and legal liability is strictly limited to its subscribed share capital.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Direct Commercial Operations & Invoicing',
    desc: 'Unlike a Liaison or Representative Office, an Indian Subsidiary can sign commercial contracts, hire full-time local staff, rent corporate properties, and invoice Indian clients in INR.',
    icon: 'Building2',
  },
  {
    title: 'Competitive 22% Corporate Tax Rate',
    desc: 'Domestic companies in India enjoy an attractive base corporate tax rate of 22% (Section 115BAA of Income Tax Act), significantly lower than the 40% tax levied on Foreign Branch Offices.',
    icon: 'Percent',
  },
  {
    title: 'Easy Profit Repatriation & DTAA Protection',
    desc: 'Dividends and profits can be freely repatriated back to the parent company abroad under India’s extensive network of Double Taxation Avoidance Agreements (DTAA) with 85+ nations.',
    icon: 'Coins',
  },
  {
    title: 'Uncapped Access to 1.4B Consumer Market',
    desc: 'Establish a credible, permanent, on-ground market presence in India to bid for enterprise contracts, government tenders, and expand operations seamlessly.',
    icon: 'Users',
  },
];

export const SUBSIDIARY_VS_OTHERS = [
  {
    feature: 'Commercial Revenue Generation',
    subsidiary: 'Allowed (Unrestricted full commercial operations)',
    branchOffice: 'Allowed (Restricted strictly to parent’s business activities)',
    liaisonOffice: 'Prohibited (Cannot earn any revenue or invoice clients)',
  },
  {
    feature: 'Foreign Ownership',
    subsidiary: 'Up to 100% Wholly Owned Subsidiary (WOS)',
    branchOffice: '100% Extension of Foreign Parent Co.',
    liaisonOffice: '100% Extension of Foreign Parent Co.',
  },
  {
    feature: 'Base Corporate Tax Rate',
    subsidiary: '22% (Taxed as an Indian domestic company)',
    branchOffice: '40% (Taxed as a foreign company entity)',
    liaisonOffice: 'N/A (Non-revenue generating representative office)',
  },
  {
    feature: 'Regulatory Approval Required',
    subsidiary: 'RoC/MCA only (Automatic Route in 95%+ sectors)',
    branchOffice: 'RBI Prior Approval via Authorized Dealer Bank',
    liaisonOffice: 'RBI Prior Approval via Authorized Dealer Bank',
  },
  {
    feature: 'Liability of Foreign Parent Co.',
    subsidiary: 'Limited strictly to subscribed share capital',
    branchOffice: 'Unlimited liability extending to foreign parent company',
    liaisonOffice: 'Unlimited liability extending to foreign parent company',
  },
  {
    feature: 'Statutory Directorship',
    subsidiary: 'Min 2 Directors (At least 1 Indian Resident Director)',
    branchOffice: 'Local Authorised Representative only',
    liaisonOffice: 'Local Authorised Representative only',
  },
];

export const DOCUMENTS_REQUIRED = [
  {
    category: 'Foreign Parent Co.',
    items: [
      { name: 'Certificate of Incorporation (COI)', desc: 'Official certificate of parent entity apostilled / notarized in home country.' },
      { name: 'Charter Documents (MoA / AoA)', desc: 'Constitutional bylaws & articles defining corporate objectives.' },
      { name: 'Board Resolution for Indian Subsidiary', desc: 'Authorizing incorporation in India, investment quantum, and nominated signatory.' },
      { name: 'Power of Attorney (PoA)', desc: 'Apostilled PoA executed in favor of Indian professional to sign MCA filings.' },
    ],
  },
  {
    category: 'Foreign Directors',
    items: [
      { name: 'Valid Passport Copy', desc: 'Apostilled copy of valid passport showing photo, citizenship & expiration.' },
      { name: 'Foreign Address Proof', desc: 'Bank statement / Utility bill / Driving licence not older than 2 months (apostilled).' },
      { name: 'Digital Signature (DSC)', desc: 'Class-3 Digital Signature Certificate procured by BharatFiling for foreign signatory.' },
      { name: 'Passport-Size Photographs', desc: 'Digital high-resolution photograph on white background.' },
    ],
  },
  {
    category: 'Resident Indian Director',
    items: [
      { name: 'Permanent Account Number (PAN)', desc: 'Mandatory PAN card copy for the Indian Resident Director.' },
      { name: 'Aadhaar Card / Voter ID', desc: 'Government-issued Indian identity card verifying residential address.' },
      { name: 'Latest Bank Statement', desc: 'Active savings/current account statement (less than 2 months old).' },
      { name: 'Consent to Act as Director', desc: 'Form DIR-2 consent and declaration under Section 164 of Companies Act.' },
    ],
  },
  {
    category: 'Registered Office in India',
    items: [
      { name: 'Electricity / Water Bill', desc: 'Utility bill of Indian office premise (less than 2 months old).' },
      { name: 'No Objection Certificate (NOC)', desc: 'Signed NOC from the property owner permitting registered office usage.' },
      { name: 'Rent Agreement / Ownership Proof', desc: 'Valid lease deed or municipal property tax receipt for the premises.' },
      { name: 'Virtual Office Assistance', desc: 'BharatFiling can provide virtual office address compliant with MCA norms.' },
    ],
  },
];

export const REGISTRATION_PROCESS_STEPS = [
  {
    step: '01',
    title: 'RUN-MCA Name Reservation',
    days: 'Day 1-2',
    desc: 'We secure Class-3 Digital Signatures (DSC) and submit your proposed subsidiary name with "India Private Limited" suffix via the SPICe+ Part A portal.',
  },
  {
    step: '02',
    title: 'Apostille & Cross-Border Documentation',
    days: 'Day 3-5',
    desc: 'Our legal drafting team prepares customized parent board resolutions, Power of Attorney, and subscriber sheets for consularization/apostille.',
  },
  {
    step: '03',
    title: 'SPICe+ Part B & AGILE-PRO-S Filing',
    days: 'Day 6-9',
    desc: 'Integrated submission with the Registrar of Companies (RoC) covering DIN allotment, MoA, AoA, PAN, TAN, EPFO, ESIC, and corporate bank account.',
  },
  {
    step: '04',
    title: 'Certificate of Incorporation (COI)',
    days: 'Day 10-12',
    desc: 'RoC approves the application and issues the Certificate of Incorporation with a unique 21-digit Corporate Identity Number (CIN), corporate PAN & TAN.',
  },
  {
    step: '05',
    title: 'RBI FDI Inward Remittance & FC-GPR Filing',
    days: 'Day 13-14',
    desc: 'Following capital inward remittance into your new corporate bank account, we report Foreign Direct Investment (FDI) to RBI via Form FC-GPR on the FIRMS portal.',
  },
];

export const BUNDLED_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    badge: '',
    subtitle: 'Ideal for starting Indian Subsidiary registration',
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
      'Name Approval on RUN-MCA portal',
      '2 Class-3 Digital Signatures (DSC)',
      'Drafting of Parent Co. Board Resolution & PoA',
      'SPICe+ Part A & B incorporation assistance',
      'Zero-balance corporate current account setup',
      'Standard digital certificate delivered via email & WhatsApp',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    badge: 'Recommended',
    subtitle: 'Complete Indian Subsidiary Incorporation + DSC + DIN + PAN/TAN',
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
      'Name Reservation on RUN-MCA (up to 2 choices)',
      '2 Class-3 Digital Signature Certificates (DSC)',
      '2 Director Identification Numbers (DIN)',
      'Drafting customized MoA & AoA for foreign holding',
      'SPICe+ Part B & AGILE-PRO-S filing with RoC',
      'Certificate of Incorporation (CIN), PAN & TAN',
      'Bank current account with international wire support',
      'Dedicated relationship manager on WhatsApp',
    ],
  },
  {
    id: 'complete',
    name: 'Complete',
    badge: '',
    subtitle: 'Comprehensive Cross-Border Enterprise Setup Suite',
    preBundleSubtitle: 'Fast-track priority filing: Expedited processing time',
    originalPrice: 9999,
    discount: '50% discount',
    price: 4999,
    govtFeeNote: '+ Govt. Fee',
    emiText: 'EMI option available.',
    recommended: false,
    theme: 'light',
    features: [
      'Dedicated Cross-Border Chartered Accountant & CS manager',
      'Complete Subsidiary Incorporation (DSC, DIN, MoA, AoA)',
      'Certificate of Incorporation (COI), PAN & TAN in 10-14 days',
      'Government GST Registration (Form REG-06)',
      'FDI Foreign Inward Remittance guidance (FIRC / AD Bank)',
      'RBI FIRMS portal registration & Form FC-GPR filing guidance',
      'Resident Indian Director nominee onboarding guidance',
      'Shop & Establishment / Trade License assistance',
      '1 Year Accounting & Invoicing software license',
    ],
  },
];

export const FAQS = [
  {
    question: 'What is an Indian Subsidiary company?',
    answer: 'An Indian Subsidiary is an independent domestic Private Limited Company incorporated under the Companies Act, 2013, in which a foreign parent corporation holds more than 50% (and up to 100% for a Wholly Owned Subsidiary) of the equity voting shares.',
  },
  {
    question: 'Is 100% Foreign Direct Investment (FDI) permitted without government approval?',
    answer: 'Yes! Under the 100% FDI Automatic Route, foreign holding companies can establish wholly owned subsidiaries without prior approval from the Reserve Bank of India (RBI) or government ministries in over 95% of sectors, including IT, SaaS, software development, consulting, manufacturing, and e-commerce marketplaces.',
  },
  {
    question: 'Is an Indian Resident Director mandatory to register a subsidiary?',
    answer: 'Yes. Section 149(3) of the Indian Companies Act, 2013 mandates that every Indian company must have at least one director who has resided in India for not less than 182 days during the financial year. The other director(s) can be foreign nationals residing anywhere in the world. BharatFiling can assist with compliant Resident Director onboarding.',
  },
  {
    question: 'What documents from the foreign parent company need apostilling / notarization?',
    answer: 'Under the Companies (Incorporation) Rules, 2014, the Parent Company’s Certificate of Incorporation, charter documents (MoA/AoA), Board Resolution authorizing the subsidiary, and Power of Attorney (PoA) must be apostilled (for Hague Convention member nations) or notarized and consularized by the Indian Embassy in non-Hague countries.',
  },
  {
    question: 'What is the statutory minimum capital required to set up an Indian Subsidiary?',
    answer: 'There is zero statutory minimum capital requirement under the Companies (Amendment) Act. Founders typically initiate operations with a nominal authorized and paid-up capital of ₹1,00,000 (approx. $1,200 USD).',
  },
  {
    question: 'Can the Indian Subsidiary freely repatriate profits back to the foreign parent company?',
    answer: 'Yes. Net profits (dividends) can be freely remitted back to the foreign parent company without upper limits once statutory domestic corporate taxes are settled. India also has Double Taxation Avoidance Agreements (DTAA) with over 85 nations (including USA, UK, Singapore, UAE, Germany) that prevent double taxation.',
  },
  {
    question: 'What is Form FC-GPR and when must it be filed with the RBI?',
    answer: 'Form FC-GPR (Foreign Currency - Gross Provisional Return) is a mandatory compliance report filed on the RBI’s FIRMS portal within 30 days of allotting shares to the foreign parent company upon receiving the inward capital remittance through authorized dealer banking channels.',
  },
  {
    question: 'Can the subsidiary use the global parent company’s exact brand name?',
    answer: 'Yes! Under Rule 8 of the Companies (Incorporation) Rules, an Indian subsidiary can use its foreign parent company’s global trade name by appending "India Private Limited" or "(India) Private Limited", provided an apostilled No Objection Certificate (NOC) and Board Resolution from the parent company are submitted during name reservation.',
  },
  {
    question: 'How long does the entire incorporation process take?',
    answer: 'Once foreign apostilled documents and Indian resident director KYC are submitted, BharatFiling completes the entire incorporation, RoC approval, PAN, TAN, and Certificate of Incorporation issuance within 10 to 14 business days.',
  },
  {
    question: 'Does BharatFiling assist with corporate bank account opening for foreign subsidiaries?',
    answer: 'Yes. Through our enterprise partnerships with Axis Bank, ICICI Bank, and HDFC Bank, we provide dedicated zero-balance corporate current account setup equipped for foreign inward remittances (FIRC) and multi-currency international wire handling.',
  },
];
