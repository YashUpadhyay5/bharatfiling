import express from 'express';
import { ENV } from '../config/env.js';
import { cryptoService } from '../services/crypto.service.js';
import { firebaseAuthService } from '../services/firebaseAuth.service.js';
import { MOBILE_RE, issuePhoneProof, normalizeMobile } from '../services/phoneProof.service.js';

const router = express.Router();

const DEV_CODE_TTL_MS = 5 * 60 * 1000;
const DEV_CODE_MAX_ATTEMPTS = 5;

// Numbers service pages used to prefill. They can still sit in a returning visitor's saved draft,
// and pressing the button must not text a stranger.
const SAMPLE_NUMBERS = new Set(['7668976193', '9822019482', '9876543210']);

// Local development only: no SMS goes out, so the code is shown in the dialog and logged here.
const devCodes = new Map();

/**
 * POST /api/v1/phone-verification/start
 * Says how the code reaches this number. With Firebase the browser sends the SMS itself (reCAPTCHA is
 * browser-side), so nothing is dispatched from here.
 */
router.post('/start', (req, res) => {
  const phone = normalizeMobile(req.body?.phone);
  if (!MOBILE_RE.test(phone)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid 10-digit mobile number.' });
  }

  if (ENV.IS_PRODUCTION && SAMPLE_NUMBERS.has(phone)) {
    return res.status(400).json({ success: false, message: 'Please enter your own mobile number.' });
  }

  if (ENV.FIREBASE_API_KEY) {
    return res.json({ success: true, channel: 'firebase' });
  }

  if (ENV.IS_PRODUCTION) {
    console.error('[Phone Verification]: FIREBASE_API_KEY is not configured; no OTP can be sent.');
    return res.status(503).json({ success: false, message: 'Mobile verification is temporarily unavailable.' });
  }

  const otp = cryptoService.generateNumericOtp();
  const txn_id = `txn_${cryptoService.generateSecureToken(12)}`;
  devCodes.set(phone, { otp, txn_id, attempts: 0, expires_at: Date.now() + DEV_CODE_TTL_MS });
  console.log(`[DEV PHONE OTP for ${phone}]: ${otp}`);

  return res.json({ success: true, channel: 'dev', txn_id, dev_otp: otp });
});

/**
 * POST /api/v1/phone-verification/verify-firebase
 * Exchanges a Firebase ID token for a phone proof. Only the number Google vouches for counts.
 */
router.post('/verify-firebase', async (req, res) => {
  try {
    const decoded = await firebaseAuthService.verifyIdToken(req.body?.id_token);
    // Checked with the +91 so a foreign number cannot pass for an Indian one ending in the same digits.
    if (!/^\+91[6-9]\d{9}$/.test(decoded.phone_number)) {
      return res.status(400).json({ success: false, message: 'Please verify an Indian mobile number.' });
    }
    const phone = normalizeMobile(decoded.phone_number);
    return res.json({ success: true, phone, ...issuePhoneProof(phone) });
  } catch (err) {
    console.error('[Phone Verification Firebase Error]:', err.message);
    return res.status(400).json({ success: false, message: err.message || 'Failed to verify the code.' });
  }
});

/**
 * POST /api/v1/phone-verification/verify-code
 * Checks a code issued by /start on the development channel.
 */
router.post('/verify-code', (req, res) => {
  const phone = normalizeMobile(req.body?.phone);
  const entry = ENV.IS_PRODUCTION ? null : devCodes.get(phone);

  if (!entry || entry.txn_id !== req.body?.txn_id || Date.now() > entry.expires_at) {
    return res.status(400).json({ success: false, message: 'This code has expired. Please request a new one.' });
  }

  if (String(req.body?.otp ?? '').trim() !== entry.otp) {
    entry.attempts += 1;
    const remaining = DEV_CODE_MAX_ATTEMPTS - entry.attempts;
    if (remaining <= 0) devCodes.delete(phone);
    return res.status(400).json({
      success: false,
      message:
        remaining > 0
          ? `Incorrect code. ${remaining} attempt(s) remaining.`
          : 'Too many incorrect attempts. Please request a new code.',
    });
  }

  devCodes.delete(phone);
  return res.json({ success: true, phone, ...issuePhoneProof(phone) });
});

export default router;
