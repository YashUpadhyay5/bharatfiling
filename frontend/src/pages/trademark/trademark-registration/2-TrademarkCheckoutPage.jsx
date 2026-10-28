import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Check,
  Info,
  Clock,
  Sparkles,
  Zap,
  Tag,
  Edit2,
  ChevronDown,
  ChevronUp,
  Lock,
  Building2,
  FileCheck,
  Award,
} from 'lucide-react';

import {
  PROTECTION_TYPES,
  BUSINESS_CATEGORIES,
  ONBOARDING_PLANS,
  NICE_CLASSES,
} from './constants.js';

export default function TrademarkCheckoutPage({
  formData = {},
  onBack,
  onProceedToPayment,
}) {
  // 3-step internal flow: 1 -> 2 -> 3
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Protection Type
  const [selectedProtection, setSelectedProtection] = useState(
    formData.protectionType || 'brand_name_logo'
  );

  // Step 2: Business Category & Classes
  const [selectedCategory, setSelectedCategory] = useState(
    formData.businessCategory || 'packaged_food'
  );
  const [showHowClassesWork, setShowHowClassesWork] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState(
    formData.selectedClasses || [30]
  );

  // Step 3: Plan Selection
  const [selectedPlanId, setSelectedPlanId] = useState(
    formData.planId || 'standard'
  );

  // Find active category
  const activeCategory =
    BUSINESS_CATEGORIES.find((c) => c.id === selectedCategory) ||
    BUSINESS_CATEGORIES[7]; // Packaged Food default

  // Find active plan
  const activePlan =
    ONBOARDING_PLANS.find((p) => p.id === selectedPlanId) ||
    ONBOARDING_PLANS[0];

  // Handle category switch
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    const cat = BUSINESS_CATEGORIES.find((c) => c.id === catId);
    if (cat && !selectedClasses.includes(cat.recommendedClass)) {
      setSelectedClasses([cat.recommendedClass]);
    }
  };

  // Toggle class selection
  const handleToggleClass = (classId) => {
    if (selectedClasses.includes(classId)) {
      if (selectedClasses.length > 1) {
        setSelectedClasses(selectedClasses.filter((id) => id !== classId));
      }
    } else {
      setSelectedClasses([...selectedClasses, classId]);
    }
  };

  // Handle Pay Now submission
  const handlePayNow = () => {
    const classCount = selectedClasses.length;
    const professionalFee = activePlan.price * classCount;
    const gstOnFee = Math.round(professionalFee * 0.18);
    const govtFeePerClass = 4500; // Individual/MSME default
    const totalGovtFee = govtFeePerClass * classCount;
    const totalAmount = professionalFee + gstOnFee + totalGovtFee;

    const checkoutPayload = {
      ...formData,
      protectionType: selectedProtection,
      businessCategory: selectedCategory,
      selectedClasses,
      classCount,
      planId: selectedPlanId,
      planName: activePlan.name,
      professionalFee,
      gstOnFee,
      govtFeePerClass,
      totalGovtFee,
      totalAmount,
    };

    if (onProceedToPayment) {
      onProceedToPayment(checkoutPayload);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* =========================================================================
          LEFT COLUMN: Top Brands Social Proof & HUD Illustration (approx 40% width)
          ========================================================================= */}
      <div className="lg:w-[42%] bg-[#002B49] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden select-none">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

        <div className="space-y-8 relative z-10">
          {/* Brand Logo Header */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-white flex items-center">
              Bharat<span className="text-amber-400">Filing</span>
            </span>
            <span className="text-[10px] font-bold bg-white/10 text-white px-2 py-0.5 rounded uppercase tracking-wider ml-2">
              TM Desk
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight leading-snug">
              We did Trademark for Top brands
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-amber-400">
              Why not yours?
            </h2>
          </div>

          {/* Trusted Brand Logos Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl flex items-center justify-between gap-3 flex-wrap">
            {/* Swiggy */}
            <div className="flex items-center gap-1.5 font-black text-xs text-[#FC8019] tracking-wider">
              <span className="text-base">📍</span> SWIGGY
            </div>

            {/* CaratLane */}
            <div className="flex items-center gap-1 font-bold text-xs text-purple-900 tracking-wide">
              <span>💍</span> CARATLANE
            </div>

            {/* mCaffeine */}
            <div className="flex items-center gap-1 font-black text-xs text-emerald-700">
              <span>☕</span> mCaffeine
            </div>

            {/* VAYA */}
            <div className="flex items-center gap-1 font-black text-xs text-teal-700 tracking-wider">
              <span>🍃</span> VAYA
            </div>

            {/* CavinKare */}
            <div className="flex items-center gap-1 font-bold text-xs text-blue-700">
              <span>🛡️</span> CavinKare
            </div>
          </div>

          {/* Professional Illustration with Tech HUD Overlays */}
          <div className="pt-4 relative max-w-md mx-auto lg:mx-0">
            {/* Glowing Backdrop */}
            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-blue-600/20 mx-auto blur-xl absolute inset-0 -z-10" />

            {/* Advocate Illustration Card */}
            <div className="relative rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md shadow-2xl space-y-4">
              {/* TM Protection Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center font-black text-sm text-amber-300">
                    TM
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Brand Protection</div>
                    <div className="text-[10px] text-blue-200">Legal Security • Business Growth</div>
                  </div>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Live HUD Process Card */}
              <div className="bg-[#001f35]/90 rounded-xl p-4 border border-blue-400/20 text-xs space-y-2.5 shadow-inner">
                <div className="font-bold text-blue-300 text-[11px] uppercase tracking-wider flex items-center justify-between">
                  <span>Process</span>
                  <span className="text-[10px] text-slate-400 font-mono">10 Oct 2026</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Payment Confirmed</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Documents Uploaded</span>
                  </div>
                  <div className="flex items-center justify-between bg-blue-900/40 p-1.5 rounded border border-blue-400/30">
                    <div className="flex items-center gap-2 text-amber-300 font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span>Document Verification</span>
                    </div>
                    <span className="text-[9px] bg-amber-400 text-slate-900 font-extrabold px-1.5 py-0.5 rounded">
                      In Progress
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 pl-3.5">
                    We are verifying your documents
                  </div>
                </div>
              </div>

              {/* Bottom Trust Indicators */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-blue-200 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Legal Protection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  <span>Customer Trust</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reassurance footer */}
        <div className="pt-8 text-xs text-blue-200/80 font-medium flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>India’s Leading ISO 27001 Certified Trademark Filing Portal</span>
        </div>
      </div>

      {/* =========================================================================
          RIGHT COLUMN: 3-Step Interactive Onboarding (approx 58% width)
          ========================================================================= */}
      <div className="lg:w-[58%] bg-white p-6 sm:p-10 lg:p-14 flex flex-col justify-between">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          {/* Top Progress Stepper (Matching Screenshot: 3 segments) */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700">
              {currentStep === 1 && '1/3'}
              {currentStep === 2 && 'Step 2 of 3'}
              {currentStep === 3 && '3/3'}
            </div>

            {/* 3 Progress Bars */}
            <div className="grid grid-cols-3 gap-2">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep >= 1 ? 'bg-[#002B49]' : 'bg-slate-200'
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep >= 2 ? 'bg-[#002B49]' : 'bg-slate-200'
                }`}
              />
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStep >= 3 ? 'bg-[#002B49]' : 'bg-slate-200'
                }`}
              />
            </div>
          </div>

          {/* =====================================================================
              SUB-STEP 1: What would you like to protect? (media_1793183075808_0b00f1d1.png)
              ===================================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                What would you like to protect?
              </h2>

              <div className="space-y-3.5">
                {PROTECTION_TYPES.map((opt) => {
                  const isSelected = selectedProtection === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedProtection(opt.id)}
                      className={`p-4 sm:p-5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-slate-800 ring-1 ring-slate-800 bg-slate-50/60 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {/* Left Radio & Labels */}
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'border-[#002B49] bg-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#002B49]" />
                          )}
                        </div>

                        <div>
                          <div className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                            {opt.title}
                          </div>
                          {opt.subtitle && (
                            <div className="text-xs text-slate-500 mt-0.5 font-normal">
                              {opt.subtitle}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Visual Example Preview */}
                      <div className="shrink-0 text-right pr-2">
                        {opt.previewType === 'text' && (
                          <span className="font-black italic text-lg sm:text-xl tracking-tighter text-slate-800">
                            NIKE<sup className="text-[10px] font-normal not-italic ml-0.5">TM</sup>
                          </span>
                        )}

                        {opt.previewType === 'logo_text' && (
                          <div className="flex items-center gap-1.5">
                            {/* Stylized Swoosh SVG */}
                            <svg className="w-6 h-6 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M21.707 5.293a1 1 0 0 0-1.414 0l-11 11a1 1 0 0 1-1.414 0l-3.586-3.586a1 1 0 1 0-1.414 1.414l3.586 3.586a3 3 0 0 0 4.242 0l11-11a1 1 0 0 0 0-1.414z" />
                            </svg>
                            <span className="font-black italic text-lg tracking-tighter text-slate-800">
                              NIKE<sup className="text-[10px] font-normal not-italic ml-0.5">TM</sup>
                            </span>
                          </div>
                        )}

                        {opt.previewType === 'logo_only' && (
                          <div className="flex items-center gap-1">
                            <svg className="w-8 h-8 text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M21.707 5.293a1 1 0 0 0-1.414 0l-11 11a1 1 0 0 1-1.414 0l-3.586-3.586a1 1 0 1 0-1.414 1.414l3.586 3.586a3 3 0 0 0 4.242 0l11-11a1 1 0 0 0 0-1.414z" />
                            </svg>
                            <span className="text-[10px] text-slate-500 font-bold">TM</span>
                          </div>
                        )}

                        {opt.previewType === 'slogan' && (
                          <span className="italic font-serif text-sm sm:text-base text-slate-700">
                            Just do it
                          </span>
                        )}

                        {opt.previewType === 'other' && (
                          <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded">
                            Audio / Motif
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Next Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-bold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              SUB-STEP 2: What does your business do? (media_1793183093987_0196eaaa.png)
              ===================================================================== */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  What does your business do?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-normal">
                  Pick your category and we will select the right trademark class for you.
                </p>
              </div>

              {/* Business Categories Selection Pills */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-700">
                  Choose your business category
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {BUSINESS_CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat.id)}
                        className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-[#002B49] text-white border-[#002B49] shadow-xs font-bold flex items-center gap-1.5'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Expandable Info Pill: How do trademark classes work? */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setShowHowClassesWork(!showHowClassesWork)}
                  className="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>How do trademark classes work?</span>
                  </div>
                  {showHowClassesWork ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {showHowClassesWork && (
                  <div className="p-4 pt-1 text-xs text-slate-600 border-t border-slate-200 bg-white leading-relaxed space-y-1.5">
                    <p>
                      The Trade Marks Registry uses the <strong>Nice Classification</strong> system
                      dividing all commercial activities into <strong>45 classes</strong> (Classes 1–34
                      for goods, Classes 35–45 for services).
                    </p>
                    <p className="text-slate-500">
                      Trademark rights apply strictly to the classes you register under. Filing in
                      the correct class guarantees full legal monopoly against counterfeiters in
                      your sector.
                    </p>
                  </div>
                )}
              </div>

              {/* Recommended Trademark Class Card */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Your recommended trademark class
                  </label>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {selectedClasses.length} class selected
                  </span>
                </div>

                <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-white shadow-xs space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedClasses.includes(activeCategory.recommendedClass)}
                        onChange={() => handleToggleClass(activeCategory.recommendedClass)}
                        className="w-4 h-4 rounded text-[#002B49] focus:ring-[#002B49] cursor-pointer"
                      />
                      <div className="font-extrabold text-base text-slate-900">
                        {activeCategory.className}
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded">
                      Recommended
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 pl-7 leading-relaxed font-normal">
                    {activeCategory.classTitle}
                  </p>
                </div>
              </div>

              {/* Also Protect Your Brand In (Cross-protection upsell) */}
              <div className="space-y-2.5 pt-1">
                <div>
                  <h3 className="text-xs font-bold text-slate-700">Also protect your brand in</h3>
                  <p className="text-[11px] text-slate-500">
                    Adding these classes makes your brand exclusive and protects it from competitors.
                  </p>
                </div>

                <div className="space-y-2">
                  {activeCategory.alsoProtectIn.map((item) => {
                    const isAdded = selectedClasses.includes(item.classId);
                    return (
                      <div
                        key={item.classId}
                        onClick={() => handleToggleClass(item.classId)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                          isAdded
                            ? 'border-emerald-600 bg-emerald-50/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isAdded}
                            onChange={() => {}}
                            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-600 cursor-pointer"
                          />
                          <div>
                            <span className="font-bold text-xs text-slate-900">{item.name}</span>
                            <span className="text-[11px] text-slate-500 ml-2">{item.desc}</span>
                          </div>
                        </div>
                        <span
                          className={`text-xs font-bold ${
                            isAdded ? 'text-emerald-700' : 'text-blue-600'
                          }`}
                        >
                          {isAdded ? '✓ Added' : '+ Add'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: Back & Next */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3.5 border border-slate-300 rounded-lg text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="flex-1 bg-[#002B49] hover:bg-[#001f35] text-white font-bold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              SUB-STEP 3: Choose right plan for brand protection (media_1793183120010_c7ac938d.png)
              ===================================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Choose right plan for brand protection
              </h2>

              {/* Plan 1: Standard Plan */}
              <div
                onClick={() => setSelectedPlanId('standard')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                  selectedPlanId === 'standard'
                    ? 'border-slate-800 ring-1 ring-slate-800 bg-white shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedPlanId === 'standard'
                          ? 'border-[#002B49]'
                          : 'border-slate-300'
                      }`}
                    >
                      {selectedPlanId === 'standard' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#002B49]" />
                      )}
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-base">Standard - </span>
                      <span className="text-xs font-semibold text-slate-600">
                        ⌛ Filing within 24 hours
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline gap-1.5 justify-end">
                      <span className="line-through text-slate-400 text-xs font-medium">₹1999</span>
                      <span className="text-lg font-black text-slate-900">₹1199</span>
                      <span className="text-[11px] text-slate-500 font-medium">/class</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">+ Govt. Fee</div>
                  </div>
                </div>

                {/* Offer notice badge */}
                <div className="flex items-center gap-2 bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs px-3 py-2 rounded-lg font-medium">
                  <Tag className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Great news! You're eligible for a <strong>₹800 discount</strong> as part of our
                    limited-time offer.
                  </span>
                </div>
              </div>

              {/* Plan 2: Express Plan */}
              <div
                onClick={() => setSelectedPlanId('express')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                  selectedPlanId === 'express'
                    ? 'border-slate-800 ring-1 ring-slate-800 bg-white shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        selectedPlanId === 'express'
                          ? 'border-[#002B49]'
                          : 'border-slate-300'
                      }`}
                    >
                      {selectedPlanId === 'express' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#002B49]" />
                      )}
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-base">Express - </span>
                      <span className="text-xs font-semibold text-slate-600">
                        ⚡ Filing within 6 hours
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline gap-1.5 justify-end">
                      <span className="line-through text-slate-400 text-xs font-medium">₹2999</span>
                      <span className="text-lg font-black text-slate-900">₹1999</span>
                      <span className="text-[11px] text-slate-500 font-medium">/class</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">+ Govt. Fee</div>
                  </div>
                </div>

                {/* Offer notice badge */}
                <div className="flex items-center gap-2 bg-amber-50/70 border border-amber-200/60 text-amber-900 text-xs px-3 py-2 rounded-lg font-medium">
                  <Tag className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Great news! You're eligible for a <strong>₹1000 discount</strong> as part of our
                    limited-time offer.
                  </span>
                </div>
              </div>

              {/* Number of Class Selected */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <span>Number of Class Selected ({selectedClasses.length})</span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-slate-400 hover:text-slate-700 cursor-pointer"
                      title="Edit selected classes"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </label>
                </div>

                {/* Class selector pills */}
                <div className="flex flex-wrap gap-2">
                  {selectedClasses.map((clsId) => (
                    <div
                      key={clsId}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-800"
                    >
                      <span>Class {clsId}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  ))}
                </div>

                {/* Helpful Note Box */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 font-normal">
                  <strong>Note:</strong> Our experts will call you within your selected time range
                  for the consultation.
                </div>
              </div>

              {/* Action Buttons: Back & Pay Now */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3.5 border border-slate-300 rounded-lg text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handlePayNow}
                  className="flex-1 bg-[#002B49] hover:bg-[#001f35] text-white font-bold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <span>Pay Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Global Bottom Note */}
        <div className="text-center text-[11px] text-slate-400 font-medium pt-8">
          🔒 256-Bit SSL Encrypted • ISO 27001 Certified • Trade Marks Registry Partner
        </div>
      </div>
    </div>
  );
}
