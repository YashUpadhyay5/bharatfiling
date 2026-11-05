import { MOBILE_RE, normalizeMobile, readPhoneProof } from '../services/phoneProof.service.js';

const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH']);

// Everything else under /api/v1 is a service flow. Listing the exceptions means a new flow is protected
// as soon as it is mounted. Auth has its own OTP, and a support callback must work when OTP does not.
const EXEMPT_AREAS = new Set(['auth', 'phone-verification', 'profile', 'support', 'ca', 'admin']);

// The flows name this field differently: phone, customerPhone, applicantPhone, mobile_number ...
const PHONE_FIELD = /^((customer|applicant|contact)_?)?(phone|mobile)(_?number)?$/i;

/**
 * A service flow only accepts a mobile number the customer has proved with an OTP. Mount at /api/v1.
 * Answers 428 with the number to verify; the frontend then opens the OTP dialog and retries the request.
 */
export const requirePhoneProof = (req, res, next) => {
  if (!WRITE_METHODS.has(req.method) || EXEMPT_AREAS.has(req.path.split('/')[1])) return next();

  const provenPhone = readPhoneProof(req.get('x-phone-proof'));
  const phone = Object.entries(req.body || {})
    .filter(([key, value]) => PHONE_FIELD.test(key) && value)
    .map(([, value]) => normalizeMobile(value))
    .find((claimed) => claimed !== provenPhone);
  if (phone === undefined) return next();

  return res.status(428).json({
    success: false,
    code: 'PHONE_VERIFICATION_REQUIRED',
    phone: MOBILE_RE.test(phone) ? phone : undefined,
    message: 'Please verify your mobile number with the OTP to continue.',
  });
};
