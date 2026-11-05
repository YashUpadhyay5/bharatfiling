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
  TDS_HERO,
  TRUSTED_PARTNERS,
  CORE_FEATURES,
  SECTIONS_COVERED,
  WHO_NEEDS_TDS,
  COMPLIANCE_WORKFLOW,
  PENALTY_AVOIDANCE,
  PRICING_PLANS,
  TESTIMONIALS,
  FAQS,
} from './constants.js';

export default function StatutoryTdsLandingPage({
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
      case 'FileText':
        return <FileText className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneClean = phone.replace(/\D/g, '');

    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!phoneClean || phoneClean.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!cityPincode.trim() || cityPincode.trim().length < 3) {
      newErrors.cityPincode = 'Please enter your city or 6-digit pincode';
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
        <span className="rotate-90">🎁</span>
        <span>Refer a friend</span>
      </button>

      {/* =========================================================================
          TOP HINDI NOTIFICATION BANNER
          ========================================================================= */}
      {showHindiBanner && (
        <div className="bg-slate-50 border-b border-slate-200 text-center py-2 px-4 text-xs text-slate-600 flex items-center justify-center gap-2 relative">
          <span>
            {isHindi
              ? 'अब आप इस पृष्ठ को अंग्रेजी में पढ़ सकते हैं।'
              : 'Now you can read this page in Hindi.'}
          </span>
          <button
            type="button"
            onClick={() => setIsHindi(!isHindi)}
            className="text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer"
          >
            {isHindi ? 'Change language to English' : 'Change language to हिन्दी'}
          </button>
          <button
            type="button"
            onClick={() => setShowHindiBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =========================================================================
          HERO SECTION (Left Value Proposition + Right Form Card)
          ========================================================================= */}
      <section className="relative bg-gradient-to-b from-[#f8fafc] via-white to-slate-50 pt-10 pb-16 lg:py-16 overflow-hidden border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 text-[#002B49] text-xs font-bold shadow-xs">
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span>{TDS_HERO.badge}</span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002B49] tracking-tight leading-tight">
                  {isHindi
                    ? 'वैधानिक टीडीएस अनुपालन और रिटर्न फाइलिंग ऑनलाइन'
                    : TDS_HERO.title}
                </h1>
              </div>

              {/* Bullet Points with Checkmarks */}
              <div className="space-y-3.5 pt-1">
                {TDS_HERO.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-100/70 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Complete Guide Video Link Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsGuideModalOpen(true)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#002B49] hover:text-blue-700 transition cursor-pointer group underline underline-offset-4"
                >
                  <div className="w-6 h-6 rounded-full bg-[#002B49] text-white flex items-center justify-center group-hover:scale-105 transition shadow-xs">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </div>
                  <span>{TDS_HERO.guideLinkText}</span>
                </button>
              </div>

              {/* Trust Micro-Metrics */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200/80 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-slate-800">4.9/5</span>
                  <span>(12,000+ returns filed)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-slate-700">100% On-Time Challan 281 Deposit</span>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="lg:col-span-5 relative">
              {/* Diwali Festive Sale Offer floating ribbon */}
              <div className="absolute -top-3.5 right-6 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-extrabold text-[11px] shadow-md tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{TDS_HERO.festiveBadge}</span>
              </div>

              {/* Card Container */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-7 relative overflow-hidden">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 text-center">
                  {TDS_HERO.cardTitle}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="sr-only">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className={`w-full px-3.5 py-3 text-xs sm:text-sm rounded-lg border bg-white focus:outline-hidden transition ${
                        errors.email
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400'
                          : 'border-slate-300 focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number Input */}
                  <div>
                    <label className="sr-only">Mobile Number</label>
                    <input
                      type="tel"
                      maxLength="10"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                      }
                      placeholder="Mobile Number"
                      className={`w-full px-3.5 py-3 text-xs sm:text-sm rounded-lg border bg-white focus:outline-hidden transition ${
                        errors.phone
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400'
                          : 'border-slate-300 focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* City/Pincode Input */}
                  <div>
                    <label className="sr-only">City/Pincode</label>
                    <input
                      type="text"
                      value={cityPincode}
                      onChange={(e) => setCityPincode(e.target.value)}
                      placeholder="City/Pincode"
                      className={`w-full px-3.5 py-3 text-xs sm:text-sm rounded-lg border bg-white focus:outline-hidden transition ${
                        errors.cityPincode
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-400'
                          : 'border-slate-300 focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49]'
                      }`}
                    />
                    {errors.cityPincode && (
                      <p className="text-[11px] text-rose-500 mt-1 font-medium">
                        {errors.cityPincode}
                      </p>
                    )}
                  </div>

                  {/* WhatsApp Opt-in Row */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span>Get easy updates through</span>
                      <span className="inline-flex items-center text-emerald-600 font-bold">
                        Whatsapp
                      </span>
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={whatsappUpdates}
                      onClick={() => setWhatsappUpdates(!whatsappUpdates)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                        whatsappUpdates ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                          whatsappUpdates ? 'translate-x-4.5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Get Started Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 bg-[#002B49] hover:bg-[#001f35] text-white font-extrabold text-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Sub-card Pricing Hint */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-500">
                    Starts at just{' '}
                    <span className="line-through text-slate-400">
                      ₹{TDS_HERO.pricingNote.original}
                    </span>{' '}
                    <strong className="text-emerald-700 font-extrabold text-sm">
                      ₹{TDS_HERO.pricingNote.current}
                    </strong>{' '}
                    <span className="text-[11px]">
                      {TDS_HERO.pricingNote.unit}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUSTED PARTNERS SECTION
          ========================================================================= */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-[#002B49] tracking-tight">
              Trusted Partners
            </h2>
            <div className="w-12 h-0.5 bg-[#002B49] mx-auto mt-1 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
            {TRUSTED_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center p-3 text-xs font-bold text-slate-700 hover:text-[#002B49] bg-slate-50/60 rounded-xl border border-slate-100 transition"
              >
                {partner.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE FEATURES & CAPABILITIES
          ========================================================================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Complete 360° TDS Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Why Indian Companies Choose BharatFiling for Statutory TDS
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              From monthly Challan 281 deposit to quarterly Form 24Q/26Q e-filing and TRACES default resolution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_FEATURES.map((feat) => (
              <div
                key={feat.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002B49] flex items-center justify-center">
                    {renderIcon(feat.icon, 'w-5 h-5 text-[#002B49]')}
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTIONS COVERED (194C, 194J, 194I, 194Q, 192, 195)
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Key Statutory TDS Sections Managed
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Precise statutory deduction rates, threshold limits, and documentation across all payment categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SECTIONS_COVERED.map((sec) => (
              <div
                key={sec.section}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all duration-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-800 bg-blue-100/70 px-2.5 py-1 rounded-lg">
                    {sec.section}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white text-[#002B49] flex items-center justify-center shadow-2xs">
                    {renderIcon(sec.icon, 'w-4 h-4 text-[#002B49]')}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{sec.title}</h3>

                <div className="space-y-1.5 pt-2 border-t border-slate-200/70 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400">Rate:</span>
                    <span className="font-bold text-slate-800">{sec.rate}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400">Threshold:</span>
                    <span className="font-semibold text-slate-700">{sec.threshold}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHO NEEDS STATUTORY TDS COMPLIANCE?
          ========================================================================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Who Needs Statutory TDS Compliance Services?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Customized withholding workflows for every category of Indian deductor
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHO_NEEDS_TDS.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002B49] flex items-center justify-center shadow-xs">
                    {renderIcon(item.icon, 'w-5 h-5 text-[#002B49]')}
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-full border border-blue-200">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          STEP-BY-STEP COMPLIANCE WORKFLOW (6 STEPS)
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              How It Works: Monthly & Quarterly TDS Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              A seamless 6-step cycle ensuring zero short-deduction notices and timely Form 16A issuance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPLIANCE_WORKFLOW.map((wf) => (
              <div
                key={wf.step}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs relative overflow-hidden"
              >
                <div className="text-2xl font-black text-[#002B49]/15 absolute top-4 right-5 font-mono">
                  {wf.step}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {wf.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {wf.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PENALTY AVOIDANCE & STATUTORY DEADLINES TABLE
          ========================================================================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Heavy Statutory Penalties</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Penalties Avoided with BharatFiling TDS Retainer
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              How our proactive compliance calendar protects your business from punitive interest and disallowances
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs bg-white">
            <div className="grid grid-cols-12 bg-slate-100 text-xs font-bold text-slate-700 p-4 border-b border-slate-200">
              <div className="col-span-3">Penalty / Provision</div>
              <div className="col-span-3 text-rose-700">Statutory Charge</div>
              <div className="col-span-3 text-amber-700">Financial Impact</div>
              <div className="col-span-3 text-emerald-700">BharatFiling Shield</div>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {PENALTY_AVOIDANCE.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 p-4 items-center hover:bg-slate-50 transition"
                >
                  <div className="col-span-3 font-bold text-slate-900 pr-2">
                    {row.provision}
                  </div>
                  <div className="col-span-3 text-rose-600 font-semibold pr-2">
                    {row.statutoryCost}
                  </div>
                  <div className="col-span-3 text-slate-500 pr-2">
                    {row.impact}
                  </div>
                  <div className="col-span-3 text-emerald-800 font-semibold flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{row.bharatfilingSolution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PLANS & PRICING
          ========================================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Transparent Statutory TDS Retainer Plans
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Clear monthly pricing covering all challans, quarterly 24Q/26Q filings, and Form 16A generation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl bg-white border transition-all duration-200 flex flex-col justify-between relative p-6 sm:p-8 ${
                  plan.popular
                    ? 'border-[#002B49] shadow-xl ring-2 ring-[#002B49]/10'
                    : 'border-slate-200/90 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#002B49] text-white font-extrabold text-[10px] uppercase tracking-wider shadow-xs">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {plan.name}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {plan.volume}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl sm:text-4xl font-black text-[#002B49]">
                      ₹{plan.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{plan.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      /{plan.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mb-6 font-normal">
                    {plan.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-600 leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => onSelectPlan && onSelectPlan(plan.id)}
                    className={`w-full py-3 px-4 font-bold text-xs rounded-lg transition-all duration-200 cursor-pointer ${
                      plan.popular
                        ? 'bg-[#002B49] hover:bg-[#001f35] text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CUSTOMER REVIEWS & TESTIMONIALS
          ========================================================================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Trusted by 10,000+ Indian Companies & CFOs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Read how our dedicated CA desk eliminated TRACES defaults and streamlined vendor TDS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{t.review}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQS ACCORDION SECTION
          ========================================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#002B49]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Everything you need to know about statutory TDS deduction, return filing, and TRACES compliance
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#002B49] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
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
          BOTTOM CTA BAR
          ========================================================================= */}
      <section className="py-12 bg-[#002B49] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to Eliminate TDS Default Notices & Late Fees?
          </h2>
          <p className="text-xs sm:text-sm text-blue-200 max-w-xl mx-auto">
            Get 100% on-time challan deposit, TRACES validation, and quarterly 24Q/26Q e-filing starting at ₹1,499/month.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-lg bg-[#FFD200] hover:bg-[#ffc800] text-[#002B49] font-black text-sm shadow-lg transition transform hover:scale-105 cursor-pointer"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMPLETE GUIDE MODAL
          ========================================================================= */}
      {isGuideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsGuideModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                <Play className="w-3 h-3 fill-blue-700" />
                <span>Complete Walkthrough</span>
              </div>

              <h3 className="text-xl font-black text-[#002B49]">
                Complete Guide to Statutory TDS Compliance
              </h3>

              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative flex items-center justify-center text-white">
                <div className="text-center space-y-3 p-6">
                  <div className="w-16 h-16 rounded-full bg-[#FFD200] text-[#002B49] mx-auto flex items-center justify-center shadow-lg">
                    <Play className="w-7 h-7 fill-[#002B49] ml-1" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">
                      Mastering TDS Deductions, Challan 281 & TRACES
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Learn how Section 194C, 194J, 194I, 194Q, and 24Q/26Q e-filing work in India.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-2 pt-2">
                <p>
                  <strong>Key Highlights Covered in this Guide:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-500">
                  <li>Mandatory monthly deposit deadline (7th of subsequent month via Challan ITNS 281)</li>
                  <li>Difference between Form 24Q (Salary), Form 26Q (Vendors), and Form 27Q (Foreign payees)</li>
                  <li>How to prevent Section 234E late fees of ₹200/day and Section 271H penalties</li>
                  <li>Handling Section 206AB higher-rate deductions for non-filers of income tax returns</li>
                  <li>Downloading watermarked Form 16 & Form 16A certificates directly from TRACES</li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsGuideModalOpen(false)}
                  className="w-full py-2.5 bg-[#002B49] hover:bg-[#001f35] text-white text-xs font-bold rounded-lg transition cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          REFER A FRIEND MODAL
          ========================================================================= */}
      {isReferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in-95 duration-200 text-center space-y-4">
            <button
              type="button"
              onClick={() => setIsReferModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-2xl shadow-xs">
              🎁
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-[#002B49]">
                Refer a Business, Earn ₹1,000!
              </h3>
              <p className="text-xs text-slate-500">
                Help a fellow founder or company streamline their statutory TDS compliance.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>Your Referral Code</span>
                <span className="font-mono bg-amber-100 text-[#002B49] px-2 py-0.5 rounded border border-amber-300">
                  BF-TDS-2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Your referee gets <strong>₹500 off</strong> their first statutory TDS retainer, and you get a <strong>₹1,000 Amazon voucher</strong> upon their first quarterly filing.
              </p>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('https://bharatfiling.com/services/statutory-tds-compliance?ref=BF-TDS-2026');
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
