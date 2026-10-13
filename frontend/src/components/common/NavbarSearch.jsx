import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthRequiredModal from './AuthRequiredModal.jsx';
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

// Comprehensive structured directory of BharatFiling services
const SERVICES_DATA = [
  // 🏢 INCORPORATION
  {
    id: 'pvt-ltd',
    title: 'Private Limited Company',
    subtitle: 'Incorporate a Pvt Ltd company in India',
    category: 'INCORPORATION',
    badge: '🏢 INCORPORATION',
    path: '/services/company-registration',
    keywords: ['pvt ltd', 'company', 'incorporation', 'private limited', 'mca', 'spice+', 'startup'],
    isTrending: true,
  },
  {
    id: 'llp-reg',
    title: 'Limited Liability Partnership',
    subtitle: 'Register an LLP with limited liability',
    category: 'INCORPORATION',
    badge: '🏢 INCORPORATION',
    path: '/services/llp-registration',
    keywords: ['llp', 'partnership', 'limited liability', 'firm', 'partners', 'agreement'],
    isTrending: false,
  },
  {
    id: 'opc-reg',
    title: 'One Person Company',
    subtitle: 'Single-owner company registration',
    category: 'INCORPORATION',
    badge: '🏢 INCORPORATION',
    path: '/services/company-registration',
    keywords: ['opc', 'one person', 'solo', 'company', 'founder'],
    isTrending: false,
  },
  {
    id: 'partnership-firm',
    title: 'Partnership Firm',
    subtitle: 'Register a partnership firm in India',
    category: 'INCORPORATION',
    badge: '🏢 INCORPORATION',
    path: '/services/company-registration',
    keywords: ['partnership', 'firm', 'deed', 'registration', 'partners'],
    isTrending: false,
  },
  {
    id: 'proprietorship',
    title: 'Sole Proprietorship Firm',
    subtitle: 'Register a sole proprietorship business',
    category: 'INCORPORATION',
    badge: '🏢 INCORPORATION',
    path: '/apply/gst',
    keywords: ['proprietorship', 'sole trader', 'individual', 'business', 'shop'],
    isTrending: false,
  },
  {
    id: 'section-8',
    title: 'Section 8 Company',
    subtitle: 'NGO & non-profit entity registration',
    category: 'INCORPORATION',
    badge: '🏢 INCORPORATION',
    path: '/services/company-registration',
    keywords: ['section 8', 'ngo', 'non profit', 'trust', 'society', '12a', '80g'],
    isTrending: false,
  },

  // ™️ TRADEMARK
  {
    id: 'tm-reg',
    title: 'Trademark Registration',
    subtitle: 'Protect your brand name & logo in India',
    category: 'TRADEMARK',
    badge: '™️ TRADEMARK',
    path: '/services/trademark',
    keywords: ['trademark', 'tm', 'brand', 'logo', 'brand name', 'ipr', 'symbol'],
    isTrending: true,
  },
  {
    id: 'copyright-reg',
    title: 'Copyright Registration',
    subtitle: 'Register copyright for creative works',
    category: 'TRADEMARK',
    badge: '™️ TRADEMARK',
    path: '/services/trademark',
    keywords: ['copyright', 'art', 'music', 'books', 'software', 'content'],
    isTrending: false,
  },
  {
    id: 'tm-objection',
    title: 'Trademark Objection Reply',
    subtitle: 'Respond to examination report by IP examiner',
    category: 'TRADEMARK',
    badge: '™️ TRADEMARK',
    path: '/services/trademark',
    keywords: ['tm objection', 'examination report', 'section 9', 'section 11', 'reply'],
    isTrending: false,
  },
  {
    id: 'tm-search',
    title: 'Trademark Availability Search',
    subtitle: 'Free comprehensive public TM class check',
    category: 'TRADEMARK',
    badge: '™️ TRADEMARK',
    path: '/services/trademark',
    keywords: ['tm search', 'brand search', 'trademark check', 'class search', 'availability'],
    isTrending: false,
  },

  // 📊 GST & TAX
  {
    id: 'gst-apply',
    title: 'GST Registration',
    subtitle: 'New GSTIN registration for businesses',
    category: 'GST & TAX',
    badge: '📊 GST & TAX',
    path: '/apply/gst',
    keywords: ['gst', 'registration', 'gstin', 'apply', 'trn', 'new tax', 'certificate'],
    isTrending: true,
  },
  {
    id: 'gst-return',
    title: 'GST Return Filing (GSTR-1 & 3B)',
    subtitle: 'Monthly & quarterly GSTR filings with reconciliation',
    category: 'GST & TAX',
    badge: '📊 GST & TAX',
    path: '/services/gst-return',
    keywords: ['gst', 'return', 'gstr1', 'gstr3b', 'monthly filing', 'quarterly'],
    isTrending: false,
  },
  {
    id: 'itr-filing',
    title: 'Income Tax Return (ITR)',
    subtitle: 'Expert CA filing for individual & business',
    category: 'GST & TAX',
    badge: '📊 GST & TAX',
    path: '/services/income-tax',
    keywords: ['itr', 'tax', 'income tax', 'salary', 'capital gains', 'refund', 'itr 1', 'itr 4'],
    isTrending: true,
  },
  {
    id: 'tds-returns',
    title: 'TDS Return Filing (24Q / 26Q)',
    subtitle: 'Quarterly salary & vendor TDS compliance',
    category: 'GST & TAX',
    badge: '📊 GST & TAX',
    path: '/services/income-tax',
    keywords: ['tds', 'form 16', 'traces', '24q', '26q', 'tax deducted'],
    isTrending: false,
  },
  {
    id: 'gstr-9',
    title: 'GSTR-9 Annual Return',
    subtitle: 'Annual GST audit & turnover reconciliation',
    category: 'GST & TAX',
    badge: '📊 GST & TAX',
    path: '/services/gst-return',
    keywords: ['gstr9', 'annual return', 'audit', 'gst reconciliation', 'annual'],
    isTrending: false,
  },
  {
    id: '15ca-15cb',
    title: 'Form 15CA / 15CB Certification',
    subtitle: 'Foreign remittance CA certification',
    category: 'GST & TAX',
    badge: '📊 GST & TAX',
    path: '/services/income-tax',
    keywords: ['15ca', '15cb', 'foreign remittance', 'ca certificate', 'rbi'],
    isTrending: false,
  },

  // 📜 MCA & COMPLIANCE
  {
    id: 'roc-filing',
    title: 'Company Annual ROC Filing',
    subtitle: 'File AOC-4 and MGT-7 with MCA',
    category: 'MCA & COMPLIANCE',
    badge: '📜 MCA & COMPLIANCE',
    path: '/services/llp-registration',
    keywords: ['roc', 'mca', 'annual filing', 'aoc4', 'mgt7', 'balance sheet'],
    isTrending: false,
  },
  {
    id: 'dir3-kyc',
    title: 'Director KYC (DIR-3 KYC)',
    subtitle: 'Annual director verification on MCA',
    category: 'MCA & COMPLIANCE',
    badge: '📜 MCA & COMPLIANCE',
    path: '/services/llp-registration',
    keywords: ['dir-3', 'dir3', 'director kyc', 'din kyc', 'din'],
    isTrending: false,
  },
  {
    id: 'add-director',
    title: 'Add or Remove Director (DIR-12)',
    subtitle: 'DIR-12 appointment & resignation filings',
    category: 'MCA & COMPLIANCE',
    badge: '📜 MCA & COMPLIANCE',
    path: '/services/llp-registration',
    keywords: ['director', 'dir12', 'resignation', 'appointment', 'board'],
    isTrending: false,
  },
  {
    id: 'strike-off',
    title: 'Strike Off Company / LLP',
    subtitle: 'Fast-track closure of dormant entities',
    category: 'MCA & COMPLIANCE',
    badge: '📜 MCA & COMPLIANCE',
    path: '/services/llp-registration',
    keywords: ['strike off', 'close company', 'close llp', 'stk2', 'dormant'],
    isTrending: false,
  },

  // 🛡️ LICENSES & REGISTRATION
  {
    id: 'msme-reg',
    title: 'MSME / Udyam Registration',
    subtitle: 'Priority government subsidies & collateral-free loans',
    category: 'LICENSES & REGISTRATION',
    badge: '🛡️ LICENSES & REGISTRATION',
    path: '/services',
    keywords: ['msme', 'udyam', 'small business', 'subsidy', 'priority loan'],
    isTrending: false,
  },
  {
    id: 'fssai-food',
    title: 'FSSAI Food Safety License',
    subtitle: 'Food safety license for restaurants & food units',
    category: 'LICENSES & REGISTRATION',
    badge: '🛡️ LICENSES & REGISTRATION',
    path: '/services',
    keywords: ['fssai', 'food license', 'restaurant', 'cloud kitchen', 'foscos'],
    isTrending: false,
  },
  {
    id: 'iec-code',
    title: 'Import Export Code (IEC)',
    subtitle: 'Mandatory DGFT code for international trade',
    category: 'LICENSES & REGISTRATION',
    badge: '🛡️ LICENSES & REGISTRATION',
    path: '/services',
    keywords: ['iec', 'dgft', 'export license', 'import license', 'customs'],
    isTrending: false,
  },
  {
    id: 'dsc-token',
    title: 'Digital Signature Certificate (DSC)',
    subtitle: 'Class 3 USB cryptographic token for MCA & GST',
    category: 'LICENSES & REGISTRATION',
    badge: '🛡️ LICENSES & REGISTRATION',
    path: '/services',
    keywords: ['dsc', 'digital signature', 'class 3', 'emsigner', 'usb token'],
    isTrending: false,
  },

  // 💬 CONSULTATIONS & SUPPORT
  {
    id: 'talk-ca',
    title: 'Talk to Chartered Accountant (CA)',
    subtitle: '1-on-1 private consultation with experienced CA',
    category: 'CONSULTATION',
    badge: '💬 CONSULTATION',
    path: '/contact',
    keywords: ['talk to ca', 'ca consultation', 'chartered accountant', 'tax advice', 'consult'],
    isTrending: false,
  },
  {
    id: 'pricing-page',
    title: 'Transparent Pricing Plans',
    subtitle: 'All-inclusive CA filing packages & transparent fees',
    category: 'PRICING',
    badge: '💳 PRICING',
    path: '/pricing',
    keywords: ['pricing', 'plans', 'cost', 'fees', 'charges', 'packages'],
    isTrending: false,
  },
];

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

export default function NavbarSearch({ className = '', isMobile = false, onCloseMobile }) {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedServiceForAuth, setSelectedServiceForAuth] = useState(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Instant real-time suggestions whenever query changes
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const tokens = q.split(/\s+/).filter(Boolean);

    return SERVICES_DATA.map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const subLower = item.subtitle.toLowerCase();
      const catLower = item.category.toLowerCase();
      const allKeywords = item.keywords.join(' ').toLowerCase();

      // Exact or prefix match
      if (titleLower === q) score += 150;
      else if (titleLower.startsWith(q)) score += 100;
      else if (titleLower.includes(q)) score += 60;

      // Subtitle match
      if (subLower.includes(q)) score += 35;

      // Category match
      if (catLower.startsWith(q)) score += 40;
      else if (catLower.includes(q)) score += 20;

      // Token matches
      tokens.forEach((token) => {
        if (titleLower.includes(token)) score += 25;
        if (subLower.includes(token)) score += 15;
        if (allKeywords.includes(token)) score += 25;
      });

      return { ...item, score };
    })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query]);

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
    const handleGlobalKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsModalOpen(true);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Select service and navigate (requires login/register for services)
  const handleSelect = (item) => {
    if (!item) return;
    setIsModalOpen(false);
    setQuery('');
    if (onCloseMobile) onCloseMobile();

    const isInfoPage = ['/about', '/faq', '/pricing', '/contact', '/services'].includes(item.path);
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
      {!isMobile ? (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-full border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-all shadow-xs text-xs font-medium w-40 xl:w-44 shrink-0 group cursor-pointer ${className}`}
          aria-label="Search services (⌘K)"
          title="Search services (Press ⌘K or /)"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0" />
            <span className="truncate text-slate-400 group-hover:text-slate-600 font-normal">
              Search services...
            </span>
          </div>
          <kbd className="hidden sm:inline-flex items-center text-[10px] text-slate-400 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 font-mono pointer-events-none group-hover:border-slate-300">
            ⌘K
          </kbd>
        </button>
      ) : (
        /* Mobile Drawer Trigger */
        <button
          type="button"
          onClick={() => {
            setIsModalOpen(true);
            if (onCloseMobile) onCloseMobile();
          }}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-medium transition cursor-pointer ${className}`}
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400" />
            <span>Search GST, Trademark, Company...</span>
          </div>
          <kbd className="text-[10px] text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono">
            ⌘K
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
