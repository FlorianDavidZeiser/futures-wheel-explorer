import { motion, AnimatePresence, useTransform, type MotionValue } from 'framer-motion';
import type { CSSProperties } from 'react';
import { palettes, paletteVars } from '../../styles/palettes';
import { stations, turn, closingLine, outroActions, headings, type StationId } from '../../data/content';
import { SceneBox } from './SceneBox';
import { LamplighterScene } from '../scenes/LamplighterScene';
import { KnockerUpScene } from '../scenes/KnockerUpScene';
import { SwitchboardScene } from '../scenes/SwitchboardScene';
import { HumanComputerScene } from '../scenes/HumanComputerScene';
import { SilhouetteScene } from '../scenes/SilhouetteScene';
import type { SceneProps } from '../scenes/sceneTypes';
import { IntroA } from './IntroA';
import { IntroB } from './IntroB';
import { Button } from '../ui/Button';
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

const worldStyle: CSSProperties = {
  color: 'var(--ink)',
  fontSize: 'clamp(1.2rem, 2.3vw, 1.7rem)',
  lineHeight: 1.7,
  fontWeight: 300,
  maxWidth: '36rem',
  textWrap: 'pretty',
};

const proseStyle: CSSProperties = {
  color: 'var(--ink-soft)',
  fontSize: 'clamp(1.02rem, 1.5vw, 1.18rem)',
  lineHeight: 1.8,
  fontWeight: 300,
  maxWidth: '38rem',
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
  /** Live mitlaufende Patina des Schluss-Laufs. Treibt Bild, Beruf und Fragezeichen. */
  heutePatina: MotionValue<number>;
  /** Der Schluss-Lauf ist fertig, die Schlusszeile darf erscheinen. */
  runDone: boolean;
}

// Eine Unit, ein Ort. Szene, Jahreszahl und Farbe bleiben, waehrend sich die Beats
// im Textbereich an Ort und Stelle abloesen. Die Ueberschrift wandert mit und
// erzaehlt den Dreischritt, Welt, Mensch, Wandel.
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
}: UnitViewProps) {
  // Aging von Beruf und Fragezeichen, live an die Schluss-Patina gebunden.
  const agedFilter = useTransform(heutePatina, (v) => {
    const t = Math.max(0, Math.min(1, v));
    return `sepia(${t.toFixed(3)}) saturate(${(1 - t * 0.35).toFixed(3)}) brightness(${(1 - t * 0.12).toFixed(3)})`;
  });
  const markOpacity = useTransform(heutePatina, (v) => 0.2 + 0.8 * Math.max(0, Math.min(1, v)));

  if (unit.kind === 'introA') return <IntroA reduced={reduced} onNext={onNext} />;
  if (unit.kind === 'introB') {
    return <IntroB reduced={reduced} profession={profession} setProfession={setProfession} onNext={onNext} />;
  }

  const isStation = unit.kind === 'station';
  const isHeute = !isStation;
  const palette = isStation ? palettes[unit.stationId!] : palettes.today;
  const station = isStation ? stations.find((s) => s.id === unit.stationId)! : null;
  const name = profession.trim() || turn.fallbackProfession;

  // Szene der Unit, ueber die Beats konstant. Die Station altert intern bei Beat 2.
  const scene = isStation ? (
    (() => {
      const Scene = sceneFor[unit.stationId!];
      return <Scene palette={palette} reduced={reduced} active beat={beat} />;
    })()
  ) : (
    <SilhouetteScene palette={palette} reduced={reduced} />
  );

  // Patina des Bildes: bei Stationen fest, im Heute live aus dem Schluss-Lauf.
  const scenePatina = isHeute ? heutePatina : unit.patina;

  // Die mitwandernde Ueberschrift und der Koerpertext je Beat.
  let heading = '';
  let body = '';
  if (isStation) {
    heading = beat === 0 ? `${station!.place}, ${unit.year}` : beat === 1 ? station!.profession : headings.change;
    body = beat === 0 ? station!.worldEntry : beat === 1 ? station!.story : station!.aftermath;
  } else {
    heading = beat === 0 ? headings.today : name;
    body = beat === 0 ? turn.todayLine : '';
  }
  const headingAges = isHeute && beat === 2;
  const bodyIsWorld = beat === 0;
  const markVisible = isHeute && beat === 2;

  const small = reduced
    ? { duration: 0.3, ease: 'easeOut' as const }
    : { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const };

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center px-6 pt-[12svh] pb-[7svh]"
      style={paletteVars(palette)}
    >
      <SceneBox patina={scenePatina}>{scene}</SceneBox>

      <div
        className="no-scrollbar mt-[4svh] flex w-full max-w-2xl flex-col items-center text-center"
        data-scroll
        style={{ maxHeight: '44svh', overflowY: 'auto' }}
      >
        {/* Ueberschrift und Koerpertext loesen sich gemeinsam ab (kleiner Uebergang). */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${unit.key}-${beat}`}
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -6 }}
            transition={small}
            className="flex w-full flex-col items-center"
          >
            <motion.h2
              className="mb-[2.4svh] font-serif"
              style={{ ...headingStyle, filter: headingAges ? agedFilter : undefined }}
            >
              {heading}
            </motion.h2>
            {body && (
              <p className="font-serif" style={bodyIsWorld ? worldStyle : proseStyle}>
                {body}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Die Nachher-Stelle der Heute-Station, ein langsam einblendendes Fragezeichen. */}
        {markVisible && (
          <motion.span
            className="mt-[2.6svh] font-serif"
            style={{
              color: 'var(--ink-faint)',
              fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
              lineHeight: 1.4,
              fontWeight: 300,
              opacity: markOpacity,
              filter: agedFilter,
            }}
          >
            {turn.mark}
          </motion.span>
        )}

        {/* Der Klappmoment ist der Schlusspunkt. Nach 2070 die Schlusszeile, dann
            sehr dezent nur die Moeglichkeit, noch einmal zu beginnen. */}
        {runDone && (
          <>
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.4 : 2.4, ease: 'easeOut' }}
              className="mt-[4svh] font-serif"
              style={{
                color: 'var(--ink-soft)',
                fontSize: 'clamp(1.1rem, 1.9vw, 1.4rem)',
                lineHeight: 1.6,
                fontWeight: 300,
                maxWidth: '34rem',
                textWrap: 'pretty',
              }}
            >
              {closingLine}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0.4 : 1.6, ease: 'easeOut', delay: reduced ? 0.5 : 2.4 }}
              className="mt-[5svh]"
            >
              <Button variant="ghost" onClick={onRestart}>
                {outroActions.again}
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
