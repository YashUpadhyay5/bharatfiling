import React, { useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BadgeCheck, Clock, MessageCircle, MonitorSmartphone, Wallet } from 'lucide-react';
import { INDUSTRY_SOLUTIONS, industryPath } from '../components/home/industrySolutions.js';
import { formatFee, getService, servicePath } from '../data/serviceCatalog.js';
import { INDUSTRY_CONTENT } from '../data/industryContent.js';
import { whatsappLink } from '../config/support.js';
import { PageHero, Section, Card, Button, CheckList, FaqList, TrustRow, CtaBand, INK, SOFT_SHADOW } from '../components/ui/kit.jsx';

const TRUST = [
  { icon: BadgeCheck, label: 'Reviewed by qualified professionals' },
  { icon: Wallet, label: 'Fixed fee shown before you pay' },
  { icon: MonitorSmartphone, label: '100% online, no office visits' },
];

function ServiceLink({ svc }) {
  return (
    <Link to={servicePath(svc)} className={`group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 ${SOFT_SHADOW}`}>
      <p className={`text-[15px] font-semibold ${INK}`}>{svc.name}</p>
      <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-500">{svc.summary}</p>
      <p className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm">
        <span>
          <span className="font-medium tabular-nums text-slate-900">{formatFee(svc)}</span>
          <span className="ml-1.5 text-xs text-slate-400">{svc.unit}</span>
        </span>
        <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-700" aria-hidden="true" />
      </p>
    </Link>
  );
}

/** The same seven industries and order as the home-page slides, so moving between pages feels like moving the deck. */
function IndustrySwitcher({ activeId }) {
  const navRef = useRef(null);

  // On a phone the row scrolls sideways; keep the current industry in view. scrollIntoView would move the page too.
  useEffect(() => {
    const nav = navRef.current;
    const tab = nav?.querySelector('[aria-current="page"]');
    if (tab) nav.scrollLeft = tab.offsetLeft - (nav.clientWidth - tab.offsetWidth) / 2;
  }, [activeId]);

  return (
    <div className="sticky top-[68px] z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav ref={navRef} aria-label="Industries" className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
        {INDUSTRY_SOLUTIONS.map((item) => (
          <Link
            key={item.id}
            to={industryPath(item)}
            aria-current={item.id === activeId ? 'page' : undefined}
            className={`whitespace-nowrap border-b-2 px-3 py-3.5 text-[13px] font-medium transition ${
              item.id === activeId ? 'border-[#111827] text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {item.short}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function IndustryPage() {
  const { industryId } = useParams();
  const index = INDUSTRY_SOLUTIONS.findIndex((item) => item.id === industryId);
  if (index < 0) return <Navigate to="/services" replace />;

  const item = INDUSTRY_SOLUTIONS[index];
  const content = INDUSTRY_CONTENT[item.id];
  const count = INDUSTRY_SOLUTIONS.length;
  const prev = INDUSTRY_SOLUTIONS[(index - 1 + count) % count];
  const next = INDUSTRY_SOLUTIONS[(index + 1) % count];
  const Icon = item.icon;
  const expert = getService(content.expertService);
  const whatsapp = whatsappLink(`Hi BharatFiling Team, I need help with compliance for ${item.short}.`);

  return (
    <div className="bg-white font-sans">
      <PageHero crumbs={[{ label: 'Industries' }, { label: item.short }]} eyebrow={item.category} title={content.headline} subtitle={content.intro}>
        <CheckList items={content.needs} />
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href="#services">
            See the services <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button to={servicePath(expert)} variant="secondary">
            Talk to an expert, {formatFee(expert)}
          </Button>
        </div>
        <TrustRow items={TRUST} className="mt-6" />
      </PageHero>

      <IndustrySwitcher activeId={item.id} />

      <Section id="services" align="left" eyebrow={item.title} title="What you will usually need" subtitle="Grouped by where you are today. Fees exclude GST and any government fees.">
        <div className="space-y-10">
          {content.stages.map((stage, i) => (
            <div key={stage.title}>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111827] text-sm font-semibold text-white">{i + 1}</span>
                <div>
                  <h3 className={`text-[17px] font-semibold ${INK}`}>{stage.title}</h3>
                  <p className="text-[13px] text-slate-500">{stage.blurb}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stage.services.map(getService).filter(Boolean).map((svc) => (
                  <ServiceLink key={svc.slug} svc={svc} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="tint" eyebrow="Talk to an expert" title="Need something more specific?" subtitle="These depend on your case, so they do not have a fixed fee yet. Start with a consultation and get a clear next step.">
        <Card className="mx-auto max-w-3xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${item.accent.tile}`}>
              <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <CheckList items={content.expertTopics} className="flex-1" />
          </div>
          <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className={`text-[15px] font-semibold ${INK}`}>{expert.name}</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-slate-500">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {formatFee(expert)} for {expert.unit}, {expert.tat.toLowerCase()}
              </p>
            </div>
            <Button to={servicePath(expert)} className="shrink-0">
              Book a consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Card>
      </Section>

      <Section eyebrow="FAQs" title="Common questions">
        <FaqList items={content.faqs} className="mx-auto max-w-3xl" />
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-slate-400">General information only. Rules change and depend on your facts, so confirm your own case with a professional.</p>
      </Section>

      <Section tone="tint" className="py-8! sm:py-8!">
        <nav aria-label="Other industries" className="grid gap-4 sm:grid-cols-2">
          {[
            [prev, 'Previous', ArrowLeft],
            [next, 'Next', ArrowRight],
          ].map(([other, label, ArrowIcon]) => (
            <Link key={label} to={industryPath(other)} className={`group flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 transition hover:border-slate-300 ${label === 'Previous' ? 'flex-row-reverse text-right' : ''} ${SOFT_SHADOW}`}>
              <span>
                <span className="block text-xs text-slate-500">{label} industry</span>
                <span className={`mt-0.5 block text-[15px] font-semibold ${INK}`}>{other.title}</span>
              </span>
              <ArrowIcon className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-slate-700" aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </Section>

      <CtaBand title="Not sure where to start?" subtitle="Tell us about your business and an expert will recommend the right registrations and filings.">
        <Button to={servicePath(expert)} variant="secondary">Talk to an expert</Button>
        <Button href={whatsapp} variant="whatsapp" target="_blank" rel="noreferrer">
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
        </Button>
      </CtaBand>
    </div>
  );
}
