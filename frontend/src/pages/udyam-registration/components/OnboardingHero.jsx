import React from 'react';
import { User, FileText, Monitor, Settings, ShieldCheck } from 'lucide-react';

export default function OnboardingHero() {
  const highlights = [
    { icon: User, label: 'Official MSME Business Recognition' },
    { icon: FileText, label: 'Access Government Schemes & Subsidies' },
    { icon: Monitor, label: 'Supports Tenders & Business Growth' },
    { icon: Settings, label: 'Fast Online Registration Support' },
    { icon: ShieldCheck, label: 'Priority Bank Lending & Subsidies' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Pill */}
      <div className="flex justify-center sm:justify-start">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50/70 text-blue-950 shadow-2xs text-xs sm:text-sm font-semibold tracking-wide">
          <span>Get Your Udyam Registration from</span>
          <span className="font-extrabold text-blue-700">₹2,899</span>
        </div>
      </div>

      {/* Main Title & Highlights for Left Column */}
      <div className="space-y-5 pr-2">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Apply Udyam Registration Online
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
            Complete your Udyam (MSME) Registration online with expert assistance for
            documentation, application filing, and fast approval support.
          </p>
        </div>

        {/* Feature Icons List */}
        <div className="space-y-3 pt-1">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 text-slate-700">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Social Proof & CA Guarantee */}
        <div className="pt-2">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
              CA
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-800">Udyam registration with CA assistance</p>
              <p className="text-slate-500 font-medium">100% Online & CA Verified Assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
