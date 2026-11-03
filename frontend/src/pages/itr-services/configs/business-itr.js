import { FAQ, FORM_NOTE, latestYear, years } from '../common.js';

export default {
  slug: 'business-itr',
  name: 'Business Tax Return Filing (ITR 5-7)',
  breadcrumb: 'Business Tax Return Filing',
  referText: 'Know a firm, LLP or company that needs help with its tax return? Share this page with them.',
  fee: 5999,

  hero: {
    title: 'Business Tax Return Filing for Firms, LLPs, Companies & Trusts (ITR-5, 6 & 7)',
    points: [
      { text: 'CA-prepared income tax returns for partnership firms, LLPs, companies and trusts' },
      { text: 'Computation of income with tax audit, MAT and AMT checks where they apply' },
      { text: `File your business return for FY ${latestYear.fy} @`, price: true },
    ],
    explainerTitle: 'Business ITR explained in 60 seconds',
    explainer: [
      'Every company and partnership firm, including an LLP, must file an income tax return every year, even with no income or a loss.',
      'Firms, LLPs and other associations file ITR-5, companies file ITR-6, and trusts and institutions claiming exemption file ITR-7.',
      'The return is built from your books: profit and loss account, balance sheet, depreciation, TDS credits and the tax audit report where one applies.',
      'Share your financial statements. Our CA computes taxable income and tax, reconciles TDS and GST turnover, and e-files and verifies the return.',
    ],
    formTitle: 'File Business ITR',
    formNote: FORM_NOTE,
  },

  payment: {
    title: 'Business Tax Return (ITR 5-7)',
    feeLabel: 'Professional Fee',
    note: 'Covers preparing, e-filing and verifying one return. Tax payable and the tax audit, if one applies, are not included.',
    booked: 'order has been placed',
    desk: 'business tax',
    collect: 'to collect your financial statements, audit report and TDS details',
  },

  sections: [
    {
      type: 'table',
      title: ['Which ', 'ITR Form', ' Does Your Business File?'],
      subtitle: 'The form depends on how the business is constituted. Our CA confirms it from your records.',
      columns: ['Form', 'Who Files It', 'Good to Know'],
      rows: [
        [
          'ITR-5',
          'Partnership firms, LLPs, associations of persons (AOP), bodies of individuals (BOI), co-operative societies, estates and business trusts',
          "Partners report the salary and interest they receive from the firm in their own ITR; their share of the firm's profit is exempt in their hands",
        ],
        [
          'ITR-6',
          'Companies, other than those claiming exemption for income from property held for charitable or religious purposes',
          'Must be filed every year, even with no income or a loss, and verified with a digital signature (DSC)',
        ],
        [
          'ITR-7',
          'Charitable and religious trusts, political parties, research associations, universities, hospitals and other institutions filing under section 139(4A) to 139(4D)',
          'Exemption depends on valid registration and on the audit report (Form 10B or 10BB) being filed before the return',
        ],
      ],
      note: 'Individuals and HUFs file ITR-1 to ITR-4. From tax year 2026-27 returns are filed under the Income-tax Act, 2025, and our CA files on the form that applies to your year.',
    },
    {
      type: 'cards',
      title: ['Due Dates for ', 'Business Returns', ''],
      subtitle: 'Filing late costs a late fee and interest, and business losses can no longer be carried forward.',
      items: [
        {
          title: 'Accounts not audited',
          desc: '31 July after the financial year, for firms, AOPs and BOIs whose accounts do not need an audit.',
        },
        {
          title: 'Audited accounts',
          desc: '31 October for companies and for firms, LLPs and trusts that need an audit. The audit report is due a month earlier, on 30 September.',
        },
        {
          title: 'Transfer pricing cases',
          desc: '30 November when the entity has international or specified domestic transactions that need a Form 3CEB report.',
        },
        {
          title: 'Belated and updated returns',
          desc: 'A belated or revised return can be filed until 31 December. After that only an updated return (ITR-U), with additional tax, is possible.',
        },
      ],
    },
    {
      type: 'table',
      title: ['Tax Rates ', 'at a Glance', ''],
      subtitle: 'Rates as currently notified. Our CA applies the rates in force for your year.',
      columns: ['Entity', 'Rate', 'Notes'],
      rows: [
        [
          'Partnership firm / LLP',
          '30%',
          'Plus 12% surcharge when income exceeds ₹1 crore, and 4% cess. Salary and interest paid to partners are deductible within the limits of section 40(b).',
        ],
        [
          'Domestic company (section 115BAA)',
          '22%',
          'Effectively 25.17% with the 10% surcharge and 4% cess. No Minimum Alternate Tax, but most deductions and incentives are given up.',
        ],
        [
          'Domestic company (regular)',
          '25% or 30%',
          '25% when turnover in the base year set by the Finance Act is up to ₹400 crore, otherwise 30%. Minimum Alternate Tax at 15% of book profit applies.',
        ],
        [
          'Charitable or religious trust',
          'Exempt if conditions are met',
          'Income applied to its objects is exempt when the trust is registered and files on time; otherwise it is taxed at the maximum marginal rate.',
        ],
      ],
    },
    {
      type: 'documents',
      title: ['Documents Required for ', 'Business ITR Filing', ''],
      items: [
        { title: 'Financial Statements', desc: 'Profit and loss account, balance sheet and ledgers for the year, audited where required.' },
        { title: 'Tax Audit Report', desc: 'Form 3CA or 3CB with Form 3CD if your accounts are audited under section 44AB.' },
        { title: 'Bank Statements', desc: 'Statements of every business bank account for the full financial year.' },
        { title: 'TDS, TCS & Advance Tax', desc: 'Form 26AS, AIS and the challans for advance and self-assessment tax paid.' },
        { title: 'Constitution & PAN', desc: 'Partnership deed, LLP agreement, MoA and AoA or trust deed, the PAN of the entity and the DSC of the signatory.' },
        { title: 'Earlier Returns & GST Data', desc: "Last year's return, losses carried forward, and GST returns to reconcile turnover." },
      ],
    },
    {
      type: 'steps',
      title: ['How We ', 'File Your Business Return', ''],
      items: [
        { title: 'Share Details', desc: 'Tell us the type of entity, the audit position and the financial year.' },
        { title: 'Upload Records', desc: 'Share financial statements, the audit report and TDS details securely.' },
        { title: 'CA Computes Income', desc: 'Our CA computes taxable income, depreciation, MAT or AMT, and reconciles TDS and GST turnover.' },
        { title: 'Review & Approve', desc: 'You review the computation and approve it before anything is filed.' },
        { title: 'E-file & Verify', desc: 'We e-file the return, verify it with DSC or EVC and share the acknowledgement.' },
      ],
    },
  ],

  faqs: [
    {
      q: 'Is it mandatory for a company or firm to file an ITR?',
      a: 'Yes. Every company and every firm, including an LLP, must file a return for each year under section 139(1), whether it makes a profit, makes a loss or has no business at all.',
    },
    {
      q: 'Which form does an LLP file?',
      a: 'ITR-5. For income tax an LLP is treated like a partnership firm and pays tax at 30%. Its annual filings with the MCA (Form 8 and Form 11) are separate from the income tax return.',
    },
    {
      q: 'Is a digital signature required?',
      a: 'Companies and political parties must verify their return with a DSC, as must any firm, LLP or other entity whose accounts are audited under section 44AB. Others can e-verify with an electronic verification code (EVC).',
    },
    {
      q: 'Is the tax audit included in the fee?',
      a: 'The fee covers preparing, e-filing and verifying the return, including the computation of income. If your accounts need a tax audit under section 44AB, share the report from your auditor, or ask our team to arrange the audit, which is quoted separately.',
    },
    {
      q: 'Can a business carry forward its losses?',
      a: 'Business losses can be carried forward for 8 assessment years and set off against future business profits, but only if the return is filed by the due date. Unabsorbed depreciation can be carried forward without a time limit.',
    },
    {
      q: 'What are MAT and AMT?',
      a: 'Minimum Alternate Tax (section 115JB) makes a company pay at least 15% of its book profit when its regular tax is lower. Alternate Minimum Tax (section 115JC) does the same for firms and LLPs that claim certain deductions, at 18.5% of adjusted total income. Companies taxed under section 115BAA are outside MAT.',
    },
    FAQ.missedDueDate,
    FAQ.updatedReturn,
  ],

  questionnaire: {
    headline: ['', 'Expert Assisted Business Tax Returns'],
    tagline: 'Chartered Accountants for firms, LLPs, companies and trusts',
    points: [
      { title: 'Books to Return', sub: 'Your financial statements turned into an accurate computation of income.' },
      { title: 'Audit Ready', sub: 'Tax audit, MAT and AMT positions checked before the return is filed.' },
      { title: 'On-Time Filing', sub: 'Due dates tracked so losses can be carried forward and late fees avoided.' },
    ],
    questions: [
      {
        id: 'entityType',
        type: 'select',
        summaryLabel: 'Type of entity',
        label: 'What type of entity is filing?',
        options: [
          { value: 'partnership-firm', label: 'Partnership Firm' },
          { value: 'llp', label: 'Limited Liability Partnership (LLP)' },
          { value: 'private-limited', label: 'Private Limited Company' },
          { value: 'other-company', label: 'Other Company (Public, OPC, Section 8)' },
          { value: 'trust-ngo', label: 'Trust, Society or NGO' },
          { value: 'aop-boi', label: 'AOP / BOI / Co-operative Society' },
        ],
      },
      {
        id: 'auditStatus',
        type: 'radio',
        summaryLabel: 'Tax audit',
        label: 'Do your accounts need a tax audit?',
        options: [
          { value: 'audit-required', label: 'Yes, an audit is required' },
          { value: 'no-audit', label: 'No audit is required' },
          { value: 'not-sure', label: 'Not sure' },
        ],
      },
      {
        id: 'financialYear',
        type: 'select',
        summaryLabel: 'Financial year',
        label: 'Select your Financial Year',
        options: years.map(({ value, label }) => ({ value, label })),
      },
    ],
  },
};
