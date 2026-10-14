import React from 'react';
import { Link } from 'react-router-dom';
import { FOCUS_RING } from './shared.js';

export default function BrandLogo({ onClick, className = '' }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="BharatFiling – Home"
      className={`flex shrink-0 items-center gap-2.5 rounded-lg ${FOCUS_RING} ${className}`}
    >
      <img
        src="/bharatfiling-brand-icon.png"
        alt=""
        width="50"
        height="36"
        className="h-9 w-auto shrink-0 object-contain"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="flex select-none items-baseline text-[21px] font-extrabold leading-none tracking-tight">
        <span className="text-[#111827]">Bharat</span>
        <span className="text-[#F26522]">Filing</span>
      </span>
    </Link>
  );
}
