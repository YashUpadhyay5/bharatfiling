/**
 * BharatFiling - Professional HRA Calculation Engine
 * Statutory References:
 * - Section 10(13A), Income-tax Act, 1961
 * - Rule 2A, Income-tax Rules, 1962
 * - Gestetner Duplicators Pvt Ltd v. CIT [1979] 117 ITR 1 (SC) (Eligible Salary definition)
 * - Section 115BAC (New Tax Regime restrictions)
 */

export const METRO_CITIES = ['delhi', 'mumbai', 'kolkata', 'chennai'];

export function isMetroCity(cityName) {
  if (!cityName || typeof cityName !== 'string') return false;
  const normalized = cityName.trim().toLowerCase();
  return METRO_CITIES.some((metro) => normalized.includes(metro));
}

export function calculateHraForPeriod({
  months = 1,
  basicSalary = 0,
  da = 0,
  daFormsRetirement = false,
  commission = 0,
  hraReceived = 0,
  rentPaid = 0,
  isMetro = false,
  frequency = 'monthly',
}) {
  // Normalize to period totals
  const multiplier = frequency === 'annual' ? 1 : Math.max(1, months);

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

  return {
    multiplier,
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
    if (calculationMode === 'advanced' && periods.length > 0) {
      totalHraReceived = periods.reduce((sum, p) => sum + (Number(p.hraReceived) || 0) * (Number(p.months) || 1), 0);
    } else {
      const mult = simpleInput.frequency === 'annual' ? 1 : Math.max(1, Number(simpleInput.tenureMonths) || 12);
      totalHraReceived = (Number(simpleInput.hraReceived) || 0) * (simpleInput.frequency === 'annual' ? 1 : mult);
    }

    return {
      financialYear,
      assessmentYear,
      taxRegime: 'new',
      calculationMode,
      summary: {
        totalHraReceived: Math.round(totalHraReceived),
        totalEligibleSalary: 0,
        totalRentPaid: 0,
        totalExemptHra: 0,
        totalTaxableHra: Math.round(totalHraReceived),
        estimatedTaxSaved: 0,
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
      const isMetro = Boolean(period.isMetro || isMetroCity(period.city));
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
    const isMetro = Boolean(simpleInput.isMetro || isMetroCity(simpleInput.city));
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
        city: simpleInput.city || (isMetro ? 'Metro (Delhi/Mumbai/Kolkata/Chennai)' : 'Non-Metro'),
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

  // Statutory Warnings
  if (totalRentPaid > 100000) {
    calculationWarnings.push(
      'Annual rent exceeds ₹1,00,000. Under CBDT Circular 08/2013 and Section 206AA, you must submit your landlord\'s PAN in Form 12BB to your employer.'
    );
  }

  if (totalRentPaid <= totalEligibleSalary * 0.1 && totalRentPaid > 0) {
    calculationWarnings.push(
      'Your annual rent paid is equal to or less than 10% of your eligible salary. Under Rule 2A, Limit B is ₹0, which means no HRA exemption can be claimed.'
    );
  }

  if (totalHraReceived === 0 && totalRentPaid > 0) {
    calculationWarnings.push(
      'You did not receive any HRA from an employer. While Section 10(13A) is not applicable, you may be eligible to claim rent deduction under Section 80GG (up to ₹60,000/year).'
    );
  }

  // Estimated Tax Saved (assuming 30% slab + 4% Health & Education Cess = 31.2%)
  const estimatedTaxSaved = Math.round(totalExemptHra * 0.312);

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
      estimatedTaxSaved,
      limitingFactor: overallGoverningLimit,
    },
    breakdown: processedPeriods,
    calculationWarnings,
    statutoryNotes,
  };
}
