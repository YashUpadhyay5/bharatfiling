import React, { useState } from 'react';
import {
  Briefcase,
  Home,
  TrendingUp,
  Store,
  Coins,
  ChevronDown,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IncomeAccordion({
  salary,
  setSalary,
  houseProperty,
  setHouseProperty,
  capitalGains,
  setCapitalGains,
  businessProfession,
  setBusinessProfession,
  otherSources,
  setOtherSources,
}) {
  const [openSections, setOpenSections] = useState({
    salary: true,
    houseProperty: false,
    capitalGains: false,
    business: false,
    otherSources: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSalaryChange = (field, val) => {
    setSalary((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const handleHPChange = (field, val) => {
    setHouseProperty((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const handleCGChange = (field, val) => {
    setCapitalGains((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const handleBizChange = (field, val) => {
    setBusinessProfession((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const handleOSChange = (field, val) => {
    setOtherSources((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  return (
    <div className="space-y-4 mb-6">
      {/* 1. SALARY INCOME ACCORDION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('salary')}
          className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/70 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#111827]">
                1. Income from Salary & Pension
              </h4>
              <p className="text-xs text-slate-500">
                Gross CTC, HRA exemption, LTA, and professional tax
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {Number(salary.grossSalary) > 0 && (
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                ₹{Number(salary.grossSalary).toLocaleString('en-IN')}
              </span>
            )}
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                openSections.salary ? 'rotate-180 text-blue-600' : ''
              }`}
            />
          </div>
        </button>

        {openSections.salary && (
          <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Gross Annual Salary (Before Exemptions) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 1200000"
                  value={salary.grossSalary}
                  onChange={(e) => handleSalaryChange('grossSalary', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Standard Deduction (₹75k New / ₹50k Old) will be deducted automatically.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Exempt HRA (Section 10(13A))
                </label>
                <Link
                  to="/tools/hra-calculator"
                  target="_blank"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F26522] hover:underline"
                >
                  Calculate via HRA Tool <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 180000"
                  value={salary.hraExemption}
                  onChange={(e) => handleSalaryChange('hraExemption', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-amber-600 font-medium">
                Allowed under Old Tax Regime only. Disallowed in New Regime.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Exempt Leave Travel Allowance (LTA)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 40000"
                  value={salary.ltaExemption}
                  onChange={(e) => handleSalaryChange('ltaExemption', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Under Section 10(5) in Old Regime.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Professional Tax (Section 16(iii))
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  max="2500"
                  placeholder="Max ₹2,500/year"
                  value={salary.professionalTax}
                  onChange={(e) => handleSalaryChange('professionalTax', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Max ₹2,500 allowed in Old Regime.</p>
            </div>
          </div>
        )}
      </div>

      {/* 2. HOUSE PROPERTY INCOME ACCORDION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('houseProperty')}
          className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/70 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#111827]">
                2. Income / Loss from House Property
              </h4>
              <p className="text-xs text-slate-500">
                Self-occupied home loan interest (Section 24(b)) and rental properties
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {Number(houseProperty.interestSelfOccupied) > 0 && (
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                Loan Int: ₹{Number(houseProperty.interestSelfOccupied).toLocaleString('en-IN')}
              </span>
            )}
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                openSections.houseProperty ? 'rotate-180 text-emerald-600' : ''
              }`}
            />
          </div>
        </button>

        {openSections.houseProperty && (
          <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Self-Occupied Home Loan Interest (Section 24(b))
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 200000"
                  value={houseProperty.interestSelfOccupied}
                  onChange={(e) => handleHPChange('interestSelfOccupied', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-amber-600 font-medium">
                Max ₹2,00,000 deduction allowed under Old Regime. Disallowed in New Regime.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Annual Rental Income Received (Let-out)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 360000"
                  value={houseProperty.rentalIncome}
                  onChange={(e) => handleHPChange('rentalIncome', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                30% statutory deduction is auto-calculated on Net Annual Value.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Municipal Taxes Paid on Let-out Property
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 15000"
                  value={houseProperty.municipalTaxes}
                  onChange={(e) => handleHPChange('municipalTaxes', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Interest Paid on Borrowed Capital (Let-out Property)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 180000"
                  value={houseProperty.interestLetOut}
                  onChange={(e) => handleHPChange('interestLetOut', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. CAPITAL GAINS ACCORDION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('capitalGains')}
          className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/70 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#111827]">
                3. Capital Gains (Equity, Mutual Funds, Real Estate)
              </h4>
              <p className="text-xs text-slate-500">
                Section 111A (STCG) and Section 112A (LTCG post-July 2024 Budget rates)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                openSections.capitalGains ? 'rotate-180 text-purple-600' : ''
              }`}
            />
          </div>
        </button>

        {openSections.capitalGains && (
          <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Short Term Capital Gains (Equity / MFs u/s 111A)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 50000"
                  value={capitalGains.stcg111A}
                  onChange={(e) => handleCGChange('stcg111A', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Taxed at 20% (Budget 2024 rate).</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Long Term Capital Gains (Equity / MFs u/s 112A)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 200000"
                  value={capitalGains.ltcg112A}
                  onChange={(e) => handleCGChange('ltcg112A', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                ₹1.25 Lakh is tax-exempt; balance is taxed at 12.5%.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Other Long Term Capital Gains (Section 112)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 100000"
                  value={capitalGains.ltcgOther}
                  onChange={(e) => handleCGChange('ltcgOther', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Property, gold, unlisted shares.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Other Short Term Capital Gains (Slab Rate)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 30000"
                  value={capitalGains.stcgOther}
                  onChange={(e) => handleCGChange('stcgOther', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Taxed at regular slab rates.</p>
            </div>
          </div>
        )}
      </div>

      {/* 4. BUSINESS & PROFESSION ACCORDION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('business')}
          className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/70 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#111827]">
                4. Profits from Business or Profession
              </h4>
              <p className="text-xs text-slate-500">
                Presumptive taxation (Section 44AD / 44ADA) or regular books of accounts
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                openSections.business ? 'rotate-180 text-amber-600' : ''
              }`}
            />
          </div>
        </button>

        {openSections.business && (
          <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Presumptive Income u/s 44AD (Small Business)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 400000"
                  value={businessProfession.presumptiveIncome44AD}
                  onChange={(e) => handleBizChange('presumptiveIncome44AD', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Min 6% or 8% of gross receipts.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Presumptive Income u/s 44ADA (Professionals)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 500000"
                  value={businessProfession.presumptiveIncome44ADA}
                  onChange={(e) => handleBizChange('presumptiveIncome44ADA', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Min 50% for CAs, Doctors, IT etc.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Net Profit from Regular Business (Non-presumptive)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 600000"
                  value={businessProfession.businessProfitNormal}
                  onChange={(e) => handleBizChange('businessProfitNormal', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Requires filing ITR-3.</p>
            </div>
          </div>
        )}
      </div>

      {/* 5. OTHER SOURCES ACCORDION */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('otherSources')}
          className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/70 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#111827]">
                5. Income from Other Sources
              </h4>
              <p className="text-xs text-slate-500">
                Savings account interest, fixed deposits, dividends, lottery
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                openSections.otherSources ? 'rotate-180 text-emerald-600' : ''
              }`}
            />
          </div>
        </button>

        {openSections.otherSources && (
          <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Savings Account Interest
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 15000"
                  value={otherSources.savingsInterest}
                  onChange={(e) => handleOSChange('savingsInterest', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Sec 80TTA exempts up to ₹10k in Old.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                FD / Recurring Deposit Interest
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 45000"
                  value={otherSources.fdInterest}
                  onChange={(e) => handleOSChange('fdInterest', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Sec 80TTB exempts up to ₹50k for seniors.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Dividend Income
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 20000"
                  value={otherSources.dividendIncome}
                  onChange={(e) => handleOSChange('dividendIncome', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Taxed at normal slab rates.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Lottery / Online Gaming (115BB)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 10000"
                  value={otherSources.lotteryWinnings}
                  onChange={(e) => handleOSChange('lotteryWinnings', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Flat 30% without slab benefit.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
