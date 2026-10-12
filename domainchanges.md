# 🌐 BharatFiling Custom Company Domain Migration Guide

> **Single Source of Truth Document**  
> When you buy or connect your official company domain (e.g. `bharatfiling.com`, `www.bharatfiling.com`), follow this step-by-step guide.  
> You do **NOT** need to search through hundreds of files or rebuild anything from scratch. Everything is centralized in **one single file** and **one Firebase setting**.

---

## 🎯 Quick Summary: The Only 2 Places to Change

| Step | Location | What to Do | Time Required |
| :--- | :--- | :--- | :--- |
| **1. In Code** | [`frontend/src/config/domain.js`](file:///C:/Users/DELL/Desktop/bharatfiling/frontend/src/config/domain.js) | Change Line 14 (`COMPANY_DOMAIN`) and Line 17 (`DEFAULT_BACKEND_URL`) | **10 Seconds** |
| **2. In Firebase** | Firebase Console → Authentication → Settings → Authorized domains | Click **"Add domain"** and enter your company domain | **20 Seconds** |
| **3. In Backend** | [`backend/src/index.js`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/index.js) | **Zero Changes Needed!** (CORS is already configured with `origin: true` dynamic reflection) | **0 Seconds** |

---

## 📁 1. The Single Code File to Change

### File Path:
[`frontend/src/config/domain.js`](file:///C:/Users/DELL/Desktop/bharatfiling/frontend/src/config/domain.js)

### Current Code (Line-by-Line):
```javascript
// Line 13:
// 1. The public company domain (update this when pointing custom domain)
// Line 14:
export const COMPANY_DOMAIN = 'bharatfiling.onrender.com';

// Line 16:
// 2. The production backend service URL (update if backend is hosted on a custom subdomain)
// Line 17:
export const DEFAULT_BACKEND_URL = 'https://bharatfiling-1.onrender.com';
```

### When Changing to Your Company Domain (Example: `bharatfiling.com`):
Change lines 14 & 17 to:
```javascript
// Line 14:
export const COMPANY_DOMAIN = 'bharatfiling.com';

// Line 17:
export const DEFAULT_BACKEND_URL = 'https://api.bharatfiling.com'; // or keep https://bharatfiling-1.onrender.com if backend remains on Render
```

### Why this works everywhere automatically:
- [`frontend/src/services/api.js`](file:///C:/Users/DELL/Desktop/bharatfiling/frontend/src/services/api.js) automatically imports `API_BASE_URL` from this file.
- [`frontend/src/services/socket.js`](file:///C:/Users/DELL/Desktop/bharatfiling/frontend/src/services/socket.js) automatically imports `SOCKET_BASE_URL` from this file.
- You never have to search for URLs across forms, components, or services!

---

## 🔥 2. Firebase Console (Required for SMS OTP Delivery)

Google Firebase blocks phone SMS OTPs if the domain sending them is not on its whitelist. When you switch to your custom domain, add it to Firebase:

1. Open [Firebase Console](https://console.firebase.google.com/).
2. Select your project: **`bharatfiling-prod`**.
3. In the left navigation, click **Authentication**.
4. At the top tabs, click **Settings**.
5. Click **Authorized domains** in the submenu.
6. Click the blue **Add domain** button.
7. Enter your new company domains:
   - `bharatfiling.com`
   - `www.bharatfiling.com`
8. Click **Add**.

*Done! Firebase will now immediately dispatch 6-digit SMS OTPs from your custom domain.*

---

## 🛡️ 3. Backend CORS & Security

You do **NOT** need to edit the backend codebase when changing domains.

In [`backend/src/index.js`](file:///C:/Users/DELL/Desktop/bharatfiling/backend/src/index.js):
```javascript
app.use(cors({
  origin: true,
  credentials: true,
}));
```
Because `origin: true` dynamically validates and allows any domain you host the frontend on (whether it's `localhost`, `bharatfiling.onrender.com`, or `bharatfiling.com`), cookies, headers, and JWT tokens flow seamlessly.

---

## ⚙️ 4. Optional: Zero-Code Cloud Dashboard Override

If you do not want to edit any Git files at all when switching domains, you can configure your hosting environment variables:

### In Render / Vercel / Cloudflare Frontend Environment:
```env
VITE_API_URL=https://api.bharatfiling.com/api/v1
VITE_SOCKET_URL=https://api.bharatfiling.com
```

### In Backend Hosting Environment:
```env
CORS_ORIGIN=https://bharatfiling.com
```

---

## 🧪 5. Verification Checklist After Domain Change

Once your custom domain DNS has propagated (usually 5 to 15 minutes):
1. **Open Frontend:** Visit `https://bharatfiling.com/forgot-password`.
2. **Test SMS Dispatch:** Enter any 10-digit mobile number (e.g. `7668976193`) and click **Send SMS Recovery Code**.
3. **Verify reCAPTCHA:** Ensure no red popup appears and the green toast displays: *"Random 6-digit SMS OTP sent to +91 7668976193 via Firebase!"*.
4. **Verify Delivery:** Check physical device for the 6-digit Google SMS.
5. **Verify Password Reset:** Enter the 6-digit OTP, new password, and submit.
