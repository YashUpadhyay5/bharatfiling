import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { corsOptions, isOriginAllowed } from './config/cors.js';
import path from 'path';
import fs from 'fs';
import { ENV } from './config/env.js';
import { initSocketServer } from './services/socket.service.js';
import { requirePhoneProof } from './middleware/phoneProof.js';
import authRoutes from './routes/auth.routes.js';
import phoneVerificationRoutes from './routes/phoneVerification.routes.js';
import profileRoutes from './routes/profile.routes.js';
import businessRoutes from './routes/business.routes.js';
import fieldRoutes from './routes/field.routes.js';
import gstRoutes from './routes/registrations/gst-registration/index.js';
import udyamRoutes from './routes/registrations/udyam-registration/index.js';
import iecRoutes from './routes/registrations/iec-registration/index.js';
import fssaiRoutes from './routes/registrations/fssai-registration/index.js';
import ptRoutes from './routes/registrations/professional-tax/index.js';
import shopRoutes from './routes/registrations/shop-establishment/index.js';
import gstServicesRoutes from './routes/registrations/gst-services/index.js';
import dscRoutes from './routes/registrations/digital-signature/index.js';
import pfRoutes from './routes/registrations/pf-registration/index.js';
import esiRoutes from './routes/registrations/esi-registration/index.js';
import panRoutes from './routes/registrations/pan-registration/index.js';
import tanRoutes from './routes/registrations/tan-registration/index.js';
import apedaRoutes from './routes/registrations/apeda-registration/index.js';
import proprietorshipRoutes from './routes/registrations/proprietorship/index.js';
import trustRoutes from './routes/registrations/trust/index.js';
import llpRoutes from './routes/registrations/llp/index.js';
import indianSubsidiaryRoutes from './routes/registrations/indian-subsidiary/index.js';
import section8Routes from './routes/registrations/section8/index.js';
import caConsultationRoutes from './routes/registrations/ca-consultation/index.js';
import legalConsultationRoutes from './routes/registrations/legal-consultation/index.js';
import startupStructuringRoutes from './routes/registrations/startup-structuring/index.js';
import gstNoticeHearingRoutes from './routes/registrations/gst-notice-hearing/index.js';
import incomeTaxDisputeRoutes from './routes/registrations/income-tax-dispute-appeals/index.js';
import trademarkHearingRoutes from './routes/registrations/trademark-hearing-support/index.js';
import monthlyPayrollRoutes from './routes/registrations/monthly-payroll/index.js';
import statutoryTdsRoutes from './routes/registrations/statutory-tds-compliance/index.js';
import pfEsiRoutes from './routes/registrations/pf-esi-monthly-returns/index.js';
import virtualCfoRoutes from './routes/registrations/virtual-cfo/index.js';
import secretarialAuditRoutes from './routes/registrations/secretarial-audit-registers/index.js';
import shopActRenewalRoutes from './routes/registrations/shop-act-renewal/index.js';
import factoryLicenseRoutes from './routes/registrations/factory-license-compliance/index.js';
import environmentalConsentRoutes from './routes/registrations/environmental-consent-pcb/index.js';
import contractDraftingRoutes from './routes/registrations/contract-drafting-ndas/index.js';
import logoDesignIpRoutes from './routes/registrations/logo-design-ip/index.js';
import trademarkRoutes from './routes/trademark/index.js';
import copyrightRoutes from './routes/copyright/index.js';
import patentRoutes from './routes/patent/index.js';
import itrServicesRoutes from './routes/registrations/itr-services/index.js';
import mcaServicesRoutes from './routes/registrations/mca-services/index.js';
import tdsReturnFilingRoutes from './routes/registrations/tds-return-filing/index.js';
import noticeResponseRoutes from './routes/registrations/notice-response/index.js';
import documentRoutes from './routes/document.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import caRoutes from './routes/ca.routes.js';
import supportRoutes from './routes/support.routes.js';
import adminRoutes from './routes/admin.routes.js';
import serviceRoutes from './routes/service.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import toolsRoutes from './routes/tools.routes.js';

const app = express();

// Behind Render / a reverse proxy: trust the first hop so rate limiting sees real client IPs
app.set('trust proxy', 1);
app.disable('x-powered-by');

// Security headers (nosniff, frameguard, HSTS, referrer-policy, ...)
app.use(
  helmet({
    // Non-breaking CSP directives only (a full script-src policy needs browser testing against
    // Firebase / reCAPTCHA); these still block plugin content, <base> hijacking and clickjacking.
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'self'"],
        formAction: ["'self'"],
      },
    },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS: explicit allowlist with credentials, pattern matching, and preflight handling
app.use(cors(corsOptions));
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// JSON bodies are small forms; documents go through multipart upload (10 MB cap in multer)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Never leak internal error text to clients outside development
app.use((req, res, next) => {
  if (!ENV.IS_PRODUCTION && ENV.NODE_ENV === 'development') return next();
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    if (body && typeof body === 'object' && !Array.isArray(body) && 'error' in body && typeof body.error === 'string') {
      const { error, ...rest } = body;
      return originalJson(rest);
    }
    return originalJson(body);
  };
  next();
});

// Rate limiting
const makeLimiter = (windowMinutes, max, message) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit: max,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { success: false, message },
  });

app.use('/api', makeLimiter(15, 600, 'Too many requests. Please slow down and try again shortly.'));
const loginLimiter = makeLimiter(15, 10, 'Too many login attempts. Please try again in 15 minutes.');
const otpSendLimiter = makeLimiter(15, 5, 'Too many code requests. Please try again in 15 minutes.');
const otpVerifyLimiter = makeLimiter(15, 20, 'Too many verification attempts. Please try again in 15 minutes.');
app.use('/api/v1/auth/login', loginLimiter);
app.use('/api/v1/auth/login/phone', loginLimiter);
app.use('/api/v1/auth/change-password', loginLimiter);
app.use('/api/v1/auth/register/request-otp', otpSendLimiter);
app.use('/api/v1/auth/forgot-password/request-otp', otpSendLimiter);
app.use('/api/v1/auth/register/verify-otp', otpVerifyLimiter);
app.use('/api/v1/auth/register/phone-verify', otpVerifyLimiter);
app.use('/api/v1/auth/forgot-password/verify-otp', otpVerifyLimiter);
app.use('/api/v1/auth/forgot-password/reset-password', otpVerifyLimiter);
app.use('/api/v1/auth/forgot-password/phone-reset', otpVerifyLimiter);
// Higher than otpSendLimiter: every lead form uses this, and many customers share one mobile-carrier IP.
// Firebase has its own per-number SMS limits, and a wrong code only spends that code's attempts.
app.use('/api/v1/phone-verification', makeLimiter(15, 30, 'Too many verification requests. Please try again in 15 minutes.'));
app.use('/api/v1/support/chat', makeLimiter(15, 60, 'Too many questions. Please try again shortly.'));

// NOTE: uploaded KYC documents are NOT served statically. They are only available through
// the authenticated GET /api/v1/documents/:id/file endpoint (owner / CA / admin).

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    platform: 'BharatFiling Indian Compliance Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount Modular API Routes
app.use('/api/v1', requirePhoneProof);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/phone-verification', phoneVerificationRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/businesses', businessRoutes);
app.use('/api/v1/fields', fieldRoutes);
app.use('/api/v1/gst', gstRoutes);
app.use('/api/v1/udyam', udyamRoutes);
app.use('/api/v1/iec', iecRoutes);
app.use('/api/v1/fssai', fssaiRoutes);
app.use('/api/v1/pt', ptRoutes);
app.use('/api/v1/shop-establishment', shopRoutes);
app.use('/api/v1/shop', shopRoutes);
app.use('/api/v1/gst-services', gstServicesRoutes);
app.use('/api/v1/dsc', dscRoutes);
app.use('/api/v1/digital-signature', dscRoutes);
app.use('/api/v1/pf', pfRoutes);
app.use('/api/v1/epf', pfRoutes);
app.use('/api/v1/esi', esiRoutes);
app.use('/api/v1/esic', esiRoutes);
app.use('/api/v1/pan', panRoutes);
app.use('/api/v1/tan', tanRoutes);
app.use('/api/v1/apeda', apedaRoutes);
app.use('/api/v1/proprietorship', proprietorshipRoutes);
app.use('/api/v1/sole-proprietorship', proprietorshipRoutes);
app.use('/api/v1/trust', trustRoutes);
app.use('/api/v1/trust-registration', trustRoutes);
app.use('/api/v1/llp', llpRoutes);
app.use('/api/v1/llp-registration', llpRoutes);
app.use('/api/v1/limited-liability-partnership', llpRoutes);
app.use('/api/v1/indian-subsidiary', indianSubsidiaryRoutes);
app.use('/api/v1/foreign-subsidiary', indianSubsidiaryRoutes);
app.use('/api/v1/subsidiary', indianSubsidiaryRoutes);
app.use('/api/v1/section8', section8Routes);
app.use('/api/v1/section-8', section8Routes);
app.use('/api/v1/section-8-company', section8Routes);
app.use('/api/v1/ngo-registration', section8Routes);
app.use('/api/v1/ca/consultation', caConsultationRoutes);
app.use('/api/v1/ca-consultation', caConsultationRoutes);
app.use('/api/v1/chartered-accountant-services', caConsultationRoutes);
app.use('/api/v1/legal-consultation', legalConsultationRoutes);
app.use('/api/v1/talk-to-a-lawyer', legalConsultationRoutes);
app.use('/api/v1/lawyer-consultation', legalConsultationRoutes);
app.use('/api/v1/startup-structuring-advisory', startupStructuringRoutes);
app.use('/api/v1/startup-structuring', startupStructuringRoutes);
app.use('/api/v1/startup-advisory', startupStructuringRoutes);
app.use('/api/v1/gst-notice-hearing', gstNoticeHearingRoutes);
app.use('/api/v1/income-tax-dispute-appeals', incomeTaxDisputeRoutes);
app.use('/api/v1/income-tax-dispute', incomeTaxDisputeRoutes);
app.use('/api/v1/trademark-hearing-support', trademarkHearingRoutes);
app.use('/api/v1/trademark-hearing', trademarkHearingRoutes);
app.use('/api/v1/monthly-payroll', monthlyPayrollRoutes);
app.use('/api/v1/payroll', monthlyPayrollRoutes);
app.use('/api/v1/online-payroll-management', monthlyPayrollRoutes);
app.use('/api/v1/statutory-tds-compliance', statutoryTdsRoutes);
app.use('/api/v1/statutory-tds', statutoryTdsRoutes);
app.use('/api/v1/tds-compliance', statutoryTdsRoutes);
app.use('/api/v1/pf-esi-monthly-returns', pfEsiRoutes);
app.use('/api/v1/pf-esi', pfEsiRoutes);
app.use('/api/v1/epf-esic', pfEsiRoutes);
app.use('/api/v1/virtual-cfo', virtualCfoRoutes);
app.use('/api/v1/virtual-cfo-accounting', virtualCfoRoutes);
app.use('/api/v1/cfo-services', virtualCfoRoutes);
app.use('/api/v1/secretarial-audit-registers', secretarialAuditRoutes);
app.use('/api/v1/secretarial-audit', secretarialAuditRoutes);
app.use('/api/v1/statutory-registers', secretarialAuditRoutes);
app.use('/api/v1/shop-act-renewal', shopActRenewalRoutes);
app.use('/api/v1/shop-establishment-renewal', shopActRenewalRoutes);
app.use('/api/v1/gumasta-renewal', shopActRenewalRoutes);
app.use('/api/v1/factory-license-compliance', factoryLicenseRoutes);
app.use('/api/v1/factory-license', factoryLicenseRoutes);
app.use('/api/v1/dish-compliance', factoryLicenseRoutes);
app.use('/api/v1/environmental-consent-pcb', environmentalConsentRoutes);
app.use('/api/v1/environmental-consent', environmentalConsentRoutes);
app.use('/api/v1/pcb-consent', environmentalConsentRoutes);
app.use('/api/v1/contract-drafting-ndas', contractDraftingRoutes);
app.use('/api/v1/contract-drafting', contractDraftingRoutes);
app.use('/api/v1/nda-drafting', contractDraftingRoutes);
app.use('/api/v1/logo-design-ip', logoDesignIpRoutes);
app.use('/api/v1/logo-design', logoDesignIpRoutes);
app.use('/api/v1/logo-ip-protection', logoDesignIpRoutes);
app.use('/api/v1/trademark', trademarkRoutes);
app.use('/api/v1/trademark-registration', trademarkRoutes);
app.use('/api/v1/trademark-renewal', trademarkRoutes);
app.use('/api/v1/trademark-assignment', trademarkRoutes);
app.use('/api/v1/copyright', copyrightRoutes);
app.use('/api/v1/copyright-registration', copyrightRoutes);
app.use('/api/v1/patent', patentRoutes);
app.use('/api/v1/patent-registration', patentRoutes);
app.use('/api/v1/provisional-patent', patentRoutes);
app.use('/api/v1/provisional-patent-application', patentRoutes);
app.use('/api/v1/itr-services', itrServicesRoutes);
app.use('/api/v1/mca-services', mcaServicesRoutes);
app.use('/api/v1/tds-return-filing', tdsReturnFilingRoutes);
app.use('/api/v1/notice-response', noticeResponseRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/ca', caRoutes);
app.use('/api/v1/support', supportRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/tools', toolsRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  if (err?.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'Request body is too large.' });
  }
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Malformed request body.' });
  }
  if (err?.name === 'MulterError' || /Invalid file format/.test(err?.message || '')) {
    return res.status(400).json({ success: false, message: err.message });
  }
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong. Your information is safe and saved.',
    error: ENV.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Serve Static Frontend Assets (Production & Render Single-Service Deployment)
const frontendDistPath = path.resolve(process.cwd(), '../frontend/dist');
const localDistPath = path.resolve(process.cwd(), './dist');

const staticOptions = {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  },
};

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath, staticOptions));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.originalUrl.startsWith('/api') && !req.originalUrl.startsWith('/uploads')) {
      res.setHeader('Cache-Control', 'no-cache');
      return res.sendFile(path.join(frontendDistPath, 'index.html'));
    }
    next();
  });
} else if (fs.existsSync(localDistPath)) {
  app.use(express.static(localDistPath, staticOptions));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.originalUrl.startsWith('/api') && !req.originalUrl.startsWith('/uploads')) {
      res.setHeader('Cache-Control', 'no-cache');
      return res.sendFile(path.join(localDistPath, 'index.html'));
    }
    next();
  });
}

// 404 Route Catch-all
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found.`,
  });
});

const PORT = ENV.PORT || 5000;
const httpServer = http.createServer(app);
initSocketServer(httpServer);

httpServer.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 BharatFiling Compliance Platform API Online`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`⚡ WebSocket: ws://localhost:${PORT}`);
  console.log(`🛡️  Mode: ${ENV.NODE_ENV}`);
  console.log(`📁 Uploads: ${ENV.STORAGE_DIR}`);
  console.log(`====================================================`);
});
