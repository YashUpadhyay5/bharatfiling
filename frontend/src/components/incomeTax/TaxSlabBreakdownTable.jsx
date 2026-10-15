import React, { useState } from 'react';
import { Table, ChevronDown } from 'lucide-react';
import { formatIndianCurrency } from '../../utils/incomeTaxEngine';

export default function TaxSlabBreakdownTable({ oldRegime, newRegime }) {
  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'old'

  const currentRegime = activeTab === 'new' ? newRegime : oldRegime;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-6">
      <div className="p-4 sm:p-5 pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#111827]">
              Slab-by-Slab Calculation Breakdown
            </h4>
            <p className="text-xs text-slate-500">
              Inspect how tax was calculated across statutory tax brackets
            </p>
          </div>
        </div>

        {/* Regime Tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('new')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'new'
                ? 'bg-white text-[#111827] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            New Regime (115BAC)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('old')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'old'
                ? 'bg-white text-[#111827] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Old Tax Regime
          </button>
        </div>
      </div>

      {/* Slabs Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-slate-600 font-bold">
              <th className="py-3 px-4">Income Bracket</th>
              <th className="py-3 px-4">Tax Rate</th>
              <th className="py-3 px-4">Taxable in Bracket</th>
              <th className="py-3 px-4 text-right">Tax Computed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {currentRegime.slabBreakdown?.map((slab, idx) => (
              <tr key={idx} className={slab.taxAmount > 0 ? 'bg-orange-50/20' : ''}>
                <td className="py-3 px-4 font-semibold text-slate-900">
                  {slab.label ||
                    (slab.max === Infinity
                      ? `Above ${formatIndianCurrency(slab.min)}`
                      : `${formatIndianCurrency(slab.min)} to ${formatIndianCurrency(slab.max)}`)}
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-800 text-xs">
                    {(slab.rate * 100).toFixed(0)}%
                  </span>
                </td>
                <td className="py-3 px-4">
                  {formatIndianCurrency(slab.taxableInSlab)}
                </td>
                <td className="py-3 px-4 text-right font-bold text-slate-900">
                  {formatIndianCurrency(slab.taxAmount)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
            <tr>
              <td colSpan="3" className="py-3 px-4 text-slate-700">
                Total Normal Slab Tax
              </td>
              <td className="py-3 px-4 text-right text-base text-[#F26522]">
                {formatIndianCurrency(currentRegime.normalSlabTax)}
              </td>
            </tr>
            {currentRegime.rebate87A > 0 && (
              <tr className="text-emerald-700 bg-emerald-50/40">
                <td colSpan="3" className="py-2.5 px-4">
                  Less: Section 87A Tax Rebate
                </td>
                <td className="py-2.5 px-4 text-right">
                  -{formatIndianCurrency(currentRegime.rebate87A)}
                </td>
              </tr>
            )}
            {currentRegime.marginalRelief87A > 0 && (
              <tr className="text-emerald-700 bg-emerald-50/40">
                <td colSpan="3" className="py-2.5 px-4">
                  Less: Section 87A Marginal Relief
                </td>
                <td className="py-2.5 px-4 text-right">
                  -{formatIndianCurrency(currentRegime.marginalRelief87A)}
                </td>
              </tr>
            )}
            {currentRegime.netSurcharge > 0 && (
              <tr className="text-amber-800 bg-amber-50/40">
                <td colSpan="3" className="py-2.5 px-4">
                  Add: Surcharge ({(currentRegime.surchargeRate * 100).toFixed(0)}% after Marginal Relief)
                </td>
                <td className="py-2.5 px-4 text-right">
                  +{formatIndianCurrency(currentRegime.netSurcharge)}
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="3" className="py-2.5 px-4 text-slate-700">
                Add: Health & Education Cess (4%)
              </td>
              <td className="py-2.5 px-4 text-right">
                +{formatIndianCurrency(currentRegime.cess)}
              </td>
            </tr>
            <tr className="bg-slate-900 text-white text-sm sm:text-base font-extrabold">
              <td colSpan="3" className="py-3.5 px-4">
                Final Tax Liability (Rounded u/s 288B)
              </td>
              <td className="py-3.5 px-4 text-right text-emerald-400">
                {formatIndianCurrency(currentRegime.totalTaxLiability)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
