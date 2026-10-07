import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';
import { generateToken, authenticate } from '../middleware/auth.js';
import { validateMobile, validatePAN, validateAadhaar } from '../services/validationEngine.js';

const router = express.Router();

// Register new customer
router.post('/register', async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;

    if (!full_name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = db.getUsers().find((u) => u.email.toLowerCase() === cleanEmail || u.phone === phone);

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email or mobile number already exists. Please log in.',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);
    const userId = `usr_${uuidv4().slice(0, 8)}`;

    const newUser = {
      id: userId,
      email: cleanEmail,
      phone,
      password_hash,
      role: 'CUSTOMER',
      full_name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const users = db.getUsers();
    users.push(newUser);
    db.saveUsers(users);

    // Automatically create Master Customer Profile
    const profileId = `prof_${uuidv4().slice(0, 8)}`;
    const newProfile = {
      id: profileId,
      user_id: userId,
      personal_info: {
        full_name,
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
        mobile_number: phone,
        mobile_verified: true,
        email: cleanEmail,
        email_verified: true,
      },
      address_info: {
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: 'Karnataka',
        pincode: '',
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const profiles = db.getProfiles();
    profiles.push(newProfile);
    db.saveProfiles(profiles);

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to BharatFiling.',
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
    res.status(500).json({ success: false, message: 'Server error during registration.', error: err.message });
  }
});

// Login customer, CA, or Admin
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // email or phone

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Email/Mobile and Password are required.' });
    }

    const cleanId = identifier.trim().toLowerCase();
    const user = db.getUsers().find(
      (u) => u.email.toLowerCase() === cleanId || u.phone === identifier.trim()
    );

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password. Please try again.' });
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
    res.status(500).json({ success: false, message: 'Server error during login.', error: err.message });
  }
});

// Simulated OTP verification for quick phone onboarding
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: 'Mobile number is required.' });
    }

    // Default test OTP is 123456 or any 6-digit number in dev
    if (otp && String(otp).length === 6) {
      return res.json({
        success: true,
        message: 'Mobile OTP verified successfully.',
        phone,
      });
    }

    return res.status(400).json({ success: false, message: 'Invalid OTP. Enter 123456 for test verification.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'OTP verification failed.', error: err.message });
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
