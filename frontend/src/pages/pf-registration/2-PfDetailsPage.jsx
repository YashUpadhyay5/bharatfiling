import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react';

export default function PfDetailsPage({
  formData = {},
  onInputChange,
  onBack,
  onSubmit,
  isSubmitting = false,
}) {
  // Sub-step inside Page 2:
  // 1 = Employee Strength & Coverage question (20+ vs <20)
  // 2 = CIN/GSTIN and DBS Bank Salary Current Account question
  const [subStep, setSubStep] = useState(1);

  // Question 1: Employee Strength ('twenty_plus' | 'under_twenty')
  const [employeeCoverage, setEmployeeCoverage] = useState(
    formData.coverageType === 'voluntary' || formData.employeeCoverage === 'under_twenty'
      ? 'under_twenty'
      : 'twenty_plus'
  );

  // Question 2a: Business CIN or GSTIN number
  const [cinGstin, setCinGstin] = useState(formData.cinGstin || formData.entityPan || '');

  // Question 2b: DBS Bank zero-balance salary current account ('yes' | 'no')
  const [wantDbsAccount, setWantDbsAccount] = useState(
    formData.wantDbsAccount !== undefined ? formData.wantDbsAccount : 'yes'
  );

  const handleSelectCoverage = (val) => {
    setEmployeeCoverage(val);
    if (onInputChange) {
      onInputChange('employeeCoverage', val);
      onInputChange('coverageType', val === 'twenty_plus' ? 'mandatory' : 'voluntary');
      onInputChange('employeeCount', val === 'twenty_plus' ? 25 : 12);
    }
  };

  const handleSelectDbs = (val) => {
    setWantDbsAccount(val);
    if (onInputChange) {
      onInputChange('wantDbsAccount', val);
    }
  };

  const handleNext = (e) => {
    if (e) e.preventDefault();

    if (subStep === 1) {
      if (!employeeCoverage) return;
      setSubStep(2);
    } else if (subStep === 2) {
      if (onSubmit) {
        onSubmit({
          employeeCoverage,
          coverageType: employeeCoverage === 'twenty_plus' ? 'mandatory' : 'voluntary',
          employeeCount: employeeCoverage === 'twenty_plus' ? 25 : 12,
          cinGstin: cinGstin.trim().toUpperCase(),
          wantDbsAccount,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Top Header Bar with Brand Logo & Trust Tag (1:1 with Screenshot) */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 sm:pb-8">
        <div className="flex items-center gap-3">
          <img
            src="/bharatfiling-user-logo.png"
            alt="BharatFiling"
            className="h-8 sm:h-9 w-auto object-contain cursor-pointer"
            onClick={onBack}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
            }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Online EPFO Application</span>
        </div>
      </header>

      {/* Main 2-Column Container (Exact clone of media_1793095970956_bce00c26.png) */}
      <main className="max-w-5xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* LEFT COLUMN: Trust & Highlights (Exact clone of Image) */}
        <div className="lg:col-span-6 space-y-7 pr-0 lg:pr-6">
          
          {/* Main Title & Subtitle */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002B49] tracking-tight">
              25,000+ Establishments registered
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-500 mt-2">
              Stay updated, anytime. anywhere.
            </p>
          </div>

          {/* 3 Checklist Highlights with Navy Double-Ring Target Icons */}
          <div className="space-y-6 pt-2">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 fill-[#002B49] text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Get EPF registered in under 5 business days
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  With our experts it&apos;s simpler, faster &amp; easier
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 fill-[#002B49] text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  24x7 expert support
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Minimize challenges &amp; maximize productivity
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 fill-[#002B49] text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Get tailored solutions and expert guidance
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quick and easy registration process
                </p>
              </div>
            </div>

          </div>

          {/* Exclusive Banking Partner (Exact clone from Image) */}
          <div className="pt-6 border-t border-slate-200">
            <div className="text-xs font-semibold text-slate-700 mb-2">
              Exclusive banking partner
            </div>
            <div className="flex items-center gap-2 select-none">
              {/* Red DBS 4-diamond icon */}
              <div className="w-6 h-6 relative shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E60000]">
                  <polygon points="50,0 65,15 50,30 35,15" />
                  <polygon points="100,50 85,65 70,50 85,35" />
                  <polygon points="50,100 35,85 50,70 65,85" />
                  <polygon points="0,50 15,35 30,50 15,65" />
                  <polygon points="50,20 80,50 50,80 20,50" />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">
                DBS <span className="font-bold text-slate-700 text-lg">BANK</span>
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: White Interactive Card (Exact clone of Image) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-7 sm:p-9 w-full max-w-[460px] min-h-[460px] flex flex-col justify-between relative">
            
            {/* Card Content Top Area */}
            <div>
              {/* Centered Brand Logo */}
              <div className="flex justify-center mb-6">
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

              {/* Progress Header Row (1/2 complete / 2/2 complete | Takes less than 1 min) */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-900">
                    {subStep === 1
                      ? employeeCoverage
                        ? '1/2 complete'
                        : '0/2 complete'
                      : wantDbsAccount
                      ? '2/2 complete'
                      : '1/2 complete'}
                  </span>
                  <span className="text-slate-400 font-normal">
                    Takes less than 1 min
                  </span>
                </div>

                {/* 2-Segment Horizontal Progress Bar (Green when complete, matching screenshot) */}
                <div className="flex items-center gap-2 mb-8">
                  {/* Segment 1 */}
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      employeeCoverage ? 'bg-[#22C55E]' : 'bg-slate-200'
                    }`}
                  />
                  {/* Segment 2 */}
                  <div
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      subStep === 2 && wantDbsAccount
                        ? 'bg-[#22C55E]'
                        : 'bg-slate-200'
                    }`}
                  />
                </div>
              </div>

              {/* QUESTION 1: Employee Strength & Statutory Coverage */}
              {subStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    How many employees does your establishment have?
                  </h2>

                  <div className="space-y-3 pt-2">
                    {/* Option 1: 20 or more employees (Mandatory) */}
                    <div
                      onClick={() => handleSelectCoverage('twenty_plus')}
                      className={`w-full p-4 rounded-lg border transition-all flex items-center gap-3.5 cursor-pointer select-none ${
                        employeeCoverage === 'twenty_plus'
                          ? 'border-[#002B49] bg-slate-50/70 ring-1 ring-[#002B49]'
                          : 'border-slate-300 hover:border-slate-400 bg-white'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          employeeCoverage === 'twenty_plus'
                            ? 'border-[#002B49]'
                            : 'border-slate-400'
                        }`}
                      >
                        {employeeCoverage === 'twenty_plus' && (
                          <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">
                          20 or more employees
                        </span>
                        <span className="text-xs text-slate-500">
                          Mandatory coverage under Section 1(3) of EPF Act
                        </span>
                      </div>
                    </div>

                    {/* Option 2: Fewer than 20 employees (Voluntary) */}
                    <div
                      onClick={() => handleSelectCoverage('under_twenty')}
                      className={`w-full p-4 rounded-lg border transition-all flex items-center gap-3.5 cursor-pointer select-none ${
                        employeeCoverage === 'under_twenty'
                          ? 'border-[#002B49] bg-slate-50/70 ring-1 ring-[#002B49]'
                          : 'border-slate-300 hover:border-slate-400 bg-white'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                          employeeCoverage === 'under_twenty'
                            ? 'border-[#002B49]'
                            : 'border-slate-400'
                        }`}
                      >
                        {employeeCoverage === 'under_twenty' && (
                          <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">
                          Fewer than 20 employees
                        </span>
                        <span className="text-xs text-slate-500">
                          Voluntary registration under Section 1(4) of EPF Act
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* QUESTION 2: CIN / GSTIN & Salary Account Question */}
              {subStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      Business Identity &amp; Banking Setup
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      A dedicated current account is required for EPFO monthly challan deposits.
                    </p>
                  </div>

                  {/* Input for CIN / GSTIN (From Screenshot media_1793095616145_ed3170aa.png) */}
                  <div className="pt-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      CIN / GSTIN / Entity PAN <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cinGstin}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setCinGstin(val);
                        if (onInputChange) onInputChange('cinGstin', val);
                      }}
                      placeholder="e.g. U72200KA2023PTC123456 or 29ABCDE1234F1Z5"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49] font-mono uppercase transition"
                    />
                  </div>

                  {/* Salary Account Options */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <span>Want a</span>
                      <span className="inline-flex items-center gap-1">
                        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 fill-[#E60000] inline-block shrink-0">
                          <polygon points="50,0 65,15 50,30 35,15" />
                          <polygon points="100,50 85,65 70,50 85,35" />
                          <polygon points="50,100 35,85 50,70 65,85" />
                          <polygon points="0,50 15,35 30,50 15,65" />
                          <polygon points="50,20 80,50 50,80 20,50" />
                        </svg>
                        <span className="font-black text-xs tracking-tight text-slate-900">
                          DBS<span className="font-normal text-[11px] text-slate-600">BANK</span>
                        </span>
                      </span>
                      <span>zero-balance current A/c?</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Yes */}
                      <div
                        onClick={() => handleSelectDbs('yes')}
                        className={`p-3 rounded-lg border transition-all flex items-center gap-2.5 cursor-pointer select-none ${
                          wantDbsAccount === 'yes'
                            ? 'border-[#002B49] bg-slate-50/70 ring-1 ring-[#002B49]'
                            : 'border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            wantDbsAccount === 'yes' ? 'border-[#002B49]' : 'border-slate-400'
                          }`}
                        >
                          {wantDbsAccount === 'yes' && (
                            <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-800">Yes</span>
                      </div>

                      {/* No */}
                      <div
                        onClick={() => handleSelectDbs('no')}
                        className={`p-3 rounded-lg border transition-all flex items-center gap-2.5 cursor-pointer select-none ${
                          wantDbsAccount === 'no'
                            ? 'border-[#002B49] bg-slate-50/70 ring-1 ring-[#002B49]'
                            : 'border-slate-300 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            wantDbsAccount === 'no' ? 'border-[#002B49]' : 'border-slate-400'
                          }`}
                        >
                          {wantDbsAccount === 'no' && (
                            <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-800">No</span>
                      </div>
                    </div>
                  </div>

                  {/* Informational Lightbulb Card */}
                  <div className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-100 flex items-center gap-3 text-xs text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-slate-700 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-4 h-4 text-slate-600" />
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600">
                      BharatFiling helped 5000+ businesses set up zero-balance salary accounts with direct EPFO challan debit.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Row with Back & Next Buttons (Exact position from reference image) */}
            <div className="pt-8">
              {subStep === 1 ? (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!employeeCoverage}
                    className={`py-3 px-8 rounded-lg font-bold text-sm tracking-wide transition-all flex items-center gap-2 ${
                      employeeCoverage
                        ? 'bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white shadow-xs cursor-pointer'
                        : 'bg-[#E2E8F0] text-slate-400 cursor-not-allowed select-none'
                    }`}
                  >
                    <span>Next</span>
                    <span className="text-base">&rarr;</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setSubStep(1)}
                    className="py-2.5 px-6 rounded-lg border border-[#002B49] text-[#002B49] hover:bg-slate-50 font-bold text-sm tracking-wide transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="py-2.5 px-8 rounded-lg font-bold text-sm tracking-wide transition-all flex items-center gap-2 bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Plans</span>
                    <span className="text-base">&rarr;</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </main>

      {/* Subtle bottom footer spacer */}
      <footer className="w-full text-center py-4 text-[11px] text-slate-400">
        © BharatFiling Compliance Desk • Secure 256-Bit SSL Encrypted Statutory Filing
      </footer>

    </div>
  );
}
