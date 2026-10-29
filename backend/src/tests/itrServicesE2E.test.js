import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { ENV } from '../config/env.js';
import { generateToken } from '../middleware/auth.js';
import itrServicesRoutes from '../routes/registrations/itr-services/index.js';
import {
  ITR_CONSULTATION_FEE,
  ITR_SERVICES,
  LANGUAGES,
  SOURCES_OF_INCOME,
  filingYears,
} from '../routes/registrations/itr-services/service.js';
import { computeQuote } from '../routes/registrations/itr-services/quote.js';
import { ITR_SERVICE_CONFIGS } from '../../../frontend/src/pages/itr-services/configs/index.js';
import { ITR_SERVICE_ROUTES } from '../../../frontend/src/pages/itr-services/routes.js';
import {
  ITR_CONSULTATION_FEE as FRONTEND_FEE,
  LANGUAGE_OPTIONS,
} from '../../../frontend/src/pages/itr-services/common.js';
import { filingYears as frontendFilingYears } from '../../../frontend/src/pages/itr-services/years.js';
import { computeQuote as computeFrontendQuote } from '../../../frontend/src/pages/itr-services/quote.js';
import { SERVICES } from '../../../frontend/src/data/serviceCatalog.js';

const SLUGS = Object.keys(ITR_SERVICES);
const [SERVICE, SOLE_PROPRIETORSHIP] = ['itr-filing', 'itr-sole-proprietorship'];

const tokenFor = (id, role = 'CUSTOMER') =>
  generateToken({ id, email: `${id}@example.com`, phone: '9876543210', role, full_name: id });

describe('ITR service flows - config consistency', () => {
  test('frontend configs, routes, catalog and backend list the same live services', () => {
    const backend = [...SLUGS].sort();
    assert.deepEqual(ITR_SERVICE_CONFIGS.map((c) => c.slug).sort(), backend);
    assert.deepEqual(ITR_SERVICE_ROUTES.map((r) => r.slug).sort(), backend);
    assert.equal(FRONTEND_FEE, ITR_CONSULTATION_FEE);
    for (const config of ITR_SERVICE_CONFIGS) {
      assert.equal(config.fee, ITR_CONSULTATION_FEE, `${config.slug} fee`);
      assert.equal(config.name, ITR_SERVICES[config.slug].name, `${config.slug} name`);
      const entry = SERVICES.find((s) => s.slug === config.slug);
      assert.ok(entry, `${config.slug} missing from the service catalog`);
      assert.equal(entry.status, 'live', `${config.slug} should be live`);
      assert.equal(entry.path, `/services/${config.slug}`);
      assert.equal(entry.fee, ITR_CONSULTATION_FEE, `${config.slug} catalog price`);
    }
  });

  test('route aliases are unique and never shadow another service', () => {
    const urls = ITR_SERVICE_ROUTES.flatMap((r) => [r.slug, ...(r.aliases || [])]);
    assert.equal(new Set(urls).size, urls.length);
    for (const alias of ITR_SERVICE_ROUTES.flatMap((r) => r.aliases || [])) {
      const owner = SERVICES.find((s) => s.slug === alias);
      assert.equal(owner, undefined, `${alias} is already a catalog slug`);
    }
  });

  test('questionnaire options match what the backend accepts', () => {
    for (const config of ITR_SERVICE_CONFIGS) {
      const [income, year] = config.questionnaire.questions;
      assert.equal(income.id, 'sourceOfIncome');
      assert.deepEqual(income.options.map((o) => o.value), SOURCES_OF_INCOME, config.slug);
      assert.equal(year.id, 'financialYear');
      assert.deepEqual(year.options.map((o) => o.value), filingYears().map((y) => y.value), config.slug);
    }
  });

  test('language options match what the backend accepts', () => {
    assert.deepEqual(LANGUAGE_OPTIONS.map((o) => o.value), LANGUAGES);
    const extra = ITR_SERVICE_CONFIGS.find((c) => c.slug === SOLE_PROPRIETORSHIP).hero.extraField;
    assert.equal(extra.id, 'language');
    assert.deepEqual(extra.options.map((o) => o.value), LANGUAGES);
    assert.equal(ITR_SERVICE_CONFIGS.find((c) => c.slug === SERVICE).hero.extraField, undefined);
  });

  test('frontend and backend offer the same financial years on any date', () => {
    const dates = [
      new Date(2026, 6, 26), // 26 Jul 2026
      new Date(2026, 9, 27),
      new Date(2026, 11, 31),
      new Date(2027, 0, 1),
      new Date(2027, 2, 31),
      new Date(2027, 3, 1),
    ];
    for (const date of dates) {
      assert.deepEqual(
        frontendFilingYears(date).map((y) => [y.value, y.returnType]),
        filingYears(date).map((y) => [y.value, y.returnType]),
        date.toDateString()
      );
    }
  });

  test('filing years follow the statutory return type', () => {
    const typesOn = (date) => filingYears(date).map((y) => `${y.value} ${y.returnType}`);
    // Before 1 April the latest completed year is still the one that ended the previous March.
    assert.deepEqual(typesOn(new Date(2026, 9, 27)), ['2025-26 ITR', '2024-25 ITR-U', '2023-24 ITR-U', '2022-23 ITR-U']);
    // Belated and revised returns for AY 2026-27 close on 31 Dec 2026.
    assert.equal(typesOn(new Date(2026, 11, 31))[0], '2025-26 ITR');
    assert.equal(typesOn(new Date(2027, 0, 1))[0], '2025-26 ITR-U');
    assert.equal(typesOn(new Date(2027, 2, 31))[0], '2025-26 ITR-U');
    assert.deepEqual(typesOn(new Date(2027, 3, 1)), ['2026-27 ITR', '2025-26 ITR-U', '2024-25 ITR-U', '2023-24 ITR-U']);
  });

  test('frontend labels read like the screen: FY, AY and form type', () => {
    assert.equal(frontendFilingYears(new Date(2026, 9, 27))[0].label, 'FY 2025-2026 (AY 2026-2027) [ITR]');
    assert.equal(frontendFilingYears(new Date(2026, 9, 27))[3].label, 'FY 2022-2023 (AY 2023-2024) [ITR-U]');
  });

  test('frontend and backend compute identical totals', () => {
    for (const fee of [ITR_CONSULTATION_FEE, 999, 1]) {
      assert.deepEqual(computeFrontendQuote(fee), computeQuote(fee));
    }
  });

  test('known total: GST is 18% of the consultation fee', () => {
    // 2499 x 18% = 449.82, rounded to 450
    assert.deepEqual(computeQuote(2499), { consultationFee: 2499, gst: 450, totalAmount: 2949 });
  });
});

describe('ITR service flows - checkout API', () => {
  let server;
  let baseUrl;
  const createdOrders = new Set();
  const createdApps = new Set();
  const realSimulatedPayments = ENV.ALLOW_SIMULATED_PAYMENTS;
  const latestYear = filingYears()[0];

  const post = (path, body, token) =>
    fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify(body),
    });

  const createDraft = async (slug, overrides = {}, token) => {
    const res = await post(
      `/${slug}/checkout/draft`,
      {
        email: 'owner@example.com',
        phone: '9876543210',
        cityPincode: 'Pune 411001',
        sourceOfIncome: 'salary',
        financialYear: latestYear.value,
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

  const pay = (slug, orderId, token, body = { paymentMethod: 'upi', upiApp: 'phonepe' }) =>
    post(`/${slug}/checkout/${orderId}/pay`, body, token);

  before(async () => {
    ENV.ALLOW_SIMULATED_PAYMENTS = true;
    const app = express();
    app.use(express.json());
    app.use('/api/v1/itr-services', itrServicesRoutes);
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        baseUrl = `http://127.0.0.1:${server.address().port}/api/v1/itr-services`;
        resolve();
      });
    });
  });

  after(async () => {
    ENV.ALLOW_SIMULATED_PAYMENTS = realSimulatedPayments;
    if (server) await new Promise((resolve) => server.close(resolve));
    db.saveApplications(db.getApplications().filter((a) => !createdApps.has(a.id)));
    db.saveOrders(db.getOrders().filter((o) => !createdOrders.has(o.id)));
    db.saveCaseEvents(db.getCaseEvents().filter((e) => !createdApps.has(e.application_id)));
    db.saveNotifications(db.getNotifications().filter((n) => !createdOrders.has(n.order_id)));
  });

  test('every service: draft creates a pending order for the quoted amount, payment hands it to the CA desk', async () => {
    for (const slug of SLUGS) {
      const { res, data } = await createDraft(slug, { sourceOfIncome: 'capital-gains' });
      assert.equal(res.status, 201, slug);
      assert.equal(data.order.amount, 2949);
      assert.equal(data.order.status, 'PENDING');
      assert.deepEqual(data.quote, { consultationFee: 2499, gst: 450, totalAmount: 2949 });
      assert.match(data.applicationNumber, /^ITR\d{6}$/);

      const draftApp = db.getApplications().find((a) => a.id === data.order.application_id);
      assert.equal(draftApp.payment_completed, false);
      assert.equal(draftApp.service_id, slug);
      assert.equal(draftApp.module_type, 'ITR');
      assert.ok(draftApp.service_name.startsWith(ITR_SERVICES[slug].name));
      assert.equal(draftApp.fields_data.sourceOfIncome, 'capital-gains');
      assert.equal(draftApp.fields_data.financialYear, latestYear.value);
      assert.equal(draftApp.fields_data.returnType, latestYear.returnType);

      const payRes = await pay(slug, data.order.id);
      assert.equal(payRes.status, 200, `${slug} pay`);
      const paid = await payRes.json();
      assert.equal(paid.order.status, 'PAID');
      assert.equal(paid.order.payment_status, 'COMPLETED');
      assert.equal(paid.order.paid_amount, 2949);
      assert.equal(paid.application.status, 'SUBMITTED');
      assert.equal(paid.application.internal_status, 'CA_REVIEW');
      assert.equal(paid.application.customer_status, 'CA Processing');
      assert.equal(paid.application.payment_completed, true);
      assert.ok(db.getCaseEvents().some((e) => e.application_id === data.order.application_id));
      assert.ok(db.getNotifications().some((n) => n.dedup_key === `NEW_PAID_CASE_${data.order.id}`));
    }
  });

  test('preferred language is stored, defaults to English and is validated', async () => {
    const stored = async (overrides) => {
      const { res, data } = await createDraft(SOLE_PROPRIETORSHIP, overrides);
      assert.equal(res.status, 201);
      return db.getApplications().find((a) => a.id === data.order.application_id).fields_data.language;
    };
    assert.equal(await stored({ language: 'tamil' }), 'tamil');
    assert.equal(await stored({ language: 'hindi' }), 'hindi');
    assert.equal(await stored({}), 'english');
    for (const language of ['Klingon', 'English', '', null, '__proto__']) {
      assert.equal((await createDraft(SOLE_PROPRIETORSHIP, { language })).res.status, 400, String(language));
    }
  });

  test('the amount charged is decided by the server, not the request', async () => {
    const { res, data } = await createDraft(SERVICE, { amount: 1, consultationFee: 1, totalAmount: 1 });
    assert.equal(res.status, 201);
    assert.equal(data.order.amount, 2949);
    const payRes = await pay(SERVICE, data.order.id, undefined, { paymentMethod: 'upi', amount: 1 });
    assert.equal((await payRes.json()).order.paid_amount, 2949);
  });

  test('every payment method on the screen is accepted', async () => {
    for (const paymentMethod of ['upi', 'card', 'netbanking', 'emi']) {
      const { data } = await createDraft(SERVICE);
      const res = await pay(SERVICE, data.order.id, undefined, { paymentMethod });
      assert.equal(res.status, 200, paymentMethod);
      assert.equal((await res.json()).order.payment_method, paymentMethod.toUpperCase());
    }
  });

  test('every income source and financial year on the screen is accepted', async () => {
    for (const sourceOfIncome of SOURCES_OF_INCOME) {
      assert.equal((await createDraft(SERVICE, { sourceOfIncome })).res.status, 201, sourceOfIncome);
    }
    for (const { value, returnType } of filingYears()) {
      const { res, data } = await createDraft(SOLE_PROPRIETORSHIP, { financialYear: value });
      assert.equal(res.status, 201, value);
      const app = db.getApplications().find((a) => a.id === data.order.application_id);
      assert.equal(app.fields_data.returnType, returnType);
    }
  });

  test('draft validation', async () => {
    for (const slug of SLUGS) {
      assert.equal((await createDraft(slug, { email: 'not-an-email' })).res.status, 400);
      assert.equal((await createDraft(slug, { phone: '12345' })).res.status, 400);
      assert.equal((await createDraft(slug, { phone: '5876543210' })).res.status, 400);
      assert.equal((await createDraft(slug, { cityPincode: '   ' })).res.status, 400);
      assert.equal((await createDraft(slug, { sourceOfIncome: 'lottery' })).res.status, 400);
      assert.equal((await createDraft(slug, { sourceOfIncome: undefined })).res.status, 400);
      assert.equal((await createDraft(slug, { sourceOfIncome: '__proto__' })).res.status, 400);
      assert.equal((await createDraft(slug, { financialYear: '2010-11' })).res.status, 400);
      assert.equal((await createDraft(slug, { financialYear: 'FY 2025-2026' })).res.status, 400);
      assert.equal((await createDraft(slug, { financialYear: undefined })).res.status, 400);
      assert.equal((await createDraft(slug, { financialYear: '__proto__' })).res.status, 400);
    }
    assert.equal((await post('/itr-unknown/checkout/draft', {})).status, 404);
    assert.equal((await post('/__proto__/checkout/draft', {})).status, 404);
    assert.equal((await post('/constructor/checkout/draft', {})).status, 404);
  });

  test('paying twice returns the original payment without duplicating events', async () => {
    const { data } = await createDraft(SOLE_PROPRIETORSHIP);
    const first = await (await pay(SOLE_PROPRIETORSHIP, data.order.id)).json();
    const secondRes = await pay(SOLE_PROPRIETORSHIP, data.order.id);
    assert.equal(secondRes.status, 200);
    const second = await secondRes.json();
    assert.equal(second.transactionId, first.transactionId);
    assert.equal(db.getCaseEvents().filter((e) => e.application_id === data.order.application_id).length, 1);
    assert.equal(db.getNotifications().filter((n) => n.dedup_key === `NEW_PAID_CASE_${data.order.id}`).length, 1);
  });

  test('payment rejects unknown orders, other services and bad methods', async () => {
    assert.equal((await pay(SERVICE, 'missing-order')).status, 404);
    assert.equal((await pay('itr-unknown', 'missing-order')).status, 404);
    const { data } = await createDraft(SERVICE);
    assert.equal((await pay(SERVICE, data.order.id, undefined, { paymentMethod: 'bitcoin' })).status, 400);
    assert.equal((await pay(SERVICE, data.order.id, undefined, { paymentMethod: '__proto__' })).status, 400);

    // An order belongs to the service it was created for.
    assert.equal((await pay(SOLE_PROPRIETORSHIP, data.order.id)).status, 404);

    // An order created by another product (here GST) is not payable through these routes.
    const orders = db.getOrders();
    const foreign = { ...orders.find((o) => o.id === data.order.id), id: 'itr-test-foreign-order', service_id: 'gst-return' };
    orders.push(foreign);
    db.saveOrders(orders);
    createdOrders.add(foreign.id);
    assert.equal((await pay(SERVICE, foreign.id)).status, 404);
    assert.equal((await pay(SOLE_PROPRIETORSHIP, foreign.id)).status, 404);
  });

  test("a signed-in customer's order can only be paid by that customer", async () => {
    const owner = tokenFor('usr_itr_owner');
    const { data } = await createDraft(SERVICE, {}, owner);
    assert.equal(data.order.user_id, 'usr_itr_owner');
    assert.equal((await pay(SERVICE, data.order.id)).status, 403);
    assert.equal((await pay(SERVICE, data.order.id, tokenFor('usr_someone_else'))).status, 403);
    assert.equal((await pay(SERVICE, data.order.id, owner)).status, 200);
  });

  test('a guest order is claimed by the customer who pays for it', async () => {
    const { data } = await createDraft(SOLE_PROPRIETORSHIP);
    const paid = await (await pay(SOLE_PROPRIETORSHIP, data.order.id, tokenFor('usr_itr_claimer'))).json();
    assert.equal(paid.order.user_id, 'usr_itr_claimer');
    assert.equal(paid.application.user_id, 'usr_itr_claimer');
    assert.ok(db.getNotifications().some((n) => n.dedup_key === `PAYMENT_SUCCESS_${data.order.id}` && n.recipient_id === 'usr_itr_claimer'));
  });

  test('payments are refused when simulated payments are disabled', async () => {
    const { data } = await createDraft(SERVICE);
    ENV.ALLOW_SIMULATED_PAYMENTS = false;
    try {
      assert.equal((await pay(SERVICE, data.order.id)).status, 503);
    } finally {
      ENV.ALLOW_SIMULATED_PAYMENTS = true;
    }
    assert.equal(db.getOrders().find((o) => o.id === data.order.id).status, 'PENDING');
  });
});
