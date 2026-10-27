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
} from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  PF_PLANS,
  PF_VS_ESI_DIFFERENCES,
  EPF_CONTRIBUTION_BREAKDOWN,
  STATUTORY_EPF_FORMS,
  PENALTY_SLABS,
  PF_DOCUMENTS,
  PF_PROCEDURE_STEPS,
  PF_FAQS,
  TRUST_STATS,
} from './constants.js';

export default function PfLandingPage({ initialData = {}, onGetStarted }) {
  const { showError, showSuccess } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Lead Form State (1:1 with Screenshot media_1793090233108_25fe2dac.png)
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

  // Modals & Interactive States
  const [activeDocTab, setActiveDocTab] = useState('proprietorship'); // 'proprietorship' | 'partnership' | 'company'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [faqSearch, setFaqSearch] = useState('');
  const [calcSalary, setCalcSalary] = useState(15000);
  const [showReferModal, setShowReferModal] = useState(false);
  const [referFriendPhone, setReferFriendPhone] = useState('');

  // Handle Form Submit (Screenshot 1 CTA)
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
    if (!cleanPhone || cleanPhone.length < 10) {
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
    // Standard mock social sign-in or autofill from logged-in account
    if (user?.email) {
      setEmail(user.email);
      if (user.name) setName(user.name);
      showSuccess('Google profile linked successfully!');
    } else {
      showSuccess('Google authentication popup initialized. Please fill your contact details below.');
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

  // Salary Calculator computation
  const numericSalary = Math.min(Math.max(Number(calcSalary) || 0, 1000), 100000);
  const wageCap = Math.min(numericSalary, 15000); // EPFO statutory ceiling
  const employeePf = Math.round(wageCap * 0.12);
  const employerEpf = Math.round(wageCap * 0.0367);
  const employerEps = Math.round(wageCap * 0.0833);
  const employerEdli = Math.round(wageCap * 0.005);
  const employerAdmin = Math.max(Math.round(wageCap * 0.005), 75);
  const totalEmployer = employerEpf + employerEps + employerEdli + employerAdmin;

  const filteredFaqs = PF_FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      {/* Floating Side Badge - Refer a Friend */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <button
          onClick={() => setShowReferModal(true)}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-3 py-4 rounded-l-xl shadow-2xl transition-all transform hover:-translate-x-1 border-l-2 border-y-2 border-amber-300"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          <Gift className="w-4 h-4 text-slate-950 rotate-90" />
          <span className="text-xs uppercase tracking-wider font-extrabold">Refer & Earn ₹500</span>
        </button>
      </div>

      {/* TOP HERO SECTION - 1:1 WITH SCREENSHOT media_1793090233108_25fe2dac.png */}
      <section className="relative bg-gradient-to-br from-[#002B49] via-[#003B64] to-[#011C30] text-white pt-8 pb-16 overflow-hidden">
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-sky-200 mb-6">
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
            <span className="text-white font-semibold">PF (EPF) Registration</span>
          </nav>

          {/* ESI Switcher Pill Alert */}
          <div className="mb-6 inline-flex flex-wrap items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs text-sky-100 transition shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Looking for Employee State Insurance instead?</span>
            <Link
              to="/services/esi-registration"
              className="font-bold text-amber-300 hover:text-amber-200 underline inline-flex items-center gap-1"
            >
              Switch to ESI Registration <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="hidden sm:inline text-sky-300/50">|</span>
            <span className="hidden sm:inline text-sky-200 text-[11px]">
              Or choose our <strong className="text-white">PF + ESI Combo</strong> to save 30%
            </span>
          </div>

          {/* MAIN HERO CARD CONTAINER - Clean White Card as shown in screenshot */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 text-slate-800 border border-slate-100 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN: Headings & 4 Value Points */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                    Apply for PF (EPF) Registration Online
                  </h1>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    EPF registration made easy with BharatFiling. Online process, correct forms, and compliance support for businesses.
                  </p>
                </div>

                {/* 4 Feature Points with soft circular purple icons (1:1 with Screenshot) */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 text-purple-600 shadow-xs">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      PF (EPF) Registration Application &amp; Documentation
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 text-purple-600 shadow-xs">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      Eligibility Check &amp; Employee Strength Verification
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 text-purple-600 shadow-xs">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      EPF Establishment Code &amp; Compliance Support
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 text-purple-600 shadow-xs">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                      End-to-End EPF Assistance
                    </span>
                  </div>
                </div>

                {/* Quick Trust badges under left content */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    EPFO Shram Suvidha Verified
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Clock className="w-4 h-4 text-sky-600" />
                    Code in 3-5 Working Days
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    Form 5A Compliance Included
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: Lead Form Card (1:1 with Screenshot) */}
              <div className="lg:col-span-6" id="lead-form-card">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
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
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition placeholder:text-slate-400"
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
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition placeholder:text-slate-400"
                        required
                      />
                    </div>

                    {/* Phone Number * with +91 and Indian flag */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex rounded-lg border border-slate-300 focus-within:ring-2 focus-within:ring-purple-600 focus-within:border-transparent overflow-hidden">
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

                    {/* Purple-to-Pink gradient Continue CTA Button (1:1 with Screenshot) */}
                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#D946EF] hover:from-[#4F46E5] hover:to-[#C026D3] text-white font-bold py-2.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer text-sm"
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* TRUST STATS RIBBON (Bottom bar of Screenshot) */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                
                {/* 1. 4.6 Verified Reviews */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                    <CheckCircle className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">4.6</span>
                      <span className="text-amber-500 text-xs">★★★★★</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Verified Reviews</p>
                  </div>
                </div>

                {/* 2. 15+ Years Experience */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                    <Trophy className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm sm:text-base">15+ Years</div>
                    <p className="text-xs text-slate-500 font-medium">of Experience</p>
                  </div>
                </div>

                {/* 3. 2 Lakh+ Customers */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                    <Users className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm sm:text-base">2 Lakh+ Customers</div>
                    <p className="text-xs text-slate-500 font-medium">Trusted across India</p>
                  </div>
                </div>

                {/* 4. App Tracking Live Updates */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center shrink-0 text-rose-500">
                    <MapPin className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 text-sm sm:text-base">App Tracking</div>
                    <p className="text-xs text-slate-500 font-medium">Live status updates</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY SUB-NAVIGATION BAR */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto py-3 text-xs font-semibold text-slate-600 gap-6">
            <a href="#overview" className="hover:text-purple-600 transition whitespace-nowrap">
              Overview
            </a>
            <a href="#plans" className="hover:text-purple-600 transition whitespace-nowrap">
              Plans &amp; Pricing
            </a>
            <a href="#pf-vs-esi" className="hover:text-purple-600 transition whitespace-nowrap text-purple-700 font-bold">
              PF vs ESI Differences
            </a>
            <a href="#contributions" className="hover:text-purple-600 transition whitespace-nowrap">
              12% Contribution Split
            </a>
            <a href="#forms" className="hover:text-purple-600 transition whitespace-nowrap">
              EPFO Statutory Forms
            </a>
            <a href="#documents" className="hover:text-purple-600 transition whitespace-nowrap">
              Required Documents
            </a>
            <a href="#penalties" className="hover:text-purple-600 transition whitespace-nowrap">
              Penalty Slabs
            </a>
            <a href="#faqs" className="hover:text-purple-600 transition whitespace-nowrap">
              FAQs
            </a>
            <button
              onClick={() => handleSelectPlan('standard')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full font-bold shadow-xs transition"
            >
              Apply Now
            </button>
          </div>
        </div>
      </nav>

      {/* SECTION 1: OVERVIEW & KEY STATUTORY HIGHLIGHTS */}
      <section id="overview" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Employees' Provident Fund Act, 1952
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            Everything You Need to Know About EPF Registration
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Every business in India employing 20 or more persons must register under the EPFO. Even with fewer than 20 employees, startups and growing firms can obtain voluntary registration to extend retirement corpus and social security to their talent.
          </p>
        </div>

        {/* 4 Pillars of EPF Scheme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-4 font-black">
              20+
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Mandatory Threshold</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mandatory for commercial establishments and factories with 20 or more staff. Voluntary option available under Section 1(4).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">8.25% Interest Corpus</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              EPFO offers risk-free sovereign interest (~8.25% p.a.) compounded annually, tax-free for continuous service above 5 years.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">₹7 Lakh Free Life Cover</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under EDLI (Deposit Linked Insurance Scheme), registered employees automatically receive life insurance cover up to ₹7,00,000.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900 mb-2">Lifelong EPS Pension</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              8.33% of employer's share accumulates into the EPS account, guaranteeing monthly lifetime pension upon completing 10 years of service.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: PLANS & PRICING */}
      <section id="plans" className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Clear &amp; Transparent Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Choose the Right EPF Plan for Your Business
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Zero government fees for registration. All packages include expert Labour Law CA review and 15-digit code issuance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PF_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  plan.recommended
                    ? 'border-2 border-purple-600 shadow-xl scale-102 ring-4 ring-purple-100'
                    : 'border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black uppercase px-4 py-1 rounded-full shadow-md tracking-wider">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                      {plan.discountLabel}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{plan.tat}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-2">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{plan.subtitle}</p>

                  <div className="my-6 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900">₹{plan.price.toLocaleString('en-IN')}</span>
                      <span className="text-sm text-slate-400 line-through">
                        ₹{plan.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      + 18% GST (₹{Math.round(plan.price * 0.18)}) • Govt Fee: ₹0
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm cursor-pointer ${
                    plan.recommended
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-purple-200 shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  Get Started with {plan.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PF VS ESI INTERACTIVE COMPARISON MATRIX (CRITICAL DIFFERENTIATION) */}
      <section id="pf-vs-esi" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20">
                Labour Law Guide
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-3">
                PF vs ESI: Which Statutory Scheme Does Your Business Need?
              </h2>
              <p className="mt-2 text-sm text-sky-200 max-w-2xl leading-relaxed">
                Many businesses confuse EPF (Provident Fund) and ESI (Employee State Insurance). Both operate under separate Acts with distinct thresholds and benefits. Check the side-by-side comparison below:
              </p>
            </div>
            <Link
              to="/services/esi-registration"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition shrink-0 shadow-lg flex items-center gap-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              View Standalone ESI Registration
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider text-[11px]">
                <th className="py-4 px-6 font-bold w-1/4">Feature / Parameter</th>
                <th className="py-4 px-6 font-bold w-3/8 text-purple-700 bg-purple-50/50">
                  Provident Fund (PF / EPF)
                </th>
                <th className="py-4 px-6 font-bold w-3/8 text-sky-800 bg-sky-50/50">
                  Employee State Insurance (ESI)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {PF_VS_ESI_DIFFERENCES.map((diff, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-6 font-bold text-slate-900 bg-slate-50/30">
                    {diff.parameter}
                  </td>
                  <td className="py-3.5 px-6 bg-purple-50/20 text-slate-800 font-medium">
                    {diff.pf}
                  </td>
                  <td className="py-3.5 px-6 bg-sky-50/20 text-slate-800 font-medium">
                    {diff.esi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: 12% CONTRIBUTION BREAKDOWN & LIVE SALARY CALCULATOR */}
      <section id="contributions" className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Statutory Contribution Split Details */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                  Statutory Formula
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                  How the 12% + 12% Contribution is Split
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  The employee contributes 12% of their basic wages entirely into EPF. The employer contributes a matching 12% which EPFO splits across EPF, EPS Pension, EDLI life insurance, and admin charges.
                </p>
              </div>

              <div className="space-y-3">
                {EPF_CONTRIBUTION_BREAKDOWN.map((acc, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between font-bold text-sm text-slate-900 mb-1">
                      <span>{acc.account}</span>
                      <div className="text-xs space-x-2">
                        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                          Employee: {acc.employeeShare}
                        </span>
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                          Employer: {acc.employerShare}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">{acc.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Live Interactive EPF Wage Calculator */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-xl">
                <div className="flex items-center gap-2 mb-4 text-purple-700 font-bold text-base">
                  <Calculator className="w-5 h-5" />
                  <span>EPF Monthly Contribution Calculator</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Employee Monthly Basic Salary + DA (₹)
                    </label>
                    <input
                      type="number"
                      step={500}
                      min={1000}
                      max={100000}
                      value={calcSalary}
                      onChange={(e) => setCalcSalary(e.target.value)}
                      className="w-full px-4 py-2.5 text-base font-bold text-slate-900 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      * Statutory wage cap is ₹15,000/month for mandatory deductions.
                    </span>
                  </div>

                  {/* Calculated Outputs */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600">Considered Wage Base:</span>
                      <span className="font-bold text-slate-900">₹{wageCap.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800">Employee Share (12%):</span>
                      <span className="font-bold text-purple-700 text-sm">₹{employeePf.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="border-t border-slate-200 pt-2 space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>• Employer EPF (3.67%):</span>
                        <span className="font-semibold text-slate-800">₹{employerEpf.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Employer EPS Pension (8.33%):</span>
                        <span className="font-semibold text-slate-800">₹{employerEps.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• EDLI Life Cover (0.50%):</span>
                        <span className="font-semibold text-slate-800">₹{employerEdli.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• EPFO Admin Fee (0.50%):</span>
                        <span className="font-semibold text-slate-800">₹{employerAdmin.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-slate-300 pt-2 flex justify-between items-center">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">Total Employer Deposit:</span>
                      <span className="font-black text-indigo-700 text-base">₹{totalEmployer.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="bg-purple-100/70 p-3 rounded-xl flex justify-between items-center text-xs font-bold text-purple-900">
                      <span>Total Deposited to EPFO:</span>
                      <span className="text-base">₹{(employeePf + totalEmployer).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectPlan('standard')}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs transition shadow-xs"
                  >
                    Register Establishment to Start Deductions
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: EPFO STATUTORY FORMS GUIDE */}
      <section id="forms" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Compliance Forms
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            Key EPFO Forms Handled by BharatFiling
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            From initial Form 5A ownership declaration to monthly Electronic Challan cum Return (ECR) filing, our team handles all statutory documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STATUTORY_EPF_FORMS.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-300 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  {item.form}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">EPFO Official</span>
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2">{item.purpose}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: REQUIRED DOCUMENTS BY ENTITY */}
      <section id="documents" className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Checklist
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Documents Required for EPF Registration
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              100% digital submission. No physical visits or paper couriers required.
            </p>
          </div>

          {/* Entity Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-white rounded-2xl border border-slate-300 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveDocTab('proprietorship')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeDocTab === 'proprietorship'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Proprietorship
              </button>
              <button
                type="button"
                onClick={() => setActiveDocTab('partnership')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeDocTab === 'partnership'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Partnership / LLP
              </button>
              <button
                type="button"
                onClick={() => setActiveDocTab('company')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeDocTab === 'company'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Private Limited / Public Co.
              </button>
            </div>
          </div>

          {/* Selected Entity Documents */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-600" />
              <span>{PF_DOCUMENTS[activeDocTab].title} Checklist</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PF_DOCUMENTS[activeDocTab].items.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{doc.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PENALTY SLABS UNDER SECTION 14B & 7Q */}
      <section id="penalties" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Statutory Penalties for Delayed EPF Payments
              </h2>
              <p className="text-xs text-slate-500">
                EPFO enforces strict penalties under Section 14B and simple interest at 12% p.a. under Section 7Q.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-6 font-bold">Delay Period</th>
                  <th className="py-3.5 px-6 font-bold text-rose-600">Damages (Section 14B)</th>
                  <th className="py-3.5 px-6 font-bold text-indigo-700">Simple Interest (Section 7Q)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {PENALTY_SLABS.map((slab, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-6 font-semibold text-slate-900">{slab.period}</td>
                    <td className="py-3.5 px-6 font-bold text-rose-600">{slab.damages}</td>
                    <td className="py-3.5 px-6 font-medium text-slate-700">{slab.interest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Important Compliance Note:</strong> Non-remittance of employee contributions deducted from wages is considered criminal breach of trust under IPC Sec 406/409. Always file your ECR before the 15th of each month.
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 8: 4-STEP FILING PROCEDURE */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Simple Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              How the EPF Registration Process Works
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Get your 15-digit code delivered to your inbox in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PF_PROCEDURE_STEPS.map((stepItem, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                <span className="text-3xl font-black text-purple-200 absolute top-4 right-4">
                  {stepItem.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                  {stepItem.step}
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-2">{stepItem.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{stepItem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FAQS ACCORDION */}
      <section id="faqs" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Answers to common questions regarding eligibility, deductions, voluntary registration, and penalties.
          </p>

          {/* Search Box */}
          <div className="relative mt-6 max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search EPF questions..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-purple-600 transition"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-purple-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-[#002B49] to-[#004B7D] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to Obtain Your 15-Digit EPF Establishment Code?
          </h2>
          <p className="mt-3 text-sm text-sky-200 max-w-2xl mx-auto">
            Join over 2 Lakh+ Indian businesses registered seamlessly with BharatFiling. Talk to our Labour Law CA desk or get started online in 2 minutes.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleSelectPlan('standard')}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition"
            >
              Start Online Registration
            </button>
            <a
              href="tel:18001234567"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call CA Desk: 1800-123-4567</span>
            </a>
          </div>
        </div>
      </section>

      {/* Refer a Friend Modal */}
      {showReferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-slate-800">
            <button
              onClick={() => setShowReferModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Refer a Business Owner</h3>
            <p className="text-xs text-slate-500 mt-1">
              Give ₹500 off on EPF/ESI registrations to fellow entrepreneurs and earn ₹500 wallet cashback upon their registration.
            </p>
            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Friend's 10-Digit Mobile Number
              </label>
              <input
                type="tel"
                maxLength={10}
                value={referFriendPhone}
                onChange={(e) => setReferFriendPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 9876543210"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowReferModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (referFriendPhone.length < 10) {
                    showError('Enter a valid 10-digit number');
                    return;
                  }
                  showSuccess('Referral link sent to your friend!');
                  setShowReferModal(false);
                  setReferFriendPhone('');
                }}
                className="px-5 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-xs"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
