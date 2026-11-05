// constants.js - Factory License Compliance (Factories Act, 1948 & DISH State Rules)

export const FACTORY_LICENSE_HERO = {
  badge: 'Factories Act, 1948 & State DISH Certified 🏭',
  title: 'Factory License Registration & Annual Compliance Online',
  description:
    'End-to-end industrial licensing: factory building plan approval, machinery layout certification, annual license renewals, and statutory Form 21 / Form 22 returns filing under the Chief Inspector of Factories (CIF).',
  bullets: [
    'Factory Building Plan & Machinery Layout approval by certified competent engineers.',
    'New factory license grant and multi-year renewals (up to 10 years) via state DISH portals.',
    'Complete annual statutory returns (Form 21, Form 22, Form 25) with zero penalties.',
  ],
  videoModal: {
    title: 'Factories Act Compliance & Safety Inspection Walkthrough',
    description:
      'Learn how DISH inspections, Form 11 lifting machinery testing, pressure vessel audits, and computerized factory returns work under the Factories Act, 1948.',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
  },
  cardTitle: 'Factory License Compliance',
  consultationFeeText: '₹999 ₹499 for a 30-minute Industrial Safety & License Consultation',
  guaranteeText: 'Certified DISH Competent Persons & Industrial Safety Advocates',
};

export const TRUSTED_PARTNERS = [
  { name: 'Directorate of Industrial Safety & Health (DISH)', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' },
  { name: 'Chief Inspector of Factories (CIF Network)', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'Central Pollution Control Board (CPCB / SPCB)', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  { name: 'National Safety Council of India (NSC)', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg' },
  { name: 'Petroleum & Explosives Safety Organisation (PESO)', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
];

export const CORE_FEATURES = [
  {
    icon: 'Factory',
    title: 'Factory Plan Approval (Section 6)',
    desc: 'Preparation and vetting of architectural blueprints, machine layout drawings, ventilation, natural light, and emergency exit drawings by chartered civil & structural engineers.',
  },
  {
    icon: 'ShieldCheck',
    title: 'License Grant & Multi-Year Renewal',
    desc: 'Submission of Form 2 / Form 3 online with DISH for 1 to 10 year license validity, calculating horse power (HP) and worker strength slab fees accurately.',
  },
  {
    icon: 'FileSpreadsheet',
    title: 'Statutory Annual Returns (Form 21/22)',
    desc: 'Mandatory filing of Form 21 (Annual Return) and Form 22 (Half-Yearly Return) detailing man-hours worked, wages paid, leave with wages, and health surveillance records.',
  },
  {
    icon: 'HardHat',
    title: 'Safety Audits & Testing (Forms 8, 9 & 11)',
    desc: 'Annual inspection and certification of hoists, lifts, cranes, pressure plants, gantry structures, and thermic fluid heaters by state-notified Competent Persons.',
  },
  {
    icon: 'HeartPulse',
    title: 'Occupational Health & Medical Exams',
    desc: 'Coordination of Form 7 health registers, annual fitness medical examinations for hazardous process workers, canteen hygiene audits, and first-aid room inspections.',
  },
  {
    icon: 'AlertTriangle',
    title: 'DISH Inspection Notice Representation',
    desc: 'Legal drafting of replies to Show Cause Notices, Inspector improvement notices, compoundable offence settlement, and rectification reports.',
  },
];

export const APPLICABILITY_MATRIX = [
  {
    category: 'With Power (Section 2m(i))',
    criteria: '10 or more workers working with the aid of electrical / mechanical power on any day of preceding 12 months.',
    statutoryMandate: 'Mandatory Factory License, Stability Certificate, and Form 2 filing before manufacturing commencement.',
    popularIndustries: 'CNC Machining, Plastics, Auto Ancillaries, Textile Weaving, Food Processing, Chemical Formulation.',
  },
  {
    category: 'Without Power (Section 2m(ii))',
    criteria: '20 or more workers working without the aid of power on any day of preceding 12 months.',
    statutoryMandate: 'Mandatory Factory Registration, ventilation/sanitation layout approval, and welfare officer appointment if > 500 workers.',
    popularIndustries: 'Handloom, Manual Garment Assembly, Stone Cutting, Hand Packaging, Handicraft Manufacture.',
  },
  {
    category: 'Notified Hazardous Processes (Section 85)',
    criteria: 'Industries notified under First Schedule regardless of power or worker threshold (even with 2 or more workers).',
    statutoryMandate: 'Stringent On-site Emergency Plan, Safety Committee formation, Medical Fitness Certificates, and SPCB NOC.',
    popularIndustries: 'Electroplating, Dyeing & Bleaching, Foundry & Forging, Battery Manufacturing, Solvent Extraction, Pesticides.',
  },
  {
    category: 'Industrial Estates & SEZs / EOU',
    criteria: 'Manufacturing units operating in MIDC, GIDC, SIPCOT, KIADB, RIICO, UPSIDC industrial zones or Export Zones.',
    statutoryMandate: 'Single window clearance synchronization (Nivesh Mitra / Maitri) with industrial land possession deed & building stability.',
    popularIndustries: 'Export Garments, Pharmaceuticals, Heavy Engineering, Precision Electronics, Warehousing with Assembly.',
  },
];

export const COMPLIANCE_WORKFLOW = [
  {
    step: '01',
    title: 'Document & Floor Plan Audit',
    desc: 'Review of land ownership/lease deed, building stability certificate (Form 1/1A), plant machinery list with KW/HP ratings, and raw material inventory.',
  },
  {
    step: '02',
    title: 'CAD Plan & Structural Verification',
    desc: 'Drafting scaled CAD layout drawings showing ventilation, exit routes, fire extinguishers, drinking water points, washrooms, and machinery spacing.',
  },
  {
    step: '03',
    title: 'Online CIF / DISH Portal Filing',
    desc: 'Uploading verified plans, stability certificates, and paying state treasury fees through single-window portals (Maitri, Nivesh Mitra, IF&B, etc.).',
  },
  {
    step: '04',
    title: 'Inspector of Factories Site Audit',
    desc: 'Coordinating physical or computerized spot inspection by the Assistant Director / Inspector of Factories; addressing inspection observations.',
  },
  {
    step: '05',
    title: 'License Issuance / Renewal Endorsement',
    desc: 'Grant of digitized Factory License Certificate signed by the Chief Inspector of Factories with assigned registration number.',
  },
  {
    step: '06',
    title: 'Statutory Registers & Annual Returns',
    desc: 'Setup of Form 12 (Adult Worker Register), Form 15 (Leave with Wages), Form 17 (Health Register), and calendar alerts for Form 21 annual returns.',
  },
];

export const PENALTY_AVOIDANCE = [
  {
    offence: 'Operating Factory Without Valid License',
    section: 'Section 92 of Factories Act, 1948',
    consequence: 'Imprisonment up to 2 years, fine up to ₹1,00,000, and ongoing penalty of ₹1,000 per day until rectified.',
    protection: 'Instant provisional acknowledgement + expedited DISH filing within 5-7 working days.',
  },
  {
    offence: 'Fatal Accident / Severe Injury Violation',
    section: 'Section 92 Proviso',
    consequence: 'Minimum fine of ₹25,000 for serious bodily injury; minimum ₹1,00,000 fine for fatal accident + criminal prosecution of Occupier & Manager.',
    protection: 'Quarterly safety audits, Form 11 lifting gear fitness certifications, and mock drill logs.',
  },
  {
    offence: 'Non-Filing of Form 21 / 22 Annual Returns',
    section: 'State Factory Rules (Rule 100/102)',
    consequence: 'Suspension of factory license, refusal of renewal, prosecution in Chief Judicial Magistrate court.',
    protection: 'Automated statutory data compilation and zero-error digital return submission before due date (February 1).',
  },
  {
    offence: 'Employing Workers Beyond Statutory Hours',
    section: 'Section 51, 54 & 59 (Overtime Rules)',
    consequence: 'Compounding fines up to ₹50,000 per violation; liability for double-rate overtime arrears with back interest.',
    protection: 'Form 10 overtime register setup and automated shift limit validation according to state limits.',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Factory License Renewal & Basic Filings',
    price: 9999,
    originalPrice: 18999,
    badge: 'Small Units (< 50 Workers)',
    features: [
      'Annual or Multi-Year Factory License Renewal application',
      'Government fee calculation & DISH online treasury challan',
      'Filing of Form 21 (Annual Return) & Form 22 (Half-Yearly Return)',
      'Statutory register checklist (Form 12, Form 15, Form 17)',
      'Digital License copy download & compliance dossier',
      'Email & telephone support with Factory Compliance Associate',
    ],
    cta: 'Select Renewal Package',
    popular: false,
  },
  {
    id: 'growth',
    name: 'Comprehensive Factory Licensing & Safety Audit',
    price: 18999,
    originalPrice: 34999,
    badge: 'Most Popular (50-250 Workers)',
    features: [
      'Everything in Renewal Package +',
      'Factory Building Plan Approval (CAD layout review & submission)',
      'Machinery Layout & Power Load (HP/KW) certification',
      'Form 1 / 1A Building Stability Certificate coordination',
      'Form 11 Lifting Tackle & Hoist testing reports by Competent Person',
      'Drafting responses to Factory Inspector observation memos',
      'Dedicated Industrial Safety Advocate assigned as account manager',
    ],
    cta: 'Select Comprehensive Licensing',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Industrial Undertaking & Hazardous EHS Retainer',
    price: 34999,
    originalPrice: 59999,
    badge: 'Large Plants (> 250 Workers / Hazardous)',
    features: [
      'Complete Plant EHS (Environment, Health & Safety) Retainer',
      'Multi-state factory cluster coordination & single-point tracking',
      'Pressure vessel (Form 8) & safety relief valve hydraulic testing',
      'On-Site Emergency Plan preparation & mock drill documentation',
      'Safety Committee minutes & Occupational Health Center (OHC) records',
      'Direct liaison with Chief Inspector of Factories (CIF) during audits',
      'Quarterly mock audits and CJM summons / notice legal defense representation',
    ],
    cta: 'Consult for Enterprise Retainer',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Vikramaditya Shinde',
    role: 'Managing Director, Precision Auto Gears Pvt Ltd',
    location: 'Chakan MIDC, Pune',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    content:
      'We had expanded our shop floor from 40 to 120 CNC operators and needed urgent factory building plan revision and HP enhancement under DISH Maharashtra. BharatFiling managed the CAD layout, civil stability certificate, and got our revised license approved in just 18 days without production stoppage.',
    rating: 5,
  },
  {
    name: 'Meenakshi Sundaram',
    role: 'Head of Operations, Southern Texfab Industries',
    location: 'Tirupur, Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    content:
      'Our factory license renewal was stuck due to legacy Form 21 return discrepancies from previous years. The BharatFiling industrial safety legal team corrected the worker wage registers, paid minimal compounding fees, and renewed our 5-year DISH license seamlessly.',
    rating: 5,
  },
  {
    name: 'Rajesh Kulkarni',
    role: 'Director, Kulkarni Pharma Intermediates',
    location: 'Ankleshwar GIDC, Gujarat',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    content:
      'Handling hazardous chemical manufacturing under Section 85 is daunting. BharatFiling coordinated our On-site Emergency Plan, Form 8 pressure vessel testing, and CIF inspection smoothly. Highly recommended for heavy manufacturing units.',
    rating: 5,
  },
];

export const FAQS = [
  {
    q: 'What is a Factory License and who needs it in India?',
    a: 'Under Section 2(m) of the Factories Act, 1948, any manufacturing premises where 10 or more workers operate with the aid of electrical/mechanical power, or 20 or more workers operate without power, must obtain a Factory License from the Chief Inspector of Factories (CIF) / Directorate of Industrial Safety and Health (DISH) before starting operations.',
  },
  {
    q: 'What is the difference between a Factory License and a Shop Act Registration?',
    a: 'A Shop and Establishment registration applies to commercial offices, shops, trading firms, and warehouses governed by state Municipal Labour departments. A Factory License specifically applies to premises where a manufacturing process or transformation of goods takes place with machinery, and is governed by strict occupational safety, health, and welfare standards under the Factories Act, 1948.',
  },
  {
    q: 'What documents are required to obtain Factory Building Plan Approval?',
    a: 'Documents include scaled CAD architectural drawings showing floor plan, elevations, cross-sections, machine layout, natural lighting, ventilation, and emergency exits; manufacturing process flow chart; list of raw materials and by-products; machinery list with HP/KW rating; land possession deed/lease agreement; and Building Stability Certificate (Form 1) signed by a certified civil structural engineer.',
  },
  {
    q: 'How is the government fee calculated for a Factory License?',
    a: 'The government fee is calculated based on a matrix of two factors: (1) Maximum number of workers employed on any single day during the year, and (2) Total installed horse power (HP) or kilowatt (KW) rating of manufacturing machinery. States offer renewals for 1, 3, 5, or up to 10 years at a time with proportional fee slabs.',
  },
  {
    q: 'What is Form 21 and Form 22 in Factory compliance?',
    a: 'Form 21 is the Annual Statutory Return submitted to the Inspector of Factories on or before February 1st every year, covering total man-days worked, average daily employment, total wages paid, maternity benefits, and accident statistics. Form 22 is the Half-Yearly Return filed before July 15th.',
  },
  {
    q: 'Who is an "Occupier" under the Factories Act, 1948?',
    a: 'Under Section 2(n), the Occupier is the person who has ultimate control over the affairs of the factory. In the case of a company, any one of the directors is designated as the Occupier. The Occupier is personally and criminally liable for factory safety and statutory compliance.',
  },
  {
    q: 'What is a Stability Certificate (Form 1 / Form 1A)?',
    a: 'A Stability Certificate is a statutory engineering report issued by a state-notified Competent Person certifying that the factory building, foundations, roofing, and gantry crane structures are structurally safe to bear the vibrational and dead loads of the installed manufacturing machinery.',
  },
  {
    q: 'How often must lifting machines, chains, and hoists be tested?',
    a: 'Under Section 29 of the Factories Act, all hoists, lifts, overhead travelling cranes, winches, slings, and lifting tackles must be thoroughly examined and load-tested by a Competent Person at least once every 12 months, and recorded in Form 11.',
  },
  {
    q: 'What happens if a factory operates without a valid license?',
    a: 'Under Section 92, the Occupier and Manager can face criminal prosecution resulting in imprisonment up to 2 years, a fine up to ₹1,00,000, and daily continuing fines. In addition, the factory faces immediate closure orders and disconnection of industrial power supply by electricity boards.',
  },
  {
    q: 'Can we renew an expired factory license online?',
    a: 'Yes, most states (Maharashtra, Gujarat, Tamil Nadu, Karnataka, Uttar Pradesh, Haryana, Telangana) allow online renewal through single window portals. If expired, compounding late fees (typically 25% to 100% of the annual fee) apply depending on the number of overdue months.',
  },
  {
    q: 'Is Pollution Control Board (SPCB) CTE / CTO required for a Factory License?',
    a: 'Yes. Before granting a final Factory License or operating machinery, the Chief Inspector of Factories requires the Consent to Establish (CTE) and Consent to Operate (CTO) issued by the relevant State Pollution Control Board (except for exempted White category industries).',
  },
  {
    q: 'How does BharatFiling assist in Factory Inspections?',
    a: 'Our Industrial Safety Advocates and field consultants prepare your statutory registers, safety dossiers, machine maintenance logs, and mock-audit your premises before the Inspector of Factories visits. We represent you during queries, draft compliance rectification reports, and ensure speedy license clearance.',
  },
];

export const FACTORY_CHECKOUT = {
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
  'IndusInd Bank',
  'IDBI Bank',
  'Yes Bank',
  'Federal Bank',
  'Indian Bank',
  'Central Bank of India',
  'Indian Overseas Bank',
  'South Indian Bank',
  'UCO Bank',
  'RBL Bank',
  'Bandhan Bank',
  'Jammu & Kashmir Bank',
];
