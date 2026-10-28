import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  FileText,
  FileCheck2,
  AlertCircle,
  HelpCircle,
  Building2,
  Users,
  Search,
  ChevronDown,
  ChevronUp,
  Mail,
  Truck,
  Fingerprint,
  QrCode,
  BadgeCheck,
  Award,
  Lock,
  PhoneCall,
  Check,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

import {
  PAN_PLANS,
  PAN_ENTITIES,
  APPLICATION_TYPES,
  INDIAN_STATES,
  TRUST_STATS,
  PAN_DOCUMENTS,
  PAN_STRUCTURE_RULES,
  PAN_STEPS,
  PAN_FAQS,
} from './constants.js';

export default function PanLandingPage({
  initialData = {},
  onGetStarted,
}) {
  // Lead form state
  const [name, setName] = useState(initialData.name || 'Yash Upadhyay');
  const [phone, setPhone] = useState(
    initialData.phone ? String(initialData.phone).replace('+91', '').trim() : '7668976193'
  );
  const [entityType, setEntityType] = useState(initialData.entityType || 'individual');
  const [appType, setAppType] = useState(initialData.appType || 'new');
  const [state, setState] = useState(initialData.state || 'Karnataka');
  const [whatsappOptIn, setWhatsappOptIn] = useState(
    initialData.whatsappOptIn !== undefined ? initialData.whatsappOptIn : true
  );

  // Search helper at top of hero
  const [serviceSearch, setServiceSearch] = useState('');

  // Selected plan state
  const [selectedPlanId, setSelectedPlanId] = useState(initialData.plan || 'standard');

  // Interactive PAN Structure Decoder
  const [decoderSurname, setDecoderSurname] = useState('Upadhyay');
  const [decoderEntity, setDecoderEntity] = useState('individual');

  // Document checklist tab
  const [activeDocTab, setActiveDocTab] = useState('individual');

  // FAQ search & active accordion
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Quick form error validation
  const [formError, setFormError] = useState('');

  const handleLeadSubmit = (e) => {
    if (e) e.preventDefault();

    if (!name.trim()) {
      setFormError('Please enter your full legal name as per Aadhaar / Official records.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setFormError('');

    const leadPayload = {
      name: name.trim(),
      phone: `+91 ${cleanPhone.slice(-10)}`,
      entityType,
      appType,
      state,
      whatsappOptIn,
      plan: selectedPlanId,
    };

    if (onGetStarted) {
      onGetStarted(leadPayload);
    }
  };

  // Compute 4th and 5th characters for the interactive PAN decoder
  const getEntityCode = (entityId) => {
    const item = PAN_ENTITIES.find((e) => e.id === entityId);
    return item ? item.code : 'P';
  };

  const getSurnameInitial = (str) => {
    const trimmed = (str || '').trim().toUpperCase();
    return trimmed.length > 0 ? trimmed.charAt(0) : 'X';
  };

  const filteredFaqs = PAN_FAQS.filter(
    (faq) =>
      faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#002B49] selection:text-white">
      
      {/* 1. TOP STATUTORY CROSS-LINK NOTICE BAR */}
      <div className="bg-[#002B49] text-white text-xs py-2 px-4 text-center font-medium border-b border-blue-900/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4">
          <span className="flex items-center gap-1.5 text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-[#FFCC00]" />
            <span>Need Tax Deduction credentials for salaries, rent or vendor payments?</span>
          </span>
          <Link
            to="/services/tan-registration"
            className="text-[#FFCC00] hover:underline font-bold inline-flex items-center gap-1"
          >
            Apply for TAN Registration Online (Form 49B) →
          </Link>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative pt-6 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-slate-50">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Top Pill Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#002B49] text-xs font-bold shadow-2xs">
              <span className="text-sm">🚀</span>
              <span>Apply for PAN Card Online — Starts from ₹299 / ₹499</span>
              <span className="text-emerald-700 font-bold ml-1">48 Hr e-PAN Delivery</span>


            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Protean (NSDL) &amp; UTIITSL Authorized Channel</span>
            </div>
          </div>

          {/* MAIN HERO CARD (MATCHING USER SCREENSHOT ARCHITECTURE & VAKILSEARCH STYLING) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
            
            {/* Top Search Pill inside card */}
            <div className="mb-6 pb-6 border-b border-slate-100 flex items-center justify-between">
              <div className="relative w-full max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  placeholder="Ask about PAN card application, correction or reprint..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-slate-200 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49] text-slate-700 bg-slate-50/50"
                />
              </div>
              <span className="hidden sm:inline text-xs text-slate-400 font-medium">
                Income Tax Act, 1961 • Section 139A
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* LEFT COLUMN: HEADINGS & VALUE POINTS */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002B49] tracking-tight leading-tight">
                    Apply for PAN Card Online
                  </h1>
                  <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                    Get your 10-digit Permanent Account Number (PAN) issued by the Income Tax Department via NSDL (Protean) &amp; UTIITSL. Instant digital e-PAN delivery in 48 hours + embossed physical PVC card delivered to your doorstep.
                  </p>
                </div>

                {/* 4 Essential Value Points with Double-Ring Checkmark Badges */}
                <div className="space-y-4 pt-1">
                  
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                      <FileText className="w-4 h-4 text-[#002B49]" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        Form 49A (Indian) &amp; Form 49AA (Foreign) Online Filing
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Complete online preparation and filing for Individuals, Proprietorships, Companies, LLPs, HUFs, and Trusts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                      <Mail className="w-4 h-4 text-[#002B49]" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        Instant Digital e-PAN Delivery in 48 Hours
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Digitally signed e-PAN PDF with QR code sent directly to your email, legally valid across India.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                      <CreditCard className="w-4 h-4 text-[#002B49]" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        Physical High-Security PVC Card Dispatched via SpeedPost
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Tamper-proof card embossed with hologram, photo, and signature delivered to your communication address.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                      <Fingerprint className="w-4 h-4 text-[#002B49]" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">
                        CA Vetting, Biometric e-KYC &amp; Name Correction Support
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Resolve Aadhaar name mismatch, update signature/photo, or reissue lost cards without portal errors.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Required Documents Link */}
                <div className="pt-2">
                  <a
                    href="#documents"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F26522] hover:text-[#002B49] transition"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>View Required Documents by Entity (Aadhaar, COI, Deed) →</span>
                  </a>
    
                </div>

                {/* Partner Trust Block */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-blue-700" />
                    <span><strong>100% Tax Compliant:</strong> Verified by Chartered Accountants &amp; Direct Tax Experts</span>
                  </div>
                  <span className="font-bold text-[#002B49] hidden sm:inline">NSDL / UTIITSL</span>
                </div>

              </div>

              {/* RIGHT COLUMN: LEAD CAPTURE CARD (1:1 VAKILSEARCH-STYLE FORM) */}
              <div className="lg:col-span-5 bg-slate-50/80 rounded-2xl border border-slate-200 p-6 shadow-sm">
                
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-[#002B49] bg-blue-100/70 px-2 py-0.5 rounded uppercase tracking-wider">
                    Online Application Desk
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                    Apply for Your PAN Card
                  </h3>
                  <p className="text-xs text-slate-500">
                    Takes under 2 minutes • Verified by Tax Officers
                  </p>
                </div>

                {formError && (
                  <div className="mb-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleLeadSubmit} className="space-y-3.5 text-left">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name as printed on Aadhaar / COI"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49] bg-white text-slate-900"
                      required
                    />
                  </div>

                  {/* Mobile Number with Flag Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex rounded-lg border border-slate-300 overflow-hidden bg-white focus-within:border-[#002B49]">
                      <div className="flex items-center gap-1 px-2.5 bg-slate-100/80 border-r border-slate-300 text-xs font-semibold text-slate-700 select-none">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="7668976193"
                        className="w-full px-3 py-2 text-xs sm:text-sm focus:outline-none bg-white text-slate-900"
                        required
                      />
                    </div>
                  </div>

                  {/* Applicant Entity Type Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Entity / Applicant Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={entityType}
                      onChange={(e) => setEntityType(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49] bg-white text-slate-900 cursor-pointer"
                    >
                      {PAN_ENTITIES.map((ent) => (
                        <option key={ent.id} value={ent.id}>
                          {ent.label} (4th char: {ent.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Application Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Application Purpose <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={appType}
                      onChange={(e) => setAppType(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49] bg-white text-slate-900 cursor-pointer"
                    >
                      {APPLICATION_TYPES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label} ({t.form})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* State Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Delivery State <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49] bg-white text-slate-900 cursor-pointer"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* WhatsApp Updates Opt-in */}
                  <label className="flex items-center gap-2 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={whatsappOptIn}
                      onChange={(e) => setWhatsappOptIn(e.target.checked)}
                      className="w-4 h-4 rounded text-[#002B49] focus:ring-[#002B49] border-slate-300"
                    />
                    <span className="text-xs text-slate-600">
                      Send NSDL acknowledgement and e-PAN tracking updates on WhatsApp
                    </span>
                  </label>

                  {/* Primary CTA Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-lg bg-[#002B49] hover:bg-[#001D33] text-white font-bold text-sm tracking-wide transition shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Continue to Step 2</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    🔒 SSL Encrypted • Government Fee Included in Standard Package
                  </p>
                </form>

              </div>

            </div>

            {/* BOTTOM TRUST STRIP (1:1 WITH USER SCREENSHOT) */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
              {TRUST_STATS.map((stat, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50/50">
                  <div className="w-9 h-9 rounded-full bg-white border border-slate-200 text-[#002B49] flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                    {i === 0 && '★'}
                    {i === 1 && '🏆'}
                    {i === 2 && '👥'}
                    {i === 3 && '📍'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {stat.value}
                    </div>
                    <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE PAN STRUCTURE DECODER WIDGET */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#002B49] bg-blue-100/70 px-3 py-1 rounded-full uppercase tracking-wider">
              Educational Decoder
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              How Your 10-Digit PAN is Statutorily Generated
            </h2>
            <p className="text-xs text-slate-500 max-w-xl mx-auto">
              Every Permanent Account Number follows the statutory syntax prescribed by Rule 114. See how your entity type and name determine your PAN:
            </p>
          </div>

          {/* Interactive Card Simulator */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Applicant Surname / Business Name:
                </label>
                <input
                  type="text"
                  value={decoderSurname}
                  onChange={(e) => setDecoderSurname(e.target.value)}
                  placeholder="e.g. Upadhyay or Apex"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Taxpayer Status (Entity Type):
                </label>
                <select
                  value={decoderEntity}
                  onChange={(e) => setDecoderEntity(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49]"
                >
                  {PAN_ENTITIES.map((ent) => (
                    <option key={ent.id} value={ent.id}>
                      {ent.label} (Code: {ent.code})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Simulated Embossed PVC PAN Card Preview */}
            <div className="max-w-md mx-auto bg-gradient-to-tr from-sky-100 via-blue-50 to-indigo-100 rounded-2xl border-2 border-blue-300/80 p-5 shadow-lg relative overflow-hidden font-mono text-slate-800">
              
              <div className="flex justify-between items-start text-[10px] text-slate-600 font-bold border-b border-blue-200 pb-2">
                <div>
                  <div className="text-[#002B49] text-xs font-black tracking-wide">INCOME TAX DEPARTMENT</div>
                  <div className="text-[9px] text-slate-500">GOVT. OF INDIA</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-200/80 border border-amber-400 flex items-center justify-center text-[8px] font-bold text-amber-800">
                  QR
                </div>
              </div>

              {/* Simulated 10-Digit Alphanumeric Box */}
              <div className="py-4 text-center">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Permanent Account Number</div>
                <div className="inline-flex items-center gap-1.5 mt-1 px-4 py-2 bg-white/90 rounded-lg border border-blue-200 text-lg sm:text-xl font-black tracking-widest text-[#002B49] shadow-inner">
                  <span className="text-slate-600">AB C</span>
                  <span className="text-emerald-700 bg-emerald-100 px-1 rounded">{getEntityCode(decoderEntity)}</span>
                  <span className="text-indigo-700 bg-indigo-100 px-1 rounded">{getSurnameInitial(decoderSurname)}</span>
                  <span className="text-slate-600">1234</span>
                  <span className="text-slate-600">K</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1.5 flex justify-center gap-3">
                  <span>4th: <strong className="text-emerald-700">{getEntityCode(decoderEntity)}</strong> (Entity)</span>
                  <span>5th: <strong className="text-indigo-700">{getSurnameInitial(decoderSurname)}</strong> (Initial)</span>
                </div>
              </div>

              {/* Name Details */}
              <div className="text-xs space-y-0.5 border-t border-blue-200/80 pt-2">
                <div className="text-[9px] text-slate-500 uppercase">Name:</div>
                <div className="font-bold text-[#002B49]">{name || 'Yash Upadhyay'}</div>
              </div>

            </div>

            {/* Rules Breakdown Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2 text-xs">
              {PAN_STRUCTURE_RULES.map((rule, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{rule.position}</span>
                  <div className="font-bold text-slate-900">{rule.label}</div>
                  <div className="text-[11px] text-slate-500">{rule.desc}</div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 5. ENTITY-SPECIFIC DOCUMENT CHECKLIST MATRIX */}
      <section id="documents" className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-6">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Statutory Documentation Matrix
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Documents Required for PAN Registration (Rule 114)
            </h2>
            <p className="text-xs text-slate-500">
              Clear proof ensures zero objection or delay from the Protean (NSDL) / UTIITSL verification desks.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-2">
            {PAN_DOCUMENTS.map((doc) => (
              <button
                key={doc.category}
                type="button"
                onClick={() => setActiveDocTab(doc.category)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeDocTab === doc.category
                    ? 'bg-[#002B49] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {doc.title}
              </button>
            ))}
          </div>

          {/* Active Tab Documents Card */}
          {PAN_DOCUMENTS.filter((d) => d.category === activeDocTab).map((docGroup) => (
            <div key={docGroup.category} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-base font-bold text-slate-900">
                  {docGroup.title} Documentation
                </h3>
                <span className="text-[11px] font-bold text-[#002B49] bg-blue-100 px-2.5 py-0.5 rounded-full">
                  {docGroup.badge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {docGroup.documents.map((doc, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                    <div className="text-xs font-bold text-[#002B49] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{doc.name}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {doc.options}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 6. 4-STEP ALLOTMENT PROCESS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#002B49] bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Step-by-Step Procedure
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              How Your PAN Application is Processed
            </h2>
            <p className="text-xs text-slate-500">
              Completely digital workflow from application filing to doorstep PVC card courier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PAN_STEPS.map((step) => (
              <div key={step.step} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 relative">
                <span className="text-2xl font-black text-[#002B49]/20 font-mono">
                  {step.step}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. SEARCHABLE STATUTORY FAQS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Knowledge Desk
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Frequently Asked Questions (PAN Card)
            </h2>
            <p className="text-xs text-slate-500">
              Verified statutory compliance guidance under the Income Tax Act, 1961.
            </p>
          </div>

          {/* Search Input for FAQs */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search PAN questions (e.g. minor, duplicate, correction)..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#002B49] bg-slate-50"
            />
          </div>

          {/* FAQ Accordions */}
          <div className="space-y-3 pt-2">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-slate-900 hover:text-[#002B49] transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/50 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. FLOATING WHATSAPP COMPLIANCE PILL */}
      <div className="fixed bottom-5 right-5 z-40">
        <a
          href="https://wa.me/917668976193?text=Hi%20BharatFiling,%20I%20have%20a%20query%20about%20PAN%20card%20registration."
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xl transition-transform hover:scale-105"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Live Chat with Tax Expert</span>
        </a>
      </div>

    </div>
  );
}
