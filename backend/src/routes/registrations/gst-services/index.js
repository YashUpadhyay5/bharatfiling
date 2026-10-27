import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { optionalAuth } from '../../../middleware/auth.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';
import { emitToCADesk } from '../../../services/socket.service.js';
import { createAndDispatchNotification } from '../../../services/notification.service.js';
import { ENV } from '../../../config/env.js';
import { getGstService } from './services.js';
import { computeQuote } from './quote.js';

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAYMENT_METHODS = { UPI: 'UPI', CARD: 'Card', NETBANKING: 'Net Banking' };

const sixDigits = () => Math.floor(100000 + Math.random() * 900000);
const fail = (res, status, message) => res.status(status).json({ success: false, message });

function resolveService(req, res, next) {
  const service = getGstService(req.params.service);
  if (!service) return fail(res, 404, 'Service not found.');
  req.gstService = service;
  next();
}

function readAnswers(fields, body) {
  const answers = {};
  for (const [key, spec] of Object.entries(fields)) {
    const value = body[key];
    if (spec.type === 'multi') {
      answers[key] = Array.isArray(value) ? [...new Set(value.filter((v) => spec.values.includes(v)))] : [];
    } else if (spec.type === 'choice') {
      if (!spec.values.includes(value)) return { error: `Please tell us ${spec.label}.` };
      answers[key] = value;
    } else {
      const textValue = typeof value === 'string' ? value.trim() : '';
      if (!textValue || textValue.length > spec.max) return { error: `Please tell us ${spec.label}.` };
      answers[key] = textValue;
    }
  }
  return { answers };
}

router.post('/:service/checkout/draft', resolveService, optionalAuth, (req, res) => {
  try {
    const service = req.gstService;
    const body = req.body || {};
    const email = String(body.email || '').trim();
    const phone = String(body.phone || '').replace(/\D/g, '');
    if (!EMAIL_RE.test(email)) return fail(res, 400, 'Please enter a valid email address.');
    if (!MOBILE_RE.test(phone)) return fail(res, 400, 'Please enter a valid 10-digit mobile number.');
    const planId = String(body.plan || '');
    const plan = Object.hasOwn(service.plans, planId) ? service.plans[planId] : null;
    if (!plan) return fail(res, 400, 'Please choose a valid plan.');
    const { answers, error } = readAnswers(service.fields, body);
    if (error) return fail(res, 400, error);

    const quote = computeQuote(plan.fee, body.includeLabourWelfare !== false);
    const userId = req.user?.id || GUEST_USER_ID;
    const now = new Date().toISOString();
    const serviceName = `${service.name} (${plan.name})`;

    const application = {
      id: uuidv4(),
      application_number: `${service.moduleType}${sixDigits()}`,
      user_id: userId,
      service_id: service.slug,
      service_name: serviceName,
      module_type: service.moduleType,
      status: 'AWAITING_PAYMENT',
      internal_status: 'PAYMENT_PENDING',
      payment_completed: false,
      amount: quote.totalAmount,
      fields_data: {
        email,
        phone,
        cityPincode: String(body.cityPincode || '').trim().slice(0, 60),
        whatsappOptIn: body.whatsappOptIn !== false,
        plan: planId,
        ...answers,
        quote,
      },
      documents: [],
      created_at: now,
      updated_at: now,
    };

    const order = {
      id: uuidv4(),
      order_number: `#${service.moduleType}-${sixDigits()}`,
      user_id: userId,
      service_id: service.slug,
      service_name: serviceName,
      module_type: service.moduleType,
      application_id: application.id,
      package_tier: planId,
      plan_id: planId,
      status: 'PENDING',
      payment_status: 'PENDING',
      amount: quote.totalAmount,
      currency: 'INR',
      customer_email: email,
      customer_phone: phone,
      created_at: now,
      updated_at: now,
    };

    const apps = db.getApplications();
    apps.push(application);
    db.saveApplications(apps);

    const orders = db.getOrders();
    orders.push(order);
    db.saveOrders(orders);

    return res.status(201).json({
      success: true,
      order,
      applicationNumber: application.application_number,
      quote,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Could not create your order.', error: err.message });
  }
});

router.post('/:service/checkout/:orderId/pay', resolveService, optionalAuth, (req, res) => {
  try {
    if (!ENV.ALLOW_SIMULATED_PAYMENTS) {
      return fail(
        res,
        503,
        'Online payments are being enabled for this service. Please contact support to complete your order.'
      );
    }

    const service = req.gstService;
    const method = String(req.body?.paymentMethod || '').toUpperCase();
    if (!Object.hasOwn(PAYMENT_METHODS, method)) return fail(res, 400, 'Please choose a valid payment method.');
    const upiApp = method === 'UPI' && typeof req.body.upiApp === 'string' ? req.body.upiApp.slice(0, 20) : null;

    const orders = db.getOrders();
    const orderIndex = orders.findIndex((o) => o.id === req.params.orderId && o.service_id === service.slug);
    if (orderIndex === -1) return fail(res, 404, 'Order not found.');
    const order = orders[orderIndex];

    if (order.user_id !== GUEST_USER_ID) {
      const u = req.user;
      if (!u || (u.id !== order.user_id && u.role !== 'ADMIN' && u.role !== 'CA')) {
        return fail(res, 403, 'You are not allowed to pay for this order.');
      }
    }

    const apps = db.getApplications();
    const appIndex = apps.findIndex((a) => a.id === order.application_id);

    // A paid order is never re-processed, so retries cannot duplicate events or notifications.
    if (order.payment_status === 'COMPLETED') {
      return res.json({
        success: true,
        message: 'Order was already paid.',
        transactionId: order.transaction_id,
        order,
        application: appIndex !== -1 ? apps[appIndex] : null,
      });
    }

    const now = new Date().toISOString();
    const transactionId = `BFP-${service.moduleType}-${sixDigits()}`;
    const isCustomer = req.user && req.user.role !== 'ADMIN' && req.user.role !== 'CA';
    const ownerId = order.user_id === GUEST_USER_ID && isCustomer ? req.user.id : order.user_id;
    const methodLabel = PAYMENT_METHODS[method];

    orders[orderIndex] = {
      ...order,
      user_id: ownerId,
      status: 'PAID',
      payment_status: 'COMPLETED',
      payment_method: method,
      upi_app: upiApp,
      transaction_id: transactionId,
      paid_amount: order.amount,
      paid_at: now,
      updated_at: now,
    };
    db.saveOrders(orders);
    const paidOrder = orders[orderIndex];

    let application = null;
    if (appIndex !== -1) {
      apps[appIndex] = {
        ...apps[appIndex],
        user_id: ownerId,
        status: 'SUBMITTED',
        payment_completed: true,
        internal_status: 'CA_REVIEW',
        customer_status: 'CA Processing',
        payment_method: method,
        transaction_id: transactionId,
        paid_at: now,
        updated_at: now,
      };
      application = apps[appIndex];
      db.saveApplications(apps);
    }

    const events = db.getCaseEvents();
    events.push({
      id: `evt_${uuidv4().slice(0, 8)}`,
      application_id: paidOrder.application_id,
      title: `Payment Confirmed via ${methodLabel}`,
      description: `Received ₹${paidOrder.amount} via ${methodLabel} (Ref: ${transactionId}) for ${paidOrder.service_name}. Ready for document collection.`,
      actor_role: 'SYSTEM',
      created_at: now,
    });
    db.saveCaseEvents(events);

    emitToCADesk('ca:new_case', {
      application_id: paidOrder.application_id,
      order_id: paidOrder.id,
      module_type: service.moduleType,
      service_name: paidOrder.service_name,
      customer_name: req.user?.full_name || paidOrder.customer_email,
      customer_phone: paidOrder.customer_phone,
      amount: paidOrder.amount,
      submitted_at: now,
    });

    if (ownerId !== GUEST_USER_ID) {
      createAndDispatchNotification({
        recipient_id: ownerId,
        recipient_role: 'CUSTOMER',
        application_id: paidOrder.application_id,
        order_id: paidOrder.id,
        type: 'PAYMENT_SUCCESS',
        title: 'Payment Confirmed',
        message: `Your ${methodLabel} payment of ₹${paidOrder.amount} for ${paidOrder.service_name} is confirmed. Our GST expert will contact you shortly.`,
        severity: 'success',
        action_url: `/dashboard?app=${paidOrder.application_id}`,
        metadata: { amount: paidOrder.amount, order_id: paidOrder.id, service_name: paidOrder.service_name },
        dedup_key: `PAYMENT_SUCCESS_${paidOrder.id}`,
      });
    }

    createAndDispatchNotification({
      recipient_id: null,
      recipient_role: 'CA',
      application_id: paidOrder.application_id,
      order_id: paidOrder.id,
      type: 'NEW_PAID_CASE',
      title: 'New Paid Filing Case Received',
      message: `A customer paid ₹${paidOrder.amount} via ${methodLabel} for ${paidOrder.service_name}.`,
      severity: 'info',
      action_url: `/ca/dashboard?caseId=${paidOrder.application_id}`,
      metadata: { customer_phone: paidOrder.customer_phone, amount: paidOrder.amount },
      dedup_key: `NEW_PAID_CASE_${paidOrder.id}`,
    });

    return res.json({ success: true, message: 'Payment confirmed.', transactionId, order: paidOrder, application });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Payment processing failed.', error: err.message });
  }
});

export default router;
