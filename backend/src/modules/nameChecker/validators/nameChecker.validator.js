/**
 * BharatFiling - Business / Firm Name Checker Request Validator
 */

const VALID_ENTITY_TYPES = [
  'private_limited',
  'public_limited',
  'one_person_company',
  'section_8',
  'llp',
  'partnership',
  'proprietorship',
  'other',
];

const VALID_INDUSTRIES = [
  'technology',
  'ecommerce',
  'finance',
  'healthcare',
  'food',
  'manufacturing',
  'consulting',
  'education',
  'realestate',
  'logistics',
  'general',
];

export function validateNameCheckRequest(body = {}) {
  const errors = [];
  const rawName = typeof body.proposedName === 'string' ? body.proposedName : '';
  const trimmed = rawName.trim();

  // 1. Length & Empty Checks
  if (!trimmed) {
    errors.push('Proposed business name is required.');
  } else if (trimmed.length < 2) {
    errors.push('Proposed business name must contain at least 2 characters.');
  } else if (trimmed.length > 120) {
    errors.push('Proposed business name cannot exceed 120 characters.');
  }

  // 2. Character validity: Must have at least one letter or number
  if (trimmed && !/[a-zA-Z0-9]/.test(trimmed)) {
    errors.push('Proposed name must contain alphabetic characters or words.');
  }

  // 3. Prohibited special characters
  const forbiddenCharsRegex = /[^a-zA-Z0-9\s.,&'/\-()]/;
  if (forbiddenCharsRegex.test(trimmed)) {
    errors.push('Proposed name contains unsupported characters or symbols. Only letters, numbers, spaces, and . , & \' - / ( ) are allowed.');
  }

  // 4. Entity type validation
  const rawEntityType = typeof body.entityType === 'string' ? body.entityType.toLowerCase() : 'private_limited';
  const entityType = VALID_ENTITY_TYPES.includes(rawEntityType) ? rawEntityType : 'private_limited';

  // 5. Industry validation
  const rawIndustry = typeof body.industry === 'string' ? body.industry.toLowerCase() : 'general';
  const industry = VALID_INDUSTRIES.includes(rawIndustry) ? rawIndustry : 'general';

  // 6. Search Options
  const searchOptions = {
    checkMca: body.searchOptions?.checkMca !== false,
    checkTrademark: body.searchOptions?.checkTrademark !== false,
    checkRules: body.searchOptions?.checkRules !== false,
    generateSuggestions: body.searchOptions?.generateSuggestions !== false,
  };

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      proposedName: trimmed,
      entityType,
      industry,
      searchOptions,
    },
  };
}
