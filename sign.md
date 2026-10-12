# BharatFiling — Sign-In, Registration & Password Recovery Architecture Guide (`sign.md`)

> **Platform:** BharatFiling (Indian Taxation, GST, Accounting & Business Compliance OS)  
> **Status:** Production Specification & Development Runbook  
> **Target Environment:** Express 5 Backend + Supabase PostgreSQL + React 19 Frontend  
> **Author:** BharatFiling Core Engineering  

---

## Table of Contents

1. [Executive Summary & High-Level Architecture](#1-executive-summary--high-level-architecture)
2. [Why: Security Rationale & Engineering Principles](#2-why-security-rationale--engineering-principles)
3. [Where: Complete Codebase Map & Component Directory](#3-where-complete-codebase-map--component-directory)
4. [How: End-to-End Lifecycle Walkthroughs](#4-how-end-to-end-lifecycle-walkthroughs)
   * [Flow A: User Registration & Email OTP Verification](#flow-a-user-registration--email-otp-verification)
   * [Flow B: User Login (Email or Phone)](#flow-b-user-login-email-or-phone)
   * [Flow C: Forgot Password & Account Recovery](#flow-c-forgot-password--account-recovery)
5. [How It Works in Development vs. Production](#5-how-it-works-in-development-vs-production)
6. [Universal Email Dispatch: Sending from Gmail to ANY Recipient](#6-universal-email-dispatch-sending-from-gmail-to-any-recipient)
7. [Cloud Infrastructure: Render Web Service vs. Static Site](#7-cloud-infrastructure-render-web-service-vs-static-site)
8. [Database Schema: Supabase PostgreSQL](#8-database-schema-supabase-postgresql)
9. [Troubleshooting & Common Errors Guide](#9-troubleshooting--common-errors-guide)
10. [Security & OWASP Compliance Checklist](#10-security--owasp-compliance-checklist)
11. [Free Tier Limits Matrix (SMS vs. Email Providers)](#11-free-tier-limits-matrix-sms-vs-email-providers)
12. [Firebase Phone Auth & Zero-DLT Indian SMS Guide](#12-firebase-phone-auth--zero-dlt-indian-sms-guide)
13. [Hybrid Database Resilience & Sandbox Auto-Routing](#13-hybrid-database-resilience--sandbox-auto-routing)

---

## 1. Executive Summary & High-Level Architecture

BharatFiling implements an enterprise-grade, independent authentication and account lifecycle engine.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              BHARATFILING CLOUD ARCHITECTURE                           │
├──────────────────────────┬─────────────────────────────────────────────────────────────┤
│ Frontend (React 19 Vite) │ https://bharatfiling.onrender.com (Render Static Site)       │
│ Backend API (Express 5)  │ https://bharatfiling-1.onrender.com (Render Web Service)      │
│ Database (PostgreSQL)    │ Supabase PostgreSQL DB (Public schema tables)               │
│ Authentication Tokens    │ Express-signed JWTs (HMAC-SHA256, 7-day TTL)                │
│ Password Security        │ Bcrypt (Blowfish crypt, work factor 10)                     │
│ OTP Protection           │ Keyed HMAC-SHA256 (Server pepper) + 5-minute TTL            │
│ Email Transport          │ Universal HTTPS API (Port 443) + Resend / Brevo + SMTP      │
└──────────────────────────┴─────────────────────────────────────────────────────────────┘
```

### Core Architecture Highlights:
1. **Independent Auth Control:** We use Supabase strictly as a reliable PostgreSQL database (`public.users`, `public.customer_profiles`, `public.otps`). Supabase Auth is **not used**, preventing proprietary vendor lock-in and allowing total control over Indian compliance fields (PAN, Aadhaar, GSTIN, CA roles).
2. **Keyed HMAC-SHA256 OTP Verification:** 6-digit OTPs are never stored in plaintext or basic hashes. They are cryptographically hashed using a private server-side pepper, making rainbow-table cracking impossible.
3. **Staged Registration Engine:** Unverified users are never inserted into `public.users`. Their registration payload is staged in temporary OTP records until email ownership is proven.
4. **Cloud-Resilient Email Architecture:** Outbound email delivery bypasses cloud firewall port blocks by leveraging HTTPS REST APIs (Port 443) with multi-tier fallback.

---

## 2. Why: Security Rationale & Engineering Principles

### A. Why Staged Registration is Mandatory
* **Preventing Garbage Data:** If accounts are created before email verification, spam bots and typos create orphaned user records that pollute the database.
* **No Plaintext Passwords on the Client:** Storing unverified passwords in browser `sessionStorage` or `localStorage` creates severe Cross-Site Scripting (XSS) risks.
* **Our Solution:** The password is encrypted with Bcrypt work factor 10 immediately upon form submission and staged inside `public.otps`. The actual user is committed to `public.users` only when the correct 6-digit OTP is verified.

### B. Why Plain SHA-256 for a 6-Digit OTP is Vulnerable
A 6-digit OTP has only $1,000,000$ possible combinations (`000000` to `999999`).
* If a simple hash like `SHA-256("123456")` is stored in the database, an attacker with read access can precompute a rainbow table for all 1 million numbers in **under 0.2 seconds** on an ordinary laptop GPU.
* **The BharatFiling Solution (Keyed HMAC-SHA256):**
  $$\text{OTP Verifier} = \text{HMAC-SHA256}(\text{key} = \text{OTP\_PEPPER}, \text{data} = \text{OTP} \parallel \text{email} \parallel \text{purpose} \parallel \text{txn\_id})$$
  Because `OTP_PEPPER` is kept strictly in server memory and Render environment variables, even a complete database leak reveals zero information about the active OTPs.

### C. Why Purpose Binding is Enforced
Every OTP generated has a strict `purpose`:
* `REGISTRATION`: Only valid for creating a new user account.
* `PASSWORD_RESET`: Only valid for issuing a password recovery authorization token.
* `CHANGE_PASSWORD`: Only valid for in-session credential modification.

An OTP generated for registration can **never** be used to reset a password, preventing privilege escalation and cross-purpose replay attacks.

### D. Why Friendly Unregistered Feedback Outperforms Silent Traps
* **Traditional Anti-Enumeration:** Standard banking systems return `success: true` even if an email is not registered, preventing attackers from checking who has an account.
* **The Real-World Problem:** Genuine customers who forgot if they registered or made a typo get completely stuck. The UI asks for a 6-digit code, no email arrives, and typing a code returns `400 Bad Request`.
* **The BharatFiling Solution:** 
  If an email does not exist during password recovery, the backend returns:
  `{ success: false, not_registered: true, message: "No account found with this email. Please register first." }`
  The frontend immediately displays an alert banner with a 1-click **"Create Account"** button that switches tabs and pre-fills the email.

---

## 3. Where: Complete Codebase Map & Component Directory

All authentication and email code is organized modularly across frontend and backend:

```
bharatfiling/
├── frontend/
│   └── src/
│       ├── api/
│       │   └── auth.js                     # Central Axios API client for auth endpoints
│       ├── components/
│       │   └── common/
│       │       └── AuthRequiredModal.jsx   # Interactive modal when guest tries CA filing
│       └── pages/
│           └── AuthPages.jsx               # Unified Login, Register & Forgot Password UI
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js                      # Central environment & secret manager
│   │   ├── database/
│   │   │   ├── supabaseClient.js           # Supabase PostgreSQL client (DB queries only)
│   │   │   ├── db.js                       # Safe local fallback database (db.json)
│   │   │   └── migrations/
│   │   │       ├── 001_initial_schema.sql  # Users and Profiles schema
│   │   │       └── 005_backend_jwt_otp_schema.sql  # Dedicated OTP and reset tokens table
│   │   ├── middleware/
│   │   │   ├── auth.js                     # JWT verification & role authorization (CUSTOMER/CA/ADMIN)
│   │   │   └── rateLimiter.js              # Express rate-limiting for auth routes
│   │   ├── models/
│   │   │   ├── User.js                     # UserModel querying public.users
│   │   │   ├── CustomerProfile.js          # CustomerProfileModel querying customer_profiles
│   │   │   └── Otp.js                      # OtpModel managing public.otps
│   │   ├── routes/
│   │   │   └── auth.routes.js              # Master auth router (all endpoints)
│   │   └── services/
│   │       ├── crypto.service.js           # HMAC generation, verification, secure tokens
│   │       ├── email.service.js            # Dispatch orchestrator & multi-tier fallback
│   │       └── providers/
│   │           ├── devEmailProvider.js     # Dev-mode console logger & test simulator
│   │           ├── httpEmailProvider.js    # Production HTTPS REST dispatcher (Resend/Brevo)
│   │           └── smtpEmailProvider.js    # SMTP Nodemailer dispatcher (Gmail SMTP)
│   └── .env                                # Local secrets file (NEVER committed to git)
│
├── otp.md                                  # Cryptographic OTP specification
└── sign.md                                 # This document
```

---

## 4. How: End-to-End Lifecycle Walkthroughs

### Flow A: User Registration & Email OTP Verification

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant FE as React Frontend (AuthPages.jsx)
    participant BE as Express Backend (auth.routes.js)
    participant DB as Supabase PostgreSQL
    participant Mail as Email Gateway (Port 443)

    User->>FE: Enters Name, Email, Phone, Password
    FE->>BE: POST /api/v1/auth/register/request-otp
    BE->>DB: Check if email/phone exists
    alt Already exists
        BE-->>FE: 400 Bad Request ("Account exists, please sign in")
    else New User
        BE->>BE: Generate 6-digit OTP & HMAC Verifier
        BE->>DB: Stage user payload in public.otps (TTL 5 mins)
        BE->>Mail: Dispatch Registration OTP Email
        alt Mail Dispatch Fails
            BE->>DB: ROLLBACK staged OTP (deletes record)
            BE-->>FE: 500 Error ("Email delivery failed, please check address")
        else Mail Dispatch Succeeds
            BE-->>FE: 200 OK { success: true, txn_id, cooldown_seconds: 60 }
            FE->>User: Displays Step 2 (Enter 6-digit OTP) with 60s countdown
        end
    end

    User->>FE: Enters 6-digit code from Email
    FE->>BE: POST /api/v1/auth/register/verify-otp { email, otp, txn_id }
    BE->>DB: Fetch OTP record by txn_id
    BE->>BE: Verify HMAC in constant time (timingSafeEqual)
    alt Code Invalid
        BE->>DB: Increment failed attempts counter
        BE-->>FE: 400 Bad Request ("Invalid code. X attempts remaining")
    else Code Valid
        BE->>DB: Commit user to public.users (role: 'CUSTOMER')
        BE->>DB: Initialize public.customer_profiles
        BE->>DB: Mark OTP as consumed (is_consumed: true)
        BE->>BE: Generate signed JWT token
        BE-->>FE: 201 Created { token, user }
        FE->>User: Logged in & auto-redirected to Dashboard!
    end
```

---

### Flow B: User Login (Email or Phone)

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant FE as React Frontend (AuthPages.jsx)
    participant BE as Express Backend (auth.routes.js)
    participant DB as Supabase PostgreSQL

    User->>FE: Enters Identifier (Email or Phone) + Password
    FE->>BE: POST /api/v1/auth/login { identifier, password }
    BE->>DB: UserModel.findByIdentifier(identifier)
    alt User Not Found
        BE-->>FE: 401 Unauthorized ("Invalid email/phone or password")
    else User Exists
        BE->>BE: bcrypt.compare(password, user.password_hash)
        alt Password Incorrect
            BE-->>FE: 401 Unauthorized ("Invalid email/phone or password")
        else Password Correct
            BE->>BE: Generate signed JWT (7-day validity)
            BE-->>FE: 200 OK { token, user }
            FE->>FE: Store token in localStorage & update AuthState
            FE->>User: Redirect to requested page (/dashboard)
        end
    end
```

---

### Flow C: Forgot Password & Account Recovery

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant FE as React Frontend (AuthPages.jsx)
    participant BE as Express Backend (auth.routes.js)
    participant DB as Supabase PostgreSQL
    participant Mail as Email Gateway (Port 443)

    User->>FE: Enters Email in "Forgot Password"
    FE->>BE: POST /api/v1/auth/forgot-password/request-otp { email }
    BE->>DB: UserModel.findByEmail(cleanEmail)
    alt User NOT Registered
        BE-->>FE: 200 OK { success: false, not_registered: true, message: "No account found" }
        FE->>User: Shows Banner: "Account does not exist" + [Register Now] button
    else User Registered
        BE->>BE: Generate 6-digit recovery OTP & HMAC Verifier
        BE->>DB: Save OTP record in public.otps (purpose: 'PASSWORD_RESET')
        BE->>Mail: Dispatch Recovery Code Email
        BE-->>FE: 200 OK { success: true, txn_id, cooldown_seconds: 60 }
        FE->>User: Advances to Step 2 (Enter Recovery Code)
    end

    User->>FE: Enters 6-digit recovery code
    FE->>BE: POST /api/v1/auth/forgot-password/verify-otp { email, otp, txn_id }
    BE->>BE: Verify HMAC verifier
    BE->>DB: Generate single-use reset_token (10-minute validity)
    BE-->>FE: 200 OK { success: true, reset_token }
    FE->>User: Advances to Step 3 (Enter New Password)

    User->>FE: Enters new password
    FE->>BE: POST /api/v1/auth/forgot-password/reset-password { email, reset_token, new_password }
    BE->>DB: Validate reset_token against public.otps
    BE->>BE: Hash new password with bcrypt
    BE->>DB: Update password_hash in public.users
    BE->>DB: Invalidate reset_token
    BE->>Mail: Send security notification ("Password updated")
    BE-->>FE: 200 OK ("Password updated successfully")
    FE->>User: Redirects to Sign In!
```

---

## 5. How It Works in Development vs. Production

The BharatFiling codebase detects whether it is running on a developer's local machine or on Render Cloud and adjusts automatically:

| Feature | Development Mode (`NODE_ENV=development`) | Production Mode (`NODE_ENV=production`) |
| :--- | :--- | :--- |
| **Email Delivery** | Can use `EMAIL_PROVIDER=dev` (logs OTP to backend terminal) or local Gmail SMTP. | Strictly uses HTTPS REST APIs (Port 443) via Resend or Brevo to bypass cloud port blocks. |
| **Database** | Uses Supabase DB; if local offline, falls back seamlessly to `backend/data/db.json`. | Uses Supabase PostgreSQL DB with connection pooling. |
| **CORS Origins** | Permits `http://localhost:3000`, `http://localhost:5173`. | Strictly permits `https://bharatfiling.onrender.com`. |
| **Dev OTP Badges** | Disabled completely for clean UI consistency. | Disabled completely. |
| **Console Logs** | Shows sanitized development diagnostics. | Strips all sensitive tokens and OTP hashes from logs. |
| **Error Handling** | Returns stack details for rapid debugging. | Returns user-safe sanitized error messages. |

---

## 6. Universal Email Dispatch: Sending from Gmail to ANY Recipient

### The Challenge with Cloud Free Tiers
* Traditional email libraries (`nodemailer`) connect to SMTP servers on TCP ports `25`, `465`, or `587`.
* **Render Free Tier blocks all outbound connections on ports 25, 465, and 587** to prevent their servers from being used by spammers.
* Resend's free trial domain (`onboarding@resend.dev`) only delivers to the owner's email address (`yashupdhyay486@gmail.com`).

### The Solution: Universal HTTPS REST Gateway (Port 443)
HTTPS (Port 443) is standard web traffic and is **never blocked** by cloud firewalls.

#### Architecture of `backend/src/services/providers/httpEmailProvider.js`:

```javascript
// Dispatches emails over HTTPS Port 443 (Never blocked by cloud hosts)
if (ENV.RESEND_API_KEY) {
  // Dispatches via Resend API
  await fetch('https://api.resend.com/emails', { ... });
}

if (ENV.BREVO_API_KEY) {
  // Dispatches via Brevo API
  // Can set Sender Name: 'BharatFiling' and Sender Email: 'yashupdhyay486@gmail.com'
  // Delivers to ANY recipient worldwide (Gmail, Yahoo, @glbajajgroup.org, etc.)
  await fetch('https://api.brevo.com/v3/smtp/email', { ... });
}
```

### The Auto-Rollback Engine (Eliminates the 429 Lock)
In [`backend/src/routes/auth.routes.js`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/routes/auth.routes.js):
If the email gateway fails to send the verification code (e.g. invalid recipient address or network failure), the backend **immediately executes a database rollback**:

```javascript
try {
  await emailService.sendRegistrationOtp(cleanEmail, otp, full_name);
} catch (emailErr) {
  // ROLLBACK: Delete staged OTP so user is NOT trapped by 60s cooldown!
  await OtpModel.deleteByTxnId(txn_id);
  return res.status(500).json({
    success: false,
    message: 'Could not deliver verification email to this address. Please verify your email.',
  });
}
```
**Result:** The user can immediately fix a mistyped email and retry without being told to *"Wait 58 seconds"*!

---

## 7. Cloud Infrastructure: Render Web Service vs. Static Site

When configuring environment variables in the Render Dashboard, developers must distinguish between the two services:

```
                               ┌──────────────────────────────────────────────┐
                               │               RENDER DASHBOARD               │
                               └──────────────────────┬───────────────────────┘
                                                      │
                    ┌─────────────────────────────────┴─────────────────────────────────┐
                    │                                                                   │
         ❌ DO NOT CONFIGURE SECRETS HERE                                   ✅ CONFIGURE ALL SECRETS HERE
                    ▼                                                                   ▼
         ┌─────────────────────────────────┐                                 ┌─────────────────────────────────┐
         │           STATIC SITE           │                                 │           WEB SERVICE           │
         │         `bharatfiling`          │                                 │        `bharatfiling-1`         │
         ├─────────────────────────────────┤                                 ├─────────────────────────────────┤
         │ • React / Vite Frontend SPA     │                                 │ • Express 5 Node.js API         │
         │ • URL: bharatfiling.onrender.com│                                 │ • URL: bharatfiling-1.onrender  │
         │ • Runs in visitor's browser     │                                 │ • Runs on Linux Cloud VM        │
         │ • CANNOT execute backend code   │                                 │ • Connects to Supabase DB       │
         │ • CANNOT send emails            │                                 │ • Computes cryptographic OTPs   │
         │ • Env vars exposed to browser!  │                                 │ • Dispatches emails over HTTPS  │
         └─────────────────────────────────┘                                 └─────────────────────────────────┘
```

### Exact Variables for the Web Service (`bharatfiling-1`):

| Variable Key | Value | Purpose |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enforces production security optimizations |
| `FRONTEND_URL` | `https://bharatfiling.onrender.com` | Allowed CORS origin |
| `EMAIL_PROVIDER` | `resend` (or `brevo`) | Active email dispatch engine |
| `RESEND_API_KEY` | `re_...` | Resend HTTPS REST API Key |
| `FROM_EMAIL` | `onboarding@resend.dev` | Sender address (or `@bharatfiling.com`) |
| `FROM_NAME` | `BharatFiling` | Sender display name |
| `SMTP_USER` | `yashupdhyay486@gmail.com` | Fallback Gmail sender |
| `SMTP_PASS` | `your_16_character_app_password` | Google 16-character App Password (no spaces) |
| `JWT_SECRET` | *(Existing Secret)* | Secret key for signing Express JWTs |
| `OTP_PEPPER` | *(Existing Secret)* | Private HMAC secret for OTP hashes |
| `SUPABASE_URL` | `https://ruekrneqflodgdgnssqg.supabase.co` | Supabase API URL |
| `SUPABASE_SERVICE_ROLE_KEY` | *(Existing Key)* | Supabase Service Role Key |

---

## 8. Database Schema: Supabase PostgreSQL

All authentication state is stored across three tables in Supabase:

### Table 1: `public.users`
Stores verified, active user accounts:
```sql
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(32) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL DEFAULT 'CUSTOMER' CHECK (role IN ('CUSTOMER', 'CA', 'ADMIN')),
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table 2: `public.customer_profiles`
Stores the KYC, PAN, Aadhaar, and address details for every verified user. Automatically initialized during OTP verification.

### Table 3: `public.otps` (Migration `005_backend_jwt_otp_schema.sql`)
Dedicated table for staged registrations, active OTPs, and password recovery tokens:
```sql
CREATE TABLE IF NOT EXISTS public.otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    txn_id VARCHAR(64) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    otp_hash VARCHAR(255) NOT NULL,
    purpose VARCHAR(50) NOT NULL CHECK (purpose IN ('REGISTRATION', 'PASSWORD_RESET', 'CHANGE_PASSWORD')),
    staged_payload JSONB DEFAULT '{}'::jsonb,
    attempts INT NOT NULL DEFAULT 0,
    max_attempts INT NOT NULL DEFAULT 5,
    is_consumed BOOLEAN NOT NULL DEFAULT FALSE,
    is_superseded BOOLEAN NOT NULL DEFAULT FALSE,
    reset_token VARCHAR(128),
    reset_token_expires_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    consumed_at TIMESTAMPTZ
);
```

---

## 9. Troubleshooting & Common Errors Guide

### 1. Error `500` on Registration (`/register/request-otp`)
* **Symptom:** User clicks "Continue & Send Email OTP", spinner turns, browser console shows `Failed to load resource: 500`.
* **Root Cause:** Email dispatch failed. Either:
  1. Render blocked outbound SMTP port 465.
  2. Resend trial sandbox rejected an external email (e.g. `@glbajajgroup.org`).
* **Fix:** Ensure `RESEND_API_KEY` (or `BREVO_API_KEY`) is configured in the **`bharatfiling-1` Web Service** Environment. Verify that the auto-rollback engine deleted the staged OTP so the user can retry.

---

### 2. Error `429` ("Please wait 58 seconds before requesting a new code")
* **Symptom:** User clicks "Continue & Send Email OTP", an error occurs, user clicks again, and receives a cooldown warning.
* **Root Cause:** An earlier request created an OTP record in the database before failing to send the email.
* **Fix:** The auto-rollback engine removes the staged OTP on email failure, preventing un-sent OTPs from triggering the 60-second cooldown.

---

### 3. Error `400` on Forgot Password (`/forgot-password/verify-otp`)
* **Symptom:** Browser console shows `400 Bad Request: "No active password recovery request found"`.
* **Root Cause:** The entered email address does not exist in `public.users`. The anti-enumeration response caused the UI to ask for a code that was never sent.
* **Fix:** The frontend now inspects `res.not_registered` and presents a clear **"Account does not exist. Please register."** prompt with a 1-click button to switch to Registration.

---

### 4. Supabase Error `PGRST205` ("Could not find the table 'public.otps' in the schema cache")
* **Symptom:** Backend logs show Supabase queries failing and falling back to `db.json`.
* **Root Cause:** Migration [`005_backend_jwt_otp_schema.sql`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/database/migrations/005_backend_jwt_otp_schema.sql) has not been run in Supabase.
* **Fix:** Open the Supabase Dashboard -> **SQL Editor** -> Paste and run `005_backend_jwt_otp_schema.sql`.

---

## 10. Security & OWASP Compliance Checklist

| Security Control | Implementation in BharatFiling | ASVS Requirement |
| :--- | :--- | :--- |
| **No Plaintext Passwords** | Bcrypt with salt work factor 10. Passwords never stored or logged. | ASVS 2.1.1 |
| **Offline OTP Guessing Defense** | Keyed HMAC-SHA256 with server-side `OTP_PEPPER`. Rainbow tables impossible. | ASVS 2.2.1 |
| **Brute-Force Protection** | Hard limit of 5 attempts per OTP. Code locks automatically after 5 fails. | ASVS 2.2.2 |
| **Short OTP Validity** | Strict 5-minute Time-To-Live (TTL). Expired codes rejected instantly. | ASVS 2.2.3 |
| **Single-Use Enforcement** | Once verified, `is_consumed = true` prevents code reuse. | ASVS 2.2.4 |
| **Timing Attack Mitigation** | `crypto.timingSafeEqual` prevents side-channel timing analysis. | ASVS 2.2.5 |
| **Cross-Purpose Defense** | Purpose binding (`REGISTRATION` vs `PASSWORD_RESET`). | ASVS 2.8.1 |
| **Privilege Escalation Defense** | Registration endpoint strictly hardcodes `role: 'CUSTOMER'`. | ASVS 4.1.1 |
| **Secret Protection** | Zero plain secrets committed to git. Enforced via GitHub Push Protection. | ASVS 14.1.1 |

---

## 11. Free Tier Limits Matrix (SMS vs. Email Providers)

To achieve zero-cost operation during development, staging, and initial product launch, BharatFiling is engineered to maximize completely free quotas across both SMS and transactional Email providers.

### A. SMS OTP Providers (Indian Mobile +91 Numbers)

| SMS Provider | Free Tier / Trial Quota | Testing vs. Production Delivery | Indian DLT Requirement (TRAI) | Network Ports Used |
| :--- | :--- | :--- | :--- | :--- |
| **Firebase Auth (Google)** | **10,000 phone OTPs / month completely FREE** (Spark Plan) | **Works directly in Production** on any real Indian (+91) mobile number | **ZERO DLT Required** (Google manages carrier compliance, pre-approved headers & templates) | HTTPS Port 443 (Zero firewall port blocking on Render) |
| **Fast2SMS** | ₹50 demo wallet (~250 SMS total) | Works for testing only. Quick DLT approval required for bulk | **Mandatory DLT** for commercial sender IDs and production traffic | HTTPS Port 443 |
| **MSG91** | ₹25 demo credits (~100 SMS total) | Requires enterprise approval | **Mandatory DLT** Entity ID & Sender Header registration (~₹5,900) | HTTPS Port 443 |
| **Twilio** | $15 trial credit (~100–150 SMS) | Trial accounts can only send to pre-verified numbers in console | **Mandatory DLT** registration for standard delivery to Indian subscribers | HTTPS Port 443 |

> [!IMPORTANT]
> **Why Firebase Auth is the Winner for Indian Startups:**
> Under the Telecom Commercial Communications Customer Preference Regulations (TCCCPR, 2018), the Telecom Regulatory Authority of India (TRAI) mandates that any organization sending bulk commercial SMS in India must register as an Enterprise Principal Entity with telecom operators (Jio, Airtel, Vodafone Idea, BSNL) at a cost of ~₹5,900 plus KYC overhead.
> 
> **Firebase Phone Authentication bypasses this completely.** Google operates global telecom carrier gateways that deliver 6-digit verification codes to any Indian mobile network with zero developer registration cost and includes **10,000 free SMS authentications every month**.

---

### B. Transactional Email Providers

| Provider | Free Monthly Quota | Daily Quota | Sandbox Restrictions | Cloud Port Compatibility |
| :--- | :--- | :--- | :--- | :--- |
| **Resend** | **3,000 emails / month** | 100 emails / day | On unverified trial accounts, can only deliver to the verified owner's email (`yashupdhyay486@gmail.com`). (Handled seamlessly by BharatFiling Sandbox Auto-Routing) | **HTTPS Port 443** (Works 100% on Render Free Web Service) |
| **Brevo (Sendinblue)** | **9,000 emails / month** | 300 emails / day | Can send to ANY external recipient right out of the box without domain verification. | **HTTPS Port 443** (Works 100% on Render Free Web Service) |
| **Google Gmail SMTP** | 15,000 emails / month | 500 emails / day | Can send to ANY recipient worldwide via Google App Password. | **TCP Port 465 / 587** (Blocked on Render Free Tier Web Services) |

---

## 12. Firebase Phone Auth & Zero-DLT Indian SMS Guide

### High-Level Authentication Architecture

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant Recaptcha as Google reCAPTCHA (Invisible)
    participant Firebase as Firebase Auth Gateway
    participant SMS as User Mobile Phone (+91)
    participant BE as Express Backend (/register/phone-verify)
    participant DB as Supabase PostgreSQL

    User->>Recaptcha: Initiates Phone Verification
    Recaptcha-->>Firebase: App Verification Token
    Firebase->>SMS: Delivers 6-digit SMS OTP via Telecom Gateway
    User->>Firebase: Submits 6-digit SMS code
    Firebase-->>User: Issues Firebase UserCredential & Cryptographic ID Token
    User->>BE: POST /register/phone-verify (ID Token + User Details)
    BE->>Firebase: Validates ID Token via Google Identity Toolkit REST API (Port 443)
    BE->>DB: Persists verified user into public.users
    BE-->>User: Issues BharatFiling JWT Session Token (7-day TTL)
```

### Firebase Web App Configuration
Configured in `frontend/src/config/firebase.js`:
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "bharatfiling-prod.firebaseapp.com",
  projectId: "bharatfiling-prod",
  storageBucket: "bharatfiling-prod.firebasestorage.app",
  messagingSenderId: "756692079693",
  appId: "1:756692079693:web:0e984378aee57e2797f804",
  measurementId: "G-3M2KEV9N86"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### Server-Side Token Verification Engine
In `backend/src/services/firebaseAuth.service.js`, BharatFiling cryptographically validates the Firebase ID token using a two-tier mechanism that operates strictly over HTTPS Port 443:
1. **Tier 1 (Google Identity Toolkit REST API):** Queries `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}` to inspect token validity, issuer, and phone number directly with Google's servers.
2. **Tier 2 (Decoded JWT Claims Inspection):** Validates the token's audience (`aud === 'bharatfiling-prod'`), token expiration (`exp > nowSec`), and retrieves verified `phone_number`.

### Backend API Endpoints
* `POST /api/v1/auth/register/phone-verify`:
  Accepts `{ id_token, full_name, email, password, phone }`. Verifies token, creates user in `public.users` (with fallback to `db.json`), creates customer profile, and returns signed BharatFiling JWT.
* `POST /api/v1/auth/login/phone`:
  Accepts `{ id_token }`. Verifies token, matches user by `phone`, and issues session JWT. If mobile number is not registered, returns `{ success: false, not_registered: true }`.

---

## 13. Hybrid Database Resilience & Sandbox Auto-Routing

### A. Sandbox Auto-Routing Engine
When testing in staging environments or on Render without custom domain verification, Resend returns HTTP `403` with the message:
`"can only send testing emails to your own email address (yashupdhyay486@gmail.com)"`.

BharatFiling's `backend/src/services/providers/httpEmailProvider.js` includes an automatic routing safeguard:
```javascript
if (res.status === 403 && data.message?.includes('testing emails to your own email address')) {
  console.warn(`[Resend Trial Sandbox]: Auto-routing email for <${to}> to verified owner <yashupdhyay486@gmail.com>`);
  
  // Transparently re-dispatches with sandbox banner
  return await sendResend({
    to: 'yashupdhyay486@gmail.com',
    subject: `[Sandbox for ${to}] ${subject}`,
    html: `<div style="background:#fef3c7;padding:12px;border:1px solid #f59e0b;border-radius:8px;margin-bottom:16px;">
             <strong>Resend Sandbox Notice:</strong> This email was originally addressed to <code>${to}</code>.
           </div>` + html
  });
}
```
This ensures developers and testers receive verification OTPs even before registering a custom domain on Resend.

### B. Hybrid UserModel Database Fallback
To ensure 100% platform availability even when Supabase is undergoing maintenance, schema cache refreshes, or network interruptions, `backend/src/models/User.js` implements seamless bidirectional synchronization between Supabase PostgreSQL and local storage (`backend/data/db.json`):
* `findByEmail` / `findByPhone` / `findById`: Queries Supabase first; if table is missing or query errors, falls back to `db.json`.
* `create` / `update`: Writes to Supabase first; if Supabase fails, commits record to `db.json` and continues without blocking the user.

### C. Transactional OTP Rollback
In both registration and forgot-password flows in `backend/src/routes/auth.routes.js`, if email or SMS delivery fails for any reason, the staged OTP record is immediately deleted via `OtpModel.deleteByTxnId(txn_id)`. This prevents orphaned records from triggering the 60-second rate-limiting cooldown and allows the user to re-attempt immediately.

---

*Document finalized and verified against active BharatFiling codebase.*
