import React, { useState, useMemo } from 'react';
import {
  Landmark,
  BadgeCheck,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  Building,
  HelpCircle,
  PlayCircle,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Gift,
  ArrowRight,
  Calculator,
  Percent,
  FileSpreadsheet,
  Coins,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

import {
  LOANS_HERO,
  LENDING_PARTNERS,
  LOAN_SCHEMES,
  LOAN_STEPS,
  TESTIMONIALS,
  FAQS,
} from './constants.js';

export default function LoansLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectScheme,
}) {
  // Lead form state
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    desiredAmount: initialData.desiredAmount || 1500000,
    cityPincode: initialData.cityPincode || '',
    whatsappUpdates: initialData.whatsappUpdates ?? true,
  });

  const [formError, setFormError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Video and Refer modals
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [referModalOpen, setReferModalOpen] = useState(false);
  const [referCopied, setReferCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // EMI Calculator State
  const [calcAmount, setCalcAmount] = useState(1500000);
  const [calcRate, setCalcRate] = useState(11.99);
  const [calcTenureYears, setCalcTenureYears] = useState(3);

  // EMI calculation logic: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const emiCalculation = useMemo(() => {
    const P = calcAmount;
    const r = calcRate / (12 * 100);
    const n = calcTenureYears * 12;
    if (r === 0) {
      const emi = Math.round(P / n);
      return {
        emi,
        totalInterest: 0,
        totalPayable: P,
        minTurnover: Math.round(emi * 4.5),
      };
    }
    const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    const totalPayable = emi * n;
    const totalInterest = totalPayable - P;
    const minTurnover = Math.round(emi * 4.5); // Recommended ~22% FOIR
    return {
      emi,
      totalInterest,
      totalPayable,
      minTurnover,
    };
  }, [calcAmount, calcRate, calcTenureYears]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setFormError('');
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setFormError('Please enter a valid business email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (onSubmitLead) {
      onSubmitLead({
        ...formData,
        desiredAmount: Number(formData.desiredAmount),
      });
    }
  };

  const handleSchemeClick = (scheme) => {
    if (onSelectScheme) {
      onSelectScheme(scheme);
    } else if (onSubmitLead) {
      onSubmitLead({
        ...formData,
        selectedSchemeId: scheme.id,
        selectedSchemeName: scheme.name,
      });
    }
  };

  const filteredSchemes = useMemo(() => {
    if (activeCategory === 'all') return LOAN_SCHEMES;
    if (activeCategory === 'unsecured') return LOAN_SCHEMES.filter((s) => s.id === 'unsecured-business');
    if (activeCategory === 'govt') return LOAN_SCHEMES.filter((s) => s.id === 'mudra-pmmy' || s.id === 'working-capital-cgtmse');
    if (activeCategory === 'asset') return LOAN_SCHEMES.filter((s) => s.id === 'machinery-equipment' || s.id === 'loan-against-property');
    if (activeCategory === 'cma') return LOAN_SCHEMES.filter((s) => s.id === 'cma-project-report');
    if (activeCategory === 'custom') return LOAN_SCHEMES.filter((s) => s.id === 'custom-loan-advisory');
    return LOAN_SCHEMES;
  }, [activeCategory]);

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. Hindi Switcher Top Banner */}
      <div className="bg-[#EBF5FB] border-b border-sky-100 py-1.5 px-4 text-center text-xs text-slate-700">
        <span>Now you can read this page in Hindi. </span>
        <button
          type="button"
          onClick={() => alert('Hindi language view activated')}
          className="text-blue-600 font-semibold hover:underline cursor-pointer ml-1"
        >
          Change language to हिन्दी
        </button>
      </div>

      {/* Floating Refer A Friend Ribbon */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <button
          type="button"
          onClick={() => setReferModalOpen(true)}
          className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs py-3 px-2 rounded-l-lg shadow-lg flex items-center gap-1.5 [writing-mode:vertical-rl] rotate-180 transition cursor-pointer"
        >
          <Gift className="w-3.5 h-3.5 rotate-90" />
          <span>Refer a friend</span>
        </button>
      </div>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Headline & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              {/* ISO Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#002B49] text-xs font-semibold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{LOANS_HERO.badge}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002B49] tracking-tight leading-tight">
                {LOANS_HERO.title}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {LOANS_HERO.subtitle}
              </p>

              {/* Highlights */}
              <div className="space-y-3 pt-2">
                {LOANS_HERO.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-full bg-emerald-100 p-1 text-emerald-700 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 leading-snug">
                      {h}
                    </span>
                  </div>
                ))}
              </div>

              {/* Video Guide Link */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#002B49] hover:text-blue-700 underline underline-offset-4 cursor-pointer group"
                >
                  <PlayCircle className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span>{LOANS_HERO.guideLinkText}</span>
                </button>
              </div>

              {/* Quick stats pills */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
                  <div className="text-lg sm:text-xl font-black text-[#002B49]">35+</div>
                  <div className="text-[11px] text-slate-500 font-medium">Bank & NBFC Partners</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
                  <div className="text-lg sm:text-xl font-black text-emerald-600">₹500 Cr+</div>
                  <div className="text-[11px] text-slate-500 font-medium">Credit Disbursed</div>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-center">
                  <div className="text-lg sm:text-xl font-black text-blue-600">94.8%</div>
                  <div className="text-[11px] text-slate-500 font-medium">Sanction Rate</div>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-7">
                {/* Festive Ribbon */}
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black uppercase tracking-wider py-1 px-3 rounded-full shadow-md flex items-center gap-1.5">
                  <span>🪔 Festive Loan Desk</span>
                </div>

                <div className="mb-5">
                  <h2 className="text-xl font-black text-[#002B49]">
                    Check Loan Eligibility & Apply
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Takes under 2 minutes • No impact on your CIBIL score
                  </p>
                </div>

                {formError && (
                  <div className="mb-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name / Promoter Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Shah"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@company.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        maxLength="10"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                        required
                        className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Desired Loan Amount Pills */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        Required Loan Amount:
                      </label>
                      <span className="text-xs font-black text-blue-600">
                        ₹{(formData.desiredAmount / 100000).toFixed(1)} Lakhs
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[500000, 1500000, 3500000, 7500000].map((amt) => {
                        const display = amt >= 10000000 ? `₹${amt / 10000000} Cr` : `₹${amt / 100000} L`;
                        const isSelected = formData.desiredAmount === amt;
                        return (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setFormData((p) => ({ ...p, desiredAmount: amt }))}
                            className={`py-1.5 px-2 rounded-lg text-xs font-bold border transition text-center cursor-pointer ${
                              isSelected
                                ? 'bg-[#002B49] text-white border-[#002B49]'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {display}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* City / Pincode */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / Pincode
                    </label>
                    <input
                      type="text"
                      name="cityPincode"
                      value={formData.cityPincode}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai / 400001"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                  </div>

                  {/* WhatsApp Toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600 font-medium">
                      Get instant loan updates on WhatsApp
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="whatsappUpdates"
                        checked={formData.whatsappUpdates}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#002B49] hover:bg-[#001f35] text-white font-black text-sm tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Check Eligibility & Apply</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="text-[11px] text-center text-slate-400">
                    🔒 Bank-grade 256-bit encryption. Zero Spam Guarantee.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trusted Lending Partners Bar */}
      <section className="py-8 bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-5">
            Lending Partners & Banking Network
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 items-center">
            {LENDING_PARTNERS.map((partner) => (
              <div
                key={partner.code}
                className="bg-white rounded-xl py-3 px-2 border border-slate-200 shadow-2xs hover:shadow-sm transition flex flex-col items-center justify-center text-center"
              >
                <span className="text-xs font-black text-[#002B49] tracking-tight">
                  {partner.name}
                </span>
                <span className="text-[10px] text-emerald-600 font-bold mt-0.5">
                  Max {partner.maxFunding}
                </span>
              </div>
            ))}
          </div>

          {/* Unlisted Loan Callout Banner */}
          <div className="mt-10 bg-gradient-to-r from-[#001f35] via-[#002B49] to-indigo-950 rounded-2xl p-6 text-white shadow-md border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Loan Not Listed or Not Available?</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Looking for another loan scheme? Take 1-on-1 Advisory
              </h3>
              <p className="text-xs text-blue-100/90 leading-relaxed max-w-2xl">
                If the financing instrument you need (such as Export Credit, Healthcare, Solar Project, Invoice Discounting, Builder Debt, or Stressed Asset Refinancing) is not listed here, take advisory with our Senior CA & Ex-Bank Credit Appraisal Committee.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const customScheme = LOAN_SCHEMES.find((s) => s.id === 'custom-loan-advisory');
                if (customScheme) handleSchemeClick(customScheme);
              }}
              className="shrink-0 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Take Custom Advisory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Interactive EMI & Loan Affordability Calculator */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Smart Credit Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Business Loan EMI & Affordability Calculator
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Plan your capital requirements with accurate monthly EMI forecasts, total interest payout, and required business turnover.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Amount Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Loan Amount
                  </span>
                  <span className="text-lg font-black text-[#002B49]">
                    ₹{(calcAmount).toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="50000"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#002B49]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>₹1 Lakh</span>
                  <span>₹25 Lakhs</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1 Crore</span>
                </div>
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Interest Rate (% per annum)
                  </span>
                  <span className="text-lg font-black text-blue-600">
                    {calcRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min="8.5"
                  max="18"
                  step="0.1"
                  value={calcRate}
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex gap-2 mt-2">
                  {[
                    { label: 'MUDRA (8.5%)', rate: 8.5 },
                    { label: 'LAP (8.9%)', rate: 8.9 },
                    { label: 'Machinery (9.5%)', rate: 9.5 },
                    { label: 'Unsecured (11.99%)', rate: 11.99 },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setCalcRate(preset.rate)}
                      className={`text-[11px] px-2.5 py-1 rounded-md border font-semibold transition cursor-pointer ${
                        calcRate === preset.rate
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tenure Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase">
                    Repayment Tenure
                  </span>
                  <span className="text-lg font-black text-slate-800">
                    {calcTenureYears} Years ({calcTenureYears * 12} Months)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  step="1"
                  value={calcTenureYears}
                  onChange={(e) => setCalcTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>1 Year</span>
                  <span>2 Yrs</span>
                  <span>3 Yrs</span>
                  <span>5 Yrs</span>
                  <span>7 Years</span>
                </div>
              </div>
            </div>

            {/* Results Card (Right 5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4">
                Estimated Repayment Summary
              </div>

              <div className="bg-[#002B49] text-white rounded-xl p-4 text-center mb-4">
                <div className="text-xs text-blue-200 font-medium">Monthly EMI</div>
                <div className="text-3xl font-black mt-1">
                  ₹{emiCalculation.emi.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-blue-300 mt-1">for {calcTenureYears * 12} months</div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Principal Borrowed</span>
                  <span className="font-bold text-slate-800">
                    ₹{calcAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Total Interest Payable</span>
                  <span className="font-bold text-emerald-600">
                    ₹{emiCalculation.totalInterest.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Total Amount Payable</span>
                  <span className="font-bold text-[#002B49]">
                    ₹{emiCalculation.totalPayable.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500 text-xs">Min. Monthly Turnover Req.</span>
                  <span className="font-bold text-blue-600 text-xs">
                    ~₹{emiCalculation.minTurnover.toLocaleString('en-IN')}/mo
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFormData((p) => ({ ...p, desiredAmount: calcAmount }));
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="w-full mt-6 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Apply for this ₹{(calcAmount / 100000).toFixed(1)}L Loan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Loan Schemes Showcase (The 6 Schemes) */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Explore Business & MSME Loan Schemes
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Select the financing instrument customized for your company’s growth stage, capital expenditure, or working capital cycle.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { id: 'all', label: 'All Schemes' },
                { id: 'unsecured', label: 'Unsecured Business' },
                { id: 'govt', label: 'Govt & MUDRA' },
                { id: 'asset', label: 'Machinery & Property' },
                { id: 'cma', label: 'Bank Project Reports' },
                { id: 'custom', label: 'Loan Not Listed / Custom Advisory' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`py-1.5 px-3.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#002B49] text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase">
                      {scheme.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {scheme.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#002B49] group-hover:text-blue-700 transition-colors">
                    {scheme.name}
                  </h3>

                  <div className="mt-3 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Funding Limit</span>
                      <span className="font-extrabold text-[#002B49]">{scheme.amount}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Interest Rate</span>
                      <span className="font-extrabold text-emerald-600">{scheme.interestRate}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mt-3">
                    {scheme.description}
                  </p>

                  <div className="mt-4 space-y-1.5">
                    {scheme.keyFeatures.slice(0, 3).map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>⚡ Disbursal: {scheme.disbursal}</span>
                    <span>🛡️ {scheme.collateral}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleSchemeClick(scheme)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-[#002B49] text-slate-800 hover:text-white font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Check Eligibility & Apply</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Step-by-Step Approval Process */}
      <section className="py-14 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              How the Loan Process Works
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              From online profile submission to direct current account disbursal in 4 transparent stages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOAN_STEPS.map((st) => (
              <div
                key={st.step}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 relative hover:shadow-sm transition"
              >
                <div className="text-3xl font-black text-blue-600/30 mb-2 font-mono">
                  {st.step}
                </div>
                <h3 className="text-base font-extrabold text-[#002B49] mb-2">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Reviews & Testimonials */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Trusted by 10,000+ Indian MSMEs
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Hear from manufacturing, retail, and technology founders funded through BharatFiling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {t.amount}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{t.content}"
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{t.name}</div>
                    <div className="text-[11px] text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQs Accordion */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Clear answers on collateral, CIBIL requirements, government schemes, and disbursals.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-4 px-5 text-left font-bold text-sm text-[#002B49] flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50"
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Guide Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black text-[#002B49] mb-2">
              Guide: MSME & Business Loans in India
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Watch how our CA credit appraisal desk secures quick bank sanctions with zero collateral.
            </p>
            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-white text-center p-6">
              <div>
                <PlayCircle className="w-12 h-12 text-blue-400 mx-auto mb-2 opacity-90" />
                <div className="text-sm font-bold">Comprehensive MSME Loan Masterclass</div>
                <div className="text-xs text-slate-400 mt-1">Explaining MUDRA, CGTMSE & Working Capital Limits</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refer a Friend Modal */}
      {referModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-center">
            <button
              type="button"
              onClick={() => {
                setReferModalOpen(false);
                setReferCopied(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-[#002B49]">Refer a Fellow Entrepreneur</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Share your referral link. When your friend applies for a loan or CA services, both of you earn ₹1,000 credit coupons.
            </p>
            <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl mb-4">
              <input
                type="text"
                readOnly
                value="https://bharatfiling.com/loans?ref=FOUNDER2026"
                className="bg-transparent text-xs text-slate-700 font-mono w-full outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText('https://bharatfiling.com/loans?ref=FOUNDER2026');
                  setReferCopied(true);
                }}
                className="px-3 py-1 bg-[#002B49] text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-slate-800"
              >
                {referCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
