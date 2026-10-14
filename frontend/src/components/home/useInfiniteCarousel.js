import { useCallback, useEffect, useRef, useState } from 'react';

export const mod = (n, m) => ((n % m) + m) % m;

/** True when the visitor asked the OS / browser to reduce motion. Updates live. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * Infinite, centred carousel engine.
 *
 * How the loop works
 *  - The track renders every item `repeat + 1 + repeat` times (clones before and after the real
 *    set). `pos` is a *virtual* index that may leave [0, count); the track simply keeps sliding.
 *  - Once `pos` is in clone territory and the slide has finished, the position is moved by exactly
 *    one full set (`count`) with transitions switched off. The clone shows identical content in the
 *    identical place, so the reset is invisible - there is never a gap or a jump.
 *
 * Autoplay
 *  - One `setTimeout` is armed per step (re-armed on every manual / automatic step), so manual
 *    navigation restarts the countdown and there can never be two timers running.
 *  - Paused while: hovering (mouse), keyboard focus inside, dragging, the user pressed pause,
 *    the tab is hidden, the carousel is off-screen, or reduced motion is requested.
 */
export function useInfiniteCarousel({
  count,
  interval = 1000,
  duration = 600,
  reducedMotion = false,
  radius = 3, // how many slots either side of the active one must always exist
}) {
  const repeat = Math.max(1, Math.ceil((radius + 1) / Math.max(count, 1)));
  const slotStart = -repeat * count;
  const slotEnd = (repeat + 1) * count; // exclusive
  const minPos = slotStart + radius;
  const maxPos = slotEnd - 1 - radius;

  const [pos, setPos] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [stepId, setStepId] = useState(0); // bumps on every real step; NOT on invisible snap-backs
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pageHidden, setPageHidden] = useState(() => typeof document !== 'undefined' && document.hidden);
  const [inView, setInView] = useState(true);

  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const lastStepAt = useRef(0); // performance.now() of the most recent step (drift-free cadence)

  const canAutoplay = !reducedMotion && count > 1;
  const paused = !canAutoplay || userPaused || hovered || focused || dragging || pageHidden || !inView;

  /* ---------------------------- stepping ---------------------------- */

  const move = useCallback(
    (delta) => {
      if (!delta || count < 2) return;
      lastStepAt.current = performance.now();
      setPos((p) => {
        const next = p + delta;
        // Mashing the arrows faster than the snap-back can recentre: ignore the overflow.
        return next < minPos || next > maxPos ? p : next;
      });
      setStepId((i) => i + 1);
    },
    [count, minPos, maxPos]
  );

  const next = useCallback(() => move(1), [move]);
  const prev = useCallback(() => move(-1), [move]);

  /** Jump to a real item by index, taking the shortest way round the ring. */
  const goToIndex = useCallback(
    (index) => {
      if (count < 2) return;
      const half = Math.floor(count / 2);
      lastStepAt.current = performance.now();
      setPos((p) => {
        const delta = mod(index - p + half, count) - half;
        const nextPos = p + delta;
        return nextPos < minPos || nextPos > maxPos ? p : nextPos;
      });
      setStepId((i) => i + 1);
    },
    [count, minPos, maxPos]
  );

  /* ---------------------------- autoplay ---------------------------- */

  // Resuming always waits a full interval (never fires instantly after a hover / focus ends).
  useEffect(() => {
    if (!paused) lastStepAt.current = performance.now();
  }, [paused]);

  useEffect(() => {
    if (paused) return undefined;
    // Arm relative to the last step, not to "now": render latency would otherwise add ~40ms per step.
    const wait = Math.max(0, interval - (performance.now() - lastStepAt.current));
    const id = setTimeout(() => {
      lastStepAt.current = performance.now();
      setPos((p) => (p + 1 > maxPos ? p : p + 1));
      setStepId((i) => i + 1);
    }, wait);
    return () => clearTimeout(id);
  }, [paused, stepId, interval, maxPos]);

  /* ------------------- invisible snap-back to the real set ------------------- */

  useEffect(() => {
    if (pos >= 0 && pos < count) return undefined;
    // Wait for the slide to finish, then re-centre on the identical real card without animating.
    const id = setTimeout(() => {
      setAnimate(false);
      setPos((p) => mod(p, count));
    }, duration + 60);
    return () => clearTimeout(id);
  }, [pos, count, duration]);

  useEffect(() => {
    if (animate) return undefined;
    // Re-enable transitions only after the un-animated position has been painted.
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [animate]);

  /* ------------------- page / viewport visibility ------------------- */

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ---------------------- hover / focus pausing ---------------------- */

  const wrapperProps = {
    onPointerEnter: (e) => {
      if (e.pointerType === 'mouse') setHovered(true);
    },
    onPointerLeave: (e) => {
      if (e.pointerType === 'mouse') setHovered(false);
    },
    onFocus: (e) => {
      // Keyboard focus only: a mouse click on an arrow must not leave autoplay stuck on pause.
      if (e.target.matches && e.target.matches(':focus-visible')) setFocused(true);
    },
    onBlur: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
    },
  };

  /* ---------------------- swipe / drag navigation ---------------------- */

  const drag = useRef({ active: false, id: null, startX: 0, startY: 0, dx: 0, captured: false, step: 0 });
  const suppressClick = useRef(false);

  const viewportProps = {
    onPointerDown: (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const track = trackRef.current;
      if (!track) return;
      const [a, b] = [track.children[0], track.children[1]];
      drag.current = {
        active: true,
        id: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        dx: 0,
        captured: false,
        step: a && b ? b.offsetLeft - a.offsetLeft : 0,
      };
    },
    onPointerMove: (e) => {
      const d = drag.current;
      if (!d.active || e.pointerId !== d.id) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      if (!d.captured) {
        if (Math.abs(dx) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          d.active = false; // vertical scroll gesture - leave it to the browser
          return;
        }
        d.captured = true;
        setDragging(true);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* pointer already gone */
        }
      }
      d.dx = dx;
      trackRef.current?.style.setProperty('--drag', `${dx}px`);
    },
    onPointerUp: (e) => finishDrag(e),
    onPointerCancel: (e) => finishDrag(e),
    onClickCapture: (e) => {
      // A drag must not be treated as a click on the card underneath.
      if (suppressClick.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
  };

  function finishDrag(e) {
    const d = drag.current;
    if (!d.active || e.pointerId !== d.id) return;
    d.active = false;
    if (!d.captured) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    let delta = Math.round(-d.dx / (d.step || 1));
    if (delta === 0 && Math.abs(d.dx) > 40) delta = d.dx < 0 ? 1 : -1;
    delta = Math.max(-radius, Math.min(radius, delta));

    trackRef.current?.style.setProperty('--drag', '0px');
    setDragging(false);
    if (delta) move(delta);

    suppressClick.current = true;
    setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  }

  /* ---------------------------- public API ---------------------------- */

  return {
    // state
    pos,
    activeIndex: mod(pos, Math.max(count, 1)),
    animate: animate && !reducedMotion,
    dragging,
    paused,
    isAutoplaying: !paused,
    userPaused,
    canAutoplay,
    // layout
    repeat,
    slotStart,
    slotEnd,
    // actions
    next,
    prev,
    goToIndex,
    toggleUserPause: () => setUserPaused((v) => !v),
    // bindings
    rootRef,
    trackRef,
    wrapperProps,
    viewportProps,
  };
}
