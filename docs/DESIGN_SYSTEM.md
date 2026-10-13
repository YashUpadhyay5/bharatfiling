# BharatFiling — Minimal Corporate Design System

This document specifies the global design system for BharatFiling, created to reflect the mature, established corporate visual identity of **IndiaFilings**.

---

## 1. Colour System

### 1.1 Primary Corporate Palette
| Token | Hex Value | Role / Usage |
| :--- | :--- | :--- |
| `color-primary` | `#155EEF` | Primary corporate action, active buttons, highlighted links, brand focus. |
| `color-primary-hover` | `#1048C6` | Hover state for primary action buttons. |
| `color-primary-subtle`| `#EFF8FF` | Active navigation item background, selected tab fill, subtle highlight. |
| `color-text-main` | `#252B36` | Dominant text color for headings, titles, labels, and primary content. |
| `color-text-secondary`| `#667085` | Subheadings, body descriptions, form hints, and secondary meta details. |
| `color-bg-main` | `#FFFFFF` | Dominant application canvas and card surfaces. |
| `color-bg-section` | `#F8F9FB` | Soft alternating section background for visual separation. |
| `color-bg-muted` | `#F3F4F6` | Table headers, disabled input fills, neutral tag backgrounds. |
| `color-border` | `#E5E7EB` | Global 1px hairline border for cards, inputs, dividers, and tables. |
| `color-border-subtle` | `#F1F3F5` | Subtle horizontal table row dividers. |

### 1.2 Semantic Status Palette (Functional States Only)
*Status colors are strictly reserved for genuine application and compliance states—never used as arbitrary decorative card colors.*

| State | Text & Border Hex | Background Hex | Semantic Meaning |
| :--- | :--- | :--- | :--- |
| **Success** | `#027A48` | `#ECFDF3` | Approved application, verified PAN/Aadhaar, completed payment. |
| **Warning** | `#B54708` | `#FFFAEB` | Departmental clarification requested (REG-03), pending action. |
| **Error** | `#B42318` | `#FEF3F2` | Rejected filing, validation failure, expired session. |
| **Info / Process** | `#155EEF` | `#EFF8FF` | Under CA review, ARN generated, filing in progress. |

### 1.3 Indian Brand Identity
- **Subtle Tricolor Accent**: Used solely as a clean 2px hairline or badge detail on the logo and statutory verification seals:
  - Saffron: `#FF9933`
  - White: `#FFFFFF`
  - Green: `#138808`
- *Strict Rule*: Do not use saturated tricolor banners across entire page layouts.

---

## 2. Typography Scale

BharatFiling uses **Inter** (with system sans-serif fallback) as its universal corporate typography family.

| Level | Size | Line Height | Weight | Letter Spacing | Tailwind Class |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display H1** | 36px | 44px | Bold / 800 | -0.02em | `text-3xl sm:text-4xl font-extrabold tracking-tight` |
| **Section H2** | 28px | 36px | Bold / 700 | -0.01em | `text-2xl sm:text-3xl font-bold tracking-tight` |
| **Card H3** | 20px | 28px | SemiBold / 600 | 0 | `text-lg sm:text-xl font-semibold` |
| **Subheading H4**| 16px | 24px | SemiBold / 600 | 0 | `text-base font-semibold` |
| **Body Large** | 16px | 24px | Regular / 400 | 0 | `text-base text-[#667085] leading-relaxed` |
| **Body Standard**| 14px | 20px | Regular / 400 | 0 | `text-sm text-[#667085] leading-normal` |
| **Form Label** | 13px | 18px | Medium / 500 | 0 | `text-xs sm:text-[13px] font-medium text-[#252B36]` |
| **Caption / Help**| 12px | 16px | Regular / 400 | 0 | `text-xs text-[#667085]` |
| **Micro Kicker** | 11px | 14px | Bold / 700 | +0.05em | `text-[11px] font-bold uppercase tracking-wider` |

---

## 3. Geometry, Elevation & Spacing

### 3.1 Border Radius Tokens
- **Form Controls & Buttons**: `8px` (`rounded-lg`)
- **Cards, Panels & Modals**: `12px` (`rounded-xl`)
- **Pills & Status Badges**: `9999px` (`rounded-full`)
- *Deprecated*: Extreme `24px` (`rounded-3xl`) cards and containers.

### 3.2 Elevation & Shadows
- **Card Surface**: Flat with 1px border (`border border-[#E5E7EB] bg-white shadow-xs`).
- **Interactive Hover**: Subtle lift (`hover:border-[#155EEF]/50 hover:shadow-sm transition-all duration-150`).
- **Modals & Dropdowns**: Restrained corporate shadow (`shadow-lg border border-[#E5E7EB] bg-white`).

### 3.3 Layout & Container Tokens
- **Maximum Content Width**: `1280px` (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **Form Card Width**: `560px` (`max-w-xl mx-auto`).
- **Standard Section Padding**: `py-12 sm:py-16 md:py-20`.
- **Card Inner Padding**: `p-6 sm:p-8`.

---

## 4. Standard Components & Controls

### 4.1 Buttons
- **Primary Action**:
  - `bg-[#155EEF] hover:bg-[#1048C6] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors`
- **Secondary / Outline Action**:
  - `bg-white hover:bg-[#F8F9FB] text-[#252B36] font-semibold text-sm px-5 py-2.5 rounded-lg border border-[#E5E7EB] shadow-xs transition-colors`
- **Tertiary / Ghost Action**:
  - `text-[#155EEF] hover:bg-[#EFF8FF] font-semibold text-sm px-3 py-2 rounded-lg transition-colors`

### 4.2 Form Inputs
- **Base Input**:
  - `w-full h-11 px-3.5 py-2.5 bg-white border border-[#E5E7EB] rounded-lg text-sm text-[#252B36] placeholder-[#98A2B3] focus:outline-none focus:border-[#155EEF] focus:ring-1 focus:ring-[#155EEF] transition-all`
- **Error State**:
  - `border-[#FDA29B] text-[#B42318] focus:border-[#B42318] focus:ring-1 focus:ring-[#B42318]`

### 4.3 Data Tables
- Header: `bg-[#F8F9FB] border-b border-[#E5E7EB] text-[11px] font-semibold uppercase tracking-wider text-[#667085] px-4 py-3 text-left`
- Row: `border-b border-[#F1F3F5] hover:bg-[#F8F9FB]/60 transition-colors text-sm text-[#252B36] px-4 py-3.5`

---

## 5. Non-Fabrication Rules
1. **Never fabricate statistical numbers** (`10,000+ happy clients`, `99.4% approval rating`, `15 years experience`).
2. **Never create fake customer reviews or testimonials**.
3. **Never claim government partnerships or official agency status**.
4. **State verifiable operational facts**:
   - Independent corporate and taxation technology platform.
   - Filings prepared and audited by qualified Chartered Accountants (ICAI).
   - Standard government processing timelines (e.g., 3 to 7 working days for GSTIN issuance).
   - Transparent pricing with exact GST fee breakdown.
