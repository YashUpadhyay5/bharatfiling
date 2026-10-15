import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import AuthRequiredModal from '../common/AuthRequiredModal.jsx';
import { INDUSTRY_SOLUTIONS } from './industrySolutions.js';

const INTERVAL = 3200; // ms per card - calm enough for a hero
const EASE = 'cubic-bezier(0.22, 0.8, 0.24, 1)';

// Position of a card by its distance behind the front card (0 = front).
// The stack peeks upwards so the right-hand side stays clear for the rail.
const LAYOUT = {
  0: { x: 0, y: 0, s: 1, o: 1, z: 40 },
  1: { x: 0, y: -18, s: 0.95, o: 0.75, z: 30 },
  2: { x: 0, y: -36, s: 0.9, o: 0.4, z: 20 },
  exit: { x: -70, y: 26, s: 0.96, o: 0, z: 50 }, // the card that just left (slides out front-left)
  hidden: { x: 0, y: -52, s: 0.85, o: 0, z: 10 },
};

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062A4D]';

/**
 * Industry solutions as a stacked 3D card deck for the hero: the front card is fully readable,
 * the next two peek behind it. A rail on the right lists every industry - picking one opens its
 * card and pins it (auto-rotation stops until play is pressed). Auto-advance also pauses on
 * hover / focus / hidden tab / reduced motion; prev / next and a pointer-follow tilt as well.
 */
export default function IndustryDeck({ items = INDUSTRY_SOLUTIONS }) {
  const count = items.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false); // transient: hover / focus
  const [pinned, setPinned] = useState(false); // chosen by the user: stays until play
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [authService, setAuthService] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const go = useCallback((delta) => setActive((a) => (a + delta + count) % count), [count]);

  const pick = (i) => {
    setActive(i);
    setPinned(true);
  };

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

  const running = !paused && !pinned && !reduced && !hidden;

  // one timer per step; manual navigation restarts the countdown
  useEffect(() => {
    if (!running) return undefined;
    const id = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(id);
  }, [active, running, go]);

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
      className="relative w-full max-w-[470px] xl:max-w-[560px] 3xl:max-w-[720px]"
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
      <p className="mb-10 flex items-center gap-2 pl-1 text-[11px] 3xl:text-[12.5px] font-bold uppercase tracking-[0.16em] text-slate-500">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" aria-hidden="true" />
        Solutions for every industry
      </p>

      <div className="flex gap-5 xl:gap-7 3xl:gap-9">
        <div className="min-w-0 flex-1">
          {/* deck */}
          <div className="relative h-[318px] [perspective:1400px] 3xl:h-[372px]" onPointerMove={onPointerMove}>
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
                    className="absolute inset-0 flex flex-col rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_30px_70px_-34px_rgba(6,42,77,0.55)] backdrop-blur-xl 3xl:p-9"
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
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 3xl:h-14 3xl:w-14 ${item.accent.tile}`}>
                        <Icon className="h-6 w-6 3xl:h-7 3xl:w-7" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="text-[30px] 3xl:text-[40px] font-extrabold leading-none tracking-tight text-slate-200 tabular-nums" aria-hidden="true">
                        {item.number}
                      </span>
                    </div>
                    <p className={`mt-5 flex items-center gap-2 text-[11px] 3xl:mt-6 3xl:text-[12.5px] font-bold uppercase tracking-[0.14em] ${item.accent.label}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${item.accent.dot}`} aria-hidden="true" />
                      {item.category}
                    </p>
                    <h3 className="mt-2 text-[20px] 3xl:mt-3 3xl:text-[26px] font-bold leading-snug tracking-tight text-slate-900">{item.title}</h3>
                    <p className="mt-2 line-clamp-3 text-[14px] 3xl:mt-3 3xl:text-[16.5px] leading-relaxed text-slate-600">{item.description}</p>
                    <div className="mt-auto border-t border-slate-100 pt-4 3xl:pt-5">
                      <Link
                        to={item.path}
                        tabIndex={isFront ? undefined : -1}
                        onClick={(e) => explore(e, item)}
                        className="group/l inline-flex items-center gap-1.5 rounded-md text-[14px] 3xl:text-[15.5px] font-semibold text-blue-700 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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

          {/* controls: play / pause with countdown ring, counter, prev / next */}
          <div className="mt-6 flex items-center justify-between pl-1">
            <div className="flex items-center gap-3">
              {!reduced && (
                <button
                  type="button"
                  onClick={() => setPinned((p) => !p)}
                  aria-label={pinned ? 'Resume auto-rotation' : 'Pause auto-rotation'}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#062A4D] shadow-sm ring-1 ring-slate-200 transition hover:shadow-md active:scale-95 ${focusRing}`}
                >
                  {running && (
                    <svg key={active} aria-hidden="true" viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="16.5"
                        pathLength="100"
                        fill="none"
                        stroke="#062A4D"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="100"
                        className="bf-countdown"
                        style={{ animationDuration: `${INTERVAL}ms` }}
                      />
                    </svg>
                  )}
                  {pinned ? <Play className="h-3.5 w-3.5 translate-x-px fill-current" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5 fill-current" aria-hidden="true" />}
                </button>
              )}
              <span className="text-xs font-semibold tabular-nums text-slate-400 3xl:text-[13px]" data-deck-counter>
                {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              {pinned && <span className="bf-fade-in rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500">Paused</span>}
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
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow-md active:scale-95 ${focusRing}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* rail: every industry at a glance - pick one to open and pin it */}
        <ol aria-label="Choose an industry" className="relative flex h-[318px] shrink-0 flex-col justify-between 3xl:h-[372px]">
          <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-0.5 rounded-full bg-slate-200">
            <span
              className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-[#062A4D] to-[#2563EB]"
              style={{ height: `${(active / (count - 1)) * 100}%`, transition: `height ${dur}ms ${EASE}` }}
            />
          </span>
          {items.map((item, i) => {
            const isActive = i === active;
            const done = i < active;
            return (
              <li key={item.id} className="relative flex h-6 items-center">
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-label={`Show ${item.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  title={item.title}
                  className={`group/r flex items-center gap-3 rounded-full py-0.5 pr-2 text-left ${focusRing}`}
                >
                  <span className="grid h-4 w-4 shrink-0 place-items-center">
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? 'h-3.5 w-3.5 bg-[#062A4D] shadow-[0_0_0_5px_rgba(6,42,77,0.12)]'
                          : done
                            ? 'h-2.5 w-2.5 bg-[#062A4D]/70 group-hover/r:bg-[#062A4D]'
                            : 'h-2.5 w-2.5 bg-white ring-2 ring-slate-300 group-hover/r:ring-slate-500'
                      }`}
                    />
                  </span>
                  <span
                    className={`hidden whitespace-nowrap text-[12.5px] transition-colors duration-300 xl:block 3xl:text-[14px] ${
                      isActive ? 'font-semibold text-[#062A4D]' : 'font-medium text-slate-500 group-hover/r:text-slate-800'
                    }`}
                  >
                    {item.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="sr-only" aria-live="polite">
        {!running ? `${items[active].title}, ${active + 1} of ${count}` : ''}
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
