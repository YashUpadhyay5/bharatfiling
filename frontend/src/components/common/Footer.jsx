import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Award, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#181D27] text-[#98A2B3] border-t border-[#2E3646] text-sm font-sans">
      {/* 1. Corporate Trust Badges Strip */}
      <div className="border-b border-[#2E3646] py-7 px-4 bg-[#14171F]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2 rounded-lg bg-[#155EEF]/10 text-[#53B1FD] border border-[#155EEF]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs">Govt Portal Compatible</div>
              <div className="text-[11px] text-[#667085]">Direct MCA & GST Portal Integration</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2 rounded-lg bg-[#155EEF]/10 text-[#53B1FD] border border-[#155EEF]/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs">Human CA Review</div>
              <div className="text-[11px] text-[#667085]">Every filing verified by licensed Indian CAs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2 rounded-lg bg-[#155EEF]/10 text-[#53B1FD] border border-[#155EEF]/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs">256-Bit SSL Vault</div>
              <div className="text-[11px] text-[#667085]">Bank-grade encrypted document security</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2 rounded-lg bg-[#155EEF]/10 text-[#53B1FD] border border-[#155EEF]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-semibold text-xs">Transparent Pricing</div>
              <div className="text-[11px] text-[#667085]">Clear government fees with zero hidden costs</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-3.5">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#155EEF]/20 border border-[#155EEF]/40">
              <ShieldCheck className="w-4 h-4 text-[#53B1FD]" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Bharat<span className="text-[#53B1FD]">Filing</span>
            </span>
          </Link>

          <p className="text-xs text-[#98A2B3] leading-relaxed max-w-sm">
            BharatFiling is an online technology and business compliance platform helping entrepreneurs incorporate companies, register for GST, obtain MSME certificates, and maintain statutory filings across India.
          </p>

          <div className="space-y-1.5 text-xs pt-1">
            <div className="flex items-center gap-2 text-[#CECFD2]">
              <Phone className="w-3.5 h-3.5 text-[#53B1FD] shrink-0" />
              <span>1800-890-8800 (Mon - Sat, 9:00 AM - 7:00 PM IST)</span>
            </div>
            <div className="flex items-center gap-2 text-[#CECFD2]">
              <Mail className="w-3.5 h-3.5 text-[#53B1FD] shrink-0" />
              <span>compliance@bharatfiling.org</span>
            </div>
            <div className="flex items-center gap-2 text-[#CECFD2]">
              <MapPin className="w-3.5 h-3.5 text-[#53B1FD] shrink-0" />
              <span>New Delhi · Mumbai · Bengaluru · Chennai</span>
            </div>
          </div>
        </div>

        {/* Column 1: GST & Taxation */}
        <div className="space-y-2.5">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Taxation & GST</h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link to="/services/gst-registration" className="hover:text-white transition-colors">GST Registration</Link></li>
            <li><Link to="/services/gst-return" className="hover:text-white transition-colors">GSTR-1 & 3B Filing</Link></li>
            <li><Link to="/services/gst-return" className="hover:text-white transition-colors">GSTR-9 Annual Return</Link></li>
            <li><Link to="/services/income-tax" className="hover:text-white transition-colors">Income Tax Return (ITR)</Link></li>
            <li><Link to="/services/income-tax" className="hover:text-white transition-colors">TDS Return Filing</Link></li>
            <li><Link to="/services/income-tax" className="hover:text-white transition-colors">Tax Scrutiny Advisory</Link></li>
          </ul>
        </div>

        {/* Column 2: Incorporation & Registrations */}
        <div className="space-y-2.5">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Registrations</h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link to="/services/company-registration" className="hover:text-white transition-colors">Private Limited Company</Link></li>
            <li><Link to="/services/llp-registration" className="hover:text-white transition-colors">LLP Registration</Link></li>
            <li><Link to="/services/udyam-registration" className="hover:text-white transition-colors">Udyam / MSME Registration</Link></li>
            <li><Link to="/services/trademark" className="hover:text-white transition-colors">Trademark Registration</Link></li>
            <li><Link to="/services/company-registration" className="hover:text-white transition-colors">One Person Company</Link></li>
            <li><Link to="/services/company-registration" className="hover:text-white transition-colors">Section 8 NGO Company</Link></li>
          </ul>
        </div>

        {/* Column 3: Platform & Company */}
        <div className="space-y-2.5">
          <h4 className="text-white text-xs font-bold uppercase tracking-wider">Platform & Legal</h4>
          <ul className="space-y-1.5 text-xs">
            <li><Link to="/about" className="hover:text-white transition-colors">About BharatFiling</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Structure</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">Compliance FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Customer Portal</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">CA Workbench</Link></li>
          </ul>
        </div>
      </div>

      {/* 3. Statutory Regulatory Disclaimer */}
      <div className="border-t border-[#2E3646] py-5 px-4 bg-[#14171F]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#667085] text-center md:text-left">
          <p className="max-w-3xl leading-relaxed">
            Statutory Notice: BharatFiling is an independent corporate and technology platform. It is not affiliated with the Ministry of Corporate Affairs (MCA), the Goods and Services Tax Network (GSTN), the Central Board of Direct Taxes (CBDT), or any statutory regulatory body. All statutory filings are prepared and reviewed by licensed independent professionals.
          </p>
          <div className="shrink-0 text-xs">
            &copy; {new Date().getFullYear()} BharatFiling. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
