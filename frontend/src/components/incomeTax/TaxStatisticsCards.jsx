import React from 'react';
import { Wallet, Percent, ShieldCheck, Award, TrendingUp, Sparkles } from 'lucide-react';
import { formatIndianCurrency } from '../../utils/incomeTaxEngine';

export default function TaxStatisticsCards({ comparison, grossIncome = 0 }) {
  const { winner, savings, oldRegime, newRegime } = comparison;
  const isNewWinner = winner === 'new';

  const gross = Math.max(1, Number(grossIncome) || 1);
  const winningRegime = isNewWinner ? newRegime : oldRegime;
  const losingRegime = isNewWinner ? oldRegime : newRegime;

  // 1. Monthly in-hand cash
  const winningTax = winningRegime.totalTaxLiability || 0;
  const monthlyTakeHome = Math.max(0, Math.round((gross - winningTax) / 12));
  const monthlyExtra = Math.round(savings / 12);

  // 2. Effective Tax Rates
  const winningEffectiveRate = ((winningTax / gross) * 100).toFixed(1);
  const losingEffectiveRate = ((losingRegime.totalTaxLiability / gross) * 100).toFixed(1);

  // 3. Section 87A Status
  const hasZeroTax = winningTax === 0;
  const hasMarginalRelief = winningRegime.marginalRelief87A > 0;

  // 4. Total deductions claimed
  const totalDeductionsClaimed = oldRegime.totalDeductions + oldRegime.hraExemption;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* 1. MONTHLY TAKE-HOME */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 relative overflow-hidden group hover:border-emerald-300 transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Monthly In-Hand
          </span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Wallet className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight font-mono">
          {formatIndianCurrency(monthlyTakeHome)}
        </div>
        <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-700">
          {monthlyExtra > 0 ? (
            <span className="inline-flex items-center gap-0.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <TrendingUp className="w-3 h-3" /> +{formatIndianCurrency(monthlyExtra)}/mo more
            </span>
          ) : (
            <span className="text-slate-500 font-normal">Direct bank credit estimate</span>
          )}
        </div>
      </div>

      {/* 2. EFFECTIVE TAX RATE */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 relative overflow-hidden group hover:border-blue-300 transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Effective Tax Rate
          </span>
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Percent className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight font-mono">
          {winningEffectiveRate}%
        </div>
        <div className="mt-2 text-[11px] text-slate-500">
          vs {losingEffectiveRate}% in {isNewWinner ? 'Old' : 'New'} Regime
        </div>
      </div>

      {/* 3. SECTION 87A TAX SHIELD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 relative overflow-hidden group hover:border-orange-300 transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            87A Tax Shield
          </span>
          <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#F26522] flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-lg sm:text-xl font-black text-[#111827] tracking-tight">
          {hasZeroTax ? (
            <span className="text-emerald-600 flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> 100% Tax Free
            </span>
          ) : hasMarginalRelief ? (
            <span className="text-blue-600">Marginal Relief Active</span>
          ) : (
            <span className="text-slate-800">Slab Rate Applied</span>
          )}
        </div>
        <div className="mt-2 text-[11px] text-slate-500">
          {hasZeroTax
            ? 'Income within statutory zero-tax limit'
            : hasMarginalRelief
            ? `Saved ${formatIndianCurrency(winningRegime.marginalRelief87A)} via 87A proviso`
            : 'Above ₹7 Lakh rebate threshold'}
        </div>
      </div>

      {/* 4. DEDUCTIONS CLAIMED (OLD REGIME) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 relative overflow-hidden group hover:border-purple-300 transition-all duration-300">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Deductions Claimed
          </span>
          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Award className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-xl sm:text-2xl font-black text-[#111827] tracking-tight font-mono">
          {formatIndianCurrency(totalDeductionsClaimed)}
        </div>
        <div className="mt-2 text-[11px] text-slate-500">
          80C, 80D, HRA & Home Loan claimed
        </div>
      </div>
    </div>
  );
}
