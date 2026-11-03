import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lightbulb,
  ChevronDown,
} from 'lucide-react';

const CHARITABLE_OBJECTIVE_OPTIONS = [
  { id: 'education', label: 'Education, Literacy & Skill Development' },
  { id: 'healthcare', label: 'Healthcare, Medical Relief & Public Health' },
  { id: 'poverty', label: 'Poverty Alleviation & Social Welfare' },
  { id: 'environment', label: 'Environmental Protection & Wildlife Conservation' },
  { id: 'arts_sports', label: 'Promotion of Arts, Culture & Sports' },
  { id: 'science_research', label: 'Science, Research & Technology Promotion' },
  { id: 'general_utility', label: 'General Public Utility & Community Empowerment' },
];

export default function Section8OnboardingPage({
  formData = {},
  onBack,
  onProceed,
}) {
  // Current onboarding sub-step (1: 1/2 complete, 2: 2/2 complete)
  // 1:1 with media_1793700248017_f8d82dbe.png and media_1793700264418_1056579e.png
  const [subStep, setSubStep] = useState(1);

  // Form values matching screenshots
  const [foundationName, setFoundationName] = useState(
    formData.proposedFoundationName || ''
  );
  const [charitableObjective, setCharitableObjective] = useState(
    formData.charitableObjective || 'Education, Literacy & Skill Development'
  );

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (subStep === 1) {
      setErrors({});
      setSubStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 2) {
      if (!charitableObjective) {
        setErrors({ charitableObjective: 'Please select primary non-profit objective' });
        return;
      }
      if (onProceed) {
        onProceed({
          proposedFoundationName: foundationName.trim(),
          charitableObjective,
        });
      }
    }
  };

  const handleSkipName = () => {
    setFoundationName('');
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
      {/* Decorative Stepped Geometric Corners (1:1 with screenshots) */}
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
          Section 8 Company • Step {subStep} of 2
        </div>
      </div>

      {/* Main Centered 2-Column Container (1:1 with screenshots) */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* LEFT COLUMN: Trust Value Propositions (1:1 with media_1793700248017_f8d82dbe.png) */}
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

        {/* RIGHT COLUMN: Questionnaire Steps (1:1 with screenshots) */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-6">
            {/* Top Logo Badge: BHARAT FILING Yellow Pill */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
                <span>BHARAT</span>
                <span className="font-semibold text-slate-900">FILING</span>
              </div>
            </div>

            {/* Stepped Progress Indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  {subStep}/2 complete
                </span>
                <span className="text-slate-400 text-[11px]">
                  Takes less than 1 min
                </span>
              </div>

              {/* 2-Segment Progress Bar */}
              <div className="grid grid-cols-2 gap-2 h-1.5">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    subStep >= 1 ? 'bg-[#22C55E]' : 'bg-slate-200'
                  }`}
                />
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    subStep >= 2 ? 'bg-[#22C55E]' : 'bg-slate-200'
                  }`}
                />
              </div>
            </div>

            {/* SUB-STEP 1: Enter your desired Section 8 Foundation/NGO name */}
            {subStep === 1 && (
              <div className="space-y-6 pt-4 animate-in fade-in duration-150">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    Enter your desired company name
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">
                    You can use non-profit suffixes like Foundation, Forum, Association, Council, or Society.
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    value={foundationName}
                    onChange={(e) => setFoundationName(e.target.value)}
                    placeholder="e.g. Hope India Welfare Foundation"
                    className="w-full px-4 py-3 rounded-xl border border-slate-400 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 transition shadow-2xs"
                    autoFocus
                  />
                  {errors.foundationName && (
                    <p className="text-xs text-rose-500 font-medium mt-1.5">
                      {errors.foundationName}
                    </p>
                  )}
                </div>

                {/* Lightbulb hint with skip button (1:1 with media_1793700248017_f8d82dbe.png) */}
                <div className="flex items-start gap-3 p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80 text-xs text-slate-600">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    Still have not finalized the name! Don&apos;t worry, you can
                    always do this step later!{' '}
                    <button
                      type="button"
                      onClick={handleSkipName}
                      className="font-bold text-slate-900 underline underline-offset-2 hover:text-[#002B49] transition cursor-pointer"
                    >
                      Skip it for now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-STEP 2: Primary Charitable/Social Objective (1:1 with media_1793700264418_1056579e.png) */}
            {subStep === 2 && (
              <div className="space-y-6 pt-4 animate-in fade-in duration-150">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    Primary Non-Profit / Social Objective
                  </h3>
                  <p className="text-xs text-slate-500 font-normal">
                    This will be included in your Memorandum of Association (Form INC-13) for Central Govt. Licensing.
                  </p>
                </div>

                <div className="relative">
                  <select
                    value={charitableObjective}
                    onChange={(e) => setCharitableObjective(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-400 text-sm font-semibold text-slate-900 bg-white appearance-none focus:outline-none focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 transition shadow-2xs cursor-pointer"
                  >
                    {CHARITABLE_OBJECTIVE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.label}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-4 pointer-events-none" />
                </div>
                {errors.charitableObjective && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errors.charitableObjective}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons at Bottom */}
          <div className="pt-8 flex items-center justify-between">
            {subStep === 2 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border border-slate-400 hover:border-slate-700 text-xs font-bold text-slate-700 hover:text-slate-950 bg-white transition cursor-pointer shadow-2xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

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
    </div>
  );
}
