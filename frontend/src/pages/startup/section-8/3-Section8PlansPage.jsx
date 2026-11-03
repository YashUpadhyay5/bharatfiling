import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Edit3,
  X,
  Check,
  Sparkles,
} from 'lucide-react';
import { BUNDLED_PLANS } from './constants.js';

export default function Section8PlansPage({
  formData = {},
  onBack,
  onProceedToPayment,
}) {
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
          Section 8 Company • Step 3 of 4
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

              {/* Subtitle matching screenshot 1:1 */}
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
                  <span className="text-xs sm:text-sm text-slate-500 font-normal">
                    {selectedPlan.govtFeeNote || '+ Govt. Fee'}
                  </span>
                </div>

                {/* GST notification subtext */}
                <p className="text-xs text-slate-500 pt-1 font-normal">
                  ₹{gstAmount} (18% GST) will be added
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons at Bottom */}
          <div className="pt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-slate-400 hover:border-slate-700 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white transition cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

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

      {/* CHANGE PLAN MODAL */}
      {isChangeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Select a Registration Plan
                </h3>
                <p className="text-xs text-slate-500">
                  Choose the plan that best fits your Section 8 Foundation needs
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsChangeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of plans */}
            <div className="space-y-3.5">
              {BUNDLED_PLANS.map((plan) => {
                const isCurrent = plan.id === selectedPlan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectPlanOption(plan)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative ${
                      isCurrent
                        ? 'border-[#002B49] bg-blue-50/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900">
                            {plan.name}
                          </h4>
                          {plan.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFD200] text-slate-950 flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{plan.subtitle}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-black text-slate-900">
                          ₹{plan.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          +18% GST (₹{Math.round(plan.price * 0.18)})
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                      {plan.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsChangeModalOpen(false)}
                className="px-6 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 text-xs font-bold text-slate-700 bg-white transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
