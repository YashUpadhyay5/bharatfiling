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
  Search,
  ShieldCheck,
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
    <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.03)] font-sans">
      <nav className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
        {/* Left Section: Brand Logo & 8 Main Category Tabs */}
        <div className="flex items-center min-w-0">
          {/* Brand Logo with IndiaFilings-inspired clean typography */}
          <Link
            to="/"
            title="BharatFiling — India's Compliance Platform"
            className="flex items-center gap-2.5 shrink-0 group active:scale-95 transition-transform mr-4 xl:mr-7"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#EFF8FF] border border-[#D1E9FF]">
              <ShieldCheck className="w-5 h-5 text-[#155EEF]" />
              <div className="absolute -bottom-0.5 inset-x-1.5 h-[2px] brand-tricolor-accent rounded-full" />
            </div>
            <div className="flex items-baseline font-extrabold tracking-tight text-lg sm:text-xl leading-none select-none">
              <span className="text-[#252B36]">Bharat</span>
              <span className="text-[#155EEF]">Filing</span>
            </div>
          </Link>

          {/* Desktop Navigation Tabs (IndiaFilings Corporate Style) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2.5 2xl:gap-3.5 whitespace-nowrap">
            {menuCategories.map((cat) => (
              <div
                key={cat.key}
                className="relative py-5"
                onMouseEnter={() => handleMouseEnter(cat.key)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 text-[13px] font-medium transition-colors py-1 whitespace-nowrap ${
                    activeDropdown === cat.key ? 'text-[#155EEF] font-semibold' : 'text-[#252B36] hover:text-[#155EEF]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#667085] transition-transform duration-200 ${
                      activeDropdown === cat.key ? 'rotate-180 text-[#155EEF]' : ''
                    }`}
                  />
                </button>

                {/* 2-Column Hover Mega-Dropdown */}
                {activeDropdown === cat.key && (
                  <div
                    className="absolute top-[64px] left-0 bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-4 min-w-[440px] max-w-[520px] z-50 animate-fade-in"
                    onMouseEnter={() => handleMouseEnter(cat.key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {/* Left Column */}
                      <div className="space-y-0.5">
                        {cat.col1.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={(e) => handleServiceClick(e, item, cat.label)}
                            className="flex items-center justify-between text-[13px] text-[#252B36] hover:text-[#155EEF] hover:bg-[#EFF8FF] px-2.5 py-1.5 rounded-lg font-medium transition-colors group"
                          >
                            <span className="truncate">{item.name}</span>
                            {item.isLive && (
                              <span className="bg-[#ECFDF3] text-[#027A48] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#A6F4C5] shrink-0 ml-1">
                                Live
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-0.5">
                        {cat.col2.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={(e) => handleServiceClick(e, item, cat.label)}
                            className="block text-[13px] text-[#252B36] hover:text-[#155EEF] hover:bg-[#EFF8FF] px-2.5 py-1.5 rounded-lg font-medium transition-colors truncate"
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
              className={`text-[13px] font-medium transition-colors py-1 whitespace-nowrap ${
                location.pathname === '/pricing' ? 'text-[#155EEF] font-semibold' : 'text-[#252B36] hover:text-[#155EEF]'
              }`}
            >
              Pricing
            </Link>
          </div>
        </div>

        {/* Right Section: Search & Auth Controls */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <NavbarSearch />

          {isAuthenticated && <NotificationBell />}

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F8F9FB] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#EFF8FF] text-[#155EEF] font-bold flex items-center justify-center text-xs">
                  {user?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-[#252B36] truncate max-w-[110px]">
                    {user?.full_name?.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-[#667085] capitalize">{user?.role?.toLowerCase()}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#667085]" />
              </button>

              {userDropdown && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-[#E5E7EB] p-1.5 space-y-0.5 z-50">
                  <Link
                    to="/"
                    onClick={() => setUserDropdown(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[#252B36] hover:bg-[#EFF8FF] hover:text-[#155EEF] transition-colors"
                  >
                    <Home className="w-3.5 h-3.5 text-[#667085]" />
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
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-[#252B36] hover:bg-[#EFF8FF] hover:text-[#155EEF] transition-colors"
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
                    className="block px-3 py-2 rounded-lg text-xs font-medium text-[#252B36] hover:bg-[#EFF8FF] hover:text-[#155EEF] transition-colors"
                  >
                    Master Profile
                  </Link>

                  <button
                    onClick={() => {
                      setUserDropdown(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-[#B42318] hover:bg-[#FEF3F2] transition-colors flex items-center gap-2"
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
                className="px-3.5 py-2 text-[13px] font-semibold text-[#252B36] hover:text-[#155EEF] hover:bg-[#F8F9FB] rounded-lg transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-[#155EEF] hover:bg-[#1048C6] text-white px-4 py-2 text-[13px] font-semibold rounded-lg shadow-xs transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          {isAuthenticated && <NotificationBell />}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#252B36] hover:bg-[#F8F9FB] transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer with Accordion Sub-options */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E7EB] bg-white px-4 py-4 space-y-3 shadow-lg max-h-[82vh] overflow-y-auto">
          <div className="pb-1">
            <NavbarSearch isMobile onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>

          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg ${
                location.pathname === '/' ? 'bg-[#EFF8FF] text-[#155EEF] font-semibold' : 'text-[#252B36] hover:bg-[#F8F9FB]'
              }`}
            >
              <Home className="w-4 h-4 text-[#667085]" />
              Home
            </Link>

            {menuCategories.map((cat) => (
              <div key={cat.key} className="border-b border-[#F1F3F5] pb-1">
                <button
                  onClick={() =>
                    setMobileExpandedCat(mobileExpandedCat === cat.key ? null : cat.key)
                  }
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-[#252B36] hover:bg-[#F8F9FB] rounded-lg transition-colors"
                >
                  <span>{cat.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#667085] transition-transform ${
                      mobileExpandedCat === cat.key ? 'rotate-180 text-[#155EEF]' : ''
                    }`}
                  />
                </button>

                {mobileExpandedCat === cat.key && (
                  <div className="px-4 py-2 space-y-1 bg-[#F8F9FB] rounded-lg mt-1">
                    {[...cat.col1, ...cat.col2].map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={(e) => handleMobileServiceClick(e, item, cat.label)}
                        className="block text-xs text-[#667085] hover:text-[#155EEF] py-1.5"
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
              className="block px-3 py-2.5 text-sm font-medium text-[#252B36] hover:bg-[#F8F9FB] rounded-lg"
            >
              Pricing
            </Link>
          </div>

          <div className="pt-3 border-t border-[#E5E7EB] flex flex-col gap-2">
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
                  className="w-full text-center py-2.5 rounded-lg bg-[#155EEF] text-white font-semibold text-sm"
                >
                  Go to {user?.role === 'CA' ? 'CA Workbench' : user?.role === 'ADMIN' ? 'Admin Portal' : 'Dashboard'}
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full py-2 text-[#B42318] font-medium text-sm hover:bg-[#FEF3F2] rounded-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-lg border border-[#E5E7EB] text-[#252B36] font-semibold text-sm hover:bg-[#F8F9FB]"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-lg bg-[#155EEF] text-white font-semibold text-sm hover:bg-[#1048C6]"
                >
                  Register
                </Link>
              </div>
            )}
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
