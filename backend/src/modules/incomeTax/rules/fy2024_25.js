/**
 * BharatFiling - Income Tax Rules for FY 2024-25 (AY 2025-26)
 * Reflects amendments by the Finance (No. 2) Act, 2024.
 */

export const FY_2024_25 = {
  financialYear: '2024-25',
  assessmentYear: '2025-26',
  label: 'FY 2024-25 (AY 2025-26)',

  // Standard deduction for salaried / pensioners
  standardDeduction: {
    newRegime: 75000, // Enhanced to ₹75,000 by Finance (No. 2) Act, 2024
    oldRegime: 50000,
  },

  familyPensionDeduction: {
    newRegime: { maxLimit: 25000, fraction: 1 / 3 },
    oldRegime: { maxLimit: 15000, fraction: 1 / 3 },
  },

  // New Tax Regime Slabs (Section 115BAC)
  newRegimeSlabs: [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 700000, rate: 0.05 },
    { min: 700000, max: 1000000, rate: 0.1 },
    { min: 1000000, max: 1200000, rate: 0.15 },
    { min: 1200000, max: 1500000, rate: 0.2 },
    { min: 1500000, max: Infinity, rate: 0.3 },
  ],

  // Old Tax Regime Slabs by Age Group
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

  // Section 87A Rebate
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

  // Surcharge Rates
  surcharge: {
    tiers: [
      { threshold: 5000000, rate: 0.1 },
      { threshold: 10000000, rate: 0.15 },
      { threshold: 20000000, rate: 0.25 },
      { threshold: 50000000, rateOld: 0.37, rateNew: 0.25 }, // Capped at 25% under New Regime
    ],
  },

  // Capital Gains Rates (Post-July 23, 2024 revised rates)
  capitalGains: {
    stcg111A: 0.2, // Revised from 15% to 20%
    ltcg112A: {
      rate: 0.125, // Revised from 10% to 12.5%
      exemptionLimit: 125000, // Increased from 1 Lakh to 1.25 Lakh
    },
    ltcg112: 0.125,
    winnings115BB: 0.3,
  },

  // Health and Education Cess
  cessRate: 0.04,
};

export default FY_2024_25;
