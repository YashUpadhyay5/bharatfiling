import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import trademarkRegistrationRoutes from '../routes/trademark/trademark-registration/index.js';

describe('Trademark Registration Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/trademark', trademarkRegistrationRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/trademark`;
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

  test('3. Quotation API (POST /quote/calculate) - Verifies statutory fee calculations', async () => {
    // 3A. Individual / MSME applicant with Standard Plan (₹1,199) and 1 class (₹4,500 govt fee)
    const resIndividual = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planId: 'standard',
        applicantType: 'individual',
        classesCount: 1,
      }),
    });
    assert.strictEqual(resIndividual.status, 200);
    const dataIndividual = await resIndividual.json();
    assert.strictEqual(dataIndividual.success, true);
    assert.strictEqual(dataIndividual.quote.professionalFee, 1199);
    assert.strictEqual(dataIndividual.quote.gstOnProfessional, 216); // 18% of 1199 = 215.82 -> 216
    assert.strictEqual(dataIndividual.quote.govtFeePerClass, 4500);
    assert.strictEqual(dataIndividual.quote.totalGovtFee, 4500);
    assert.strictEqual(dataIndividual.quote.totalPayable, 1199 + 216 + 4500); // ₹5,915
    assert.strictEqual(dataIndividual.quote.isMsmeRebateApplied, true);

    // 3A-2. Express Plan (₹1,999) from Screenshot 3
    const resExpress = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planId: 'express',
        applicantType: 'individual',
        classesCount: 1,
      }),
    });
    assert.strictEqual(resExpress.status, 200);
    const dataExpress = await resExpress.json();
    assert.strictEqual(dataExpress.quote.professionalFee, 1999);
    assert.strictEqual(dataExpress.quote.gstOnProfessional, 360);

    // 3B. Starter Plan (₹1,199) with Diwali discount coupon
    const resStarterCoupon = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planId: 'starter',
        applicantType: 'individual',
        classesCount: 1,
        coupon: 'DIWALI',
      }),
    });
    assert.strictEqual(resStarterCoupon.status, 200);
    const dataStarterCoupon = await resStarterCoupon.json();
    assert.strictEqual(dataStarterCoupon.success, true);
    assert.strictEqual(dataStarterCoupon.quote.baseProfessionalFee, 1199);
    assert.strictEqual(dataStarterCoupon.quote.discount, 480); // 40% of 1199 = 479.6 -> 480
    assert.strictEqual(dataStarterCoupon.quote.professionalFee, 1199 - 480); // 719

    // 3C. Corporate / Company applicant (₹9,000 govt fee per class) across 2 classes
    const resCompany = await fetch(`${baseUrl}/quote/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planId: 'defense',
        applicantType: 'company',
        classesCount: 2,
      }),
    });
    assert.strictEqual(resCompany.status, 200);
    const dataCompany = await resCompany.json();
    assert.strictEqual(dataCompany.success, true);
    assert.strictEqual(dataCompany.quote.govtFeePerClass, 9000);
    assert.strictEqual(dataCompany.quote.totalGovtFee, 18000);
    assert.strictEqual(dataCompany.quote.isMsmeRebateApplied, false);
  });

  test('4. Checkout Draft API (POST /checkout/draft) - Validates inputs and stores lead', async () => {
    // 4A. Rejects missing / invalid email
    const resBadEmail = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'invalid-email', phone: '9876543210' }),
    });
    assert.strictEqual(resBadEmail.status, 400);

    // 4B. Rejects invalid mobile number (< 10 digits)
    const resBadPhone = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'client@example.com', phone: '123' }),
    });
    assert.strictEqual(resBadPhone.status, 400);

    // 4C. Successfully creates valid draft
    const resValidDraft = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'yashupadhyay@example.com',
        phone: '7668976193',
        whatsappUpdates: true,
        brandName: 'BHARATFILING',
        trademarkType: 'word',
        applicantType: 'individual',
        planId: 'standard',
        selectedClassId: 25,
      }),
    });
    assert.strictEqual(resValidDraft.status, 200);
    const draftData = await resValidDraft.json();
    assert.strictEqual(draftData.success, true);
    assert.ok(draftData.order?.id, 'Draft should return order id');
    assert.ok(draftData.application?.id, 'Draft should return application id');
    assert.strictEqual(draftData.application.module_type, 'TRADEMARK');
    assert.strictEqual(draftData.application.service_id, 'trademark-registration');

    createdOrderId = draftData.order.id;
    createdAppId = draftData.application.id;

    // Verify stored in DB
    const dbApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(dbApp, 'Application should persist in database');
    assert.strictEqual(dbApp.fields_data.brandName, 'BHARATFILING');
    assert.strictEqual(dbApp.fields_data.email, 'yashupadhyay@example.com');
  });

  test('5. Payment Simulation API (POST /checkout/:orderId/pay) - Marks order PAID & assigns attorney', async () => {
    assert.ok(createdOrderId, 'Need created order id from test 4');

    const resPay = await fetch(`${baseUrl}/checkout/${createdOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiApp: 'phonepe',
        amount: 6859,
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
