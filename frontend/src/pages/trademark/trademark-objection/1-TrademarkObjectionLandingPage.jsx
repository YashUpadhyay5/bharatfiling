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
  Clock,
  Scale,
  FileCheck,
  AlertTriangle,
  Languages,
} from 'lucide-react';

import {
  OBJECTION_GROUNDS,
  TESTIMONIALS,
  OBJECTION_PACKAGES,
  OBJECTION_STEPS,
  OBJECTION_DOCUMENTS,
  TRUST_STATS,
  TRUSTED_PARTNERS,
  OBJECTION_FAQS,
} from './constants.js';

export default function TrademarkObjectionLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Language toggle
  const [currentLang, setCurrentLang] = useState('en');

  // Lead Form State matching Screenshot media_1793253405946_1d5cb863.png
  const [email, setEmail] = useState(initialData.email || 'yashupadhyay@example.com');
  const [phone, setPhone] = useState(
    initialData.phone ? String(initialData.phone).replace('+91', '').trim() : '7668976193'
  );
  const [cityPincode, setCityPincode] = useState(
    initialData.cityPincode || 'Bengaluru, 560001'
  );
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates !== undefined ? initialData.whatsappUpdates : true
  );
  const [formError, setFormError] = useState('');

  // Active testimonial carousel index (Siddharth Rao is index 0)
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Active objection tab (Section 9 vs Section 11)
  const [activeGroundTab, setActiveGroundTab] = useState('section_9');

  // FAQs search & accordion state
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Referral Modal
  const [showReferralModal, setShowReferralModal] = useState(false);

  // Lead form submit handler
  const handleLeadSubmit = (e) => {
    if (e) e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid business email address.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!cityPincode.trim()) {
      setFormError('Please enter your City or Pincode.');
      return;
    }

    setFormError('');

    const leadPayload = {
      email: email.trim(),
      phone: `+91 ${cleanPhone.slice(-10)}`,
      cityPincode: cityPincode.trim(),
      whatsappUpdates,
      serviceType: 'trademark-objection',
    };

    if (onSubmitLead) {
      onSubmitLead(leadPayload);
    }
  };

  // Filtered FAQs
  const filteredFaqs = OBJECTION_FAQS.filter((faq) => {
    const q = faqSearch.toLowerCase().trim();
    if (!q) return true;
    return faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900 relative">
      {/* =========================================================================
          TOP LANGUAGE NOTICE BAR (matches screenshot media_1793253405946_1d5cb863.png)
          ========================================================================= */}
      <div className="bg-white border-b border-gray-100 py-2.5 px-4 text-center">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-600 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200 shadow-2xs">
          <span>
            {currentLang === 'en'
              ? 'Now you can read this page in Hindi.'
              : 'अब आप इस पृष्ठ को हिंदी में पढ़ सकते हैं।'}
          </span>
          <button
            type="button"
            onClick={() => setCurrentLang(currentLang === 'en' ? 'hi' : 'en')}
            className="text-blue-600 font-bold underline hover:text-blue-800 cursor-pointer"
          >
            {currentLang === 'en' ? 'Change language to हिन्दी' : 'Switch to English'}
          </button>
        </div>
      </div>

      {/* =========================================================================
          HERO FOLD (Strict 1:1 match of screenshot media_1793253405946_1d5cb863.png)
          ========================================================================= */}
      <section className="bg-white border-b border-gray-200 pt-6 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs matching Screenshot: Home > IPIndia > trademark objection */}
          <nav className="text-xs text-gray-500 mb-4 flex items-center gap-1.5 font-medium">
            <span className="hover:text-gray-700 cursor-pointer">Home</span>
            <span className="text-gray-400">&gt;</span>
            <span className="hover:text-gray-700 cursor-pointer">IPIndia</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-[#002B49] font-semibold">trademark objection</span>
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
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#002B49] tracking-tight leading-[1.2]">
                Trademark Objection in India
              </h1>

              {/* Two Bullet Points with Green Checkmarks */}
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  </div>
                  <p className="text-sm text-slate-700 leading-normal font-medium">
                    Trademark Objection drafted by senior IP lawyers within 24 hours
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  </div>
                  <p className="text-sm text-slate-700 leading-normal font-medium">
                    Documents uploaded within 2 working days directly by experts. Trusted,
                    reliable, and expert-backed support for all objections.
                  </p>
                </div>
              </div>

              {/* Client Testimonial Box matching Screenshot (Siddharth Rao) */}
              <div className="pt-2">
                <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 relative">
                  <p className="text-sm text-slate-600 leading-relaxed italic">
                    "{TESTIMONIALS[activeTestimonialIdx].quote}"
                  </p>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                      <User className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-sm">
                        {TESTIMONIALS[activeTestimonialIdx].author}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        {TESTIMONIALS[activeTestimonialIdx].role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center items-center gap-2 pt-3">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveTestimonialIdx(idx)}
                      className={`h-1.5 transition-all cursor-pointer rounded-full ${
                        activeTestimonialIdx === idx
                          ? 'w-6 bg-[#002B49]'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Testimonial slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form Card (Get Started) */}
            <div className="lg:col-span-5 relative">
              {/* Diwali Festive Sale Offer Hanging Ribbon */}
              <div className="absolute -top-3.5 left-6 z-20">
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-md flex items-center gap-1.5 border border-amber-300/40">
                  <span>🪔</span>
                  <span>Diwali Festive Sale Offer</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 space-y-5 relative">
                {/* Card Title */}
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 text-center tracking-tight">
                  Get Started
                </h2>

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
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Mobile Number Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex rounded-lg shadow-2xs border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#002B49] focus-within:border-transparent">
                      <span className="inline-flex items-center px-3.5 bg-gray-50 text-gray-600 text-sm font-semibold border-r border-gray-200">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                        }
                        placeholder="Mobile Number"
                        className="w-full px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* City/Pincode Input */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      City/Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cityPincode}
                      onChange={(e) => setCityPincode(e.target.value)}
                      placeholder="e.g. Bengaluru, 560001"
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* WhatsApp Toggle Switch */}
                  <div className="flex items-center justify-between py-2 border-y border-gray-100">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <span>Get easy updates through</span>
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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

                  {/* Submit CTA Button: Talk to an Expert */}
                  <button
                    type="submit"
                    className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-bold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-base tracking-wide cursor-pointer"
                  >
                    <span>Talk to an Expert</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Confidentiality Assurance */}
                <div className="pt-1 flex items-center gap-2 text-[11px] text-gray-500 font-medium leading-relaxed justify-center">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% confidential. No spam guaranteed.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUSTED PARTNERS BAR (previewed at the bottom of the screenshot)
          ========================================================================= */}
      <section className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
            Trusted Partners
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-90">
            {TRUSTED_PARTNERS.map((partner, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg tracking-wider text-white">
                  {partner.name}
                </span>
                <span className="text-[10px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded font-mono">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CRITICAL 30-DAY STATUTORY CLOCK WARNING
          ========================================================================= */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Clock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-black text-amber-950">
                Critical Statutory Clock: 30-Day Mandatory Deadline
              </h2>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed max-w-3xl">
                Under Rule 33 of the Trade Marks Rules 2017, you must file your formal written reply
                within strictly <strong>30 days</strong> from the date of receiving the Examination
                Report. If unreplied, your trademark application will be marked as{' '}
                <span className="font-bold underline text-red-700">"ABANDONED"</span> by the
                Registrar and you lose your priority date.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-5 rounded-xl shadow-md text-xs sm:text-sm cursor-pointer whitespace-nowrap"
          >
            File Emergency Reply ⚡
          </button>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9 VS SECTION 11 OBJECTIONS LEGAL DEEP-DIVE
          ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Legal Taxonomy
          </span>
          <h2 className="text-3xl font-extrabold text-[#002B49]">
            Understand Your Trademark Objection Grounds
          </h2>
          <p className="text-sm text-slate-600">
            95% of all objections in India are raised under Section 9 or Section 11 of the Trade
            Marks Act, 1999.
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex justify-center">
          <div className="inline-flex bg-white p-1 rounded-xl shadow-xs border border-gray-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveGroundTab('section_9')}
              className={`px-5 py-2.5 rounded-lg transition-all cursor-pointer ${
                activeGroundTab === 'section_9'
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Section 9 (Absolute Grounds)
            </button>
            <button
              type="button"
              onClick={() => setActiveGroundTab('section_11')}
              className={`px-5 py-2.5 rounded-lg transition-all cursor-pointer ${
                activeGroundTab === 'section_11'
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Section 11 (Conflicting Prior Marks)
            </button>
            <button
              type="button"
              onClick={() => setActiveGroundTab('formalities')}
              className={`px-5 py-2.5 rounded-lg transition-all cursor-pointer ${
                activeGroundTab === 'formalities'
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Formalities Check Fail
            </button>
          </div>
        </div>

        {/* Active Ground Card */}
        {(() => {
          const g = OBJECTION_GROUNDS.find((item) => item.id === activeGroundTab);
          if (!g) return null;
          return (
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
                    {g.section}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">{g.name}</h3>
                </div>
                <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full self-start sm:self-auto">
                  {g.severity}
                </span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">{g.description}</p>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Common Objection Scenarios
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {g.commonExamples.map((ex, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex items-start gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 text-xs text-emerald-900">
                <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  <span>How BharatFiling Legal Advocates Overcome This Objection</span>
                </div>
                <p className="text-emerald-800 leading-relaxed">{g.remedyStrategy}</p>
              </div>
            </div>
          );
        })()}
      </section>

      {/* =========================================================================
          5-STEP TRADEMARK OBJECTION PROCESS
          ========================================================================= */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Procedural Blueprint
            </span>
            <h2 className="text-3xl font-extrabold text-[#002B49]">
              How We Resolve Your Trademark Objection
            </h2>
            <p className="text-sm text-slate-600">
              From report examination to e-filing within 24–48 hours on the IP India gateway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {OBJECTION_STEPS.map((st, i) => (
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          DOCUMENTS REQUIRED CHECKLIST
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Checklist
          </span>
          <h2 className="text-3xl font-extrabold text-[#002B49]">
            Documents Needed for Objection Reply
          </h2>
          <p className="text-sm text-slate-600">
            Minimal paperwork required. Simply upload your Examination Report or Application Number.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OBJECTION_DOCUMENTS.map((doc, idx) => (
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
      </section>

      {/* =========================================================================
          PACKAGES / PRICING SECTION
          ========================================================================= */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
              Clear Legal Plans
            </span>
            <h2 className="text-3xl font-extrabold text-[#002B49]">
              Transparent Objection Defense Pricing
            </h2>
            <p className="text-sm text-slate-600">
              No hidden advocate charges. Expert drafting and direct submission on IP India portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            {OBJECTION_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl border p-7 bg-white flex flex-col justify-between transition-all relative ${
                  pkg.popular
                    ? 'border-emerald-500 ring-2 ring-emerald-500 shadow-xl'
                    : 'border-slate-200 hover:shadow-lg'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-extrabold text-xs px-4 py-1 rounded-full tracking-wide uppercase shadow-sm">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{pkg.tagline}</p>
                  </div>

                  <div className="flex items-baseline gap-2 pt-2 border-t border-slate-100">
                    <span className="text-3xl font-black text-[#002B49]">₹{pkg.price}</span>
                    <span className="text-sm line-through text-slate-400">
                      ₹{pkg.originalPrice}
                    </span>
                    <span className="text-xs font-medium text-slate-500">+ GST</span>
                  </div>

                  <div className="space-y-2.5 pt-3 border-t border-slate-100">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPlan) {
                        onSelectPlan(pkg.id);
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      pkg.popular
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                        : 'bg-[#002B49] hover:bg-[#001f35] text-white'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEARCHABLE STATUTORY FAQS ACCORDION
          ========================================================================= */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Clear Legal Answers
            </span>
            <h2 className="text-3xl font-extrabold text-[#002B49]">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-600">
              Everything you need to know about Trade Marks Act, 1999 objections and hearings.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative max-w-lg mx-auto">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search objection questions..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
            />
          </div>

          {/* Accordion */}
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
        href="https://wa.me/917668976193?text=Hi%20BharatFiling,%20I%20received%20a%20Trademark%20Objection%20notice%20and%20need%20expert%20reply%20drafting."
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
                Help a fellow entrepreneur defend their brand. When they file their objection reply
                with BharatFiling, both of you receive ₹500 referral credit!
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center font-mono text-sm font-bold text-slate-800 select-all">
              BHARAT-TM-OBJ500
            </div>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText('BHARAT-TM-OBJ500');
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
