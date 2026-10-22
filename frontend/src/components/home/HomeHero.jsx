import React from 'react';
import { SERVICES } from '../../data/serviceCatalog.js';
import { CheckCircle2, Sparkles } from 'lucide-react';
import HeroSearch from './HeroSearch.jsx';
import IndustryDeck from './IndustryDeck.jsx';

// Scales with BOTH width and height, so the whole hero fits the first screen on short laptops.
// Phones/tablets use the centred stack; from lg the text column is ~55% wide, so the size is capped lower.
const HEADLINE_SIZE = 'clamp(2rem, min(4.6vw, 7.4vh) + 0.25rem, 4.5rem)';
const HEADLINE_SIZE_LG = 'clamp(2.25rem, min(3.5vw, 6.6vh) + 0.2rem, 3.4rem)';
// Wide screens at 100% zoom (1700px+): the hero spans the header's width, so type scales up too.
const HEADLINE_SIZE_XL = 'clamp(3.4rem, min(3.5vw, 7vh), 4.5rem)';

const TRUST_POINTS = [`${SERVICES.length} CA & Legal Services`, '100% Online & Paperless', 'Licensed CA Verification', 'Encrypted Document Uploads'];

const rise = (ms) => ({ '--bf-delay': `${ms}ms` });

/**
 * Home hero. Left: headline, copy, service search with quick picks, trust line. Right (lg+): the
 * industry solutions as a 3D card deck. Everything sits inside the first screen below the 68px header.
 * Below lg the deck is hidden (the full carousel section follows the hero on small screens).
 */
export default function HomeHero() {
  return (
    <section className="relative isolate z-10 border-b border-slate-100 bg-gradient-to-b from-[#F4F7FC] to-white lg:flex lg:min-h-[calc(100svh-68px)] lg:items-center">
      {/* one soft colour wash behind the headline - nothing else competes with the copy */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bf-parallax absolute inset-0">
          <div className="bf-drift-a absolute left-[4%] top-[2%] h-[520px] w-[680px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.14),transparent)]" />
          <div className="bf-drift-b absolute right-[2%] top-[18%] h-[500px] w-[660px] rounded-full bg-[radial-gradient(closest-side,rgba(242,101,34,0.14),transparent)]" />
        </div>
        {/* fine top highlight so the hero meets the navy header crisply */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-8 xl:gap-16 3xl:max-w-[1760px] 3xl:gap-24">
      <div className="hero-copy flex flex-col items-center text-center lg:items-start lg:text-left">
        <p
          className="bf-rise bf-ring inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur 3xl:px-5 3xl:py-2 3xl:text-[13.5px] [--bf-ring-opacity:0.55] [--bf-ring-width:1px]"
          style={rise(0)}
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
          India's Premier CA, Finance &amp; Legal Advisory Platform
        </p>

        <h1
          className="bf-rise mt-[clamp(18px,3.2vh,30px)] text-balance text-[length:var(--hl)] font-extrabold lg:text-[length:var(--hl-lg)] 3xl:text-[length:var(--hl-xl)] leading-[1.04] tracking-[-0.035em] text-[#0B1B2B]"
          style={{ ...rise(80), '--hl': HEADLINE_SIZE, '--hl-lg': HEADLINE_SIZE_LG, '--hl-xl': HEADLINE_SIZE_XL }}
        >
          Complete CA, Finance &amp;
          <br className="hidden sm:inline" /> Legal Advisory
          <br className="hidden sm:inline" />{' '}
          <span className="relative inline-block whitespace-nowrap">
            <span className="bf-text-shine pb-[0.08em]">
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
          className="bf-rise mt-[clamp(14px,2.6vh,24px)] max-w-2xl text-balance text-base leading-relaxed text-slate-600 sm:text-lg lg:max-w-xl lg:text-[17px] 3xl:max-w-2xl 3xl:text-[20px]"
          style={rise(160)}
        >
          Company registration, GST &amp; ITR filing, bookkeeping and MCA compliance — handled end-to-end by
          licensed Chartered Accountants, 100% online.
        </p>

        <div className="bf-rise mt-[clamp(20px,3.6vh,32px)] flex w-full justify-center lg:justify-start" style={rise(240)}>
          <HeroSearch />
        </div>

        <ul
          className="bf-rise mt-[clamp(18px,3.2vh,30px)] flex flex-wrap justify-center gap-x-4 gap-y-2 text-[12px] text-slate-500 sm:gap-x-7 sm:text-[13px] lg:grid lg:grid-cols-2 lg:justify-items-start lg:gap-x-10 lg:gap-y-2 lg:text-[12.5px] 3xl:gap-x-14 3xl:gap-y-3 3xl:text-[15px]"
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

      {/* industry solutions deck (laptops and up) */}
      <div className="bf-rise hidden justify-center lg:flex lg:justify-end" style={rise(300)}>
        <IndustryDeck />
      </div>
      </div>
    </section>
  );
}
