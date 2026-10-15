import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import { MainLayout, BareLayout, ScrollToTop } from './layouts';

// Critical initial route (eagerly loaded for immediate first paint)
import LandingPage from './pages/LandingPage.jsx';

// Code-split secondary routes (loaded on demand to keep the initial bundle small)
const GstLandingPage = lazy(() => import('./pages/GstLandingPage.jsx'));
const ServicesDirectory = lazy(() => import('./pages/ServicesDirectory.jsx'));
const PlaceholderServicePage = lazy(() => import('./pages/PlaceholderServicePage.jsx'));
const PricingPage = lazy(() => import('./pages/PricingPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const FaqPage = lazy(() => import('./pages/FaqPage.jsx'));
const AuthPages = lazy(() => import('./pages/AuthPages.jsx'));
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard.jsx'));
const GstRegistrationModule = lazy(() => import('./pages/gst-registration/index.jsx'));
const GstCheckoutPage = lazy(() =>
  import('./pages/gst-registration/index.jsx').then((m) => ({ default: m.OrderCheckoutPage }))
);
const UdyamLandingPage = lazy(() => import('./pages/UdyamLandingPage.jsx'));
const UdyamRegistrationModule = lazy(() => import('./pages/udyam-registration/index.jsx'));
const UdyamCheckoutPage = lazy(() =>
  import('./pages/udyam-registration/index.jsx').then((m) => ({ default: m.UdyamCheckoutPage }))
);
const CaDashboardPage = lazy(() => import('./pages/CaDashboardPage.jsx'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage.jsx'));
const HRACalculatorPage = lazy(() => import('./pages/tools/HRACalculatorPage.jsx'));
const IncomeTaxCalculatorPage = lazy(() => import('./pages/tools/IncomeTaxCalculatorPage.jsx'));

function ApplicationRedirect() {
  const { appId } = useParams();
  return <Navigate to={`/dashboard${appId ? `?app=${appId}` : ''}`} replace />;
}

/**
 * Route tree
 *
 *   MainLayout   Header -> <Outlet /> -> Footer     public website, auth, customer portal, apply wizards
 *   BareLayout   <Outlet /> only                    checkout, CA workbench, admin portal (own chrome)
 */
export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <SocketProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* ---------- Header + Footer ---------- */}
              <Route element={<MainLayout />}>
                {/* Public website */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/services" element={<ServicesDirectory />} />
                <Route path="/services/gst-registration" element={<GstLandingPage />} />
                <Route path="/services/gst-return" element={<PlaceholderServicePage />} />
                <Route path="/services/income-tax" element={<PlaceholderServicePage />} />
                <Route path="/services/company-registration" element={<PlaceholderServicePage />} />
                <Route path="/services/llp-registration" element={<PlaceholderServicePage />} />
                <Route path="/services/trademark" element={<PlaceholderServicePage />} />
                <Route path="/services/legal" element={<PlaceholderServicePage />} />
                <Route path="/services/udyam-registration" element={<UdyamLandingPage />} />
                <Route path="/services/msme-registration" element={<UdyamLandingPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/tools/hra-calculator" element={<HRACalculatorPage />} />
                <Route path="/tools/income-tax-calculator" element={<IncomeTaxCalculatorPage />} />

                {/* Authentication */}
                <Route path="/login" element={<AuthPages defaultMode="login" />} />
                <Route path="/register" element={<AuthPages defaultMode="register" />} />

                {/* Customer portal and 3-screen statutory registration flows */}
                <Route path="/dashboard" element={<CustomerDashboard />} />
                <Route path="/apply/udyam" element={<UdyamRegistrationModule />} />
                <Route path="/apply/msme" element={<UdyamRegistrationModule />} />
                <Route path="/apply/gst" element={<GstRegistrationModule />} />
                <Route path="/apply/:serviceSlug" element={<GstRegistrationModule />} />
                <Route path="/apply/:serviceSlug/:appId" element={<ApplicationRedirect />} />

                {/* Unknown URLs fall back to the home page, inside the full layout */}
                <Route path="*" element={<LandingPage />} />
              </Route>

              {/* ---------- Outlet only (screens with their own chrome) ---------- */}
              <Route element={<BareLayout />}>
                <Route path="/checkout/udyam/:orderId" element={<UdyamCheckoutPage />} />
                <Route path="/checkout" element={<GstCheckoutPage />} />
                <Route path="/checkout/:orderId" element={<GstCheckoutPage />} />

                <Route path="/ca/dashboard" element={<CaDashboardPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
              </Route>
            </Routes>
          </Router>
        </SocketProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
