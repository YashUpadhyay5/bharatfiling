/**
 * BharatFiling - Professional HRA Calculation Engine
 * Statutory References:
 * - Section 10(13A), Income-tax Act, 1961
 * - Rule 2A, Income-tax Rules, 1962
 * - Gestetner Duplicators Pvt Ltd v. CIT [1979] 117 ITR 1 (SC) (Eligible Salary definition)
 * - Section 115BAC (New Tax Regime restrictions)
 */

export const TRADITIONAL_METRO_CITIES = ['delhi', 'mumbai', 'kolkata', 'chennai'];
export const EXPANDED_METRO_CITIES = [
  'delhi',
  'mumbai',
  'kolkata',
  'chennai',
  'bangalore',
  'bengaluru',
  'hyderabad',
  'pune',
  'ahmedabad',
];
export const METRO_CITIES = TRADITIONAL_METRO_CITIES;

export function isMetroCity(cityName, financialYear = '2025-26') {
  if (!cityName || typeof cityName !== 'string') return false;
  const normalized = cityName.trim().toLowerCase();
  const startYear = parseInt(String(financialYear).split('-')[0], 10) || 2026;
  const metroList = startYear >= 2026 ? EXPANDED_METRO_CITIES : TRADITIONAL_METRO_CITIES;
  return metroList.some((metro) => normalized.includes(metro));
}

export function calculateHraForPeriod({
  months = 1,
  basicSalary = 0,
  da = 0,
  daFormsRetirement = true,
  commission = 0,
  hraReceived = 0,
  rentPaid = 0,
  isMetro = false,
  frequency = 'monthly',
}) {
  // Normalize to period totals
  const numMonths = Math.max(1, Number(months) || 1);
  const multiplier = frequency === 'annual' ? 1 : numMonths;

  const periodBasic = (Number(basicSalary) || 0) * (frequency === 'annual' ? 1 : multiplier);
  const periodDa = daFormsRetirement ? (Number(da) || 0) * (frequency === 'annual' ? 1 : multiplier) : 0;
  const periodCommission = (Number(commission) || 0) * (frequency === 'annual' ? 1 : multiplier);

  // Eligible salary under Rule 2A (Basic + DA retirement + % turnover commission)
  const eligibleSalary = periodBasic + periodDa + periodCommission;

  const actualHra = (Number(hraReceived) || 0) * (frequency === 'annual' ? 1 : multiplier);
  const actualRent = (Number(rentPaid) || 0) * (frequency === 'annual' ? 1 : multiplier);

  // The 3 Statutory Limits under Rule 2A
  // Limit A: Actual HRA received
  const limitA = Math.max(0, Math.round(actualHra));

  // Limit B: Rent paid in excess of 10% of salary
  const tenPercentSalary = Math.round(eligibleSalary * 0.1);
  const limitB = Math.max(0, Math.round(actualRent - tenPercentSalary));

  // Limit C: 50% of salary for metro (Delhi, Mumbai, Kolkata, Chennai) or 40% for other locations
  const salaryPercentage = isMetro ? 0.5 : 0.4;
  const limitC = Math.max(0, Math.round(eligibleSalary * salaryPercentage));

  // Exempt HRA is least of Limit A, B, C
  const exemptHra = Math.min(limitA, limitB, limitC);
  const taxableHra = Math.max(0, actualHra - exemptHra);

  let governingLimit = 'Limit A';
  let governingLimitDesc = 'Actual HRA Received (Limit A)';
  if (limitB <= limitA && limitB <= limitC) {
    governingLimit = 'Limit B';
    governingLimitDesc = 'Rent Paid minus 10% of Eligible Salary (Limit B)';
  } else if (limitC <= limitA && limitC <= limitB) {
    governingLimit = 'Limit C';
    governingLimitDesc = `${isMetro ? '50%' : '40%'} of Eligible Salary (Limit C)`;
  }

  const effectiveMonths = frequency === 'annual' ? 12 : numMonths;
  const monthlyExemptHra = Math.round(exemptHra / effectiveMonths);
  const monthlyTaxableHra = Math.round(taxableHra / effectiveMonths);
  const monthlyHraReceived = Math.round(actualHra / effectiveMonths);

  return {
    multiplier,
    effectiveMonths,
    eligibleSalary,
    actualHra,
    actualRent,
    tenPercentSalary,
    limitA,
    limitB,
    limitC,
    salaryPercentage: isMetro ? 50 : 40,
    exemptHra,
    taxableHra,
    monthlyExemptHra,
    monthlyTaxableHra,
    monthlyHraReceived,
    governingLimit,
    governingLimitDesc,
  };
}

export function computeHraExemption({
  financialYear = '2026-27',
  taxRegime = 'old',
  calculationMode = 'simple',
  simpleInput = {},
  periods = [],
}) {
  const normRegime = (taxRegime || 'old').toLowerCase().trim();
  const isOldRegime = normRegime === 'old';

  // Derived Assessment Year (AY is FY + 1)
  const [startYear] = (financialYear || '2026-27').split('-');
  const startNum = parseInt(startYear, 10) || 2026;
  const assessmentYear = `${startNum + 1}-${String(startNum + 2).slice(-2)}`;

  const calculationWarnings = [];
  const statutoryNotes = [
    'Exemption computed strictly pursuant to Section 10(13A) read with Rule 2A of Income-tax Rules, 1962.',
    'Eligible Salary includes Basic Salary, Dearness Allowance (only if entering into retirement benefits), and fixed turnover commission (Gestetner ruling).',
  ];

  // 1. New Tax Regime check (Section 115BAC)
  if (!isOldRegime) {
    let totalHraReceived = 0;
    let effectiveMonths = 12;
    if (calculationMode === 'advanced' && periods.length > 0) {
      totalHraReceived = periods.reduce((sum, p) => sum + (Number(p.hraReceived) || 0) * (Number(p.months) || 1), 0);
      effectiveMonths = periods.reduce((sum, p) => sum + (Number(p.months) || 1), 0) || 12;
    } else {
      const isAnnual = simpleInput.frequency === 'annual';
      const tenure = Math.max(1, Number(simpleInput.tenureMonths) || 12);
      totalHraReceived = (Number(simpleInput.hraReceived) || 0) * (isAnnual ? 1 : tenure);
      effectiveMonths = isAnnual ? 12 : tenure;
    }
    const monthlyHra = Math.round(totalHraReceived / effectiveMonths);

    return {
      financialYear,
      assessmentYear,
      taxRegime: 'new',
      calculationMode,
      summary: {
        totalHraReceived: Math.round(totalHraReceived),
        totalEligibleSalary: 0,
        totalRentPaid: 0,
        totalLimitA: Math.round(totalHraReceived),
        totalLimitB: 0,
        totalLimitC: 0,
        totalExemptHra: 0,
        totalTaxableHra: Math.round(totalHraReceived),
        monthlyExemptHra: 0,
        monthlyTaxableHra: monthlyHra,
        monthlyHraReceived: monthlyHra,
        monthlyRent: 0,
        minRentForExemption: 0,
        requiresLandlordPan: false,
        requiresSection194IB: false,
        monthlyTds194IB: 0,
        annualTds194IB: 0,
        section80GGEstimate: null,
        estimatedTaxSaved: 0,
        taxSavedAt30Percent: 0,
        taxSavedAt20Percent: 0,
        taxSavedAt10Percent: 0,
        limitingFactor: 'Not applicable under Section 115BAC (New Tax Regime)',
      },
      breakdown: [],
      calculationWarnings: [
        'HRA Exemption under Section 10(13A) is NOT available under the New Tax Regime (Section 115BAC).',
        'Your entire HRA received is considered taxable salary income under the New Regime. Switch to the Old Regime if you wish to claim this deduction during ITR filing.',
      ],
      statutoryNotes,
    };
  }

  // 2. Old Tax Regime - Detailed Computation
  let processedPeriods = [];

  if (calculationMode === 'advanced' && Array.isArray(periods) && periods.length > 0) {
    processedPeriods = periods.map((period, idx) => {
      const isMetro = Boolean(period.isMetro || isMetroCity(period.city, financialYear));
      const res = calculateHraForPeriod({
        months: Number(period.months) || 1,
        basicSalary: Number(period.basicSalary) || 0,
        da: Number(period.da) || 0,
        daFormsRetirement: Boolean(period.daFormsRetirement),
        commission: Number(period.commission) || 0,
        hraReceived: Number(period.hraReceived) || 0,
        rentPaid: Number(period.rentPaid) || 0,
        isMetro,
        frequency: 'monthly',
      });

      return {
        id: period.id || `period-${idx + 1}`,
        periodLabel: period.periodLabel || `Period ${idx + 1} (${period.months || 1} mo)`,
        city: period.city || (isMetro ? 'Metro City' : 'Non-Metro City'),
        isMetro,
        ...res,
      };
    });
  } else {
    // Simple Mode
    const isMetro = Boolean(simpleInput.isMetro || isMetroCity(simpleInput.city, financialYear));
    const res = calculateHraForPeriod({
      months: Number(simpleInput.tenureMonths) || 12,
      basicSalary: Number(simpleInput.basicSalary) || 0,
      da: Number(simpleInput.da) || 0,
      daFormsRetirement: Boolean(simpleInput.daFormsRetirement),
      commission: Number(simpleInput.commission) || 0,
      hraReceived: Number(simpleInput.hraReceived) || 0,
      rentPaid: Number(simpleInput.rentPaid) || 0,
      isMetro,
      frequency: simpleInput.frequency || 'monthly',
    });

    processedPeriods = [
      {
        id: 'full-year',
        periodLabel: simpleInput.frequency === 'annual' ? 'Full Financial Year' : `${simpleInput.tenureMonths || 12} Months`,
        city: simpleInput.city || (isMetro ? 'Metro City' : 'Non-Metro City'),
        isMetro,
        ...res,
      },
    ];
  }

  // Aggregate totals
  const totalHraReceived = processedPeriods.reduce((acc, p) => acc + p.actualHra, 0);
  const totalEligibleSalary = processedPeriods.reduce((acc, p) => acc + p.eligibleSalary, 0);
  const totalRentPaid = processedPeriods.reduce((acc, p) => acc + p.actualRent, 0);
  const totalLimitA = processedPeriods.reduce((acc, p) => acc + p.limitA, 0);
  const totalLimitB = processedPeriods.reduce((acc, p) => acc + p.limitB, 0);
  const totalLimitC = processedPeriods.reduce((acc, p) => acc + p.limitC, 0);
  const totalExemptHra = processedPeriods.reduce((acc, p) => acc + p.exemptHra, 0);
  const totalTaxableHra = Math.max(0, totalHraReceived - totalExemptHra);

  // Overall Governing Limit
  let overallGoverningLimit = 'Actual HRA Received (Limit A)';
  if (totalLimitB <= totalLimitA && totalLimitB <= totalLimitC) {
    overallGoverningLimit = 'Rent Paid minus 10% of Eligible Salary (Limit B)';
  } else if (totalLimitC <= totalLimitA && totalLimitC <= totalLimitB) {
    const isAnyMetro = processedPeriods.some((p) => p.isMetro);
    overallGoverningLimit = `${isAnyMetro ? '50%' : '40%'} Salary Percentage Ceiling (Limit C)`;
  }

  const totalMonths = processedPeriods.reduce((sum, p) => sum + (p.effectiveMonths || p.multiplier || 12), 0) || 12;
  const avgMonths = Math.min(12, Math.max(1, totalMonths));
  const monthlyExemptHra = Math.round(totalExemptHra / avgMonths);
  const monthlyTaxableHra = Math.round(totalTaxableHra / avgMonths);
  const monthlyHraReceived = Math.round(totalHraReceived / avgMonths);
  const monthlyRent = Math.round(totalRentPaid / avgMonths);

  // Statutory Warnings & Threshold Checks
  // 1. CBDT Circular 08/2013: Landlord PAN mandate if annual rent > ₹1,00,000
  const requiresLandlordPan = totalRentPaid > 100000;
  if (requiresLandlordPan) {
    calculationWarnings.push(
      'Annual rent exceeds ₹1,00,000. Under CBDT Circular 08/2013 and Section 206AA, you must submit your landlord\'s PAN in Form 12BB to your employer.'
    );
  }

  // 2. Section 194-IB: Mandatory TDS @ 2% if monthly rent > ₹50,000 (Finance (No. 2) Act 2024 parity)
  const requiresSection194IB = monthlyRent > 50000;
  const monthlyTds194IB = requiresSection194IB ? Math.round(monthlyRent * 0.02) : 0;
  const annualTds194IB = requiresSection194IB ? Math.round(monthlyTds194IB * avgMonths) : 0;
  if (requiresSection194IB) {
    calculationWarnings.push(
      `Monthly rent of ₹${monthlyRent.toLocaleString('en-IN')} exceeds ₹50,000. Under Section 194-IB, you must deduct TDS @ 2% (₹${monthlyTds194IB.toLocaleString('en-IN')}/month) and deposit it online using Form 26QC within 30 days.`
    );
  }

  // 3. Rent <= 10% of salary
  if (totalRentPaid <= totalEligibleSalary * 0.1 && totalRentPaid > 0) {
    calculationWarnings.push(
      'Your annual rent paid is equal to or less than 10% of your eligible salary. Under Rule 2A, Limit B is ₹0, which means no HRA exemption can be claimed.'
    );
  }

  // 4. Section 80GG Fallback (When HRA received is ₹0)
  let section80GGEstimate = null;
  if (totalHraReceived === 0 && totalRentPaid > 0) {
    const maxMonthlyCap = 5000;
    const maxAnnualCap = maxMonthlyCap * avgMonths;
    const incomeBasis = totalEligibleSalary > 0 ? totalEligibleSalary : totalRentPaid * 2;
    const twentyFivePercent = Math.round(incomeBasis * 0.25);
    const excessTenPercent = Math.max(0, Math.round(totalRentPaid - incomeBasis * 0.1));
    const annual80GG = Math.min(maxAnnualCap, twentyFivePercent, excessTenPercent);
    const monthly80GG = Math.round(annual80GG / avgMonths);

    section80GGEstimate = {
      isEligible: annual80GG > 0,
      annualDeduction: annual80GG,
      monthlyDeduction: monthly80GG,
      description: 'Deduction under Section 80GG for individuals not receiving HRA from an employer',
    };

    calculationWarnings.push(
      'You did not receive any HRA from an employer. While Section 10(13A) is not applicable, you may be eligible to claim rent deduction under Section 80GG (up to ₹60,000/year).'
    );
  }

  // Estimated Tax Saved across tax brackets
  const taxSavedAt30Percent = Math.round(totalExemptHra * 0.312);
  const taxSavedAt20Percent = Math.round(totalExemptHra * 0.208);
  const taxSavedAt10Percent = Math.round(totalExemptHra * 0.104);
  const minRentForExemption = Math.round(totalEligibleSalary * 0.1);

  return {
    financialYear,
    assessmentYear,
    taxRegime: 'old',
    calculationMode,
    summary: {
      totalHraReceived: Math.round(totalHraReceived),
      totalEligibleSalary: Math.round(totalEligibleSalary),
      totalRentPaid: Math.round(totalRentPaid),
      totalLimitA: Math.round(totalLimitA),
      totalLimitB: Math.round(totalLimitB),
      totalLimitC: Math.round(totalLimitC),
      totalExemptHra: Math.round(totalExemptHra),
      totalTaxableHra: Math.round(totalTaxableHra),
      monthlyExemptHra,
      monthlyTaxableHra,
      monthlyHraReceived,
      monthlyRent,
      requiresLandlordPan,
      requiresSection194IB,
      monthlyTds194IB,
      annualTds194IB,
      section80GGEstimate,
      estimatedTaxSaved: taxSavedAt30Percent,
      taxSavedAt30Percent,
      taxSavedAt20Percent,
      taxSavedAt10Percent,
      minRentForExemption,
      limitingFactor: overallGoverningLimit,
    },
    breakdown: processedPeriods,
    calculationWarnings,
    statutoryNotes,
  };
}
