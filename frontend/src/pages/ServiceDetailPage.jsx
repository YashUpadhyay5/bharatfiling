import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Clock, FileText, MessageCircle, ShieldCheck, BadgeCheck, Wallet, MonitorSmartphone } from 'lucide-react';
import {
  GST_RATE,
  canonicalSlug,
  getCategory,
  getService,
  inr,
  servicePath,
  servicesInCategory,
  withGst,
} from '../data/serviceCatalog.js';
import { CATEGORY_CONTENT, ENTITY_COMPARISON, SERVICE_FAQS } from '../data/serviceContent.js';
import { whatsappLink } from '../config/support.js';
import { PageHero, Section, Card, Button, CheckList, FaqList, TrustRow, CtaBand, INK, SOFT_SHADOW } from '../components/ui/kit.jsx';

const STEPS = [
  { title: 'Share your details', text: 'Tell us about your business and upload the documents listed on this page.' },
  { title: 'Expert review', text: 'A Chartered Accountant, company secretary or advocate checks everything before filing.' },
  { title: 'Filing', text: 'We prepare and submit on the government portal and keep you updated.' },
  { title: 'Delivery', text: 'Certificates and acknowledgements arrive digitally in your dashboard.' },
];

const TRUST = [
  { icon: BadgeCheck, label: 'Reviewed by qualified professionals' },
  { icon: Wallet, label: 'Fixed fee shown before you pay' },
  { icon: MonitorSmartphone, label: '100% online, no office visits' },
];

/** Optional add-ons offered in the package card, by category (prices come from the catalogue). */
const ADDONS = {
  startup: ['gst-registration', 'trademark-registration', 'company-annual-roc-filing'],
  registrations: ['gst-return', 'ca-consultation'],
  trademark: ['trademark-search', 'logo-design-ip', 'trademark-hearing-support'],
  gst: ['gstr-2b-itc-reconciliation', 'gst-assessment-advisory'],
  'income-tax': ['capital-gains-advisory', 'advance-tax-computation', 'ca-consultation'],
  mca: ['director-kyc-dir-3', 'secretarial-audit-registers'],
  compliance: ['statutory-tds-compliance', 'pf-esi-monthly-returns', 'contract-drafting-ndas'],
  consultation: ['startup-structuring-advisory', 'legal-consultation', 'ca-consultation'],
};

const feeText = (s) => (s.fee === 0 ? 'Free' : `${s.from ? 'from ' : ''}${inr(s.fee)}`);

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const canonical = canonicalSlug(slug);
  const svc = canonical ? getService(canonical) : null;

  if (!svc) {
    return (
      <PageHero center title="We could not find that service" subtitle="Browse the full list of services with prices instead.">
        <Button to="/services">All services <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
      </PageHero>
    );
  }

  // legacy / alias URLs and live services go to their canonical page or flow
  if (canonical !== slug) return <Navigate to={`/services/${canonical}`} replace />;
  if (svc.path) return <Navigate to={svc.path} replace />;

  return <ServiceDetail key={svc.slug} svc={svc} />;
}

function ServiceDetail({ svc }) {
  const navigate = useNavigate();
  const [lead, setLead] = useState({ name: '', phone: '' });
  const [active, setActive] = useState('overview');
  const [picked, setPicked] = useState([]);

  const category = getCategory(svc.category);
  const content = CATEGORY_CONTENT[svc.category];
  const faqs = [...(SERVICE_FAQS[svc.slug] || []), ...(content?.faqs || [])];
  const related = servicesInCategory(svc.category).filter((r) => r.slug !== svc.slug && r.status !== 'live').slice(0, 6);
  const addons = (ADDONS[svc.category] || []).map(getService).filter((a) => a && a.slug !== svc.slug && a.fee > 0);
  const showCompare = svc.category === 'startup';

  const packageFee = useMemo(
    () => svc.fee + addons.filter((a) => picked.includes(a.slug)).reduce((sum, a) => sum + a.fee, 0),
    [svc.fee, addons, picked]
  );

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'pricing', label: 'Pricing' },
    ...(svc.docs.length ? [{ id: 'documents', label: 'Documents' }] : []),
    { id: 'process', label: 'Process' },
    ...(showCompare ? [{ id: 'compare', label: 'Compare' }] : []),
    { id: 'faqs', label: 'FAQs' },
  ];

  // highlight the tab of the section currently in view
  useEffect(() => {
    const els = tabs.map((t) => document.getElementById(t.id)).filter(Boolean);
    if (!('IntersectionObserver' in window) || !els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -60% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestTo = (extra = {}) => {
    const names = [svc.name, ...addons.filter((a) => picked.includes(a.slug)).map((a) => a.name)].join(' + ');
    return `/contact?${new URLSearchParams({ service: names, ...extra }).toString()}`;
  };
  const onLead = (e) => {
    e.preventDefault();
    navigate(requestTo({ name: lead.name, phone: lead.phone }));
  };
  const toggle = (slug) => setPicked((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]));
  const whatsapp = whatsappLink(`Hi BharatFiling Team, I need help with ${svc.name}.`);
  const field =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:border-[#111827] focus:outline-hidden focus:ring-4 focus:ring-slate-900/5';

  const leadCard = (
    <form onSubmit={onLead} aria-label="Get started" className={`rounded-2xl border border-slate-200/80 bg-white p-6 ${SOFT_SHADOW}`}>
      <p className="text-[13px] font-medium text-slate-500">Professional fee {svc.from ? '(starting from)' : ''}</p>
      <p className={`mt-1 text-[34px] font-semibold leading-none tabular-nums ${INK}`}>{inr(svc.fee)}</p>
      <p className="mt-1.5 text-xs text-slate-500">{svc.unit} · plus {Math.round(GST_RATE * 100)}% GST</p>
      <div className="mt-5 space-y-3">
        <label className="block">
          <span className="sr-only">Your name</span>
          <input value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} placeholder="Your name" autoComplete="name" required className={field} />
        </label>
        <label className="block">
          <span className="sr-only">Mobile number</span>
          <input value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} placeholder="Mobile number" type="tel" inputMode="numeric" autoComplete="tel" pattern="[0-9+ ]{10,14}" required className={field} />
        </label>
        <Button type="submit" className="w-full">Get started <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
        <Button href={whatsapp} variant="whatsapp" className="w-full" target="_blank" rel="noreferrer">
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Continue on WhatsApp
        </Button>
      </div>
      <p className="mt-4 text-center text-[11px] text-slate-400">No payment now. We confirm the final quote first.</p>
      {import.meta.env.DEV && svc.priceStatus === 'draft' && (
        <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1 text-center text-[11px] font-medium text-amber-700">Draft price (development only)</p>
      )}
    </form>
  );

  return (
    <div className="bg-white font-sans pb-16">
      <PageHero eyebrow={category?.label} title={svc.name} subtitle={svc.summary} aside={leadCard}>
        <CheckList items={svc.includes.slice(0, 4)} cols={2} />
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="inline-flex items-center gap-2 text-[13px] text-slate-600">
            <Clock className="h-4 w-4 text-slate-400" aria-hidden="true" /> {svc.tat}
          </span>
          <TrustRow items={TRUST} />
        </div>
      </PageHero>

      {/* sticky section tabs */}
      <div className="sticky top-[68px] z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <nav aria-label="Page sections" className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {tabs.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              aria-current={active === t.id ? 'true' : undefined}
              className={`whitespace-nowrap border-b-2 px-3 py-3.5 text-[13px] font-medium transition ${
                active === t.id ? 'border-[#111827] text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
            </a>
          ))}
        </nav>
      </div>

      <Section id="overview" align="left">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className={`text-2xl font-semibold tracking-tight ${INK}`}>Why choose {svc.name}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{svc.summary}</p>
            <CheckList items={content?.benefits || []} className="mt-6" />
          </div>
          <Card className="p-6 sm:p-8">
            <h3 className={`text-base font-semibold ${INK}`}>What is included</h3>
            <CheckList items={svc.includes} className="mt-4" />
          </Card>
        </div>
      </Section>

      <Section id="pricing" tone="tint" eyebrow="Pricing" title="Simple package. Transparent pricing." subtitle="One fixed professional fee. Add what you need; government fees are paid at actuals.">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Card className="p-6 sm:p-7">
            <p className="text-[13px] font-medium text-emerald-700">{svc.name}</p>
            <p className={`mt-2 text-4xl font-semibold tabular-nums ${INK}`}>{inr(packageFee)}</p>
            <p className="mt-1 text-xs text-slate-500">{svc.from ? 'starting from, ' : ''}{svc.unit}, plus {Math.round(GST_RATE * 100)}% GST</p>
            <dl className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-slate-500">GST ({Math.round(GST_RATE * 100)}%)</dt><dd className="tabular-nums text-slate-800">{inr(withGst(packageFee) - packageFee)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-slate-500">Total with GST</dt><dd className={`font-semibold tabular-nums ${INK}`}>{inr(withGst(packageFee))}</dd></div>
              <div className="flex justify-between gap-4"><dt className="shrink-0 text-slate-500">Government fee</dt><dd className="text-right text-slate-700">{svc.govt}</dd></div>
            </dl>
            <Button to={requestTo()} className="mt-6 w-full">Get started <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
          </Card>

          <Card className="p-6 sm:p-7">
            <h3 className={`text-base font-semibold ${INK}`}>Add to your package</h3>
            <p className="mt-1 text-[13px] text-slate-500">Optional services people often take with this one.</p>
            <ul className="mt-4 space-y-2.5">
              {addons.map((a) => (
                <li key={a.slug}>
                  <label className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${picked.includes(a.slug) ? 'border-[#111827] bg-slate-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <input type="checkbox" checked={picked.includes(a.slug)} onChange={() => toggle(a.slug)} className="h-4 w-4 accent-[#111827]" />
                    <span className="min-w-0 flex-1 text-sm text-slate-700">{a.name}</span>
                    <span className="text-sm font-medium tabular-nums text-slate-900">+{feeText(a)}</span>
                  </label>
                </li>
              ))}
              {addons.length === 0 && <li className="text-sm text-slate-500">No add-ons for this service.</li>}
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-slate-400">Prices are indicative. We confirm the final quote with you before any payment.</p>
          </Card>
        </div>
      </Section>

      {svc.docs.length > 0 && (
        <Section id="documents" eyebrow="Documents" title="What you will need" subtitle="Keep these ready. We tell you if anything else is required.">
          <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
            {svc.docs.map((doc) => (
              <Card key={doc} className="flex items-center gap-3 px-5 py-4">
                <FileText className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                <span className="text-sm text-slate-700">{doc}</span>
              </Card>
            ))}
          </div>
        </Section>
      )}

      <Section id="process" tone="tint" eyebrow="Process" title="How it works" subtitle={`Usually ${svc.tat} once your documents are complete.`}>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <Card className="h-full p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111827] text-sm font-semibold text-white">{i + 1}</span>
                <p className={`mt-4 text-[15px] font-semibold ${INK}`}>{step.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {showCompare && (
        <Section id="compare" eyebrow="Compare" title="Which business structure fits you?">
          <Card className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-[13px] text-slate-500">
                  <th className="px-5 py-3.5 font-medium">Structure</th>
                  <th className="px-5 py-3.5 font-medium">Members</th>
                  <th className="px-5 py-3.5 font-medium">Liability</th>
                  <th className="px-5 py-3.5 font-medium">Best for</th>
                  <th className="px-5 py-3.5 text-right font-medium">Our fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ENTITY_COMPARISON.map((row) => {
                  const entry = getService(row.slug);
                  const current = row.slug === svc.slug;
                  return (
                    <tr key={row.slug} className={current ? 'bg-slate-50' : ''}>
                      <td className="px-5 py-3.5">
                        <Link to={servicePath(entry)} className={`font-medium ${current ? INK : 'text-blue-700 hover:text-blue-800'}`}>{row.name}</Link>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{row.members}</td>
                      <td className="px-5 py-3.5 text-slate-600">{row.liability}</td>
                      <td className="px-5 py-3.5 text-slate-600">{row.fit}</td>
                      <td className="px-5 py-3.5 text-right tabular-nums text-slate-900">{inr(entry.fee)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </Section>
      )}

      <Section id="faqs" tone={showCompare ? 'tint' : 'white'} eyebrow="FAQs" title="Frequently asked questions">
        <FaqList items={faqs} className="mx-auto max-w-3xl" />
      </Section>

      {related.length > 0 && (
        <Section tone={showCompare ? 'white' : 'tint'} eyebrow={category?.label} title={`More ${category?.label} services`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} to={servicePath(r)} className={`group rounded-2xl border border-slate-200/80 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 ${SOFT_SHADOW}`}>
                <p className={`text-[15px] font-semibold ${INK}`}>{r.name}</p>
                <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-500">{r.summary}</p>
                <p className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-medium tabular-nums text-slate-900">{feeText(r)}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-700" aria-hidden="true" />
                </p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaBand title={`Ready to get started with ${svc.name}?`} subtitle="Share your details and an expert will call you with a confirmed quote.">
        <Button to={requestTo()} variant="secondary">Get started</Button>
        <Button href={whatsapp} variant="whatsapp" target="_blank" rel="noreferrer">
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
        </Button>
      </CtaBand>

      {/* persistent price bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2 text-xs text-slate-600 sm:text-sm">
            <ShieldCheck className="hidden h-4 w-4 text-emerald-600 sm:block" aria-hidden="true" />
            <span className="hidden sm:inline">{svc.name} · </span>starting at <strong className={`tabular-nums ${INK}`}>{inr(svc.fee)}</strong> + GST
          </p>
          <Button to={requestTo()} size="sm">Get started <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
        </div>
      </div>
    </div>
  );
}
