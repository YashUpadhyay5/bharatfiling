/**
 * Page content for /industries/:id, keyed by the ids in components/home/industrySolutions.js.
 *
 * `stages` lists catalogue slugs only: names, fees and links come from serviceCatalog.js, so a price change
 * reaches these pages by itself. `expertTopics` is work the slide promises that has no fixed-fee service yet;
 * those topics go to a paid consultation rather than to a service page that does not cover them.
 *
 * Tax and legal copy here needs CA / advocate review. Avoid rates and section numbers that change every budget.
 */
export const INDUSTRY_CONTENT = {
  'ngo-non-profit': {
    headline: 'Set up your non-profit and keep it compliant',
    intro:
      'Pick the right legal form, register it, and keep your annual filings on time so your organisation stays eligible for tax benefits and donor funding.',
    needs: ['Choosing between a trust and a Section 8 company', 'Tax exemption and donor deduction registrations', 'Annual returns that protect your exemption'],
    stages: [
      { title: 'Set up', blurb: 'Create the organisation and its tax identity.', services: ['trust-registration', 'section-8-company', 'pan-registration', 'tan-registration'] },
      { title: 'Stay compliant', blurb: 'Yearly filings and staff compliance.', services: ['business-itr', 'company-annual-roc-filing', 'tds-return-filing', 'monthly-payroll'] },
      { title: 'Get advice', blurb: 'For decisions and notices specific to you.', services: ['legal-consultation', 'income-tax-notice-response'] },
    ],
    expertTopics: ['Society registration', '12A and 80G registration', 'FCRA registration or prior permission', 'CSR-1 registration'],
    expertService: 'ca-consultation',
    faqs: [
      { q: 'Should we form a trust or a Section 8 company?', a: 'A trust is simpler to form and run, and is governed by trust law that varies by state. A Section 8 company is registered under the Companies Act, which means more annual filings but a structure many institutional donors are familiar with. Which suits you depends on your funding plans and who will run the organisation.' },
      { q: 'What do 12A and 80G registrations do?', a: '12A registration relates to income tax exemption for the organisation, and 80G lets eligible donors claim a deduction on their donations. They are separate from forming the organisation, so you apply for them after it is set up.' },
      { q: 'Do we need FCRA to accept foreign donations?', a: 'Yes. An organisation needs FCRA registration or prior permission before it accepts foreign contributions. Registration usually expects a track record of activity, so newer organisations generally look at prior permission first.' },
    ],
  },

  'contractors-infrastructure': {
    headline: 'Compliance for contractors, from tender to final bill',
    intro:
      'Get the registrations that tenders ask for, keep GST and TDS in order across running bills, and see what each project actually earns.',
    needs: ['Registrations that tenders ask for', 'GST and TDS on running bills', 'Accounts you can track project by project'],
    stages: [
      { title: 'Tender ready', blurb: 'The identity and registrations bids usually ask for.', services: ['gst-registration', 'udyam-registration', 'digital-signature', 'pan-registration', 'partnership-firm', 'private-limited-company'] },
      { title: 'Run projects', blurb: 'Monthly tax, site labour and bills.', services: ['gst-return', 'gst-invoicing-eway-bill', 'statutory-tds-compliance', 'pf-esi-registration', 'monthly-payroll', 'virtual-cfo'] },
      { title: 'Close the year', blurb: 'Annual returns and departmental queries.', services: ['business-itr', 'gstr-9-annual-return', 'gst-assessment-advisory', 'income-tax-notice-response'] },
    ],
    expertTopics: ['Checking tender eligibility documents', 'GST treatment of a specific contract', 'Government vendor registration'],
    expertService: 'ca-consultation',
    faqs: [
      { q: 'Which registrations do government tenders usually ask for?', a: 'Most ask for a PAN, GST registration and recent income tax returns, and e-tender portals need a Class 3 digital signature. Udyam registration can bring benefits for MSMEs in many tenders. Always check the requirements in the specific tender document.' },
      { q: 'How is a works contract treated under GST?', a: 'A works contract is treated as a supply of services under GST. The rate depends on the nature of the work and who it is for, so we confirm it against your contract.' },
      { q: 'Tax was deducted from my contract payments. Can I get credit for it?', a: 'Usually, yes. Income tax TDS is claimed in your income tax return against the entries in Form 26AS and AIS. GST TDS deducted by government departments is credited to your GST cash ledger once you accept it on the portal.' },
    ],
  },

  'd2c-ecommerce-retail': {
    headline: 'Sell online without the GST and reconciliation headaches',
    intro:
      'Register once, file on time, and match what marketplaces report against your own books, so you claim the credit you are owed.',
    needs: ['GST registration for marketplace selling', 'Matching marketplace reports with your books', 'Protecting your brand as you grow'],
    stages: [
      { title: 'Start selling', blurb: 'What marketplaces and payment partners ask for.', services: ['gst-registration', 'proprietorship', 'private-limited-company', 'fssai-food-license', 'import-export-code'] },
      { title: 'Run monthly', blurb: 'Returns, credit matching and invoices.', services: ['gst-return', 'gstr-2b-itc-reconciliation', 'gst-invoicing-eway-bill', 'virtual-cfo'] },
      { title: 'Protect and grow', blurb: 'Your brand and overseas sales.', services: ['trademark-registration', 'gst-lut-exporters', 'business-itr'] },
    ],
    expertTopics: ['TCS and marketplace settlement reconciliation', 'Inventory accounting setup', 'Selling in several states'],
    expertService: 'ca-consultation',
    faqs: [
      { q: 'Do I need GST to sell on a marketplace?', a: 'Usually, yes. Selling goods through a marketplace that collects TCS generally requires GST registration whatever your turnover, with a limited exception for small sellers supplying within their own state.' },
      { q: 'Can I claim the TCS a marketplace collects?', a: 'Yes, once you are registered. The marketplace reports it in its GSTR-8 filing, and you accept it on the GST portal so that it reaches your cash ledger.' },
      { q: 'Can I use the Composition Scheme if I sell on marketplaces?', a: 'Generally not. Suppliers of goods through a marketplace that has to collect TCS are not eligible for the scheme. Service suppliers and offline sellers have different rules, so check your own case with a CA.' },
    ],
  },

  'creators-freelancers': {
    headline: 'Tax and paperwork for creators and freelancers',
    intro:
      'File the right return for your income, know when GST applies, handle foreign payments properly, and put your work and contracts on a firm footing.',
    needs: ['Filing brand deals, platform and foreign income correctly', 'Knowing when GST applies to you', 'Protecting your content and getting contracts right'],
    stages: [
      { title: 'File your income', blurb: 'Returns and instalments through the year.', services: ['itr-filing', 'advance-tax-computation', 'income-tax-notice-response'] },
      { title: 'Register when you need to', blurb: 'GST, foreign clients and a business identity.', services: ['gst-registration', 'gst-return', 'gst-lut-exporters', 'proprietorship'] },
      { title: 'Protect your work', blurb: 'Your name, your content and your deals.', services: ['trademark-registration', 'copyright-registration', 'contract-drafting-ndas'] },
    ],
    expertTopics: ['Foreign income and tax credit', 'Whether presumptive taxation fits your work', 'Invoicing brands and agencies'],
    expertService: 'ca-consultation',
    faqs: [
      { q: 'When do I need GST registration?', a: 'Service providers generally need it once turnover crosses ₹20 lakh in a year, or ₹10 lakh in some special category states. Some situations can change this, so check how you are paid and who your clients are.' },
      { q: 'Is my foreign income taxable in India?', a: 'If you are a resident for tax purposes, your worldwide income is taxable in India, including platform payouts and foreign clients. If tax was already paid abroad, a foreign tax credit may be available.' },
      { q: 'Can I use presumptive taxation?', a: 'It depends on the kind of work you do and your receipts. Some professions qualify and others do not, so a CA should confirm it for your income before you file.' },
    ],
  },

  'tech-startups-saas': {
    headline: 'From incorporation to your first funding round',
    intro:
      'Choose the right structure, incorporate, and keep the company clean, so that you are ready when an investor starts due diligence.',
    needs: ['A structure that investors accept', 'Founder, employee and customer agreements', 'Filings that hold up in due diligence'],
    stages: [
      { title: 'Incorporate', blurb: 'The right entity and its registrations.', services: ['startup-structuring-advisory', 'private-limited-company', 'llp-registration', 'gst-registration'] },
      { title: 'Build the team', blurb: 'Payroll, deductions and agreements.', services: ['monthly-payroll', 'pf-esi-registration', 'statutory-tds-compliance', 'contract-drafting-ndas'] },
      { title: 'Stay investor ready', blurb: 'Annual filings, IP and capital changes.', services: ['company-annual-roc-filing', 'virtual-cfo', 'trademark-registration', 'increase-authorized-capital'] },
    ],
    expertTopics: ['DPIIT Startup India recognition', 'ESOP planning', 'Funding documents and cap table'],
    expertService: 'startup-structuring-advisory',
    faqs: [
      { q: 'Private limited company or LLP for a startup?', a: 'If you plan to raise equity funding or issue ESOPs, a private limited company is the usual choice, because investors can hold shares in it. An LLP can suit a services business with few partners and no plans to raise equity.' },
      { q: 'Who can get DPIIT recognition?', a: 'Recognition is open to private limited companies, LLPs and registered partnership firms that meet the age and turnover limits and are working on something innovative. A CA can check your eligibility against the current rules.' },
      { q: 'Does a company with no revenue still have to file?', a: 'Yes. A private limited company must file its annual ROC returns and its income tax return even with no revenue. Missing them leads to late fees that build up over time.' },
    ],
  },

  'real-estate-builders': {
    headline: 'Compliance for builders, developers and agents',
    intro:
      'Set up the right project entity and keep GST, TDS and accounts in order from launch to handover, with an expert on hand for RERA questions.',
    needs: ['RERA obligations for your project', 'GST and TDS on property deals', 'Project accounts and landowner agreements'],
    stages: [
      { title: 'Set up the project', blurb: 'The entity and tax registrations.', services: ['llp-registration', 'private-limited-company', 'partnership-firm', 'gst-registration', 'tan-registration'] },
      { title: 'Build and sell', blurb: 'Monthly tax, agreements and accounts.', services: ['gst-return', 'statutory-tds-compliance', 'contract-drafting-ndas', 'virtual-cfo'] },
      { title: 'Close and resolve', blurb: 'Annual returns, gains and disputes.', services: ['business-itr', 'capital-gains-advisory', 'income-tax-notice-response', 'gst-notice-hearing'] },
    ],
    expertTopics: ['RERA project or agent registration', 'RERA periodic updates', 'Joint development agreements'],
    expertService: 'legal-consultation',
    faqs: [
      { q: 'Does my project need RERA registration?', a: 'Generally yes, if the land is over 500 square metres or the project has more than eight units, unless an exemption applies. Agents who sell in registered projects also register. State rules and portals differ, so confirm the details for your state.' },
      { q: 'Is GST charged on property sales?', a: 'GST generally applies to a property sold while under construction. It does not generally apply to a completed property sold after the completion certificate is issued. The rate depends on the type of project.' },
      { q: 'What do I pay tax on when I sell land or a building?', a: 'A builder usually treats sales as business income, while an owner selling an investment property usually has capital gains. The treatment changes the tax and the exemptions you can claim.' },
    ],
  },

  'doctors-healthcare': {
    headline: 'Tax and compliance for doctors, clinics and hospitals',
    intro:
      'File your professional income correctly, run payroll for your staff, and work out which of your services and sales fall under GST.',
    needs: ['Professional income and advance tax', 'Which services and sales attract GST', 'Staff payroll and clinic registrations'],
    stages: [
      { title: 'Set up the practice', blurb: 'The structure and local registrations.', services: ['proprietorship', 'partnership-firm', 'llp-registration', 'shop-establishment', 'professional-tax'] },
      { title: 'File your income', blurb: 'Returns and instalments through the year.', services: ['itr-filing', 'business-itr', 'advance-tax-computation', 'income-tax-notice-response'] },
      { title: 'Run the clinic', blurb: 'Staff, accounts and GST where it applies.', services: ['monthly-payroll', 'pf-esi-registration', 'virtual-cfo', 'gst-registration'] },
    ],
    expertTopics: ['Clinical establishment registration', 'Pharmacy and drug licences', 'GST on cosmetic and other non-exempt services'],
    expertService: 'ca-consultation',
    faqs: [
      { q: 'Do doctors have to charge GST?', a: 'Many healthcare services by clinical establishments and doctors are exempt. Cosmetic procedures and medicine sales are commonly taxable, so a clinic with a mix of services may still need to register.' },
      { q: 'Can a doctor use presumptive taxation?', a: 'The medical profession is covered by the presumptive scheme for professionals, within a receipts limit. Whether it gives you a better result than regular books depends on your actual expenses.' },
      { q: 'Does my clinic need a separate registration?', a: 'Often, yes. Clinical establishment rules are set state by state, and some states do not apply the same Act. Your state health authority or a consultation can confirm what applies to you.' },
    ],
  },
};
