export default {
  slug: 'gst-lut-exporters',
  name: 'GST LUT for Exporters',
  referText: 'Know an exporter who is still paying IGST upfront? Share this page with them.',

  hero: {
    title: 'GST LUT Filing for Exporters',
    intro:
      'A Letter of Undertaking (LUT) in Form GST RFD-11 lets you export goods or services, or supply to an SEZ, without paying IGST upfront. Our experts file your LUT so your working capital is never stuck in tax refunds.',
    points: [
      'LUT filed online in Form RFD-11 with expert support, with the ARN shared quickly.',
      'Export goods and services without paying IGST and keep your working capital free.',
      'Renewal reminders every financial year so your exports are never disrupted.',
    ],
    formTitle: 'File Your LUT with Experts',
  },

  sections: [
    {
      type: 'cards',
      title: ['Who Can ', 'File an LUT', '?'],
      subtitle: 'Any GST-registered person making zero-rated supplies can file an LUT.',
      items: [
        { title: 'Exporters of goods', desc: 'Registered businesses exporting goods out of India without paying IGST.' },
        { title: 'Exporters of services', desc: 'IT, consulting, design and other service providers billing clients outside India.' },
        { title: 'Suppliers to SEZ', desc: 'Businesses supplying goods or services to SEZ units or SEZ developers.' },
        { title: 'Not eligible', desc: 'Persons prosecuted for tax evasion of more than ₹2.5 crore under GST or the earlier tax laws.' },
      ],
      note: 'An LUT is valid for one financial year. File a fresh LUT before the first export of every new financial year.',
    },
    {
      type: 'table',
      title: ['Export ', 'Under LUT', ' vs Paying IGST'],
      columns: ['Aspect', 'Export under LUT', 'Export with IGST payment'],
      rows: [
        ['Tax at the time of export', 'No IGST paid', 'IGST paid upfront'],
        ['Working capital', 'Not blocked', 'Blocked until the refund is received'],
        ['Refund', 'Refund of unutilised ITC (Form RFD-01)', 'Refund of the IGST paid'],
        ['Conditions', 'Goods exported within 3 months of invoice; service payment received within 1 year', 'Regular return compliance'],
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'LUT Filing', ''],
      items: [
        { title: 'GSTIN & Portal Login', desc: 'The LUT is filed on the GST portal using DSC or EVC.' },
        { title: 'IEC Code', desc: 'Import Export Code issued by DGFT, for exporters of goods.' },
        { title: 'Witness Details', desc: 'Name, address and occupation of two independent witnesses.' },
        { title: 'Authorised Signatory', desc: 'PAN and details of the person signing the undertaking.' },
        { title: 'Previous LUT', desc: "Last year's LUT ARN, if this is a renewal." },
        { title: 'Export Invoice', desc: 'A sample invoice, to check the LUT declaration wording.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'File Your LUT', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us what you export and whether this is a renewal.' },
        { title: 'Document Check', desc: 'Our expert verifies eligibility and witness details.' },
        { title: 'RFD-11 Filing', desc: 'The LUT is prepared and filed on the GST portal.' },
        { title: 'ARN Shared', desc: 'You receive the ARN and the filed LUT for your records.' },
        { title: 'Invoice Setup', desc: 'We help you add the LUT declaration on export invoices.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'What is an LUT under GST?',
      a: 'An LUT (Letter of Undertaking) is a declaration filed in Form GST RFD-11 that lets registered exporters make zero-rated supplies without paying IGST.',
    },
    {
      q: 'How long is an LUT valid?',
      a: 'For one financial year. A new LUT must be filed for every financial year, ideally before the first export of that year.',
    },
    {
      q: 'Is there a government fee for filing an LUT?',
      a: 'No. The GST portal does not charge any fee for filing an LUT.',
    },
    {
      q: 'What happens if I export without an LUT?',
      a: 'Without a valid LUT you must pay IGST on the export and then claim a refund, which blocks working capital until the refund is processed.',
    },
    {
      q: 'What conditions apply when exporting under an LUT?',
      a: 'Goods must be exported within three months of the invoice date, and payment for exported services must be received in convertible foreign exchange (or in Indian rupees where RBI permits) within one year. Otherwise IGST has to be paid with interest.',
    },
    {
      q: 'Do I need an LUT to supply to an SEZ?',
      a: 'Yes. Supplies to SEZ units and developers are zero-rated, so you can make them without paying IGST under an LUT.',
    },
  ],

  questionnaire: {
    headline: ['File Your GST LUT', 'in 1 Working Day*'],
    tagline: 'Export without paying IGST and keep your working capital free.',
    points: [
      { title: 'Quick RFD-11 Filing', sub: 'Prepared and filed by an expert, start to finish.' },
      { title: 'No Government Fee', sub: 'Filing an LUT on the GST portal is free.' },
      { title: 'Renewal Reminders', sub: 'Never miss the start of a new financial year.' },
    ],
    questions: [
      {
        id: 'exportType',
        type: 'radio',
        summaryLabel: 'Exports',
        label: 'What do you export?',
        options: [
          { value: 'goods', label: 'Goods' },
          { value: 'services', label: 'Services' },
          { value: 'both', label: 'Both goods and services' },
          { value: 'sez', label: 'Supplies to an SEZ' },
        ],
      },
      {
        id: 'lutStatus',
        type: 'radio',
        summaryLabel: 'LUT',
        label: 'Is this your first LUT?',
        options: [
          { value: 'first', label: 'Yes, this is my first LUT' },
          { value: 'renewal', label: "No, I'm renewing for a new financial year" },
        ],
      },
    ],
  },

  plans: {
    defaultPlan: 'premium',
    unit: 'per financial year',
    items: [
      {
        id: 'standard',
        name: 'Standard',
        subtitle: 'For exporters who just need their LUT filed quickly.',
        originalPrice: 1499,
        discountLabel: '46% off',
        price: 799,
        features: [
          'LUT filing in **Form RFD-11**',
          'Eligibility check',
          'ARN & acknowledgement',
          'Filed in **1 working day***',
          'Chat support',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        subtitle: 'LUT filing plus export invoice setup.',
        originalPrice: 2999,
        discountLabel: '33% off',
        price: 1999,
        recommended: true,
        features: [
          'Everything in Standard',
          'Export invoice format with the **LUT declaration**',
          'Guidance on export proofs (shipping bills, FIRC/BRC)',
          'Renewal reminder for next year',
          '**Dedicated GST expert**',
        ],
      },
      {
        id: 'elite',
        name: 'Elite',
        subtitle: 'LUT filing plus a refund claim of unutilised ITC.',
        originalPrice: 7499,
        discountLabel: '33% off',
        price: 4999,
        hasEmi: true,
        features: [
          'Everything in Premium',
          '**Refund of unutilised ITC** (RFD-01) for one period',
          'Refund statements & documentation',
          'Follow-up until the refund order',
          '**Dedicated account manager**',
        ],
      },
    ],
    notes: ['*The timeline starts once we receive complete documents.'],
  },
};
