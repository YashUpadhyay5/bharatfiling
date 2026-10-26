import React, { useState } from 'react';
import {
  Users,
  Check,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  Clock,
  Sparkles,
  Zap,
  FileCheck,
  BadgePercent,
} from 'lucide-react';
import { FSSAI_PLANS, getFssaiPlan } from './constants.js';

export default function FssaiCheckoutPage({
  formData = {},
  onSelectPlan,
  onBack,
}) {
  const currentPlanId = formData.plan || 'basic';
  const [selectedPlanId, setSelectedPlanId] = useState(currentPlanId);

  // Optional Addons
  const [addons, setAddons] = useState({
    fastTrack: false, // Priority 48hr drafting (+₹499)
    fsmsPlan: false,  // Food Safety Management System plan (+₹999)
    gstCombo: false,  // GST registration combo (+₹999)
  });

  const [showExpertSuccess, setShowExpertSuccess] = useState(false);

  const selectedPlan = getFssaiPlan(selectedPlanId);

  const toggleAddon = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateAddonsTotal = () => {
    let sum = 0;
    if (addons.fastTrack) sum += 499;
    if (addons.fsmsPlan) sum += 999;
    if (addons.gstCombo) sum += 999;
    return sum;
  };

  const handleProceed = () => {
    if (onSelectPlan) {
      onSelectPlan(selectedPlanId, addons);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-6">
        <div className="flex items-center gap-2">
          <img
            src="/bharatfiling-user-logo.png"
            alt="BharatFiling"
            className="h-8 sm:h-9 w-auto object-contain cursor-pointer"
            onClick={onBack}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
            }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Step 3 of 4: Plan Selection</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl w-full mx-auto my-auto py-6">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0052CC] bg-blue-50 px-3 py-1 rounded-full mb-2">
            Recommended Statutory Package
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#002B49] tracking-tight">
            Select Your FSSAI License Filing Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose the legal package suited for your business scale and target turnaround time.
          </p>
        </div>

        {/* 3 Tier Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {FSSAI_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const isRecommended = plan.recommended;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`rounded-2xl border-2 p-5 sm:p-6 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#002B49] bg-white shadow-xl ring-2 ring-[#002B49]/10'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#E5B54F] text-slate-900 text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    Recommended for Startups
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm">
                      {plan.formType}
                    </span>
                    <input
                      type="radio"
                      name="selectedPlan"
                      checked={isSelected}
                      onChange={() => setSelectedPlanId(plan.id)}
                      className="text-[#002B49] focus:ring-[#002B49] h-4 w-4"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-[#002B49] leading-snug">
                    {plan.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {plan.turnoverLimit}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-[#002B49]">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{plan.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-sm inline-block mt-1">
                      {plan.discountLabel}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    {plan.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> {plan.tat}
                  </span>
                  <span>Govt Fee: ₹{plan.govtFee}/yr</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Addons Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Popular Add-ons for Food Businesses (Optional)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Addon 1: Fast-track */}
            <div
              onClick={() => toggleAddon('fastTrack')}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                addons.fastTrack
                  ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="checkbox"
                checked={addons.fastTrack}
                onChange={() => {}}
                className="mt-1 text-[#002B49] rounded focus:ring-[#002B49]"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>Priority 48-Hour Filing</span>
                  <span className="text-[#0052CC] font-mono">+₹499</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Fast-track document validation &amp; priority departmental liaison.
                </p>
              </div>
            </div>

            {/* Addon 2: FSMS Plan */}
            <div
              onClick={() => toggleAddon('fsmsPlan')}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                addons.fsmsPlan
                  ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="checkbox"
                checked={addons.fsmsPlan}
                onChange={() => {}}
                className="mt-1 text-[#002B49] rounded focus:ring-[#002B49]"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>FSMS Plan &amp; SOP Drafting</span>
                  <span className="text-[#0052CC] font-mono">+₹999</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Complete Food Safety Management System plan drafting required by FSO.
                </p>
              </div>
            </div>

            {/* Addon 3: GST Combo */}
            <div
              onClick={() => toggleAddon('gstCombo')}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                addons.gstCombo
                  ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="checkbox"
                checked={addons.gstCombo}
                onChange={() => {}}
                className="mt-1 text-[#002B49] rounded focus:ring-[#002B49]"
              />
              <div>
                <p className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>GST Registration Combo</span>
                  <span className="text-[#0052CC] font-mono">+₹999</span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Save 50% on commercial GSTIN registration for food vendors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Total & Proceed Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Selected:</span>
              <span className="text-sm font-bold text-[#002B49]">
                {selectedPlan.name}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Plan Base: ₹{selectedPlan.price}
              {calculateAddonsTotal() > 0 && ` + Addons: ₹${calculateAddonsTotal()}`}
              {' • '}
              <span className="text-emerald-700 font-semibold">18% GST Applicable</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleProceed}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-xs sm:text-sm transition shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>Proceed to Payment Desk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      <footer className="max-w-6xl w-full mx-auto text-center py-4 text-xs text-slate-400">
        © BharatFiling Statutory Facilitation Desk • ISO 27001 Certified System
      </footer>

    </div>
  );
}
