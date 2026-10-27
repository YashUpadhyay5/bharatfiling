import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Zap } from 'lucide-react';
import { DSC_PLANS } from './constants.js';

export default function DscCheckoutPage({ formData = {}, onSelectPlan, onBack }) {
  const [selectedPlanId, setSelectedPlanId] = useState(formData.plan || 'combo');

  const handleChoosePlan = (planId) => {
    setSelectedPlanId(planId);
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Configuration</span>
        </button>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-black uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
            Step 3 of 4 • Transparent Pricing
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3">
            Choose Your Class 3 DSC Package
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            All plans include CCA licensing fee, FIPS 140-2 cryptographic USB token, and free express doorstep delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {DSC_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const isRecommended = plan.recommended;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ${
                  isRecommended
                    ? 'bg-gradient-to-b from-sky-950 to-[#002B49] text-white shadow-2xl border-2 border-amber-400 transform md:-translate-y-2'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-md hover:shadow-xl'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[11px] px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Most Popular & Recommended
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-black ${isRecommended ? 'text-white' : 'text-slate-900'}`}>
                      {plan.name}
                    </h3>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        isRecommended ? 'bg-amber-400 text-slate-950' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {plan.discountLabel}
                    </span>
                  </div>

                  <p className={`text-xs mb-5 ${isRecommended ? 'text-sky-200' : 'text-slate-500'}`}>
                    {plan.subtitle}
                  </p>

                  <div className="mb-6 pb-6 border-b border-slate-200/40">
                    <div className="flex items-baseline gap-2">
                      <span className={`text-xs line-through ${isRecommended ? 'text-sky-300' : 'text-slate-400'}`}>
                        ₹{plan.originalPrice}
                      </span>
                      <span className={`text-3xl sm:text-4xl font-black ${isRecommended ? 'text-white' : 'text-[#002B49]'}`}>
                        ₹{plan.price}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1 ${isRecommended ? 'text-sky-200' : 'text-slate-500'}`}>
                      + 18% GST (Includes FIPS USB token + Free delivery)
                    </p>
                  </div>

                  {/* Feature List */}
                  <ul className="space-y-3 mb-6 text-xs">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isRecommended ? 'text-amber-400' : 'text-emerald-600'
                          }`}
                        />
                        <span className={isRecommended ? 'text-slate-100' : 'text-slate-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleChoosePlan(plan.id)}
                  className={`w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                    isRecommended
                      ? 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                      : 'bg-[#002B49] hover:bg-[#003B64] text-white'
                  }`}
                >
                  <span>Select {plan.name.split(' ')[2] || 'Plan'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
