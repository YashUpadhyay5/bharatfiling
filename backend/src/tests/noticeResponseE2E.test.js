import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { db } from '../database/db.js';
import { ENV } from '../config/env.js';
import { generateToken } from '../middleware/auth.js';
import { LANGUAGES } from '../routes/registrations/shared/checkout.js';
import noticeRoutes from '../routes/registrations/notice-response/index.js';
import { NOTICE_CONSULTATION_FEE, NOTICE_SERVICE } from '../routes/registrations/notice-response/service.js';
import { computeQuote } from '../routes/registrations/notice-response/quote.js';
import * as slots from '../routes/registrations/notice-response/slots.js';
import noticeConfig from '../../../frontend/src/pages/notice-response/config.js';
import { NOTICE_ROUTE } from '../../../frontend/src/pages/notice-response/routes.js';
import { ITR_SERVICE_ROUTES } from '../../../frontend/src/pages/itr-services/routes.js';
import { TDS_ROUTE } from '../../../frontend/src/pages/tds-return-filing/routes.js';
import { LANGUAGE_OPTIONS } from '../../../frontend/src/pages/itr-services/common.js';
import * as frontendSlots from '../../../frontend/src/pages/notice-response/slots.js';
import * as frontendQuote from '../../../frontend/src/pages/notice-response/quote.js';
import { SERVICES } from '../../../frontend/src/data/serviceCatalog.js';

const tokenFor = (id, role = 'CUSTOMER') =>
  generateToken({ id, email: `${id}@example.com`, phone: '9876543210', role, full_name: id });

// 10:00 AM on Wed 28 Oct 2026 in India.
const NOW = new Date('2026-10-28T10:00:00+05:30');

describe('Income tax notice response - config consistency', () => {
  test('frontend config, catalog and backend describe the same live service', () => {
    assert.equal(noticeConfig.slug, NOTICE_SERVICE.slug);
    assert.equal(noticeConfig.name, NOTICE_SERVICE.name);
    assert.equal(noticeConfig.fee, NOTICE_CONSULTATION_FEE);
    assert.equal(frontendQuote.NOTICE_CONSULTATION_FEE, NOTICE_CONSULTATION_FEE);
    assert.equal(NOTICE_ROUTE.slug, NOTICE_SERVICE.slug);
    const entry = SERVICES.find((s) => s.slug === NOTICE_SERVICE.slug);
    assert.ok(entry, 'income-tax-notice-response missing from the service catalog');
    assert.equal(entry.status, 'live');
    assert.equal(entry.path, `/services/${NOTICE_SERVICE.slug}`);
  });

  test('route aliases never shadow a catalog service or another flow', () => {
    const others = new Set([
      ...ITR_SERVICE_ROUTES.flatMap((r) => [r.slug, ...(r.aliases || [])]),
      TDS_ROUTE.slug,
      ...TDS_ROUTE.aliases,
    ]);
    for (const alias of NOTICE_ROUTE.aliases) {
      assert.ok(!others.has(alias), `${alias} is used by another flow`);
      assert.equal(SERVICES.find((s) => s.slug === alias || (s.aliases || []).includes(alias)), undefined, `${alias} is a catalog slug`);
    }
  });

  test('the struck-through price is above the fee, the language list matches, and the page nav points at real sections', () => {
    assert.ok(noticeConfig.hero.offer.originalPrice > noticeConfig.fee);
    assert.deepEqual(LANGUAGE_OPTIONS.map((o) => o.value), LANGUAGES);
    assert.deepEqual(noticeConfig.hero.extraField.options.map((o) => o.value), LANGUAGES);
    const sectionIds = new Set([...noticeConfig.sections.map((s) => s.id), 'faqs']);
    for (const { id } of noticeConfig.sectionNav) assert.ok(sectionIds.has(id), `nav target ${id}`);
  });

  test('frontend and backend compute identical totals', () => {
    for (const fee of [NOTICE_CONSULTATION_FEE, 1, 999]) {
      assert.deepEqual(frontendQuote.computeQuote(fee), computeQuote(fee));
    }
    // 499 x 18% = 89.82, rounded to 90
    assert.deepEqual(computeQuote(), { consultationFee: 499, gst: 90, totalAmount: 589 });
  });

  test('frontend and backend agree on slots, dates and labels at any moment', () => {
    assert.deepEqual(frontendSlots.slotTimes(), slots.slotTimes());
    const moments = [
      NOW,
      new Date('2026-10-28T17:20:00+05:30'),
      new Date('2026-10-28T20:00:00Z'), // already the next day in India
      new Date('2026-12-31T23:59:00+05:30'),
      new Date('2027-02-27T09:00:00+05:30'),
    ];
    for (const now of moments) {
      assert.deepEqual(frontendSlots.istNow(now), slots.istNow(now), now.toISOString());
      const today = slots.istNow(now).date;
      for (let offset = -2; offset <= 33; offset++) {
        const date = slots.addDays(today, offset);
        assert.equal(frontendSlots.addDays(today, offset), date);
        for (const time of [...slots.slotTimes(), '09:30', '18:00', '', 'abc']) {
          assert.equal(frontendSlots.isSlotAvailable(date, time, now), slots.isSlotAvailable(date, time, now), `${date} ${time} @ ${now.toISOString()}`);
        }
      }
    }
    for (const time of slots.slotTimes()) assert.equal(frontendSlots.formatSlotTime(time), slots.formatSlotTime(time));
    for (const date of ['2026-10-28', '2027-02-28', '2028-02-29']) assert.equal(frontendSlots.formatSlotDate(date), slots.formatSlotDate(date));
  });

  test('slot rules: working hours, a 30-day window and a 30-minute lead time, all in IST', () => {
    const ok = (date, time, now = NOW) => slots.isSlotAvailable(date, time, now);
    assert.deepEqual(slots.slotTimes().slice(0, 3), ['10:00', '10:30', '11:00']);
    assert.equal(slots.slotTimes().at(-1), '17:30');
    assert.equal(slots.slotTimes().length, 16);

    assert.equal(ok('2026-10-28', '10:00'), false); // already starting
    assert.equal(ok('2026-10-28', '10:30'), true); // exactly 30 minutes ahead
    assert.equal(ok('2026-10-28', '17:30'), true);
    assert.equal(ok('2026-10-27', '11:00'), false); // yesterday
    assert.equal(ok('2026-11-27', '10:00'), true); // the 30th day ahead
    assert.equal(ok('2026-11-28', '10:00'), false);
    assert.equal(ok('2026-10-29', '09:30'), false); // not a slot
    assert.equal(ok('2026-10-29', '18:00'), false);
    assert.equal(ok('2026-02-31', '10:00', new Date('2026-02-01T10:00:00+05:30')), false); // not a real date
    assert.equal(ok('28-10-2026', '10:30'), false);
    assert.equal(ok(undefined, '10:30'), false);
    assert.equal(ok('2026-10-29', undefined), false);
    assert.equal(ok(20261029, '10:30'), false);

    // 20:00 UTC is already 1:30 AM on the 29th in India, so the 28th is over.
    const lateUtc = new Date('2026-10-28T20:00:00Z');
    assert.equal(ok('2026-10-28', '17:30', lateUtc), false);
    assert.equal(ok('2026-10-29', '10:00', lateUtc), true);
    // After the last slot of the day has started, today has nothing left.
    assert.equal(ok('2026-10-28', '17:30', new Date('2026-10-28T17:10:00+05:30')), false);
  });

  test('the calendar for October 2026 matches the screen: 5 weeks from Sun 27 Sep to Sat 31 Oct', () => {
    const grid = frontendSlots.monthGrid(2026, 10);
    assert.equal(grid.length, 35);
    assert.equal(grid[0].date, '2026-09-27');
    assert.equal(grid.at(-1).date, '2026-10-31');
    assert.equal(grid[0].inMonth, false);
    assert.equal(grid[4].date, '2026-10-01');
    assert.equal(grid[4].inMonth, true);
    assert.equal(frontendSlots.monthLabel(2026, 10), 'October 2026');
    assert.equal(frontendSlots.formatSlotDate('2026-10-28'), 'Wed, 28 Oct 2026');
    assert.equal(frontendSlots.formatSlotTime('13:30'), '1:30 PM');
    assert.equal(frontendSlots.formatSlotTime('10:00'), '10:00 AM');
    assert.equal(frontendSlots.formatSlotTime('12:00'), '12:00 PM');
  });
});

describe('Income tax notice response - checkout API', () => {
  let server;
  let baseUrl;
  const createdOrders = new Set();
  const createdApps = new Set();
  const realSimulatedPayments = ENV.ALLOW_SIMULATED_PAYMENTS;
  const realNow = slots.clock.now;

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
        language: 'hindi',
        slotDate: '2026-10-29',
        slotTime: '11:30',
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
    slots.clock.now = () => NOW;
    const app = express();
    app.use(express.json());
    app.use('/api/v1/notice-response', noticeRoutes);
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        baseUrl = `http://127.0.0.1:${server.address().port}/api/v1/notice-response`;
        resolve();
      });
    });
  });

  after(async () => {
    ENV.ALLOW_SIMULATED_PAYMENTS = realSimulatedPayments;
    slots.clock.now = realNow;
    if (server) await new Promise((resolve) => server.close(resolve));
    db.saveApplications(db.getApplications().filter((a) => !createdApps.has(a.id)));
    db.saveOrders(db.getOrders().filter((o) => !createdOrders.has(o.id)));
    db.saveCaseEvents(db.getCaseEvents().filter((e) => !createdApps.has(e.application_id)));
    db.saveNotifications(db.getNotifications().filter((n) => !createdOrders.has(n.order_id)));
  });

  test('draft books the slot for the quoted amount, payment hands the case to the CA desk', async () => {
    const { res, data } = await createDraft();
    assert.equal(res.status, 201);
    assert.equal(data.order.amount, 589);
    assert.equal(data.order.status, 'PENDING');
    assert.deepEqual(data.quote, { consultationFee: 499, gst: 90, totalAmount: 589 });
    assert.match(data.applicationNumber, /^NOTICE\d{6}$/);

    const draftApp = db.getApplications().find((a) => a.id === data.order.application_id);
    assert.equal(draftApp.payment_completed, false);
    assert.equal(draftApp.service_id, 'income-tax-notice-response');
    assert.equal(draftApp.module_type, 'NOTICE');
    assert.equal(draftApp.service_name, 'Income Tax Notice Response consultation (Thu, 29 Oct 2026, 11:30 AM)');
    assert.equal(draftApp.fields_data.slotDate, '2026-10-29');
    assert.equal(draftApp.fields_data.slotTime, '11:30');
    assert.equal(draftApp.fields_data.language, 'hindi');
    assert.equal(draftApp.fields_data.email, 'owner@example.com');

    const payRes = await pay(data.order.id);
    assert.equal(payRes.status, 200);
    const paid = await payRes.json();
    assert.equal(paid.order.status, 'PAID');
    assert.equal(paid.order.paid_amount, 589);
    assert.equal(paid.application.status, 'SUBMITTED');
    assert.equal(paid.application.internal_status, 'CA_REVIEW');
    assert.equal(paid.application.payment_completed, true);
    assert.match(paid.transactionId, /^BFP-NOTICE-\d{6}$/);
    assert.ok(db.getCaseEvents().some((e) => e.application_id === data.order.application_id));
    assert.ok(db.getNotifications().some((n) => n.dedup_key === `NEW_PAID_CASE_${data.order.id}`));
  });

  test('language is stored, defaults to English and is validated; the amount is the server’s', async () => {
    const stored = async (overrides) => {
      const { res, data } = await createDraft(overrides);
      assert.equal(res.status, 201);
      return db.getApplications().find((a) => a.id === data.order.application_id).fields_data.language;
    };
    assert.equal(await stored({ language: 'tamil' }), 'tamil');
    assert.equal(await stored({ language: undefined }), 'english');
    for (const language of ['Klingon', 'Hindi', '', null, '__proto__']) {
      assert.equal((await createDraft({ language })).res.status, 400, String(language));
    }
    const { data } = await createDraft({ amount: 1, totalAmount: 1, consultationFee: 1 });
    assert.equal(data.order.amount, 589);
  });

  test('only an available slot can be booked', async () => {
    const rejected = [
      { slotDate: '2026-10-27' }, // yesterday
      { slotDate: '2026-10-28', slotTime: '10:00' }, // starts now
      { slotDate: '2026-11-28' }, // beyond 30 days
      { slotTime: '09:30' }, // outside working hours
      { slotTime: '18:00' },
      { slotTime: '11:15' },
      { slotDate: '2026-02-31' },
      { slotDate: '29-10-2026' },
      { slotDate: undefined },
      { slotTime: undefined },
      { slotDate: 20261029 },
      { slotTime: ['11:30'] },
      { slotDate: '__proto__' },
    ];
    for (const overrides of rejected) {
      assert.equal((await createDraft(overrides)).res.status, 400, JSON.stringify(overrides));
    }
    assert.equal((await createDraft({ slotDate: '2026-10-28', slotTime: '10:30' })).res.status, 201);
    assert.equal((await createDraft({ slotDate: '2026-11-27', slotTime: '17:30' })).res.status, 201);
  });

  test('a draft left open past its slot cannot be paid, and a paid booking is unaffected by the clock', async () => {
    const { data } = await createDraft({ slotDate: '2026-10-28', slotTime: '10:30' });
    slots.clock.now = () => new Date('2026-10-28T10:45:00+05:30'); // the slot has started
    try {
      const late = await pay(data.order.id);
      assert.equal(late.status, 409);
      assert.match((await late.json()).message, /no longer available/);
      assert.equal(db.getOrders().find((o) => o.id === data.order.id).status, 'PENDING');
    } finally {
      slots.clock.now = () => NOW;
    }

    const second = await createDraft({ slotDate: '2026-10-28', slotTime: '10:30' });
    const first = await (await pay(second.data.order.id)).json();
    slots.clock.now = () => new Date('2026-10-28T12:00:00+05:30');
    try {
      const retry = await pay(second.data.order.id);
      assert.equal(retry.status, 200);
      assert.equal((await retry.json()).transactionId, first.transactionId);
    } finally {
      slots.clock.now = () => NOW;
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
    assert.equal((await pay(data.order.id, undefined, { paymentMethod: '__proto__' })).status, 400);
  });

  test('lead validation', async () => {
    assert.equal((await createDraft({ email: 'not-an-email' })).res.status, 400);
    assert.equal((await createDraft({ phone: '12345' })).res.status, 400);
    assert.equal((await createDraft({ phone: '5876543210' })).res.status, 400);
    assert.equal((await createDraft({ cityPincode: '   ' })).res.status, 400);
  });

  test('paying twice returns the original payment without duplicating events', async () => {
    const { data } = await createDraft();
    const first = await (await pay(data.order.id)).json();
    const secondRes = await pay(data.order.id);
    assert.equal(secondRes.status, 200);
    assert.equal((await secondRes.json()).transactionId, first.transactionId);
    assert.equal(db.getCaseEvents().filter((e) => e.application_id === data.order.application_id).length, 1);
    assert.equal(db.getNotifications().filter((n) => n.dedup_key === `NEW_PAID_CASE_${data.order.id}`).length, 1);
  });

  test('payment rejects unknown orders and orders of other services', async () => {
    assert.equal((await pay('missing-order')).status, 404);
    const { data } = await createDraft();
    const orders = db.getOrders();
    const foreign = { ...orders.find((o) => o.id === data.order.id), id: 'notice-test-foreign-order', service_id: 'tds-return-filing' };
    orders.push(foreign);
    db.saveOrders(orders);
    createdOrders.add(foreign.id);
    assert.equal((await pay(foreign.id)).status, 404);
  });

  test("a signed-in customer's order can only be paid by that customer, and a guest order is claimed by its payer", async () => {
    const owner = tokenFor('usr_notice_owner');
    const { data } = await createDraft({}, owner);
    assert.equal(data.order.user_id, 'usr_notice_owner');
    assert.equal((await pay(data.order.id)).status, 403);
    assert.equal((await pay(data.order.id, tokenFor('usr_someone_else'))).status, 403);
    assert.equal((await pay(data.order.id, owner)).status, 200);

    const guest = await createDraft();
    const paid = await (await pay(guest.data.order.id, tokenFor('usr_notice_claimer'))).json();
    assert.equal(paid.order.user_id, 'usr_notice_claimer');
    assert.equal(paid.application.user_id, 'usr_notice_claimer');
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
