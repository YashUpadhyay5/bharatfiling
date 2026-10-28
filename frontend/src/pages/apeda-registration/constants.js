// APEDA Registration Constants
// Statutory Reference: Agricultural and Processed Food Products Export Development Authority Act, 1985 (Act No. 2 of 1986)
// Foreign Trade (Development and Regulation) Act, 1992 & Foreign Trade Policy (FTP)
// Directorate General of Foreign Trade (DGFT) e-RCMC Portal Guidelines

export const APEDA_SCHEDULED_CATEGORIES = [
  {
    id: 'fruits_veg',
    name: 'Fruits, Vegetables & their Products',
    icon: '🍎',
    badge: 'Fresh & Processed',
    hsn: 'Chapters 07, 08, 20',
    description: 'Fresh mangoes, grapes, bananas, onions, potatoes, canned fruits, fruit pulps, jams, jellies, and dried vegetables.',
    popularItems: ['Alphonso Mangoes', 'Thompson Grapes', 'Red Onions', 'Fruit Concentrates', 'Frozen Vegetables'],
  },
  {
    id: 'cereals',
    name: 'Cereals & Cereal Products (Basmati & Non-Basmati)',
    icon: '🌾',
    badge: 'Second Schedule (GI)',
    hsn: 'Chapters 10, 11, 19',
    description: 'Traditional & Pusa Basmati rice, non-basmati parboiled rice, wheat, Indian millets (Shree Anna), and cereal preparations.',
    popularItems: ['1121 Basmati Rice', 'Sona Masoori', 'Finger Millet (Ragi)', 'Pearl Millet (Bajra)', 'Wheat Flour'],
  },
  {
    id: 'meat_poultry',
    name: 'Meat, Poultry & Dairy Products',
    icon: '🥩',
    badge: 'FSSAI / APEDA Certified',
    hsn: 'Chapters 02, 04, 16',
    description: 'Boneless buffalo meat, sheep & goat meat, egg powder, table eggs, ghee, butter, skimmed milk powder, and casein.',
    popularItems: ['Frozen Boneless Buffalo Meat', 'Desi Ghee', 'SMP', 'Pasteurized Whole Egg Powder', 'Poultry Cuts'],
  },
  {
    id: 'confectionery',
    name: 'Confectionery, Biscuits & Bakery Products',
    icon: '🍪',
    badge: 'Processed Foods',
    hsn: 'Chapter 19',
    description: 'Glucose biscuits, wafers, cookies, chocolate confectionery, sugar candies, hard boiled sweets, and traditional sweets.',
    popularItems: ['Malted Biscuits', 'Cookies & Rusks', 'Sugar Candies', 'Cereal Bars', 'Wafer Rolls'],
  },
  {
    id: 'honey_sugar',
    name: 'Honey, Jaggery & Sugar Products',
    icon: '🍯',
    badge: 'Natural & Organic',
    hsn: 'Chapters 04, 17',
    description: 'Natural pure honey, organic jaggery powder, cane jaggery blocks, raw organic sugar, and sugar syrups.',
    popularItems: ['Mustard Honey', 'Wild Forest Honey', 'Organic Jaggery Powder', 'Sugar Cane Molasses', 'Invert Sugar'],
  },
  {
    id: 'cocoa',
    name: 'Cocoa & its Products, Chocolates',
    icon: '🍫',
    badge: 'Value-Added',
    hsn: 'Chapter 18',
    description: 'Cocoa beans, cocoa butter, cocoa mass, chocolate bars, industrial chocolates, and cocoa-based beverage preparations.',
    popularItems: ['Fermented Cocoa Beans', 'Cocoa Butter', 'Dark Chocolate', 'Drinking Chocolate Powder'],
  },
  {
    id: 'beverages',
    name: 'Alcoholic & Non-Alcoholic Beverages',
    icon: '🧃',
    badge: 'Bottled & Packaged',
    hsn: 'Chapter 22',
    description: 'Fruit juices, packaged tender coconut water, energy drinks, Indian single malt whisky, rum, beer, and Indian wines.',
    popularItems: ['Mango Nectar', 'Tender Coconut Water', 'Single Malt Whisky', 'Craft Gins', 'Nashik Valley Wines'],
  },
  {
    id: 'nuts_seeds',
    name: 'Groundnuts, Peanuts & Walnuts',
    icon: '🥜',
    badge: 'Aflatoxin-Tested',
    hsn: 'Chapters 12, 20',
    description: 'HPS groundnuts (Java & Bold varieties), roasted peanuts, peanut butter, in-shell walnuts, and walnut kernels.',
    popularItems: ['Java Groundnuts (50/60)', 'Bold Peanuts', 'Kashmiri Walnuts', 'Creamy Peanut Butter'],
  },
  {
    id: 'pickles_papads',
    name: 'Pickles, Papads & Chutneys',
    icon: '🌶️',
    badge: 'Ethnic Indian Foods',
    hsn: 'Chapters 20, 21',
    description: 'Traditional mango, lime, and chilli pickles, roasted/fried papads, mango chutneys, cooking pastes, and curry pastes.',
    popularItems: ['Mango Pickle in Mustard Oil', 'Urad Dal Papads', 'Sweet Mango Chutney', 'Ginger Garlic Paste'],
  },
  {
    id: 'guar_gum',
    name: 'Guar Gum, Herbal & Medicinal Plants',
    icon: '🌿',
    badge: 'Industrial & Pharma',
    hsn: 'Chapters 12, 13, 14',
    description: 'Fast-hydrating guar gum powder, food-grade guar splits, senna leaves, ashwagandha, psyllium husk, and herbal extracts.',
    popularItems: ['Food Grade Guar Gum (5000 CPS)', 'Psyllium Husk 99%', 'Organic Ashwagandha Root', 'Senna Pods'],
  },
  {
    id: 'floriculture',
    name: 'Floriculture, Seeds & Plants',
    icon: '🌸',
    badge: 'Phytosanitary Compliant',
    hsn: 'Chapter 06',
    description: 'Cut roses, carnations, gerberas, dry flowers, foliage, vegetable seeds for planting, tissue culture plants, and bulbs.',
    popularItems: ['Dutch Cut Roses', 'Dry Flowers Potpourri', 'Hybrid Tomato Seeds', 'Tissue Culture Banana Plants'],
  },
];

export const EXPORTER_TYPES = [
  {
    id: 'merchant',
    title: 'Merchant Exporter',
    badge: 'Trader / Non-Manufacturing',
    eligibility: 'Exporters who procure scheduled goods from domestic manufacturers, farmers, or markets to export under their own brand.',
    prerequisites: ['Active DGFT Import Export Code (IEC)', 'Entity PAN & Business Proof', 'Bank Account Verification Certificate'],
    suitableFor: 'Trading houses, export-import startups, wholesalers, and aggregators.',
  },
  {
    id: 'manufacturer',
    title: 'Manufacturer Exporter',
    badge: 'With Processing / Factory Unit',
    eligibility: 'Exporters who own or operate their own processing, packaging, or manufacturing facility for scheduled food products.',
    prerequisites: ['Active DGFT IEC', 'Manufacturing License (FSSAI State/Central, Udyam, or Factory License)', 'Pollution Control / DIC NOC'],
    suitableFor: 'Food processing factories, rice mills, dairy plants, meat abattoirs, and packaging units.',
  },
  {
    id: 'fpo',
    title: 'Farmer Producer Organization (FPO / FPC)',
    badge: 'Cooperative / Farmer Cluster',
    eligibility: 'Farmer producer companies, cooperatives, and agricultural societies directly exporting member-harvested crops.',
    prerequisites: ['Active DGFT IEC', 'FPC Incorporation Certificate / Cooperative Registration', 'Direct Farm Cluster Aggregation Proof'],
    suitableFor: 'Farmer producer groups, horticulture cooperatives, and rural organic farming clusters.',
  },
];

export const APEDA_DOCUMENTS = [
  {
    category: 'merchant',
    title: 'Documents for Merchant Exporters',
    badge: 'Standard KYC & Banking',
    documents: [
      { name: 'Import Export Code (IEC)', options: 'Self-attested copy of valid 10-digit IEC issued by DGFT.' },
      { name: 'Bank Certificate (Format IX)', options: 'Duly signed and stamped Bank Account Certificate or cancelled cheque of current account.' },
      { name: 'Entity PAN Card', options: 'PAN of Company, LLP, Partnership Firm, or Individual Proprietor.' },
      { name: 'Business Incorporation / Registration Proof', options: 'COI from MCA, registered Partnership Deed, or GST Registration Certificate (REG-06).' },
      { name: 'Address Proof of Registered Office', options: 'Utility bill (electricity/telephone) under 2 months old or registered rent agreement.' },
      { name: 'Authorised Signatory KYC', options: 'Aadhaar Card and Passport-size photograph of Director / Partner / Proprietor.' },
    ],
  },
  {
    category: 'manufacturer',
    title: 'Documents for Manufacturer Exporters',
    badge: 'Facility & Quality Licenses',
    documents: [
      { name: 'Import Export Code (IEC)', options: 'Valid 10-digit IEC reflecting manufacturing premises address.' },
      { name: 'FSSAI License (State or Central)', options: 'Valid FSSAI manufacturing license covering the specific scheduled food product categories.' },
      { name: 'Factory License / MSME Udyam Registration', options: 'Factory registration from Directorate of Industrial Safety or Udyam Certificate showing manufacturing activity.' },
      { name: 'Bank Account Certificate', options: 'Official bank certificate verifying active business current account details.' },
      { name: 'State Pollution Control Board NOC', options: 'Consent to Operate (CTO) or valid environmental clearance for the manufacturing plant.' },
      { name: 'Machinery & Capacity Statement', options: 'Self-certified list of installed processing equipment, annual production capacity, and packhouse facilities.' },
    ],
  },
  {
    category: 'fpo',
    title: 'Documents for Farmer Producer Organizations (FPOs)',
    badge: 'Farmer Collectives',
    documents: [
      { name: 'Import Export Code (IEC)', options: 'DGFT IEC allotted in the legal name of the Farmer Producer Company.' },
      { name: 'ROC Certificate of Incorporation', options: 'COI under Part IXA of the Companies Act, 2013 indicating Producer Company status.' },
      { name: 'Board Resolution for RCMC', options: 'Certified board resolution authorizing a nominated Director to apply for APEDA registration.' },
      { name: 'Bank Certificate of FPO Account', options: 'Bank statement or certified bank certificate in the FPC name.' },
      { name: 'Member Farmer List & Land Holding Summary', options: 'Summary sheet of shareholder farmers, cropping pattern, and crop acreage.' },
    ],
  },
];

export const FINANCIAL_ASSISTANCE_SCHEMES = [
  {
    id: 'infra',
    title: 'Infrastructure Development Scheme',
    icon: '🏭',
    subsidy: 'Up to 40% (Max ₹1.5 - ₹2.5 Crore)',
    objective: 'Minimizes post-harvest loss, builds cold-chain logistics, and automates packaging.',
    eligibleItems: [
      'Packhouses with mechanized grading & sorting lines',
      'Pre-cooling facilities, cold storages & CA stores',
      'Reefer vans & refrigerated container trucks',
      'Intermediate storage sheds and vapor heat treatment (VHT) plants',
    ],
  },
  {
    id: 'quality',
    title: 'Quality Development & Certification Scheme',
    icon: '🔬',
    subsidy: 'Up to 50% Reimbursement',
    objective: 'Helps exporters meet strict European, US-FDA, and Codex food safety standards.',
    eligibleItems: [
      'Implementation of ISO 22000, HACCP, BRC, and GlobalGAP standards',
      'Setting up in-house quality testing laboratories',
      'Residue monitoring and heavy metal testing equipment',
      'Traceability software and barcoding implementations',
    ],
  },
  {
    id: 'market',
    title: 'Market Development & Promotion Scheme',
    icon: '🌐',
    subsidy: 'Up to 40% (Subsidized Stall & Travel)',
    objective: 'Accelerates global market access through international buyer-seller connects.',
    eligibleItems: [
      'Participation in international food expos (Gulfood, Anuga, SIAL)',
      'Buyer-Seller Meets (BSMs) and trade delegations',
      'International brand promotion, packaging development & shelf-life trials',
      'Overseas IP registration and patent protection for food products',
    ],
  },
];

export const APEDA_STEPS = [
  {
    step: '01',
    title: 'IEC Verification & Category Selection',
    desc: 'Verify your 10-digit DGFT IEC and select your scheduled product lines and exporter category (Merchant or Manufacturer).',
  },
  {
    step: '02',
    title: 'Document Vetting by Export Specialist',
    desc: 'Our CA and DGFT consultants verify your Bank Certificate (Format IX), PAN, and manufacturing permits to ensure zero portal rejections.',
  },
  {
    step: '03',
    title: 'Online Filing on DGFT e-RCMC Portal',
    desc: 'Application is drafted and submitted via the unified DGFT / APEDA e-RCMC platform with Digital Signature Certificate (DSC) mapping.',
  },
  {
    step: '04',
    title: 'Government Statutory Fee Payment',
    desc: 'Official APEDA statutory registration fee (₹5,000 + 18% GST = ₹5,900) is paid via the integrated Bharatkosh / DGFT gateway.',
  },
  {
    step: '05',
    title: 'Official 5-Year e-RCMC Issuance',
    desc: 'APEDA scrutinizes and issues your official Registration-Cum-Membership Certificate (e-RCMC) valid for 5 years across India.',
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Siddharth Rao',
    role: 'Director at InnovEdge Technologies',
    rating: 5,
    text: 'A supportive and efficient team to work with. Always prompt, clear, and respectful in communication. It\'s been a pleasure to work with them on our agri-export licensing and RCMC filing. Handled our DGFT integration without a single hitch!',
  },
  {
    id: 2,
    name: 'Ananya Sharma',
    role: 'Founder at GreenEarth Spices & Agro',
    rating: 5,
    text: 'Getting APEDA RCMC was our primary hurdle for exporting organic turmeric and honey to Europe. BharatFiling managed our FSSAI linkage, bank certificates, and got our certificate approved in just 4 days. Highly recommended!',
  },
  {
    id: 3,
    name: 'Kavitha Balasubramanian',
    role: 'Managing Partner at Deccan Fruits Export LLP',
    rating: 5,
    text: 'Exceptional transparency and legal depth. The team explained the exact difference between merchant and manufacturer exporter and helped us claim our packhouse export subsidy under the APEDA Infrastructure scheme.',
  },
];

export const TRUSTED_PARTNERS = [
  { name: 'HDFC Bank', category: 'Banking Partner' },
  { name: 'ICICI Bank', category: 'Export Trade Finance' },
  { name: 'Amazon Global Selling', category: 'Agri B2B Marketplace' },
  { name: 'BigBasket', category: 'Procurement Supply Chain' },
  { name: 'Tata Consumer Products', category: 'Agri-Commodity Enterprise' },
  { name: 'Reliance Retail', category: 'Distribution Partner' },
  { name: 'ITC Agri Business', category: 'Export Farm Linkage' },
];

export const TRUST_STATS = [
  { value: '4.6 ★★★★★', label: 'Verified Reviews', sublabel: 'Over 22,000+ ratings' },
  { value: '15+ Years', label: 'Of Experience', sublabel: 'Licensed DGFT & Export Firm' },
  { value: '45,000+', label: 'Agri-Exporters Registered', sublabel: 'Across all 28 Indian States' },
  { value: '100% Online', label: 'DGFT e-RCMC Filing', sublabel: '5-Year Government Certificate' },
];

export const LANGUAGES = [
  'English',
  'Hindi',
  'Kannada',
  'Tamil',
  'Telugu',
  'Marathi',
  'Gujarati',
  'Bengali',
];

export const APEDA_FAQS = [
  {
    q: 'What is APEDA registration and what is an RCMC?',
    a: 'APEDA stands for Agricultural and Processed Food Products Export Development Authority, a statutory body under the Ministry of Commerce and Industry. Registration with APEDA grants you the Registration-Cum-Membership Certificate (RCMC). Under the Foreign Trade Policy, holding an APEDA RCMC is mandatory for any individual, firm, or company looking to export scheduled agricultural and processed food products from India.'
  },
  {
    q: 'Is APEDA registration mandatory if I already hold an Import Export Code (IEC)?',
    a: 'Yes. An IEC from DGFT is only the generic permission to import or export goods in India. To export specific scheduled food products (such as fruits, vegetables, rice, meat, honey, processed beverages, and confectionery), Section 12 of the APEDA Act mandates that you must obtain an RCMC from APEDA as the competent registering authority.'
  },
  {
    q: 'What is the government fee and validity of an APEDA RCMC certificate?',
    a: 'The official statutory registration fee prescribed by APEDA is ₹5,000 plus 18% GST (total ₹5,900), payable online via the DGFT / APEDA payment portal. Once approved, an APEDA RCMC is valid for 5 financial years from the date of issuance.'
  },
  {
    q: 'What is the difference between a Merchant Exporter and a Manufacturer Exporter?',
    a: 'A Merchant Exporter purchases scheduled agricultural or processed food goods from local farmers, suppliers, or domestic processors and exports them under their trade name without owning a factory. A Manufacturer Exporter owns or leases a processing plant, packhouse, or factory and must provide a valid manufacturing license (such as FSSAI State/Central license, factory license, or pollution NOC).'
  },
  {
    q: 'What products are covered under the APEDA Scheduled Products list?',
    a: 'APEDA covers 14 primary product schedules comprising over 800+ tariff lines: Fresh Fruits and Vegetables, Basmati & Non-Basmati Rice, Cereals & Millets, Meat & Poultry Products, Dairy Products, Confectionery & Bakery, Honey & Jaggery, Cocoa Products, Alcoholic & Non-Alcoholic Beverages, Groundnuts & Walnuts, Pickles, Papads & Chutneys, Guar Gum, Floriculture & Seeds, and Herbal & Medicinal Plants.'
  },
  {
    q: 'How long does it take to get an APEDA RCMC certificate online?',
    a: 'Once all documents (IEC, Bank Certificate in Format IX, and PAN) are uploaded and submitted on the unified DGFT e-RCMC portal, APEDA officials typically review and issue the digital certificate within 5 to 7 working days. With BharatFiling\'s CA vetting, applications are prepared within 24 hours to prevent official queries.'
  },
  {
    q: 'What financial subsidies and assistance schemes does APEDA offer?',
    a: 'Under its Financial Assistance Schemes (FAS), APEDA offers up to 40% to 50% capital subsidies for setting up export infrastructure (packhouses, cold storages, reefer vans), up to 50% reimbursement for food safety certifications (HACCP, ISO 22000, organic certification), and subsidized participation in global food trade fairs (Gulfood, Anuga, SIAL).'
  },
  {
    q: 'Can a Farmer Producer Organization (FPO) or Cooperative apply for APEDA?',
    a: 'Yes! APEDA actively encourages Farmer Producer Organizations (FPOs), Farmer Producer Companies (FPCs), and agricultural cooperatives to obtain RCMC and export directly to eliminate middlemen and secure higher remuneration for local farmers.'
  },
  {
    q: 'What is the Bank Certificate (Format IX) required for APEDA registration?',
    a: 'Format IX is the official Bank Certificate issued by an authorized commercial bank on their official letterhead. It verifies that your business maintains an active current account with authorized foreign exchange capabilities and confirms the account number, IFSC code, and signatory details.'
  },
  {
    q: 'Can I export Basmati Rice without APEDA registration?',
    a: 'No. Basmati Rice is listed under the Second Schedule of the APEDA Act with strict Geographical Indication (GI) protection. All Basmati rice shipments from India require mandatory APEDA registration and verification to ensure quality standards and authenticity.'
  },
  {
    q: 'Can an APEDA certificate be updated or amended after issuance?',
    a: 'Yes. If your business changes its registered address, adds new partners/directors, expands to new scheduled product lines, or opens new manufacturing units, you can apply for an RCMC Amendment on the DGFT portal with supporting documentation.'
  },
  {
    q: 'What happens if I export scheduled food products without an APEDA RCMC?',
    a: 'Customs authorities at Indian ports (ICDs and air cargo complexes) will strictly block your shipping bill from being filed or cleared under the Indian Customs EDI system. Operating without a valid RCMC also forfeits all export incentives, duty drawback benefits, and RoDTEP claims.'
  },
];
