export default {
  slug: 'gst-notice-reg-03',
  name: 'GST Clarification (REG-03)',
  referText: 'Know someone whose GST application is stuck with a REG-03 notice? Share this page with them.',

  hero: {
    title: 'Reply to GST Notice REG-03 (Clarification) Online',
    intro:
      'When the GST officer needs more information on your registration application, they issue a notice in Form GST REG-03. The reply must be filed in Form GST REG-04 within 7 working days, or the application can be rejected. Our experts draft and file a complete reply quickly.',
    points: [
      "Expert analysis of the officer's query and a precise reply in Form REG-04.",
      'Documents corrected, formatted and uploaded so your GST application is not rejected.',
      'Status tracking until your GSTIN is approved.',
    ],
    formTitle: 'Reply to Your REG-03 Notice',
  },

  sections: [
    {
      type: 'cards',
      title: ['Common Reasons for a ', 'REG-03 Notice', ''],
      subtitle: 'Most notices are about documents that are missing, unclear or do not match the application.',
      items: [
        { title: 'Address proof issues', desc: 'Electricity bill, rent agreement or NOC is missing, unclear or not in the right name.' },
        { title: 'Premises photo or details', desc: 'The photo of the business premises is missing or does not match the address.' },
        { title: 'Identity & signatory documents', desc: 'PAN, Aadhaar, photograph or authorisation letter is incorrect or unreadable.' },
        { title: 'Business details', desc: 'Nature of business, HSN/SAC codes or constitution details need clarification.' },
      ],
      note: 'The reply in Form REG-04 must be filed within 7 working days of receiving the notice. If no reply is filed, the officer can reject the application in Form REG-05.',
    },
    {
      type: 'steps',
      title: ['How We ', 'Reply to Your Notice', ''],
      items: [
        { title: 'Share Notice', desc: 'Upload the REG-03 notice and your application ARN.' },
        { title: 'Query Analysis', desc: 'Our expert reads what the officer needs and what is missing.' },
        { title: 'Document Fixes', desc: 'Documents are corrected, re-drafted or arranged as required.' },
        { title: 'REG-04 Filing', desc: 'The reply and documents are filed on the GST portal.' },
        { title: 'Approval Tracking', desc: 'We track the application until a decision is made.' },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for the ', 'REG-04 Reply', ''],
      items: [
        { title: 'REG-03 Notice', desc: 'Copy of the notice downloaded from the GST portal.' },
        { title: 'Application ARN', desc: 'ARN of your GST registration application.' },
        { title: 'Address Proof', desc: 'Recent electricity bill, property tax receipt, or rent agreement with NOC.' },
        { title: 'Premises Photograph', desc: 'Clear photo of the business premises, with the name board if available.' },
        { title: 'Identity Documents', desc: 'PAN, Aadhaar and photograph of the proprietor, partners or directors.' },
        { title: 'Authorisation Letter', desc: 'Letter or board resolution for the authorised signatory, if applicable.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'What is a REG-03 notice?',
      a: 'It is a notice the GST officer issues when they need clarification, more information or documents before approving a registration application.',
    },
    {
      q: 'What is the time limit to reply?',
      a: 'The reply in Form GST REG-04 must be filed within 7 working days from the date you receive the notice.',
    },
    {
      q: "What happens if I don't reply?",
      a: 'The officer can reject the registration application in Form GST REG-05. You would then have to apply again from the beginning.',
    },
    {
      q: 'Can I upload new documents with the reply?',
      a: 'Yes. Form REG-04 lets you add a written clarification and upload the documents the officer asked for.',
    },
    {
      q: 'How long does approval take after I reply?',
      a: "The officer generally decides within 7 working days of receiving your reply. Approval is at the officer's discretion.",
    },
    {
      q: 'Can you reply if I applied for GST on my own?',
      a: 'Yes. We can reply to a REG-03 notice on any pending application, whether you filed it yourself or through another consultant.',
    },
  ],

  questionnaire: {
    headline: ['Reply to Your REG-03 Notice', 'Before the Deadline'],
    tagline: 'Avoid rejection of your GST registration application.',
    points: [
      { title: 'Fast Turnaround', sub: 'Priority replies filed within 24 hours.*' },
      { title: 'Document Corrections', sub: 'We fix and format exactly what the officer asked for.' },
      { title: 'Approval Tracking', sub: 'Updates until your GSTIN is approved.' },
    ],
    questions: [
      {
        id: 'noticeAge',
        type: 'select',
        summaryLabel: 'Notice received',
        label: 'When did you receive the REG-03 notice?',
        options: [
          { value: 'today', label: 'Today' },
          { value: '1-3-days', label: '1 – 3 days ago' },
          { value: '4-7-days', label: '4 – 7 days ago' },
          { value: 'over-7-days', label: 'More than 7 days ago' },
        ],
      },
      {
        id: 'queryType',
        type: 'radio',
        summaryLabel: 'Query',
        label: 'What has the officer asked for?',
        options: [
          { value: 'address', label: 'Address or premises proof' },
          { value: 'identity', label: 'Identity or signatory documents' },
          { value: 'business', label: 'Business details or activity' },
          { value: 'other', label: 'Something else, or not sure' },
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
        subtitle: 'For simple queries that need a quick, correct reply.',
        originalPrice: 1999,
        discountLabel: '50% off',
        price: 999,
        features: [
          'Notice analysis by a GST expert',
          'Reply drafting in **Form REG-04**',
          'Document formatting for upload',
          'Filing on the GST portal',
          'Chat support',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        subtitle: 'Priority reply with document fixes and tracking.',
        originalPrice: 3499,
        discountLabel: '42% off',
        price: 1999,
        recommended: true,
        features: [
          'Everything in Standard',
          'Reply filed within **24 hours***',
          'Rent agreement / NOC **drafting**',
          'Status tracking until a decision',
          '**Dedicated GST expert**',
        ],
      },
      {
        id: 'elite',
        name: 'Elite',
        subtitle: 'Complete support until your GSTIN is issued.',
        originalPrice: 5999,
        discountLabel: '33% off',
        price: 3999,
        features: [
          'Everything in Premium',
          'Reply to a second notice, if issued',
          '**Re-application support** if the application is rejected',
          'GST certificate download & first-return guidance',
          '**Dedicated account manager**',
        ],
      },
    ],
    notes: ["*The timeline starts once we receive complete documents. Approval is at the GST officer's discretion."],
    hint: (answers) => {
      if (answers.noticeAge === 'over-7-days') {
        return ['More than 7 working days may have passed. Share the notice right away and our expert will check whether a reply is still possible or a fresh application is needed.'];
      }
      if (answers.noticeAge === '4-7-days') {
        return ['Your reply deadline is close. The Premium plan files your reply within 24 hours.'];
      }
      return [];
    },
  },
};
