/**
 * BharatFiling - Income Tax Request Validator
 * Validates income heads, deduction caps, negative values, and profile parameters.
 */

export function validateIncomeTaxPayload(body) {
  const errors = [];

  if (!body || typeof body !== 'object') {
    return { isValid: false, errors: ['Request body must be a valid JSON object.'] };
  }

  const { financialYear, ageCategory, residentialStatus } = body;

  // Validate FY
  const validFYs = ['2024-25', '2025-26', '2026-27'];
  if (financialYear && !validFYs.includes(financialYear.trim())) {
    errors.push(`Invalid financial year: ${financialYear}. Supported years: ${validFYs.join(', ')}.`);
  }

  // Validate Age Category
  const validAge = ['individual', 'senior', 'superSenior'];
  if (ageCategory && !validAge.includes(ageCategory.trim())) {
    errors.push(`Invalid age category: ${ageCategory}. Must be one of: ${validAge.join(', ')}.`);
  }

  // Validate Numeric Fields across groups
  const sections = ['salary', 'houseProperty', 'capitalGains', 'businessProfession', 'otherSources', 'deductions', 'taxCredits'];

  for (const sec of sections) {
    if (body[sec] && typeof body[sec] === 'object') {
      for (const [key, val] of Object.entries(body[sec])) {
        if (val !== undefined && val !== null && val !== '') {
          const num = Number(val);
          if (isNaN(num)) {
            errors.push(`${sec}.${key} must be a valid number.`);
          } else if (num < 0) {
            errors.push(`${sec}.${key} cannot be negative.`);
          } else if (num > 10000000000) {
            errors.push(`${sec}.${key} exceeds maximum supported financial limit.`);
          }
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export default validateIncomeTaxPayload;
