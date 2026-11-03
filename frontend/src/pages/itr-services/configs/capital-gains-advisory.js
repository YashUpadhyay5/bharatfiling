import { FORM_NOTE } from '../common.js';

export default {
  slug: 'capital-gains-advisory',
  name: 'Capital Gains Advisory',
  breadcrumb: 'Capital Gains Tax Advisory',
  referText: 'Know someone selling shares, mutual funds or property this year? Share this page with them.',
  fee: 1999,

  hero: {
    title: 'Capital Gains Tax Advisory for Shares, Mutual Funds, Property & Crypto',
    points: [
      { text: 'Capital gains computed on shares, mutual funds, property, ESOPs and crypto' },
      { text: 'Exemption planning under sections 54, 54F and 54EC, with loss set-off' },
      { text: 'Book a capital gains session with a CA @', price: true },
    ],
    explainerTitle: 'Capital gains explained in 60 seconds',
    explainer: [
      'A capital gain is the profit you make when you sell a capital asset such as shares, mutual funds, property, gold or crypto.',
      'It is short-term or long-term depending on how long you held the asset: 12 months for listed shares and equity funds, and 24 months for most other assets.',
      'The rate depends on the asset and the holding period, and exemptions are available when you reinvest in a house or in specified bonds.',
      'Share your statements and deeds. Our CA computes the gain, plans exemptions and the advance tax impact, and shows you how to report it in your ITR.',
    ],
    formTitle: 'Talk to a Tax Expert',
    formNote: FORM_NOTE,
  },

  payment: {
    title: 'Capital Gains Advisory',
    feeLabel: 'Session Fee',
    note: 'Covers one advisory session and a written computation. Tax payable is not included.',
    booked: 'session has been booked',
    desk: 'capital gains',
    collect: 'to collect your broker statements and purchase and sale documents',
  },

  sections: [
    {
      type: 'table',
      title: ['Capital Gains ', 'Tax Rates', ''],
      subtitle: 'For transfers on or after 23 July 2024. Cess of 4% and any surcharge apply on top.',
      columns: ['Asset', 'Short-Term', 'Long-Term', 'Long-Term After'],
      rows: [
        ['Listed shares & equity mutual funds', '20% (section 111A)', '12.5% on gains above ₹1.25 lakh a year (section 112A)', '12 months'],
        [
          'Land & building',
          'Slab rate',
          '12.5% without indexation; resident individuals and HUFs can choose 20% with indexation for property bought before 23 July 2024',
          '24 months',
        ],
        ['Unlisted shares, gold & other assets', 'Slab rate', '12.5% without indexation', '24 months'],
        ['Debt mutual funds bought from April 2023', 'Slab rate', 'Always treated as short-term (section 50AA)', 'Not applicable'],
        ['Crypto & other virtual digital assets', '30% (section 115BBH)', '30%', 'Not applicable'],
      ],
      note: 'Transfers before 23 July 2024 were taxed at the earlier rates, such as 15% short-term and 10% long-term on listed equity. Our CA applies the rate for your sale date.',
    },
    {
      type: 'cards',
      title: ['Ways to ', 'Save Tax', ' on Capital Gains'],
      subtitle: 'Each exemption has conditions and deadlines. Our CA checks them on your transaction.',
      items: [
        {
          title: 'Section 54',
          desc: 'Long-term gain on selling a house is exempt when reinvested in another residential house in India within the time limits, up to ₹10 crore.',
        },
        {
          title: 'Section 54F',
          desc: 'Long-term gain on any other asset is exempt when the net sale proceeds are invested in a residential house, subject to conditions on houses you already own.',
        },
        {
          title: 'Section 54EC',
          desc: 'Up to ₹50 lakh of long-term gain on land or building is exempt when invested within 6 months in specified bonds with a 5-year lock-in.',
        },
        {
          title: 'Loss set-off',
          desc: 'Short-term losses can be set off against any capital gain, long-term losses only against long-term gains, and both carried forward for 8 years if you file on time.',
        },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'Capital Gains Advisory', ''],
      items: [
        { title: 'Broker Statements', desc: 'Capital gains or tax P&L statement from your broker for the year.' },
        { title: 'Mutual Fund Statements', desc: 'Consolidated account statement or capital gains statement from CAMS or KFintech.' },
        { title: 'Property Documents', desc: 'Purchase and sale deeds, stamp duty value, brokerage and bills for improvements.' },
        { title: 'ESOP & Foreign Share Records', desc: 'Grant and exercise letters, the perquisite value in Form 16 and foreign broker statements.' },
        { title: 'Crypto Exchange Reports', desc: 'Transaction history and the 1% TDS deducted under section 194S.' },
        { title: 'Reinvestment Proofs', desc: 'New house agreement, section 54EC bond certificates or a Capital Gains Account Scheme deposit.' },
      ],
    },
    {
      type: 'steps',
      title: ['How Our ', 'Capital Gains Advisory', ' Works'],
      items: [
        { title: 'Share Details', desc: 'Tell us what you sold or plan to sell, and when.' },
        { title: 'Upload Statements', desc: 'Share broker statements, fund statements or property deeds securely.' },
        { title: 'CA Computes Gains', desc: 'Our CA computes short-term and long-term gains asset by asset.' },
        { title: 'Advisory Session', desc: 'Discuss exemptions, loss set-off and the advance tax you need to pay.' },
        { title: 'Written Summary', desc: 'Get the computation and the ITR schedule entries in writing.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'Which ITR do I file if I have capital gains?',
      a: 'ITR-2 if you have no business income, or ITR-3 if you do. ITR-1 and ITR-4 can be used only when the sole capital gain is a long-term gain under section 112A of up to ₹1.25 lakh.',
    },
    {
      q: 'Do I have to pay advance tax on capital gains?',
      a: 'Yes, if your total tax for the year after TDS is ₹10,000 or more. Because a gain cannot be foreseen, no interest under section 234C is charged on it if you pay the tax in the remaining instalments after the sale.',
    },
    {
      q: 'Is indexation still available?',
      a: 'For transfers from 23 July 2024 indexation is removed and long-term gains on most assets are taxed at 12.5%. Resident individuals and HUFs selling land or a building bought before 23 July 2024 can still choose 20% with indexation if that gives a lower tax.',
    },
    {
      q: 'How is crypto taxed?',
      a: 'Gains on virtual digital assets are taxed at a flat 30% plus cess, with no deduction other than the cost of acquisition. Losses cannot be set off against any other income or carried forward, and 1% TDS applies under section 194S.',
    },
    {
      q: 'What about shares bought before 1 February 2018?',
      a: 'For listed equity bought before 1 February 2018, the cost is the higher of the actual cost and the market value on 31 January 2018 (limited to the sale price), so gains made before that date stay untaxed.',
    },
    {
      q: 'What do I get in the session?',
      a: 'A CA reviews your transactions, computes the gain on each asset, suggests exemptions and loss set-offs, estimates the advance tax impact and shares a written summary you can use for your ITR.',
    },
  ],

  questionnaire: {
    headline: ['', 'Expert Capital Gains Advisory'],
    tagline: 'Chartered Accountants for shares, property, ESOPs and crypto',
    points: [
      { title: 'Accurate Computation', sub: 'Holding periods, grandfathering and indexation applied correctly.' },
      { title: 'Exemption Planning', sub: 'Sections 54, 54F and 54EC checked before your deadlines pass.' },
      { title: 'Advance Tax Clarity', sub: 'Know what to pay and by when, so no interest is charged.' },
    ],
    questions: [
      {
        id: 'assetType',
        type: 'select',
        summaryLabel: 'Asset',
        label: 'What have you sold or plan to sell?',
        options: [
          { value: 'listed-equity-mf', label: 'Listed shares or equity mutual funds' },
          { value: 'debt-mf-bonds', label: 'Debt mutual funds or bonds' },
          { value: 'property', label: 'Land, house or other property' },
          { value: 'unlisted-shares-esop', label: 'Unlisted shares or ESOPs' },
          { value: 'crypto-vda', label: 'Crypto or other virtual digital assets' },
          { value: 'foreign-assets', label: 'Foreign shares or other foreign assets' },
        ],
      },
      {
        id: 'saleStatus',
        type: 'radio',
        summaryLabel: 'Sale',
        label: 'When does the sale happen?',
        options: [
          { value: 'sold-this-year', label: 'Already sold in this financial year' },
          { value: 'sold-last-year', label: 'Sold in the last financial year' },
          { value: 'planning', label: 'Planning to sell' },
        ],
      },
    ],
  },
};
