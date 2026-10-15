import React, { useState } from 'react';
import { Layers, Info } from 'lucide-react';
import { formatIndianCurrency } from '../../utils/incomeTaxEngine';

export default function TaxSlabVisualizer({ newRegime, oldRegime }) {
  const [activeRegime, setActiveRegime] = useState('new'); // 'new' | 'old'
  const [hoveredSlab, setHoveredSlab] = useState(null);

  const regime = activeRegime === 'new' ? newRegime : oldRegime;
  const taxableIncome = regime.netTaxableIncome || 0;

  // Filter slabs that have taxable amounts
  const activeSlabs = regime.slabBreakdown?.filter((s) => s.taxableInSlab > 0) || [];

  // Colors for slabs
  const slabColors = [
    'from-emerald-500 to-teal-400',
    'from-blue-500 to-cyan-400',
    'from-indigo-500 to-blue-400',
    'from-purple-500 to-violet-400',
    'from-amber-500 to-orange-400',
    'from-rose-500 to-red-400',
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 mb-6 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2 mb-4">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#111827] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#F26522]" />
            <span>Interactive Tax Slab Distribution</span>
          </h4>
          <p className="text-xs text-slate-500">
            Hover or tap each slab segment to inspect its statutory tax contribution
          </p>
        </div>

        {/* Regime Toggle */}
        <div className="flex items-center p-0.5 bg-slate-100 rounded-xl self-start sm:self-auto text-xs font-bold border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveRegime('new')}
            className={`px-3 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
              activeRegime === 'new'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Regime (115BAC)
          </button>
          <button
            type="button"
            onClick={() => setActiveRegime('old')}
            className={`px-3 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
              activeRegime === 'old'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Old Regime
          </button>
        </div>
      </div>

      {taxableIncome > 0 ? (
        <div className="space-y-4">
          {/* Multi-Segment Color-Coded Bar with CSS Transitions */}
          <div className="h-6 w-full bg-slate-100 rounded-xl overflow-hidden flex shadow-inner">
            {activeSlabs.map((slab, idx) => {
              const widthPct = Math.max(5, Math.min(100, Math.round((slab.taxableInSlab / taxableIncome) * 100)));
              const colorClass = slabColors[idx % slabColors.length];

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredSlab(slab)}
                  onMouseLeave={() => setHoveredSlab(null)}
                  style={{ width: `${widthPct}%` }}
                  className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-500 ease-out flex items-center justify-center text-[10px] font-bold text-white cursor-pointer relative hover:brightness-110`}
                  title={`${slab.label || `${(slab.rate * 100).toFixed(0)}%`}: ${formatIndianCurrency(slab.taxableInSlab)}`}
                >
                  <span className="truncate px-1">
                    {(slab.rate * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Hovered / Active Callout Card */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 transition-all">
            {hoveredSlab ? (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F26522] animate-pulse" />
                <span className="font-bold text-slate-900">
                  {hoveredSlab.label}:
                </span>
                <span className="text-slate-600">
                  {formatIndianCurrency(hoveredSlab.taxableInSlab)} taxable @ {(hoveredSlab.rate * 100).toFixed(0)}% =
                </span>
                <span className="font-bold text-[#F26522]">
                  {formatIndianCurrency(hoveredSlab.taxAmount)} tax
                </span>
              </div>
            ) : (
              <div className="text-slate-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                <span>Hover over any slab block above to inspect the exact tax calculation.</span>
              </div>
            )}

            <div className="text-slate-700 font-semibold self-end sm:self-auto">
              Total Slab Tax: <span className="font-bold text-slate-900">{formatIndianCurrency(regime.normalSlabTax)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
          Enter income above to view your tax slab bracket distribution.
        </div>
      )}
    </div>
  );
}
