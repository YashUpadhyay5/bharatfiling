import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Coins,
  CheckCircle2,
} from 'lucide-react';
import { calculateIncomeTaxComparison, formatIndianCurrency } from '../../utils/incomeTaxEngine.js';

export default function ITRQuickEstimator() {
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

  // Calculate monthly take-home estimate
  const salaryNum = Number(grossSalary) || 0;
  const winningTax = isNewWinner ? newRegime.totalTaxLiability : oldRegime.totalTaxLiability;
  const losingTax = isNewWinner ? oldRegime.totalTaxLiability : newRegime.totalTaxLiability;
  const monthlyTakeHome = Math.max(0, Math.round((salaryNum - winningTax) / 12));
  const monthlyExtra = Math.round(savings / 12);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Quick Tax & Slab Estimator
            </span>

            {/* Financial Year Selector */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs font-bold border border-slate-200">
              <button
                type="button"
                onClick={() => setFinancialYear('2025-26')}
                className={`px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer ${
                  financialYear === '2025-26'
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                FY 2025-26
              </button>
              <button
                type="button"
                onClick={() => setFinancialYear('2026-27')}
                className={`px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer ${
                  financialYear === '2026-27'
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                FY 2026-27
              </button>
            </div>
          </div>

          {/* Quick Inputs */}
          <div className="space-y-3.5 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Annual Gross Salary (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50000"
                  value={grossSalary}
                  onChange={(e) => setGrossSalary(e.target.value)}
                  placeholder="1200000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/20 focus:border-[#F26522] transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Total Deductions (80C / 80D / HRA) (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="25000"
                  value={totalDeductions}
                  onChange={(e) => setTotalDeductions(e.target.value)}
                  placeholder="200000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/20 focus:border-[#F26522] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Taxpayer Age Category
                </label>
                <select
                  value={ageCategory}
                  onChange={(e) => setAgeCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/20 focus:border-[#F26522] transition-colors cursor-pointer"
                >
                  <option value="individual">Individual (&lt; 60 Years)</option>
                  <option value="senior">Senior Citizen (60 - 79 Years)</option>
                  <option value="superSenior">Super Senior (80+ Years)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Standard Deduction (Auto-Applied)
                </label>
                <div className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 font-semibold flex items-center justify-between">
                  <span>₹75,000 (New)</span>
                  <span className="text-slate-400">|</span>
                  <span>₹50,000 (Old)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/tools/income-tax-calculator"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F26522] hover:text-orange-700 transition-colors group"
            >
              <span>Need capital gains, business profits, or full Chapter VI-A?</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Result Card (5 cols) - Styled exactly as HRA Navy Card */}
        <div className="lg:col-span-5 bg-[#111827] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300">
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                RECOMMENDED REGIME ({financialYear})
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" /> CA Verified
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-300 block mb-1">
                {isNewWinner ? 'New Tax Regime (Section 115BAC)' : 'Old Tax Regime'}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#10B981] tracking-tight transition-all duration-300">
                {savings > 0 ? `Saves ${formatIndianCurrency(savings)}` : 'Equal Tax'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {isNewWinner
                  ? 'Lower progressive slab rates & ₹75k standard deduction'
                  : 'Better due to your high deductions & exemptions'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  New Regime Tax
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {formatIndianCurrency(newRegime.totalTaxLiability)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Old Regime Tax
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {formatIndianCurrency(oldRegime.totalTaxLiability)}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Est. Monthly In-Hand:</span>
              <span className="font-bold text-emerald-400 font-mono">
                {formatIndianCurrency(monthlyTakeHome)}/mo
              </span>
            </div>
          </div>

          {/* CTA to Full Tool */}
          <Link
            to="/tools/income-tax-calculator"
            className="mt-6 w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#111827] font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 shadow-md cursor-pointer group"
          >
            <span>Open Full Tax Calculator & Slab Checker</span>
            <ArrowRight className="w-4 h-4 text-[#F26522] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
