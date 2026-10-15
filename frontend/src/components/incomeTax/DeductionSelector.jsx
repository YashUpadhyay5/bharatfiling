import React, { useState } from 'react';
import { Award, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DeductionSelector({ deductions, setDeductions, ageCategory }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (field, val) => {
    setDeductions((prev) => ({
      ...prev,
      [field]: val === '' ? '' : Math.max(0, Number(val)),
    }));
  };

  const isSenior = ageCategory === 'senior' || ageCategory === 'superSenior';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/70 text-left transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#111827]">
              Deductions (Chapter VI-A & NPS)
            </h4>
            <p className="text-xs text-slate-500">
              Sections 80C, 80D, 80CCD, 80E, 80G, and 80TTA/TTB
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-emerald-600' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 pt-0 border-t border-slate-100">
          <div className="mb-4 p-3 bg-amber-50/80 rounded-xl border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Tax Regime Rule:</strong> Most Chapter VI-A deductions (80C, 80D, 80E, etc.) are allowable <strong>only under the Old Tax Regime</strong>. Under the New Tax Regime (Section 115BAC), only <strong>Section 80CCD(2)</strong> (Employer's NPS contribution) is permitted.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Section 80C */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Section 80C (PPF, EPF, ELSS, LIC, Tuition)
                </label>
                <span className="text-[10px] font-semibold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                  Old Regime Only (Max 1.5L)
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  max="150000"
                  placeholder="Max ₹1,50,000"
                  value={deductions.sec80C}
                  onChange={(e) => handleChange('sec80C', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Includes Home Loan Principal repayment & Sukanya Samriddhi.
              </p>
            </div>

            {/* Section 80CCD(1B) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Section 80CCD(1B) (NPS Self Contribution)
                </label>
                <span className="text-[10px] font-semibold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                  Old Regime Only (Max 50k)
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  max="50000"
                  placeholder="Max ₹50,000"
                  value={deductions.sec80CCD1B}
                  onChange={(e) => handleChange('sec80CCD1B', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Exclusive additional deduction over and above ₹1.5L of 80C.
              </p>
            </div>

            {/* Section 80CCD(2) - BOTH REGIMES */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Section 80CCD(2) (Employer's NPS)
                </label>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Both Regimes Allowed
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 80000"
                  value={deductions.sec80CCD2}
                  onChange={(e) => handleChange('sec80CCD2', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-emerald-700 font-medium">
                Up to 10% of Basic + DA (14% for Central/State Govt employees).
              </p>
            </div>

            {/* Section 80D */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Section 80D (Health Insurance Premium)
                </label>
                <span className="text-[10px] font-semibold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                  Old Regime Only (Max 1L)
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  max="100000"
                  placeholder="e.g. 50000"
                  value={deductions.sec80D}
                  onChange={(e) => handleChange('sec80D', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Self/Family ₹25k (₹50k if senior) + Parents ₹25k (₹50k if senior).
              </p>
            </div>

            {/* Section 80E */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Section 80E (Education Loan Interest)
                </label>
                <span className="text-[10px] font-semibold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                  Old Regime Only
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="Actual interest paid"
                  value={deductions.sec80E}
                  onChange={(e) => handleChange('sec80E', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                No upper ceiling limit; available for up to 8 consecutive years.
              </p>
            </div>

            {/* Section 80G */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Section 80G (Eligible Donations)
                </label>
                <span className="text-[10px] font-semibold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                  Old Regime Only
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 25000"
                  value={deductions.sec80G}
                  onChange={(e) => handleChange('sec80G', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Donations to PMNRF, recognized relief funds, or approved NGOs.
              </p>
            </div>

            {/* Section 80TTA / 80TTB */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {isSenior ? 'Section 80TTB (Senior Deposit Interest)' : 'Section 80TTA (Savings Interest)'}
                </label>
                <span className="text-[10px] font-semibold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                  Old Regime ({isSenior ? 'Max 50k' : 'Max 10k'})
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  max={isSenior ? '50000' : '10000'}
                  placeholder={isSenior ? 'Max ₹50,000' : 'Max ₹10,000'}
                  value={deductions.sec80TTA_TTB}
                  onChange={(e) => handleChange('sec80TTA_TTB', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
            </div>

            {/* Other Deductions */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Other Deductions (80U, 80DD, 80GGA)
                </label>
                <span className="text-[10px] font-semibold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                  Old Regime Only
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 75000"
                  value={deductions.otherDeductions}
                  onChange={(e) => handleChange('otherDeductions', e.target.value)}
                  className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
