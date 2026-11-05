import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import secretarialAuditRoutes from '../routes/registrations/secretarial-audit-registers/index.js';

describe('Secretarial Audit & Statutory Registers Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdLeadId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/secretarial-audit-registers', secretarialAuditRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/secretarial-audit-registers`;
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

  test('2. Quotation API (POST /quote) - Computes pricing for Secretarial Audit tiers', async () => {
    // 2A. Starter Plan (₹6,999)
    const starterRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'starter' }),
    });
    assert.strictEqual(starterRes.status, 200);
    const starterData = await starterRes.json();
    assert.strictEqual(starterData.success, true);
    assert.strictEqual(starterData.baseFee, 6999);
    assert.strictEqual(starterData.originalFee, 12999);
    assert.strictEqual(starterData.gst, Math.round(6999 * 0.18));
    assert.strictEqual(starterData.totalAmount, 6999 + Math.round(6999 * 0.18));

    // 2B. Growth Plan (₹14,999)
    const growthRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'growth' }),
    });
    assert.strictEqual(growthRes.status, 200);
    const growthData = await growthRes.json();
    assert.strictEqual(growthData.success, true);
    assert.strictEqual(growthData.baseFee, 14999);

    // 2C. Enterprise Plan (₹29,999)
    const entRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'enterprise' }),
    });
    assert.strictEqual(entRes.status, 200);
    const entData = await entRes.json();
    assert.strictEqual(entData.success, true);
    assert.strictEqual(entData.baseFee, 29999);
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
      name: 'Harish Chandra',
      email: 'legal@nexusauto.in',
      phone: '9876543210',
      cityPincode: 'Pune / 411001',
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
    assert.strictEqual(saved.service_id, 'secretarial-audit-registers');
    assert.strictEqual(saved.status, 'LEAD_CAPTURED');
    assert.strictEqual(saved.fields_data.email, 'legal@nexusauto.in');
    assert.strictEqual(saved.fields_data.city_pincode, 'Pune / 411001');
  });

  test('5. Payment Settlement API (POST /payment) - Settles ₹525 expert consultation fee and confirms appointment', async () => {
    const orderNum = `#SEC-TEST-${Date.now().toString().slice(-4)}`;
    const payload = {
      orderId: orderNum,
      method: 'UPI',
      subMethod: 'PhonePe',
      amount: 525,
      includeLabourWelfare: true,
      applicantEmail: 'legal@nexusauto.in',
      applicantPhone: '9876543210',
      cityPincode: 'Pune / 411001',
    };

    const res = await fetch(`${baseUrl}/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.transactionId.startsWith('BFP-SEC-'));
    assert.strictEqual(data.amount, 525);
    assert.ok(data.callNotice.includes('80448 *****'));

    // Verify orders collection in db
    const orders = db.getOrders();
    const savedOrder = orders.find((o) => o.order_number === orderNum);
    assert.ok(savedOrder, 'Saved order must exist in DB');
    assert.strictEqual(savedOrder.status, 'PAID');
    assert.strictEqual(savedOrder.amount, 525);
    assert.strictEqual(savedOrder.service_id, 'secretarial-audit-registers');
  });
});
