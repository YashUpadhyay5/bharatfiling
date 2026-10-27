import React from 'react';
import { SUPPORT } from '../../../config/support.js';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Award, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm pb-[env(safe-area-inset-bottom)]">
      {/* Trust Badges Strip */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8 bg-slate-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-left">
          <div className="flex items-center gap-3.5 justify-start">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">Govt Recognized</div>
              <div className="text-[11px] text-slate-500">Official GST Suvidha & MCA Portal Compatible</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-start">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">Human CA Review</div>
              <div className="text-[11px] text-slate-500">Every case certified by licensed Indian CAs</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-start">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">Secure Document Vault</div>
              <div className="text-[11px] text-slate-500">Encrypted in transit and stored privately</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-start">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">Transparent Pricing</div>
              <div className="text-[11px] text-slate-500">Zero hidden fees, 100% upfront clarity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/bharatfiling-icon-transparent.png"
              alt="BharatFiling"
              className="h-9 w-auto object-contain bg-white/10 rounded-lg p-0.5"
            />
            <span className="font-extrabold text-xl text-white tracking-tight">
              Bharat<span className="text-[#F26522]">Filing</span>
            </span>
          </Link>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            BharatFiling is India’s next-generation business compliance operating system. We combine state-of-the-art AI document validation with experienced Chartered Accountants and Advocates to deliver frictionless tax, licensing, and corporate legal services.
          </p>

          <div className="space-y-2.5 text-xs pt-2">
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{SUPPORT.phoneDisplay} ({SUPPORT.hours})</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{SUPPORT.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Bengaluru · Mumbai · New Delhi · Chennai</span>
            </div>
          </div>
        </div>

        {/* Column 1: Taxation & GST */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Taxation & GST</h4>
          <ul className="space-y-1 text-xs">
            <li><Link to="/services/income-tax" className="hover:text-emerald-400 transition py-1 inline-block">Income Tax Return (ITR)</Link></li>
            <li><Link to="/services/income-tax" className="hover:text-emerald-400 transition py-1 inline-block">Corporate Tax Audit (44AB)</Link></li>
            <li><Link to="/services/gst-registration" className="hover:text-emerald-400 transition py-1 inline-block">GST Registration Online</Link></li>
            <li><Link to="/services/gst-return" className="hover:text-emerald-400 transition py-1 inline-block">GSTR-1 & GSTR-3B Filings</Link></li>
            <li><Link to="/services/gstr-2b-itc-reconciliation" className="hover:text-emerald-400 transition py-1 inline-block">GSTR-2B ITC Reconciliation</Link></li>
            <li><Link to="/services/income-tax" className="hover:text-emerald-400 transition py-1 inline-block">TDS & TCS Quarterly Returns</Link></li>
          </ul>
        </div>

        {/* Column 2: CA & Corporate Advisory */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">CA & Secretarial</h4>
          <ul className="space-y-1 text-xs">
            <li><Link to="/services/company-registration" className="hover:text-emerald-400 transition py-1 inline-block">Private Limited Company</Link></li>
            <li><Link to="/services/llp-registration" className="hover:text-emerald-400 transition py-1 inline-block">Limited Liability Partnership</Link></li>
            <li><Link to="/services/legal" className="hover:text-emerald-400 transition py-1 inline-block">Virtual CFO & Bookkeeping</Link></li>
            <li><Link to="/services/legal" className="hover:text-emerald-400 transition py-1 inline-block">MCA Annual ROC Compliance</Link></li>
            <li><Link to="/services/trademark" className="hover:text-emerald-400 transition py-1 inline-block">Trademark Registration & IP</Link></li>
            <li><Link to="/services/legal" className="hover:text-emerald-400 transition py-1 inline-block">Director KYC & Resolutions</Link></li>
          </ul>
        </div>

        {/* Column 3: Platform & Trust */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Trust & Company</h4>
          <ul className="space-y-1 text-xs">
            <li><Link to="/about" className="hover:text-emerald-400 transition py-1 inline-block">About BharatFiling</Link></li>
            <li><Link to="/pricing" className="hover:text-emerald-400 transition py-1 inline-block">Transparent Pricing</Link></li>
            <li><Link to="/faq" className="hover:text-emerald-400 transition py-1 inline-block">CA & Compliance FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition py-1 inline-block">Contact & Support Desk</Link></li>
            <li><Link to="/login" className="hover:text-emerald-400 transition py-1 inline-block">Customer Login</Link></li>
            <li><Link to="/login" className="hover:text-emerald-400 transition py-1 inline-block">CA Partner Portal</Link></li>
          </ul>
        </div>
      </div>

      {/* Statutory Disclaimer & Copyright */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 text-center md:text-left">
          <p>
            Disclaimer: BharatFiling is a technology platform that connects businesses with independent certified professionals (Chartered Accountants, Company Secretaries, and Advocates). BharatFiling is not a Chartered Accountancy firm or law firm and does not provide legal representation.
          </p>
          <div className="shrink-0">
            &copy; {new Date().getFullYear()} BharatFiling Technologies Pvt Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
