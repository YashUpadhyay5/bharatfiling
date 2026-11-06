import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building,
  Sparkles,
  Check,
} from 'lucide-react';

import {
  LOAN_SCHEMES,
  BUSINESS_ENTITIES,
  TURNOVER_SLABS,
  CIBIL_RANGES,
  LOAN_PURPOSES,
} from './constants.js';

const QUICK_AMOUNTS = [
  { label: '₹5 Lakhs', value: 500000 },
  { label: '₹15 Lakhs', value: 1500000 },
  { label: '₹25 Lakhs', value: 2500000 },
  { label: '₹50 Lakhs', value: 5000000 },
  { label: '₹1 Crore', value: 10000000 },
];

export default function LoanProfilePage({
  initialData = {},
  onBack,
  onSaveProfile,
}) {
  const isCustom =
    initialData.isCustomAdvisory ||
    initialData.selectedSchemeId === 'custom-loan-advisory';

  const [loanAmount, setLoanAmount] = useState(
    initialData.desiredAmount || initialData.loanAmount || 1500000
  );

  const [entityType, setEntityType] = useState(
    initialData.entityType || 'pvt_ltd'
  );

  const [annualTurnover, setAnnualTurnover] = useState(
    initialData.annualTurnover || '50l_to_1cr'
  );

  const [loanPurpose, setLoanPurpose] = useState(
    initialData.loanPurpose ||
      (isCustom
        ? 'Specialized / Custom Loan Advisory (Loan Not Listed)'
        : LOAN_PURPOSES[0])
  );

  const [cibilRange, setCibilRange] = useState(
    initialData.cibilRange || '750_plus'
  );

  const [customLoanType, setCustomLoanType] = useState(
    initialData.customLoanType || ''
  );

  const [error, setError] = useState('');

  const selectedScheme = useMemo(() => {
    return (
      LOAN_SCHEMES.find((s) => s.id === initialData.selectedSchemeId) ||
      LOAN_SCHEMES[0]
    );
  }, [initialData.selectedSchemeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!loanAmount || Number(loanAmount) < 50000) {
      setError('Please enter a valid loan amount (minimum ₹50,000)');
      return;
    }

    if (onSaveProfile) {
      onSaveProfile({
        loanAmount: Number(loanAmount),
        desiredAmount: Number(loanAmount),
        entityType,
        annualTurnover,
        loanPurpose,
        cibilRange,
        customLoanType,
        selectedSchemeId: selectedScheme.id,
        selectedSchemeName: selectedScheme.name,
        isCustomAdvisory: isCustom || selectedScheme.id === 'custom-loan-advisory',
        matchScore: cibilRange === '750_plus' ? 96 : 88,
      });
    }
  };

  const formatAmountText = (val) => {
    const num = Number(val);
    if (!num || isNaN(num)) return '';
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Crore`;
    }
    return `₹${(num / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-800">
      {/* Decorative Stepped Geometric Corners (Consistent with Portal Modules) */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-40 select-none">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path
            d="M180 0H120V60H60V120H0V180H180V0Z"
            fill="#E2E8F0"
            fillOpacity="0.5"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-40 select-none">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path
            d="M0 180H60V120H120V60H180V0H0V180Z"
            fill="#E2E8F0"
            fillOpacity="0.5"
          />
        </svg>
      </div>

      {/* Top Back Navigation Bar */}
      <div className="w-full max-w-5xl mb-6 flex items-center justify-between relative z-10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Loan Schemes</span>
        </button>
        <div className="text-xs text-slate-400 font-medium">
          Business Loans & Credit Advisory • Step 3 of 4
        </div>
      </div>

      {/* Main Centered 2-Column Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* LEFT COLUMN: Trust Value Propositions (5 Cols) */}
        <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 bg-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md tracking-wider">
                Partnered with 35+ Banks & NBFCs
              </span>
              <h2 className="text-2xl sm:text-[28px] font-bold text-slate-800 leading-snug tracking-tight">
                Over ₹500+ Crore in Business Loans Facilitated
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                Join thousands of Indian MSMEs and growing enterprises who trust BharatFiling to secure credit lines at the lowest interest rates.
              </p>
            </div>

            {/* 3 Value bullets matching portal design */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Fast In-Principle Sanction
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Digital matchmaking across PSU, Private Banks & Fintech NBFCs in 24-48 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Zero Collateral Options
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Access government-backed MUDRA (PMMY) & CGTMSE credit guarantee schemes up to ₹5 Cr.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Ex-Banker Credit Advisory
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Experienced CAs and former bank appraisal managers review and optimize your dossier.
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Scheme Summary Tag */}
            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">
                  <span>Selected Scheme</span>
                  <span className="text-blue-600 font-extrabold">{selectedScheme.badge}</span>
                </div>
                <div className="font-extrabold text-[#002B49] text-sm truncate">
                  {selectedScheme.name}
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  Limit: <strong className="text-slate-700">{selectedScheme.amount}</strong> • Rate: <strong className="text-emerald-600">{selectedScheme.interestRate}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center gap-2 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>ISO 27001 Certified • Bank-Grade 256-Bit SSL Security</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Clean Questionnaire (7 Cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-6">
            {/* Logo Badge (Matching portal branding) */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#002B49] text-white font-black text-xs tracking-wider uppercase shadow-2xs">
                <span className="text-amber-400">BHARAT</span>
                <span>FILING</span>
              </div>
            </div>

            {/* Segmented Progress Tracker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 font-bold">
                  Step 3 of 4: Business Profile
                </span>
                <span className="text-slate-400 font-normal">
                  Takes less than 1 min
                </span>
              </div>

              {/* 4-Segment Progress Bar */}
              <div className="flex gap-2">
                <div className="h-1 flex-1 rounded-full bg-[#10B981]" />
                <div className="h-1 flex-1 rounded-full bg-[#10B981]" />
                <div className="h-1 flex-1 rounded-full bg-[#10B981]" />
                <div className="h-1 flex-1 rounded-full bg-slate-200" />
              </div>
            </div>

            {/* Form Title */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Tell us about your business & loan requirements
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Only the main financial details needed to assess your credit eligibility.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Required Loan Amount */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold text-slate-700">
                    Required Loan Amount (₹) <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-xs font-black text-blue-700">
                    {formatAmountText(loanAmount)}
                  </span>
                </div>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  step="50000"
                  min="50000"
                  placeholder="e.g. 1500000"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002B49]/20 focus:border-[#002B49] transition"
                  required
                />
                {/* Quick amount presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {QUICK_AMOUNTS.map((q) => (
                    <button
                      key={q.value}
                      type="button"
                      onClick={() => setLoanAmount(q.value)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition cursor-pointer ${
                        Number(loanAmount) === q.value
                          ? 'bg-[#002B49] text-white border-[#002B49]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Business Entity Type & Turnover (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Constitution of Business <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={entityType}
                    onChange={(e) => setEntityType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-[#002B49] transition cursor-pointer"
                  >
                    {BUSINESS_ENTITIES.map((ent) => (
                      <option key={ent.id} value={ent.id}>
                        {ent.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Annual Turnover <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={annualTurnover}
                    onChange={(e) => setAnnualTurnover(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-[#002B49] transition cursor-pointer"
                  >
                    {TURNOVER_SLABS.map((sl) => (
                      <option key={sl.id} value={sl.id}>
                        {sl.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3. Primary Purpose & CIBIL Score (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Primary Purpose of Loan <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={loanPurpose}
                    onChange={(e) => setLoanPurpose(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-[#002B49] transition cursor-pointer truncate"
                  >
                    {LOAN_PURPOSES.map((p, idx) => (
                      <option key={idx} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    CIBIL / Credit Health Score <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={cibilRange}
                    onChange={(e) => setCibilRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-[#002B49] transition cursor-pointer"
                  >
                    {CIBIL_RANGES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 4. If Custom Advisory / Unlisted loan */}
              {(isCustom || loanPurpose.includes('Custom')) && (
                <div className="space-y-1.5 p-3 rounded-xl bg-amber-50/80 border border-amber-200">
                  <div className="flex items-center gap-1.5 text-amber-900 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Specify Unlisted Loan / Financing Requirement</span>
                  </div>
                  <input
                    type="text"
                    value={customLoanType}
                    onChange={(e) => setCustomLoanType(e.target.value)}
                    placeholder="e.g. Hospital equipment, Solar energy, Export LC, Builder loan..."
                    className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Submit CTA Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#002B49] hover:bg-[#001f35] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Proceed to Advisory Desk & Pricing</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>

          <div className="text-[11px] text-center text-slate-400 pt-4">
            🔒 Bank-grade 256-bit encryption. No hard hit on your CIBIL score.
          </div>
        </div>
      </div>
    </div>
  );
}
