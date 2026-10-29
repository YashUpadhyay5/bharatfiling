/**
 * Constants and statutory data for Trademark Objection Reply Module.
 * Based on Trade Marks Act, 1999 & Trade Marks Rules, 2017.
 */

export const OBJECTION_GROUNDS = [
  {
    id: 'section_9',
    section: 'Section 9',
    name: 'Absolute Grounds for Refusal',
    severity: 'High Priority',
    description:
      'Raised when the mark lacks distinctive character, is descriptive of the goods/services (kind, quality, quantity, value, or geographic origin), or consists of customary terms.',
    commonExamples: [
      'Section 9(1)(a): Lacks distinctive character to identify single commercial source',
      'Section 9(1)(b): Describing the kind, quality, intended purpose, or values',
      'Section 9(1)(c): Exclusively customary terms in current trade language',
      'Section 9(2): Deceptive marks or marks contrary to public morality',
    ],
    remedyStrategy:
      'We furnish documentary evidence of acquired distinctiveness through long, extensive, continuous commercial use (User Affidavit, audited sales figures, GST invoices, and advertisement expenses prior to the filing date).',
  },
  {
    id: 'section_11',
    section: 'Section 11',
    name: 'Relative Grounds for Refusal (Conflicting Prior Marks)',
    severity: 'High Priority',
    description:
      'Raised when your proposed trademark is identical or deceptively similar to an earlier registered or pending trademark in the same or similar class, causing consumer confusion.',
    commonExamples: [
      'Section 11(1)(a): Identical mark for identical goods/services',
      'Section 11(1)(b): Similar mark for similar goods/services creating confusion',
      'Section 11(2): Well-known earlier trademark with established public reputation',
      'Section 11(3): Prior rights under law of passing off or copyright law',
    ],
    remedyStrategy:
      'We draft comprehensive legal submissions proving phonetic, visual, and conceptual dissimilarity, differences in trade channels/target customers, and honest concurrent use under Section 12.',
  },
  {
    id: 'formalities',
    section: 'Formalities Check',
    name: 'Procedural Discrepancy / Rule 25 Notice',
    severity: 'Medium Priority',
    description:
      'Raised during the initial clerical scrutiny due to improper power of attorney (Form 48), vague description of goods, or incorrect applicant category designation.',
    commonExamples: [
      'Missing or improperly stamped Power of Attorney (Form 48)',
      'Vague or overly broad specification of goods/services under Nice Classification',
      'Mismatched applicant identity or MSME/Udyam certificate details',
    ],
    remedyStrategy:
      'Our IP compliance attorneys file rectified Form TM-M with properly executed documentation and stamped authorization within 30 days.',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'A supportive and efficient team to work with. Always prompt, clear, and respectful in communication. It’s been a pleasure collaborating with them.',
    author: 'Siddharth Rao',
    role: 'Director at InnovEdge Technologies',
    rating: 5,
  },
  {
    quote:
      'We received a severe Section 11 objection citing two multinational brand names. BharatFiling’s IP advocates drafted a 22-page reply citing Supreme Court precedents. The mark was accepted without a hearing!',
    author: 'Ananya Deshmukh',
    role: 'Founder, OrganoBites Foods',
    rating: 5,
  },
  {
    quote:
      'Our application was about to be abandoned because our previous CA missed the 30-day timeline. BharatFiling drafted and filed our Section 9 reply within 18 hours. Remarkable speed and expertise.',
    author: 'Vikram Malhotra',
    role: 'Managing Partner, Apex Logistics LLP',
    rating: 5,
  },
];

export const OBJECTION_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    price: 3499,
    originalPrice: 3999,
    discountBadge: '25% off',
    tagline: 'Ideal for objection examination + one-time response filing',
    popular: false,
    features: [
      '30 minute consultation with an IP lawyer',
      'Thorough case study on your brand objection',
      'Reply draft for TM Objection (Only Once)',
      'TM reply filing on IP portal(Only Once)',
      'Regular updates on deadlines',
      'TM Certificate*',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 7999,
    originalPrice: 9999,
    discountBadge: '20% off',
    tagline: 'Ideal for objection examination & response filing',
    popular: false,
    features: [
      '30 minute consultation with an IP lawyer',
      'Thorough case study on your brand objection',
      'Reply draft for TM Objection(As many times)',
      'TM reply filing on IP portal(As many times)',
      'Regular updates on deadlines',
      'TM Certificate*',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 13999,
    originalPrice: 27999,
    discountBadge: '50% off only for online payment',
    tagline: 'Complete solution for handling the trademark objection & hearings',
    popular: true,
    recommendedBadge: '★ Recommended',
    isDark: true,
    features: [
      '30-minute expert consultation with a Senior IP lawyer',
      'Dedicated account manager',
      'Thorough case study on your brand objection',
      'Reply draft for TM Objection(As many times)',
      'TM reply filing on IP portal(As many times)',
      'Regular updates on deadlines',
      'Appointed with a senior IP lawyer to handle the hearing (Upto 6 hearings)',
    ],
  },
  // Backward compatibility aliases
  {
    id: 'procedural',
    name: 'Procedural Reply',
    price: 1499,
    originalPrice: 2499,
    tagline: 'For Formalities Check Fail & clerical registry notices',
    popular: false,
    features: [
      'Examination report legal analysis',
      'Form TM-M preparation & filing',
      'Power of attorney (Form 48) stamping assistance',
      'Clerical classification correction',
      'Digital filing receipt from IP India',
      'Email status tracking updates',
    ],
  },
  {
    id: 'substantive',
    name: 'Section 9 & 11 Legal Defense',
    price: 2999,
    originalPrice: 4999,
    tagline: 'Most chosen by brands facing similarity or distinctiveness objections',
    popular: true,
    features: [
      'Everything in Procedural Reply',
      'Exhaustive case law research citing High Court & Supreme Court precedents',
      'Point-by-point rebuttal to all conflicting marks cited by Examiner',
      'User Affidavit drafting establishing prior commercial use & goodwill',
      'Drafted & vetted by Senior High Court IP Advocate',
      'Guaranteed filing on IP India gateway within 3 working days',
      'SMS & WhatsApp status milestone notifications',
    ],
  },
  {
    id: 'comprehensive',
    name: 'Comprehensive Defense + Hearing',
    price: 5999,
    originalPrice: 9999,
    tagline: 'Complete umbrella including advocate representation in Show Cause Hearing',
    popular: false,
    features: [
      'Everything in Section 9 & 11 Legal Defense',
      'Show Cause Hearing advocate appearance before Registrar of Trade Marks',
      'Virtual oral hearing representation & written submissions (Form TM-M)',
      'Unlimited hearing adjournments if rescheduled by Registry',
      'Direct 1-on-1 consultation with Principal Trademark Counsel',
      'Journal advertisement monitoring until final Certificate issuance',
    ],
  },
];

export const OBJECTION_STEPS = [
  {
    step: '01',
    title: 'Report Analysis & Grounds Identification',
    time: 'Day 1',
    desc: 'Our IP legal specialists review the Examination Report to dissect the specific grounds (Section 9, Section 11, or procedural) and extract all cited marks.',
  },
  {
    step: '02',
    title: 'Evidence Compilation & Affidavit',
    time: 'Day 1–2',
    desc: 'We assist you in gathering invoices, advertisements, website URLs, and user proofs to establish acquired distinctiveness and commercial goodwill.',
  },
  {
    step: '03',
    title: 'Drafting Point-by-Point Statutory Reply',
    time: 'Day 2',
    desc: 'Senior IP advocates draft a detailed, legally grounded reply referencing judicial precedents to prove phonetic, visual, and conceptual distinctiveness.',
  },
  {
    step: '04',
    title: 'E-Filing on IP India Portal',
    time: 'Day 3',
    desc: 'The finalized reply and evidence are submitted online on the IP India e-filing gateway, generating an official acknowledgment with the Government timestamp.',
  },
  {
    step: '05',
    title: 'Acceptance & Journal Advertisement',
    time: 'Within 2–4 Months',
    desc: 'The Examiner reviews the reply. Upon satisfaction, the mark status updates to "Accepted & Advertised" in the Trade Marks Journal for the 4-month opposition period.',
  },
];

export const OBJECTION_DOCUMENTS = [
  {
    title: 'Copy of Examination Report',
    desc: 'The official notice issued by the Trade Marks Registry specifying grounds of objection.',
  },
  {
    title: 'Trademark Application Number',
    desc: 'Official 7-digit application number generated upon filing Form TM-A.',
  },
  {
    title: 'Power of Attorney (Form 48)',
    desc: 'Signed authorization enabling BharatFiling IP advocates to represent your application before the Registrar.',
  },
  {
    title: 'Commercial Use Evidence (User Affidavit)',
    desc: 'Oldest available tax invoices, packaging labels, marketing brochures, domain registration, and social media handles showing prior use.',
  },
];

export const TRUST_STATS = [
  { value: '45,000+', label: 'Objection Replies Successfully Defended' },
  { value: '92.6%', label: 'Objection Overcome Rate without Hearing' },
  { value: '24 Hours', label: 'Emergency Reply Drafting Turnaround' },
  { value: '100% Online', label: 'Paperless Submission via IP India Gateway' },
];

export const TRUSTED_PARTNERS = [
  { name: 'Swiggy', category: 'FoodTech' },
  { name: 'CaratLane', category: 'Fine Jewelry' },
  { name: 'mCaffeine', category: 'Personal Care' },
  { name: 'Vaya', category: 'Lifestyle' },
  { name: 'CavinKare', category: 'FMCG' },
];

export const OBJECTION_FAQS = [
  {
    q: 'What is a Trademark Objection in India?',
    a: 'A Trademark Objection is an official question raised by the Trademark Examiner during the examination stage regarding the registrability of your mark under the Trade Marks Act, 1999. It is communicated through an official Examination Report outlining the statutory grounds for refusal (primarily Section 9 or Section 11).',
  },
  {
    q: 'What is the deadline to respond to a Trademark Examination Report?',
    a: 'Under the Trade Marks Rules 2017, the applicant must file a formal written response within strictly 30 days from the date of receipt/availability of the Examination Report. Failing to respond within this stipulated window causes the Trade Marks Registry to mark the application as "Abandoned".',
  },
  {
    q: 'What is the difference between Section 9 and Section 11 objections?',
    a: 'Section 9 deals with Absolute Grounds for Refusal — marks that lack distinctiveness, are purely descriptive of goods/services, or consist of generic words. Section 11 deals with Relative Grounds for Refusal — marks that conflict with an identical or deceptively similar pre-existing registered or pending trademark in the same or related class.',
  },
  {
    q: 'What happens if the Examiner is not satisfied with the written reply?',
    a: 'If the written reply does not fully resolve the Examiner’s doubts, the Registrar will issue a notice for a Show Cause Hearing. In this hearing, our appointed IP advocate appears (virtually or in person) before the Hearing Officer to present oral arguments and judicial precedents to defend the mark.',
  },
  {
    q: 'Can I draft and file a Trademark Objection reply myself?',
    a: 'While legally permissible, it is strongly discouraged. A trademark reply is a formal legal submission that must cite appropriate case laws, legal doctrines (such as the doctrine of honest concurrent use, anti-dissection rule, and commercial impression), and procedural statutes. Inadequate replies lead directly to refusal.',
  },
  {
    q: 'How can I prove acquired distinctiveness under Section 9?',
    a: 'Acquired distinctiveness is proved by demonstrating that though the mark might have descriptive elements, long and extensive usage in the Indian market has caused consumers to associate the mark exclusively with your business. This is established through a notarized User Affidavit accompanied by annual sales turnover figures, sample tax invoices dating back to first use, advertising expenses, and press mentions.',
  },
  {
    q: 'What is the government fee for filing an objection reply?',
    a: 'There is no statutory government fee for filing a standard written reply to an examination report via e-filing. You only pay the professional fee for legal research and drafting. However, if a Form TM-M is required (such as for amendments, classification rectifications, or hearing adjournments), a nominal government fee applies.',
  },
  {
    q: 'How long does the Trade Marks Registry take to review the reply?',
    a: 'After submission, the Trademark Examiner typically reviews the reply within 1 to 3 months. If accepted, the application status is updated to "Accepted & Advertised" in the Trade Marks Journal.',
  },
];
