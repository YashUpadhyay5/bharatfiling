import React from 'react';
import { Landmark, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';
import { ORGANIZATION_TYPES, MAJOR_ACTIVITIES, INDIAN_STATES } from './constants.js';

export default function EnterpriseDetailsPage({
  formData,
  onInputChange,
  onSubmit,
  onBack,
  isSubmitting,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* 1. Legal Enterprise / Trade Name */}
      <div className="space-y-1">
        <label className="block text-xs font-bold text-[#252B36]">
          Name of Enterprise / Business Trade Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={formData.enterpriseName}
          onChange={(e) => onInputChange('enterpriseName', e.target.value)}
          placeholder="e.g. Yash Agro Tech Solutions"
          className="w-full px-3.5 py-2.5 text-sm font-semibold text-[#252B36] bg-white border border-[#E5E7EB] rounded-lg focus:border-[#155EEF] focus:outline-hidden"
        />
      </div>

      {/* 2. Organization Type & Major Activity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="block text-xs font-bold text-[#252B36]">
            Type of Organization <span className="text-rose-500">*</span>
          </label>
          <select
            value={formData.organizationType}
            onChange={(e) => onInputChange('organizationType', e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#252B36] bg-white border border-[#E5E7EB] rounded-lg focus:border-[#155EEF] focus:outline-hidden"
          >
            {ORGANIZATION_TYPES.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold text-[#252B36]">
            Major Activity of Enterprise <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2">
            {MAJOR_ACTIVITIES.map((act) => (
              <button
                key={act}
                type="button"
                onClick={() => onInputChange('majorActivity', act)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition cursor-pointer ${
                  formData.majorActivity === act
                    ? 'bg-[#155EEF] text-white border-[#155EEF] shadow-xs'
                    : 'bg-white text-[#252B36] border-[#E5E7EB] hover:bg-[#F8F9FB]'
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
        <div className="flex items-center gap-2 text-xs font-bold text-[#252B36] border-b border-[#E5E7EB] pb-1.5">
          <MapPin className="w-4 h-4 text-[#155EEF]" />
          <span>Location of Plant / Unit / Office Address</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={formData.plantAddress}
            onChange={(e) => onInputChange('plantAddress', e.target.value)}
            placeholder="Premises / Street / Unit"
            className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:border-[#155EEF] focus:outline-hidden text-[#252B36]"
          />
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onInputChange('city', e.target.value)}
            placeholder="City / District"
            className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:border-[#155EEF] focus:outline-hidden text-[#252B36]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={formData.state}
            onChange={(e) => onInputChange('state', e.target.value)}
            className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:border-[#155EEF] focus:outline-hidden text-[#252B36] bg-white"
          >
            {INDIAN_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          <input
            type="text"
            maxLength={6}
            value={formData.pincode}
            onChange={(e) => onInputChange('pincode', e.target.value.replace(/\D/g, ''))}
            placeholder="6-Digit PIN Code"
            className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:border-[#155EEF] focus:outline-hidden text-[#252B36]"
          />
        </div>
      </div>

      {/* 4. Bank Account Details for MSME Subsidies / DBT */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-2 text-xs font-bold text-[#252B36] border-b border-[#E5E7EB] pb-1.5">
          <Landmark className="w-4 h-4 text-[#027A48]" />
          <span>Bank Account Details (For Statutory DBT & Registration)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={formData.bankAccountNo}
            onChange={(e) => onInputChange('bankAccountNo', e.target.value.replace(/\D/g, ''))}
            placeholder="Bank Account Number"
            className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:border-[#155EEF] focus:outline-hidden text-[#252B36]"
          />
          <input
            type="text"
            maxLength={11}
            value={formData.bankIfsc}
            onChange={(e) => onInputChange('bankIfsc', e.target.value.toUpperCase().trim())}
            placeholder="IFSC Code (e.g. HDFC0001234)"
            className="w-full px-3 py-2 text-xs border border-[#E5E7EB] rounded-lg focus:border-[#155EEF] focus:outline-hidden text-[#252B36] font-mono"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-3 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-lg border border-[#E5E7EB] hover:bg-[#F8F9FB] text-xs font-semibold text-[#667085] flex items-center gap-1.5 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition cursor-pointer disabled:opacity-60"
        >
          <span>{isSubmitting ? 'Generating Order...' : 'Proceed to Checkout'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
