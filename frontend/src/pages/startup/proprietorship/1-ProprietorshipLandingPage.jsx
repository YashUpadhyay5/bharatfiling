import React, { useState } from 'react';
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
  DollarSign,
  CreditCard,
  Landmark,
  Percent,
  TrendingUp,
  Star,
  User,
} from 'lucide-react';
import {
  PROPRIETORSHIP_HERO,
  TRUSTED_PARTNERS,
  PROPRIETORSHIP_TESTIMONIALS,
  PROPRIETORSHIP_VS_OTHERS,
  REGISTRATION_ROUTES,
  ALL_INDIA_STATES,
  DOCUMENTS_REQUIRED,
  REGISTRATION_PROCESS_STEPS,
  PRICING_PACKAGES,
  BUNDLED_PLANS,
  FAQS,
} from './constants.js';

export default function ProprietorshipLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Form State
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

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Testimonial slider state
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const selectedState =
    ALL_INDIA_STATES.find((s) => s.code === selectedStateCode) ||
    ALL_INDIA_STATES[0];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    const cleanEmail = (formData.email || '').trim();
    if (!cleanEmail || !/\S+@\S+\.\S+/.test(cleanEmail)) {
      errors.email = 'Please provide a valid email address';
    }

    const cleanPhone = (formData.phone || '').replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.cityPincode || !formData.cityPincode.trim()) {
      errors.cityPincode = 'Please enter your city or pincode';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    if (onSubmitLead) {
      onSubmitLead({
        email: cleanEmail,
        phone: cleanPhone,
        cityPincode: formData.cityPincode.trim(),
        language: formData.language,
        whatsappUpdates: formData.whatsappUpdates,
      });
    }
  };

  const currentTestimonial = PROPRIETORSHIP_TESTIMONIALS[testimonialIdx];

  return (
    <div className="bg-white text-slate-800 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* -------------------------------------------------------------
          HERO SECTION & LEAD FORM
      ------------------------------------------------------------- */}
      <section className="relative pt-6 pb-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center space-x-1.5 text-xs text-slate-500 mb-6 flex-wrap"
          >
            <Link to="/" className="hover:text-blue-700 transition">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <Link to="/services" className="hover:text-blue-700 transition">
              Business Registration
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 font-medium">
              Sole Proprietorship
            </span>
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
                  {PROPRIETORSHIP_HERO.badge}
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1528] tracking-tight leading-[1.18]">
                  {PROPRIETORSHIP_HERO.title}
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-600">
                  Quickest, most economical way to start your business identity in
                  India with full banking and GST readiness.
                </p>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-3 pt-1 text-sm sm:text-base text-slate-700">
                {PROPRIETORSHIP_HERO.bullets.map((bullet, idx) => (
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
                    Watch: How Proprietorship Registration Works (2 mins)
                  </span>
                </button>

                <a
                  href="#pricing-section"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white px-3.5 py-1.5 rounded-md hover:bg-slate-50 transition shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>View Plans (from ₹999)</span>
                </a>
              </div>

              {/* Key Highlights Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
                {PROPRIETORSHIP_HERO.stats.map((s, idx) => (
                  <div key={idx} className="bg-slate-50/80 rounded-xl p-3 text-center border border-slate-200/60">
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
                    "{currentTestimonial.quote}"
                  </p>

                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.author}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div className="text-xs leading-tight">
                      <span className="font-bold text-slate-900 block">
                        {currentTestimonial.author}
                      </span>
                      <span className="text-slate-500">
                        {currentTestimonial.title}
                      </span>
                    </div>
                  </div>

                  {/* Slider Pagination Dots */}
                  <div className="flex items-center justify-center gap-2 mt-4 pt-1">
                    {PROPRIETORSHIP_TESTIMONIALS.map((t, idx) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTestimonialIdx(idx)}
                        aria-label={`Show testimonial ${idx + 1}`}
                        className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                          idx === testimonialIdx
                            ? 'bg-blue-600 w-6'
                            : 'bg-slate-200 hover:bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form Card (Matching Zolvit / Vakilsearch styling) */}
            <div className="lg:col-span-5 relative">
              {/* Festive Sale Badge */}
              <div className="absolute -top-3.5 right-6 z-10 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{PROPRIETORSHIP_HERO.festiveBadge}</span>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xl shadow-slate-200/50 relative">
                <div className="mb-5 pt-1">
                  <h2 className="text-xl font-extrabold text-[#0B1528] tracking-tight">
                    Register Your Proprietorship Today
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Get Udyam & GST Certificate in 48 hours with expert assistance
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="e.g. yourname@gmail.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.email
                          ? 'border-red-400 bg-red-50/20'
                          : 'border-slate-300 focus:border-blue-600'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
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
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="10-digit number"
                        className={`w-full pl-12 pr-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          formErrors.phone
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-slate-300 focus:border-blue-600'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* City / Pincode */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.cityPincode}
                      onChange={(e) =>
                        handleInputChange('cityPincode', e.target.value)
                      }
                      placeholder="e.g. Pune, 411001"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.cityPincode
                          ? 'border-red-400 bg-red-50/20'
                          : 'border-slate-300 focus:border-blue-600'
                      }`}
                    />
                    {formErrors.cityPincode && (
                      <p className="text-xs text-red-600 mt-1">
                        {formErrors.cityPincode}
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
                        value={formData.language}
                        onChange={(e) =>
                          handleInputChange('language', e.target.value)
                        }
                        className="w-full appearance-none px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition pr-9"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">हिंदी (Hindi)</option>
                        <option value="Marathi">मराठी (Marathi)</option>
                        <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                        <option value="Tamil">தமிழ் (Tamil)</option>
                        <option value="Telugu">తెలుగు (Telugu)</option>
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
                      <span className="font-semibold text-emerald-700">
                        WhatsApp
                      </span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.whatsappUpdates}
                        onChange={(e) =>
                          handleInputChange('whatsappUpdates', e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-4 rounded-lg bg-[#002244] hover:bg-[#00172e] text-white font-bold text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    <span>Register Now (from ₹999)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Trust Badges */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-blue-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>MSME Verified</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-slate-700">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>50K+ Registered</span>
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
            Trusted by Entrepreneurs, Freelancers & Corporate Partners
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
          HOW A PROPRIETORSHIP IS LEGALLY RECOGNIZED (4 PROOFS)
      ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
              Government Recognition
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              How a Sole Proprietorship is Legally Established
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              In India, a sole proprietorship is recognized through government
              registrations that link your trade name to your PAN. Here are the 4
              essential pillars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REGISTRATION_ROUTES.map((route, idx) => (
              <div
                key={idx}
                className="bg-slate-50/60 rounded-2xl p-6 border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {route.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {route.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {route.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          PROPRIETORSHIP VS OPC VS PARTNERSHIP VS PVT LTD
      ------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full mb-3">
              Entity Decision Guide
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Sole Proprietorship vs OPC vs Partnership vs Pvt Ltd
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Clear side-by-side comparison to help you choose the best legal
              structure for your capital, compliance appetite, and growth plans.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-xs font-bold uppercase text-slate-700 tracking-wider">
                  <th className="py-4 px-5">Feature</th>
                  <th className="py-4 px-5 text-blue-800 bg-blue-50/80 border-x border-blue-200">
                    Sole Proprietorship
                  </th>
                  <th className="py-4 px-5">One Person Company</th>
                  <th className="py-4 px-5">Partnership Firm</th>
                  <th className="py-4 px-5">Private Limited</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {PROPRIETORSHIP_VS_OTHERS.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/60 transition ${
                      idx % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'
                    }`}
                  >
                    <td className="py-3.5 px-5 font-semibold text-slate-800 text-xs sm:text-sm">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-blue-900 bg-blue-50/50 border-x border-blue-100 text-xs sm:text-sm">
                      {row.proprietorship}
                    </td>
                    <td className="py-3.5 px-5 text-xs sm:text-sm">{row.opc}</td>
                    <td className="py-3.5 px-5 text-xs sm:text-sm">
                      {row.partnership}
                    </td>
                    <td className="py-3.5 px-5 text-xs sm:text-sm">{row.pvtLtd}</td>
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
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
              Simple Documentation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Documents Required for Sole Proprietorship
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              No complex board resolutions or affidavits. Just your basic KYC
              and address proof to get your certificates issued 100% online.
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
              4-Step Process to Register Your Proprietorship
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Fully digital registration managed by licensed CAs and tax advocates
              within 48 hours.
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
          PRICING PACKAGES (STARTING AT ₹999)
      ------------------------------------------------------------- */}
      <section id="pricing-section" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1528] tracking-tight">
              Select Your Sole Proprietorship Package
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Clear government portal filings, zero hidden fees, and dedicated
              CA support for every plan.
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
                          isDark ? 'text-white' : 'text-[#0B1528]'
                        }`}
                      >
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        + Govt. Fee
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
                              isDark ? 'text-[#FFD200]' : 'text-blue-600'
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
                    onClick={() => onSelectPlan && onSelectPlan(pkg.id)}
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
              Frequently Asked Questions on Sole Proprietorship
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Everything you need to know about starting, running, and banking as
              a sole proprietor in India.
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
                      expandedFaq === idx ? 'rotate-180 text-blue-600' : ''
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

      {/* -------------------------------------------------------------
          VIDEO EXPLAINER MODAL
      ------------------------------------------------------------- */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Guide: How Sole Proprietorship Registration Works
              </h3>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center text-white p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-3 shadow-lg">
                <Play className="w-7 h-7 fill-white ml-1" />
              </div>
              <h4 className="font-bold text-base">
                Sole Proprietorship in 3 Easy Steps
              </h4>
              <p className="text-xs text-slate-300 max-w-md mt-1">
                1. MSME Udyam Registration &bull; 2. GST Registration &bull; 3.
                Current Account Setup in your Trade Name.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
