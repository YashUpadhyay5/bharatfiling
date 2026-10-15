import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { getAllowedOrigins } from './config/cors.js';
import path from 'path';
import fs from 'fs';
import { ENV } from './config/env.js';
import { initSocketServer } from './services/socket.service.js';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import businessRoutes from './routes/business.routes.js';
import fieldRoutes from './routes/field.routes.js';
import gstRoutes from './routes/gst-registration/index.js';
import udyamRoutes from './routes/udyam-registration/index.js';
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

// CORS: explicit allowlist only (never reflect arbitrary origins with credentials)
const allowedOrigins = getAllowedOrigins();
app.use(
  cors({
    origin: (origin, cb) => {
      // Same-origin / server-to-server / curl requests carry no Origin header
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
  })
);

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
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/businesses', businessRoutes);
app.use('/api/v1/fields', fieldRoutes);
app.use('/api/v1/gst', gstRoutes);
app.use('/api/v1/udyam', udyamRoutes);
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
