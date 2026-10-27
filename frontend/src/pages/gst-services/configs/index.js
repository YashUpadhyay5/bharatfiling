import gstReturn from './gst-return.js';
import gstr9AnnualReturn from './gstr-9-annual-return.js';
import gstr2bItcReconciliation from './gstr-2b-itc-reconciliation.js';
import gstLutExporters from './gst-lut-exporters.js';
import gstNoticeReg03 from './gst-notice-reg-03.js';
import gstInvoicingEwayBill from './gst-invoicing-eway-bill.js';
import gstCompositionScheme from './gst-composition-scheme.js';
import gstAssessmentAdvisory from './gst-assessment-advisory.js';
import gstCancellationRevocation from './gst-cancellation-revocation.js';

export const GST_SERVICE_CONFIGS = [
  gstReturn,
  gstr9AnnualReturn,
  gstr2bItcReconciliation,
  gstLutExporters,
  gstNoticeReg03,
  gstInvoicingEwayBill,
  gstCompositionScheme,
  gstAssessmentAdvisory,
  gstCancellationRevocation,
];

export const getGstServiceConfig = (slug) => GST_SERVICE_CONFIGS.find((c) => c.slug === slug);
