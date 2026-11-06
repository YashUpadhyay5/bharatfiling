import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthRequiredModal from '../common/AuthRequiredModal.jsx';
import { PUBLIC_INFO_PATHS, searchServices } from '../search/serviceSearch.js';

const PLACEHOLDER = "Try 'Income Tax Return', 'GST Registration', 'Company Registration'...";

const MAX_RESULTS = 6;

function Highlight({ text, query }) {
  const q = query.trim().toLowerCase();
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-orange-100 px-0.5 font-bold text-[#0B1B2B]">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

/**
 * Home-page search (combobox): type to see matching services, arrow keys to move, Enter to open.
 * Uses the same directory and ranking as the header search dialog, and the same sign-in rule.
 */
export default function HeroSearch() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const listId = useId();
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [authService, setAuthService] = useState(null);

  const results = useMemo(() => searchServices(query).slice(0, MAX_RESULTS), [query]);
  const showList = open && query.trim().length > 0;

  // On short screens, bring the suggestions into view when they open (search bar stays below the header)
  useEffect(() => {
    if (!showList || !boxRef.current) return;
    const HEADER = 68;
    const rect = boxRef.current.getBoundingClientRect();
    const wanted = Math.min(results.length || 1, MAX_RESULTS) * 58 + 24; // list height incl. margin
    const below = window.innerHeight - rect.bottom - 12;
    if (below >= wanted) return;
    const room = rect.top - HEADER - 16; // how far we can scroll before the bar hits the header
    const delta = Math.min(wanted - below, room);
    if (delta > 0) {
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollBy({ top: delta, behavior: smooth ? 'smooth' : 'auto' });
    }
  }, [showList, results.length]);

  // Close the suggestion list on outside click
  useEffect(() => {
    if (!showList) return undefined;
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [showList]);

  const select = (item) => {
    if (!item) return;
    setOpen(false);
    setQuery('');
    if (isAuthenticated || PUBLIC_INFO_PATHS.includes(item.path) || item.path.startsWith('/services/') || item.path.includes('udyam') || item.path.includes('msme')) {
      navigate(item.path);
    } else {
      setAuthService({
        title: item.title,
        path: item.path,
        category: item.category,
        price: 'Transparent Pricing',
        period: 'CA Audited Filing',
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      inputRef.current?.focus();
      return;
    }
    if (results.length) select(results[Math.min(active, results.length - 1)]);
    else navigate('/services');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i - 1 + results.length) % results.length);
    }
  };

  const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062A4D]';

  return (
    <div className="w-full max-w-[60rem] 3xl:max-w-[68rem]">
      <div ref={boxRef} className="group/search relative">
        {/* focus glow - a separate layer behind the bar */}
        <div
          aria-hidden="true"
          className="bf-glow-layer pointer-events-none absolute -inset-1.5 -z-10 rounded-full opacity-0 transition-opacity duration-300 group-focus-within/search:opacity-30"
        />
        <form
          role="search"
          onSubmit={submit}
          className="bf-ring bf-ring--focus-spin flex h-14 items-center gap-3 rounded-full bg-white/85 pl-5 pr-1.5 shadow-[0_22px_50px_-26px_rgba(6,42,77,0.55),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-slate-200/90 backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300 [--bf-ring-opacity:0] [--bf-ring-width:2px] focus-within:bg-white focus-within:ring-transparent focus-within:[--bf-ring-opacity:1] hover:shadow-[0_26px_60px_-26px_rgba(6,42,77,0.65),inset_0_1px_0_rgba(255,255,255,0.9)] sm:h-[66px] sm:gap-4 sm:pl-8 sm:pr-2 short:h-14 3xl:h-[76px] 3xl:pl-9"
        >
          <Search className="h-5 w-5 shrink-0 text-slate-500 sm:h-6 sm:w-6" aria-hidden="true" />
          <label htmlFor={`${listId}-input`} className="sr-only">
            Search services
          </label>
          <input
            ref={inputRef}
            id={`${listId}-input`}
            type="text"
            role="combobox"
            aria-expanded={showList}
            aria-controls={`${listId}-list`}
            aria-autocomplete="list"
            aria-activedescendant={showList && results.length ? `${listId}-opt-${active}` : undefined}
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={PLACEHOLDER}
            className="h-full min-w-0 flex-1 text-ellipsis bg-transparent text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none sm:text-[16.5px] 3xl:text-[19px]"
          />
          <button
            type="submit"
            aria-label="Search"
            className={`group/btn flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold sm:w-auto sm:px-9 sm:text-[17px] 3xl:h-[60px] 3xl:px-11 3xl:text-[19px] bg-[radial-gradient(circle_at_30%_25%,#1E5A96,#062A4D_70%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_8px_18px_-8px_rgba(6,42,77,0.8)] transition duration-300 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_12px_26px_-8px_rgba(6,42,77,0.9)] active:scale-95 sm:h-[52px] short:h-11 ${focusRing}`}
          >
            <Search className="h-5 w-5 sm:hidden" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>

        {showList && (
          <div className="bf-menu-in absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl bg-white text-left shadow-[0_24px_60px_-20px_rgba(6,42,77,0.4)] ring-1 ring-slate-200">
            {results.length ? (
              <ul id={`${listId}-list`} role="listbox" aria-label="Matching services" className="max-h-[min(360px,calc(100svh-180px))] overflow-y-auto overscroll-contain py-1.5">
                {results.map((item, i) => (
                  <li
                    key={item.id}
                    id={`${listId}-opt-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onPointerDown={(e) => e.preventDefault()} // keep focus in the input
                    onClick={() => select(item)}
                    // Only real pointer movement changes the highlight - not the list sliding under a
                    // resting cursor when the page scrolls to reveal it.
                    onPointerMove={(e) => {
                      if ((e.movementX || e.movementY) && i !== active) setActive(i);
                    }}
                    className={`flex cursor-pointer items-center justify-between gap-4 px-5 py-2.5 ${
                      i === active ? 'bg-slate-50' : ''
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[14.5px] font-semibold text-slate-900">
                        <Highlight text={item.title} query={query} />
                      </p>
                      <p className="truncate text-[12.5px] text-slate-500">{item.subtitle}</p>
                    </div>
                    <span className="shrink-0 text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div id={`${listId}-list`} className="px-5 py-4 text-sm text-slate-600">
                No exact match for “{query.trim()}”. Press Enter to browse all services.
              </div>
            )}
          </div>
        )}
      </div>

      <AuthRequiredModal
        isOpen={!!authService}
        onClose={() => setAuthService(null)}
        service={authService}
        onSuccess={() => {
          if (authService?.path) navigate(authService.path);
        }}
      />
    </div>
  );
}
