/**
 * ==============================================================================
 * BHARATFILING DOMAIN & ENDPOINT CONFIGURATION
 * Single source of truth for company domain, backend URL, and API endpoints.
 * 
 * WHEN CHANGING TO YOUR COMPANY DOMAIN (e.g. bharatfiling.com):
 * Simply update COMPANY_DOMAIN and DEFAULT_BACKEND_URL below,
 * or set VITE_API_URL in your hosting dashboard (Render / Vercel / Cloudflare).
 * You do NOT need to search or touch any other files in the project!
 * ==============================================================================
 */

// 1. The public company domain (update this when pointing custom domain)
export const COMPANY_DOMAIN = 'bharatfiling.onrender.com';

// 2. The production backend service URL (update if backend is hosted on a custom subdomain)
export const DEFAULT_BACKEND_URL = 'https://bharatfiling-1.onrender.com';

// 3. Dynamic API URL resolver:
// Prioritizes environment variable VITE_API_URL, then production default, then local proxy
export const API_BASE_URL = (() => {
  // In local development on localhost/127.0.0.1, prioritize local backend for instant, offline-capable testing
  if (import.meta.env.DEV && typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    if (import.meta.env.VITE_FORCE_PROD_API === 'true') {
      return import.meta.env.VITE_API_URL || `${DEFAULT_BACKEND_URL}/api/v1`;
    }
    return import.meta.env.VITE_LOCAL_API_URL || 'http://localhost:5000/api/v1';
  }

  // When deployed on Render (single web-service architecture), communicate directly with own host
  if (typeof window !== 'undefined' && window.location.origin && window.location.origin.includes('onrender.com')) {
    return `${window.location.origin}/api/v1`;
  }

  const custom = import.meta.env.VITE_API_URL;
  if (custom) {
    return custom.endsWith('/api/v1') ? custom : `${custom.replace(/\/$/, '')}/api/v1`;
  }
  if (typeof window !== 'undefined' && window.location.origin) {
    return `${window.location.origin}/api/v1`;
  }
  if (import.meta.env.PROD) {
    return `${DEFAULT_BACKEND_URL}/api/v1`;
  }
  return '/api/v1';
})();


// 4. Dynamic WebSocket / Socket.io URL resolver:
// Automatically syncs with backend endpoint
export const SOCKET_BASE_URL = (() => {
  if (import.meta.env.DEV && typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000';
  }
  if (typeof window !== 'undefined' && window.location.origin && window.location.origin.includes('onrender.com')) {
    return window.location.origin;
  }
  const custom = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL;
  if (custom) {
    return custom.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  if (import.meta.env.PROD) {
    return DEFAULT_BACKEND_URL;
  }
  return 'http://localhost:5000';
})();
