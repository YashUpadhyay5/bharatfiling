/**
 * Constants for Income Tax Dispute & Appeals Module
 * High-stakes defense before NaFAC, CIT(Appeals), DRP, and ITAT
 */

export const TAX_DISPUTE_HERO = {
  badge: 'Legal Tech Platform Since 2010 🇮🇳',
  festiveBadge: 'Diwali Tax Shield Offer',
  title: 'Income Tax Dispute & Appeals',
  description:
    'Senior representation by former ITAT counsel and Senior Tax Partners before National Faceless Assessment Centre (NaFAC), CIT(Appeals), and Income Tax Appellate Tribunal (ITAT) for Section 148, 143(3), 68 additions, and penalty appeals.',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'Income Tax Dispute & Appeals', href: '/services/income-tax-dispute-appeals' },
  ],
  benefits: [
    {
      id: 1,
      title: 'Senior CIT(Appeals) & ITAT Litigators',
      desc: 'Expert counsel with 20+ years specialized experience handling high-value assessments, additions, and appellate advocacy.',
    },
    {
      id: 2,
      title: 'Form 35 & 36 Paper Book Drafting',
      desc: 'Meticulously crafted Grounds of Appeal, Statement of Facts, Rule 46A additional evidence, and binding Supreme Court precedents.',
    },
    {
      id: 3,
      title: 'Stay of Demand & Asset Protection',
      desc: 'Immediate filing of Section 220(6) stay petitions and 20% deposit reduction to prevent coercive bank attachments.',
    },
  ],
  liveStatus: {
    onlineExperts: '110+ Tax Advocates & CAs online',
    ongoingHearings: '42 ongoing appeal hearings',
  },
  pricingNote: {
    original: 14999,
    current: 7999,
    duration: 'starting fee for dispute strategy & review',
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
    id: 'reassessment_148',
    name: 'Reassessment & Escaped Income (148 / 148A)',
    icon: 'AlertOctagon',
    color: '#EF4444',
    options: [
      'Section 148A(b) Show Cause Notice Defense',
      'Challenging Section 148A(d) Reassessment Order',
      '3-Year & 10-Year Limitation Defense (Finance Act 2021)',
      'Unexplained Cash Deposits / High-Value Cash Credits',
      'Penny Stock / Bogus Long-Term Capital Gains (LTCG) Additions',
      'Accommodation Entry / Hawala Allegations Scrutiny',
    ],
  },
  {
    id: 'scrutiny_additions',
    name: 'Scrutiny Additions (Sec 143(3) / 144)',
    icon: 'FileSpreadsheet',
    color: '#3B82F6',
    options: [
      'Section 68 Unexplained Cash Credit Additions',
      'Section 69 / 69A / 69B / 69C Unexplained Money & Expenditures',
      'Section 56(2)(x) Property Stamp Value vs Agreement Variance',
      'Section 14A Disallowance of Expenditure Relating to Exempt Income',
      'Section 40(a)(ia) TDS Default Disallowances',
      'Best Judgment Assessment under Section 144 Recall',
    ],
  },
  {
    id: 'cit_appeals',
    name: 'First Appeal before CIT(Appeals) [Form 35]',
    icon: 'Scale',
    color: '#10B981',
    options: [
      'Filing Form 35 within Statutory 30-Day Window',
      'Drafting Grounds of Appeal & Comprehensive Statement of Facts',
      'Admission of Additional Evidence under Rule 46A',
      'National Faceless Appeal Centre (NFAC) Video Hearings',
      'Condonation of Delay Application in Filing Appeal',
      'Stay of Demand Petition under Section 220(6)',
    ],
  },
  {
    id: 'itat_tribunal',
    name: 'Income Tax Appellate Tribunal (ITAT) [Form 36]',
    icon: 'Landmark',
    color: '#8B5CF6',
    options: [
      'Second Appeal Filing in Form 36 before ITAT Bench',
      'Stay of Demand Application before ITAT Divisional Bench',
      'Compilation of Tribunal Paper Book & Apex Court Authorities',
      'Senior Counsel Oral Arguments before Divisional Bench',
      'Miscellaneous Application (MA) for Rectification of Mistake',
      'Preparation for Substantial Question of Law in High Court (Sec 260A)',
    ],
  },
  {
    id: 'penalties_prosecution',
    name: 'Penalties & Prosecution (Sec 270A / 271AAC)',
    icon: 'ShieldAlert',
    color: '#F59E0B',
    options: [
      'Section 270A Penalty for Under-reporting / Misreporting',
      'Section 271AAC Penalty (60% Tax + 10% Penalty) Defense',
      'Application for Immunity from Penalty & Prosecution (Sec 270AA)',
      'Compounding of Prosecution Offences under Section 279(2)',
      'Section 271B Tax Audit Penalty Defense',
      'Section 271DA Cash Transaction Violation (Sec 269ST) Defense',
    ],
  },
  {
    id: 'transfer_pricing_intl',
    name: 'Transfer Pricing & International Tax Disputes',
    icon: 'Globe',
    color: '#EC4899',
    options: [
      'Dispute Resolution Panel (DRP) Objections Drafting',
      'Transfer Pricing Arm’s Length Price (ALP) Adjustments',
      'Permanent Establishment (PE) & Attribution Scrutiny',
      'Equalisation Levy & Significant Economic Presence (SEP)',
      'Foreign Tax Credit (FTC) Disallowance under Rule 128',
      'Double Taxation Avoidance Agreement (DTAA) Treaty Relief',
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Suresh Singhal',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'We received a Section 148 reassessment order adding ₹1.8 Crore under Section 68. BharatFiling drafted our Form 35 appeal and stay petition, and CIT(Appeals) fully deleted the addition in the faceless hearing.',
    fullReview:
      'We received a Section 148 reassessment order adding ₹1.8 Crore under Section 68 for share capital investment. BharatFiling’s Senior Tax Advocate drafted our Form 35 appeal, proved the identity, creditworthiness and genuineness under Section 68, and CIT(Appeals) deleted the entire demand.',
  },
  {
    id: 2,
    name: 'Nandita Kulkarni',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'The assessing officer arbitrarily slapped Section 270A penalty of ₹28 Lakh. BharatFiling filed an immunity petition under Section 270AA and got the penalty 100% waived.',
    fullReview:
      'The assessing officer arbitrarily slapped Section 270A penalty of ₹28 Lakh alleging misreporting of capital gains. BharatFiling filed an immunity petition under Section 270AA proving bona fide disclosure, and the PCIT granted 100% immunity from penalty and prosecution.',
  },
  {
    id: 3,
    name: 'Arjun Bansal',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'Represented us in an ITAT Mumbai bench appeal. The paper book was masterfully compiled and the senior counsel argued our case flawlessly to secure a complete remand back in our favor.',
    fullReview:
      'Represented us in an ITAT Mumbai bench appeal involving real estate joint development agreements. The paper book was masterfully compiled with 14 High Court citations and the senior counsel argued our case flawlessly to secure a complete deletion of the tax addition.',
  },
];

export const TRUSTED_PARTNERS = [
  { name: 'Income Tax Bar Association Network', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Axis Bank Wealth Management', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg' },
  { name: 'HDFC Private Banking Clients', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'BSE Listed Companies Guild', logo: 'https://d2q79iu7y44aq9.cloudfront.net/globallinker/images/gl-logo.png' },
  { name: 'All India Federation of Tax Practitioners (AIFTP)', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
  { name: 'Tata Tele Business Corporate Tax', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg' },
];

export const WHO_CAN_USE = [
  {
    title: 'High Net-Worth Individuals (HNIs)',
    desc: 'Defense against property purchase valuation disputes (56(2)(x)), foreign asset disclosures, and Section 148 notices.',
    icon: 'User',
  },
  {
    title: 'Real Estate Developers & Investors',
    desc: 'Joint development agreement (JDA) tax disputes, Section 43CA / 50C circle rate adjustments, and Section 80-IBA deductions.',
    icon: 'Building2',
  },
  {
    title: 'Corporate Entities & Startups',
    desc: 'Section 68 share premium scrutiny (Angel tax), loss carry forward disputes, and Section 14A disallowances.',
    icon: 'Briefcase',
  },
  {
    title: 'Stock & F&O Traders',
    desc: 'Business income vs capital gain recharacterization, penny stock scrutiny, and derivative loss set-off disallowances.',
    icon: 'LineChart',
  },
  {
    title: 'NRIs & Overseas Remitters',
    desc: 'Residential status redetermination, DTAA treaty relief, Form 15CA/CB disallowance, and foreign bank account inquiry.',
    icon: 'Globe',
  },
  {
    title: 'Charitable Trusts & Section 8 Companies',
    desc: 'Section 11/12 exemption cancellation defense, Form 10B/10BB audit defects, and Section 13 violation notices.',
    icon: 'Landmark',
  },
];

export const WHEN_TO_CONSULT = [
  'Immediately upon receiving a Section 148 or Section 148A(b) reassessment notice for reopened assessment years',
  'Upon receiving a draft assessment order proposing massive additions under Section 68, 69, or Section 14A',
  'Within 30 days of receiving a final Assessment Order under Section 143(3) or Section 144 to preserve appeal limitation',
  'When served with a demand notice under Section 156 with threat of bank account attachment under Section 226(3)',
  'Upon receipt of penalty show-cause notices under Section 270A, 271AAC, 271B, or Section 271DA',
  'When challenging an adverse order passed by CIT(Appeals) before the Income Tax Appellate Tribunal (ITAT) [Form 36]',
  'Facing transfer pricing adjustments made by the Transfer Pricing Officer (TPO) before the DRP panel',
  'When seeking compounding of prosecution complaints filed under Section 276C or 276CC in the magistrate court',
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Upload Assessment Docket',
    desc: 'Upload your Assessment Order, Section 156 demand notice, computing sheet, and previous return acknowledgments.',
  },
  {
    step: '02',
    title: 'Merits & Limitation Audit',
    desc: 'Senior tax counsel evaluates statutory jurisdiction, limitation validity, factual merits, and applicable Apex Court rulings.',
  },
  {
    step: '03',
    title: 'Drafting Form 35 / 36 Paper Book',
    desc: 'We draft comprehensive Grounds of Appeal, Statement of Facts, Rule 46A petitions, and stay of demand applications.',
  },
  {
    step: '04',
    title: 'Filing & Stay Petition (Sec 220)',
    desc: 'Formal filing on the e-filing portal and stay application before the PCIT to cap recovery at 20% or seek complete stay.',
  },
  {
    step: '05',
    title: 'Faceless Video Hearing Advocacy',
    desc: 'Our Senior Litigators represent you in National Faceless Appeal Centre (NFAC) video hearings or ITAT bench sessions.',
  },
  {
    step: '06',
    title: 'Order Tracking & Demand Deletion',
    desc: 'We file post-hearing written submissions and track final appellate orders to secure complete deletion of additions.',
  },
];

export const COMMUNICATION_CHANNELS = [
  {
    title: 'Appellate Video Conference',
    desc: 'Live representation before the Commissioner (Appeals) and ITAT benches across regional jurisdictions.',
    icon: 'Video',
  },
  {
    title: 'Senior Partner Case Conference',
    desc: 'In-depth video strategy conference with Senior Chartered Accountants and former ITAT litigators.',
    icon: 'PhoneCall',
  },
  {
    title: 'Exhaustive Appeal Paper Books',
    desc: 'Factual matrices, paper books, case law compendiums, and digital submissions filed on the IT portal.',
    icon: 'FileText',
  },
  {
    title: 'Litigation WhatsApp Desk',
    desc: 'Dedicated case updates on hearing notices, adjournment requests, and portal intimation tracking.',
    icon: 'MessageSquare',
  },
];

export const CONSULTATION_PLANS = [
  {
    id: 'starter',
    name: 'Assessment Scrutiny & Appeal Strategy',
    badge: 'Initial Strategy',
    price: 7999,
    originalPrice: 14999,
    discount: '46% off',
    duration: 'Comprehensive Case Review',
    features: [
      'In-depth review of Assessment Order, computation sheet, and SCN',
      'Merits evaluation of additions under Sec 68, 69, 148, or 14A',
      'Jurisdictional and limitation challenge viability report',
      'Drafting of Section 220(6) stay of recovery application',
      'Written Appeal Strategy Memo & document checklist',
    ],
    cta: 'Book Appeal Strategy',
    popular: true,
  },
  {
    id: 'standard',
    name: 'Complete CIT(Appeals) Filing & Representation (Form 35)',
    badge: 'Most Popular',
    price: 19999,
    originalPrice: 34999,
    discount: '42% off',
    duration: 'End-to-End First Appeal',
    features: [
      'Drafting of comprehensive Statement of Facts & Grounds of Appeal',
      'Filing of Form 35 on the Income Tax portal within 30 days',
      'Application for admission of additional evidence under Rule 46A',
      'Representation in faceless video conference hearings before NFAC',
      'Post-hearing written submissions & legal authority citations',
    ],
    cta: 'Book CIT(A) Appeal',
    popular: false,
  },
  {
    id: 'elite',
    name: 'Income Tax Appellate Tribunal (ITAT) Appeal (Form 36)',
    badge: 'Tribunal Litigation',
    price: 49999,
    originalPrice: 89999,
    discount: '44% off',
    duration: 'Tribunal Proceedings',
    features: [
      'Drafting of Appeal Memo in Form 36 and Stay Petition before ITAT',
      'Compilation of exhaustive Paper Book with High Court/SC precedents',
      'Senior Tax Counsel oral appearance before Divisional Bench',
      'Rebuttal arguments against Departmental Representative (DR)',
      'Dedicated litigation partner & priority hotline until order passage',
    ],
    cta: 'Book ITAT Representation',
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
    question: 'What is Income Tax Dispute & Appeals representation?',
    answer:
      'Income Tax Dispute & Appeals representation is a specialized litigation service for taxpayers aggrieved by arbitrary assessment orders, reassessments (Section 148), or heavy penalties passed by the Income Tax Department. Our senior litigators draft and file statutory appeals before the Commissioner of Income Tax (Appeals) [CIT(A)] via Form 35 and before the Income Tax Appellate Tribunal (ITAT) via Form 36, and represent you in oral hearings.',
  },
  {
    question: 'What is the deadline for filing an appeal before CIT(Appeals)?',
    answer:
      'Under Section 249(2) of the Income Tax Act, an appeal in Form 35 must be filed within 30 days of the date of service of the assessment order or demand notice. If you have exceeded this timeframe, we draft and submit a formal Condonation of Delay petition citing bona fide medical, technical, or reasonable causes, which appellate authorities frequently accept.',
  },
  {
    question: 'How does the National Faceless Appeal Centre (NFAC) work?',
    answer:
      'Under the Faceless Appeal Scheme, appeals are allocated dynamically to any appellate commissioner across India. All pleadings, Statement of Facts, and paper books are submitted online. If oral submissions are needed, our counsel requests a video conference hearing and presents oral arguments through secure video streaming.',
  },
  {
    question: 'Can the department recover the tax demand while my appeal is pending?',
    answer:
      'The mere filing of an appeal does not automatically stay the demand. However, under Section 220(6) and CBDT Office Memorandums, if the taxpayer applies for stay and deposits 20% of the disputed demand, the assessing officer is mandated to stay the balance 80% collection until disposal of the First Appeal. In hardship cases, we argue for even lower deposits or full stay.',
  },
  {
    question: 'What are Section 68, 69, and 115BBE additions?',
    answer:
      'Section 68 taxes unexplained cash credits, share capital, or loans, while Section 69/69A taxes unexplained investments or money. Crucially, under Section 115BBE, these additions are taxed at a punitive rate of 60% plus 25% surcharge (effective 78% tax rate) plus penalty. Our legal defense dismantles these additions by demonstrating identity, creditworthiness, and genuineness of the transactions.',
  },
  {
    question: 'Can I introduce new documents or evidence during the appeal stage?',
    answer:
      'Yes. Under Rule 46A of the Income Tax Rules, additional evidence not produced before the Assessing Officer can be admitted if the officer failed to provide sufficient opportunity, or if the taxpayer was prevented by sufficient cause from producing it. We draft the requisite Rule 46A application to ensure your evidence is admitted into the record.',
  },
  {
    question: 'What is the starting fee for Income Tax dispute advisory?',
    answer:
      'The initial Assessment Scrutiny & Appeal Strategy package is ₹7,999 (inclusive of GST). End-to-end Form 35 drafting and faceless hearing representation is ₹19,999, while ITAT Tribunal representation is ₹49,999.',
  },
  {
    question: 'How do you defend reassessment notices under Section 148 / 148A?',
    answer:
      'Under the revamped reassessment regime, the department must first conduct an inquiry under Section 148A(a), provide prior show cause notice under Section 148A(b), and obtain specified authority sanction under Section 151. We scrutinize the reasons recorded, check limitation compliance, and challenge jurisdictional defects to have the proceedings quashed.',
  },
  {
    question: 'Can you help with Section 270A penalty proceedings?',
    answer:
      'Yes. Section 270A imposes a 50% penalty for under-reporting and 200% for misreporting. We file applications under Section 270AA within one month of the assessment order for grant of statutory immunity from penalty and prosecution, or contest the penalty on merits before CIT(A).',
  },
  {
    question: 'Who will handle my appeal and represent me in hearings?',
    answer:
      'Your appeal will be led by a designated Senior Tax Partner (FCA or Senior High Court Advocate) with at least 15–20 years of experience in direct tax litigation and former ITAT practice.',
  },
  {
    question: 'What happens if CIT(Appeals) rejects my appeal?',
    answer:
      'If the First Appeal is decided against you, you have the right to file a Second Appeal before the Income Tax Appellate Tribunal (ITAT) in Form 36 within 60 days. The ITAT is the final fact-finding authority in India and offers robust independent adjudication.',
  },
  {
    question: 'Can an adverse ITAT order be challenged in the High Court?',
    answer:
      'Yes. Under Section 260A, an appeal lies to the High Court within 120 days of the ITAT order on any substantial question of law. Our litigators assist in formulating the questions of law and drafting the appeal memo.',
  },
];
