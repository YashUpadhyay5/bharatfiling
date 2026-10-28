import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import apedaRoutes from '../routes/registrations/apeda-registration/index.js';

describe('APEDA Registration & Consultation Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/apeda', apedaRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/apeda`;
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

  test('3. Quotation API (POST /quote) - Computes exact fees & coupon matching screenshot media_1793179244243_9e915d29.png', async () => {
    // 3A. With coupon MAKEININDIA & Labour Welfare Endowment
    const resWithWelfare = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coupon: 'MAKEININDIA',
        includeLabourWelfare: true,
      }),
    });
    assert.strictEqual(resWithWelfare.status, 200);
    const dataWithWelfare = await resWithWelfare.json();
    assert.strictEqual(dataWithWelfare.success, true);
    assert.strictEqual(dataWithWelfare.quote.consultationFee, 999);
    assert.strictEqual(dataWithWelfare.quote.discount, 500);
    assert.strictEqual(dataWithWelfare.quote.subtotal, 499);
    assert.strictEqual(dataWithWelfare.quote.labourWelfare, 22);
    assert.strictEqual(dataWithWelfare.quote.gstOnLabour, 4);
    assert.strictEqual(dataWithWelfare.quote.taxesAndCharges, 26);
    assert.strictEqual(dataWithWelfare.quote.totalAmount, 525); // Exactly ₹525 from screenshot!

    // 3B. When Labour Welfare is removed
    const resWithoutWelfare = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coupon: 'MAKEININDIA',
        includeLabourWelfare: false,
      }),
    });
    assert.strictEqual(resWithoutWelfare.status, 200);
    const dataWithoutWelfare = await resWithoutWelfare.json();
    assert.strictEqual(dataWithoutWelfare.success, true);
    assert.strictEqual(dataWithoutWelfare.quote.subtotal, 499);
    assert.strictEqual(dataWithoutWelfare.quote.taxesAndCharges, 0);
    assert.strictEqual(dataWithoutWelfare.quote.totalAmount, 499);
  });

  test('4. Checkout Draft Creation (POST /checkout/draft) - Saves application and order to DB', async () => {
    const payload = {
      email: 'yashupadhyay@example.com',
      phone: '+91-7668976193',
      cityPincode: 'Bengaluru, 560001',
      language: 'English',
      whatsappUpdates: true,
      coupon: 'MAKEININDIA',
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
    assert.ok(data.order, 'Must return order record');
    assert.ok(data.application, 'Must return application record');
    assert.strictEqual(data.order.amount, 525);
    assert.strictEqual(data.order.module_type, 'APEDA');
    assert.strictEqual(data.application.service_id, 'apeda-registration');

    createdOrderId = data.order.id;
    createdAppId = data.application.id;

    // Verify DB persistence
    const savedOrder = db.getOrders().find((o) => o.id === createdOrderId);
    assert.ok(savedOrder, 'Order must be persisted in database store');
    assert.strictEqual(savedOrder.status, 'PENDING');

    const savedApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(savedApp, 'Application must be persisted in database store');
    assert.strictEqual(savedApp.status, 'DRAFT');
  });

  test('5. Order Retrieval (GET /checkout/:orderId) - Returns saved record with details', async () => {
    assert.ok(createdOrderId, 'Requires order ID from previous step');
    const res = await fetch(`${baseUrl}/checkout/${createdOrderId}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.order.id, createdOrderId);
    assert.strictEqual(data.order.amount, 525);
    assert.strictEqual(data.application.id, createdAppId);
  });

  test('6. Payment Processing (POST /checkout/:orderId/pay) - Marks order PAID & assigns DGFT officer', async () => {
    assert.ok(createdOrderId, 'Requires order ID from previous step');
    const paymentPayload = {
      paymentMethod: 'UPI',
      upiApp: 'phonepe',
      amount: 525,
    };

    const res = await fetch(`${baseUrl}/checkout/${createdOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentPayload),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.transaction, 'Transaction receipt must be returned');
    assert.strictEqual(data.transaction.status, 'SUCCESS');
    assert.strictEqual(data.assigned_officer, 'CA Rajesh Kothari (Director of Agri-Export Licensing)');

    // Verify updated status in database store
    const updatedOrder = db.getOrders().find((o) => o.id === createdOrderId);
    assert.strictEqual(updatedOrder.status, 'PAID');
    assert.strictEqual(updatedOrder.payment_status, 'PAID');

    const updatedApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.strictEqual(updatedApp.status, 'UNDER_REVIEW');
    assert.strictEqual(updatedApp.payment_completed, true);
    assert.strictEqual(updatedApp.assigned_officer, 'CA Rajesh Kothari (Director of Agri-Export Licensing)');
  });

  test('7. Offline / Mock Payment Fallback - Handles arbitrary order reference', async () => {
    const arbitraryOrderId = '#est179126201735020268593a';
    const res = await fetch(`${baseUrl}/checkout/${encodeURIComponent(arbitraryOrderId)}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiApp: 'phonepe',
        amount: 525,
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.transaction.transaction_id.startsWith('BFP-APEDA-'));
  });
});
