import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import { MainLayout, BareLayout, ScrollToTop } from './layouts';
import { GST_SERVICE_ROUTES } from './pages/gst-services/routes.js';
import { ITR_SERVICE_ROUTES } from './pages/itr-services/routes.js';
import { MCA_SERVICE_ROUTES } from './pages/mca-services/routes.js';
import { TDS_ROUTE } from './pages/tds-return-filing/routes.js';
import { NOTICE_ROUTE } from './pages/notice-response/routes.js';

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
const TrademarkObjectionModule = lazy(() => import('./pages/trademark/trademark-objection/index.jsx'));
const TrademarkRenewalModule = lazy(() => import('./pages/trademark/trademark-renewal/index.jsx'));
const TrademarkAssignmentModule = lazy(() => import('./pages/trademark/trademark-assignment/index.jsx'));
const CopyrightRegistrationModule = lazy(() => import('./pages/copyright/index.jsx'));
const PatentRegistrationModule = lazy(() => import('./pages/patent/index.jsx'));
const ProvisionalPatentModule = lazy(() => import('./pages/patent/provisional-patent/index.jsx'));
const PartnershipModule = lazy(() => import('./pages/startup/partnership/index.jsx'));
const OnePersonCompanyModule = lazy(() => import('./pages/startup/one-person-company/index.jsx'));
const PrivateLimitedCompanyModule = lazy(() => import('./pages/startup/private-limited-company/index.jsx'));
const PublicCompanyModule = lazy(() => import('./pages/startup/public-limited-company/index.jsx'));
const ProducerCompanyModule = lazy(() => import('./pages/startup/producer-company/index.jsx'));
const ProprietorshipModule = lazy(() => import('./pages/startup/proprietorship/index.jsx'));
const TrustRegistrationModule = lazy(() => import('./pages/startup/trust/index.jsx'));
const LLPRegistrationModule = lazy(() => import('./pages/startup/llp/index.jsx'));
const IndianSubsidiaryModule = lazy(() => import('./pages/startup/indian-subsidiary/index.jsx'));
const Section8Module = lazy(() => import('./pages/startup/section-8/index.jsx'));
const CAConsultationModule = lazy(() => import('./pages/ca-consultation/index.jsx'));
const LegalConsultationModule = lazy(() => import('./pages/legal-consultation/index.jsx'));
const StartupStructuringModule = lazy(() => import('./pages/startup-structuring-advisory/index.jsx'));
const GstNoticeHearingModule = lazy(() => import('./pages/gst-notice-hearing/index.jsx'));
const IncomeTaxDisputeModule = lazy(() => import('./pages/income-tax-dispute-appeals/index.jsx'));
const TrademarkHearingModule = lazy(() => import('./pages/trademark-hearing-support/index.jsx'));
const MonthlyPayrollModule = lazy(() => import('./pages/monthly-payroll/index.jsx'));
const StatutoryTdsModule = lazy(() => import('./pages/statutory-tds-compliance/index.jsx'));
const PfEsiModule = lazy(() => import('./pages/pf-esi-monthly-returns/index.jsx'));
const VirtualCfoModule = lazy(() => import('./pages/virtual-cfo/index.jsx'));
const SecretarialAuditModule = lazy(() => import('./pages/secretarial-audit-registers/index.jsx'));
const ShopActRenewalModule = lazy(() => import('./pages/shop-act-renewal/index.jsx'));
const FactoryLicenseModule = lazy(() => import('./pages/factory-license-compliance/index.jsx'));
const ItrServiceModule = lazy(() => import('./pages/itr-services/index.jsx'));
const McaServiceModule = lazy(() => import('./pages/mca-services/index.jsx'));
const TdsReturnFilingModule = lazy(() => import('./pages/tds-return-filing/index.jsx'));
const NoticeResponseModule = lazy(() => import('./pages/notice-response/index.jsx'));
const CaDashboardPage = lazy(() => import('./pages/CaDashboardPage.jsx'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage.jsx'));
const HRACalculatorPage = lazy(() => import('./pages/tools/HRACalculatorPage.jsx'));
const IncomeTaxCalculatorPage = lazy(() => import('./pages/tools/IncomeTaxCalculatorPage.jsx'));
const FirmNameCheckerPage = lazy(() => import('./pages/tools/FirmNameCheckerPage.jsx'));

// The canonical /services/<slug> route of a flow, plus redirects to it from /apply/<slug> and from any aliases.
const flowRoutes = (slug, aliases, element) => [
  <Route key={slug} path={`/services/${slug}`} element={element} />,
  <Route key={`apply-${slug}`} path={`/apply/${slug}`} element={<Navigate to={`/services/${slug}`} replace />} />,
  ...aliases.flatMap((alias) => [
    <Route key={alias} path={`/services/${alias}`} element={<Navigate to={`/services/${slug}`} replace />} />,
    <Route key={`apply-${alias}`} path={`/apply/${alias}`} element={<Navigate to={`/services/${slug}`} replace />} />,
  ]),
];

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
                <Route path="/services/trademark-objection" element={<TrademarkObjectionModule />} />
                <Route path="/services/tm-objection" element={<TrademarkObjectionModule />} />
                <Route path="/services/trademark-objection-reply" element={<TrademarkObjectionModule />} />
                <Route path="/services/trademark-renewal" element={<TrademarkRenewalModule />} />
                <Route path="/services/tm-renewal" element={<TrademarkRenewalModule />} />
                <Route path="/services/trademark-assignment" element={<TrademarkAssignmentModule />} />
                <Route path="/services/tm-assignment" element={<TrademarkAssignmentModule />} />
                <Route path="/trademark-assignment" element={<TrademarkAssignmentModule />} />
                <Route path="/apply/trademark-assignment" element={<TrademarkAssignmentModule />} />
                <Route path="/apply/tm-assignment" element={<TrademarkAssignmentModule />} />
                <Route path="/services/copyright-registration" element={<CopyrightRegistrationModule />} />
                <Route path="/services/copyright" element={<CopyrightRegistrationModule />} />
                <Route path="/copyright-registration" element={<CopyrightRegistrationModule />} />
                <Route path="/apply/copyright-registration" element={<CopyrightRegistrationModule />} />
                <Route path="/apply/copyright" element={<CopyrightRegistrationModule />} />
                <Route path="/services/patent-registration" element={<PatentRegistrationModule />} />
                <Route path="/services/patent" element={<PatentRegistrationModule />} />
                <Route path="/patent-registration" element={<PatentRegistrationModule />} />
                <Route path="/apply/patent-registration" element={<PatentRegistrationModule />} />
                <Route path="/apply/patent" element={<PatentRegistrationModule />} />
                <Route path="/services/provisional-patent-application" element={<ProvisionalPatentModule />} />
                <Route path="/services/provisional-patent" element={<ProvisionalPatentModule />} />
                <Route path="/provisional-patent-application" element={<ProvisionalPatentModule />} />
                <Route path="/provisional-patent" element={<ProvisionalPatentModule />} />
                <Route path="/apply/provisional-patent-application" element={<ProvisionalPatentModule />} />
                <Route path="/apply/provisional-patent" element={<ProvisionalPatentModule />} />
                <Route path="/services/partnership-firm" element={<PartnershipModule />} />
                <Route path="/services/partnership" element={<PartnershipModule />} />
                <Route path="/services/partnership-firm-registration" element={<PartnershipModule />} />
                <Route path="/partnership-firm" element={<PartnershipModule />} />
                <Route path="/partnership" element={<PartnershipModule />} />
                <Route path="/apply/partnership-firm" element={<PartnershipModule />} />
                <Route path="/apply/partnership" element={<PartnershipModule />} />
                <Route path="/apply/partnership-firm-registration" element={<PartnershipModule />} />
                <Route path="/services/one-person-company" element={<OnePersonCompanyModule />} />
                <Route path="/services/one-person-company-registration" element={<OnePersonCompanyModule />} />
                <Route path="/services/opc" element={<OnePersonCompanyModule />} />
                <Route path="/services/opc-registration" element={<OnePersonCompanyModule />} />
                <Route path="/one-person-company" element={<OnePersonCompanyModule />} />
                <Route path="/one-person-company-registration" element={<OnePersonCompanyModule />} />
                <Route path="/opc" element={<OnePersonCompanyModule />} />
                <Route path="/opc-registration" element={<OnePersonCompanyModule />} />
                <Route path="/apply/one-person-company" element={<OnePersonCompanyModule />} />
                <Route path="/apply/opc" element={<OnePersonCompanyModule />} />
                <Route path="/apply/one-person-company-registration" element={<OnePersonCompanyModule />} />
                <Route path="/apply/opc-registration" element={<OnePersonCompanyModule />} />
                <Route path="/services/private-limited-company" element={<PrivateLimitedCompanyModule />} />
                <Route path="/services/private-limited-company-registration" element={<PrivateLimitedCompanyModule />} />
                <Route path="/services/pvt-ltd-company" element={<PrivateLimitedCompanyModule />} />
                <Route path="/services/pvt-ltd" element={<PrivateLimitedCompanyModule />} />
                <Route path="/services/pvt-ltd-registration" element={<PrivateLimitedCompanyModule />} />
                <Route path="/private-limited-company" element={<PrivateLimitedCompanyModule />} />
                <Route path="/private-limited-company-registration" element={<PrivateLimitedCompanyModule />} />
                <Route path="/pvt-ltd-company" element={<PrivateLimitedCompanyModule />} />
                <Route path="/pvt-ltd" element={<PrivateLimitedCompanyModule />} />
                <Route path="/apply/private-limited-company" element={<PrivateLimitedCompanyModule />} />
                <Route path="/apply/private-limited-company-registration" element={<PrivateLimitedCompanyModule />} />
                <Route path="/apply/pvt-ltd" element={<PrivateLimitedCompanyModule />} />
                <Route path="/services/public-limited-company" element={<PublicCompanyModule />} />
                <Route path="/services/public-limited-company-registration" element={<PublicCompanyModule />} />
                <Route path="/services/public-limited" element={<PublicCompanyModule />} />
                <Route path="/services/public-company" element={<PublicCompanyModule />} />
                <Route path="/services/public-company-registration" element={<PublicCompanyModule />} />
                <Route path="/public-limited-company" element={<PublicCompanyModule />} />
                <Route path="/public-limited-company-registration" element={<PublicCompanyModule />} />
                <Route path="/public-limited" element={<PublicCompanyModule />} />
                <Route path="/public-company" element={<PublicCompanyModule />} />
                <Route path="/apply/public-limited-company" element={<PublicCompanyModule />} />
                <Route path="/apply/public-limited-company-registration" element={<PublicCompanyModule />} />
                <Route path="/apply/public-limited" element={<PublicCompanyModule />} />
                <Route path="/apply/public-company" element={<PublicCompanyModule />} />
                <Route path="/services/producer-company" element={<ProducerCompanyModule />} />
                <Route path="/services/producer-company-registration" element={<ProducerCompanyModule />} />
                <Route path="/services/fpo-registration" element={<ProducerCompanyModule />} />
                <Route path="/services/farmer-producer-company" element={<ProducerCompanyModule />} />
                <Route path="/services/kisan-producer-company" element={<ProducerCompanyModule />} />
                <Route path="/producer-company" element={<ProducerCompanyModule />} />
                <Route path="/producer-company-registration" element={<ProducerCompanyModule />} />
                <Route path="/fpo-registration" element={<ProducerCompanyModule />} />
                <Route path="/farmer-producer-company" element={<ProducerCompanyModule />} />
                <Route path="/apply/producer-company" element={<ProducerCompanyModule />} />
                <Route path="/apply/producer-company-registration" element={<ProducerCompanyModule />} />
                <Route path="/apply/fpo-registration" element={<ProducerCompanyModule />} />
                <Route path="/services/proprietorship" element={<ProprietorshipModule />} />
                <Route path="/services/proprietorship-registration" element={<ProprietorshipModule />} />
                <Route path="/services/sole-proprietorship" element={<ProprietorshipModule />} />
                <Route path="/services/sole-proprietorship-registration" element={<ProprietorshipModule />} />
                <Route path="/proprietorship" element={<ProprietorshipModule />} />
                <Route path="/proprietorship-registration" element={<ProprietorshipModule />} />
                <Route path="/sole-proprietorship" element={<ProprietorshipModule />} />
                <Route path="/sole-proprietorship-registration" element={<ProprietorshipModule />} />
                <Route path="/apply/proprietorship" element={<ProprietorshipModule />} />
                <Route path="/apply/sole-proprietorship" element={<ProprietorshipModule />} />
                <Route path="/services/trust-registration" element={<TrustRegistrationModule />} />
                <Route path="/services/trust" element={<TrustRegistrationModule />} />
                <Route path="/services/public-trust-registration" element={<TrustRegistrationModule />} />
                <Route path="/services/charitable-trust-registration" element={<TrustRegistrationModule />} />
                <Route path="/services/ngo-trust-registration" element={<TrustRegistrationModule />} />
                <Route path="/trust-registration" element={<TrustRegistrationModule />} />
                <Route path="/trust" element={<TrustRegistrationModule />} />
                <Route path="/public-trust" element={<TrustRegistrationModule />} />
                <Route path="/charitable-trust" element={<TrustRegistrationModule />} />
                <Route path="/apply/trust-registration" element={<TrustRegistrationModule />} />
                <Route path="/apply/trust" element={<TrustRegistrationModule />} />
                <Route path="/services/llp-registration" element={<LLPRegistrationModule />} />
                <Route path="/services/llp" element={<LLPRegistrationModule />} />
                <Route path="/services/limited-liability-partnership" element={<LLPRegistrationModule />} />
                <Route path="/llp-registration" element={<LLPRegistrationModule />} />
                <Route path="/llp" element={<LLPRegistrationModule />} />
                <Route path="/limited-liability-partnership" element={<LLPRegistrationModule />} />
                <Route path="/apply/llp-registration" element={<LLPRegistrationModule />} />
                <Route path="/apply/llp" element={<LLPRegistrationModule />} />
                <Route path="/apply/limited-liability-partnership" element={<LLPRegistrationModule />} />

                {/* Indian Subsidiary Registration */}
                <Route path="/services/indian-subsidiary" element={<IndianSubsidiaryModule />} />
                <Route path="/services/foreign-subsidiary" element={<IndianSubsidiaryModule />} />
                <Route path="/services/subsidiary" element={<IndianSubsidiaryModule />} />
                <Route path="/services/wholly-owned-subsidiary" element={<IndianSubsidiaryModule />} />
                <Route path="/indian-subsidiary" element={<IndianSubsidiaryModule />} />
                <Route path="/foreign-subsidiary" element={<IndianSubsidiaryModule />} />
                <Route path="/apply/indian-subsidiary" element={<IndianSubsidiaryModule />} />
                <Route path="/apply/foreign-subsidiary" element={<IndianSubsidiaryModule />} />

                {/* Section 8 Company Registration (Non-Profit NGO) */}
                <Route path="/services/section-8-company" element={<Section8Module />} />
                <Route path="/services/section-8" element={<Section8Module />} />
                <Route path="/services/section8" element={<Section8Module />} />
                <Route path="/services/section-8-company-registration" element={<Section8Module />} />
                <Route path="/services/ngo-registration" element={<Section8Module />} />
                <Route path="/section-8-company" element={<Section8Module />} />
                <Route path="/section-8" element={<Section8Module />} />
                <Route path="/section8" element={<Section8Module />} />
                <Route path="/ngo-registration" element={<Section8Module />} />
                <Route path="/apply/section-8-company" element={<Section8Module />} />
                <Route path="/apply/section-8" element={<Section8Module />} />
                <Route path="/apply/section8" element={<Section8Module />} />
                <Route path="/apply/ngo-registration" element={<Section8Module />} />

                {/* Online CA Consultation & Chartered Accountant Services */}
                <Route path="/services/ca-consultation" element={<CAConsultationModule />} />
                <Route path="/services/chartered-accountant-services" element={<CAConsultationModule />} />
                <Route path="/services/chartered-accountant" element={<CAConsultationModule />} />
                <Route path="/services/talk-to-ca" element={<CAConsultationModule />} />
                <Route path="/services/talk-to-a-chartered-accountant" element={<CAConsultationModule />} />
                <Route path="/chartered-accountant-services" element={<CAConsultationModule />} />
                <Route path="/chartered-accountant" element={<CAConsultationModule />} />
                <Route path="/ca-consultation" element={<CAConsultationModule />} />
                <Route path="/talk-to-a-chartered-accountant" element={<CAConsultationModule />} />
                <Route path="/talk-to-ca" element={<CAConsultationModule />} />
                <Route path="/apply/ca-consultation" element={<CAConsultationModule />} />
                <Route path="/apply/chartered-accountant-services" element={<CAConsultationModule />} />

                {/* Online Legal Consultation / Talk to a Lawyer */}
                <Route path="/services/legal-consultation" element={<LegalConsultationModule />} />
                <Route path="/services/talk-to-a-lawyer" element={<LegalConsultationModule />} />
                <Route path="/services/talk-to-lawyer" element={<LegalConsultationModule />} />
                <Route path="/services/lawyer-consultation" element={<LegalConsultationModule />} />
                <Route path="/legal-consultation" element={<LegalConsultationModule />} />
                <Route path="/talk-to-a-lawyer" element={<LegalConsultationModule />} />
                <Route path="/talk-to-lawyer" element={<LegalConsultationModule />} />
                <Route path="/apply/legal-consultation" element={<LegalConsultationModule />} />
                <Route path="/apply/talk-to-a-lawyer" element={<LegalConsultationModule />} />

                {/* Startup Structuring Advisory */}
                <Route path="/services/startup-structuring-advisory" element={<StartupStructuringModule />} />
                <Route path="/services/startup-structuring" element={<StartupStructuringModule />} />
                <Route path="/services/startup-advisory" element={<StartupStructuringModule />} />
                <Route path="/startup-structuring-advisory" element={<StartupStructuringModule />} />
                <Route path="/startup-structuring" element={<StartupStructuringModule />} />
                <Route path="/apply/startup-structuring-advisory" element={<StartupStructuringModule />} />
                <Route path="/apply/startup-structuring" element={<StartupStructuringModule />} />

                {/* GST Notice Hearing Representation */}
                <Route path="/services/gst-notice-hearing" element={<GstNoticeHearingModule />} />
                <Route path="/services/gst-notice-hearing-representation" element={<GstNoticeHearingModule />} />
                <Route path="/services/gst-hearing" element={<GstNoticeHearingModule />} />
                <Route path="/gst-notice-hearing" element={<GstNoticeHearingModule />} />
                <Route path="/gst-notice-hearing-representation" element={<GstNoticeHearingModule />} />
                <Route path="/apply/gst-notice-hearing" element={<GstNoticeHearingModule />} />
                <Route path="/apply/gst-notice-hearing-representation" element={<GstNoticeHearingModule />} />

                {/* Income Tax Dispute & Appeals */}
                <Route path="/services/income-tax-dispute-appeals" element={<IncomeTaxDisputeModule />} />
                <Route path="/services/income-tax-dispute" element={<IncomeTaxDisputeModule />} />
                <Route path="/services/income-tax-appeals" element={<IncomeTaxDisputeModule />} />
                <Route path="/income-tax-dispute-appeals" element={<IncomeTaxDisputeModule />} />
                <Route path="/income-tax-dispute" element={<IncomeTaxDisputeModule />} />
                <Route path="/income-tax-appeals" element={<IncomeTaxDisputeModule />} />
                <Route path="/apply/income-tax-dispute-appeals" element={<IncomeTaxDisputeModule />} />
                <Route path="/apply/income-tax-dispute" element={<IncomeTaxDisputeModule />} />

                {/* Trademark Hearing Support */}
                <Route path="/services/trademark-hearing-support" element={<TrademarkHearingModule />} />
                <Route path="/services/trademark-hearing" element={<TrademarkHearingModule />} />
                <Route path="/services/tm-hearing" element={<TrademarkHearingModule />} />
                <Route path="/trademark-hearing-support" element={<TrademarkHearingModule />} />
                <Route path="/trademark-hearing" element={<TrademarkHearingModule />} />
                <Route path="/apply/trademark-hearing-support" element={<TrademarkHearingModule />} />
                <Route path="/apply/trademark-hearing" element={<TrademarkHearingModule />} />

                {/* Monthly Payroll Management System */}
                <Route path="/services/monthly-payroll" element={<MonthlyPayrollModule />} />
                <Route path="/services/payroll" element={<MonthlyPayrollModule />} />
                <Route path="/services/online-payroll" element={<MonthlyPayrollModule />} />
                <Route path="/services/online-payroll-management" element={<MonthlyPayrollModule />} />
                <Route path="/services/payroll-management-system" element={<MonthlyPayrollModule />} />
                <Route path="/monthly-payroll" element={<MonthlyPayrollModule />} />
                <Route path="/online-payroll-management" element={<MonthlyPayrollModule />} />
                <Route path="/payroll" element={<MonthlyPayrollModule />} />
                <Route path="/apply/monthly-payroll" element={<MonthlyPayrollModule />} />
                <Route path="/apply/online-payroll-management" element={<MonthlyPayrollModule />} />

                {/* Statutory TDS Compliance & Return Filing */}
                <Route path="/services/statutory-tds-compliance" element={<StatutoryTdsModule />} />
                <Route path="/services/statutory-tds" element={<StatutoryTdsModule />} />
                <Route path="/services/tds-compliance" element={<StatutoryTdsModule />} />
                <Route path="/services/tds-compliance-filing" element={<StatutoryTdsModule />} />
                <Route path="/statutory-tds-compliance" element={<StatutoryTdsModule />} />
                <Route path="/statutory-tds" element={<StatutoryTdsModule />} />
                <Route path="/tds-compliance" element={<StatutoryTdsModule />} />
                <Route path="/apply/statutory-tds-compliance" element={<StatutoryTdsModule />} />
                <Route path="/apply/statutory-tds" element={<StatutoryTdsModule />} />
                <Route path="/apply/tds-compliance" element={<StatutoryTdsModule />} />

                {/* PF & ESI Monthly Returns & Compliance */}
                <Route path="/services/pf-esi-monthly-returns" element={<PfEsiModule />} />
                <Route path="/services/pf-esi" element={<PfEsiModule />} />
                <Route path="/services/pf-esi-returns" element={<PfEsiModule />} />
                <Route path="/services/epf-esic-filing" element={<PfEsiModule />} />
                <Route path="/pf-esi-monthly-returns" element={<PfEsiModule />} />
                <Route path="/pf-esi" element={<PfEsiModule />} />
                <Route path="/apply/pf-esi-monthly-returns" element={<PfEsiModule />} />
                <Route path="/apply/pf-esi" element={<PfEsiModule />} />

                {/* Virtual CFO & Accounting */}
                <Route path="/services/virtual-cfo" element={<VirtualCfoModule />} />
                <Route path="/services/virtual-cfo-accounting" element={<VirtualCfoModule />} />
                <Route path="/services/cfo-services" element={<VirtualCfoModule />} />
                <Route path="/virtual-cfo" element={<VirtualCfoModule />} />
                <Route path="/virtual-cfo-accounting" element={<VirtualCfoModule />} />
                <Route path="/apply/virtual-cfo" element={<VirtualCfoModule />} />
                <Route path="/apply/virtual-cfo-accounting" element={<VirtualCfoModule />} />

                {/* Secretarial Audit & Statutory Registers */}
                <Route path="/services/secretarial-audit-registers" element={<SecretarialAuditModule />} />
                <Route path="/services/secretarial-audit" element={<SecretarialAuditModule />} />
                <Route path="/services/statutory-registers" element={<SecretarialAuditModule />} />
                <Route path="/secretarial-audit-registers" element={<SecretarialAuditModule />} />
                <Route path="/secretarial-audit" element={<SecretarialAuditModule />} />
                <Route path="/apply/secretarial-audit-registers" element={<SecretarialAuditModule />} />
                <Route path="/apply/secretarial-audit" element={<SecretarialAuditModule />} />
                {/* Shop & Establishment Act Renewal */}
                <Route path="/services/shop-act-renewal" element={<ShopActRenewalModule />} />
                <Route path="/services/shop-establishment-renewal" element={<ShopActRenewalModule />} />
                <Route path="/services/gumasta-renewal" element={<ShopActRenewalModule />} />
                <Route path="/shop-act-renewal" element={<ShopActRenewalModule />} />
                <Route path="/gumasta-renewal" element={<ShopActRenewalModule />} />
                <Route path="/apply/shop-act-renewal" element={<ShopActRenewalModule />} />
                <Route path="/apply/gumasta-renewal" element={<ShopActRenewalModule />} />
                {/* Factory License Compliance */}
                <Route path="/services/factory-license-compliance" element={<FactoryLicenseModule />} />
                <Route path="/services/factory-license" element={<FactoryLicenseModule />} />
                <Route path="/services/dish-compliance" element={<FactoryLicenseModule />} />
                <Route path="/factory-license-compliance" element={<FactoryLicenseModule />} />
                <Route path="/factory-license" element={<FactoryLicenseModule />} />
                <Route path="/apply/factory-license-compliance" element={<FactoryLicenseModule />} />
                <Route path="/apply/factory-license" element={<FactoryLicenseModule />} />
                {/* ITR service flows: 3 steps (details, questionnaire, payment), configured in pages/itr-services */}
                {ITR_SERVICE_ROUTES.flatMap(({ slug, aliases = [] }) =>
                  flowRoutes(slug, aliases, <ItrServiceModule key={slug} slug={slug} />)
                )}
                {/* MCA service flows: the same 3 steps, configured in pages/mca-services */}
                {MCA_SERVICE_ROUTES.flatMap(({ slug, aliases = [] }) =>
                  flowRoutes(slug, aliases, <McaServiceModule key={slug} slug={slug} />)
                )}
                {/* TDS return filing flow: the same 3 steps with its own checkout */}
                {flowRoutes(TDS_ROUTE.slug, TDS_ROUTE.aliases, <TdsReturnFilingModule />)}
                {/* Income tax notice response: landing page, date and time booking, payment dialog */}
                {flowRoutes(NOTICE_ROUTE.slug, NOTICE_ROUTE.aliases, <NoticeResponseModule />)}
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
                <Route path="/apply/trademark-objection" element={<TrademarkObjectionModule />} />
                <Route path="/apply/tm-objection" element={<TrademarkObjectionModule />} />
                <Route path="/apply/trademark-objection-reply" element={<TrademarkObjectionModule />} />
                <Route path="/apply/trademark-renewal" element={<TrademarkRenewalModule />} />
                <Route path="/apply/tm-renewal" element={<TrademarkRenewalModule />} />
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
