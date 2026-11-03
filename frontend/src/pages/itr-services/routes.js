// Kept apart from ./configs so App.jsx can register the routes without bundling page content.
// Aliases redirect to the canonical /services/<slug> URL.
export const ITR_SERVICE_ROUTES = [
  { slug: 'itr-filing', aliases: ['income-tax', 'income-tax-return', 'itr'] },
  { slug: 'itr-sole-proprietorship', aliases: ['sole-proprietorship-itr'] },
  { slug: 'business-itr', aliases: ['business-tax-return', 'company-itr', 'itr-5', 'itr-6', 'itr-7'] },
  { slug: 'form-15ca-15cb', aliases: ['15ca-15cb', 'form-15ca', 'form-15cb'] },
  { slug: 'capital-gains-advisory', aliases: ['capital-gains', 'capital-gains-tax'] },
  { slug: 'advance-tax-computation', aliases: ['advance-tax', 'advance-tax-calculation'] },
  { slug: 'form-16-generation', aliases: ['form-16'] },
];
