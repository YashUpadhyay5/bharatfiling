import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  Users,
  Briefcase,
  FileText,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  ArrowRight,
  FileCheck,
  HelpCircle,
  Award,
  Sparkles,
  ExternalLink,
  AlertCircle,
  X,
  Play,
  Check,
  Search,
  CheckSquare,
  Gift,
  Scale,
  Calendar,
  Percent,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import {
  PT_PLANS,
  PT_STATES,
  NON_PT_STATES,
  PT_DOCUMENTS,
  PT_FAQS,
  HERO_TESTIMONIALS,
  CERTIFICATE_TYPES,
} from './constants.js';

export default function PtLandingPage({ initialData = {}, onGetStarted }) {
  const { showError, showSuccess } = useToast();

  // Lead Form State (1:1 with Screenshot media_1793006134436_f14bed7e.png)
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [cityPincode, setCityPincode] = useState(initialData.cityPincode || '');
  const [whatsappOptIn, setWhatsappOptIn] = useState(
    initialData.whatsappOptIn !== undefined ? initialData.whatsappOptIn : true
  );

  // Modals & Interactive States
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showReferModal, setShowReferModal] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState('proprietorship'); // 'proprietorship' | 'partnership' | 'company'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [stateSearch, setStateSearch] = useState('');
  const [isHindi, setIsHindi] = useState(false);
  const [heroTestimonialIdx, setHeroTestimonialIdx] = useState(0);

  // Form submission handler
  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      showError('Please enter a valid email address');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      showError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (onGetStarted) {
      onGetStarted({
        email: email.trim(),
        phone: cleanPhone,
        cityPincode: cityPincode.trim(),
        whatsappOptIn,
      });
    }
  };

  // Filtered state list
  const filteredStates = PT_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
      s.authority.toLowerCase().includes(stateSearch.toLowerCase()) ||
      s.period.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentHeroReview = HERO_TESTIMONIALS[heroTestimonialIdx] || HERO_TESTIMONIALS[0];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#FAFBFD] border-b border-slate-200 text-center py-2 px-4 text-xs sm:text-sm text-slate-600">
        <span>Now you can read this page in Hindi. </span>
        <button
          type="button"
          onClick={() => {
            setIsHindi(!isHindi);
            showSuccess(isHindi ? 'Switched to English' : 'हिंदी भाषा सक्रिय की गई');
          }}
          className="text-[#0052CC] hover:underline font-semibold ml-1 cursor-pointer"
        >
          {isHindi ? 'Switch back to English' : 'Change language to हिन्दी'}
        </button>
      </div>

      {/* 2. BREADCRUMBS & COMPLIANCE BAR */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#002B49] transition font-medium">Home</Link>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">
              {isHindi ? 'व्यावसायिक कर पंजीकरण ऑनलाइन (Professional Tax Registration)' : 'Professional Tax Registration'}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" /> ISO 27001 Certified Statutory Platform
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">Article 276 State Tax Filing Desk</span>
          </div>
        </div>
      </div>

      {/* 3. HERO SECTION (1:1 EXACT MATCH OF SCREENSHOT media_1793006134436_f14bed7e.png) */}
      <section className="relative bg-gradient-to-b from-[#F7FAFD] via-white to-white pt-8 pb-14 border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Trust Badge, H1, Value Bullets, Video Guide & Siddharth Rao Card */}
            <div className="lg:col-span-7 space-y-6 pt-1">
              
              {/* Blue Shield Badge: Only ISO 27001 Certified Platform in India */}
              <div className="inline-flex items-center gap-2.5 bg-white border border-blue-200 rounded-full px-3.5 py-1.5 shadow-2xs">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-[#0052CC] flex items-center justify-center text-white shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
                  Only ISO 27001 Certified Platform in <span className="inline-block text-base">🇮🇳</span>
                </span>
              </div>

              {/* Main Headline (Exact Wording from Screenshot) */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#002B49] leading-[1.18] tracking-tight">
                {isHindi ? (
                  <>
                    प्रोफेशनल टैक्स रजिस्ट्रेशन<br />
                    के लिए ऑनलाइन आवेदन करें
                  </>
                ) : (
                  <>
                    Apply for Professional Tax<br />
                    Registration
                  </>
                )}
              </h1>

              {/* 3 Value Propositions with Checkmarks (Matching Screenshot 1:1) */}
              <div className="space-y-3.5 pt-1">
                {/* Bullet 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[#002B49] shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base font-normal leading-snug">
                    Guaranteed application filing within 48 hours and certificate delivery in 5 business days{' '}
                    <button
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="text-[#0052CC] hover:underline font-medium inline-block cursor-pointer"
                    >
                      T&amp;C*
                    </button>
                  </p>
                </div>

                {/* Bullet 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[#002B49] shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base font-normal leading-snug">
                    Expert-guided online registration for PTEC and PTRC across India with full compliance support
                  </p>
                </div>

                {/* Bullet 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[#002B49] shrink-0 mt-0.5 font-bold">
                    <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base font-normal leading-snug">
                    Simplify your tax obligations with fast, accurate, and fully digital professional tax registration
                  </p>
                </div>
              </div>

              {/* Video Link / Guide CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#002B49] hover:text-[#0052CC] transition group underline underline-offset-4 cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-[#002B49] group-hover:bg-[#0052CC] flex items-center justify-center text-white transition">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                  <span>Complete guide on Professional Tax</span>
                </button>
              </div>

              {/* Verified Reviews / Quote Card (Matching Hero Bottom-Left in Screenshot 1:1) */}
              <div className="pt-4 max-w-xl">
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs relative">
                  <p className="text-slate-600 text-sm sm:text-[15px] italic leading-relaxed mb-4">
                    “{currentHeroReview.quote}”
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      {/* Avatar Circle with silhouette / icon */}
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                        <Users className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="font-bold text-slate-900">{currentHeroReview.author}</span>
                        <span className="text-slate-500 font-normal ml-2">{currentHeroReview.role}</span>
                      </div>
                    </div>

                    {/* Quick navigation arrows if multiple testimonials */}
                    <div className="flex items-center gap-1 text-slate-400">
                      {HERO_TESTIMONIALS.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setHeroTestimonialIdx(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === heroTestimonialIdx ? 'bg-[#002B49] w-4' : 'bg-slate-300 hover:bg-slate-400'
                          }`}
                          aria-label={`Testimonial ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Lead Capture Card (1:1 Exact Match of Screenshot) */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              
              {/* Floating Referral Pill Attached to Right Edge */}
              <div className="hidden sm:block absolute -right-3 top-28 z-20">
                <button
                  type="button"
                  onClick={() => setShowReferModal(true)}
                  className="bg-gradient-to-b from-[#FFD200] to-[#F59E0B] text-slate-900 text-xs font-bold py-3 px-1.5 rounded-l-md shadow-md hover:brightness-105 transition flex flex-col items-center gap-1.5 cursor-pointer [writing-mode:vertical-rl] rotate-180"
                >
                  <Gift className="w-3.5 h-3.5 rotate-90 text-slate-900" />
                  <span className="tracking-wide">Refer a friend 🎁</span>
                </button>
              </div>

              {/* Lead Card Container */}
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8">
                
                {/* Diwali Festive Sale Offer Badge floating on card top */}
                <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 z-10 flex items-center shadow-md rounded-full overflow-hidden border border-amber-300">
                  <div className="bg-[#0052CC] text-white text-[11px] font-bold px-3 py-1 flex items-center gap-1">
                    <span>Diwali</span>
                    <Sparkles className="w-3 h-3 text-amber-300" />
                  </div>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 text-slate-800 text-[11px] font-bold px-3.5 py-1 flex items-center gap-1.5">
                    <span>Festive Sale Offer</span>
                    <span>🪔</span>
                  </div>
                </div>

                {/* Card Title */}
                <div className="text-center mt-2 mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Professional Tax
                  </h2>
                </div>

                {/* Lead Form */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label htmlFor="lead-email" className="sr-only">Email</label>
                    <input
                      id="lead-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full px-4 py-3.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49] transition bg-white"
                      required
                    />
                  </div>

                  {/* Mobile Number Input */}
                  <div>
                    <label htmlFor="lead-mobile" className="sr-only">Mobile Number</label>
                    <div className="relative flex rounded-lg border border-slate-200 focus-within:border-[#002B49] focus-within:ring-1 focus-within:ring-[#002B49] transition bg-white overflow-hidden">
                      <span className="inline-flex items-center px-3.5 text-sm text-slate-600 bg-slate-50 border-r border-slate-200 font-medium select-none">
                        🇮🇳 +91
                      </span>
                      <input
                        id="lead-mobile"
                        type="tel"
                        maxLength="10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="Mobile Number"
                        className="w-full px-3.5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* City/Pincode Input */}
                  <div>
                    <label htmlFor="lead-city" className="sr-only">City/Pincode</label>
                    <input
                      id="lead-city"
                      type="text"
                      value={cityPincode}
                      onChange={(e) => setCityPincode(e.target.value)}
                      placeholder="City/Pincode"
                      className="w-full px-4 py-3.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49] transition bg-white"
                    />
                  </div>

                  {/* WhatsApp Opt-in Row (Matching green toggle in screenshot) */}
                  <div className="flex items-center justify-between pt-1 pb-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <span>Get easy updates through</span>
                      <svg className="w-4 h-4 text-emerald-500 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                      </svg>
                      <span className="font-semibold text-slate-700">Whatsapp</span>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={whatsappOptIn}
                      onClick={() => setWhatsappOptIn(!whatsappOptIn)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        whatsappOptIn ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          whatsappOptIn ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Primary CTA Button: Get Started */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-base transition shadow-md cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>

                  <p className="text-[11px] text-center text-slate-500 pt-1">
                    🔒 100% confidential. No spam. CA-reviewed filing.
                  </p>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. QUICK STICKY ANCHOR NAVIGATION */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto py-2.5 text-xs sm:text-sm font-semibold text-slate-600 no-scrollbar whitespace-nowrap">
            <button
              type="button"
              onClick={() => scrollToSection('sec-overview')}
              className="px-3 py-1.5 rounded-full hover:bg-slate-100 hover:text-[#002B49] transition cursor-pointer"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec-types')}
              className="px-3 py-1.5 rounded-full hover:bg-slate-100 hover:text-[#002B49] transition cursor-pointer"
            >
              PTEC vs PTRC
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec-slabs')}
              className="px-3 py-1.5 rounded-full hover:bg-slate-100 hover:text-[#002B49] transition cursor-pointer"
            >
              State-Wise Slabs
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec-documents')}
              className="px-3 py-1.5 rounded-full hover:bg-slate-100 hover:text-[#002B49] transition cursor-pointer"
            >
              Documents Required
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec-process')}
              className="px-3 py-1.5 rounded-full hover:bg-slate-100 hover:text-[#002B49] transition cursor-pointer"
            >
              Registration Process
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec-penalties')}
              className="px-3 py-1.5 rounded-full hover:bg-slate-100 hover:text-[#002B49] transition cursor-pointer"
            >
              Penalties &amp; Interest
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec-faqs')}
              className="px-3 py-1.5 rounded-full hover:bg-slate-100 hover:text-[#002B49] transition cursor-pointer"
            >
              FAQs
            </button>
          </div>
        </div>
      </nav>

      {/* 5. OVERVIEW SECTION: What is Professional Tax? */}
      <section id="sec-overview" className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-3">
              <Scale className="w-3.5 h-3.5" /> Constitutional Tax Framework
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight mb-4">
              Professional Tax Registration — an Overview
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              Professional Tax (P.Tax) is a direct state-level tax levied under <strong>Article 276</strong> of the Constitution of India. Respective state governments impose this tax on individuals earning income through professions, trades, callings, or employment.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Unlike Central Income Tax, the maximum statutory limit for Professional Tax is capped at <strong>₹2,500 per annum per individual</strong>. It is mandatory in about 17 Indian states (including Maharashtra, Karnataka, West Bengal, Tamil Nadu, Telangana, and Gujarat), while states such as Delhi, Haryana, and Rajasthan have zero Professional Tax liability.
            </p>
          </div>

          {/* 3 Core Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0052CC] flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Statutory Cap of ₹2,500/Year</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                By Constitutional mandate, no state can levy more than ₹2,500 annually on any single individual or employee, ensuring predictable statutory overhead.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Percent className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">100% Income Tax Deductible</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Under Section 16(iii) of the Income Tax Act, 1961, any amount paid as Professional Tax is fully deductible from gross salary before computing taxable income.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-blue-300 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Essential for Bank Current Accounts</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                In states like Maharashtra and Karnataka, PTEC/PTRC certificates are mandatory for opening current bank accounts, passing payroll audits, and obtaining trade licenses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PTEC vs PTRC SECTION: Types of Certificates */}
      <section id="sec-types" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight mb-3">
              Types of Professional Tax Certificates (PTEC vs PTRC)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Depending on whether you operate as an independent professional/owner or employ staff, the state commercial tax department mandates one or both registrations:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* PTEC Card */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-7 shadow-sm hover:border-[#002B49] transition relative flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3">
                  PTEC
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Professional Tax Enrolment Certificate
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-4">
                  For: Business Owners, Partners, Directors &amp; Freelance Professionals
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  PTEC is paid by the individual professional or business owner for the legal privilege of practicing or operating their trade. It is an annual statutory payment made directly from company or personal funds.
                </p>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Due Date:</strong> Paid annually by April 30 of the financial year</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Typical Fee:</strong> ₹2,500/year (e.g. Maharashtra, Karnataka)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Who pays:</strong> Sole Proprietors, LLPs, Private Limited Directors</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => scrollToSection('sec-overview')}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#002B49] font-bold text-sm transition text-center cursor-pointer"
                >
                  Apply for PTEC Enrolment (₹1,499)
                </button>
              </div>
            </div>

            {/* PTRC Card */}
            <div className="bg-white rounded-2xl border-2 border-[#002B49] p-7 shadow-md relative flex flex-col justify-between">
              <div className="absolute -top-3.5 right-6 bg-[#002B49] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Mandatory for Employers
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3">
                  PTRC
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Professional Tax Registration Certificate
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mb-4">
                  For: Employers &amp; Companies with Salaried Staff
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  PTRC is mandatory for any employer who deducts professional tax from employees' gross salaries and remits it monthly or quarterly to the State Commercial Tax Department.
                </p>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Due Date:</strong> Remitted monthly (typically by 10th - last day)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Deduction:</strong> Deducted from employee gross salary slabs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Liability:</strong> Employer is personally held liable for late remittance</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => scrollToSection('sec-overview')}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm transition text-center cursor-pointer"
                >
                  Apply for PTRC Registration (₹2,499)
                </button>
              </div>
            </div>

          </div>

          {/* Both Combo Guidance Banner */}
          <div className="max-w-5xl mx-auto mt-8 bg-blue-50/70 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0052CC] flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700">
                <strong>Do I need both PTEC and PTRC?</strong> Yes! If your company is registered in a PT state and also hires salaried staff, you are legally required to obtain both <strong>PTEC</strong> (for the company/directors) and <strong>PTRC</strong> (for employee payroll).
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('sec-overview')}
              className="shrink-0 px-4 py-2 rounded-lg bg-[#002B49] text-white text-xs sm:text-sm font-bold hover:bg-[#001D33] transition cursor-pointer whitespace-nowrap"
            >
              Get Both Combo (₹3,999)
            </button>
          </div>
        </div>
      </section>

      {/* 7. STATE-WISE SLABS & ACTS DIRECTORY */}
      <section id="sec-slabs" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" /> State Schedules &amp; Slabs
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
                State-wise Professional Tax Acts &amp; Slabs
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Explore deduction periods, income threshold slabs, and remittance deadlines for each Indian state:
              </p>
            </div>

            {/* State Search Filter */}
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                placeholder="Search state (e.g. Maharashtra)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#002B49] bg-white"
              />
            </div>
          </div>

          {/* State Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-[#002B49] text-white">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">State / Union Territory</th>
                    <th className="py-3.5 px-4 font-bold">Deduction Frequency</th>
                    <th className="py-3.5 px-4 font-bold">Tax Slab Breakdown</th>
                    <th className="py-3.5 px-4 font-bold">Deadline for Remitting Tax</th>
                    <th className="py-3.5 px-4 font-bold">Max Annual Tax</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredStates.map((st, idx) => (
                    <tr
                      key={st.id}
                      className={idx % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50/60 hover:bg-slate-100/60'}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {st.name}
                        <span className="block text-[11px] font-normal text-slate-500 mt-0.5">
                          {st.authority}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                          {st.period}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-md leading-relaxed">
                        {st.slabs}
                        {st.note && (
                          <span className="block text-[11px] text-amber-700 font-medium mt-1">
                            ℹ️ {st.note}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 whitespace-nowrap font-medium">
                        {st.deadline}
                      </td>
                      <td className="py-3.5 px-4 text-slate-900 font-bold whitespace-nowrap">
                        {st.maxTax}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Non-PT States Banner */}
          <div className="mt-8 bg-amber-50/70 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <h3 className="text-sm font-bold text-amber-900">
                  States &amp; UTs with NO Professional Tax Liability
                </h3>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  If your entity operates exclusively in any of the following states/UTs, you are <strong>100% exempt</strong> from Professional Tax registration and need not apply:
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {NON_PT_STATES.slice(0, 10).map((st) => (
                    <span
                      key={st}
                      className="px-2.5 py-1 rounded-md bg-white border border-amber-200 text-amber-900 text-[11px] font-semibold"
                    >
                      {st}
                    </span>
                  ))}
                  <span className="px-2.5 py-1 rounded-md bg-white border border-amber-200 text-amber-900 text-[11px] font-semibold">
                    +{NON_PT_STATES.length - 10} more
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. REQUIRED DOCUMENTS CHECKLIST */}
      <section id="sec-documents" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" /> Paperless Registration
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight mb-2">
              Required Documents for Professional Tax Registration
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              All documents are uploaded digitally. Choose your business constitution to view the exact checklist:
            </p>
          </div>

          {/* Constitution Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-slate-200 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveDocTab('proprietorship')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeDocTab === 'proprietorship'
                    ? 'bg-white text-[#002B49] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sole Proprietorship
              </button>
              <button
                type="button"
                onClick={() => setActiveDocTab('partnership')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeDocTab === 'partnership'
                    ? 'bg-white text-[#002B49] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Partnership / LLP
              </button>
              <button
                type="button"
                onClick={() => setActiveDocTab('company')}
                className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeDocTab === 'company'
                    ? 'bg-white text-[#002B49] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Private Limited / OPC
              </button>
            </div>
          </div>

          {/* Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {PT_DOCUMENTS[activeDocTab]?.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-sm hover:border-blue-200 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0052CC] flex items-center justify-center font-bold text-xs mb-3">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{doc.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{doc.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => scrollToSection('sec-overview')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#002B49] text-white font-bold text-sm hover:bg-[#001D33] transition shadow-md cursor-pointer"
            >
              <span>Start Your Application Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. 4-STEP REGISTRATION PROCESS */}
      <section id="sec-process" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight mb-3">
              How the Professional Tax Registration Process Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Get your PTEC and PTRC certificates issued in 4 transparent, fully digital steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
              <span className="text-3xl font-black text-[#002B49]/15 absolute right-4 top-4">01</span>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0052CC] flex items-center justify-center font-bold text-sm mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">1. Online Questionnaire</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fill our 3-minute form specifying your business state, entity type, and whether you require PTEC, PTRC, or both.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Takes 5 Minutes
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
              <span className="text-3xl font-black text-[#002B49]/15 absolute right-4 top-4">02</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">2. CA Document Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our Chartered Accountants inspect your PAN, Shop Act, and rent agreements to ensure 100% error-free filing.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Within 24 Hours
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
              <span className="text-3xl font-black text-[#002B49]/15 absolute right-4 top-4">03</span>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">3. State Portal Submission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Application is officially uploaded to the state Commercial Tax Portal (e.g. Mahagst, e-Prerana) with ARN generation.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Within 48 Hours
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 relative">
              <span className="text-3xl font-black text-[#002B49]/15 absolute right-4 top-4">04</span>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">4. Certificate Issuance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive your digital PTEC/PTRC Registration Certificate with official Tax Identification Number (TIN).
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 3-5 Working Days
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. PENALTIES FOR DELAY & DEFAULT */}
      <section id="sec-penalties" className="py-16 bg-[#FFFDF5] border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              <AlertCircle className="w-3.5 h-3.5" /> Statutory Penal Provisions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              Penalties for Non-Compliance on Professional Tax
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Defaulting on Professional Tax registration, monthly payroll deductions, or return filing attracts heavy statutory penalties imposed by the state commercial tax authorities:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-amber-200 p-6 shadow-xs">
              <div className="text-amber-800 font-extrabold text-lg mb-1">Non-Registration Penalty</div>
              <div className="text-2xl font-black text-rose-600 mb-3">₹5 to ₹20 / Day</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operating a business without obtaining PTEC or PTRC within 30 days of commencement incurs daily fines plus a one-time penalty of up to ₹1,000 to ₹5,000.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-200 p-6 shadow-xs">
              <div className="text-amber-800 font-extrabold text-lg mb-1">Late Payment Interest</div>
              <div className="text-2xl font-black text-rose-600 mb-3">1.25% to 2% / Month</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Failure to deposit deducted PTRC amounts by the statutory monthly deadline attracts compounding interest calculated from the due date until full payment.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-amber-200 p-6 shadow-xs">
              <div className="text-amber-800 font-extrabold text-lg mb-1">Tax Evasion &amp; Fraud</div>
              <div className="text-2xl font-black text-rose-600 mb-3">100% to 300% Penalty</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submitting false employee headcount or evading deductions can lead to a 100%–300% penalty on total tax evaded and notice attachment to company bank accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. WHY CHOOSE BHARATFILING */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight mb-3">
              Why Choose BharatFiling for Professional Tax Registration?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              India’s trusted compliance platform powered by senior Chartered Accountants and automated statutory checks:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0052CC] mx-auto flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-[#002B49] mb-1">ISO 27001</div>
              <div className="text-xs font-bold text-slate-700 uppercase mb-2">Certified Platform</div>
              <p className="text-xs text-slate-500">Bank-grade data encryption and zero-leakage security guarantee.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center font-bold mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-[#002B49] mb-1">48 Hours</div>
              <div className="text-xs font-bold text-slate-700 uppercase mb-2">Guaranteed Filing</div>
              <p className="text-xs text-slate-500">Fast-track submission on state tax portals within 2 business days.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 mx-auto flex items-center justify-center font-bold mb-4">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-[#002B49] mb-1">100% Online</div>
              <div className="text-xs font-bold text-slate-700 uppercase mb-2">No Physical Visits</div>
              <p className="text-xs text-slate-500">Zero visits to commercial tax offices; certificates delivered to your email.</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center font-bold mb-4">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-2xl font-black text-[#002B49] mb-1">500,000+</div>
              <div className="text-xs font-bold text-slate-700 uppercase mb-2">Happy Businesses</div>
              <p className="text-xs text-slate-500">Trusted by founders, sole proprietors, and enterprise payroll teams across India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. COMPREHENSIVE FAQ ACCORDION */}
      <section id="sec-faqs" className="py-16 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0052CC] text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5" /> Common Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Frequently Asked Questions on Professional Tax Registration
            </h2>
          </div>

          <div className="space-y-3.5">
            {PT_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#002B49] transition cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. BOTTOM FLOATING ACTION BAR FOR MOBILE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 shadow-lg z-30 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-slate-500 font-medium">Starting from</div>
          <div className="text-base font-extrabold text-[#002B49]">₹1,499 <span className="text-xs font-normal text-slate-400">+ Govt Fee</span></div>
        </div>
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 rounded-lg bg-[#002B49] text-white font-bold text-sm hover:bg-[#001D33] transition shadow-md cursor-pointer"
        >
          Apply Now
        </button>
      </div>

      {/* 14. VIDEO GUIDE MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="font-bold text-sm">Complete Guide on Professional Tax (PTEC vs PTRC)</span>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                title="Professional Tax Guide"
                src="https://www.youtube.com/embed/-cdRIeuQ-mQ?si=UGzxuqLxKqsk76dn&autoplay=1"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-slate-50 text-xs text-slate-600 flex items-center justify-between">
              <span>Need help applying for your state? Our CA desk is online.</span>
              <button
                type="button"
                onClick={() => {
                  setShowVideoModal(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-md bg-[#002B49] text-white font-bold text-xs"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 15. TERMS & CONDITIONS MODAL */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Terms &amp; Conditions (T&amp;C*)</h3>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 text-xs text-slate-600 space-y-2.5 max-h-80 overflow-y-auto leading-relaxed">
              <p><strong>1. Timeline Guarantee:</strong> 48-hour filing guarantee is valid from the moment all required KYC documents (PAN, Address Proof, Electricity bill, cancelled cheque) are submitted in full without discrepancy.</p>
              <p><strong>2. Government Processing:</strong> Certificate delivery in 5 business days is contingent on state commercial tax portal uptime and local tax officer review. Any portal maintenance or departmental physical verification requests may extend government issuance time.</p>
              <p><strong>3. Statutory Challans:</strong> Professional Tax state challan amounts (e.g. ₹2,500/yr for PTEC in Maharashtra) are statutory government fees paid directly to the State Treasury.</p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-right">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="px-4 py-2 rounded-lg bg-[#002B49] text-white text-xs font-bold hover:bg-[#001D33]"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 16. REFER A FRIEND MODAL */}
      {showReferModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-center">
            <button
              type="button"
              onClick={() => setShowReferModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Refer a Friend &amp; Earn ₹500</h3>
            <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">
              Share your referral code with fellow business owners. When they register for Professional Tax, GST, or FSSAI, you both earn ₹500 credits.
            </p>
            <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-lg font-mono text-sm font-bold text-[#002B49] select-all mb-4">
              BHARAT-PT500
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText('BHARAT-PT500');
                showSuccess('Referral code copied to clipboard!');
                setShowReferModal(false);
              }}
              className="w-full py-2.5 rounded-lg bg-[#002B49] text-white text-xs font-bold hover:bg-[#001D33]"
            >
              Copy Referral Code
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
