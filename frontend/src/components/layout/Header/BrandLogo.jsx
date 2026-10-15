import React from 'react';
import { Link } from 'react-router-dom';
import { FOCUS_RING, FOCUS_RING_ON_DARK } from './shared.js';

/**
 * `onDark` renders the wordmark for the navy header (white "Bharat") and seats the colour logo
 * mark on a small white tile so it keeps its contrast.
 */
export default function BrandLogo({ onClick, onDark = false, className = '' }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="BharatFiling – Home"
      className={`group flex shrink-0 items-center gap-2 rounded-lg transition-transform active:scale-95 ${
        onDark ? FOCUS_RING_ON_DARK : FOCUS_RING
      } ${className}`}
    >
      <span
        className={
          onDark
            ? 'flex h-9 items-center rounded-lg bg-white px-1.5 shadow-sm sm:h-10'
            : 'flex items-center'
        }
      >
        <img
          src="/bharatfiling-brand-icon.png"
          alt=""
          width="50"
          height="36"
          className={`w-auto shrink-0 object-contain ${onDark ? 'h-6 sm:h-7' : 'h-8 sm:h-9'}`}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </span>
      <span className="flex select-none items-baseline text-lg font-black leading-none tracking-tight sm:text-xl">
        <span className={onDark ? 'text-white' : 'text-[#111827]'}>Bharat</span>
        <span className="text-[#F26522]">Filing</span>
      </span>
    </Link>
  );
}
