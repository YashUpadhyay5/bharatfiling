import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Building2, Receipt, FileCheck2, Calculator, Scale, Award, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function PricingPage() {
  const pricingPlans = [
    {
      title: 'Company Incorporation',
      category: 'MCA SPICe+ Portal',
      price: '₹4,999',
      period: '+ Govt Stamp Duty',
      popular: true,
      tag: 'Startup Favorite',
      icon: Building2,
      desc: 'Complete Private Limited Company or LLP registration with licensed CA & CS filing.',
      breakdown: [
        { label: 'CA & CS Professional Fee', val: '₹4,999' },
        { label: 'GST on Professional Fee (18%)', val: '₹900' },
        { label: 'Name Reservation (RUN)', val: 'Included' },
      ],
      features: [
        'Name Approval (RUN) & Reservation',
        '2 Digital Signatures (DSC Class 3)',
        'Drafting MOA & AOA by Corporate CS',
        'Certificate of Incorporation with CIN',
        'Corporate PAN, TAN & Bank Account Assistance',
      ],
      ctaText: 'Incorporate Company',
      ctaPath: '/services/company-registration',
    },
    {
      title: 'Income Tax Return (ITR)',
      category: 'Direct Taxation',
      price: '₹999',
      period: 'per filing',
      popular: false,
      tag: 'CA Tax Advisory',
      icon: Receipt,
      desc: 'Individual, professional, and corporate tax returns prepared and verified by Chartered Accountants.',
      breakdown: [
        { label: 'CA Preparation & Review', val: '₹999' },
        { label: 'GST on Services (18%)', val: '₹180' },
        { label: 'Income Tax Portal Filing Fee', val: '₹0 (FREE)' },
      ],
      features: [
        'ITR-1, ITR-2, ITR-3 or ITR-4 Filings',
        'AIS & 26AS Tax Credit Reconciliation',
        'Capital Gains & Deduction Maximizer',
        'Presumptive Taxation (Sec 44AD/ADA)',
        'E-Verification & Refund Tracking',
      ],
      ctaText: 'File Your ITR',
      ctaPath: '/services/income-tax',
    },
    {
      title: 'Online GST Registration',
      category: 'Indirect Taxation',
      price: '₹1,499',
      period: 'all-inclusive fee',
      popular: false,
      tag: 'Fast-Track',
      icon: FileCheck2,
      desc: 'Full Form REG-01 preparation with AI document verification and jurisdictional officer follow-up.',
      breakdown: [
        { label: 'CA Preparation & Audit Fee', val: '₹1,499' },
        { label: 'GST on Services (18%)', val: '₹270' },
        { label: 'Government Portal Fee', val: '₹0 (FREE)' },
      ],
      features: [
        'Full Form REG-01 Preparation by CA Desk',
        'AI Document OCR & Name Mismatch Validation',
        'Dedicated Chartered Accountant Oversight',
        'Notice Clarification (REG-03) Replies Included',
        'Final Form REG-06 Certificate & GSTIN',
      ],
      ctaText: 'Start GST Registration',
      ctaPath: '/apply/gst',
    },
    {
      title: 'Virtual CFO & Accounting',
      category: 'Finance & Accounts',
      price: '₹2,999',
      period: '/ month',
      popular: false,
      tag: 'Ongoing Finance',
      icon: Calculator,
      desc: 'Complete bookkeeping, monthly financial statements, and ongoing payroll & tax management.',
      breakdown: [
        { label: 'Monthly Retainer Fee', val: '₹2,999' },
        { label: 'GST on Services (18%)', val: '₹540' },
        { label: 'Cloud Ledger Integration', val: 'Included' },
      ],
      features: [
        'Tally & Zoho Books Ledger Maintenance',
        'Monthly P&L, Balance Sheet & Cash Flow',
        'Vendor Bill Processing & Invoicing',
        'TDS Deduction & Payroll Compliance',
        'Monthly Strategic Review with Senior CA',
      ],
      ctaText: 'Hire Virtual CFO',
      ctaPath: '/services/legal',
    },
    {
      title: 'Annual MCA ROC Compliance',
      category: 'Corporate Secretarial',
      price: '₹3,499',
      period: 'per financial year',
      popular: false,
      tag: 'Mandatory Compliance',
      icon: Scale,
      desc: 'Annual statutory compliance for Pvt Ltd and LLP entities to prevent ROC strike-off and penalties.',
      breakdown: [
        { label: 'CS & CA Audit Fee', val: '₹3,499' },
        { label: 'GST on Services (18%)', val: '₹630' },
        { label: 'ROC Filing Assistance', val: 'Included' },
      ],
      features: [
        'Filing Form AOC-4 (Financial Statements)',
        'Filing Form MGT-7 (Annual Return)',
        'Director KYC (DIR-3 KYC) for 2 Directors',
        'Drafting AGM Minutes & Resolutions',
        'Statutory Audit Support & Assistance',
      ],
      ctaText: 'Manage ROC Filings',
      ctaPath: '/services/llp-registration',
    },
    {
      title: 'Trademark Registration',
      category: 'Intellectual Property',
      price: '₹1,999',
      period: '+ Govt TM Fee',
      popular: false,
      tag: 'Brand Protection',
      icon: Award,
      desc: 'Protect brand name, logo, or tagline nationwide with licensed IP Attorney representation.',
      breakdown: [
        { label: 'IP Attorney Drafting Fee', val: '₹1,999' },
        { label: 'GST on Services (18%)', val: '₹360' },
        { label: 'Nice Class Classification', val: 'Included' },
      ],
      features: [
        'Free Comprehensive TM Search Report',
        'Class 1-45 Selection & Strategy',
        'Form TM-A Preparation & Submission',
        'Govt Trademark Application Receipt',
        'Examination Report Advisory',
      ],
      ctaText: 'Protect Your Brand',
      ctaPath: '/services/trademark',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Breadcrumbs items={[{ label: 'Transparent Pricing' }]} />
      
      <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#111827] bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Fair & Transparent
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Straightforward CA & Compliance Pricing
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            We believe in 100% upfront clarity with zero hidden surprises. Every plan includes certified Chartered Accountant review and direct government portal filing.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => {
            const IconComp = plan.icon;
            return (
              <div
                key={plan.title}
                className={`bg-white rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between relative shadow-xs hover:shadow-xl hover:-translate-y-1.5 ${
                  plan.popular
                    ? 'border-[#111827] ring-2 ring-[#111827]/10'
                    : 'border-slate-200/90'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 bg-[#111827] text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-md">
                    {plan.tag}
                  </div>
                )}

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#111827] flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    {!plan.popular && (
                      <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                        {plan.tag}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {plan.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                      {plan.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {plan.desc}
                    </p>
                  </div>

                  <div className="py-2 border-y border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Fee Breakdown */}
                  <div className="bg-slate-50/70 rounded-xl p-3 space-y-1.5 text-xs text-slate-600">
                    {plan.breakdown.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <span className="font-bold text-slate-900">{item.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 text-xs text-slate-700 pt-1">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    to={plan.ctaPath}
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 ${
                      plan.popular
                        ? 'bg-[#111827] hover:bg-[#1F2937] text-white shadow-md'
                        : 'bg-slate-100 hover:bg-[#111827] text-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Quote & Consultation Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Need a Custom Corporate Advisory Package?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              We create customized plans for fast-growing startups, manufacturing units, e-commerce sellers, and foreign subsidiaries needing multi-state compliance and specialized tax planning.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs shadow-md transition"
            >
              Request Custom Quote
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20BharatFiling%20Team%2C%20I%20need%20a%20custom%20corporate%20CA%20proposal."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
