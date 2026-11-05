import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

const PROOF_TTL_SECONDS = 24 * 60 * 60;
const PROOF_AUDIENCE = 'phone-proof';

export const MOBILE_RE = /^[6-9]\d{9}$/;

/** '+91 98765 43210' -> '9876543210' */
export const normalizeMobile = (value) => String(value ?? '').replace(/\D/g, '').slice(-10);

/**
 * Proof that the holder received an OTP on this mobile number.
 * Signed with OTP_PEPPER, not JWT_SECRET, so it can never pass as a login token.
 */
export const issuePhoneProof = (phone) => ({
  phone_proof: jwt.sign({ phone }, ENV.OTP_PEPPER, {
    algorithm: 'HS256',
    audience: PROOF_AUDIENCE,
    expiresIn: PROOF_TTL_SECONDS,
  }),
  expires_at: new Date(Date.now() + PROOF_TTL_SECONDS * 1000).toISOString(),
});

/** The mobile number a proof was issued for, or null if it is missing, forged or expired. */
export const readPhoneProof = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, ENV.OTP_PEPPER, { algorithms: ['HS256'], audience: PROOF_AUDIENCE }).phone || null;
  } catch {
    return null;
  }
};
