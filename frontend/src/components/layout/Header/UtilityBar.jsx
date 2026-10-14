import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ShieldCheck } from 'lucide-react';
import { SUPPORT } from './navigationData.js';

export default function UtilityBar({ trackPath }) {
  const link = 'inline-flex items-center gap-1.5 text-slate-300 transition-colors hover:text-white';
  const divider = <span className="h-3.5 w-px bg-white/15" aria-hidden="true" />;
  return (
    <div className="hidden bg-[#111827] text-slate-300 md:block print:hidden">
      <div className="mx-auto flex h-9 max-w-7xl items-center px-4 text-[12px] sm:px-6 lg:px-8">
        <p className="hidden items-center gap-2 xl:flex">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          <span>Every filing reviewed by licensed Chartered Accountants</span>
        </p>

        <div className="ml-auto flex items-center gap-4">
          <a href={SUPPORT.phoneTel} className={link}>
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-semibold text-white">{SUPPORT.phoneDisplay}</span>
          </a>
          <a href={`mailto:${SUPPORT.email}`} className={`${link} hidden xl:inline-flex`}>
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {SUPPORT.email}
          </a>
          {divider}
          <Link to="/about" className={link}>
            About Us
          </Link>
          <Link to="/contact" className={link}>
            Contact
          </Link>
          <Link to="/faq" className={link}>
            Help Center
          </Link>
          {divider}
          <Link to={trackPath} className={`${link} font-semibold text-white`}>
            Track Application
          </Link>
        </div>
      </div>
    </div>
  );
}
