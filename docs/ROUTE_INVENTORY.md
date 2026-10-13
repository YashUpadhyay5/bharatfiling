# BharatFiling — Complete Route Inventory

This inventory documents all routes discovered and mapped across the BharatFiling platform.

---

## 1. Public Website Routes

| Path | Component File | Auth Guard | Description & Primary Features | API Endpoints Invoked |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `frontend/src/pages/LandingPage.jsx` | Public | Homepage, hero with corporate value prop, popular CA/tax services, workflow overview, verified FAQs, contact CTA. | `GET /services` |
| `/services` | `frontend/src/pages/ServicesDirectory.jsx` | Public | Complete service directory, 40+ statutory filings, categorised accordions, fast-track statutory filings grid. | `GET /services` |
| `/services/gst-registration` | `frontend/src/pages/GstLandingPage.jsx` | Public | GST Registration statutory landing page with entity documentation checklist, workflow timeline, and pricing. | None (static / client state) |
| `/services/udyam-registration` | `frontend/src/pages/UdyamLandingPage.jsx` | Public | MSME / Udyam Registration landing page with benefits, eligibility, required docs, and instant start CTA. | None (static / client state) |
| `/services/msme-registration` | `frontend/src/pages/UdyamLandingPage.jsx` | Public | Alias to Udyam Registration landing page. | None (static / client state) |
| `/services/gst-return` | `frontend/src/pages/PlaceholderServicePage.jsx` | Public | GSTR-1 & GSTR-3B return filing service explanation, ITC 2B reconciliation, CA consultation trigger. | `POST /services/interest` |
| `/services/income-tax` | `frontend/src/pages/PlaceholderServicePage.jsx` | Public | Income Tax & Corporate ITR filing service explanation, AIS/26AS reconciliation, presumptive taxation. | `POST /services/interest` |
| `/services/company-registration`| `frontend/src/pages/PlaceholderServicePage.jsx` | Public | Private Limited Company Incorporation (MCA SPICe+) overview, name reservation, COI timeline. | `POST /services/interest` |
| `/services/llp-registration` | `frontend/src/pages/PlaceholderServicePage.jsx` | Public | Limited Liability Partnership (LLP) incorporation, LLP agreement drafting, DPIN issuance. | `POST /services/interest` |
| `/services/trademark` | `frontend/src/pages/PlaceholderServicePage.jsx` | Public | Trademark search and Form TM-A registration, 45 NICE classes, IP attorney representation. | `POST /services/interest` |
| `/services/legal` | `frontend/src/pages/PlaceholderServicePage.jsx` | Public | Corporate legal contracts, founder agreements, NDAs, and corporate secretarial advisory. | `POST /services/interest` |
| `/pricing` | `frontend/src/pages/PricingPage.jsx` | Public | Transparent fee breakdown across corporate registrations, tax filings, and ongoing compliance. | None |
| `/about` | `frontend/src/pages/AboutPage.jsx` | Public | Corporate mission, CA verification commitment, banking security, and contact details. | None |
| `/contact` | `frontend/src/pages/ContactPage.jsx` | Public | Corporate consultation inquiry form, office locations, phone hotline, and support email. | `POST /support/inquiry` |
| `/faq` | `frontend/src/pages/FaqPage.jsx` | Public | Frequently asked questions on tax, MCA, GST, and business registrations. | None |

---

## 2. Authentication & Account Access Routes

| Path | Component File | Modes / States | Description | Auth & Security Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| `/login` | `frontend/src/pages/AuthPages.jsx` | `defaultMode="login"` | Customer, CA, and Admin sign-in portal. Supports Email/Phone + Password and Firebase Phone OTP login. | JWT Auth (`/auth/login`), Firebase Phone Auth |
| `/register` | `frontend/src/pages/AuthPages.jsx` | `defaultMode="register"` | New customer onboarding with phone/email OTP verification, password creation, and profile auto-setup. | `POST /auth/register`, `POST /auth/register/verify-otp` |
| Modal: Forgot Password | `frontend/src/pages/AuthPages.jsx` | `mode="forgot-password"` | OTP-verified password recovery with reset tokens and instant password update. | `POST /auth/forgot-password/request-otp`, `POST /auth/forgot-password/reset` |

---

## 3. Customer Compliance Portal Routes

| Path | Component File | Auth Guard | Tabs & Sub-Views | API Endpoints Invoked |
| :--- | :--- | :--- | :--- | :--- |
| `/dashboard` | `frontend/src/pages/CustomerDashboard.jsx` | Customer (JWT) | `overview`: Live status tracking, statutory progress bar, certificate downloads.<br>`profile`: Customer master profile.<br>`businesses`: Registered business entities.<br>`applications`: List of all filed applications.<br>`docs`: 256-bit encrypted document vault.<br>`password`: Account security & password update. | `GET /profile/me`<br>`GET /applications/my`<br>`GET /businesses/my`<br>`POST /auth/change-password`<br>`GET /documents/download/:id` |

---

## 4. Chartered Accountant Workbench Routes

| Path | Component File | Auth Guard | Key Workflow Features | API Endpoints Invoked |
| :--- | :--- | :--- | :--- | :--- |
| `/ca/dashboard` | `frontend/src/pages/CaDashboardPage.jsx` | Role: `CA` or `ADMIN` | 4-Stage Action Pipeline:<br>1. Document Verification & Defect Reporting.<br>2. Form Preparation & ARN Entry.<br>3. Departmental Notice (REG-03) Clarification.<br>4. Approval, REG-06 / Certificate Upload & Completion.<br>Real-time Socket.IO synchronization (`ca:new_case`, `case:updated`). | `GET /ca/cases`<br>`GET /ca/cases/:id`<br>`POST /ca/cases/:id/verify-docs`<br>`POST /ca/cases/:id/submit-arn`<br>`POST /ca/cases/:id/approve`<br>`POST /ca/cases/:id/raise-query`<br>`POST /ca/cases/:id/upload-certificate` |

---

## 5. System Administration Portal Routes

| Path | Component File | Auth Guard | Features & Panels | API Endpoints Invoked |
| :--- | :--- | :--- | :--- | :--- |
| `/admin` | `frontend/src/pages/AdminDashboardPage.jsx` | Role: `ADMIN` | Platform KPIs (Total Revenue, Total Filings, Customers, Active CAs).<br>User management table with role assignments.<br>Security & statutory audit logs with IP addresses and timestamps. | `GET /admin/analytics`<br>`GET /admin/users`<br>`GET /admin/audit-logs` |

---

## 6. Statutory Onboarding & Application Wizards

| Path | Component File | Flow Step | Description | Key APIs |
| :--- | :--- | :--- | :--- | :--- |
| `/apply/gst` | `frontend/src/pages/gst-registration/index.jsx` | Step 1 & Step 2 | Step 1: PAN validation & applicant details.<br>Step 2: Business constitution, jurisdiction, and electricity bill upload. | `POST /gst/quote/create`<br>`POST /documents/upload` |
| `/apply/:serviceSlug` | `frontend/src/pages/gst-registration/index.jsx` | Dynamic Step | Dynamic wrapper for statutory services with prefilled service type. | `POST /gst/quote/create` |
| `/apply/udyam`, `/apply/msme` | `frontend/src/pages/udyam-registration/index.jsx` | Step 1 & Step 2 | Step 1: Aadhaar, PAN verification & entrepreneur identity.<br>Step 2: Enterprise name, plant address, NIC category, and bank details. | `POST /udyam/quote/create` |
| `/checkout/:orderId` | `frontend/src/pages/gst-registration/3-OrderCheckoutPage.jsx` | Step 3 (GST) | Transparent invoice breakdown (₹1,499 + 18% GST), UPI QR generator, Mock Razorpay direct payment. | `GET /gst/checkout/summary/:orderId`<br>`POST /gst/payment/verify-direct` |
| `/checkout/udyam/:orderId` | `frontend/src/pages/udyam-registration/3-UdyamCheckoutPage.jsx` | Step 3 (Udyam) | Transparent invoice breakdown (₹999 + 18% GST), UPI QR generator, Direct payment verification. | `GET /udyam/checkout/summary/:orderId`<br>`POST /udyam/payment/verify-direct` |
| `/apply/:serviceSlug/:appId` | `frontend/src/App.jsx` (`ApplicationRedirect`) | Dynamic redirect | Redirects direct application reference links to `/dashboard?app=:appId`. | None (Redirect) |

---

## 7. Global Shell & Overlay Components

| Component | File Path | Scope | Purpose |
| :--- | :--- | :--- | :--- |
| `Navbar` | `frontend/src/components/common/Navbar.jsx` | Global (except Checkout/Admin/CA) | Desktop 8-category mega menu, quick search, notification bell, user avatar, and mobile slide-in drawer. |
| `Footer` | `frontend/src/components/common/Footer.jsx` | Global (except Checkout/Admin/CA) | Statutory trust badges, categorized links, contact details, regulatory disclaimers. |
| `NavbarSearch` | `frontend/src/components/common/NavbarSearch.jsx` | Inside Navbar | Real-time fuzzy search across all services and compliance filing pages. |
| `NotificationBell`| `frontend/src/components/common/NotificationBell.jsx` | Navbar & Dashboards | Real-time alert feed for application status updates and notice notifications. |
| `AuthRequiredModal`| `frontend/src/components/common/AuthRequiredModal.jsx` | Public pages | Prompts unauthenticated visitors to sign in before starting an application. |
| `PaymentModal` | `frontend/src/components/checkout/PaymentModal.jsx` | GST Checkout | UPI QR code modal with simulated payment callback. |
| `DirectPaymentModal`| `frontend/src/pages/udyam-registration/components/DirectPaymentModal.jsx` | Udyam Checkout | Direct UPI payment modal with QR generation and instant verification. |
| `SupportWidget`| `frontend/src/components/common/SupportWidget.jsx` | Global overlay | Floating support launcher with quick WhatsApp helpline and ticket raising. |
| `ErrorBoundary`| `frontend/src/components/common/ErrorBoundary.jsx` | Shell wrapper | Catches React runtime exceptions gracefully with recovery action. |
