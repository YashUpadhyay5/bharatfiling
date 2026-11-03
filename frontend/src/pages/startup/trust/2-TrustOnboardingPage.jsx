import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const TRUST_OBJECTIVE_OPTIONS = [
  'Public Charitable & Poverty Relief',
  'Education, Schools & Skill Development',
  'Healthcare, Hospitals & Medical Relief',
  'Religious, Spiritual & Cultural Heritage',
  'Environmental, Goshala & Animal Welfare',
  'Community Welfare & General Public Utility',
  'Arts, Culture & Heritage Conservation',
  'Women & Child Development Foundation',
  'Sports Promotion & Rural Youth Training',
  'Other Charitable & Non-Profit Purpose',
];

export default function TrustOnboardingPage({
  formData = {},
  onBack,
  onProceed,
}) {
  // Current onboarding sub-step (1: 1/3, 2: 2/3, 3: 3/3)
  const [subStep, setSubStep] = useState(1);

  // Form inputs across the 3 sub-steps (minimal customer inputs)
  const [numberOfTrustees, setNumberOfTrustees] = useState(
    formData.trusteesCount || '3-5'
  );
  const [trustName, setTrustName] = useState(
    formData.trustName || 'Vidya Jyoti Educational Trust'
  );
  const [trustObjective, setTrustObjective] = useState(
    formData.trustCategory || 'Education, Schools & Skill Development'
  );

  // Objective dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Error states
  const [errors, setErrors] = useState({});

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trusteeOptions = [
    { id: '2', label: '2' },
    { id: '3-5', label: '3-5' },
    { id: '6-10', label: '6-10' },
  ];

  // Filter objective options based on typed text
  const filteredObjectives = TRUST_OBJECTIVE_OPTIONS.filter((item) =>
    item.toLowerCase().includes((trustObjective || '').toLowerCase())
  );

  const handleNext = () => {
    if (subStep === 1) {
      setSubStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 2) {
      if (!trustName || trustName.trim().length === 0) {
        setErrors({ trustName: 'Please provide a preferred trust name' });
        return;
      }
      setErrors({});
      setSubStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 3) {
      if (!trustObjective || trustObjective.trim().length === 0) {
        setErrors({ trustObjective: 'Please select your trust objective' });
        return;
      }
      setErrors({});
      if (onProceed) {
        onProceed({
          trusteesCount: numberOfTrustees,
          trustName: trustName.trim(),
          trustCategory: trustObjective.trim(),
        });
      }
    }
  };

  const handleBack = () => {
    if (subStep === 3) {
      setSubStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 2) {
      setSubStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Decorative Stepped Geometric Corners (1:1 with Partnership UI) */}
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
          Trust Registration • Step {subStep} of 3
        </div>
      </div>

      {/* Main Centered 2-Column Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* LEFT COLUMN: Trust Value Propositions (1:1 with Partnership UI) */}
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

            {/* 3 Value bullets matching screenshots */}
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

        {/* RIGHT COLUMN: Questionnaire Card (1:1 with Partnership UI) */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-8">
            {/* Logo Badge (Matching VAKIL SEARCH yellow pill style) */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
                <span>BHARAT</span>
                <span className="font-semibold text-slate-900">FILING</span>
              </div>
            </div>

            {/* Segmented Progress Tracker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 font-bold">
                  {subStep}/3 complete
                </span>
                <span className="text-slate-400 font-normal">
                  Takes less than 1 min
                </span>
              </div>

              {/* 3-Segment Progress Bar */}
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
                <div
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    subStep >= 3 ? 'bg-[#10B981]' : 'bg-slate-200'
                  }`}
                />
              </div>
            </div>

            {/* -------------------------------------------------------------
                SUB-STEP 1 of 3: How many trustees are you planning to start with?
            ------------------------------------------------------------- */}
            {subStep === 1 && (
              <div className="space-y-5 pt-2 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    How many trustees are you planning to start with?
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Includes 1 Settlor (author/founder) plus managing trustees.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                  {trusteeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setNumberOfTrustees(opt.id)}
                      className={`h-14 sm:h-16 rounded-xl border-2 font-bold text-base sm:text-lg flex items-center justify-center transition-all cursor-pointer ${
                        numberOfTrustees === opt.id
                          ? 'border-[#002B49] bg-blue-50/40 text-[#002B49] shadow-sm'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------
                SUB-STEP 2 of 3: Enter your desired trust name
            ------------------------------------------------------------- */}
            {subStep === 2 && (
              <div className="space-y-5 pt-2 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    Enter your desired trust name
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    This will be printed on your Trust Deed and registration certificate.
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={trustName}
                    onChange={(e) => {
                      setTrustName(e.target.value);
                      if (errors.trustName) setErrors({});
                    }}
                    placeholder="e.g. Vidya Jyoti Educational Trust"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all focus:outline-none ${
                      errors.trustName
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {errors.trustName && (
                    <p className="text-xs text-rose-500 font-medium">
                      {errors.trustName}
                    </p>
                  )}
                </div>

                {/* Helper / Skip Hint with Lightbulb */}
                <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Yet to finalize your brand name? Don&apos;t worry, you can always
                    do this step later!{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setTrustName('Vidya Jyoti Educational Trust');
                        handleNext();
                      }}
                      className="font-bold underline cursor-pointer hover:text-amber-950"
                    >
                      Skip it for now
                    </button>
                  </span>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------
                SUB-STEP 3 of 3: What industry does your business belong to?
            ------------------------------------------------------------- */}
            {subStep === 3 && (
              <div className="space-y-5 pt-2 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    What primary objective does your trust focus on?
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Helps us customize the legal clauses for 12A/80G tax exemptions.
                  </p>
                </div>

                <div className="relative" ref={dropdownRef}>
                  <div className="relative">
                    <input
                      type="text"
                      value={trustObjective}
                      onChange={(e) => {
                        setTrustObjective(e.target.value);
                        setIsDropdownOpen(true);
                        if (errors.trustObjective) setErrors({});
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      placeholder="Type or select primary objective..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium pr-10 transition-all focus:outline-none ${
                        errors.trustObjective
                          ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                          : 'border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-blue-100'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {isDropdownOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {errors.trustObjective && (
                    <p className="text-xs text-rose-500 font-medium mt-1">
                      {errors.trustObjective}
                    </p>
                  )}

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-20 left-0 right-0 mt-1 max-h-52 overflow-y-auto bg-white rounded-xl border border-slate-200 shadow-xl py-1 text-xs sm:text-sm">
                      {filteredObjectives.length > 0 ? (
                        filteredObjectives.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setTrustObjective(item);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition cursor-pointer flex items-center justify-between ${
                              trustObjective === item
                                ? 'bg-blue-50/70 text-[#002B49] font-bold'
                                : 'text-slate-700 font-normal'
                            }`}
                          >
                            <span>{item}</span>
                            {trustObjective === item && (
                              <CheckCircle2 className="w-4 h-4 text-blue-800" />
                            )}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-xs text-slate-400 text-center">
                          No matching category found. You can type custom.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Button Bar */}
          <div className="pt-8 border-t border-slate-100 flex items-center justify-between gap-3">
            {subStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="py-3 px-5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="py-3.5 px-8 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer ml-auto"
            >
              <span>{subStep === 3 ? 'Next' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
