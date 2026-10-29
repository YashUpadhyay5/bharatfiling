import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

const PACKAGE_FEES = {
  consultation: 499,
  full_service: 24999,
  standard: 1999,
  late_renewal: 3499,
  restoration: 5999,
};

/**
 * POST /checkout/draft
 * Creates or updates draft order and lead application for trademark renewal (Form TM-R).
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      email = 'yashupadhyay@example.com',
      phone = '+91 7668976193',
      cityPincode = 'Bengaluru, 560001',
      whatsappUpdates = true,
      trademarkNumber = '4392018',
      renewalTiming = 'timely',
      packageId = 'standard',
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
    const appNumber = 'TMREN' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#TM-REN-${Math.floor(100000 + Math.random() * 900000)}`;

    const baseFee = PACKAGE_FEES[packageId] || PACKAGE_FEES.standard;

    let discount = packageId === 'consultation' ? 0 : 500;
    const cleanCoupon = String(coupon).trim().toUpperCase();
    if (cleanCoupon === 'SAVE40' || cleanCoupon === 'DIWALI') {
      discount = Math.round(baseFee * 0.4);
    } else if (cleanCoupon === 'ONLINE500' || cleanCoupon === 'HOORAY500') {
      discount = Math.min(500, baseFee);
    } else if (!coupon && packageId !== 'consultation') {
      discount = 500;
    }

    const professionalFee = Math.max(0, baseFee - discount);
    const gstOnProfessional = Math.round(professionalFee * 0.18);
    const totalAmount = professionalFee + gstOnProfessional;

    // Save draft application
    const applicationRecord = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'trademark-renewal',
      module_type: 'TRADEMARK_RENEWAL',
      status: 'DRAFT',
      payment_completed: false,
      fields_data: {
        email: email.trim(),
        phone: `+91 ${cleanPhone.slice(-10)}`,
        cityPincode: cityPincode.trim(),
        whatsappUpdates,
        targetTrademarkNumber: String(trademarkNumber).trim(),
        renewalTiming,
        packageId,
        coupon,
        discount,
        professionalFee,
        gstOnProfessional,
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
      service_id: 'trademark-renewal',
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
      message: 'Failed to create trademark renewal draft order.',
      error: err.message,
    });
  }
});

export default router;
