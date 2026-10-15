import React from 'react';
import { ChevronDown, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import SimplePieChart from '../common/SimplePieChart.jsx';
import { formatIndianCurrency } from '../../utils/hraTaxEngine.js';

export default function HRASimpleCalculatorCard({
  simpleInput,
  handleSimpleChange,
  summary,
  onSwitchToAdvanced,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-5xl mx-auto transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: INPUTS (7 COLS - MATCHING IMAGE 2 & 3) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Tool Selector Dropdown Header */}
          <div className="mb-3">
            <div className="relative inline-block w-full sm:w-64">
              <select
                value="hra"
                disabled
                className="w-full appearance-none px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 bg-white shadow-2xs pr-10 cursor-default"
              >
                <option value="hra">HRA Calculator</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 1. Basic Salary Received */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700">
              Basic Salary Received
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                value={simpleInput.basicSalary}
                onChange={(e) => handleSimpleChange('basicSalary', e.target.value)}
                placeholder="440000"
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          {/* 2. Dearness Allowance (DA) Received */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700">
              Dearness Allowance (DA) Received
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                value={simpleInput.da || ''}
                onChange={(e) => handleSimpleChange('da', e.target.value)}
                placeholder="4000"
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          {/* 3. HRA Received */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700">
              HRA Received
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                value={simpleInput.hraReceived}
                onChange={(e) => handleSimpleChange('hraReceived', e.target.value)}
                placeholder="100000"
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          {/* 4. Total Rent Paid */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700">
              Total Rent Paid
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                value={simpleInput.rentPaid}
                onChange={(e) => handleSimpleChange('rentPaid', e.target.value)}
                placeholder="300000"
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          {/* 5. Metro City Question (Radio Yes / No) */}
          <div className="pt-2">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
              Do You Live In Delhi, Mumbai, Kolkata or Chennai?
            </label>
            <div className="flex items-center gap-6">
              <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 cursor-pointer">
                <input
                  type="radio"
                  name="simpleIsMetro"
                  checked={simpleInput.isMetro === true}
                  onChange={() => handleSimpleChange('isMetro', true)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span>Yes</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 cursor-pointer">
                <input
                  type="radio"
                  name="simpleIsMetro"
                  checked={simpleInput.isMetro === false}
                  onChange={() => handleSimpleChange('isMetro', false)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE RESULTS & PIE CHART (5 COLS - MATCHING IMAGE 2 & 3) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top Result Box: Taxable HRA */}
          <div className="flex items-center justify-between p-3.5 bg-[#F0F6FF] rounded-xl border border-blue-100">
            <span className="text-sm font-semibold text-slate-700">Taxable HRA</span>
            <span className="text-xl sm:text-2xl font-black text-[#002D62] font-mono">
              {formatIndianCurrency(summary.totalTaxableHra)}
            </span>
          </div>

          {/* Chart Card */}
          <div className="bg-[#F8FAFC] rounded-2xl p-5 border border-slate-200/60 flex flex-col items-center">
            {/* Exempted HRA Legend Header */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-200/60 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#002D62]" />
                <span className="font-semibold text-slate-700">Exempted HRA</span>
              </div>
              <span className="font-bold text-[#002D62] font-mono text-sm sm:text-base">
                {formatIndianCurrency(summary.totalExemptHra)}
              </span>
            </div>

            {/* SVG Pie Chart */}
            <div className="my-6">
              <SimplePieChart
                size={180}
                slices={[
                  { label: 'Exempted HRA', value: summary.totalExemptHra, color: '#002D62' },
                  { label: 'Taxable HRA', value: summary.totalTaxableHra, color: '#38BDF8' },
                ]}
              />
            </div>

            {/* Secondary Legend: Taxable HRA (if > 0) */}
            {summary.totalTaxableHra > 0 && (
              <div className="w-full flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
                  <span className="font-semibold text-slate-700">Taxable HRA</span>
                </div>
                <span className="font-bold text-slate-800 font-mono text-sm sm:text-base">
                  {formatIndianCurrency(summary.totalTaxableHra)}
                </span>
              </div>
            )}
          </div>

          {/* Estimated Tax Saved Badge */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Est. Tax Saved (Rule 2A):
            </span>
            <span className="font-mono font-bold text-emerald-700 text-sm">
              {formatIndianCurrency(summary.estimatedTaxSaved)}
            </span>
          </div>

          {/* Switch to Advanced Mode */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onSwitchToAdvanced}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition cursor-pointer"
            >
              <span>Need multi-city periods or mid-year rent changes?</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
