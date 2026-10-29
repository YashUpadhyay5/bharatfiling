import { LANGUAGE_OPTIONS } from '../itr-services/common.js';
import { NOTICE_CONSULTATION_FEE } from './quote.js';

export default {
  slug: 'income-tax-notice-response',
  name: 'Income Tax Notice Response',
  breadcrumb: 'Income Tax Notice Response',
  referText: 'Know someone who has received an income tax notice? Share this page with them.',
  fee: NOTICE_CONSULTATION_FEE,
  showTrustedPartners: false,

  // The in-page links under the hero. Each id is the id of a section below (or "faqs").
  sectionNav: [
    { label: 'Areas of Expertise', id: 'notice-areas' },
    { label: 'Updates', id: 'notice-updates' },
    { label: 'Why BharatFiling?', id: 'notice-why' },
    { label: 'FAQs', id: 'faqs' },
  ],

  hero: {
    title: 'Income Tax Notice Response',
    points: [
      { text: 'Get expert help to prepare accurate, optimized responses to income tax department notices.' },
      { text: 'Custom ITR response filings based on your income, investments, assets, and declarations.' },
      { text: 'Save money and stay fully compliant with professionally handled tax notice replies every time.' },
    ],
    formTitle: 'Book Your Consultation',
    // The struck-through price is what the consultation normally costs; the discount shown is the difference.
    offer: { originalPrice: 799 },
    extraField: { id: 'language', placeholder: 'Language', error: 'Choose a language', options: LANGUAGE_OPTIONS },
    whatsapp: false,
    submitLabel: 'Book Consultation',
    formNote: 'No Spam. No Sharing. 100% Confidentiality.',
  },

  booking: {
    heading: "Choose How You'd Like to Start",
    points: ['Pick a date and time that suits you', 'A tax expert calls you at the booked time', 'Get clear next steps for your notice'],
  },

  payment: { title: 'Payment Options' },

  sections: [
    {
      id: 'notice-areas',
      type: 'explorer',
      title: ['Areas of ', 'Expertise', ''],
      subtitle: 'Pick the notice you received to see what it means and how to respond. Section numbers are from the Income-tax Act, 1961.',
      items: [
        {
          title: 'Notice under Section 142(1)',
          intro: 'Section 142(1) lets the Income Tax Department ask for information before it completes your assessment. It is issued in two situations:',
          points: [
            { title: 'When you have filed an income tax return:', text: 'if the department needs more clarification or documents about your return, it can issue a notice under section 142(1).' },
            { title: "When you haven't filed an income tax return:", text: 'a notice under section 142(1) asks you to file the return, or to give the details the officer needs, by a stated date.' },
          ],
        },
        {
          title: 'Notice sent under Section 139(9)',
          intro: 'A notice under section 139(9) says the return you filed is defective and cannot be processed as it stands.',
          points: [
            { title: 'Common reasons:', text: 'missing or mismatched details, such as unreconciled TDS, incomplete schedules or the wrong form.' },
            { title: 'Time to respond:', text: 'you generally get 15 days from the intimation to correct the defect, and the officer can extend this on request.' },
            { title: 'If you do not respond:', text: 'the return can be treated as invalid, as if it had never been filed.' },
          ],
        },
        {
          title: 'Intimation under Section 143(1)',
          intro: "An intimation under section 143(1) is the department's first processing of your return. It shows the income, tax and refund or demand it has computed.",
          points: [
            { title: 'If the figures match:', text: 'no reply is needed. A refund, if due, is paid to your bank account.' },
            { title: 'If they differ from your return:', text: 'you can agree, or disagree and request a correction (rectification) on the e-filing portal.' },
            { title: 'If a demand is shown:', text: 'pay it, or dispute it, before the due date mentioned in the intimation.' },
          ],
        },
        {
          title: 'Notice under Section 143(2)',
          intro: 'A notice under section 143(2) means your return has been selected for scrutiny assessment.',
          points: [
            { title: 'What it asks:', text: 'an officer examines your return in detail and may ask for books, bank statements and proofs of income and deductions.' },
            { title: 'Time limit:', text: 'it must be served within three months from the end of the financial year in which the return was filed.' },
            { title: 'What to do:', text: 'respond by the date given, with documents that support every figure in your return.' },
          ],
        },
        {
          title: 'Notice under Section 148',
          intro: 'A notice under section 148 starts reassessment: the officer believes income may have escaped assessment for an earlier year.',
          points: [
            { title: 'Before the notice:', text: 'the officer first sends a show-cause notice under section 148A and considers your reply.' },
            { title: 'What to do:', text: 'file the return for that year if asked, ask for the reasons recorded for reopening, and object if they do not hold.' },
            { title: 'Time limits:', text: 'reassessment is allowed only within the time limits in the Act, which depend on the amount of income said to have escaped.' },
          ],
        },
        {
          title: 'Notice under Section 156',
          intro: 'A notice of demand under section 156 says tax, interest, penalty or fine is payable.',
          points: [
            { title: 'Time to pay:', text: 'a demand is generally payable within 30 days of the notice, failing which interest and recovery action can follow.' },
            { title: 'If you disagree:', text: 'you can request a rectification, file an appeal, or ask for a stay of recovery.' },
          ],
        },
        {
          title: 'Notice under Section 245',
          intro: 'Under section 245 the department tells you it intends to adjust your refund against an outstanding demand.',
          points: [
            { title: 'Your options:', text: 'reply on the portal agreeing to the adjustment, or disagree if the demand is wrong or already paid.' },
            { title: 'Time to respond:', text: 'you are typically given 30 days. If you do not reply, the department may go ahead and adjust the refund.' },
          ],
        },
        {
          title: 'Notice under Section 271',
          intro: 'Notices under section 271 start penalty proceedings for defaults such as not filing a return, giving inaccurate particulars of income or ignoring an earlier notice.',
          points: [
            { title: 'What it asks:', text: 'why a penalty should not be imposed, which gives you a chance to explain.' },
            { title: 'What helps:', text: 'a reasoned reply backed by documents, which can avoid or reduce the penalty.' },
          ],
        },
      ],
    },
    {
      id: 'notice-updates',
      type: 'cards',
      title: ['Notice ', 'Updates', ''],
      subtitle: 'Things worth knowing before you reply.',
      items: [
        {
          title: 'Income-tax Act, 2025',
          desc: 'The new Act applies from 1 April 2026 and renumbers sections. Returns and notices for earlier years continue under the 1961 Act, which is why the section numbers on this page are from it.',
        },
        {
          title: 'Verify every notice',
          desc: 'A notice should carry a Document Identification Number (DIN). You can check it on the e-filing portal under Authenticate Notice/Order Issued by ITD before you act on it.',
        },
        {
          title: 'Reply on the e-filing portal',
          desc: 'Most notices are answered under Pending Actions, e-Proceedings, on the e-filing portal. Check the due date on the notice and respond before it, or ask for more time.',
        },
      ],
    },
    {
      id: 'notice-why',
      type: 'cards',
      title: ['Why ', 'BharatFiling?', ''],
      items: [
        {
          title: 'Advice for your notice',
          desc: 'A tax expert reads your notice and tells you what it means, how serious it is and what to do next.',
        },
        {
          title: 'A call at a time you choose',
          desc: 'Pick a date and time that suits you. The expert calls you then, so there is no waiting in a queue.',
        },
        {
          title: 'Know the cost upfront',
          desc: 'The consultation fee is fixed and shown before you pay.',
        },
      ],
    },
  ],

  faqs: [
    {
      q: 'Do salaried employees get an income tax notice?',
      a: 'Yes. Salaried taxpayers get notices too, most often when the return does not match Form 16 or the Annual Information Statement (AIS), when interest or other income is left out, or when deductions such as HRA or Section 80C are claimed without proof.',
    },
    {
      q: 'How can I check my tax notice online?',
      a: 'Log in to the income tax e-filing portal and open Pending Actions, then e-Proceedings. Notices are also sent to the email address and mobile number registered on the portal.',
    },
    {
      q: 'Can I ignore an income tax notice?',
      a: 'No. Ignoring a notice can lead to an assessment based on the officer’s best judgment, a demand with interest, and a penalty. Even a notice you think is wrong should be answered, with reasons, before its due date.',
    },
    {
      q: 'How do I avoid a tax notice?',
      a: 'File on time, report all your income, and match your return with Form 16, Form 26AS and the AIS before you file. Keep proofs for every deduction you claim, and reply promptly to any intimation you receive.',
    },
    {
      q: 'How do I resolve my income tax notice?',
      a: 'Read the notice for the section, assessment year and due date, and verify its DIN. Collect the documents it asks for, then submit your reply on the e-filing portal before the due date. A tax expert can review the notice and prepare the reply with you.',
    },
    {
      q: 'How many years back can the income tax department send a notice?',
      a: 'It depends on the notice. A reassessment notice can generally be issued up to three years after the end of the assessment year, and for longer where a large amount of income, ₹50 lakh or more, is said to have escaped. Scrutiny and other notices have their own, shorter limits.',
    },
    {
      q: 'How to authenticate a notice or order issued by the Income Tax Department?',
      a: 'Every notice should carry a Document Identification Number (DIN). Use the Authenticate Notice/Order Issued by ITD service on the e-filing portal and enter the DIN to confirm that the notice is genuine.',
    },
    {
      q: 'How do I check my income tax notice status?',
      a: 'Open e-Proceedings under Pending Actions on the e-filing portal. It lists each notice with its due date and shows whether your response has been submitted or is still pending.',
    },
    {
      q: 'What is the punishment for ignoring a tax notice?',
      a: 'The department can assess your income on its own estimate, and a penalty applies for not complying with a notice, which is ₹10,000 for each default under section 271(1)(b). Wilful non-compliance can lead to prosecution in serious cases.',
    },
    {
      q: 'How long does it take to resolve an issue after receiving an Income Tax Notice?',
      a: 'Each notice carries its own deadline to reply, often between 7 and 30 days. A simple clarification can end with your reply, while scrutiny or reassessment can take several months.',
    },
    {
      q: 'What happens after I book a consultation?',
      a: 'You choose a date and time and pay the consultation fee. A tax expert then calls you at that time to go through your notice, explain what it means and what the next steps are.',
    },
  ],
};
