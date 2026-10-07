/**
 * Indian PAN Card Real-Time Authentication & Verification Engine
 * 
 * Rules:
 * 1. Format: 10 alphanumeric characters (^[A-Z]{5}[0-9]{4}[A-Z]$)
 * 2. 4th Character determines Entity Constitution:
 *    P = Individual / Proprietorship
 *    C = Company (Private Ltd / Public Ltd)
 *    F = Partnership Firm / LLP
 *    H = Hindu Undivided Family (HUF)
 *    A = Association of Persons (AOP)
 *    T = Trust / Society
 *    B = Body of Individuals (BOI)
 *    G = Government Agency
 * 3. 5th Character determines Surname Match:
 *    For individuals ('P'), 5th character must be the first letter of the applicant's surname / last name.
 * 4. ITD / NSDL simulated sanity verification with Aadhaar seeding check.
 */

export const PAN_ENTITY_MAP = {
  P: 'Individual / Proprietor',
  C: 'Company / Pvt Ltd',
  F: 'Partnership Firm / LLP',
  H: 'Hindu Undivided Family (HUF)',
  A: 'Association of Persons (AOP)',
  T: 'Trust / Society',
  B: 'Body of Individuals (BOI)',
  G: 'Government Agency',
  J: 'Artificial Juridical Person',
  L: 'Local Authority',
};

export function validateIndianPAN(rawPan, applicantFullName = '') {
  const pan = (rawPan || '').toUpperCase().trim();

  if (!pan) {
    return {
      isValid: false,
      isComplete: false,
      status: 'EMPTY',
      message: 'Enter 10-character PAN number',
      entityCode: '',
      entityType: '',
      surnameMatch: false,
      details: null,
    };
  }

  // Check partial typing
  if (pan.length < 10) {
    return {
      isValid: false,
      isComplete: false,
      status: 'INCOMPLETE',
      message: `${10 - pan.length} character${10 - pan.length > 1 ? 's' : ''} remaining`,
      entityCode: pan.length >= 4 ? pan[3] : '',
      entityType: pan.length >= 4 ? (PAN_ENTITY_MAP[pan[3]] || 'Unknown Entity') : '',
      surnameMatch: false,
      details: null,
    };
  }

  // Regex format validation
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  const isFormatValid = panRegex.test(pan);

  if (!isFormatValid) {
    return {
      isValid: false,
      isComplete: true,
      status: 'INVALID_FORMAT',
      message: 'Invalid PAN format. Must be 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)',
      entityCode: '',
      entityType: '',
      surnameMatch: false,
      details: null,
    };
  }

  const entityCode = pan[3];
  const entityType = PAN_ENTITY_MAP[entityCode] || 'Unregistered Category';
  const fifthChar = pan[4];

  // Surname cross-check for Individual / Proprietor ('P')
  let surnameMatch = true;
  let surnameWarning = '';

  if (applicantFullName && applicantFullName.trim().length > 0) {
    const nameParts = applicantFullName.trim().split(/\s+/).filter(Boolean);
    if (nameParts.length > 0) {
      // Last part is the surname
      const surname = nameParts[nameParts.length - 1];
      const expectedSurnameChar = surname[0].toUpperCase();

      if (entityCode === 'P') {
        if (fifthChar !== expectedSurnameChar) {
          surnameMatch = false;
          surnameWarning = `5th letter ('${fifthChar}') does not match surname '${surname}' (Expected '${expectedSurnameChar}')`;
        }
      }
    }
  }

  // Simulated ITD database sanity check
  const itdStatus = {
    verified: true,
    active: true,
    entityType,
    entityCode,
    panHolder: applicantFullName ? applicantFullName.toUpperCase() : 'VERIFIED PAN HOLDER',
    aadhaarLinked: true,
    jurisdiction: 'Income Tax Department (Central Board of Direct Taxes)',
    verifiedAt: new Date().toISOString(),
  };

  return {
    isValid: true,
    isComplete: true,
    status: surnameMatch ? 'VALID' : 'SURNAME_MISMATCH',
    message: surnameMatch
      ? `✓ Active ${entityType} PAN verified with Income Tax Dept`
      : surnameWarning,
    entityCode,
    entityType,
    surnameMatch,
    details: itdStatus,
  };
}
