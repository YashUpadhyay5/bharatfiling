import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  Home,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  Search,
} from 'lucide-react';
import NavbarSearch from './NavbarSearch.jsx';
import AuthRequiredModal from './AuthRequiredModal.jsx';
import NotificationBell from './NotificationBell.jsx';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedServiceForAuth, setSelectedServiceForAuth] = useState(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Lock background body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
        setUserDropdown(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setUserDropdown(false);
  }, [location.pathname]);

  const handleServiceClick = (e, item, categoryLabel) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveDropdown(null);

    if (!isAuthenticated) {
      e.preventDefault();
      setSelectedServiceForAuth({
        title: item.name,
        path: item.path,
        category: categoryLabel || 'Service',
        price: 'Transparent Pricing',
        period: 'CA Audited Filing',
      });
      setAuthModalOpen(true);
    }
  };

  const handleMobileServiceClick = (e, item, categoryLabel) => {
    setMobileMenuOpen(false);

    if (!isAuthenticated) {
      e.preventDefault();
      setSelectedServiceForAuth({
        title: item.name,
        path: item.path,
        category: categoryLabel || 'Service',
        price: 'Transparent Pricing',
        period: 'CA Audited Filing',
      });
      setAuthModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleMouseEnter = (key) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const menuCategories = [
    {
      key: 'startup',
      label: 'Startup',
      col1: [
        { name: 'Proprietorship', path: '/apply/gst' },
        { name: 'Partnership', path: '/services/company-registration' },
        { name: 'One Person Company', path: '/services/company-registration' },
        { name: 'Limited Liability Partnership', path: '/services/llp-registration' },
        { name: 'Private Limited Company', path: '/services/company-registration' },
      ],
      col2: [
        { name: 'Section 8 Company', path: '/services/company-registration' },
        { name: 'Trust Registration', path: '/services/company-registration' },
        { name: 'Public Limited Company', path: '/services/company-registration' },
        { name: 'Producer Company', path: '/services/company-registration' },
        { name: 'Indian Subsidiary', path: '/services/company-registration' },
      ],
    },
    {
      key: 'registrations',
      label: 'Registrations',
      col1: [
        { name: 'GST Registration', path: '/apply/gst', isLive: true },
        { name: 'MSME / Udyam Registration', path: '/apply/udyam', isLive: true },
        { name: 'Import Export Code (IEC)', path: '/services' },
        { name: 'FSSAI Food License', path: '/services' },
        { name: 'Professional Tax (PT)', path: '/services' },
      ],
      col2: [
        { name: 'Shop & Establishment', path: '/services' },
        { name: 'Digital Signature (DSC)', path: '/services' },
        { name: 'PF & ESI Registration', path: '/services' },
        { name: 'PAN & TAN Registration', path: '/services' },
        { name: 'APEDA Registration', path: '/services' },
      ],
    },
    {
      key: 'trademark',
      label: 'Trademark',
      col1: [
        { name: 'Trademark Registration', path: '/services/trademark' },
        { name: 'Trademark Search', path: '/services/trademark' },
        { name: 'Trademark Objection Reply', path: '/services/trademark' },
        { name: 'Trademark Opposition', path: '/services/trademark' },
        { name: 'Trademark Renewal', path: '/services/trademark' },
      ],
      col2: [
        { name: 'Copyright Registration', path: '/services/trademark' },
        { name: 'Patent Registration', path: '/services/trademark' },
        { name: 'Logo Design & IP Protection', path: '/services/trademark' },
        { name: 'Provisional Patent', path: '/services/trademark' },
        { name: 'Trademark Assignment', path: '/services/trademark' },
      ],
    },
    {
      key: 'gst',
      label: 'GST',
      col1: [
        { name: 'GST Registration', path: '/apply/gst', isLive: true },
        { name: 'GST Return Filing (GSTR-1 & 3B)', path: '/services/gst-return' },
        { name: 'GSTR-9 Annual Return', path: '/services/gst-return' },
        { name: 'GSTR-2B ITC Reconciliation', path: '/services/gst-return' },
        { name: 'GST LUT for Exporters', path: '/services/gst-registration' },
      ],
      col2: [
        { name: 'Clarification (Notice REG-03)', path: '/services/gst-registration' },
        { name: 'GST Invoicing & E-Way Bill', path: '/services/gst-registration' },
        { name: 'Composition Scheme Opt-in', path: '/services/gst-registration' },
        { name: 'GST Assessment Advisory', path: '/services/gst-registration' },
        { name: 'GST Cancellation & Revocation', path: '/services/gst-registration' },
      ],
    },
    {
      key: 'income-tax',
      label: 'Income Tax',
      col1: [
        { name: 'HRA Tax Calculator (Sec 10(13A))', path: '/tools/hra-calculator', isLive: true },
        { name: 'Income Tax Return (ITR 1–4)', path: '/services/income-tax' },
        { name: 'Business Tax Return (ITR 5–7)', path: '/services/income-tax' },
        { name: 'TDS Return Filing (24Q / 26Q)', path: '/services/income-tax' },
        { name: 'Tax Planning Consultation', path: '/services/income-tax' },
      ],
      col2: [
        { name: '15CA / 15CB Certification', path: '/services/income-tax' },
        { name: 'Income Tax Notice Response', path: '/services/income-tax' },
        { name: 'Capital Gains Advisory', path: '/services/income-tax' },
        { name: 'Advance Tax Computation', path: '/services/income-tax' },
        { name: 'Form 16 Generation', path: '/services/income-tax' },
      ],
    },
    {
      key: 'mca',
      label: 'MCA',
      col1: [
        { name: 'Company Annual ROC Filing', path: '/services/llp-registration' },
        { name: 'LLP Form 11 & Form 8', path: '/services/llp-registration' },
        { name: 'Director KYC (DIR-3 KYC)', path: '/services/llp-registration' },
        { name: 'Add / Remove Director', path: '/services/llp-registration' },
        { name: 'Increase Authorized Capital', path: '/services/llp-registration' },
      ],
      col2: [
        { name: 'Change Registered Office', path: '/services/llp-registration' },
        { name: 'MOA / AOA Amendment', path: '/services/llp-registration' },
        { name: 'Strike Off Company', path: '/services/llp-registration' },
        { name: 'Strike Off LLP', path: '/services/llp-registration' },
        { name: 'Charge Satisfaction (CHG-1)', path: '/services/llp-registration' },
      ],
    },
    {
      key: 'compliance',
      label: 'Compliance',
      col1: [
        { name: 'Monthly Payroll Management', path: '/services/legal' },
        { name: 'PF & ESI Monthly Returns', path: '/services/legal' },
        { name: 'Statutory TDS Compliance', path: '/services/legal' },
        { name: 'Secretarial Audit & Registers', path: '/services/legal' },
      ],
      col2: [
        { name: 'Shop Act Renewal', path: '/services/legal' },
        { name: 'Factory License Compliance', path: '/services/legal' },
        { name: 'Environmental Consent (PCB)', path: '/services/legal' },
        { name: 'Contract Drafting & NDAs', path: '/services/legal' },
      ],
    },
    {
      key: 'consultation',
      label: 'Consultation',
      col1: [
        { name: 'CA Consultation', path: '/contact' },
        { name: 'Legal Consultation', path: '/contact' },
        { name: 'Startup Structuring Advisory', path: '/contact' },
      ],
      col2: [
        { name: 'GST Notice Hearing Representation', path: '/contact' },
        { name: 'Income Tax Dispute & Appeals', path: '/contact' },
        { name: 'Trademark Hearing Support', path: '/contact' },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] font-sans">
      <nav className="w-full max-w-[1480px] mx-auto px-3 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
        {/* Left Section: Brand Logo & 8 Main Category Tabs */}
        <div className="flex items-center min-w-0">
          {/* Brand Logo with clean spacing */}
          <Link
            to="/"
            title="Return to BharatFiling Homepage"
            className="flex items-center gap-2 shrink-0 group active:scale-95 transition-transform mr-4 xl:mr-6"
          >
            <img
              src="/bharatfiling-brand-icon.png"
              alt="BharatFiling"
              className="h-8 sm:h-9 w-auto object-contain shrink-0"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
              }}
            />
            <div className="flex items-baseline font-black tracking-tight text-lg sm:text-xl leading-none select-none">
              <span className="text-[#111827]">Bharat</span>
              <span className="text-[#F26522]">Filing</span>
            </div>
          </Link>

          {/* Desktop 8 Navigation Tabs (Exact IndiaFilings Tabs - Zero-Wrap) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-3 2xl:gap-4.5 whitespace-nowrap">
            {menuCategories.map((cat) => (
              <div
                key={cat.key}
                className="relative py-5"
                onMouseEnter={() => handleMouseEnter(cat.key)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center gap-0.5 xl:gap-1 text-[12px] xl:text-[13px] font-medium transition-colors hover:text-[#111827] py-1 whitespace-nowrap ${
                    activeDropdown === cat.key ? 'text-[#111827] font-semibold' : 'text-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <ChevronDown
                    className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                      activeDropdown === cat.key ? 'rotate-180 text-[#111827]' : ''
                    }`}
                  />
                </button>

                {/* 2-Column Hover Mega-Dropdown */}
                {activeDropdown === cat.key && (
                  <div
                    className={`absolute top-[58px] ${
                      ['mca', 'compliance', 'consultation'].includes(cat.key) ? 'right-0' : 'left-0'
                    } bg-white rounded-2xl shadow-[0_16px_45px_rgba(17,24,39,0.12)] border border-slate-100 p-5 min-w-[420px] max-w-[500px] z-50 animate-fade-in`}
                    onMouseEnter={() => handleMouseEnter(cat.key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                      {/* Left Column */}
                      <div className="space-y-1">
                        {cat.col1.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={(e) => handleServiceClick(e, item, cat.label)}
                            className="flex items-center justify-between text-[12.5px] text-slate-700 hover:text-[#111827] hover:bg-slate-50 px-2 py-1.5 rounded-lg font-medium transition-all group"
                          >
                            <span>{item.name}</span>
                            {item.isLive && (
                              <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                                Live
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-1">
                        {cat.col2.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={(e) => handleServiceClick(e, item, cat.label)}
                            className="block text-[12.5px] text-slate-700 hover:text-[#111827] hover:bg-slate-50 px-2 py-1.5 rounded-lg font-medium transition-all"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Direct Pricing Link */}
            <Link
              to="/pricing"
              className={`text-[12px] xl:text-[13px] font-medium transition-colors hover:text-[#111827] py-1 whitespace-nowrap ${
                location.pathname === '/pricing' ? 'text-[#111827] font-semibold' : 'text-slate-700'
              }`}
            >
              Pricing
            </Link>
          </div>
        </div>

        {/* Right Section: Compact Expandable Search Tab + Auth Controls */}
        <div className="hidden lg:flex items-center gap-2.5 xl:gap-3.5 shrink-0">
          {/* Instant Search Tab */}
          <NavbarSearch />

          {isAuthenticated && <NotificationBell />}

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
              >
                <div className="w-7 h-7 rounded-full bg-slate-100 text-[#111827] font-bold flex items-center justify-center text-xs">
                  {user?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                    {user?.full_name?.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-slate-500 capitalize">{user?.role?.toLowerCase()}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1 z-50">
                  {/* Dedicated Return to Home option */}
                  <Link
                    to="/"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#111827] transition"
                  >
                    <Home className="w-3.5 h-3.5 text-slate-400" />
                    BharatFiling Home
                  </Link>

                  <Link
                    to={
                      user?.role === 'CA'
                        ? '/ca/dashboard'
                        : user?.role === 'ADMIN'
                        ? '/admin'
                        : '/dashboard'
                    }
                    onClick={() => setUserDropdown(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#111827] transition"
                  >
                    {user?.role === 'CA'
                      ? 'CA Workbench'
                      : user?.role === 'ADMIN'
                      ? 'Admin Portal'
                      : 'My Dashboard'}
                  </Link>

                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdown(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-50 transition"
                  >
                    Master Profile
                  </Link>

                  <button
                    onClick={() => {
                      setUserDropdown(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-full bg-white px-4 py-1.5 text-[12.5px] font-semibold text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs transition"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-[#111827] hover:bg-[#1F2937] text-white px-4 py-1.5 text-[12.5px] font-bold shadow-xs hover:shadow transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Header Controls */}
        <div className="lg:hidden flex items-center gap-1.5">
          {isAuthenticated && <NotificationBell />}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Backdrop & Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          {/* Dimmed Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Body */}
          <div
            className="relative w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in-right overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white shrink-0">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <img
                  src="/bharatfiling-brand-icon.png"
                  alt="BharatFiling"
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
                  }}
                />
                <div className="flex items-baseline font-black tracking-tight text-lg leading-none">
                  <span className="text-[#111827]">Bharat</span>
                  <span className="text-[#F26522]">Filing</span>
                </div>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition touch-target-safe flex items-center justify-center cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {/* Mobile Instant Search Tab */}
              <div className="pb-1">
                <NavbarSearch isMobile onCloseMobile={() => setMobileMenuOpen(false)} />
              </div>

              <div className="space-y-1">
                {/* Top Home link for mobile */}
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3.5 py-3 text-sm font-bold rounded-xl transition ${
                    location.pathname === '/'
                      ? 'bg-slate-100 text-[#111827]'
                      : 'text-slate-800 hover:bg-slate-50 active:bg-slate-100'
                  }`}
                >
                  <Home className="w-4 h-4 text-slate-500 shrink-0" />
                  Home
                </Link>

                {menuCategories.map((cat) => (
                  <div key={cat.key} className="border-b border-slate-100 pb-1">
                    <button
                      onClick={() =>
                        setMobileExpandedCat(mobileExpandedCat === cat.key ? null : cat.key)
                      }
                      className="w-full flex items-center justify-between px-3.5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 active:bg-slate-100 rounded-xl transition cursor-pointer"
                    >
                      <span>{cat.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          mobileExpandedCat === cat.key ? 'rotate-180 text-[#111827]' : ''
                        }`}
                      />
                    </button>

                    {mobileExpandedCat === cat.key && (
                      <div className="px-2 py-2 space-y-1 bg-slate-50/80 rounded-2xl mt-1 mb-2 animate-fade-in">
                        {[...cat.col1, ...cat.col2].map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={(e) => handleMobileServiceClick(e, item, cat.label)}
                            className="flex items-center justify-between px-3 py-2.5 text-xs font-medium text-slate-700 hover:text-[#111827] hover:bg-white active:bg-slate-100 rounded-xl transition"
                          >
                            <span>{item.name}</span>
                            {item.isLive && (
                              <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                                Live
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <Link
                  to="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 text-sm font-semibold rounded-xl transition ${
                    location.pathname === '/pricing'
                      ? 'bg-slate-100 text-[#111827] font-bold'
                      : 'text-slate-800 hover:bg-slate-50 active:bg-slate-100'
                  }`}
                >
                  Pricing
                </Link>
              </div>
            </div>

            {/* Fixed Drawer Footer Actions with Safe-Area Inset */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80 shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to={
                      user?.role === 'CA'
                        ? '/ca/dashboard'
                        : user?.role === 'ADMIN'
                        ? '/admin'
                        : '/dashboard'
                    }
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-3 rounded-full bg-[#111827] text-white font-bold text-sm block shadow-sm active:scale-98 transition"
                  >
                    Go to {user?.role === 'CA' ? 'CA Workbench' : user?.role === 'ADMIN' ? 'Admin Portal' : 'My Dashboard'}
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-2.5 text-rose-600 font-semibold text-xs hover:bg-rose-50 active:bg-rose-100 rounded-full transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2.5">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-3 rounded-full border border-slate-300 bg-white text-slate-800 font-bold text-xs shadow-xs active:scale-98 transition"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center py-3 rounded-full bg-[#111827] text-white font-bold text-xs shadow-xs active:scale-98 transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Authentication Required Popup Modal */}
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
    </header>
  );
}
