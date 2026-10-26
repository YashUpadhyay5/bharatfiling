import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import express from 'express';
import { db } from '../database/db.js';
import { supabase, isSupabaseConfigured } from '../database/supabaseClient.js';
import ptRoutes from '../routes/registrations/professional-tax/index.js';

describe('Professional Tax Module - End-to-End & Database Verification', () => {
  let server;
  let baseUrl;
  let testOrderId;
  let testAppId;

  before(async () => {
    const app = express();
    app.use(express.json());
    app.use('/api/v1/pt', ptRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/pt`;
        resolve();
      });
    });
  });

  after(() => {
    if (server) {
      server.close();
    }
  });

  test('1. Database Store Connectivity - Loads and stores collections', () => {
    const apps = db.getApplications();
    const orders = db.getOrders();
    const users = db.getUsers();

    assert(Array.isArray(apps), 'Applications collection must be an array');
    assert(Array.isArray(orders), 'Orders collection must be an array');
    assert(Array.isArray(users), 'Users collection must be an array');
    assert(users.length > 0, 'Users must contain seeded users');
  });

  test('2. Supabase Configuration Check - Client initialized properly', () => {
    const isConfigured = isSupabaseConfigured();
    assert(typeof isConfigured === 'boolean', 'Supabase status must return boolean');
    assert(supabase, 'Supabase client must be defined');
  });

  test('3. Quotation API (POST /quote) - Computes exact fees & taxes matching screenshot', async () => {
    const res = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'elite',
        operatingState: 'Maharashtra',
        entityType: 'Pvt. Ltd',
        employeeCount: '10 - 20',
        includeLabourWelfare: true,
      }),
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.quote.baseFee, 5083, 'Base fee for Elite must be 5083');
    assert.strictEqual(body.quote.gstOnFee, 916, 'GST on fee must be 916');
    assert.strictEqual(body.quote.labourWelfare, 305, 'Labour welfare must be 305');
    assert.strictEqual(body.quote.gstOnLabour, 55, 'GST on labour must be 55');
    assert.strictEqual(body.quote.taxesAndCharges, 1276, 'Taxes & charges must be 1276');
    assert.strictEqual(body.quote.totalAmount, 6359, 'Total amount must be 6359');
  });

  test('4. Draft Order API (POST /checkout/draft) - Creates and persists application & order to DB', async () => {
    const res = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'director@innovEdge.com',
        phone: '9876543210',
        cityPincode: 'Mumbai - 400001',
        entityType: 'Pvt. Ltd',
        employeeCount: '10 - 20',
        operatingState: 'Maharashtra',
        plan: 'elite',
      }),
    });

    assert.strictEqual(res.status, 201);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert(body.orderId, 'Must return orderId');
    assert(body.applicationId, 'Must return applicationId');
    assert(body.applicationNumber, 'Must return applicationNumber');
    assert.strictEqual(body.amount, 6359);

    testOrderId = body.orderId;
    testAppId = body.applicationId;

    // Verify application directly in database store
    const dbApp = db.getApplications().find((a) => a.id === testAppId);
    assert(dbApp, 'Application must be saved in database');
    assert.strictEqual(dbApp.status, 'AWAITING_PAYMENT');
    assert.strictEqual(dbApp.payment_completed, false);

    // Verify order directly in database store
    const dbOrder = db.getOrders().find((o) => o.id === testOrderId);
    assert(dbOrder, 'Order must be saved in database');
    assert.strictEqual(dbOrder.payment_status, 'PENDING');
  });

  test('5. Order Retrieval API (GET /checkout/:orderId) - Returns saved database record', async () => {
    const res = await fetch(`${baseUrl}/checkout/${testOrderId}`);
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.order.id, testOrderId);
    assert.strictEqual(body.order.service_id, 'professional-tax');
    assert(body.application, 'Must return linked application');
  });

  test('6. Payment Processing API (POST /checkout/:orderId/pay) - Marks order PAID & assigns CA in DB', async () => {
    const res = await fetch(`${baseUrl}/checkout/${testOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiApp: 'PhonePe',
        amount: 6359,
      }),
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert(body.transactionId.startsWith('BFP-PT-'), 'Must generate BFP-PT transaction ID');
    assert.strictEqual(body.status, 'PAYMENT_COMPLETED');
    assert(body.assignedCa, 'Must assign dedicated CA');
    assert.strictEqual(body.assignedCa.name, 'CA Rajesh Sharma');

    // Verify DB state after payment
    const updatedApp = db.getApplications().find((a) => a.id === testAppId);
    assert.strictEqual(updatedApp.status, 'SUBMITTED');
    assert.strictEqual(updatedApp.payment_completed, true);
    assert.strictEqual(updatedApp.assigned_ca.name, 'CA Rajesh Sharma');

    const updatedOrder = db.getOrders().find((o) => o.id === testOrderId);
    assert.strictEqual(updatedOrder.status, 'PAID');
    assert.strictEqual(updatedOrder.payment_status, 'COMPLETED');
  });
});
