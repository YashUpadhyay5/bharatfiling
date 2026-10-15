import { ENV } from './env.js';

/**
 * Browser origins allowed to call the API / open sockets.
 * Configure with CORS_ORIGIN (comma-separated). A literal '*' is ignored on purpose:
 * the API uses credentialed requests, so a wildcard/reflect-all policy would let any website
 * act on behalf of a logged-in user.
 */
export const getAllowedOrigins = () => {
  const configured = String(ENV.CORS_ORIGIN || '')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter((o) => o && o !== '*');

  const dev = ENV.IS_PRODUCTION
    ? []
    : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:4173'];

  return [...new Set([...configured, ...dev])];
};
