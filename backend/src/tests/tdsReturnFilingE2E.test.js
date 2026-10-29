import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { ENV } from '../config/env.js';
import { generateToken } from '../middleware/auth.js';
import tdsRoutes from '../routes/registrations/tds-return-filing/index.js';
import {
  FILING_FOR,
  LABOUR_WELFARE_FEE,
  RETURN_PERIODS,
  TDS_CONSULTATION_FEE,
  TDS_COUPON,
  TDS_SERVICE,
  financialYears,
} from '../routes/registrations/tds-return-filing/service.js';
import { clock, computeQuote, isCouponLive } from '../routes/registrations/tds-return-filing/quote.js';
import tdsConfig from '../../../frontend/src/pages/tds-return-filing/config.js';
import { TDS_ROUTE } from '../../../frontend/src/pages/tds-return-filing/routes.js';
import { ITR_SERVICE_ROUTES } from '../../../frontend/src/pages/itr-services/routes.js';
import { financialYears as frontendFinancialYears } from '../../../frontend/src/pages/tds-return-filing/years.js';
import * as frontendQuote from '../../../frontend/src/pages/tds-return-filing/quote.js';
import { SERVICES } from '../../../frontend/src/data/serviceCatalog.js';

const tokenFor = (id, role = 'CUSTOMER') =>
  generateToken({ id, email: `${id}@example.com`, phone: '9876543210', role, full_name: id });

// Before the offer ends, and after.
const DURING = new Date('2026-10-28T10:00:00+05:30');
const AFTER = new Date('2026-11-11T00:00:00+05:30');

describe('TDS return filing - config consistency', () => {
  test('frontend config, catalog and backend describe the same live service', () => {
    assert.equal(tdsConfig.slug, TDS_SERVICE.slug);
    assert.equal(tdsConfig.name, TDS_SERVICE.name);
    assert.equal(tdsConfig.fee, TDS_CONSULTATION_FEE);
    assert.equal(TDS_ROUTE.slug, TDS_SERVICE.slug);
    const entry = SERVICES.find((s) => s.slug === TDS_SERVICE.slug);
    assert.ok(entry, 'tds-return-filing missing from the service catalog');
    assert.equal(entry.status, 'live');
    assert.equal(entry.path, `/services/${TDS_SERVICE.slug}`);
  });

  test('route aliases never shadow a catalog service or an ITR flow', () => {
    const others = new Set(ITR_SERVICE_ROUTES.flatMap((r) => [r.slug, ...(r.aliases || [])]));
    for (const alias of TDS_ROUTE.aliases) {
      assert.ok(!others.has(alias), `${alias} is used by an ITR flow`);
      assert.equal(SERVICES.find((s) => s.slug === alias || (s.aliases || []).includes(alias)), undefined, `${alias} is a catalog slug`);
    }
  });

  test('questions and the return-period dropdown match what the backend accepts', () => {
    const [year, filingFor] = tdsConfig.questionnaire.questions;
    assert.equal(year.id, 'financialYear');
    assert.deepEqual(year.options.map((o) => o.value), financialYears().map((y) => y.value));
    assert.equal(filingFor.id, 'filingFor');
    assert.deepEqual(filingFor.options.map((o) => o.value), FILING_FOR);
    const period = tdsConfig.hero.extraField;
    assert.equal(period.id, 'returnPeriod');
    assert.deepEqual(period.options.map((o) => o.value), RETURN_PERIODS);
    assert.equal(tdsConfig.questionnaire.singlePage, true);
  });

  test('frontend and backend offer the same financial years on any date', () => {
    for (const date of [new Date(2026, 2, 31), new Date(2026, 3, 1), new Date(2026, 9, 28), new Date(2027, 0, 1)]) {
      assert.deepEqual(frontendFinancialYears(date).map((y) => y.value), financialYears(date).map((y) => y.value), date.toDateString());
    }
    assert.deepEqual(frontendFinancialYears(new Date(2026, 9, 28)).map((y) => y.label), ['FY 2025-2026', 'FY 2024-2025', 'FY 2023-2024']);
    // The current year is not offered until it has ended.
    assert.deepEqual(financialYears(new Date(2026, 2, 31)).map((y) => y.value), ['2024-25', '2023-24', '2022-23']);
    assert.deepEqual(financialYears(new Date(2026, 3, 1)).map((y) => y.value), ['2025-26', '2024-25', '2023-24']);
  });

  test('fees and the offer are identical on both sides', () => {
    assert.equal(frontendQuote.TDS_CONSULTATION_FEE, TDS_CONSULTATION_FEE);
    assert.equal(frontendQuote.LABOUR_WELFARE_FEE, LABOUR_WELFARE_FEE);
    assert.deepEqual(frontendQuote.TDS_COUPON, TDS_COUPON);
  });

  test('frontend and backend compute identical totals and offer status', () => {
    for (const couponApplied of [true, false]) {
      for (const includeLabourWelfare of [true, false]) {
        assert.deepEqual(
          frontendQuote.computeQuote({ couponApplied, includeLabourWelfare }),
          computeQuote({ couponApplied, includeLabourWelfare })
        );
      }
    }
    for (const date of [DURING, AFTER, new Date('2026-11-10T23:59:59+05:30'), new Date('2026-11-11T00:00:00+05:30')]) {
      assert.equal(frontendQuote.isCouponLive(date), isCouponLive(date), date.toISOString());
    }
  });

  test('known totals', () => {
    const total = (couponApplied, includeLabourWelfare) => computeQuote({ couponApplied, includeLabourWelfare }).totalAmount;
    assert.equal(total(true, true), 525); // 999 - 500 = 499, + 22 labour welfare + 4 GST on it
    assert.equal(total(true, false), 499);
    assert.equal(total(false, true), 1025);
    assert.equal(total(false, false), 999);
    assert.deepEqual(computeQuote({ couponApplied: true, includeLabourWelfare: true }), {
      consultationFee: 999,
      couponCode: 'MAKEININDIA',
      couponDiscount: 500,
      subTotal: 499,
      labourWelfare: 22,
      gstOnLabour: 4,
      taxesAndCharges: 26,
      totalAmount: 525,
    });
  });

  test('the offer is live up to its last second and the label counts the days left', () => {
    assert.equal(isCouponLive(new Date('2026-11-10T23:59:59+05:30')), true);
    assert.equal(isCouponLive(AFTER), false);
    const label = (iso) => frontendQuote.couponExpiryLabel(new Date(iso));
    assert.equal(label('2026-11-08T10:00:00+05:30'), 'expires in 3 days');
    assert.equal(label('2026-11-09T10:00:00+05:30'), 'expires in 2 days');
    assert.equal(label('2026-11-10T08:00:00+05:30'), 'expires today');
  });
});

describe('TDS return filing - checkout API', () => {
  let server;
  let baseUrl;
  const createdOrders = new Set();
  const createdApps = new Set();
  const realSimulatedPayments = ENV.ALLOW_SIMULATED_PAYMENTS;
  const realNow = clock.now;
  const latestYear = financialYears()[0].value;

  const post = (path, body, token) =>
    fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    });

  const createDraft = async (overrides = {}, token) => {
    const res = await post(
      '/checkout/draft',
      {
        email: 'owner@example.com',
        phone: '9876543210',
        cityPincode: 'Pune 411001',
        returnPeriod: 'q2',
        financialYear: latestYear,
        filingFor: 'business',
        couponCode: 'MAKEININDIA',
        ...overrides,
      },
      token
    );
    const data = await res.json();
    if (res.status === 201) {
      createdOrders.add(data.order.id);
      createdApps.add(data.order.application_id);
    }
    return { res, data };
  };

  const pay = (orderId, token, body = { paymentMethod: 'upi', upiApp: 'phonepe' }) =>
    post(`/checkout/${orderId}/pay`, body, token);

  before(async () => {
    ENV.ALLOW_SIMULATED_PAYMENTS = true;
    clock.now = () => DURING;
    const app = express();
    app.use(express.json());
    app.use('/api/v1/tds-return-filing', tdsRoutes);
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        baseUrl = `http://127.0.0.1:${server.address().port}/api/v1/tds-return-filing`;
        resolve();
      });
    });
  });

  after(async () => {
    ENV.ALLOW_SIMULATED_PAYMENTS = realSimulatedPayments;
    clock.now = realNow;
    if (server) await new Promise((resolve) => server.close(resolve));
    db.saveApplications(db.getApplications().filter((a) => !createdApps.has(a.id)));
    db.saveOrders(db.getOrders().filter((o) => !createdOrders.has(o.id)));
    db.saveCaseEvents(db.getCaseEvents().filter((e) => !createdApps.has(e.application_id)));
    db.saveNotifications(db.getNotifications().filter((n) => !createdOrders.has(n.order_id)));
  });

  test('draft creates a pending order for the discounted total, payment hands it to the CA desk', async () => {
    const { res, data } = await createDraft();
    assert.equal(res.status, 201);
    assert.equal(data.order.amount, 525);
    assert.equal(data.order.status, 'PENDING');
    assert.equal(data.quote.totalAmount, 525);
    assert.equal(data.quote.couponDiscount, 500);
    assert.match(data.applicationNumber, /^TDS\d{6}$/);

    const draftApp = db.getApplications().find((a) => a.id === data.order.application_id);
    assert.equal(draftApp.payment_completed, false);
    assert.equal(draftApp.service_id, 'tds-return-filing');
    assert.equal(draftApp.module_type, 'TDS');
    assert.equal(draftApp.service_name, `TDS Return Filing (FY ${latestYear}, Q2)`);
    assert.equal(draftApp.fields_data.returnPeriod, 'q2');
    assert.equal(draftApp.fields_data.financialYear, latestYear);
    assert.equal(draftApp.fields_data.filingFor, 'business');
    assert.equal(draftApp.fields_data.quote.couponCode, 'MAKEININDIA');

    const payRes = await pay(data.order.id);
    assert.equal(payRes.status, 200);
    const paid = await payRes.json();
    assert.equal(paid.order.status, 'PAID');
    assert.equal(paid.order.payment_status, 'COMPLETED');
    assert.equal(paid.order.paid_amount, 525);
    assert.equal(paid.application.status, 'SUBMITTED');
    assert.equal(paid.application.internal_status, 'CA_REVIEW');
    assert.equal(paid.application.payment_completed, true);
    assert.match(paid.transactionId, /^BFP-TDS-\d{6}$/);
    assert.ok(db.getCaseEvents().some((e) => e.application_id === data.order.application_id));
    assert.ok(db.getNotifications().some((n) => n.dedup_key === `NEW_PAID_CASE_${data.order.id}`));
  });

  test('the total follows the offer and the labour welfare choice, decided by the server', async () => {
    const amount = async (overrides) => (await createDraft(overrides)).data.order.amount;
    assert.equal(await amount({}), 525);
    assert.equal(await amount({ includeLabourWelfare: false }), 499);
    assert.equal(await amount({ couponCode: undefined }), 1025);
    assert.equal(await amount({ couponCode: undefined, includeLabourWelfare: false }), 999);
    assert.equal(await amount({ couponCode: 'makeinindia' }), 525);
    assert.equal(await amount({ couponCode: 'FREE500' }), 1025);
    assert.equal(await amount({ couponCode: '__proto__' }), 1025);
    // Amounts sent by the browser are ignored.
    const { data } = await createDraft({ amount: 1, totalAmount: 1, couponDiscount: 999 });
    assert.equal(data.order.amount, 525);
  });

  test('once the offer has ended the discount is dropped and the response says so', async () => {
    clock.now = () => AFTER;
    try {
      const { res, data } = await createDraft();
      assert.equal(res.status, 201);
      assert.equal(data.order.amount, 1025);
      assert.equal(data.quote.couponDiscount, 0);
      assert.equal(data.quote.couponCode, null);
    } finally {
      clock.now = () => DURING;
    }
  });

  test('card, net banking and UPI are accepted; EMI is not offered', async () => {
    for (const paymentMethod of ['upi', 'card', 'netbanking']) {
      const { data } = await createDraft();
      const res = await pay(data.order.id, undefined, { paymentMethod });
      assert.equal(res.status, 200, paymentMethod);
      assert.equal((await res.json()).order.payment_method, paymentMethod.toUpperCase());
    }
    const { data } = await createDraft();
    assert.equal((await pay(data.order.id, undefined, { paymentMethod: 'emi' })).status, 400);
    assert.equal((await pay(data.order.id, undefined, { paymentMethod: 'bitcoin' })).status, 400);
    assert.equal((await pay(data.order.id, undefined, { paymentMethod: '__proto__' })).status, 400);
  });

  test('every return period, financial year and filing type on the screen is accepted', async () => {
    for (const returnPeriod of RETURN_PERIODS) {
      assert.equal((await createDraft({ returnPeriod })).res.status, 201, returnPeriod);
    }
    for (const { value } of financialYears()) {
      assert.equal((await createDraft({ financialYear: value })).res.status, 201, value);
    }
    for (const filingFor of FILING_FOR) {
      assert.equal((await createDraft({ filingFor })).res.status, 201, filingFor);
    }
  });

  test('draft validation', async () => {
    assert.equal((await createDraft({ email: 'not-an-email' })).res.status, 400);
    assert.equal((await createDraft({ phone: '12345' })).res.status, 400);
    assert.equal((await createDraft({ phone: '5876543210' })).res.status, 400);
    assert.equal((await createDraft({ cityPincode: '   ' })).res.status, 400);
    assert.equal((await createDraft({ returnPeriod: 'q5' })).res.status, 400);
    assert.equal((await createDraft({ returnPeriod: 'Q1' })).res.status, 400);
    assert.equal((await createDraft({ returnPeriod: undefined })).res.status, 400);
    assert.equal((await createDraft({ returnPeriod: '__proto__' })).res.status, 400);
    assert.equal((await createDraft({ financialYear: '2010-11' })).res.status, 400);
    assert.equal((await createDraft({ financialYear: 'FY 2025-2026' })).res.status, 400);
    assert.equal((await createDraft({ financialYear: undefined })).res.status, 400);
    assert.equal((await createDraft({ filingFor: 'company' })).res.status, 400);
    assert.equal((await createDraft({ filingFor: undefined })).res.status, 400);
    assert.equal((await createDraft({ filingFor: '__proto__' })).res.status, 400);
  });

  test('paying twice returns the original payment without duplicating events', async () => {
    const { data } = await createDraft();
    const first = await (await pay(data.order.id)).json();
    const secondRes = await pay(data.order.id);
    assert.equal(secondRes.status, 200);
    const second = await secondRes.json();
    assert.equal(second.transactionId, first.transactionId);
    assert.equal(db.getCaseEvents().filter((e) => e.application_id === data.order.application_id).length, 1);
    assert.equal(db.getNotifications().filter((n) => n.dedup_key === `NEW_PAID_CASE_${data.order.id}`).length, 1);
  });

  test('payment rejects unknown orders and orders of other services', async () => {
    assert.equal((await pay('missing-order')).status, 404);
    const { data } = await createDraft();
    const orders = db.getOrders();
    const foreign = { ...orders.find((o) => o.id === data.order.id), id: 'tds-test-foreign-order', service_id: 'itr-filing' };
    orders.push(foreign);
    db.saveOrders(orders);
    createdOrders.add(foreign.id);
    assert.equal((await pay(foreign.id)).status, 404);
  });

  test("a signed-in customer's order can only be paid by that customer", async () => {
    const owner = tokenFor('usr_tds_owner');
    const { data } = await createDraft({}, owner);
    assert.equal(data.order.user_id, 'usr_tds_owner');
    assert.equal((await pay(data.order.id)).status, 403);
    assert.equal((await pay(data.order.id, tokenFor('usr_someone_else'))).status, 403);
    assert.equal((await pay(data.order.id, owner)).status, 200);
  });

  test('a guest order is claimed by the customer who pays for it', async () => {
    const { data } = await createDraft();
    const paid = await (await pay(data.order.id, tokenFor('usr_tds_claimer'))).json();
    assert.equal(paid.order.user_id, 'usr_tds_claimer');
    assert.equal(paid.application.user_id, 'usr_tds_claimer');
    assert.ok(db.getNotifications().some((n) => n.dedup_key === `PAYMENT_SUCCESS_${data.order.id}` && n.recipient_id === 'usr_tds_claimer'));
  });

  test('payments are refused when simulated payments are disabled', async () => {
    const { data } = await createDraft();
    ENV.ALLOW_SIMULATED_PAYMENTS = false;
    try {
      assert.equal((await pay(data.order.id)).status, 503);
    } finally {
      ENV.ALLOW_SIMULATED_PAYMENTS = true;
    }
    assert.equal(db.getOrders().find((o) => o.id === data.order.id).status, 'PENDING');
  });
});
