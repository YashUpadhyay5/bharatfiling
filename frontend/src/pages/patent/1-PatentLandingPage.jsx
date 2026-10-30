import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
  Lock,
  ExternalLink,
  FileText,
  Clock,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
  PhoneCall,
  Gift,
  ArrowRight,
  BookOpen,
  Cpu,
  Scale,
  Building,
  UserCheck,
} from 'lucide-react';

import {
  PATENT_REVIEWER_DATA,
  PATENT_HERO_BULLETS,
  PATENT_STATUTORY_HIGHLIGHTS,
  PATENTABILITY_CRITERIA,
  PATENT_APPLICATION_TYPES,
  PATENT_REGISTRATION_STEPS,
  REQUIRED_PATENT_FORMS,
  PATENT_PACKAGES,
  PATENT_GOVT_FEES_TABLE,
  PATENT_FAQS,
  TRUSTED_METRICS,
} from './constants.js';

export default function PatentLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  const [currentLang, setCurrentLang] = useState('en');

  // Lead Form State
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates !== undefined ? initialData.whatsappUpdates : true
  );

  const [leadErrors, setLeadErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('provisional');

  // FAQ Search & Accordion State
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const validateLead = () => {
    const errs = {};
    if (!email || !email.includes('@')) {
      errs.email = 'Please enter a valid email address';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    setLeadErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLeadSubmit = (e) => {
    if (e) e.preventDefault();
    if (!validateLead()) return;

    setIsSubmitting(true);
    const leadPayload = {
      email,
      phone,
      whatsappUpdates,
      packageId: 'consultation',
      packageName: 'Online Patent Consultation',
      serviceType: 'patent',
    };

    if (onSubmitLead) {
      onSubmitLead(leadPayload);
    }
  };

  const filteredFaqs = PATENT_FAQS.filter(
    (faq) =>
      faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#022B50] selection:text-white relative overflow-x-hidden">
      {/* ========================================================= */}
      {/* 0. FLOATING "REFER A FRIEND" SIDE TAB (1:1 with Screenshot) */}
      {/* ========================================================= */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center">
        <button
          type="button"
          onClick={() => alert('Refer a friend program: Share BharatFiling with fellow founders and earn ₹1,000 credits!')}
          className="bg-[#FFDF6D] hover:bg-[#ffdb54] text-slate-900 font-semibold text-xs py-3 px-2 rounded-l-lg shadow-md border-l border-t border-b border-yellow-300 flex flex-col items-center gap-1.5 transition-all cursor-pointer"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <Gift className="w-4 h-4 text-amber-900 rotate-90" />
          <span className="tracking-wide">Refer a friend</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 1. TOP NOTICE BAR: Language Switcher                      */}
      {/* ========================================================= */}
      <div className="bg-[#f0f4f8] border-b border-slate-200 py-2 px-4 text-center text-xs sm:text-[13px] text-slate-700 font-medium">
        <span>
          {currentLang === 'en'
            ? 'Now you can read this page in Hindi. '
            : 'अब आप इस पृष्ठ को अंग्रेज़ी में पढ़ सकते हैं। '}
        </span>
        <button
          type="button"
          onClick={() => setCurrentLang(currentLang === 'en' ? 'hi' : 'en')}
          className="text-blue-600 hover:text-blue-800 font-semibold underline ml-1 cursor-pointer"
        >
          {currentLang === 'en' ? 'Change language to हिन्दी' : 'Change language to English'}
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        {/* ========================================================= */}
        {/* 2. BREADCRUMBS (Home > Patent Registration) (1:1 Match)   */}
        {/* ========================================================= */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1.5 font-medium">
          <a href="/" className="hover:text-slate-900 transition-colors">
            Home
          </a>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Patent Registration</span>
        </nav>

        {/* ========================================================= */}
        {/* 3. HERO SECTION (1:1 with media_1793335856897_1cea0a8e.png) */}
        {/* ========================================================= */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2 pb-14 border-b border-slate-100">
          {/* Subtle background diagonal decorative pattern on top-right */}
          <div
            className="absolute right-0 top-0 w-96 h-96 pointer-events-none opacity-20 -z-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #022B50 0, #022B50 1px, transparent 0, transparent 16px)',
            }}
          />

          {/* Left Column: Certification, Title, Review Box, Bullets (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Certification Badge with Indian Flag (1:1 with Screenshot) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#002B49] bg-[#F5FAFF] w-max text-xs sm:text-sm font-semibold text-[#002B49] shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
              <span>Only ISO 27001 Certified Platform in</span>
              <span className="text-base leading-none">🇮🇳</span>
            </div>

            {/* Main Headline (1:1 with Screenshot) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#002B49] tracking-tight leading-[1.18]">
              Patent Registration in India - File Online with Registered Patent Agents
            </h1>

            {/* Expert Review Box (1:1 with Screenshot) */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs max-w-2xl space-y-3">
              <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
                {PATENT_REVIEWER_DATA.reviewSummary}
              </p>

              <div className="pt-1 text-xs text-slate-600 font-medium flex flex-wrap items-center gap-1">
                <span>Reviewed by</span>
                <span className="font-semibold text-blue-600 cursor-pointer hover:underline">
                  {PATENT_REVIEWER_DATA.reviewerName}
                </span>
                <span>, {PATENT_REVIEWER_DATA.reviewerTitle}</span>
              </div>

              <div className="text-[11px] text-slate-400 font-normal">
                Last Updated on {PATENT_REVIEWER_DATA.lastUpdated}
              </div>
            </div>

            {/* 3 Statutory Value Proposition Bullets (1:1 with Screenshot) */}
            <ul className="space-y-4 text-xs sm:text-sm text-slate-800 font-normal max-w-2xl pt-1">
              {PATENT_HERO_BULLETS.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#002B49] text-base font-bold shrink-0 leading-tight">
                    ✓
                  </span>
                  <div className="leading-relaxed">
                    <span className="font-bold text-slate-900">{bullet.title} </span>
                    <span className="text-slate-700">{bullet.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Lead Capture Card (1:1 with Screenshot) (5 cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Card Container */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden relative max-w-md mx-auto lg:ml-auto">
              {/* Diwali Festive Ribbon (1:1 with Screenshot) */}
              <div className="absolute top-0 left-0 bg-[#001D3D] text-white text-[11px] font-bold px-3 py-1 rounded-br-xl shadow flex items-center gap-1.5 z-10">
                <span className="text-yellow-400">🪔</span>
                <span className="text-yellow-300 font-extrabold">Diwali</span>
                <span className="text-white font-medium">Festive Sale Offer</span>
                <span>🎏</span>
              </div>

              <div className="p-6 sm:p-7 pt-10">
                {/* Consultation Title & Price Badge */}
                <div className="text-center mb-6">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">
                    Online Patent Consultation
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-700 font-medium">
                    <span>Starts @</span>
                    <span className="border border-red-500 text-red-600 font-bold px-2.5 py-0.5 rounded-md text-xs sm:text-sm bg-red-50/50">
                      ₹499
                    </span>
                  </div>
                </div>

                {/* Lead Form Inputs */}
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (leadErrors.email) setLeadErrors({ ...leadErrors, email: null });
                      }}
                      placeholder="Email"
                      className={`w-full px-4 py-3 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] transition-all ${
                        leadErrors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {leadErrors.email && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{leadErrors.email}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (leadErrors.phone) setLeadErrors({ ...leadErrors, phone: null });
                      }}
                      placeholder="Mobile Number"
                      className={`w-full px-4 py-3 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] transition-all ${
                        leadErrors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {leadErrors.phone && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{leadErrors.phone}</p>
                    )}
                  </div>

                  {/* WhatsApp Updates Toggle */}
                  <div className="flex items-center justify-between py-1 text-xs text-slate-700">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span>Get easy updates through</span>
                      <span className="inline-block w-4 h-4 rounded-full bg-[#25D366] text-white text-[10px] flex items-center justify-center font-bold">
                        ✆
                      </span>
                      <span className="font-semibold text-slate-800">Whatsapp</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                      className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                        whatsappUpdates ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'
                      }`}
                      aria-label="Toggle WhatsApp updates"
                    >
                      <div className="bg-white w-4 h-4 rounded-full shadow-sm" />
                    </button>
                  </div>

                  {/* Submit CTA Button (1:1 with Screenshot) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#002B49] hover:bg-[#001D3D] text-white font-semibold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting Expert...
                      </span>
                    ) : (
                      'Consult Now'
                    )}
                  </button>

                  {/* Trust / Confidentiality Note */}
                  <div className="text-center pt-1">
                    <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 leading-normal">
                      <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>
                        100% confidential. A patent expert will call you at the time you choose &mdash; no spam.
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. STATUTORY HIGHLIGHTS STRIP                             */}
        {/* ========================================================= */}
        <section className="py-8 border-b border-slate-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PATENT_STATUTORY_HIGHLIGHTS.map((highlight, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 text-center hover:border-slate-300 transition-colors"
              >
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                  {highlight.label}
                </div>
                <div className="text-base sm:text-lg font-bold text-[#002B49]">
                  {highlight.value}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{highlight.subtext}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. PATENTABILITY CRITERIA (Novelty, Inventive Step, etc) */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Legal Prerequisites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              4 Essential Criteria to Patent an Invention in India
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Under the Indian Patents Act, 1970, your invention must fulfill all four statutory conditions to qualify for an official grant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PATENTABILITY_CRITERIA.map((criterion) => (
              <div
                key={criterion.id}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {criterion.section}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {criterion.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {criterion.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {criterion.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. TYPES OF PATENT APPLICATIONS IN INDIA                  */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Filing Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Types of Patent Applications in India
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Select the optimal patent filing mechanism tailored to your R&amp;D maturity and international commercialization roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATENT_APPLICATION_TYPES.map((type) => (
              <div
                key={type.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between hover:border-[#002B49] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-500">{type.form}</span>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {type.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#002B49] transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {type.summary}
                  </p>
                  <ul className="space-y-2 mb-4 text-xs text-slate-700">
                    {type.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectPlan) {
                      onSelectPlan(type.id === 'provisional' ? 'provisional' : 'complete');
                    }
                  }}
                  className="w-full mt-2 py-2 px-3 rounded-lg border border-slate-300 hover:border-[#002B49] hover:bg-[#F5FAFF] text-[#002B49] text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Select Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. STEP-BY-STEP PATENT REGISTRATION PROCESS TIMELINE       */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Prosecution Lifecycle</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              7-Step Patent Registration Process in India
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From prior art search to certificate sealing, our registered patent attorneys manage every step before the Indian Patent Office.
            </p>
          </div>

          <div className="space-y-4">
            {PATENT_REGISTRATION_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#002B49] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                    {step.stepNumber}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 pl-14 md:pl-0">
                  <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200">
                    ⏱ {step.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. MANDATORY FORMS & DOCUMENTS CHECKLIST                  */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Regulatory Paperwork</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Mandatory Patent Office Forms &amp; Requirements
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Statutory documents prepared and digitally filed on the IP India e-filing portal on your behalf.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#f8fafc] text-slate-700 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Form #</th>
                    <th className="py-3 px-4">Statutory Name</th>
                    <th className="py-3 px-4">Purpose &amp; Description</th>
                    <th className="py-3 px-4">Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {REQUIRED_PATENT_FORMS.map((form, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#002B49] whitespace-nowrap">
                        {form.form}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {form.name}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {form.purpose}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                          {form.requiredFor}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. STATUTORY GOVERNMENT FEES TABLE                        */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Official IPO Fees</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Statutory Government Fees Schedule (E-Filing)
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Individuals, DPIIT-recognized Startups, and MSMEs receive an 80% fee concession on all Indian Patent Office official charges.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#f8fafc] text-slate-700 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-4">IPO Official Filing Form</th>
                    <th className="py-3 px-4">Individuals / Startups / MSMEs</th>
                    <th className="py-3 px-4">Large Enterprises &amp; Others</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PATENT_GOVT_FEES_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {row.formType}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        {row.individualStartupFee}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-600">
                        {row.otherEntityFee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 10. PACKAGES & TRANSPARENT PRICING                        */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100" id="pricing-plans">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Choose the Right Patent Protection Plan
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              No hidden costs. 100% strict Non-Disclosure Agreement (NDA) with every engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PATENT_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? 'bg-white border-2 border-[#002B49] shadow-xl relative scale-102'
                    : 'bg-white border border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#002B49] text-white text-[11px] font-bold py-1 px-4 rounded-full shadow-md">
                    MOST POPULAR FOR STARTUPS
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      {pkg.discountBadge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mb-4">{pkg.summary}</p>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-extrabold text-[#002B49]">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{pkg.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">+ Govt Fees</span>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-3">
                      What is included:
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onSelectPlan) {
                      onSelectPlan(pkg.id);
                    }
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-sm ${
                    pkg.popular
                      ? 'bg-[#FFDF6D] hover:bg-[#ffdb54] text-slate-900'
                      : 'bg-[#002B49] hover:bg-[#001D3D] text-white'
                  }`}
                >
                  {pkg.ctaText}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 11. WHY CHOOSE BHARATFILING FOR PATENT FILING             */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Our Edge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Innovators Trust BharatFiling for Patent Protection
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Engineering expertise meets seasoned IP jurisprudence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Registered Patent Agents
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Licensed under Section 126 of the Patents Act with specialized backgrounds in Software, Biotech, Pharma, and Mechanical engineering.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                100% Non-Disclosure (NDA)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prior to reviewing your blueprints or schematics, a binding legal NDA is executed to ensure your invention priority is safe.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Deep Tech &amp; AI Drafting
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Precision drafting for complex algorithms, microservices, and hardware systems conforming to Section 3(k) patentability guidelines.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                ISO 27001 Certified Vault
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Military-grade 256-bit encryption for all proprietary technical documents, diagrams, and trade secrets.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 12. FREQUENTLY ASKED QUESTIONS (FAQ)                      */}
        {/* ========================================================= */}
        <section className="py-12" id="faqs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions on Patent Registration
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Find answers to common questions about patent validity, costs, software patents, and objections.
            </p>

            {/* Live Search */}
            <div className="relative mt-4 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search patent questions..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#002B49]"
              />
            </div>
          </div>

          <div className="space-y-3 max-w-4xl">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                      className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#002B49] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-500 text-sm">
                No matching questions found. Contact our patent agents directly for guidance.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
