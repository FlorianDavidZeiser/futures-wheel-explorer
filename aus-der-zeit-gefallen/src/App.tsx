import { Fragment, useCallback, useMemo, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import { useExperience } from './state/ExperienceContext';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { useScrollTimeline } from './hooks/useScrollTimeline';
import { ARC_YEARS, arcStops } from './styles/palettes';
import { stations, today } from './data/content';
import { YearHud } from './components/ui/YearHud';
import { Spacer } from './components/ui/Spacer';
import { Intro } from './components/intro/Intro';
import { StationSection } from './components/station/StationSection';
import { TodaySection } from './components/today/TodaySection';
import { TurnSection } from './components/outro/TurnSection';
import { OutroSection } from './components/outro/OutroSection';

// Die Buehne. Sie traegt den scroll-getriebenen Temperaturbogen und die
// durchlaufende Jahreszahl ueber der durchgehenden, vertikalen Reise und ordnet
// den linearen Ablauf.
export function App() {
  const { runKey } = useExperience();
  const reduced = usePrefersReducedMotion();

  // Jahre der Stuetzpunkte, in DOM-Reihenfolge, vier Stationen und das Heute.
  const waypointYears = useMemo(() => [...stations.map((s) => s.year), today.year], []);

  // Geteilte, scroll-getriebene Werte. Nur MotionValues, kein React-Neurender.
  const yearMV = useMotionValue(stations[0].year);
  const yearRounded = useTransform(yearMV, (v) => Math.round(v));
  const patinaMV = useMotionValue(0);
  const pinMV = useMotionValue(0);
  const hudOpacity = useMotionValue(0);

  // Der Temperaturbogen, an die Jahreszahl gebunden, kuehlt mit dem Scrollen ab.
  const bg = useTransform(yearMV, ARC_YEARS, arcStops('bg'), { clamp: true });
  const bgDeep = useTransform(yearMV, ARC_YEARS, arcStops('bgDeep'), { clamp: true });
  const ink = useTransform(yearMV, ARC_YEARS, arcStops('ink'), { clamp: true });
  const background = useMotionTemplate`linear-gradient(180deg, ${bg} 0%, ${bgDeep} 100%)`;

  const waypointRefs = useRef<(HTMLElement | null)[]>([]);
  const turnRef = useRef<HTMLDivElement>(null);

  // Stabile Anmelder je Stuetzpunkt, damit sich die Szenen sauber eintragen.
  const registrars = useMemo(
    () => waypointYears.map((_, i) => (el: HTMLElement | null) => {
      waypointRefs.current[i] = el;
    }),
    [waypointYears]
  );

  useScrollTimeline({
    yearMV,
    patinaMV,
    pinMV,
    hudOpacity,
    waypointRefs,
    years: waypointYears,
    turnRef,
    runKey,
  });

  const handleBegin = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: window.innerHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [reduced]);

  return (
    <>
      {/* Der feste Temperaturbogen hinter der ganzen Reise. */}
      <motion.div aria-hidden className="fixed inset-0 -z-10" style={{ background }} />

      <YearHud value={yearRounded} opacity={hudOpacity} color={ink} />

      <div key={runKey}>
        <Intro reduced={reduced} onBegin={handleBegin} />

        {/* Ein erster Atemzug, bevor die Reise beginnt. */}
        <Spacer height="62vh" />

        {stations.map((s, i) => (
          <Fragment key={s.id}>
            <StationSection station={s} reduced={reduced} register={registrars[i]} />
            {/* Atemzug zwischen den Zeiten, nur die hochlaufende Jahreszahl. */}
            <Spacer height="60vh" />
          </Fragment>
        ))}

        <TodaySection reduced={reduced} register={registrars[stations.length]} />

        <Spacer height="48vh" />

        <TurnSection ref={turnRef} reduced={reduced} patina={patinaMV} pin={pinMV} />

        <OutroSection reduced={reduced} />
      </div>
    </>
  );
}
