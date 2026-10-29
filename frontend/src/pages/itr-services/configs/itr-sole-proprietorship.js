import { FAQ, ITR_CONSULTATION_FEE, LANGUAGE_OPTIONS, payment, questionnaire } from '../common.js';

export default {
  slug: 'itr-sole-proprietorship',
  name: 'ITR Filing for Sole Proprietorship Firm',
  breadcrumb: 'ITR Filing for Sole Proprietorship Firm',
  referText: 'Know a business owner who needs help filing their proprietorship return? Share this page with them.',
  fee: ITR_CONSULTATION_FEE,

  hero: {
    title: 'ITR Filing for Sole Proprietorship Firm',
    points: [
      { text: 'Simplified ITR filing for proprietorship firms online.' },
      { text: 'Quick, affordable, and expert-assisted online filing.' },
      { text: 'Safe, secure, and confidential return process.' },
    ],
    formTitle: 'Get Started!',
    extraField: { id: 'language', placeholder: 'Language', error: 'Choose a language', options: LANGUAGE_OPTIONS },
    whatsapp: false,
    formNote: 'No Spam. No Sharing. 100% Confidentiality.',
  },

  payment,

  sections: [
    {
      type: 'table',
      title: ['Which ', 'ITR Form', ' Should a Proprietor File?'],
      subtitle: 'A sole proprietorship is not a separate legal entity, so the proprietor files in their own name.',
      columns: ['Form', 'Use It When', 'Books of Account', 'Tax Audit'],
      rows: [
        [
          'ITR-4 (Sugam)',
          'You are a resident, your total income is up to ₹50 lakh and you opt for presumptive taxation under section 44AD (business) or 44ADA (specified professions)',
          'Not required for the presumptive income',
          'Not needed, unless you declare profit below the presumptive rate and your income is above the basic exemption limit',
        ],
        [
          'ITR-3',
          'Your business or profession is not under presumptive taxation, your income is above ₹50 lakh, or you do not qualify for ITR-4',
          'Profit & loss account and balance sheet are required',
          'Needed when turnover is above ₹1 crore (₹10 crore if cash receipts and payments are within 5%), or professional receipts are above ₹50 lakh',
        ],
      ],
      note: 'Our CA confirms the right form from your books and turnover before filing.',
    },
    {
      type: 'cards',
      title: ['Tax Rules ', 'Every Proprietor Should Know', ''],
      subtitle: 'Limits are as currently notified. Our CA applies the rules in force for your year.',
      items: [
        {
          title: 'Presumptive income (44AD)',
          desc: 'Declare 8% of turnover as profit (6% on receipts through banking channels). The turnover limit is ₹2 crore, or ₹3 crore when cash receipts are within 5%.',
        },
        {
          title: 'Presumptive income (44ADA)',
          desc: 'Specified professionals declare 50% of gross receipts as profit, up to ₹50 lakh of receipts (₹75 lakh when cash receipts are within 5%).',
        },
        {
          title: 'Advance tax',
          desc: 'Pay advance tax if your tax liability is ₹10,000 or more. Presumptive taxpayers pay it in a single instalment by 15 March.',
        },
        {
          title: 'Tax audit timelines',
          desc: 'Where an audit applies, the audit report is due by 30 September and the return by 31 October.',
        },
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'Proprietorship ITR Filing', ''],
      items: [
        { title: 'PAN & Aadhaar', desc: "The proprietor's PAN linked with Aadhaar, and the mobile number registered on the income tax portal." },
        { title: 'Business Bank Statements', desc: 'Current and savings account statements for the full financial year.' },
        { title: 'Sales & Purchase Records', desc: 'Invoices, ledgers or books of account showing turnover, expenses and stock.' },
        { title: 'GST Returns', desc: 'If you are registered, your GSTR-1 and GSTR-3B so turnover can be reconciled with the ITR.' },
        { title: 'AIS, TIS & Form 26AS', desc: 'Statements from the income tax portal showing TDS, TCS and reported income.' },
        { title: 'Assets, Loans & Deduction Proofs', desc: 'Asset purchase bills for depreciation, loan statements and Section 80C and 80D proofs.' },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'File Your Proprietorship ITR', ''],
      items: [
        { title: 'Share Details', desc: 'Pick your source of income and financial year in under a minute.' },
        { title: 'Upload Records', desc: 'Share bank statements, sales and purchase records and GST returns securely.' },
        { title: 'CA Prepares Return', desc: 'Our CA chooses presumptive or regular filing, and reconciles turnover with your GST returns.' },
        { title: 'Review & Approve', desc: 'You review the computation and approve it before anything is filed.' },
        { title: 'E-file & E-verify', desc: 'We file on the portal, share the acknowledgement and help you e-verify within 30 days.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'Does a sole proprietorship file a separate ITR?',
      a: 'No. A sole proprietorship is not a separate legal entity. The proprietor reports the business income in their personal ITR (ITR-3 or ITR-4) along with any salary, house property, capital gains or other income.',
    },
    {
      q: 'What is presumptive taxation?',
      a: 'Under sections 44AD and 44ADA, eligible small businesses and specified professionals can declare a fixed percentage of turnover or receipts as profit instead of maintaining detailed books. It reduces paperwork, and the return is filed in ITR-4 when the other conditions are met.',
    },
    {
      q: 'Is a tax audit mandatory for a proprietorship?',
      a: 'Only above the limits of section 44AB: a business turnover above ₹1 crore (₹10 crore when cash receipts and payments are within 5%), or professional receipts above ₹50 lakh. Opting out of presumptive taxation by declaring a lower profit can also trigger an audit. Where an audit applies, the return is due on 31 October; otherwise it is due on 31 July.',
    },
    {
      q: 'Do I need GST registration to file my ITR?',
      a: 'No. Filing an ITR does not require GST registration. If you are registered, the turnover in your ITR should reconcile with your GST returns, because mismatches can lead to notices.',
    },
    {
      q: 'Can I carry forward a business loss?',
      a: 'Yes. A business loss can be carried forward for up to 8 assessment years and set off against future business profits, but only if the return is filed by the due date.',
    },
    FAQ.missedDueDate,
    FAQ.consultationFee,
    FAQ.eVerify,
  ],

  questionnaire,
};
