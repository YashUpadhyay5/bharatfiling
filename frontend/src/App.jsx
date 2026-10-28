import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import { MainLayout, BareLayout, ScrollToTop } from './layouts';
import { GST_SERVICE_ROUTES } from './pages/gst-services/routes.js';

// Critical initial route (eagerly loaded for immediate first paint)
import LandingPage from './pages/LandingPage.jsx';

// Code-split secondary routes (loaded on demand to keep the initial bundle small)
const GstLandingPage = lazy(() => import('./pages/GstLandingPage.jsx'));
const ServicesDirectory = lazy(() => import('./pages/ServicesDirectory.jsx'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage.jsx'));
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
const GstPaymentPage = lazy(() =>
  import('./pages/gst-registration/index.jsx').then((m) => ({ default: m.GstPaymentPage }))
);
const UdyamLandingPage = lazy(() => import('./pages/UdyamLandingPage.jsx'));
const UdyamRegistrationModule = lazy(() => import('./pages/udyam-registration/index.jsx'));
const UdyamCheckoutPage = lazy(() =>
  import('./pages/udyam-registration/index.jsx').then((m) => ({ default: m.UdyamCheckoutPage }))
);
const IecRegistrationModule = lazy(() => import('./pages/import-export-code/index.jsx'));
const IecCheckoutPage = lazy(() =>
  import('./pages/import-export-code/index.jsx').then((m) => ({ default: m.IecCheckoutPage }))
);
const FssaiRegistrationModule = lazy(() => import('./pages/fssai-registration/index.jsx'));
const FssaiCheckoutPage = lazy(() =>
  import('./pages/fssai-registration/index.jsx').then((m) => ({ default: m.FssaiCheckoutPage }))
);
const PtRegistrationModule = lazy(() => import('./pages/professional-tax/index.jsx'));
const PtCheckoutPage = lazy(() =>
  import('./pages/professional-tax/index.jsx').then((m) => ({ default: m.PtCheckoutPage }))
);
const ShopEstablishmentModule = lazy(() => import('./pages/shop-establishment/index.jsx'));
const GstServiceModule = lazy(() => import('./pages/gst-services/index.jsx'));
const DigitalSignatureModule = lazy(() => import('./pages/digital-signature/index.jsx'));
const PfRegistrationModule = lazy(() => import('./pages/pf-registration/index.jsx'));
const EsiRegistrationModule = lazy(() => import('./pages/esi-registration/index.jsx'));
const PanRegistrationModule = lazy(() => import('./pages/pan-registration/index.jsx'));
const TanRegistrationModule = lazy(() => import('./pages/tan-registration/index.jsx'));
const ApedaRegistrationModule = lazy(() => import('./pages/apeda-registration/index.jsx'));
const TrademarkRegistrationModule = lazy(() => import('./pages/trademark/trademark-registration/index.jsx'));
const CaDashboardPage = lazy(() => import('./pages/CaDashboardPage.jsx'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage.jsx'));
const HRACalculatorPage = lazy(() => import('./pages/tools/HRACalculatorPage.jsx'));
const IncomeTaxCalculatorPage = lazy(() => import('./pages/tools/IncomeTaxCalculatorPage.jsx'));
const FirmNameCheckerPage = lazy(() => import('./pages/tools/FirmNameCheckerPage.jsx'));

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
                <Route path="/services/udyam-registration" element={<UdyamLandingPage />} />
                <Route path="/services/msme-registration" element={<UdyamLandingPage />} />
                <Route path="/services/import-export-code" element={<IecRegistrationModule />} />
                <Route path="/services/iec-registration" element={<IecRegistrationModule />} />
                <Route path="/services/fssai-food-license" element={<FssaiRegistrationModule />} />
                <Route path="/services/fssai-registration" element={<FssaiRegistrationModule />} />
                <Route path="/services/fssai" element={<FssaiRegistrationModule />} />
                <Route path="/services/fassci" element={<FssaiRegistrationModule />} />
                <Route path="/services/professional-tax" element={<PtRegistrationModule />} />
                <Route path="/services/professional-tax-registration" element={<PtRegistrationModule />} />
                <Route path="/services/pt-registration" element={<PtRegistrationModule />} />
                <Route path="/services/pt" element={<PtRegistrationModule />} />
                <Route path="/services/shop-and-establishment-license" element={<ShopEstablishmentModule />} />
                <Route path="/services/shop-and-establishment" element={<ShopEstablishmentModule />} />
                <Route path="/services/shop-establishment" element={<ShopEstablishmentModule />} />
                <Route path="/services/gumasta-license" element={<ShopEstablishmentModule />} />
                <Route path="/services/gumasta" element={<ShopEstablishmentModule />} />
                {/* GST service flows: one shared 4-step flow per service, configured in pages/gst-services */}
                {GST_SERVICE_ROUTES.flatMap(({ slug, aliases = [] }) => [
                  <Route key={slug} path={`/services/${slug}`} element={<GstServiceModule key={slug} slug={slug} />} />,
                  <Route key={`apply-${slug}`} path={`/apply/${slug}`} element={<Navigate to={`/services/${slug}`} replace />} />,
                  ...aliases.map((alias) => (
                    <Route key={alias} path={`/services/${alias}`} element={<Navigate to={`/services/${slug}`} replace />} />
                  )),
                ])}
                <Route path="/services/class-3-digital-signature" element={<DigitalSignatureModule />} />
                <Route path="/services/dsc-registration" element={<DigitalSignatureModule />} />
                <Route path="/services/digital-signature" element={<DigitalSignatureModule />} />
                <Route path="/services/dsc" element={<DigitalSignatureModule />} />
                <Route path="/services/pf-registration" element={<PfRegistrationModule />} />
                <Route path="/services/epf-registration" element={<PfRegistrationModule />} />
                <Route path="/services/provident-fund" element={<PfRegistrationModule />} />
                <Route path="/services/pf" element={<PfRegistrationModule />} />
                <Route path="/services/epf" element={<PfRegistrationModule />} />
                <Route path="/services/pf-esi-registration" element={<PfRegistrationModule />} />
                <Route path="/services/esi-registration" element={<EsiRegistrationModule />} />
                <Route path="/services/esic-registration" element={<EsiRegistrationModule />} />
                <Route path="/services/esi" element={<EsiRegistrationModule />} />
                <Route path="/services/pan-registration" element={<PanRegistrationModule />} />
                <Route path="/services/pan" element={<PanRegistrationModule />} />
                <Route path="/services/pan-card" element={<PanRegistrationModule />} />
                <Route path="/services/tan-registration" element={<TanRegistrationModule />} />
                <Route path="/services/tan" element={<TanRegistrationModule />} />
                <Route path="/services/form-49b" element={<TanRegistrationModule />} />
                <Route path="/services/apeda-registration" element={<ApedaRegistrationModule />} />
                <Route path="/services/apeda" element={<ApedaRegistrationModule />} />
                <Route path="/services/rcmc" element={<ApedaRegistrationModule />} />
                <Route path="/services/trademark-registration" element={<TrademarkRegistrationModule />} />
                <Route path="/services/trademark" element={<TrademarkRegistrationModule />} />
                <Route path="/services/brand-registration" element={<TrademarkRegistrationModule />} />
                <Route path="/services/:slug" element={<ServiceDetailPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/tools/hra-calculator" element={<HRACalculatorPage />} />
                <Route path="/tools/income-tax-calculator" element={<IncomeTaxCalculatorPage />} />
                <Route path="/tools/firm-name-checker" element={<FirmNameCheckerPage />} />

                {/* Authentication */}
                <Route path="/login" element={<AuthPages defaultMode="login" />} />
                <Route path="/register" element={<AuthPages defaultMode="register" />} />

                {/* Customer portal and 3-screen statutory registration flows */}
                <Route path="/dashboard" element={<CustomerDashboard />} />
                <Route path="/apply/udyam" element={<UdyamRegistrationModule />} />
                <Route path="/apply/msme" element={<UdyamRegistrationModule />} />
                <Route path="/apply/import-export-code" element={<IecRegistrationModule />} />
                <Route path="/apply/iec" element={<IecRegistrationModule />} />
                <Route path="/apply/fssai-food-license" element={<FssaiRegistrationModule />} />
                <Route path="/apply/fssai-registration" element={<FssaiRegistrationModule />} />
                <Route path="/apply/fssai" element={<FssaiRegistrationModule />} />
                <Route path="/apply/fassci" element={<FssaiRegistrationModule />} />
                <Route path="/apply/professional-tax" element={<PtRegistrationModule />} />
                <Route path="/apply/pt-registration" element={<PtRegistrationModule />} />
                <Route path="/apply/pt" element={<PtRegistrationModule />} />
                <Route path="/apply/shop-and-establishment-license" element={<ShopEstablishmentModule />} />
                <Route path="/apply/shop-and-establishment" element={<ShopEstablishmentModule />} />
                <Route path="/apply/shop-establishment" element={<ShopEstablishmentModule />} />
                <Route path="/apply/gumasta-license" element={<ShopEstablishmentModule />} />
                <Route path="/apply/gumasta" element={<ShopEstablishmentModule />} />
                <Route path="/apply/class-3-digital-signature" element={<DigitalSignatureModule />} />
                <Route path="/apply/dsc-registration" element={<DigitalSignatureModule />} />
                <Route path="/apply/digital-signature" element={<DigitalSignatureModule />} />
                <Route path="/apply/dsc" element={<DigitalSignatureModule />} />
                <Route path="/apply/pf-registration" element={<PfRegistrationModule />} />
                <Route path="/apply/epf-registration" element={<PfRegistrationModule />} />
                <Route path="/apply/provident-fund" element={<PfRegistrationModule />} />
                <Route path="/apply/pf" element={<PfRegistrationModule />} />
                <Route path="/apply/epf" element={<PfRegistrationModule />} />
                <Route path="/apply/pf-esi" element={<PfRegistrationModule />} />
                <Route path="/apply/esi-registration" element={<EsiRegistrationModule />} />
                <Route path="/apply/esi" element={<EsiRegistrationModule />} />
                <Route path="/apply/pan-registration" element={<PanRegistrationModule />} />
                <Route path="/apply/pan" element={<PanRegistrationModule />} />
                <Route path="/apply/tan-registration" element={<TanRegistrationModule />} />
                <Route path="/apply/tan" element={<TanRegistrationModule />} />
                <Route path="/apply/form-49b" element={<TanRegistrationModule />} />
                <Route path="/apply/apeda-registration" element={<ApedaRegistrationModule />} />
                <Route path="/apply/apeda" element={<ApedaRegistrationModule />} />
                <Route path="/apply/rcmc" element={<ApedaRegistrationModule />} />
                <Route path="/apply/trademark-registration" element={<TrademarkRegistrationModule />} />
                <Route path="/apply/trademark" element={<TrademarkRegistrationModule />} />
                <Route path="/apply/brand-registration" element={<TrademarkRegistrationModule />} />
                <Route path="/apply/gst" element={<GstRegistrationModule />} />
                <Route path="/apply/:serviceSlug" element={<GstRegistrationModule />} />
                <Route path="/apply/:serviceSlug/:appId" element={<ApplicationRedirect />} />

                {/* Unknown URLs fall back to the home page, inside the full layout */}
                <Route path="*" element={<LandingPage />} />
              </Route>

              {/* ---------- Outlet only (screens with their own chrome) ---------- */}
              <Route element={<BareLayout />}>
                <Route path="/checkout/udyam/:orderId" element={<UdyamCheckoutPage />} />
                <Route path="/checkout/iec/:orderId" element={<IecCheckoutPage />} />
                <Route path="/checkout/fssai/:orderId" element={<FssaiCheckoutPage />} />
                <Route path="/checkout/pt/:orderId" element={<PtCheckoutPage />} />
                <Route path="/checkout" element={<GstCheckoutPage />} />
                <Route path="/checkout/:orderId" element={<GstCheckoutPage />} />
                <Route path="/checkout/:orderId/pay" element={<GstPaymentPage />} />

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
