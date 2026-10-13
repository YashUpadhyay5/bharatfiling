import React from 'react';
import { ShieldCheck, Award, Users, Building2, Lock } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs.jsx';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Breadcrumbs items={[{ label: 'About Us' }]} />
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#155EEF] bg-[#EFF8FF] px-2.5 py-0.5 rounded border border-[#D1E9FF]">
            About BharatFiling
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#252B36] tracking-tight">
            Technology-Driven Corporate & Taxation Platform
          </h1>
          <p className="text-sm text-[#667085] max-w-2xl mx-auto leading-relaxed">
            Building India’s trusted corporate compliance, taxation, and business registration operating system.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 sm:p-10 border border-[#E5E7EB] shadow-xs space-y-8 text-xs sm:text-sm text-[#252B36] leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#252B36]">Our Operating Philosophy</h2>
            <p className="text-[#667085]">
              Starting and managing a business in India should not require deciphering complex legal terminology or relying on unverified middlemen. At BharatFiling, we combine smart document technology with qualified human professionals to make statutory compliance seamless and completely transparent.
            </p>
            <p className="text-[#667085]">
              We believe in professional accountability. Our intelligent systems assist with document verification and data formatting, while licensed Chartered Accountants and Corporate Advocates prepare, review, and certify every statutory application.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-[#E5E7EB]">
            <div className="p-4 rounded-lg bg-[#F8F9FB] border border-[#E5E7EB] space-y-2">
              <ShieldCheck className="w-5 h-5 text-[#155EEF]" />
              <div className="font-bold text-[#252B36] text-sm">Security & Privacy</div>
              <p className="text-[#667085] text-xs leading-relaxed">
                Bank-grade 256-bit encryption. Strict confidentiality policies and encrypted storage for all business identification records.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#F8F9FB] border border-[#E5E7EB] space-y-2">
              <Award className="w-5 h-5 text-[#155EEF]" />
              <div className="font-bold text-[#252B36] text-sm">Qualified Professionals</div>
              <p className="text-[#667085] text-xs leading-relaxed">
                All filings are audited and submitted by verified members of the Institute of Chartered Accountants of India (ICAI).
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#F8F9FB] border border-[#E5E7EB] space-y-2">
              <Building2 className="w-5 h-5 text-[#155EEF]" />
              <div className="font-bold text-[#252B36] text-sm">Master Profile Vault</div>
              <p className="text-[#667085] text-xs leading-relaxed">
                Verify your customer details once. Never enter duplicate business address or identity details for future filings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
