/**
 * BharatFiling - Client-Side Income Tax Calculation Engine
 * Instant reactive calculation for Old vs New Regime (Section 115BAC),
 * Section 87A Marginal Relief, Surcharges, and Deductions across Financial Years.
 */

export const SUPPORTED_FINANCIAL_YEARS = [
  { id: '2026-27', label: 'FY 2026-27 (AY 2027-28)', isLatest: true },
  { id: '2025-26', label: 'FY 2025-26 (AY 2026-27)', isCurrent: true },
  { id: '2024-25', label: 'FY 2024-25 (AY 2025-26)', isPrevious: true },
];

export const TAX_RULES_BY_YEAR = {
  '2026-27': {
    financialYear: '2026-27',
    assessmentYear: '2027-28',
    standardDeduction: { newRegime: 75000, oldRegime: 50000 },
    familyPensionDeduction: { newRegime: 25000, oldRegime: 15000 },
    newRegimeSlabs: [
      { min: 0, max: 300000, rate: 0, label: 'Up to ₹3,00,000' },
      { min: 300000, max: 700000, rate: 0.05, label: '₹3,00,001 to ₹7,00,000' },
      { min: 700000, max: 1000000, rate: 0.1, label: '₹7,00,001 to ₹10,00,000' },
      { min: 1000000, max: 1200000, rate: 0.15, label: '₹10,00,001 to ₹12,00,000' },
      { min: 1200000, max: 1500000, rate: 0.2, label: '₹12,00,001 to ₹15,00,000' },
      { min: 1500000, max: Infinity, rate: 0.3, label: 'Above ₹15,00,000' },
    ],
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
    rebate87A: {
      newRegime: { maxTaxableIncome: 700000, maxRebate: 25000, marginalReliefThreshold: 700000 },
      oldRegime: { maxTaxableIncome: 500000, maxRebate: 12500 },
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
      ltcg112A: { rate: 0.125, exemptionLimit: 125000 },
      ltcg112: 0.125,
      winnings115BB: 0.3,
    },
    cessRate: 0.04,
  },
  '2025-26': {
    financialYear: '2025-26',
    assessmentYear: '2026-27',
    standardDeduction: { newRegime: 75000, oldRegime: 50000 },
    familyPensionDeduction: { newRegime: 25000, oldRegime: 15000 },
    newRegimeSlabs: [
      { min: 0, max: 300000, rate: 0, label: 'Up to ₹3,00,000' },
      { min: 300000, max: 700000, rate: 0.05, label: '₹3,00,001 to ₹7,00,000' },
      { min: 700000, max: 1000000, rate: 0.1, label: '₹7,00,001 to ₹10,00,000' },
      { min: 1000000, max: 1200000, rate: 0.15, label: '₹10,00,001 to ₹12,00,000' },
      { min: 1200000, max: 1500000, rate: 0.2, label: '₹12,00,001 to ₹15,00,000' },
      { min: 1500000, max: Infinity, rate: 0.3, label: 'Above ₹15,00,000' },
    ],
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
    rebate87A: {
      newRegime: { maxTaxableIncome: 700000, maxRebate: 25000, marginalReliefThreshold: 700000 },
      oldRegime: { maxTaxableIncome: 500000, maxRebate: 12500 },
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
      ltcg112A: { rate: 0.125, exemptionLimit: 125000 },
      ltcg112: 0.125,
      winnings115BB: 0.3,
    },
    cessRate: 0.04,
  },
  '2024-25': {
    financialYear: '2024-25',
    assessmentYear: '2025-26',
    standardDeduction: { newRegime: 75000, oldRegime: 50000 },
    familyPensionDeduction: { newRegime: 25000, oldRegime: 15000 },
    newRegimeSlabs: [
      { min: 0, max: 300000, rate: 0, label: 'Up to ₹3,00,000' },
      { min: 300000, max: 700000, rate: 0.05, label: '₹3,00,001 to ₹7,00,000' },
      { min: 700000, max: 1000000, rate: 0.1, label: '₹7,00,001 to ₹10,00,000' },
      { min: 1000000, max: 1200000, rate: 0.15, label: '₹10,00,001 to ₹12,00,000' },
      { min: 1200000, max: 1500000, rate: 0.2, label: '₹12,00,001 to ₹15,00,000' },
      { min: 1500000, max: Infinity, rate: 0.3, label: 'Above ₹15,00,000' },
    ],
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
    rebate87A: {
      newRegime: { maxTaxableIncome: 700000, maxRebate: 25000, marginalReliefThreshold: 700000 },
      oldRegime: { maxTaxableIncome: 500000, maxRebate: 12500 },
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
      ltcg112A: { rate: 0.125, exemptionLimit: 125000 },
      ltcg112: 0.125,
      winnings115BB: 0.3,
    },
    cessRate: 0.04,
  },
};

export function formatIndianCurrency(amount) {
  const num = Math.round(Number(amount) || 0);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
}

export function roundSection288B(amount) {
  const num = Math.round(Number(amount) || 0);
  return Math.round(num / 10) * 10;
}

export function calculateSlabTax(income, slabs) {
  let tax = 0;
  const breakdown = [];
  const taxable = Math.max(0, Number(income) || 0);

  for (const slab of slabs) {
    if (taxable <= slab.min) {
      breakdown.push({
        min: slab.min,
        max: slab.max,
        rate: slab.rate,
        label: slab.label,
        taxableInSlab: 0,
        taxAmount: 0,
      });
      continue;
    }

    const chunk = Math.min(taxable, slab.max) - slab.min;
    const slabTax = chunk * slab.rate;
    tax += slabTax;

    breakdown.push({
      min: slab.min,
      max: slab.max,
      rate: slab.rate,
      label: slab.label,
      taxableInSlab: Math.round(chunk),
      taxAmount: Math.round(slabTax),
    });

    if (taxable <= slab.max) break;
  }

  return { tax: Math.round(tax), breakdown };
}

export function computeRegimeTax({
  isNewRegime,
  financialYear = '2025-26',
  ageCategory = 'individual',
  residentialStatus = 'resident',
  salary = {},
  houseProperty = {},
  capitalGains = {},
  businessProfession = {},
  otherSources = {},
  deductions = {},
  taxCredits = {},
}) {
  const fyKey = String(financialYear).trim().replace(/^FY\s*/i, '');
  const rules = TAX_RULES_BY_YEAR[fyKey] || TAX_RULES_BY_YEAR['2025-26'];
  const isResident = residentialStatus !== 'nonResident';

  // 1. SALARY HEAD COMPUTATION
  const grossSalary = Math.max(0, Number(salary.grossSalary) || 0);
  const standardDedLimit = isNewRegime ? rules.standardDeduction.newRegime : rules.standardDeduction.oldRegime;
  const standardDeduction = grossSalary > 0 ? Math.min(grossSalary, standardDedLimit) : 0;

  let hraExempt = 0;
  let ltaExempt = 0;
  let profTax = 0;
  let otherExempt = 0;

  if (!isNewRegime) {
    hraExempt = Math.min(grossSalary, Math.max(0, Number(salary.hraExemption) || 0));
    ltaExempt = Math.min(grossSalary, Math.max(0, Number(salary.ltaExemption) || 0));
    profTax = Math.min(grossSalary, Math.max(0, Number(salary.professionalTax) || 0));
    otherExempt = Math.min(grossSalary, Math.max(0, Number(salary.otherAllowancesExempt) || 0));
  }

  const familyPension = Math.max(0, Number(salary.familyPension) || 0);
  const fpLimit = isNewRegime ? rules.familyPensionDeduction.newRegime : rules.familyPensionDeduction.oldRegime;
  const familyPensionDeduction = familyPension > 0 ? Math.min(familyPension / 3, fpLimit) : 0;
  const netFamilyPension = Math.max(0, familyPension - familyPensionDeduction);

  const netSalary = Math.max(
    0,
    grossSalary - standardDeduction - hraExempt - ltaExempt - profTax - otherExempt + netFamilyPension
  );

  // 2. HOUSE PROPERTY
  const rentalIncome = Math.max(0, Number(houseProperty.rentalIncome) || 0);
  const municipalTaxes = Math.max(0, Number(houseProperty.municipalTaxes) || 0);
  const netAnnualValue = Math.max(0, rentalIncome - municipalTaxes);
  const stdDeduction30Percent = netAnnualValue * 0.3;
  const interestLetOut = Math.max(0, Number(houseProperty.interestLetOut) || 0);
  const incomeFromLetOut = netAnnualValue - stdDeduction30Percent - interestLetOut;

  let netHouseProperty = 0;
  let selfOccupiedInterest = Math.max(0, Number(houseProperty.interestSelfOccupied) || 0);

  if (isNewRegime) {
    netHouseProperty = Math.max(0, incomeFromLetOut);
    selfOccupiedInterest = 0;
  } else {
    const allowedSelfInterest = Math.min(200000, selfOccupiedInterest);
    const totalHP = incomeFromLetOut - allowedSelfInterest;
    netHouseProperty = totalHP < 0 ? Math.max(-200000, totalHP) : totalHP;
  }

  // 3. BUSINESS / PROFESSION
  const p44AD = Math.max(0, Number(businessProfession.presumptiveIncome44AD) || 0);
  const p44ADA = Math.max(0, Number(businessProfession.presumptiveIncome44ADA) || 0);
  const pNormal = Math.max(0, Number(businessProfession.businessProfitNormal) || 0);
  const netBusinessIncome = p44AD + p44ADA + pNormal;

  // 4. OTHER SOURCES
  const savingsInterest = Math.max(0, Number(otherSources.savingsInterest) || 0);
  const fdInterest = Math.max(0, Number(otherSources.fdInterest) || 0);
  const dividendIncome = Math.max(0, Number(otherSources.dividendIncome) || 0);
  const otherIncome = Math.max(0, Number(otherSources.otherIncome) || 0);
  const lotteryWinnings = Math.max(0, Number(otherSources.lotteryWinnings) || 0);
  const normalOtherSources = savingsInterest + fdInterest + dividendIncome + otherIncome;

  // 5. CAPITAL GAINS
  const stcg111A = Math.max(0, Number(capitalGains.stcg111A) || 0);
  const stcgOther = Math.max(0, Number(capitalGains.stcgOther) || 0);
  const ltcg112A = Math.max(0, Number(capitalGains.ltcg112A) || 0);
  const ltcgOther = Math.max(0, Number(capitalGains.ltcgOther) || 0);

  const specialRateTotal = stcg111A + ltcg112A + ltcgOther + lotteryWinnings;
  const ordinaryIncome = Math.max(
    0,
    netSalary + netHouseProperty + netBusinessIncome + normalOtherSources + stcgOther
  );
  const grossTotalIncome = ordinaryIncome + specialRateTotal;

  // 6. DEDUCTIONS UNDER CHAPTER VI-A
  let totalDeductions = 0;
  const deductionBreakdown = {};

  const employerNPS = Math.max(0, Number(deductions.sec80CCD2) || 0);
  deductionBreakdown.sec80CCD2 = employerNPS;
  totalDeductions += employerNPS;

  if (!isNewRegime) {
    const sec80C = Math.min(150000, Math.max(0, Number(deductions.sec80C) || 0));
    const sec80CCD1B = Math.min(50000, Math.max(0, Number(deductions.sec80CCD1B) || 0));
    const sec80D = Math.min(100000, Math.max(0, Number(deductions.sec80D) || 0));
    const sec80E = Math.max(0, Number(deductions.sec80E) || 0);
    const sec80G = Math.max(0, Number(deductions.sec80G) || 0);

    let sec80TTA_TTB = 0;
    if (ageCategory === 'senior' || ageCategory === 'superSenior') {
      const userVal = deductions.sec80TTA_TTB !== undefined && deductions.sec80TTA_TTB !== null
        ? Number(deductions.sec80TTA_TTB)
        : 50000;
      sec80TTA_TTB = Math.min(50000, savingsInterest + fdInterest, Math.max(0, userVal));
    } else {
      const userVal = deductions.sec80TTA_TTB !== undefined && deductions.sec80TTA_TTB !== null
        ? Number(deductions.sec80TTA_TTB)
        : 10000;
      sec80TTA_TTB = Math.min(10000, savingsInterest, Math.max(0, userVal));
    }

    const sec80U_DD = Math.max(0, Number(deductions.sec80U_DD) || 0);
    const otherChapter6 = Math.max(0, Number(deductions.otherDeductions) || 0);

    deductionBreakdown.sec80C = sec80C;
    deductionBreakdown.sec80CCD1B = sec80CCD1B;
    deductionBreakdown.sec80D = sec80D;
    deductionBreakdown.sec80E = sec80E;
    deductionBreakdown.sec80G = sec80G;
    deductionBreakdown.sec80TTA_TTB = sec80TTA_TTB;
    deductionBreakdown.sec80U_DD = sec80U_DD;
    deductionBreakdown.otherDeductions = otherChapter6;

    totalDeductions +=
      sec80C + sec80CCD1B + sec80D + sec80E + sec80G + sec80TTA_TTB + sec80U_DD + otherChapter6;
  }

  const allowableDeductions = Math.min(ordinaryIncome, totalDeductions);
  const netOrdinaryTaxable = Math.max(0, ordinaryIncome - allowableDeductions);
  const totalTaxableIncome = netOrdinaryTaxable + specialRateTotal;

  // 7. TAX COMPUTATION BY SLABS & SPECIAL RATES
  let slabs = rules.newRegimeSlabs;
  if (!isNewRegime) {
    if (ageCategory === 'superSenior') slabs = rules.oldRegimeSlabs.superSenior;
    else if (ageCategory === 'senior') slabs = rules.oldRegimeSlabs.senior;
    else slabs = rules.oldRegimeSlabs.individual;
  }

  const { tax: normalSlabTax, breakdown: slabBreakdown } = calculateSlabTax(netOrdinaryTaxable, slabs);

  const basicExemptionLimit = slabs[0].max;
  const unexhaustedExemption = isResident ? Math.max(0, basicExemptionLimit - netOrdinaryTaxable) : 0;
  let remainingUnexhausted = unexhaustedExemption;

  // STCG 111A
  let taxableSTCG111A = stcg111A;
  if (remainingUnexhausted > 0 && taxableSTCG111A > 0) {
    const offset = Math.min(taxableSTCG111A, remainingUnexhausted);
    taxableSTCG111A -= offset;
    remainingUnexhausted -= offset;
  }
  const taxSTCG111A = Math.round(taxableSTCG111A * rules.capitalGains.stcg111A);

  // LTCG 112A
  const ltcg112AExemption = rules.capitalGains.ltcg112A.exemptionLimit;
  let taxableLTCG112A = Math.max(0, ltcg112A - ltcg112AExemption);
  if (remainingUnexhausted > 0 && taxableLTCG112A > 0) {
    const offset = Math.min(taxableLTCG112A, remainingUnexhausted);
    taxableLTCG112A -= offset;
    remainingUnexhausted -= offset;
  }
  const taxLTCG112A = Math.round(taxableLTCG112A * rules.capitalGains.ltcg112A.rate);

  // LTCG 112
  let taxableLTCGOther = ltcgOther;
  if (remainingUnexhausted > 0 && taxableLTCGOther > 0) {
    const offset = Math.min(taxableLTCGOther, remainingUnexhausted);
    taxableLTCGOther -= offset;
    remainingUnexhausted -= offset;
  }
  const taxLTCGOther = Math.round(taxableLTCGOther * rules.capitalGains.ltcg112);

  const taxLottery = Math.round(lotteryWinnings * rules.capitalGains.winnings115BB);
  const specialGainsTax = taxSTCG111A + taxLTCG112A + taxLTCGOther + taxLottery;
  const totalTaxBeforeRebate = normalSlabTax + specialGainsTax;

  // 8. SECTION 87A REBATE & MARGINAL RELIEF
  let rebate87A = 0;
  let marginalRelief87A = 0;
  let taxAfterRebateAndRelief = totalTaxBeforeRebate;

  if (isResident && totalTaxBeforeRebate > 0) {
    if (isNewRegime) {
      const { maxTaxableIncome, maxRebate, marginalReliefThreshold } = rules.rebate87A.newRegime;
      if (totalTaxableIncome <= maxTaxableIncome) {
        rebate87A = Math.min(totalTaxBeforeRebate, maxRebate);
        taxAfterRebateAndRelief = Math.max(0, totalTaxBeforeRebate - rebate87A);
      } else {
        const excessIncome = totalTaxableIncome - marginalReliefThreshold;
        if (totalTaxBeforeRebate > excessIncome) {
          marginalRelief87A = totalTaxBeforeRebate - excessIncome;
          taxAfterRebateAndRelief = Math.max(0, excessIncome);
        }
      }
    } else {
      const { maxTaxableIncome, maxRebate } = rules.rebate87A.oldRegime;
      if (totalTaxableIncome <= maxTaxableIncome) {
        rebate87A = Math.min(totalTaxBeforeRebate, maxRebate);
        taxAfterRebateAndRelief = Math.max(0, totalTaxBeforeRebate - rebate87A);
      }
    }
  }

  // 9. SURCHARGE & MARGINAL RELIEF
  let surchargeRate = 0;
  let rawSurcharge = 0;
  let surchargeMarginalRelief = 0;
  let netSurcharge = 0;

  if (totalTaxableIncome > 5000000 && taxAfterRebateAndRelief > 0) {
    let threshold = 5000000;
    if (totalTaxableIncome > 50000000) {
      surchargeRate = isNewRegime ? 0.25 : 0.37;
      threshold = 50000000;
    } else if (totalTaxableIncome > 20000000) {
      surchargeRate = 0.25;
      threshold = 20000000;
    } else if (totalTaxableIncome > 10000000) {
      surchargeRate = 0.15;
      threshold = 10000000;
    } else {
      surchargeRate = 0.1;
      threshold = 5000000;
    }

    rawSurcharge = Math.round(taxAfterRebateAndRelief * surchargeRate);

    const taxAtThreshold = calculateSlabTax(threshold, slabs).tax;
    let prevSurchargeRate = 0;
    if (threshold === 10000000) prevSurchargeRate = 0.1;
    else if (threshold === 20000000) prevSurchargeRate = 0.15;
    else if (threshold === 50000000) prevSurchargeRate = 0.25;

    const totalPayableAtThreshold = taxAtThreshold * (1 + prevSurchargeRate);
    const cap = totalPayableAtThreshold + (totalTaxableIncome - threshold);

    if (taxAfterRebateAndRelief + rawSurcharge > cap) {
      surchargeMarginalRelief = Math.max(0, Math.round(taxAfterRebateAndRelief + rawSurcharge - cap));
    }
    netSurcharge = Math.max(0, rawSurcharge - surchargeMarginalRelief);
  }

  // 10. CESS (4%)
  const taxableForCess = taxAfterRebateAndRelief + netSurcharge;
  const cess = Math.round(taxableForCess * rules.cessRate);

  // 11. TOTAL TAX
  const totalTaxLiability = roundSection288B(taxableForCess + cess);

  // 12. CREDITS & BALANCE
  const tdsSalary = Math.max(0, Number(taxCredits.tdsSalary) || 0);
  const tdsOther = Math.max(0, Number(taxCredits.tdsOther) || 0);
  const tcs = Math.max(0, Number(taxCredits.tcs) || 0);
  const advanceTax = Math.max(0, Number(taxCredits.advanceTax) || 0);
  const selfAssessmentTax = Math.max(0, Number(taxCredits.selfAssessmentTax) || 0);
  const totalTaxCredits = tdsSalary + tdsOther + tcs + advanceTax + selfAssessmentTax;

  const netBalance = totalTaxLiability - totalTaxCredits;
  const netPayable = netBalance > 0 ? roundSection288B(netBalance) : 0;
  const refundDue = netBalance < 0 ? roundSection288B(Math.abs(netBalance)) : 0;

  return {
    regime: isNewRegime ? 'new' : 'old',
    regimeName: isNewRegime ? 'New Tax Regime (Section 115BAC)' : 'Old Tax Regime',
    financialYear: fyKey,
    assessmentYear: rules.assessmentYear,
    isDefault: isNewRegime,

    grossSalary,
    standardDeduction,
    hraExemption: hraExempt,
    ltaExemption: ltaExempt,
    professionalTax: profTax,
    netSalary,
    netHouseProperty,
    selfOccupiedInterestAllowed: selfOccupiedInterest,
    netBusinessIncome,
    netOtherSources: normalOtherSources + lotteryWinnings,
    specialRateIncome: specialRateTotal,
    grossTotalIncome,

    totalDeductions: allowableDeductions,
    deductionBreakdown,
    netTaxableIncome: totalTaxableIncome,

    slabBreakdown,
    normalSlabTax,
    specialGainsTax,
    taxSTCG111A,
    taxLTCG112A,
    taxLTCGOther,
    taxLottery,
    totalTaxBeforeRebate,

    rebate87A,
    marginalRelief87A,
    taxAfterRebateAndRelief,

    surchargeRate,
    surcharge: rawSurcharge,
    surchargeMarginalRelief,
    netSurcharge,
    cess,
    totalTaxLiability,

    totalTaxCredits,
    netPayable,
    refundDue,
  };
}

export function calculateIncomeTaxComparison(input) {
  const oldRegime = computeRegimeTax({ ...input, isNewRegime: false });
  const newRegime = computeRegimeTax({ ...input, isNewRegime: true });

  const taxDiff = oldRegime.totalTaxLiability - newRegime.totalTaxLiability;
  let winner = 'new';
  let savings = Math.abs(taxDiff);
  let recommendation = '';

  if (taxDiff > 0) {
    winner = 'new';
    recommendation = `The New Tax Regime (Section 115BAC) saves you ${formatIndianCurrency(savings)} in tax compared to the Old Regime.`;
  } else if (taxDiff < 0) {
    winner = 'old';
    recommendation = `The Old Tax Regime saves you ${formatIndianCurrency(savings)} due to your deductions and exemptions under Chapter VI-A / HRA.`;
  } else {
    winner = 'equal';
    recommendation = 'Both regimes result in the exact same tax liability. The New Regime is recommended for simpler compliance without paperwork.';
  }

  return {
    financialYear: input.financialYear || '2025-26',
    winner,
    savings,
    recommendation,
    oldRegime,
    newRegime,
  };
}

/**
 * Automatically advises the appropriate ITR Form based on income profile.
 */
export function recommendITRForm({
  grossTotalIncome = 0,
  hasBusinessIncome = false,
  hasPresumptiveBusiness = false,
  hasCapitalGains = false,
  hasMultipleProperties = false,
  hasForeignAssets = false,
  isDirectorOrUnlisted = false,
  agriculturalIncome = 0,
}) {
  if (hasForeignAssets || isDirectorOrUnlisted) {
    return {
      form: 'ITR-2',
      title: 'ITR-2 (Capital Gains / Foreign Assets / Directors)',
      reason: 'Mandatory because you hold foreign assets, unlisted shares, or a company directorship.',
    };
  }

  if (hasBusinessIncome) {
    return {
      form: 'ITR-3',
      title: 'ITR-3 (Business & Professional Income)',
      reason: 'Mandatory because you carry on business or profession with audited/regular books of accounts.',
    };
  }

  if (hasPresumptiveBusiness) {
    if (grossTotalIncome <= 5000000) {
      return {
        form: 'ITR-4',
        title: 'ITR-4 (Sugam - Presumptive Scheme u/s 44AD / 44ADA)',
        reason: 'Recommended for small businesses and eligible professionals opting for presumptive taxation.',
      };
    } else {
      return {
        form: 'ITR-3',
        title: 'ITR-3 (Business Income over ₹50 Lakh)',
        reason: 'Total income exceeds ₹50 Lakh, making ITR-4 ineligible.',
      };
    }
  }

  if (hasCapitalGains || hasMultipleProperties) {
    return {
      form: 'ITR-2',
      title: 'ITR-2 (Capital Gains or Multiple House Properties)',
      reason: 'Required because you have capital gains from shares/property or own more than one house property.',
    };
  }

  if (grossTotalIncome <= 5000000 && agriculturalIncome <= 5000) {
    return {
      form: 'ITR-1',
      title: 'ITR-1 (Sahaj - Salaried & Simple Income)',
      reason: 'Easiest form for resident individuals earning up to ₹50 Lakh from salary, one house property, and other sources.',
    };
  }

  return {
    form: 'ITR-2',
    title: 'ITR-2 (Comprehensive Individual Return)',
    reason: 'Total income exceeds ₹50 Lakh or agricultural income exceeds ₹5,000.',
  };
}

export default {
  SUPPORTED_FINANCIAL_YEARS,
  TAX_RULES_BY_YEAR,
  formatIndianCurrency,
  roundSection288B,
  calculateSlabTax,
  computeRegimeTax,
  calculateIncomeTaxComparison,
  recommendITRForm,
};
