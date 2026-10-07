import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  Home,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  Sparkles,
  Search,
} from 'lucide-react';
import NavbarSearch from './NavbarSearch.jsx';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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
      key: 'business-setup',
      label: 'Business Setup',
      col1Title: 'Company Incorporation',
      col1: [
        { name: 'Private Limited Company', path: '/services/company-registration' },
        { name: 'Limited Liability Partnership (LLP)', path: '/services/llp-registration' },
        { name: 'One Person Company (OPC)', path: '/services/company-registration' },
        { name: 'Sole Proprietorship', path: '/apply/gst' },
        { name: 'Partnership Firm', path: '/services/company-registration' },
        { name: 'Section 8 NGO Company', path: '/services/company-registration' },
      ],
      col2Title: 'Registrations & Licenses',
      col2: [
        { name: 'MSME / Udyam Registration', path: '/services' },
        { name: 'FSSAI Food License', path: '/services' },
        { name: 'Import Export Code (IEC)', path: '/services' },
        { name: 'Digital Signature (DSC)', path: '/services' },
        { name: 'Shop & Establishment', path: '/services' },
        { name: 'Professional Tax (PT)', path: '/services' },
      ],
    },
    {
      key: 'tax-gst',
      label: 'Tax & GST',
      col1Title: 'Goods & Services Tax',
      col1: [
        { name: 'GST Registration', path: '/apply/gst', isLive: true },
        { name: 'GST Return Filing (GSTR-1 & 3B)', path: '/services/gst-return' },
        { name: 'GSTR-9 Annual Return', path: '/services/gst-return' },
        { name: 'GSTR-2B ITC Reconciliation', path: '/services/gst-return' },
        { name: 'GST LUT for Exporters', path: '/services/gst-registration' },
        { name: 'Notice Clarification (REG-03)', path: '/services/gst-registration' },
      ],
      col2Title: 'Direct Tax & ITR',
      col2: [
        { name: 'Income Tax Return (ITR 1–4)', path: '/services/income-tax' },
        { name: 'Business Tax Return (ITR 5–7)', path: '/services/income-tax' },
        { name: 'TDS Return Filing (24Q / 26Q)', path: '/services/income-tax' },
        { name: 'Income Tax Notice Scrutiny', path: '/services/income-tax' },
        { name: '15CA / 15CB Foreign Remittance', path: '/services/income-tax' },
        { name: 'Advance Tax Advisory', path: '/services/income-tax' },
      ],
    },
    {
      key: 'legal-mca',
      label: 'Legal & MCA',
      col1Title: 'Trademark & IP',
      col1: [
        { name: 'Trademark Registration', path: '/services/trademark' },
        { name: 'Trademark Search & Class', path: '/services/trademark' },
        { name: 'Trademark Objection Reply', path: '/services/trademark' },
        { name: 'Copyright & Patent Filing', path: '/services/trademark' },
        { name: 'Trademark Opposition', path: '/services/trademark' },
      ],
      col2Title: 'Corporate Compliance & ROC',
      col2: [
        { name: 'Company Annual ROC Filing', path: '/services/llp-registration' },
        { name: 'Director KYC (DIR-3 KYC)', path: '/services/llp-registration' },
        { name: 'Add / Remove Director', path: '/services/llp-registration' },
        { name: 'Strike Off Company / LLP', path: '/services/llp-registration' },
        { name: 'Monthly Payroll Management', path: '/services/legal' },
      ],
    },
    {
      key: 'consultation',
      label: 'Consultation',
      col1Title: 'Expert Advisory',
      col1: [
        { name: 'Talk to Chartered Accountant', path: '/contact' },
        { name: 'Legal Consultation with Advocate', path: '/contact' },
        { name: 'Startup Structuring Advisory', path: '/contact' },
      ],
      col2Title: 'Disputes & Hearings',
      col2: [
        { name: 'GST Notice Hearing Representation', path: '/contact' },
        { name: 'Income Tax Dispute & Appeals', path: '/contact' },
        { name: 'Trademark Hearing Support', path: '/contact' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] font-sans">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
        {/* Left Section: Brand Logo & Consolidated Mega-Menu Navigation */}
        <div className="flex items-center">
          {/* Brand Logo with generous right margin */}
          <Link
            to="/"
            title="Return to BharatFiling Homepage"
            className="flex items-center gap-2.5 shrink-0 group active:scale-95 transition-transform mr-7 xl:mr-10"
          >
            <img
              src="/bharatfiling-brand-icon.png"
              alt="BharatFiling"
              className="h-9 sm:h-10 w-auto object-contain shrink-0"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/bharatfiling-horizontal-transparent.png';
              }}
            />
            <div className="flex items-baseline font-black tracking-tight text-xl sm:text-2xl leading-none select-none">
              <span className="text-[#0B1E36]">Bharat</span>
              <span className="text-[#F26522]">Filing</span>
            </div>
          </Link>

          {/* Desktop Consolidated Mega-Menus (Zero-Wrap & Spacious) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 whitespace-nowrap">
            {menuCategories.map((cat) => (
              <div
                key={cat.key}
                className="relative py-5"
                onMouseEnter={() => handleMouseEnter(cat.key)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 text-[13px] font-semibold transition-colors hover:text-[#0B1E36] py-1 whitespace-nowrap ${
                    activeDropdown === cat.key ? 'text-[#0B1E36]' : 'text-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      activeDropdown === cat.key ? 'rotate-180 text-[#0B1E36]' : ''
                    }`}
                  />
                </button>

                {/* 2-Column Hover Mega-Dropdown */}
                {activeDropdown === cat.key && (
                  <div
                    className="absolute top-[62px] left-0 bg-white rounded-2xl shadow-[0_20px_50px_rgba(11,30,54,0.14)] border border-slate-100 p-6 min-w-[500px] max-w-[560px] z-50 animate-fade-in"
                    onMouseEnter={() => handleMouseEnter(cat.key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                      {/* Left Column */}
                      <div>
                        {cat.col1Title && (
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                            {cat.col1Title}
                          </div>
                        )}
                        <div className="space-y-1">
                          {cat.col1.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center justify-between text-[13px] text-slate-700 hover:text-[#0B1E36] hover:bg-slate-50 px-2.5 py-1.5 rounded-lg font-medium transition-all group"
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
                      </div>

                      {/* Right Column */}
                      <div>
                        {cat.col2Title && (
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 px-1">
                            {cat.col2Title}
                          </div>
                        )}
                        <div className="space-y-1">
                          {cat.col2.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={() => setActiveDropdown(null)}
                              className="block text-[13px] text-slate-700 hover:text-[#0B1E36] hover:bg-slate-50 px-2.5 py-1.5 rounded-lg font-medium transition-all"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Direct Pricing Link */}
            <Link
              to="/pricing"
              className={`text-[13px] font-semibold transition-colors hover:text-[#0B1E36] py-1 whitespace-nowrap ${
                location.pathname === '/pricing' ? 'text-[#0B1E36]' : 'text-slate-700'
              }`}
            >
              Pricing
            </Link>
          </div>
        </div>

        {/* Right Section: Dedicated Search Tab + Auth Controls */}
        <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 shrink-0">
          {/* Instant Search Tab */}
          <NavbarSearch />

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
              >
                <div className="w-7 h-7 rounded-full bg-slate-100 text-[#0B1E36] font-bold flex items-center justify-center text-xs">
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
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#0B1E36] transition"
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
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#0B1E36] transition"
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
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs transition"
              >
                Log In
              </Link>
              <Link
                to="/apply/gst"
                className="rounded-full bg-[#0B1E36] hover:bg-[#142C4F] text-white px-5 py-2 text-[13px] font-bold shadow-xs hover:shadow transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Start GST
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer with Accordion Sub-options */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 shadow-lg max-h-[80vh] overflow-y-auto">
          {/* Mobile Instant Search Tab */}
          <div className="pb-1">
            <NavbarSearch isMobile onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>

          <div className="space-y-1">
            {/* Top Home link for mobile */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-xl ${
                location.pathname === '/' ? 'bg-slate-100 text-[#0B1E36] font-bold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4 text-slate-500" />
              Home
            </Link>

            {menuCategories.map((cat) => (
              <div key={cat.key} className="border-b border-slate-50 pb-1">
                <button
                  onClick={() =>
                    setMobileExpandedCat(mobileExpandedCat === cat.key ? null : cat.key)
                  }
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
                >
                  <span>{cat.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      mobileExpandedCat === cat.key ? 'rotate-180 text-[#0B1E36]' : ''
                    }`}
                  />
                </button>

                {mobileExpandedCat === cat.key && (
                  <div className="px-4 py-2 space-y-1.5 bg-slate-50/70 rounded-xl mt-1">
                    {cat.col1Title && (
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-1">
                        {cat.col1Title}
                      </div>
                    )}
                    {cat.col1.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs text-slate-600 hover:text-[#0B1E36] py-1"
                      >
                        {item.name}
                      </Link>
                    ))}

                    {cat.col2Title && (
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-2 border-t border-slate-200/50">
                        {cat.col2Title}
                      </div>
                    )}
                    {cat.col2.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs text-slate-600 hover:text-[#0B1E36] py-1"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 rounded-xl"
            >
              Pricing
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={
                    user?.role === 'CA'
                      ? '/ca/dashboard'
                      : user?.role === 'ADMIN'
                      ? '/admin'
                      : '/dashboard'
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-full bg-[#0B1E36] text-white font-bold text-sm"
                >
                  Go to {user?.role === 'CA' ? 'CA Workbench' : user?.role === 'ADMIN' ? 'Admin Portal' : 'Dashboard'}
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full py-2 text-rose-600 font-semibold text-sm hover:bg-rose-50 rounded-full"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-full border border-slate-300 text-slate-800 font-semibold text-sm"
                >
                  Log In
                </Link>
                <Link
                  to="/apply/gst"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-full bg-[#0B1E36] text-white font-bold text-sm"
                >
                  Start GST
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
