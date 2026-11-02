import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Edit3,
  X,
  Check,
  Tag,
} from 'lucide-react';

export const PUBLIC_COMPANY_PLANS_FOR_PREBUNDLE = [
  {
    id: 'starter_public_ltd',
    name: 'Starter',
    tagline: 'Best for enterprise founders who need structured name reservation, MoA & AoA drafting, and legal documentation guidance',
    originalPrice: 16999,
    discountAmount: 7000,
    price: 9999,
    govtFeeNote: '+ Govt. Fee',
    recommended: false,
    features: [
      'Public Company Name Availability Search & RUN Guidance',
      'Electronic MoA (INC-33) with public object clauses',
      'Articles of Association (INC-34) drafting for 7+ members',
      'Form INC-9 & statutory declarations preparation',
    ],
  },
  {
    id: 'standard_public_ltd',
    name: 'Standard',
    tagline: 'Complete end-to-end incorporation with 3 DSCs, 3 DINs, SPICe+ Part A & B, CoI, CIN, PAN, TAN & Bank Account',
    originalPrice: 34999,
    discountAmount: 10000,
    price: 24999,
    govtFeeNote: '+ Govt. Fee',
    recommended: true,
    features: [
      'Everything in Starter package',
      '3 Class 3 Digital Signature Certificates (DSC) with USB tokens',
      '3 Director Identification Numbers (DIN)',
      'Certificate of Incorporation (COI) with 21-digit CIN',
      'Corporate PAN and TAN allotment',
      'EPFO, ESIC and Profession Tax registrations',
      'Zero-balance Corporate Current Account opening assistance',
    ],
  },
  {
    id: 'all_inclusive_growth',
    name: 'Complete Corporate Suite',
    tagline: 'Full corporate launchpad with GST, MSME Udyam, Trademark Search, Statutory Registers & 1st Year Compliance',
    originalPrice: 59999,
    discountAmount: 20000,
    price: 39999,
    govtFeeNote: '+ Govt. Fee',
    recommended: false,
    features: [
      'Everything in Standard package',
      'GST Registration for the new Public Limited Company',
      'MSME / Udyam Registration Certificate',
      'Statutory Registers (MGT-1, MGT-2) & Share Certificates drafting',
      'Filing of Form INC-20A (Commencement of Business certificate)',
      '1 Year Dedicated Company Secretary (CS) Advisory helpline',
    ],
  },
];

export default function PublicCompanyPreBundlePage({
  formData = {},
  onBack,
  onProceed,
}) {
  // Determine initially selected plan (defaults to standard matching ₹24,999 in catalog)
  const initialPlanId = formData.packageId || 'standard_public_ltd';
  const initialPlan =
    PUBLIC_COMPANY_PLANS_FOR_PREBUNDLE.find((p) => p.id === initialPlanId) ||
    PUBLIC_COMPANY_PLANS_FOR_PREBUNDLE[1];

  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);

  const handleSelectPlanOption = (plan) => {
    setSelectedPlan(plan);
    setIsChangeModalOpen(false);
  };

  const handleNext = () => {
    if (onProceed) {
      onProceed(selectedPlan);
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
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Business Questionnaire</span>
        </button>
        <div className="text-xs text-slate-400 font-medium">
          Public Limited Registration • Plan Confirmation
        </div>
      </div>

      {/* Main Centered 2-Column Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
        {/* LEFT COLUMN: Trust Value Propositions */}
        <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 bg-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-[28px] font-bold text-slate-800 leading-snug tracking-tight">
                <span className="text-slate-900 font-extrabold">5 Lakh+</span> Businesses Registered
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                10% of all Indian businesses register with us
              </p>
            </div>

            {/* 3 Value bullets */}
            <div className="space-y-5 pt-3">
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Company Registration in under 7 days
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Expand your business without having to wait
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    24x7 expert support
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Minimize challenges &amp; maximize productivity
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    100% online process
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                    Start business from the comfort of your home
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex items-center gap-2 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>ISO 27001 Certified • Bank-Grade 256-Bit SSL Security</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Plan Confirmation */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-7">
            {/* Logo Badge */}
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD200] text-slate-950 font-black text-xs tracking-wider uppercase shadow-2xs">
                <span>VAKIL</span>
                <span className="font-semibold text-slate-900">SEARCH</span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                Selected plan for Public Limited Registration
              </h3>
            </div>

            {/* Selected Plan Box */}
            <div className="rounded-xl border border-slate-400 p-6 sm:p-7 bg-white relative shadow-2xs hover:border-slate-500 transition">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {selectedPlan.name}
                </h4>

                <button
                  type="button"
                  onClick={() => setIsChangeModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-400 hover:border-slate-700 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white shadow-2xs transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Change plan</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-2.5 max-w-md">
                {selectedPlan.tagline}
              </p>

              <div className="mt-5 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-rose-500 line-through font-medium">
                    ₹{selectedPlan.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    <Tag className="w-3 h-3 text-emerald-600" />
                    <span>₹{selectedPlan.discountAmount.toLocaleString('en-IN')} off</span>
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    ₹{selectedPlan.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {selectedPlan.govtFeeNote}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-8 mt-6 flex items-center justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center justify-center gap-2 px-9 py-2.5 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white text-sm font-semibold shadow-sm hover:shadow transition cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Change Plan Modal */}
      {isChangeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Select Public Limited Registration Plan
                </h3>
                <p className="text-xs text-slate-500">
                  Choose the plan that fits your corporate capital structure
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsChangeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {PUBLIC_COMPANY_PLANS_FOR_PREBUNDLE.map((plan) => {
                const isSelected = selectedPlan.id === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectPlanOption(plan)}
                    className={`p-5 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'border-[#002B49] bg-blue-50/40 ring-1 ring-[#002B49]'
                        : 'border-slate-200 hover:border-slate-400 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900">
                            {plan.name}
                          </h4>
                          {plan.recommended && (
                            <span className="text-[10px] uppercase tracking-wide bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 font-medium mt-1">
                          {plan.tagline}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-[11px] text-rose-500 line-through">
                          ₹{plan.originalPrice.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xl font-extrabold text-slate-900">
                          ₹{plan.price.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {plan.govtFeeNote}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> ₹{plan.discountAmount.toLocaleString('en-IN')} Discount Applied
                      </span>
                      <button
                        type="button"
                        className={`px-3 py-1 rounded text-xs font-bold transition ${
                          isSelected
                            ? 'bg-[#002B49] text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Choose Plan'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
