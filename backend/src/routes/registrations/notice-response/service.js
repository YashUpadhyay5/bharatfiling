// Checkout definition for the Income Tax Notice Response consultation. The fee must match
// frontend/src/pages/notice-response (enforced by tests/noticeResponseE2E.test.js).

export const NOTICE_SERVICE = {
  slug: 'income-tax-notice-response',
  name: 'Income Tax Notice Response',
  moduleType: 'NOTICE',
};

// The up-front fee for a call with a tax expert at the booked time, before GST.
export const NOTICE_CONSULTATION_FEE = 499;
