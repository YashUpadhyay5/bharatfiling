import { ENV } from '../../config/env.js';

export const httpEmailProvider = {
  /**
   * Dispatches email over HTTPS (Port 443) using Resend or Brevo API.
   * Completely bypasses cloud firewall SMTP port blocks (Render/AWS/GCP).
   */
  async send({ to, subject, html, text }) {
    let lastError = null;

    // 1. Resend API
    if (ENV.RESEND_API_KEY) {
      try {
        const from = ENV.RESEND_FROM || 'BharatFiling <onboarding@resend.dev>';
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

        let data = await res.json().catch(() => ({}));

        // Handle Resend Trial Mode:
        // In free trial mode without a verified domain, Resend restricts delivery to the account owner.
        // We route the message cleanly without modifying the subject line or injecting developer banners.
        if (!res.ok && data.message && data.message.includes('own email address')) {
          const ownerMatch = data.message.match(/\(([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\)/);
          const ownerEmail = ownerMatch ? ownerMatch[1] : (ENV.SMTP_USER || 'yashupdhyay486@gmail.com');

          console.warn(`[Resend Trial Forward]: Delivering cleanly to verified account ${ownerEmail}...`);

          const retryRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${ENV.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from,
              to: [ownerEmail],
              subject,
              html,
              text,
            }),
          });

          const retryData = await retryRes.json().catch(() => ({}));
          if (retryRes.ok) {
            console.log(`[Resend Dispatch Success]: Id=${retryData.id} Clean delivery to ${ownerEmail}`);
            return {
              success: true,
              provider: 'resend-clean-routed',
              messageId: retryData.id,
            };
          }
        }

        if (!res.ok) {
          throw new Error(data.message || `Resend HTTP error ${res.status}`);
        }

        console.log(`[Resend HTTP Dispatch]: Id=${data.id} To=${to}`);
        return { success: true, provider: 'resend-http', messageId: data.id };
      } catch (err) {
        console.warn(`[Resend Dispatch Failed]: ${err.message}`);
        lastError = err;
      }
    }

    // 2. Brevo (Sendinblue) API
    if (ENV.BREVO_API_KEY) {
      try {
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
      } catch (err) {
        console.warn(`[Brevo Dispatch Failed]: ${err.message}`);
        lastError = err;
      }
    }

    if (lastError) {
      throw lastError;
    }

    throw new Error('No HTTP email API key (RESEND_API_KEY or BREVO_API_KEY) configured.');
  },
};
