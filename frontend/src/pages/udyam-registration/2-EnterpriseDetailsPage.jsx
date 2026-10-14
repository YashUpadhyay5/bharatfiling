import React from 'react';
import { Building2, Landmark, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { ORGANIZATION_TYPES, MAJOR_ACTIVITIES, INDIAN_STATES } from './constants.js';

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
      <div className="space-y-1">
        <label className="block text-xs font-bold text-slate-700">
          Name of Enterprise / Business Trade Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={formData.enterpriseName}
          onChange={(e) => onInputChange('enterpriseName', e.target.value)}
          placeholder="e.g. Yash Agro Tech Solutions"
          className="w-full px-4 py-2.5 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* 2. Organization Type & Major Activity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">
            Type of Organization <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.organizationType}
            onChange={(e) => onInputChange('organizationType', e.target.value)}
            className="w-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
          >
            {ORGANIZATION_TYPES.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700">
            Major Activity of Enterprise <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2">
            {MAJOR_ACTIVITIES.map((act) => (
              <button
                key={act}
                type="button"
                onClick={() => onInputChange('majorActivity', act)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                  formData.majorActivity === act
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {act}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Official Plant / Unit Address */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-200 pb-1.5">
          <MapPin className="w-4 h-4 text-rose-500" />
          <span>Location of Plant / Unit / Office Address</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={formData.plantAddress}
            onChange={(e) => onInputChange('plantAddress', e.target.value)}
            placeholder="Flat / Door / Block No. & Premises"
            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
          />
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            placeholder="City / Village / Town"
            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={formData.state}
            onChange={(e) => onInputChange('state', e.target.value)}
            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800 bg-white"
          >
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={formData.pincode}
            onChange={(e) => onInputChange('pincode', e.target.value.replace(/\D/g, ''))}
            placeholder="6-Digit PIN Code"
            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
          />
        </div>
      </div>

      {/* 4. Bank Account Details for MSME Subsidies / DBT */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-200 pb-1.5">
          <Landmark className="w-4 h-4 text-emerald-600" />
          <span>Bank Account Details (For MSME DBT & Priority Lending)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={formData.bankAccountNo}
            onChange={(e) => onInputChange('bankAccountNo', e.target.value.replace(/\D/g, ''))}
            placeholder="Bank Account Number"
            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800"
          />
          <input
            type="text"
            maxLength={11}
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck="false"
            value={formData.bankIfsc}
            onChange={(e) => onInputChange('bankIfsc', e.target.value.toUpperCase().trim())}
            placeholder="IFSC Code (e.g. HDFC0001234)"
            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none text-slate-800 font-mono"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-60"
        >
          <span>{isSubmitting ? 'Generating Order...' : 'Proceed to Checkout'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
