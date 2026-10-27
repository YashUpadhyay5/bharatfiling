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
  Key,
  Cpu,
  Lock,
  Globe,
  Truck,
  Video,
  FileSignature,
  FileSpreadsheet,
  Share2,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import {
  DSC_LANGUAGES,
  CERTIFYING_AUTHORITIES,
  DSC_CATEGORIES,
  DSC_TYPES,
  DSC_PLANS,
  HERO_TESTIMONIALS,
  STATUTORY_PORTALS,
  DSC_BENEFITS,
  DSC_DOCUMENTS,
  DSC_PROCEDURE_STEPS,
  DSC_FAQS,
} from './constants.js';

export default function DscLandingPage({ initialData = {}, onGetStarted }) {
  const { showError, showSuccess } = useToast();

  // Lead Form State (1:1 with Screenshot media_1793076544803_d56fffbc.png)
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [cityPincode, setCityPincode] = useState(initialData.cityPincode || '');
  const [selectedLanguage, setSelectedLanguage] = useState(initialData.preferredLanguage || 'en');
  const [whatsappOptIn, setWhatsappOptIn] = useState(
    initialData.whatsappOptIn !== undefined ? initialData.whatsappOptIn : true
  );

  // Modals & Interactive States
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showReferModal, setShowReferModal] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState('individual'); // 'individual' | 'organization' | 'foreign'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [heroTestimonialIdx, setHeroTestimonialIdx] = useState(0);
  const [faqSearch, setFaqSearch] = useState('');
  const [referFriendPhone, setReferFriendPhone] = useState('');

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
        preferredLanguage: selectedLanguage,
        whatsappOptIn,
      });
    }
  };

  const handleReferSubmit = (e) => {
    e.preventDefault();
    if (!referFriendPhone || referFriendPhone.length < 10) {
      showError('Please enter a valid 10-digit phone number');
      return;
    }
    showSuccess('Referral invitation sent! Both you and your friend will receive ₹250 wallet cashback.');
    setShowReferModal(false);
    setReferFriendPhone('');
  };

  const filteredFaqs = DSC_FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Floating Side Badge - Refer a Friend (Matches Screenshot Right Edge) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <button
          onClick={() => setShowReferModal(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-3 py-4 rounded-l-xl shadow-2xl transition-all transform hover:-translate-x-1 border-l-2 border-y-2 border-amber-300"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <Gift className="w-4 h-4 text-slate-950 rotate-90" />
          <span className="text-xs uppercase tracking-wider font-extrabold">Refer a friend</span>
        </button>
      </div>

      {/* TOP HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#002B49] via-[#003B64] to-[#011C30] text-white pt-8 pb-16 overflow-hidden">
        {/* Subtle background circuit/crypto glow */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-sky-200 mb-6">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-sky-300">Digital Signature</span>
            <span>&gt;</span>
            <span className="text-white font-semibold">Class 3 Digital Signature</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Hero Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-sky-900/60 backdrop-blur-sm border border-sky-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-sky-200 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Only ISO 27001 Certified Platform in 🇮🇳</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Class 3 Digital Signature Online
              </h1>

              {/* Checkpoint Value Points (1:1 with Screenshot) */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                    Apply for your Class 3 DSC easily with expert support - 100% online and error-free.{' '}
                    <button
                      onClick={() => setShowTermsModal(true)}
                      className="text-sky-300 underline hover:text-white transition-colors font-semibold"
                    >
                      T&C*
                    </button>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                    Expert guidance ensures a smooth, quick, and accurate DSC registration process.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                    Complete your application remotely with fast processing and expert support.
                  </p>
                </div>
              </div>

              {/* Left Testimonial Card (Matches Screenshot Siddharth Rao Card) */}
              <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 shadow-xl max-w-xl">
                <div className="flex items-start gap-4">
                  {/* Avatar Circle */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-900 font-extrabold flex items-center justify-center shrink-0 text-lg shadow-md border-2 border-white/30">
                    {HERO_TESTIMONIALS[heroTestimonialIdx].name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-100 italic leading-relaxed">
                      "{HERO_TESTIMONIALS[heroTestimonialIdx].quote}"
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {HERO_TESTIMONIALS[heroTestimonialIdx].name}
                        </h4>
                        <p className="text-xs text-sky-200">
                          {HERO_TESTIMONIALS[heroTestimonialIdx].role} • {HERO_TESTIMONIALS[heroTestimonialIdx].city}
                        </p>
                      </div>

                      {/* Carousel Indicator Dots */}
                      <div className="flex items-center gap-1.5">
                        {HERO_TESTIMONIALS.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setHeroTestimonialIdx(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              heroTestimonialIdx === idx ? 'bg-amber-400 w-6' : 'bg-white/40 hover:bg-white/60'
                            }`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Lead Capture Form Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 text-slate-800">
                {/* Diwali Festive Ribbon Banner */}
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 px-4 py-2 text-center text-xs font-black tracking-wide uppercase flex items-center justify-center gap-2 shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
                  <span>Diwali Festive Sale Offer • Flat 40% Off</span>
                  <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
                </div>

                <div className="p-6 sm:p-7">
                  <div className="mb-5">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">Get Started!</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Complete Class 3 DSC in 24 hours with pre-loaded USB FIPS token.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition-all placeholder:text-slate-400"
                        required
                      />
                    </div>

                    {/* Mobile Number Input with +91 Prefix */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-xs font-semibold text-slate-600 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="Mobile Number"
                          className="w-full px-3.5 py-2.5 text-sm rounded-r-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition-all placeholder:text-slate-400"
                          required
                        />
                      </div>
                    </div>

                    {/* City / Pincode Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">City/Pincode</label>
                      <input
                        type="text"
                        value={cityPincode}
                        onChange={(e) => setCityPincode(e.target.value)}
                        placeholder="City/Pincode"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition-all placeholder:text-slate-400"
                      />
                    </div>

                    {/* Language Dropdown Selector (New Field from Screenshot) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Language</label>
                      <div className="relative">
                        <select
                          value={selectedLanguage}
                          onChange={(e) => setSelectedLanguage(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                        >
                          {DSC_LANGUAGES.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Our DSC Compliance Officer will communicate in your chosen language.
                      </p>
                    </div>

                    {/* WhatsApp Opt-in Switch */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                          W
                        </span>
                        <span className="text-xs text-slate-600 font-medium">
                          Get easy updates through <span className="font-bold text-slate-800">Whatsapp</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setWhatsappOptIn(!whatsappOptIn)}
                        className={`w-10 h-6 flex items-center rounded-full p-1 duration-200 cursor-pointer ${
                          whatsappOptIn ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                        aria-label="Toggle WhatsApp updates"
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${
                            whatsappOptIn ? 'translate-x-4' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* CTA Button */}
                    <button
                      type="submit"
                      className="w-full mt-4 bg-[#002B49] hover:bg-[#003B64] text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-base group"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>

                  {/* Micro Trust Guarantee */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" /> 256-Bit SSL Encrypted
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-sky-600" /> CCA Licensed CAs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RATINGS & TRUST STRIP (1:1 with Screenshot below Hero) */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Trusted on Google & Playstore &mdash; BharatFiling, India's No.1 Legal-Tech Platform
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              A leading legal-tech platform delivering reliable and expert services nationwide since 2010.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-center">
            {/* Google Reviews */}
            <div className="flex items-center justify-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-red-500 font-extrabold text-xl border border-slate-100">
                G
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm font-black">
                  <span>4.5/5</span>
                  <span>★★★★★</span>
                </div>
                <p className="text-xs text-slate-600 font-semibold">20k+ Happy Reviews on Google</p>
              </div>
            </div>

            {/* Voted No. 1 in India Laurel Badge */}
            <div className="flex items-center justify-center gap-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <Award className="w-9 h-9 text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-extrabold text-amber-900 tracking-wider uppercase">
                  4,000+ Reviews
                </p>
                <p className="text-sm font-black text-slate-900">VOTED NO. 1 IN INDIA</p>
              </div>
            </div>

            {/* Google Playstore */}
            <div className="flex items-center justify-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-500 font-extrabold text-lg border border-slate-100">
                ▶
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm font-black">
                  <span>4.5/5</span>
                  <span>★★★★★</span>
                </div>
                <p className="text-xs text-slate-600 font-semibold">1 Lakh+ App Downloads</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY IN-PAGE NAVIGATION BAR */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-3 gap-6 text-xs sm:text-sm font-semibold text-slate-600 no-scrollbar">
            <a href="#overview" className="hover:text-[#002B49] whitespace-nowrap transition-colors">
              Overview
            </a>
            <a href="#types" className="hover:text-[#002B49] whitespace-nowrap transition-colors">
              Types
            </a>
            <a href="#benefits" className="hover:text-[#002B49] whitespace-nowrap transition-colors">
              Benefits
            </a>
            <a href="#checklist" className="hover:text-[#002B49] whitespace-nowrap transition-colors">
              Checklist
            </a>
            <a href="#procedure" className="hover:text-[#002B49] whitespace-nowrap transition-colors">
              Procedure
            </a>
            <a href="#documents" className="hover:text-[#002B49] whitespace-nowrap transition-colors">
              Documents Required
            </a>
            <a href="#why-bharatfiling" className="hover:text-[#002B49] whitespace-nowrap transition-colors">
              Why BharatFiling
            </a>
            <a href="#faqs" className="hover:text-[#002B49] whitespace-nowrap transition-colors">
              FAQs
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#002B49] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-[#003B64] transition-all ml-auto shrink-0"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: OVERVIEW */}
      <section id="overview" className="py-14 sm:py-20 bg-slate-50 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-black tracking-wider uppercase text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Statutory Framework & IT Act 2000
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                What is a Class 3 Digital Signature Certificate?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A <strong>Class 3 Digital Signature Certificate (DSC)</strong> is the highest assurance digital identity
                issued under the regulatory guidelines of the <strong>Controller of Certifying Authorities (CCA)</strong>,
                Ministry of Electronics and Information Technology (MeitY), Government of India.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Under the provisions of <strong>Sections 5 and 10A of the Information Technology Act, 2000</strong>, a
                digital signature carries the identical legal sanctity as a physical handwritten signature. As per statutory
                mandates, <em>Class 2 certificates have been discontinued</em>, making Class 3 the sole mandatory standard
                for all statutory compliances, e-tenders, MCA submissions, and tax audits across India.
              </p>

              {/* Stat Callouts */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                  <p className="text-2xl font-black text-[#002B49]">100%</p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Paperless & Online</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                  <p className="text-2xl font-black text-[#002B49]">10 Sec</p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Live Video KYC</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-center shadow-xs">
                  <p className="text-2xl font-black text-[#002B49]">24-48h</p>
                  <p className="text-xs text-slate-500 font-semibold mt-1">Doorstep Token Courier</p>
                </div>
              </div>
            </div>

            {/* Right Card: Portals Mandating Class 3 */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-lg">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <Globe className="w-5 h-5 text-sky-600" />
                  <h3 className="font-extrabold text-slate-900 text-base">Key Government Portals Requiring Class 3 DSC</h3>
                </div>
                <div className="space-y-2.5">
                  {STATUTORY_PORTALS.map((portal, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50/50 transition-colors border border-slate-100"
                    >
                      <span className="text-xs font-bold text-slate-800">{portal.name}</span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          portal.badge.includes('Combo')
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {portal.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TYPES COMPARISON TABLE */}
      <section id="types" className="py-14 sm:py-20 bg-white scroll-mt-14 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black tracking-wider uppercase text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
              Certificate Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              Class 3 Signing Only vs Signing & Encryption Combo
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Select the exact digital signature classification tailored to your statutory filing or tender submission requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Signing Only Card */}
            <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-extrabold text-sky-700 bg-sky-100 px-2.5 py-1 rounded-md uppercase">
                    Class 3A
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">Class 3 Signing Only</h3>
                  <p className="text-xs text-slate-500 mt-1">Single signing certificate pre-loaded in USB token</p>
                </div>
                <FileSignature className="w-10 h-10 text-sky-700 shrink-0" />
              </div>

              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-700 leading-relaxed">
                  Used for authenticating identity and signing digital forms, PDF documents, and financial submissions. Guarantees that the document has not been altered post-signature.
                </p>

                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider pt-2">
                  Permitted Portal Filings:
                </h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>MCA21 / ROC:</strong> Company & LLP incorporations, SPICe+, DIR-3 KYC, AOC-4, MGT-7</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>Income Tax:</strong> ITR-V e-verification, statutory tax audit reports, response to notices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>GST Portal:</strong> GST registration authentication, monthly GSTR-1 & GSTR-3B filings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>EPFO & ICEGATE:</strong> Employer PF submissions, customs clearance & shipping bill signing</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 line-through">₹2,499</span>
                  <span className="text-2xl font-black text-[#002B49] ml-2">₹1,499</span>
                  <span className="text-[11px] text-emerald-600 font-bold ml-1">40% OFF</span>
                </div>
                <button
                  onClick={() => onGetStarted && onGetStarted({ plan: 'signing' })}
                  className="bg-[#002B49] hover:bg-[#003B64] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  Select Signing Only
                </button>
              </div>
            </div>

            {/* Combo Card (Recommended) */}
            <div className="bg-gradient-to-br from-sky-900 to-[#002B49] text-white rounded-3xl p-7 shadow-xl relative border-2 border-amber-400">
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                Recommended for Tenders & GeM
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-extrabold text-amber-300 bg-white/10 px-2.5 py-1 rounded-md uppercase">
                    Class 3B Combo
                  </span>
                  <h3 className="text-xl font-black text-white mt-2">Signing + Encryption Combo</h3>
                  <p className="text-xs text-sky-200 mt-1">Dual certificates (Signing & Encryption) in one token</p>
                </div>
                <Lock className="w-10 h-10 text-amber-400 shrink-0" />
              </div>

              <div className="mt-5 space-y-3">
                <p className="text-xs text-sky-100 leading-relaxed">
                  Contains two cryptographic certificates: one for digital signing and a second 2048-bit encryption certificate. Mandatory by law to prevent anyone from reading commercial bids before the opening date.
                </p>

                <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider pt-2">
                  Mandatory For All e-Procurement:
                </h4>
                <ul className="text-xs text-sky-100 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>GeM (Govt e-Marketplace):</strong> Vendor registration, bid submissions, auction bidding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>CPPP & State Portals:</strong> Central & State government tenders (e-Procurement)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Railways & Defense:</strong> IREPS tender participation, MES, ONGC, BHEL, and PSU bids</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Includes All Class 3A Uses:</strong> Also fully valid for MCA, Tax, GST, and EPFO filings</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-xs text-sky-300 line-through">₹3,999</span>
                  <span className="text-2xl font-black text-white ml-2">₹2,499</span>
                  <span className="text-[11px] text-amber-300 font-bold ml-1">37% OFF</span>
                </div>
                <button
                  onClick={() => onGetStarted && onGetStarted({ plan: 'combo' })}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-md"
                >
                  Select Combo Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BENEFITS */}
      <section id="benefits" className="py-14 sm:py-20 bg-slate-50 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black tracking-wider uppercase text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
              Why Upgrade to Class 3
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              Unmatched Security, Integrity, and Convenience
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Engineered with asymmetric cryptography and military-grade FIPS token hardware to protect your digital identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DSC_BENEFITS.map((b, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
                  {b.icon === 'scale' && <Scale className="w-5 h-5 text-[#002B49]" />}
                  {b.icon === 'zap' && <Sparkles className="w-5 h-5 text-[#002B49]" />}
                  {b.icon === 'video' && <Video className="w-5 h-5 text-[#002B49]" />}
                  {b.icon === 'lock' && <Lock className="w-5 h-5 text-[#002B49]" />}
                  {b.icon === 'shield-check' && <ShieldCheck className="w-5 h-5 text-[#002B49]" />}
                  {b.icon === 'truck' && <Truck className="w-5 h-5 text-[#002B49]" />}
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2">{b.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CHECKLIST */}
      <section id="checklist" className="py-14 sm:py-20 bg-white scroll-mt-14 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-black tracking-wider uppercase text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Pre-Application Checklist
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                Things You Need Ready Before Applying
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Applying for your Class 3 DSC takes only a few minutes when you have these basic items ready. No physical printouts or courier paperwork needed.
              </p>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <strong>Important Note:</strong> Mobile number must be linked with your Aadhaar for instant OTP verification. If unlinked, our CA will assist you with PAN Paperless mode.
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-3">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <CheckSquare className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">1. Original PAN Card</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Must be physically available to show during the 10-second live Video KYC verification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <CheckSquare className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">2. Active Aadhaar Card + Linked Mobile</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      To receive the 6-digit Aadhaar OTP for paperless e-KYC authentication.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <CheckSquare className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">3. Working Smartphone Camera or Laptop Webcam</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      For recording the 10-second statutory video clip reading out the verification digits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <CheckSquare className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">4. For Organization DSC: Board Resolution & COI</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Company PAN, Certificate of Incorporation, and Board Resolution on company letterhead.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PROCEDURE ROADMAP */}
      <section id="procedure" className="py-14 sm:py-20 bg-slate-50 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black tracking-wider uppercase text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
              4-Step Simple Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              How to Obtain Your Class 3 DSC Online
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              From online application to cryptographic token delivery at your doorstep in 4 transparent stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DSC_PROCEDURE_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-sky-800/40 block mb-3 font-mono">{step.step}</span>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#002B49]">
                  <span>Step {idx + 1} of 4</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: DOCUMENTS REQUIRED TABS */}
      <section id="documents" className="py-14 sm:py-20 bg-white scroll-mt-14 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-black tracking-wider uppercase text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
              Documentation Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              Documents Required for Class 3 DSC
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Switch between tabs below to view the precise document requirements for each entity type.
            </p>
          </div>

          {/* Entity Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => setActiveDocTab('individual')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeDocTab === 'individual'
                    ? 'bg-[#002B49] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Individual DSC
              </button>
              <button
                onClick={() => setActiveDocTab('organization')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeDocTab === 'organization'
                    ? 'bg-[#002B49] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Company / LLP / Org
              </button>
              <button
                onClick={() => setActiveDocTab('foreign')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeDocTab === 'foreign'
                    ? 'bg-[#002B49] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Foreign National / NRI
              </button>
            </div>
          </div>

          {/* Active Documents Grid */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 max-w-4xl mx-auto">
            <div className="mb-6 pb-4 border-b border-slate-200">
              <h3 className="text-lg font-black text-slate-900">{DSC_DOCUMENTS[activeDocTab].title}</h3>
              <p className="text-xs text-slate-500 mt-1">{DSC_DOCUMENTS[activeDocTab].description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DSC_DOCUMENTS[activeDocTab].items.map((doc, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3">
                  <FileText className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{doc.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY BHARATFILING */}
      <section id="why-bharatfiling" className="py-14 sm:py-20 bg-slate-50 scroll-mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black tracking-wider uppercase text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
              Why BharatFiling
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              India's Most Trusted Digital Signature Partner
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Official Registration Authority affiliated with leading Controller of Certifying Authorities (CCA) licensed CAs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center mx-auto mb-4 text-xl">
                ✓
              </div>
              <h4 className="text-base font-extrabold text-slate-900">Direct CCA Affiliation</h4>
              <p className="text-xs text-slate-600 mt-2">
                Official RA with eMudhra, Capricorn, VSign, and Pantasign for guaranteed instant issuance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-800 font-black flex items-center justify-center mx-auto mb-4 text-xl">
                ⚡
              </div>
              <h4 className="text-base font-extrabold text-slate-900">24-48 Hr Express Delivery</h4>
              <p className="text-xs text-slate-600 mt-2">
                Pre-configured FIPS USB token dispatched via Bluedart/Speed Post with real-time tracking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 font-black flex items-center justify-center mx-auto mb-4 text-xl">
                ★
              </div>
              <h4 className="text-base font-extrabold text-slate-900">1,50,000+ DSCs Issued</h4>
              <p className="text-xs text-slate-600 mt-2">
                Trusted by directors, CAs, lawyers, contractors, and startups across 700+ Indian districts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-800 font-black flex items-center justify-center mx-auto mb-4 text-xl">
                🎧
              </div>
              <h4 className="text-base font-extrabold text-slate-900">Free Remote Tech Support</h4>
              <p className="text-xs text-slate-600 mt-2">
                Complete assistance with USB token driver installation, Java configuration, and browser setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQS */}
      <section id="faqs" className="py-14 sm:py-20 bg-white scroll-mt-14 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-black tracking-wider uppercase text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              Everything You Need to Know About Class 3 DSC
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Browse questions below or search for specific information about validity, video KYC, and USB tokens.
            </p>

            {/* FAQ Search Bar */}
            <div className="mt-6 max-w-md mx-auto relative">
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQs (e.g. Video KYC, token, e-tendering)..."
                className="w-full px-4 py-2.5 pl-10 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-50 hover:bg-slate-100/70 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-sky-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BOTTOM FLOATING / FIXED ACTION BANNER */}
      <section className="bg-gradient-to-r from-[#002B49] to-[#003B64] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black">Need Your Digital Signature Today?</h3>
            <p className="text-xs sm:text-sm text-sky-200 mt-1">
              Complete paperless Aadhaar e-KYC and 10-second Video KYC in under 5 minutes.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl text-sm transition-all shadow-lg flex items-center gap-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* MODAL: TERMS & CONDITIONS */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900">Terms & Conditions &mdash; Class 3 DSC</h3>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs text-slate-600 max-h-80 overflow-y-auto pr-1">
              <p>
                1. <strong>Statutory Compliance:</strong> Digital signatures are issued strictly in compliance with CCA guidelines under the Information Technology Act, 2000.
              </p>
              <p>
                2. <strong>Verification Mandate:</strong> Video KYC recording and Aadhaar/PAN validation are mandatory for certificate generation. Rejection of KYC by the Certifying Authority will require re-recording.
              </p>
              <p>
                3. <strong>Hardware Token:</strong> Certificates are issued on FIPS 140-2 Level 2 USB tokens. Delivery timelines depend on courier logistics and regional availability.
              </p>
              <p>
                4. <strong>Money Back Guarantee:</strong> If the DSC cannot be issued due to non-clearance from the CA after compliant documentation, a 100% refund is processed.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setShowTermsModal(false)}
                className="bg-[#002B49] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#003B64]"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REFER A FRIEND */}
      {showReferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-black text-slate-900">Refer a Friend & Earn ₹250</h3>
              </div>
              <button
                onClick={() => setShowReferModal(false)}
                className="text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3">
              Invite a business associate or friend who needs a Class 3 DSC, GST, or Company Registration. You both get ₹250 wallet credits!
            </p>
            <form onSubmit={handleReferSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Friend's Mobile Number</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-xs font-semibold text-slate-600 bg-slate-100 border border-r-0 border-slate-300 rounded-l-xl">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={referFriendPhone}
                    onChange={(e) => setReferFriendPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="10-digit mobile"
                    className="w-full px-3 py-2 text-xs rounded-r-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Send Referral Link</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
