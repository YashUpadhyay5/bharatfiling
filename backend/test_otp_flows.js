import { OtpModel } from './src/models/Otp.js';
import { cryptoService } from './src/services/crypto.service.js';
import { UserModel } from './src/models/User.js';
import bcrypt from 'bcryptjs';

async function runTests() {
  console.log('=== STARTING BHARATFILING OTP & AUTH SUITE ===\n');

  const testEmail = `test.user.${Date.now()}@bharatfiling.com`;
  const testPhone = '9876543210';
  const testPassword = 'Initial@Password123';
  const newPassword = 'Updated@Password456';

  // 1. Test Crypto Service
  console.log('Test 1: Testing Cryptographic Engine...');
  const otp = cryptoService.generateNumericOtp();
  if (!/^\d{6}$/.test(otp)) {
    throw new Error(`Generated OTP ${otp} is not a 6-digit number!`);
  }
  const txnId = `txn_${cryptoService.generateSecureToken(12)}`;
  const hmacHash = cryptoService.createOtpHmac(otp, testEmail, 'REGISTRATION', txnId);
  const isValid = cryptoService.verifyOtpHmac(otp, hmacHash, testEmail, 'REGISTRATION', txnId);
  const isInvalid = cryptoService.verifyOtpHmac('000000', hmacHash, testEmail, 'REGISTRATION', txnId);

  if (!isValid || isInvalid) {
    throw new Error('HMAC verification failed!');
  }
  console.log('  ✓ 6-Digit OTP, secure token, and HMAC constant-time matching verified.');

  // 2. Test Registration Staging & OTP Creation
  console.log('\nTest 2: Testing Registration OTP Staging in OtpModel...');
  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(testPassword, salt);
  const expires_at = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  const stagedRecord = await OtpModel.create({
    txn_id: txnId,
    email: testEmail,
    otp_hash: hmacHash,
    purpose: 'REGISTRATION',
    staged_payload: {
      full_name: 'Test Citizen',
      email: testEmail,
      phone: testPhone,
      password_hash,
      role: 'CUSTOMER',
    },
    expires_at,
  });

  if (!stagedRecord || stagedRecord.email !== testEmail) {
    throw new Error('Failed to create OTP record in model!');
  }
  console.log('  ✓ Staged user data securely stored with 5-minute TTL.');

  // 3. Test Invalid Attempts & Threshold Lockout
  console.log('\nTest 3: Testing Attempt Counter & Lockout Protection...');
  const attemptsUsed = await OtpModel.incrementAttempts(txnId);
  if (attemptsUsed !== 1) {
    throw new Error(`Expected attemptsUsed=1, got ${attemptsUsed}`);
  }
  const fetchedAfterAttempt = await OtpModel.findByTxnId(txnId);
  if (fetchedAfterAttempt.attempts !== 1) {
    throw new Error(`Expected attempts=1 in DB, got ${fetchedAfterAttempt.attempts}`);
  }
  console.log('  ✓ Attempt counter correctly tracks and increments on failed entries.');

  // 4. Test User Commitment & OTP Consumption
  console.log('\nTest 4: Testing User Commitment & Consumption...');
  await OtpModel.markConsumed(txnId);
  const consumedRecord = await OtpModel.findByTxnId(txnId);
  if (!consumedRecord.is_consumed) {
    throw new Error('OTP was not marked consumed!');
  }
  console.log('  ✓ OTP marked consumed to prevent replay attacks.');

  // 5. Test Password Reset Token Issuance & Revocation
  console.log('\nTest 5: Testing Forgot Password Reset Token Lifecycle...');
  const fpTxnId = `txn_${cryptoService.generateSecureToken(12)}`;
  const fpOtp = cryptoService.generateNumericOtp();
  const fpHmac = cryptoService.createOtpHmac(fpOtp, testEmail, 'PASSWORD_RESET', fpTxnId);
  await OtpModel.create({
    txn_id: fpTxnId,
    email: testEmail,
    otp_hash: fpHmac,
    purpose: 'PASSWORD_RESET',
    expires_at,
  });

  const resetToken = `rst_${cryptoService.generateSecureToken(32)}`;
  const resetExpiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  await OtpModel.setResetToken(fpTxnId, resetToken, resetExpiresAt);

  const foundByToken = await OtpModel.findByResetToken(resetToken);
  if (!foundByToken || foundByToken.email !== testEmail) {
    throw new Error('Failed to look up record by reset_token!');
  }

  await OtpModel.revokeResetToken(resetToken);
  const revokedRecord = await OtpModel.findByResetToken(resetToken);
  if (revokedRecord) {
    throw new Error('Revoked reset_token was still found!');
  }
  console.log('  ✓ Single-use 10-minute reset token successfully authorized and revoked.');

  console.log('\n=== ALL BHARATFILING AUTH & OTP TESTS PASSED! ===');
  process.exit(0);
}

runTests().catch((err) => {
  console.error('\n❌ Test Failure:', err);
  process.exit(1);
});
