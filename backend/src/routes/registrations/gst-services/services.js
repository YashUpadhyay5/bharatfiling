// Checkout definitions for the GST service flows. Plan fees and answer values must match
// frontend/src/pages/gst-services/configs (enforced by tests/gstServicesE2E.test.js).

const plans = (standard, premium, elite) => ({
  standard: { name: 'Standard', fee: standard },
  premium: { name: 'Premium', fee: premium },
  elite: { name: 'Elite', fee: elite },
});

const choice = (label, values) => ({ type: 'choice', label, values });
const text = (label, max = 80) => ({ type: 'text', label, max });
const multi = (values) => ({ type: 'multi', values });

export const GST_SERVICES = {
  'gst-return': {
    name: 'GST Return Filing',
    moduleType: 'GSTR',
    plans: plans(999, 2999, 4999),
    fields: {
      industryType: text('your industry type'),
      turnover: choice('your estimated turnover', ['0-1L', '1L-10L', '10L-1Cr', '1Cr+']),
    },
  },
  'gstr-9-annual-return': {
    name: 'GSTR-9 Annual Return',
    moduleType: 'GSTR9',
    plans: plans(2999, 4999, 9999),
    fields: {
      turnover: choice('your annual turnover', ['upto-2cr', '2cr-5cr', '5cr-20cr', 'above-20cr']),
      returnsStatus: choice('the status of your returns', ['all-filed', 'some-pending', 'not-sure']),
    },
  },
  'gstr-2b-itc-reconciliation': {
    name: 'GSTR-2B ITC Reconciliation',
    moduleType: 'ITC',
    plans: plans(999, 2499, 4999),
    fields: {
      invoiceVolume: choice('your monthly invoice volume', ['upto-100', '101-500', '501-2000', 'above-2000']),
      booksSoftware: choice('where you keep purchase records', ['tally', 'zoho', 'excel-other', 'none']),
    },
  },
  'gst-lut-exporters': {
    name: 'GST LUT for Exporters',
    moduleType: 'LUT',
    plans: plans(799, 1999, 4999),
    fields: {
      exportType: choice('what you export', ['goods', 'services', 'both', 'sez']),
      lutStatus: choice('whether this is your first LUT', ['first', 'renewal']),
    },
  },
  'gst-notice-reg-03': {
    name: 'GST Clarification (REG-03)',
    moduleType: 'REG03',
    plans: plans(999, 1999, 3999),
    fields: {
      noticeAge: choice('when you received the notice', ['today', '1-3-days', '4-7-days', 'over-7-days']),
      queryType: choice('what the officer asked for', ['address', 'identity', 'business', 'other']),
    },
  },
  'gst-invoicing-eway-bill': {
    name: 'GST Invoicing & E-Way Bill',
    moduleType: 'EWB',
    plans: plans(999, 2499, 4999),
    fields: {
      needType: choice('what you need help with', ['eway-bill', 'e-invoice', 'invoice-format', 'all']),
      billingSoftware: choice('your billing software', ['tally', 'zoho', 'busy', 'excel-other', 'none']),
    },
  },
  'gst-composition-scheme': {
    name: 'GST Composition Scheme',
    moduleType: 'CMP',
    plans: plans(999, 2999, 4999),
    fields: {
      businessType: choice('your type of business', ['trader', 'manufacturer', 'restaurant', 'services']),
      turnover: choice('your last year turnover', ['upto-50l', '50l-1.5cr', 'above-1.5cr']),
    },
  },
  'gst-assessment-advisory': {
    name: 'GST Assessment Advisory',
    moduleType: 'GSTADV',
    plans: plans(2999, 7999, 14999),
    fields: {
      noticeType: choice('the notice you received', ['scrutiny', 'audit', 'show-cause', 'other']),
      replyDue: choice('when the reply is due', ['within-7', '8-15', '16-30', 'overdue', 'not-sure']),
    },
  },
  'gst-cancellation-revocation': {
    name: 'GST Cancellation & Revocation',
    moduleType: 'GSTCR',
    plans: plans(399, 1999, 4999),
    fields: {
      requestType: choice('what you need help with', ['revocation', 'cancellation', 'not_sure']),
      propertyType: choice('your office property type', ['rented', 'family', 'own', 'others']),
      businessStatus: multi(['running_need_compliance', 'exploring']),
    },
  },
};

export const getGstService = (slug) =>
  Object.hasOwn(GST_SERVICES, slug) ? { slug, ...GST_SERVICES[slug] } : null;
