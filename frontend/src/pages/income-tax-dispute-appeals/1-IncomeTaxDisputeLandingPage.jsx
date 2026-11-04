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
  AlertOctagon,
  FileSpreadsheet,
  Scale,
  Landmark,
  ShieldAlert,
  LineChart,
  FileText,
} from 'lucide-react';
import {
  TAX_DISPUTE_HERO,
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

export default function IncomeTaxDisputeLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Form fields
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [language, setLanguage] = useState(initialData.language || 'English');
  const [problemType, setProblemType] = useState(
    initialData.problemType || 'Section 148A(b) Show Cause Notice Defense'
  );
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates ?? true
  );

  // Validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category selection modal state
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
      newErrors.problemType = 'Please select a dispute or appeal area';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    if (onSubmitLead) {
      onSubmitLead({
        email: email.trim(),
        phone: cleanPhone,
        language,
        problemType,
        whatsappUpdates,
        totalAmount: 7999,
      });
    }
  };

  const activeCategory =
    CATEGORY_TREE.find((c) => c.id === selectedCategoryTab) || CATEGORY_TREE[0];

  return (
    <div className="font-sans text-slate-800 bg-white selection:bg-[#FFD200]/30 selection:text-slate-900">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
            {TAX_DISPUTE_HERO.breadCrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.title}>
                {idx > 0 && <span className="text-slate-300">›</span>}
                <span
                  className={
                    idx === TAX_DISPUTE_HERO.breadCrumbs.length - 1
                      ? 'text-slate-700 font-medium'
                      : 'hover:text-[#002B49] cursor-pointer'
                  }
                >
                  {crumb.title}
                </span>
              </React.Fragment>
            ))}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-semibold text-[#002B49]">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>{TAX_DISPUTE_HERO.badge}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002B49] tracking-tight leading-[1.15]">
                {TAX_DISPUTE_HERO.title}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {TAX_DISPUTE_HERO.description}
              </p>

              {/* 3 Core Benefits */}
              <div className="space-y-3.5 pt-2">
                {TAX_DISPUTE_HERO.benefits.map((b) => (
                  <div key={b.id} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <span className="font-bold text-[#002B49] text-sm sm:text-base mr-1">
                        {b.title} -
                      </span>
                      <span className="text-slate-600 text-sm sm:text-base font-normal">
                        {b.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Status Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-sm">
                  <div className="flex -space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-[9px] font-bold">
                      H
                    </span>
                    <span className="w-5 h-5 rounded-full bg-purple-700 text-white flex items-center justify-center text-[9px] font-bold">
                      D
                    </span>
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px] font-bold">
                      S
                    </span>
                  </div>
                  <span>{TAX_DISPUTE_HERO.liveStatus.onlineExperts}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{TAX_DISPUTE_HERO.liveStatus.ongoingHearings}</span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                </div>
              </div>

              {/* Verified Client Testimonial Slider */}
              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/80 shadow-sm transition-all duration-300">
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "
                    {isExpandedReview
                      ? TESTIMONIALS[activeTestimonialIdx].fullReview
                      : TESTIMONIALS[activeTestimonialIdx].shortReview}
                    "
                    {!isExpandedReview && (
                      <button
                        type="button"
                        onClick={() => setIsExpandedReview(true)}
                        className="ml-1 text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                      >
                        see more..
                      </button>
                    )}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={TESTIMONIALS[activeTestimonialIdx].avatar}
                        alt={TESTIMONIALS[activeTestimonialIdx].name}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/20"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#002B49] flex items-center gap-1.5">
                          <span>{TESTIMONIALS[activeTestimonialIdx].name}</span>
                          {TESTIMONIALS[activeTestimonialIdx].verified && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                              Taxpayer
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex items-center gap-1.5">
                      {TESTIMONIALS.map((t, idx) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setActiveTestimonialIdx(idx);
                            setIsExpandedReview(false);
                          }}
                          className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                            idx === activeTestimonialIdx
                              ? 'w-6 bg-[#002B49]'
                              : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Festive Lead Capture Card */}
            <div className="lg:col-span-5 relative">
              {/* Festive Ribbon */}
              <div className="absolute -top-3.5 right-6 z-20">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{TAX_DISPUTE_HERO.festiveBadge}</span>
                </div>
              </div>

              {/* Form Container */}
              <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-7 relative overflow-hidden">
                <div className="mb-5">
                  <h2 className="text-lg sm:text-xl font-bold text-[#002B49]">
                    Consult Senior Tax Litigators
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect with an Ex-ITAT / Senior Partner before your appeal limitation expires.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                      }}
                      placeholder="e.g. tax.counsel@example.com"
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border transition ${
                        errors.email
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                          : 'border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/10'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength="10"
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setPhone(val);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
                        }}
                        placeholder="9876543210"
                        className={`w-full pl-12 pr-3.5 py-2.5 text-sm rounded-lg border transition ${
                          errors.phone
                            ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                            : 'border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/10'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-rose-500 text-xs mt-1 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* Language Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Language
                    </label>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/10 appearance-none bg-white pr-9 cursor-pointer"
                      >
                        {LANGUAGES.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Dispute Type Selector Button (Opens Modal) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Dispute Type / Section <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsCategoryModalOpen(true)}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border text-left flex items-center justify-between transition cursor-pointer ${
                        errors.problemType
                          ? 'border-rose-400 bg-rose-50/20'
                          : 'border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate font-medium text-slate-800">
                        {problemType || 'Select your tax dispute area...'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    </button>
                    {errors.problemType && (
                      <p className="text-rose-500 text-xs mt-1 font-medium">
                        {errors.problemType}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Updates Opt-in */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5">
                      Get easy updates through{' '}
                      <span className="font-bold text-emerald-600 flex items-center gap-0.5">
                        <MessageSquare className="w-3.5 h-3.5 inline" /> Whatsapp
                      </span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={whatsappUpdates}
                        onChange={(e) => setWhatsappUpdates(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600" />
                    </label>
                  </div>

                  {/* Submit CTA Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 px-4 bg-[#002B49] hover:bg-[#001f35] text-white font-bold text-sm sm:text-base rounded-lg shadow-md shadow-blue-900/20 transition-all duration-200 transform active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Consulting Litigation Desk...' : 'Book Dispute Strategy'}</span>
                    {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                </form>

                {/* Pricing Banner Pill */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 line-through">
                      ₹{TAX_DISPUTE_HERO.pricingNote.original}
                    </span>
                    <span className="text-emerald-700 font-extrabold text-sm sm:text-base">
                      ₹{TAX_DISPUTE_HERO.pricingNote.current}
                    </span>
                    <span className="text-slate-500 text-[11px]">
                      {TAX_DISPUTE_HERO.pricingNote.duration}
                    </span>
                  </div>
                </div>

                {/* Micro trust badge */}
                <div className="mt-3 py-2 px-3 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center gap-2 text-[11px] text-slate-600">
                  <Landmark className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>
                    <strong>Ex-ITAT & Senior Direct Tax Litigators</strong> (20+ yrs experience)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE CATEGORY SELECTION MODAL
          ========================================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#002B49]">
                  Select Direct Tax Dispute Domain
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose the section or forum where you require senior representation
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px] max-h-[70vh]">
              {/* Left Column: Categories List */}
              <div className="md:col-span-5 border-r border-slate-100 bg-slate-50/40 p-3 space-y-1 overflow-y-auto">
                {CATEGORY_TREE.map((category) => {
                  const isSelected = category.id === selectedCategoryTab;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategoryTab(category.id)}
                      className={`w-full px-3.5 py-3 rounded-xl text-left flex items-center justify-between text-xs sm:text-sm font-semibold transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#002B49] text-white shadow-sm'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            isSelected ? 'bg-[#FFD200]' : 'bg-slate-400'
                          }`}
                        />
                        <span className="truncate">{category.name}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 flex-shrink-0 ${
                          isSelected ? 'text-[#FFD200]' : 'text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Sub-options */}
              <div className="md:col-span-7 p-5 overflow-y-auto bg-white">
                <div className="mb-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {activeCategory.name} Matters
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    {activeCategory.options.length} dispute areas available
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {activeCategory.options.map((option) => {
                    const isSelected = problemType === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelectOption(option)}
                        className={`px-4 py-2.5 rounded-lg text-left text-xs sm:text-sm transition flex items-center justify-between cursor-pointer border ${
                          isSelected
                            ? 'bg-blue-50 border-[#002B49] text-[#002B49] font-bold shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="pr-2">{option}</span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-[#002B49] flex-shrink-0 stroke-[2.5]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Facing a unique high-pitch assessment? Select any related section.</span>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 font-semibold text-slate-700 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TRUSTED PARTNERS STRIP
          ========================================================================= */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">
            Trusted by HNIs, Corporate Boards & Wealth Advisors Across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
            {TRUSTED_PARTNERS.map((partner) => (
              <div key={partner.name} className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHO CAN BENEFIT - 6 PERSONAS
          ========================================================================= */}
      <section className="py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200/50">
              High-Stakes Tax Defense
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49] mt-3">
              Who Should Seek Appellate Representation?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From unexplained cash deposits to multi-crore share capital additions, our direct tax litigators provide seasoned defense.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHO_CAN_USE.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#002B49] flex items-center justify-center mb-4">
                    {item.icon === 'User' && <User className="w-5 h-5 text-blue-600" />}
                    {item.icon === 'Building2' && <Building2 className="w-5 h-5 text-indigo-600" />}
                    {item.icon === 'Briefcase' && <Briefcase className="w-5 h-5 text-purple-600" />}
                    {item.icon === 'LineChart' && <LineChart className="w-5 h-5 text-amber-600" />}
                    {item.icon === 'Globe' && <Globe className="w-5 h-5 text-cyan-600" />}
                    {item.icon === 'Landmark' && <Landmark className="w-5 h-5 text-emerald-600" />}
                  </div>
                  <h3 className="text-base font-bold text-[#002B49] mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHEN TO CONSULT (8 APPEAL TRIGGERS)
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200/50">
                Statutory 30-Day Window
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#002B49] leading-tight">
                When Is An Income Tax Appeal Critical?
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Once an assessment order is passed, the statutory clock starts ticking. Missing the 30-day Form 35 deadline or failing to secure a Section 220(6) stay can trigger aggressive bank freezes and recovery actions.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#002B49] bg-[#FFD200] hover:bg-[#e6bd00] px-4 py-2.5 rounded-lg shadow-sm transition cursor-pointer"
                >
                  <span>Consult Senior Tax Litigator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {WHEN_TO_CONSULT.map((reason, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-sm transition flex items-start gap-2.5 text-xs text-slate-700"
                >
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="leading-snug font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS (6-STEP WORKFLOW)
          ========================================================================= */}
      <section className="py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
              Appellate Defense Strategy
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49] mt-3">
              How the Appeal Process Works
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              From order scrutiny to demand deletion before CIT(A) and ITAT
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((hw) => (
              <div
                key={hw.step}
                className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm relative group hover:border-slate-300 transition"
              >
                <div className="text-3xl font-black text-slate-200 group-hover:text-blue-200 transition-colors duration-200 mb-3">
                  {hw.step}
                </div>
                <h3 className="text-sm font-bold text-[#002B49] mb-1.5">{hw.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{hw.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMMUNICATION CHANNELS
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              How We Collaborate With You
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Virtual conference rooms, paper book drafting, and oral advocacy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMUNICATION_CHANNELS.map((ch) => (
              <div
                key={ch.title}
                className="p-5 rounded-xl bg-slate-50/70 border border-slate-200 hover:bg-white hover:shadow-md transition text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 text-[#002B49] flex items-center justify-center mb-3">
                  {ch.icon === 'Video' && <Video className="w-5 h-5 text-blue-700" />}
                  {ch.icon === 'PhoneCall' && <PhoneCall className="w-5 h-5 text-blue-700" />}
                  {ch.icon === 'FileText' && <FileText className="w-5 h-5 text-blue-700" />}
                  {ch.icon === 'MessageSquare' && <MessageSquare className="w-5 h-5 text-blue-700" />}
                </div>
                <h3 className="text-sm font-bold text-[#002B49] mb-1">{ch.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{ch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRANSPARENT PRICING PLANS
          ========================================================================= */}
      <section className="py-16 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200/50">
              Clear & Upfront Rates
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49] mt-3">
              Direct Tax Dispute Packages
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Transparent fees for case review, Form 35 CIT(A) filing, and ITAT representation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {CONSULTATION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ${
                  plan.popular
                    ? 'bg-white border-2 border-[#002B49] shadow-xl relative'
                    : 'bg-white border border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#002B49] text-[#FFD200] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="text-base sm:text-lg font-bold text-[#002B49] mb-1">
                    {plan.name}
                  </div>
                  <div className="text-xs text-slate-500 mb-4">{plan.duration}</div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-[#002B49]">₹{plan.price}</span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{plan.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {plan.discount}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => onSelectPlan && onSelectPlan(plan.id)}
                    className={`w-full py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                      plan.popular
                        ? 'bg-[#002B49] hover:bg-[#001f35] text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          12 FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
              Tax Dispute FAQs
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49] mt-3">
              Frequently Asked Questions on Tax Appeals
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Everything you need to know about Form 35, Section 148 reassessments, and stay of demand.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm text-[#002B49]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#002B49]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 bg-slate-50/50 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
          BOTTOM CONVERSION BANNER
          ========================================================================= */}
      <section className="py-12 bg-gradient-to-r from-[#002B49] via-[#003860] to-[#002B49] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Facing High-Value Additions or Reassessment Notices?
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Do not let ex-parte assessment orders threaten your financial stability. Consult an Ex-ITAT / Senior Partner now starting at ₹7,999.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-[#FFD200] hover:bg-[#e6bd00] text-[#002B49] font-black text-sm px-6 py-3 rounded-lg shadow-lg shadow-black/20 transition cursor-pointer"
            >
              <span>Book Dispute Strategy Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
