/**
 * BharatFiling - Client-Side Firm Name Search & Validation Engine
 * Provides instant reactive validation, similarity heuristics, and statutory rule screening.
 */

// Common generic industry terms
export const COMMON_GENERIC_WORDS = [
  'technologies', 'technology', 'tech', 'solutions', 'services', 'enterprises',
  'enterprise', 'industries', 'industry', 'ventures', 'venture', 'consultancy',
  'consulting', 'associates', 'international', 'global', 'digital', 'systems',
  'software', 'labs', 'lab', 'innovations', 'innovation', 'management', 'advisory',
  'finance', 'financial', 'traders', 'trading', 'agency', 'infra', 'infrastructure',
  'logistics', 'media', 'holdings', 'group', 'corp', 'corporation', 'india', 'bharat',
  'private', 'limited', 'pvt', 'ltd', 'llp',
];

export const ENTITY_TYPES = [
  {
    id: 'private_limited',
    name: 'Private Limited Company',
    shortName: 'Pvt Ltd',
    suffix: 'Private Limited',
    mcaGoverned: true,
    badge: 'Most Popular',
    description: 'Requires "Private Limited" suffix. Governed by MCA CRC under Companies Act 2013 Rule 8.',
  },
  {
    id: 'llp',
    name: 'Limited Liability Partnership',
    shortName: 'LLP',
    suffix: 'LLP',
    mcaGoverned: true,
    badge: 'Popular for Services',
    description: 'Requires "LLP" suffix. Governed by MCA under LLP Act 2008 & Rule 18.',
  },
  {
    id: 'one_person_company',
    name: 'One Person Company',
    shortName: 'OPC',
    suffix: '(OPC) Private Limited',
    mcaGoverned: true,
    badge: 'Solo Founders',
    description: 'Requires "(OPC) Private Limited" suffix under Section 12(3) of Companies Act 2013.',
  },
  {
    id: 'public_limited',
    name: 'Public Limited Company',
    shortName: 'Public Ltd',
    suffix: 'Limited',
    mcaGoverned: true,
    badge: 'Large Scale',
    description: 'Requires "Limited" suffix. Governed by MCA for companies with 7+ shareholders.',
  },
  {
    id: 'section_8',
    name: 'Section 8 Company (NGO)',
    shortName: 'Section 8',
    suffix: 'Foundation',
    mcaGoverned: true,
    badge: 'Non-Profit',
    description: 'Licensed to omit "Pvt Ltd"; uses terms like Foundation, Council, Forum, or Society.',
  },
  {
    id: 'partnership',
    name: 'Partnership Firm',
    shortName: 'Partnership',
    suffix: '& Co.',
    mcaGoverned: false,
    badge: 'State ROF',
    description: 'Registered with State Registrar of Firms (ROF). Cannot use corporate suffixes like "Pvt Ltd" or "LLP".',
  },
  {
    id: 'proprietorship',
    name: 'Sole Proprietorship',
    shortName: 'Proprietorship',
    suffix: '',
    mcaGoverned: false,
    badge: 'Individual Trade',
    description: 'Trade name for individual business (GST/MSME). Not an incorporated MCA body.',
  },
  {
    id: 'other',
    name: 'Other Trade / Business Name',
    shortName: 'Trade Name',
    suffix: '',
    mcaGoverned: false,
    badge: 'General',
    description: 'Commercial brand or business trade name protected under Trade Marks Act 1999.',
  },
];

export const INDUSTRY_OPTIONS = [
  { id: 'technology', label: 'Technology, Software & IT', classes: [9, 42], icon: '💻' },
  { id: 'ecommerce', label: 'E-commerce & Retail Trading', classes: [35, 9, 39], icon: '🛒' },
  { id: 'finance', label: 'FinTech, Banking & Financial Services', classes: [36, 9, 42], icon: '💳' },
  { id: 'healthcare', label: 'Healthcare, Pharma & Life Sciences', classes: [5, 10, 44], icon: '🩺' },
  { id: 'food', label: 'Food, Beverages & Hospitality', classes: [29, 30, 32, 43], icon: '🍽️' },
  { id: 'manufacturing', label: 'Manufacturing & Industrial Machinery', classes: [7, 11, 12, 19], icon: '⚙️' },
  { id: 'consulting', label: 'Consulting, Legal & Professional Services', classes: [35, 41, 45], icon: '📊' },
  { id: 'education', label: 'Education, EdTech & Publishing', classes: [41, 9, 16], icon: '🎓' },
  { id: 'realestate', label: 'Real Estate & Construction', classes: [36, 37], icon: '🏢' },
  { id: 'logistics', label: 'Logistics, Supply Chain & Transport', classes: [39, 35], icon: '🚚' },
  { id: 'general', label: 'General Commercial Trade', classes: [35], icon: '🌐' },
];

export function stripEntitySuffixes(name = '') {
  let cleaned = name.toLowerCase().trim();
  const suffixes = [
    'private limited company',
    'private limited',
    'pvt ltd',
    'pvt. ltd.',
    'p. ltd.',
    '(opc) private limited',
    'opc private limited',
    'one person company',
    'limited liability partnership',
    'llp',
    'limited',
    'ltd',
    'ltd.',
    '& co.',
    '& co',
    'and co',
    '& associates',
    'and associates',
  ];

  for (const s of suffixes) {
    const regex = new RegExp(`\\b${s.replace('.', '\\.')}\\b$`, 'gi');
    cleaned = cleaned.replace(regex, '').trim();
  }
  return cleaned;
}

export function extractDistinctiveWord(name = '') {
  const stripped = stripEntitySuffixes(name);
  const tokens = stripped.split(/[\s-]+/).filter(Boolean);
  const distinctive = tokens.filter((t) => !COMMON_GENERIC_WORDS.includes(t));
  return distinctive.length > 0 ? distinctive[0] : '';
}

export function validateProposedNameInput(rawName = '') {
  const trimmed = rawName.trim();
  const errors = [];

  if (!trimmed) {
    errors.push('Please enter a proposed business name.');
  } else if (trimmed.length < 2) {
    errors.push('Name must be at least 2 characters long.');
  } else if (trimmed.length > 120) {
    errors.push('Name cannot exceed 120 characters.');
  } else if (!/[a-zA-Z0-9]/.test(trimmed)) {
    errors.push('Name must contain alphabetic characters.');
  }

  const forbiddenRegex = /[^a-zA-Z0-9\s.,&'/\-()]/;
  if (forbiddenRegex.test(trimmed)) {
    errors.push('Name contains unsupported symbols. Only letters, numbers, spaces, and . , & \' - / ( ) are allowed.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
