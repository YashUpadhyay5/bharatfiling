import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Play,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  Scale,
  Sparkles,
  ArrowRight,
  Gift,
  HelpCircle,
  Building2,
  Users,
  Award,
  Lock,
  Phone,
  Mail,
  Check,
} from 'lucide-react';
import {
  PROVISIONAL_PATENT_HERO,
  PROVISIONAL_PATENT_TESTIMONIALS,
  TRUSTED_PARTNERS,
  STATUTORY_HIGHLIGHTS,
  KEY_BENEFITS,
  PROVISIONAL_VS_COMPLETE,
  STATUTORY_FORMS_CHECKLIST,
  FILING_PROCESS_STEPS,
  PRICING_PACKAGES,
  FAQS,
} from './constants.js';

export default function ProvisionalPatentLandingPage({
  initialData = {},
  onSubmitLead,
  onSelectPlan,
}) {
  // Form State
  const [formData, setFormData] = useState({
    email: initialData.email || '',
    phone: initialData.phone || '',
    cityPincode: initialData.cityPincode || '',
    whatsappUpdates: initialData.whatsappUpdates !== false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Video Modal State
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Testimonial Carousel State
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Referral Modal State
  const [isReferralOpen, setIsReferralOpen] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex(
        (prev) => (prev + 1) % PROVISIONAL_PATENT_TESTIMONIALS.length
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.email || !formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.cityPincode || formData.cityPincode.trim().length < 3) {
      errors.cityPincode = 'Please enter your City or Pincode';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    if (onSubmitLead) {
      onSubmitLead(formData);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-[#002B49] selection:text-white relative">
      
      {/* RIGHT STICKY REFER A FRIEND TAB */}
      <button
        type="button"
        onClick={() => setIsReferralOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#FECB00] hover:bg-[#F5B800] text-slate-900 font-bold px-2 py-4 rounded-l-xl shadow-lg flex flex-col items-center gap-2 cursor-pointer transition transform hover:-translate-x-1"
        style={{ writingMode: 'vertical-rl' }}
      >
        <Gift className="w-4 h-4 text-slate-900 transform rotate-90" />
        <span className="text-xs uppercase tracking-wider font-extrabold">Refer a friend</span>
      </button>

      {/* HERO SECTION (1:1 Exact Match with media_1793356788090_8e592c5c.png) */}
      <section className="relative pt-6 pb-14 bg-gradient-to-b from-slate-50/80 via-white to-white overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb matching screenshot */}
          <div className="text-xs text-slate-500 mb-6 flex items-center gap-1.5 font-medium">
            <Link to="/" className="text-slate-600 hover:text-slate-900 hover:underline">
              Home
            </Link>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-800 font-semibold">provisional patent</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT 7 COLUMNS: HERO TEXT, BULLETS, VIDEO CTA, TESTIMONIAL CAROUSEL */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* ISO 27001 Certified Platform Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50/70 text-blue-900 text-xs font-semibold shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Only ISO 27001 Certified Platform in</span>
                <span className="text-sm">🇮🇳</span>
              </div>

              {/* Hero Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
                Provisional Patent Application – Secure Priority Today
              </h1>

              {/* 3 Value Propositions with Checkmarks matching screenshot */}
              <ul className="space-y-3 text-sm sm:text-base text-slate-700">
                {PROVISIONAL_PATENT_HERO.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Video CTA Link "Know about Provisional Patent in 60 seconds" */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#002B49] hover:text-blue-900 transition cursor-pointer group"
                >
                  <div className="w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center group-hover:scale-110 transition shadow-xs">
                    <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                  </div>
                  <span className="underline underline-offset-4 decoration-slate-400 group-hover:decoration-[#002B49]">
                    {PROVISIONAL_PATENT_HERO.videoText}
                  </span>
                </button>
              </div>

              {/* Testimonials Carousel (Exact match with Adetee Agarwaal card) */}
              <div className="pt-6 border-t border-slate-100">
                <div className="relative overflow-hidden">
                  <div className="flex gap-4 items-stretch">
                    
                    {/* Left subtle preview text */}
                    <div className="hidden sm:block w-24 shrink-0 opacity-40 select-none pointer-events-none text-[11px] text-slate-500 italic truncate pt-3 border-r border-slate-200 pr-2">
                      ...saved me time and...
                    </div>

                    {/* Active Testimonial Card */}
                    <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col justify-between transition-all">
                      <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed mb-3">
                        &ldquo;{PROVISIONAL_PATENT_TESTIMONIALS[currentTestimonialIndex].quote}&rdquo;
                      </p>

                      <div className="flex items-center gap-3">
                        <img
                          src={PROVISIONAL_PATENT_TESTIMONIALS[currentTestimonialIndex].avatar}
                          alt={PROVISIONAL_PATENT_TESTIMONIALS[currentTestimonialIndex].author}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">
                            {PROVISIONAL_PATENT_TESTIMONIALS[currentTestimonialIndex].author}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            {PROVISIONAL_PATENT_TESTIMONIALS[currentTestimonialIndex].title}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Carousel Indicators */}
                  <div className="flex items-center justify-center gap-2 pt-3">
                    {PROVISIONAL_PATENT_TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentTestimonialIndex(i)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          currentTestimonialIndex === i
                            ? 'w-6 bg-[#002B49]'
                            : 'w-2 bg-slate-300 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT 5 COLUMNS: LEAD CAPTURE FORM WITH FESTIVE SALE RIBBON */}
            <div className="lg:col-span-5 relative">
              
              {/* Diwali Festive Sale Ribbon matching screenshot */}
              <div className="absolute -top-4 left-6 z-20 flex items-center gap-1.5 bg-[#0052CC] text-white text-[11px] font-black px-3.5 py-1 rounded-md shadow-md">
                <span className="text-amber-300">🪔</span>
                <span>Diwali Festive Sale Offer</span>
                <span className="text-amber-300">✨</span>
              </div>

              {/* Form Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 pt-8 space-y-5 relative">
                
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 text-center tracking-tight">
                  Apply for Provisional Patent
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Email Input */}
                  <div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Email"
                      className={`w-full text-xs sm:text-sm px-4 py-3 rounded-lg border transition ${
                        formErrors.email
                          ? 'border-red-400 bg-red-50/50'
                          : 'border-slate-300 focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49]'
                      } outline-none`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Mobile Number Input */}
                  <div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Mobile Number"
                      className={`w-full text-xs sm:text-sm px-4 py-3 rounded-lg border transition ${
                        formErrors.phone
                          ? 'border-red-400 bg-red-50/50'
                          : 'border-slate-300 focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49]'
                      } outline-none`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* City / Pincode Input */}
                  <div>
                    <input
                      type="text"
                      value={formData.cityPincode}
                      onChange={(e) => handleInputChange('cityPincode', e.target.value)}
                      placeholder="City/Pincode"
                      className={`w-full text-xs sm:text-sm px-4 py-3 rounded-lg border transition ${
                        formErrors.cityPincode
                          ? 'border-red-400 bg-red-50/50'
                          : 'border-slate-300 focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49]'
                      } outline-none`}
                    />
                    {formErrors.cityPincode && (
                      <p className="text-[11px] text-red-500 mt-1 font-medium">{formErrors.cityPincode}</p>
                    )}
                  </div>

                  {/* WhatsApp Toggle Switch matching screenshot */}
                  <div className="flex items-center justify-between text-xs text-slate-700 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span>Get easy updates through</span>
                      <span className="font-bold text-emerald-600 flex items-center gap-1">
                        <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                          💬
                        </span>
                        Whatsapp
                      </span>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={formData.whatsappUpdates}
                      onClick={() => handleInputChange('whatsappUpdates', !formData.whatsappUpdates)}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
                        formData.whatsappUpdates ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                          formData.whatsappUpdates ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Get Started Button matching screenshot */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#002B49] hover:bg-[#001D33] text-white font-bold py-3.5 px-6 rounded-lg text-sm tracking-wide transition shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </form>

                <p className="text-[11px] text-slate-400 text-center">
                  By continuing, you agree to our Terms of Service and Privacy Policy. All disclosures protected under strict NDA.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TRUSTED PARTNERS (Exact Match with media_1793356788090_8e592c5c.png) */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] tracking-tight">
            Trusted Partners
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
            {TRUSTED_PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="h-16 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-300 flex items-center justify-center p-3 transition shadow-2xs group"
              >
                <span
                  className="font-black text-sm tracking-tight opacity-75 group-hover:opacity-100 transition"
                  style={{ color: partner.color }}
                >
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATUTORY HIGHLIGHTS GRID */}
      <section className="py-12 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATUTORY_HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-1"
              >
                <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                  {item.label}
                </span>
                <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {item.value}
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {item.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS A PROVISIONAL PATENT APPLICATION */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Statutory Foundations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What is a Provisional Patent Application?
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 space-y-4 leading-relaxed">
            <p>
              Under <strong>Section 9 of the Patents Act, 1970</strong>, an application for a patent may be accompanied by a <strong>Provisional Specification</strong> when an invention is in its conceptual, prototype, or R&amp;D development stage. It serves as an official preliminary filing with the Indian Patent Office (IPO) to record the earliest possible filing date for the inventive concept.
            </p>
            <p>
              Filing a provisional application grants the applicant a statutory <strong>12-month window</strong> from the filing date to test market reception, finalize technical features, and prepare a <strong>Complete Specification</strong> with formal claims. If a complete specification is not filed within 12 months, the application is deemed abandoned by law.
            </p>
            <p>
              Because India operates on a strict <strong>&ldquo;First-to-File&rdquo;</strong> patent system, filing a provisional specification guarantees that your priority date is officially sealed, preventing competitors who invent or file later from preempting your rights.
            </p>
          </div>
        </div>
      </section>

      {/* 6 KEY BENEFITS */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Why File Provisional First?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Strategic Advantages of Provisional Filing
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              How early filing safeguards your research, unlocks investor capital, and gives you a 1-year competitive runway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {KEY_BENEFITS.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {benefit.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {benefit.statutoryRef}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {benefit.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVISIONAL VS COMPLETE COMPARISON TABLE */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Comparative Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Provisional Patent vs Complete Patent
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Understand the core statutory differences between preliminary and non-provisional filings.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#002B49] text-white">
                <tr>
                  <th className="p-4 font-bold">Feature</th>
                  <th className="p-4 font-bold border-l border-white/10">Provisional Specification</th>
                  <th className="p-4 font-bold border-l border-white/10">Complete Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {PROVISIONAL_VS_COMPLETE.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-4 font-bold text-slate-900">{row.feature}</td>
                    <td className="p-4 text-slate-700 border-l border-slate-200">{row.provisional}</td>
                    <td className="p-4 text-slate-700 border-l border-slate-200 font-medium">{row.complete}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* STATUTORY FORMS CHECKLIST */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Compliance Checklist
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Documents &amp; Forms Required for Filing
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Mandatory filings prepared and validated by our registered patent agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STATUTORY_FORMS_CHECKLIST.map((form) => (
              <div
                key={form.form}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                    {form.form}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      form.mandatory
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {form.mandatory ? 'Mandatory' : 'Conditional (80% Rebate)'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{form.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{form.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-STAGE 14-DAY FILING WORKFLOW */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              14-Day Timeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Step-by-Step Provisional Patent Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              From technical disclosure under strict NDA to official filing receipt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FILING_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-slate-50/60 rounded-2xl border border-slate-200 p-5 space-y-3 relative flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-black text-[#002B49]/30 font-mono">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-200 px-2 py-0.5 rounded-full">
                      {step.timeline}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING PACKAGES */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200" id="pricing">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Choose Your Provisional Filing Plan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              All plans include complete non-disclosure agreement protection and expert drafting by registered patent agents.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {PRICING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-3xl border transition-all flex flex-col justify-between p-6 sm:p-8 relative ${
                  pkg.popular
                    ? 'border-[#002B49] shadow-xl ring-2 ring-[#002B49]/10'
                    : 'border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#002B49] text-white text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      {pkg.badge}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 pt-1">{pkg.name}</h3>
                    <p className="text-xs text-slate-500">{pkg.description}</p>
                  </div>

                  {/* Price Block */}
                  <div className="pt-2 pb-3 border-y border-slate-100 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-slate-950">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{pkg.strikePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {pkg.savingsText}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectPlan) {
                        onSelectPlan(pkg.id);
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                      pkg.popular
                        ? 'bg-[#002B49] hover:bg-[#001D33] text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                  className="w-full text-left flex justify-between items-center gap-4 cursor-pointer group"
                >
                  <span className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition">
                    {faq.q}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-900 transition">
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {openFaqIndex === idx && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#002B49] text-white flex items-center justify-center text-xs">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  {PROVISIONAL_PATENT_HERO.videoText}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 fill-white ml-1 text-white" />
              </div>
              <h5 className="text-base font-bold text-white">
                Provisional Patent: 60-Second Explainer
              </h5>
              <p className="text-xs text-slate-300 max-w-md">
                Learn how Section 9 of the Patents Act grants you an immediate priority date, 12 months of development runway, and &ldquo;Patent Pending&rdquo; protection.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsVideoOpen(false)}
                className="px-4 py-2 bg-[#002B49] hover:bg-[#001D33] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Close Explainer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REFERRAL MODAL */}
      {isReferralOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                <h4 className="text-sm font-bold text-slate-900">Refer a Fellow Inventor</h4>
              </div>
              <button
                type="button"
                onClick={() => setIsReferralOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Introduce a fellow entrepreneur, researcher, or startup founder to BharatFiling. They get <strong>₹1,000 off</strong> their provisional patent filing, and you earn <strong>₹1,000 Amazon Vouchers</strong> upon filing confirmation!
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Your Shareable Referral Code
              </span>
              <div className="flex items-center justify-between font-mono font-bold text-sm text-[#002B49] bg-white p-2 rounded border border-slate-200">
                <span>INVENTOR-PATENT-1000</span>
                <span className="text-[11px] text-emerald-600 font-sans font-bold">Active</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsReferralOpen(false)}
              className="w-full py-3 bg-[#002B49] hover:bg-[#001D33] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Copy Link &amp; Share
            </button>
          </div>
        </div>
      )}

      {/* STICKY BOTTOM LEAD BAR FOR MOBILE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 p-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500">Provisional Patent</span>
          <div className="text-xs font-black text-slate-900">₹499 Consultation • 14 Days Filing</div>
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="py-2.5 px-4 bg-[#002B49] text-white text-xs font-bold rounded-lg cursor-pointer"
        >
          Apply Now
        </button>
      </div>

    </div>
  );
}
