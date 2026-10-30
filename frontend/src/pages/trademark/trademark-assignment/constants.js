/**
 * Constants and statutory data for Trademark Assignment Module.
 * Governed by Sections 37 to 45 of the Trade Marks Act, 1999 & Trade Marks Rules, 2017.
 * Platform: BharatFiling / Vakilsearch 1:1 Parity
 */

export const ASSIGNMENT_HERO_BULLETS = [
  'Expert-led trademark transfer service to protect your trademarks',
  'Our expert IP lawyers handle your trademark transfer smoothly',
  '100% online process, expert lawyer support, and real-time tracking.',
];

export const TESTIMONIALS = [
  {
    quote:
      'A supportive and efficient team to work with. Always prompt, clear, and respectful in communication. It’s been a pleasure collaborating with them.',
    author: 'Siddharth Rao',
    role: 'Director at InnoVEdge Technologies',
    rating: 5,
  },
  {
    quote:
      'Transferring our registered trademark along with brand goodwill was handled flawlessly. Form TM-P and the assignment deed were executed within 48 hours with zero registry objections.',
    author: 'Deepa Sundaram',
    role: 'Co-founder, Zenora Healthcare Private Limited',
    rating: 5,
  },
  {
    quote:
      'The assignment deed drafting was thorough, protecting both assignor and assignee rights with airtight indemnity clauses. Transparent pricing and seamless tracking.',
    author: 'Rajesh Mittal',
    role: 'Managing Director, Apex Infotech Logistics',
    rating: 5,
  },
];

export const TRUSTED_PARTNERS = [
  { name: 'Swiggy', color: '#FC8019' },
  { name: 'CaratLane', color: '#DE57E5' },
  { name: 'mCaffeine', color: '#1B1B1B' },
  { name: 'Vaya', color: '#D9232D' },
  { name: 'CavinKare', color: '#004A99' },
];

export const STATUTORY_HIGHLIGHTS = [
  {
    label: 'Statutory Act',
    value: 'Trade Marks Act, 1999',
    subtext: 'Sections 37 to 45 & Rules 2017',
  },
  {
    label: 'Official Form',
    value: 'Form TM-P',
    subtext: 'Mandatory filing with Registry',
  },
  {
    label: 'Filing Deadline',
    value: 'Within 6 Months',
    subtext: 'From assignment deed execution',
  },
  {
    label: 'Ownership Transfer',
    value: '100% Legal Ownership',
    subtext: 'Exclusive commercial rights to assignee',
  },
];

export const ASSIGNMENT_TYPES = [
  {
    id: 'complete',
    title: 'Complete Assignment',
    statutoryRef: 'Section 37',
    badge: 'Full Ownership',
    summary:
      'All exclusive rights associated with the trademark across all registered classes and goods/services are permanently transferred to the assignee.',
    points: [
      'Complete transfer of exclusive title & monopoly',
      'Assignee can license, franchise, or sell the mark',
      'Original owner retains zero rights to the brand',
    ],
  },
  {
    id: 'partial',
    title: 'Partial Assignment',
    statutoryRef: 'Section 38',
    badge: 'Class/Good Specific',
    summary:
      'The trademark ownership is transferred only for specific designated goods, services, or product categories, while the assignor retains ownership for the remaining classes.',
    points: [
      'Ownership transferred only for select products or services',
      'Assignor retains rights for other business lines',
      'Ideal for corporate divestitures and spin-offs',
    ],
  },
  {
    id: 'with_goodwill',
    title: 'Assignment With Goodwill',
    statutoryRef: 'Section 39',
    badge: 'Brand Value Included',
    summary:
      'The trademark along with the established market reputation, client base, and commercial goodwill associated with the brand is transferred to the assignee.',
    points: [
      'Assignee inherits market goodwill and reputation',
      'Right to use the brand for already established products',
      'No advertisement requirement under Section 42',
    ],
  },
  {
    id: 'without_goodwill',
    title: 'Assignment Without Goodwill (Gross)',
    statutoryRef: 'Section 42',
    badge: 'Gross Transfer',
    summary:
      'The trademark is assigned without transferring the business goodwill. The assignee can only use the trademark for other or newly developed goods/services.',
    points: [
      'Assignor continues existing business operations',
      'Mandatory Registrar advertisement direction under Section 42',
      'Must be published in newspapers as directed by Registrar',
    ],
  },
];

export const ASSIGNMENT_STEPS = [
  {
    stepNumber: '01',
    title: 'Title Verification & Due Diligence',
    duration: '1 - 2 Days',
    description:
      'Senior IP attorneys conduct thorough legal due diligence on the trademark status, verifying registration validity, pending objections, oppositions, encumbrances, or ongoing litigation.',
  },
  {
    stepNumber: '02',
    title: 'Drafting & Execution of Assignment Deed',
    duration: '2 - 3 Days',
    description:
      'Custom drafting of the Trademark Assignment Agreement incorporating crucial statutory clauses: transfer scope, consideration, goodwill clause, warranties, indemnities, and state stamp duty compliance.',
  },
  {
    stepNumber: '03',
    title: 'Filing Form TM-P with Trade Marks Registry',
    duration: '1 Day',
    description:
      'Online submission of Form TM-P along with the notarized assignment deed, Statement of Case (Affidavit), NOC, and Form TM-48 power of attorney on the official IP India portal.',
  },
  {
    stepNumber: '04',
    title: 'Registry Review & Certificate Endorsement',
    duration: 'Official Entry',
    description:
      'The Registrar of Trademarks scrutinizes the application and enters the assignee as the subsequent registered proprietor in the Register of Trade Marks. Official transmission certificate issued.',
  },
];

export const REQUIRED_DOCUMENTS = [
  {
    doc: 'Trademark Assignment Deed',
    importance: 'Mandatory',
    description: 'Legally binding deed executed on requisite non-judicial stamp paper, signed by assignor and assignee.',
  },
  {
    doc: 'Trademark Certificate / Details',
    importance: 'Mandatory',
    description: 'Copy of Registration Certificate or official TM application receipt with current registration number.',
  },
  {
    doc: 'No Objection Certificate (NOC)',
    importance: 'Mandatory',
    description: 'NOC from the assignor confirming complete relinquishment of rights upon agreed consideration.',
  },
  {
    doc: 'Affidavit / Statement of Case',
    importance: 'Mandatory',
    description: 'Affidavit verifying the facts of the assignment deed under Rule 75 of Trade Marks Rules, 2017.',
  },
  {
    doc: 'Power of Attorney (Form TM-48)',
    importance: 'Mandatory',
    description: 'Authorizing BharatFiling registered trademark agents/advocates to represent before the Registry.',
  },
  {
    doc: 'Board Resolution / Authority Letter',
    importance: 'For Companies/LLPs',
    description: 'Resolution authorizing the designated director/partner to execute the deed and transfer intellectual property.',
  },
];

export const ASSIGNMENT_PACKAGES = [
  {
    id: 'consultation',
    name: 'IP Attorney Consultation',
    price: 499,
    originalPrice: 999,
    discountBadge: '50% Off',
    popular: false,
    summary: 'Strategic 30-min consultation with a registered Trademark Attorney.',
    features: [
      '30-min strategy call with Senior Trademark Attorney',
      'Assessment of trademark transferability (With vs Without Goodwill)',
      'Stamp duty calculation for your specific state',
      'Review of existing trademark portfolio & title validity',
      'Roadmap for Form TM-P submission & registry timelines',
    ],
    ctaText: 'Book Consultation',
  },
  {
    id: 'standard',
    name: 'Trademark Assignment Filing',
    price: 4999,
    originalPrice: 7999,
    discountBadge: '38% Off',
    popular: true,
    summary: 'Complete legal deed drafting and official Form TM-P e-filing.',
    features: [
      'Comprehensive title verification on Trade Marks Registry',
      'Custom drafting of Trademark Assignment Deed & Affidavit',
      'State-specific stamp paper guidance and notarization checklist',
      'Filing of Form TM-P & Form TM-48 on the official IP India portal',
      'Official government CBR receipt generated in 24 hours',
      'End-to-end tracking until ownership update in registry',
    ],
    ctaText: 'Transfer Trademark',
  },
  {
    id: 'comprehensive',
    name: 'Multi-Class / Corporate Assignment',
    price: 9999,
    originalPrice: 14999,
    discountBadge: '33% Off',
    popular: false,
    summary: 'For corporate mergers, multi-class brands, and complex asset transfers.',
    features: [
      'Full IP portfolio audit across multiple trademark classes',
      'Drafting of comprehensive asset purchase & assignment deed',
      'Director board resolutions & corporate compliance documents',
      'Section 42 advertisement directions & newspaper publication support',
      'Filing Form TM-P across all associated trademarks/classes',
      'Personal Trademark Attorney assigned until final registration certificate',
    ],
    ctaText: 'Corporate Assignment',
  },
];

export const ASSIGNMENT_FAQS = [
  {
    q: 'What is a Trademark Assignment under Indian law?',
    a: 'Under the Trade Marks Act, 1999, a trademark assignment is the legal transfer of ownership rights, title, and interest in a registered trademark or pending trademark application from the owner (Assignor) to another party (Assignee). Once assigned and recorded with the Trade Marks Registry, the assignee becomes the new exclusive legal owner.',
  },
  {
    q: 'What is the difference between Assignment With Goodwill and Without Goodwill?',
    a: 'In an "Assignment with Goodwill", the assignee gets the trademark along with the established reputation and customer base of the existing business. In an "Assignment without Goodwill" (Gross assignment), the assignee only gets the rights to the trademark for new or different goods/services, while the assignor may continue existing operations. Assignments without goodwill require mandatory advertising directions from the Registrar under Section 42.',
  },
  {
    q: 'Can an unregistered or pending trademark application be assigned in India?',
    a: 'Yes. Section 39 of the Trade Marks Act, 1999 explicitly permits the assignment of unregistered trademarks as well as pending trademark applications. Form TM-P is used to record the subsequent applicant or owner on the Trade Marks Registry.',
  },
  {
    q: 'What is Form TM-P and what is the deadline to file it?',
    a: 'Form TM-P is the statutory application prescribed under the Trade Marks Rules to request the Registrar to record a change of ownership or subsequent proprietor. Under Section 45, Form TM-P must be filed within 6 months from the date of execution of the assignment deed. Extensions can be requested upon payment of prescribed late fees.',
  },
  {
    q: 'Is stamp duty mandatory on a Trademark Assignment Deed?',
    a: 'Yes. An assignment deed is a conveyance of intangible property and is subject to stamp duty as per the Indian Stamp Act, 1899 or the relevant State Stamp Act where the deed is executed. The stamp duty rate varies from state to state (typically based on the consideration value stated in the agreement). BharatFiling assists in calculating and affixing the appropriate state stamp duty.',
  },
  {
    q: 'What is the government fee for filing Form TM-P?',
    a: 'The official statutory filing fee for Form TM-P for individuals, startups, and small enterprises (MSME) is ₹9,000 per trademark per class. For large corporate entities, the official fee is ₹10,000 per class. Filing within the 6-month statutory window avoids additional late filing penalties.',
  },
  {
    q: 'How long does the Trade Marks Registry take to update the new owner’s name?',
    a: 'Once Form TM-P is submitted online with the IP India portal, the official Application Receipt (CBR) is generated immediately establishing priority. The Trade Marks Registry typically examines and updates the register with the assignee’s details within 3 to 6 months, after which an official certificate of recordal is issued.',
  },
];
