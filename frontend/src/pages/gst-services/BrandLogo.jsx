import React from 'react';

export default function BrandLogo() {
  return (
    <div className="inline-flex items-center gap-2 select-none">
      <img
        src="/bharatfiling-brand-icon.png"
        alt="BharatFiling"
        className="h-7 sm:h-8 w-auto shrink-0 object-contain"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
        }}
      />
      <span className="flex items-baseline text-base sm:text-lg font-extrabold leading-none tracking-tight">
        <span className="text-[#111827]">Bharat</span>
        <span className="text-[#F26522]">Filing</span>
      </span>
    </div>
  );
}
