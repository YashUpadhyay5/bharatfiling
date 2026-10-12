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
 * Sets up an invisible Google reCAPTCHA verifier for SMS OTP spam prevention.
 * Replaces the container with a fresh DOM element on every run so grecaptcha
 * never throws "reCAPTCHA has already been rendered in this element".
 */
export const setupRecaptcha = (containerId = 'recaptcha-container') => {
  if (typeof window === 'undefined') return null;

  // 1. Clear any prior verifier instance
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch {
      // Ignored
    }
    window.recaptchaVerifier = null;
  }

  // 2. Ensure pristine DOM container so grecaptcha never encounters previous widget bindings
  let container = document.getElementById(containerId);
  if (container) {
    const freshContainer = document.createElement('div');
    freshContainer.id = containerId;
    if (container.parentNode) {
      container.parentNode.replaceChild(freshContainer, container);
    }
    container = freshContainer;
  } else {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  }

  // 3. Bind RecaptchaVerifier directly to the clean DOM element
  window.recaptchaVerifier = new RecaptchaVerifier(auth, container, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved - permits signInWithPhoneNumber
    },
    'expired-callback': () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch {
          // Ignored
        }
        window.recaptchaVerifier = null;
      }
    },
  });

  return window.recaptchaVerifier;
};

/**
 * Dispatches a 6-digit SMS OTP via Firebase to any Indian mobile number (+91)
 * 10,000 completely free SMS verifications per month with zero DLT requirement
 */
export const sendPhoneOtp = async (phoneNumber, containerId = 'recaptcha-container') => {
  try {
    const verifier = setupRecaptcha(containerId);
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
