import React from 'react';
import { ShieldCheck, Award, Users, Sparkles, Building2, Lock } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Breadcrumbs items={[{ label: 'About Us' }]} />
      <div className="py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            About BharatFiling
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Pioneering AI + CA Compliance in India
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We are building India's most trusted corporate compliance and taxation operating system.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Our Core Philosophy</h2>
            <p>
              Starting and running a business in India should not require deciphering thousands of pages of tax statutes or dealing with opaque middlemen. At BharatFiling, we believe that <strong>technology should do the heavy lifting of extraction and validation, while licensed Chartered Accountants and Advocates make the final statutory decisions</strong>.
            </p>
            <p>
              We reject the premise that AI should replace professional accountability. In our system, AI inspects documents, classifies electricity bills, extracts PAN and Aadhaar records, and flags name discrepancies. Every filing is then audited, prepared, and signed off by an experienced CA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <div className="font-bold text-slate-900 text-sm">Security & Privacy</div>
              <p className="text-slate-500 text-xs">
                Bank-grade 256-bit encryption. Identity numbers like PAN and Aadhaar are masked to ensure complete confidentiality.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <Award className="w-6 h-6 text-blue-600" />
              <div className="font-bold text-slate-900 text-sm">Licensed Experts</div>
              <p className="text-slate-500 text-xs">
                Our panel consists of senior Fellows of the Institute of Chartered Accountants of India (ICAI) and Bar Council advocates.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <Sparkles className="w-6 h-6 text-amber-600" />
              <div className="font-bold text-slate-900 text-sm">Master Profile Model</div>
              <p className="text-slate-500 text-xs">
                Verify your customer information once. Never fill the same address or identity details twice across any future compliance service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
