import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import shopRoutes from '../routes/registrations/shop-establishment/index.js';

describe('Shop & Establishment Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/shop-establishment', shopRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/shop-establishment`;
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

  test('3. Quotation API (POST /quote) - Computes exact fees & taxes matching screenshot', async () => {
    // Exact Screenshot 4 test case:
    // Standard Plan (₹3,999) + GST ₹720 + Labour Welfare ₹240 + GST on Labour ₹44 = Total ₹5,003
    const res = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'standard',
        companyName: 'Apex Cloud Innovations Pvt Ltd',
        isCommercialPlace: 'Yes',
        includeLabourWelfare: true,
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.quote.professionalFee, 3999);
    assert.strictEqual(data.quote.gstOnFee, 720);
    assert.strictEqual(data.quote.labourWelfare, 240);
    assert.strictEqual(data.quote.gstOnLabour, 44);
    assert.strictEqual(data.quote.taxesAndCharges, 1004);
    assert.strictEqual(data.quote.totalAmount, 5003); // EXACT MATCH WITH SCREENSHOT 4
  });

  test('4. Draft Order API (POST /checkout/draft) - Creates and persists application & order to DB', async () => {
    const res = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'founder@apexcloud.com',
        phone: '9876543210',
        cityPincode: 'Mumbai - 400001',
        whatsappOptIn: true,
        companyName: 'Apex Cloud Innovations Pvt Ltd',
        isCommercialPlace: 'Yes',
        plan: 'standard',
        includeLabourWelfare: true,
      }),
    });

    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.order.id, 'Order must have an ID');
    assert.ok(data.application.id, 'Application must have an ID');
    assert.strictEqual(data.order.amount, 5003);
    assert.strictEqual(data.application.amount, 5003);
    assert.strictEqual(data.application.fields_data.companyName, 'Apex Cloud Innovations Pvt Ltd');
    assert.strictEqual(data.application.fields_data.isCommercialPlace, 'Yes');

    createdOrderId = data.order.id;
    createdAppId = data.application.id;

    // Verify persistence in DatabaseStore
    const savedApp = db.getApplications().find((a) => a.id === createdAppId);
    const savedOrder = db.getOrders().find((o) => o.id === createdOrderId);
    assert.ok(savedApp, 'Application must be saved in database store');
    assert.ok(savedOrder, 'Order must be saved in database store');
    assert.strictEqual(savedApp.payment_completed, false);
    assert.strictEqual(savedOrder.status, 'PENDING');
  });

  test('5. Order Retrieval API (GET /checkout/:orderId) - Returns saved database record', async () => {
    assert.ok(createdOrderId, 'Created order ID must exist');
    const res = await fetch(`${baseUrl}/checkout/${createdOrderId}`);

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.order.id, createdOrderId);
    assert.strictEqual(data.order.amount, 5003);
    assert.strictEqual(data.application.id, createdAppId);
    assert.strictEqual(data.application.fields_data.companyName, 'Apex Cloud Innovations Pvt Ltd');
  });

  test('6. Payment Processing API (POST /checkout/:orderId/pay) - Marks order PAID & assigns CA in DB', async () => {
    assert.ok(createdOrderId, 'Created order ID must exist');

    const res = await fetch(`${baseUrl}/checkout/${createdOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiApp: 'PhonePe',
        amount: 5003,
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.order.status, 'PAID');
    assert.strictEqual(data.order.payment_status, 'COMPLETED');
    assert.strictEqual(data.order.upi_app, 'PhonePe');
    assert.strictEqual(data.application.status, 'SUBMITTED');
    assert.strictEqual(data.application.payment_completed, true);
    assert.ok(data.application.assigned_ca, 'Must assign CA');
    assert.strictEqual(data.application.assigned_ca.name, 'CA Rajesh Sharma');

    // Verify persistence in database store
    const updatedOrder = db.getOrders().find((o) => o.id === createdOrderId);
    const updatedApp = db.getApplications().find((a) => a.id === createdAppId);

    assert.strictEqual(updatedOrder.status, 'PAID');
    assert.strictEqual(updatedApp.payment_completed, true);
    assert.strictEqual(updatedApp.status, 'SUBMITTED');
    assert.strictEqual(updatedApp.assigned_ca.name, 'CA Rajesh Sharma');
  });
});
