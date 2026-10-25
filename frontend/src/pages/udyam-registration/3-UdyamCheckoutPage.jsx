import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ShieldCheck, Star } from 'lucide-react';
import { UDYAM_PLANS } from './constants.js';

export default function UdyamCheckoutPage({
  formData = {},
  selectedPlanId,
  onSelectPlan,
  onProceedToPayment,
  onBack,
}) {
  const navigate = useNavigate();

  const handleProceed = (planId) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
    if (onProceedToPayment) {
      onProceedToPayment(planId);
    } else {
      navigate(`/apply/udyam?step=4&plan=${planId}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-16">
      {/* Top Header Bar with BharatFiling Logo */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="inline-flex items-center select-none" title="BharatFiling">
            <img
              src="/bharatfiling-user-logo.png"
              alt="BharatFiling"
              className="h-8 sm:h-9 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
              }}
            />
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Main Title (Exact match from reference image) */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#042D50] tracking-tight">
            Right plan for MSME Registration
          </h1>
        </div>

        {/* 3 Pricing Cards Grid (Exact clone of Image 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch max-w-5xl mx-auto">
          {UDYAM_PLANS.map((plan) => {
            const isStandard = plan.id === 'standard';

            if (isStandard) {
              // Featured Dark Navy Card: Standard (Recommended)
              return (
                <div
                  key={plan.id}
                  className="rounded-2xl bg-[#00223A] border-2 border-[#00223A] text-white p-6 sm:p-7 relative flex flex-col justify-between shadow-xl"
                >
                  {/* Recommended Badge on Top */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFD200] text-slate-950 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm flex items-center gap-1 select-none whitespace-nowrap">
                    <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
                    <span>Recommended</span>
                  </div>

                  <div>
                    {/* Title & Subtitle */}
                    <h3 className="text-xl font-extrabold text-white">{plan.name}</h3>
                    <p className="mt-1 text-xs text-slate-300 leading-snug min-h-[32px]">
                      {plan.subtitle}
                    </p>

                    {/* Price & Discounts */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 line-through">
                          ₹{plan.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                          {plan.discountLabel}
                        </span>
                      </div>

                      <div className="mt-1 flex items-baseline">
                        <span className="text-3xl sm:text-4xl font-black text-white">
                          ₹{plan.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-300 font-normal ml-1.5">
                          + Govt. Fee
                        </span>
                      </div>

                      {/* EMI Badge */}
                      {plan.hasEmi && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] text-slate-200 font-medium select-none">
                          <span className="font-extrabold bg-white text-slate-900 px-1 py-0.2 rounded text-[9px]">
                            EMI
                          </span>
                          <span>EMI option available.</span>
                        </div>
                      )}
                    </div>

                    {/* Direct Proceed to Pay Button (Yellow button on Standard card) */}
                    <button
                      type="button"
                      onClick={() => handleProceed(plan.id)}
                      className="w-full py-3.5 px-4 rounded-lg bg-[#FFD200] hover:bg-[#FACC15] active:scale-[0.99] text-slate-950 font-extrabold text-sm tracking-wide transition shadow-md my-6 cursor-pointer text-center select-none"
                    >
                      Proceed to Pay
                    </button>

                    {/* What You'll Get Deliverables */}
                    <div className="space-y-3 pt-1">
                      <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                        What You&apos;ll Get
                      </h4>
                      <div className="space-y-2.5">
                        {plan.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 stroke-[2.5]" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // White Cards: Starter & Premium
            return (
              <div
                key={plan.id}
                className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 relative flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-extrabold text-slate-900">{plan.name}</h3>
                  <p className="mt-1 text-xs text-slate-500 leading-snug min-h-[32px]">
                    {plan.subtitle}
                  </p>

                  {/* Price & Discounts */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 line-through">
                        ₹{plan.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {plan.discountLabel}
                      </span>
                    </div>

                    <div className="mt-1 flex items-baseline">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500 font-normal ml-1.5">
                        + Govt. Fee
                      </span>
                    </div>

                    {/* EMI Badge for Premium */}
                    {plan.hasEmi ? (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-600 font-medium select-none">
                        <span className="font-extrabold bg-slate-900 text-white px-1 py-0.2 rounded text-[9px]">
                          EMI
                        </span>
                        <span>EMI option available.</span>
                      </div>
                    ) : (
                      <div className="mt-2 h-[22px]" /> // Spacing preservation
                    )}
                  </div>

                  {/* Direct Proceed to Pay Button (Navy button on White cards) */}
                  <button
                    type="button"
                    onClick={() => handleProceed(plan.id)}
                    className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-bold text-sm tracking-wide transition shadow-xs my-6 cursor-pointer text-center select-none"
                  >
                    Proceed to Pay
                  </button>

                  {/* What You'll Get Deliverables */}
                  <div className="space-y-3 pt-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-wide">
                      What You&apos;ll Get
                    </h4>
                    <div className="space-y-2.5">
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
