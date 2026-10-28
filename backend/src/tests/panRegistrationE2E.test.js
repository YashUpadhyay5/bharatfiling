import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import panRoutes from '../routes/registrations/pan-registration/index.js';

describe('PAN Registration Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/pan', panRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/pan`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('1. Database Store Connectivity - Loads and stores collections', () => {
    const apps = db.getApplications();
    const orders = db.getOrders();
    assert.ok(Array.isArray(apps), 'Applications collection should be an array');
    assert.ok(Array.isArray(orders), 'Orders collection should be an array');
  });

  test('2. Supabase Configuration Check - Client initialized properly', () => {
    const configured = isSupabaseConfigured();
    assert.strictEqual(typeof configured, 'boolean');
    assert.ok(supabase, 'Supabase client must exist');
  });

  test('3. Quotation API (POST /quote) - Computes exact fees for all 3 PAN plans', async () => {
    // 3A. Service 1: Starter (e-PAN Digital) — ₹299
    const starterRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'starter',
        includeLabourWelfare: true,
      }),
    });
    assert.strictEqual(starterRes.status, 200);
    const starterData = await starterRes.json();
    assert.strictEqual(starterData.success, true);
    assert.strictEqual(starterData.quote.professionalFee, 299);
    assert.strictEqual(starterData.quote.gstOnFee, 54); // 18% of 299 = 53.82 -> 54
    assert.strictEqual(starterData.quote.labourWelfare, 80);
    assert.strictEqual(starterData.quote.gstOnLabour, 14); // 18% of 80 = 14.4 -> 14
    assert.strictEqual(starterData.quote.totalAmount, 447); // 299 + 54 + 80 + 14 = 447

    // 3B. Service 2: Standard (Physical PVC Card + e-PAN) — ₹499
    const standardRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'standard',
        includeLabourWelfare: true,
      }),
    });
    assert.strictEqual(standardRes.status, 200);
    const standardData = await standardRes.json();
    assert.strictEqual(standardData.success, true);
    assert.strictEqual(standardData.quote.professionalFee, 499);
    assert.strictEqual(standardData.quote.gstOnFee, 90); // 18% of 499 = 89.82 -> 90
    assert.strictEqual(standardData.quote.labourWelfare, 80);
    assert.strictEqual(standardData.quote.gstOnLabour, 14);
    assert.strictEqual(standardData.quote.totalAmount, 683); // 499 + 90 + 80 + 14 = 683

    // 3C. Service 3: Business Entity PAN + TAN Combo — ₹999
    const comboRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'combo',
        includeLabourWelfare: true,
      }),
    });
    assert.strictEqual(comboRes.status, 200);
    const comboData = await comboRes.json();
    assert.strictEqual(comboData.success, true);
    assert.strictEqual(comboData.quote.professionalFee, 999);
    assert.strictEqual(comboData.quote.gstOnFee, 180); // 18% of 999 = 179.82 -> 180
    assert.strictEqual(comboData.quote.labourWelfare, 180);
    assert.strictEqual(comboData.quote.gstOnLabour, 32); // 18% of 180 = 32.4 -> 32
    assert.strictEqual(comboData.quote.totalAmount, 1391); // 999 + 180 + 180 + 32 = 1391
  });

  test('4. Plans API (GET /plans) - Returns public packages', async () => {
    const res = await fetch(`${baseUrl}/plans`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.plans.length, 3);
    assert.strictEqual(data.plans[0].id, 'starter');
    assert.strictEqual(data.plans[1].id, 'standard');
    assert.strictEqual(data.plans[2].id, 'combo');
  });

  test('5. Draft Checkout Creation (POST /checkout/draft) - Persists PAN record and order', async () => {
    const payload = {
      name: 'Yash Upadhyay',
      email: 'ya*****************@com',
      phone: '+91-*******193',
      businessName: 'Individual Assessee',
      entityType: 'individual',
      appType: 'new',
      state: 'Karnataka',
      plan: 'standard',
      includeLabourWelfare: true,
      addonDsc: false,
    };

    const res = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.application?.id, 'Draft application must return an ID');
    assert.ok(data.order?.id, 'Draft order must return an ID');
    assert.strictEqual(data.application.module_type, 'PAN');
    assert.strictEqual(data.application.status, 'DRAFT');
    assert.strictEqual(data.order.status, 'PENDING');
    assert.strictEqual(data.order.amount, 683);

    createdAppId = data.application.id;
    createdOrderId = data.order.id;
  });

  test('6. Database Persistence Verification - Verifies PAN order in DB collection', () => {
    const orders = db.getOrders();
    const app = db.getApplications().find((a) => a.id === createdAppId);
    const order = orders.find((o) => o.id === createdOrderId);

    assert.ok(app, 'Created PAN application must exist in db.getApplications()');
    assert.ok(order, 'Created PAN order must exist in db.getOrders()');
    assert.strictEqual(app.fields_data.name, 'Yash Upadhyay');
    assert.strictEqual(app.fields_data.entityType, 'individual');
    assert.strictEqual(app.fields_data.state, 'Karnataka');
    assert.strictEqual(order.amount, 683);
  });

  test('7. Resume Draft by ID (GET /checkout/draft/:id)', async () => {
    const res = await fetch(`${baseUrl}/checkout/draft/${createdOrderId}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.order.id, createdOrderId);
    assert.strictEqual(data.application.id, createdAppId);
  });

  test('8. Order Payment Execution (POST /checkout/:orderId/pay) - Marks order PAID and assigns Direct Tax CA desk', async () => {
    const payRes = await fetch(`${baseUrl}/checkout/${createdOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiApp: 'phonepe',
        transactionId: 'BFP-PAN-TEST-887766',
        amount: 683,
      }),
    });

    assert.strictEqual(payRes.status, 200);
    const payData = await payRes.json();
    assert.strictEqual(payData.success, true);
    assert.strictEqual(payData.receipt.status, 'PAID');
    assert.strictEqual(payData.receipt.transactionId, 'BFP-PAN-TEST-887766');
    assert.ok(payData.receipt.caAssigned.includes('CS Ananya Deshmukh'));

    // Verify DB states after payment
    const updatedOrder = db.getOrders().find((o) => o.id === createdOrderId);
    const updatedApp = db.getApplications().find((a) => a.id === createdAppId);

    assert.strictEqual(updatedOrder.status, 'PAID');
    assert.strictEqual(updatedOrder.payment_status, 'PAID');
    assert.strictEqual(updatedApp.status, 'UNDER_REVIEW');
    assert.strictEqual(updatedApp.payment_completed, true);
    assert.ok(updatedApp.assigned_officer.includes('CS Ananya Deshmukh'));
  });

  test('9. Tax Invoice Receipt Retrieval (GET /checkout/:orderId/receipt)', async () => {
    const res = await fetch(`${baseUrl}/checkout/${createdOrderId}/receipt`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.receipt.status, 'PAID');
    assert.strictEqual(data.receipt.transactionId, 'BFP-PAN-TEST-887766');
    assert.ok(data.receipt.assignedOfficer.includes('CS Ananya Deshmukh'));
  });
});
