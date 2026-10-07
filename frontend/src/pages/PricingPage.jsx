import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Breadcrumbs items={[{ label: 'Pricing' }]} />
      <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Fair & Transparent
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Straightforward Pricing with Zero Hidden Costs
          </h1>
          <p className="text-sm text-slate-600">
            We believe in 100% pricing clarity. You always see the professional fee and applicable taxes before paying.
          </p>
        </div>

        {/* GST Registration Featured Plan */}
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border-2 border-emerald-500 shadow-2xl space-y-6 relative">
          <div className="absolute -top-3.5 right-8 bg-emerald-600 text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-md">
            Flagship Live MVP Plan
          </div>

          <div className="space-y-2 border-b border-slate-100 pb-5">
            <h2 className="text-xl font-extrabold text-slate-900">Online GST Registration</h2>
            <p className="text-xs text-slate-500">
              For Proprietorship, Partnership, LLP, and Private Limited Companies across all 36 Indian States & UTs.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span>CA Preparation & Audit Fee</span>
              <span className="font-bold text-slate-900">₹1,499</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>GST on Services (18%)</span>
              <span className="font-bold text-slate-900">₹270</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span>Government Portal Fee</span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">₹0 (FREE)</span>
            </div>
            <div className="border-t border-slate-200 pt-3 flex items-center justify-between text-sm font-black text-slate-900">
              <span>Total All-Inclusive Payable</span>
              <span className="text-2xl text-emerald-700">₹1,769</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 text-xs text-slate-700 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Full Form REG-01 Preparation by CA Desk</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>AI Document OCR & Name Mismatch Validation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Dedicated Chartered Accountant (FCA) Oversight</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Government Notice / Clarification (REG-03) Reply</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Final Form REG-06 Certificate & Allotted GSTIN</span>
            </div>
          </div>

          <Link
            to="/apply/gst"
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition"
          >
            Start GST Registration Now &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
