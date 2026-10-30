/**
 * Patent Registration in India - Statutory Constants & Content
 * Reference: Indian Patents Act, 1970 & Patents Rules, 2003 (Amended)
 * Platform: BharatFiling / Vakilsearch 1:1 Parity
 */

export const PATENT_REVIEWER_DATA = {
  reviewerName: 'Lakshita Arya',
  reviewerTitle: 'Trademark and IP Law Expert',
  lastUpdated: 'Sep 18 2026, 04:45 PM',
  reviewSummary:
    'Get expert assistance with patent registration in India through Vakilsearch. Our professionals help you assess patentability, prepare the required documents, file your patent application online, and guide you through examination, objections, and the registration process.',
};

export const PATENT_HERO_BULLETS = [
  {
    title: 'Check Your Patentability:',
    desc: 'with expert guidance to assess your invention and understand the best way to protect it.',
  },
  {
    title: 'Get Your Patent:',
    desc: 'Application Ready with support for drafting specifications, claims, forms, drawings, and other filing requirements.',
  },
  {
    title: 'Get End-to-End Patent:',
    desc: 'Support from online filing and examination to handling objections, hearings, and the grant process.',
  },
];

export const PATENT_STATUTORY_HIGHLIGHTS = [
  {
    label: 'Statutory Act',
    value: 'The Patents Act, 1970',
    subtext: 'Patents Rules, 2003 (as amended)',
  },
  {
    label: 'Protection Term',
    value: '20 Years',
    subtext: 'From filing/priority date nationwide',
  },
  {
    label: 'Filing Authority',
    value: 'CGPDTM (Indian Patent Office)',
    subtext: 'Delhi, Mumbai, Chennai, Kolkata branches',
  },
  {
    label: 'Startup Fee Rebate',
    value: '80% Statutory Subsidy',
    subtext: 'DPIIT recognized startups & MSMEs',
  },
];

export const PATENTABILITY_CRITERIA = [
  {
    id: 'novelty',
    title: '1. Novelty (New Invention)',
    section: 'Section 2(1)(l)',
    description:
      'The matter disclosed in the specification must not have been published in India or elsewhere, nor anticipated by prior art or public knowledge before the filing date.',
    badge: 'Mandatory',
  },
  {
    id: 'inventive_step',
    title: '2. Inventive Step (Non-Obviousness)',
    section: 'Section 2(1)(ja)',
    description:
      'A feature of an invention that involves technical advance compared to existing knowledge or having economic significance, making it non-obvious to a person skilled in the art.',
    badge: 'Technical Advance',
  },
  {
    id: 'industrial_applicability',
    title: '3. Industrial Applicability',
    section: 'Section 2(1)(ac)',
    description:
      'The invention must be capable of being made or used in an industry, having practical utility beyond theoretical or abstract concepts.',
    badge: 'Commercial Utility',
  },
  {
    id: 'patentable_subject_matter',
    title: '4. Patentable Subject Matter',
    section: 'Sections 3 & 4 Exclusions',
    description:
      'The invention must not fall under statutory non-patentable categories (e.g. frivolous inventions, methods of agriculture, business methods per se, or atomic energy).',
    badge: 'Legal Clearance',
  },
];

export const PATENT_APPLICATION_TYPES = [
  {
    id: 'provisional',
    title: 'Provisional Application',
    form: 'Form 2 (Provisional)',
    badge: 'Most Popular for R&D',
    summary:
      'Filed when the invention is still in the experimental or development stage. It secures your Priority Date with the Patent Office and grants 12 months to file the Complete Specification.',
    points: [
      'Immediate priority date establishment',
      '12 months window to conduct further R&D',
      'Lower initial cost & faster filing',
      'Prevents competitors from claiming the same innovation',
    ],
  },
  {
    id: 'complete',
    title: 'Complete / Non-Provisional Application',
    form: 'Form 2 (Complete)',
    badge: 'Direct Filing',
    summary:
      'Filed when the invention is fully developed with exhaustive technical specifications, drawings, best mode of operation, and legally binding claims.',
    points: [
      'Complete legal claims defining exact monopoly scope',
      'Required for patent examination and grant',
      'Can be filed directly or within 12 months of provisional',
      'Triggers official publication and examination process',
    ],
  },
  {
    id: 'convention',
    title: 'Convention Application',
    form: 'Paris Convention',
    badge: 'International Priority',
    summary:
      'Filed in India within 12 months of filing a basic patent application in any of the Paris Convention member countries, claiming earlier convention priority.',
    points: [
      'Preserves original filing priority date from member country',
      'Protects invention across multiple jurisdictions',
      'Recognized across 179+ Paris Convention states',
    ],
  },
  {
    id: 'pct_national_phase',
    title: 'PCT National Phase Application',
    form: 'Patent Cooperation Treaty (WIPO)',
    badge: 'Global Protection',
    summary:
      'Enables inventors to enter the Indian national phase within 31 months from the earliest priority date established in an international PCT application.',
    points: [
      'Streamlined single international filing through WIPO',
      'Up to 31 months before entering Indian jurisdiction',
      'Considers International Preliminary Search Report (IPSR)',
    ],
  },
  {
    id: 'patent_of_addition',
    title: 'Patent of Addition',
    form: 'Section 54',
    badge: 'No Extra Renewal Fee',
    summary:
      'Filed for any improvement or modification made to an already granted or pending parent patent. Expires simultaneously with the parent patent without separate renewal fees.',
    points: [
      'Cost-effective protection for subsequent improvements',
      'Zero annual maintenance fees during term',
      'Tied to validity of the parent patent',
    ],
  },
  {
    id: 'divisional',
    title: 'Divisional Application',
    form: 'Section 16',
    badge: 'Multiple Inventions',
    summary:
      'Filed when the parent application discloses more than one independent invention. It splits the subject matter while retaining the original priority date.',
    points: [
      'Overcomes lack of unity of invention objections',
      'Retains parent application priority date',
      'Independent prosecution and grant',
    ],
  },
];

export const PATENT_REGISTRATION_STEPS = [
  {
    stepNumber: '01',
    title: 'Patentability Search & Prior Art Analysis',
    duration: '2 - 3 Days',
    description:
      'Our registered patent agents perform exhaustive searches on Indian Patent databases (InPASS), USPTO, EPO (Espacenet), and WIPO Patentscope to ensure your invention meets novelty and non-obviousness criteria.',
  },
  {
    stepNumber: '02',
    title: 'Patent Specification & Claims Drafting',
    duration: '3 - 5 Days',
    description:
      'Drafting precise technical specifications, background, detailed description, embodiments, and legally airtight independent/dependent claims in Form 2, alongside professional schematics and drawings.',
  },
  {
    stepNumber: '03',
    title: 'E-Filing with Indian Patent Office (IPO)',
    duration: '1 Day',
    description:
      'Submitting Form 1, Form 2, Form 3, Form 5, Form 26, and Form 28 on the official IP India portal. Generation of official Application Number and CBR (Cash Book Receipt) establishing priority.',
  },
  {
    stepNumber: '04',
    title: 'Publication in the Official Patent Journal',
    duration: '18 Months / 1 Month (Fast Track)',
    description:
      'The application is automatically published in the official patent journal after 18 months from filing. Early publication can be requested under Form 9 to have it published within 30 days.',
  },
  {
    stepNumber: '05',
    title: 'Request for Examination (RFE)',
    duration: 'Form 18 / 18A',
    description:
      'Filing a formal request for examination (Form 18). Eligible startups, female applicants, and small entities can opt for expedited examination under Form 18A for rapid prosecution.',
  },
  {
    stepNumber: '06',
    title: 'First Examination Report (FER) & Objections',
    duration: 'Controller Review',
    description:
      'The Patent Examiner issues a First Examination Report (FER) highlighting any prior art objections or formal defects. Our patent attorneys prepare and file comprehensive written counter-statements within the 6-month statutory deadline.',
  },
  {
    stepNumber: '07',
    title: 'Hearing & Final Grant of Patent',
    duration: '20-Year Legal Grant',
    description:
      'Upon satisfying all objections and Controller hearings (if summoned), the Controller grants the Patent. The Certificate of Patent is issued, conferring 20-year exclusive monopoly rights.',
  },
];

export const REQUIRED_PATENT_FORMS = [
  {
    form: 'Form 1',
    name: 'Application for Grant of Patent',
    purpose: 'Captures full details of inventor(s), applicant entity, and basic invention title.',
    requiredFor: 'All Applications',
  },
  {
    form: 'Form 2',
    name: 'Provisional / Complete Specification',
    purpose: 'Contains technical disclosure, background, abstract, and legal claims.',
    requiredFor: 'Mandatory',
  },
  {
    form: 'Form 3',
    name: 'Statement & Undertaking (Section 8)',
    purpose: 'Details corresponding patent applications filed in foreign jurisdictions.',
    requiredFor: 'Mandatory',
  },
  {
    form: 'Form 5',
    name: 'Declaration as to Inventorship',
    purpose: 'Establishes the true and first inventors of the disclosed technology.',
    requiredFor: 'With Complete Specification',
  },
  {
    form: 'Form 9',
    name: 'Request for Early Publication',
    purpose: 'Accelerates publication from 18 months to within 1 month.',
    requiredFor: 'Optional (Expedited)',
  },
  {
    form: 'Form 18 / 18A',
    name: 'Request for Examination / Expedited Examination',
    purpose: 'Triggers official substantive technical examination of patent claims.',
    requiredFor: 'Mandatory for Grant',
  },
  {
    form: 'Form 26',
    name: 'Power of Attorney (Form 26)',
    purpose: 'Authorizes BharatFiling registered patent agents to represent before the IPO.',
    requiredFor: 'When Agent is Appointed',
  },
  {
    form: 'Form 28',
    name: 'Small Entity / Startup Evidence',
    purpose: 'Validates MSME Udyam or DPIIT startup certificate for 80% statutory fee waiver.',
    requiredFor: 'Startups & MSMEs',
  },
];

export const PATENT_PACKAGES = [
  {
    id: 'consultation',
    name: 'Online Patent Consultation',
    price: 499,
    originalPrice: 999,
    discountBadge: '50% Off',
    popular: false,
    summary: 'Instant 1-on-1 strategy call with a registered Patent Attorney.',
    features: [
      '30-minute consultation with Registered Patent Agent',
      'Preliminary patentability assessment',
      'Confidentiality via mutual Non-Disclosure Agreement (NDA)',
      'Roadmap for provisional vs complete filing',
      'Guidance on DPIIT startup 80% fee exemption',
    ],
    ctaText: 'Book Consultation',
  },
  {
    id: 'provisional',
    name: 'Provisional Patent Application',
    price: 9999,
    originalPrice: 15499,
    discountBadge: '35% Off',
    popular: true,
    summary: 'Secure your priority date immediately while R&D is ongoing.',
    features: [
      'Comprehensive Prior Art & Patentability Search report',
      'Drafting of Provisional Specification (Form 2)',
      'Filing of Form 1, Form 2, Form 3 & Form 26 with IPO',
      'Official CBR Receipt with Application Number in 48 hours',
      '12-Month Priority Date lock protection nationwide',
      'Dedicated IP Attorney guidance throughout the year',
    ],
    ctaText: 'File Provisional Patent',
  },
  {
    id: 'complete',
    name: 'Complete Patent Filing & Prosecution',
    price: 24999,
    originalPrice: 34999,
    discountBadge: '28% Off',
    popular: false,
    summary: 'End-to-end technical claim drafting, filing, and examination management.',
    features: [
      'Exhaustive global novelty & prior art search report',
      'Complete claim drafting (independent + dependent claims)',
      'Professional engineering drawings & patent illustrations',
      'Preparation & submission of Form 1, 2, 3, 5, 18 & 26',
      'Filing Request for Examination (Form 18 / 18A expedited)',
      'Response drafting for First Examination Report (FER)',
      'Complete tracking until final grant by the Controller',
    ],
    ctaText: 'File Complete Patent',
  },
];

export const PATENT_GOVT_FEES_TABLE = [
  {
    formType: 'Form 1 (Patent Filing - up to 30 pages & 10 claims)',
    individualStartupFee: '₹1,600',
    otherEntityFee: '₹8,000',
  },
  {
    formType: 'Form 9 (Optional Request for Early Publication)',
    individualStartupFee: '₹2,500',
    otherEntityFee: '₹12,500',
  },
  {
    formType: 'Form 18 (Standard Request for Examination - RFE)',
    individualStartupFee: '₹4,000',
    otherEntityFee: '₹20,000',
  },
  {
    formType: 'Form 18A (Expedited Examination for Startups & Female Applicants)',
    individualStartupFee: '₹8,000',
    otherEntityFee: '₹60,000',
  },
];

export const PATENT_FAQS = [
  {
    q: 'What is a patent and what rights does it grant in India?',
    a: 'A patent is a statutory right granted by the Government of India under the Patents Act, 1970 to the inventor or their assignee. It gives the patent holder an exclusive monopoly right to prevent unauthorized making, using, offering for sale, selling, or importing of the patented invention in India for a period of 20 years from the filing date.',
  },
  {
    q: 'What are the essential criteria for an invention to be patentable?',
    a: 'Under Indian law, an invention must satisfy four primary criteria: (1) Novelty: The invention must not have been previously disclosed or published anywhere in the world. (2) Inventive Step: The invention must not be obvious to a person skilled in the same technical field. (3) Industrial Applicability: The invention must have practical, repeatable commercial utility. (4) Non-Exclusion: It must not fall under non-patentable categories defined under Sections 3 and 4 of the Patents Act (e.g. mere software per se, mathematical methods, or business ideas).',
  },
  {
    q: 'Can software or mobile applications be patented in India?',
    a: 'Under Section 3(k) of the Patents Act, "a mathematical or business method or a computer programme per se or algorithms" are not patentable. However, software that produces a practical "technical effect", works in combination with novel hardware, or solves a technical hardware problem can be patented. BharatFiling’s specialized software patent attorneys help structure claims to highlight technical advancement and overcome Section 3(k) objections.',
  },
  {
    q: 'What is the difference between a Provisional and Complete Patent Application?',
    a: 'A Provisional Application is filed when an invention is still in development. It establishes an early official Priority Date and gives the inventor 12 months to conduct further R&D, raise capital, and test the market before filing the Complete Application. A Complete Application includes comprehensive claims and full technical disclosure, which are mandatory for the patent office to examine and grant the patent.',
  },
  {
    q: 'Does an Indian patent protect my invention internationally?',
    a: 'No. Patents are territorial rights. An Indian patent granted by the Indian Patent Office protects your invention only within the territory of India. To protect your invention globally, you can file a Patent Cooperation Treaty (PCT) application through WIPO or convention applications in individual target countries within 12 months of your Indian priority date.',
  },
  {
    q: 'What is the fee subsidy for DPIIT startups and MSMEs in India?',
    a: 'The Government of India provides an 80% rebate on statutory patent filing and examination fees for individuals, recognized DPIIT startups, MSMEs (with Udyam registration), and educational institutions. For instance, the Form 1 filing fee is reduced from ₹8,000 to ₹1,600, and Form 18 examination fee is reduced from ₹20,000 to ₹4,000.',
  },
  {
    q: 'How long does it take for a patent to be granted in India?',
    a: 'Under normal examination routes, it typically takes 2.5 to 4 years from filing to final grant. However, eligible applicants (startups, small entities, female inventors, government departments) can apply for Expedited Examination under Form 18A, which can lead to a patent grant in as little as 12 to 18 months.',
  },
  {
    q: 'Is my invention kept confidential when I consult BharatFiling?',
    a: 'Yes, 100%. We enforce strict Non-Disclosure Agreements (NDA) before reviewing any technical blueprints, schematics, or invention disclosures. All client communications and documents are encrypted and safeguarded within our ISO 27001 certified legal management infrastructure.',
  },
  {
    q: 'What happens if someone infringes upon my granted patent?',
    a: 'If a competitor manufactures, sells, or uses your patented invention without authorization, you have the legal right under the Patents Act, 1970 to initiate patent infringement proceedings in the High Court or District Court. Remedies include interim injunctions, permanent injunctions, recovery of damages, or an account of profits earned by the infringer.',
  },
  {
    q: 'What documents are required to initiate patent filing in India?',
    a: 'To begin, you will need: (1) Invention disclosure sheet outlining what the invention does, problems solved, and working mechanism; (2) Conceptual drawings, flowcharts, or schematics; (3) Identity and address proofs of all inventors and applicants; (4) Power of Attorney in Form 26; and (5) MSME Udyam or DPIIT Startup certificate if claiming government fee concessions.',
  },
];

export const TRUSTED_METRICS = [
  { value: '20,000+', label: 'Innovators & Startups Guided' },
  { value: '98.6%', label: 'First-Time Application Accuracy' },
  { value: '100%', label: 'Strict NDA & Data Protection' },
  { value: '4.8 / 5', label: 'Average Client Rating' },
];
