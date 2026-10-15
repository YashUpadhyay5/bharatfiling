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
});
