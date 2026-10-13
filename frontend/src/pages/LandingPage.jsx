import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  FileCheck2,
  Building2,
  Receipt,
  Scale,
  Award,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Check,
  Clock,
  Lock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import AuthRequiredModal from '../components/common/AuthRequiredModal.jsx';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedServiceForAuth, setSelectedServiceForAuth] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSelectService = (service) => {
    if (isAuthenticated) {
      navigate(service.path);
    } else {
      setSelectedServiceForAuth(service);
      setIsAuthModalOpen(true);
    }
  };

  const popularServices = [
    {
      title: 'Private Limited Company Incorporation',
      category: 'incorporation',
      desc: 'Complete MCA SPICe+ filing, DIN, MOA, AOA, PAN/TAN, and digital signatures with dedicated CA assistance.',
      price: '₹4,999 + Govt Fees',
      tag: 'Startup Incorporation',
      path: '/services/company-registration',
      features: ['Name Approval (RUN)', 'Digital Signature (DSC)', 'Articles of Association', 'Current Account Setup'],
    },
    {
      title: 'GST Registration & Compliance',
      category: 'gst',
      desc: 'Complete end-to-end GSTIN registration with AI OCR document verification and licensed Chartered Accountant filing.',
      price: '₹1,499 + GST',
      tag: 'Statutory Registration',
      path: '/services/gst-registration',
      features: ['Free Document Verification', 'Form REG-01 Preparation', 'Notice Clarifications Included', 'Official REG-06 Delivery'],
    },
    {
      title: 'Udyam / MSME Registration',
      category: 'registrations',
      desc: 'Government MSME certification for priority sector lending, collateral-free loans, and subsidy access.',
      price: '₹999 + GST',
      tag: 'MSME License',
      path: '/services/udyam-registration',
      features: ['Instant Aadhaar Verification', 'NIC Code Classification', 'Udyam Registration Certificate', 'Priority Bank Scheme Access'],
    },
    {
      title: 'Income Tax Return (ITR) & Corporate Audit',
      category: 'tax',
      desc: 'File individual, business, and corporate tax returns with maximum deductions and AIS/26AS tax credit reconciliation.',
      price: 'From ₹999',
      tag: 'Direct Taxation',
      path: '/services/income-tax',
      features: ['AIS & 26AS Reconciliation', 'Capital Gains Computations', 'Deductions Optimization', 'Refund Tracking'],
    },
    {
      title: 'MCA Annual ROC Compliance',
      category: 'compliance',
      desc: 'Statutory annual compliance filing for Private Limited and LLP companies to maintain active legal standing.',
      price: '₹3,499 + MCA Fees',
      tag: 'Corporate Secretarial',
      path: '/services/llp-registration',
      features: ['Form AOC-4 & MGT-7', 'Director KYC (DIR-3 KYC)', 'Annual General Meeting Docs', 'Zero Late-Fee Tracking'],
    },
    {
      title: 'Trademark Registration & Protection',
      category: 'trademark',
      desc: 'Protect your brand name, logo, and slogan nationwide with IP attorney representation across 45 classes.',
      price: '₹1,999 + Govt Fees',
      tag: 'Brand Protection',
      path: '/services/trademark',
      features: ['Free TM Search Report', 'Class Classification (Nice)', 'Form TM-A Filing', 'Hearing Support'],
    },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? popularServices
      : popularServices.filter((s) => s.category === activeCategory);

  const faqs = [
    {
      q: 'What services does BharatFiling provide for Indian businesses?',
      a: 'BharatFiling is a comprehensive corporate, tax, and legal advisory platform. We manage Company Incorporation (Private Limited, LLP, OPC), Corporate Tax Advisory & ITR Filing, MSME / Udyam Certification, GST Registration & Monthly Returns, MCA ROC Annual Compliance, and Trademark Registration.',
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
      q: 'How many days does it take to obtain registration certificates?',
      a: 'Turnaround times depend on the specific government department. GST registration typically takes 3 to 7 working days, MSME/Udyam certificates take 1 to 2 working days, and Private Limited company incorporation takes 5 to 9 working days upon receipt of complete documentation.',
    },
    {
      q: 'What happens if tax or corporate authorities issue queries or notices?',
      a: 'Statutory query response support is built directly into our services. If MCA, the Income Tax Department, the GST department, or the Trademark registry issues clarification notices, our assigned Chartered Accountants prepare formal legal replies.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* 1. HERO SECTION (IndiaFilings Inspired Minimal Corporate Hero) */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          {/* Subtle Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF8FF] border border-[#D1E9FF] text-[#155EEF] text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#155EEF]" />
            <span>Chartered Accountant Led Taxation & Compliance Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#252B36] tracking-tight leading-[1.2]">
            India’s Trusted Platform for Business Registration, <br className="hidden sm:inline" />
            <span className="text-[#155EEF]">GST & Statutory Compliance</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-[#667085] max-w-2xl mx-auto leading-relaxed">
            Incorporate companies, file GST & ITR returns, secure MSME licenses, and manage MCA compliance with dedicated Chartered Accountants and advocates.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/services"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              Explore All Services
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white hover:bg-[#F8F9FB] text-[#252B36] font-semibold text-sm border border-[#E5E7EB] shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              Book CA Consultation
            </Link>

            <a
              href="https://wa.me/9118008908800?text=Hi%20BharatFiling%20Team%2C%20I%20need%20professional%20CA%20compliance%20assistance."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-white hover:bg-[#F8F9FB] text-[#252B36] font-semibold text-sm border border-[#E5E7EB] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#027A48]" />
              Talk to CA on WhatsApp
            </a>
          </div>

          {/* Verified Operational Indicators */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#667085] border-t border-[#E5E7EB] max-w-2xl mx-auto">
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> 100% Online & Paperless
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> Licensed ICAI Review
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> Transparent Government Fees
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Lock className="w-4 h-4 text-[#027A48]" /> 256-Bit SSL Encrypted Vault
            </div>
          </div>
        </div>
      </section>

      {/* 2. VERIFIED OPERATIONAL BENCHMARKS (Non-Fabricated Metrics) */}
      <section className="py-7 bg-[#F8F9FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#252B36]">3–7 Days</div>
              <div className="text-xs text-[#667085] mt-0.5">Average Govt Filing Time</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#155EEF]">100% Digital</div>
              <div className="text-xs text-[#667085] mt-0.5">Paperless Portal Submissions</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#252B36]">Verified CAs</div>
              <div className="text-xs text-[#667085] mt-0.5">ICAI Certified Professionals</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#027A48]">256-Bit SSL</div>
              <div className="text-xs text-[#667085] mt-0.5">Bank-Grade Document Storage</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR SERVICES GRID WITH CATEGORY TABS */}
      <section className="py-14 md:py-18 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
              Statutory Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#252B36]">
              Popular Corporate & Taxation Filings
            </h2>
            <p className="text-sm text-[#667085]">
              Fixed transparent pricing. Dedicated Chartered Accountant consultation included with every application.
            </p>
          </div>

          {/* Service Category Tabs */}
          <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'gst', label: 'GST Services' },
              { id: 'incorporation', label: 'Incorporation' },
              { id: 'registrations', label: 'Registrations' },
              { id: 'tax', label: 'Income Tax' },
              { id: 'compliance', label: 'Compliance' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-[#155EEF] text-white shadow-xs'
                    : 'bg-[#F8F9FB] text-[#667085] hover:text-[#252B36] border border-[#E5E7EB]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.title}
                onClick={() => handleSelectService(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSelectService(service)}
                className="p-6 rounded-xl border border-[#E5E7EB] bg-white shadow-xs flex flex-col justify-between cursor-pointer hover:border-[#155EEF] hover:shadow-sm transition-all"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#155EEF] bg-[#EFF8FF] px-2.5 py-0.5 rounded border border-[#D1E9FF]">
                      {service.tag}
                    </span>
                    <span className="text-base font-extrabold text-[#252B36]">
                      {service.price}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#252B36] hover:text-[#155EEF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-3 border-t border-[#F1F3F5] text-xs text-[#667085]">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#027A48] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-[#E5E7EB]">
                  <div className="w-full py-2.5 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 bg-[#F8F9FB] hover:bg-[#155EEF] text-[#252B36] hover:text-white border border-[#E5E7EB] hover:border-[#155EEF] transition-colors">
                    Start Application
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (IndiaFilings 3-Step Structure) */}
      <section className="py-14 md:py-18 bg-[#F8F9FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
              Transparent Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#252B36]">
              How BharatFiling Works
            </h2>
            <p className="text-sm text-[#667085]">
              Seamless end-to-end statutory filing managed by qualified professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#EFF8FF] text-[#155EEF] font-bold text-sm flex items-center justify-center border border-[#D1E9FF]">
                1
              </div>
              <h3 className="font-bold text-base text-[#252B36]">Submit Details & Documents</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Choose your service and fill in required details. Upload identity and business address proofs to our 256-bit encrypted vault.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#EFF8FF] text-[#155EEF] font-bold text-sm flex items-center justify-center border border-[#D1E9FF]">
                2
              </div>
              <h3 className="font-bold text-base text-[#252B36]">Chartered Accountant Review</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                An assigned Chartered Accountant verifies documents, prepares statutory paperwork, and submits filings directly on government portals.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#E5E7EB] space-y-3">
              <div className="w-8 h-8 rounded-lg bg-[#EFF8FF] text-[#155EEF] font-bold text-sm flex items-center justify-center border border-[#D1E9FF]">
                3
              </div>
              <h3 className="font-bold text-base text-[#252B36]">Certificate Issued & Stored</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Receive official government certificates (GSTIN, Udyam, COI) in your dashboard with ongoing compliance calendar tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-14 md:py-18 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
              Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#252B36]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="bg-[#F8F9FB] rounded-xl border border-[#E5E7EB] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-semibold text-[#252B36] hover:text-[#155EEF] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#667085] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#667085] shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-[#667085] leading-relaxed border-t border-[#E5E7EB] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA STRIP */}
      <section className="py-14 bg-[#F8F9FB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#252B36]">
            Start Your Business Compliance Journey Online
          </h2>
          <p className="text-sm text-[#667085] max-w-xl mx-auto">
            Transparent fixed pricing, zero hidden costs, and personal assistance from licensed Indian Chartered Accountants.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/services"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-sm shadow-xs transition-colors"
            >
              Explore All Services
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white hover:bg-[#F8F9FB] text-[#252B36] font-semibold text-sm border border-[#E5E7EB] shadow-xs transition-colors"
            >
              Consult a Chartered Accountant
            </Link>
          </div>
        </div>
      </section>

      {/* Authentication Popup Modal */}
      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        service={selectedServiceForAuth}
        onSuccess={() => {
          if (selectedServiceForAuth?.path) {
            navigate(selectedServiceForAuth.path);
          }
        }}
      />
    </div>
  );
}
