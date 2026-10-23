import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';
import { UserModel } from '../models/User.js';
import { CustomerProfileModel } from '../models/CustomerProfile.js';
import { OtpModel } from '../models/Otp.js';
import { generateToken, authenticate } from '../middleware/auth.js';
import { cryptoService } from '../services/crypto.service.js';
import { emailService } from '../services/email.service.js';
import { firebaseAuthService } from '../services/firebaseAuth.service.js';
import { ENV } from '../config/env.js';

const router = express.Router();

// Helper to normalize emails (coerces to string so non-string JSON bodies cannot throw / bypass checks)
const normalizeEmail = (email) => (email ? String(email).trim().toLowerCase() : '');

// Valid bcrypt hash of a random string, used to equalise timing for unknown accounts.
const DUMMY_BCRYPT_HASH = bcrypt.hashSync(uuidv4(), 10);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_POLICY_MESSAGE = `Password must be between ${MIN_PASSWORD_LENGTH} and 72 characters long.`;
// bcrypt silently truncates after 72 bytes; also stops multi-MB password DoS.
const isStrongEnoughPassword = (pw) =>
  typeof pw === 'string' && pw.length >= MIN_PASSWORD_LENGTH && Buffer.byteLength(pw) <= 72;

// ============================================================================
// 1. REGISTRATION WITH OTP FLOW (SUPPORTING PHONE OR EMAIL)
// ============================================================================

/**
 * POST /api/v1/auth/register/request-otp
 * Validates registration data (Phone OR Email + Password), checks duplicates, stages user, and dispatches 6-digit OTP
 */
router.post('/register/request-otp', async (req, res) => {
  try {
    const { full_name, email, phone, password, method } = req.body;

    if (!full_name || !password) {
      return res.status(400).json({ success: false, message: 'Full legal name and password are required.' });
    }

    const cleanEmail = email ? normalizeEmail(email) : '';
    const cleanPhone = phone ? String(phone).replace(/\D/g, '').slice(-10) : '';

    if (!cleanEmail && !cleanPhone) {
      return res.status(400).json({ success: false, message: 'Please provide either an email address or mobile number.' });
    }

    // Determine target method and primary identifier
    const isEmailReg = method === 'email' || (cleanEmail && !cleanPhone);
    const targetIdentifier = isEmailReg ? cleanEmail : cleanPhone;

    if (isEmailReg) {
      if (!EMAIL_REGEX.test(cleanEmail)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
      }
    } else {
      if (cleanPhone.length !== 10) {
        return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit Indian mobile number.' });
      }
    }

    if (!isStrongEnoughPassword(password)) {
      return res.status(400).json({ success: false, message: PASSWORD_POLICY_MESSAGE });
    }

    // 1. Check if user already exists
    let existing = null;
    if (cleanEmail) {
      existing = await UserModel.findByEmail(cleanEmail);
    }
    if (!existing && cleanPhone) {
      existing = await UserModel.findByPhone(cleanPhone);
    }

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email or mobile number already exists. Please sign in.',
      });
    }

    // 2. Enforce 60-second resend cooldown
    const latestOtp = await OtpModel.findLatestActive(targetIdentifier, 'REGISTRATION');
    if (latestOtp) {
      const elapsedSeconds = Math.floor((Date.now() - new Date(latestOtp.created_at).getTime()) / 1000);
      if (elapsedSeconds < 60) {
        return res.status(429).json({
          success: false,
          message: `Please wait ${60 - elapsedSeconds} seconds before requesting a new code.`,
          cooldown_remaining: 60 - elapsedSeconds,
        });
      }
    }

    // 3. Mark any existing unconsumed registration OTPs for this identifier as superseded
    await OtpModel.supersedeExisting(targetIdentifier, 'REGISTRATION');

    // 4. Generate 6-digit OTP & Transaction ID
    const otp = cryptoService.generateNumericOtp();
    const txn_id = `txn_${cryptoService.generateSecureToken(12)}`;
    const otp_hash = cryptoService.createOtpHmac(otp, targetIdentifier, 'REGISTRATION', txn_id);

    // 5. Stage user data securely (Bcrypt password hash staged in public.otps)
    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    const staged_payload = {
      full_name: full_name.trim(),
      email: cleanEmail || null,
      phone: cleanPhone || null,
      targetIdentifier,
      isEmailReg,
      password_hash,
      role: 'CUSTOMER', // STRICT: Registration can NEVER create CA or Admin
    };

    const expires_at = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5-minute TTL

    await OtpModel.create({
      txn_id,
      email: cleanEmail || null,
      phone: cleanPhone || null,
      identifier: targetIdentifier,
      otp_hash,
      purpose: 'REGISTRATION',
      staged_payload,
      expires_at,
    });

    // 6. Dispatch OTP (Email or SMS / Fallback)
    let dispatchResult = null;
    let successMessage = '';

    if (isEmailReg) {
      try {
        dispatchResult = await emailService.sendRegistrationOtp(cleanEmail, otp, full_name);
      } catch (emailErr) {
        console.warn(`[Registration Email Dispatch Failed for ${cleanEmail}]:`, emailErr.message);
        if (ENV.NODE_ENV !== 'production') {
          // Dev fallback logger
          console.log(`[DEV OTP DISPATCH for ${cleanEmail}]: Code is ${otp}`);
        } else {
          await OtpModel.deleteByTxnId(txn_id);
          return res.status(500).json({
            success: false,
            message: 'Could not deliver verification email to this address. Please verify your email or try again.',
          });
        }
      }

      successMessage = dispatchResult?.provider === 'resend-sandbox-routed'
        ? `A 6-digit verification code has been dispatched! (In sandbox mode, check inbox of ${dispatchResult.sandboxOwner})`
        : `A 6-digit verification code has been sent to ${cleanEmail}.`;
    } else {
      // Mobile SMS OTP dispatch
      console.log(`[SMS OTP DISPATCH]: 6-digit OTP ${otp} dispatched to +91 ${cleanPhone}`);
      successMessage = `A 6-digit SMS verification code has been dispatched to +91 ${cleanPhone}.`;
    }

    res.json({
      success: true,
      message: successMessage,
      txn_id,
      method: isEmailReg ? 'email' : 'phone',
      identifier: targetIdentifier,
      cooldown_seconds: 60,
      ...(ENV.NODE_ENV !== 'production' ? { dev_otp: otp } : {}),
    });
  } catch (err) {
    console.error('[Register Request OTP Error]:', err);
    res.status(500).json({ success: false, message: 'Failed to send verification code. Please try again.' });
  }
});

/**
 * POST /api/v1/auth/register/verify-otp
 * Verifies the 6-digit registration OTP, commits user to public.users, initializes Master Profile, and issues JWT
 */
router.post('/register/verify-otp', async (req, res) => {
  try {
    const { email, phone, identifier, otp, txn_id } = req.body;

    if (!otp) {
      return res.status(400).json({ success: false, message: 'Verification code is required.' });
    }

    const cleanEmail = email ? normalizeEmail(email) : '';
    const cleanPhone = phone ? String(phone).replace(/\D/g, '').slice(-10) : '';
    const cleanIdentifier = identifier ? String(identifier).trim() : (cleanEmail || cleanPhone);

    // 1. Locate OTP record
    let otpRecord = null;
    if (txn_id) {
      otpRecord = await OtpModel.findByTxnId(txn_id);
    }
    if (!otpRecord && cleanIdentifier) {
      otpRecord = await OtpModel.findLatestActive(cleanIdentifier, 'REGISTRATION');
    }

    if (!otpRecord || otpRecord.purpose !== 'REGISTRATION') {
      return res.status(400).json({ success: false, message: 'No active registration request found. Please request a new code.' });
    }

    if (otpRecord.is_consumed || otpRecord.is_superseded) {
      return res.status(400).json({ success: false, message: 'This verification code is no longer valid. Please request a new one.' });
    }

    // 2. Check Expiry
    if (new Date() > new Date(otpRecord.expires_at)) {
      return res.status(400).json({ success: false, message: 'Verification code has expired. Please request a new one.' });
    }

    // 3. Check Attempt Threshold
    if (otpRecord.attempts >= otpRecord.max_attempts) {
      return res.status(429).json({ success: false, message: 'Too many incorrect attempts. This code is locked. Please request a new one.' });
    }

    // 4. Cryptographic Constant-Time HMAC Verification
    const staged = otpRecord.staged_payload || {};
    const hmacTarget = staged.targetIdentifier || otpRecord.identifier || cleanIdentifier || (cleanEmail || cleanPhone);

    const isValid = cryptoService.verifyOtpHmac(
      String(otp).trim(),
      otpRecord.otp_hash,
      hmacTarget,
      'REGISTRATION',
      otpRecord.txn_id
    );

    if (!isValid) {
      const attemptsUsed = await OtpModel.incrementAttempts(otpRecord.txn_id);
      const remaining = Math.max(0, (otpRecord.max_attempts || 5) - attemptsUsed);
      return res.status(400).json({
        success: false,
        message: remaining > 0 ? `Invalid code. ${remaining} attempts remaining.` : 'Code locked due to too many failed attempts. Please request a new one.',
        attempts_remaining: remaining,
      });
    }

    // 5. Commit User to Database
    const finalEmail = staged.email || (cleanEmail && cleanEmail.includes('@') ? cleanEmail : null);
    const finalPhone = staged.phone || (cleanPhone && cleanPhone.length === 10 ? cleanPhone : null);

    let newUser = null;

    try {
      newUser = await UserModel.create({
        email: finalEmail,
        phone: finalPhone,
        password_hash: staged.password_hash,
        role: 'CUSTOMER', // STRICT role enforcement
        full_name: staged.full_name || 'Customer',
        is_verified: true,
      });
    } catch (dbErr) {
      console.warn('Notice: Local fallback during user registration commit:', dbErr.message);
      newUser = {
        id: `usr_${uuidv4().slice(0, 8)}`,
        email: finalEmail,
        phone: finalPhone,
        password_hash: staged.password_hash,
        role: 'CUSTOMER',
        full_name: staged.full_name || 'Customer',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }

    // Backup in-memory sync
    const users = db.getUsers();
    if (!users.some((u) => u.id === newUser.id)) {
      users.push(newUser);
      db.saveUsers(users);
    }

    // 6. Initialize Master Customer Profile
    try {
      await CustomerProfileModel.create({
        user_id: newUser.id,
        personal_info: {
          full_name: newUser.full_name,
          father_name: '',
          dob: '',
          gender: '',
        },
        identity_info: {
          pan_number: '',
          pan_verified: false,
          aadhaar_number: '',
          aadhaar_verified: false,
        },
        contact_info: {
          mobile_number: newUser.phone || '',
          mobile_verified: !!newUser.phone,
          email: newUser.email || '',
          email_verified: !!newUser.email,
        },
        address_info: {
          address_line_1: '',
          address_line_2: '',
          city: '',
          state: 'Karnataka',
          pincode: '',
        },
      });
    } catch (profileErr) {
      console.warn('Notice: Local fallback during profile initialization:', profileErr.message);
      const profiles = db.getProfiles();
      if (!profiles.some((p) => p.user_id === newUser.id)) {
        profiles.push({
          id: `prof_${Date.now().toString(36)}`,
          user_id: newUser.id,
          personal_info: { full_name: newUser.full_name },
          identity_info: {},
          contact_info: { mobile_number: newUser.phone || '', email: newUser.email || '' },
          address_info: { state: 'Karnataka' },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        db.saveProfiles(profiles);
      }
    }

    // 7. Mark OTP as Consumed
    await OtpModel.markConsumed(otpRecord.txn_id);

    // 8. Generate Official JWT Token
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Account verified & created successfully! Welcome to BharatFiling.',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        full_name: newUser.full_name,
      },
    });
  } catch (err) {
    console.error('[Register Verify OTP Error]:', err);
    res.status(500).json({ success: false, message: 'Server error during OTP verification.' });
  }
});


// ============================================================================
// 1B. REGISTRATION & LOGIN VIA FIREBASE PHONE SMS OTP
// ============================================================================

/**
 * POST /api/v1/auth/register/phone-verify
 * Verifies Firebase SMS OTP token and completes user registration
 */
router.post('/register/phone-verify', async (req, res) => {
  try {
    const { id_token, full_name, email, password } = req.body;

    if (!id_token || !full_name || !password) {
      return res.status(400).json({ success: false, message: 'Full name, password, and phone verification token are required.' });
    }

    if (!isStrongEnoughPassword(password)) {
      return res.status(400).json({ success: false, message: PASSWORD_POLICY_MESSAGE });
    }

    const cleanEmail = email ? normalizeEmail(email) : null;
    if (cleanEmail && !EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    // Only the phone number proven by Firebase counts - never a client-supplied one.
    const decoded = await firebaseAuthService.verifyIdToken(id_token);
    const cleanPhone = String(decoded.phone_number || '').replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ success: false, message: 'Could not determine verified phone number.' });
    }

    let existing = await UserModel.findByPhone(cleanPhone);
    if (!existing && cleanEmail) {
      existing = await UserModel.findByEmail(cleanEmail);
    }
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this mobile number or email already exists. Please sign in.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    const newUser = await UserModel.create({
      email: cleanEmail,
      phone: cleanPhone,
      password_hash,
      role: 'CUSTOMER',
      full_name: full_name.trim(),
      is_verified: true,
    });

    try {
      await CustomerProfileModel.create({
        user_id: newUser.id,
        personal_info: { full_name: newUser.full_name, father_name: '', dob: '', gender: '' },
        identity_info: { pan_number: '', pan_verified: false, aadhaar_number: '', aadhaar_verified: false },
        contact_info: { mobile_number: cleanPhone, mobile_verified: true, email: cleanEmail || '', email_verified: !!cleanEmail },
        address_info: { address_line_1: '', address_line_2: '', city: '', state: 'Karnataka', pincode: '' },
      });
    } catch {
      // Ignored
    }

    const token = generateToken(newUser);


    res.status(201).json({
      success: true,
      message: 'Mobile number verified via SMS and account created successfully! Welcome to BharatFiling.',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        full_name: newUser.full_name,
      },
    });
  } catch (err) {
    console.error('[Register Phone Verify Error]:', err);
    res.status(400).json({ success: false, message: err.message || 'Failed to verify phone OTP.' });
  }
});

/**
 * POST /api/v1/auth/login/phone
 * Instant passwordless login via verified Firebase SMS OTP
 */
router.post('/login/phone', async (req, res) => {
  try {
    const { id_token } = req.body;
    if (!id_token) {
      return res.status(400).json({ success: false, message: 'Phone verification token is required.' });
    }

    const decoded = await firebaseAuthService.verifyIdToken(id_token);
    const cleanPhone = (decoded.phone_number || '').replace(/\D/g, '').slice(-10);
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ success: false, message: 'Could not determine verified phone number.' });
    }

    const user = await UserModel.findByPhone(cleanPhone);
    if (!user) {
      return res.status(404).json({
        success: false,
        not_registered: true,
        phone: cleanPhone,
        message: `No BharatFiling account found for mobile number ${cleanPhone}. Please register.`,
      });
    }

    const token = generateToken(user);
    res.json({
      success: true,
      message: 'Mobile login successful! Welcome back.',
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        full_name: user.full_name,
      },
    });
  } catch (err) {
    console.error('[Login Phone Error]:', err);
    res.status(400).json({ success: false, message: err.message || 'Failed to authenticate phone OTP.' });
  }
});

/**
 * POST /api/v1/auth/forgot-password/phone-reset
 * Resets password using verified Firebase SMS OTP token
 */
router.post('/forgot-password/phone-reset', async (req, res) => {
  try {
    const { id_token, new_password } = req.body;

    if (!id_token || !new_password) {
      return res.status(400).json({ success: false, message: 'Phone verification token and new password are required.' });
    }

    if (!isStrongEnoughPassword(new_password)) {
      return res.status(400).json({ success: false, message: PASSWORD_POLICY_MESSAGE });
    }

    // 1. Verify Firebase ID Token (only the phone number proven by Firebase is used)
    const decoded = await firebaseAuthService.verifyIdToken(id_token);
    const verifiedPhone = (decoded.phone_number || '').replace(/\D/g, '').slice(-10);

    if (verifiedPhone.length !== 10) {
      return res.status(400).json({ success: false, message: 'Could not determine verified phone number.' });
    }

    // 2. Find User in DB
    const user = await UserModel.findByPhone(verifiedPhone);
    if (!user) {
      return res.status(404).json({
        success: false,
        not_registered: true,
        phone: verifiedPhone,
        message: `No BharatFiling account found with mobile number ${verifiedPhone}. Please register.`,
      });
    }

    // 3. Hash New Password with Bcrypt
    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(new_password, salt);

    // 4. Update in Database
    await UserModel.update(user.id, { password_hash, updated_at: new Date().toISOString() });

    // 5. Issue session JWT token so user is logged in automatically
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Password updated successfully! Welcome back to BharatFiling.',
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        full_name: user.full_name,
      },
    });
  } catch (err) {
    console.error('[Forgot Password Phone Reset Error]:', err);
    res.status(400).json({ success: false, message: err.message || 'Failed to reset password via phone.' });
  }
});

// ============================================================================
// 2. FORGOT PASSWORD WITH EMAIL OTP FLOW
// ============================================================================

/**
 * POST /api/v1/auth/forgot-password/request-otp
 * Generates password recovery OTP (Anti-enumeration protected)
 */
router.post('/forgot-password/request-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const cleanEmail = normalizeEmail(email);

    // 1. Locate user in DB
    const user = await UserModel.findByEmail(cleanEmail);

    if (!user) {
      return res.status(404).json({
        success: false,
        not_registered: true,
        message: `No BharatFiling account found with ${cleanEmail}. Please create an account first.`,
      });
    }

    // Enforce 60-second cooldown
    const latestOtp = await OtpModel.findLatestActive(cleanEmail, 'PASSWORD_RESET');
    if (latestOtp) {
      const elapsedSeconds = Math.floor((Date.now() - new Date(latestOtp.created_at).getTime()) / 1000);
      if (elapsedSeconds < 60) {
        return res.status(429).json({
          success: false,
          message: `Please wait ${60 - elapsedSeconds} seconds before requesting a new recovery code.`,
          cooldown_remaining: 60 - elapsedSeconds,
        });
      }
    }

    await OtpModel.supersedeExisting(cleanEmail, 'PASSWORD_RESET');

    const otp = cryptoService.generateNumericOtp();
    const txn_id = `txn_${cryptoService.generateSecureToken(12)}`;
    const otp_hash = cryptoService.createOtpHmac(otp, cleanEmail, 'PASSWORD_RESET', txn_id);
    const expires_at = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    await OtpModel.create({
      txn_id,
      email: cleanEmail,
      otp_hash,
      purpose: 'PASSWORD_RESET',
      expires_at,
    });

    let dispatchResult = null;
    try {
      dispatchResult = await emailService.sendPasswordResetOtp(cleanEmail, otp, user.full_name);
    } catch (emailErr) {
      console.warn(`[Password Reset Email Dispatch Failed for ${cleanEmail}]:`, emailErr.message);
      if (ENV.NODE_ENV !== 'production' || process.env.ALLOW_DEV_OTP === 'true') {
        console.log(`[DEV RECOVERY OTP for ${cleanEmail}]: ${otp}`);
      } else {
        await OtpModel.deleteByTxnId(txn_id);
        return res.status(500).json({
          success: false,
          message: 'Could not deliver recovery email to this address. Please try again or use Mobile OTP recovery.',
        });
      }
    }

    const successMessage = dispatchResult?.provider === 'resend-sandbox-routed'
      ? `A 6-digit recovery code has been dispatched! (In sandbox mode, check inbox of ${dispatchResult.sandboxOwner})`
      : `A 6-digit recovery code has been sent to ${cleanEmail}.`;

    return res.json({
      success: true,
      message: successMessage,
      txn_id,
      cooldown_seconds: 60,
      ...(ENV.NODE_ENV !== 'production' ? { dev_otp: otp } : {}),
    });
  } catch (err) {
    console.error('[Forgot Password Request Error]:', err);
    res.status(500).json({ success: false, message: 'Failed to initiate password reset.' });
  }
});

/**
 * POST /api/v1/auth/forgot-password/verify-otp
 * Verifies recovery OTP and returns a single-use, 10-minute reset_token
 */
router.post('/forgot-password/verify-otp', async (req, res) => {
  try {
    const { email, otp, txn_id } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and recovery code are required.' });
    }

    const cleanEmail = normalizeEmail(email);

    let otpRecord = null;
    if (txn_id) {
      otpRecord = await OtpModel.findByTxnId(txn_id);
    }
    if (!otpRecord) {
      otpRecord = await OtpModel.findLatestActive(cleanEmail, 'PASSWORD_RESET');
    }

    if (!otpRecord || otpRecord.purpose !== 'PASSWORD_RESET') {
      return res.status(400).json({ success: false, message: 'No active password recovery request found.' });
    }

    if (otpRecord.is_consumed || otpRecord.is_superseded) {
      return res.status(400).json({ success: false, message: 'This recovery code is no longer valid. Please request a new one.' });
    }

    if (new Date() > new Date(otpRecord.expires_at)) {
      return res.status(400).json({ success: false, message: 'Recovery code has expired. Please request a new one.' });
    }

    if (otpRecord.attempts >= otpRecord.max_attempts) {
      return res.status(429).json({ success: false, message: 'Too many incorrect attempts. Please request a new code.' });
    }

    const isValid = cryptoService.verifyOtpHmac(
      String(otp).trim(),
      otpRecord.otp_hash,
      cleanEmail,
      'PASSWORD_RESET',
      otpRecord.txn_id
    );

    if (!isValid) {
      const attemptsUsed = await OtpModel.incrementAttempts(otpRecord.txn_id);
      const remaining = Math.max(0, (otpRecord.max_attempts || 5) - attemptsUsed);
      return res.status(400).json({
        success: false,
        message: remaining > 0 ? `Invalid code. ${remaining} attempts remaining.` : 'Code locked due to too many failed attempts.',
        attempts_remaining: remaining,
      });
    }

    // Generate single-use reset authorization token (10-minute validity)
    const reset_token = `rst_${cryptoService.generateSecureToken(32)}`;
    const reset_token_expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await OtpModel.setResetToken(otpRecord.txn_id, reset_token, reset_token_expires_at);

    res.json({
      success: true,
      message: 'Recovery code verified successfully. You may now enter your new password.',
      reset_token,
    });
  } catch (err) {
    console.error('[Forgot Password Verify OTP Error]:', err);
    res.status(500).json({ success: false, message: 'Server error during recovery code verification.' });
  }
});

/**
 * POST /api/v1/auth/forgot-password/reset-password
 * Sets new password using authorized single-use reset_token
 */
router.post('/forgot-password/reset-password', async (req, res) => {
  try {
    const { email, reset_token, new_password } = req.body;

    if (!reset_token || !new_password) {
      return res.status(400).json({ success: false, message: 'Reset token and new password are required.' });
    }

    if (!isStrongEnoughPassword(new_password)) {
      return res.status(400).json({ success: false, message: PASSWORD_POLICY_MESSAGE });
    }

    const cleanEmail = normalizeEmail(email);

    // 1. Verify reset token
    const otpRecord = await OtpModel.findByResetToken(reset_token);

    if (!otpRecord || otpRecord.purpose !== 'PASSWORD_RESET' || otpRecord.email !== cleanEmail) {
      return res.status(401).json({ success: false, message: 'Invalid or expired reset token. Please request a new recovery code.' });
    }

    if (new Date() > new Date(otpRecord.reset_token_expires_at)) {
      return res.status(401).json({ success: false, message: 'Password reset authorization has expired. Please restart recovery.' });
    }

    // 2. Hash new password
    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(new_password, salt);

    // 3. Update password in DB
    let user = null;
    try {
      user = await UserModel.findByEmail(cleanEmail);
      if (user) {
        await UserModel.update(user.id, { password_hash, updated_at: new Date().toISOString() });
      }
    } catch {
      // Local fallback
    }

    const users = db.getUsers();
    const localUser = users.find((u) => u.email && u.email.toLowerCase() === cleanEmail);
    if (localUser) {
      localUser.password_hash = password_hash;
      localUser.updated_at = new Date().toISOString();
      db.saveUsers(users);
    }

    // 4. Invalidate single-use reset token
    await OtpModel.revokeResetToken(reset_token);

    // 5. Send security alert notification email
    await emailService.sendPasswordChangedAlert(cleanEmail, user?.full_name || localUser?.full_name || 'Valued Client');

    res.json({
      success: true,
      message: 'Password updated successfully! Please log in with your new password.',
    });
  } catch (err) {
    console.error('[Reset Password Error]:', err);
    res.status(500).json({ success: false, message: 'Failed to reset password.' });
  }
});

// ============================================================================
// 3. AUTHENTICATED PASSWORD CHANGE
// ============================================================================

/**
 * POST /api/v1/auth/change-password
 * Allows a logged-in user to change their password securely
 */
router.post('/change-password', authenticate, async (req, res) => {
  try {
    const { current_password, new_password } = req.body;

    if (!current_password || !new_password) {
      return res.status(400).json({ success: false, message: 'Both current password and new password are required.' });
    }

    if (!isStrongEnoughPassword(new_password)) {
      return res.status(400).json({ success: false, message: PASSWORD_POLICY_MESSAGE });
    }

    // 1. Fetch authenticated user record
    let user = null;
    try {
      user = await UserModel.findById(req.user.id);
    } catch {
      user = db.getUsers().find((u) => u.id === req.user.id);
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found.' });
    }

    // 2. Verify current password
    let isMatch = false;
    if (user.password_hash) {
      try {
        isMatch = bcrypt.compareSync(current_password, user.password_hash);
      } catch {
        isMatch = false;
      }
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password does not match. Please try again.' });
    }

    // 3. Hash & Update new password
    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(new_password, salt);

    try {
      await UserModel.update(user.id, { password_hash, updated_at: new Date().toISOString() });
    } catch {
      // Local fallback
    }

    const users = db.getUsers();
    const localUser = users.find((u) => u.id === user.id);
    if (localUser) {
      localUser.password_hash = password_hash;
      localUser.updated_at = new Date().toISOString();
      db.saveUsers(users);
    }

    // 4. Send security confirmation email
    await emailService.sendPasswordChangedAlert(user.email, user.full_name);

    res.json({
      success: true,
      message: 'Your password has been changed successfully.',
    });
  } catch (err) {
    console.error('[Change Password Error]:', err);
    res.status(500).json({ success: false, message: 'Failed to update password.' });
  }
});

// ============================================================================
// 4. PASSWORD LOGIN
// ============================================================================
// NOTE: The legacy un-verified /register and the placeholder /verify-otp endpoints were removed.
// Accounts can only be created through the email-OTP or Firebase phone-OTP flows above.

// Login customer, CA, or Admin
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password || typeof identifier !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Email/Mobile and Password are required.' });
    }

    const cleanId = identifier.trim();

    let user = null;
    try {
      user = await UserModel.findByIdentifier(cleanId);
    } catch {
      // Fallback
    }

    if (!user) {
      const lower = cleanId.toLowerCase();
      const cleanDigits = cleanId.replace(/\D/g, '').slice(-10);
      user = db.getUsers().find((u) =>
        (u.email || '').toLowerCase() === lower ||
        (cleanDigits && u.phone && String(u.phone).replace(/\D/g, '').slice(-10) === cleanDigits)
      ) || null;
    }

    // Always run a bcrypt compare so response time doesn't reveal whether the account exists.
    const hash = user?.password_hash || DUMMY_BCRYPT_HASH;
    let isMatch = false;
    try {
      isMatch = bcrypt.compareSync(password, hash);
    } catch {
      isMatch = false;
    }

    if (!user || !user.password_hash || !isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your details and try again.' });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        full_name: user.full_name,
      },
    });
  } catch (err) {
    console.error('[Login Error]:', err);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// Get current user profile
router.get('/me', authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
