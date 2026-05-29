import { useEffect } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  type MotionStyle,
} from 'framer-motion';
import { useExperience } from './state/ExperienceContext';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { palettes, type LookId, type Palette } from './styles/palettes';
import { stations } from './data/content';
import { YearDisplay } from './components/station/YearDisplay';
import { Intro } from './components/intro/Intro';
import { Station } from './components/station/Station';
import { Today } from './components/today/Today';
import { Finale } from './components/outro/Finale';

// Waehlt die Palette des Temperaturbogens nach Phase und Station.
function lookFor(phase: string, step: number): LookId {
  if (phase === 'intro') return 'intro';
  if (phase === 'stations') return stations[step].id;
  return 'today'; // today, turn, outro tragen das kalte Heute, die Patina altert es.
}

const FIELDS = ['bg', 'bgDeep', 'ink', 'inkSoft', 'inkFaint', 'glow', 'accent', 'accentSoft'] as const;

// Die Buehne. Sie haelt den Temperaturbogen und die durchlaufende Jahreszahl, die
// beide ueber den crossfadenden Szenen liegen, und ordnet den linearen Ablauf.
export function App() {
  const { state } = useExperience();
  const reduced = usePrefersReducedMotion();
  const palette = palettes[lookFor(state.phase, state.step)];

  // Geteilte Jahreszahl, gemeinsam fuer das Hochzaehlen an den Stationen und das
  // Hochlaufen in der Wendung.
  const yearMotion = useMotionValue(stations[0].year);
  const yearRounded = useTransform(yearMotion, (v) => Math.round(v));

  // Farbwerte des Temperaturbogens als animierte MotionValues.
  const bg = useMotionValue(palettes.intro.bg);
  const bgDeep = useMotionValue(palettes.intro.bgDeep);
  const ink = useMotionValue(palettes.intro.ink);
  const inkSoft = useMotionValue(palettes.intro.inkSoft);
  const inkFaint = useMotionValue(palettes.intro.inkFaint);
  const glow = useMotionValue(palettes.intro.glow);
  const accent = useMotionValue(palettes.intro.accent);
  const accentSoft = useMotionValue(palettes.intro.accentSoft);
  const mvByField = { bg, bgDeep, ink, inkSoft, inkFaint, glow, accent, accentSoft };

  // Der Temperaturbogen kuehlt ruhig von Station zu Station ab.
  useEffect(() => {
    const duration = reduced ? 0 : 1.6;
    const controls = FIELDS.map((f) =>
      animate(mvByField[f], palette[f as keyof Palette] as string, { duration, ease: 'easeInOut' })
    );
    return () => controls.forEach((c) => c.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palette, reduced]);

  // Das Hochzaehlen der Jahreszahl an den Stationen und im Heute. Die Wendung
  // treibt die Jahreszahl selbst, deshalb ruht die Buehne dort.
  useEffect(() => {
    if (state.phase === 'intro') {
      yearMotion.set(stations[0].year);
      return;
    }
    if (state.phase === 'turn' || state.phase === 'outro') return;
    const controls = animate(yearMotion, state.currentYear, {
      duration: reduced ? 0 : 1.6,
      ease: 'easeOut',
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase, state.currentYear, reduced]);

  const background = useMotionTemplate`linear-gradient(180deg, ${bg} 0%, ${bgDeep} 100%)`;

  // Custom Properties als MotionValues, damit der Temperaturbogen auch die
  // Textfarben weich mitfaerbt. MotionStyle kennt die CSS-Variablen-Schluessel
  // nicht im Typ, daher der bewusste Cast an der Anwendungsstelle.
  const rootStyle = {
    background,
    '--bg': bg,
    '--bg-deep': bgDeep,
    '--ink': ink,
    '--ink-soft': inkSoft,
    '--ink-faint': inkFaint,
    '--glow': glow,
    '--accent': accent,
    '--accent-soft': accentSoft,
  };

  const yearVisible = state.phase !== 'intro';

  return (
    <motion.main style={rootStyle as unknown as MotionStyle} className="relative min-h-screen w-full">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-6 pb-24 pt-[8vh]">
        {/* Die durchlaufende Jahreszahl, ueber den Szenen, an fester Stelle. */}
        <motion.div
          className="mb-10 flex justify-center"
          initial={false}
          animate={{ opacity: yearVisible ? 1 : 0 }}
          transition={{ duration: reduced ? 0.2 : 1, ease: 'easeOut' }}
        >
          <YearDisplay value={yearRounded} />
        </motion.div>

        <div className="relative flex w-full flex-1 items-start justify-center">
          <AnimatePresence mode="wait">{renderScene()}</AnimatePresence>
        </div>
      </div>
    </motion.main>
  );

  function renderScene() {
    switch (state.phase) {
      case 'intro':
        return <Intro key="intro" reduced={reduced} />;
      case 'stations':
        return <Station key={`station-${state.step}`} step={state.step} reduced={reduced} />;
      case 'today':
        return <Today key="today" reduced={reduced} />;
      case 'turn':
      case 'outro':
        return <Finale key="finale" yearMotion={yearMotion} reduced={reduced} />;
      default:
        return null;
    }
  }
}
