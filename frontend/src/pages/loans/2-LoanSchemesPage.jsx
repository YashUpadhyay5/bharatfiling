import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  Building,
  Sparkles,
  ChevronRight,
  Check,
  Percent,
  Sliders,
  Landmark,
} from 'lucide-react';

import {
  LOAN_SCHEMES,
  LENDING_PARTNERS,
} from './constants.js';

export default function LoanSchemesPage({
  initialData = {},
  onBack,
  onProceedToProfile,
}) {
  const [selectedSchemeId, setSelectedSchemeId] = useState(
    initialData.selectedSchemeId || 'unsecured-business'
  );

  const [activeCategory, setActiveCategory] = useState('all');

  const [loanAmount, setLoanAmount] = useState(
    initialData.desiredAmount || initialData.loanAmount || 1500000
  );

  const selectedScheme = useMemo(() => {
    return (
      LOAN_SCHEMES.find((s) => s.id === selectedSchemeId) ||
      LOAN_SCHEMES[0]
    );
  }, [selectedSchemeId]);

  const filteredSchemes = useMemo(() => {
    if (activeCategory === 'all') return LOAN_SCHEMES;
    if (activeCategory === 'unsecured') return LOAN_SCHEMES.filter((s) => s.id === 'unsecured-business');
    if (activeCategory === 'govt') return LOAN_SCHEMES.filter((s) => s.id === 'mudra-pmmy' || s.id === 'working-capital-cgtmse');
    if (activeCategory === 'asset') return LOAN_SCHEMES.filter((s) => s.id === 'machinery-equipment' || s.id === 'loan-against-property');
    if (activeCategory === 'cma') return LOAN_SCHEMES.filter((s) => s.id === 'cma-project-report');
    return LOAN_SCHEMES;
  }, [activeCategory]);

  const handleCardSelect = (schemeId) => {
    setSelectedSchemeId(schemeId);
  };

  const handleContinue = () => {
    if (onProceedToProfile) {
      onProceedToProfile({
        selectedSchemeId: selectedScheme.id,
        selectedSchemeName: selectedScheme.name,
        desiredAmount: loanAmount,
        loanAmount: loanAmount,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#002B49] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Loan Overview</span>
          </button>
          <div className="text-xs text-slate-500 font-medium">
            Applying as: <span className="font-bold text-[#002B49]">{initialData.email || 'Borrower'}</span>
          </div>
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
            <div className="flex items-center gap-2 text-[#002B49]">
              <span className="w-6 h-6 rounded-full bg-[#002B49] text-white flex items-center justify-center text-xs">
                2
              </span>
              <span>2. Select Loan Scheme</span>
            </div>
            <div className="w-10 sm:w-16 h-0.5 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">
                3
              </span>
              <span>3. Financial & Business Profile</span>
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

        {/* Header from User's Screenshot */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <p className="text-base sm:text-lg font-semibold text-slate-600 leading-relaxed">
            Select the financing instrument customized for your company’s growth stage, capital expenditure, or working capital cycle.
          </p>

          {/* Filter Pills matching screenshot */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
            {[
              { id: 'all', label: 'All Schemes' },
              { id: 'unsecured', label: 'Unsecured Business' },
              { id: 'govt', label: 'Govt & MUDRA' },
              { id: 'asset', label: 'Machinery & Property' },
              { id: 'cma', label: 'Bank Project Reports' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`py-2 px-4 rounded-full text-xs font-bold transition cursor-pointer shadow-xs ${
                  activeCategory === tab.id
                    ? 'bg-[#002B49] text-white ring-2 ring-[#002B49] ring-offset-1'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* All Schemes Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredSchemes.map((scheme) => {
            const isSelected = selectedSchemeId === scheme.id;
            return (
              <div
                key={scheme.id}
                onClick={() => handleCardSelect(scheme.id)}
                className={`bg-white rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer relative ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-600/30 shadow-xl bg-blue-50/10'
                    : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                }`}
              >
                {/* Active Checkmark Pill on Top Right if selected */}
                {isSelected && (
                  <div className="absolute -top-3 right-6 bg-[#002B49] text-white text-[10px] font-black uppercase tracking-wider py-1 px-3 rounded-full shadow-md flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Selected Scheme</span>
                  </div>
                )}

                <div>
                  {/* Top Header Row with Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 tracking-wide">
                      {scheme.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {scheme.category}
                    </span>
                  </div>

                  {/* Scheme Title */}
                  <h3
                    className={`text-xl font-black tracking-tight transition-colors ${
                      isSelected ? 'text-blue-700' : 'text-[#002B49]'
                    }`}
                  >
                    {scheme.name}
                  </h3>

                  {/* Gray Stats Box matching screenshot */}
                  <div className="mt-3.5 py-3 px-3.5 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        FUNDING LIMIT
                      </span>
                      <span className="font-extrabold text-[#002B49] text-sm mt-0.5 block">
                        {scheme.amount}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                        INTEREST RATE
                      </span>
                      <span className="font-extrabold text-emerald-600 text-sm mt-0.5 block">
                        {scheme.interestRate}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mt-3.5">
                    {scheme.description}
                  </p>

                  {/* Bullet Points with Checkmark Circles matching screenshot */}
                  <div className="mt-4 space-y-2">
                    {scheme.keyFeatures.slice(0, 3).map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <span className="leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Disbursal & Collateral Bar */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      ⚡ <span>Disbursal: {scheme.disbursal}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-600">
                      🛡️ <span>{scheme.collateral}</span>
                    </span>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardSelect(scheme.id);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs tracking-wide transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#002B49] text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{isSelected ? 'Scheme Selected ✓' : 'Select This Scheme'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Scheme Confirmation & Amount Adjustment Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left summary */}
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                Active Selection
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#002B49]">
                {selectedScheme.name}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                <span>Limit: <strong className="text-slate-800">{selectedScheme.amount}</strong></span>
                <span>•</span>
                <span>Rate: <strong className="text-emerald-600">{selectedScheme.interestRate}</strong></span>
                <span>•</span>
                <span>Disbursal: <strong className="text-slate-800">{selectedScheme.disbursal}</strong></span>
              </div>
            </div>

            {/* Middle Amount Slider */}
            <div className="lg:w-80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Required Amount:</span>
                <span className="font-black text-blue-700 text-sm">
                  ₹{(loanAmount / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="50000000"
                step="50000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#002B49]"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹1 Lakh</span>
                <span>₹25L</span>
                <span>₹50L</span>
                <span>₹5 Crore</span>
              </div>
            </div>

            {/* Right Action CTA */}
            <div>
              <button
                type="button"
                onClick={handleContinue}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-[#002B49] hover:bg-[#001f35] text-white font-black text-sm tracking-wide shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Continue to Business Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Lending Network Guarantee */}
        <div className="mt-8 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-6">
          <span>🔒 35+ Partner Banks & NBFCs</span>
          <span>⚡ No impact on CIBIL Score</span>
          <span>🛡️ Ministry of MSME / CGTMSE Registered Advisory</span>
          <span>📞 Free 15-minute CA Strategy Call</span>
        </div>
      </div>
    </div>
  );
}
