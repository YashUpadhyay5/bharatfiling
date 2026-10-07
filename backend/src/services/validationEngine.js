export const validatePAN = (pan) => {
  if (!pan || typeof pan !== 'string') return { valid: false, error: 'PAN is required' };
  const upper = pan.trim().toUpperCase();
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(upper)) {
    return { valid: false, error: 'Invalid PAN format. Must be 10 characters (e.g. ABCDE1234F)' };
  }
  const entityChar = upper[3];
  const entityMap = {
    P: 'Individual / Proprietor',
    C: 'Company',
    H: 'HUF',
    F: 'Partnership Firm / LLP',
    A: 'AOP',
    T: 'Trust',
    B: 'BOI',
    L: 'Local Authority',
    J: 'Artificial Juridical Person',
    G: 'Government',
  };
  return {
    valid: true,
    pan: upper,
    entity_type: entityMap[entityChar] || 'Entity',
  };
};

export const validateAadhaar = (aadhaar) => {
  if (!aadhaar || typeof aadhaar !== 'string') return { valid: false, error: 'Aadhaar is required' };
  const clean = aadhaar.replace(/\s+/g, '');
  if (!/^\d{12}$/.test(clean)) {
    return { valid: false, error: 'Aadhaar must be exactly 12 digits' };
  }
  // Check not repeating like 000000000000
  if (/^(\d)\1{11}$/.test(clean)) {
    return { valid: false, error: 'Aadhaar number appears invalid (repeating digits)' };
  }
  return { valid: true, aadhaar: clean };
};

export const validatePincode = (pincode) => {
  if (!pincode) return { valid: false, error: 'PIN Code is required' };
  const clean = String(pincode).trim();
  if (!/^[1-9][0-9]{5}$/.test(clean)) {
    return { valid: false, error: 'PIN code must be a valid 6-digit Indian postal code' };
  }
  return { valid: true, pincode: clean };
};

export const validateIFSC = (ifsc) => {
  if (!ifsc) return { valid: false, error: 'IFSC is required' };
  const clean = String(ifsc).trim().toUpperCase();
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(clean)) {
    return { valid: false, error: 'Invalid IFSC format (e.g. HDFC0001234, SBIN0004567)' };
  }
  return { valid: true, ifsc: clean };
};

export const validateMobile = (mobile) => {
  if (!mobile) return { valid: false, error: 'Mobile number is required' };
  const clean = String(mobile).replace(/\D/g, '');
  if (!/^[6-9]\d{9}$/.test(clean)) {
    return { valid: false, error: 'Mobile number must be a valid 10-digit Indian number' };
  }
  return { valid: true, mobile: clean };
};

// Cross-field mismatch detector: Compares extracted document data with form inputs
export const detectCrossFieldMismatches = (formData = {}, extractedDocs = []) => {
  const issues = [];

  // Find extracted PAN and Aadhaar if available
  const panDoc = extractedDocs.find(
    (d) => d.document_type === 'PAN_CARD' || d.document_type === 'PAN_CARD_FIRM' || d.document_type === 'PAN_CARD_COMPANY'
  );
  const aadhaarDoc = extractedDocs.find((d) => d.document_type === 'AADHAAR_CARD');

  // Check 1: Name comparison
  const formName = (formData.applicant_name || formData.full_name || '').trim().toLowerCase();
  const panName = panDoc?.ocr_extracted_data?.name?.trim().toLowerCase();
  const aadhaarName = aadhaarDoc?.ocr_extracted_data?.name?.trim().toLowerCase();

  if (panName && formName && !isNameCloseMatch(formName, panName)) {
    issues.push({
      field: 'applicant_name',
      doc_value: panDoc.ocr_extracted_data.name,
      form_value: formData.applicant_name || formData.full_name,
      message: `Potential Name Mismatch: Name on PAN card ("${panDoc.ocr_extracted_data.name}") does not closely match application name ("${formData.applicant_name || formData.full_name}"). CA review required.`,
      severity: 'WARNING',
    });
  }

  if (panName && aadhaarName && !isNameCloseMatch(panName, aadhaarName)) {
    issues.push({
      field: 'identity_mismatch',
      doc_value: `PAN: ${panDoc.ocr_extracted_data.name} | Aadhaar: ${aadhaarDoc.ocr_extracted_data.name}`,
      form_value: formData.applicant_name || formData.full_name,
      message: `Discrepancy Between Documents: Name on PAN card ("${panDoc.ocr_extracted_data.name}") differs from Aadhaar card ("${aadhaarDoc.ocr_extracted_data.name}").`,
      severity: 'WARNING',
    });
  }

  // Check 2: Date of Birth check
  const formDob = formData.dob;
  const panDob = panDoc?.ocr_extracted_data?.dob;
  if (formDob && panDob && formDob !== panDob) {
    issues.push({
      field: 'dob',
      doc_value: panDob,
      form_value: formDob,
      message: `DOB Mismatch: Application DOB (${formDob}) differs from PAN card DOB (${panDob}).`,
      severity: 'WARNING',
    });
  }

  // Check 3: PAN number match
  const formPan = (formData.pan_number || '').toUpperCase();
  const extractedPan = panDoc?.ocr_extracted_data?.pan_number?.toUpperCase();
  if (formPan && extractedPan && formPan !== extractedPan) {
    issues.push({
      field: 'pan_number',
      doc_value: extractedPan,
      form_value: formPan,
      message: `PAN Number Mismatch: Number on uploaded card (${extractedPan}) does not match entered PAN (${formPan}).`,
      severity: 'ERROR',
    });
  }

  return issues;
};

// Fuzzy match helper
function isNameCloseMatch(name1, name2) {
  if (!name1 || !name2) return false;
  if (name1 === name2) return true;
  const words1 = name1.split(/\s+/).filter(Boolean);
  const words2 = name2.split(/\s+/).filter(Boolean);
  // Check if all words of one appear in the other
  const intersection = words1.filter((w) => words2.includes(w));
  return intersection.length >= Math.min(words1.length, words2.length);
}
