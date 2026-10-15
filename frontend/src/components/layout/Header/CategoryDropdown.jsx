import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FOCUS_RING } from './shared.js';

const VIEWPORT_MARGIN = 12;

/**
 * Two-column hover dropdown for one service category.
 *
 * Width follows the longest service name (no wrapping, no dead space). Horizontal placement is
 * measured, not hard-coded: the panel is centred under its own tab and then clamped so it can never
 * cross the viewport edges, at any width.
 */
export default function CategoryDropdown({ id, category, onItemClick }) {
  const ref = useRef(null);
  const [left, setLeft] = useState(0);

  useLayoutEffect(() => {
    const place = () => {
      const el = ref.current;
      if (!el || !el.parentElement) return;
      const tab = el.parentElement.getBoundingClientRect();
      const width = el.firstElementChild.getBoundingClientRect().width;
      const viewport = document.documentElement.clientWidth;

      let x = tab.left + tab.width / 2 - width / 2; // centred under its own tab
      x = Math.max(VIEWPORT_MARGIN, Math.min(x, viewport - VIEWPORT_MARGIN - width));
      setLeft(Math.round(x - tab.left));
    };
    place(); // runs before paint, so the panel never flashes in the wrong place
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [category.key]);

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
              <span className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold leading-none text-emerald-700">
                Live
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={ref} id={id} className="bf-menu-in absolute top-full z-50 pt-1" style={{ left }}>
      <div className="grid w-max min-w-[420px] max-w-[calc(100vw-24px)] grid-cols-2 gap-x-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_16px_45px_rgba(17,24,39,0.12)]">
        {renderColumn(category.col1)}
        {renderColumn(category.col2)}
      </div>
    </div>
  );
}
