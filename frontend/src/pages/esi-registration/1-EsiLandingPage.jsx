import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Calculator,
  Laptop,
  UserCheck,
  ShieldAlert,
  ArrowLeftRight,
  TrendingUp,
  Landmark,
  BadgePercent,
  CheckCircle,
  FileCheck2,
  Lock,
  MessageCircle,
  Trophy,
  MapPin,
  HeartPulse,
  Baby,
  Activity,
  HandHeart,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  ESI_PLANS,
  ESI_CONTRIBUTION_BREAKDOWN,
  ESI_BENEFITS,
  ESI_VS_PF_DIFFERENCES,
  STATUTORY_ESIC_FORMS,
  ESI_DOCUMENTS,
  ESI_PROCEDURE_STEPS,
  ESI_FAQS,
  TRUST_STATS,
} from './constants.js';

export default function EsiLandingPage({ initialData = {}, onGetStarted }) {
  const { showError, showSuccess } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Lead Form State
  const [name, setName] = useState(initialData.name || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [whatsappOptIn, setWhatsappOptIn] = useState(
    initialData.whatsappOptIn !== undefined ? initialData.whatsappOptIn : true
  );

  // Pre-fill user data if available
  useEffect(() => {
    if (user) {
      if (!name && user.name) setName(user.name);
      if (!email && user.email) setEmail(user.email);
      if (!phone && user.phone) setPhone(user.phone);
    }
  }, [user]);

  // Interactive States
  const [activeDocTab, setActiveDocTab] = useState('proprietorship');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [faqSearch, setFaqSearch] = useState('');
  const [calcSalary, setCalcSalary] = useState(18000);

  // Handle Form Submit
  const handleLeadSubmit = (e) => {
    if (e) e.preventDefault();

    if (!name.trim()) {
      showError('Please enter your full name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      showError('Please enter a valid email address');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      showError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (onGetStarted) {
      onGetStarted({
        name: name.trim(),
        email: email.trim(),
        phone: cleanPhone,
        whatsappOptIn,
        plan: initialData.plan || 'standard',
      });
    }
  };

  const handleGoogleContinue = () => {
    if (user?.email) {
      setEmail(user.email);
      if (user.name) setName(user.name);
      showSuccess('Google profile linked successfully!');
    } else {
      showSuccess('Google authentication initialized. Please enter your contact details below.');
    }
  };

  const handleSelectPlan = (planId) => {
    if (onGetStarted) {
      onGetStarted({
        name: name.trim() || 'Valued Business Owner',
        email: email.trim() || 'applicant@example.com',
        phone: phone.replace(/\D/g, '') || '9876543210',
        plan: planId,
      });
    } else {
      document.getElementById('lead-form-card')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPricing = (e) => {
    if (e) e.preventDefault();
    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ESI Contribution Calculator computation (0.75% employee + 3.25% employer = 4.0%)
  const numericSalary = Math.min(Math.max(Number(calcSalary) || 0, 1000), 50000);
  const isEsiEligible = numericSalary <= 21000;
  const isExemptedFromEmployeeShare = numericSalary / 26 <= 176;
  const employeeEsi = isExemptedFromEmployeeShare ? 0 : Math.round(numericSalary * 0.0075);
  const employerEsi = Math.round(numericSalary * 0.0325);
  const totalEsiMonthly = employeeEsi + employerEsi;

  const filteredFaqs = ESI_FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
      
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION: Vakilsearch Navy Backdrop + 2-Column Card */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-gradient-to-b from-[#002B49] via-[#073866] to-[#0A4B82] pt-6 pb-16 sm:pb-20 text-white relative overflow-hidden">
        
        {/* Subtle decorative mesh overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb & Top Switcher Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-xs">
            <nav className="flex items-center gap-1.5 text-sky-200/80">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <Link to="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span>&gt;</span>
              <span className="text-sky-300">Labour Law Registrations</span>
              <span>&gt;</span>
              <span className="text-white font-semibold">ESI (ESIC) Registration</span>
            </nav>

            {/* Reciprocal Switcher to PF */}
            <div className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs text-sky-100 transition shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Looking for EPF Registration?</span>
              <Link
                to="/services/pf-registration"
                className="font-bold text-amber-300 hover:text-amber-200 underline inline-flex items-center gap-1"
              >
                Switch to EPF <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* TOP FLOATING ROCKET PRICE PILL */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 bg-white text-slate-800 border border-blue-400/60 rounded-full py-1.5 px-6 shadow-md text-xs sm:text-sm font-semibold">
              <span className="text-base">🚀</span>
              <span>Get Your ESI Registration - starts from <strong>₹1,999</strong></span>
              <a
                href="#plans"
                onClick={scrollToPricing}
                className="text-blue-600 hover:text-blue-700 underline font-bold ml-1 cursor-pointer"
              >
                View Price
              </a>
            </div>
          </div>

          {/* MAIN HERO CARD CONTAINER (Exact clone of Screenshot media_1793101272333_5348850a.png) */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 text-slate-800 border border-slate-100 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN: Headings & 4 Value Points (Exact match of screenshot text) */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002B49] tracking-tight leading-tight">
                    Apply for ESI (ESIC) Registration Online
                  </h1>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    ESI registration is mandatory for establishments with 10+ employees. Register with ESIC online via BharatFiling.
                  </p>
                </div>

                {/* 4 Feature Points with Site-Wide Double-Ring Target Icons */}
                <div className="space-y-4 pt-1">
                  
                  {/* Point 1 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 fill-[#002B49] text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        ESIC Registration Application, Forms, and Documentation
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Shram Suvidha portal preparation with expert Labour Law CA review
                      </p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 fill-[#002B49] text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        Eligibility Check and Employee Strength Assessment
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Mandatory 10+ worker threshold vetting &amp; ₹21,000 monthly wage cap audit
                      </p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 fill-[#002B49] text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        Support for ESIC Code, Contribution Compliance, and Returns
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Official 17-digit code issuance, Pehchan card creation &amp; Form 5 returns
                      </p>
                    </div>
                  </div>

                  {/* Point 4 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full border-2 border-[#002B49] text-[#002B49] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 fill-[#002B49] text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        Expert Guidance from Application to Receiving the ESIC Code
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Dedicated Senior Compliance Officer for monthly challan &amp; portal assistance
                      </p>
                    </div>
                  </div>

                </div>

                {/* Exclusive Banking Partner Block (Vakilsearch Standard) */}
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-semibold text-slate-700 mb-2">
                    Exclusive banking partner
                  </div>
                  <div className="flex items-center gap-2 select-none">
                    <div className="w-6 h-6 relative shrink-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E60000]">
                        <polygon points="50,0 65,15 50,30 35,15" />
                        <polygon points="100,50 85,65 70,50 85,35" />
                        <polygon points="50,100 35,85 50,70 65,85" />
                        <polygon points="0,50 15,35 30,50 15,65" />
                        <polygon points="50,20 80,50 50,80 20,50" />
                      </svg>
                    </div>
                    <span className="font-black text-xl tracking-tight text-slate-900">
                      DBS <span className="font-bold text-slate-700 text-lg">BANK</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Lead Form Card with #002B49 Navy Button */}
              <div className="lg:col-span-6" id="lead-form-card">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
                  
                  {/* Continue with Google button */}
                  <button
                    type="button"
                    onClick={handleGoogleContinue}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm transition shadow-xs cursor-pointer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  {/* OR Divider */}
                  <div className="relative my-5 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200" />
                    </div>
                    <span className="relative bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      OR
                    </span>
                  </div>

                  {/* Lead Inputs */}
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    {/* Name * */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49] transition placeholder:text-slate-400"
                        required
                      />
                    </div>

                    {/* Email * */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your business email"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-[#002B49] focus:ring-1 focus:ring-[#002B49] transition placeholder:text-slate-400"
                        required
                      />
                    </div>

                    {/* Phone Number * with +91 Indian Flag */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex rounded-lg border border-slate-300 focus-within:border-[#002B49] focus-within:ring-1 focus-within:ring-[#002B49] overflow-hidden">
                        <div className="flex items-center gap-1.5 px-3 bg-slate-50 border-r border-slate-300 text-slate-700 text-xs font-bold shrink-0">
                          <span className="text-base leading-none">🇮🇳</span>
                          <ChevronDown className="w-3 h-3 text-slate-400" />
                          <span>+91</span>
                        </div>
                        <input
                          type="tel"
                          maxLength={10}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="Phone Number *"
                          className="w-full px-3.5 py-2.5 text-sm focus:outline-none placeholder:text-slate-400"
                          required
                        />
                      </div>
                    </div>

                    {/* WhatsApp notification opt-in */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Get status updates &amp; alerts on WhatsApp</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setWhatsappOptIn(!whatsappOptIn)}
                        className={`w-9 h-5 flex items-center rounded-full p-0.5 duration-200 cursor-pointer ${
                          whatsappOptIn ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                        aria-label="Toggle WhatsApp"
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${
                            whatsappOptIn ? 'translate-x-4' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Deep Navy #002B49 Action Button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-bold py-2.5 px-8 rounded-lg shadow-md transition-all duration-200 cursor-pointer text-sm flex items-center gap-2"
                      >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>

            {/* TRUST BAR BELOW CARD (Exact match of Screenshot media_1793101272333_5348850a.png) */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {TRUST_STATS.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50/70 border border-slate-200/60">
                  <div className="font-extrabold text-base sm:text-lg text-[#002B49]">{stat.value}</div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2: 3-COLUMN PACKAGES (Exact Match of Image 2) */}
      {/* ------------------------------------------------------------- */}
      <section id="plans" className="py-16 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#002B49] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Clear &amp; Transparent Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] mt-3">
              Choose the Right ESI Plan for Your Business
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Zero government fees for registration. All packages include expert Labour Law CA review and 17-digit code issuance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4">
            
            {/* Card 1: Starter */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Starter</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                  Ideal for basic 17-digit ESIC Employer Code allotment &amp; portal setup
                </p>

                <div className="my-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-slate-400 line-through">₹2,999</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      ₹1,000 off
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">₹1,999</span>
                    <span className="text-xs font-semibold text-slate-500">+ Govt. Fee (₹0)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPlan('starter')}
                  className="w-full py-3 px-4 rounded-xl bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-bold text-sm shadow-sm transition cursor-pointer text-center"
                >
                  Proceed to Pay
                </button>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                    What You&apos;ll Get
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>17-Digit ESIC Employer Code Allotment</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Shram Suvidha &amp; ESIC Portal Registration</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Eligibility &amp; 10+ employee wage vetting by CA</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Guidance on Form 01 employer declaration</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Pehchan Card (Insurance Card) generation guide</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 text-[11px] text-slate-400 text-center">
                TAT: 3-5 Working Days
              </div>
            </div>

            {/* Card 2: Standard (FEATURED / RECOMMENDED) */}
            <div className="relative bg-[#002B49] rounded-2xl sm:rounded-3xl p-6 sm:p-7 text-white shadow-xl flex flex-col justify-between border-2 border-[#002B49] md:-translate-y-2">
              
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-[#FFCC00] text-slate-950 text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <span>★</span> RECOMMENDED
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mt-1">Standard</h3>
                <p className="text-xs text-slate-300 mt-1 min-h-[32px]">
                  Perfect for ESIC Code Allotment + 3 Months Monthly Return (Form 5) Filing
                </p>

                <div className="my-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-slate-400 line-through">₹4,999</span>
                    <span className="text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">
                      40% off
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-white">₹2,999</span>
                    <span className="text-xs font-semibold text-slate-300">+ Govt. Fee (₹0)</span>
                  </div>

                  <div className="mt-2.5 inline-flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded px-2.5 py-1 text-[11px] text-slate-200">
                    <span className="bg-slate-950 border border-slate-600 rounded px-1 text-[10px] font-black">
                      EMI
                    </span>
                    <span>EMI option available.</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPlan('standard')}
                  className="w-full py-3 px-4 rounded-xl bg-[#FFCC00] hover:bg-[#E6B800] active:scale-[0.99] text-slate-950 font-bold text-sm shadow-md transition cursor-pointer text-center mt-1"
                >
                  Proceed to Pay
                </button>

                <div className="mt-6 pt-5 border-t border-blue-900/60">
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">
                    What You&apos;ll Get
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>17-Digit ESIC Employer Code Allotment</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Employee insurance number (IP Number) registration</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Pehchan Card (Biometric ID) digital generation</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Monthly ESI contribution &amp; Form 5 filing (3 Months)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Online ESIC challan generation &amp; payment guidance</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Dedicated Labour Law CA Compliance Officer</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 text-[11px] text-sky-200 text-center font-medium">
                ★ Preferred by 85% of Establishments
              </div>
            </div>

            {/* Card 3: ESI + PF Combo */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">ESI + PF Combo</h3>
                <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                  Complete solution for 17-Digit ESIC Code + 15-Digit EPF Code
                </p>

                <div className="my-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-slate-400 line-through">₹6,999</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      36% off
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">₹4,499</span>
                    <span className="text-xs font-semibold text-slate-500">+ Govt. Fee (₹0)</span>
                  </div>

                  <div className="mt-2.5 inline-flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded px-2.5 py-1 text-[11px] text-slate-700">
                    <span className="bg-white border border-slate-300 rounded px-1 text-[10px] font-black">
                      EMI
                    </span>
                    <span>EMI option available.</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPlan('combo')}
                  className="w-full py-3 px-4 rounded-xl bg-[#002B49] hover:bg-[#073866] active:scale-[0.99] text-white font-bold text-sm shadow-sm transition cursor-pointer text-center"
                >
                  Proceed to Pay
                </button>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                    What You&apos;ll Get
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>17-Digit ESIC Code + 15-Digit EPF Code</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Unified Shram Suvidha registration for both codes</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Employee salary structuring (₹15k &amp; ₹21k ceilings)</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Pehchan Card registration + UAN generation</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>3 Months monthly return filing for both ESI &amp; PF</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Dedicated Senior Labour Law Specialist</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 text-[11px] text-slate-400 text-center">
                Dual Allotment: 4-6 Working Days
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3: STATUTORY ESI HEALTHCARE & CASH BENEFITS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#002B49] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Comprehensive Social Security
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] mt-3">
            Statutory Healthcare &amp; Cash Benefits under ESIC
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            ESIC provides unlimited cashless medical care and cash compensation for workers earning up to ₹21,000/month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ESI_BENEFITS.map((benefit, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#002B49] flex items-center justify-center mb-4">
                <HeartPulse className="w-5 h-5 text-[#002B49]" />
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                {benefit.coverage}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4: 4.0% CONTRIBUTION BREAKDOWN & CALCULATOR */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#002B49] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Statutory Math
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] mt-3">
              How the 4.0% ESI Contribution Is Calculated
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              The ESI contribution consists of 0.75% deducted from the employee and 3.25% paid by the employer.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Table (Left 7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 bg-slate-50 border-b border-slate-200 font-bold text-sm text-slate-800">
                Official ESIC Contribution Rates
              </div>
              <div className="divide-y divide-slate-100 text-xs sm:text-sm">
                {ESI_CONTRIBUTION_BREAKDOWN.map((item, idx) => (
                  <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-slate-900">{item.category}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-lg font-black text-[#002B49]">{item.rate}</span>
                      <span className="text-xs text-slate-400 block">of {item.basis}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Calculator (Right 5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-7">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-slate-900">ESI Monthly Estimator</h3>
                <Calculator className="w-5 h-5 text-[#002B49]" />
              </div>

              <div className="my-5">
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-xs font-bold text-slate-700">Gross Monthly Salary</label>
                  <span className="font-mono text-lg font-black text-[#002B49]">
                    ₹{numericSalary.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="35000"
                  step="500"
                  value={calcSalary}
                  onChange={(e) => setCalcSalary(Number(e.target.value))}
                  className="w-full accent-[#002B49] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>₹5,000</span>
                  <span>Ceiling: ₹21,000/mo</span>
                  <span>₹35,000</span>
                </div>
              </div>

              {!isEsiEligible ? (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 leading-snug">
                  <strong>Exceeds Statutory Ceiling:</strong> Mandatory ESI deduction applies only up to ₹21,000 gross monthly wages. Above this threshold, coverage is voluntary or exempted.
                </div>
              ) : (
                <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <div className="flex justify-between">
                    <span>Employee Share (0.75%):</span>
                    <span className="font-mono font-bold text-slate-900">
                      ₹{employeeEsi} {isExemptedFromEmployeeShare && '(Exempted)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Employer Share (3.25%):</span>
                    <span className="font-mono font-bold text-slate-900">₹{employerEsi}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-slate-900 text-sm">
                    <span>Combined Total (4.0%):</span>
                    <span className="text-[#002B49]">₹{totalEsiMonthly} / month</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5: ESI VS PF COMPARISON */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#002B49] rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20">
                Labour Law Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                ESI vs PF: Key Statutory Differences
              </h2>
              <p className="mt-2 text-sm text-sky-200 max-w-2xl leading-relaxed">
                Both schemes operate under distinct Acts. Understand thresholds, wage limits, and contributions side-by-side:
              </p>
            </div>
            <Link
              to="/services/pf-registration"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition shrink-0 shadow-lg flex items-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              View Standalone EPF Registration
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider text-[11px]">
                <th className="py-4 px-6 font-bold w-1/4">Feature / Parameter</th>
                <th className="py-4 px-6 font-bold w-3/8 text-[#002B49] bg-blue-50/40">
                  Employee State Insurance (ESI)
                </th>
                <th className="py-4 px-6 font-bold w-3/8 text-sky-800 bg-sky-50/40">
                  Provident Fund (PF / EPF)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {ESI_VS_PF_DIFFERENCES.map((diff, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-6 font-bold text-slate-900 bg-slate-50/30">
                    {diff.parameter}
                  </td>
                  <td className="py-3.5 px-6 bg-blue-50/20 text-slate-800 font-medium">
                    {diff.esi}
                  </td>
                  <td className="py-3.5 px-6 bg-sky-50/20 text-slate-800 font-medium">
                    {diff.pf}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 6: STATUTORY ESIC FORMS DIRECTORY */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#002B49] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Regulatory Filing Forms
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] mt-3">
              Official ESIC Statutory Forms
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Important forms used for employer establishment registration, employee enrolment, and half-yearly contribution returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATUTORY_ESIC_FORMS.map((form, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition">
                <span className="text-xs font-extrabold font-mono text-[#002B49] bg-blue-50 border border-blue-200 px-3 py-1 rounded-lg inline-block mb-3">
                  {form.form}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">{form.purpose}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{form.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 7: DOCUMENTS REQUIRED EXPLORER */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#002B49] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Checklist
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] mt-3">
            Documents Required for ESIC Registration
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Select your business structure to see the exact required documentation.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 gap-3">
          {Object.keys(ESI_DOCUMENTS).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveDocTab(key)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition cursor-pointer ${
                activeDocTab === key
                  ? 'bg-[#002B49] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {ESI_DOCUMENTS[key].title}
            </button>
          ))}
        </div>

        {/* Selected Document List */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ESI_DOCUMENTS[activeDocTab].items.map((doc, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{doc.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 8: 4-STEP PROCEDURE ROADMAP */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#002B49] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] mt-3">
              How to Get Your 17-Digit ESIC Employer Code
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {ESI_PROCEDURE_STEPS.map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs relative">
                <span className="text-2xl font-black font-mono text-[#002B49]/20 block mb-2">
                  {step.step}
                </span>
                <h3 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 9: SEARCHABLE STATUTORY FAQ ACCORDION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#002B49] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B49] mt-3">
            Frequently Asked Questions on ESI Registration
          </h2>

          {/* Search Bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search ESI rules, threshold, wages, Pehchan card..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-[#002B49] bg-white shadow-xs"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 flex justify-between items-center gap-4 cursor-pointer hover:bg-slate-50/50"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* FINAL CONVERSION BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 bg-gradient-to-r from-[#002B49] to-[#073866] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Need Expert Help with Your ESI Registration?
          </h2>
          <p className="text-xs sm:text-sm text-sky-200 max-w-xl mx-auto">
            Our Senior Labour Law CA desk verifies your staff strength and submits your 17-digit code application within 24 hours.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => handleSelectPlan('standard')}
              className="px-6 py-3 bg-[#FFCC00] hover:bg-[#E6B800] text-slate-950 font-bold rounded-xl text-sm transition shadow-md cursor-pointer"
            >
              Get Started with Standard Plan
            </button>
            <a
              href="https://wa.me/917668976193?text=Hi%2C%20I%20need%20help%20with%20ESI%20Registration"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-sm transition flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
