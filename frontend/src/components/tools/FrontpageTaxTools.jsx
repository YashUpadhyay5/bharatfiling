import React, { useState } from 'react';
import { Sparkles, Building2, Calculator, ShieldCheck } from 'lucide-react';
import ITRQuickEstimator from '../incomeTax/ITRQuickEstimator.jsx';
import HRAQuickEstimator from '../hra/HRAQuickEstimator.jsx';

export default function FrontpageTaxTools() {
  const [activeTab, setActiveTab] = useState('itr'); // 'itr' | 'hra'

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-white via-slate-50/80 to-white border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-950 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
            <span>FREE INTERACTIVE TAX TOOLS & SLAB CHECKER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Indian Income Tax & Compliance Calculators
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Compute your exact Old vs New tax regime savings and Rule 2A HRA exemptions in seconds.
          </p>

          {/* Interactive Tool Switcher with Smooth CSS Transitions */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex p-1 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab('itr')}
                className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  activeTab === 'itr'
                    ? 'bg-white text-[#111827] shadow-sm ring-1 ring-slate-200/80 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/50'
                }`}
              >
                <Calculator className={`w-4 h-4 transition-colors ${activeTab === 'itr' ? 'text-[#F26522]' : 'text-slate-400'}`} />
                <span>Income Tax & ITR Slab Checker</span>
                {activeTab === 'itr' && (
                  <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('hra')}
                className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  activeTab === 'hra'
                    ? 'bg-white text-[#111827] shadow-sm ring-1 ring-slate-200/80 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/50'
                }`}
              >
                <Building2 className={`w-4 h-4 transition-colors ${activeTab === 'hra' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>HRA Tax Exemption (Sec 10(13A))</span>
                {activeTab === 'hra' && (
                  <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Card Display with Animated Fade-In */}
        <div className="transition-all duration-300 ease-out">
          {activeTab === 'itr' ? (
            <div className="animate-in fade-in zoom-in-98 duration-300">
              <ITRQuickEstimator />
            </div>
          ) : (
            <div className="animate-in fade-in zoom-in-98 duration-300">
              {/* Render HRA card */}
              <HRAQuickEstimator isEmbedded={true} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
