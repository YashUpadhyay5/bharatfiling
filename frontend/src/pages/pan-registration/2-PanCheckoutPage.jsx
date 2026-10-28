import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  Lock,
  BadgeCheck,
  CreditCard,
  Sparkles,
  HelpCircle,
  FileCheck2,
  Users,
} from 'lucide-react';
import { PAN_PLANS } from './constants.js';

export default function PanCheckoutPage({
  formData = {},
  onSelectPlan,
  onBack,
}) {
  const [selectedPlanId, setSelectedPlanId] = useState(formData.plan || 'standard');
  const [addonDsc, setAddonDsc] = useState(Boolean(formData.addonDsc));
  const [addonAffidavit, setAddonAffidavit] = useState(Boolean(formData.addonAffidavit));

  const applicantName = formData.name || 'Yash Upadhyay';
  const applicantPhone = formData.phone || '+91 7668976193';
  const entityType = (formData.entityType || 'individual').toUpperCase();
  const deliveryState = formData.state || 'Karnataka';

  const handleProceed = (planId) => {
    setSelectedPlanId(planId);
    if (onSelectPlan) {
      onSelectPlan(planId, {
        addonDsc,
        addonAffidavit,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#002B49] selection:text-white">
      
      {/* TOP HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="p-1.5 -ml-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-[#002B49]">
                Bharat<span className="text-[#F26522]">Filing</span>
              </span>
              <span className="text-[10px] bg-blue-50 text-[#002B49] font-bold px-2 py-0.5 rounded uppercase tracking-wider hidden sm:inline">
                PAN Desk
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Step 2 of 3: Plan Selection</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* APPLICANT PROFILE SUMMARY STRIP */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase">
              Applicant Profile Verified
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              PAN Application for: <span className="text-[#002B49]">{applicantName}</span>
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span>Category: <strong className="text-slate-700">{entityType}</strong></span>
              <span>State: <strong className="text-slate-700">{deliveryState}</strong></span>
              <span>Mobile: <strong className="text-slate-700 font-mono">{applicantPhone}</strong></span>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="text-xs font-bold text-[#002B49] hover:underline self-start md:self-center"
          >
            Edit Profile Details ✎
          </button>
        </div>

        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Choose Your Delivery Format
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Select Your PAN Registration Package
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Official government e-PAN PDF with QR code and optional high-security embossed PVC plastic card delivered via SpeedPost.
          </p>
        </div>

        {/* 3-COLUMN PRICING CARDS (1:1 MATCH OF SCREENSHOT media_1793171735368_c0cf7cef.png) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-2">
          
          {PAN_PLANS.map((plan) => {
            const isRecommended = plan.recommended;

            return (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                  isRecommended
                    ? 'bg-[#002B49] text-white shadow-2xl ring-2 ring-[#002B49] scale-102 z-10'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Gold Recommended Ribbon on Top */}
                {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFCC00] text-slate-950 text-[11px] font-extrabold uppercase px-4 py-1 rounded-full shadow-md tracking-wider flex items-center gap-1 select-none">
                    <span>★</span> RECOMMENDED
                  </div>
                )}

                <div className="space-y-5">
                  
                  {/* Card Title & Subtitle */}
                  <div>
                    <h3 className={`text-lg font-bold leading-snug ${isRecommended ? 'text-white' : 'text-slate-900'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs mt-1.5 leading-relaxed ${isRecommended ? 'text-blue-200' : 'text-slate-500'}`}>
                      {plan.subtitle}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className={`pt-3 border-t ${isRecommended ? 'border-blue-800/60' : 'border-slate-100'}`}>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-3xl sm:text-4xl font-black tracking-tight ${isRecommended ? 'text-white' : 'text-slate-950'}`}>
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className={`text-xs line-through ${isRecommended ? 'text-blue-300' : 'text-slate-400'}`}>
                        ₹{plan.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        isRecommended ? 'bg-blue-900/80 text-[#FFCC00]' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {plan.discountLabel}
                      </span>
                    </div>
                    <span className={`text-[11px] block mt-1 ${isRecommended ? 'text-blue-200' : 'text-slate-500'}`}>
                      + 18% GST • Delivery in {plan.tat}
                    </span>
                  </div>

                  {/* Checklist Features */}
                  <ul className="space-y-3 pt-4 text-xs">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isRecommended ? 'text-[#FFCC00]' : 'text-emerald-600'
                        }`} />
                        <span className={`leading-relaxed ${isRecommended ? 'text-blue-100' : 'text-slate-700'}`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Primary Proceed CTA Button */}
                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => handleProceed(plan.id)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                      isRecommended
                        ? 'bg-[#FFCC00] hover:bg-amber-400 text-slate-950 font-extrabold shadow-amber-900/20'
                        : 'bg-[#002B49] hover:bg-[#001D33] text-white shadow-slate-900/10'
                    }`}
                  >
                    <span>
                      {plan.id === 'starter'
                        ? 'Proceed with e-PAN →'
                        : plan.id === 'standard'
                        ? 'Proceed with Physical Card →'
                        : 'Proceed with Combo →'}
                    </span>
                  </button>
                </div>

              </div>
            );
          })}

        </div>

        {/* OPTIONAL ADDONS SECTION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <Sparkles className="w-4 h-4 text-[#F26522]" />
            <span>Recommended Compliance Add-ons (Optional)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            {/* Addon 1: Class 3 DSC */}
            <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
              addonDsc ? 'border-[#002B49] bg-blue-50/40' : 'border-slate-200 hover:border-slate-300'
            }`}>
              <input
                type="checkbox"
                checked={addonDsc}
                onChange={(e) => setAddonDsc(e.target.checked)}
                className="w-4 h-4 rounded text-[#002B49] focus:ring-[#002B49] border-slate-300 mt-0.5"
              />
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Class 3 Digital Signature (DSC) USB Token</span>
                  <span className="text-[#002B49] font-mono font-bold">+₹1,499</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  2-year validity Class 3 cryptographic token required for director signing, MCA filings, and GST returns.
                </p>
              </div>
            </label>

            {/* Addon 2: Name Mismatch Affidavit */}
            <label className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
              addonAffidavit ? 'border-[#002B49] bg-blue-50/40' : 'border-slate-200 hover:border-slate-300'
            }`}>
              <input
                type="checkbox"
                checked={addonAffidavit}
                onChange={(e) => setAddonAffidavit(e.target.checked)}
                className="w-4 h-4 rounded text-[#002B49] focus:ring-[#002B49] border-slate-300 mt-0.5"
              />
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Name Mismatch &amp; Legal Affidavit Support</span>
                  <span className="text-[#002B49] font-mono font-bold">+₹499</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  Legal notary affidavit drafting in case of spelling discrepancy between Aadhaar and school/marriage certificates.
                </p>
              </div>
            </label>

          </div>
        </div>

        {/* SECURITY & TRUST FOOTER */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BadgeCheck className="w-4 h-4 text-blue-600" />
            <span>Protean (NSDL) / UTIITSL Authorized Submission</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>100% Transparent Billing • GST Invoices Provided</span>
          </div>
        </div>

      </main>

    </div>
  );
}
