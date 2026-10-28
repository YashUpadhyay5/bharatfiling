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
  BookOpen,
  DollarSign,
  Briefcase,
  Layers,
} from 'lucide-react';

import {
  TAN_PLANS,
  TAN_DEDUCTOR_TYPES,
  APPLICATION_TYPES,
  INDIAN_STATES,
  TRUST_STATS,
  TAN_DOCUMENTS,
  TAN_STRUCTURE_RULES,
  TAN_STEPS,
  TDS_SECTIONS_GUIDE,
  PAN_VS_TAN,
  TAN_FAQS,
} from './constants.js';

export default function TanLandingPage({
  initialData = {},
  onGetStarted,
}) {
  // Lead form state
  const [name, setName] = useState(initialData.name || 'Yash Upadhyay');
  const [phone, setPhone] = useState(
    initialData.phone ? String(initialData.phone).replace('+91', '').trim() : '7668976193'
  );
  const [entityType, setEntityType] = useState(initialData.entityType || 'company');
  const [appType, setAppType] = useState(initialData.appType || 'new');
  const [state, setState] = useState(initialData.state || 'Karnataka');
  const [whatsappOptIn, setWhatsappOptIn] = useState(
    initialData.whatsappOptIn !== undefined ? initialData.whatsappOptIn : true
  );

  // Selected plan state (defaults to standard)
  const [selectedPlanId, setSelectedPlanId] = useState(initialData.plan || 'standard');

  // Interactive TAN Structure Decoder state
  const [decoderCity, setDecoderCity] = useState('BLR');
  const [decoderEntity, setDecoderEntity] = useState('company');
  const [decoderDigits, setDecoderDigits] = useState('01234');
  const [decoderCheck, setDecoderCheck] = useState('A');

  // Document checklist tab
  const [activeDocTab, setActiveDocTab] = useState('company');

  // FAQ search & active accordion
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Quick form error validation
  const [formError, setFormError] = useState('');

  const handleLeadSubmit = (e) => {
    if (e) e.preventDefault();

    if (!name.trim()) {
      setFormError('Please enter your full legal name or authorized signatory name.');
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

  // Filtered FAQs
  const filteredFaqs = TAN_FAQS.filter((f) => {
    if (!faqSearch.trim()) return true;
    const q = faqSearch.toLowerCase();
    return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
  });

  // Current entity code for decoder
  const selectedEntityObj = TAN_DEDUCTOR_TYPES.find((t) => t.id === decoderEntity) || TAN_DEDUCTOR_TYPES[0];
  const decoderCode = selectedEntityObj.code.split('/')[0] || 'C';

  return (
    <div className="font-sans text-slate-800 bg-[#F8FAFC] selection:bg-[#002B49] selection:text-white">

      {/* TOP NOTIFICATION BANNER CROSS-LINKING PAN & TAN */}
      <div className="bg-[#002B49] text-white py-2 px-4 text-xs font-medium text-center border-b border-blue-900/60">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="bg-[#FFCC00] text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wide">
            Statutory Notice
          </span>
          <span>
            Under Section 203A, quoting TAN is mandatory on all TDS payments & returns. Facing ₹10,000 penalty?
          </span>
          <Link
            to="/services/pan-registration"
            className="text-[#FFCC00] hover:underline font-bold inline-flex items-center gap-1"
          >
            Need a PAN Card instead? Apply for PAN Online →
          </Link>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#002B49] via-[#00385F] to-[#002B49] text-white pt-8 pb-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          
          {/* Top Rocket Pill */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs text-blue-100 shadow-sm">
            <span>🚀</span>
            <span className="font-semibold">
              Apply for TAN Registration Online (Form 49B) — Starts from ₹499 / ₹999
            </span>
            <button
              type="button"
              onClick={handleLeadSubmit}
              className="text-[#FFCC00] font-bold hover:underline ml-1 cursor-pointer"
            >
              View Packages →
            </button>
          </div>

          {/* 2-Column Hero Card: Left Title & Highlights, Right Lead Capture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Hero Titles & Value Props */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFCC00] bg-blue-950/60 border border-blue-800/80 px-3 py-1 rounded-full uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Income Tax Department Form 49B • Protean (NSDL)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Apply for <span className="text-[#FFCC00]">TAN Registration</span> Online
              </h1>

              <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-xl">
                Obtain your official 10-digit <strong>Tax Deduction and Collection Account Number (TAN)</strong> under Section 203A of the Income Tax Act. 100% paperless filing, CA verification, TRACES portal activation, and complete protection from statutory ₹10,000 Section 272BB penalties.
              </p>

              {/* 4 Feature Checkpoints with Double-ring styling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">100% Paperless Form 49B</h4>
                    <p className="text-[11px] text-blue-200 mt-0.5">Direct e-filing through official Protean / NSDL portal</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Live 14-Digit NSDL Tracking</h4>
                    <p className="text-[11px] text-blue-200 mt-0.5">Real-time status updates with instant ACK generation</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">TRACES Portal Setup</h4>
                    <p className="text-[11px] text-blue-200 mt-0.5">Complete account setup for Form 16 &amp; 16A downloads</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Dedicated Tax CA Review</h4>
                    <p className="text-[11px] text-blue-200 mt-0.5">Senior Corporate Tax Officer verification for zero defects</p>
                  </div>
                </div>
              </div>

              {/* Statutory Note on Section 203A & 272BB */}
              <div className="bg-amber-500/10 border border-amber-400/30 rounded-xl p-3 text-xs text-amber-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Statutory Mandate:</strong> Failure to obtain TAN or quoting incorrect TAN on TDS return (Form 24Q/26Q) or bank challan (ITNS 281) attracts a mandatory <strong>₹10,000 fine under Section 272BB</strong> of the Income Tax Act.
                </p>
              </div>

            </div>

            {/* Right 5 Columns: Lead Capture Form */}
            <div className="lg:col-span-5 bg-white text-slate-800 rounded-2xl shadow-2xl p-6 sm:p-7 border border-slate-200">
              <div className="space-y-1 mb-5">
                <span className="text-[11px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase tracking-wider">
                  Quick Form 49B Desk
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  Get Started with TAN
                </h3>
                <p className="text-xs text-slate-500">
                  Fill your entity details to view customized packages &amp; statutory fee.
                </p>
              </div>

              {formError && (
                <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                
                {/* Full Name / Authorised Signatory */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Entity Name / Authorised Signatory Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Yash Upadhyay or Bharat Tech Private Limited"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number (For NSDL SMS Alerts) <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-xs font-semibold text-slate-500 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      maxLength={10}
                      className="w-full text-xs px-3.5 py-2.5 rounded-r-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent font-mono transition"
                      required
                    />
                  </div>
                </div>

                {/* Deductor Classification */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Deductor Category / Legal Entity <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={entityType}
                    onChange={(e) => {
                      setEntityType(e.target.value);
                      setActiveDocTab(e.target.value);
                    }}
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002B49] focus:border-transparent transition"
                  >
                    {TAN_DEDUCTOR_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Application Purpose */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Application Type
                    </label>
                    <select
                      value={appType}
                      onChange={(e) => setAppType(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                    >
                      {APPLICATION_TYPES.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label.split('(')[0].trim()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Registered State
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#002B49]"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* WhatsApp Updates Checkbox */}
                <div className="flex items-center gap-2 pt-1 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    id="tan-lead-whatsapp"
                    checked={whatsappOptIn}
                    onChange={(e) => setWhatsappOptIn(e.target.checked)}
                    className="w-4 h-4 rounded text-[#002B49] border-slate-300 focus:ring-[#002B49] cursor-pointer"
                  />
                  <label htmlFor="tan-lead-whatsapp" className="cursor-pointer select-none">
                    Receive NSDL acknowledgment &amp; TAN status alerts on WhatsApp
                  </label>
                </div>

                {/* Submit / Continue CTA */}
                <button
                  type="submit"
                  className="w-full bg-[#002B49] hover:bg-[#001D33] text-white font-bold py-3.5 px-4 rounded-xl text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Continue to Package Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-center text-slate-400">
                  🔒 256-Bit SSL Encrypted • Official Protean (NSDL) Filing Partner
                </p>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* 4 TRUST METRICS STRIP (Matches Vakilsearch / PAN) */}
      <section className="bg-white border-y border-slate-200 py-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {TRUST_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-xl sm:text-2xl font-black text-[#002B49]">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-800">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN BODY CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* INTERACTIVE 10-CHARACTER TAN DECODER */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
                Official ITD Anatomy
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Understand Your 10-Character TAN Structure
              </h2>
              <p className="text-xs text-slate-500 max-w-2xl">
                Every TAN issued by the Income Tax Department follows a strict statutory alphanumeric sequence under Rule 114A of the Income Tax Rules. Test how your TAN will be formed:
              </p>
            </div>

            {/* Quick interactive test controls */}
            <div className="flex flex-wrap gap-2 items-center text-xs">
              <label className="text-slate-600 font-semibold">Try City:</label>
              <select
                value={decoderCity}
                onChange={(e) => setDecoderCity(e.target.value)}
                className="border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50 font-mono font-bold"
              >
                <option value="BLR">BLR (Bengaluru)</option>
                <option value="DEL">DEL (Delhi NCR)</option>
                <option value="MUM">MUM (Mumbai)</option>
                <option value="HYD">HYD (Hyderabad)</option>
                <option value="CHE">CHE (Chennai)</option>
                <option value="KOL">KOL (Kolkata)</option>
                <option value="PUN">PUN (Pune)</option>
                <option value="AHM">AHM (Ahmedabad)</option>
              </select>

              <label className="text-slate-600 font-semibold ml-2">Entity:</label>
              <select
                value={decoderEntity}
                onChange={(e) => setDecoderEntity(e.target.value)}
                className="border border-slate-300 rounded px-2 py-1 text-xs bg-slate-50 font-semibold"
              >
                {TAN_DEDUCTOR_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.code} - {t.label.split('(')[0].trim()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Visual Display of TAN Alphanumeric Pills */}
          <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center space-y-4">
            <span className="text-[11px] uppercase tracking-widest text-blue-300 font-bold">
              Allotted Tax Deduction Account Number Preview
            </span>
            
            <div className="flex items-center gap-1.5 sm:gap-2.5 font-mono text-2xl sm:text-4xl font-black">
              {/* City Code (Chars 1-3) */}
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-inner border border-blue-400">
                {decoderCity}
              </div>
              {/* Category Initial (Char 4) */}
              <div className="bg-amber-400 text-slate-950 px-3.5 py-2 rounded-lg shadow-inner border border-amber-300">
                {decoderCode}
              </div>
              {/* 5 Sequential Digits (Chars 5-9) */}
              <div className="bg-slate-800 text-emerald-400 px-3.5 py-2 rounded-lg shadow-inner border border-slate-700 tracking-wider">
                {decoderDigits}
              </div>
              {/* Check Alphabet (Char 10) */}
              <div className="bg-rose-600 text-white px-3.5 py-2 rounded-lg shadow-inner border border-rose-400">
                {decoderCheck}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-300 pt-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                Chars 1–3: Jurisdiction ({decoderCity})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                Char 4: Deductor Category ({decoderCode})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                Chars 5–9: 5 Unique Digits ({decoderDigits})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                Char 10: Checksum ({decoderCheck})
              </span>
            </div>
          </div>

          {/* Detailed 4-Row Breakdown Table */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {TAN_STRUCTURE_RULES.map((rule, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5">
                <div className="text-[10px] font-bold text-[#002B49] uppercase">
                  Position: {rule.position}
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {rule.label}
                </div>
                <div className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block">
                  {rule.example}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* COMPARISON CARD: PAN VS TAN STATUTORY BREAKDOWN */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Legal Clarification
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              PAN vs. TAN: Statutory Differences You Must Know
            </h2>
            <p className="text-xs text-slate-500">
              Many business founders confuse PAN and TAN. Under Indian tax law, holding a PAN does NOT fulfill the requirement to deduct TDS.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50">
                  <th className="py-3 px-4 font-bold text-slate-700">Compliance Parameter</th>
                  <th className="py-3 px-4 font-bold text-[#002B49] bg-blue-50/50">PAN (Permanent Account Number)</th>
                  <th className="py-3 px-4 font-bold text-emerald-800 bg-emerald-50/50">TAN (Tax Deduction &amp; Collection Number)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PAN_VS_TAN.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-bold text-slate-700">{item.feature}</td>
                    <td className="py-3 px-4 text-slate-600 bg-blue-50/20">{item.pan}</td>
                    <td className="py-3 px-4 font-medium text-slate-800 bg-emerald-50/20">{item.tan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* COMMON TDS SECTIONS & DEDUCTION THRESHOLDS REFERENCE */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Statutory Guide
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              When Must Your Business Deduct TDS Using TAN?
            </h2>
            <p className="text-xs text-slate-500">
              Payments made by companies, LLPs, and audited firms are subject to TDS under various sections of the Income Tax Act.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TDS_SECTIONS_GUIDE.map((sec, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-sm transition space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#002B49] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {sec.section}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Return: {sec.form}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{sec.title}</h4>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">Rate: {sec.rate}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Exemption Threshold:</span> {sec.threshold}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4-STEP ALLOTMENT PROCEDURE */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              End-to-End Workflow
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              4-Step Online TAN Allotment Procedure
            </h2>
            <p className="text-xs text-slate-500">
              Our Chartered Accountants handle the drafting, AO code mapping, and Protean (NSDL) filing from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {TAN_STEPS.map((step, idx) => (
              <div key={idx} className="space-y-3 text-center md:text-left relative">
                <div className="w-12 h-12 rounded-2xl bg-[#002B49] text-[#FFCC00] font-black text-lg flex items-center justify-center shadow-md mx-auto md:mx-0">
                  {step.step}
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DOCUMENT MATRIX ACCORDION / TABS */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase tracking-wider">
              Verification Checklist
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Documents Required for TAN Registration
            </h2>
            <p className="text-xs text-slate-500">
              Select your organization category to view the paperless documentation checklist required for Form 49B:
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            {TAN_DOCUMENTS.map((docGroup) => (
              <button
                key={docGroup.category}
                type="button"
                onClick={() => setActiveDocTab(docGroup.category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeDocTab === docGroup.category
                    ? 'bg-[#002B49] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {docGroup.title.split('&')[0].trim()}
              </button>
            ))}
          </div>

          {/* Active Documents List */}
          {(() => {
            const currentDocGroup =
              TAN_DOCUMENTS.find((d) => d.category === activeDocTab) || TAN_DOCUMENTS[0];

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

        {/* SEARCHABLE FAQS ACCORDION */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#002B49] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded uppercase tracking-wider">
                Legal Clarifications
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Frequently Asked Statutory Questions
              </h2>
              <p className="text-xs text-slate-500">
                Statutory answers verified by Direct Tax Chartered Accountants.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQs (e.g. penalty, TRACES, PAN)"
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

        {/* BOTTOM CTA BAR */}
        <section className="bg-gradient-to-r from-[#002B49] to-[#004B7A] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black tracking-tight">
              Ready to obtain your 10-Digit TAN Number?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Apply via Form 49B online. Fast-track NSDL processing, TRACES setup, and CA vetting starting at ₹499.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLeadSubmit}
            className="bg-[#FFCC00] hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shrink-0 cursor-pointer flex items-center gap-2"
          >
            <span>Proceed to Plan Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

      </main>

      {/* FLOATING WHATSAPP SUPPORT PILL */}
      <a
        href="https://wa.me/917668976193?text=Hi%20BharatFiling,%20I%20have%20a%20query%20regarding%20TAN%20Registration%20Form%2049B."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold transition hover:scale-105"
        title="Chat with Direct Tax CA"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline">WhatsApp Tax Desk</span>
      </a>

    </div>
  );
}
