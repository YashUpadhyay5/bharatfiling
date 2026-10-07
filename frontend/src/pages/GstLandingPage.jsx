import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function GstLandingPage() {
  const [selectedEntity, setSelectedEntity] = useState('Proprietorship');
  const [openFaq, setOpenFaq] = useState(0);

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
      <section className="pt-10 pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-white via-slate-50/40 to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#0B1E36] text-xs font-semibold">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Form REG-01 Filing · Govt Portal Ready</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                Apply for GST Number <br className="hidden sm:inline" />
                <span className="text-[#0B1E36]">Online in India</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Obtain your 15-digit GSTIN and official Form REG-06 Certificate in 3 to 7 working days. AI validates your documents instantly; licensed Chartered Accountants file directly with the tax department.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <Link
                  to="/apply/gst"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0B1E36] hover:bg-[#142C4F] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Start GST Registration Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>

                <a
                  href="https://wa.me/919876543210?text=Hi%20BharatFiling%20Team%2C%20I%20need%20help%20with%20GST%20Registration."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 shadow-xs transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  Talk to CA on WhatsApp
                </a>
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Govt Portal Fee: ₹0
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Digital Process
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free Clarification (REG-03) Support
                </div>
              </div>
            </div>

            {/* Right: Transparent Pricing & Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 shadow-[0_12px_36px_rgba(11,30,54,0.06)] border border-slate-200/80 space-y-5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(11,30,54,0.12)] hover:border-[#0B1E36]/30">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">All-Inclusive Package</span>
                    <h3 className="font-bold text-base text-slate-900">GST Registration Service</h3>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Transparent
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-3xl font-extrabold text-slate-900">₹1,499</div>
                    <div className="text-xs text-slate-500">+ 18% GST (Total ₹1,769)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-600">Govt Fee: ₹0</div>
                    <div className="text-[11px] text-slate-400">Timeline: 3–7 Days</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>AI Document OCR:</strong> Automated extraction and mismatch detection.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Licensed CA Review:</strong> Form REG-01 audited by Chartered Accountant.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Notice Support:</strong> Drafting response to Form REG-03 queries included.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Certificate Delivery:</strong> REG-06 certificate and GSTIN issued to dashboard.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/apply/gst"
                    className="w-full py-3 rounded-full bg-[#0B1E36] hover:bg-[#142C4F] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all"
                  >
                    Start 5-Minute Application
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. REQUIRED DOCUMENTS BY ENTITY */}
      <section className="py-14 md:py-18 bg-slate-50/60 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider">
              Document Checklist
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Documents Required for GST Registration
            </h2>
            <p className="text-sm text-slate-600">
              Select your business constitution to view the exact list of documents needed.
            </p>
          </div>

          {/* Entity Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {Object.keys(entityDocs).map((entity) => (
              <button
                key={entity}
                onClick={() => setSelectedEntity(entity)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.95] cursor-pointer ${
                  selectedEntity === entity
                    ? 'bg-[#0B1E36] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                }`}
              >
                {entity}
              </button>
            ))}
          </div>

          {/* Documents Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <h3 className="font-extrabold text-base text-slate-900">
                Checklist for {selectedEntity}
              </h3>
              <span className="text-xs text-[#0B1E36] font-semibold">
                {entityDocs[selectedEntity].length} Documents Required
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {entityDocs[selectedEntity].map((doc, idx) => (
                <div
                  key={doc}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3 transition-all duration-200 hover:bg-white hover:border-slate-200 hover:shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-[#0B1E36] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-medium text-slate-700 leading-snug">{doc}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Don't have all documents right now? You can start the application and upload them later.
              </span>
              <Link
                to="/apply/gst"
                className="px-6 py-2.5 rounded-full bg-[#0B1E36] hover:bg-[#142C4F] text-white font-bold text-xs shrink-0 shadow-xs transition"
              >
                Begin Application &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GST FAQS */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider">
              Answers & Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
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
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-bold text-slate-900 hover:text-[#0B1E36] transition"
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

      {/* 4. BOTTOM ACTION */}
      <section className="py-12 bg-slate-50/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Ready to secure your GST Number?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Submit your details in 5 minutes. Our team will verify your documents and initiate portal submission today.
          </p>
          <div className="pt-2">
            <Link
              to="/apply/gst"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0B1E36] hover:bg-[#142C4F] text-white font-bold text-sm shadow-md transition"
            >
              Start GST Registration Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
