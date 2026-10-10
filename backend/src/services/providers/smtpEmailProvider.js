import nodemailer from 'nodemailer';
import { ENV } from '../../config/env.js';

let transporter = null;

function getTransporter() {
  if (!transporter) {
    if (!ENV.SMTP_USER || !ENV.SMTP_PASS) {
      console.warn('⚠️ SMTP credentials not fully configured in environment (SMTP_PASS missing). Using fallback logger.');
      return null;
    }

    const isGmail = ENV.SMTP_SERVICE === 'gmail' || ENV.SMTP_HOST === 'smtp.gmail.com' || ENV.SMTP_USER.includes('@gmail.com');

    const transportOptions = isGmail
      ? {
          service: 'gmail',
          auth: {
            user: ENV.SMTP_USER,
            pass: ENV.SMTP_PASS.replace(/\s+/g, ''),
          },
        }
      : {
          host: ENV.SMTP_HOST,
          port: ENV.SMTP_PORT,
          secure: ENV.SMTP_SECURE,
          auth: {
            user: ENV.SMTP_USER,
            pass: ENV.SMTP_PASS,
          },
          pool: true,
          maxConnections: 5,
          maxMessages: 100,
        };

    transporter = nodemailer.createTransport(transportOptions);
  }
  return transporter;
}

export const smtpEmailProvider = {
  async send({ to, subject, html, text }) {
    const client = getTransporter();

    if (!client) {
      throw new Error('SMTP provider is selected but credentials are not configured in environment.');
    }

    const mailOptions = {
      from: ENV.SMTP_FROM,
      to,
      subject,
      text,
      html,
    };

    const info = await client.sendMail(mailOptions);
    return {
      success: true,
      provider: 'smtp',
      messageId: info.messageId,
    };
  },
};
