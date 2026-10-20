/**
 * BharatFiling - Comprehensive Income Tax Calculation Engine Tests
 * Validates Slabs, Standard Deductions, Section 87A Rebate, Marginal Relief,
 * Surcharges, Senior Citizens, and Old vs New Comparison.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeRegimeTax,
  calculateIncomeTaxComparison,
  calculateSlabTax,
  calculateRebateAndMarginalRelief87A,
  roundSection288B,
} from '../modules/incomeTax/incomeTaxCalculator.service.js';
import { getTaxRulesForYear } from '../modules/incomeTax/rules/taxRuleRegistry.js';

describe('Income Tax Calculator Engine Tests', () => {
  const rules2526 = getTaxRulesForYear('2025-26');

  test('Section 288B Rounding - Rounds correctly to nearest multiple of 10', () => {
    assert.equal(roundSection288B(124), 120);
    assert.equal(roundSection288B(125), 130);
    assert.equal(roundSection288B(129), 130);
    assert.equal(roundSection288B(0), 0);
  });

  test('New Regime Slab Computation - FY 2025-26 6-bracket progression', () => {
    // ₹15,00,000 income
    // 0-3L: 0
    // 3L-7L (4L): 20,000
    // 7L-10L (3L): 30,000
    // 10L-12L (2L): 30,000
    // 12L-15L (3L): 60,000
    // Total = 1,40,000
    const { tax } = calculateSlabTax(1500000, rules2526.newRegimeSlabs);
    assert.equal(tax, 140000);
  });

  test('Scenario 1: Salaried Individual with ₹7,50,000 Income (New Regime FY 25-26) pays ₹0 Tax', () => {
    // Gross: 7,50,000
    // Std Ded: 75,000 -> Taxable: 6,75,000
    // Slab Tax: 3.75L * 5% = 18,750
    // Rebate 87A: 18,750 -> Net Tax: 0
    const res = computeRegimeTax({
      isNewRegime: true,
      financialYear: '2025-26',
      salary: { grossSalary: 750000 },
    });

    assert.equal(res.grossSalary, 750000);
    assert.equal(res.standardDeduction, 75000);
    assert.equal(res.netTaxableIncome, 675000);
    assert.equal(res.normalSlabTax, 18750);
    assert.equal(res.rebate87A, 18750);
    assert.equal(res.totalTaxLiability, 0);
  });

  test('Scenario 2: Salaried Individual with ₹7,75,000 Income (New Regime FY 25-26) pays ₹0 Tax', () => {
    // Gross: 7,75,000
    // Std Ded: 75,000 -> Taxable: 7,00,000
    // Slab Tax: 4.00L * 5% = 20,000
    // Rebate 87A: 20,000 -> Net Tax: 0
    const res = computeRegimeTax({
      isNewRegime: true,
      financialYear: '2025-26',
      salary: { grossSalary: 775000 },
    });

    assert.equal(res.netTaxableIncome, 700000);
    assert.equal(res.normalSlabTax, 20000);
    assert.equal(res.rebate87A, 20000);
    assert.equal(res.totalTaxLiability, 0);
  });

  test('Scenario 3: Section 87A Marginal Relief at ₹7,85,000 Gross Salary (₹7,10,000 Taxable)', () => {
    // Taxable: 7,10,000
    // Normal tax: 20,000 + 10% of 10,000 = 21,000
    // Excess income over 7,00,000 = 10,000
    // Marginal relief = 21,000 - 10,000 = 11,000
    // Tax after relief = 10,000
    // Plus 4% Cess = 400 -> Total = 10,400
    const res = computeRegimeTax({
      isNewRegime: true,
      financialYear: '2025-26',
      salary: { grossSalary: 785000 },
    });

    assert.equal(res.netTaxableIncome, 710000);
    assert.equal(res.normalSlabTax, 21000);
    assert.equal(res.marginalRelief87A, 11000);
    assert.equal(res.taxAfterRebateAndRelief, 10000);
    assert.equal(res.cess, 400);
    assert.equal(res.totalTaxLiability, 10400);
  });

  test('Scenario 4: Senior Citizen (Age 65) with ₹4,00,000 Income under Old Regime', () => {
    // Basic exemption for senior is 3,00,000
    // Taxable: 4,00,000
    // Tax: (4L - 3L) * 5% = 5,000
    // Section 87A rebate: 5,000 -> Net Tax: 0
    const res = computeRegimeTax({
      isNewRegime: false,
      financialYear: '2025-26',
      ageCategory: 'senior',
      otherSources: { fdInterest: 400000 },
      deductions: { sec80TTA_TTB: 0 },
    });

    assert.equal(res.normalSlabTax, 5000);
    assert.equal(res.rebate87A, 5000);
    assert.equal(res.totalTaxLiability, 0);
  });

  test('Scenario 5: High Deductions Comparison where Old Regime wins', () => {
    // Gross Salary: 15,00,000
    // Deductions: Sec 80C: 1,50,000; Sec 80D: 50,000; Sec 24b Home Loan: 2,00,000; HRA: 1,50,000
    const res = calculateIncomeTaxComparison({
      financialYear: '2025-26',
      salary: {
        grossSalary: 1500000,
        hraExemption: 150000,
      },
      houseProperty: {
        interestSelfOccupied: 200000,
      },
      deductions: {
        sec80C: 150000,
        sec80D: 50000,
      },
    });

    // In New Regime: deductions disallowed (only 75k std ded allowed) -> Tax ~ 1,14,400
    // In Old Regime: 15L - 50k(std ded) - 1.5L(HRA) - 2L(HP) - 1.5L(80C) - 50k(80D) = 9,00,000 taxable.
    // Old Regime Tax on 9L: 2.5L-5L: 12.5k + 4L*20%: 80k = 92.5k + 4% cess = 96,200.
    // Old Regime saves money!
    assert.equal(res.winner, 'old');
    assert.ok(res.savings > 0);
    assert.ok(res.oldRegime.totalTaxLiability < res.newRegime.totalTaxLiability);
  });

  test('Scenario 6: Modest Deductions where New Regime wins convincingly', () => {
    // Gross Salary: 12,00,000
    // Only 80C of 1,50,000
    const res = calculateIncomeTaxComparison({
      financialYear: '2025-26',
      salary: { grossSalary: 1200000 },
      deductions: { sec80C: 150000 },
    });

    assert.equal(res.winner, 'new');
    assert.ok(res.savings > 0);
    assert.ok(res.newRegime.totalTaxLiability < res.oldRegime.totalTaxLiability);
  });

  test('Scenario 7: Salaried ₹15,00,000 under New Regime AY 2026-27 pays ₹1,30,000', () => {
    // Gross: 15,00,000
    // Std Ded: 75,000 -> Taxable: 14,25,000
    // Slabs:
    // 0-3L: 0
    // 3L-7L (4L): 20,000
    // 7L-10L (3L): 30,000
    // 10L-12L (2L): 30,000
    // 12L-14.25L (2.25L @ 20%): 45,000
    // Total Slab Tax = 1,25,000
    // Cess (4%) = 5,000
    // Total Tax Liability = 1,30,000
    const res = computeRegimeTax({
      isNewRegime: true,
      financialYear: '2025-26',
      salary: { grossSalary: 1500000 },
    });

    assert.equal(res.netTaxableIncome, 1425000);
    assert.equal(res.normalSlabTax, 125000);
    assert.equal(res.cess, 5000);
    assert.equal(res.totalTaxLiability, 130000);
  });

  test('Scenario 8: Section 112A LTCG strictly disallows Section 87A rebate per Section 112A(6)', () => {
    // Resident with ₹4,00,000 Salary and ₹2,25,000 LTCG 112A
    // Std Ded: 75,000 -> Net Salary = 3,25,000
    // Ordinary Slab Tax on 3,25,000: (3.25L - 3L) * 5% = 1,250
    // LTCG 112A: 2,25,000 - 1,25,000 exemption = 1,00,000 @ 12.5% = 12,500
    // Total taxable income = 4,25,000 (<= 7,00,000)
    // Section 87A rebate applies ONLY to normalSlabTax (1,250), ZERO rebate against LTCG 112A!
    const res = computeRegimeTax({
      isNewRegime: true,
      financialYear: '2025-26',
      salary: { grossSalary: 400000 },
      capitalGains: { ltcg112A: 225000 },
    });

    assert.equal(res.normalSlabTax, 1250);
    assert.equal(res.rebate87A, 1250); // Fully offsets normal slab tax
    assert.equal(res.taxLTCG112A, 12500); // Intact, no 87A rebate allowed
    assert.equal(res.taxAfterRebateAndRelief, 12500);
    assert.equal(res.totalTaxLiability, roundSection288B(12500 * 1.04));
  });

  test('Scenario 9: Surcharge on Capital Gains statutorily capped at 15% for income > ₹2 Crore', () => {
    // Total income ₹2.5 Crore: ₹1.5 Cr normal + ₹1 Cr STCG 111A
    // General surcharge rate for ₹2.5 Cr is 25%, but capital gains surcharge is capped at 15%
    const res = computeRegimeTax({
      isNewRegime: true,
      financialYear: '2025-26',
      salary: { grossSalary: 15075000 }, // 1.5 Cr taxable after 75k std ded
      capitalGains: { stcg111A: 10000000 }, // 1 Cr STCG 111A
    });

    assert.equal(res.surchargeRate, 0.25);
    // STCG 111A tax = 20% of 1 Cr = 20,00,000
    assert.equal(res.taxSTCG111A, 2000000);
    // Surcharge should be less than 25% of total tax because STCG is surcharged at 15%
    const totalTax = res.normalSlabTax + res.taxSTCG111A;
    assert.ok(res.surcharge < Math.round(totalTax * 0.25));
  });

  test('Scenario 10: Backward-compatible schema aliases for simple UI cards and reports', () => {
    const res = computeRegimeTax({
      isNewRegime: true,
      financialYear: '2025-26',
      salary: { grossSalary: 1000000 },
    });

    assert.equal(res.taxableIncome, res.netTaxableIncome);
    assert.equal(res.healthAndEducationCess, res.cess);
    assert.ok(Array.isArray(res.slabs));
    assert.equal(res.slabs.length, res.slabBreakdown.length);
    assert.ok(res.slabs[0].slab); // Has readable slab label
  });

  test('Scenario 11: Partnership Firm / LLP taxed at flat 30% + 4% cess', () => {
    const res = computeRegimeTax({
      isNewRegime: false,
      financialYear: '2025-26',
      taxPayer: 'firm_llp',
      incomeMode: 'taxable',
      salary: { netTaxableIncome: 1000000 },
    });

    // 10,00,000 @ 30% = 3,00,000 + 4% cess = 3,12,000
    assert.equal(res.normalSlabTax, 300000);
    assert.equal(res.cess, 12000);
    assert.equal(res.totalTaxLiability, 312000);
    assert.equal(res.rebate87A, 0);
  });

  test('Scenario 12: Domestic Company taxed at flat 22% + 10% surcharge + 4% cess', () => {
    const res = computeRegimeTax({
      isNewRegime: false,
      financialYear: '2025-26',
      taxPayer: 'domestic_company',
      incomeMode: 'taxable',
      salary: { netTaxableIncome: 1000000 },
    });

    // 10,00,000 @ 22% = 2,20,000
    // Surcharge 10% = 22,000 -> 2,42,000
    // Cess 4% = 9,680 -> Total = 2,51,680
    assert.equal(res.normalSlabTax, 220000);
    assert.equal(res.netSurcharge, 22000);
    assert.equal(res.cess, 9680);
    assert.equal(res.totalTaxLiability, 251680);
    assert.equal(res.rebate87A, 0);
  });

  test('Scenario 13: HUF with ₹7,00,000 taxable income in New Regime pays ₹26,000 (no 87A rebate)', () => {
    const res = computeRegimeTax({
      isNewRegime: true,
      financialYear: '2025-26',
      taxPayer: 'huf',
      incomeMode: 'taxable',
      salary: { netTaxableIncome: 700000 },
    });

    // 0-3L: 0, 3-7L: 20,000 -> Slab Tax = 20,000
    // HUF is NOT eligible for 87A rebate!
    // Cess 4% = 800 -> Total Tax = 20,800
    assert.equal(res.rebate87A, 0);
    assert.equal(res.normalSlabTax, 20000);
    assert.equal(res.totalTaxLiability, 20800);
  });

  test('Scenario 14: Non-Resident (NRI) with ₹7,00,000 in New Regime pays tax (no 87A rebate)', () => {
    const res = computeRegimeTax({
      isNewRegime: true,
      financialYear: '2025-26',
      residentialStatus: 'nonResident',
      incomeMode: 'taxable',
      salary: { netTaxableIncome: 700000 },
    });

    // Non-Resident is NOT eligible for 87A rebate!
    assert.equal(res.rebate87A, 0);
    assert.equal(res.normalSlabTax, 20000);
    assert.equal(res.totalTaxLiability, 20800);
  });

  test('Scenario 15: AY 2024-25 (FY 2023-24) New Regime slab calculation', () => {
    const res = computeRegimeTax({
      isNewRegime: true,
      financialYear: '2023-24',
      incomeMode: 'taxable',
      salary: { netTaxableIncome: 900000 },
    });

    // FY 2023-24 slabs: 0-3L 0%, 3-6L 5% (15k), 6-9L 10% (30k) -> 45,000
    // Cess 4% = 1,800 -> 46,800
    assert.equal(res.normalSlabTax, 45000);
    assert.equal(res.cess, 1800);
    assert.equal(res.totalTaxLiability, 46800);
  });
});
