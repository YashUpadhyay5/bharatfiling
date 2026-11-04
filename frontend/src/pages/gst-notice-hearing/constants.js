/**
 * Constants for GST Notice Hearing Representation Module
 * Comprehensive legal defense and representation before GST Authorities
 */

export const GST_HEARING_HERO = {
  badge: 'Legal Tech Platform Since 2010 🇮🇳',
  festiveBadge: 'Diwali Notice Shield Offer',
  title: 'GST Notice Hearing Representation',
  description:
    'Experienced representation before GST Superintendents, Assistant Commissioners, and Appellate Authorities for DRC-01, ASMT-10, ITC mismatches, and registration cancellation hearings.',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'GST Notice Hearing Representation', href: '/services/gst-notice-hearing' },
  ],
  benefits: [
    {
      id: 1,
      title: 'Senior Indirect Tax Advocates & CAs',
      desc: 'Expert representation by seasoned litigators with 15+ years experience handling state and central GST departments.',
    },
    {
      id: 2,
      title: 'Air-Tight Legal Submissions & Reconciliations',
      desc: 'Detailed point-by-point factual replies, GSTR-2B vs 3B invoice reconciliations, and relevant High Court case law citations.',
    },
    {
      id: 3,
      title: 'Personal Hearing Appearance',
      desc: 'Virtual or physical appearance before the Adjudicating Authority to present compelling oral arguments and stay unjustified demands.',
    },
  ],
  liveStatus: {
    onlineExperts: '95+ GST Litigators online',
    ongoingHearings: '28 ongoing departmental hearings',
  },
  pricingNote: {
    original: 6999,
    current: 3999,
    duration: 'per hearing representation',
  },
};

export const LANGUAGES = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Kannada',
  'Marathi',
  'Malayalam',
  'Bengali',
  'Gujarati',
];

export const CATEGORY_TREE = [
  {
    id: 'drc_notices',
    name: 'Show Cause Notices (DRC-01 / 01A)',
    icon: 'AlertTriangle',
    color: '#EF4444',
    options: [
      'DRC-01 Show Cause Notice under Section 73 (Non-fraud)',
      'DRC-01 Show Cause Notice under Section 74 (Alleged fraud/wilful misstatement)',
      'DRC-01A Pre-Notice Consultation Intimation',
      'DRC-07 Summary of Demand Order Challenge',
      'Penalty Defense under Section 122, 125, 129 & 130',
      'Recovery Notice & Bank Attachment Revocation (DRC-13)',
    ],
  },
  {
    id: 'scrutiny_asmt',
    name: 'Scrutiny & Assessment (ASMT-10)',
    icon: 'FileSearch',
    color: '#3B82F6',
    options: [
      'ASMT-10 Discrepancy Notice in GSTR-3B vs GSTR-1',
      'ASMT-10 ITC Discrepancy in GSTR-3B vs GSTR-2A/2B',
      'ASMT-12 Acceptance Order Drafting & Settlement',
      'Summary Assessment under Section 64',
      'Best Judgment Assessment for Non-Filers under Section 62',
      'Provisional Assessment Finalization under Section 60',
    ],
  },
  {
    id: 'itc_mismatch',
    name: 'ITC Blockage & Fake Invoicing',
    icon: 'FileX',
    color: '#F59E0B',
    options: [
      'Rule 86A Electronic Credit Ledger Blocking Defense',
      'Notice on Ineligible ITC under Section 17(5)',
      'Non-Existent / Cancelled Supplier ITC Reversal Notice',
      'Rule 36(4) 5% ITC Cap Violation Notice',
      'E-Way Bill Expiry & Penalty under Section 129 (MOV-02/MOV-07)',
      'Detention & Seizure of Goods in Transit (MOV-06)',
    ],
  },
  {
    id: 'registration_cancellation',
    name: 'Registration Cancellation & Revocation',
    icon: 'ShieldX',
    color: '#EC4899',
    options: [
      'REG-17 Show Cause Notice for GST Cancellation',
      'Non-Filing of Returns for 6 Consecutive Months',
      'REG-21 Application for Revocation of Cancelled GSTIN',
      'Personal Hearing for Condonation of Delay in Revocation',
      'Physical Verification Adverse Report Defense (REG-25)',
      'Suspension of GSTIN under Rule 21A',
    ],
  },
  {
    id: 'audit_investigation',
    name: 'Departmental Audit & Summons',
    icon: 'Search',
    color: '#6366F1',
    options: [
      'Section 65 Departmental GST Audit Notice (ADT-01)',
      'ADT-02 Audit Findings Discrepancy Response',
      'Summons under Section 70 for Recording of Statements',
      'DGGI / Anti-Evasion Investigation Representation',
      'Inspection, Search & Seizure Defense under Section 67',
      'Special Audit by CA/CMA under Section 66',
    ],
  },
  {
    id: 'appeals_tribunal',
    name: 'GST Appeals (APL-01 / APL-03)',
    icon: 'Scale',
    color: '#10B981',
    options: [
      'First Appeal before Appellate Authority (Form GST APL-01)',
      'Pre-Deposit (10% / 20%) Exemption & Stay Petitions',
      'Departmental Appeal Defense by Taxpayer (APL-03)',
      'Rectification of Mistake in Orders under Section 161',
      'Writ Petition in High Court against Arbitrary GST Orders',
      'GST Appellate Tribunal (GSTAT) Preparation Advisory',
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Virendra Oswal',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'Received an arbitrary ₹42 Lakh DRC-01 demand notice alleging ITC mismatch with cancelled suppliers. BharatFiling’s senior GST advocate represented us in the personal hearing and got the entire penalty dropped.',
    fullReview:
      'Received an arbitrary ₹42 Lakh DRC-01 demand notice alleging ITC mismatch with cancelled suppliers. BharatFiling’s senior GST advocate represented us in the personal hearing, submitted clean bank payment trails and e-way bill reconciliations, and got the entire penalty and major demand dropped.',
  },
  {
    id: 2,
    name: 'Pooja Agarwal',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'Our GST registration was suddenly cancelled via REG-17 due to an address verification dispute. BharatFiling filed the revocation petition and appeared before the Joint Commissioner to restore our GSTIN within 5 days.',
    fullReview:
      'Our GST registration was suddenly cancelled via REG-17 due to an address verification dispute. BharatFiling filed the revocation petition, appeared before the Joint Commissioner with geo-tagged premises photos and electricity deeds, and got our GSTIN restored in 5 working days.',
  },
  {
    id: 3,
    name: 'Sunil Chordia',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'Outstanding support during departmental ADT-01 audit. The team drafted flawless quantitative reconciliations and represented us with full legal authority.',
    fullReview:
      'Outstanding support during departmental ADT-01 audit. The team drafted flawless quantitative reconciliations and represented us with full legal authority. Prevented a massive notice from escalating into litigation.',
  },
];

export const TRUSTED_PARTNERS = [
  { name: 'Amazon Seller Network', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Axis Bank MSME Hub', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg' },
  { name: 'Flipkart Wholesale', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg' },
  { name: 'Federation of Indian Chambers (FICCI)', logo: 'https://d2q79iu7y44aq9.cloudfront.net/globallinker/images/gl-logo.png' },
  { name: 'Yes Bank Corporate', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'PayU Enterprise', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/PayU_logo.svg' },
  { name: 'Tata Tele Business GST Solutions', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg' },
];

export const WHO_CAN_USE = [
  {
    title: 'Manufacturing Units & Traders',
    desc: 'Defense against inverted duty structure scrutiny, physical stock variances, and HSN classification disputes.',
    icon: 'Building2',
  },
  {
    title: 'B2B Suppliers & Distributors',
    desc: 'ITC mismatch reconciliations under GSTR-2B vs 3B and Section 16(2)(c) supplier tax non-payment notices.',
    icon: 'Briefcase',
  },
  {
    title: 'E-Commerce Sellers & Aggregators',
    desc: 'TCS reconciliation notices, inter-state stock transfer scrutiny, and warehouse verification defense.',
    icon: 'Laptop',
  },
  {
    title: 'Service Providers & IT Exporters',
    desc: 'Export refund rejection notices (RFD-08), LUT compliance verification, and intermediary service disputes.',
    icon: 'Rocket',
  },
  {
    title: 'Cancelled GSTIN Businesses',
    desc: 'Emergency revocation hearings to unfreeze bank accounts, release trapped ITC, and resume commercial operations.',
    icon: 'ShieldX',
  },
  {
    title: 'Logistics & Transporters',
    desc: 'Immediate release of detained vehicles and goods under Section 129/130 with MOV-06 and MOV-07 representation.',
    icon: 'Truck',
  },
];

export const WHEN_TO_CONSULT = [
  'Immediately upon receiving a DRC-01 or DRC-01A show cause notice with demand of tax, interest, or penalties',
  'When served an ASMT-10 notice highlighting mismatches between GSTR-1, GSTR-2B, and GSTR-3B filings',
  'Upon receipt of a REG-17 notice proposing cancellation of your GST registration or sudden suspension',
  'When input tax credit (ITC) is blocked in your Electronic Credit Ledger under Rule 86A without prior notice',
  'Facing a departmental audit under Section 65 (Form ADT-01) or summons for officer appearance under Section 70',
  'When goods or conveyance are intercepted or detained in transit under Section 129 by state flying squads',
  'When seeking revocation of a cancelled GSTIN where the 30-day or 90-day limitation window is expiring',
  'Before filing a formal First Appeal in Form GST APL-01 against an adverse Adjudication Order',
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Upload Notice Docket',
    desc: 'Share your DRC-01, ASMT-10, or REG-17 notice along with relevant assessment orders and past returns.',
  },
  {
    step: '02',
    title: 'Notice Scrutiny & Legal Merit',
    desc: 'Our senior GST counsel analyzes officer allegations, statutory jurisdiction, limitation, and evidential records.',
  },
  {
    step: '03',
    title: 'Drafting Point-by-Point Submission',
    desc: 'We draft a comprehensive written reply supported by invoice reconciliations and binding High Court precedents.',
  },
  {
    step: '04',
    title: 'Personal Hearing Appearance',
    desc: 'Our Advocate / CA attends the personal hearing (virtual or physical) and argues your legal defense forcefully.',
  },
  {
    step: '05',
    title: 'Hearing Note & Additional Submissions',
    desc: 'We file formal post-hearing rejoinders and rejoinder notes addressing any supplementary queries raised by the officer.',
  },
  {
    step: '06',
    title: 'Favorable Dropping of Demand',
    desc: 'We track the final adjudication order (DRC-05/DRC-08) to ensure unjustified demands and penalties are fully stayed.',
  },
];

export const COMMUNICATION_CHANNELS = [
  {
    title: 'Personal Hearing Appearance',
    desc: 'Direct oral representation before the GST Adjudicating Officer during scheduled hearing sessions.',
    icon: 'Scale',
  },
  {
    title: 'Video Strategy Consultation',
    desc: 'Pre-hearing strategic alignment and screen sharing of invoice reconciliations with your counsel.',
    icon: 'Video',
  },
  {
    title: 'Written Legal Submissions',
    desc: 'Exhaustive written replies and legal paper books filed on the official GST portal and departmental desk.',
    icon: 'FileText',
  },
  {
    title: 'Dedicated Notice WhatsApp Desk',
    desc: 'Real-time updates on hearing summons dates, officer requisitions, and order tracking.',
    icon: 'MessageSquare',
  },
];

export const CONSULTATION_PLANS = [
  {
    id: 'starter',
    name: 'Single Hearing Representation + Reply Review',
    badge: 'Standard Defense',
    price: 3999,
    originalPrice: 6999,
    discount: '43% off',
    duration: 'Single Hearing Session',
    features: [
      'Comprehensive review of 1 GST notice (DRC-01, ASMT-10, or REG-17)',
      'Factual scrutiny of tax demand and interest computations',
      'Personal hearing representation before the GST Superintendent / AC',
      'Formal post-hearing summary note delivered to taxpayer',
      'Guidance on penalty mitigation and waiver options',
    ],
    cta: 'Book Hearing Representation',
    popular: true,
  },
  {
    id: 'standard',
    name: 'Comprehensive Written Reply + Hearing Representation',
    badge: 'Most Popular',
    price: 7999,
    originalPrice: 14999,
    discount: '46% off',
    duration: 'End-to-End Adjudication Support',
    features: [
      'Complete drafting of detailed legal reply citing relevant case laws',
      'Line-by-line GSTR-1 vs 2B vs 3B invoice reconciliation sheet',
      'Appearance in up to 2 personal hearings before Adjudicating Authority',
      'Filing of rejoinder submissions and documentary evidence',
      'Dedicated senior GST Litigator (12+ yrs indirect tax experience)',
    ],
    cta: 'Book Full Notice Defense',
    popular: false,
  },
  {
    id: 'elite',
    name: 'GST Appellate Authority First Appeal (APL-01)',
    badge: 'Appellate Litigation',
    price: 14999,
    originalPrice: 24999,
    discount: '40% off',
    duration: 'Appellate Proceedings',
    features: [
      'Drafting of comprehensive Appeal Paper Book in Form GST APL-01',
      'Grounds of appeal, statement of facts, and stay petition drafting',
      'Pre-deposit payment advice & statutory deposit verification',
      'Representation before the Joint/Additional Commissioner (Appeals)',
      'Direct senior counsel advocacy and tracking until final appellate order',
    ],
    cta: 'Book Appellate Representation',
    popular: false,
  },
];

export const SCHEDULE_TIME_SLOTS = {
  Afternoon: [
    { id: '1:30 PM', label: '1:30 PM' },
    { id: '2:00 PM', label: '2:00 PM' },
    { id: '2:30 PM', label: '2:30 PM' },
    { id: '3:00 PM', label: '3:00 PM' },
    { id: '3:30 PM', label: '3:30 PM' },
  ],
  Evening: [
    { id: '4:00 PM', label: '4:00 PM' },
    { id: '4:30 PM', label: '4:30 PM' },
    { id: '5:00 PM', label: '5:00 PM' },
    { id: '5:30 PM', label: '5:30 PM' },
    { id: '6:00 PM', label: '6:00 PM' },
  ],
};

export const POPULAR_BANKS = [
  { name: 'State Bank of India', code: 'SBI', icon: '🏛️' },
  { name: 'HDFC Bank', code: 'HDFC', icon: '🏦' },
  { name: 'ICICI Bank', code: 'ICICI', icon: '🏦' },
  { name: 'Axis Bank', code: 'AXIS', icon: '🏦' },
  { name: 'Kotak Mahindra Bank', code: 'KOTAK', icon: '🏛️' },
  { name: 'Punjab National Bank', code: 'PNB', icon: '🏦' },
];

export const ALL_NET_BANKS = [
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Bank of India',
  'IndusInd Bank',
  'Federal Bank',
  'Yes Bank',
  'IDFC FIRST Bank',
  'Central Bank of India',
  'Indian Overseas Bank',
];

export const FAQS = [
  {
    question: 'What is GST Notice Hearing Representation?',
    answer:
      'GST Notice Hearing Representation is a specialized legal defense service where an authorized Chartered Accountant or Advocate represents your business before GST adjudicating officers. When the GST department issues a show cause notice (DRC-01, ASMT-10, or REG-17), you are granted an opportunity of personal hearing. Our litigators attend the hearing, present your factual evidence, and argue why the demand or penalty should be dropped.',
  },
  {
    question: 'Is personal hearing mandatory before the officer passes a demand order?',
    answer:
      'Yes. Under Section 75(4) of the CGST Act, an opportunity of personal hearing must be granted where a request is received in writing from the taxpayer or where any adverse decision is contemplated against such person. Adjudication orders passed without granting a personal hearing violate principles of natural justice and can be quashed by High Courts.',
  },
  {
    question: 'Can your professional attend virtual / online GST hearings?',
    answer:
      'Yes. Most central and state GST commissionerates now conduct personal hearings via video conferencing (Webex, MS Teams, or NIC). Our advocates and CAs appear directly in these virtual hearings on your behalf. For physical hearings in major cities, our localized litigators represent you in person.',
  },
  {
    question: 'How do you handle ITC mismatch notices where the vendor did not pay tax?',
    answer:
      'We leverage landmark High Court rulings (such as Suncraft Energy, D.Y. Beathel, and Bharti Airtel) establishing that genuine buyers who hold valid tax invoices and proof of banking payments cannot be denied ITC without the department first investigating the defaulting supplier.',
  },
  {
    question: 'What happens if I miss the hearing date mentioned in the notice?',
    answer:
      'If you missed a scheduled hearing, our advocates can immediately file a formal adjournment letter under Section 75(5) citing genuine grounds. The CGST Act permits up to 3 adjournments to the taxpayer, ensuring you do not suffer an ex-parte demand order.',
  },
  {
    question: 'What is the fee for hearing representation?',
    answer:
      'Single hearing representation is priced at ₹3,999 (inclusive of GST). Comprehensive packages that include full written reply drafting and two hearing appearances are available at ₹7,999.',
  },
  {
    question: 'Can you help if my GST registration is cancelled via REG-17?',
    answer:
      'Yes. We file an application for revocation of cancellation in Form GST REG-21, reconcile any pending returns, and appear before the Joint Commissioner to condone delays and restore your active GST status.',
  },
  {
    question: 'Can a CA or Advocate represent me without my presence?',
    answer:
      'Yes. Under Section 116 of the CGST Act, you can authorize a Chartered Accountant, Cost Accountant, Company Secretary, or Advocate through a formal Letter of Authorization or Vakalatnama to appear on your behalf.',
  },
  {
    question: 'What documents should I share before the hearing?',
    answer:
      'Please share a copy of the SCN or notice (DRC-01/ASMT-10/REG-17), previous replies filed, relevant GSTR-1 and GSTR-3B returns, supplier invoices, bank statements reflecting payment, and e-way bills if applicable.',
  },
  {
    question: 'What is the difference between Section 73 and Section 74 notices?',
    answer:
      'Section 73 applies to bona fide mistakes or tax unpaid without intent to evade, where the maximum penalty is only 10% of tax or ₹10,000. Section 74 alleges fraud, wilful misstatement, or suppression of facts, carrying a mandatory 100% penalty. Our defense focuses on disproving fraud allegations to reduce penalty liabilities.',
  },
  {
    question: 'How do you challenge arbitrary attachment of bank accounts under Section 83?',
    answer:
      'Provisional attachment of bank accounts under Section 83 must follow strict statutory guidelines. We file Form DRC-22A objections before the Commissioner demonstrating that attachment paralyzes regular business operations and seek immediate defreezing.',
  },
  {
    question: 'If the officer passes an adverse order, can we file an appeal?',
    answer:
      'Yes. An appeal can be filed within 3 months before the Appellate Authority in Form GST APL-01 upon depositing 10% of the disputed tax amount as statutory pre-deposit, which stays the remaining 90% demand automatically.',
  },
];
