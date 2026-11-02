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
  ArrowLeftRight,
  Percent,
  Gift,
  Sprout,
  Tractor,
} from 'lucide-react';

import {
  PRODUCER_COMPANY_HERO,
  PRODUCER_COMPANY_TESTIMONIALS,
  TRUSTED_PARTNERS,
  WHY_PRODUCER_COMPANY_BENEFITS,
  PRODUCER_VS_OTHERS,
  DOCUMENTS_REQUIRED,
  SPICE_PLUS_PROCESS,
  PRICING_PACKAGES,
  FAQS,
} from './constants.js';

export default function ProducerCompanyLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Form state
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [cityPincode, setCityPincode] = useState(
    initialData.cityPincode || 'Nagpur, 440001'
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
  const [docTab, setDocTab] = useState('producerMembers');

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
      newErrors.cityPincode = 'Please enter your city, district or pincode';
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

  const currentTestimonial = PRODUCER_COMPANY_TESTIMONIALS[testimonialIdx];

  return (
    <div className="bg-white text-slate-800 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* -------------------------------------------------------------
          HERO SECTION
      ------------------------------------------------------------- */}
      <section className="relative pt-6 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-slate-50/50 to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-1.5 text-xs text-slate-500 mb-6 flex-wrap"
          >
            <Link to="/" className="hover:text-emerald-700 transition">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link to="/services" className="hover:text-emerald-700 transition">
              Company Registration
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-600 font-medium">
              Producer Company (FPO) Registration
            </span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-900 font-bold">India</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: Hero content & Testimonial Slider */}
            <div className="lg:col-span-7 space-y-6">
              {/* ISO 27001 Certification Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-2xs">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight">
                  {PRODUCER_COMPANY_HERO.badge}
                </span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1528] tracking-tight leading-[1.18]">
                  {PRODUCER_COMPANY_HERO.title} <br />
                  <span className="text-emerald-700">
                    {PRODUCER_COMPANY_HERO.subtitleSuffix}
                  </span>
                </h1>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3.5 pt-1 text-sm sm:text-base text-slate-700">
                {PRODUCER_COMPANY_HERO.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1 flex-shrink-0 text-emerald-600">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#why-producer-company"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition"
                >
                  <PlayCircle className="w-4 h-4 text-emerald-600" />
                  <span className="underline underline-offset-4 decoration-emerald-300">
                    {PRODUCER_COMPANY_HERO.quickGuideLinkText}
                  </span>
                </a>

                <a
                  href="#pricing-section"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white px-3.5 py-1.5 rounded-md hover:bg-slate-50 transition shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Packages</span>
                </a>
              </div>

              {/* Live Testimonial Card */}
              <div className="pt-4">
                <div className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-sm relative">
                  <div className="flex items-center gap-1 text-amber-400 mb-2.5">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 stroke-amber-400"
                      />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-4">
                    "{currentTestimonial.quote}"
                  </p>

                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="text-xs leading-tight">
                      <span className="font-bold text-slate-900 block">
                        {currentTestimonial.author}
                      </span>
                      <span className="text-slate-500">
                        {currentTestimonial.role} &bull; {currentTestimonial.city}
                      </span>
                    </div>
                  </div>

                  {/* Slider Pagination Dots */}
                  <div className="flex items-center justify-center gap-2 mt-4 pt-2">
                    {PRODUCER_COMPANY_TESTIMONIALS.map((t, idx) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTestimonialIdx(idx)}
                        aria-label={`Show testimonial ${idx + 1}`}
                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                          idx === testimonialIdx
                            ? 'bg-emerald-600 w-6'
                            : 'bg-slate-200 hover:bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Lead Capture Form Card */}
            <div className="lg:col-span-5 relative">
              {/* Festive Sale Offer Badge */}
              <div className="absolute -top-3.5 right-6 z-10 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{PRODUCER_COMPANY_HERO.festiveBadge}</span>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xl shadow-slate-200/50 relative">
                <div className="mb-5 pt-1">
                  <h2 className="text-xl font-extrabold text-[#0B1528] tracking-tight">
                    Register Your Producer Company
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect with dedicated Agri-Business CS & Legal Experts in 10 mins
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. kisan.agro@gmail.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.email
                          ? 'border-red-400 bg-red-50/20'
                          : 'border-slate-300 focus:border-emerald-600'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-xs font-medium text-slate-500">
                        +91
                      </div>
                      <input
                        type="tel"
                        maxLength="10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit number"
                        className={`w-full pl-12 pr-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          errors.phone
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-slate-300 focus:border-emerald-600'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* City / District / Pincode */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / District / Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={cityPincode}
                      onChange={(e) => setCityPincode(e.target.value)}
                      placeholder="e.g. Nagpur, 440001"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.cityPincode
                          ? 'border-red-400 bg-red-50/20'
                          : 'border-slate-300 focus:border-emerald-600'
                      }`}
                    />
                    {errors.cityPincode && (
                      <p className="text-xs text-red-600 mt-1">
                        {errors.cityPincode}
                      </p>
                    )}
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Language
                    </label>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 transition pr-9"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">हिंदी (Hindi)</option>
                        <option value="Marathi">मराठी (Marathi)</option>
                        <option value="Punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
                        <option value="Telugu">తెలుగు (Telugu)</option>
                        <option value="Tamil">தமிழ் (Tamil)</option>
                        <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                        <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                        <option value="Bengali">বাংলা (Bengali)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* WhatsApp Toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span>Get easy updates through</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                      </span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={whatsappUpdates}
                        onChange={(e) => setWhatsappUpdates(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-3 px-4 rounded-lg bg-[#002244] hover:bg-[#00172e] text-white font-bold text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Trust Micro-Badges */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>MCA & NABARD Experts</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <Tractor className="w-3.5 h-3.5 text-emerald-600" />
                    <span>10,000+ FPOs Assisted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          TRUSTED PARTNERS
      ------------------------------------------------------------- */}
      <section className="py-8 bg-slate-50/70 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
            Trusted by India’s Leading Agri-Businesses & Corporate Alliances
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all">
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
          WHY CHOOSE PRODUCER COMPANY (BENEFITS)
      ------------------------------------------------------------- */}
      <section id="why-producer-company" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3">
              Section 378A Statutory Privileges
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Why Form a Producer Company (FPO)?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Transform smallholder farmers, dairy producers, and artisans into a
              formidable corporate entity with corporate limited liability, zero
              tax on farm profits, and direct institutional funding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {WHY_PRODUCER_COMPANY_BENEFITS.map((benefit, idx) => {
              const icons = {
                percent: <Percent className="w-6 h-6 text-emerald-600" />,
                gift: <Gift className="w-6 h-6 text-emerald-600" />,
                'shield-check': <ShieldCheck className="w-6 h-6 text-emerald-600" />,
                users: <Users className="w-6 h-6 text-emerald-600" />,
                'trending-up': <TrendingUp className="w-6 h-6 text-emerald-600" />,
                building: <Building2 className="w-6 h-6 text-emerald-600" />,
              };

              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200/80 bg-white hover:border-emerald-300 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition">
                    {icons[benefit.icon] || (
                      <Sprout className="w-6 h-6 text-emerald-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          PRODUCER COMPANY VS COOPERATIVE VS PVT LTD VS LLP
      ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
              Comparative Analysis
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Producer Company vs Cooperative Society vs Private Limited
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Understand why India’s agricultural revolution and Ministry of
              Agriculture prioritize Producer Companies over traditional cooperatives.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-xs font-bold uppercase text-slate-700 tracking-wider">
                  <th className="py-4 px-5">Statutory Parameter</th>
                  <th className="py-4 px-5 text-emerald-700 bg-emerald-50/80 border-x border-emerald-200">
                    Producer Company (FPO)
                  </th>
                  <th className="py-4 px-5">Cooperative Society</th>
                  <th className="py-4 px-5">Private Limited Co.</th>
                  <th className="py-4 px-5">LLP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {PRODUCER_VS_OTHERS.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/60 transition ${
                      idx % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'
                    }`}
                  >
                    <td className="py-3.5 px-5 font-semibold text-slate-800 text-xs sm:text-sm">
                      {row.parameter}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-emerald-800 bg-emerald-50/50 border-x border-emerald-100 text-xs sm:text-sm">
                      {row.producerCo}
                    </td>
                    <td className="py-3.5 px-5 text-xs sm:text-sm">
                      {row.cooperative}
                    </td>
                    <td className="py-3.5 px-5 text-xs sm:text-sm">
                      {row.pvtLtd}
                    </td>
                    <td className="py-3.5 px-5 text-xs sm:text-sm">{row.llp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          DOCUMENTS REQUIRED CHECKLIST
      ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3">
              Checklist & Statutory Requirements
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Documents Required for Producer Company Registration
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Keep these scanned documents ready. Our specialized compliance team
              verifies patwari certificates and subscriber affidavits beforehand.
            </p>
          </div>

          {/* Document Category Tabs */}
          <div className="flex justify-center mb-8 border-b border-slate-200">
            <div className="inline-flex space-x-1 sm:space-x-3">
              <button
                type="button"
                onClick={() => setDocTab('producerMembers')}
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                  docTab === 'producerMembers'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                10+ Producer Members
              </button>
              <button
                type="button"
                onClick={() => setDocTab('directorsDscDin')}
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                  docTab === 'directorsDscDin'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                5+ Directors (DSC & DIN)
              </button>
              <button
                type="button"
                onClick={() => setDocTab('registeredOffice')}
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                  docTab === 'registeredOffice'
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Registered Office Proof
              </button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/80">
            <ul className="space-y-4 text-sm text-slate-700">
              {DOCUMENTS_REQUIRED[docTab]?.map((doc, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-2xs"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="leading-relaxed font-medium">{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          SPICE+ 4-STEP INCORPORATION PROCESS
      ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
              MCA SPICe+ Roadmap
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              4-Step Process to Incorporate Your Producer Company
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              From RUN name reservation to physical Digital Signatures, DINs, and
              Certificate of Incorporation delivered directly to your email.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPICE_PLUS_PROCESS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-emerald-600/30">
                      {step.step}
                    </span>
                    <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
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
          PRICING PACKAGES
      ------------------------------------------------------------- */}
      <section id="pricing-section" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3">
              Transparent Pricing Plans
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Select Your Producer Company Package
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              All plans include government-certified chartered accountants,
              customized Chapter XXIA drafting, and zero hidden markups.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all relative ${
                  pkg.popular
                    ? 'border-2 border-emerald-600 bg-white shadow-xl shadow-emerald-600/10'
                    : 'border border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
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
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPlan && onSelectPlan(pkg.id)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>{pkg.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
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
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full mb-3">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1528] tracking-tight">
              Frequently Asked Questions on Producer Company Registration
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Have questions regarding 10 producer members, 7/12 land records,
              tax exemptions, or SFAC grants? We have you covered.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-2xs transition"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === idx ? -1 : idx)
                  }
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                      expandedFaq === idx ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
