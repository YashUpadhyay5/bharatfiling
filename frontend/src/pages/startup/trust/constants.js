/**
 * Constants for Trust Registration Module (Public Charitable & Religious Trust)
 * Governed under Indian Trusts Act, 1882 / State Public Trusts Acts & Registration Act, 1908.
 * 1:1 Parity with Partnership module structure and UI specifications.
 */

export const TRUST_HERO = {
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Trust Registration in India',
  bullets: [
    'Register your Public Charitable or Religious Trust online easily',
    'Trust deed prepared by experienced High Court advocates',
    'Complete support for smooth Sub-Registrar registration and 12A/80G process',
  ],
  stats: [
    { label: 'Trusts Registered', value: '15,000+' },
    { label: 'Client Rating', value: '4.9/5' },
    { label: 'Turnaround Time', value: '7-10 Days' },
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

export const TRUST_TESTIMONIALS = [
  {
    id: 1,
    quote:
      'We registered our educational and healthcare charitable trust across Karnataka and Maharashtra within 8 days. The legal team drafted our trust deed with airtight charitable objects that our bank and Income Tax authorities approved without a single question.',
    author: 'Dr. Rameshwar Hegde',
    title: 'Managing Trustee, Vidya Jyoti Educational Trust (Bengaluru)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Super seamless experience. We needed state-specific registration with the Sub-Registrar of Assurances in New Delhi. BharatFiling managed the deed drafting, non-judicial stamp duty, and execution appointment end-to-end online.',
    author: 'Vandana Sen',
    title: 'Founder & Settlor, Sanjeevani Public Health Foundation (Delhi)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'The festive pricing and prompt WhatsApp updates kept our family completely stress-free. Received our certified Trust Deed, Trust PAN, and 12A/80G filing acknowledgment in record time!',
    author: 'Pandit Alok Nath Mishra',
    title: 'President Trustee, Kashi Seva & Vedic Heritage Trust (Varanasi, UP)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
];

export const REGISTERED_VS_UNREGISTERED = [
  {
    feature: 'Income Tax Exemption (Section 12A & 80G)',
    registered: 'Eligible for 100% tax exemption on trust income & 50% deduction to donors.',
    unregistered: 'Ineligible — Unregistered trust income is taxed at maximum marginal rate (30%+).',
  },
  {
    feature: 'Legal Entity Recognition & Property Holding',
    registered: 'Legally empowered to hold immovable & movable property in trust’s name perpetually.',
    unregistered: 'No statutory standing; property disputes cannot be enforced before civil courts.',
  },
  {
    feature: 'Bank Current Account & Foreign Donations (FCRA)',
    registered: 'Fast-track institutional NGO account opening with PAN, deed, and Sub-Registrar seal.',
    unregistered: 'Commercial banks strictly reject current accounts without registered trust deed.',
  },
  {
    feature: 'Government Grants & CSR Funding (NGO Darpan)',
    registered: 'Eligible for NITI Aayog NGO Darpan unique ID, CSR grants, and ministry tenders.',
    unregistered: 'Strictly disqualified from all CSR funds and government grant programs.',
  },
  {
    feature: 'Enforcing Legal Claims & Dispute Resolution',
    registered: 'Trustees have full legal standing to represent trust and sue to recover dues.',
    unregistered: 'Barred under Indian Trusts Act from initiating civil recovery suits against third parties.',
  },
];

export const ALL_INDIA_STATES = [
  {
    code: 'DL',
    name: 'Delhi NCR',
    authority: 'Sub-Registrar of Assurances, Revenue Department',
    stampDutyNote: 'Fixed non-judicial stamp duty + Sub-Registrar registration fee.',
    specialReq: 'Two independent witnesses with original Aadhaar cards mandatory during execution.',
    popular: true,
  },
  {
    code: 'MH',
    name: 'Maharashtra',
    authority: 'Charity Commissioner Office & Sub-Registrar',
    stampDutyNote: 'Bombay Public Trusts Act Schedule based on initial corpus fund.',
    specialReq: 'Schedule I filing with Charity Commissioner along with registered deed copy.',
    popular: true,
  },
  {
    code: 'KA',
    name: 'Karnataka',
    authority: 'Department of Stamps and Registration (Kaveri Portal)',
    stampDutyNote: 'Ad-valorem stamp duty based on Trust Corpus value under Karnataka Stamp Act.',
    specialReq: 'Online document upload followed by biometric authentication at Sub-Registrar.',
    popular: true,
  },
  {
    code: 'TN',
    name: 'Tamil Nadu',
    authority: 'Sub-Registrar Office / TNREGINET Portal',
    stampDutyNote: 'State Stamp Schedule fee with nominal registration charge.',
    specialReq: 'Deed presentation with passport photos of all trustees and settlor.',
    popular: true,
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    authority: 'IGRSUP / District Sub-Registrar Office',
    stampDutyNote: 'Fixed e-stamp paper requirement with notary verification.',
    specialReq: 'Aadhaar verified biometric logging of settlor and managing trustee.',
    popular: true,
  },
  {
    code: 'GJ',
    name: 'Gujarat',
    authority: 'Charity Commissioner Office & Sub-Registrar',
    stampDutyNote: 'Schedule stamp duty under Gujarat Public Trusts Act.',
    specialReq: 'Dual registration: Sub-Registrar deed stamping + Charity Commissioner PTR entry.',
    popular: true,
  },
  {
    code: 'WB',
    name: 'West Bengal',
    authority: 'Directorate of Registration and Stamp Revenue (e-Nathikaran)',
    stampDutyNote: 'Sub-Registrar valuation based on initial corpus settlement.',
    specialReq: 'e-Assessment slip generation followed by physical deed execution.',
    popular: false,
  },
];

export const DEED_ESSENTIAL_CLAUSES = [
  {
    title: 'Name, Registered Office & Objectives',
    desc: 'Formal declaration of trust name, head office location, and specific charitable objects compliant with Section 2(15) of Income Tax Act.',
    icon: 'Building2',
  },
  {
    title: 'Settlor & Board of Trustees',
    desc: 'Clear enumeration of Settlor rights, permanent trustees, term of office, appointment of successors, and managing trustee powers.',
    icon: 'Users',
  },
  {
    title: 'Corpus Fund & Property Settlement',
    desc: 'Irrevocable transfer of the initial settlement corpus fund and explicit authority to receive grants, endowments, and public donations.',
    icon: 'Coins',
  },
  {
    title: 'Banking & Operational Governance',
    desc: 'Joint operation mandate for bank current accounts, statutory audit directives by Chartered Accountants, and quorum regulations.',
    icon: 'Landmark',
  },
  {
    title: 'Irrevocability & Dissolution Clause',
    desc: 'Statutory clause providing that the trust is irrevocable, and upon winding up, assets must merge into a similar charitable institution.',
    icon: 'Scale',
  },
  {
    title: 'Amendments & Legal Jurisdiction',
    desc: 'Rules governing supplementary deeds, court intervention limitations, and designation of jurisdictional civil court registry.',
    icon: 'FileText',
  },
];

export const DOCUMENTS_REQUIRED = [
  {
    category: 'Settlor Documents',
    items: [
      { name: 'PAN Card Copy', desc: 'Permanent Account Number of the Trust Settlor / Founder.' },
      { name: 'Aadhaar Card', desc: 'UIDAI Aadhaar card for KYC verification and identity proof.' },
      { name: 'Passport Size Photos', desc: '2 recent colored passport photographs of the Settlor.' },
      { name: 'Address Proof', desc: 'Passport, Voter ID, or Utility bill (not older than 2 months).' },
    ],
  },
  {
    category: 'Trustees Documents (Min. 2)',
    items: [
      { name: 'PAN & Aadhaar Copies', desc: 'Mandatory KYC documentation of all proposed trustees.' },
      { name: 'Passport Size Photos', desc: '2 recent photographs of each trustee for deed execution.' },
      { name: 'Contact Details & Designation', desc: 'Email, mobile, and board role (President, Secretary, Treasurer).' },
      { name: 'Consent to Act as Trustee', desc: 'Signed declaration agreeing to hold office and fiduciary duties.' },
    ],
  },
  {
    category: 'Trust Registered Office',
    items: [
      { name: 'Electricity / Water Bill', desc: 'Utility bill not older than 2 months for registered address.' },
      { name: 'NOC from Property Owner', desc: 'No Objection Certificate signed by owner permitting trust address.' },
      { name: 'Rent Agreement / Title Deed', desc: 'Valid lease deed or ownership registry copy of the premises.' },
      { name: 'Office Geo-Coordinates', desc: 'Local municipal ward / jurisdictional sub-registrar mapping.' },
    ],
  },
  {
    category: 'Witnesses & Particulars',
    items: [
      { name: '2 Independent Witnesses', desc: 'Original Aadhaar cards of 2 witnesses required at Sub-Registrar.' },
      { name: 'Proposed Trust Names', desc: '3 unique names adhering to Emblems & Names Act guidelines.' },
      { name: 'Initial Corpus Fund Amount', desc: 'Settlement amount (typically ₹5,000 to ₹10,000) to found trust.' },
      { name: 'Primary Charitable Objects', desc: 'Specific welfare activities (Education, Healthcare, Relief, Environment).' },
    ],
  },
];

export const REGISTRATION_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Legal Consultation & Name Verification',
    days: 'Day 1',
    desc: 'Our legal experts consult on your charitable objectives, verify the proposed trust name against existing registries, and calculate state stamp duty.',
  },
  {
    step: '02',
    title: 'Comprehensive Deed Drafting',
    days: 'Day 1-2',
    desc: 'A customized, legally airtight Trust Deed is drafted by our senior High Court advocates with all statutory clauses and 12A/80G compliance.',
  },
  {
    step: '03',
    title: 'Stamp Duty Payment & Execution',
    days: 'Day 3-4',
    desc: 'The finalized deed is printed on government non-judicial stamp paper of appropriate state value and executed by the settlor and trustees.',
  },
  {
    step: '04',
    title: 'Sub-Registrar Registration & Stamping',
    days: 'Day 5-7',
    desc: 'Submission and formal registration before the jurisdictional Sub-Registrar of Assurances with certified registration certificate issuance.',
  },
  {
    step: '05',
    title: 'Trust PAN/TAN & 12A/80G Filing',
    days: 'Day 7-10',
    desc: 'We file for the trust’s dedicated PAN/TAN card, bank current account opening, and provisional Section 12A & 80G tax exemption applications.',
  },
];

export const BUNDLED_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    badge: '',
    subtitle: 'Ideal for starting Trust registration',
    tagline: 'Best for a founder who just wants the trust registered, no extras',
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
      'Trust deed drafting in 24 hours',
      'Emblems and Names search validation',
      'Zero balance current account opening guidance',
      'Standard digital deed certificate delivered via email & WhatsApp',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    badge: 'Recommended',
    subtitle: 'Perfect for Trust registration + Sub-Registrar filing + PAN',
    tagline: 'Complete Trust formation with custom Trust Deed, Sub-Registrar execution support, Trust PAN & TAN',
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
      'Customized Trust Deed drafting in 24 hours',
      'Sub-Registrar appointment booking & document compilation',
      'Dedicated advocate assistance during Sub-Registrar execution',
      'Dedicated relationship manager on WhatsApp',
      'Trust PAN & TAN allotment assistance',
      'Zero balance current account with partner banks',
      '1 Year Accounting & Invoicing software license',
    ],
  },
  {
    id: 'premium',
    name: 'Complete',
    badge: '',
    subtitle: 'Complete solution for Trust + 12A & 80G + NGO Darpan',
    tagline: 'Full NGO launchpad with Trust Deed, Sub-Registrar, Section 12A & 80G filings and NITI Aayog NGO Darpan',
    originalPrice: 9999,
    discount: '50% off',
    discountAmount: 5000,
    price: 4999,
    govtFeeNote: '+ Govt. Fee',
    emiText: 'EMI option available.',
    recommended: false,
    theme: 'light',
    features: [
      'Dedicated Chartered Accountant manager',
      'Customized Trust Deed drafting in 24 hours',
      'Sub-Registrar appointment booking & execution support',
      'Section 12A Income Tax Exemption application (Form 10A)',
      'Section 80G 50% Tax Deduction certificate for donors',
      'NITI Aayog NGO Darpan Portal registration & unique ID',
      'Zero balance current account with 7% interest',
      '1 Year dedicated NGO statutory compliance helpline',
    ],
  },
];

export const PRICING_PACKAGES = BUNDLED_PLANS;

export const FAQS = [
  {
    q: 'What is a Public Charitable Trust in India?',
    a: 'A Public Charitable Trust is a non-profit legal entity established for public welfare activities such as relief of the poor, education, medical aid, preservation of environment or monuments, and advancement of any other object of general public utility. It is governed by the Indian Trusts Act, 1882 (or state public trusts acts) and the Registration Act, 1908.',
  },
  {
    q: 'How many trustees are required to register a trust?',
    a: 'Under Indian law, a minimum of 2 trustees are required to establish a trust (1 Settlor/Author + 1 Trustee). However, for a Public Charitable Trust seeking Section 12A & 80G tax exemptions or CSR grants, having at least 3 to 5 trustees (Managing Trustee, Secretary, and Treasurer) is recommended.',
  },
  {
    q: 'What is a Trust Deed and why is it crucial?',
    a: 'A Trust Deed is the foundational constitutional charter of the trust. It sets out the charitable objectives, trustee powers, initial corpus fund, bank operation rights, meeting rules, and an irrevocable dissolution clause. Having an airtight deed drafted by legal experts prevents deadlocks and is mandatory for 12A/80G tax exemptions.',
  },
  {
    q: 'What is the role of the Sub-Registrar in Trust Registration?',
    a: 'In India, a trust is legally recognized when its Trust Deed is executed and registered before the jurisdictional Sub-Registrar of Assurances having jurisdiction over the registered office address. The settlor and trustees (with two independent witnesses) sign the deed in the presence of the sub-registrar.',
  },
  {
    q: 'Do trustees need to visit the Sub-Registrar office?',
    a: 'Yes. Most Indian states require the Settlor and at least one or two trustees (along with two witnesses) to physically appear before the Sub-Registrar with original photo identity proofs for biometric authentication and photograph capturing at the time of deed registration. Our local legal associate coordinates the entire appointment for a hassle-free visit.',
  },
  {
    q: 'What are Section 12A and Section 80G tax exemptions?',
    a: 'Section 12A exempts the entire surplus income of the trust from taxation under the Income Tax Act, provided the funds are utilized for charitable purposes. Section 80G allows donors who contribute to your trust to claim a 50% tax deduction on their donations, which is critical for fundraising and CSR contributions. Both are applied for electronically via Form 10A.',
  },
  {
    q: 'What is NITI Aayog NGO Darpan Registration?',
    a: 'NGO Darpan is the central government portal maintained by NITI Aayog. Registering on NGO Darpan generates a unique NGO ID, which is mandatory for any trust applying for central or state government grants, schemes, and Ministry project fundings.',
  },
  {
    q: 'Can a trust open a Current Bank Account?',
    a: 'Yes. Once the Trust Deed is registered and the Trust PAN card is allotted, any nationalized or private commercial bank (e.g., SBI, HDFC, ICICI, Axis) will open an institutional NGO Current Account in the name of the Trust, operated by the authorized managing trustees.',
  },
  {
    q: 'Can a trust accept foreign donations?',
    a: 'To accept donations from foreign individuals, organizations, or NRIs, a trust must first obtain FCRA (Foreign Contribution Regulation Act) registration from the Ministry of Home Affairs (MHA). FCRA is generally applied for after three years of active charitable operations and audited track records.',
  },
  {
    q: 'How long does the entire trust registration process take?',
    a: 'Deed drafting is completed within 24 to 48 hours. Sub-Registrar registration typically takes 4 to 7 working days depending on local sub-registrar appointment availability. PAN and TAN cards are issued within 3 to 5 days after registration.',
  },
];
