import dotenv from 'dotenv';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

const envFile = fs.existsSync(path.resolve(process.cwd(), 'backend/.env'))
  ? path.resolve(process.cwd(), 'backend/.env')
  : path.resolve(process.cwd(), '.env');

dotenv.config({ path: envFile });

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

/**
 * Secrets must come from the environment. If one is missing we generate a random
 * per-process value instead of falling back to a value that is public in git.
 * (Sessions / pending OTPs are then invalidated on restart, which is the safe failure.)
 */
const requireSecret = (name) => {
  const value = process.env[name];
  if (value && value.length >= 16) return value;
  console.warn(
    `⚠️  ${name} is ${value ? 'too short (min 16 chars)' : 'not set'}. ` +
      `Using a random ephemeral value${IS_PRODUCTION ? ' — set it in your hosting dashboard!' : '.'}`
  );
  return crypto.randomBytes(48).toString('hex');
};

export const ENV = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV,
  IS_PRODUCTION,
  JWT_SECRET: requireSecret('JWT_SECRET'),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  // Comma-separated list of allowed browser origins. '*' is intentionally not honoured.
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || '',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  STORAGE_TYPE: process.env.STORAGE_TYPE || 'local',
  STORAGE_DIR: path.resolve(process.cwd(), process.env.STORAGE_DIR || './uploads'),
  DATABASE_URL: process.env.DATABASE_URL || '',
  OTP_PEPPER: requireSecret('OTP_PEPPER'),
  EMAIL_PROVIDER: process.env.EMAIL_PROVIDER || 'smtp',
  SMTP_SERVICE: process.env.SMTP_SERVICE || 'gmail',
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '465', 10),
  SMTP_SECURE: process.env.SMTP_SECURE !== 'false',
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SMTP_FROM: process.env.SMTP_FROM || '',
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  BREVO_API_KEY: process.env.BREVO_API_KEY || '',
  // Web API key of the Firebase project used for phone-OTP verification (restrict it in Google Cloud).
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || '',
  // Optional: seed passwords for the demo ADMIN / CA accounts (never seeded in production without them).
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD || '',
};
