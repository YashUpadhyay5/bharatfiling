import React from 'react';
import {
  Sparkles,
  Trophy,
  ArrowRight,
  Printer,
  FileCheck2,
  Check,
  TrendingDown,
  Info,
} from 'lucide-react';
import { formatIndianCurrency } from '../../utils/incomeTaxEngine';
import SplitGradientButton from '../common/SplitGradientButton';

export default function RegimeComparisonHero({
  comparison,
  onPrint,
  onOpenITRAdvisor,
}) {
  const { winner, savings, recommendation, oldRegime, newRegime, financialYear } = comparison;

  const isNewWinner = winner === 'new';
  const isOldWinner = winner === 'old';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg p-5 sm:p-7 sticky top-24">
      {/* 1. WINNER RECOMMENDATION BANNER */}
      <div
        className={`rounded-2xl p-4 sm:p-5 mb-6 border transition-all ${
          isNewWinner
            ? 'bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border-emerald-200 text-emerald-950'
            : isOldWinner
            ? 'bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/5 border-blue-200 text-blue-950'
            : 'bg-slate-50 border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isNewWinner
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                : isOldWinner
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                : 'bg-slate-700 text-white'
            }`}
          >
            <Trophy className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-white/80 shadow-xs border border-current">
                {isNewWinner
                  ? 'Recommended: New Tax Regime'
                  : isOldWinner
                  ? 'Recommended: Old Tax Regime'
                  : 'Equal Tax Liability'}
              </span>
              {savings > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                  Saves {formatIndianCurrency(savings)}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs sm:text-sm font-semibold leading-relaxed">
              {recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* 2. SIDE-BY-SIDE REGIME COMPARISON TABLE */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        {/* NEW REGIME CARD */}
        <div
          className={`rounded-2xl p-4 border transition-all ${
            isNewWinner
              ? 'bg-emerald-50/40 border-emerald-300 ring-2 ring-emerald-500/20'
              : 'bg-slate-50/70 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              New Regime (115BAC)
            </span>
            {isNewWinner && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                WINNER
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mb-1">Total Tax Liability</p>
          <div className="text-xl sm:text-2xl font-black text-[#111827]">
            {formatIndianCurrency(newRegime.totalTaxLiability)}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-1.5 text-[11px] sm:text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Std Deduction:</span>
              <span className="font-semibold text-slate-900">
                {formatIndianCurrency(newRegime.standardDeduction)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Taxable Income:</span>
              <span className="font-semibold text-slate-900">
                {formatIndianCurrency(newRegime.netTaxableIncome)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>87A Rebate/Relief:</span>
              <span className="font-semibold text-emerald-600">
                {formatIndianCurrency(newRegime.rebate87A + newRegime.marginalRelief87A)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Cess (4%):</span>
              <span className="font-semibold text-slate-900">
                {formatIndianCurrency(newRegime.cess)}
              </span>
            </div>
            {newRegime.netPayable > 0 && (
              <div className="flex justify-between text-red-600 font-bold pt-1 border-t border-slate-200/60">
                <span>Net Payable:</span>
                <span>{formatIndianCurrency(newRegime.netPayable)}</span>
              </div>
            )}
            {newRegime.refundDue > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold pt-1 border-t border-slate-200/60">
                <span>Refund Due:</span>
                <span>{formatIndianCurrency(newRegime.refundDue)}</span>
              </div>
            )}
          </div>
        </div>

        {/* OLD REGIME CARD */}
        <div
          className={`rounded-2xl p-4 border transition-all ${
            isOldWinner
              ? 'bg-blue-50/40 border-blue-300 ring-2 ring-blue-500/20'
              : 'bg-slate-50/70 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Old Tax Regime
            </span>
            {isOldWinner && (
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                WINNER
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mb-1">Total Tax Liability</p>
          <div className="text-xl sm:text-2xl font-black text-[#111827]">
            {formatIndianCurrency(oldRegime.totalTaxLiability)}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-1.5 text-[11px] sm:text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Std Deduction:</span>
              <span className="font-semibold text-slate-900">
                {formatIndianCurrency(oldRegime.standardDeduction)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Deductions / HRA:</span>
              <span className="font-semibold text-slate-900">
                {formatIndianCurrency(oldRegime.totalDeductions + oldRegime.hraExemption)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Taxable Income:</span>
              <span className="font-semibold text-slate-900">
                {formatIndianCurrency(oldRegime.netTaxableIncome)}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>87A Rebate:</span>
              <span className="font-semibold text-blue-600">
                {formatIndianCurrency(oldRegime.rebate87A)}
              </span>
            </div>
            {oldRegime.netPayable > 0 && (
              <div className="flex justify-between text-red-600 font-bold pt-1 border-t border-slate-200/60">
                <span>Net Payable:</span>
                <span>{formatIndianCurrency(oldRegime.netPayable)}</span>
              </div>
            )}
            {oldRegime.refundDue > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold pt-1 border-t border-slate-200/60">
                <span>Refund Due:</span>
                <span>{formatIndianCurrency(oldRegime.refundDue)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. KEY TAX ACTION BUTTONS */}
      <div className="space-y-3">
        <SplitGradientButton
          label="Download Official CA Summary (PDF)"
          onClick={onPrint}
          fullWidth
          arrowIcon={Printer}
        />

        <button
          type="button"
          onClick={onOpenITRAdvisor}
          className="w-full h-11 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <FileCheck2 className="w-4 h-4 text-[#F26522]" />
          Which ITR Form Should I File? (ITR-1 / 2 / 3 / 4)
        </button>
      </div>

      {/* 4. LEGAL DISCLAIMER FOOTNOTE */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-400 leading-normal">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>
          Based on the Income-tax Act, 1961, Section 115BAC, and applicable Finance Acts for {financialYear}. Final tax liability is subject to departmental verification.
        </span>
      </div>
    </div>
  );
}
