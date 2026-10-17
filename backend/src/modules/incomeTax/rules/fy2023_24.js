/**
 * BharatFiling - Income Tax Rules for FY 2023-24 (AY 2024-25)
 * Reflects provisions introduced by the Finance Act, 2023.
 */

export const FY_2023_24 = {
  financialYear: '2023-24',
  assessmentYear: '2024-25',
  label: 'FY 2023-24 (AY 2024-25)',

  // Standard deduction for salaried / pensioners
  standardDeduction: {
    newRegime: 50000,
    oldRegime: 50000,
  },

  familyPensionDeduction: {
    newRegime: { maxLimit: 15000, fraction: 1 / 3 },
    oldRegime: { maxLimit: 15000, fraction: 1 / 3 },
  },

  // New Tax Regime Slabs (Section 115BAC for AY 2024-25)
  newRegimeSlabs: [
    { min: 0, max: 300000, rate: 0, label: 'Up to ₹3,00,000' },
    { min: 300000, max: 600000, rate: 0.05, label: '₹3,00,001 to ₹6,00,000' },
    { min: 600000, max: 900000, rate: 0.1, label: '₹6,00,001 to ₹9,00,000' },
    { min: 900000, max: 1200000, rate: 0.15, label: '₹9,00,001 to ₹12,00,000' },
    { min: 1200000, max: 1500000, rate: 0.2, label: '₹12,00,001 to ₹15,00,000' },
    { min: 1500000, max: Infinity, rate: 0.3, label: 'Above ₹15,00,000' },
  ],

  // Old Tax Regime Slabs by Age Group
  oldRegimeSlabs: {
    individual: [
      { min: 0, max: 250000, rate: 0, label: 'Up to ₹2,50,000' },
      { min: 250000, max: 500000, rate: 0.05, label: '₹2,50,001 to ₹5,00,000' },
      { min: 500000, max: 1000000, rate: 0.2, label: '₹5,00,001 to ₹10,00,000' },
      { min: 1000000, max: Infinity, rate: 0.3, label: 'Above ₹10,00,000' },
    ],
    senior: [
      { min: 0, max: 300000, rate: 0, label: 'Up to ₹3,00,000' },
      { min: 300000, max: 500000, rate: 0.05, label: '₹3,00,001 to ₹5,00,000' },
      { min: 500000, max: 1000000, rate: 0.2, label: '₹5,00,001 to ₹10,00,000' },
      { min: 1000000, max: Infinity, rate: 0.3, label: 'Above ₹10,00,000' },
    ],
    superSenior: [
      { min: 0, max: 500000, rate: 0, label: 'Up to ₹5,00,000' },
      { min: 500000, max: 1000000, rate: 0.2, label: '₹5,00,001 to ₹10,00,000' },
      { min: 1000000, max: Infinity, rate: 0.3, label: 'Above ₹10,00,000' },
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
      { threshold: 50000000, rateOld: 0.37, rateNew: 0.25 },
    ],
  },

  // Capital Gains Rates (Pre-July 23, 2024 rates)
  capitalGains: {
    stcg111A: 0.15,
    ltcg112A: {
      rate: 0.10,
      exemptionLimit: 100000,
    },
    ltcg112: 0.20,
    winnings115BB: 0.3,
  },

  // Health and Education Cess
  cessRate: 0.04,
};

export default FY_2023_24;
