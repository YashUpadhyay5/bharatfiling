import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { INDIAN_STATES, BUSINESS_NATURES, PROPERTY_TYPES, GST_APPLY_REASONS } from './constants.js';
import SplitGradientButton from '../../components/common/SplitGradientButton.jsx';

export default function BusinessJurisdictionPage({
  formData,
  onInputChange,
  onBack,
  onSubmit,
  isSubmitting,
}) {
  const selectedReasons = formData.applyReasons || [];

  const toggleReason = (reason) => {
    const next = selectedReasons.includes(reason)
      ? selectedReasons.filter((r) => r !== reason)
      : [...selectedReasons, reason];
    onInputChange('applyReasons', next);
  };

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

      {/* Property Type Dropdown */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          What is the type of property where your office is located? <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            value={formData.propertyType || ''}
            onChange={(e) => onInputChange('propertyType', e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#111827]/30 focus:border-[#111827] transition appearance-none cursor-pointer"
          >
            <option value="" disabled>
              Select option
            </option>
            {PROPERTY_TYPES.map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            ▼
          </div>
        </div>
      </div>

      {/* Why are you applying — multi-select checkboxes */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">
          Why are you applying for GST Registration?
        </label>
        <div className="space-y-2">
          {GST_APPLY_REASONS.map((reason) => (
            <label
              key={reason}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedReasons.includes(reason)}
                onChange={() => toggleReason(reason)}
                className="w-4 h-4 rounded border-slate-300 text-[#111827] focus:ring-[#111827]/30 shrink-0"
              />
              <span className="text-xs font-medium text-slate-700">{reason}</span>
            </label>
          ))}
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

        <SplitGradientButton
          type="submit"
          label="Get a Quote"
          loading={isSubmitting}
          loadingText="Generating Quotation..."
          className="flex-1"
        />
      </div>
    </form>
  );
}
