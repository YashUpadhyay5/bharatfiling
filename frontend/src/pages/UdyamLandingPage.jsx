import React, { useState } from 'react';
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
  Building2,
  Users,
  Award,
  Sparkles,
  HelpCircle,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function UdyamLandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleStartApplication = (e) => {
    if (e) e.preventDefault();
    navigate('/apply/udyam');
  };

  const faqs = [
    {
      q: 'What is Udyam Registration?',
      a: 'Udyam Registration is the official government registration and classification certificate for Micro, Small, and Medium Enterprises (MSMEs) issued by the Ministry of MSME, Government of India.',
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
    <div className="min-h-screen bg-slate-50 font-sans pb-16">
      <AuthRequiredModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        title="Sign In to Start Udyam Registration"
        subtitle="Access CA filing services and track your statutory application."
      />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              { label: 'Services', path: '/services' },
              { label: 'MSME / Udyam Registration' },
            ]}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white py-10 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[11px] sm:text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Ministry of MSME Statutory Portal Filing</span>
                <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black shrink-0">
                  LIVE
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Online MSME / Udyam Registration in India
              </h1>

              <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed px-1">
                Get your official Government Udyam Registration Certificate with dedicated CA assistance.
                Unlock collateral-free loans, 50% trademark subsidies, and priority government tenders.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                <SplitGradientButton
                  onClick={handleStartApplication}
                  label="Apply Udyam Registration"
                />
                <div className="text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">
                  Starts at <strong className="text-white font-extrabold">₹2,899</strong> + GST | Fast-Track Delivery
                </div>
              </div>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-slate-800 text-xs text-center sm:text-left">
                <div className="bg-slate-800/40 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
                  <div className="font-extrabold text-white text-base">100%</div>
                  <div className="text-slate-400 text-[11px]">Government Portal Approved</div>
                </div>
                <div className="bg-slate-800/40 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
                  <div className="font-extrabold text-white text-base">1-2 Days</div>
                  <div className="text-slate-400 text-[11px]">Express Turnaround</div>
                </div>
                <div className="bg-slate-800/40 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
                  <div className="font-extrabold text-white text-base">Direct Payment</div>
                  <div className="text-slate-400 text-[11px]">No AutoPay / No Hidden Mandates</div>
                </div>
              </div>
            </div>

            {/* Right Card: Quick Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">UDYAM Fast-Track Filing</h3>
                    <p className="text-xs text-slate-400">Complete CA Assisted Package</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-emerald-400">₹3,421</div>
                    <div className="text-[10px] text-slate-400">All-Inclusive (₹2,899 + 18% GST)</div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Aadhaar & PAN statutory verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Accurate 3-tier NIC 2008 code classification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Enterprise & Plant unit address filing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Bank account mapping for MSME DBT subsidies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Official Ministry e-Certificate with dynamic QR code</span>
                  </div>
                </div>

                <button
                  onClick={handleStartApplication}
                  className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 touch-target-safe"
                >
                  <span>Start Online Filing &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Every Indian Business Needs Udyam Registration
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            The Government of India provides substantial statutory benefits and priority financing to MSMEs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Collateral-Free Bank Loans</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eligible for priority sector lending from all public and private banks with CGTMSE guarantee cover and reduced interest rates.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Protection Against Delayed Payments</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Under Section 15 of MSMED Act, buyers must pay within 45 days. Delayed payments carry compound interest at 3x the RBI bank rate.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">50% Subsidy on IP & Tenders</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Get 50% discount on Trademark and Patent government filing fees plus exemption from Earnest Money Deposit (EMD) on government tenders.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-600">Everything you need to know about MSME / Udyam Registration</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 cursor-pointer touch-target-safe"
                >
                  <span className="pr-1">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3 bg-white animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
