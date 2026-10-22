/**
 * Contact details used everywhere on the site (header, footer, contact page, WhatsApp buttons).
 * Change them here only.
 *
 * TODO(business): `whatsappNumber` is still the placeholder 91 98765 43210 - replace it with the
 * real WhatsApp Business number (country code + number, digits only) before launch.
 */
export const SUPPORT = {
  phoneDisplay: '1800-890-8800',
  phoneTel: 'tel:18008908800',
  email: 'compliance@bharatfiling.in',
  hours: 'Mon – Sat, 9:00 AM – 7:00 PM IST',
  whatsappNumber: '919876543210',
  whatsappDisplay: '+91 98765 43210',
};

/** WhatsApp chat link, optionally with a pre-filled message. */
export const whatsappLink = (message) =>
  `https://wa.me/${SUPPORT.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
