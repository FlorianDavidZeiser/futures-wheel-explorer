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
import { units, RUN, type Unit } from './units';
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
// Farbtemperatur. Im letzten Beat der Heute-Unit laeuft die Zeit fliessend weiter.
export function App() {
  const { profession, setProfession, reset } = useExperience();
  const reduced = usePrefersReducedMotion();

  const [u, setU] = useState(0);
  const [b, setB] = useState(0);
  const [direction, setDirection] = useState(1);
  const [runDone, setRunDone] = useState(false);
  // Die Stufe der sich selbst entfaltenden Heute-Sequenz: 0 Heute-Zeile,
  // 1 der eigene Beruf, 2 das Hochlaufen der Zeit. Kein Klick, nur Zeit.
  const [heuteStage, setHeuteStage] = useState(0);
  // Im Epilog blendet die Jahreszahl aus, der Screen wird zeitlos.
  const [epilogActive, setEpilogActive] = useState(false);
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
  // Im Heute treibt die Zeit die Stufe, sonst der Beat.
  const effectiveBeat = unit.isHeute ? heuteStage : b;
  const announce = announceFor(unit, effectiveBeat, profession);

  // Temperaturbogen, Jahreszahl und die live mitlaufende Schluss-Patina.
  const bg = useMotionValue(palettes.intro.bg);
  const bgDeep = useMotionValue(palettes.intro.bgDeep);
  const ink = useMotionValue(palettes.intro.ink);
  const firstYear = units.find((x) => x.year != null)?.year ?? 1850;
  const yearMV = useMotionValue(firstYear);
  const yearRounded = useMotionValue(firstYear);
  const hudOpacity = useMotionValue(0);
  const heutePatina = useMotionValue(0);
  // Hebel 7, der dunkle Korridor zwischen den Saelen.
  const corridor = useMotionValue(0);
  // Impuls auf die Jahreszahl beim Hochzaehlen, damit man den Sprung sieht.
  const yearPulse = useMotionValue(0);
  const firstU = useRef(true);
  const background = useMotionTemplate`linear-gradient(180deg, ${bg} 0%, ${bgDeep} 100%)`;

  // A6, die Farbtemperatur blendet beim grossen Uebergang sichtbar ueber.
  useEffect(() => {
    const look = palettes[unit.look];
    const dur = reduced ? 0 : 1.4;
    const cs = [
      animate(bg, look.bg, { duration: dur, ease: 'easeInOut' }),
      animate(bgDeep, look.bgDeep, { duration: dur, ease: 'easeInOut' }),
      animate(ink, look.ink, { duration: dur, ease: 'easeInOut' }),
    ];
    return () => cs.forEach((c) => c.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u, reduced]);

  // Die Jahreszahl ist sichtbar, sobald der Vorhang gewichen ist, und weicht im
  // Epilog wieder, damit der letzte Screen zeitlos wird.
  useEffect(() => {
    const show = unit.year != null && !epilogActive;
    const ho = animate(hudOpacity, show ? 1 : 0, { duration: reduced ? 0 : 0.9, ease: 'easeOut' });
    return () => ho.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u, epilogActive, reduced]);

  // Hebel 7, beim grossen Uebergang ein kurzer Gang durchs Dunkle, wie zwischen
  // zwei Museumssaelen. Nur beim Stationswechsel, nicht bei den Beats.
  useEffect(() => {
    if (firstU.current) {
      firstU.current = false;
      return;
    }
    if (reduced) return;
    const c = animate(corridor, [0, 0.62, 0], { duration: 0.78, times: [0, 0.42, 1], ease: 'easeInOut' });
    const p = animate(yearPulse, [0, 1, 0], { duration: 1.2, times: [0, 0.45, 1], ease: 'easeOut' });
    return () => {
      c.stop();
      p.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u]);

  // Jahreszahl der Stationen. Innerhalb einer Station konstant, beim grossen
  // Uebergang zaehlt sie hoch. Intro und Heute werden gesondert behandelt.
  useEffect(() => {
    if (unit.year == null || unit.isHeute) return;
    const target = unit.year;
    const yc = animate(yearMV, target, {
      duration: reduced ? 0 : 1.1,
      ease: 'easeOut',
      onUpdate: (v) => yearRounded.set(Math.round(v)),
      onComplete: () => yearRounded.set(target),
    });
    return () => yc.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u, reduced]);

  // Der Schluss, eine einzige sich selbst entfaltende Sequenz. Ab dem Erscheinen
  // des eigenen Berufs gibt es nichts mehr zum Wegklicken, die Zeit laeuft von
  // selbst ueber den Nutzer hinweg.
  useEffect(() => {
    if (!unit.isHeute) {
      setHeuteStage(0);
      setRunDone(false);
      heutePatina.set(0);
      return;
    }
    setHeuteStage(0);
    setRunDone(false);
    heutePatina.set(0);
    const timers: number[] = [];
    let pc: ReturnType<typeof animate> | undefined;
    let runYc: ReturnType<typeof animate> | undefined;

    // 2. Der Sprung ins Heute, die Jahreszahl zaehlt hoch auf 2026.
    const leap = animate(yearMV, RUN.startYear, {
      duration: reduced ? 0 : 1.2,
      ease: 'easeOut',
      onUpdate: (v) => yearRounded.set(Math.round(v)),
      onComplete: () => yearRounded.set(RUN.startYear),
    });

    if (reduced) {
      setHeuteStage(2);
      yearMV.set(RUN.endYear);
      yearRounded.set(RUN.endYear);
      heutePatina.set(1);
      timers.push(window.setTimeout(() => setRunDone(true), 500));
      return () => {
        leap.stop();
        timers.forEach((t) => window.clearTimeout(t));
      };
    }

    // 3. Die Heute-Zeile steht (Stage 0). 4. Der eigene Beruf erscheint (Stage 1).
    timers.push(window.setTimeout(() => setHeuteStage(1), 2600));
    // 5. Eine Pause, in der bewusst nichts passiert. 6. Dann laeuft die Zeit.
    const RUN_MS = 9000;
    timers.push(
      window.setTimeout(() => {
        setHeuteStage(2);
        // 7. Patina und Fragezeichen legen sich synchron zum Hochlaufen.
        pc = animate(heutePatina, 1, { duration: RUN_MS / 1000, ease: 'easeInOut' });
        // Hebel 3, die Zahl rollt durch die Jahre. Erst traege mit Pausen an den
        // fruehen Marken, dann beschleunigt sie und zieht davon.
        runYc = animate(yearMV, [2026, 2030, 2030, 2035, 2035, 2045, 2070], {
          duration: RUN_MS / 1000,
          ease: 'linear',
          times: [0, 0.14, 0.34, 0.46, 0.64, 0.8, 1],
          onUpdate: (v) => yearRounded.set(Math.round(v)),
          onComplete: () => yearRounded.set(RUN.endYear),
        });
        // 8. Halt bei 2070, Stille. 9. Dann die Schlusszeile.
        timers.push(window.setTimeout(() => setRunDone(true), RUN_MS + 1500));
      }, 2600 + 5500)
    );

    return () => {
      leap.stop();
      pc?.stop();
      runYc?.stop();
      timers.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [u, reduced]);

  // Eine einzige Vorwaerts- und Rueckwaerts-Logik. Schaltet mal einen Beat, mal,
  // wenn die Unit fertig ist, die naechste Unit als grossen Uebergang.
  const go = useCallback((dir: 1 | -1) => {
    const now = Date.now();
    if (now < lockUntil.current) return;
    setInvite(false);
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

  // Tipp auf die rechte Bildhaelfte vor, linkes Viertel zurueck. Knoepfe und Feld aus.
  const onTap = useCallback(
    (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const el = e.target as HTMLElement | null;
      if (el && el.closest('button, input, a')) return;
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
      <div aria-hidden className="film-grain" />

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announce}
      </div>

      <motion.div aria-hidden className="pointer-events-none fixed inset-0 z-20 bg-black" style={{ opacity: corridor }} />

      <YearHud value={yearRounded} opacity={hudOpacity} color={ink} pulse={yearPulse} reduced={reduced} />
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
              beat={effectiveBeat}
              reduced={reduced}
              profession={profession}
              setProfession={setProfession}
              onNext={next}
              onRestart={restart}
              heutePatina={heutePatina}
              runDone={runDone}
              onEpilog={setEpilogActive}
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
  if (beat === 0) return `${unit.year}. ${turn.todayLine}`;
  if (beat === 1) return `${unit.year}. ${name}.`;
  return `${name}. ${closingLine}`;
}
