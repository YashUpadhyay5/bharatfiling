import React from 'react';
import {
  Check,
  Zap,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Award,
  Clock,
} from 'lucide-react';
import { IEC_PLANS } from './constants.js';

export default function IecCheckoutPage({
  formData = {},
  onSelectPlan,
  onBack,
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-16">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-[#022B50] tracking-tight">
              BharatFiling
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-slate-600">
              Select IEC Filing Plan
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% DGFT Approved Process</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        
        {/* Progress & Title */}
        <div className="mb-8 text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Step 3 of 4: Choose Your Package</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Transparent Pricing, No Hidden Statutory Costs
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Select the plan that matches your international trade ambitions. Direct filing with DGFT.
          </p>
        </div>

        {/* 3 Package Cards with Embedded Direct "Proceed to Pay" Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {IEC_PLANS.map((plan) => {
            const isRec = plan.recommended;
            return (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl border transition-all flex flex-col justify-between relative p-6 sm:p-7 shadow-xs ${
                  isRec
                    ? 'border-[#022B50] ring-2 ring-[#022B50]/15 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Recommended Badge */}
                {isRec && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#022B50] text-white text-[11px] font-black uppercase tracking-wider py-1 px-3.5 rounded-full shadow-xs flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="space-y-4">
                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{plan.subtitle}</p>
                  </div>

                  {/* Price Block */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          ₹{plan.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                      {plan.discountLabel && (
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          {plan.discountLabel}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                      <span>+ 18% GST</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 text-slate-600 font-semibold">
                        <Clock className="w-3 h-3" /> {plan.tat}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      What&apos;s Included:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Embedded Action Button on the Card (Preferred User Pattern) */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                      isRec
                        ? 'bg-[#022B50] hover:bg-[#033c70] text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>Proceed to Pay</span>
                    <span>&rarr;</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Back Button */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Details</span>
          </button>
        </div>

      </div>
    </div>
  );
}
