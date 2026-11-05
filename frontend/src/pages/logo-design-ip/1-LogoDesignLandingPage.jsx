import React, { useState } from 'react';
import {
  Palette,
  Search,
  ShieldCheck,
  FileCode,
  Award,
  BookOpen,
  PlayCircle,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  Gift,
  Clock,
  Sparkles,
  ArrowRight,
  Check,
  Layers,
  Shapes,
  Type,
  Shield,
} from 'lucide-react';

import {
  LOGO_HERO,
  TRUSTED_PARTNERS,
  CORE_FEATURES,
  LOGO_STYLES,
  COMPLIANCE_WORKFLOW,
  RISK_ELIMINATION,
  PRICING_PACKAGES,
  TESTIMONIALS,
  FAQS,
} from './constants.js';

export default function LogoDesignLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Form State
  const [formData, setFormData] = useState({
    email: initialData.email || '',
    phone: initialData.phone || '',
    brandName: initialData.brandName || '',
    whatsappUpdates: initialData.whatsappUpdates ?? true,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modals state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [referEmail, setReferEmail] = useState('');
  const [referSuccess, setReferSuccess] = useState(false);

  // Language banner toggle state
  const [isHindi, setIsHindi] = useState(false);

  // Active FAQ Accordion index
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Validate Form
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.phone || !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.brandName.trim()) {
      errors.brandName = 'Please enter your brand or business name';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    if (onSubmitLead) {
      onSubmitLead(formData);
    }
  };

  const handleReferSubmit = (e) => {
    e.preventDefault();
    if (!referEmail || !referEmail.includes('@')) return;
    setReferSuccess(true);
    setTimeout(() => {
      setReferSuccess(false);
      setIsReferModalOpen(false);
      setReferEmail('');
    }, 2000);
  };

  const renderIcon = (name) => {
    switch (name) {
      case 'Palette':
        return <Palette className="w-6 h-6 text-[#002B49]" />;
      case 'Search':
        return <Search className="w-6 h-6 text-[#002B49]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#002B49]" />;
      case 'FileCode':
        return <FileCode className="w-6 h-6 text-[#002B49]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#002B49]" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-[#002B49]" />;
      case 'Type':
        return <Type className="w-6 h-6 text-[#002B49]" />;
      case 'Shapes':
        return <Shapes className="w-6 h-6 text-[#002B49]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#002B49]" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-[#002B49]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#002B49]" />;
    }
  };

  return (
    <div className="bg-white text-slate-800 font-sans antialiased relative selection:bg-[#FFD200]/30 selection:text-slate-900">
      {/* 1. TOP NOTIFICATION BANNER (Hindi Translation toggle) */}
      <aside aria-label="Language selection" className="bg-[#FFF8E7] border-b border-[#FFE29A] py-2 px-4 text-center text-xs font-medium text-slate-700 flex items-center justify-center gap-2">
        <span>
          {isHindi
            ? 'अब आप इस पृष्ठ को अंग्रेजी में पढ़ सकते हैं।'
            : 'Now you can read this page in Hindi.'}
        </span>
        <button
          type="button"
          onClick={() => setIsHindi(!isHindi)}
          className="text-[#002B49] font-bold hover:underline cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#002B49] rounded px-1"
        >
          {isHindi ? 'Switch to English' : 'Change language to हिन्दी'}
        </button>
      </aside>

      {/* 2. HERO SECTION WITH LEAD CAPTURE FORM */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FAFD] via-white to-white pt-8 pb-16 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, Badges, Value Props */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-[#E6F4EA] text-[#137333] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#CEEAD6]">
                <ShieldCheck className="w-4 h-4 text-[#137333]" />
                <span>{LOGO_HERO.badge}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002B49] tracking-tight leading-[1.15]">
                {isHindi
                  ? 'कस्टम लोगो डिजाइन एवं बौद्धिक संपदा (IP) संरक्षण'
                  : LOGO_HERO.title}
              </h1>

              {/* Subtitle / Paragraph */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                {isHindi
                  ? 'वरिष्ठ डिजाइनरों द्वारा तैयार किया गया विशिष्ट ब्रांड लोगो और ट्रेडमार्क वकीलों द्वारा कानूनी सुरक्षा। 100% मूल वेक्टर फाइलें, ट्रेडमार्क उपलब्धता जांच और पूर्ण कॉपीराइट स्वामित्व प्राप्त करें।'
                  : LOGO_HERO.description}
              </p>

              {/* Bullets with checkmarks */}
              <ul className="space-y-3 pt-2">
                {LOGO_HERO.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-slate-700 font-medium text-xs sm:text-sm">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Video Modal Trigger */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#002B49] hover:text-[#005a96] transition group cursor-pointer"
                >
                  <PlayCircle className="w-5 h-5 text-rose-600 group-hover:scale-110 transition-transform" />
                  <span className="underline decoration-slate-300 underline-offset-4">
                    Complete guide on Logo Trademark Clearance & Enforceability
                  </span>
                </button>
              </div>

              {/* Active Experts Live Counters */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200/80">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <span className="inline-block w-7 h-7 rounded-full bg-[#002B49] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      MN
                    </span>
                    <span className="inline-block w-7 h-7 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      RK
                    </span>
                    <span className="inline-block w-7 h-7 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      AD
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    <strong className="text-slate-900 font-bold">28+ Brand Designers & TM Advocates</strong> online
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-xs font-semibold text-slate-500 border-l border-slate-300 pl-4 hidden sm:block">
                  ⚡ 54 Brand identities & TM filings completed this week
                </div>
              </div>
            </div>

            {/* Right Column: Diwali Festive Lead Capture Form */}
            <div className="lg:col-span-5 relative">
              {/* Diwali Festive Sale Badge */}
              <div className="absolute -top-3.5 right-6 z-10 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md">
                <span>🪔</span>
                <span>Diwali Festive Sale Offer</span>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 relative">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 text-center tracking-tight">
                  {LOGO_HERO.cardTitle}
                </h2>
                <p className="text-xs text-slate-500 text-center mt-1">
                  Connect with a Creative Director & Trademark Attorney in 15 mins
                </p>

                <form onSubmit={handleLeadSubmit} className="mt-6 space-y-4">
                  {/* Email Input */}
                  <div>
                    <label htmlFor="logo-email" className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="logo-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="founder@yourbrand.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] ${
                        formErrors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-500 font-semibold mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number Input */}
                  <div>
                    <label htmlFor="logo-phone" className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs font-semibold">
                        +91
                      </span>
                      <input
                        id="logo-phone"
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="9876543210"
                        className={`w-full px-3.5 py-2.5 rounded-r-lg border text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] ${
                          formErrors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-500 font-semibold mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Brand / Company Name Input */}
                  <div>
                    <label htmlFor="logo-brand" className="block text-xs font-bold text-slate-700 mb-1">
                      Proposed Brand / Company Name
                    </label>
                    <input
                      id="logo-brand"
                      type="text"
                      value={formData.brandName}
                      onChange={(e) =>
                        setFormData({ ...formData, brandName: e.target.value })
                      }
                      placeholder="e.g. ZenoPay or Nexaverse"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] ${
                        formErrors.brandName
                          ? 'border-rose-400 bg-rose-50/50'
                          : 'border-slate-300'
                      }`}
                    />
                    {formErrors.brandName && (
                      <p className="text-[11px] text-rose-500 font-semibold mt-1">
                        {formErrors.brandName}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600 font-medium">
                      Get easy updates through{' '}
                      <strong className="text-emerald-700 font-bold">WhatsApp</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          whatsappUpdates: !formData.whatsappUpdates,
                        })
                      }
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        formData.whatsappUpdates ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.whatsappUpdates ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Submit Button (Get Started) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#002B49] hover:bg-[#001f35] text-white font-black text-sm tracking-wide shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Bottom Note */}
                  <div className="text-center pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-600">
                      <span className="line-through text-slate-400 mr-1.5">₹999</span>
                      <span className="text-emerald-700 font-black">₹499</span>
                      <span className="text-slate-500 font-normal"> for a 30-minute Brand & IP Consultation</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{LOGO_HERO.guaranteeText}</span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUSTED PARTNERS / BODIES */}
      <section className="border-y border-slate-200/80 bg-slate-50/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Trusted by modern startups, D2C brands, tech platforms, and creators across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all">
            {TRUSTED_PARTNERS.map((partner, idx) => (
              <div key={idx} className="flex items-center gap-2 font-bold text-xs text-slate-600">
                <span className="w-2 h-2 rounded-full bg-[#002B49]" />
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE FEATURES SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Creative Artistry Meets Legal Rigor
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002B49] tracking-tight">
              Why Brands Choose BharatFiling for Logo & IP
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We eliminate the disconnect between creative graphic design and trademark law. You get an iconic brand visual and the legal machinery to defend it against copycats.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_FEATURES.map((feat, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 hover:shadow-md transition-shadow group hover:border-[#002B49]/30"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {renderIcon(feat.icon)}
                </div>
                <h3 className="text-base font-bold text-[#002B49] mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOGO STYLES MATRIX */}
      <section className="py-16 bg-[#F8FAFC] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#002B49] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Visual Direction
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49] tracking-tight">
              Explore Distinct Logo Design Archetypes
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              From clean minimalist wordmarks to abstract geometric icons, our design studio tailors the style to your exact consumer niche.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {LOGO_STYLES.map((style) => (
              <div
                key={style.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-[#002B49] transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#002B49] flex items-center justify-center mb-3">
                    {renderIcon(style.icon)}
                  </div>
                  <h4 className="text-sm font-bold text-[#002B49]">{style.name}</h4>
                  <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                    {style.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded block">
                    {style.bestFor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 6-STEP COMPLIANCE WORKFLOW */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#002B49] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Creation to Trademark
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002B49] tracking-tight">
              Our 6-Step Design & IP Protection Lifecycle
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We manage the entire spectrum: from design brainstorming and vector rendering to Trade Marks Registry filing and copyright deed execution.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPLIANCE_WORKFLOW.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-slate-50 border border-slate-200/90 rounded-2xl p-6 hover:shadow-md transition group"
              >
                <div className="text-3xl font-black text-[#002B49]/20 group-hover:text-[#FFD200] transition-colors mb-2">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-[#002B49] mb-1.5">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RISK ELIMINATION TABLE */}
      <section className="py-16 bg-[#FFFDF5] border-y border-[#FFE8A3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Legal Safeguard
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49] tracking-tight">
              Protect Your Brand from Costly IP Pitfalls
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Using stock logos or freelance designs without formal copyright assignment exposes your business to catastrophic legal disputes.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <thead>
                <tr className="bg-[#002B49] text-white text-xs font-bold">
                  <th className="py-3.5 px-4">Brand Threat</th>
                  <th className="py-3.5 px-4">Unprotected Consequence</th>
                  <th className="py-3.5 px-4">BharatFiling Legal Shield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs text-slate-700">
                {RISK_ELIMINATION.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.risk}</td>
                    <td className="py-3.5 px-4 text-rose-700 font-medium">{row.consequence}</td>
                    <td className="py-3.5 px-4 text-emerald-800 font-semibold">{row.shield}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. PRICING PACKAGES SECTION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              All-Inclusive Brand & IP Packages
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#002B49] tracking-tight">
              Select Your Logo & Trademark Package
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              All packages include original vector source files, copyright transfer deeds, and comprehensive trademark clearance searches.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 sm:p-8 transition-all ${
                  pkg.popular
                    ? 'border-[#002B49] shadow-xl ring-2 ring-[#002B49] bg-white'
                    : 'border-slate-200 shadow-sm hover:shadow-md bg-slate-50/50'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#002B49] text-[#FFD200] text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-sm">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  {!pkg.popular && (
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                      {pkg.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-black text-[#002B49]">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{pkg.tagline}</p>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{pkg.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-bold text-slate-500">one-time</span>
                  </div>

                  <ul className="mt-6 space-y-3 border-t border-slate-200/80 pt-6 text-xs text-slate-600">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectPlan && onSelectPlan(pkg.id)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs tracking-wide transition cursor-pointer flex items-center justify-center gap-2 ${
                      pkg.popular
                        ? 'bg-[#002B49] hover:bg-[#001f35] text-white shadow-md'
                        : 'bg-white hover:bg-slate-100 text-[#002B49] border border-[#002B49]'
                    }`}
                  >
                    <span>{pkg.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Verified Client Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49] tracking-tight">
              Trusted by 3,800+ Brand Creators Across India
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#002B49]">{t.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{t.role}</p>
                    <p className="text-[10px] text-slate-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQS ACCORDION */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#002B49] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49] tracking-tight">
              Logo Design & Trademark Clarifications
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Key answers regarding design rights, copyright deeds, trademark class searches, and digital vector deliverables.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#002B49] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. FLOATING "REFER A FRIEND" TAB */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          type="button"
          onClick={() => setIsReferModalOpen(true)}
          className="bg-gradient-to-b from-[#FFD200] to-amber-500 text-slate-900 font-black text-xs px-2.5 py-4 rounded-l-xl shadow-lg border-l border-y border-amber-300 hover:brightness-105 transition-all flex flex-col items-center gap-2 cursor-pointer [writing-mode:vertical-rl] rotate-180"
        >
          <Gift className="w-4 h-4 rotate-90" />
          <span>Refer a friend</span>
        </button>
      </div>

      {/* 12. VIDEO MODAL POPUP */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-black text-[#002B49] pr-8">
              {LOGO_HERO.videoModal.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              {LOGO_HERO.videoModal.description}
            </p>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950">
              <iframe
                title="Logo Design & IP Protection Video"
                src={LOGO_HERO.videoModal.videoUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* 13. REFER A FRIEND MODAL POPUP */}
      {isReferModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => setIsReferModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-[#002B49]">
                Refer a Brand Creator or Business
              </h3>
              <p className="text-xs text-slate-500">
                Give ₹500 off on Logo Design & Trademark filings, and get ₹500 in your BharatFiling wallet upon their project launch.
              </p>
            </div>

            {referSuccess ? (
              <div className="mt-6 p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center border border-emerald-200">
                🎉 Referral invite sent successfully!
              </div>
            ) : (
              <form onSubmit={handleReferSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Founder or Partner Email
                  </label>
                  <input
                    type="email"
                    required
                    value={referEmail}
                    onChange={(e) => setReferEmail(e.target.value)}
                    placeholder="partner@startup.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#002B49] focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#002B49] hover:bg-[#001f35] text-white font-bold text-xs tracking-wide transition cursor-pointer"
                >
                  Send ₹500 Discount Invite
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
