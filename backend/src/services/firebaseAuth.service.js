import { ENV } from '../config/env.js';

export const firebaseAuthService = {
  /**
   * Verifies a Firebase ID token by asking Google (Identity Toolkit) to look it up.
   * Google validates the signature, expiry and revocation - we never trust claims we
   * decoded ourselves (an unsigned/forged JWT would otherwise log in as any phone number).
   *
   * Only tokens that carry a verified phone number are accepted.
   */
  async verifyIdToken(idToken) {
    if (!idToken || typeof idToken !== 'string') {
      throw new Error('Firebase ID Token is required');
    }
    if (!ENV.FIREBASE_API_KEY) {
      console.error('[Firebase Auth]: FIREBASE_API_KEY is not configured; phone verification is unavailable.');
      throw new Error('Phone verification is temporarily unavailable.');
    }

    let data = {};
    let ok = false;
    try {
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(ENV.FIREBASE_API_KEY)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        }
      );
      ok = res.ok;
      data = await res.json().catch(() => ({}));
    } catch (err) {
      console.warn('[Firebase IdentityToolkit REST Failed]:', err.message);
      throw new Error('Phone verification is temporarily unavailable.');
    }

    const user = ok && Array.isArray(data.users) ? data.users[0] : null;
    if (!user || !user.phoneNumber) {
      throw new Error('Invalid or expired Firebase phone verification token.');
    }

    return {
      uid: user.localId,
      phone_number: user.phoneNumber,
      email: user.email || null,
      provider: 'firebase-phone',
    };
  },
};
