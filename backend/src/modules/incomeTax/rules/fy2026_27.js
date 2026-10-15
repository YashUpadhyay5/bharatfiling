/**
 * BharatFiling - Income Tax Rules for FY 2026-27 (AY 2027-28)
 * Forecasted provisions reflecting the updated direct tax code and transition rules.
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
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 700000, rate: 0.05 },
    { min: 700000, max: 1000000, rate: 0.1 },
    { min: 1000000, max: 1200000, rate: 0.15 },
    { min: 1200000, max: 1500000, rate: 0.2 },
    { min: 1500000, max: Infinity, rate: 0.3 },
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
      maxTaxableIncome: 700000,
      maxRebate: 25000,
      hasMarginalRelief: true,
      marginalReliefThreshold: 700000,
      marginalReliefCutoff: 727777,
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
