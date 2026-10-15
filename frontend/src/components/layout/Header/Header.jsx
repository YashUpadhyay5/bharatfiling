import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import AuthRequiredModal from '../../common/AuthRequiredModal.jsx';
import NotificationBell from '../../common/NotificationBell.jsx';
import BrandLogo from './BrandLogo.jsx';
import CategoryDropdown from './CategoryDropdown.jsx';
import UserMenu from './UserMenu.jsx';
import MoreMenu from './MoreMenu.jsx';
import MobileDrawer from './MobileDrawer.jsx';
import HeaderSearch from './HeaderSearch.jsx';
import { SERVICE_CATEGORIES, getDashboardPath } from './navigationData.js';
import { FOCUS_RING_ON_DARK, HEADER_NAVY } from './shared.js';

// Public information pages never require an account (same rule the search palette uses).
const PUBLIC_INFO_PATHS = ['/', '/about', '/faq', '/pricing', '/contact', '/services'];

// The full tab row needs ~1280px; below that the compact header + drawer is used.
const DESKTOP_MEDIA_QUERY = '(min-width: 1280px)';

// "Consult an Expert" is the Consultation category, promoted to the yellow call-to-action.
const NAV_CATEGORIES = SERVICE_CATEGORIES.filter((c) => c.key !== 'consultation');
const CONSULT_CATEGORY = SERVICE_CATEGORIES.find((c) => c.key === 'consultation');

/** Small filled caret used on the yellow button (matches the reference). */
function Caret({ open }) {
  return (
    <svg
      viewBox="0 0 10 6"
      aria-hidden="true"
      className={`h-1.5 w-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path d="M0 0h10L5 6z" fill="currentColor" />
    </svg>
  );
}

/**
 * Site header (navy bar).
 *
 *   [Logo] [Consult an Expert v]   Home  Startup v  Registrations v ... Compliance v  Pricing   [search] [Login] [=]
 *
 * Desktop (>= 1280px): one row, every category visible with its own hover dropdown; the hamburger
 * opens a small white list of secondary links.
 * Below that: the same links live in the slide-in drawer.
 *
 * Fixed to the top so page content scrolls underneath; MainLayout reserves the matching 68px.
 * The sign-in modal, mobile drawer and search dialog are rendered outside <header>, so the
 * backdrop blur can never trap their fixed overlays.
 */
export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openKey, setOpenKey] = useState(null); // category whose dropdown is open
  const [moreOpen, setMoreOpen] = useState(false); // hamburger list (desktop)
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // drawer (below desktop)
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedServiceForAuth, setSelectedServiceForAuth] = useState(null);

  const headerRef = useRef(null);
  const tabRefs = useRef({});
  const userTriggerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const menuTimer = useRef(null);

  const dashboardPath = getDashboardPath(user?.role);
  const trackPath = isAuthenticated ? dashboardPath : '/dashboard';

  const closePopovers = () => {
    setOpenKey(null);
    setMoreOpen(false);
    setUserMenuOpen(false);
  };

  /* ----- dropdown open/close with hover intent (mouse only; touch & keyboard use click) ----- */
  const clearMenuTimer = () => {
    clearTimeout(menuTimer.current);
    menuTimer.current = null;
  };

  const hoverOpen = (key) => {
    clearMenuTimer();
    setUserMenuOpen(false);
    setMoreOpen(false);
    // Already browsing the menus: switch instantly. Otherwise wait briefly so a passing pointer does not flash a menu.
    if (openKey) setOpenKey(key);
    else menuTimer.current = setTimeout(() => setOpenKey(key), 90);
  };

  const hoverClose = () => {
    clearMenuTimer();
    menuTimer.current = setTimeout(() => setOpenKey(null), 160);
  };

  const toggleMenu = (key) => {
    clearMenuTimer();
    setUserMenuOpen(false);
    setMoreOpen(false);
    setOpenKey((current) => (current === key ? null : key));
  };

  useEffect(() => clearMenuTimer, []);

  /* ----- close everything when the route changes ----- */
  useEffect(() => {
    setOpenKey(null);
    setMoreOpen(false);
    setUserMenuOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  /* ----- elevation once the page is scrolled ----- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ----- outside click / Escape for the desktop popovers ----- */
  useEffect(() => {
    if (!openKey && !userMenuOpen && !moreOpen) return undefined;

    const onPointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) closePopovers();
    };
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (openKey) tabRefs.current[openKey]?.focus();
      if (userMenuOpen) userTriggerRef.current?.focus();
      if (moreOpen) hamburgerRef.current?.focus();
      closePopovers();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openKey, userMenuOpen, moreOpen]);

  /* ----- drawer must not outlive the mobile breakpoint ----- */
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const onChange = (e) => {
      if (e.matches) setMobileOpen(false);
      else setMoreOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    hamburgerRef.current?.focus({ preventScroll: true });
  }, []);

  /* ----- hamburger: small list on desktop, full drawer below ----- */
  const handleHamburger = () => {
    setOpenKey(null);
    setUserMenuOpen(false);
    if (window.matchMedia(DESKTOP_MEDIA_QUERY).matches) setMoreOpen((v) => !v);
    else setMobileOpen(true);
  };

  /* ----- service links: gated behind sign-in, public info pages are not ----- */
  const handleServiceClick = (e, item, categoryLabel) => {
    setOpenKey(null);
    setMobileOpen(false);

    if (isAuthenticated || PUBLIC_INFO_PATHS.includes(item.path)) return;

    e.preventDefault();
    setSelectedServiceForAuth({
      title: item.name,
      path: item.path,
      category: categoryLabel || 'Service',
      price: 'Transparent Pricing',
      period: 'CA Audited Filing',
    });
    setAuthModalOpen(true);
  };

  const handleHomeClick = (e) => {
    setOpenKey(null);
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    setMobileOpen(false);
    logout();
    navigate('/');
  };

  const tabClass = (active) =>
    [
      'relative isolate inline-flex h-full items-center gap-1 whitespace-nowrap px-1 text-[12.5px] font-medium transition-colors',
      'min-[1366px]:px-1.5 min-[1366px]:text-[13px] min-[1440px]:px-2 min-[1440px]:text-[14px]',
      // Keyboard focus: a soft pill + the accent underline (never a boxed outline).
      // outline-hidden still draws a visible outline in Windows high-contrast mode.
      'focus-visible:outline-hidden focus-visible:text-white focus-visible:after:scale-x-100',
      'before:absolute before:inset-x-0 before:inset-y-3.5 before:-z-10 before:rounded-lg before:bg-white/10 before:opacity-0 before:transition-opacity focus-visible:before:opacity-100',
      'after:absolute after:inset-x-1 after:-bottom-px after:h-[2px] after:rounded-full after:bg-[#F26522]',
      'min-[1366px]:after:inset-x-1.5 min-[1440px]:after:inset-x-2 after:transition-transform after:duration-200',
      active ? 'text-white after:scale-x-100' : 'text-white/85 hover:text-white after:scale-x-0 hover:after:scale-x-100',
    ].join(' ');

  const isHome = pathname === '/';
  const isPricing = pathname.startsWith('/pricing');

  /** A tab (or the CTA) that owns a hover/click dropdown. */
  const renderMenuItem = (cat, button, extraClass = '') => {
    const isOpen = openKey === cat.key;
    const menuId = `nav-menu-${cat.key}`;
    return (
      <li
        key={cat.key}
        className={`relative flex ${extraClass}`}
        onPointerEnter={(e) => e.pointerType === 'mouse' && hoverOpen(cat.key)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && hoverClose()}
        onBlur={(e) => {
          const next = e.relatedTarget;
          if (next && !e.currentTarget.contains(next) && openKey === cat.key) setOpenKey(null);
        }}
      >
        {button(isOpen, menuId)}
        {isOpen && <CategoryDropdown id={menuId} category={cat} onItemClick={handleServiceClick} />}
      </li>
    );
  };

  return (
    <>
      {/* Keyboard users can jump straight to the page content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#062A4D]"
      >
        Skip to main content
      </a>

      <header
        ref={headerRef}
        style={{ backgroundColor: `${HEADER_NAVY}F2` }}
        className={`fixed inset-x-0 top-0 z-40 w-full font-sans text-white backdrop-blur-md transition-shadow duration-200 print:hidden ${
          scrolled ? 'shadow-[0_10px_30px_-14px_rgba(0,0,0,0.55)]' : 'shadow-[0_1px_0_rgba(255,255,255,0.06)]'
        }`}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[1760px] items-center gap-3 px-3 sm:px-6 lg:px-8">
          <BrandLogo onDark />

          {/* Consult an Expert (yellow call-to-action = the Consultation menu) */}
          <ul className="hidden items-center sm:flex">
            {renderMenuItem(CONSULT_CATEGORY, (isOpen, menuId) => (
              <button
                ref={(el) => {
                  tabRefs.current[CONSULT_CATEGORY.key] = el;
                }}
                type="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={menuId}
                onClick={() => toggleMenu(CONSULT_CATEGORY.key)}
                className={`inline-flex items-center gap-2 rounded-md bg-gradient-to-b from-[#FFC928] to-[#F4A900] px-3 py-2 text-[13px] font-semibold text-[#1B2A3A] shadow-sm transition hover:brightness-105 min-[1440px]:px-4 min-[1440px]:text-[14.5px] ${FOCUS_RING_ON_DARK}`}
              >
                Consult an Expert
                <Caret open={isOpen} />
              </button>
            ))}
          </ul>

          {/* Primary navigation: every other service category is visible (desktop) */}
          <nav aria-label="Primary" className="hidden h-full min-w-0 flex-1 xl:block">
            <ul className="flex h-full items-stretch justify-center">
              <li className="flex">
                <Link
                  to="/"
                  onClick={handleHomeClick}
                  aria-current={isHome ? 'page' : undefined}
                  className={tabClass(isHome)}
                >
                  Home
                </Link>
              </li>

              {NAV_CATEGORIES.map((cat) =>
                renderMenuItem(cat, (isOpen, menuId) => (
                  <button
                    ref={(el) => {
                      tabRefs.current[cat.key] = el;
                    }}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    onClick={() => toggleMenu(cat.key)}
                    className={tabClass(isOpen)}
                  >
                    {cat.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 min-[1440px]:h-4 min-[1440px]:w-4 ${
                        isOpen ? 'rotate-180 text-white' : 'text-white/70'
                      }`}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </button>
                ))
              )}

              <li className="flex">
                <Link to="/pricing" aria-current={isPricing ? 'page' : undefined} className={tabClass(isPricing)}>
                  Pricing
                </Link>
              </li>
            </ul>
          </nav>

          {/* Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-2.5 xl:ml-0" onPointerDown={() => setOpenKey(null)}>
            <HeaderSearch variant="header" />

            {isAuthenticated && <NotificationBell />}

            {isAuthenticated ? (
              <div className="hidden sm:block">
                <UserMenu
                  user={user}
                  open={userMenuOpen}
                  triggerRef={userTriggerRef}
                  onToggle={() => {
                    setOpenKey(null);
                    setMoreOpen(false);
                    setUserMenuOpen((v) => !v);
                  }}
                  onClose={() => setUserMenuOpen(false)}
                  onLogout={handleLogout}
                />
              </div>
            ) : (
              <Link
                to="/login"
                className={`hidden rounded-md border border-white/80 px-5 py-2 text-[14px] font-medium text-white transition hover:bg-white/10 sm:inline-block min-[1440px]:text-[15px] ${FOCUS_RING_ON_DARK}`}
              >
                Login
              </Link>
            )}

            {/* Hamburger: white list on desktop, drawer below */}
            <div className="relative">
              <button
                ref={hamburgerRef}
                type="button"
                onClick={handleHamburger}
                aria-label="Open menu"
                aria-haspopup="true"
                aria-expanded={moreOpen || mobileOpen}
                className={`flex h-10 w-10 items-center justify-center rounded-md text-white transition hover:bg-white/10 ${FOCUS_RING_ON_DARK}`}
              >
                <Menu className="h-7 w-7" strokeWidth={2.25} aria-hidden="true" />
              </button>
              {moreOpen && (
                <MoreMenu
                  id="more-menu"
                  isAuthenticated={isAuthenticated}
                  trackPath={trackPath}
                  onClose={() => setMoreOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={mobileOpen}
        onClose={closeMobile}
        pathname={pathname}
        user={user}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onItemClick={handleServiceClick}
      />

      {/* Rendered outside <header> so its fixed overlay is never affected by the header */}
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
