import { TDS_COUPON, TDS_CONSULTATION_FEE } from './quote.js';
import { financialYears } from './years.js';

export default {
  slug: 'tds-return-filing',
  name: 'TDS Return Filing',
  breadcrumb: 'TDS Return Filing Online',
  referText: 'Know a business owner who needs help with TDS returns? Share this page with them.',
  fee: TDS_CONSULTATION_FEE,

  hero: {
    title: 'TDS Return Filing Online',
    points: [
      { text: 'Expert assisted accurate TDS Return Filing within the due deadlines' },
      { text: 'Simplified TDS Filing Process ensuring compliance with tax regulations' },
      { text: 'Expert TDS Filing Assistance with accurate calculations and no errors' },
    ],
    explainerTitle: 'TDS explained in 60 seconds',
    explainer: [
      'TDS (tax deducted at source) is tax that a business deducts when it pays salary, rent, professional fees, interest or contractor bills, and deposits with the government.',
      'Every deductor reports this in a quarterly TDS return: who the tax was deducted from, how much, and the challans used to deposit it.',
      'Share your TAN, deduction details and challans. Our CA prepares the return, validates it and files it on the Income Tax Department portal.',
      'Once the return is filed and processed, the people you deducted tax from can get Form 16 or 16A and claim credit for it.',
    ],
    formTitle: 'File TDS Return',
    extraField: {
      id: 'returnPeriod',
      placeholder: 'TDS Return Period',
      error: 'Choose a return period',
      options: [
        { value: 'q1', label: 'Q1: April – June' },
        { value: 'q2', label: 'Q2: July – September' },
        { value: 'q3', label: 'Q3: October – December' },
        { value: 'q4', label: 'Q4: January – March' },
      ],
    },
    formNote: '🔒 SSL Encrypted • 100% Confidential • ISO 27001 Certified',
  },

  payment: {
    title: 'Consult an expert',
    steps: ['15-minute call with an expert.', 'Get guidance on the next steps for your requirements.'],
    feeLabel: 'Consultation Fee (GST incl)',
    note: '*Consultation fees paid will be adjusted against the Professional fee',
  },

  sections: [
    {
      type: 'table',
      title: ['Types of ', 'TDS Returns', ' & Due Dates'],
      subtitle: 'Which return you file depends on the payments you deduct tax from.',
      columns: ['Return', 'What It Reports', 'Who Files'],
      rows: [
        ['Form 24Q', 'Tax deducted from salaries', 'Employers who pay salary'],
        ['Form 26Q', 'Tax deducted from payments other than salary to residents, such as rent, professional fees, contractor bills, commission and interest', 'Businesses and other deductors making such payments'],
        ['Form 27Q', 'Tax deducted from payments to non-residents', 'Deductors paying non-residents'],
        ['Form 27EQ', 'Tax collected at source (TCS)', 'Sellers who collect tax at source'],
      ],
      note: 'Due dates for all four returns: Q1 (April to June) 31 July, Q2 (July to September) 31 October, Q3 (October to December) 31 January and Q4 (January to March) 31 May. For periods from April 2026 the forms are renumbered under the Income-tax Act, 2025, and our CA files on the form that applies to your period.',
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'TDS Return Filing', ''],
      items: [
        { title: 'TAN & Portal Access', desc: 'Your TAN and the TRACES and income tax portal login of the deductor.' },
        { title: 'Deductee Details', desc: 'Name and PAN of every person you deducted tax from.' },
        { title: 'Deduction Records', desc: 'Amount paid or credited, section, rate and date of deduction for each payment.' },
        { title: 'Challan Details', desc: 'BSR code, challan serial number, date and amount for every TDS deposit.' },
        { title: 'Salary Records (24Q)', desc: 'Employee-wise salary, exemptions, deductions and the tax regime chosen.' },
        { title: 'Earlier Statements', desc: 'Receipt details of earlier quarters, needed for corrections and for clearing defaults.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'File Your TDS Return', ''],
      items: [
        { title: 'Share Details', desc: 'Choose the return period, financial year and who the filing is for.' },
        { title: 'Share Records', desc: 'Send deduction details, challans and deductee PANs securely.' },
        { title: 'CA Prepares Return', desc: 'Our CA matches deductions with challans and validates the return file.' },
        { title: 'Review & Approve', desc: 'You review the return and approve it before anything is filed.' },
        { title: 'File & Acknowledge', desc: 'We file the return and share the acknowledgement so Form 16 / 16A can follow.' },
      ],
    },
    {
      type: 'cards',
      title: ['Cost of ', 'Late or Wrong TDS Returns', ''],
      subtitle: 'File accurately and on time to avoid these.',
      items: [
        {
          title: 'Late filing fee (section 234E)',
          desc: '₹200 for every day of delay, up to the total TDS of that return.',
        },
        {
          title: 'Penalty (section 271H)',
          desc: '₹10,000 to ₹1 lakh can apply if a return is not filed within one year of its due date, or if it contains incorrect details.',
        },
        {
          title: 'Interest (section 201)',
          desc: '1% per month on tax not deducted, and 1.5% per month on tax deducted but not deposited.',
        },
        {
          title: 'Expense disallowed',
          desc: '30% of the expense can be disallowed when tax is not deducted or deposited on time, which raises your own tax.',
        },
      ],
    },
  ],

  faqs: [
    {
      q: 'Who needs to file a TDS return?',
      a: 'Every person who deducts tax at source, such as an employer paying salary or a business paying rent, professional fees, contractor bills or interest above the threshold limits, must file a quarterly TDS return. A TAN is needed to deduct tax and to file the return.',
    },
    {
      q: 'What are the due dates for TDS returns?',
      a: 'Returns are filed quarterly: 31 July for April to June, 31 October for July to September, 31 January for October to December and 31 May for January to March. The tax itself is deposited earlier, generally by the 7th of the following month.',
    },
    {
      q: 'What is the difference between Form 24Q and Form 26Q?',
      a: 'Form 24Q reports tax deducted from salaries. Form 26Q reports tax deducted from other payments to residents, such as rent, professional fees and contractor bills. Form 27Q covers payments to non-residents.',
    },
    {
      q: 'What happens if I file the TDS return late?',
      a: 'A late filing fee of ₹200 per day under section 234E applies until the return is filed, limited to the TDS amount of that return. A penalty of ₹10,000 to ₹1 lakh under section 271H can also apply if the return is filed more than a year late or has incorrect details.',
    },
    {
      q: 'Can a filed TDS return be corrected?',
      a: 'Yes. A correction statement can be filed to fix errors such as a wrong PAN, challan or amount. Our CA prepares correction statements and helps clear defaults shown on TRACES.',
    },
    {
      q: 'What is a TAN and do I need one?',
      a: 'TAN, the Tax Deduction and Collection Account Number, is a 10-character number that every deductor must quote on TDS returns and challans. If you do not have one, you need to apply for it before you deduct tax.',
    },
    {
      q: 'What is the consultation fee and what does it cover?',
      a: `The ₹${TDS_CONSULTATION_FEE} consultation fee (GST included) books a 15-minute call with an expert, who guides you on the next steps for your requirements. It is adjusted against the professional fee for filing your return. Festive offers, such as the ₹${TDS_COUPON.discount} discount, are applied automatically at checkout while they last.`,
    },
    {
      q: 'When do the people I deducted tax from get Form 16 or 16A?',
      a: 'Once your TDS return is filed and processed, Form 16A and, for salary, Form 16 can be generated. Form 16 is due by 15 June after the financial year, and it lets employees and vendors claim credit for the tax you deducted.',
    },
  ],

  questionnaire: {
    singlePage: true,
    headline: ['', 'TDS Returns Filed Right. Every Time.'],
    tagline: 'Stay TDS-compliant with BharatFiling - Fast and accurate',
    points: [
      { title: 'Quick Turnaround:', sub: 'Filing completed in just 3–5 working days' },
      { title: 'Accuracy Guaranteed:', sub: 'Expert-reviewed to avoid errors and penalties.' },
      { title: 'Expert Help 24x7:', sub: 'CA support available in Tamil & English' },
      { title: 'End-to-End Support:', sub: "From filing to reminders — we've got you covered" },
    ],
    questions: [
      {
        id: 'financialYear',
        type: 'radio',
        summaryLabel: 'Financial year',
        label: 'Which Financial Year?',
        options: financialYears().map(({ value, label }) => ({ value, label })),
      },
      {
        id: 'filingFor',
        type: 'radio',
        summaryLabel: 'Filing for',
        label: 'What is your TDS filing for?',
        options: [
          { value: 'business', label: 'Business' },
          { value: 'individual', label: 'Individual' },
        ],
      },
    ],
  },
};
