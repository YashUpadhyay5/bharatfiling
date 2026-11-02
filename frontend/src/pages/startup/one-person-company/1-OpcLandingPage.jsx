import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Play,
  FileText,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Gift,
  Building2,
  Users,
  Award,
  Lock,
  Phone,
  Check,
  Star,
  Rocket,
  Scale,
  Sparkles,
} from 'lucide-react';
import {
  OPC_HERO,
  TRUSTED_PARTNERS,
  OPC_TESTIMONIALS,
  OPC_VS_OTHERS,
  DOCUMENTS_REQUIRED,
  SPICE_PLUS_PROCESS,
  NOMINEE_RULES,
  PRICING_PACKAGES,
  FAQS,
} from './constants.js';

export default function OpcLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Lead form state matching screenshot media_1793609494674_acaf8785.png
  const [formData, setFormData] = useState({
    phone: initialData.phone || '',
    whatsappUpdates: initialData.whatsappUpdates !== false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Video Modal State
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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
        (prev) => (prev + 1) % OPC_TESTIMONIALS.length
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const validate = () => {
    const errs = {};
    const cleanPhone = (formData.phone || '').replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = '10-digit mobile number is required';
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

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white text-slate-800 font-sans antialiased">
      {/* =========================================================================
          HERO SECTION (1:1 Exact Match with media_1793609494674_acaf8785.png)
          - Breadcrumb: Home > Company Registration > One Person Company (OPC) Registration
          - Left: Only ISO 27001 Certified Platform in India pill
          - Title: One Person Company Registration in India
          - 4 bullet points with checkmarks
          - Quick action links: Complete guide video & View Package
          - Right: Lead Form Card with Diwali Festive Sale Offer badge & 3 trust pills
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
              One Person Company (OPC) Registration
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT 7 COLUMNS: HERO TEXT, BULLETS, QUICK LINKS, TESTIMONIALS */}
            <div className="lg:col-span-7 space-y-6">
              {/* ISO 27001 Certified Platform Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50/70 text-blue-900 text-xs font-semibold shadow-xs">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>{OPC_HERO.badge}</span>
              </div>

              {/* Main Heading matching screenshot */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#002B49] leading-[1.18] tracking-tight">
                {OPC_HERO.title}
              </h1>

              {/* 4 Value Propositions with Checkmarks (1:1 with screenshot) */}
              <ul className="space-y-3.5 pt-1">
                {OPC_HERO.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-sm sm:text-base text-slate-700 font-medium">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Quick Action Links matching screenshot below bullets */}
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-700">
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center gap-2 hover:text-[#002B49] transition cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#002B49] text-white flex items-center justify-center group-hover:scale-105 transition">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span className="underline underline-offset-4 decoration-slate-300 group-hover:decoration-[#002B49]">
                    Complete guide on One Person Company Registration
                  </span>
                </button>

                <button
                  type="button"
                  onClick={scrollToPricing}
                  className="inline-flex items-center gap-2 hover:text-[#002B49] transition cursor-pointer group"
                >
                  <FileText className="w-4 h-4 text-slate-500 group-hover:text-[#002B49]" />
                  <span className="underline underline-offset-4 decoration-slate-300 group-hover:decoration-[#002B49]">
                    View Package
                  </span>
                </button>
              </div>

              {/* Founder Review Card Slider */}
              <div className="pt-4 border-t border-slate-100">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-all">
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-3">
                    &ldquo;
                    {OPC_TESTIMONIALS[currentTestimonialIndex].quote}
                    &rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={OPC_TESTIMONIALS[currentTestimonialIndex].avatar}
                      alt={OPC_TESTIMONIALS[currentTestimonialIndex].author}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {OPC_TESTIMONIALS[currentTestimonialIndex].author}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {OPC_TESTIMONIALS[currentTestimonialIndex].title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Slider indicators */}
                <div className="flex justify-center gap-1.5 mt-3">
                  {OPC_TESTIMONIALS.map((_, i) => (
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

            {/* RIGHT 5 COLUMNS: LEAD CAPTURE FORM CARD (1:1 with media_1793609494674_acaf8785.png) */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              {/* Festive Offer Badge pinned to card top right */}
              <div className="flex justify-end -mb-3 relative z-10 pr-4">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                  <Gift className="w-3.5 h-3.5" />
                  <span>{OPC_HERO.festiveBadge}</span>
                </div>
              </div>

              {/* Form Card Container */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_12px_40px_rgba(15,23,42,0.08)] p-6 sm:p-7 relative z-0 space-y-4">
                <h3 className="text-lg font-bold text-[#002B49] text-center tracking-tight">
                  Register Your OPC Today
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Mobile Number Input matching screenshot */}
                  <div>
                    <label className="sr-only" htmlFor="opc-phone">
                      Mobile Number
                    </label>
                    <div className="relative flex rounded-lg border border-slate-300 hover:border-slate-400 transition focus-within:ring-2 focus-within:ring-[#002B49]/20 focus-within:border-[#002B49]">
                      <span className="inline-flex items-center px-3 text-xs font-semibold text-slate-500 bg-slate-50 border-r border-slate-200 rounded-l-lg select-none">
                        +91
                      </span>
                      <input
                        id="opc-phone"
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

                  {/* WhatsApp Updates Switch (1:1 with screenshot) */}
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

                  {/* CTA Button: Register Now (dark navy full width button) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <span>Register Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* 3 Trust Badges Row (1:1 with screenshot media_1793609494674_acaf8785.png) */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-1.5 border-t border-slate-100 text-[11px] font-semibold text-slate-600">
                  <div className="inline-flex items-center gap-1 bg-amber-50/60 border border-amber-200/60 px-2 py-0.5 rounded-full text-amber-900">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>4.5/5 Google Rating</span>
                  </div>

                  <div className="inline-flex items-center gap-1 bg-emerald-50/60 border border-emerald-200/60 px-2 py-0.5 rounded-full text-emerald-900">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                    <span>MCA Approved Experts</span>
                  </div>

                  <div className="inline-flex items-center gap-1 bg-blue-50/60 border border-blue-200/60 px-2 py-0.5 rounded-full text-blue-900 w-full justify-center sm:w-auto mt-1 sm:mt-0">
                    <Rocket className="w-3 h-3 text-blue-600" />
                    <span>5L+ Companies Registered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUSTED PARTNERS (1:1 with media_1793609494674_acaf8785.png)
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
          OPC VS PROPRIETORSHIP VS PRIVATE LIMITED COMPARISON
      ========================================================================= */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Entity Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Why Choose an OPC Over a Sole Proprietorship?
            </h2>
            <p className="text-sm text-slate-600">
              An OPC gives solo founders the limited liability and prestige of a
              corporate body without the burden of finding a co-founder or
              managing complex board quorum compliances.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-2xl overflow-hidden border border-slate-200 text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#002B49] text-white">
                  <th className="p-4 sm:p-5 font-bold w-1/4">Parameter</th>
                  <th className="p-4 sm:p-5 font-bold w-1/3 bg-[#001D32]">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#FFD200]" />
                      <span>One Person Company (OPC)</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 font-bold w-1/4 text-slate-300">
                    Sole Proprietorship
                  </th>
                  <th className="p-4 sm:p-5 font-bold w-1/4 text-slate-300">
                    Private Limited Company
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {OPC_VS_OTHERS.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}
                  >
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 text-emerald-950 bg-emerald-50/30 font-medium">
                      {row.opc}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 font-medium">
                      {row.proprietorship}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 font-medium">
                      {row.pvtLtd}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DOCUMENTS REQUIRED (Interactive Category Tabs)
      ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Checklist &amp; Readiness
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Documents Required for OPC Registration
            </h2>
            <p className="text-sm text-slate-600">
              Scanned copies are all you need. Our team drafts your e-MoA, e-AoA,
              and Nominee Consent Form (INC-3) automatically.
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
          MCA SPICE+ INCORPORATION MILESTONES (4 Steps)
      ========================================================================= */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              SPICe+ Simplified Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              How OPC Registration Works Online
            </h2>
            <p className="text-sm text-slate-600">
              From Digital Signature Certificate (DSC) and MCA RUN Name Approval
              to final Certificate of Incorporation (COI).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {SPICE_PLUS_PROCESS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-slate-200">
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
          NOMINEE REQUIREMENT GUIDELINES
      ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Statutory Safeguard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Who Can Be a Nominee in an OPC?
            </h2>
            <p className="text-sm text-slate-600">
              The Companies Act, 2013 mandates nominating an individual to ensure
              perpetual corporate succession in case of unfortunate incapacity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NOMINEE_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-[#002B49] text-white flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {rule.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRICING PACKAGES (matching media_1793424086317_17a0eb43.png ₹5,499)
      ========================================================================= */}
      <section
        className="py-16 bg-[#F8FAFC] border-b border-slate-200"
        id="pricing-packages"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              One Person Company Registration Packages
            </h2>
            <p className="text-sm text-slate-600">
              Clear, transparent pricing with zero hidden fees. Includes DSC,
              name approval, and Certificate of Incorporation with CIN.
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
                      + 18% GST • MCA Govt Fee at actuals
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
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Legal Clarifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear answers regarding One Person Company registration under the
              Companies Act, 2013.
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
              Complete Guide on One Person Company (OPC) Registration
            </h3>
            <div className="aspect-video bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center text-white">
              <div className="text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
                <p className="text-sm font-semibold">
                  MCA SPICe+ Process, Nominee Consent &amp; Fast-Track COI
                </p>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Learn how solo founders incorporate with limited liability and
                  full ownership control in 2 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
