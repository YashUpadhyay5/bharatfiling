import { v4 as uuidv4 } from 'uuid';
import { db } from '../../../database/db.js';
import { GUEST_USER_ID } from '../../../middleware/ownership.js';
import { emitToCADesk } from '../../../services/socket.service.js';
import { createAndDispatchNotification } from '../../../services/notification.service.js';
import { ENV } from '../../../config/env.js';

export const PAYMENT_METHOD_LABELS = { UPI: 'UPI', CARD: 'Card', NETBANKING: 'Net Banking', EMI: 'EMI' };

const sixDigits = () => Math.floor(100000 + Math.random() * 900000);
const fail = (res, status, message) => res.status(status).json({ success: false, message });

/**
 * Express handler for POST .../checkout/:orderId/pay of a simulated-payment flow.
 *
 *  moduleType     - ITR, TDS ...: prefix of the transaction id and the CA desk case type
 *  expertLabel    - "ITR", "TDS": names the expert desk in the customer notification
 *  paymentMethods - the methods this flow shows, e.g. ['UPI', 'CARD', 'NETBANKING']
 *  serviceIdOf    - (req) => the service an order must belong to, so a flow only pays its own orders
 *  validateOrder  - optional (order, application) => a message when the order can no longer be paid
 *                   (for example its booked time has passed), answered with 409
 */
export function createPayHandler({ moduleType, expertLabel, paymentMethods, serviceIdOf, validateOrder }) {
  return (req, res) => {
    try {
      if (!ENV.ALLOW_SIMULATED_PAYMENTS) {
        return fail(
          res,
          503,
          'Online payments are being enabled for this service. Please contact support to complete your order.'
        );
      }

      const method = String(req.body?.paymentMethod || '').toUpperCase();
      if (!paymentMethods.includes(method)) return fail(res, 400, 'Please choose a valid payment method.');
      const upiApp = method === 'UPI' && typeof req.body.upiApp === 'string' ? req.body.upiApp.slice(0, 20) : null;

      const orders = db.getOrders();
      const orderIndex = orders.findIndex((o) => o.id === req.params.orderId && o.service_id === serviceIdOf(req));
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

      const problem = validateOrder?.(order, appIndex !== -1 ? apps[appIndex] : null);
      if (problem) return fail(res, 409, problem);

      const now = new Date().toISOString();
      const transactionId = `BFP-${moduleType}-${sixDigits()}`;
      const isCustomer = req.user && req.user.role !== 'ADMIN' && req.user.role !== 'CA';
      const ownerId = order.user_id === GUEST_USER_ID && isCustomer ? req.user.id : order.user_id;
      const methodLabel = PAYMENT_METHOD_LABELS[method];

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
        module_type: moduleType,
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
          message: `Your ${methodLabel} payment of ₹${paidOrder.amount} for ${paidOrder.service_name} is confirmed. Our ${expertLabel} expert will contact you shortly.`,
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
  };
}

export const LANGUAGES = ['english', 'hindi', 'tamil'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[6-9]\d{9}$/;

/** Validates the lead fields every landing page collects. Returns { lead } or { error }. */
export function readLead(body) {
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').replace(/\D/g, '');
  const cityPincode = String(body.cityPincode || '').trim().slice(0, 60);
  if (!EMAIL_RE.test(email)) return { error: 'Please enter a valid email address.' };
  if (!MOBILE_RE.test(phone)) return { error: 'Please enter a valid 10-digit mobile number.' };
  if (!cityPincode) return { error: 'Please enter your city or pincode.' };
  return { lead: { email, phone, cityPincode, whatsappOptIn: body.whatsappOptIn !== false } };
}

/**
 * Creates and stores the application and the pending order of a flow.
 * The caller has already validated everything and computed the quote; the amount is the server's.
 */
export function saveDraftOrder({ slug, moduleType, serviceName, userId, quote, lead, answers }) {
  const now = new Date().toISOString();

  const application = {
    id: uuidv4(),
    application_number: `${moduleType}${sixDigits()}`,
    user_id: userId,
    service_id: slug,
    service_name: serviceName,
    module_type: moduleType,
    status: 'AWAITING_PAYMENT',
    internal_status: 'PAYMENT_PENDING',
    payment_completed: false,
    amount: quote.totalAmount,
    fields_data: { ...lead, ...answers, quote },
    documents: [],
    created_at: now,
    updated_at: now,
  };

  const order = {
    id: uuidv4(),
    order_number: `#${moduleType}-${sixDigits()}`,
    user_id: userId,
    service_id: slug,
    service_name: serviceName,
    module_type: moduleType,
    application_id: application.id,
    status: 'PENDING',
    payment_status: 'PENDING',
    amount: quote.totalAmount,
    currency: 'INR',
    customer_email: lead.email,
    customer_phone: lead.phone,
    created_at: now,
    updated_at: now,
  };

  const apps = db.getApplications();
  apps.push(application);
  db.saveApplications(apps);

  const orders = db.getOrders();
  orders.push(order);
  db.saveOrders(orders);

  return { application, order };
}

/** The language the customer wants the expert call in. Landing pages without the field default to English. */
export function readLanguage(body) {
  const language = body.language === undefined ? LANGUAGES[0] : body.language;
  return LANGUAGES.includes(language) ? { language } : { error: 'Please choose a valid language.' };
}
