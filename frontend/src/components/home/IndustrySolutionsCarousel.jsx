import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { INDUSTRY_SOLUTIONS } from './industrySolutions.js';
import { mod, useInfiniteCarousel, usePrefersReducedMotion } from './useInfiniteCarousel.js';

const EASE = 'cubic-bezier(0.22, 0.8, 0.24, 1)';

// Visual weight by distance from the active card (0 = active). Index 3 covers "everything further".
const EMPHASIS = [
  { scale: 1, opacity: 1 },
  { scale: 0.95, opacity: 0.92 },
  { scale: 0.9, opacity: 0.6 },
  { scale: 0.86, opacity: 0.35 },
];

const FOCUS_RING =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';

/* -------------------------------------------------------------------------- */
/* One card                                                                    */
/* -------------------------------------------------------------------------- */

const IndustryCard = memo(function IndustryCard({
  item,
  index,
  position,
  total,
  distance,
  isClone,
  animate,
  duration,
  onFocusIndex,
  onExplore,
}) {
  const Icon = item.icon;
  const isActive = distance === 0;
  const emphasis = EMPHASIS[Math.min(distance, EMPHASIS.length - 1)];
  const transition = animate
    ? `transform ${duration}ms ${EASE}, opacity ${duration}ms ${EASE}, box-shadow ${duration}ms ${EASE}`
    : 'none';

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${position} of ${total}`}
      aria-hidden={isClone ? 'true' : undefined}
      className="w-[var(--cw)] shrink-0 select-none"
      style={{
        transform: `scale(${emphasis.scale})`,
        opacity: emphasis.opacity,
        transition,
        willChange: 'transform, opacity',
      }}
    >
      <article
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-6 sm:p-7 ${
          isActive
            ? 'border-blue-200 shadow-[0_28px_60px_-28px_rgba(37,99,235,0.45)]'
            : 'border-slate-200/90 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.35)]'
        }`}
        style={{ transition: animate ? `box-shadow ${duration}ms ${EASE}, border-color ${duration}ms ${EASE}` : 'none' }}
      >
        {/* accent hairline, visible on the active card */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-6 top-0 h-[3px] rounded-b-full ${item.accent.bar} transition-opacity`}
          style={{ opacity: isActive ? 1 : 0, transitionDuration: `${duration}ms` }}
        />

        <div className="flex items-start justify-between">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${item.accent.tile}`}
          >
            <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span
            className="text-[28px] font-extrabold leading-none tracking-tight text-slate-200 tabular-nums"
            aria-hidden="true"
          >
            {item.number}
          </span>
        </div>

        <div className="mt-6 flex-1">
          <p
            className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] ${item.accent.label}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${item.accent.dot}`} aria-hidden="true" />
            <span className="sr-only">Category {item.number}: </span>
            {item.category}
          </p>
          <h3 className="mt-2.5 text-[19px] font-bold leading-snug tracking-tight text-slate-900">
            {item.title}
          </h3>
          <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">{item.description}</p>
        </div>

        <div className="mt-6 border-t border-slate-200/80 pt-4">
          <Link
            to={item.path}
            tabIndex={isClone ? -1 : undefined}
            draggable={false}
            onFocus={() => onFocusIndex(index)}
            onClick={(e) => {
              if (onExplore) {
                e.preventDefault();
                onExplore(item);
              }
            }}
            className={`group/link inline-flex items-center gap-1.5 rounded-md text-[14px] font-semibold text-blue-700 transition-colors hover:text-blue-800 ${FOCUS_RING}`}
          >
            Explore Solutions
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </article>
    </div>
  );
});

/* -------------------------------------------------------------------------- */
/* Section + carousel                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Props
 *  - items:             card data (defaults to the seven industry solutions)
 *  - autoplayInterval:  ms between automatic steps (default 1000)
 *  - onExplore(item):   optional; when given it replaces the default <Link> navigation
 */
export default function IndustrySolutionsCarousel({
  items = INDUSTRY_SOLUTIONS,
  autoplayInterval = 1000,
  onExplore,
}) {
  const reducedMotion = usePrefersReducedMotion();
  const count = items.length;
  // The slide must finish comfortably inside one autoplay interval.
  const duration = Math.min(650, Math.max(240, Math.round(autoplayInterval * 0.65)));

  const c = useInfiniteCarousel({ count, interval: autoplayInterval, duration, reducedMotion });

  const slots = useMemo(
    () => Array.from({ length: c.slotEnd - c.slotStart }, (_, i) => c.slotStart + i),
    [c.slotStart, c.slotEnd]
  );

  const active = items[c.activeIndex];
  const trackTransition = c.animate && !c.dragging ? `transform ${duration}ms ${EASE}` : 'none';

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      c.next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      c.prev();
    }
  };

  const arrowClass = `flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 hover:shadow-md active:scale-95 ${FOCUS_RING}`;

  return (
    <section
      aria-labelledby="industry-solutions-heading"
      className="relative overflow-hidden border-b border-slate-200/80 bg-[#F7F9FC] py-14 sm:py-20"
    >
      {/* soft blue atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(37,99,235,0.10),transparent_70%),radial-gradient(40%_40%_at_100%_100%,rgba(99,102,241,0.07),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-blue-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Industry-Specific Solutions
          </span>
          <h2
            id="industry-solutions-heading"
            className="mt-5 text-[28px] font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl"
          >
            Tailored Financial &amp; Compliance Solutions for{' '}
            <span className="text-blue-600">Every Industry</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
            Whether you’re a startup, a creator, a business owner or a social organization — we provide
            industry-specific CA, tax, legal and compliance services to keep you ahead.
          </p>
        </div>
      </div>

      {/* ---- carousel ---- */}
      <div
        ref={c.rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Industry solutions"
        onKeyDown={handleKeyDown}
        {...c.wrapperProps}
        className="relative mt-10 [--cw:min(82vw,320px)] [--gap:16px] sm:[--cw:300px] lg:[--cw:320px] lg:[--gap:20px]"
      >
        <div
          {...c.viewportProps}
          // Focusing a card must never scroll the clipped viewport sideways.
          onScroll={(e) => {
            e.currentTarget.scrollLeft = 0;
          }}
          // Native link/image dragging would cancel the swipe gesture.
          onDragStart={(e) => e.preventDefault()}
          className="mx-auto max-w-[1280px] cursor-grab touch-pan-y overflow-hidden py-8 [-webkit-mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)] active:cursor-grabbing"
        >
          <div
            ref={c.trackRef}
            className="relative flex w-max items-stretch"
            style={{
              left: '50%',
              gap: 'var(--gap)',
              '--pos': c.pos,
              transform: `translate3d(calc(var(--drag, 0px) - var(--cw) / 2 - (var(--pos) + ${-c.slotStart}) * (var(--cw) + var(--gap))), 0, 0)`,
              transition: trackTransition,
              willChange: 'transform',
            }}
          >
            {slots.map((slot) => {
              const index = mod(slot, count);
              const isClone = slot < 0 || slot >= count;
              return (
                <IndustryCard
                  key={slot}
                  item={items[index]}
                  index={index}
                  position={index + 1}
                  total={count}
                  distance={Math.min(Math.abs(slot - c.pos), 3)}
                  isClone={isClone}
                  animate={c.animate && !c.dragging}
                  duration={duration}
                  onFocusIndex={c.goToIndex}
                  onExplore={onExplore}
                />
              );
            })}
          </div>
        </div>

        {/* controls */}
        <div className="relative mx-auto mt-2 flex max-w-xl items-center justify-center gap-3 px-4">
          <button type="button" onClick={c.prev} aria-label="Previous industry" className={arrowClass}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div role="group" aria-label="Choose an industry" className="flex items-center gap-1">
            {items.map((item, i) => {
              const isCurrent = i === c.activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => c.goToIndex(i)}
                  aria-label={`Show ${item.title} (${i + 1} of ${count})`}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`group flex h-8 items-center justify-center rounded-full px-1 ${FOCUS_RING}`}
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${
                      isCurrent ? 'w-7 bg-blue-600' : 'w-2 bg-slate-300 group-hover:bg-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button type="button" onClick={c.next} aria-label="Next industry" className={arrowClass}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          {c.canAutoplay && (
            <>
              <span className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" aria-hidden="true" />
              <button
                type="button"
                onClick={c.toggleUserPause}
                aria-pressed={c.userPaused}
                aria-label={c.userPaused ? 'Start automatic rotation' : 'Pause automatic rotation'}
                className={`${arrowClass} hidden sm:flex`}
              >
                {c.userPaused ? (
                  <Play className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Pause className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </>
          )}
        </div>

        {/* announced only while not auto-rotating (WAI-ARIA carousel pattern) */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {c.isAutoplaying ? '' : `${active.title}, ${c.activeIndex + 1} of ${count}`}
        </p>
      </div>
    </section>
  );
}
