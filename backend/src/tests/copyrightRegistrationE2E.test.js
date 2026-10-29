import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import copyrightRoutes from '../routes/copyright/index.js';

describe('Copyright Registration Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/copyright', copyrightRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/copyright`;
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
    const apps = db.getApplications();
    const orders = db.getOrders();
    assert.ok(Array.isArray(apps), 'Applications collection should be an array');
    assert.ok(Array.isArray(orders), 'Orders collection should be an array');
  });

  test('2. Supabase Client Connectivity - Client initialized properly', () => {
    const configured = isSupabaseConfigured();
    assert.strictEqual(typeof configured, 'boolean');
    assert.ok(supabase, 'Supabase client instance must exist');
  });

  test('3. Quotation API (POST /quote/calculate) - Verifies statutory fees, discounts, and Labour Welfare', async () => {
    // 3A. Standard Comprehensive Protection (₹4,999) with default ₹500 discount
    const resStandard = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'standard',
        category: 'software',
      }),
    });
    assert.strictEqual(resStandard.status, 200);
    const dataStandard = await resStandard.json();
    assert.strictEqual(dataStandard.success, true);
    assert.strictEqual(dataStandard.quote.baseProfessionalFee, 4999);
    assert.strictEqual(dataStandard.quote.discount, 500);
    assert.strictEqual(dataStandard.quote.professionalFee, 4499);
    assert.strictEqual(dataStandard.quote.gstOnProfessional, 810); // 18% of 4499 = 809.82 -> 810
    assert.strictEqual(dataStandard.quote.totalPayable, 5309);
    assert.strictEqual(dataStandard.quote.statutoryFeePerWork, 500);

    // 3B. Commercial & Logo Package (₹8,999) with SAVE40 coupon (40% discount)
    const resCommercial = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'commercial',
        category: 'artistic',
        coupon: 'SAVE40',
      }),
    });
    assert.strictEqual(resCommercial.status, 200);
    const dataCommercial = await resCommercial.json();
    assert.strictEqual(dataCommercial.quote.baseProfessionalFee, 8999);
    assert.strictEqual(dataCommercial.quote.discount, 3600); // 40% of 8999 = 3599.6 -> 3600
    assert.strictEqual(dataCommercial.quote.professionalFee, 5399);
    assert.strictEqual(dataCommercial.quote.gstOnProfessional, 972); // 18% of 5399 = 971.82 -> 972
    assert.strictEqual(dataCommercial.quote.statutoryFeePerWork, 2000);

    // 3C. Quotation with Labour Welfare Endowment (+₹399 + ₹72)
    const resWelfare = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'starter',
        category: 'literary',
        includeLabourWelfare: true,
      }),
    });
    assert.strictEqual(resWelfare.status, 200);
    const dataWelfare = await resWelfare.json();
    assert.strictEqual(dataWelfare.quote.baseProfessionalFee, 2499);
    assert.strictEqual(dataWelfare.quote.professionalFee, 1999);
    assert.strictEqual(dataWelfare.quote.gstOnProfessional, 360);
    assert.strictEqual(dataWelfare.quote.labourWelfare, 399);
    assert.strictEqual(dataWelfare.quote.gstOnLabour, 72);
    assert.strictEqual(dataWelfare.quote.totalTaxesAndCharges, 831); // 360 + 399 + 72
    assert.strictEqual(dataWelfare.quote.totalPayable, 2830); // 1999 + 831
  });

  test('4. Checkout Draft API (POST /checkout/draft) - Validates inputs and stores lead', async () => {
    // 4A. Rejects invalid email
    const resBadEmail = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bad-email-without-at', phone: '9876543210' }),
    });
    assert.strictEqual(resBadEmail.status, 400);

    // 4B. Rejects invalid mobile number (< 10 digits)
    const resBadPhone = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'creator@example.com', phone: '1234' }),
    });
    assert.strictEqual(resBadPhone.status, 400);

    // 4C. Successfully creates valid draft
    const resValidDraft = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'rachna.pathania@schnelltek.com',
        phone: '9876543210',
        cityPincode: 'Bengaluru, 560001',
        whatsappUpdates: true,
        workTitle: 'SchnellTek Cloud ERP Engine Source Code',
        category: 'software',
        packageId: 'standard',
      }),
    });
    assert.strictEqual(resValidDraft.status, 200);
    const draftData = await resValidDraft.json();
    assert.strictEqual(draftData.success, true);
    assert.ok(draftData.order?.id, 'Draft should return order id');
    assert.ok(draftData.application?.id, 'Draft should return application id');
    assert.strictEqual(draftData.application.module_type, 'COPYRIGHT_REGISTRATION');
    assert.strictEqual(draftData.application.service_id, 'copyright-registration');

    createdOrderId = draftData.order.id;
    createdAppId = draftData.application.id;

    // Verify stored in DB
    const dbApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(dbApp, 'Application should persist in database');
    assert.strictEqual(dbApp.fields_data.workTitle, 'SchnellTek Cloud ERP Engine Source Code');
    assert.strictEqual(dbApp.fields_data.email, 'rachna.pathania@schnelltek.com');
  });

  test('5. Order Retrieval API (GET /checkout/:orderId) - Retrieves order with details', async () => {
    assert.ok(createdOrderId, 'Need created order id');

    const resGet = await fetch(`${baseUrl}/checkout/${createdOrderId}`);
    assert.strictEqual(resGet.status, 200);
    const orderData = await resGet.json();
    assert.strictEqual(orderData.success, true);
    assert.strictEqual(orderData.order.id, createdOrderId);
    assert.strictEqual(orderData.application.id, createdAppId);
  });

  test('6. Payment Simulation API (POST /checkout/:orderId/pay) - Marks order PAID & assigns attorney', async () => {
    assert.ok(createdOrderId, 'Need created order id from test 4');

    const resPay = await fetch(`${baseUrl}/checkout/${createdOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiApp: 'phonepe',
        amount: 5309,
      }),
    });
    assert.strictEqual(resPay.status, 200);
    const payData = await resPay.json();
    assert.strictEqual(payData.success, true);
    assert.ok(payData.assigned_officer.includes('Adv. Raghavan Nambiar'));

    // Check DB state updates
    const dbOrder = db.getOrders().find((o) => o.id === createdOrderId);
    assert.ok(dbOrder);
    assert.strictEqual(dbOrder.status, 'PAID');
    assert.strictEqual(dbOrder.payment_status, 'PAID');

    const dbApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(dbApp);
    assert.strictEqual(dbApp.payment_completed, true);
    assert.strictEqual(dbApp.status, 'UNDER_REVIEW');
    assert.ok(dbApp.assigned_officer.includes('Raghavan Nambiar'));
  });
});
