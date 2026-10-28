import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import esiRoutes from '../routes/registrations/esi-registration/index.js';

describe('ESI (ESIC) Registration Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/esi', esiRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/esi`;
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

  test('3. Quotation API (POST /quote) - Computes exact fees for all 3 ESI plans & 4.0% statutory splits', async () => {
    // 3A. Service 1: Starter (17-Digit ESIC Code) — ₹1,999
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
    assert.strictEqual(starterData.quote.professionalFee, 1999);
    assert.strictEqual(starterData.quote.gstOnFee, 360);
    assert.strictEqual(starterData.quote.labourWelfare, 120);
    assert.strictEqual(starterData.quote.gstOnLabour, 22);
    assert.strictEqual(starterData.quote.totalAmount, 2501);

    // 3B. Service 2: Standard (ESIC Code + 3 Months Monthly Return) — ₹2,999
    const standardRes = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'standard',
        employeeCount: 12,
        monthlyWage: 15000,
        includeLabourWelfare: true,
      }),
    });
    assert.strictEqual(standardRes.status, 200);
    const standardData = await standardRes.json();
    assert.strictEqual(standardData.success, true);
    assert.strictEqual(standardData.quote.professionalFee, 2999);
    assert.strictEqual(standardData.quote.gstOnFee, 540);
    assert.strictEqual(standardData.quote.labourWelfare, 120);
    assert.strictEqual(standardData.quote.gstOnLabour, 22);
    assert.strictEqual(standardData.quote.totalAmount, 3681);

    // Verify statutory ESIC 4.0% split (0.75% employee + 3.25% employer)
    const stat = standardData.quote.statutoryEst;
    assert.strictEqual(stat.employeeCount, 12);
    assert.strictEqual(stat.wagePerEmployee, 15000);
    assert.strictEqual(stat.monthlyWageBill, 180000); // 12 * 15,000 = 180,000
    assert.strictEqual(stat.employeeRate, '0.75%');
    assert.strictEqual(stat.employerRate, '3.25%');
    assert.strictEqual(stat.totalRate, '4.00%');
    assert.strictEqual(stat.monthlyEmployeeShare, 1350); // 0.75% of 180,000 = 1,350
    assert.strictEqual(stat.monthlyEmployerShare, 5850); // 3.25% of 180,000 = 5,850
    assert.strictEqual(stat.totalMonthlyStatutoryDeposit, 7200); // 1,350 + 5,850 = 7,200

    // 3C. Service 3: ESI + PF Compliance Combo — ₹4,499
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
    assert.strictEqual(comboData.quote.professionalFee, 4499);
    assert.strictEqual(comboData.quote.gstOnFee, 810);
    assert.strictEqual(comboData.quote.labourWelfare, 120);
    assert.strictEqual(comboData.quote.gstOnLabour, 22);
    assert.strictEqual(comboData.quote.totalAmount, 5451);
  });

  test('4. Plans API (GET /plans) - Returns public packages', async () => {
    const res = await fetch(`${baseUrl}/plans`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.plans.length, 3);
    assert.strictEqual(data.plans[0].id, 'starter');
    assert.strictEqual(data.plans[1].id, 'standard');
    assert.strictEqual(data.plans[2].id, 'combo');
  });

  test('5. Draft Checkout Creation (POST /checkout/draft) - Persists ESI record and order', async () => {
    const payload = {
      name: 'Yash Upadhyay',
      email: 'ya*****************@com',
      phone: '+91-*******193',
      businessName: 'Apex Innovations Pvt Ltd',
      cinGstin: '29ABCDE1234F1Z5',
      wantDbsAccount: 'yes',
      employeeCoverage: 'ten_plus',
      entityType: 'private_limited',
      employeeCount: 15,
      eligibleWageEmployees: 12,
      plan: 'standard',
      includeLabourWelfare: true,
      addonDsc: false,
    };

    const res = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.application?.id, 'Draft application must return an ID');
    assert.ok(data.order?.id, 'Draft order must return an ID');
    assert.strictEqual(data.application.module_type, 'ESI');
    assert.strictEqual(data.application.status, 'DRAFT');
    assert.strictEqual(data.order.status, 'PENDING');
    assert.strictEqual(data.order.amount, 3681);

    createdAppId = data.application.id;
    createdOrderId = data.order.id;
  });

  test('6. Database Persistence Verification - Verifies ESI order in DB collection', () => {
    const orders = db.getOrders();
    const app = db.getApplications().find((a) => a.id === createdAppId);
    const order = orders.find((o) => o.id === createdOrderId);

    assert.ok(app, 'Created ESI application must exist in db.getApplications()');
    assert.ok(order, 'Created ESI order must exist in db.getOrders()');
    assert.strictEqual(app.fields_data.businessName, 'Apex Innovations Pvt Ltd');
    assert.strictEqual(app.fields_data.cinGstin, '29ABCDE1234F1Z5');
    assert.strictEqual(app.fields_data.employeeCoverage, 'ten_plus');
    assert.strictEqual(order.amount, 3681);
  });

  test('7. Resume Draft by ID (GET /checkout/draft/:id)', async () => {
    const res = await fetch(`${baseUrl}/checkout/draft/${createdOrderId}`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.order.id, createdOrderId);
    assert.strictEqual(data.application.id, createdAppId);
  });

  test('8. Order Payment Execution (POST /checkout/:orderId/pay) - Marks order PAID and assigns CA desk', async () => {
    const payRes = await fetch(`${baseUrl}/checkout/${createdOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiApp: 'phonepe',
        transactionId: 'BFP-ESI-TEST-998877',
        amount: 3681,
      }),
    });

    assert.strictEqual(payRes.status, 200);
    const payData = await payRes.json();
    assert.strictEqual(payData.success, true);
    assert.strictEqual(payData.receipt.status, 'PAID');
    assert.strictEqual(payData.receipt.transactionId, 'BFP-ESI-TEST-998877');
    assert.ok(payData.receipt.caAssigned.includes('Dr. & CS Shweta Iyer'));

    // Verify DB states after payment
    const updatedOrder = db.getOrders().find((o) => o.id === createdOrderId);
    const updatedApp = db.getApplications().find((a) => a.id === createdAppId);

    assert.strictEqual(updatedOrder.status, 'PAID');
    assert.strictEqual(updatedOrder.payment_status, 'PAID');
    assert.strictEqual(updatedApp.status, 'UNDER_REVIEW');
    assert.strictEqual(updatedApp.payment_completed, true);
    assert.ok(updatedApp.assigned_officer.includes('Dr. & CS Shweta Iyer'));
  });

  test('9. Tax Invoice Receipt Retrieval (GET /checkout/:orderId/receipt)', async () => {
    const res = await fetch(`${baseUrl}/checkout/${createdOrderId}/receipt`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.receipt.status, 'PAID');
    assert.strictEqual(data.receipt.transactionId, 'BFP-ESI-TEST-998877');
    assert.strictEqual(data.receipt.businessName, 'Apex Innovations Pvt Ltd');
    assert.ok(data.receipt.assignedOfficer.includes('Dr. & CS Shweta Iyer'));
  });
});
