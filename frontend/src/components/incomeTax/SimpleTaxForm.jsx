import React from 'react';
import { Briefcase, Award, Home, Shield, Sparkles, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatIndianCurrency } from '../../utils/incomeTaxEngine';

export default function SimpleTaxForm({
  salary,
  setSalary,
  deductions,
  setDeductions,
  houseProperty,
  setHouseProperty,
  otherSources,
  setOtherSources,
  ageCategory,
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

  const handleOSChange = (field, val) => {
    setOtherSources((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const grossSalaryNum = Number(salary.grossSalary) || 0;
  const monthlySalary = Math.round(grossSalaryNum / 12);
  const isSenior = ageCategory === 'senior' || ageCategory === 'superSenior';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. SALARY CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 transition-all duration-300">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F26522]">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#111827]">
                1. Salary & Primary Income
              </h3>
              <p className="text-xs text-slate-500">
                Enter your total annual gross compensation from your employer
              </p>
            </div>
          </div>
          {grossSalaryNum > 0 && (
            <span className="hidden sm:inline-flex items-center text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              ~{formatIndianCurrency(monthlySalary)} / month
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Annual Gross Salary (CTC) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
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
              Standard deduction of ₹75,000 (New) / ₹50,000 (Old) applies automatically.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                HRA Exemption Claimed (Sec 10(13A))
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
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 150000"
                value={salary.hraExemption}
                onChange={(e) => handleSalaryChange('hraExemption', e.target.value)}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] transition-colors"
              />
            </div>
            <p className="mt-1 text-[11px] text-amber-700 font-medium">
              Allowed in Old Tax Regime only.
            </p>
          </div>
        </div>
      </div>

      {/* 2. COMMON DEDUCTIONS CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 transition-all duration-300">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#111827]">
                2. Key Tax-Saving Deductions (Old Regime)
              </h3>
              <p className="text-xs text-slate-500">
                Maximize your tax benefits under Chapter VI-A and Home Loan
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Section 80C */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Section 80C (PPF, EPF, ELSS, LIC, Tuition)
              </label>
              <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                Max ₹1,50,000
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
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
          </div>

          {/* Home Loan Interest Sec 24b */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Home Loan Interest (Section 24(b) Self-Occupied)
              </label>
              <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                Max ₹2,00,000
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                max="200000"
                placeholder="e.g. 200000"
                value={houseProperty.interestSelfOccupied}
                onChange={(e) => handleHPChange('interestSelfOccupied', e.target.value)}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] transition-colors"
              />
            </div>
          </div>

          {/* Section 80D */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Section 80D (Health Insurance Mediclaim)
              </label>
              <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                Max ₹25k / ₹50k (Senior)
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
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
          </div>

          {/* Employer NPS Section 80CCD(2) - ALLOWED IN BOTH */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Employer NPS Contribution (Sec 80CCD(2))
              </label>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Both Regimes
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 50000"
                value={deductions.sec80CCD2}
                onChange={(e) => handleDedChange('sec80CCD2', e.target.value)}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] transition-colors"
              />
            </div>
            <p className="mt-1 text-[11px] text-emerald-700 font-medium">
              Allowed in New Regime up to 10% (14% for Govt) of salary.
            </p>
          </div>
        </div>
      </div>

      {/* 3. SAVINGS & DEPOSIT INTEREST */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 transition-all duration-300">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#111827]">
                3. Savings Account & FD Interest
              </h3>
              <p className="text-xs text-slate-500">
                Automatic Section 80TTA/TTB deduction applies for eligible interest
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Savings Bank Account Interest
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 10000"
                value={otherSources.savingsInterest}
                onChange={(e) => handleOSChange('savingsInterest', e.target.value)}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] transition-colors"
              />
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {isSenior ? 'Sec 80TTB exempts up to ₹50k for seniors' : 'Sec 80TTA exempts up to ₹10k in Old'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Fixed Deposit (FD) / Recurring Deposit Interest
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 25000"
                value={otherSources.fdInterest}
                onChange={(e) => handleOSChange('fdInterest', e.target.value)}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
