import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

export default function BusinessDetailsPage({
  formData = {},
  onInputChange,
  onBack,
  onSubmit,
  isSubmitting = false,
}) {
  // Sub-step inside Step 2: 1 = License Type, 2 = Turnover, 3 = Online/Import-Export
  const [subStep, setSubStep] = useState(1);

  // Question 1: What type of license are you looking for?
  // 'new_registration' | 'renewal' | 'modification'
  const [licenseType, setLicenseType] = useState(
    formData.licenseType || 'new_registration'
  );

  // Question 2: What's your annual turnover?
  // 'under_12_lakh' | '12_to_20_crore' | 'above_20_crore'
  const [turnover, setTurnover] = useState(
    formData.turnover || 'under_12_lakh'
  );

  // Question 3: Are you involved in either Online Food Business or Food Import & Export?
  // 'yes' | 'no'
  const [isOnlineOrImportExport, setIsOnlineOrImportExport] = useState(
    formData.isOnlineOrImportExport || 'yes'
  );

  const handleSelectLicenseType = (val) => {
    setLicenseType(val);
    if (onInputChange) {
      onInputChange('licenseType', val);
    }
  };

  const handleSelectTurnover = (val) => {
    setTurnover(val);
    if (onInputChange) {
      onInputChange('turnover', val);
      // Auto-suggest plan based on turnover
      if (val === 'under_12_lakh') {
        onInputChange('plan', 'basic');
      } else if (val === '12_to_20_crore') {
        onInputChange('plan', 'state');
      } else if (val === 'above_20_crore') {
        onInputChange('plan', 'central');
      }
    }
  };

  const handleSelectOnlineOrImport = (val) => {
    setIsOnlineOrImportExport(val);
    if (onInputChange) {
      onInputChange('isOnlineOrImportExport', val);
      // If user has high turnover or import-export, set central plan
      if (val === 'yes' && turnover === 'above_20_crore') {
        onInputChange('plan', 'central');
      }
    }
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();

    if (subStep === 1) {
      setSubStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 2) {
      setSubStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 3) {
      if (onSubmit) {
        onSubmit(e);
      }
    }
  };

  const handlePrev = () => {
    if (subStep === 3) {
      setSubStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 2) {
      setSubStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 1) {
      if (onBack) {
        onBack();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col justify-between py-6 sm:py-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Background Decorative Graphic Accents matching reference layout */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header Bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 sm:pb-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
          <img
            src="/bharatfiling-user-logo.png"
            alt="BharatFiling"
            className="h-8 sm:h-9 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
            }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Online FoSCoS Government Portal</span>
        </div>
      </header>

      {/* Main 2-Column Container (1:1 VAKILSEARCH MATCH OF MEDIA_1792998732657_4804ee47.PNG) */}
      <main className="max-w-5xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column: Headlines & 3 Trust Metrics (Identical across all 3 sub-steps) */}
        <div className="lg:col-span-6 space-y-7">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002B49] tracking-tight">
              <span>2 Lakhs+ </span>
              <span className="text-slate-500 font-bold">Food License Registered</span>
            </h1>
            <p className="text-base sm:text-lg font-bold text-[#002B49] mt-2">
              Elevate Your Food Business to New Heights
            </p>
          </div>

          <div className="space-y-6 pt-2">
            
            {/* Metric 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  24 hour application submission
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  With our experts it's simpler, faster &amp; easier
                </p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  24x7 expert support
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Minimize challenges &amp; maximize productivity
                </p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-3 h-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  99% success rate in FSSAI registration
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Trust, Compliance, and Quality for Your Food Business!
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Centered White Form Card (1:1 VAKILSEARCH CLONE) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-9 max-w-md w-full space-y-6">
            
            {/* Top Brand Tag (Exact style of yellow Vakilsearch logo tag) */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 select-none">
                <span className="bg-[#FFCC00] text-slate-950 text-xs font-black px-2 py-0.5 tracking-tight rounded-xs">
                  BHARAT
                </span>
                <span className="text-slate-900 text-xs font-black tracking-wide">
                  SEARCH
                </span>
              </div>
            </div>

            {/* Progress Bar Header matching Screenshot */}
            <div className="border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2.5">
                <span>{subStep}/3 complete</span>
                <span className="text-slate-400 font-normal">Takes less than 1 min</span>
              </div>

              {/* 3 Horizontal Segment Progress Indicator */}
              <div className="grid grid-cols-3 gap-2">
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${
                    subStep >= 1 ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${
                    subStep >= 2 ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
                <div
                  className={`h-1 rounded-full transition-all duration-300 ${
                    subStep >= 3 ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              </div>
            </div>

            {/* ============================================================== */}
            {/* SUB-STEP 1: What type of license are you looking for?           */}
            {/* ============================================================== */}
            {subStep === 1 && (
              <div className="space-y-5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  What type of license are you looking for?
                </h2>

                <div className="space-y-3">
                  {[
                    { id: 'new_registration', label: 'New registration' },
                    { id: 'renewal', label: 'Renewal' },
                    { id: 'modification', label: 'Modification' },
                  ].map((opt) => {
                    const isSelected = licenseType === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectLicenseType(opt.id)}
                        className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                          isSelected
                            ? 'border-[#002B49] bg-[#EBF3FA] text-slate-900 font-semibold'
                            : 'border-slate-300 hover:border-slate-400 bg-white text-slate-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#002B49]'
                              : 'border-slate-400'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm">{opt.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom CTA Row: Only Next button (aligned right) */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="py-3 px-8 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-xs sm:text-sm transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* SUB-STEP 2: What's your annual turnover?                        */}
            {/* ============================================================== */}
            {subStep === 2 && (
              <div className="space-y-5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  What's your annual turnover?
                </h2>

                <div className="space-y-3">
                  {[
                    { id: 'under_12_lakh', label: 'Less than 12 lakhs' },
                    { id: '12_to_20_crore', label: '12 lakhs - 20 crores' },
                    { id: 'above_20_crore', label: 'More than 20 crores' },
                  ].map((opt) => {
                    const isSelected = turnover === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectTurnover(opt.id)}
                        className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                          isSelected
                            ? 'border-[#002B49] bg-[#EBF3FA] text-slate-900 font-semibold'
                            : 'border-slate-300 hover:border-slate-400 bg-white text-slate-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#002B49]'
                              : 'border-slate-400'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm">{opt.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom CTA Row: Back & Next buttons */}
                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="py-3 px-6 rounded-lg border border-slate-300 hover:bg-slate-50 text-[#002B49] font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="py-3 px-8 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-xs sm:text-sm transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ============================================================== */}
            {/* SUB-STEP 3: Online Food Business or Food Import & Export?       */}
            {/* ============================================================== */}
            {subStep === 3 && (
              <div className="space-y-5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  Are you involved in either Online Food Business or Food Import &amp; Export?
                </h2>

                <div className="space-y-3">
                  {[
                    { id: 'yes', label: 'Yes' },
                    { id: 'no', label: 'No' },
                  ].map((opt) => {
                    const isSelected = isOnlineOrImportExport === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOnlineOrImport(opt.id)}
                        className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                          isSelected
                            ? 'border-[#002B49] bg-[#EBF3FA] text-slate-900 font-semibold'
                            : 'border-slate-300 hover:border-slate-400 bg-white text-slate-700'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#002B49]'
                              : 'border-slate-400'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm">{opt.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom CTA Row: Back & Next (Proceeds to Step 3 Checkout) */}
                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="py-3 px-6 rounded-lg border border-slate-300 hover:bg-slate-50 text-[#002B49] font-bold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="py-3 px-8 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-xs sm:text-sm transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </main>

      {/* Footer minimal info */}
      <footer className="max-w-6xl w-full mx-auto text-center py-4 text-xs text-slate-400">
        © BharatFiling Statutory Facilitation Desk • ISO 27001 Certified System
      </footer>

    </div>
  );
}
