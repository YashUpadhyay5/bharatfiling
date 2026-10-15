import React from 'react';
import { formatIndianCurrency } from '../../utils/incomeTaxEngine';

export default function IncomeTaxPrintReport({ comparison, profile }) {
  if (!comparison || !comparison.oldRegime || !comparison.newRegime) return null;

  const { winner, savings, recommendation, oldRegime, newRegime, financialYear } = comparison;

  return (
    <div id="income-tax-print-report" className="hidden print:block p-8 bg-white text-slate-900 font-sans">
      {/* 1. Official Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900">Bharat</span>
            <span className="text-2xl font-black tracking-tight text-[#F26522]">Filing</span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            AI + CA Powered Indian Business Compliance & Direct Tax Advisory
          </p>
        </div>
        <div className="text-right">
          <h1 className="text-lg font-extrabold uppercase tracking-wide text-slate-800">
            Income Tax Computation & Regime Comparison
          </h1>
          <p className="text-xs text-slate-600 font-medium">Under the Income-tax Act, 1961</p>
          <p className="text-[10px] text-slate-400 mt-1">
            Generated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* 2. Assessment Profile Summary */}
      <div className="grid grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 text-xs">
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Financial Year</span>
          <span className="font-bold text-slate-900">{financialYear}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Assessment Year</span>
          <span className="font-bold text-slate-900">{newRegime.assessmentYear}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Age Category</span>
          <span className="font-bold text-slate-900 capitalize">{profile.ageCategory || 'Individual'}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[10px] uppercase font-bold">Recommended Regime</span>
          <span className="font-bold text-[#F26522] uppercase">
            {winner === 'new' ? 'New Regime (115BAC)' : winner === 'old' ? 'Old Tax Regime' : 'Either Regime'}
          </span>
        </div>
      </div>

      {/* 3. Recommendation Box */}
      <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl mb-6 text-xs text-orange-950 font-medium">
        <strong>CA Assessment: </strong> {recommendation}
      </div>

      {/* 4. Side-by-Side Computation Table */}
      <div className="mb-6">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
          Comparative Statement of Total Income & Tax Liability
        </h2>
        <table className="w-full text-xs border border-slate-300 border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-800">
              <th className="p-2.5 text-left border-r border-slate-300">Particulars</th>
              <th className="p-2.5 text-right border-r border-slate-300">Old Tax Regime</th>
              <th className="p-2.5 text-right">New Tax Regime (Sec 115BAC)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">1. Gross Salary (before standard deduction)</td>
              <td className="p-2 text-right border-r border-slate-300">{formatIndianCurrency(oldRegime.grossSalary)}</td>
              <td className="p-2 text-right">{formatIndianCurrency(newRegime.grossSalary)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">Less: Standard Deduction u/s 16(ia)</td>
              <td className="p-2 text-right border-r border-slate-300">-{formatIndianCurrency(oldRegime.standardDeduction)}</td>
              <td className="p-2 text-right font-bold text-emerald-700">-{formatIndianCurrency(newRegime.standardDeduction)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">Less: HRA Exemption u/s 10(13A)</td>
              <td className="p-2 text-right border-r border-slate-300">-{formatIndianCurrency(oldRegime.hraExemption)}</td>
              <td className="p-2 text-right text-slate-400">NIL (Disallowed)</td>
            </tr>
            <tr className="bg-slate-50 font-semibold">
              <td className="p-2 border-r border-slate-300">Net Taxable Salary</td>
              <td className="p-2 text-right border-r border-slate-300">{formatIndianCurrency(oldRegime.netSalary)}</td>
              <td className="p-2 text-right">{formatIndianCurrency(newRegime.netSalary)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">2. Income / Loss from House Property</td>
              <td className="p-2 text-right border-r border-slate-300">{formatIndianCurrency(oldRegime.netHouseProperty)}</td>
              <td className="p-2 text-right">{formatIndianCurrency(newRegime.netHouseProperty)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">3. Profits & Gains from Business or Profession</td>
              <td className="p-2 text-right border-r border-slate-300">{formatIndianCurrency(oldRegime.netBusinessIncome)}</td>
              <td className="p-2 text-right">{formatIndianCurrency(newRegime.netBusinessIncome)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">4. Capital Gains & Other Sources</td>
              <td className="p-2 text-right border-r border-slate-300">
                {formatIndianCurrency(oldRegime.specialRateIncome + oldRegime.netOtherSources)}
              </td>
              <td className="p-2 text-right">
                {formatIndianCurrency(newRegime.specialRateIncome + newRegime.netOtherSources)}
              </td>
            </tr>
            <tr className="bg-slate-100 font-bold">
              <td className="p-2 border-r border-slate-300">Gross Total Income (GTI)</td>
              <td className="p-2 text-right border-r border-slate-300">{formatIndianCurrency(oldRegime.grossTotalIncome)}</td>
              <td className="p-2 text-right">{formatIndianCurrency(newRegime.grossTotalIncome)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">Less: Chapter VI-A Deductions (80C, 80D, 80CCD, etc.)</td>
              <td className="p-2 text-right border-r border-slate-300 text-blue-700 font-semibold">
                -{formatIndianCurrency(oldRegime.totalDeductions)}
              </td>
              <td className="p-2 text-right text-emerald-700 font-semibold">
                -{formatIndianCurrency(newRegime.totalDeductions)} (80CCD2 only)
              </td>
            </tr>
            <tr className="bg-slate-100 font-black">
              <td className="p-2 border-r border-slate-300">Total Net Taxable Income</td>
              <td className="p-2 text-right border-r border-slate-300">{formatIndianCurrency(oldRegime.netTaxableIncome)}</td>
              <td className="p-2 text-right">{formatIndianCurrency(newRegime.netTaxableIncome)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">Tax Computed at Slab & Special Rates</td>
              <td className="p-2 text-right border-r border-slate-300">{formatIndianCurrency(oldRegime.totalTaxBeforeRebate)}</td>
              <td className="p-2 text-right">{formatIndianCurrency(newRegime.totalTaxBeforeRebate)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">Less: Section 87A Tax Rebate</td>
              <td className="p-2 text-right border-r border-slate-300 text-blue-700">-{formatIndianCurrency(oldRegime.rebate87A)}</td>
              <td className="p-2 text-right text-emerald-700">-{formatIndianCurrency(newRegime.rebate87A)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">Less: Section 87A Marginal Relief</td>
              <td className="p-2 text-right border-r border-slate-300">₹0</td>
              <td className="p-2 text-right text-emerald-700">-{formatIndianCurrency(newRegime.marginalRelief87A)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">Add: Surcharge</td>
              <td className="p-2 text-right border-r border-slate-300">+{formatIndianCurrency(oldRegime.netSurcharge)}</td>
              <td className="p-2 text-right">+{formatIndianCurrency(newRegime.netSurcharge)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">Add: Health & Education Cess (4%)</td>
              <td className="p-2 text-right border-r border-slate-300">+{formatIndianCurrency(oldRegime.cess)}</td>
              <td className="p-2 text-right">+{formatIndianCurrency(newRegime.cess)}</td>
            </tr>
            <tr className="bg-slate-900 text-white font-extrabold text-sm">
              <td className="p-2.5 border-r border-slate-700">TOTAL TAX LIABILITY (u/s 288B)</td>
              <td className="p-2.5 text-right border-r border-slate-700">{formatIndianCurrency(oldRegime.totalTaxLiability)}</td>
              <td className="p-2.5 text-right text-emerald-400">{formatIndianCurrency(newRegime.totalTaxLiability)}</td>
            </tr>
            <tr>
              <td className="p-2 border-r border-slate-300 font-medium">Less: TDS / Advance Tax Paid</td>
              <td className="p-2 text-right border-r border-slate-300">-{formatIndianCurrency(oldRegime.totalTaxCredits)}</td>
              <td className="p-2 text-right">-{formatIndianCurrency(newRegime.totalTaxCredits)}</td>
            </tr>
            <tr className="bg-slate-50 font-black">
              <td className="p-2 border-r border-slate-300">NET TAX PAYABLE / (REFUND DUE)</td>
              <td className="p-2 text-right border-r border-slate-300">
                {oldRegime.netPayable > 0 ? `Payable: ${formatIndianCurrency(oldRegime.netPayable)}` : `Refund: ${formatIndianCurrency(oldRegime.refundDue)}`}
              </td>
              <td className="p-2 text-right text-emerald-700 font-black">
                {newRegime.netPayable > 0 ? `Payable: ${formatIndianCurrency(newRegime.netPayable)}` : `Refund: ${formatIndianCurrency(newRegime.refundDue)}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 5. Statutory Disclaimer */}
      <div className="pt-4 border-t border-slate-300 text-[10px] text-slate-500 leading-normal">
        <p className="font-bold text-slate-700 mb-0.5">Statutory Disclaimer & Compliance Note:</p>
        <p>
          This computation statement is prepared by BharatFiling for comparative estimation under the provisions of the Income-tax Act, 1961, Section 115BAC, and relevant Finance Acts. This does not constitute an official assessment order or final tax return. Final liability is subject to departmental verification of Form 26AS, AIS, and TIS records.
        </p>
      </div>
    </div>
  );
}
