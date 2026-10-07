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
      q: 'What services does BharatFiling provide for Indian businesses?',
      a: 'BharatFiling is a full-stack corporate and legal compliance platform. We support Company Incorporation (Private Limited, LLP, OPC), GST Registration & Monthly Return Filing, Trademark & IP Protection, Income Tax (ITR) Filings, MCA ROC Annual Compliance, Accounting, and dedicated Chartered Accountant advisory.',
    },
    {
      q: 'Is the entire filing and registration process 100% online?',
      a: 'Yes, 100% online and paperless. You do not need to visit any government office, tax department, or registrar. Complete your application through our intuitive online flow, upload scanned documents, and our team handles all portal filings and acknowledgments digitally.',
    },
    {
      q: 'How does BharatFiling’s AI + CA model work?',
      a: 'Unlike automated template tools or slow traditional agencies, BharatFiling combines AI document OCR (which pre-screens files for legibility and name mismatches) with licensed Chartered Accountants and Corporate Lawyers who personally review, authenticate, and submit every statutory filing.',
    },
    {
      q: 'How does the Master Customer Profile benefit my business over time?',
      a: 'Your master KYC and company documents are verified once and safely stored in your encrypted compliance vault. When you later need additional services—such as adding a director, filing monthly GST returns, submitting annual ITR, or registering trademarks—all details pre-fill automatically with zero redundant paperwork.',
    },
    {
      q: 'What happens if government authorities issue queries or clarification notices?',
      a: 'Clarification notice support is built right into our services. If MCA, the GST department, Income Tax authorities, or the Trademark registry issue queries, our assigned CAs draft the legal clarification responses and represent your application until completion.',
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
                Incorporate, File & Comply <br className="hidden sm:inline" />
                <span className="text-[#111827]">All in One Platform</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Incorporate companies, register GST & trademarks, file tax returns, and manage ROC compliance with AI-powered speed backed by licensed Chartered Accountants.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <Link
                  to="/services"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Explore All 40+ Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>

                <a
                  href="https://wa.me/919876543210?text=Hi%20BharatFiling%20Team%2C%20I%20need%20assistance%20with%20business%20registration%20and%20compliance."
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 40+ Legal & Tax Services
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Online & Paperless
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Licensed CA Verification
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
              <div className="text-xs text-slate-500 mt-0.5">Fast-Track Govt Filings</div>
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

      {/* 4. HOW IT WORKS */}
      <section className="py-16 md:py-20 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How BharatFiling Works
            </h2>
            <p className="text-sm text-slate-600">
              Whether incorporating a startup, registering for GST, protecting a trademark, or filing taxes—done seamlessly in 3 steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 space-y-3 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md hover:border-slate-300 active:scale-[0.99] cursor-default">
              <div className="w-10 h-10 rounded-xl bg-[#111827] text-white font-black text-sm flex items-center justify-center shadow-xs">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">Select Service & Share Details</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pick your requirement—Company Incorporation, GST, Trademark, or ITR. Share basic details and upload IDs. Our intelligent AI pre-checks document clarity instantly.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 space-y-3 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md hover:border-slate-300 active:scale-[0.99] cursor-default">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">Expert CA & Legal Audit</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A dedicated Chartered Accountant or Corporate Lawyer audits your dossier, prepares statutory filings (MCA SPICe+, GST REG-01, TM-A, or ITR), and submits directly to government portals.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 space-y-3 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md hover:border-slate-300 active:scale-[0.99] cursor-default">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">Get Approved & Manage in Vault</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive your official government certificates, GSTIN, CIN, or Trademark receipt directly in your Master Dashboard vault with lifetime compliance tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQS */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200/80">
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
                className="bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
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

      {/* 6. BOTTOM CTA */}
      <section className="py-14 bg-slate-50/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Ready to Incorporate & Comply with Confidence?
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Join 10,000+ Indian founders and businesses managing registrations, legal protection, and statutory tax filings with BharatFiling.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-sm shadow-md transition"
            >
              Explore All 40+ Services
            </Link>
            <Link
              to="/apply/gst"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition"
            >
              Start GST Registration
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition"
            >
              View Transparent Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
