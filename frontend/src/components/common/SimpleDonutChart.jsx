import React from 'react';

/**
 * Clean SVG Donut Chart matching the exact visual in user's reference image
 */
export default function SimpleDonutChart({
  takeHome = 0,
  tax = 0,
  size = 180,
  strokeWidth = 24,
}) {
  const takeHomeNum = Math.max(0, Number(takeHome) || 0);
  const taxNum = Math.max(0, Number(tax) || 0);
  const total = takeHomeNum + taxNum;

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  if (total <= 0) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  const takeHomeRatio = takeHomeNum / total;
  const taxRatio = taxNum / total;

  const takeHomeDash = takeHomeRatio * circumference;
  const taxDash = taxRatio * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90 drop-shadow-xs"
      >
        {/* Base background ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth={strokeWidth}
        />

        {/* Take Home Ring (Green) */}
        {takeHomeDash > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#10B981"
            strokeWidth={strokeWidth}
            strokeDasharray={`${takeHomeDash} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap={taxDash > 0 ? 'butt' : 'round'}
            className="transition-all duration-500 ease-out"
          />
        )}

        {/* Income Tax Ring (Coral Red) */}
        {taxDash > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#EF4444"
            strokeWidth={strokeWidth}
            strokeDasharray={`${taxDash} ${circumference}`}
            strokeDashoffset={-takeHomeDash}
            strokeLinecap="butt"
            className="transition-all duration-500 ease-out"
          />
        )}
      </svg>
    </div>
  );
}
