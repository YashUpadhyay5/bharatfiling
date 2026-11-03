import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import trustRoutes from '../routes/registrations/trust/index.js';

describe('Trust Registration Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/trust', trustRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/trust`;
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

  test('3. Quotation API (POST /quote) - Computes exact fees for all 3 Trust plans', async () => {
    // 3A. Plan 1: Starter (Trust Deed Drafting) — ₹4,999
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
    assert.strictEqual(starterData.quote.professionalFee, 4999);
    assert.strictEqual(starterData.quote.onlineDiscount, 500);
    assert.strictEqual(starterData.quote.subTotalAmount, 4499); // 4999 - 500 = 4499
    assert.strictEqual(starterData.quote.gstOnFee, 810); // 18% of 4499 = 809.82 -> 810
    assert.strictEqual(starterData.quote.labourWelfare, 50);
    assert.strictEqual(starterData.quote.gstOnLabour, 9);
    assert.strictEqual(starterData.quote.totalAmount, 5368); // 4499 + 810 + 50 + 9 = 5368

    // 3B. Plan 2: Standard (Trust Formation + Sub-Registrar Filing) — ₹9,999
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
    assert.strictEqual(standardData.quote.professionalFee, 9999);
    assert.strictEqual(standardData.quote.onlineDiscount, 500);
    assert.strictEqual(standardData.quote.subTotalAmount, 9499); // 9999 - 500 = 9499
    assert.strictEqual(standardData.quote.gstOnFee, 1710); // 18% of 9499 = 1709.82 -> 1710
    assert.strictEqual(standardData.quote.totalAmount, 11268); // 9499 + 1710 + 50 + 9 = 11268

    // 3C. Plan 3: Premium (Complete Suite) — ₹18,999
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
    assert.strictEqual(premiumData.quote.professionalFee, 18999);
    assert.strictEqual(premiumData.quote.onlineDiscount, 500);
    assert.strictEqual(premiumData.quote.subTotalAmount, 18499); // 18999 - 500 = 18499
    assert.strictEqual(premiumData.quote.gstOnFee, 3330); // 18% of 18499 = 3329.82 -> 3330
    assert.strictEqual(premiumData.quote.labourWelfare, 0);
    assert.strictEqual(premiumData.quote.totalAmount, 21829); // 18499 + 3330 = 21829
  });

  test('4. Checkout Draft Creation (POST /checkout/draft) - Persists application and order', async () => {
    const payload = {
      name: 'Yash Upadhyay',
      email: 'yashupadhyay@example.com',
      phone: '+91 7668976193',
      whatsappOptIn: true,
      trustName: 'Vidya Jyoti Educational & Charitable Trust',
      trustCategory: 'public_charitable',
      trusteesCount: '3_to_5',
      corpusFund: '10000',
      state: 'Delhi NCR',
      officeType: 'rented',
      plan: 'standard',
      includeLabourWelfare: true,
    };

    const res = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.applicationId, 'Must return applicationId');
    assert.ok(data.orderId, 'Must return orderId');
    assert.ok(data.orderNumber.startsWith('#TRST-'), 'Order number must start with #TRST-');
    assert.strictEqual(data.amount, 11268);

    createdAppId = data.applicationId;
    createdOrderId = data.orderId;

    // Verify in database store
    const storedApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(storedApp, 'Application should exist in DB');
    assert.strictEqual(storedApp.module_type, 'TRUST');
    assert.strictEqual(storedApp.fields_data.trust_name, 'Vidya Jyoti Educational & Charitable Trust');
    assert.strictEqual(storedApp.payment_completed, false);

    const storedOrder = db.getOrders().find((o) => o.id === createdOrderId);
    assert.ok(storedOrder, 'Order should exist in DB');
    assert.strictEqual(storedOrder.module_type, 'TRUST');
    assert.strictEqual(storedOrder.status, 'PENDING');
  });

  test('5. Retrieve Draft (GET /checkout/draft/:id)', async () => {
    const res = await fetch(`${baseUrl}/checkout/draft/${createdAppId}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.draft.id, createdAppId);
    assert.strictEqual(data.order.id, createdOrderId);
  });

  test('6. Payment Processing & Verification (POST /checkout/:orderId/pay)', async () => {
    const res = await fetch(`${baseUrl}/checkout/${createdOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        amount: 11268,
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.status, 'PAID');
    assert.ok(data.transactionId.startsWith('BFP-TRST-'));
    assert.ok(data.assignedOfficer.includes('Adv. Sunita Kulkarni'));

    // Check DB state update
    const updatedOrder = db.getOrders().find((o) => o.id === createdOrderId);
    assert.strictEqual(updatedOrder.status, 'PAID');
    assert.strictEqual(updatedOrder.payment_status, 'PAID');

    const updatedApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.strictEqual(updatedApp.payment_completed, true);
    assert.strictEqual(updatedApp.status, 'UNDER_REVIEW');
  });

  test('7. Order Details & Tax Invoice (GET /orders/:orderId)', async () => {
    const res = await fetch(`${baseUrl}/orders/${createdOrderId}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.order.id, createdOrderId);
    assert.ok(data.order.invoiceNumber.startsWith('INV-TRST-'));
    assert.strictEqual(data.order.hsnCode, '998231');
    assert.strictEqual(data.order.amount, 11268);
  });
});
