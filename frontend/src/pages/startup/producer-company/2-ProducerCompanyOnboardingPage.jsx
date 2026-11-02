import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lightbulb,
  Sprout,
} from 'lucide-react';

const BUSINESS_AGE_OPTIONS = [
  { id: 'not_started', label: 'Not yet started' },
  { id: 'less_than_1', label: 'Less than 1 year' },
  { id: '1_to_2', label: '1 - 2 years' },
  { id: '2_plus', label: '2+ years' },
];

const PRODUCER_ACTIVITIES = [
  { id: 'farming', label: 'Agriculture & Crops (Grains, Pulses, Oilseeds)' },
  { id: 'dairy', label: 'Dairy & Milk Producers' },
  { id: 'horticulture', label: 'Horticulture, Fruits & Vegetables' },
  { id: 'fisheries', label: 'Fisheries & Aquaculture' },
  { id: 'artisans', label: 'Artisans, Handloom & Forest Produce' },
];

export default function ProducerCompanyOnboardingPage({
  formData = {},
  onBack,
  onProceed,
}) {
  // Current onboarding sub-step (1: 1/2 complete, 2: 2/2 complete)
  const [subStep, setSubStep] = useState(1);

  // Form values
  const [companyName, setCompanyName] = useState(
    formData.proposedCompanyName || 'krishisamriddhi'
  );
  const [businessAge, setBusinessAge] = useState(
    formData.businessAge || 'Less than 1 year'
  );
  const [producerActivity, setProducerActivity] = useState(
    formData.producerActivity || 'farming'
  );

  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (subStep === 1) {
      setErrors({});
      setSubStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (subStep === 2) {
      if (!businessAge) {
        setErrors({ businessAge: 'Please select how old your business or group is' });
        return;
      }
      if (onProceed) {
        onProceed({
          proposedCompanyName: companyName.trim(),
          businessAge,
          producerActivity,
        });
      }
    }
  };

  const handleSkipName = () => {
    setCompanyName('');
    setErrors({});
    setSubStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (subStep === 2) {
      setSubStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans text-slate-800">
      {/* Decorative Stepped Geometric Corners */}
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
          <span>Back to Producer Company Overview</span>
        </button>
      </div>

      {/* Main Two-Column Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* LEFT COLUMN: Trust & Credentials */}
        <div className="lg:col-span-5 p-8 sm:p-10 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-4 border border-emerald-200/60">
              <Sprout className="w-3.5 h-3.5 text-emerald-600" />
              <span>Agri-Business & FPO Specialization</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1528] tracking-tight leading-tight mb-2">
              10,000+ FPOs & Agri-Enterprises Formed
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-8 leading-relaxed">
              Join thousands of farmers, dairy federations, and agribusiness
              founders who trust BharatFiling to scale their collective power.
            </p>

            <div className="space-y-6">
              {/* Point 1 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    Producer Company done within 15–20 days
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Fast ROC filing with 5 DSCs, 5 DINs, and Chapter XXIA compliant MoA/AoA.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    24×7 Expert Support
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    Our agricultural law and corporate professionals are available around the clock to guide you at every step.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    SFAC & NABARD Grant Assistance
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                    From 100% tax exemption under Sec 80PA to SFAC ₹15 Lakhs equity grant prep, we are with you post-incorporation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Ministry of Corporate Affairs (MCA) SPICe+ Certified</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Onboarding Step Card */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Header / Brand logo */}
            <div className="flex items-center justify-between mb-6">
              <div className="inline-flex items-center gap-1.5">
                <span className="font-black text-base sm:text-lg tracking-wider text-[#002244]">
                  BHARAT<span className="text-amber-500">FILING</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
                  FPO Desk
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Takes less than 1 min
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span>{subStep === 1 ? '1/2 complete' : '2/2 complete'}</span>
                <span className="text-emerald-700">
                  {subStep === 1 ? 'Step 1 of 2' : 'Final Step'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300 ease-out rounded-full"
                  style={{ width: subStep === 1 ? '50%' : '100%' }}
                />
              </div>
            </div>

            {/* -------------------------------------------------------------
                SUB-STEP 1: Desired Company Name
            ------------------------------------------------------------- */}
            {subStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B1528] mb-1">
                    Enter your desired producer company name
                  </h3>
                  <p className="text-xs text-slate-500">
                    Propose your primary name. Note: The name will officially end
                    with{' '}
                    <span className="font-semibold text-slate-700">
                      "Producer Company Limited"
                    </span>
                    .
                  </p>
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. KrishiSamriddhi"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 transition"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-xs font-semibold text-slate-400">
                      Producer Company Limited
                    </div>
                  </div>
                  {errors.companyName && (
                    <p className="text-xs text-red-600 mt-1">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                {/* Lightbulb Skip Tip */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3">
                  <div className="text-amber-500 mt-0.5 flex-shrink-0">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <span>
                      Still have not finalized the name? Don’t worry, you can
                      always do this step later!{' '}
                    </span>
                    <button
                      type="button"
                      onClick={handleSkipName}
                      className="font-bold text-emerald-800 underline underline-offset-2 hover:text-emerald-900 cursor-pointer"
                    >
                      Skip it for now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------------
                SUB-STEP 2: Business Age 2x2 Grid & Activity
            ------------------------------------------------------------- */}
            {subStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0B1528] mb-1">
                    How old is your farming group or business?
                  </h3>
                  <p className="text-xs text-slate-500">
                    This helps us structure your initial authorized capital and
                    determine SFAC / NABARD scheme eligibility.
                  </p>
                </div>

                {/* 2x2 Radio Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {BUSINESS_AGE_OPTIONS.map((opt) => {
                    const isSelected = businessAge === opt.label;
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="businessAge"
                          value={opt.label}
                          checked={isSelected}
                          onChange={() => {
                            setBusinessAge(opt.label);
                            setErrors({});
                          }}
                          className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm font-semibold text-slate-800">
                          {opt.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.businessAge && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.businessAge}
                  </p>
                )}

                {/* Primary Activity Field */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Primary Producer Category
                  </label>
                  <select
                    value={producerActivity}
                    onChange={(e) => setProducerActivity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 transition"
                  >
                    {PRODUCER_ACTIVITIES.map((act) => (
                      <option key={act.id} value={act.id}>
                        {act.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
            {subStep === 2 ? (
              <button
                type="button"
                onClick={() => setSubStep(1)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-lg bg-[#002244] hover:bg-[#00172e] text-white text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer ml-auto"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
