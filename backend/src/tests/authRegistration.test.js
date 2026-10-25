import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import authRoutes from '../routes/auth.routes.js';
import { db } from '../database/db.js';
import { UserModel } from '../models/User.js';

const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRoutes);

let server;

test.before(() => {
  server = app.listen(5096);
});

test.after(() => {
  if (server) server.close();
});

test('Auth Registration - Email Only Registration Flow', async () => {

  const uniqueId = Date.now();
  const testEmail = `user_${uniqueId}@gmail.com`;
  const password = 'Password@123';

  const reqRes = await fetch('http://localhost:5096/api/v1/auth/register/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      full_name: 'Test Email User',
      email: testEmail,
      password,
      method: 'email',
    }),
  });

  const reqData = await reqRes.json();
  assert.equal(reqRes.status, 200);
  assert.equal(reqData.success, true);
  assert.ok(reqData.txn_id);

  // Retrieve staged OTP from local DB
  const otps = db.getOtps();
  const staged = otps.find((o) => o.txn_id === reqData.txn_id);
  assert.ok(staged, 'Staged OTP should exist');

  // Verify OTP
  // Extract OTP from staged payload dev_otp if available
  const verifyRes = await fetch('http://localhost:5096/api/v1/auth/register/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      otp: reqData.dev_otp || '123456',
      txn_id: reqData.txn_id,
    }),
  });

  const verifyData = await verifyRes.json();
  assert.equal(verifyRes.status, 201);
  assert.equal(verifyData.success, true);
  assert.ok(verifyData.token, 'Should return JWT token');
  assert.equal(verifyData.user.email, testEmail);

  // Re-login with Email + Password
  const loginRes = await fetch('http://localhost:5096/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: testEmail,
      password,
    }),
  });
  const loginData = await loginRes.json();
  assert.equal(loginRes.status, 200);
  assert.equal(loginData.success, true);
  assert.ok(loginData.token);
});

test('Auth Registration - Phone Only Registration Flow', async () => {
  const randomPhone = '98' + Math.floor(10000000 + Math.random() * 90000000);
  const password = 'Password@123';

  const reqRes = await fetch('http://localhost:5096/api/v1/auth/register/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      full_name: 'Test Phone User',
      phone: randomPhone,
      password,
      method: 'phone',
    }),
  });

  const reqData = await reqRes.json();
  assert.equal(reqRes.status, 200);
  assert.equal(reqData.success, true);
  assert.ok(reqData.txn_id);

  // Verify OTP with phone
  const verifyRes = await fetch('http://localhost:5096/api/v1/auth/register/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: randomPhone,
      otp: reqData.dev_otp || '123456',
      txn_id: reqData.txn_id,
    }),
  });

  const verifyData = await verifyRes.json();
  assert.equal(verifyRes.status, 201);
  assert.equal(verifyData.success, true);
  assert.ok(verifyData.token, 'Should return JWT token');
  assert.equal(verifyData.user.phone, randomPhone);

  // Re-login with Phone + Password
  const loginRes = await fetch('http://localhost:5096/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: randomPhone,
      password,
    }),
  });
  const loginData = await loginRes.json();
  assert.equal(loginRes.status, 200);
  assert.equal(loginData.success, true);
  assert.ok(loginData.token);
});

test('Forgot Password - Unregistered Email Returns 404 Not Registered', async () => {
  const res = await fetch('http://localhost:5096/api/v1/auth/forgot-password/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'nonexistent_account_99999@example.com' }),
  });
  const data = await res.json();
  assert.equal(res.status, 404);
  assert.equal(data.success, false);
  assert.equal(data.not_registered, true);
});

test('Forgot Password - Registered Email Dispatches OTP and Resets Password', async () => {
  // Use seeded account
  const testEmail = 'yashupdhyay486@gmail.com';
  const newPassword = 'NewSecretPassword@2026';

  const reqRes = await fetch('http://localhost:5096/api/v1/auth/forgot-password/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail }),
  });

  const reqData = await reqRes.json();
  assert.equal(reqRes.status, 200);
  assert.equal(reqData.success, true);
  assert.ok(reqData.txn_id);

  // Retrieve staged OTP
  const otps = db.getOtps();
  const activeOtp = otps.find((o) => o.txn_id === reqData.txn_id);
  assert.ok(activeOtp, 'Active recovery OTP should be stored');

  // Verify OTP
  const verifyRes = await fetch('http://localhost:5096/api/v1/auth/forgot-password/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      otp: reqData.dev_otp || '123456',
      txn_id: reqData.txn_id,
    }),
  });

  const verifyData = await verifyRes.json();
  assert.equal(verifyRes.status, 200);
  assert.equal(verifyData.success, true);
  assert.ok(verifyData.reset_token);

  // Set New Password
  const resetRes = await fetch('http://localhost:5096/api/v1/auth/forgot-password/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      reset_token: verifyData.reset_token,
      new_password: newPassword,
    }),
  });

  const resetData = await resetRes.json();
  assert.equal(resetRes.status, 200);
  assert.equal(resetData.success, true);
  assert.ok(resetData.token, 'Should return session token for auto-login');
  assert.ok(resetData.user, 'Should return user profile for auto-login');
  assert.equal(resetData.user.email, testEmail);

  // Login with new password
  const loginRes = await fetch('http://localhost:5096/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: testEmail,
      password: newPassword,
    }),
  });

  const loginData = await loginRes.json();
  assert.equal(loginRes.status, 200);
  assert.equal(loginData.success, true);
  assert.ok(loginData.token);

  // Test Passwordless Login via Random 6-Digit OTP
  const loginOtpReqRes = await fetch('http://localhost:5096/api/v1/auth/login/request-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: testEmail }),
  });
  const loginOtpReqData = await loginOtpReqRes.json();
  assert.equal(loginOtpReqRes.status, 200);
  assert.equal(loginOtpReqData.success, true);
  assert.ok(loginOtpReqData.txn_id);
  assert.match(loginOtpReqData.dev_otp, /^\d{6}$/, 'OTP must be exactly 6 random digits');

  // Verify OTP Login
  const loginOtpVerifyRes = await fetch('http://localhost:5096/api/v1/auth/login/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: testEmail,
      otp: loginOtpReqData.dev_otp,
      txn_id: loginOtpReqData.txn_id,
    }),
  });
  const loginOtpVerifyData = await loginOtpVerifyRes.json();
  assert.equal(loginOtpVerifyRes.status, 200);
  assert.equal(loginOtpVerifyData.success, true);
  assert.ok(loginOtpVerifyData.token, 'Should return session token on OTP login');
  assert.equal(loginOtpVerifyData.user.email, testEmail);
});

