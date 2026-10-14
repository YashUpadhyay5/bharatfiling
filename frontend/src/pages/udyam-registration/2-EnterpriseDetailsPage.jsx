import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ORGANIZATION_TYPES, MAJOR_ACTIVITIES, INDIAN_STATES } from './constants.js';
import SplitGradientButton from '../../components/common/SplitGradientButton.jsx';

export default function EnterpriseDetailsPage({
  formData,
  onInputChange,
  onSubmit,
  onBack,
  isSubmitting,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5 animate-fade-in">
      {/* 1. Legal Enterprise / Trade Name */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          Name of Enterprise / Business Trade Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={formData.enterpriseName}
          onChange={(e) => onInputChange('enterpriseName', e.target.value)}
          placeholder="e.g. Acme Enterprise / Apex Retail Solutions"
          className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition shadow-xs"
        />
      </div>

      {/* 2. Type of Organization */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          Type of Organization <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            value={formData.organizationType}
            onChange={(e) => onInputChange('organizationType', e.target.value)}
            className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition shadow-xs appearance-none cursor-pointer"
          >
            {ORGANIZATION_TYPES.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* 3. Major Activity of Enterprise (Full-width Segmented Bar) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          Major Activity of Enterprise <span className="text-rose-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100/90 rounded-xl border border-slate-200">
          {MAJOR_ACTIVITIES.map((act) => (
            <button
              key={act}
              type="button"
              onClick={() => onInputChange('majorActivity', act)}
              className={`py-2 text-xs font-bold rounded-lg transition cursor-pointer text-center ${
                formData.majorActivity === act
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Registered Plant / Office Address */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Location of Plant / Registered Office
          </span>
        </div>

        {/* Premises / Flat Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Flat / Door / Block No. & Premises <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.plantAddress}
            onChange={(e) => onInputChange('plantAddress', e.target.value)}
            placeholder="e.g. Plot No. 42, Electronic City, Phase 1"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        {/* City & PIN Code (2 Balanced Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              City / Village / Town <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => onInputChange('city', e.target.value)}
              placeholder="e.g. Bengaluru"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              6-Digit PIN Code <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={formData.pincode}
              onChange={(e) => onInputChange('pincode', e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 560100"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
          </div>
        </div>

        {/* State Dropdown */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            State / Union Territory <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.state}
              onChange={(e) => onInputChange('state', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition appearance-none cursor-pointer"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 text-xs">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bank Account Details (Subsidies & DBT Callout Card) */}
      <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/90 space-y-3">
        <div>
          <p className="text-xs font-bold text-slate-900">Bank Account for MSME Subsidies</p>
          <p className="text-[11px] text-slate-500 font-medium">
            Required by the Ministry of MSME for Direct Benefit Transfer (DBT) and priority lending.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">Account Number</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.bankAccountNo}
              onChange={(e) => onInputChange('bankAccountNo', e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 50100234918231"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">IFSC Code</label>
            <input
              type="text"
              maxLength={11}
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck="false"
              value={formData.bankIfsc}
              onChange={(e) => onInputChange('bankIfsc', e.target.value.toUpperCase().trim())}
              placeholder="e.g. HDFC0001234"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition font-mono"
            />
          </div>
        </div>
      </div>

      {/* 6. Navigation Buttons */}
      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <SplitGradientButton
          type="submit"
          label="Proceed to Checkout"
          loading={isSubmitting}
          loadingText="Generating Order..."
        />
      </div>
    </form>
  );
}
