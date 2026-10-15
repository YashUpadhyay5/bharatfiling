import React from 'react';
import { ArrowUpRight, TrendingDown, Wallet, Shield } from 'lucide-react';
import { formatIndianCurrency } from '../../utils/incomeTaxEngine';

export default function TaxRegimeComparisonChart({ oldRegime, newRegime, grossIncome = 0 }) {
  const gross = Math.max(1, Number(grossIncome) || 1);

  const oldTax = oldRegime?.totalTaxLiability || 0;
  const newTax = newRegime?.totalTaxLiability || 0;

  const oldTakeHome = Math.max(0, gross - oldTax);
  const newTakeHome = Math.max(0, gross - newTax);

  // Maximum value for scaling visual bars
  const maxBarValue = Math.max(gross, 100000);

  const oldTaxPct = Math.min(100, Math.round((oldTax / maxBarValue) * 100));
  const newTaxPct = Math.min(100, Math.round((newTax / maxBarValue) * 100));

  const oldTakeHomePct = Math.min(100, Math.round((oldTakeHome / maxBarValue) * 100));
  const newTakeHomePct = Math.min(100, Math.round((newTakeHome / maxBarValue) * 100));

  const diff = oldTax - newTax;
  const isNewCheaper = diff > 0;
  const savings = Math.abs(diff);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 mb-6 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-5">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#111827] flex items-center gap-2">
            <span>Visual Regime Comparison (Tax vs In-Hand Cash)</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Chart
            </span>
          </h4>
          <p className="text-xs text-slate-500">
            Compare total tax burden and net take-home salary side-by-side
          </p>
        </div>

        {savings > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 self-start sm:self-auto transition-transform hover:scale-105">
            <TrendingDown className="w-4 h-4 text-emerald-600" />
            <span>{isNewCheaper ? 'New Regime' : 'Old Regime'} saves {formatIndianCurrency(savings)}</span>
          </div>
        )}
      </div>

      {/* Visual Bars Container */}
      <div className="space-y-6">
        {/* 1. NEW REGIME BAR */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-900">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              New Tax Regime (Section 115BAC)
              {isNewCheaper && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-extrabold">
                  RECOMMENDED
                </span>
              )}
            </span>
            <div className="text-right">
              <span className="text-slate-500 font-medium">Tax: </span>
              <span className="text-slate-900 font-bold">{formatIndianCurrency(newTax)}</span>
              <span className="text-slate-400 mx-1.5">|</span>
              <span className="text-slate-500 font-medium">Take-Home: </span>
              <span className="text-emerald-600 font-extrabold">{formatIndianCurrency(newTakeHome)}</span>
            </div>
          </div>

          {/* Progress Bar with CSS Transitions */}
          <div className="h-5 w-full bg-slate-100 rounded-xl overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${newTaxPct}%` }}
              className="h-full bg-gradient-to-r from-rose-500 to-rose-400 transition-all duration-700 ease-out flex items-center justify-end pr-1.5 text-[10px] font-bold text-white"
              title={`Tax: ${formatIndianCurrency(newTax)}`}
            >
              {newTaxPct > 12 && <span>{newTaxPct}%</span>}
            </div>
            <div
              style={{ width: `${newTakeHomePct}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700 ease-out flex items-center justify-end pr-2 text-[10px] font-bold text-white"
              title={`Take-Home: ${formatIndianCurrency(newTakeHome)}`}
            >
              {newTakeHomePct > 15 && <span>Take-Home ({newTakeHomePct}%)</span>}
            </div>
          </div>
        </div>

        {/* 2. OLD REGIME BAR */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5 text-slate-900">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              Old Tax Regime
              {!isNewCheaper && diff !== 0 && (
                <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-extrabold">
                  RECOMMENDED
                </span>
              )}
            </span>
            <div className="text-right">
              <span className="text-slate-500 font-medium">Tax: </span>
              <span className="text-slate-900 font-bold">{formatIndianCurrency(oldTax)}</span>
              <span className="text-slate-400 mx-1.5">|</span>
              <span className="text-slate-500 font-medium">Take-Home: </span>
              <span className="text-blue-600 font-extrabold">{formatIndianCurrency(oldTakeHome)}</span>
            </div>
          </div>

          {/* Progress Bar with CSS Transitions */}
          <div className="h-5 w-full bg-slate-100 rounded-xl overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${oldTaxPct}%` }}
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-700 ease-out flex items-center justify-end pr-1.5 text-[10px] font-bold text-white"
              title={`Tax: ${formatIndianCurrency(oldTax)}`}
            >
              {oldTaxPct > 12 && <span>{oldTaxPct}%</span>}
            </div>
            <div
              style={{ width: `${oldTakeHomePct}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700 ease-out flex items-center justify-end pr-2 text-[10px] font-bold text-white"
              title={`Take-Home: ${formatIndianCurrency(oldTakeHome)}`}
            >
              {oldTakeHomePct > 15 && <span>Take-Home ({oldTakeHomePct}%)</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Legend & Summary Info */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
            Total Tax Liability
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
            Net Take-Home Salary
          </span>
        </div>
        <span className="italic">
          *Calculated after standard deduction, rebates u/s 87A, surcharge, and 4% cess.
        </span>
      </div>
    </div>
  );
}
