import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import caConsultationRoutes from '../routes/registrations/ca-consultation/index.js';

describe('Online CA Consultation Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdLeadId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/ca-consultation', caConsultationRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/ca-consultation`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('1. Database Store Connectivity - Loads and stores applications', () => {
    const apps = db.getApplications();
    assert.ok(Array.isArray(apps), 'Applications collection should be an array');
  });

  test('2. Quotation API (POST /quote) - Computes fees for all 3 consultation plans', async () => {
    // 2A. Starter Plan (₹499)
    const starterRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'starter' }),
    });
    assert.strictEqual(starterRes.status, 200);
    const starterData = await starterRes.json();
    assert.strictEqual(starterData.success, true);
    assert.strictEqual(starterData.baseFee, 499);
    assert.strictEqual(starterData.originalFee, 799);
    assert.strictEqual(starterData.gst, Math.round(499 * 0.18));

    // 2B. Standard Plan (₹999)
    const standardRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'standard' }),
    });
    assert.strictEqual(standardRes.status, 200);
    const standardData = await standardRes.json();
    assert.strictEqual(standardData.success, true);
    assert.strictEqual(standardData.baseFee, 999);
    assert.strictEqual(standardData.originalFee, 1999);

    // 2C. Elite Plan (₹2,499)
    const eliteRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'elite' }),
    });
    assert.strictEqual(eliteRes.status, 200);
    const eliteData = await eliteRes.json();
    assert.strictEqual(eliteData.success, true);
    assert.strictEqual(eliteData.baseFee, 2499);
    assert.strictEqual(eliteData.originalFee, 4999);
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
      email: 'yashupadhyay@example.com',
      phone: '9876543210',
      language: 'English',
      problemType: 'Business Structure Consultation',
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
    assert.ok(data.leadId, 'Lead ID must be generated');
    assert.ok(data.applicationNumber.startsWith('CA'), 'App number must start with CA');
    assert.strictEqual(data.problemType, 'Business Structure Consultation');
    assert.strictEqual(data.language, 'English');
    assert.ok(data.assignedCA.includes('CA Rajesh Narang'));

    createdLeadId = data.leadId;

    // Verify DB persistence
    const appInDb = db.getApplications().find((a) => a.id === createdLeadId);
    assert.ok(appInDb, 'Lead must be saved in database');
    assert.strictEqual(appInDb.status, 'LEAD_CAPTURED');
    assert.strictEqual(appInDb.fields_data.email, 'yashupadhyay@example.com');
    assert.strictEqual(appInDb.fields_data.phone, '9876543210');
    assert.strictEqual(appInDb.fields_data.problem_type, 'Business Structure Consultation');
  });

  test('5. Slot Scheduling API (POST /schedule) - Updates slot in database', async () => {
    assert.ok(createdLeadId, 'Need created lead ID');

    const res = await fetch(`${baseUrl}/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        leadId: createdLeadId,
        scheduledDate: '4 November 2026',
        scheduledTimeSlot: '1:30 PM',
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.scheduledDate, '4 November 2026');
    assert.strictEqual(data.scheduledTimeSlot, '1:30 PM');

    const appInDb = db.getApplications().find((a) => a.id === createdLeadId);
    assert.strictEqual(appInDb.status, 'SCHEDULED');
    assert.strictEqual(appInDb.scheduled_date, '4 November 2026');
    assert.strictEqual(appInDb.scheduled_time_slot, '1:30 PM');
  });

  test('6. Payment Settlement API (POST /payment) - Confirms ₹499 appointment & creates transaction', async () => {
    const res = await fetch(`${baseUrl}/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: `#CA-${Math.floor(100000 + Math.random() * 900000)}`,
        method: 'UPI',
        subMethod: 'PhonePe',
        amount: 499,
        scheduledDate: '4 November 2026',
        scheduledTimeSlot: '1:30 PM',
        problemType: 'Business Structure Consultation',
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.amount, 499);
    assert.ok(data.transactionId.startsWith('BFP-CA-'));
    assert.ok(data.assignedCA.includes('CA Rajesh Narang'));
    assert.ok(data.callNotice.includes('80448'));
  });
});
