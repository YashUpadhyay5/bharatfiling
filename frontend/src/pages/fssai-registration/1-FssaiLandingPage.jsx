import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Utensils,
  Factory,
  Store,
  Truck,
  ChefHat,
  Globe2,
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
  Users,
  AlertCircle,
  X,
  Play,
  Check,
  Building2,
  ShoppingBag,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import {
  FSSAI_PLANS,
  FOOD_BUSINESS_TYPES,
  TURNOVER_BRACKETS,
  VALIDITY_PERIODS,
  FSSAI_DOCUMENTS,
  FSSAI_FAQS,
  TESTIMONIALS,
} from './constants.js';

export default function FssaiLandingPage({ initialData = {}, onGetStarted }) {
  const { showError, showSuccess } = useToast();

  // Lead Form State (1:1 with Screenshot media_1792997064521_ffd2deb6.png)
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [cityPincode, setCityPincode] = useState(initialData.cityPincode || '');
  const [whatsappOptIn, setWhatsappOptIn] = useState(
    initialData.whatsappOptIn !== undefined ? initialData.whatsappOptIn : true
  );

  // Active Document Tab: 'basic' | 'state' | 'central'
  const [activeDocTab, setActiveDocTab] = useState('basic');

  // FAQ Accordion State (open first one by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Certificate Sample Modal
  const [showCertModal, setShowCertModal] = useState(false);

  // Video Guide Modal
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Active Testimonial index for hero slider
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Hindi toggle announcement state
  const [isHindi, setIsHindi] = useState(false);

  const heroTestimonials = [
    {
      text: '“Professional, reliable, and genuinely dedicated. They made every step feel simple and assured. I’m happy with the entire process.”',
      author: 'Founder, EcoWellness Ventures',
      rating: 5,
    },
    {
      text: '“Excellent service and support. BharatFiling Team is very supportive and professional. I Really appreciate the service and prompt responses.”',
      author: 'Founder & CEO of SchnellTek Software Pvt. Ltd.',
      rating: 5,
    },
    {
      text: '“A supportive and efficient team to work with. Always prompt, clear, and respectful in communication. It’s been a pleasure.”',
      author: 'Director at InnovEdge Technologies',
      rating: 5,
    },
  ];

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      showError('Please enter a valid email address');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      showError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (onGetStarted) {
      onGetStarted({
        email: email.trim(),
        phone: phone.trim(),
        cityPincode: cityPincode.trim(),
        whatsappOptIn,
      });
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* 1. TOP ANNOUNCEMENT BAR (MATCHING SCREENSHOT) */}
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

      {/* 2. BREADCRUMBS BAR */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#002B49] transition font-medium">Home</Link>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">
              {isHindi ? 'एफएसएसएआई पंजीकरण ऑनलाइन: भारत में खाद्य लाइसेंस के लिए आवेदन करें' : 'FSSAI Registration Online: Apply for Food License in India'}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" /> ISO 27001 Certified Statutory Desk
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">100% Online FoSCoS Government Filing</span>
          </div>
        </div>
      </div>

      {/* 3. HERO SECTION (1:1 EXACT MATCH OF SCREENSHOT media_1792997064521_ffd2deb6.png) */}
      <section className="relative bg-gradient-to-b from-[#F7FAFD] via-white to-white pt-8 pb-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Headlines, Trust Badge, Value Props & Testimonial Card */}
            <div className="lg:col-span-7 space-y-6 pt-2">
              
              {/* Blue Shield Badge: Only ISO 27001 Certified Platform in India */}
              <div className="inline-flex items-center gap-2.5 bg-white border border-blue-200 rounded-full px-3.5 py-1.5 shadow-xs">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-[#0052CC] flex items-center justify-center text-white shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
                  Only ISO 27001 Certified Platform in <span className="inline-block text-base">🇮🇳</span>
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#002B49] leading-[1.2] tracking-tight">
                {isHindi 
                  ? 'FSSAI पंजीकरण ऑनलाइन: भारत में फूड लाइसेंस के लिए आवेदन करें' 
                  : 'FSSAI Registration Online: Apply for Food License in India'}
              </h1>

              {/* 3 Value Propositions with Checkmarks (Matching Screenshot 1:1) */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base font-medium">
                    Expert guidance to choose the right FSSAI license for your business
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base font-medium">
                    Fast and secure document filing with registration completed in 5 days.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-slate-700 text-sm sm:text-base font-medium">
                    Easy renewal and modification in just 48 hours with full expert support.
                  </p>
                </div>
              </div>

              {/* Video Link / Guide CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(true)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#002B49] hover:text-[#0052CC] transition group underline underline-offset-4 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#002B49] group-hover:bg-[#0052CC] flex items-center justify-center text-white transition">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>Complete guide on FSSAI Registration</span>
                </button>
              </div>

              {/* Verified Reviews / Quote Card (Matching bottom of left column in Screenshot) */}
              <div className="pt-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs relative overflow-hidden transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-1.5">4.8 / 5.0</span>
                    </div>

                    {/* Simple dots slider for quotes */}
                    <div className="flex items-center gap-1.5">
                      {heroTestimonials.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveTestimonial(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            activeTestimonial === idx ? 'w-5 bg-[#002B49]' : 'bg-slate-300'
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm italic mb-2 leading-relaxed">
                    {heroTestimonials[activeTestimonial].text}
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    — {heroTestimonials[activeTestimonial].author}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Floating Lead Capture Card with Festive Sale Badge */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              
              {/* Diwali Festive Sale Badge (Positioned at top-right exactly as shown) */}
              <div className="absolute -top-5 right-4 z-10 flex items-center">
                <div className="relative bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full shadow-md border border-amber-300 flex items-center gap-1.5 animate-pulse">
                  <span className="bg-blue-600 text-white text-[10px] uppercase font-black px-1.5 py-0.5 rounded-sm">Diwali</span>
                  <span>Festive Sale Offer 🪔</span>
                </div>
              </div>

              {/* Lead Card Container */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-7 relative z-0">
                <div className="mb-5">
                  <h2 className="text-xl sm:text-2xl font-black text-[#002B49] tracking-tight">
                    FSSAI License Registration
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Get your 14-digit FoSCoS food safety certificate with legal assurance
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Email Input */}
                  <div>
                    <label className="sr-only">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent text-sm transition"
                    />
                  </div>

                  {/* Mobile Number Input */}
                  <div>
                    <label className="sr-only">Mobile Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-sm font-medium">
                        +91
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="Mobile Number"
                        required
                        maxLength={10}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent text-sm transition font-mono"
                      />
                    </div>
                  </div>

                  {/* City/Pincode Input */}
                  <div>
                    <label className="sr-only">City/Pincode</label>
                    <input
                      type="text"
                      value={cityPincode}
                      onChange={(e) => setCityPincode(e.target.value)}
                      placeholder="City/Pincode"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent text-sm transition"
                    />
                  </div>

                  {/* WhatsApp Opt-in Switch */}
                  <div className="flex items-center justify-between py-1 px-0.5">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                      Get easy updates through 
                      <span className="inline-flex items-center text-emerald-600 font-semibold gap-1">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
                        </svg>
                        Whatsapp
                      </span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setWhatsappOptIn(!whatsappOptIn)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        whatsappOptIn ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          whatsappOptIn ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Dark Blue "Get Started" CTA Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white font-bold text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Subtext info */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> No Spam Guarantee
                  </span>
                  <span>Basic Registration from ₹1,999</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. TRUST STRIP: METRICS & RECOGNITION */}
      <section className="bg-slate-50 border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#002B49]">35,000+</p>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">Food Businesses Registered</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#002B49]">5 Days</p>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">Average FoSCoS Approval</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#002B49]">100%</p>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">Online Paperless Process</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#002B49]">4.8 / 5</p>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">Customer Satisfaction Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THREE TIERS OF FSSAI LICENSES (COMPARISON SECTION) */}
      <section id="plans" className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0052CC] bg-blue-50 px-3 py-1 rounded-full mb-3">
              FoSCoS Statutory Categories
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#002B49] tracking-tight">
              Choose the Right FSSAI License for Your Food Business
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Under the Food Safety and Standards (Licensing and Registration) Regulations, your license type is determined strictly by your annual turnover and scale of operation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {FSSAI_PLANS.map((plan) => {
              const isRecommended = plan.recommended;
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border transition-all duration-300 ${
                    isRecommended
                      ? 'border-[#002B49] shadow-xl ring-2 ring-[#002B49]/10 bg-white'
                      : 'border-slate-200 shadow-sm hover:shadow-md bg-white'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#002B49] text-white text-xs font-bold py-1 px-4 rounded-full uppercase tracking-wider shadow-sm">
                      Most Popular for Startups
                    </div>
                  )}

                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    <div className="mb-4">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                        {plan.formType}
                      </span>
                      <h3 className="text-xl font-bold text-[#002B49] mt-2.5">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{plan.subtitle}</p>
                    </div>

                    <div className="py-4 border-y border-slate-100 my-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-[#002B49]">
                          ₹{plan.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          ₹{plan.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {plan.discountLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Govt Fee: ₹{plan.govtFee}/year • TAT: {plan.tat}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Turnover Eligibility
                      </p>
                      <p className="text-sm font-semibold text-slate-800">
                        {plan.turnoverLimit}
                      </p>
                    </div>

                    <div className="space-y-2.5 flex-1 mb-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        What's Included:
                      </p>
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (onGetStarted) {
                          onGetStarted({ plan: plan.id });
                        }
                      }}
                      className={`w-full py-3 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isRecommended
                          ? 'bg-[#002B49] hover:bg-[#001D32] text-white shadow-md'
                          : 'bg-slate-100 hover:bg-slate-200 text-[#002B49]'
                      }`}
                    >
                      <span>Apply for {plan.name.split(' ')[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. WHO NEEDS FSSAI REGISTRATION? (GRID OF FOOD BUSINESSES) */}
      <section className="py-14 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0052CC] bg-blue-50 px-3 py-1 rounded-full mb-3">
              Eligibility Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Who is Legally Required to Have an FSSAI License?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Under Section 31 of the Food Safety and Standards Act, any entity dealing with food storage, sale, preparation or distribution must register.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOOD_BUSINESS_TYPES.map((biz) => {
              const IconComponent = 
                biz.icon === 'Utensils' ? Utensils :
                biz.icon === 'Factory' ? Factory :
                biz.icon === 'Store' ? Store :
                biz.icon === 'Truck' ? Truck :
                biz.icon === 'ChefHat' ? ChefHat : Globe2;

              return (
                <div
                  key={biz.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-[#002B49] text-[#002B49] group-hover:text-white flex items-center justify-center transition mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{biz.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{biz.description}</p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500">Suggested:</span>
                    <span className="text-[#0052CC] capitalize">{biz.recommendedPlan} License</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. DOCUMENTS REQUIRED CHECKLIST (INTERACTIVE TABS) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0052CC] bg-blue-50 px-3 py-1 rounded-full mb-3">
              Document Checklist
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Documents Required for FoSCoS License Application
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2">
              Select your required category to view the verified FoSCoS document list.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveDocTab('basic')}
                className={`py-2 px-4 sm:px-6 rounded-lg transition cursor-pointer ${
                  activeDocTab === 'basic'
                    ? 'bg-[#002B49] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Basic Registration (Turnover &lt; ₹12L)
              </button>
              <button
                type="button"
                onClick={() => setActiveDocTab('state')}
                className={`py-2 px-4 sm:px-6 rounded-lg transition cursor-pointer ${
                  activeDocTab === 'state'
                    ? 'bg-[#002B49] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                State License (₹12L - ₹20Cr)
              </button>
              <button
                type="button"
                onClick={() => setActiveDocTab('central')}
                className={`py-2 px-4 sm:px-6 rounded-lg transition cursor-pointer ${
                  activeDocTab === 'central'
                    ? 'bg-[#002B49] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Central License (&gt; ₹20Cr / Export)
              </button>
            </div>
          </div>

          {/* Document list card */}
          <div className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FSSAI_DOCUMENTS[activeDocTab].map((doc, dIdx) => (
                <div
                  key={dIdx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-[#0052CC] flex items-center justify-center shrink-0 mt-0.5">
                    <FileCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {doc}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Our legal team converts, compresses and verifies all files prior to FoSCoS upload.</span>
              </div>
              <button
                type="button"
                onClick={() => setShowCertModal(true)}
                className="text-xs font-bold text-[#0052CC] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Sample 14-Digit Certificate</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 5-STEP FOSCOS FILING PROCESS */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0052CC] bg-blue-50 px-3 py-1 rounded-full mb-3">
              Application Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              How BharatFiling Obtains Your FSSAI License
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              A smooth 5-stage paperless statutory journey from Form submission to certificate issuance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Intake & Classification',
                desc: 'Fill our 2-minute business questionnaire. Our food safety expert recommends the optimal Form A/B tier.',
              },
              {
                step: '02',
                title: 'Document Scrubbing',
                desc: 'Upload ID, premise proofs and menu/product category. We format and validate against FoSCoS rules.',
              },
              {
                step: '03',
                title: 'FoSCoS Portal Filing',
                desc: 'We draft and file the formal application on the central FoSCoS portal and deposit official government fees.',
              },
              {
                step: '04',
                title: 'Department Liaison',
                desc: 'Our legal partners handle departmental scrutiny and resolve Food Safety Officer (FSO) queries immediately.',
              },
              {
                step: '05',
                title: '14-Digit License Issued',
                desc: 'Download your government-signed FSSAI License with QR code. Instant certificate delivery to email and dashboard.',
              },
            ].map((st, i) => (
              <div
                key={i}
                className="relative bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-slate-200 block mb-2 font-mono">
                    {st.step}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{st.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-semibold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  <span>Step {i + 1} of 5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PENALTIES FOR OPERATING WITHOUT FSSAI (SECTION 31 WARNING) */}
      <section className="py-12 bg-amber-50/60 border-y border-amber-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Statutory Warning: Severe Penalties for Non-Compliance
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Under Section 31 of the Food Safety and Standards Act (2006), manufacturing, selling, or storing food without an FSSAI License carries imprisonment of up to <strong>6 months</strong> and a financial penalty of up to <strong>₹5,00,000 (Rupees Five Lakhs)</strong>. Get registered today to safeguard your enterprise.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('plans');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="shrink-0 py-3 px-6 rounded-lg bg-[#002B49] text-white text-xs sm:text-sm font-bold hover:bg-[#001D32] transition shadow-xs cursor-pointer"
            >
              Protect My Business
            </button>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS SECTION */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0052CC] bg-blue-50 px-3 py-1 rounded-full mb-3">
              Customer Success
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Trusted by 35,000+ Food Business Operators Across India
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Here is what restaurant founders, cloud kitchen operators, and food exporters say about BharatFiling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#FAFBFD] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-4">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200/80">
                  <p className="text-xs font-bold text-slate-900">{t.name}</p>
                  <p className="text-[11px] text-[#0052CC] font-medium">{t.role}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. DETAILED FAQ ACCORDION */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0052CC] bg-blue-50 px-3 py-1 rounded-full mb-3">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
              Got Questions About FSSAI Registration?
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Everything you need to know about FoSCoS rules, turnover thresholds, validity and inspections.
            </p>
          </div>

          <div className="space-y-3">
            {FSSAI_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#002B49] transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
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

      {/* 12. BOTTOM STICKY / FLOATING ACTION BAR */}
      <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
              ✓
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                Apply for FSSAI Food License in 5 Days
              </p>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Basic Registration ₹1,999 • 100% Online FoSCoS Filing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="py-2.5 px-5 rounded-lg bg-[#002B49] hover:bg-[#001D32] text-white text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SAMPLE FSSAI CERTIFICATE MODAL */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowCertModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-4">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Official FoSCoS Format
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                Sample 14-Digit FSSAI Registration Certificate
              </h3>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 font-mono text-xs text-slate-700 space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-400">Registration No:</span>
                <span className="font-bold text-blue-700">10023051000987</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-400">FBO Name:</span>
                <span className="font-bold">ROYAL FOOD CRAFTERS LLP</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-400">Premises:</span>
                <span>Plot 42, Food Park, Phase 2, IND</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-400">Category:</span>
                <span>Ready-to-eat Savouries &amp; Bakery</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Validity:</span>
                <span className="text-emerald-700 font-bold">5 Years (2026 - 2031)</span>
              </div>
            </div>
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                className="w-full py-2.5 bg-[#002B49] text-white font-bold text-xs rounded-lg hover:bg-[#001D32] transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIDEO GUIDE MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Complete Guide to FSSAI Registration
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Everything you need to know about food license eligibility &amp; FoSCoS compliance
              </p>
            </div>
            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center relative">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/uNQt_5cmCh8"
                title="FSSAI Registration Guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4 text-right">
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="py-2 px-5 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
