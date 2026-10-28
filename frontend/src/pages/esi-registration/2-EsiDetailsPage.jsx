import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react';

export default function EsiDetailsPage({
  formData = {},
  onInputChange,
  onBack,
  onSubmit,
  isSubmitting = false,
}) {
  // Sub-step inside Page 2:
  // 1 = Employee Strength & Coverage question (10+ vs <10)
  // 2 = CIN/GSTIN and DBS Bank Salary Current Account question
  const [subStep, setSubStep] = useState(1);

  // Question 1: Employee Strength ('ten_plus' | 'under_ten')
  const [employeeCoverage, setEmployeeCoverage] = useState(
    formData.coverageType === 'voluntary' || formData.employeeCoverage === 'under_ten'
      ? 'under_ten'
      : 'ten_plus'
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
      onInputChange('coverageType', val === 'ten_plus' ? 'mandatory' : 'voluntary');
      onInputChange('employeeCount', val === 'ten_plus' ? 15 : 8);
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
          coverageType: employeeCoverage === 'ten_plus' ? 'mandatory' : 'voluntary',
          employeeCount: employeeCoverage === 'ten_plus' ? 15 : 8,
          cinGstin: cinGstin.trim().toUpperCase(),
          wantDbsAccount,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Top Header Bar with Brand Logo & Trust Tag */}
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
          <span>100% Online ESIC Application</span>
        </div>
      </header>

      {/* Main 2-Column Container (Exact clone of media_1793095970956_bce00c26.png) */}
      <main className="max-w-5xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* LEFT COLUMN: Trust & Highlights (Exact clone of Image) */}
        <div className="lg:col-span-6 space-y-7 pr-0 lg:pr-6">
          
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002B49] tracking-tight">
              25,000+ Establishments registered
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-500 mt-2">
              Stay updated, anytime. anywhere.
            </p>
          </div>

          <div className="space-y-6 pt-2">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-3.5">
              <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 fill-[#002B49] text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  Get ESIC registered in under 5 business days
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
                  Zero-balance salary account with DBS Bank
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Zero charges for life &amp; free debit cards for staff
                </p>
              </div>
            </div>

          </div>

          {/* DBS Bank Partner Block */}
          <div className="pt-4 border-t border-slate-200">
            <div className="text-xs font-semibold text-slate-600 mb-2">
              Exclusive banking partner
            </div>
            <div className="flex items-center gap-2 select-none">
              <div className="w-7 h-7 relative shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E60000]">
                  <polygon points="50,0 65,15 50,30 35,15" />
                  <polygon points="100,50 85,65 70,50 85,35" />
                  <polygon points="50,100 35,85 50,70 65,85" />
                  <polygon points="0,50 15,35 30,50 15,65" />
                  <polygon points="50,20 80,50 50,80 20,50" />
                </svg>
              </div>
              <span className="font-black text-2xl tracking-tight text-slate-900">
                DBS <span className="font-bold text-slate-700 text-xl">BANK</span>
              </span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Question Wizard Card (Exact clone of Image) */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-6">
            
            {/* Centered BharatFiling Brand Icon */}
            <div className="flex justify-center mb-2">
              <img
                src="/bharatfiling-brand-icon.png"
                alt="BharatFiling"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
                }}
              />
            </div>

            {/* Green Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: subStep === 1 ? '50%' : '100%' }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-bold text-slate-400">
                <span>{subStep === 1 ? 'Step 1 of 2' : 'Step 2 of 2'}</span>
                <span>{subStep === 1 ? '50% Complete' : '100% Complete'}</span>
              </div>
            </div>

            {/* ----------------------------------------------------------- */}
            {/* SUB-STEP 1: Employee Strength Question (10+ vs <10) */}
            {/* ----------------------------------------------------------- */}
            {subStep === 1 && (
              <form onSubmit={handleNext} className="space-y-6 animate-fadeIn">
                
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    Number of employees in your establishment?
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Applicable for employees with gross monthly wages up to ₹21,000.
                  </p>
                </div>

                {/* 2 Radio Option Cards (1:1 with Screenshot) */}
                <div className="space-y-3 pt-1">
                  
                  {/* Option 1: 10 or more employees (Mandatory) */}
                  <label
                    onClick={() => handleSelectCoverage('ten_plus')}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      employeeCoverage === 'ten_plus'
                        ? 'border-[#002B49] bg-slate-50/70 shadow-xs ring-1 ring-[#002B49]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          employeeCoverage === 'ten_plus'
                            ? 'border-[#002B49] bg-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {employeeCoverage === 'ten_plus' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#002B49]" />
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">
                          10 or more employees
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5 block leading-relaxed">
                          Mandatory registration under Section 2(12) of ESI Act, 1948.
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Less than 10 employees */}
                  <label
                    onClick={() => handleSelectCoverage('under_ten')}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      employeeCoverage === 'under_ten'
                        ? 'border-[#002B49] bg-slate-50/70 shadow-xs ring-1 ring-[#002B49]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          employeeCoverage === 'under_ten'
                            ? 'border-[#002B49] bg-white'
                            : 'border-slate-300'
                        }`}
                      >
                        {employeeCoverage === 'under_ten' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#002B49]" />
                        )}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">
                          Less than 10 employees
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5 block leading-relaxed">
                          Voluntary registration / planning for hiring to offer medical benefits.
                        </span>
                      </div>
                    </div>
                  </label>

                </div>

                {/* Statutory Tip */}
                <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5 text-xs text-[#002B49]">
                  <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    ESIC healthcare coverage protects workers and their families with 100% cashless treatment at ESIC dispensaries.
                  </span>
                </div>

                {/* Primary Action Button (Navy #002B49) */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            )}

            {/* ----------------------------------------------------------- */}
            {/* SUB-STEP 2: CIN/GSTIN & DBS Bank Current Account */}
            {/* ----------------------------------------------------------- */}
            {subStep === 2 && (
              <form onSubmit={handleNext} className="space-y-6 animate-fadeIn">
                
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    Establishment &amp; Banking Setup
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Help us verify your business and setup your corporate salary benefits.
                  </p>
                </div>

                {/* Question 2a: Business CIN / GSTIN Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business CIN, LLPIN, or GSTIN Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={cinGstin}
                    onChange={(e) => setCinGstin(e.target.value)}
                    placeholder="e.g. U72200KA2023PTC123456 or 29AAAAA0000A1Z5"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49] uppercase font-mono placeholder:normal-case placeholder:font-sans placeholder:text-slate-400"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enables instant ROC / GST database verification for Form 01.
                  </p>
                </div>

                {/* Question 2b: DBS Bank zero-balance salary account */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      Do you want a zero-balance salary current account with DBS Bank?
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Free Perk
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Option: Yes */}
                    <label
                      onClick={() => handleSelectDbs('yes')}
                      className={`p-3 rounded-xl border-2 text-center cursor-pointer transition ${
                        wantDbsAccount === 'yes'
                          ? 'border-[#002B49] bg-slate-50/70 font-bold'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-xs text-slate-800">Yes, include free DBS account</span>
                    </label>

                    {/* Option: No */}
                    <label
                      onClick={() => handleSelectDbs('no')}
                      className={`p-3 rounded-xl border-2 text-center cursor-pointer transition ${
                        wantDbsAccount === 'no'
                          ? 'border-[#002B49] bg-slate-50/70 font-bold'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span className="text-xs text-slate-800">No, I have existing account</span>
                    </label>

                  </div>
                </div>

                {/* Action Buttons: Back + Submit */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSubStep(1)}
                    className="py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Saving Profile...' : 'Confirm & Proceed to Plans'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>

      </main>

      {/* Footer Note */}
      <footer className="max-w-6xl w-full mx-auto text-center pt-8 text-xs text-slate-400">
        <p>🔒 Governed under Employees&apos; State Insurance Act, 1948 • 256-Bit SSL Encrypted Verification</p>
      </footer>

    </div>
  );
}
