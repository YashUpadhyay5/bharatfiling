import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import loansRoutes from '../routes/loans/index.js';

describe('Business & MSME Loans Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdLeadId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/loans', loansRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/loans`;
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

  test('2. Eligibility API (POST /eligibility) - Computes EMI, Match Score & Bank Recommendations', async () => {
    const payload = {
      amount: 1500000,
      rate: 11.99,
      tenureYears: 3,
      cibilRange: '750_plus',
      isGstRegistered: true,
      schemeId: 'unsecured-business',
    };

    const res = await fetch(`${baseUrl}/eligibility`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.loanAmount, 1500000);
    assert.strictEqual(data.tenureMonths, 36);
    assert.ok(data.monthlyEmi > 40000 && data.monthlyEmi < 60000, 'Monthly EMI in expected range');
    assert.ok(data.matchScore >= 90, 'Match score should be high for 750+ CIBIL and GST');
    assert.strictEqual(data.sanctionProbability, 'High');
    assert.ok(Array.isArray(data.recommendedBanks) && data.recommendedBanks.length > 0);
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
      name: 'Vikas Agarwal',
      email: `vikas_${Date.now()}@agarwalenterprises.com`,
      phone: '9811098765',
      desiredAmount: 2500000,
      cityPincode: 'Jaipur / 302001',
      selectedSchemeId: 'unsecured-business',
      selectedSchemeName: 'Unsecured Business Loan',
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

    // Verify in database
    const apps = db.getApplications();
    const saved = apps.find((a) => a.id === createdLeadId);
    assert.ok(saved, 'Saved application must exist in database');
    assert.strictEqual(saved.service_id, 'loans');
    assert.strictEqual(saved.status, 'LEAD_CAPTURED');
    assert.strictEqual(saved.fields_data.email, payload.email);
    assert.strictEqual(saved.fields_data.desired_amount, 2500000);
  });

  test('5. Financial Profile API (POST /profile) - Updates business financials & CIBIL score', async () => {
    const profilePayload = {
      orderId: createdLeadId,
      applicantEmail: 'vikas@agarwalenterprises.com',
      schemeId: 'unsecured-business',
      schemeName: 'Unsecured Business Loan',
      loanAmount: 2500000,
      loanPurpose: 'Bulk Inventory & Raw Material Purchase',
      entityType: 'pvt_ltd',
      businessVintage: '3_to_5_years',
      annualTurnover: '1cr_to_5cr',
      monthlyCredit: 750000,
      isGstRegistered: true,
      gstin: '08AAAAA0000A1Z5',
      cibilRange: '750_plus',
      matchScore: 96,
    };

    const res = await fetch(`${baseUrl}/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profilePayload),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);

    // Verify in db
    const apps = db.getApplications();
    const updated = apps.find((a) => a.id === createdLeadId);
    assert.ok(updated, 'Application must exist in DB');
    assert.strictEqual(updated.fields_data.annual_turnover, '1cr_to_5cr');
    assert.strictEqual(updated.fields_data.gstin, '08AAAAA0000A1Z5');
    assert.strictEqual(updated.fields_data.match_score, 96);
  });

  test('6. Payment Settlement API (POST /payment) - Settles ₹525 fee and confirms specialist assignment', async () => {
    const orderNum = `#LN-TEST-${Date.now().toString().slice(-4)}`;
    const payload = {
      orderId: orderNum,
      method: 'UPI',
      subMethod: 'PhonePe',
      amount: 525,
      includeLabourWelfare: true,
      applicantName: 'Vikas Agarwal',
      applicantEmail: 'vikas@agarwalenterprises.com',
      applicantPhone: '9811098765',
      schemeId: 'unsecured-business',
      schemeName: 'Unsecured Business Loan',
      loanAmount: 2500000,
      bookedSlot: '4 November 2026 at 2:00 PM',
    };

    const res = await fetch(`${baseUrl}/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.transactionId.startsWith('BFP-LN-'));
    assert.strictEqual(data.amount, 525);
    assert.ok(data.callNotice.includes('80448 *****'));
    assert.ok(data.assignedSpecialist.includes('CA Raghavan Srinivasan'));

    // Verify orders collection in db
    const orders = db.getOrders();
    const savedOrder = orders.find((o) => o.order_number === orderNum);
    assert.ok(savedOrder, 'Saved order must exist in DB');
    assert.strictEqual(savedOrder.status, 'PAID');
    assert.strictEqual(savedOrder.amount, 525);
    assert.strictEqual(savedOrder.service_id, 'loans');
  });
});
