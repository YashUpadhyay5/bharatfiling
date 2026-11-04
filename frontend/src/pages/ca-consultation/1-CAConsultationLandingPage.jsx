import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  Video,
  MessageSquare,
  FileCheck2,
  ChevronDown,
  ChevronRight,
  X,
  User,
  Briefcase,
  Laptop,
  Rocket,
  Building2,
  Globe,
  Sparkles,
  Check,
  ArrowRight,
  Calendar,
  AlertCircle,
  Calculator,
  FileText,
  Award,
  Users,
} from 'lucide-react';
import {
  CA_HERO,
  LANGUAGES,
  CATEGORY_TREE,
  TESTIMONIALS,
  TRUSTED_PARTNERS,
  WHO_CAN_USE,
  WHEN_TO_CONSULT,
  HOW_IT_WORKS,
  COMMUNICATION_CHANNELS,
  CONSULTATION_PLANS,
  FAQS,
} from './constants.js';

export default function CAConsultationLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Form fields matching screenshots 1:1
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [language, setLanguage] = useState(initialData.language || 'English');
  const [problemType, setProblemType] = useState(
    initialData.problemType || 'Business Structure Consultation'
  );
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates ?? true
  );

  // Validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category selection modal state (1:1 with media_1793770668073_0eec0372.png)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState(
    CATEGORY_TREE[0].id
  );

  // Testimonial slider index
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isExpandedReview, setIsExpandedReview] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
      setIsExpandedReview(false);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // FAQs open state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Handle Category & Sub-option selection
  const handleSelectOption = (optionLabel) => {
    setProblemType(optionLabel);
    setIsCategoryModalOpen(false);
    if (errors.problemType) {
      setErrors((prev) => ({ ...prev, problemType: null }));
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email || !email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!problemType) {
      newErrors.problemType = 'Please select a problem type';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const leadPayload = {
      email: email.trim(),
      phone: cleanPhone,
      language,
      problemType,
      whatsappUpdates,
      submittedAt: new Date().toISOString(),
    };

    if (onSubmitLead) {
      onSubmitLead(leadPayload);
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        alert(
          `Thank you! A senior Chartered Accountant specialized in "${problemType}" has been notified. You will receive an instant callback at ${cleanPhone}.`
        );
      }, 600);
    }
  };

  // Active category object in modal
  const activeCategory =
    CATEGORY_TREE.find((c) => c.id === selectedCategoryTab) || CATEGORY_TREE[0];

  const currentTestimonial = TESTIMONIALS[activeTestimonialIdx];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased selection:bg-[#002B49] selection:text-white">
      {/* =========================================================================
          HERO SECTION (1:1 with media_1793770622286_58b40dca.png)
      ========================================================================= */}
      <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/60 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-medium">
            <a
              href="/"
              className="hover:text-slate-900 transition-colors underline underline-offset-4"
            >
              Home
            </a>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-900 font-semibold">
              Talk To A Chartered Accountant
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: Hero content & value props */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge (Legal Tech Platform Since 2010 🇮🇳) */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/90 text-blue-900 text-xs sm:text-sm font-semibold shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{CA_HERO.badge}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#002B49] tracking-tight leading-[1.15]">
                {CA_HERO.title}
              </h1>

              {/* 3 Key Bullets with Blue Checkmarks */}
              <div className="space-y-4 pt-2">
                {CA_HERO.benefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      <strong className="font-bold text-slate-900">
                        {benefit.title}
                      </strong>{' '}
                      - {benefit.desc.replace(`${benefit.title} - `, '')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Live Status Indicators matching screenshot 1:1 */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {/* 181+ CAs online */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face"
                      alt="CA"
                    />
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                      alt="CA"
                    />
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face"
                      alt="CA"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {CA_HERO.liveStatus.onlineCAs}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* 39 live ongoing calls */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">
                    {CA_HERO.liveStatus.ongoingCalls}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                </div>
              </div>

              {/* Testimonial Carousel Card matching screenshot 1:1 */}
              <div className="pt-3">
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-300 shadow-sm relative transition-all duration-300">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;
                    {isExpandedReview
                      ? currentTestimonial.fullReview
                      : currentTestimonial.shortReview}
                    &rdquo;{' '}
                    {!isExpandedReview && (
                      <button
                        type="button"
                        onClick={() => setIsExpandedReview(true)}
                        className="text-blue-600 font-semibold hover:underline cursor-pointer"
                      >
                        see more..
                      </button>
                    )}
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {currentTestimonial.name}
                        </span>
                        {currentTestimonial.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-[#DFFBDE] text-emerald-800 border border-emerald-300">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>Verified</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Carousel Indicator Pills matching screenshot 1:1 */}
                <div className="flex justify-center gap-2 mt-4">
                  {TESTIMONIALS.map((t, idx) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setActiveTestimonialIdx(idx);
                        setIsExpandedReview(false);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        activeTestimonialIdx === idx
                          ? 'w-7 bg-[#002B49]'
                          : 'w-7 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`View testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Lead Capture Form Card (1:1 with media_1793770622286_58b40dca.png) */}
            <div className="lg:col-span-5 relative">
              {/* Diwali Festive Sale Offer Hanging Badge */}
              <div className="absolute -top-5 left-6 z-20">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-t-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-[11px] tracking-wide shadow-sm">
                  <span>🪔</span>
                  <span>{CA_HERO.festiveBadge}</span>
                </div>
              </div>

              {/* Form Card Container */}
              <div className="bg-white rounded-3xl border border-slate-300 shadow-xl p-6 sm:p-8 relative z-10 space-y-5">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 text-center tracking-tight">
                  Get Expert CA Consultation
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Field 1: Email */}
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((p) => ({ ...p, email: null }));
                      }}
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-blue-100 transition shadow-2xs"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Field 2: Mobile Number */}
                  <div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((p) => ({ ...p, phone: null }));
                      }}
                      placeholder="Mobile Number"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-blue-100 transition shadow-2xs"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Field 3: Language Dropdown */}
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 bg-white appearance-none focus:outline-none focus:border-[#002B49] transition shadow-2xs cursor-pointer"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-4 pointer-events-none" />
                  </div>

                  {/* Field 4: Problem Type (Clickable selector opening Category Modal) */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCategoryModalOpen(true)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium text-left bg-white text-slate-900 flex items-center justify-between focus:outline-none focus:border-[#002B49] transition shadow-2xs cursor-pointer hover:border-slate-400"
                    >
                      <span className="truncate pr-2">
                        {problemType || 'Select Problem Type'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    </button>
                    {errors.problemType && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1">
                        {errors.problemType}
                      </p>
                    )}
                  </div>

                  {/* Field 5: WhatsApp updates toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600 font-medium">
                      Get easy updates through WhatsApp
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={whatsappUpdates}
                        onChange={(e) => setWhatsappUpdates(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22C55E]"></div>
                    </label>
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-extrabold text-sm tracking-wide shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Connecting with Verified CA...</span>
                      ) : (
                        <span>Consult Now</span>
                      )}
                    </button>
                  </div>

                  {/* Pricing line matching screenshot 1:1 */}
                  <div className="text-center text-xs text-slate-600 pt-1 font-medium">
                    <span className="line-through text-slate-400 mr-1.5">
                      ₹{CA_HERO.pricingNote.original}
                    </span>
                    <span className="text-emerald-700 font-extrabold text-sm mr-1">
                      ₹{CA_HERO.pricingNote.current}
                    </span>
                    <span>{CA_HERO.pricingNote.duration}</span>
                  </div>

                  {/* Experienced CAs guarantee bar */}
                  <div className="p-3 bg-[#E8F8EA] rounded-xl flex items-center justify-center gap-2 text-xs text-emerald-900 font-semibold border border-emerald-200">
                    <User className="w-4 h-4 text-emerald-700" />
                    <span>Experienced CAs for all financial matters</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CATEGORY SELECTION MODAL (1:1 with media_1793770668073_0eec0372.png)
      ========================================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Select your Category
              </h3>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-12 flex-1 overflow-hidden min-h-[380px]">
              {/* Left Column: 4 Category Tabs */}
              <div className="sm:col-span-5 bg-slate-50/50 border-r border-slate-100 p-3 space-y-1.5 overflow-y-auto">
                {CATEGORY_TREE.map((category) => {
                  const isSelected = category.id === selectedCategoryTab;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategoryTab(category.id)}
                      className={`w-full p-3.5 rounded-xl text-left transition flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/60 text-[#002B49] font-bold shadow-2xs'
                          : 'text-slate-600 hover:bg-white/70 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${category.color}15`,
                            color: category.color,
                          }}
                        >
                          {category.id === 'business_consultation' && (
                            <Building2 className="w-4 h-4" />
                          )}
                          {category.id === 'accounting_taxation' && (
                            <Calculator className="w-4 h-4" />
                          )}
                          {category.id === 'income_tax_returns' && (
                            <FileText className="w-4 h-4" />
                          )}
                          {category.id === 'ca_certification' && (
                            <Award className="w-4 h-4" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold">
                          {category.name}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-[#002B49] translate-x-0.5' : 'text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Sub-options for the active category */}
              <div className="sm:col-span-7 p-4 sm:p-5 overflow-y-auto space-y-1 divide-y divide-slate-100">
                {activeCategory.options.map((option, idx) => {
                  const isCurrentSelected = problemType === option;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(option)}
                      className={`w-full py-3 px-3 text-left rounded-lg transition flex items-center justify-between text-xs sm:text-sm cursor-pointer ${
                        isCurrentSelected
                          ? 'bg-blue-50/70 text-[#002B49] font-bold'
                          : 'text-slate-700 hover:bg-slate-50 font-normal hover:text-slate-950'
                      }`}
                    >
                      <span>{option}</span>
                      {isCurrentSelected && (
                        <Check className="w-4 h-4 text-blue-700 shrink-0 stroke-[2.5]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TRUSTED PARTNERS MARQUEE
      ========================================================================= */}
      <section className="py-10 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Trusted Partners
          </h3>
          <div className="w-12 h-1 bg-[#002B49] mx-auto rounded-full" />
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 pt-2 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {TRUSTED_PARTNERS.map((partner, i) => (
              <img
                key={i}
                src={partner.logo}
                alt={partner.name}
                className="h-7 sm:h-8 max-w-[110px] object-contain hover:scale-105 transition"
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: WHO CAN USE CA SERVICES?
      ========================================================================= */}
      <section className="py-16 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Who Can Use Online CA Services?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Whether you are an individual tax filer, freelancer, high-growth
              startup, or corporate enterprise, our verified Chartered
              Accountants provide end-to-end guidance tailored to your specific
              tax profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHO_CAN_USE.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002B49] flex items-center justify-center shrink-0">
                  {item.icon === 'User' && <User className="w-5 h-5" />}
                  {item.icon === 'Briefcase' && <Briefcase className="w-5 h-5" />}
                  {item.icon === 'Laptop' && <Laptop className="w-5 h-5" />}
                  {item.icon === 'Rocket' && <Rocket className="w-5 h-5" />}
                  {item.icon === 'Building2' && <Building2 className="w-5 h-5" />}
                  {item.icon === 'Globe' && <Globe className="w-5 h-5" />}
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: WHEN TO CONSULT A CA?
      ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              When Should You Consult a Chartered Accountant?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Consult a CA when a tax calculation, regulatory notice, business
              transaction, or compliance decision needs professional
              interpretation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WHEN_TO_CONSULT.map((reason, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: HOW ONLINE CA CONSULTATION WORKS
      ========================================================================= */}
      <section className="py-16 bg-slate-50/60 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              How Online CA Consultation Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Get rapid, confidential, and actionable advice in 6 simple steps
              without ever stepping into a physical CA firm.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs relative space-y-3 hover:shadow-md transition"
              >
                <span className="text-2xl font-black text-blue-900/40">
                  {step.step}
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {step.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: COMMUNICATION CHANNELS
      ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Choose How You Want to Consult Your CA
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Select the mode that best fits the nature of your query, from
              quick phone calls to in-depth screen sharing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMUNICATION_CHANNELS.map((ch, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#002B49] mx-auto flex items-center justify-center">
                  {ch.icon === 'PhoneCall' && <PhoneCall className="w-5 h-5" />}
                  {ch.icon === 'Video' && <Video className="w-5 h-5" />}
                  {ch.icon === 'MessageSquare' && <MessageSquare className="w-5 h-5" />}
                  {ch.icon === 'FileCheck2' && <FileCheck2 className="w-5 h-5" />}
                </div>
                <h4 className="text-base font-bold text-slate-900">{ch.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: TRANSPARENT CONSULTATION PLANS
      ========================================================================= */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Transparent CA Consultation Packages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Fixed fees with zero hidden costs. All consultations are handled by
              certified Chartered Accountants with ICAI registration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {CONSULTATION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-[#002B49] text-white shadow-xl scale-[1.02]'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 right-6">
                    <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#FFD200] text-slate-950 shadow-sm">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3
                      className={`text-xl font-bold tracking-tight ${
                        plan.popular ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-xs mt-1 font-medium ${
                        plan.popular ? 'text-blue-200' : 'text-slate-500'
                      }`}
                    >
                      {plan.duration}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span
                      className={`text-4xl font-extrabold tracking-tight ${
                        plan.popular ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span
                      className={`text-sm line-through ${
                        plan.popular ? 'text-blue-300' : 'text-slate-400'
                      }`}
                    >
                      ₹{plan.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        plan.popular
                          ? 'bg-blue-800 text-emerald-300'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {plan.discount}
                    </span>
                  </div>

                  <div
                    className={`border-t pt-5 space-y-3.5 ${
                      plan.popular ? 'border-blue-900/60' : 'border-slate-100'
                    }`}
                  >
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.popular ? 'text-[#FFD200]' : 'text-emerald-600'
                          }`}
                        />
                        <span
                          className={`text-xs sm:text-sm leading-relaxed ${
                            plan.popular ? 'text-slate-200' : 'text-slate-600'
                          }`}
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPlan) {
                        onSelectPlan(plan.id);
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition shadow-sm cursor-pointer ${
                      plan.popular
                        ? 'bg-[#FFD200] hover:bg-[#ffe14d] text-slate-950'
                        : 'bg-[#002B49] hover:bg-[#001D32] text-white'
                    }`}
                  >
                    {plan.cta} ✦
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: FREQUENTLY ASKED QUESTIONS (12 Accordions)
      ========================================================================= */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              FAQs on Online CA Consultation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear answers to the most common questions regarding remote
              Chartered Accountant advisory.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#002B49]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA BANNER (1:1 with Vakilsearch)
      ========================================================================= */}
      <section className="py-12 bg-gradient-to-r from-[#002B49] to-[#0B2545] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Get Clarity on Professional CA Charges & Tax Options
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak directly with an ICAI-certified Chartered Accountant in your
              language.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-3.5 rounded-xl bg-[#FFD200] hover:bg-[#ffe14d] text-slate-950 font-extrabold text-sm shadow-md transition cursor-pointer shrink-0"
          >
            Connect with Experts ✦
          </button>
        </div>
      </section>
    </div>
  );
}
