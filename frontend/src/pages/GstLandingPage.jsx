import React, { useState } from 'react';
import { whatsappLink } from '../config/support.js';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthRequiredModal from '../components/common/AuthRequiredModal.jsx';
import SplitGradientButton from '../components/common/SplitGradientButton.jsx';
import {
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  MessageCircle,
  Building2,
  Users,
  Building,
  HelpCircle,
  Award,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  Smartphone,
  BadgeCheck,
  Lock,
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { GST_PLANS } from './gst-registration/constants.js';

export default function GstLandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState('Proprietorship');
  const [openFaq, setOpenFaq] = useState(0);
  const [pendingPlan, setPendingPlan] = useState(null);
  const [heroPhone, setHeroPhone] = useState('');
  const [heroWhatsappOptIn, setHeroWhatsappOptIn] = useState(true);
  const [heroPhoneError, setHeroPhoneError] = useState('');

  const applyUrl = (planId, phone) => {
    const params = new URLSearchParams();
    if (planId) params.set('plan', planId);
    if (phone) params.set('phone', phone);
    const qs = params.toString();
    return `/apply/gst${qs ? `?${qs}` : ''}`;
  };

  const handleStartApplication = (e) => {
    if (e) e.preventDefault();
    setPendingPlan(null);
    if (isAuthenticated) {
      navigate('/apply/gst');
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleSelectPlan = (planId) => {
    if (isAuthenticated) {
      navigate(applyUrl(planId));
    } else {
      setPendingPlan(planId);
      setAuthModalOpen(true);
    }
  };

  const handleHeroGetStarted = (e) => {
    e.preventDefault();
    const cleanPhone = heroPhone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setHeroPhoneError('Please enter a valid 10-digit mobile number');
      return;
    }
    setHeroPhoneError('');
    setPendingPlan('standard');
    if (isAuthenticated) {
      navigate(applyUrl('standard', cleanPhone));
    } else {
      setAuthModalOpen(true);
    }
  };

  const entityDocs = {
    Proprietorship: [
      'PAN Card of Proprietor',
      'Aadhaar Card of Proprietor',
      'Electricity Bill / Property Tax Receipt (< 2 months old)',
      'Rent Agreement & Landlord NOC (if rented / leased premises)',
      'Bank Passbook first page or Cancelled Cheque',
      'Passport size photograph of the Proprietor',
    ],
    Partnership: [
      'PAN Card of Partnership Firm',
      'Registered Partnership Deed',
      'Authorization Letter signed by all partners',
      'PAN and Aadhaar Cards of all Partners',
      'Electricity Bill of Business Address + Landlord NOC',
      'Firm Bank Account Statement or Cancelled Cheque',
      'Passport size photos of all partners',
    ],
    LLP: [
      'PAN Card of LLP',
      'Certificate of Incorporation (COI) issued by MCA',
      'Registered LLP Agreement',
      'Board Resolution / Authorization for Designated Partner',
      'PAN & Aadhaar of all Designated Partners',
      'Registered Office Address Proof (Electricity bill + NOC)',
      'LLP Bank Account Statement / Cheque',
    ],
    'Private Limited': [
      'Company PAN Card',
      'Certificate of Incorporation (COI)',
      'MOA & AOA (Memorandum & Articles of Association)',
      'Board Resolution authorizing Director as Signatory',
      'PAN, Aadhaar & DIN of all Directors',
      'Registered Office Electricity Bill & Landlord NOC',
      'Company Bank Cheque or Account Statement',
    ],
  };

  const gstFaqs = [
    {
      q: 'What is the government fee for GST Registration?',
      a: 'The Government of India charges ₹0 (Zero) as government fee for GST Registration. Our platform fee is ₹1,499 (+ 18% GST), which covers AI document validation, Chartered Accountant review, Form REG-01 preparation, ARN filing, and handling any departmental clarification queries.',
    },
    {
      q: 'How many days does it take to get a GST number?',
      a: 'Typically, it takes 3 to 7 working days from the date of submission on the GST Common Portal, provided all submitted documents are accurate and complete.',
    },
    {
      q: 'Is physical inspection of business premises required?',
      a: 'Under standard conditions where Aadhaar authentication is successful, physical verification is not required. If the department deems necessary, our assigned CA guides you through the process.',
    },
    {
      q: 'Can I do business across all states with one GST registration?',
      a: 'A single GSTIN allows you to sell goods and services across all states (interstate sales). However, if you store physical inventory or establish branch offices in multiple states, a separate GST registration is required in each state.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: 'GST Registration' }]} />
      {/* 1. HERO SECTION */}
      <section className="pt-10 pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-[#F4F7FC] to-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#111827] text-[11px] sm:text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Secure, Encrypted Filing Platform</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-semibold text-slate-900 tracking-tight leading-[1.2]">
                GST Registration <br className="hidden sm:inline" />
                <span className="text-[#111827]">Online in India</span>
              </h1>

              <div className="flex items-baseline justify-center lg:justify-start gap-2">
                <span className="text-sm sm:text-base text-slate-600 font-medium">Starting at Just</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">₹{GST_PLANS[0].price}</span>
              </div>

              <div className="text-left bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3 max-w-xl mx-auto lg:mx-0">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Get your GST registration done end-to-end by a Chartered Accountant. You share documents, we file Form REG-01 on the GST portal, and you receive your 15-digit GSTIN.
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500 border-t border-slate-100 pt-3">
                  <span>Reviewed by <strong className="text-slate-700">BharatFiling Compliance Desk</strong></span>
                  <span className="hidden sm:inline">&bull;</span>
                  <span>Licensed Chartered Accountants</span>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium max-w-xl mx-auto lg:mx-0 text-left pt-1">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>GST Form Filing in 24&ndash;48 Hours*</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Online Process with Expert CA Assistance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero Government Fees, Transparent Pricing</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
                <SplitGradientButton
                  onClick={handleStartApplication}
                  label="Start GST Registration"
                />

                <a
                  href={whatsappLink('Hi BharatFiling Team, I need help with GST Registration.')}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 shadow-xs active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer touch-target-safe"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Talk to CA on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Mobile Lead-Capture Card */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleHeroGetStarted}
                className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(17,24,39,0.06)] border border-slate-200/80 space-y-4 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(17,24,39,0.12)] hover:border-[#111827]/30"
              >
                <h3 className="font-semibold tracking-tight text-lg text-slate-900 text-center">
                  Apply for GST Registration
                </h3>

                <div className="space-y-1.5">
                  <div className="flex rounded-2xl border border-slate-300 focus-within:ring-2 focus-within:ring-[#111827]/30 focus-within:border-[#111827] overflow-hidden transition bg-white">
                    <div className="px-3 py-3 bg-slate-50 border-r border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-700 shrink-0">
                      <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      inputMode="tel"
                      maxLength={10}
                      value={heroPhone}
                      onChange={(e) => {
                        setHeroPhone(e.target.value.replace(/\D/g, ''));
                        setHeroPhoneError('');
                      }}
                      placeholder="Mobile Number"
                      className="w-full px-4 py-3 text-slate-900 text-sm font-medium focus:outline-none"
                    />
                  </div>
                  {heroPhoneError && (
                    <p className="text-[11px] text-rose-600 font-medium px-1">{heroPhoneError}</p>
                  )}
                </div>

                <label className="flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Get easy updates through WhatsApp
                  </span>
                  <button
                    type="button"
                    onClick={() => setHeroWhatsappOptIn((v) => !v)}
                    className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${
                      heroWhatsappOptIn ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                    aria-pressed={heroWhatsappOptIn}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                        heroWhatsappOptIn ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </label>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all cursor-pointer touch-target-safe"
                >
                  <span>Get Started</span>
                </button>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-slate-100 text-[10px] font-semibold text-slate-500">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-50 border border-slate-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" /> Secure &amp; Encrypted
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-50 border border-slate-200">
                    <BadgeCheck className="w-3 h-3 text-blue-600" /> CA-Reviewed Filings
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-50 border border-slate-200">
                    <Lock className="w-3 h-3 text-slate-500" /> Govt Portal Compatible
                  </span>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PRICING TIERS */}
      <section className="py-14 sm:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Transparent Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Choose the Plan That Fits Your Business
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Every plan includes the full GST Registration filing. Pick a turnaround and feature set that matches your timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-start">
            {GST_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col h-full transition-all duration-300 ${
                  plan.recommended
                    ? 'bg-[#111827] text-white border border-[#111827] shadow-[0_20px_45px_rgba(17,24,39,0.25)] md:-translate-y-3'
                    : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-400 text-[#111827] text-[11px] font-bold shadow-xs flex items-center gap-1">
                    <Award className="w-3 h-3" /> Recommended Plan
                  </span>
                )}

                <h3 className={`text-lg font-bold ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mt-1.5 leading-relaxed ${plan.recommended ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.tagline}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className={`text-xs line-through ${plan.recommended ? 'text-slate-400' : 'text-slate-400'}`}>
                    ₹{plan.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${plan.recommended ? 'bg-white/10 text-emerald-300' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                    {plan.discountPercent}% off
                  </span>
                </div>
                <div className={`text-3xl font-extrabold tracking-tight ${plan.recommended ? 'text-white' : 'text-slate-900'}`}>
                  ₹{plan.price.toLocaleString('en-IN')}
                </div>
                <div className={`text-[11px] mt-1 ${plan.recommended ? 'text-slate-400' : 'text-slate-400'}`}>
                  Professional fees, inclusive of GST
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`mt-5 w-full py-3 rounded-full text-xs font-bold transition active:scale-[0.98] cursor-pointer ${
                    plan.recommended
                      ? 'bg-amber-400 hover:bg-amber-300 text-[#111827]'
                      : 'bg-[#111827] hover:bg-[#1F2937] text-white'
                  }`}
                >
                  Get Started
                </button>

                <div className={`mt-6 pt-5 border-t space-y-2.5 text-xs flex-1 ${plan.recommended ? 'border-white/10' : 'border-slate-100'}`}>
                  <span className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${plan.recommended ? 'text-slate-400' : 'text-slate-400'}`}>
                    What you'll get
                  </span>
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.recommended ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <span className={plan.recommended ? 'text-slate-200' : 'text-slate-700'}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. REQUIRED DOCUMENTS BY ENTITY */}
      <section className="py-12 sm:py-16 md:py-18 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Document Checklist
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Documents Required for GST Registration
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select your business constitution to view the exact list of documents needed.
            </p>
          </div>

          {/* Entity Selector Tabs - Horizontal Scroll on Mobile */}
          <div className="flex items-center sm:justify-center gap-2 mb-6 sm:mb-8 overflow-x-auto no-scrollbar pb-2 px-1">
            {Object.keys(entityDocs).map((entity) => (
              <button
                key={entity}
                onClick={() => setSelectedEntity(entity)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-[0.95] cursor-pointer touch-target-safe shrink-0 ${
                  selectedEntity === entity
                    ? 'bg-[#111827] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                {entity}
              </button>
            ))}
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-semibold tracking-tight text-sm sm:text-base text-slate-900">
                Checklist for {selectedEntity}
              </h3>
              <span className="text-xs text-[#111827] font-semibold">
                {entityDocs[selectedEntity].length} Documents
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-3.5">
              {entityDocs[selectedEntity].map((doc, idx) => (
                <div
                  key={doc}
                  className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 transition-all duration-200 hover:bg-white hover:border-slate-200 hover:shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-[#111827] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-medium text-slate-700 leading-snug">{doc}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500 text-center sm:text-left">
                Don't have all documents right now? You can start the application and upload them later.
              </span>
              <Link
                to="/apply/gst"
                className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs shrink-0 shadow-xs transition active:scale-98"
              >
                Begin Application &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GST FAQS */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Answers & Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {gstFaqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-bold text-slate-900 hover:text-[#111827] transition"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM ACTION */}
      <section className="py-12 bg-slate-50/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Ready to secure your GST Number?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Submit your details in 5 minutes. Our team will verify your documents and initiate portal submission today.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleStartApplication}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              Start GST Registration Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Authentication Required Modal */}
      <AuthRequiredModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        service={{
          title: 'GST Registration Service',
          path: '/apply/gst',
          category: 'GST & TAX',
          price: `₹${GST_PLANS[0].price}`,
          period: 'onwards, inclusive of GST',
        }}
        onSuccess={() => {
          const cleanPhone = heroPhone.replace(/\D/g, '');
          navigate(pendingPlan ? applyUrl(pendingPlan, cleanPhone.length === 10 ? cleanPhone : '') : '/apply/gst');
        }}
      />
    </div>
  );
}
