import React from 'react';
import { User, FileText, Monitor, Settings, ShieldCheck } from 'lucide-react';

export default function OnboardingHero() {
  const highlights = [
    { icon: User, label: 'Official MSME Business Recognition' },
    { icon: FileText, label: 'Access Government Schemes & Subsidies' },
    { icon: Monitor, label: 'Supports Tenders & Business Growth' },
    { icon: Settings, label: 'Fast Online Registration Support' },
    { icon: ShieldCheck, label: 'Supports Tenders & Business Growth' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner Pill */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-400 bg-white/95 text-blue-900 shadow-sm text-sm font-semibold tracking-wide hover:shadow transition">
          <span className="text-base">🚀</span>
          <span>Get Your Udyam Registration - starts from</span>
          <span className="font-extrabold text-blue-950">₹2,899</span>
        </div>
      </div>

      {/* Main Title & Highlights for Left Column */}
      <div className="space-y-6 pr-2">
        <div className="space-y-2.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Apply Udyam Registration Online
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md">
            Complete your Udyam (MSME) Registration online with expert assistance for
            documentation, application filing, and fast approval support.
          </p>
        </div>

        {/* Feature Icons List */}
        <div className="space-y-3.5 pt-2">
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
      </div>
    </div>
  );
}
