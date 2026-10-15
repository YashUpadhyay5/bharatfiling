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
import ITRSimpleCalculatorCard from '../../components/incomeTax/ITRSimpleCalculatorCard.jsx';
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
  // Mode: 'simple' (90% common salaried) | 'advanced' (all 5 statutory heads)
  const [calculatorMode, setCalculatorMode] = useState('simple');

  // Assessment Profile State
  const [financialYear, setFinancialYear] = useState('2025-26');
  const [ageCategory, setAgeCategory] = useState('individual');
  const [residentialStatus, setResidentialStatus] = useState('resident');

  // Income Heads State (Realistic salaried defaults for clean Simple Mode)
  const [salary, setSalary] = useState({
    grossSalary: '1200000',
    hraExemption: '120000',
    ltaExemption: '',
    professionalTax: '',
    otherAllowancesExempt: '',
    familyPension: '',
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

  // Deductions State
  const [deductions, setDeductions] = useState({
    sec80C: '150000',
    sec80CCD1B: '',
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
    tdsSalary: '',
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
      grossSalary: '1200000',
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
    <div className="min-h-screen bg-slate-50/60 font-sans pb-20">
      {/* Hidden A4 Printable Report Sheet */}
      <IncomeTaxPrintReport
        comparison={comparison}
        profile={{ financialYear, ageCategory, residentialStatus }}
      />

      {/* Screen Layout */}
      <div className="print:hidden">
        {/* 1. TOP PROMO / TRUST RIBBON (MATCHING HRA CALCULATOR) */}
        <div className="bg-[#EBF3FF] border-b border-blue-100 py-2.5 px-4 text-center">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-blue-200 text-[#111827] font-bold text-[11px] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              IT ACT SECTION 115BAC & OLD REGIME
            </span>
            <span className="font-medium">
              Compare Old vs New Tax Regime & Section 87A Marginal Relief for{' '}
              <strong className="text-slate-900 font-bold">FY {financialYear}</strong>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-blue-700 font-semibold">100% Free & CA-Verified</span>
          </div>
        </div>

        {/* 2. BREADCRUMBS (CLEAN & NON-DUPLICATED) */}
        <Breadcrumbs
          items={[
            { label: 'Financial Tools', path: '/services' },
            { label: 'Income Tax & ITR Slab Checker' },
          ]}
        />

        {/* 3. MAIN PAGE CONTAINER */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 space-y-6">
          {/* Page Title & Subtitle + Mode Controls */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Income Tax Calculator & Slab Checker
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Accurately compare tax liability under the Old Regime vs New Regime (Section 115BAC). Includes automatic Standard Deduction, Section 87A rebate, and take-home pay estimate.
                </p>
              </div>

              {/* Header Controls: Mode Toggle & Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Mode Switcher Pills */}
                <div className="inline-flex p-1 bg-white border border-slate-200 rounded-2xl shadow-xs">
                  <button
                    type="button"
                    onClick={() => setCalculatorMode('simple')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      calculatorMode === 'simple'
                        ? 'bg-[#111827] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Zap className={`w-3.5 h-3.5 ${calculatorMode === 'simple' ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span>Simple Mode</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalculatorMode('advanced')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      calculatorMode === 'advanced'
                        ? 'bg-[#111827] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Sliders className={`w-3.5 h-3.5 ${calculatorMode === 'advanced' ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span>Advanced Mode</span>
                  </button>
                </div>

                {/* Reset & Print Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC VIEW RENDERING: SIMPLE MODE (MATCHING REFERENCE IMAGE) vs ADVANCED MODE */}
          {calculatorMode === 'simple' ? (
            /* SIMPLE MODE: EXACT LAYOUT FROM REFERENCE IMAGE (media_1792059370833_12615ba1.png) */
            <ITRSimpleCalculatorCard
              salary={salary}
              setSalary={setSalary}
              deductions={deductions}
              setDeductions={setDeductions}
              houseProperty={houseProperty}
              setHouseProperty={setHouseProperty}
              comparison={comparison}
              onReset={handleReset}
              onSwitchToAdvanced={() => setCalculatorMode('advanced')}
            />
          ) : (
            /* ADVANCED MODE: COMPREHENSIVE 5 HEADS, VI-A DEDUCTIONS, AND GRANULAR TABLES */
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* 4. KEY METRICS STATS BAR */}
              <TaxStatisticsCards comparison={comparison} grossIncome={grossIncome} />

              {/* 5. MASTER 2-COLUMN GRID (7 COLS INPUTS | 5 COLS STICKY RESULT) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN: FORM INPUTS & CHARTS (7 COLS) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Profile Card (FY, Age Category, Residential Status) */}
                  <TaxpayerProfileCard
                    financialYear={financialYear}
                    setFinancialYear={setFinancialYear}
                    ageCategory={ageCategory}
                    setAgeCategory={setAgeCategory}
                    residentialStatus={residentialStatus}
                    setResidentialStatus={setResidentialStatus}
                  />

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium">
                    <strong>Advanced Mode Active:</strong> Configure income across all 5 statutory heads, capital gains, presumptive business, and full Chapter VI-A deductions.
                  </div>

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

                {/* RIGHT COLUMN: STICKY LIVE COMPARISON HERO (5 COLS) */}
                <div className="lg:col-span-5 space-y-5">
                  <RegimeComparisonHero
                    comparison={comparison}
                    onPrint={handlePrint}
                    onOpenITRAdvisor={() => setShowITRModal(true)}
                  />

                  {/* Quick Link Card to HRA Calculator */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between gap-4 transition-all hover:border-orange-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F26522] shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#111827]">
                          Need Dedicated HRA Calculation?
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          Compute Rule 2A 3-limit exemption with metro rules
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/tools/hra-calculator"
                      className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      HRA Tool <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 6. COMPREHENSIVE TAX FAQ SECTION */}
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
