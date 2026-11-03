import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Building2,
  MapPin,
  Briefcase,
} from 'lucide-react';

const INDUSTRY_OPTIONS = [
  'Retail / General Store / Supermarket',
  'E-commerce & Online Selling (Amazon, Flipkart)',
  'Information Technology / Software / Freelancing',
  'Consulting / Legal / Financial Advisory',
  'Manufacturing / Small Industrial Unit',
  'Food & Beverages / Restaurant / Cloud Kitchen',
  'Healthcare / Clinic / Pharmacy / Wellness',
  'Real Estate Brokerage / Construction Services',
  'Logistics / Transport / Courier Services',
  'Education / Coaching / Training Institutes',
  'Textiles / Garments / Fashion Boutique',
  'Digital Marketing / Creative Agency / Media',
  'Import / Export / Wholesale Trading',
  'Automobile Repair / Spares / EV Services',
  'Other Commercial / Service Enterprise',
];

const POPULAR_STATES = [
  { code: 'MH', name: 'Maharashtra' },
  { code: 'DL', name: 'Delhi NCR' },
  { code: 'KA', name: 'Karnataka' },
  { code: 'TN', name: 'Tamil Nadu' },
  { code: 'TS', name: 'Telangana' },
  { code: 'GJ', name: 'Gujarat' },
  { code: 'UP', name: 'Uttar Pradesh' },
  { code: 'WB', name: 'West Bengal' },
  { code: 'RJ', name: 'Rajasthan' },
  { code: 'HR', name: 'Haryana' },
  { code: 'MP', name: 'Madhya Pradesh' },
  { code: 'KL', name: 'Kerala' },
  { code: 'PB', name: 'Punjab' },
  { code: 'AP', name: 'Andhra Pradesh' },
];

export default function ProprietorshipOnboardingPage({
  formData = {},
  onBack,
  onProceed,
}) {
  // Current onboarding sub-step (1: 1/3, 2: 2/3, 3: 3/3)
  const [subStep, setSubStep] = useState(1);

  // Form values
  const [tradeName, setTradeName] = useState(
    formData.tradeName || formData.firmName || 'yash'
  );
  const [industryType, setIndustryType] = useState(
    formData.industryType || INDUSTRY_OPTIONS[0]
  );
  const [stateName, setStateName] = useState(
    formData.stateName || 'Maharashtra'
  );
  const [businessPlaceType, setBusinessPlaceType] = useState(
    formData.businessPlaceType || 'owned'
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNext = () => {
    if (subStep === 1) {
      setErrors({});
      setSubStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 2) {
      setErrors({});
      setSubStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 3) {
      if (onProceed) {
        onProceed({
          tradeName: tradeName.trim(),
          industryType,
          stateName,
          businessPlaceType,
        });
      }
    }
  };

  const handleSkipName = () => {
    setTradeName('');
    setErrors({});
    setSubStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (subStep > 1) {
      setSubStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-800">
      {/* Decorative Geometric Shapes */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-40">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path
            d="M180 0H120V60H60V120H0V180H180V0Z"
            fill="#E2E8F0"
            fillOpacity="0.5"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-40">
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <path
            d="M0 180H60V120H120V60H180V0H0V180Z"
            fill="#E2E8F0"
            fillOpacity="0.5"
          />
        </svg>
      </div>

      {/* Top back navigation */}
      <div className="w-full max-w-5xl mb-6 flex items-center justify-between relative z-10">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Two-Column Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* LEFT COLUMN: Trust & Credentials */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-4 border border-blue-200/60">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>India's #1 Small Business Platform</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1528] tracking-tight leading-tight mb-2">
              We Register Over 50,000+ Indian Businesses
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-8 leading-relaxed">
              Join thousands of single founders, store owners, and freelancers who
              trust BharatFiling to legitimize their businesses online.
            </p>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Proprietorship Done Within 48 Hours
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Fast Udyam MSME and GST registration with zero manual paperwork.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    24×7 Expert Support
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Our chartered accountants and tax experts guide you on GST,
                    invoicing, and write-offs.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Post-Registration Current Account
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Zero-balance current account assistance with Axis, ICICI, HDFC, and Yes Bank.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Ministry of MSME & GST Council Verified</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Onboarding Step Card */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-1.5">
                <span className="font-black text-base sm:text-lg tracking-wider text-[#002244]">
                  BHARAT<span className="text-amber-500">FILING</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
                  Proprietorship Desk
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Takes less than 1 min
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span>
                  {subStep === 1
                    ? '1/3 complete'
                    : subStep === 2
                    ? '2/3 complete'
                    : '3/3 complete'}
                </span>
                <span className="text-blue-700">
                  {subStep === 1
                    ? 'Proposed Trade Name'
                    : subStep === 2
                    ? 'Industry & Activity'
                    : 'Business Location'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-out rounded-full"
                  style={{
                    width:
                      subStep === 1
                        ? '33%'
                        : subStep === 2
                        ? '66%'
                        : '100%',
                  }}
                />
              </div>
            </div>

            {/* -------------------------------------------------------------
                SUB-STEP 1: Trade Name
            ------------------------------------------------------------- */}
            {subStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B1528] mb-1">
                    Enter your desired business / trade name
                  </h3>
                  <p className="text-xs text-slate-500">
                    This is the name that will appear on your Udyam Certificate,
                    GST Invoice, and Current Bank Account.
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    value={tradeName}
                    onChange={(e) => setTradeName(e.target.value)}
                    placeholder="e.g. Apex Retail Enterprises"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition"
                  />
                  {errors.tradeName && (
                    <p className="text-xs text-red-600 mt-1">{errors.tradeName}</p>
                  )}
                </div>

                {/* Lightbulb Skip Hint */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3">
                  <div className="text-amber-500 mt-0.5 flex-shrink-0">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <span>
                      Still have not finalized the brand name? Don't worry, you
                      can always do this step later!{' '}
                    </span>
                    <button
                      type="button"
                      onClick={handleSkipName}
                      className="font-bold text-blue-800 underline underline-offset-2 hover:text-blue-900 cursor-pointer"
                    >
                      Skip it for now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------
                SUB-STEP 2: Industry / Nature of Business
            ------------------------------------------------------------- */}
            {subStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B1528] mb-1">
                    What is the nature of your business?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select your primary sector to determine applicable NIC codes
                    for MSME Udyam and HSN/SAC codes for GST.
                  </p>
                </div>

                {/* Custom Searchable / Select Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Select Business Sector
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-left text-sm font-medium flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                  >
                    <span className="truncate">{industryType}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg max-h-56 overflow-y-auto py-1">
                      {INDUSTRY_OPTIONS.map((ind, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setIndustryType(ind);
                            setIsDropdownOpen(false);
                          }}
                          className={`px-4 py-2.5 text-xs sm:text-sm hover:bg-blue-50 cursor-pointer transition ${
                            industryType === ind
                              ? 'bg-blue-50/70 font-bold text-blue-800'
                              : 'text-slate-700'
                          }`}
                        >
                          {ind}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Popular badges */}
                <div>
                  <span className="block text-[11px] font-semibold text-slate-500 mb-2">
                    Quick Picks:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'E-commerce & Online Selling',
                      'Retail / General Store',
                      'Consulting / Freelancing',
                      'Information Technology',
                    ].map((badge, bIdx) => (
                      <button
                        key={bIdx}
                        type="button"
                        onClick={() => setIndustryType(badge)}
                        className={`text-xs px-2.5 py-1 rounded-full border transition cursor-pointer ${
                          industryType.includes(badge)
                            ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {badge}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------
                SUB-STEP 3: State & Business Premises Type
            ------------------------------------------------------------- */}
            {subStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B1528] mb-1">
                    Where is your business registered office located?
                  </h3>
                  <p className="text-xs text-slate-500">
                    This determines your state tax jurisdiction and applicable
                    local Shop & Establishment licensing.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Select State / Union Territory
                  </label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition"
                  >
                    {POPULAR_STATES.map((st) => (
                      <option key={st.code} value={st.name}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Type of Business Premises
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                        businessPlaceType === 'owned'
                          ? 'border-blue-600 bg-blue-50/40 text-blue-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="premiseType"
                        value="owned"
                        checked={businessPlaceType === 'owned'}
                        onChange={() => setBusinessPlaceType('owned')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs sm:text-sm">Self-Owned / Family</span>
                    </label>

                    <label
                      className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                        businessPlaceType === 'rented'
                          ? 'border-blue-600 bg-blue-50/40 text-blue-900 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="premiseType"
                        value="rented"
                        checked={businessPlaceType === 'rented'}
                        onChange={() => setBusinessPlaceType('rented')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-xs sm:text-sm">Rented / Leased</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-lg bg-[#002244] hover:bg-[#00172e] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer ml-auto"
            >
              <span>{subStep === 3 ? 'View Plans' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
