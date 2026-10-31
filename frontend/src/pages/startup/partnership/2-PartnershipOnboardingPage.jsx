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

const INDUSTRY_OPTIONS = [
  'Information Technology / Software / Tech',
  'Finance / NBFC / Fintech',
  'Retail / E-commerce / D2C',
  'Manufacturing / Industrial Goods',
  'Healthcare / Pharmaceuticals / Clinics',
  'Real Estate / Architecture / Construction',
  'Consulting / Legal / Professional Services',
  'Logistics / Warehousing / Supply Chain',
  'Food & Beverages / Restaurants / Agro',
  'Media / Advertising / Digital Marketing',
  'Education / Training / EdTech',
  'Import / Export / International Trade',
  'Tourism / Hospitality / Travel',
  'Automobile / EV / Transport',
  'Other Business / General Trading',
];

export default function PartnershipOnboardingPage({
  formData = {},
  onBack,
  onProceed,
}) {
  // Current onboarding sub-step (1: 1/3, 2: 2/3, 3: 3/3)
  const [subStep, setSubStep] = useState(1);

  // Form inputs across the 3 sub-steps
  const [numberOfPartners, setNumberOfPartners] = useState(
    formData.numberOfPartners || '3-5'
  );
  const [firmName, setFirmName] = useState(formData.firmName || 'yash');
  const [industryType, setIndustryType] = useState(
    formData.industryType || 'tech'
  );

  // Industry dropdown state
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

  const partnerOptions = [
    { id: '2', label: '2' },
    { id: '3-5', label: '3-5' },
    { id: '6-10', label: '6-10' },
  ];

  // Filter industry options based on typed text
  const filteredIndustries = INDUSTRY_OPTIONS.filter((item) =>
    item.toLowerCase().includes((industryType || '').toLowerCase())
  );

  const handleNext = () => {
    if (subStep === 1) {
      setSubStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 2) {
      if (!firmName || firmName.trim().length === 0) {
        setErrors({ firmName: 'Please provide a preferred firm name' });
        return;
      }
      setErrors({});
      setSubStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 3) {
      if (!industryType || industryType.trim().length === 0) {
        setErrors({ industryType: 'Please provide your industry type' });
        return;
      }
      setErrors({});
      if (onProceed) {
        onProceed({
          numberOfPartners,
          firmName: firmName.trim(),
          industryType: industryType.trim(),
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
      {/* Decorative Stepped Geometric Corners (Matching screenshot media_1793437760958_a855c27e.png) */}
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
          Partnership Registration • Step {subStep} of 3
        </div>
      </div>

      {/* Main Centered 2-Column Container (1:1 with media_1793437760958_a855c27e.png, media_1793438008589_986a59cd.png, media_1793438026631_c42a93b3.png) */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* LEFT COLUMN: Trust Value Propositions (Identical across all 3 sub-steps) */}
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

        {/* RIGHT COLUMN: Questionnaire Card (Changes between 1/3, 2/3, 3/3) */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-8">
            {/* Logo Badge (Matching VAKIL SEARCH yellow pill style in screenshot) */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
                <span>BHARAT</span>
                <span className="font-semibold text-slate-900">FILING</span>
              </div>
            </div>

            {/* Segmented Progress Tracker (1/3, 2/3, 3/3 matching screenshots) */}
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
                SUB-STEP 1 of 3: How many partners are you planning to start with?
                (1:1 with media_1793437760958_a855c27e.png)
            ------------------------------------------------------------- */}
            {subStep === 1 && (
              <div className="space-y-5 pt-2 animate-in fade-in duration-200">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  How many partners are you planning to start with?
                </h3>

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
            )}

            {/* -------------------------------------------------------------
                SUB-STEP 2 of 3: Please provide your preferred name for the partnership firm
                (1:1 with media_1793438008589_986a59cd.png)
            ------------------------------------------------------------- */}
            {subStep === 2 && (
              <div className="space-y-5 pt-2 animate-in fade-in duration-200">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
                  Please provide your preferred name for the partnership firm
                </h3>

                <div>
                  <label htmlFor="pref-firm-name" className="sr-only">
                    Preferred name for partnership firm
                  </label>
                  <input
                    id="pref-firm-name"
                    type="text"
                    value={firmName}
                    placeholder="Enter preferred firm name (e.g., Apex Technologies)"
                    onChange={(e) => {
                      setFirmName(e.target.value);
                      if (errors.firmName) setErrors({});
                    }}
                    autoFocus
                    className="w-full px-4 py-3 rounded-lg border border-slate-400 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/20 focus:outline-none text-sm text-slate-900 bg-white shadow-2xs transition"
                  />
                  {errors.firmName && (
                    <p className="text-xs text-rose-600 mt-1.5">
                      {errors.firmName}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 mt-2">
                    Our CA team will verify name availability across the MCA &amp;
                    Trademark registries.
                  </p>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------
                SUB-STEP 3 of 3: What's your industry type?
                (1:1 with media_1793438026631_c42a93b3.png)
            ------------------------------------------------------------- */}
            {subStep === 3 && (
              <div
                className="space-y-5 pt-2 animate-in fade-in duration-200 relative"
                ref={dropdownRef}
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  What&apos;s your industry type?
                </h3>

                <div className="relative">
                  <label htmlFor="industry-input" className="sr-only">
                    Industry type
                  </label>
                  <div className="relative">
                    <input
                      id="industry-input"
                      type="text"
                      value={industryType}
                      placeholder="Type or select industry (e.g. Technology, Retail, Manufacturing)"
                      onChange={(e) => {
                        setIndustryType(e.target.value);
                        setIsDropdownOpen(true);
                        if (errors.industryType) setErrors({});
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      autoFocus
                      className="w-full px-4 py-3 rounded-lg border border-slate-400 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/20 focus:outline-none text-sm text-slate-900 bg-white shadow-2xs transition pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {isDropdownOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {errors.industryType && (
                    <p className="text-xs text-rose-600 mt-1.5">
                      {errors.industryType}
                    </p>
                  )}

                  {/* Dropdown Options List */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-lg z-20 divide-y divide-slate-100">
                      {filteredIndustries.length > 0 ? (
                        filteredIndustries.map((ind, i) => (
                          <div
                            key={i}
                            onClick={() => {
                              setIndustryType(ind);
                              setIsDropdownOpen(false);
                            }}
                            className="px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 cursor-pointer transition flex items-center justify-between"
                          >
                            <span>{ind}</span>
                            {industryType === ind && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-2.5 text-xs text-slate-500">
                          Press enter or &quot;Next&quot; to use &quot;{industryType}&quot;
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Lightbulb Hint (Exact match with media_1793438026631_c42a93b3.png) */}
                <div className="flex items-start gap-2.5 pt-1">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    It&apos;s OK if your industry is not in drop down. Just type in
                    what you do.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Row: Back Button & Next Button (1:1 with media_1793438008589_986a59cd.png & media_1793438026631_c42a93b3.png) */}
          <div className="pt-8 mt-6 flex items-center justify-between">
            {subStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-lg border border-slate-400 hover:border-slate-600 bg-white text-slate-800 text-sm font-semibold shadow-2xs hover:bg-slate-50 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div /> /* Empty spacer for step 1 */
            )}

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
