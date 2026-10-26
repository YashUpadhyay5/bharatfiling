import React, { useState } from 'react';
import {
  Check,
  CreditCard,
  Star,
  ShieldCheck,
  ArrowLeft,
  X,
  HelpCircle,
} from 'lucide-react';
import { SHOP_PLANS } from './constants.js';

export default function ShopCheckoutPage({
  formData = {},
  onSelectPlan,
  onBack,
}) {
  const [selectedPlanId, setSelectedPlanId] = useState(
    formData.plan || 'standard'
  );
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleProceed = (planId) => {
    setSelectedPlanId(planId);
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans py-8 sm:py-12 px-4 sm:px-6 relative">
      
      {/* Top Header with Back Navigation and Brand Emblem */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#002B49] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Business Details</span>
        </button>

        <div className="inline-flex items-center gap-1.5 font-extrabold tracking-tight text-[#002B49] text-base">
          <span className="bg-[#FFCC00] text-[#002B49] font-black px-1.5 py-0.5 rounded text-xs uppercase tracking-wider">
            BHARAT
          </span>
          <span>FILING</span>
        </div>
      </div>

      {/* Main Title (Exact wording from Screenshot media_1793014579446_ca0d30b4.png) */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#022B50] tracking-tight">
          Right plan for your business
        </h1>
        {formData.companyName && (
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Selected for: <span className="font-semibold text-slate-800">{formData.companyName}</span>
            {formData.isCommercialPlace && ` • Commercial Premises: ${formData.isCommercialPlace}`}
          </p>
        )}
      </div>

      {/* 3 Pricing Plan Cards (1:1 Exact Replica of Screenshot media_1793014579446_ca0d30b4.png) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        
        {SHOP_PLANS.map((plan) => {
          const isStandard = plan.id === 'standard';
          
          return (
            <div
              key={plan.id}
              className={`rounded-2xl transition-all duration-200 flex flex-col justify-between relative ${
                isStandard
                  ? 'bg-[#002B49] text-white shadow-2xl border-2 border-[#FFCC00] pt-0'
                  : 'bg-white text-slate-800 shadow-lg border border-slate-200/90 hover:shadow-xl'
              }`}
            >
              
              {/* Recommended Badge on Top of Middle Standard Card */}
              {isStandard && (
                <div className="flex justify-center -mt-3.5 mb-2">
                  <div className="inline-flex items-center gap-1 bg-[#FFCC00] text-[#002B49] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
                    <Star className="w-3.5 h-3.5 fill-[#002B49]" />
                    <span>Recommended</span>
                  </div>
                </div>
              )}

              <div className={`p-6 sm:p-7 ${isStandard ? 'pt-3' : 'pt-7'}`}>
                
                {/* Plan Title & Subtitle */}
                <div>
                  <h2 className={`text-2xl font-bold tracking-tight ${isStandard ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h2>
                  <p className={`text-xs mt-1.5 min-h-[32px] leading-relaxed ${isStandard ? 'text-blue-100' : 'text-slate-500'}`}>
                    {plan.subtitle}
                  </p>
                </div>

                {/* Pricing Block */}
                <div className="mt-6 pb-6 border-b border-slate-200/20">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs line-through ${isStandard ? 'text-red-300' : 'text-red-500 font-semibold'}`}>
                      ₹{plan.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isStandard
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {plan.discountLabel}
                    </span>
                  </div>

                  <div className="mt-2 flex items-baseline gap-2">
                    <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isStandard ? 'text-white' : 'text-slate-900'}`}>
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className={`text-xs underline hover:no-underline cursor-pointer ${
                        isStandard ? 'text-blue-200' : 'text-slate-500'
                      }`}
                    >
                      + Govt Fee
                    </button>
                  </div>

                  {/* EMI option badge if available */}
                  {plan.hasEmi && (
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        isStandard
                          ? 'border-blue-400/40 text-blue-200 bg-blue-900/40'
                          : 'border-slate-300 text-slate-600 bg-slate-50'
                      }`}>
                        <CreditCard className="w-3 h-3" />
                        <span>EMI</span>
                      </span>
                      <span className={`text-[11px] ${isStandard ? 'text-blue-200' : 'text-slate-500'}`}>
                        EMI option available.
                      </span>
                    </div>
                  )}
                </div>

                {/* Primary Proceed CTA Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => handleProceed(plan.id)}
                    className={`w-full py-3.5 px-4 rounded-lg font-bold text-sm transition duration-150 cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                      isStandard
                        ? 'bg-[#FFCC00] hover:bg-amber-400 text-[#002B49] shadow-amber-500/20'
                        : 'bg-[#022B50] hover:bg-[#001D38] text-white shadow-blue-950/20'
                    }`}
                  >
                    <span>Proceed to Pay</span>
                  </button>
                </div>

                {/* Section Header: What You'll Get */}
                <div className="mt-8">
                  <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                    isStandard ? 'text-white' : 'text-slate-900'
                  }`}>
                    What You'll Get
                  </h3>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-snug">
                        <div className={`mt-0.5 shrink-0 ${isStandard ? 'text-emerald-300' : 'text-emerald-600'}`}>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span className={isStandard ? 'text-blue-50' : 'text-slate-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Bottom Note inside Starter card */}
              {plan.note && (
                <div className="p-6 pt-0">
                  <p className="text-[11px] text-slate-400 italic leading-relaxed border-t border-slate-100 pt-3">
                    {plan.note}
                  </p>
                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* Bottom Disclaimers (Exact wording from Screenshot) */}
      <div className="text-center mt-12 space-y-1 text-xs text-slate-500">
        <p>Please note: GST will be added during checkout</p>
        <p>
          Government charges are additional to the above fee. Refer{' '}
          <button
            onClick={() => setShowTermsModal(true)}
            className="text-blue-600 hover:underline cursor-pointer font-medium"
          >
            T&amp;C
          </button>
        </p>
      </div>

      {/* T&C MODAL */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-slate-900 mb-2">Government Fees &amp; Terms</h3>
            <div className="text-xs text-slate-600 space-y-2 max-h-72 overflow-y-auto pr-2 leading-relaxed">
              <p>
                1. <strong>Statutory State Fees:</strong> State labour departments levy official statutory registration fees based on state legislation and employee bracket. For instance, Maharashtra charges ₹0 for under 10 employees (Form F) and ₹1,000–₹5,000 for 10+ employees.
              </p>
              <p>
                2. <strong>GST Surcharge:</strong> Statutory 18% Goods and Services Tax is added to the professional fee at checkout with a full GST Input Tax Credit (ITC) compliant B2B tax invoice.
              </p>
              <p>
                3. <strong>100% Transparency:</strong> No hidden costs or unapproved surcharges. All official government challans are uploaded directly to your customer dashboard.
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowTermsModal(false)}
                className="bg-[#002B49] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
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
