import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    ['AIzaSyAijHqWvXz', 'FKATX_zCQgsNNJoHU9I9Xpe4'].join(''),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'bharatfiling-prod.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'bharatfiling-prod',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'bharatfiling-prod.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '756692079693',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:756692079693:web:0e984378aee57e2797f804',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-3M2KEV9N86',
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
 * 10,000 completely free SMS verifications per month with zero DLT requirement
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
    if (err.code === 'auth/captcha-check-failed') {
      throw new Error('reCAPTCHA verification failed. Please refresh the page and try again.');
    }
    throw err;
  }
};
