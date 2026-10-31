/**
 * Constants for Partnership Firm Registration Module
 * Covers All-India RoF Registration under the Indian Partnership Act, 1932.
 */

export const PARTNERSHIP_HERO = {
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Partnership Firm Registration in India',
  bullets: [
    'Register your partnership firm in India online easily',
    'Partnership deed prepared by experienced legal professionals',
    'Complete support for smooth and timely registration process',
  ],
  stats: [
    { label: 'Firms Registered', value: '15,000+' },
    { label: 'Client Rating', value: '4.9/5' },
    { label: 'Turnaround Time', value: '5-7 Days' },
    { label: 'Pan-India Coverage', value: '28 States & 8 UTs' },
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

export const PARTNERSHIP_TESTIMONIALS = [
  {
    id: 1,
    quote:
      'We registered our manufacturing partnership firm across Maharashtra and Gujarat within a week. The CA team drafted our partnership deed with custom profit-sharing and interest on capital clauses that our bank approved without a single question.',
    author: 'Rajesh Shah & Vikram Mehra',
    title: 'Founders, Apex Precision Tools (Pune & Ahmedabad)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Super seamless experience. We needed state-specific registration with the Registrar of Firms in Bengaluru, Karnataka. BharatFiling managed the deed drafting, e-stamp duty, notary, and Form 1 filing end-to-end online.',
    author: 'Ananya Rao',
    title: 'Managing Partner, Verde Organic Agro (Bengaluru)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'The festive pricing and prompt WhatsApp updates kept us completely stress-free. Received our firm PAN and Registrar of Firms acknowledgment in just 5 working days!',
    author: 'Manish Chawla',
    title: 'Partner, Northstar Logistics & Warehousing (Delhi NCR)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
];

export const REGISTERED_VS_UNREGISTERED = [
  {
    feature: 'Right to Sue Third Parties (Sec 69, Indian Partnership Act)',
    registered: 'Yes — Can sue any third party, client, or vendor in civil court to recover dues.',
    unregistered: 'No — Unregistered firms are strictly barred from suing third parties to enforce contracts.',
  },
  {
    feature: 'Enforcing Claims or Set-Offs exceeding ₹100',
    registered: 'Full legal standing to claim set-off or counter-claims in court.',
    unregistered: 'Barred — cannot legally enforce claims or set-offs exceeding ₹100 against third parties.',
  },
  {
    feature: 'Dispute Resolution Between Partners',
    registered: 'Partners can enforce mutual rights and obligations outlined in the registered deed.',
    unregistered: 'Co-partners cannot sue each other to enforce terms unless filing for total dissolution.',
  },
  {
    feature: 'Bank Current Account & Credit Sanctions',
    registered: 'Fast-track opening with Registrar acknowledgment/Form C and firm PAN.',
    unregistered: 'Subject to heightened banking scrutiny and potential credit sanction refusals.',
  },
  {
    feature: 'Conversion to LLP or Private Limited',
    registered: 'Seamless Chapter XXI conversion under the Companies Act, 2013.',
    unregistered: 'Requires prior regularization and verification of partnership tenure before conversion.',
  },
  {
    feature: 'Government Tenders & Corporate Vendor Onboarding',
    registered: 'Eligible for public tenders, GeM portal registration, and institutional vendor empanelment.',
    unregistered: 'Usually disqualified during mandatory legal vendor due diligence.',
  },
];

export const ALL_INDIA_STATES = [
  {
    code: 'MH',
    name: 'Maharashtra',
    rofPortal: 'Aaple Sarkar / RoF Mumbai & Pune',
    stampDutyNote: 'Ad-valorem stamp duty based on capital contribution (₹500 to ₹2,000) under Maharashtra Stamp Act.',
    specialReq: 'Marathi translated copy of the partnership deed along with English copy as per RoF rules.',
    popular: true,
  },
  {
    code: 'DL',
    name: 'Delhi NCR',
    rofPortal: 'Registrar of Firms, Patparganj / Sub-Divisional Magistrate',
    stampDutyNote: '₹200 non-judicial stamp paper + notarization by registered Delhi notary.',
    specialReq: 'Form 1 submission with notarized affidavit signed by all partners.',
    popular: true,
  },
  {
    code: 'KA',
    name: 'Karnataka',
    rofPortal: 'e-Step RoF Portal / Commercial Taxes Department',
    stampDutyNote: '0.5% of capital contribution or ₹1,000 maximum stamp duty on Form 1.',
    specialReq: 'Online submission via e-Step followed by verification of original deed.',
    popular: true,
  },
  {
    code: 'TN',
    name: 'Tamil Nadu',
    rofPortal: 'TNREGINET / Sub-Registrar Offices',
    stampDutyNote: '₹300 to ₹1,000 depending on capital and jurisdiction.',
    specialReq: 'Online submission through Inspector General of Registration portal.',
    popular: true,
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    rofPortal: 'IGRSUP / Registrar of Firms Lucknow/Kanpur',
    stampDutyNote: '₹500 stamp paper with notarized partner declarations.',
    specialReq: 'Aadhaar e-KYC linked registration with digital signature or physical verification.',
    popular: true,
  },
  {
    code: 'GJ',
    name: 'Gujarat',
    rofPortal: 'e-Nagar / Registrar of Firms Ahmedabad/Surat',
    stampDutyNote: '₹300 - ₹1,000 based on initial capital under Bombay Stamp Act.',
    specialReq: 'Form A filing with certified business address and partner declarations.',
    popular: true,
  },
  {
    code: 'WB',
    name: 'West Bengal',
    rofPortal: 'Directorate of Registration and Stamp Revenue (Kolkata)',
    stampDutyNote: '₹150 - ₹500 nominal state stamp duty.',
    specialReq: 'Form 1 with physical inspection of principal office if required by RoF.',
    popular: false,
  },
  {
    code: 'TS',
    name: 'Telangana & AP',
    rofPortal: 'Registration & Stamps Department (Hyderabad)',
    stampDutyNote: '0.5% on capital contribution or standard non-judicial stamp.',
    specialReq: 'Integrated online Form A submission through IGRS portal.',
    popular: false,
  },
  {
    code: 'ALL',
    name: 'All Other States & UTs',
    rofPortal: 'Respective State Registrar of Firms / District Industries Centre (DIC)',
    stampDutyNote: 'Compliant with state-specific Indian Stamp Act schedules.',
    specialReq: 'End-to-end liaison and execution handled by our dedicated state law specialists.',
    popular: false,
  },
];

export const DEED_ESSENTIAL_CLAUSES = [
  {
    title: 'Firm Name & Scope of Business',
    desc: 'Exact business objectives, permitted expansion areas, and principal place of business.',
    icon: 'Building2',
  },
  {
    title: 'Capital Contribution & Interest',
    desc: 'Ratio of investment by each partner and provision for interest on capital up to 12% per annum under Sec 13.',
    icon: 'Coins',
  },
  {
    title: 'Profit & Loss Sharing Ratio',
    desc: 'Mathematically exact ratio for sharing net profits, operating cashflows, and statutory tax liabilities.',
    icon: 'PieChart',
  },
  {
    title: 'Partner Remuneration & Commission',
    desc: 'Legally structured working partner salaries compliant with Section 40(b) of the Income Tax Act for maximum tax write-offs.',
    icon: 'DollarSign',
  },
  {
    title: 'Banking Operations & Cheque Authority',
    desc: 'Designation of joint or single signing authorities for bank accounts, credit lines, and legal contracts.',
    icon: 'CreditCard',
  },
  {
    title: 'Admission, Retirement & Succession',
    desc: 'Formal procedure for onboarding new partners, voluntary exit, valuation of goodwill, and legal heir succession.',
    icon: 'Users',
  },
  {
    title: 'Arbitration & Dispute Resolution',
    desc: 'Mandatory private arbitration clause under the Arbitration and Conciliation Act, 1996, preventing costly public litigation.',
    icon: 'Scale',
  },
  {
    title: 'Dissolution & Asset Distribution',
    desc: 'Step-by-step winding up procedures, creditor settlements, and equitable distribution of firm surplus assets.',
    icon: 'FileText',
  },
];

export const DOCUMENTS_REQUIRED = [
  {
    category: 'For All Partners (KYC)',
    items: [
      { name: 'PAN Card', desc: 'Mandatory identification for all individual partners.' },
      { name: 'Aadhaar / Passport / Voter ID', desc: 'Valid identity and permanent address proof.' },
      { name: 'Recent Passport-size Photographs', desc: 'Clean white background photograph of each partner.' },
      { name: 'Specimen Signature Sheet', desc: 'Signed on blank white paper for notarization and RoF filing.' },
    ],
  },
  {
    category: 'Registered Office Address Proof',
    items: [
      { name: 'Utility Bill (Electricity / Water / Gas)', desc: 'Must be latest and not older than 2 months.' },
      { name: 'Rent Agreement / Lease Deed', desc: 'Required if the office premises is rented in the name of a partner or firm.' },
      { name: 'No Objection Certificate (NOC)', desc: 'Signed by the property owner permitting commercial firm registration.' },
      { name: 'Property Tax Receipt / Ownership Deed', desc: 'Required if the property is owned by any partner or family member.' },
    ],
  },
  {
    category: 'Firm Formulation Specifics',
    items: [
      { name: '3 Proposed Firm Names', desc: 'Unique names adhering to Trademark and Emblems & Names guidelines.' },
      { name: 'Capital Contribution Details', desc: 'Initial financial or asset investment amount committed by each partner.' },
      { name: 'Profit & Loss Percentage', desc: 'Agreed percentage ratio between all partners.' },
      { name: 'Nature of Business Activities', desc: 'Specific products or services the firm will trade, manufacture, or provide.' },
    ],
  },
];

export const REGISTRATION_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Legal Consultation & Name Verification',
    days: 'Day 1',
    desc: 'Our legal experts consult on your business model, verify the proposed firm name against registered trademarks, and determine the exact state stamp duty requirements.',
  },
  {
    step: '02',
    title: 'Comprehensive Deed Drafting',
    days: 'Day 1-2',
    desc: 'A customized, legally airtight Partnership Deed is drafted by our senior corporate advocates with all statutory clauses, tax write-offs, and dispute protocols.',
  },
  {
    step: '03',
    title: 'Stamp Duty Payment & Notarization',
    days: 'Day 3-4',
    desc: 'The finalized deed is printed on government non-judicial stamp paper of appropriate state value, signed by all partners, and attested by a registered notary public.',
  },
  {
    step: '04',
    title: 'Firm PAN & TAN Application',
    days: 'Day 4-5',
    desc: 'We file for the firm’s dedicated 10-digit Permanent Account Number (PAN) and Tax Deduction and Collection Account Number (TAN) with the Income Tax Department.',
  },
  {
    step: '05',
    title: 'RoF Submission & Certificate Issuance',
    days: 'Day 5-7',
    desc: 'Application (Form 1 / Form A) along with supporting documents is filed with the Registrar of Firms. Upon verification, the official Certificate of Registration is issued.',
  },
];

export const PRICING_PACKAGES = [
  {
    id: 'basic_drafting',
    name: 'Basic Deed Drafting',
    price: 1499,
    originalPrice: 2999,
    badge: 'Starter',
    popular: false,
    desc: 'Ideal for founders who need a legally vetted partnership agreement to operate an unregistered firm or open a basic bank account.',
    features: [
      'Customized Partnership Deed drafting by senior CA/CS',
      'Tax-efficient clauses under Sec 40(b) Income Tax Act',
      'Interest on capital & profit-sharing structure',
      'Standard digital copy delivered in PDF & Word format',
      'Two rounds of free revisions within 14 days',
    ],
    ctaText: 'Select Basic Plan',
  },
  {
    id: 'standard_registration',
    name: 'Partnership Registration & PAN',
    price: 2499,
    originalPrice: 4999,
    badge: 'Most Popular',
    popular: true,
    desc: 'Our flagship plan. Complete partnership legal package including custom deed, stamp duty assistance, notarization support, and Firm PAN.',
    features: [
      'Everything in Basic Deed Drafting Plan',
      'State-specific Non-Judicial e-Stamp Paper assistance',
      'Notarization coordination with registered notary',
      'Application for Firm PAN with Income Tax Department',
      'Application for Firm TAN for payroll & TDS deductions',
      'Current Bank Account opening priority assistance',
      'Dedicated legal manager & real-time WhatsApp updates',
    ],
    ctaText: 'Select Standard Plan',
  },
  {
    id: 'all_inclusive_rof',
    name: 'All-Inclusive RoF & GST Bundle',
    price: 4999,
    originalPrice: 9999,
    badge: 'Complete Business Suite',
    popular: false,
    desc: 'End-to-end government Registrar of Firms (RoF) registration with complete compliance setup for commercial scaling.',
    features: [
      'Everything in Standard Registration Plan',
      'Form 1 / Form A filing with state Registrar of Firms (RoF)',
      'Certificate of Registration (Form C) issuance tracking',
      'GST Registration for the new partnership firm',
      'MSME / Udyam Registration certificate (Free government benefits)',
      'Drafting of Partner Authority Letters & Declarations',
      '1 Year of CA compliance helpline & advisory',
    ],
    ctaText: 'Select All-Inclusive Plan',
  },
];

export const FAQS = [
  {
    q: 'Is partnership firm registration mandatory in India?',
    a: 'Under the Indian Partnership Act, 1932, registration with the Registrar of Firms (RoF) is optional but practically essential. An unregistered firm cannot file a lawsuit against third parties or clients to recover debts exceeding ₹100, nor can co-partners sue each other to enforce terms of the deed. Registering your firm ensures full legal recourse, banking credibility, and eligibility for institutional contracts.',
  },
  {
    q: 'How many partners are required to register a partnership firm?',
    a: 'A minimum of 2 partners are required to establish a partnership firm. The maximum number of partners allowed is 50 for all types of businesses, as prescribed under the Companies (Miscellaneous) Rules, 2014.',
  },
  {
    q: 'What is a Partnership Deed and why is it crucial?',
    a: 'A Partnership Deed is the foundational constitutional charter of the firm. It sets out the profit-sharing ratios, capital investments, interest on capital, working partners’ remuneration, banking signatories, and dispute resolution rules. Having an airtight deed drafted by legal experts prevents future partner deadlocks and allows income-tax deductions on partner salaries under Section 40(b).',
  },
  {
    q: 'What is the stamp duty on a partnership deed in India?',
    a: 'Stamp duty on a partnership deed is governed by individual state stamp acts and varies across India. In Maharashtra, it is ad-valorem based on capital contribution (starting from ₹500); in Delhi, it is typically ₹200; in Karnataka, it is 0.5% of capital (up to ₹1,000 maximum); in Uttar Pradesh and Gujarat, it ranges between ₹300 and ₹500. BharatFiling calculates and arranges the exact state stamp duty automatically.',
  },
  {
    q: 'Can a partnership firm apply for GST and a Current Bank Account?',
    a: 'Yes. Once the Partnership Deed is executed and notarized and the firm’s dedicated PAN is issued, you can immediately open a current bank account and apply for GST Registration. In states requiring RoF acknowledgment for banking, our team fast-tracks the Form A/Form C filing.',
  },
  {
    q: 'What is the difference between a Partnership Firm and an LLP (Limited Liability Partnership)?',
    a: 'In a traditional partnership firm, partners have unlimited personal liability for firm obligations, and registration is governed by state Registrar of Firms (RoF). In an LLP, partners enjoy limited liability protection, the firm is governed by the LLP Act, 2008, and filings are made centrally with the Ministry of Corporate Affairs (MCA). A partnership firm is faster and cheaper to set up with minimal annual audit obligations.',
  },
  {
    q: 'Can an existing unregistered partnership firm be registered later?',
    a: 'Yes. An unregistered partnership firm can apply for registration with the Registrar of Firms at any time during its operational existence by submitting Form 1 along with the notarized partnership deed and past business details.',
  },
  {
    q: 'Do all partners need to be physically present for registration?',
    a: 'No. The entire process through BharatFiling is 100% online and paperless. You can upload scanned copies of your KYC documents and sign the deed digitally or via couriered printouts. You never need to visit the Registrar of Firms office in person.',
  },
  {
    q: 'Can a NRI or foreign national be a partner in an Indian partnership firm?',
    a: 'Non-Resident Indians (NRIs) and Persons of Indian Origin (PIOs) can invest in a partnership firm on a non-repatriable basis without RBI approval. However, foreign nationals and foreign companies generally cannot form a traditional partnership without prior RBI/FIPB approval; an LLP or Private Limited Company is the recommended route for foreign investment.',
  },
  {
    q: 'How long does the entire partnership registration process take?',
    a: 'Deed drafting and notarization are typically completed within 24 to 48 hours. Firm PAN and TAN allotment take 2 to 4 working days. Registrar of Firms (RoF) acknowledgment is usually issued within 5 to 7 working days, depending on the specific state RoF turnaround time.',
  },
];
