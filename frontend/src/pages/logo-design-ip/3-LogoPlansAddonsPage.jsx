import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  Film,
  Award,
  Scale,
  Plus,
} from 'lucide-react';

import {
  PRICING_PACKAGES,
  ADDONS,
} from './constants.js';

export default function LogoPlansAddonsPage({
  initialData = {},
  onBack,
  onProceedToCheckout,
}) {
  const [selectedPlanId, setSelectedPlanId] = useState(
    initialData.selectedPlanId || 'starter'
  );

  const [selectedAddonIds, setSelectedAddonIds] = useState(
    initialData.selectedAddonIds || []
  );

  const handleToggleAddon = (addonId) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const currentPackage = useMemo(() => {
    return (
      PRICING_PACKAGES.find((p) => p.id === selectedPlanId) ||
      PRICING_PACKAGES[0]
    );
  }, [selectedPlanId]);

  const addonsTotal = useMemo(() => {
    return selectedAddonIds.reduce((sum, id) => {
      const match = ADDONS.find((a) => a.id === id);
      return sum + (match ? match.price : 0);
    }, 0);
  }, [selectedAddonIds]);

  const packageFee = currentPackage.price;
  const couponDiscount = 500;
  const subTotal = packageFee + addonsTotal - couponDiscount;
  const totalAmount = Math.max(subTotal, 0);

  const handleContinue = () => {
    if (onProceedToCheckout) {
      onProceedToCheckout({
        selectedPlanId: currentPackage.id,
        selectedPlanName: currentPackage.name,
        selectedPlanPrice: currentPackage.price,
        selectedAddonIds,
        addonsTotal,
        totalAmount,
      });
    }
  };

  const renderAddonIcon = (id) => {
    switch (id) {
      case 'express_delivery':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'animated_logo':
        return <Film className="w-5 h-5 text-purple-600" />;
      case 'copyright_roc':
        return <Award className="w-5 h-5 text-blue-600" />;
      case 'tm_objection_shield':
        return <Scale className="w-5 h-5 text-emerald-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#002B49]" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-16 antialiased">
      {/* Top Stepper Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-[#002B49] tracking-tight">
              BharatFiling
            </span>
            <span className="hidden sm:inline-block text-[11px] font-bold text-slate-400 border-l border-slate-200 pl-3">
              Select Package & Creative Add-ons
            </span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="text-slate-400">Step 1</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400">Step 2</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#002B49] font-black bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Step 3: Package & Add-ons
            </span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400">Step 4</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#002B49] transition mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Brand Brief</span>
          </button>
        )}

        <div className="space-y-10">
          {/* Section 1: Choose Package Tier */}
          <div>
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Transparent All-Inclusive Pricing
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-[#002B49] tracking-tight">
                Select Your Logo & Trademark Plan
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Choose the tier that matches your brand launch scale. Every package includes full vector files and signed copyright assignment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {PRICING_PACKAGES.map((pkg) => {
                const isSelected = selectedPlanId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPlanId(pkg.id)}
                    className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#002B49] bg-white shadow-xl ring-2 ring-[#002B49]'
                        : 'border-slate-200 hover:border-slate-300 bg-white/70 hover:shadow-md'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#002B49] text-[#FFD200] text-[11px] font-black uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs">
                        {pkg.badge}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {pkg.badge}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            isSelected
                              ? 'bg-[#002B49] border-[#002B49] text-white'
                              : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-base font-black text-[#002B49] mt-2">
                        {pkg.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {pkg.tagline}
                      </p>

                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{pkg.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-xs text-slate-600">
                        {pkg.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100">
                      <span
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center transition ${
                          isSelected
                            ? 'bg-[#002B49] text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select Plan'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Recommended Creative & IP Add-ons */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#002B49] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Enhance Your Launch
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[#002B49] mt-2">
                Recommended Brand & Legal Add-ons
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Optional services to accelerate delivery, animate your brand, or safeguard against trademark examination queries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ADDONS.map((addon) => {
                const isSelected = selectedAddonIds.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => handleToggleAddon(addon.id)}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                      {renderAddonIcon(addon.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-slate-900 truncate">
                          {addon.name}
                        </h4>
                        <span className="text-xs font-black text-emerald-700 shrink-0">
                          +₹{addon.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {addon.desc}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 mt-1 ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        <Plus className="w-3 h-3 text-slate-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Live Order Summary & Action */}
          <div className="bg-gradient-to-r from-[#002B49] to-[#001f35] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-amber-300 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Coupon Applied: MAKEININDIA (-₹500 Discount)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                {currentPackage.name} + {selectedAddonIds.length} Add-on(s)
              </h3>
              <p className="text-xs text-slate-300">
                Base Fee: ₹{packageFee} | Add-ons: ₹{addonsTotal} | Coupon: -₹{couponDiscount}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
              <div className="text-center md:text-right">
                <span className="text-[11px] text-slate-300 uppercase tracking-wider block">
                  Total Payable
                </span>
                <span className="text-3xl font-black text-[#FFD200]">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="button"
                onClick={handleContinue}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#FFD200] hover:bg-amber-400 text-slate-900 font-black text-xs tracking-wide shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
