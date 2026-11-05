import { API_BASE_URL } from '../config/domain.js';

const STORAGE_KEY = 'bharatfiling_phone_proof';
const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH']);

export const MOBILE_RE = /^[6-9]\d{9}$/;

/** '+91 98765 43210' -> '9876543210' */
export const normalizeMobile = (value) => String(value ?? '').replace(/\D/g, '').slice(-10);

// Also kept in memory: if storage is blocked (private mode), a verified number must not be asked for again.
let memoryProof = null;

const readProof = () => {
  let proof = memoryProof;
  try {
    proof = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || memoryProof;
  } catch {
    // storage unavailable
  }
  return proof && new Date(proof.expires_at) > new Date() ? proof : null;
};

export const hasPhoneProof = (phone) => readProof()?.phone === phone;

export const hasAnyPhoneProof = () => Boolean(readProof());

/** Remembers the latest verified number. A different number needs its own OTP. */
export const savePhoneProof = ({ phone, phone_proof, expires_at }) => {
  memoryProof = { phone, phone_proof, expires_at };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryProof));
  } catch {
    // storage unavailable
  }
};

const forgetPhoneProof = () => {
  memoryProof = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage unavailable
  }
};

const isApiWrite = (url, method) =>
  typeof url === 'string' && WRITE_METHODS.has(method) && (url.startsWith(`${API_BASE_URL}/`) || url.startsWith('/api/'));

/**
 * Sends the phone proof with every API write, including the pages that call fetch directly. If the server
 * still answers 428 (saved draft, deep link past the landing page, expired proof), asks for the OTP and retries.
 * Returns the function that undoes this.
 */
export function installPhoneProofFetch(verifyPhone) {
  const originalFetch = globalThis.fetch;
  const realFetch = originalFetch.bind(globalThis);

  const send = (url, options) => {
    const proof = readProof();
    if (!proof) return realFetch(url, options);
    const headers = new Headers(options.headers);
    headers.set('X-Phone-Proof', proof.phone_proof);
    return realFetch(url, { ...options, headers });
  };

  globalThis.fetch = async (url, options = {}) => {
    if (!isApiWrite(url, (options.method || 'GET').toUpperCase())) return realFetch(url, options);

    const res = await send(url, options);
    if (res.status !== 428) return res;

    // The server has the last word: a proof can look fine here yet be refused there (e.g. the secret changed).
    forgetPhoneProof();
    const { phone } = await res.clone().json().catch(() => ({}));
    if (!phone || !(await verifyPhone(phone))) return res;
    return send(url, options);
  };

  return () => {
    globalThis.fetch = originalFetch;
  };
}
