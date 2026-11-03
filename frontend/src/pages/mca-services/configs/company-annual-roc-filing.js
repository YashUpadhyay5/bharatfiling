import { COMPANY_TYPE_OPTIONS, DSC_DOCUMENT, GOVERNMENT_FEES_FAQ, companyTypeQuestion, countOptions, defineService, plural } from '../common.js';

// MCA General Circular 05/2026 waives the additional fee on FY 2025-26 filings until 31 January 2027.
const RELIEF_ENDS = new Date('2027-02-01T00:00:00+05:30');

const FILINGS = {
  'private-limited': ['Form AOC-4 (financial statements)', 'Form MGT-7, or MGT-7A for a small company (annual return)', 'AGM notice, minutes and resolutions'],
  opc: ['Form AOC-4 for an OPC (financial statements)', 'Form MGT-7A (annual return)', 'Board minutes and resolutions'],
  'public-unlisted': ['Form AOC-4 (financial statements)', 'Form MGT-7 (annual return)', 'AGM notice, minutes and resolutions'],
  'section-8': ['Form AOC-4 (financial statements)', 'Form MGT-7 (annual return)', 'AGM notice, minutes and resolutions'],
};

export default defineService({
  slug: 'company-annual-roc-filing',
  name: 'Company Annual ROC Filing',
  breadcrumb: 'Company Annual ROC Filing',
  referText: 'Know a company that has to file its annual ROC returns? Share this page with them.',
  fee: 3499,
  unitLabel: (n) => plural('year', n),

  hero: {
    title: 'Company Annual ROC Filing: AOC-4 and MGT-7 Prepared and Filed for You',
    points: [
      { text: 'Financial statements and annual return filed with the Registrar of Companies' },
      { text: 'AGM notice, minutes and resolutions drafted by company law experts' },
      { text: 'Annual ROC filing for one financial year @', price: true },
    ],
    explainerTitle: 'ROC annual filing explained in 60 seconds',
    explainer: [
      'Every company must file its financial statements and annual return with the Registrar of Companies each year, even with no business or income.',
      'Most companies hold an annual general meeting (AGM) by 30 September, then file Form AOC-4 within 30 days and Form MGT-7 or MGT-7A within 60 days of it.',
      'Late filing costs ₹100 a day for each form with no upper limit, and three years of default can disqualify every director for five years.',
      'Share your audited accounts. Our experts draft the AGM papers, prepare both forms, and file them once you have reviewed and signed.',
    ],
    formTitle: 'File Annual ROC Returns',
  },

  payment: {
    title: 'Company Annual ROC Filing',
    note: 'Priced per financial year. MCA fees, any late fee and the statutory audit are not included.',
    collect: 'to collect your audited accounts, director details and earlier filings',
  },

  sections: [
    {
      type: 'table',
      title: ['What Your Company ', 'Files Each Year', ''],
      subtitle: 'The dates below apply to a financial year ending on 31 March.',
      columns: ['Filing', 'What It Is', 'Due Date'],
      rows: [
        ['AGM', 'Annual general meeting that adopts the accounts (section 96). OPCs do not hold one.', 'Within 6 months of the year end, usually by 30 September. The first AGM is due within 9 months.'],
        ['AOC-4', 'Balance sheet, profit and loss account and reports (section 137)', 'Within 30 days of the AGM. An OPC files within 180 days of the year end.'],
        ['MGT-7 / MGT-7A', 'Annual return of directors, members and shareholding (section 92). OPCs and small companies use MGT-7A.', 'Within 60 days of the AGM, or of the date it was due'],
        ['ADT-1', 'Appointment of the auditor (section 139), usually for five years at a time. Quoted separately when it falls due.', 'Within 15 days of the AGM that appoints the auditor'],
      ],
      note:
        new Date() < RELIEF_ENDS
          ? 'Fee relief for FY 2025-26: MCA General Circular 05/2026 waives the additional fee on AOC-4 filed by 31 December 2026 and on MGT-7 or MGT-7A filed by 31 January 2027. The AGM deadline itself is not extended, and the fee runs from the original due date if you miss these dates.'
          : undefined,
    },
    {
      type: 'cards',
      title: ['What Late Filing ', 'Really Costs', ''],
      items: [
        { title: '₹100 a day, per form', desc: 'The additional fee under section 403 has no upper limit, so a year of delay costs about ₹73,000 across both forms.' },
        { title: 'Penalties on officers', desc: 'Sections 92(5) and 137(3) add penalties of up to ₹2 lakh on the company and ₹50,000 on each officer in default.' },
        { title: 'Director disqualification', desc: 'Three financial years without filing disqualifies every director for five years under section 164(2), across all their companies.' },
        { title: 'Company struck off', desc: 'The Registrar can remove a company that has not been carrying on business from the register under section 248.' },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'ROC Annual Filing', ''],
      items: [
        { title: 'Audited Financials', desc: 'Balance sheet, profit and loss account, notes and the audit report, signed for the year.' },
        { title: "Board's Report", desc: "The directors' report for the year, or the details we need to draft it." },
        { title: 'Shareholding Details', desc: 'The list of members and directors, with any changes and transfers during the year.' },
        { title: 'Meeting Records', desc: 'Dates of board meetings and the AGM, if already held. We draft whatever is pending.' },
        { title: 'Earlier Filings', desc: 'Last year\'s AOC-4 and MGT-7, and the auditor\'s ADT-1.' },
        DSC_DOCUMENT,
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'File Your Annual Returns', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us the type of company, the years due and the status of your audit.' },
        { title: 'Upload Records', desc: 'Share your audited accounts, member list and earlier filings securely.' },
        { title: 'Draft & Prepare', desc: 'We draft the AGM papers and prepare AOC-4 and MGT-7 or MGT-7A, with XBRL where it applies.' },
        { title: 'Review & Sign', desc: 'You check the forms and the director signs them with a DSC.' },
        { title: 'File & Share SRN', desc: 'We file with the MCA and share the receipts and service request numbers.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'Does a company with no business still have to file?',
      a: 'Yes. Every registered company must file AOC-4 and MGT-7 or MGT-7A each year, even with no business, income or bank activity. If the company has stopped for good, a Strike Off is usually cheaper than years of filings.',
    },
    {
      q: 'Which annual return form does my company use?',
      a: 'OPCs and small companies file MGT-7A, the shorter form. Every other company files MGT-7. A Section 8 company is not a small company, so it files MGT-7. Our expert confirms the form from your paid-up capital and turnover.',
    },
    {
      q: 'Is the audit included?',
      a: 'No. Every company must be audited by a Chartered Accountant, however small. The fee covers the ROC filing. If your accounts are not audited yet, our team can arrange the audit and quote it separately.',
    },
    {
      q: 'Can you file for earlier years too?',
      a: 'Yes. Choose the number of years on the next screen and the fee applies per year. The additional fee of ₹100 a day for each late form is paid to the MCA at actuals. For more than three years, our team reviews the company first because directors may already be disqualified.',
    },
    {
      q: 'Does the fee include Director KYC?',
      a: 'Yes, for up to two directors when their DIR-3 KYC falls due in that year. DIR-3 KYC is now due once every three financial years rather than every year.',
    },
    GOVERNMENT_FEES_FAQ,
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted ROC Filing'],
    tagline: 'Company law experts for your annual returns',
    points: [
      { title: 'Filed Ahead of the Deadline', sub: 'Due dates tracked so the ₹100 a day fee never starts.' },
      { title: 'Complete Meeting Records', sub: 'AGM notice, minutes and resolutions drafted with the forms.' },
      { title: 'Late Years Cleaned Up', sub: 'Pending years filed in order to protect your directors.' },
    ],
    questions: [
      {
        ...companyTypeQuestion,
        options: COMPANY_TYPE_OPTIONS.map((o) => ({ ...o, filing: FILINGS[o.value] })),
      },
      {
        id: 'years',
        type: 'select',
        summaryLabel: 'Years to file',
        label: 'How many financial years do you need to file?',
        options: countOptions(
          'year',
          3,
          'More than three years of pending filings can mean the directors are already disqualified, so our team reviews the company and quotes for it first.'
        ),
      },
      {
        id: 'accountsStatus',
        type: 'radio',
        summaryLabel: 'Accounts',
        label: 'Have your accounts been audited?',
        options: [
          { value: 'audited', label: 'Yes, the audit is complete' },
          {
            value: 'audit-pending',
            label: 'No, the audit is pending',
            note: 'AOC-4 needs audited accounts, so the audit has to finish first. It is not part of this fee, and our team can quote for it.',
          },
          { value: 'not-sure', label: 'Not sure' },
        ],
      },
    ],
  },
});
