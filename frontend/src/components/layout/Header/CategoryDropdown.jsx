import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { SUPPORT } from './navigationData.js';
import { FOCUS_RING } from './shared.js';

export default function CategoryDropdown({ id, category, alignRight, onItemClick }) {
  const Icon = category.icon;

  const renderLinks = (items) => (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={`${category.key}-${item.name}`}>
          <Link
            to={item.path}
            onClick={(e) => onItemClick(e, item, category.label)}
            className={`group flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-[13.5px] font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#111827] ${FOCUS_RING}`}
          >
            <span>{item.name}</span>
            {item.isLive ? (
              <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                Live
              </span>
            ) : (
              <ArrowRight
                className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-slate-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div id={id} className={`bf-menu-in absolute top-full z-50 pt-px ${alignRight ? 'right-0' : 'left-0'}`}>
      <div className="w-[560px] overflow-hidden rounded-b-2xl rounded-t-lg border border-slate-200 bg-white shadow-[0_28px_70px_-24px_rgba(15,23,42,0.35)]">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#111827] text-white">
            <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[14.5px] font-bold text-[#111827]">{category.label}</p>
            <p className="text-[12.5px] text-slate-500">{category.blurb}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 p-3">
          {renderLinks(category.col1)}
          {renderLinks(category.col2)}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-slate-100 px-5 py-3 text-[12.5px]">
          <a href={SUPPORT.phoneTel} className={`inline-flex items-center gap-1.5 text-slate-600 hover:text-[#111827] ${FOCUS_RING}`}>
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            Need help choosing? <span className="font-semibold text-[#111827]">{SUPPORT.phoneDisplay}</span>
          </a>
          <Link
            to="/services"
            onClick={(e) => onItemClick(e, { name: 'All services', path: '/services' }, 'Services')}
            className={`inline-flex items-center gap-1 font-semibold text-[#111827] hover:underline ${FOCUS_RING}`}
          >
            View all services <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
