import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import trademarkRenewalRoutes from '../routes/trademark/trademark-renewal/index.js';

describe('Trademark Renewal Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/trademark/renewal', trademarkRenewalRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/trademark/renewal`;
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

  test('3. Quotation API (POST /quote/calculate) - Verifies statutory fee calculations and discounts', async () => {
    // 3A. Standard Timely Renewal (₹1,999) with default ₹500 discount
    const resStandard = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'standard',
        renewalTiming: 'timely',
      }),
    });
    assert.strictEqual(resStandard.status, 200);
    const dataStandard = await resStandard.json();
    assert.strictEqual(dataStandard.success, true);
    assert.strictEqual(dataStandard.quote.baseProfessionalFee, 1999);
    assert.strictEqual(dataStandard.quote.discount, 500);
    assert.strictEqual(dataStandard.quote.professionalFee, 1499);
    assert.strictEqual(dataStandard.quote.gstOnProfessional, 270); // 18% of 1499 = 269.82 -> 270
    assert.strictEqual(dataStandard.quote.totalPayable, 1769);
    assert.strictEqual(dataStandard.quote.govtFeePerClass, 9000);
    assert.strictEqual(dataStandard.quote.statutorySurcharge, 0);

    // 3B. Renewal with Late Surcharge (₹3,499) with ₹4,500 statutory surcharge
    const resLate = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'late_renewal',
        renewalTiming: 'late',
      }),
    });
    assert.strictEqual(resLate.status, 200);
    const dataLate = await resLate.json();
    assert.strictEqual(dataLate.quote.baseProfessionalFee, 3499);
    assert.strictEqual(dataLate.quote.discount, 500);
    assert.strictEqual(dataLate.quote.professionalFee, 2999);
    assert.strictEqual(dataLate.quote.gstOnProfessional, 540); // 18% of 2999 = 539.82 -> 540
    assert.strictEqual(dataLate.quote.totalPayable, 3539);
    assert.strictEqual(dataLate.quote.statutorySurcharge, 4500);

    // 3C. Restoration & Renewal (₹5,999) with SAVE40 coupon (40% discount)
    const resRestoration = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'restoration',
        renewalTiming: 'restoration',
        coupon: 'SAVE40',
      }),
    });
    assert.strictEqual(resRestoration.status, 200);
    const dataRestoration = await resRestoration.json();
    assert.strictEqual(dataRestoration.quote.baseProfessionalFee, 5999);
    assert.strictEqual(dataRestoration.quote.discount, 2400); // 40% of 5999 = 2399.6 -> 2400
    assert.strictEqual(dataRestoration.quote.professionalFee, 3599);
    assert.strictEqual(dataRestoration.quote.gstOnProfessional, 648); // 18% of 3599 = 647.82 -> 648
    assert.strictEqual(dataRestoration.quote.totalPayable, 4247);
    assert.strictEqual(dataRestoration.quote.statutorySurcharge, 5000);
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
      body: JSON.stringify({ email: 'client@example.com', phone: '1234' }),
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
        trademarkNumber: '4392018',
        renewalTiming: 'timely',
        packageId: 'standard',
      }),
    });
    assert.strictEqual(resValidDraft.status, 200);
    const draftData = await resValidDraft.json();
    assert.strictEqual(draftData.success, true);
    assert.ok(draftData.order?.id, 'Draft should return order id');
    assert.ok(draftData.application?.id, 'Draft should return application id');
    assert.strictEqual(draftData.application.module_type, 'TRADEMARK_RENEWAL');
    assert.strictEqual(draftData.application.service_id, 'trademark-renewal');

    createdOrderId = draftData.order.id;
    createdAppId = draftData.application.id;

    // Verify stored in DB
    const dbApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(dbApp, 'Application should persist in database');
    assert.strictEqual(dbApp.fields_data.targetTrademarkNumber, '4392018');
    assert.strictEqual(dbApp.fields_data.email, 'rachna.pathania@schnelltek.com');
  });

  test('5. Payment Simulation API (POST /checkout/:orderId/pay) - Marks order PAID & assigns attorney', async () => {
    assert.ok(createdOrderId, 'Need created order id from test 4');

    const resPay = await fetch(`${baseUrl}/checkout/${createdOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiApp: 'phonepe',
        amount: 1769,
      }),
    });
    assert.strictEqual(resPay.status, 200);
    const payData = await resPay.json();
    assert.strictEqual(payData.success, true);
    assert.ok(payData.assigned_officer.includes('Adv. Lakshita Arya'));

    // Check DB state updates
    const dbOrder = db.getOrders().find((o) => o.id === createdOrderId);
    assert.ok(dbOrder);
    assert.strictEqual(dbOrder.status, 'PAID');
    assert.strictEqual(dbOrder.payment_status, 'PAID');

    const dbApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(dbApp);
    assert.strictEqual(dbApp.payment_completed, true);
    assert.strictEqual(dbApp.status, 'UNDER_REVIEW');
    assert.ok(dbApp.assigned_officer.includes('Lakshita Arya'));
  });
});
