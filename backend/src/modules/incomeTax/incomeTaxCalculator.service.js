/**
 * BharatFiling - Comprehensive Income Tax Calculation Service
 * Fully implements Section 115BAC, Chapter VI-A, Section 87A Marginal Relief,
 * Surcharges, Cess, and Section 288B Rounding.
 */

import { getTaxRulesForYear } from './rules/taxRuleRegistry.js';

/**
 * Rounds taxable income to the nearest multiple of 10 under Section 288A.
 */
export function roundSection288A(amount) {
  const num = Math.round(Number(amount) || 0);
  return Math.round(num / 10) * 10;
}

/**
 * Rounds tax liability to the nearest multiple of 10 under Section 288B.
 */
export function roundSection288B(amount) {
  const num = Math.round(Number(amount) || 0);
  return Math.round(num / 10) * 10;
}

/**
 * Calculates progressive slab tax for an income given a slab structure.
 */
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

/**
 * Calculates surcharge and surcharge marginal relief.
 * Statutorily caps surcharge on STCG 111A, LTCG 112A, LTCG 112, and Dividend income at 15%.
 */
export function calculateSurchargeAndRelief(
  totalIncome,
  taxBeforeSurcharge,
  specialGainsTaxOrIsNewRegime,
  isNewRegimeOrRules,
  maybeRules
) {
  const income = Math.max(0, Number(totalIncome) || 0);
  let isNewRegime = false;
  let rules = null;
  let specialGainsTax = 0;
  let normalTax = Math.max(0, Number(taxBeforeSurcharge) || 0);

  if (typeof specialGainsTaxOrIsNewRegime === 'boolean') {
    // 4-argument call signature: (totalIncome, taxBeforeSurcharge, isNewRegime, rules)
    isNewRegime = specialGainsTaxOrIsNewRegime;
    rules = isNewRegimeOrRules;
    specialGainsTax = 0;
  } else {
    // 5-argument call signature: (totalIncome, normalTax, specialGainsTax, isNewRegime, rules)
    specialGainsTax = Math.max(0, Number(specialGainsTaxOrIsNewRegime) || 0);
    isNewRegime = Boolean(isNewRegimeOrRules);
    rules = maybeRules;
  }

  const totalTax = normalTax + specialGainsTax;
  if (income <= 5000000 || totalTax === 0) {
    return { surcharge: 0, marginalRelief: 0, netSurcharge: 0, applicableRate: 0 };
  }

  let normalRate = 0;
  let threshold = 5000000;

  // Surcharge brackets
  if (income > 50000000) {
    normalRate = isNewRegime ? 0.25 : 0.37;
    threshold = 50000000;
  } else if (income > 20000000) {
    normalRate = 0.25;
    threshold = 20000000;
  } else if (income > 10000000) {
    normalRate = 0.15;
    threshold = 10000000;
  } else {
    normalRate = 0.1;
    threshold = 5000000;
  }

  // Surcharge on capital gains (111A, 112A, 112) is statutorily capped at 15%
  const specialRate = Math.min(0.15, normalRate);
  const rawSurcharge = Math.round(normalTax * normalRate + specialGainsTax * specialRate);

  // Marginal relief check on surcharge
  let marginalRelief = 0;
  const slabs = rules ? (isNewRegime ? rules.newRegimeSlabs : rules.oldRegimeSlabs?.individual) : null;
  const taxAtThreshold = slabs ? calculateSlabTax(threshold, slabs).tax : 0;

  let prevSurchargeRate = 0;
  if (threshold === 10000000) prevSurchargeRate = 0.1;
  else if (threshold === 20000000) prevSurchargeRate = 0.15;
  else if (threshold === 50000000) prevSurchargeRate = 0.25;

  const totalPayableAtThreshold = taxAtThreshold * (1 + prevSurchargeRate);
  const excessIncomeOverThreshold = income - threshold;
  const cap = totalPayableAtThreshold + excessIncomeOverThreshold;

  if (taxAtThreshold > 0 && totalTax + rawSurcharge > cap) {
    marginalRelief = Math.max(0, Math.round(totalTax + rawSurcharge - cap));
  }

  const netSurcharge = Math.max(0, rawSurcharge - marginalRelief);

  return {
    applicableRate: normalRate,
    surcharge: rawSurcharge,
    marginalRelief,
    netSurcharge,
  };
}

/**
 * Calculates Section 87A rebate and marginal relief.
 * Applies strictly to normal slab tax (Sec 112A(6) & 115BB exclude capital gains & winnings).
 */
export function calculateRebateAndMarginalRelief87A(taxableIncome, normalTax, isNewRegime, isResident, rules) {
  if (!isResident || normalTax <= 0) {
    return { rebate87A: 0, marginalRelief87A: 0, taxAfterRebateAndRelief: normalTax };
  }

  const income = Math.max(0, Number(taxableIncome) || 0);

  if (isNewRegime) {
    const { maxTaxableIncome, maxRebate, marginalReliefThreshold } = rules.rebate87A.newRegime;

    // Full rebate if taxable income <= ₹7,00,000
    if (income <= maxTaxableIncome) {
      const rebate = Math.min(normalTax, maxRebate);
      return {
        rebate87A: rebate,
        marginalRelief87A: 0,
        taxAfterRebateAndRelief: Math.max(0, normalTax - rebate),
      };
    }

    // Section 87A Marginal Relief: Income marginally above ₹7,00,000 (up to ₹7,27,777)
    // Tax payable cannot exceed excess income over ₹7,00,000
    const excessIncome = income - marginalReliefThreshold;
    if (normalTax > excessIncome) {
      const relief = normalTax - excessIncome;
      return {
        rebate87A: 0,
        marginalRelief87A: relief,
        taxAfterRebateAndRelief: Math.max(0, excessIncome),
      };
    }

    return { rebate87A: 0, marginalRelief87A: 0, taxAfterRebateAndRelief: normalTax };
  } else {
    // Old Regime Rebate: Income <= ₹5,00,000
    const { maxTaxableIncome, maxRebate } = rules.rebate87A.oldRegime;
    if (income <= maxTaxableIncome) {
      const rebate = Math.min(normalTax, maxRebate);
      return {
        rebate87A: rebate,
        marginalRelief87A: 0,
        taxAfterRebateAndRelief: Math.max(0, normalTax - rebate),
      };
    }

    return { rebate87A: 0, marginalRelief87A: 0, taxAfterRebateAndRelief: normalTax };
  }
}

/**
 * Full Regime Computation Engine
 */
export function computeRegimeTax({
  isNewRegime,
  financialYear = '2025-26',
  ageCategory = 'individual',
  residentialStatus = 'resident',
  incomeMode = 'gross',
  salary = {},
  houseProperty = {},
  capitalGains = {},
  businessProfession = {},
  otherSources = {},
  deductions = {},
  taxCredits = {},
}) {
  const rules = getTaxRulesForYear(financialYear);
  const isResident = residentialStatus !== 'nonResident';
  const isDirectTaxable = incomeMode === 'taxable';
  const directTaxableAmount = Math.max(0, Number(salary.netTaxableIncome ?? salary.grossSalary ?? 0));

  // 1. SALARY HEAD COMPUTATION
  let grossSalary = Number(salary.grossSalary) || 0;
  let standardDeduction = 0;
  let hraExempt = 0;
  let ltaExempt = 0;
  let profTax = 0;
  let otherExempt = 0;
  let netSalary = 0;

  if (isDirectTaxable) {
    grossSalary = directTaxableAmount;
    standardDeduction = 0;
    netSalary = directTaxableAmount;
  } else {
    const standardDedLimit = isNewRegime ? rules.standardDeduction.newRegime : rules.standardDeduction.oldRegime;
    standardDeduction = grossSalary > 0 ? Math.min(grossSalary, standardDedLimit) : 0;

    if (!isNewRegime) {
      hraExempt = Math.min(grossSalary, Number(salary.hraExemption) || 0);
      ltaExempt = Math.min(grossSalary, Number(salary.ltaExemption) || 0);
      profTax = Math.min(grossSalary, Number(salary.professionalTax) || 0);
      otherExempt = Math.min(grossSalary, Number(salary.otherAllowancesExempt) || 0);
    }

    // Family Pension
    const familyPension = Number(salary.familyPension) || 0;
    const fpRules = isNewRegime ? rules.familyPensionDeduction.newRegime : rules.familyPensionDeduction.oldRegime;
    const familyPensionDeduction = familyPension > 0 ? Math.min(familyPension * fpRules.fraction, fpRules.maxLimit) : 0;
    const netFamilyPension = Math.max(0, familyPension - familyPensionDeduction);

    netSalary = Math.max(
      0,
      grossSalary - standardDeduction - hraExempt - ltaExempt - profTax - otherExempt + netFamilyPension
    );
  }

  // 2. HOUSE PROPERTY HEAD COMPUTATION
  const rentalIncome = Number(houseProperty.rentalIncome) || 0;
  const municipalTaxes = Number(houseProperty.municipalTaxes) || 0;
  const netAnnualValue = Math.max(0, rentalIncome - municipalTaxes);
  const stdDeduction30Percent = netAnnualValue * 0.3;
  const interestLetOut = Number(houseProperty.interestLetOut) || 0;
  const incomeFromLetOut = netAnnualValue - stdDeduction30Percent - interestLetOut;

  let netHouseProperty = 0;
  let selfOccupiedInterest = Number(houseProperty.interestSelfOccupied) || 0;

  if (isNewRegime) {
    // Under Section 115BAC, self-occupied interest is disallowed, and let-out loss cannot be set off against other heads
    netHouseProperty = Math.max(0, incomeFromLetOut);
    selfOccupiedInterest = 0; // Not allowed in New Regime
  } else {
    // Under Old Regime, self-occupied interest is capped at ₹2,00,000
    const allowedSelfInterest = Math.min(200000, selfOccupiedInterest);
    const totalHP = incomeFromLetOut - allowedSelfInterest;
    // Section 71(3A) cap: Loss from house property set-off against other heads capped at -₹2,00,000
    netHouseProperty = totalHP < 0 ? Math.max(-200000, totalHP) : totalHP;
  }

  // 3. BUSINESS / PROFESSION HEAD COMPUTATION
  const p44AD = Number(businessProfession.presumptiveIncome44AD) || 0;
  const p44ADA = Number(businessProfession.presumptiveIncome44ADA) || 0;
  const pNormal = Number(businessProfession.businessProfitNormal) || 0;
  const netBusinessIncome = Math.max(0, p44AD + p44ADA + pNormal);

  // 4. OTHER SOURCES HEAD COMPUTATION
  const savingsInterest = Number(otherSources.savingsInterest) || 0;
  const fdInterest = Number(otherSources.fdInterest) || 0;
  const dividendIncome = Number(otherSources.dividendIncome) || 0;
  const otherIncome = Number(otherSources.otherIncome) || 0;
  const lotteryWinnings = Number(otherSources.lotteryWinnings) || 0; // Section 115BB / 115BBJ
  const normalOtherSources = savingsInterest + fdInterest + dividendIncome + otherIncome;

  // 5. CAPITAL GAINS HEAD COMPUTATION
  const stcg111A = Math.max(0, Number(capitalGains.stcg111A) || 0);
  const stcgOther = Math.max(0, Number(capitalGains.stcgOther) || 0); // taxed at slab rates
  const ltcg112A = Math.max(0, Number(capitalGains.ltcg112A) || 0);
  const ltcgOther = Math.max(0, Number(capitalGains.ltcgOther) || 0);

  // Special Rate Incomes Total
  const specialRateTotal = stcg111A + ltcg112A + ltcgOther + lotteryWinnings;

  // Ordinary Income Total (eligible for normal slabs and deductions)
  const ordinaryIncome = Math.max(
    0,
    netSalary + netHouseProperty + netBusinessIncome + normalOtherSources + stcgOther
  );

  // Gross Total Income (GTI)
  const grossTotalIncome = ordinaryIncome + specialRateTotal;

  // 6. DEDUCTIONS UNDER CHAPTER VI-A
  let totalDeductions = 0;
  const deductionBreakdown = {};

  // Employer NPS (Section 80CCD(2)) is allowed in BOTH Old & New regimes!
  // Cap at 14% for New Regime (Finance (No. 2) Act 2024 parity), 10% for Old Regime (private sector standard)
  const rawEmployerNPS = Math.max(0, Number(deductions.sec80CCD2) || 0);
  const maxNPSFraction = isNewRegime ? 0.14 : 0.10;
  const npsCeiling = grossSalary > 0 ? Math.round(grossSalary * maxNPSFraction) : rawEmployerNPS;
  const employerNPS = Math.min(rawEmployerNPS, npsCeiling > 0 ? npsCeiling : rawEmployerNPS);
  deductionBreakdown.sec80CCD2 = employerNPS;
  totalDeductions += employerNPS;

  if (!isNewRegime) {
    const sec80C = Math.min(150000, Math.max(0, Number(deductions.sec80C) || 0));
    const sec80CCD1B = Math.min(50000, Math.max(0, Number(deductions.sec80CCD1B) || 0));
    const sec80D = Math.min(100000, Math.max(0, Number(deductions.sec80D) || 0));
    const sec80E = Math.max(0, Number(deductions.sec80E) || 0);
    const sec80G = Math.max(0, Number(deductions.sec80G) || 0);

    // Section 80TTA / 80TTB
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

  // Deductions cannot exceed ordinary income
  let allowableDeductions = 0;
  let netOrdinaryTaxable = 0;
  let totalTaxableIncome = 0;

  if (isDirectTaxable) {
    allowableDeductions = Math.min(directTaxableAmount, totalDeductions);
    netOrdinaryTaxable = roundSection288A(Math.max(0, directTaxableAmount - allowableDeductions));
    totalTaxableIncome = roundSection288A(netOrdinaryTaxable + specialRateTotal);
  } else {
    allowableDeductions = Math.min(ordinaryIncome, totalDeductions);
    const rawOrdinaryTaxable = Math.max(0, ordinaryIncome - allowableDeductions);
    netOrdinaryTaxable = roundSection288A(rawOrdinaryTaxable);
    totalTaxableIncome = roundSection288A(netOrdinaryTaxable + specialRateTotal);
  }

  // 7. TAX COMPUTATION BY SLABS & SPECIAL RATES
  let slabs = rules.newRegimeSlabs;
  if (!isNewRegime) {
    if (ageCategory === 'superSenior') slabs = rules.oldRegimeSlabs.superSenior;
    else if (ageCategory === 'senior') slabs = rules.oldRegimeSlabs.senior;
    else slabs = rules.oldRegimeSlabs.individual;
  }

  const { tax: normalSlabTax, breakdown: slabBreakdown } = calculateSlabTax(netOrdinaryTaxable, slabs);

  // Unexhausted basic exemption limit adjustment against special rate gains (for resident individuals)
  const basicExemptionLimit = slabs[0].max;
  const unexhaustedExemption = isResident ? Math.max(0, basicExemptionLimit - netOrdinaryTaxable) : 0;
  let remainingUnexhausted = unexhaustedExemption;

  // Tax on STCG 111A
  let taxableSTCG111A = stcg111A;
  if (remainingUnexhausted > 0 && taxableSTCG111A > 0) {
    const offset = Math.min(taxableSTCG111A, remainingUnexhausted);
    taxableSTCG111A -= offset;
    remainingUnexhausted -= offset;
  }
  const taxSTCG111A = Math.round(taxableSTCG111A * rules.capitalGains.stcg111A);

  // Tax on LTCG 112A (exemption threshold post-July 2024 is ₹1,25,000)
  const ltcg112AExemption = rules.capitalGains.ltcg112A.exemptionLimit;
  let taxableLTCG112A = Math.max(0, ltcg112A - ltcg112AExemption);
  if (remainingUnexhausted > 0 && taxableLTCG112A > 0) {
    const offset = Math.min(taxableLTCG112A, remainingUnexhausted);
    taxableLTCG112A -= offset;
    remainingUnexhausted -= offset;
  }
  const taxLTCG112A = Math.round(taxableLTCG112A * rules.capitalGains.ltcg112A.rate);

  // Tax on LTCG 112
  let taxableLTCGOther = ltcgOther;
  if (remainingUnexhausted > 0 && taxableLTCGOther > 0) {
    const offset = Math.min(taxableLTCGOther, remainingUnexhausted);
    taxableLTCGOther -= offset;
    remainingUnexhausted -= offset;
  }
  const taxLTCGOther = Math.round(taxableLTCGOther * rules.capitalGains.ltcg112);

  // Tax on Lottery / Gaming (30%) - No basic exemption set-off allowed
  const taxLottery = Math.round(lotteryWinnings * rules.capitalGains.winnings115BB);

  const specialGainsTax = taxSTCG111A + taxLTCG112A + taxLTCGOther + taxLottery;
  const totalTaxBeforeRebate = normalSlabTax + specialGainsTax;

  // 8. SECTION 87A REBATE & MARGINAL RELIEF
  // Applied strictly to normal slab income
  // Section 112A(6) & 115BB strictly prohibit 87A rebate against LTCG 112A or casual winnings
  const {
    rebate87A,
    marginalRelief87A,
    taxAfterRebateAndRelief: normalTaxAfterRebate,
  } = calculateRebateAndMarginalRelief87A(
    totalTaxableIncome,
    normalSlabTax,
    isNewRegime,
    isResident,
    rules
  );

  const taxAfterRebateAndRelief = normalTaxAfterRebate + specialGainsTax;

  // 9. SURCHARGE & SURCHARGE MARGINAL RELIEF (Capping capital gains surcharge at 15%)
  const {
    surcharge,
    marginalRelief: surchargeMarginalRelief,
    netSurcharge,
    applicableRate: surchargeRate,
  } = calculateSurchargeAndRelief(
    totalTaxableIncome,
    normalTaxAfterRebate,
    specialGainsTax,
    isNewRegime,
    rules
  );

  // 10. HEALTH & EDUCATION CESS (4%)
  const taxableForCess = taxAfterRebateAndRelief + netSurcharge;
  const cess = Math.round(taxableForCess * rules.cessRate);

  // 11. TOTAL TAX LIABILITY
  const totalTaxLiability = roundSection288B(taxableForCess + cess);

  // 12. TAX CREDITS & NET PAYABLE / REFUND
  const tdsSalary = Number(taxCredits.tdsSalary) || 0;
  const tdsOther = Number(taxCredits.tdsOther) || 0;
  const tcs = Number(taxCredits.tcs) || 0;
  const advanceTax = Number(taxCredits.advanceTax) || 0;
  const selfAssessmentTax = Number(taxCredits.selfAssessmentTax) || 0;
  const totalTaxCredits = tdsSalary + tdsOther + tcs + advanceTax + selfAssessmentTax;

  const netBalance = totalTaxLiability - totalTaxCredits;
  const netPayable = netBalance > 0 ? roundSection288B(netBalance) : 0;
  const refundDue = netBalance < 0 ? roundSection288B(Math.abs(netBalance)) : 0;

  // Formatted slabs alias for simple cards and tables
  const formattedSlabs = slabBreakdown.map((s) => ({
    ...s,
    slab:
      s.label ||
      (s.max === Infinity
        ? `Above ₹${s.min.toLocaleString('en-IN')}`
        : `₹${s.min.toLocaleString('en-IN')} to ₹${s.max.toLocaleString('en-IN')}`),
    tax: s.taxAmount,
  }));

  return {
    regime: isNewRegime ? 'new' : 'old',
    regimeName: isNewRegime ? 'New Tax Regime (Section 115BAC)' : 'Old Tax Regime',
    financialYear,
    assessmentYear: rules.assessmentYear,
    isDefault: isNewRegime,

    // Income Summaries
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

    // Deductions
    totalDeductions: allowableDeductions,
    deductionBreakdown,
    netTaxableIncome: totalTaxableIncome,
    taxableIncome: totalTaxableIncome, // Backward-compatible alias for simple UI

    // Slabs & Taxes
    slabBreakdown,
    slabs: formattedSlabs, // Backward-compatible alias for simple UI
    normalSlabTax,
    specialGainsTax,
    taxSTCG111A,
    taxLTCG112A,
    taxLTCGOther,
    taxLottery,
    totalTaxBeforeRebate,

    // Rebate & Reliefs
    rebate87A,
    marginalRelief87A,
    taxAfterRebateAndRelief,

    // Surcharge & Cess
    surchargeRate,
    surcharge,
    surchargeMarginalRelief,
    netSurcharge,
    cess,
    healthAndEducationCess: cess, // Backward-compatible alias for simple UI
    totalTaxLiability,

    // Balance
    totalTaxCredits,
    netPayable,
    refundDue,
  };
}

/**
 * Compares Old Regime vs New Regime and recommends the best option.
 */
export function calculateIncomeTaxComparison(input) {
  const oldRegime = computeRegimeTax({ ...input, isNewRegime: false });
  const newRegime = computeRegimeTax({ ...input, isNewRegime: true });

  const taxDiff = oldRegime.totalTaxLiability - newRegime.totalTaxLiability;
  let winner = 'new';
  let savings = Math.abs(taxDiff);
  let recommendation = '';

  if (taxDiff > 0) {
    winner = 'new';
    recommendation = `The New Tax Regime (Section 115BAC) saves you ₹${savings.toLocaleString('en-IN')} in tax compared to the Old Regime.`;
  } else if (taxDiff < 0) {
    winner = 'old';
    recommendation = `The Old Tax Regime saves you ₹${savings.toLocaleString('en-IN')} due to your deductions and exemptions under Chapter VI-A / HRA.`;
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

export default {
  computeRegimeTax,
  calculateIncomeTaxComparison,
  calculateSlabTax,
  calculateSurchargeAndRelief,
  calculateRebateAndMarginalRelief87A,
  roundSection288A,
  roundSection288B,
};
