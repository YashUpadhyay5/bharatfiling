import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Rocket, BadgeCheck, Stamp, Receipt, Landmark, Building2, ClipboardCheck, Headset, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import AuthRequiredModal from '../components/common/AuthRequiredModal.jsx';
import CatalogBrowser from '../components/services/CatalogBrowser.jsx';
import { CATEGORIES, SERVICES, inr, servicePath, servicesInCategory } from '../data/serviceCatalog.js';
import { PageHero, Section, Button, CtaBand, INK, SOFT_SHADOW } from '../components/ui/kit.jsx';

const ICONS = {
  startup: Rocket,
  registrations: BadgeCheck,
  trademark: Stamp,
  gst: Receipt,
  'income-tax': Landmark,
  mca: Building2,
  compliance: ClipboardCheck,
  consultation: Headset,
};

const fee = (s) => (s.fee === 0 ? 'Free' : `${s.from ? 'from ' : ''}${inr(s.fee)}`);

export default function ServicesDirectory() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authFor, setAuthFor] = useState(null);

  const live = SERVICES.filter((s) => s.status === 'live');

  // filing flows need an account; information pages and free tools do not
  const open = (svc) => (e) => {
    if (isAuthenticated || svc.fee === 0 || !svc.path?.startsWith('/apply')) return;
    e.preventDefault();
    setAuthFor({ title: svc.name, price: inr(svc.fee), path: svc.path, ctaPath: svc.path });
  };

  return (
    <div className="bg-white font-sans">
      <PageHero
        center
        eyebrow="All services"
        title="Every registration, filing and licence your business needs"
        subtitle={`${SERVICES.length} CA, tax and legal services with fixed fees, handled online by qualified professionals.`}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <a key={c.key} href={`#${c.key}`} className={`rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900 ${SOFT_SHADOW}`}>
              {c.label}
            </a>
          ))}
        </div>
      </PageHero>

      <Section tone="tint" eyebrow="Available online now" title="Start these right away">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {live.map((svc) => (
            <Link key={svc.slug} to={servicePath(svc)} onClick={open(svc)} className={`group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 transition hover:-translate-y-0.5 hover:border-slate-300 ${SOFT_SHADOW}`}>
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                <Zap className="h-3 w-3" aria-hidden="true" /> Live
              </span>
              <p className={`mt-4 text-[15px] font-semibold ${INK}`}>{svc.name}</p>
              <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-500">{svc.summary}</p>
              <p className="mt-auto flex items-center justify-between pt-5 text-sm">
                <span className="font-medium tabular-nums text-slate-900">{fee(svc)}</span>
                <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-700" aria-hidden="true" />
              </p>
            </Link>
          ))}
        </div>
      </Section>

      {CATEGORIES.map((c, i) => {
        const Icon = ICONS[c.key];
        return (
          <Section key={c.key} id={c.key} tone={i % 2 ? 'tint' : 'white'} align="left">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#111827] ring-1 ring-slate-200">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className={`text-xl sm:text-2xl font-semibold tracking-tight ${INK}`}>{c.label}</h2>
                <p className="text-sm text-slate-500">{c.blurb}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {servicesInCategory(c.key).map((svc) => (
                <Link key={svc.slug} to={servicePath(svc)} onClick={open(svc)} className={`group rounded-2xl border border-slate-200/80 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 ${SOFT_SHADOW}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-[15px] font-semibold ${INK}`}>{svc.name}</p>
                    {svc.status === 'live' && (
                      <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-500">{svc.summary}</p>
                  <p className="mt-4 flex items-center justify-between text-sm">
                    <span>
                      <span className="font-medium tabular-nums text-slate-900">{fee(svc)}</span>
                      {svc.fee > 0 && <span className="ml-1.5 text-xs text-slate-400">{svc.unit}</span>}
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-slate-700" aria-hidden="true" />
                  </p>
                </Link>
              ))}
            </div>
          </Section>
        );
      })}

      <Section tone="tint">
        <CatalogBrowser id="all-services" heading="Search all services" />
      </Section>

      <CtaBand title="Not sure which service you need?" subtitle="Tell us about your business and an expert will recommend the right registrations and filings.">
        <Button to="/contact" variant="secondary">Talk to an expert</Button>
      </CtaBand>

      <AuthRequiredModal
        isOpen={Boolean(authFor)}
        onClose={() => setAuthFor(null)}
        service={authFor}
        onSuccess={() => authFor?.ctaPath && navigate(authFor.ctaPath)}
      />
    </div>
  );
}
