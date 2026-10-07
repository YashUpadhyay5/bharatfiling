import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

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
};
