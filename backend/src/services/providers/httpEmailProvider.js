import { ENV } from '../../config/env.js';

export const httpEmailProvider = {
  /**
   * Dispatches email over HTTPS (Port 443) using Resend or Brevo API.
   * Completely bypasses cloud firewall SMTP port blocks (Render/AWS/GCP).
   */
  async send({ to, subject, html, text }) {
    // 1. Resend API
    if (ENV.RESEND_API_KEY) {
      const from = ENV.SMTP_FROM || 'BharatFiling <onboarding@resend.dev>';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ENV.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject,
          html,
          text,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Resend HTTP error ${res.status}`);
      }

      console.log(`[Resend HTTP Dispatch]: Id=${data.id} To=${to}`);
      return { success: true, provider: 'resend-http', messageId: data.id };
    }

    // 2. Brevo (Sendinblue) API
    if (ENV.BREVO_API_KEY) {
      const senderEmail = ENV.SMTP_USER || 'yashupdhyay486@gmail.com';
      const senderName = 'BharatFiling';

      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': ENV.BREVO_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email: to }],
          subject,
          htmlContent: html,
          textContent: text,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || `Brevo HTTP error ${res.status}`);
      }

      console.log(`[Brevo HTTP Dispatch]: Id=${data.messageId} To=${to}`);
      return { success: true, provider: 'brevo-http', messageId: data.messageId };
    }

    throw new Error('No HTTP email API key (RESEND_API_KEY or BREVO_API_KEY) configured.');
  },
};
