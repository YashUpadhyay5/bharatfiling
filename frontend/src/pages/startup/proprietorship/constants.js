/**
 * Constants for Sole Proprietorship Registration Module
 * Covers MSME Udyam, GST Registration, Shop & Establishment, and Current Account Setup.
 */

export const PROPRIETORSHIP_HERO = {
  badge: 'Only ISO 27001 Certified Platform in 🇮🇳',
  festiveBadge: 'Diwali Festive Sale Offer',
  title: 'Sole Proprietorship Registration in India',
  bullets: [
    'Register your Sole Proprietorship online in India easily starting at just ₹999',
    'Get MSME Udyam, GST Registration, and priority Current Account opening guidance',
    'Legally recognized business identity linked directly to your PAN with zero annual MCA filing',
  ],
  stats: [
    { label: 'Proprietorships Registered', value: '50,000+' },
    { label: 'Client Rating', value: '4.9/5' },
    { label: 'Turnaround Time', value: '2-3 Days' },
    { label: 'Pan-India Coverage', value: '28 States & 8 UTs' },
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

export const PROPRIETORSHIP_TESTIMONIALS = [
  {
    id: 1,
    quote:
      'I wanted to start my online handicraft business on Amazon & Flipkart. BharatFiling registered my Sole Proprietorship via Udyam and GST in just 48 hours. I opened my Axis Bank current account on day 3 without visiting a single branch!',
    author: 'Priya Sharma',
    title: 'Founder, Sharma Art & Decor (Jaipur, Rajasthan)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'As an independent IT consultant, I needed a proper business entity for client billing and software expense write-offs. Their ₹999 Starter package took care of everything cleanly. The dedicated CA was super responsive over WhatsApp.',
    author: 'Rohan Deshmukh',
    title: 'Proprietor, RD Cloud Advisory (Pune, Maharashtra)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Got our Shop & Establishment certificate along with MSME Udyam for our retail store in Delhi. Quick, transparent, and completely paperless. Highly recommended for small retail owners.',
    author: 'Gaurav Aggarwal',
    title: 'Proprietor, Aggarwal Electronics & Spares (Delhi NCR)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces',
    rating: 5,
  },
];

export const PROPRIETORSHIP_VS_OTHERS = [
  {
    feature: 'Ownership & Decision Making',
    proprietorship: '100% Single Owner — Total autonomy and absolute decision-making control.',
    opc: '1 Owner (Requires 1 Nominee Director)',
    partnership: 'Shared between 2 to 50 Partners',
    pvtLtd: 'Board of Directors & Shareholders (Min 2)',
  },
  {
    feature: 'Setup Cost & Starting Price',
    proprietorship: 'Lowest (Starting from ₹999 + basic registration)',
    opc: 'Moderate (₹6,000–₹12,000)',
    partnership: 'Moderate (₹2,499–₹5,000)',
    pvtLtd: 'Higher (₹7,000–₹15,000)',
  },
  {
    feature: 'Annual Government Compliance Burden',
    proprietorship: 'Zero MCA ROC filing. Only personal ITR (ITR-3/ITR-4) & periodic GST if registered.',
    opc: 'Mandatory ROC filings, AOC-4, MGT-7, statutory audit',
    partnership: 'No ROC filing unless registered under state RoF; tax audit if turnover exceeds limits',
    pvtLtd: 'High — Mandatory ROC filings, board meetings, statutory audit, secretarial records',
  },
  {
    feature: 'PAN & Legal Identity',
    proprietorship: 'Operates under the Proprietor’s personal PAN with trade name certificate.',
    opc: 'Separate dedicated Corporate PAN & CIN',
    partnership: 'Separate Firm PAN',
    pvtLtd: 'Separate Corporate PAN & CIN',
  },
  {
    feature: 'Bank Current Account Eligibility',
    proprietorship: 'Open current account using any 2 government certificates (Udyam + GST / Shop Act).',
    opc: 'Certificate of Incorporation (COI)',
    partnership: 'Partnership Deed + Firm PAN',
    pvtLtd: 'Certificate of Incorporation (COI)',
  },
  {
    feature: 'Income Tax Rate & Deductions',
    proprietorship: 'Taxed at Individual Slab Rates (0% up to ₹3L–₹7L under new regime); Section 44AD presumptive tax option.',
    opc: 'Flat 22% / 25% Corporate Tax + Cess',
    partnership: 'Flat 30% Tax on firm profit',
    pvtLtd: 'Flat 22% / 25% Corporate Tax + Cess',
  },
];

export const REGISTRATION_ROUTES = [
  {
    title: 'MSME Udyam Registration',
    badge: 'Fastest Route',
    desc: 'Government recognized identity issued by Ministry of MSME. Provides priority sector bank loans, lower patent fees, and 45-day MSME payment protection.',
    icon: 'Award',
  },
  {
    title: 'GST Registration (REG-06)',
    badge: 'Pan-India Credibility',
    desc: '15-digit Goods & Services Tax Identification Number (GSTIN) with certificate. Mandatory for interstate sales, e-commerce selling, and turnover above ₹20L/₹40L.',
    icon: 'Building2',
  },
  {
    title: 'Shop & Establishment Act',
    badge: 'Municipal License',
    desc: 'Issued by the State Labour Department / Municipal Corporation verifying your commercial establishment address. Widely accepted by banks for current account setup.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Zero-Balance Current Account',
    badge: 'Banking Integration',
    desc: 'Direct opening with our partner banks (Axis, ICICI, HDFC, Yes Bank) based on Udyam and GST certificates without visiting the bank branch.',
    icon: 'Landmark',
  },
];

export const ALL_INDIA_STATES = [
  { code: 'MH', name: 'Maharashtra', capital: 'Mumbai', registrationAuthority: 'Gumasta / Shop Act & Udyam' },
  { code: 'DL', name: 'Delhi NCR', capital: 'New Delhi', registrationAuthority: 'Delhi Shop & Establishment Act' },
  { code: 'KA', name: 'Karnataka', capital: 'Bengaluru', registrationAuthority: 'Karnataka e-Karmika / Shop Act' },
  { code: 'TN', name: 'Tamil Nadu', capital: 'Chennai', registrationAuthority: 'TN Labour Department / Udyam' },
  { code: 'TS', name: 'Telangana', capital: 'Hyderabad', registrationAuthority: 'Telangana TS-iPASS / Shop Act' },
  { code: 'GJ', name: 'Gujarat', capital: 'Gandhinagar', registrationAuthority: 'Gujarat e-Nagar / Gumastadhara' },
  { code: 'UP', name: 'Uttar Pradesh', capital: 'Lucknow', registrationAuthority: 'UP Dukan Aur Vanijya Adhiniyam' },
  { code: 'WB', name: 'West Bengal', capital: 'Kolkata', registrationAuthority: 'KMC Trade License / Udyam' },
  { code: 'RJ', name: 'Rajasthan', capital: 'Jaipur', registrationAuthority: 'Rajasthan Shop Act / BRN' },
  { code: 'HR', name: 'Haryana', capital: 'Chandigarh', registrationAuthority: 'Haryana Labour Department' },
  { code: 'MP', name: 'Madhya Pradesh', capital: 'Bhopal', registrationAuthority: 'MP Gumasta / Udyam' },
  { code: 'KL', name: 'Kerala', capital: 'Thiruvananthapuram', registrationAuthority: 'Kerala Panchayat / D&O License' },
  { code: 'PB', name: 'Punjab', capital: 'Chandigarh', registrationAuthority: 'Punjab Shop Act' },
  { code: 'AP', name: 'Andhra Pradesh', capital: 'Amaravati', registrationAuthority: 'AP Labour Portal / Udyam' },
];

export const DOCUMENTS_REQUIRED = [
  {
    category: 'For Proprietor (Identity & Address)',
    items: [
      { name: 'PAN Card of Proprietor', desc: 'Mandatory primary identifier for sole proprietorship business.' },
      { name: 'Aadhaar Card (Linked with Mobile)', desc: 'Required for instant Aadhaar OTP e-verification on Udyam and GST portals.' },
      { name: 'Recent Passport-Size Photograph', desc: 'Clean white background passport photo of the sole proprietor.' },
      { name: 'Bank Account Passbook / Cancelled Cheque', desc: 'Personal or savings bank account proof bearing proprietor’s name.' },
    ],
  },
  {
    category: 'For Business Office Address',
    items: [
      { name: 'Latest Utility Bill (Electricity / Water / Gas)', desc: 'Must not be older than 2 months for the business premises.' },
      { name: 'Rent Agreement / Lease Deed', desc: 'Required if the commercial or residential office is rented.' },
      { name: 'No Objection Certificate (NOC)', desc: 'Signed declaration from property owner permitting business operation.' },
      { name: 'Property Tax Receipt / Municipal Khata', desc: 'Required if the property is owned by proprietor or family member.' },
    ],
  },
  {
    category: 'Business Particulars',
    items: [
      { name: 'Proposed Trade Name', desc: 'Name under which you want to invoice clients and trade.' },
      { name: 'Nature of Business & Primary Activities', desc: 'Detailed description of services, retail products, or trading goods.' },
      { name: 'Date of Business Commencement', desc: 'Actual or planned start date of operations.' },
      { name: 'Number of Employees', desc: 'Current staff count (can be 0 or 1+).' },
    ],
  },
];

export const REGISTRATION_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Consultation & Trade Name Selection',
    days: 'Day 1',
    desc: 'Our legal and tax experts verify your proposed trade name against trademark databases and guide you on the most optimal registration route.',
  },
  {
    step: '02',
    title: 'MSME Udyam Filing & Certificate Issuance',
    days: 'Day 1-2',
    desc: 'We file your Udyam Registration application on the official Ministry of MSME portal using Aadhaar OTP verification to secure your primary entity recognition.',
  },
  {
    step: '03',
    title: 'GST / Shop Act Registration',
    days: 'Day 2-3',
    desc: 'Preparation and filing of GST Registration (Form GST REG-01) or Municipal Shop & Establishment license for your commercial registered address.',
  },
  {
    step: '04',
    title: 'Bank Current Account Setup & Handover',
    days: 'Day 3',
    desc: 'Delivery of all official registration certificates (Udyam, GST REG-06) with direct bank current account opening priority assistance.',
  },
];

export const PRICING_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Udyam Registration',
    price: 999,
    originalPrice: 1999,
    badge: 'Best for Starters',
    popular: false,
    desc: 'Ideal for small service providers, freelancers, and small tradesmen needing official business proof and current account guidance.',
    features: [
      'Government MSME / Udyam Registration Certificate',
      'Official Trade Name recognition under Ministry of MSME',
      'Priority sector lending & lower patent fee benefits',
      'Priority assistance for Zero-Balance Current Account opening',
      'Dedicated legal manager & WhatsApp support',
    ],
    ctaText: 'Buy Starter Plan (₹999)',
  },
  {
    id: 'standard',
    name: 'Standard (Proprietorship + GST)',
    price: 2499,
    originalPrice: 4999,
    badge: 'Most Popular',
    popular: true,
    desc: 'Our most popular comprehensive package. Covers both MSME Udyam and official GST Registration (REG-06) for pan-India trading.',
    features: [
      'Everything in Starter Plan',
      'Government GST Registration (Form GST REG-06)',
      '15-digit GSTIN allotment for pan-India sales & e-commerce',
      'Zero-Balance Current Account opening with partner banks',
      '1 Year Invoicing & Accounting software license',
      'Input Tax Credit (ITC) optimization advisory',
      'Priority phone & WhatsApp customer support',
    ],
    ctaText: 'Buy Standard Plan (₹2,499)',
  },
  {
    id: 'premium',
    name: 'Complete Business Launchpad',
    price: 4999,
    originalPrice: 9999,
    badge: 'Complete Business Suite',
    popular: false,
    desc: 'Full-stack registration suite with GST, Udyam, Shop & Establishment license, 6 months GSTR return filing, and trademark check.',
    features: [
      'Everything in Standard Plan',
      'Shop & Establishment Act / Trade License registration',
      'GSTR-1 & 3B Monthly Return Filing for 6 Months (up to 100 invoices)',
      'Trademark availability search & brand protection advisory',
      'MSME delayed payment protection advisory',
      '1 Year Dedicated Chartered Accountant (CA) tax helpline',
      'Annual Income Tax Return (ITR-3 / ITR-4) filing consultation',
    ],
    ctaText: 'Buy Complete Launchpad (₹4,999)',
  },
];

export const BUNDLED_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'Ideal for starting Sole Proprietorship registration',
    originalPrice: 1999,
    discount: '50% off',
    price: 999,
    emiText: 'EMI option available.',
    recommended: false,
    theme: 'light',
    features: [
      'Expert assisted process',
      'Udyam Registration Certificate in 24 hours',
      'Government MSME trade name validation',
      'Zero balance current account opening guidance',
      'Standard digital certificate delivered via email & WhatsApp',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    badge: 'Recommended',
    subtitle: 'Perfect for Proprietorship + GST Registration',
    originalPrice: 4999,
    discount: '50% off',
    price: 2499,
    emiText: 'EMI option available.',
    recommended: true,
    theme: 'dark',
    features: [
      'Expert assisted process',
      'Udyam Registration Certificate in 24 hours',
      'Government GST Registration (Form REG-06)',
      '15-digit GSTIN allotment for e-commerce (Amazon, Flipkart)',
      'Zero balance current account with partner banks',
      '1 Year Accounting & Invoicing software license',
      'Dedicated relationship manager on WhatsApp',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'Complete solution for Sole Proprietorship',
    originalPrice: 9999,
    discount: '50% off',
    price: 4999,
    emiText: 'EMI option available.',
    recommended: false,
    theme: 'light',
    features: [
      'Dedicated Chartered Accountant manager',
      'Udyam Registration Certificate in 24 hours',
      'Government GST Registration (Form REG-06)',
      'Shop & Establishment / Trade License assistance',
      'GSTR-1 & 3B Return Filing for 6 months (up to 100 transactions)',
      'Zero balance current account with 7% interest',
      'Trademark Search & brand protection guidance',
      'ITR Filing advisory for 1 financial year (ITR-3/ITR-4)',
    ],
  },
];

export const FAQS = [
  {
    q: 'What is a Sole Proprietorship in India?',
    a: 'A Sole Proprietorship is the simplest, most popular, and most cost-effective business structure in India. It is owned, managed, and controlled by a single individual (the proprietor). There is no separate legal entity between the owner and the business, meaning it operates under the proprietor’s personal PAN with a legally certified Trade Name.',
  },
  {
    q: 'How is a Sole Proprietorship legally registered in India?',
    a: 'Unlike Private Limited companies or LLPs registered with the Ministry of Corporate Affairs (MCA), a Sole Proprietorship has no single central incorporation certificate. Instead, it is legally recognized through government tax and business registrations such as: (1) MSME / Udyam Registration, (2) GST Registration, and (3) State Shop & Establishment Act / Trade License. Having any two of these satisfies RBI’s KYC norms for opening a Business Current Account.',
  },
  {
    q: 'Can I start a Sole Proprietorship from my home?',
    a: 'Yes! You can register a Sole Proprietorship using your residential home address as the business office. All you need is an electricity bill or water bill for the address along with an NOC from the property owner (or family member if owned by parents/spouse).',
  },
  {
    q: 'Can a Sole Proprietorship open a Current Bank Account in the business name?',
    a: 'Yes. Reserve Bank of India (RBI) guidelines require any two government entity registrations in the trade name to open a Current Account. Our ₹2,499 Standard Plan provides both Udyam MSME and GST certificates, fulfilling 100% of the banking requirements across all major Indian banks like Axis, HDFC, ICICI, SBI, and Kotak.',
  },
  {
    q: 'Is GST registration mandatory for a Sole Proprietorship?',
    a: 'GST registration is mandatory if: (1) Your annual turnover exceeds ₹40 Lakhs (for goods) or ₹20 Lakhs (for services), (2) You sell goods or services interstate (outside your state), or (3) You sell through e-commerce platforms like Amazon, Flipkart, or Meesho. If you do not meet these conditions, you can start with just the ₹999 Udyam plan.',
  },
  {
    q: 'How is a Sole Proprietorship taxed in India?',
    a: 'A Sole Proprietorship is taxed at individual income tax slab rates under the proprietor’s personal PAN. Under the new tax regime, income up to ₹3 Lakhs is tax-free, and eligible rebates effectively exempt income up to ₹7 Lakhs. Additionally, small business owners can opt for presumptive taxation under Section 44AD (turnover up to ₹2–3 Crores) with no requirement to maintain complex books of accounts.',
  },
  {
    q: 'Can a Sole Proprietorship be converted into a Private Limited Company or LLP later?',
    a: 'Yes. As your business scales and you need to raise external venture capital or limit personal liability, you can easily convert your Sole Proprietorship into a Private Limited Company or LLP with zero disruption to your existing trade name and customer contracts.',
  },
  {
    q: 'How long does it take to complete the registration?',
    a: 'The MSME Udyam Registration is processed within 24 hours. GST Registration is typically approved by the tax officer within 3 to 7 working days based on Aadhaar OTP authentication.',
  },
  {
    q: 'Do I need to visit any government office?',
    a: 'No. The entire process through BharatFiling is 100% online and paperless. You can upload scanned copies of your KYC documents, and our team handles all portal filings and deliveries digitally.',
  },
];
