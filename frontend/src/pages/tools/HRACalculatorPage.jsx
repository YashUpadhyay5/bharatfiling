import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  ShieldCheck,
  Building2,
  MapPin,
  FileText,
  Printer,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  Plus,
  Trash2,
  RefreshCw,
  TrendingDown,
  CheckCircle2,
  Info,
} from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs.jsx';
import SplitGradientButton from '../../components/common/SplitGradientButton.jsx';
import HRAPrintReport from '../../components/hra/HRAPrintReport.jsx';
import HRASimpleCalculatorCard from '../../components/hra/HRASimpleCalculatorCard.jsx';
import { computeClientHraExemption, formatIndianCurrency } from '../../utils/hraTaxEngine.js';

export default function HRACalculatorPage() {
  // Mode: 'simple' | 'advanced'
  const [calculationMode, setCalculationMode] = useState('simple');
  const [taxRegime, setTaxRegime] = useState('old');
  const [financialYear, setFinancialYear] = useState('2026-27');

  // Simple Mode State
  const [simpleInput, setSimpleInput] = useState({
    frequency: 'monthly',
    basicSalary: '50000',
    da: '0',
    daFormsRetirement: true,
    commission: '0',
    hraReceived: '20000',
    rentPaid: '18000',
    isMetro: false,
    tenureMonths: '12',
  });

  // Advanced Multi-Period State
  const [periods, setPeriods] = useState([
    {
      id: 'p-1',
      periodLabel: 'First Half (Apr–Sep)',
      months: '6',
      basicSalary: '50000',
      da: '0',
      daFormsRetirement: false,
      commission: '0',
      hraReceived: '20000',
      rentPaid: '15000',
      isMetro: false,
      city: 'Bengaluru',
    },
    {
      id: 'p-2',
      periodLabel: 'Second Half (Oct–Mar - Post Increment)',
      months: '6',
      basicSalary: '65000',
      da: '0',
      daFormsRetirement: false,
      commission: '0',
      hraReceived: '26000',
      rentPaid: '15000',
      isMetro: false,
      city: 'Bengaluru',
    },
  ]);

  // Handle Simple Input Change
  const handleSimpleChange = (field, value) => {
    setSimpleInput((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Advanced Period Change
  const handlePeriodChange = (id, field, value) => {
    setPeriods((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Add Period in Advanced Mode
  const handleAddPeriod = () => {
    if (periods.length >= 6) return;
    const newId = `p-${Date.now()}`;
    const last = periods[periods.length - 1] || {};
    setPeriods((prev) => [
      ...prev,
      {
        id: newId,
        periodLabel: `Period ${prev.length + 1}`,
        months: '3',
        basicSalary: last.basicSalary || '50000',
        da: last.da || '0',
        daFormsRetirement: last.daFormsRetirement || false,
        commission: '0',
        hraReceived: last.hraReceived || '20000',
        rentPaid: last.rentPaid || '15000',
        isMetro: last.isMetro || false,
        city: last.city || 'Bengaluru',
      },
    ]);
  };

  // Remove Period
  const handleRemovePeriod = (id) => {
    if (periods.length <= 1) return;
    setPeriods((prev) => prev.filter((p) => p.id !== id));
  };

  // Real-time Computation with Zero Lag
  const calculationResult = useMemo(() => {
    return computeClientHraExemption({
      financialYear,
      taxRegime,
      calculationMode,
      simpleInput,
      periods,
    });
  }, [financialYear, taxRegime, calculationMode, simpleInput, periods]);

  const { summary, breakdown, calculationWarnings, statutoryNotes } = calculationResult;
  const isOldRegime = taxRegime === 'old';

  // Handle Print / PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans pb-20">
      {/* Hidden A4 Printable Report Sheet */}
      <HRAPrintReport result={calculationResult} />

      {/* Screen View */}
      <div className="print:hidden">
        {/* Top Promo / Trust Ribbon */}
        <div className="bg-[#EBF3FF] border-b border-blue-100 py-3 px-4 text-center">
          <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-blue-200 text-[#111827] font-bold text-[11px] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              IT ACT SECTION 10(13A)
            </span>
            <span className="font-medium">
              Calculate your HRA tax exemption under <strong className="text-slate-900 font-bold">Rule 2A</strong> for FY {financialYear}
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="text-blue-700 font-semibold">100% Free & CA-Verified</span>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8 space-y-6">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Financial Tools', path: '/services' },
              { label: 'HRA Tax Exemption Calculator' },
            ]}
          />

          {/* Page Title & Subtitle */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Professional HRA Exemption Calculator
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
                  Accurately compute House Rent Allowance exemption under Section 10(13A) of the Income-tax Act, 1961. Supports Old vs New Regime comparisons, metro limits, and multi-period salary revisions.
                </p>
              </div>

              {/* Mode Toggle Pills */}
              <div className="inline-flex p-1 bg-white border border-slate-200 rounded-2xl shadow-xs">
                <button
                  type="button"
                  onClick={() => setCalculationMode('simple')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    calculationMode === 'simple'
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚡ Simple Mode
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationMode('advanced')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    calculationMode === 'advanced'
                      ? 'bg-[#111827] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚙️ Advanced Multi-Period
                </button>
              </div>
            </div>
          </div>

          {/* New Tax Regime Warning Banner (If Selected) */}
          {!isOldRegime && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3 shadow-xs">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold">No HRA Exemption Under New Tax Regime (Section 115BAC)</p>
                <p className="text-amber-800 leading-relaxed">
                  Under the default New Tax Regime, Section 10(13A) House Rent Allowance exemption is not permissible. 
                  Your entire HRA of <strong>{formatIndianCurrency(summary.totalHraReceived)}</strong> will be taxed as normal salary income. 
                  Switch to the <strong>Old Tax Regime</strong> below to see your potential tax exemption.
                </p>
              </div>
            </div>
          )}

          {/* DYNAMIC MODE RENDERING */}
          {calculationMode === 'simple' ? (
            <HRASimpleCalculatorCard
              simpleInput={simpleInput}
              handleSimpleChange={handleSimpleChange}
              summary={summary}
              onSwitchToAdvanced={() => setCalculationMode('advanced')}
            />
          ) : (
            /* Master 2-Column Grid for Advanced Multi-Period Mode */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
              
              {/* LEFT COLUMN: Input Form (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
                
                {/* 1. Global Tax Profile Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Financial Year <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={financialYear}
                    onChange={(e) => setFinancialYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option value="2026-27">FY 2026-27 (AY 2027-28)</option>
                    <option value="2025-26">FY 2025-26 (AY 2026-27)</option>
                    <option value="2024-25">FY 2024-25 (AY 2025-26)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Tax Regime <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setTaxRegime('old')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition cursor-pointer text-center ${
                        taxRegime === 'old'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Old Regime (Exempt)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTaxRegime('new')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition cursor-pointer text-center ${
                        taxRegime === 'new'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      New Regime (Sec 115BAC)
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. SIMPLE MODE FORM */}
              {calculationMode === 'simple' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Salary & Rental Details
                    </span>
                    {/* Frequency Switch */}
                    <div className="inline-flex p-0.5 bg-slate-100 rounded-lg text-[11px] font-semibold border border-slate-200">
                      <button
                        type="button"
                        onClick={() => handleSimpleChange('frequency', 'monthly')}
                        className={`px-2.5 py-1 rounded-md transition ${
                          simpleInput.frequency === 'monthly'
                            ? 'bg-white text-slate-900 shadow-2xs font-bold'
                            : 'text-slate-500'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSimpleChange('frequency', 'annual')}
                        className={`px-2.5 py-1 rounded-md transition ${
                          simpleInput.frequency === 'annual'
                            ? 'bg-white text-slate-900 shadow-2xs font-bold'
                            : 'text-slate-500'
                        }`}
                      >
                        Annual
                      </button>
                    </div>
                  </div>

                  {/* Basic Salary & HRA Received */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        {simpleInput.frequency === 'annual' ? 'Annual' : 'Monthly'} Basic Salary <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-bold">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={simpleInput.basicSalary}
                          onChange={(e) => handleSimpleChange('basicSalary', e.target.value)}
                          placeholder="e.g. 50000"
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        {simpleInput.frequency === 'annual' ? 'Annual' : 'Monthly'} HRA Received <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-bold">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={simpleInput.hraReceived}
                          onChange={(e) => handleSimpleChange('hraReceived', e.target.value)}
                          placeholder="e.g. 20000"
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rent Paid & City Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        {simpleInput.frequency === 'annual' ? 'Annual' : 'Monthly'} Rent Paid <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-bold">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={simpleInput.rentPaid}
                          onChange={(e) => handleSimpleChange('rentPaid', e.target.value)}
                          placeholder="e.g. 18000"
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700">
                        Accommodation City Type <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={simpleInput.isMetro ? 'metro' : 'non-metro'}
                        onChange={(e) => handleSimpleChange('isMetro', e.target.value === 'metro')}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      >
                        <option value="non-metro">Non-Metro (40% Limit - Bengaluru, Pune, Hyd, Gurgaon, etc.)</option>
                        <option value="metro">Metro (50% Limit - Delhi, Mumbai, Kolkata, Chennai)</option>
                      </select>
                    </div>
                  </div>

                  {/* Optional Advanced Salary Components: DA & Commission */}
                  <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                    <p className="text-xs font-bold text-slate-800">
                      Additional Eligible Salary Components (Optional)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-slate-600">
                          Dearness Allowance (DA)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={simpleInput.da}
                          onChange={(e) => handleSimpleChange('da', e.target.value)}
                          placeholder="0"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                        />
                        <label className="flex items-center gap-2 mt-1.5 cursor-pointer text-[11px] text-slate-600">
                          <input
                            type="checkbox"
                            checked={simpleInput.daFormsRetirement}
                            onChange={(e) => handleSimpleChange('daFormsRetirement', e.target.checked)}
                            className="rounded text-blue-600"
                          />
                          <span>Forms part of retirement benefits</span>
                        </label>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-semibold text-slate-600">
                          Fixed % Turnover Commission
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={simpleInput.commission}
                          onChange={(e) => handleSimpleChange('commission', e.target.value)}
                          placeholder="0"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">
                          Only fixed % of turnover qualifies (Gestetner SC ruling).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. ADVANCED MULTI-PERIOD MODE */}
              {calculationMode === 'advanced' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Multi-Period Salary & Rent Intervals
                      </span>
                      <p className="text-xs text-slate-500">
                        Add distinct periods for mid-year appraisals, rent hikes, or city relocations.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddPeriod}
                      disabled={periods.length >= 6}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Interval</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {periods.map((p, idx) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-3 relative"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#111827] text-white text-[10px] font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <input
                              type="text"
                              value={p.periodLabel}
                              onChange={(e) => handlePeriodChange(p.id, 'periodLabel', e.target.value)}
                              className="text-xs font-bold text-slate-800 bg-transparent border-b border-dashed border-slate-300 focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-slate-500 font-semibold">Months:</span>
                              <input
                                type="number"
                                min="1"
                                max="12"
                                value={p.months}
                                onChange={(e) => handlePeriodChange(p.id, 'months', e.target.value)}
                                className="w-12 px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold bg-white text-center"
                              />
                            </div>

                            {periods.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemovePeriod(p.id)}
                                className="text-slate-400 hover:text-rose-600 transition"
                                title="Remove interval"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block">
                              Monthly Basic (₹)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={p.basicSalary}
                              onChange={(e) => handlePeriodChange(p.id, 'basicSalary', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block">
                              Monthly HRA (₹)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={p.hraReceived}
                              onChange={(e) => handlePeriodChange(p.id, 'hraReceived', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block">
                              Monthly Rent (₹)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={p.rentPaid}
                              onChange={(e) => handlePeriodChange(p.id, 'rentPaid', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-600 block">
                              City Type
                            </label>
                            <select
                              value={p.isMetro ? 'metro' : 'non-metro'}
                              onChange={(e) => handlePeriodChange(p.id, 'isMetro', e.target.value === 'metro')}
                              className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                            >
                              <option value="non-metro">Non-Metro (40%)</option>
                              <option value="metro">Metro (50%)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF Report</span>
                </button>

                <div className="flex items-center gap-2">
                  <SplitGradientButton
                    label="Instant Recalculation"
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Results Dashboard (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary Output Card */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Exemption Summary (FY {financialYear})
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isOldRegime
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {isOldRegime ? 'Old Regime Applied' : 'New Regime (Taxable)'}
                  </span>
                </div>

                {/* Hero Number: Final Exempt HRA */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white to-blue-50/30 border border-emerald-200/80 space-y-1 text-center">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    Eligible HRA Exemption (Tax Free)
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-700 tracking-tight">
                    {formatIndianCurrency(summary.totalExemptHra)}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Deductible under Section 10(13A) of Income-tax Act
                  </p>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Taxable HRA</span>
                    <div className="text-lg font-black text-slate-800">
                      {formatIndianCurrency(summary.totalTaxableHra)}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/70">
                    <span className="text-[10px] uppercase font-bold text-blue-700">Est. Tax Saved</span>
                    <div className="text-lg font-black text-blue-800">
                      {formatIndianCurrency(summary.estimatedTaxSaved)}
                    </div>
                  </div>
                </div>

                {/* Visual Ratio Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600">Total HRA Received</span>
                    <span className="text-slate-900">{formatIndianCurrency(summary.totalHraReceived)}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                    <div
                      style={{
                        width: `${
                          summary.totalHraReceived > 0
                            ? Math.min(100, (summary.totalExemptHra / summary.totalHraReceived) * 100)
                            : 0
                        }%`,
                      }}
                      className="h-full bg-emerald-500 transition-all duration-300"
                      title="Exempt HRA"
                    />
                    <div
                      style={{
                        width: `${
                          summary.totalHraReceived > 0
                            ? Math.min(100, (summary.totalTaxableHra / summary.totalHraReceived) * 100)
                            : 0
                        }%`,
                      }}
                      className="h-full bg-amber-400 transition-all duration-300"
                      title="Taxable HRA"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 pt-0.5">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                      Exempt ({summary.totalHraReceived > 0 ? Math.round((summary.totalExemptHra / summary.totalHraReceived) * 100) : 0}%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                      Taxable ({summary.totalHraReceived > 0 ? Math.round((summary.totalTaxableHra / summary.totalHraReceived) * 100) : 0}%)
                    </span>
                  </div>
                </div>

                {/* The 3 Statutory Limits Breakdown */}
                {isOldRegime && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-700 block">
                      Rule 2A Statutory Limit Checks:
                    </span>
                    <div className="space-y-2 text-xs">
                      {/* Limit A */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800">1. Actual HRA Received</p>
                          <p className="text-[10px] text-slate-500">Total allowance received</p>
                        </div>
                        <span className="font-mono font-bold text-slate-900">
                          {formatIndianCurrency(summary.totalLimitA)}
                        </span>
                      </div>

                      {/* Limit B */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800">2. Rent Paid − 10% Salary</p>
                          <p className="text-[10px] text-slate-500">Rent in excess of 10%</p>
                        </div>
                        <span className="font-mono font-bold text-slate-900">
                          {formatIndianCurrency(summary.totalLimitB)}
                        </span>
                      </div>

                      {/* Limit C */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-800">3. 50% / 40% Salary Ceiling</p>
                          <p className="text-[10px] text-slate-500">Based on metro / non-metro</p>
                        </div>
                        <span className="font-mono font-bold text-slate-900">
                          {formatIndianCurrency(summary.totalLimitC)}
                        </span>
                      </div>
                    </div>

                    {/* Winning Limit Note */}
                    <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900 text-xs font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Governing: {summary.limitingFactor}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Statutory Warnings & CA Assist Callout */}
              {calculationWarnings.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Info className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Statutory Compliance Notice:</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-amber-800">
                    {calculationWarnings.map((warn, i) => (
                      <li key={i}>{warn}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Need CA Consultation Box */}
              <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-3 shadow-md">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-sm">Need CA Review for Salary Restructuring?</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our licensed Chartered Accountants help salaried professionals structure their CTC, claim joint rental agreements, and optimize Form 16 / ITR filing.
                </p>
                <Link
                  to="/contact"
                  className="w-full py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 transition block text-center"
                >
                  <span>Book 1-on-1 CA Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>
          )}

          {/* Deep Informational Tax Guide Section (SEO & Compliance) */}
          <div className="mt-12 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 space-y-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                Comprehensive Statutory Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Understanding House Rent Allowance (HRA) Exemption
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Section 10(13A) of the Income-tax Act, 1961 read with Rule 2A of the Income-tax Rules provides tax relief to salaried employees paying rent for residential accommodation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-bold text-sm text-slate-900">What Counts as Eligible Salary?</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  As affirmed by the Supreme Court in the <em>Gestetner Duplicators</em> ruling, salary includes Basic Pay, Dearness Allowance (only if considered for retirement benefits), and fixed turnover commission. Special allowances and bonuses are strictly excluded.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-bold text-sm text-slate-900">Metro vs Non-Metro Classification</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Only Delhi, Mumbai, Kolkata, and Chennai qualify for the 50% salary limit. IT hubs like Bengaluru, Hyderabad, Pune, Gurugram, and Noida legally fall under the 40% non-metro limit under Rule 2A.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-bold text-sm text-slate-900">Landlord PAN & Form 12BB</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If your annual rent exceeds ₹1,00,000, furnishing the landlord's PAN to your employer via Form 12BB is statutory. If the landlord has no PAN, a signed declaration in Form 60 must be secured.
                </p>
              </div>
            </div>

            {/* Rent to Parents FAQ */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Can I pay rent to my parents and claim HRA?</span>
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yes. You can legally claim HRA exemption by paying rent to your parents, provided they own the property. You must execute a formal registered/notarized rental agreement, transfer rent via bank transfer, and your parents must declare this rental income in their respective Income Tax Returns (ITRs). You cannot pay rent to your spouse.
              </p>
            </div>

            {/* Link to Income Tax Calculator & ITR Slab Checker */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#F26522] bg-white px-2 py-0.5 rounded-full border border-orange-200">
                  Dual-Regime Tax Planning
                </span>
                <h4 className="text-base font-extrabold text-[#111827]">
                  Want to see if your HRA is enough to beat the New Tax Regime?
                </h4>
                <p className="text-xs text-slate-600 max-w-xl">
                  Use our comprehensive Income Tax Calculator to compare Old vs New (Section 115BAC), calculate 87A Marginal Relief, and see your exact breakeven.
                </p>
              </div>
              <Link
                to="/tools/income-tax-calculator"
                className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-all"
              >
                <span>Income Tax Calculator</span>
                <ArrowRight className="w-4 h-4 text-[#F26522]" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
