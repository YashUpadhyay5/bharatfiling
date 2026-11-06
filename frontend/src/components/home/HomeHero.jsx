import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CircleCheck,
  CirclePlay,
  HardHat,
  HeartPlus,
  Rocket,
  ShoppingCart,
  Sparkles,
  Users,
} from 'lucide-react';
import { SERVICES } from '../../data/serviceCatalog.js';
import HeroSearch from './HeroSearch.jsx';
import { INDUSTRY_SOLUTIONS, industryPath } from './industrySolutions.js';

// Scales with BOTH width and height, so the whole hero (cards included) fits the first screen on short laptops.
const HEADLINE_SIZE = 'clamp(2rem, min(4vw, 6.2vh) + 0.3rem, 5rem)';

const TRUST_POINTS = [`${SERVICES.length} CA & Legal Services`, '100% Online & Paperless', 'Licensed CA Verification', 'Encrypted Document Uploads'];

// Hero card look per industry. Titles and links come from industrySolutions.js; the hero uses its own
// short blurb and icon so the cards stay one size.
const CARD_STYLE = {
  'ngo-non-profit': { icon: Users, tile: 'bg-violet-100/80 text-violet-600', blurb: 'Registration, compliance & tax filing for NGOs.' },
  'contractors-infrastructure': { icon: HardHat, tile: 'bg-amber-100/80 text-amber-500', blurb: 'GST, TDS, and compliance support.' },
  'd2c-ecommerce-retail': { icon: ShoppingCart, tile: 'bg-blue-100/80 text-blue-600', blurb: 'Company setup, GST & platform compliance.' },
  'creators-freelancers': { icon: CirclePlay, tile: 'bg-red-100/80 text-red-500', blurb: 'Taxation, income filing & brand compliance.' },
  'tech-startups-saas': { icon: Rocket, tile: 'bg-emerald-100/80 text-emerald-600', blurb: 'Incorporation, ESOP, GST & ongoing compliance.' },
  'real-estate-builders': { icon: Building2, tile: 'bg-teal-100/80 text-teal-600', blurb: 'RERA, GST, TDS, property tax & business accounting.' },
  'doctors-healthcare': { icon: HeartPlus, tile: 'bg-purple-100/80 text-purple-600', blurb: 'Clinic, hospital & medical business compliance.' },
};

const rise = (ms) => ({ '--bf-delay': `${ms}ms` });

// Vertical gaps shrink on short screens so header + hero = one screen.
const GAP = {
  sm: 'mt-[clamp(10px,1.8vh,22px)]',
  md: 'mt-[clamp(14px,2.6vh,32px)]',
  lg: 'mt-[clamp(16px,3.4vh,40px)]',
};

function IndustryCard({ item }) {
  const style = CARD_STYLE[item.id];
  const Icon = style?.icon ?? item.icon;
  return (
    <Link
      to={industryPath(item)}
      className="group flex w-[200px] shrink-0 snap-start flex-col items-center rounded-2xl border border-slate-100 bg-white px-4 py-[clamp(12px,2.2vh,24px)] text-center shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] transition duration-200 hover:-translate-y-1 hover:border-slate-200 hover:shadow-[0_18px_40px_-20px_rgba(15,23,42,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062A4D] xl:w-auto xl:px-3 3xl:px-5"
    >
      <span
        className={`flex size-[clamp(40px,6vh,58px)] items-center justify-center rounded-xl ${style?.tile ?? 'bg-slate-100 text-slate-600'}`}
      >
        <Icon className="size-[55%]" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="mt-[clamp(8px,1.5vh,16px)] whitespace-nowrap text-[15px] font-bold leading-tight tracking-[-0.01em] text-[#0B1B2B] xl:text-[14px] min-[1500px]:text-[15px] 3xl:text-[16.5px]">
        {item.short}
      </span>
      <span className="mt-[clamp(4px,0.9vh,10px)] text-[12.5px] leading-snug text-slate-600 short:hidden 3xl:text-[14px]">
        {style?.blurb ?? item.description}
      </span>
      <span className="mt-auto inline-flex items-center gap-1 pt-[clamp(8px,1.6vh,18px)] text-[13px] font-semibold text-[#1D4ED8] 3xl:text-[14.5px]">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

/**
 * Home hero: badge, centred headline, copy, service search, trust line, "Explore All Services", then the
 * industry cards. From lg, header (68px) + hero fill exactly one screen; the cards sit at the bottom.
 */
export default function HomeHero() {
  return (
    <section className="relative isolate z-10 flex flex-col overflow-hidden border-b border-slate-100 bg-[#F7F9FD] lg:min-h-[calc(100svh-68px)]">
      {/* soft background shapes: peach wash bottom-left, blue wash top-right, two hairline curves */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bf-drift-a absolute -left-[12%] top-[38%] h-[520px] w-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(251,146,60,0.22),transparent)]" />
        <div className="bf-drift-b absolute -right-[8%] -top-[18%] h-[520px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.22),transparent)]" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="none" fill="none">
          <path d="M-20 330 C 260 210, 430 250, 560 205" stroke="rgba(59,130,246,0.22)" strokeWidth="1.5" />
          <path d="M1080 600 C 1260 470, 1420 300, 1620 140" stroke="rgba(59,130,246,0.18)" strokeWidth="1.5" />
          <path d="M-20 640 C 380 560, 1200 560, 1620 640 L 1620 900 L -20 900 Z" fill="rgba(255,255,255,0.55)" />
        </svg>
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 pt-[clamp(14px,2.2vh,24px)] sm:px-6 lg:px-10">
        {/* badge: top-left on laptops, centred on small screens */}
        <p
          className="bf-rise inline-flex items-center gap-2 self-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-[0_6px_20px_-10px_rgba(15,23,42,0.35)] ring-1 ring-slate-100 lg:self-start 3xl:px-5 3xl:py-2 3xl:text-[14px]"
          style={rise(0)}
        >
          <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
          India's Premier CA, Finance &amp; Legal Advisory Platform
        </p>

        {/* copy, search, trust and CTA - centred in the space above the cards */}
        <div className="flex flex-1 flex-col items-center justify-center pb-[clamp(8px,2vh,24px)] pt-[clamp(18px,2.4vh,28px)] text-center lg:pt-0">
          <h1
            className="bf-rise text-balance text-[length:var(--hl)] font-extrabold leading-[1.08] tracking-[-0.035em] text-[#0B1B2B]"
            style={{ ...rise(80), '--hl': HEADLINE_SIZE }}
          >
            Complete CA, Finance &amp; Legal Advisory
            <br />
            <span className="relative inline-block whitespace-nowrap text-[#F26522]">
              All in One Platform
              <svg
                aria-hidden="true"
                viewBox="0 0 120 16"
                className="absolute -bottom-[0.2em] left-[57%] h-[0.22em] w-[0.24em] min-w-[44px] -translate-x-1/2 overflow-visible"
              >
                <path d="M4 4 C 30 16, 90 16, 116 4" stroke="#F26522" strokeWidth="7" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p
            className={`bf-rise ${GAP.md} max-w-[60rem] text-pretty text-[15px] lg:max-w-none leading-relaxed text-slate-600 sm:text-[17px] lg:text-[clamp(16px,2.2vh,19px)] 3xl:text-[21px]`}
            style={rise(160)}
          >
            Company registration, GST &amp; ITR filing, bookkeeping and{' '}
            <strong className="font-semibold text-[#0B1B2B]">MCA compliance</strong> — handled end&#8209;to&#8209;end by{' '}
            <br className="hidden lg:inline" />
            licensed Chartered Accountants, 100% online.
          </p>

          <div className={`bf-rise ${GAP.lg} flex w-full justify-center`} style={rise(240)}>
            <HeroSearch />
          </div>

          <ul
            className={`bf-rise ${GAP.md} flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-slate-700 sm:text-[14px] lg:flex-nowrap lg:gap-0 3xl:text-[17px]`}
            style={rise(320)}
          >
            {TRUST_POINTS.map((label) => (
              <li
                key={label}
                className="flex items-center gap-2 whitespace-nowrap lg:border-l lg:border-slate-300 lg:px-5 lg:first:border-l-0 xl:px-9 3xl:px-12"
              >
                <CircleCheck className="h-5 w-5 shrink-0 fill-emerald-500 text-white" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <Link
            to="/services"
            className={`bf-rise ${GAP.md} group inline-flex items-center gap-2.5 rounded-full bg-[radial-gradient(circle_at_30%_25%,#1E5A96,#062A4D_70%)] px-8 py-[clamp(11px,1.7vh,16px)] text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_14px_30px_-14px_rgba(6,42,77,0.9)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_36px_-14px_rgba(6,42,77,0.95)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062A4D] sm:px-11 sm:text-[17px] 3xl:px-14 3xl:text-[19px]`}
            style={rise(380)}
          >
            Explore All Services
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* industries */}
        <div className="bf-rise pb-[clamp(16px,3vh,32px)]" style={rise(460)}>
          <h2 className="flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.32em] text-[#0B1B2B] sm:gap-6 sm:text-[12.5px] 3xl:text-[14px]">
            <span aria-hidden="true" className="hidden h-px w-24 bg-slate-300/80 sm:block lg:w-32" />
            <span className="flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#F26522]" />
              Solutions for every industry
            </span>
            <span aria-hidden="true" className="hidden h-px w-24 bg-slate-300/80 sm:block lg:w-32" />
          </h2>

          {/* scroll row on phones/tablets/small laptops, seven equal columns from xl */}
          <div className="-mx-4 mt-[clamp(12px,2.2vh,24px)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 pt-1 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 xl:mx-0 xl:grid xl:grid-cols-7 xl:gap-3.5 xl:overflow-visible xl:px-0 3xl:gap-5 [&::-webkit-scrollbar]:hidden">
            {INDUSTRY_SOLUTIONS.map((item) => (
              <IndustryCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
