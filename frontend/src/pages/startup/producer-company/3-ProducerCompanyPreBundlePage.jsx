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
  Sprout,
} from 'lucide-react';

export const PRODUCER_COMPANY_PLANS_FOR_PREBUNDLE = [
  {
    id: 'starter_producer_co',
    name: 'Starter FPO Advisory',
    tagline:
      'Ideal for agricultural clusters & NGO promoters needing structured name reservation, farmer verification review, and customized MoA & AoA drafting under Chapter XXIA',
    originalPrice: 15999,
    discountAmount: 6000,
    price: 9999,
    govtFeeNote: '+ Govt. Fee',
    recommended: false,
    features: [
      'Producer Company Name Availability Search & Reservation on MCA RUN',
      'Customized e-MoA (INC-33) drafted strictly per Section 378B objects',
      'Articles of Association (INC-34) with mutual assistance clauses',
      'Form INC-9 declarations & farmer affidavit templates for 10 subscribers',
    ],
  },
  {
    id: 'standard_producer_co',
    name: 'Standard',
    tagline:
      'Complete end-to-end incorporation with 5 DSCs, 5 DINs, SPICe+ Part A & B, CoI, CIN, PAN, TAN & Bank Account',
    originalPrice: 29999,
    discountAmount: 10000,
    price: 19999,
    govtFeeNote: '+ Govt. Fee',
    recommended: true,
    features: [
      'Everything in Starter package',
      '5 Class 3 Digital Signature Certificates (DSC) with USB tokens',
      '5 Director Identification Numbers (DIN)',
      'Certificate of Incorporation (COI) with 21-digit CIN',
      'Corporate PAN and TAN allotment',
      'EPFO and ESIC registrations',
      'Zero-balance Corporate Current Account opening assistance',
    ],
  },
  {
    id: 'fpo_growth_suite',
    name: 'Complete FPO Growth Suite',
    tagline:
      'Full agribusiness launchpad with GST, MSME Udyam, SFAC Equity Grant Application Dossier, NABARD Credit Advisory & 1st Year Compliance',
    originalPrice: 49999,
    discountAmount: 15000,
    price: 34999,
    govtFeeNote: '+ Govt. Fee',
    recommended: false,
    features: [
      'Everything in Standard package',
      'GST Registration for the Producer Company',
      'MSME / Udyam Registration Certificate',
      'SFAC Equity Grant documentation dossier & detailed project template',
      'NABARD Credit Guarantee Scheme compliance advisory',
      'Filing of Form INC-20A (Commencement of Business certificate)',
      '1 Year Dedicated Agri-Business Corporate Secretary helpline',
    ],
  },
];

export default function ProducerCompanyPreBundlePage({
  formData = {},
  onBack,
  onProceed,
}) {
  // Determine initially selected plan (defaults to standard matching ₹19,999 in catalog)
  const initialPlanId = formData.packageId || 'standard_producer_co';
  const initialPlan =
    PRODUCER_COMPANY_PLANS_FOR_PREBUNDLE.find((p) => p.id === initialPlanId) ||
    PRODUCER_COMPANY_PLANS_FOR_PREBUNDLE[1];

  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [isChangePlanModalOpen, setIsChangePlanModalOpen] = useState(false);

  const handleSelectModalPlan = (plan) => {
    setSelectedPlan(plan);
    setIsChangePlanModalOpen(false);
  };

  const handleContinue = () => {
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
      </div>

      {/* Main Two-Column Card Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* LEFT COLUMN: Trust highlights */}
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
              Supporting thousands of farmers and agri-entrepreneurs who trust
              BharatFiling to scale their collective power.
            </p>

            <div className="space-y-6">
              {/* Feature 1 */}
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

              {/* Feature 2 */}
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

              {/* Feature 3 */}
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

        {/* RIGHT COLUMN: Plan Confirmation Box */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Header / Brand logo */}
            <div className="flex items-center justify-between mb-8">
              <div className="inline-flex items-center gap-1.5">
                <span className="font-black text-base sm:text-lg tracking-wider text-[#002244]">
                  BHARAT<span className="text-amber-500">FILING</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded">
                  FPO Desk
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% Guaranteed Filing
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-bold text-[#0B1528] mb-1">
                Selected plan for Producer Company Registration
              </h3>
              <p className="text-xs text-slate-500">
                Review your plan inclusions or switch between Starter, Standard,
                or Complete FPO Growth Suite.
              </p>
            </div>

            {/* Selected Plan Card (1:1 with reference layout) */}
            <div className="border-2 border-emerald-600 rounded-xl p-6 bg-white relative shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <h4 className="text-xl font-extrabold text-slate-900">
                    {selectedPlan.name}
                  </h4>
                  {selectedPlan.recommended && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Change Plan Button */}
                <button
                  type="button"
                  onClick={() => setIsChangePlanModalOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-emerald-700 border border-slate-300 rounded-md px-2.5 py-1 hover:bg-slate-50 transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Change plan</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                {selectedPlan.tagline}
              </p>

              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs text-slate-400 line-through">
                  ₹{selectedPlan.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <Tag className="w-3 h-3" />
                  <span>₹500 off</span>
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#0B1528]">
                  ₹{selectedPlan.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {selectedPlan.govtFeeNote}
                </span>
              </div>

              {/* Feature bullets */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                {selectedPlan.features.slice(0, 4).map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-700"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button: Next -> */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#002244] hover:bg-[#00172e] text-white text-sm font-bold tracking-wide transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          CHANGE PLAN MODAL
      ------------------------------------------------------------- */}
      {isChangePlanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-extrabold text-[#0B1528]">
                  Choose Your Producer Company Plan
                </h3>
                <p className="text-xs text-slate-500">
                  Select the package that fits your FPO's scale and member size
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsChangePlanModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              {PRODUCER_COMPANY_PLANS_FOR_PREBUNDLE.map((plan) => {
                const isCurrent = plan.id === selectedPlan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => handleSelectModalPlan(plan)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isCurrent
                        ? 'border-emerald-600 bg-emerald-50/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {plan.name}
                        </span>
                        {plan.recommended && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2 max-w-md">
                        {plan.tagline}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                      <div className="text-right">
                        <span className="text-base font-extrabold text-[#0B1528] block">
                          ₹{plan.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          + Govt. Fee
                        </span>
                      </div>
                      <button
                        type="button"
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                          isCurrent
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isCurrent ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsChangePlanModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
