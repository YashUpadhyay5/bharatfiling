/**
 * BharatFiling - HRA Input Validator
 * Validates request structure, prevents negative numbers, validates regimes and periods
 */

export function validateHraPayload(body) {
  const errors = [];

  if (!body || typeof body !== 'object') {
    return { isValid: false, errors: ['Request body must be a valid JSON object.'] };
  }

  const { financialYear, taxRegime, calculationMode, simpleInput, periods } = body;

  // Validate Tax Regime
  if (taxRegime && !['old', 'new'].includes(String(taxRegime).toLowerCase().trim())) {
    errors.push('taxRegime must be either "old" or "new".');
  }

  // Validate Calculation Mode
  if (calculationMode && !['simple', 'advanced'].includes(String(calculationMode).toLowerCase().trim())) {
    errors.push('calculationMode must be either "simple" or "advanced".');
  }

  // If Simple Mode
  if (calculationMode !== 'advanced') {
    const input = simpleInput || {};
    const numericFields = ['basicSalary', 'da', 'commission', 'hraReceived', 'rentPaid'];
    
    for (const field of numericFields) {
      if (input[field] !== undefined && input[field] !== null) {
        const val = Number(input[field]);
        if (isNaN(val)) {
          errors.push(`${field} must be a valid numeric amount.`);
        } else if (val < 0) {
          errors.push(`${field} cannot be negative.`);
        } else if (val > 1000000000) {
          errors.push(`${field} exceeds maximum supported financial limit.`);
        }
      }
    }

    if (input.tenureMonths !== undefined) {
      const months = Number(input.tenureMonths);
      if (isNaN(months) || months < 1 || months > 12) {
        errors.push('tenureMonths must be an integer between 1 and 12.');
      }
    }
  }

  // If Advanced Mode
  if (calculationMode === 'advanced') {
    if (!Array.isArray(periods) || periods.length === 0) {
      errors.push('At least one period is required for advanced multi-period calculation.');
    } else if (periods.length > 24) {
      errors.push('A maximum of 24 periods can be evaluated in a single calculation.');
    } else {
      periods.forEach((p, idx) => {
        const pNum = idx + 1;
        const numericFields = ['basicSalary', 'da', 'commission', 'hraReceived', 'rentPaid'];

        for (const field of numericFields) {
          if (p[field] !== undefined && p[field] !== null) {
            const val = Number(p[field]);
            if (isNaN(val)) {
              errors.push(`Period ${pNum}: ${field} must be a valid numeric amount.`);
            } else if (val < 0) {
              errors.push(`Period ${pNum}: ${field} cannot be negative.`);
            }
          }
        }

        if (p.months !== undefined) {
          const months = Number(p.months);
          if (isNaN(months) || months < 1 || months > 12) {
            errors.push(`Period ${pNum}: months must be an integer between 1 and 12.`);
          }
        }
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
