// TAN Registration Constants
// Statutory reference: Income Tax Act, 1961 (Section 203A & Section 272BB)
// Income Tax Rules, 1962 (Rule 114A)
// Form 49B Application for Allotment of Tax Deduction and Collection Account Number via Protean (NSDL) / UTIITSL

export const TAN_PLANS = [
  {
    id: 'starter',
    alias: 'form49b_basic',
    name: 'Starter (Basic Form 49B Filing)',
    subtitle: 'Standard 10-digit TAN allotment letter from Income Tax Department within 2-3 working days',
    originalPrice: 799,
    discountLabel: '₹300 off',
    discountPercent: 38,
    price: 499,
    govtFee: 0,
    gstRate: 0.18,
    tat: '2-3 working days',
    hasEmi: false,
    recommended: false,
    features: [
      'Form 49B online preparation & government portal filing',
      'Official 10-digit alphanumeric TAN allotment letter',
      'Section 203A statutory compliance for TDS deduction',
      'Assisted document vetting by Direct Tax Specialist',
      'Instant 14-digit NSDL acknowledgment slip with live tracking',
      'Avoid statutory penalty of ₹10,000 under Section 272BB',
    ],
  },
  {
    id: 'standard',
    alias: 'tan_traces',
    name: 'Standard (TAN Allotment + TRACES Portal Setup)',
    subtitle: '10-digit TAN allotment plus active TRACES portal registration & Form 16/16A workflow guidance',
    originalPrice: 1499,
    discountLabel: '33% off',
    discountPercent: 33,
    price: 999,
    govtFee: 0,
    gstRate: 0.18,
    tat: '2-3 working days',
    hasEmi: true,
    recommended: true,
    features: [
      'Everything in Starter Form 49B package',
      'TRACES (TDS Reconciliation Analysis & Correction) portal registration',
      'Deductor login credentials activation & profile linking',
      'Form 16 (Salary) & Form 16A (Non-Salary) generation guide',
      'Challan ITNS 281 tax deposition code guidance (Sec 192, 194C, 194J)',
      '1-on-1 Consultation with Senior Direct Tax CA Officer',
      'Priority Protean / NSDL express clearance queue',
    ],
  },
  {
    id: 'combo',
    alias: 'tan_tds_combo',
    name: 'Business TAN + 1st Quarter TDS Return Combo',
    subtitle: 'Complete corporate setup: 10-digit TAN + TRACES activation + Preparation & e-filing of 1st Quarter TDS return',
    originalPrice: 2999,
    discountLabel: '33% off',
    discountPercent: 33,
    price: 1999,
    govtFee: 0,
    gstRate: 0.18,
    tat: '3-4 working days',
    hasEmi: true,
    recommended: false,
    features: [
      'Complete TAN Allotment & TRACES Portal setup',
      'Preparation & e-filing of 1st Quarter TDS Return (Form 24Q or 26Q)',
      'FVU validation file generation & NSDL TIN-FC submission',
      'TDS calculation, challan mapping & PAN verification of deductees',
      'Issue of Form 16 / Form 16A certificates to payees',
      'Zero late filing fee guarantee under Section 234E (saves ₹200/day)',
      'Dedicated Chartered Accountant (CA) assigned for full quarter',
    ],
  },
];

export const TAN_DEDUCTOR_TYPES = [
  { id: 'company', label: 'Company (Private Ltd / OPC / Public Ltd)', code: 'C', note: 'Mandatory for all corporate entities deducting salary, vendor, or rent tax' },
  { id: 'proprietorship', label: 'Individual / Sole Proprietorship (Under Tax Audit 44AB)', code: 'P', note: 'Mandatory if business turnover exceeds ₹1 Cr or gross professional receipts exceed ₹50 Lakhs' },
  { id: 'partnership', label: 'Partnership Firm / LLP', code: 'F', note: 'Mandatory for firms deducting tax on partner remuneration, contractor fees, or rent' },
  { id: 'huf', label: 'Hindu Undivided Family (HUF)', code: 'H', note: 'Subject to Section 44AB tax audit requirements' },
  { id: 'trust', label: 'Trust / Society / Association of Persons (AOP)', code: 'T', note: 'Mandatory for charitable trusts, societies, and educational institutions deducting TDS' },
  { id: 'branch', label: 'Branch / Division of Existing Company or Firm', code: 'C/F', note: 'Distinct TAN required for independent branch accounts or location centers' },
  { id: 'government', label: 'Government Office / DDO / Local Authority', code: 'G', note: 'Drawing & Disbursing Officers in Central/State Government departments' },
];

export const APPLICATION_TYPES = [
  { id: 'new', label: 'New TAN Allotment (Form 49B - Never had a TAN)', form: 'Form 49B' },
  { id: 'correction', label: 'TAN Correction / Change of Address or Signatory', form: 'Change Request' },
  { id: 'branch', label: 'Additional TAN for New Branch or Location', form: 'Branch Form 49B' },
];

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
  'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const TRUST_STATS = [
  { value: '4.5 ★★★★★', label: 'Verified Reviews', sublabel: 'Over 18,000+ ratings' },
  { value: '15+ Years', label: 'Of Experience', sublabel: 'Licensed Tax & Legal Firm' },
  { value: '2 Lakh+', label: 'Deductors Trusted', sublabel: 'Across all 28 Indian States' },
  { value: 'App Tracking', label: 'Live NSDL Status', sublabel: '14-Digit Acknowledgment tracking' },
];

export const TAN_STRUCTURE_RULES = [
  { position: '1st - 3rd', label: 'Jurisdiction / City Code', example: 'BLR, DEL, MUM', desc: 'Represents the geographic city/jurisdiction of the Assessing Officer (e.g. BLR for Bengaluru, DEL for Delhi, MUM for Mumbai).' },
  { position: '4th Character', label: 'Deductor Initial / Category', example: 'C, P, F, T, G', desc: 'Initial letter of deductor name or tax status: C (Company), P (Proprietor), F (Firm/LLP), T (Trust), G (Government).' },
  { position: '5th - 9th', label: '5 Sequential Digits', example: '01234 to 99999', desc: 'Five unique numerical sequential digits generated by the Income Tax Department central processing server.' },
  { position: '10th Character', label: 'Check Alphabet', example: 'Letter (e.g. A, K)', desc: 'Official alphabetic check digit computed through statutory ITD cryptographic checksum algorithm.' },
];

export const TAN_DOCUMENTS = [
  {
    category: 'company',
    title: 'Private Limited, OPC & Public Companies',
    badge: 'Form 49B Corporate',
    documents: [
      { name: 'Certificate of Incorporation (COI)', options: 'Issued by Registrar of Companies (ROC), Ministry of Corporate Affairs (MCA).' },
      { name: 'Company PAN Card', options: 'Clear copy of 10-digit entity PAN card allotted to the company.' },
      { name: 'Registered Office Address Proof', options: 'Electricity bill / Landline / Broadband bill (under 2 months old) along with NOC from owner or Rent Agreement.' },
      { name: 'Authorised Director KYC', options: 'PAN and Aadhaar card of the Director authorized to sign tax returns, along with DIN.' },
      { name: 'Board Resolution extract', options: 'Board resolution authorizing application for TAN and appointing the authorized signatory.' },
    ],
  },
  {
    category: 'partnership',
    title: 'Partnership Firm & LLP',
    badge: 'Form 49B Non-Corporate',
    documents: [
      { name: 'Partnership Deed / LLP Agreement', options: 'Copy of registered Partnership Deed or MCA certified LLP Agreement.' },
      { name: 'Firm / LLP PAN Card', options: 'Clear copy of 10-digit PAN card issued in the name of the Firm or LLP.' },
      { name: 'Principal Place of Business Proof', options: 'Electricity bill, Property tax receipt, or Rent Agreement of the business premises.' },
      { name: 'Designated Partner / Managing Partner KYC', options: 'PAN, Aadhaar, and mobile number of the Partner authorized to handle tax compliances.' },
    ],
  },
  {
    category: 'proprietorship',
    title: 'Sole Proprietorship & Individual',
    badge: 'Form 49B Individual',
    documents: [
      { name: 'Proprietor PAN Card', options: 'Self-attested PAN card of the individual business owner.' },
      { name: 'Proprietor Identity & Address Proof', options: 'Aadhaar Card, Passport, or Voter ID with current residence address.' },
      { name: 'Business Establishment Proof', options: 'GST Registration certificate, MSME/Udyam certificate, or Shop & Establishment licence.' },
      { name: 'Tax Audit Declaration', options: 'Self-declaration confirming applicability of Section 44AB (turnover > ₹1 Cr or professional receipts > ₹50 Lakhs).' },
    ],
  },
  {
    category: 'trust',
    title: 'Trusts, Societies & NGOs',
    badge: 'Form 49B Institutional',
    documents: [
      { name: 'Trust Deed / Society Registration Certificate', options: 'Registered Trust Deed or certificate from Registrar of Societies / Charity Commissioner.' },
      { name: 'Trust PAN Card', options: '10-digit PAN card issued in the name of the Trust or Society.' },
      { name: 'Trustee / Secretary Resolution & KYC', options: 'Resolution appointing the signatory, and PAN & Aadhaar proof of Managing Trustee / Secretary.' },
      { name: 'Office Address Proof', options: 'Utility bill or premises agreement of the registered office.' },
    ],
  },
  {
    category: 'government',
    title: 'Government Offices & Local Authorities',
    badge: 'Form 49B Government',
    documents: [
      { name: 'Official Authorization Letter', options: 'Official letterhead authorization from the Head of the Department or Administrative Officer.' },
      { name: 'Drawing & Disbursing Officer (DDO) KYC', options: 'Official Government ID card, Employee Code, and PAN of the appointed DDO.' },
      { name: 'Office Location & Pin Code Proof', options: 'Official government premises address and ministry/department hierarchy details.' },
    ],
  },
];

export const TAN_STEPS = [
  {
    step: '01',
    title: 'Submit Deductor Details Online',
    desc: 'Provide your business name, category, registered address, and authorized signatory details in under 2 minutes.',
  },
  {
    step: '02',
    title: 'Chartered Accountant Review',
    desc: 'Our Direct Tax CA verifies jurisdiction AO codes, assesses entity type, and drafts statutory Form 49B error-free.',
  },
  {
    step: '03',
    title: 'Protean (NSDL) Portal Filing',
    desc: 'Form 49B is submitted to the central Income Tax portal and a 14-digit government acknowledgment slip is generated.',
  },
  {
    step: '04',
    title: 'TAN Allotment & TRACES Activation',
    desc: 'Income Tax Department allocates your 10-digit TAN letter and our team configures your TRACES portal deductor account.',
  },
];

export const TDS_SECTIONS_GUIDE = [
  { section: 'Section 192', title: 'Salary Payments', rate: 'Applicable Income Tax Slabs', threshold: 'Basic Exemption (₹3L / ₹2.5L)', form: 'Form 24Q' },
  { section: 'Section 194C', title: 'Contractors & Sub-contractors', rate: '1% (Ind/HUF) or 2% (Others)', threshold: '₹30,000 single / ₹1,00,000 aggregate', form: 'Form 26Q' },
  { section: 'Section 194J', title: 'Professional & Technical Fees', rate: '2% (Technical) or 10% (Professional)', threshold: '₹30,000 per financial year', form: 'Form 26Q' },
  { section: 'Section 194I', title: 'Rent on Land, Building & Machinery', rate: '2% (Plant & Machinery) or 10% (Land/Building)', threshold: '₹2,40,000 per financial year', form: 'Form 26Q' },
  { section: 'Section 194H', title: 'Commission or Brokerage', rate: '5%', threshold: '₹15,000 per financial year', form: 'Form 26Q' },
  { section: 'Section 194Q', title: 'Purchase of Goods', rate: '0.1%', threshold: 'Over ₹50 Lakhs turnover > ₹10 Cr', form: 'Form 26Q' },
  { section: 'Section 206C', title: 'Tax Collection at Source (TCS)', rate: '1% to 5% (Scrap, Timber, Minerals)', threshold: 'As prescribed by Act', form: 'Form 27EQ' },
];

export const PAN_VS_TAN = [
  { feature: 'Full Form', pan: 'Permanent Account Number', tan: 'Tax Deduction and Collection Account Number' },
  { feature: 'Governing Law', pan: 'Section 139A of Income Tax Act, 1961', tan: 'Section 203A of Income Tax Act, 1961' },
  { feature: 'Primary Purpose', pan: 'Tracks income earned and direct tax paid by the taxpayer', tan: 'Enables withholding and deposition of tax deducted at source (TDS)' },
  { feature: 'Who Must Hold', pan: 'Every individual or business earning taxable income', tan: 'Any person or business making payments subject to TDS' },
  { feature: 'Filing Form', pan: 'Form 49A (Domestic) / Form 49AA (Foreign)', tan: 'Form 49B' },
  { feature: 'Return Types', pan: 'Income Tax Return (ITR-1 to ITR-7)', tan: 'TDS Quarterly Returns (Form 24Q, 26Q, 27Q, 27EQ)' },
  { feature: 'Can replace each other?', pan: 'NO — PAN cannot be used for quoting TDS in challan ITNS 281', tan: 'NO — TAN cannot be used for filing ITR or paying advance tax' },
  { feature: 'Non-compliance Penalty', pan: '₹10,000 under Section 272B', tan: '₹10,000 flat penalty under Section 272BB' },
];

export const TAN_FAQS = [
  {
    q: 'What is TAN and why is it mandatory for businesses in India?',
    a: 'TAN stands for Tax Deduction and Collection Account Number. It is a 10-digit alphanumeric number issued by the Income Tax Department under Section 203A of the Income Tax Act, 1961. Every person or organization responsible for deducting tax at source (TDS) or collecting tax at source (TCS) on salaries, contractor fees, rent, or professional fees must obtain and quote a TAN.'
  },
  {
    q: 'What is the statutory penalty for not having or not quoting a TAN?',
    a: 'Under Section 272BB of the Income Tax Act, 1961, failure to apply for TAN or failure to quote TAN on TDS challans (ITNS 281), quarterly returns (Form 24Q/26Q), or TDS certificates (Form 16/16A) attracts a flat penalty of ₹10,000 per violation.'
  },
  {
    q: 'Can I use my business PAN instead of TAN for deducting TDS?',
    a: 'No. PAN and TAN serve completely different legal purposes. Section 203A explicitly mandates that deductors must quote TAN in all TDS returns, payment challans, and certificates. Banks and the Income Tax Department will reject TDS challan ITNS 281 payments if TAN is not provided. (The only narrow exception is individuals purchasing immovable property over ₹50 Lakhs under Section 194-IA or paying rent over ₹50,000/month under Section 194-IB, who use Form 26QB/26QC based on PAN).'
  },
  {
    q: 'Does a Sole Proprietor or Individual need a TAN?',
    a: 'A sole proprietorship or individual must obtain a TAN if their turnover from business exceeds ₹1 Crore (or gross professional receipts exceed ₹50 Lakhs) in the preceding financial year, making them subject to statutory tax audit under Section 44AB. If applicable, they must deduct TDS on payments made to contractors, professionals, landlords, etc.'
  },
  {
    q: 'How long does it take to obtain a TAN number online?',
    a: 'With BharatFiling, Form 49B is vetted and filed with Protean (NSDL) within 24 hours. The official 10-digit TAN allotment is typically issued by the Income Tax Department within 2 to 3 working days, and a digital allotment letter is sent to your email.'
  },
  {
    q: 'What is the TRACES portal and why is it included in the Standard Plan?',
    a: 'TRACES (TDS Reconciliation Analysis and Correction Enabling System) is the official web portal operated by the Directorate of Income Tax (Systems). Deductors must register on TRACES to download Form 16 (for salaried staff), Form 16A (for vendors), track TDS challan status, view default notices, and download Consolidated Conso files for corrections. Our Standard plan sets up and activates your TRACES account completely.'
  },
  {
    q: 'Does a company need separate TANs for different branch offices?',
    a: 'Generally, a company can operate with a single TAN for all business activities across India. However, if distinct branch offices or regional divisions maintain separate payrolls, books of accounts, and file independent TDS returns, separate branch TANs can be obtained by applying under Form 49B.'
  },
  {
    q: 'What are the due dates for depositing TDS and filing quarterly returns?',
    a: 'TDS deducted during any month must be deposited to the government using Challan ITNS 281 by the 7th of the following month (except for March deductions, which can be paid by April 30th). Quarterly TDS returns must be filed by July 31st (Q1), October 31st (Q2), January 31st (Q3), and May 31st (Q4). Late filing attracts a statutory fee of ₹200 per day under Section 234E.'
  },
  {
    q: 'What is the difference between Form 24Q and Form 26Q?',
    a: 'Form 24Q is the quarterly TDS return filed for tax deducted from employee salaries under Section 192. Form 26Q is the quarterly TDS return filed for all non-salary payments made to Indian resident entities, including contractor fees (194C), professional charges (194J), rent (194I), commission (194H), and interest (194A).'
  },
  {
    q: 'Can an organization hold more than one TAN for the same office?',
    a: 'No. Holding duplicate TANs for the same business office or division is prohibited. If multiple TANs have been inadvertently allotted to the same business entity, the duplicate TAN must be surrendered immediately to avoid penalties.'
  },
  {
    q: 'What documents are required to apply for TAN online?',
    a: 'The documentation is completely paperless: Entity PAN card, Certificate of Incorporation / Partnership Deed / Business Registration proof, registered office address proof (utility bill / rent agreement), and identity proof of the authorized signatory. We handle the drafting of Form 49B.'
  },
  {
    q: 'How can I check the status of my TAN application?',
    a: 'Once Form 49B is filed, you receive a 14-digit unique acknowledgment number. You can track its live status on the Protean (NSDL) portal or directly through your BharatFiling dashboard with SMS and WhatsApp updates.'
  },
];
