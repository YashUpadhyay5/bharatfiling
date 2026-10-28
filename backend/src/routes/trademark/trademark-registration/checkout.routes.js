import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

const PLAN_FEES = {
  starter: 1199,
  standard: 1199,
  express: 1999,
  defense: 4999,
};

const GOVT_FEES = {
  individual: 4500,
  startup: 4500,
  company: 9000,
};

/**
 * POST /checkout/draft
 * Creates or updates draft order and lead application for trademark registration.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      email = 'yashupadhyay@example.com',
      phone = '+91 7668976193',
      whatsappUpdates = true,
      brandName = 'BHARATFILING',
      trademarkType = 'word',
      applicantType = 'individual',
      planId = 'standard',
      selectedClassId = 25,
      coupon = '',
    } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.',
      });
    }

    const cleanPhone = String(phone).replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'A valid 10-digit mobile number is required.',
      });
    }

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'TM' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#TM-${Math.floor(100000 + Math.random() * 900000)}`;

    const baseFee = PLAN_FEES[planId] || PLAN_FEES.standard;
    const govtFee = GOVT_FEES[applicantType] || GOVT_FEES.individual;

    let discount = 0;
    const cleanCoupon = String(coupon).trim().toUpperCase();
    if (cleanCoupon === 'SAVE40' || cleanCoupon === 'DIWALI') {
      discount = Math.round(baseFee * 0.4);
    }

    const professionalFee = Math.max(0, baseFee - discount);
    const gstOnProfessional = Math.round(professionalFee * 0.18);
    const totalAmount = professionalFee + gstOnProfessional + govtFee;

    // Save draft application
    const applicationRecord = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'trademark-registration',
      module_type: 'TRADEMARK',
      status: 'DRAFT',
      payment_completed: false,
      fields_data: {
        email: email.trim(),
        phone: `+91 ${cleanPhone.slice(-10)}`,
        whatsappUpdates,
        brandName: brandName.trim().toUpperCase(),
        trademarkType,
        applicantType,
        planId,
        selectedClassId,
        coupon,
        discount,
        professionalFee,
        gstOnProfessional,
        govtFee,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.push(applicationRecord);
    db.saveApplications(apps);

    // Save order
    const orderRecord = {
      id: orderId,
      order_number: orderNumber,
      user_id: userId,
      application_id: appId,
      service_id: 'trademark-registration',
      amount: totalAmount,
      currency: 'INR',
      status: 'PENDING',
      payment_status: 'PENDING',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const orders = db.getOrders();
    orders.push(orderRecord);
    db.saveOrders(orders);

    res.json({
      success: true,
      message: 'Draft order created successfully.',
      order: orderRecord,
      application: applicationRecord,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create trademark draft order.',
      error: err.message,
    });
  }
});

export default router;
