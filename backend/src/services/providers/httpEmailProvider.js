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

        // Handle Resend Trial Sandbox Mode:
        // In free trial mode, Resend restricts delivery strictly to the owner email.
        // We detect this and route the sandbox test email to the verified owner address so testing never fails!
        if (!res.ok && data.message && data.message.includes('own email address')) {
          const ownerMatch = data.message.match(/\(([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\)/);
          const ownerEmail = ownerMatch ? ownerMatch[1] : (ENV.SMTP_USER || 'yashupdhyay486@gmail.com');

          console.warn(`[Resend Sandbox Route]: Cannot send directly to ${to} in trial mode. Auto-routing to verified owner ${ownerEmail}...`);

          const sandboxBanner = `<div style="background:#fffbeb;border:1px solid #f59e0b;padding:12px 16px;border-radius:8px;margin-bottom:20px;font-family:sans-serif;color:#92400e;font-size:13px;line-height:18px;"><strong>⚠️ Resend Sandbox Delivery Notice:</strong><br/>In trial mode without a custom domain, emails requested for <strong>${to}</strong> are delivered to your verified developer email (<strong>${ownerEmail}</strong>).</div>`;
          const sandboxHtml = html.includes('<body>')
            ? html.replace('<body>', `<body>${sandboxBanner}`)
            : `${sandboxBanner}${html}`;

          const retryRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${ENV.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from,
              to: [ownerEmail],
              subject: `[Sandbox for ${to}] ${subject}`,
              html: sandboxHtml,
              text: `[Sandbox Notice: Requested for ${to}]\n\n${text}`,
            }),
          });

          const retryData = await retryRes.json().catch(() => ({}));
          if (retryRes.ok) {
            console.log(`[Resend Sandbox Dispatch Success]: Id=${retryData.id} ForwardedTo=${ownerEmail} (Intended=${to})`);
            return {
              success: true,
              provider: 'resend-sandbox-routed',
              messageId: retryData.id,
              sandboxOwner: ownerEmail,
              intendedRecipient: to,
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
