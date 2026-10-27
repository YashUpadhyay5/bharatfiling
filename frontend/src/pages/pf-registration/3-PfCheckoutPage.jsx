import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Check, Sparkles, CheckSquare, Square } from 'lucide-react';
import { PF_PLANS } from './constants.js';

export default function PfCheckoutPage({ formData = {}, onSelectPlan, onBack }) {
  const [selectedPlanId, setSelectedPlanId] = useState(formData.plan || 'standard');
  const [addonDsc, setAddonDsc] = useState(false);
  const [addonEsi, setAddonEsi] = useState(false);
  const [addonEcrQuarterly, setAddonEcrQuarterly] = useState(false);

  const selectedPlan = PF_PLANS.find((p) => p.id === selectedPlanId) || PF_PLANS[1];

  // Addon prices
  const dscPrice = addonDsc ? 1499 : 0;
  const esiPrice = addonEsi && selectedPlanId !== 'combo' ? 1999 : 0;
  const ecrPrice = addonEcrQuarterly && selectedPlanId === 'starter' ? 999 : 0;

  const subtotal = selectedPlan.price + dscPrice + esiPrice + ecrPrice;
  const gstAmount = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gstAmount;

  const handleProceed = () => {
    if (onSelectPlan) {
      onSelectPlan(selectedPlanId, {
        addonDsc,
        addonEsi: selectedPlanId === 'combo' ? true : addonEsi,
        addonEcrQuarterly,
        subtotal,
        gstAmount,
        grandTotal,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 sm:py-16 text-slate-800 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Establishment Details</span>
        </button>

        <div className="mb-8">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#002B49] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            Step 3 of 4 • Select Plan &amp; Add-ons
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] mt-3">
            Confirm Your Statutory Package
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose your service level. All plans include dedicated EPFO Shram Suvidha filing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Plan Cards (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {PF_PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedPlanId === plan.id
                    ? 'border-[#002B49] bg-white shadow-md ring-2 ring-blue-50'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedPlanId === plan.id ? 'border-[#002B49] bg-[#002B49]' : 'border-slate-300'
                      }`}
                    >
                      {selectedPlanId === plan.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">{plan.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900">₹{plan.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400 line-through ml-1.5">
                      ₹{plan.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mb-3">{plan.subtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  {plan.features.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Optional Add-ons */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-extrabold text-[#002B49] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#002B49]" />
                <span>Recommended Labour Law Add-ons</span>
              </h4>

              {/* Addon 1: Class 3 DSC */}
              <div
                onClick={() => setAddonDsc(!addonDsc)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  addonDsc ? 'border-[#002B49] bg-slate-50/70' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {addonDsc ? (
                    <CheckSquare className="w-4 h-4 text-[#002B49]" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                  <div>
                    <span className="text-xs font-bold text-slate-900">Class 3 Digital Signature (DSC)</span>
                    <p className="text-[11px] text-slate-500">Required for Form 5A digital signing on EPFO portal.</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-slate-900">+₹1,499</span>
              </div>

              {/* Addon 2: ESI Registration */}
              {selectedPlanId !== 'combo' && (
                <div
                  onClick={() => setAddonEsi(!addonEsi)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                    addonEsi ? 'border-[#002B49] bg-slate-50/70' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {addonEsi ? (
                      <CheckSquare className="w-4 h-4 text-[#002B49]" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                    <div>
                      <span className="text-xs font-bold text-slate-900">Add 17-Digit ESIC Registration</span>
                      <p className="text-[11px] text-slate-500">For healthcare &amp; medical coverage (10+ staff).</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900">+₹1,999</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4">
            <h3 className="font-extrabold text-base text-[#002B49] pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{selectedPlan.name}:</span>
                <span className="font-bold text-slate-900">₹{selectedPlan.price.toLocaleString('en-IN')}</span>
              </div>

              {addonDsc && (
                <div className="flex justify-between">
                  <span>Class 3 DSC (2 Years):</span>
                  <span className="font-bold text-slate-900">₹1,499</span>
                </div>
              )}

              {addonEsi && selectedPlanId !== 'combo' && (
                <div className="flex justify-between">
                  <span>ESI Registration Addon:</span>
                  <span className="font-bold text-slate-900">₹1,999</span>
                </div>
              )}

              <div className="flex justify-between pt-2 border-t border-slate-100">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span className="font-bold text-slate-900">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Govt Fee:</span>
                <span>₹0 (Zero)</span>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-baseline">
              <div>
                <span className="text-xs font-bold text-slate-500">Total Payable:</span>
                <p className="text-2xl font-black text-[#002B49]">₹{grandTotal.toLocaleString('en-IN')}</p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Inclusive of GST
              </span>
            </div>

            <button
              type="button"
              onClick={handleProceed}
              className="w-full py-3 bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              <span>Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Secure 256-Bit SSL Encrypted Payment</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
