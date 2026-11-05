import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, KeyRound, Loader2, MessageCircle, RotateCcw, Smartphone, X } from 'lucide-react';
import { api } from '../../services/api.js';
import { whatsappLink } from '../../config/support.js';

const RESEND_SECONDS = 60;

const INTRO = {
  sending: 'Sending a 6-digit code to',
  code: 'Enter the 6-digit code we sent by SMS to',
  failed: 'The code could not be sent to',
};

const displayPhone = (phone) => `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;

const deliver = async (phone) => {
  const started = await api.startPhoneVerification(phone);
  if (started.channel === 'firebase') {
    // Loaded here so the Firebase SDK stays out of the first page load.
    const { sendPhoneOtp } = await import('../../config/firebase.js');
    return { channel: 'firebase', confirmation: await sendPhoneOtp(phone) };
  }
  return { channel: started.channel, txnId: started.txn_id, devOtp: started.dev_otp };
};

// The last code sent. Closing and reopening the dialog (or StrictMode running the effect twice) must not
// send and pay for a second SMS while the first one can still arrive.
let lastSend = null;

const sendCode = (phone, { force = false } = {}) => {
  const fresh = lastSend?.phone === phone && Date.now() - lastSend.at < RESEND_SECONDS * 1000;
  if (fresh && !force) return lastSend;

  const session = deliver(phone);
  const send = { phone, at: Date.now(), session };
  lastSend = send;
  session.catch(() => {
    if (lastSend === send) lastSend = null;
  });
  return send;
};

const secondsLeft = (send) => Math.max(0, Math.ceil((send.at + RESEND_SECONDS * 1000 - Date.now()) / 1000));

const SEND_FAILED = 'We could not send the code right now. Please try again in a few minutes.';

const sendErrorMessage = (err) => {
  if (import.meta.env.DEV) return err.message || SEND_FAILED;
  if (/too many/i.test(err.message || '') || err.status) return err.message || SEND_FAILED;
  return SEND_FAILED; // Firebase setup errors are for us, not for the customer (the details are in the console)
};

const verifyErrorMessage = (err) => {
  if (err.code === 'auth/invalid-verification-code') return 'That code is not correct. Please check the SMS and try again.';
  if (err.code === 'auth/code-expired') return 'This code has expired. Please request a new one.';
  if (String(err.code || '').startsWith('auth/')) return 'We could not verify that code. Please request a new one.';
  return err.status ? err.message : 'We could not verify that code. Please try again.'; // no status: network error
};

export default function PhoneOtpDialog({ phone, onVerified, onCancel }) {
  const [stage, setStage] = useState('sending'); // sending | code | failed
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [devOtp, setDevOtp] = useState('');
  const sessionRef = useRef(null);

  const send = async (options) => {
    setStage('sending');
    setError('');
    setCode('');
    const current = sendCode(phone, options);
    try {
      const session = await current.session;
      sessionRef.current = session;
      setDevOtp(session.devOtp || '');
      setCooldown(secondsLeft(current));
      setStage('code');
    } catch (err) {
      setError(sendErrorMessage(err));
      setStage('failed');
    }
  };

  useEffect(() => {
    send();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((s) => Math.max(0, s - 1)), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onCancel]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (code.length !== 6 || verifying) return;
    setVerifying(true);
    setError('');
    try {
      const session = sessionRef.current;
      let proof;
      if (session.channel === 'firebase') {
        // Kept on the session: a Firebase code works once, so a backend hiccup must not burn it.
        if (!session.idToken) {
          const credential = await session.confirmation.confirm(code);
          session.idToken = await credential.user.getIdToken();
          const { auth } = await import('../../config/firebase.js');
          auth.signOut().catch(() => {}); // only the proof matters; this is not a website login
        }
        proof = await api.verifyPhoneWithFirebase(session.idToken);
      } else {
        proof = await api.verifyPhoneCode({ phone, otp: code, txn_id: session.txnId });
      }
      lastSend = null;
      onVerified(proof);
    } catch (err) {
      setError(verifyErrorMessage(err));
      setCode('');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="phone-otp-title"
      data-phone-otp="off"
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onCancel} />

      <div className="relative w-full max-w-100 bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(17,24,39,0.25)] border border-slate-200/90 z-10 p-5 sm:p-6 space-y-4 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition flex items-center justify-center cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 flex items-center justify-center">
          <Smartphone className="w-5 h-5" aria-hidden="true" />
        </div>

        <div className="space-y-1 pr-8">
          <h2 id="phone-otp-title" className="text-base font-bold text-slate-900">
            Verify your mobile number
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            {INTRO[stage]}{' '}
            <span className="font-bold text-slate-800 whitespace-nowrap">{displayPhone(phone)}</span>
            {'. '}
            <button
              type="button"
              onClick={onCancel}
              className="font-bold text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer"
            >
              Change number
            </button>
          </p>
        </div>

        {error && (
          <div role="alert" className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {error}
          </div>
        )}

        {stage === 'sending' && (
          <div className="flex items-center justify-center gap-2 py-6 text-xs font-medium text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Sending code...
          </div>
        )}

        {stage === 'failed' && (
          <button
            type="button"
            onClick={() => send({ force: true })}
            className="w-full py-3 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Try again
          </button>
        )}

        {stage === 'code' && (
          <form onSubmit={handleVerify} className="space-y-3.5">
            {devOtp && (
              <p className="px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] font-medium text-amber-800">
                Development mode, no SMS is sent. Your code is <strong className="tracking-widest">{devOtp}</strong>
              </p>
            )}

            <div>
              <label htmlFor="phone-otp-code" className="block text-xs font-bold text-slate-700 mb-1.5">
                6-digit code
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" aria-hidden="true" />
                <input
                  id="phone-otp-code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  autoComplete="one-time-code"
                  placeholder="123456"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#111827] focus:outline-hidden text-center text-lg font-mono font-bold tracking-[0.4em]"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={verifying || code.length !== 6}
              className="w-full py-3 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs shadow-md transition disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-[0.99] cursor-pointer"
            >
              {verifying ? 'Verifying...' : 'Verify & Continue'}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="flex justify-end text-[11px]">
              <button
                type="button"
                disabled={cooldown > 0}
                onClick={() => send({ force: true })}
                className={`font-bold flex items-center gap-1 ${
                  cooldown > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer'
                }`}
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
              </button>
            </div>
          </form>
        )}

        <div className="pt-3 border-t border-slate-100 flex justify-center text-[11px]">
          <a
            href={whatsappLink(`Hi BharatFiling Team, I am not receiving the OTP on ${displayPhone(phone)}.`)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 font-bold text-slate-600 hover:text-slate-900"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
            No code? WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}
