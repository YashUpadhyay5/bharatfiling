import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function PanVerificationBadge({ pan = '', panAuth = { isValid: false, message: '' } }) {
  if (!pan || pan.length === 0) return null;

  return (
    <div className="pt-1 transition-all">
      {pan.length === 10 && !panAuth.isValid ? (
        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 animate-in fade-in duration-150" title={panAuth.message}>
          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>Invalid</span>
        </div>
      ) : pan.length === 10 && panAuth.isValid ? (
        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Verified</span>
        </div>
      ) : (
        <div className="text-[11px] text-slate-400 pl-1">
          {panAuth.message || `${10 - pan.length} characters remaining`}
        </div>
      )}
    </div>
  );
}
