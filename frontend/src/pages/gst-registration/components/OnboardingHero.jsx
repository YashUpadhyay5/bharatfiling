import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  FileCheck2,
  Activity,
  Award,
  Lock,
  BadgeCheck,
} from 'lucide-react';

export default function OnboardingHero({ currentStep = 1, serviceMeta = null }) {
  const meta = serviceMeta || {
    badge: 'Fast-Track 2026 Portal Filing',
    title: 'Start Your GST Registration Instantly',
    desc: 'Get your business GST-ready quickly with BharatFiling. Expert team and advanced software ensure accurate, fully online GST registration anywhere in India.',
    bullets: [
      'Complete application preparation & CA review',
      'Instant TRN generation & identity check',
      '15-Digit statutory ARN filing desk',
      'Official Form REG-06 GST Certificate delivery',
      'Lifetime compliance & filing dashboard access',
    ],
  };

  return (
    <div className="lg:col-span-6 p-5 sm:p-8 lg:p-10 bg-[#111827] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.25),transparent_55%)] border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between text-white">
      <div className="space-y-6">
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-[11px] font-bold backdrop-blur-sm">
            <Sparkles className="w-3 h-3" />
            {meta.badge || 'Fast-Track 2026 Portal Filing'}
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-snug text-white">
            {meta.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {meta.desc}
          </p>
        </div>

        {/* 5 Distinctive Bullet Items */}
        <div className="space-y-3.5 pt-1 text-xs text-slate-200 font-medium">
          {(meta.bullets || []).map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                {i === 0 ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ) : i === 1 ? (
                  <FileCheck2 className="w-4 h-4 text-blue-400" />
                ) : i === 2 ? (
                  <Activity className="w-4 h-4 text-amber-400" />
                ) : i === 3 ? (
                  <Award className="w-4 h-4 text-purple-400" />
                ) : (
                  <Sparkles className="w-4 h-4 text-[#F26522]" />
                )}
              </div>
              <span>{b}</span>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300">
            <Lock className="w-3 h-3 text-emerald-400" /> Encrypted Uploads
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-300">
            <BadgeCheck className="w-3 h-3 text-blue-400" /> CA-Reviewed
          </span>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <span className="font-semibold text-slate-200">
          Step {currentStep} of 2: {currentStep === 1 ? 'Applicant & Identification' : 'Jurisdiction & Package'}
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={`w-6 h-1.5 rounded-full ${currentStep >= 1 ? 'bg-amber-400' : 'bg-white/15'}`} />
          <span className={`w-6 h-1.5 rounded-full ${currentStep === 2 ? 'bg-amber-400' : 'bg-white/15'}`} />
        </div>
      </div>
    </div>
  );
}
