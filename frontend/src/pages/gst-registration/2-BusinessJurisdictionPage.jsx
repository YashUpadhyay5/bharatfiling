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
    <form onSubmit={onSubmit} className="space-y-4">
      {/* State / UT Dropdown */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[#252B36]">
          State / UT <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            value={formData.state}
            onChange={(e) => onInputChange('state', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E7EB] text-[#252B36] text-sm font-medium focus:outline-hidden focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] transition appearance-none cursor-pointer"
          >
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#667085] text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Nature of Business Dropdown */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-[#252B36]">
          Nature of Business <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            value={formData.businessType}
            onChange={(e) => onInputChange('businessType', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E7EB] text-[#252B36] text-sm font-medium focus:outline-hidden focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] transition appearance-none cursor-pointer"
          >
            {BUSINESS_NATURES.map((bn) => (
              <option key={bn} value={bn}>
                {bn}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#667085] text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Actions: Back Button & Get a Quote CTA */}
      <div className="pt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="py-2.5 px-3.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F8F9FB] text-[#667085] font-semibold text-sm transition cursor-pointer"
          title="Back to Step 1"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3 px-6 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
        >
          {isSubmitting ? (
            <span>Generating Quotation...</span>
          ) : (
            <>
              <span>Get Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
