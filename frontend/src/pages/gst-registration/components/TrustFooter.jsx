import React from 'react';
import { Star, Award, Users, ShieldCheck } from 'lucide-react';

export default function TrustFooter() {
  return (
    <div className="bg-slate-50/80 border-t border-slate-100 p-3.5 sm:p-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-amber-500 flex items-center justify-center shadow-2xs shrink-0">
            <Star className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900">Expert Reviewed</div>
            <div className="text-[11px] text-slate-500">CA checks every application</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#111827] flex items-center justify-center shadow-2xs shrink-0">
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900">Fixed Fee</div>
            <div className="text-[11px] text-slate-500">Shown before you pay</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#111827] flex items-center justify-center shadow-2xs shrink-0">
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900">100% Online</div>
            <div className="text-[11px] text-slate-500">No office visits</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center shadow-2xs shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900">Secure Uploads</div>
            <div className="text-[11px] text-slate-500">Encrypted in transit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
