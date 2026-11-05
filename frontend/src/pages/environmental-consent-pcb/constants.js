// constants.js - Environmental Consent (PCB) (Water Act 1974, Air Act 1981, EPA 1986 & OCMMS Portal)

export const ENVIRONMENTAL_CONSENT_HERO = {
  badge: 'CPCB & State SPCB Authorized OCMMS Desk 🌱',
  title: 'Pollution Control Board (PCB) Consent Online',
  description:
    'End-to-end environmental clearances: Consent to Establish (CTE), Consent to Operate (CTO), Hazardous Waste Authorization (HWA), and annual environmental audit statements across Red, Orange, Green, and White industrial categories.',
  bullets: [
    'Consent to Establish (CTE) before factory construction or machinery installation.',
    'Consent to Operate (CTO) grant & multi-year renewals via State OCMMS portals.',
    'Hazardous Waste Management Authorization (Form 1) and ETP/APCD technical vetting.',
  ],
  videoModal: {
    title: 'Pollution Board Consent (CTE & CTO) Filing Walkthrough',
    description:
      'Learn how the CPCB Pollution Index works, White/Green/Orange/Red industrial classifications, effluent treatment plant (ETP) validation, and online SPCB consent issuance.',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
  },
  cardTitle: 'Pollution Consent (CTE / CTO)',
  consultationFeeText: '₹999 ₹499 for a 30-minute Environmental Law Consultation',
  guaranteeText: 'Certified Environmental Engineers & State PCB Liaison Advocates',
};

export const TRUSTED_PARTNERS = [
  { name: 'Central Pollution Control Board (CPCB)', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' },
  { name: 'Maharashtra Pollution Control Board (MPCB)', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'Gujarat Pollution Control Board (GPCB)', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  { name: 'Tamil Nadu Pollution Control Board (TNPCB)', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg' },
  { name: 'Online Consent Management & Monitoring (OCMMS)', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
];

export const CORE_FEATURES = [
  {
    icon: 'FileText',
    title: 'Consent to Establish (CTE / NOC)',
    desc: 'Statutory approval under Section 25 of Water Act and Section 21 of Air Act obtained before initiating civil work, building foundation, or machinery procurement on site.',
  },
  {
    icon: 'CheckCircle2',
    title: 'Consent to Operate (CTO) & Renewal',
    desc: 'Mandatory operational license secured prior to commissioning trial runs or commercial production, with multi-year renewal management (up to 5 years).',
  },
  {
    icon: 'Layers',
    title: 'Pollution Index & Category Assessment',
    desc: 'Accurate classification of industrial processes under CPCB categories (White score ≤ 20, Green 21-40, Orange 41-59, Red ≥ 60) based on emissions and effluent volume.',
  },
  {
    icon: 'Flame',
    title: 'Hazardous Waste Authorization (HWA)',
    desc: 'Preparation and filing of Form 1 under Hazardous and Other Wastes Rules, 2016 for safe storage, manifest tracking, and authorized disposal through TSDF facilities.',
  },
  {
    icon: 'Activity',
    title: 'ETP, STP & APCD Scheme Vetting',
    desc: 'Technical review of Effluent Treatment Plants (ETP), Sewage Treatment Plants (STP), scrubbers, dust collectors, and acoustic DG stack height calculations.',
  },
  {
    icon: 'ShieldAlert',
    title: 'SPCB Show Cause & Closure Legal Defense',
    desc: 'Drafting point-by-point replies to Section 33A Water Act and Section 31A Air Act closure directions, environmental compensation demands, and bank guarantee queries.',
  },
];

export const CPCB_CATEGORIES_MATRIX = [
  {
    category: 'White Category (Score ≤ 20)',
    definition: 'Practically non-polluting micro & small enterprises with minimal water consumption and negligible emissions.',
    approvalProcess: 'No CTE/CTO required in most states; simple online intimation / self-declaration on OCMMS portal.',
    examples: 'Solar panel assembly, chalk making, bio-fertilizer blending, garment stitching (without dyeing), computer hardware repair.',
  },
  {
    category: 'Green Category (Score 21 - 40)',
    definition: 'Low pollution potential units with domestic sewage or minor non-toxic wash water.',
    approvalProcess: 'Expedited CTE & CTO via simplified procedure; typically granted within 15-21 working days for 5-10 years.',
    examples: 'Bakery & confectionery, spice grinding, corrugated box making, small hotel units (< 20 rooms), cold storages, tyre retreading.',
  },
  {
    category: 'Orange Category (Score 41 - 59)',
    definition: 'Medium pollution potential with industrial wastewater or fuel burning stacks requiring dedicated treatment.',
    approvalProcess: 'Detailed application with ETP/APCD flow diagram; joint inspection by SPCB Sub-Regional Officer (SRO).',
    examples: 'Automobile servicing & painting, food & dairy processing, electroplating (small job work), printing press, stone crushing, hotels with banquet.',
  },
  {
    category: 'Red Category (Score ≥ 60)',
    definition: 'Heavily polluting units generating toxic effluents, hazardous air pollutants, or dangerous chemical wastes.',
    approvalProcess: 'Mandatory technical committee presentation, Continuous Emission Monitoring System (OCEMS), public hearing if EIA covered.',
    examples: 'Basic drug & pharma synthesis, chemical manufacturing, textile wet processing & dyeing, distilleries, tannery, sugar mills, oil refineries.',
  },
];

export const COMPLIANCE_WORKFLOW = [
  {
    step: '01',
    title: 'Site Plan & Process Flow Due Diligence',
    desc: 'Review of land allotment/MIDC/GIDC lease deed, detailed manufacturing process flow chart, raw material mass balance, and water balance diagram.',
  },
  {
    step: '02',
    title: 'Pollution Load & Capital Investment Audit',
    desc: 'Computing gross capital investment (land, building, plant & machinery) to determine exact SPCB government fee slab and required treatment engineering.',
  },
  {
    step: '03',
    title: 'OCMMS Online Portal Dossier Submission',
    desc: 'Drafting Form I/Form IV, uploading CAD site layout, ETP/STP design proposals, DG stack height calculations, and submitting through state OCMMS.',
  },
  {
    step: '04',
    title: 'SPCB Field Officer Site Inspection',
    desc: 'Liaison with Sub-Regional Officer (SRO) / Field Officer during site inspection, verifying boundary wall, drainage isolation, and tree plantation buffer.',
  },
  {
    step: '05',
    title: 'Consent Issuance & Environmental Conditions',
    desc: 'Receipt of digital Consent to Establish (CTE) / Consent to Operate (CTO) order with detailed specific & general pollution abatement conditions.',
  },
  {
    step: '06',
    title: 'Post-Consent Environmental Statement (Form V)',
    desc: 'Assistance in setting up hazardous waste manifest registers (Form 10), annual returns (Form 4), and annual Environmental Audit Statement (Form V).',
  },
];

export const PENALTY_AVOIDANCE = [
  {
    offence: 'Operating Without Valid CTE / CTO',
    act: 'Section 41/44 Water Act, Section 37 Air Act',
    penalty: 'Imprisonment of 1.5 to 6 years + discretionary fines + immediate power & water supply disconnection by SPCB.',
    protection: 'Expedited single-window filing + provisional filing acknowledgement protecting enterprise from closure notices.',
  },
  {
    offence: 'Discharging Untreated Effluent into Open Drain',
    act: 'Section 24 & 25 Water Act, 1974',
    penalty: 'Criminal prosecution of directors; imposition of Environmental Compensation (EC) running into lakhs to crores of rupees.',
    protection: 'ETP zero-liquid-discharge (ZLD) design vetting and quarterly lab testing through NABL accredited laboratories.',
  },
  {
    offence: 'Unlawful Dumping of Hazardous Sludge / Waste',
    act: 'Hazardous Waste Rules, 2016 (Rule 23)',
    penalty: 'Financial penalty up to ₹1,00,000 per violation + mandatory site remediation costs at occupier expense.',
    protection: 'Authorized TSDF (Treatment, Storage and Disposal Facility) membership setup and Form 10 manifest tracking.',
  },
  {
    offence: 'Non-Submission of Annual Form V Environmental Audit',
    act: 'Environment (Protection) Rules, 1986 (Rule 14)',
    penalty: 'Show Cause Notice from Member Secretary, forfeiture of bank guarantee, and refusal of CTO renewal.',
    protection: 'Automated statutory calendar reminders and compilation of Form V audit statement before September 30.',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Green Category Consent (CTE / CTO)',
    price: 14999,
    originalPrice: 24999,
    badge: 'Low Pollution Potential',
    features: [
      'Complete preparation & filing of CTE or CTO application',
      'SPCB online fee calculation & treasury challan generation',
      'Manufacturing process flow & water consumption balance drafting',
      'Site layout & DG set stack acoustic calculation verification',
      'Tracking & liaison on state OCMMS portal until consent grant',
      'Dedicated Environmental Law Executive assigned to your docket',
    ],
    cta: 'Select Green Consent',
    popular: false,
  },
  {
    id: 'growth',
    name: 'Orange Category Consent & ETP Vetting',
    price: 24999,
    originalPrice: 44999,
    badge: 'Most Popular (Industrial Units)',
    features: [
      'Everything in Green Category Consent +',
      'Effluent Treatment Plant (ETP) / STP schematic review',
      'Air Pollution Control Devices (APCD) sizing & scrubber validation',
      'Hazardous Waste Management Authorization (Form 1) filing',
      'Coordination with Sub-Regional Officer (SRO) for inspection clearance',
      'Drafting replies to SPCB technical queries & inspection observations',
      'Senior Environmental Engineer & Advocate direct supervision',
    ],
    cta: 'Select Orange Consent',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Red Category Complex Consent & Hazardous Retainer',
    price: 44999,
    originalPrice: 79999,
    badge: 'High Impact / Chemical & Pharma',
    features: [
      'Red Category Comprehensive CTE / CTO & expansion approvals',
      'Multi-state plant cluster coordination under centralized tracking',
      'TSDF membership coordination & hazardous waste manifest systems',
      'Preparation of Environmental Statement (Form V) & compliance returns',
      'Online Continuous Emission Monitoring System (OCEMS) documentation',
      'Legal defense representation against SPCB Section 33A/31A notices',
      'Quarterly mock environmental compliance audit and compliance docket',
    ],
    cta: 'Consult for Red Category',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Dr. Alok Verma',
    role: 'Director of Manufacturing, Apex Bio-Chemicals Ltd',
    location: 'Vapi GIDC, Gujarat',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    content:
      'Securing Orange Category Consent to Operate from GPCB for our chemical blending unit was blocked for months due to effluent discharge queries. BharatFiling’s environmental engineers redrafted our ETP schematics and resolved the SRO inspection within 3 weeks. Outstanding technical legal prowess.',
    rating: 5,
  },
  {
    name: 'Kavita Krishnamoorthy',
    role: 'Managing Partner, Nilgiri Tea & Agro Processors',
    location: 'Coimbatore, Tamil Nadu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    content:
      'We needed urgent CTE for our food packaging plant expansion before machinery delivery from Germany. BharatFiling managed the TNPCB OCMMS filing, land coordinates, and obtained our Consent order well ahead of schedule without a single objection.',
    rating: 5,
  },
  {
    name: 'Satish Bansal',
    role: 'CEO, Bansal Galvanizing & Metal Finishing',
    location: 'Kundli Industrial Area, Haryana',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    content:
      'We received a stringent Show Cause Notice from HSPCB regarding hazardous waste storage authorization. Dr. Pradeep Sharma and the BharatFiling team drafted our compliance reply, coordinated TSDF membership, and secured our CTO renewal safely.',
    rating: 5,
  },
];

export const FAQS = [
  {
    q: 'What is the difference between CTE (Consent to Establish) and CTO (Consent to Operate)?',
    a: 'Consent to Establish (CTE) is the initial environmental approval required before starting any civil construction, factory erection, or machinery installation on the site. Consent to Operate (CTO) is the second-stage license required after the plant is built and effluent treatment facilities are ready, but before starting commercial production or trial runs.',
  },
  {
    q: 'How does CPCB categorize industries into White, Green, Orange, and Red?',
    a: 'The Central Pollution Control Board (CPCB) developed a Pollution Index (PI) score from 0 to 100 based on emissions (air pollutants), effluents (water pollutants), hazardous wastes generated, and consumption of resources. Industries scoring 60 and above are Red, 41 to 59 are Orange, 21 to 40 are Green, and 20 or below are White.',
  },
  {
    q: 'Do White Category industries need a Pollution Consent?',
    a: 'No formal CTE or CTO is required for White Category industries in most states. They only need to submit a simple online intimation or self-declaration with an undertaking on the SPCB OCMMS portal. However, they must not discharge any toxic pollutants.',
  },
  {
    q: 'What is OCMMS and how does it work?',
    a: 'OCMMS stands for Online Consent Management and Monitoring System. It is the centralized, paperless digital web portal used by State Pollution Control Boards across India (such as MPCB, GPCB, UPPCB, KSPCB, TNPCB, DPCC) for applying, paying government fees, tracking inspections, answering scrutiny queries, and downloading digitally signed consent orders.',
  },
  {
    q: 'What documents are required to apply for Consent to Establish (CTE)?',
    a: 'Key documents include: (1) Land possession deed, lease agreement, or MIDC/GIDC allotment letter; (2) Scaled site layout plan and plant building blueprint; (3) Detailed project report (DPR) with process flow diagram; (4) Water balance chart showing fresh water intake, domestic use, industrial use, and effluent generated; (5) Material balance showing raw materials, catalysts, and finished goods; (6) ETP/STP and air pollution control proposal; (7) CA Certificate of Capital Investment; and (8) Board Resolution / Authorization Letter.',
  },
  {
    q: 'How is the SPCB government consent fee determined?',
    a: 'Government consent fees are tiered based on the Gross Fixed Capital Investment of the industrial unit, which includes the total value of land, building, plant, machinery, and equipment (without depreciation). Higher investment tiers and Red category industries pay higher fee slabs for longer renewal periods (e.g. 1 year, 3 years, 5 years).',
  },
  {
    q: 'What is Hazardous Waste Authorization (Form 1)?',
    a: 'Under the Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016, any facility generating, collecting, storing, treating, transporting, or disposing of hazardous waste (such as chemical sludge, used oil, spent solvent, contaminated packaging) must obtain statutory Authorization from the SPCB in Form 1.',
  },
  {
    q: 'What is an Effluent Treatment Plant (ETP) and when is it required?',
    a: 'An ETP is an industrial wastewater treatment facility that neutralizes chemical, biological, and physical contaminants before wastewater is recycled or discharged. Any industry in the Orange or Red category that discharges trade effluent (e.g., electroplating, food processing, dyeing, pharmaceuticals) must install a compliant ETP matching SPCB parameters (BOD, COD, TSS, TDS, pH, heavy metals).',
  },
  {
    q: 'What are the consequences of operating an industrial unit without SPCB consent?',
    a: 'Under Section 41 & 44 of the Water Act and Section 37 of the Air Act, operating without valid CTE/CTO is a non-bailable criminal offence punishable with imprisonment from 1.5 to 6 years and heavy fines. Additionally, the Board can issue Section 33A/31A closure orders, disconnecting industrial electricity and municipal water connections immediately.',
  },
  {
    q: 'What is Form V (Environmental Statement)?',
    a: 'Form V is the mandatory annual Environmental Statement submitted by every industry holding a valid CTO on or before September 30th for the preceding financial year. It details total water and raw material consumption per unit of product, pollution discharged to the environment, and hazardous waste generated.',
  },
  {
    q: 'Can a foreign subsidiary or MNC apply for SPCB consent in India?',
    a: 'Yes. Indian subsidiaries of foreign companies, joint ventures, and multinational corporations follow the same OCMMS procedure. An authorized Indian resident director or plant head signs the application as the Occupier with a board resolution.',
  },
  {
    q: 'How does BharatFiling assist in obtaining Pollution Control Board clearances?',
    a: 'BharatFiling provides end-to-end support: from initial category determination, water balance drafting, and ETP proposal validation by certified environmental engineers, to seamless OCMMS portal filing, liaison with SPCB field officers during site inspections, and prompt delivery of digitally signed CTE/CTO certificates.',
  },
];

export const ENVIRONMENTAL_CHECKOUT = {
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
