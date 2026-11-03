import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Building2,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Award,
  Users,
  HeartHandshake,
  Landmark,
  GraduationCap,
} from 'lucide-react';
import { ALL_INDIA_STATES } from './constants.js';

export default function TrustOnboardingPage({
  formData = {},
  onBack,
  onProceed,
}) {
  const [subStep, setSubStep] = useState(1);
  const totalSubSteps = 5;

  const [onboardingData, setOnboardingData] = useState({
    trustName: formData.trustName || '',
    trustCategory: formData.trustCategory || 'public_charitable',
    trusteesCount: formData.trusteesCount || '3_to_5',
    corpusFund: formData.corpusFund || '10000',
    stateName: formData.stateName || 'Delhi NCR',
    officeType: formData.officeType || 'rented',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleNext = () => {
    setErrorMsg('');

    if (subStep === 1) {
      if (!onboardingData.trustName.trim()) {
        setErrorMsg('Please enter your proposed Trust name or click Skip');
        return;
      }
    }

    if (subStep < totalSubSteps) {
      setSubStep((prev) => prev + 1);
    } else {
      if (onProceed) {
        onProceed(onboardingData);
      }
    }
  };

  const handleSkipName = () => {
    setOnboardingData((prev) => ({
      ...prev,
      trustName: 'Proposed Public Charitable Trust',
    }));
    setErrorMsg('');
    setSubStep(2);
  };

  const handlePrev = () => {
    setErrorMsg('');
    if (subStep > 1) {
      setSubStep((prev) => prev - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const progressPercentage = Math.round((subStep / totalSubSteps) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        {/* Top Breadcrumb / Back Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{subStep === 1 ? 'Back to Overview' : 'Previous Question'}</span>
          </button>

          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
            Step 2 of 4: Questionnaire
          </span>
        </div>

        {/* 2-Column Card Grid (1:1 with media_1793614513651_e181bb47.png) */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Trust Assurance Branding */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#002244] to-[#00172e] p-8 sm:p-10 text-white flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Non-Profit Portal</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                  We Register Over 10% of All Indian Non-Profits &amp; Trusts
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Join thousands of philanthropists, doctors, educators, and social
                  founders who trust BharatFiling to kickstart their non-profit journey.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-700/60 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Trust Deed in 48 Hours</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Custom drafted by High Court advocates with 12A &amp; 80G compliant objects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Sub-Registrar Guidance</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Complete support for stamp duty, witnesses, and appointment slot booking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">12A &amp; 80G Tax Exemption</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Assistance for tax-free trust surplus and 50% tax rebate for your donors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 text-[11px] text-slate-400 border-t border-slate-800">
              BharatFiling Legal &amp; Compliance Hub • ISO 27001 Certified
            </div>
          </div>

          {/* Right Column: Question Wizard */}
          <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Progress Bar & Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>
                    {subStep} of {totalSubSteps} complete
                  </span>
                  <span>Takes less than 1 min</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Sub-step 1: Trust Name */}
              {subStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1528] tracking-tight">
                      Enter your desired trust name
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Include keywords like Foundation, Trust, Seva Sansthan, or Mission.
                    </p>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={onboardingData.trustName}
                      onChange={(e) => {
                        setOnboardingData((prev) => ({
                          ...prev,
                          trustName: e.target.value,
                        }));
                        setErrorMsg('');
                      }}
                      placeholder="e.g. Vidya Jyoti Educational & Charitable Trust"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition shadow-2xs"
                    />

                    {errorMsg && (
                      <p className="text-xs text-rose-500 mt-2 font-medium">
                        {errorMsg}
                      </p>
                    )}
                  </div>

                  <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200/60 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-900 leading-relaxed">
                      Yet to finalize your trust name? Don't worry, our legal experts
                      can help you check availability.{' '}
                      <button
                        type="button"
                        onClick={handleSkipName}
                        className="font-bold underline cursor-pointer hover:text-blue-700 ml-1"
                      >
                        Skip it for now
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* Sub-step 2: Primary Trust Category / Purpose */}
              {subStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1528] tracking-tight">
                      What is the primary category/objective of your trust?
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      This determines the specific legal covenants drafted in your Trust Deed.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        id: 'public_charitable',
                        title: 'Public Charitable & Social Welfare',
                        desc: 'Poverty relief, community welfare, clothing, food distribution & general public utility',
                        icon: '🤝',
                      },
                      {
                        id: 'educational',
                        title: 'Education, Schools & Skill Development',
                        desc: 'Setting up schools, colleges, research libraries, coaching & vocational training',
                        icon: '🎓',
                      },
                      {
                        id: 'healthcare',
                        title: 'Healthcare, Hospitals & Medical Relief',
                        desc: 'Clinics, hospitals, diagnostic labs, free ambulance services & medicine camps',
                        icon: '🏥',
                      },
                      {
                        id: 'religious_spiritual',
                        title: 'Religious, Spiritual & Cultural Preservation',
                        desc: 'Temple, shrine or mutt maintenance, religious education & heritage conservation',
                        icon: '🛕',
                      },
                      {
                        id: 'environmental_animal',
                        title: 'Environmental & Animal Welfare (Goshala)',
                        desc: 'Tree plantation, water bodies revival, goshala, stray animal care & rescue shelter',
                        icon: '🌱',
                      },
                    ].map((cat) => (
                      <label
                        key={cat.id}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                          onboardingData.trustCategory === cat.id
                            ? 'border-blue-600 bg-blue-50/60 ring-1 ring-blue-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="trustCategory"
                          checked={onboardingData.trustCategory === cat.id}
                          onChange={() =>
                            setOnboardingData((prev) => ({
                              ...prev,
                              trustCategory: cat.id,
                            }))
                          }
                          className="mt-1 w-4 h-4 accent-blue-600"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900">
                            <span>{cat.icon}</span>
                            <span>{cat.title}</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {cat.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-step 3: Number of Trustees */}
              {subStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1528] tracking-tight">
                      How many trustees will govern the trust?
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Includes 1 Settlor (author/founder) plus managing trustees.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        id: '2_trustees',
                        title: '2 Trustees',
                        desc: 'Minimum statutory requirement (1 Settlor + 1 Trustee)',
                      },
                      {
                        id: '3_to_5',
                        title: '3 to 5 Trustees',
                        badge: 'Recommended',
                        desc: 'Optimal for Section 12A/80G approvals & CSR grants',
                      },
                      {
                        id: '6_to_10',
                        title: '6 to 10 Trustees',
                        desc: 'Ideal for regional associations & institutional trusts',
                      },
                      {
                        id: 'more_than_10',
                        title: 'More than 10 Trustees',
                        desc: 'Large national foundations & community bodies',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setOnboardingData((prev) => ({
                            ...prev,
                            trusteesCount: opt.id,
                          }))
                        }
                        className={`p-4 rounded-xl border text-left cursor-pointer transition relative ${
                          onboardingData.trusteesCount === opt.id
                            ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        {opt.badge && (
                          <span className="absolute top-3 right-3 text-[10px] font-bold bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">
                            {opt.badge}
                          </span>
                        )}
                        <h4 className="font-bold text-sm text-slate-900">
                          {opt.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {opt.desc}
                        </p>
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    💡 <strong>Pro Tip:</strong> Having at least 3 trustees (Managing
                    Trustee, Secretary &amp; Treasurer) helps establish proper quorum
                    under Income Tax Section 11/12 audits.
                  </div>
                </div>
              )}

              {/* Sub-step 4: Proposed Initial Corpus Fund */}
              {subStep === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1528] tracking-tight">
                      Proposed Initial Corpus Fund
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      The initial initial monetary settlement transferred by the Settlor
                      to establish the trust.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        id: '5000',
                        label: '₹5,000',
                        desc: 'Popular starting fund',
                      },
                      {
                        id: '10000',
                        label: '₹10,000',
                        desc: 'Recommended by CAs',
                      },
                      {
                        id: '25000',
                        label: '₹25,000',
                        desc: 'For active programs',
                      },
                      {
                        id: '50000_plus',
                        label: '₹50,000+',
                        desc: 'Institutional scale',
                      },
                    ].map((fund) => (
                      <button
                        key={fund.id}
                        type="button"
                        onClick={() =>
                          setOnboardingData((prev) => ({
                            ...prev,
                            corpusFund: fund.id,
                          }))
                        }
                        className={`p-4 rounded-xl border text-center cursor-pointer transition ${
                          onboardingData.corpusFund === fund.id
                            ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <span className="text-xl font-extrabold text-[#0B1528] block">
                          {fund.label}
                        </span>
                        <span className="text-xs text-slate-500 mt-1 block">
                          {fund.desc}
                        </span>
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Note: The initial corpus fund can be deposited into the trust’s
                    bank account once the Trust PAN card is allotted.
                  </p>
                </div>
              )}

              {/* Sub-step 5: Registered Office State */}
              {subStep === 5 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1528] tracking-tight">
                      Select State for Registered Office
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Stamp duty and Sub-Registrar jurisdiction are based on the state
                      where the registered address is located.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Registered Office State
                    </label>
                    <select
                      value={onboardingData.stateName}
                      onChange={(e) =>
                        setOnboardingData((prev) => ({
                          ...prev,
                          stateName: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                    >
                      {ALL_INDIA_STATES.map((st) => (
                        <option key={st.code} value={st.name}>
                          {st.name} — {st.authority}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Premises Ownership Type
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'owned', label: 'Owned by Trustee' },
                        { id: 'rented', label: 'Rented Premises' },
                        { id: 'family', label: 'Parent / Family Owned' },
                      ].map((premise) => (
                        <button
                          key={premise.id}
                          type="button"
                          onClick={() =>
                            setOnboardingData((prev) => ({
                              ...prev,
                              officeType: premise.id,
                            }))
                          }
                          className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                            onboardingData.officeType === premise.id
                              ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                          }`}
                        >
                          {premise.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="pt-8 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                className="py-3 px-5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
              >
                {subStep === 1 ? 'Back' : 'Back'}
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="py-3.5 px-8 rounded-xl bg-[#002244] hover:bg-[#00172e] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{subStep === totalSubSteps ? 'View Pricing Plans' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
