import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import AuthRequiredModal from '../../common/AuthRequiredModal.jsx';
import NotificationBell from '../../common/NotificationBell.jsx';
import BrandLogo from './BrandLogo.jsx';
import UtilityBar from './UtilityBar.jsx';
import CategoryDropdown from './CategoryDropdown.jsx';
import UserMenu from './UserMenu.jsx';
import MobileDrawer from './MobileDrawer.jsx';
import HeaderSearch from './HeaderSearch.jsx';
import { SERVICE_CATEGORIES, getDashboardPath, getDashboardLabel } from './navigationData.js';
import { FOCUS_RING } from './shared.js';

// Public information pages never require an account (same rule the search palette uses).
const PUBLIC_INFO_PATHS = ['/', '/about', '/faq', '/pricing', '/contact', '/services'];

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
    const mq = window.matchMedia('(min-width: 1024px)');
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
      'relative inline-flex h-full items-center gap-1 px-2 xl:px-3 text-[13.5px] font-medium whitespace-nowrap transition-colors',
      'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#111827]',
      'after:absolute after:inset-x-2 xl:after:inset-x-3 after:-bottom-px after:h-[2px] after:rounded-full after:bg-[#F26522]',
      'after:transition-transform after:duration-200',
      active
        ? 'text-[#111827] after:scale-x-100'
        : 'text-slate-600 hover:text-[#111827] after:scale-x-0 hover:after:scale-x-100',
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

      <UtilityBar trackPath={isAuthenticated ? dashboardPath : '/dashboard'} />

      <header
        ref={headerRef}
        className={`sticky top-0 z-40 bg-white font-sans transition-shadow duration-200 print:hidden ${
          scrolled ? 'shadow-[0_10px_30px_-18px_rgba(15,23,42,0.4)]' : ''
        }`}
      >
        {/* Row 1: brand, search, account */}
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <BrandLogo />

          <div className="ml-auto lg:mx-8 lg:max-w-[560px] lg:flex-1 xl:mx-12">
            <HeaderSearch variant="bar" />
          </div>

          {/* Account (desktop) */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex" onPointerDown={() => setOpenKey(null)}>
            {isAuthenticated ? (
              <>
                <NotificationBell />
                <Link
                  to={dashboardPath}
                  className={`inline-flex h-10 items-center gap-2 rounded-full bg-[#111827] px-5 text-[13.5px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1F2937] ${FOCUS_RING}`}
                >
                  {getDashboardLabel(user?.role)}
                </Link>
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
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`inline-flex h-10 items-center rounded-full px-4 text-[13.5px] font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-[#111827] ${FOCUS_RING}`}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className={`group inline-flex h-10 items-center gap-1.5 rounded-full bg-[#111827] pl-5 pr-4 text-[13.5px] font-semibold text-white shadow-sm transition-colors hover:bg-[#1F2937] ${FOCUS_RING}`}
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile / tablet controls */}
          <div className="ml-1.5 flex items-center gap-1.5 lg:hidden">
            {isAuthenticated && <NotificationBell />}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 ${FOCUS_RING}`}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Row 2: every service category visible, each with its own dropdown (desktop) */}
        <nav aria-label="Primary" className="hidden border-y border-slate-200/80 lg:block">
          <ul className="mx-auto flex h-12 w-full max-w-7xl items-stretch justify-between px-4 sm:px-6 lg:px-8">
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
                      className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#111827]' : ''
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
