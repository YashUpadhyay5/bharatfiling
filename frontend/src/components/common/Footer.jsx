import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Award, Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Trust Badges Strip */}
      <div className="border-b border-slate-800 py-8 px-4 bg-slate-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">Govt Recognized</div>
              <div className="text-[11px] text-slate-500">Official GST Suvidha & MCA Portal Compatible</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">Human CA Review</div>
              <div className="text-[11px] text-slate-500">Every case certified by licensed Indian CAs</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">256-Bit Bank Grade</div>
              <div className="text-[11px] text-slate-500">Encrypted document vault with auto-masking</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-xs">Transparent Pricing</div>
              <div className="text-[11px] text-slate-500">Zero hidden fees, 100% upfront clarity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
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

          <div className="space-y-2 text-xs pt-2">
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>1800-890-8800 (Mon - Sat, 9:00 AM - 7:00 PM IST)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>compliance@bharatfiling.in</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Bengaluru · Mumbai · New Delhi · Chennai</span>
            </div>
          </div>
        </div>

        {/* Column 1: GST Services */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">GST Services</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/services/gst-registration" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                GST Registration <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1 py-0.2 rounded border border-emerald-800">Live</span>
              </Link>
            </li>
            <li><Link to="/services/gst-return" className="hover:text-emerald-400 transition">GSTR-1 & GSTR-3B Filing</Link></li>
            <li><Link to="/services/gst-return" className="hover:text-emerald-400 transition">GSTR-2B ITC Reconciliation</Link></li>
            <li><Link to="/services/gst-registration" className="hover:text-emerald-400 transition">GST LUT for Exporters</Link></li>
            <li><Link to="/services/gst-registration" className="hover:text-emerald-400 transition">GST Cancellation & Revocation</Link></li>
            <li><Link to="/services/gst-registration" className="hover:text-emerald-400 transition">E-Invoicing & E-Way Bills</Link></li>
          </ul>
        </div>

        {/* Column 2: Business & Legal */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Business & MCA</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/services/company-registration" className="hover:text-emerald-400 transition">Private Limited Company</Link></li>
            <li><Link to="/services/llp-registration" className="hover:text-emerald-400 transition">Limited Liability Partnership</Link></li>
            <li><Link to="/services/company-registration" className="hover:text-emerald-400 transition">One Person Company (OPC)</Link></li>
            <li><Link to="/services/gst-registration" className="hover:text-emerald-400 transition">Proprietorship Registration</Link></li>
            <li><Link to="/services/trademark" className="hover:text-emerald-400 transition">Trademark Registration</Link></li>
            <li><Link to="/services/legal" className="hover:text-emerald-400 transition">MCA Annual ROC Compliance</Link></li>
          </ul>
        </div>

        {/* Column 3: Platform & Trust */}
        <div className="space-y-3">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Trust & Company</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/about" className="hover:text-emerald-400 transition">About BharatFiling</Link></li>
            <li><Link to="/pricing" className="hover:text-emerald-400 transition">Transparent Pricing</Link></li>
            <li><Link to="/faq" className="hover:text-emerald-400 transition">GST FAQs & Knowledge Base</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition">Contact & Support Desk</Link></li>
            <li><Link to="/login" className="hover:text-emerald-400 transition">Customer Login</Link></li>
            <li><Link to="/login" className="hover:text-emerald-400 transition">CA Partner Portal</Link></li>
          </ul>
        </div>
      </div>

      {/* Statutory Disclaimer & Copyright */}
      <div className="border-t border-slate-900 py-6 px-4 bg-slate-950">
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
