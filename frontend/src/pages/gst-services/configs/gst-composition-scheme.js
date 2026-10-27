export default {
  slug: 'gst-composition-scheme',
  name: 'GST Composition Scheme',
  referText: 'Know a small business owner paying too much GST? Share this page with them.',

  hero: {
    title: 'GST Composition Scheme Registration',
    intro:
      'The Composition Scheme lets small businesses pay GST at a low fixed rate on turnover and file fewer returns. Our experts check your eligibility, file Form CMP-02 and set up the compliance you need after opting in.',
    points: [
      'Eligibility check for traders, manufacturers, restaurants and service providers.',
      'Form CMP-02 filed on time, with ITC-03 guidance for stock reversal.',
      'Quarterly CMP-08 and annual GSTR-4 support so you stay compliant all year.',
    ],
    formTitle: 'Opt for Composition with Experts',
  },

  sections: [
    {
      type: 'table',
      title: ['Composition Scheme ', 'Tax Rates', ' & Limits'],
      subtitle:
        'Rates are total CGST + SGST on turnover. The ₹1.5 crore limit is ₹75 lakh in certain special category states.',
      columns: ['Business Type', 'Turnover Limit (Previous Year)', 'GST Rate'],
      rows: [
        ['Traders', 'Up to ₹1.5 crore', '1% of turnover of taxable supplies'],
        ['Manufacturers', 'Up to ₹1.5 crore', '1% of turnover'],
        ['Restaurants (not serving alcohol)', 'Up to ₹1.5 crore', '5% of turnover'],
        ['Service providers', 'Up to ₹50 lakh', '6% of turnover'],
      ],
    },
    {
      type: 'cards',
      title: ['Things to Know ', 'Before Opting In', ''],
      subtitle: 'Composition keeps compliance simple, but it comes with conditions.',
      items: [
        { title: 'No tax collection', desc: 'You cannot charge GST on your bills. You issue a bill of supply and pay the tax yourself.' },
        { title: 'No input tax credit', desc: 'ITC on purchases cannot be claimed, and ITC on stock held must be reversed through Form ITC-03.' },
        { title: 'No inter-state sales of goods', desc: 'Composition dealers cannot make inter-state outward supplies of goods.' },
        { title: 'Simple returns', desc: 'Pay tax quarterly through CMP-08 and file one annual return, GSTR-4.' },
      ],
      note: 'Existing taxpayers must file Form CMP-02 before the start of the financial year (by 31st March) to opt in for that year.',
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'Opting In', ''],
      items: [
        { title: 'GSTIN & Portal Login', desc: 'To file CMP-02 on the GST portal.' },
        { title: 'Previous Year Turnover', desc: 'Aggregate turnover of the last financial year, to confirm eligibility.' },
        { title: 'Stock Statement', desc: 'Stock held on the day before opting in, for ITC-03.' },
        { title: 'Nature of Supplies', desc: 'The goods or services you sell.' },
        { title: 'Purchase Records', desc: 'To work out any credit that must be reversed.' },
        { title: 'Authorised Signatory KYC', desc: 'PAN and Aadhaar of the person signing the application.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Move You to Composition', ''],
      items: [
        { title: 'Eligibility Check', desc: 'Turnover, business type and supplies are checked first.' },
        { title: 'CMP-02 Filing', desc: 'The opt-in application is filed on the GST portal.' },
        { title: 'Stock & ITC-03', desc: 'Credit on stock held is worked out and reversed.' },
        { title: 'Billing Setup', desc: 'Bill of supply format with the composition declaration.' },
        { title: 'Ongoing Returns', desc: 'CMP-08 every quarter and GSTR-4 every year.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'Who is eligible for the Composition Scheme?',
      a: 'Taxpayers whose aggregate turnover in the previous financial year was up to ₹1.5 crore (₹75 lakh in certain special category states). Service providers can use a separate composition option if their turnover is up to ₹50 lakh.',
    },
    {
      q: 'Who cannot opt for the Composition Scheme?',
      a: 'Businesses making inter-state outward supplies of goods, suppliers of goods not taxable under GST, casual and non-resident taxable persons, and manufacturers of notified goods such as ice cream, pan masala and tobacco products.',
    },
    {
      q: 'Can I issue a tax invoice under composition?',
      a: 'No. Composition taxpayers issue a bill of supply and must state "composition taxable person, not eligible to collect tax on supplies" on it.',
    },
    {
      q: 'Which returns does a composition dealer file?',
      a: 'Form CMP-08 every quarter by the 18th of the month after the quarter, and Form GSTR-4 once a year by 30th April after the financial year.',
    },
    {
      q: 'When can I opt in?',
      a: 'Existing taxpayers file Form CMP-02 before the start of the financial year. New applicants can choose the scheme in their GST registration application.',
    },
    {
      q: 'Can I leave the scheme later?',
      a: 'Yes. You can opt out by filing Form CMP-04, and you must leave the scheme if your turnover crosses the limit during the year.',
    },
  ],

  questionnaire: {
    headline: ['Switch to the Composition Scheme', 'in 2 Working Days*'],
    tagline: 'Lower tax rates and fewer returns for small businesses.',
    points: [
      { title: 'Eligibility First', sub: 'We confirm you qualify before anything is filed.' },
      { title: 'Timely CMP-02 Filing', sub: 'Filed before the financial year deadline.' },
      { title: 'Year-round Support', sub: 'CMP-08 and GSTR-4 handled for you.' },
    ],
    questions: [
      {
        id: 'businessType',
        type: 'radio',
        summaryLabel: 'Business',
        label: 'What type of business do you run?',
        options: [
          { value: 'trader', label: 'Trader' },
          { value: 'manufacturer', label: 'Manufacturer' },
          { value: 'restaurant', label: 'Restaurant (not serving alcohol)' },
          { value: 'services', label: 'Service provider' },
        ],
      },
      {
        id: 'turnover',
        type: 'select',
        summaryLabel: 'Turnover',
        label: 'What was your turnover in the last financial year?',
        options: [
          { value: 'upto-50l', label: 'Up to ₹50 lakh' },
          { value: '50l-1.5cr', label: '₹50 lakh – ₹1.5 crore' },
          { value: 'above-1.5cr', label: 'More than ₹1.5 crore' },
        ],
      },
    ],
  },

  plans: {
    defaultPlan: 'premium',
    items: [
      {
        id: 'standard',
        name: 'Standard',
        subtitle: 'For businesses that only need to opt in.',
        originalPrice: 1999,
        discountLabel: '50% off',
        price: 999,
        unit: 'one-time',
        features: [
          'Eligibility check',
          'Form **CMP-02** filing',
          'ITC-03 (stock reversal) guidance',
          'Bill of supply format',
          'Chat support',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        subtitle: 'Opt in plus a full year of composition returns.',
        originalPrice: 4999,
        discountLabel: '40% off',
        price: 2999,
        unit: 'for one financial year',
        recommended: true,
        features: [
          'Everything in Standard',
          '**CMP-08** filing for 4 quarters',
          '**GSTR-4** annual return',
          'Quarterly tax computation',
          '**Dedicated GST expert**',
        ],
      },
      {
        id: 'elite',
        name: 'Elite',
        subtitle: 'Complete compliance for the year, including income tax.',
        originalPrice: 7999,
        discountLabel: '37% off',
        price: 4999,
        unit: 'for one financial year',
        hasEmi: true,
        features: [
          'Everything in Premium',
          '**ITC-03** filing for stock reversal',
          'Quarterly compliance review',
          "**ITR filing** for one financial year (proprietor's return)",
          '**Dedicated account manager**',
        ],
      },
    ],
    notes: ['*The timeline starts once we receive complete documents.'],
    hint: (answers) => {
      if (answers.turnover === 'above-1.5cr') {
        return ['With turnover above ₹1.5 crore you are usually not eligible for the Composition Scheme. Our expert will confirm before anything is filed.'];
      }
      if (answers.businessType === 'services' && answers.turnover === '50l-1.5cr') {
        return ['Service providers can opt for composition only up to ₹50 lakh turnover. Our expert will confirm your eligibility first.'];
      }
      return [];
    },
  },
};
