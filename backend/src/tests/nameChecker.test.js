/**
 * BharatFiling - Comprehensive Business & Firm Name Checker Test Suite
 * Tests Name Normalization, Similarity Algorithms, Naming Rules (Rule 8, Emblems Act),
 * Trademark Mappings, Input Validation, and Alternative Name Generation.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { validateNameCheckRequest } from '../modules/nameChecker/validators/nameChecker.validator.js';
import {
  normalizeName,
  stripEntitySuffixes,
  computeNameSimilarity,
  extractDistinctiveWords,
} from '../modules/nameChecker/services/nameSimilarity.service.js';
import { evaluateNamingRules } from '../modules/nameChecker/services/namingRules.service.js';
import { generateAlternativeSuggestions } from '../modules/nameChecker/services/nameSuggestion.service.js';
import { runComprehensiveNameCheck } from '../modules/nameChecker/services/nameSearch.service.js';

describe('Firm Name Checker - Input Validation', () => {
  test('Rejects empty or blank name', () => {
    const res1 = validateNameCheckRequest({ proposedName: '' });
    assert.equal(res1.isValid, false);
    assert.match(res1.errors[0], /required/i);

    const res2 = validateNameCheckRequest({ proposedName: '   ' });
    assert.equal(res2.isValid, false);
  });

  test('Rejects name shorter than 2 characters', () => {
    const res = validateNameCheckRequest({ proposedName: 'A' });
    assert.equal(res.isValid, false);
    assert.match(res.errors[0], /at least 2 characters/i);
  });

  test('Rejects unsupported special characters or code injection symbols', () => {
    const res = validateNameCheckRequest({ proposedName: 'Apex <script>alert(1)</script>' });
    assert.equal(res.isValid, false);
    assert.match(res.errors[0], /unsupported characters/i);
  });

  test('Accepts valid company name with standard business punctuation', () => {
    const res = validateNameCheckRequest({
      proposedName: 'Astra & Sons Infotech (India) Pvt. Ltd.',
      entityType: 'private_limited',
      industry: 'technology',
    });
    assert.equal(res.isValid, true);
    assert.equal(res.sanitized.proposedName, 'Astra & Sons Infotech (India) Pvt. Ltd.');
    assert.equal(res.sanitized.entityType, 'private_limited');
    assert.equal(res.sanitized.industry, 'technology');
  });
});

describe('Firm Name Checker - Normalization & Suffix Stripping', () => {
  test('Strips multiple corporate suffixes properly', () => {
    assert.equal(stripEntitySuffixes('Bharat Technologies Private Limited'), 'bharat technologies');
    assert.equal(stripEntitySuffixes('Bharat Technologies Pvt Ltd'), 'bharat technologies');
    assert.equal(stripEntitySuffixes('Bharat Technologies Pvt. Ltd.'), 'bharat technologies');
    assert.equal(stripEntitySuffixes('Bharat Innovations LLP'), 'bharat innovations');
    assert.equal(stripEntitySuffixes('Tata Consultancy Services Limited'), 'tata consultancy services');
  });

  test('Extracts distinctive first word accurately', () => {
    assert.equal(extractDistinctiveWords('Vyom Tech Labs Private Limited'), 'vyom');
    assert.equal(extractDistinctiveWords('Kavach Solutions Limited'), 'kavach');
  });
});

describe('Firm Name Checker - Similarity Algorithms', () => {
  test('Exact normalized match gives 100% score', () => {
    const sim = computeNameSimilarity('Bharat Tech Solutions', 'Bharat Tech Solutions');
    assert.equal(sim.score, 100);
    assert.equal(sim.isExact, true);
  });

  test('Suffix difference still yields exact base match', () => {
    const sim = computeNameSimilarity(
      'Bharat Technologies Private Limited',
      'Bharat Technologies Limited'
    );
    assert.equal(sim.score, 100);
    assert.equal(sim.isExact, true);
  });

  test('Phonetic and typo variation yields high similarity', () => {
    const sim = computeNameSimilarity('Zomato Media', 'Zomatto Media');
    assert.ok(sim.score >= 80, `Expected similarity >= 80, got ${sim.score}`);
  });
});

describe('Firm Name Checker - Statutory Naming Rules (Companies Act Rule 8 & Emblems Act)', () => {
  test('Detects Emblems and Names Act prohibited words (e.g. National, Governor)', () => {
    const rules = evaluateNamingRules('National Software Technologies Private Limited', 'private_limited');
    assert.equal(rules.hasCriticalWarnings, true);
    const emblemsWarning = rules.warnings.find((w) => w.code === 'EMBLEMS_ACT_VIOLATION');
    assert.ok(emblemsWarning, 'Expected Emblems Act violation warning');
    assert.match(emblemsWarning.legalReference, /Emblems and Names Act/i);
  });

  test('Detects Sectoral Regulatory triggers requiring RBI/SEBI/IRDAI approval', () => {
    const rules = evaluateNamingRules('Apex Payment Bank Private Limited', 'private_limited');
    const regWarning = rules.warnings.find((w) => w.code === 'REGULATORY_APPROVAL_REQUIRED');
    assert.ok(regWarning, 'Expected regulatory approval warning');
    assert.equal(regWarning.authority, 'Reserve Bank of India (RBI)');
  });

  test('Detects corporate suffix misuse on unincorporated Partnership / Proprietorship', () => {
    const rules = evaluateNamingRules('Sharma & Associates Private Limited', 'proprietorship');
    assert.equal(rules.hasCriticalWarnings, true);
    const suffixWarning = rules.warnings.find((w) => w.code === 'INVALID_CORPORATE_SUFFIX');
    assert.ok(suffixWarning, 'Expected invalid corporate suffix warning for proprietorship');
  });

  test('Detects purely generic name lacking distinctive coined word', () => {
    const rules = evaluateNamingRules('Software Solutions India Private Limited', 'private_limited');
    const genericWarning = rules.warnings.find((w) => w.code === 'LACKS_DISTINCTIVENESS');
    assert.ok(genericWarning, 'Expected lacks distinctiveness warning');
  });
});

describe('Firm Name Checker - Alternative Suggestions & Comprehensive Check', () => {
  test('Generates creative, compliant alternatives with correct suffix', () => {
    const suggestions = generateAlternativeSuggestions('Bharat Tech', 'private_limited', 'technology');
    assert.ok(suggestions.length >= 3);
    for (const sug of suggestions) {
      assert.match(sug.name, /Private Limited$/i);
      assert.ok(sug.strategy);
      assert.ok(sug.rationale);
    }
  });

  test('Comprehensive check flags exact existing corporate match with HIGH or CRITICAL risk', async () => {
    const result = await runComprehensiveNameCheck({
      proposedName: 'Bharat Technologies Private Limited',
      entityType: 'private_limited',
      industry: 'technology',
    });
    assert.equal(result.assessment.overallRisk, 'HIGH');
    assert.ok(result.mcaSearch.exactMatches.length > 0);
    assert.ok(result.assessment.summaryHeadline);
    assert.match(result.disclaimer, /PRELIMINARY/i);
  });

  test('Comprehensive check gives favorable rating for unique coined name', async () => {
    const result = await runComprehensiveNameCheck({
      proposedName: 'Vyomkavach Innovations Private Limited',
      entityType: 'private_limited',
      industry: 'technology',
    });
    assert.equal(result.assessment.overallRisk, 'LOW');
    assert.equal(result.assessment.probabilityRating, 'HIGH_VIABILITY');
    assert.ok(result.assessment.riskScore < 30);
  });

  test('Accurately matches major Indian brands (Adani, Tata, HDFC, Zomato)', async () => {
    const adaniCheck = await runComprehensiveNameCheck({
      proposedName: 'Adani Enterprises Limited',
      entityType: 'public_limited',
    });
    assert.equal(adaniCheck.assessment.overallRisk, 'HIGH');
    assert.ok(adaniCheck.mcaSearch.exactMatches.length > 0);
    assert.equal(adaniCheck.mcaSearch.exactMatches[0].roc, 'Ahmedabad');

    const hdfcCheck = await runComprehensiveNameCheck({
      proposedName: 'HDFC Bank Limited',
      entityType: 'public_limited',
    });
    assert.equal(hdfcCheck.assessment.overallRisk, 'HIGH');
    assert.ok(hdfcCheck.mcaSearch.exactMatches.length > 0);
  });
});
