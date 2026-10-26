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
  Store,
  MapPin,
  Stamp,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import {
  SHOP_PLANS,
  SHOP_STATES,
  SHOP_DOCUMENTS,
  SHOP_BENEFITS,
  SHOP_FAQS,
  HERO_TESTIMONIALS,
  ESTABLISHMENT_TYPES,
  TRUSTED_PARTNERS,
} from './constants.js';

export default function ShopLandingPage({ initialData = {}, onGetStarted }) {
  const { showError, showSuccess } = useToast();

  // Lead Form State (1:1 with Screenshot media_1793011750698_467b038e.png)
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [cityPincode, setCityPincode] = useState(initialData.cityPincode || '');
  const [whatsappOptIn, setWhatsappOptIn] = useState(
    initialData.whatsappOptIn !== undefined ? initialData.whatsappOptIn : true
  );

  // Modals & Interactive States
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSampleCertModal, setShowSampleCertModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showReferModal, setShowReferModal] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState('proprietorship'); // 'proprietorship' | 'partnership' | 'company'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedStateTab, setSelectedStateTab] = useState('maharashtra');
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
  const filteredStates = SHOP_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
      s.popularTerm.toLowerCase().includes(stateSearch.toLowerCase()) ||
      s.actName.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const activeStateObj =
    SHOP_STATES.find((s) => s.id === selectedStateTab) || SHOP_STATES[0];

  const currentHeroReview = HERO_TESTIMONIALS[heroTestimonialIdx] || HERO_TESTIMONIALS[0];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* 1. TOP ANNOUNCEMENT BAR (Exact from Screenshot: Now you can read this page in Hindi) */}
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
              {isHindi ? 'दुकान एवं प्रतिष्ठान पंजीकरण (Shop and Establishment Registration)' : 'Shop and Establishment Certificate Registration in India'}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" /> ISO 27001 Certified Statutory Platform
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">State Labour Department Desk</span>
          </div>
        </div>
      </div>

      {/* 3. HERO SECTION (1:1 EXACT MATCH OF SCREENSHOT media_1793011750698_467b038e.png) */}
      <section className="relative bg-gradient-to-b from-[#F7FAFD] via-white to-white pt-8 pb-14 border-b border-slate-200 overflow-hidden">
        
        {/* Floating Right Ribbon: Refer a friend with Gift Icon */}
        <button
          onClick={() => setShowReferModal(true)}
          className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-2 py-4 rounded-l-lg shadow-lg flex-col items-center gap-2 cursor-pointer transition transform hover:-translate-x-1"
          style={{ writingMode: 'vertical-rl' }}
          title="Refer a friend and earn statutory fee cashback"
        >
          <Gift className="w-4 h-4 text-slate-900 rotate-90" />
          <span className="text-xs tracking-wider">Refer a friend</span>
        </button>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Trust Badge, H1, Value Bullets, Video Guide & Sample Certificate */}
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
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#022B50] leading-tight tracking-tight">
                Shop and Establishment<br />
                Certificate Registration in India
              </h1>

              {/* 3 Key Checkmarks (Exact Wording from Screenshot) */}
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#022B50] flex-shrink-0">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <p className="text-sm sm:text-base text-[#002F5F] leading-snug">
                    Get your Shop and Establishment License with expert support. Stay legally compliant.{' '}
                    <button
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="text-[#0052CC] hover:underline cursor-pointer font-medium"
                    >
                      T&amp;C*
                    </button>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#022B50] flex-shrink-0">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <p className="text-sm sm:text-base text-[#002F5F] leading-snug">
                    Complete documentation and registration handled efficiently by senior legal experts.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#022B50] flex-shrink-0">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <p className="text-sm sm:text-base text-[#002F5F] leading-snug">
                    Trusted by 35,000+ businesses since 2011 for seamless Shop and Establishment registrations.
                  </p>
                </div>
              </div>

              {/* Action Links: Video Guide & Sample Certificate (Exact from Screenshot) */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#022B50] hover:text-[#0052CC] transition cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#022B50] text-white flex items-center justify-center group-hover:bg-[#0052CC] transition">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </div>
                  <span className="underline decoration-slate-300 underline-offset-4 group-hover:decoration-[#0052CC]">
                    Complete guide on Shop and Establishment
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSampleCertModal(true)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#022B50] hover:text-[#0052CC] transition cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded border border-slate-300 text-slate-700 flex items-center justify-center group-hover:border-[#0052CC] group-hover:text-[#0052CC] transition">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="underline decoration-slate-300 underline-offset-4 group-hover:decoration-[#0052CC]">
                    View sample Certificate / Agreement
                  </span>
                </button>
              </div>

              {/* Customer Review Card (Interactive Carousel) */}
              <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs max-w-xl">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <div className="flex items-center gap-1 text-amber-500">
                    {'★'.repeat(currentHeroReview.rating)}
                    <span className="ml-1 text-slate-700 font-bold">{currentHeroReview.rating}.0 / 5</span>
                  </div>
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                    {currentHeroReview.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{currentHeroReview.quote}"
                </p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900">{currentHeroReview.name}</span>
                    <span className="text-slate-500"> &mdash; {currentHeroReview.company}</span>
                  </div>
                  <div className="flex gap-1">
                    {HERO_TESTIMONIALS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setHeroTestimonialIdx(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          heroTestimonialIdx === idx ? 'bg-[#002B49] w-4' : 'bg-slate-300'
                        }`}
                        aria-label={`Review ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Lead Form Card with Diwali Offer Ribbon (1:1 with Screenshot) */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              
              {/* Diwali Festive Ribbon (Exact from Screenshot: Hanging off top of card) */}
              <div className="absolute -top-4 left-6 z-20 flex items-center gap-1.5 bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded shadow-md transform -rotate-1">
                <span className="text-base">🪔</span>
                <span>Diwali Festive Sale Offer</span>
                <span className="text-xs">✨</span>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8 pt-8">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 placeholder-slate-400 outline-none transition"
                    />
                  </div>

                  {/* Mobile Number Input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="Mobile Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 placeholder-slate-400 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* City/Pincode Input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">
                      City/Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="City/Pincode"
                      value={cityPincode}
                      onChange={(e) => setCityPincode(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#002B49] focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 placeholder-slate-400 outline-none transition"
                    />
                  </div>

                  {/* WhatsApp Updates Opt-in Toggle (Exact from Screenshot) */}
                  <div className="flex items-center justify-between pt-1 pb-1">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5">
                      Get easy updates through{' '}
                      <span className="inline-flex items-center gap-1 text-[#25D366] font-semibold">
                        <svg className="w-4 h-4 fill-current inline" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-2.129-.533-1.442-.602-2.368-2.072-2.439-2.167-.071-.096-.583-.775-.583-1.478 0-.703.368-1.049.5-1.192.131-.143.287-.179.382-.179.096 0 .191.002.275.006.088.005.207-.033.324.249.12.288.409 1.001.445 1.074.036.073.06.157.012.253-.048.096-.072.156-.144.239-.072.083-.151.186-.216.25-.072.072-.147.151-.064.294.084.144.372.613.8 1.001.551.498 1.016.654 1.16.726.144.072.228.06.312-.036.084-.096.36-419.456-.563.096-.144.192-.12.324-.072.132.048.84.396.984.468.144.072.24.108.276.168.036.06.036.348-.108.753z"/>
                        </svg>
                        Whatsapp
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setWhatsappOptIn(!whatsappOptIn)}
                      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        whatsappOptIn ? 'bg-[#25D366]' : 'bg-slate-300'
                      }`}
                      role="switch"
                      aria-checked={whatsappOptIn}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          whatsappOptIn ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Get Started CTA Button (Exact from Screenshot) */}
                  <button
                    type="submit"
                    className="w-full bg-[#022B50] hover:bg-[#001D38] text-white font-semibold py-3.5 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 cursor-pointer text-center text-base"
                  >
                    Get Started
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    🔒 SSL Encrypted &bull; 100% Confidential &bull; ISO 27001 Certified
                  </p>
                </form>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. TRUSTED PARTNERS (Exact from Screenshot & Vakilsearch) */}
      <section className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#022B50] tracking-tight mb-8">
            Trusted Partners
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center justify-center opacity-80">
            {TRUSTED_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white py-3 px-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-center h-14 hover:shadow-sm transition"
              >
                <span className="font-bold text-slate-700 text-sm tracking-wide">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS & WHY BHARATFILING */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#022B50]">35,000+</div>
              <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Shop Licenses Delivered</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#022B50]">4.9 / 5</div>
              <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Customer Satisfaction</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#022B50]">2 - 5 Days</div>
              <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Average Processing TAT</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#022B50]">100%</div>
              <div className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Online Government Approval</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT IS SHOP & ESTABLISHMENT - OVERVIEW & DEFINITION */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded mb-3">
              STATUTORY FRAMEWORK
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#022B50] tracking-tight">
              Shop and Establishment Certificate &mdash;{' '}
              <span className="text-[#007AFF]">An Overview</span>
            </h2>
            <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              The <strong>Shop and Establishment Act</strong> is a state legislation enacted to govern the working conditions,
              rights, and operational hours of employees in commercial businesses and retail establishments across India.
              Popularly known as the <strong>Gumasta License</strong> in Maharashtra and Gujarat, or <strong>e-Karmika</strong> in Karnataka,
              this registration certificate is a legal prerequisite for operating any commercial premises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {ESTABLISHMENT_TYPES.map((type) => (
              <div
                key={type.id}
                className="p-5 rounded-xl border border-slate-200 bg-[#F9FBFC] hover:bg-white hover:shadow-md transition"
              >
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded">
                  {type.badge}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-3">{type.title}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{type.description}</p>
                <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 font-medium">
                  {type.statute}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BENEFITS OF SHOP & ESTABLISHMENT CERTIFICATE */}
      <section className="py-14 bg-[#F8FAFD] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#022B50] tracking-tight">
              <span className="text-[#007AFF]">Benefits</span> of Shop and Establishment Certificate for Businesses
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Securing statutory registration is not just a regulatory formality &mdash; it forms the backbone of commercial legitimacy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHOP_BENEFITS.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-md transition"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0052CC] flex items-center justify-center font-bold mb-4">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{benefit.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. STATE-WISE GUMASTA & SHOP ACT RULES */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">STATE-BY-STATE JURISDICTIONS</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#022B50] tracking-tight mt-1">
                State-Specific <span className="text-[#007AFF]">Shop Act &amp; Gumasta Provisions</span>
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Select your state to explore local municipal portals, validity durations, and nameboard language mandates.
              </p>
            </div>

            {/* State Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search state..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* State List / Buttons */}
            <div className="lg:col-span-4 space-y-2 max-h-96 overflow-y-auto pr-2 border-r border-slate-100">
              {filteredStates.map((state) => (
                <button
                  key={state.id}
                  onClick={() => setSelectedStateTab(state.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition cursor-pointer flex items-center justify-between ${
                    selectedStateTab === state.id
                      ? 'bg-[#022B50] text-white shadow-sm'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{state.name}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded ${
                    selectedStateTab === state.id ? 'bg-blue-900 text-blue-200' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {state.popularTerm.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected State Details Card */}
            <div className="lg:col-span-8 bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#022B50]">{activeStateObj.name}</h3>
                  <p className="text-xs font-semibold text-blue-700">{activeStateObj.popularTerm}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                    TAT: {activeStateObj.tat}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="font-semibold text-slate-500 block">Governing Legislation:</span>
                  <p className="text-slate-800 mt-0.5 font-medium">{activeStateObj.actName}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block">Official Portal:</span>
                  <p className="text-slate-800 mt-0.5 font-medium">{activeStateObj.portal}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block">Certificate Validity:</span>
                  <p className="text-slate-800 mt-0.5 font-medium">{activeStateObj.validity}</p>
                </div>
                <div>
                  <span className="font-semibold text-slate-500 block">Key Municipal Bodies:</span>
                  <p className="text-slate-800 mt-0.5 font-medium">{activeStateObj.statutoryBodies.join(', ')}</p>
                </div>
              </div>

              {/* Special Nameboard Rule Alert */}
              <div className="mt-4 p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                <span className="font-bold flex items-center gap-1.5 mb-1 text-amber-800">
                  <AlertCircle className="w-4 h-4" /> Regional Signage &amp; Nameboard Rule:
                </span>
                {activeStateObj.nameboardRule}
              </div>

              {/* Under 10 workers rule */}
              <div className="mt-3 p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
                <span className="font-bold flex items-center gap-1.5 mb-1 text-blue-800">
                  <Award className="w-4 h-4" /> Micro Establishment Provision:
                </span>
                {activeStateObj.zeroToNineRule}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const topForm = document.querySelector('form');
                    if (topForm) topForm.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#022B50] hover:bg-[#001D38] text-white text-xs font-semibold px-5 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm transition"
                >
                  Apply in {activeStateObj.name} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 9. DOCUMENTS REQUIRED TABBED CHECKLIST */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">PAPERWORK CHECKLIST</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#022B50] tracking-tight mt-1">
              Documents Required for <span className="text-[#007AFF]">Shop and Establishment Certificate</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Only clear scanned copies or photographs are required. No physical couriering or office visits needed.
            </p>

            {/* Tab selector */}
            <div className="inline-flex p-1 bg-slate-200 rounded-xl mt-6">
              {[
                { id: 'proprietorship', label: 'Sole Proprietorship' },
                { id: 'partnership', label: 'Partnership / LLP' },
                { id: 'company', label: 'Private Limited / OPC' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDocTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    activeDocTab === tab.id
                      ? 'bg-white text-[#022B50] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOP_DOCUMENTS[activeDocTab].map((doc, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md transition flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0052CC] flex items-center justify-center flex-shrink-0 font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. STEP-BY-STEP PROCESS */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#022B50] tracking-tight">
              Shop and Establishment Certificate <span className="text-[#007AFF]">Registration Process</span> in India
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Frictionless 5-step digital onboarding overseen by statutory labor law experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Online Application',
                desc: 'Fill your business details, address, and employee headcount in under 2 minutes.',
              },
              {
                step: '02',
                title: 'Doc Verification',
                desc: 'Our legal experts verify utility bills, rent deeds, and regional nameboard photos.',
              },
              {
                step: '03',
                title: 'Government Filing',
                desc: 'Submission on official state municipal/labour portal with government challan generation.',
              },
              {
                step: '04',
                title: 'Inspector Scrutiny',
                desc: 'We liaise with labor department officers to resolve technical queries or ward checks.',
              },
              {
                step: '05',
                title: 'Certificate Issuance',
                desc: 'Digital government certificate with QR code issued and emailed directly to your dashboard.',
              },
            ].map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#F8FAFD] border border-slate-200 text-left relative overflow-hidden"
              >
                <div className="text-3xl font-extrabold text-blue-200">{st.step}</div>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{st.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FAQS ACCORDION (Inspected directly from Vakilsearch) */}
      <section className="py-14 bg-[#FAFBFD] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#022B50] tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear answers to the most common queries regarding Shop and Establishment / Gumasta registration.
            </p>
          </div>

          <div className="space-y-3">
            {SHOP_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between text-sm sm:text-base font-semibold text-slate-800 hover:text-[#0052CC] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 ml-4 flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-[#0052CC]" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. BOTTOM STICKY / FLOATING MOBILE CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 shadow-lg z-30 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-slate-900">Shop Act Registration</div>
          <div className="text-[11px] text-emerald-600 font-semibold">Starts @ ₹1,999 + Govt Fees</div>
        </div>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-[#022B50] text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer shadow"
        >
          Get Started
        </button>
      </div>

      {/* MODAL 1: VIDEO GUIDE MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3 text-[#022B50]">
              <Play className="w-5 h-5 fill-[#022B50]" />
              <h3 className="text-lg font-bold">Complete Video Guide: Shop &amp; Establishment License</h3>
            </div>
            <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
              <p className="text-sm font-semibold text-center">Interactive Visual Walkthrough</p>
              <p className="text-xs text-slate-300 text-center mt-1 max-w-md">
                Learn how Maharashtra Gumasta, Delhi Shop Act, and Karnataka e-Karmika certificates are issued 100% online in 3 to 5 business days.
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">Duration: 3m 45s &bull; Updated for FY 2026-27</span>
              <button
                onClick={() => setShowVideoModal(false)}
                className="bg-[#022B50] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SAMPLE CERTIFICATE MODAL */}
      {showSampleCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSampleCertModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-3 text-[#022B50]">
              <FileText className="w-5 h-5 text-[#0052CC]" />
              <h3 className="text-lg font-bold">Sample Shop &amp; Establishment Certificate</h3>
            </div>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 bg-amber-50/30 text-center relative overflow-hidden">
              <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">GOVERNMENT OF MAHARASHTRA / DELHI / KARNATAKA</div>
              <div className="text-sm font-extrabold text-[#022B50] mt-1">FORM 'G' / FORM 'C' REGISTRATION CERTIFICATE</div>
              <div className="text-[11px] text-slate-500">Under Shops and Commercial Establishments Act</div>
              
              <div className="my-6 p-4 bg-white rounded border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Registration No:</span>
                  <span className="font-mono font-bold text-slate-800">SE-MH-2026-0089410</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Name of Enterprise:</span>
                  <span className="font-bold text-slate-800">Apex InnovEdge Technologies LLP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Category:</span>
                  <span className="font-bold text-slate-800">Commercial Establishment (IT)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Validity:</span>
                  <span className="font-bold text-emerald-700">Permanent / Valid until 2031</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                <Stamp className="w-5 h-5 text-blue-700" />
                <span className="font-semibold text-slate-600">Statutory Digital QR &amp; Seal Verified</span>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowSampleCertModal(false)}
                className="bg-[#022B50] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: T&C MODAL */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-slate-900 mb-2">Terms &amp; Conditions (T&amp;C*)</h3>
            <div className="text-xs text-slate-600 space-y-2 max-h-72 overflow-y-auto pr-2 leading-relaxed">
              <p>
                1. <strong>Statutory State Fees:</strong> Professional fees charged by BharatFiling cover form drafting, legal compliance review, document preparation, and government liaising. Official municipal state government challan fees vary by state and employee count and are payable as per state rules.
              </p>
              <p>
                2. <strong>Turnaround Time (TAT):</strong> 48 to 72 hours TAT applies to application submission on the state portal. Government certificate generation timelines depend on the respective state labour department portal server uptime and physical inspection requirements if applicable.
              </p>
              <p>
                3. <strong>Nameboard Compliance:</strong> The applicant agrees to display the business signage in the mandatory state language as required by local municipal bylaws (e.g. Marathi in Maharashtra, Kannada in Karnataka).
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowTermsModal(false)}
                className="bg-[#022B50] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: REFER A FRIEND MODAL */}
      {showReferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowReferModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2 text-amber-600">
              <Gift className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Refer a Fellow Business Owner</h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Share your referral link with friends opening shops or offices. They get ₹500 off, and you receive ₹500 cashback directly to your bank account!
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs font-mono mb-4">
              <span>https://bharatfiling.com/ref/GUMASTA500</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://bharatfiling.com/ref/GUMASTA500');
                  showSuccess('Referral link copied to clipboard!');
                }}
                className="text-blue-600 font-bold hover:underline"
              >
                Copy
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowReferModal(false)}
                className="bg-[#022B50] text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
