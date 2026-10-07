import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
  Building2,
  Scale,
  Receipt,
  Clock,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  MessageCircle,
  PhoneCall,
  Check,
} from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const heroRailServices = [
    {
      title: 'Business Registration',
      subtitle: 'Private Limited, LLP & OPC Incorporation',
      path: '/services/company-registration',
      icon: Building2,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'GST Compliance',
      subtitle: 'Online Registration & GSTR-1/3B Returns',
      path: '/services/gst-registration',
      icon: FileCheck2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700',
      badge: 'Live Service',
    },
    {
      title: 'MCA Compliance',
      subtitle: 'ROC Annual Filings & Director KYC',
      path: '/services/llp-registration',
      icon: Scale,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Income Tax Filing',
      subtitle: 'ITR Filing, TDS & Tax Planning',
      path: '/services/income-tax',
      icon: Receipt,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Trademark Protection',
      subtitle: 'Brand Search & IP Attorney Filing',
      path: '/services/trademark',
      icon: Award,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
  ];

  const popularServices = [
    {
      title: 'GST Registration Online',
      desc: 'Complete end-to-end GSTIN registration with AI OCR document verification and licensed CA filing.',
      price: '₹1,499',
      tag: 'Live MVP',
      isLive: true,
      path: '/services/gst-registration',
      features: ['Free Document AI Check', 'Form REG-01 Filing', 'Notice Clarifications Included', 'REG-06 Certificate'],
    },
    {
      title: 'Company Registration',
      desc: 'Incorporate your Private Limited Company with MCA SPICe+ filing, DIN, MOA, AOA & PAN/TAN.',
      price: '₹4,999',
      tag: 'Popular',
      path: '/services/company-registration',
      features: ['Name Approval (RUN)', 'Digital Signature (DSC)', 'Articles of Association', 'Current Account Setup'],
    },
    {
      title: 'GST Return Filing',
      desc: 'Monthly and quarterly GSTR-1 & GSTR-3B filings with automated GSTR-2B input tax credit reconciliation.',
      price: '₹799/mo',
      tag: 'Tax Season',
      path: '/services/gst-return',
      features: ['GSTR-2B ITC Matching', 'E-Way Bill Integration', 'Zero Late-Fee Guarantee', 'Ledger Reconciliation'],
    },
    {
      title: 'Income Tax Return (ITR)',
      desc: 'File individual and business tax returns with maximum deductions calculated under Old vs New tax regimes.',
      price: '₹999',
      tag: 'ITR-1 to 4',
      path: '/services/income-tax',
      features: ['AIS & TIS Reconciliation', 'Capital Gains Computations', 'Deductions (80C/80D)', 'Refund Tracking'],
    },
    {
      title: 'LLP Registration',
      desc: 'Limited Liability Partnership incorporation for professionals and partners with low statutory compliance.',
      price: '₹3,999',
      tag: 'Partners',
      path: '/services/llp-registration',
      features: ['Partnership Deed Drafting', 'Designated Partner PIN', 'MCA FiLLiP Submission', 'Stamp Duty Guidance'],
    },
    {
      title: 'Trademark Registration',
      desc: 'Protect your brand name, logo, and slogan nationwide with IP attorney representation.',
      price: '₹1,999',
      tag: 'Brand',
      path: '/services/trademark',
      features: ['Free TM Search Report', 'Class Classification', 'Form TM-A Filing', 'Hearing Support'],
    },
  ];

  const faqs = [
    {
      q: 'Is GST Registration completely online through BharatFiling?',
      a: 'Yes, 100% online. You do not need to visit any government office or tax department. You simply complete our streamlined wizard, upload your identity proofs, and our AI pre-checks the documents while our licensed Chartered Accountant reviews, prepares Form REG-01, and submits it directly to the GST Common Portal.',
    },
    {
      q: 'Who mandatorily needs to register for GST in India?',
      a: 'Any business with an aggregate annual turnover exceeding ₹40 Lakhs for goods (₹20 Lakhs in special category states) or ₹20 Lakhs for services (₹10 Lakhs in special states) must register. In addition, all e-commerce sellers (Amazon, Flipkart, Meesho), interstate suppliers, and export businesses require compulsory GST registration regardless of turnover.',
    },
    {
      q: 'How does BharatFiling’s AI + CA model work?',
      a: 'Unlike generic automated tools or slow traditional consultancies, BharatFiling uses AI to instantly classify documents, extract text (via OCR), and verify that names and numbers match across your PAN, Aadhaar, and electricity bills. A dedicated human Chartered Accountant then reviews the entire dossier, verifies statutory eligibility, and handles all government filing and officer clarifications.',
    },
    {
      q: 'What happens if the GST officer issues a query or clarification notice (REG-03)?',
      a: 'Clarification notices are included in our service at no extra cost. If the jurisdictional GST officer requests additional proof of premises or identity, our assigned CA drafts the legal response (Form REG-04), attaches any required affidavits, and submits it to secure your final approval.',
    },
    {
      q: 'What is the Master Customer Profile, and how does it save me time?',
      a: 'BharatFiling creates a single Master Profile for your identity. Once your PAN, Aadhaar, and business details are verified for GST, they are securely saved. When you later need Income Tax Returns (ITR), Trademark filing, or MCA compliance, your verified details are pre-filled automatically without having to re-upload documents.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* 1. HERO SECTION (Premium Navy + Clean IndiaFilings Layout) */}
      <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-white via-slate-50/40 to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Value Proposition & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#111827] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>India's AI + CA Business Compliance Platform</span>
              </div>

              {/* Main Headline with Premium Navy Styling */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                Register for GST & Comply <br className="hidden sm:inline" />
                <span className="text-[#111827]">Online in India</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Secure your 15-digit GSTIN, incorporate your company, and file tax returns with India's intelligent compliance platform backed by licensed Chartered Accountants.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <Link
                  to="/apply/gst"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Start GST Registration
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>

                <a
                  href="https://wa.me/919876543210?text=Hi%20BharatFiling%20Team%2C%20I%20need%20assistance%20with%20GST%20Registration."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-xs transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  Talk to CA on WhatsApp
                </a>
              </div>

              {/* Pricing & Guarantee Strip */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Starting from ₹1,499
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Online & Paperless
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3–7 Days Govt TAT
                </div>
              </div>
            </div>

            {/* Right Column: Signature IndiaFilings "Service Rail" */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-[0_12px_36px_rgba(17,24,39,0.06)] border border-slate-200/80 space-y-2.5">
                <div className="px-3 py-1.5 flex items-center justify-between border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Popular Services</span>
                  <span className="text-[11px] font-semibold text-[#111827]">Fast-Track Filing</span>
                </div>

                <div className="space-y-2">
                  {heroRailServices.map((service) => {
                    const IconComp = service.icon;
                    return (
                      <Link
                        key={service.title}
                        to={service.path}
                        className="group flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 hover:-translate-y-1 hover:shadow-md active:scale-[0.98] active:translate-y-0 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${service.iconBg} ${service.iconColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#111827] transition-colors flex items-center gap-2">
                              {service.title}
                              {service.badge && (
                                <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-emerald-200">
                                  {service.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 leading-tight">
                              {service.subtitle}
                            </div>
                          </div>
                        </div>

                        <div className="text-slate-300 group-hover:text-[#111827] group-hover:translate-x-1.5 transition-all duration-200 pr-1">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-2 px-1">
                  <Link
                    to="/services"
                    className="block text-center py-2 text-xs font-semibold text-[#111827] hover:text-black bg-slate-100/70 hover:bg-slate-100 rounded-xl transition"
                  >
                    Explore All 40+ Corporate & Tax Services &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST STATS STRIP */}
      <section className="py-8 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">10,000+</div>
              <div className="text-xs text-slate-500 mt-0.5">Indian Businesses Served</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#111827]">3–7 Days</div>
              <div className="text-xs text-slate-500 mt-0.5">Avg GST Approval Time</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">99.4%</div>
              <div className="text-xs text-slate-500 mt-0.5">First-Pass Approval Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">100%</div>
              <div className="text-xs text-slate-500 mt-0.5">Online CA Verification</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR SERVICES GRID */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Comprehensive Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Popular Compliance & Legal Services
            </h2>
            <p className="text-sm text-slate-600">
              Transparent fixed pricing. No hidden surprises. Professional CA consultation included.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((service) => (
              <Link
                key={service.title}
                to={service.path}
                className={`group relative p-6 sm:p-7 rounded-3xl border transition-all duration-300 ease-out transform-gpu flex flex-col justify-between cursor-pointer
                  hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(17,24,39,0.12)] hover:border-[#111827]/40
                  active:scale-[0.98] active:translate-y-0 active:shadow-md ${
                  service.isLive
                    ? 'border-[#111827]/30 bg-slate-50/50 shadow-sm'
                    : 'border-slate-200/90 bg-white shadow-xs'
                }`}
              >
                {/* Top Subtle Hairline Glow */}
                <div className="absolute inset-x-8 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#111827] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-full"></div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#111827] bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 group-hover:bg-[#111827]/10 transition-colors">
                      {service.tag}
                    </span>
                    <span className="text-lg font-black text-slate-900 group-hover:scale-105 transition-transform duration-200 origin-right">
                      {service.price}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 group-hover:text-[#111827] transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <div
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ${
                      service.isLive
                        ? 'bg-[#111827] group-hover:bg-[#1F2937] text-white shadow-xs group-hover:shadow-md'
                        : 'bg-slate-100 text-slate-800 group-hover:bg-[#111827] group-hover:text-white group-hover:shadow-sm'
                    }`}
                  >
                    {service.isLive ? 'Start Registration' : 'View Service Details'}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MASTER PROFILE ADVANTAGE */}
      <section className="py-16 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
                Master Customer Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                One Profile. All Indian Compliances.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Never upload your PAN card or electricity bill twice. Once your master profile is verified during GST registration, your identity is saved securely. Future services like Income Tax returns, Trademark registration, and MCA filings pre-fill instantly.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Zero Redundant Typing:</strong> Pre-fills personal, business, and banking details automatically across all compliance forms.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Multi-Entity Management:</strong> Manage multiple proprietorships, companies, or LLPs under a single founder account.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900">Bank-Grade Privacy:</strong> AES-256 encrypted storage compliant with Indian data localization norms.
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-800">Master Customer Profile</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    ✓ Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-medium">Full Name</div>
                    <div className="font-bold text-slate-800 mt-0.5">Rahul Verma</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-medium">PAN Number</div>
                    <div className="font-bold text-slate-800 mt-0.5">ABCDE1234F</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-medium">Aadhaar (Last 4)</div>
                    <div className="font-bold text-slate-800 mt-0.5">•••• •••• 9012</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <div className="text-[10px] text-slate-400 font-medium">Registered State</div>
                    <div className="font-bold text-slate-800 mt-0.5">Karnataka (KA)</div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-100/70 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">Reusable across all services</div>
                    <div className="text-[11px] text-slate-600">GST · Income Tax · MCA · Trademark</div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="px-3 py-1.5 rounded-lg bg-[#111827] text-white font-bold text-[11px] hover:bg-[#1F2937] transition"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How GST Registration Works
            </h2>
            <p className="text-sm text-slate-600">
              No government office queues. No confusing tax jargon. Clear visibility at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200/90 space-y-3 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md hover:bg-white hover:border-slate-300 active:scale-[0.99] cursor-default">
              <div className="w-10 h-10 rounded-xl bg-[#111827] text-white font-black text-sm flex items-center justify-center shadow-xs">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">Enter Details & Upload Proofs</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fill in basic business details. Upload PAN, Aadhaar, and electricity bill. Our AI instantly checks file legibility and name spelling.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200/90 space-y-3 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md hover:bg-white hover:border-slate-300 active:scale-[0.99] cursor-default">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">CA Audit & Portal Filing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your assigned Chartered Accountant audits the dossier, verifies business activity codes, files Form REG-01, and issues your ARN.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200/90 space-y-3 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md hover:bg-white hover:border-slate-300 active:scale-[0.99] cursor-default">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">Download GST Certificate</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Upon government approval, your official 15-digit GSTIN and Form REG-06 Certificate are delivered straight to your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
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

      {/* 7. BOTTOM CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Ready to Start Your Business Registration?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Get your GST registration done right the first time with AI verification and dedicated Chartered Accountant filing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/apply/gst"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-sm shadow-md transition"
            >
              Start GST Registration Now
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition"
            >
              View Transparent Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
