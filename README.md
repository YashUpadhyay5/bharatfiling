# BharatFiling — AI + CA-Powered Indian Business Compliance Platform

BharatFiling is a production-grade Indian professional services and business compliance operating system. Built with an **AI + Human In-The-Loop** architecture, the platform combines machine extraction and validation with licensed Chartered Accountants (CAs) and Advocates.

> 📖 **Comprehensive Architecture & Detailed Changelog**: See [PROJECT_DOCUMENTATION_AND_CHANGELOG.md](./PROJECT_DOCUMENTATION_AND_CHANGELOG.md) for full explanations of all features, why they were built, how they work, table schemas, and exact file locations.

---

## 🏛️ System Architecture

The project is structured into two clean directories with **zero TypeScript** (pure modern JavaScript):

```
bharatfiling/
├── backend/       # Node.js (v24), Express, Pure JavaScript ES Modules, Razorpay SDK, JWT, Multer
└── frontend/      # React 19, Pure JavaScript (JSX), Tailwind CSS v4, Lucide Icons, Vite
```

---

## 🚀 Quick Start Guide

### 1. Start the Backend API (Port 5000)

```bash
cd backend
npm install   # If not already installed
node src/index.js
# Or with auto-reload: npm run dev
```

* API Base: `http://localhost:5000/api/v1`
* Health Check: `http://localhost:5000/api/health`

### 2. Start the Frontend Application (Port 3000)

```bash
cd frontend
npm install   # If not already installed
npm run dev
```

* Web App: `http://localhost:3000`

---

## 🧰 Command Reference

### Environment setup

```bash
# Backend secrets (JWT_SECRET, OTP_PEPPER, CORS_ORIGIN, Razorpay, SMTP, ...)
cp backend/.env.example backend/.env

# Frontend config (VITE_API_URL, VITE_SOCKET_URL, VITE_SUPABASE_*)
cp frontend/.env.example frontend/.env

# Generate a strong value for JWT_SECRET / OTP_PEPPER
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

### Install dependencies

```bash
npm --prefix backend install
npm --prefix frontend install
```

### Run in development

| Command | Where | What it does |
| :--- | :--- | :--- |
| `npm run dev` | `backend/` | API on port 5000 with auto-reload (`node --watch`) |
| `npm start` | `backend/` | API on port 5000, no auto-reload |
| `npm run dev` | `frontend/` | Vite dev server on port 3000, proxies `/api` and `/uploads` to port 5000 |
| `npm run preview` | `frontend/` | Serve the production build locally (run `npm run build` first) |

### Tests (backend)

```bash
cd backend
npm test                                              # full suite, run serially
node --test src/tests/gstServicesE2E.test.js          # a single test file
node --test src/tests/shopEstablishmentE2E.test.js
node --test src/tests/ptRegistrationE2E.test.js
```

### Build and production start

```bash
# From the repo root (this is what Render runs, see render.yaml)
npm run build   # installs backend + frontend deps and builds the frontend into frontend/dist
npm start       # starts the backend, which serves the API
```

### Utility scripts

```bash
cd frontend && npm run catalog:export        # regenerate SERVICE_CATALOG.md from src/data/serviceCatalog.js (run after editing prices)
cd backend  && node scripts/seedServices.js  # seed services into Supabase
cd backend  && node scripts/test_supabase.js # check the Supabase connection
```

> The two Supabase scripts read `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` from `backend/.env`. These are not in `.env.example`, so add them yourself.

### Git: pushing your work to GitHub

```bash
git status                       # see what changed
git add -A                       # stage everything (.env and backend/data/ are git-ignored)
git commit -m "your message"     # commit
git push origin <your-branch>    # push, e.g. git push origin aman
git push -u origin <your-branch> # first push of a new branch (sets upstream)

# Keep your branch current with main
git fetch origin
git merge origin/main
```

> Never commit `.env` files. Secrets live in `backend/.env` locally and in the Render dashboard in production.

---

## 👥 Demo Credentials & One-Click Role Switcher

For seamless review and testing, a discreet floating **Demo Role Switcher** is pinned at the bottom-left of every screen (and also on the login page), allowing 1-click toggling between accounts without cluttering the main navigation:

| Role | Email / Identifier | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Customer** | `rahul.verma@example.com` | `Password@123` | Master Profile, Business Management, 11-Step GST Wizard, Tracking |
| **Chartered Accountant** | `ca.sharma@taxveda.com` | `Password@123` | CA Case Workbench, Split-Screen OCR Review, ARN Filing, Certificate Issuance |
| **Platform Admin** | `admin@taxveda.com` | `Password@123` | Financial Analytics, Revenue KPIs, User Registry, Security Audit Trail |

---

## 🌟 Key Modules & Production Features

1. **Master Customer Profile (`/dashboard`):** Single source of truth for identity data (PAN, Aadhaar, Addresses, DOB) verified once and reused across GST, ITR, MCA, and Trademark.
2. **Dynamic Requirement Engine:** Server-driven document and field requirements computed dynamically per entity structure (Proprietorship, Partnership, LLP, Pvt Ltd, OPC).
3. **11-Step GST Application Wizard (`/apply/gst`):**
   * Real-time autosave
   * Drag-and-drop file upload with AI/OCR text extraction
   * Cross-field name mismatch detection (PAN vs Aadhaar vs Form data)
   * AI pre-check sanity summary prior to submission
4. **CA Workbench (`/ca/dashboard`):**
   * Split-screen document inspection with OCR confidence
   * Government portal filing sync (Form REG-01)
   * Real-time ARN generation
   * Notice REG-03 clarification handling and REG-04 replies
   * REG-06 GST Registration Certificate and GSTIN allotment
5. **Transparent Razorpay Payment Pipeline:**
   * Transparent fee invoice (Base fee ₹1,499 + 18% GST ₹270 = ₹1,769 total)
   * HMAC-SHA256 signature verification with automated sandbox dev mode
6. **Omnichannel Support Hub:**
   * Context-aware floating 🤖 **GST AI Assistant**
   * WhatsApp Business direct connect
   * Official helpline dialer (`1800-890-8800`)
   * CA Phone Callback scheduling
7. **Complete Public Information Architecture:**
   * Conversion-optimized Homepage (`/`)
   * Flagship GST Registration Landing Page (`/services/gst-registration`)
   * All Services Directory (`/services`)
   * Modular coming-soon expansion placeholders (GSTR, ITR, MCA, Trademark)
   * Pricing (`/pricing`), About (`/about`), Contact (`/contact`), and Knowledge Base (`/faq`).

---

## 🔒 Production Security & Storage Drop-in

* **Database:** Powered by an asynchronous persistent repository in `backend/data/db.json` with zero-friction startup. Supply `DATABASE_URL` in `backend/.env` anytime to toggle to production PostgreSQL.
* **Storage:** Default local file storage in `backend/uploads/` with public static serving. Built-in provider hooks ready for AWS S3 and Cloudinary.
* **Sensitive Masking:** Masked views for Aadhaar numbers (`XXXX-XXXX-1012`) and full audit logging of CA/Admin actions.
