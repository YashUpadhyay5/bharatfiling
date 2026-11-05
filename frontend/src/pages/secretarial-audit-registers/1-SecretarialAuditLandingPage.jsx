import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Play,
  X,
  ArrowRight,
  Calculator,
  Mail,
  Landmark,
  Users,
  FileSpreadsheet,
  Rocket,
  TrendingUp,
  Laptop,
  Store,
  Factory,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Gift,
  Star,
  Check,
  Phone,
  HelpCircle,
  Award,
  Clock,
  FileText,
  AlertCircle,
  Building2,
  ShoppingCart,
  Globe,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import {
  SECRETARIAL_HERO,
  TRUSTED_PARTNERS,
  CORE_FEATURES,
  STATUTORY_REGISTERS_LIST,
  WHO_NEEDS_SECRETARIAL,
  COMPLIANCE_WORKFLOW,
  PENALTY_AVOIDANCE,
  PRICING_PLANS,
  TESTIMONIALS,
  FAQS,
} from './constants.js';

export default function SecretarialAuditLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Form state - matching Email, Mobile Number, City/Pincode, WhatsApp toggle
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [cityPincode, setCityPincode] = useState(initialData.cityPincode || '');
  const [whatsappUpdates, setWhatsappUpdates] = useState(
    initialData.whatsappUpdates !== undefined ? initialData.whatsappUpdates : true
  );

  // Form error state
  const [errors, setErrors] = useState({});

  // Hindi toggle state
  const [isHindi, setIsHindi] = useState(false);
  const [showHindiBanner, setShowHindiBanner] = useState(true);

  // Guide video modal state
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  // Refer a friend modal state
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);

  // FAQ accordion open index
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Map icon strings to Lucide components
  const renderIcon = (name, className = 'w-5 h-5') => {
    switch (name) {
      case 'Calculator':
        return <Calculator className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className={className} />;
      case 'Mail':
        return <Mail className={className} />;
      case 'Landmark':
        return <Landmark className={className} />;
      case 'Users':
        return <Users className={className} />;
      case 'Rocket':
        return <Rocket className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'Laptop':
        return <Laptop className={className} />;
      case 'Store':
        return <Store className={className} />;
      case 'Factory':
        return <Factory className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'ShoppingCart':
        return <ShoppingCart className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'RefreshCw':
        return <RefreshCw className={className} />;
      case 'Award':
        return <Award className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneClean = phone.replace(/\D/g, '');

    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid company or corporate email address';
    }

    if (!phoneClean || phoneClean.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!cityPincode.trim() || cityPincode.trim().length < 3) {
      newErrors.cityPincode = 'Please enter your registered office city or pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (onSubmitLead) {
      onSubmitLead({
        email,
        phone,
        cityPincode,
        whatsappUpdates,
      });
    }
  };

  return (
    <div className="bg-white font-sans text-slate-800 antialiased selection:bg-[#FFD200] selection:text-[#002B49] relative">
      {/* =========================================================================
          FLOATING "REFER A FRIEND" SIDEBAR RIBBON
          ========================================================================= */}
      <button
        type="button"
        onClick={() => setIsReferModalOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#FFD200] hover:bg-[#ffc800] text-[#002B49] px-2.5 py-4 rounded-l-xl shadow-xl font-black text-xs tracking-wider flex items-center gap-2 cursor-pointer transition transform hover:-translate-x-1 border-l-2 border-t-2 border-b-2 border-amber-300"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <Gift className="w-4 h-4 rotate-90 text-[#002B49]" />
        <span>Refer a friend</span>
      </button>

      {/* =========================================================================
          TOP BANNER: LANGUAGE SWITCH NOTIFICATION
          ========================================================================= */}
      {showHindiBanner && (
        <div className="bg-slate-50 border-b border-slate-200/80 py-2 px-4 text-center text-xs text-slate-600 flex items-center justify-center gap-2 relative">
          <span>
            {isHindi
              ? 'अब आप इस पृष्ठ को अंग्रेजी में पढ़ सकते हैं। भाषा बदलें '
              : 'Now you can read this page in Hindi. Change language to '}
            <button
              type="button"
              onClick={() => setIsHindi(!isHindi)}
              className="text-blue-600 font-bold hover:underline cursor-pointer ml-1 inline-flex items-center"
            >
              {isHindi ? 'English' : 'हिन्दी'}
            </button>
          </span>
          <button
            type="button"
            onClick={() => setShowHindiBanner(false)}
            aria-label="Close language banner"
            className="absolute right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =========================================================================
          HERO SECTION (TWO-COLUMN WITH DIWALI LEAD CAPTURE CARD)
          ========================================================================= */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden bg-gradient-to-b from-slate-50/70 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
            {SECRETARIAL_HERO.breadCrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.title}>
                {idx > 0 && <span>&gt;</span>}
                <a
                  href={crumb.href}
                  className="hover:text-slate-700 transition"
                >
                  {crumb.title}
                </a>
              </React.Fragment>
            ))}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading, Trust Badge, Key Value Bullets */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>{SECRETARIAL_HERO.badge}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#002B49] tracking-tight leading-[1.15]">
                {isHindi
                  ? 'भारत में सेक्रेटेरियल ऑडिट और वैधानिक रजिस्टर ऑनलाइन'
                  : SECRETARIAL_HERO.title}
              </h1>

              {/* Bullet Points */}
              <ul className="space-y-3.5 text-sm sm:text-base text-slate-600 font-medium">
                {SECRETARIAL_HERO.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Video Guide Link */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsGuideModalOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#002B49] hover:text-blue-700 transition group cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-[#002B49] text-white flex items-center justify-center group-hover:bg-blue-700 transition">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </span>
                  <span className="underline underline-offset-4 font-semibold">
                    {SECRETARIAL_HERO.guideLinkText}
                  </span>
                </button>
              </div>

              {/* Live Status Indicators */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>MCA V3 Statutory Records: Active</span>
                </div>
                <div className="h-3 w-px bg-slate-300" />
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Practising CS Desk Online</span>
                </div>
                <div className="h-3 w-px bg-slate-300" />
                <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Audit Turnaround: 10-15 Working Days</span>
                </div>
              </div>
            </div>

            {/* Right Column: Festive Sale Lead Capture Card */}
            <div className="lg:col-span-5 relative">
              {/* Diwali Festive Sale Badge */}
              <div className="absolute -top-4 right-6 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[11px] px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-amber-300">
                <Sparkles className="w-3 h-3 animate-spin" />
                <span>{SECRETARIAL_HERO.festiveBadge}</span>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-7 relative overflow-hidden">
                <h3 className="text-lg font-black text-[#002B49] mb-4">
                  {SECRETARIAL_HERO.cardTitle}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company / Official Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="compliance@mycompany.com"
                      className={`w-full text-xs px-3.5 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#002B49] transition ${
                        errors.email
                          ? 'border-rose-400 bg-rose-50/30'
                          : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 font-bold mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value.replace(/\D/g, ''))
                        }
                        placeholder="Enter your mobile number"
                        className={`w-full text-xs pl-12 pr-3.5 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#002B49] transition ${
                          errors.phone
                            ? 'border-rose-400 bg-rose-50/30'
                            : 'border-slate-300 bg-white'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 font-bold mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* City / Pincode */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Registered Office City / Pincode
                    </label>
                    <input
                      type="text"
                      value={cityPincode}
                      onChange={(e) => setCityPincode(e.target.value)}
                      placeholder="e.g. New Delhi / 110001"
                      className={`w-full text-xs px-3.5 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#002B49] transition ${
                        errors.cityPincode
                          ? 'border-rose-400 bg-rose-50/30'
                          : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.cityPincode && (
                      <p className="text-[11px] text-rose-500 font-bold mt-1">
                        {errors.cityPincode}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Updates Toggle */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
                      <span>Get easy updates through</span>
                      <strong className="text-emerald-700 font-bold">
                        WhatsApp
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                      className={`w-10 h-5 rounded-full p-0.5 transition cursor-pointer ${
                        whatsappUpdates ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white transition transform ${
                          whatsappUpdates ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Primary CTA Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#002B49] hover:bg-[#001f35] text-white font-black text-sm tracking-wide shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Subtext Price Guarantee */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Starting at only ₹6,999/year</span>
                  <span className="text-emerald-600 font-bold">
                    ✓ ICSI Certified Review
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUSTED PARTNERS BAR
          ========================================================================= */}
      <section className="py-8 border-y border-slate-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            Trusted By 20,000+ Indian Corporates & Certified Practising Company Secretaries
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-85">
            {TRUSTED_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="flex flex-col items-center gap-1 text-center group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 object-contain filter grayscale group-hover:grayscale-0 transition duration-200"
                />
                <span className="text-[10px] font-semibold text-slate-500 mt-1 max-w-[120px] line-clamp-1">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE FEATURES GRID (6 INTERACTIVE CARDS)
          ========================================================================= */}
      <section className="py-16 bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Corporate Governance & Secretarial Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002B49]">
              Complete Statutory Register Drafting & Section 204 Audit Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              We eliminate corporate compliance defaults, balance your statutory folios, and ensure 100% adherence to MCA guidelines and Secretarial Standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#002B49] flex items-center justify-center group-hover:bg-[#002B49] group-hover:text-white transition duration-200">
                    {renderIcon(feature.icon, 'w-6 h-6')}
                  </div>
                  <h3 className="text-base font-black text-[#002B49]">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-blue-700">
                  <span>Included in All Plans</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          STATUTORY REGISTERS LIST (MANDATORY REGISTERS MATRIX)
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Mandatory Statutory Registers
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002B49]">
              Registers Every Indian Company Must Maintain at Registered Office
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Under Sections 88, 170, 186, 189, and 90, failure to produce these registers during ROC inspection triggers direct director penalties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATUTORY_REGISTERS_LIST.map((reg) => (
              <div
                key={reg.register}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-4 hover:border-slate-300 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#002B49] tracking-wider">
                    {reg.register}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    {reg.section}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {reg.description}
                </p>

                <div className="pt-2 border-t border-slate-200/60 text-[11px] font-bold text-slate-500">
                  Mandatory For: <span className="text-slate-800">{reg.mandatoryFor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHO NEEDS SECRETARIAL AUDIT (BUSINESS PERSONAS)
          ========================================================================= */}
      <section className="py-16 bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#002B49] bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Who Needs Secretarial Stewardship?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002B49]">
              Applicability Across Private, Public & Venture-Backed Companies
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Whether you are preparing for institutional funding or managing statutory compliance thresholds under Section 204, our FCS practice leads your audit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHO_NEEDS_SECRETARIAL.map((item) => (
              <div
                key={item.type}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                  {renderIcon(item.icon, 'w-5 h-5')}
                </div>
                <h3 className="text-sm font-black text-[#002B49]">
                  {item.type}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6-STEP WORKFLOW
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Systematic Secretarial Process
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002B49]">
              How Your Registers & Secretarial Audit Are Completed
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Our 6-stage roadmap ensures thorough discovery, rigorous statutory drafting, and official ICSI Practising Company Secretary sign-off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPLIANCE_WORKFLOW.map((wf) => (
              <div
                key={wf.step}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition duration-200 space-y-3 relative group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#002B49] text-white font-black text-sm flex items-center justify-center">
                  {wf.step}
                </div>
                <h3 className="text-base font-black text-[#002B49]">
                  {wf.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {wf.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          STATUTORY PENALTY AVOIDANCE COMPARISON
          ========================================================================= */}
      <section className="py-16 bg-slate-50/70 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Avoid Draconian MCA Penalties
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002B49]">
              Penalties You Prevent with Maintained Registers
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              The Companies Act 2013 imposes strict direct financial penalties on directors and companies for unmaintained registers and missing minutes.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
            <div className="divide-y divide-slate-100">
              {PENALTY_AVOIDANCE.map((pen, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-slate-50/80 transition"
                >
                  <div className="md:col-span-4 space-y-1">
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wide flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                      <span>{pen.provision}</span>
                    </span>
                    <div className="text-sm font-black text-slate-800">
                      {pen.statutoryCost}
                    </div>
                  </div>

                  <div className="md:col-span-4 text-xs text-slate-500 leading-relaxed">
                    {pen.impact}
                  </div>

                  <div className="md:col-span-4 bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>{pen.bharatfilingSolution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRICING PLANS (STARTER ₹6,999, GROWTH ₹14,999, ENTERPRISE ₹29,999)
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Annual Secretarial Plans
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002B49]">
              Fixed Annual Pricing with Practising CS Certification
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Keep your statutory binders, register folios, and minutes up to date with zero stress and zero risk of MCA notice.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border p-7 flex flex-col justify-between transition duration-200 relative ${
                  plan.popular
                    ? 'border-[#002B49] bg-white shadow-xl ring-2 ring-[#002B49]'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#002B49] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-4">
                  {!plan.popular && (
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                      {plan.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-black text-[#002B49]">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 min-h-[32px]">
                    {plan.description}
                  </p>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-[#002B49]">
                        ₹{plan.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{plan.originalPrice}
                      </span>
                      <span className="text-xs text-slate-500 font-bold">
                        {plan.period}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-blue-700 mt-1">
                      {plan.volume}
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Feature list */}
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPlan) onSelectPlan(plan.id);
                    }}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      plan.popular
                        ? 'bg-[#002B49] hover:bg-[#001f35] text-white shadow-md'
                        : 'bg-white hover:bg-slate-100 text-[#002B49] border border-slate-300'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLIENT TESTIMONIALS
          ========================================================================= */}
      <section className="py-16 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Verified Corporate Testimonials
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002B49]">
              What Corporate Secretaries & Founders Say About Our Audit
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{t.review}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-400">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ ACCORDION (12 DETAILED ITEMS)
          ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#002B49] bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#002B49]">
              All Questions on Secretarial Audit & Statutory Registers Answered
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left gap-4 font-bold text-sm text-[#002B49] hover:text-blue-700 transition cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded-full bg-slate-100 text-slate-500">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-xs text-slate-600 leading-relaxed pr-6 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          VIDEO GUIDE MODAL
          ========================================================================= */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <h3 className="font-bold text-base text-[#002B49] flex items-center gap-2">
                <Play className="w-4 h-4 text-blue-600 fill-current" />
                <span>Statutory Registers & Secretarial Compliance Masterclass</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsGuideModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center text-white space-y-3 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Play className="w-8 h-8 fill-current text-[#FFD200]" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm">
                  Inside Section 88, 170, and 204: How To Maintain Company Registers & Pass Secretarial Audits
                </p>
                <p className="text-xs text-slate-400">
                  Comprehensive overview explaining Form MGT-1, MBP-4, Form MR-3 audit, and private company demat requirements.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsGuideModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-[#002B49] hover:bg-[#001f35] text-white text-xs font-bold transition cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          REFER A FRIEND MODAL
          ========================================================================= */}
      {isReferModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4 text-center">
            <button
              type="button"
              onClick={() => setIsReferModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-2xl shadow-xs">
              🎁
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-[#002B49]">
                Refer a Company, Earn ₹1,500!
              </h3>
              <p className="text-xs text-slate-500">
                Help a fellow board streamline statutory registers and secretarial audit compliance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Your Referral Code</span>
                <span className="font-mono bg-amber-100 text-[#002B49] px-2 py-0.5 rounded border border-amber-300">
                  BF-SEC-2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Your referee gets <strong>₹500 off</strong> their first secretarial retainer, and you get a <strong>₹1,500 Amazon voucher</strong> upon completion.
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(
                    'https://bharatfiling.com/services/secretarial-audit-registers?ref=BF-SEC-2026'
                  );
                  alert('Referral link copied to clipboard!');
                }}
                className="flex-1 py-2.5 bg-[#002B49] hover:bg-[#001f35] text-white text-xs font-bold rounded-lg transition cursor-pointer"
              >
                Copy Link
              </button>
              <button
                type="button"
                onClick={() => setIsReferModalOpen(false)}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition cursor-pointer"
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
