/**
 * BharatFiling - MCA & Statutory Business Naming Rules Configuration
 * Based on Companies Act 2013 (Section 4, Rule 8 & 8A of Companies (Incorporation) Rules, 2014)
 * and Emblems and Names (Prevention of Improper Use) Act, 1950.
 */

export const PROHIBITED_EMBLEMS_WORDS = [
  'national',
  'republic',
  'union',
  'president',
  'presidential',
  'governor',
  'court',
  'judiciary',
  'supreme court',
  'high court',
  'statutory',
  'bureau',
  'parliament',
  'prime minister',
  'rashtrapati',
  'rajya sabha',
  'lok sabha',
  'central government',
  'state government',
  'united nations',
  'ashoka chakra',
  'bharat ratna',
];

export const REGULATORY_APPROVAL_WORDS = [
  {
    words: ['bank', 'banking'],
    authority: 'Reserve Bank of India (RBI)',
    reason: 'Use of word "Bank" or "Banking" requires prior approval/NOC from RBI under Banking Regulation Act, 1949.',
  },
  {
    words: ['insurance', 'assurance', 'reinsurance'],
    authority: 'Insurance Regulatory and Development Authority of India (IRDAI)',
    reason: 'Requires prior approval/NOC from IRDAI under Insurance Act, 1938.',
  },
  {
    words: ['stock exchange', 'securities', 'depository'],
    authority: 'Securities and Exchange Board of India (SEBI)',
    reason: 'Requires prior regulatory approval from SEBI.',
  },
  {
    words: ['venture capital', 'mutual fund', 'asset management'],
    authority: 'Securities and Exchange Board of India (SEBI)',
    reason: 'Requires SEBI registration / approval under relevant fund regulations.',
  },
  {
    words: ['chit fund', 'chitty'],
    authority: 'State Registrar of Chits / RBI',
    reason: 'Governed by Chit Funds Act, 1982; requires prior regulatory clearance.',
  },
  {
    words: ['advocate', 'law firm', 'legal chambers'],
    authority: 'Bar Council of India',
    reason: 'Incorporation of corporate legal practices is subject to Advocates Act, 1961 guidelines.',
  },
  {
    words: ['chartered accountant', 'cost accountant', 'company secretary'],
    authority: 'ICAI / ICMAI / ICSI',
    reason: 'Professional institute guidelines restrict corporate entity names resembling individual practice firms.',
  },
];

export const CAPITAL_CRITERIA_WORDS = [
  {
    word: 'corporation',
    minCapital: 5000000,
    note: 'Requires minimum authorized capital of ₹5 Crore or specific central government permission.',
  },
  {
    word: 'international',
    minCapital: 5000000,
    note: 'Generally requires minimum authorized capital of ₹5 Crore and demonstrated cross-border trade.',
  },
  {
    word: 'globe',
    minCapital: 5000000,
    note: 'Generally requires minimum authorized capital of ₹5 Crore.',
  },
  {
    word: 'universal',
    minCapital: 5000000,
    note: 'Requires substantial operations and higher capital endorsement.',
  },
  {
    word: 'hindustan',
    minCapital: 5000000,
    note: 'Requires proof of nationwide operations and minimum ₹5 Crore authorized capital.',
  },
  {
    word: 'bharat',
    minCapital: 5000000,
    note: 'Requires proof of pan-India presence and higher authorized capital justification.',
  },
  {
    word: 'india',
    minCapital: 5000000,
    note: 'Requires pan-India operations justification if placed as a standalone dominant prefix.',
  },
];

export const MANDATORY_ENTITY_SUFFIXES = {
  private_limited: {
    fullName: 'Private Limited Company',
    validSuffixes: ['private limited', 'pvt ltd', 'pvt. ltd.', 'p. ltd.'],
    canonicalSuffix: 'Private Limited',
    mcaGoverned: true,
    rule: 'Under Section 4(1)(a) of Companies Act 2013, the last word(s) of a private company name must be "Private Limited".',
  },
  public_limited: {
    fullName: 'Public Limited Company',
    validSuffixes: ['limited', 'ltd', 'ltd.'],
    canonicalSuffix: 'Limited',
    mcaGoverned: true,
    rule: 'Under Section 4(1)(a) of Companies Act 2013, the last word of a public company name must be "Limited".',
  },
  opc: {
    fullName: 'One Person Company (OPC)',
    validSuffixes: ['(opc) private limited', 'opc private limited', 'one person company'],
    canonicalSuffix: '(OPC) Private Limited',
    mcaGoverned: true,
    rule: 'Under Section 12(3) of Companies Act 2013, an OPC must include "(OPC) Private Limited" in its name.',
  },
  section_8: {
    fullName: 'Section 8 Company (Non-Profit)',
    validSuffixes: ['foundation', 'association', 'federation', 'council', 'forum', 'society', 'institute', 'chamber'],
    canonicalSuffix: 'Foundation',
    mcaGoverned: true,
    rule: 'Section 8 companies are licensed to omit "Private Limited" but must include words like Foundation, Council, Forum, etc.',
  },
  llp: {
    fullName: 'Limited Liability Partnership',
    validSuffixes: ['limited liability partnership', 'llp'],
    canonicalSuffix: 'LLP',
    mcaGoverned: true,
    rule: 'Under Section 15 of LLP Act 2008, the name must end with "Limited Liability Partnership" or "LLP".',
  },
  partnership: {
    fullName: 'Partnership Firm',
    validSuffixes: ['& co', '& company', '& associates', 'firm'],
    canonicalSuffix: '& Co.',
    mcaGoverned: false,
    rule: 'Governed by Indian Partnership Act 1932. Cannot use corporate suffixes like "Pvt Ltd" or "LLP". Registered with State Registrar of Firms (ROF).',
  },
  proprietorship: {
    fullName: 'Sole Proprietorship',
    validSuffixes: ['enterprises', 'traders', 'agency', 'stores', 'services'],
    canonicalSuffix: '',
    mcaGoverned: false,
    rule: 'Trade name for individual business (GST/MSME). Not an incorporated corporate body; cannot use corporate suffixes.',
  },
  other: {
    fullName: 'Other Trade / Business Name',
    validSuffixes: [],
    canonicalSuffix: '',
    mcaGoverned: false,
    rule: 'Commercial trade name subject to common-law passing off and Trade Marks Act, 1999 protections.',
  },
};

export const COMMON_GENERIC_WORDS = [
  'technologies',
  'technology',
  'tech',
  'solutions',
  'services',
  'enterprises',
  'enterprise',
  'industries',
  'industry',
  'ventures',
  'venture',
  'consultancy',
  'consulting',
  'associates',
  'international',
  'global',
  'digital',
  'systems',
  'software',
  'labs',
  'lab',
  'innovations',
  'innovation',
  'management',
  'advisory',
  'finance',
  'financial',
  'traders',
  'trading',
  'agency',
  'infra',
  'infrastructure',
  'logistics',
  'media',
  'holdings',
  'group',
  'corp',
  'corporation',
  'india',
  'bharat',
  'private',
  'limited',
  'pvt',
  'ltd',
  'llp',
];
