import React from 'react';

export default function RouteLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-slate-200 border-t-[#111827] rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Loading BharatFiling...</p>
      </div>
    </div>
  );
}
