import { FAQ, ITR_CONSULTATION_FEE, feeLabel, latestYear, payment, questionnaire } from '../common.js';

export default {
  slug: 'itr-filing',
  name: 'Income Tax Return Filing',
  breadcrumb: 'Income Tax Return Filing',
  referText: 'Know someone who needs help filing their income tax return? Share this page with them.',
  fee: ITR_CONSULTATION_FEE,

  hero: {
    title: `Income Tax Return Filing Online in India (FY ${latestYear.fy} | AY ${latestYear.ay})`,
    intro:
      'Expert CA-assisted income tax return filing for salaried employees, freelancers, business owners, and NRIs. File your return before the due date to avoid late fees and interest.',
    reviewedBy: 'BharatFiling CA team, Tax Specialists & compliance experts',
    lastUpdated: 'October 27, 2026',
    points: [
      { text: 'Expert assisted ITR filing for salaried individuals, businesses, freelancers, and NRIs', terms: true },
      { text: 'Maximise eligible tax savings with accurate filing and dedicated CA support' },
      { text: `File your ITR online for FY ${latestYear.fy}. Fast and Expert Assisted Process @`, price: true },
    ],
    terms: `${feeLabel} + GST is the consultation fee and is adjusted against the final service fee. Tax payable to the Income Tax Department is not included.`,
    explainerTitle: 'ITR explained in 60 seconds',
    explainer: [
      'An ITR is your yearly statement of income, deductions and tax paid, filed with the Income Tax Department.',
      'You must file if your income is above the basic exemption limit. You may also file to claim a refund, carry forward losses or show income proof for a loan or visa.',
      'Share your Form 16, AIS / Form 26AS and investment proofs. Our CA computes your tax, compares the old and new regimes and e-files the return.',
      'Last step: e-verify within 30 days of filing, otherwise the return is treated as not filed.',
    ],
    formTitle: 'File your ITR Now',
    formNote: '🔒 SSL Encrypted • 100% Confidential • ISO 27001 Certified',
  },

  payment,

  sections: [
    {
      type: 'table',
      title: ['Which ', 'ITR Form', ' Applies to You?'],
      subtitle: 'The right form depends on who you are and what you earn. Our CA confirms it from your documents.',
      columns: ['Form', 'Who Can Use It', 'Income It Covers', 'Cannot Use If'],
      rows: [
        [
          'ITR-1 (Sahaj)',
          'Resident individuals with total income up to ₹50 lakh',
          'Salary or pension, one house property, interest and other sources, agricultural income up to ₹5,000, long-term gains under section 112A up to ₹1.25 lakh',
          'You have business or professional income, more than one house property, other capital gains, foreign assets, or are a company director',
        ],
        [
          'ITR-2',
          'Individuals and HUFs with no business or professional income',
          'Salary, multiple house properties, capital gains, foreign income or assets, income above ₹50 lakh',
          'You have business or professional income',
        ],
        [
          'ITR-3',
          'Individuals and HUFs with business or professional income',
          'Business or profession (including trading and F&O) along with salary, house property and capital gains',
          'You are a company or firm',
        ],
        [
          'ITR-4 (Sugam)',
          'Resident individuals, HUFs and firms (other than LLPs) with income up to ₹50 lakh under presumptive taxation',
          'Presumptive business income under sections 44AD, 44ADA and 44AE, plus salary, one house property and other sources',
          'Income above ₹50 lakh, more than one house property, foreign assets, or you do not opt for presumptive taxation',
        ],
      ],
      note: 'Returns for firms, LLPs, companies and trusts (ITR-5, 6 and 7) are handled as Business Tax Returns.',
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'ITR Filing', ''],
      items: [
        { title: 'PAN & Aadhaar', desc: 'PAN linked with Aadhaar, and the mobile number registered on the income tax portal.' },
        { title: 'Form 16 / Salary Slips', desc: 'Form 16 from every employer you worked with during the financial year.' },
        { title: 'AIS, TIS & Form 26AS', desc: 'Statements from the income tax portal, used to reconcile your income and TDS credit.' },
        { title: 'Bank Statements & Interest Certificates', desc: 'Savings and FD interest, plus the bank account you want any refund credited to.' },
        { title: 'Investment & Deduction Proofs', desc: 'Section 80C and 80D proofs, home loan interest certificate, NPS, donations and rent receipts.' },
        { title: 'Capital Gains & Business Records', desc: 'Broker or mutual fund statements, property sale deeds, or books and P&L for business income.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'File Your ITR', ''],
      items: [
        { title: 'Share Details', desc: 'Pick your source of income and financial year in under a minute.' },
        { title: 'Upload Documents', desc: 'Share Form 16, bank statements and investment proofs securely.' },
        { title: 'CA Prepares Return', desc: 'Our CA reconciles AIS and 26AS, compares both tax regimes and computes your tax.' },
        { title: 'Review & Approve', desc: 'You review the computation and approve it before anything is filed.' },
        { title: 'E-file & E-verify', desc: 'We file on the portal, share the acknowledgement and help you e-verify within 30 days.' },
      ],
    },
    {
      type: 'cards',
      title: ['Cost of ', 'Missing the Due Date', ''],
      subtitle: 'File on time to avoid these.',
      items: [
        {
          title: 'Late fee (section 234F)',
          desc: '₹5,000 if you file after the due date, reduced to ₹1,000 when your total income is up to ₹5 lakh.',
        },
        {
          title: 'Interest (section 234A)',
          desc: 'Interest at 1% per month or part of a month is charged on the unpaid tax from the due date.',
        },
        {
          title: 'Losses not carried forward',
          desc: 'Business and capital losses can be carried forward only if the return is filed by the due date.',
        },
        {
          title: 'Updated return only',
          desc: 'A belated return is allowed until 31 December of the assessment year. After that only an updated return (ITR-U) with additional tax is possible.',
        },
      ],
    },
  ],

  faqs: [
    {
      q: 'Who needs to file an income tax return?',
      a: 'You must file if your total income before deductions is above the basic exemption limit of your tax regime. Filing is also compulsory in certain cases irrespective of income, such as holding foreign assets or making high-value deposits or payments above the prescribed limits. Even otherwise, filing helps you claim refunds, carry forward losses and show income proof for loans and visas.',
    },
    {
      q: 'Which ITR form should I file?',
      a: 'ITR-1 is for simple salary or pension income, ITR-2 is for capital gains or more than one house property, ITR-3 is for business or professional income and ITR-4 is for presumptive taxation. Our CA picks the correct form from your documents.',
    },
    {
      q: 'What is the due date for filing an ITR?',
      a: 'For individuals and HUFs whose accounts do not need an audit, the due date is 31 July after the financial year. For taxpayers who need an audit it is 31 October. The department sometimes extends these dates, and our experts track the notified date for you.',
    },
    FAQ.missedDueDate,
    {
      q: 'Old regime or new regime: which is better for me?',
      a: 'It depends on your deductions. The new regime is the default and has lower slab rates but fewer deductions. The old regime suits taxpayers with large claims such as HRA, home loan interest and Section 80C and 80D deductions. Our CA compares both on your numbers and files the one with lower tax.',
    },
    FAQ.consultationFee,
    FAQ.updatedReturn,
    FAQ.eVerify,
  ],

  questionnaire,
};
