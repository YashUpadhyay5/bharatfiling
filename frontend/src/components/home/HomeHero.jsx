import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  FileCheck2,
  FileUp,
  Landmark,
  Lock,
  MessageCircle,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
} from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/919876543210?text=Hi%20BharatFiling%20Team%2C%20I%20need%20professional%20CA%20and%20business%20compliance%20advisory.';

// Headline scales with BOTH width and height, so the whole hero fits the first screen on short laptops.
const HEADLINE_SIZE = 'clamp(1.875rem, min(3.3vw, 6.8vh) + 0.55rem, 3.5rem)';

const TRUST_POINTS = [
  { icon: CheckCircle2, label: '40+ CA & Legal Services' },
  { icon: CheckCircle2, label: '100% Online & Paperless' },
  { icon: CheckCircle2, label: 'Licensed CA Verification' },
  { icon: ShieldCheck, label: 'Bank-Grade 256-Bit' },
];

const rise = (ms) => ({ '--bf-delay': `${ms}ms` });

/* -------------------------------------------------------------------------- */
/* Illustrative product preview (decorative: hidden from assistive tech)       */
/* -------------------------------------------------------------------------- */

const STEPS = [
  { icon: FileUp, label: 'Documents uploaded', note: 'PAN, Aadhaar & address proof', state: 'done' },
  { icon: ScanSearch, label: 'AI document check', note: 'Name & PAN match verified', state: 'done' },
  { icon: UserCheck, label: 'Chartered Accountant review', note: 'Form REG-01 being prepared', state: 'active' },
  { icon: Landmark, label: 'Filed on GST portal', note: 'ARN & GSTIN shared with you', state: 'todo' },
];

function FilingPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[440px]" aria-hidden="true">
      {/* halo */}
      <div className="absolute -inset-8 rounded-[40px] bg-[radial-gradient(60%_60%_at_30%_20%,rgba(37,99,235,0.18),transparent_70%),radial-gradient(55%_55%_at_80%_85%,rgba(242,101,34,0.20),transparent_70%)] blur-2xl" />

      <div className="relative rounded-[28px] bg-white/90 p-5 shadow-[0_40px_90px_-35px_rgba(6,42,77,0.55)] ring-1 ring-slate-200/80 backdrop-blur-xl sm:p-6">
        {/* header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#062A4D] text-white shadow-md shadow-[#062A4D]/30">
              <FileCheck2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[15px] font-bold leading-tight text-slate-900">GST Registration</p>
              <p className="text-xs text-slate-500">Live application tracker</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 ring-1 ring-amber-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            In review
          </span>
        </div>

        {/* progress */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span>Progress</span>
            <span className="text-slate-900">Step 3 of 4</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#F26522] to-[#F59E0B]" />
          </div>
        </div>

        {/* steps */}
        <ol className="mt-5 space-y-3.5">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const tone =
              step.state === 'done'
                ? 'bg-emerald-50 text-emerald-600 ring-emerald-100'
                : step.state === 'active'
                  ? 'bg-orange-50 text-[#F26522] ring-2 ring-orange-200'
                  : 'bg-slate-50 text-slate-400 ring-slate-200';
            return (
              <li key={step.label} className="relative flex items-start gap-3">
                {i < STEPS.length - 1 && (
                  <span
                    className={`absolute left-[17px] top-10 h-[calc(100%-22px)] w-px ${
                      step.state === 'done' ? 'bg-emerald-200' : 'bg-slate-200'
                    }`}
                  />
                )}
                <span className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ${tone}`}>
                  <Icon className="h-[18px] w-[18px]" />
                  {step.state === 'done' && (
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white">
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </span>
                  )}
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className={`text-[13.5px] font-semibold leading-tight ${step.state === 'todo' ? 'text-slate-400' : 'text-slate-900'}`}>
                    {step.label}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{step.note}</p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* footer */}
        <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#062A4D] to-[#1E4E8C] text-[11px] font-bold text-white">
              CA
            </span>
            <div>
              <p className="text-xs font-bold text-slate-900">Your dedicated CA</p>
              <p className="text-[11px] text-slate-500">Licensed Chartered Accountant</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
            <Lock className="h-3.5 w-3.5 text-emerald-600" />
            Encrypted
          </span>
        </div>
      </div>

      {/* floating stats (same figures as the stats strip below the hero) */}
      <div
        className="bf-float absolute -left-8 -top-10 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(6,42,77,0.5)] ring-1 ring-slate-200/80 xl:flex"
        style={rise(-1200)}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <TrendingUp className="h-[18px] w-[18px]" />
        </span>
        <div>
          <p className="text-lg font-extrabold leading-none text-slate-900">99.4%</p>
          <p className="mt-1 text-[11px] text-slate-500">First-pass approval rate</p>
        </div>
      </div>

      <div
        className="bf-float absolute -right-6 bottom-24 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(6,42,77,0.5)] ring-1 ring-slate-200/80 xl:flex"
        style={rise(-2600)}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Clock className="h-[18px] w-[18px]" />
        </span>
        <div>
          <p className="text-lg font-extrabold leading-none text-slate-900">3–7 Days</p>
          <p className="mt-1 text-[11px] text-slate-500">Fast-track govt filings</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Home hero. On laptops and desktops it fills exactly the first screen below the 68px header,
 * with every element (badge -> headline -> copy -> actions -> trust points) visible without scrolling.
 */
export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-100 lg:flex lg:min-h-[calc(100svh-68px)] lg:items-center">
      {/* atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#F3F7FD_0%,#FFFFFF_72%)]" />
        <div className="absolute -left-48 -top-48 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.16),transparent)]" />
        <div className="absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(242,101,34,0.13),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_35%,transparent_80%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-9 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:px-8 lg:py-8 xl:gap-16">
        {/* ---- copy ---- */}
        <div className="flex flex-col items-center gap-[clamp(14px,2.6vh,24px)] text-center lg:items-start lg:text-left">
          <div
            className="bf-rise inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1.5 text-[11px] font-semibold text-[#0B1B2B] shadow-sm backdrop-blur sm:text-xs"
            style={rise(0)}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-500" />
            <span>India's Premier CA, Finance &amp; Legal Advisory Platform</span>
          </div>

          <h1
            className="bf-rise font-extrabold leading-[1.06] tracking-[-0.025em] text-[#0B1B2B]"
            style={{ ...rise(90), fontSize: HEADLINE_SIZE }}
          >
            Complete CA, Finance &amp; Legal Advisory{' '}
            <span className="relative inline-block whitespace-nowrap">
              <span className="bg-gradient-to-r from-[#F26522] via-[#F47B1E] to-[#F59E0B] bg-clip-text pb-1 text-transparent">
                All in One Platform
              </span>
              <svg
                aria-hidden="true"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-[0.18em] w-full text-[#F26522]/35"
              >
                <path d="M3 9 C 70 2, 170 1, 297 6" stroke="currentColor" strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p
            className="bf-rise max-w-[36rem] text-[15px] leading-relaxed text-slate-600 sm:text-[17px]"
            style={rise(180)}
          >
            Incorporate companies, manage corporate tax advisory, file GST &amp; ITR returns, streamline
            bookkeeping, and maintain MCA compliance with AI-powered speed backed by licensed Chartered
            Accountants.
          </p>

          <div className="bf-rise flex w-full flex-col gap-3 sm:w-auto" style={rise(270)}>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#062A4D] px-6 py-3.5 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(6,42,77,0.75)] transition hover:-translate-y-0.5 hover:bg-[#0B3A66] hover:shadow-[0_18px_36px_-12px_rgba(6,42,77,0.8)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062A4D]"
              >
                <Sparkles className="h-4 w-4 shrink-0 text-amber-300" />
                <span>Explore All 40+ CA &amp; Tax Services</span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50/50 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062A4D]"
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>Talk to CA on WhatsApp</span>
              </a>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-1.5 self-center rounded-md text-sm font-semibold text-[#062A4D] transition-colors hover:text-[#F26522] lg:self-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062A4D]"
            >
              Or book a free CA consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ul
            className="bf-rise grid w-full max-w-md grid-cols-2 gap-x-5 gap-y-2 border-t border-slate-200/70 pt-[clamp(12px,2vh,18px)] text-left text-[12.5px] font-medium text-slate-600 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center lg:grid lg:grid-cols-2 lg:justify-start xl:flex xl:flex-nowrap xl:gap-x-3 xl:text-[12px]"
            style={rise(360)}
          >
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5 whitespace-nowrap">
                <Icon className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- visual (laptops and up) ---- */}
        <div className="bf-rise hidden lg:block" style={rise(300)}>
          <FilingPreview />
        </div>
      </div>
    </section>
  );
}
