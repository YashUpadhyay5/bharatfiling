import React from 'react';
import {
  Check,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import { FSSAI_PLANS } from './constants.js';

export default function FssaiCheckoutPage({
  formData = {},
  onSelectPlan,
  onBack,
}) {
  const handleProceed = (planId) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6 relative">
      
      {/* Top Header Bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <img
            src="/bharatfiling-user-logo.png"
            alt="BharatFiling"
            className="h-8 sm:h-9 w-auto object-contain cursor-pointer"
            onClick={onBack}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
            }}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-slate-500 border-l pl-4 border-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Secure Government Filing</span>
          </div>
        </div>
      </header>

      {/* Main Container: 1:1 VAKILSEARCH MATCH OF MEDIA_1792999136441_7360A87F.PNG */}
      <main className="max-w-6xl w-full mx-auto my-auto py-4 sm:py-8">
        
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002B49] tracking-tight">
            Right plan for your Food License
          </h1>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* ============================================================== */}
          {/* CARD 1: Starter (₹799)                                         */}
          {/* ============================================================== */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-md">
            <div>
              {/* Plan Title & Subtitle */}
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Starter
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 min-h-[36px] leading-snug">
                  Ideal for basic food license customers
                </p>
              </div>

              {/* Price Block */}
              <div className="mt-5 pt-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-400 line-through">
                    ₹999
                  </span>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    <span className="text-[10px]">●</span> ₹200 off
                  </span>
                </div>

                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    ₹799
                  </span>
                  <span className="text-xs font-medium text-slate-500 ml-2">
                    + Govt. Fee
                  </span>
                </div>
              </div>

              {/* Proceed to Pay Button (Dark Navy) */}
              <button
                type="button"
                onClick={() => handleProceed('starter')}
                className="w-full py-3.5 px-6 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm sm:text-base transition-all shadow-sm hover:shadow-md my-6 text-center cursor-pointer"
              >
                Proceed to Pay
              </button>

              {/* What You'll Get Checklist */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3.5">
                  What You'll Get
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>15-minutes call with food license experts</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Assistance with selecting the <strong className="text-slate-900 font-bold">right license type</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Your food license application filing done</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Document validation by Food Safety Advocate</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>14-Digit FoSCoS registration certificate delivery</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] text-slate-400">
              TAT: 3-5 Working Days • Lifetime Certificate
            </div>
          </div>

          {/* ============================================================== */}
          {/* CARD 2: Standard (₹3,999)                                      */}
          {/* ============================================================== */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-md">
            <div>
              {/* Plan Title & Subtitle */}
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Standard
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 min-h-[36px] leading-snug">
                  Ideal for starting food business with basic food license + GST registration
                </p>
              </div>

              {/* Price Block */}
              <div className="mt-5 pt-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-400 line-through">
                    ₹4999
                  </span>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    <span className="text-[10px]">●</span> 20% off
                  </span>
                </div>

                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    ₹3,999
                  </span>
                  <span className="text-xs font-medium text-slate-500 ml-2">
                    + Govt. Fee
                  </span>
                </div>

                {/* EMI Badge Row */}
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500 font-medium">
                  <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-1.5 py-0.5 rounded-xs border border-slate-200">
                    EMI
                  </span>
                  <span>EMI option available.</span>
                </div>
              </div>

              {/* Proceed to Pay Button (Dark Navy) */}
              <button
                type="button"
                onClick={() => handleProceed('standard')}
                className="w-full py-3.5 px-6 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm sm:text-base transition-all shadow-sm hover:shadow-md my-6 text-center cursor-pointer"
              >
                Proceed to Pay
              </button>

              {/* What You'll Get Checklist */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3.5">
                  What You'll Get
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>15-minutes call with food license experts</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Assistance with selecting the <strong className="text-slate-900 font-bold">right license type</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Your food license application filing done</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>GST registration filing &amp; ARN tracking</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Dedicated compliance manager for your food unit</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Assistance with FoSCoS department queries</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 text-[11px] text-slate-400">
              TAT: 5-7 Working Days • Dedicated Account Manager
            </div>
          </div>

          {/* ============================================================== */}
          {/* CARD 3: Elite (₹4,999) - RECOMMENDED (DARK BLUE CARD)         */}
          {/* ============================================================== */}
          <div className="bg-[#00223D] text-white rounded-2xl border border-blue-900 shadow-xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300">
            
            {/* Gold Recommended Floating Badge at top */}
            <div className="absolute -top-3.5 left-6 bg-[#E5B54F] text-slate-950 text-xs font-black px-3.5 py-1 rounded-full shadow-md select-none flex items-center gap-1">
              <span>★</span>
              <span>Recommended</span>
            </div>

            <div>
              {/* Plan Title & Subtitle */}
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Elite
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 min-h-[36px] leading-snug">
                  Ideal for starting food business &amp; protection of your brand
                </p>
              </div>

              {/* Price Block */}
              <div className="mt-5 pt-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-400 line-through">
                    ₹7690
                  </span>
                  <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <span className="text-[10px]">●</span> 35% off
                  </span>
                </div>

                <div className="flex items-baseline">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    ₹4,999
                  </span>
                  <span className="text-xs font-medium text-slate-400 ml-2">
                    + Govt. Fee
                  </span>
                </div>

                {/* EMI Badge Row */}
                <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-300 font-medium">
                  <span className="bg-white/20 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-xs border border-white/20">
                    EMI
                  </span>
                  <span>EMI option available.</span>
                </div>
              </div>

              {/* Proceed to Pay Button (BRIGHT YELLOW / GOLD) */}
              <button
                type="button"
                onClick={() => handleProceed('elite')}
                className="w-full py-3.5 px-6 rounded-lg bg-[#FFCC00] hover:bg-[#F5B800] text-slate-950 font-black text-sm sm:text-base transition-all shadow-lg hover:shadow-xl my-6 text-center cursor-pointer"
              >
                Proceed to Pay
              </button>

              {/* What You'll Get Checklist */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5">
                  What You'll Get
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>15-minutes call with food license experts</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Assistance with selecting the <strong className="text-white font-bold">right license type</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Your food license application filing done</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>GST registration for food business</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Trademark search &amp; brand protection filing</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Priority 48-hour filing with senior food law partner</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Annual food compliance &amp; return filing guidance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-blue-900/60 text-[11px] text-slate-400">
              TAT: 5-7 Working Days • Complete Brand Protection Suite
            </div>
          </div>

        </div>

      </main>

      <footer className="max-w-6xl w-full mx-auto text-center py-4 text-xs text-slate-400">
        © BharatFiling Statutory Facilitation Desk • ISO 27001 Certified System
      </footer>

    </div>
  );
}
