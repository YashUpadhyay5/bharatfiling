import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Check,
  Gift,
  ChevronRight,
  User,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  CreditCard,
  Building2,
  Award,
  Zap,
  Clock,
  ArrowRight,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { TESTIMONIALS } from './constants.js';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'who-can-apply', label: 'Who Can Apply' },
  { id: 'documents-required', label: 'Documents Required' },
  { id: 'when-to-apply', label: 'When to Apply' },
  { id: 'fee', label: 'Fee' },
  { id: 'faqs', label: 'FAQs' },
];

export default function UdyamLandingPage({
  initialData = {},
  onGetStarted,
}) {
  const [formData, setFormData] = useState({
    email: initialData.email || '',
    phone: initialData.phone || '',
    cityPincode: initialData.cityPincode || '',
    whatsappOptIn: initialData.whatsappOptIn !== false,
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const heroFormRef = useRef(null);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const scrollToHero = () => {
    heroFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const emailInput = document.getElementById('udyam-lead-email');
    emailInput?.focus();
  };

  const scrollToSection = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(`section-${tabId}`);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const cleanEmail = (formData.email || '').trim();
    const cleanPhone = (formData.phone || '').replace(/\D/g, '');
    const cleanCity = (formData.cityPincode || '').trim();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!cleanCity) {
      newErrors.cityPincode = 'Please enter your city or pincode';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const leadPayload = {
      email: cleanEmail,
      phone: cleanPhone,
      cityPincode: cleanCity,
      whatsappOptIn: formData.whatsappOptIn,
    };

    try {
      const existing = localStorage.getItem('bharatfiling_udyam_draft');
      const parsed = existing ? JSON.parse(existing) : {};
      localStorage.setItem(
        'bharatfiling_udyam_draft',
        JSON.stringify({ ...parsed, ...leadPayload })
      );
    } catch {
      // Ignore localStorage quota
    }

    if (onGetStarted) {
      onGetStarted(leadPayload);
    }
  };

  const testimonial = TESTIMONIALS[activeTestimonial] || TESTIMONIALS[0];

  const faqs = [
    {
      q: 'Is Udyam Registration mandatory for all businesses in India?',
      a: 'While not mandatory merely to operate a small venture, Udyam Registration is mandatory if you want to avail MSME government subsidies, collateral-free credit under CGTMSE/MUDRA, tender fee waivers on GeM, 50% discount on trademarks, or statutory delayed payment protection under the MSMED Act.',
    },
    {
      q: 'Can an individual register multiple businesses under one Aadhaar number?',
      a: 'Yes. The same applicant Aadhaar can be used to register multiple commercial enterprises. However, each unique enterprise or manufacturing/service unit receives its own distinct Udyam Registration Number (URN).',
    },
    {
      q: 'Does the Udyam Certificate have an expiry date or need annual renewal?',
      a: 'No. The official Udyam Registration Certificate carries permanent, lifetime validity. It never expires and requires zero renewal fees. Annual turnover and investment stats are synced automatically through integrated Income Tax and GST database APIs.',
    },
    {
      q: 'How is annual turnover calculated for MSME classification?',
      a: 'Under the composite criteria defined by the Ministry of MSME, export turnover of both goods and services is completely excluded from the total turnover figure. Only domestic turnover is counted towards the threshold limits.',
    },
    {
      q: 'What is the difference between Udyam, Udyog Aadhaar (UAM), and MSME?',
      a: 'MSME is the overall industry category (Micro, Small & Medium Enterprises). Udyog Aadhaar (UAM) was the legacy registration system prior to July 1, 2020. Udyam Registration is the revised, digitized statutory system with dynamic QR verification that replaced UAM completely.',
    },
    {
      q: 'What happens if my business exceeds the Micro Enterprise threshold?',
      a: 'If your investment or turnover exceeds the Micro limits, the government portal automatically upgrades your enterprise status to Small or Medium during annual ITR/GST reconciliation. You do not lose your URN; your certificate is seamlessly re-classified.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Subtle diagonal background stripes in top-right as seen in screenshot */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[55vw] h-[450px] opacity-40 select-none z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #f1f5f9 0, #f1f5f9 2px, transparent 2px, transparent 18px)',
        }}
      />

      {/* =========================================================================
          SECTION 1: HERO & LEAD FORM
         ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16">
        {/* Breadcrumb Navigation: Home > Udyam Registration */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-slate-900 transition underline-offset-2">
            Home
          </Link>
          <span className="text-slate-400 select-none">&gt;</span>
          <span className="text-slate-800 font-medium select-none">Udyam Registration</span>
        </nav>

        {/* Hero 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Headings, ISO Badge, Bullets, Testimonial (7 cols) */}
          <div className="lg:col-span-7 space-y-6 pt-2">
            
            {/* Glowing ISO 27001 Certified Platform Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-slate-800 shadow-xs">
              <div className="w-5 h-5 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(29,78,216,0.45)]">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight">
                Only ISO 27001 Certified Platform in{' '}
                <span role="img" aria-label="India Flag" className="text-base align-middle">
                  🇮🇳
                </span>
              </span>
            </div>

            {/* Main Page Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#042D50] tracking-tight leading-[1.15]">
              Udyam Registration
            </h1>

            {/* 3 Value Propositions with Blue Checkmarks */}
            <div className="space-y-3.5 pt-1">
              {/* Bullet 1 */}
              <div className="flex items-start gap-3">
                <div className="text-[#0066FF] shrink-0 mt-0.5">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  Online Udyam registration done by experts with timely delivery of your Udyog Aadhar{' '}
                  <span className="text-blue-600 cursor-pointer underline-offset-2 hover:underline">
                    T&amp;C*
                  </span>
                </p>
              </div>

              {/* Bullet 2 */}
              <div className="flex items-start gap-3">
                <div className="text-[#0066FF] shrink-0 mt-0.5">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  100% online process with quick filing and processing—save time and avoid hassles
                </p>
              </div>

              {/* Bullet 3 */}
              <div className="flex items-start gap-3">
                <div className="text-[#0066FF] shrink-0 mt-0.5">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  Get expert support at every step to ensure smooth and compliant registration (T&amp;C apply)
                </p>
              </div>
            </div>

            {/* Testimonial Card Carousel */}
            <div className="pt-4 max-w-xl">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all">
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="mt-4 flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    <User className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {testimonial.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal">
                      {testimonial.role} &bull; {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Indicator Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-3 select-none">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTestimonial(idx)}
                    aria-label={`Show testimonial ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeTestimonial === idx ? 'w-6 bg-slate-700' : 'w-3 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Lead Intake Card (5 cols) */}
          <div ref={heroFormRef} className="lg:col-span-5 relative w-full max-w-[420px] mx-auto lg:ml-auto">
            
            {/* Festive Sale Offer Badge (Overhanging top-left ribbon) */}
            <div className="absolute -top-3.5 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-md bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-md text-[11px] font-extrabold tracking-wide uppercase select-none">
              <span className="text-xs">🪔</span>
              <span>Festive Sale Offer</span>
              <span className="text-xs">✨</span>
            </div>

            {/* The White Elevated Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_15px_45px_rgba(0,0,0,0.08)] p-6 sm:p-8 pt-9 relative">
              
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 text-center mb-6">
                Get Legal Assistance
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Field 1: Email */}
                <div>
                  <input
                    id="udyam-lead-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="Email"
                    className={`w-full px-4 py-3 rounded-lg bg-white border text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition ${
                      errors.email
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                        : 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Field 2: Mobile Number */}
                <div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
                    placeholder="Mobile Number"
                    className={`w-full px-4 py-3 rounded-lg bg-white border text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition ${
                      errors.phone
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                        : 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-400'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* Field 3: City / Pincode */}
                <div>
                  <input
                    type="text"
                    value={formData.cityPincode}
                    onChange={(e) => handleChange('cityPincode', e.target.value)}
                    placeholder="City/Pincode"
                    className={`w-full px-4 py-3 rounded-lg bg-white border text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition ${
                      errors.cityPincode
                        ? 'border-rose-500 focus:border-rose-500 ring-1 ring-rose-500'
                        : 'border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-400'
                    }`}
                  />
                  {errors.cityPincode && (
                    <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.cityPincode}</p>
                  )}
                </div>

                {/* WhatsApp Opt-in Row with Green Toggle */}
                <div className="flex items-center justify-between pt-1 select-none">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-normal">
                    <span>Get easy updates through</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                      <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      Whatsapp
                    </span>
                  </div>

                  {/* Toggle button */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={formData.whatsappOptIn}
                    onClick={() => handleChange('whatsappOptIn', !formData.whatsappOptIn)}
                    className={`w-10 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                      formData.whatsappOptIn ? 'bg-[#25D366]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        formData.whatsappOptIn ? 'transform translate-x-4' : 'transform translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Primary Button: Get Started */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#002B49] hover:bg-[#06385d] active:scale-[0.99] text-white font-bold text-sm sm:text-base tracking-wide transition shadow-sm cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? 'Starting...' : 'Get Started'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          SECTION 2: STICKY SUB-NAVIGATION TABS (Exact Clone of Image 3)
         ========================================================================= */}
      <div className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-y border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-1">
            <div className="inline-flex items-center gap-1 sm:gap-2">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => scrollToSection(tab.id)}
                    className={`relative px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                      isActive
                        ? 'text-[#042D50] font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0066FF] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: OVERVIEW ("What is Udyam Registration?") (Image 3 Clone)
         ========================================================================= */}
      <section id="section-overview" className="py-12 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#042D50] tracking-tight">
                What is Udyam Registration?
              </h2>

              <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                Udyam Registration is a free and paperless process for registering Micro, Small, and Medium Enterprises (MSMEs) in India through the official Udyam portal. It is mandatory for all MSMEs as of 1 July 2020.
              </p>

              <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
                Upon successful registration, businesses receive a permanent identification number, called the Udyam Registration Number (UAM). The Udyam Registration Certificate is sent directly to the registered email ID.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToHero}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#002B49] hover:bg-[#06385d] text-white text-xs sm:text-sm font-bold shadow-xs transition cursor-pointer"
                >
                  <span>Apply Online Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-xs text-slate-500 font-medium">
                  ⚡ Certificate delivered directly via email
                </div>
              </div>
            </div>

            {/* Right Illustration: Monitor with UDYAM REGISTRATION card (Matching Image 3) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[380px] bg-gradient-to-b from-blue-50/50 to-slate-50 p-6 rounded-3xl border border-slate-200/80 shadow-md">
                {/* SVG Monitor Graphic */}
                <div className="bg-white rounded-2xl border-2 border-slate-800 p-4 shadow-sm relative">
                  {/* Top Web Camera / Speaker */}
                  <div className="w-2 h-2 rounded-full bg-slate-800 mx-auto mb-3" />
                  
                  {/* User Avatar Circle */}
                  <div className="w-12 h-12 rounded-full border-2 border-[#0066FF] text-[#0066FF] flex items-center justify-center mx-auto mb-2">
                    <User className="w-7 h-7 stroke-[2]" />
                  </div>

                  {/* Header Title inside monitor */}
                  <div className="text-[11px] font-black uppercase tracking-wider text-slate-800 text-center mb-3">
                    UDYAM REGISTRATION
                  </div>

                  {/* Placeholder input mockup bars */}
                  <div className="space-y-2 max-w-[200px] mx-auto">
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="h-2.5 bg-slate-200 rounded" />
                      <div className="h-2.5 bg-slate-200 rounded" />
                    </div>
                    <div className="h-2.5 bg-slate-200 rounded" />
                    <div className="h-2.5 bg-slate-200 rounded" />
                    <div className="h-2.5 bg-slate-200 rounded" />
                  </div>

                  {/* Mockup CREATE button */}
                  <div className="mt-4 flex justify-center">
                    <div className="px-4 py-1 rounded bg-[#002B49] text-white font-extrabold text-[9px] tracking-wider uppercase select-none shadow-xs">
                      CREATE
                    </div>
                  </div>
                </div>

                {/* Monitor Stand Base */}
                <div className="w-6 h-4 bg-slate-800 mx-auto -mt-0.5" />
                <div className="w-24 h-1.5 bg-slate-800 rounded-full mx-auto" />

                {/* Potted Plant Mockup on left/right corners */}
                <div className="absolute -bottom-2 -left-2 text-2xl select-none">🪴</div>
                <div className="absolute -bottom-2 -right-2 text-2xl select-none">🌿</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: BENEFITS OF UDYAM REGISTRATION
         ========================================================================= */}
      <section id="section-benefits" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Statutory MSME Advantages
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#042D50] tracking-tight">
              Benefits of Udyam Registration
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Government-backed fiscal incentives, legal protections, and subsidies designed to accelerate enterprise growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <CreditCard className="w-6 h-6 text-blue-600" />,
                title: 'Collateral-Free Bank Loans',
                desc: 'Access institutional credit under the Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) and MUDRA loan schemes without pledging property.',
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
                title: 'Delayed Payment Protection',
                desc: 'Buyers must pay within 45 days. Delayed payments attract mandatory compound interest at 3x the RBI rate under the MSME Samadhaan dispute portal.',
              },
              {
                icon: <Award className="w-6 h-6 text-amber-600" />,
                title: 'Government Tender Preference',
                desc: 'Enjoy waiver of Earnest Money Deposit (EMD), tender fee exemptions, and mandatory 25% public procurement preference on GeM portal.',
              },
              {
                icon: <Sparkles className="w-6 h-6 text-purple-600" />,
                title: '50% Trademark & Patent Subsidy',
                desc: 'Government subsidy of 50% on official filing fees for Trademarks, Patents, Designs, and ISO 9001/27001 certifications.',
              },
              {
                icon: <Zap className="w-6 h-6 text-amber-500" />,
                title: 'Electricity Bill & Tax Rebates',
                desc: 'Avail state-level industrial power tariff concessions, octroi exemptions, and eligible direct/indirect tax credit reliefs.',
              },
              {
                icon: <Clock className="w-6 h-6 text-teal-600" />,
                title: 'Lifetime Validity with Zero Renewal',
                desc: 'Your Udyam Registration Number (URN) stays active permanently. Annual financial reclassification synchronizes automatically via ITR & GST portals.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WHO CAN APPLY (MSME Classification Criteria)
         ========================================================================= */}
      <section id="section-who-can-apply" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Eligibility Thresholds
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#042D50] tracking-tight">
              Who Can Apply for Udyam Registration?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Any business entity engaged in manufacturing goods or providing services in India meeting the composite criteria below:
            </p>
          </div>

          {/* Classification Criteria Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs mb-8">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <th className="py-3.5 px-4 sm:px-6">Enterprise Classification</th>
                  <th className="py-3.5 px-4 sm:px-6">Investment in Plant, Machinery &amp; Equipment</th>
                  <th className="py-3.5 px-4 sm:px-6">Annual Turnover (Excluding Exports)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                <tr className="hover:bg-blue-50/30 transition">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Micro Enterprise</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">Not exceeding ₹1 Crore</td>
                  <td className="py-3.5 px-4 sm:px-6">Not exceeding ₹5 Crores</td>
                </tr>
                <tr className="hover:bg-blue-50/30 transition">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span>Small Enterprise</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">Not exceeding ₹10 Crores</td>
                  <td className="py-3.5 px-4 sm:px-6">Not exceeding ₹50 Crores</td>
                </tr>
                <tr className="hover:bg-blue-50/30 transition">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    <span>Medium Enterprise</span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">Not exceeding ₹50 Crores</td>
                  <td className="py-3.5 px-4 sm:px-6">Not exceeding ₹250 Crores</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Eligible Business Structures */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h4 className="text-sm font-bold text-slate-900 mb-3">
              Eligible Entity Structures:
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Sole Proprietorships',
                'Partnership Firms',
                'Private Limited Companies',
                'Limited Liability Partnerships (LLP)',
                'One Person Companies (OPC)',
                'Hindu Undivided Family (HUF)',
                'Public Limited Companies',
                'Societies, Co-operatives & Trusts',
              ].map((str, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs"
                >
                  ✓ {str}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: DOCUMENTS REQUIRED (100% Paperless Process)
         ========================================================================= */}
      <section id="section-documents-required" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              100% Paperless Self-Declaration
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#042D50] tracking-tight">
              Documents Required for Udyam Registration
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              No physical document uploads or scanned paper submission is required. The Udyam portal verifies details online via government APIs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Aadhaar Number',
                desc: '12-digit Aadhaar of the Proprietor, Managing Partner, Karta, or Authorized Director. Mobile OTP verification is triggered during processing.',
              },
              {
                title: 'PAN Card Details',
                desc: 'Permanent Account Number of the enterprise or business proprietor. Automatically fetches business financials and past returns.',
              },
              {
                title: 'GSTIN (If Applicable)',
                desc: 'Goods and Services Tax Identification Number if your enterprise is registered or mandated under GST statutory provisions.',
              },
              {
                title: 'Bank Account & Office Info',
                desc: 'Active business bank account number, branch IFSC code, registered workplace address, and 5-digit NIC business activity code.',
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">{doc.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: WHEN TO APPLY
         ========================================================================= */}
      <section id="section-when-to-apply" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Application Timelines
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#042D50] tracking-tight">
                When Should You Apply for Udyam Registration?
              </h2>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      New Businesses &amp; Startups
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      You can apply as soon as you establish your entity and commence preliminary commercial operations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Legacy Udyog Aadhaar (UAM) Migration
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      All old Udyog Aadhaar and EM-II registrations expired on June 30, 2022. Entities must re-register on Udyam to retain MSME benefits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      Turnover &amp; Investment Bracket Upgrade
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      When your scale crosses current thresholds, the system re-evaluates and issues an updated Udyam Certificate with your new classification.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs sm:text-sm mb-3">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Zero Government Deadlines</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Fast-Track CA Filing Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Our Chartered Accountants review your PAN, verify statutory NIC codes, and file your portal application within 24 to 48 hours.
              </p>
              <button
                type="button"
                onClick={scrollToHero}
                className="w-full py-3 px-6 rounded-lg bg-[#002B49] hover:bg-[#06385d] text-white font-bold text-xs sm:text-sm transition cursor-pointer text-center"
              >
                Start Udyam Filing Now &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FEE (Government Fee vs CA Desk)
         ========================================================================= */}
      <section id="section-fee" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Government Portal Fee: ₹0 Free
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-[#042D50] tracking-tight">
              Udyam Registration Fee Structure
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              The Ministry of MSME, Government of India, charges <strong className="text-slate-900">₹0 government fee</strong> on the national portal.
            </p>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              BharatFiling charges a nominal professional fee starting at just <strong className="text-blue-700">₹499</strong> to provide dedicated Chartered Accountant assistance, accurate 5-digit NIC code mapping, pre-submission error auditing, and guaranteed certificate delivery with QR verification.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={scrollToHero}
                className="px-8 py-3 rounded-lg bg-[#002B49] hover:bg-[#06385d] text-white font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer"
              >
                Get Started with Expert CA Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FREQUENTLY ASKED QUESTIONS (FAQs)
         ========================================================================= */}
      <section id="section-faqs" className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Clear Answers
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#042D50] tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Everything you need to know about MSME and Udyam certification in India.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: BOTTOM CALL TO ACTION
         ========================================================================= */}
      <section className="py-12 bg-gradient-to-r from-[#002B49] to-[#042D50] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ready to Obtain Your Udyam Registration Certificate?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join over 5,00,000 Indian enterprises certified with BharatFiling. Unlock collateral-free credit lines, government tenders, and trademark discounts today.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={scrollToHero}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#FFD200] hover:bg-[#FACC15] text-slate-950 font-extrabold text-sm shadow-lg active:scale-98 transition cursor-pointer"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </section>

      {/* Floating Yellow Tab on Viewport Edge: Refer a Friend */}
      <aside
        aria-label="Refer a Friend"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-2 py-4 px-1.5 bg-[#FFD200] hover:bg-[#FACC15] text-slate-900 rounded-l-lg shadow-lg cursor-pointer transition select-none group"
        onClick={() => {
          navigator.clipboard?.writeText(window.location.href);
          alert('Link copied! Share BharatFiling with friends to earn rewards.');
        }}
      >
        <Gift className="w-4 h-4 text-slate-900 group-hover:scale-110 transition-transform" />
        <span
          className="text-[11px] font-bold tracking-wider uppercase text-slate-900"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Refer a friend
        </span>
      </aside>
    </div>
  );
}
