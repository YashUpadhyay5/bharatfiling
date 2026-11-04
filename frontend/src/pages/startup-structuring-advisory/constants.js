/**
 * Constants for Startup Structuring Advisory Module
 * Venture-grade corporate legal & tax strategy for founders
 */

export const STARTUP_HERO = {
  badge: 'Legal Tech Platform Since 2010 🇮🇳',
  festiveBadge: 'Diwali Founder Scale Offer',
  title: 'Startup Structuring Advisory',
  description:
    '1-on-1 strategic advisory with senior corporate lawyers and startup CAs on entity selection, founder equity split, reverse vesting, SAFE/CCPS fundraising, DPIIT 80-IAC tax holiday, and ESOP pool creation.',
  breadCrumbs: [
    { title: 'Home', href: '/' },
    { title: 'Startup Structuring Advisory', href: '/services/startup-structuring-advisory' },
  ],
  benefits: [
    {
      id: 1,
      title: 'Venture-Grade Strategy',
      desc: 'Consult directly with corporate lawyers and CAs who have structured 1,000+ funded startups.',
    },
    {
      id: 2,
      title: 'Founder Equity & Vesting Architecture',
      desc: 'Structure bulletproof co-founder equity splits, 4-year reverse vesting with 1-year cliff, and IP assignment.',
    },
    {
      id: 3,
      title: 'Fundraising & Tax Exemption Readiness',
      desc: 'Get investment-ready with SAFE/CCPS instruments, DPIIT Startup India recognition, and 80-IAC 3-year tax holidays.',
    },
  ],
  liveStatus: {
    onlineAdvisors: '120+ Startup Advisors are online',
    ongoingSessions: '32 live founder strategy sessions',
  },
  pricingNote: {
    original: 2499,
    current: 1499,
    duration: 'for a 60-minute Strategy session',
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
    id: 'entity_selection',
    name: 'Entity Selection & Architecture',
    icon: 'Building2',
    color: '#3B82F6',
    options: [
      'Pvt Ltd vs LLP vs OPC Comparison',
      'Holding-Subsidiary Cross-Border Structure',
      'Delaware / Singapore Flip Advisory',
      'Foreign Direct Investment (FDI / FEMA) Guidelines',
      'Converting Partnership or Sole Proprietorship into Pvt Ltd',
      'Joint Venture Structuring & Special Purpose Vehicle (SPV)',
    ],
  },
  {
    id: 'founder_equity',
    name: 'Cap Table & Founder Vesting',
    icon: 'PieChart',
    color: '#10B981',
    options: [
      'Co-Founder Equity Split & Reverse Vesting (4-Yr / 1-Yr Cliff)',
      'Founder Exit: Good Leaver vs Bad Leaver Clauses',
      'Intellectual Property (IP) Assignment & Work-For-Hire Deeds',
      'Non-Compete & Non-Solicitation Covenants',
      'Anti-Dilution & Pre-Emption Rights',
      'Founder Dispute Resolution Mechanisms',
    ],
  },
  {
    id: 'dpiit_tax_holiday',
    name: 'DPIIT & Tax Exemptions',
    icon: 'Award',
    color: '#F59E0B',
    options: [
      'DPIIT Startup India Recognition Filing',
      'Section 80-IAC 3-Year 100% Tax Holiday Application',
      'Section 56(2)(viib) Angel Tax Exemption Compliance',
      'Government E-Marketplace (GeM) & Tender Fast-Tracking',
      '80% Rebate on Patent & 50% on Trademark Government Fees',
      'SIDBI Fund of Funds & State Seed Grant Advisory',
    ],
  },
  {
    id: 'fundraising_readiness',
    name: 'Seed & Angel Fundraising',
    icon: 'Rocket',
    color: '#6366F1',
    options: [
      'iSAFE / SAFE Notes Structuring & Valuation Caps',
      'Compulsorily Convertible Preference Shares (CCPS)',
      'Term Sheet Review & Redlining Tactics',
      'Shareholders Agreement (SHA) & Share Subscription (SSA)',
      'Board Rights, Reserved Matters & Veto Clauses',
      'Liquidation Preference & Drag-Along / Tag-Along Rights',
    ],
  },
  {
    id: 'esop_governance',
    name: 'ESOP Pool & Governance',
    icon: 'Users',
    color: '#EC4899',
    options: [
      'Employee Stock Option Scheme (ESOS) Policy Drafting',
      '5% to 15% ESOP Pool Creation & MCA Approvals',
      'ESOP Grant Letters, Vesting Schedule & Exercise Price',
      'Advisory Shares & Sweat Equity Allotment Rules',
      'Board of Directors Governance & Quorum Requirements',
      'Statutory Secretarial Registers & ROC Compliance Hygiene',
    ],
  },
  {
    id: 'ip_commercial_contracts',
    name: 'IP Protection & Commercial Contracts',
    icon: 'FileCheck2',
    color: '#8B5CF6',
    options: [
      'SaaS Master Service Agreement (MSA) & SLA',
      'Privacy Policy & Terms of Service under DPDP Act 2023',
      'Trademark Class Strategy & Brand Protection',
      'Technology Transfer & Software Source Code Licensing',
      'B2B Enterprise Vendor & Reseller Agreements',
      'Vendor Confidentiality & Mutual NDAs',
    ],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rohan Mehra',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'We were splitting equity between 3 co-founders. BharatFiling’s startup counsel structured a 4-year reverse vesting schedule with milestone triggers and airtight IP assignment deeds.',
    fullReview:
      'We were splitting equity between 3 co-founders. BharatFiling’s startup counsel structured a 4-year reverse vesting schedule with milestone triggers and airtight IP assignment deeds. Saved us from a potential catastrophic dispute later when one co-founder pivoted.',
  },
  {
    id: 2,
    name: 'Tanvi Shirodkar',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'Received our first angel term sheet and was confused about CCPS liquidation preference. The 60-min strategy session gave us immense clarity on reserved matters and voting covenants.',
    fullReview:
      'Received our first angel term sheet and was confused about CCPS liquidation preference. The 60-min strategy session gave us immense clarity on reserved matters and voting covenants. We negotiated much friendlier terms with our lead investor.',
  },
  {
    id: 3,
    name: 'Abhishek Nair',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face',
    shortReview:
      'BharatFiling guided us step-by-step through DPIIT recognition and Section 80-IAC tax holiday filing. Superb institutional experience and zero jargon.',
    fullReview:
      'BharatFiling guided us step-by-step through DPIIT recognition and Section 80-IAC tax holiday filing. Superb institutional experience and zero jargon. Every tech founder must do this session before incorporating.',
  },
];

export const TRUSTED_PARTNERS = [
  { name: 'Amazon Web Services (AWS Activate)', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Startup India (DPIIT Ecosystem)', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
  { name: 'Axis Bank Startup Desk', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg' },
  { name: 'GlobalLinker Venture Network', logo: 'https://d2q79iu7y44aq9.cloudfront.net/globallinker/images/gl-logo.png' },
  { name: 'Flipkart Leap', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg' },
  { name: 'Yes Bank Headstart', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'PayU Founders Hub', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/PayU_logo.svg' },
  { name: 'Tata Tele Business IoT', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg' },
];

export const WHO_CAN_USE = [
  {
    title: 'Pre-Seed & Idea-Stage Founders',
    desc: 'Choosing between Pvt Ltd vs LLP, structuring founder equity split, and setting up initial IP assignment.',
    icon: 'Rocket',
  },
  {
    title: 'Co-Founding Partnerships',
    desc: 'Setting up 4-year reverse vesting with 1-year cliff, good leaver/bad leaver clauses, and deadlock resolution.',
    icon: 'Users',
  },
  {
    title: 'Fundraise-Ready Seed Startups',
    desc: 'Preparing cap table, review of SAFE/iSAFE instruments, CCPS valuation terms, and SHA reserved matters.',
    icon: 'PieChart',
  },
  {
    title: 'Bootstrapped Scaling Companies',
    desc: 'Applying for DPIIT recognition, Section 80-IAC 3-year tax holidays, and angel tax exemption filings.',
    icon: 'Building2',
  },
  {
    title: 'High-Growth Tech Teams',
    desc: 'Creating an ESOP (Employee Stock Option Scheme) pool of 5-15% to hire top engineering leadership.',
    icon: 'Briefcase',
  },
  {
    title: 'Cross-Border & NRI Founders',
    desc: 'Evaluating Delaware/Singapore holding companies, transfer pricing, and RBI FEMA compliance for foreign capital.',
    icon: 'Globe',
  },
];

export const WHEN_TO_CONSULT = [
  'Before signing incorporation papers with co-founders without a binding equity vesting schedule',
  'Choosing whether Private Limited or LLP suits angel investment and institutional venture capital requirements',
  'Applying for DPIIT Startup India Certificate and Section 80-IAC 100% tax exemption for 3 consecutive years',
  'Negotiating an Angel, Seed, or Venture Term Sheet, SHA, or SAFE note without giving away control',
  'Creating an ESOP (Employee Stock Option Plan) pool to attract high-caliber senior engineering and sales talent',
  'Expanding into US, Singapore, or UAE markets with a cross-border holding or subsidiary structure',
  'Protecting proprietary IP, source code, and trademarks through airtight assignment and work-for-hire deeds',
  'Auditing your corporate compliance, ROC registers, and cap table hygiene before investor due diligence',
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Select Advisory Domain',
    desc: 'Choose your focus: Entity Selection, Cap Table & Vesting, DPIIT Tax Holiday, Seed Fundraising, or ESOP.',
  },
  {
    step: '02',
    title: 'Pick Convenient Date & Slot',
    desc: 'Schedule your 60-minute deep-dive strategy session with our senior corporate counsel.',
  },
  {
    step: '03',
    title: 'Matched With Startup Specialist',
    desc: 'Connected with a seasoned corporate lawyer & CA experienced in venture capital and founder structuring.',
  },
  {
    step: '04',
    title: '60-Min 1-on-1 Strategy Session',
    desc: 'Screen-share cap table models, review term sheets, evaluate tax exemptions, and stress-test governance.',
  },
  {
    step: '05',
    title: 'Customized Founder Action Memo',
    desc: 'Receive a written roadmap, term sheet redline notes, cap table calculator, and statutory filing checklist.',
  },
  {
    step: '06',
    title: 'End-to-End Execution (Optional)',
    desc: 'Transition smoothly to full incorporation, SHA drafting, or DPIIT filing with institutional discounts.',
  },
];

export const COMMUNICATION_CHANNELS = [
  {
    title: 'Video Strategy Session',
    desc: 'Screen-sharing cap tables, financial models, and term sheet redlines live with your advisor.',
    icon: 'Video',
  },
  {
    title: 'Document & Term Sheet Review',
    desc: 'Detailed line-by-line scrutiny of founder agreements, SAFE notes, or venture term sheets.',
    icon: 'FileCheck2',
  },
  {
    title: 'Direct Phone Advisory',
    desc: 'Fast, high-level strategic alignment for urgent fundraising decisions and angel calls.',
    icon: 'PhoneCall',
  },
  {
    title: 'Priority Founder WhatsApp Desk',
    desc: 'Dedicated channel for appointment logistics, follow-up queries, and document checklist dispatch.',
    icon: 'MessageSquare',
  },
];

export const CONSULTATION_PLANS = [
  {
    id: 'starter',
    name: 'Essential Structuring Advisory',
    badge: 'Most Popular for Early Founders',
    price: 1499,
    originalPrice: 2499,
    discount: '40% off',
    duration: '60-minute deep-dive session',
    features: [
      '60-minute one-to-one video session with Senior Startup Counsel',
      'Entity architecture review: Pvt Ltd vs LLP vs OPC analysis',
      'Founder equity split & 4-year reverse vesting framework',
      'DPIIT Startup India & 80-IAC tax holiday eligibility check',
      'Written Founder Action Memo delivered within 24 hours',
    ],
    cta: 'Book Essential Advisory',
    popular: true,
  },
  {
    id: 'standard',
    name: 'Investment-Ready Advisory + Term Sheet Review',
    badge: 'For Fundraise-Ready Teams',
    price: 2999,
    originalPrice: 4999,
    discount: '40% off',
    duration: '90-minute strategy session',
    features: [
      '90-minute live session with Senior Venture Capital Counsel',
      'Detailed redlining of 1 Term Sheet, SHA, or iSAFE note draft',
      'Cap table dilution modeling across Seed & Series A rounds',
      'ESOP pool (10%) policy structuring & grant letter template',
      'Direct WhatsApp follow-up support for 7 days post-call',
    ],
    cta: 'Book Investment-Ready Call',
    popular: false,
  },
  {
    id: 'elite',
    name: 'Full Founder Institutional Retainer',
    badge: 'Enterprise Advisory',
    price: 6999,
    originalPrice: 12999,
    discount: '46% off',
    duration: 'Full Month Retainer (120 Mins)',
    features: [
      'Comprehensive co-founder agreement drafting & execution',
      'Full corporate secretarial diligence & ROC compliance audit',
      'Cross-border structuring advisory (US/Delaware/Singapore)',
      'Formal Venture Counsel Legal Opinion Letter',
      'Dedicated startup relationship partner & priority line',
    ],
    cta: 'Book Founder Retainer',
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
    question: 'What is Startup Structuring Advisory?',
    answer:
      'Startup Structuring Advisory is a specialized 1-on-1 strategy service where founders consult directly with corporate lawyers and venture capital CAs. It covers entity selection (Pvt Ltd vs LLP), founder equity distribution, 4-year reverse vesting schedules, SAFE/CCPS fundraising mechanics, DPIIT Startup India recognition, Section 80-IAC tax exemptions, and ESOP pool governance.',
  },
  {
    question: 'Why should I do structuring before incorporating my company?',
    answer:
      'Fixing corporate mistakes later is 10x more expensive. Structuring beforehand ensures you have proper founder reverse vesting (so a departing co-founder cannot walk away with half the company), clear IP assignment to the entity, and a capital structure that angel investors and VCs will readily accept.',
  },
  {
    question: 'How does founder reverse vesting work in India?',
    answer:
      'Standard venture-grade reverse vesting spans 4 years with a 1-year cliff. If a co-founder leaves within the first 12 months, they forfeit 100% of their equity. After year 1, equity vests monthly or quarterly at 25% per year. Unvested shares can be clawed back at face value by the company or remaining co-founders.',
  },
  {
    question: 'What is the Section 80-IAC 3-Year Tax Holiday and can my startup qualify?',
    answer:
      'Under Section 80-IAC of the Income Tax Act, recognized startups incorporated on or after April 1, 2016, can apply for 100% income tax exemption on profits for 3 consecutive financial years out of their first 10 years. Our advisors evaluate your innovative model and draft the required IMB (Inter-Ministerial Board) application.',
  },
  {
    question: 'Should I incorporate as a Private Limited Company or an LLP?',
    answer:
      'If you plan to raise venture capital, issue ESOPs to employees, or accept foreign investment via equity/CCPS, a Private Limited Company is non-negotiable. If you are building a bootstrapped, profitable agency or service firm with no plans to raise institutional equity, an LLP offers lower annual compliance overhead.',
  },
  {
    question: 'What instruments are best for early-stage angel fundraising in India?',
    answer:
      'Most Indian early-stage angel rounds are conducted via Compulsorily Convertible Preference Shares (CCPS) or iSAFE (India-compliant Simple Agreement for Future Equity) notes. Our advisors review the terms, valuation caps, discount rates, and conversion triggers to ensure founders retain board control.',
  },
  {
    question: 'How do I create an ESOP pool and what is the standard size?',
    answer:
      'Most seed-stage startups create an ESOP pool of 10% to 15% of the total post-money cap table. Our advisors guide you through the ESOS policy creation, Board & shareholder special resolutions, ROC filing of MGT-14, and the drafting of employee grant letters with custom vesting cliffs.',
  },
  {
    question: 'Can you help review our investor term sheet or SHA?',
    answer:
      'Yes. Our Senior Venture Capital advisory includes redlining term sheets and Shareholders Agreements (SHA). We identify hazardous clauses such as broad veto rights, onerous liquidation preferences, unlimited founder indemnities, and overly restrictive non-compete terms.',
  },
  {
    question: 'What is the consultation fee and what does it include?',
    answer:
      'The Essential Structuring Advisory is priced at ₹1,499 (inclusive of GST) for a comprehensive 60-minute strategy session. It includes a tailored Founder Action Memo, cap table calculator, and a statutory filing roadmap.',
  },
  {
    question: 'Can you advise on Delaware or Singapore holding company flips?',
    answer:
      'Yes. For startups targeting global venture capital (Y Combinator, Techstars, US angels), we advise on the legal and tax feasibility of cross-border holding companies, RBI ODI/FDI guidelines, round-tripping rules, and transfer pricing implications.',
  },
  {
    question: 'What documents should I share before the session?',
    answer:
      'You may upload or share your draft cap table, pitch deck summary, term sheet (if any), existing partnership deed, or list of founder equity questions. Our advisor will review them in advance to maximize consultation value.',
  },
  {
    question: 'What happens after the consultation if I want to execute incorporation or agreements?',
    answer:
      'You can seamlessly commission BharatFiling to draft your Co-founder Agreement, incorporate your Private Limited company, set up your ESOP pool, or file for DPIIT recognition. The consultation fee is fully credited toward subsequent execution packages.',
  },
];
