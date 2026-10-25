import React from 'react';
import {
  ShieldCheck,
  Check,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { GST_PLANS } from '../constants.js';

export default function OnboardingHero({ currentStep = 1, serviceMeta = null }) {
  const meta = serviceMeta || {
    badge: 'Fast-Track 2026 Portal Filing',
    title: 'Start Your GST Registration Instantly',
    desc: 'Get your business GST-ready quickly with BharatFiling. Expert team and advanced software ensure accurate, fully online GST registration anywhere in India.',
  };

  const isGst = !serviceMeta || meta.type === 'GST';

  const scrollToPricing = (e) => {
    e.preventDefault();
    window.location.href = '/services/gst-registration#pricing-tiers';
  };

  // For GST Registration: Clone the exact Left Hero from Image 1
  if (isGst) {
    return (
      <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#042D50] tracking-tight leading-[1.25]">
            Get Your GST Registration{' '}
            <span className="text-[#94A3B8] font-normal block sm:inline">in 24 Hours*</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            Trusted by 5 lakh+ businesses across India for GST registration.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 space-y-6">
          {/* Bullet 1: Trusted Nationwide */}
          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Trusted Nationwide
              </h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed max-w-sm">
                Vakilsearch supports nearly 10% of Indian businesses with compliant filings.
              </p>
            </div>
          </div>

          {/* Bullet 2: 20K+ Google Reviews */}
          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                20K+ Google Reviews
              </h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed max-w-sm">
                Rated 4.5/5 by real customers on Google.
              </p>
            </div>
          </div>

          {/* Bullet 3: Compliance & Expert Support */}
          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Compliance &amp; Expert Support
              </h4>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed max-w-sm">
                Zero-penalty assurance, transparent pricing, and 1-minute expert help.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Non-GST fallback (Company, ITR, Trademark, LLP)
  return (
    <div className="lg:col-span-6 p-5 sm:p-8 lg:p-10 bg-white border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-between">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#111827] text-[11px] font-semibold">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </span>
          <span>Secure, Encrypted Filing Platform</span>
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-snug text-slate-900">
          {meta.title}
        </h1>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {meta.desc}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 border-t border-slate-100 pt-3">
            <span>Reviewed by <strong className="text-slate-700">BharatFiling Compliance Desk</strong></span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Licensed Chartered Accountants</span>
          </div>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
          {(meta.bullets || [
            'Complete application preparation & CA review',
            '100% Online Process with Expert CA Assistance',
            'Zero Government Fees, Transparent Pricing',
          ]).slice(0, 3).map((b, i) => (
            <div key={i} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="pt-6 sm:pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span className="font-semibold text-slate-700">
          Step {currentStep} of 2: {currentStep === 1 ? 'Applicant & Identification' : 'Jurisdiction & Package'}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`w-6 h-1.5 rounded-full ${currentStep >= 1 ? 'bg-[#111827]' : 'bg-slate-200'}`} />
          <span className={`w-6 h-1.5 rounded-full ${currentStep === 2 ? 'bg-[#111827]' : 'bg-slate-200'}`} />
        </div>
      </div>
    </div>
  );
}
