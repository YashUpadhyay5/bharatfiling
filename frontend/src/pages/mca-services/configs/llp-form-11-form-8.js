import { DSC_DOCUMENT, GOVERNMENT_FEES_FAQ, countOptions, defineService, plural } from '../common.js';

export default defineService({
  slug: 'llp-form-11-form-8',
  name: 'LLP Form 11 & Form 8',
  breadcrumb: 'LLP Form 11 & Form 8',
  referText: 'Know an LLP that has to file its annual returns? Share this page with them.',
  fee: 2999,
  unitLabel: (n) => plural('year', n),

  hero: {
    title: 'LLP Annual Filing: Form 11 and Form 8 Prepared and Filed for You',
    points: [
      { text: 'Annual return and Statement of Account and Solvency filed with the Registrar' },
      { text: 'Form 8 certified by a practising professional, as the rules require' },
      { text: 'LLP annual filing for one financial year @', price: true },
    ],
    explainerTitle: 'LLP annual filing explained in 60 seconds',
    explainer: [
      'Every LLP files two forms with the Registrar each year, even with no business or income: Form 11 and Form 8.',
      'Form 11, the annual return, is due by 30 May. Form 8, the Statement of Account and Solvency, is due by 30 October.',
      'The late fee is a multiple of the normal filing fee and climbs with every month of delay, so old filings get expensive fast.',
      'Share your accounts and partner details. Our experts prepare both forms, get them certified and file them once your designated partners have signed.',
    ],
    formTitle: 'File LLP Returns',
  },

  payment: {
    title: 'LLP Form 11 & Form 8',
    note: 'Priced per financial year. MCA fees, any late fee and the LLP audit are not included.',
    collect: 'to collect your LLP accounts, partner details and earlier filings',
  },

  sections: [
    {
      type: 'table',
      title: ['Two Forms, ', 'Two Due Dates', ''],
      subtitle: 'Both forms are due every year for a financial year ending on 31 March.',
      columns: ['Form', 'What It Is', 'Due Date', 'Who Signs'],
      rows: [
        [
          'Form 11',
          'Annual return with partners, contribution and turnover (section 35)',
          '30 May, within 60 days of the year end',
          'Designated partners. A practising Company Secretary also certifies it when contribution exceeds ₹50 lakh or turnover exceeds ₹5 crore.',
        ],
        [
          'Form 8',
          'Statement of Account and Solvency (section 34)',
          '30 October, within 30 days after the first six months',
          'Two designated partners, certified by a practising CA, CS or Cost Accountant',
        ],
      ],
      note: 'The income tax return of an LLP (ITR-5) is a separate filing with its own due date, and is not part of this service.',
    },
    {
      type: 'cards',
      title: ['What You ', 'Should Know', ''],
      items: [
        { title: 'Late fee', desc: 'Since April 2022 the additional fee is a multiple of the normal fee, rising with the delay up to 15 times for a small LLP and 30 times for others, plus a daily charge after 360 days.' },
        { title: 'Audit threshold', desc: 'Accounts must be audited by a Chartered Accountant when turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh in the year.' },
        { title: 'Nil LLPs still file', desc: 'An LLP with no business still files both forms every year until it is closed with Form 24.' },
        { title: 'Penalties on partners', desc: 'Missing these filings also exposes the LLP and its designated partners to penalties under the LLP Act.' },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'LLP Annual Filing', ''],
      items: [
        { title: 'LLP Accounts', desc: 'Statement of account and solvency figures, with bank statements for the year.' },
        { title: 'Audit Report', desc: 'The audit report, if your turnover or contribution crosses the threshold.' },
        { title: 'Partner Details', desc: 'Names, DPINs and contributions of partners, with any changes during the year.' },
        { title: 'LLP Agreement', desc: 'The LLP agreement and any supplementary agreements on file.' },
        { title: 'Earlier Filings', desc: 'Last year\'s Form 8 and Form 11, if they were filed.' },
        DSC_DOCUMENT,
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'File Your LLP Returns', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us the forms and years due, and whether your accounts need an audit.' },
        { title: 'Upload Records', desc: 'Share your accounts, partner details and earlier filings securely.' },
        { title: 'Prepare Forms', desc: 'We prepare Form 11 and Form 8 and arrange the professional certification.' },
        { title: 'Review & Sign', desc: 'You check the forms and the designated partners sign with a DSC.' },
        { title: 'File & Share SRN', desc: 'We file with the MCA and share the receipts and service request numbers.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'Does an LLP with no business have to file?',
      a: 'Yes. Form 11 and Form 8 are due every year from incorporation until the LLP is closed, even with no business, income or bank account. If it has stopped for good, a Strike Off with Form 24 ends the yearly filings.',
    },
    {
      q: 'Does my LLP need an audit?',
      a: 'Only when turnover exceeds ₹40 lakh or contribution exceeds ₹25 lakh in the financial year. Below both limits, the designated partners sign the accounts themselves. The audit is not part of this fee, and our team can quote for it.',
    },
    {
      q: 'What is the difference between Form 8 and ITR-5?',
      a: 'Form 8 goes to the Registrar under the LLP Act and shows your accounts and solvency. ITR-5 goes to the Income Tax Department and reports your income. An LLP files both, and our Business Tax Return service covers ITR-5.',
    },
    {
      q: 'How much is the late fee?',
      a: 'It depends on your contribution and how late the filing is. The normal fee is ₹50 to ₹600 per form, and the additional fee is a multiple of it, so a form filed 100 days late costs a small LLP a little over ₹1,000 on a ₹3 lakh contribution. Our expert gives you the exact figure before filing.',
    },
    {
      q: 'Can you file for earlier years?',
      a: 'Yes. Choose the number of years on the next screen and the fee applies per year. For more than three years, our team reviews the LLP first and quotes for it.',
    },
    GOVERNMENT_FEES_FAQ,
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted LLP Filing'],
    tagline: 'Company law experts for your LLP annual returns',
    points: [
      { title: 'Both Forms Covered', sub: 'Form 11 and Form 8 prepared together so the figures agree.' },
      { title: 'Professional Certification', sub: 'Form 8 certified by a practising professional.' },
      { title: 'Late Years Cleaned Up', sub: 'Pending years filed in order before the fee climbs further.' },
    ],
    questions: [
      {
        id: 'formsDue',
        type: 'radio',
        summaryLabel: 'Forms due',
        label: 'Which forms are due?',
        options: [
          { value: 'both', label: 'Both Form 11 and Form 8', filing: ['Form 11 (annual return)', 'Form 8 (Statement of Account and Solvency)'] },
          { value: 'form-11', label: 'Form 11 only', filing: ['Form 11 (annual return)'] },
          { value: 'form-8', label: 'Form 8 only', filing: ['Form 8 (Statement of Account and Solvency)'] },
          { value: 'not-sure', label: 'Not sure', filing: ['Form 11 and Form 8, as your filing history requires'] },
        ],
      },
      {
        id: 'years',
        type: 'select',
        summaryLabel: 'Years to file',
        label: 'How many financial years do you need to file?',
        options: countOptions(
          'year',
          3,
          'More than three years of pending filings carry a steep late fee, so our team reviews the LLP and quotes for it first. Closing the LLP may also cost less.'
        ),
      },
      {
        id: 'auditStatus',
        type: 'radio',
        summaryLabel: 'Audit',
        label: 'Was turnover above ₹40 lakh or contribution above ₹25 lakh?',
        options: [
          {
            value: 'audit-required',
            label: 'Yes, an audit is required',
            note: 'The audit has to finish before Form 8 is filed. It is not part of this fee, and our team can quote for it.',
          },
          { value: 'no-audit', label: 'No, it was below both limits' },
          { value: 'not-sure', label: 'Not sure' },
        ],
      },
    ],
  },
});
