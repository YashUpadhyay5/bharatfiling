import React from 'react';
import { Calendar, UserCheck, ShieldCheck } from 'lucide-react';
import { SUPPORTED_FINANCIAL_YEARS } from '../../utils/incomeTaxEngine';

export default function TaxpayerProfileCard({
  financialYear,
  setFinancialYear,
  ageCategory,
  setAgeCategory,
  residentialStatus,
  setResidentialStatus,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 mb-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F26522]">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#111827]">
              Tax Assessment Profile
            </h3>
            <p className="text-xs text-slate-500">
              Select your Financial Year, Age bracket, and Residential status
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" /> CA Verified Rules
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Financial Year Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
            Financial Year
          </label>
          <div className="relative">
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="w-full h-11 px-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] cursor-pointer transition-colors"
            >
              {SUPPORTED_FINANCIAL_YEARS.map((fy) => (
                <option key={fy.id} value={fy.id}>
                  {fy.label} {fy.isLatest ? '(Latest)' : fy.isCurrent ? '(Active AY)' : ''}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {financialYear === '2026-27'
              ? 'Income-tax Act, 2025 transition provisions'
              : financialYear === '2025-26'
              ? 'Consolidated Section 115BAC rules'
              : 'AY 2025-26 standard rules'}
          </p>
        </div>

        {/* Age Category Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
            Age Category (Old Regime)
          </label>
          <select
            value={ageCategory}
            onChange={(e) => setAgeCategory(e.target.value)}
            className="w-full h-11 px-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] cursor-pointer transition-colors"
          >
            <option value="individual">Individual (&lt; 60 Years)</option>
            <option value="senior">Senior Citizen (60 - 79 Years)</option>
            <option value="superSenior">Super Senior Citizen (80+ Years)</option>
          </select>
          <p className="mt-1 text-[11px] text-slate-500">
            {ageCategory === 'superSenior'
              ? 'Basic exemption: ₹5,00,000 in Old Regime'
              : ageCategory === 'senior'
              ? 'Basic exemption: ₹3,00,000 in Old Regime'
              : 'Basic exemption: ₹2,50,000 in Old Regime'}
          </p>
        </div>

        {/* Residential Status */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
            Residential Status
          </label>
          <select
            value={residentialStatus}
            onChange={(e) => setResidentialStatus(e.target.value)}
            className="w-full h-11 px-3 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F26522]/30 focus:border-[#F26522] cursor-pointer transition-colors"
          >
            <option value="resident">Resident Individual</option>
            <option value="nonResident">Non-Resident (NRI)</option>
          </select>
          <p className="mt-1 text-[11px] text-slate-500">
            {residentialStatus === 'resident'
              ? 'Eligible for Section 87A rebate & relief'
              : 'Section 87A rebate is NOT applicable to NRIs'}
          </p>
        </div>
      </div>
    </div>
  );
}
