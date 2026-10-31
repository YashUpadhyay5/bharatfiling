import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Play,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  Scale,
  Sparkles,
  ArrowRight,
  Gift,
  HelpCircle,
  Building2,
  Users,
  Award,
  Lock,
  Phone,
  Mail,
  Check,
  MapPin,
  Globe,
  Coins,
  PieChart,
  DollarSign,
  CreditCard,
  Landmark,
} from 'lucide-react';
import {
  PARTNERSHIP_HERO,
  TRUSTED_PARTNERS,
  PARTNERSHIP_TESTIMONIALS,
  REGISTERED_VS_UNREGISTERED,
  ALL_INDIA_STATES,
  DEED_ESSENTIAL_CLAUSES,
  DOCUMENTS_REQUIRED,
  REGISTRATION_PROCESS_STEPS,
  PRICING_PACKAGES,
  FAQS,
} from './constants.js';

export default function PartnershipLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Form State matching screenshot media_1793435760325_26064797.png
  const [formData, setFormData] = useState({
    email: initialData.email || '',
    phone: initialData.phone || '',
    cityPincode: initialData.cityPincode || '',
    language: initialData.language || 'English',
    whatsappUpdates: initialData.whatsappUpdates !== false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Video Modal State
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Active State Selector in Guide
  const [selectedStateCode, setSelectedStateCode] = useState('MH');

  // Documents Tab State
  const [activeDocTab, setActiveDocTab] = useState(0);

  // Testimonial Carousel State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex(
        (prev) => (prev + 1) % PARTNERSHIP_TESTIMONIALS.length
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email address is required';
    }
    const cleanPhone = (formData.phone || '').replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = '10-digit mobile number is required';
    }
    if (!formData.cityPincode || formData.cityPincode.trim().length < 2) {
      errs.cityPincode = 'Please enter your city or pincode';
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    if (onSubmitLead) {
      onSubmitLead(formData);
    }
  };

  const handlePlanClick = (pkgId) => {
    if (onSelectPlan) {
      onSelectPlan(pkgId);
    } else if (onSubmitLead) {
      onSubmitLead({ ...formData, packageId: pkgId });
    }
  };

  const activeStateObj =
    ALL_INDIA_STATES.find((s) => s.code === selectedStateCode) ||
    ALL_INDIA_STATES[0];

  return (
    <div className="w-full bg-white text-slate-800 font-sans antialiased">
      {/* =========================================================================
          HERO SECTION (1:1 Exact Match with media_1793435760325_26064797.png)
          - Breadcrumb: Home > Company Registration > Partnership Firm Registration
          - Left: Only ISO 27001 Certified Platform in India pill
          - Title: Partnership Firm Registration in India
          - 3 bullet points with checkmarks
          - Right: Lead Form Card with Diwali Festive Sale Offer badge
      ========================================================================= */}
      <section className="relative pt-6 pb-14 bg-gradient-to-b from-slate-50/90 via-white to-white overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb matching screenshot */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-slate-500 mb-6 flex items-center gap-1.5 font-medium"
          >
            <Link to="/" className="hover:text-blue-900 transition">
              Home
            </Link>
            <span>&gt;</span>
            <Link to="/services" className="hover:text-blue-900 transition">
              Company Registration
            </Link>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">
              Partnership Firm Registration
            </span>
            <span className="text-slate-400">&gt;</span>
            <span className="text-blue-900 font-semibold">All India</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT 7 COLUMNS: HERO TEXT, BULLETS, VIDEO CTA, TESTIMONIAL PREVIEW */}
            <div className="lg:col-span-7 space-y-6">
              {/* ISO 27001 Certified Platform Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50/70 text-blue-900 text-xs font-semibold shadow-xs">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>{PARTNERSHIP_HERO.badge}</span>
              </div>

              {/* Main Heading (Adjusted for All India as explicitly requested by user) */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#002B49] leading-[1.18] tracking-tight">
                {PARTNERSHIP_HERO.title}
              </h1>

              {/* 3 Value Propositions with Checkmarks (Matching media_1793435760325_26064797.png) */}
              <ul className="space-y-3.5 pt-1">
                {PARTNERSHIP_HERO.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm sm:text-base text-slate-700 font-medium">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Trust Stats Bar */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PARTNERSHIP_HERO.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-50/80 rounded-xl border border-slate-100"
                  >
                    <div className="text-lg font-bold text-[#002B49]">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Video Explainer Button */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 hover:text-blue-700 transition cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-900">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <span>Watch How Partnership Registration Works (2 Mins)</span>
                </button>
              </div>

              {/* Testimonials Carousel Card Preview */}
              <div className="pt-4 border-t border-slate-100">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-all">
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-3">
                    &ldquo;
                    {PARTNERSHIP_TESTIMONIALS[currentTestimonialIndex].quote}
                    &rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        PARTNERSHIP_TESTIMONIALS[currentTestimonialIndex].avatar
                      }
                      alt={
                        PARTNERSHIP_TESTIMONIALS[currentTestimonialIndex].author
                      }
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {
                          PARTNERSHIP_TESTIMONIALS[currentTestimonialIndex]
                            .author
                        }
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {PARTNERSHIP_TESTIMONIALS[currentTestimonialIndex].title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-1.5 mt-3">
                  {PARTNERSHIP_TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCurrentTestimonialIndex(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        currentTestimonialIndex === i
                          ? 'w-6 bg-[#002B49]'
                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT 5 COLUMNS: LEAD CAPTURE FORM CARD (1:1 with media_1793435760325_26064797.png) */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              {/* Festive Offer Badge pinned to card top right */}
              <div className="flex justify-end -mb-3 relative z-10 pr-4">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                  <Gift className="w-3.5 h-3.5" />
                  <span>{PARTNERSHIP_HERO.festiveBadge}</span>
                </div>
              </div>

              {/* Form Card Container */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_40px_rgba(15,23,42,0.08)] p-6 sm:p-7 relative z-0">
                <h3 className="text-lg font-bold text-[#002B49] text-center mb-5 tracking-tight">
                  Partnership Firm Registration
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="sr-only" htmlFor="lead-email">
                      Email
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email)
                          setFormErrors({ ...formErrors, email: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-[#002B49]/20 focus:border-[#002B49] ${
                        formErrors.email
                          ? 'border-rose-400 bg-rose-50/20'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-600 mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number Input with +91 Prefix */}
                  <div>
                    <label className="sr-only" htmlFor="lead-phone">
                      Mobile Number
                    </label>
                    <div className="relative flex rounded-lg border border-slate-300 hover:border-slate-400 transition focus-within:ring-2 focus-within:ring-[#002B49]/20 focus-within:border-[#002B49]">
                      <span className="inline-flex items-center px-3 text-xs font-semibold text-slate-500 bg-slate-50 border-r border-slate-200 rounded-l-lg select-none">
                        +91
                      </span>
                      <input
                        id="lead-phone"
                        type="tel"
                        maxLength="10"
                        placeholder="Mobile Number"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setFormData({ ...formData, phone: val });
                          if (formErrors.phone)
                            setFormErrors({ ...formErrors, phone: '' });
                        }}
                        className="w-full px-3.5 py-2.5 rounded-r-lg text-sm focus:outline-none bg-white"
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* City / Pincode Input */}
                  <div>
                    <label className="sr-only" htmlFor="lead-city">
                      City/Pincode
                    </label>
                    <input
                      id="lead-city"
                      type="text"
                      placeholder="City/Pincode"
                      value={formData.cityPincode}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          cityPincode: e.target.value,
                        });
                        if (formErrors.cityPincode)
                          setFormErrors({ ...formErrors, cityPincode: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-[#002B49]/20 focus:border-[#002B49] ${
                        formErrors.cityPincode
                          ? 'border-rose-400 bg-rose-50/20'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    />
                    {formErrors.cityPincode && (
                      <p className="text-[11px] text-rose-600 mt-1">
                        {formErrors.cityPincode}
                      </p>
                    )}
                  </div>

                  {/* Language Selector Dropdown (Exact match with media_1793435760325_26064797.png) */}
                  <div>
                    <label className="sr-only" htmlFor="lead-language">
                      Language
                    </label>
                    <div className="relative">
                      <select
                        id="lead-language"
                        value={formData.language}
                        onChange={(e) =>
                          setFormData({ ...formData, language: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 transition focus:outline-none focus:ring-2 focus:ring-[#002B49]/20 focus:border-[#002B49] appearance-none cursor-pointer"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi (हिंदी)</option>
                        <option value="Marathi">Marathi (मराठी)</option>
                        <option value="Tamil">Tamil (தமிழ்)</option>
                        <option value="Telugu">Telugu (తెలుగు)</option>
                        <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                        <option value="Bengali">Bengali (বাংলা)</option>
                        <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* WhatsApp Updates Toggle (Exact match with media_1793435760325_26064797.png) */}
                  <div className="flex items-center justify-between pt-1 pb-1">
                    <span className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                      Get easy updates through Whatsapp
                      <span className="inline-block w-4 h-4 bg-emerald-500 text-white rounded-full text-center text-[10px] leading-4 font-bold">
                        ✓
                      </span>
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={formData.whatsappUpdates}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          whatsappUpdates: !formData.whatsappUpdates,
                        })
                      }
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        formData.whatsappUpdates
                          ? 'bg-emerald-500'
                          : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          formData.whatsappUpdates
                            ? 'translate-x-4'
                            : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* CTA Button: Get Started (Dark navy primary button matching screenshot) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>
                        256-Bit SSL Encrypted • Zero Spam Guarantee • Pan-India
                        Support
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUSTED PARTNERS (Exact Match with media_1793435760325_26064797.png)
      ========================================================================= */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-block relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Trusted Partners
            </h2>
            <div className="w-16 h-1 bg-[#002B49] mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-center pt-4">
            {TRUSTED_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="h-14 flex items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition shadow-2xs group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-8 max-w-[120px] object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition"
                  onError={(e) => {
                    // Fallback to text badge if logo fails
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML = `<span class="text-xs font-bold text-slate-700 tracking-wider">${partner.name}</span>`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE ALL-INDIA STATE NAVIGATOR & STAMP DUTY CALCULATOR
          Directly addresses user's request: "chnage maharstre ti all over india"
      ========================================================================= */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Pan-India Registrar of Firms (RoF) Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              State-Wise Partnership Registration &amp; Stamp Duty Guide
            </h2>
            <p className="text-sm text-slate-600">
              Partnership registration procedures and stamp duties are governed
              by individual State Governments. BharatFiling manages local
              Registrar of Firms (RoF) filings and stamp duty execution across
              every Indian state.
            </p>
          </div>

          {/* State Selection Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ALL_INDIA_STATES.map((st) => (
              <button
                key={st.code}
                type="button"
                onClick={() => setSelectedStateCode(st.code)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedStateCode === st.code
                    ? 'bg-[#002B49] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{st.name}</span>
                {st.popular && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </button>
            ))}
          </div>

          {/* Active State Detail Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="space-y-2 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Selected Jurisdiction
                </span>
                <h3 className="text-xl font-bold text-[#002B49] flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-blue-600" />
                  <span>{activeStateObj.name}</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Official Portal:{' '}
                  <span className="text-slate-800 font-semibold">
                    {activeStateObj.rofPortal}
                  </span>
                </p>
              </div>

              <div className="space-y-1.5 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  State Stamp Duty Norms
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {activeStateObj.stampDutyNote}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  State-Specific Requirement
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {activeStateObj.specialReq}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-blue-50/50 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-blue-900 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                <span>
                  Our local advocates and CA team in {activeStateObj.name} will
                  handle physical or online stamp paper preparation and RoF
                  filing.
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleSubmit({
                    preventDefault: () => {},
                  })
                }
                className="shrink-0 text-xs font-bold text-white bg-[#002B49] hover:bg-[#001D32] px-4 py-2 rounded-lg transition"
              >
                Register in {activeStateObj.name}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          REGISTERED VS UNREGISTERED FIRM (Section 69 of Indian Partnership Act)
      ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Legal Protection Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Registered vs. Unregistered Partnership Firm
            </h2>
            <p className="text-sm text-slate-600">
              Why registering with the Registrar of Firms (RoF) under Section 69
              of the Indian Partnership Act, 1932 is essential for safeguarding
              your commercial rights.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-2xl overflow-hidden border border-slate-200 text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#002B49] text-white">
                  <th className="p-4 sm:p-5 font-bold w-1/3">
                    Legal &amp; Commercial Parameter
                  </th>
                  <th className="p-4 sm:p-5 font-bold w-1/3 bg-[#001D32]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Registered Partnership Firm</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 font-bold w-1/3 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <X className="w-4 h-4 text-rose-400" />
                      <span>Unregistered Partnership</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {REGISTERED_VS_UNREGISTERED.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}
                  >
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-900 bg-emerald-50/20 font-medium">
                      {row.registered}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 font-medium">
                      {row.unregistered}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ESSENTIAL CLAUSES OF PARTNERSHIP DEED
      ========================================================================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Legal Drafting Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Key Clauses Drafted in Your Partnership Deed
            </h2>
            <p className="text-sm text-slate-600">
              A partnership deed is the constitutional backbone of your
              business. Our senior legal team customizes each clause to maximize
              tax efficiency and eliminate partner conflicts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEED_ESSENTIAL_CLAUSES.map((clause, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-[#002B49] transition hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {clause.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {clause.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          DOCUMENTS REQUIRED (Interactive Tabs)
      ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Checklist &amp; Readiness
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Documents Required for Partnership Firm Registration
            </h2>
            <p className="text-sm text-slate-600">
              Simple scanned digital copies are all you need. No physical visit
              to any registrar or government office is required.
            </p>
          </div>

          {/* Document Tabs */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-3">
            {DOCUMENTS_REQUIRED.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveDocTab(idx)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeDocTab === idx
                    ? 'bg-[#002B49] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* Active Tab Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DOCUMENTS_REQUIRED[activeDocTab].items.map((doc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {doc.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          REGISTRATION PROCESS (5 Steps)
      ========================================================================= */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              5-Step Procedure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              How the Registration Process Works Online
            </h2>
            <p className="text-sm text-slate-600">
              Clear milestone progression managed by dedicated corporate
              advocates and chartered accountants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {REGISTRATION_PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-200">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                      {step.days}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#002B49]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRICING PACKAGES (Matching ₹2,499 from mega menu in media_1793424086317_17a0eb43.png)
      ========================================================================= */}
      <section
        className="py-16 bg-white border-b border-slate-100"
        id="pricing-plans"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Choose the Right Partnership Package
            </h2>
            <p className="text-sm text-slate-600">
              Transparent fees with zero hidden costs. All packages include
              expert legal drafting and dedicated CA guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PRICING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl border transition-all flex flex-col justify-between p-6 sm:p-7 relative ${
                  pkg.popular
                    ? 'border-[#002B49] shadow-xl ring-2 ring-[#002B49]/10'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#002B49] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#002B49]">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {pkg.desc}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#002B49]">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{pkg.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      + 18% GST • Stamp duty at actuals by state
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-900 mb-3">
                      Package Inclusions:
                    </p>
                    <ul className="space-y-2.5">
                      {pkg.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2 text-xs text-slate-700"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handlePlanClick(pkg.id)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      pkg.popular
                        ? 'bg-[#002B49] hover:bg-[#001D32] text-white shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQS ACCORDION
      ========================================================================= */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Legal Clarifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers regarding Partnership Firm Registration in India
              under the Indian Partnership Act, 1932.
            </p>
          </div>

          <div className="divide-y divide-slate-200 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)
                  }
                  className="w-full text-left flex justify-between items-center gap-4 cursor-pointer group"
                >
                  <span className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition">
                    {faq.q}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-900 transition">
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {openFaqIndex === idx && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          VIDEO MODAL
      ========================================================================= */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-[#002B49] mb-4">
              How Partnership Firm Registration Works in India
            </h3>
            <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center text-white">
              <div className="text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <p className="text-sm font-semibold">
                  Partnership Deed &amp; RoF Registration Masterclass
                </p>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Learn about profit-sharing ratio, Section 40(b) partner salary
                  limits, and state-wise Registrar of Firms (RoF) filings in 2
                  minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
