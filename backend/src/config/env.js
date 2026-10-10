import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const envFile = fs.existsSync(path.resolve(process.cwd(), 'backend/.env'))
  ? path.resolve(process.cwd(), 'backend/.env')
  : path.resolve(process.cwd(), '.env');

dotenv.config({ path: envFile });

export const ENV = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'bharatfiling_super_secure_jwt_secret_key_2026_india',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'rzp_test_BharatFilingDemo123',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'BharatFilingSecretKeyDemo456',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  STORAGE_TYPE: process.env.STORAGE_TYPE || 'local',
  STORAGE_DIR: path.resolve(process.cwd(), process.env.STORAGE_DIR || './uploads'),
  DATABASE_URL: process.env.DATABASE_URL || '',
  OTP_PEPPER: process.env.OTP_PEPPER || 'bf_prod_otp_keyed_pepper_2026_india_tax_os',
  EMAIL_PROVIDER: process.env.EMAIL_PROVIDER || 'smtp',
  SMTP_SERVICE: process.env.SMTP_SERVICE || 'gmail',
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '465', 10),
  SMTP_SECURE: process.env.SMTP_SECURE !== 'false',
  SMTP_USER: process.env.SMTP_USER || 'yashupdhyay486@gmail.com',
  SMTP_PASS: process.env.SMTP_PASS || 'tosxtytzdyyyeolk',
  SMTP_FROM: process.env.SMTP_FROM || 'BharatFiling <yashupdhyay486@gmail.com>',
};
