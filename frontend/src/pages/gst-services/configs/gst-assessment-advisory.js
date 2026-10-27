export default {
  slug: 'gst-assessment-advisory',
  name: 'GST Assessment Advisory',
  referText: 'Know a business owner who received a GST notice? Share this page with them.',

  hero: {
    title: 'GST Notice, Scrutiny & Assessment Advisory',
    intro:
      'Received a scrutiny notice, an audit intimation or a show cause notice from the GST department? Our experts review your case, plan the response and draft replies backed by reconciliations, so you are never caught off guard.',
    points: [
      'Expert review of scrutiny (ASMT-10), audit (ADT-01) and show cause (DRC-01) notices.',
      'Point-by-point replies backed by reconciliations of your returns and books.',
      'Support for personal hearings with the GST officer.',
    ],
    formTitle: 'Talk to a GST Notice Expert',
  },

  sections: [
    {
      type: 'table',
      title: ['Common ', 'GST Notices', ' & How to Reply'],
      columns: ['Notice', 'Why It Is Issued', 'Reply'],
      rows: [
        ['ASMT-10', 'Discrepancies found during scrutiny of returns (Section 61)', 'Reply in Form ASMT-11 within the time given, usually 30 days'],
        ['ADT-01', 'Audit of your books and records by the department (Section 65)', 'Produce records; audit findings are shared in Form ADT-02'],
        ['DRC-01A', 'Intimation of tax found payable, before a show cause notice', 'Pay the amount, or file objections in Part B of DRC-01A'],
        ['DRC-01', 'Show cause notice demanding tax, interest and penalty (Sections 73, 74 or 74A)', 'Reply in Form DRC-06 within the time given'],
        ['GSTR-3A', 'Default notice for returns not filed', 'File the pending returns within 15 days'],
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Handle Your Case', ''],
      items: [
        { title: 'Share Notice', desc: 'Upload the notice and tell us the reply due date.' },
        { title: 'Case Review', desc: 'An expert studies the issues raised and your exposure.' },
        { title: 'Reconciliation', desc: 'Returns and books are reconciled to support your position.' },
        { title: 'Reply Drafting', desc: 'A point-by-point reply is drafted for your approval.' },
        { title: 'Hearing Support', desc: 'We prepare you for, or attend, the personal hearing.' },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'Your Case', ''],
      items: [
        { title: 'Notice Copy', desc: 'The notice or order with its reference number (DIN), downloaded from the GST portal.' },
        { title: 'Returns for the Period', desc: 'GSTR-1, GSTR-3B and GSTR-9 filed for the period under review.' },
        { title: 'Books of Accounts', desc: 'Sales, purchase and ITC registers and ledgers for the period.' },
        { title: 'Previous Replies', desc: 'Any reply, payment or letter already filed with the department.' },
        { title: 'Supporting Evidence', desc: 'Invoices, e-way bills, contracts or bank statements for the issues raised.' },
        { title: 'Authorisation', desc: 'An authorisation letter for our professional to represent you, if needed.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'What should I do first after receiving a GST notice?',
      a: 'Note the reply due date, download the notice and its attachments from the GST portal, and avoid making payments or admissions until an expert has reviewed the issues.',
    },
    {
      q: 'What is the difference between scrutiny, audit and a show cause notice?',
      a: 'Scrutiny (ASMT-10) points out discrepancies in your returns. An audit (ADT-01) examines your books and records. A show cause notice (DRC-01) is a formal demand for tax, interest and penalty that must be answered before an order is passed.',
    },
    {
      q: "What happens if I don't reply to a notice?",
      a: 'The officer can pass an order based on the information available, including a demand for tax, interest and penalty. Such an order is far harder to reverse than replying on time.',
    },
    {
      q: 'Can I get more time to reply?',
      a: 'You can ask the officer for more time with reasons. Personal hearings can be adjourned up to three times.',
    },
    {
      q: 'What is a personal hearing?',
      a: 'It is your opportunity to present your case to the officer before an adverse order is passed. A hearing must be given when you ask for it in writing or when an adverse decision is being considered.',
    },
    {
      q: 'What if the final order goes against me?',
      a: 'You can file an appeal in Form APL-01 before the Appellate Authority within three months of the order, after paying the required pre-deposit.',
    },
  ],

  questionnaire: {
    headline: ['Respond to GST Notices', 'With Confidence'],
    tagline: 'Get an expert review before you reply to the department.',
    points: [
      { title: 'Case Review by Experts', sub: 'Every notice is reviewed by an experienced GST professional.' },
      { title: 'Reconciliation-backed Replies', sub: 'Replies supported by your returns and books.' },
      { title: 'Hearing Support', sub: 'Help preparing for and attending personal hearings.' },
    ],
    questions: [
      {
        id: 'noticeType',
        type: 'radio',
        summaryLabel: 'Notice',
        label: 'What have you received from the GST department?',
        options: [
          { value: 'scrutiny', label: 'Scrutiny notice (ASMT-10)' },
          { value: 'audit', label: 'Audit notice (ADT-01)' },
          { value: 'show-cause', label: 'Show cause notice or intimation (DRC-01 / DRC-01A)' },
          { value: 'other', label: 'Another notice or order' },
        ],
      },
      {
        id: 'replyDue',
        type: 'select',
        summaryLabel: 'Reply due',
        label: 'When is the reply due?',
        options: [
          { value: 'within-7', label: 'Within 7 days' },
          { value: '8-15', label: 'In 8 – 15 days' },
          { value: '16-30', label: 'In 16 – 30 days' },
          { value: 'overdue', label: 'The due date has passed' },
          { value: 'not-sure', label: 'Not sure' },
        ],
      },
    ],
  },

  plans: {
    defaultPlan: 'premium',
    unit: 'per notice',
    items: [
      {
        id: 'standard',
        name: 'Standard',
        subtitle: 'Expert review and a clear action plan for your notice.',
        originalPrice: 4999,
        discountLabel: '40% off',
        price: 2999,
        features: [
          '**60-minute consultation** with a GST expert',
          'Notice & exposure analysis',
          'Written action plan',
          'Reply drafting guidance',
          'Chat support',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        subtitle: 'A complete reply drafted and filed by experts.',
        originalPrice: 11999,
        discountLabel: '33% off',
        price: 7999,
        recommended: true,
        features: [
          'Everything in Standard',
          '**Reply drafting & filing** (ASMT-11, DRC-06 or audit reply)',
          'Reconciliation working papers',
          'One round of follow-up with the officer',
          '**Dedicated GST expert**',
        ],
      },
      {
        id: 'elite',
        name: 'Elite',
        subtitle: 'End-to-end handling, including a personal hearing.',
        originalPrice: 21999,
        discountLabel: '31% off',
        price: 14999,
        hasEmi: true,
        features: [
          'Everything in Premium',
          '**Personal hearing** representation (one hearing)',
          'Additional submissions after the hearing',
          'Appeal advisory if the order is adverse',
          '**Dedicated account manager**',
        ],
      },
    ],
    hint: (answers) =>
      ['within-7', 'overdue'].includes(answers.replyDue)
        ? ['Your reply is urgent. Share the notice as soon as you pay and our expert will prioritise your case.']
        : [],
  },
};
