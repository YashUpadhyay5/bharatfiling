import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  FileCheck2,
  Activity,
  Award,
} from 'lucide-react';

export default function OnboardingHero({ currentStep = 1 }) {
  return (
    <div className="lg:col-span-6 p-6 sm:p-10 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#111827] text-[11px] font-bold">
            <Sparkles className="w-3 h-3 text-[#F26522]" />
            Fast-Track 2026 Portal Filing
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
            Start Your GST Registration Instantly
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Get your business GST-ready quickly with BharatFiling. Expert team and advanced software ensure accurate, fully online GST registration anywhere in India.
          </p>
        </div>

        {/* 5 Distinctive Bullet Items */}
        <div className="space-y-3.5 pt-1 text-xs text-slate-700 font-medium">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#111827] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <span>Complete application preparation</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#111827] flex items-center justify-center shrink-0">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
            </div>
            <span>Instant TRN generation</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#111827] flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4 text-amber-600" />
            </div>
            <span>ARN generation & fast-track desk</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#111827] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <span>Official GST Certificate (Form REG-06)</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-[#111827] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#F26522]" />
            </div>
            <span>BharatFiling compliance software access</span>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="pt-8 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold text-slate-700">
          Step {currentStep} of 2: {currentStep === 1 ? 'Applicant & PAN' : 'Jurisdiction & Business'}
        </span>
        <div className="flex items-center gap-1.5">
          <span className={`w-6 h-1.5 rounded-full ${currentStep >= 1 ? 'bg-[#111827]' : 'bg-slate-200'}`} />
          <span className={`w-6 h-1.5 rounded-full ${currentStep === 2 ? 'bg-[#111827]' : 'bg-slate-200'}`} />
        </div>
      </div>
    </div>
  );
}
