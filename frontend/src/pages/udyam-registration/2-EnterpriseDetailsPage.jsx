import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, ArrowLeft, Check, ShieldCheck, Building2 } from 'lucide-react';
import {
  ORGANIZATION_TYPES,
  MAJOR_ACTIVITIES,
  INDIAN_STATES,
} from './constants.js';

export default function EnterpriseDetailsPage({
  formData,
  onInputChange,
  onBack,
  onSubmit,
  isSubmitting,
}) {
  // Validate PAN format (10 chars)
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

  return (
    <div className="min-h-screen bg-[#F5F7F8] font-sans pb-16">
      {/* Top Header Bar with BharatFiling Logo */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ministry of MSME Statutory Filing Desk</span>
          </div>
        </div>
      </header>

      {/* Main 2-Column Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: MSME Benefits & Trust */}
          <div className="lg:col-span-6 p-4 sm:p-8 flex flex-col justify-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold w-fit">
                Step 2 of 4: Business Classification
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#042D50] tracking-tight leading-[1.25]">
                Enter Your Business Details{' '}
                <span className="text-[#94A3B8] font-normal block sm:inline">for Udyam Certificate</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                Our Chartered Accountants review and map your business to statutory National Industrial Classification (NIC) codes.
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    Collateral-Free Bank Loans
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Access priority lending under MUDRA, Stand-Up India, and CGTMSE schemes with lower interest rates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    50% Trademark &amp; Patent Subsidy
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Save thousands on brand and IP statutory government fees with valid MSME registration.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    Protection Against Delayed Payments
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    Statutory claim rights under MSMED Act with compound interest on delayed buyer invoices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Card Questionnaire */}
          <div className="lg:col-span-6">
            <div className="w-full max-w-[460px] mx-auto bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.08)] border border-slate-100 p-6 sm:p-8 relative">
              
              {/* Brand Logo inside Card Header */}
              <div className="flex items-center justify-center mb-6">
                <img
                  src="/bharatfiling-user-logo.png"
                  alt="BharatFiling"
                  className="h-7 sm:h-8 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
                  }}
                />
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                {/* Enterprise Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-900">
                    Enterprise / Firm Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.enterpriseName || ''}
                    onChange={(e) => onInputChange('enterpriseName', e.target.value)}
                    placeholder="e.g. EcoWellness Enterprises"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition"
                  />
                </div>

                {/* Organization Type */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-900">
                    Type of Organization <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.organizationType || 'Proprietorship'}
                      onChange={(e) => onInputChange('organizationType', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition appearance-none cursor-pointer"
                    >
                      {ORGANIZATION_TYPES.map((ot) => (
                        <option key={ot} value={ot}>
                          {ot}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Major Activity */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-900">
                    Major Activity <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {MAJOR_ACTIVITIES.map((act) => {
                      const isSelected = (formData.majorActivity || 'Services') === act;
                      return (
                        <button
                          key={act}
                          type="button"
                          onClick={() => onInputChange('majorActivity', act)}
                          className={`py-2 px-1 text-center rounded-lg border text-xs font-bold transition cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {act}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* PAN Number */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-900">
                    PAN of Business / Proprietor <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={10}
                      autoCapitalize="characters"
                      value={formData.pan || ''}
                      onChange={(e) => onInputChange('pan', e.target.value.toUpperCase().trim())}
                      placeholder="e.g. ABCDE1234F"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold tracking-wider uppercase focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition"
                    />
                    {isPanValid && (
                      <div className="absolute right-3 top-2.5 text-emerald-600">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Aadhaar Number */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-900">
                    12-Digit Aadhaar of Proprietor/Partner <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      maxLength={12}
                      value={formData.aadhaar || ''}
                      onChange={(e) => onInputChange('aadhaar', e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 987654321012"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold tracking-wider focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition"
                    />
                    {isAadhaarValid && (
                      <div className="absolute right-3 top-2.5 text-emerald-600">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* State Dropdown */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-900">
                    State / UT of Business Location <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.state || 'Karnataka'}
                      onChange={(e) => onInputChange('state', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400 transition appearance-none cursor-pointer"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Actions: Back and Next buttons */}
                <div className="pt-3 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

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
          </div>

        </div>
      </div>
    </div>
  );
}
