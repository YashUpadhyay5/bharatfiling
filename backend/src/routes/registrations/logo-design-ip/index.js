import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';

const router = express.Router();

/**
 * POST /lead
 * Captures Logo Design & IP Protection inquiry from landing page.
 */
router.post('/lead', optionalAuth, (req, res) => {
  try {
    const {
      email,
      phone,
      cityPincode = '',
      whatsappUpdates = true,
      name = 'Founder / Brand Custodian',
      brandName = '',
    } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email and mobile number are required.',
      });
    }

    const userId = req.user ? req.user.id : GUEST_USER_ID;
    const appId = uuidv4();
    const appNumber = 'LGD' + Math.floor(100000 + Math.random() * 900000);

    const newApplication = {
      id: appId,
      application_number: appNumber,
      user_id: userId,
      service_id: 'logo-design-ip',
      service_name: 'Logo Design & IP Protection',
      module_type: 'LOGO_DESIGN_IP',
      status: 'LEAD_CAPTURED',
      payment_completed: false,
      assigned_officer: 'Senior Creative Brand Director & Trademark Attorney Adv. Meera Nambiar',
      fields_data: {
        applicant_name: name,
        email,
        phone,
        city_pincode: cityPincode,
        brand_name: brandName,
        whatsapp_opt_in: whatsappUpdates,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const apps = db.getApplications();
    apps.push(newApplication);
    db.saveApplications(apps);

    res.status(201).json({
      success: true,
      message: 'Logo design & IP protection inquiry received. Our brand attorney will connect with you shortly.',
      leadId: appId,
      applicationNumber: appNumber,
      brandName,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to record logo design inquiry.',
      error: err.message,
    });
  }
});

/**
 * POST /quote
 * Computes fee for Logo Design & IP Protection tiers.
 */
router.post('/quote', (req, res) => {
  try {
    const { plan = 'starter', addonIds = [] } = req.body;
    const norm = String(plan).toLowerCase();

    let fee = 2999;
    let original = 5999;
    let name = 'Starter Logo & TM Search';

    if (norm === 'growth') {
      fee = 5999;
      original = 11999;
      name = 'Growth Kit & TM-A Filing';
    } else if (norm === 'enterprise') {
      fee = 9999;
      original = 19999;
      name = 'Enterprise 360° Brand Protection';
    }

    const addonPriceMap = {
      express_delivery: 999,
      animated_logo: 1499,
      copyright_roc: 2499,
      objection_shield: 1999,
    };

    let addonsTotal = 0;
    if (Array.isArray(addonIds)) {
      for (const aid of addonIds) {
        if (addonPriceMap[aid]) {
          addonsTotal += addonPriceMap[aid];
        }
      }
    }

    const subTotal = fee + addonsTotal;
    const gst = Math.round(subTotal * 0.18);
    const totalAmount = subTotal + gst;

    res.json({
      success: true,
      plan: norm,
      planName: name,
      baseFee: fee,
      originalFee: original,
      addonsTotal,
      gst,
      totalAmount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to compute logo design quote.',
      error: err.message,
    });
  }
});

/**
 * POST /brief
 * Stores brand brief specifications and style preferences.
 */
router.post('/brief', optionalAuth, (req, res) => {
  try {
    const {
      orderId,
      applicantEmail,
      brandName,
      tagline,
      industry,
      selectedStyle,
      selectedPalette,
      selectedClasses,
      inspirationNotes,
      isColorProtected,
    } = req.body;

    const apps = db.getApplications();
    let app = null;
    if (orderId) {
      app = apps.find((a) => a.id === orderId || a.application_number === orderId);
    }
    if (!app && applicantEmail) {
      app = apps.find((a) => a.fields_data?.email === applicantEmail);
    }

    if (app) {
      app.fields_data = {
        ...app.fields_data,
        brand_name: brandName || app.fields_data.brand_name,
        tagline,
        industry,
        selected_style: selectedStyle,
        selected_palette: selectedPalette,
        selected_classes: selectedClasses,
        inspiration_notes: inspirationNotes,
        is_color_protected: isColorProtected,
      };
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);
    }

    res.json({
      success: true,
      message: 'Brand brief and design specifications saved successfully.',
      brandName,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to save brand brief.',
      error: err.message,
    });
  }
});

/**
 * POST /payment
 * Settles payment for Logo Design & IP Protection package.
 */
router.post('/payment', optionalAuth, (req, res) => {
  try {
    const {
      orderId,
      method = 'UPI',
      subMethod = 'PhonePe',
      amount = 2525,
      includeLabourWelfare = true,
      applicantEmail = 'founder@brand.com',
      applicantPhone = '9876543210',
      brandName = 'My Brand',
      selectedPlanId = 'starter',
      selectedAddonIds = [],
    } = req.body;

    const generatedTxnId = `BFP-LGD-${Date.now().toString().slice(-8)}`;
    const resolvedOrderId = orderId || `#LGD-${Math.floor(100000 + Math.random() * 900000)}`;

    const orders = db.getOrders();
    let order = orders.find((o) => o.id === orderId || o.order_number === orderId);

    if (order) {
      order.status = 'PAID';
      order.payment_status = 'PAID';
      order.payment_method = method;
      order.transaction_id = generatedTxnId;
      order.updated_at = new Date().toISOString();
    } else {
      order = {
        id: uuidv4(),
        order_number: resolvedOrderId,
        user_id: req.user ? req.user.id : GUEST_USER_ID,
        service_id: 'logo-design-ip',
        service_name: 'Logo Design & IP Protection',
        amount,
        currency: 'INR',
        status: 'PAID',
        payment_status: 'PAID',
        payment_method: method,
        transaction_id: generatedTxnId,
        metadata: {
          brand_name: brandName,
          plan: selectedPlanId,
          addons: selectedAddonIds,
          include_labour_welfare: includeLabourWelfare,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      orders.push(order);
    }
    db.saveOrders(orders);

    const apps = db.getApplications();
    let app = null;
    if (orderId) {
      app = apps.find((a) => a.id === orderId || a.application_number === orderId);
    }
    if (!app && order?.application_id) {
      app = apps.find((a) => a.id === order.application_id);
    }
    if (!app && applicantEmail) {
      app = apps.find((a) => a.fields_data?.email === applicantEmail);
    }

    if (app) {
      app.status = 'CONFIRMED';
      app.payment_completed = true;
      app.assigned_officer = 'Senior Creative Brand Director & Trademark Attorney Adv. Meera Nambiar';
      app.updated_at = new Date().toISOString();
      db.saveApplications(apps);
    }

    // Save transaction
    if (typeof db.getTransactions === 'function' && typeof db.saveTransactions === 'function') {
      const txns = db.getTransactions();
      txns.push({
        id: uuidv4(),
        order_id: order.id,
        transaction_id: generatedTxnId,
        amount,
        currency: 'INR',
        status: 'SUCCESS',
        payment_method: method,
        gateway: 'BHARATFILING_MOCK_GATEWAY',
        created_at: new Date().toISOString(),
      });
      db.saveTransactions(txns);
    }

    res.json({
      success: true,
      message: 'Payment verified and Logo Design & IP Protection package activated.',
      transactionId: generatedTxnId,
      orderNumber: resolvedOrderId,
      amount,
      assignedSpecialist: 'Senior Creative Brand Director & Trademark Attorney Adv. Meera Nambiar',
      callNotice: 'Our creative brand director and trademark attorney will call you shortly from 80448 *****.',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to settle logo design payment.',
      error: err.message,
    });
  }
});

export default router;
