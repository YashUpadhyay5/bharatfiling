/**
 * BharatFiling service directory + search scoring, shared by the header search dialog and the
 * home-page hero search.
 */

// Comprehensive structured directory of BharatFiling services
export const SERVICES_DATA = [
  // INCORPORATION
  {
    id: 'pvt-ltd',
    title: 'Private Limited Company',
    subtitle: 'Incorporate a Pvt Ltd company in India',
    category: 'INCORPORATION',
    badge: 'INCORPORATION',
    path: '/services/company-registration',
    keywords: ['pvt ltd', 'company', 'incorporation', 'private limited', 'mca', 'spice+', 'startup'],
    isTrending: true,
  },
  {
    id: 'llp-reg',
    title: 'Limited Liability Partnership',
    subtitle: 'Register an LLP with limited liability',
    category: 'INCORPORATION',
    badge: 'INCORPORATION',
    path: '/services/llp-registration',
    keywords: ['llp', 'partnership', 'limited liability', 'firm', 'partners', 'agreement'],
    isTrending: false,
  },
  {
    id: 'opc-reg',
    title: 'One Person Company',
    subtitle: 'Single-owner company registration',
    category: 'INCORPORATION',
    badge: 'INCORPORATION',
    path: '/services/company-registration',
    keywords: ['opc', 'one person', 'solo', 'company', 'founder'],
    isTrending: false,
  },
  {
    id: 'partnership-firm',
    title: 'Partnership Firm',
    subtitle: 'Register a partnership firm in India',
    category: 'INCORPORATION',
    badge: 'INCORPORATION',
    path: '/services/company-registration',
    keywords: ['partnership', 'firm', 'deed', 'registration', 'partners'],
    isTrending: false,
  },
  {
    id: 'proprietorship',
    title: 'Sole Proprietorship Firm',
    subtitle: 'Register a sole proprietorship business',
    category: 'INCORPORATION',
    badge: 'INCORPORATION',
    path: '/apply/gst',
    keywords: ['proprietorship', 'sole trader', 'individual', 'business', 'shop'],
    isTrending: false,
  },
  {
    id: 'section-8',
    title: 'Section 8 Company',
    subtitle: 'NGO & non-profit entity registration',
    category: 'INCORPORATION',
    badge: 'INCORPORATION',
    path: '/services/company-registration',
    keywords: ['section 8', 'ngo', 'non profit', 'trust', 'society', '12a', '80g'],
    isTrending: false,
  },

  // TRADEMARK
  {
    id: 'tm-reg',
    title: 'Trademark Registration',
    subtitle: 'Protect your brand name & logo in India',
    category: 'TRADEMARK',
    badge: 'TRADEMARK',
    path: '/services/trademark',
    keywords: ['trademark', 'tm', 'brand', 'logo', 'brand name', 'ipr', 'symbol'],
    isTrending: true,
  },
  {
    id: 'copyright-reg',
    title: 'Copyright Registration',
    subtitle: 'Register copyright for creative works',
    category: 'TRADEMARK',
    badge: 'TRADEMARK',
    path: '/services/trademark',
    keywords: ['copyright', 'art', 'music', 'books', 'software', 'content'],
    isTrending: false,
  },
  {
    id: 'tm-objection',
    title: 'Trademark Objection Reply',
    subtitle: 'Respond to examination report by IP examiner',
    category: 'TRADEMARK',
    badge: 'TRADEMARK',
    path: '/services/trademark',
    keywords: ['tm objection', 'examination report', 'section 9', 'section 11', 'reply'],
    isTrending: false,
  },
  {
    id: 'tm-search',
    title: 'Trademark Availability Search',
    subtitle: 'Free comprehensive public TM class check',
    category: 'TRADEMARK',
    badge: 'TRADEMARK',
    path: '/services/trademark',
    keywords: ['tm search', 'brand search', 'trademark check', 'class search', 'availability'],
    isTrending: false,
  },

  // GST & TAX
  {
    id: 'gst-apply',
    title: 'GST Registration',
    subtitle: 'New GSTIN registration for businesses',
    category: 'GST & TAX',
    badge: 'GST & TAX',
    path: '/services/gst-registration',
    keywords: ['gst', 'registration', 'gstin', 'apply', 'trn', 'new tax', 'certificate'],
    isTrending: true,
  },
  {
    id: 'gst-return',
    title: 'GST Return Filing (GSTR-1 & 3B)',
    subtitle: 'Monthly & quarterly GSTR filings with reconciliation',
    category: 'GST & TAX',
    badge: 'GST & TAX',
    path: '/services/gst-return',
    keywords: ['gst', 'return', 'gstr1', 'gstr3b', 'monthly filing', 'quarterly'],
    isTrending: false,
  },
  {
    id: 'itr-filing',
    title: 'Income Tax Return (ITR)',
    subtitle: 'Expert CA filing for individual & business',
    category: 'GST & TAX',
    badge: 'GST & TAX',
    path: '/services/income-tax',
    keywords: ['itr', 'tax', 'income tax', 'salary', 'capital gains', 'refund', 'itr 1', 'itr 4'],
    isTrending: true,
  },
  {
    id: 'tds-returns',
    title: 'TDS Return Filing (24Q / 26Q)',
    subtitle: 'Quarterly salary & vendor TDS compliance',
    category: 'GST & TAX',
    badge: 'GST & TAX',
    path: '/services/income-tax',
    keywords: ['tds', 'form 16', 'traces', '24q', '26q', 'tax deducted'],
    isTrending: false,
  },
  {
    id: 'gstr-9',
    title: 'GSTR-9 Annual Return',
    subtitle: 'Annual GST audit & turnover reconciliation',
    category: 'GST & TAX',
    badge: 'GST & TAX',
    path: '/services/gst-return',
    keywords: ['gstr9', 'annual return', 'audit', 'gst reconciliation', 'annual'],
    isTrending: false,
  },
  {
    id: '15ca-15cb',
    title: 'Form 15CA / 15CB Certification',
    subtitle: 'Foreign remittance CA certification',
    category: 'GST & TAX',
    badge: 'GST & TAX',
    path: '/services/income-tax',
    keywords: ['15ca', '15cb', 'foreign remittance', 'ca certificate', 'rbi'],
    isTrending: false,
  },

  // MCA & COMPLIANCE
  {
    id: 'roc-filing',
    title: 'Company Annual ROC Filing',
    subtitle: 'File AOC-4 and MGT-7 with MCA',
    category: 'MCA & COMPLIANCE',
    badge: 'MCA & COMPLIANCE',
    path: '/services/llp-registration',
    keywords: ['roc', 'mca', 'annual filing', 'aoc4', 'mgt7', 'balance sheet'],
    isTrending: false,
  },
  {
    id: 'dir3-kyc',
    title: 'Director KYC (DIR-3 KYC)',
    subtitle: 'Annual director verification on MCA',
    category: 'MCA & COMPLIANCE',
    badge: 'MCA & COMPLIANCE',
    path: '/services/llp-registration',
    keywords: ['dir-3', 'dir3', 'director kyc', 'din kyc', 'din'],
    isTrending: false,
  },
  {
    id: 'add-director',
    title: 'Add or Remove Director (DIR-12)',
    subtitle: 'DIR-12 appointment & resignation filings',
    category: 'MCA & COMPLIANCE',
    badge: 'MCA & COMPLIANCE',
    path: '/services/llp-registration',
    keywords: ['director', 'dir12', 'resignation', 'appointment', 'board'],
    isTrending: false,
  },
  {
    id: 'strike-off',
    title: 'Strike Off Company / LLP',
    subtitle: 'Fast-track closure of dormant entities',
    category: 'MCA & COMPLIANCE',
    badge: 'MCA & COMPLIANCE',
    path: '/services/llp-registration',
    keywords: ['strike off', 'close company', 'close llp', 'stk2', 'dormant'],
    isTrending: false,
  },

  // LICENSES & REGISTRATION
  {
    id: 'msme-reg',
    title: 'MSME / Udyam Registration',
    subtitle: 'Priority government subsidies & collateral-free loans',
    category: 'LICENSES & REGISTRATION',
    badge: 'LICENSES & REGISTRATION',
    path: '/services',
    keywords: ['msme', 'udyam', 'small business', 'subsidy', 'priority loan'],
    isTrending: false,
  },
  {
    id: 'fssai-food',
    title: 'FSSAI Food Safety License',
    subtitle: 'Food safety license for restaurants & food units',
    category: 'LICENSES & REGISTRATION',
    badge: 'LICENSES & REGISTRATION',
    path: '/services',
    keywords: ['fssai', 'food license', 'restaurant', 'cloud kitchen', 'foscos'],
    isTrending: false,
  },
  {
    id: 'iec-code',
    title: 'Import Export Code (IEC)',
    subtitle: 'Mandatory DGFT code for international trade',
    category: 'LICENSES & REGISTRATION',
    badge: 'LICENSES & REGISTRATION',
    path: '/services',
    keywords: ['iec', 'dgft', 'export license', 'import license', 'customs'],
    isTrending: false,
  },
  {
    id: 'dsc-token',
    title: 'Digital Signature Certificate (DSC)',
    subtitle: 'Class 3 USB cryptographic token for MCA & GST',
    category: 'LICENSES & REGISTRATION',
    badge: 'LICENSES & REGISTRATION',
    path: '/services',
    keywords: ['dsc', 'digital signature', 'class 3', 'emsigner', 'usb token'],
    isTrending: false,
  },

  // CONSULTATIONS & SUPPORT
  {
    id: 'talk-ca',
    title: 'Talk to Chartered Accountant (CA)',
    subtitle: '1-on-1 private consultation with experienced CA',
    category: 'CONSULTATION',
    badge: 'CONSULTATION',
    path: '/contact',
    keywords: ['talk to ca', 'ca consultation', 'chartered accountant', 'tax advice', 'consult'],
    isTrending: false,
  },
  {
    id: 'pricing-page',
    title: 'Transparent Pricing Plans',
    subtitle: 'All-inclusive CA filing packages & transparent fees',
    category: 'PRICING',
    badge: 'PRICING',
    path: '/pricing',
    keywords: ['pricing', 'plans', 'cost', 'fees', 'charges', 'packages'],
    isTrending: false,
  },
];

// Pages that are informational and never require an account.
export const PUBLIC_INFO_PATHS = ['/about', '/faq', '/pricing', '/contact', '/services'];

/** Ranked matches for a free-text query (empty query -> no results). */
export function searchServices(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  return SERVICES_DATA.map((item) => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const subLower = item.subtitle.toLowerCase();
    const catLower = item.category.toLowerCase();
    const allKeywords = item.keywords.join(' ').toLowerCase();

    // Exact or prefix match
    if (titleLower === q) score += 150;
    else if (titleLower.startsWith(q)) score += 100;
    else if (titleLower.includes(q)) score += 60;

    // Subtitle match
    if (subLower.includes(q)) score += 35;

    // Category match
    if (catLower.startsWith(q)) score += 40;
    else if (catLower.includes(q)) score += 20;

    // Token matches
    tokens.forEach((token) => {
      if (titleLower.includes(token)) score += 25;
      if (subLower.includes(token)) score += 15;
      if (allKeywords.includes(token)) score += 25;
    });

    return { ...item, score };
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

export const findService = (id) => SERVICES_DATA.find((s) => s.id === id);
