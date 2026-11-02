import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react';

const BUSINESS_AGE_OPTIONS = [
  { id: 'not_started', label: 'Not yet started' },
  { id: 'less_than_1', label: 'Less than 1 year' },
  { id: '1_to_2', label: '1 - 2 years' },
  { id: '2_plus', label: '2+ years' },
];

export default function PublicCompanyOnboardingPage({
  formData = {},
  onBack,
  onProceed,
}) {
  // Current onboarding sub-step (1: 1/2 complete, 2: 2/2 complete)
  const [subStep, setSubStep] = useState(1);

  // Form values
  const [companyName, setCompanyName] = useState(
    formData.proposedCompanyName || 'solaria'
  );
  const [businessAge, setBusinessAge] = useState(
    formData.businessAge || 'Less than 1 year'
  );

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (subStep === 1) {
      setErrors({});
      setSubStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 2) {
      if (!businessAge) {
        setErrors({ businessAge: 'Please select how old your business is' });
        return;
      }
      if (onProceed) {
        onProceed({
          proposedCompanyName: companyName.trim(),
          businessAge,
        });
      }
    }
  };

  const handleSkipName = () => {
    setCompanyName('');
    setErrors({});
    setSubStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (subStep === 2) {
      setSubStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-800">
      {/* Decorative Stepped Geometric Corners */}
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
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            {subStep === 1
              ? 'Back to Service Overview'
              : 'Back to Previous Question'}
          </span>
        </button>
        <div className="text-xs text-slate-400 font-medium">
          Public Limited Registration • Step {subStep} of 2
        </div>
      </div>

      {/* Main Centered 2-Column Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* LEFT COLUMN: Trust Value Propositions */}
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

            {/* 3 Value bullets matching screenshots */}
            <div className="space-y-5 pt-3">
              {/* Bullet 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Company Registration in under 7 days
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Expand your business without having to wait
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
                    Start business from the comfort of your home
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

        {/* RIGHT COLUMN: Questionnaire Card */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-8">
            {/* Logo Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
                <span>VAKIL</span>
                <span className="font-semibold text-slate-900">SEARCH</span>
              </div>
            </div>

            {/* Segmented Progress Tracker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 font-bold">
                  {subStep === 1 ? '1/2 complete' : '2/2 complete'}
                </span>
                <span className="text-slate-400 font-normal">
                  Takes less than 1 min
                </span>
              </div>

              <div className="flex gap-2">
                <div
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    subStep >= 1 ? 'bg-[#10B981]' : 'bg-slate-200'
                  }`}
                />
                <div
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    subStep >= 2 ? 'bg-[#10B981]' : 'bg-slate-200'
                  }`}
                />
              </div>
            </div>

            {/* SUB-STEP 1 of 2: Enter desired company name */}
            {subStep === 1 && (
              <div className="space-y-5 pt-2 animate-in fade-in duration-200">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  Enter your desired company name
                </h3>

                <div>
                  <label htmlFor="desired-public-name" className="sr-only">
                    Enter your desired company name
                  </label>
                  <input
                    id="desired-public-name"
                    type="text"
                    value={companyName}
                    placeholder="e.g. Solaria"
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      if (errors.companyName) setErrors({});
                    }}
                    autoFocus
                    className="w-full px-4 py-3 rounded-lg border border-slate-400 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/20 focus:outline-none text-sm text-slate-900 bg-white shadow-2xs transition"
                  />
                  {errors.companyName && (
                    <p className="text-xs text-rose-600 mt-1.5">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                {/* Lightbulb Hint with "Skip it for now" */}
                <div className="flex items-start gap-2.5 pt-1">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Yet to finalize your brand name? Don&apos;t worry, you can
                    always do this step later!{' '}
                    <button
                      type="button"
                      onClick={handleSkipName}
                      className="text-blue-900 font-bold hover:underline cursor-pointer"
                    >
                      Skip it for now
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* SUB-STEP 2 of 2: How old is your business? */}
            {subStep === 2 && (
              <div className="space-y-5 pt-2 animate-in fade-in duration-200">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  How old is your business?
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {BUSINESS_AGE_OPTIONS.map((opt) => {
                    const isSelected = businessAge === opt.label;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => {
                          setBusinessAge(opt.label);
                          if (errors.businessAge) setErrors({});
                        }}
                        className={`p-4 rounded-xl border flex items-center gap-3 transition cursor-pointer select-none ${
                          isSelected
                            ? 'border-[#002B49] bg-blue-50/20 ring-1 ring-[#002B49]'
                            : 'border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#002B49]'
                              : 'border-slate-400'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                          )}
                        </div>

                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            isSelected ? 'text-slate-900 font-bold' : 'text-slate-700'
                          }`}
                        >
                          {opt.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {errors.businessAge && (
                  <p className="text-xs text-rose-600 mt-1">
                    {errors.businessAge}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-8 mt-6 flex items-center justify-between">
            {subStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg border border-slate-700 hover:border-slate-900 bg-white text-slate-800 text-sm font-semibold shadow-2xs hover:bg-slate-50 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={subStep === 2 && !businessAge}
              className={`inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition cursor-pointer ${
                subStep === 2 && !businessAge
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-[#002B49] hover:bg-[#001D32] text-white hover:shadow'
              }`}
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
