import { FORM_NOTE } from '../common.js';

export default {
  slug: 'advance-tax-computation',
  name: 'Advance Tax Computation',
  breadcrumb: 'Advance Tax Computation',
  referText: 'Know a freelancer, business owner or investor who pays advance tax? Share this page with them.',
  fee: 999,

  hero: {
    title: 'Advance Tax Calculation & Payment Assistance',
    points: [
      { text: 'Estimate your tax for the year and the instalment due on each date' },
      { text: 'Avoid interest under sections 234B and 234C with a CA-planned schedule' },
      { text: 'Get your advance tax computed by a CA @', price: true },
    ],
    explainerTitle: 'Advance tax explained in 60 seconds',
    explainer: [
      'Advance tax is income tax paid during the year, in instalments, instead of in one go after the year ends.',
      'You must pay it if your tax for the year, after TDS and TCS, is ₹10,000 or more.',
      'Instalments are due on 15 June, 15 September, 15 December and 15 March. Presumptive taxpayers pay the whole amount by 15 March.',
      'Share your income estimate and TDS. Our CA computes the liability, tells you what to pay by the next date and helps you pay the challan online.',
    ],
    formTitle: 'Compute Advance Tax',
    formNote: FORM_NOTE,
  },

  payment: {
    title: 'Advance Tax Computation',
    feeLabel: 'Professional Fee',
    note: 'Covers the computation for one instalment. The advance tax itself is paid directly to the Income Tax Department.',
    booked: 'order has been placed',
    desk: 'advance tax',
    collect: 'to collect your income estimates, TDS details and earlier challans',
  },

  sections: [
    {
      type: 'table',
      title: ['Advance Tax ', 'Due Dates', ''],
      subtitle: 'The share of the year’s tax that must be paid by each date.',
      columns: ['Due Date', 'Regular Taxpayers', 'Presumptive Taxpayers (44AD / 44ADA)'],
      rows: [
        ['15 June', 'At least 15%', 'Nil'],
        ['15 September', 'At least 45%', 'Nil'],
        ['15 December', 'At least 75%', 'Nil'],
        ['15 March', '100%', '100%'],
      ],
      note: 'A shortfall in any instalment carries interest at 1% a month under section 234C (none if at least 12% is paid by 15 June and 36% by 15 September). If less than 90% of the tax is paid by 31 March, interest at 1% a month also applies under section 234B until it is paid.',
    },
    {
      type: 'cards',
      title: ['Who Needs to ', 'Pay Advance Tax', ''],
      items: [
        { title: 'Business owners & professionals', desc: 'Anyone with business or professional income and tax of ₹10,000 or more after TDS.' },
        { title: 'Salaried people with other income', desc: 'Employees with rent, interest, capital gains or freelance income on which enough TDS is not deducted.' },
        { title: 'Investors', desc: 'Tax on a capital gain can be paid in the instalments after the sale without interest under section 234C.' },
        { title: 'Senior citizens (exempt)', desc: 'Resident individuals aged 60 or more with no business or professional income do not have to pay advance tax.' },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'Advance Tax Computation', ''],
      items: [
        { title: 'Income Estimate', desc: 'Expected salary, business profit, rent, interest and other income for the year.' },
        { title: 'TDS & TCS Details', desc: 'Form 26AS, AIS and any Form 16 or 16A received so far.' },
        { title: 'Earlier Challans', desc: 'Advance tax already paid this year, with the challan details.' },
        { title: 'Previous Year Return', desc: "Last year's ITR, used as a base for this year's estimate." },
        { title: 'Capital Gains Statements', desc: 'Broker, mutual fund or property sale details for gains made this year.' },
        { title: 'PAN & Portal Login', desc: 'Your PAN and income tax portal access to check credits and pay the challan.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Compute Your Advance Tax', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us how you earn your income and the instalment you are preparing for.' },
        { title: 'Share Estimates', desc: 'Send income estimates, TDS details and challans already paid.' },
        { title: 'CA Computes Tax', desc: 'Our CA estimates the year’s tax under the better regime, net of TDS.' },
        { title: 'Instalment Plan', desc: 'Get the amount due by the next date and the schedule for the rest of the year.' },
        { title: 'Pay the Challan', desc: 'We guide you through paying online with e-Pay Tax on the income tax portal.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'What happens if I do not pay advance tax?',
      a: 'Interest under section 234C is charged for each instalment that falls short, and interest under section 234B is charged if less than 90% of your tax is paid by 31 March. Both run at 1% a month on the shortfall.',
    },
    {
      q: 'Can I pay advance tax after 15 March?',
      a: 'Tax paid on or before 31 March still counts as advance tax for the year, though interest under section 234C for the March instalment may apply. Anything paid after 31 March is self-assessment tax, with interest under section 234B.',
    },
    {
      q: 'How do I pay advance tax?',
      a: 'Online through e-Pay Tax on the income tax portal, choosing advance tax (100) as the type of payment, by net banking, UPI or debit card. Keep the challan details for your ITR.',
    },
    {
      q: 'Is advance tax payable on salary?',
      a: 'Usually not, because your employer deducts TDS. It becomes payable when you have other income, such as interest, rent or capital gains, and the tax on it after TDS is ₹10,000 or more.',
    },
    {
      q: 'Do presumptive taxpayers pay in four instalments?',
      a: 'No. Taxpayers under section 44AD or 44ADA pay the whole advance tax in one instalment by 15 March.',
    },
    {
      q: 'What does the fee cover?',
      a: 'A computation of your estimated tax for the year, the amount due by the instalment you chose, and help with paying the challan. Each later instalment can be booked separately.',
    },
  ],

  questionnaire: {
    headline: ['', 'Expert Advance Tax Planning'],
    tagline: 'Chartered Accountants to plan every instalment',
    points: [
      { title: 'Right Amount', sub: 'Your tax estimated on actual figures, under the regime that suits you.' },
      { title: 'No Interest', sub: 'Instalments planned so sections 234B and 234C interest is avoided.' },
      { title: 'Guided Payment', sub: 'Help paying the challan online before the due date.' },
    ],
    questions: [
      {
        id: 'taxpayerType',
        type: 'select',
        summaryLabel: 'Income type',
        label: 'How do you earn your income?',
        options: [
          { value: 'salaried-other-income', label: 'Salaried with other income' },
          { value: 'business-profession', label: 'Business or profession' },
          { value: 'presumptive', label: 'Presumptive income (44AD / 44ADA)' },
          { value: 'investor', label: 'Investor (capital gains, dividends, interest)' },
          { value: 'company-firm', label: 'Company, firm or LLP' },
        ],
      },
      {
        id: 'instalment',
        type: 'radio',
        summaryLabel: 'Instalment',
        label: 'Which instalment are you preparing for?',
        options: [
          { value: 'jun-15', label: '15 June (first instalment)' },
          { value: 'sep-15', label: '15 September (second instalment)' },
          { value: 'dec-15', label: '15 December (third instalment)' },
          { value: 'mar-15', label: '15 March (last instalment)' },
        ],
      },
    ],
  },
};
