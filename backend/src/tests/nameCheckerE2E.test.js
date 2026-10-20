/**
 * BharatFiling - End-to-End Firm & Company Name Checker Verification Test Suite
 * Tests real-world queries across Conglomerates, Startups, Unicorns, CIN Lookups,
 * Unique Available Coined Names, Autocomplete, Trademarks & Statutory Rules.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { runComprehensiveNameCheck } from '../modules/nameChecker/services/nameSearch.service.js';
import { searchMcaAutocomplete, BENCHMARK_COMPANY_REGISTRY } from '../modules/nameChecker/providers/mca.provider.js';
import { searchTrademarkRegistry } from '../modules/nameChecker/providers/trademark.provider.js';

describe('E2E Real-World Indian Company Name Checks', () => {
  test('1. Check "Tata Motors" - flags exact corporate match, ROC Mumbai, and Trademark', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Tata Motors Limited',
      entityType: 'public_limited',
      industry: 'manufacturing',
    });

    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.equal(res.assessment.probabilityRating, 'UNLIKELY');
    assert.ok(res.mcaSearch.exactMatches.length > 0, 'Should find exact match for Tata Motors');
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Mumbai');
    assert.equal(res.mcaSearch.exactMatches[0].state, 'Maharashtra');
    assert.equal(res.mcaSearch.exactMatches[0].status, 'Active');
    assert.equal(res.mcaSearch.exactMatches[0].identifier, 'L28920MH1945PLC004520');
  });

  test('2. Check "Reliance Industries" - flags exact corporate match and Trademark in Class 35', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Reliance Industries Limited',
      entityType: 'public_limited',
      industry: 'ecommerce',
    });

    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].name, 'Reliance Industries Limited');
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Mumbai');
    assert.equal(res.mcaSearch.exactMatches[0].identifier, 'L17110MH1973PLC019786');
  });

  test('3. Check "Adani Enterprises" - flags exact corporate match, ROC Ahmedabad', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Adani Enterprises Limited',
      entityType: 'public_limited',
      industry: 'general',
    });

    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].name, 'Adani Enterprises Limited');
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Ahmedabad');
    assert.equal(res.mcaSearch.exactMatches[0].state, 'Gujarat');
  });

  test('4. Check "Zomato" - flags exact corporate match, ROC Delhi and Class 43 Trademark', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Zomato Limited',
      entityType: 'public_limited',
      industry: 'food',
    });

    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Delhi');
    assert.ok(res.trademarkSearch.exactConflicts.length > 0);
    assert.equal(res.trademarkSearch.exactConflicts[0].mark.toUpperCase(), 'ZOMATO');
    assert.ok(res.trademarkSearch.exactConflicts.some((c) => c.classNumber === 43 || c.classNumber === 9));
  });

  test('5. Check "HDFC Bank" - flags exact match, Class 36 Trademark, and Banking regulatory trigger', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'HDFC Bank Limited',
      entityType: 'public_limited',
      industry: 'finance',
    });

    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Mumbai');
    // Check regulatory approval trigger
    const bankWarning = res.rulesCheck.warnings.find((w) => w.code === 'REGULATORY_APPROVAL_REQUIRED');
    assert.ok(bankWarning, 'Should warn about RBI approval requirement for Banking');
    assert.equal(bankWarning.authority, 'Reserve Bank of India (RBI)');
  });

  test('6. Check "Swiggy" - flags exact corporate match, ROC Bangalore', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Swiggy Limited',
      entityType: 'public_limited',
      industry: 'food',
    });

    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Bangalore');
  });

  test('7. Check "Mahindra & Mahindra" - flags exact corporate match, ROC Mumbai', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Mahindra & Mahindra Limited',
      entityType: 'public_limited',
      industry: 'manufacturing',
    });

    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Mumbai');
  });

  test('8. Check "Kavach Security" - flags registered company and cybersecurity trademark', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Kavach Security Technologies Private Limited',
      entityType: 'private_limited',
      industry: 'technology',
    });

    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Delhi');
    assert.ok(res.trademarkSearch.exactConflicts.length > 0);
  });

  test('9. Check by exact CIN "L22210MH1995PLC084781" (TCS) - resolves exact company master record', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'L22210MH1995PLC084781',
      entityType: 'public_limited',
    });

    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].name, 'Tata Consultancy Services Limited');
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Mumbai');
    assert.equal(res.mcaSearch.exactMatches[0].matchType, 'EXACT_CIN');
  });

  test('10. Check unique, coined, available name - returns AVAILABLE (High Viability, 90%+ Likelihood)', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Zynova Quantum Robotics Private Limited',
      entityType: 'private_limited',
      industry: 'technology',
    });

    assert.equal(res.assessment.overallRisk, 'LOW');
    assert.equal(res.assessment.probabilityRating, 'HIGH_VIABILITY');
    assert.ok(res.assessment.riskScore <= 20);
    assert.equal(res.mcaSearch.exactMatches.length, 0);
    assert.equal(res.trademarkSearch.exactConflicts.length, 0);
    assert.ok(res.alternativeSuggestions.length >= 3);
  });
});

describe('E2E Live Autocomplete Search (IndiaFilings & Vakilsearch Style)', () => {
  test('Autocomplete "tat" - returns Tata group companies', async () => {
    const results = await searchMcaAutocomplete('tat', 5);
    assert.ok(results.length >= 3);
    assert.ok(results.some((r) => r.name.toLowerCase().includes('tata')));
    assert.ok(results[0].identifier, 'Should have CIN');
    assert.ok(results[0].roc, 'Should have ROC');
    assert.ok(results[0].state, 'Should have State');
  });

  test('Autocomplete "ada" - returns Adani entities', async () => {
    const results = await searchMcaAutocomplete('ada', 5);
    assert.ok(results.length >= 2);
    assert.ok(results.some((r) => r.name.toLowerCase().includes('adani')));
  });

  test('Autocomplete "reli" - returns Reliance entities', async () => {
    const results = await searchMcaAutocomplete('reli', 5);
    assert.ok(results.length >= 2);
    assert.ok(results.some((r) => r.name.toLowerCase().includes('reliance')));
  });

  test('Autocomplete "zom" - returns Zomato', async () => {
    const results = await searchMcaAutocomplete('zom', 5);
    assert.ok(results.length >= 1);
    assert.ok(results[0].name.toLowerCase().includes('zomato'));
    assert.equal(results[0].roc, 'Delhi');
  });

  test('Autocomplete "hdfc" - returns HDFC entities', async () => {
    const results = await searchMcaAutocomplete('hdfc', 5);
    assert.ok(results.length >= 2);
    assert.ok(results.some((r) => r.name.toLowerCase().includes('hdfc')));
  });

  test('Autocomplete "kav" - returns Kavach entities', async () => {
    const results = await searchMcaAutocomplete('kav', 5);
    assert.ok(results.length >= 2);
    assert.ok(results.some((r) => r.name.toLowerCase().includes('kavach')));
  });
});

describe('E2E Statutory Rule 8 & Emblems Act Enforcement', () => {
  test('Flags Emblems Act Prohibited Word "National"', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'National Technologies Private Limited',
      entityType: 'private_limited',
    });
    assert.equal(res.assessment.overallRisk, 'CRITICAL');
    const emblem = res.rulesCheck.warnings.find((w) => w.code === 'EMBLEMS_ACT_VIOLATION');
    assert.ok(emblem);
  });

  test('Flags SEBI Regulated Word "Mutual Fund"', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Zenith Mutual Fund Advisory Private Limited',
      entityType: 'private_limited',
      industry: 'finance',
    });
    const sebi = res.rulesCheck.warnings.find((w) => w.code === 'REGULATORY_APPROVAL_REQUIRED');
    assert.ok(sebi);
    assert.equal(sebi.authority, 'Securities and Exchange Board of India (SEBI)');
  });

  test('Flags invalid corporate suffix on Sole Proprietorship', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Mehta Traders Private Limited',
      entityType: 'proprietorship',
    });
    assert.equal(res.assessment.overallRisk, 'CRITICAL');
    const suffix = res.rulesCheck.warnings.find((w) => w.code === 'INVALID_CORPORATE_SUFFIX');
    assert.ok(suffix);
  });
});

describe('E2E Regional, Less-Popular & Arbitrary Indian Corporate Checks', () => {
  test('11. Check less-popular "Surya Electricals" - flags exact ROC Mumbai match', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Surya Electricals Private Limited',
      entityType: 'private_limited',
      industry: 'manufacturing',
    });
    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.ok(res.mcaSearch.exactMatches[0].name.toLowerCase().includes('surya electricals'));
    assert.ok(res.mcaSearch.exactMatches[0].roc, 'Must include ROC');
    assert.ok(res.mcaSearch.exactMatches[0].state, 'Must include state');
    assert.ok(res.mcaSearch.exactMatches[0].identifier, 'Must include CIN');
  });

  test('12. Check less-popular "Kishan Dairy" - flags exact ROC Ahmedabad match', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Kishan Dairy Private Limited',
      entityType: 'private_limited',
      industry: 'food',
    });
    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].name, 'Kishan Dairy Private Limited');
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Ahmedabad');
    assert.equal(res.mcaSearch.exactMatches[0].state, 'Gujarat');
    assert.equal(res.mcaSearch.exactMatches[0].identifier, 'U15201GJ2015PTC083421');
  });

  test('13. Check less-popular "Sharma Timber Works" - flags exact ROC Delhi match', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Sharma Timber Works Private Limited',
      entityType: 'private_limited',
      industry: 'manufacturing',
    });
    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].name, 'Sharma Timber Works Private Limited');
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Delhi');
    assert.equal(res.mcaSearch.exactMatches[0].identifier, 'U20211DL2014PTC268412');
  });

  test('14. Check less-popular "Balaji Agro Seeds" - flags exact ROC Hyderabad match', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Balaji Agro Seeds Private Limited',
      entityType: 'private_limited',
      industry: 'general',
    });
    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].name, 'Balaji Agro Seeds Private Limited');
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Hyderabad');
    assert.equal(res.mcaSearch.exactMatches[0].identifier, 'U01119TG2011PTC073918');
  });

  test('15. Check less-popular "Vardhman Ispat" - flags exact ROC Chandigarh match', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Vardhman Ispat Udyog Limited',
      entityType: 'public_limited',
      industry: 'manufacturing',
    });
    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Chandigarh');
  });

  test('16. Check less-popular "Kuber Metal Industries" - flags exact ROC Jaipur LLP match', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'Kuber Metal Industries LLP',
      entityType: 'llp',
    });
    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Jaipur');
    assert.equal(res.mcaSearch.exactMatches[0].identifier, 'AAA-8841');
  });

  test('17. Check arbitrary unindexed valid CIN "U15400RJ2016PTC051234" - dynamically decodes ROC Jaipur & State', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'U15400RJ2016PTC051234',
      entityType: 'private_limited',
    });
    assert.equal(res.assessment.overallRisk, 'HIGH');
    assert.ok(res.mcaSearch.exactMatches.length > 0);
    assert.equal(res.mcaSearch.exactMatches[0].roc, 'Jaipur');
    assert.equal(res.mcaSearch.exactMatches[0].state, 'Rajasthan');
    assert.equal(res.mcaSearch.exactMatches[0].classType, 'Private Limited');
    assert.equal(res.mcaSearch.exactMatches[0].incYear, 2016);
    assert.equal(res.mcaSearch.exactMatches[0].matchType, 'EXACT_CIN');
  });

  test('18. Autocomplete "surya" - returns regional Surya entities', async () => {
    const results = await searchMcaAutocomplete('surya', 5);
    assert.ok(results.length >= 1);
    assert.ok(results.some((r) => r.name.toLowerCase().includes('surya')));
  });

  test('19. Autocomplete "kishan" - returns regional Kishan entities', async () => {
    const results = await searchMcaAutocomplete('kishan', 5);
    assert.ok(results.length >= 1);
    assert.ok(results.some((r) => r.name.toLowerCase().includes('kishan')));
  });

  test('20. Check live Indian company "SJS Enterprises Limited" - flags conflict with real CIN & ROC', async () => {
    const res = await runComprehensiveNameCheck({
      proposedName: 'SJS Enterprises Limited',
      entityType: 'public_limited',
    });

    assert.ok(res.assessment.overallRisk === 'HIGH' || res.assessment.overallRisk === 'CRITICAL');
    assert.ok(res.mcaSearch.exactMatches.length > 0 || res.mcaSearch.similarMatches.length > 0);
    const allMatches = [...res.mcaSearch.exactMatches, ...res.mcaSearch.similarMatches];
    const sjs = allMatches.find((m) => m.name.toLowerCase().replace(/[\.\s-]/g, '').includes('sjsenterprises'));
    assert.ok(sjs, 'Must locate SJS Enterprises in live MCA database');
    assert.ok(sjs.identifier, 'Must provide real CIN');
    assert.ok(sjs.roc, 'Must provide real ROC');
  });

  test('21. Autocomplete "SJS Enterprises" - returns real live Indian companies', async () => {
    const results = await searchMcaAutocomplete('SJS Enterprises', 5);
    assert.ok(results.length >= 2);
    assert.ok(results.some((r) => r.name.toLowerCase().includes('sjs') || r.name.toLowerCase().includes('s.j.s.')));
    assert.ok(results[0].identifier, 'Should have real CIN');
    assert.ok(results[0].roc, 'Should have real ROC');
  });
});
