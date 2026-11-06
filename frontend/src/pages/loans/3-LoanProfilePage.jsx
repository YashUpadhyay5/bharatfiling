import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building2,
  TrendingUp,
  Percent,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  BadgeAlert,
  Coins,
  Landmark,
  Scale,
  Sliders,
} from 'lucide-react';

import {
  LOAN_SCHEMES,
  BUSINESS_ENTITIES,
  TURNOVER_SLABS,
  CIBIL_RANGES,
  LOAN_PURPOSES,
} from './constants.js';

export default function LoanProfilePage({
  initialData = {},
  onBack,
  onSaveProfile,
}) {
  const [profile, setProfile] = useState({
    schemeId: initialData.selectedSchemeId || 'unsecured-business',
    loanAmount: initialData.desiredAmount || initialData.loanAmount || 1500000,
    loanPurpose: initialData.loanPurpose || LOAN_PURPOSES[0],
    entityType: initialData.entityType || 'pvt_ltd',
    businessVintage: initialData.businessVintage || '3_to_5_years',
    annualTurnover: initialData.annualTurnover || '50l_to_1cr',
    monthlyCredit: initialData.monthlyCredit || 450000,
    isGstRegistered: initialData.isGstRegistered ?? true,
    gstin: initialData.gstin || '',
    existingMonthlyEmi: initialData.existingMonthlyEmi || 0,
    cibilRange: initialData.cibilRange || '750_plus',
    hasPanAadhaar: initialData.hasPanAadhaar ?? true,
    hasBankStatements: initialData.hasBankStatements ?? true,
    hasItr: initialData.hasItr ?? true,
    hasUdyam: initialData.hasUdyam ?? true,
  });

  const [errors, setErrors] = useState({});

  const selectedScheme = useMemo(() => {
    return (
      LOAN_SCHEMES.find((s) => s.id === profile.schemeId) ||
      LOAN_SCHEMES[0]
    );
  }, [profile.schemeId]);

  // Dynamic lender matchmaking score
  const matchResult = useMemo(() => {
    let score = 75;
    if (profile.cibilRange === '750_plus') score += 15;
    else if (profile.cibilRange === '700_749') score += 10;
    else if (profile.cibilRange === '650_699') score += 0;
    else score -= 10;

    if (profile.isGstRegistered) score += 5;
    if (profile.hasBankStatements) score += 5;
    if (profile.hasItr) score += 5;
    if (profile.businessVintage === '3_to_5_years' || profile.businessVintage === 'above_5_years') {
      score += 5;
    }

    const finalScore = Math.min(score, 98);
    const recommendedBanks = ['HDFC Bank', 'State Bank of India', 'Bajaj Finserv'];
    if (profile.schemeId === 'mudra-pmmy') {
      recommendedBanks[0] = 'Punjab National Bank';
      recommendedBanks[1] = 'Bank of Baroda';
    } else if (profile.schemeId === 'working-capital-cgtmse') {
      recommendedBanks[0] = 'SIDBI';
      recommendedBanks[1] = 'State Bank of India';
    }

    return {
      score: finalScore,
      probability: finalScore >= 85 ? 'High Sanction Probability' : 'Moderate Sanction Probability',
      banks: recommendedBanks,
    };
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (onSaveProfile) {
      onSaveProfile({
        ...profile,
        selectedSchemeId: selectedScheme.id,
        selectedSchemeName: selectedScheme.name,
        matchScore: matchResult.score,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#002B49] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Loan Schemes</span>
          </button>
        </div>

        {/* Progress Stepper Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-8">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-400">
            <div className="flex items-center gap-2 text-emerald-600">
              <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                ✓
              </span>
              <span>1. Contact Details</span>
            </div>
            <div className="w-10 sm:w-16 h-0.5 bg-emerald-500"></div>
            <div className="flex items-center gap-2 text-emerald-600">
              <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">
                ✓
              </span>
              <span>2. Scheme: {selectedScheme.name.split(' ')[0]}</span>
            </div>
            <div className="w-10 sm:w-16 h-0.5 bg-emerald-500"></div>
            <div className="flex items-center gap-2 text-[#002B49]">
              <span className="w-6 h-6 rounded-full bg-[#002B49] text-white flex items-center justify-center text-xs">
                3
              </span>
              <span>3. Financial Profile</span>
            </div>
            <div className="w-10 sm:w-16 h-0.5 bg-slate-200 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">
                4
              </span>
              <span>4. Advisory Desk</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-blue-50 text-blue-700">
                    Step 3 of 4
                  </span>
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    Change Scheme
                  </button>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-[#002B49] mt-2">
                  Business Financial & Credit Profile
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Accurate details help our CA appraisal desk secure maximum credit limits at the lowest interest rates.
                </p>
              </div>

              {/* Selected Scheme Badge Card */}
              <div className="mb-6 p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-600 block">
                    Selected Loan Instrument
                  </span>
                  <span className="text-sm font-black text-[#002B49]">
                    {selectedScheme.name}
                  </span>
                  <span className="text-xs text-slate-600 block mt-0.5">
                    Limit: {selectedScheme.amount} • Rate: {selectedScheme.interestRate}
                  </span>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-white text-blue-700 rounded-lg border border-blue-200">
                  {selectedScheme.badge}
                </span>
              </div>

              <form onSubmit={handleContinue} className="space-y-6">
                {/* 1. Loan Amount & Purpose */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Required Loan Amount (₹)
                    </label>
                    <input
                      type="number"
                      name="loanAmount"
                      value={profile.loanAmount}
                      onChange={handleChange}
                      step="50000"
                      min="50000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-[#002B49] focus:border-blue-500 outline-none"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      ₹{(profile.loanAmount / 100000).toFixed(2)} Lakhs
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Purpose of Loan
                    </label>
                    <select
                      name="loanPurpose"
                      value={profile.loanPurpose}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:border-blue-500 outline-none"
                    >
                      {LOAN_PURPOSES.map((p, idx) => (
                        <option key={idx} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. Business Entity Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Constitution of Business Entity
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {BUSINESS_ENTITIES.map((ent) => (
                      <label
                        key={ent.id}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                          profile.entityType === ent.id
                            ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-500'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{ent.name}</div>
                          <div className="text-[10px] text-slate-500">{ent.desc}</div>
                        </div>
                        <input
                          type="radio"
                          name="entityType"
                          value={ent.id}
                          checked={profile.entityType === ent.id}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* 3. Annual Turnover & Business Vintage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Annual Turnover
                    </label>
                    <select
                      name="annualTurnover"
                      value={profile.annualTurnover}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:border-blue-500 outline-none"
                    >
                      {TURNOVER_SLABS.map((sl) => (
                        <option key={sl.id} value={sl.id}>
                          {sl.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business Vintage (Operational Years)
                    </label>
                    <select
                      name="businessVintage"
                      value={profile.businessVintage}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:border-blue-500 outline-none"
                    >
                      <option value="less_than_1_year">Less than 1 Year (Early Stage / Startup)</option>
                      <option value="1_to_3_years">1 to 3 Years</option>
                      <option value="3_to_5_years">3 to 5 Years (Established)</option>
                      <option value="above_5_years">Above 5 Years (Mature)</option>
                    </select>
                  </div>
                </div>

                {/* 4. GST Registration & GSTIN */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-800">
                        Is your business GST Registered?
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        GST returns unlock 40% higher credit limits
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isGstRegistered"
                        checked={profile.isGstRegistered}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {profile.isGstRegistered && (
                    <div>
                      <input
                        type="text"
                        name="gstin"
                        value={profile.gstin}
                        onChange={handleChange}
                        placeholder="Enter 15-digit GSTIN (e.g. 27AAAAA0000A1Z5)"
                        className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs uppercase font-mono tracking-wider focus:border-blue-500 outline-none bg-white"
                      />
                    </div>
                  )}
                </div>

                {/* 5. Estimated CIBIL Bracket */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Estimated Credit Score (CIBIL / Experian)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CIBIL_RANGES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setProfile((p) => ({ ...p, cibilRange: c.id }))}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition cursor-pointer ${
                          profile.cibilRange === c.id
                            ? 'bg-blue-50 text-blue-900 border-blue-500 font-bold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Document Readiness Checklist */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Available Documents (Tick what you have ready)
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { key: 'hasPanAadhaar', label: 'PAN & Aadhaar of Promoter' },
                      { key: 'hasBankStatements', label: 'Last 6 Months Bank Statement' },
                      { key: 'hasItr', label: 'Last 2 Years ITR & Computation' },
                      { key: 'hasUdyam', label: 'Udyam / MSME Certificate' },
                    ].map((doc) => (
                      <label
                        key={doc.key}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer hover:bg-slate-50"
                      >
                        <input
                          type="checkbox"
                          name={doc.key}
                          checked={profile[doc.key]}
                          onChange={handleChange}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span className="text-slate-700 font-medium">{doc.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={onBack}
                    className="py-3 px-5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Back to Schemes
                  </button>
                  <button
                    type="submit"
                    className="py-3.5 px-8 rounded-xl bg-[#002B49] hover:bg-[#001f35] text-white font-black text-sm tracking-wide shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Strategy Desk</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Pre-Sanction Match Score & Scheme Highlights (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Live Pre-Qualification Match Score Card */}
            <div className="bg-gradient-to-br from-[#002B49] to-[#0A3D62] text-white rounded-2xl p-6 shadow-lg border border-blue-900/50">
              <div className="flex items-center gap-2 text-xs text-blue-200 font-bold mb-3">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>AI Lender Match Engine</span>
              </div>

              <div className="text-4xl font-black text-emerald-400 mb-1">
                {matchResult.score}%
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                {matchResult.probability}
              </div>

              <p className="text-xs text-blue-200 mt-2 leading-relaxed">
                Based on your business profile, turnover, and credit health, your application is strongly eligible across our partner network.
              </p>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-[11px] font-bold text-blue-200 uppercase tracking-wide mb-2">
                  Top Recommended Lenders:
                </div>
                <div className="space-y-1.5">
                  {matchResult.banks.map((b, i) => (
                    <div
                      key={i}
                      className="bg-white/10 rounded-lg px-2.5 py-1.5 text-xs font-semibold flex items-center justify-between"
                    >
                      <span>{b}</span>
                      <span className="text-emerald-300 text-[10px] font-black">98% Fit</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scheme Summary Snapshot */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Scheme Snapshot
              </div>
              <div className="text-base font-black text-[#002B49]">
                {selectedScheme.name}
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Interest Rate:</span>
                  <span className="font-bold text-emerald-600">{selectedScheme.interestRate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Funding Limit:</span>
                  <span className="font-bold text-slate-900">{selectedScheme.amount}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Collateral:</span>
                  <span className="font-bold text-slate-900">{selectedScheme.collateral}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Disbursal Time:</span>
                  <span className="font-bold text-blue-600">{selectedScheme.disbursal}</span>
                </div>
              </div>
            </div>

            {/* Ex-Banker Advisory Guarantee */}
            <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-200 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-black text-[#002B49]">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>BharatFiling Advisory Promise</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                Our Fellow Chartered Accountants and ex-bank credit appraisal officers review your profile before bank submission, preventing unnecessary CIBIL credit inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
