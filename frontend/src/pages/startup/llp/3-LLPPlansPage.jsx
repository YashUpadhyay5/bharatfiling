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
} from 'lucide-react';
import { BUNDLED_PLANS } from './constants.js';

export default function LLPPlansPage({
  formData = {},
  onBack,
  onProceedToPayment,
}) {
  // If packageId is not set, default to starter / standard matching screenshot (₹999)
  const defaultPlan =
    BUNDLED_PLANS.find((p) => p.id === formData.packageId) ||
    BUNDLED_PLANS.find((p) => p.price === 999) ||
    BUNDLED_PLANS[0];

  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
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

  // Exact 18% GST note calculation matching screenshot
  const gstAmount = Math.round(selectedPlan.price * 0.18);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-800">
      {/* Decorative Stepped Geometric Corners (1:1 with media_1793701305491_70dc51f5.png) */}
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
          LLP Registration • Step 3 of 4
        </div>
      </div>

      {/* Main Centered 2-Column Container (1:1 with media_1793701305491_70dc51f5.png) */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* LEFT COLUMN: Trust Value Propositions (1:1 with media_1793701305491_70dc51f5.png) */}
        <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 bg-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-[28px] font-bold text-slate-800 leading-snug tracking-tight">
                We Register Nearly 10% of All Indian Businesses
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Join thousands of entrepreneurs who trust Zolvit to kickstart
                their journey.
              </p>
            </div>

            {/* 3 Value bullets matching screenshots 1:1 */}
            <div className="space-y-5 pt-3">
              {/* Bullet 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Company Registration done within 7 days
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Get your business officially registered fast, with zero
                    hassle or delays.
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
                    24×7 Expert Support
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Our professionals are available around the clock to guide
                    you at every step.
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
                    Post-registration Support Provided
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    From compliance to tax filings we&apos;re with you even
                    after your company is set up.
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

        {/* RIGHT COLUMN: Pre-Bundle Plan Box (1:1 with media_1793701305491_70dc51f5.png) */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-8">
            {/* Logo Badge (Matching VAKIL SEARCH / BHARAT FILING yellow pill style in screenshot 1:1) */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
                <span>BHARAT</span>
                <span className="font-semibold text-slate-900">FILING</span>
              </div>
            </div>

            {/* Selected Plan Box (1:1 with media_1793701305491_70dc51f5.png) */}
            <div className="rounded-xl border border-slate-400 p-6 sm:p-7 bg-white relative shadow-2xs hover:border-slate-500 transition">
              {/* Header row: Plan Name & Change plan button (1:1 with screenshot) */}
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {selectedPlan.name === 'Starter' ? 'Standard' : selectedPlan.name}
                </h4>

                <button
                  type="button"
                  onClick={() => setIsChangeModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-400 hover:border-slate-700 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white shadow-2xs transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Change plan</span>
                </button>
              </div>

              {/* Subtitle matching screenshot 1:1: "Standard application filing: Regular processing time" */}
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mt-1.5">
                {selectedPlan.preBundleSubtitle || 'Standard application filing: Regular processing time'}
              </p>

              {/* Pricing Section matching screenshot 1:1 */}
              <div className="mt-4 space-y-1">
                {/* Crossed original price & green discount pill */}
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-rose-500 line-through font-medium">
                    ₹{selectedPlan.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>{selectedPlan.discount || '50% discount'}</span>
                  </span>
                </div>

                {/* Big Price with + Govt. Fee */}
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    ₹{selectedPlan.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {selectedPlan.govtFeeNote || '+ Govt. Fee'}
                  </span>
                </div>

                {/* GST Note matching screenshot 1:1 */}
                <p className="text-xs text-slate-500 font-normal pt-1">
                  ₹{gstAmount.toLocaleString('en-IN')} (18% GST) will be added
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Right: Next Action Button (1:1 with media_1793701305491_70dc51f5.png) */}
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
          MODAL: CHANGE PLAN (Allows switching between all available packages)
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
                Available LLP Registration Plans
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select the legal package that best matches your Limited Liability Partnership requirements
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
                    className={`rounded-2xl p-6 flex flex-col justify-between transition-all cursor-pointer relative ${
                      isDark
                        ? 'bg-[#0B2545] text-white border-2 border-[#0B2545] shadow-xl md:-translate-y-1'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-xs hover:border-slate-400'
                    } ${
                      isSelected
                        ? 'ring-3 ring-blue-600 ring-offset-2'
                        : ''
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD200] text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                        Recommended
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            isDark ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {plan.name}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs line-through ${
                            isDark ? 'text-slate-400' : 'text-rose-500'
                          }`}
                        >
                          ₹{plan.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            isDark
                              ? 'bg-emerald-500 text-white'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {plan.discount}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1.5 mb-2">
                        <span
                          className={`text-2xl font-extrabold ${
                            isDark ? 'text-white' : 'text-[#002B49]'
                          }`}
                        >
                          ₹{plan.price.toLocaleString('en-IN')}
                        </span>
                        <span
                          className={`text-[11px] font-medium ${
                            isDark ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {plan.govtFeeNote}
                        </span>
                      </div>

                      <p
                        className={`text-xs mb-4 line-clamp-2 ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {plan.subtitle}
                      </p>

                      <div
                        className={`space-y-2 pt-3 border-t text-xs ${
                          isDark ? 'border-white/10' : 'border-slate-100'
                        }`}
                      >
                        {plan.features.slice(0, 4).map((f, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isDark ? 'text-[#FFD200]' : 'text-emerald-600'
                              }`}
                            />
                            <span
                              className={`leading-tight text-[11px] ${
                                isDark ? 'text-slate-200' : 'text-slate-700'
                              }`}
                            >
                              {f}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectPlanOption(plan);
                        }}
                        className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : isDark
                            ? 'bg-[#FFD200] hover:bg-[#FACC15] text-slate-950'
                            : 'bg-[#002B49] hover:bg-[#001D32] text-white'
                        }`}
                      >
                        <span>{isSelected ? 'Current Selection' : 'Select Plan'}</span>
                        {!isSelected && <Sparkles className="w-3.5 h-3.5" />}
                      </button>
                    </div>
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
