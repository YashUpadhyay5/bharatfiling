import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
  Lock,
  Gift,
  ArrowRight,
  FileText,
  User,
  Scale,
  Building,
  HelpCircle,
  Briefcase,
  Layers,
  Sparkles,
  Award,
} from 'lucide-react';

import {
  ASSIGNMENT_HERO_BULLETS,
  TESTIMONIALS,
  TRUSTED_PARTNERS,
  STATUTORY_HIGHLIGHTS,
  ASSIGNMENT_TYPES,
  ASSIGNMENT_STEPS,
  REQUIRED_DOCUMENTS,
  ASSIGNMENT_PACKAGES,
  ASSIGNMENT_FAQS,
} from './constants.js';

export default function TrademarkAssignmentLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  const [currentLang, setCurrentLang] = useState('en');
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);

  // Lead Form State
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [cityPincode, setCityPincode] = useState(initialData.cityPincode || '');
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates !== undefined ? initialData.whatsappUpdates : true
  );

  const [leadErrors, setLeadErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!cityPincode.trim()) {
      errs.cityPincode = 'Please enter your City or Pincode';
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
      cityPincode,
      whatsappUpdates,
      packageId: 'standard',
      packageName: 'Trademark Assignment Filing',
      serviceType: 'trademark-assignment',
    };

    if (onSubmitLead) {
      onSubmitLead(leadPayload);
    }
  };

  const activeTestimonial = TESTIMONIALS[currentTestimonialIdx];

  const filteredFaqs = ASSIGNMENT_FAQS.filter(
    (faq) =>
      faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#002B49] selection:text-white relative overflow-x-hidden">
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
        {/* 2. BREADCRUMBS (Home > trademark assignment) (1:1 Match)   */}
        {/* ========================================================= */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1.5 font-medium">
          <a href="/" className="hover:text-slate-900 transition-colors">
            Home
          </a>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">trademark assignment</span>
        </nav>

        {/* ========================================================= */}
        {/* 3. HERO SECTION (1:1 with media_1793354434858_ff6852f9.png) */}
        {/* ========================================================= */}
        <section className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2 pb-14 border-b border-slate-100">
          {/* Left Column: Certification, Title, Bullets, Testimonial (7 cols) */}
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
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#002B49] tracking-tight leading-[1.18]">
              Trademark Assignment
            </h1>

            {/* 3 Statutory Value Proposition Bullets (1:1 with Screenshot) */}
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-800 font-normal max-w-2xl pt-1">
              {ASSIGNMENT_HERO_BULLETS.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#002B49] text-base font-bold shrink-0 leading-tight">
                    ✓
                  </span>
                  <span className="text-slate-700 leading-relaxed font-medium">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            {/* "Complete guide on Trademark Assignment" link (1:1 with Screenshot) */}
            <div className="pt-1">
              <a
                href="#what-is-assignment"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#002B49] underline hover:text-blue-800 transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[10px] font-black">
                  ▶
                </div>
                <span>Complete guide on Trademark Assignment</span>
              </a>
            </div>

            {/* Testimonial Box (1:1 with Screenshot - Siddharth Rao) */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs max-w-xl relative">
              <p className="text-xs sm:text-[13px] text-slate-600 italic leading-relaxed mb-4">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                    <User className="w-5 h-5 text-slate-500" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {activeTestimonial.author}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {activeTestimonial.role}
                    </div>
                  </div>
                </div>

                {/* Testimonial Carousel Indicators (1:1 with Screenshot) */}
                <div className="flex items-center gap-1.5">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentTestimonialIdx(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentTestimonialIdx === idx
                          ? 'w-6 bg-[#002B49]'
                          : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Card (1:1 with media_1793354434858_ff6852f9.png) (5 cols) */}
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
                {/* Card Title (1:1 with Screenshot) */}
                <div className="text-center mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Get Started
                  </h3>
                </div>

                {/* Lead Form Inputs (Email, Mobile, City/Pincode) */}
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

                  {/* City/Pincode */}
                  <div>
                    <input
                      type="text"
                      value={cityPincode}
                      onChange={(e) => {
                        setCityPincode(e.target.value);
                        if (leadErrors.cityPincode) setLeadErrors({ ...leadErrors, cityPincode: null });
                      }}
                      placeholder="City/Pincode"
                      className={`w-full px-4 py-3 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] transition-all ${
                        leadErrors.cityPincode ? 'border-red-400 bg-red-50/20' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {leadErrors.cityPincode && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{leadErrors.cityPincode}</p>
                    )}
                  </div>

                  {/* WhatsApp Updates Toggle (1:1 with Screenshot) */}
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

                  {/* Submit CTA Button (Talk to an Expert - 1:1 with Screenshot) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#002B49] hover:bg-[#001D3D] text-white font-semibold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connecting IP Expert...
                      </span>
                    ) : (
                      'Talk to an Expert'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. TRUSTED PARTNERS STRIP (1:1 with media_1793354434858)  */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#002B49] mb-1">
            Trusted Partners
          </h2>
          <div className="w-10 h-1 bg-[#002B49] mx-auto rounded-full mb-8" />

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-80">
            {TRUSTED_PARTNERS.map((partner, idx) => (
              <span
                key={idx}
                className="text-lg sm:text-xl font-extrabold tracking-tight"
                style={{ color: partner.color }}
              >
                {partner.name}
              </span>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. STATUTORY HIGHLIGHTS STRIP                             */}
        {/* ========================================================= */}
        <section className="py-8 border-b border-slate-100" id="what-is-assignment">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATUTORY_HIGHLIGHTS.map((highlight, idx) => (
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
        {/* 6. TYPES OF TRADEMARK ASSIGNMENT (Complete, Goodwill, etc) */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Assignment Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              4 Ways to Assign a Trademark in India
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Under Sections 37 to 45 of the Trade Marks Act, 1999, trademarks can be assigned completely, partially, with goodwill, or without goodwill.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ASSIGNMENT_TYPES.map((type) => (
              <div
                key={type.id}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {type.statutoryRef}
                  </span>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {type.badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {type.summary}
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  {type.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. STEP-BY-STEP TRADEMARK ASSIGNMENT PROCESS               */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
              <Scale className="w-3.5 h-3.5" />
              <span>Statutory Procedure</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              4-Step Trademark Transfer &amp; Form TM-P Filing Process
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              How BharatFiling’s IP attorneys transfer trademark ownership smoothly with the Trade Marks Registry.
            </p>
          </div>

          <div className="space-y-4">
            {ASSIGNMENT_STEPS.map((step, idx) => (
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
        {/* 8. MANDATORY DOCUMENTS CHECKLIST                          */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Documentation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Documents Required for Trademark Assignment
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Statutory documents required for notarization and e-filing of Form TM-P with the Registrar of Trademarks.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#f8fafc] text-slate-700 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Document Name</th>
                    <th className="py-3 px-4">Importance</th>
                    <th className="py-3 px-4">Description &amp; Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {REQUIRED_DOCUMENTS.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#002B49] whitespace-nowrap">
                        {doc.doc}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                          {doc.importance}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {doc.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. TRANSPARENT PACKAGES & PRICING                         */}
        {/* ========================================================= */}
        <section className="py-12 border-b border-slate-100" id="pricing-plans">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Choose the Right Trademark Assignment Package
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Expert legal deed drafting, state stamp duty advisory, and official Form TM-P e-filing with zero hidden charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {ASSIGNMENT_PACKAGES.map((pkg) => (
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
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{pkg.name}</h3>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
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
        {/* 10. FREQUENTLY ASKED QUESTIONS (FAQ)                      */}
        {/* ========================================================= */}
        <section className="py-12" id="faqs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions on Trademark Assignment
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Find answers to key legal questions regarding goodwill, Form TM-P, stamp duty, and registry timelines.
            </p>

            {/* Live Search */}
            <div className="relative mt-4 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search trademark assignment questions..."
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
                No matching questions found. Contact our trademark attorneys directly for custom assistance.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
