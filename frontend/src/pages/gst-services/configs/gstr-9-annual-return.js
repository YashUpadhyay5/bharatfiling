export default {
  slug: 'gstr-9-annual-return',
  name: 'GSTR-9 Annual Return',
  referText: 'Know a business owner who still has to file GSTR-9? Share this page with them.',

  hero: {
    title: 'GSTR-9 Annual Return Filing Online',
    intro:
      'GSTR-9 brings every GSTR-1 and GSTR-3B you filed during the year into one annual return. Our CAs reconcile your books, sales and input tax credit before filing, so the numbers match and notices are avoided.',
    points: [
      'Accurate GSTR-9 filing with complete books-to-GST reconciliation by experienced CAs.',
      'Mismatches between GSTR-1, GSTR-3B and GSTR-2B found and resolved before filing.',
      'GSTR-9C reconciliation statement for businesses with turnover above ₹5 crore.',
    ],
    formTitle: 'File Your GSTR-9 with Experts',
  },

  sections: [
    {
      type: 'cards',
      title: ['Who Needs to File ', 'GSTR-9', '?'],
      subtitle: 'GSTR-9 is filed once a year, for each GSTIN, by taxpayers registered as regular taxpayers.',
      items: [
        { title: 'Regular taxpayers', desc: 'Every normal taxpayer registered under GST, including SEZ units and SEZ developers.' },
        { title: 'Turnover up to ₹2 crore', desc: 'Filing has been made optional for these taxpayers by notification for recent years. Filing anyway keeps your records reconciled.' },
        { title: 'Turnover above ₹5 crore', desc: 'Must also file GSTR-9C, a self-certified reconciliation of GSTR-9 with the audited financial statements.' },
        { title: 'Not required for', desc: 'Composition taxpayers (they file GSTR-4), casual and non-resident taxable persons, input service distributors and TDS/TCS deductors.' },
      ],
      note: 'GSTR-9 cannot be revised once filed, so every figure should be reconciled with your books and monthly returns before filing.',
    },
    {
      type: 'table',
      title: ['GSTR-9 ', 'Due Date & Late Fee', ''],
      subtitle:
        'GSTR-9 is due by 31st December after the end of the financial year. From FY 2022-23, the late fee depends on turnover.',
      columns: ['Aggregate Turnover', 'Late Fee per Day', 'Maximum Late Fee'],
      rows: [
        ['Up to ₹5 crore', '₹50 (₹25 CGST + ₹25 SGST)', '0.04% of turnover in the state'],
        ['₹5 crore – ₹20 crore', '₹100 (₹50 CGST + ₹50 SGST)', '0.08% of turnover in the state'],
        ['Above ₹20 crore', '₹200 (₹100 CGST + ₹100 SGST)', '0.5% of turnover in the state'],
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'GSTR-9', ''],
      items: [
        { title: 'GSTIN & Portal Login', desc: 'Your GST number and portal credentials, or OTP access for filing.' },
        { title: 'Returns for the Year', desc: 'GSTR-1 and GSTR-3B filed for every month or quarter of the financial year.' },
        { title: 'GSTR-2B Statements', desc: 'Monthly ITC statements to verify the input tax credit you claimed.' },
        { title: 'Books of Accounts', desc: 'Sales and purchase registers, ledgers, profit and loss account and balance sheet.' },
        { title: 'HSN-wise Summary', desc: 'Outward and inward supplies by HSN code, with quantities and values.' },
        { title: 'Credit / Debit Notes & Amendments', desc: 'Notes issued and received, and amendments made in later returns.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'File Your GSTR-9', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us your turnover and return status, and choose a plan.' },
        { title: 'Data Collection', desc: 'Share your books, returns and GSTR-2B downloads.' },
        { title: 'Reconciliation', desc: 'Our CA matches your books with GSTR-1, GSTR-3B and GSTR-2B.' },
        { title: 'Review & Approve', desc: 'You review the draft GSTR-9 and the mismatch report.' },
        { title: 'Filing & ARN', desc: 'GSTR-9 is filed on the GST portal and the ARN is shared with you.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'What is GSTR-9?',
      a: 'GSTR-9 is the annual return filed by regular taxpayers. It consolidates the outward supplies, inward supplies, input tax credit, tax paid and other details declared in the monthly or quarterly returns of the financial year.',
    },
    {
      q: 'What is the due date for GSTR-9?',
      a: '31st December following the end of the financial year, unless the government extends it. For example, GSTR-9 for FY 2025-26 is due by 31st December 2026.',
    },
    {
      q: 'Is GSTR-9 mandatory if my turnover is below ₹2 crore?',
      a: 'The government has made GSTR-9 optional for taxpayers with aggregate turnover up to ₹2 crore through notifications for recent financial years. Many businesses still file it to keep their records reconciled.',
    },
    {
      q: 'What is GSTR-9C?',
      a: 'GSTR-9C is a self-certified reconciliation statement between the annual return and the audited financial statements. It is required for taxpayers with aggregate turnover above ₹5 crore.',
    },
    {
      q: 'Can GSTR-9 be revised after filing?',
      a: 'No. Once filed, GSTR-9 cannot be revised, so all figures should be reconciled with your books and returns before filing.',
    },
    {
      q: 'What if I find unreported sales or missed ITC while preparing GSTR-9?',
      a: 'Additional tax on unreported sales can be paid through Form DRC-03. Input tax credit that was not claimed in GSTR-3B, however, cannot be claimed through GSTR-9.',
    },
    {
      q: 'Can I file GSTR-9 if some monthly returns are still pending?',
      a: 'No. All GSTR-1 and GSTR-3B returns for the year must be filed before GSTR-9 can be filed. Our experts help you clear pending returns first.',
    },
  ],

  questionnaire: {
    headline: ['Get Your GSTR-9 Filed', 'Accurately & On Time'],
    tagline: 'Reconcile your books and avoid notices and late fees.',
    points: [
      { title: 'Complete Reconciliation', sub: 'Books matched with GSTR-1, GSTR-3B and GSTR-2B.' },
      { title: 'Expert CA Review', sub: 'Every return is checked by a qualified CA before filing.' },
      { title: '100% Online Process', sub: 'Share documents and track progress from anywhere.' },
    ],
    questions: [
      {
        id: 'turnover',
        type: 'select',
        summaryLabel: 'Turnover',
        label: 'What was your aggregate turnover for the financial year?',
        options: [
          { value: 'upto-2cr', label: 'Up to ₹2 crore' },
          { value: '2cr-5cr', label: '₹2 crore – ₹5 crore' },
          { value: '5cr-20cr', label: '₹5 crore – ₹20 crore' },
          { value: 'above-20cr', label: 'Above ₹20 crore' },
        ],
      },
      {
        id: 'returnsStatus',
        type: 'radio',
        summaryLabel: 'Returns',
        label: 'Have you filed all GSTR-1 and GSTR-3B returns for the year?',
        options: [
          { value: 'all-filed', label: 'Yes, all returns are filed' },
          { value: 'some-pending', label: 'Some returns are still pending' },
          { value: 'not-sure', label: "I'm not sure" },
        ],
      },
    ],
  },

  plans: {
    defaultPlan: 'premium',
    unit: 'per financial year',
    items: [
      {
        id: 'standard',
        name: 'Standard',
        subtitle: 'For businesses with simple books and turnover up to ₹2 crore.',
        originalPrice: 4499,
        discountLabel: '33% off',
        price: 2999,
        features: [
          'GSTR-9 preparation & filing for **one GSTIN**',
          'Reconciliation with filed **GSTR-1 & GSTR-3B**',
          'Turnover up to ₹2 crore',
          'ARN & filing acknowledgement',
          'Chat support',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        subtitle: 'Complete books-to-GST reconciliation for growing businesses.',
        originalPrice: 7999,
        discountLabel: '37% off',
        price: 4999,
        recommended: true,
        features: [
          'Everything in Standard',
          '**Books-to-GST reconciliation** (sales, purchases & ITC)',
          '**GSTR-2B vs ITC claimed** mismatch report',
          'Additional liability computation (DRC-03)',
          'Turnover up to ₹5 crore',
          '**Dedicated GST expert**',
        ],
      },
      {
        id: 'elite',
        name: 'Elite',
        subtitle: 'GSTR-9 with GSTR-9C for businesses above ₹5 crore turnover.',
        originalPrice: 14999,
        discountLabel: '33% off',
        price: 9999,
        hasEmi: true,
        features: [
          'Everything in Premium',
          '**GSTR-9C** reconciliation statement',
          'Audited financials vs GST reconciliation',
          'Turnover above ₹5 crore',
          'Support on department queries for the year',
          '**Dedicated account manager**',
        ],
      },
    ],
    hint: (answers) => {
      const hints = [];
      if (['5cr-20cr', 'above-20cr'].includes(answers.turnover)) {
        hints.push('With turnover above ₹5 crore you also need GSTR-9C. The Elite plan covers both.');
      } else if (answers.turnover === '2cr-5cr') {
        hints.push('For turnover between ₹2 crore and ₹5 crore, the Premium plan covers your filing.');
      }
      if (answers.returnsStatus !== 'all-filed') {
        hints.push('All GSTR-1 and GSTR-3B returns must be filed before GSTR-9. Our expert will check this first and help you clear any pending returns.');
      }
      return hints;
    },
  },
};
