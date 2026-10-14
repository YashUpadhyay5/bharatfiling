import React from 'react';
import { Link } from 'react-router-dom';
import { FOCUS_RING } from './shared.js';

/**
 * Two-column hover dropdown for one service category.
 * Width follows the longest service name (no awkward wrapping) and the panel can be
 * anchored to the right edge of its tab so it never runs off the viewport.
 */
export default function CategoryDropdown({ id, category, alignRight, onItemClick }) {
  const renderColumn = (items) => (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={`${category.key}-${item.name}`}>
          <Link
            to={item.path}
            onClick={(e) => onItemClick(e, item, category.label)}
            className={`flex items-center justify-between gap-3 whitespace-nowrap rounded-lg px-2 py-1.5 text-[12.5px] font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#111827] ${FOCUS_RING}`}
          >
            <span>{item.name}</span>
            {item.isLive && (
              <span className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                Live
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      id={id}
      className={`bf-menu-in absolute top-full z-50 pt-1 ${alignRight ? 'right-0' : 'left-0'}`}
    >
      <div className="grid w-max min-w-[420px] grid-cols-2 gap-x-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_16px_45px_rgba(17,24,39,0.12)]">
        {renderColumn(category.col1)}
        {renderColumn(category.col2)}
      </div>
    </div>
  );
}
