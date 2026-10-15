import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthRequiredModal from '../common/AuthRequiredModal.jsx';
import { INDUSTRY_SOLUTIONS } from './industrySolutions.js';

const INTERVAL = 3200; // ms per card - calm enough for a hero
const EASE = 'cubic-bezier(0.22, 0.8, 0.24, 1)';

// Position of a card by its distance behind the front card (0 = front).
const LAYOUT = {
  0: { x: 0, y: 0, s: 1, o: 1, z: 40 },
  1: { x: 26, y: -22, s: 0.94, o: 0.75, z: 30 },
  2: { x: 52, y: -44, s: 0.88, o: 0.4, z: 20 },
  exit: { x: -70, y: 26, s: 0.96, o: 0, z: 50 }, // the card that just left (slides out front-left)
  hidden: { x: 78, y: -66, s: 0.82, o: 0, z: 10 },
};

/**
 * Industry solutions as a stacked 3D card deck for the hero: the front card is fully readable,
 * the next two peek behind it. Auto-advances (paused on hover / focus / hidden tab / reduced motion),
 * with prev / next, dots and a gentle pointer-follow tilt.
 */
export default function IndustryDeck({ items = INDUSTRY_SOLUTIONS }) {
  const count = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [authService, setAuthService] = useState(null);
  const stepAt = useRef(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const go = useCallback((delta) => {
    stepAt.current = Date.now();
    setActive((a) => (a + delta + count) % count);
  }, [count]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onMq = (e) => setReduced(e.matches);
    const onVis = () => setHidden(document.hidden);
    mq.addEventListener('change', onMq);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      mq.removeEventListener('change', onMq);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  // one timer per step; manual navigation restarts the countdown
  useEffect(() => {
    if (paused || reduced || hidden) return undefined;
    const id = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused, reduced, hidden, go]);

  const onPointerMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 6, y: px * 8 });
  };

  const explore = (e, item) => {
    if (isAuthenticated) return; // plain link navigation
    e.preventDefault();
    setAuthService({ title: item.title, path: item.path, category: item.category, price: 'Transparent Pricing', period: 'CA Audited Filing' });
  };

  const dur = reduced ? 0 : 650;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Industry-specific solutions"
      className="relative w-full max-w-[420px]"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        setTilt({ x: 0, y: 0 });
      }}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <p className="mb-14 flex items-center gap-2 pl-1 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" aria-hidden="true" />
        Solutions for every industry
      </p>

      {/* deck */}
      <div className="relative h-[318px] [perspective:1400px]" onPointerMove={onPointerMove}>
        <div
          className="relative h-full w-full [transform-style:preserve-3d]"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y - 6}deg)`,
            transition: `transform ${reduced ? 0 : 400}ms ${EASE}`,
          }}
        >
          {items.map((item, i) => {
            const d = (i - active + count) % count;
            const pos = d <= 2 ? LAYOUT[d] : d === count - 1 ? LAYOUT.exit : LAYOUT.hidden;
            const isFront = d === 0;
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!isFront}
                className="absolute inset-0 flex flex-col rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_70px_-34px_rgba(6,42,77,0.55)] backdrop-blur-xl"
                style={{
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${pos.s})`,
                  opacity: pos.o,
                  zIndex: pos.z,
                  transition: `transform ${dur}ms ${EASE}, opacity ${dur}ms ${EASE}`,
                  pointerEvents: isFront ? 'auto' : 'none',
                }}
              >
                <span aria-hidden="true" className={`absolute inset-x-6 top-0 h-[3px] rounded-b-full ${item.accent.bar}`} />
                <div className="flex items-start justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${item.accent.tile}`}>
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="text-[30px] font-extrabold leading-none tracking-tight text-slate-200 tabular-nums" aria-hidden="true">
                    {item.number}
                  </span>
                </div>
                <p className={`mt-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] ${item.accent.label}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${item.accent.dot}`} aria-hidden="true" />
                  {item.category}
                </p>
                <h3 className="mt-2 text-[20px] font-bold leading-snug tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-slate-600">{item.description}</p>
                <div className="mt-auto border-t border-slate-100 pt-4">
                  <Link
                    to={item.path}
                    tabIndex={isFront ? undefined : -1}
                    onClick={(e) => explore(e, item)}
                    className="group/l inline-flex items-center gap-1.5 rounded-md text-[14px] font-semibold text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Explore Solutions
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/l:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* controls */}
      <div className="mt-6 flex items-center justify-between pl-1">
        <div className="flex items-center gap-1.5" role="group" aria-label="Choose an industry">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go((i - active + count) % count)}
              aria-label={`Show ${item.title}`}
              aria-current={i === active ? 'true' : undefined}
              className="flex h-6 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062A4D]"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-[#062A4D]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'}`} />
            </button>
          ))}
          <span className="ml-2 text-xs font-semibold tabular-nums text-slate-400">
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
        </div>
        <div className="flex gap-2">
          {[
            [-1, 'Previous industry', ChevronLeft],
            [1, 'Next industry', ChevronRight],
          ].map(([delta, label, Icon]) => (
            <button
              key={label}
              type="button"
              onClick={() => go(delta)}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062A4D]"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {paused || reduced ? `${items[active].title}, ${active + 1} of ${count}` : ''}
      </p>

      <AuthRequiredModal
        isOpen={!!authService}
        onClose={() => setAuthService(null)}
        service={authService}
        onSuccess={() => authService?.path && navigate(authService.path)}
      />
    </div>
  );
}
