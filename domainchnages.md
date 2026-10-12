# 🌐 BharatFiling Custom Company Domain & SMS Authentication Guide

> **Single Source of Truth Document**  
> When you connect your official company domain (e.g. `bharatfiling.com`, `www.bharatfiling.com`) or manage live SMS OTP authentication, follow this complete step-by-step guide.  
> You do **NOT** need to search through hundreds of files or rebuild anything from scratch. Everything is centralized in **one single code file** and **two Firebase settings**.

---

## 🎯 Quick Reference: The Only Places to Configure

| Component | Location | What to Do | Time Required |
| :--- | :--- | :--- | :--- |
| **1. Codebase Domain** | [`frontend/src/config/domain.js`](file:///C:/Users/DELL/Desktop/bharatfiling/frontend/src/config/domain.js) | Change Line 14 (`COMPANY_DOMAIN`) and Line 17 (`DEFAULT_BACKEND_URL`) | **10 Seconds** |
| **2. Authorised Domains** | Firebase Console → Authentication → Settings → Authorised domains | Click **"Add domain"** → Enter `bharatfiling.com` and `www.bharatfiling.com` | **20 Seconds** |
| **3. SMS Region Policy** | Firebase Console → Authentication → Settings → SMS region policy | Select **Allow** → Check **India (IN)** → Click **Save** | **20 Seconds** |
| **4. Backend API & CORS** | [`backend/src/index.js`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/index.js) | **Zero Changes Needed!** (CORS is dynamic with `origin: true`) | **0 Seconds** |

---

## 📁 1. The Single Code File to Change

### File Path:
[`frontend/src/config/domain.js`](file:///C:/Users/DELL/Desktop/bharatfiling/frontend/src/config/domain.js)

### Current Configuration (Render Staging):
```javascript
// Line 14:
export const COMPANY_DOMAIN = 'bharatfiling.onrender.com';

// Line 17:
export const DEFAULT_BACKEND_URL = 'https://bharatfiling-1.onrender.com';
```

### When Changing to Your Official Company Domain (Example: `bharatfiling.com`):
Change lines 14 & 17 to:
```javascript
// Line 14:
export const COMPANY_DOMAIN = 'bharatfiling.com';

// Line 17:
export const DEFAULT_BACKEND_URL = 'https://api.bharatfiling.com'; // or keep https://bharatfiling-1.onrender.com if backend remains on Render
```

### Why this works everywhere automatically:
- [`frontend/src/services/api.js`](file:///C:/Users/DELL/Desktop/bharatfiling/frontend/src/services/api.js) automatically imports `API_BASE_URL` from `domain.js`.
- [`frontend/src/services/socket.js`](file:///C:/Users/DELL/Desktop/bharatfiling/frontend/src/services/socket.js) automatically imports `SOCKET_BASE_URL` from `domain.js`.
- You **never** have to hunt for URLs across components, pages, or services.

---

## 🔥 2. Firebase Console: Authorised Domains

Google Firebase blocks authentication requests if the hosting domain is not explicitly whitelisted in the console:

1. Open [Firebase Console](https://console.firebase.google.com/) → Select project: **`bharatfiling-prod`**.
2. In the left navigation, click **Authentication**.
3. Across the top tabs, click **Settings**.
4. In the left sub-menu under *Domains*, click **Authorised domains**.
5. Click the blue **Add domain** button.
6. Enter the domains:
   - `bharatfiling.onrender.com` (current Render deployment)
   - `bharatfiling.com` (when custom domain is connected)
   - `www.bharatfiling.com`
7. Click **Add**.

---

## 🇮🇳 3. Firebase Console: SMS Region Policy (Enabling India +91)

Google restricts regional SMS delivery by default to prevent international telecom toll fraud. To enable random 6-digit SMS OTP delivery to Indian mobile numbers:

1. In [Firebase Console](https://console.firebase.google.com/) → **Authentication** → **Settings**.
2. In the sub-menu under *SMS*, click **SMS region policy**.
3. If prompted to upgrade to Identity Platform, confirm the upgrade.
4. Set the policy:
   * Select radio button: **Allow** (*Start with 'Allow' to limit SMS usage to selected regions*).
   * In the search box, type: **`India`**.
   * Check the box: **`[✔] India (IN)`**.
5. Click the blue **Save** button.

*Once saved, Google telecom gateways will immediately dispatch SMS messages to all +91 Indian mobile numbers.*

---

## 🛡️ 4. The reCAPTCHA Singleton Architecture

### The Problem It Solved:
Previously, retrying an SMS OTP would trigger the browser error:  
`reCAPTCHA has already been rendered in this element` because Google's `grecaptcha` engine does not allow re-binding to a DOM element that already holds an active widget.

### The Permanent Solution in [`frontend/src/config/firebase.js`](file:///C:/Users/DELL/Desktop/bharatfiling/frontend/src/config/firebase.js):
```javascript
export const getRecaptchaVerifier = (containerId = 'recaptcha-container') => {
  if (typeof window === 'undefined') return null;

  // 1. Singleton pattern: Reuse active instance on subsequent clicks
  if (window.recaptchaVerifier && document.getElementById(containerId)) {
    return window.recaptchaVerifier;
  }

  // 2. Clear stale container contents
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  } else {
    container.innerHTML = '';
  }

  // 3. Initialize once per browser session
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {},
    'expired-callback': () => {
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch (_) {}
        window.recaptchaVerifier = null;
      }
    },
  });

  return window.recaptchaVerifier;
};
```
* **Result:** On Click 1, the verifier is initialized once. On Click 2, 3, etc., the existing verifier is cleanly reused. The error cannot occur.

---

## 📱 5. Dynamic Phone Number Support (Any Indian Number)

The SMS OTP dispatch is completely dynamic for any visitor:
* **Registration (`/register`):** User enters their name, email, and their own 10-digit mobile number. The system sanitizes the digits, formats to `+91<10_digits>`, and sends a random 6-digit OTP.
* **Password Reset (`/forgot-password`):** User enters their registered phone number to receive a recovery OTP.
* **Passwordless Login (`/login`):** User signs in instantly with their verified mobile number.
* **Free Quota:** 10,000 free authentications every month with zero Indian DLT template filing requirements.

---

## ⚙️ 6. Optional: Zero-Code Cloud Dashboard Override

If you prefer not to touch Git files when switching domains, set these environment variables in your hosting provider:

### In Frontend (Render / Vercel / Cloudflare):
```env
VITE_API_URL=https://api.bharatfiling.com/api/v1
VITE_SOCKET_URL=https://api.bharatfiling.com
```

### In Backend (Render Web Service):
```env
CORS_ORIGIN=https://bharatfiling.com
```

---

## 📧 8. Professional Corporate Email Delivery (Zero Sandbox Notices)

To maintain 100% corporate prestige, BharatFiling removes all developer sandbox notices, warning banners, and subject prefixes:

### Cleaned in [`backend/src/services/providers/httpEmailProvider.js`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/services/providers/httpEmailProvider.js):
* **Subject Line:** Stays 100% clean and professional:  
  `Security Alert: Your BharatFiling password was updated` (NO `[Sandbox for ...]` tag).
* **Email Template:** Renders only the official dark-navy BharatFiling header, orange accent, and high-trust layout with zero yellow developer warning banners.

### For Direct Delivery to Any Customer Worldwide:
1. **With Custom Domain (Resend):**  
   Add `bharatfiling.com` in [Resend.com](https://resend.com/domains) and set DNS DKIM records. Emails will send from `support@bharatfiling.com` to any customer worldwide.
2. **Without Custom Domain (Brevo API):**  
   Add your free `BREVO_API_KEY` on Render's Web Service. Brevo delivers directly to any email address without requiring domain verification.

---

## 🧪 9. Post-Domain Migration Verification Checklist

When you point your official company domain:
1. **DNS Propagation:** Wait 5–15 minutes after updating DNS A/CNAME records.
2. **Authorised Domains:** Ensure `yourcompanydomain.com` and `www.yourcompanydomain.com` are added in Firebase.
3. **SMS Dispatch Test:** Go to `https://yourcompanydomain.com/forgot-password`, enter a mobile number (e.g. `7522807970`), and click **Send SMS Recovery Code**.
4. **Physical Reception:** Verify that the phone receives the random 6-digit Google verification code within 5–15 seconds.
5. **Session Verification:** Enter the 6-digit code and verify that authentication redirects into the customer dashboard.
