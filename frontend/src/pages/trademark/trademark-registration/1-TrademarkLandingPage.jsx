import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Search,
  Building2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  AlertCircle,
  FileText,
  BadgeCheck,
  Award,
  Globe2,
  Lock,
  Gift,
  MessageSquare,
  Sparkles,
  PhoneCall,
  User,
  CheckCircle2,
  Layers,
  FileCheck,
  Scale,
  Zap,
  Info,
  Clock,
  ExternalLink,
} from 'lucide-react';

import {
  NICE_CLASSES,
  APPLICANT_TYPES,
  TRADEMARK_TYPES,
  TRADEMARK_PLANS,
  TM_VS_R_GUIDE,
  TRADEMARK_STEPS,
  TRADEMARK_DOCUMENTS,
  TRUST_STATS,
  TRADEMARK_FAQS,
} from './constants.js';

export default function TrademarkLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Lead form state matching screenshot
  const [email, setEmail] = useState(initialData.email || 'yashupadhyay@example.com');
  const [phone, setPhone] = useState(
    initialData.phone ? String(initialData.phone).replace('+91', '').trim() : '7668976193'
  );
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates !== undefined ? initialData.whatsappUpdates : true
  );
  const [formError, setFormError] = useState('');

  // Class Finder State
  const [classSearch, setClassSearch] = useState('');
  const [activeClassTab, setActiveClassTab] = useState('all'); // 'all', 'goods', 'services'
  const [selectedClassId, setSelectedClassId] = useState(null);

  // Documents Required active tab
  const [activeDocTab, setActiveDocTab] = useState('individual');

  // FAQs search and active accordion
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Referral modal state
  const [showReferralModal, setShowReferralModal] = useState(false);

  // Handle lead form submission
  const handleLeadSubmit = (e) => {
    if (e) e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setFormError('');

    const leadPayload = {
      email: email.trim(),
      phone: `+91 ${cleanPhone.slice(-10)}`,
      whatsappUpdates,
      selectedClassId,
      applicantType: activeDocTab,
    };

    if (onSubmitLead) {
      onSubmitLead(leadPayload);
    }
  };

  // Filtered Nice Classes
  const filteredClasses = NICE_CLASSES.filter((c) => {
    const matchesTab =
      activeClassTab === 'all' ||
      (activeClassTab === 'goods' && c.type === 'goods') ||
      (activeClassTab === 'services' && c.type === 'services');

    const q = classSearch.toLowerCase().trim();
    if (!q) return matchesTab;

    const matchesQuery =
      c.number.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.popularItems.some((item) => item.toLowerCase().includes(q));

    return matchesTab && matchesQuery;
  });

  // Filtered FAQs
  const filteredFaqs = TRADEMARK_FAQS.filter((faq) => {
    const q = faqSearch.toLowerCase().trim();
    if (!q) return true;
    return faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900 relative">
      {/* =========================================================================
          HERO FOLD (Strict 1:1 match of screenshot media_1793180754793_85d07915.png)
          ========================================================================= */}
      <section className="bg-white border-b border-gray-200 pt-6 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5 font-medium">
            <span className="hover:text-gray-700 cursor-pointer">Home</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-[#002B49] font-semibold">Trademark Registration</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              {/* ISO Certification Pill */}
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#002B49] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Only ISO 27001 Certified Platform in 🇮🇳</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#002B49] tracking-tight leading-[1.2]">
                Online Trademark Registration Starting at{' '}
                <span className="text-emerald-600 font-black">₹1,199</span> + Govt. Fees
              </h1>

              {/* Legal Review Summary Container */}
              <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
                <p className="text-sm leading-relaxed text-slate-700 font-normal">
                  Trademark registration in India helps protect your brand name, logo, symbol, or
                  other trademark under the Trade Marks Act, 1999. We can help file Form TM-A with the
                  Trade Marks Registry and secure registration for 10 years, renewable in further
                  10-year periods. Government e-filing fees are ₹4,500 per class for individuals,
                  startups and small enterprises, and ₹9,000 for other applicants.
                </p>

                {/* Attribution and Update Info */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-[10px]">
                      LA
                    </div>
                    <span>
                      Reviewed by{' '}
                      <span className="text-[#002B49] font-bold underline cursor-pointer hover:text-blue-700">
                        Lakshita Arya
                      </span>
                      , Trademark and IP Law Expert
                    </span>
                  </div>
                  <span className="text-slate-500 font-medium">
                    Last Updated on Sep 11 2026, 04:09 PM
                  </span>
                </div>
              </div>

              {/* Three Bullet Points with Green Checkmarks */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  </div>
                  <p className="text-sm text-slate-700 leading-normal">
                    <strong className="text-slate-900 font-semibold">Transparent Pricing:</strong>{' '}
                    Online trademark registration online from ₹1,499 + government fee, with regular
                    status updates from IP professionals. T&amp;C*
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  </div>
                  <p className="text-sm text-slate-700 leading-normal">
                    <strong className="text-slate-900 font-semibold">Search Before Filing:</strong>{' '}
                    A trademark professional checks availability and relevant classes before filing,
                    helping you decide whether to register trademark india for your proposed mark.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  </div>
                  <p className="text-sm text-slate-700 leading-normal">
                    <strong className="text-slate-900 font-semibold">Expert Consultation:</strong>{' '}
                    Get a 30-minute consultation with a trademark expert as part of your plan.
                  </p>
                </div>
              </div>

              {/* Anchor Quick Links */}
              <div className="flex items-center gap-6 pt-3 text-sm font-semibold text-blue-700">
                <a
                  href="#trademark-process"
                  className="inline-flex items-center gap-2 hover:underline hover:text-[#002B49] transition-colors"
                >
                  <span className="text-blue-600 text-base">⦿</span> Trademark Registration Process
                </a>
                <a
                  href="#trademark-packages"
                  className="inline-flex items-center gap-2 hover:underline hover:text-[#002B49] transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-600" /> View Package
                </a>
              </div>
            </div>

            {/* Right Column: Lead Form Card (Matching Screenshot) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-6">
                {/* Diwali Festive Sale Offer Banner */}
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 px-4 py-2.5 text-center text-white font-bold text-sm tracking-wide shadow-xs flex items-center justify-center gap-2">
                  <span>🪔</span>
                  <span>Diwali Festive Sale Offer</span>
                  <span>🪔</span>
                </div>

                <div className="p-6 sm:p-7 space-y-5">
                  {/* Card Title & Discount Pill */}
                  <div className="space-y-1.5">
                    <h2 className="text-2xl font-black text-[#002B49]">Protect Your Brand</h2>
                    <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold text-emerald-800">
                      <span>Save 40% Today!</span>
                      <span className="line-through text-red-500 font-medium">₹1999</span>
                      <span className="text-emerald-700 font-black text-sm">₹1199</span>
                    </div>
                  </div>

                  {/* Form Error Alert */}
                  {formError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    {/* Mobile Number Input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex rounded-lg shadow-2xs border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#002B49] focus-within:border-transparent">
                        <span className="inline-flex items-center px-3.5 bg-gray-50 text-gray-600 text-sm font-semibold border-r border-gray-200">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="98765 43210"
                          className="w-full px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    {/* WhatsApp Toggle Switch */}
                    <div className="flex items-center justify-between py-2 border-y border-gray-100">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <span>Get easy updates through</span>
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          Whatsapp
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                          whatsappUpdates ? 'bg-emerald-600' : 'bg-gray-300'
                        }`}
                        aria-label="Toggle WhatsApp updates"
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                            whatsappUpdates ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Submit CTA Button */}
                    <button
                      type="submit"
                      className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-bold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-base tracking-wide cursor-pointer"
                    >
                      <span>Register My Trademark</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>

                  {/* Reassurance Badge */}
                  <div className="pt-2 flex items-center gap-2 text-[11px] text-gray-500 font-medium leading-relaxed">
                    <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      100% confidential. A trademark expert will call you at the time you choose — no
                      spam.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUST NUMBERS BAR
          ========================================================================= */}
      <section className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {TRUST_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-400">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE 45 NICE CLASSIFICATION CLASSES FINDER
          ========================================================================= */}
      <section id="nice-classes" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 font-bold text-xs px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Nice Classification System</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#002B49] tracking-tight">
            Find the Exact Trademark Class for Your Brand
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Trademark rights in India are strictly class-specific under the Trade Marks Act, 1999.
            Explore all 45 classes below to ensure complete legal protection for your product or
            service.
          </p>
        </div>

        {/* Search & Tabs Controls */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={classSearch}
                onChange={(e) => setClassSearch(e.target.value)}
                placeholder="Search product (e.g. clothing, software, cafe, cosmetics)..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
              />
            </div>

            {/* Goods vs Services Filter Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveClassTab('all')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-md transition-all cursor-pointer ${
                  activeClassTab === 'all'
                    ? 'bg-white text-[#002B49] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All 45 Classes
              </button>
              <button
                type="button"
                onClick={() => setActiveClassTab('goods')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-md transition-all cursor-pointer ${
                  activeClassTab === 'goods'
                    ? 'bg-white text-[#002B49] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Goods (Classes 1–34)
              </button>
              <button
                type="button"
                onClick={() => setActiveClassTab('services')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-md transition-all cursor-pointer ${
                  activeClassTab === 'services'
                    ? 'bg-white text-[#002B49] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Services (Classes 35–45)
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center justify-between">
            <span>
              Showing <strong>{filteredClasses.length}</strong> matching classes
            </span>
            <span className="text-slate-400">Government fee is calculated per class, per mark</span>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClasses.map((item) => {
            const isSelected = selectedClassId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedClassId(isSelected ? null : item.id)}
                className={`rounded-xl border p-5 transition-all cursor-pointer bg-white flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#002B49] ring-2 ring-[#002B49] shadow-md bg-blue-50/20'
                    : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-md ${
                        item.type === 'goods'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}
                    >
                      {item.number}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 leading-snug">{item.title}</h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Popular items pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.popularItems.map((kw, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">
                    Govt. Fee: ₹4,500 (MSME) / ₹9,000 (Others)
                  </span>
                  <span
                    className={`font-bold ${
                      isSelected ? 'text-[#002B49]' : 'text-blue-600 hover:underline'
                    }`}
                  >
                    {isSelected ? '✓ Selected' : 'Select Class +'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          ™ VS ® STATUTORY LEGAL USAGE GUIDE
          ========================================================================= */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Statutory Symbol Rules
            </span>
            <h2 className="text-3xl font-extrabold text-[#002B49]">
              When Can You Legally Use ™ vs ® in India?
            </h2>
            <p className="text-sm text-slate-600">
              Using the wrong mark can attract statutory penalties under Section 107 of the Trade
              Marks Act, 1999.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TM_VS_R_GUIDE.map((g, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200 space-y-4 relative overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#002B49] text-white flex items-center justify-center text-3xl font-black shrink-0 shadow-inner">
                    {g.symbol}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{g.name}</h3>
                    <div className="text-xs font-semibold text-blue-700 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{g.timeline}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200">
                  Legal Status: {g.legalStatus}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{g.description}</p>

                <div className={`p-3 rounded-lg border text-xs font-medium ${g.badgeClass}`}>
                  {g.keyRule}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5-STEP IP INDIA ALLOTMENT LIFECYCLE
          ========================================================================= */}
      <section id="trademark-process" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Procedural Roadmap
          </span>
          <h2 className="text-3xl font-extrabold text-[#002B49]">
            The 5-Step Trademark Registration Process
          </h2>
          <p className="text-sm text-slate-600">
            How BharatFiling protects your brand from Day 1 to official Government Registration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {TRADEMARK_STEPS.map((st, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs relative flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-[#002B49]/30">{st.step}</span>
                  <span className="text-[11px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200">
                    {st.time}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>

              {i < 4 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[10px]">
                    →
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          DOCUMENTS REQUIRED CHECKLIST MATRIX
          ========================================================================= */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              100% Digital Checklist
            </span>
            <h2 className="text-3xl font-extrabold text-[#002B49]">
              Documents Required for Trademark Registration
            </h2>
            <p className="text-sm text-slate-600">
              Select your business structure to see the minimal documentation required for Form TM-A.
            </p>
          </div>

          {/* Type Selector Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex bg-white p-1 rounded-xl shadow-xs border border-gray-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveDocTab('individual')}
                className={`px-5 py-2.5 rounded-lg transition-all cursor-pointer ${
                  activeDocTab === 'individual'
                    ? 'bg-[#002B49] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Individuals &amp; Sole Proprietors
              </button>
              <button
                type="button"
                onClick={() => setActiveDocTab('startup')}
                className={`px-5 py-2.5 rounded-lg transition-all cursor-pointer ${
                  activeDocTab === 'startup'
                    ? 'bg-[#002B49] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Startups &amp; MSMEs (50% Off Govt Fee)
              </button>
              <button
                type="button"
                onClick={() => setActiveDocTab('company')}
                className={`px-5 py-2.5 rounded-lg transition-all cursor-pointer ${
                  activeDocTab === 'company'
                    ? 'bg-[#002B49] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Companies, LLPs &amp; Trusts
              </button>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRADEMARK_DOCUMENTS[activeDocTab].map((doc, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-2.5 hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">{doc.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PACKAGES / PRICING OVERVIEW (Anchored by #trademark-packages)
          ========================================================================= */}
      <section id="trademark-packages" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
            Transparent Pricing
          </span>
          <h2 className="text-3xl font-extrabold text-[#002B49]">Choose Your Trademark Plan</h2>
          <p className="text-sm text-slate-600">
            No hidden fees. Professional legal support with official IP India submission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TRADEMARK_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-7 bg-white flex flex-col justify-between transition-all relative ${
                plan.popular
                  ? 'border-emerald-500 ring-2 ring-emerald-500 shadow-xl'
                  : 'border-slate-200 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-extrabold text-xs px-4 py-1 rounded-full tracking-wide uppercase shadow-sm">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-2 pt-2 border-t border-slate-100">
                  <span className="text-3xl font-black text-[#002B49]">₹{plan.price}</span>
                  <span className="text-sm line-through text-slate-400">₹{plan.originalPrice}</span>
                  <span className="text-xs font-medium text-slate-500">+ Govt. Fee</span>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  {plan.notIncluded &&
                    plan.notIncluded.map((notFeat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="text-slate-300 font-bold ml-1">✕</span>
                        <span className="line-through">{notFeat}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectPlan) {
                      onSelectPlan(plan.id);
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`w-full py-3 rounded-lg font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                      : 'bg-[#002B49] hover:bg-[#001f35] text-white'
                  }`}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SEARCHABLE STATUTORY FAQS ACCORDION
          ========================================================================= */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Clear Legal Answers
            </span>
            <h2 className="text-3xl font-extrabold text-[#002B49]">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-600">
              Everything you need to know about Trade Marks Act, 1999 and IP India procedures.
            </p>
          </div>

          {/* Search FAQs */}
          <div className="relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
            />
          </div>

          {/* Accordion list */}
          <div className="space-y-3 pt-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {faq.q}
                    </span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          RIGHT VIEWPORT EDGE FLOATING WIDGET: Refer A Friend
          ========================================================================= */}
      <button
        type="button"
        onClick={() => setShowReferralModal(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-3 py-2.5 rounded-l-lg shadow-xl flex items-center gap-1.5 text-xs cursor-pointer select-none transition-all transform hover:-translate-x-1"
        style={{ writingMode: 'vertical-rl' }}
      >
        <Gift className="w-4 h-4 transform rotate-90" />
        <span className="tracking-wide">🎁 Refer a friend</span>
      </button>

      {/* =========================================================================
          BOTTOM RIGHT FLOATING WIDGET: WhatsApp Chat Bubble
          ========================================================================= */}
      <a
        href="https://wa.me/917668976193?text=Hi%20BharatFiling,%20I%20want%20to%20register%20my%20Trademark."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all cursor-pointer group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
          1
        </span>
        <MessageSquare className="w-7 h-7" />
      </a>

      {/* =========================================================================
          REFERRAL BONUS MODAL
          ========================================================================= */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setShowReferralModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Gift className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-[#002B49]">Refer a Friend &amp; Earn ₹500</h3>
              <p className="text-xs text-gray-600">
                Help a fellow entrepreneur protect their brand. When they file their trademark with
                BharatFiling, both of you receive ₹500 cashback!
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center font-mono text-sm font-bold text-slate-800 select-all">
              BHARAT-TM-REF500
            </div>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText('BHARAT-TM-REF500');
                setShowReferralModal(false);
              }}
              className="w-full bg-[#002B49] text-white font-bold py-2.5 rounded-lg text-sm hover:bg-[#001f35] transition-all cursor-pointer"
            >
              Copy Referral Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
