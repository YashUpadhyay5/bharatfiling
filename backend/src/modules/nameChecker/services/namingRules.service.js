/**
 * BharatFiling - MCA Naming Rules Evaluator
 * Validates Rule 8, Emblems Act, Suffix requirements, and Regulatory clearances.
 */

import {
  PROHIBITED_EMBLEMS_WORDS,
  REGULATORY_APPROVAL_WORDS,
  CAPITAL_CRITERIA_WORDS,
  MANDATORY_ENTITY_SUFFIXES,
  COMMON_GENERIC_WORDS,
} from '../config/namingRules.js';
import { normalizeName, stripEntitySuffixes, extractDistinctiveWords } from './nameSimilarity.service.js';

export function evaluateNamingRules(proposedName = '', entityType = 'private_limited') {
  const warnings = [];
  const clearances = [];
  const normalized = normalizeName(proposedName);
  const stripped = stripEntitySuffixes(proposedName);
  const words = normalized.split(' ').filter(Boolean);

  const entityConfig = MANDATORY_ENTITY_SUFFIXES[entityType] || MANDATORY_ENTITY_SUFFIXES.private_limited;

  // 1. Emblems & Names (Prevention of Improper Use) Act, 1950
  for (const prohibited of PROHIBITED_EMBLEMS_WORDS) {
    const regex = new RegExp(`\\b${prohibited}\\b`, 'i');
    if (regex.test(normalized)) {
      warnings.push({
        code: 'EMBLEMS_ACT_VIOLATION',
        severity: 'CRITICAL',
        title: `Prohibited Word: "${prohibited.toUpperCase()}"`,
        message: `The word "${prohibited}" is restricted under the Emblems and Names (Prevention of Improper Use) Act, 1950 and Rule 8(4). Prior Central Government approval is mandatory.`,
        legalReference: 'Emblems and Names Act, 1950 & Companies (Incorporation) Rules, 2014 Rule 8(4)',
      });
    }
  }

  // 2. Regulatory Authority Approvals (RBI, SEBI, IRDAI, BCI)
  for (const reg of REGULATORY_APPROVAL_WORDS) {
    for (const word of reg.words) {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(normalized)) {
        warnings.push({
          code: 'REGULATORY_APPROVAL_REQUIRED',
          severity: 'HIGH',
          title: `Regulatory Approval Needed: "${word.toUpperCase()}"`,
          message: `${reg.reason} An in-principle approval or NOC from ${reg.authority} must be submitted with MCA Form SPICe+ Part A / RUN.`,
          authority: reg.authority,
          legalReference: 'Companies Act, 2013 Section 4(2) & Rule 8(5)',
        });
        break;
      }
    }
  }

  // 3. Minimum Authorized Capital Requirements
  for (const cap of CAPITAL_CRITERIA_WORDS) {
    const regex = new RegExp(`\\b${cap.word}\\b`, 'i');
    if (regex.test(normalized)) {
      warnings.push({
        code: 'CAPITAL_CRITERIA_WARNING',
        severity: 'MEDIUM',
        title: `Capital / Operational Scale Trigger: "${cap.word.toUpperCase()}"`,
        message: `${cap.note} If incorporated with nominal authorized capital (e.g., ₹1 Lakh), MCA CRC officers may raise an objection.`,
        legalReference: 'MCA Name Reservation Guidelines & CRC Scrutiny Manual',
      });
    }
  }

  // 4. Purely Generic / Descriptive Name Objection
  const distinctive = extractDistinctiveWords(proposedName);
  if (!distinctive || distinctive.trim().length <= 1) {
    warnings.push({
      code: 'LACKS_DISTINCTIVENESS',
      severity: 'HIGH',
      title: 'Name Lacks Distinctiveness',
      message:
        'The proposed name consists solely of generic industry descriptors without any distinctive or coined prefix (e.g. "Software Technologies Private Limited"). Rule 8(2)(b) requires a unique coined or distinctive first word.',
      legalReference: 'Companies (Incorporation) Rules, 2014 Rule 8(2)(b)',
    });
  } else {
    clearances.push({
      code: 'DISTINCTIVE_WORD_FOUND',
      title: 'Distinctive Coined Prefix Detected',
      message: `Identified distinctive identifier: "${distinctive}". This satisfies the MCA requirement for a coined/distinguishing primary word.`,
    });
  }

  // 5. Entity Suffix Validation
  if (entityConfig.mcaGoverned && entityConfig.validSuffixes.length > 0) {
    const hasValidSuffix = entityConfig.validSuffixes.some((s) => {
      const regex = new RegExp(`\\b${s.replace('.', '\\.')}\\b$`, 'i');
      return regex.test(normalized);
    });

    if (!hasValidSuffix && entityType !== 'section_8') {
      warnings.push({
        code: 'SUFFIX_ADVISORY',
        severity: 'INFO',
        title: `Suggested Suffix: "${entityConfig.canonicalSuffix}"`,
        message: `For a ${entityConfig.fullName}, the formal incorporation application (SPICe+ Part A) will automatically append "${entityConfig.canonicalSuffix}".`,
        legalReference: entityConfig.rule,
      });
    }
  } else if (!entityConfig.mcaGoverned) {
    // Check if user accidentally entered Pvt Ltd for partnership/proprietorship
    const corporateSuffixRegex = /\b(private limited|pvt ltd|pvt\. ltd\.|limited|ltd|llp)\b/i;
    if (corporateSuffixRegex.test(normalized)) {
      warnings.push({
        code: 'INVALID_CORPORATE_SUFFIX',
        severity: 'CRITICAL',
        title: 'Corporate Suffix Not Allowed For Unincorporated Entity',
        message: `A ${entityConfig.fullName} cannot use suffixes like "Private Limited" or "LLP" as it is not an incorporated corporate entity registered with the MCA.`,
        legalReference: 'Indian Partnership Act, 1932 / Business Trade Names Law',
      });
    }
  }

  return {
    warnings,
    clearances,
    hasCriticalWarnings: warnings.some((w) => w.severity === 'CRITICAL'),
    hasHighWarnings: warnings.some((w) => w.severity === 'HIGH'),
    distinctiveWord: distinctive,
    entityType,
    entityFullName: entityConfig.fullName,
  };
}
