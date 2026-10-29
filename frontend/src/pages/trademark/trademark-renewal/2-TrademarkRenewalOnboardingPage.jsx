import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Check,
  Upload,
  Clock,
  Sparkles,
} from 'lucide-react';

import { RENEWAL_PACKAGES, RENEWAL_WINDOWS } from './constants.js';

export default function TrademarkRenewalOnboardingPage({
  formData = {},
  onBack,
  onProceedToPayment,
}) {
  const [subStep, setSubStep] = useState(1);

  // Step 1: Trademark Number or Brand Name
  const [trademarkNumber, setTrademarkNumber] = useState(
    formData.trademarkNumber || formData.applicationNumber || ''
  );
  const [trademarkNumberError, setTrademarkNumberError] = useState('');

  // Step 2: Renewal Timing Category
  const [renewalTiming, setRenewalTiming] = useState(
    formData.renewalTiming || 'timely'
  );

  // Step 3: Package Selection
  const [selectedPackageId, setSelectedPackageId] = useState(
    formData.packageId || 'standard'
  );

  const activePackage =
    RENEWAL_PACKAGES.find((p) => p.id === selectedPackageId) ||
    RENEWAL_PACKAGES[0];

  const professionalFee = activePackage.price;
  const onlineDiscount = 500;
  const discountedFee = Math.max(0, professionalFee - onlineDiscount);
  const gstOnFee = Math.round(discountedFee * 0.18);
  const totalAmount = discountedFee + gstOnFee;

  const handleNextStep1 = (e) => {
    if (e) e.preventDefault();
    if (!trademarkNumber.trim()) {
      setTrademarkNumberError('Please enter your Registered Trademark Number or Brand Name.');
      return;
    }
    setTrademarkNumberError('');
    setSubStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextStep2 = (e) => {
    if (e) e.preventDefault();
    setSubStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault();
    if (onProceedToPayment) {
      onProceedToPayment({
        ...formData,
        trademarkNumber: trademarkNumber.trim(),
        applicationNumber: trademarkNumber.trim(),
        renewalTiming,
        packageId: selectedPackageId,
        packageName: activePackage.name,
        professionalFee,
        onlineDiscount,
        discountedFee,
        gstOnFee,
        totalAmount,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-slate-800 flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden selection:bg-[#002B49] selection:text-white">
      {/* Decorative Stepped Pixels / Polygonal Corner Blocks */}
      <div className="absolute top-0 right-0 pointer-events-none select-none opacity-40">
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="180" y="0" width="80" height="80" fill="#E2E8F0" />
          <rect x="100" y="40" width="80" height="80" fill="#CBD5E1" />
          <rect x="180" y="80" width="80" height="80" fill="#94A3B8" opacity="0.35" />
          <rect x="20" y="80" width="80" height="80" fill="#E2E8F0" />
          <rect x="100" y="160" width="80" height="80" fill="#F1F5F9" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 pointer-events-none select-none opacity-40">
        <svg
          width="260"
          height="260"
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="180" width="80" height="80" fill="#E2E8F0" />
          <rect x="40" y="100" width="80" height="80" fill="#CBD5E1" />
          <rect x="0" y="40" width="80" height="80" fill="#94A3B8" opacity="0.35" />
          <rect x="100" y="20" width="80" height="80" fill="#F1F5F9" />
          <rect x="100" y="180" width="80" height="80" fill="#E2E8F0" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* LEFT COLUMN: Trust Stats & Value Props */}
          <div className="lg:col-span-6 space-y-6 lg:pr-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#002B49] tracking-tight leading-tight">
                30,000+ TM renewals executed
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium mt-2">
                Extend your brand&apos;s exclusive rights for the next 10 years smoothly
              </p>
            </div>

            <div className="space-y-5 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full border-[1.8px] border-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#002B49] stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                    Form TM-R filed within 24 hours
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                    Senior Trademark attorneys handle drafting, POA, and e-filing
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full border-[1.8px] border-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#002B49] stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                    Zero risk of abandonment
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                    Surcharge audit and restoration compliance under Section 25
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full border-[1.8px] border-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#002B49] stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                    Official 10-year validity endorsement
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                    Recorded in Trade Marks Journal with continuous legal monopoly
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#002B49] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Trademark Renewal Overview</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: White Form Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 sm:p-9 max-w-[480px] w-full min-h-[440px] flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center justify-center gap-1.5 mb-5">
                  <span className="bg-[#FDB813] text-black font-black text-xs px-2 py-0.5 rounded-xs tracking-wider uppercase">
                    BHARAT
                  </span>
                  <span className="text-[#002B49] font-black text-sm tracking-tight uppercase">
                    FILING
                  </span>
                </div>

                {/* Progress Header with 3 Segments */}
                <div className="space-y-1.5 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      {subStep}/3 complete
                    </span>
                    <span className="text-slate-400 font-medium">
                      Takes less than 1 min
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        subStep >= 1 ? 'bg-[#22c55e]' : 'bg-slate-200'
                      }`}
                    />
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        subStep >= 2 ? 'bg-[#22c55e]' : 'bg-slate-200'
                      }`}
                    />
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        subStep >= 3 ? 'bg-[#22c55e]' : 'bg-slate-200'
                      }`}
                    />
                  </div>
                </div>

                {/* SUB-STEP 1: Trademark Number or Brand Name */}
                {subStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm sm:text-[15px] font-bold text-slate-800 mb-2 leading-snug">
                        Registered Trademark Number OR Brand Name
                      </label>
                      <input
                        type="text"
                        value={trademarkNumber}
                        onChange={(e) => {
                          setTrademarkNumber(e.target.value);
                          if (trademarkNumberError) setTrademarkNumberError('');
                        }}
                        placeholder="e.g. 4392018 OR Brand Name"
                        className={`w-full border rounded-md px-3.5 py-2.5 text-sm sm:text-base text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#002B49] transition-all shadow-2xs ${
                          trademarkNumberError
                            ? 'border-red-400 bg-red-50/30'
                            : 'border-slate-300 bg-white'
                        }`}
                        autoFocus
                      />
                      {trademarkNumberError && (
                        <p className="text-xs text-red-600 font-semibold mt-1.5">
                          {trademarkNumberError}
                        </p>
                      )}
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        Enter your 7-digit trademark registration number from your TM-A certificate,
                        or brand name if you do not have the number handy.
                      </p>
                    </div>
                  </div>
                )}

                {/* SUB-STEP 2: Expiry Status / Timing */}
                {subStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm sm:text-[15px] font-bold text-slate-800 mb-2 leading-snug">
                        What is your trademark&apos;s current expiration status?
                      </label>
                      <div className="space-y-2">
                        {RENEWAL_WINDOWS.map((win) => {
                          const isSelected = renewalTiming === win.id;
                          return (
                            <button
                              key={win.id}
                              type="button"
                              onClick={() => setRenewalTiming(win.id)}
                              className={`w-full text-left p-3 rounded-md border text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                                isSelected
                                  ? 'border-slate-400 bg-[#E8EDF2] shadow-2xs'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                  isSelected
                                    ? 'border-[#002B49] bg-white'
                                    : 'border-slate-300'
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                                )}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 block">
                                  {win.title} ({win.timeline})
                                </span>
                                <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {win.description}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-STEP 3: Select Renewal Package */}
                {subStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm sm:text-[15px] font-bold text-slate-800 mb-2 leading-snug">
                        Choose your Trademark Renewal Package
                      </label>
                      <div className="space-y-2">
                        {RENEWAL_PACKAGES.map((pkg) => {
                          const isSelected = selectedPackageId === pkg.id;
                          return (
                            <button
                              key={pkg.id}
                              type="button"
                              onClick={() => setSelectedPackageId(pkg.id)}
                              className={`w-full text-left p-3 rounded-md border text-xs transition-all cursor-pointer flex items-center justify-between ${
                                isSelected
                                  ? 'border-[#002B49] bg-blue-50/40 shadow-2xs ring-1 ring-[#002B49]'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                    isSelected
                                      ? 'border-[#002B49] bg-[#002B49]'
                                      : 'border-slate-300'
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                  )}
                                </div>
                                <div>
                                  <span className="font-bold text-slate-900 block">
                                    {pkg.name}
                                  </span>
                                  <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                    {pkg.tagline}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right pl-2">
                                <span className="text-sm font-black text-slate-900 block">
                                  ₹{pkg.price}
                                </span>
                                <span className="text-[10px] text-slate-400 line-through">
                                  ₹{pkg.originalPrice}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Professional Legal Fee:</span>
                        <span className="font-semibold text-slate-800">₹{professionalFee}</span>
                      </div>
                      <div className="flex justify-between text-[#28A745] font-semibold">
                        <span>🎉 Online Discount:</span>
                        <span>-₹{onlineDiscount}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>GST @ 18%:</span>
                        <span className="font-semibold text-slate-800">₹{gstOnFee}</span>
                      </div>
                      <div className="border-t border-slate-200 pt-1.5 flex justify-between items-baseline font-black text-slate-900 text-sm">
                        <span>Total Payable:</span>
                        <span className="text-base text-[#002B49]">₹{totalAmount}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Bottom CTA Navigation */}
              <div className="pt-8 mt-auto">
                {subStep === 1 && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep1}
                      className="px-8 py-2.5 bg-[#002B49] hover:bg-[#001f35] text-white font-bold text-sm rounded-md flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {subStep === 2 && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSubStep(1)}
                      className="py-2.5 px-6 rounded-md border border-[#002B49] text-[#002B49] bg-white hover:bg-slate-50 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep2}
                      className="py-2.5 px-6 rounded-md bg-[#002B49] hover:bg-[#001f35] text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {subStep === 3 && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSubStep(2)}
                      className="py-2.5 px-6 rounded-md border border-[#002B49] text-[#002B49] bg-white hover:bg-slate-50 font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      className="py-2.5 px-6 rounded-md bg-[#002B49] hover:bg-[#001f35] text-white font-bold text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>Proceed to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
