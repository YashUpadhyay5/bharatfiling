// Kept apart from ./configs so App.jsx can register the routes without bundling page content.
// Aliases redirect to the canonical /services/<slug> URL.
export const MCA_SERVICE_ROUTES = [
  { slug: 'company-annual-roc-filing', aliases: ['roc-filing', 'roc-annual-filing', 'aoc-4', 'mgt-7'] },
  { slug: 'llp-form-11-form-8', aliases: ['llp-annual-filing', 'llp-form-11', 'llp-form-8'] },
  { slug: 'director-kyc-dir-3', aliases: ['director-kyc', 'dir-3-kyc', 'din-kyc'] },
  { slug: 'add-remove-director', aliases: ['add-director', 'remove-director', 'dir-12'] },
  { slug: 'increase-authorized-capital', aliases: ['increase-authorised-capital', 'authorised-capital', 'sh-7'] },
  { slug: 'change-registered-office', aliases: ['registered-office-change', 'inc-22', 'inc-23'] },
  { slug: 'moa-aoa-amendment', aliases: ['moa-amendment', 'aoa-amendment', 'company-name-change'] },
  { slug: 'strike-off-company', aliases: ['company-strike-off', 'close-company', 'stk-2'] },
  { slug: 'strike-off-llp', aliases: ['llp-strike-off', 'close-llp', 'llp-form-24'] },
  { slug: 'charge-satisfaction-chg-1', aliases: ['charge-registration', 'charge-satisfaction', 'chg-1', 'chg-4'] },
];
