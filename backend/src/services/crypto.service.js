import crypto from 'crypto';
import { ENV } from '../config/env.js';

export const cryptoService = {
  /**
   * Generates a cryptographically strong 6-digit numeric OTP (100000 - 999999)
   */
  generateNumericOtp() {
    return String(crypto.randomInt(100000, 1000000));
  },

  /**
   * Generates a keyed HMAC-SHA256 hash of an OTP bound to email, purpose, and transaction
   */
  createOtpHmac(otp, email, purpose, txnId) {
    const normalizedEmail = email.toLowerCase().trim();
    const dataString = `${otp}:${normalizedEmail}:${purpose}:${txnId}`;
    return crypto
      .createHmac('sha256', ENV.OTP_PEPPER)
      .update(dataString)
      .digest('hex');
  },

  /**
   * Constant-time verification of candidate OTP against stored HMAC
   */
  verifyOtpHmac(candidateOtp, storedHmac, email, purpose, txnId) {
    if (!candidateOtp || !storedHmac) return false;
    const candidateHmac = this.createOtpHmac(candidateOtp, email, purpose, txnId);

    try {
      const candidateBuffer = Buffer.from(candidateHmac, 'hex');
      const storedBuffer = Buffer.from(storedHmac, 'hex');

      if (candidateBuffer.length !== storedBuffer.length) {
        return false;
      }
      return crypto.timingSafeEqual(candidateBuffer, storedBuffer);
    } catch {
      return false;
    }
  },

  /**
   * Generates a secure random hex token (for reset_token and txn_id)
   */
  generateSecureToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  },
};
