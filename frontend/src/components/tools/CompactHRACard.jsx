import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { computeClientHraExemption, formatIndianCurrency } from '../../utils/hraTaxEngine.js';

export default function CompactHRACard() {
  const [basicSalary, setBasicSalary] = useState('50000');
  const [hraReceived, setHraReceived] = useState('20000');
  const [rentPaid, setRentPaid] = useState('18000');
  const [isMetro, setIsMetro] = useState(false);
  const [taxRegime, setTaxRegime] = useState('old');

  const result = useMemo(() => {
    return computeClientHraExemption({
      financialYear: '2026-27',
      taxRegime,
      calculationMode: 'simple',
      simpleInput: {
        frequency: 'monthly',
        basicSalary,
        hraReceived,
        rentPaid,
        isMetro,
        tenureMonths: 12,
      },
    });
  }, [basicSalary, hraReceived, rentPaid, isMetro, taxRegime]);

  const { summary } = result;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group h-full">
      {/* 1. OUTSIDE SVG & HEADER BANNER (CLICKABLE TO FULL TOOL) */}
      <Link
        to="/tools/hra-calculator"
        className="block p-4 sm:p-5 pb-3 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-white to-sky-50/40 hover:from-blue-100/60 transition-colors group/header cursor-pointer"
        title="Open Full HRA Calculator Page"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200">
              <ShieldCheck className="w-3 h-3 text-blue-600" />
              <span>Section 10(13A) & Rule 2A</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 group-hover/header:text-blue-600 transition-colors">
              <span>HRA Exemption Calculator</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/header:text-blue-600 transition-colors" />
            </h3>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              Calculate tax-free house rent allowance & landlord tax savings
            </p>
          </div>

          {/* OUTSIDE SVG ILLUSTRATION: HOUSE + RENT KEY + SAVINGS SHIELD */}
          <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center relative">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Glow circular background */}
              <circle cx="50" cy="50" r="44" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" strokeDasharray="3 3" />
              
              {/* House walls */}
              <rect x="28" y="44" width="44" height="34" rx="4" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2.5" />
              
              {/* House roof */}
              <path d="M22 46 L50 20 L78 46" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Doorway */}
              <rect x="44" y="58" width="12" height="20" rx="2" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" />
              
              {/* Window */}
              <rect x="58" y="50" width="10" height="10" rx="1" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />

              {/* Green Tax Exemption Shield Badge */}
              <circle cx="32" cy="54" r="8" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
              <text x="32" y="57.5" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="sans-serif">₹</text>
            </svg>
          </div>
        </div>
      </Link>

      {/* 2. DUAL-PANE BODY: EXACT MATCH TO SCREENSHOT (LEFT: WHITE INPUTS | RIGHT: DARK RESULT) */}
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1">
        
        {/* LEFT PANE (INPUTS - 7 COLS) */}
        <div className="md:col-span-7 p-4 sm:p-5 space-y-3 bg-white flex flex-col justify-between">
          <div className="space-y-3">
            {/* Header row with Regime Selector */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Quick Salary & Rent Estimator
              </span>
              
              {/* Regime Selector */}
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs font-bold border border-slate-200">
                <button
                  type="button"
                  onClick={() => setTaxRegime('old')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                    taxRegime === 'old'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Old Regime
                </button>
                <button
                  type="button"
                  onClick={() => setTaxRegime('new')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                    taxRegime === 'new'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  New Regime
                </button>
              </div>
            </div>

            {/* 2x2 Inputs Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Monthly Basic (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                  placeholder="50000"
                  className="w-full h-8.5 px-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Monthly HRA (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="2000"
                  value={hraReceived}
                  onChange={(e) => setHraReceived(e.target.value)}
                  placeholder="20000"
                  className="w-full h-8.5 px-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Monthly Rent Paid (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="2000"
                  value={rentPaid}
                  onChange={(e) => setRentPaid(e.target.value)}
                  placeholder="18000"
                  className="w-full h-8.5 px-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  City Location
                </label>
                <select
                  value={isMetro ? 'metro' : 'non-metro'}
                  onChange={(e) => setIsMetro(e.target.value === 'metro')}
                  className="w-full h-8.5 px-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition cursor-pointer"
                >
                  <option value="non-metro">Non-Metro (40%)</option>
                  <option value="metro">Metro (50% - Del/Mum/Kol/Che)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom link to full tool */}
          <div className="pt-2">
            <Link
              to="/tools/hra-calculator"
              className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
            >
              <span>Need salary increments or multi-city periods?</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* RIGHT PANE (DARK NAVY RESULT - 5 COLS) */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-[#0F172A] text-white p-4 sm:p-5 flex flex-col justify-between space-y-4 border-t md:border-t-0 md:border-l border-slate-800">
          <div className="space-y-3">
            {/* Top result header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Annual Result (FY 2026-27)
              </span>
              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                Rule 2A Verified
              </span>
            </div>

            {/* Main Result */}
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-slate-300">
                Eligible Annual HRA Exemption:
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#10B981] tracking-tight font-mono">
                {formatIndianCurrency(summary.totalExemptHra)}
              </div>
              <p className="text-[10px] text-slate-400">
                {taxRegime === 'old'
                  ? 'Tax-free under Section 10(13A)'
                  : 'Section 115BAC disallows HRA exemptions'}
              </p>
            </div>

            {/* 2 Stats Breakdown */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Taxable HRA</span>
                <span className="font-mono font-bold text-slate-200">
                  {formatIndianCurrency(summary.totalTaxableHra)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] uppercase font-bold">Est. Tax Saved</span>
                <span className="font-mono font-bold text-blue-300">
                  {formatIndianCurrency(summary.estimatedTaxSaved)}
                </span>
              </div>
            </div>
          </div>

          {/* Full-Width White CTA Button */}
          <Link
            to="/tools/hra-calculator"
            className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-slate-100 text-[#111827] font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-md cursor-pointer group"
          >
            <span>Open Full HRA Calculator & PDF Report</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}
