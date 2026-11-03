import { DSC_DOCUMENT, GOVERNMENT_FEES_FAQ, companyTypeQuestion, defineService } from '../common.js';

const BASE_FILING = ['Board resolution and shareholder meeting papers', 'Form SH-7', 'Altered capital clause in the MOA'];

export default defineService({
  slug: 'increase-authorized-capital',
  name: 'Increase Authorized Capital',
  breadcrumb: 'Increase Authorized Capital',
  referText: 'Know a company raising funds or issuing new shares? Share this page with them.',
  fee: 2999,

  hero: {
    title: 'Increase Your Authorised Share Capital with Form SH-7',
    points: [
      { text: 'Resolutions, altered MOA and Form SH-7 prepared by company law experts' },
      { text: 'Exact ROC fee and state stamp duty confirmed before you file' },
      { text: 'Increase your authorised capital @', price: true },
    ],
    explainerTitle: 'Authorised capital explained in 60 seconds',
    explainer: [
      'Authorised capital is the ceiling on the shares your company can issue. To issue more than the ceiling, you must raise it first.',
      'The increase needs a board resolution and a shareholder resolution under section 61, and an altered capital clause in your MOA.',
      'Form SH-7 goes to the Registrar within 30 days of the resolution, with the ROC fee and the state stamp duty on the increase.',
      'Tell us the new capital. We check your articles, draft the papers, confirm the cost and file SH-7 for you.',
    ],
    formTitle: 'Increase Capital',
  },

  payment: {
    title: 'Increase Authorized Capital',
    note: 'Covers one increase. The ROC fee and the state stamp duty on the increase are paid at actuals.',
    collect: 'to collect your MOA, AOA and the details of the new capital',
  },

  sections: [
    {
      type: 'cards',
      title: ['Before You ', 'Increase Capital', ''],
      subtitle: 'The points that decide the cost and the paperwork.',
      items: [
        { title: 'Check your articles', desc: 'If the articles do not allow an increase, they are first amended by special resolution under section 14, with Form MGT-14.' },
        { title: 'Know the real cost', desc: 'The ROC fee depends on your capital slab, and stamp duty depends on your state and the size of the increase. Small companies and OPCs pay less.' },
        { title: 'File within 30 days', desc: 'Form SH-7 is due within 30 days of the resolution. A later filing adds a fee that rises with the delay.' },
        { title: 'It issues no shares', desc: 'The increase only raises the ceiling. Actually allotting shares is a separate step, with Form PAS-3.' },
      ],
    },
    {
      type: 'table',
      title: ['Why SH-7 Filings ', 'Get Rejected', ''],
      subtitle: 'The usual reasons, and how we avoid them.',
      columns: ['Common Mistake', 'What Goes Wrong', 'What We Do'],
      rows: [
        ['Clause V mismatch', 'The capital in the e-MOA differs from the resolution', 'Match the MOA, the resolution and the form before filing'],
        ['Wrong stamp duty', 'The duty is worked out on the wrong amount or for the wrong state', 'Confirm the duty on the increase for your state in advance'],
        ['Missing explanatory statement', 'The notice of the meeting omits the section 102 statement', 'Draft the full notice and statement for the meeting'],
        ['Articles not checked', 'The articles do not allow the increase', 'Review the articles first, and add MGT-14 where needed'],
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required to ', 'Increase Capital', ''],
      items: [
        { title: 'Company Documents', desc: 'The certificate of incorporation, and the current MOA and AOA in editable form.' },
        { title: 'New Capital Details', desc: 'The present and proposed authorised capital, with the class of shares.' },
        { title: 'Board Resolution', desc: 'We draft it. Share the proposed date of the board meeting.' },
        { title: 'Meeting Notice', desc: 'We draft the notice with the section 102 explanatory statement.' },
        { title: 'Shareholder Resolution', desc: 'A certified copy of the resolution, drafted by us and passed at your meeting.' },
        DSC_DOCUMENT,
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Increase Your Capital', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us the new capital and the type of company.' },
        { title: 'Check & Quote', desc: 'We review your articles and confirm the ROC fee and stamp duty.' },
        { title: 'Pass Resolutions', desc: 'We draft the notice and resolutions for your board and shareholder meetings.' },
        { title: 'File SH-7', desc: 'We file SH-7, with MGT-14 if needed, and the altered MOA.' },
        { title: 'Update Records', desc: 'You receive the approved form and the updated MOA for your records.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'Which resolution is needed?',
      a: 'An ordinary resolution of shareholders under section 61, after a board resolution. If your articles do not allow the increase, a special resolution amends them first under section 14, and that is filed in Form MGT-14.',
    },
    {
      q: 'Does an increase mean that I must issue new shares?',
      a: 'No. It only raises the ceiling on the shares you can issue. You can allot shares later, and that is a separate process with Form PAS-3.',
    },
    {
      q: 'How much does the increase cost in government charges?',
      a: 'There are two: an ROC fee based on your capital slab, and stamp duty that depends on your state and the size of the increase. Our expert gives you the exact figure before you file.',
    },
    {
      q: 'What is the deadline for SH-7?',
      a: 'Within 30 days of passing the resolution. A later filing carries an additional fee that rises with the delay.',
    },
    {
      q: 'Can authorised capital be reduced in the same way?',
      a: 'Unissued capital can be cancelled by an ordinary resolution, again with SH-7. Reducing issued or paid-up capital is different: it needs the approval of the Tribunal under section 66. Talk to our team if you need this.',
    },
    GOVERNMENT_FEES_FAQ,
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted Capital Increase'],
    tagline: 'Company law experts for Form SH-7 and your MOA',
    points: [
      { title: 'Cost Confirmed First', sub: 'ROC fee and state stamp duty worked out before you file.' },
      { title: 'Papers Drafted', sub: 'Notice, resolutions and the altered MOA prepared for you.' },
      { title: 'Filed in 30 Days', sub: 'SH-7 filed within the deadline to avoid an additional fee.' },
    ],
    questions: [
      companyTypeQuestion,
      {
        id: 'increaseSize',
        type: 'select',
        summaryLabel: 'Size of increase',
        label: 'How large is the increase?',
        options: [
          { value: 'upto-10-lakh', label: 'Up to ₹10 lakh' },
          { value: '10-lakh-to-1-crore', label: '₹10 lakh to ₹1 crore' },
          { value: 'above-1-crore', label: 'Above ₹1 crore' },
          { value: 'not-sure', label: 'Not decided yet' },
        ],
      },
      {
        id: 'articlesAllow',
        type: 'radio',
        summaryLabel: 'Articles allow it',
        label: 'Do your articles of association allow the increase?',
        options: [
          { value: 'yes', label: 'Yes', filing: BASE_FILING },
          {
            value: 'no',
            label: 'No',
            filing: ['Special resolution and Form MGT-14 to amend the articles', ...BASE_FILING],
          },
          {
            value: 'not-sure',
            label: 'Not sure, please check',
            filing: [...BASE_FILING, 'Form MGT-14, if your articles need amending'],
          },
        ],
      },
    ],
  },
});
