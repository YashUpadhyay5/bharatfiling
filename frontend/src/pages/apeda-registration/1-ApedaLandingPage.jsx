import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Search,
  Building2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  AlertCircle,
  FileText,
  BadgeCheck,
  Award,
  Globe2,
  Lock,
  Gift,
  MessageSquare,
  Sparkles,
  PhoneCall,
  User,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Layers,
  ArrowUpRight,
  Ship,
  ExternalLink,
} from 'lucide-react';

import {
  APEDA_SCHEDULED_CATEGORIES,
  EXPORTER_TYPES,
  APEDA_DOCUMENTS,
  FINANCIAL_ASSISTANCE_SCHEMES,
  APEDA_STEPS,
  TESTIMONIALS,
  TRUSTED_PARTNERS,
  TRUST_STATS,
  LANGUAGES,
  APEDA_FAQS,
} from './constants.js';

export default function ApedaLandingPage({
  initialData = {},
  onConsultExpert,
}) {
  // Lead form state matching screenshot
  const [email, setEmail] = useState(initialData.email || 'yashupadhyay@example.com');
  const [phone, setPhone] = useState(initialData.phone ? String(initialData.phone).replace('+91', '').trim() : '7668976193');
  const [cityPincode, setCityPincode] = useState(initialData.cityPincode || 'Bengaluru, 560001');
  const [language, setLanguage] = useState(initialData.language || 'English');
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates !== undefined ? initialData.whatsappUpdates : true
  );

  // Form error state
  const [formError, setFormError] = useState('');

  // Active testimonial carousel index
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Scheduled products search & filter
  const [productSearch, setProductSearch] = useState('');
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');

  // Documents matrix active tab
  const [activeDocTab, setActiveDocTab] = useState('merchant');

  // FAQs search and active accordion
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Referral modal state
  const [showReferralModal, setShowReferralModal] = useState(false);

  // Handle lead form submission
  const handleSubmitLead = (e) => {
    if (e) e.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid business email address.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!cityPincode.trim()) {
      setFormError('Please enter your City or 6-digit Pincode.');
      return;
    }

    setFormError('');

    const leadPayload = {
      email: email.trim(),
      phone: `+91 ${cleanPhone.slice(-10)}`,
      cityPincode: cityPincode.trim(),
      language,
      whatsappUpdates,
    };

    if (onConsultExpert) {
      onConsultExpert(leadPayload);
    }
  };

  // Filtered scheduled products
  const filteredProducts = APEDA_SCHEDULED_CATEGORIES.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      cat.description.toLowerCase().includes(productSearch.toLowerCase()) ||
      cat.popularItems.some((item) => item.toLowerCase().includes(productSearch.toLowerCase()));
    if (activeCategoryTab === 'all') return matchesSearch;
    return cat.id === activeCategoryTab && matchesSearch;
  });

  // Filtered FAQs
  const filteredFaqs = APEDA_FAQS.filter((f) => {
    if (!faqSearch.trim()) return true;
    const q = faqSearch.toLowerCase();
    return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
  });

  const activeTestimonial = TESTIMONIALS[activeTestimonialIdx] || TESTIMONIALS[0];

  return (
    <div className="font-sans text-slate-800 bg-[#F8FAFC] selection:bg-[#002B49] selection:text-white relative overflow-x-hidden">

      {/* FLOATING RIGHT EDGE REFERRAL TAB (EXACT MATCH OF SCREENSHOT) */}
      <button
        type="button"
        onClick={() => setShowReferralModal(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#FFCC00] hover:bg-amber-400 text-slate-950 font-bold text-xs py-3 px-1.5 rounded-l-xl shadow-2xl flex flex-col items-center gap-1 cursor-pointer transition hover:px-2"
        title="Refer a friend and earn rewards"
      >
        <Gift className="w-4 h-4 text-slate-900" />
        <span className="[writing-mode:vertical-rl] rotate-180 uppercase tracking-widest text-[10px] font-black">
          Refer a friend
        </span>
      </button>

      {/* TOP NOTIFICATION / STATUTORY ANNOUNCEMENT BANNER */}
      <div className="bg-[#002B49] text-white py-2 px-4 text-xs font-medium text-center border-b border-blue-900/60">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="bg-[#FFCC00] text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wide">
            DGFT e-RCMC Mandatory
          </span>
          <span>
            Under Foreign Trade Policy 2023, APEDA RCMC is mandatory for exporting scheduled food &amp; agro commodities.
          </span>
          <a
            href="#scheduled-products"
            className="text-[#FFCC00] hover:underline font-bold inline-flex items-center gap-1"
          >
            Check 14 Scheduled Product Categories ↓
          </a>
        </div>
      </div>

      {/* HERO SECTION (1:1 PIXEL & ELEMENT MATCH OF SCREENSHOT media_1793178528760_b8177ea9.png) */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-14 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT 7 COLUMNS: BADGE, HEADLINE, 3 BULLETS, ANCHOR & TESTIMONIAL CARD */}
            <div className="lg:col-span-7 space-y-6 pt-2">
              
              {/* Top Badge: "Only ISO 27001 Certified Platform in 🇮🇳" */}
              <div className="inline-flex items-center gap-2 bg-white border border-blue-200/90 rounded-full px-4 py-1.5 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-800 tracking-tight">
                  Only ISO 27001 Certified Platform in
                </span>
                <span className="text-sm">🇮🇳</span>
              </div>

              {/* Main Headline: "Apply APEDA Registration Online" */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#002B49]">
                Apply APEDA Registration Online
              </h1>

              {/* 3 Value Proposition Bullets with Tick Marks */}
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-2.5">
                  <div className="text-emerald-600 font-black text-base shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    Streamline your agri-export business with expert-assisted APEDA registration.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="text-emerald-600 font-black text-base shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    100% online process including documentation, DGFT filing, and RCMC application.
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="text-emerald-600 font-black text-base shrink-0 mt-0.5">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    Top legal support to comply with all export regulations and grow your business.
                  </p>
                </div>
              </div>

              {/* Anchor Link: "⦿ APEDA Registration and Its Benefits" */}
              <div className="pt-1">
                <a
                  href="#benefits-section"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#002B49] hover:underline cursor-pointer group"
                >
                  <span className="text-[#002B49] text-base group-hover:scale-110 transition">⦿</span>
                  <span className="underline decoration-[#002B49] underline-offset-4 font-extrabold">
                    APEDA Registration and Its Benefits
                  </span>
                </a>
              </div>

              {/* Customer Review Testimonial Card (Matches Screenshot Siddharth Rao) */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs max-w-xl space-y-3 mt-4 relative">
                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  "{activeTestimonial.text.slice(0, 110)}...{' '}
                  <button
                    type="button"
                    onClick={() => alert(`Review by ${activeTestimonial.name}:\n\n"${activeTestimonial.text}"`)}
                    className="text-[#002B49] font-bold underline cursor-pointer not-italic"
                  >
                    see more
                  </button>"
                </p>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500 font-bold shrink-0">
                      <User className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {activeTestimonial.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {activeTestimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* 3 Interactive Carousel Slider Dots */}
                  <div className="flex items-center gap-1.5">
                    {TESTIMONIALS.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTestimonialIdx(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          activeTestimonialIdx === idx
                            ? 'w-5 bg-[#002B49]'
                            : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                        }`}
                        title={`View testimonial ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT 5 COLUMNS: FLOATING "GET STARTED!" LEAD CAPTURE CARD WITH FESTIVE BANNER */}
            <div className="lg:col-span-5 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
              
              {/* Top Festive Header Banner (Diwali Festive Sale Offer) */}
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-amber-200/60 py-2 px-4 flex items-center justify-center gap-2">
                <span className="text-xs">🪔</span>
                <span className="text-[11px] font-black uppercase text-amber-900 tracking-wider">
                  Diwali Festive Sale Offer
                </span>
                <span className="text-xs">🪔</span>
              </div>

              <div className="p-6 sm:p-7 space-y-5">
                
                <h3 className="text-xl font-black text-slate-900 tracking-tight text-center">
                  Get Started!
                </h3>

                {formError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitLead} className="space-y-3.5">
                  
                  {/* Email Input */}
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full text-xs px-3.5 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition text-slate-800 placeholder-slate-400"
                      required
                    />
                  </div>

                  {/* Mobile Number Input */}
                  <div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Mobile Number"
                      maxLength={10}
                      className="w-full text-xs px-3.5 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent font-mono transition text-slate-800 placeholder-slate-400"
                      required
                    />
                  </div>

                  {/* City/Pincode Input */}
                  <div>
                    <input
                      type="text"
                      value={cityPincode}
                      onChange={(e) => setCityPincode(e.target.value)}
                      placeholder="City/Pincode"
                      className="w-full text-xs px-3.5 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition text-slate-800 placeholder-slate-400"
                      required
                    />
                  </div>

                  {/* Language Dropdown Select */}
                  <div className="relative">
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full text-xs px-3.5 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent appearance-none text-slate-800 cursor-pointer"
                    >
                      {LANGUAGES.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* WhatsApp Updates Toggle Switch (Matching Screenshot) */}
                  <div className="flex items-center justify-between pt-1 text-xs text-slate-700">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span>Get easy updates through</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <span className="text-sm">🟢</span> Whatsapp
                      </span>
                    </span>

                    <button
                      type="button"
                      onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                        whatsappUpdates ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                      aria-label="Toggle WhatsApp updates"
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                          whatsappUpdates ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Consult an Expert CTA Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#002B49] hover:bg-[#001D33] text-white font-black py-3.5 px-4 rounded-lg text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <span>Consult an Expert</span>
                  </button>

                  {/* Footnotes Under CTA */}
                  <div className="text-center space-y-1 pt-1">
                    <p className="text-[11px] font-semibold text-slate-600">
                      Easy monthly EMI options available
                    </p>
                    <p className="text-[10px] text-slate-400">
                      No Spam. No Sharing. 100% Confidentiality
                    </p>
                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TRUSTED PARTNERS SECTION (EXACT MATCH OF SCREENSHOT) */}
      <section className="bg-white py-12 px-4 sm:px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto space-y-8 text-center">
          
          <div className="inline-block relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002B49] tracking-tight">
              Trusted Partners
            </h2>
            <div className="w-16 h-1 bg-[#002B49] rounded-full mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center">
            {TRUSTED_PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center space-y-1 hover:shadow-xs transition"
              >
                <div className="text-xs font-bold text-slate-900 truncate">
                  {partner.name}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {partner.category}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4 TRUST STATS METRIC STRIP */}
      <section className="bg-[#002B49] text-white py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {TRUST_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-xl sm:text-2xl font-black text-[#FFCC00]">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-white">
                {stat.label}
              </div>
              <div className="text-[11px] text-blue-200">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN CONTENT BODY */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-16">

        {/* SECTION: WHAT IS APEDA REGISTRATION & STATUTORY BACKGROUND */}
        <section id="benefits-section" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 scroll-mt-20">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
              Statutory Background • APEDA Act, 1985
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What is APEDA Registration &amp; Why is it Mandatory?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              The <strong>Agricultural and Processed Food Products Export Development Authority (APEDA)</strong> is an autonomous statutory organization under the Ministry of Commerce &amp; Industry, Government of India. Under <strong>Section 12 of the APEDA Act, 1985</strong>, any individual, firm, or company exporting scheduled agricultural or processed food commodities from India must register with APEDA and obtain an official <strong>Registration-Cum-Membership Certificate (RCMC)</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#002B49] flex items-center justify-center font-bold">
                <Ship className="w-5 h-5 text-[#002B49]" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Mandatory Port Clearance
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Customs authorities at Indian ports (ICDs and air cargo complexes) strictly require a valid APEDA RCMC on your shipping bill to clear export consignments.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Export Subsidies &amp; Grants
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Registered exporters qualify for financial grants covering up to 40%–50% of packhouse infrastructure, ISO/HACCP certifications, and global expo stalls.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Globe2 className="w-5 h-5 text-amber-700" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                Global Buyer-Seller Connect
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Direct access to APEDA trade delegations, international B2B buyer-seller meets (BSMs), and sponsored booths at Gulfood (Dubai), SIAL (Paris), and Anuga (Germany).
              </p>
            </div>

          </div>
        </section>

        {/* SECTION: INTERACTIVE SCHEDULED PRODUCTS EXPLORER */}
        <section id="scheduled-products" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
                Product Tariff Lines
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                APEDA Scheduled Products Directory
              </h2>
              <p className="text-xs text-slate-500 max-w-2xl">
                Explore the 14 scheduled product schedules covering 800+ agri-food items that require mandatory APEDA registration:
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products (e.g. Basmati, Mango)"
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredProducts.map((cat) => (
              <div
                key={cat.id}
                className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3 hover:shadow-xs transition flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-[10px] font-bold text-[#002B49] bg-blue-100/80 px-2 py-0.5 rounded">
                      {cat.hsn}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-semibold text-slate-400 block mb-1">
                    Popular Export Items:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.popularItems.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-white border border-slate-200 text-slate-700 px-1.5 py-0.5 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: MERCHANT EXPORTER VS MANUFACTURER EXPORTER */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="space-y-1 text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Registration Types
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Merchant Exporter vs. Manufacturer Exporter
            </h2>
            <p className="text-xs text-slate-500">
              Select the correct legal category for your business on the DGFT e-RCMC portal:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {EXPORTER_TYPES.map((type) => (
              <div
                key={type.id}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#002B49] bg-blue-100 px-2 py-0.5 rounded uppercase">
                      {type.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {type.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {type.eligibility}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold text-slate-700 block">
                      Mandatory Prerequisites:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {type.prerequisites.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                  <strong className="text-slate-700">Best for:</strong> {type.suitableFor}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: FINANCIAL ASSISTANCE SCHEMES (FAS) */}
        <section className="bg-gradient-to-b from-[#002B49] to-[#00385F] text-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <span className="text-[10px] font-bold text-slate-950 bg-[#FFCC00] px-3 py-1 rounded-full uppercase tracking-wider">
              Government Grants &amp; Subsidies
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              APEDA Financial Assistance Schemes (FAS)
            </h2>
            <p className="text-xs sm:text-sm text-blue-100">
              Registered exporters can unlock direct capital subsidies under 3 primary developmental pillars:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {FINANCIAL_ASSISTANCE_SCHEMES.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{scheme.icon}</span>
                    <span className="text-[11px] font-extrabold text-[#FFCC00] bg-blue-950/70 border border-blue-800 px-2 py-0.5 rounded">
                      {scheme.subsidy}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {scheme.title}
                  </h4>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    {scheme.objective}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] font-bold text-[#FFCC00] uppercase block">
                    Eligible Activities Covered:
                  </span>
                  <ul className="space-y-1 text-xs text-blue-100">
                    {scheme.eligibleItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#FFCC00] font-bold">✓</span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: DOCUMENTS REQUIRED MATRIX */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
              Verification Checklist
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Documents Required for APEDA Registration
            </h2>
            <p className="text-xs text-slate-500">
              Select your exporter category to review the specific paperless documentation checklist required:
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            {APEDA_DOCUMENTS.map((docGroup) => (
              <button
                key={docGroup.category}
                type="button"
                onClick={() => setActiveDocTab(docGroup.category)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeDocTab === docGroup.category
                    ? 'bg-[#002B49] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {docGroup.title.replace('Documents for ', '')}
              </button>
            ))}
          </div>

          {/* Active Documents List */}
          {(() => {
            const currentDocGroup =
              APEDA_DOCUMENTS.find((d) => d.category === activeDocTab) || APEDA_DOCUMENTS[0];

            return (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    {currentDocGroup.title}
                  </h3>
                  <span className="text-[11px] font-mono font-bold bg-blue-50 text-[#002B49] border border-blue-200 px-2.5 py-0.5 rounded">
                    {currentDocGroup.badge}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentDocGroup.documents.map((doc, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <h4 className="text-xs font-bold text-slate-800">{doc.name}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                        {doc.options}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </section>

        {/* SECTION: 5-STEP ALLOTMENT WORKFLOW */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Step-by-Step Procedure
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              5-Step Online APEDA e-RCMC Allotment Process
            </h2>
            <p className="text-xs text-slate-500">
              Our DGFT consultants handle documentation, digital signing, and government follow-ups end-to-end:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {APEDA_STEPS.map((step, idx) => (
              <div key={idx} className="space-y-3 text-center md:text-left">
                <div className="w-12 h-12 rounded-2xl bg-[#002B49] text-[#FFCC00] font-black text-lg flex items-center justify-center shadow-md mx-auto md:mx-0">
                  {step.step}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: SEARCHABLE FAQS ACCORDION */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
                Statutory Clarifications
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions about APEDA Registration
              </h2>
              <p className="text-xs text-slate-500">
                Verified answers directly referenced from the APEDA Act, 1985 and DGFT guidelines.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQs (e.g. fees, validity, IEC)"
                className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49]"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {faq.q}
                    </span>
                    <span className="text-slate-400 text-xs font-bold">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 bg-slate-50/50 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM CONSULTATION CTA BANNER */}
        <section className="bg-gradient-to-r from-[#002B49] to-[#004B7A] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black tracking-tight">
              Ready to Export Indian Agri &amp; Processed Foods Globally?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Get your official 5-year APEDA RCMC certificate with expert assistance. 100% online, hassle-free DGFT filing with dedicated export support.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#FFCC00] hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Consult an Expert Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>

      {/* REFERRAL MODAL */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-4 relative">
            <button
              type="button"
              onClick={() => setShowReferralModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg font-bold"
            >
              ✕
            </button>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Gift className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-slate-900">
                Refer a Friend &amp; Earn ₹1,000
              </h3>
              <p className="text-xs text-slate-500">
                Invite fellow agri-exporters to register their APEDA, IEC, or FSSAI with BharatFiling and receive instant bank credits on successful filing.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-[#002B49]">
                BHARAT-APEDA-REF2026
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('BHARAT-APEDA-REF2026');
                  alert('Referral code copied to clipboard!');
                }}
                className="text-xs font-bold text-[#002B49] hover:underline"
              >
                Copy Code
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowReferralModal(false)}
              className="w-full bg-[#002B49] text-white py-2.5 rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP PILL */}
      <a
        href="https://wa.me/917668976193?text=Hi%20BharatFiling,%20I%20need%20expert%20assistance%20with%20APEDA%20Registration%20and%20RCMC%20issuance."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold transition hover:scale-105"
        title="Chat with DGFT & APEDA Consultant"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp Export Desk</span>
      </a>

    </div>
  );
}
