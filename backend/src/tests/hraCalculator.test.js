/**
 * BharatFiling - Comprehensive HRA Calculator Test Suite
 * Tests Rule 2A, Section 10(13A), Gestetner salary rules, multi-period revisions, and New Regime restrictions.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { computeHraExemption, calculateHraForPeriod, isMetroCity } from '../services/hraCalculator.service.js';

describe('HRA Calculation Engine - Unit & Formula Tests', () => {

  test('Metro City Identification - Only Delhi, Mumbai, Kolkata, Chennai qualify for 50%', () => {
    assert.equal(isMetroCity('Delhi'), true);
    assert.equal(isMetroCity('New Delhi'), true);
    assert.equal(isMetroCity('Mumbai'), true);
    assert.equal(isMetroCity('Kolkata'), true);
    assert.equal(isMetroCity('Chennai'), true);
    // Non-metro in Indian Income Tax law
    assert.equal(isMetroCity('Bengaluru'), false);
    assert.equal(isMetroCity('Bangalore'), false);
    assert.equal(isMetroCity('Hyderabad'), false);
    assert.equal(isMetroCity('Pune'), false);
    assert.equal(isMetroCity('Gurugram'), false);
    assert.equal(isMetroCity('Noida'), false);
  });

  test('Scenario 1: Limit B is lowest (Rent - 10% of salary)', () => {
    // Basic: 50,000/mo, HRA: 20,000/mo, Rent: 18,000/mo, Non-Metro (40%)
    // Salary = 6,00,000
    // Limit A: 2,40,000
    // Limit B: 2,16,000 - 60,000 = 1,56,000 (LOWEST)
    // Limit C: 40% of 6,00,000 = 2,40,000
    const res = computeHraExemption({
      taxRegime: 'old',
      calculationMode: 'simple',
      simpleInput: {
        basicSalary: 50000,
        hraReceived: 20000,
        rentPaid: 18000,
        isMetro: false,
        tenureMonths: 12,
        frequency: 'monthly',
      },
    });

    assert.equal(res.summary.totalEligibleSalary, 600000);
    assert.equal(res.summary.totalHraReceived, 240000);
    assert.equal(res.summary.totalRentPaid, 216000);
    assert.equal(res.summary.totalLimitA, 240000);
    assert.equal(res.summary.totalLimitB, 156000);
    assert.equal(res.summary.totalLimitC, 240000);
    assert.equal(res.summary.totalExemptHra, 156000);
    assert.equal(res.summary.totalTaxableHra, 84000);
    assert.match(res.summary.limitingFactor, /Limit B/);
  });

  test('Scenario 2: Limit A is lowest (Actual HRA received)', () => {
    // Basic: 1,00,000/mo, HRA: 10,000/mo, Rent: 40,000/mo, Metro (Mumbai: 50%)
    // Salary = 12,00,000
    // Limit A: 1,20,000 (LOWEST)
    // Limit B: 4,80,000 - 1,20,000 = 3,60,000
    // Limit C: 50% of 12,00,000 = 6,00,000
    const res = computeHraExemption({
      taxRegime: 'old',
      calculationMode: 'simple',
      simpleInput: {
        basicSalary: 100000,
        hraReceived: 10000,
        rentPaid: 40000,
        isMetro: true,
        tenureMonths: 12,
        frequency: 'monthly',
      },
    });

    assert.equal(res.summary.totalLimitA, 120000);
    assert.equal(res.summary.totalExemptHra, 120000);
    assert.equal(res.summary.totalTaxableHra, 0); // 100% exempt
    assert.match(res.summary.limitingFactor, /Limit A/);
  });

  test('Scenario 3: Limit C is lowest (50% Metro Salary ceiling)', () => {
    // Basic: 20,000/mo, HRA: 25,000/mo, Rent: 30,000/mo, Metro (Delhi: 50%)
    // Salary = 2,40,000
    // Limit A: 3,00,000
    // Limit B: 3,60,000 - 24,000 = 3,36,000
    // Limit C: 50% of 2,40,000 = 1,20,000 (LOWEST)
    const res = computeHraExemption({
      taxRegime: 'old',
      calculationMode: 'simple',
      simpleInput: {
        basicSalary: 20000,
        hraReceived: 25000,
        rentPaid: 30000,
        isMetro: true,
        tenureMonths: 12,
        frequency: 'monthly',
      },
    });

    assert.equal(res.summary.totalLimitC, 120000);
    assert.equal(res.summary.totalExemptHra, 120000);
    assert.equal(res.summary.totalTaxableHra, 180000);
    assert.match(res.summary.limitingFactor, /Limit C/);
  });

  test('Scenario 4: Rent <= 10% of eligible salary results in ₹0 exemption', () => {
    // Basic: 1,00,000/mo, Rent: 8,000/mo (8% of salary)
    // 10% salary = 10,000/mo -> Rent - 10% salary <= 0 -> Limit B = 0
    const res = computeHraExemption({
      taxRegime: 'old',
      calculationMode: 'simple',
      simpleInput: {
        basicSalary: 100000,
        hraReceived: 30000,
        rentPaid: 8000,
        isMetro: false,
        tenureMonths: 12,
        frequency: 'monthly',
      },
    });

    assert.equal(res.summary.totalLimitB, 0);
    assert.equal(res.summary.totalExemptHra, 0);
    assert.equal(res.summary.totalTaxableHra, 360000); // 100% taxable
    assert.ok(res.calculationWarnings.some((w) => w.includes('equal to or less than 10%')));
  });

  test('Scenario 5: New Tax Regime (Section 115BAC) grants ZERO exemption', () => {
    const res = computeHraExemption({
      taxRegime: 'new',
      calculationMode: 'simple',
      simpleInput: {
        basicSalary: 80000,
        hraReceived: 35000,
        rentPaid: 25000,
        isMetro: true,
        tenureMonths: 12,
      },
    });

    assert.equal(res.taxRegime, 'new');
    assert.equal(res.summary.totalExemptHra, 0);
    assert.equal(res.summary.totalTaxableHra, 420000);
    assert.ok(res.calculationWarnings.some((w) => w.includes('NOT available under the New Tax Regime')));
  });

  test('Scenario 6: DA forming part of retirement benefits vs DA not forming part', () => {
    // If DA forms retirement benefits, eligible salary increases
    const withoutDa = computeHraExemption({
      taxRegime: 'old',
      simpleInput: {
        basicSalary: 50000,
        da: 10000,
        daFormsRetirement: false,
        hraReceived: 20000,
        rentPaid: 20000,
        isMetro: false,
      },
    });

    const withDa = computeHraExemption({
      taxRegime: 'old',
      simpleInput: {
        basicSalary: 50000,
        da: 10000,
        daFormsRetirement: true,
        hraReceived: 20000,
        rentPaid: 20000,
        isMetro: false,
      },
    });

    assert.equal(withoutDa.summary.totalEligibleSalary, 600000);
    assert.equal(withDa.summary.totalEligibleSalary, 720000);
  });

  test('Scenario 7: Multi-period calculation with Mid-Year Salary Increment', () => {
    // Period 1: Apr-Sep (6 months) @ Basic 50k, Rent 15k, Non-Metro
    // Period 2: Oct-Mar (6 months) @ Basic 70k, Rent 15k, Non-Metro
    const res = computeHraExemption({
      taxRegime: 'old',
      calculationMode: 'advanced',
      periods: [
        {
          id: 'p1',
          periodLabel: 'Apr-Sep 2026',
          months: 6,
          basicSalary: 50000,
          hraReceived: 20000,
          rentPaid: 15000,
          isMetro: false,
        },
        {
          id: 'p2',
          periodLabel: 'Oct-Mar 2027',
          months: 6,
          basicSalary: 70000,
          hraReceived: 28000,
          rentPaid: 15000,
          isMetro: false,
        },
      ],
    });

    assert.equal(res.breakdown.length, 2);
    // Period 1:
    // Salary = 3,00,000. Rent = 90,000. 10% = 30,000. Limit B = 60,000.
    assert.equal(res.breakdown[0].exemptHra, 60000);

    // Period 2:
    // Salary = 4,20,000. Rent = 90,000. 10% = 42,000. Limit B = 48,000.
    assert.equal(res.breakdown[1].exemptHra, 48000);

    // Total Exemption = 60,000 + 48,000 = 1,08,000
    assert.equal(res.summary.totalExemptHra, 108000);
  });

  test('Scenario 8: Annual rent > ₹1,00,000 warns about Landlord PAN requirement', () => {
    const res = computeHraExemption({
      taxRegime: 'old',
      simpleInput: {
        basicSalary: 80000,
        hraReceived: 30000,
        rentPaid: 15000, // Annual = 1,80,000 > 1,00,000
        isMetro: true,
      },
    });

    assert.ok(res.calculationWarnings.some((w) => w.includes('Form 12BB') || w.includes('landlord\'s PAN')));
  });

  test('Scenario 9: Monthly rent > ₹50,000 warns about Section 194-IB 2% TDS and Form 26QC', () => {
    const res = computeHraExemption({
      taxRegime: 'old',
      simpleInput: {
        basicSalary: 150000,
        hraReceived: 60000,
        rentPaid: 55000, // Monthly > 50,000
        isMetro: true,
      },
    });

    assert.equal(res.summary.requiresSection194IB, true);
    assert.equal(res.summary.monthlyTds194IB, 1100); // 2% of 55,000
    assert.equal(res.summary.annualTds194IB, 13200);
    assert.ok(res.calculationWarnings.some((w) => w.includes('Section 194-IB') && w.includes('Form 26QC')));
  });

  test('Scenario 10: Zero HRA with Rent Paid provides Section 80GG fallback deduction', () => {
    const res = computeHraExemption({
      taxRegime: 'old',
      simpleInput: {
        basicSalary: 60000,
        hraReceived: 0, // No HRA received
        rentPaid: 20000,
        isMetro: false,
      },
    });

    assert.equal(res.summary.totalExemptHra, 0);
    assert.ok(res.summary.section80GGEstimate);
    assert.equal(res.summary.section80GGEstimate.isEligible, true);
    // Max annual cap under 80GG is 60,000 (5,000/mo)
    assert.equal(res.summary.section80GGEstimate.annualDeduction, 60000);
    assert.equal(res.summary.section80GGEstimate.monthlyDeduction, 5000);
    assert.ok(res.calculationWarnings.some((w) => w.includes('Section 80GG')));
  });
});
