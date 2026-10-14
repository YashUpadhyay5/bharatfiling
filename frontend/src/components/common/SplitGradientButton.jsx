import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function SplitGradientButton({
  label,
  children,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
  loadingText,
  className = '',
  fullWidth = false,
  arrowIcon: CustomArrow = ArrowRight,
  ...props
}) {
  const displayText = loading ? (loadingText || 'Processing...') : (label || children);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`split-gradient-btn group relative inline-flex items-stretch overflow-hidden rounded-[10px] sm:rounded-[12px] min-h-[44px] text-[13px] sm:text-[14px] font-bold text-white select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8542FA] disabled:opacity-60 disabled:cursor-not-allowed ${
        fullWidth ? 'w-full' : 'w-full sm:w-auto'
      } ${className}`}
      {...props}
    >
      {/* 1. Main Text Segment */}
      <span className="flex-1 inline-flex items-center justify-center px-4 sm:px-[22px] py-2.5 whitespace-nowrap leading-none tracking-tight">
        {displayText}
      </span>

      {/* 2. Right Arrow Segment (with vertical divider) */}
      <span className="split-gradient-arrow shrink-0 inline-flex items-center justify-center min-w-[40px] sm:min-w-[44px] px-2.5">
        {loading ? (
          <Loader2 className="w-4 h-4 text-white animate-spin" />
        ) : (
          <CustomArrow className="w-4 h-4 text-white stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" />
        )}
      </span>
    </button>
  );
}
