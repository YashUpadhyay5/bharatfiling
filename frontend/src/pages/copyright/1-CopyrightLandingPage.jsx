import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Code2,
  Palette,
  Music,
  Film,
  Mic,
  ArrowRight,
  FileText,
  Lock,
  Globe2,
  Clock,
  User,
  ExternalLink,
} from 'lucide-react';

import {
  COPYRIGHT_STATUTORY_HIGHLIGHTS,
  TESTIMONIALS,
  TRUSTED_PARTNERS,
  COPYRIGHT_CATEGORIES,
  LEGAL_RIGHTS,
  REGISTRATION_STEPS,
  REQUIRED_DOCUMENTS,
  COPYRIGHT_PACKAGES,
  COPYRIGHT_FAQS,
} from './constants.js';

export default function CopyrightLandingPage({
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

  // Category Icon Lookup
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-[#002B49]" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#002B49]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#002B49]" />;
      case 'Music':
        return <Music className="w-5 h-5 text-[#002B49]" />;
      case 'Film':
        return <Film className="w-5 h-5 text-[#002B49]" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-[#002B49]" />;
      default:
        return <FileText className="w-5 h-5 text-[#002B49]" />;
    }
  };

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
    const cleanPhone = phone.replace(/\D/g, '');

    const leadPayload = {
      email: email.trim(),
      phone: `+91 ${cleanPhone.slice(-10)}`,
      cityPincode: cityPincode.trim(),
      whatsappUpdates,
      serviceType: 'copyright-registration',
    };

    if (onSubmitLead) {
      onSubmitLead(leadPayload);
    }
  };

  const activeTestimonial = TESTIMONIALS[currentTestimonialIdx];

  const filteredFaqs = COPYRIGHT_FAQS.filter(
    (faq) =>
      faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#002B49] selection:text-white relative">
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
        {/* 2. BREADCRUMBS (Home > Copyright Registration)           */}
        {/* ========================================================= */}
        <nav className="text-xs text-slate-500 mb-6 flex items-center gap-1.5 font-medium">
          <a href="/" className="hover:text-slate-900 transition-colors">
            Home
          </a>
          <span>&gt;</span>
          <span className="text-slate-800 font-semibold">Copyright Registration</span>
        </nav>

        {/* ========================================================= */}
        {/* 3. HERO SECTION (1:1 with media_1793296043057_1cd6525c.png) */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2 pb-12 border-b border-slate-100">
          {/* Left Column: Heading, Bullets, Testimonial (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Certification Badge with Indian Flag (1:1 with Screenshot) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#022B50] bg-[#F5FAFF] w-max text-xs sm:text-sm font-semibold text-[#022B50] shadow-2xs">
              <div className="w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
              </div>
              <span>Only ISO 27001 Certified Platform in</span>
              <span className="text-base leading-none">🇮🇳</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#022B50] tracking-tight leading-[1.15]">
              Copyright Registration India
            </h1>

            {/* 3 Statutory Bullet Points (1:1 with Screenshot) */}
            <ul className="space-y-3.5 text-sm sm:text-[15px] text-slate-700 font-medium">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1 stroke-[2.5]" />
                <span>
                  Protect your creative work, from books to software, with legal rights under the{' '}
                  <span className="font-semibold text-slate-900">Copyright Act, 1957</span>. T&amp;C*
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1 stroke-[2.5]" />
                <span>
                  Get expert-assisted registration to avoid infringement and secure ownership.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1 stroke-[2.5]" />
                <span>
                  Register online with BharatFiling, trusted by over{' '}
                  <span className="font-semibold text-slate-900">20,000 Indian creators</span> for fast and reliable copyright protection.
                </span>
              </li>
            </ul>

            {/* "Know about Copyright registration" link */}
            <div className="pt-1">
              <a
                href="#what-is-copyright"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#022B50] underline hover:text-blue-800 transition-colors"
              >
                <div className="w-4 h-4 rounded-full bg-[#022B50] text-white flex items-center justify-center text-[10px] font-black">
                  i
                </div>
                <span>Know about Copyright registration</span>
              </a>
            </div>

            {/* Testimonial Box (1:1 with Screenshot - Rachna Pathania) */}
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

                {/* Testimonial Carousel Indicators */}
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

          {/* Right Column: Lead Form Card (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Top Festive Diya Banner (1:1 with Screenshot) */}
            <div className="flex justify-center -mb-3 relative z-10">
              <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-600 text-white text-[11px] sm:text-xs font-black px-4 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                <span>🪔</span>
                <span>Diwali Festive Sale Offer</span>
                <span>🪔</span>
              </div>
            </div>

            {/* Lead Card Container */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-lg p-6 sm:p-8 relative">
              <h2 className="text-center font-bold text-lg sm:text-xl text-slate-900 mb-5">
                Register Your Copyright
              </h2>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (leadErrors.email) setLeadErrors({ ...leadErrors, email: null });
                    }}
                    placeholder="Email"
                    className={`w-full px-4 py-3 border rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] transition-all ${
                      leadErrors.email ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {leadErrors.email && (
                    <p className="text-xs text-rose-500 mt-1 pl-1 font-medium">
                      {leadErrors.email}
                    </p>
                  )}
                </div>

                {/* Mobile Number Input */}
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (leadErrors.phone) setLeadErrors({ ...leadErrors, phone: null });
                    }}
                    placeholder="Mobile Number"
                    maxLength={10}
                    className={`w-full px-4 py-3 border rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] transition-all ${
                      leadErrors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {leadErrors.phone && (
                    <p className="text-xs text-rose-500 mt-1 pl-1 font-medium">
                      {leadErrors.phone}
                    </p>
                  )}
                </div>

                {/* City/Pincode Input */}
                <div>
                  <input
                    type="text"
                    value={cityPincode}
                    onChange={(e) => {
                      setCityPincode(e.target.value);
                      if (leadErrors.cityPincode)
                        setLeadErrors({ ...leadErrors, cityPincode: null });
                    }}
                    placeholder="City/Pincode"
                    className={`w-full px-4 py-3 border rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] transition-all ${
                      leadErrors.cityPincode
                        ? 'border-rose-400 bg-rose-50/20'
                        : 'border-slate-300'
                    }`}
                  />
                  {leadErrors.cityPincode && (
                    <p className="text-xs text-rose-500 mt-1 pl-1 font-medium">
                      {leadErrors.cityPincode}
                    </p>
                  )}
                </div>

                {/* WhatsApp Updates Toggle */}
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium pt-1">
                  <span className="flex items-center gap-1.5">
                    <span>Get easy updates through</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <span>💬</span> Whatsapp
                    </span>
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={whatsappUpdates}
                      onChange={(e) => setWhatsappUpdates(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                {/* Submit CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#002B49] hover:bg-[#001D33] active:scale-[0.99] text-white font-extrabold py-3.5 px-4 rounded-lg text-sm sm:text-base tracking-wide transition-all shadow-sm hover:shadow cursor-pointer disabled:opacity-60 mt-3"
                >
                  {isSubmitting ? 'Processing...' : 'Get Started'}
                </button>
              </form>

              {/* Security Lock Note */}
              <div className="mt-4 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Your information is strictly protected by 256-bit encryption</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. TRUSTED PARTNERS LOGOS                                 */}
        {/* ========================================================= */}
        <section className="py-8 border-b border-slate-100 text-center">
          <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-6">
            Trusted Partners
          </h2>
          <div className="flex items-center justify-center gap-8 sm:gap-14 flex-wrap opacity-80 hover:opacity-100 transition-opacity">
            {TRUSTED_PARTNERS.map((partner) => (
              <span
                key={partner.name}
                className="text-lg sm:text-2xl font-black tracking-tight"
                style={{ color: partner.color }}
              >
                {partner.name}
              </span>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CATEGORIES OF WORKS PROTECTED BY COPYRIGHT             */}
        {/* ========================================================= */}
        <section id="what-is-copyright" className="py-12 sm:py-16 border-b border-slate-100">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Categories of Works Protected Under Copyright Act, 1957
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
              Copyright law in India classifies original creative expressions into distinct statutory categories. Each category enjoys statutory protection and legal ownership rights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COPYRIGHT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {cat.statutorySection}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{cat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Covers:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.examples.map((ex, i) => (
                        <span
                          key={i}
                          className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>

                  {cat.note && (
                    <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200/70 mb-4 font-medium">
                      ⚠️ {cat.note}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Govt Fee:</span>
                  <span className="font-bold text-[#002B49]">₹{cat.govtFee} / work</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. LEGAL RIGHTS OF A COPYRIGHT OWNER                      */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 border-b border-slate-100 bg-[#F9FBFC] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
                Legal Rights of a Copyright Owner
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                Under Section 14 of the Copyright Act, 1957, registration establishes exclusive statutory rights that empower the owner to commercialize, license, and defend their work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {LEGAL_RIGHTS.map((right, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-2xs hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {right.section}
                    </span>
                    <span className="text-xs font-black text-slate-300">#{idx + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{right.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {right.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. STEP-BY-STEP COPYRIGHT REGISTRATION PROCESS            */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 border-b border-slate-100">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Step-by-Step Copyright Registration Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
              From e-filing Form XIV to Diary Number issuance and receiving the official ROC Certificate, our senior IP lawyers manage every statutory stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGISTRATION_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#002B49] text-white flex items-center justify-center font-black text-sm mb-4 shadow-xs">
                    {step.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>

                {step.step === '03' && (
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-700 bg-emerald-50/70 p-2 rounded flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Statutory Diary Number issued in 24 hours</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. DOCUMENTS REQUIRED FOR COPYRIGHT REGISTRATION          */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 border-b border-slate-100 bg-slate-50/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
                Documents Required for Copyright Registration in India
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Simple checklist of documents required to prepare and file your copyright application.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {REQUIRED_DOCUMENTS.map((doc, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-[#002B49] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                      {doc.essential ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Mandatory
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          Case-Specific
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. PRICING PLANS & COMPARISON TABLE                       */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 border-b border-slate-100">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Transparent Copyright Registration Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
              Choose the package tailored to your creative medium with full legal drafting and Registry follow-up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
            {COPYRIGHT_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between p-6 sm:p-7 relative ${
                  pkg.popular
                    ? 'border-[#002B49] bg-white shadow-xl ring-2 ring-[#002B49]'
                    : 'border-slate-200 bg-white shadow-xs hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#002B49] text-[#FDB813] text-[10px] sm:text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#FDB813]" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mb-4 min-h-[32px]">{pkg.tagline}</p>

                  <div className="mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 line-through text-xs font-semibold">
                        ₹{pkg.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        {pkg.discountBadge}
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                      + Govt statutory fee
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                      Package Features:
                    </div>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed font-medium"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
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
                    className={`w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all text-center cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#002B49] hover:bg-[#001D33] text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-[#002B49] text-slate-800 hover:text-white'
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 10. FREQUENTLY ASKED QUESTIONS (FAQ Accordion)            */}
        {/* ========================================================= */}
        <section className="py-12 sm:py-16 max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Frequently Asked Questions on Copyright
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Common legal inquiries about copyright validity, Diary Numbers, source code, and objections.
            </p>
          </div>

          {/* Search bar inside FAQ */}
          <div className="relative mb-6">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search copyright questions (e.g. software, diary number, TM-60, validity)..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#002B49] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-[13px] text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
      {/* 11. STICKY "REFER A FRIEND" TAB (1:1 with Screenshot)     */}
      {/* ========================================================= */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <a
          href="/refer-and-earn"
          className="bg-[#FDB813] hover:bg-[#e6a50e] text-slate-950 font-bold text-xs px-2.5 py-4 rounded-l-lg shadow-md flex items-center gap-2 cursor-pointer transition-colors [writing-mode:vertical-rl] rotate-180"
        >
          <span>🎁</span>
          <span>Refer a friend</span>
        </a>
      </div>
    </div>
  );
}
