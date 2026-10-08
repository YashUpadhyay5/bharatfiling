import React from 'react';
import { Star, Award, Users, ShieldCheck } from 'lucide-react';

export default function TrustFooter() {
  return (
    <div className="bg-slate-50/80 border-t border-slate-100 p-4 sm:p-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-amber-500 flex items-center justify-center shadow-2xs shrink-0">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900">4.8 ★★★★★</div>
            <div className="text-[11px] text-slate-500">Verified Reviews</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#111827] flex items-center justify-center shadow-2xs shrink-0">
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900">15+ Years</div>
            <div className="text-[11px] text-slate-500">Industry Leadership</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#111827] flex items-center justify-center shadow-2xs shrink-0">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900">5,00,000+</div>
            <div className="text-[11px] text-slate-500">Indian Businesses</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center shadow-2xs shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-black text-slate-900">ISO 27001</div>
            <div className="text-[11px] text-slate-500">Bank-Grade Security</div>
          </div>
        </div>
      </div>
    </div>
  );
}
