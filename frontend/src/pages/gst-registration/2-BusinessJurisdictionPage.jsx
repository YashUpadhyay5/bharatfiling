import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { PROPERTY_TYPES, GST_APPLY_REASONS, INDIAN_STATES, BUSINESS_NATURES } from './constants.js';

export default function BusinessJurisdictionPage({
  formData,
  panAuth,
  onInputChange,
  onBack,
  onSubmit,
  isSubmitting,
  showIdentityFields = false,
  isGst = true,
}) {
  const selectedReasons = formData.applyReasons && formData.applyReasons.length > 0
    ? formData.applyReasons
    : ['To Start a New Business'];

  const toggleReason = (reason) => {
    const next = selectedReasons.includes(reason)
      ? selectedReasons.filter((r) => r !== reason)
      : [...selectedReasons, reason];
    onInputChange('applyReasons', next);
  };

  // For GST: Exact 1:1 Clone of the Right Card with BharatFiling Branding
  if (isGst) {
    return (
      <div className="w-full max-w-[420px] mx-auto bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-slate-100 p-6 sm:p-8 relative">
        {/* Subtle scroll arrows indicator on the right edge */}
        <div className="hidden sm:flex flex-col justify-between absolute right-2.5 top-8 bottom-8 text-slate-400/80 pointer-events-none text-[9px] select-none">
          <span>▲</span>
          <span>▼</span>
        </div>

        {/* Top Centered Brand Logo */}
        <div className="flex items-center justify-center mb-6">
          <Link to="/" className="inline-flex items-center select-none" title="BharatFiling">
            <img
              src="/bharatfiling-user-logo.png"
              alt="BharatFiling"
              className="h-8 sm:h-9 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
              }}
            />
          </Link>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Question 1: What Is the Type of Property Where Your Office Is Located? */}
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              What Is the Type of Property Where Your Office Is Located?
            </label>
            <div className="relative">
              <select
                value={formData.propertyType || 'Family Owned Property'}
                onChange={(e) => onInputChange('propertyType', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs sm:text-sm font-normal focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition appearance-none cursor-pointer"
              >
                {PROPERTY_TYPES.map((pt) => (
                  <option key={pt} value={pt}>
                    {pt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Question 2: Why are You Applying for GST Registration? */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              Why are You Applying for GST Registration?
            </label>
            <div className="space-y-2.5">
              {GST_APPLY_REASONS.map((reason) => {
                const isChecked = selectedReasons.includes(reason);
                return (
                  <label
                    key={reason}
                    className="flex items-center gap-3 cursor-pointer group select-none py-0.5"
                  >
                    <div
                      className={`w-4 h-4 rounded-[3px] flex items-center justify-center transition-colors shrink-0 ${
                        isChecked
                          ? 'bg-[#2563EB] border border-[#2563EB] text-white'
                          : 'bg-white border border-slate-300 group-hover:border-slate-400'
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="w-3 h-3 stroke-current stroke-[2.5] fill-none"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleReason(reason)}
                      className="sr-only"
                    />
                    <span className="text-xs sm:text-sm text-slate-700 font-normal leading-normal">
                      {reason}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Action: Next -> button (Right-aligned, Navy Blue) */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-md bg-[#022B50] hover:bg-[#073866] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-98 transition disabled:opacity-70 cursor-pointer"
            >
              <span>{isSubmitting ? 'Processing...' : 'Next'}</span>
              <span className="text-base leading-none">&rarr;</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Fallback for non-GST services (Company, ITR, Trademark)
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

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-md bg-[#022B50] hover:bg-[#073866] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-98 transition disabled:opacity-70 cursor-pointer"
        >
          <span>{isSubmitting ? 'Processing...' : 'Next'}</span>
          <span className="text-base leading-none">&rarr;</span>
        </button>
      </div>
    </form>
  );
}
