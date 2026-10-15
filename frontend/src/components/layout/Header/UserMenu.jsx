import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, LogOut } from 'lucide-react';
import { getDashboardPath, getDashboardLabel, getRoleLabel } from './navigationData.js';
import { FOCUS_RING, FOCUS_RING_ON_DARK } from './shared.js';

export default function UserMenu({ user, open, onToggle, onClose, onLogout, triggerRef }) {
  const role = user?.role;
  const isStaff = role === 'CA' || role === 'ADMIN';
  const itemClass = `block rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-50 hover:text-[#111827] ${FOCUS_RING}`;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={onToggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`flex items-center gap-2.5 rounded-md border border-white/70 px-2 py-1.5 text-white transition hover:bg-white/10 min-[1600px]:px-3 ${FOCUS_RING_ON_DARK}`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-xs font-bold text-white">
          {(user?.full_name || 'U').trim().charAt(0).toUpperCase()}
        </span>
        <span className="hidden text-left min-[1600px]:block">
          <span className="block max-w-[96px] truncate text-xs font-bold text-white">
            {user?.full_name?.split(' ')[0]}
          </span>
          <span className="block text-[10px] capitalize text-white/70">{getRoleLabel(role)}</span>
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-white/70 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account"
          className="bf-menu-in absolute right-0 top-full z-50 mt-2 w-56 space-y-1 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl"
        >
          {user?.email && (
            <div className="border-b border-slate-100 px-3 pb-2 pt-1">
              <p className="truncate text-xs font-bold text-slate-900">{user.full_name}</p>
              <p className="truncate text-[11px] text-slate-500">{user.email}</p>
            </div>
          )}

          <Link to={getDashboardPath(role)} role="menuitem" onClick={onClose} className={itemClass}>
            {isStaff ? getDashboardLabel(role) : 'My Dashboard'}
          </Link>
          {!isStaff && (
            <Link to="/dashboard?tab=profile" role="menuitem" onClick={onClose} className={itemClass}>
              Master Profile
            </Link>
          )}
          <Link to="/faq" role="menuitem" onClick={onClose} className={itemClass}>
            Help &amp; FAQs
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={onLogout}
            className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold text-rose-600 transition hover:bg-rose-50 ${FOCUS_RING}`}
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
