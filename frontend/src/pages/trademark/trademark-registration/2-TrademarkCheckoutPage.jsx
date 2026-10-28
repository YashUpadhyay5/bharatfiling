import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  Check,
  ArrowRight,
  Lock,
  Sparkles,
  HelpCircle,
  Building2,
  FileCheck,
  CreditCard,
} from 'lucide-react';
import {
  TRADEMARK_PLANS,
  APPLICANT_TYPES,
  TRADEMARK_TYPES,
} from './constants.js';

export default function TrademarkCheckoutPage({
  formData = {},
  onBack,
  onProceedToPayment,
}) {
  const [selectedPlanId, setSelectedPlanId] = useState(formData.planId || 'standard');
  const [applicantType, setApplicantType] = useState(formData.applicantType || 'individual');
  const [trademarkType, setTrademarkType] = useState(formData.trademarkType || 'word');
  const [brandName, setBrandName] = useState(formData.brandName || '');
  const [isClassSearchOpen, setIsClassSearchOpen] = useState(false);

  const selectedPlan =
    TRADEMARK_PLANS.find((p) => p.id === selectedPlanId) || TRADEMARK_PLANS[1];
  const selectedApplicant =
    APPLICANT_TYPES.find((a) => a.id === applicantType) || APPLICANT_TYPES[0];

  // Pricing calculation
  const professionalFee = selectedPlan.price;
  const gstOnFee = Math.round(professionalFee * 0.18);
  const govtFee = selectedApplicant.govtFee;
  const totalAmount = professionalFee + gstOnFee + govtFee;

  const handleContinue = (e) => {
    e.preventDefault();
    if (onProceedToPayment) {
      onProceedToPayment({
        ...formData,
        planId: selectedPlanId,
        applicantType,
        trademarkType,
        brandName,
        professionalFee,
        gstOnFee,
        govtFee,
        totalAmount,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Configuration Form */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Applicant Legal Entity Type */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
              <h2 className="text-lg font-black text-[#002B49] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Select Applicant Type (Determines Govt. Fee)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {APPLICANT_TYPES.map((type) => {
                  const isSel = applicantType === type.id;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setApplicantType(type.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSel
                          ? 'border-[#002B49] ring-2 ring-[#002B49] bg-blue-50/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[11px] font-extrabold px-2 py-0.5 rounded ${
                              type.badgeColor === 'emerald'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {type.tag}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            Govt Fee: ₹{type.govtFee}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm text-slate-900">{type.title}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{type.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Mark Details */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
              <h2 className="text-lg font-black text-[#002B49] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Trademark Mark &amp; Type Details</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Proposed Brand Name / Trademark Word
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. BHARATFILING, NEXTGEN, ECOTECH"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-semibold uppercase tracking-wide focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Our IP attorneys will perform an immediate phonetic &amp; semantic similarity
                    check across IP India database before filing.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Mark Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TRADEMARK_TYPES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTrademarkType(t.id)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                          trademarkType === t.id
                            ? 'border-[#002B49] ring-2 ring-[#002B49] bg-blue-50/20'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-900">{t.title}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{t.badge}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Choose Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200 space-y-4">
              <h2 className="text-lg font-black text-[#002B49] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>Select Legal Package Tier</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TRADEMARK_PLANS.map((plan) => {
                  const isSel = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSel
                          ? 'border-emerald-600 ring-2 ring-emerald-600 bg-emerald-50/10 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-2">
                        {plan.popular && (
                          <span className="inline-block bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded">
                            Most Popular
                          </span>
                        )}
                        <h3 className="font-bold text-sm text-slate-900">{plan.name}</h3>
                        <div className="text-xl font-black text-[#002B49]">₹{plan.price}</div>
                        <p className="text-[11px] text-slate-500 leading-tight">{plan.tagline}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
                        {isSel ? '✓ Selected Plan' : 'Select'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary Desk */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 space-y-5 sticky top-6">
              <h3 className="text-lg font-black text-[#002B49] border-b border-slate-100 pb-3">
                Order Breakdown
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Professional Fee ({selectedPlan.name})</span>
                  <span className="font-bold text-slate-900">₹{professionalFee}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>18% GST on Professional Fee</span>
                  <span className="font-bold text-slate-900">₹{gstOnFee}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Statutory IP India Govt. Fee</span>
                  <span className="font-bold text-slate-900">₹{govtFee}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-slate-900">Total Payable</span>
                  <span className="text-2xl font-black text-[#002B49]">₹{totalAmount}</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Instant ™ Usage Rights Guaranteed</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-tight">
                  Official Form TM-A receipt generated within 24 hours of document submission.
                </p>
              </div>

              <button
                type="button"
                onClick={handleContinue}
                className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-slate-500 font-medium">
                🔒 Safe &amp; Secure Checkout • 100% Money-Back Filing Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
