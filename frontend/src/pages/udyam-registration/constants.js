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
      '73 - Advertising and market research': [
        '73100 - Advertising and digital marketing agencies',
        '73200 - Market research and public opinion polling',
      ],
    },
  },
};
