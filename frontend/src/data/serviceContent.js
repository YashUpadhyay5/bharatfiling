/**
 * Page content shared by the service detail pages: benefits and FAQs per category, extra FAQs for
 * the most-asked services, and the business-entity comparison shown on the Startup pages.
 * Facts here are general; fees and timelines always come from serviceCatalog.js.
 */

export const CATEGORY_CONTENT = {
  startup: {
    benefits: ['Separate legal identity for the business', 'Easier access to bank loans and investors', 'Credibility with customers and vendors', 'Clear compliance calendar from day one'],
    faqs: [
      { q: 'How long does registration take?', a: 'The timeline shown on this page is the usual range once all documents are complete. Government processing times can vary.' },
      { q: 'Do I need to visit any office?', a: 'No. Documents are shared online and the filing is done on the government portal by our team.' },
      { q: 'Are government fees included in the professional fee?', a: 'No. The professional fee is shown separately. Government fees and stamp duty are paid at actuals and confirmed before you pay.' },
      { q: 'What happens after registration?', a: 'You receive your certificates digitally, and we can set up PAN, bank account support and ongoing compliance if you want it.' },
    ],
  },
  registrations: {
    benefits: ['Legal permission to operate or trade', 'Needed for banking, tenders and marketplaces', 'Handled end to end by a compliance expert', 'Renewal reminders so nothing lapses'],
    faqs: [
      { q: 'Who needs this registration?', a: 'It depends on your activity, turnover and state. Our team checks eligibility before filing.' },
      { q: 'How long is the registration valid?', a: 'Validity differs by registration. Your confirmation lists the term and the renewal date.' },
      { q: 'Are government fees included?', a: 'No. The professional fee is shown separately and government fees are paid at actuals.' },
      { q: 'Can I track my application?', a: 'Yes. We share the application number and update you at each stage.' },
    ],
  },
  trademark: {
    benefits: ['Exclusive rights to your brand name and logo', 'Legal action against copycats', 'A brand asset you can license or sell', 'Use of the TM symbol from the date of filing'],
    faqs: [
      { q: 'How long does it take to get a trademark?', a: 'Filing takes a day or two. Examination, publication and registration take several months, depending on the Registry.' },
      { q: 'Can I use the TM symbol after filing?', a: 'Yes, once the application is filed. The registered symbol is allowed only after registration.' },
      { q: 'Is a search needed first?', a: 'We recommend it. A search shows whether a similar mark already exists.' },
      { q: 'Are government fees included?', a: 'No. They are charged per class at the Registry schedule and shown before you pay.' },
    ],
  },
  gst: {
    benefits: ['Stay compliant and avoid late fees', 'Claim every eligible Input Tax Credit', 'Returns reviewed by a Chartered Accountant', 'Reminders before every due date'],
    faqs: [
      { q: 'What do you need from me every month?', a: 'Sales and purchase data or portal access. We tell you exactly what is missing.' },
      { q: 'What if I have no sales in a month?', a: 'A nil return still has to be filed. We handle that too.' },
      { q: 'Do you handle notices?', a: 'Yes. Notice replies are available as a separate service.' },
      { q: 'Is GST charged on your fee?', a: 'Yes, 18% GST applies on the professional fee.' },
    ],
  },
  'income-tax': {
    benefits: ['Accurate returns reviewed by a Chartered Accountant', 'Right regime and deductions chosen for you', 'Refund tracking after filing', 'Support if the department sends a notice'],
    faqs: [
      { q: 'Which documents do I need?', a: 'Form 16 or income details, AIS and Form 26AS, bank interest certificates and deduction proofs.' },
      { q: 'Can you pick the better tax regime for me?', a: 'Yes. We compare the Old and New regime and file under the one that costs you less.' },
      { q: 'When is the due date?', a: 'The due date depends on your category. We remind you well before it.' },
      { q: 'Is the e-verification included?', a: 'Yes, we guide you through e-verification so the return is complete.' },
    ],
  },
  mca: {
    benefits: ['Avoid ROC penalties and director disqualification', 'Filings prepared by a company secretary or CA', 'Records kept current for banks and investors', 'One team for every company-law change'],
    faqs: [
      { q: 'What happens if I miss an MCA filing?', a: 'Late fees apply per day and repeated default can lead to disqualification of directors or strike off.' },
      { q: 'What do you need from me?', a: 'Financials, resolutions and director details, as listed on this page.' },
      { q: 'Are MCA fees included?', a: 'No. MCA fees are paid at actuals and shown before you pay.' },
      { q: 'Can you handle the whole year of compliance?', a: 'Yes. Ask us for an annual compliance plan.' },
    ],
  },
  compliance: {
    benefits: ['Never miss a statutory due date', 'One monthly workflow instead of many portals', 'Records ready for audits and inspections', 'Handled by the same team that files your returns'],
    faqs: [
      { q: 'How does the monthly process work?', a: 'You share the month inputs by an agreed date, we process and file, and you receive confirmations.' },
      { q: 'Can I add more employees later?', a: 'Yes. The fee changes only when you move to a higher slab.' },
      { q: 'Do you provide a dedicated contact?', a: 'Yes. You get a named executive for follow-ups.' },
      { q: 'Is government fee included?', a: 'No. Statutory contributions and fees are paid by you at actuals.' },
    ],
  },
  consultation: {
    benefits: ['Direct talk with a qualified professional', 'Clear written summary after the call', 'No obligation to buy any other service', 'Fixed fee, no surprise charges'],
    faqs: [
      { q: 'How soon can I speak to an expert?', a: 'Usually within the time shown on this page after you book.' },
      { q: 'Is the call recorded?', a: 'We do not record calls. You get a written summary instead.' },
      { q: 'Can I upload documents first?', a: 'Yes. Share them when you book so the expert can prepare.' },
      { q: 'What if I need more help afterwards?', a: 'We can quote the follow-up work. The consultation fee is not a commitment.' },
    ],
  },
};

/** Entity comparison shown on the Startup pages (liability, members, best fit). */
export const ENTITY_COMPARISON = [
  { slug: 'proprietorship', name: 'Proprietorship', members: '1 owner', liability: 'Unlimited', fit: 'Freelancers and small shops' },
  { slug: 'partnership-firm', name: 'Partnership', members: '2+ partners', liability: 'Unlimited', fit: 'Small family or professional firms' },
  { slug: 'one-person-company', name: 'One Person Company', members: '1 director + 1 nominee', liability: 'Limited', fit: 'Solo founders wanting a company' },
  { slug: 'llp-registration', name: 'LLP', members: '2+ partners', liability: 'Limited', fit: 'Professional firms, low compliance' },
  { slug: 'private-limited-company', name: 'Private Limited', members: '2+ directors and shareholders', liability: 'Limited', fit: 'Startups raising funds' },
];

/** Extra FAQs for the services people ask about most. */
export const SERVICE_FAQS = {
  'private-limited-company': [
    { q: 'How many directors and shareholders are needed?', a: 'At least two directors and two shareholders. A director can also be a shareholder, and one director must be a resident of India.' },
    { q: 'Can a foreign national be a director?', a: 'Yes, as long as at least one director is a resident of India.' },
    { q: 'Can I change the company name later?', a: 'Yes, through a name-change filing with the ROC. It needs resolutions and a fee.' },
  ],
  'llp-registration': [
    { q: 'How many partners does an LLP need?', a: 'A minimum of two designated partners, and at least one must be a resident of India.' },
    { q: 'Is an audit compulsory for an LLP?', a: 'Only when turnover or contribution crosses the prescribed limits.' },
  ],
  'itr-filing': [{ q: 'Which ITR form applies to me?', a: 'It depends on your income sources. We choose the form after reviewing your documents.' }],
  'trademark-registration': [{ q: 'Which class should I file in?', a: 'Your goods or services decide the class. We recommend the right class and can file in more than one.' }],
  'pan-registration': [
    { q: 'Who is legally required to obtain a PAN card in India?', a: 'Every individual or business entity earning taxable income, conducting transactions with turnover exceeding ₹5,00,000, opening current or savings accounts, or executing specified financial transactions must obtain a PAN under Section 139A of the Income Tax Act.' },
    { q: 'What is the difference between an e-PAN and a physical PVC PAN card?', a: 'Both hold equal statutory validity. An e-PAN is a digitally signed PDF issued quickly by the Income Tax Department via email, while the physical PVC card is embossed with high-security QR and dispatched by post to your registered address.' },
    { q: 'Can I apply for PAN correction, update, or re-print?', a: 'Yes. If your name, father\'s name, date of birth, or photograph contains errors or needs an update, or if your physical card is lost or damaged, you can apply for correction or duplicate re-print using this service.' },
    { q: 'Which application form is used for PAN registration?', a: 'Indian citizens, HUFs, companies, LLPs, and partnership firms apply using Form 49A. Foreign nationals, non-resident entities, and foreign companies apply using Form 49AA.' },
  ],
  'tan-registration': [
    { q: 'What is TAN and why is it mandatory?', a: 'Tax Deduction and Collection Account Number (TAN) is a unique 10-digit alphanumeric code issued by the Income Tax Department. Under Section 203A, it is mandatory for any person or entity deducting tax (TDS) or collecting tax (TCS) on salary, contractor, rent, or professional fees.' },
    { q: 'Can I quote PAN instead of TAN when depositing TDS?', a: 'No. PAN cannot be quoted in place of TAN. Failing to obtain TAN or quoting PAN instead of TAN on TDS challans and returns attracts a mandatory penalty of ₹10,000 under Section 272BB of the Income Tax Act.' },
    { q: 'Do sole proprietors and professionals need a TAN?', a: 'Yes, if a sole proprietor or professional makes payments subject to TDS provisions (such as Section 194C for contractors, 194J for professional fees, 194I for commercial rent, or 194IB for high residential rent), obtaining a TAN is mandatory.' },
    { q: 'How long does it take to get a TAN allotted?', a: 'Once Form 49B is submitted on the Income Tax Protean / NSDL portal, the 10-digit TAN allotment letter is typically issued within 2 to 3 working days.' },
  ],
};
