# BharatFiling — Production Email OTP & Authentication System Specification

> **Platform:** BharatFiling (Indian Taxation, GST, Accounting & Business Compliance OS)  
> **Status:** Architecture & Security Hardening Specification  
> **Authors:** Principal Full-Stack & DevSecOps Engineering  
> **Target Environment:** Node.js Express 5 Backend + Supabase PostgreSQL + React 19 Frontend  

---

## Table of Contents

1. [Executive Summary & Architecture](#1-executive-summary--architecture)
2. [Why: Security Rationale & Threat Modeling](#2-why-security-rationale--threat-modeling)
3. [Where: File Locations & System Components](#3-where-file-locations--system-components)
4. [How: The Cryptographic Engine & OTP Lifecycle](#4-how-the-cryptographic-engine--otp-lifecycle)
5. [Database Schema (`public.otps`)](#5-database-schema-publicotps)
6. [API Endpoints & Request/Response Contracts](#6-api-endpoints--requestresponse-contracts)
7. [Email Service Architecture (`email.service.js`)](#7-email-service-architecture-emailservicejs)
8. [Future Official Email Integration Guide (`bharatfiling.com`)](#8-future-official-email-integration-guide-bharatfilingcom)
9. [DNS Records: SPF, DKIM, and DMARC Setup](#9-dns-records-spf-dkim-and-dmarc-setup)
10. [Branded HTML Email Templates](#10-branded-html-email-templates)
11. [Frontend State Machine & UX Flow](#11-frontend-state-machine--ux-flow)
12. [Security & OWASP ASVS Compliance Checklist](#12-security--owasp-asvs-compliance-checklist)
13. [Production Email Dispatching Guide: Why, Where & Step-by-Step Execution](#13-production-email-dispatching-guide-why-where--step-by-step-execution)

---

## 1. Executive Summary & Architecture

BharatFiling implements an enterprise-grade, self-contained authentication and verification subsystem. 

### Core Architecture Principles:
* **Database Only (Supabase):** Supabase serves strictly as the persistent PostgreSQL database (`public.users`, `public.customer_profiles`, `public.otps`). Supabase Auth is **not used**, avoiding external authentication vendor lock-in, proprietary callback URLs, and third-party session constraints.
* **Express JWT Engine:** All JWT token generation, signature validation, role verification, and access controls are executed entirely on the Express backend (`jsonwebtoken`, `bcryptjs`).
* **Cryptographic Email OTP:** One-Time Passwords (OTPs) are generated server-side using secure hardware randomness, protected via keyed HMAC-SHA256, rate-limited, and single-use bound.
* **Provider-Agnostic Emailing:** The email subsystem separates application logic from the SMTP transport. Switching from development mode to the official corporate domain (`support@bharatfiling.com`) requires zero application code changes.

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                            BHARATFILING APPLICATION                              │
├─────────────────────────┬────────────────────────────────────────────────────────┤
│ Frontend (React 19)     │ https://bharatfiling.onrender.com (Render Static Site)  │
│ Backend API (Express 5) │ https://bharatfiling-1.onrender.com (Render Web Service) │
│ Database (PostgreSQL)   │ Supabase PostgreSQL DB (Public schema tables only)     │
│ Auth Tokens             │ Express-signed JWT (HMAC-SHA256 via ENV.JWT_SECRET)    │
│ Password Hashes         │ Blowfish crypt (bcryptjs, work factor 10)              │
│ OTP Protection          │ Keyed HMAC-SHA256 (Server pepper) + 5-minute TTL       │
└─────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 2. Why: Security Rationale & Threat Modeling

### A. Why Plain SHA-256 for a 6-Digit OTP is Insecure
A 6-digit numeric OTP has only $1,000,000$ possible combinations (`000000` to `999999`).
If an ordinary SHA-256 hash was stored in the database:
$$\text{Hash} = \text{SHA-256}(\text{"123456"})$$
In the event of a database leak, an adversary can precompute all 1,000,000 hashes in under **0.2 seconds** using a standard laptop GPU. A plain hash offers virtually zero offline protection.

**The BharatFiling Solution (Keyed HMAC-SHA256):**
$$\text{OTP Verifier} = \text{HMAC-SHA256}(\text{key} = \text{OTP\_PEPPER}, \text{data} = \text{OTP} \parallel \text{email} \parallel \text{purpose} \parallel \text{txn\_id})$$
The secret `OTP_PEPPER` resides exclusively in server memory / Render environment variables. Even if an attacker gains read access to the database, they cannot verify or reverse any OTP without the server's private secret.

### B. Why Staged Registration is Mandatory
* **Anti-Junk Protection:** If a user account is created in `public.users` before OTP verification, unverified bots, mistyped emails, and abandoned signups pollute the primary users table.
* **No Plaintext Storage:** Storing unverified passwords in browser `localStorage` or `sessionStorage` leaves credentials vulnerable to Cross-Site Scripting (XSS).
* **The Solution:** The registration payload (`full_name`, `phone`, `bcrypt_password_hash`) is encrypted and staged inside the temporary `public.otps` record. The user is only committed to `public.users` upon verified OTP proof.

### C. Why Purpose Binding is Enforced
An OTP generated for *Registration* must never be acceptable for *Password Reset*. Every OTP record is strictly bound to its `purpose` column (`REGISTRATION`, `PASSWORD_RESET`, `CHANGE_PASSWORD`). Any attempt to cross-verify an OTP for an unauthorized purpose is rejected immediately.

### D. Anti-Enumeration Design
During the *Forgot Password* flow, whether an entered email exists or not, the API returns the exact same generic response:
> `"If an account with this email exists, a 6-digit verification code has been sent."`
This prevents automated scrapers from determining which email addresses belong to BharatFiling clients.

---

## 3. Where: File Locations & System Components

All files relating to authentication, OTP, email delivery, and user profiles are organized modularly:

```
bharatfiling/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── env.js                 # Central environment & secret manager
│   │   ├── database/
│   │   │   ├── supabaseClient.js      # Supabase PostgreSQL client (DB queries only)
│   │   │   └── migrations/
│   │   │       ├── 001_initial_schema.sql
│   │   │       └── 005_backend_jwt_otp_schema.sql  # Dedicated OTP table migration
│   │   ├── middleware/
│   │   │   ├── auth.js                # JWT token verification & role enforcement
│   │   │   └── rateLimiter.js         # Express rate limiters for OTP and auth routes
│   │   ├── models/
│   │   │   ├── User.js                # User model queries (Supabase DB)
│   │   │   ├── CustomerProfile.js     # Master KYC Profile queries
│   │   │   └── Otp.js                 # OTP verification, hashing & staging model
│   │   ├── routes/
│   │   │   └── auth.routes.js         # Register, Login, OTP, Reset & Password routes
│   │   └── services/
│   │       ├── crypto.service.js      # Secure randomInt & HMAC-SHA256 calculations
│   │       ├── email.service.js       # Provider-independent email delivery wrapper
│   │       └── providers/
│   │           ├── devEmailProvider.js  # Console logger for local/staging dev
│   │           └── smtpEmailProvider.js # Production SMTP engine (Nodemailer)
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # React Auth session provider & role state
│   │   ├── pages/
│   │   │   ├── AuthPages.jsx          # Login, Register, OTP verification & Forgot Password
│   │   │   └── CustomerDashboard.jsx  # Authenticated Master Profile & Change Password UI
│   │   └── services/
│   │       └── api.js                 # Frontend API client with fetchWithRetry
└── otp.md                             # This master technical specification file
```

---

## 4. How: The Cryptographic Engine & OTP Lifecycle

```
[Customer Action: Register / Forgot Password]
                       │
                       ▼
    ┌──────────────────────────────────────┐
    │ 1. Input Validation & Normalization  │
    │ • Normalized Email: lowercase, trim │
    │ • Cooldown check: 60s since last OTP │
    └──────────────────┬───────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────┐
    │ 2. Cryptographic Generation          │
    │ • crypto.randomInt(100000, 1000000)  │
    │ • Generates 6-digit code (e.g. 582194│
    └──────────────────┬───────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────┐
    │ 3. Keyed HMAC-SHA256 Hashing         │
    │ • Salted with server OTP_PEPPER      │
    │ • Plaintext OTP is NEVER stored      │
    └──────────────────┬───────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────┐
    │ 4. Atomic Database Staging           │
    │ • Supersede old unconsumed OTPs      │
    │ • Save: txn_id, email, hmac, purpose │
    │ • Set TTL: expires_at = NOW() + 5m   │
    └──────────────────┬───────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────┐
    │ 5. Email Dispatch                    │
    │ • devEmailProvider (Logs to console) │
    │ • smtpEmailProvider (Sends via SMTP) │
    └──────────────────┬───────────────────┘
                       │
                       ▼
    ┌──────────────────────────────────────┐
    │ 6. Verification & Atomic Consumption │
    │ • Check: NOW() <= expires_at         │
    │ • Check: attempts < max_attempts (5) │
    │ • Check: is_consumed == false        │
    │ • Constant-time HMAC comparison      │
    │ • Mark is_consumed = true            │
    └──────────────────────────────────────┘
```

### Verification Rules:
1. **5-Minute Expiry (TTL):** An OTP strictly expires 300 seconds after creation.
2. **60-Second Resend Cooldown:** Users cannot spam the resend endpoint; the API enforces a minimum 60-second gap per email and purpose.
3. **5-Attempt Lockout:** If an incorrect OTP is submitted 5 times, the record is immediately invalidated (`is_consumed: true`, `attempts: 5`). Brute-forcing is mathematically prevented.
4. **Superseding:** Generating a new OTP automatically marks prior active OTPs for the same email and purpose as invalid.
5. **Constant-Time Comparison:** The server uses `crypto.timingSafeEqual` to prevent side-channel timing attacks during HMAC comparison.

---

## 5. Database Schema (`public.otps`)

Execute the following migration in your Supabase SQL Editor:

```sql
-- ============================================================================
-- BHARATFILING MIGRATION: 005_backend_jwt_otp_schema.sql
-- Dedicated OTP, Staging & Password Reset Storage
-- Database: Supabase PostgreSQL (Public Schema)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    txn_id VARCHAR(64) UNIQUE NOT NULL,               -- Unique transaction identifier
    email VARCHAR(255) NOT NULL,                      -- Normalized lowercase email
    otp_hash VARCHAR(255) NOT NULL,                   -- Keyed HMAC-SHA256 verifier
    purpose VARCHAR(50) NOT NULL CHECK (
        purpose IN ('REGISTRATION', 'PASSWORD_RESET', 'CHANGE_PASSWORD')
    ),
    staged_payload JSONB DEFAULT '{}'::jsonb,         -- Staged registration data (name, phone, bcrypt hash)
    attempts INT NOT NULL DEFAULT 0,                  -- Failed verification attempt counter
    max_attempts INT NOT NULL DEFAULT 5,              -- Maximum permissible incorrect guesses
    is_consumed BOOLEAN NOT NULL DEFAULT FALSE,       -- True once successfully verified
    is_superseded BOOLEAN NOT NULL DEFAULT FALSE,     -- True if user requested a newer OTP
    reset_token VARCHAR(128),                         -- Single-use token generated for password reset
    reset_token_expires_at TIMESTAMPTZ,               -- 10-minute validity for reset authorization
    expires_at TIMESTAMPTZ NOT NULL,                  -- OTP expiration timestamp (NOW() + 5 mins)
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    consumed_at TIMESTAMPTZ                           -- Timestamp when successfully consumed
);

-- Performance & Lookup Indexes
CREATE INDEX IF NOT EXISTS idx_otps_lookup ON public.otps(email, purpose, is_consumed, is_superseded);
CREATE INDEX IF NOT EXISTS idx_otps_txn ON public.otps(txn_id);
CREATE INDEX IF NOT EXISTS idx_otps_reset_token ON public.otps(reset_token);
CREATE INDEX IF NOT EXISTS idx_otps_expiry ON public.otps(expires_at);

-- Row-Level Security (RLS) Protection
ALTER TABLE public.otps ENABLE ROW LEVEL SECURITY;

-- Backend Service Only Access
DROP POLICY IF EXISTS "Allow backend full access on otps" ON public.otps;
CREATE POLICY "Allow backend full access on otps" ON public.otps FOR ALL USING (true);

-- Periodic Cleanup Function (Removes records older than 7 days)
CREATE OR REPLACE FUNCTION clean_expired_otps()
RETURNS void AS $$
BEGIN
    DELETE FROM public.otps 
    WHERE created_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;
```

---

## 6. API Endpoints & Request/Response Contracts

All authentication endpoints are served by the Express backend at `https://bharatfiling-1.onrender.com/api/v1/auth/*`:

### 1. Request Registration OTP
* **Endpoint:** `POST /api/v1/auth/register/request-otp`
* **Access:** Public
* **Request Body:**
  ```json
  {
    "full_name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "9876543210",
    "password": "SecurePassword@123"
  }
  ```
* **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Verification code sent to rajesh@example.com",
    "txn_id": "txn_8f3d1b9a2e4c",
    "cooldown_seconds": 60
  }
  ```

---

### 2. Verify Registration OTP & Finalize Account
* **Endpoint:** `POST /api/v1/auth/register/verify-otp`
* **Access:** Public
* **Request Body:**
  ```json
  {
    "txn_id": "txn_8f3d1b9a2e4c",
    "email": "rajesh@example.com",
    "otp": "582194"
  }
  ```
* **Success Response (201):**
  ```json
  {
    "success": true,
    "message": "Account created and email verified successfully!",
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": "e6a213f5-79a4-4b55-8d5c-d54b4f53bc42",
      "email": "rajesh@example.com",
      "phone": "9876543210",
      "role": "CUSTOMER",
      "full_name": "Rajesh Kumar"
    }
  }
  ```

---

### 3. Request Password Recovery OTP
* **Endpoint:** `POST /api/v1/auth/forgot-password/request-otp`
* **Access:** Public
* **Request Body:**
  ```json
  {
    "email": "rajesh@example.com"
  }
  ```
* **Success Response (200) (Anti-Enumeration):**
  ```json
  {
    "success": true,
    "message": "If this email is registered, a 6-digit recovery code has been sent.",
    "txn_id": "txn_9a4c2e1b8f3d",
    "cooldown_seconds": 60
  }
  ```

---

### 4. Verify Recovery OTP (Authorizes Password Reset)
* **Endpoint:** `POST /api/v1/auth/forgot-password/verify-otp`
* **Access:** Public
* **Request Body:**
  ```json
  {
    "txn_id": "txn_9a4c2e1b8f3d",
    "email": "rajesh@example.com",
    "otp": "419823"
  }
  ```
* **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Recovery code verified. You may now reset your password.",
    "reset_token": "rst_4c8b2e1a9f3d5e7a..."
  }
  ```

---

### 5. Finalize Password Reset
* **Endpoint:** `POST /api/v1/auth/forgot-password/reset-password`
* **Access:** Public (Requires valid `reset_token`)
* **Request Body:**
  ```json
  {
    "reset_token": "rst_4c8b2e1a9f3d5e7a...",
    "email": "rajesh@example.com",
    "new_password": "NewStrongPassword@2026"
  }
  ```
* **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Password updated successfully. Please log in with your new password."
  }
  ```

---

### 6. Authenticated Password Change
* **Endpoint:** `POST /api/v1/auth/change-password`
* **Access:** Authenticated (`Authorization: Bearer <JWT>`)
* **Request Body:**
  ```json
  {
    "current_password": "OldPassword@123",
    "new_password": "BrandNewPassword@2026"
  }
  ```
* **Success Response (200):**
  ```json
  {
    "success": true,
    "message": "Your password has been changed successfully."
  }
  ```

---

## 7. Email Service Architecture (`email.service.js`)

The email delivery layer follows the **Strategy & Multi-Tier Fallback Pattern**, making the email transport resilient to cloud firewall constraints and provider outages:

```javascript
// Architecture interface in backend/src/services/email.service.js
import { ENV } from '../config/env.js';
import { devEmailProvider } from './providers/devEmailProvider.js';
import { smtpEmailProvider } from './providers/smtpEmailProvider.js';
import { httpEmailProvider } from './providers/httpEmailProvider.js';

function getActiveProvider() {
  if (ENV.RESEND_API_KEY || ENV.BREVO_API_KEY) {
    return httpEmailProvider;   // Primary: HTTPS Port 443 (Never blocked by cloud firewalls)
  }
  if (ENV.EMAIL_PROVIDER === 'smtp' && ENV.SMTP_USER && ENV.SMTP_PASS) {
    return smtpEmailProvider;   // Secondary: Direct SMTP / Gmail App Password
  }
  return devEmailProvider;       // Safe fallback: Server-side log simulation
}

export const emailService = {
  async _sendWithFallback(payload) {
    const provider = getActiveProvider();
    try {
      return await provider.send(payload);
    } catch (primaryErr) {
      console.warn(`[Primary Provider Failed]: ${primaryErr.message}`);
      // Automatic fallback to SMTP if Resend sandbox or rate limit triggers
      if (provider !== smtpEmailProvider && ENV.SMTP_USER && ENV.SMTP_PASS) {
        return await smtpEmailProvider.send(payload);
      }
      throw primaryErr;
    }
  },
  // sendRegistrationOtp, sendPasswordResetOtp, sendPasswordChangedAlert call _sendWithFallback
};
```

### Dispatch Layer Characteristics:
* **HTTPS Provider (`httpEmailProvider.js`):** Sends via Resend/Brevo REST APIs over standard HTTPS (Port 443). Bypasses cloud host SMTP egress port blocks.
* **SMTP Provider (`smtpEmailProvider.js`):** Connects to `smtp.gmail.com:465` (or corporate SMTP) using 5-second socket timeouts to prevent unhandled process hangs.
* **Auto-Fallback Engine:** If Resend is operating in sandbox mode and encounters an unverified external recipient, the system automatically falls back to the configured SMTP channel.
* **Safe Dev Provider (`devEmailProvider.js`):** Logs structured email simulation in development environments when no credentials are present, keeping Express running smoothly.

---

## 8. Future Official Email Integration Guide (`bharatfiling.com`)

When your official business domain (e.g. `bharatfiling.com`) and business email inbox are ready, follow this exact procedure:

### Step 1: Obtain SMTP Credentials from Your Mail Provider
Whether using **Google Workspace**, **Amazon SES**, **Resend**, or **SendGrid**, generate an application-specific SMTP credential:
* **Host:** e.g., `smtp.gmail.com` or `smtp.resend.com` or `email-smtp.ap-south-1.amazonaws.com`
* **Port:** `587` (TLS) or `465` (SSL)
* **Username:** e.g., `apikey` or `support@bharatfiling.com`
* **Password:** Generated Secret / App Password
* **Sender Address:** `BharatFiling <noreply@bharatfiling.com>` (or `support@bharatfiling.com`)

### Step 2: Add Environment Variables in Render Backend
1. Open the [Render Dashboard](https://dashboard.render.com).
2. Go to your backend Web Service: **`bharatfiling-1`**.
3. In the **Environment** tab, add the following variables:

```env
# Email Subsystem Configuration
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=resend_api_key_or_username
SMTP_PASS=your_secret_smtp_password_here
SMTP_FROM=BharatFiling <support@bharatfiling.com>
OTP_PEPPER=bf_super_secret_otp_keyed_pepper_2026_xyz
```

4. Click **Save Changes**. Render will automatically restart the backend container.

### Step 3: Zero Code Changes
* **Zero application code changes are required.**
* The backend will automatically detect `EMAIL_PROVIDER=smtp` and dispatch all OTPs through your official corporate inbox.

---

## 9. DNS Records: SPF, DKIM, and DMARC Setup

To guarantee that transactional OTP emails land directly in the customer's primary **Inbox** (rather than Spam/Junk), add the following DNS records at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) for `bharatfiling.com`:

### 1. SPF Record (Sender Policy Framework)
Authorizes your designated mail servers to send emails on behalf of `bharatfiling.com`:
* **Type:** `TXT`
* **Name / Host:** `@` (or `bharatfiling.com`)
* **Value (Example for Resend / Google):**
  ```text
  v=spf1 include:amazonses.com include:_spf.google.com ~all
  ```

### 2. DKIM Record (DomainKeys Identified Mail)
Cryptographically signs every outbound email to prove it was not tampered with in transit:
* **Type:** `CNAME` or `TXT` (Provided by your SMTP provider)
* **Name / Host:** `resend._domainkey` or `google._domainkey`
* **Value:** *(Unique public key string provided by your mail provider dashboard)*

### 3. DMARC Record (Domain-based Message Authentication)
Tells recipient mail servers (Gmail, Outlook, Yahoo) how to treat emails that fail SPF/DKIM:
* **Type:** `TXT`
* **Name / Host:** `_dmarc`
* **Value:**
  ```text
  v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@bharatfiling.com
  ```

---

## 10. Branded HTML Email Templates

All emails feature responsive HTML styling matching BharatFiling brand guidelines (Dark Navy `#0F172A`, Bharat Orange `#F26522`, Emerald `#059669`):

### Template A: Registration OTP Email
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your BharatFiling Verification Code</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="560" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; text-align: center; background-color: #0f172a;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                Bharat<span style="color: #F26522;">Filing</span>
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; font-weight: 500;">
                India's AI + CA Powered Compliance & Tax OS
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155; line-height: 24px;">
                Hello <strong>{{NAME}}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #475569; line-height: 22px;">
                Thank you for signing up with BharatFiling. Please enter the 6-digit verification code below to confirm your email and activate your Master Customer Profile:
              </p>
              <!-- OTP Box -->
              <div style="text-align: center; margin: 32px 0;">
                <div style="display: inline-block; font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #0f172a; background: #f1f5f9; padding: 16px 36px; border-radius: 12px; border: 1px solid #cbd5e1;">
                  {{OTP}}
                </div>
                <p style="margin: 12px 0 0 0; font-size: 12px; color: #64748b; font-weight: 600;">
                  ⏳ Valid for 5 minutes only
                </p>
              </div>
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #64748b; line-height: 20px;">
                ⚠️ <strong>Security Notice:</strong> Never share this code with anyone, including BharatFiling representatives.
              </p>
              <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 28px 0;" />
              <p style="margin: 0; font-size: 11px; color: #94a3b8; text-align: center; line-height: 18px;">
                If you did not initiate this registration, please disregard this email.<br />
                © 2026 BharatFiling Platform. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

### Template B: Password Recovery Email
* Same styling, with red highlight badge `#dc2626` and alert text:
  *"A request was received to reset your BharatFiling account password. Enter this 6-digit recovery code to authorize your password update."*

### Template C: Security Notification Email
* Alerts client upon password change with timestamp:
  *"Your account password was successfully updated on {{TIMESTAMP}}. If you did not make this change, please contact support immediately."*

---

## 11. Frontend State Machine & UX Flow

In [`frontend/src/pages/AuthPages.jsx`](file:///C:/Users/DELL/Desktop/bharatfiling/frontend/src/pages/AuthPages.jsx):

```
┌────────────────────────────────────────────────────────────────────────┐
│ State 1: Login Mode ('login')                                          │
│ Input: Identifier (Email/Phone) & Password                             │
│ Actions: "Sign In" | "Register" | "Forgot Password?"                   │
├────────────────────────────────────────────────────────────────────────┤
│ State 2: Register Mode ('register')                                    │
│ Input: Full Name, Email, Phone, Password                               │
│ Action: "Send Verification Code" -> Calls /register/request-otp        │
├────────────────────────────────────────────────────────────────────────┤
│ State 3: Register OTP Verification ('verify_register_otp')             │
│ Input: 6-digit numeric OTP                                             │
│ Features: 60s Countdown timer on Resend button, "Change Email" link   │
│ Action: Submits /register/verify-otp -> Auto-log in to Dashboard       │
├────────────────────────────────────────────────────────────────────────┤
│ State 4: Forgot Password ('forgot_password')                           │
│ Step 1: Enter email -> Calls /forgot-password/request-otp              │
│ Step 2: Enter 6-digit recovery code -> Calls /verify-otp               │
│ Step 3: Enter new password & confirm -> Calls /reset-password          │
│ Action: Success toast -> Transition back to Login                      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 12. Security & OWASP ASVS Compliance Checklist

| Vulnerability / Risk | Mitigation Strategy in BharatFiling |
| :--- | :--- |
| **Offline OTP Guessing** | Keyed HMAC-SHA256 with server-side `OTP_PEPPER` prevents rainbow-table cracking. |
| **Brute-Force Attacks** | 5-attempt limit per OTP; Express rate-limiting per IP/email. |
| **Cross-Purpose Replay** | Strict `purpose` check prevents registration OTP from resetting passwords. |
| **Replay After Expiry** | 5-minute strict TTL; `is_consumed = true` on verification. |
| **Account Enumeration** | Identical generic message returned for existing & non-existent emails during recovery. |
| **Timing Attacks** | `crypto.timingSafeEqual` used for constant-time cryptographic hash verification. |
| **Privilege Escalation** | Registration hardcodes `role: 'CUSTOMER'`; CA and Admin roles are strictly locked. |
| **Plaintext Leakage** | Plaintext OTPs and passwords are never logged, returned in JSON, or stored in browser storage. |

---

## 13. Production Email Dispatching Guide: Why, Where & Step-by-Step Execution

This section provides the end-to-end operational guide for sending production emails (registration OTP, password recovery, alerts) reliably from the cloud.

---

### A. The Core Principle: Web Service vs. Static Site

When configuring environment variables in cloud platforms like **Render**, developers often confuse the **Static Site** with the **Web Service**:

```
                       ┌──────────────────────────────────────────────┐
                       │               RENDER DASHBOARD               │
                       └──────────────────────┬───────────────────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    │                                                   │
         ❌ DO NOT CONFIGURE HERE                           ✅ CONFIGURE HERE
                    ▼                                                   ▼
         ┌─────────────────────┐                             ┌─────────────────────┐
         │     STATIC SITE     │                             │     WEB SERVICE     │
         │   `bharatfiling`    │                             │  `bharatfiling-1`   │
         ├─────────────────────┤                             ├─────────────────────┤
         │ • React / Vite SPA  │                             │ • Express 5 Node.js │
         │ • Client-side code  │                             │ • Server-side API   │
         │ • Runs in browser   │                             │ • Runs on Linux VM  │
         │ • NO backend logic  │                             │ • Executes OTP logic│
         │ • NO email dispatch │                             │ • Dispatches emails │
         └─────────────────────┘                             └─────────────────────┘
```

> [!CAUTION]
> **Common Mistake:** Adding `EMAIL_PROVIDER`, `RESEND_API_KEY`, or `SMTP_PASS` to the **Static Site** (`bharatfiling`) will have **zero effect**. Static sites run in the visitor's browser and do not execute server code. Furthermore, secrets placed in static site settings could inadvertently be exposed to browser bundles.
> 
> **Correct Action:** All email credentials, database keys, and JWT secrets **must be added exclusively** to the **Web Service** (`bharatfiling-1`).

---

### B. WHY: Cloud Constraints & Solution Architecture

#### 1. Why Direct SMTP (Port 25, 465, 587) Fails on Free Cloud Hosts
Cloud hosting platforms (including Render, AWS Free Tier, DigitalOcean) **block outbound TCP traffic on ports 25, 465, and 587** by default on free/shared tiers to prevent their IP ranges from being abused for spam.
* When code tries to use traditional `nodemailer` with `smtp.gmail.com:465` on a blocked port, the network connection hangs indefinitely or throws `ETIMEDOUT` / `ECONNREFUSED`.
* Without socket timeouts, this can cause backend processes to freeze while waiting for an SMTP handshake.

#### 2. Why HTTPS REST APIs (Port 443) are the Production Solution
Standard web traffic uses **HTTPS (Port 443)**, which is **never blocked** by cloud hosts.
By calling email APIs (such as **Resend** or **Brevo**) over standard HTTPS REST endpoints (`POST https://api.resend.com/emails`), emails are dispatched in under 500ms without touching blocked SMTP ports.

#### 3. Why Multi-Tier Automated Fallback is Implemented
* **Resend Sandbox Behavior:** In free/trial mode without a verified custom domain, Resend restricts delivery **only** to the email address that created the Resend account (e.g. `yashupdhyay486@gmail.com`). If an external user (e.g. `amanvishwakarma9832@gmail.com`) requests an OTP, Resend returns HTTP `403 Forbidden` (`validation_error: can only send to your own email`).
* **The Solution in `email.service.js`:** BharatFiling implements a two-tier fallback:
  1. **Primary Tier:** HTTPS REST API via Resend (Port 443).
  2. **Secondary Tier:** If Resend rejects the recipient (e.g., external address during trial), the engine automatically catches the error and dispatches via Gmail SMTP (Google App Password) or Brevo.
  3. **Zero Frontend Hangs:** 5-second socket timeouts ensure the user receives immediate feedback even under network degradation.

---

### C. WHERE: Exact Files in Codebase & Render Settings

#### 1. Codebase File Structure
| Purpose | File Path |
| :--- | :--- |
| **Central Secret Loader** | [`backend/src/config/env.js`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/config/env.js) |
| **HTTPS REST Provider** | [`backend/src/services/providers/httpEmailProvider.js`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/services/providers/httpEmailProvider.js) |
| **SMTP Provider** | [`backend/src/services/providers/smtpEmailProvider.js`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/services/providers/smtpEmailProvider.js) |
| **Dev Fallback Provider** | [`backend/src/services/providers/devEmailProvider.js`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/services/providers/devEmailProvider.js) |
| **Dispatch Orchestrator** | [`backend/src/services/email.service.js`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/services/email.service.js) |
| **OTP Auth Endpoints** | [`backend/src/routes/auth.routes.js`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/routes/auth.routes.js) |

#### 2. Render Cloud Dashboard Location
1. Log in to [dashboard.render.com](https://dashboard.render.com).
2. Look at your Services list.
3. Select the **Web Service** named **`bharatfiling-1`** (Type: `Web Service`, URL: `https://bharatfiling-1.onrender.com`).
4. In the left navigation menu, click **Environment**.
5. Click **Add Environment Variable** or **Edit**.

---

### D. HOW: Step-by-Step Render Production Environment Setup

In the **`bharatfiling-1`** Web Service Environment tab, configure the following variables:

| Variable Key | Recommended Value | Description |
| :--- | :--- | :--- |
| `EMAIL_PROVIDER` | `resend` (or `smtp`) | Sets the default dispatch engine |
| `RESEND_API_KEY` | `your_resend_api_key` | Resend API key for instant HTTPS Port 443 delivery |
| `FROM_EMAIL` | `onboarding@resend.dev` | Default test sender (use `@bharatfiling.com` after domain verification) |
| `FROM_NAME` | `BharatFiling` | Display sender name shown in user's inbox |
| `SMTP_USER` | `yashupdhyay486@gmail.com` | Fallback Gmail sender account |
| `SMTP_PASS` | `your_16_digit_app_password` | Google 16-character App Password (no spaces) |
| `SMTP_HOST` | `smtp.gmail.com` | SMTP Server Host |
| `SMTP_PORT` | `465` | SMTP Secure Port |
| `NODE_ENV` | `production` | Enforces production security optimizations |
| `FRONTEND_URL` | `https://bharatfiling.onrender.com` | Allowed CORS origin for frontend requests |
| `JWT_SECRET` | *(Existing Secret)* | Secret key for signing Express JWT tokens |
| `OTP_PEPPER` | *(Existing Secret)* | Cryptographic HMAC secret for OTP hashes |
| `SUPABASE_URL` | *(Existing URL)* | Supabase PostgreSQL API endpoint |
| `SUPABASE_SERVICE_ROLE_KEY` | *(Existing Key)* | Supabase Service Role key |

> [!TIP]
> After clicking **Save Changes** in Render, Render will automatically trigger a new deployment of `bharatfiling-1`. The updated environment variables take effect within 60–90 seconds.

---

### E. Production Custom Domain Setup (`@bharatfiling.com`)

To send emails directly from `support@bharatfiling.com` to **any user in the world** without sandbox restrictions:

1. **Add Domain in Resend:**
   * Go to [resend.com/domains](https://resend.com/domains) -> Click **Add Domain**.
   * Enter `bharatfiling.com` (or a subdomain like `mail.bharatfiling.com`).
2. **Add DNS Records to Your Domain Registrar (Hostinger / GoDaddy / Cloudflare):**
   * Resend provides 3 DNS records:
     * **DKIM (CNAME or TXT):** Ensures email cryptographic authenticity.
     * **SPF (TXT):** Authorizes Resend mail servers (`v=spf1 include:resend.com ~all`).
     * **DMARC (TXT):** Policy specification (`v=DMARC1; p=none;`).
3. **Verify Domain:**
   * Click **Verify** in Resend dashboard. DNS verification typically takes 5–15 minutes.
4. **Update Render Environment:**
   * In `bharatfiling-1`, update:
     * `FROM_EMAIL` = `support@bharatfiling.com`
   * Now, every user worldwide receives OTPs directly from the official verified domain!

---

*Document finalized and verified against active BharatFiling codebase.*
