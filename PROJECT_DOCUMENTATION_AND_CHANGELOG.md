# BharatFiling — Complete System Architecture, Changelog & File Directory

> **Document Version**: 2.0.0  
> **Last Updated**: October 2026  
> **Platform**: BharatFiling (AI + CA-Powered Indian Compliance & Tax OS)  
> **Tech Stack**: Node.js v24 (Express, ES Modules), React 19 (Vite, Tailwind CSS, Lucide Icons), Supabase (PostgreSQL)  
> **Rule**: Pure JavaScript (`.jsx` / `.js`), Zero TypeScript, Strict Single-`l` `BharatFiling`

---

## Table of Contents
1. [Overview & System Philosophy](#1-overview--system-philosophy)
2. [Complete Master Changelog (What, Why, How & Where)](#2-complete-master-changelog)
   - [Feature 1: Universal Service Authentication Gate](#feature-1-universal-service-authentication-gate)
   - [Feature 2: Dynamic Search Popup Modal with Instant Autocomplete](#feature-2-dynamic-search-popup-modal-with-instant-autocomplete)
   - [Feature 3: Unified Visual Theme & Charcoal/Navy Palette](#feature-3-unified-visual-theme--charcoalnavy-palette)
   - [Feature 4: IndiaFilings-Grade Multi-Category Mega Navbar](#feature-4-indiafilings-grade-multi-category-mega-navbar)
   - [Feature 5: Production Supabase PostgreSQL Database Architecture](#feature-5-production-supabase-postgresql-database-architecture)
   - [Feature 6: Multi-Role Workbenches (Customer, CA, Admin)](#feature-6-multi-role-workbenches)
   - [Feature 7: 11-Step Statutory GST Filing Wizard](#feature-7-11-step-statutory-gst-filing-wizard)
   - [Feature 8: Dual Payment Gateway (Razorpay + UPI AutoPay)](#feature-8-dual-payment-gateway)
3. [Complete Database Schema & Table Structure](#3-complete-database-schema--table-structure)
4. [Master File & Directory Map](#4-master-file--directory-map)
5. [API Routes & Endpoints Reference](#5-api-routes--endpoints-reference)
6. [Operational Commands & Deployment](#6-operational-commands--deployment)

---

## 1. Overview & System Philosophy

**BharatFiling** is an enterprise Indian business compliance and taxation operating system. The platform bridges Indian business founders with licensed Chartered Accountants (CAs) and Advocates through an **AI + Human-in-the-Loop** model.

### Key Tenets:
1. **Single Source of Truth (Master KYC)**: Identity details (PAN, Aadhaar, Addresses, DOB) are verified once and seamlessly inherited across filings (GST, MCA, ITR, Trademark).
2. **Deterministic Pre-Checks + AI Assistance**: Machine verification handles OCR, structural sanity, and name mismatch detection before a human CA audits the dossier.
3. **Strict RBAC & Data Isolation**: Discrete access boundaries between Customers, reviewing Chartered Accountants, and Platform Administrators.
4. **Pure JavaScript**: Built cleanly with modern standard JavaScript (ES Modules in backend, JSX in frontend) without compile-time TypeScript complexity.

---

## 2. Complete Master Changelog

Every feature, enhancement, and architectural change is documented below with **What was added**, **Why it was requested**, **How it functions technically**, and **Where the files are located**.

---

### Feature 1: Universal Service Authentication Gate

- **WHAT**:
  A global authentication protection gate that intercepts clicks on any service card, link, button, or search result across the entire website. If the user is unauthenticated, a high-converting Auth Modal pops up; once authenticated, the user is automatically navigated directly into their target service.
- **WHY**:
  Users should not enter statutory filing forms, dynamic pricing, or state-specific workflows anonymously. Requiring login/registration protects draft data, associates filings with user accounts, and ensures instant prefill from their Master Profile.
- **HOW IT WORKS**:
  1. The central `AuthModalContext` exposes `openAuthModal(intendedRedirectPath, defaultTab)`.
  2. The custom hook `useServiceNavigation` provides a standard `handleServiceClick(servicePath)`.
  3. When an unauthenticated visitor clicks any service, `handleServiceClick` prevents default navigation, saves `intendedRedirectPath` into state and `sessionStorage`, and launches `AuthModal.jsx`.
  4. Upon successful login or registration, the modal triggers the redirect to the exact target path originally selected.
  5. If already logged in, the user proceeds to the service route immediately without interruption.
- **WHERE IT IS LOCATED**:
  - `frontend/src/context/AuthContext.jsx` *(Authentication state & token management)*
  - `frontend/src/context/AuthModalContext.jsx` *(Global modal trigger & intended URL retention)*
  - `frontend/src/hooks/useServiceNavigation.js` *(Reusable gate hook used across components)*
  - `frontend/src/components/common/AuthModal.jsx` *(Dual-tab Login / Register responsive modal)*
  - `frontend/src/components/layout/Navbar.jsx` *(Mega menu service links)*
  - `frontend/src/components/home/ServicesSection.jsx` *(Homepage service cards)*
  - `frontend/src/components/common/SearchModal.jsx` *(Search result clicks)*
  - `frontend/src/pages/ServicesPage.jsx` *(All services catalog)*

---

### Feature 2: Dynamic Search Popup Modal with Instant Autocomplete

- **WHAT**:
  A compact, sleek search trigger in the primary header that expands into a full-screen blurred backdrop modal with live auto-suggestions, category tags, quick filters, and keyboard navigation (`Esc` to close).
- **WHY**:
  The previous inline search bar occupied too much horizontal header space and caused layout wrapping. A modal dialog creates a focused search experience with room for autocomplete results and service metadata.
- **HOW IT WORKS**:
  1. `Navbar.jsx` renders a compact search button (`width: 140px-180px`) with a magnifying glass icon and `Ctrl+K` hint.
  2. Clicking opens `SearchModal.jsx` using React Portals with `aria-modal="true"`.
  3. As the user types (even a single letter), an optimized debounce filter runs against all 40+ catalog services matching title, category, keywords, and description.
  4. Search results display service category pills, estimated turnaround time, starting pricing, and clickable cards.
  5. Clicking any result triggers the **Universal Service Authentication Gate** before routing.
- **WHERE IT IS LOCATED**:
  - `frontend/src/components/common/SearchModal.jsx` *(Modal overlay, search index, filter pills)*
  - `frontend/src/components/layout/Navbar.jsx` *(Header search trigger button)*
  - `frontend/src/data/servicesData.js` *(Searchable static catalog & keywords)*

---

### Feature 3: Unified Visual Theme & Charcoal/Navy Palette

- **WHAT**:
  Replaced high-saturation blue hues and inconsistent navy gradients with a cohesive corporate palette:
  - **Deep Charcoal / Slate**: `#0f172a` (Slate 900) and `#1e293b` (Slate 800)
  - **Primary Action (Indian Saffron / Warm Amber)**: `#f97316` (Orange 500) and `#ea580c` (Orange 600)
  - **Success / Compliance Green**: `#10b981` (Emerald 500)
  - **Card Surfaces**: Clean `#ffffff` with subtle borders (`border-slate-200`) and soft shadows.
- **WHY**:
  The interface previously had visual clashing between royal blues, dark purples, and navies. A unified slate and saffron aesthetic reflects professional legal authority with high readability and modern finish.
- **HOW IT WORKS**:
  Standardized Tailwind CSS utility tokens across all layouts, cards, buttons, badges, and headers, ensuring consistent color variables across the application.
- **WHERE IT IS LOCATED**:
  - `frontend/src/index.css` *(Global Tailwind configuration and custom CSS helpers)*
  - `frontend/src/components/layout/Navbar.jsx` *(Header styling)*
  - `frontend/src/components/layout/Footer.jsx` *(Dark charcoal footer)*
  - `frontend/src/components/home/*.jsx` *(Hero, Stats, Services, Testimonials, FAQ)*

---

### Feature 4: IndiaFilings-Grade Multi-Category Mega Navbar

- **WHAT**:
  A comprehensive multi-column mega menu modeled after India's premier compliance portals, categorizing services into 6 statutory domains:
  1. **Startup & Entity Registration** (Private Limited, LLP, OPC, Section 8, Partnership)
  2. **MCA & Corporate Filings** (Director KYC, Annual Filings, Share Capital, Strike Off)
  3. **GST Services** (Registration, Monthly GSTR-1/3B, Annual Returns, LUT Filing)
  4. **Income Tax** (Salaried ITR, Business ITR, Capital Gains, TDS Returns, 15CA/CB)
  5. **Intellectual Property** (Trademark Filing, Copyright, Patent, Trademark Objection)
  6. **Licenses & Certifications** (FSSAI Food License, MSME Udyam, Import Export Code)
- **WHY**:
  Users require immediate, clear navigation to find their specific statutory filing without navigating multiple subpages.
- **HOW IT WORKS**:
  Hovering over any primary nav item dynamically opens a multi-column dropdown container featuring descriptions, starting pricing badges, and direct links. On mobile viewports, it collapses into a hierarchical accordion drawer.
- **WHERE IT IS LOCATED**:
  - `frontend/src/components/layout/Navbar.jsx` *(Mega menu render logic, dropdown state)*
  - `frontend/src/data/navigationCategories.js` *(Structured navigation tree and service items)*

---

### Feature 5: Production Supabase PostgreSQL Database Architecture

- **WHAT**:
  Engineered a production-ready relational schema comprising **11 tables** with strict primary keys, foreign key constraints, cascading rules, database indexes, and Row-Level Security (RLS) policies.
- **WHY**:
  The initial prototype relied on an in-memory JSON file (`backend/data/db.json`). To handle production workloads, concurrent filings, ACID transactions, and compliance data retention, a dedicated relational database on Supabase PostgreSQL is required.
- **HOW IT WORKS**:
  1. Connected to Supabase project `https://ruekrneqflodgdgnssqg.supabase.co`.
  2. Installed `@supabase/supabase-js` in backend.
  3. Designed relational DDL schema mapping all 11 core platform entities.
  4. Built an asynchronous database layer in `backend/src/database/` supporting both Supabase and transactional fallback.
- **WHERE IT IS LOCATED**:
  - `supabase_database_production_plan.md` *(Complete SQL DDL script & execution plan)*
  - `backend/src/database/db.js` *(Database operations & seeders)*
  - `backend/src/database/supabaseClient.js` *(Supabase client initialization)*
  - `backend/data/db.json` *(Development mock data store)*
  - `backend/.env` *(Database connection strings & Supabase API keys)*

---

### Feature 6: Multi-Role Workbenches

- **WHAT**:
  Three tailored operational consoles based on authenticated user roles:
  - **Customer Portal (`/dashboard`)**: Personal KYC vault, active applications list, tracking timeline, and invoices.
  - **CA Workbench (`/ca/dashboard`)**: Split-screen OCR document inspector, discrepancy audit, ARN entry, and registration certificate generation.
  - **Admin Control Center (`/admin/dashboard`)**: Revenue metrics, transaction volumes, CA assignment matrix, and platform audit logs.
- **WHY**:
  Different stakeholders require strictly segregated views: customers see simple progress updates; CAs need statutory tooling; admins need business governance.
- **HOW IT WORKS**:
  JWT token payload contains `role` (`CUSTOMER`, `CA`, `ADMIN`). The frontend `RoleRoute.jsx` protects routes, while backend middleware `authenticateToken` and `requireRole` enforce access on every API endpoint.
- **WHERE IT IS LOCATED**:
  - `frontend/src/components/auth/RoleRoute.jsx` *(Route-level role authorization)*
  - `frontend/src/pages/DashboardPage.jsx` *(Customer portal)*
  - `frontend/src/pages/CADashboardPage.jsx` *(CA review workbench)*
  - `frontend/src/pages/AdminDashboardPage.jsx` *(Admin console)*
  - `backend/src/middleware/auth.js` *(Backend RBAC enforcement)*
  - `backend/src/routes/ca.js` & `backend/src/routes/admin.js` *(Role endpoints)*

---

### Feature 7: 11-Step Statutory GST Filing Wizard

- **WHAT**:
  A comprehensive statutory filing engine guiding applicants through all stages of GST registration (Form GST REG-01):
  1. Business Structure Selection
  2. State & Jurisdiction Mapping
  3. Business Constitution & Legal Identity
  4. Authorized Signatory / Applicant Details
  5. Principal Place of Business & Proof of Possession
  6. Additional Places of Business (Warehouses/Branches)
  7. Top 5 Goods & Services (HSN / SAC Code Selector)
  8. Bank Account Details (Account & IFSC Verification)
  9. Document Upload Vault with Client-Side & AI OCR Precheck
  10. Final Sanity Review & AI Pre-check Certification
  11. Application Submission & Payment Checkout
- **WHY**:
  GST REG-01 requires exhaustive data. Breaking it down into validated, autosaved steps prevents data loss and simplifies complex legal requirements.
- **HOW IT WORKS**:
  Every field change autosaves to the backend application state. Master Profile data pre-fills common fields automatically. File uploads trigger OCR text extraction and cross-check applicant names against PAN and Aadhaar databases.
- **WHERE IT IS LOCATED**:
  - `frontend/src/pages/ApplicationWizardPage.jsx` *(11-step wizard container & state)*
  - `frontend/src/components/wizard/*.jsx` *(Step components: Step1 through Step11)*
  - `backend/src/routes/gst.js` *(Application save, step update, AI pre-check)*
  - `backend/src/routes/document.js` *(OCR file upload & parsing)*

---

### Feature 8: Dual Payment Gateway (Razorpay + UPI AutoPay)

- **WHAT**:
  Checkout pipeline supporting one-time payments (Razorpay PG, Dynamic UPI QR) and recurring compliance subscriptions (UPI AutoPay e-Mandate).
- **WHY**:
  Businesses filing one-time registrations need instant payment, while ongoing compliance clients (monthly GST returns, quarterly TDS) prefer automated UPI mandates.
- **HOW IT WORKS**:
  1. Order creation calculates base fee + 18% GST (CGST 9% + SGST 9% or IGST 18%).
  2. One-time payments generate Razorpay checkout payloads or dynamic UPI intent links.
  3. Recurring plans generate NPCI-compliant UPI AutoPay mandate setups.
  4. Payment completion triggers webhook/callback verification and advances application to `CA_REVIEW`.
- **WHERE IT IS LOCATED**:
  - `frontend/src/components/payment/PaymentModal.jsx` *(Checkout UI & QR render)*
  - `backend/src/routes/payment.js` *(Order generation, Razorpay HMAC verification, AutoPay state)*
  - `backend/src/services/paymentService.js` *(Payment gateway adapters)*

---

### Feature 9: Enterprise Modular Architecture (Dedicated Module Folders for 3-Screen Flows) & Removal of Legacy 11-Step Wizard

- **WHAT**:
  1. Complete removal of the cumbersome legacy 11-step wizard (`GstWizardPage.jsx`, 963 lines) from frontend, backend, and database schema.
  2. Implementation of a strict **Domain-Driven Modular Architecture**:
     - Frontend creates a dedicated `frontend/src/pages/gst-registration/` folder where every interconnected screen is an isolated, single-responsibility file.
     - Backend creates a dedicated `backend/src/routes/gst-registration/` folder splitting quotes, checkout, payment, and dossier into distinct sub-routers.
  3. Establishes the exact architectural blueprint for **all upcoming compliance modules** (Company Incorporation, LLP, Income Tax, Trademark).
- **WHY**:
  1. Monolithic 600- to 900-line files cramming multiple pages into one file make code unmaintainable, error-prone, and hard to understand.
  2. Forcing customers through an 11-step wizard after they already completed checkout/payment on Screen 3 created a confusing, broken user experience.
  3. In enterprise software (ClearTax, Stripe, IndiaFilings), each compliance product lives in its own self-contained module folder so new modules can be plugged in without risking regressions in existing ones.
- **HOW IT WORKS**:
  1. **Screen 1 (`1-ApplicantPanPage.jsx`)**: Captures Legal Name, Mobile (+91), and PAN with real-time 10-character structure validation badge. Advances to Screen 2.
  2. **Screen 2 (`2-BusinessJurisdictionPage.jsx`)**: Captures State / UT and Business Nature. Clicks "Get a Quote", calls `POST /api/v1/gst/onboarding-quote`, receives a unique order ID (e.g. `est1791...d`), and navigates immediately to Screen 3.
  3. **Screen 3 (`3-OrderCheckoutPage.jsx`)**: Displays the live order quotation breakdown (₹1,499 base + ₹270 18% GST = ₹1,769 total), deliverables accordion, customer summary, and launches the NPCI UPI AutoPay / QR modal. Upon payment confirmation, triggers celebration confetti and redirects to Screen 4.
  4. **Screen 4 (`4-DossierUploadPage.jsx`)**: Clean post-payment document upload desk. Replaces the 11-step wizard with a simple 3-file drag-and-drop dropzone (Electricity Bill / Rent Agreement, Aadhaar Card, Passport Photo) and live CA assignment tracker.
  5. **Backend Sub-Routers (`backend/src/routes/gst-registration/`)**:
     - `quote.routes.js`: Lead generation and initial application draft.
     - `checkout.routes.js`: Live quotation order breakdown retrieval.
     - `payment.routes.js`: UPI AutoPay mandate confirmation and status updates.
     - `dossier.routes.js`: Post-payment document uploads and CA dossier handoff.
     - `index.js`: Master barrel router mounted cleanly at `/api/v1/gst`.
- **WHERE IT IS LOCATED**:
  - `frontend/src/pages/gst-registration/1-ApplicantPanPage.jsx` *(Screen 1)*
  - `frontend/src/pages/gst-registration/2-BusinessJurisdictionPage.jsx` *(Screen 2)*
  - `frontend/src/pages/gst-registration/3-OrderCheckoutPage.jsx` *(Screen 3)*
  - `frontend/src/pages/gst-registration/4-DossierUploadPage.jsx` *(Screen 4 / Document Desk)*
  - `frontend/src/pages/gst-registration/index.jsx` *(Master module coordinator)*
  - `frontend/src/pages/gst-registration/constants.js` *(States & business natures)*
  - `frontend/src/pages/gst-registration/components/` *(Hero, TrustFooter, PanBadge)*
  - `backend/src/routes/gst-registration/quote.routes.js` *(Quote API)*
  - `backend/src/routes/gst-registration/checkout.routes.js` *(Checkout order API)*
  - `backend/src/routes/gst-registration/payment.routes.js` *(Payment verification API)*
  - `backend/src/routes/gst-registration/dossier.routes.js` *(Dossier document API)*
  - `backend/src/routes/gst-registration/index.js` *(Master barrel router)*
  - `backend/src/database/migrations/004_remove_11_steps_and_modularize.sql` *(DB migration)*

---

## 3. Complete Database Schema & Table Structure

The production database comprises **11 relational PostgreSQL tables** on Supabase:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BHARATFILING DATABASE                          │
├────────────────────────────────────────────────────────────────────────┤
│ 1. users                  - Authentication, credentials & RBAC        │
│ 2. customer_profiles      - Master reusable KYC (PAN, Aadhaar, address)│
│ 3. businesses             - Registered corporate entities & bank data  │
│ 4. services               - 40+ statutory compliance catalog           │
│ 5. field_definitions      - Dynamic form schema & validation rules     │
│ 6. service_applications   - End-to-end filing dossiers & statuses      │
│ 7. documents              - Vault files, OCR metadata & mismatch flags │
│ 8. orders                 - Financial transaction & AutoPay ledger    │
│ 9. case_events            - Real-time audit timeline & event stream    │
│ 10. support_tickets       - CA callback requests & client inquiries    │
│ 11. audit_logs            - Security compliance & administrative log   │
└────────────────────────────────────────────────────────────────────────┘
```

### Table 1: `users`
- `id` (UUID, PK): Primary key
- `email` (VARCHAR, Unique): Login email
- `phone` (VARCHAR, Unique): Contact mobile number
- `password_hash` (VARCHAR): Bcrypt password hash
- `role` (VARCHAR): `'CUSTOMER'`, `'CA'`, `'ADMIN'`
- `full_name` (VARCHAR): User's legal name
- `avatar_url` (TEXT): Profile photo URL
- `is_verified` (BOOLEAN): Verification status
- `metadata` (JSONB): Role-specific preferences
- `created_at`, `updated_at` (TIMESTAMPTZ)

### Table 2: `customer_profiles`
- `id` (UUID, PK)
- `user_id` (UUID, Unique, FK -> `users.id`)
- `personal_info` (JSONB): `{ full_name, father_name, dob, gender }`
- `identity_info` (JSONB): `{ pan_number, pan_verified, aadhaar_number, aadhaar_verified }`
- `contact_info` (JSONB): `{ mobile_number, mobile_verified, email, email_verified }`
- `address_info` (JSONB): `{ address_line_1, address_line_2, city, state, pincode }`
- `created_at`, `updated_at` (TIMESTAMPTZ)

### Table 3: `businesses`
- `id` (UUID, PK)
- `user_id` (UUID, FK -> `users.id`)
- `legal_name` (VARCHAR): Registered legal entity name
- `trade_name` (VARCHAR): Brand/store name
- `business_type` (VARCHAR): Proprietorship, Pvt Ltd, LLP, etc.
- `business_pan` (VARCHAR): Entity PAN
- `cin_llpin` (VARCHAR): MCA registration number
- `state` (VARCHAR): Jurisdiction state
- `address_line_1`, `address_line_2`, `city`, `pincode` (Address fields)
- `business_activity` (TEXT): Description of business
- `bank_account_no`, `bank_ifsc`, `bank_name` (Bank details)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### Table 4: `services`
- `id` (VARCHAR, PK): e.g. `'gst-registration'`
- `title` (VARCHAR): e.g. `'GST Registration'`
- `slug` (VARCHAR, Unique): URL route
- `category` (VARCHAR): Service grouping
- `base_fee`, `govt_fee`, `gst_rate` (NUMERIC)
- `description` (TEXT)
- `features` (JSONB): Array of deliverables
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMPTZ)

### Table 5: `field_definitions`
- `field_id` (VARCHAR, PK): e.g. `'FLD_PAN'`
- `field_key` (VARCHAR): Form binding key
- `label` (VARCHAR): Display label
- `section` (VARCHAR): Step/section name
- `field_type` (VARCHAR): `text`, `select`, `date`, `file`, etc.
- `required` (BOOLEAN)
- `validation_rule` (TEXT): Validation regex pattern
- `description` (TEXT): Tooltip help
- `source` (VARCHAR): `'USER_INPUT'`, `'OCR_EXTRACTED'`, `'MASTER_PROFILE'`
- `is_sensitive` (BOOLEAN): PII data flag
- `created_at` (TIMESTAMPTZ)

### Table 6: `service_applications`
- `id` (UUID, PK)
- `application_number` (VARCHAR, Unique): e.g. `'BF-GST-2026-0001'`
- `service_id` (VARCHAR)
- `user_id` (UUID, FK -> `users.id`)
- `business_id` (UUID, FK -> `businesses.id`, Nullable)
- `business_type` (VARCHAR)
- `state` (VARCHAR)
- `current_step` (INTEGER): 1 through 10
- `customer_status` (VARCHAR): Friendly status label
- `internal_status` (VARCHAR): `'DRAFT'`, `'AI_PRECHECK'`, `'CA_REVIEW'`, `'APPLICATION_PREPARATION'`, `'GOVERNMENT_PROCESSING'`, `'COMPLETED'`, `'REJECTED'`
- `fields_data` (JSONB): Complete form input payload
- `ai_precheck_summary` (JSONB): Validation flags and readiness score
- `assigned_ca_id` (UUID, FK -> `users.id`, Nullable)
- `arn` (VARCHAR): Government filing ARN
- `gstin` (VARCHAR): Issued registration number
- `certificate_url` (TEXT): Certificate download URL
- `payment_completed` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### Table 7: `documents`
- `id` (UUID, PK)
- `application_id` (UUID, FK -> `service_applications.id`)
- `user_id` (UUID, FK -> `users.id`)
- `document_type` (VARCHAR): e.g. `'PAN_CARD'`, `'AADHAAR_CARD'`
- `original_name`, `file_name`, `file_path`, `file_url`
- `mime_type`, `file_size`
- `status` (VARCHAR): `'UPLOADED'`, `'AI_CHECKED'`, `'FLAGGED_MISMATCH'`, `'CA_APPROVED'`, `'CA_REJECTED'`
- `ocr_extracted_data` (JSONB): Parsed names, numbers, addresses
- `ai_confidence` (NUMERIC): Confidence rating (0.0 to 1.0)
- `mismatch_flags` (JSONB): Flagged discrepancies
- `ca_notes` (TEXT)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### Table 8: `orders`
- `id` (VARCHAR, PK): e.g. `'ord_001'`
- `order_number` (VARCHAR, Unique): e.g. `'ORD-2026-001'`
- `application_id` (UUID, FK -> `service_applications.id`, Nullable)
- `user_id` (UUID, FK -> `users.id`, Nullable)
- `service_name` (VARCHAR)
- `amount`, `subtotal`, `gst_amount` (NUMERIC)
- `currency` (VARCHAR): `'INR'`
- `status` (VARCHAR): `'CREATED'`, `'PAID'`, `'ACTIVE_AUTOPAY'`, `'FAILED'`, `'REFUNDED'`
- `billing_cycle` (VARCHAR): `'One-Time'`, `'Monthly'`, `'Annual'`
- `payment_mode` (VARCHAR): `'UPI_QR'`, `'AUTOPAY'`, `'RAZORPAY'`
- `upi_id`, `transaction_id`, `razorpay_order_id`, `razorpay_payment_id`
- `customer_name`, `customer_email`, `customer_phone`, `customer_pan`
- `paid_amount`, `paid_at`
- `created_at`, `updated_at` (TIMESTAMPTZ)

### Table 9: `case_events`
- `id` (UUID, PK)
- `application_id` (UUID, FK -> `service_applications.id`)
- `title` (VARCHAR): Headline
- `description` (TEXT): Event summary
- `actor_role` (VARCHAR): `'CUSTOMER'`, `'SYSTEM'`, `'AI'`, `'CA'`, `'GOVERNMENT'`
- `created_at` (TIMESTAMPTZ)

### Table 10: `support_tickets`
- `id` (UUID, PK)
- `user_id` (UUID, FK -> `users.id`, Nullable)
- `application_id` (UUID, FK -> `service_applications.id`, Nullable)
- `type` (VARCHAR): `'PHONE_CALLBACK'`, `'QUERY'`, `'COMPLAINT'`
- `subject` (VARCHAR)
- `message` (TEXT)
- `status` (VARCHAR): `'OPEN'`, `'IN_PROGRESS'`, `'RESOLVED'`, `'CLOSED'`
- `phone`, `preferred_time`
- `assigned_to` (UUID, FK -> `users.id`, Nullable)
- `resolution_notes` (TEXT)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### Table 11: `audit_logs`
- `id` (UUID, PK)
- `actor_id` (UUID, FK -> `users.id`, Nullable)
- `actor_role` (VARCHAR)
- `action` (VARCHAR): e.g. `'CA_APPROVAL'`, `'STATUS_TRANSITION'`
- `resource_type` (VARCHAR): e.g. `'service_applications'`
- `resource_id` (VARCHAR)
- `details` (JSONB)
- `ip_address` (VARCHAR)
- `created_at` (TIMESTAMPTZ)

---

## 4. Master File & Directory Map

```
bharatfiling/
├── backend/
│   ├── data/
│   │   └── db.json                         # Persistent transactional JSON store & mock records
│   ├── scripts/
│   │   └── test_supabase.js                # Supabase connectivity diagnostic script
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js                      # Centralized environment variable parser
│   │   ├── database/
│   │   │   └── db.js                       # Master database repository with methods & seeders
│   │   ├── middleware/
│   │   │   ├── auth.js                     # JWT verification & role authorization (RBAC)
│   │   │   └── upload.js                   # Multer file upload & storage handler
│   │   ├── routes/
│   │   │   ├── admin.js                    # Admin KPI metrics, users, audit logs
│   │   │   ├── auth.js                     # Registration, login, token refresh, current user
│   │   │   ├── business.js                 # Business profiles CRUD
│   │   │   ├── ca.js                       # CA workbench, case review, ARN issuance
│   │   │   ├── document.js                 # Document upload, OCR extraction, AI mismatch check
│   │   │   ├── field.js                    # Dynamic form field definitions & validations
│   │   │   ├── gst.js                      # GST application wizard CRUD, autosave, steps
│   │   │   ├── payment.js                  # Razorpay & UPI AutoPay orders and verification
│   │   │   ├── profile.js                  # Master Customer KYC Profile management
│   │   │   └── support.js                  # CA callbacks & customer ticket creation
│   │   └── index.js                        # Express server entry point (Port 5000)
│   ├── .env                                # Backend secrets, keys & Supabase credentials
│   └── package.json                        # Dependencies (Express, JWT, Multer, Razorpay, Supabase)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── RoleRoute.jsx           # Protected route wrapper enforcing RBAC
│   │   │   ├── common/
│   │   │   │   ├── AuthModal.jsx           # Global login/register popup modal
│   │   │   │   ├── DemoRoleSwitcher.jsx    # Floating 1-click test role switcher
│   │   │   │   └── SearchModal.jsx         # Full-screen search popup with live autocomplete
│   │   │   ├── home/
│   │   │   │   ├── CTASection.jsx          # Bottom conversion call-to-action banner
│   │   │   │   ├── FAQSection.jsx          # Interactive accordions for compliance FAQs
│   │   │   │   ├── HeroSection.jsx         # High-impact hero with trust badges & quick CTA
│   │   │   │   ├── HowItWorksSection.jsx   # 4-step AI + CA process visualization
│   │   │   │   ├── ServicesSection.jsx     # Categorized service cards with auth-gating
│   │   │   │   ├── StatsSection.jsx        # Key platform metrics & numbers
│   │   │   │   └── TestimonialsSection.jsx # Client reviews & success stories
│   │   │   ├── layout/
│   │   │   │   ├── Footer.jsx              # Comprehensive dark footer with legal links
│   │   │   │   └── Navbar.jsx              # IndiaFilings-style mega menu & compact search
│   │   │   ├── payment/
│   │   │   │   └── PaymentModal.jsx        # Razorpay & UPI QR checkout modal
│   │   │   └── wizard/
│   │   │       ├── Step1_Structure.jsx     # Business structure selector
│   │   │       ├── Step2_State.jsx         # State & jurisdiction selector
│   │   │       ├── Step3_Constitution.jsx  # Constitution & PAN validation
│   │   │       ├── Step4_Signatory.jsx     # Authorized signatory details
│   │   │       ├── Step5_PrincipalPlace.jsx# Principal business address
│   │   │       ├── Step6_AdditionalPlaces.jsx# Branches & warehouses
│   │   │       ├── Step7_GoodsServices.jsx # HSN & SAC code search & pick
│   │   │       ├── Step8_BankDetails.jsx   # Bank account & IFSC lookup
│   │   │       ├── Step9_Documents.jsx     # Drag-and-drop vault upload with OCR
│   │   │       ├── Step10_Review.jsx       # AI pre-check review & readiness
│   │   │       └── Step11_Payment.jsx      # Fee invoice & payment trigger
│   │   ├── context/
│   │   │   ├── AuthContext.jsx             # User authentication context & tokens
│   │   │   └── AuthModalContext.jsx        # Auth modal open/close & redirect storage
│   │   ├── data/
│   │   │   ├── navigationCategories.js     # Mega menu hierarchy & service routes
│   │   │   └── servicesData.js             # Static catalog, pricing, and keywords
│   │   ├── hooks/
│   │   │   └── useServiceNavigation.js     # Universal auth gate hook
│   │   ├── pages/
│   │   │   ├── AdminDashboardPage.jsx      # Admin platform metrics & governance
│   │   │   ├── ApplicationWizardPage.jsx   # 11-step filing wizard page container
│   │   │   ├── CADashboardPage.jsx         # CA review workbench
│   │   │   ├── DashboardPage.jsx           # Customer Master KYC & filings dashboard
│   │   │   ├── HomePage.jsx                # Main landing page
│   │   │   ├── LoginPage.jsx               # Dedicated login page
│   │   │   ├── RegisterPage.jsx            # Dedicated registration page
│   │   │   ├── ServicesPage.jsx            # All services directory
│   │   │   └── StaticPages.jsx             # About, Pricing, Contact, Privacy, Terms
│   │   ├── services/
│   │   │   └── api.js                      # Axios HTTP client with interceptors
│   │   ├── utils/
│   │   │   └── supabase.js                 # Frontend Supabase client initialization
│   │   ├── App.jsx                         # Main router & provider wrapper
│   │   ├── index.css                       # Global Tailwind CSS styles & design tokens
│   │   └── main.jsx                        # React root entry point
│   ├── .env                                # Frontend environment variables (Vite)
│   └── package.json                        # Dependencies (React 19, Tailwind, Lucide, Supabase)
│
├── CHANGES_ARCHITECTURE_AND_DOCS.md        # This master documentation file
├── README.md                               # Project quick start & overview
└── supabase_database_production_plan.md    # Ready-to-run PostgreSQL DDL & RLS script
```

---

## 5. API Routes & Endpoints Reference

All API routes are served under `/api/v1/`:

| Domain | Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/register` | Register new customer account | No |
| | `POST` | `/auth/login` | Login with email & password | No |
| | `GET` | `/auth/me` | Fetch authenticated user profile | Yes |
| **Profile** | `GET` | `/profile` | Get Master Customer KYC profile | Yes |
| | `PUT` | `/profile` | Update personal, PAN, Aadhaar, address | Yes |
| **Business** | `GET` | `/businesses` | List user's registered businesses | Yes |
| | `POST` | `/businesses` | Create new business profile | Yes |
| **GST Dossier** | `GET` | `/gst/applications` | List user's applications | Yes |
| | `POST` | `/gst/applications` | Create new filing draft | Yes |
| | `GET` | `/gst/applications/:id` | Fetch application by ID | Yes |
| | `PUT` | `/gst/applications/:id/step` | Autosave step data & update step | Yes |
| | `POST` | `/gst/applications/:id/precheck` | Trigger AI sanity pre-check | Yes |
| **Documents** | `POST` | `/documents/upload` | Upload document file & run OCR | Yes |
| | `GET` | `/documents/:applicationId` | List documents for application | Yes |
| **Payment** | `POST` | `/payment/create-order` | Generate Razorpay order / UPI intent | Yes |
| | `POST` | `/payment/verify` | Verify payment signature | Yes |
| | `POST` | `/payment/create-autopay` | Initialize recurring UPI AutoPay mandate | Yes |
| **CA Bench** | `GET` | `/ca/cases` | List pending cases assigned to CA | CA Only |
| | `POST` | `/ca/cases/:id/action` | Issue ARN, approve, or request info | CA Only |
| **Admin** | `GET` | `/admin/stats` | Platform revenue & filing KPIs | Admin Only |
| | `GET` | `/admin/users` | List platform users & roles | Admin Only |
| | `GET` | `/admin/audit-logs` | Retrieve security audit trail | Admin Only |
| **Support** | `POST` | `/support/callback` | Schedule CA callback request | No / Optional |

---

## 6. Operational Commands & Deployment

### Start Backend Server:
```bash
cd backend
node src/index.js
# Runs on http://localhost:5000
```

### Start Frontend Client:
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

### Pre-configured Demo Accounts:
- **Customer**: `rahul.verma@example.com` / `Password@123`
- **Chartered Accountant**: `ca.sharma@taxveda.com` / `Password@123`
- **Platform Admin**: `admin@taxveda.com` / `Password@123`
- **Alternative Customer**: `yashupdhyay486@gmail.com` / `Password@123`

---
*Created and maintained for BharatFiling Platform Engineering.*
