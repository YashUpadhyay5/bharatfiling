/**
 * Constants for One Person Company (OPC) Registration Module
 * Covers MCA SPICe+ Incorporation under Companies Act, 2013.
 */

export const OPC_HERO = {
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'One Person Company Registration in India',
  bullets: [
    'Register your OPC with guidance from trusted experts.',
    'Affordable plans starting at ₹999 + Govt Fee. 100% transparent pricing.',
    'Enjoy an error-free process that keeps your business protected.',
    'Get professional support for a fast and smooth OPC setup.',
  ],
  cardBadges: [
    { label: '4.5/5 Google Rating', icon: 'star' },
    { label: 'MCA Approved Experts', icon: 'check' },
    { label: '5L+ Companies Registered', icon: 'rocket' },
  ],
};

export const TRUSTED_PARTNERS = [
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Axis Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg' },
  { name: 'GlobalLinker', logo: 'https://d2q79iu7y44aq9.cloudfront.net/globallinker/images/gl-logo.png' },
  { name: 'Flipkart', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg' },
  { name: 'Yes Bank', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Yes_Bank_Logo.svg' },
  { name: 'PayU', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/PayU_logo.svg' },
  { name: 'Payoneer', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Payoneer_logo.svg' },
  { name: 'E-Cell', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/E-Cell_IIT_Bombay_logo.png' },
  { name: 'Digital Showroom', logo: 'https://cdn.iconscout.com/icon/free/png-256/free-store-1780512-1514197.png' },
  { name: 'Tata Tele Business', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Tata_logo.svg' },
];

export const OPC_TESTIMONIALS = [
  {
    id: 1,
    quote:
      'As a solo software consultant, I wanted corporate credibility and limited liability without having to add a second nominal director. BharatFiling managed my name approval, DSC, nominee consent (INC-3), and SPICe+ filing within 7 working days!',
    author: 'Aditya Verma',
    title: 'Founder, CloudScale Technologies (OPC) Pvt Ltd (Bengaluru)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'The entire OPC incorporation was 100% online. Received my Certificate of Incorporation (COI) with CIN, PAN, TAN, and instant bank current account fast-tracked by their CA team.',
    author: 'Kavita Sundaram',
    title: 'Managing Director, Artisanal Living (OPC) Pvt Ltd (Chennai)',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Transparent pricing with zero hidden charges. Their legal team drafted custom MOA & AOA clauses protecting my intellectual property and guided my nominee through the e-sign process seamlessly.',
    author: 'Rohan Deshmukh',
    title: 'Founder, Veloce Logistics (OPC) Pvt Ltd (Pune)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
];

export const OPC_VS_OTHERS = [
  {
    feature: 'Legal Status',
    opc: 'Separate Legal Entity registered with MCA under Companies Act, 2013.',
    proprietorship: 'No separate legal identity; business and owner are legally identical.',
    pvtLtd: 'Separate Legal Entity registered with MCA under Companies Act, 2013.',
  },
  {
    feature: 'Personal Liability of Owner',
    opc: 'Limited Liability — personal assets of the sole shareholder are 100% protected.',
    proprietorship: 'Unlimited Liability — personal savings, home, and assets can be seized for debts.',
    pvtLtd: 'Limited Liability — shareholders liable only up to unpaid share capital.',
  },
  {
    feature: 'Number of Members / Directors',
    opc: '1 Shareholder (Sole Owner) + 1 Mandatory Nominee. Up to 15 Directors allowed.',
    proprietorship: 'Only 1 individual owner.',
    pvtLtd: 'Minimum 2 Shareholders and 2 Directors required.',
  },
  {
    feature: 'Annual General Meeting (AGM)',
    opc: 'Exempted from holding mandatory AGMs under Section 96 of Companies Act.',
    proprietorship: 'Not applicable.',
    pvtLtd: 'Mandatory to hold AGM every year with strict quorum requirements.',
  },
  {
    feature: 'Corporate Tax Rate',
    opc: 'Eligible for concessional 22% base corporate tax rate under Section 115BAA.',
    proprietorship: 'Individual income tax slab rates reaching up to 30% + surcharge.',
    pvtLtd: 'Eligible for concessional 22% base corporate tax rate.',
  },
  {
    feature: 'Ease of Raising Funds & Bank Loans',
    opc: 'High credibility with financial institutions and suppliers due to MCA registration.',
    proprietorship: 'Difficult to secure venture capital or significant bank credit lines.',
    pvtLtd: 'Highest credibility; can issue equity shares, convertible debentures, and ESOPs.',
  },
  {
    feature: 'Conversion Flexibility',
    opc: 'Can be converted into a Private Limited Company easily at any time.',
    proprietorship: 'Requires full business transfer and re-incorporation from scratch.',
    pvtLtd: 'Can convert to Public Limited or LLP.',
  },
];

export const DOCUMENTS_REQUIRED = [
  {
    category: 'Director & Nominee KYC',
    items: [
      { name: 'PAN Card', desc: 'Mandatory for Indian nationals (Passport for foreign citizens/NRIs).' },
      { name: 'Identity Proof', desc: 'Aadhaar Card, Voter ID, Passport, or Valid Driving License.' },
      { name: 'Current Address Proof', desc: 'Bank Statement, Electricity Bill, or Mobile Bill (< 2 months old).' },
      { name: 'Passport-Size Photographs', desc: 'Clear digital photograph with a clean white background.' },
      { name: 'Form INC-3 (Nominee Consent)', desc: 'Written consent form signed by the nominee along with KYC.' },
    ],
  },
  {
    category: 'Registered Corporate Office',
    items: [
      { name: 'Latest Utility Bill', desc: 'Electricity, Gas, or Water bill not older than 2 months.' },
      { name: 'Rent Agreement / Lease Deed', desc: 'In English or regional language if the office is rented.' },
      { name: 'No Objection Certificate (NOC)', desc: 'Signed by the property owner permitting commercial company registration.' },
      { name: 'Ownership Proof', desc: 'Sale deed or Property Tax receipt if the premises is owned by founder.' },
    ],
  },
  {
    category: 'Company Name & Objects',
    items: [
      { name: '2-3 Unique Name Choices', desc: 'Must end with suffix "(OPC) Private Limited" adhering to MCA naming rules.' },
      { name: 'Main Business Activities', desc: 'Clear summary of proposed products, software, trade, or services.' },
      { name: 'Authorized Capital Structure', desc: 'Minimum ₹1 Lakh authorized capital (no minimum paid-up capital needed).' },
    ],
  },
];

export const SPICE_PLUS_PROCESS = [
  {
    step: '01',
    title: 'DSC & Name Reservation (SPICe+ Part A)',
    days: 'Day 1-2',
    desc: 'We obtain Class 3 Digital Signature Certificate (DSC) for the director and file SPICe+ Part A for company name approval with MCA.',
  },
  {
    step: '02',
    title: 'MoA, AoA & Nominee Documentation',
    days: 'Day 2-3',
    desc: 'Our corporate legal team drafts the electronic Memorandum of Association (e-MoA INC-33), Articles of Association (e-AoA INC-34), and Form INC-3.',
  },
  {
    step: '03',
    title: 'SPICe+ Part B Filing & Statutory Registrations',
    days: 'Day 4-6',
    desc: 'Comprehensive electronic filing on MCA portal including DIN allotment, Company Incorporation, PAN, TAN, EPFO, ESIC, and Profession Tax.',
  },
  {
    step: '04',
    title: 'Certificate of Incorporation (CoI) Issuance',
    days: 'Day 7-10',
    desc: 'Registrar of Companies (RoC) issues the official Certificate of Incorporation containing unique 21-digit CIN, PAN, and TAN.',
  },
];

export const NOMINEE_RULES = [
  {
    title: 'Who Can Be a Nominee?',
    desc: 'Any natural person who is an Indian citizen (resident or non-resident/NRI under recent budget amendments) and has attained 18 years of age.',
  },
  {
    title: 'One Nominee Restriction',
    desc: 'A person can act as a member or nominee in only ONE One Person Company at any given point in time.',
  },
  {
    title: 'Minor Prohibited',
    desc: 'A minor cannot become a member or nominee of an OPC, nor can they hold any beneficial interest in shares.',
  },
  {
    title: 'Easy Nominee Change',
    desc: 'The sole member may change the nominee at any time by giving written notice to the company and filing Form INC-4 with the RoC.',
  },
];

export const PRICING_PACKAGES = [
  {
    id: 'starter_opc',
    name: 'Starter OPC Package',
    price: 999,
    originalPrice: 2499,
    badge: 'Basic Filing',
    popular: false,
    desc: 'For solo founders who need professional name check, MoA/AoA drafting, and legal documentation guidance.',
    features: [
      'Company Name Availability Search',
      'Electronic MoA (INC-33) & AoA (INC-34) drafting',
      'Nominee Consent Form (INC-3) preparation',
      'Guidance on MCA SPICe+ filing and documentation',
      'Statutory compliance calendar for the 1st year',
    ],
    ctaText: 'Select Starter Plan',
  },
  {
    id: 'standard_opc',
    name: 'Standard Incorporation',
    price: 5499,
    originalPrice: 9999,
    badge: 'Most Popular',
    popular: true,
    desc: 'Our flagship end-to-end incorporation package. Everything from DSC and name approval to Certificate of Incorporation.',
    features: [
      'Everything in Starter Package',
      '1 Class 3 Digital Signature Certificate (DSC)',
      '1 Director Identification Number (DIN)',
      'Name Approval via MCA SPICe+ Part A (RUN)',
      'Government Incorporation Filing via SPICe+ Part B',
      'Certificate of Incorporation (COI) with CIN',
      'Company PAN and TAN allotment',
      'EPFO and ESIC mandatory registrations',
      'Zero-balance Current Account opening assistance',
    ],
    ctaText: 'Select Standard Plan',
  },
  {
    id: 'all_inclusive_growth',
    name: 'Complete Growth Suite',
    price: 9999,
    originalPrice: 17999,
    badge: 'Full Business Suite',
    popular: false,
    desc: 'Complete corporate launchpad with tax registrations, MSME Udyam, trademark search, and 1 year of CA advisory.',
    features: [
      'Everything in Standard Incorporation Package',
      'GST Registration for the new OPC',
      'MSME / Udyam Registration Certificate',
      'Trademark availability check & advisory',
      'First Board Resolutions & Share Certificates drafting',
      '1 Year Dedicated CA compliance helpline',
      'Free Cloud Invoicing & Accounting Software (1 Year)',
    ],
    ctaText: 'Select Growth Plan',
  },
];

export const FAQS = [
  {
    q: 'What is a One Person Company (OPC)?',
    a: 'A One Person Company (OPC) is a corporate structure recognized under Section 2(62) of the Companies Act, 2013, which allows a single entrepreneur to operate a company with limited liability protection and a separate legal corporate entity, without needing a co-founder.',
  },
  {
    q: 'Why is a Nominee required in an OPC?',
    a: 'Under the Companies Act, 2013, appointing a nominee is mandatory for an OPC. In the unfortunate event of the death or permanent incapacity of the sole member, the nominee steps in as the new member, ensuring perpetual succession and continuous business operations.',
  },
  {
    q: 'Can a Non-Resident Indian (NRI) incorporate an OPC?',
    a: 'Yes. Following the amendments in the Union Budget, NRIs (Non-Resident Indians) and foreign citizens of Indian origin are now permitted to incorporate an OPC in India. The residency period requirement has also been reduced from 182 days to 120 days.',
  },
  {
    q: 'What is the minimum capital required to start an OPC?',
    a: 'There is no minimum paid-up capital required to incorporate an OPC in India. You can start with an authorized capital of ₹1,00,000 and a nominal paid-up capital of even ₹1,000.',
  },
  {
    q: 'How long does the OPC registration process take?',
    a: 'Typically, the entire process takes 7 to 10 working days, depending on DSC issuance, MCA name approval speed, and RoC verification. BharatFiling expedites filings to avoid unnecessary queries or re-submissions.',
  },
  {
    q: 'Can an OPC be converted into a Private Limited Company?',
    a: 'Yes. An OPC can voluntarily convert into a Private Limited Company or Public Limited Company at any time by increasing the minimum number of members to 2 and filing the requisite conversion forms with the RoC.',
  },
  {
    q: 'Are annual audits mandatory for an OPC?',
    a: 'Yes. Like all registered corporate entities, an OPC is required to get its financial books audited by an independent practicing Chartered Accountant every financial year and file Form AOC-4 (Financial Statements) and Form MGT-7A (Annual Return) with the MCA.',
  },
  {
    q: 'Does an OPC need to conduct Annual General Meetings (AGMs)?',
    a: 'No. An OPC is legally exempted from the mandatory requirement of holding an Annual General Meeting (AGM) under Section 96 of the Companies Act, 2013, drastically reducing administrative overhead.',
  },
  {
    q: 'Can an OPC have more than one director?',
    a: 'Yes! While an OPC can have only 1 shareholder (member), it can appoint up to 15 directors to manage day-to-day operations and executive leadership.',
  },
  {
    q: 'Can an OPC own property or intellectual property in its name?',
    a: 'Yes. Because an OPC is an independent legal entity in the eyes of the law, it can acquire, hold, and dispose of movable and immovable property, trademarks, and patents in its own corporate name.',
  },
];
