import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import HeroSearch from './HeroSearch.jsx';

// Scales with BOTH width and height, so the whole hero fits the first screen on short laptops.
const HEADLINE_SIZE = 'clamp(2rem, min(4.6vw, 7.4vh) + 0.25rem, 4.5rem)';

const TRUST_POINTS = ['40+ CA & Legal Services', '100% Online & Paperless', 'Licensed CA Verification', 'Bank-Grade 256-Bit Security'];

const rise = (ms) => ({ '--bf-delay': `${ms}ms` });

/**
 * Home hero - one focal point: a confident headline, a short line of copy, the service search with
 * quick picks, and a quiet trust line. Everything sits inside the first screen below the 68px header.
 */
export default function HomeHero() {
  return (
    <section className="relative isolate z-10 border-b border-slate-100 bg-gradient-to-b from-[#F4F7FC] to-white lg:flex lg:min-h-[calc(100svh-68px)] lg:items-center">
      {/* one soft colour wash behind the headline - nothing else competes with the copy */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[38%] h-[520px] w-[min(1100px,120vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(242,101,34,0.10),rgba(37,99,235,0.07)_55%,transparent)] blur-2xl" />
      </div>

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

        <div className="bf-rise mt-[clamp(20px,3.6vh,34px)] flex w-full justify-center" style={rise(240)}>
          <HeroSearch />
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
