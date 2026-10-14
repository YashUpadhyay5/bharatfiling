import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, LayoutDashboard, LogOut, Mail, Phone, X } from 'lucide-react';
import BrandLogo from './BrandLogo.jsx';
import HeaderSearch from './HeaderSearch.jsx';
import {
  SUPPORT,
  PRIMARY_NAV,
  MOBILE_EXTRA_LINKS,
  SERVICE_CATEGORIES,
  getDashboardPath,
  getDashboardLabel,
} from './navigationData.js';
import { FOCUS_RING } from './shared.js';

export default function MobileDrawer({ open, onClose, pathname, user, isAuthenticated, onLogout, onItemClick }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const [openCat, setOpenCat] = useState(null);

  // Lock page scroll, close on Escape, move focus into the drawer
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  // Keep Tab focus inside the drawer while it is open
  const trapFocus = (e) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;

  const rowClass = (active) =>
    `flex items-center rounded-xl px-3 py-3 text-[15px] font-semibold transition-colors ${FOCUS_RING} ${
      active ? 'bg-slate-100 text-[#111827]' : 'text-slate-800 hover:bg-slate-50'
    }`;

  return createPortal(
    <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Main menu">
      <div className="bf-fade-in absolute inset-0 bg-slate-900/50" onClick={onClose} aria-hidden="true" />

      <div
        ref={panelRef}
        onKeyDown={trapFocus}
        className="bf-drawer-in absolute right-0 top-0 flex h-full w-[88%] max-w-[380px] flex-col bg-white shadow-2xl"
      >
        {/* Drawer header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-4">
          <BrandLogo onClick={onClose} />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className={`flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 ${FOCUS_RING}`}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable navigation */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <HeaderSearch isMobile onCloseMobile={onClose} />

          <nav aria-label="Mobile" className="mt-4">
            <Link to="/" onClick={onClose} aria-current={pathname === '/' ? 'page' : undefined} className={rowClass(pathname === '/')}>
              Home
            </Link>

            <p className="px-3 pb-1 pt-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Services</p>
            <div className="space-y-0.5">
              {SERVICE_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isOpen = openCat === cat.key;
                return (
                  <div key={cat.key}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`m-cat-${cat.key}`}
                      onClick={() => setOpenCat(isOpen ? null : cat.key)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 ${FOCUS_RING}`}
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="flex-1">{cat.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#111827]' : ''}`}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <ul id={`m-cat-${cat.key}`} className="mb-2 ml-[26px] space-y-0.5 border-l border-slate-200 pl-3">
                        {[...cat.col1, ...cat.col2].map((item) => (
                          <li key={`${cat.key}-${item.name}`}>
                            <Link
                              to={item.path}
                              onClick={(e) => onItemClick(e, item, cat.label)}
                              className={`flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-[14px] text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#111827] ${FOCUS_RING}`}
                            >
                              <span>{item.name}</span>
                              {item.isLive && (
                                <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                                  Live
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
              <Link
                to="/services"
                onClick={onClose}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-[#111827] transition-colors hover:bg-slate-50 ${FOCUS_RING}`}
              >
                Browse all services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <p className="px-3 pb-1 pt-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Company</p>
            <div className="space-y-0.5">
              {[...PRIMARY_NAV.filter((n) => !n.mega && n.key !== 'home'), ...MOBILE_EXTRA_LINKS].map((item) => {
                const active = item.isActive ? item.isActive(pathname) : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.key}
                    to={item.to}
                    onClick={onClose}
                    aria-current={active ? 'page' : undefined}
                    className={rowClass(active)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Pinned footer: contact + account actions */}
        <div className="shrink-0 space-y-3 border-t border-slate-100 bg-slate-50/70 px-4 py-4">
          <div className="flex items-center justify-between gap-3 text-[13px]">
            <a href={SUPPORT.phoneTel} className={`inline-flex items-center gap-1.5 font-semibold text-[#111827] ${FOCUS_RING}`}>
              <Phone className="h-4 w-4 text-slate-500" aria-hidden="true" />
              {SUPPORT.phoneDisplay}
            </a>
            <a href={`mailto:${SUPPORT.email}`} className={`inline-flex items-center gap-1.5 text-slate-600 ${FOCUS_RING}`}>
              <Mail className="h-4 w-4 text-slate-500" aria-hidden="true" />
              Email us
            </a>
          </div>

          {isAuthenticated ? (
            <div className="space-y-2">
              <Link
                to={getDashboardPath(user?.role)}
                onClick={onClose}
                className={`flex w-full items-center justify-center gap-2 rounded-full bg-[#111827] py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1F2937] ${FOCUS_RING}`}
              >
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                Go to {getDashboardLabel(user?.role)}
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className={`flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-[14px] font-semibold text-rose-600 transition-colors hover:bg-rose-50 ${FOCUS_RING}`}
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Sign out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={onClose}
                className={`flex items-center justify-center rounded-full border border-slate-300 bg-white py-3 text-[14px] font-semibold text-slate-800 transition-colors hover:bg-slate-50 ${FOCUS_RING}`}
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={onClose}
                className={`flex items-center justify-center rounded-full bg-[#111827] py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#1F2937] ${FOCUS_RING}`}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
