import { useEffect, type RefObject } from 'react';
import type { MotionValue } from 'framer-motion';
import { turn } from '../data/content';

interface Params {
  yearMV: MotionValue<number>;
  patinaMV: MotionValue<number>;
  pinMV: MotionValue<number>;
  hudOpacity: MotionValue<number>;
  /** Stuetzpunkte der Jahreszahl, in DOM-Reihenfolge oben nach unten. */
  waypointRefs: RefObject<(HTMLElement | null)[]>;
  /** Die zugehoerigen Jahre der Stuetzpunkte. */
  years: number[];
  /** Der hohe, gepinnte Wendungs-Container. */
  turnRef: RefObject<HTMLElement | null>;
  /** Erneut vermessen, wenn die Reise zurueckgesetzt wird. */
  runKey: number;
}

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Leitet aus der Scroll-Position die ganze Reise ab. Bewusst nur ueber
// MotionValues, ohne React-Neurender, damit das Scrollen auf Touch und Mobile
// fluessig bleibt. Das Scrollen selbst ist die Bewegung durch die Zeit.
export function useScrollTimeline({
  yearMV,
  patinaMV,
  pinMV,
  hudOpacity,
  waypointRefs,
  years,
  turnRef,
  runKey,
}: Params) {
  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const vc = vh / 2;

      // Die Wendung zuerst, sie ist gepinnt und uebersteuert die Stuetzpunkte.
      const outer = turnRef.current;
      if (outer) {
        const r = outer.getBoundingClientRect();
        const span = Math.max(1, outer.offsetHeight - vh);
        if (r.top <= 0 && -r.top <= span) {
          const p = clamp(-r.top / span);
          // Ruhig erst, dann spuerbar beschleunigend.
          const climb = clamp(p / 0.78);
          yearMV.set(lerp(turn.startYear, turn.endYear, Math.pow(climb, 2.2)));
          patinaMV.set(Math.pow(clamp(p / 0.85), 1.2));
          pinMV.set(p);
          hudOpacity.set(1);
          return;
        }
        if (-r.top > span) {
          // Hinter der Wendung. Alles steht bei 2070, die Patina liegt.
          yearMV.set(turn.endYear);
          patinaMV.set(1);
          pinMV.set(1);
          hudOpacity.set(1);
          return;
        }
      }

      // Vor der Wendung. Keine Patina, kein Pin.
      patinaMV.set(0);
      pinMV.set(0);

      const els = waypointRefs.current ?? [];
      const pts: { year: number; c: number }[] = [];
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        const rr = el.getBoundingClientRect();
        pts.push({ year: years[i], c: rr.top + rr.height / 2 });
      }

      if (pts.length > 0) {
        if (vc <= pts[0].c) {
          yearMV.set(pts[0].year);
        } else if (vc >= pts[pts.length - 1].c) {
          yearMV.set(pts[pts.length - 1].year);
        } else {
          for (let i = 0; i < pts.length - 1; i++) {
            const a = pts[i];
            const b = pts[i + 1];
            if (vc <= a.c && vc >= b.c) {
              const t = clamp((a.c - vc) / (a.c - b.c || 1));
              yearMV.set(lerp(a.year, b.year, t));
              break;
            }
          }
        }
      }

      // Die Jahreszahl blendet ein, sobald der Vorhang des Eingangs gewichen ist.
      const sy = window.scrollY;
      hudOpacity.set(clamp((sy - vh * 0.55) / (vh * 0.35)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Nach Layout und Schriftladung noch einmal sauber vermessen.
    const settle = window.setTimeout(update, 300);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(settle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey]);
}
