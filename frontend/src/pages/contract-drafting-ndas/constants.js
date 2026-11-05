// constants.js - Contract Drafting & NDAs (Indian Contract Act 1872 & IT Act 2000)

export const CONTRACT_DRAFTING_HERO = {
  badge: 'Indian Contract Act, 1872 & IT Act Compliant 📜',
  title: 'Custom Legal Contract Drafting & NDAs Online',
  description:
    'Customized legal agreements drafted by experienced corporate advocates: Non-Disclosure Agreements (NDAs), Founder Agreements, Master Services Agreements (MSAs), Employment Contracts, and Vendor SLA agreements with complete enforceability.',
  bullets: [
    'Custom drafting tailored to your exact business model, liabilities, and intellectual property.',
    'Strict compliance with Indian Contract Act, 1872 and state stamp duty laws.',
    'Two free rounds of lawyer revisions + lawyer consultation call included.',
  ],
  videoModal: {
    title: 'Commercial Contract Drafting & NDA Enforceability Guide',
    description:
      'Understand key legal clauses: confidentiality exclusions, non-solicitation, indemnity caps, dispute resolution, governing law, and digital execution under the IT Act, 2000.',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
  },
  cardTitle: 'Contract Drafting & NDAs',
  consultationFeeText: '₹999 ₹499 for a 30-minute Corporate Legal Consultation',
  guaranteeText: 'Bar Council of India Verified Corporate Legal Counsels',
};

export const TRUSTED_PARTNERS = [
  { name: 'Bar Council of India Network', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg' },
  { name: 'Digital e-Sign & IT Act 2000 Portal', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'National Arbitration & Conciliation Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg' },
  { name: 'MCA & DPIIT Startup Legal Network', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg' },
  { name: 'SHCIL e-Stamping Integration', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
];

export const CORE_FEATURES = [
  {
    icon: 'FileText',
    title: 'Non-Disclosure Agreements (NDAs)',
    desc: 'Unilateral and mutual NDAs protecting trade secrets, proprietary source code, customer databases, pricing algorithms, and pitch deck confidential materials.',
  },
  {
    icon: 'Users',
    title: 'Founder & Co-Founder Agreements',
    desc: 'Bespoke agreements defining equity ownership, 4-year reverse vesting with 1-year cliff, IP assignment to company, voting rights, and dead-lock resolution.',
  },
  {
    icon: 'Briefcase',
    title: 'Master Services Agreement (MSA) & SOW',
    desc: 'Comprehensive B2B commercial agreements with detailed Statements of Work (SOW), payment milestones, acceptance criteria, intellectual property ownership, and liability caps.',
  },
  {
    icon: 'Scale',
    title: 'Employment & Consultant Agreements',
    desc: 'Legally vetted offer letters, executive employment agreements, ESOP vesting policies, non-compete within legal bounds, and independent contractor agreements.',
  },
  {
    icon: 'ShieldCheck',
    title: 'SaaS Terms of Service & Privacy Policy',
    desc: 'Digital platform agreements compliant with the Digital Personal Data Protection Act (DPDPA), 2023, IT Act, 2000, GDPR, and consumer protection guidelines.',
  },
  {
    icon: 'AlertCircle',
    title: 'Contract Review & Redlining Service',
    desc: 'Thorough legal audit of vendor, client, or investor-provided agreements; identifying hidden liabilities, unfair indemnity clauses, and ambiguous termination penalties.',
  },
];

export const CONTRACT_TYPES_MATRIX = [
  {
    agreement: 'Non-Disclosure Agreement (NDA)',
    purpose: 'Protection of proprietary trade secrets, business ideas, financial models, and customer data during negotiations.',
    typicalParties: 'Startups, Investors, Tech Vendors, Potential Acquirers, BPO Clients.',
    keyClauses: 'Definition of Confidential Info, Non-Use, Marking Exceptions, 2-5 Year Term, Injunction Relief.',
  },
  {
    agreement: 'Co-Founder Agreement',
    purpose: 'Preventing founder disputes, outlining operational roles, and securing IP assignment before raising institutional capital.',
    typicalParties: 'Early-stage Startup Co-Founders, Technical Architects, Business Co-Owners.',
    keyClauses: 'Reverse Vesting Schedule, 1-Year Cliff, IP Assignment, Good Leaver / Bad Leaver, Drag-Along.',
  },
  {
    agreement: 'Master Services Agreement (MSA)',
    purpose: 'Governing ongoing business engagements, technology development, marketing services, or corporate consulting.',
    typicalParties: 'IT Companies, Marketing Agencies, Corporate Clients, System Integrators.',
    keyClauses: 'Work Product Ownership, Limitation of Liability (1x Fees), Indemnity Carve-Outs, SLA Benchmarks.',
  },
  {
    agreement: 'Employment & Non-Compete Agreement',
    purpose: 'Formalizing employment terms, protecting company data, inventions, and preventing employee poaching.',
    typicalParties: 'Employers, Full-Time Executives, Software Engineers, Key Management Personnel (KMP).',
    keyClauses: 'Invention Assignment, Non-Solicitation (Clients & Staff), Confidentiality, Notice Period, Severance.',
  },
];

export const COMPLIANCE_WORKFLOW = [
  {
    step: '01',
    title: 'Requirements Questionnaire & Brief',
    desc: 'We collect your business context, transaction value, specific deliverables, IP protection needs, and payment terms through a structured legal intake.',
  },
  {
    step: '02',
    title: 'Advocate Assignment & Initial Drafting',
    desc: 'A dedicated corporate legal counsel drafts your customized agreement from scratch, ensuring complete enforceability under Indian law.',
  },
  {
    step: '03',
    title: 'First Draft Delivery (24-48 Hours)',
    desc: 'Delivery of clean editable Word (.docx) and PDF versions with explanatory comments highlighting key commercial protections.',
  },
  {
    step: '04',
    title: 'Lawyer Consultation & Redline Review',
    desc: 'A 1-on-1 audio/video call with the drafting advocate to walk through each clause, answer queries, and address counterparty pushback.',
  },
  {
    step: '05',
    title: 'Two Rounds of Revisions Included',
    desc: 'Refining clauses based on your feedback or opposing counsel notes to finalize an airtight, mutually agreeable document.',
  },
  {
    step: '06',
    title: 'Execution, Stamp Duty & e-Sign Advisory',
    desc: 'Guidance on state-wise stamp duty values, non-judicial stamp paper procurement, and legal electronic signing under IT Act Section 10A.',
  },
];

export const LEGAL_PROTECTION_MATRIX = [
  {
    risk: 'Ambiguous Intellectual Property Ownership',
    legalPitfall: 'Work created by freelancers or contractors automatically belongs to them unless transferred via written assignment under Copyright Act Section 19.',
    solution: 'Explicit "Work Made for Hire" & irrevocable worldwide IP assignment clauses covering all present and future code/designs.',
  },
  {
    risk: 'Unlimited Financial Liability & Consequential Damages',
    legalPitfall: 'Without liability caps, a client breach or bug could result in massive claims for lost profits or reputational damages.',
    solution: 'Airtight Limitation of Liability clause capping aggregate claims to fees paid in preceding 3-12 months.',
  },
  {
    risk: 'Client or Employee Poaching (Solicitation)',
    legalPitfall: 'Employees or contractors stealing your key clients or poaching your engineering team upon contract conclusion.',
    solution: 'Strict 12 to 24-month non-solicitation covenants with liquidated damages enforceable under Section 27 of Contract Act.',
  },
  {
    risk: 'Unilateral Termination Without Payment',
    legalPitfall: 'Clients terminating projects midway and refusing to pay for work already completed or resources committed.',
    solution: 'Structured kill-fees, minimum notice periods (30 days), and mandatory payment for pro-rata milestone hours.',
  },
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Standard Legal Agreement / NDA',
    price: 1499,
    originalPrice: 2999,
    badge: 'Single Document Drafting',
    features: [
      'Custom drafting of 1 standard agreement (NDA, Freelancer, or Offer Letter)',
      'Drafted by Bar Council verified Corporate Advocate',
      'Clear definition of confidentiality, IP transfer, and dispute terms',
      '1 round of legal revisions within 7 days of delivery',
      'Delivered in editable Word (.docx) + print-ready PDF format',
      'e-Sign & stamp duty execution guidelines included',
    ],
    cta: 'Draft Standard Agreement',
    popular: false,
  },
  {
    id: 'growth',
    name: 'Commercial Agreement (MSA / Vendor / SLA)',
    price: 2999,
    originalPrice: 5999,
    badge: 'Most Popular (B2B Businesses)',
    features: [
      'Everything in Standard Drafting +',
      'Comprehensive Master Services Agreement (MSA) or Vendor Contract',
      'Detailed Statement of Work (SOW) & payment milestone template',
      'Robust Limitation of Liability, Indemnity & Termination clauses',
      '2 rounds of lawyer revisions based on counterparty comments',
      '20-minute phone / video consultation with drafting counsel',
      'Expedited 24-hour draft turnaround available',
    ],
    cta: 'Select Commercial Drafting',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Bespoke Founder / Investor / Multi-Party Suite',
    price: 5999,
    originalPrice: 11999,
    badge: 'Founders & Complex Deals',
    features: [
      'Complete Co-Founder Agreement with 4-year reverse vesting schedule',
      'IP Assignment Agreement (Form 19 Copyright Act compliant)',
      'ESOP Policy guidelines & Board resolution templates',
      'Unlimited revisions until mutually signed execution',
      'Direct participation of Senior Counsel in negotiation calls',
      'State-specific non-judicial e-Stamping coordination',
      'Quarterly legal contract repository audit & updates',
    ],
    cta: 'Consult for Enterprise Suite',
    popular: false,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Arjun Nambiar',
    role: 'Co-Founder & CEO, Zentech AI Solutions',
    location: 'Koramangala, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    content:
      'We were closing a \$120,000 SaaS contract with a US fintech client who sent a 35-page Master Services Agreement filled with draconian indemnity clauses. BharatFiling’s legal counsel redlined the entire contract, added mutual liability caps, and got it accepted by US legal in 48 hours.',
    rating: 5,
  },
  {
    name: 'Priyanka Singhania',
    role: 'Managing Partner, Singhania Design Studios',
    location: 'Connaught Place, New Delhi',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    content:
      'Our previous freelance contracts didn’t have proper IP transfer clauses, leading to an ownership dispute with a client. BharatFiling drafted our new comprehensive Master Services Agreement and mutual NDAs. Their lawyer explained every clause patiently.',
    rating: 5,
  },
  {
    name: 'Kunal Mehra',
    role: 'Co-Founder, QuickDeliver Logistics',
    location: 'Bandra Kurla Complex, Mumbai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    content:
      'When raising our pre-seed round, our investors required a formal Co-Founder agreement with reverse vesting and IP assignment. Advocate Vikramaditya Sen drafted a clean, institutional-grade agreement in just 2 days. Seamless experience.',
    rating: 5,
  },
];

export const FAQS = [
  {
    q: 'What makes a contract legally binding and enforceable in India?',
    a: 'Under Section 10 of the Indian Contract Act, 1872, an agreement is a valid contract if it is made by the free consent of parties competent to contract, for a lawful consideration, and with a lawful object. In addition, paying proper state stamp duty and signing either physically or electronically under the IT Act, 2000 makes it admissible as evidence in Indian courts.',
  },
  {
    q: 'Are electronic signatures (e-Sign) valid for contracts in India?',
    a: 'Yes. Under Section 10A of the Information Technology Act, 2000, contracts formed through electronic communications, digital signatures (DSC), and Aadhaar-based OTP e-signatures are legally recognized and enforceable, with limited exceptions (such as wills, trusts, and immovable property conveyances).',
  },
  {
    q: 'What is the difference between a Unilateral NDA and a Mutual NDA?',
    a: 'A Unilateral (One-Way) NDA is used when only one party discloses proprietary information (e.g., when sharing an invention with a contractor or investor). A Mutual (Two-Way) NDA is used when both parties will exchange confidential trade secrets, pricing, and business data (such as during joint venture discussions or strategic partnerships).',
  },
  {
    q: 'Why is a Founder Agreement critical before incorporating a startup?',
    a: 'A Co-Founder Agreement prevents startup death by pre-agreeing on key terms before equity is locked: equity split, roles and responsibilities, 4-year reverse vesting with a 1-year cliff (so an early departing founder doesn’t walk away with huge company shares), intellectual property assignment to the company, and exit mechanisms.',
  },
  {
    q: 'What is a "Work Made for Hire" clause in Indian law?',
    a: 'Under Section 17 of the Indian Copyright Act, 1957, work created by an employee in the course of employment generally belongs to the employer. However, for independent contractors, freelancers, and software agencies, copyright remains with the creator unless there is an express written assignment agreement signed by the creator under Section 19.',
  },
  {
    q: 'Are non-compete clauses enforceable against employees in India?',
    a: 'Under Section 27 of the Indian Contract Act, 1872, any agreement that restrains anyone from exercising a lawful profession, trade, or business is void to that extent. Therefore, post-employment non-compete restrictions are generally not enforceable in Indian courts. However, non-solicitation (preventing poaching of clients or employees) and strict confidentiality clauses are fully enforceable.',
  },
  {
    q: 'What is the role of stamp duty on commercial contracts?',
    a: 'Under the Indian Stamp Act, 1899 and state-specific Stamp Acts (such as Maharashtra, Karnataka, Delhi), an agreement must be stamped with appropriate non-judicial stamp duty. An unstamped or insufficiently stamped agreement cannot be admitted into evidence by an arbitrator or civil court until the deficit stamp duty and penalty (up to 10x) are paid.',
  },
  {
    q: 'What is a Master Services Agreement (MSA) and Statement of Work (SOW)?',
    a: 'An MSA establishes the overarching legal framework between two businesses (governing IP ownership, warranties, payment terms, confidentiality, indemnity, and dispute resolution). A Statement of Work (SOW) is a subsidiary document executed under the MSA detailing the specific project scope, deliverables, timeline, milestones, and fees.',
  },
  {
    q: 'How many rounds of revisions are included in BharatFiling contract drafting?',
    a: 'Our drafting services include up to 2 comprehensive rounds of revisions within 14 days of initial draft delivery. Our corporate advocates update clauses based on your business feedback or objections raised by the counterparty’s legal team.',
  },
  {
    q: 'Can BharatFiling review and redline an agreement sent by my client or investor?',
    a: 'Yes. We offer contract review and redlining services. Our advocates review the counterparty’s draft, mark problematic clauses in redline mode with track changes, explain underlying risks in plain English, and provide counter-drafted clauses protecting your interests.',
  },
  {
    q: 'How quickly will I receive my completed contract draft?',
    a: 'Standard NDAs and freelancer agreements are typically delivered within 24 business hours. Complex Master Services Agreements, SaaS SLAs, and Founder Agreements are delivered within 48 to 72 business hours after receiving your completed legal questionnaire.',
  },
  {
    q: 'Do you provide arbitration and dispute resolution clauses in contracts?',
    a: 'Yes. Every contract we draft includes a dispute resolution mechanism under the Arbitration and Conciliation Act, 1996, specifying the seat of arbitration, governing law, and jurisdiction to avoid expensive and prolonged court litigation.',
  },
];

export const CONTRACT_CHECKOUT = {
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
