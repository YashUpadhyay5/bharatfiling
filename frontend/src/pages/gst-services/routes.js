// Kept apart from ./configs so App.jsx can register the routes without bundling page content.
// Aliases redirect to the canonical /services/<slug> URL.
export const GST_SERVICE_ROUTES = [
  { slug: 'gst-return', aliases: ['gst-return-filing'] },
  { slug: 'gstr-9-annual-return' },
  { slug: 'gstr-2b-itc-reconciliation' },
  { slug: 'gst-lut-exporters' },
  { slug: 'gst-notice-reg-03' },
  { slug: 'gst-invoicing-eway-bill' },
  { slug: 'gst-composition-scheme' },
  { slug: 'gst-assessment-advisory' },
  { slug: 'gst-cancellation-revocation', aliases: ['gst-cancellation', 'gst-revocation'] },
];
