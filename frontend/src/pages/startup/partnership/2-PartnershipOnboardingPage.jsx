import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function PartnershipOnboardingPage({
  formData = {},
  onBack,
  onProceed,
}) {
  // Current onboarding sub-step (defaults to Step 1 matching media_1793437760958_a855c27e.png)
  const [subStep, setSubStep] = useState(1);

  // Selected number of partners (default '3-5' matching screenshot)
  const [numberOfPartners, setNumberOfPartners] = useState(
    formData.numberOfPartners || '3-5'
  );

  // Additional context fields for steps 2 and 3 if user advances
  const [businessState, setBusinessState] = useState(
    formData.stateName || 'Maharashtra'
  );
  const [capitalRange, setCapitalRange] = useState(
    formData.capitalContribution || '₹1 Lakh - ₹5 Lakhs'
  );

  const partnerOptions = [
    { id: '2', label: '2' },
    { id: '3-5', label: '3-5' },
    { id: '6-10', label: '6-10' },
  ];

  const handleNext = () => {
    if (subStep === 1) {
      // If parent has a multi-page step handler or when next screenshot is provided
      if (onProceed) {
        onProceed({
          numberOfPartners,
          subStep: 2,
        });
      }
    } else {
      if (onProceed) {
        onProceed({
          numberOfPartners,
          businessState,
          capitalRange,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Decorative Stepped Geometric Corners matching screenshot media_1793437760958_a855c27e.png */}
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
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Service Overview</span>
          </button>
        )}
        <div className="text-xs text-slate-400 font-medium">
          Partnership Registration • Step 2 of 3
        </div>
      </div>

      {/* Main Centered 2-Column Container (1:1 with media_1793437760958_a855c27e.png) */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT COLUMN: Trust value propositions & stats */}
        <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 bg-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-[28px] font-bold text-slate-700 leading-snug tracking-tight">
                We Register Nearly 10% of All Indian Businesses
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Join thousands of entrepreneurs who trust BharatFiling to
                kickstart their journey.
              </p>
            </div>

            {/* 3 Value bullets matching screenshot */}
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
                    From compliance to tax filings we&apos;re with you even after
                    your company is set up.
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

        {/* RIGHT COLUMN: Question Questionnaire Card (1:1 with media_1793437760958_a855c27e.png) */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-8">
            {/* Logo Badge (Matching VAKIL SEARCH yellow pill style in screenshot) */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
                <span>BHARAT</span>
                <span className="font-semibold text-slate-900">FILING</span>
              </div>
            </div>

            {/* Progress header & progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 font-bold">1/3 complete</span>
                <span className="text-slate-400 font-normal">
                  Takes less than 1 min
                </span>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#10B981] rounded-full transition-all duration-300" />
              </div>
            </div>

            {/* Question Heading */}
            <div className="space-y-5 pt-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                How many partners are you planning to start with?
              </h3>

              {/* Radio Option Cards */}
              <div className="space-y-3">
                {partnerOptions.map((opt) => {
                  const isSelected = numberOfPartners === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setNumberOfPartners(opt.id)}
                      className={`flex items-center gap-3.5 px-4 py-3.5 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#EDF2F7] border-slate-400 shadow-2xs ring-1 ring-slate-400'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          isSelected
                            ? 'font-semibold text-slate-900'
                            : 'text-slate-700'
                        }`}
                      >
                        {opt.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Row: Next Button Right Aligned */}
          <div className="pt-8 mt-6 flex justify-end items-center">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white text-sm font-semibold shadow-sm hover:shadow transition cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
