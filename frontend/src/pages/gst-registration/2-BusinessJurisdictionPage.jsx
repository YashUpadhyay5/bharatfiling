import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { INDIAN_STATES, BUSINESS_NATURES } from './constants.js';

export default function BusinessJurisdictionPage({
  formData,
  onInputChange,
  onBack,
  onSubmit,
  isSubmitting,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* State / UT Dropdown */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          State / UT <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            value={formData.state}
            onChange={(e) => onInputChange('state', e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#111827]/30 focus:border-[#111827] transition appearance-none cursor-pointer"
          >
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            ▼
          </div>
        </div>
      </div>

      {/* Nature of Business Dropdown */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          Nature of Business <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            value={formData.businessType}
            onChange={(e) => onInputChange('businessType', e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#111827]/30 focus:border-[#111827] transition appearance-none cursor-pointer"
          >
            {BUSINESS_NATURES.map((bn) => (
              <option key={bn} value={bn}>
                {bn}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            ▼
          </div>
        </div>
      </div>

      {/* Actions: Back Button & Get a Quote CTA */}
      <div className="pt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="py-3.5 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm transition cursor-pointer"
          title="Back to Step 1"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#4F46E5] hover:to-[#9333EA] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
        >
          {isSubmitting ? (
            <span>Generating Quotation...</span>
          ) : (
            <>
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
