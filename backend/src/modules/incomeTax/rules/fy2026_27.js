/**
 * BharatFiling - Income Tax Rules for FY 2026-27 (AY 2027-28)
 * Budget 2026 left the new regime slabs and the ₹60,000 rebate (up to ₹12L) unchanged from FY 2025-26.
 * The Income-tax Act, 2025 applies from 1 April 2026; rates and slabs are carried over.
 */

export const FY_2026_27 = {
  financialYear: '2026-27',
  assessmentYear: '2027-28',
  label: 'FY 2026-27 (AY 2027-28)',

  standardDeduction: {
    newRegime: 75000,
    oldRegime: 50000,
  },

  familyPensionDeduction: {
    newRegime: { maxLimit: 25000, fraction: 1 / 3 },
    oldRegime: { maxLimit: 15000, fraction: 1 / 3 },
  },

  newRegimeSlabs: [
    { min: 0, max: 400000, rate: 0 },
    { min: 400000, max: 800000, rate: 0.05 },
    { min: 800000, max: 1200000, rate: 0.1 },
    { min: 1200000, max: 1600000, rate: 0.15 },
    { min: 1600000, max: 2000000, rate: 0.2 },
    { min: 2000000, max: 2400000, rate: 0.25 },
    { min: 2400000, max: Infinity, rate: 0.3 },
  ],

  oldRegimeSlabs: {
    individual: [
      { min: 0, max: 250000, rate: 0 },
      { min: 250000, max: 500000, rate: 0.05 },
      { min: 500000, max: 1000000, rate: 0.2 },
      { min: 1000000, max: Infinity, rate: 0.3 },
    ],
    senior: [
      { min: 0, max: 300000, rate: 0 },
      { min: 300000, max: 500000, rate: 0.05 },
      { min: 500000, max: 1000000, rate: 0.2 },
      { min: 1000000, max: Infinity, rate: 0.3 },
    ],
    superSenior: [
      { min: 0, max: 500000, rate: 0 },
      { min: 500000, max: 1000000, rate: 0.2 },
      { min: 1000000, max: Infinity, rate: 0.3 },
    ],
  },

  rebate87A: {
    newRegime: {
      maxTaxableIncome: 1200000,
      maxRebate: 60000,
      hasMarginalRelief: true,
      marginalReliefThreshold: 1200000,
      marginalReliefCutoff: 1270588, // 12,00,000 + 60,000 / 0.85 - relief is nil beyond this income
    },
    oldRegime: {
      maxTaxableIncome: 500000,
      maxRebate: 12500,
      hasMarginalRelief: false,
    },
  },

  surcharge: {
    tiers: [
      { threshold: 5000000, rate: 0.1 },
      { threshold: 10000000, rate: 0.15 },
      { threshold: 20000000, rate: 0.25 },
      { threshold: 50000000, rateOld: 0.37, rateNew: 0.25 },
    ],
  },

  capitalGains: {
    stcg111A: 0.2,
    ltcg112A: {
      rate: 0.125,
      exemptionLimit: 125000,
    },
    ltcg112: 0.125,
    winnings115BB: 0.3,
  },

  cessRate: 0.04,
};

export default FY_2026_27;
