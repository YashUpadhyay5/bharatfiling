import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  Star,
  ChevronDown,
  ShieldCheck,
  Building2,
  Clock,
  Award,
  ArrowRight,
  Play,
  X,
  FileText,
  Landmark,
  HeartHandshake,
  GraduationCap,
  Scale,
  Users,
  CreditCard,
  Stamp,
  PhoneCall,
  Sparkles,
  Lock,
} from 'lucide-react';
import {
  TRUST_HERO,
  TRUSTED_PARTNERS,
  TRUST_TESTIMONIALS,
  TRUST_TYPES,
  TRUST_VS_SOCIETY_VS_SECTION8,
  REGISTRATION_ROUTES,
  DOCUMENTS_REQUIRED,
  REGISTRATION_PROCESS_STEPS,
  PRICING_PACKAGES,
  FAQS,
} from './constants.js';

export default function TrustLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  const [leadForm, setLeadForm] = useState({
    email: initialData.email || '',
    phone: initialData.phone || '',
    cityPincode: initialData.cityPincode || '',
    language: initialData.language || 'English',
    whatsappUpdates: initialData.whatsappUpdates ?? true,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [activeDocTab, setActiveDocTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const handleInputChange = (field, value) => {
    setLeadForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateLead = () => {
    const errors = {};
    if (!leadForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!leadForm.phone || !/^\+?[0-9\s-]{10,14}$/.test(leadForm.phone.trim())) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!leadForm.cityPincode || leadForm.cityPincode.trim().length < 3) {
      errors.cityPincode = 'Please enter your city or pincode';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (validateLead()) {
      if (onSubmitLead) {
        onSubmitLead(leadForm);
      }
    }
  };

  const currentTestimonial = TRUST_TESTIMONIALS[testimonialIdx];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      {/* -------------------------------------------------------------
          HERO & LEAD CAPTURE SECTION (1:1 VAKILSEARCH DESIGN)
      ------------------------------------------------------------- */}
      <section className="relative pt-6 pb-16 bg-gradient-to-b from-[#F8FAFC] via-white to-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-blue-700 transition">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <Link to="/services" className="hover:text-blue-700 transition">
              NGO &amp; Non-Profit
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 font-medium">Trust Registration</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-bold">India</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Hero Content, Video Trigger & Testimonial */}
            <div className="lg:col-span-7 space-y-6">
              {/* ISO 27001 Certified Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight">
                  {TRUST_HERO.badge}
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1528] tracking-tight leading-[1.18]">
                  {TRUST_HERO.title}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-600">
                  Establish your Public Charitable or Religious Trust in India with
                  airtight trust deed drafting, Sub-Registrar execution, and Section
                  12A &amp; 80G tax exemptions.
                </p>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-3 pt-1 text-sm sm:text-base text-slate-700">
                {TRUST_HERO.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1 flex-shrink-0 text-blue-600">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons: Video Guide & Packages */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-800 transition cursor-pointer group"
                >
                  <span className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition">
                    <Play className="w-3.5 h-3.5 fill-blue-600 ml-0.5" />
                  </span>
                  <span className="underline underline-offset-4 decoration-blue-300">
                    Watch: How Trust Registration Works (2 mins)
                  </span>
                </button>

                <a
                  href="#pricing-section"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white px-3.5 py-1.5 rounded-md hover:bg-slate-50 transition shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Plans (from ₹4,999)</span>
                </a>
              </div>

              {/* Key Highlights Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
                {TRUST_HERO.stats.map((s, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50/80 rounded-xl p-3 text-center border border-slate-200/60"
                  >
                    <span className="text-base sm:text-lg font-black text-slate-900 block">
                      {s.value}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Live Testimonial Slider */}
              <div className="pt-2">
                <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm relative">
                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 stroke-amber-400"
                      />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-3">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.author}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {currentTestimonial.author}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {currentTestimonial.title}
                      </p>
                    </div>
                  </div>

                  {/* Dot navigation */}
                  <div className="flex items-center gap-1.5 mt-3 justify-end">
                    {TRUST_TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setTestimonialIdx(i)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          testimonialIdx === i
                            ? 'w-5 bg-blue-600'
                            : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: High-Converting Lead Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 sm:p-7 relative overflow-hidden">
                {/* Diwali Festive Offer Banner on Top Right */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-xs flex items-center gap-1">
                  <span>🪔</span>
                  <span>{TRUST_HERO.festiveBadge}</span>
                </div>

                <div className="mb-6 pt-2">
                  <h3 className="text-xl font-extrabold text-[#0B1528] tracking-tight">
                    Register Your Trust
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fast-track online application for Public Charitable &amp; Religious Trusts
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={leadForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="e.g. founder@mycharity.org"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                        formErrors.email
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-500 mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-xs font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={leadForm.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="98765 43210"
                        className={`w-full px-3.5 py-2.5 rounded-r-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                          formErrors.phone
                            ? 'border-rose-400 focus:ring-rose-200'
                            : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* City or Pincode */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / Pincode <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={leadForm.cityPincode}
                      onChange={(e) =>
                        handleInputChange('cityPincode', e.target.value)
                      }
                      placeholder="e.g. New Delhi, 110001"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                        formErrors.cityPincode
                          ? 'border-rose-400 focus:ring-rose-200'
                          : 'border-slate-300 focus:border-blue-600 focus:ring-blue-100'
                      }`}
                    />
                    {formErrors.cityPincode && (
                      <p className="text-[11px] text-rose-500 mt-1">
                        {formErrors.cityPincode}
                      </p>
                    )}
                  </div>

                  {/* Preferred Language */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Consultation Language
                    </label>
                    <div className="relative">
                      <select
                        value={leadForm.language}
                        onChange={(e) =>
                          handleInputChange('language', e.target.value)
                        }
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-800 bg-white appearance-none focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer"
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
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* WhatsApp Opt-in */}
                  <div className="flex items-center justify-between pt-1">
                    <label
                      htmlFor="trust-wa-opt"
                      className="text-xs text-slate-600 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="text-emerald-600 font-bold">WhatsApp</span>
                      <span>Get easy updates on WhatsApp</span>
                    </label>
                    <input
                      id="trust-wa-opt"
                      type="checkbox"
                      checked={leadForm.whatsappUpdates}
                      onChange={(e) =>
                        handleInputChange('whatsappUpdates', e.target.checked)
                      }
                      className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl bg-[#002244] hover:bg-[#00172e] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Micro Trust Indicators */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Confidential</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-blue-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Advocate Assisted</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>15K+ Registered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          TRUSTED PARTNERS STRIP
      ------------------------------------------------------------- */}
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

      {/* -------------------------------------------------------------
          TYPES OF TRUSTS IN INDIA
      ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
              Entity Classifications
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Types of Trusts You Can Register
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Select the optimal trust category based on your beneficiaries,
              philanthropic goals, and tax exemption roadmap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_TYPES.map((t) => (
              <div
                key={t.id}
                className="bg-slate-50/60 rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {t.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {t.minTrustees}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          TRUST VS SOCIETY VS SECTION 8 COMPARISON TABLE
      ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full mb-3">
              NGO Comparison Guide
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Trust vs. Society vs. Section 8 Company
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Compare the three non-profit structures in India to make an informed
              legal decision for your organization.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#002244] text-white">
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">
                    Legal Metric
                  </th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs bg-blue-900/90 text-amber-300">
                    Public Trust 🌟
                  </th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">
                    Society (1860 Act)
                  </th>
                  <th className="py-4 px-5 font-bold uppercase tracking-wider text-xs">
                    Section 8 Company
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {TRUST_VS_SOCIETY_VS_SECTION8.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                  >
                    <td className="py-3.5 px-5 font-semibold text-slate-800 text-xs sm:text-sm">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-blue-950 bg-blue-50/60 border-x border-blue-100 text-xs sm:text-sm">
                      {row.trust}
                    </td>
                    <td className="py-3.5 px-5 text-xs sm:text-sm">{row.society}</td>
                    <td className="py-3.5 px-5 text-xs sm:text-sm">{row.section8}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          DOCUMENTS REQUIRED CHECKLIST (TABBED)
      ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
              Simple Documentation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Documents Required for Trust Registration
            </h2>
            <p className="mt-3 text-sm text-slate-600">
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
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DOCUMENTS_REQUIRED[activeDocTab].items.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
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

      {/* -------------------------------------------------------------
          4-STEP REGISTRATION PROCESS ROADMAP
      ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full mb-3">
              Fast-Track Timeline
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              4-Step Trust Registration Process
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Coordinated end-to-end by senior High Court advocates and NGO compliance
              consultants within 7 to 10 working days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REGISTRATION_PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-blue-600/30">
                      {step.step}
                    </span>
                    <span className="inline-block text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                      {step.days}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
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

      {/* -------------------------------------------------------------
          PRICING PACKAGES (STARTING AT ₹4,999)
      ------------------------------------------------------------- */}
      <section id="pricing-section" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Select Your Trust Registration Package
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Fixed advocate fees, clear government stamp duty guidelines, and zero
              surprise charges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all relative ${
                  pkg.popular
                    ? 'border-2 border-blue-600 bg-white shadow-xl shadow-blue-600/10'
                    : 'border border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {pkg.name}
                    </span>
                    <p className="text-xs text-slate-500 mt-1">{pkg.desc}</p>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0B1528]">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{pkg.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      + Govt. Fee
                    </span>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100 mb-8">
                    {pkg.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                      >
                        <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlan && onSelectPlan(pkg.id)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{pkg.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          FREQUENTLY ASKED QUESTIONS
      ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full mb-3">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1528] tracking-tight">
              Frequently Asked Questions on Trust Registration
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 cursor-pointer hover:bg-slate-50/50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          VIDEO GUIDE MODAL
      ------------------------------------------------------------- */}
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
              Watch our senior NGO attorney explain Trust Deed drafting, Sub-Registrar
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
