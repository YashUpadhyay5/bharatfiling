/**
 * BharatFiling - Comprehensive Name Search & Risk Assessment Orchestrator
 * Combines MCA Corporate Registry, IP India Trademark, and Companies Act Statutory Naming Rules.
 */

import { evaluateNamingRules } from './namingRules.service.js';
import { searchMcaRegistry } from '../providers/mca.provider.js';
import { searchTrademarkRegistry } from '../providers/trademark.provider.js';
import { generateAlternativeSuggestions } from './nameSuggestion.service.js';
import { normalizeName, stripEntitySuffixes, extractDistinctiveWords } from './nameSimilarity.service.js';

export async function runComprehensiveNameCheck({
  proposedName = '',
  entityType = 'private_limited',
  industry = 'general',
  searchOptions = { checkMca: true, checkTrademark: true, checkRules: true, generateSuggestions: true },
}) {
  const timestamp = new Date().toISOString();
  const trimmedName = proposedName.trim();
  const normalized = normalizeName(trimmedName);
  const stripped = stripEntitySuffixes(trimmedName);
  const distinctiveWord = extractDistinctiveWords(trimmedName);

  // 1. Run statutory naming rules evaluator
  const rulesResult = searchOptions.checkRules !== false
    ? evaluateNamingRules(trimmedName, entityType)
    : { warnings: [], clearances: [], hasCriticalWarnings: false, hasHighWarnings: false };

  // 2. Run MCA search
  const mcaResult = searchOptions.checkMca !== false
    ? await searchMcaRegistry(trimmedName)
    : { provider: 'MCA Registry', status: 'SKIPPED', exactMatches: [], similarMatches: [] };

  // 3. Run Trademark search
  const tmResult = searchOptions.checkTrademark !== false
    ? await searchTrademarkRegistry(trimmedName, industry)
    : { provider: 'IP India Trademark', status: 'SKIPPED', exactConflicts: [], similarConflicts: [], recommendedClasses: [] };

  // 4. Calculate Risk Category and Approval Probability
  let overallRisk = 'LOW';
  let riskScore = 15; // lower means safer
  let probabilityRating = 'GOOD';
  let summaryHeadline = 'Preliminary Screen Indicates Good Name Viability';
  let summaryDescription =
    'No direct exact conflicts were found in our corporate registry or trademark benchmark search, and statutory naming rules are broadly satisfied.';

  const hasEmblemsViolation = rulesResult.warnings?.some((w) => w.code === 'EMBLEMS_ACT_VIOLATION');
  const hasInvalidCorpSuffix = rulesResult.warnings?.some((w) => w.code === 'INVALID_CORPORATE_SUFFIX');
  const hasExactMca = mcaResult.exactMatches && mcaResult.exactMatches.length > 0;
  const hasExactTm = tmResult.exactConflicts && tmResult.exactConflicts.length > 0;
  const highestMcaScore = mcaResult.similarMatches?.[0]?.similarityScore || 0;
  const highestTmScore = tmResult.similarConflicts?.[0]?.similarityScore || 0;
  const hasRegulatoryWord = rulesResult.warnings?.some((w) => w.code === 'REGULATORY_APPROVAL_REQUIRED');
  const lacksDistinctiveness = rulesResult.warnings?.some((w) => w.code === 'LACKS_DISTINCTIVENESS');

  if (hasEmblemsViolation || hasInvalidCorpSuffix) {
    overallRisk = 'CRITICAL';
    riskScore = 95;
    probabilityRating = 'VERY_UNLIKELY';
    summaryHeadline = 'High Probability of Statutory Rejection Under Indian Law';
    summaryDescription = hasEmblemsViolation
      ? 'The proposed name contains a prohibited word under the Emblems and Names Act, 1950. MCA CRC will reject without prior Central Government approval.'
      : 'Unincorporated entities (Partnership / Proprietorship) cannot adopt corporate suffixes like "Private Limited" or "LLP".';
  } else if (hasExactMca || hasExactTm) {
    overallRisk = 'HIGH';
    riskScore = 85;
    probabilityRating = 'UNLIKELY';
    summaryHeadline = 'Direct Conflict Found With Existing Registered Entity or Trademark';
    summaryDescription = hasExactMca
      ? `A company or LLP with an identical name already exists in the MCA corporate records. Rule 8(1) strictly prohibits identical names.`
      : `An identical or virtually indistinguishable trademark is already registered under the IP India Trademark Registry.`;
  } else if (highestMcaScore >= 75 || highestTmScore >= 80) {
    overallRisk = 'HIGH';
    riskScore = 70;
    probabilityRating = 'RISKY';
    summaryHeadline = 'Substantial Phonetic or Visual Similarity Detected';
    summaryDescription = `The proposed name closely resembles existing entities or registered marks (Similarity score ${Math.max(highestMcaScore, highestTmScore)}%). CRC officers may issue a resubmission query under Rule 8A.`;
  } else if (highestMcaScore >= 60 || highestTmScore >= 60 || hasRegulatoryWord || lacksDistinctiveness) {
    overallRisk = 'MEDIUM';
    riskScore = 45;
    probabilityRating = 'MODERATE';
    summaryHeadline = 'Moderate Similarity or Conditional Regulatory Clearance Required';
    summaryDescription = hasRegulatoryWord
      ? 'The name includes words reserved for regulated industries (e.g., Bank, Insurance, Finance). Requires in-principle approval or NOC from sectoral regulators (RBI/SEBI/IRDAI).'
      : lacksDistinctiveness
      ? 'The name appears descriptive or generic. Adding a coined prefix or distinctive trademark word improves approval probability.'
      : 'Moderate phonetic overlap detected with existing records. Review similar marks before submitting RUN / SPICe+ Part A.';
  } else {
    overallRisk = 'LOW';
    riskScore = 15;
    probabilityRating = 'HIGH_VIABILITY';
    summaryHeadline = 'Favorable Preliminary Availability Screen';
    summaryDescription =
      'No identical matches or high-risk similarities were detected against the corporate registry and trademark benchmarks. Proceed with official MCA RUN / SPICe+ Part A reservation.';
  }

  // 5. Generate Alternatives
  const suggestions = searchOptions.generateSuggestions !== false
    ? generateAlternativeSuggestions(trimmedName, entityType, industry)
    : [];

  return {
    query: {
      proposedName: trimmedName,
      normalizedName: normalized,
      strippedName: stripped,
      distinctiveWord,
      entityType,
      industry,
      timestamp,
    },
    assessment: {
      overallRisk, // 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
      riskScore, // 0 - 100
      probabilityRating, // 'HIGH_VIABILITY' | 'MODERATE' | 'RISKY' | 'UNLIKELY' | 'VERY_UNLIKELY'
      summaryHeadline,
      summaryDescription,
      distinctiveWordIdentified: distinctiveWord,
    },
    rulesCheck: rulesResult,
    mcaSearch: mcaResult,
    trademarkSearch: tmResult,
    alternativeSuggestions: suggestions,
    officialVerificationLinks: {
      mcaCheckUrl: 'https://www.mca.gov.in/mcafoportal/showCheckCompanyName.do',
      mcaPortalUrl: 'https://www.mca.gov.in/',
      ipIndiaSearchUrl: 'https://tmrsearch.ipindia.gov.in/tmrpublicsearch/',
      ipIndiaPortalUrl: 'https://www.ipindia.gov.in/',
    },
    disclaimer:
      'IMPORTANT LEGAL NOTICE: This search is a preliminary computerized screening tool based on statutory heuristic algorithms, benchmark company registries, and Nice Classification mappings. It does not constitute a guaranteed name reservation or legal advice. Final name approval rests solely with the Registrar of Companies (ROC), Central Registration Centre (CRC), Ministry of Corporate Affairs (MCA), and Trade Marks Registry (CGPDTM), Government of India.',
  };
}
