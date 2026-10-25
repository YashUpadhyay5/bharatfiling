import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { ORGANIZATION_TYPES, ANNUAL_TURNOVER_OPTIONS } from './constants.js';

export default function EnterpriseDetailsPage({
  formData = {},
  onInputChange,
  onBack,
  onSubmit,
  isSubmitting,
}) {
  const [subStep, setSubStep] = useState(1); // 1 = Entity Type (0/2 complete), 2 = Annual Turnover (2/2 complete)
  const [isEntityDropdownOpen, setIsEntityDropdownOpen] = useState(false);
  const [isTurnoverDropdownOpen, setIsTurnoverDropdownOpen] = useState(false);

  const [selectedEntity, setSelectedEntity] = useState(formData.organizationType || '');
  const [selectedTurnover, setSelectedTurnover] = useState(
    formData.annualTurnover || '10 lakhs - 1 crore'
  );

  const handleSelectEntity = (opt) => {
    setSelectedEntity(opt);
    onInputChange('organizationType', opt);
    setIsEntityDropdownOpen(false);
  };

  const handleSelectTurnover = (opt) => {
    setSelectedTurnover(opt);
    onInputChange('annualTurnover', opt);
    setIsTurnoverDropdownOpen(false);
  };

  const handleNextClick = (e) => {
    if (e) e.preventDefault();
    if (subStep === 1) {
      if (!selectedEntity) return;
      setSubStep(2);
    } else {
      if (onSubmit) {
        onSubmit(e);
      }
    }
  };

  const handleBackClick = (e) => {
    if (e) e.preventDefault();
    if (subStep === 2) {
      setSubStep(1);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7F8] font-sans pb-16">
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

      {/* Main 2-Column Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT COLUMN: 1.5 Lakh + Successful MSME Registrations */}
          <div className="lg:col-span-6 p-2 sm:p-6 flex flex-col justify-center">
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#042D50] tracking-tight leading-[1.25]">
                1.5 Lakh +{' '}
                <span className="text-[#94A3B8] font-normal block sm:inline">
                  Successful MSME Registrations
                </span>
              </h1>

              <div className="space-y-6 pt-2">
                {/* Bullet 1 */}
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-[#022B50] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      MSME registration in under 3 days
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      Expand your business without having to wait
                    </p>
                  </div>
                </div>

                {/* Bullet 2 */}
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-[#022B50] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Complete assistance during documentation till registration
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      Start you business from the comfort of your home
                    </p>
                  </div>
                </div>

                {/* Bullet 3 */}
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-[#022B50] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      24x7 expert support
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      Minimize challenges &amp; Maximize productivity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Question Card */}
          <div className="lg:col-span-6">
            <div className="w-full max-w-[430px] mx-auto bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-slate-100 p-6 sm:p-8 relative">
              
              {/* Brand Logo inside Card Header */}
              <div className="flex items-center justify-center mb-6 select-none">
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

              {/* Progress & Status Bar (Exact clone of reference images) */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">
                    {subStep === 1
                      ? selectedEntity
                        ? '1/2 complete'
                        : '0/2 complete'
                      : '2/2 complete'}
                  </span>
                  <span className="text-slate-400 font-medium">Takes less than 1 min</span>
                </div>

                {/* Segmented Green Progress Bar */}
                <div className="flex items-center gap-2">
                  <div
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      subStep >= 1 && selectedEntity ? 'bg-[#16A34A]' : 'bg-slate-200'
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      subStep >= 2 ? 'bg-[#16A34A]' : 'bg-slate-200'
                    }`}
                  />
                </div>
                <div className="border-b border-slate-100 pt-2" />
              </div>

              {/* QUESTION 1: Entity Type Selection (0/2 complete) */}
              {subStep === 1 && (
                <div className="space-y-4">
                  <label className="block text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    Please select your entity type?
                  </label>

                  {/* Dropdown Container */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsEntityDropdownOpen(!isEntityDropdownOpen)}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-left text-xs sm:text-sm font-normal text-slate-800 flex items-center justify-between shadow-xs cursor-pointer transition ${
                        isEntityDropdownOpen
                          ? 'border-blue-500 ring-1 ring-blue-500'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <span className={selectedEntity ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                        {selectedEntity ? selectedEntity : 'Select option'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          isEntityDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu Options */}
                    {isEntityDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                        {ORGANIZATION_TYPES.map((opt) => {
                          const isOptionSelected = selectedEntity === opt;
                          return (
                            <div
                              key={opt}
                              onClick={() => handleSelectEntity(opt)}
                              className={`px-4 py-2.5 text-xs sm:text-sm transition cursor-pointer select-none ${
                                isOptionSelected
                                  ? 'bg-[#EBF3FE] text-[#0066FF] font-semibold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {opt}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Next Button (Right-aligned, matching Image 1) */}
                  <div className="pt-8 flex justify-end">
                    <button
                      type="button"
                      disabled={!selectedEntity}
                      onClick={handleNextClick}
                      className={`px-8 py-2.5 rounded-md font-bold text-xs sm:text-sm transition flex items-center gap-1.5 ${
                        selectedEntity
                          ? 'bg-[#002B49] hover:bg-[#073866] text-white shadow-xs cursor-pointer active:scale-98'
                          : 'bg-[#E5E9EC] text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Next</span>
                      <span className="text-base leading-none">&rarr;</span>
                    </button>
                  </div>
                </div>
              )}

              {/* QUESTION 2: Annual Turnover (2/2 complete) - Exact clone of Image 3 */}
              {subStep === 2 && (
                <div className="space-y-4">
                  <label className="block text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    What’s the annual turnover of your company?
                  </label>

                  {/* Turnover Dropdown Container */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsTurnoverDropdownOpen(!isTurnoverDropdownOpen)}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white border text-left text-xs sm:text-sm font-normal text-slate-800 flex items-center justify-between shadow-xs cursor-pointer transition ${
                        isTurnoverDropdownOpen
                          ? 'border-[#002B49] ring-1 ring-[#002B49]'
                          : 'border-slate-800 hover:border-slate-900'
                      }`}
                    >
                      <span className="text-slate-900 font-medium">
                        {selectedTurnover}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-600 transition-transform ${
                          isTurnoverDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Turnover Dropdown Options */}
                    {isTurnoverDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-30 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                        {ANNUAL_TURNOVER_OPTIONS.map((opt) => {
                          const isOptionSelected = selectedTurnover === opt;
                          return (
                            <div
                              key={opt}
                              onClick={() => handleSelectTurnover(opt)}
                              className={`px-4 py-2.5 text-xs sm:text-sm transition cursor-pointer select-none ${
                                isOptionSelected
                                  ? 'bg-[#EBF3FE] text-[#0066FF] font-semibold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {opt}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Buttons: Back and Next (matching Image 3) */}
                  <div className="pt-8 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleBackClick}
                      className="px-6 py-2.5 rounded-md border border-[#002B49] text-[#002B49] font-bold text-xs sm:text-sm hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleNextClick}
                      className="px-8 py-2.5 rounded-md bg-[#002B49] hover:bg-[#073866] text-white font-bold text-xs sm:text-sm shadow-xs transition active:scale-98 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{isSubmitting ? 'Processing...' : 'Next'}</span>
                      <span className="text-base leading-none">&rarr;</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
