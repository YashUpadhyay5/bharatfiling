import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import AuthRequiredModal from '../../common/AuthRequiredModal.jsx';
import NotificationBell from '../../common/NotificationBell.jsx';
import BrandLogo from './BrandLogo.jsx';
import CategoryDropdown from './CategoryDropdown.jsx';
import UserMenu from './UserMenu.jsx';
import MobileDrawer from './MobileDrawer.jsx';
import HeaderSearch from './HeaderSearch.jsx';
import { SERVICE_CATEGORIES, getDashboardPath } from './navigationData.js';
import { FOCUS_RING } from './shared.js';

// Public information pages never require an account (same rule the search palette uses).
const PUBLIC_INFO_PATHS = ['/', '/about', '/faq', '/pricing', '/contact', '/services'];

// The full tab row needs ~1280px; below that the compact header + drawer is used.
const DESKTOP_MEDIA_QUERY = '(min-width: 1280px)';

/**
 * Site header.
 *
 * Fixed to the top with a translucent, blurred background so page content scrolls smoothly
 * underneath it. MainLayout reserves the matching 68px of space above the page content.
 * (The sign-in modal, mobile drawer and search dialog are rendered outside this element, so the
 * backdrop blur can never trap their fixed overlays.)
 *
 *   [ Logo ]   Home  Startup v  Registrations v  ...  Consultation v  Pricing   [ Search ] [ Log In ] [ Register ]
 *
 * Desktop (>= 1280px): one row, every category visible with its own hover dropdown.
 * Below that: logo + search + hamburger, the same links live in the slide-in drawer.
 */
export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openKey, setOpenKey] = useState(null); // category whose dropdown is open
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedServiceForAuth, setSelectedServiceForAuth] = useState(null);

  const headerRef = useRef(null);
  const tabRefs = useRef({});
  const userTriggerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const menuTimer = useRef(null);

  const dashboardPath = getDashboardPath(user?.role);

  /* ----- dropdown open/close with hover intent (mouse only; touch & keyboard use click) ----- */
  const clearMenuTimer = () => {
    clearTimeout(menuTimer.current);
    menuTimer.current = null;
  };

  const hoverOpen = (key) => {
    clearMenuTimer();
    setUserMenuOpen(false);
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
    setOpenKey((current) => (current === key ? null : key));
  };

  useEffect(() => clearMenuTimer, []);

  /* ----- close everything when the route changes ----- */
  useEffect(() => {
    setOpenKey(null);
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
    if (!openKey && !userMenuOpen) return undefined;

    const onPointerDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenKey(null);
        setUserMenuOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (openKey) {
        tabRefs.current[openKey]?.focus();
        setOpenKey(null);
      }
      if (userMenuOpen) {
        setUserMenuOpen(false);
        userTriggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openKey, userMenuOpen]);

  /* ----- drawer must not outlive the mobile breakpoint ----- */
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const onChange = (e) => {
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    hamburgerRef.current?.focus({ preventScroll: true });
  }, []);

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
      'relative inline-flex h-full items-center gap-1 whitespace-nowrap px-1.5 text-[12.5px] font-medium transition-colors',
      'min-[1366px]:px-2 min-[1366px]:text-[13px]',
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#111827]',
      'after:absolute after:inset-x-1.5 after:-bottom-px after:h-[2px] after:rounded-full after:bg-[#F26522]',
      'min-[1366px]:after:inset-x-2 after:transition-transform after:duration-200',
      active
        ? 'text-[#111827] after:scale-x-100'
        : 'text-slate-700 hover:text-[#111827] after:scale-x-0 hover:after:scale-x-100',
    ].join(' ');

  const isHome = pathname === '/';
  const isPricing = pathname.startsWith('/pricing');

  return (
    <>
      {/* Keyboard users can jump straight to the page content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[80] focus:rounded-lg focus:bg-[#111827] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 font-sans backdrop-blur-md transition-shadow duration-200 print:hidden ${
          scrolled ? 'shadow-[0_8px_24px_-14px_rgba(15,23,42,0.35)]' : 'shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
        }`}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[1600px] items-center gap-3 px-3 sm:px-6 lg:px-8">
          <BrandLogo />

          {/* Primary navigation: every service category is visible (desktop) */}
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

              {SERVICE_CATEGORIES.map((cat, index) => {
                const isOpen = openKey === cat.key;
                const menuId = `nav-menu-${cat.key}`;
                return (
                  <li
                    key={cat.key}
                    className="relative flex"
                    onPointerEnter={(e) => e.pointerType === 'mouse' && hoverOpen(cat.key)}
                    onPointerLeave={(e) => e.pointerType === 'mouse' && hoverClose()}
                    onBlur={(e) => {
                      const next = e.relatedTarget;
                      if (next && !e.currentTarget.contains(next) && openKey === cat.key) setOpenKey(null);
                    }}
                  >
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
                        className={`h-3 w-3 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#111827]' : 'text-slate-400'
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <CategoryDropdown
                        id={menuId}
                        category={cat}
                        alignRight={index >= SERVICE_CATEGORIES.length - 3}
                        onItemClick={handleServiceClick}
                      />
                    )}
                  </li>
                );
              })}

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

            {/* Account (desktop) */}
            <div className="hidden items-center gap-2 xl:flex">
              {isAuthenticated ? (
                <UserMenu
                  user={user}
                  open={userMenuOpen}
                  triggerRef={userTriggerRef}
                  onToggle={() => {
                    setOpenKey(null);
                    setUserMenuOpen((v) => !v);
                  }}
                  onClose={() => setUserMenuOpen(false)}
                  onLogout={handleLogout}
                />
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[12.5px] font-semibold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 ${FOCUS_RING}`}
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className={`rounded-full bg-[#111827] px-4 py-1.5 text-[12.5px] font-bold text-white shadow-xs transition hover:bg-[#1F2937] hover:shadow ${FOCUS_RING}`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Menu button (below desktop width) */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 xl:hidden ${FOCUS_RING}`}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
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

      {/* Rendered outside <header> so its fixed overlay is never affected by the sticky header */}
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
