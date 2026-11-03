import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Star,
  ArrowRight,
  Play,
  FileText,
  Package,
  Building2,
  Users,
  ChevronDown,
  Sparkles,
  Lock,
  CreditCard,
  X,
  Check,
  HeartHandshake,
  Award,
  Percent,
  Coins,
} from 'lucide-react';
import {
  SECTION8_HERO,
  TRUSTED_PARTNERS,
  SECTION8_BENEFITS,
  SECTION8_VS_OTHERS,
  DOCUMENTS_REQUIRED,
  REGISTRATION_PROCESS_STEPS,
  BUNDLED_PLANS,
  FAQS,
} from './constants.js';

export default function Section8LandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Lead Capture State
  const [phone, setPhone] = useState(initialData.phone || '');
  const [language, setLanguage] = useState(initialData.language || 'English');
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates !== undefined ? initialData.whatsappUpdates : true
  );
  const [leadErrors, setLeadErrors] = useState({});

  // Interactive Quick Action Modals
  const [activeModal, setActiveModal] = useState(null); // 'video' | 'sample' | null
  const [activeDocTab, setActiveDocTab] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Lead Submission
  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setLeadErrors({ phone: 'Please enter a valid 10-digit mobile number' });
      return;
    }

    setLeadErrors({});
    if (onSubmitLead) {
      onSubmitLead({
        phone: cleanPhone,
        language,
        whatsappUpdates,
      });
    }
  };

  // Plan Selection Handler
  const handlePlanClick = (packageId) => {
    if (onSelectPlan) {
      onSelectPlan(packageId);
    }
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-[#002B49] selection:text-white">
      {/* =========================================================================
          SECTION 1: HERO & FESTIVE LEAD CAPTURE
      ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white pt-6 pb-16 sm:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
            <a href="/" className="hover:text-slate-900 transition">
              Home
            </a>
            <span>&gt;</span>
            <a href="/services" className="hover:text-slate-900 transition">
              Company Registration
            </a>
            <span>&gt;</span>
            <span className="text-slate-900 font-semibold">
              Section 8 Company Registration
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Value Proposition & Hero Info (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* ISO 27001 Security Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-bold tracking-tight shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>{SECTION8_HERO.badge}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#002B49] tracking-tight leading-[1.15]">
                {SECTION8_HERO.title}
              </h1>

              {/* 4 Key Value Checkmarks */}
              <div className="space-y-3.5 pt-1">
                {SECTION8_HERO.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.2]" />
                    <span className="text-sm sm:text-base text-slate-700 leading-snug font-normal">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* 3 Quick Action Interactive Links */}
              <div className="pt-3 flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bold">
                {/* 1. Know about Section 8 in 60 sec */}
                <button
                  type="button"
                  onClick={() => setActiveModal('video')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-950 transition cursor-pointer bg-white shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5 fill-[#002B49] text-[#002B49]" />
                  <span>Know about Section 8 in 60 sec</span>
                </button>

                {/* 2. View Sample License & Certificate */}
                <button
                  type="button"
                  onClick={() => setActiveModal('sample')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-950 transition cursor-pointer bg-white shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-700" />
                  <span>View Sample License &amp; Certificate</span>
                </button>

                {/* 3. View Package */}
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-950 transition cursor-pointer bg-white shadow-2xs"
                >
                  <Package className="w-3.5 h-3.5 text-amber-600" />
                  <span>View Package</span>
                </button>
              </div>
            </div>

            {/* Right Column: Festive Lead Capture Card (5 cols) */}
            <div className="lg:col-span-5 relative">
              {/* Diwali Festive Sale Badge on top of card */}
              <div className="absolute -top-4 right-4 z-10 flex items-center gap-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md">
                <Sparkles className="w-3 h-3 text-yellow-200" />
                <span>{SECTION8_HERO.festiveBadge}</span>
              </div>

              {/* White Card Container */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-[0_20px_50px_rgba(0,43,73,0.08)] p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Register Your Section 8 NGO Today
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Central government license, 100% tax exemptions &amp; CSR-1 grant approval.
                  </p>
                </div>

                {/* Lead Form */}
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  {/* Mobile Number Input */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="Enter 10-digit mobile number"
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ''))
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 transition shadow-2xs"
                      />
                    </div>
                    {leadErrors.phone && (
                      <p className="text-xs text-rose-500 font-medium">
                        {leadErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Language Selector Dropdown */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">
                      Preferred Language for Expert Call
                    </label>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 bg-white appearance-none focus:outline-none focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 transition shadow-2xs cursor-pointer"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi (हिंदी)</option>
                        <option value="Tamil">Tamil (தமிழ்)</option>
                        <option value="Telugu">Telugu (తెలుగు)</option>
                        <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                        <option value="Marathi">Marathi (मराठी)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* WhatsApp Updates Switch */}
                  <div className="flex items-center justify-between pt-1 pb-1">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <span>Get easy updates through</span>
                      <strong className="text-emerald-700 font-bold flex items-center gap-1">
                        WhatsApp
                      </strong>
                    </div>

                    <button
                      type="button"
                      onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        whatsappUpdates ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform absolute top-0.5 ${
                          whatsappUpdates ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Submit CTA Button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer transform active:scale-[0.99]"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Rating Badges Strip */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-medium">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md text-amber-900 border border-amber-200/60 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>4.5/5 Google Rating</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>MCA Approved Experts</span>
                  </div>
                  <div className="text-slate-600 font-semibold">
                    🚀 5L+ Companies Registered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: TRUSTED PARTNERS MARQUEE STRIP
      ========================================================================= */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-[#002B49] mb-8 relative inline-block">
            <span>Trusted Partners</span>
            <span className="block h-0.5 w-12 bg-[#002B49] mx-auto mt-2" />
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all">
            {TRUSTED_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center h-10 w-24 sm:w-28"
                title={partner.name}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-7 max-w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML = `<span class="text-xs font-bold text-slate-600">${partner.name}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: STATS STRIP
      ========================================================================= */}
      <section className="py-10 bg-slate-50 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {SECTION8_HERO.stats.map((st, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <span className="text-2xl sm:text-3xl font-black text-[#002B49]">
                  {st.value}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: KEY BENEFITS OF SECTION 8 COMPANY
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full mb-2">
              Non-Profit Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Why Choose Section 8 Company for Your NGO?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              India&apos;s most respected corporate legal structure for philanthropic, social, and cultural missions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SECTION8_BENEFITS.map((benefit, bIdx) => (
              <div
                key={bIdx}
                className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-2xs hover:shadow-md transition-all hover:border-slate-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                  {bIdx === 0 && <ShieldCheck className="w-5 h-5" />}
                  {bIdx === 1 && <HeartHandshake className="w-5 h-5" />}
                  {bIdx === 2 && <Award className="w-5 h-5" />}
                  {bIdx === 3 && <Percent className="w-5 h-5" />}
                  {bIdx === 4 && <Building2 className="w-5 h-5" />}
                  {bIdx === 5 && <Coins className="w-5 h-5" />}
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {benefit.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: COMPARISON TABLE (SECTION 8 VS TRUST VS SOCIETY)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-3 py-1 rounded-full mb-2">
              NGO Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Section 8 Company vs Public Trust vs Society
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Understand the legal, financial, and regulatory differences before registering.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#002B49] text-white">
                    <th className="py-4 px-5 font-bold">Key Criteria</th>
                    <th className="py-4 px-5 font-bold bg-[#0B2545] border-l border-r border-white/20">
                      Section 8 Company (Recommended)
                    </th>
                    <th className="py-4 px-5 font-bold">Public Trust</th>
                    <th className="py-4 px-5 font-bold">Registered Society</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SECTION8_VS_OTHERS.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                    >
                      <td className="py-3.5 px-5 font-bold text-slate-900">
                        {row.feature}
                      </td>
                      <td className="py-3.5 px-5 font-semibold text-emerald-900 bg-emerald-50/40 border-l border-r border-emerald-100">
                        {row.section8}
                      </td>
                      <td className="py-3.5 px-5 text-slate-700">
                        {row.trust}
                      </td>
                      <td className="py-3.5 px-5 text-slate-500">
                        {row.society}
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
              Documents Required for Section 8 Company Registration
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              100% digital submission. No physical paperwork or visiting government offices.
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
          SECTION 7: 5-STEP REGISTRATION TIMELINE
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-3 py-1 rounded-full mb-2">
              Fast-Track Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              5 Simple Steps to Incorporate Your Section 8 NGO
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              From RUN-MCA name reservation to Central Government Form INC-16 licensing in 10 to 14 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {REGISTRATION_PROCESS_STEPS.map((st, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-blue-900">
                    {st.step}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800">
                    {st.days}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {st.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: TRANSPARENT PRICING PACKAGES
      ========================================================================= */}
      <section
        id="pricing-section"
        className="py-16 sm:py-24 bg-white border-t border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-3 py-1 rounded-full mb-2">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Select Your Section 8 Company Package
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Clear government portal filings, zero hidden charges, and dedicated
              CA &amp; CS guidance for your non-profit incorporation.
            </p>
          </div>

          {/* 3 Pricing Cards */}
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

                    {/* EMI Badge */}
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

                  {/* Primary Plan Button: Get Started ✨ */}
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

          {/* Guarantee Banner */}
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
          SECTION 9: FAQS ACCORDION
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full mb-2">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Frequently Asked Questions on Section 8 Companies
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Clear legal insights on Central Government Form INC-16 licensing, 12A/80G, and CSR-1 rules.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === idx ? null : idx)
                  }
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 transition hover:bg-slate-50 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                      expandedFaq === idx ? 'rotate-180 text-[#002B49]' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE MODAL 1: 60 SEC VIDEO GUIDE
      ========================================================================= */}
      {activeModal === 'video' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 space-y-4">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Section 8 Company in 60 Seconds
                </h3>
                <p className="text-xs text-slate-500">
                  Form INC-16 License, 12A/80G, and CSR-1 Grant Eligibility
                </p>
              </div>
            </div>

            <div className="aspect-video bg-slate-950 rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center space-y-3 relative overflow-hidden">
              <div className="w-14 h-14 rounded-full bg-blue-600/80 flex items-center justify-center shadow-lg">
                <Play className="w-7 h-7 fill-white translate-x-0.5" />
              </div>
              <div className="text-xs text-slate-300">
                Central Govt. License • 100% Tax Exempt • Pan-India Operation
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              A Section 8 Company is India’s most prestigious non-profit structure. Licensed under Section 8(1) of the Companies Act, it requires zero statutory capital, eliminates &quot;Pvt Ltd&quot; from its name, and qualifies for corporate CSR-1 funding and 80G tax deductions.
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                scrollToPricing();
              }}
              className="w-full py-3 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-xs transition cursor-pointer"
            >
              View Section 8 Plans &amp; Pricing
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE MODAL 2: SAMPLE LICENSE & CERTIFICATE
      ========================================================================= */}
      {activeModal === 'sample' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Form INC-16: License under Section 8(1)
                </h3>
                <p className="text-xs text-slate-500">
                  Government of India • Ministry of Corporate Affairs
                </p>
              </div>
            </div>

            {/* Specimen License View */}
            <div className="p-6 bg-[#FCFDFE] rounded-2xl border-2 border-dashed border-slate-300 space-y-4 text-xs font-serif text-slate-800">
              <div className="text-center space-y-1">
                <div className="font-sans text-[11px] font-black uppercase tracking-widest text-slate-600">
                  Government of India
                </div>
                <div className="font-sans text-xs font-black text-slate-900">
                  MINISTRY OF CORPORATE AFFAIRS
                </div>
                <div className="font-sans text-[11px] font-bold text-blue-900">
                  FORM NO. INC-16
                </div>
                <div className="text-[11px] text-slate-500 italic">
                  [Pursuant to section 8(1) of the Companies Act, 2013 and rule 19(2) of the Companies (Incorporation) Rules, 2014]
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-center font-bold text-sm text-slate-900">
                License under section 8(1) of the Companies Act, 2013
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 font-sans text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Foundation Name:</span>
                  <strong className="text-slate-900 font-bold">
                    VIDYA JYOTI SOCIAL WELFARE FOUNDATION
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">License Number:</span>
                  <strong className="text-slate-900 font-mono">
                    LIC/SEC8/CRC/2026/89410
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Corporate Identity No. (CIN):</span>
                  <strong className="text-slate-900 font-mono">
                    U85300DL2026NPL398114
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax Exempt PAN:</span>
                  <strong className="text-slate-900 font-mono">
                    AAACV9842K
                  </strong>
                </div>
              </div>

              <p className="text-justify leading-relaxed text-[11px] text-slate-700">
                The Central Government hereby grants this license directed that the said association be registered as a company with limited liability without the addition of the word &quot;Limited&quot; or &quot;Private Limited&quot; to its name.
              </p>

              <div className="text-right pt-2 font-sans text-[11px] text-slate-600">
                <div>Digital Signature Valid</div>
                <div className="font-bold text-slate-900">
                  Registrar of Companies, Central Registration Centre (CRC)
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="w-full py-3 rounded-xl bg-[#002B49] text-white font-bold text-xs cursor-pointer hover:bg-[#001D32] transition"
            >
              Close Specimen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
