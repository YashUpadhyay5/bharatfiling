import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';

// Lightweight, cleanly indexed services & routes
const SEARCH_DIRECTORY = [
  // GST
  { id: 'gst-apply', title: 'GST Registration', category: 'GST', path: '/apply/gst', keywords: ['gst', 'registration', 'gstin', 'apply', 'new business', 'proprietorship', 'trn', 'tax'] },
  { id: 'gst-return', title: 'GST Return Filing (GSTR-1 & 3B)', category: 'GST', path: '/services/gst-return', keywords: ['gst', 'return', 'gstr1', 'gstr3b', 'monthly filing', 'quarterly'] },
  { id: 'gst-annual', title: 'GST Annual Return (GSTR-9)', category: 'GST', path: '/services/gst-return', keywords: ['gst', 'gstr9', 'annual return', 'audit', 'compliance'] },
  { id: 'gst-itc', title: 'GSTR-2B ITC Reconciliation', category: 'GST', path: '/services/gst-return', keywords: ['gst', 'itc', 'gstr2b', 'input tax credit', 'purchase'] },
  { id: 'gst-lut', title: 'GST LUT for Exporters', category: 'GST', path: '/services/gst-registration', keywords: ['gst', 'lut', 'export', 'zero rated', 'rfd11'] },
  { id: 'gst-notice', title: 'GST Notice Reply (REG-03)', category: 'GST', path: '/services/gst-registration', keywords: ['gst', 'notice', 'reg03', 'clarification', 'query'] },
  { id: 'gst-cancel', title: 'GST Cancellation & Revocation', category: 'GST', path: '/services/gst-registration', keywords: ['gst', 'cancel', 'surrender', 'revocation'] },

  // Startup & Company Incorporation
  { id: 'pvt-ltd', title: 'Private Limited Company (Pvt Ltd)', category: 'Startup', path: '/services/company-registration', keywords: ['pvt ltd', 'company', 'incorporation', 'private limited', 'mca', 'spice+'] },
  { id: 'llp-reg', title: 'Limited Liability Partnership (LLP)', category: 'Startup', path: '/services/llp-registration', keywords: ['llp', 'partnership', 'limited liability', 'firm', 'partners'] },
  { id: 'opc-reg', title: 'One Person Company (OPC)', category: 'Startup', path: '/services/company-registration', keywords: ['opc', 'one person', 'solo', 'company'] },
  { id: 'proprietorship', title: 'Sole Proprietorship Registration', category: 'Startup', path: '/apply/gst', keywords: ['proprietorship', 'sole trader', 'individual', 'business'] },
  { id: 'partnership', title: 'Partnership Firm Registration', category: 'Startup', path: '/services/company-registration', keywords: ['partnership', 'deed', 'firm'] },
  { id: 'section-8', title: 'Section 8 Company (NGO / Trust)', category: 'Startup', path: '/services/company-registration', keywords: ['section 8', 'ngo', 'non profit', 'trust', '12a', '80g'] },

  // Direct Tax & ITR
  { id: 'itr-filing', title: 'Income Tax Return (ITR 1–4)', category: 'Tax', path: '/services/income-tax', keywords: ['itr', 'tax', 'income tax', 'salary', 'capital gains', 'refund'] },
  { id: 'itr-business', title: 'Business & Corporate Tax (ITR 5–7)', category: 'Tax', path: '/services/income-tax', keywords: ['itr', 'tax', 'itr5', 'itr6', 'corporate tax', 'firm return'] },
  { id: 'tds-returns', title: 'TDS Return Filing (24Q / 26Q)', category: 'Tax', path: '/services/income-tax', keywords: ['tds', 'form 16', 'traces', '24q', '26q'] },
  { id: 'tax-notice', title: 'Income Tax Notice Response', category: 'Tax', path: '/services/income-tax', keywords: ['tax notice', '143(1)', 'scrutiny', 'defective return'] },
  { id: '15ca-15cb', title: 'Form 15CA / 15CB Certification', category: 'Tax', path: '/services/income-tax', keywords: ['15ca', '15cb', 'foreign remittance', 'ca certificate'] },
  { id: 'advance-tax', title: 'Advance Tax Computation', category: 'Tax', path: '/services/income-tax', keywords: ['advance tax', 'tax planning', 'challan 280'] },

  // Trademark & IP
  { id: 'tm-reg', title: 'Trademark Registration Online', category: 'Trademark', path: '/services/trademark', keywords: ['trademark', 'tm', 'brand', 'logo', 'brand name', 'ipr'] },
  { id: 'tm-search', title: 'Trademark Availability Search', category: 'Trademark', path: '/services/trademark', keywords: ['tm search', 'brand search', 'trademark check', 'class search'] },
  { id: 'tm-objection', title: 'Trademark Objection Reply', category: 'Trademark', path: '/services/trademark', keywords: ['tm objection', 'examination report', 'section 9', 'section 11'] },
  { id: 'copyright-patent', title: 'Copyright & Patent Filing', category: 'Trademark', path: '/services/trademark', keywords: ['copyright', 'patent', 'invention', 'code copyright'] },

  // MCA & Secretarial
  { id: 'roc-filing', title: 'Company Annual ROC Filing (AOC-4 & MGT-7)', category: 'MCA', path: '/services/llp-registration', keywords: ['roc', 'mca', 'annual filing', 'aoc4', 'mgt7'] },
  { id: 'dir3-kyc', title: 'Director KYC (DIR-3 KYC)', category: 'MCA', path: '/services/llp-registration', keywords: ['dir-3', 'dir3', 'director kyc', 'din kyc', 'din'] },
  { id: 'add-director', title: 'Add or Remove Director (DIR-12)', category: 'MCA', path: '/services/llp-registration', keywords: ['director', 'dir12', 'resignation', 'appointment'] },
  { id: 'strike-off', title: 'Strike Off / Close Company or LLP', category: 'MCA', path: '/services/llp-registration', keywords: ['strike off', 'close company', 'close llp', 'stk2'] },

  // Licenses
  { id: 'msme-reg', title: 'MSME / Udyam Registration', category: 'Licenses', path: '/services', keywords: ['msme', 'udyam', 'small business', 'subsidy'] },
  { id: 'fssai-food', title: 'FSSAI Food Safety License', category: 'Licenses', path: '/services', keywords: ['fssai', 'food license', 'restaurant', 'cloud kitchen', 'foscos'] },
  { id: 'iec-code', title: 'Import Export Code (IEC)', category: 'Licenses', path: '/services', keywords: ['iec', 'dgft', 'export license', 'import license', 'customs'] },
  { id: 'dsc-token', title: 'Digital Signature Certificate (DSC)', category: 'Licenses', path: '/services', keywords: ['dsc', 'digital token', 'class 3', 'emsigner'] },

  // Consultations & Support
  { id: 'talk-ca', title: 'Talk to Chartered Accountant (CA)', category: 'Consult', path: '/contact', keywords: ['talk to ca', 'ca consultation', 'chartered accountant', 'tax advice'] },
  { id: 'legal-consult', title: 'Legal Consultation with Advocate', category: 'Consult', path: '/contact', keywords: ['lawyer', 'advocate', 'legal consultation', 'contracts'] },
  { id: 'pricing-page', title: 'Pricing Plans & Packages', category: 'Pricing', path: '/pricing', keywords: ['pricing', 'plans', 'cost', 'fees', 'charges'] },
  { id: 'track-status', title: 'Track My Application Status', category: 'Portal', path: '/dashboard', keywords: ['track', 'status', 'dashboard', 'my orders', 'filings'] },
  { id: 'services-all', title: 'All Services Catalog', category: 'Directory', path: '/services', keywords: ['services', 'all services', 'directory'] },
  { id: 'faq-help', title: 'Help & Frequently Asked Questions (FAQ)', category: 'Support', path: '/faq', keywords: ['faq', 'help', 'support', 'questions'] },
];

// Highlight matched letters in bold
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
      <span className="font-black text-[#111827] bg-amber-100/80 px-0.5 rounded">
        {match}
      </span>
      {after}
    </span>
  );
}

export default function NavbarSearch({ className = '', isMobile = false, onCloseMobile }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Instant filtering based on typed keyword
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const tokens = q.split(/\s+/).filter(Boolean);

    return SEARCH_DIRECTORY.map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const catLower = item.category.toLowerCase();
      const allKeywords = item.keywords.join(' ').toLowerCase();

      // Highest priority if title starts with query
      if (titleLower.startsWith(q)) score += 100;
      else if (titleLower.includes(q)) score += 60;

      // Category match
      if (catLower.startsWith(q)) score += 40;

      // Token matches
      tokens.forEach((token) => {
        if (titleLower.includes(token)) score += 30;
        if (allKeywords.includes(token)) score += 25;
      });

      return { ...item, score };
    })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6); // Keep it clean: max 6 standard suggestions
  }, [query]);

  // Reset active selection on query change
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Global shortcut: Ctrl+K / Cmd+K or '/' focuses search
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === '/' && document.activeElement !== inputRef.current) {
        const tagName = document.activeElement?.tagName;
        if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
          e.preventDefault();
          inputRef.current?.focus();
          setIsOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Redirect instantly to selected destination
  const handleSelect = (item) => {
    if (!item) return;
    setIsOpen(false);
    setQuery('');
    if (onCloseMobile) onCloseMobile();
    navigate(item.path);
  };

  // Keyboard navigation: ArrowUp, ArrowDown, Enter, Esc
  const handleKeyDown = (e) => {
    if (!isOpen || searchResults.length === 0) {
      if (e.key === 'Enter' && query.trim()) {
        navigate('/services');
        setIsOpen(false);
        if (onCloseMobile) onCloseMobile();
      }
      return;
    }

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
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Clean Navbar Search Input */}
      <div className="relative flex items-center">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (hasQuery) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search services..."
          className={`w-full pl-8 pr-10 py-1.5 text-xs md:text-[13px] bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-slate-800 placeholder:text-slate-400 rounded-full border border-slate-200 focus:border-[#111827] focus:outline-none focus:ring-2 focus:ring-[#111827]/15 transition-all duration-200 font-medium ${
            !isMobile ? 'w-32 lg:w-36 xl:w-44 focus:w-60' : 'w-full'
          }`}
          aria-label="Search services"
        />

        {/* Clear Button or Quick ⌘K indicator */}
        <div className="absolute right-2 flex items-center gap-1">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-slate-400 hover:text-slate-600 transition"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            !isMobile && (
              <kbd className="hidden xl:inline-flex items-center text-[10px] text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono pointer-events-none">
                ⌘K
              </kbd>
            )
          )}
        </div>
      </div>

      {/* Standard Clean Suggestion Dropdown (Only opens when typing keywords) */}
      {isOpen && hasQuery && (
        <div
          className={`absolute z-50 bg-white rounded-xl shadow-xl border border-slate-200/90 overflow-hidden animate-in fade-in duration-100 ${
            isMobile
              ? 'left-0 right-0 top-full mt-1.5 w-full'
              : 'right-0 top-full mt-1.5 w-[360px] sm:w-[400px]'
          }`}
        >
          {searchResults.length > 0 ? (
            <div className="py-1">
              {searchResults.map((item, index) => {
                const isSelected = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left transition-colors cursor-pointer group ${
                      isSelected
                        ? 'bg-slate-100/90 text-[#111827]'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {/* Left: Icon + Highlighted Title */}
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <Search
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isSelected ? 'text-[#111827]' : 'text-slate-400'
                        }`}
                      />
                      <span className="text-xs sm:text-[13px] font-medium text-slate-800 truncate">
                        <HighlightMatch text={item.title} query={query} />
                      </span>
                    </div>

                    {/* Right: Category + Clean Arrow */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          isSelected
                            ? 'text-[#F26522] translate-x-0.5'
                            : 'text-slate-300 group-hover:text-slate-500'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}

              {/* Minimal Keyboard Instruction Footer */}
              <div className="px-3.5 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Press <strong className="text-slate-600 font-semibold font-mono">↵</strong> to open match</span>
                <span><kbd className="font-mono text-[10px]">↑↓</kbd> navigate</span>
              </div>
            </div>
          ) : (
            /* Clean Empty State */
            <div className="p-4 text-center space-y-2">
              <p className="text-xs text-slate-600">
                No matching service for "<strong>{query}</strong>"
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/services');
                  if (onCloseMobile) onCloseMobile();
                }}
                className="text-xs font-bold text-[#111827] hover:text-[#F26522] transition"
              >
                Browse All Services Directory →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
