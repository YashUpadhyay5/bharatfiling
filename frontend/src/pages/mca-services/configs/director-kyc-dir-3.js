import { countOptions, defineService, plural } from '../common.js';

export default defineService({
  slug: 'director-kyc-dir-3',
  name: 'Director KYC (DIR-3 KYC)',
  breadcrumb: 'Director KYC',
  referText: 'Know a director whose KYC is due or whose DIN was deactivated? Share this page with them.',
  fee: 499,
  unitLabel: (n) => plural('director', n),

  hero: {
    title: 'Director KYC (DIR-3 KYC): File on Time and Keep Your DIN Active',
    points: [
      { text: 'Your DIN status and next due date checked under the new three-year rule' },
      { text: 'Deactivated DINs reactivated, and changed details updated' },
      { text: 'DIR-3 KYC filing per director @', price: true },
    ],
    explainerTitle: 'DIR-3 KYC explained in 60 seconds',
    explainer: [
      'Every person holding a Director Identification Number (DIN) has to confirm their identity with the MCA through DIR-3 KYC.',
      'From 31 March 2026 the filing moved from every year to once every three financial years, by 30 June after the third year.',
      'If your mobile number, email or address changes, you must update it within 30 days, whichever year it is.',
      'Miss the date and the DIN is deactivated, which stops your company filings until you reactivate it for ₹5,000. We check your status, then file for you.',
    ],
    formTitle: 'File Director KYC',
  },

  payment: {
    title: 'Director KYC (DIR-3 KYC)',
    note: 'Priced per director. Any late, reactivation or update fee is paid to the MCA at actuals.',
    filings: ['DIR-3 KYC filing, verified by OTP on the mobile and email of each director'],
    collect: 'to collect the DIN, PAN, Aadhaar and OTPs of each director',
  },

  sections: [
    {
      type: 'table',
      title: ['Which Filing Do ', 'You Need', ''],
      subtitle: 'The government fee depends on your situation. Filing on time is free.',
      columns: ['Your Situation', 'What to File', 'Government Fee', 'Deadline'],
      rows: [
        ['KYC falls due', 'DIR-3 KYC once in every three financial years', 'Nil', '30 June after the third financial year'],
        ['Mobile, email or address changed', 'DIR-3 KYC to update your details', '₹500', 'Within 30 days of the change'],
        ['Due date missed', 'DIR-3 KYC with the late fee', '₹5,000', 'As soon as possible'],
        ['DIN already deactivated', 'DIR-3 KYC to reactivate the DIN', '₹5,000', 'Before your next company filing'],
      ],
      note: 'The three-year rule replaced the annual filing from 31 March 2026, with fees revised on 21 April 2026. When your first filing falls due depends on your DIN, so our expert confirms your date from the MCA records.',
    },
    {
      type: 'cards',
      title: ['What Happens If ', 'You Miss It', ''],
      items: [
        { title: 'DIN deactivated', desc: 'The MCA marks the DIN as deactivated for non-filing of DIR-3 KYC until the form is filed with the fee.' },
        { title: 'Company filings stop', desc: 'A deactivated DIN cannot sign MCA forms, which can hold up your annual returns and other filings.' },
        { title: '₹5,000 per DIN', desc: 'The reactivation fee applies to each director separately, so a late board pays it for every member.' },
        { title: 'Applies to everyone', desc: 'The rule covers every person holding a DIN on 31 March of the year, including directors of inactive companies.' },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'Director KYC', ''],
      items: [
        { title: 'PAN', desc: 'PAN of the director. A foreign national without one uses a passport instead.' },
        { title: 'Aadhaar', desc: 'Aadhaar of an Indian director, matching the name on the PAN.' },
        { title: 'Mobile & Email', desc: 'A personal mobile number and email unique to the director, to receive the OTPs.' },
        { title: 'Address Proof', desc: 'Proof of the permanent and present address, such as a passport or voter ID.' },
        { title: 'Passport', desc: 'Required for foreign nationals, and for Indian directors who hold one.' },
        { title: 'Digital Signature (DSC)', desc: 'A valid DSC of the director, for the first filing or an update on the full form.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'File Your KYC', ''],
      items: [
        { title: 'Share the DIN', desc: 'Tell us the number of directors and their current status.' },
        { title: 'Check Status', desc: 'We check each DIN on the MCA records and confirm any government fee.' },
        { title: 'Verify by OTP', desc: 'We verify the mobile and email of each director by OTP.' },
        { title: 'File & Share SRN', desc: 'We file the KYC, share the acknowledgement and note your next due date.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'Do I still have to file DIR-3 KYC every year?',
      a: 'No. From 31 March 2026 every DIN holder files once in every three financial years, by 30 June after the third year. You still have to file within 30 days whenever your mobile number, email or address changes.',
    },
    {
      q: 'When is my next KYC due?',
      a: 'It depends on when your DIN was allotted and when you last filed, and the MCA records show the position for each DIN. Our expert checks this first and tells you the date.',
    },
    {
      q: 'What if my DIN is already deactivated?',
      a: 'File DIR-3 KYC with the ₹5,000 fee to reactivate it. The DIN returns to active once the form is processed, and you can sign company filings again.',
    },
    {
      q: 'Do I need KYC if my company is inactive or I hold no directorship?',
      a: 'Yes. The rule applies to every person holding a DIN on 31 March of the financial year, whether or not their company is active.',
    },
    {
      q: 'Are the government fees part of your fee?',
      a: 'No. Our fee of ₹499 plus GST per director covers preparing and filing the form. The government charges nothing for a filing on time, ₹500 for an update of details and ₹5,000 for a late or reactivation filing, paid at actuals.',
    },
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted Director KYC'],
    tagline: 'Keep every DIN active under the new three-year rule',
    points: [
      { title: 'Status Checked First', sub: 'We confirm each DIN and its due date from the MCA records.' },
      { title: 'Deactivated DINs Restored', sub: 'Late and reactivation filings handled start to finish.' },
      { title: 'Next Date Noted', sub: 'You know exactly when the next KYC falls due.' },
    ],
    questions: [
      {
        id: 'directors',
        type: 'select',
        summaryLabel: 'Directors',
        label: 'How many directors need KYC?',
        options: countOptions(
          'director',
          5,
          'For more than five directors, our team prepares a combined quote and a plan to collect their OTPs.'
        ),
      },
      {
        id: 'dinStatus',
        type: 'radio',
        summaryLabel: 'DIN status',
        label: 'What is the status of the DIN?',
        options: [
          { value: 'due', label: 'Active, and KYC is due' },
          {
            value: 'deactivated',
            label: 'Deactivated, or the due date was missed',
            note: 'A late or reactivation filing carries a government fee of ₹5,000 per DIN, paid at actuals.',
          },
          {
            value: 'details-changed',
            label: 'Mobile, email or address has changed',
            note: 'An update of details carries a government fee of ₹500 per filing, paid at actuals.',
          },
          { value: 'not-sure', label: 'Not sure' },
        ],
      },
    ],
  },
});
