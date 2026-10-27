export default {
  slug: 'gst-cancellation-revocation',
  name: 'GST Cancellation & Revocation',
  referText: 'Know a business owner whose GST registration was cancelled? Share this page with them.',

  hero: {
    title: 'GST Cancellation & Revocation - Reactivate Your GST Registration Now',
    points: [
      'Get expert help to deal with GST cancellation or revocation, and reactivate your registration.',
      'Submit your cancellation or revocation application with expert support, filed in just 3 working days.',
      'End-to-end filing and guidance ensure no delays in closing or restoring your GST number.',
    ],
    formTitle: 'Apply for GST Cancellation / Revocation',
  },

  sections: [
    {
      type: 'cards',
      title: ['When Can You ', 'Cancel Your GST Registration?', ''],
      subtitle: 'A registered person can apply to cancel their GSTIN in situations such as these.',
      items: [
        { title: 'Business closed or discontinued', desc: 'The business has shut down, or the proprietor has died.' },
        { title: 'Transfer, merger or amalgamation', desc: 'The business is transferred, merged or demerged into another entity.' },
        { title: 'Change in constitution', desc: 'For example, a proprietorship converted into a company, needing a new PAN-based GSTIN.' },
        { title: 'No longer liable to register', desc: 'Turnover has fallen below the threshold and registration was not mandatory.' },
      ],
      note: 'The GST officer can also cancel a registration on their own, for example when returns have not been filed for a continuous period. In that case you can apply for revocation to reactivate it.',
    },
    {
      type: 'tracks',
      title: ['Cancellation & Revocation ', 'Process', ''],
      tracks: [
        {
          key: 'revocation',
          title: 'GST Revocation',
          form: 'Form GST REG-21',
          steps: [
            'Applies when the officer has cancelled your registration on their own (suo moto).',
            'File all pending returns and pay tax, interest and late fees due up to the cancellation date.',
            'File REG-21 within 90 days of the cancellation order (the authorities can extend this by up to 180 days).',
            'Officer approves in REG-22, or issues a notice in REG-23 which must be answered in REG-24 within 7 working days.',
          ],
        },
        {
          key: 'cancellation',
          title: 'GST Cancellation',
          form: 'Form GST REG-16',
          steps: [
            'Check that all returns up to the date of cancellation are filed.',
            'File REG-16 on the GST portal with the reason and stock details.',
            'Officer issues the cancellation order in Form REG-19.',
            'File the final return GSTR-10 within 3 months of the cancellation date or order, whichever is later.',
          ],
        },
      ],
    },
    {
      type: 'documents',
      title: ['Documents ', 'Required', ''],
      items: [
        { title: 'GSTIN & Portal Login', desc: 'Your GST number and portal credentials, or OTP access for filing.' },
        { title: 'Cancellation Order (REG-19)', desc: 'Needed for revocation, along with any show cause notice received.' },
        { title: 'Pending Return Data', desc: 'Sales and purchase details for any returns not yet filed.' },
        { title: 'Stock & Liability Details', desc: 'Closing stock, inputs and capital goods held on the date of cancellation.' },
        { title: 'Reason & Supporting Proof', desc: 'Closure, transfer or merger documents, or proof for the revocation request.' },
        { title: 'Authorised Signatory KYC', desc: 'PAN and Aadhaar of the proprietor, partner or director signing the application.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'What is the difference between GST cancellation and revocation?',
      a: 'Cancellation closes your GST registration, either on your own request (Form REG-16) or by the GST officer. Revocation reverses a cancellation made by the officer, so your GSTIN becomes active again (Form REG-21).',
    },
    {
      q: 'Can I apply for revocation if I cancelled my registration voluntarily?',
      a: 'No. Revocation is available only when the officer cancelled the registration on their own motion. If you cancelled voluntarily and want to restart, you need to apply for a fresh GST registration.',
    },
    {
      q: 'What is the time limit to apply for revocation?',
      a: 'The application must be filed within 90 days of the date the cancellation order was served. On sufficient cause, the tax authorities can extend this by a further period of up to 180 days.',
    },
    {
      q: 'Do I need to file pending returns before applying for revocation?',
      a: 'Yes. All returns due up to the date of cancellation must be filed, and any tax, interest and late fee must be paid, before the revocation application is filed.',
    },
    {
      q: 'What is GSTR-10?',
      a: 'GSTR-10 is the final return filed after your registration is cancelled. It must be filed within 3 months of the date of cancellation or the date of the cancellation order, whichever is later. Late filing attracts a late fee.',
    },
    {
      q: 'How long does the officer take to decide on revocation?',
      a: "The officer generally decides within 30 days of receiving the application, or of your reply if a notice in REG-23 is issued. Approval is at the officer's discretion, so a complete and accurate application matters.",
    },
  ],

  questionnaire: {
    headline: ['Get Your GST Cancellation or Revocation Filed', 'in 24 Hours*'],
    tagline: 'Trusted by businesses across India for GST compliance.',
    points: [
      { title: 'Trusted Nationwide', sub: 'CA-led GST filings for businesses across India.' },
      { title: 'Officer Query Handling', sub: 'We draft replies to show cause notices and clarification requests.' },
      { title: 'Compliance & Expert Support', sub: 'Transparent pricing and quick expert help.' },
    ],
    questions: [
      {
        id: 'requestType',
        type: 'radio',
        summaryLabel: 'Request',
        label: 'What do you need help with?',
        options: [
          { value: 'revocation', label: 'Revoke a cancelled GST registration (reactivate my GSTIN)' },
          { value: 'cancellation', label: 'Cancel my GST registration' },
          { value: 'not_sure', label: 'Not sure, I need expert advice' },
        ],
      },
      {
        id: 'propertyType',
        type: 'select',
        summaryLabel: 'Office',
        label: 'What Is the Type of Property Where Your Office Is Located?',
        options: [
          { value: 'rented', label: 'Rented/Leased Property' },
          { value: 'family', label: 'Family Owned Property' },
          { value: 'own', label: 'Self/Own Property' },
          { value: 'others', label: 'Others' },
        ],
        extra: {
          id: 'businessStatus',
          options: [
            { value: 'running_need_compliance', label: 'Already Running a Business, Need Compliance' },
            { value: 'exploring', label: 'Just Exploring, Not Sure Yet!' },
          ],
        },
      },
    ],
  },

  plans: {
    defaultPlan: 'premium',
    unit: 'per application',
    items: [
      {
        id: 'standard',
        name: 'Standard',
        subtitle: 'Best for businesses that want their cancellation or revocation application filed in 48 hours.',
        originalPrice: 999,
        discountLabel: '60% off',
        price: 399,
        features: [
          'Application filing in **48 hours***',
          'Eligibility & pending-returns check',
          '**ARN tracking** & status updates',
          'Form REG-16 (cancellation) or REG-21 (revocation)',
          'Chat support',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        subtitle: 'Best for businesses that need fast-track, error-free filing in 24 hours.',
        originalPrice: 3999,
        discountLabel: '50% off',
        price: 1999,
        recommended: true,
        features: [
          'Application filing in **24 hours***',
          'Priority ARN generation',
          '**Reply to show cause notice** (REG-17 / REG-23)',
          'Error-free documentation',
          'Pending returns review & filing guidance',
          '**Officer clarification support**',
          '**Dedicated GST expert**',
          'Quick query resolution',
          'Transparent pricing',
          'Chat support',
        ],
      },
      {
        id: 'elite',
        name: 'Elite',
        subtitle: 'Cancellation or revocation plus 12 months of GST compliance support.',
        originalPrice: 7999,
        discountLabel: '35% off',
        price: 4999,
        hasEmi: true,
        features: [
          'Expert-assisted cancellation or revocation',
          '**Reply to show cause notice** & officer liaison',
          '**GSTR-10 final return** (on cancellation)',
          '**GST filing for 12 months** after revocation (up to 300 transactions)',
          'Quarterly GST health check',
          '**Dedicated compliance manager**',
          'Chat support',
        ],
      },
    ],
    notes: ["*Note: Approval of cancellation or revocation is at the GST officer's discretion; we cannot guarantee approval."],
    hint: (answers) => {
      if (answers.requestType === 'revocation') {
        return ['Revocation must be applied for within 90 days of the cancellation order, after all pending returns are filed. Our expert will check both before filing.'];
      }
      if (answers.requestType === 'cancellation') {
        return ['After cancellation, the final return GSTR-10 is due within 3 months. The Elite plan includes it.'];
      }
      return [];
    },
  },
};
