import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { ENV } from '../config/env.js';
import mcaServicesRoutes from '../routes/registrations/mca-services/index.js';
import { MCA_SERVICES, OFFICE_MOVE_FEES } from '../routes/registrations/mca-services/service.js';
import { computeQuote } from '../routes/registrations/itr-services/quote.js';
import { MCA_SERVICE_CONFIGS } from '../../../frontend/src/pages/mca-services/configs/index.js';
import { OFFICE_MOVE_FEES as FRONTEND_OFFICE_FEES } from '../../../frontend/src/pages/mca-services/configs/change-registered-office.js';
import { MCA_SERVICE_ROUTES } from '../../../frontend/src/pages/mca-services/routes.js';
import { ITR_SERVICE_ROUTES } from '../../../frontend/src/pages/itr-services/routes.js';
import { GST_SERVICE_ROUTES } from '../../../frontend/src/pages/gst-services/routes.js';
import { SERVICES, servicesInCategory } from '../../../frontend/src/data/serviceCatalog.js';

const SLUGS = Object.keys(MCA_SERVICES);
const configOf = (slug) => MCA_SERVICE_CONFIGS.find((c) => c.slug === slug);

// A valid answer to every question of a service: the first option the backend does not block.
const validAnswers = (slug) =>
  Object.fromEntries(
    Object.entries(MCA_SERVICES[slug].fields).map(([key, spec]) => [
      key,
      spec.values.find((value) => !spec.blocked?.includes(value)),
    ])
  );

describe('MCA service flows - config consistency', () => {
  test('frontend configs, routes, catalog and backend list the same live services', () => {
    const backend = [...SLUGS].sort();
    assert.deepEqual(MCA_SERVICE_CONFIGS.map((c) => c.slug).sort(), backend);
    assert.deepEqual(MCA_SERVICE_ROUTES.map((r) => r.slug).sort(), backend);
    assert.deepEqual(servicesInCategory('mca').map((s) => s.slug).sort(), backend, 'every MCA catalog entry has a flow');

    for (const config of MCA_SERVICE_CONFIGS) {
      const service = MCA_SERVICES[config.slug];
      assert.equal(config.fee, service.fee, `${config.slug} fee`);
      assert.equal(config.name, service.name, `${config.slug} name`);
      const entry = SERVICES.find((s) => s.slug === config.slug);
      assert.equal(entry.status, 'live', `${config.slug} should be live`);
      assert.equal(entry.path, `/services/${config.slug}`);
      assert.equal(entry.fee, config.fee, `${config.slug} catalog price`);
      assert.equal(entry.name, config.name, `${config.slug} catalog name`);
    }
  });

  test('route aliases are unique and never shadow another service or flow', () => {
    const own = MCA_SERVICE_ROUTES.flatMap((r) => [r.slug, ...(r.aliases || [])]);
    assert.equal(new Set(own).size, own.length);
    const others = [...ITR_SERVICE_ROUTES, ...GST_SERVICE_ROUTES].flatMap((r) => [r.slug, ...(r.aliases || [])]);
    const catalogAliases = SERVICES.flatMap((s) => s.aliases || []);
    for (const alias of MCA_SERVICE_ROUTES.flatMap((r) => r.aliases || [])) {
      assert.equal(SERVICES.find((s) => s.slug === alias), undefined, `${alias} is already a catalog slug`);
      assert.ok(!others.includes(alias), `${alias} is already another flow's route`);
      assert.ok(!catalogAliases.includes(alias), `${alias} is already a catalog alias`);
    }
  });

  test('questionnaire options, units, fees and blocked answers match the backend', () => {
    for (const config of MCA_SERVICE_CONFIGS) {
      const { fields } = MCA_SERVICES[config.slug];
      const { questions } = config.questionnaire;
      assert.deepEqual(questions.map((q) => q.id).sort(), Object.keys(fields).sort(), config.slug);
      for (const question of questions) {
        const spec = fields[question.id];
        const where = `${config.slug} ${question.id}`;
        assert.deepEqual(question.options.map((o) => o.value), spec.values, where);
        const collect = (key) =>
          Object.fromEntries(question.options.filter((o) => o[key] !== undefined).map((o) => [o.value, o[key]]));
        assert.deepEqual(collect('units'), spec.units || {}, `${where} units`);
        assert.deepEqual(collect('fee'), spec.fees || {}, `${where} fees`);
        assert.deepEqual(
          question.options.filter((o) => o.stop).map((o) => o.value),
          spec.blocked || [],
          `${where} blocked`
        );
      }
    }
  });

  test('every service that bills per unit says what a unit is', () => {
    for (const config of MCA_SERVICE_CONFIGS) {
      assert.equal(Boolean(config.unitsOf), Boolean(MCA_SERVICES[config.slug].unitsOf), config.slug);
      if (config.unitsOf) assert.equal(typeof config.unitLabel(2), 'string', config.slug);
    }
  });

  test('frontend and backend price every combination of answers the same', () => {
    assert.deepEqual(FRONTEND_OFFICE_FEES, OFFICE_MOVE_FEES);
    for (const config of MCA_SERVICE_CONFIGS) {
      const service = MCA_SERVICES[config.slug];
      for (const question of config.questionnaire.questions) {
        for (const option of question.options) {
          if (option.stop) continue;
          const answers = { ...validAnswers(config.slug), [question.id]: option.value };
          const frontendFee = (config.feeOf?.(answers) ?? config.fee) * (config.unitsOf?.(answers) ?? 1);
          const backendFee = (service.feeOf?.(answers) ?? service.fee) * (service.unitsOf?.(answers) ?? 1);
          assert.equal(frontendFee, backendFee, `${config.slug} ${question.id}=${option.value}`);
        }
      }
    }
  });

  test('every page has the content it needs, and every answer reads well on the receipt', () => {
    for (const config of MCA_SERVICE_CONFIGS) {
      assert.ok(config.hero.points.some((p) => p.price), `${config.slug} shows its price`);
      assert.ok(config.hero.formTitle && config.hero.formNote, `${config.slug} form`);
      assert.ok(config.payment.note && config.payment.title && config.payment.collect, `${config.slug} payment`);
      assert.ok(config.sections.length >= 3, `${config.slug} sections`);
      assert.ok(config.faqs.length >= 5, `${config.slug} faqs`);
      const titles = config.sections.map((s) => s.title.join(''));
      assert.equal(new Set(titles).size, titles.length, `${config.slug} section titles are keys`);
      for (const question of config.questionnaire.questions) {
        assert.ok(question.summaryLabel, `${config.slug} ${question.id} summary label`);
      }
      // A customer who can pay is always told what they are paying for.
      const answers = validAnswers(config.slug);
      const chosen = config.questionnaire.questions.map((q) => q.options.find((o) => o.value === answers[q.id]));
      const filings = [...(config.payment.filings || []), ...chosen.flatMap((o) => o.filing || [])];
      assert.ok(filings.length > 0, `${config.slug} filings`);
    }
  });

  test('director KYC follows the three-year rule and its government fees', () => {
    const entry = SERVICES.find((s) => s.slug === 'director-kyc-dir-3');
    assert.doesNotMatch(entry.summary, /annual/i);
    assert.match(entry.summary, /three financial years/);
    assert.match(entry.govt, /₹5,000/);
    assert.match(entry.govt, /₹500/);
    const { questions } = configOf('director-kyc-dir-3').questionnaire;
    const status = questions.find((q) => q.id === 'dinStatus').options;
    assert.match(status.find((o) => o.value === 'deactivated').note, /₹5,000/);
    assert.match(status.find((o) => o.value === 'details-changed').note, /₹500/);
  });

  test('a move that needs the Regional Director lists the right forms', () => {
    const { questions } = configOf('change-registered-office').questionnaire;
    const moves = questions.find((q) => q.id === 'moveType').options;
    const filing = (value) => moves.find((o) => o.value === value).filing.join(' ');
    assert.doesNotMatch(filing('same-city'), /INC-23|MGT-14/);
    assert.doesNotMatch(filing('other-city'), /INC-23/);
    assert.match(filing('other-city'), /MGT-14/);
    for (const value of ['other-roc', 'other-state']) {
      assert.match(filing(value), /INC-23/);
      assert.match(filing(value), /INC-28/);
      assert.match(filing(value), /INC-22/);
    }
    assert.match(filing('other-state'), /situation clause/);
  });
});

describe('MCA service flows - checkout API', () => {
  let server;
  let baseUrl;
  const createdOrders = new Set();
  const createdApps = new Set();
  const realSimulatedPayments = ENV.ALLOW_SIMULATED_PAYMENTS;

  const post = (path, body) =>
    fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

  const createDraft = async (slug, overrides = {}) => {
    const res = await post(`/${slug}/checkout/draft`, {
      email: 'owner@example.com',
      phone: '9876543210',
      cityPincode: 'Pune 411001',
      ...validAnswers(slug),
      ...overrides,
    });
    const data = await res.json();
    if (res.status === 201) {
      createdOrders.add(data.order.id);
      createdApps.add(data.order.application_id);
    }
    return { res, data };
  };

  const pay = (slug, orderId) => post(`/${slug}/checkout/${orderId}/pay`, { paymentMethod: 'upi', upiApp: 'phonepe' });

  before(async () => {
    ENV.ALLOW_SIMULATED_PAYMENTS = true;
    const app = express();
    app.use(express.json());
    app.use('/api/v1/mca-services', mcaServicesRoutes);
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        baseUrl = `http://127.0.0.1:${server.address().port}/api/v1/mca-services`;
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

  test('every service: draft creates a pending order, payment hands it to the CA desk as an MCA case', async () => {
    for (const slug of SLUGS) {
      const answers = validAnswers(slug);
      const { res, data } = await createDraft(slug, answers);
      assert.equal(res.status, 201, slug);
      assert.equal(data.order.status, 'PENDING');
      assert.match(data.applicationNumber, /^MCA\d{6}$/);

      const draftApp = db.getApplications().find((a) => a.id === data.order.application_id);
      assert.equal(draftApp.module_type, 'MCA');
      assert.equal(draftApp.service_id, slug);
      assert.equal(draftApp.service_name, MCA_SERVICES[slug].name);
      for (const [key, value] of Object.entries(answers)) assert.equal(draftApp.fields_data[key], value, `${slug} ${key}`);

      const payRes = await pay(slug, data.order.id);
      assert.equal(payRes.status, 200, `${slug} pay`);
      const paid = await payRes.json();
      assert.equal(paid.order.status, 'PAID');
      assert.equal(paid.order.paid_amount, data.quote.totalAmount);
      assert.equal(paid.application.internal_status, 'CA_REVIEW');
      assert.match(paid.transactionId, /^BFP-MCA-/);
      assert.ok(db.getNotifications().some((n) => n.dedup_key === `NEW_PAID_CASE_${data.order.id}`));
    }
  });

  test('known totals, including 18% GST', async () => {
    const totals = {
      'company-annual-roc-filing': 4129,
      'llp-form-11-form-8': 3539,
      'director-kyc-dir-3': 589,
      'add-remove-director': 2949,
      'increase-authorized-capital': 3539,
      'change-registered-office': 4129,
      'moa-aoa-amendment': 4719,
      'strike-off-company': 9439,
      'strike-off-llp': 7079,
      'charge-satisfaction-chg-1': 3539,
    };
    assert.deepEqual(Object.keys(totals).sort(), [...SLUGS].sort());
    for (const [slug, total] of Object.entries(totals)) {
      const { data } = await createDraft(slug);
      assert.equal(data.order.amount, total, slug);
    }
  });

  test('per-unit services multiply the fee', async () => {
    const cases = [
      ['director-kyc-dir-3', { directors: '3' }, 499 * 3],
      ['company-annual-roc-filing', { years: '2' }, 3499 * 2],
      ['llp-form-11-form-8', { years: '3' }, 2999 * 3],
      ['add-remove-director', { directors: '2' }, 2499 * 2],
    ];
    for (const [slug, overrides, fee] of cases) {
      const { data } = await createDraft(slug, overrides);
      assert.deepEqual(data.quote, computeQuote(fee), slug);
      const app = db.getApplications().find((a) => a.id === data.order.application_id);
      assert.equal(app.fields_data.units, Number(Object.values(overrides)[0]), slug);
    }
  });

  test('the route of an office move sets the fee', async () => {
    for (const [moveType, fee] of Object.entries(OFFICE_MOVE_FEES)) {
      const { data } = await createDraft('change-registered-office', { moveType });
      assert.deepEqual(data.quote, computeQuote(fee), moveType);
    }
    assert.equal(computeQuote(OFFICE_MOVE_FEES['other-state']).totalAmount, 17699);
  });

  test('a blocked answer can never create an order, on any service', async () => {
    let checked = 0;
    for (const slug of SLUGS) {
      for (const [key, spec] of Object.entries(MCA_SERVICES[slug].fields)) {
        for (const value of spec.blocked || []) {
          const before = db.getOrders().length;
          const { res, data } = await createDraft(slug, { [key]: value });
          assert.equal(res.status, 422, `${slug} ${key}=${value}`);
          assert.match(data.message, /review by our team/);
          assert.equal(db.getOrders().length, before, `${slug} ${key}=${value} created an order`);
          checked += 1;
        }
      }
    }
    assert.ok(checked >= 15, `expected every stop to be exercised, got ${checked}`);
  });

  test('the amount charged is decided by the server, not the request', async () => {
    const { data } = await createDraft('director-kyc-dir-3', { amount: 1, totalAmount: 1, fee: 1, units: 100, directors: '1' });
    assert.equal(data.order.amount, 589);
  });

  test('every answer is validated', async () => {
    for (const slug of SLUGS) {
      for (const key of Object.keys(MCA_SERVICES[slug].fields)) {
        const { res } = await createDraft(slug, { [key]: 'not-a-real-answer' });
        assert.equal(res.status, 400, `${slug} ${key}`);
      }
    }
    const { res: missingEmail } = await createDraft('strike-off-llp', { email: 'nope' });
    assert.equal(missingEmail.status, 400);
    const unknown = await post('/not-a-service/checkout/draft', {});
    assert.equal(unknown.status, 404);
    const inherited = await post('/constructor/checkout/draft', {});
    assert.equal(inherited.status, 404);
  });

  test('an order is only paid through its own service, and only once', async () => {
    const { data } = await createDraft('strike-off-llp');
    const wrong = await pay('strike-off-company', data.order.id);
    assert.equal(wrong.status, 404);

    const first = await pay('strike-off-llp', data.order.id);
    assert.equal(first.status, 200);
    const firstPaid = await first.json();
    const events = db.getCaseEvents().filter((e) => e.application_id === data.order.application_id).length;

    const second = await pay('strike-off-llp', data.order.id);
    const secondPaid = await second.json();
    assert.equal(secondPaid.transactionId, firstPaid.transactionId);
    assert.equal(db.getCaseEvents().filter((e) => e.application_id === data.order.application_id).length, events);
  });

  test('payments are refused when simulated payments are disabled', async () => {
    const { data } = await createDraft('moa-aoa-amendment');
    ENV.ALLOW_SIMULATED_PAYMENTS = false;
    try {
      const res = await pay('moa-aoa-amendment', data.order.id);
      assert.equal(res.status, 503);
    } finally {
      ENV.ALLOW_SIMULATED_PAYMENTS = true;
    }
  });
});
