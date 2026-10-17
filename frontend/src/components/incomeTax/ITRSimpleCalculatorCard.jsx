import React, { useState } from 'react';
import {
  BarChart3,
  Zap,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Sparkles,
  Building2,
  FileText,
  Calculator,
  UserCheck,
} from 'lucide-react';
import SimpleDonutChart from '../common/SimpleDonutChart.jsx';
import { formatIndianCurrency } from '../../utils/incomeTaxEngine.js';

export default function ITRSimpleCalculatorCard({
  salary,
  setSalary,
  deductions,
  setDeductions,
  houseProperty,
  setHouseProperty,
  comparison,
  financialYear = '2025-26',
  setFinancialYear,
  ageCategory = 'individual',
  setAgeCategory,
  residentialStatus = 'resident',
  setResidentialStatus,
  incomeMode = 'gross',
  setIncomeMode,
  onReset,
  onSwitchToAdvanced,
}) {
  // Toggle between Old and New Regime view
  const [selectedRegime, setSelectedRegime] = useState('new');

  const { winner, savings, oldRegime, newRegime } = comparison;
  const isNewWinner = winner === 'new';

  const activeRegime = selectedRegime === 'new' ? newRegime : oldRegime;
  const otherRegime = selectedRegime === 'new' ? oldRegime : newRegime;

  const enteredIncomeNum = Number(salary.grossSalary) || 0;
  const activeTax = activeRegime.totalTaxLiability || 0;
  const otherTax = otherRegime.totalTaxLiability || 0;
  const regimeDiff = otherTax - activeTax; // Positive means active regime is cheaper
  const isCurrentlyCheaper = regimeDiff > 0;

  const takeHomeIncome = Math.max(0, enteredIncomeNum - activeTax);
  const effectiveRate =
    enteredIncomeNum > 0 ? ((activeTax / enteredIncomeNum) * 100).toFixed(2) : '0.00';

  const handleSalaryChange = (field, val) => {
    setSalary((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const handleDedChange = (field, val) => {
    setDeductions((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const handleOtherDedChange = (val) => {
    setDeductions((prev) => ({ ...prev, otherDeductions: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  // Quick preset incomes for rapid checking
  const quickIncomePresets = [
    { label: '₹7.5L (0 Tax)', value: 750000 },
    { label: '₹10L', value: 1000000 },
    { label: '₹12L (Ref)', value: 1200000 },
    { label: '₹15L', value: 1500000 },
    { label: '₹20L', value: 2000000 },
    { label: '₹25L', value: 2500000 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 0. TAXPAYER PROFILE & CALCULATION MODE BAR (OFFICIAL ITD PORTAL PARITY) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                Income Tax Dept (ITD) Official Rule Engine
              </span>
              <span className="text-xs text-slate-400 font-medium">AY 2026-27 & Finance Act</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
              Select Tax Profile & Income Calculation Basis
            </h2>
          </div>

          {/* INCOME BASIS MODE SWITCHER (GROSS CTC vs NET TAXABLE INCOME) */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setIncomeMode && setIncomeMode('gross')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                incomeMode === 'gross'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>💼 Gross Salary (CTC)</span>
              <span className="text-[10px] py-0.5 px-1.5 rounded bg-emerald-100 text-emerald-800 font-semibold hidden sm:inline">
                Auto Std Ded
              </span>
            </button>
            <button
              type="button"
              onClick={() => setIncomeMode && setIncomeMode('taxable')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                incomeMode === 'taxable'
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏛️ Net Taxable Income</span>
              <span className="text-[10px] py-0.5 px-1.5 rounded bg-amber-400 text-slate-950 font-bold hidden sm:inline">
                ITD Portal Mode
              </span>
            </button>
          </div>
        </div>

        {/* PROFILE ATTRIBUTES DROPDOWNS (MATCHING ITD PORTAL SCREENSHOT) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 text-xs">
          {/* Assessment Year */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-700">
              Assessment year <span className="text-rose-500">*</span>
            </label>
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear && setFinancialYear(e.target.value)}
              className="w-full h-9 px-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer"
            >
              <option value="2025-26">2026-27 (FY 2025-26 - Current)</option>
              <option value="2024-25">2025-26 (FY 2024-25 - Previous)</option>
              <option value="2026-27">2027-28 (FY 2026-27)</option>
            </select>
          </div>

          {/* Taxpayer Category */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-700">
              Tax payer <span className="text-rose-500">*</span>
            </label>
            <select
              disabled
              defaultValue="Individual"
              className="w-full h-9 px-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-700 cursor-not-allowed"
            >
              <option value="Individual">Individual</option>
            </select>
          </div>

          {/* Age Category */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-700">
              Category (age) <span className="text-rose-500">*</span>
            </label>
            <select
              value={ageCategory}
              onChange={(e) => setAgeCategory && setAgeCategory(e.target.value)}
              className="w-full h-9 px-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer"
            >
              <option value="individual">Less than 60 years</option>
              <option value="senior">Equal to 60 years or more but less than 80 years</option>
              <option value="superSenior">Equal to 80 years or more</option>
            </select>
          </div>

          {/* Residential Status */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-700">
              Residential status <span className="text-rose-500">*</span>
            </label>
            <select
              value={residentialStatus}
              onChange={(e) => setResidentialStatus && setResidentialStatus(e.target.value)}
              className="w-full h-9 px-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer"
            >
              <option value="resident">Resident</option>
              <option value="nonResident">Non-Resident (NRI)</option>
            </select>
          </div>
        </div>

        {/* SECTION 115BAC OPT-OUT SYNC BAR (DIRECT ITD PORTAL REPLICATION) */}
        <div className="mt-4 p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">
              Whether opting out of new tax regime under section 115BAC (1A)? <span className="text-rose-500">*</span>
            </span>
          </div>
          <div className="inline-flex p-0.5 bg-white border border-slate-300 rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedRegime('new')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                selectedRegime === 'new'
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              No (New Regime)
            </button>
            <button
              type="button"
              onClick={() => setSelectedRegime('old')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                selectedRegime === 'old'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Yes (Old Regime)
            </button>
          </div>
        </div>
      </div>

      {/* 1. TOP DUAL REGIME SELECTOR CARDS (VISUAL FEEDBACK & COMPARISON) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* OLD TAX REGIME CARD */}
        <div
          onClick={() => setSelectedRegime('old')}
          className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all duration-200 relative text-center ${
            selectedRegime === 'old'
              ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md bg-blue-50/10'
              : 'border-slate-200 hover:border-slate-300 shadow-xs'
          }`}
        >
          {winner === 'old' && savings > 0 && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] shadow-sm uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Saves {formatIndianCurrency(savings)} • Recommended
            </span>
          )}
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-base font-bold text-slate-900">Old Tax Regime</h3>
            {selectedRegime === 'old' && (
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            )}
          </div>
          <p className="text-xs text-slate-500 mb-3">With Deductions & Exemptions (Opt-Out)</p>
          <ul className="text-[11px] text-slate-500 space-y-1 text-center font-medium">
            <li>• 80C, 80D, HRA deductions available</li>
            <li>• Standard deduction: ₹50,000 (Salaried)</li>
            <li>• Slab rates: 5%, 20%, 30%</li>
          </ul>
        </div>

        {/* NEW TAX REGIME CARD */}
        <div
          onClick={() => setSelectedRegime('new')}
          className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all duration-200 relative text-center ${
            selectedRegime === 'new'
              ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md bg-orange-50/10'
              : 'border-slate-200 hover:border-slate-300 shadow-xs'
          }`}
        >
          {winner === 'new' && savings > 0 && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] shadow-sm uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Saves {formatIndianCurrency(savings)} • Recommended
            </span>
          )}
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F26522] flex items-center justify-center mx-auto mb-2">
            <Zap className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-base font-bold text-slate-900">New Tax Regime</h3>
            {selectedRegime === 'new' && (
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
            )}
          </div>
          <p className="text-xs text-slate-500 mb-3">Lower Rates, No Paperwork (Default 115BAC)</p>
          <ul className="text-[11px] text-slate-500 space-y-1 text-center font-medium">
            <li>• Standard deduction: ₹75,000 (Budget 2024 parity)</li>
            <li>• Slabs: 0% up to ₹3L, 5%, 10%, 15%, 20%, 30%</li>
            <li>• Full rebate up to ₹7 Lakhs taxable income</li>
          </ul>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN SECTION: INPUTS (LEFT) vs DASHBOARD (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: INCOME & DEDUCTIONS CARD (5 COLS) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              {incomeMode === 'taxable' ? 'Net Taxable Income' : 'Income & Deductions'}
            </h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
              {incomeMode === 'taxable' ? 'ITD Direct Slabs' : 'CTC Salaried Mode'}
            </span>
          </div>

          {/* Mode Explanation Notice Banner */}
          {incomeMode === 'taxable' ? (
            <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>1:1 Parity with Official Income Tax Portal</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Enter your exact <strong>Net Taxable Income</strong> (post-deduction) just like on the official ITD website. Tax is computed directly on this figure without deducting standard deduction or Chapter VI-A.
              </p>
            </div>
          ) : (
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Salaried CTC Calculation Active</span>
              </div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                Standard Deduction of <strong>₹75,000</strong> (New Regime) or <strong>₹50,000</strong> (Old Regime) will be automatically deducted from your Gross Salary.
              </p>
            </div>
          )}

          {/* Primary Income Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              {incomeMode === 'taxable' ? 'Net Taxable Income *' : 'Annual Gross Income (CTC) *'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="50000"
                value={salary.grossSalary}
                onChange={(e) => handleSalaryChange('grossSalary', e.target.value)}
                placeholder="1200000"
                className="w-full h-10 pl-8 pr-3 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
            <p className="text-[10px] text-slate-500">
              {incomeMode === 'taxable'
                ? 'Taxable income after all exemptions (matches incometaxindia.gov.in)'
                : 'Annual salary before tax deductions and exemptions'}
            </p>

            {/* Quick Income Preset Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickIncomePresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handleSalaryChange('grossSalary', preset.value)}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition cursor-pointer ${
                    Number(salary.grossSalary) === preset.value
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section Divider: Tax Deductions (Active in Gross Mode) */}
          {incomeMode === 'gross' ? (
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">
                  Tax Deductions (Old Regime)
                </span>
                <span className="text-[10px] text-slate-400">Chapter VI-A</span>
              </div>

              {/* 80C Deductions */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700">
                  80C Deductions (Max ₹1.5L)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="150000"
                    value={deductions.sec80C}
                    onChange={(e) => handleDedChange('sec80C', e.target.value)}
                    placeholder="150000"
                    className="w-full h-9 pl-8 pr-3 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
                <p className="text-[10px] text-slate-400">PPF, ELSS, EPF, Life Insurance, Tuition fee</p>
              </div>

              {/* 80D Health Insurance */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700">
                  80D Health Insurance (Max ₹25K / ₹50K)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    max="100000"
                    value={deductions.sec80D}
                    onChange={(e) => handleDedChange('sec80D', e.target.value)}
                    placeholder="25000"
                    className="w-full h-9 pl-8 pr-3 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              {/* HRA Exemption */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700">
                  HRA Exemption
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={salary.hraExemption}
                    onChange={(e) => handleSalaryChange('hraExemption', e.target.value)}
                    placeholder="0"
                    className="w-full h-9 pl-8 pr-3 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              {/* Other Deductions */}
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-700">
                  Other Deductions (80CCD, 80G, etc.)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={deductions.otherDeductions || ''}
                    onChange={(e) => handleOtherDedChange(e.target.value)}
                    placeholder="0"
                    className="w-full h-9 pl-8 pr-3 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
                <p className="text-[10px] text-slate-400">80CCD(1B), 80E, 80G donations, 24(b)</p>
              </div>
            </div>
          ) : (
            /* Taxable Mode Deductions Notice */
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800 block">Deductions Note</span>
              <p className="text-[11px] leading-relaxed">
                In Net Taxable Income mode, your deductions (80C, 80D, HRA) are already accounted for in the taxable income figure above. Slabs are evaluated directly.
              </p>
            </div>
          )}

          {/* Reset Button (Red / Coral Pill) */}
          <button
            type="button"
            onClick={onReset}
            className="w-full py-2.5 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-xs transition duration-200 active:scale-98 shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Calculator</span>
          </button>
        </div>

        {/* RIGHT COLUMN: METRICS + BREAKDOWN DONUT + CALCULATION (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* TOP 3 METRIC CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card 1: Total Tax Payable (Red/Coral background) */}
            <div className="bg-[#EF4444] text-white rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-rose-100">Total Tax Payable</span>
              <div className="text-xl sm:text-2xl font-black font-mono my-1">
                {formatIndianCurrency(activeTax)}
              </div>
              <span className="text-[11px] text-rose-100">
                {effectiveRate}% effective tax rate
              </span>
            </div>

            {/* Card 2: Tax Saved (White background) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500">
                {isCurrentlyCheaper ? 'Tax Saved' : 'Higher Tax by'}
              </span>
              <div
                className={`text-xl sm:text-2xl font-black font-mono my-1 ${
                  isCurrentlyCheaper ? 'text-emerald-600' : 'text-slate-700'
                }`}
              >
                {formatIndianCurrency(Math.abs(regimeDiff))}
              </div>
              <span className="text-[11px] text-slate-400">
                vs. {selectedRegime === 'new' ? 'Old Regime' : 'New Regime'}
              </span>
            </div>

            {/* Card 3: Take Home Income (White background with Emerald green number) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500">
                {incomeMode === 'taxable' ? 'Post-Tax Retained' : 'Take Home Income'}
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 my-1">
                {formatIndianCurrency(takeHomeIncome)}
              </div>
              <span className="text-[11px] text-slate-400">
                After total income tax
              </span>
            </div>
          </div>

          {/* TAX BREAKDOWN DONUT CHART CARD */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Tax Breakdown</h4>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Donut Chart (Left 5 cols) */}
              <div className="sm:col-span-5 flex items-center justify-center">
                <SimpleDonutChart
                  takeHome={takeHomeIncome}
                  tax={activeTax}
                  size={150}
                  strokeWidth={22}
                />
              </div>

              {/* 3 Colored Legend Pills (Right 7 cols) */}
              <div className="sm:col-span-7 space-y-2 text-xs">
                {/* Take Home Pill */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#ECFDF5] border border-emerald-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-emerald-900">
                      {incomeMode === 'taxable' ? 'Net Retained' : 'Take Home'}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">
                    {formatIndianCurrency(takeHomeIncome)}
                  </span>
                </div>

                {/* Income Tax Pill */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FEF2F2] border border-rose-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="font-semibold text-rose-900">Total Income Tax</span>
                  </div>
                  <span className="font-mono font-bold text-rose-700">
                    {formatIndianCurrency(activeTax)}
                  </span>
                </div>

                {/* Taxable Income Pill */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#EFF6FF] border border-blue-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="font-semibold text-blue-900">Net Taxable Income</span>
                  </div>
                  <span className="font-mono font-bold text-blue-700">
                    {formatIndianCurrency(activeRegime.netTaxableIncome ?? activeRegime.taxableIncome ?? 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILED TAX CALCULATION CARD (EXACT ITD PORTAL LINE-BY-LINE PARITY) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-sm font-bold text-slate-900">Detailed Tax Calculation</h4>
              <span className="text-[11px] font-bold text-slate-600">
                {selectedRegime === 'new' ? 'New Tax Regime (Sec 115BAC)' : 'Old Tax Regime'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              {/* Left Column: Income Details */}
              <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-slate-100 pb-3 sm:pb-0 sm:pr-4">
                <span className="font-bold text-slate-700 block pb-1 border-b border-slate-100 text-[11px] uppercase tracking-wider">
                  Income Breakdown
                </span>

                {incomeMode === 'gross' ? (
                  <>
                    <div className="flex justify-between text-slate-600">
                      <span>Gross Annual Income:</span>
                      <span className="font-mono font-semibold text-slate-900">
                        {formatIndianCurrency(enteredIncomeNum)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Standard Deduction:</span>
                      <span className="font-mono font-semibold text-emerald-600">
                        -{formatIndianCurrency(activeRegime.standardDeduction)}
                      </span>
                    </div>
                    {selectedRegime === 'old' && (
                      <div className="flex justify-between text-slate-600">
                        <span>Chapter VI-A / HRA Deductions:</span>
                        <span className="font-mono font-semibold text-emerald-600">
                          -{formatIndianCurrency((activeRegime.totalDeductions || 0) + (activeRegime.hraExemption || 0))}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-slate-600">
                      <span>Entered Net Taxable Income:</span>
                      <span className="font-mono font-semibold text-slate-900">
                        {formatIndianCurrency(enteredIncomeNum)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Deductions / Exemptions:</span>
                      <span>Already Adjusted</span>
                    </div>
                  </>
                )}

                <div className="flex justify-between font-bold text-slate-900 pt-1.5 border-t border-slate-100">
                  <span>Net Taxable Income (u/s 288A):</span>
                  <span className="font-mono">
                    {formatIndianCurrency(activeRegime.netTaxableIncome ?? activeRegime.taxableIncome ?? 0)}
                  </span>
                </div>
              </div>

              {/* Right Column: Tax Calculation Slabs */}
              <div className="space-y-1.5 sm:pl-2">
                <span className="font-bold text-slate-700 block pb-1 border-b border-slate-100 text-[11px] uppercase tracking-wider">
                  Tax Slabs & Calculation
                </span>

                {/* Itemized Slab Rows */}
                {(activeRegime.slabs || activeRegime.slabBreakdown)?.map((slab, idx) => {
                  const slabLabel =
                    slab.slab ||
                    slab.label ||
                    (slab.max === Infinity
                      ? `Above ₹${Number(slab.min || 0).toLocaleString('en-IN')}`
                      : `₹${Number(slab.min || 0).toLocaleString('en-IN')} to ₹${Number(slab.max || 0).toLocaleString('en-IN')}`);
                  const slabTax = slab.tax ?? slab.taxAmount ?? 0;
                  return (
                    <div key={idx} className="flex justify-between text-[11px] text-slate-600">
                      <span>{slabLabel}:</span>
                      <span className="font-mono font-semibold text-slate-900">
                        {formatIndianCurrency(slabTax)}
                      </span>
                    </div>
                  );
                })}

                {/* Income Tax before Rebate */}
                <div className="flex justify-between text-[11px] text-slate-800 font-bold pt-1 border-t border-slate-100">
                  <span>Income Tax:</span>
                  <span className="font-mono">
                    {formatIndianCurrency(activeRegime.normalSlabTax || activeRegime.totalTaxBeforeRebate || 0)}
                  </span>
                </div>

                {/* Section 87A Rebate */}
                <div className="flex justify-between text-[11px] text-slate-600">
                  <span>Rebate under section 87A:</span>
                  <span className="font-mono text-emerald-700 font-semibold">
                    {activeRegime.rebate87A > 0 ? `-${formatIndianCurrency(activeRegime.rebate87A)}` : '0'}
                  </span>
                </div>

                {/* Section 87A Marginal Relief */}
                {activeRegime.marginalRelief87A > 0 && (
                  <div className="flex justify-between text-[11px] text-emerald-700 font-semibold">
                    <span>Marginal Relief under 87A:</span>
                    <span className="font-mono">
                      -{formatIndianCurrency(activeRegime.marginalRelief87A)}
                    </span>
                  </div>
                )}

                {/* Tax after Rebate */}
                <div className="flex justify-between text-[11px] text-slate-700 font-medium">
                  <span>Income tax after rebate u/s 87A:</span>
                  <span className="font-mono font-semibold">
                    {formatIndianCurrency(
                      activeRegime.taxAfterRebateAndRelief ??
                        Math.max(0, (activeRegime.normalSlabTax || 0) - (activeRegime.rebate87A || 0) - (activeRegime.marginalRelief87A || 0))
                    )}
                  </span>
                </div>

                {/* Surcharge */}
                <div className="flex justify-between text-[11px] text-slate-600">
                  <span>Surcharge:</span>
                  <span className="font-mono">
                    {activeRegime.netSurcharge > 0 ? `+${formatIndianCurrency(activeRegime.netSurcharge)}` : '0'}
                  </span>
                </div>

                {/* Health & Education Cess (4%) */}
                <div className="flex justify-between text-[11px] text-slate-600">
                  <span>Health and education cess (4%):</span>
                  <span className="font-mono font-semibold text-slate-900">
                    +{formatIndianCurrency(activeRegime.cess ?? activeRegime.healthAndEducationCess ?? 0)}
                  </span>
                </div>

                {/* Total Tax Liability */}
                <div className="flex justify-between text-xs font-black text-rose-600 pt-1.5 border-t-2 border-slate-200">
                  <span>Total Tax Liability:</span>
                  <span className="font-mono">
                    {formatIndianCurrency(activeTax)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Switch to Advanced Mode Footer */}
          <div className="p-3.5 bg-slate-100/80 rounded-2xl flex items-center justify-between text-xs text-slate-700">
            <span className="font-medium">Need capital gains, business turnover, or all 5 heads of income?</span>
            <button
              type="button"
              onClick={onSwitchToAdvanced}
              className="text-[#F26522] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Switch to Advanced Mode</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
