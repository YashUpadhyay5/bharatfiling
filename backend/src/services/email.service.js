import { ENV } from '../config/env.js';
import { devEmailProvider } from './providers/devEmailProvider.js';
import { smtpEmailProvider } from './providers/smtpEmailProvider.js';

function getActiveProvider() {
  if (ENV.EMAIL_PROVIDER === 'smtp' && ENV.SMTP_HOST && ENV.SMTP_USER) {
    return smtpEmailProvider;
  }
  return devEmailProvider;
}

export const emailService = {
  /**
   * Dispatches 6-digit registration OTP email
   */
  async sendRegistrationOtp(email, otp, name = 'Valued Client') {
    const provider = getActiveProvider();
    const subject = `${otp} is your BharatFiling registration code`;
    
    const text = `Hello ${name},\n\nThank you for signing up with BharatFiling. Your 6-digit registration verification code is: ${otp}\n\nThis code is valid for 5 minutes. Never share this code with anyone.\n\nBharatFiling Platform`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your BharatFiling Verification Code</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="560" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="padding: 32px 32px 24px 32px; text-align: center; background-color: #0f172a;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                Bharat<span style="color: #F26522;">Filing</span>
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; font-weight: 500;">
                India's AI + CA Powered Compliance & Tax OS
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155; line-height: 24px;">
                Hello <strong>${name}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #475569; line-height: 22px;">
                Thank you for creating an account with BharatFiling. Enter the 6-digit verification code below to verify your email address and activate your Master Customer Profile:
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <div style="display: inline-block; font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #0f172a; background: #f1f5f9; padding: 16px 36px; border-radius: 12px; border: 1px solid #cbd5e1;">
                  ${otp}
                </div>
                <p style="margin: 12px 0 0 0; font-size: 12px; color: #64748b; font-weight: 600;">
                  ⏳ Valid for 5 minutes only
                </p>
              </div>
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #64748b; line-height: 20px;">
                ⚠️ <strong>Security Notice:</strong> Never share this code with anyone, including BharatFiling representatives.
              </p>
              <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 28px 0;" />
              <p style="margin: 0; font-size: 11px; color: #94a3b8; text-align: center; line-height: 18px;">
                If you did not initiate this registration, please disregard this email.<br />
                © 2026 BharatFiling Platform. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    return provider.send({
      to: email,
      subject,
      text,
      html,
      data: { otp, name, purpose: 'REGISTRATION' },
    });
  },

  /**
   * Dispatches 6-digit password recovery OTP email
   */
  async sendPasswordResetOtp(email, otp, name = 'Valued Client') {
    const provider = getActiveProvider();
    const subject = `${otp} is your BharatFiling password recovery code`;

    const text = `Hello ${name},\n\nWe received a request to reset your BharatFiling account password. Your 6-digit recovery verification code is: ${otp}\n\nThis code is valid for 5 minutes. If you did not request a password reset, you can safely ignore this email.\n\nBharatFiling Platform`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your BharatFiling Password</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="560" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="padding: 32px 32px 24px 32px; text-align: center; background-color: #0f172a;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                Bharat<span style="color: #F26522;">Filing</span>
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; font-weight: 500;">
                India's AI + CA Powered Compliance & Tax OS
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155; line-height: 24px;">
                Hello <strong>${name}</strong>,
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #475569; line-height: 22px;">
                A request was received to reset your BharatFiling account password. Enter this 6-digit recovery code to authorize your password update:
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <div style="display: inline-block; font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #dc2626; background: #fef2f2; padding: 16px 36px; border-radius: 12px; border: 1px solid #fecaca;">
                  ${otp}
                </div>
                <p style="margin: 12px 0 0 0; font-size: 12px; color: #dc2626; font-weight: 600;">
                  ⏳ Valid for 5 minutes only
                </p>
              </div>
              <p style="margin: 0 0 12px 0; font-size: 13px; color: #64748b; line-height: 20px;">
                If you did not request this password reset, please ignore this email. Your current password remains safe and unchanged.
              </p>
              <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 28px 0;" />
              <p style="margin: 0; font-size: 11px; color: #94a3b8; text-align: center; line-height: 18px;">
                © 2026 BharatFiling Platform. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    return provider.send({
      to: email,
      subject,
      text,
      html,
      data: { otp, name, purpose: 'PASSWORD_RESET' },
    });
  },

  /**
   * Dispatches security alert notification email after successful password change
   */
  async sendPasswordChangedAlert(email, name = 'Valued Client') {
    const provider = getActiveProvider();
    const subject = `Security Alert: Your BharatFiling password was updated`;

    const formattedDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const text = `Hello ${name},\n\nThis is a confirmation that your BharatFiling account password was successfully updated on ${formattedDate}.\n\nIf you did not perform this change, please contact our support team immediately.\n\nBharatFiling Platform`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Security Alert: Password Updated</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="560" border="0" cellspacing="0" cellpadding="0" style="background: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="padding: 24px 32px; text-align: center; background-color: #0f172a;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff;">
                Bharat<span style="color: #F26522;">Filing</span>
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 14px; font-weight: 700; color: #166534;">
                  ✅ Password Update Confirmed
                </p>
                <p style="margin: 6px 0 0 0; font-size: 13px; color: #15803d;">
                  Your BharatFiling account password was successfully changed on <strong>${formattedDate} IST</strong>.
                </p>
              </div>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #475569; line-height: 22px;">
                If you made this change, no further action is required. If you did <strong>not</strong> authorize this change, please contact our support desk immediately at <a href="mailto:support@bharatfiling.com" style="color: #0f172a; font-weight: 600;">support@bharatfiling.com</a>.
              </p>
              <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0;" />
              <p style="margin: 0; font-size: 11px; color: #94a3b8; text-align: center;">
                © 2026 BharatFiling Platform. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    return provider.send({
      to: email,
      subject,
      text,
      html,
      data: { name, purpose: 'PASSWORD_CHANGED_ALERT' },
    });
  },
};
