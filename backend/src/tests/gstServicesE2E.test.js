import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { ENV } from '../config/env.js';
import { generateToken } from '../middleware/auth.js';
import gstServicesRoutes from '../routes/registrations/gst-services/index.js';
import { GST_SERVICES } from '../routes/registrations/gst-services/services.js';
import { computeQuote } from '../routes/registrations/gst-services/quote.js';
import { GST_SERVICE_CONFIGS } from '../../../frontend/src/pages/gst-services/configs/index.js';
import { GST_SERVICE_ROUTES } from '../../../frontend/src/pages/gst-services/routes.js';
import { computeQuote as computeFrontendQuote } from '../../../frontend/src/pages/gst-services/quote.js';
import { SERVICES } from '../../../frontend/src/data/serviceCatalog.js';

const SLUGS = Object.keys(GST_SERVICES);

const validAnswers = (fields) =>
  Object.fromEntries(
    Object.entries(fields).map(([key, spec]) => {
      if (spec.type === 'text') return [key, 'Retail'];
      if (spec.type === 'multi') return [key, [spec.values[0]]];
      return [key, spec.values[0]];
    })
  );

const tokenFor = (id, role = 'CUSTOMER') =>
  generateToken({ id, email: `${id}@example.com`, phone: '9876543210', role, full_name: id });

describe('GST service flows - config consistency', () => {
  test('frontend configs, routes, catalog and backend list the same live services', () => {
    const backend = [...SLUGS].sort();
    assert.deepEqual(GST_SERVICE_CONFIGS.map((c) => c.slug).sort(), backend);
    assert.deepEqual(GST_SERVICE_ROUTES.map((r) => r.slug).sort(), backend);
    for (const slug of SLUGS) {
      const entry = SERVICES.find((s) => s.slug === slug);
      assert.ok(entry, `${slug} missing from the service catalog`);
      assert.equal(entry.status, 'live', `${slug} should be live`);
      assert.equal(entry.path, `/services/${slug}`);
      const cheapest = Math.min(...Object.values(GST_SERVICES[slug].plans).map((p) => p.fee));
      assert.equal(entry.fee, cheapest, `${slug} catalog price should be the starting plan price`);
    }
  });

  test('plan prices and answer options match between frontend and backend', () => {
    for (const config of GST_SERVICE_CONFIGS) {
      const service = GST_SERVICES[config.slug];
      assert.deepEqual(
        config.plans.items.map((p) => [p.id, p.price]),
        Object.entries(service.plans).map(([id, p]) => [id, p.fee]),
        `${config.slug} plan prices differ`
      );
      assert.ok(config.plans.items.some((p) => p.id === config.plans.defaultPlan), `${config.slug} default plan`);

      const frontendFields = {};
      for (const q of config.questionnaire.questions) {
        frontendFields[q.id] = q.type === 'suggest' ? { type: 'text' } : { type: 'choice', values: q.options.map((o) => o.value) };
        if (q.extra) frontendFields[q.extra.id] = { type: 'multi', values: q.extra.options.map((o) => o.value) };
      }
      assert.deepEqual(Object.keys(frontendFields).sort(), Object.keys(service.fields).sort(), `${config.slug} fields`);
      for (const [key, spec] of Object.entries(frontendFields)) {
        assert.equal(service.fields[key].type, spec.type, `${config.slug}.${key} type`);
        if (spec.values) assert.deepEqual([...spec.values].sort(), [...service.fields[key].values].sort(), `${config.slug}.${key} values`);
      }
    }
  });

  test('frontend and backend compute identical checkout totals', () => {
    for (const service of Object.values(GST_SERVICES)) {
      for (const plan of Object.values(service.plans)) {
        for (const labourWelfare of [true, false]) {
          assert.deepEqual(computeFrontendQuote(plan.fee, labourWelfare), computeQuote(plan.fee, labourWelfare));
        }
      }
    }
  });

  test('known totals', () => {
    assert.equal(computeQuote(999, true).totalAmount, 1238); // 999 + 180 GST + 50 labour welfare + 9 GST
    assert.equal(computeQuote(1999, true).totalAmount, 2418);
    assert.equal(computeQuote(1999, false).totalAmount, 2359);
  });
});

describe('GST service flows - checkout API', () => {
  let server;
  let baseUrl;
  const createdOrders = new Set();
  const createdApps = new Set();
  const realSimulatedPayments = ENV.ALLOW_SIMULATED_PAYMENTS;

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
        plan: 'premium',
        ...validAnswers(GST_SERVICES[slug].fields),
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
    app.use('/api/v1/gst-services', gstServicesRoutes);
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        baseUrl = `http://127.0.0.1:${server.address().port}/api/v1/gst-services`;
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

  test('every service: draft creates a pending order, payment hands it to the CA desk', async () => {
    for (const slug of SLUGS) {
      const { res, data } = await createDraft(slug);
      assert.equal(res.status, 201, `${slug} draft`);
      assert.equal(data.order.amount, computeQuote(GST_SERVICES[slug].plans.premium.fee).totalAmount);
      assert.equal(data.order.status, 'PENDING');
      const draftApp = db.getApplications().find((a) => a.id === data.order.application_id);
      assert.equal(draftApp.payment_completed, false);
      assert.equal(draftApp.service_id, slug);

      const payRes = await pay(slug, data.order.id);
      assert.equal(payRes.status, 200, `${slug} pay`);
      const paid = await payRes.json();
      assert.equal(paid.order.status, 'PAID');
      assert.equal(paid.order.payment_status, 'COMPLETED');
      assert.equal(paid.application.status, 'SUBMITTED');
      assert.equal(paid.application.internal_status, 'CA_REVIEW');
      assert.equal(paid.application.customer_status, 'CA Processing');
      assert.equal(paid.application.payment_completed, true);
      assert.ok(db.getCaseEvents().some((e) => e.application_id === data.order.application_id));
      assert.ok(db.getNotifications().some((n) => n.dedup_key === `NEW_PAID_CASE_${data.order.id}`));
    }
  });

  test('draft validation', async () => {
    assert.equal((await createDraft('gst-return', { email: 'not-an-email' })).res.status, 400);
    assert.equal((await createDraft('gst-return', { phone: '12345' })).res.status, 400);
    assert.equal((await createDraft('gst-return', { phone: '5876543210' })).res.status, 400);
    assert.equal((await createDraft('gst-return', { plan: 'platinum' })).res.status, 400);
    assert.equal((await createDraft('gst-return', { plan: 'constructor' })).res.status, 400);
    assert.equal((await createDraft('gst-return', { industryType: '   ' })).res.status, 400);
    assert.equal((await createDraft('gst-return', { turnover: '50Cr' })).res.status, 400);
    assert.equal((await createDraft('gstr-9-annual-return', { returnsStatus: undefined })).res.status, 400);

    const unknown = await post('/gst-unknown/checkout/draft', {});
    assert.equal(unknown.status, 404);
    const prototypeSlug = await post('/__proto__/checkout/draft', {});
    assert.equal(prototypeSlug.status, 404);
  });

  test('draft keeps only known checkbox values and honours a removed labour welfare fee', async () => {
    const { res, data } = await createDraft('gst-cancellation-revocation', {
      businessStatus: ['exploring', 'bogus', 'exploring'],
      includeLabourWelfare: false,
    });
    assert.equal(res.status, 201);
    assert.equal(data.order.amount, 2359);
    const app = db.getApplications().find((a) => a.id === data.order.application_id);
    assert.deepEqual(app.fields_data.businessStatus, ['exploring']);
  });

  test('paying twice returns the original payment without duplicating events', async () => {
    const { data } = await createDraft('gst-lut-exporters');
    const first = await (await pay('gst-lut-exporters', data.order.id)).json();
    const secondRes = await pay('gst-lut-exporters', data.order.id);
    assert.equal(secondRes.status, 200);
    const second = await secondRes.json();
    assert.equal(second.transactionId, first.transactionId);
    assert.equal(db.getCaseEvents().filter((e) => e.application_id === data.order.application_id).length, 1);
    assert.equal(db.getNotifications().filter((n) => n.dedup_key === `NEW_PAID_CASE_${data.order.id}`).length, 1);
  });

  test('payment rejects unknown orders, other services and bad methods', async () => {
    assert.equal((await pay('gst-return', 'missing-order')).status, 404);
    const { data } = await createDraft('gst-return');
    assert.equal((await pay('gst-lut-exporters', data.order.id)).status, 404);
    assert.equal((await pay('gst-return', data.order.id, undefined, { paymentMethod: 'bitcoin' })).status, 400);
  });

  test("a signed-in customer's order can only be paid by that customer", async () => {
    const owner = tokenFor('usr_gst_owner');
    const { data } = await createDraft('gst-composition-scheme', {}, owner);
    assert.equal(data.order.user_id, 'usr_gst_owner');
    assert.equal((await pay('gst-composition-scheme', data.order.id)).status, 403);
    assert.equal((await pay('gst-composition-scheme', data.order.id, tokenFor('usr_someone_else'))).status, 403);
    assert.equal((await pay('gst-composition-scheme', data.order.id, owner)).status, 200);
  });

  test('a guest order is claimed by the customer who pays for it', async () => {
    const { data } = await createDraft('gst-notice-reg-03');
    const paid = await (await pay('gst-notice-reg-03', data.order.id, tokenFor('usr_gst_claimer'))).json();
    assert.equal(paid.order.user_id, 'usr_gst_claimer');
    assert.equal(paid.application.user_id, 'usr_gst_claimer');
    assert.ok(db.getNotifications().some((n) => n.dedup_key === `PAYMENT_SUCCESS_${data.order.id}` && n.recipient_id === 'usr_gst_claimer'));
  });

  test('payments are refused when simulated payments are disabled', async () => {
    const { data } = await createDraft('gst-assessment-advisory');
    ENV.ALLOW_SIMULATED_PAYMENTS = false;
    try {
      assert.equal((await pay('gst-assessment-advisory', data.order.id)).status, 503);
    } finally {
      ENV.ALLOW_SIMULATED_PAYMENTS = true;
    }
    assert.equal(db.getOrders().find((o) => o.id === data.order.id).status, 'PENDING');
  });
});
