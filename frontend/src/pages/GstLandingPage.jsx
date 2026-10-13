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
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function GstLandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState('Proprietorship');
  const [openFaq, setOpenFaq] = useState(0);

  const handleStartApplication = (e) => {
    if (e) e.preventDefault();
    if (isAuthenticated) {
      navigate('/apply/gst');
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
      <section className="pt-10 pb-14 md:pt-14 md:pb-18 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF8FF] border border-[#D1E9FF] text-[#155EEF] text-xs font-semibold">
                <FileCheck2 className="w-3.5 h-3.5 text-[#155EEF]" />
                <span>Form REG-01 Filing · Govt Portal Ready</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#252B36] tracking-tight leading-[1.2]">
                Apply for GST Number <br className="hidden sm:inline" />
                <span className="text-[#155EEF]">Online in India</span>
              </h1>

              <p className="text-sm sm:text-base text-[#667085] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Obtain your 15-digit GSTIN and official Form REG-06 Certificate in 3 to 7 working days. AI validates your documents instantly; licensed Chartered Accountants file directly on the tax portal.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleStartApplication}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  Start GST Registration
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/9118008908800?text=Hi%20BharatFiling%20Team%2C%20I%20need%20help%20with%20GST%20Registration."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-lg bg-white hover:bg-[#F8F9FB] text-[#252B36] font-semibold text-sm border border-[#E5E7EB] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#027A48]" />
                  Talk to CA on WhatsApp
                </a>
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-3 text-xs text-[#667085]">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> Govt Portal Fee: ₹0
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> 100% Digital Process
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#027A48]" /> Notice (REG-03) Clarification Included
                </div>
              </div>
            </div>

            {/* Right: Transparent Pricing & Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-xl p-6 shadow-xs border border-[#E5E7EB] space-y-4">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">All-Inclusive Package</span>
                    <h3 className="font-bold text-base text-[#252B36]">GST Registration Service</h3>
                  </div>
                  <span className="text-xs font-semibold text-[#027A48] bg-[#ECFDF3] px-2.5 py-0.5 rounded border border-[#A6F4C5]">
                    Transparent
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-2xl font-bold text-[#252B36]">₹1,499</div>
                    <div className="text-xs text-[#667085]">+ 18% GST (Total ₹1,769)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-[#027A48]">Govt Fee: ₹0</div>
                    <div className="text-[11px] text-[#667085]">Timeline: 3–7 Days</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#667085] border-t border-[#E5E7EB] pt-4">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                    <span><strong>AI Document OCR:</strong> Automated extraction and mismatch detection.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                    <span><strong>Licensed CA Review:</strong> Form REG-01 prepared and audited by CA.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                    <span><strong>Notice Support:</strong> Drafting response to Form REG-03 queries included.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#027A48] shrink-0 mt-0.5" />
                    <span><strong>Certificate Delivery:</strong> REG-06 certificate and GSTIN issued to dashboard.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleStartApplication}
                    className="w-full py-2.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Start 5-Minute Application
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. REQUIRED DOCUMENTS BY ENTITY */}
      <section className="py-12 bg-[#F8F9FB] border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
              Document Checklist
            </span>
            <h2 className="text-2xl font-bold text-[#252B36]">
              Documents Required for GST Registration
            </h2>
            <p className="text-xs sm:text-sm text-[#667085]">
              Select your business constitution to view the exact list of documents needed.
            </p>
          </div>

          {/* Entity Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {Object.keys(entityDocs).map((entity) => (
              <button
                key={entity}
                onClick={() => setSelectedEntity(entity)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedEntity === entity
                    ? 'bg-[#155EEF] text-white shadow-xs'
                    : 'bg-white text-[#252B36] border border-[#E5E7EB] hover:bg-[#F8F9FB]'
                }`}
              >
                {entity}
              </button>
            ))}
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-xl p-6 shadow-xs border border-[#E5E7EB]">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3 mb-4">
              <h3 className="font-bold text-sm text-[#252B36]">
                Checklist for {selectedEntity}
              </h3>
              <span className="text-xs text-[#155EEF] font-semibold">
                {entityDocs[selectedEntity].length} Documents Required
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {entityDocs[selectedEntity].map((doc, idx) => (
                <div
                  key={doc}
                  className="p-3 rounded-lg bg-[#F8F9FB] border border-[#E5E7EB] flex items-start gap-2.5"
                >
                  <div className="w-5 h-5 rounded-md bg-[#EFF8FF] text-[#155EEF] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 border border-[#D1E9FF]">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-medium text-[#252B36] leading-snug">{doc}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#667085]">
                Don't have all documents right now? You can start the application and upload them later.
              </span>
              <button
                type="button"
                onClick={handleStartApplication}
                className="px-5 py-2 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
              >
                Begin Application &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GST FAQS */}
      <section className="py-12 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-2">
            <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">
              Answers & Guidance
            </span>
            <h2 className="text-2xl font-bold text-[#252B36]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-2.5">
            {gstFaqs.map((faq, idx) => (
              <div
                key={faq.q}
                className="bg-[#F8F9FB] rounded-lg border border-[#E5E7EB] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#252B36] hover:text-[#155EEF] transition-colors cursor-pointer"
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

      {/* 4. BOTTOM ACTION */}
      <section className="py-12 bg-[#F8F9FB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#252B36]">
            Ready to secure your GST Number?
          </h2>
          <p className="text-xs sm:text-sm text-[#667085]">
            Submit your details in 5 minutes. Our team will verify your documents and initiate portal submission today.
          </p>
          <div className="pt-1">
            <button
              type="button"
              onClick={handleStartApplication}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
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
          price: '₹1,499',
          period: '+ 18% GST',
        }}
        onSuccess={() => {
          navigate('/apply/gst');
        }}
      />
    </div>
  );
}
