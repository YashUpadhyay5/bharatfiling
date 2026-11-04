import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import trademarkHearingRoutes from '../routes/registrations/trademark-hearing-support/index.js';

describe('Trademark Hearing Support Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdLeadId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/trademark-hearing-support', trademarkHearingRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/trademark-hearing-support`;
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

  test('2. Quotation API (POST /quote) - Computes fees for all 3 hearing packages', async () => {
    // 2A. Starter Plan (Single Hearing ₹3,499)
    const starterRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'starter' }),
    });
    assert.strictEqual(starterRes.status, 200);
    const starterData = await starterRes.json();
    assert.strictEqual(starterData.success, true);
    assert.strictEqual(starterData.baseFee, 3499);
    assert.strictEqual(starterData.originalFee, 5999);
    assert.strictEqual(starterData.gst, Math.round(3499 * 0.18));
    assert.strictEqual(starterData.totalAmount, 3499 + Math.round(3499 * 0.18));

    // 2B. Standard Plan (Written Submissions + Hearing ₹6,999)
    const standardRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'standard' }),
    });
    assert.strictEqual(standardRes.status, 200);
    const standardData = await standardRes.json();
    assert.strictEqual(standardData.success, true);
    assert.strictEqual(standardData.baseFee, 6999);
    assert.strictEqual(standardData.originalFee, 11999);

    // 2C. Elite Plan (Opposition Defense TM-O ₹12,999)
    const eliteRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'elite' }),
    });
    assert.strictEqual(eliteRes.status, 200);
    const eliteData = await eliteRes.json();
    assert.strictEqual(eliteData.success, true);
    assert.strictEqual(eliteData.baseFee, 12999);
    assert.strictEqual(eliteData.originalFee, 22999);
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
      name: 'Yash Upadhyay',
      email: 'ip.defense@mybrand.com',
      phone: '9876543210',
      language: 'English',
      problemType: 'Section 9 Absolute Grounds of Refusal',
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
    assert.ok(data.assignedCounsel.includes('Neha Rajyaguru'));

    createdLeadId = data.leadId;

    // Verify in db
    const apps = db.getApplications();
    const saved = apps.find((a) => a.id === createdLeadId);
    assert.ok(saved, 'Saved application should exist in database');
    assert.strictEqual(saved.service_id, 'trademark-hearing-support');
    assert.strictEqual(saved.status, 'LEAD_CAPTURED');
    assert.strictEqual(saved.fields_data.email, 'ip.defense@mybrand.com');
  });

  test('5. Slot Scheduling API (POST /schedule) - Updates appointment date and time slot in DB', async () => {
    const payload = {
      leadId: createdLeadId,
      scheduledDate: '4 November 2026',
      scheduledTimeSlot: '3:00 PM',
    };

    const res = await fetch(`${baseUrl}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.scheduledDate, '4 November 2026');
    assert.strictEqual(data.scheduledTimeSlot, '3:00 PM');

    // Verify in db
    const apps = db.getApplications();
    const updated = apps.find((a) => a.id === createdLeadId);
    assert.strictEqual(updated.status, 'SCHEDULED');
    assert.strictEqual(updated.scheduled_date, '4 November 2026');
    assert.strictEqual(updated.scheduled_time_slot, '3:00 PM');
  });

  test('6. Payment Settlement API (POST /payment) - Settles starting ₹3,499 hearing fee and confirms appointment', async () => {
    const orderNum = `#TM-TEST-${Date.now().toString().slice(-4)}`;
    const payload = {
      orderId: orderNum,
      method: 'UPI',
      subMethod: 'PhonePe',
      amount: 3499,
      scheduledDate: '4 November 2026',
      scheduledTimeSlot: '3:00 PM',
      problemType: 'Section 9 Absolute Grounds of Refusal',
      applicantEmail: 'ip.defense@mybrand.com',
      applicantPhone: '9876543210',
    };

    const res = await fetch(`${baseUrl}/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.transactionId.startsWith('BFP-TMH-'));
    assert.strictEqual(data.amount, 3499);
    assert.ok(data.callNotice.includes('80448 *****'));

    // Verify orders collection in db
    const orders = db.getOrders();
    const savedOrder = orders.find((o) => o.order_number === orderNum);
    assert.ok(savedOrder, 'Saved order must exist in DB');
    assert.strictEqual(savedOrder.status, 'PAID');
    assert.strictEqual(savedOrder.amount, 3499);
    assert.strictEqual(savedOrder.service_id, 'trademark-hearing-support');
  });
});
