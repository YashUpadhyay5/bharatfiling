import { DSC_DOCUMENT, GOVERNMENT_FEES_FAQ, defineService } from '../common.js';

export default defineService({
  slug: 'charge-satisfaction-chg-1',
  name: 'Charge Registration & Satisfaction',
  breadcrumb: 'Charge Registration & Satisfaction',
  referText: 'Know a company that has taken or repaid a secured loan? Share this page with them.',
  fee: 2999,

  hero: {
    title: 'Register, Modify or Close a Charge: Form CHG-1 and CHG-4',
    points: [
      { text: 'Secured loans registered with the Registrar inside the legal time limits' },
      { text: 'Repaid loans closed with the lender, so your assets show clear' },
      { text: 'One charge filing @', price: true },
    ],
    explainerTitle: 'Company charges explained in 60 seconds',
    explainer: [
      'A charge is a lender\'s security over the assets of a company, usually created when it takes a secured loan from a bank or an NBFC.',
      'The company must register the charge in Form CHG-1 within 30 days. A change in its terms, such as the amount or the security, is reported the same way.',
      'When the loan is fully repaid, the company reports the satisfaction in Form CHG-4 within 30 days, so the asset shows clear in public records.',
      'Share the loan papers. We prepare the form, coordinate the lender\'s digital signature and file it, then update your register of charges.',
    ],
    formTitle: 'File a Charge',
  },

  payment: {
    title: 'Charge Registration & Satisfaction',
    note: 'Priced per charge. MCA fees, and any additional or ad valorem fee for late filing, are paid at actuals.',
    collect: 'to collect your loan documents and to coordinate with the lender',
  },

  sections: [
    {
      type: 'table',
      title: ['CHG-1 Time Limits ', 'and Fees', ''],
      subtitle: 'Registering or modifying a charge: the government fee rises sharply after 30 days.',
      columns: ['Filed Within', 'Small Company or OPC', 'Other Companies'],
      rows: [
        ['30 days', 'Normal fee', 'Normal fee'],
        ['31 to 60 days', '3 times the normal fee', '6 times the normal fee'],
        ['61 to 120 days', '3 times the normal fee, plus 0.025% of the charge, up to ₹1 lakh', '6 times the normal fee, plus 0.05% of the charge, up to ₹5 lakh'],
        ['After 120 days', 'The normal route closes. Our team reviews the case.', 'The normal route closes. Our team reviews the case.'],
      ],
      note: 'Satisfaction (CHG-4) is due within 30 days of full repayment. The Registrar can allow it up to 300 days with an additional fee. After that, our team reviews the case.',
    },
    {
      type: 'cards',
      title: ['Why ', 'Charges Matter', ''],
      items: [
        { title: 'Lender protection', desc: 'An unregistered charge does not count against a liquidator or other creditors in a winding up (section 77). Lenders usually insist on it.' },
        { title: 'The lender can file', desc: 'If the company does not file, the charge-holder can apply to register it under section 78 and recover the cost from the company.' },
        { title: 'A clear record', desc: 'An open charge stays on the public MCA record after repayment, which can delay new loans, asset sales and due diligence.' },
        { title: 'Open charges block closure', desc: 'A company or LLP cannot apply for strike off while a charge remains open.' },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'Charge Filing', ''],
      items: [
        { title: 'Loan Documents', desc: 'The sanction letter, loan agreement and the deed creating the charge.' },
        { title: 'Asset Details', desc: 'A description of the property or assets charged, and the amount secured.' },
        { title: 'No-Dues Letter', desc: 'For satisfaction, a letter from the lender confirming the loan is fully repaid.' },
        { title: 'Board Resolution', desc: 'The resolution approving the borrowing and the charge. We can draft it.' },
        { title: 'Lender\'s DSC', desc: 'The authorised officer of the lender also signs the form digitally. We coordinate this.' },
        DSC_DOCUMENT,
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'File Your Charge', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us the filing you need, its timing and the lender.' },
        { title: 'Upload Papers', desc: 'Share the loan documents or the lender\'s no-dues letter securely.' },
        { title: 'Prepare the Form', desc: 'We prepare CHG-1 or CHG-4, and confirm the government fee.' },
        { title: 'Get It Signed', desc: 'Your director and the lender\'s officer sign the form digitally.' },
        { title: 'File & Update', desc: 'We file it, share the certificate and update your register of charges.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'What is the difference between CHG-1 and CHG-4?',
      a: 'CHG-1 registers a new charge or reports a change to one. CHG-4 reports that a charge is fully repaid or satisfied, and the Registrar then records it as closed.',
    },
    {
      q: 'What if we are past the 30-day limit?',
      a: 'CHG-1 can still be filed within 120 days of the event, with a higher government fee that depends on the company\'s size and, after 60 days, the amount of the charge. Beyond that, our team reviews whether a condonation application can help.',
    },
    {
      q: 'Our loan was repaid years ago. Can the charge still be closed?',
      a: 'Yes, in most cases. CHG-4 can be filed with an additional fee up to 300 days after repayment. Beyond 300 days, it generally needs an application to the Regional Director in Form CHG-8, so our team reviews the case first.',
    },
    {
      q: 'Does the lender need to do anything?',
      a: 'Yes. The lender\'s authorised officer signs the form digitally, and for satisfaction the lender issues a no-dues letter. We coordinate with them, but timing depends on the lender.',
    },
    {
      q: 'Who can file if the company does not?',
      a: 'The charge-holder can apply under section 78. The Registrar gives the company 14 days to show cause, and the lender can recover the filing cost from the company.',
    },
    GOVERNMENT_FEES_FAQ,
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted Charge Filing'],
    tagline: 'Company law experts for CHG-1 and CHG-4',
    points: [
      { title: 'Inside the Time Limit', sub: 'Filed before the fee climbs or the window closes.' },
      { title: 'Lender Coordinated', sub: 'We work with your bank or NBFC on the digital signature.' },
      { title: 'Records Updated', sub: 'Your certificate and register of charges are kept current.' },
    ],
    questions: [
      {
        id: 'action',
        type: 'radio',
        summaryLabel: 'Filing',
        label: 'What do you need to file?',
        options: [
          {
            value: 'register',
            label: 'Register or modify a charge, within 120 days',
            filing: ['Form CHG-1, signed by the company and the lender', 'Updated register of charges'],
          },
          {
            value: 'register-late',
            label: 'Register or modify a charge, after more than 120 days',
            stop: 'The normal filing window for CHG-1 closes after 120 days, so our team reviews whether a condonation application can help before anything is charged.',
          },
          {
            value: 'satisfy',
            label: 'Close a repaid charge, within 300 days of repayment',
            filing: ['Form CHG-4, signed by the company and the lender', 'Updated register of charges'],
          },
          {
            value: 'satisfy-late',
            label: 'Close a charge repaid more than 300 days ago',
            stop: 'After 300 days, closing a charge generally needs an application to the Regional Director in Form CHG-8, so our team reviews the case and quotes for it first.',
          },
        ],
      },
      {
        id: 'timing',
        type: 'radio',
        summaryLabel: 'Timing',
        label: 'Has it been more than 30 days since the charge was created, changed or repaid?',
        options: [
          { value: 'within-30', label: 'No, it is within 30 days' },
          {
            value: 'after-30',
            label: 'Yes, more than 30 days',
            note: 'A higher government fee applies after 30 days, paid at actuals. Our expert confirms the amount before filing.',
          },
          { value: 'not-sure', label: 'Not sure' },
        ],
      },
      {
        id: 'chargeHolder',
        type: 'select',
        summaryLabel: 'Charge holder',
        label: 'Who holds the charge?',
        options: [
          { value: 'bank', label: 'A bank' },
          { value: 'nbfc', label: 'An NBFC' },
          { value: 'other', label: 'Another lender' },
        ],
      },
    ],
  },
});
