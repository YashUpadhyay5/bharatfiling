import { FORM_NOTE, financialYearOptions } from '../common.js';

// Mirrors FORM_16_BATCHES in backend/src/routes/registrations/itr-services/service.js: batches of up to 10 employees.
export const FORM_16_BATCHES = { 'upto-10': 1, '11-20': 2, '21-30': 3, '31-40': 4, '41-50': 5 };

const FEE_PER_BATCH = 999;
const batches = (n) => (n === 1 ? '1 batch' : `${n} batches`);

export default {
  slug: 'form-16-generation',
  name: 'Form 16 Generation',
  breadcrumb: 'Form 16 Generation',
  referText: 'Know an employer who has to issue Form 16 to their team? Share this page with them.',
  fee: FEE_PER_BATCH,
  unitsOf: (answers) => FORM_16_BATCHES[answers.employees],
  unitLabel: batches,

  hero: {
    title: 'Form 16 Generation for Employers (Part A & Part B)',
    points: [
      { text: 'Part A from TRACES and Part B salary computation for every employee' },
      { text: 'Digitally signed Form 16, ready before the 15 June deadline' },
      { text: 'Form 16 for a batch of up to 10 employees @', price: true },
    ],
    explainerTitle: 'Form 16 explained in 60 seconds',
    explainer: [
      'Form 16 is the certificate an employer gives each employee whose salary had tax deducted, showing the salary paid and the TDS deposited.',
      'Part A, downloaded from TRACES, lists the tax deducted and deposited each quarter. Part B shows the salary breakup, exemptions, deductions and the tax computed.',
      'It must be issued by 15 June after the end of the financial year, once the fourth-quarter salary TDS return (Form 24Q) has been filed.',
      'Share your salary register and TRACES access. Our CA downloads Part A, prepares Part B and delivers digitally signed Form 16 for every employee.',
    ],
    formTitle: 'Generate Form 16',
    formNote: FORM_NOTE,
  },

  payment: {
    title: 'Form 16 Generation',
    feeLabel: 'Professional Fee',
    note: 'Priced per batch of up to 10 employees. Any TDS default or late filing fee shown on TRACES is not included.',
    booked: 'order has been placed',
    desk: 'TDS',
    collect: 'to collect your salary register, TAN and TRACES access',
  },

  sections: [
    {
      type: 'table',
      title: ['What ', 'Form 16', ' Contains'],
      subtitle: 'Each employee gets both parts, with Form 12BA where perquisites are provided.',
      columns: ['Part', 'What It Shows', 'Prepared From'],
      rows: [
        [
          'Part A',
          'TAN of the employer, PAN of the employee, period of employment, and the tax deducted and deposited each quarter',
          'Downloaded from TRACES once Form 24Q is processed',
        ],
        [
          'Part B',
          'Gross salary, exempt allowances, standard deduction, deductions claimed, the tax regime chosen and the tax computed',
          'Prepared by the employer from payroll records',
        ],
        [
          'Form 12BA',
          'Value of perquisites and profits in lieu of salary',
          'Prepared by the employer where perquisites are provided',
        ],
      ],
      note: 'Certificates for FY 2025-26 and earlier are issued as Form 16. From tax year 2026-27 the salary TDS certificate is issued under the Income-tax Act, 2025, and our CA issues it on the form that applies.',
    },
    {
      type: 'cards',
      title: ['Key Rules ', 'for Employers', ''],
      items: [
        { title: 'Due date', desc: 'Form 16 must be issued by 15 June after the end of the financial year.' },
        {
          title: 'Late issue penalty',
          desc: '₹100 for every day of delay, for each certificate, under section 272A(2)(g), up to the amount of tax deductible.',
        },
        {
          title: 'Fourth-quarter return first',
          desc: 'Part A can be downloaded only after Form 24Q for January to March, due by 31 May, is filed and processed.',
        },
        {
          title: 'Employee declarations',
          desc: 'Collect Form 12BB for rent, home loan interest, travel concession and deductions before the year closes.',
        },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'Form 16 Generation', ''],
      items: [
        { title: 'TAN & TRACES Login', desc: 'The TAN of the employer and TRACES access to download Part A.' },
        { title: 'Salary Register', desc: 'Month-wise salary components for every employee for the year.' },
        { title: 'Employee Details', desc: 'PAN, joining and exit dates, and the tax regime each employee chose.' },
        { title: 'Form 12BB & Proofs', desc: 'Employee declarations of rent, home loan interest and deductions, with proofs.' },
        { title: 'Filed TDS Returns', desc: 'Acknowledgements of the Form 24Q returns filed for the four quarters.' },
        { title: 'Perquisite Details', desc: 'Value of any accommodation, car, ESOP or other benefits provided, for Form 12BA.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Generate Your Form 16', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us the number of employees, the year and the status of your TDS returns.' },
        { title: 'Share Records', desc: 'Send the salary register, declarations and TRACES access securely.' },
        { title: 'Download Part A', desc: 'Our CA downloads Part A for every employee from TRACES.' },
        { title: 'Prepare Part B', desc: 'Salary, exemptions, deductions and tax are computed and matched with the TDS deposited.' },
        { title: 'Sign & Deliver', desc: 'Form 16 is digitally signed and delivered, ready to share with your employees.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'Who must issue Form 16?',
      a: "Every employer that deducts tax from an employee's salary must issue Form 16 to that employee for the year. Employers often also issue it where no tax was deducted, to help employees file their returns.",
    },
    {
      q: 'Can Form 16 be generated if a TDS return is pending?',
      a: 'Part A is downloaded from TRACES only after the quarterly returns, including the fourth quarter, are filed and processed. If a return is pending, it can be filed first through our TDS Return Filing service.',
    },
    {
      q: 'What if an employee worked for two employers in the year?',
      a: 'Each employer issues Form 16 for the period the employee worked with them. The employee reports the salary from both in their ITR.',
    },
    {
      q: 'Is a digitally signed Form 16 valid?',
      a: 'Yes. Form 16 can be signed with the digital signature of the person responsible for deducting tax, and is valid without a physical signature.',
    },
    {
      q: 'How is the fee calculated?',
      a: `₹${FEE_PER_BATCH.toLocaleString('en-IN')} + GST for each batch of up to 10 employees, so 25 employees are 3 batches. For more than 50 employees, contact our team for a quote.`,
    },
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted Form 16 Generation'],
    tagline: 'Chartered Accountants for salary TDS certificates',
    points: [
      { title: 'Part A & Part B', sub: 'TRACES certificates matched with an accurate salary computation.' },
      { title: 'On Time', sub: 'Delivered so you meet the 15 June deadline and avoid the daily penalty.' },
      { title: 'Digitally Signed', sub: 'Ready to share with your employees for their returns.' },
    ],
    questions: [
      {
        id: 'employees',
        type: 'select',
        summaryLabel: 'Employees',
        label: 'How many employees need Form 16?',
        options: [
          { value: 'upto-10', label: 'Up to 10 employees (1 batch)' },
          { value: '11-20', label: '11 to 20 employees (2 batches)' },
          { value: '21-30', label: '21 to 30 employees (3 batches)' },
          { value: '31-40', label: '31 to 40 employees (4 batches)' },
          { value: '41-50', label: '41 to 50 employees (5 batches)' },
        ],
      },
      {
        id: 'returnsStatus',
        type: 'radio',
        summaryLabel: 'TDS returns',
        label: 'Have the salary TDS returns (Form 24Q) for all four quarters been filed?',
        options: [
          { value: 'all-filed', label: 'Yes, all four quarters are filed' },
          { value: 'some-pending', label: 'Some returns are pending' },
          { value: 'not-sure', label: 'Not sure' },
        ],
      },
      {
        id: 'financialYear',
        type: 'select',
        summaryLabel: 'Financial year',
        label: 'Which financial year is the Form 16 for?',
        options: financialYearOptions,
      },
    ],
  },
};
