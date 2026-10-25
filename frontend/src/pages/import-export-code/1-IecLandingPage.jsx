import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Globe2,
  FileText,
  Building2,
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
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import {
  IEC_DOCUMENTS,
  IEC_FAQS,
  TESTIMONIALS,
} from './constants.js';

export default function IecLandingPage({ initialData = {}, onGetStarted }) {
  const { showError, showSuccess } = useToast();

  // Lead Form State
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [cityPincode, setCityPincode] = useState(initialData.cityPincode || '');
  const [whatsappOptIn, setWhatsappOptIn] = useState(
    initialData.whatsappOptIn !== undefined ? initialData.whatsappOptIn : true
  );

  // Active Document Tab for Section 5
  const [activeDocTab, setActiveDocTab] = useState('proprietorship');

  // FAQ Accordion State (open first one by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Certificate Sample Modal
  const [showCertModal, setShowCertModal] = useState(false);

  // Active Testimonial index for hero slider
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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
      
      {/* 1. TOP ANNOUNCEMENT & BREADCRUMBS BAR */}
      <div className="bg-[#FAFBFD] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#002B49] transition font-medium">Home</Link>
            <span>&gt;</span>
            <span className="text-slate-800 font-semibold">Importer Exporter Code Registration</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4" /> ISO 27001 Certified Statutory Desk
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 font-medium">100% Online DGFT Application</span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION (1:1 VAKILSEARCH MATCH) */}
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white pt-8 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* ISO Certification Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#002B49] text-xs font-bold tracking-wide">
                <Award className="w-3.5 h-3.5 text-[#002B49]" />
                <span>Only ISO 27001 Certified Platform in Importer Exporter Code Registration</span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-[#022B50] leading-tight tracking-tight">
                  Importer Exporter Code Registration
                </h1>
                <p className="mt-3 text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                  Go global with end-to-end IEC registration support across India. Filing done in 2 Days!
                </p>
              </div>

              {/* Bullet highlights */}
              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm sm:text-base text-slate-700 font-medium">
                    <strong>Expert assisted 100% online IEC Registration</strong>, filing completed in 2 Days! (T&amp;C*)
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm sm:text-base text-slate-700 font-medium">
                    Lifetime validity with zero annual renewal fees &amp; seamless DGFT portal compliance.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm sm:text-base text-slate-700 font-medium">
                    IEC registration made easy for <strong>10,000+ businesses</strong> since 2011.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('section6')}
                  className="px-5 py-2.5 rounded-lg border border-[#022B50] text-[#022B50] hover:bg-blue-50/70 text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer"
                >
                  <span>How to register for (IEC)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowCertModal(true)}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-700 text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>View Certificate Sample</span>
                </button>
              </div>

              {/* Testimonial Quote Snippet */}
              <div className="pt-4 border-t border-slate-200">
                <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs relative">
                  <p className="text-xs sm:text-sm text-slate-600 italic">
                    &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {TESTIMONIALS[activeTestimonial].name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {TESTIMONIALS[activeTestimonial].role} &bull; {TESTIMONIALS[activeTestimonial].location}
                      </div>
                    </div>
                    {/* Dots */}
                    <div className="flex gap-1.5">
                      {TESTIMONIALS.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveTestimonial(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            activeTestimonial === i ? 'w-5 bg-[#022B50]' : 'bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* HERO RIGHT COLUMN: FAST LEAD CAPTURE FORM (1:1 VAKILSEARCH MATCH) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-6 sm:p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#022B50] via-blue-600 to-indigo-600" />

                <div className="mb-5">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Get Started !
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Provide your basic details to initiate DGFT IEC filing
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. founder@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] transition"
                      required
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="9876543210"
                        className="w-full pl-12 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] transition"
                        required
                      />
                    </div>
                  </div>

                  {/* City / Pincode */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / Pincode
                    </label>
                    <input
                      type="text"
                      value={cityPincode}
                      onChange={(e) => setCityPincode(e.target.value)}
                      placeholder="e.g. Mumbai, 400001"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#022B50] focus:ring-1 focus:ring-[#022B50] transition"
                    />
                  </div>

                  {/* WhatsApp Opt-in */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      {/* WhatsApp icon */}
                      <svg className="w-4 h-4 text-emerald-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.085-2.072-.486-1.758-.732-2.883-2.508-2.971-2.624-.088-.116-.714-.949-.714-1.809 0-.86.449-1.282.609-1.458.16-.176.352-.22.469-.22.118 0 .235.001.336.006.107.005.25.04.391.378.144.348.491 1.202.535 1.29.044.088.073.19.015.308-.058.118-.088.19-.176.293-.088.103-.186.23-.265.31-.088.088-.18.184-.077.36.103.176.458.756.983 1.224.675.602 1.244.788 1.42.876.176.088.279.073.382-.044.103-.118.44-.513.558-.689.117-.176.235-.147.396-.088.161.059 1.026.484 1.202.572.176.088.293.132.337.206.044.073.044.426-.1.831z"/>
                      </svg>
                      <span>Get easy updates on WhatsApp</span>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={whatsappOptIn}
                        onChange={(e) => setWhatsappOptIn(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  {/* Submit CTA */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-lg bg-[#022B50] hover:bg-[#033c70] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base tracking-wide transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Talk to Our Expert</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 text-center pt-1">
                    By continuing, you agree to our Terms of Service &amp; Privacy Policy. No registration fees charged upfront.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. QUICK 3-STEP PROCESS CARD (1:1 VAKILSEARCH MATCH) */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              IEC Code Registration With BharatFiling
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Three simple steps to obtain your 10-digit DGFT Importer Exporter Code
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="bg-[#FAFBFD] rounded-2xl p-6 border border-slate-200 relative group hover:border-[#022B50] transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#022B50] flex items-center justify-center font-black text-base mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Talk to our experts
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Book a slot with our international trade specialists and resolve all your queries regarding the DGFT requirements.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAFBFD] rounded-2xl p-6 border border-slate-200 relative group hover:border-[#022B50] transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#022B50] flex items-center justify-center font-black text-base mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Provide the required documents
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our export legal desk will cross-verify all submitted documents (PAN, Bank details, Address proof) for 100% DGFT compliance.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAFBFD] rounded-2xl p-6 border border-slate-200 relative group hover:border-[#022B50] transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#022B50] flex items-center justify-center font-black text-base mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Complete IEC registration
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our team files the online ANF-2A application on DGFT and procures your official 10-digit digital e-IEC certificate within 48 hours.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. STICKY SUB-NAVIGATION BAR */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-3 no-scrollbar text-xs font-bold text-slate-600">
            {[
              { id: 'section1', label: 'Overview' },
              { id: 'section2', label: 'Understanding' },
              { id: 'section3', label: 'Benefits' },
              { id: 'section4', label: 'Legal Framework' },
              { id: 'section5', label: 'Eligibility & Docs' },
              { id: 'section6', label: 'Process' },
              { id: 'section7', label: 'Compliance' },
              { id: 'section8', label: 'Role in Trade' },
              { id: 'section9', label: 'Challenges' },
              { id: 'section10', label: 'Why Us' },
              { id: 'section11', label: 'FAQs' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.id)}
                className="px-3.5 py-1.5 rounded-full hover:bg-slate-100 text-slate-700 whitespace-nowrap transition cursor-pointer"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. DEEP CONTENT SECTIONS (SECTIONS 1 TO 11) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* SECTION 1: OVERVIEW */}
        <section id="section1" className="scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
                Statutory Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Import Export Code (IEC) Registration - An Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Import-Export Code or IEC registration is mandatory for every person and organization engaged in importing and exporting activities from India. This 10-digit code issued by the <strong>Directorate General of Foreign Trade (DGFT)</strong>, Ministry of Commerce and Industry, is necessitated for customs clearance, claiming export incentives, and transferring funds through Authorized Dealer (AD) banks.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you operate as a Sole Proprietorship, Partnership Firm, LLP, or Private Limited Company, acquiring an IEC is your primary legal gateway to international commerce. The entire procedure is online, ensuring swift issuance without physical visits to government offices.
              </p>
            </div>

            <div className="lg:col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
              <div className="w-12 h-12 rounded-xl bg-[#022B50] text-white flex items-center justify-center mb-4">
                <Globe2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Key Highlight</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The IEC code carries <strong>lifetime validity</strong> once issued and does not require annual renewal fees, making it a permanent asset for your business venture.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: UNDERSTANDING IEC */}
        <section id="section2" className="scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="space-y-4 max-w-4xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Definition &amp; Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding Import Export Code (IEC)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              An Importer-Exporter Code acts as a permanent commercial passport for cross-border commerce. Customs authorities will not clear imported shipments without an active IEC, and commercial banks cannot process inward export remittances without citing the registered IEC on official documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#022B50]" />
                <span>When is an IEC Required for Importers?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whenever commercial goods arrive at Indian sea ports or air cargo terminals, customs authorities verify the importer&apos;s IEC before authorizing shipment release and calculating applicable customs duties.
              </p>
            </div>

            <div className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>When is an IEC Required for Exporters?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Required whenever consignments leave Indian ports, and when foreign currency payments are received through commercial banks under RBI guidelines and Foreign Exchange Management regulations.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: BENEFITS */}
        <section id="section3" className="scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Global Growth
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Benefits of Obtaining an IEC
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Unlocking international commercial opportunities with substantial statutory advantages:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Global Business Expansion',
                desc: 'Take your products and services to global buyers across 190+ countries with full statutory recognition.',
                icon: Globe2,
              },
              {
                title: 'Government Export Subsidies',
                desc: 'Avail duty credit scrips, RoDTEP benefits, and duty drawback refunds directly from the DGFT and Ministry of Commerce.',
                icon: Award,
              },
              {
                title: 'Lifetime Validity',
                desc: 'Issued for the lifetime of your legal entity. No burdensome recurring renewal charges or complicated paperwork.',
                icon: Clock,
              },
              {
                title: 'No Post-Filing Compliance Burden',
                desc: 'Unlike GST return filings, the IEC has no recurring monthly or quarterly return obligations once generated.',
                icon: CheckCircle2,
              },
              {
                title: 'Seamless Customs Clearance',
                desc: 'Ensures frictionless freight transit through all Indian ports, CFS depots, and airport air-cargo terminals.',
                icon: ShieldCheck,
              },
              {
                title: 'Authorized Foreign Remittances',
                desc: 'Enables inward and outward commercial wire transfers through authorized bank channels under RBI regulations.',
                icon: Building2,
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#022B50] flex items-center justify-center">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{benefit.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: LEGAL FRAMEWORK */}
        <section id="section4" className="scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="bg-[#FAFBFD] p-8 rounded-3xl border border-slate-200 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Statutory Basis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Legal Framework Governing IEC
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              The Importer Exporter Code operates under Section 7 of the <strong>Foreign Trade (Development and Regulation) Act, 1992</strong>, read with Chapter 2 of the <strong>Foreign Trade Policy (FTP)</strong>. Under statutory rules:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc pl-5">
              <li>No person shall make any import or export except under an IEC number granted by the DGFT.</li>
              <li>The IEC is aligned with the entity&apos;s Permanent Account Number (PAN) issued by the Income Tax Department.</li>
              <li>Under the updated DGFT notification, all IEC holders must electronically validate their details annually between April and June on the official portal.</li>
            </ul>
          </div>
        </section>

        {/* SECTION 5: ELIGIBILITY & DOCUMENTS REQUIRED */}
        <section id="section5" className="scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Checklist &amp; Criteria
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Eligibility &amp; Documents Required for IEC Registration
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Select your business constitution below to review the required paperwork:
            </p>
          </div>

          {/* Constitution Tab Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { id: 'proprietorship', label: 'Sole Proprietorship' },
              { id: 'partnership', label: 'Partnership Firm' },
              { id: 'llp_company', label: 'LLP / Pvt Ltd / Ltd' },
              { id: 'trust_society', label: 'Trust / Society / HUF' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDocTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeDocTab === tab.id
                    ? 'bg-[#022B50] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Documents List Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
            <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#022B50]" />
              <span>Required Documents for {activeDocTab.replace('_', ' ').toUpperCase()}</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {IEC_DOCUMENTS[activeDocTab]?.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Important Note:</strong> The bank account title must match the entity name as registered in the PAN card to prevent DGFT portal rejection.
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 6: PROCESS (1:1 VAKILSEARCH MATCH) */}
        <section id="section6" className="scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Procedural Blueprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Step-by-Step IEC Registration Process
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              How our export legal desk gets your code approved from the DGFT:
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                step: 'Step 1',
                title: 'Document Assembly & Pre-Validation',
                desc: 'Our CA/CS team collects your PAN, cancelled cheque, and address proof, performing pre-validation against DGFT database standards.',
              },
              {
                step: 'Step 2',
                title: 'DGFT Portal User Profile Creation',
                desc: 'We register an official profile on the DGFT portal (dgft.gov.in) and complete digital OTP and DSC authentication.',
              },
              {
                step: 'Step 3',
                title: 'Filing the Online ANF-2A Application',
                desc: 'Our team enters your business jurisdiction, bank branch IFSC/MICR, and NIC activity codes with zero errors.',
              },
              {
                step: 'Step 4',
                title: 'Payment of Government Fees',
                desc: 'The official statutory registration fee is remitted via Bharatkosh payment gateway directly to the DGFT account.',
              },
              {
                step: 'Step 5',
                title: 'e-IEC Issuance & Certificate Delivery',
                desc: 'Upon verification, the DGFT issues the 10-digit digital e-IEC certificate, sent to your registered email with our post-filing advisory kit.',
              },
            ].map((proc, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition"
              >
                <div className="flex items-start gap-4">
                  <span className="px-2.5 py-1 rounded bg-[#022B50] text-white text-xs font-bold uppercase shrink-0">
                    {proc.step}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">{proc.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">{proc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: POST-REGISTRATION COMPLIANCE */}
        <section id="section7" className="scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Ongoing Maintenance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Post-Registration Compliance and Obligations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-slate-900">Mandatory Annual Update</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                DGFT mandates that every IEC holder must confirm or update their details electronically every year between April and June, even if there are no changes. Failure to update results in the IEC being placed in the inactive list.
              </p>
            </div>

            <div className="bg-[#FAFBFD] p-6 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-slate-900">Modification &amp; Surrender</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                If your business changes directors, partners, bank accounts, or registered office addresses, an amendment filing is required on the DGFT portal. If business operations cease, the code can be officially surrendered online.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8: ROLE IN INTERNATIONAL TRADE */}
        <section id="section8" className="scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Trade Ecosystem
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Role of IEC in International Trade
            </h2>
            <p className="text-sm text-slate-600">
              The IEC functions as the universal identifier linking Indian businesses to customs ports, ICEGATE, export councils (RCMC), and foreign buyer networks.
            </p>
          </div>
        </section>

        {/* SECTION 9: COMMON CHALLENGES */}
        <section id="section9" className="scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="bg-rose-50/50 p-6 sm:p-8 rounded-3xl border border-rose-200/80 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Common Challenges in IEC Registration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
              <div className="p-3 bg-white rounded-xl border border-rose-100">
                <strong>Name Mismatch:</strong> Slight spelling differences between PAN card and Bank records cause immediate portal failure.
              </div>
              <div className="p-3 bg-white rounded-xl border border-rose-100">
                <strong>Outdated Address Proof:</strong> Submitting utility bills older than 2 months leads to rejection by the regional DGFT officer.
              </div>
              <div className="p-3 bg-white rounded-xl border border-rose-100">
                <strong>Wrong Activity Mapping:</strong> Choosing incorrect NIC/HS codes can delay subsequent export incentive approvals.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: WHY BHARATFILING */}
        <section id="section10" className="scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="bg-gradient-to-r from-[#022B50] to-[#04457e] p-8 sm:p-10 rounded-3xl text-white space-y-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Why BharatFiling for Import Export Code?
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
                Trusted by 10,000+ businesses since 2011 for accurate, hassle-free statutory compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <div className="text-2xl font-black text-amber-400">48 Hours</div>
                <div className="text-xs font-bold text-white mt-1">Express Turnaround</div>
                <div className="text-[11px] text-blue-100 mt-1">Prompt DGFT submission with zero rejection rate.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <div className="text-2xl font-black text-amber-400">100%</div>
                <div className="text-xs font-bold text-white mt-1">Online &amp; Paperless</div>
                <div className="text-[11px] text-blue-100 mt-1">No physical visits required to DGFT regional offices.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                <div className="text-2xl font-black text-amber-400">Dedicated</div>
                <div className="text-xs font-bold text-white mt-1">Export Advisor</div>
                <div className="text-[11px] text-blue-100 mt-1">End-to-end guidance from senior international trade CA/CS.</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11: FAQS ACCORDION (1:1 VAKILSEARCH MATCH) */}
        <section id="section11" className="scroll-mt-20 pt-8 border-t border-slate-200">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              FAQs on Import Export Code Registration
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything you need to know about the DGFT IEC application and legal requirements:
            </p>
          </div>

          <div className="space-y-3 max-w-4xl">
            {IEC_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>

      {/* 6. SAMPLE CERTIFICATE PREVIEW MODAL (1:1 VAKILSEARCH MATCH) */}
      {showCertModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setShowCertModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full p-4 sm:p-5 shadow-2xl relative border border-slate-200 animate-in fade-in zoom-in-95 duration-150 max-h-[94vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Sample Importer-Exporter Code (IEC) Certificate
                </h3>
                <p className="text-[11px] text-slate-500">
                  Directorate General of Foreign Trade &bull; Government of India
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Display Container */}
            <div className="overflow-y-auto flex-1 rounded-xl border border-slate-200 bg-[#FAFBFD] p-2 sm:p-4 flex justify-center items-center shadow-inner">
              <img
                src="/iec-certificate-sample.png"
                alt="DGFT Importer Exporter Code Certificate Sample"
                className="w-full max-w-[480px] h-auto object-contain rounded-lg border border-slate-300 shadow-md bg-white"
              />
            </div>

            {/* Modal Footer */}
            <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                * Specimen certificate format issued by DGFT
              </span>
              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                className="px-5 py-2 rounded-lg bg-[#022B50] hover:bg-[#033c70] text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. FLOATING BOTTOM BAR (MOBILE / TABLET CONVENIENCE) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 shadow-lg flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-slate-500 font-bold uppercase">IEC Filing in 2 Days</div>
          <div className="text-xs font-black text-slate-900">Expert Assisted Application</div>
        </div>
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-4 py-2.5 rounded-lg bg-[#022B50] text-white text-xs font-bold tracking-wide transition shadow-xs cursor-pointer"
        >
          Get Started
        </button>
      </div>

    </div>
  );
}
