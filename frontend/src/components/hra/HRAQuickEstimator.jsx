import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { computeClientHraExemption, formatIndianCurrency } from '../../utils/hraTaxEngine.js';

export default function HRAQuickEstimator({ isEmbedded = false }) {
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

  const cardContent = (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Quick Salary & Rent Estimator
                </span>
                
                {/* Regime Selector */}
                <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs font-bold border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setTaxRegime('old')}
                    className={`px-2.5 py-1 rounded-md transition ${
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
                    className={`px-2.5 py-1 rounded-md transition ${
                      taxRegime === 'new'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    New Regime
                  </button>
                </div>
              </div>

              {/* Monthly Inputs */}
              <div className="space-y-3.5 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Monthly Basic Salary (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={basicSalary}
                      onChange={(e) => setBasicSalary(e.target.value)}
                      placeholder="50000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Monthly HRA Received (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={hraReceived}
                      onChange={(e) => setHraReceived(e.target.value)}
                      placeholder="20000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Monthly Rent Paid (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={rentPaid}
                      onChange={(e) => setRentPaid(e.target.value)}
                      placeholder="18000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Accommodation Location
                    </label>
                    <select
                      value={isMetro ? 'metro' : 'non-metro'}
                      onChange={(e) => setIsMetro(e.target.value === 'metro')}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    >
                      <option value="non-metro">Non-Metro (40% - Bengaluru, Pune, etc.)</option>
                      <option value="metro">Metro (50% - Delhi, Mumbai, Kolkata, Chennai)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/tools/hra-calculator"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
                >
                  <span>Need to add salary increments, rent changes, or multi-city periods?</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Live Results (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Annual Result (FY 2026-27)
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                    Rule 2A Verified
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-300">
                    Eligible Annual HRA Exemption:
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                    {formatIndianCurrency(summary.totalExemptHra)}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Tax-free under Section 10(13A)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Taxable HRA</span>
                    <span className="font-mono font-bold text-slate-200">
                      {formatIndianCurrency(summary.totalTaxableHra)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Est. Tax Saved</span>
                    <span className="font-mono font-bold text-blue-300">
                      {formatIndianCurrency(summary.estimatedTaxSaved)}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA to Full Tool */}
              <Link
                to="/tools/hra-calculator"
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#111827] font-bold text-xs flex items-center justify-center gap-2 transition active:scale-98 shadow-md"
              >
                <span>Open Full HRA Calculator & PDF Report</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
    </div>
  );

  if (isEmbedded) {
    return cardContent;
  }

  return (
    <section className="py-14 sm:py-18 bg-gradient-to-b from-white via-slate-50/70 to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>FREE INCOME TAX TOOL (SEC 10(13A))</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Calculate Your House Rent Allowance (HRA) Exemption
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Estimate your annual tax-free HRA and tax savings in 30 seconds according to Income Tax Rule 2A.
          </p>
        </div>

        {cardContent}

        {/* Cross-Link to Income Tax Calculator */}
        <div className="mt-6 text-center">
          <Link
            to="/tools/income-tax-calculator"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-xs hover:border-orange-300 text-xs text-slate-600 hover:text-slate-900 transition-all"
          >
            <span className="font-bold text-[#F26522] uppercase tracking-wider text-[10px] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
              New
            </span>
            <span>Planning full tax return? Try our <strong>Income Tax Calculator & ITR Slab Checker (Old vs New)</strong></span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F26522]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
