import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { calculateIncomeTaxComparison, formatIndianCurrency } from '../../utils/incomeTaxEngine.js';

export default function CompactITRCard() {
  const [financialYear, setFinancialYear] = useState('2025-26');
  const [grossSalary, setGrossSalary] = useState('1200000');
  const [totalDeductions, setTotalDeductions] = useState('200000');
  const [ageCategory, setAgeCategory] = useState('individual');

  const comparison = useMemo(() => {
    return calculateIncomeTaxComparison({
      financialYear,
      ageCategory,
      residentialStatus: 'resident',
      salary: { grossSalary },
      deductions: {
        sec80C: Math.min(150000, Number(totalDeductions) || 0),
        sec80D: Math.max(0, (Number(totalDeductions) || 0) - 150000),
      },
    });
  }, [financialYear, grossSalary, totalDeductions, ageCategory]);

  const { winner, savings, oldRegime, newRegime } = comparison;
  const isNewWinner = winner === 'new';

  const salaryNum = Number(grossSalary) || 0;
  const winningTax = isNewWinner ? newRegime.totalTaxLiability : oldRegime.totalTaxLiability;
  const monthlyTakeHome = Math.max(0, Math.round((salaryNum - winningTax) / 12));

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group">
      {/* TOP HEADER WITH VISUAL SVG ILLUSTRATION */}
      <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 bg-gradient-to-r from-orange-50/50 via-white to-amber-50/30 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-orange-100 text-[#F26522] border border-orange-200">
            <Sparkles className="w-3 h-3" /> SEC 115BAC vs OLD REGIME
          </span>
          <h3 className="text-base sm:text-lg font-extrabold text-[#111827] tracking-tight">
            Income Tax & Slab Checker
          </h3>
          <p className="text-xs text-slate-500">
            Compare Old vs New regime & estimate savings
          </p>
        </div>

        {/* OUTSIDE SVG ILLUSTRATION: INCOME TAX & SLAB GROWTH */}
        <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center relative">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circular glow */}
            <circle cx="50" cy="50" r="42" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="2" strokeDasharray="3 3" />
            
            {/* Tax Slab Bar 1 (0% slab) */}
            <rect x="22" y="60" width="12" height="22" rx="3" fill="#10B981" />
            
            {/* Tax Slab Bar 2 (5% slab) */}
            <rect x="38" y="46" width="12" height="36" rx="3" fill="#3B82F6" />
            
            {/* Tax Slab Bar 3 (10% slab) */}
            <rect x="54" y="32" width="12" height="50" rx="3" fill="#F26522" />

            {/* Floating Rupee Coin */}
            <circle cx="70" cy="30" r="14" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
            <text x="70" y="35" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">₹</text>

            {/* Upward Growth Arrow */}
            <path d="M22 55 L40 40 L60 25 L75 16" stroke="#F26522" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="75,12 79,18 71,18" fill="#F26522" />
          </svg>
        </div>
      </div>

      {/* COMPACT INPUTS SECTION */}
      <div className="p-5 sm:p-6 space-y-3.5 flex-1">
        {/* Row 1: FY Toggle & Age Category */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Financial Year
            </label>
            <div className="grid grid-cols-2 gap-1 p-0.5 bg-slate-100 rounded-lg text-xs font-bold border border-slate-200">
              <button
                type="button"
                onClick={() => setFinancialYear('2025-26')}
                className={`py-1 rounded text-center transition-all cursor-pointer ${
                  financialYear === '2025-26'
                    ? 'bg-[#111827] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                25-26
              </button>
              <button
                type="button"
                onClick={() => setFinancialYear('2026-27')}
                className={`py-1 rounded text-center transition-all cursor-pointer ${
                  financialYear === '2026-27'
                    ? 'bg-[#111827] text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                26-27
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Age Category
            </label>
            <select
              value={ageCategory}
              onChange={(e) => setAgeCategory(e.target.value)}
              className="w-full h-8 px-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#F26522] cursor-pointer"
            >
              <option value="individual">&lt; 60 Yrs (Normal)</option>
              <option value="senior">60+ Yrs (Senior)</option>
              <option value="superSenior">80+ Yrs (Super Senior)</option>
            </select>
          </div>
        </div>

        {/* Row 2: Annual Gross Salary & Total Deductions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Annual Gross Salary (₹)
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="50000"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                placeholder="1200000"
                className="w-full h-9 pl-7 pr-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/20 focus:border-[#F26522]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Total Deductions (80C/80D/HRA)
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="25000"
                value={totalDeductions}
                onChange={(e) => setTotalDeductions(e.target.value)}
                placeholder="200000"
                className="w-full h-9 pl-7 pr-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/20 focus:border-[#F26522]"
              />
            </div>
          </div>
        </div>

        {/* Sub-note */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
          <span>Std. Ded: ₹75,000 (New) | ₹50,000 (Old)</span>
          <Link
            to="/tools/income-tax-calculator"
            className="text-[#F26522] font-bold hover:underline inline-flex items-center gap-0.5"
          >
            <span>Advanced options</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>
      </div>

      {/* COMPACT DARK NAVY RESULT PANEL */}
      <div className="bg-[#111827] text-white p-5 sm:p-6 space-y-3.5 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
            {isNewWinner ? 'RECOMMENDED: NEW REGIME' : 'RECOMMENDED: OLD REGIME'}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">
            <ShieldCheck className="w-2.5 h-2.5" /> CA Verified
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-2">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#10B981] tracking-tight font-mono">
              {savings > 0 ? `Saves ${formatIndianCurrency(savings)}` : 'Equal Tax'}
            </span>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {isNewWinner
                ? 'Under Section 115BAC with ₹75k standard deduction'
                : 'Under Old Regime with your Chapter VI-A deductions'}
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Monthly In-Hand</span>
            <span className="text-sm font-bold text-slate-200 font-mono">
              {formatIndianCurrency(monthlyTakeHome)}/mo
            </span>
          </div>
        </div>

        {/* Dual tax breakdown row */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
          <div className="flex justify-between bg-slate-800/60 p-2 rounded-lg">
            <span className="text-slate-400 font-medium">New Tax:</span>
            <span className="font-bold text-slate-100 font-mono">
              {formatIndianCurrency(newRegime.totalTaxLiability)}
            </span>
          </div>
          <div className="flex justify-between bg-slate-800/60 p-2 rounded-lg">
            <span className="text-slate-400 font-medium">Old Tax:</span>
            <span className="font-bold text-slate-100 font-mono">
              {formatIndianCurrency(oldRegime.totalTaxLiability)}
            </span>
          </div>
        </div>

        {/* Full-Width White CTA Button */}
        <Link
          to="/tools/income-tax-calculator"
          className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#111827] font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 shadow-md cursor-pointer group"
        >
          <span>Open Full Income Tax Calculator</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F26522] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
