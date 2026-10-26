export const FSSAI_PLANS = [
  {
    id: 'starter',
    alias: 'basic',
    name: 'Starter',
    subtitle: 'Ideal for basic food license customers',
    originalPrice: 999,
    discountLabel: '₹200 off',
    discountPercent: 20,
    price: 799,
    govtFee: 100, // ₹100 per year
    gstRate: 0.18,
    tat: '3-5 Working Days',
    recommended: false,
    formType: 'Basic Registration',
    features: [
      '15-minutes call with food license experts',
      'Assistance with selecting the right license type',
      'Your food license application filing done',
      'Document validation by Food Safety Advocate',
      '14-Digit FoSCoS registration certificate delivery',
      'Food Safety Supervisor declaration guidance',
      'Annual FoSCoS compliance guidance',
    ],
  },
  {
    id: 'standard',
    alias: 'state',
    name: 'Standard',
    subtitle: 'Ideal for starting food business with basic food license + GST registration',
    originalPrice: 4999,
    discountLabel: '20% off',
    discountPercent: 20,
    price: 3999,
    govtFee: 100,
    gstRate: 0.18,
    tat: '5-7 Working Days',
    hasEmi: true,
    recommended: false,
    formType: 'Food License + GST Combo',
    features: [
      '15-minutes call with food license experts',
      'Assistance with selecting the right license type',
      'Your food license application filing done',
      'GST registration filing & ARN tracking',
      'Dedicated compliance manager for your food unit',
      'Assistance with FoSCoS department queries',
      'MSME / Udyam registration advisory',
    ],
  },
  {
    id: 'elite',
    alias: 'central',
    name: 'Elite',
    subtitle: 'Ideal for starting food business & protection of your brand',
    originalPrice: 7690,
    discountLabel: '35% off',
    discountPercent: 35,
    price: 4999,
    govtFee: 100,
    gstRate: 0.18,
    tat: '5-7 Working Days',
    hasEmi: true,
    recommended: true,
    formType: 'License + GST + Trademark Protection',
    features: [
      '15-minutes call with food license experts',
      'Assistance with selecting the right license type',
      'Your food license application filing done',
      'GST registration for food business',
      'Trademark search & brand protection filing',
      'Priority 48-hour filing with senior food law partner',
      'Annual food compliance & return filing guidance',
    ],
  },
];

export const getFssaiPlan = (planId = 'starter') => {
  const norm = String(planId).toLowerCase();
  const plan = FSSAI_PLANS.find(
    (p) => p.id === norm || p.alias === norm || (norm === 'basic' && p.id === 'starter') || (norm === 'state' && p.id === 'standard') || (norm === 'central' && p.id === 'elite')
  );
  return plan || FSSAI_PLANS[0];
};

export const FOOD_BUSINESS_TYPES = [
  {
    id: 'restaurant_cloud_kitchen',
    title: 'Restaurant, Cafe or Cloud Kitchen',
    description: 'Dine-in restaurants, cafes, cloud kitchens, bakeries, food trucks, sweet shops, tiffin services.',
    icon: 'Utensils',
    recommendedPlan: 'basic',
  },
  {
    id: 'manufacturer_processor',
    title: 'Food Manufacturer / Packaging Unit',
    description: 'Processing units, food packaging, spice grinding, flour mills, dairy/milk processing, beverage bottling.',
    icon: 'Factory',
    recommendedPlan: 'state',
  },
  {
    id: 'retailer_grocery',
    title: 'Retailer, Grocery or Supermarket',
    description: 'Kirana stores, supermarkets, fruit & vegetable vendors, meat & fish shops, packaged snack retail.',
    icon: 'Store',
    recommendedPlan: 'basic',
  },
  {
    id: 'wholesaler_distributor',
    title: 'Wholesaler, Distributor or Supplier',
    description: 'Bulk food distributors, grain merchants, FMCG wholesale stockists, food ingredient suppliers.',
    icon: 'Truck',
    recommendedPlan: 'state',
  },
  {
    id: 'caterer_event',
    title: 'Caterer, Canteen or Event Food Service',
    description: 'Outdoor wedding caterers, institutional/college canteens, corporate mess, event food operators.',
    icon: 'ChefHat',
    recommendedPlan: 'basic',
  },
  {
    id: 'importer_exporter',
    title: 'Food Importer / Exporter',
    description: 'Trading food products internationally, importing raw materials or exporting Indian food items.',
    icon: 'Globe',
    recommendedPlan: 'central',
  },
];

export const TURNOVER_BRACKETS = [
  {
    id: 'under_12_lakh',
    label: 'Below ₹12 Lakhs / Year',
    licenseType: 'Basic FSSAI Registration (Form A)',
    feeHint: 'Govt Fee: ₹100/year',
    recommendedPlan: 'basic',
  },
  {
    id: '12_to_20_crore',
    label: '₹12 Lakhs to ₹20 Crores / Year',
    licenseType: 'State FSSAI License (Form B)',
    feeHint: 'Govt Fee: ₹2,000/year',
    recommendedPlan: 'state',
  },
  {
    id: 'above_20_crore',
    label: 'Above ₹20 Crores / Year',
    licenseType: 'Central FSSAI License (Form B)',
    feeHint: 'Govt Fee: ₹7,500/year',
    recommendedPlan: 'central',
  },
  {
    id: 'head_office_multistate',
    label: 'Operating in 2 or more States',
    licenseType: 'Central FSSAI License (Head Office)',
    feeHint: 'Govt Fee: ₹7,500/year',
    recommendedPlan: 'central',
  },
];

export const VALIDITY_PERIODS = [
  { years: 1, label: '1 Year', discount: null, govtMultiplier: 1 },
  { years: 2, label: '2 Years', discount: 'Save 10%', govtMultiplier: 2 },
  { years: 3, label: '3 Years', discount: 'Save 15%', govtMultiplier: 3 },
  { years: 5, label: '5 Years (Maximum)', discount: 'Save 25% • Best Value', govtMultiplier: 5 },
];

export const FSSAI_DOCUMENTS = {
  basic: [
    'Passport-size photograph of the Food Business Operator (FBO)',
    'Government Photo ID proof (Aadhaar Card, PAN Card, or Voter ID)',
    'Proof of business premises (Electricity bill, water bill, or property tax receipt)',
    'Rent Agreement + NOC from property owner (if operating from rented premises)',
    'List of food product categories to be manufactured, stored, or sold',
    'Partnership Deed / Incorporation Certificate (for firms and companies)',
  ],
  state: [
    'All Basic Registration documents listed above',
    'Blueprint / Layout plan of the processing or kitchen unit with dimensions (sq. meters)',
    'List of Directors, Partners, or Executive Members with address and contact details',
    'Name and list of machinery and equipment with installed capacity and horsepower',
    'Potable water testing chemical and bacteriological analysis report from accredited lab',
    'Form IX: Nomination of Person Responsible for Food Safety (on company letterhead)',
    'NOC and Copy of Certificate from manufacturer (if operating as repacker or relabeller)',
  ],
  central: [
    'All State License documents listed above',
    'Directorate General of Foreign Trade (DGFT) issued Import Export Code (IEC)',
    'Ministry of Commerce Certificate for 100% Export Oriented Units (EOU), if applicable',
    'Source of raw material for milk, meat, and other perishable processing units',
    'Pesticide residue testing report of water for packaged drinking water units',
    'Declaration of turnover from Chartered Accountant verifying multi-state or >₹20Cr threshold',
    'NOC from local municipality, panchayat, or pollution control board',
  ],
};

export const FSSAI_FAQS = [
  {
    q: 'What is FSSAI Registration and who needs it?',
    a: 'FSSAI Registration is a mandatory legal authorization issued by the Food Safety and Standards Authority of India (FSSAI) under the Ministry of Health & Family Welfare. Every individual or business involved in manufacturing, processing, packaging, storing, transporting, distributing, or selling food products in India is statutorily required to obtain an FSSAI registration or license before commencing operations.',
  },
  {
    q: 'What is the difference between FSSAI Basic Registration, State License, and Central License?',
    a: 'The classification depends on business turnover and operational capacity: Basic Registration is for petty food manufacturers and small businesses with turnover below ₹12 Lakhs/year. State License is for medium-sized operations with turnover between ₹12 Lakhs and ₹20 Crores/year. Central License is for large enterprises with turnover above ₹20 Crores/year, food importers/exporters, or businesses operating across two or more states.',
  },
  {
    q: 'What are the penalties for running a food business without an FSSAI license?',
    a: 'Under Section 31 of the Food Safety and Standards Act 2006, operating any food business without a valid FSSAI license is a punishable offense carrying imprisonment of up to 6 months and a financial penalty of up to ₹5,00,000 (Rupees Five Lakhs). In addition, food safety officers have the legal authority to seize unapproved inventory and seal premises.',
  },
  {
    q: 'What is the validity period of an FSSAI License?',
    a: 'An FSSAI registration or license can be applied for a duration of 1 to 5 years at the discretion of the food business operator. Renewal applications must be submitted at least 30 days prior to the expiration date via the FoSCoS portal to avoid late renewal penalty fees of ₹100 per day.',
  },
  {
    q: 'Is GST registration mandatory to apply for an FSSAI license?',
    a: 'GST is not legally mandatory for Basic FSSAI registration if your annual turnover is below the GST exemption threshold (₹20 Lakhs for services / ₹40 Lakhs for goods). However, for State and Central licenses, GST registration is typically required as proof of legal business establishment.',
  },
  {
    q: 'Can I run a cloud kitchen or home bakery from a residential apartment?',
    a: 'Yes, home bakers, cloud kitchens, and tiffin services operating from residential apartments can legally obtain a Basic FSSAI Registration. You need a photo ID proof, an electricity bill of the residential address, and an NOC from the landlord (or society if required).',
  },
  {
    q: 'How will I receive my 14-digit FSSAI License Number and Certificate?',
    a: 'Once your application is scrutinized and approved on the government FoSCoS portal, a digitally signed FSSAI License Certificate containing your unique 14-digit number and QR code will be generated. BharatFiling will email you the official PDF certificate and it will remain permanently accessible in your BharatFiling Customer Dashboard.',
  },
  {
    q: 'Is a physical inspection of the kitchen or premises mandatory before license issuance?',
    a: 'For Basic FSSAI Registration (Form A), inspection is generally not required unless specifically flagged. For State and Central Licenses (Form B) involving large manufacturing, slaughtering, or high-risk food processing, a Food Safety Officer (FSO) may conduct an inspection to verify hygiene, potable water reports, and sanitary conditions.',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      'We launched our cloud kitchen across 3 locations in Bengaluru. BharatFiling handled our complete FSSAI State license and municipal compliance within 12 days. Truly seamless experience!',
    name: 'Chef Ananya Deshmukh',
    role: 'Founder & Head Chef, BowlKart Kitchens',
    location: 'Bengaluru, Karnataka',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'I run a home bakery and was terrified of government paperwork. The BharatFiling food safety advisor walked me through Form A, uploaded my documents, and got my 14-digit FSSAI number in 5 days flat.',
    name: 'Kavita Sundaram',
    role: 'Proprietor, Crumb & Crust Bakehouse',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'As a spice exporter, we needed a Central FSSAI License linked with our DGFT IEC code. BharatFiling coordinated the lab water reports and hazard analysis flawlessly. Highly recommended!',
    name: 'Rajeshwar Gokhale',
    role: 'Managing Director, Malabar Spice Exports Ltd.',
    location: 'Kochi, Kerala',
    rating: 5,
  },
];
