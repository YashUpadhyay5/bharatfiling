import React, { useState } from 'react';
import {
  Check,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  CreditCard,
  Lock,
} from 'lucide-react';
import { PT_PLANS } from './constants.js';

export default function PtCheckoutPage({
  formData = {},
  onBack,
  onProceed,
}) {
  const [selectedPlanId, setSelectedPlanId] = useState(
    formData.plan === 'starter' ? 'starter' : 'elite'
  );

  const starterPlan = PT_PLANS.find((p) => p.id === 'starter') || PT_PLANS[0];
  const elitePlan = PT_PLANS.find((p) => p.id === 'elite') || PT_PLANS[1];

  const handleSelectAndProceed = (planId) => {
    setSelectedPlanId(planId);
    if (onProceed) {
      onProceed(planId, []);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col justify-between py-6 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Decorative Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header Bar */}
      <header className="max-w-5xl w-full mx-auto flex items-center justify-between pb-6 sm:pb-8">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#002B49] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Business Details</span>
        </button>

        <div className="flex items-center gap-2">
          <img
            src="/bharatfiling-brand-icon.png"
            alt="BharatFiling"
            className="h-7 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
            }}
          />
          <span className="text-lg font-extrabold tracking-tight text-[#111827]">
            Bharat<span className="text-[#F26522]">Filing</span>
          </span>
        </div>
      </header>

      {/* Main Container (1:1 VAKILSEARCH MATCH OF MEDIA_1793008953291_7883785A.PNG) */}
      <main className="max-w-4xl w-full mx-auto my-auto">
        
        {/* Page Title (Exact Match: Right plan for your business) */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002B49] tracking-tight">
            Right plan for your business
          </h1>
        </div>

        {/* 2-Card Side-by-Side Comparison Grid (Starter vs Elite) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end max-w-3xl mx-auto">
          
          {/* CARD 1: STARTER (WHITE CARD) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-lg relative">
            <div>
              {/* Plan Name */}
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {starterPlan.name}
              </h2>
              
              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6">
                {starterPlan.subtitle}
              </p>

              {/* Pricing Section */}
              <div className="space-y-1 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-rose-500 line-through">
                    ₹{starterPlan.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>{starterPlan.discountLabel}</span>
                  </span>
                </div>

                <div className="flex items-baseline gap-1.5 pt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    ₹{starterPlan.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-normal text-slate-500">
                    + Govt. Fee
                  </span>
                </div>

                {/* EMI Option Available */}
                <div className="flex items-center gap-2 pt-2 text-xs text-slate-600 font-medium">
                  <span className="px-1.5 py-0.5 rounded border border-slate-700 text-[10px] font-bold text-slate-800 tracking-wider">
                    EMI
                  </span>
                  <span>EMI option available.</span>
                </div>
              </div>

              {/* Proceed to Pay CTA Button */}
              <button
                type="button"
                onClick={() => handleSelectAndProceed('starter')}
                className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm transition shadow-md cursor-pointer mt-6 mb-6 text-center"
              >
                Proceed to Pay
              </button>

              {/* What You'll Get Section */}
              <div className="pt-2 border-t border-slate-100">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-4">
                  What You'll Get
                </h3>

                <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                  {starterPlan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-600 font-bold text-base leading-none mt-0.5 shrink-0">
                        ✓
                      </span>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 2: ELITE (DARK NAVY CARD WITH GOLD RECOMMENDED BADGE) */}
          <div className="relative">
            
            {/* Top Floating Recommended Pill */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-[#FED000] text-slate-950 text-xs font-extrabold px-3.5 py-1 rounded-t-lg shadow-sm flex items-center gap-1 uppercase tracking-wider">
                <span>★</span>
                <span>Recommended</span>
              </div>
            </div>

            {/* Dark Navy Elite Card */}
            <div className="bg-[#00223B] rounded-2xl border-2 border-[#002B49] shadow-2xl p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
              
              {/* Subtle top glow highlight */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Plan Name */}
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {elitePlan.name}
                </h2>
                
                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-300 mt-1 mb-6">
                  {elitePlan.subtitle}
                </p>

                {/* Pricing Section */}
                <div className="space-y-1 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-rose-300 line-through">
                      ₹{elitePlan.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                      <Sparkles className="w-3 h-3 text-emerald-300" />
                      <span>{elitePlan.discountLabel}</span>
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      ₹{elitePlan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-normal text-slate-300">
                      + Govt. Fee
                    </span>
                  </div>

                  {/* EMI Option Available */}
                  <div className="flex items-center gap-2 pt-2 text-xs text-slate-300 font-medium">
                    <span className="px-1.5 py-0.5 rounded border border-white/60 text-[10px] font-bold text-white tracking-wider">
                      EMI
                    </span>
                    <span>EMI option available.</span>
                  </div>
                </div>

                {/* Proceed to Pay CTA Button (Bright Gold/Yellow Matching Screenshot) */}
                <button
                  type="button"
                  onClick={() => handleSelectAndProceed('elite')}
                  className="w-full py-3.5 px-4 rounded-lg bg-[#FED000] hover:bg-[#F5C700] text-slate-950 font-extrabold text-sm transition shadow-lg hover:brightness-105 cursor-pointer mt-6 mb-6 text-center"
                >
                  Proceed to Pay
                </button>

                {/* What You'll Get Section */}
                <div className="pt-2 border-t border-white/10">
                  <h3 className="font-bold text-sm sm:text-base text-white mb-4">
                    What You'll Get
                  </h3>

                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-200">
                    {elitePlan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-emerald-400 font-bold text-base leading-none mt-0.5 shrink-0">
                          ✓
                        </span>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>

      </main>

      {/* Trust Footer Bar */}
      <footer className="max-w-4xl w-full mx-auto text-center pt-8 text-xs text-slate-400">
        <p>🔒 256-Bit SSL Encrypted Statutory Checkout • Zero Risk Compliance Guarantee</p>
      </footer>

    </div>
  );
}
