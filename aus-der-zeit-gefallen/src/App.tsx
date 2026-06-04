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
import { screens, type Screen } from './screens';
import { YearHud } from './components/ui/YearHud';
import { Forward } from './components/ui/Forward';
import { IntroA } from './components/screen/IntroA';
import { IntroB } from './components/screen/IntroB';
import { StationScreen } from './components/screen/StationScreen';
import { SilhouetteScreen } from './components/screen/SilhouetteScreen';

const COOLDOWN = 820; // ms, etwas laenger als der Uebergang, gegen Ueberspringen.

// Die Buehne. Eine horizontale Abfolge von Screens, von links nach rechts, von
// der Vergangenheit in die Zukunft. Vorwaerts heisst nach rechts. Die Jahreszahl
// laeuft als fester Anker mit und zaehlt bei jedem Vorwaertsgehen hoch. Der
// Temperaturbogen liegt als ruhiger Hintergrund dahinter.
export function App() {
  const { profession, setProfession, reset } = useExperience();
  const reduced = usePrefersReducedMotion();

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const lastNav = useRef(0);
  const active = screens[index];
  const last = screens.length - 1;

  // Der Temperaturbogen und die Jahreszahl, als MotionValues, ruhig animiert.
  const bg = useMotionValue(palettes.intro.bg);
  const bgDeep = useMotionValue(palettes.intro.bgDeep);
  const ink = useMotionValue(palettes.intro.ink);
  const yearMV = useMotionValue(screens.find((s) => s.year != null)?.year ?? 1850);
  const yearRounded = useMotionValue(yearMV.get());
  const hudOpacity = useMotionValue(0);
  const background = useMotionTemplate`linear-gradient(180deg, ${bg} 0%, ${bgDeep} 100%)`;

  // Auf jeden Screenwechsel, ruhige Farbangleichung und Jahreszahl hochzaehlen.
  useEffect(() => {
    const look = palettes[active.look];
    const dur = reduced ? 0 : 1.2;
    const c1 = animate(bg, look.bg, { duration: dur, ease: 'easeInOut' });
    const c2 = animate(bgDeep, look.bgDeep, { duration: dur, ease: 'easeInOut' });
    const c3 = animate(ink, look.ink, { duration: dur, ease: 'easeInOut' });

    const controls: { stop: () => void }[] = [c1, c2, c3];
    if (active.year != null) {
      const yc = animate(yearMV, active.year, {
        duration: reduced ? 0 : 1.1,
        ease: 'easeOut',
        onUpdate: (v) => yearRounded.set(Math.round(v)),
      });
      controls.push(yc);
    }
    animate(hudOpacity, active.year != null ? 1 : 0, { duration: reduced ? 0 : 0.7, ease: 'easeOut' });

    return () => controls.forEach((c) => c.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduced]);

  const go = useCallback(
    (dir: 1 | -1) => {
      const now = Date.now();
      if (now - lastNav.current < COOLDOWN) return;
      setIndex((i) => {
        const ni = i + dir;
        if (ni < 0 || ni > last) return i;
        lastNav.current = now;
        setDirection(dir);
        return ni;
      });
    },
    [last]
  );

  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  const restart = useCallback(() => {
    lastNav.current = Date.now();
    setDirection(-1);
    reset();
    setIndex(0);
  }, [reset]);

  // Mausrad und Trackpad, vertikal oder horizontal, steuern vor und zurueck.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(d) < 12) return;
      if (d > 0) next();
      else prev();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [next, prev]);

  // Pfeiltasten, vor und zurueck. Eingabefeld nicht stoeren.
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

  // Sanftes seitliches Hereingleiten, ease-out, dazu eine leichte Ueberblendung.
  const enter = (dir: number) =>
    reduced ? { opacity: 0 } : { x: dir >= 0 ? '100%' : '-100%', opacity: 0 };
  const exit = (dir: number) =>
    reduced
      ? { opacity: 0, transition: { duration: 0.3 } }
      : { x: dir >= 0 ? '-28%' : '28%', opacity: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.4, 1] as const } };
  const center = reduced
    ? { opacity: 1, transition: { duration: 0.3 } }
    : { x: 0, opacity: 1, transition: { duration: 0.85, ease: [0.22, 0.61, 0.36, 1] as const } };

  return (
    <>
      {/* Der feste Temperaturbogen hinter der ganzen Reise. */}
      <motion.div aria-hidden className="fixed inset-0 -z-10" style={{ background }} />

      <YearHud value={yearRounded} opacity={hudOpacity} color={ink} />
      <Forward onClick={next} visible={index < last} color={ink} reduced={reduced} />

      <div className="fixed inset-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
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
          >
            {renderScreen(active, {
              reduced,
              profession,
              setProfession,
              next,
              restart,
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

interface Actions {
  reduced: boolean;
  profession: string;
  setProfession: (v: string) => void;
  next: () => void;
  restart: () => void;
}

function renderScreen(screen: Screen, a: Actions) {
  switch (screen.kind) {
    case 'introA':
      return <IntroA reduced={a.reduced} onNext={a.next} />;
    case 'introB':
      return <IntroB reduced={a.reduced} profession={a.profession} setProfession={a.setProfession} onNext={a.next} />;
    case 'beat':
      return <StationScreen stationId={screen.stationId} beat={screen.beat} reduced={a.reduced} />;
    case 'silhouette':
      return (
        <SilhouetteScreen
          profession={a.profession}
          patina={screen.patina}
          showToday={screen.showToday}
          showClosing={screen.showClosing}
          reduced={a.reduced}
          onRestart={a.restart}
        />
      );
    default:
      return null;
  }
}
