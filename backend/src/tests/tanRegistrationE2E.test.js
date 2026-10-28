import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import tanRoutes from '../routes/registrations/tan-registration/index.js';

describe('TAN Registration Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/tan', tanRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/tan`;
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

  test('3. Quotation API (POST /quote) - Computes exact fees for all 3 TAN plans', async () => {
    // 3A. Service 1: Starter (Basic Form 49B Filing) — ₹499
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
    assert.strictEqual(starterData.quote.professionalFee, 499);
    assert.strictEqual(starterData.quote.gstOnFee, 90); // 18% of 499 = 89.82 -> 90
    assert.strictEqual(starterData.quote.labourWelfare, 80);
    assert.strictEqual(starterData.quote.gstOnLabour, 14); // 18% of 80 = 14.4 -> 14
    assert.strictEqual(starterData.quote.totalAmount, 683); // 499 + 90 + 80 + 14 = 683

    // 3B. Service 2: Standard (TAN Allotment + TRACES Portal Setup) — ₹999
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
    assert.strictEqual(standardData.quote.professionalFee, 999);
    assert.strictEqual(standardData.quote.gstOnFee, 180); // 18% of 999 = 179.82 -> 180
    assert.strictEqual(standardData.quote.labourWelfare, 80);
    assert.strictEqual(standardData.quote.gstOnLabour, 14);
    assert.strictEqual(standardData.quote.totalAmount, 1273); // 999 + 180 + 80 + 14 = 1273

    // 3C. Service 3: Business TAN + 1st Quarter TDS Filing Combo — ₹1,999
    const comboRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'combo',
        includeLabourWelfare: true,
      }),
    });
    assert.strictEqual(comboRes.status, 200);
    const comboData = await comboRes.json();
    assert.strictEqual(comboData.success, true);
    assert.strictEqual(comboData.quote.professionalFee, 1999);
    assert.strictEqual(comboData.quote.gstOnFee, 360); // 18% of 1999 = 359.82 -> 360
    assert.strictEqual(comboData.quote.labourWelfare, 180);
    assert.strictEqual(comboData.quote.gstOnLabour, 32); // 18% of 180 = 32.4 -> 32
    assert.strictEqual(comboData.quote.totalAmount, 2571); // 1999 + 360 + 180 + 32 = 2571
  });

  test('4. Quotation with Add-Ons - Class 3 DSC (+₹1499) and Express Filing (+₹499)', async () => {
    const res = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'standard',
        includeLabourWelfare: true,
        addonDsc: true,
        addonExpress: true,
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.quote.professionalFee, 999);
    assert.strictEqual(data.quote.addonFee, 1998); // 1499 + 499 = 1998
    assert.strictEqual(data.quote.subtotal, 2997); // 999 + 1998 = 2997
    assert.strictEqual(data.quote.gstOnFee, 539); // 18% of 2997 = 539.46 -> 539
    assert.strictEqual(data.quote.labourWelfare, 80);
    assert.strictEqual(data.quote.gstOnLabour, 14);
    assert.strictEqual(data.quote.totalAmount, 3630); // 2997 + 539 + 80 + 14 = 3630
  });

  test('5. Checkout Draft Order Creation (POST /checkout/draft) - Saves application and order to DB', async () => {
    const payload = {
      name: 'Yash Upadhyay',
      email: 'ya*****************@com',
      phone: '+91-*******193',
      entityType: 'company',
      appType: 'new',
      state: 'Karnataka',
      plan: 'standard',
      includeLabourWelfare: true,
      cinGstin: '29ABCDE1234F1Z5',
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
    assert.strictEqual(data.order.amount, 1273);
    assert.strictEqual(data.order.module_type, 'TAN');
    assert.strictEqual(data.application.service_id, 'tan-registration');

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

  test('6. Checkout Order Retrieval (GET /checkout/:orderId) - Returns persisted order with details', async () => {
    assert.ok(createdOrderId, 'Requires order ID from previous step');
    const res = await fetch(`${baseUrl}/checkout/${createdOrderId}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.order.id, createdOrderId);
    assert.strictEqual(data.order.amount, 1273);
    assert.strictEqual(data.application.id, createdAppId);
  });

  test('7. Payment Processing & CA Allocation (POST /checkout/:orderId/pay) - Completes order', async () => {
    assert.ok(createdOrderId, 'Requires order ID from previous step');
    const paymentPayload = {
      paymentMethod: 'UPI',
      upiApp: 'phonepe',
      amount: 1273,
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
    assert.strictEqual(data.assigned_officer, 'CS Vivek Kulkarni (Sr. Corporate TDS & Direct Tax Officer)');

    // Verify updated status in database store
    const updatedOrder = db.getOrders().find((o) => o.id === createdOrderId);
    assert.strictEqual(updatedOrder.status, 'PAID');
    assert.strictEqual(updatedOrder.payment_status, 'PAID');

    const updatedApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.strictEqual(updatedApp.status, 'UNDER_REVIEW');
    assert.strictEqual(updatedApp.payment_completed, true);
    assert.strictEqual(updatedApp.assigned_officer, 'CS Vivek Kulkarni (Sr. Corporate TDS & Direct Tax Officer)');
  });

  test('8. Offline / Mock Payment Fallback - Handles arbitrary order payment gracefully', async () => {
    const arbitraryOrderId = '#est179126201735020268592t';
    const res = await fetch(`${baseUrl}/checkout/${encodeURIComponent(arbitraryOrderId)}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiApp: 'phonepe',
        amount: 1273,
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.transaction.transaction_id.startsWith('BFP-TAN-'));
  });
});
