import React, { useState } from 'react';
import { ArrowLeft, Check, ShieldCheck, Sparkles, Building, Lock } from 'lucide-react';
import { PF_PLANS } from './constants.js';

export default function PfCheckoutPage({ formData = {}, onSelectPlan, onBack, isEsi = false }) {
  const [selectedPlanId, setSelectedPlanId] = useState(
    formData.plan || (isEsi ? 'combo' : 'standard')
  );

  const handleProceed = (planId) => {
    const plan = PF_PLANS.find((p) => p.id === planId) || PF_PLANS[1];
    if (onSelectPlan) {
      onSelectPlan(planId, {
        subtotal: plan.price,
        gstAmount: Math.round(plan.price * 0.18),
        grandTotal: plan.price + Math.round(plan.price * 0.18),
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 sm:py-16 text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Back Navigation Button */}
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Establishment Details</span>
        </button>

        {/* Page Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#002B49] bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
            Step 3 of 4 • Select Statutory Plan
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002B49] mt-3 tracking-tight">
            Choose the Right EPF Plan for Your Business
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Zero government fees for registration. All packages include expert Labour Law CA review and 15-digit code issuance.
          </p>
        </div>

        {/* 3-COLUMN PRICING GRID (Exact 1:1 match of Screenshot media_1793100921245_537a9248.png) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4">
          
          {/* ------------------------------------------------------------- */}
          {/* CARD 1: STARTER (EPF Allotment) */}
          {/* ------------------------------------------------------------- */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              {/* Card Title & Subtitle */}
              <h3 className="text-xl font-bold text-slate-900">Starter</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                Ideal for starting EPF registration and 15-digit code allotment
              </p>

              {/* Price Row */}
              <div className="my-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-400 line-through">₹2,999</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    ₹1,000 off
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">₹1,999</span>
                  <span className="text-xs font-semibold text-slate-500">+ Govt. Fee (₹0)</span>
                </div>
              </div>

              {/* Primary Dark Navy CTA Button */}
              <button
                type="button"
                onClick={() => handleProceed('starter')}
                className="w-full py-3 px-4 rounded-xl bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-bold text-sm shadow-sm transition cursor-pointer text-center"
              >
                Proceed to Pay
              </button>

              {/* What You'll Get Features List */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                  What You&apos;ll Get
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>15-Digit EPF Establishment Code Allotment</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Shram Suvidha &amp; EPFO Portal Registration</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Digital Signature (DSC) linking support</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Eligibility &amp; 20+ threshold vetting by CA</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Guidance on Form 5A &amp; ownership filing</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>DBS zero-balance salary account support</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 text-[11px] text-slate-400 text-center">
              TAT: 3-5 Working Days
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARD 2: STANDARD (FEATURED / RECOMMENDED) */}
          {/* Matches Screenshot Center Dark Navy Card with Gold Recommended */}
          {/* ------------------------------------------------------------- */}
          <div className="relative bg-[#002B49] rounded-2xl sm:rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col justify-between border-2 border-[#002B49] md:-translate-y-2">
            
            {/* Top Centered Recommended Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="bg-[#FFCC00] text-slate-950 text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                <span>★</span> RECOMMENDED
              </span>
            </div>

            <div>
              {/* Card Title & Subtitle */}
              <h3 className="text-xl font-bold text-white mt-1">Standard</h3>
              <p className="text-xs text-slate-300 mt-1 min-h-[32px]">
                Perfect for EPF Allotment + 3 Months Monthly Return (ECR) filing
              </p>

              {/* Price Row */}
              <div className="my-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-400 line-through">₹4,999</span>
                  <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                    40% off
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-white">₹2,999</span>
                  <span className="text-xs font-semibold text-slate-300">+ Govt. Fee (₹0)</span>
                </div>

                {/* EMI Pill */}
                <div className="mt-2.5 inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded px-2.5 py-1 text-[11px] text-slate-200">
                  <span className="bg-slate-950 border border-slate-600 rounded px-1 text-[10px] font-black">
                    EMI
                  </span>
                  <span>EMI option available.</span>
                </div>
              </div>

              {/* Primary BRIGHT YELLOW/GOLD CTA Button (Exact Screenshot Match) */}
              <button
                type="button"
                onClick={() => handleProceed('standard')}
                className="w-full py-3 px-4 rounded-xl bg-[#FFCC00] hover:bg-[#E6B800] active:scale-[0.99] text-slate-950 font-bold text-sm shadow-md transition cursor-pointer text-center mt-1"
              >
                Proceed to Pay
              </button>

              {/* What You'll Get Features List */}
              <div className="mt-6 pt-5 border-t border-blue-900/60">
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">
                  What You&apos;ll Get
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>15-Digit EPF Establishment Code Allotment</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>UAN (Universal Account Number) generation</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Member KYC linking (Aadhaar &amp; PAN mapping)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Monthly ECR preparation &amp; return filing (3 Months)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>EPF Challan generation &amp; payment guidance</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dedicated Labour Law CA Compliance Officer</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Priority express portal submission (3 working days)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 text-[11px] text-sky-200 text-center font-medium">
              ★ Preferred by 85% of New Businesses
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARD 3: PF + ESI COMBO (All-in-One Compliance) */}
          {/* ------------------------------------------------------------- */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              {/* Card Title & Subtitle */}
              <h3 className="text-xl font-bold text-slate-900">PF + ESI Combo</h3>
              <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                Complete solution for EPF Code + 17-Digit ESIC Registration
              </p>

              {/* Price Row */}
              <div className="my-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-slate-400 line-through">₹6,999</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    36% off
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">₹4,499</span>
                  <span className="text-xs font-semibold text-slate-500">+ Govt. Fee (₹0)</span>
                </div>

                {/* EMI Pill */}
                <div className="mt-2.5 inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded px-2.5 py-1 text-[11px] text-slate-700">
                  <span className="bg-white border border-slate-300 rounded px-1 text-[10px] font-black">
                    EMI
                  </span>
                  <span>EMI option available.</span>
                </div>
              </div>

              {/* Primary Dark Navy CTA Button */}
              <button
                type="button"
                onClick={() => handleProceed('combo')}
                className="w-full py-3 px-4 rounded-xl bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-bold text-sm shadow-sm transition cursor-pointer text-center"
              >
                Proceed to Pay
              </button>

              {/* What You'll Get Features List */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                  What You&apos;ll Get
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>15-Digit EPF Code + 17-Digit ESIC Code</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Unified Shram Suvidha registration for both codes</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Employee salary structuring (₹15k &amp; ₹21k ceilings)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>UAN generation + ESI Pehchan card registration</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>3 Months monthly return filing for both PF &amp; ESI</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Dedicated Senior Labour Law Specialist</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Save 30% compared to standalone filings</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 text-[11px] text-slate-400 text-center">
              Dual Allotment: 4-6 Working Days
            </div>
          </div>

        </div>

        {/* TRUST BANNER & REASSURANCE FOOTER */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>100% Online &amp; Paperless:</strong> Your EPF application is legally prepared and vetted by a licensed Labour Law CA.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-slate-500 font-medium">
            <Lock className="w-4 h-4 text-[#002B49]" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

      </div>
    </div>
  );
}
