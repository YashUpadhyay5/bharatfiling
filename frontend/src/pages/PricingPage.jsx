import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Building2, Receipt, FileCheck2, Calculator, Scale, Award, MessageCircle } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import AuthRequiredModal from '../components/common/AuthRequiredModal.jsx';

export default function PricingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedPlanForAuth, setSelectedPlanForAuth] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSelectPlan = (plan) => {
    if (isAuthenticated) {
      navigate(plan.ctaPath);
    } else {
      setSelectedPlanForAuth(plan);
      setIsAuthModalOpen(true);
    }
  };

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
      period: '+ 18% GST',
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
      tag: 'Monthly Operations',
      icon: Calculator,
      desc: 'Ongoing monthly bookkeeping, invoicing, P&L, balance sheets, payroll TDS, and GST returns.',
      breakdown: [
        { label: 'Bookkeeping on Tally / Zoho', val: 'Included' },
        { label: 'Monthly GST (GSTR-1 & 3B)', val: 'Included' },
        { label: 'Quarterly TDS Returns', val: 'Included' },
      ],
      features: [
        'Dedicated Accounting Desk & Monthly P&L',
        'GSTR-1, GSTR-3B & 2B ITC Reconciliation',
        'Monthly Payroll & TDS Form 24Q/26Q',
        'Advance Tax Estimation & Review',
        'Quarterly Video Consultation with Senior CA',
      ],
      ctaText: 'Explore Virtual CFO',
      ctaPath: '/services/legal',
    },
    {
      title: 'MCA ROC Annual Compliance',
      category: 'Corporate Secretarial',
      price: '₹3,499',
      period: '+ MCA filing fees',
      popular: false,
      tag: 'Statutory Secretarial',
      icon: Scale,
      desc: 'Annual mandatory MCA compliance for active Private Limited Companies and LLPs.',
      breakdown: [
        { label: 'Form AOC-4 (Financials)', val: 'Included' },
        { label: 'Form MGT-7 (Annual Return)', val: 'Included' },
        { label: 'Director KYC (DIR-3 KYC)', val: 'Included' },
      ],
      features: [
        'Statutory Financial Statements Prep (AOC-4)',
        'Annual Return ROC Preparation (MGT-7)',
        'Up to 2 Director KYCs (DIR-3 KYC)',
        'Drafting Minutes of AGM & Board Meetings',
        'Protection against MCA late fees of ₹100/day',
      ],
      ctaText: 'Manage ROC Filings',
      ctaPath: '/services/llp-registration',
    },
    {
      title: 'Trademark Registration',
      category: 'Intellectual Property',
      price: '₹1,999',
      period: '+ Govt IPR fees',
      popular: false,
      tag: 'Brand Protection',
      icon: Award,
      desc: 'Complete brand name, logo, or slogan registration with IP attorneys across 45 classes.',
      breakdown: [
        { label: 'Advocate Search & Drafting Fee', val: '₹1,999' },
        { label: 'Govt Fee (Individual/MSME)', val: '₹4,500' },
        { label: 'Govt Fee (Other Companies)', val: '₹9,000' },
      ],
      features: [
        'Comprehensive Pre-Filing Trademark Search',
        'Class Recommendation across 45 Nice Classes',
        'Drafting & Filing Form TM-A with IP India',
        'Instant Application Number (TM Symbol Right)',
        'Notice of Publication & Journal Monitoring',
      ],
      ctaText: 'Protect Your Brand',
      ctaPath: '/services/trademark',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Breadcrumbs items={[{ label: 'Pricing' }]} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
            100% Upfront Transparency
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252B36] tracking-tight">
            Transparent Fixed Pricing. Zero Hidden Fees.
          </h1>
          <p className="text-sm text-[#667085] leading-relaxed">
            Every quote clearly separates professional fees from actual government portal charges. What you see is exactly what you pay.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => {
            const IconComp = plan.icon;
            return (
              <div
                key={plan.title}
                className={`rounded-xl p-6 flex flex-col justify-between transition-colors shadow-xs relative bg-white ${
                  plan.popular
                    ? 'border-2 border-[#155EEF]'
                    : 'border border-[#E5E7EB] hover:border-[#155EEF]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 right-5 bg-[#155EEF] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded shadow-xs">
                    {plan.tag}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center border border-[#D1E9FF]">
                      <IconComp className="w-4 h-4" />
                    </div>
                    {!plan.popular && (
                      <span className="text-[10px] font-semibold text-[#667085] bg-[#F8F9FB] px-2 py-0.5 rounded border border-[#E5E7EB]">
                        {plan.tag}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">
                      {plan.category}
                    </span>
                    <h3 className="text-base font-bold text-[#252B36] mt-0.5">
                      {plan.title}
                    </h3>
                    <p className="text-xs text-[#667085] mt-1 leading-relaxed">
                      {plan.desc}
                    </p>
                  </div>

                  <div className="py-2 border-y border-[#E5E7EB]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-[#252B36]">
                        {plan.price}
                      </span>
                      <span className="text-xs text-[#667085]">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Fee Breakdown */}
                  <div className="bg-[#F8F9FB] rounded-lg p-3 space-y-1.5 text-xs text-[#667085] border border-[#E5E7EB]">
                    {plan.breakdown.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <span className="font-semibold text-[#252B36]">{item.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 text-xs text-[#252B36] pt-1">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-[#E5E7EB]">
                  <button
                    type="button"
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      plan.popular
                        ? 'bg-[#155EEF] hover:bg-[#1048C6] text-white shadow-xs'
                        : 'bg-[#F8F9FB] hover:bg-[#155EEF] text-[#252B36] hover:text-white border border-[#E5E7EB] hover:border-[#155EEF]'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Quote & Consultation Banner */}
        <div className="bg-[#F8F9FB] rounded-xl p-6 sm:p-8 border border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h2 className="text-lg sm:text-xl font-bold text-[#252B36]">
              Need a Custom Corporate Advisory Package?
            </h2>
            <p className="text-xs sm:text-sm text-[#667085] max-w-xl">
              We design customized compliance packages for startups, e-commerce sellers, manufacturing units, and foreign subsidiaries needing multi-state filing and dedicated CA retainers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition-colors"
            >
              Request Custom Quote
            </Link>
            <a
              href="https://wa.me/9118008908800"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-[#F8F9FB] text-[#252B36] font-semibold text-xs border border-[#E5E7EB] transition-colors flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-[#027A48]" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Authentication Popup Modal */}
      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        service={selectedPlanForAuth}
        onSuccess={() => {
          if (selectedPlanForAuth?.ctaPath) {
            navigate(selectedPlanForAuth.ctaPath);
          }
        }}
      />
    </div>
  );
}
