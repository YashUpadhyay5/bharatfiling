// Kept apart from ./configs so App.jsx can register the routes without bundling page content.
// Aliases redirect to the canonical /services/<slug> URL.
export const ITR_SERVICE_ROUTES = [
  { slug: 'itr-filing', aliases: ['income-tax', 'income-tax-return', 'itr'] },
  { slug: 'itr-sole-proprietorship', aliases: ['sole-proprietorship-itr'] },
];
