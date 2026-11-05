/**
 * Contact details used everywhere on the site (header, footer, contact page, WhatsApp buttons).
 * Change them here only. `whatsappNumber` is country code + number, digits only.
 */
export const SUPPORT = {
  phoneDisplay: '1800-890-8800',
  phoneTel: 'tel:18008908800',
  email: 'compliance@bharatfiling.in',
  hours: 'Mon – Sat, 9:00 AM – 7:00 PM IST',
  whatsappNumber: '917668976193',
  whatsappDisplay: '+91 76689 76193',
};

/** WhatsApp chat link, optionally with a pre-filled message. */
export const whatsappLink = (message) =>
  `https://wa.me/${SUPPORT.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
