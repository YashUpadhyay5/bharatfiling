import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Search } from 'lucide-react';
import { SUPPORT } from './navigationData.js';
import { FOCUS_RING } from './shared.js';

/** Lets the hamburger list open the header's search dialog without owning its state. */
export const OPEN_SEARCH_EVENT = 'bf:open-search';

/**
 * White dropdown list under the hamburger button (desktop widths).
 * Holds the secondary links that don't need a place in the main row.
 */
export default function MoreMenu({ id, isAuthenticated, trackPath, onClose }) {
  const row = `block w-full whitespace-nowrap px-5 py-2.5 text-left text-[14.5px] font-medium text-[#0F172A] transition-colors hover:bg-slate-50 ${FOCUS_RING}`;

  const links = [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Help Center', to: '/faq' },
    { label: 'Track Application', to: trackPath },
  ];

  return (
    <div
      id={id}
      role="menu"
      aria-label="More"
      className="bf-menu-in absolute right-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white py-1.5 shadow-[0_16px_45px_rgba(6,42,77,0.22)]"
    >
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onClose();
          window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));
        }}
        className={`${row} flex items-center gap-2`}
      >
        <Search className="h-4 w-4 text-slate-500" aria-hidden="true" />
        Search services
      </button>

      {links.map((item) => (
        <Link key={item.label} to={item.to} role="menuitem" onClick={onClose} className={row}>
          {item.label}
        </Link>
      ))}

      {!isAuthenticated && (
        <Link to="/register" role="menuitem" onClick={onClose} className={`${row} font-bold`}>
          Register
        </Link>
      )}

      <div className="mx-4 my-1 h-px bg-slate-100" aria-hidden="true" />
      <a href={SUPPORT.phoneTel} role="menuitem" onClick={onClose} className={`${row} flex items-center gap-2`}>
        <Phone className="h-4 w-4 text-slate-500" aria-hidden="true" />
        Talk to an Expert
      </a>
    </div>
  );
}
