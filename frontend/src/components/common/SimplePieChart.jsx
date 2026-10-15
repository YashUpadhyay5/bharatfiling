import React from 'react';

/**
 * Clean, production-ready SVG Pie Chart
 * Matches the exact aesthetic in reference Image 2 & 3.
 */
export default function SimplePieChart({ slices = [], size = 180 }) {
  const total = slices.reduce((sum, s) => sum + Math.max(0, Number(s.value) || 0), 0);
  const center = size / 2;
  const radius = center - 8;

  if (total <= 0) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={center} cy={center} r={radius} fill="#E2E8F0" />
      </svg>
    );
  }

  const validSlices = slices.filter((s) => Number(s.value) > 0);

  // If only 1 slice has 100% of the value (matches Image 2 exact visual)
  if (validSlices.length === 1) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-xs">
        <circle cx={center} cy={center} r={radius} fill={validSlices[0].color} />
        {/* Subtle white vertical line at 12 o'clock */}
        <line
          x1={center}
          y1={center}
          x2={center}
          y2={center - radius}
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
      </svg>
    );
  }

  let cumulativeAngle = -90; // Start at 12 o'clock (top)
  const paths = validSlices.map((slice, idx) => {
    const fraction = Number(slice.value) / total;
    const sliceAngle = fraction * 360;
    const startRad = (cumulativeAngle * Math.PI) / 180;
    const endRad = ((cumulativeAngle + sliceAngle) * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    const largeArc = sliceAngle > 180 ? 1 : 0;

    const d = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    cumulativeAngle += sliceAngle;

    return (
      <path
        key={idx}
        d={d}
        fill={slice.color}
        stroke="#FFFFFF"
        strokeWidth="2"
        className="transition-all duration-300"
      />
    );
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-xs">
      {paths}
    </svg>
  );
}
