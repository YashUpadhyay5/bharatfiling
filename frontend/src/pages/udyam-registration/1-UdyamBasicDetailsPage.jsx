import React from 'react';
import { Check, Lock } from 'lucide-react';
import { NIC_HIERARCHY } from './constants.js';
import SearchableSelect from '../../components/common/SearchableSelect.jsx';

export default function UdyamBasicDetailsPage({
  formData,
  onInputChange,
  onSubmit,
  isSubmitting,
  isAuthenticated,
  onOpenAuthModal,
}) {
  // Validate PAN/GSTIN format
  const isPanValid =
    formData.pan &&
    (formData.pan.length === 10
      ? /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(formData.pan.trim())
      : formData.pan.length === 15
      ? /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(formData.pan.trim())
      : false);

  // Validate 12-digit Aadhaar format
  const cleanAadhaar = (formData.aadhaar || '').replace(/\D/g, '');
  const isAadhaarValid = cleanAadhaar.length === 12;

  // Selected Division Sub-divisions
  const divisionData = NIC_HIERARCHY[formData.nicDivision];
  const subDivisions = divisionData ? Object.keys(divisionData.subDivisions) : [];
  const subClasses =
    divisionData && formData.nicSubDivision
      ? divisionData.subDivisions[formData.nicSubDivision] || []
      : [];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Auth required alert if not logged in */}
      {!isAuthenticated && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Sign in to save and fast-track your Udyam filing</span>
          </div>
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      )}

      {/* 1. PAN / GSTIN Input with Real-time Checkmark */}
      <div className="space-y-1">
        <div className="relative">
          <input
            type="text"
            maxLength={15}
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck="false"
            value={formData.pan}
            onChange={(e) => onInputChange('pan', e.target.value.toUpperCase().trim())}
            placeholder=" "
            className="peer w-full px-4 pt-5 pb-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
          />
          <label className="absolute left-4 top-1.5 text-[11px] font-semibold text-slate-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-blue-600 pointer-events-none">
            PAN / GSTIN <span className="text-rose-500">*</span>
          </label>
          {isPanValid && (
            <div className="absolute right-3.5 top-3.5 text-emerald-600">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
          )}
        </div>
      </div>

      {/* 2. Aadhaar Number Input with Real-time Checkmark */}
      <div className="space-y-1">
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={12}
            value={formData.aadhaar}
            onChange={(e) => onInputChange('aadhaar', e.target.value.replace(/\D/g, ''))}
            placeholder=" "
            className="peer w-full px-4 pt-5 pb-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
          />
          <label className="absolute left-4 top-1.5 text-[11px] font-semibold text-slate-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-blue-600 pointer-events-none">
            Aadhaar Number <span className="text-rose-500">*</span>
          </label>
          {isAadhaarValid && (
            <div className="absolute right-3.5 top-3.5 text-emerald-600">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
          )}
        </div>
      </div>

      {/* 3. Cascading: NIC Division Dropdown with Search */}
      <SearchableSelect
        label="NIC Division"
        required
        value={formData.nicDivision}
        onChange={(val) => {
          onInputChange('nicDivision', val);
          onInputChange('nicSubDivision', '');
          onInputChange('nicSubClass', '');
        }}
        options={Object.keys(NIC_HIERARCHY)}
        placeholder="Select NIC Division"
        emptyMessage="No matching division found"
      />

      {/* 4. Cascading: NIC Sub-Division Dropdown (unlocked once Division is selected) */}
      {formData.nicDivision && (
        <div className="animate-fade-in">
          <SearchableSelect
            label="NIC Sub-Division"
            required
            value={formData.nicSubDivision}
            onChange={(val) => {
              onInputChange('nicSubDivision', val);
              onInputChange('nicSubClass', '');
            }}
            options={subDivisions}
            placeholder="Select NIC Sub-Division"
            emptyMessage="No matching sub-division found"
          />
        </div>
      )}

      {/* 5. Cascading: NIC Sub-Class Dropdown (unlocked once Sub-Division is selected) */}
      {formData.nicDivision && formData.nicSubDivision && (
        <div className="animate-fade-in">
          <SearchableSelect
            label="NIC Sub-Class"
            required
            value={formData.nicSubClass}
            onChange={(val) => onInputChange('nicSubClass', val)}
            options={subClasses}
            placeholder="Select NIC Sub-Class"
            searchPlaceholder="Search activities..."
            emptyMessage="No matching activities found"
          />
        </div>
      )}

      {/* 6. Action Button: Gradient Purple/Violet Button matching screenshot */}
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#D946EF] hover:from-[#4F46E5] hover:to-[#C026D3] text-white text-sm font-bold shadow-md hover:shadow-lg transition cursor-pointer disabled:opacity-60 text-center"
        >
          {isSubmitting ? 'Submitting...' : 'Get a Quote'}
        </button>
      </div>
    </form>
  );
}
