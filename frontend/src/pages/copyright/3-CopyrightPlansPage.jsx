import React from 'react';
import { Check } from 'lucide-react';
import { COPYRIGHT_CHOOSE_PLANS } from './constants.js';

export default function CopyrightPlansPage({
  formData = {},
  onBack,
  onSelectPlan,
}) {
  const selectedTypeTitle =
    formData.categoryTitle ||
    (formData.category === 'software'
      ? 'Software/Website/Apps'
      : formData.category === 'literary'
      ? 'Literary work'
      : formData.category === 'sound_recording'
      ? 'Sound Record'
      : formData.category === 'visual_art'
      ? 'Visual & Performing Art'
      : formData.category === 'motion_picture'
      ? 'Motion Picture'
      : 'Software/Website/Apps');

  const registrationPlan = COPYRIGHT_CHOOSE_PLANS[0];
  const expertPlan = COPYRIGHT_CHOOSE_PLANS[1];

  const handleChoose = (plan) => {
    if (onSelectPlan) {
      onSelectPlan({
        ...formData,
        packageId: plan.id,
        packageName: plan.name,
        professionalFee: plan.price,
        originalPrice: plan.originalPrice,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-900 font-sans flex flex-col justify-between selection:bg-[#002B49] selection:text-white overflow-x-hidden">
      {/* ========================================================= */}
      {/* 1. TOP HEADER (1:1 with media_1793299512438_010db9f1.png)  */}
      {/* ========================================================= */}
      <div>
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
                ← Back
              </button>
            )}
          </div>
        </header>

        {/* ========================================================= */}
        {/* 2. MAIN PLAN SELECTION AREA                               */}
        {/* ========================================================= */}
        <main className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-16">
          {/* Top-Right Decorative Stepped Geometric Polygon */}
          <div className="absolute top-0 right-2 pointer-events-none select-none opacity-40 hidden sm:block">
            <svg
              width="180"
              height="180"
              viewBox="0 0 180 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="110" y="0" width="70" height="70" fill="#E2E8F0" />
              <rect x="50" y="30" width="70" height="70" fill="#CBD5E1" />
              <rect x="110" y="60" width="70" height="70" fill="#94A3B8" opacity="0.3" />
              <rect x="0" y="60" width="50" height="50" fill="#F1F5F9" />
            </svg>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#002B49] tracking-tight">
              Right plan to protect your work
            </h1>

            {/* Selected Type subtitle */}
            <div className="text-xs sm:text-[13px] text-slate-700 font-semibold mt-3">
              Selected Type :{' '}
              <span className="font-bold text-slate-900">{selectedTypeTitle}</span>
            </div>

            {/* 100% Money-Back Guarantee pill */}
            <div className="inline-flex items-center gap-1.5 mt-3 text-xs sm:text-[13px] text-slate-700 font-medium">
              <span className="text-base select-none">🛡️</span>
              <span>100% Money-Back Guarantee</span>
              <a
                href="#terms"
                onClick={(e) => e.preventDefault()}
                className="text-[#0275d8] underline font-semibold cursor-pointer"
              >
                T&amp;C
              </a>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. TWO CARDS (1:1 with Screenshot)                        */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-3xl mx-auto">
            {/* ------------------------------------------------------- */}
            {/* CARD 1: Copyright Registration (Featured Dark Navy)     */}
            {/* ------------------------------------------------------- */}
            <div className="relative bg-[#002B49] text-white rounded-2xl shadow-xl flex flex-col justify-between pt-9 pb-8 px-6 sm:px-7 border border-[#002B49]">
              {/* Top Floating Badge */}
              <div className="absolute -top-3.5 left-5">
                <div className="inline-flex flex-col">
                  <div className="bg-[#FECB00] text-black text-[11px] font-extrabold px-3 py-0.5 rounded-t-md shadow-xs flex items-center gap-1.5 uppercase tracking-tight">
                    <span>{registrationPlan.popularBadge}</span>
                    <span className="text-slate-400">|</span>
                    <span>{registrationPlan.discountPercent}</span>
                  </div>
                  <div className="bg-[#E5B500] text-black text-[8px] font-black px-1.5 py-0.2 rounded-b-xs uppercase tracking-wider text-center">
                    {registrationPlan.limitedOfferBadge}
                  </div>
                </div>
              </div>

              <div>
                {/* Header */}
                <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                  {registrationPlan.name}
                </h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {registrationPlan.tagline}
                </p>

                {/* Pricing Block */}
                <div className="mt-5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 line-through text-xs">
                      ₹{registrationPlan.originalPrice}
                    </span>
                    <span className="bg-[#22C55E]/20 text-[#4ADE80] text-[10px] font-extrabold px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-[#22C55E]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                      {registrationPlan.discountBadge}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-[38px] font-black text-white tracking-tight mt-1 mb-1.5">
                    ₹{registrationPlan.price.toLocaleString('en-IN')}
                  </div>

                  {/* EMI Note */}
                  <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-300">
                    <span className="border border-slate-400/80 rounded px-1 text-[9px] font-bold text-white uppercase">
                      EMI
                    </span>
                    <span>EMI option available.</span>
                  </div>
                </div>

                {/* Proceed to Pay CTA */}
                <button
                  type="button"
                  onClick={() => handleChoose(registrationPlan)}
                  className="w-full bg-[#FECB00] hover:bg-[#F2C000] active:scale-[0.99] text-black font-extrabold text-sm sm:text-[15px] py-3 rounded-lg transition-all shadow-md cursor-pointer mt-2 mb-6"
                >
                  Proceed to Pay
                </button>

                {/* What You'll Get */}
                <div className="border-t border-slate-700/80 pt-5">
                  <h3 className="text-xs sm:text-sm font-bold text-white mb-3">
                    What You&apos;ll Get
                  </h3>
                  <div className="space-y-3">
                    {registrationPlan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5 stroke-[3]" />
                        <span className="text-xs sm:text-[13px] text-slate-200 leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------- */}
            {/* CARD 2: Talk to an Expert (White Background)            */}
            {/* ------------------------------------------------------- */}
            <div className="bg-white text-slate-900 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between pt-9 pb-8 px-6 sm:px-7">
              <div>
                {/* Header */}
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                  {expertPlan.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {expertPlan.tagline}
                </p>

                {/* Pricing Block */}
                <div className="mt-5 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 line-through text-xs">
                      ₹{expertPlan.originalPrice}
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      {expertPlan.discountBadge}
                    </span>
                  </div>

                  <div className="text-3xl sm:text-[38px] font-black text-slate-900 tracking-tight mt-1 mb-1.5">
                    ₹{expertPlan.price.toLocaleString('en-IN')}
                  </div>

                  {/* Spacer to match height */}
                  <div className="text-[11px] text-transparent select-none">
                    spacer
                  </div>
                </div>

                {/* Proceed to Pay CTA */}
                <button
                  type="button"
                  onClick={() => handleChoose(expertPlan)}
                  className="w-full bg-[#002B49] hover:bg-[#003A63] active:scale-[0.99] text-white font-extrabold text-sm sm:text-[15px] py-3 rounded-lg transition-all shadow-sm cursor-pointer mt-2 mb-6"
                >
                  Proceed to Pay
                </button>

                {/* What You'll Get */}
                <div className="border-t border-slate-100 pt-5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-3">
                    What You&apos;ll Get
                  </h3>
                  <div className="space-y-3">
                    {expertPlan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5 stroke-[3]" />
                        <span className="text-xs sm:text-[13px] text-slate-600 leading-snug">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ========================================================= */}
      {/* 4. FOOTER DISCLAIMER                                      */}
      {/* ========================================================= */}
      <footer className="w-full text-center py-4 px-4 text-xs text-slate-400">
        Government charges are additional to the above fee. Refer{' '}
        <a
          href="#terms"
          onClick={(e) => e.preventDefault()}
          className="text-[#0275d8] underline cursor-pointer"
        >
          T&amp;C
        </a>
      </footer>
    </div>
  );
}
