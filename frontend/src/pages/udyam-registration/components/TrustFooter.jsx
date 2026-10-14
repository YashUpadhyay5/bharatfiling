import React from 'react';
import { Award, Users, Smartphone, CheckCircle2 } from 'lucide-react';

export default function TrustFooter() {
  const trustItems = [
    {
      badge: '4.7',
      stars: '★★★★★',
      label: 'Verified Reviews',
      icon: CheckCircle2,
      iconColor: 'text-amber-500 bg-amber-50 border-amber-200',
    },
    {
      badge: '15+ Years',
      label: 'of Experience',
      icon: Award,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      badge: '2 Lakh+ Customers',
      label: 'Trusted across India',
      icon: Users,
      iconColor: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      badge: 'App Tracking',
      label: 'Live status updates',
      icon: Smartphone,
      iconColor: 'text-rose-500 bg-rose-50 border-rose-200',
    },
  ];

  return (
    <div className="mt-8 pt-6 border-t border-slate-200/80">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-slate-100 shadow-xs"
            >
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${item.iconColor}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-slate-900">{item.badge}</span>
                  {item.stars && (
                    <span className="text-[10px] text-amber-500 font-bold tracking-tight">
                      {item.stars}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 truncate">{item.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
