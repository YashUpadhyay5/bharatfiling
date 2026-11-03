import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import indianSubsidiaryRoutes from '../routes/registrations/indian-subsidiary/index.js';

describe('Indian Subsidiary Registration Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/indian-subsidiary', indianSubsidiaryRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/indian-subsidiary`;
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

  test('3. Quotation API (POST /quote) - Computes exact fees for all 3 Subsidiary plans', async () => {
    // 3A. Plan 1: Starter (Indian Subsidiary Incorporation) — ₹999
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
    assert.strictEqual(starterData.quotation.gstAmount, Math.round(999 * 0.18)); // 180
    assert.strictEqual(starterData.quotation.labourWelfare.total, 59); // 50 + 9

    // 3B. Plan 2: Standard (Incorporation + DSC + DIN + PAN/TAN) — ₹2,499
    const standardRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'standard',
        includeLabourWelfare: true,
        parentCountry: 'Singapore',
      }),
    });
    assert.strictEqual(standardRes.status, 200);
    const standardData = await standardRes.json();
    assert.strictEqual(standardData.success, true);
    assert.strictEqual(standardData.quotation.professionalFee, 2499);
    assert.strictEqual(standardData.quotation.parentCountry, 'Singapore');
    assert.strictEqual(standardData.quotation.fdiRoute, '100% FDI Automatic Route');

    // 3C. Plan 3: Complete (Cross-Border Enterprise Setup Suite) — ₹4,999
    const completeRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'complete',
        includeLabourWelfare: false,
        addonResidentDirector: true,
      }),
    });
    assert.strictEqual(completeRes.status, 200);
    const completeData = await completeRes.json();
    assert.strictEqual(completeData.success, true);
    assert.strictEqual(completeData.quotation.professionalFee, 4999);
    assert.strictEqual(completeData.quotation.addonTotal, 9999);
    assert.strictEqual(completeData.quotation.labourWelfare.total, 0);
  });

  test('4. Checkout Draft Creation (POST /checkout/draft) - Saves into database', async () => {
    const payload = {
      name: 'Yash Upadhyay',
      email: 'yashupadhyay@bharatfiling.com',
      phone: '+91 7668976193',
      whatsappOptIn: true,
      proposedSubsidiaryName: 'Acme Global Tech (India) Private Limited',
      parentCountry: 'United States',
      directorsCount: '2',
      authorizedCapital: '100000',
      state: 'Maharashtra',
      plan: 'starter',
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
    assert.ok(data.orderNumber.startsWith('#ISUB-'), 'Order Number must start with #ISUB-');
    assert.ok(data.applicationNumber.startsWith('ISUB'), 'App Number must start with ISUB');

    createdOrderId = data.orderId;
    createdAppId = data.applicationId;

    // Verify DB persistence
    const appInDb = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(appInDb, 'Application must be stored in DB');
    assert.strictEqual(appInDb.status, 'DRAFT');
    assert.strictEqual(appInDb.fields_data.proposed_subsidiary_name, 'Acme Global Tech (India) Private Limited');
    assert.strictEqual(appInDb.fields_data.parent_country, 'United States');

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
        amount: 1238,
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.status, 'PAID');
    assert.ok(data.transactionId.startsWith('BFP-ISUB-'), 'Transaction ID must start with BFP-ISUB-');
    assert.ok(data.assignedOfficer.includes('CS Ananya Sen'), 'Must assign CS Ananya Sen');
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
