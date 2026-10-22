import React from 'react';
import { formatIndianCurrency } from '../../utils/hraTaxEngine.js';

export default function HRAPrintReport({ result }) {
  if (!result || !result.summary) return null;

  const { summary, breakdown, financialYear, assessmentYear, taxRegime } = result;
  const isOldRegime = taxRegime === 'old';

  return (
    <div id="hra-print-report" className="hidden print:block p-8 bg-white text-slate-900 font-sans">
      {/* Printable Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">Bharat</span>
            <span className="text-2xl font-extrabold tracking-tight text-[#F26522]">Filing</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">AI + CA Powered Indian Business Compliance & Tax Advisory</p>
        </div>
        <div className="text-right">
          <h1 className="text-lg font-extrabold uppercase tracking-wide text-slate-800">
            HRA Tax Exemption Computation
          </h1>
          <p className="text-xs text-slate-600 font-medium">Under Section 10(13A) & Rule 2A</p>
          <p className="text-[10px] text-slate-400 mt-1">Generated: {new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </div>

      {/* Tax Profile Details */}
      <div className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 text-xs">
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Financial Year</span>
          <span className="font-bold text-slate-900">{financialYear}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Assessment Year</span>
          <span className="font-bold text-slate-900">{assessmentYear}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Selected Tax Regime</span>
          <span className="font-bold text-slate-900 uppercase">{taxRegime} Regime</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Exemption Eligibility</span>
          <span className={`font-bold ${isOldRegime ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isOldRegime ? 'Eligible (Old Regime)' : 'Not Eligible (Sec 115BAC)'}
          </span>
        </div>
      </div>

      {/* Summary Grid */}
      <div className="mb-6">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
          1. Annual Executive Summary
        </h2>
        <table className="w-full text-xs border border-slate-200">
          <tbody>
            <tr className="border-b border-slate-200 bg-slate-50 font-semibold">
              <td className="p-2.5">Total HRA Received from Employer</td>
              <td className="p-2.5 text-right font-mono font-bold">{formatIndianCurrency(summary.totalHraReceived)}</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-2.5">Total Eligible Salary (Basic + Qualifying DA + % Commission)</td>
              <td className="p-2.5 text-right font-mono">{formatIndianCurrency(summary.totalEligibleSalary)}</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-2.5">Total Rent Paid for Accommodation</td>
              <td className="p-2.5 text-right font-mono">{formatIndianCurrency(summary.totalRentPaid)}</td>
            </tr>
            <tr className="border-b border-slate-200 bg-emerald-50 text-emerald-950 font-bold">
              <td className="p-2.5">Final Tax-Exempt HRA under Section 10(13A)</td>
              <td className="p-2.5 text-right font-mono text-emerald-700 text-sm">
                {formatIndianCurrency(summary.totalExemptHra)}
              </td>
            </tr>
            <tr className="border-b border-slate-200 bg-amber-50 text-amber-950 font-bold">
              <td className="p-2.5">Taxable HRA Component (To be included in Taxable Salary)</td>
              <td className="p-2.5 text-right font-mono text-amber-800 text-sm">
                {formatIndianCurrency(summary.totalTaxableHra)}
              </td>
            </tr>
            <tr className="bg-blue-50 text-blue-950 font-bold">
              <td className="p-2.5">Estimated Tax Saved (Calculated at 30% Slab + 4% Cess)</td>
              <td className="p-2.5 text-right font-mono text-blue-800">
                {formatIndianCurrency(summary.estimatedTaxSaved)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* The 3 Statutory Limits Breakdown */}
      {isOldRegime && (
        <div className="mb-6">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
            2. Statutory Rule 2A Limits Verification (Least of the 3 is Exempt)
          </h2>
          <table className="w-full text-xs border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-2 text-left">Statutory Rule</th>
                <th className="p-2 text-left">Formula Applied</th>
                <th className="p-2 text-right">Computed Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="p-2 font-bold">Limit A</td>
                <td className="p-2 text-slate-600">Actual HRA received from employer during the period</td>
                <td className="p-2 text-right font-mono">{formatIndianCurrency(summary.totalLimitA)}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2 font-bold">Limit B</td>
                <td className="p-2 text-slate-600">Actual rent paid minus 10% of eligible salary</td>
                <td className="p-2 text-right font-mono">{formatIndianCurrency(summary.totalLimitB)}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2 font-bold">Limit C</td>
                <td className="p-2 text-slate-600">50% of salary (for Delhi/Mumbai/Kolkata/Chennai) or 40% (other cities)</td>
                <td className="p-2 text-right font-mono">{formatIndianCurrency(summary.totalLimitC)}</td>
              </tr>
              <tr className="bg-slate-50 font-bold">
                <td colSpan={2} className="p-2 text-slate-800">Governing Statutory Limit Determining Exemption:</td>
                <td className="p-2 text-right text-blue-700">{summary.limitingFactor}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Multi-Period Interval Table if applicable */}
      {breakdown && breakdown.length > 1 && (
        <div className="mb-6">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
            3. Multi-Period Interval Breakdown (Salary & Rent Revisions)
          </h2>
          <table className="w-full text-[11px] border border-slate-200">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-slate-200">
                <th className="p-1.5 text-left">Interval</th>
                <th className="p-1.5 text-left">City & Limit</th>
                <th className="p-1.5 text-right">Salary</th>
                <th className="p-1.5 text-right">HRA Recd</th>
                <th className="p-1.5 text-right">Rent Paid</th>
                <th className="p-1.5 text-right">Exempt</th>
                <th className="p-1.5 text-right">Taxable</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.map((row, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="p-1.5 font-medium">{row.periodLabel}</td>
                  <td className="p-1.5">{row.city} ({row.salaryPercentage}%)</td>
                  <td className="p-1.5 text-right font-mono">{formatIndianCurrency(row.eligibleSalary)}</td>
                  <td className="p-1.5 text-right font-mono">{formatIndianCurrency(row.actualHra)}</td>
                  <td className="p-1.5 text-right font-mono">{formatIndianCurrency(row.actualRent)}</td>
                  <td className="p-1.5 text-right font-mono font-bold text-emerald-700">{formatIndianCurrency(row.exemptHra)}</td>
                  <td className="p-1.5 text-right font-mono text-amber-700">{formatIndianCurrency(row.taxableHra)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Statutory Disclaimers */}
      <div className="border-t border-slate-300 pt-4 text-[10px] text-slate-500 space-y-1">
        <p className="font-bold text-slate-700">Important Statutory Notes & Disclaimer:</p>
        <p>1. This computation is prepared based on Section 10(13A) of the Income-tax Act, 1961 read with Rule 2A of the Income-tax Rules, 1962.</p>
        <p>2. If your annual rent paid exceeds ₹1,00,000, you are statutorily required to obtain and report your landlord's PAN to your employer in Form 12BB.</p>
        <p>3. This report is an estimate based on user inputs and does not constitute a final assessment order. For personalized ITR advisory and filing support, consult a BharatFiling Chartered Accountant at https://bharatfiling.org.</p>
      </div>
    </div>
  );
}
