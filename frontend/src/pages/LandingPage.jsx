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
  Calculator,
} from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);

  const heroRailServices = [
    {
      title: 'Company Incorporation',
      subtitle: 'Pvt Ltd, LLP, OPC & Startup Setup',
      path: '/services/company-registration',
      icon: Building2,
      iconBg: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Income Tax & Corporate Audit',
      subtitle: 'ITR-1 to 7, TDS Returns & Tax Planning',
      path: '/services/income-tax',
      icon: Receipt,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      badge: 'Tax Season',
    },
    {
      title: 'GST Registration & Returns',
      subtitle: 'Online GSTIN & GSTR-1/3B Compliance',
      path: '/services/gst-registration',
      icon: FileCheck2,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700',
      badge: 'Fast-Track',
    },
    {
      title: 'Virtual CFO & Accounting',
      subtitle: 'Monthly Bookkeeping, P&L & Payroll',
      path: '/services/legal',
      icon: Calculator,
      iconBg: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
    },
    {
      title: 'MCA ROC Compliance',
      subtitle: 'Annual Filings, Director KYC & Secretarial',
      path: '/services/llp-registration',
      icon: Scale,
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Trademark & IP Legal',
      subtitle: 'Brand Search & IP Attorney Filing',
      path: '/services/trademark',
      icon: Award,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
  ];

  const popularServices = [
    {
      title: 'Private Limited Company Incorporation',
      desc: 'Complete MCA SPICe+ filing, DIN, MOA, AOA, PAN/TAN, and digital signatures with dedicated CA assistance.',
      price: '₹4,999',
      tag: 'Startup Favorite',
      path: '/services/company-registration',
      features: ['Name Approval (RUN)', 'Digital Signature (DSC)', 'Articles of Association', 'Current Account Setup'],
    },
    {
      title: 'Income Tax Return (ITR) & Corporate Audit',
      desc: 'File individual, business, and corporate tax returns with maximum deductions and AIS/26AS tax credit reconciliation.',
      price: '₹999',
      tag: 'CA Tax Advisory',
      path: '/services/income-tax',
      features: ['AIS & TIS Reconciliation', 'Capital Gains Computations', 'Deductions (80C/80D)', 'Refund Tracking'],
    },
    {
      title: 'GST Registration & Compliance',
      desc: 'Complete end-to-end GSTIN registration with AI OCR document verification and licensed Chartered Accountant filing.',
      price: '₹1,499',
      tag: 'Fast-Track Filing',
      path: '/services/gst-registration',
      features: ['Free Document AI Check', 'Form REG-01 Preparation', 'Notice Clarifications Included', 'REG-06 Certificate'],
    },
    {
      title: 'Virtual CFO & Monthly Accounting',
      desc: 'Full-stack bookkeeping, monthly P&L and Balance Sheet preparation, vendor invoicing, and payroll compliance.',
      price: '₹2,999/mo',
      tag: 'Finance & Accounts',
      path: '/services/legal',
      features: ['Tally & Zoho Books Setup', 'Monthly Financial Reports', 'TDS & Payroll Compliance', 'Periodic CA Review'],
    },
    {
      title: 'MCA Annual ROC Compliance',
      desc: 'Statutory annual compliance filing for Private Limited and LLP companies to maintain active legal standing.',
      price: '₹3,499',
      tag: 'Corporate Secretarial',
      path: '/services/llp-registration',
      features: ['Form AOC-4 & MGT-7', 'Director KYC (DIR-3 KYC)', 'Annual General Meeting Docs', 'Zero Late-Fee Tracking'],
    },
    {
      title: 'Trademark Registration & Brand Legal',
      desc: 'Protect your brand name, logo, and slogan nationwide with IP attorney representation and class classification.',
      price: '₹1,999',
      tag: 'Brand Protection',
      path: '/services/trademark',
      features: ['Free TM Search Report', 'Class Classification', 'Form TM-A Filing', 'Hearing Support'],
    },
  ];

  const faqs = [
    {
      q: 'What services does BharatFiling provide for Indian businesses?',
      a: 'BharatFiling is a comprehensive corporate, tax, and legal advisory platform. We support Company Incorporation (Private Limited, LLP, OPC), Corporate Tax Advisory & ITR Filing, Monthly Accounting & Virtual CFO, GST Registration & Returns, MCA ROC Annual Compliance, and Trademark Protection.',
    },
    {
      q: 'Who prepares and audits my filings and financial statements?',
      a: 'Every statutory filing, tax computation, and corporate return is personally audited and verified by licensed Indian Chartered Accountants (ICAI members), Company Secretaries (ICSI), and Corporate Advocates.',
    },
    {
      q: 'Is the entire filing and advisory process 100% online?',
      a: 'Yes, 100% online and paperless. You do not need to visit any government office, tax department, or registrar. Upload documents via our encrypted client portal, and our CA team manages all portal submissions and delivers certificates digitally.',
    },
    {
      q: 'Can BharatFiling manage ongoing monthly bookkeeping and payroll?',
      a: 'Yes. Beyond one-time registrations, we provide end-to-end financial operations: monthly bookkeeping on Tally/Zoho, payroll TDS deduction, GSTR-1/3B filing, advance tax planning, and year-end statutory audit preparation.',
    },
    {
      q: 'What happens if tax or corporate authorities issue queries or notices?',
      a: 'Statutory query response support is built directly into our services. If MCA, the Income Tax Department, the GST department, or the Trademark registry issues notices, our assigned Chartered Accountants and Advocates prepare formal legal replies and represent your case.',
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
                <span>India's Premier CA, Finance & Legal Advisory Platform</span>
              </div>

              {/* Main Headline with Premium Charcoal Styling */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                Complete CA, Finance & Legal Advisory <br className="hidden sm:inline" />
                <span className="text-[#111827]">All in One Platform</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Incorporate companies, manage corporate tax advisory, file GST & ITR returns, streamline bookkeeping, and maintain MCA compliance with AI-powered speed backed by licensed Chartered Accountants.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <Link
                  to="/services"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Explore All 40+ CA & Tax Services
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>

                <a
                  href="https://wa.me/919876543210?text=Hi%20BharatFiling%20Team%2C%20I%20need%20professional%20CA%20and%20business%20compliance%20advisory."
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 40+ CA & Legal Services
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Online & Paperless
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Licensed CA & Advocate Verification
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
              Comprehensive CA & Legal Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Popular Chartered Accountant & Corporate Services
            </h2>
            <p className="text-sm text-slate-600">
              Transparent fixed pricing. No hidden surprises. Professional CA consultation included with every service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((service) => (
              <Link
                key={service.title}
                to={service.path}
                className="group relative p-6 sm:p-7 rounded-3xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 ease-out transform-gpu flex flex-col justify-between cursor-pointer hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(17,24,39,0.12)] hover:border-[#111827]/40 active:scale-[0.98] active:translate-y-0 active:shadow-md"
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
                  <div className="w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 bg-[#111827] group-hover:bg-[#1F2937] text-white shadow-xs group-hover:shadow-md">
                    View Service Details & Pricing
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
              Whether incorporating a business, filing corporate taxes, managing monthly books, or securing trademarks—done seamlessly in 3 steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 space-y-3 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md hover:border-slate-300 active:scale-[0.99] cursor-default">
              <div className="w-10 h-10 rounded-xl bg-[#111827] text-white font-black text-sm flex items-center justify-center shadow-xs">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">Select Service & Share Details</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pick your requirement—Company Incorporation, Corporate Tax, Accounting, GST, or MCA Filings. Share basic details and upload IDs. Our intelligent AI pre-checks document clarity instantly.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 space-y-3 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md hover:border-slate-300 active:scale-[0.99] cursor-default">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">Expert CA & Financial Audit</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                A dedicated Chartered Accountant or Corporate Lawyer audits your dossier, prepares statutory filings (MCA SPICe+, Income Tax ITR, Form REG-01, or TM-A), and optimizes your tax liabilities.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 space-y-3 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md hover:border-slate-300 active:scale-[0.99] cursor-default">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">Get Approved & Manage in Vault</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive your official government certificates, CIN, GSTIN, ITR acknowledgments, or audit reports directly in your Master Dashboard vault with lifetime compliance tracking.
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
            Complete CA, Finance & Legal Advisory for Your Business
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Join 10,000+ Indian founders and businesses managing corporate registrations, accounting, tax filings, audits, and statutory compliance with BharatFiling.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-sm shadow-md transition"
            >
              Explore All 40+ CA & Tax Services
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition"
            >
              Book Free CA Consultation
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
