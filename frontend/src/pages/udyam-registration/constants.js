export const UDYAM_PRICING = {
  serviceName: 'UDYAM Registration (UDYAM + LEDGERS)',
  subtitle: 'Get UDYAM registration for your business with the LEDGERS platform to track compliance.',
  basePrice: 2899,
  gstAmount: 522,
  totalAmount: 3421,
  currency: 'INR',
  deliverables: [
    'Application Preparation',
    'Application Submission',
    'UDYAM Number',
    'UDYAM Certificate',
  ],
};

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export const ORGANIZATION_TYPES = [
  'Proprietorship',
  'Partnership',
  'Private Limited Company',
  'Limited Liability Partnership (LLP)',
  'One Person Company (OPC)',
  'Hindu Undivided Family (HUF)',
  'Public Limited Company',
  'Society / Trust / Club',
];

export const MAJOR_ACTIVITIES = ['Services', 'Manufacturing', 'Trading'];

export const NIC_HIERARCHY = {
  'A - Agriculture, Forestry And Fishing': {
    code: 'A',
    label: 'A - Agriculture, Forestry And Fishing',
    subDivisions: {
      '01 - Crop And Animal Production, Hunting': [
        '01111 - Growing of wheat',
        '01112 - Growing Of Jowar, Bajra And Millets',
        '01113 - Growing of maize',
        '01119 - Growing of other cereals n.e.c.',
        '01121 - Growing of leafy or stem vegetables',
        '01131 - Growing of sugar cane',
        '01141 - Growing of tobacco',
        '01161 - Growing of cotton',
        '01211 - Growing of grapes',
        '01411 - Raising of dairy cattle',
      ],
      '02 - Forestry and logging': [
        '02100 - Silviculture and other forestry activities',
        '02200 - Logging and harvesting of wood',
        '02300 - Gathering of non-wood forest products',
      ],
      '03 - Fishing and aquaculture': [
        '03111 - Marine fishing',
        '03121 - Freshwater fishing',
        '03211 - Marine aquaculture and shrimp farming',
        '03221 - Freshwater aquaculture',
      ],
    },
  },
  'C - Manufacturing': {
    code: 'C',
    label: 'C - Manufacturing',
    subDivisions: {
      '10 - Manufacture of food products': [
        '10101 - Processing and preserving of meat',
        '10301 - Processing of fruits and vegetables',
        '10501 - Manufacture of dairy products',
        '10611 - Grain milling and flour products',
        '10711 - Manufacture of bakery products and confectionery',
      ],
      '13 - Manufacture of textiles': [
        '13111 - Preparation and spinning of textile fibres',
        '13121 - Weaving of textiles and fabrics',
        '13911 - Manufacture of knitted and crocheted fabrics',
      ],
      '25 - Manufacture of fabricated metal products': [
        '25111 - Manufacture of metal structures and parts',
        '25910 - Forging, pressing, stamping and roll-forming of metal',
      ],
      '26 - Manufacture of computer, electronic and optical products': [
        '26201 - Manufacture of computers and peripheral equipment',
        '26301 - Manufacture of communication equipment',
      ],
    },
  },
  'G - Wholesale and retail trade; repair of motor vehicles': {
    code: 'G',
    label: 'G - Wholesale and retail trade; repair of motor vehicles',
    subDivisions: {
      '46 - Wholesale trade, except of motor vehicles': [
        '46101 - Wholesale on a fee or contract basis',
        '46201 - Wholesale of agricultural raw materials and live animals',
        '46301 - Wholesale of food, beverages and tobacco',
        '46411 - Wholesale of textiles, clothing and footwear',
        '46511 - Wholesale of computers, computer peripheral equipment and software',
      ],
      '47 - Retail trade, except of motor vehicles': [
        '47110 - Retail sale in non-specialized stores with food, beverages or tobacco',
        '47411 - Retail sale of computers, peripheral units and telecommunications equipment',
        '47511 - Retail sale of textiles in specialized stores',
        '47711 - Retail sale of clothing and footwear in specialized stores',
        '47911 - Retail sale via mail order houses or via Internet (E-commerce)',
      ],
    },
  },
  'J - Information and communication': {
    code: 'J',
    label: 'J - Information and communication',
    subDivisions: {
      '62 - Computer programming, consultancy and related activities': [
        '62011 - Writing of computer programmes for software',
        '62012 - Custom software development and deployment',
        '62020 - Computer consultancy and computer facilities management',
        '62099 - Other information technology and computer service activities n.e.c.',
      ],
      '63 - Information service activities': [
        '63111 - Data processing, hosting and related activities',
        '63120 - Web portals, digital content and search engine operations',
      ],
    },
  },
  'M - Professional, scientific and technical activities': {
    code: 'M',
    label: 'M - Professional, scientific and technical activities',
    subDivisions: {
      '69 - Legal and accounting activities': [
        '69100 - Legal activities and advisory',
        '69201 - Accounting, bookkeeping and auditing activities; tax consultancy',
      ],
      '70 - Activities of head offices; management consultancy activities': [
        '70200 - Management consultancy, corporate business advisory',
      ],
      '71 - Architectural and engineering activities': [
        '71100 - Architectural and engineering activities and related technical consultancy',
      ],
      '73 - Advertising and market research': [
        '73100 - Advertising and digital marketing agencies',
        '73200 - Market research and public opinion polling',
      ],
      '74 - Other professional, scientific and technical activities': [
        '74101 - Interior design activities',
        '74201 - Commercial and portrait photography activities',
      ],
    },
  },
  'I - Accommodation and food service activities': {
    code: 'I',
    label: 'I - Accommodation and food service activities',
    subDivisions: {
      '55 - Accommodation': [
        '55101 - Hotels and motels with restaurant facilities',
        '55102 - Guest houses, homestays and bed & breakfast units',
        '55109 - Other short-stay accommodation services',
      ],
      '56 - Food and beverage service activities': [
        '56101 - Restaurants, cafes and fast food dining outlets',
        '56102 - Cloud kitchens and food delivery preparation',
        '56210 - Event catering and food service contractors',
        '56301 - Tea/coffee shops, juice bars and beverage outlets',
      ],
    },
  },
  'F - Construction': {
    code: 'F',
    label: 'F - Construction',
    subDivisions: {
      '41 - Construction of buildings': [
        '41001 - Construction of residential buildings',
        '41002 - Construction of non-residential and commercial buildings',
      ],
      '42 - Civil engineering': [
        '42101 - Construction of roads, highways and bridges',
        '42201 - Construction of utility projects for water and power',
      ],
      '43 - Specialized construction activities': [
        '43211 - Electrical installation and wiring',
        '43221 - Plumbing, heat and air-conditioning installation',
        '43301 - Building completion, plastering, painting and finishing',
      ],
    },
  },
  'H - Transportation and storage': {
    code: 'H',
    label: 'H - Transportation and storage',
    subDivisions: {
      '49 - Land transport and transport via pipelines': [
        '49211 - Urban and suburban passenger land transport (cabs/taxis)',
        '49231 - Freight transport by road (trucks and commercial carriers)',
      ],
      '52 - Warehousing and support activities for transportation': [
        '52101 - General warehousing and cold storage facilities',
        '52291 - Freight forwarding, logistics and customs clearance cargo handlers',
      ],
      '53 - Postal and courier activities': [
        '53200 - Courier and express parcel delivery activities',
      ],
    },
  },
  'N - Administrative and support service activities': {
    code: 'N',
    label: 'N - Administrative and support service activities',
    subDivisions: {
      '77 - Rental and leasing activities': [
        '77101 - Renting and operational leasing of passenger cars and motor vehicles',
        '77301 - Renting of construction and civil engineering machinery',
      ],
      '78 - Employment activities': [
        '78101 - Human resources and placement agency services',
        '78201 - Temporary employment agency and staffing activities',
      ],
      '79 - Travel agency, tour operator and other reservation services': [
        '79110 - Travel agency and flight/rail booking services',
        '79120 - Tour operator, holiday packaging and itinerary planning',
      ],
      '80 - Security and investigation activities': [
        '80100 - Private security guard and armed surveillance services',
      ],
      '81 - Services to buildings and landscape activities': [
        '81210 - General cleaning of buildings and corporate facilities',
        '81291 - Disinfection, pest control and sanitization services',
      ],
      '82 - Office administrative and business support activities': [
        '82110 - Combined office administrative services',
        '82200 - Activities of call centres and business process outsourcing (BPO)',
      ],
    },
  },
  'P - Education': {
    code: 'P',
    label: 'P - Education',
    subDivisions: {
      '85 - Education': [
        '85101 - Pre-primary and kindergarten education',
        '85211 - Secondary and higher secondary school education',
        '85301 - Higher education (colleges and technical universities)',
        '85411 - Sports, martial arts and recreational education',
        '85491 - Academic coaching institutes and competitive exam tutoring',
        '85499 - Online education platforms and e-learning portals',
      ],
    },
  },
  'Q - Human health and social work activities': {
    code: 'Q',
    label: 'Q - Human health and social work activities',
    subDivisions: {
      '86 - Human health activities': [
        '86101 - Hospital and nursing home activities',
        '86201 - General medical and doctor clinic practices',
        '86202 - Dental clinic and dental practice activities',
        '86901 - Diagnostic pathology labs and imaging scan centers',
        '86905 - Physiotherapy, occupational therapy and rehabilitation',
      ],
    },
  },
  'S - Other service activities': {
    code: 'S',
    label: 'S - Other service activities',
    subDivisions: {
      '95 - Repair of computers and personal and household goods': [
        '95111 - Repair and servicing of computers and laptops',
        '95120 - Repair of communication equipment and mobile phones',
        '95221 - Repair of household appliances and consumer electronics',
      ],
      '96 - Other personal service activities': [
        '96021 - Hairdressing, beauty parlours and salon services',
        '96022 - Spas, wellness massage and rejuvenation treatments',
        '96011 - Laundries, dry cleaners and garment pressing services',
      ],
    },
  },
};
