/**
 * Constants for Online CA Consultation Module
 * 1:1 Parity with Vakilsearch / Zolvit (https://vakilsearch.com/chartered-accountant-services)
 */

export const CA_HERO = {
  badge: 'Legal Tech Platform Since 2010 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Online CA Consultation',
  description:
    'Get online CA consultation for tax and ITR filing, with expert guidance on income tax, GST, accounting and financial compliance for individuals and businesses.',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'Talk To A Chartered Accountant', href: '/services/ca-consultation' },
  ],
  benefits: [
    {
      id: 1,
      title: 'Personalised CA Guidance',
      desc: 'Get expert guidance from a verified Chartered Accountant without visiting an office. T&C*',
    },
    {
      id: 2,
      title: 'Complete CA Services',
      desc: 'Get support for ITR filing, GST, accounting, TDS, tax notices, capital gains, and compliance.',
    },
    {
      id: 3,
      title: 'Clear Next Steps',
      desc: 'Understand your tax position, required documents, available options, and what to do next.',
    },
  ],
  liveStatus: {
    onlineCAs: '181+ CAs are online',
    ongoingCalls: '39 live ongoing calls',
  },
  pricingNote: {
    original: 799,
    current: 499,
    duration: 'for a 30-minute CA consultation',
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
    id: 'business_consultation',
    name: 'Business Consultation',
    icon: 'Building2',
    color: '#3B82F6',
    options: [
      'Business Structure Consultation',
      'Business Registration & Licenses',
      'Business Planning & Market Analysis',
      'Financial Planning & Reporting',
      'Pitch Deck & Fundraising',
      'Business Closure',
    ],
  },
  {
    id: 'accounting_taxation',
    name: 'Accounting & Taxation',
    icon: 'Calculator',
    color: '#10B981',
    options: [
      'Accounting & Bookkeeping',
      'Auditing',
      'Tax Advisory',
      'Transfer Pricing (Opinion & Audit Report)',
      'Tax on Property Purchase and Sale',
      'Registered Property Valuation Certificate',
      'GST Audit Report GSTR 9 & 9C',
      'GST Input Tax Credit',
      'GST Notices - (Manufacturing / Trading / IT)',
      'GST Refund / Export Oriented Refund',
      'International Taxation & FEMA',
      'NRI Taxation',
      'Tax on Consultancy and Freelancing Income',
      'NGO Taxation',
      'Capital Gains Tax',
    ],
  },
  {
    id: 'income_tax_returns',
    name: 'Income Tax Returns',
    icon: 'FileText',
    color: '#6366F1',
    options: [
      'Tax Planning & Advisory',
      'Income Tax Returns - Individual',
      'Income Tax Returns - Company',
      'Income Tax Returns - NGO, Sec 8, Trust',
      'Income Tax Returns - Freelancer',
      'Income Tax Notices under Sec 133(6), 142(1), 143(1), 147, 148',
      'Income Tax Returns - NRI',
      'Foreign Remittance Income',
      'Belated ITR',
      'ITR for Tenders',
    ],
  },
  {
    id: 'ca_certification',
    name: 'CA Certification / Reports',
    icon: 'Award',
    color: '#F59E0B',
    options: [
      'Net worth Certificate',
      'Valuation Certificate',
      'Tax Audit Report',
      'Statutory Audit Report',
      'Provisional Balance Sheet & Profit and Loss Account Statement',
      'Projection for Bank Loan / ODCC',
      'Utilization Certificate',
      'Creditworthiness Report',
      'ROC Filings',
      'Foreign Transaction Advisory',
      'Form 15CA / 15CB',
      'IPO Listing Consultation & Proceedings',
      'Forensic Audit',
      'Audited Financial Statements',
      'Annual Performance Report (APR)',
      'Business Due Diligence',
      'Others',
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Dhivya Kumar',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'I wanted to consult a CA for my small business and BharatFiling’s online CA service was exceptional. They were knowledgeable and helped me navigate the complexities of accounting and tax compliance with ease.',
    fullReview:
      'I wanted to consult a CA for my small business and BharatFiling’s online CA service was exceptional. They were knowledgeable and helped me navigate the complexities of accounting and tax compliance with ease. Within 30 minutes, I had a clear tax reduction roadmap and document checklist.',
  },
  {
    id: 2,
    name: 'Devarsh',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'I had a great experience working with BharatFiling’s online CA service. Their team was professional and provided me with clear next steps for my tax planning and notice reply.',
    fullReview:
      'I had a great experience working with BharatFiling’s online CA service. Their team was professional and provided me with clear next steps for my tax planning and notice reply. The CA explained the sections of the IT act in simple terms and drafted our response on the same day.',
  },
  {
    id: 3,
    name: 'Pintu Hegde',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'BharatFiling’s online CA service was a lifesaver for me. Their team helped me file my taxes on time and provided expert advice for capital gains.',
    fullReview:
      'BharatFiling’s online CA service was a lifesaver for me. Their team helped me file my taxes on time and provided expert advice for capital gains on mutual fund switches and stock trading. Highly transparent pricing and super responsive experts.',
  },
];

export const TRUSTED_PARTNERS = [
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Axis Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg' },
  { name: 'GlobalLinker', logo: 'https://d2q79iu7y44aq9.cloudfront.net/globallinker/images/gl-logo.png' },
  { name: 'Flipkart', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg' },
  { name: 'Yes Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'PayU', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/PayU_logo.svg' },
  { name: 'Payoneer', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Payoneer_logo.svg' },
  { name: 'E-Cell IIT Bombay', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
  { name: 'Tata Tele Business', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg' },
];

export const WHO_CAN_USE = [
  {
    title: 'Individuals',
    desc: 'Personal tax planning, ITR filing, capital gains calculation, property sale tax, and tax notice support.',
    icon: 'User',
  },
  {
    title: 'Salaried Employees',
    desc: 'Salary income optimization, Form 16 verification, chapter VI-A deductions, HRA exemption, and multiple employer tax returns.',
    icon: 'Briefcase',
  },
  {
    title: 'Freelancers & Professionals',
    desc: 'Presumptive tax under 44ADA, professional receipt records, expense deductions, advance tax computation, and GST applicability.',
    icon: 'Laptop',
  },
  {
    title: 'Startups & Businesses',
    desc: 'Entity structuring, bookkeeping setup, GST compliance, TDS deduction, corporate income tax, and pitch deck financial modeling.',
    icon: 'Rocket',
  },
  {
    title: 'Corporates',
    desc: 'Statutory compliance, transfer pricing documentation, internal audit coordination, FEMA guidelines, and board financial reports.',
    icon: 'Building2',
  },
  {
    title: 'NRIs',
    desc: 'Indian sourced income, residential status determination, NRE/NRO accounts taxation, 15CA/15CB certificates, and DTAA double tax relief.',
    icon: 'Globe',
  },
];

export const WHEN_TO_CONSULT = [
  'Filing an ITR for the first time or choosing between old vs. new tax regimes',
  'Reporting income from salary, freelance gigs, business contracts, rental properties, or foreign assets',
  'Computing complex capital gains from equities, derivatives (F&O), mutual funds, cryptocurrencies, or real estate',
  'Responding to Income Tax notices under Section 133(6), 142(1), 143(1), 148, or GST show-cause notices',
  'Registering for GST or understanding monthly GSTR-1 & GSTR-3B return obligations',
  'Managing TDS deductions, advance tax instalments, belated returns, or updated returns (ITR-U)',
  'Setting up clean double-entry bookkeeping, ledger reconciliation, and business accounting systems',
  'Getting an independent second opinion on tax liability calculations or auditor recommendations',
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Choose Your Consultation',
    desc: 'Select your preferred CA consultation slot, language, and specific financial problem category.',
  },
  {
    step: '02',
    title: 'Tell Us What You Need',
    desc: 'Share your tax, ITR, GST, accounting, TDS, or business query along with optional relevant documents.',
  },
  {
    step: '03',
    title: 'Connect With a Verified CA',
    desc: 'Engage in a 30-minute one-to-one phone or video consultation with an ICAI-registered Chartered Accountant.',
  },
  {
    step: '04',
    title: 'Review Documents & Calculations',
    desc: 'The CA analyzes your Form 16, bank statements, P&L, AIS/TIS, or notice letters live on call.',
  },
  {
    step: '05',
    title: 'Get Written Actionable Advice',
    desc: 'Receive a structured summary of advice, document checklist, and recommended next steps via email and WhatsApp.',
  },
  {
    step: '06',
    title: 'Proceed With Execution (Optional)',
    desc: 'Seamlessly transition from consultation to end-to-end filing or notice drafting with zero friction.',
  },
];

export const COMMUNICATION_CHANNELS = [
  {
    title: 'Phone Consultation',
    desc: 'Suitable for direct questions, rapid assessment, and time-sensitive tax clarifications.',
    icon: 'PhoneCall',
  },
  {
    title: 'Video Consultation',
    desc: 'Useful when screensharing documents, balance sheets, computation excel sheets, or complex transactions.',
    icon: 'Video',
  },
  {
    title: 'Chat & WhatsApp Assistance',
    desc: 'Suitable for structured question-and-answer, sharing document checklists, and quick follow-ups.',
    icon: 'MessageSquare',
  },
  {
    title: 'Document-Based Review',
    desc: 'In-depth assessment of tax notices, audit reports, Form 15CB, or past return acknowledgments.',
    icon: 'FileCheck2',
  },
];

export const CONSULTATION_PLANS = [
  {
    id: 'starter',
    name: 'Basic CA Consultation',
    badge: '',
    price: 499,
    originalPrice: 799,
    discount: '38% off',
    duration: '30-minute live session',
    features: [
      '30-minute one-to-one phone or video consultation',
      'Assigned verified Chartered Accountant (ICAI member)',
      'Review of personal tax, ITR, or single business query',
      'Guidance on deductions, exemptions & regime choice',
      'Written summary of advice delivered via email',
    ],
    cta: 'Book Basic Call',
    popular: false,
  },
  {
    id: 'standard',
    name: 'Senior CA Consultation + Document Review',
    badge: 'Most Popular',
    price: 999,
    originalPrice: 1999,
    discount: '50% off',
    duration: '45-minute deep-dive session',
    features: [
      '45-minute live consultation with Senior CA (8+ yrs experience)',
      'In-depth review of Form 16, AIS/TIS, 26AS, or Tax Notice',
      'Capital gains computation & deduction optimization',
      'Step-by-step action plan for notice response / filing',
      'Post-call WhatsApp support for 48 hours for clarifications',
    ],
    cta: 'Book Senior CA',
    popular: true,
  },
  {
    id: 'elite',
    name: 'Comprehensive Business & Corporate Retainer',
    badge: 'Enterprise Advisory',
    price: 2499,
    originalPrice: 4999,
    discount: '50% off',
    duration: '60-minute strategy session',
    features: [
      '60-minute strategic advisory with Senior Partner CA',
      'Full business P&L, balance sheet, and GST audit analysis',
      'Structuring advisory for startups, fundraising & foreign transactions',
      'Formal written Chartered Accountant opinion letter',
      'Direct priority hotline & dedicated CA account manager',
    ],
    cta: 'Book Business Advisory',
    popular: false,
  },
];

export const FAQS = [
  {
    question: 'What are online CA services?',
    answer:
      'Online CA services let you consult a Chartered Accountant remotely for tax, ITR filing, GST, accounting, TDS, compliance, and related financial matters. Consultations take place over phone, video, chat, or secure document review. The exact scope, documents needed, and any additional charges depend on your specific requirement and the engagement agreed with the CA.',
  },
  {
    question: 'How can I talk to a CA online?',
    answer:
      "You can book an online consultation directly through BharatFiling by selecting your problem type, language, and contact details. Once booked, you'll be connected through phone or video call, and you can share relevant documents so the CA can review them before or during the consultation.",
  },
  {
    question: 'Can I consult a CA without visiting an office?',
    answer:
      'Yes, over 95% of consultations and filings can be handled entirely online, from initial advisory and computation through to final electronic filing with the Income Tax Department or MCA. Physical visits are only required in rare cases like statutory physical stock audits or localized tribunal hearings.',
  },
  {
    question: 'Is online CA consultation reliable and secure?',
    answer:
      "All Chartered Accountants on BharatFiling are verified members of the Institute of Chartered Accountants of India (ICAI) with verified COP/membership numbers. All document uploads and consultations are encrypted with bank-grade 256-bit SSL encryption under strict non-disclosure obligations.",
  },
  {
    question: 'What can an online CA help me with?',
    answer:
      'An online CA can help with ITR filing, tax planning, GST registration and returns, TDS compliance, accounting, capital gains calculations, income-tax notices (such as under sections 133(6), 142(1), 143(1), 148), financial reporting, valuation certificates, and corporate advisory.',
  },
  {
    question: 'How much does an online CA consultation cost?',
    answer:
      'A standard 30-minute online CA consultation is currently offered at a promotional rate of ₹499 (regularly ₹799). Extended senior CA sessions with document and notice reviews are available at ₹999.',
  },
  {
    question: 'What documents should I prepare before talking to a CA?',
    answer:
      'Documents vary by requirement but commonly include PAN card, Form 16/16A, bank statements, investment proofs (80C, 80D, NPS), capital gains statements from brokers, previous ITR acknowledgements, and copies of any tax or GST notice received.',
  },
  {
    question: 'Can I get a second opinion from a CA?',
    answer:
      'Yes, our CAs frequently provide objective second opinions on complex tax liabilities, capital gain computations, business restructurings, or existing notice replies prepared by another advisor to ensure you do not miss critical deductions or legal safeguards.',
  },
  {
    question: 'Can a CA file my ITR online after the consultation?',
    answer:
      'Yes, once your consultation is complete, you can seamlessly request the CA team to prepare and file your return directly on the Income Tax portal, ensuring error-free filing and maximum tax refund optimization.',
  },
  {
    question: 'Can a CA help with an Income Tax or GST notice?',
    answer:
      'Yes, our CAs specialize in scrutinizing notices issued under Sections 133(6), 142(1), 143(1), 147, and 148 of the Income Tax Act, as well as GST DRC-01 show cause notices. We help reconcile the discrepancies, draft robust legal responses, and submit them online.',
  },
  {
    question: 'Can an online CA help with NRI taxation and Form 15CA/15CB?',
    answer:
      'Yes, our experts assist Non-Resident Indians (NRIs) with Indian income tax filing, capital gains on property sale, repatriation of funds abroad, DTAA benefits, and certification of foreign remittances via Form 15CA and Form 15CB.',
  },
  {
    question: 'How do I verify the credentials of the assigned Chartered Accountant?',
    answer:
      'Every practicing Chartered Accountant is allotted a unique Membership Number by the Institute of Chartered Accountants of India (ICAI). You can verify this number directly on the official ICAI member portal (icai.org).',
  },
];
