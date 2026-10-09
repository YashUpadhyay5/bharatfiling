import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import SupportWidget from './components/common/SupportWidget.jsx';

// Critical Initial Route (Eagerly Loaded for Immediate First Paint)
import LandingPage from './pages/LandingPage.jsx';

// Code-split Secondary Routes (Loaded On-Demand for Fast Initial Bundle)
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
const CaDashboardPage = lazy(() => import('./pages/CaDashboardPage.jsx'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage.jsx'));

import ErrorBoundary from './components/common/ErrorBoundary.jsx';

function RouteLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-slate-200 border-t-[#111827] rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Loading BharatFiling...</p>
      </div>
    </div>
  );
}

function AppLayout({ children }) {
  const location = useLocation();
  const isCheckout = location.pathname.startsWith('/checkout');
  const isCaOrAdmin = location.pathname.startsWith('/ca') || location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isCheckout && !isCaOrAdmin && <Navbar />}
      <main className="flex-1">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
      {!isCheckout && !isCaOrAdmin && <Footer />}
      <SupportWidget />
    </div>
  );
}

function ApplicationRedirect() {
  const { appId } = useParams();
  return <Navigate to={`/dashboard${appId ? `?app=${appId}` : ''}`} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <SocketProvider>
          <Router>
            <AppLayout>
              <Suspense fallback={<RouteLoadingFallback />}>
                <Routes>
                  {/* Public Website Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/services" element={<ServicesDirectory />} />
                  <Route path="/services/gst-registration" element={<GstLandingPage />} />
                  <Route path="/services/gst-return" element={<PlaceholderServicePage />} />
                  <Route path="/services/income-tax" element={<PlaceholderServicePage />} />
                  <Route path="/services/company-registration" element={<PlaceholderServicePage />} />
                  <Route path="/services/llp-registration" element={<PlaceholderServicePage />} />
                  <Route path="/services/trademark" element={<PlaceholderServicePage />} />
                  <Route path="/services/legal" element={<PlaceholderServicePage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FaqPage />} />

                  {/* Authentication */}
                  <Route path="/login" element={<AuthPages defaultMode="login" />} />
                  <Route path="/register" element={<AuthPages defaultMode="register" />} />

                  {/* Customer Portal & Modular 3-Screen Statutory Registration Flow */}
                  <Route path="/dashboard" element={<CustomerDashboard />} />
                  <Route path="/apply/gst" element={<GstRegistrationModule />} />
                  <Route path="/apply/:serviceSlug" element={<GstRegistrationModule />} />
                  <Route path="/apply/:serviceSlug/:appId" element={<ApplicationRedirect />} />
                  <Route path="/checkout" element={<GstCheckoutPage />} />
                  <Route path="/checkout/:orderId" element={<GstCheckoutPage />} />

                  {/* Professional CA Portal */}
                  <Route path="/ca/dashboard" element={<CaDashboardPage />} />

                  {/* Admin Portal */}
                  <Route path="/admin" element={<AdminDashboardPage />} />

                  {/* 404 Fallback */}
                  <Route path="*" element={<LandingPage />} />
                </Routes>
              </Suspense>
            </AppLayout>
          </Router>
        </SocketProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
