import React, { useState, useMemo } from 'react';
import {
  RotateCcw,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import ITRSimpleCalculatorCard from '../../components/incomeTax/ITRSimpleCalculatorCard.jsx';
import IncomeTaxPrintReport from '../../components/incomeTax/IncomeTaxPrintReport.jsx';
import IncomeTaxFAQ from '../../components/incomeTax/IncomeTaxFAQ.jsx';
import { calculateIncomeTaxComparison } from '../../utils/incomeTaxEngine.js';

export default function IncomeTaxCalculatorPage() {
  // Assessment Profile State
  const [financialYear, setFinancialYear] = useState('2025-26');
  const [taxPayer, setTaxPayer] = useState('individual');
  const [ageCategory, setAgeCategory] = useState('individual');
  const [residentialStatus, setResidentialStatus] = useState('resident');
  // Income Mode: 'taxable' (Direct Net Taxable Income matching ITD portal)
  const [incomeMode, setIncomeMode] = useState('taxable');

  // Income & Deductions State (Persists on refresh, blank for new users)
  const [salary, setSalary] = useState(() => {
    let saved = '';
    try {
      saved = sessionStorage.getItem('bf_itr_taxable_income') || '';
    } catch {}
    return {
      grossSalary: saved,
      hraExemption: '',
      ltaExemption: '',
      professionalTax: '',
      otherAllowancesExempt: '',
      familyPension: '',
    };
  });

  const [houseProperty, setHouseProperty] = useState({
    interestSelfOccupied: '',
    rentalIncome: '',
    municipalTaxes: '',
    interestLetOut: '',
  });

  const [capitalGains, setCapitalGains] = useState({
    stcg111A: '',
    ltcg112A: '',
    ltcgOther: '',
    stcgOther: '',
  });

  const [businessProfession, setBusinessProfession] = useState({
    presumptiveIncome44AD: '',
    presumptiveIncome44ADA: '',
    businessProfitNormal: '',
  });

  const [otherSources, setOtherSources] = useState({
    savingsInterest: '',
    fdInterest: '',
    dividendIncome: '',
    otherIncome: '',
    lotteryWinnings: '',
  });

  // Deductions State (For Old Regime calculation)
  const [deductions, setDeductions] = useState({
    sec80C: '',
    sec80CCD1B: '',
    sec80CCD2: '',
    sec80D: '',
    sec80E: '',
    sec80G: '',
    sec80TTA_TTB: '',
    sec80U_DD: '',
    otherDeductions: '',
  });

  const [taxCredits, setTaxCredits] = useState({
    tdsSalary: '',
    tdsOther: '',
    tcs: '',
    advanceTax: '',
    selfAssessmentTax: '',
  });

  // Reactive Instant Calculation Engine
  const comparison = useMemo(() => {
    return calculateIncomeTaxComparison({
      financialYear,
      taxPayer,
      ageCategory,
      residentialStatus,
      incomeMode,
      salary,
      houseProperty,
      capitalGains,
      businessProfession,
      otherSources,
      deductions,
      taxCredits,
    });
  }, [
    financialYear,
    taxPayer,
    ageCategory,
    residentialStatus,
    incomeMode,
    salary,
    houseProperty,
    capitalGains,
    businessProfession,
    otherSources,
    deductions,
    taxCredits,
  ]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    try {
      sessionStorage.removeItem('bf_itr_taxable_income');
    } catch {}
    setTaxPayer('individual');
    setSalary({
      grossSalary: '',
      hraExemption: '',
      ltaExemption: '',
      professionalTax: '',
      otherAllowancesExempt: '',
      familyPension: '',
    });
    setHouseProperty({
      interestSelfOccupied: '',
      rentalIncome: '',
      municipalTaxes: '',
      interestLetOut: '',
    });
    setCapitalGains({
      stcg111A: '',
      ltcg112A: '',
      ltcgOther: '',
      stcgOther: '',
    });
    setBusinessProfession({
      presumptiveIncome44AD: '',
      presumptiveIncome44ADA: '',
      businessProfitNormal: '',
    });
    setOtherSources({
      savingsInterest: '',
      fdInterest: '',
      dividendIncome: '',
      otherIncome: '',
      lotteryWinnings: '',
    });
    setDeductions({
      sec80C: '',
      sec80CCD1B: '',
      sec80CCD2: '',
      sec80D: '',
      sec80E: '',
      sec80G: '',
      sec80TTA_TTB: '',
      sec80U_DD: '',
      otherDeductions: '',
    });
    setTaxCredits({
      tdsSalary: '',
      tdsOther: '',
      tcs: '',
      advanceTax: '',
      selfAssessmentTax: '',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans pb-20">
      {/* Hidden A4 Printable Report Sheet */}
      <IncomeTaxPrintReport
        comparison={comparison}
        profile={{ financialYear, ageCategory, residentialStatus }}
      />

      {/* Screen Layout */}
      <div className="print:hidden">
        {/* 1. TOP TRUST RIBBON */}
        <div className="bg-[#EBF3FF] border-b border-blue-100 py-2.5 px-4 text-center">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-blue-200 text-[#111827] font-bold text-[11px] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              IT ACT SECTION 115BAC & OLD REGIME
            </span>
            <span className="font-medium">
              Calculate Income Tax & Compare Old vs New Tax Regime for{' '}
              <strong className="text-slate-900 font-bold">FY {financialYear}</strong>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-blue-700 font-semibold">100% Free & CA-Verified</span>
          </div>
        </div>


        {/* 3. MAIN PAGE CONTAINER */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 space-y-6">
          {/* Page Title & Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight">
                  Income Tax Calculator & Slab Checker
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Official rule engine for AY 2026-27 (FY 2025-26). Calculate your tax liability under the Old Regime and New Regime (Section 115BAC).
                </p>
              </div>

              {/* Action Buttons: Reset & Print */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4. THE OFFICIAL ITD SLAB CALCULATOR WITH CHARTS & PROGRESSION */}
          <ITRSimpleCalculatorCard
            salary={salary}
            setSalary={setSalary}
            deductions={deductions}
            setDeductions={setDeductions}
            houseProperty={houseProperty}
            setHouseProperty={setHouseProperty}
            comparison={comparison}
            financialYear={financialYear}
            setFinancialYear={setFinancialYear}
            taxPayer={taxPayer}
            setTaxPayer={setTaxPayer}
            ageCategory={ageCategory}
            setAgeCategory={setAgeCategory}
            residentialStatus={residentialStatus}
            setResidentialStatus={setResidentialStatus}
            incomeMode={incomeMode}
            setIncomeMode={setIncomeMode}
            onReset={handleReset}
          />

          {/* 5. COMPREHENSIVE TAX FAQ SECTION */}
          <IncomeTaxFAQ />
        </div>
      </div>
    </div>
  );
}
