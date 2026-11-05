import { test, describe, before, after, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { authenticate, generateToken } from '../middleware/auth.js';
import { requirePhoneProof } from '../middleware/phoneProof.js';
import phoneVerificationRoutes from '../routes/phoneVerification.routes.js';
import { issuePhoneProof, readPhoneProof } from '../services/phoneProof.service.js';

const PHONE = '9876543210';
const OTHER_PHONE = '9123456780';

let server;
let baseUrl;
const realFetch = globalThis.fetch;
const realEnv = { FIREBASE_API_KEY: ENV.FIREBASE_API_KEY, IS_PRODUCTION: ENV.IS_PRODUCTION };

const post = async (path, body = {}, headers = {}) => {
  const res = await realFetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
  return { status: res.status, data: await res.json().catch(() => ({})) };
};

const proofHeader = (phone) => ({ 'X-Phone-Proof': issuePhoneProof(phone).phone_proof });

// Google's account lookup, as firebaseAuthService calls it.
const stubFirebaseLookup = (users, ok = true) => {
  globalThis.fetch = async (url, options) => {
    if (String(url).includes('identitytoolkit.googleapis.com')) {
      return { ok, json: async () => ({ users }) };
    }
    return realFetch(url, options);
  };
};

before(async () => {
  const app = express();
  app.use(express.json());
  app.use('/api/v1', requirePhoneProof);
  app.use('/api/v1/phone-verification', phoneVerificationRoutes);
  // Stand-ins for what sits behind the middleware: it is mounted once for all of /api/v1.
  const reached = (req, res) => res.json({ success: true, reached: true });
  app.use('/api/v1/itr-services', reached);
  app.use('/api/v1/ca-consultation', reached);
  app.use('/api/v1/auth', reached);
  app.use('/api/v1/support', reached);
  app.get('/api/v1/me', authenticate, (req, res) => res.json({ success: true }));
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

afterEach(() => {
  globalThis.fetch = realFetch;
  Object.assign(ENV, realEnv);
});

describe('Phone verification - sending a code', () => {
  test('rejects a number that is not a valid Indian mobile', async () => {
    for (const phone of ['', '12345', '5876543210', 'not-a-number']) {
      const { status } = await post('/api/v1/phone-verification/start', { phone });
      assert.equal(status, 400, `phone "${phone}"`);
    }
  });

  test('uses Firebase whenever it is configured, and issues no server code', async () => {
    ENV.FIREBASE_API_KEY = 'test-key';
    const { status, data } = await post('/api/v1/phone-verification/start', { phone: PHONE });
    assert.equal(status, 200);
    assert.equal(data.channel, 'firebase');
    assert.equal(data.dev_otp, undefined);
    assert.equal(data.txn_id, undefined);
  });

  test('without Firebase, development shows the code on screen', async () => {
    ENV.FIREBASE_API_KEY = '';
    const { data } = await post('/api/v1/phone-verification/start', { phone: PHONE });
    assert.equal(data.channel, 'dev');
    assert.match(data.dev_otp, /^\d{6}$/);
    assert.ok(data.txn_id);
  });

  test('without Firebase, production refuses and never reveals a code', async () => {
    ENV.FIREBASE_API_KEY = '';
    ENV.IS_PRODUCTION = true;
    const { status, data } = await post('/api/v1/phone-verification/start', { phone: OTHER_PHONE });
    assert.equal(status, 503);
    assert.equal(data.dev_otp, undefined);
  });
});

describe('Sample numbers', () => {
  test('production never starts an OTP for a number pages used to prefill', async () => {
    ENV.FIREBASE_API_KEY = 'test-key';
    ENV.IS_PRODUCTION = true;
    for (const phone of ['+91 9822019482', '9876543210']) {
      const { status, data } = await post('/api/v1/phone-verification/start', { phone });
      assert.equal(status, 400, phone);
      assert.equal(data.channel, undefined);
    }
    assert.equal((await post('/api/v1/phone-verification/start', { phone: OTHER_PHONE })).data.channel, 'firebase');
  });

  test('production accepts the business number, which is a real phone', async () => {
    ENV.FIREBASE_API_KEY = 'test-key';
    ENV.IS_PRODUCTION = true;
    const { status, data } = await post('/api/v1/phone-verification/start', { phone: '7668976193' });
    assert.equal(status, 200);
    assert.equal(data.channel, 'firebase');
  });

  test('no page prefills or falls back to a hardcoded mobile number', () => {
    const pages = fileURLToPath(new URL('../../../frontend/src/pages', import.meta.url));
    const FALLBACK = /(phone|Phone)\b[^\n]*(\|\||\?)[^\n]*['"`]\+?(91[ -]?)?[6-9*][-0-9* ]{5,}['"`]/;
    const offenders = fs
      .readdirSync(pages, { recursive: true })
      .filter((file) => /\.jsx?$/.test(file) && !/constants\.js$/.test(file))
      .flatMap((file) =>
        fs
          .readFileSync(path.join(pages, file), 'utf8')
          .split('\n')
          .filter((line) => FALLBACK.test(line))
          .map((line) => `${file}: ${line.trim()}`)
      );
    assert.deepEqual(offenders, [], 'a sample number here would send the OTP to a stranger');
  });
});

describe('Phone verification - development code', () => {
  const start = async (phone = PHONE) => {
    ENV.FIREBASE_API_KEY = '';
    return (await post('/api/v1/phone-verification/start', { phone })).data;
  };

  test('the right code returns a proof for that number, once', async () => {
    const { txn_id, dev_otp } = await start();
    const first = await post('/api/v1/phone-verification/verify-code', { phone: PHONE, otp: dev_otp, txn_id });
    assert.equal(first.status, 200);
    assert.equal(first.data.phone, PHONE);
    assert.equal(readPhoneProof(first.data.phone_proof), PHONE);

    const replay = await post('/api/v1/phone-verification/verify-code', { phone: PHONE, otp: dev_otp, txn_id });
    assert.equal(replay.status, 400);
  });

  test('a wrong code is refused, and five wrong codes burn it', async () => {
    const { txn_id, dev_otp } = await start();
    const wrong = dev_otp === '111111' ? '222222' : '111111';
    for (let i = 0; i < 5; i += 1) {
      const { status, data } = await post('/api/v1/phone-verification/verify-code', { phone: PHONE, otp: wrong, txn_id });
      assert.equal(status, 400);
      assert.equal(data.phone_proof, undefined);
    }
    const tooLate = await post('/api/v1/phone-verification/verify-code', { phone: PHONE, otp: dev_otp, txn_id });
    assert.equal(tooLate.status, 400);
  });

  test("a code cannot verify a different number, nor an older code after a resend", async () => {
    const { txn_id, dev_otp } = await start();
    const otherNumber = await post('/api/v1/phone-verification/verify-code', { phone: OTHER_PHONE, otp: dev_otp, txn_id });
    assert.equal(otherNumber.status, 400);

    await start();
    const staleTxn = await post('/api/v1/phone-verification/verify-code', { phone: PHONE, otp: dev_otp, txn_id });
    assert.equal(staleTxn.status, 400);
  });

  test('production never accepts a development code', async () => {
    const { txn_id, dev_otp } = await start();
    ENV.IS_PRODUCTION = true;
    const { status, data } = await post('/api/v1/phone-verification/verify-code', { phone: PHONE, otp: dev_otp, txn_id });
    assert.equal(status, 400);
    assert.equal(data.phone_proof, undefined);
  });
});

describe('Phone verification - Firebase', () => {
  const verify = (id_token = 'firebase-id-token') => post('/api/v1/phone-verification/verify-firebase', { id_token });

  test('issues a proof for the number Google vouches for, ignoring anything the client claims', async () => {
    ENV.FIREBASE_API_KEY = 'test-key';
    stubFirebaseLookup([{ localId: 'u1', phoneNumber: `+91${PHONE}` }]);
    const { status, data } = await post('/api/v1/phone-verification/verify-firebase', {
      id_token: 'firebase-id-token',
      phone: OTHER_PHONE,
    });
    assert.equal(status, 200);
    assert.equal(data.phone, PHONE);
    assert.equal(readPhoneProof(data.phone_proof), PHONE);
  });

  test('a foreign number cannot pass for the Indian number with the same last ten digits', async () => {
    ENV.FIREBASE_API_KEY = 'test-key';
    stubFirebaseLookup([{ localId: 'u1', phoneNumber: '+16505551234' }]);
    const { status, data } = await verify();
    assert.equal(status, 400);
    assert.equal(data.phone_proof, undefined);
  });

  test('rejects a token Google does not recognise, and one with no phone number', async () => {
    ENV.FIREBASE_API_KEY = 'test-key';
    stubFirebaseLookup([], false);
    assert.equal((await verify()).status, 400);
    stubFirebaseLookup([{ localId: 'u1', email: 'a@example.com' }]);
    assert.equal((await verify()).status, 400);
    assert.equal((await post('/api/v1/phone-verification/verify-firebase', {})).status, 400);
  });
});

describe('Phone proof', () => {
  test('a proof is not a login token, and a login token is not a proof', async () => {
    const { phone_proof } = issuePhoneProof(PHONE);
    const asLogin = await realFetch(`${baseUrl}/api/v1/me`, { headers: { Authorization: `Bearer ${phone_proof}` } });
    assert.equal(asLogin.status, 401);

    const login = generateToken({ id: 'u1', email: 'a@example.com', phone: PHONE, role: 'CUSTOMER', full_name: 'A' });
    assert.equal(readPhoneProof(login), null);
  });

  test('forged, foreign-audience and expired proofs are worthless', () => {
    const sign = (secret, options) => jwt.sign({ phone: PHONE }, secret, { audience: 'phone-proof', ...options });
    assert.equal(readPhoneProof(sign('some-other-secret', {})), null);
    assert.equal(readPhoneProof(sign(ENV.OTP_PEPPER, { audience: 'something-else' })), null);
    assert.equal(readPhoneProof(sign(ENV.OTP_PEPPER, { expiresIn: -10 })), null);
    assert.equal(readPhoneProof(sign(ENV.OTP_PEPPER, {})), PHONE);
    assert.equal(readPhoneProof('garbage'), null);
    assert.equal(readPhoneProof(undefined), null);
  });
});

describe('Service flows require a verified number', () => {
  const FLOW = '/api/v1/itr-services/itr-filing/checkout/draft';

  test('without a proof the flow is not reached, and the answer names the number to verify', async () => {
    const { status, data } = await post(FLOW, { phone: PHONE });
    assert.equal(status, 428);
    assert.equal(data.code, 'PHONE_VERIFICATION_REQUIRED');
    assert.equal(data.phone, PHONE);
    assert.equal(data.reached, undefined);
  });

  test('a proof for the number lets the request through, in any format the pages send it', async () => {
    for (const phone of [PHONE, `+91 ${PHONE}`, `+91${PHONE}`, `91${PHONE}`, '98765 43210']) {
      const { status, data } = await post(FLOW, { phone }, proofHeader(PHONE));
      assert.equal(status, 200, `phone "${phone}"`);
      assert.equal(data.reached, true);
    }
  });

  test("a proof for someone else's number does not", async () => {
    const { status, data } = await post(FLOW, { phone: PHONE }, proofHeader(OTHER_PHONE));
    assert.equal(status, 428);
    assert.equal(data.phone, PHONE);
  });

  test('a junk number cannot slip past, and is not offered for verification', async () => {
    for (const phone of ['12345', 'abc', 5876543210]) {
      const { status, data } = await post(FLOW, { phone });
      assert.equal(status, 428, `phone "${phone}"`);
      assert.equal(data.phone, undefined);
    }
  });

  test('the rule follows the number under any of the names the flows give it', async () => {
    for (const key of ['customerPhone', 'customer_phone', 'applicantPhone', 'mobile', 'mobile_number', 'mobileNumber', 'contactPhone']) {
      assert.equal((await post(FLOW, { [key]: PHONE })).status, 428, key);
      assert.equal((await post(FLOW, { [key]: PHONE }, proofHeader(PHONE))).status, 200, key);
    }
  });

  test('every number in the request needs the proof, not just the first', async () => {
    const { status, data } = await post(FLOW, { phone: PHONE, customerPhone: OTHER_PHONE }, proofHeader(PHONE));
    assert.equal(status, 428);
    assert.equal(data.phone, OTHER_PHONE);
  });

  test('fields that merely mention a phone app are not numbers', async () => {
    assert.equal((await post(FLOW, { upiApp: 'phonepe', phonepeRef: '123', isMobileApp: true })).status, 200);
  });

  test('a request that carries no number passes', async () => {
    assert.equal((await post(FLOW, { paymentMethod: 'UPI' })).status, 200);
    assert.equal((await post(FLOW, { phone: '' })).status, 200);
  });

  test('reads are not gated', async () => {
    const res = await realFetch(`${baseUrl}${FLOW}?phone=${PHONE}`);
    assert.equal(res.status, 200);
  });

  test('auth and support are exempt, but an exempt name does not exempt a flow that starts with it', async () => {
    assert.equal((await post('/api/v1/auth/register/request-otp', { phone: PHONE })).status, 200);
    assert.equal((await post('/api/v1/support/callback', { phone: PHONE })).status, 200);
    assert.equal((await post('/api/v1/ca-consultation/lead', { phone: PHONE })).status, 428);
  });
});
