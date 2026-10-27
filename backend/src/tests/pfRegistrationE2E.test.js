import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { isSupabaseConfigured, supabase } from '../database/supabaseClient.js';
import pfRoutes from '../routes/registrations/pf-registration/index.js';

describe('PF (EPF) Registration Module - End-to-End & Database Verification', () => {
  let app;
  let server;
  let baseUrl;
  let createdOrderId;
  let createdAppId;

  before(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/pf', pfRoutes);

    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}/api/v1/pf`;
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

  test('3. Quotation API (POST /quote) - Computes exact fees & 12% statutory splits', async () => {
    const res = await fetch(`${baseUrl}/quote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plan: 'standard',
        monthlyWage: 15000,
        includeLabourWelfare: true,
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.quote.professionalFee, 2999);
    assert.strictEqual(data.quote.gstOnFee, 540); // 18% of 2999
    assert.strictEqual(data.quote.labourWelfare, 120);
    assert.strictEqual(data.quote.gstOnLabour, 22);
    assert.strictEqual(data.quote.totalAmount, 3681); // 2999 + 540 + 120 + 22 = 3681

    // Verify statutory EPFO split on ₹15,000 wage ceiling
    const stat = data.quote.statutoryContribution;
    assert.strictEqual(stat.wageBase, 15000);
    assert.strictEqual(stat.employeeDeduction, 1800); // 12% of 15,000 = 1,800
    assert.strictEqual(stat.employerEpf, 551); // 3.67% of 15,000 = 550.5 -> 551
    assert.strictEqual(stat.employerEps, 1250); // 8.33% of 15,000 = 1249.5 -> 1250
    assert.strictEqual(stat.employerEdli, 75); // 0.50% of 15,000 = 75
    assert.strictEqual(stat.employerAdmin, 75); // 0.50% of 15,000 = 75
  });

  test('4. Draft Order API (POST /checkout/draft) - Creates and persists EPF application & order to DB', async () => {
    const res = await fetch(`${baseUrl}/checkout/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Rohan Sharma',
        email: 'rohan.sharma@techcorp.in',
        phone: '9876543210',
        whatsappOptIn: true,
        businessName: 'TechCorp Solutions Private Limited',
        cinGstin: 'U72200KA2023PTC123456',
        wantDbsAccount: 'yes',
        entityType: 'company',
        coverageType: 'mandatory',
        employeeCount: 25,
        eligibleWageEmployees: 20,
        entityPan: 'AAACT1234F',
        state: 'Karnataka',
        authorizedSignatory: 'Rohan Sharma',
        signatoryDesignation: 'Director',
        plan: 'standard',
        includeLabourWelfare: true,
        addonDsc: true,
      }),
    });

    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.orderId, 'Order must have an ID');
    assert.ok(data.applicationId, 'Application must have an ID');
    assert.strictEqual(data.plan, 'standard');

    // Subtotal: 2999 (Standard) + 1499 (Addon DSC) = 4498
    // GST on fee: 18% of 4498 = 810
    // Labour welfare: 120 + 22 = 142
    // Grand Total: 4498 + 810 + 142 = 5450
    assert.strictEqual(data.pricing.subtotal, 4498);
    assert.strictEqual(data.pricing.totalAmount, 5450);

    createdOrderId = data.orderId;
    createdAppId = data.applicationId;

    // Verify DB persistence
    const savedApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.ok(savedApp, 'Saved application must exist in db');
    assert.strictEqual(savedApp.module_type, 'PF');
    assert.strictEqual(savedApp.fields_data.businessName, 'TechCorp Solutions Private Limited');
    assert.strictEqual(savedApp.fields_data.employeeCount, 25);
    assert.strictEqual(savedApp.fields_data.cinGstin, 'U72200KA2023PTC123456');
    assert.strictEqual(savedApp.fields_data.wantDbsAccount, 'yes');
  });

  test('5. Order Retrieval API (GET /checkout/:orderId) - Returns persisted order with details', async () => {
    assert.ok(createdOrderId, 'OrderId must exist from previous step');
    const res = await fetch(`${baseUrl}/checkout/${createdOrderId}`);

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.order.id, createdOrderId);
    assert.strictEqual(data.order.customer.email, 'rohan.sharma@techcorp.in');
    assert.strictEqual(data.application.fields_data.entityPan, 'AAACT1234F');
  });

  test('6. Payment API (POST /checkout/:orderId/pay) - Marks order PAID and assigns Labour Law CA desk', async () => {
    assert.ok(createdOrderId, 'OrderId must exist from previous step');
    const res = await fetch(`${baseUrl}/checkout/${createdOrderId}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethod: 'UPI',
        upiApp: 'phonepe',
        transactionId: 'BFP-TXN-EPF-998877',
        amount: 5450,
      }),
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.receipt.status, 'PAID');
    assert.strictEqual(data.receipt.transactionId, 'BFP-TXN-EPF-998877');
    assert.strictEqual(data.receipt.caAssigned, 'CS Rajesh Varma (Sr. Labour Law Officer)');

    // Verify DB update
    const paidOrder = db.getOrders().find((o) => o.id === createdOrderId);
    assert.strictEqual(paidOrder.status, 'PAID');

    const updatedApp = db.getApplications().find((a) => a.id === createdAppId);
    assert.strictEqual(updatedApp.status, 'UNDER_REVIEW');
    assert.strictEqual(updatedApp.payment_completed, true);
    assert.strictEqual(updatedApp.assigned_officer, 'CS Rajesh Varma (Sr. Labour Law Officer)');
  });
});
