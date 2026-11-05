import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext.jsx';
import {
  MOBILE_RE,
  hasAnyPhoneProof,
  hasPhoneProof,
  installPhoneProofFetch,
  normalizeMobile,
  savePhoneProof,
} from '../../services/phoneProof.js';
import PhoneOtpDialog from './PhoneOtpDialog.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Verifies the mobile number of every form that asks for one, before the page sees the submit. It listens at
 * document level so a service page gets this just by using <form> with <input type="tel">; nothing to wire up.
 * To leave a form or a section out, put data-phone-otp="off" on it.
 *
 * Two more checks catch whatever does not submit a form. A service flow past step 1 sends a browser with no
 * verified number back to the form (plan cards, deep links), and the server refuses an unproven number
 * (backend middleware/phoneProof.js). See otp.md.
 */
export default function PhoneVerificationGate() {
  const { showError } = useToast();
  const showErrorRef = useRef(showError);
  showErrorRef.current = showError;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const step = parseInt(params.get('step') || '1', 10);
    if (step < 2 || !/^\/(services|apply)\//.test(location.pathname) || hasAnyPhoneProof()) return undefined;

    params.set('step', '1'); // the rest of the URL (such as the chosen plan) stays
    navigate({ pathname: location.pathname, search: `?${params}` }, { replace: true });
    showErrorRef.current('Please enter and verify your mobile number to continue.');
    const timer = setTimeout(() => document.querySelector('input[type="tel"]')?.focus(), 150);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search, navigate]);

  const [phoneToVerify, setPhoneToVerify] = useState(null);
  const pending = useRef(null);

  const verifyPhone = useCallback((phone) => {
    if (hasPhoneProof(phone)) return Promise.resolve(true);
    if (pending.current?.phone === phone) return pending.current.promise;

    pending.current?.resolve(false);
    let resolve;
    const promise = new Promise((r) => {
      resolve = r;
    });
    pending.current = { phone, promise, resolve };
    setPhoneToVerify(phone);
    return promise;
  }, []);

  const finish = (verified) => {
    pending.current?.resolve(verified);
    pending.current = null;
    setPhoneToVerify(null);
  };

  useEffect(() => installPhoneProofFetch(verifyPhone), [verifyPhone]);

  useEffect(() => {
    const onSubmit = (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || form.closest('[data-phone-otp="off"]')) return;

      const input = form.querySelector('input[type="tel"]');
      if (!input?.value.trim()) return; // no number: the page's own validation reports it

      // A bad email is the common mistake, so let the page report it now rather than spend an SMS first.
      const email = form.querySelector('input[type="email"]');
      if (email && !EMAIL_RE.test(email.value.trim())) return;

      const phone = normalizeMobile(input.value);
      if (!MOBILE_RE.test(phone)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        showErrorRef.current('Please enter a valid 10-digit mobile number.');
        input.focus();
        return;
      }
      if (hasPhoneProof(phone)) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      verifyPhone(phone).then((verified) => {
        if (verified && form.isConnected) form.requestSubmit?.();
      });
    };

    document.addEventListener('submit', onSubmit, true);
    return () => document.removeEventListener('submit', onSubmit, true);
  }, [verifyPhone]);

  if (!phoneToVerify) return null;

  return (
    <PhoneOtpDialog
      key={phoneToVerify}
      phone={phoneToVerify}
      onVerified={(proof) => {
        savePhoneProof(proof);
        finish(true);
      }}
      onCancel={() => finish(false)}
    />
  );
}
