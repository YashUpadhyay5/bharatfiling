import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  Info,
  ChevronDown,
  TrendingDown,
  Sparkles,
  BarChart3,
  PieChart as PieIcon,
  ShieldCheck,
  Calculator,
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
  incomeMode = 'taxable',
  setIncomeMode,
  onReset,
}) {
  // Opting out of Section 115BAC (1A): 'no' = New Regime, 'yes' = Old Regime
  const [optOut115BAC, setOptOut115BAC] = useState('yes'); // Default 'yes' aligns with ITD portal screenshot
  const [calculatedPulse, setCalculatedPulse] = useState(false);

  const isOldRegime = optOut115BAC === 'yes';
  const activeRegime = isOldRegime ? comparison.oldRegime : comparison.newRegime;
  const otherRegime = isOldRegime ? comparison.newRegime : comparison.oldRegime;

  const enteredIncome = Number(salary.grossSalary) || 0;
  const activeTax = activeRegime?.totalTaxLiability || 0;
  const otherTax = otherRegime?.totalTaxLiability || 0;

  const oldTax = comparison.oldRegime?.totalTaxLiability || 0;
  const newTax = comparison.newRegime?.totalTaxLiability || 0;
  const taxDiff = oldTax - newTax;
  const isNewCheaper = taxDiff > 0;
  const savings = Math.abs(taxDiff);

  const takeHomeIncome = Math.max(0, enteredIncome - activeTax);
  const effectiveRate =
    enteredIncome > 0 ? ((activeTax / enteredIncome) * 100).toFixed(2) : '0.00';

  const handleIncomeChange = (val) => {
    setSalary((prev) => ({ ...prev, grossSalary: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const handleCalculateClick = () => {
    setCalculatedPulse(true);
    setTimeout(() => setCalculatedPulse(false), 600);
  };

  const handleLocalReset = () => {
    setOptOut115BAC('yes');
    if (setFinancialYear) setFinancialYear('2025-26');
    if (setAgeCategory) setAgeCategory('individual');
    if (setResidentialStatus) setResidentialStatus('resident');
    if (setIncomeMode) setIncomeMode('taxable');
    if (onReset) onReset();
  };

  // Quick preset incomes for rapid checking
  const quickIncomePresets = [
    { label: '₹5,00,000', value: 500000 },
    { label: '₹7,50,000', value: 750000 },
    { label: '₹10,00,000', value: 1000000 },
    { label: '₹12,00,000', value: 1200000 },
    { label: '₹15,00,000', value: 1500000 },
    { label: '₹20,00,000', value: 2000000 },
  ];

  // Visual bar percentages
  const maxIncomeVal = Math.max(enteredIncome, 100000);
  const newTaxPct = Math.min(100, Math.round((newTax / maxIncomeVal) * 100));
  const newTakeHomePct = Math.max(0, 100 - newTaxPct);
  const oldTaxPct = Math.min(100, Math.round((oldTax / maxIncomeVal) * 100));
  const oldTakeHomePct = Math.max(0, 100 - oldTaxPct);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. OFFICIAL INCOME TAX DEPARTMENT CALCULATOR CARD (EXACT REPLICA) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Top Info Notice Banner (Matches Official ITD Portal) */}
        <div className="px-5 sm:px-6 py-3 bg-[#F0F5FF] border-b border-blue-100 flex items-center justify-between text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-semibold">
              As per Income-tax Act, 1961 (Amended by Finance Act, 2026)
            </span>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white border border-blue-200 text-blue-700 font-bold text-[11px]">
            Official ITD AY 2026-27 Parity
          </span>
        </div>

        {/* Main 2-Column Section: Form (Left) vs Output Boxes (Right) */}
        <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FORM INPUTS (7 COLS) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Field 1: Assessment Year */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 sm:items-center">
              <label className="sm:col-span-6 text-xs font-semibold text-slate-800">
                Assessment year <span className="text-rose-500">*</span>
              </label>
              <div className="sm:col-span-6">
                <select
                  value={financialYear}
                  onChange={(e) => setFinancialYear && setFinancialYear(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer"
                >
                  <option value="2025-26">2026-27</option>
                  <option value="2024-25">2025-26</option>
                  <option value="2026-27">2027-28</option>
                </select>
              </div>
            </div>

            {/* Field 2: Tax Payer */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 sm:items-center">
              <label className="sm:col-span-6 text-xs font-semibold text-slate-800">
                Tax payer <span className="text-rose-500">*</span>
              </label>
              <div className="sm:col-span-6">
                <select
                  defaultValue="Individual"
                  disabled
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 cursor-not-allowed"
                >
                  <option value="Individual">Individual</option>
                  <option value="HUF">HUF</option>
                  <option value="AOPs/BOI">AOPs/BOI</option>
                  <option value="Firms/LLP">Firms/LLP</option>
                  <option value="Domestic Company">Domestic Company</option>
                  <option value="Foreign Company">Foreign Company</option>
                </select>
              </div>
            </div>

            {/* Field 3: Category (Age) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 sm:items-center">
              <label className="sm:col-span-6 text-xs font-semibold text-slate-800">
                Category (age) <span className="text-rose-500">*</span>
              </label>
              <div className="sm:col-span-6">
                <select
                  value={ageCategory}
                  onChange={(e) => setAgeCategory && setAgeCategory(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer"
                >
                  <option value="individual">Less than 60 years</option>
                  <option value="senior">Equal to 60 years or more but less than 80 years</option>
                  <option value="superSenior">Equal to 80 years or more</option>
                </select>
              </div>
            </div>

            {/* Field 4: Residential Status */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 sm:items-center">
              <label className="sm:col-span-6 text-xs font-semibold text-slate-800">
                Residential status <span className="text-rose-500">*</span>
              </label>
              <div className="sm:col-span-6">
                <select
                  value={residentialStatus}
                  onChange={(e) => setResidentialStatus && setResidentialStatus(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer"
                >
                  <option value="resident">Resident</option>
                  <option value="nonResident">Non-Resident</option>
                </select>
              </div>
            </div>

            {/* Field 5: Opting Out of Section 115BAC (1A)? */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 sm:items-center">
              <label className="sm:col-span-6 text-xs font-semibold text-slate-800 leading-snug">
                Whether opting out of new tax regime under section 115BAC (1A)? <span className="text-rose-500">*</span>
              </label>
              <div className="sm:col-span-6">
                <select
                  value={optOut115BAC}
                  onChange={(e) => setOptOut115BAC(e.target.value)}
                  className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer"
                >
                  <option value="yes">Yes (Old Tax Regime)</option>
                  <option value="no">No (New Tax Regime)</option>
                </select>
              </div>
            </div>

            {/* Field 6: Net Taxable Income */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 sm:items-center pt-1">
              <div className="sm:col-span-6">
                <label className="text-xs font-semibold text-slate-800 inline-flex items-center gap-1.5">
                  <span>Net taxable income</span>
                  <span className="text-rose-500">*</span>
                  <span
                    title="Enter your taxable income after all deductions. The calculator directly applies progressive tax slabs."
                    className="text-slate-400 hover:text-slate-600 cursor-help"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </span>
                </label>
              </div>
              <div className="sm:col-span-6">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    value={salary.grossSalary}
                    onChange={(e) => handleIncomeChange(e.target.value)}
                    placeholder="1200000"
                    className="w-full h-10 pl-7 pr-3 text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>
            </div>

            {/* Quick Income Preset Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 sm:pl-[50%]">
              {quickIncomePresets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handleIncomeChange(preset.value)}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded border transition cursor-pointer ${
                    Number(salary.grossSalary) === preset.value
                      ? 'bg-[#132f58] text-white border-[#132f58]'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Action Buttons: Calculate & Reset (Matching ITD Portal) */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleCalculateClick}
                className="px-6 py-2 rounded-lg bg-[#132f58] hover:bg-[#0f2546] text-white text-xs font-bold shadow-xs transition active:scale-98 cursor-pointer flex items-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Calculate</span>
              </button>

              <button
                type="button"
                onClick={handleLocalReset}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 transition cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: OFFICIAL RESULT BOXES (5 COLS - EXACT ITD STACK) */}
          <div
            className={`lg:col-span-5 space-y-3 transition-all duration-300 ${
              calculatedPulse ? 'scale-[1.01] ring-2 ring-blue-500/30 rounded-xl' : ''
            }`}
          >
            {/* Box 1: Income Tax */}
            <div className="p-3 bg-white border border-slate-300 rounded-lg flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-600">Income tax</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                {activeRegime.normalSlabTax ?? activeRegime.totalTaxBeforeRebate ?? 0}
              </div>
            </div>

            {/* Box 2: Rebate under section 87A */}
            <div className="p-3 bg-white border border-slate-300 rounded-lg flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-600">
                Rebate under section 87A
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                {activeRegime.rebate87A || 0}
              </div>
            </div>

            {/* Box 3: Income tax after rebate under section 87A */}
            <div className="p-3 bg-white border border-slate-300 rounded-lg flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-600">
                Income tax after rebate under section 87A
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                {activeRegime.taxAfterRebateAndRelief ??
                  Math.max(
                    0,
                    (activeRegime.normalSlabTax || 0) -
                      (activeRegime.rebate87A || 0) -
                      (activeRegime.marginalRelief87A || 0)
                  )}
              </div>
            </div>

            {/* Box 4: Surcharge */}
            <div className="p-3 bg-white border border-slate-300 rounded-lg flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-600">Surcharge</span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                {activeRegime.netSurcharge || 0}
              </div>
            </div>

            {/* Box 5: Health and education cess */}
            <div className="p-3 bg-white border border-slate-300 rounded-lg flex flex-col justify-between">
              <span className="text-[11px] font-semibold text-slate-600">
                Health and education cess
              </span>
              <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                {activeRegime.cess ?? activeRegime.healthAndEducationCess ?? 0}
              </div>
            </div>

            {/* Box 6: Total Tax Liability (Highlighted Final Card) */}
            <div className="p-4 bg-[#F0FDF4] border-2 border-emerald-400 rounded-xl flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-xs font-bold text-emerald-950 block">Total tax liability</span>
                <span className="text-[11px] text-emerald-700 font-medium">
                  {effectiveRate}% effective tax rate
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-800">
                ₹{(activeTax).toLocaleString('en-IN')}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. ATTRACTIVE VISUAL STATISTICS (BAR CHART & PIE CHART ONLY) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT STAT: PIE / DONUT BREAKDOWN (5 COLS) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <PieIcon className="w-4 h-4 text-blue-600" />
                <span>Income vs Tax Breakdown</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                Pie Chart
              </span>
            </div>

            <div className="my-5 flex items-center justify-center">
              <SimpleDonutChart
                takeHome={takeHomeIncome}
                tax={activeTax}
                size={160}
                strokeWidth={24}
              />
            </div>
          </div>

          {/* Legend Pills */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-semibold text-emerald-900">Take-Home (In Hand)</span>
              </div>
              <span className="font-mono font-bold text-emerald-700">
                {formatIndianCurrency(takeHomeIncome)}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-50/80 border border-rose-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="font-semibold text-rose-900">Total Income Tax</span>
              </div>
              <span className="font-mono font-bold text-rose-700">
                {formatIndianCurrency(activeTax)}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/80 border border-blue-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="font-semibold text-blue-900">Net Taxable Income</span>
              </div>
              <span className="font-mono font-bold text-blue-700">
                {formatIndianCurrency(enteredIncome)}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT STAT: COMPARATIVE BAR CHART (OLD vs NEW REGIME) (7 COLS) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>Old Regime vs New Regime Comparison</span>
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Side-by-side tax burden comparison for ₹{enteredIncome.toLocaleString('en-IN')}
                </p>
              </div>

              {savings > 0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 self-start sm:self-auto shadow-2xs">
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isNewCheaper ? 'New Regime' : 'Old Regime'} saves {formatIndianCurrency(savings)}</span>
                </div>
              )}
            </div>

            {/* Visual Bars Container */}
            <div className="space-y-6 pt-2">
              {/* 1. New Tax Regime Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>New Tax Regime (Section 115BAC)</span>
                    {isNewCheaper && (
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-extrabold uppercase">
                        Recommended
                      </span>
                    )}
                  </span>
                  <div className="text-right font-mono font-bold">
                    <span className="text-rose-600">Tax: {formatIndianCurrency(newTax)}</span>
                    <span className="text-slate-300 mx-1.5">|</span>
                    <span className="text-emerald-600">In Hand: {formatIndianCurrency(Math.max(0, enteredIncome - newTax))}</span>
                  </div>
                </div>

                <div className="h-6 w-full bg-slate-100 rounded-xl overflow-hidden flex shadow-inner">
                  <div
                    style={{ width: `${newTaxPct}%` }}
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-400 flex items-center justify-end pr-2 text-[10px] font-bold text-white transition-all duration-500"
                    title={`New Regime Tax: ${formatIndianCurrency(newTax)}`}
                  >
                    {newTaxPct > 12 && <span>{newTaxPct}%</span>}
                  </div>
                  <div
                    style={{ width: `${newTakeHomePct}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-end pr-2 text-[10px] font-bold text-white transition-all duration-500"
                    title={`New Regime Take-Home: ${formatIndianCurrency(Math.max(0, enteredIncome - newTax))}`}
                  >
                    {newTakeHomePct > 18 && <span>Take-Home ({newTakeHomePct}%)</span>}
                  </div>
                </div>
              </div>

              {/* 2. Old Tax Regime Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Old Tax Regime (Opt-Out)</span>
                    {!isNewCheaper && taxDiff !== 0 && (
                      <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-extrabold uppercase">
                        Recommended
                      </span>
                    )}
                  </span>
                  <div className="text-right font-mono font-bold">
                    <span className="text-rose-600">Tax: {formatIndianCurrency(oldTax)}</span>
                    <span className="text-slate-300 mx-1.5">|</span>
                    <span className="text-emerald-600">In Hand: {formatIndianCurrency(Math.max(0, enteredIncome - oldTax))}</span>
                  </div>
                </div>

                <div className="h-6 w-full bg-slate-100 rounded-xl overflow-hidden flex shadow-inner">
                  <div
                    style={{ width: `${oldTaxPct}%` }}
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-400 flex items-center justify-end pr-2 text-[10px] font-bold text-white transition-all duration-500"
                    title={`Old Regime Tax: ${formatIndianCurrency(oldTax)}`}
                  >
                    {oldTaxPct > 12 && <span>{oldTaxPct}%</span>}
                  </div>
                  <div
                    style={{ width: `${oldTakeHomePct}%` }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-end pr-2 text-[10px] font-bold text-white transition-all duration-500"
                    title={`Old Regime Take-Home: ${formatIndianCurrency(Math.max(0, enteredIncome - oldTax))}`}
                  >
                    {oldTakeHomePct > 18 && <span>Take-Home ({oldTakeHomePct}%)</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between">
            <span className="text-[11px]">
              Active calculation based on: <strong>{isOldRegime ? 'Old Tax Regime' : 'New Tax Regime (Sec 115BAC)'}</strong>
            </span>
            <button
              type="button"
              onClick={() => setOptOut115BAC(isOldRegime ? 'no' : 'yes')}
              className="text-blue-600 hover:text-blue-800 font-bold text-[11px] underline cursor-pointer"
            >
              Switch to {isOldRegime ? 'New Regime' : 'Old Regime'}
            </button>
          </div>
        </div>

      </div>

      {/* 3. ITEMIZED TAX SLAB PROGRESSION TABLE (PURE ITR SLAB BREAKDOWN) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Tax Slab Calculation Breakdown ({isOldRegime ? 'Old Regime' : 'New Regime - Section 115BAC'})
            </h3>
            <p className="text-[11px] text-slate-500">
              Itemized bracket breakdown on Net Taxable Income of ₹{enteredIncome.toLocaleString('en-IN')}
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 self-start sm:self-auto">
            AY {activeRegime.assessmentYear || '2026-27'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="py-2.5 px-3">Tax Slab Range</th>
                <th className="py-2.5 px-3">Income Tax Rate</th>
                <th className="py-2.5 px-3 text-right">Taxable Amount in Slab</th>
                <th className="py-2.5 px-3 text-right">Tax Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {(activeRegime.slabs || activeRegime.slabBreakdown)?.map((slab, idx) => {
                const slabLabel =
                  slab.slab ||
                  slab.label ||
                  (slab.max === Infinity
                    ? `Above ₹${Number(slab.min || 0).toLocaleString('en-IN')}`
                    : `₹${Number(slab.min || 0).toLocaleString('en-IN')} to ₹${Number(slab.max || 0).toLocaleString('en-IN')}`);
                const rateLabel =
                  slab.rate !== undefined
                    ? typeof slab.rate === 'number'
                      ? `${Math.round(slab.rate * 100)}%`
                      : slab.rate
                    : '—';
                const taxableAmt = slab.taxableInSlab ?? slab.taxableAmount ?? 0;
                const slabTax = slab.tax ?? slab.taxAmount ?? 0;

                return (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{slabLabel}</td>
                    <td className="py-2.5 px-3 font-mono">{rateLabel}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                      ₹{taxableAmt.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      ₹{slabTax.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50/80 font-bold text-slate-900 border-t-2 border-slate-200">
                <td colSpan={3} className="py-2.5 px-3 text-right">
                  Income Tax before Rebate:
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                  ₹{(activeRegime.normalSlabTax ?? activeRegime.totalTaxBeforeRebate ?? 0).toLocaleString('en-IN')}
                </td>
              </tr>
              {activeRegime.rebate87A > 0 && (
                <tr className="font-semibold text-emerald-700">
                  <td colSpan={3} className="py-2 px-3 text-right">
                    Less: Rebate under section 87A:
                  </td>
                  <td className="py-2 px-3 text-right font-mono">
                    -₹{activeRegime.rebate87A.toLocaleString('en-IN')}
                  </td>
                </tr>
              )}
              {activeRegime.netSurcharge > 0 && (
                <tr className="font-semibold text-amber-800">
                  <td colSpan={3} className="py-2 px-3 text-right">
                    Add: Surcharge:
                  </td>
                  <td className="py-2 px-3 text-right font-mono">
                    +₹{activeRegime.netSurcharge.toLocaleString('en-IN')}
                  </td>
                </tr>
              )}
              <tr className="font-semibold text-slate-700">
                <td colSpan={3} className="py-2 px-3 text-right">
                  Add: Health and Education Cess (4%):
                </td>
                <td className="py-2 px-3 text-right font-mono text-slate-900">
                  +₹{(activeRegime.cess ?? activeRegime.healthAndEducationCess ?? 0).toLocaleString('en-IN')}
                </td>
              </tr>
              <tr className="bg-emerald-50 text-emerald-950 font-black border-t-2 border-emerald-300">
                <td colSpan={3} className="py-3 px-3 text-right text-xs">
                  Total Tax Liability (rounded u/s 288B):
                </td>
                <td className="py-3 px-3 text-right font-mono text-sm text-emerald-800">
                  ₹{activeTax.toLocaleString('en-IN')}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
