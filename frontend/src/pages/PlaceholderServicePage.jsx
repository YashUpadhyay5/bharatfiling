import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import AuthRequiredModal from '../components/common/AuthRequiredModal.jsx';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileCheck2,
  HelpCircle,
  PhoneCall,
  MessageCircle,
  FileText,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

const serviceDatabase = {
  '/services/gst-return': {
    title: 'GST Return Filing (GSTR-1 & GSTR-3B)',
    category: 'GST Compliance',
    authority: 'CBIC / GST Common Portal',
    desc: 'Timely and accurate monthly and quarterly GST return filing with automated GSTR-2B Input Tax Credit (ITC) reconciliation and scrutiny prevention by certified Chartered Accountants.',
    price: '₹999 / filing',
    turnaround: '1–2 Working Days',
    benefits: [
      'Comprehensive 2B vs Purchase Register ITC reconciliation to prevent credit loss.',
      'Validation of outgoing tax liability to avoid late fees and interest under Section 50.',
      'E-Way bill and E-Invoice matching for cross-verification.',
      'Preparation and filing of GSTR-1, GSTR-3B, and GSTR-9 annual returns.',
    ],
    documents: [
      'Sales Invoices & Credit Notes summary for the tax period.',
      'Purchase Register / Bills from registered GST suppliers.',
      'Bank Statement showing tax payment receipts (Challans).',
      'Existing GST Portal Login credentials or Authorised Signatory OTP.',
    ],
    steps: [
      { num: '1', title: 'Data Upload', desc: 'Upload sales ledgers and purchase invoices to your encrypted dashboard.' },
      { num: '2', title: 'CA Reconciliation', desc: 'Our Chartered Accountant computes net tax payable and maximizes eligible 2B ITC.' },
      { num: '3', title: 'Challan & Filing', desc: 'Verify tax summary, approve tax payment, and receive filing acknowledgment (ARN).' },
    ],
    faqs: [
      { q: 'What is the due date for GSTR-1 and GSTR-3B?', a: 'GSTR-1 is due on the 11th of the succeeding month for monthly filers (or 13th for QRMP scheme). GSTR-3B is due between the 20th and 24th depending on business category and state.' },
      { q: 'Can I claim ITC if the supplier has not uploaded the invoice?', a: 'Under Rule 36(4), ITC can only be availed if the tax invoice appears in your auto-generated GSTR-2B statement. Our CA reconciles this before filing.' },
      { q: 'What is the penalty for late filing of GST returns?', a: 'Late fees are ₹50 per day (₹20 per day for NIL returns) subject to statutory caps, plus 18% annual interest on delayed tax liabilities.' },
    ],
  },
  '/services/income-tax': {
    title: 'Income Tax Return (ITR) Filing & Tax Advisory',
    category: 'Direct Taxation',
    authority: 'Income Tax Department (CBDT)',
    desc: 'Expert preparation and filing of individual, business, and corporate tax returns (ITR-1 through ITR-6) with AIS, TIS, and 26AS credit reconciliation to ensure total compliance.',
    price: 'From ₹999 + GST',
    turnaround: '2–3 Working Days',
    benefits: [
      'Cross-verification against Annual Information Statement (AIS) and Form 26AS.',
      'Optimization of deductions under Chapter VI-A (80C, 80D, 80G, etc.).',
      'Accurate capital gains computation for equity, mutual funds, and real estate.',
      'Presumptive taxation advisory under Section 44AD and 44ADA for professionals.',
    ],
    documents: [
      'PAN Card & Aadhaar Card of the taxpayer.',
      'Form 16 (for salaried individuals) or Profit & Loss Statement (for business).',
      'Bank Statements for all active bank accounts for the financial year.',
      'Capital Gains statements from stock brokers or registrar platforms.',
    ],
    steps: [
      { num: '1', title: 'Submit Documents', desc: 'Share your Form 16, bank statements, or business books securely.' },
      { num: '2', title: 'CA Computation', desc: 'A dedicated Chartered Accountant computes total income, tax credits, and deductions.' },
      { num: '3', title: 'E-Filing & Verification', desc: 'Filing on the Income Tax e-Portal with generation of ITR-V acknowledgment.' },
    ],
    faqs: [
      { q: 'Who is required to file an Income Tax Return?', a: 'Individuals with gross total income exceeding basic exemption limits (₹2.5L to ₹3L depending on regime), and all corporate entities/firms regardless of profit or loss.' },
      { q: 'Can I switch between the Old and New Tax Regimes?', a: 'Yes. Salaried individuals can choose every year. Business taxpayers can switch once during the lifetime under specified statutory conditions.' },
      { q: 'How can I track my Income Tax Refund status?', a: 'Once your return is processed by CPC Bengaluru, refund status can be tracked in real-time through your BharatFiling dashboard.' },
    ],
  },
  '/services/company-registration': {
    title: 'Private Limited Company Incorporation',
    category: 'Corporate Affairs (MCA)',
    authority: 'Ministry of Corporate Affairs (MCA)',
    desc: 'End-to-end company incorporation on the MCA SPICe+ portal, including RUN name reservation, DIN allotment, Digital Signature Certificates (DSC), and Certificate of Incorporation (COI).',
    price: '₹4,999 + Govt Fees',
    turnaround: '5–9 Working Days',
    benefits: [
      'Creation of an independent legal entity with limited liability protection.',
      'Issuance of Certificate of Incorporation with Corporate Identity Number (CIN).',
      'Allotment of Company PAN, TAN, EPFO, ESIC, and Professional Tax registrations.',
      'Zero-balance Current Bank Account opening assistance with partner banks.',
    ],
    documents: [
      'PAN Card and Aadhaar Card of all proposed Directors and Shareholders.',
      'Proof of identity: Passport, Voter ID, or Driving License.',
      'Proof of registered office address: Electricity Bill (< 2 months old) + Landlord NOC.',
      'Passport size photographs and mobile/email credentials of directors.',
    ],
    steps: [
      { num: '1', title: 'Name Approval (RUN)', desc: 'Submit 2 unique company names to the Registrar of Companies for clearance.' },
      { num: '2', title: 'SPICe+ Document Filing', desc: 'Our CA prepares MOA, AOA, declarations, and executes Class 3 Digital Signatures.' },
      { num: '3', title: 'Certificate Issuance', desc: 'MCA issues the official Certificate of Incorporation (COI) and statutory PAN/TAN.' },
    ],
    faqs: [
      { q: 'How many people are required to start a Private Limited Company?', a: 'A minimum of 2 directors and 2 shareholders (who can be the same individuals). A maximum of 200 shareholders is permitted.' },
      { q: 'What is the minimum capital required to incorporate?', a: 'There is no minimum paid-up capital requirement under the Companies Act, 2013. You can incorporate with ₹10,000 or any amount.' },
      { q: 'Can a residential address be used as the registered office?', a: 'Yes. A residential premises can be registered as the corporate registered office provided an electricity bill and owner NOC are submitted.' },
    ],
  },
  '/services/llp-registration': {
    title: 'Limited Liability Partnership (LLP) Registration',
    category: 'Corporate Affairs (MCA)',
    authority: 'Ministry of Corporate Affairs (MCA)',
    desc: 'Register a Limited Liability Partnership combining the flexibility of a traditional partnership with limited liability protection and lower statutory compliance burdens than a private company.',
    price: '₹3,999 + MCA Fees',
    turnaround: '6–10 Working Days',
    benefits: [
      'Protection of personal assets—partners are not liable for another partner’s misconduct.',
      'No mandatory statutory audit unless turnover exceeds ₹40 Lakhs or contribution exceeds ₹25 Lakhs.',
      'Simpler ownership transfers and structural modifications through LLP agreements.',
      'Separate legal identity with perpetual succession.',
    ],
    documents: [
      'PAN Card and Aadhaar Card of all Designated Partners.',
      'Address proof: Bank Statement or Utility Bill of all partners.',
      'Registered Office Proof: Electricity bill + Landlord No Objection Certificate.',
      'Class 3 Digital Signature Certificate (DSC) for designated partners.',
    ],
    steps: [
      { num: '1', title: 'Name Reservation (RUN-LLP)', desc: 'Reserve firm name with the Ministry of Corporate Affairs.' },
      { num: '2', title: 'FiLLiP Form Filing', desc: 'Submit incorporation application with Partner Identification Numbers (DPIN).' },
      { num: '3', title: 'LLP Agreement Execution', desc: 'Draft and file statutory LLP Agreement (Form 3) with the ROC within 30 days.' },
    ],
    faqs: [
      { q: 'What is the difference between an LLP and a General Partnership?', a: 'An LLP has limited liability and is registered with the MCA as a separate corporate entity. In a general partnership, partners have unlimited personal liability.' },
      { q: 'Is statutory audit mandatory every year for an LLP?', a: 'Audit is mandatory only if annual turnover exceeds ₹40 Lakhs or partner capital contributions exceed ₹25 Lakhs.' },
      { q: 'Can an existing partnership firm be converted into an LLP?', a: 'Yes, an unregistered or registered partnership firm can be converted into an LLP under the Second Schedule of the LLP Act.' },
    ],
  },
  '/services/trademark': {
    title: 'Trademark Registration & Brand Protection',
    category: 'Intellectual Property (IPR)',
    authority: 'Controller General of Patents, Designs and Trademarks',
    desc: 'Protect your brand identity, business name, logo, or slogan nationwide. Complete trademark search, Nice class classification, Form TM-A drafting, and representation by registered IP attorneys.',
    price: '₹1,999 + Govt Fees',
    turnaround: 'Instant Filing (24h TM Number)',
    benefits: [
      'Exclusive nationwide legal ownership over your brand name and logo.',
      'Instant authorization to use the ™ symbol upon application submission.',
      'Legal power to stop competitors and counterfeiters from copying your brand.',
      'Creates a valuable intangible asset that can be franchised or licensed.',
    ],
    documents: [
      'Identity and address proof of the applicant (PAN/Aadhaar/COI).',
      'High-resolution image of the Logo or Brand Name mark.',
      'MSME/Udyam Certificate (if available, gives 50% discount on government fee).',
      'Power of Attorney authorizing our Trademark Attorney to represent your case.',
    ],
    steps: [
      { num: '1', title: 'Brand Search & Class Check', desc: 'Comprehensive phonetic and visual search across 45 Nice classes for conflicts.' },
      { num: '2', title: 'Form TM-A Filing', desc: 'Attorney drafts application and submits on the IP India portal within 24 hours.' },
      { num: '3', title: 'TM Allotment & Tracking', desc: 'Receive instant Application Number and track through examination to registration.' },
    ],
    faqs: [
      { q: 'How long does it take to obtain the ® (Registered) symbol?', a: 'While the ™ symbol can be used immediately upon filing, final registration with the ® symbol typically takes 6 to 12 months following examination and publication.' },
      { q: 'What is the government fee for Trademark registration?', a: 'The government fee is ₹4,500 for Individuals, Startups, and MSMEs (with Udyam certificate), and ₹9,000 for standard enterprises.' },
      { q: 'How long does trademark protection remain valid?', a: 'A registered trademark is valid for 10 years from the date of application and can be renewed indefinitely every 10 years.' },
    ],
  },
  '/services/legal': {
    title: 'Corporate Legal Agreements & Secretarial Advisory',
    category: 'Legal & Contracts',
    authority: 'Independent Corporate Legal Desk',
    desc: 'Draft and review watertight commercial agreements, employment contracts, co-founder deeds, NDAs, and statutory corporate secretarial documentation prepared by corporate advocates.',
    price: 'Transparent Fixed Pricing',
    turnaround: '2–3 Working Days',
    benefits: [
      'Tailored legal contracts compliant with the Indian Contract Act, 1872.',
      'Risk mitigation and dispute resolution clauses tailored to Indian courts.',
      'Direct consultation with experienced Corporate Lawyers and Advocates.',
      'Digital execution and e-stamping assistance across all Indian states.',
    ],
    documents: [
      'Business entity registration details and PAN.',
      'Commercial terms, scope of work, and key deliverables summary.',
      'Details of counter-party or contracting entity.',
      'Existing draft contracts or previous versions (if applicable).',
    ],
    steps: [
      { num: '1', title: 'Requirement Scope', desc: 'Share your business transaction specifics and key protective clauses needed.' },
      { num: '2', title: 'Advocate Drafting', desc: 'Our corporate legal team drafts the bespoke legal agreement within 48 hours.' },
      { num: '3', title: 'Review & Execution', desc: 'One-on-one review call to finalize modifications and provide execution-ready files.' },
    ],
    faqs: [
      { q: 'Are digital contracts legally valid in Indian courts?', a: 'Yes. Contracts executed digitally with valid consent and electronic signatures are recognized under the Information Technology Act, 2000.' },
      { q: 'Why is a Founder Agreement critical for startups?', a: 'It defines equity distribution, vesting schedules, roles, intellectual property transfer, and exit protocols, preventing future partner deadlock.' },
      { q: 'Do you assist with non-disclosure agreements (NDAs)?', a: 'Yes. We prepare standard unilateral and mutual NDAs to protect proprietary trade secrets before investor or vendor negotiations.' },
    ],
  },
};

export default function PlaceholderServicePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { showSuccess } = useToast();
  const [email, setEmail] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const data = serviceDatabase[location.pathname] || {
    title: 'Statutory Business Compliance Service',
    category: 'Corporate Compliance',
    authority: 'Government of India Regulatory Portals',
    desc: 'Comprehensive compliance and advisory service managed by certified Chartered Accountants, Company Secretaries, and Corporate Advocates.',
    price: 'Transparent Fixed Pricing',
    turnaround: '3–5 Working Days',
    benefits: [
      'Direct government portal submission and tracking.',
      'Pre-verification of statutory documents to eliminate defects.',
      'Dedicated compliance officer assigned to your case.',
      'Ongoing regulatory deadline alerts in your client dashboard.',
    ],
    documents: [
      'Identity Proof: PAN Card and Aadhaar Card.',
      'Business Address Proof: Electricity Bill or Lease Deed.',
      'Bank Statement or Cancelled Cheque.',
    ],
    steps: [
      { num: '1', title: 'Submit Application', desc: 'Provide necessary information and upload identity documents.' },
      { num: '2', title: 'Professional Audit', desc: 'Our CA prepares statutory forms and checks all details.' },
      { num: '3', title: 'Government Issuance', desc: 'Receive filing acknowledgment and official certificates.' },
    ],
    faqs: [
      { q: 'How does BharatFiling process this application?', a: 'Our platform pairs your application with a qualified Chartered Accountant who manages the entire government portal workflow.' },
      { q: 'What happens if a clarification is required by the department?', a: 'Our CA prepares and files formal legal replies to departmental notices as part of our service.' },
    ],
  };

  const handleStartFiling = () => {
    if (isAuthenticated) {
      navigate('/apply/gst');
    } else {
      setAuthModalOpen(true);
    }
  };

  const handleCallbackRequest = (e) => {
    e.preventDefault();
    if (email) {
      showSuccess(`Thank you! A Chartered Accountant has been notified and will contact ${email}.`);
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: data.title }]} />

      {/* 1. HERO HEADER */}
      <section className="py-10 sm:py-14 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Service Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#155EEF] bg-[#EFF8FF] px-2.5 py-0.5 rounded border border-[#D1E9FF]">
                  {data.category}
                </span>
                <span className="text-xs font-medium text-[#667085] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#027A48]" />
                  {data.authority}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252B36] tracking-tight">
                {data.title}
              </h1>

              <p className="text-sm sm:text-base text-[#667085] leading-relaxed max-w-3xl">
                {data.desc}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleStartFiling}
                  className="px-6 py-3 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-sm shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  Apply Online Now
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="https://wa.me/9118008908800"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-lg bg-white hover:bg-[#F8F9FB] text-[#252B36] font-semibold text-sm border border-[#E5E7EB] transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#027A48]" />
                  Talk to CA on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column: Pricing & Turnaround Summary Card */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-xl border border-[#E5E7EB] bg-[#F8F9FB] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <span className="text-xs font-medium text-[#667085]">Professional Fee</span>
                  <span className="text-xl font-bold text-[#252B36]">{data.price}</span>
                </div>

                <div className="space-y-2 text-xs text-[#667085]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#155EEF]" /> Estimated Turnaround:
                    </span>
                    <span className="font-semibold text-[#252B36]">{data.turnaround}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#027A48]" /> Professional Desk:
                    </span>
                    <span className="font-semibold text-[#252B36]">Chartered Accountant</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-[#155EEF]" /> Filing Mode:
                    </span>
                    <span className="font-semibold text-[#252B36]">100% Digital & Paperless</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleStartFiling}
                    className="w-full py-2.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer text-center"
                  >
                    Start 3-Screen Filing
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BENEFITS & SCOPE */}
      <section className="py-12 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 space-y-1">
            <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">Scope of Work</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#252B36]">Key Benefits & Inclusions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.benefits.map((b, i) => (
              <div key={i} className="p-4 rounded-lg border border-[#E5E7EB] bg-[#F8F9FB] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#027A48] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#252B36] leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. REQUIRED DOCUMENTS & WORKFLOW */}
      <section className="py-12 bg-[#F8F9FB] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Required Documents */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">Checklist</span>
                <h3 className="text-lg sm:text-xl font-bold text-[#252B36]">Required Documents</h3>
              </div>
              <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white space-y-3">
                {data.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#252B36] pb-2 border-b border-[#F1F3F5] last:border-b-0 last:pb-0">
                    <FileText className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filing Workflow */}
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">Timeline</span>
                <h3 className="text-lg sm:text-xl font-bold text-[#252B36]">Step-by-Step Filing Process</h3>
              </div>
              <div className="space-y-3">
                {data.steps.map((st) => (
                  <div key={st.num} className="p-4 rounded-xl border border-[#E5E7EB] bg-white flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-lg bg-[#EFF8FF] text-[#155EEF] font-bold text-xs flex items-center justify-center shrink-0 border border-[#D1E9FF]">
                      {st.num}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-[#252B36]">{st.title}</div>
                      <div className="text-xs text-[#667085] mt-0.5 leading-relaxed">{st.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SERVICE FAQS */}
      <section className="py-12 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 space-y-1">
            <span className="text-xs font-bold text-[#155EEF] uppercase tracking-wider">Help & Answers</span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#252B36]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-2.5">
            {data.faqs.map((f, idx) => (
              <div key={f.q} className="rounded-lg border border-[#E5E7EB] bg-[#F8F9FB] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-[#252B36] hover:text-[#155EEF] transition-colors cursor-pointer"
                >
                  <span>{f.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#667085] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#667085] shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-[#667085] leading-relaxed border-t border-[#E5E7EB] pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CA CALLBACK CAPTURE */}
      <section className="py-12 bg-[#F8F9FB]">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-[#252B36]">
            Have Specific Queries About This Filing?
          </h3>
          <p className="text-xs text-[#667085]">
            Share your email address to request a detailed compliance checklist or consultation callback.
          </p>
          <form onSubmit={handleCallbackRequest} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-3.5 py-2.5 text-xs rounded-lg border border-[#E5E7EB] bg-white focus:outline-none focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF]"
              required
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Request Callback
            </button>
          </form>
        </div>
      </section>

      {/* Authentication Required Modal */}
      <AuthRequiredModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        service={{
          title: data.title,
          category: data.category,
          path: location.pathname,
          price: data.price,
          period: 'CA Audited Filing',
        }}
        onSuccess={() => {
          setAuthModalOpen(false);
          showSuccess(`Welcome! Proceeding with your ${data.title} application.`);
          navigate('/apply/gst');
        }}
      />
    </div>
  );
}
