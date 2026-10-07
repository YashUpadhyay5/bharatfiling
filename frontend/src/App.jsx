import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import Navbar from './components/common/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import SupportWidget from './components/common/SupportWidget.jsx';

// Pages
import LandingPage from './pages/LandingPage.jsx';
import GstLandingPage from './pages/GstLandingPage.jsx';
import ServicesDirectory from './pages/ServicesDirectory.jsx';
import PlaceholderServicePage from './pages/PlaceholderServicePage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import FaqPage from './pages/FaqPage.jsx';
import AuthPages from './pages/AuthPages.jsx';
import CustomerDashboard from './pages/CustomerDashboard.jsx';
import GstWizardPage from './pages/GstWizardPage.jsx';
import GstOnboardingPage from './pages/GstOnboardingPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import CaDashboardPage from './pages/CaDashboardPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';

function AppLayout({ children }) {
  const location = useLocation();
  const isCheckout = location.pathname.startsWith('/checkout');
  const isDossierWizard = location.pathname.startsWith('/apply/gst/') && location.pathname !== '/apply/gst';
  const isCaOrAdmin = location.pathname.startsWith('/ca') || location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isCheckout && !isDossierWizard && !isCaOrAdmin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isCheckout && !isDossierWizard && !isCaOrAdmin && <Footer />}
      <SupportWidget />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppLayout>
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

              {/* Customer Portal & Onboarding Flow */}
              <Route path="/dashboard" element={<CustomerDashboard />} />
              <Route path="/apply/gst" element={<GstOnboardingPage />} />
              <Route path="/apply/gst/dossier" element={<GstWizardPage />} />
              <Route path="/apply/gst/:id" element={<GstWizardPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/:orderId" element={<CheckoutPage />} />

              {/* Professional CA Portal */}
              <Route path="/ca/dashboard" element={<CaDashboardPage />} />

              {/* Admin Portal */}
              <Route path="/admin" element={<AdminDashboardPage />} />

              {/* 404 Fallback */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </AppLayout>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}
