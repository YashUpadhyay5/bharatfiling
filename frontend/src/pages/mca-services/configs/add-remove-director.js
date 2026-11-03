import { DSC_DOCUMENT, GOVERNMENT_FEES_FAQ, companyTypeQuestion, countOptions, defineService, plural } from '../common.js';

export default defineService({
  slug: 'add-remove-director',
  name: 'Add / Remove Director',
  breadcrumb: 'Add / Remove Director',
  referText: 'Know a company that is changing its directors? Share this page with them.',
  fee: 2499,
  unitLabel: (n) => plural('director', n),

  hero: {
    title: 'Add or Remove a Director: DIR-12 and Resolutions Handled for You',
    points: [
      { text: 'Appointments, resignations, removals and changes of designation' },
      { text: 'DIN application, consent forms and board resolutions included' },
      { text: 'Director change per director @', price: true },
    ],
    explainerTitle: 'Changing a director explained in 60 seconds',
    explainer: [
      'Every change of director has to be reported to the Registrar of Companies in Form DIR-12 within 30 days.',
      'A new director needs a DIN and gives a written consent (DIR-2) and a declaration that they are not disqualified (DIR-8).',
      'A director can resign by written notice. Removing one against their will needs a shareholders\' meeting, a special notice and a chance for them to be heard.',
      'Tell us the change you need. We draft the resolutions and forms, then file DIR-12 and update your statutory registers.',
    ],
    formTitle: 'Change a Director',
  },

  payment: {
    title: 'Add / Remove Director',
    note: 'Priced per director changing. MCA fees and any late fee are paid at actuals.',
    collect: 'to collect the director details and draft the resolutions',
  },

  sections: [
    {
      type: 'table',
      title: ['The Right Process for ', 'Each Change', ''],
      subtitle: 'Form DIR-12 is due within 30 days of every change.',
      columns: ['Change', 'What the Law Requires', 'Key Forms'],
      rows: [
        ['Appoint', 'Board resolution, with shareholder approval at the next general meeting for an additional director (sections 152 and 161)', 'DIR-2, DIR-8, MBP-1, DIR-12, and a DIN if the person has none'],
        ['Resign', 'Written notice from the director, noted by the board. It takes effect on receipt or on a later date in the notice (section 168).', 'Resignation letter, DIR-12, and DIR-11 if the director chooses to file it'],
        ['Remove', 'Special notice at least 14 days before the meeting, a chance for the director to be heard, and an ordinary resolution of shareholders (sections 115 and 169)', 'Notices, resolution, DIR-12'],
        ['Redesignate', 'Board and shareholder approval, for example from additional director to director, or to managing director', 'Resolutions, DIR-12, and MGT-14 where it applies'],
      ],
    },
    {
      type: 'cards',
      title: ['Check These ', 'Before You Change', ''],
      items: [
        { title: 'Minimum directors', desc: 'A private company needs two directors, a public company three and an OPC one. A change cannot take you below the minimum.' },
        { title: 'Resident director', desc: 'At least one director must have stayed in India for 182 days or more during the financial year (section 149).' },
        { title: 'Active DIN', desc: 'An incoming director needs an active DIN with their KYC up to date, and must not be disqualified under section 164.' },
        { title: 'Late filing', desc: 'A late DIR-12 adds a fee of up to 12 times the normal fee after 180 days, on top of the normal fee.' },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for a ', 'Director Change', ''],
      items: [
        { title: 'Identity Proof', desc: 'PAN and Aadhaar of the incoming director, or a passport for a foreign national.' },
        { title: 'Address Proof', desc: 'A recent bank statement or utility bill of the incoming director, with a photograph.' },
        { title: 'Resignation Letter', desc: 'The signed notice from the director who is leaving, with proof of delivery to the company.' },
        { title: 'Company Records', desc: 'The certificate of incorporation, the articles and the current list of directors.' },
        { title: 'Meeting Details', desc: 'Proposed date of the board meeting and, for a removal, of the shareholders\' meeting.' },
        DSC_DOCUMENT,
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Change Your Director', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us the type of change, the number of directors and the type of company.' },
        { title: 'Check Eligibility', desc: 'We check the DIN, disqualification status and the minimum number of directors.' },
        { title: 'Draft Papers', desc: 'We draft the consents, notices and resolutions for your signature.' },
        { title: 'File DIR-12', desc: 'We file Form DIR-12 and any linked form within the 30-day window.' },
        { title: 'Update Registers', desc: 'Your statutory registers are updated, and you get the filing receipts.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'How long does the company have to report a change?',
      a: 'Form DIR-12 is due within 30 days of the appointment, resignation or removal. After that, an additional fee applies that rises with the delay.',
    },
    {
      q: 'Can a director simply resign?',
      a: 'Yes. A director can resign by written notice, and it takes effect when the company receives it or on a later date stated in the notice. The company reports it in DIR-12 within 30 days. The director stays liable for offences that took place during their tenure.',
    },
    {
      q: 'Can shareholders remove a director who does not agree to leave?',
      a: 'Yes, under section 169, by an ordinary resolution after special notice and after giving the director a chance to be heard. A contested removal can lead to a dispute, so our expert reviews the facts with you first.',
    },
    {
      q: 'What if the new director has no DIN?',
      a: 'We apply for one in Form DIR-3 as part of the appointment. The person needs a digital signature, and the government fee is paid at actuals.',
    },
    {
      q: 'How is the fee calculated?',
      a: 'The fee is per director changing. Appointing one director and accepting another\'s resignation are two changes. For more than three directors, our team prepares a combined quote.',
    },
    GOVERNMENT_FEES_FAQ,
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted Director Changes'],
    tagline: 'Company law experts for every change on your board',
    points: [
      { title: 'Eligibility Checked', sub: 'DIN, disqualification and minimum director rules checked first.' },
      { title: 'Papers Drafted', sub: 'Consents, notices and resolutions prepared for your signature.' },
      { title: 'Filed in 30 Days', sub: 'DIR-12 filed within the deadline, with your registers updated.' },
    ],
    questions: [
      {
        id: 'changeType',
        type: 'radio',
        summaryLabel: 'Change',
        label: 'What change do you need?',
        options: [
          {
            value: 'appoint',
            label: 'Appoint a new director',
            filing: ['DIN application, if the person has none', 'Form DIR-2 consent and DIR-8 declaration', 'Board resolution', 'Form DIR-12'],
          },
          {
            value: 'resign',
            label: 'A director is resigning',
            filing: ['Board note of the resignation', 'Form DIR-12', 'Updated register of directors'],
          },
          {
            value: 'remove',
            label: 'Remove a director',
            filing: ['Special notice and notice of the meeting', 'Ordinary resolution of shareholders', 'Form DIR-12'],
            note: 'A removal needs a shareholders\' meeting after a special notice and a hearing for the director, so allow three to four weeks.',
          },
          {
            value: 'redesignate',
            label: 'Change a designation',
            filing: ['Board and shareholder resolutions', 'Form DIR-12, and MGT-14 where it applies'],
          },
        ],
      },
      {
        id: 'directors',
        type: 'select',
        summaryLabel: 'Directors changing',
        label: 'How many directors are changing?',
        options: countOptions('director', 3, 'For more than three directors, our team prepares a combined quote for the whole change.'),
      },
      companyTypeQuestion,
    ],
  },
});
