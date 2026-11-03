/**
 * Constants for Trust Registration Module (Public Charitable & Religious Trust)
 * Governed under Indian Trusts Act, 1882 / State Public Trusts Acts & Registration Act, 1908.
 * Covers Trust Deed drafting, Sub-Registrar registration, PAN/TAN, 12A & 80G tax exemptions, and NGO Darpan.
 */

export const TRUST_HERO = {
  badge: 'Only ISO 27001 Certified Legal Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Non-Profit Offer',
  title: 'Online Trust Registration in India',
  bullets: [
    'Register your Public Charitable or Religious Trust online starting at just ₹4,999',
    'Custom Trust Deed drafting on state stamp paper by senior High Court advocates',
    'Sub-Registrar filing guidance, PAN/TAN allotment, and Section 12A & 80G tax exemption support',
  ],
  stats: [
    { label: 'Trusts Registered', value: '15,000+' },
    { label: 'Client Rating', value: '4.9/5' },
    { label: 'Turnaround Time', value: '7-10 Days' },
    { label: 'Pan-India Coverage', value: '28 States & 8 UTs' },
  ],
};

export const TRUSTED_PARTNERS = [
  { name: 'NITI Aayog Darpan', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' },
  { name: 'Income Tax Dept', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Income_Tax_Department_India_logo.png/640px-Income_Tax_Department_India_logo.png' },
  { name: 'State Bank of India', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg' },
  { name: 'HDFC Bank NGO Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  { name: 'ICICI Foundation', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg' },
  { name: 'Axis Bank Trust Wing', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg' },
  { name: 'GiveIndia Network', logo: 'https://give.do/static/images/give-logo.png' },
  { name: 'E-Cell Social Impact', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
];

export const TRUST_TESTIMONIALS = [
  {
    id: 1,
    quote:
      'We wanted to establish a Public Charitable Educational Trust to fund rural school libraries in Karnataka. BharatFiling drafted our comprehensive Trust Deed, advised us on the local Sub-Registrar stamp duty in Bengaluru, and secured our Trust registration certificate within 8 days. Our 12A and 80G provisional approvals came through without any queries!',
    author: 'Dr. Rameshwar Hegde',
    title: 'Managing Trustee, Vidya Jyoti Educational Trust (Bengaluru, Karnataka)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Starting our healthcare relief trust in Delhi felt daunting due to sub-registrar queues and deed execution requirements. The BharatFiling legal team made it effortless. The trust deed had airtight clauses for charitable healthcare dispensaries and ambulance services. Highly recommended for genuine social founders.',
    author: 'Vandana Sen',
    title: 'Founder & Settlor, Sanjeevani Public Health Foundation (New Delhi)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Our family wanted to set up a religious and cultural preservation trust in Varanasi. The team took care of deed preparation, stamp duty calculation, and guided our 3 trustees smoothly through registration. Transparent pricing and no hidden costs.',
    author: 'Pandit Alok Nath Mishra',
    title: 'President Trustee, Kashi Seva & Vedic Heritage Trust (Varanasi, UP)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
];

export const TRUST_TYPES = [
  {
    id: 'public_charitable',
    title: 'Public Charitable Trust',
    desc: 'Formed for the benefit of the general public at large. Focuses on poverty relief, education, medical aid, social welfare, and environmental protection. Eligible for 12A & 80G tax benefits.',
    badge: 'Most Popular for NGOs',
    minTrustees: 'Min 2 (Recommended 3+)',
    icon: 'HeartHandshake',
  },
  {
    id: 'religious_trust',
    title: 'Public Religious Trust',
    desc: 'Created for religious worship, temple/shrine maintenance, community langar/prasad distribution, and promotion of spiritual and cultural traditions under specific state endowments.',
    badge: 'Community & Faith',
    minTrustees: 'Min 2 Trustees',
    icon: 'Landmark',
  },
  {
    id: 'educational_healthcare',
    title: 'Educational & Healthcare Trust',
    desc: 'Tailored for setting up non-profit schools, training institutes, clinics, research hospitals, and scholarship endowments with special governing bylaws.',
    badge: 'Institutional Scale',
    minTrustees: 'Min 3 Trustees',
    icon: 'GraduationCap',
  },
  {
    id: 'private_trust',
    title: 'Private Family Trust',
    desc: 'Established under the Indian Trusts Act, 1882 for the benefit of specific individuals, family members, or estate succession planning with defined financial beneficiaries.',
    badge: 'Estate & Succession',
    minTrustees: 'Min 2 Trustees',
    icon: 'Shield',
  },
];

export const TRUST_VS_SOCIETY_VS_SECTION8 = [
  {
    feature: 'Governing Legislation',
    trust: 'Indian Trusts Act, 1882 / State Public Trusts Acts (e.g., Bombay Public Trusts Act, 1950)',
    society: 'Societies Registration Act, 1860 (State-specific amendments)',
    section8: 'Companies Act, 2013 (Ministry of Corporate Affairs - Central Govt)',
  },
  {
    feature: 'Minimum Promoters / Trustees',
    trust: 'Minimum 2 Trustees (1 Settlor + 1 Trustee; recommended 3+ for public trusts)',
    society: 'Minimum 7 Members (from different families or states for national society)',
    section8: 'Minimum 2 Directors & Shareholders (Can be family members)',
  },
  {
    feature: 'Registration Authority',
    trust: 'Local Sub-Registrar of Assurances / Charity Commissioner in MH & GJ',
    society: 'State Registrar of Societies / Registrar of Co-operative Societies',
    section8: 'Registrar of Companies (ROC - Central MCA Portal)',
  },
  {
    feature: 'Core Legal Instrument',
    trust: 'Registered Trust Deed executed on Non-Judicial Stamp Paper',
    society: 'Memorandum of Association (MOA) and Rules & Regulations',
    section8: 'Certificate of Incorporation (COI), MOA & AOA license',
  },
  {
    feature: 'Annual Compliance Burden',
    trust: 'Lowest — Annual audit & personal ITR-7 filing; no heavy ROC filings',
    society: 'Moderate — Annual general meeting, list of governing body to Registrar',
    section8: 'High — Mandatory statutory audit, AOC-4, MGT-7, board resolutions, DIN e-KYC',
  },
  {
    feature: 'Tax Exemption (12A & 80G)',
    trust: '100% Eligible under Income Tax Act Form 10A/10AB',
    society: '100% Eligible under Income Tax Act Form 10A/10AB',
    section8: '100% Eligible under Income Tax Act Form 10A/10AB',
  },
  {
    feature: 'Setup Turnaround Time',
    trust: '7 to 10 Working Days (Fastest non-profit structure in India)',
    society: '15 to 25 Working Days',
    section8: '10 to 14 Working Days',
  },
];

export const REGISTRATION_ROUTES = [
  {
    title: 'Custom Trust Deed Drafting',
    badge: 'Step 1: Legal Foundation',
    desc: 'Expert drafting of the Trust Deed containing settlor covenants, trust objects, trustee powers, quorum rules, bank operation rights, and irrevocable dissolution clauses.',
    icon: 'FileText',
  },
  {
    title: 'Stamp Paper Execution',
    badge: 'Step 2: State Stamp Duty',
    desc: 'Procurement of non-judicial stamp paper based on your state rules and initial trust corpus fund (typically ₹1,000 to ₹10,000 corpus) with franking or e-stamping.',
    icon: 'Stamp',
  },
  {
    title: 'Sub-Registrar Registration',
    badge: 'Step 3: Official Seal',
    desc: 'Submission and formal registration of the signed deed before the jurisdictional Sub-Registrar of Assurances with two witness endorsements and photo biometric log.',
    icon: 'Building2',
  },
  {
    title: 'Trust PAN, 12A & 80G Tax Suite',
    badge: 'Step 4: NGO Tax Status',
    desc: 'Allotment of dedicated Trust PAN and TAN, opening of zero-balance NGO bank account, and provisional Section 12A & 80G tax-exemption certificate filing.',
    icon: 'Award',
  },
];

export const ALL_INDIA_STATES = [
  { code: 'DL', name: 'Delhi NCR', authority: 'Sub-Registrar of Assurances', stampDutyDesc: 'Fixed ₹500 + registration fees' },
  { code: 'MH', name: 'Maharashtra', authority: 'Charity Commissioner Office & Sub-Registrar', stampDutyDesc: 'Bombay Public Trusts Act Schedule' },
  { code: 'KA', name: 'Karnataka', authority: 'Department of Stamps and Registration', stampDutyDesc: 'Based on Trust Corpus value' },
  { code: 'TN', name: 'Tamil Nadu', authority: 'Sub-Registrar Office (Inspector General of Registration)', stampDutyDesc: 'State Stamp Act Schedule' },
  { code: 'TS', name: 'Telangana', authority: 'Registration & Stamps Department', stampDutyDesc: 'Nominal stamp duty on deed' },
  { code: 'UP', name: 'Uttar Pradesh', authority: 'IGRS Sub-Registrar', stampDutyDesc: 'Fixed e-stamp paper requirement' },
  { code: 'GJ', name: 'Gujarat', authority: 'Office of the Charity Commissioner & Sub-Registrar', stampDutyDesc: 'Bombay Public Trusts Act (Gujarat)' },
  { code: 'WB', name: 'West Bengal', authority: 'Directorate of Registration and Stamp Revenue', stampDutyDesc: 'Sub-Registrar valuation' },
  { code: 'RJ', name: 'Rajasthan', authority: 'Registration & Stamps Department Rajasthan', stampDutyDesc: 'Fixed e-stamp duty' },
  { code: 'HR', name: 'Haryana', authority: 'Tehsil Sub-Registrar Office', stampDutyDesc: 'Haryana Stamp Duty Schedule' },
  { code: 'MP', name: 'Madhya Pradesh', authority: 'Commercial Tax / Sub-Registrar', stampDutyDesc: 'Fixed non-judicial stamp' },
  { code: 'KL', name: 'Kerala', authority: 'Registration Department Kerala', stampDutyDesc: 'State Registration rules' },
  { code: 'AP', name: 'Andhra Pradesh', authority: 'Registration & Stamps Department AP', stampDutyDesc: 'State Stamp Schedule' },
  { code: 'PB', name: 'Punjab', authority: 'Department of Revenue & Rehabilitation', stampDutyDesc: 'Punjab Stamp Act' },
];

export const DOCUMENTS_REQUIRED = [
  {
    category: 'Settlor & Trustees KYC (Min 2 Persons)',
    items: [
      { name: 'PAN Card of Settlor & All Trustees', desc: 'Mandatory government identifier for deed execution and Trust PAN generation.' },
      { name: 'Aadhaar Card / Voter ID / Passport', desc: 'Valid identity and current residential address proof for all governing trustees.' },
      { name: 'Recent Passport-Size Photographs', desc: '2 clean passport-size color photographs of settlor, trustees, and 2 witnesses.' },
      { name: 'Two Independent Witnesses KYC', desc: 'Identity proofs of two independent Indian citizens witnessing the deed execution.' },
    ],
  },
  {
    category: 'Trust Registered Office Address',
    items: [
      { name: 'Latest Electricity / Water / Utility Bill', desc: 'Must not be older than 2 months for the trust registered address premises.' },
      { name: 'Rent Agreement / Lease Deed', desc: 'Required if the office premises is rented or leased for trust operations.' },
      { name: 'No Objection Certificate (NOC)', desc: 'Signed declaration from the legal property owner allowing non-profit trust operations.' },
      { name: 'Property Tax Receipt / Ownership Proof', desc: 'Document proving owner title if premises is owned by settlor or trustee.' },
    ],
  },
  {
    category: 'Trust Specific Particulars',
    items: [
      { name: 'Proposed Trust Name', desc: '3 preferred names ensuring uniqueness and non-infringement with existing charities.' },
      { name: 'Main Objects & Activities', desc: 'Detailed write-up of welfare causes (Education, Medical, Poverty, Religion, Arts).' },
      { name: 'Initial Corpus Fund Amount', desc: 'The initial monetary gift by settlor to found the trust (e.g., ₹1,000 to ₹10,000).' },
      { name: 'Trustee Hierarchy & Succession Plan', desc: 'Designations (Managing Trustee, Secretary, Treasurer) and replacement bylaws.' },
    ],
  },
];

export const REGISTRATION_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Consultation & Name Clearance',
    days: 'Day 1',
    desc: 'Our senior NGO attorneys help you finalize your trust name, governing body designations, and charitable objects matching Income Tax section 2(15) norms.',
  },
  {
    step: '02',
    title: 'Trust Deed Drafting & Stamping',
    days: 'Day 2-3',
    desc: 'Comprehensive drafting of the airtight Trust Deed on non-judicial stamp paper specific to your state with dissolution and non-distribution covenants.',
  },
  {
    step: '03',
    title: 'Sub-Registrar Registration & Stamping',
    days: 'Day 4-7',
    desc: 'Filing before the jurisdictional Sub-Registrar of Assurances for official deed registration, biometric logging, and certified copy issuance.',
  },
  {
    step: '04',
    title: 'Trust PAN/TAN, Bank A/C & 12A/80G',
    days: 'Day 8-10',
    desc: 'Allotment of dedicated Trust PAN and TAN cards, partner bank NGO current account opening, and filing for Section 12A & 80G tax exemptions.',
  },
];

export const PRICING_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Trust Deed Drafting',
    price: 4999,
    originalPrice: 9999,
    badge: 'Essential Drafting',
    popular: false,
    desc: 'Ideal for founders with their own local registrar access who require a legally bulletproof, tax-compliant Trust Deed drafted by High Court advocates.',
    features: [
      'Comprehensive Trust Deed drafted by senior advocate',
      'Charitable objects drafted compliant with Section 2(15) of IT Act',
      'Trustee rules, quorum, banking & succession bylaws',
      'Irrevocable dissolution and non-distribution covenants',
      'State-specific stamp duty guidance & checklist',
      'Dedicated legal manager & WhatsApp assistance',
    ],
    ctaText: 'Buy Starter Plan (₹4,999)',
  },
  {
    id: 'standard',
    name: 'Standard Trust Registration',
    price: 9999,
    originalPrice: 19999,
    badge: 'Most Popular',
    popular: true,
    desc: 'End-to-end registration package. Covers customized trust deed drafting, state stamp paper procurement, sub-registrar filing, and Trust PAN allotment.',
    features: [
      'Everything included in Starter Plan',
      'Non-Judicial Stamp Paper procurement as per state rules',
      'Sub-Registrar appointment booking & document compilation',
      'Dedicated CA/Advocate assistance during Sub-Registrar execution',
      'Certified Registered Trust Deed delivered to your address',
      'Dedicated Trust PAN Card & TAN allotment',
      'Priority assistance for NGO Current Account opening',
    ],
    ctaText: 'Buy Standard Plan (₹9,999)',
  },
  {
    id: 'premium',
    name: 'Complete Non-Profit Suite (Trust + 12A + 80G)',
    price: 18999,
    originalPrice: 37999,
    badge: 'Complete NGO Suite',
    popular: false,
    desc: 'Full-stack non-profit launchpad: Registered Trust Deed, Trust PAN, NITI Aayog NGO Darpan registration, and provisional Section 12A & 80G tax exemption filing.',
    features: [
      'Everything included in Standard Registration Plan',
      'Section 12A Income Tax Exemption filing (Form 10A/10AB)',
      'Section 80G Tax Deduction Certificate filing for donors',
      'NITI Aayog NGO Darpan Portal Registration & Unique ID',
      '1 Year Accounting & Invoicing software license',
      'Donation receipt templates compliant with Income Tax rules',
      '1 Year dedicated NGO compliance CA helpline',
    ],
    ctaText: 'Buy Complete Suite (₹18,999)',
  },
];

export const BUNDLED_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Expert Trust Deed drafting compliant with Indian Trusts Act',
    originalPrice: 9999,
    discount: '50% off',
    price: 4999,
    emiText: 'EMI option available from ₹435/mo.',
    recommended: false,
    theme: 'light',
    features: [
      'Expert advocate assisted drafting',
      'Airtight Trust Deed tailored to your welfare goals',
      'Compliance with Section 2(15) of Income Tax Act',
      'Trustee powers, quorum, and dissolution clauses',
      'State stamp paper calculation & sub-registrar guide',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    badge: 'Recommended',
    subtitle: 'Complete Trust Registration + Sub-Registrar Filing + PAN',
    originalPrice: 19999,
    discount: '50% off',
    price: 9999,
    emiText: 'EMI option available from ₹869/mo.',
    recommended: true,
    theme: 'dark',
    features: [
      'Everything in Starter Plan',
      'Non-judicial stamp paper procurement as per state laws',
      'Sub-Registrar appointment booking & file preparation',
      'Sub-Registrar execution assistance & certificate issuance',
      'Dedicated Trust PAN Card & TAN allotment',
      'Zero balance NGO bank account opening support',
      'Dedicated relationship manager on WhatsApp & phone',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'All-in-One: Trust + 12A + 80G Tax Exemption + NGO Darpan',
    originalPrice: 37999,
    discount: '50% off',
    price: 18999,
    emiText: 'EMI option available from ₹1,650/mo.',
    recommended: false,
    theme: 'light',
    features: [
      'Everything in Standard Plan',
      'Section 12A Tax Exemption filing on Income Tax portal',
      'Section 80G 50% Tax Deduction filing for donors',
      'NITI Aayog NGO Darpan Registration for CSR & Govt Grants',
      'Compliant donor receipt and voucher formats',
      '1 Year dedicated Chartered Accountant non-profit helpline',
      'Annual Income Tax Return (ITR-7) consultation',
    ],
  },
];

export const FAQS = [
  {
    q: 'What is a Public Charitable Trust in India?',
    a: 'A Public Charitable Trust is a non-profit legal entity established for public welfare activities such as relief of the poor, education, medical aid, preservation of environment or monuments, and advancement of any other object of general public utility. It is governed by the Indian Trusts Act, 1882 (or state public trusts acts) and the Registration Act, 1908.',
  },
  {
    q: 'How many trustees are required to register a trust?',
    a: 'Under Indian law, a minimum of two persons are required to form a trust: one Settlor (author/founder) and one Trustee. However, for a Public Charitable Trust aiming for government grants, CSR funding, or Section 12A & 80G tax exemptions, having at least three trustees (e.g., Managing Trustee, Secretary, and Treasurer) is highly recommended and often insisted upon by tax authorities.',
  },
  {
    q: 'Can family members be trustees in a Public Charitable Trust?',
    a: 'Yes, family members can legally be trustees. However, to maintain transparency and comply with Income Tax Section 13 guidelines (which prohibit undue benefits to founders or relatives), it is strongly advised to include independent, unrelated trustees on the governing board.',
  },
  {
    q: 'What is the role of the Sub-Registrar in Trust Registration?',
    a: 'In India, a trust involving immovable or movable property is legally recognized when its Trust Deed is executed and registered before the local Sub-Registrar of Assurances having jurisdiction over the trust’s registered office address. The settlor and trustees (with two independent witnesses) sign the deed in the presence of the sub-registrar.',
  },
  {
    q: 'Do trustees need to physically visit the Sub-Registrar office?',
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
    q: 'Can a trust open a bank current account?',
    a: 'Yes. Once the Trust Deed is registered and the Trust PAN card is allotted, any nationalized or private commercial bank (e.g., SBI, HDFC, ICICI, Axis) will open an institutional NGO Current Account in the name of the Trust, operated by the authorized managing trustees.',
  },
  {
    q: 'Can a trust accept foreign donations?',
    a: 'To accept donations from foreign individuals, organizations, or NRIs, a trust must first obtain FCRA (Foreign Contribution Regulation Act) registration from the Ministry of Home Affairs (MHA). FCRA is generally applied for after three years of active charitable operations and audited track records.',
  },
  {
    q: 'How long does the complete trust registration process take?',
    a: 'Drafting the trust deed takes 1 to 2 days. Stamp paper preparation and sub-registrar registration typically take 4 to 7 working days depending on local sub-registrar appointment availability. PAN and TAN cards are issued within 3 to 5 days after registration.',
  },
];
