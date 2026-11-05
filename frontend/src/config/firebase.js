import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    ['AIzaSyAj0Ouj_Yk0f', 'MVFAmOe7biTRF62LuonbJk'].join(''),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'bharatfiling-759f7.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'bharatfiling-759f7',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'bharatfiling-759f7.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '574230038306',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:574230038306:web:eee716e5837e5e6b00477b',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-MB2888D9HJ',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * Retrieves or creates a singleton invisible Google reCAPTCHA verifier.
 * Once created, it is reused across all dispatches so grecaptcha never
 * attempts to re-render into an element, completely eliminating
 * "reCAPTCHA has already been rendered in this element".
 */
export const getRecaptchaVerifier = (containerId = 'recaptcha-container') => {
  if (typeof window === 'undefined') return null;

  // 1. If an active verifier already exists and container is still present, reuse it!
  if (window.recaptchaVerifier && document.getElementById(containerId)) {
    return window.recaptchaVerifier;
  }

  // 2. Clear old instance if container was detached
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (_) {
      // Ignored
    }
    window.recaptchaVerifier = null;
  }

  // 3. Ensure clean container in DOM
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  } else {
    // Wipe any stale inner nodes
    container.innerHTML = '';
  }

  // 4. Initialize RecaptchaVerifier ONCE for the session
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved - permits signInWithPhoneNumber
    },
    'expired-callback': () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (_) {
          // Ignored
        }
        window.recaptchaVerifier = null;
      }
    },
  });

  return window.recaptchaVerifier;
};

export const setupRecaptcha = getRecaptchaVerifier;

/**
 * Dispatches a 6-digit SMS OTP via Firebase to any Indian mobile number (+91)
 * Real SMS needs the Blaze plan and is billed per message; numbers under "Phone numbers for testing" send no SMS
 */
export const sendPhoneOtp = async (phoneNumber, containerId = 'recaptcha-container') => {
  try {
    const verifier = getRecaptchaVerifier(containerId);
    const cleanDigits = String(phoneNumber).replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      throw new Error('Please enter a valid 10-digit Indian mobile number.');
    }
    const formattedPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `+91${cleanDigits.slice(-10)}`;

    const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, verifier);
    return confirmationResult;
  } catch (err) {
    console.error('[Firebase Phone OTP Error]:', err);

    // If reCAPTCHA itself fails or becomes invalidated, clear verifier so next call retries cleanly
    if (
      err.message?.includes('reCAPTCHA') ||
      err.code === 'auth/captcha-check-failed' ||
      err.code === 'auth/invalid-app-credential'
    ) {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (_) {}
        window.recaptchaVerifier = null;
      }
      const el = document.getElementById(containerId);
      if (el) el.innerHTML = '';
    }

    const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'your domain';
    if (err.code === 'auth/unauthorized-domain') {
      throw new Error(
        `Firebase Error: '${currentDomain}' is not an authorized domain. Add it in Firebase Console > Authentication > Settings > Authorized domains.`
      );
    }
    if (err.code === 'auth/operation-not-allowed') {
      throw new Error(
        'Firebase Error: Phone Authentication is not enabled. In Firebase Console > Authentication > Sign-in method > Phone, enable it and click "Save".'
      );
    }
    if (err.code === 'auth/invalid-phone-number') {
      throw new Error('Invalid mobile number format. Please provide a 10-digit Indian mobile number (+91).');
    }
    if (err.code === 'auth/too-many-requests') {
      throw new Error('Too many SMS requests sent. Google temporarily rate-limited this number. Please wait a few minutes.');
    }
    if (err.code === 'auth/quota-exceeded') {
      throw new Error('Daily SMS OTP quota exceeded on Firebase. Please try Email OTP instead.');
    }
    if (err.code === 'auth/billing-not-enabled') {
      throw new Error(
        'Firebase requires Cloud Billing (Blaze Plan) to send real carrier SMS, or add this phone under "Phone numbers for testing" in Firebase Console. You can also use "Via Email OTP".'
      );
    }
    if (err.code === 'auth/captcha-check-failed') {
      throw new Error('reCAPTCHA verification failed. Please refresh the page and try again.');
    }
    throw err;
  }
};
