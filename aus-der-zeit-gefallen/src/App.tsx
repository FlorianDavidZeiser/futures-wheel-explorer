import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  type PanInfo,
} from 'framer-motion';
import { useExperience } from './state/ExperienceContext';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { palettes } from './styles/palettes';
import { units, type Unit } from './units';
import { stations, intro, turn, closingLine } from './data/content';
import { YearHud } from './components/ui/YearHud';
import { Forward } from './components/ui/Forward';
import { UnitView } from './components/screen/UnitView';
import { SwipeInvite } from './components/screen/SwipeInvite';

const SMALL = 520; // ms, kleiner Uebergang, innerhalb einer Station.
const BIG = 860; // ms, grosser Uebergang, zwischen Stationen.

// Die Buehne. Eine einzige Vorwaerts-Linie. Innerhalb einer Unit entfalten sich
// die Beats an Ort und Stelle (kleiner Uebergang), zwischen Units traegt der
// grosse Uebergang in eine neue Zeit, mit hochzaehlender Jahreszahl und neuer
// Farbtemperatur. Der Nutzer waehlt nie eine Richtung, nur vor oder zurueck.
export function App() {
  const { profession, setProfession, reset } = useExperience();
  const reduced = usePrefersReducedMotion();

  const [u, setU] = useState(0);
  const [b, setB] = useState(0);
  const [direction, setDirection] = useState(1);
  // Die einmalige Wisch-Einladung, nur am Anfang, verschwindet nach dem ersten
  // Weitergehen und kommt nie wieder.
  const [invite, setInvite] = useState(true);
  const uRef = useRef(0);
  const bRef = useRef(0);
  const lockUntil = useRef(0);
  useEffect(() => {
    uRef.current = u;
    bRef.current = b;
  }, [u, b]);

  const unit = units[u];
  const lastU = units.length - 1;
  const atEnd = u === lastU && b >= units[lastU].beatCount - 1;
  // Ansage fuer Screenreader, bei jedem Beat- und Stationswechsel.
  const announce = announceFor(unit, b, profession);

  // Temperaturbogen und Jahreszahl, ruhig animiert. Nur beim grossen Uebergang.
  const bg = useMotionValue(palettes.intro.bg);
  const bgDeep = useMotionValue(palettes.intro.bgDeep);
  const ink = useMotionValue(palettes.intro.ink);
  const firstYear = units.find((x) => x.year != null)?.year ?? 1850;
  const yearMV = useMotionValue(firstYear);
  const yearRounded = useMotionValue(firstYear);
  const hudOpacity = useMotionValue(0);
  const background = useMotionTemplate`linear-gradient(180deg, ${bg} 0%, ${bgDeep} 100%)`;

  useEffect(() => {
    const look = palettes[unit.look];
    const dur = reduced ? 0 : 1.2;
    const cs = [
      animate(bg, look.bg, { duration: dur, ease: 'easeInOut' }),
      animate(bgDeep, look.bgDeep, { duration: dur, ease: 'easeInOut' }),
      animate(ink, look.ink, { duration: dur, ease: 'easeInOut' }),
    ];
    if (unit.year != null) {
      const target = unit.year;
      cs.push(
        animate(yearMV, target, {
          duration: reduced ? 0 : 1.1,
          ease: 'easeOut',
          onUpdate: (v) => yearRounded.set(Math.round(v)),
          // Bei schnellem Wischen sauber auf den Zielwert klemmen, kein krummer
          // Zwischenwert bleibt stehen.
          onComplete: () => yearRounded.set(target),
        })
      );
    }
    animate(hudOpacity, unit.year != null ? 1 : 0, { duration: reduced ? 0 : 0.7, ease: 'easeOut' });
    return () => cs.forEach((c) => c.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u, reduced]);

  // Eine einzige Vorwaerts- und Rueckwaerts-Logik. Schaltet mal einen Beat, mal,
  // wenn die Unit fertig ist, die naechste Unit als grossen Uebergang.
  const go = useCallback((dir: 1 | -1) => {
    const now = Date.now();
    if (now < lockUntil.current) return;
    setInvite(false); // Die Einladung weicht beim ersten Weitergehen.
    const cu = uRef.current;
    const cb = bRef.current;
    if (dir === 1) {
      if (cb < units[cu].beatCount - 1) {
        lockUntil.current = now + SMALL;
        setDirection(1);
        setB(cb + 1);
      } else if (cu < units.length - 1) {
        lockUntil.current = now + BIG;
        setDirection(1);
        setU(cu + 1);
        setB(0);
      }
    } else {
      if (cb > 0) {
        lockUntil.current = now + SMALL;
        setDirection(-1);
        setB(cb - 1);
      } else if (cu > 0) {
        lockUntil.current = now + BIG;
        setDirection(-1);
        const pu = cu - 1;
        setU(pu);
        setB(units[pu].beatCount - 1);
      }
    }
  }, []);

  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  const restart = useCallback(() => {
    lockUntil.current = Date.now() + BIG;
    setDirection(-1);
    reset();
    setU(0);
    setB(0);
  }, [reset]);

  // Mausrad und Trackpad.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Langer Text darf vertikal scrollen, ohne dass das Rad navigiert.
      const sc = (e.target as HTMLElement | null)?.closest('[data-scroll]') as HTMLElement | null;
      if (sc && sc.scrollHeight > sc.clientHeight + 1) return;
      e.preventDefault();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(d) < 12) return;
      if (d > 0) next();
      else prev();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [next, prev]);

  // Pfeiltasten und Leertaste, Eingabefeld nicht stoeren.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const onDragEnd = useCallback(
    (_e: unknown, info: PanInfo) => {
      if (info.offset.x < -70 || info.velocity.x < -350) next();
      else if (info.offset.x > 70 || info.velocity.x > 350) prev();
    },
    [next, prev]
  );

  // Tipp auf die rechte Bildhaelfte vor, linke zurueck. Knoepfe und Feld ausnehmen.
  const onTap = useCallback(
    (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const el = e.target as HTMLElement | null;
      if (el && el.closest('button, input, a')) return;
      // Vorwaerts ist die grosse, leichte Zone. Zurueck nur das linke Viertel,
      // damit niemand beim Antippen zum Weiterlesen versehentlich zurueckspringt.
      if (info.point.x < window.innerWidth * 0.28) prev();
      else next();
    },
    [next, prev]
  );

  const enter = (dir: number) =>
    reduced ? { opacity: 0 } : { x: dir >= 0 ? '100%' : '-100%', opacity: 0 };
  const exit = (dir: number) =>
    reduced
      ? { opacity: 0, transition: { duration: 0.3 } }
      : { x: dir >= 0 ? '-26%' : '26%', opacity: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.4, 1] as const } };
  const center = reduced
    ? { opacity: 1, transition: { duration: 0.3 } }
    : { x: 0, opacity: 1, transition: { duration: 0.86, ease: [0.22, 0.61, 0.36, 1] as const } };

  return (
    <>
      <motion.div aria-hidden className="fixed inset-0 -z-10" style={{ background }} />

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announce}
      </div>

      <YearHud value={yearRounded} opacity={hudOpacity} color={ink} />
      <Forward dir="next" onClick={next} visible={!atEnd} color={ink} reduced={reduced} />
      <Forward dir="prev" onClick={prev} visible={u > 0 || b > 0} color={ink} reduced={reduced} />

      <AnimatePresence>
        {invite && u === 0 ? (
          <SwipeInvite key="invite" reduced={reduced} onDone={() => setInvite(false)} />
        ) : null}
      </AnimatePresence>

      <div className="fixed inset-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={u}
            custom={direction}
            className="absolute inset-0"
            variants={{ enter, center, exit }}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragSnapToOrigin
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.22}
            onDragEnd={onDragEnd}
            onTap={onTap}
          >
            <UnitView
              unit={unit}
              beat={b}
              reduced={reduced}
              profession={profession}
              setProfession={setProfession}
              onNext={next}
              onRestart={restart}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

// Baut den Ansagetext fuer Screenreader aus Ort, Jahr, Beruf und Beat-Text.
function announceFor(unit: Unit, beat: number, profession: string): string {
  if (unit.kind === 'introA') return `${intro.title}. ${intro.lead}`;
  if (unit.kind === 'introB') return intro.question;
  if (unit.kind === 'station') {
    const s = stations.find((x) => x.id === unit.stationId)!;
    const head = `${s.place}, ${unit.year}.`;
    const nm = beat >= 1 ? ` ${s.profession}.` : '';
    const body = beat === 0 ? s.worldEntry : beat === 1 ? s.story : s.aftermath;
    return `${head}${nm} ${body}`;
  }
  const name = profession.trim() || turn.fallbackProfession;
  if (unit.isHeute) {
    if (beat === 0) return `${unit.year}. ${turn.todayLine}`;
    if (beat === 1) return `${unit.year}. ${name}.`;
    return `${unit.year}. ${name}. Fragezeichen.`;
  }
  const base = `${unit.year}. ${name}.`;
  return unit.showClosing ? `${base} ${closingLine}` : base;
}
