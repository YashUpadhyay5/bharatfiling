import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/919876543210?text=Hi%20BharatFiling%20Team%2C%20I%20need%20professional%20CA%20and%20business%20compliance%20advisory.';

// Scales with BOTH width and height, so the whole hero fits the first screen on short laptops.
const HEADLINE_SIZE = 'clamp(2rem, min(4.6vw, 7.4vh) + 0.25rem, 4.5rem)';

const TRUST_POINTS = ['40+ CA & Legal Services', '100% Online & Paperless', 'Licensed CA Verification', 'Bank-Grade 256-Bit Security'];

const rise = (ms) => ({ '--bf-delay': `${ms}ms` });

/**
 * Home hero - one focal point: a confident headline, a short line of copy, two actions and a quiet
 * trust line. Everything sits inside the first screen below the 68px header.
 */
export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-100 bg-gradient-to-b from-[#F4F7FC] to-white lg:flex lg:min-h-[calc(100svh-68px)] lg:items-center">
      {/* one soft colour wash behind the headline - nothing else competes with the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[520px] w-[min(1100px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,101,34,0.10),rgba(37,99,235,0.07)_55%,transparent)] blur-2xl"
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-12 text-center sm:px-8 sm:py-16 lg:py-10">
        <p
          className="bf-rise inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
          style={rise(0)}
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
          India's Premier CA, Finance &amp; Legal Advisory Platform
        </p>

        <h1
          className="bf-rise mt-[clamp(18px,3.2vh,30px)] text-balance font-extrabold leading-[1.04] tracking-[-0.035em] text-[#0B1B2B]"
          style={{ ...rise(80), fontSize: HEADLINE_SIZE }}
        >
          Complete CA, Finance &amp;
          <br className="hidden sm:inline" /> Legal Advisory
          <br className="hidden sm:inline" />{' '}
          <span className="relative inline-block whitespace-nowrap">
            <span className="bg-gradient-to-r from-[#F26522] to-[#F59E0B] bg-clip-text pb-[0.08em] text-transparent">
              All in One Platform
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              className="absolute -bottom-[0.06em] left-[2%] h-[0.16em] w-[96%] text-[#F26522]/30"
            >
              <path d="M3 9 C 70 2, 170 1, 297 6" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p
          className="bf-rise mt-[clamp(14px,2.6vh,24px)] max-w-2xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg"
          style={rise(160)}
        >
          Company registration, GST &amp; ITR filing, bookkeeping and MCA compliance — handled end-to-end by
          licensed Chartered Accountants, 100% online.
        </p>

        <div
          className="bf-rise mt-[clamp(20px,3.6vh,34px)] flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          style={rise(240)}
        >
          <Link
            to="/services"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#062A4D] px-7 py-4 text-[15px] font-bold text-white shadow-[0_16px_32px_-14px_rgba(6,42,77,0.8)] transition hover:-translate-y-0.5 hover:bg-[#0B3A66] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062A4D]"
          >
            Explore All 40+ CA &amp; Tax Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-[15px] font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062A4D]"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            Talk to CA on WhatsApp
          </a>
        </div>

        <ul
          className="bf-rise mt-[clamp(20px,3.6vh,34px)] flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] text-slate-500 sm:gap-x-7 sm:text-[13px]"
          style={rise(320)}
        >
          {TRUST_POINTS.map((label) => (
            <li key={label} className="flex items-center gap-1.5 whitespace-nowrap">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
