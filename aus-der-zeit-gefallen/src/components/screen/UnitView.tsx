import { motion, AnimatePresence, type MotionValue } from 'framer-motion';
import type { CSSProperties } from 'react';
import { palettes, paletteVars } from '../../styles/palettes';
import { stations, headings, type StationId } from '../../data/content';
import { SceneBox } from './SceneBox';
import { ScrollText } from '../ui/ScrollText';
import { LamplighterScene } from '../scenes/LamplighterScene';
import { KnockerUpScene } from '../scenes/KnockerUpScene';
import { SwitchboardScene } from '../scenes/SwitchboardScene';
import { HumanComputerScene } from '../scenes/HumanComputerScene';
import type { SceneProps } from '../scenes/sceneTypes';
import { IntroA } from './IntroA';
import { IntroB } from './IntroB';
import { Finale } from './Finale';
import type { Unit } from '../../units';

const sceneFor: Record<StationId, (p: SceneProps) => JSX.Element> = {
  lamplighter: LamplighterScene,
  knockerup: KnockerUpScene,
  switchboard: SwitchboardScene,
  computer: HumanComputerScene,
};

const headingStyle: CSSProperties = {
  color: 'var(--ink)',
  fontSize: 'clamp(1.5rem, 3.4vw, 2.25rem)',
  fontWeight: 400,
  letterSpacing: '0.01em',
};

// Welt-Einstieg und Geschichte liegen nah beieinander, der Groessensprung ist weg.
// Der Einstieg ist nur eine Spur groesser und heller, die Geschichte gut lesbar.
const worldStyle: CSSProperties = {
  color: 'var(--ink)',
  fontSize: 'clamp(1.1rem, 1.8vw, 1.34rem)',
  lineHeight: 1.7,
  fontWeight: 300,
  maxWidth: '34rem',
  textWrap: 'pretty',
};

const proseStyle: CSSProperties = {
  color: 'var(--ink-soft)',
  fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
  lineHeight: 1.72,
  fontWeight: 300,
  maxWidth: '36rem',
  textWrap: 'pretty',
};

interface UnitViewProps {
  unit: Unit;
  beat: number;
  reduced: boolean;
  profession: string;
  setProfession: (v: string) => void;
  onNext: () => void;
  onRestart: () => void;
  heutePatina: MotionValue<number>;
  runDone: boolean;
  onEpilog: (active: boolean) => void;
}

// Eine Unit, ein Ort. Die Ueberschrift wandert mit und erzaehlt den Dreischritt,
// Welt, Mensch, Wandel. Intro und Schluss haben eigene Komponenten.
export function UnitView({
  unit,
  beat,
  reduced,
  profession,
  setProfession,
  onNext,
  onRestart,
  heutePatina,
  runDone,
  onEpilog,
}: UnitViewProps) {
  if (unit.kind === 'introA') return <IntroA reduced={reduced} onNext={onNext} />;
  if (unit.kind === 'introB') {
    return <IntroB reduced={reduced} profession={profession} setProfession={setProfession} onNext={onNext} />;
  }
  if (unit.isHeute) {
    return (
      <Finale
        reduced={reduced}
        profession={profession}
        stage={beat}
        heutePatina={heutePatina}
        runDone={runDone}
        onRestart={onRestart}
        onEpilog={onEpilog}
      />
    );
  }

  // Historische Station.
  const palette = palettes[unit.stationId!];
  const station = stations.find((s) => s.id === unit.stationId)!;
  const Scene = sceneFor[unit.stationId!];

  const heading = beat === 0 ? `${station.place}, ${unit.year}` : beat === 1 ? station.profession : headings.change;
  const body = beat === 0 ? station.worldEntry : beat === 1 ? station.story : station.aftermath;
  const bodyIsWorld = beat === 0;

  const small = reduced
    ? { duration: 0.3, ease: 'easeOut' as const }
    : { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const };

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-start px-6 pt-[12svh] pb-[6svh]"
      style={paletteVars(palette)}
    >
      <SceneBox patina={unit.patina}>
        <Scene palette={palette} reduced={reduced} active beat={beat} />
      </SceneBox>

      <div className="mt-[3svh] w-full max-w-2xl">
        <ScrollText maxHeight="50svh">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${unit.key}-${beat}`}
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -6 }}
              transition={small}
              className="flex w-full flex-col items-center text-center"
            >
              <h2 className="mb-[2.4svh] font-serif" style={headingStyle}>
                {heading}
              </h2>
              <p className="font-serif" style={bodyIsWorld ? worldStyle : proseStyle}>
                {body}
              </p>
            </motion.div>
          </AnimatePresence>
        </ScrollText>
      </div>
    </div>
  );
}
