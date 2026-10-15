import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.jsx';
import AuthRequiredModal from '../../common/AuthRequiredModal.jsx';
import { SERVICES_DATA, searchServices, PUBLIC_INFO_PATHS } from '../../search/serviceSearch.js';
import {
  Search,
  X,
  ChevronRight,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  BadgePercent,
  Award,
  PhoneCall,
} from 'lucide-react';


// Curated Top Services categories for the modal initial view (matching image 2)
const TOP_SERVICE_GROUPS = [
  {
    key: 'INCORPORATION',
    name: 'INCORPORATION',
    badgeLabel: 'INCORPORATION',
    iconText: '🏢',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200/80',
    serviceIds: ['pvt-ltd', 'llp-reg', 'opc-reg', 'partnership-firm'],
  },
  {
    key: 'TRADEMARK',
    name: 'TRADEMARK',
    badgeLabel: 'TRADEMARK',
    iconText: '™',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200/80',
    serviceIds: ['tm-reg', 'copyright-reg'],
  },
  {
    key: 'GST_TAX',
    name: 'GST & TAX',
    badgeLabel: 'GST & TAX',
    iconText: '📊',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    serviceIds: ['gst-apply', 'itr-filing', 'gst-return', 'tds-returns'],
  },
  {
    key: 'MCA',
    name: 'MCA & COMPLIANCE',
    badgeLabel: 'MCA & COMPLIANCE',
    iconText: '📜',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80',
    serviceIds: ['roc-filing', 'dir3-kyc', 'add-director', 'strike-off'],
  },
  {
    key: 'LICENSES',
    name: 'LICENSES & REGISTRATION',
    badgeLabel: 'LICENSES',
    iconText: '🛡️',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    serviceIds: ['msme-reg', 'fssai-food', 'iec-code', 'dsc-token'],
  },
];

const TRENDING_SEARCHES = [
  'Private Limited Company',
  'GST Registration',
  'Trademark Registration',
  'Income Tax Return',
];

// Highlight matched letters in bold with visible badge
function HighlightMatch({ text, query }) {
  if (!query || !query.trim()) return <span>{text}</span>;
  const q = query.trim().toLowerCase();
  const index = text.toLowerCase().indexOf(q);
  if (index === -1) return <span>{text}</span>;

  const before = text.slice(0, index);
  const match = text.slice(index, index + q.length);
  const after = text.slice(index + q.length);

  return (
    <span>
      {before}
      <span className="font-bold text-blue-900 bg-blue-100/90 px-0.5 rounded">
        {match}
      </span>
      {after}
    </span>
  );
}

// Shortcut hint that matches the visitor's platform (⌘K on Apple devices, Ctrl K elsewhere)
const getShortcutLabel = () =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '')
    ? '⌘K'
    : 'Ctrl K';

export default function HeaderSearch({
  className = '',
  isMobile = false,
  onCloseMobile,
  // 'pill' = original compact pill, 'header' = icon button that grows into a pill on wide screens
  variant = 'pill',
}) {
  const { isAuthenticated } = useAuth();
  const shortcutLabel = useMemo(() => getShortcutLabel(), []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedServiceForAuth, setSelectedServiceForAuth] = useState(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Instant real-time suggestions whenever query changes
  const searchResults = useMemo(() => searchServices(query), [query]);

  // Reset active selection when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isModalOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      // Automatically focus search input inside modal
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isModalOpen]);

  // Global keyboard shortcut: Ctrl+K / Cmd+K or '/' anywhere on page opens modal
  useEffect(() => {
    // The mobile-drawer instance is short-lived; the header instance owns the shortcut.
    if (isMobile) return undefined;
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsModalOpen(true);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    // The hamburger list asks for the search dialog through this event.
    const handleExternalOpen = () => setIsModalOpen(true);

    window.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('bf:open-search', handleExternalOpen);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('bf:open-search', handleExternalOpen);
    };
  }, [isMobile]);

  // Select service and navigate (requires login/register for services)
  const handleSelect = (item) => {
    if (!item) return;
    setIsModalOpen(false);
    setQuery('');
    if (onCloseMobile) onCloseMobile();

    const isInfoPage = PUBLIC_INFO_PATHS.includes(item.path);
    if (isAuthenticated || isInfoPage) {
      navigate(item.path);
    } else {
      setSelectedServiceForAuth({
        title: item.title,
        path: item.path,
        category: item.category,
        price: 'Transparent Pricing',
        period: 'CA Audited Filing',
      });
      setAuthModalOpen(true);
    }
  };

  // Keyboard navigation within modal: ArrowUp, ArrowDown, Enter, Escape
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsModalOpen(false);
      return;
    }

    if (searchResults.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % searchResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const target = searchResults[activeIndex] || searchResults[0];
        handleSelect(target);
      }
    } else if (e.key === 'Enter' && query.trim()) {
      // Enter with no exact match redirects to directory
      setIsModalOpen(false);
      navigate('/services');
      if (onCloseMobile) onCloseMobile();
    }
  };

  const hasQuery = query.trim().length > 0;

  return (
    <>
      {/* 
        TRIGGER IN NAVBAR:
        Compact pill trigger with less length, matching image 1
      */}
      {isMobile ? (
        /* Mobile Drawer Trigger */
        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
            if (onCloseMobile) onCloseMobile();
          }}
          className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[13px] font-medium transition cursor-pointer ${className}`}
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400" />
            <span>Search GST, Trademark, Company...</span>
          </div>
        </button>
      ) : variant === 'none' ? null : variant === 'header' ? (
        /* Header trigger for the navy bar: round icon button, labelled pill on very wide screens */
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`group inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10 cursor-pointer min-[1700px]:w-[188px] min-[1700px]:justify-between min-[1700px]:px-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC21A] ${className}`}
          aria-label={`Search services (${shortcutLabel})`}
          title={`Search services (Press ${shortcutLabel} or /)`}
        >
          <span className="flex min-w-0 items-center gap-2">
            <Search className="h-[18px] w-[18px] shrink-0" />
            <span className="hidden truncate text-[13px] font-normal text-white/75 min-[1700px]:inline">
              Search services
            </span>
          </span>
          <kbd className="pointer-events-none hidden shrink-0 items-center whitespace-nowrap rounded border border-white/25 bg-white/10 px-1.5 py-0.5 font-sans text-[10px] text-white/80 min-[1700px]:inline-flex">
            {shortcutLabel}
          </kbd>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all shadow-xs text-xs font-medium w-40 xl:w-44 shrink-0 group cursor-pointer ${className}`}
          aria-label={`Search services (${shortcutLabel})`}
          title={`Search services (Press ${shortcutLabel} or /)`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0" />
            <span className="truncate text-slate-400 group-hover:text-slate-600 font-normal">
              Search services...
            </span>
          </div>
          <kbd className="hidden sm:inline-flex items-center text-[10px] text-slate-400 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-mono pointer-events-none group-hover:border-slate-300">
            {shortcutLabel}
          </kbd>
        </button>
      )}

      {/* 
        SEARCH POPUP MODAL (Matching Image 2):
        Rendered into document.body via Portal to prevent any z-index or stacking clipping
      */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-8 sm:pt-16 p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
          >
            {/* Modal Card */}
            <div
              ref={modalRef}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl sm:max-w-3xl overflow-hidden flex flex-col my-auto sm:my-0 animate-in zoom-in-95 duration-150"
              role="dialog"
              aria-modal="true"
            >
              {/* Top Search Input Bar (Matching Image 2) */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center gap-3 bg-white sticky top-0 z-10">
                {/* Search Input with distinct blue-ring border matching image 2 */}
                <div className="flex-1 relative flex items-center border border-blue-400 hover:border-blue-500 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 rounded-xl px-3.5 py-2.5 bg-white transition-all shadow-xs">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0 mr-2.5" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search GST, Trademark, Company Registration..."
                    className="w-full text-xs sm:text-sm md:text-base text-slate-800 placeholder:text-slate-400 font-medium bg-transparent focus:outline-none"
                    aria-label="Search all legal and tax services"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        inputRef.current?.focus();
                      }}
                      className="p-1 text-slate-400 hover:text-slate-700 transition cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Close Button on Right (Matching circular close button in image 2) */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  title="Close search (Esc)"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-h-[60vh] sm:max-h-[66vh]">
                {/* 
                  STATE 1: EMPTY QUERY (Initial View - Exact layout of Image 2)
                */}
                {!hasQuery ? (
                  <>
                    {/* ↗ TRENDING IN INDIA Section */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-600 tracking-wider">
                        <TrendingUp className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        <span>TRENDING IN INDIA</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {TRENDING_SEARCHES.map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => {
                              setQuery(chip);
                              inputRef.current?.focus();
                            }}
                            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-50/90 hover:bg-sky-100 text-sky-700 hover:text-sky-900 border border-sky-100 hover:border-sky-200 transition-colors cursor-pointer"
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* TOP SERVICES Header */}
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-400 tracking-widest uppercase mb-4">
                        TOP SERVICES
                      </div>

                      {/* Grouped Service Categories (2-Column Grid as in Image 2) */}
                      <div className="space-y-6">
                        {TOP_SERVICE_GROUPS.map((group) => {
                          const groupServices = group.serviceIds
                            .map((id) => SERVICES_DATA.find((s) => s.id === id))
                            .filter(Boolean);

                          return (
                            <div key={group.key} className="space-y-2.5">
                              {/* Category Badge Pill */}
                              <div className="flex items-center">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border tracking-wide ${group.badgeClass}`}
                                >
                                  <span>{group.iconText}</span>
                                  <span>{group.badgeLabel}</span>
                                </span>
                              </div>

                              {/* 2-Column Grid of Services */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                                {groupServices.map((item) => (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelect(item)}
                                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 text-left transition group cursor-pointer"
                                  >
                                    <div className="min-w-0 pr-2">
                                      <div className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-[#111827] truncate">
                                        {item.title}
                                      </div>
                                      <div className="text-[11px] text-slate-500 truncate mt-0.5 font-normal">
                                        {item.subtitle}
                                      </div>
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  /* 
                    STATE 2: USER TYPING A WORD (Real-time Instant Suggestions)
                  */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
                      <span>
                        Found <strong className="text-slate-800 font-semibold">{searchResults.length}</strong>{' '}
                        {searchResults.length === 1 ? 'matching service' : 'matching services'} for "
                        <span className="text-[#111827] font-semibold">{query}</span>"
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="text-[11px] text-blue-600 hover:underline font-medium"
                      >
                        Reset
                      </button>
                    </div>

                    {searchResults.length > 0 ? (
                      <div className="space-y-1.5">
                        {searchResults.map((item, index) => {
                          const isSelected = index === activeIndex;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelect(item)}
                              onMouseEnter={() => setActiveIndex(index)}
                              className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition cursor-pointer group ${
                                isSelected
                                  ? 'bg-blue-50/70 border-blue-200 text-[#111827]'
                                  : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-800'
                              }`}
                            >
                              <div className="min-w-0 pr-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 tracking-wider uppercase">
                                    {item.category}
                                  </span>
                                  {item.isTrending && (
                                    <span className="text-[10px] font-semibold text-sky-600 flex items-center gap-0.5">
                                      <TrendingUp className="w-2.5 h-2.5" /> Popular
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs sm:text-sm font-semibold text-slate-900">
                                  <HighlightMatch text={item.title} query={query} />
                                </div>
                                <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                                  <HighlightMatch text={item.subtitle} query={query} />
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[11px] font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                  Open
                                </span>
                                <ChevronRight
                                  className={`w-4 h-4 transition-transform ${
                                    isSelected
                                      ? 'text-blue-600 translate-x-1'
                                      : 'text-slate-300 group-hover:text-blue-600'
                                  }`}
                                />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      /* No Results Empty State */
                      <div className="text-center py-10 px-4 space-y-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                          <Search className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            No services found matching "{query}"
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Try searching for popular CA & legal compliance services below:
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 pt-1">
                          {['GST Registration', 'Private Limited', 'Trademark', 'Income Tax', 'LLP', 'MSME'].map(
                            (s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => {
                                  setQuery(s);
                                  inputRef.current?.focus();
                                }}
                                className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                              >
                                {s}
                              </button>
                            )
                          )}
                        </div>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsModalOpen(false);
                              navigate('/services');
                              if (onCloseMobile) onCloseMobile();
                            }}
                            className="text-xs font-bold text-[#111827] hover:text-[#F26522] underline underline-offset-4 cursor-pointer"
                          >
                            Browse All Services Directory →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Shortcuts & Help Footer */}
              <div className="p-3.5 sm:px-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">
                      ↑↓
                    </kbd>
                    <span>Navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">
                      ↵
                    </kbd>
                    <span>Select</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono">
                      ESC
                    </kbd>
                    <span>Close</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600">
                  <span>Need expert help?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate('/contact');
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className="font-bold text-[#111827] hover:text-[#F26522] transition cursor-pointer"
                  >
                    Book CA Consultation →
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Authentication Required Modal */}
      <AuthRequiredModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        service={selectedServiceForAuth}
        onSuccess={() => {
          if (selectedServiceForAuth?.path) {
            navigate(selectedServiceForAuth.path);
          }
        }}
      />
    </>
  );
}
