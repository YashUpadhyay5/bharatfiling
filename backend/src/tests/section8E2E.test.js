import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import section8Routes from '../routes/registrations/section8/index.js';

describe('Section 8 Company Registration Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/section8', section8Routes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/section8`;
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

  test('3. Quotation API (POST /quote) - Computes exact fees for all 3 Section 8 plans', async () => {
    // 3A. Plan 1: Starter (Section 8 Company Incorporation) — ₹999
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
    assert.strictEqual(starterData.quotation.totalPayable, 999 + 180 + 59); // 1238

    // 3B. Plan 2: Standard (Incorporation + Form INC-16 Central Govt License) — ₹2,499
    const standardRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'standard',
        includeLabourWelfare: true,
        proposedFoundationName: 'Samarpan Welfare Foundation',
        charitableObjective: 'Healthcare, Medical Relief & Public Health',
      }),
    });
    assert.strictEqual(standardRes.status, 200);
    const standardData = await standardRes.json();
    assert.strictEqual(standardData.success, true);
    assert.strictEqual(standardData.quotation.professionalFee, 2499);
    assert.strictEqual(standardData.quotation.proposedFoundationName, 'Samarpan Welfare Foundation');
    assert.strictEqual(standardData.quotation.charitableObjective, 'Healthcare, Medical Relief & Public Health');

    // 3C. Plan 3: Complete (Section 8 + 12A + 80G + NGO Darpan Suite) — ₹4,999
    const completeRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'complete',
        includeLabourWelfare: false,
      }),
    });
    assert.strictEqual(completeRes.status, 200);
    const completeData = await completeRes.json();
    assert.strictEqual(completeData.success, true);
    assert.strictEqual(completeData.quotation.professionalFee, 4999);
    assert.strictEqual(completeData.quotation.labourWelfare.total, 0);
  });

  test('4. Checkout Draft Creation (POST /checkout/draft) - Saves into database', async () => {
    const payload = {
      name: 'Yash Upadhyay',
      email: 'yashupadhyay@bharatfiling.com',
      phone: '+91 7668976193',
      whatsappOptIn: true,
      proposedFoundationName: 'Hope India Welfare Foundation',
      charitableObjective: 'Education, Literacy & Skill Development',
      directorsCount: '2',
      authorizedCapital: '0',
      state: 'Delhi',
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
    assert.ok(data.orderNumber.startsWith('#SEC8-'), 'Order Number must start with #SEC8-');
    assert.ok(data.applicationNumber.startsWith('SEC8'), 'App Number must start with SEC8');

    createdOrderId = data.orderId;
    createdAppId = data.applicationId;

    // Verify DB persistence
    const appInDb = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(appInDb, 'Application must be stored in DB');
    assert.strictEqual(appInDb.status, 'DRAFT');
    assert.strictEqual(appInDb.fields_data.proposed_foundation_name, 'Hope India Welfare Foundation');
    assert.strictEqual(appInDb.fields_data.charitable_objective, 'Education, Literacy & Skill Development');

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
    assert.ok(data.transactionId.startsWith('BFP-SEC8-'), 'Transaction ID format');
    assert.ok(data.assignedOfficer.includes('CS Vikramaditya Rao'), 'Assigned CS specialist');
    assert.ok(Array.isArray(data.nextSteps) && data.nextSteps.length >= 5, 'Next steps listed');

    // Verify database record updates
    const updatedOrder = db.getOrders().find((o) => o.id === createdOrderId);
    assert.strictEqual(updatedOrder.status, 'PAID');
    assert.strictEqual(updatedOrder.payment_status, 'PAID');
    assert.strictEqual(updatedOrder.payment_method, 'UPI');

    const updatedApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.strictEqual(updatedApp.status, 'UNDER_REVIEW');
    assert.strictEqual(updatedApp.payment_completed, true);
    assert.strictEqual(updatedApp.assigned_officer, 'CS Vikramaditya Rao (Senior NGO & Section 8 Law Specialist, ICSI)');
  });

  test('6. Payment Settle Endpoint (POST /payment/settle) - Settle payment from desk', async () => {
    // Create new draft to settle via /payment/settle
    const draftRes = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        proposedFoundationName: 'Seva Shakti Foundation',
        plan: 'starter',
      }),
    });
    const draftData = await draftRes.json();
    assert.strictEqual(draftRes.status, 201);

    const settleRes = await fetch(`${baseUrl}/payment/settle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: draftData.orderId,
        method: 'PhonePe UPI',
        amount: 1238,
      }),
    });

    assert.strictEqual(settleRes.status, 200);
    const settleData = await settleRes.json();
    assert.strictEqual(settleData.success, true);
    assert.strictEqual(settleData.status, 'PAID');
  });
});
