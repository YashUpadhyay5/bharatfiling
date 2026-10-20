import { ENV } from './env.js';

const DEFAULT_ALLOWED_ORIGINS = [
  'https://bharatfiling.onrender.com',
  'http://bharatfiling.onrender.com',
  'https://bharatfiling-1.onrender.com',
  'http://bharatfiling-1.onrender.com',
  'https://bharatfiling.com',
  'https://www.bharatfiling.com',
  'http://bharatfiling.com',
  'http://www.bharatfiling.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'http://localhost:5000',
  'http://127.0.0.1:5000',
];

/**
 * Returns merged array of explicitly configured origins
 */
export const getAllowedOrigins = () => {
  const envOrigins = [
    ENV?.CORS_ORIGIN,
    process.env.CORS_ORIGIN,
    process.env.FRONTEND_URL,
  ]
    .filter(Boolean)
    .flatMap((val) => String(val).split(','))
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter((o) => o && o !== '*');

  return [...new Set([...DEFAULT_ALLOWED_ORIGINS, ...envOrigins])];
};

/**
 * Check whether an origin is permitted by static list or pattern
 */
export const isOriginAllowed = (origin) => {
  // Non-browser clients, server-to-server, curl, same-origin have no Origin header
  if (!origin) return true;

  const clean = String(origin).trim().replace(/\/$/, '').toLowerCase();
  const allowed = getAllowedOrigins().map((o) => o.toLowerCase());

  if (allowed.includes(clean)) return true;

  // Allow any official BharatFiling onrender deployment (e.g. bharatfiling.onrender.com, preview instances)
  if (/^https?:\/\/(www\.)?bharatfiling(-[a-z0-9_-]+)?\.onrender\.com$/i.test(clean)) return true;

  // Allow production custom domain & all subdomains
  if (/^https?:\/\/([a-z0-9_-]+\.)*bharatfiling\.com$/i.test(clean)) return true;

  // Allow local loopback on any port for development/testing
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(clean)) return true;

  return false;
};

export const corsOptions = {
  origin: (origin, callback) => {
    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }
    console.warn(`[CORS] Rejected origin: ${origin}`);
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Disposition'],
  optionsSuccessStatus: 204,
  maxAge: 86400,
};
