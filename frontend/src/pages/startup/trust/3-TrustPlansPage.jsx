import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Edit3,
  X,
  Check,
  Tag,
  Sparkles,
  Lock,
  Star,
} from 'lucide-react';
import { BUNDLED_PLANS } from './constants.js';

export default function TrustPlansPage({
  formData = {},
  onBack,
  onProceedToPayment,
  onPaymentSuccess,
}) {
  // Determine initially selected plan (defaults to starter or from formData)
  const initialPlanId = formData.packageId || 'starter';
  const initialPlan =
    BUNDLED_PLANS.find((p) => p.id === initialPlanId) || BUNDLED_PLANS[0];

  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);

  const handleSelectPlanOption = (plan) => {
    setSelectedPlan(plan);
    setIsChangeModalOpen(false);
  };

  const handleNext = () => {
    if (onProceedToPayment) {
      onProceedToPayment(selectedPlan);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-800">
      {/* Decorative Stepped Geometric Corners (1:1 with media_1793614776593_5a4d37fe.png & media_1793688222341_af4052cb.png) */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-40">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path
            d="M180 0H120V60H60V120H0V180H180V0Z"
            fill="#E2E8F0"
            fillOpacity="0.5"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-40">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path
            d="M0 180H60V120H120V60H180V0H0V180Z"
            fill="#E2E8F0"
            fillOpacity="0.5"
          />
        </svg>
      </div>

      {/* Top back navigation */}
      <div className="w-full max-w-5xl mb-6 flex items-center justify-between relative z-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Questionnaire</span>
        </button>
        <div className="text-xs text-slate-400 font-medium">
          Trust Registration • Plan Confirmation
        </div>
      </div>

      {/* Main Centered 2-Column Container (1:1 with media_1793688222341_af4052cb.png) */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* LEFT COLUMN: Trust Value Propositions (1:1 with media_1793688222341_af4052cb.png) */}
        <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 bg-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-[28px] font-bold text-slate-800 leading-snug tracking-tight">
                <span className="text-slate-900 font-extrabold">5 Lakh+</span> Businesses Registered
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                10% of all Indian businesses register with us
              </p>
            </div>

            {/* 3 Value bullets matching screenshot 1:1 */}
            <div className="space-y-5 pt-3">
              {/* Bullet 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Trust Registration in under 7 days
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Expand your initiative without having to wait
                  </p>
                </div>
              </div>

              {/* Bullet 2 */}
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    24x7 expert support
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Minimize challenges &amp; maximize productivity
                  </p>
                </div>
              </div>

              {/* Bullet 3 */}
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    100% online process
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Start trust registration from the comfort of your home
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex items-center gap-2 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>ISO 27001 Certified • Bank-Grade 256-Bit SSL Security</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Plan Confirmation (1:1 with media_1793688222341_af4052cb.png) */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-7">
            {/* Logo Badge (Matching VAKIL SEARCH / BHARAT FILING yellow pill style in screenshot) */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
                <span>BHARAT</span>
                <span className="font-semibold text-slate-900">FILING</span>
              </div>
            </div>

            {/* Title: Selected plan for Trust Registration (1:1 with screenshot) */}
            <div className="text-center">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Selected plan for Trust Registration
              </h3>
            </div>

            {/* Selected Plan Box (1:1 with screenshot card) */}
            <div className="rounded-xl border border-slate-400 p-6 sm:p-7 bg-white relative shadow-2xs hover:border-slate-500 transition">
              {/* Header row: Plan Name & Change plan button */}
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {selectedPlan.name}
                </h4>

                <button
                  type="button"
                  onClick={() => setIsChangeModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-400 hover:border-slate-700 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white shadow-2xs transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Change plan</span>
                </button>
              </div>

              {/* Tagline / Description */}
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-2.5 max-w-md">
                {selectedPlan.tagline || selectedPlan.subtitle}
              </p>

              {/* Price Details matching screenshot: ₹1499 ₹500 off, ₹999 + Govt. Fee */}
              <div className="mt-5 space-y-1.5">
                {/* Crossed original price & discount tag */}
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-rose-500 line-through font-medium">
                    ₹{selectedPlan.originalPrice}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    <Tag className="w-3 h-3 text-emerald-600" />
                    <span>₹{selectedPlan.discountAmount || 500} off</span>
                  </span>
                </div>

                {/* Main Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    ₹{selectedPlan.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {selectedPlan.govtFeeNote || '+ Govt. Fee'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right: Next Action Button (1:1 with media_1793688222341_af4052cb.png) */}
          <div className="pt-8 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3.5 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer transform active:scale-[0.99]"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MODAL: CHANGE PLAN (Shows all 3 plans with dark center card)
      ========================================================================= */}
      {isChangeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            {/* Modal close button */}
            <button
              type="button"
              onClick={() => setIsChangeModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-8">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                Choose Registration Plan
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                Available Trust Registration Plans
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select the legal tier that best matches your organization&apos;s charitable mission
              </p>
            </div>

            {/* 3 Plans Grid (matches Image 4 & 5) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {BUNDLED_PLANS.map((plan) => {
                const isSelected = selectedPlan.id === plan.id;
                const isDark = plan.theme === 'dark';

                return (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectPlanOption(plan)}
                    className={`rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all relative ${
                      isDark
                        ? 'bg-[#0B2545] text-white border-2 border-[#0B2545] shadow-xl md:-translate-y-1'
                        : isSelected
                        ? 'border-2 border-[#002B49] bg-white shadow-lg ring-2 ring-blue-100'
                        : 'border border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD200] text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        {plan.badge || 'Recommended'}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-base font-bold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {plan.name}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <p
                        className={`text-xs min-h-[32px] leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {plan.subtitle}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100/20">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-xs line-through ${
                              isDark ? 'text-slate-400' : 'text-slate-400'
                            }`}
                          >
                            ₹{plan.originalPrice}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isDark
                                ? 'bg-emerald-500 text-white'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {plan.discount}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span
                            className={`text-2xl font-black ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            ₹{plan.price.toLocaleString('en-IN')}
                          </span>
                          <span
                            className={`text-[11px] ${
                              isDark ? 'text-slate-300' : 'text-slate-500'
                            }`}
                          >
                            {plan.govtFeeNote || '+ Govt. Fee'}
                          </span>
                        </div>
                      </div>

                      <ul className="mt-4 space-y-2 text-xs">
                        {plan.features.slice(0, 4).map((f, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 stroke-[2.5] ${
                                isDark ? 'text-[#FFD200]' : 'text-emerald-600'
                              }`}
                            />
                            <span
                              className={`text-[11px] leading-tight ${
                                isDark ? 'text-slate-200' : 'text-slate-600'
                              }`}
                            >
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPlanOption(plan);
                      }}
                      className={`w-full mt-5 py-2.5 px-3 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 ${
                        isDark
                          ? 'bg-[#FFD200] hover:bg-[#FACC15] text-slate-950'
                          : 'bg-[#002B49] hover:bg-[#001D32] text-white'
                      }`}
                    >
                      <span>{isSelected ? 'Selected' : 'Select Plan'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
