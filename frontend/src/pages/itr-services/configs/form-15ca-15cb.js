import { FORM_NOTE } from '../common.js';

export default {
  slug: 'form-15ca-15cb',
  name: 'Form 15CA / 15CB Certification',
  breadcrumb: 'Form 15CA & 15CB Filing',
  referText: 'Know someone sending money abroad to a vendor or a family member? Share this page with them.',
  fee: 2499,

  hero: {
    title: 'Form 15CA & 15CB Filing Online for Foreign Remittances',
    points: [
      { text: 'CA-certified Form 15CB and online Form 15CA for payments to non-residents' },
      { text: 'Taxability and tax treaty (DTAA) review so the right tax is withheld' },
      { text: 'Get your foreign remittance certified @', price: true },
    ],
    explainerTitle: '15CA / 15CB explained in 60 seconds',
    explainer: [
      'When you send money to a non-resident, the payment may be taxable in India and tax may have to be withheld under section 195.',
      'Form 15CA is your online declaration of the remittance, filed on the income tax portal before the bank sends the money.',
      "Form 15CB is a Chartered Accountant's certificate of the nature of the payment, its taxability, the treaty rate and the tax withheld. It is needed for taxable remittances above ₹5 lakh in a financial year.",
      'Share the invoice or agreement and the beneficiary details. Our CA reviews the taxability, issues Form 15CB and helps you file Form 15CA for your bank.',
    ],
    formTitle: 'Get 15CA / 15CB',
    formNote: FORM_NOTE,
  },

  payment: {
    title: 'Form 15CA / 15CB Certification',
    feeLabel: 'Professional Fee',
    note: 'Covers the certificate and declaration for one remittance. Tax withheld on the payment is not included.',
    booked: 'order has been placed',
    desk: 'remittance',
    collect: 'to collect the invoice or agreement and the beneficiary details',
  },

  sections: [
    {
      type: 'table',
      title: ['Which Part of ', 'Form 15CA', ' Applies?'],
      subtitle: 'The part you file depends on whether the payment is taxable and how much you send in the financial year.',
      columns: ['Part', 'When It Applies', 'Form 15CB'],
      rows: [
        ['Part A', 'Taxable remittance where the total paid to the person in the financial year does not exceed ₹5 lakh', 'Not needed'],
        [
          'Part B',
          'Taxable remittance above ₹5 lakh where you hold a lower or nil deduction certificate or order from the Assessing Officer',
          'Not needed; the certificate or order is quoted',
        ],
        ['Part C', 'Taxable remittance above ₹5 lakh without such a certificate or order', 'Required before filing Form 15CA'],
        ['Part D', 'Remittance that is not taxable in India under the Income-tax Act', 'Not needed'],
      ],
      note: 'Payments on the specified list in Rule 37BB, such as imports of goods, and remittances by individuals under the Liberalised Remittance Scheme that do not need RBI approval, need neither form. For remittances from 1 April 2026 the forms are renumbered under the Income-tax Act, 2025, and our CA files on the form that applies.',
    },
    {
      type: 'cards',
      title: ['Remittances ', 'We Certify', ''],
      items: [
        { title: 'Fees for services', desc: 'Software, consultancy, advertising and other service fees paid to foreign vendors.' },
        { title: 'Royalty & technical fees', desc: 'Licence fees, royalties and fees for technical services, often taxed at treaty rates.' },
        { title: 'Interest & dividends', desc: 'Interest on foreign loans and dividends paid to non-resident shareholders.' },
        { title: 'NRI sale proceeds', desc: 'Repatriation by an NRI of money from selling property or investments in India.' },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'Form 15CA & 15CB', ''],
      items: [
        { title: 'Invoice or Agreement', desc: 'The invoice, contract or agreement under which the payment is made.' },
        { title: 'Remitter Details', desc: 'PAN, name and address of the payer, and the bank branch sending the money.' },
        { title: 'Beneficiary Details', desc: 'Name, address, country and bank details of the person receiving the money.' },
        { title: 'Tax Residency Certificate & Form 10F', desc: 'Needed from the beneficiary to claim a lower rate under a tax treaty.' },
        { title: 'No PE Declaration', desc: 'A declaration that the beneficiary has no permanent establishment in India, for business income.' },
        { title: 'Tax Payment Proof', desc: 'The TDS challan where tax is withheld, or the sale deed and TDS certificate for NRI sale proceeds.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Certify Your Remittance', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us the purpose of the payment and the amount in under a minute.' },
        { title: 'Upload Documents', desc: 'Share the invoice or agreement and the beneficiary documents securely.' },
        { title: 'CA Reviews Taxability', desc: 'Our CA checks the Income-tax Act and the tax treaty to fix the rate of tax to withhold.' },
        { title: 'Form 15CB Issued', desc: 'The CA signs Form 15CB and uploads it on the portal for you to accept.' },
        { title: 'File Form 15CA', desc: 'We help you file Form 15CA and give the acknowledgement to your bank.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'What is the difference between Form 15CA and Form 15CB?',
      a: 'Form 15CA is a declaration by the person making the payment, filed online on the income tax portal. Form 15CB is a certificate from a Chartered Accountant on the taxability of the payment. Where Form 15CB is needed it is uploaded first and its details flow into Part C of Form 15CA.',
    },
    {
      q: 'Is Form 15CB needed for every foreign payment?',
      a: 'No. It is needed only for taxable remittances where the total paid to the person in the financial year exceeds ₹5 lakh and you do not hold a lower or nil deduction certificate or order. Payments on the Rule 37BB specified list need neither form.',
    },
    {
      q: 'Can I apply a lower tax rate under a tax treaty (DTAA)?',
      a: 'Yes, where the treaty rate is lower than the rate under the Act. The non-resident must give a Tax Residency Certificate and Form 10F, and for business income must not have a permanent establishment in India. Our CA checks the treaty article before certifying.',
    },
    {
      q: 'What if I send the money without filing these forms?',
      a: 'A penalty of ₹1 lakh can be levied under section 271-I for not furnishing the information or for furnishing inaccurate information. Banks also usually refuse to process a taxable remittance without Form 15CA.',
    },
    {
      q: 'How long does it take?',
      a: 'Usually 1-2 working days from receiving complete documents. The CA uploads Form 15CB on the portal, you accept it, Form 15CA is filed from your login and you give the acknowledgement to your bank.',
    },
    {
      q: 'Can a filed Form 15CA be withdrawn?',
      a: 'Yes. If the remittance does not go through, a filed Form 15CA can be withdrawn on the income tax portal within 7 days of submission.',
    },
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted 15CA / 15CB'],
    tagline: 'Chartered Accountants for foreign remittance certification',
    points: [
      { title: 'Quick Certification', sub: 'Form 15CB is usually issued within 1-2 working days of complete documents.' },
      { title: 'Treaty Expertise', sub: 'The tax treaty is checked so you neither over-withhold nor under-withhold tax.' },
      { title: 'Bank Ready', sub: 'You get the Form 15CA acknowledgement your bank asks for.' },
    ],
    questions: [
      {
        id: 'remittancePurpose',
        type: 'select',
        summaryLabel: 'Purpose of remittance',
        label: 'What is the payment for?',
        options: [
          { value: 'services-fees', label: 'Fees for services (software, consultancy, advertising)' },
          { value: 'royalty-technical', label: 'Royalty or fees for technical services' },
          { value: 'interest-dividend', label: 'Interest or dividend' },
          { value: 'nri-sale-proceeds', label: 'NRI repatriation of sale proceeds' },
          { value: 'other', label: 'Something else' },
        ],
      },
      {
        id: 'remittanceAmount',
        type: 'radio',
        summaryLabel: 'Amount sent this year',
        label: 'How much are you sending to this person in the financial year?',
        options: [
          { value: 'upto-5l', label: 'Up to ₹5 lakh' },
          { value: 'above-5l', label: 'More than ₹5 lakh' },
          { value: 'not-sure', label: 'Not sure' },
        ],
      },
    ],
  },
};
