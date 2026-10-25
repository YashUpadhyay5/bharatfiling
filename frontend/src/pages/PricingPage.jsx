import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import AuthRequiredModal from '../components/common/AuthRequiredModal.jsx';
import CatalogBrowser from '../components/services/CatalogBrowser.jsx';
import { whatsappLink } from '../config/support.js';
import { GST_RATE, getCategory, getService, inr, servicePath, withGst } from '../data/serviceCatalog.js';
import { PageHero, Section, Button, CheckList, CtaBand, INK, SOFT_SHADOW, LIFT_SHADOW } from '../components/ui/kit.jsx';

/** Featured packages on the pricing page; everything else is in the full price list below. */
const FEATURED = [
  { slug: 'private-limited-company', tag: 'Most chosen by startups', popular: true },
  { slug: 'gst-registration', tag: 'Fast-track' },
  { slug: 'itr-filing', tag: 'For individuals' },
  { slug: 'gst-return', tag: 'Monthly compliance' },
  { slug: 'company-annual-roc-filing', tag: 'Mandatory every year' },
  { slug: 'virtual-cfo', tag: 'Ongoing finance' },
];

export default function PricingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [authFor, setAuthFor] = useState(null);

  const open = (svc) => (e) => {
    // live services start a filing flow, which needs an account — but /services/* pages
    // are public landing pages that handle their own sign-in, so let those through
    if (svc.status !== 'live' || isAuthenticated || servicePath(svc).startsWith('/services/')) return;
    e.preventDefault();
    setAuthFor({ title: svc.name, price: inr(svc.fee), path: servicePath(svc), ctaPath: servicePath(svc) });
  };

  return (
    <div className="bg-white font-sans">
      <PageHero
        center
        eyebrow="Pricing"
        title="Simple packages. Transparent pricing."
        subtitle="One fixed professional fee per service, shown before you pay. Government fees are listed separately and paid at actuals."
      />

      <Section tone="tint">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map(({ slug, tag, popular }) => {
            const svc = getService(slug);
            if (!svc) return null;
            return (
              <article
                key={slug}
                className={`relative flex flex-col rounded-2xl border bg-white p-6 sm:p-7 ${popular ? `border-[#111827] ${LIFT_SHADOW}` : `border-slate-200/80 ${SOFT_SHADOW}`}`}
              >
                <p className="flex items-center justify-between gap-2 text-[13px]">
                  <span className="font-medium text-emerald-700">{getCategory(svc.category)?.label}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${popular ? 'bg-[#111827] text-white' : 'bg-slate-100 text-slate-600'}`}>{tag}</span>
                </p>
                <h2 className={`mt-3 text-lg font-semibold ${INK}`}>{svc.name}</h2>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{svc.summary}</p>

                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className={`text-[34px] font-semibold leading-none tabular-nums ${INK}`}>{inr(svc.fee)}</span>
                  <span className="text-[13px] text-slate-500">{svc.unit}</span>
                </p>
                <p className="mt-1.5 text-xs text-slate-500">
                  {inr(withGst(svc.fee))} with {Math.round(GST_RATE * 100)}% GST · {svc.govt}
                </p>

                <CheckList items={svc.includes} className="mt-5 border-t border-slate-100 pt-5" />

                <div className="mt-auto pt-6">
                  <Button to={servicePath(svc)} onClick={open(svc)} variant={popular ? 'primary' : 'secondary'} className="w-full">
                    {svc.status === 'live' ? 'Start now' : 'View details'} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section>
        <CatalogBrowser id="price-list" heading="Complete price list" />
      </Section>

      <CtaBand
        title="Need a custom package?"
        subtitle="For fast-growing startups, manufacturers, e-commerce sellers and foreign subsidiaries that need multi-state compliance or specialised tax planning."
      >
        <Button to="/contact?service=Custom%20package" variant="secondary">Request a custom quote</Button>
        <Button href={whatsappLink('Hi BharatFiling Team, I need a custom corporate CA proposal.')} variant="whatsapp" target="_blank" rel="noreferrer">
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
        </Button>
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
