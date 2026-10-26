import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function BusinessDetailsPage({
  formData = {},
  onInputChange,
  onBack,
  onSubmit,
}) {
  // Sub-step inside Step 2: 1 = Entity Type, 2 = Employee Count
  const [subStep, setSubStep] = useState(1);

  // Question 1: What's your type of entity?
  const [entityType, setEntityType] = useState(
    formData.entityType || 'Pvt. Ltd'
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Question 2: How many employees does your company have?
  // 'Less than 10' | '10 - 20' | '50 - 100' | '50+'
  const [employeeCount, setEmployeeCount] = useState(
    formData.employeeCount || '10 - 20'
  );

  const entityOptions = [
    { label: 'Pvt. Ltd', desc: 'Private Limited Company' },
    { label: 'LLP', desc: 'Limited Liability Partnership' },
    { label: 'Proprietorship', desc: 'Sole Proprietor Business' },
    { label: 'Partnership Firm', desc: 'Registered / Unregistered Firm' },
    { label: 'One Person Company', desc: 'Single Founder OPC' },
    { label: 'Public Limited', desc: 'Public Limited Corporation' },
    { label: 'Individual / Professional', desc: 'Freelance, Doctor, CA, Advocate' },
  ];

  const employeeOptions = [
    { id: 'Less than 10', label: 'Less than 10' },
    { id: '10 - 20', label: '10 - 20' },
    { id: '50 - 100', label: '50 - 100' },
    { id: '50+', label: '50+' },
  ];

  const handleSelectEntity = (val) => {
    setEntityType(val);
    setIsDropdownOpen(false);
    if (onInputChange) {
      onInputChange('entityType', val);
    }
  };

  const handleSelectEmployee = (val) => {
    setEmployeeCount(val);
    if (onInputChange) {
      onInputChange('employeeCount', val);
    }
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();

    if (subStep === 1) {
      setSubStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 2) {
      if (onSubmit) {
        onSubmit({
          entityType,
          employeeCount,
        });
      }
    }
  };

  const handlePrev = () => {
    if (subStep === 2) {
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
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main 2-Column Container (1:1 VAKILSEARCH MATCH OF MEDIA_1793008562100_83A52CAB.PNG & MEDIA_1793008582636_B50064E1.PNG) */}
      <main className="max-w-5xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column: Headlines & 3 Value Checkpoints (Identical across both sub-steps) */}
        <div className="lg:col-span-6 space-y-7 pl-2 sm:pl-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002B49] tracking-tight leading-tight">
              10 Lakh+
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-slate-500 mt-1 leading-snug">
              PT Registrations Certificate Submitted Successfully
            </p>
          </div>

          <div className="space-y-6 pt-3">
            
            {/* Metric 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Timely submission of application
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-normal">
                  100% compliance assurance so that you can focus only on your business
                </p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  24x7 expert support
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-normal">
                  Minimize challenges &amp; Maximize productivity
                </p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Get tailored solutions to your legal problems
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-normal">
                  Take expert advice for all relevant domains
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Interactive Wizard Card (Matching Screenshots 1:1) */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sm:p-10 w-full max-w-lg mx-auto flex flex-col justify-between min-h-[440px]">
            
            {/* Top Logo (Official BharatFiling Brand Badge) */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-6">
                <img
                  src="/bharatfiling-brand-icon.png"
                  alt="BharatFiling"
                  className="h-7 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
                  }}
                />
                <span className="text-xl font-extrabold tracking-tight text-[#111827]">
                  Bharat<span className="text-[#F26522]">Filing</span>
                </span>
              </div>

              {/* Progress Indicator (1/2 or 2/2 complete) */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-slate-800">
                    {subStep === 1 ? '1/2 complete' : '2/2 complete'}
                  </span>
                  <span className="text-slate-400 font-medium text-xs">
                    Takes less than 1 min
                  </span>
                </div>

                {/* 2-Segment Progress Bar */}
                <div className="grid grid-cols-2 gap-2 w-full">
                  {/* Segment 1 */}
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      subStep >= 1 ? 'bg-[#22c55e]' : 'bg-slate-200'
                    }`}
                  />
                  {/* Segment 2 */}
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      subStep >= 2 ? 'bg-[#22c55e]' : 'bg-slate-200'
                    }`}
                  />
                </div>
              </div>

              {/* SUB-STEP 1: What's your type of entity? (media_1793008562100_83a52cab.png) */}
              {subStep === 1 && (
                <div className="mt-6 space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    What's your type of entity?
                  </h2>

                  {/* Custom Dropdown Input matching screenshot */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full flex items-center justify-between px-4 py-3.5 bg-white border border-[#002B49] rounded-lg text-sm sm:text-base font-semibold text-slate-800 text-left focus:outline-none focus:ring-1 focus:ring-[#002B49] transition cursor-pointer"
                    >
                      <span>{entityType}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-20 max-h-64 overflow-y-auto divide-y divide-slate-100">
                        {entityOptions.map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => handleSelectEntity(opt.label)}
                            className={`w-full px-4 py-3 text-left flex items-center justify-between text-sm transition hover:bg-slate-50 cursor-pointer ${
                              entityType === opt.label
                                ? 'bg-blue-50/70 text-[#002B49] font-bold'
                                : 'text-slate-700 font-medium'
                            }`}
                          >
                            <div>
                              <span>{opt.label}</span>
                              <span className="block text-xs text-slate-400 font-normal">
                                {opt.desc}
                              </span>
                            </div>
                            {entityType === opt.label && (
                              <Check className="w-4 h-4 text-[#002B49] shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SUB-STEP 2: How many employees does your company have? (media_1793008582636_b50064e1.png) */}
              {subStep === 2 && (
                <div className="mt-6 space-y-4">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                    How many employees does your company have?
                  </h2>

                  {/* 2x2 Radio Grid (Matching Screenshot 1:1) */}
                  <div className="grid grid-cols-2 gap-3.5 pt-2">
                    {employeeOptions.map((opt) => {
                      const isSelected = employeeCount === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectEmployee(opt.id)}
                          className={`flex items-center gap-3 p-4 rounded-lg border text-sm sm:text-base font-semibold transition text-left cursor-pointer ${
                            isSelected
                              ? 'border-[#002B49] bg-slate-100/70 text-slate-900 shadow-2xs ring-1 ring-[#002B49]'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/60'
                          }`}
                        >
                          {/* Radio Circle */}
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-[#002B49] bg-[#002B49]'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <span className="select-none">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions Row */}
            <div className="pt-8 mt-6 border-t border-slate-100">
              <div
                className={`flex items-center ${
                  subStep === 1 ? 'justify-end' : 'justify-between'
                }`}
              >
                {/* Back Button (Only on Sub-step 2, matching screenshot) */}
                {subStep === 2 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>← Back</span>
                  </button>
                )}

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-9 py-3 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm transition shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <span>Next</span>
                  <span>→</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Trust Footer Bar */}
      <footer className="max-w-5xl w-full mx-auto text-center pt-6 text-xs text-slate-400">
        <p>🔒 256-Bit SSL Encrypted Statutory Filing Desk • Governed under Article 276 Constitution of India</p>
      </footer>

    </div>
  );
}
