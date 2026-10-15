import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  ShieldCheck,
  RotateCcw,
  Printer,
  Sparkles,
  Zap,
  Sliders,
  Building2,
  ArrowRight,
} from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import TaxpayerProfileCard from '../../components/incomeTax/TaxpayerProfileCard.jsx';
import SimpleTaxForm from '../../components/incomeTax/SimpleTaxForm.jsx';
import IncomeAccordion from '../../components/incomeTax/IncomeAccordion.jsx';
import DeductionSelector from '../../components/incomeTax/DeductionSelector.jsx';
import TaxCreditsCard from '../../components/incomeTax/TaxCreditsCard.jsx';
import TaxStatisticsCards from '../../components/incomeTax/TaxStatisticsCards.jsx';
import TaxRegimeComparisonChart from '../../components/incomeTax/TaxRegimeComparisonChart.jsx';
import TaxSlabVisualizer from '../../components/incomeTax/TaxSlabVisualizer.jsx';
import RegimeComparisonHero from '../../components/incomeTax/RegimeComparisonHero.jsx';
import TaxSlabBreakdownTable from '../../components/incomeTax/TaxSlabBreakdownTable.jsx';
import IncomeTaxPrintReport from '../../components/incomeTax/IncomeTaxPrintReport.jsx';
import ITRFormAdvisorModal from '../../components/incomeTax/ITRFormAdvisorModal.jsx';
import IncomeTaxFAQ from '../../components/incomeTax/IncomeTaxFAQ.jsx';
import { calculateIncomeTaxComparison } from '../../utils/incomeTaxEngine.js';

export default function IncomeTaxCalculatorPage() {
  // Mode: 'simple' (90% common salaried) | 'advanced' (all 5 heads & capital gains)
  const [calculatorMode, setCalculatorMode] = useState('simple');

  // Assessment Profile State
  const [financialYear, setFinancialYear] = useState('2025-26');
  const [ageCategory, setAgeCategory] = useState('individual');
  const [residentialStatus, setResidentialStatus] = useState('resident');

  // Income Heads State (prefilled with a realistic, relatable salaried taxpayer)
  const [salary, setSalary] = useState({
    grossSalary: '1200000',
    hraExemption: '120000',
    ltaExemption: '',
    professionalTax: '2400',
    otherAllowancesExempt: '',
    familyPension: '',
  });

  const [houseProperty, setHouseProperty] = useState({
    interestSelfOccupied: '150000',
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
    savingsInterest: '12000',
    fdInterest: '25000',
    dividendIncome: '',
    otherIncome: '',
    lotteryWinnings: '',
  });

  // Deductions State
  const [deductions, setDeductions] = useState({
    sec80C: '150000',
    sec80CCD1B: '50000',
    sec80CCD2: '',
    sec80D: '25000',
    sec80E: '',
    sec80G: '',
    sec80TTA_TTB: '',
    sec80U_DD: '',
    otherDeductions: '',
  });

  // Tax Credits State
  const [taxCredits, setTaxCredits] = useState({
    tdsSalary: '50000',
    tdsOther: '',
    tcs: '',
    advanceTax: '',
    selfAssessmentTax: '',
  });

  const [showITRModal, setShowITRModal] = useState(false);

  // Reactive Instant Calculation Engine
  const comparison = useMemo(() => {
    return calculateIncomeTaxComparison({
      financialYear,
      ageCategory,
      residentialStatus,
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
    ageCategory,
    residentialStatus,
    salary,
    houseProperty,
    capitalGains,
    businessProfession,
    otherSources,
    deductions,
    taxCredits,
  ]);

  const grossIncome = comparison.newRegime?.grossSalary || Number(salary.grossSalary) || 0;

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setSalary({
      grossSalary: '1000000',
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

  const hasBusiness =
    Boolean(businessProfession.businessProfitNormal) ||
    Boolean(businessProfession.presumptiveIncome44AD) ||
    Boolean(businessProfession.presumptiveIncome44ADA);

  const hasCapGains =
    Boolean(capitalGains.stcg111A) ||
    Boolean(capitalGains.ltcg112A) ||
    Boolean(capitalGains.ltcgOther);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Printable Report Component (hidden in screen, shown in @media print) */}
      <IncomeTaxPrintReport
        comparison={comparison}
        profile={{ financialYear, ageCategory, residentialStatus }}
      />

      {/* Screen Layout */}
      <div className="print:hidden">
        {/* HERO SECTION */}
        <div className="bg-gradient-to-b from-slate-900 via-[#111827] to-slate-900 text-white pt-8 pb-14 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: 'Home', to: '/' },
                { label: 'Tools', to: '/services' },
                { label: 'Income Tax Calculator & Slab Checker' },
              ]}
              className="text-slate-400 mb-6"
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F26522]/20 text-[#F26522] border border-[#F26522]/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    UPDATED FOR FY 2026-27 & FY 2025-26
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> CA Reviewed Engine
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Income Tax Calculator & <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#F26522] to-amber-400">
                    ITR Slab Checker
                  </span>
                </h1>

                <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Compare Old vs New Tax Regime (Section 115BAC) side-by-side with live visual charts. Calculate exact Section 87A Marginal Relief, optimize Chapter VI-A deductions, and see your exact take-home pay.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print / Export PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN BODY CONTENT */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          {/* 1. INTERACTIVE KEY STATISTICS CARDS */}
          <TaxStatisticsCards comparison={comparison} grossIncome={grossIncome} />

          {/* 2. MODE SWITCHER: SIMPLE VS ADVANCED */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Calculator View:
              </span>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => setCalculatorMode('simple')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    calculatorMode === 'simple'
                      ? 'bg-white text-[#111827] shadow-xs ring-1 ring-slate-200 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Zap className={`w-3.5 h-3.5 ${calculatorMode === 'simple' ? 'text-[#F26522]' : 'text-slate-400'}`} />
                  <span>Simple Mode (Salaried / Most Common)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCalculatorMode('advanced')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    calculatorMode === 'advanced'
                      ? 'bg-white text-[#111827] shadow-xs ring-1 ring-slate-200 font-extrabold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sliders className={`w-3.5 h-3.5 ${calculatorMode === 'advanced' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>Advanced Mode (Capital Gains, Business, All Heads)</span>
                </button>
              </div>
            </div>

            <span className="text-[11px] text-slate-500">
              {calculatorMode === 'simple'
                ? '⚡ Showing clean, streamlined inputs for salaried employees'
                : '⚙️ Showing comprehensive inputs across all 5 statutory heads'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: INPUTS & CHARTS (7 COLUMNS) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Profile Card */}
              <TaxpayerProfileCard
                financialYear={financialYear}
                setFinancialYear={setFinancialYear}
                ageCategory={ageCategory}
                setAgeCategory={setAgeCategory}
                residentialStatus={residentialStatus}
                setResidentialStatus={setResidentialStatus}
              />

              {/* DYNAMIC MODE RENDERING WITH TRANSITIONS */}
              <div className="transition-all duration-300">
                {calculatorMode === 'simple' ? (
                  <SimpleTaxForm
                    salary={salary}
                    setSalary={setSalary}
                    deductions={deductions}
                    setDeductions={setDeductions}
                    houseProperty={houseProperty}
                    setHouseProperty={setHouseProperty}
                    otherSources={otherSources}
                    setOtherSources={setOtherSources}
                    ageCategory={ageCategory}
                  />
                ) : (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    {/* 5 Heads of Income Accordion */}
                    <IncomeAccordion
                      salary={salary}
                      setSalary={setSalary}
                      houseProperty={houseProperty}
                      setHouseProperty={setHouseProperty}
                      capitalGains={capitalGains}
                      setCapitalGains={setCapitalGains}
                      businessProfession={businessProfession}
                      setBusinessProfession={setBusinessProfession}
                      otherSources={otherSources}
                      setOtherSources={setOtherSources}
                    />

                    {/* Chapter VI-A Deductions */}
                    <DeductionSelector
                      deductions={deductions}
                      setDeductions={setDeductions}
                      ageCategory={ageCategory}
                    />

                    {/* Taxes Paid & TDS Credits */}
                    <TaxCreditsCard
                      taxCredits={taxCredits}
                      setTaxCredits={setTaxCredits}
                    />
                  </div>
                )}
              </div>

              {/* Visual Dual-Regime Comparison Chart */}
              <TaxRegimeComparisonChart
                oldRegime={comparison.oldRegime}
                newRegime={comparison.newRegime}
                grossIncome={grossIncome}
              />

              {/* Interactive Color-Coded Slab Visualizer */}
              <TaxSlabVisualizer
                newRegime={comparison.newRegime}
                oldRegime={comparison.oldRegime}
              />

              {/* Slab-by-Slab Calculation Table */}
              <TaxSlabBreakdownTable
                oldRegime={comparison.oldRegime}
                newRegime={comparison.newRegime}
              />
            </div>

            {/* RIGHT COLUMN: STICKY COMPARISON HERO (5 COLUMNS) */}
            <div className="lg:col-span-5">
              <RegimeComparisonHero
                comparison={comparison}
                onPrint={handlePrint}
                onOpenITRAdvisor={() => setShowITRModal(true)}
              />

              {/* Quick Link Card to HRA Calculator */}
              <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between gap-4 transition-all hover:border-orange-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F26522]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">
                      Need Dedicated HRA Calculation?
                    </h4>
                    <p className="text-xs text-slate-500">
                      Compute Rule 2A 3-limit exemption with metro/non-metro rules
                    </p>
                  </div>
                </div>
                <Link
                  to="/tools/hra-calculator"
                  className="shrink-0 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  HRA Tool <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* COMPREHENSIVE FAQ SECTION */}
          <IncomeTaxFAQ />
        </div>
      </div>

      {/* ITR Form Advisor Modal */}
      <ITRFormAdvisorModal
        isOpen={showITRModal}
        onClose={() => setShowITRModal(false)}
        grossTotalIncome={comparison.newRegime.grossTotalIncome}
        hasBusinessIncome={hasBusiness}
        hasPresumptiveBusiness={
          Boolean(businessProfession.presumptiveIncome44AD) ||
          Boolean(businessProfession.presumptiveIncome44ADA)
        }
        hasCapitalGains={hasCapGains}
        hasMultipleProperties={Boolean(houseProperty.rentalIncome)}
      />
    </div>
  );
}
