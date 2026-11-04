/**
 * Constants for Online Legal Consultation / Talk to a Lawyer Module
 * 1:1 Parity with Vakilsearch / Zolvit (https://vakilsearch.com/talk-to-a-lawyer)
 */

export const LEGAL_HERO = {
  badge: 'Legal Tech Platform Since 2010 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Online Lawyer Consultation',
  description:
    'Consult top verified advocates across India for property, divorce, civil, criminal, recovery, consumer disputes, legal notices, and corporate agreements.',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'Talk to a Lawyer', href: '/services/legal-consultation' },
  ],
  benefits: [
    {
      id: 1,
      title: 'Verified Senior Advocates',
      desc: 'Get personalized guidance from Bar Council verified senior lawyers anytime, 24/7.',
    },
    {
      id: 2,
      title: 'Strict Confidentiality Guaranteed',
      desc: '100% confidential and secure consultations protected by legal privilege. Your peace of mind guaranteed.',
    },
    {
      id: 3,
      title: 'Actionable Legal Roadmap',
      desc: 'Understand your rights, notice drafting requirements, dispute resolution merits, and clear next steps.',
    },
  ],
  liveStatus: {
    onlineLawyers: '240+ Advocates are online',
    ongoingCalls: '48 live ongoing calls',
  },
  pricingNote: {
    original: 1299,
    current: 799,
    duration: 'for a 30-minute Advocate consultation',
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
  'Punjabi',
];

export const CATEGORY_TREE = [
  {
    id: 'legal_notices',
    name: 'Legal Notices',
    icon: 'FileText',
    color: '#EF4444',
    options: [
      'Drafting a Legal Notice',
      'Legal Notice for Recovery of Dues',
      'Cheque Bounce Notice (Section 138)',
      'Legal Notice Under Consumer Protection Act',
      'Rental Tenant / Landlord Eviction Notice',
      'Defamation Legal Notice',
      'Employment Termination & Breach Notice',
      'Notice for Specific Performance of Contract',
    ],
  },
  {
    id: 'property_real_estate',
    name: 'Property & Real Estate',
    icon: 'Building2',
    color: '#10B981',
    options: [
      'Property Verification & Due Diligence',
      'Property Registration Assistance',
      'Property Succession & Partition',
      'Will Drafting and Registration',
      'Land Acquisition & Mutation Matters',
      'Landlord / Tenant Disputes',
      'RERA Consultation & Complaint Filing',
      'Relinquishment Deed',
      'Power of Attorney (PoA) Drafting',
      'Gift Deed Drafting & Stamp Duty',
      'Illegal Possession & Eviction Suite',
    ],
  },
  {
    id: 'family_matrimonial',
    name: 'Family & Matrimonial',
    icon: 'Users',
    color: '#EC4899',
    options: [
      'Mutual Consent Divorce',
      'Contested Divorce Proceedings',
      'Maintenance and Alimony Claims',
      'Child Custody and Guardianship',
      'Domestic Violence (DV Act) Protection',
      'Legal Heir Certificate & Succession',
      'Muslim Personal Law Matters',
      'Restitution of Conjugal Rights (RCR)',
      'Dowry Harassment (498A IPC) Defense',
    ],
  },
  {
    id: 'civil_money_recovery',
    name: 'Civil & Money Recovery',
    icon: 'Scale',
    color: '#3B82F6',
    options: [
      'Money Recovery Issues & Summary Suits',
      'Cheque Bounce Cases (Section 138 NI Act)',
      'Consumer Court Case Filing',
      'Debt Recovery Tribunal (DRT) Matters',
      'MSME Samadhan Recovery Advisory',
      'Loan Recovery / Bank Account Unfreeze',
      'Mediation & Arbitration Proceedings',
      'Defamation Cases (Civil & Criminal)',
      'National Green Tribunal (NGT) Matters',
      'Motor Accident Claims Tribunal (MACT)',
    ],
  },
  {
    id: 'criminal_defense',
    name: 'Criminal Law & Defense',
    icon: 'ShieldAlert',
    color: '#F59E0B',
    options: [
      'Anticipatory Bail Application',
      'Regular Criminal Bail Application',
      'Filing a Criminal Complaint / FIR',
      'Quashing of FIR in High Court (Sec 482)',
      'NDPS Act Matters & Bail Advisory',
      'Cyber Crime / Financial Fraud Complaint',
      'Criminal Trial Court Representation',
      'Police Harassment & Protection Orders',
    ],
  },
  {
    id: 'corporate_business',
    name: 'Corporate & Business Law',
    icon: 'Briefcase',
    color: '#6366F1',
    options: [
      'Setting up of a Business & Co-founder Terms',
      'Business Contracts & Commercial Agreements',
      'ESOP & Fundraising Legal Structuring',
      'Insolvency & Bankruptcy Code (IBC / NCLT)',
      'POSH Compliance & Internal Committee (IC)',
      'Business Due Diligence & M&A Scrutiny',
      'Trade Secret & IP Infringement Advisory',
      'Business Debt Restructuring',
      'Legal Metrology & Regulatory Licenses',
    ],
  },
  {
    id: 'contracts_agreements',
    name: 'Documentation & Agreements',
    icon: 'FileCheck2',
    color: '#8B5CF6',
    options: [
      'Non-Disclosure Agreement (NDA)',
      'Service Level Agreement (SLA) & Vendor Contract',
      'Employment Contracts & Non-Compete Clauses',
      'Commercial Lease / Rent Agreement',
      'Shareholders Agreement (SHA) & Term Sheet',
      'Franchise & Distribution Agreement',
      'Software & SaaS Licensing Agreement',
      'General Power of Attorney (GPA) / Special PoA',
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aditya Mathur',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'I needed urgent guidance for an illegal construction dispute. BharatFiling connected me with a senior High Court property advocate in under 15 minutes. Very professional and reassuring advice.',
    fullReview:
      'I needed urgent guidance for an illegal construction dispute. BharatFiling connected me with a senior High Court property advocate in under 15 minutes. The lawyer thoroughly explained my rights under RERA and local municipal bylaws and drafted our response on the same day.',
  },
  {
    id: 2,
    name: 'Meghna Sengupta',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'Consulted for mutual consent divorce and custody agreement. The advocate was empathetic, discreet, and laid out the exact procedural timeline and required documentation.',
    fullReview:
      'Consulted for mutual consent divorce and custody agreement. The advocate was empathetic, discreet, and laid out the exact procedural timeline and required documentation. Saved us immense stress and multiple court trips.',
  },
  {
    id: 3,
    name: 'Karanvir Singh',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'Got a Section 138 cheque bounce notice from a supplier. The advocate checked the notice defects, drafted a strong counter-reply, and resolved the matter out of court within weeks.',
    fullReview:
      'Got a Section 138 cheque bounce notice from a supplier. The advocate checked the notice defects, drafted a strong counter-reply, and resolved the matter out of court within weeks. Complete value for money!',
  },
];

export const TRUSTED_PARTNERS = [
  { name: 'Amazon India', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Axis Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg' },
  { name: 'GlobalLinker', logo: 'https://d2q79iu7y44aq9.cloudfront.net/globallinker/images/gl-logo.png' },
  { name: 'Flipkart', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg' },
  { name: 'Yes Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'PayU', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/PayU_logo.svg' },
  { name: 'Bar Council of India Affiliated Experts', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
  { name: 'Tata Tele Business', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg' },
];

export const WHO_CAN_USE = [
  {
    title: 'Property Buyers & Owners',
    desc: 'Title verification, ancestral succession, RERA builder delays, illegal encroachment, and rental lease disputes.',
    icon: 'Building2',
  },
  {
    title: 'Individuals & Families',
    desc: 'Matrimonial disputes, mutual consent divorce, custody, wills, legal heir certificates, and domestic issues.',
    icon: 'Users',
  },
  {
    title: 'Business Owners & MSMEs',
    desc: 'B2B debt recovery, MSME Samadhan filings, commercial contract drafting, vendor disputes, and notice replies.',
    icon: 'Briefcase',
  },
  {
    title: 'Startups & Founders',
    desc: 'Co-founder agreements, IP assignment, seed fundraising terms, ESOP schemes, and POSH statutory compliance.',
    icon: 'Rocket',
  },
  {
    title: 'Consumers & Borrowers',
    desc: 'Consumer forum complaints against defective goods, insurance claim rejections, and unlawful bank account freezes.',
    icon: 'Scale',
  },
  {
    title: 'NRIs & Overseas Citizens',
    desc: 'Power of attorney execution, Indian ancestral property management, tenant disputes, and remote court representation.',
    icon: 'Globe',
  },
];

export const WHEN_TO_CONSULT = [
  'Before signing high-value property agreements, sale deeds, or joint development contracts',
  'Upon receiving a Legal Notice, police summons, court summon, or Section 138 cheque bounce notice',
  'When seeking recovery of unpaid dues, vendor invoices, or security deposits from stubborn parties',
  'Planning mutual consent divorce, maintenance settlement, or child custody arrangements amicably',
  'Drafting or reviewing critical commercial agreements, NDAs, founder MOUs, or employment contracts',
  'Defending against wrongful consumer disputes, cyber frauds, defamation, or regulatory penalties',
  'Resolving landlord-tenant friction, illegal lockouts, or unreasonable security deposit withholding',
  'Securing an independent second legal opinion before filing or contesting a major lawsuit',
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Select Legal Specialization',
    desc: 'Choose your specific legal category (e.g. Property, Notices, Matrimonial, Cheque Bounce, or Corporate).',
  },
  {
    step: '02',
    title: 'Pick Convenient Slot & Language',
    desc: 'Schedule your consultation on your preferred date and time, and select your preferred Indian language.',
  },
  {
    step: '03',
    title: 'Instant Advocate Match',
    desc: 'Our platform matches you with a verified Advocate specializing in your practice area and jurisdiction.',
  },
  {
    step: '04',
    title: '30-Minute Confidential Session',
    desc: 'Connect via phone or secure video call. Discuss facts, case merits, applicable laws, and evidence.',
  },
  {
    step: '05',
    title: 'Written Action Summary',
    desc: 'Receive a written summary of legal options, relevant legal sections, and a document checklist via email.',
  },
  {
    step: '06',
    title: 'Notice or Court Filing (Optional)',
    desc: 'If drafting a notice or filing a petition is required, your advocate can seamlessly take it up end-to-end.',
  },
];

export const COMMUNICATION_CHANNELS = [
  {
    title: 'Direct Phone Consultation',
    desc: 'Ideal for prompt answers, initial fact assessment, and urgent notice clarifications.',
    icon: 'PhoneCall',
  },
  {
    title: 'High-Definition Video Call',
    desc: 'Perfect for sharing agreement drafts, property title deeds, or court notices on screen.',
    icon: 'Video',
  },
  {
    title: 'Document & Case File Review',
    desc: 'Thorough scrutiny of contracts, notices, police complaints, or past court orders.',
    icon: 'FileCheck2',
  },
  {
    title: 'Confidential WhatsApp Desk',
    desc: 'Receive prompt appointment reminders, advocate call notices, and written advice summaries.',
    icon: 'MessageSquare',
  },
];

export const CONSULTATION_PLANS = [
  {
    id: 'starter',
    name: 'Standard Legal Advice',
    badge: 'Most Popular',
    price: 799,
    originalPrice: 1299,
    discount: '38% off',
    duration: '30-minute live session',
    features: [
      '30-minute one-to-one phone or video consultation',
      'Assigned Bar Council verified Advocate (5+ yrs experience)',
      'Review of case facts, rights, and relevant statutory sections',
      'Guidance on merits of legal action vs out-of-court settlement',
      'Structured written summary of advice delivered via email',
    ],
    cta: 'Book Standard Consultation',
    popular: true,
  },
  {
    id: 'standard',
    name: 'Senior High Court Advocate + Document Scrutiny',
    badge: 'Recommended for Disputes',
    price: 1499,
    originalPrice: 2499,
    discount: '40% off',
    duration: '45-minute deep-dive session',
    features: [
      '45-minute live session with Senior High Court Counsel (12+ yrs exp)',
      'Detailed pre-consultation scrutiny of up to 2 legal documents/notices',
      'Strategic roadmap: evidence checklist, jurisdiction & limitation',
      'Drafting strategy for legal notice or reply letter',
      'Priority follow-up support for 48 hours via dedicated desk',
    ],
    cta: 'Book Senior Advocate',
    popular: false,
  },
  {
    id: 'elite',
    name: 'Corporate & Business Legal Retainer Strategy',
    badge: 'Enterprise & High Stake',
    price: 3999,
    originalPrice: 7999,
    discount: '50% off',
    duration: '60-minute strategy session',
    features: [
      '60-minute strategy session with Senior Corporate Law Partner',
      'Full commercial contract, SHA, or dispute docket analysis',
      'Formal written legal opinion (Lawyer Opinion Letter)',
      'Litigation risk mitigation and arbitration roadmap',
      'Direct priority advocate hotline & dedicated case manager',
    ],
    cta: 'Book Corporate Retainer',
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
    question: 'What is an online lawyer consultation?',
    answer:
      'Online lawyer consultation allows individuals, businesses, and NRIs to seek professional legal advice remotely through secure video calls or phone calls. It provides instant access to verified advocates specializing in property, matrimonial, civil, criminal, recovery, consumer, and corporate laws without the hassle of traveling to court or law chambers.',
  },
  {
    question: 'Do I need to visit the lawyer in person for consultation?',
    answer:
      'No. Over 95% of legal queries, document reviews, notice draftings, and initial case assessments can be completely handled online. If physical court representation or registry visits are needed later, your assigned advocate can coordinate with you directly.',
  },
  {
    question: 'Are the lawyers on BharatFiling qualified and verified?',
    answer:
      'Yes. Every legal practitioner on BharatFiling holds an active Bar Council Enrollment Number and Bar Council of India identity verification. Our roster includes experienced advocates practicing across District Courts, High Courts, and the Supreme Court of India.',
  },
  {
    question: 'Can I get help with property law and title verification?',
    answer:
      'Yes. Property-related issues such as parent deed verification, encumbrance scrutiny, RERA builder delay complaints, illegal tenant eviction, gift deeds, and ancestral succession are actively handled by our real estate legal experts.',
  },
  {
    question: 'How are fees structured for online lawyer consultations?',
    answer:
      'A standard 30-minute one-to-one consultation is priced at ₹799 (inclusive of GST). We ensure complete transparency with zero hidden charges. If you subsequently decide to proceed with notice drafting or court filing, the advocate will provide a clear upfront quote.',
  },
  {
    question: 'Is my consultation private and confidential?',
    answer:
      'Absolutely. All consultations and shared case documents are strictly confidential and protected under attorney-client privilege. Our platform complies with ISO 27001 data security standards and 256-bit SSL encryption.',
  },
  {
    question: 'Can I consult with a lawyer in my native language?',
    answer:
      'Yes! We accommodate consultations in English, Hindi, Tamil, Telugu, Kannada, Marathi, Malayalam, Bengali, Gujarati, and Punjabi so that you can explain complex situations with ease.',
  },
  {
    question: 'Can I resolve business disputes or recover unpaid vendor dues?',
    answer:
      'Yes. You can consult with our corporate litigation and MSME recovery lawyers. We evaluate unpaid invoices, draft statutory demand notices under Section 138 (cheque bounce) or Section 8 of the Insolvency and Bankruptcy Code (IBC), and guide you on filing MSME Samadhan cases.',
  },
  {
    question: 'Who will be assigned to my case and how is the match made?',
    answer:
      'Our intelligent intake system matches your booking based on your specific practice area (e.g. Property, Divorce, Criminal Defense, Recovery), jurisdiction, and preferred language, ensuring you consult with a specialist in that domain.',
  },
  {
    question: 'Can I send a legal notice through BharatFiling after the consultation?',
    answer:
      'Yes. If your advocate advises issuing a formal legal notice, you can seamlessly commission the drafting and dispatch via registered speed post directly through our platform at an agreed flat fee.',
  },
  {
    question: 'What happens if I miss my scheduled consultation slot?',
    answer:
      'If you miss your scheduled consultation, you can reschedule your appointment free of charge within 48 hours through our support desk or the WhatsApp link sent to you.',
  },
  {
    question: 'If I need follow-up sessions, can I speak to the same advocate?',
    answer:
      'Yes. BharatFiling maintains your case history so that follow-up consultations, document drafting, or petition reviews can continue smoothly with your chosen advocate.',
  },
];
