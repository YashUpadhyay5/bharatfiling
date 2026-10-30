import React from 'react';
import { Check } from 'lucide-react';
import { PATENT_CHOOSE_PLANS } from './constants.js';

export default function PatentPlansPage({
  formData = {},
  onBack,
  onSelectPlan,
}) {
  const handleProceed = (plan) => {
    if (onSelectPlan) {
      onSelectPlan({
        ...formData,
        packageId: plan.id,
        packageName: plan.name,
        professionalFee: plan.price,
        originalPrice: plan.originalPrice,
        discountBadge: plan.discountBadge,
        step: 4,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F6F8FA] text-slate-900 font-sans flex flex-col justify-between selection:bg-[#002B49] selection:text-white overflow-x-hidden">
      <div>
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200/90 px-4 sm:px-8 py-3.5 z-20">
          <div className="max-w-[1280px] mx-auto flex items-center justify-between">
            {/* VAKIL SEARCH Logo */}
            <div className="flex items-center select-none cursor-pointer">
              <span className="bg-[#FECB00] text-black font-extrabold px-2.5 py-0.5 tracking-tight text-lg leading-snug">
                VAKIL
              </span>
              <span className="text-black font-extrabold ml-1.5 tracking-tight text-lg leading-snug">
                SEARCH
              </span>
            </div>

            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                &larr; Back
              </button>
            )}
          </div>
        </header>

        {/* Main Plans Area (1:1 with media_1793337748002_17de5977.png) */}
        <main className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">
          {/* Top-Right Decorative Stepped Geometric Polygon Accent */}
          <div className="absolute top-2 right-4 pointer-events-none select-none opacity-30 hidden md:block">
            <svg
              width="90"
              height="90"
              viewBox="0 0 90 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-slate-400"
            >
              <path
                d="M90 0H45V45H0V90H90V0Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Page Heading (1:1 with Screenshot) */}
          <div className="text-center mb-10 pt-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Right plan for Patent Filing
            </h1>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch max-w-5xl mx-auto">
            {PATENT_CHOOSE_PLANS.map((plan) => {
              const isRecommended = plan.recommended;

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl flex flex-col justify-between transition-all ${
                    isRecommended
                      ? 'bg-[#031C38] text-white shadow-xl border border-[#052b57] ring-1 ring-amber-400/30'
                      : 'bg-white text-slate-900 border border-slate-200/90 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Floating Recommended Badge (1:1 with Screenshot) */}
                  {isRecommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FECB00] text-slate-900 font-bold text-xs px-3.5 py-1 rounded-md shadow flex items-center gap-1 z-10">
                      <span>★</span>
                      <span>Recommended</span>
                    </div>
                  )}

                  <div className="p-6 sm:p-7">
                    {/* Plan Title */}
                    <h2
                      className={`text-lg sm:text-xl font-bold mb-1.5 ${
                        isRecommended ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {plan.name}
                    </h2>

                    {/* Plan Subtitle */}
                    <p
                      className={`text-xs leading-relaxed mb-5 min-h-[36px] ${
                        isRecommended ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {plan.subtitle}
                    </p>

                    {/* Price Row (1:1 with Screenshot) */}
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs line-through ${
                            isRecommended ? 'text-slate-400' : 'text-slate-400'
                          }`}
                        >
                          ₹{plan.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          {plan.discountBadge}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`text-3xl sm:text-[32px] font-extrabold tracking-tight ${
                            isRecommended ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          ₹{plan.price.toLocaleString('en-IN')}
                        </span>
                        <span
                          className={`text-xs font-normal ${
                            isRecommended ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          + Govt. Fee
                        </span>
                      </div>

                      {/* EMI Option Pill if applicable */}
                      {plan.hasEmi && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <span
                            className={`border text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isRecommended
                                ? 'border-slate-500 text-slate-300'
                                : 'border-slate-300 text-slate-600'
                            }`}
                          >
                            EMI
                          </span>
                          <span
                            className={`text-xs font-medium ${
                              isRecommended ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            EMI option available.
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Proceed to Pay CTA Button */}
                    <button
                      type="button"
                      onClick={() => handleProceed(plan)}
                      className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all cursor-pointer shadow-sm active:scale-[0.99] mb-6 ${
                        isRecommended
                          ? 'bg-[#FECB00] hover:bg-[#e6b800] text-black font-extrabold'
                          : 'bg-[#002B49] hover:bg-[#001D3D] text-white'
                      }`}
                    >
                      Proceed to Pay
                    </button>

                    {/* Service Includes Header */}
                    <div
                      className={`text-xs font-bold mb-3 ${
                        isRecommended ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Service Includes
                    </div>

                    {/* Feature Checklist (1:1 with Screenshot) */}
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <span className="text-emerald-500 text-sm font-bold shrink-0 leading-tight">
                            ✓
                          </span>
                          <span
                            className={`text-xs leading-relaxed ${
                              isRecommended ? 'text-slate-200' : 'text-slate-600'
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Disclaimer (1:1 with Screenshot) */}
          <div className="text-center mt-12 text-xs text-slate-500">
            Please note: GST will be added during checkout
          </div>
        </main>
      </div>
    </div>
  );
}
