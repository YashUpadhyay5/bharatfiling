import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Code,
  RotateCcw,
  CheckCircle2,
  Info,
  Building2,
  Copy,
  Check,
  X,
  Languages,
} from 'lucide-react';
import SimplePieChart from '../common/SimplePieChart.jsx';
import { formatIndianCurrency } from '../../utils/hraTaxEngine.js';

export default function HRASimpleCalculatorCard({
  simpleInput,
  handleSimpleChange,
  summary,
  onSwitchToAdvanced,
}) {
  const [lang, setLang] = useState('en'); // 'en' | 'hi'
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const isMonthly = (simpleInput.frequency || 'monthly') === 'monthly';

  // Toggle Monthly vs Annually with automatic scale adjustment
  const handleFrequencyToggle = (newFreq) => {
    if (newFreq === simpleInput.frequency) return;

    if (newFreq === 'annual') {
      // Scale monthly values by 12
      handleSimpleChange('frequency', 'annual');
      handleSimpleChange('basicSalary', String((Number(simpleInput.basicSalary) || 0) * 12));
      handleSimpleChange('da', String((Number(simpleInput.da) || 0) * 12));
      handleSimpleChange('hraReceived', String((Number(simpleInput.hraReceived) || 0) * 12));
      handleSimpleChange('rentPaid', String((Number(simpleInput.rentPaid) || 0) * 12));
    } else {
      // Scale annual values down by 12
      handleSimpleChange('frequency', 'monthly');
      handleSimpleChange('basicSalary', String(Math.round((Number(simpleInput.basicSalary) || 0) / 12)));
      handleSimpleChange('da', String(Math.round((Number(simpleInput.da) || 0) / 12)));
      handleSimpleChange('hraReceived', String(Math.round((Number(simpleInput.hraReceived) || 0) / 12)));
      handleSimpleChange('rentPaid', String(Math.round((Number(simpleInput.rentPaid) || 0) / 12)));
    }
  };

  const handleReset = () => {
    if (isMonthly) {
      handleSimpleChange('basicSalary', '50000');
      handleSimpleChange('da', '0');
      handleSimpleChange('hraReceived', '20000');
      handleSimpleChange('rentPaid', '18000');
      handleSimpleChange('isMetro', false);
    } else {
      handleSimpleChange('basicSalary', '600000');
      handleSimpleChange('da', '0');
      handleSimpleChange('hraReceived', '240000');
      handleSimpleChange('rentPaid', '216000');
      handleSimpleChange('isMetro', false);
    }
  };

  const copyEmbedCode = () => {
    const code = `<iframe src="https://bharatfiling.org/tools/hra-calculator" width="100%" height="700" style="border:none; border-radius:16px; overflow:hidden;" title="BharatFiling HRA Calculator"></iframe>`;
    navigator.clipboard?.writeText(code);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  // Translations
  const t = {
    title: lang === 'hi' ? 'एचआरए कैलकुलेटर' : 'HRA Calculator',
    ruleBadge: 'RULE 2A',
    subtitle:
      lang === 'hi'
        ? 'आयकर अधिनियम की धारा 10(13A) और नियम 2A के तहत सटीक छूट गणना'
        : 'Accurate exemption under Section 10(13A) of Indian Income Tax Act',
    monthly: lang === 'hi' ? 'मासिक' : 'Monthly',
    annually: lang === 'hi' ? 'वार्षिक' : 'Annually',
    embed: lang === 'hi' ? 'एम्बेड' : 'Embed',
    basicSalary:
      lang === 'hi'
        ? `मूल वेतन (${isMonthly ? 'मासिक' : 'वार्षिक'})`
        : `Basic Salary (${isMonthly ? 'Monthly' : 'Annually'})`,
    da:
      lang === 'hi'
        ? `महंगाई भत्ता - DA (${isMonthly ? 'मासिक' : 'वार्षिक'})`
        : `Dearness Allowance - DA (${isMonthly ? 'Monthly' : 'Annually'})`,
    hraReceived:
      lang === 'hi'
        ? `प्राप्त एचआरए (${isMonthly ? 'मासिक' : 'वार्षिक'})`
        : `HRA Received (${isMonthly ? 'Monthly' : 'Annually'})`,
    rentPaid:
      lang === 'hi'
        ? `कुल चुकाया गया किराया (${isMonthly ? 'मासिक' : 'वार्षिक'})`
        : `Total Rent Paid (${isMonthly ? 'Monthly' : 'Annually'})`,
    metroQuestion:
      lang === 'hi'
        ? 'क्या आप दिल्ली, मुंबई, कोलकाता या चेन्नई में रहते हैं?'
        : 'Do You Live In Delhi, Mumbai, Kolkata or Chennai?',
    metroYes: lang === 'hi' ? 'हाँ (मेट्रो - 50%)' : 'Yes (Metro - 50%)',
    metroNo: lang === 'hi' ? 'नहीं (अन्य शहर - 40%)' : 'No (Non-Metro - 40%)',
    taxableHra: lang === 'hi' ? 'कर योग्य एचआरए' : 'Taxable HRA',
    exemptedHra: lang === 'hi' ? 'कर-मुक्त एचआरए' : 'Exempted HRA',
    comparisonTitle:
      lang === 'hi' ? 'नियम 2A वैधानिक सीमा तुलना' : 'Rule 2A Statutory Limit Comparison',
    winningRule:
      lang === 'hi'
        ? 'सबसे कम सीमा = आपकी कर-मुक्त छूट राशि'
        : 'Lowest Limit = Your Tax Exemption Amount',
    perMonth: lang === 'hi' ? '/माह' : '/mo',
    perYear: lang === 'hi' ? '/वर्ष' : '/yr',
    taxSavingsTitle: lang === 'hi' ? 'अनुमानित कर बचत' : 'Estimated Tax Savings',
  };

  // 3 Statutory Limits for display
  const limitA = summary.totalLimitA || 0;
  const limitB = summary.totalLimitB || 0;
  const limitC = summary.totalLimitC || 0;
  const maxLimit = Math.max(limitA, limitB, limitC, 1);

  // Scaled display values
  const displayTaxable = isMonthly ? summary.monthlyTaxableHra : summary.totalTaxableHra;
  const secondaryTaxable = isMonthly ? summary.totalTaxableHra : summary.monthlyTaxableHra;
  const displayExempt = isMonthly ? summary.monthlyExemptHra : summary.totalExemptHra;
  const secondaryExempt = isMonthly ? summary.totalExemptHra : summary.monthlyExemptHra;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-5xl mx-auto transition-all">
      {/* HEADER SECTION (MATCHING GEMINI CANVAS DESIGN) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
        {/* Left: Icon, Title, Badge & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
            ₹
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {t.title}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-[10px] font-black tracking-wider uppercase">
                {t.ruleBadge}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{t.subtitle}</p>
          </div>
        </div>

        {/* Right: Controls (Monthly/Annually Toggle, EN/हि, Reset, Embed) */}
        <div className="flex items-center gap-2">
          {/* Monthly / Annually Toggle Pill */}
          <div className="inline-flex p-1 bg-slate-100 rounded-full border border-slate-200/80 shadow-2xs">
            <button
              type="button"
              onClick={() => handleFrequencyToggle('monthly')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                isMonthly
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.monthly}
            </button>
            <button
              type="button"
              onClick={() => handleFrequencyToggle('annual')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                !isMonthly
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.annually}
            </button>
          </div>

          {/* Language Toggle: EN / हि */}
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1 shadow-2xs transition cursor-pointer"
            title="Toggle English / Hindi"
          >
            <Languages className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs shadow-2xs transition cursor-pointer"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Embed code button */}
          <button
            type="button"
            onClick={() => setShowEmbedModal(true)}
            className="px-3 py-1.5 rounded-xl bg-[#111827] text-white hover:bg-black text-xs font-bold flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
          >
            <Code className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.embed}</span>
          </button>
        </div>
      </div>

      {/* MAIN 2-COLUMN BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
        {/* LEFT COLUMN: USER INPUTS (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1. Basic Salary Received */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                {t.basicSalary}
              </label>
              <span className="text-xs font-mono font-bold text-blue-700">
                {formatIndianCurrency(simpleInput.basicSalary || 0)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="500"
                value={simpleInput.basicSalary}
                onChange={(e) => handleSimpleChange('basicSalary', e.target.value)}
                placeholder={isMonthly ? '50000' : '600000'}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          {/* 2. Dearness Allowance (DA) Received */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                {t.da}
              </label>
              <span className="text-xs font-mono font-bold text-blue-700">
                {formatIndianCurrency(simpleInput.da || 0)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="500"
                value={simpleInput.da || ''}
                onChange={(e) => handleSimpleChange('da', e.target.value)}
                placeholder={isMonthly ? '0' : '0'}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
            <p className="text-[10px] text-slate-400">
              * Included in Eligible Salary under Rule 2A (Gestetner Duplicators Supreme Court ruling).
            </p>
          </div>

          {/* 3. HRA Received from Employer */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                {t.hraReceived}
              </label>
              <span className="text-xs font-mono font-bold text-blue-700">
                {formatIndianCurrency(simpleInput.hraReceived || 0)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="500"
                value={simpleInput.hraReceived}
                onChange={(e) => handleSimpleChange('hraReceived', e.target.value)}
                placeholder={isMonthly ? '20000' : '240000'}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
          </div>

          {/* 4. Total Rent Paid */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                {t.rentPaid}
              </label>
              <span className="text-xs font-mono font-bold text-blue-700">
                {formatIndianCurrency(simpleInput.rentPaid || 0)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="500"
                value={simpleInput.rentPaid}
                onChange={(e) => handleSimpleChange('rentPaid', e.target.value)}
                placeholder={isMonthly ? '18000' : '216000'}
                className="w-full h-11 pl-9 pr-3 text-sm font-semibold text-slate-900 bg-slate-50/50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>
            {summary.minRentForExemption > 0 && (
              <p className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>
                  10% of Salary threshold:{' '}
                  <strong>
                    {formatIndianCurrency(
                      isMonthly ? Math.round(summary.minRentForExemption / 12) : summary.minRentForExemption
                    )}
                  </strong>
                </span>
                <span
                  className={
                    Number(simpleInput.rentPaid) > (isMonthly ? summary.minRentForExemption / 12 : summary.minRentForExemption)
                      ? 'text-emerald-600 font-semibold'
                      : 'text-amber-600 font-semibold'
                  }
                >
                  {Number(simpleInput.rentPaid) > (isMonthly ? summary.minRentForExemption / 12 : summary.minRentForExemption)
                    ? '✓ Rent exceeds 10%'
                    : '⚠ Rent ≤ 10% (No Exemption)'}
                </span>
              </p>
            )}
          </div>

          {/* 5. Metro City Question */}
          <div className="pt-2 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80">
            <label className="block text-xs sm:text-sm font-bold text-slate-900 mb-2">
              {t.metroQuestion}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSimpleChange('isMetro', true)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  simpleInput.isMetro === true
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{t.metroYes}</span>
                {simpleInput.isMetro === true && <Check className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => handleSimpleChange('isMetro', false)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  simpleInput.isMetro === false
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{t.metroNo}</span>
                {simpleInput.isMetro === false && <Check className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Note: Under Indian Tax Law, only Delhi, Mumbai, Kolkata, and Chennai qualify for the 50% salary ceiling. Bengaluru, Hyderabad, Pune, and Gurugram qualify for 40%.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE RESULTS, PIE CHART & STATISTICAL TOOLS (5 COLS) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Top Result Dual-Display: Taxable HRA & Exempted HRA */}
          <div className="grid grid-cols-2 gap-3">
            {/* Taxable HRA Card */}
            <div className="p-3.5 bg-sky-50/80 rounded-2xl border border-sky-200 text-left">
              <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wide block mb-0.5">
                {t.taxableHra}
              </span>
              <div className="text-lg sm:text-xl font-black text-[#002D62] font-mono leading-tight">
                {formatIndianCurrency(displayTaxable)}
                <span className="text-xs font-normal text-slate-500 ml-1">
                  {isMonthly ? t.perMonth : t.perYear}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 font-mono">
                {isMonthly ? `${formatIndianCurrency(secondaryTaxable)}${t.perYear}` : `${formatIndianCurrency(secondaryTaxable)}${t.perMonth}`}
              </p>
            </div>

            {/* Exempted HRA Card */}
            <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-left">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block mb-0.5">
                {t.exemptedHra}
              </span>
              <div className="text-lg sm:text-xl font-black text-emerald-700 font-mono leading-tight">
                {formatIndianCurrency(displayExempt)}
                <span className="text-xs font-normal text-slate-500 ml-1">
                  {isMonthly ? t.perMonth : t.perYear}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 font-mono">
                {isMonthly ? `${formatIndianCurrency(secondaryExempt)}${t.perYear}` : `${formatIndianCurrency(secondaryExempt)}${t.perMonth}`}
              </p>
            </div>
          </div>

          {/* SVG Pie Chart Card */}
          <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-slate-200/60 flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-2.5 border-b border-slate-200/60 text-xs font-bold text-slate-700">
              <span>HRA Exemption Breakdown</span>
              <span className="font-mono text-slate-900">
                Total: {formatIndianCurrency(summary.totalHraReceived)}
              </span>
            </div>

            <div className="my-4">
              <SimplePieChart
                size={170}
                slices={[
                  { label: 'Exempted HRA', value: summary.totalExemptHra, color: '#059669' },
                  { label: 'Taxable HRA', value: summary.totalTaxableHra, color: '#0284C7' },
                ]}
              />
            </div>

            {/* Chart Legend */}
            <div className="w-full grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-200/60 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#059669] shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Exempted</p>
                  <p className="font-bold text-emerald-800 font-mono text-xs">
                    {formatIndianCurrency(summary.totalExemptHra)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#0284C7] shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Taxable</p>
                  <p className="font-bold text-sky-800 font-mono text-xs">
                    {formatIndianCurrency(summary.totalTaxableHra)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* STATISTICAL TOOL 1: Rule 2A 3-Limit Comparison Visualizer */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">{t.comparisonTitle}</h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Rule 2A
              </span>
            </div>

            {/* Limit A Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-600">1. Actual HRA Received:</span>
                <span className="font-mono font-bold text-slate-900">{formatIndianCurrency(limitA)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    summary.totalExemptHra === limitA ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                  style={{ width: `${Math.min(100, Math.round((limitA / maxLimit) * 100))}%` }}
                />
              </div>
            </div>

            {/* Limit B Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-600">2. Rent Paid - 10% Salary:</span>
                <span className="font-mono font-bold text-slate-900">{formatIndianCurrency(limitB)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    summary.totalExemptHra === limitB ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                  style={{ width: `${Math.min(100, Math.round((limitB / maxLimit) * 100))}%` }}
                />
              </div>
            </div>

            {/* Limit C Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-600">3. {simpleInput.isMetro ? '50%' : '40%'} of Salary Cap:</span>
                <span className="font-mono font-bold text-slate-900">{formatIndianCurrency(limitC)}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    summary.totalExemptHra === limitC ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                  style={{ width: `${Math.min(100, Math.round((limitC / maxLimit) * 100))}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Governing: <strong>{summary.limitingFactor}</strong></span>
            </div>
          </div>

          {/* STATISTICAL TOOL 2: Tax Bracket Savings Table */}
          <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-200 text-xs space-y-2">
            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {t.taxSavingsTitle} across Tax Slabs:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2 rounded-xl border border-emerald-200">
                <p className="text-[10px] text-slate-500 font-bold">30% Slab</p>
                <p className="font-mono font-black text-emerald-700 text-xs">
                  {formatIndianCurrency(summary.taxSavedAt30Percent || Math.round(summary.totalExemptHra * 0.312))}
                </p>
              </div>
              <div className="bg-white p-2 rounded-xl border border-emerald-200">
                <p className="text-[10px] text-slate-500 font-bold">20% Slab</p>
                <p className="font-mono font-black text-emerald-700 text-xs">
                  {formatIndianCurrency(summary.taxSavedAt20Percent || Math.round(summary.totalExemptHra * 0.208))}
                </p>
              </div>
              <div className="bg-white p-2 rounded-xl border border-emerald-200">
                <p className="text-[10px] text-slate-500 font-bold">10% Slab</p>
                <p className="font-mono font-black text-emerald-700 text-xs">
                  {formatIndianCurrency(summary.taxSavedAt10Percent || Math.round(summary.totalExemptHra * 0.104))}
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Mode Link */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onSwitchToAdvanced}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition cursor-pointer"
            >
              <span>Mid-year salary increment or city relocation?</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* EMBED MODAL */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Embed HRA Calculator Widget</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEmbedModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Copy this lightweight HTML embed snippet to display the BharatFiling HRA Calculator on your website, blog, or intranet portal.
            </p>
            <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
              <code>{`<iframe src="https://bharatfiling.org/tools/hra-calculator" width="100%" height="700" style="border:none; border-radius:16px;" title="BharatFiling HRA Calculator"></iframe>`}</code>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowEmbedModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={copyEmbedCode}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copiedEmbed ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmbed ? 'Copied!' : 'Copy Embed Code'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
