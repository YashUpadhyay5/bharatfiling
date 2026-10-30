import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/db.js';
import { optionalAuth } from '../../middleware/auth.js';
import { GUEST_USER_ID } from '../../middleware/ownership.js';

const router = express.Router();

const PACKAGE_FEES = {
  consultation: 499,
  provisional: 9999,
  complete: 24999,
  search: 4999,
  fer_reply: 7999,
};

/**
 * POST /checkout/draft
 * Creates or updates draft order and lead application for patent filing.
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      email = 'yashupadhyay@example.com',
      phone = '+91 7668976193',
      cityPincode = 'Bengaluru, 560001',
      whatsappUpdates = true,
      inventionTitle = 'Novel Compliance Automation Engine',
      category = 'provisional',
      packageId = 'provisional',
      coupon = '',
      includeLabourWelfare = false,
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
    const appNumber = 'PAT' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#PAT-${Math.floor(100000 + Math.random() * 900000)}`;

    const baseFee = PACKAGE_FEES[packageId] || PACKAGE_FEES.provisional;

    let discount = 500;
    const cleanCoupon = String(coupon).trim().toUpperCase();
    if (cleanCoupon === 'SAVE40' || cleanCoupon === 'DIWALI') {
      discount = Math.round(baseFee * 0.4);
    } else if (cleanCoupon === 'ONLINE500' || cleanCoupon === 'HOORAY500' || !coupon) {
      discount = 500;
    }

    const professionalFee = Math.max(0, baseFee - discount);
    const gstOnProfessional = Math.round(professionalFee * 0.18);
    const labourWelfare = includeLabourWelfare ? 399 : 0;
    const gstOnLabour = includeLabourWelfare ? Math.round(399 * 0.18) : 0;
    const taxesAndCharges = gstOnProfessional + labourWelfare + gstOnLabour;
    const totalPayable = professionalFee + taxesAndCharges;

    const draftApplication = {
      id: appId,
      applicationNumber: appNumber,
      userId,
      serviceSlug: 'patent-registration',
      serviceName: 'Patent Registration in India',
      status: 'DRAFT',
      applicantDetails: {
        email,
        phone: cleanPhone,
        cityPincode,
        whatsappUpdates: Boolean(whatsappUpdates),
      },
      inventionDetails: {
        title: inventionTitle,
        category,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const draftOrder = {
      id: orderId,
      orderNumber,
      userId,
      serviceSlug: 'patent-registration',
      applicationId: appId,
      packageId,
      baseFee,
      discount,
      couponApplied: coupon || 'AUTO500',
      professionalFee,
      taxesAndCharges,
      totalAmount: totalPayable,
      status: 'PENDING_PAYMENT',
      paymentMethod: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (db && db.applications) {
      db.applications.push(draftApplication);
    }
    if (db && db.orders) {
      db.orders.push(draftOrder);
    }

    return res.status(200).json({
      success: true,
      message: 'Draft order initialized successfully.',
      appId,
      applicationId: appId,
      applicationNumber: appNumber,
      orderId,
      orderNumber,
      totalAmount: totalPayable,
      order: draftOrder,
      application: draftApplication,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create patent checkout draft',
      error: error.message,
    });
  }
});

export default router;
