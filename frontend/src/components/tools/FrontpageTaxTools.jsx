import React from 'react';
import { Sparkles, Building2, Calculator, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ITRQuickEstimator from '../incomeTax/ITRQuickEstimator.jsx';
import HRAQuickEstimator from '../hra/HRAQuickEstimator.jsx';

export default function FrontpageTaxTools() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-slate-50/70 to-white border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-950 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
            <span>FREE INTERACTIVE TAX CALCULATORS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Instant Indian Tax & Compliance Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Calculate your Old vs New income tax liability and Rule 2A HRA exemptions in seconds. Click on either card to open the complete CA computation engine.
          </p>
        </div>

        {/* 2 DEDICATED CARDS IN UI */}
        <div className="space-y-12">
          {/* CARD 1: INCOME TAX & ITR SLAB CHECKER */}
          <div className="space-y-3">
            <div className="max-w-4xl mx-auto flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#F26522] flex items-center justify-center font-bold text-xs">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#111827]">
                    1. Income Tax Calculator & ITR Slab Checker
                  </h3>
                  <p className="text-xs text-slate-500">
                    Compare Section 115BAC New Regime vs Old Tax Regime with standard deduction
                  </p>
                </div>
              </div>
              <Link
                to="/tools/income-tax-calculator"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#F26522] hover:text-orange-700 transition-colors group"
              >
                <span>Open Full Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Income Tax Dual-Pane Card */}
            <ITRQuickEstimator />
          </div>

          {/* CARD 2: HOUSE RENT ALLOWANCE (HRA) EXEMPTION */}
          <div className="space-y-3 pt-4 border-t border-slate-200/80">
            <div className="max-w-4xl mx-auto flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#111827]">
                    2. House Rent Allowance (HRA) Exemption Calculator
                  </h3>
                  <p className="text-xs text-slate-500">
                    Compute your tax-free rent allowance under Section 10(13A) & Rule 2A
                  </p>
                </div>
              </div>
              <Link
                to="/tools/hra-calculator"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors group"
              >
                <span>Open Full Page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* HRA Dual-Pane Card */}
            <HRAQuickEstimator isEmbedded={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
