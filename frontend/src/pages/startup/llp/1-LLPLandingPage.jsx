import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Play,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  Scale,
  Sparkles,
  ArrowRight,
  Gift,
  HelpCircle,
  Building2,
  Users,
  Award,
  Lock,
  Phone,
  Mail,
  Check,
  MapPin,
  Globe,
  Coins,
  CreditCard,
  Landmark,
  Package,
  Percent,
  FileCheck,
  Star,
  ExternalLink,
  Info,
} from 'lucide-react';
import {
  LLP_HERO,
  TRUSTED_PARTNERS,
  LLP_BENEFITS,
  LLP_VS_OTHERS,
  STATE_STAMP_DUTY,
  DOCUMENTS_REQUIRED,
  REGISTRATION_PROCESS_STEPS,
  BUNDLED_PLANS,
  FAQS,
} from './constants.js';

export default function LLPLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Lead form state matching screenshot & previous modules
  const [formData, setFormData] = useState({
    mobile: initialData.phone || initialData.mobile || '',
    email: initialData.email || '',
    cityPincode: initialData.cityPincode || '',
    language: initialData.language || 'English',
    whatsappUpdates: initialData.whatsappUpdates ?? true,
  });

  const [activeDocTab, setActiveDocTab] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.mobile || formData.mobile.trim().length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmitLead) {
        onSubmitLead(formData);
      }
    }, 400);
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlanClick = (planId) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    } else {
      scrollToPricing();
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-[#FFD200]/40 selection:text-slate-900">
      {/* =========================================================================
          SECTION 1: HERO & LEAD CAPTURE (1:1 with media_1793699920065_cb23d5bb.png)
      ========================================================================= */}
      <section className="relative overflow-hidden bg-white pt-5 pb-12 sm:pt-8 sm:pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs matching screenshot */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <li>
                <Link to="/" className="hover:text-slate-900 transition">
                  Home
                </Link>
              </li>
              <li>&gt;</li>
              <li>
                <Link to="/services" className="hover:text-slate-900 transition">
                  Company Registration
                </Link>
              </li>
              <li>&gt;</li>
              <li className="text-slate-900 font-semibold">
                LLP Registration
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Heading, ISO Pill, Bullets & Quick Links */}
            <div className="lg:col-span-7 space-y-5">
              {/* ISO 27001 Certification Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 shadow-2xs">
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-blue-950 flex items-center gap-1">
                  <span>Only ISO 27001 Certified Platform in</span>
                  <span className="text-sm">🇮🇳</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#002B49] tracking-tight leading-[1.18]">
                LLP Registration in India (Limited Liability Partnership)
              </h1>

              {/* 4 Value Bullets with blue checkmarks (1:1 with screenshot) */}
              <ul className="space-y-3 pt-1">
                {LLP_HERO.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* 3 Quick Action Links matching screenshot */}
              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                {/* 1. Know in 60 sec */}
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-900 transition underline underline-offset-4 decoration-slate-300 hover:decoration-blue-900 cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                  </div>
                  <span>Know about LLP registration in 60 sec</span>
                </button>

                {/* 2. View Sample Certificate */}
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-900 transition underline underline-offset-4 decoration-slate-300 hover:decoration-blue-900 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>View Sample Certificate</span>
                </button>

                {/* 3. View Package */}
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="inline-flex items-center gap-1.5 text-slate-700 hover:text-blue-900 transition underline underline-offset-4 decoration-slate-300 hover:decoration-blue-900 cursor-pointer"
                >
                  <Package className="w-4 h-4 text-slate-500" />
                  <span>View Package</span>
                </button>
              </div>
            </div>

            {/* Right Column: Lead Capture Card (1:1 with media_1793699920065_cb23d5bb.png) */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Diwali Festive Sale Offer Badge on top of card */}
                <div className="absolute -top-3.5 left-6 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-[11px] shadow-sm uppercase tracking-wider">
                    <span>✨</span>
                    <span>Diwali Festive Sale Offer</span>
                    <span>🪔</span>
                  </div>
                </div>

                {/* Main Card Container */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-[0_12px_40px_rgba(15,23,42,0.06)] relative pt-8">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight text-center mb-5">
                    Register Your LLP Today
                  </h3>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Mobile Number Input */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-slate-400">
                          +91
                        </div>
                        <input
                          type="tel"
                          required
                          maxLength="10"
                          placeholder="98765 43210"
                          value={formData.mobile}
                          onChange={(e) =>
                            handleInputChange(
                              'mobile',
                              e.target.value.replace(/\D/g, '')
                            )
                          }
                          className="w-full pl-12 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 transition"
                        />
                      </div>
                    </div>

                    {/* Email Input (standardized lead capture) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="founder@yourcompany.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>

                    {/* City / Pincode */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        City / Pincode
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai, 400001"
                        value={formData.cityPincode}
                        onChange={(e) =>
                          handleInputChange('cityPincode', e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>

                    {/* Language Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Language
                      </label>
                      <div className="relative">
                        <select
                          value={formData.language}
                          onChange={(e) =>
                            handleInputChange('language', e.target.value)
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white text-slate-800 appearance-none focus:outline-none focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 cursor-pointer"
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi (हिंदी)</option>
                          <option value="Marathi">Marathi (मराठी)</option>
                          <option value="Tamil">Tamil (தமிழ்)</option>
                          <option value="Telugu">Telugu (తెలుగు)</option>
                          <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                          <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* WhatsApp Updates Switch matching screenshot */}
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                        <span>Get easy updates through</span>
                        <strong className="text-emerald-700 font-bold">
                          WhatsApp
                        </strong>
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={formData.whatsappUpdates}
                        onClick={() =>
                          handleInputChange(
                            'whatsappUpdates',
                            !formData.whatsappUpdates
                          )
                        }
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          formData.whatsappUpdates
                            ? 'bg-emerald-600'
                            : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            formData.whatsappUpdates
                              ? 'translate-x-4'
                              : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Primary CTA Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 px-4 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                      >
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>

                  {/* 3 Trust Rating Badges below card (1:1 with media_1793699920065_cb23d5bb.png) */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-slate-600">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                      <span>⭐</span>
                      <span>4.5/5 Google Rating</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                      <span>✓</span>
                      <span>MCA Approved Experts</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200/60">
                      <span>🚀</span>
                      <span>5L+ Companies Registered</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TRUSTED PARTNERS (1:1 with screenshot)
      ========================================================================= */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block relative mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#002B49] tracking-tight">
              Trusted Partners
            </h2>
            <div className="w-12 h-0.5 bg-[#002B49] mx-auto mt-1 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 items-center justify-center opacity-80">
            {TRUSTED_PARTNERS.map((partner, pIdx) => (
              <div
                key={pIdx}
                className="flex items-center justify-center p-3 grayscale hover:grayscale-0 hover:opacity-100 transition"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-7 max-w-[120px] object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: STATS STRIP
      ========================================================================= */}
      <section className="py-8 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {LLP_HERO.stats.map((stat, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-[#002B49]">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: KEY BENEFITS OF LLP
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full mb-2">
              Why Choose an LLP
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Key Advantages of Limited Liability Partnership
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              The ideal corporate structure for professional services, IT agencies,
              consultancies, and modern startups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {LLP_BENEFITS.map((b, bIdx) => {
              const IconComp =
                b.icon === 'ShieldCheck'
                  ? ShieldCheck
                  : b.icon === 'Building2'
                  ? Building2
                  : b.icon === 'Coins'
                  ? Coins
                  : b.icon === 'FileCheck'
                  ? FileCheck
                  : b.icon === 'Percent'
                  ? Percent
                  : Scale;

              return (
                <div
                  key={bIdx}
                  className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#002B49] flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: COMPARISON TABLE (LLP vs Pvt Ltd vs Traditional Partnership)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-3 py-1 rounded-full mb-2">
              Entity Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              LLP vs Private Limited Company vs General Partnership
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Evaluate statutory compliance, member liability, tax impacts, and
              audit requirements across legal business structures in India.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#002B49] text-white font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-4 px-5 border-b border-[#001D32]">
                      Key Feature
                    </th>
                    <th className="py-4 px-5 border-b border-[#001D32] bg-[#00385F]">
                      Limited Liability Partnership (LLP) ⭐
                    </th>
                    <th className="py-4 px-5 border-b border-[#001D32]">
                      Private Limited Company (Pvt Ltd)
                    </th>
                    <th className="py-4 px-5 border-b border-[#001D32]">
                      Traditional Partnership Firm
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {LLP_VS_OTHERS.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                    >
                      <td className="py-3.5 px-5 font-bold text-slate-900">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-5 font-semibold text-emerald-900 bg-emerald-50/40">
                        {row.llp}
                      </td>
                      <td className="py-3.5 px-5 text-slate-700">
                        {row.pvtLtd}
                      </td>
                      <td className="py-3.5 px-5 text-slate-500">
                        {row.traditional}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: DOCUMENTS REQUIRED (TABBED CHECKLIST)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full mb-2">
              Checklist &amp; KYC
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Documents Required for LLP Registration
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              100% digital upload. No physical paperwork submission or visiting RoC office.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {DOCUMENTS_REQUIRED.map((tab, tIdx) => (
              <button
                key={tIdx}
                type="button"
                onClick={() => setActiveDocTab(tIdx)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeDocTab === tIdx
                    ? 'bg-[#002B49] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.category}
              </button>
            ))}
          </div>

          {/* Tab Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {DOCUMENTS_REQUIRED[activeDocTab].items.map((item, iIdx) => (
              <div
                key={iIdx}
                className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-xs">
                    0{iIdx + 1}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: STEP-BY-STEP INCORPORATION PROCESS
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-3 py-1 rounded-full mb-2">
              Turnaround &amp; Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              5-Step LLP Registration Process
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              End-to-end process executed on the MCA v3 portal within 7 to 10 working days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {REGISTRATION_PROCESS_STEPS.map((step, sIdx) => (
              <div
                key={sIdx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-blue-600/30">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      {step.days}
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: STATE-WISE STAMP DUTY ON LLP AGREEMENT
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full mb-2">
              Statutory Stamping
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              State-wise Stamp Duty on LLP Agreement (Form 3)
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Under Section 23 of the LLP Act 2008, every LLP Agreement must be
              executed on non-judicial stamp paper as per jurisdictional state rates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STATE_STAMP_DUTY.map((st, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      {st.state}
                    </h3>
                    {st.popular && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800">
                        Frequent
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-emerald-800 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                    {st.stampDuty}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Authority: {st.authority}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: TRANSPARENT PRICING PACKAGES (1:1 with Images 4 & 5)
      ========================================================================= */}
      <section
        id="pricing-section"
        className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-3 py-1 rounded-full mb-2">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Select Your LLP Registration Package
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Clear government portal filings, zero hidden charges, and dedicated
              CA &amp; CS guidance for your incorporation.
            </p>
          </div>

          {/* 3 Pricing Cards (1:1 with Images 4 & 5) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {BUNDLED_PLANS.map((pkg) => {
              const isDark = pkg.theme === 'dark';

              return (
                <div
                  key={pkg.id}
                  className={`rounded-2xl p-7 flex flex-col justify-between transition-all relative ${
                    isDark
                      ? 'bg-[#0B2545] text-white border-2 border-[#0B2545] shadow-xl md:-translate-y-2'
                      : 'bg-white text-slate-800 border border-slate-200/90 shadow-xs hover:border-slate-300'
                  }`}
                >
                  {/* Recommended Badge on Top of Standard Plan */}
                  {pkg.recommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFD200] text-slate-950 font-black text-[11px] px-3.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      {pkg.badge || 'Recommended'}
                    </div>
                  )}

                  <div>
                    {/* Header: Name and Subtitle */}
                    <div className="mb-4">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {pkg.name}
                      </span>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {pkg.subtitle}
                      </p>
                    </div>

                    {/* Pricing Row: Strikethrough + Discount */}
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs line-through ${
                          isDark ? 'text-slate-400' : 'text-rose-500'
                        }`}
                      >
                        ₹{pkg.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDark
                            ? 'bg-emerald-500 text-white'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {pkg.discount}
                      </span>
                    </div>

                    {/* Bold Final Price */}
                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className={`text-3xl sm:text-4xl font-extrabold ${
                          isDark ? 'text-white' : 'text-[#002B49]'
                        }`}
                      >
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {pkg.govtFeeNote || '+ Govt. Fee'}
                      </span>
                    </div>

                    {/* EMI Badge matching screenshot */}
                    <div className="text-[11px] font-medium text-slate-400 mb-6">
                      {pkg.emiText}
                    </div>

                    {/* Features List with checkmarks */}
                    <div
                      className={`space-y-3 pt-4 border-t mb-8 ${
                        isDark ? 'border-white/10' : 'border-slate-100'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        What&apos;s Included:
                      </span>
                      {pkg.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm"
                        >
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 stroke-[2.5] ${
                              isDark ? 'text-[#FFD200]' : 'text-emerald-600'
                            }`}
                          />
                          <span
                            className={`leading-snug ${
                              isDark ? 'text-slate-200' : 'text-slate-700'
                            }`}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Plan Button: Get Started ✨ (1:1 with Image 4) */}
                  <button
                    type="button"
                    onClick={() => handlePlanClick(pkg.id)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isDark
                        ? 'bg-[#FFD200] hover:bg-[#FACC15] text-slate-950 shadow-md hover:shadow-lg'
                        : 'bg-[#002B49] hover:bg-[#001D32] text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    <span>Get Started</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Guarantee Banner (1:1 with media_1793438026631_c42a93b3.png) */}
          <div className="mt-8 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Money-Back Guarantee if rejected on technical grounds</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Secure 256-bit Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-600" />
              <span>UPI, Debit/Credit Cards &amp; Net Banking Accepted</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: FAQS ACCORDION
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full mb-2">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Frequently Asked Questions on LLP Registration
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Everything you need to know about designated partners, capital contributions,
              and compliance for Limited Liability Partnerships in India.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-xl border border-slate-200/80 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                  }
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 cursor-pointer hover:bg-slate-100/50 transition"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODAL 1: 60 SEC EXPLAINER VIDEO
      ========================================================================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative border border-slate-100 space-y-4">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 text-[#002B49] font-black text-lg">
              <Play className="w-5 h-5 fill-[#002B49]" />
              <span>LLP Registration in 60 Seconds</span>
            </div>

            <div className="aspect-video bg-slate-950 rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center space-y-3 shadow-inner">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
              <div>
                <p className="text-sm font-bold">Limited Liability Partnership Explainer</p>
                <p className="text-xs text-slate-400 mt-1">
                  Limited Liability • Zero Minimum Capital • No Mandatory Audit up to ₹40L
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 pt-1">
              <p className="font-semibold text-slate-800">
                Key takeaway for business founders:
              </p>
              <p>
                An LLP gives you the limited liability protection of a Private Limited
                company with 70% lower annual compliance overheads.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsVideoModalOpen(false);
                scrollToPricing();
              }}
              className="w-full py-3 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white text-xs font-bold transition cursor-pointer"
            >
              View LLP Packages (Starting @ ₹999)
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: SAMPLE CERTIFICATE OF INCORPORATION PREVIEW
      ========================================================================= */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative border border-slate-100 space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsCertModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 text-[#002B49] font-black text-lg">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Sample Certificate of Incorporation (Form 16)</span>
            </div>

            {/* Specimen Document Container */}
            <div className="p-6 bg-[#FFFDF5] border-2 border-amber-300/80 rounded-2xl font-serif text-slate-900 space-y-4 shadow-xs relative">
              <div className="text-center space-y-1 border-b border-amber-200 pb-3">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-500">
                  GOVERNMENT OF INDIA • MINISTRY OF CORPORATE AFFAIRS
                </span>
                <h4 className="text-sm font-bold tracking-wide uppercase">
                  Registrar of Companies, Central Registration Centre
                </h4>
                <p className="text-[11px] text-slate-600 italic">
                  Certificate of Incorporation pursuant to Section 12(1) of the Limited Liability Partnership Act, 2008
                </p>
              </div>

              <div className="text-xs space-y-2.5 leading-relaxed font-sans text-slate-800">
                <p>
                  I hereby certify that <strong>BHARAT INNOVATION TECH LLP</strong> is incorporated pursuant to section 12(1) of the Limited Liability Partnership Act, 2008 on this day.
                </p>
                <div className="bg-amber-100/60 p-2.5 rounded-lg border border-amber-200 text-xs font-mono font-bold flex items-center justify-between">
                  <span>LLP Identification Number (LLPIN):</span>
                  <span className="text-[#002B49]">AAA-1234</span>
                </div>
                <div className="bg-amber-100/60 p-2.5 rounded-lg border border-amber-200 text-xs font-mono font-bold flex items-center justify-between">
                  <span>Permanent Account Number (PAN):</span>
                  <span className="text-[#002B49]">AAAFB1234K</span>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-200 flex items-center justify-between text-[10px] font-sans text-slate-500">
                <span>Registrar of Companies (ROC)</span>
                <span className="text-emerald-700 font-bold">✓ Digitally Signed &amp; MCA Verified</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsCertModalOpen(false);
                scrollToPricing();
              }}
              className="w-full py-3 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white text-xs font-bold transition cursor-pointer"
            >
              Get Your LLP Certificate with BharatFiling
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
