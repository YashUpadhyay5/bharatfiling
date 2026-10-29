import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import trademarkObjectionRoutes from '../routes/trademark/trademark-objection/index.js';

describe('Trademark Objection Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/trademark/objection', trademarkObjectionRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/trademark/objection`;
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
    // 3A. Substantive Defense Package (₹2,999) with default ₹500 discount
    const resSubstantive = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'substantive',
      }),
    });
    assert.strictEqual(resSubstantive.status, 200);
    const dataSubstantive = await resSubstantive.json();
    assert.strictEqual(dataSubstantive.success, true);
    assert.strictEqual(dataSubstantive.quote.baseProfessionalFee, 2999);
    assert.strictEqual(dataSubstantive.quote.discount, 500);
    assert.strictEqual(dataSubstantive.quote.professionalFee, 2499);
    assert.strictEqual(dataSubstantive.quote.gstOnProfessional, 450); // 18% of 2499 = 449.82 -> 450
    assert.strictEqual(dataSubstantive.quote.totalPayable, 2949);

    // 3B. Procedural Reply (₹1,499) with default ₹500 discount
    const resProcedural = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'procedural',
      }),
    });
    assert.strictEqual(resProcedural.status, 200);
    const dataProcedural = await resProcedural.json();
    assert.strictEqual(dataProcedural.quote.baseProfessionalFee, 1499);
    assert.strictEqual(dataProcedural.quote.discount, 500);
    assert.strictEqual(dataProcedural.quote.professionalFee, 999);
    assert.strictEqual(dataProcedural.quote.gstOnProfessional, 180); // 18% of 999 = 179.82 -> 180
    assert.strictEqual(dataProcedural.quote.totalPayable, 1179);

    // 3C. Comprehensive Defense (₹5,999) with SAVE40 coupon (40% discount)
    const resComprehensiveCoupon = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        packageId: 'comprehensive',
        coupon: 'SAVE40',
      }),
    });
    assert.strictEqual(resComprehensiveCoupon.status, 200);
    const dataComp = await resComprehensiveCoupon.json();
    assert.strictEqual(dataComp.success, true);
    assert.strictEqual(dataComp.quote.baseProfessionalFee, 5999);
    assert.strictEqual(dataComp.quote.discount, 2400); // 40% of 5999 = 2399.6 -> 2400
    assert.strictEqual(dataComp.quote.professionalFee, 3599);
    assert.strictEqual(dataComp.quote.gstOnProfessional, 648); // 18% of 3599 = 647.82 -> 648
    // 3D. New Plans from Screenshot: Starter (₹3,499), Standard (₹7,999), Premium (₹13,999)
    const resPremium = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ packageId: 'premium' }),
    });
    assert.strictEqual(resPremium.status, 200);
    const dataPremium = await resPremium.json();
    assert.strictEqual(dataPremium.quote.baseProfessionalFee, 13999);
    assert.strictEqual(dataPremium.quote.discount, 500);
    assert.strictEqual(dataPremium.quote.professionalFee, 13499);
    assert.strictEqual(dataPremium.quote.gstOnProfessional, 2430);
    assert.strictEqual(dataPremium.quote.totalPayable, 15929);

    const resStarter = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ packageId: 'starter' }),
    });
    assert.strictEqual(resStarter.status, 200);
    const dataStarter = await resStarter.json();
    assert.strictEqual(dataStarter.quote.baseProfessionalFee, 3499);
    assert.strictEqual(dataStarter.quote.discount, 500);
    assert.strictEqual(dataStarter.quote.professionalFee, 2999);
    assert.strictEqual(dataStarter.quote.gstOnProfessional, 540);
    assert.strictEqual(dataStarter.quote.totalPayable, 3539);
  });

  test('4. Checkout Draft API (POST /checkout/draft) - Validates inputs and stores lead', async () => {
    // 4A. Rejects missing / invalid email
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
        email: 'siddharth.rao@innovedge.com',
        phone: '9876543210',
        cityPincode: 'Bengaluru, 560001',
        whatsappUpdates: true,
        applicationNumber: '5839201',
        objectionType: 'section_11',
        packageId: 'substantive',
      }),
    });
    assert.strictEqual(resValidDraft.status, 200);
    const draftData = await resValidDraft.json();
    assert.strictEqual(draftData.success, true);
    assert.ok(draftData.order?.id, 'Draft should return order id');
    assert.ok(draftData.application?.id, 'Draft should return application id');
    assert.strictEqual(draftData.application.module_type, 'TRADEMARK_OBJECTION');
    assert.strictEqual(draftData.application.service_id, 'trademark-objection');

    createdOrderId = draftData.order.id;
    createdAppId = draftData.application.id;

    // Verify stored in DB
    const dbApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(dbApp, 'Application should persist in database');
    assert.strictEqual(dbApp.fields_data.targetTmApplicationNumber, '5839201');
    assert.strictEqual(dbApp.fields_data.email, 'siddharth.rao@innovedge.com');
  });

  test('5. Payment Simulation API (POST /checkout/:orderId/pay) - Marks order PAID & assigns attorney', async () => {
    assert.ok(createdOrderId, 'Need created order id from test 4');

    const resPay = await fetch(`${baseUrl}/checkout/${createdOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiApp: 'phonepe',
        amount: 2949,
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
