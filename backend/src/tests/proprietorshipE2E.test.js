import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import proprietorshipRoutes from '../routes/registrations/proprietorship/index.js';

describe('Sole Proprietorship Registration Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/proprietorship', proprietorshipRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/proprietorship`;
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

  test('3. Quotation API (POST /quote) - Computes exact fees for all 3 Proprietorship plans', async () => {
    // 3A. Plan 1: Starter (MSME Udyam) — ₹999
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
    assert.strictEqual(starterData.quote.professionalFee, 999);
    assert.strictEqual(starterData.quote.gstOnFee, 180); // 18% of 999 = 179.82 -> 180
    assert.strictEqual(starterData.quote.labourWelfare, 50);
    assert.strictEqual(starterData.quote.gstOnLabour, 9);
    assert.strictEqual(starterData.quote.totalAmount, 1238); // 999 + 180 + 50 + 9 = 1238

    // 3B. Plan 2: Standard (Proprietorship + GST) — ₹2499
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
    assert.strictEqual(standardData.quote.professionalFee, 2499);
    assert.strictEqual(standardData.quote.gstOnFee, 450); // 18% of 2499 = 449.82 -> 450
    assert.strictEqual(standardData.quote.totalAmount, 3008); // 2499 + 450 + 50 + 9 = 3008

    // 3C. Plan 3: Premium (Launchpad) — ₹4999
    const premiumRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'premium',
        includeLabourWelfare: false,
      }),
    });
    assert.strictEqual(premiumRes.status, 200);
    const premiumData = await premiumRes.json();
    assert.strictEqual(premiumData.success, true);
    assert.strictEqual(premiumData.quote.professionalFee, 4999);
    assert.strictEqual(premiumData.quote.gstOnFee, 900); // 18% of 4999 = 899.82 -> 900
    assert.strictEqual(premiumData.quote.labourWelfare, 0);
    assert.strictEqual(premiumData.quote.totalAmount, 5899); // 4999 + 900 = 5899
  });

  test('4. Checkout Draft Creation (POST /checkout/draft) - Persists application and order', async () => {
    const draftPayload = {
      name: 'Yash Upadhyay',
      email: 'yash.soleprop@example.com',
      phone: '+91 7668976193',
      tradeName: 'Apex Retail Enterprises',
      industryType: 'Retail / General Store / Supermarket',
      state: 'Maharashtra',
      plan: 'starter',
      includeLabourWelfare: true,
    };

    const res = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draftPayload),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.applicationId, 'Must return applicationId');
    assert.ok(data.orderId, 'Must return orderId');
    assert.ok(data.orderNumber.startsWith('#PROP-'), 'Order number should prefix with #PROP-');

    createdAppId = data.applicationId;
    createdOrderId = data.orderId;

    // Verify record in database
    const appInDb = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(appInDb, 'Application must be stored in DB');
    assert.strictEqual(appInDb.module_type, 'PROPRIETORSHIP');
    assert.strictEqual(appInDb.fields_data.trade_name, 'Apex Retail Enterprises');
    assert.strictEqual(appInDb.status, 'DRAFT');

    const orderInDb = db.getOrders().find((o) => o.id === createdOrderId);
    assert.ok(orderInDb, 'Order must be stored in DB');
    assert.strictEqual(orderInDb.module_type, 'PROPRIETORSHIP');
    assert.strictEqual(orderInDb.amount, 1238);
    assert.strictEqual(orderInDb.status, 'PENDING');
  });

  test('5. Retrieve Draft (GET /checkout/draft/:id)', async () => {
    const res = await fetch(`${baseUrl}/checkout/draft/${createdAppId}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.application.id, createdAppId);
    assert.strictEqual(data.order.id, createdOrderId);
  });

  test('6. Payment Processing & Verification (POST /checkout/:orderId/pay)', async () => {
    const payRes = await fetch(`${baseUrl}/checkout/${createdOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        amount: 1238,
      }),
    });

    assert.strictEqual(payRes.status, 200);
    const payData = await payRes.json();
    assert.strictEqual(payData.success, true);
    assert.strictEqual(payData.status, 'PAID');
    assert.ok(payData.transactionId.startsWith('BFP-PROP-'));

    // Check DB status update
    const updatedOrder = db.getOrders().find((o) => o.id === createdOrderId);
    assert.strictEqual(updatedOrder.status, 'PAID');
    assert.strictEqual(updatedOrder.payment_status, 'PAID');

    const updatedApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.strictEqual(updatedApp.status, 'UNDER_REVIEW');
    assert.strictEqual(updatedApp.payment_completed, true);
    assert.ok(updatedApp.assigned_officer.includes('CA Aditya Verma'));
  });

  test('7. Order Details & Tax Invoice (GET /orders/:orderId)', async () => {
    const orderRes = await fetch(`${baseUrl}/orders/${createdOrderId}`);
    assert.strictEqual(orderRes.status, 200);
    const orderData = await orderRes.json();
    assert.strictEqual(orderData.success, true);
    assert.ok(orderData.invoice);
    assert.strictEqual(orderData.invoice.service, 'Sole Proprietorship Registration');
    assert.strictEqual(orderData.invoice.tradeName, 'Apex Retail Enterprises');
    assert.strictEqual(orderData.invoice.total, 1238);
  });
});
