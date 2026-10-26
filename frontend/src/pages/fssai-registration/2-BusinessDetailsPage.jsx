import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Utensils,
  Factory,
  Store,
  Truck,
  ChefHat,
  Globe2,
  Building2,
  Calendar,
  MapPin,
  HelpCircle,
  FileCheck,
} from 'lucide-react';
import {
  FOOD_BUSINESS_TYPES,
  TURNOVER_BRACKETS,
  VALIDITY_PERIODS,
} from './constants.js';

export default function BusinessDetailsPage({
  formData = {},
  onInputChange,
  onBack,
  onSubmit,
  isSubmitting = false,
}) {
  // Selected category / business type
  const [businessType, setBusinessType] = useState(
    formData.businessType || 'restaurant_cloud_kitchen'
  );

  // Turnover Bracket
  const [turnover, setTurnover] = useState(
    formData.turnover || 'under_12_lakh'
  );

  // Validity Period (1 to 5 years)
  const [validityYears, setValidityYears] = useState(
    formData.validityYears || 1
  );

  // Business Name
  const [businessName, setBusinessName] = useState(
    formData.businessName || ''
  );

  // Operating Premises
  const [premiseType, setPremiseType] = useState(
    formData.premiseType || 'rented'
  );

  const [address, setAddress] = useState(
    formData.address || ''
  );

  const [stateName, setStateName] = useState(
    formData.stateName || 'Maharashtra'
  );

  const [foodCategory, setFoodCategory] = useState(
    formData.foodCategory || 'Ready-to-eat savouries & meals'
  );

  const handleTypeSelect = (typeId) => {
    setBusinessType(typeId);
    if (onInputChange) {
      onInputChange('businessType', typeId);
    }
  };

  const handleTurnoverSelect = (tId) => {
    setTurnover(tId);
    // Also auto-suggest plan based on turnover
    const matchedBracket = TURNOVER_BRACKETS.find((b) => b.id === tId);
    if (matchedBracket && onInputChange) {
      onInputChange('turnover', tId);
      onInputChange('plan', matchedBracket.recommendedPlan);
    }
  };

  const handleValiditySelect = (years) => {
    setValidityYears(years);
    if (onInputChange) {
      onInputChange('validityYears', years);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (onInputChange) {
      onInputChange('businessName', businessName);
      onInputChange('premiseType', premiseType);
      onInputChange('address', address);
      onInputChange('stateName', stateName);
      onInputChange('foodCategory', foodCategory);
    }
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Top Header Bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6 sm:pb-8 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <img
            src="/bharatfiling-user-logo.png"
            alt="BharatFiling"
            className="h-8 sm:h-9 w-auto object-contain cursor-pointer"
            onClick={onBack}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
            }}
          />
          <span className="text-xs font-semibold text-slate-400">|</span>
          <span className="text-xs font-bold text-[#002B49] uppercase tracking-wider">
            FoSCoS Food Safety Filing Desk
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Step 2 of 4: Business Intake</span>
        </div>
      </header>

      {/* Main 2-Column Container */}
      <main className="max-w-5xl w-full mx-auto my-auto py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Questionnaire Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
            
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0052CC] bg-blue-50 px-2.5 py-1 rounded-md mb-2">
                Section A • Activity Classification
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#002B49] tracking-tight">
                Tell us about your Food Business
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                FoSCoS classifies applications by business category and installed processing capacity.
              </p>
            </div>

            {/* Q1: Business Activity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                1. Select Your Primary Food Operation:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FOOD_BUSINESS_TYPES.map((biz) => {
                  const isSelected = businessType === biz.id;
                  const Icon = 
                    biz.icon === 'Utensils' ? Utensils :
                    biz.icon === 'Factory' ? Factory :
                    biz.icon === 'Store' ? Store :
                    biz.icon === 'Truck' ? Truck :
                    biz.icon === 'ChefHat' ? ChefHat : Globe2;

                  return (
                    <button
                      key={biz.id}
                      type="button"
                      onClick={() => handleTypeSelect(biz.id)}
                      className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-[#002B49] bg-blue-50/50 ring-2 ring-[#002B49]/10'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#002B49] text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                          {biz.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-snug">
                          {biz.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q2: Annual Turnover Slab */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                2. Estimated Annual Turnover (Determines Form A vs Form B):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TURNOVER_BRACKETS.map((tb) => {
                  const isSelected = turnover === tb.id;
                  return (
                    <button
                      key={tb.id}
                      type="button"
                      onClick={() => handleTurnoverSelect(tb.id)}
                      className={`p-3.5 rounded-xl border text-left transition flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#002B49] bg-blue-50/50 ring-2 ring-[#002B49]/10'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs sm:text-sm font-bold text-slate-900">
                            {tb.label}
                          </p>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[#002B49]" />
                          )}
                        </div>
                        <p className="text-[11px] font-semibold text-[#0052CC]">
                          {tb.licenseType}
                        </p>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 font-mono">
                        {tb.feeHint}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q3: Validity Period (1 - 5 Years) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                3. License Validity Duration:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {VALIDITY_PERIODS.map((vp) => {
                  const isSelected = validityYears === vp.years;
                  return (
                    <button
                      key={vp.years}
                      type="button"
                      onClick={() => handleValiditySelect(vp.years)}
                      className={`p-3 rounded-xl border text-center transition cursor-pointer relative ${
                        isSelected
                          ? 'border-[#002B49] bg-blue-50/50 ring-2 ring-[#002B49]/10 font-bold'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <p className="text-xs sm:text-sm font-bold text-slate-900">
                        {vp.label}
                      </p>
                      {vp.discount && (
                        <p className="text-[10px] text-emerald-700 font-semibold mt-1">
                          {vp.discount}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q4: Business Details Form Fields */}
            <div className="pt-4 border-t border-slate-100 space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                4. Operating Unit &amp; Premises Details:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Business / Brand / Trade Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Taste Cloud Kitchen"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Operating State *
                  </label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#002B49] bg-white"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi (NCR)</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Telangana">Telangana</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Operating Unit Full Address (As per Electricity Bill) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Shop / Unit No., Building Name, Street, Landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Premises Status
                  </label>
                  <div className="flex gap-4 pt-1">
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="premiseType"
                        value="rented"
                        checked={premiseType === 'rented'}
                        onChange={() => setPremiseType('rented')}
                        className="text-[#002B49] focus:ring-[#002B49]"
                      />
                      <span>Rented Premises</span>
                    </label>
                    <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                      <input
                        type="radio"
                        name="premiseType"
                        value="owned"
                        checked={premiseType === 'owned'}
                        onChange={() => setPremiseType('owned')}
                        className="text-[#002B49] focus:ring-[#002B49]"
                      />
                      <span>Self-Owned</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Food Category Highlights
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bakery, Sweets, Prepared Food, Beverages"
                    value={foodCategory}
                    onChange={(e) => setFoodCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Overview</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white text-xs sm:text-sm font-bold transition shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Continue to Plan Selection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Statutory Summary & Trust Card */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Statutory Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Type:</span>
                  <span className="font-semibold text-slate-800 text-right capitalize">
                    {businessType.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Turnover Bracket:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {TURNOVER_BRACKETS.find(b => b.id === turnover)?.label || 'Under ₹12L'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Validity:</span>
                  <span className="font-semibold text-emerald-700">
                    {validityYears} {validityYears === 1 ? 'Year' : 'Years'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">Government Portal:</span>
                  <span className="font-mono text-slate-800">FoSCoS Central</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-[11px] text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Our food law advisors will inspect your premises proof and draft the mandatory Food Safety declaration.
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-[#002B49] text-white rounded-2xl p-6 shadow-md space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-amber-300" />
              </div>
              <h4 className="text-base font-bold">100% Approval Guarantee</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                If the food safety department raises any scrutiny query or clarification regarding your premises, our legal team answers it with no extra drafting fees.
              </p>
            </div>

          </div>

        </form>
      </main>

      {/* Footer minimal info */}
      <footer className="max-w-6xl w-full mx-auto text-center py-4 text-xs text-slate-400">
        © BharatFiling Statutory Facilitation Desk • ISO 27001 Certified System
      </footer>

    </div>
  );
}
