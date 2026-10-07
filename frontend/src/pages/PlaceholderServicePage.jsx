import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import AuthRequiredModal from '../components/common/AuthRequiredModal.jsx';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

const serviceMeta = {
  '/services/gst-return': {
    title: 'GST Return Filing (GSTR-1 & 3B)',
    category: 'GST Compliance',
    desc: 'Automated 2B Input Tax Credit reconciliation and error-free monthly return filing by certified CAs.',
    features: ['Instant 2B ITC mismatch detection', 'E-Way bill & E-Invoice integration', 'Zero penalty filing guarantee'],
  },
  '/services/income-tax': {
    title: 'Income Tax & Corporate ITR Filing',
    category: 'Direct Taxation',
    desc: 'Business tax returns (ITR-3, ITR-4, ITR-6) with comprehensive computation and scrutiny prevention.',
    features: ['Presumptive taxation (44AD/44ADA)', 'Balance sheet & P&L review by CA', 'TDS credit (26AS & AIS) reconciliation'],
  },
  '/services/company-registration': {
    title: 'Private Limited Company Incorporation',
    category: 'Corporate Affairs (MCA)',
    desc: 'Fast-track company formation on MCA SPICe+ portal with digital signatures and incorporation certificate.',
    features: ['RUN Name approval & reservation', 'Certificate of Incorporation with CIN', 'PAN, TAN & Corporate Bank Account'],
  },
  '/services/llp-registration': {
    title: 'Limited Liability Partnership (LLP)',
    category: 'Corporate Affairs (MCA)',
    desc: 'Setup an LLP with limited liability protection and lower compliance burden than a private company.',
    features: ['DPIN & Digital Signature setup', 'Custom LLP Agreement drafting', 'Registered office compliance'],
  },
  '/services/trademark': {
    title: 'Trademark Registration & Protection',
    category: 'Intellectual Property (IPR)',
    desc: 'Protect your brand, logo, and slogan across 45 trademark classes with licensed IP attorneys.',
    features: ['Comprehensive IP India search report', 'Filing under correct Nice class', 'Objection reply by Advocate'],
  },
  '/services/legal': {
    title: 'Corporate Legal Services & Advisory',
    category: 'Legal & Contracts',
    desc: 'Draft founder agreements, employment contracts, NDAs, and consult corporate advocates.',
    features: ['Custom drafted legal contracts', 'Advocate phone consultation', 'Statutory compliance audit'],
  },
};

export default function PlaceholderServicePage() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { showSuccess } = useToast();
  const [email, setEmail] = useState('');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const meta = serviceMeta[location.pathname] || {
    title: 'Business Compliance Service',
    category: 'Corporate Services',
    desc: 'Professional compliance service managed by certified Chartered Accountants.',
    features: ['Statutory verification', 'Direct government portal filing', 'Dedicated CA assistance'],
  };

  const handleNotifyMe = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return;
    }
    if (email) {
      showSuccess(`Thank you! We have assigned a Chartered Accountant to contact ${email}.`);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: meta.title }]} />
      <div className="flex-1 py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {meta.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{meta.title}</h1>
          </div>
          <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-700" /> Active CA Desk
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {meta.desc} Our certified Chartered Accountants and Corporate Advocates handle end-to-end filings, statutory audits, and legal documentation tailored for your business.
        </p>

        {/* Features Preview */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="font-bold text-xs text-slate-900 uppercase tracking-wider">What is included in this service:</div>
          <div className="space-y-2 text-xs text-slate-700">
            {meta.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notification / Callback Capture */}
        <form onSubmit={handleNotifyMe} className="space-y-3">
          <div className="text-xs font-bold text-slate-800">Request an immediate proposal or CA consultation callback:</div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your business email address"
              className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#111827] focus:outline-hidden"
              required
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#111827] hover:bg-[#1F2937] text-white font-bold text-xs transition"
            >
              Request CA Callback
            </button>
          </div>
        </form>

        {/* Immediate Assistance */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Need immediate advice on this service? Connect directly with our Chartered Accountants.
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/919876543210?text=Hi%20BharatFiling%20Team%2C%20I%20need%20assistance%20with%20this%20service."
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Chat on WhatsApp &rarr;
            </a>
            <Link
              to="/contact"
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition"
            >
              Contact CA Desk
            </Link>
          </div>
        </div>
      </div>
      </div>

      {/* Authentication Required Modal */}
      <AuthRequiredModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        service={{
          title: meta.title,
          category: meta.category,
          path: location.pathname,
          price: 'Transparent Pricing',
          period: 'CA Audited Filing',
        }}
        onSuccess={() => {
          setAuthModalOpen(false);
          showSuccess(`Welcome! A dedicated Chartered Accountant has been assigned to your ${meta.title} request.`);
        }}
      />
    </div>
  );
}
