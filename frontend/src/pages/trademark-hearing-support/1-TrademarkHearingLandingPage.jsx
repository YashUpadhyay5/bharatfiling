import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  X,
  Search,
  ArrowRight,
  ShieldAlert,
  Scale,
  FileSpreadsheet,
  AlertOctagon,
  Landmark,
  Globe,
  User,
  Building2,
  Briefcase,
  LineChart,
  Video,
  FileText,
  MessageSquare,
  HelpCircle,
  Award,
  ShoppingBag,
  Laptop,
  HeartPulse,
  Utensils,
  Shirt,
  Factory,
} from 'lucide-react';
import {
  TRADEMARK_HEARING_HERO,
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

export default function TrademarkHearingLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Form state
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [language, setLanguage] = useState(initialData.language || 'English');
  const [problemType, setProblemType] = useState(
    initialData.problemType || 'Section 9 Absolute Grounds of Refusal'
  );
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates !== undefined ? initialData.whatsappUpdates : true
  );

  // Form error states
  const [errors, setErrors] = useState({});

  // Category Tree Modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORY_TREE[0].id);

  // Testimonials carousel
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Map icon name to Lucide component
  const renderIcon = (name, className = 'w-5 h-5') => {
    switch (name) {
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      case 'Scale':
        return <Scale className={className} />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className={className} />;
      case 'AlertOctagon':
        return <AlertOctagon className={className} />;
      case 'Landmark':
        return <Landmark className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'ShoppingBag':
        return <ShoppingBag className={className} />;
      case 'Laptop':
        return <Laptop className={className} />;
      case 'HeartPulse':
        return <HeartPulse className={className} />;
      case 'Utensils':
        return <Utensils className={className} />;
      case 'Shirt':
        return <Shirt className={className} />;
      case 'Factory':
        return <Factory className={className} />;
      case 'Video':
        return <Video className={className} />;
      case 'PhoneCall':
        return <PhoneCall className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      case 'MessageSquare':
        return <MessageSquare className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneClean = phone.replace(/\D/g, '');

    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phoneClean || phoneClean.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (onSubmitLead) {
      onSubmitLead({
        email,
        phone,
        language,
        problemType,
        whatsappUpdates,
      });
    }
  };

  // Select option from category tree modal
  const handleSelectCategoryOption = (option) => {
    setProblemType(option);
    setIsCategoryModalOpen(false);
  };

  // Filtered categories for search modal
  const filteredCategories = CATEGORY_TREE.map((cat) => {
    const matchesSearch = cat.options.filter((opt) =>
      opt.toLowerCase().includes(categorySearchQuery.toLowerCase())
    );
    return {
      ...cat,
      filteredOptions: categorySearchQuery ? matchesSearch : cat.options,
    };
  }).filter(
    (cat) =>
      !categorySearchQuery ||
      cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
      cat.filteredOptions.length > 0
  );

  return (
    <div className="bg-slate-50 font-sans text-slate-800 antialiased selection:bg-[#FFD200] selection:text-[#002B49]">
      {/* =========================================================================
          HERO & CONSULTATION CARD SECTION
          ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#f0f6fa] via-white to-slate-50 pt-8 pb-16 lg:py-16 overflow-hidden border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-6">
            {TRADEMARK_HEARING_HERO.breadCrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.title}>
                {idx > 0 && <span>&gt;</span>}
                <a
                  href={crumb.href}
                  className="hover:text-[#002B49] hover:underline transition"
                >
                  {crumb.title}
                </a>
              </React.Fragment>
            ))}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Value Prop & Live Status */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#002B49] text-xs font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>{TRADEMARK_HEARING_HERO.badge}</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002B49] tracking-tight leading-tight">
                  {TRADEMARK_HEARING_HERO.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {TRADEMARK_HEARING_HERO.description}
                </p>
              </div>

              {/* Key Benefits (Bulleted) */}
              <div className="space-y-3 pt-2">
                {TRADEMARK_HEARING_HERO.benefits.map((b) => (
                  <div key={b.id} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <div>
                      <strong className="text-sm font-bold text-slate-900 block">
                        {b.title}
                      </strong>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Status Indicators */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{TRADEMARK_HEARING_HERO.liveStatus.onlineExperts}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>{TRADEMARK_HEARING_HERO.liveStatus.ongoingHearings}</span>
                </div>
              </div>

              {/* Testimonial Snippet Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-2.5">
                  <img
                    src={TESTIMONIALS[testimonialIndex].avatar}
                    alt={TESTIMONIALS[testimonialIndex].name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">
                        {TESTIMONIALS[testimonialIndex].name}
                      </span>
                      {TESTIMONIALS[testimonialIndex].verified && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Trade Marks Registry Hearing
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{TESTIMONIALS[testimonialIndex].shortReview}"
                </p>

                {/* Carousel Indicator Dots */}
                <div className="flex items-center gap-1.5 mt-3">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTestimonialIndex(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        idx === testimonialIndex
                          ? 'w-6 bg-[#002B49]'
                          : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Lead Capture Card */}
            <div className="lg:col-span-5 relative">
              {/* Diwali Festive Offer Ribbon */}
              <div className="absolute -top-3.5 right-6 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-[11px] shadow-md tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{TRADEMARK_HEARING_HERO.festiveBadge}</span>
              </div>

              {/* Card Container */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-7 relative overflow-hidden">
                <h2 className="text-lg sm:text-xl font-bold text-[#002B49] mb-4">
                  Book Trademark Hearing Counsel
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. brand@mycompany.com"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border bg-slate-50/50 focus:bg-white focus:outline-hidden transition ${
                        errors.email
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400'
                          : 'border-slate-300 focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs font-semibold text-slate-500 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength="10"
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                        }
                        placeholder="98765 43210"
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-r-lg border bg-slate-50/50 focus:bg-white focus:outline-hidden transition ${
                          errors.phone
                            ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400'
                            : 'border-slate-300 focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49]'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Language Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-slate-50/50 focus:bg-white focus:border-[#002B49] focus:outline-hidden transition cursor-pointer"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hearing Ground / Problem Type Picker */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Hearing Notice / Ground
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
                      >
                        Browse all grounds
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCategoryModalOpen(true)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-slate-50/50 hover:bg-slate-100 flex items-center justify-between text-left text-slate-700 transition cursor-pointer"
                    >
                      <span className="truncate">{problemType}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    </button>
                  </div>

                  {/* WhatsApp Opt-in */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600">
                      Get easy hearing updates via WhatsApp
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={whatsappUpdates}
                      onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                        whatsappUpdates ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                          whatsappUpdates ? 'translate-x-4.5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Consult Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Pricing / Guarantee Footer */}
                  <div className="pt-3 border-t border-slate-100 text-center space-y-1">
                    <p className="text-xs text-slate-500">
                      <span className="line-through text-slate-400">
                        ₹{TRADEMARK_HEARING_HERO.pricingNote.original}
                      </span>{' '}
                      <strong className="text-emerald-700 text-sm font-extrabold">
                        ₹{TRADEMARK_HEARING_HERO.pricingNote.current}
                      </strong>{' '}
                      <span>{TRADEMARK_HEARING_HERO.pricingNote.duration}</span>
                    </p>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-600">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>Certified Trademark Agents & High Court IP Advocates</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUSTED PARTNERS LOGO MARQUEE
          ========================================================================= */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">
            Trusted by Brand Custodians, D2C Founders & Top IP Law Firms
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {TRUSTED_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center p-2 text-xs font-bold text-slate-600 hover:text-[#002B49] transition"
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHO CAN USE TRADEMARK HEARING SUPPORT?
          ========================================================================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Who Can Use Trademark Hearing Support?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Specialized representation customized across all 45 Nice Classification trademark categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHO_CAN_USE.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002B49] flex items-center justify-center">
                    {renderIcon(item.icon, 'w-5 h-5 text-[#002B49]')}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHEN TO CONSULT A TRADEMARK LITIGATION ATTORNEY?
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              When Should You Consult a Trademark Litigator?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Critical procedural milestones where professional advocacy determines registration vs. abandonment
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHEN_TO_CONSULT.map((point, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#002B49] flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS (6-STEP ROADMAP)
          ========================================================================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              How It Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Our 6-step streamlined workflow to safeguard your brand at the Trade Marks Registry
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs relative"
              >
                <div className="text-2xl font-black text-[#002B49]/20 absolute top-4 right-5 font-mono">
                  {step.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMMUNICATION CHANNELS
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Communication Channels
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Multiple secure avenues for hearing strategy, dossier exchange, and post-hearing filings
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMMUNICATION_CHANNELS.map((ch) => (
              <div
                key={ch.title}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#002B49] mx-auto flex items-center justify-center shadow-xs">
                  {renderIcon(ch.icon, 'w-6 h-6 text-[#002B49]')}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{ch.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {ch.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PACKAGES & PRICING
          ========================================================================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Transparent Hearing Representation Plans
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              No hidden retainers. Complete hearing appearance and legal brief compilation included.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {CONSULTATION_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between relative p-6 sm:p-8 ${
                  plan.popular
                    ? 'border-[#002B49] shadow-xl ring-2 ring-[#002B49]/10'
                    : 'border-slate-200/90 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#002B49] text-white font-extrabold text-[10px] uppercase tracking-wider shadow-xs">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {plan.name}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {plan.discount}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl sm:text-4xl font-black text-[#002B49]">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{plan.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mb-6 font-medium">
                    {plan.duration}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-600 leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => onSelectPlan && onSelectPlan(plan.id)}
                    className={`w-full py-3 px-4 font-bold text-xs rounded-lg transition-all duration-200 cursor-pointer ${
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
          FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)
          ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to know about Trade Marks Registry hearings and virtual advocacy
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
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#002B49] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
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
          CATEGORY TREE MODAL (TMR HEARING GROUNDS)
          ========================================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-[#002B49]">
                  Select Trademark Hearing Ground
                </h3>
                <p className="text-xs text-slate-500">
                  Choose the specific Registry objection or hearing type on your notice
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search Bar */}
            <div className="p-4 border-b border-slate-100 bg-slate-50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={categorySearchQuery}
                  onChange={(e) => setCategorySearchQuery(e.target.value)}
                  placeholder="Search grounds (e.g. Section 9, Distinctiveness, Rule 45)..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:outline-hidden focus:ring-1 focus:ring-[#002B49]"
                />
              </div>
            </div>

            {/* Modal Two-Pane Content */}
            <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[300px]">
              {/* Category Nav Left Pane */}
              <div className="md:col-span-5 border-r border-slate-200 overflow-y-auto p-3 space-y-1">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                      activeCategoryId === cat.id
                        ? 'bg-blue-50 text-[#002B49] border-l-4 border-l-[#002B49]'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {renderIcon(cat.icon, 'w-4 h-4 text-[#002B49] flex-shrink-0')}
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Sub-Options Right Pane */}
              <div className="md:col-span-7 overflow-y-auto p-4 space-y-2">
                {(() => {
                  const currentCategory = filteredCategories.find(
                    (c) => c.id === activeCategoryId
                  );
                  if (!currentCategory) return null;

                  return currentCategory.filteredOptions.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectCategoryOption(opt)}
                      className="w-full p-3 rounded-xl border border-slate-200/80 hover:border-[#002B49] hover:bg-blue-50/50 text-left text-xs font-semibold text-slate-700 hover:text-[#002B49] transition flex items-center justify-between cursor-pointer group"
                    >
                      <span>{opt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#002B49] transition" />
                    </button>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
