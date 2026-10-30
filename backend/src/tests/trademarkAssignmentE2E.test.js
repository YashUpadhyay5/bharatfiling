import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import trademarkRoutes from '../routes/trademark/index.js';

describe('Trademark Assignment Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/trademark', trademarkRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/trademark/assignment`;
        resolve();
      });
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('1. Database Store Connectivity - Loads collections correctly', () => {
    const apps = db.getApplications ? db.getApplications() : db.applications;
    const orders = db.getOrders ? db.getOrders() : db.orders;
    assert.ok(Array.isArray(apps), 'Applications collection should be an array');
    assert.ok(Array.isArray(orders), 'Orders collection should be an array');
  });

  test('2. Supabase Client Connectivity - Client initialized properly', () => {
    const configured = isSupabaseConfigured();
    assert.strictEqual(typeof configured, 'boolean');
    assert.ok(supabase, 'Supabase client instance must exist');
  });

  test('3. Quotation API (POST /quote/calculate) - Verifies assignment professional fee and GST', async () => {
    // 3A. Standard Assignment (₹4,999) with default ₹500 discount
    const resStandard = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'standard',
        entityType: 'individual_startup',
      }),
    });
    assert.strictEqual(resStandard.status, 200);
    const dataStandard = await resStandard.json();
    assert.strictEqual(dataStandard.success, true);
    assert.strictEqual(dataStandard.baseProfessionalFee, 4999);
    assert.strictEqual(dataStandard.discount, 500);
    assert.strictEqual(dataStandard.professionalFee, 4499);
    assert.strictEqual(dataStandard.gstOnProfessional, Math.round(4499 * 0.18));

    // 3B. IP Attorney Consultation (₹499)
    const resConsult = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'consultation',
      }),
    });
    assert.strictEqual(resConsult.status, 200);
    const dataConsult = await resConsult.json();
    assert.strictEqual(dataConsult.success, true);
    assert.strictEqual(dataConsult.baseProfessionalFee, 499);
  });

  test('4. Checkout Draft API (POST /checkout/draft) - Validates inputs and stores lead', async () => {
    // 4A. Validation check
    const resInvalid = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'invalid-email',
        phone: '123',
      }),
    });
    assert.strictEqual(resInvalid.status, 400);

    // 4B. Valid creation
    const resDraft = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'assignee@techcorp.in',
        phone: '9876543210',
        cityPincode: 'Bengaluru, 560001',
        trademarkNumber: 'TM8492019',
        brandName: 'CloudScale',
        assignmentType: 'with_goodwill',
        packageId: 'standard',
      }),
    });
    assert.strictEqual(resDraft.status, 200);
    const dataDraft = await resDraft.json();
    assert.strictEqual(dataDraft.success, true);
    assert.ok(dataDraft.appId, 'Application ID must be generated');
    assert.ok(dataDraft.orderId, 'Order ID must be generated');
    assert.ok(dataDraft.orderNumber.startsWith('#TMA-'), 'Order number prefix must be #TMA-');

    createdAppId = dataDraft.appId;
    createdOrderId = dataDraft.orderId;
  });

  test('5. Payment Simulation API (POST /payment/verify) - Verifies payment completion', async () => {
    const resPayment = await fetch(`${baseUrl}/payment/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: createdOrderId,
        paymentMethod: 'UPI',
        upiApp: 'PHONEPE',
      }),
    });
    assert.strictEqual(resPayment.status, 200);
    const dataPayment = await resPayment.json();
    assert.strictEqual(dataPayment.success, true);
    assert.strictEqual(dataPayment.payment.status, 'SUCCESS');
    assert.ok(dataPayment.payment.transactionId.startsWith('TXN_TMA_'));
  });
});
