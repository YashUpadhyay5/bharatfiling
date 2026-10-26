export const SHOP_PLANS = [
  {
    id: 'starter',
    alias: 'basic',
    name: 'Starter',
    subtitle: 'Ideal for small retail shops and self-operated micro commercial establishments',
    originalPrice: 3499,
    discountLabel: '43% off',
    discountPercent: 43,
    price: 1999,
    govtFee: 0,
    gstRate: 0.18,
    tat: '4 - 7 Working Days',
    hasEmi: false,
    recommended: false,
    formType: 'Form F / Intimation Filing',
    features: [
      'Statutory form drafting and filing',
      'Assistance on address and identity document compilation',
      'Submission with State Labour Department portal',
      'Intimation receipt / registration certificate generation',
      'Dedicated compliance specialist email support',
    ],
  },
  {
    id: 'express',
    alias: 'standard',
    name: 'Gumasta Express',
    subtitle: 'Most popular for active commercial offices, consulting firms, IT companies & growing retail stores',
    originalPrice: 5999,
    discountLabel: '42% off',
    discountPercent: 42,
    price: 3499,
    govtFee: 0,
    gstRate: 0.18,
    tat: 'Priority 48 - 72 Hours Filing',
    hasEmi: true,
    recommended: true,
    formType: 'Form G / Full Registration Certificate',
    features: [
      'Priority filing within 48-72 business hours',
      'Dedicated Senior Labour Law & Legal Expert assistance',
      'Statutory regional language shop nameboard template guidance',
      'Bank Current Account facilitation letter for immediate banking',
      'Complete statutory register templates (Attendance, Overtime, Wage)',
      '100% Guaranteed statutory compliance approval',
    ],
  },
  {
    id: 'all_in_one',
    alias: 'elite',
    name: 'All-in-One Compliance',
    subtitle: 'Complete end-to-end statutory business launch package including labor and tax enrolments',
    originalPrice: 10999,
    discountLabel: '45% off',
    discountPercent: 45,
    price: 5999,
    govtFee: 0,
    gstRate: 0.18,
    tat: 'Priority 48 Hours Filing',
    hasEmi: true,
    recommended: false,
    formType: 'Gumasta + PT + MSME Package',
    features: [
      'Shop & Establishment / Gumasta Registration Certificate',
      'MSME / Udyam statutory central government registration included',
      'Professional Tax Enrolment (PTEC / PTRC) state filing',
      'Statutory Labour Welfare Fund advisory & registration',
      'Dedicated Chartered Accountant & Legal Counsel',
      'Full suite of digital statutory registers & annual filing calendar',
    ],
  },
];

export const getShopPlan = (planId = 'express') => {
  const norm = String(planId).toLowerCase();
  const plan = SHOP_PLANS.find(
    (p) => p.id === norm || p.alias === norm || (norm === 'starter' && p.id === 'starter') || (norm === 'express' && p.id === 'express')
  );
  return plan || SHOP_PLANS[1] || SHOP_PLANS[0];
};

export const ESTABLISHMENT_TYPES = [
  {
    id: 'commercial',
    title: 'Commercial Establishment',
    badge: 'IT / SaaS / Offices / Agency',
    description: 'Any establishment which carries on any business, trade, advertising, consulting, accounting or administrative office service.',
    statute: 'Covers software tech companies, startups, BPOs, marketing agencies, and shared corporate offices.',
    requiresNameboard: true,
  },
  {
    id: 'retail',
    title: 'Retail Shop / Wholesale Outlet',
    badge: 'Trading / Retail / Stores',
    description: 'Any premises where goods are sold retail or wholesale, or services are rendered to customers, including connected storerooms and godowns.',
    statute: 'Covers physical shops, supermarkets, electronics, apparel, FMCG trading outlets.',
    requiresNameboard: true,
  },
  {
    id: 'food_hospitality',
    title: 'Restaurant / Cafe / Food Outlet',
    badge: 'Hospitality / Eateries',
    description: 'Residential hotels, restaurants, cafes, cloud kitchens, bakeries, bars, and public refreshment rooms.',
    statute: 'Requires adherence to municipal health and sanitary regulations alongside labor timings.',
    requiresNameboard: true,
  },
  {
    id: 'warehouse',
    title: 'Warehouse / Godown / Logistics',
    badge: 'Storage & Fulfillment',
    description: 'Depots, packaging facilities, inventory hubs, and freight forwarding premises.',
    statute: 'Regulates loading/unloading shifts, safety equipment, and adult worker overtime.',
    requiresNameboard: true,
  },
];

export const SHOP_STATES = [
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    actName: 'Maharashtra Shops & Establishments (Regulation of Employment and Conditions of Service) Act, 2017',
    popularTerm: 'Gumasta License (गुमास्ता)',
    portal: 'Aaple Sarkar / Labour Department Maharashtra',
    validity: 'Lifetime (0-9 employees Form F) / 1 to 3 Years (10+ employees Form G)',
    tat: '2 - 5 Business Days',
    nameboardRule: 'Mandatory: Marathi font in Devanagari script must be placed at the top and must be of equal or larger font size than English.',
    statutoryBodies: ['BMC Mumbai', 'PMC Pune', 'PCMC Pimpri', 'TMC Thane', 'NMC Nagpur', 'KDMC'],
    zeroToNineRule: 'Establishments with less than 10 workers need only submit Online Intimation (Form F) which is issued instantly without physical inspection.',
  },
  {
    id: 'delhi',
    name: 'Delhi (NCT)',
    actName: 'Delhi Shops and Establishments Act, 1954',
    popularTerm: 'Delhi Shop Act Registration',
    portal: 'Labour Department, Government of NCT of Delhi (labourcis.nic.in)',
    validity: 'Lifetime validity (Unless modified or cancelled)',
    tat: '3 - 5 Business Days',
    nameboardRule: 'Bilingual display in Hindi and English recommended.',
    statutoryBodies: ['MCD (Municipal Corporation of Delhi)', 'NDMC', 'Delhi Cantonment Board'],
    zeroToNineRule: '100% online computerised registration through Chief Inspector of Shops.',
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    actName: 'Karnataka Shops and Commercial Establishments Act, 1961',
    popularTerm: 'e-Karmika Registration Certificate',
    portal: 'Department of Labour Karnataka (e-Karmika Portal)',
    validity: '5 Years from date of issue',
    tat: '3 - 7 Business Days',
    nameboardRule: 'Mandatory: Kannada language must occupy at least 60% of the upper half of the nameboard.',
    statutoryBodies: ['BBMP Bengaluru', 'Labour Commission Bengaluru', 'Mysuru City Corporation'],
    zeroToNineRule: 'Online registration mandatory within 30 days of opening premises.',
  },
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    actName: 'Tamil Nadu Shops and Establishments Act, 1947 & Rules 1948',
    popularTerm: 'TN Labour Department Registration',
    portal: 'Tamil Nadu Labour Department Portal',
    validity: 'Renewable every 1 or 5 years',
    tat: '4 - 7 Business Days',
    nameboardRule: 'Mandatory: Tamil display board is compulsory under Section 2(1).',
    statutoryBodies: ['Greater Chennai Corporation', 'Coimbatore Municipal Corp', 'Madurai Corp'],
    zeroToNineRule: 'Regulates working hours, rest intervals, and compulsory weekly holidays.',
  },
  {
    id: 'uttar_pradesh',
    name: 'Uttar Pradesh',
    actName: 'UP Dookan Aur Vanijya Adhishthan Adhiniyam, 1962',
    popularTerm: 'UP Dukan Adhiniyam Registration',
    portal: 'Nivesh Mitra Portal / UP Labour Department',
    validity: '1 to 5 Years with auto-renewal provision',
    tat: '3 - 6 Business Days',
    nameboardRule: 'Hindi (Devanagari) along with English.',
    statutoryBodies: ['Noida Authority', 'Greater Noida', 'Lucknow Municipal Corp', 'Kanpur Nagar Nigam'],
    zeroToNineRule: 'Integrated single-window clearance through Nivesh Mitra.',
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    actName: 'Gujarat Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2019',
    popularTerm: 'Gujarat Gumastadhara / Shop Act',
    portal: 'e-Nagar Portal / AMC / SMC',
    validity: 'Lifetime for 0-9 employees / 1 to 5 years for 10+ employees',
    tat: '2 - 5 Business Days',
    nameboardRule: 'Gujarati language font must be prominently displayed.',
    statutoryBodies: ['Amdavad Municipal Corporation (AMC)', 'Surat Municipal Corporation (SMC)', 'VMC Vadodara'],
    zeroToNineRule: 'Intimation receipt for under 10 employees generated with zero state fees.',
  },
  {
    id: 'telangana',
    name: 'Telangana',
    actName: 'Telangana Shops and Establishments Act, 1988',
    popularTerm: 'TS-iPASS Shop Act Registration',
    portal: 'TS-iPASS Labour Department Telangana',
    validity: '1 Year renewable annually by December 31',
    tat: '3 - 5 Business Days',
    nameboardRule: 'Telugu and English display boards required.',
    statutoryBodies: ['GHMC Hyderabad', 'Warangal Municipal Corp', 'Cyberabad Labour Commissioner'],
    zeroToNineRule: 'Integrated registration with instant certificate download upon approval.',
  },
  {
    id: 'west_bengal',
    name: 'West Bengal',
    actName: 'West Bengal Shops and Establishments Act, 1963',
    popularTerm: 'WB Shop & Establishment License',
    portal: 'Silpa Sathi Single Window Portal / e-District WB',
    validity: '3 Years renewable',
    tat: '4 - 8 Business Days',
    nameboardRule: 'Bengali and English signage required.',
    statutoryBodies: ['Kolkata Municipal Corporation (KMC)', 'Howrah Municipal Corp', 'Siliguri Corp'],
    zeroToNineRule: 'Mandatory registration with Labour Commissionerate.',
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    actName: 'Rajasthan Shops and Commercial Establishments Act, 1958',
    popularTerm: 'Rajasthan Shop Act',
    portal: 'RajSSO Labour Portal',
    validity: '3 to 5 Years',
    tat: '3 - 6 Business Days',
    nameboardRule: 'Hindi and English signage.',
    statutoryBodies: ['Jaipur Nagar Nigam', 'Jodhpur Nagar Nigam', 'RIICO'],
    zeroToNineRule: 'Online filing through Single Sign-On (SSO) portal.',
  },
  {
    id: 'haryana',
    name: 'Haryana',
    actName: 'Punjab Shops and Commercial Establishments Act, 1958 (as applicable to Haryana)',
    popularTerm: 'Haryana Labour Department Shop License',
    portal: 'Haryana Enterprise Promotion Centre (HEPC)',
    validity: 'Lifetime validity with annual fee submission',
    tat: '3 - 5 Business Days',
    nameboardRule: 'Hindi and English signage.',
    statutoryBodies: ['MCG Gurugram', 'MCF Faridabad', 'Panchkula Corp'],
    zeroToNineRule: 'Covers millennium city tech hubs, startups, and IT corridors in Gurugram.',
  },
];

export const SHOP_DOCUMENTS = {
  proprietorship: [
    { title: 'PAN Card of Proprietor', desc: 'Government issued Permanent Account Number of the business owner.', icon: 'FileText' },
    { title: 'Aadhaar Card / Voter ID', desc: 'Identity & permanent residential address proof of the applicant.', icon: 'ShieldCheck' },
    { title: 'Proof of Business Address', desc: 'Electricity Bill / Telephone Bill / Municipal Water Tax receipt (not older than 2 months).', icon: 'Building2' },
    { title: 'Rent Agreement & Landlord NOC', desc: 'Registered or notarized rent agreement along with No Objection Certificate if premises are rented.', icon: 'FileCheck' },
    { title: 'Photograph of Shop / Establishment', desc: 'Clear front exterior photograph of premises showing shop entrance and nameboard prominently in regional language.', icon: 'Award' },
    { title: 'Bank Account Proof', desc: 'Cancelled cheque or first page of bank statement for proof of financial domicile.', icon: 'Briefcase' },
  ],
  partnership: [
    { title: 'PAN Card of Partnership / LLP', desc: 'Entity PAN issued by the Income Tax Department.', icon: 'FileText' },
    { title: 'Partnership Deed / LLP Agreement', desc: 'Executed copy of Partnership Deed or registered LLP agreement.', icon: 'FileCheck' },
    { title: 'PAN & Aadhaar of All Partners', desc: 'Identity and residential proofs for all active and designated partners.', icon: 'Users' },
    { title: 'Proof of Registered Office', desc: 'Electricity Bill or Property Tax Receipt in the name of owner.', icon: 'Building2' },
    { title: 'NOC / Rental Agreement', desc: 'Lease deed in the name of the partnership entity.', icon: 'ShieldCheck' },
    { title: 'Front Facade Photo with Nameboard', desc: 'Exterior photograph showing premises and statutory bilingual nameboard.', icon: 'Award' },
  ],
  company: [
    { title: 'Certificate of Incorporation (COI)', desc: 'MCA incorporation certificate with Corporate Identification Number (CIN).', icon: 'Award' },
    { title: 'Company PAN Card', desc: '10-digit Permanent Account Number of the Private Limited / OPC.', icon: 'FileText' },
    { title: 'MoA & AoA', desc: 'Memorandum of Association and Articles of Association endorsed by RoC.', icon: 'FileCheck' },
    { title: 'Board Resolution', desc: 'Certified true copy of board resolution authorizing director/manager for Shop Act application.', icon: 'Briefcase' },
    { title: 'PAN & Aadhaar of Directors', desc: 'KYC identity proofs for all managing and authorized directors.', icon: 'Users' },
    { title: 'Registered Office Proof & Photo', desc: 'Utility bill, rent agreement, NOC and front entrance photo with signboard.', icon: 'Building2' },
  ],
};

export const SHOP_BENEFITS = [
  {
    id: 'legal',
    title: '1. Legal Sanction & Compliance',
    desc: 'Provides statutory recognition under state labour law, ensuring your business operates legally without risk of sudden departmental shutdown or sealing.',
    icon: 'Scale',
  },
  {
    id: 'bank',
    title: '2. Frictionless Current Account Opening',
    desc: 'Reserve Bank of India (RBI) KYC guidelines accept Shop & Establishment certificates as primary official proof of business premises for current bank accounts.',
    icon: 'Building2',
  },
  {
    id: 'penalty',
    title: '3. Penalty Avoidance',
    desc: 'Avoid hefty compounding fines ranging from ₹1,000 to ₹15,000 for operating without a license within the mandatory 30-day statutory window.',
    icon: 'ShieldCheck',
  },
  {
    id: 'welfare',
    title: '4. Worker Welfare & Dispute Defense',
    desc: 'Establishes clear statutory terms for employee working hours, weekly offs, overtime pay, and leave encashment, protecting you from frivolous labor disputes.',
    icon: 'Users',
  },
  {
    id: 'subsidies',
    title: '5. Access to Government Subsidies & Loans',
    desc: 'Enables quick eligibility for MSME credit schemes, Mudra business loans, export incentives, and state industrial development grants.',
    icon: 'Award',
  },
  {
    id: 'credibility',
    title: '6. Enhanced Business Credibility',
    desc: 'Displays government certification that boosts confidence among vendors, enterprise clients, landlords, and institutional investors.',
    icon: 'Briefcase',
  },
  {
    id: 'registers',
    title: '7. Streamlined Statutory Audits',
    desc: 'Simplifies labour department inspections by structuring Form A, B, C, and D attendance, overtime, and salary registers in legal format.',
    icon: 'FileCheck',
  },
  {
    id: 'expansion',
    title: '8. Frictionless Multi-City Expansion',
    desc: 'Facilitates smooth licensing when expanding into new municipal wards, shopping complexes, IT tech parks, and commercial special economic zones (SEZs).',
    icon: 'Sparkles',
  },
];

export const SHOP_FAQS = [
  {
    q: 'How long does the Shop and Establishment registration process take?',
    a: 'At BharatFiling, we aim to make the registration process as seamless as possible. Typically, it takes 2 to 5 working days depending on the state and municipal corporation. In states like Maharashtra, Intimation for under 10 employees (Form F) is generated within 48 to 72 hours, while states requiring departmental scrutiny take 4 to 7 business days.',
  },
  {
    q: 'What is the Shop and Establishment Certificate or Gumasta License?',
    a: 'The Shop and Establishment Certificate (commonly known as Gumasta License in Maharashtra and Gujarat, or e-Karmika in Karnataka) is a mandatory state government license required by every commercial business, office, retail outlet, and service firm. It regulates working hours, wage payments, employee welfare, health and safety standards, and statutory holidays.',
  },
  {
    q: 'What are the costs and government fees involved in registration?',
    a: 'Costs depend on the operating state and total employee headcount. In Maharashtra, establishments with 0-9 employees pay zero state fees (only filing/drafting professional fees), whereas establishments with 10+ employees pay tiered state fees ranging from ₹1,000 to ₹5,000 based on worker count. Our transparent plans start at ₹1,999 with zero hidden charges.',
  },
  {
    q: 'Is renewal of the Shop & Establishment Certificate mandatory?',
    a: 'Renewal requirements vary by state. Under Maharashtra’s amended 2017 Act, Intimation under Form F (0 to 9 workers) has lifetime validity without renewal. Form G (10+ workers) is issued for 1 to 3 years and can be renewed online. In Karnataka, certificates are valid for 5 years, while in Delhi registrations carry lifetime validity unless amended.',
  },
  {
    q: 'Can I use a single certificate for multiple branches or offices?',
    a: 'No. The Shop and Establishment Act applies specifically to the physical premises where business is carried on. If you operate multiple branches, warehouses, or satellite retail locations across different municipal wards or states, a distinct Shop & Establishment registration must be procured for each separate premises.',
  },
  {
    q: 'Can I open a Current Bank Account with this certificate?',
    a: 'Yes, absolutely. The Shop & Establishment Certificate is accepted by all major scheduled commercial banks (HDFC, ICICI, SBI, Axis, Kotak) as a primary statutory business registration document and proof of registered operating address under RBI Master Direction Know Your Customer (KYC) norms.',
  },
  {
    q: 'What happens if I fail to obtain or renew the certificate?',
    a: 'Operating a business without a valid Shop and Establishment Certificate is an offence under state labour laws. It can attract compounding penalties starting from ₹1,000 up to ₹15,000 for the first inspection, and up to ₹2,00,000 or temporary sealing of the commercial premises for repeated non-compliance.',
  },
  {
    q: 'Is a shop nameboard in the regional state language compulsory?',
    a: 'Yes. In several major states, statutory rules mandate that commercial signage boards feature the state language prominently. In Maharashtra, Marathi in Devanagari script must be displayed with letters at least equal in size to English. In Karnataka, Kannada must occupy at least 60% of the upper half of the board. BharatFiling guides you on exact compliance.',
  },
  {
    q: 'Can home-based businesses or remote consulting agencies register?',
    a: 'Yes! Remote software startups, freelance agencies, e-commerce sellers, and home-office consulting setups can register their residential address as the commercial establishment by submitting the property tax receipt, electricity bill, and rental agreement with landlord NOC.',
  },
  {
    q: 'What is the difference between Shop Act and MSME/Udyam Registration?',
    a: 'Shop & Establishment is a state-level statutory labour license regulating employment, working hours, and physical business premises. MSME (Udyam) is a central government registration issued by the Ministry of Micro, Small and Medium Enterprises that provides priority sector bank lending, subsidies, and tender benefits. Both are complementary and recommended.',
  },
  {
    q: 'What documents are required to apply for Shop and Establishment?',
    a: 'You need: (1) Identity proof of owner/directors (PAN and Aadhaar), (2) Address proof of premises (Electricity bill, Telephone bill or Property Tax receipt), (3) Rent agreement with landlord NOC if rented, (4) Front photo of shop showing the nameboard, and (5) Entity documents (Partnership Deed, MOA/AOA, or COI) for firms and companies.',
  },
  {
    q: 'How does BharatFiling assist in obtaining the license?',
    a: 'BharatFiling provides an end-to-end 100% online assisted service. Our senior legal and compliance specialists review your documents, map your business to the exact municipal portal, draft the statutory applications, handle government queries or inspections, and deliver the final government-stamped digital certificate directly to your dashboard and email.',
  },
];

export const TRUSTED_PARTNERS = [
  { name: 'Swiggy', logo: 'https://assets.vakilsearch.com/live-images/homepage/trustedPartners-swiggy.svg' },
  { name: 'BigBasket', logo: 'https://assets.vakilsearch.com/live-images/homepage/trustedPartners-bigbasket.svg' },
  { name: 'Amazon', logo: 'https://assets.vakilsearch.com/live-images/homepage/trustedPartners-amazon.svg' },
  { name: 'Uber', logo: 'https://assets.vakilsearch.com/live-images/homepage/trustedPartners-uber.svg' },
  { name: 'Oyo', logo: 'https://assets.vakilsearch.com/live-images/homepage/trustedPartners-oyo.svg' },
  { name: 'Dunzo', logo: 'https://assets.vakilsearch.com/live-images/homepage/trustedPartners-dunzo.svg' },
];

export const HERO_TESTIMONIALS = [
  {
    quote: "Got our Mumbai IT office Gumasta License issued in just 3 days! The team handled the BMC portal and signage compliance flawlessly.",
    name: "Vikramaditya Singhania",
    company: "Singhania Cloud Dynamics LLP, Mumbai",
    rating: 5,
    tag: "Gumasta Express"
  },
  {
    quote: "Opening our current account with ICICI Bank was stuck without business address proof. BharatFiling delivered our Karnataka e-Karmika certificate in 48 hours.",
    name: "Pooja Hegde",
    company: "Namma Organic Stores, Bengaluru",
    rating: 5,
    tag: "Retail Shop License"
  },
  {
    quote: "Smooth and totally online experience. Adv. Meera guided us through the Delhi Shop Act process without us having to visit the Labour Commission.",
    name: "Arjun Oberoi",
    company: "Oberoi Digital Creative Studio, New Delhi",
    rating: 5,
    tag: "Commercial Office"
  }
];
