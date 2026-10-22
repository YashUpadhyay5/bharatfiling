import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronDown } from 'lucide-react';

/**
 * Shared page kit for every page except the home page.
 * Visual language: light airy sections, medium-weight headings in navy ink, very soft wide
 * shadows and pill buttons - in BharatFiling's own colours (navy #111827, emerald, saffron).
 */

export const INK = 'text-[#0F172A]';
export const SOFT_SHADOW = 'shadow-[0_10px_30px_rgba(15,23,42,0.06)]';
export const LIFT_SHADOW = 'shadow-[0_18px_45px_-12px_rgba(15,23,42,0.18)]';
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111827]';

export const Container = ({ className = '', children }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export const Eyebrow = ({ children, className = '' }) => (
  <p className={`inline-flex items-center gap-2 text-[13px] font-medium text-emerald-700 ${className}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" aria-hidden="true" />
    {children}
  </p>
);

/** Page hero: light gradient band with breadcrumb, title, subtitle, actions and an optional aside. */
export function PageHero({ crumbs = [], eyebrow, title, subtitle, children, aside, center = false }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-[#F4F7FC] to-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl"
      />
      <Container className="relative py-10 sm:py-14">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <Link to="/" className="hover:text-slate-800">Home</Link>
            {crumbs.map((c) => (
              <React.Fragment key={c.label}>
                <span aria-hidden="true">/</span>
                {c.to ? <Link to={c.to} className="hover:text-slate-800">{c.label}</Link> : <span className="text-slate-700">{c.label}</span>}
              </React.Fragment>
            ))}
          </nav>
        )}
        <div className={aside ? 'grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px]' : ''}>
          <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
            {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
            <h1 className={`text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.12] tracking-tight ${INK}`}>{title}</h1>
            {subtitle && <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">{subtitle}</p>}
            {children && <div className={`mt-6 ${center ? 'flex flex-col items-center' : ''}`}>{children}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

/** Section with an optional centred heading block. tone: 'white' | 'tint' */
export function Section({ id, eyebrow, title, subtitle, children, tone = 'white', className = '', align = 'center' }) {
  return (
    <section id={id} className={`scroll-mt-32 py-12 sm:py-16 ${tone === 'tint' ? 'bg-slate-50/70' : 'bg-white'} ${className}`}>
      <Container>
        {(title || eyebrow) && (
          <div className={`mb-8 sm:mb-10 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
            {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
            {title && <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight ${INK}`}>{title}</h2>}
            {subtitle && <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

export const Card = ({ className = '', children, as: Tag = 'div', ...rest }) => (
  <Tag className={`rounded-2xl border border-slate-200/80 bg-white ${SOFT_SHADOW} ${className}`} {...rest}>
    {children}
  </Tag>
);

const BTN = {
  primary: `bg-[#111827] text-white hover:bg-[#1F2937] ${LIFT_SHADOW}`,
  secondary: `bg-white text-slate-800 border border-slate-200 hover:border-slate-300 ${SOFT_SHADOW}`,
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#20BA5A]',
  ghost: 'text-slate-700 hover:text-slate-900 hover:bg-slate-100',
};
const SIZE = { md: 'px-6 py-3 text-sm', sm: 'px-4 py-2 text-[13px]' };

export function Button({ to, href, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition active:scale-[0.98] cursor-pointer ${FOCUS} ${BTN[variant]} ${SIZE[size]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

export const CheckList = ({ items, cols = 1, className = '' }) => (
  <ul className={`grid gap-2.5 ${cols === 2 ? 'sm:grid-cols-2' : ''} ${className}`}>
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
        {item}
      </li>
    ))}
  </ul>
);

/** Icon + title + text feature tile. */
export const Feature = ({ icon: Icon, title, children }) => (
  <Card className="p-6">
    {Icon && (
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-[#111827] ring-1 ring-slate-200">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
    )}
    <h3 className={`text-[15px] font-semibold ${INK}`}>{title}</h3>
    <div className="mt-1.5 text-sm leading-relaxed text-slate-600">{children}</div>
  </Card>
);

/** Accessible FAQ list built on <details>. */
export const FaqList = ({ items, className = '' }) => (
  <div className={`divide-y divide-slate-100 rounded-2xl border border-slate-200/80 bg-white ${SOFT_SHADOW} ${className}`}>
    {items.map((f) => (
      <details key={f.q} className="group px-5 py-4 sm:px-6">
        <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium ${INK} ${FOCUS} rounded`}>
          {f.q}
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180" aria-hidden="true" />
        </summary>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{f.a}</p>
      </details>
    ))}
  </div>
);

/** Row of small factual trust points. */
export const TrustRow = ({ items, className = '' }) => (
  <ul className={`flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate-600 ${className}`}>
    {items.map(({ icon: Icon, label }) => (
      <li key={label} className="inline-flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-emerald-600" aria-hidden="true" />}
        {label}
      </li>
    ))}
  </ul>
);

/** Closing call-to-action band. */
export function CtaBand({ title, subtitle, children }) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className={`relative overflow-hidden rounded-3xl bg-[#111827] px-6 py-10 sm:px-12 sm:py-12 text-center ${LIFT_SHADOW}`}>
          <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-[#F26522]/20 blur-3xl" />
          <h2 className="relative text-2xl sm:text-3xl font-semibold tracking-tight text-white">{title}</h2>
          {subtitle && <p className="relative mx-auto mt-3 max-w-xl text-sm text-slate-300">{subtitle}</p>}
          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">{children}</div>
        </div>
      </Container>
    </section>
  );
}
