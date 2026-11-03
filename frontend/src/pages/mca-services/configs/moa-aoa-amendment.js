import { DSC_DOCUMENT, GOVERNMENT_FEES_FAQ, companyTypeQuestion, defineService } from '../common.js';

export default defineService({
  slug: 'moa-aoa-amendment',
  name: 'MOA / AOA Amendment',
  breadcrumb: 'MOA / AOA Amendment',
  referText: 'Know a company changing its name, objects or articles? Share this page with them.',
  fee: 3999,

  hero: {
    title: 'MOA and AOA Amendment: Change Your Name, Objects or Articles',
    points: [
      { text: 'Amendments drafted to fit your business and the Companies Act' },
      { text: 'Special resolution, MGT-14 and INC-24 handled where they apply' },
      { text: 'One amendment to your MOA or AOA @', price: true },
    ],
    explainerTitle: 'Amending your MOA and AOA explained in 60 seconds',
    explainer: [
      'The memorandum (MOA) sets out what your company is and may do: its name, objects, office and capital. The articles (AOA) set out how it is run.',
      'Changing either needs a board resolution and a special resolution of shareholders, passed by three-quarters of the votes cast.',
      'Form MGT-14 reports the special resolution to the Registrar within 30 days. A change of name also needs name approval and Form INC-24.',
      'Tell us what you want to change. We draft the new clauses and the resolutions, then file everything and give you the updated documents.',
    ],
    formTitle: 'Amend MOA / AOA',
  },

  payment: {
    title: 'MOA / AOA Amendment',
    note: 'Covers one amendment. MCA fees and stamp duty, where they apply, are paid at actuals.',
    collect: 'to collect your current MOA and AOA and the changes you want',
  },

  sections: [
    {
      type: 'table',
      title: ['What Each ', 'Amendment Involves', ''],
      subtitle: 'Each of these needs a special resolution of shareholders.',
      columns: ['What You Are Changing', 'Key Filings', 'Good to Know'],
      rows: [
        ['Objects clause', 'Special resolution, MGT-14', 'The Registrar registers the change and certifies it. Your business licences may need updating too.'],
        ['Company name', 'Name approval (RUN), special resolution, MGT-14, INC-24', 'You get a fresh certificate in Form INC-25. Update your PAN, bank, GST and letterhead after it.'],
        ['Articles', 'Special resolution, MGT-14', 'The altered articles are filed with the form. Amendments must follow the Act and your MOA.'],
      ],
      note: 'To increase your capital or move your registered office, use our Increase Authorized Capital or Change Registered Office service, because each has its own forms.',
    },
    {
      type: 'cards',
      title: ['Check These ', 'Before You Amend', ''],
      items: [
        { title: 'Pending filings block a name change', desc: 'A company with annual returns or financial statements overdue, or in default on deposits or debentures, cannot change its name (rule 29).' },
        { title: 'Pick a name that is available', desc: 'A new name must not be identical or too similar to an existing company or a registered trademark.' },
        { title: 'File within 30 days', desc: 'Form MGT-14 is due within 30 days of the special resolution under section 117. A later filing adds a fee that rises with the delay.' },
        { title: '21 days\' notice', desc: 'A shareholders\' meeting normally needs 21 clear days\' notice, unless enough members agree to a shorter one.' },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required to ', 'Amend Your MOA or AOA', ''],
      items: [
        { title: 'Current MOA & AOA', desc: 'Your latest memorandum and articles, in an editable format if you have one.' },
        { title: 'Proposed Changes', desc: 'The new objects, proposed names in order of preference, or the clause to change.' },
        { title: 'Certificate of Incorporation', desc: 'Your certificate of incorporation and any later certificates.' },
        { title: 'Filing Status', desc: 'Your latest AOC-4 and MGT-7, so we can confirm they are up to date.' },
        { title: 'Meeting Details', desc: 'Proposed dates of the board and shareholders\' meetings. We draft the papers.' },
        DSC_DOCUMENT,
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Amend Your Documents', ''],
      items: [
        { title: 'Share the Change', desc: 'Tell us what is changing and the type of company.' },
        { title: 'Draft the Clauses', desc: 'We draft the new clauses and agree the wording with you.' },
        { title: 'Pass Resolutions', desc: 'We prepare the notice, explanatory statement and resolutions for your meetings.' },
        { title: 'File the Forms', desc: 'We file MGT-14, and RUN and INC-24 for a change of name.' },
        { title: 'Get New Documents', desc: 'You receive the updated MOA and AOA and any fresh certificate.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'How long does a change of name take?',
      a: 'Usually two to four weeks, including name approval, the shareholders\' meeting and the Registrar\'s approval of INC-24. You then update your PAN, bank, GST and other records with the new name.',
    },
    {
      q: 'Do I need a special resolution for every amendment?',
      a: 'Yes. Altering the name, objects or articles needs a special resolution, passed by at least three-quarters of the votes cast, and it is filed in Form MGT-14 within 30 days.',
    },
    {
      q: 'Can I change my business activity?',
      a: 'Yes. You alter the objects clause of your MOA by special resolution. If the new activity needs a licence, or falls under a regulator such as the RBI, check that before you pass the resolution.',
    },
    {
      q: 'Can I make several changes at once?',
      a: 'Yes, in one set of resolutions. The filings depend on the combination, so our team quotes for them after seeing the changes you need.',
    },
    {
      q: 'What if my annual filings are pending?',
      a: 'A company with overdue annual returns or financial statements cannot change its name, and pending filings can hold up other changes. Our ROC filing service can clear them first.',
    },
    GOVERNMENT_FEES_FAQ,
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted MOA & AOA Amendment'],
    tagline: 'Company law experts for your charter documents',
    points: [
      { title: 'Clauses Drafted', sub: 'New wording prepared to fit your business and the Act.' },
      { title: 'Resolutions Prepared', sub: 'Notices, statements and special resolutions drafted for you.' },
      { title: 'Filed in 30 Days', sub: 'MGT-14 and INC-24 filed within the deadline.' },
    ],
    questions: [
      {
        id: 'amendment',
        type: 'radio',
        summaryLabel: 'Amendment',
        label: 'What are you changing?',
        options: [
          {
            value: 'objects',
            label: 'Objects clause (business activity)',
            filing: ['Drafted objects clause', 'Board and special resolutions', 'Form MGT-14'],
          },
          {
            value: 'name',
            label: 'Company name',
            filing: ['Name approval through RUN', 'Board and special resolutions', 'Form MGT-14 and Form INC-24'],
          },
          {
            value: 'articles',
            label: 'Articles of association',
            filing: ['Drafted articles', 'Board and special resolutions', 'Form MGT-14'],
          },
          {
            value: 'several',
            label: 'More than one of these',
            stop: 'The filings depend on the combination of changes, so our team reviews them and quotes one fee for the whole change.',
          },
          {
            value: 'not-sure',
            label: 'Not sure yet',
            filing: ['Drafted amendment', 'Board and special resolutions', 'Form MGT-14, and INC-24 for a change of name'],
          },
        ],
      },
      companyTypeQuestion,
      {
        id: 'filingsStatus',
        type: 'radio',
        summaryLabel: 'Annual filings',
        label: 'Are your annual filings up to date?',
        options: [
          { value: 'up-to-date', label: 'Yes, they are up to date' },
          {
            value: 'pending',
            label: 'No, some are pending',
            note: 'Pending annual filings block a change of name and can hold up other amendments. They are not part of this fee, and our ROC filing service can clear them first.',
          },
          { value: 'not-sure', label: 'Not sure' },
        ],
      },
    ],
  },
});
