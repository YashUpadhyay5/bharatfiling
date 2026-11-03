import { DSC_DOCUMENT, defineService } from '../common.js';

export default defineService({
  slug: 'strike-off-llp',
  name: 'Strike Off LLP',
  breadcrumb: 'Strike Off LLP',
  referText: 'Know an LLP that has stopped doing business? Share this page with them.',
  fee: 5999,

  hero: {
    title: 'Close Your Inactive LLP: Strike Off with Form 24',
    points: [
      { text: 'Check your eligibility in a minute, before you pay anything' },
      { text: 'Partner consent, affidavit, statement of account and Form 24 handled for you' },
      { text: 'Complete strike off of your LLP @', price: true },
    ],
    explainerTitle: 'LLP strike off explained in 60 seconds',
    explainer: [
      'An LLP that has stopped doing business still owes Form 8 and Form 11 every year, until its name is removed from the register.',
      'An LLP with no business for a year or more, or one that never started, can apply to have its name struck off in Form 24.',
      'All partners must consent, liabilities must be nil, and Form 8 and Form 11 must be filed up to the year business stopped.',
      'The Registrar places the application on public view for a month. If nobody objects, the LLP is struck off and dissolved. We prepare and file everything.',
    ],
    formTitle: 'Close Your LLP',
  },

  payment: {
    title: 'Strike Off LLP',
    note: 'Covers the strike off itself. The Form 24 fee, pending returns and late fees are not included.',
    filings: [
      'Consent of all partners',
      'Nil statement of account, certified by a CA',
      "Designated partners' affidavit",
      'Form 24, with follow-up until the name is struck off',
    ],
    collect: 'to collect your LLP accounts, partner consents and bank closure proof',
  },

  sections: [
    {
      type: 'cards',
      title: ['Can Your LLP ', 'Be Struck Off?', ''],
      subtitle: 'Your LLP generally qualifies under rule 37 if all four of these are true.',
      items: [
        { title: 'No business for a year', desc: 'It has not done any business for at least one year, or it never started after incorporation.' },
        { title: 'Nil liabilities', desc: 'Dues are cleared and bank accounts closed, so a statement of account dated within 30 days shows nil.' },
        { title: 'All partners agree', desc: 'Every partner consents, and the designated partners sign an affidavit on the date business stopped.' },
        { title: 'Returns are filed', desc: 'Form 8 and Form 11 are filed up to the year business stopped, and copies go with Form 24.' },
      ],
    },
    {
      type: 'table',
      title: ['What Can ', 'Block the Application', ''],
      subtitle: 'The MCA portal or the Registrar will not process Form 24 in these cases.',
      columns: ['Situation', 'What to Do'],
      rows: [
        ['An open charge', 'Have the lender confirm repayment and file the satisfaction first'],
        ['A dispute between partners', 'Settle it first, because all partners have to consent'],
        ['An inspection, investigation or prosecution', 'Our team reviews how to resolve it before you apply'],
        ['Another LLP form awaiting approval', 'Wait for it to be processed, then apply'],
        ['A regulated business', 'Attach the approval of your regulator to Form 24'],
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'LLP Strike Off', ''],
      items: [
        { title: 'Partner Consent', desc: 'The written consent of all partners to close the LLP.' },
        { title: 'Statement of Account', desc: 'A nil statement of account not older than 30 days, certified by a practising CA.' },
        { title: 'Affidavit', desc: 'From the designated partners, covering the date business stopped and nil liabilities.' },
        { title: 'Filing History', desc: 'Copies of Form 8 and Form 11 up to the year business stopped.' },
        { title: 'Bank & Tax Records', desc: 'The bank closure certificate and the latest ITR acknowledgement, or a declaration if there is no PAN.' },
        DSC_DOCUMENT,
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Close Your LLP', ''],
      items: [
        { title: 'Check Eligibility', desc: 'Your answers show at once whether your LLP qualifies.' },
        { title: 'Clean Up', desc: 'You close bank accounts and clear dues, with our guidance on pending filings.' },
        { title: 'Prepare Papers', desc: 'We draft the consent, affidavit and statement of account for signature.' },
        { title: 'File Form 24', desc: 'We file the application with the MCA and respond to any queries.' },
        { title: 'Struck Off', desc: 'After a month on public view, the Registrar strikes off the name and the LLP is dissolved.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'How long does it take to close an LLP?',
      a: 'Usually two to four months from a complete filing, including one month of public notice. The Registrar processes it, so the timing can vary, and pending returns or an open bank account add time.',
    },
    {
      q: 'How much is the government fee for Form 24?',
      a: '₹500 for a small LLP and ₹1,000 for other LLPs, paid at actuals. A small LLP is one with contribution up to ₹25 lakh and turnover up to ₹40 lakh.',
    },
    {
      q: 'Do I have to file all the pending Form 8 and Form 11?',
      a: 'Yes, up to the financial year in which the LLP stopped doing business. They go with Form 24. They are not part of this fee, and our LLP filing service can clear them first.',
    },
    {
      q: 'Can I stop filing instead of closing the LLP?',
      a: 'No. The yearly filings and their late fees keep building up until the LLP is closed, and the designated partners can face penalties for the default.',
    },
    {
      q: 'What does the fee not include?',
      a: 'The Form 24 government fee, any pending Form 8 and Form 11, their late fees, stamp duty and notary charges on the affidavit, and GST cancellation.',
    },
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted LLP Closure'],
    tagline: 'Find out in a minute if your LLP can be struck off',
    points: [
      { title: 'Eligibility First', sub: 'Your answers show if the route is open, before you pay.' },
      { title: 'Every Paper Drafted', sub: 'Consent, affidavit and statement of account prepared for you.' },
      { title: 'Followed to the End', sub: 'We track Form 24 until the LLP is struck off.' },
    ],
    questions: [
      {
        id: 'businessStatus',
        type: 'radio',
        summaryLabel: 'Business status',
        label: 'Is the LLP doing any business?',
        options: [
          { value: 'never-started', label: 'It never started, and was incorporated over a year ago' },
          { value: 'stopped-1-year', label: 'No business for a year or more' },
          {
            value: 'stopped-recently',
            label: 'It stopped less than a year ago',
            stop: 'The LLP has to wait until it has had no business for a full year. Our team can tell you the date and help you stay compliant until then.',
          },
          {
            value: 'active',
            label: 'Yes, it is still doing business',
            stop: 'An LLP still doing business cannot apply with Form 24. Our team can advise you on winding down or on the alternatives.',
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
            label: 'Some dues or a bank balance remain',
            note: 'Liabilities must be nil before we can file. Our expert will guide you through clearing them, and the filing starts once that is done.',
          },
          {
            value: 'open-matter',
            label: 'There is an open charge, partner dispute, inquiry or court case',
            stop: 'An open charge, partner dispute, investigation or prosecution blocks Form 24. Our team will review how to clear it first.',
          },
        ],
      },
      {
        id: 'filingsStatus',
        type: 'radio',
        summaryLabel: 'Annual filings',
        label: 'Are Form 8 and Form 11 up to date?',
        options: [
          { value: 'up-to-date', label: 'Yes, up to the year business stopped' },
          {
            value: 'pending',
            label: 'No, some are pending',
            note: 'Form 8 and Form 11 are needed up to the year business stopped. They are not part of this fee, and our LLP filing service can clear them first.',
          },
          { value: 'not-sure', label: 'Not sure' },
        ],
      },
    ],
  },
});
