export default {
  slug: 'gstr-2b-itc-reconciliation',
  name: 'GSTR-2B ITC Reconciliation',
  referText: 'Know a business owner who is losing input tax credit? Share this page with them.',

  hero: {
    title: 'GSTR-2B ITC Reconciliation Services',
    intro:
      'Input tax credit can only be claimed on invoices that appear in your GSTR-2B. Our CAs match your purchase register with GSTR-2B every month, so you claim every eligible rupee and avoid mismatch notices.',
    points: [
      'Monthly purchase register vs GSTR-2B matching by experienced CAs.',
      'Vendor-wise mismatch reports with follow-up lists to recover missing credit.',
      'Clear split of eligible, ineligible and blocked ITC before you file GSTR-3B.',
    ],
    formTitle: 'Reconcile Your ITC with Experts',
  },

  sections: [
    {
      type: 'cards',
      title: ['Why ', 'ITC Reconciliation', ' Matters'],
      subtitle: 'Unmatched credit is either lost or becomes a notice. Monthly reconciliation prevents both.',
      items: [
        { title: 'Claim only what is in GSTR-2B', desc: 'Input tax credit is allowed only on invoices your suppliers report and that appear in your GSTR-2B.' },
        { title: 'Recover missing credit', desc: 'Invoices missing from GSTR-2B are listed vendor-wise so you can ask suppliers to report them.' },
        { title: 'Avoid notices and interest', desc: 'ITC claimed over your GSTR-2B triggers scrutiny notices and must be reversed with interest.' },
        { title: 'Meet the time limit', desc: 'ITC for a financial year must be claimed by 30th November of the next year or the annual return date, whichever is earlier.' },
      ],
      note: 'GSTR-2B is generated on the 14th of every month. With the Invoice Management System (IMS) on the GST portal, you can accept, reject or keep supplier invoices pending before it is finalised.',
    },
    {
      type: 'table',
      title: ['What Our ', 'Reconciliation Report', ' Shows'],
      columns: ['Category', 'What It Means', 'Action'],
      rows: [
        ['Matched', 'Invoice is in your books and in GSTR-2B with the same values.', 'Claim the ITC in GSTR-3B.'],
        ['Missing in GSTR-2B', 'You recorded the invoice, but the supplier has not reported it.', 'Follow up with the supplier and claim once it appears.'],
        ['Missing in books', 'A supplier reported an invoice that you have not recorded.', 'Verify and record it, or reject it in IMS.'],
        ['Value mismatch', 'Taxable value or tax amount differs between the two.', 'Ask the supplier to amend, or correct your books.'],
        ['Blocked credit', 'ITC barred under Section 17(5), such as food or personal use.', 'Do not claim; reverse it if already claimed.'],
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'ITC Reconciliation', ''],
      items: [
        { title: 'GSTIN & Portal Login', desc: 'To download GSTR-2B and take actions in IMS.' },
        { title: 'Purchase Register', desc: 'Month-wise purchase invoices from Tally, Zoho Books or Excel.' },
        { title: 'Credit Ledger & Last GSTR-3B', desc: 'Electronic credit ledger and the last GSTR-3B for opening balances.' },
        { title: 'Supplier List', desc: 'Vendor GSTINs and contact details for follow-ups.' },
        { title: 'Debit / Credit Notes', desc: 'Notes received from suppliers during the period.' },
        { title: 'Import Documents', desc: 'Bills of entry, if you import goods and claim ITC on IGST paid.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'Reconcile Your ITC', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us your invoice volume and where you keep records.' },
        { title: 'Data Upload', desc: 'Share your purchase register and portal access.' },
        { title: 'Matching', desc: 'Every invoice is matched with GSTR-2B line by line.' },
        { title: 'Mismatch Report', desc: 'You get a vendor-wise list of missing and mismatched invoices.' },
        { title: 'ITC Finalised', desc: 'Eligible ITC figures are shared for your GSTR-3B.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'What is GSTR-2B?',
      a: "GSTR-2B is an auto-drafted statement of input tax credit generated every month on the GST portal from your suppliers' GSTR-1, IFF, GSTR-5 and GSTR-6 filings and from import data.",
    },
    {
      q: 'What is the difference between GSTR-2A and GSTR-2B?',
      a: 'GSTR-2A is dynamic and keeps changing as suppliers file or amend returns. GSTR-2B is a fixed monthly statement, which is why it is used to decide the ITC you can claim in GSTR-3B.',
    },
    {
      q: 'Can I claim ITC for invoices that are not in my GSTR-2B?',
      a: 'No. Under Section 16(2)(aa) of the CGST Act, ITC is available only for invoices that your supplier has reported and that are communicated to you in GSTR-2B.',
    },
    {
      q: 'What happens if I claim excess ITC?',
      a: 'Excess ITC must be reversed with interest, and it often leads to scrutiny notices from the GST department.',
    },
    {
      q: 'What is the time limit to claim ITC?',
      a: 'ITC on invoices of a financial year can be claimed until 30th November of the following year, or the date you file the annual return, whichever is earlier.',
    },
    {
      q: 'How often should I reconcile?',
      a: 'Every month, before filing GSTR-3B. Monthly reconciliation lets you follow up with suppliers early instead of losing credit at the end of the year.',
    },
  ],

  questionnaire: {
    headline: ['Claim Every Rupee', 'of Eligible ITC'],
    tagline: 'Match your purchases with GSTR-2B before you file GSTR-3B.',
    points: [
      { title: 'Vendor-wise Reports', sub: 'See exactly which suppliers need to correct their filings.' },
      { title: 'Expert CA Review', sub: 'Eligible, ineligible and blocked ITC clearly separated.' },
      { title: 'Monthly Cycle', sub: 'Reconciliation done before your GSTR-3B due date.' },
    ],
    questions: [
      {
        id: 'invoiceVolume',
        type: 'select',
        summaryLabel: 'Invoices',
        label: 'How many purchase invoices do you receive in a month?',
        options: [
          { value: 'upto-100', label: 'Up to 100' },
          { value: '101-500', label: '101 – 500' },
          { value: '501-2000', label: '501 – 2,000' },
          { value: 'above-2000', label: 'More than 2,000' },
        ],
      },
      {
        id: 'booksSoftware',
        type: 'radio',
        summaryLabel: 'Records',
        label: 'Where do you keep your purchase records?',
        options: [
          { value: 'tally', label: 'Tally' },
          { value: 'zoho', label: 'Zoho Books' },
          { value: 'excel-other', label: 'Excel or other software' },
          { value: 'none', label: 'Not maintained yet' },
        ],
      },
    ],
  },

  plans: {
    defaultPlan: 'premium',
    unit: 'per month',
    items: [
      {
        id: 'standard',
        name: 'Standard',
        subtitle: 'For small businesses with up to 100 purchase invoices a month.',
        originalPrice: 1499,
        discountLabel: '33% off',
        price: 999,
        features: [
          'Purchase register vs **GSTR-2B** matching',
          'Up to **100 invoices** per month',
          'Vendor-wise mismatch report',
          'Eligible vs blocked ITC summary',
          'Chat support',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        subtitle: 'For growing businesses that want to recover missing credit.',
        originalPrice: 3999,
        discountLabel: '37% off',
        price: 2499,
        recommended: true,
        features: [
          'Everything in Standard',
          'Up to **500 invoices** per month',
          '**IMS actions** (accept, reject, pending) support',
          'Supplier follow-up list & reminders',
          'ITC reversal advisory (Rules 37 & 37A)',
          '**Dedicated GST expert**',
        ],
      },
      {
        id: 'elite',
        name: 'Elite',
        subtitle: 'For high-volume businesses that want ITC fully managed.',
        originalPrice: 7999,
        discountLabel: '37% off',
        price: 4999,
        hasEmi: true,
        features: [
          'Everything in Premium',
          'Up to **2,000 invoices** per month',
          '**GSTR-3B ITC computation** for filing',
          'Year-end ITC summary for GSTR-9',
          '**Dedicated account manager**',
        ],
      },
    ],
    hint: (answers) => {
      if (answers.invoiceVolume === '101-500') return ['The Premium plan covers up to 500 invoices a month.'];
      if (answers.invoiceVolume === '501-2000') return ['The Elite plan covers up to 2,000 invoices a month.'];
      if (answers.invoiceVolume === 'above-2000') {
        return ['For more than 2,000 invoices a month, choose Elite and our expert will confirm the price for your volume.'];
      }
      if (answers.booksSoftware === 'none') {
        return ['No purchase records yet? Our expert will help you set up a simple purchase register before the first reconciliation.'];
      }
      return [];
    },
  },
};
