import React from 'react';
import { Briefcase, Award, Home, Shield, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatIndianCurrency } from '../../utils/incomeTaxEngine';

export default function SimpleTaxForm({
  salary,
  setSalary,
  deductions,
  setDeductions,
  houseProperty,
  setHouseProperty,
  onSwitchToAdvanced,
}) {
  const handleSalaryChange = (field, val) => {
    setSalary((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const handleDedChange = (field, val) => {
    setDeductions((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const handleHPChange = (field, val) => {
    setHouseProperty((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const grossSalaryNum = Number(salary.grossSalary) || 0;
  const monthlySalary = Math.round(grossSalaryNum / 12);

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* 1. PRIMARY SALARY INCOME CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 transition-all duration-300">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F26522]">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#111827]">
                1. Annual Salary Income
              </h3>
              <p className="text-xs text-slate-500">
                Your annual CTC from employer before standard deduction
              </p>
            </div>
          </div>
          {grossSalaryNum > 0 && (
            <span className="hidden sm:inline-flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
              ~{formatIndianCurrency(monthlySalary)} / month
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Annual Gross Salary (CTC) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="50000"
                placeholder="e.g. 1200000"
                value={salary.grossSalary}
                onChange={(e) => handleSalaryChange('grossSalary', e.target.value)}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] transition-colors"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              Standard deduction (₹75k New / ₹50k Old) applies automatically.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                HRA Exemption Claimed
              </label>
              <Link
                to="/tools/hra-calculator"
                target="_blank"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F26522] hover:underline"
              >
                Calculate HRA <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 120000"
                value={salary.hraExemption}
                onChange={(e) => handleSalaryChange('hraExemption', e.target.value)}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] transition-colors"
              />
            </div>
            <p className="mt-1 text-[11px] text-amber-700 font-medium">
              Allowed in Old Tax Regime under Sec 10(13A).
            </p>
          </div>
        </div>
      </div>

      {/* 2. COMMON SALARIED DEDUCTIONS (OLD REGIME) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 transition-all duration-300">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#111827]">
                2. Common Tax Deductions (Old Regime)
              </h3>
              <p className="text-xs text-slate-500">
                Major investments and insurance to reduce taxable income
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Section 80C */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Section 80C
              </label>
              <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                Max ₹1.5L
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                max="150000"
                placeholder="e.g. 150000"
                value={deductions.sec80C}
                onChange={(e) => handleDedChange('sec80C', e.target.value)}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] transition-colors"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
              EPF, PPF, ELSS, LIC, School Tuition
            </p>
          </div>

          {/* Section 80D */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Section 80D
              </label>
              <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                Max ₹25k-₹50k
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                max="100000"
                placeholder="e.g. 25000"
                value={deductions.sec80D}
                onChange={(e) => handleDedChange('sec80D', e.target.value)}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] transition-colors"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
              Medical Insurance for Self & Parents
            </p>
          </div>

          {/* Home Loan Interest Sec 24b */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Home Loan Interest
              </label>
              <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-1.5 py-0.5 rounded">
                Max ₹2L
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                max="200000"
                placeholder="e.g. 150000"
                value={houseProperty.interestSelfOccupied}
                onChange={(e) => handleHPChange('interestSelfOccupied', e.target.value)}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] transition-colors"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500 line-clamp-1">
              Section 24(b) Self-Occupied interest
            </p>
          </div>
        </div>
      </div>

      {/* 3. SWITCH TO ADVANCED MODE BANNER */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/40 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
            Have capital gains, business turnover, or savings interest?
          </h4>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Configure all 5 statutory income heads, stock LTCG/STCG, NPS, and TDS credits in Advanced Mode.
          </p>
        </div>
        <button
          type="button"
          onClick={onSwitchToAdvanced}
          className="shrink-0 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
        >
          <span>Open Advanced Mode</span>
          <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
        </button>
      </div>
    </div>
  );
}
