import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../database/db.js';
import { optionalAuth } from '../../middleware/auth.js';
import { GUEST_USER_ID } from '../../middleware/ownership.js';

const router = express.Router();

const PACKAGE_FEES = {
  registration: 2999,
  consultation: 499,
  starter: 2499,
  standard: 4999,
  commercial: 8999,
};

/**
 * POST /checkout/draft
 * Creates or updates draft order and lead application for copyright registration (Form XIV).
 */
router.post('/checkout/draft', optionalAuth, (req, res) => {
  try {
    const {
      email = 'yashupadhyay@example.com',
      phone = '+91 7668976193',
      cityPincode = 'Bengaluru, 560001',
      whatsappUpdates = true,
      workTitle = 'Proprietary Software Source Code',
      category = 'software',
      packageId = 'standard',
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
    const appNumber = 'CR' + Math.floor(100000 + Math.random() * 900000);
    const orderId = uuidv4();
    const orderNumber = `#CR-${Math.floor(100000 + Math.random() * 900000)}`;

    const baseFee = PACKAGE_FEES[packageId] || PACKAGE_FEES.standard;

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
    const totalAmount = professionalFee + gstOnProfessional + labourWelfare + gstOnLabour;

    // Save draft application
    const applicationRecord = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'copyright-registration',
      module_type: 'COPYRIGHT_REGISTRATION',
      status: 'DRAFT',
      payment_completed: false,
      fields_data: {
        email: email.trim(),
        phone: `+91 ${cleanPhone.slice(-10)}`,
        cityPincode: cityPincode.trim(),
        whatsappUpdates,
        workTitle: String(workTitle).trim(),
        category,
        packageId,
        coupon,
        discount,
        professionalFee,
        gstOnProfessional,
        labourWelfare,
        gstOnLabour,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.push(applicationRecord);
    db.saveApplications(apps);

    // Save pending order
    const orderRecord = {
      id: orderId,
      order_number: orderNumber,
      user_id: userId,
      application_id: appId,
      service_name: `Copyright Registration - ${String(category).toUpperCase()}`,
      category,
      package_id: packageId,
      amount: totalAmount,
      currency: 'INR',
      status: 'PENDING',
      payment_method: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      breakdown: {
        base_fee: baseFee,
        discount,
        professional_fee: professionalFee,
        gst: gstOnProfessional,
        labour_welfare: labourWelfare,
        gst_on_labour: gstOnLabour,
        total_amount: totalAmount,
      },
    };

    const orders = db.getOrders();
    orders.push(orderRecord);
    db.saveOrders(orders);

    return res.status(200).json({
      success: true,
      message: 'Copyright draft order created successfully.',
      order: orderRecord,
      application: applicationRecord,
      data: {
        application: applicationRecord,
        order: orderRecord,
      },
    });
  } catch (err) {
    console.error('Error creating copyright draft checkout:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to create copyright draft order.',
      error: err.message,
    });
  }
});

/**
 * GET /checkout/:orderId
 * Retrieves saved copyright order with details and payment status.
 */
router.get('/checkout/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    const orders = db.getOrders();
    const order = orders.find((o) => o.id === orderId || o.order_number === orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    const apps = db.getApplications();
    const app = apps.find((a) => a.id === order.application_id);

    return res.status(200).json({
      success: true,
      order,
      application: app || null,
      data: {
        order,
        application: app || null,
      },
    });
  } catch (err) {
    console.error('Error retrieving copyright order:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve order.',
      error: err.message,
    });
  }
});

export default router;
