import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Check,
  Upload,
  FileText,
  AlertTriangle,
  Scale,
  Sparkles,
} from 'lucide-react';

import { OBJECTION_GROUNDS, OBJECTION_PACKAGES } from './constants.js';

export default function TrademarkObjectionCheckoutPage({
  formData = {},
  onBack,
  onProceedToPayment,
}) {
  // 3-step onboarding flow: 1/3 -> 2/3 -> 3/3 (matching media_1793257125351_a8d786bc.png & media_1793257284316_a774657a.png)
  const [subStep, setSubStep] = useState(1);

  // Step 1: Identifier (App No. or Brand Name)
  const [identifier, setIdentifier] = useState(
    formData.applicationNumber || formData.brandName || 'i7q3r7325'
  );
  const [identifierError, setIdentifierError] = useState('');

  // Step 2: Objection Grounds (Section 11 / 9 / Formalities / Not sure)
  const [selectedGround, setSelectedGround] = useState(
    formData.objectionType || 'section_11'
  );

  // Step 3: Brand Documents (Yes / No / Need help - matching media_1793257284316_a774657a.png)
  const [hasDocuments, setHasDocuments] = useState(
    formData.hasDocuments || 'no' // 'no' is selected in the screenshot
  );

  // Selected Legal Package (default substantive ₹2,999)
  const [selectedPackageId, setSelectedPackageId] = useState(
    formData.packageId || 'substantive'
  );

  const activePackage =
    OBJECTION_PACKAGES.find((p) => p.id === selectedPackageId) ||
    OBJECTION_PACKAGES[1];

  const professionalFee = activePackage.price;
  const onlineDiscount = 500;
  const discountedFee = Math.max(0, professionalFee - onlineDiscount);
  const gstOnFee = Math.round(discountedFee * 0.18);
  const totalAmount = discountedFee + gstOnFee;

  // Handle Step 1 -> Step 2
  const handleNextStep1 = (e) => {
    if (e) e.preventDefault();
    if (!identifier.trim()) {
      setIdentifierError('Please enter your Trademark Application No. or Brand Name.');
      return;
    }
    setIdentifierError('');
    setSubStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Step 2 -> Step 3
  const handleNextStep2 = (e) => {
    if (e) e.preventDefault();
    setSubStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Step 3 -> Proceed to Payment Desk
  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault();
    if (onProceedToPayment) {
      onProceedToPayment({
        ...formData,
        applicationNumber: identifier.trim(),
        brandName: identifier.trim(),
        objectionType: selectedGround,
        hasDocuments,
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
      {/* Decorative Stepped Pixels / Polygonal Corner Blocks (matching screenshot) */}
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
          {/* ========================================================= */}
          {/* LEFT COLUMN: Trust Stats & Value Props (1:1 with Screenshot) */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 space-y-6 lg:pr-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#002B49] tracking-tight leading-tight">
                75,000+ TM objections handled
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-medium mt-2">
                Our in-house experts mange formalities smoothly
              </p>
            </div>

            <div className="space-y-5 pt-2">
              {/* Value Prop 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full border-[1.8px] border-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#002B49] stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                    Respond to TM objection in under 3 business days
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                    With our experts it&apos;s simpler, faster &amp; easier
                  </p>
                </div>
              </div>

              {/* Value Prop 2 */}
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full border-[1.8px] border-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#002B49] stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                    24x7 expert support
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                    Minimize challenges &amp; maximize productivity
                  </p>
                </div>
              </div>

              {/* Value Prop 3 */}
              <div className="flex items-start gap-3.5">
                <div className="w-5 h-5 rounded-full border-[1.8px] border-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#002B49] stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
                    100% online process
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                    Senior IP lawyers handle your objections
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Overview Link */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#002B49] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Trademark Objection Overview</span>
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: White Form Card (1:1 with Screenshot) */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 sm:p-9 max-w-[480px] w-full min-h-[440px] flex flex-col justify-between transition-all">
              {/* Card Top: Brand Logo */}
              <div>
                <div className="flex items-center justify-center gap-1.5 mb-5">
                  <span className="bg-[#FDB813] text-black font-black text-xs px-2 py-0.5 rounded-xs tracking-wider uppercase">
                    BHARAT
                  </span>
                  <span className="text-[#002B49] font-black text-sm tracking-tight uppercase">
                    FILING
                  </span>
                </div>

                {/* Progress Bar Header with 3 Discrete Segmented Lines (Exact match of screenshot) */}
                <div className="space-y-1.5 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      {subStep}/3 complete
                    </span>
                    <span className="text-slate-400 font-medium">
                      Takes less than 1 min
                    </span>
                  </div>
                  {/* 3 Discrete Progress Line Segments */}
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {/* Segment 1 */}
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        subStep >= 1 ? 'bg-[#22c55e]' : 'bg-slate-200'
                      }`}
                    />
                    {/* Segment 2 */}
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        subStep >= 2 ? 'bg-[#22c55e]' : 'bg-slate-200'
                      }`}
                    />
                    {/* Segment 3 */}
                    <div
                      className={`h-1 rounded-full transition-all duration-300 ${
                        subStep >= 3 ? 'bg-[#22c55e]' : 'bg-slate-200'
                      }`}
                    />
                  </div>
                </div>

                {/* ======================================================= */}
                {/* SUB-STEP 1: Trademark Application No. OR Brand Name */}
                {/* (Matches media_1793257125351_a8d786bc.png) */}
                {/* ======================================================= */}
                {subStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm sm:text-[15px] font-bold text-slate-800 mb-2 leading-snug">
                        Trademark Application No. (if available) OR Brand Name
                      </label>
                      <input
                        type="text"
                        value={identifier}
                        onChange={(e) => {
                          setIdentifier(e.target.value);
                          if (identifierError) setIdentifierError('');
                        }}
                        placeholder="e.g. 5839201 OR Brand Name"
                        className={`w-full border rounded-md px-3.5 py-2.5 text-sm sm:text-base text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#002B49] transition-all shadow-2xs ${
                          identifierError
                            ? 'border-red-400 bg-red-50/30'
                            : 'border-slate-300 bg-white'
                        }`}
                        autoFocus
                      />
                      {identifierError && (
                        <p className="text-xs text-red-600 font-semibold mt-1.5">
                          {identifierError}
                        </p>
                      )}
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        Enter your 7-digit application number from the IP India examination notice,
                        or brand name if you do not have the number ready.
                      </p>
                    </div>
                  </div>
                )}

                {/* ======================================================= */}
                {/* SUB-STEP 2: Objection Grounds Cited */}
                {/* ======================================================= */}
                {subStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm sm:text-[15px] font-bold text-slate-800 mb-2 leading-snug">
                        What type of objection is mentioned in your examination report?
                      </label>
                      <div className="space-y-2">
                        {OBJECTION_GROUNDS.map((ground) => {
                          const isSelected = selectedGround === ground.id;
                          return (
                            <button
                              key={ground.id}
                              type="button"
                              onClick={() => setSelectedGround(ground.id)}
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
                                  {ground.section}: {ground.name}
                                </span>
                                <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {ground.severity} • {ground.description}
                                </span>
                              </div>
                            </button>
                          );
                        })}

                        {/* Option: Not Sure */}
                        <button
                          type="button"
                          onClick={() => setSelectedGround('not_sure')}
                          className={`w-full text-left p-3 rounded-md border text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                            selectedGround === 'not_sure'
                              ? 'border-slate-400 bg-[#E8EDF2] shadow-2xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              selectedGround === 'not_sure'
                                ? 'border-[#002B49] bg-white'
                                : 'border-slate-300'
                            }`}
                          >
                            {selectedGround === 'not_sure' && (
                              <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">
                              I need help identifying the cited objection
                            </span>
                            <span className="text-[11px] text-slate-500 mt-0.5">
                              Our Senior IP Counsel will review your notice report from IP India
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ======================================================= */}
                {/* SUB-STEP 3: Brand Documents Question (1:1 with media_1793257284316_a774657a.png) */}
                {/* ======================================================= */}
                {subStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm sm:text-[15px] font-bold text-slate-900 mb-3 leading-snug">
                        Do you have any documents for your brand (invoices, ads, or website)?
                      </label>

                      {/* 3 Radio Options */}
                      <div className="space-y-2.5">
                        {/* Option 1: Yes */}
                        <button
                          type="button"
                          onClick={() => setHasDocuments('yes')}
                          className={`w-full text-left p-3.5 rounded-md border text-sm font-semibold transition-all cursor-pointer flex items-center gap-3 ${
                            hasDocuments === 'yes'
                              ? 'border-slate-400 bg-[#E8EDF2] text-slate-900 shadow-2xs'
                              : 'border-slate-300 hover:border-slate-400 bg-white text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              hasDocuments === 'yes'
                                ? 'border-[#002B49] bg-white'
                                : 'border-slate-400'
                            }`}
                          >
                            {hasDocuments === 'yes' && (
                              <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                            )}
                          </div>
                          <span>Yes</span>
                        </button>

                        {/* Option 2: No (Default selected in screenshot) */}
                        <button
                          type="button"
                          onClick={() => setHasDocuments('no')}
                          className={`w-full text-left p-3.5 rounded-md border text-sm font-semibold transition-all cursor-pointer flex items-center gap-3 ${
                            hasDocuments === 'no'
                              ? 'border-slate-400 bg-[#E8EDF2] text-slate-900 shadow-2xs'
                              : 'border-slate-300 hover:border-slate-400 bg-white text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              hasDocuments === 'no'
                                ? 'border-[#002B49] bg-white'
                                : 'border-slate-400'
                            }`}
                          >
                            {hasDocuments === 'no' && (
                              <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                            )}
                          </div>
                          <span>No</span>
                        </button>

                        {/* Option 3: Need help */}
                        <button
                          type="button"
                          onClick={() => setHasDocuments('need_help')}
                          className={`w-full text-left p-3.5 rounded-md border text-sm font-semibold transition-all cursor-pointer flex items-center gap-3 ${
                            hasDocuments === 'need_help'
                              ? 'border-slate-400 bg-[#E8EDF2] text-slate-900 shadow-2xs'
                              : 'border-slate-300 hover:border-slate-400 bg-white text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              hasDocuments === 'need_help'
                                ? 'border-[#002B49] bg-white'
                                : 'border-slate-400'
                            }`}
                          >
                            {hasDocuments === 'need_help' && (
                              <div className="w-2 h-2 rounded-full bg-[#002B49]" />
                            )}
                          </div>
                          <span>Need help</span>
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                        Commercial invoices, domain registration, and social media ads strengthen
                        the User Affidavit by proving prior use under Section 12.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Bottom CTA Navigation (1:1 matching screenshot button layout) */}
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
                      <span>Next</span>
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
