/**
 * BharatFiling - MCA & Trademark Compliant Name Suggestion Engine
 * Generates viable, legally sound alternatives when a proposed business name faces conflicts.
 */

import { extractDistinctiveWords, stripEntitySuffixes } from './nameSimilarity.service.js';
import { MANDATORY_ENTITY_SUFFIXES, PROHIBITED_EMBLEMS_WORDS } from '../config/namingRules.js';

// Creative coined and aspirational prefixes suitable for Indian companies
const COINED_PREFIXES = [
  'Nex',
  'Vyom',
  'Avinya',
  'Kavach',
  'Zenith',
  'Aura',
  'Veda',
  'Pragati',
  'Samarth',
  'Aethel',
  'Tridha',
  'Astra',
  'Daksha',
  'Aadya',
];

// Industry descriptive connectors
const INDUSTRY_DESCRIPTORS = {
  technology: ['Infotech', 'Cloud Systems', 'Tech Labs', 'Digital Innovations', 'Cyber Systems', 'Software Labs'],
  ecommerce: ['Ventures', 'Digital Commerce', 'Retail Network', 'Marketplace Solutions', 'Trade Connect'],
  finance: ['Finserve', 'Capital Advisors', 'Wealth Solutions', 'Fintech Dynamics', 'Financial Advisory'],
  healthcare: ['Healthtech', 'Life Sciences', 'Biotech Solutions', 'Wellness Labs', 'Meditech Systems'],
  food: ['Agro Foods', 'Hospitality Ventures', 'Culinary Creations', 'Consumer Foods', 'Beverages Network'],
  manufacturing: ['Engineering Works', 'Industrial Dynamics', 'Machinery Solutions', 'Fabritech', 'Precision Works'],
  consulting: ['Advisory Services', 'Management Partners', 'Business Consulting', 'Strategy Works', 'Global Advisors'],
  education: ['Edutech Solutions', 'Learning Systems', 'Knowledge Works', 'Skill Academy', 'Edusphere'],
  realestate: ['Realty Spaces', 'Infrastructure Projects', 'Buildtech', 'Properties & Estates', 'Urban Developers'],
  logistics: ['Supply Chain', 'Express Logistics', 'Freight Network', 'Cargo Solutions', 'Transit Hub'],
  general: ['Enterprises', 'Ventures', 'Innovations', 'Global Network', 'Commercial Works', 'Solutions'],
};

export function generateAlternativeSuggestions(proposedName = '', entityType = 'private_limited', industry = 'general') {
  const stripped = stripEntitySuffixes(proposedName);
  const distinctive = extractDistinctiveWords(proposedName) || stripped.split(' ')[0] || 'Bharat';
  const entityConfig = MANDATORY_ENTITY_SUFFIXES[entityType] || MANDATORY_ENTITY_SUFFIXES.private_limited;
  const canonicalSuffix = entityConfig.canonicalSuffix ? ` ${entityConfig.canonicalSuffix}` : '';

  const industryKeywords = INDUSTRY_DESCRIPTORS[industry] || INDUSTRY_DESCRIPTORS.general;
  const suggestions = [];

  // Strategy 1: Coined Prefix + Original Distinctive Name + Industry Keyword
  for (let i = 0; i < 2; i++) {
    const prefix = COINED_PREFIXES[i % COINED_PREFIXES.length];
    const descriptor = industryKeywords[i % industryKeywords.length];
    suggestions.push({
      name: `${prefix} ${distinctive} ${descriptor}${canonicalSuffix}`.replace(/\s+/g, ' ').trim(),
      strategy: 'Coined Prefix Addition',
      rationale: `Adds unique coined word "${prefix}" to satisfy MCA Rule 8(2)(b) distinctiveness test.`,
    });
  }

  // Strategy 2: Distinctive Root + Modern Sanskrit/Coined Hybrid
  const coinedSanskrit = COINED_PREFIXES[(distinctive.length + 2) % COINED_PREFIXES.length];
  suggestions.push({
    name: `${distinctive} ${coinedSanskrit} ${industryKeywords[2 % industryKeywords.length]}${canonicalSuffix}`.replace(/\s+/g, ' ').trim(),
    strategy: 'Hybrid Coined Distinctiveness',
    rationale: `Pairing "${distinctive}" with distinctive identifier "${coinedSanskrit}" creates strong trademark defensibility.`,
  });

  // Strategy 3: Industry Specific Expansion
  suggestions.push({
    name: `${distinctive} ${industryKeywords[3 % industryKeywords.length]}${canonicalSuffix}`.replace(/\s+/g, ' ').trim(),
    strategy: 'Activity Alignment',
    rationale: `Pairs distinctive base with clear statutory main business activity description.`,
  });

  // Strategy 4: Coined Suffix Modifiers (e.g., -ix, -sys, -ora)
  const modifiedRoot = distinctive.endsWith('s') ? distinctive.slice(0, -1) : distinctive;
  suggestions.push({
    name: `${modifiedRoot}ora ${industryKeywords[4 % industryKeywords.length]}${canonicalSuffix}`.replace(/\s+/g, ' ').trim(),
    strategy: 'Coined Root Mutation',
    rationale: `Converts root word into invented coined mark "${modifiedRoot}ora" with minimal trademark overlap risk.`,
  });

  // Filter out any accidental prohibited words
  const filtered = suggestions.filter((sug) => {
    const lower = sug.name.toLowerCase();
    return !PROHIBITED_EMBLEMS_WORDS.some((p) => new RegExp(`\\b${p}\\b`, 'i').test(lower));
  });

  return filtered.slice(0, 5);
}
