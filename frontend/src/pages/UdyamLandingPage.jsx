import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthRequiredModal from '../components/common/AuthRequiredModal.jsx';
import {
  FileCheck2,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Award,
  ChevronDown,
  ChevronUp,
  Clock,
  Lock,
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function UdyamLandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleStartApplication = (e) => {
    if (e) e.preventDefault();
    if (isAuthenticated) {
      navigate('/apply/udyam');
    } else {
      setAuthModalOpen(true);
    }
  };

  const faqs = [
    {
      q: 'What is Udyam Registration?',
      a: 'Udyam Registration is the official statutory registration and classification certificate for Micro, Small, and Medium Enterprises (MSMEs) issued by the Ministry of MSME, Government of India.',
    },
    {
      q: 'Is Aadhaar and PAN mandatory for Udyam Registration?',
      a: 'Yes, Aadhaar number and PAN/GSTIN of the proprietor, partners, or directors are mandatory statutory requirements to complete online verification on the Udyam portal.',
    },
    {
      q: 'What are the main benefits of getting Udyam Registration?',
      a: 'Registered MSMEs gain access to collateral-free bank loans (CGTMSE), lower interest rates, 50% government subsidy on patent and trademark fees, government tender preference, and legal protection against delayed customer payments under the MSMED Act.',
    },
    {
      q: 'What is the processing time to receive the Udyam Certificate?',
      a: 'Once your details are verified by our Chartered Accountants and filed on the national portal, the official Udyam Registration Certificate is generated within 1 to 2 working days.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Breadcrumbs
        items={[
          { label: 'Services', path: '/services' },
          { label: 'MSME / Udyam Registration' },
        ]}
      />

      {/* 1. Hero Section */}
      <section className="pt-10 pb-14 md:pt-14 md:pb-18 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF8FF] border border-[#D1E9FF] text-[#155EEF] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#155EEF]" />
                <span>Ministry of MSME Statutory Portal Filing</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#252B36] tracking-tight leading-[1.2]">
                Online MSME / Udyam Registration <br className="hidden sm:inline" />
                <span className="text-[#155EEF]">in India</span>
              </h1>

              <p className="text-sm sm:text-base text-[#667085] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Obtain your official Government Udyam Registration Certificate with dedicated CA assistance. Unlock priority bank loans, 50% trademark subsidies, and tender protections.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleStartApplication}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Apply Udyam Registration
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/9118008908800?text=Hi%20BharatFiling%20Team%2C%20I%20need%20help%20with%20Udyam%20Registration."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-lg bg-white hover:bg-[#F8F9FB] text-[#252B36] font-semibold text-sm border border-[#E5E7EB] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#027A48]" />
                  Talk to CA on WhatsApp
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-3 text-xs text-[#667085]">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> 100% Online Process
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> 1-2 Days Turnaround
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> Direct Payment (No AutoPay)
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl p-6 shadow-xs border border-[#E5E7EB] space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">Fast-Track Package</span>
                    <h3 className="font-bold text-base text-[#252B36]">Udyam Registration</h3>
                  </div>
                  <span className="text-xs font-semibold text-[#027A48] bg-[#ECFDF3] px-2.5 py-0.5 rounded border border-[#A6F4C5]">
                    Government Verified
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-2xl font-bold text-[#252B36]">₹2,899</div>
                    <div className="text-xs text-[#667085]">+ 18% GST (Total ₹3,421)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-[#027A48]">Govt Fee: ₹0</div>
                    <div className="text-[11px] text-[#667085]">Turnaround: 1–2 Days</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#667085] border-t border-[#E5E7EB] pt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                    <span>Aadhaar & PAN statutory verification on national portal.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                    <span>Accurate 3-tier NIC 2008 code classification.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                    <span>Enterprise & manufacturing plant address filing.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                    <span>Official Ministry e-Certificate with dynamic QR code.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleStartApplication}
                    className="w-full py-2.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Start 3-Screen Filing
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Key MSME Benefits */}
      <section className="py-12 bg-[#F8F9FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">Statutory Benefits</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#252B36]">
              Why Every Indian Business Needs Udyam Registration
            </h2>
            <p className="text-xs sm:text-sm text-[#667085]">
              Substantial benefits and priority financial schemes provided under the MSMED Act.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center border border-[#D1E9FF]">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#252B36] text-sm">Collateral-Free Bank Loans</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Eligible for priority sector lending from all commercial banks with CGTMSE guarantee cover and reduced interest rates.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center border border-[#D1E9FF]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#252B36] text-sm">Protection Against Delayed Payments</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Under Section 15 of MSMED Act, buyers must settle dues within 45 days. Delayed payments carry compound interest at 3x the RBI rate.
              </p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-[#E5E7EB] shadow-xs space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center border border-[#D1E9FF]">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[#252B36] text-sm">50% Subsidy on IP & Tenders</h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                Receive 50% government fee concession on Trademark and Patent applications plus Earnest Money Deposit (EMD) exemptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">Help & Guidance</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#252B36]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-[#E5E7EB] rounded-lg overflow-hidden bg-[#F8F9FB]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#252B36] hover:text-[#155EEF] cursor-pointer transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#667085] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#667085] shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-[#667085] leading-relaxed border-t border-[#E5E7EB] pt-3 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication Required Modal */}
      <AuthRequiredModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        service={{
          title: 'MSME / Udyam Registration',
          path: '/apply/udyam',
          category: 'REGISTRATION',
          price: '₹2,899',
          period: '+ 18% GST',
        }}
        onSuccess={() => {
          navigate('/apply/udyam');
        }}
      />
    </div>
  );
}
