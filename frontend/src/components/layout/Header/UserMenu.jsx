import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, CircleHelp, LayoutDashboard, LogOut, UserRound } from 'lucide-react';
import { getDashboardPath, getDashboardLabel, getRoleLabel } from './navigationData.js';
import { FOCUS_RING, getInitials } from './shared.js';

export default function UserMenu({ user, open, onToggle, onClose, onLogout, triggerRef }) {
  const role = user?.role;
  const itemClass = `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#111827] ${FOCUS_RING}`;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={onToggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className={`inline-flex h-10 items-center gap-1 rounded-full border border-slate-200 py-0 pl-1 pr-2 transition-colors hover:border-slate-300 hover:bg-slate-50 ${FOCUS_RING}`}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111827] text-[12px] font-bold text-white">
          {getInitials(user?.full_name)}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Account"
          className="bf-menu-in absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)]"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111827] text-[13px] font-bold text-white">
              {getInitials(user?.full_name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-[#111827]">{user?.full_name || 'Your account'}</p>
              {user?.email && <p className="truncate text-[12px] text-slate-500">{user.email}</p>}
              <span className="mt-1 inline-block rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
                {getRoleLabel(role)}
              </span>
            </div>
          </div>

          <div className="p-2">
            <Link to={getDashboardPath(role)} role="menuitem" onClick={onClose} className={itemClass}>
              <LayoutDashboard className="h-4 w-4 text-slate-400" aria-hidden="true" />
              {role === 'CA' || role === 'ADMIN' ? getDashboardLabel(role) : 'My Dashboard'}
            </Link>
            {role !== 'CA' && role !== 'ADMIN' && (
              <Link to="/dashboard?tab=profile" role="menuitem" onClick={onClose} className={itemClass}>
                <UserRound className="h-4 w-4 text-slate-400" aria-hidden="true" />
                Profile &amp; KYC
              </Link>
            )}
            <Link to="/faq" role="menuitem" onClick={onClose} className={itemClass}>
              <CircleHelp className="h-4 w-4 text-slate-400" aria-hidden="true" />
              Help &amp; FAQs
            </Link>
          </div>

          <div className="border-t border-slate-100 p-2">
            <button
              type="button"
              role="menuitem"
              onClick={onLogout}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13.5px] font-semibold text-rose-600 transition-colors hover:bg-rose-50 ${FOCUS_RING}`}
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
