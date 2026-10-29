/**
 * Constants and statutory data for Copyright Registration Module.
 * Governed by the Copyright Act, 1957 & Copyright Rules, 2013 (amended 2021).
 */

export const COPYRIGHT_STATUTORY_HIGHLIGHTS = [
  'Protect your creative work, from books to software, with legal rights under the Copyright Act, 1957. T&C*',
  'Get expert-assisted registration to avoid infringement and secure ownership.',
  'Register online with Zolvit, trusted by over 20,000 Indian creators for fast and reliable copyright protection.',
];

export const TESTIMONIALS = [
  {
    quote:
      'Excellent service and support. Vakil Search Team is very supportive and professional. I Really appreciate the service and support from the team.',
    author: 'Rachna Pathania',
    role: 'Founder & CEO of SchnellTek Software Pvt. Ltd.',
    rating: 5,
  },
  {
    quote:
      'BharatFiling assisted us in registering copyright for our proprietary enterprise analytics software source code. Diary number was issued in 24 hours and certificate arrived without any objection.',
    author: 'Aakash Verma',
    role: 'Co-Founder & CTO, Nexus Cloud Technologies',
    rating: 5,
  },
  {
    quote:
      'As an author and illustrator, protecting my graphic novel series was crucial. Their IP attorneys handled the Form XIV filing, TM-60 search certificate, and Registry follow-up flawlessly.',
    author: 'Pooja Bhattacharya',
    role: 'Author & Visual Artist, Blue Horizon Studios',
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

export const COPYRIGHT_CATEGORIES = [
  {
    id: 'literary',
    title: 'Literary Works',
    statutorySection: 'Section 2(o)',
    description:
      'Books, manuscripts, articles, poems, research papers, training modules, website content, catalogues, and computer databases.',
    govtFee: 500,
    icon: 'BookOpen',
    examples: ['Books & eBooks', 'Articles & Blogs', 'Website Content', 'Training Manuals'],
  },
  {
    id: 'software',
    title: 'Computer Software & Source Code',
    statutorySection: 'Section 2(o) & 2(ffb)',
    description:
      'Source code, object code, software applications, algorithms, web platforms, and mobile apps (iOS & Android).',
    govtFee: 500,
    icon: 'Code2',
    examples: ['Source Code', 'Mobile App Code', 'Web Platform Logic', 'APIs & Databases'],
  },
  {
    id: 'artistic',
    title: 'Artistic Works & Logos',
    statutorySection: 'Section 2(c)',
    description:
      'Logos, label designs, illustrations, brand characters, paintings, photographs, architectural drawings, and graphics.',
    govtFee: 2000,
    icon: 'Palette',
    examples: ['Brand Logos', 'Illustrations & UI/UX', 'Photographs & Art', 'Product Packaging'],
    note: 'Requires Form TM-60 NOC from Trademark Registry if capable of commercial use.',
  },
  {
    id: 'musical',
    title: 'Musical Works',
    statutorySection: 'Section 2(p)',
    description:
      'Original musical compositions, chords, melody lines, background scores, and graphical musical notations.',
    govtFee: 2000,
    icon: 'Music',
    examples: ['Original Songs', 'Instrumental Tracks', 'Jingles & Tunes', 'Sheet Music'],
  },
  {
    id: 'cinematograph',
    title: 'Cinematograph Films & Videos',
    statutorySection: 'Section 2(f)',
    description:
      'Feature films, documentaries, video podcasts, animated videos, promotional ads, and visual recordings.',
    govtFee: 5000,
    icon: 'Film',
    examples: ['Feature Films', 'YouTube Series', 'Commercial Ads', 'Animated Shorts'],
  },
  {
    id: 'sound_recording',
    title: 'Sound Recordings',
    statutorySection: 'Section 2(xx)',
    description:
      'Master audio tracks, recorded songs, voiceovers, audiobooks, podcasts, and recorded speeches.',
    govtFee: 2000,
    icon: 'Mic',
    examples: ['Audiobooks', 'Podcasts', 'Master Soundtracks', 'Voiceover Records'],
  },
];

export const LEGAL_RIGHTS = [
  {
    title: 'Right of Reproduction',
    desc: 'Exclusive legal right to reproduce and copy the work in any material form, including digital storage on servers, hard drives, or cloud platforms.',
    section: 'Section 14(a)(i)',
  },
  {
    title: 'Right of Distribution & Sale',
    desc: 'Sole authority to issue copies of the work to the public by sale, rental, lease, or commercial distribution.',
    section: 'Section 14(a)(ii)',
  },
  {
    title: 'Right to Create Derivative Works',
    desc: 'Exclusive right to produce adaptations, sequels, translations, remixes, or spin-offs based on the original work.',
    section: 'Section 14(a)(viii)',
  },
  {
    title: 'Right of Public Performance & Broadcast',
    desc: 'Exclusive right to perform the work in public, stage plays, screen cinematograph films, or stream online.',
    section: 'Section 14(a)(iii)',
  },
  {
    title: 'Moral Rights (Special Rights of Author)',
    desc: 'Perpetual right to claim authorship (Paternity Right) and restrain any mutilation, distortion, or modification detrimental to honor (Integrity Right).',
    section: 'Section 57',
  },
  {
    title: 'International Copyright Protection',
    desc: 'Protection extends automatically across 181+ foreign countries under the Berne Convention, Universal Copyright Convention, and TRIPS Agreement.',
    section: 'International Conventions',
  },
];

export const REGISTRATION_STEPS = [
  {
    step: '01',
    title: 'Document & Work Compilation',
    desc: 'Our IP attorneys audit your creative work, prepare Statement of Particulars (SoP), and structure source code/manuscript format as per Copyright Office guidelines.',
  },
  {
    step: '02',
    title: 'Form XIV & e-Portal Submission',
    desc: 'We draft Form XIV (Application for Registration of Copyright) and submit it securely on the official Copyright Office portal (copyright.gov.in).',
  },
  {
    step: '03',
    title: 'Instant Diary Number Issuance',
    desc: 'The Copyright Office immediately issues a unique official Diary Number (e.g. 14290/2026-CO/L) confirming priority date and formal receipt.',
  },
  {
    step: '04',
    title: 'Mandatory 30-Day Waiting Period',
    desc: 'As mandated by Rule 70(9), a 30-day statutory cooling period commences to allow any interested third parties to submit objections if any.',
  },
  {
    step: '05',
    title: 'Scrutiny & Examiner Review',
    desc: 'A Copyright Examiner reviews the work for originality and statutory compliance. If a discrepancy letter is raised, our attorneys file a prompt legal response.',
  },
  {
    step: '06',
    title: 'ROC Certificate Delivery',
    desc: 'Upon approval, the Registrar issues the official Extracts from Register of Copyrights (ROC) Certificate, securing statutory ownership for 60 years.',
  },
];

export const REQUIRED_DOCUMENTS = [
  {
    title: '2 Copies of Creative Work',
    desc: 'Digital PDF/EPUB of literary work, high-res image files for artistic works, or first & last 10-20 pages of source code for software.',
    essential: true,
  },
  {
    title: 'Identity & Address Proof of Applicant',
    desc: 'PAN Card along with Aadhaar, Passport, or Voter ID of the individual creator or authorized signatory.',
    essential: true,
  },
  {
    title: 'Power of Attorney (Form XIV Authorization)',
    desc: 'Authorizing our Senior IP Advocate to represent you before the Registrar of Copyrights (drafted by BharatFiling).',
    essential: true,
  },
  {
    title: 'No Objection Certificate (NOC) from Author/Publisher',
    desc: 'Required if the applicant is an employer, publisher, or entity other than the individual author who created the work.',
    essential: false,
  },
  {
    title: 'Trademark Search Certificate (Form TM-60)',
    desc: 'Mandatory only for Artistic Works used or capable of being used in relation to any goods or services, issued by Trade Marks Registry.',
    essential: false,
  },
  {
    title: 'Certificate of Incorporation / GST Proof',
    desc: 'Mandatory for corporate entities, LLPs, or registered partnership firms applying as the proprietor.',
    essential: false,
  },
];

export const COPYRIGHT_PACKAGES = [
  {
    id: 'starter',
    name: 'Basic Copyright Filing',
    price: 2499,
    originalPrice: 3999,
    discountBadge: '38% off',
    tagline: 'Ideal for authors, poets, bloggers, and individual content creators',
    popular: false,
    features: [
      'Eligibility & work originality audit',
      'Form XIV & Statement of Particulars drafting',
      'Power of Attorney documentation',
      'Official e-filing on Copyright portal',
      'Instant Diary Number generation within 24 hours',
      'Statutory 30-day tracking support',
    ],
  },
  {
    id: 'standard',
    name: 'Comprehensive Protection',
    price: 4999,
    originalPrice: 7999,
    discountBadge: '38% off',
    tagline: 'Recommended for software code, brand designs, and creative businesses',
    popular: true,
    features: [
      'Everything in Basic Copyright Filing',
      'Source code sanitization & trade secret redaction',
      'NOC drafting from developers/designers/employees',
      'Full Discrepancy & Objection handling support',
      'Formal reply drafting by Senior IP Advocate',
      'End-to-end tracking until ROC Certificate dispatch',
    ],
  },
  {
    id: 'commercial',
    name: 'Commercial & Logo Copyright',
    price: 8999,
    originalPrice: 12999,
    discountBadge: '31% off',
    tagline: 'For commercial brand logos, packaging, and cinematograph works',
    popular: false,
    features: [
      'Everything in Comprehensive Protection',
      'Form TM-60 search certificate filing & clearance',
      'Trademark Registry coordination for commercial clearance',
      'Drafting of commercial licensing & assignment deeds',
      'Priority fast-track scrutiny liaison',
      'Dedicated Intellectual Property Attorney assigned',
    ],
  },
];

/**
 * 1:1 Options matching media_1793296763791_c0b8c808.png
 * "Select the type of work you are trying to copyright"
 */
export const COPYRIGHT_ONBOARDING_TYPES = [
  {
    id: 'literary',
    title: 'Literary work',
    subtitle: 'Books, Fiction, Non fiction catalogs, Ad copy, Directories & Poetry',
    defaultWorkTitle: 'Literary Work & Manuscript',
    categoryCode: 'LITERARY',
  },
  {
    id: 'software',
    title: 'Software/Website/Apps',
    subtitle: 'Website, Mobile apps, Computer programs & Database',
    defaultWorkTitle: 'Proprietary Software Source Code & Database',
    categoryCode: 'SOFTWARE',
  },
  {
    id: 'sound_recording',
    title: 'Sound Record',
    subtitle: 'Music, Soundtracks & Sound Recording with underlying text',
    defaultWorkTitle: 'Master Sound Recording Track',
    categoryCode: 'SOUND_RECORDING',
  },
  {
    id: 'visual_art',
    title: 'Visual & Performing Art',
    subtitle: '2D or 3D artworks, Paintings, Photographs, Drama, Screenplays, Choreography, Scripts & Pantomime.',
    defaultWorkTitle: 'Original Artwork & Artistic Design',
    categoryCode: 'ARTISTIC',
  },
  {
    id: 'motion_picture',
    title: 'Motion Picture',
    subtitle: 'Documentaries, Video, TV shows, Animations, Feature films & Audio Visuals.',
    defaultWorkTitle: 'Cinematograph Film & Audio-Visual Production',
    categoryCode: 'CINEMATOGRAPH',
  },
];

export const COPYRIGHT_ATTORNEY_CARD = {
  name: 'La**********',
  title: 'IP Lawyer',
  experience: '6+ years of experience!',
  description:
    "I'm La**********, your IP Attorney with over 6+ years of experience! in Intellectual Property. I'll be assisting you with your IP registrations process end-to-end . Simply fill in the basic details and complete the payment to get started.",
};

export const COPYRIGHT_FAQS = [
  {
    q: 'What is copyright registration in India, and which law governs it?',
    a: 'Copyright registration in India is a legal process of recording an original creative work in the Register of Copyrights maintained by the Copyright Office. It is governed by the Copyright Act, 1957, and the Copyright Rules, 2013 (amended in 2021). Registration grants the creator prima facie evidence of ownership in a court of law under Section 48.',
  },
  {
    q: 'How long does copyright protection last in India?',
    a: 'For published literary, dramatic, musical, and artistic works, copyright protection lasts for the lifetime of the author plus 60 years after their death (counted from the calendar year following the year of death). For cinematograph films, sound recordings, and works published anonymously or posthumously, protection lasts for 60 years from the year of publication.',
  },
  {
    q: 'Is copyright registration mandatory to enjoy legal rights in India?',
    a: 'Copyright protection is automatic upon the creation and fixation of an original work in a tangible medium. However, formal registration is strongly recommended because the Certificate of Registration (ROC) serves as prima facie evidence of ownership in criminal and civil infringement proceedings under Section 48 of the Act, significantly easing injunctions and damages.',
  },
  {
    q: 'What is a Diary Number in copyright registration?',
    a: 'When an application for copyright registration is e-filed on the Copyright portal along with the prescribed statutory fee, the portal immediately issues an official acknowledgement with a unique Diary Number (e.g. 12345/2026-CO/L). This number establishes your statutory priority date and allows you to track application progress online.',
  },
  {
    q: 'What is the mandatory 30-day waiting period?',
    a: 'Under Rule 70(9) of the Copyright Rules, 2013, every copyright application must undergo a mandatory 30-day waiting period from the date of diary number issuance. This waiting period allows any third party who may have an objection to the registration of the work to file a formal objection with the Registrar.',
  },
  {
    q: 'Can computer software and mobile application code be copyrighted in India?',
    a: 'Yes. Under Section 2(o) of the Copyright Act, computer programs, software source code, object code, algorithms, and databases are protected as Literary Works. To maintain confidentiality, the Copyright Office permits applicants to submit only the first and last few pages of the source code with sensitive confidential lines redacted.',
  },
  {
    q: 'What is Form TM-60 and why is it needed for logo copyright?',
    a: 'Under the proviso to Section 45(1) of the Copyright Act, if an artistic work (such as a logo, label, or character) is used or is capable of being used in relation to any goods or services, the applicant must obtain a Search Certificate (Form TM-60) from the Trade Marks Registry confirming that no identical or deceptively similar trademark has been registered or applied for.',
  },
  {
    q: 'What is the difference between a Trademark and a Copyright?',
    a: 'A Trademark protects brand identifiers used in trade (such as brand names, slogans, and logos that identify the source of goods or services). A Copyright protects original creative expressions (such as books, artwork, music, videos, software source code, and content). A brand logo can be protected under both trademark law (for commercial goods/services) and copyright law (as an artistic work).',
  },
  {
    q: 'Is an Indian copyright recognized and valid internationally?',
    a: 'Yes. India is a member of the Berne Convention for the Protection of Literary and Artistic Works, the Universal Copyright Convention (UCC), and the TRIPS Agreement under WTO. Consequently, any work created or registered in India receives reciprocal copyright protection in over 181 member countries without requiring separate individual filings.',
  },
  {
    q: 'What happens if an objection is raised against my copyright application?',
    a: 'If a third-party objection or examiner discrepancy letter is issued, the Copyright Office sends a formal notice. The applicant has 30 days to file a reasoned legal reply clarifying originality, ownership, or addressing formal discrepancies. If needed, a hearing is scheduled before the Registrar of Copyrights.',
  },
];
