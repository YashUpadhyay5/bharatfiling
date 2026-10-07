import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../database/db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET all businesses for current customer
router.get('/', authenticate, (req, res) => {
  try {
    const businesses = db.getBusinesses().filter((b) => b.user_id === req.user.id);
    res.json({
      success: true,
      businesses,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch businesses.', error: err.message });
  }
});

// CREATE a new business under customer
router.post('/', authenticate, (req, res) => {
  try {
    const {
      legal_name,
      trade_name,
      business_type,
      business_pan,
      state,
      address_line_1,
      address_line_2,
      city,
      pincode,
      business_activity,
      bank_account_no,
      bank_ifsc,
      bank_name,
    } = req.body;

    if (!legal_name || !business_type || !state) {
      return res.status(400).json({
        success: false,
        message: 'Legal name, business entity type, and state are required.',
      });
    }

    const newBusiness = {
      id: `biz_${uuidv4().slice(0, 8)}`,
      user_id: req.user.id,
      legal_name,
      trade_name: trade_name || legal_name,
      business_type,
      business_pan: business_pan || '',
      state,
      address_line_1: address_line_1 || '',
      address_line_2: address_line_2 || '',
      city: city || '',
      pincode: pincode || '',
      business_activity: business_activity || '',
      bank_account_no: bank_account_no || '',
      bank_ifsc: bank_ifsc || '',
      bank_name: bank_name || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const businesses = db.getBusinesses();
    businesses.push(newBusiness);
    db.saveBusinesses(businesses);

    res.status(201).json({
      success: true,
      message: 'Business profile created successfully.',
      business: newBusiness,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create business.', error: err.message });
  }
});

export default router;
