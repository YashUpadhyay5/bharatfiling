import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import logoDesignIpRoutes from '../routes/registrations/logo-design-ip/index.js';

describe('Logo Design & IP Protection Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdLeadId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/logo-design-ip', logoDesignIpRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/logo-design-ip`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('1. Database Store Connectivity - Loads applications collection', () => {
    const apps = db.getApplications();
    assert.ok(Array.isArray(apps), 'Applications collection should be an array');
  });

  test('2. Quotation API (POST /quote) - Computes pricing for Logo Design & IP Protection tiers', async () => {
    // 2A. Starter Plan (₹2,999)
    const starterRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'starter' }),
    });
    assert.strictEqual(starterRes.status, 200);
    const starterData = await starterRes.json();
    assert.strictEqual(starterData.success, true);
    assert.strictEqual(starterData.baseFee, 2999);
    assert.strictEqual(starterData.originalFee, 5999);
    assert.strictEqual(starterData.gst, Math.round(2999 * 0.18));
    assert.strictEqual(starterData.totalAmount, 2999 + Math.round(2999 * 0.18));

    // 2B. Growth Plan (₹5,999) + Express Delivery addon (₹999)
    const growthRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'growth', addonIds: ['express_delivery'] }),
    });
    assert.strictEqual(growthRes.status, 200);
    const growthData = await growthRes.json();
    assert.strictEqual(growthData.success, true);
    assert.strictEqual(growthData.baseFee, 5999);
    assert.strictEqual(growthData.addonsTotal, 999);
    const expectedSubtotal = 5999 + 999;
    assert.strictEqual(growthData.gst, Math.round(expectedSubtotal * 0.18));
    assert.strictEqual(growthData.totalAmount, expectedSubtotal + Math.round(expectedSubtotal * 0.18));

    // 2C. Enterprise Plan (₹9,999)
    const entRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'enterprise' }),
    });
    assert.strictEqual(entRes.status, 200);
    const entData = await entRes.json();
    assert.strictEqual(entData.success, true);
    assert.strictEqual(entData.baseFee, 9999);
  });

  test('3. Lead Capture API (POST /lead) - Validates required fields', async () => {
    const res = await fetch(`${baseUrl}/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.success, false);
    assert.ok(data.message.includes('required'));
  });

  test('4. Lead Capture API (POST /lead) - Saves inquiry into database', async () => {
    const payload = {
      name: 'Rohan Deshmukh',
      email: `rohan_${Date.now()}@novabrand.in`,
      phone: '9820012345',
      cityPincode: 'Mumbai / 400001',
      brandName: 'Nova FinTech',
      whatsappUpdates: true,
    };

    const res = await fetch(`${baseUrl}/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.leadId, 'Response should return leadId');
    assert.ok(data.applicationNumber, 'Response should return applicationNumber');

    createdLeadId = data.leadId;

    // Verify in db
    const apps = db.getApplications();
    const saved = apps.find((a) => a.id === createdLeadId);
    assert.ok(saved, 'Saved application should exist in database');
    assert.strictEqual(saved.service_id, 'logo-design-ip');
    assert.strictEqual(saved.status, 'LEAD_CAPTURED');
    assert.strictEqual(saved.fields_data.email, payload.email);
    assert.strictEqual(saved.fields_data.brand_name, 'Nova FinTech');
  });

  test('5. Brand Brief API (POST /brief) - Updates brand specifications', async () => {
    const briefPayload = {
      orderId: createdLeadId,
      applicantEmail: 'rohan@novabrand.in',
      brandName: 'Nova FinTech',
      tagline: 'Smart Financial Growth',
      industry: 'Financial Services',
      selectedStyle: 'combination',
      selectedPalette: 'royal_gold',
      selectedClasses: ['Class 36', 'Class 42'],
      inspirationNotes: 'Minimalist geometric shield logo',
      isColorProtected: false,
    };

    const res = await fetch(`${baseUrl}/brief`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(briefPayload),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);

    // Verify in db
    const apps = db.getApplications();
    const updated = apps.find((a) => a.id === createdLeadId);
    assert.ok(updated, 'Application must exist');
    assert.strictEqual(updated.fields_data.tagline, 'Smart Financial Growth');
    assert.strictEqual(updated.fields_data.selected_style, 'combination');
    assert.strictEqual(updated.fields_data.is_color_protected, false);
  });

  test('6. Payment Settlement API (POST /payment) - Settles package fee and confirms specialist assignment', async () => {
    const orderNum = `#LGD-TEST-${Date.now().toString().slice(-4)}`;
    const payload = {
      orderId: orderNum,
      method: 'UPI',
      subMethod: 'PhonePe',
      amount: 2525,
      includeLabourWelfare: true,
      applicantEmail: 'rohan@novabrand.in',
      applicantPhone: '9820012345',
      brandName: 'Nova FinTech',
      selectedPlanId: 'starter',
      selectedAddonIds: [],
    };

    const res = await fetch(`${baseUrl}/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.transactionId.startsWith('BFP-LGD-'));
    assert.strictEqual(data.amount, 2525);
    assert.ok(data.callNotice.includes('80448 *****'));

    // Verify orders collection in db
    const orders = db.getOrders();
    const savedOrder = orders.find((o) => o.order_number === orderNum);
    assert.ok(savedOrder, 'Saved order must exist in DB');
    assert.strictEqual(savedOrder.status, 'PAID');
    assert.strictEqual(savedOrder.amount, 2525);
    assert.strictEqual(savedOrder.service_id, 'logo-design-ip');
  });
});
