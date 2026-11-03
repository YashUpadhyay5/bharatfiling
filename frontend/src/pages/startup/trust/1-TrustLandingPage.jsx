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
  CreditCard,
  Landmark,
} from 'lucide-react';
import {
  TRUST_HERO,
  TRUSTED_PARTNERS,
  TRUST_TESTIMONIALS,
  REGISTERED_VS_UNREGISTERED,
  ALL_INDIA_STATES,
  DEED_ESSENTIAL_CLAUSES,
  DOCUMENTS_REQUIRED,
  REGISTRATION_PROCESS_STEPS,
  BUNDLED_PLANS,
  FAQS,
} from './constants.js';

export default function TrustLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Form State matching Partnership landing page
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
  const [selectedStateCode, setSelectedStateCode] = useState('DL');

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
        (prev) => (prev + 1) % TRUST_TESTIMONIALS.length
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
          HERO SECTION (1:1 with Partnership UI)
      ========================================================================= */}
      <section className="relative pt-6 pb-14 bg-gradient-to-b from-slate-50/90 via-white to-white overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
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
              Trust Registration
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN: Hero Copy, Trust Badges, Stats & Testimonials */}
            <div className="lg:col-span-7 space-y-6">
              {/* ISO Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>{TRUST_HERO.badge}</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#002B49] tracking-tight leading-[1.15]">
                  {TRUST_HERO.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Start your Public Charitable or Religious Trust online with airtight
                  deed drafting, Sub-Registrar execution, and 12A/80G tax benefits.
                </p>
              </div>

              {/* 3 Value Bullets */}
              <div className="space-y-2.5 pt-1">
                {TRUST_HERO.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Video Modal + Pricing Anchor */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#002B49] hover:text-blue-900 transition group cursor-pointer"
                >
                  <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 group-hover:scale-105 transition shadow-2xs">
                    <Play className="w-4 h-4 fill-[#002B49] ml-0.5" />
                  </span>
                  <span className="underline underline-offset-4 decoration-slate-300">
                    Know about Trust Registration (2 mins)
                  </span>
                </button>

                <a
                  href="#pricing-section"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>View All 3 Plans (From ₹4,999)</span>
                </a>
              </div>

              {/* Trust Stats Strip */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-100">
                {TRUST_HERO.stats.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-center"
                  >
                    <span className="block text-base sm:text-lg font-black text-[#002B49]">
                      {st.value}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Live Testimonial Carousel Box */}
              <div className="pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(TRUST_TESTIMONIALS[currentTestimonialIndex].rating)].map(
                        (_, i) => (
                          <span key={i} className="text-amber-400 text-sm">
                            ★
                          </span>
                        )
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      Verified Client Review
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    &ldquo;{TRUST_TESTIMONIALS[currentTestimonialIndex].quote}&rdquo;
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={TRUST_TESTIMONIALS[currentTestimonialIndex].avatar}
                        alt={TRUST_TESTIMONIALS[currentTestimonialIndex].author}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {TRUST_TESTIMONIALS[currentTestimonialIndex].author}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {TRUST_TESTIMONIALS[currentTestimonialIndex].title}
                        </p>
                      </div>
                    </div>

                    {/* Carousel Dots */}
                    <div className="flex items-center gap-1.5">
                      {TRUST_TESTIMONIALS.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setCurrentTestimonialIndex(dotIdx)}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            currentTestimonialIndex === dotIdx
                              ? 'w-5 bg-[#002B49]'
                              : 'bg-slate-200 hover:bg-slate-300'
                          }`}
                          aria-label={`Slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Lead Generation Form Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 sm:p-8 relative overflow-visible">
                {/* Diwali Festive Sale Badge on top-right */}
                <div className="absolute -top-3.5 right-6 bg-[#FFD200] text-slate-950 font-extrabold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <span>🪔</span>
                  <span>{TRUST_HERO.festiveBadge}</span>
                </div>

                <div className="mb-6 pt-1">
                  <h3 className="text-lg sm:text-xl font-bold text-[#002B49] tracking-tight">
                    Register Your Trust
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fast-track online application for Public Charitable &amp; Religious Trusts
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="e.g. founder@mycharity.org"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                        formErrors.email
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-300 focus:border-[#002B49] focus:ring-blue-100'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-xs font-semibold">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="98765 43210"
                        className={`w-full px-3.5 py-2.5 rounded-r-lg border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                          formErrors.phone
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-300 focus:border-[#002B49] focus:ring-blue-100'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* City/Pincode Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / Pincode <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.cityPincode}
                      onChange={(e) =>
                        setFormData({ ...formData, cityPincode: e.target.value })
                      }
                      placeholder="e.g. New Delhi, 110001"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                        formErrors.cityPincode
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-300 focus:border-[#002B49] focus:ring-blue-100'
                      }`}
                    />
                    {formErrors.cityPincode && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">
                        {formErrors.cityPincode}
                      </p>
                    )}
                  </div>

                  {/* Language Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Language
                    </label>
                    <div className="relative">
                      <select
                        value={formData.language}
                        onChange={(e) =>
                          setFormData({ ...formData, language: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm bg-white text-slate-800 appearance-none focus:outline-none focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 cursor-pointer"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi (हिंदी)</option>
                        <option value="Marathi">Marathi (मराठी)</option>
                        <option value="Tamil">Tamil (தமிழ்)</option>
                        <option value="Telugu">Telugu (తెలుగు)</option>
                        <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                        <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* WhatsApp Opt-In Toggle */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                      <span>Get easy updates through</span>
                      <strong className="text-emerald-700 font-bold">WhatsApp</strong>
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
                        formData.whatsappUpdates ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          formData.whatsappUpdates ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Primary CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Micro Security Footnote */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1 font-medium">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    <span>100% Privacy Protected</span>
                  </div>
                  <div className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                    <span>Advocate Assisted</span>
                  </div>
                  <div className="flex items-center gap-1 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>15K+ Trusts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUSTED BY PARTNERS STRIP
      ========================================================================= */}
      <section className="py-7 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
            Trusted by Non-Profit Founders, Donors &amp; Banking Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-80">
            {TRUSTED_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center h-8 px-2 transition hover:opacity-100"
                title={partner.name}
              >
                <span className="font-extrabold text-sm sm:text-base text-slate-600 tracking-tight">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: REGISTERED VS UNREGISTERED TRUST
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full mb-2">
              Legal Recourse &amp; Tax Status
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Registered vs. Unregistered Trust
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Why registering your trust deed before the Sub-Registrar of Assurances
              is critical for tax exemptions and institutional banking.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200/90 shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#002B49] text-white">
                  <th className="py-3.5 px-5 font-bold uppercase tracking-wider text-xs">
                    Legal Metric
                  </th>
                  <th className="py-3.5 px-5 font-bold uppercase tracking-wider text-xs bg-blue-900/90 text-[#FFD200]">
                    Registered Trust (With Sub-Registrar) 🌟
                  </th>
                  <th className="py-3.5 px-5 font-bold uppercase tracking-wider text-xs">
                    Unregistered Trust
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {REGISTERED_VS_UNREGISTERED.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                  >
                    <td className="py-3.5 px-5 font-semibold text-slate-800 text-xs sm:text-sm">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-blue-950 bg-blue-50/60 border-x border-blue-100 text-xs sm:text-sm">
                      {row.registered}
                    </td>
                    <td className="py-3.5 px-5 text-xs sm:text-sm">
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
          SECTION 3: ESSENTIAL CLAUSES IN A TRUST DEED
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-3 py-1 rounded-full mb-2">
              Legal Integrity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Essential Clauses in a Legal Trust Deed
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Our High Court advocates draft custom clauses safeguarding your welfare
              mission, trustee powers, and tax exemption eligibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEED_ESSENTIAL_CLAUSES.map((clause, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5 text-blue-800" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {clause.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {clause.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: STATE-BY-STATE REGISTRATION GUIDE
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full mb-2">
              Pan-India Jurisdiction
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              State-Wise Trust Registration Requirements
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Every state in India follows local Sub-Registrar stamp duty and Charity
              Commissioner rules. Select your state below to inspect local filing norms.
            </p>
          </div>

          {/* State Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {ALL_INDIA_STATES.map((state) => (
              <button
                key={state.code}
                type="button"
                onClick={() => setSelectedStateCode(state.code)}
                className={`py-2 px-3.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedStateCode === state.code
                    ? 'bg-[#002B49] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {state.name}
              </button>
            ))}
          </div>

          {/* Active State Detail Card */}
          <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                  {activeStateObj.code} State Jurisdiction
                </span>
                <h3 className="text-xl font-extrabold text-[#002B49] mt-1">
                  {activeStateObj.name} Trust Registration
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                Authority: {activeStateObj.authority}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">
                  Stamp Duty &amp; Stamping Norms:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {activeStateObj.stampDutyNote}
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">
                  Special State Execution Rule:
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {activeStateObj.specialReq}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DOCUMENTS REQUIRED (TABBED)
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-3 py-1 rounded-full mb-2">
              Simple Documentation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Documents Required for Trust Registration
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Only basic identity proofs of trustees and address proof of the registered
              office are needed. We draft the entire legal deed for you.
            </p>
          </div>

          {/* Document Tabs */}
          <div className="flex justify-center mb-8 border-b border-slate-200">
            <div className="inline-flex space-x-2 sm:space-x-6">
              {DOCUMENTS_REQUIRED.map((cat, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveDocTab(idx)}
                  className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                    activeDocTab === idx
                      ? 'border-[#002B49] text-[#002B49]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DOCUMENTS_REQUIRED[activeDocTab].items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70 flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: 5-STEP REGISTRATION PROCESS
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full mb-2">
              Fast-Track Timeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              5-Step Trust Registration Process
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Coordinated end-to-end by senior High Court advocates and NGO compliance
              consultants within 7 to 10 working days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {REGISTRATION_PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-blue-900/30">
                      {step.step}
                    </span>
                    <span className="inline-block text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded-full">
                      {step.days}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: PRICING PACKAGES
      ========================================================================= */}
      <section id="pricing-section" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/70 px-3 py-1 rounded-full mb-2">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Select Your Trust Registration Package
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500">
              Fixed advocate fees, clear government stamp duty guidelines, and zero
              surprise charges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {BUNDLED_PLANS.map((pkg) => {
              const isDark = pkg.theme === 'dark';

              return (
                <div
                  key={pkg.id}
                  className={`rounded-2xl p-7 flex flex-col justify-between transition-all relative ${
                    isDark
                      ? 'bg-[#0B2545] text-white border-2 border-[#0B2545] shadow-xl md:-translate-y-2'
                      : 'bg-white text-slate-800 border border-slate-200/90 shadow-xs hover:border-slate-300'
                  }`}
                >
                  {pkg.recommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFD200] text-slate-950 font-black text-[11px] px-3.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                      {pkg.badge || 'Recommended'}
                    </div>
                  )}

                  <div>
                    <div className="mb-4">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {pkg.name}
                      </span>
                      <p
                        className={`text-xs mt-1 leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {pkg.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs line-through ${
                          isDark ? 'text-slate-400' : 'text-rose-500'
                        }`}
                      >
                        ₹{pkg.originalPrice.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDark
                            ? 'bg-emerald-500 text-white'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {pkg.discount}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-2 mb-1">
                      <span
                        className={`text-3xl sm:text-4xl font-extrabold ${
                          isDark ? 'text-white' : 'text-[#002B49]'
                        }`}
                      >
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {pkg.govtFeeNote || '+ Govt. Fee'}
                      </span>
                    </div>

                    <div className="text-[11px] font-medium text-slate-400 mb-6">
                      {pkg.emiText}
                    </div>

                    <div
                      className={`space-y-3 pt-4 border-t mb-8 ${
                        isDark ? 'border-white/10' : 'border-slate-100'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        What&apos;s Included:
                      </span>
                      {pkg.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm"
                        >
                          <Check
                            className={`w-4 h-4 shrink-0 mt-0.5 stroke-[2.5] ${
                              isDark ? 'text-[#FFD200]' : 'text-emerald-600'
                            }`}
                          />
                          <span
                            className={`leading-snug ${
                              isDark ? 'text-slate-200' : 'text-slate-700'
                            }`}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlanClick(pkg.id)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isDark
                        ? 'bg-[#FFD200] hover:bg-[#FACC15] text-slate-950 shadow-md hover:shadow-lg'
                        : 'bg-[#002B49] hover:bg-[#001D32] text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    <span>Get Started</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Guarantee Banner (1:1 with media_1793438026631_c42a93b3.png) */}
          <div className="mt-8 bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Money-Back Guarantee if rejected on technical grounds</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>Secure 256-bit Encrypted Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-600" />
              <span>UPI, Debit/Credit Cards &amp; Net Banking Accepted</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FAQS ACCORDION
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full mb-2">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Frequently Asked Questions on Trust Registration
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-xl border border-slate-200/80 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 cursor-pointer hover:bg-slate-100/50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaqIndex === idx ? 'rotate-180 text-blue-800' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          VIDEO GUIDE MODAL
      ========================================================================= */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              How Trust Registration Works in India
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Watch our senior legal consultant explain Trust Deed drafting, Sub-Registrar
              stamping, and 12A/80G tax exemptions in 2 minutes.
            </p>
            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center text-white">
              <iframe
                title="Trust Registration Guide"
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
