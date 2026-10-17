import React, { useState } from 'react';
import { BarChart3, Zap, ArrowRight, RotateCcw } from 'lucide-react';
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
  onReset,
  onSwitchToAdvanced,
}) {
  // Toggle between Old and New Regime view
  const [selectedRegime, setSelectedRegime] = useState('new');

  const { winner, savings, oldRegime, newRegime } = comparison;
  const isNewWinner = winner === 'new';

  const activeRegime = selectedRegime === 'new' ? newRegime : oldRegime;
  const grossSalaryNum = Number(salary.grossSalary) || 0;
  const activeTax = activeRegime.totalTaxLiability || 0;
  const takeHomeIncome = Math.max(0, grossSalaryNum - activeTax);
  const effectiveRate = grossSalaryNum > 0 ? ((activeTax / grossSalaryNum) * 100).toFixed(2) : '0.00';

  const handleSalaryChange = (field, val) => {
    setSalary((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const handleDedChange = (field, val) => {
    setDeductions((prev) => ({ ...prev, [field]: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  const handleOtherDedChange = (val) => {
    // Stores in otherDeductions
    setDeductions((prev) => ({ ...prev, otherDeductions: val === '' ? '' : Math.max(0, Number(val)) }));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* 1. TOP DUAL REGIME SELECTOR CARDS (EXACT MATCH TO REFERENCE IMAGE) */}
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
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-2">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Old Tax Regime</h3>
          <p className="text-xs text-slate-500 mb-3">With Deductions & Exemptions</p>
          <ul className="text-[11px] text-slate-500 space-y-1 text-center font-medium">
            <li>• 80C, 80D, HRA deductions available</li>
            <li>• Standard deduction: ₹50,000</li>
            <li>• Higher tax rates but more deductions</li>
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
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F26522] flex items-center justify-center mx-auto mb-2">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="text-base font-bold text-slate-900">New Tax Regime</h3>
          <p className="text-xs text-slate-500 mb-3">Lower Rates, No Deductions</p>
          <ul className="text-[11px] text-slate-500 space-y-1 text-center font-medium">
            <li>• Standard deduction: ₹75,000</li>
            <li>• Lower tax slab rates (0% up to ₹3L/₹4L)</li>
            <li>• Simplified tax calculation</li>
          </ul>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN SECTION: INPUTS (LEFT) vs DASHBOARD (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: INCOME & DEDUCTIONS CARD (5 COLS) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Income & Deductions
          </h3>

          {/* Annual Gross Income */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">
              Annual Gross Income:
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
                className="w-full h-10 pl-8 pr-3 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          {/* Section Divider: Tax Deductions */}
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-800 block mb-2">Tax Deductions</span>

            {/* 80C Deductions */}
            <div className="space-y-1 mb-3">
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
                  className="w-full h-10 pl-8 pr-3 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
              <p className="text-[10px] text-slate-400">PPF, ELSS, Life Insurance, etc.</p>
            </div>

            {/* 80D Health Insurance */}
            <div className="space-y-1 mb-3">
              <label className="block text-[11px] font-semibold text-slate-700">
                80D Health Insurance (Max ₹25K)
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
                  className="w-full h-10 pl-8 pr-3 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            {/* HRA Exemption */}
            <div className="space-y-1 mb-3">
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
                  placeholder="200000"
                  className="w-full h-10 pl-8 pr-3 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            {/* Other Deductions */}
            <div className="space-y-1 mb-4">
              <label className="block text-[11px] font-semibold text-slate-700">
                Other Deductions
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
                  className="w-full h-10 pl-8 pr-3 text-xs font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
              <p className="text-[10px] text-slate-400">80CCD, 80G, 24B, etc.</p>
            </div>

            {/* Reset Button (Red / Coral Pill matching Reference Image) */}
            <button
              type="button"
              onClick={onReset}
              className="w-full py-2.5 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-xs transition duration-200 active:scale-98 shadow-xs cursor-pointer"
            >
              Reset Calculator
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: METRICS + BREAKDOWN DONUT + CALCULATION (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* TOP 3 METRIC CARDS (MATCHING REFERENCE IMAGE) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Card 1: Total Tax Payable (Red/Coral background) */}
            <div className="bg-[#EF4444] text-white rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-rose-100">Total Tax Payable</span>
              <div className="text-xl sm:text-2xl font-black font-mono my-1">
                {formatIndianCurrency(activeTax)}
              </div>
              <span className="text-[11px] text-rose-100">{effectiveRate}% effective rate</span>
            </div>

            {/* Card 2: Tax Saved (White background) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500">Tax Saved</span>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 my-1">
                {formatIndianCurrency(savings)}
              </div>
              <span className="text-[11px] text-slate-400">vs. the other regime</span>
            </div>

            {/* Card 3: Take Home Income (White background with Emerald green number) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500">Take Home Income</span>
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 my-1">
                {formatIndianCurrency(takeHomeIncome)}
              </div>
              <span className="text-[11px] text-slate-400">After tax deduction</span>
            </div>
          </div>

          {/* TAX BREAKDOWN DONUT CHART CARD (MATCHING REFERENCE IMAGE) */}
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
                    <span className="font-semibold text-emerald-900">Take Home</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-700">
                    {formatIndianCurrency(takeHomeIncome)}
                  </span>
                </div>

                {/* Income Tax Pill */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FEF2F2] border border-rose-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="font-semibold text-rose-900">Income Tax</span>
                  </div>
                  <span className="font-mono font-bold text-rose-700">
                    {formatIndianCurrency(activeTax)}
                  </span>
                </div>

                {/* Taxable Income Pill */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#EFF6FF] border border-blue-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="font-semibold text-blue-900">Taxable Income</span>
                  </div>
                  <span className="font-mono font-bold text-blue-700">
                    {formatIndianCurrency(activeRegime.netTaxableIncome ?? activeRegime.taxableIncome ?? 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILED TAX CALCULATION CARD (MATCHING REFERENCE IMAGE) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Detailed Tax Calculation</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              {/* Left Column: Income Details */}
              <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-slate-100 pb-3 sm:pb-0 sm:pr-4">
                <span className="font-bold text-slate-700 block pb-1 border-b border-slate-100 text-[11px] uppercase tracking-wider">
                  Income Details
                </span>
                <div className="flex justify-between text-slate-600">
                  <span>Gross Annual Income:</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {formatIndianCurrency(grossSalaryNum)}
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
                    <span>Total Deductions:</span>
                    <span className="font-mono font-semibold text-emerald-600">
                      -{formatIndianCurrency((activeRegime.totalDeductions || 0) + (activeRegime.hraExemption || 0))}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-100">
                  <span>Taxable Income:</span>
                  <span className="font-mono">
                    {formatIndianCurrency(activeRegime.netTaxableIncome ?? activeRegime.taxableIncome ?? 0)}
                  </span>
                </div>
              </div>

              {/* Right Column: Tax Calculation */}
              <div className="space-y-1.5 sm:pl-2">
                <span className="font-bold text-slate-700 block pb-1 border-b border-slate-100 text-[11px] uppercase tracking-wider">
                  Tax Slabs
                </span>
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
                {activeRegime.rebate87A > 0 && (
                  <div className="flex justify-between text-[11px] text-emerald-700 font-semibold">
                    <span>Section 87A Rebate:</span>
                    <span className="font-mono">
                      -{formatIndianCurrency(activeRegime.rebate87A)}
                    </span>
                  </div>
                )}
                {activeRegime.marginalRelief87A > 0 && (
                  <div className="flex justify-between text-[11px] text-emerald-700 font-semibold">
                    <span>Section 87A Marginal Relief:</span>
                    <span className="font-mono">
                      -{formatIndianCurrency(activeRegime.marginalRelief87A)}
                    </span>
                  </div>
                )}
                {activeRegime.netSurcharge > 0 && (
                  <div className="flex justify-between text-[11px] text-amber-800 font-semibold">
                    <span>Surcharge:</span>
                    <span className="font-mono">
                      +{formatIndianCurrency(activeRegime.netSurcharge)}
                    </span>
                  </div>
                )}
                {(activeRegime.cess || activeRegime.healthAndEducationCess) > 0 && (
                  <div className="flex justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                    <span>Health & Education Cess (4%):</span>
                    <span className="font-mono font-semibold text-slate-900">
                      {formatIndianCurrency(activeRegime.cess ?? activeRegime.healthAndEducationCess)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Switch to Advanced Mode Footer */}
          <div className="p-3 bg-slate-100/70 rounded-xl flex items-center justify-between text-xs text-slate-600">
            <span>Need capital gains, business turnover, or all 5 heads?</span>
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
