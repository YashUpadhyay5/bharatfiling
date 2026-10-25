import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Check, ShieldCheck, ArrowRight, ArrowLeft, Star, Clock, Zap } from 'lucide-react';
import { UDYAM_PLANS, getUdyamPlan } from './constants.js';

export default function UdyamCheckoutPage({
  formData = {},
  selectedPlanId = 'fast-track',
  onSelectPlan,
  onProceedToPayment,
  onBack,
}) {
  const [currentPlanId, setCurrentPlanId] = useState(selectedPlanId || 'fast-track');
  const navigate = useNavigate();
  const { orderId } = useParams();

  const currentPlan = getUdyamPlan(currentPlanId);

  const basePrice = currentPlan.price;
  const gstAmount = Math.round(basePrice * currentPlan.gstRate);
  const totalAmount = basePrice + gstAmount;
  const savings = currentPlan.originalPrice - currentPlan.price;

  const handlePlanSelect = (id) => {
    setCurrentPlanId(id);
    if (onSelectPlan) {
      onSelectPlan(id);
    }
  };

  const handleContinue = () => {
    if (onProceedToPayment) {
      onProceedToPayment(currentPlanId);
    } else {
      navigate(`/apply/udyam?step=4&plan=${currentPlanId}`);
    }
  };

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
            <span>100% Secure Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-2">
            Step 3 of 4: Choose Your Registration Tier
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#042D50] tracking-tight">
            Select Your Udyam Filing Package
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            All plans include statutory CA review and government portal filing. Choose the speed and advisory tier matching your enterprise needs.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-10">
          {UDYAM_PLANS.map((plan) => {
            const isSelected = plan.id === currentPlanId;
            return (
              <div
                key={plan.id}
                onClick={() => handlePlanSelect(plan.id)}
                className={`rounded-2xl bg-white border transition-all duration-200 relative flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-xl -translate-y-1'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#022B50] text-white text-[10px] font-extrabold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm flex items-center gap-1 select-none">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="p-6">
                  {/* Plan Name & Tagline */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-extrabold text-slate-900">{plan.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      {plan.tat}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 leading-snug min-h-[36px]">
                    {plan.tagline}
                  </p>

                  {/* Pricing Section */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{plan.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {plan.discountPercent}% OFF
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">+ 18% GST Applicable</div>

                  {/* Deliverables Checklist */}
                  <div className="mt-6 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      What&apos;s Included:
                    </div>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Select Button */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlanSelect(plan.id);
                    }}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold tracking-wide transition cursor-pointer ${
                      isSelected
                        ? 'bg-[#022B50] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ Plan Selected' : 'Choose Plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating / Sticky Order Summary & Proceed CTA Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs text-slate-500">
              Selected Package:{' '}
              <strong className="text-slate-900 font-bold">{currentPlan.name} Plan</strong>
            </div>
            <div className="flex items-baseline gap-2 justify-center sm:justify-start">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                (₹{basePrice.toLocaleString('en-IN')} + ₹{gstAmount.toLocaleString('en-IN')} GST)
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Saved ₹{savings.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-3 rounded-lg border border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-50 transition cursor-pointer"
              >
                Back
              </button>
            )}

            <button
              type="button"
              onClick={handleContinue}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-[#002B49] hover:bg-[#073866] active:scale-98 text-white text-xs sm:text-sm font-bold shadow-md transition cursor-pointer"
            >
              <span>Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
