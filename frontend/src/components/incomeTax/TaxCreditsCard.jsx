import React, { useState } from 'react';
import { CreditCard, ChevronDown } from 'lucide-react';

export default function TaxCreditsCard({ taxCredits, setTaxCredits }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (field, val) => {
    setTaxCredits((prev) => ({
      ...prev,
      [field]: val === '' ? '' : Math.max(0, Number(val)),
    }));
  };

  const totalCredits =
    (Number(taxCredits.tdsSalary) || 0) +
    (Number(taxCredits.tdsOther) || 0) +
    (Number(taxCredits.tcs) || 0) +
    (Number(taxCredits.advanceTax) || 0) +
    (Number(taxCredits.selfAssessmentTax) || 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/70 text-left transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#111827]">
              Taxes Paid, TDS & Advance Tax (Optional)
            </h4>
            <p className="text-xs text-slate-500">
              Check your Net Tax Payable or Income Tax Refund Due
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {totalCredits > 0 && (
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
              Paid: ₹{totalCredits.toLocaleString('en-IN')}
            </span>
          )}
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-indigo-600' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              TDS Deducted on Salary (Form 16)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 50000"
                value={taxCredits.tdsSalary}
                onChange={(e) => handleChange('tdsSalary', e.target.value)}
                className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Other TDS / TCS (Form 26AS / AIS)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 12000"
                value={taxCredits.tdsOther}
                onChange={(e) => handleChange('tdsOther', e.target.value)}
                className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Advance Tax Paid
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 30000"
                value={taxCredits.advanceTax}
                onChange={(e) => handleChange('advanceTax', e.target.value)}
                className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Self-Assessment Tax Paid
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                placeholder="e.g. 10000"
                value={taxCredits.selfAssessmentTax}
                onChange={(e) => handleChange('selfAssessmentTax', e.target.value)}
                className="w-full h-11 pl-8 pr-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
