import { COMPANY_TYPE_OPTIONS, DSC_DOCUMENT, companyTypeQuestion, defineService } from '../common.js';

export default defineService({
  slug: 'strike-off-company',
  name: 'Strike Off Company',
  breadcrumb: 'Strike Off Company',
  referText: 'Know a company that has stopped doing business? Share this page with them.',
  fee: 7999,

  hero: {
    title: 'Close Your Inactive Company: Strike Off Under Section 248',
    points: [
      { text: 'Check your eligibility in a minute, before you pay anything' },
      { text: 'Resolutions, affidavits, indemnities and Form STK-2 handled for you' },
      { text: 'Complete strike off of your company @', price: true },
    ],
    explainerTitle: 'Company strike off explained in 60 seconds',
    explainer: [
      'A company that has stopped doing business still owes annual filings every year, and directors risk disqualification if it does not file them.',
      'Strike off under section 248 removes the company from the register, if it has no business, and has nil assets and liabilities.',
      'You file Form STK-2 with a government fee of ₹10,000, after clearing returns up to the year business stopped. The Registrar then publishes a public notice.',
      'If nobody objects, the name is struck off and the company is dissolved. We check your eligibility, draft every paper and follow it to the final notice.',
    ],
    formTitle: 'Close Your Company',
  },

  payment: {
    title: 'Strike Off Company',
    note: 'Covers the strike off itself. The ₹10,000 STK-2 fee, stamp duty, pending returns and late fees are not included.',
    filings: [
      'Board and special resolutions, with Form MGT-14',
      'Form STK-3 indemnity and Form STK-4 affidavit from each director',
      'Form STK-8 statement of accounts',
      'Form STK-2, with follow-up until the final notice',
    ],
    collect: 'to collect your financials, bank closure proof and director details',
  },

  sections: [
    {
      type: 'cards',
      title: ['Can Your Company ', 'Be Struck Off?', ''],
      subtitle: 'Your company generally qualifies if all four of these are true.',
      items: [
        { title: 'No business', desc: 'It never started business within a year of incorporation, or had none in the last two financial years. The two years count from after the year it stopped.' },
        { title: 'Nil assets and liabilities', desc: 'Bank accounts are closed, loans repaid and statutory dues cleared, so the accounts show nil, certified within the last 30 days.' },
        { title: 'Members agree', desc: 'A special resolution is passed, or members holding 75% of the paid-up capital consent. Every director gives an indemnity and an affidavit.' },
        { title: 'Returns are filed', desc: 'AOC-4 and MGT-7 or MGT-7A are filed up to the year business stopped. All years are needed if the Registrar has already started action.' },
      ],
    },
    {
      type: 'table',
      title: ['When Strike Off ', 'Is Not Available', ''],
      subtitle: 'Sections 248 and 249 close this route in these cases. Our team will advise you on the alternative.',
      columns: ['Situation', 'Why It Blocks Strike Off', 'What to Do'],
      rows: [
        ['Section 8 company', 'The rules do not allow the route for Section 8 companies', 'Consider voluntary liquidation or winding up with professional advice'],
        ['Listed company', 'Listed companies and those delisted for non-compliance are barred', 'Consider winding up with professional advice'],
        ['Regulated business', 'NBFCs, insurers and SEBI intermediaries need their regulator\'s approval first', 'Obtain regulatory approval, then apply'],
        ['Inquiry, prosecution or deposits', 'An open inquiry, prosecution, public deposit or charge blocks the application', 'Resolve the matter or satisfy the charge first'],
        ['Recent changes', 'Barred within 3 months of a change of name, a move to another state, or a sale of trading property', 'Wait until the 3 months have passed'],
      ],
    },
    {
      type: 'table',
      title: ['Strike Off or ', 'Winding Up?', ''],
      subtitle: 'For most small inactive companies, strike off is the simpler route.',
      columns: ['Point', 'Strike Off (Section 248)', 'Winding Up / Liquidation'],
      rows: [
        ['Best for', 'Inactive companies with nil assets and liabilities', 'Companies with assets to sell, or creditors to pay'],
        ['Decided by', 'The Registrar, through the C-PACE processing centre', 'The Tribunal or a liquidator'],
        ['Typical time', 'Around 2-4 months after a complete filing', 'A year or more'],
        ['Cost', 'Lower, with a ₹10,000 government fee', 'Higher, with liquidator and legal costs'],
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'Company Strike Off', ''],
      items: [
        { title: 'Financial Statements', desc: 'The latest audited accounts and a nil statement of accounts certified by a CA.' },
        { title: 'Bank Closure Proof', desc: 'Closure certificates for every bank account of the company.' },
        { title: 'Director Documents', desc: 'PAN and address proof of each director, for the affidavit and indemnity.' },
        { title: 'Tax & GST Records', desc: 'The latest ITR acknowledgement, and the GST cancellation order where registered.' },
        { title: 'Filing History', desc: 'AOC-4 and MGT-7 or MGT-7A filed up to the year business stopped.' },
        DSC_DOCUMENT,
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Close Your Company', ''],
      items: [
        { title: 'Check Eligibility', desc: 'Your answers show at once whether your company qualifies.' },
        { title: 'Clean Up', desc: 'You close bank accounts and clear dues, with our guidance on pending filings.' },
        { title: 'Prepare Papers', desc: 'We draft the resolutions, STK-3, STK-4 and STK-8 for signature.' },
        { title: 'File STK-2', desc: 'We file the application with the MCA and handle any queries.' },
        { title: 'Final Notice', desc: 'After the public notice period, the company is dissolved by a notice in the Official Gazette.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'How long does a strike off take?',
      a: 'Usually around 2-4 months from a complete filing, including the public notice period. The Registrar processes it, so the timing can vary, and clearing pending returns or closing bank accounts first adds time.',
    },
    {
      q: 'Can I simply stop filing instead of closing the company?',
      a: 'No. A company that stops filing still accrues ₹100 a day for each late form, and three years of default can disqualify every director for five years across all their companies.',
    },
    {
      q: 'Are directors free of liability after a strike off?',
      a: 'Not entirely. Under section 248(7), the liability of every director, officer and member continues after dissolution and can be enforced as if the company still existed. That is why assets and liabilities must be nil first.',
    },
    {
      q: 'Can a struck-off company be restored?',
      a: 'Yes. Under section 252, the Tribunal can restore it on an appeal filed within three years, or on an application by the company, a member, a creditor or a workman within twenty years.',
    },
    {
      q: 'What about pending annual filings?',
      a: 'AOC-4 and MGT-7 or MGT-7A are needed up to the year business stopped. They are not part of this fee, and the ₹100 a day late fee is paid to the MCA. Our ROC filing service can clear them first.',
    },
    {
      q: 'What does the fee not include?',
      a: 'The ₹10,000 government fee for STK-2, stamp duty on the indemnity and affidavit, pending returns, and late fees. GST cancellation and closing the PAN are also separate.',
    },
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted Company Closure'],
    tagline: 'Find out in a minute if your company can be struck off',
    points: [
      { title: 'Eligibility First', sub: 'Your answers show if the route is open, before you pay.' },
      { title: 'Every Paper Drafted', sub: 'Resolutions, STK-3, STK-4 and STK-8 prepared for you.' },
      { title: 'Followed to the End', sub: 'We track your application up to the final Gazette notice.' },
    ],
    questions: [
      {
        ...companyTypeQuestion,
        options: [
          ...COMPANY_TYPE_OPTIONS.map((o) =>
            o.value === 'section-8'
              ? { ...o, stop: 'Section 8 companies cannot use the strike off route, so our team will advise you on the alternatives.' }
              : o
          ),
          {
            value: 'listed',
            label: 'Listed company',
            stop: 'Listed companies cannot use the strike off route, so our team will advise you on the alternatives.',
          },
          {
            value: 'regulated',
            label: 'Regulated business (NBFC, insurance, SEBI intermediary)',
            stop: 'A regulated company needs its regulator\'s approval before it can apply, so our team will review your case first.',
          },
        ],
      },
      {
        id: 'businessStatus',
        type: 'radio',
        summaryLabel: 'Business status',
        label: 'Is the company doing any business?',
        options: [
          { value: 'never-started', label: 'It never started, and was incorporated over a year ago' },
          { value: 'stopped-2-years', label: 'No business in the last two full financial years' },
          {
            value: 'stopped-recently',
            label: 'It stopped recently, or was incorporated less than a year ago',
            stop: 'The company has to wait until it has had no business for two full financial years, or for a year from incorporation if it never started. Our team can tell you the date and help you stay compliant until then.',
          },
          {
            value: 'active',
            label: 'Yes, it is still doing business',
            stop: 'A company still doing business cannot apply for strike off. Our team can advise you on winding down or on the alternatives.',
          },
        ],
      },
      {
        id: 'liabilities',
        type: 'radio',
        summaryLabel: 'Assets and liabilities',
        label: 'What is the position on assets and liabilities?',
        options: [
          { value: 'nil', label: 'Nil, and the bank accounts are closed' },
          {
            value: 'closing',
            label: 'Some dues, loans or a bank balance remain',
            note: 'Assets and liabilities must be nil before we can file. Our expert will guide you through clearing them, and the filing starts once that is done.',
          },
          {
            value: 'open-matter',
            label: 'There is an open charge, deposit, inquiry or court case',
            stop: 'An open charge, public deposit, inquiry or prosecution blocks a strike off under section 249. Our team will review how to clear it first.',
          },
        ],
      },
      {
        id: 'filingsStatus',
        type: 'radio',
        summaryLabel: 'Annual filings',
        label: 'Are the annual filings up to date?',
        options: [
          { value: 'up-to-date', label: 'Yes, up to the year business stopped' },
          {
            value: 'pending',
            label: 'No, some are pending',
            note: 'AOC-4 and MGT-7 or MGT-7A are needed up to the year business stopped. They are not part of this fee, and our ROC filing service can clear them first.',
          },
          { value: 'not-sure', label: 'Not sure' },
        ],
      },
    ],
  },
});
