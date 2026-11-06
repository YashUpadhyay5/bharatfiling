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
  Search,
  HelpCircle,
  X,
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
  const [searchQuery, setSearchQuery] = useState('');

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
    // If user is actively typing in search, search across all schemes for instant match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return LOAN_SCHEMES.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.popularFor && s.popularFor.toLowerCase().includes(q)) ||
          s.category.toLowerCase().includes(q) ||
          s.badge.toLowerCase().includes(q)
      );
    }

    if (activeCategory === 'unsecured') {
      return LOAN_SCHEMES.filter((s) => s.id === 'unsecured-business');
    } else if (activeCategory === 'govt') {
      return LOAN_SCHEMES.filter(
        (s) => s.id === 'mudra-pmmy' || s.id === 'working-capital-cgtmse'
      );
    } else if (activeCategory === 'asset') {
      return LOAN_SCHEMES.filter(
        (s) => s.id === 'machinery-equipment' || s.id === 'loan-against-property'
      );
    } else if (activeCategory === 'cma') {
      return LOAN_SCHEMES.filter((s) => s.id === 'cma-project-report');
    } else if (activeCategory === 'custom') {
      return LOAN_SCHEMES.filter((s) => s.id === 'custom-loan-advisory');
    }

    return LOAN_SCHEMES;
  }, [activeCategory, searchQuery]);

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
        isCustomAdvisory: selectedScheme.id === 'custom-loan-advisory',
      });
    }
  };

  // Direct trigger when any desired loan is not available
  const handleProceedForCustomAdvisory = () => {
    setSelectedSchemeId('custom-loan-advisory');
    if (onProceedToProfile) {
      onProceedToProfile({
        selectedSchemeId: 'custom-loan-advisory',
        selectedSchemeName: 'Custom Loan & Debt Advisory',
        desiredAmount: loanAmount,
        loanAmount: loanAmount,
        isCustomAdvisory: true,
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
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All Schemes' },
              { id: 'unsecured', label: 'Unsecured Business' },
              { id: 'govt', label: 'Govt & MUDRA' },
              { id: 'asset', label: 'Machinery & Property' },
              { id: 'cma', label: 'Bank Project Reports' },
              { id: 'custom', label: 'Custom Advisory' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveCategory(tab.id);
                  setSearchQuery('');
                }}
                className={`py-2 px-4 rounded-full text-xs font-bold transition cursor-pointer shadow-xs ${
                  activeCategory === tab.id && !searchQuery
                    ? 'bg-[#002B49] text-white ring-2 ring-[#002B49] ring-offset-1'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="max-w-md mx-auto mt-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search loan type (e.g. mudra, working capital, machinery...)"
              className="w-full pl-9 pr-8 py-2.5 text-xs rounded-full border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002B49]/20 focus:border-[#002B49] text-slate-800 shadow-2xs placeholder:text-slate-400 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold p-1"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Result Feedback */}
          {searchQuery && (
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500 animate-in fade-in duration-150">
              <span>
                Found <strong className="text-slate-900">{filteredSchemes.length}</strong>{' '}
                {filteredSchemes.length === 1 ? 'scheme' : 'schemes'} matching &ldquo;
                <span className="text-blue-700 font-bold">{searchQuery}</span>&rdquo;
              </span>
              <span>•</span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:underline font-bold cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Loan Not Available or Not Listed Callout Banner - Shows when opening page */}
        {!searchQuery && (
          <div className="bg-gradient-to-r from-[#001f35] via-[#002B49] to-indigo-950 rounded-2xl p-5 sm:p-6 text-white shadow-md mb-8 border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden animate-in fade-in duration-200">
            <div className="space-y-1.5 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>LOAN NOT AVAILABLE OR NOT LISTED?</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Can’t find your specific loan scheme? Take 1-on-1 Advisory
              </h3>
              <p className="text-xs text-blue-100/90 leading-relaxed max-w-2xl">
                If the financing scheme you need (Export Credit, Healthcare/Hospital, Solar Plant, Invoice Discounting, Builder Debt, or Stressed Asset Refinancing) is not available above, proceed directly to our Advisory Desk. Our Ex-Bank Credit Appraisal Committee will structure a customized financing facility directly for your company.
              </p>
            </div>
            <div className="shrink-0 z-10 w-full md:w-auto">
              <button
                type="button"
                onClick={handleProceedForCustomAdvisory}
                className="w-full md:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Take Custom Advisory</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            SCHEMES GRID OR ZERO-MATCH STATE
        ------------------------------------------------------------- */}
        {filteredSchemes.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 text-center max-w-2xl mx-auto my-8 shadow-sm animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7" />
            </div>
            <span className="text-[11px] font-black uppercase text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Loan Scheme Not Listed in Catalog
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#002B49] mt-3">
              No standard scheme matches "{searchQuery}"
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed max-w-md mx-auto">
              Don't worry! Specialized facilities (Export Credit, Hospital Equipment, Solar Plant, Invoice Discounting, or Custom Debt) are structured directly by our Senior CA & Ex-Bank Credit Appraisal Committee.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleProceedForCustomAdvisory}
                className="py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs tracking-wide shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <span>Take Custom Advisory for "{searchQuery}"</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                View All Schemes
              </button>
            </div>
          </div>
        ) : (
          /* All Schemes Grid - Immediately visible without obstructing banner */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredSchemes.map((scheme) => {
              const isSelected = selectedSchemeId === scheme.id;
              const isCustom = scheme.id === 'custom-loan-advisory';

              return (
                <div
                  key={scheme.id}
                  onClick={() => handleCardSelect(scheme.id)}
                  className={`rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer relative ${
                    isSelected
                      ? 'border-blue-600 ring-2 ring-blue-600/30 shadow-xl bg-blue-50/10'
                      : isCustom
                      ? 'bg-gradient-to-br from-amber-50/30 via-white to-blue-50/20 border-amber-300 shadow-sm hover:shadow-md'
                      : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
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
                      <span
                        className={`text-[11px] font-black uppercase px-3 py-1 rounded-full border tracking-wide ${
                          isCustom
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                      >
                        {scheme.badge}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {scheme.category}
                      </span>
                    </div>

                    {/* Scheme Title */}
                    <h3
                      className={`text-xl font-black tracking-tight transition-colors ${
                        isSelected
                          ? 'text-blue-700'
                          : isCustom
                          ? 'text-amber-900'
                          : 'text-[#002B49]'
                      }`}
                    >
                      {scheme.name}
                    </h3>

                    {/* Stats Box */}
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

                    {/* Bullet Points with Checkmark Circles */}
                    <div className="mt-4 space-y-2">
                      {scheme.keyFeatures.slice(0, 3).map((f, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isCustom ? 'text-amber-600' : 'text-blue-600'
                            }`}
                          />
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
                        if (isCustom) {
                          handleProceedForCustomAdvisory();
                        } else {
                          handleCardSelect(scheme.id);
                        }
                      }}
                      className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs tracking-wide transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#002B49] text-white shadow-md'
                          : isCustom
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-900 font-black shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>
                        {isCustom
                          ? 'Proceed for Take Advisory →'
                          : isSelected
                          ? 'Scheme Selected ✓'
                          : 'Select This Scheme'}
                      </span>
                      {!isCustom && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}



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
                <span>
                  {selectedScheme.id === 'custom-loan-advisory'
                    ? 'Proceed to Take Advisory'
                    : 'Continue to Business Profile'}
                </span>
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
