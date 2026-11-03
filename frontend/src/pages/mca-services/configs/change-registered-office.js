import { DSC_DOCUMENT, GOVERNMENT_FEES_FAQ, companyTypeQuestion, defineService, inr } from '../common.js';

// Mirrors OFFICE_MOVE_FEES in backend/src/routes/registrations/mca-services/service.js.
export const OFFICE_MOVE_FEES = { 'same-city': 3499, 'other-city': 3499, 'other-roc': 9999, 'other-state': 14999 };

const SPECIAL_RESOLUTION = ['Board and special resolutions', 'Form MGT-14'];
const REGIONAL_DIRECTOR = ['Newspaper notice and notices to creditors', 'Form INC-23 to the Regional Director', 'Form INC-28 and Form INC-22 after the order'];

export default defineService({
  slug: 'change-registered-office',
  name: 'Change Registered Office',
  breadcrumb: 'Change Registered Office',
  referText: 'Know a company moving its registered office? Share this page with them.',
  fee: OFFICE_MOVE_FEES['same-city'],

  hero: {
    title: 'Change Your Registered Office: The Right Route for Your Move',
    points: [
      { text: 'Within your city, across your state or to another state' },
      { text: 'You see the exact forms and fee for your move before you pay' },
      { text: 'Move within your Registrar\'s area from', price: true },
    ],
    explainerTitle: 'Moving your office explained in 60 seconds',
    explainer: [
      'Every company must keep a registered office and tell the Registrar of Companies of any change within 30 days, in Form INC-22.',
      'A move within the same city needs only a board resolution. A move to another city also needs a special resolution of shareholders.',
      'A move into the area of another Registrar, or to another state, also needs the approval of the Regional Director, with public notice to creditors.',
      'Tell us where you are moving. We work out the route, draft every paper and take the application through to the final filing.',
    ],
    formTitle: 'Move Your Registered Office',
  },

  payment: {
    title: 'Change Registered Office',
    note: 'The fee depends on your route. MCA fees, stamp duty, and newspaper costs where they apply are paid at actuals.',
    collect: 'to collect proof of the new address and your company documents',
  },

  sections: [
    {
      type: 'table',
      title: ['Which Route Does ', 'Your Move Need', ''],
      subtitle: 'The route depends on where the new office is, not on how far you move.',
      columns: ['Your Move', 'Approval Needed', 'Forms', 'Typical Time', 'Our Fee'],
      rows: [
        ['Within the same city', 'Board resolution', 'INC-22', '7-12 working days', inr(OFFICE_MOVE_FEES['same-city'])],
        ['Another city, same Registrar', 'Board and special resolution', 'MGT-14, INC-22', '2-3 weeks', inr(OFFICE_MOVE_FEES['other-city'])],
        ['Same state, another Registrar', 'Special resolution and Regional Director', 'MGT-14, INC-23, INC-28, INC-22', '2-3 months', inr(OFFICE_MOVE_FEES['other-roc'])],
        ['To another state', 'Special resolution and Regional Director, with the MOA altered', 'MGT-14, INC-23, INC-28, INC-22', '3-6 months', inr(OFFICE_MOVE_FEES['other-state'])],
      ],
      note: 'Fees exclude 18% GST. Typical times are estimates and depend on the Registrar, the Regional Director and any objections from creditors.',
    },
    {
      type: 'cards',
      title: ['What to Plan ', 'Around the Move', ''],
      items: [
        { title: 'Notify within 30 days', desc: 'Form INC-22 is due within 30 days of the change under section 12(4), and a late filing adds a fee that rises with the delay.' },
        { title: 'Creditors can object', desc: 'For a move needing the Regional Director, you publish a notice and write to creditors at least a month before you apply.' },
        { title: 'Update your other records', desc: 'GST, PAN, TAN, bank accounts, licences and your letterhead all need the new address after the move.' },
        { title: 'Closing soon?', desc: 'A company cannot apply for strike off within three months of moving its registered office to another state.' },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required to ', 'Move Your Office', ''],
      items: [
        { title: 'Proof of New Office', desc: 'A rent agreement or sale deed for the new address.' },
        { title: 'Owner NOC', desc: 'A no-objection certificate from the owner of the premises.' },
        { title: 'Utility Bill', desc: 'An electricity, water or gas bill for the premises, not older than two months.' },
        { title: 'Company Documents', desc: 'The certificate of incorporation, MOA and AOA, and the latest filings.' },
        { title: 'Creditor List', desc: 'For the Regional Director route, a certified list of creditors and debenture holders.' },
        DSC_DOCUMENT,
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Move Your Office', ''],
      items: [
        { title: 'Choose the Route', desc: 'Your answers decide the route, the forms and the fee.' },
        { title: 'Share Documents', desc: 'Send proof of the new address and your company documents.' },
        { title: 'Pass Resolutions', desc: 'We draft the board and shareholder resolutions your route needs.' },
        { title: 'Notices & Approval', desc: 'Where needed, we publish notices and apply to the Regional Director.' },
        { title: 'Final Filings', desc: 'We file INC-22 and any linked forms, and share the approved records.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'What is the deadline to report the new address?',
      a: 'Form INC-22 is due within 30 days of the change. For a move needing the Regional Director, Form INC-28 is filed within 30 days of receiving the certified order, followed by INC-22.',
    },
    {
      q: 'Why does a move in the same state sometimes need the Regional Director?',
      a: 'A state can have more than one Registrar of Companies. Moving into the area of another Registrar needs the confirmation of the Regional Director even though you stay in the state, as Maharashtra companies moving between Mumbai and Pune do.',
    },
    {
      q: 'Does the CIN change?',
      a: 'A move to another state changes the state code in your CIN, and the Registrar issues a fresh certificate. A move within the same state does not change the state code.',
    },
    {
      q: 'Can I use a virtual or shared office?',
      a: 'Yes, if the address can receive notices and you have the rent agreement, the owner\'s no-objection certificate and a utility bill. Check with your GST officer too, because the GST address needs its own verification.',
    },
    {
      q: 'Does your fee include updating GST and other registrations?',
      a: 'No. This service covers the MCA filings. Our team can quote for updating GST and your other registrations once the move is approved.',
    },
    GOVERNMENT_FEES_FAQ,
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted Office Change'],
    tagline: 'The right route, the right forms, and one clear fee',
    points: [
      { title: 'Route Worked Out', sub: 'Your answers decide the forms and the fee before you pay.' },
      { title: 'Papers Drafted', sub: 'Resolutions, notices and applications prepared for you.' },
      { title: 'Taken to Completion', sub: 'From the first resolution to the final INC-22.' },
    ],
    questions: [
      {
        id: 'moveType',
        type: 'radio',
        summaryLabel: 'Move',
        label: 'Where is the office moving?',
        options: [
          {
            value: 'same-city',
            label: 'Within the same city or town',
            fee: OFFICE_MOVE_FEES['same-city'],
            filing: ['Board resolution', 'Form INC-22'],
          },
          {
            value: 'other-city',
            label: 'To another city, under the same Registrar',
            fee: OFFICE_MOVE_FEES['other-city'],
            filing: [...SPECIAL_RESOLUTION, 'Form INC-22'],
          },
          {
            value: 'other-roc',
            label: 'Same state, under another Registrar',
            fee: OFFICE_MOVE_FEES['other-roc'],
            filing: [...SPECIAL_RESOLUTION, ...REGIONAL_DIRECTOR],
            note: 'This route usually takes 2-3 months because of the notice period and the approval of the Regional Director.',
          },
          {
            value: 'other-state',
            label: 'To another state',
            fee: OFFICE_MOVE_FEES['other-state'],
            filing: [...SPECIAL_RESOLUTION, ...REGIONAL_DIRECTOR, 'Altered situation clause in the MOA'],
            note: 'This route usually takes 3-6 months because of the notice period and the approval of the Regional Director.',
          },
        ],
      },
      companyTypeQuestion,
    ],
  },
});
