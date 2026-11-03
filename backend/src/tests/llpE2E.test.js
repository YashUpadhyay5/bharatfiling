import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import llpRoutes from '../routes/registrations/llp/index.js';

describe('LLP Registration Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/llp', llpRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/llp`;
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

  test('3. Quotation API (POST /quote) - Computes exact fees for all 3 LLP plans', async () => {
    // 3A. Plan 1: Starter (Basic LLP Incorporation) — ₹999
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
    assert.strictEqual(starterData.quotation.professionalFee, 999);
    assert.strictEqual(starterData.quotation.discount, 500);
    assert.strictEqual(starterData.quotation.subtotal, 499); // 999 - 500 = 499

    // 3B. Plan 2: Standard (LLP Incorporation + DSC + DPIN + Form 3) — ₹2,499
    const standardRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'standard',
        includeLabourWelfare: true,
        state: 'Maharashtra',
      }),
    });
    assert.strictEqual(standardRes.status, 200);
    const standardData = await standardRes.json();
    assert.strictEqual(standardData.success, true);
    assert.strictEqual(standardData.quotation.professionalFee, 2499);
    assert.strictEqual(standardData.quotation.subtotal, 1999); // 2499 - 500 = 1999
    assert.strictEqual(standardData.quotation.gstAmount, Math.round(1999 * 0.18)); // 360
    assert.strictEqual(standardData.quotation.labourWelfare.total, 59);

    // 3C. Plan 3: Complete (LLP + GST + Annual MCA Compliance) — ₹4,999
    const completeRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'complete',
        includeLabourWelfare: false,
        addonTrademark: true,
      }),
    });
    assert.strictEqual(completeRes.status, 200);
    const completeData = await completeRes.json();
    assert.strictEqual(completeData.success, true);
    assert.strictEqual(completeData.quotation.professionalFee, 4999);
    assert.strictEqual(completeData.quotation.addonTotal, 1999);
    assert.strictEqual(completeData.quotation.labourWelfare.total, 0);
  });

  test('4. Checkout Draft Creation (POST /checkout/draft) - Saves into database', async () => {
    const payload = {
      name: 'Yash Upadhyay',
      email: 'yashupadhyay@bharatfiling.com',
      phone: '+91 7668976193',
      whatsappOptIn: true,
      proposedLlpName: 'Bharat Quantum Tech LLP',
      businessAge: 'Less than 1 year',
      partnersCount: '2',
      contributionAmount: '100000',
      state: 'Maharashtra',
      plan: 'standard',
      includeLabourWelfare: true,
    };

    const res = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.orderId, 'Order ID must be generated');
    assert.ok(data.applicationId, 'Application ID must be generated');
    assert.ok(data.orderNumber.startsWith('#LLP-'), 'Order Number must start with #LLP-');
    assert.ok(data.applicationNumber.startsWith('LLP'), 'App Number must start with LLP');

    createdOrderId = data.orderId;
    createdAppId = data.applicationId;

    // Verify DB persistence
    const appInDb = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(appInDb, 'Application must be stored in DB');
    assert.strictEqual(appInDb.status, 'DRAFT');
    assert.strictEqual(appInDb.fields_data.proposed_llp_name, 'Bharat Quantum Tech LLP');
    assert.strictEqual(appInDb.fields_data.business_age, 'Less than 1 year');

    const orderInDb = db.getOrders().find((o) => o.id === createdOrderId);
    assert.ok(orderInDb, 'Order must be stored in DB');
    assert.strictEqual(orderInDb.status, 'PENDING');
    assert.strictEqual(orderInDb.payment_status, 'PENDING');
  });

  test('5. Payment Settlement (POST /payment) - Transitions Order & App Status to PAID', async () => {
    assert.ok(createdOrderId, 'Need created order ID');

    const res = await fetch(`${baseUrl}/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: createdOrderId,
        paymentMethod: 'UPI',
        amount: 3008,
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.status, 'PAID');
    assert.ok(data.transactionId.startsWith('BFP-LLP-'), 'Transaction ID must start with BFP-LLP-');
    assert.ok(data.assignedOfficer.includes('CS Priya Sharma'), 'Must assign CS Priya Sharma');
    assert.ok(Array.isArray(data.nextSteps), 'Must return clear next steps');

    // Verify DB update
    const orderInDb = db.getOrders().find((o) => o.id === createdOrderId);
    assert.strictEqual(orderInDb.status, 'PAID');
    assert.strictEqual(orderInDb.payment_status, 'PAID');
    assert.strictEqual(orderInDb.transaction_id, data.transactionId);

    const appInDb = db.getApplications().find((a) => a.id === createdAppId);
    assert.strictEqual(appInDb.status, 'UNDER_REVIEW');
    assert.strictEqual(appInDb.payment_completed, true);
    assert.strictEqual(appInDb.assigned_officer, data.assignedOfficer);
  });

  test('6. Payment Verification (POST /verify-payment) - Confirms payment webhook', async () => {
    const res = await fetch(`${baseUrl}/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: createdOrderId,
        paymentMethod: 'NETBANKING',
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.status, 'PAID');
  });
});
