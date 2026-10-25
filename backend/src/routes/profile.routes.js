import express from 'express';
import { db } from '../database/db.js';
import { CustomerProfileModel } from '../models/CustomerProfile.js';
import { authenticate } from '../middleware/auth.js';
import { validatePAN, validateAadhaar, validatePincode, validateMobile } from '../services/validationEngine.js';

const router = express.Router();

// GET Master Customer Profile
router.get('/', authenticate, async (req, res) => {
  try {
    let profile = null;
    try {
      profile = await CustomerProfileModel.findByUserId(req.user.id);
    } catch (e) {
      // Fallback
    }

    if (!profile) {
      profile = db.getProfiles().find((p) => p.user_id === req.user.id);
    }

    if (!profile) {
      try {
        profile = await CustomerProfileModel.create({
          user_id: req.user.id,
          personal_info: {
            full_name: req.user.full_name || 'Customer',
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
            mobile_number: req.user.phone || '',
            mobile_verified: !!req.user.phone,
            email: req.user.email || '',
            email_verified: !!req.user.email,
          },
          address_info: {
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: 'Karnataka',
            pincode: '',
          },
        });
      } catch (createErr) {
        profile = {
          user_id: req.user.id,
          personal_info: { full_name: req.user.full_name || 'Customer' },
          identity_info: {},
          contact_info: { mobile_number: req.user.phone || '', email: req.user.email || '' },
          address_info: { state: 'Karnataka' },
        };
      }
    }

    res.json({
      success: true,
      profile,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving profile.', error: err.message });
  }
});

// UPDATE Master Customer Profile
router.put('/', authenticate, async (req, res) => {
  try {
    const profiles = db.getProfiles();
    const index = profiles.findIndex((p) => p.user_id === req.user.id);

    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Profile not found.' });
    }

    const currentProfile = profiles[index];
    const body = req.body || {};
    const asObject = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? { ...v } : {});
    const personal_info = asObject(body.personal_info);
    const identity_info = asObject(body.identity_info);
    const contact_info = asObject(body.contact_info);
    const address_info = asObject(body.address_info);

    // Verification flags are set by the server only - a client must not be able to self-certify.
    delete identity_info.pan_verified;
    delete identity_info.aadhaar_verified;
    delete contact_info.mobile_verified;
    delete contact_info.email_verified;
    // Contact e-mail is the verified login identity; changing it here would desync the account.
    delete contact_info.email;

    // Validate identity fields if provided
    let pan_verified = currentProfile.identity_info?.pan_verified || false;
    let aadhaar_verified = currentProfile.identity_info?.aadhaar_verified || false;

    if (identity_info?.pan_number) {
      const panRes = validatePAN(identity_info.pan_number);
      if (panRes.valid) {
        pan_verified = true;
      }
    }

    if (identity_info?.aadhaar_number) {
      const aadhRes = validateAadhaar(identity_info.aadhaar_number);
      if (aadhRes.valid) {
        aadhaar_verified = true;
      }
    }

    const updatedProfile = {
      ...currentProfile,
      personal_info: {
        ...currentProfile.personal_info,
        ...(personal_info || {}),
      },
      identity_info: {
        ...currentProfile.identity_info,
        ...(identity_info || {}),
        pan_verified,
        aadhaar_verified,
      },
      contact_info: {
        ...currentProfile.contact_info,
        ...(contact_info || {}),
      },
      address_info: {
        ...currentProfile.address_info,
        ...(address_info || {}),
      },
      updated_at: new Date().toISOString(),
    };

    profiles[index] = updatedProfile;
    db.saveProfiles(profiles);

    // Sync to Supabase
    try {
      await CustomerProfileModel.updateByUserId(req.user.id, {
        personal_info: updatedProfile.personal_info,
        identity_info: updatedProfile.identity_info,
        contact_info: updatedProfile.contact_info,
        address_info: updatedProfile.address_info,
      });
    } catch (dbErr) {
      console.warn('Notice: Fallback sync during profile update:', dbErr.message);
    }

    res.json({
      success: true,
      message: 'Master Profile updated and verified successfully.',
      profile: updatedProfile,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating profile.', error: err.message });
  }
});

export default router;
