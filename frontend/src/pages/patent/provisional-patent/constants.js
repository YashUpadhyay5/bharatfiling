/**
 * Provisional Patent Application - Statutory Constants & Content
 * Reference: Indian Patents Act, 1970 (Section 9) & Patents Rules, 2003 (as amended)
 * Platform: BharatFiling / Vakilsearch 1:1 Parity
 */

export const PROVISIONAL_PATENT_HERO = {
  breadcrumb: 'Home > provisional patent',
  isoBadge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  title: 'Provisional Patent Application – Secure Priority Today',
  bullets: [
    'Protect your invention with expert led online provisional patent registration service.',
    'Get fast filing within 14 days, handled by experienced and registered patent agents.',
    'Secure, accurate, and 100% expert-led patent process from application to approval.',
  ],
  videoText: 'Know about Provisional Patent in 60 seconds',
};

export const PROVISIONAL_PATENT_TESTIMONIALS = [
  {
    id: 1,
    quote: 'Game-changing, seamless patent registration with expert guid IP protection.',
    author: 'Adetee Agarwaal',
    title: 'Founder, InnoMed Devices',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    rating: 5,
  },
  {
    id: 2,
    quote: 'Filing our provisional specification took just 6 days. BharatFiling locked our priority date before our international robotics exhibition!',
    author: 'Dr. Rajesh Nair',
    title: 'CTO, AeroTech Propulsion Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    rating: 5,
  },
  {
    id: 3,
    quote: 'Our patent agent guided us precisely on drafting Form 1 and Form 2 without premature disclosure. Outstanding legal precision.',
    author: 'Priya Sundaram',
    title: 'Director, CleanEnergy Bio Pvt Ltd',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
    rating: 5,
  },
];

export const TRUSTED_PARTNERS = [
  { name: 'Swiggy', color: '#FC8019' },
  { name: 'CaratLane', color: '#5C2D91' },
  { name: 'BigBasket', color: '#84C225' },
  { name: 'HDFC Bank', color: '#004C8F' },
  { name: 'Xiaomi', color: '#FF6900' },
  { name: 'Apollo Hospitals', color: '#00838F' },
];

export const STATUTORY_HIGHLIGHTS = [
  {
    label: 'Statutory Act',
    value: 'The Patents Act, 1970',
    subtext: 'Section 9 • Provisional Specification',
  },
  {
    label: 'Runway Period',
    value: '12 Months Window',
    subtext: 'To file Complete Specification Form 2',
  },
  {
    label: 'Priority Protection',
    value: 'First-to-File Advantage',
    subtext: 'Legal timestamp against competitor filings',
  },
  {
    label: 'Statutory Rebate',
    value: '80% MSME Subsidy',
    subtext: 'For DPIIT Startups & Individual Inventors',
  },
];

export const KEY_BENEFITS = [
  {
    id: 'priority_date',
    title: '1. Secures Early Priority Date',
    description:
      'India follows the strict "first-to-file" rule. Submitting a provisional specification locks in your official priority date, ensuring later rival filings cannot claim prior inventorship.',
    statutoryRef: 'Section 9(1) of Patents Act, 1970',
    badge: 'Legal Priority',
  },
  {
    id: 'development_runway',
    title: '2. 12-Month Development Runway',
    description:
      'Gives you exactly 12 months from the date of filing to refine prototypes, gather laboratory test results, assess product-market fit, and finalize industrial claims.',
    statutoryRef: 'Rule 13(1) of Patent Rules, 2003',
    badge: '12-Month Window',
  },
  {
    id: 'patent_pending',
    title: '3. "Patent Pending" Commercial Status',
    description:
      'Immediately obtain the legal entitlement to tag your product, brochure, or website as "Patent Pending", deterring copycats and boosting commercial credibility.',
    statutoryRef: 'Public IP Notice Protections',
    badge: 'Market Deterrent',
  },
  {
    id: 'cost_effective',
    title: '4. Cost-Efficient IP Protection',
    description:
      'Significantly lower initial documentation and drafting costs compared to a full non-provisional filing, allowing early-stage bootstrapped innovators to preserve cash.',
    statutoryRef: 'First Schedule IPO Fee Structure',
    badge: 'Budget Friendly',
  },
  {
    id: 'investor_readiness',
    title: '5. Safe Investor Pitching & Public Demo',
    description:
      'Pitch to angel investors, venture funds, and attend trade exhibitions freely without fear of public disclosure forfeiting your future worldwide patent rights.',
    statutoryRef: 'Section 31 & 32 Public Display Shield',
    badge: 'Safe Pitching',
  },
  {
    id: 'pct_readiness',
    title: '6. International PCT Priority Base',
    description:
      'Serves as the foundational priority document to claim priority in over 150 countries under the Paris Convention or Patent Cooperation Treaty (PCT).',
    statutoryRef: 'Paris Convention Article 4',
    badge: 'Global Priority',
  },
];

export const PROVISIONAL_VS_COMPLETE = [
  {
    feature: 'Statutory Basis',
    provisional: 'Section 9(1), The Patents Act, 1970',
    complete: 'Section 9(2) & Section 10, The Patents Act, 1970',
  },
  {
    feature: 'Filing Stage',
    provisional: 'Idea, prototype, or R&D development stage',
    complete: 'Finalized, tested invention ready for commercialization',
  },
  {
    feature: 'Patent Claims (Form 2)',
    provisional: 'Not mandatory; outlines core inventive concept',
    complete: 'Mandatory; defines exact legal boundaries of monopoly',
  },
  {
    feature: 'Detailed Drawings',
    provisional: 'Preliminary diagrams or block schematics suffice',
    complete: 'Formal CAD / standardized patent technical drawings',
  },
  {
    feature: 'Lifespan / Validity',
    provisional: '12 months from filing (non-extendable by law)',
    complete: '20 years from priority/filing date upon grant',
  },
  {
    feature: 'Commercial Tag',
    provisional: '"Patent Pending" / "Patent Applied For"',
    complete: '"Patented" (after grant & registration certificate)',
  },
  {
    feature: 'Examination Process',
    provisional: 'No examination conducted; application recorded',
    complete: 'Examined under Section 11B upon filing Form 18 (FER)',
  },
];

export const STATUTORY_FORMS_CHECKLIST = [
  {
    form: 'Form 1',
    title: 'Application for Grant of Patent',
    description:
      'Contains particulars of inventor(s), applicant(s), declaration of inventorship, and undertaking under Section 8.',
    mandatory: true,
  },
  {
    form: 'Form 2',
    title: 'Provisional Specification',
    description:
      'Describes the nature of the invention, its background, objects, and broad working principles without formal legal claims.',
    mandatory: true,
  },
  {
    form: 'Form 3',
    title: 'Statement & Undertaking (Foreign Filings)',
    description:
      'Undertaking under Section 8 regarding corresponding patent filings made or contemplated in foreign jurisdictions.',
    mandatory: true,
  },
  {
    form: 'Form 5',
    title: 'Declaration as to Inventorship',
    description:
      'Statutory declaration identifying the true and first inventors of the disclosed technical subject matter.',
    mandatory: true,
  },
  {
    form: 'Form 26',
    title: 'Power of Attorney / Authorization',
    description:
      'Authorizes registered patent agents and IP attorneys to represent the applicant before the Indian Patent Office.',
    mandatory: true,
  },
  {
    form: 'Form 28',
    title: 'MSME / DPIIT Startup Declaration',
    description:
      'Accompanied by Udyam Registration or DPIIT certificate to claim an 80% statutory government fee rebate.',
    mandatory: false,
  },
];

export const FILING_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Invention Disclosure & Novelty Assessment',
    timeline: 'Days 1–3',
    desc: 'You submit your technical invention note under strict Non-Disclosure Agreement (NDA). Our patent analysts verify patentability against Section 3 and Section 4 exclusions.',
  },
  {
    step: '02',
    title: 'Provisional Specification Drafting (Form 2)',
    timeline: 'Days 4–7',
    desc: 'A registered patent agent drafts your provisional specification, crafting an expansive technical description to ensure maximum claim support for your future complete filing.',
  },
  {
    step: '03',
    title: 'Applicant Review & Form Finalization',
    timeline: 'Days 8–10',
    desc: 'We share the draft specification and statutory forms (Form 1, 3, 5, 26) with you for feedback and electronic authorization.',
  },
  {
    step: '04',
    title: 'Online Filing at IPO & Priority Receipt',
    timeline: 'Days 11–14',
    desc: 'Your application is formally filed on the official IP India portal. You receive an official Application Number, Filing Date, and CBR priority receipt immediately.',
  },
];

export const PRICING_PACKAGES = [
  {
    id: 'consultation',
    name: '15-Min Attorney Consultation',
    badge: 'Popular for Quick Clarity',
    popular: false,
    strikePrice: 999,
    price: 499,
    savingsText: 'Save ₹500 today',
    description:
      'Speak 1-on-1 with a senior registered patent agent to evaluate your idea’s patentability and determine provisional strategy.',
    features: [
      '15-minute phone/video consultation',
      'Section 3 patentability viability check',
      'Guidance on Form 1 & Form 2 drafting',
      '100% fee credited against full patent filing',
    ],
    ctaText: 'Book Consultation (₹499)',
  },
  {
    id: 'standard',
    name: 'Startup / Individual Provisional',
    badge: 'Most Popular',
    popular: true,
    strikePrice: 11999,
    price: 7999,
    savingsText: 'Diwali Offer • Save ₹4,000',
    description:
      'End-to-end provisional patent drafting and filing for individual inventors, DPIIT recognized startups, and MSMEs.',
    features: [
      'Preliminary prior-art novelty assessment',
      'Form 2 provisional specification drafting',
      'Preparation of statutory Forms 1, 3, 5, & 26',
      'Official e-filing on IP India portal',
      'Instant Cash Book Receipt (CBR) with Priority Date',
      '12-month reminder alerts for complete filing',
      'Statutory government fee separate (₹1,600 for individuals)',
    ],
    ctaText: 'File Provisional Patent (₹7,999)',
  },
  {
    id: 'enterprise',
    name: 'Enterprise / Corporate Provisional',
    badge: 'Comprehensive R&D Filing',
    popular: false,
    strikePrice: 19999,
    price: 12999,
    savingsText: 'Save ₹7,000',
    description:
      'Extensive multi-embodiment provisional specification for corporates, universities, and high-tech R&D institutions.',
    features: [
      'Deep patent landscape & novelty search report',
      'Multi-embodiment Form 2 specification drafting',
      'Technical drawings & block diagram drafting',
      'Dedicated Senior Patent Attorney management',
      'PCT & Paris Convention international priority roadmap',
      'Government fee separate (₹8,000 for large entities)',
    ],
    ctaText: 'Choose Enterprise Plan (₹12,999)',
  },
];

export const FAQS = [
  {
    q: 'What is a Provisional Patent Application?',
    a: 'A provisional patent application is an initial legal document filed with the Indian Patent Office under Section 9 of the Patents Act, 1970. It enables inventors to secure an early official filing date (priority date) before the invention is finalized into a complete technical layout with claims.',
  },
  {
    q: 'What is the validity period of a provisional patent application in India?',
    a: 'A provisional patent application is valid for exactly 12 months from the date of filing. Within this 12-month period, you must file a Complete Specification under Section 9(2). If a complete specification is not filed within 12 months, the provisional application is deemed abandoned by statutory law.',
  },
  {
    q: 'Do I need to include patent claims in a provisional application?',
    a: 'No. Patent claims are not mandatory in a provisional specification (Form 2). The provisional specification must clearly describe the invention, its background, components, and method of operation so that it provides an adequate written description to support future claims in the complete filing.',
  },
  {
    q: 'Can I legally use the term "Patent Pending" after filing a provisional application?',
    a: 'Yes! As soon as your provisional application is filed and you receive the official Cash Book Receipt (CBR) with the Patent Application Number and timestamp from the Patent Office, you are legally entitled to display "Patent Pending" or "Patent Applied For" on your products, marketing collateral, and investor pitch decks.',
  },
  {
    q: 'Can I publicly disclose or pitch my invention after filing a provisional patent?',
    a: 'Yes. Once your provisional application is filed, your priority date is secured. You can safely present your invention to investors, enter commercial negotiations, showcase prototypes at trade expos, and pitch for grants without risking loss of novelty.',
  },
  {
    q: 'What documents are required to file a provisional patent in India?',
    a: 'The key documents include Form 1 (Application for Grant), Form 2 (Provisional Specification), Form 3 (Statement & Undertaking under Section 8), Form 5 (Declaration of Inventorship), Form 26 (Power of Attorney), identity and address proof of the applicant, and (if applicable) Udyam/DPIIT certificate for fee rebates.',
  },
  {
    q: 'What is the government statutory fee for filing a provisional patent?',
    a: 'For an individual inventor, natural person, DPIIT-recognized startup, or MSME/small entity, the government filing fee is ₹1,600 (e-filing). For large entities / other companies, the statutory government fee is ₹8,000.',
  },
  {
    q: 'Can I add new subject matter to the complete specification later?',
    a: 'You can elaborate and develop the invention in the complete specification, but entirely new inventive concepts not disclosed in the provisional application may not enjoy the earlier provisional priority date. That is why our patent agents draft your provisional specification with broad embodiments.',
  },
  {
    q: 'How fast can BharatFiling file my provisional patent application?',
    a: 'Our registered patent agents can prepare and file your provisional patent application within 6 to 14 working days. We also offer fast-track 48-hour filing for urgent exhibition or disclosure deadlines.',
  },
  {
    q: 'Can a provisional application be filed internationally or under PCT?',
    a: 'A provisional application filed in India acts as a valid priority application under the Paris Convention. Within 12 months of filing your Indian provisional application, you can file an international PCT application or convention applications in foreign countries claiming priority from your Indian provisional date.',
  },
];
