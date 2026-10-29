import React, { useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import { RENEWAL_CHOOSE_PLANS } from './constants.js';

export default function TrademarkRenewalPlansPage({
  formData = {},
  onBack,
  onSelectPlan,
}) {
  const [selectedPlanId, setSelectedPlanId] = useState(
    formData.packageId || 'full_service'
  );
  const [showGovtFeeModal, setShowGovtFeeModal] = useState(false);

  const handleChoosePlan = (plan) => {
    setSelectedPlanId(plan.id);
    if (onSelectPlan) {
      const isConsultation = plan.id === 'consultation';
      const baseFee = plan.price;
      const originalPrice = plan.originalPrice;
      const discount = originalPrice - baseFee;
      const gstAmount = Math.round(baseFee * 0.18);
      const totalAmount = baseFee + gstAmount;

      onSelectPlan({
        packageId: plan.id,
        packageName: plan.name,
        professionalFee: baseFee,
        originalPrice,
        onlineDiscount: discount,
        gstAmount,
        totalAmount,
        hasGovtFee: plan.hasGovtFee,
      });
    }
  };

  const consultationPlan =
    RENEWAL_CHOOSE_PLANS.find((p) => p.id === 'consultation') ||
    RENEWAL_CHOOSE_PLANS[0];
  const fullServicePlan =
    RENEWAL_CHOOSE_PLANS.find((p) => p.id === 'full_service') ||
    RENEWAL_CHOOSE_PLANS[1];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans selection:bg-[#002B49] selection:text-white flex flex-col">
      {/* ========================================================= */}
      {/* 1. TOP NAVBAR (1:1 with Screenshot Logo & Navigation)     */}
      {/* ========================================================= */}
      <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo matching screenshot layout */}
            <a href="/" className="flex items-center gap-1.5 focus:outline-none">
              <span className="bg-[#FDB813] text-slate-950 font-black text-xs sm:text-sm px-2 py-1 rounded tracking-wider uppercase">
                BHARAT
              </span>
              <span className="text-[#002B49] font-black text-base sm:text-lg tracking-tight">
                FILING
              </span>
            </a>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Trademark Renewal
            </span>
          </div>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#002B49] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>
          )}
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. MAIN CONTENT AREA                                      */}
      {/* ========================================================= */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Centered Heading (1:1 with Screenshot) */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#002B49] tracking-tight">
            Choose the Right Plan
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Select the renewal package that best fits your IP protection strategy
          </p>
        </div>

        {/* ========================================================= */}
        {/* 3. TWO PLAN CARDS (1:1 with Screenshot)                   */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-4xl mx-auto">
          {/* ------------------------------------------------------- */}
          {/* CARD 1: Expert Consultation (Fee Adjustable)            */}
          {/* ------------------------------------------------------- */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between relative">
            <div>
              {/* Plan Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#002B49] leading-snug tracking-tight">
                {consultationPlan.name}
              </h2>

              {/* Price Row */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-slate-400 line-through text-sm font-semibold">
                  ₹{consultationPlan.originalPrice}
                </span>
                <span className="inline-flex items-center gap-1 bg-[#E8F8F0] text-[#129A54] text-xs font-bold px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#129A54]"></span>
                  {consultationPlan.discountBadge}
                </span>
              </div>

              {/* Big Price */}
              <div className="text-4xl sm:text-[44px] font-black text-slate-900 mt-2 mb-6 tracking-tight">
                ₹{consultationPlan.price.toLocaleString('en-IN')}
              </div>

              {/* Get Started Button */}
              <button
                type="button"
                onClick={() => handleChoosePlan(consultationPlan)}
                className="w-full bg-[#002B49] hover:bg-[#001D33] active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-lg text-base shadow-sm hover:shadow transition-all duration-150 text-center cursor-pointer"
              >
                {consultationPlan.ctaText}
              </button>

              {/* What You'll Get Section */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                  {consultationPlan.featuresHeader}
                </h3>
                <ul className="space-y-3.5">
                  {consultationPlan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium"
                    >
                      <Check className="w-4 h-4 text-[#129A54] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="mt-8 pt-4 border-t border-slate-100">
              <p className="text-[11px] sm:text-xs text-slate-500 italic leading-relaxed">
                {consultationPlan.disclaimer}
              </p>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* CARD 2: Full Service & Fulfilment (Recommended)         */}
          {/* ------------------------------------------------------- */}
          <div className="relative flex flex-col">
            {/* Top Recommended Floating Badge */}
            <div className="flex justify-center -mb-3 relative z-10">
              <span className="bg-[#FDB813] text-slate-950 text-[11px] sm:text-xs font-extrabold px-3.5 py-1 rounded-t-md shadow-sm uppercase tracking-wider flex items-center gap-1">
                ★ Recommended
              </span>
            </div>

            {/* Dark Navy Card Body */}
            <div className="bg-[#00223A] text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between flex-1 border border-[#002B49]">
              <div>
                {/* Plan Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
                  {fullServicePlan.name}
                </h2>

                {/* Price Row */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-slate-400 line-through text-sm font-semibold">
                    ₹{fullServicePlan.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-[#E8F8F0] text-[#129A54] text-xs font-bold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#129A54]"></span>
                    {fullServicePlan.discountBadge}
                  </span>
                </div>

                {/* Big Price + Govt Fee */}
                <div className="flex items-baseline gap-2 mt-2 mb-1 flex-wrap">
                  <span className="text-4xl sm:text-[44px] font-black text-white tracking-tight">
                    ₹{fullServicePlan.price.toLocaleString('en-IN')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowGovtFeeModal(true)}
                    className="text-xs text-slate-300 underline font-medium hover:text-[#FDB813] transition-colors cursor-pointer"
                    title="Statutory government fee payable directly on the IP India e-filing gateway"
                  >
                    + Govt Fee
                  </button>
                </div>

                {/* EMI line */}
                <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-6 font-medium">
                  <span className="bg-white/10 text-slate-200 border border-white/20 text-[10px] px-1.5 py-0.5 rounded font-bold">
                    EMI
                  </span>
                  <span>EMI option available.</span>
                </div>

                {/* Get Started Button (Bright Gold) */}
                <button
                  type="button"
                  onClick={() => handleChoosePlan(fullServicePlan)}
                  className="w-full bg-[#FDB813] hover:bg-[#E5A510] active:scale-[0.99] text-slate-950 font-black py-3.5 px-4 rounded-lg text-base shadow-md hover:shadow-lg transition-all duration-150 text-center cursor-pointer"
                >
                  {fullServicePlan.ctaText}
                </button>

                {/* What You'll Get Section */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
                    {fullServicePlan.featuresHeader}
                  </h3>
                  <ul className="space-y-3.5">
                    {fullServicePlan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-200 leading-relaxed font-medium"
                      >
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Assurance */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FDB813]" />
                  <span>Senior IP Advocate Assigned</span>
                </span>
                <span className="text-[#FDB813] font-semibold">100% Valid Filing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Trust Footer */}
        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-6 flex-wrap">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ISO 27001 Certified Security</span>
          </span>
          <span>•</span>
          <span>Official IP India Gateway Compatible</span>
          <span>•</span>
          <span>100,000+ Trademarks Managed</span>
        </div>
      </main>

      {/* Govt Fee Info Modal */}
      {showGovtFeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-slate-800 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#002B49] mb-2">
              Government Statutory Fees for Form TM-R
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              As per Rule 57 of Trade Marks Rules, 2017, the official registry fee is payable per class directly to the Trade Marks Registry upon filing Form TM-R.
            </p>
            <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Standard Timely Renewal (within 6 mos before expiry):</span>
                <span className="font-bold text-[#002B49]">₹9,000 / class</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Late Renewal Surcharge (within 6 mos post-expiry):</span>
                <span className="font-bold text-amber-700">+ ₹4,500 / class</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-slate-700">Restoration Fee (6 mos to 1 yr post-expiry):</span>
                <span className="font-bold text-rose-700">+ ₹5,000 / class</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGovtFeeModal(false)}
                className="bg-[#002B49] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#001D33] cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
