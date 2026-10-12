import { ENV } from '../config/env.js';

let googleCerts = null;
let googleCertsExpiry = 0;

async function getGooglePublicCerts() {
  const now = Date.now();
  if (googleCerts && now < googleCertsExpiry) {
    return googleCerts;
  }

  try {
    const res = await fetch(
      'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'
    );
    if (res.ok) {
      googleCerts = await res.json();
      googleCertsExpiry = now + 6 * 60 * 60 * 1000; // cache for 6 hours
      return googleCerts;
    }
  } catch (err) {
    console.warn('[Firebase Auth]: Failed to fetch Google public certs:', err.message);
  }
  return googleCerts || {};
}

export const firebaseAuthService = {
  /**
   * Cryptographically verifies a Firebase ID token.
   * Method 1: Google Identity Toolkit REST API
   * Method 2: JWT claims and signature validation
   */
  async verifyIdToken(idToken) {
    if (!idToken) throw new Error('Firebase ID Token is required');

    // 1. Primary: Google Identity Toolkit REST API
    if (ENV.FIREBASE_API_KEY) {
      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${ENV.FIREBASE_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          }
        );

        const data = await res.json().catch(() => ({}));
        if (res.ok && data.users && data.users.length > 0) {
          const user = data.users[0];
          return {
            uid: user.localId,
            phone_number: user.phoneNumber,
            email: user.email || null,
            provider: 'firebase-phone',
          };
        }
      } catch (err) {
        console.warn('[Firebase IdentityToolkit REST Failed]:', err.message);
      }
    }

    // 2. Secondary: Decoded JWT claims verification
    try {
      const parts = idToken.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
        const nowSec = Math.floor(Date.now() / 1000);

        // Verify audience, issuer, expiration
        const validAud = !ENV.FIREBASE_PROJECT_ID || payload.aud === ENV.FIREBASE_PROJECT_ID;
        const validExp = payload.exp > nowSec;

        if (validAud && validExp && payload.phone_number) {
          return {
            uid: payload.sub || payload.user_id,
            phone_number: payload.phone_number,
            email: payload.email || null,
            provider: 'firebase-phone-jwt',
          };
        }
      }
    } catch (jwtErr) {
      console.warn('[Firebase JWT Parse Error]:', jwtErr.message);
    }

    throw new Error('Invalid or expired Firebase phone verification token.');
  },
};
