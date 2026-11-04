/**
 * Constants for Trademark Hearing Support Module
 * Specialized legal defense before the Trade Marks Registry (TMR)
 */

export const TRADEMARK_HEARING_HERO = {
  badge: 'Legal Tech Platform Since 2010 🇮🇳',
  festiveBadge: 'Diwali IP Protection Offer',
  title: 'Trademark Hearing Support',
  description:
    'Senior representation by Registered Trademark Agents and IP Litigation Advocates before the Trade Marks Registry (TMR) for Section 9, Section 11 objections, Show Cause hearings, and Section 21 Opposition hearings.',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'Trademark Hearing Support', href: '/services/trademark-hearing-support' },
  ],
  benefits: [
    {
      id: 1,
      title: 'Registered Trademark Attorneys & Agents',
      desc: 'Expert representation by certified trademark attorneys licensed under Rule 145 before all 5 Registry Benches (Mumbai, Delhi, Chennai, Kolkata, Ahmedabad).',
    },
    {
      id: 2,
      title: 'Judicial Precedents & Case Law Compendium',
      desc: 'Comprehensive written submissions backed by binding High Court and Supreme Court trademark jurisprudence to overcome Registry objections.',
    },
    {
      id: 3,
      title: 'High Allowance Rate (94%+ Success)',
      desc: 'Proven track record of converting contested show cause hearings into trademark advertisement in the Trade Marks Journal.',
    },
  ],
  liveStatus: {
    onlineExperts: '85+ Trademark Attorneys online',
    ongoingHearings: '28 ongoing TMR hearings',
  },
  pricingNote: {
    original: 5999,
    current: 3499,
    duration: 'per official hearing representation',
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
    id: 'section_9_objection',
    name: 'Section 9 Absolute Grounds of Refusal',
    icon: 'ShieldAlert',
    color: '#EF4444',
    options: [
      'Section 9(1)(a) Devoid of Any Distinctive Character Defense',
      'Section 9(1)(b) Descriptive / Laudatory / Quality Terms Argument',
      'Section 9(1)(c) Customary / Generic in Trade Defense',
      'Establishing Acquired Distinctiveness through Prior Commercial Use',
      'Compilation of User Affidavits (Rule 25) & Invoice Bundles',
      'Proving Coined / Arbitrary Nature of the Brand Name',
    ],
  },
  {
    id: 'section_11_objection',
    name: 'Section 11 Relative Grounds of Refusal',
    icon: 'Scale',
    color: '#3B82F6',
    options: [
      'Overcoming Similarity with Prior Registered / Pending Marks',
      'Honest Concurrent Use Defense under Section 12',
      'Anti-Dissection Rule & Whole Mark Comparison Test',
      'Class Goods/Services Difference & Trade Channel Segregation',
      'Prior Adoption & Prior User Superiority Argument (Section 34)',
      'Submitting No-Objection Consent Letters from Conflicting Owners',
    ],
  },
  {
    id: 'show_cause_hearing',
    name: 'Show Cause Hearing Pursuant to Examination Report',
    icon: 'FileSpreadsheet',
    color: '#10B981',
    options: [
      'Appearance before Hearing Officer via Virtual VC Hearing',
      'Addressing Outstanding Examiner Objections from Reply to Miscellany',
      'Filing Form TM-M for Voluntary Disclaimer of Generic Words',
      'Class & Goods Restriction / Amendment under Rule 37',
      'Oral Submissions & Instant Case Law Citations during Hearing',
      'Filing Post-Hearing Additional Written Submissions',
    ],
  },
  {
    id: 'opposition_proceedings',
    name: 'Section 21 Opposition Hearings (Form TM-O)',
    icon: 'AlertOctagon',
    color: '#8B5CF6',
    options: [
      'Defending Against Notice of Opposition (Form TM-O)',
      'Drafting & Filing Counter-Statement (Form TM-O Reply)',
      'Evidence in Support of Application under Rule 45',
      'Cross-Evidence Rebuttal Affidavits under Rule 47',
      'Final Oral Advocacy before Deputy / Joint Registrar',
      'Settlement & Trademark Co-existence Agreement Negotiations',
    ],
  },
  {
    id: 'rectification_hearings',
    name: 'Section 57 Rectification & Cancellation Hearings',
    icon: 'Landmark',
    color: '#F59E0B',
    options: [
      'Defending Registered Mark Against Non-Use Cancellation Petitions',
      'Proving Continuous Commercial Use under Section 47',
      'Rectification Defense on Grounds of Subsequent Descriptiveness',
      'Cross-Border Trademark Bad Faith Claims Defense',
      'High Court Commercial Division IP Bench Representation',
      'Restoration of Abandoned or Lapsed Trademarks',
    ],
  },
  {
    id: 'procedural_tm_m',
    name: 'Procedural Hearings & Post-Registration Defense',
    icon: 'Globe',
    color: '#EC4899',
    options: [
      'Hearing on Form TM-M (Clerical Errors & Proprietor Name Change)',
      'Section 45 Assignment & Transmission Hearings',
      'Hearing on Registered User Licensing (Form TM-U)',
      'Condition Compliance & Associated Mark Segregation',
      'Hearing on Condonation of Procedural Delay',
      'Expedited Processing & Examination Fast-Track Hearings',
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rohan Deshmukh',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'Our brand was stuck under Section 9 for 14 months with a descriptive objection. BharatFiling’s advocate argued acquired distinctiveness in the virtual hearing and got our mark accepted in 15 minutes.',
    fullReview:
      'Our health supplement brand was stuck under Section 9 for 14 months with a descriptive objection by the Mumbai Registry. BharatFiling’s registered attorney prepared a user affidavit with revenue invoices and presented oral arguments in the virtual hearing. The officer accepted the mark on the spot and it is now published in the TM Journal.',
  },
  {
    id: 2,
    name: 'Pooja Venkatesh',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'Faced Section 11 conflict against a multinational conglomerate. The attorney successfully proved phonetical distinction and honest concurrent adoption, getting the objection waived.',
    fullReview:
      'We received a severe Section 11 notice citing similarity with a global apparel label. BharatFiling compiled judicial precedents on the anti-dissection rule and argued honest concurrent adoption under Section 12. The Assistant Registrar ruled in our favor and ordered advertisement without opposition.',
  },
  {
    id: 3,
    name: 'Amanpreet Singh',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'A competitor filed an opposition under Section 21 just before registration. BharatFiling drafted our counter-statement, led the hearing arguments, and defeated the opposition with costs.',
    fullReview:
      'A predatory competitor filed Form TM-O opposition against our software brand right before registration. BharatFiling drafted an ironclad counter-statement and affidavit evidence under Rule 45. During the hearing, their senior IP counsel dismantled the opponent’s claims and secured full registration for us.',
  },
];

export const TRUSTED_PARTNERS = [
  { name: 'Intellectual Property Attorneys Association (IPAA)', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'International Trademark Association (INTA) Network', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg' },
  { name: 'D2C Founders Guild', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'National Startup Association', logo: 'https://d2q79iu7y44aq9.cloudfront.net/globallinker/images/gl-logo.png' },
  { name: 'FMCG Brand Owners Federation', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
  { name: 'E-Commerce Sellers Council', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg' },
];

export const WHO_CAN_USE = [
  {
    title: 'D2C & Consumer Brands',
    desc: 'Protect brand names, packaging trade dress, slogans, and logos from Section 9 & 11 refusals.',
    icon: 'ShoppingBag',
  },
  {
    title: 'Tech & SaaS Startups',
    desc: 'Defend coined app names, algorithms, software trademarks, and Madrid Protocol international filings.',
    icon: 'Laptop',
  },
  {
    title: 'Pharmaceutical & Healthcare',
    desc: 'Strict Cadila healthcare deceptive similarity defense, drug prefix/suffix scrutiny, and Class 5 defense.',
    icon: 'HeartPulse',
  },
  {
    title: 'Hospitality & Food Chains',
    desc: 'Restaurant name defense, sound marks, multi-outlet chain trademarks, and geographical term exclusions.',
    icon: 'Utensils',
  },
  {
    title: 'Apparel & Fashion Designers',
    desc: 'Sub-brand protection, seasonal collection names, designer labels, and Class 25 opposition defense.',
    icon: 'Shirt',
  },
  {
    title: 'Manufacturing & Industrial OEMs',
    desc: 'Hardware model identifiers, house marks vs product marks, and industrial goods Class 7/9 defense.',
    icon: 'Factory',
  },
];

export const WHEN_TO_CONSULT = [
  'Status on the IP India portal changes to "Ready for Show Cause Hearing" or "Hearing Scheduled"',
  'Upon receiving an Examination Report with refusal under Section 9(1) or Section 11(1)',
  'When served with a Notice of Hearing specifying a virtual video conference link and date',
  'When a third party files Form TM-O Notice of Opposition within 4 months of Journal publication',
  'When seeking an adjournment (Form TM-M) due to unavailability or document preparation',
  'Upon receiving a Section 57 Rectification or Cancellation notice from a rival company',
  'When examiner demands deletion or restriction of core goods and services in Class specification',
  'When facing abandonment notice under Rule 33(4) for non-appearance at prior hearing',
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Provide Application Number',
    desc: 'Enter your 7-digit trademark application number, class, and upload the hearing notice or examination report.',
  },
  {
    step: '02',
    title: 'Conflict & Case Law Analysis',
    desc: 'Our registered trademark attorney conducts comparative phonetic/visual analysis and pulls relevant High Court rulings.',
  },
  {
    step: '03',
    title: 'Written Submissions Compilation',
    desc: 'We draft robust written arguments, compile commercial user evidence (invoices, CA certificates), and draft Form TM-48 authorization.',
  },
  {
    step: '04',
    title: 'Virtual Hearing Representation',
    desc: 'Our designated IP advocate attends the virtual TMR video conference and presents oral arguments before the Hearing Officer.',
  },
  {
    step: '05',
    title: 'Post-Hearing Filing (Form TM-M)',
    desc: 'We file post-hearing written submissions, user affidavits, or voluntary disclaimers as directed by the Hearing Officer.',
  },
  {
    step: '06',
    title: 'Advertisement in TM Journal',
    desc: 'We track the Trade Marks Journal publication and safeguard the mark through the statutory 4-month opposition window.',
  },
];

export const COMMUNICATION_CHANNELS = [
  {
    title: 'Virtual TMR Hearing Advocacy',
    desc: 'Live video representation before the Registrar across Mumbai, Delhi, Chennai, Kolkata, and Ahmedabad benches.',
    icon: 'Video',
  },
  {
    title: 'Pre-Hearing Attorney Briefing',
    desc: 'Dedicated strategy call with Registered Trademark Agent to align on evidence and compromise positions.',
    icon: 'PhoneCall',
  },
  {
    title: 'Case Law Dossier & Submissions',
    desc: 'Formal legal compilation with headnotes of binding Delhi High Court and Supreme Court IP precedents.',
    icon: 'FileText',
  },
  {
    title: 'Registry Intimation Tracker',
    desc: 'Instant WhatsApp & email notifications for hearing cause lists, order sheets, and journal publication.',
    icon: 'MessageSquare',
  },
];

export const CONSULTATION_PLANS = [
  {
    id: 'starter',
    name: 'Single Hearing Representation',
    badge: 'Standard Hearing',
    price: 3499,
    originalPrice: 5999,
    discount: '42% off',
    duration: 'Per Hearing Appearance',
    features: [
      'Comprehensive study of Examination Report & prior reply',
      'Drafting of Form TM-48 (Power of Attorney) for hearing counsel',
      'Senior Trademark Attorney appearance in virtual TMR hearing',
      'Oral arguments addressing Section 9 or Section 11 objections',
      'Detailed hearing outcome report and next-step roadmap',
    ],
    cta: 'Book Hearing Counsel',
    popular: true,
  },
  {
    id: 'standard',
    name: 'Written Submissions + Hearing Defense',
    badge: 'Most Popular',
    price: 6999,
    originalPrice: 11999,
    discount: '42% off',
    duration: 'Complete Show Cause Defense',
    features: [
      'Everything in Single Hearing Representation',
      'Drafting exhaustive Written Arguments & Case Law Compendium',
      'Drafting User Affidavit (Rule 25) with evidence exhibits',
      'Filing Post-Hearing Submissions on IP India portal',
      'Filing Form TM-M for disclaimers or class amendments if required',
    ],
    cta: 'Book Complete Defense',
    popular: false,
  },
  {
    id: 'elite',
    name: 'Section 21 Opposition Defense (Form TM-O)',
    badge: 'Contested Opposition',
    price: 12999,
    originalPrice: 22999,
    discount: '43% off',
    duration: 'Opposition Proceedings',
    features: [
      'Detailed analysis of Opponent’s Form TM-O Notice of Opposition',
      'Drafting and filing of comprehensive Counter-Statement',
      'Affidavit in support of application under Rule 45',
      'Oral representation before Hearing Officer in contested opposition',
      'Dedicated IP litigation partner until final order issuance',
    ],
    cta: 'Book Opposition Defense',
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
    question: 'Why has my trademark application been scheduled for a hearing?',
    answer:
      'A trademark hearing is scheduled when the Trademark Examiner is not completely satisfied with the written reply submitted to the Examination Report. This typically occurs when objections under Section 9 (distinctiveness issues) or Section 11 (conflict with an earlier mark) persist. A hearing provides a final opportunity for an authorized advocate to orally argue your case before the Registrar.',
  },
  {
    question: 'Do I personally need to attend the trademark hearing?',
    answer:
      'No. Under Section 145 of the Trade Marks Act, you can authorize a Registered Trademark Agent or Advocate by executing Form TM-48 (Power of Attorney). Our designated IP attorney will appear on your behalf in the virtual video conference and present all factual and legal submissions.',
  },
  {
    question: 'How are trademark hearings conducted currently?',
    answer:
      'All 5 Trade Marks Registry offices (Mumbai, Delhi, Chennai, Kolkata, and Ahmedabad) now conduct hearings virtually via video conference (Webex/Cisco). A designated link is provided in the hearing notice, allowing our counsel to represent you regardless of which bench holds jurisdiction over your application.',
  },
  {
    question: 'What is the difference between Section 9 and Section 11 objections?',
    answer:
      'Section 9 deals with Absolute Grounds of Refusal, meaning the trademark is descriptive, generic, laudatory, or lacks inherent distinctiveness. Section 11 deals with Relative Grounds of Refusal, meaning your mark is identical or confusingly similar to a prior registered or pending mark in the same or similar goods/services.',
  },
  {
    question: 'How do you overcome a Section 9 descriptive objection?',
    answer:
      'We prove that the mark has acquired secondary meaning or distinctiveness through long and extensive commercial use prior to the filing date. We prepare a detailed User Affidavit under Rule 25 accompanied by commercial invoices, advertising expenses, CA sales turnover certificates, and media coverage.',
  },
  {
    question: 'How do you defend against a Section 11 similarity objection?',
    answer:
      'We utilize key trademark doctrines including the Anti-Dissection Rule, the Whole Mark Test, and commercial difference in goods/services or trade channels. Furthermore, if you adopted the mark earlier or concurrently in good faith, we argue Honest Concurrent Use under Section 12 or Prior User rights under Section 34.',
  },
  {
    question: 'What is the fee for Trademark Hearing Support?',
    answer:
      'A single virtual hearing representation before the Trade Marks Registry is ₹3,499 (inclusive of GST). Comprehensive written submissions with user evidence is ₹6,999, while Section 21 Opposition defense is ₹12,999.',
  },
  {
    question: 'What happens if we do not appear for the hearing?',
    answer:
      'If neither you nor your authorized agent attends the hearing on the scheduled date, the Registry will issue an abandonment order under Rule 33(4) and treat the application as abandoned. To revive it, an expensive restoration petition in Form TM-M must be filed.',
  },
  {
    question: 'Can the hearing be adjourned if we need more time?',
    answer:
      'Yes. If additional time is required to collect user evidence or invoices, we can file an application for adjournment in Form TM-M along with the prescribed statutory fee at least 3 days prior to the hearing date.',
  },
  {
    question: 'What documents are required for the hearing?',
    answer:
      'You will need your 7-digit Application Number, copy of the Examination Report, copy of the Reply to Examination Report, hearing notice, and executed Form TM-48 authorization. For Section 9 cases, prior date invoices and revenue numbers are crucial.',
  },
  {
    question: 'What happens after the hearing is concluded?',
    answer:
      'The Hearing Officer may either accept the mark on the spot, request post-hearing written submissions/disclaimer (Form TM-M), or take the matter under advisement. Once accepted, the mark is published in the Trade Marks Journal.',
  },
  {
    question: 'What is a Section 21 Opposition hearing?',
    answer:
      'After journal publication, third parties have 4 months to oppose your registration by filing Form TM-O. If opposed, the matter proceeds to contested opposition proceedings with pleadings (Counter-Statement), evidence affidavits (Rules 45–47), and a final opposition hearing.',
  },
];
