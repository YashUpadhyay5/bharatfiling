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

import { OBJECTION_PACKAGES, OBJECTION_GROUNDS } from './constants.js';

export default function TrademarkObjectionCheckoutPage({
  formData = {},
  onBack,
  onProceedToPayment,
}) {
  // 3-step internal flow: 1 -> 2 -> 3
  const [subStep, setSubStep] = useState(1);

  // Step 1: Identifier (App No. or Brand Name)
  const [identifier, setIdentifier] = useState(
    formData.applicationNumber || formData.brandName || ''
  );
  const [identifierError, setIdentifierError] = useState('');

  // Step 2: Objection Ground & Notice Upload
  const [selectedGround, setSelectedGround] = useState(
    formData.objectionType || 'section_11'
  );
  const [uploadedFile, setUploadedFile] = useState(null);

  // Step 3: Package Selection
  const [selectedPackageId, setSelectedPackageId] = useState(
    formData.packageId || 'substantive'
  );

  const activePackage =
    OBJECTION_PACKAGES.find((p) => p.id === selectedPackageId) ||
    OBJECTION_PACKAGES[1]; // Substantive defense default

  const professionalFee = activePackage.price;
  const onlineDiscount = 500;
  const discountedFee = Math.max(0, professionalFee - onlineDiscount);
  const gstOnFee = Math.round(discountedFee * 0.18);
  const totalAmount = discountedFee + gstOnFee;

  // Handle Step 1 Next
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

  // Handle Step 2 Next
  const handleNextStep2 = (e) => {
    if (e) e.preventDefault();
    setSubStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle File Upload Simulation
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      });
    }
  };

  // Handle Proceed to Payment Desk (Step 3 Final)
  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault();
    if (onProceedToPayment) {
      onProceedToPayment({
        ...formData,
        applicationNumber: identifier.trim(),
        brandName: identifier.trim(),
        objectionType: selectedGround,
        packageId: selectedPackageId,
        packageName: activePackage.name,
        uploadedReportName: uploadedFile?.name || null,
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
      {/* Decorative Stepped Pixels / Polygonal Corner Blocks (matching media_1793257125351_a8d786bc.png) */}
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

                {/* Progress Bar Header */}
                <div className="space-y-1.5 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      {subStep}/3 complete
                    </span>
                    <span className="text-slate-400 font-medium">
                      Takes less than 1 min
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#22c55e] rounded-full transition-all duration-300 ease-out"
                      style={{
                        width:
                          subStep === 1
                            ? '33.33%'
                            : subStep === 2
                              ? '66.66%'
                              : '100%',
                      }}
                    />
                  </div>
                </div>

                {/* ======================================================= */}
                {/* SUB-STEP 1: Trademark Application No. OR Brand Name */}
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
                        className={`w-full border rounded-lg px-3.5 py-2.5 text-sm sm:text-base text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#002B49] transition-all shadow-2xs ${
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
                {/* SUB-STEP 2: Objection Grounds & Examination Notice */}
                {/* ======================================================= */}
                {subStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm sm:text-[15px] font-bold text-slate-800 mb-2 leading-snug">
                        What objection is raised in your Examination Report?
                      </label>
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {OBJECTION_GROUNDS.map((ground) => {
                          const isSelected = selectedGround === ground.id;
                          return (
                            <button
                              key={ground.id}
                              type="button"
                              onClick={() => setSelectedGround(ground.id)}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                                isSelected
                                  ? 'border-[#002B49] bg-blue-50/50 shadow-2xs'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
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
                                  {ground.section}: {ground.name}
                                </span>
                                <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {ground.severity} • {ground.description}
                                </span>
                              </div>
                            </button>
                          );
                        })}

                        {/* Option 4: Not Sure */}
                        <button
                          type="button"
                          onClick={() => setSelectedGround('not_sure')}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                            selectedGround === 'not_sure'
                              ? 'border-[#002B49] bg-blue-50/50 shadow-2xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              selectedGround === 'not_sure'
                                ? 'border-[#002B49] bg-[#002B49]'
                                : 'border-slate-300'
                            }`}
                          >
                            {selectedGround === 'not_sure' && (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">
                              I need help identifying the cited objection
                            </span>
                            <span className="text-[11px] text-slate-500 mt-0.5">
                              Our IP Counsel will review your notice report from IP India registry
                            </span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Examination Report Upload (Optional) */}
                    <div className="pt-1">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Upload Examination Report / Notice (Optional PDF or Image)
                      </label>
                      <label className="border border-dashed border-slate-300 hover:border-[#002B49] rounded-lg p-3 text-center block cursor-pointer bg-slate-50/70 hover:bg-slate-50 transition-colors">
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                          <Upload className="w-3.5 h-3.5 text-[#002B49]" />
                          <span className="font-semibold text-[#002B49]">
                            {uploadedFile ? uploadedFile.name : 'Click to attach report file'}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* ======================================================= */}
                {/* SUB-STEP 3: Defense Package Selection & Order Summary */}
                {/* ======================================================= */}
                {subStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm sm:text-[15px] font-bold text-slate-800 mb-2 leading-snug">
                        Choose your Legal Defense Package
                      </label>
                      <div className="space-y-2">
                        {OBJECTION_PACKAGES.map((pkg) => {
                          const isSelected = selectedPackageId === pkg.id;
                          return (
                            <button
                              key={pkg.id}
                              type="button"
                              onClick={() => setSelectedPackageId(pkg.id)}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition-all cursor-pointer flex items-center justify-between ${
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
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-slate-900">
                                      {pkg.name}
                                    </span>
                                    {pkg.popular && (
                                      <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                                        Popular
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-slate-500 block mt-0.5 line-clamp-1">
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

                    {/* Order Price Details Box */}
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
              <div className="pt-6 mt-4 flex items-center justify-between border-t border-slate-100">
                {subStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setSubStep((prev) => prev - 1)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    Step 1 of 3
                  </span>
                )}

                {subStep === 1 && (
                  <button
                    type="button"
                    onClick={handleNextStep1}
                    className="px-7 py-2.5 bg-[#002B49] hover:bg-[#001f35] text-white font-bold text-xs sm:text-sm rounded-lg flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {subStep === 2 && (
                  <button
                    type="button"
                    onClick={handleNextStep2}
                    className="px-7 py-2.5 bg-[#002B49] hover:bg-[#001f35] text-white font-bold text-xs sm:text-sm rounded-lg flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {subStep === 3 && (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="px-7 py-2.5 bg-[#002B49] hover:bg-[#001f35] text-white font-bold text-xs sm:text-sm rounded-lg flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
