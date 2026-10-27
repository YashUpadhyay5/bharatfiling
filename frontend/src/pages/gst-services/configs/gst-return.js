export default {
  slug: 'gst-return',
  name: 'GST Return Filing',
  referText: 'Know a business owner who needs help with GST returns? Share this page with them.',

  hero: {
    title: 'GST Return Filing Online in India',
    intro:
      'Want to ensure accurate GST return filing while maximizing your input tax credit? Talk to our experts and let our CAs handle your GST returns effortlessly and on time. Trust us for reliable GST filing services.',
    points: [
      'Stay compliant with expert guidance for all your GST return filings - 100% Online',
      'File monthly GST returns online easily and on time with professional support.',
      'Error-free GSTR 9 submission and complete GST return management by experts.',
    ],
    formTitle: 'File Your GST Returns with Experts',
  },

  sections: [
    {
      type: 'table',
      title: ['Types of ', 'GST Returns', ' & Due Dates'],
      subtitle: 'Which returns you file depends on your registration type and turnover.',
      columns: ['Return', 'Who Files', 'What It Covers', 'Due Date'],
      rows: [
        ['GSTR-1', 'Regular taxpayers', 'Details of outward supplies (sales) invoice-wise.', '11th of next month (monthly) / 13th of month after quarter (QRMP)'],
        ['GSTR-3B', 'Regular taxpayers', 'Summary return with tax payment and input tax credit claimed.', '20th of next month (monthly) / 22nd or 24th after quarter (QRMP, by state)'],
        ['CMP-08', 'Composition dealers', 'Quarterly statement-cum-challan for self-assessed tax.', '18th of month after quarter'],
        ['GSTR-4', 'Composition dealers', 'Annual return for composition taxpayers.', '30th April after the financial year'],
        ['GSTR-9', 'Regular taxpayers (turnover above ₹2 crore mandatory)', "Annual return consolidating the year's monthly/quarterly returns.", '31st December after the financial year'],
        ['GSTR-9C', 'Taxpayers with turnover above ₹5 crore', 'Self-certified reconciliation statement between GSTR-9 and audited books.', '31st December after the financial year'],
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'GST Return Filing', ''],
      items: [
        { title: 'GSTIN & Portal Login', desc: 'Your GST number and GST portal credentials (or OTP access for filing).' },
        { title: 'Sales Invoices', desc: 'All B2B and B2C sales invoices issued during the return period.' },
        { title: 'Purchase Invoices', desc: 'Purchase bills from GST-registered suppliers to claim input tax credit.' },
        { title: 'Credit & Debit Notes', desc: 'Any credit or debit notes issued or received during the period.' },
        { title: 'E-way Bills & Export Docs', desc: 'E-way bills, shipping bills or LUT details if applicable.' },
        { title: 'Bank Statement', desc: 'For reconciliation of tax payments and transactions.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'File Your GST Returns', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us your industry and turnover and pick a plan in under a minute.' },
        { title: 'Upload Data', desc: 'Share sales and purchase invoices or your accounting export.' },
        { title: 'ITC Reconciliation', desc: 'Our CA matches purchases with GSTR-2B to maximise eligible credit.' },
        { title: 'Review & Approve', desc: 'You review the prepared GSTR-1 and GSTR-3B before anything is filed.' },
        { title: 'Filing & ARN', desc: 'Returns are filed on the GST portal and the ARN is shared with you.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'Who needs to file GST returns?',
      a: 'Every person registered under GST must file returns, even if there were no sales or purchases in a period. Nil returns are still mandatory for registered taxpayers with no activity.',
    },
    {
      q: 'What is the difference between GSTR-1 and GSTR-3B?',
      a: 'GSTR-1 reports invoice-level details of your outward supplies (sales). GSTR-3B is a summary return where you declare total sales, claim input tax credit and pay the net tax liability.',
    },
    {
      q: 'What is the QRMP scheme?',
      a: 'The Quarterly Return Monthly Payment (QRMP) scheme lets taxpayers with aggregate turnover up to ₹5 crore file GSTR-1 and GSTR-3B quarterly while paying tax monthly through challan PMT-06.',
    },
    {
      q: 'What is the penalty for late filing of GST returns?',
      a: 'A late fee of ₹50 per day (₹25 CGST + ₹25 SGST) applies for GSTR-3B and GSTR-1, reduced to ₹20 per day for nil returns, subject to turnover-based caps. Interest at 18% per annum is also charged on tax paid late.',
    },
    {
      q: 'Can I claim input tax credit if my supplier has not filed GSTR-1?',
      a: "Input tax credit is generally available only for invoices that appear in your GSTR-2B, which is generated from your suppliers' GSTR-1 filings. Our experts reconcile your purchase register with GSTR-2B every period so you do not miss eligible credit.",
    },
    {
      q: 'Can I revise a GST return after filing?',
      a: 'GST returns cannot be revised once filed. Errors are corrected through amendments in the return of a subsequent period, which is why accurate filing the first time matters.',
    },
    {
      q: 'How does BharatFiling handle my GST return filing?',
      a: 'A dedicated CA collects your sales and purchase data, reconciles input tax credit against GSTR-2B, prepares the returns, shares them for your approval and files them on the GST portal before the due date.',
    },
  ],

  questionnaire: {
    headline: ['Over 1 Lakh', 'GST Returns Filed Successfully'],
    tagline: 'Gain input tax credit & avoid all penalties',
    points: [
      { title: 'File your returns in just 24hrs', sub: 'With our experts its simpler, easier' },
      { title: '24x7 expert support', sub: 'Minimize challenges & maximize productivity' },
      { title: '100% online process', sub: 'Start filing returns from the comfort of your home' },
    ],
    questions: [
      {
        id: 'industryType',
        type: 'suggest',
        summaryLabel: 'Industry',
        label: 'What is your industry type ?',
        placeholder: 'Enter your industry (e.g.food, E-commerce)',
        hint: "If your industry isn't listed, just type it in.",
        suggestions: [
          'Food & Beverages',
          'E-commerce',
          'Retail',
          'Wholesale / Trading',
          'Manufacturing',
          'IT & Software Services',
          'Consulting & Professional Services',
          'Construction & Real Estate',
          'Healthcare & Pharma',
          'Education & Training',
          'Transport & Logistics',
          'Textiles & Apparel',
          'Travel & Tourism',
          'Media & Advertising',
          'Restaurants & Hospitality',
        ],
      },
      {
        id: 'turnover',
        type: 'select',
        summaryLabel: 'Turnover',
        label: 'What is your estimated turnover ?',
        options: [
          { value: '0-1L', label: '0 - 1 Lakhs' },
          { value: '1L-10L', label: '1 Lakhs - 10 Lakhs' },
          { value: '10L-1Cr', label: '10 Lakhs - 1 crore' },
          { value: '1Cr+', label: 'More than 1 crore' },
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
        subtitle: '3-Month Trial Plan for GSTR Filing',
        originalPrice: 1499,
        discountLabel: '33% off',
        price: 999,
        features: ['Expert-assisted process', 'GSTR-1 & GSTR-3B filing for 3 months (Only Nil Transactions)'],
      },
      {
        id: 'premium',
        name: 'Premium',
        subtitle: 'Comprehensive package including both GST registration and GSTR filing for seamless business operations.',
        originalPrice: 4599,
        discountLabel: '35% off',
        price: 2999,
        hasEmi: true,
        recommended: true,
        features: ['Expert assisted process', 'GSTR-1 & 3B for 12 months (Upto 200 transactions or turnover of 10 lakhs)'],
      },
      {
        id: 'elite',
        name: 'Elite',
        subtitle: 'All-inclusive solution for tax return filing, aimed at maximizing tax credits.',
        originalPrice: 7499,
        discountLabel: '30% off',
        price: 4999,
        hasEmi: true,
        features: [
          'Dedicated account manager',
          'Expert assisted process',
          'GSTR-1 & 3B for 12 months (Upto 300 transactions or turnover of 30 lakhs)',
          '**ITR Filing** for one Financial year (Upto 30 lakhs)',
        ],
      },
    ],
    hint: (answers) =>
      ['10L-1Cr', '1Cr+'].includes(answers.turnover)
        ? ['Our plans cover a turnover of up to ₹30 lakh. For a higher turnover, choose Elite and our expert will confirm the price for your transaction volume.']
        : [],
  },
};
