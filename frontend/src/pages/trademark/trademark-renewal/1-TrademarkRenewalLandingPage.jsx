import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles,
  Phone,
  MessageSquare,
  Gift,
  HelpCircle,
  FileCheck,
  Calendar,
  AlertTriangle,
  Play,
  X,
  ArrowRight,
  User,
  Scale,
} from 'lucide-react';

import {
  RENEWAL_STATUTORY_HIGHLIGHTS,
  TESTIMONIALS,
  TRUSTED_PARTNERS,
  RENEWAL_WINDOWS,
  RENEWAL_PACKAGES,
  RENEWAL_STEPS,
  REQUIRED_DOCUMENTS,
  RENEWAL_FAQS,
} from './constants.js';

export default function TrademarkRenewalLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Language toggle
  const [currentLang, setCurrentLang] = useState('en');

  // Lead Form State
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(
    initialData.phone ? initialData.phone.replace('+91 ', '') : ''
  );
  const [cityPincode, setCityPincode] = useState(initialData.cityPincode || '');
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates !== undefined ? initialData.whatsappUpdates : true
  );
  const [leadErrors, setLeadErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Testimonial Carousel
  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [faqSearch, setFaqSearch] = useState('');

  // Referral Modal
  const [showReferralModal, setShowReferralModal] = useState(false);

  // Statutory Guide Modal
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Validate and submit lead form
  const handleLeadSubmit = (e) => {
    if (e) e.preventDefault();
    const errors = {};

    if (!email || !email.includes('@')) {
      errors.email = 'Please provide a valid email address.';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!cityPincode.trim()) {
      errors.cityPincode = 'Please enter your City or Pincode.';
    }

    if (Object.keys(errors).length > 0) {
      setLeadErrors(errors);
      return;
    }

    setLeadErrors({});
    setIsSubmitting(true);

    const leadPayload = {
      email: email.trim(),
      phone: `+91 ${cleanPhone.slice(-10)}`,
      cityPincode: cityPincode.trim(),
      whatsappUpdates,
      serviceType: 'trademark-renewal',
    };

    if (onSubmitLead) {
      onSubmitLead(leadPayload);
    }
  };

  const activeTestimonial = TESTIMONIALS[currentTestimonialIdx];

  const filteredFaqs = RENEWAL_FAQS.filter(
    (faq) =>
      faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#002B49] selection:text-white">
      {/* ========================================================= */}
      {/* 1. TOP NOTICE BAR: Language Switcher (1:1 with Screenshot) */}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        {/* ========================================================= */}
        {/* 2. BREADCRUMBS (Home > IPIndia > Trademark renewal) */}
        {/* ========================================================= */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1.5 font-medium">
          <a href="/" className="hover:text-slate-900 transition-colors">
            Home
          </a>
          <span>&gt;</span>
          <a href="/services" className="hover:text-slate-900 transition-colors">
            IPIndia
          </a>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Trademark renewal</span>
        </nav>

        {/* ========================================================= */}
        {/* 3. HERO SECTION (2-Column Grid matching Screenshot)       */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Headings, Highlights & Testimonial */}
          <div className="lg:col-span-7 space-y-6">
            {/* ISO 27001 Certified Badge (Matching Screenshot) */}
            <div className="inline-flex items-center gap-2 bg-[#F3F8FC] border border-[#BFDBFE] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#002B49] shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-blue-600 fill-blue-50" />
              <span>Only ISO 27001 Certified Platform in 🇮🇳</span>
            </div>

            {/* Main Title (1:1 with Screenshot) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#002B49] tracking-tight leading-tight">
              Trademark Renewal in India
            </h1>

            {/* 3 Checkmark Bullet Points (Exact match of Screenshot) */}
            <div className="space-y-3.5 pt-1">
              {RENEWAL_STATUTORY_HIGHLIGHTS.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-blue-700 stroke-[3]" />
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Resource Video / Guide Link (Matching Screenshot) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowGuideModal(true)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#002B49] hover:text-blue-700 underline cursor-pointer transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center shadow-2xs">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Complete guide on Trademark Renewal in India</span>
              </button>
            </div>

            {/* Testimonial Card (Exact Quote by Rachna Pathania) */}
            <div className="bg-[#FAFBFD] border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4 max-w-xl">
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-1">
                <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-none">
                    {activeTestimonial.author}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                    {activeTestimonial.role}
                  </p>
                </div>
              </div>

              {/* Carousel Pagination Dots (Matching — • • in Screenshot) */}
              <div className="flex items-center gap-1.5 pt-1">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentTestimonialIdx(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentTestimonialIdx === idx
                        ? 'w-6 bg-[#002B49]'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Lead Capture Form Card (1:1 Screenshot)     */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 relative">
            {/* Top Hanging Festive Banner (Diwali Festive Sale Offer) */}
            <div className="relative -mb-3 z-10 flex justify-start pl-4">
              <div className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-extrabold text-[11px] sm:text-xs px-3.5 py-1 rounded-t-lg shadow-sm flex items-center gap-1.5">
                <span>🪔</span>
                <span>Diwali Festive Sale Offer</span>
              </div>
            </div>

            {/* White Card Container */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 sm:p-8 space-y-5">
              <h3 className="text-xl font-black text-[#002B49] text-center tracking-tight">
                Trademark Renewal
              </h3>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] transition-all ${
                      leadErrors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {leadErrors.email && (
                    <p className="text-xs text-red-600 mt-1">{leadErrors.email}</p>
                  )}
                </div>

                {/* Mobile Number Input */}
                <div>
                  <div className="flex rounded-lg border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#002B49]">
                    <span className="bg-slate-50 border-r border-slate-300 px-3 py-2.5 text-xs sm:text-sm text-slate-600 font-semibold select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Mobile Number"
                      className="w-full px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                  {leadErrors.phone && (
                    <p className="text-xs text-red-600 mt-1">{leadErrors.phone}</p>
                  )}
                </div>

                {/* City / Pincode Input */}
                <div>
                  <input
                    type="text"
                    value={cityPincode}
                    onChange={(e) => setCityPincode(e.target.value)}
                    placeholder="City/Pincode"
                    className={`w-full border rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] transition-all ${
                      leadErrors.cityPincode ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                  />
                  {leadErrors.cityPincode && (
                    <p className="text-xs text-red-600 mt-1">{leadErrors.cityPincode}</p>
                  )}
                </div>

                {/* WhatsApp Updates Switch Toggle */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                    <span>Get easy updates through</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                      Whatsapp
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                    className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                      whatsappUpdates ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                    aria-label="Toggle WhatsApp updates"
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        whatsappUpdates ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* CTA Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#002B49] hover:bg-[#001f35] text-white font-bold py-3 rounded-lg text-sm transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? 'Processing...' : 'Get Started'}</span>
                </button>
              </form>

              <div className="pt-1 text-center">
                <span className="text-[11px] text-slate-400 font-medium">
                  🔒 100% confidential. Form TM-R prepared by Senior IP Lawyers.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. TRUSTED PARTNERS BAR (Exact Header with Underline)     */}
        {/* ========================================================= */}
        <section className="mt-16 text-center space-y-6">
          <div className="inline-block relative">
            <h2 className="text-xl sm:text-2xl font-black text-[#002B49] tracking-tight">
              Trusted Partners
            </h2>
            <div className="w-16 h-1 bg-[#002B49] mx-auto mt-2 rounded-full" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pt-4 opacity-80 grayscale hover:grayscale-0 transition-all">
            {TRUSTED_PARTNERS.map((partner, idx) => (
              <span
                key={idx}
                className="text-base sm:text-lg font-black tracking-wider uppercase transition-colors"
                style={{ color: partner.color }}
              >
                {partner.name}
              </span>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. 10-YEAR STATUTORY CLOCK & RENEWAL WINDOWS              */}
        {/* ========================================================= */}
        <section className="mt-20 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              Statutory Timelines Under Trade Marks Act, 1999
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              The 10-Year Trademark Renewal Window
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              Every registered trademark in India expires 10 years from its application date. Understand the three statutory phases to keep your brand secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RENEWAL_WINDOWS.map((window) => (
              <div
                key={window.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700">
                    {window.timeline}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    {window.statutorySection}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-[#002B49]">{window.title}</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {window.description}
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-slate-600">
                    <span>Govt Fee per Class:</span>
                    <span className="font-bold text-slate-900">₹{window.govtFeePerClass}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Statutory Surcharge:</span>
                    <span className={`font-bold ${window.surcharge > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {window.surcharge > 0 ? `+₹${window.surcharge}` : '₹0 (None)'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. 3-TIER PRICING PACKAGES                                */}
        {/* ========================================================= */}
        <section className="mt-20 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Transparent Pricing for Trademark Renewal
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Select the service suited to your trademark’s current registry status. Official Govt fees at actuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RENEWAL_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl p-6 sm:p-7 border flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? 'border-[#002B49] shadow-xl ring-2 ring-[#002B49]/10 relative'
                    : 'border-slate-200 shadow-xs hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#002B49] text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                      Most Chosen
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-[#002B49]">{pkg.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed min-h-[34px]">
                      {pkg.tagline}
                    </p>
                  </div>

                  <div className="pt-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900">₹{pkg.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice}</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        {pkg.discountBadge}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      + Govt fee at actuals (₹9,000 per class via Form TM-R)
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-2.5">
                    <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                      Included in this plan:
                    </span>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPlan) {
                        onSelectPlan(pkg.id);
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`w-full py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#002B49] hover:bg-[#001f35] text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    Select {pkg.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. 5-STEP RENEWAL ROADMAP                                 */}
        {/* ========================================================= */}
        <section className="mt-20 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              How BharatFiling Renews Your Trademark
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              A transparent, 100% online legal process from verification to 10-year validity extension.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {RENEWAL_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3 relative"
              >
                <div className="text-2xl font-black text-blue-200">{step.step}</div>
                <h4 className="text-sm font-bold text-[#002B49] leading-snug">{step.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. DOCUMENTS CHECKLIST                                    */}
        {/* ========================================================= */}
        <section className="mt-20 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Documents Required for Trademark Renewal
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Only basic verification documents are needed. Form TM-48 is prepared by us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REQUIRED_DOCUMENTS.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <FileCheck className="w-5 h-5 text-blue-600" />
                  {doc.essential ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Mandatory
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      If Applicable
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-800">{doc.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. SEARCHABLE STATUTORY FAQS                              */}
        {/* ========================================================= */}
        <section className="mt-20 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Frequently Asked Questions on Trademark Renewal
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to know about Form TM-R, statutory timelines, late fees, and validity extension.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search renewal questions (e.g. Form TM-R, surcharge, certificate)..."
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#002B49]"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#002B49] cursor-pointer hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAFCFF]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ========================================================= */}
      {/* 10. FLOATING WIDGETS (Referral Ribbon & WhatsApp Pill)     */}
      {/* ========================================================= */}
      {/* Right Edge "Refer a friend" Ribbon */}
      <button
        type="button"
        onClick={() => setShowReferralModal(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#FDB813] hover:bg-[#e5a610] text-slate-900 font-black text-xs px-2.5 py-4 rounded-l-xl shadow-lg writing-vertical cursor-pointer z-40 flex items-center gap-2"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="rotate-90">🎁</span>
        <span>Refer a friend</span>
      </button>

      {/* Bottom Right WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/917668976193?text=Hi%2C%20I%20want%20to%20renew%20my%20Trademark%20in%20India"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition-transform flex items-center justify-center relative cursor-pointer"
        >
          <MessageSquare className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
            1
          </span>
        </a>
      </div>

      {/* Referral Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowReferralModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-[#002B49]">Refer a Founder, Earn ₹500</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Know someone whose brand or trademark needs renewal or filing? Refer them to BharatFiling and both of you earn ₹500 in legal compliance credits.
            </p>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('https://bharatfiling.com/services/trademark-renewal?ref=PARTNER500');
                alert('Referral link copied to clipboard!');
                setShowReferralModal(false);
              }}
              className="w-full bg-[#002B49] text-white font-bold py-2.5 rounded-lg text-xs hover:bg-[#001f35] transition-all cursor-pointer"
            >
              Copy Referral Link
            </button>
          </div>
        </div>
      )}

      {/* Complete Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                Official IP India Guide
              </span>
              <h3 className="text-xl font-black text-[#002B49]">
                Complete Guide to Trademark Renewal in India
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>1. 10-Year Statutory Term:</strong> Under Section 25 of the Trade Marks Act, 1999, registration is valid for 10 years from the original application date. It must be renewed prior to expiration to maintain exclusive usage rights under Section 28.
              </p>
              <p>
                <strong>2. Standard Filing Window:</strong> Form TM-R can be submitted within 6 months before the expiration date. The official fee is ₹9,000 per class electronically.
              </p>
              <p>
                <strong>3. Six-Month Grace Period:</strong> If missed before expiry, Section 25(3) permits renewal with an additional late filing surcharge of ₹4,500 per class.
              </p>
              <p>
                <strong>4. Restoration Within One Year:</strong> If a mark is removed from the e-Register for non-renewal, an application for Restoration and Renewal can be filed within one year from the expiration date under Section 25(4) with a ₹5,000 surcharge.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="w-full bg-[#002B49] text-white font-bold py-2.5 rounded-lg text-xs hover:bg-[#001f35] transition-all cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
