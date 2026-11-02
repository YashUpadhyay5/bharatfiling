import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  PlayCircle,
  MessageSquare,
  Building2,
  Users,
  Award,
  TrendingUp,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Check,
  Globe,
  HelpCircle,
  Briefcase,
  Lock,
  Star,
  User,
} from 'lucide-react';

import {
  PVT_LTD_HERO,
  PVT_LTD_TESTIMONIALS,
  TRUSTED_PARTNERS,
  WHY_PVT_LTD_BENEFITS,
  PVT_LTD_VS_OTHERS,
  DOCUMENTS_REQUIRED,
  SPICE_PLUS_PROCESS,
  PRICING_PACKAGES,
  FAQS,
} from './constants.js';

export default function PvtLtdLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Form state matching screenshot media_1793612966359_3ac84746.png
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [cityPincode, setCityPincode] = useState(
    initialData.cityPincode || 'Chennai, 600001'
  );
  const [language, setLanguage] = useState(initialData.language || 'English');
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates !== undefined
      ? initialData.whatsappUpdates
      : true
  );
  const [errors, setErrors] = useState({});

  // Testimonial slider state
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Active documents tab
  const [docTab, setDocTab] = useState('directors');

  // Lead form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!cityPincode.trim()) {
      newErrors.cityPincode = 'Please enter your city or pincode';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (onSubmitLead) {
      onSubmitLead({
        email: email.trim(),
        phone: cleanPhone,
        cityPincode: cityPincode.trim(),
        language,
        whatsappUpdates,
      });
    }
  };

  const currentTestimonial = PVT_LTD_TESTIMONIALS[testimonialIdx];

  return (
    <div className="bg-white text-slate-800 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* -------------------------------------------------------------
          HERO SECTION (1:1 with media_1793612966359_3ac84746.png)
      ------------------------------------------------------------- */}
      <section className="relative pt-6 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs (1:1 with screenshot) */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-1.5 text-xs text-slate-500 mb-6 flex-wrap"
          >
            <Link to="/" className="hover:text-blue-700 transition">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to="/services" className="hover:text-blue-700 transition">
              Company Registration
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-600 font-medium">
              Private Limited Company Registration
            </span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-bold">Chennai</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: Hero content & Testimonial Slider */}
            <div className="lg:col-span-7 space-y-6">
              {/* ISO 27001 Certification Badge (1:1 with screenshot) */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight">
                  {PVT_LTD_HERO.badge}
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 leading-tight tracking-tight">
                  {PVT_LTD_HERO.title} <br className="hidden sm:inline" />
                  <span className="text-slate-900">Chennai</span>
                </h1>
              </div>

              {/* 3 Tickmark Value Bullets (1:1 with screenshot) */}
              <div className="space-y-3 pt-1">
                {PVT_LTD_HERO.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                    <div className="w-4 h-4 text-blue-900 mt-1 shrink-0">
                      <Check className="w-4 h-4 stroke-[2.8]" />
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Quick Guide Link (1:1 with screenshot) */}
              <div className="pt-1">
                <a
                  href="#about-pvt-ltd"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-800 hover:underline transition"
                >
                  <PlayCircle className="w-4 h-4 text-[#002B49] fill-blue-50" />
                  <span>{PVT_LTD_HERO.quickGuideLinkText}</span>
                </a>
              </div>

              {/* Testimonial Slider Card (1:1 with media_1793612966359_3ac84746.png) */}
              <div className="pt-4 max-w-xl">
                <div className="rounded-2xl border border-slate-300 bg-white p-5 sm:p-6 shadow-2xs space-y-4 relative">
                  <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed italic">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 pt-1 border-t border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {currentTestimonial.author}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-normal">
                        {currentTestimonial.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center gap-1.5 mt-3 px-1">
                  {PVT_LTD_TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => setTestimonialIdx(i)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${
                        testimonialIdx === i
                          ? 'w-6 bg-[#002B49]'
                          : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Lead Capture Form Card (1:1 with screenshot) */}
            <div className="lg:col-span-5 relative">
              {/* Diwali Festive Sale Offer Banner */}
              <div className="flex justify-end -mb-3 relative z-10 mr-6">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-t-lg bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[11px] font-bold shadow-xs">
                  <span>🪔</span>
                  <span>{PVT_LTD_HERO.festiveBadge}</span>
                </div>
              </div>

              {/* Form Card Container */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_15px_35px_rgba(15,23,42,0.08)] p-6 sm:p-8 relative">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 text-center mb-6">
                  Register Your Pvt Ltd Company
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label htmlFor="pvt-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="pvt-email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/20 focus:outline-none text-sm text-slate-900 placeholder:text-slate-400 transition"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="pvt-phone" className="sr-only">
                      Mobile Number
                    </label>
                    <input
                      id="pvt-phone"
                      type="tel"
                      placeholder="Mobile Number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: null });
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/20 focus:outline-none text-sm text-slate-900 placeholder:text-slate-400 transition"
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* City / Pincode */}
                  <div>
                    <label htmlFor="pvt-city" className="sr-only">
                      City/Pincode
                    </label>
                    <input
                      id="pvt-city"
                      type="text"
                      placeholder="City/Pincode"
                      value={cityPincode}
                      onChange={(e) => {
                        setCityPincode(e.target.value);
                        if (errors.cityPincode)
                          setErrors({ ...errors, cityPincode: null });
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/20 focus:outline-none text-sm text-slate-900 placeholder:text-slate-400 transition"
                    />
                    {errors.cityPincode && (
                      <p className="text-xs text-rose-600 mt-1">
                        {errors.cityPincode}
                      </p>
                    )}
                  </div>

                  {/* Language Dropdown */}
                  <div className="relative">
                    <label htmlFor="pvt-lang" className="sr-only">
                      Language
                    </label>
                    <select
                      id="pvt-lang"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-[#002B49]/20 focus:outline-none text-sm text-slate-800 bg-white appearance-none cursor-pointer pr-10"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi (हिंदी)</option>
                      <option value="Tamil">Tamil (தமிழ்)</option>
                      <option value="Telugu">Telugu (తెలుగు)</option>
                      <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                      <option value="Marathi">Marathi (मराठी)</option>
                      <option value="Bengali">Bengali (বাংলা)</option>
                      <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>

                  {/* WhatsApp Updates Toggle (1:1 with screenshot) */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                      <span>Get easy updates through</span>
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <MessageSquare className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                        Whatsapp
                      </span>
                    </span>

                    <button
                      type="button"
                      aria-label="Toggle WhatsApp updates"
                      onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        whatsappUpdates ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          whatsappUpdates ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white text-base font-bold shadow-md hover:shadow-lg transition cursor-pointer"
                    >
                      Get Started
                    </button>
                  </div>
                </form>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>ISO 27001 Certified • Bank-Grade 256-Bit SSL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          TRUSTED PARTNERS
      ------------------------------------------------------------- */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#002B49] tracking-tight mb-2">
            Trusted Partners
          </h2>
          <div className="w-12 h-0.5 bg-[#002B49] mx-auto mb-8" />

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 items-center">
            {TRUSTED_PARTNERS.map((p, idx) => (
              <div
                key={idx}
                className="h-14 px-4 bg-slate-50/80 rounded-xl border border-slate-100 flex items-center justify-center hover:shadow-xs transition"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-8 max-w-[110px] object-contain opacity-80 hover:opacity-100 transition"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'inline';
                  }}
                />
                <span className="hidden text-xs font-bold text-slate-600">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          WHY REGISTER A PRIVATE LIMITED COMPANY? (BENEFITS)
      ------------------------------------------------------------- */}
      <section id="about-pvt-ltd" className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-900 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Corporate Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Why 90%+ High-Growth Startups Choose Private Limited
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              A Private Limited Company offers the highest level of legal
              protection, corporate credibility, and investor compatibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_PVT_LTD_BENEFITS.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                  {i === 0 && <ShieldCheck className="w-5 h-5" />}
                  {i === 1 && <Building2 className="w-5 h-5" />}
                  {i === 2 && <TrendingUp className="w-5 h-5" />}
                  {i === 3 && <Award className="w-5 h-5" />}
                  {i === 4 && <Sparkles className="w-5 h-5" />}
                  {i === 5 && <Globe className="w-5 h-5" />}
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          PVT LTD VS LLP VS OPC VS SOLE PROPRIETORSHIP
      ------------------------------------------------------------- */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pvt Ltd vs LLP vs OPC vs Sole Proprietorship
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Compare India’s most common business structures side by side to
              choose the perfect model for your venture.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-bold text-slate-800">Key Feature</th>
                  <th className="p-4 font-bold text-blue-900 bg-blue-50/60">
                    Private Limited Company
                  </th>
                  <th className="p-4 font-bold text-slate-800">
                    Limited Liability Partnership (LLP)
                  </th>
                  <th className="p-4 font-bold text-slate-800">
                    One Person Company (OPC)
                  </th>
                  <th className="p-4 font-bold text-slate-800">
                    Sole Proprietorship
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PVT_LTD_VS_OTHERS.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-semibold text-slate-900">
                      {row.parameter}
                    </td>
                    <td className="p-4 font-bold text-blue-900 bg-blue-50/30">
                      {row.pvtLtd}
                    </td>
                    <td className="p-4 text-slate-600">{row.llp}</td>
                    <td className="p-4 text-slate-600">{row.opc}</td>
                    <td className="p-4 text-slate-600">{row.soleProp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          DOCUMENTS REQUIRED FOR PVT LTD
      ------------------------------------------------------------- */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-blue-900 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Checklist
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Documents Required for Pvt Ltd Company Incorporation
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything is processed 100% online. Simply upload clean scanned
              copies of the following proofs.
            </p>
          </div>

          {/* Document Tabs */}
          <div className="flex justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => setDocTab('directors')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                docTab === 'directors'
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Directors &amp; Shareholders
            </button>
            <button
              type="button"
              onClick={() => setDocTab('office')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                docTab === 'office'
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Registered Office Proof
            </button>
            <button
              type="button"
              onClick={() => setDocTab('nri')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                docTab === 'nri'
                  ? 'bg-[#002B49] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              NRI / Foreign Nationals
            </button>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            <div className="space-y-4">
              {docTab === 'directors' &&
                DOCUMENTS_REQUIRED.directors.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {doc}
                    </span>
                  </div>
                ))}

              {docTab === 'office' &&
                DOCUMENTS_REQUIRED.registeredOffice.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {doc}
                    </span>
                  </div>
                ))}

              {docTab === 'nri' &&
                DOCUMENTS_REQUIRED.nriForeignDirectors.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-medium">
                      {doc}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          STEP-BY-STEP SPICE+ INCORPORATION PROCESS
      ------------------------------------------------------------- */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-900 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              MCA Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              How BharatFiling Incorporates Your Pvt Ltd Company
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Fast-tracked 4-stage MCA SPICe+ process handled entirely by
              experienced Chartered Accountants and Company Secretaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPICE_PLUS_PROCESS.map((st, i) => (
              <div
                key={i}
                className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200 relative group hover:bg-white hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-blue-900/40 group-hover:text-blue-900 transition">
                    {st.step}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                    {st.days}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          TRANSPARENT PRICING PACKAGES
      ------------------------------------------------------------- */}
      <section id="pricing" className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-900 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Pricing Plans
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Transparent, All-Inclusive Incorporation Packages
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              No hidden fees. Government fees on nominal share capital and RoC
              statutory stamp duty apply transparently at actuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-8 flex flex-col justify-between transition relative bg-white ${
                  pkg.popular
                    ? 'border-2 border-[#002B49] shadow-xl ring-2 ring-[#002B49]/10'
                    : 'border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#002B49] text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-sm">
                      ★ Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">
                      {pkg.name}
                    </h3>
                    <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full">
                      {pkg.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {pkg.desc}
                  </p>

                  <div className="mt-6 mb-6">
                    <div className="text-xs text-rose-500 line-through">
                      ₹{pkg.originalPrice.toLocaleString('en-IN')}
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        + Govt. Fee
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPlan) onSelectPlan(pkg.id);
                    }}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#002B49] hover:bg-[#001D32] text-white shadow'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {pkg.ctaText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          FREQUENTLY ASKED QUESTIONS
      ------------------------------------------------------------- */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything you need to know about registering a Private Limited
              Company in India.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 overflow-hidden bg-white"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === idx ? -1 : idx)
                  }
                  className="w-full text-left p-5 flex items-center justify-between text-sm sm:text-base font-bold text-slate-900 hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      expandedFaq === idx ? 'rotate-180 text-blue-900' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
