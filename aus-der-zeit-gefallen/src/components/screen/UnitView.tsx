import { motion, AnimatePresence } from 'framer-motion';
import type { CSSProperties } from 'react';
import { palettes, paletteVars } from '../../styles/palettes';
import { stations, turn, closingLine, outroActions, type StationId } from '../../data/content';
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
}

// Eine Unit, ein Ort. Szene, Jahreszahl und Farbtemperatur bleiben, waehrend sich
// die Beats im Textbereich an Ort und Stelle abloesen (kleiner Uebergang).
export function UnitView({ unit, beat, reduced, profession, setProfession, onNext, onRestart }: UnitViewProps) {
  if (unit.kind === 'introA') return <IntroA reduced={reduced} onNext={onNext} />;
  if (unit.kind === 'introB') {
    return <IntroB reduced={reduced} profession={profession} setProfession={setProfession} onNext={onNext} />;
  }

  const isStation = unit.kind === 'station';
  const palette = isStation ? palettes[unit.stationId!] : palettes.today;

  // Szene der Unit, ueber die Beats konstant.
  const scene = isStation ? (
    (() => {
      const Scene = sceneFor[unit.stationId!];
      return <Scene palette={palette} reduced={reduced} active />;
    })()
  ) : (
    <SilhouetteScene palette={palette} reduced={reduced} />
  );

  // Name, Koerpertext und Markierung je Beat.
  const station = isStation ? stations.find((s) => s.id === unit.stationId)! : null;
  const name = isStation ? station!.profession : profession.trim() || turn.fallbackProfession;

  let body = '';
  if (isStation) body = beat === 0 ? station!.worldEntry : beat === 1 ? station!.story : station!.aftermath;
  else if (unit.isHeute) body = beat === 0 ? turn.todayLine : '';

  const bodyIsWorld = beat === 0; // Welt-Einstieg bzw. Heute-Zeile groesser gesetzt.

  // Sichtbarkeiten, abhaengig vom Beat.
  const nameVisible = isStation ? beat >= 1 : unit.isHeute ? beat >= 1 : true;
  const markVisible = isStation ? false : unit.isHeute ? beat >= 2 : true;

  const t = Math.max(0, Math.min(1, unit.patina));
  const aged = isStation
    ? undefined
    : `sepia(${t.toFixed(3)}) saturate(${(1 - t * 0.35).toFixed(3)}) brightness(${(1 - t * 0.12).toFixed(3)})`;
  const markOpacity = isStation ? 0 : 0.2 + 0.8 * t;

  const small = reduced ? { duration: 0.3, ease: 'easeOut' as const } : { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const };

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center px-6 pt-[15svh] pb-[7svh]"
      style={paletteVars(palette)}
    >
      <SceneBox patina={unit.patina}>{scene}</SceneBox>

      <div
        className="mt-[5svh] flex w-full max-w-2xl flex-col items-center text-center"
        style={{ maxHeight: '40svh', overflowY: 'auto' }}
      >
        <motion.h2
          initial={false}
          animate={{ opacity: nameVisible ? 1 : 0 }}
          transition={small}
          className="mb-[2.4svh] font-serif"
          style={{
            color: 'var(--ink)',
            fontSize: 'clamp(1.5rem, 3.4vw, 2.25rem)',
            fontWeight: 400,
            letterSpacing: '0.01em',
            filter: aged,
            minHeight: '1.2em',
          }}
        >
          {name}
        </motion.h2>

        <div className="flex min-h-[6svh] w-full items-start justify-center">
          <AnimatePresence mode="wait">
            {body ? (
              <motion.p
                key={`${unit.key}-${beat}`}
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                transition={small}
                className="font-serif"
                style={bodyIsWorld ? worldStyle : proseStyle}
              >
                {body}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        <motion.span
          initial={false}
          animate={{ opacity: markVisible ? markOpacity : 0 }}
          transition={small}
          className="mt-[2svh] font-serif"
          style={{
            color: 'var(--ink-faint)',
            fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
            lineHeight: 1.4,
            fontWeight: 300,
            filter: aged,
          }}
        >
          {turn.mark}
        </motion.span>

        {unit.showClosing && (
          <>
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.4 : 2.4, ease: 'easeOut', delay: reduced ? 0.3 : 1.4 }}
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
              transition={{ duration: reduced ? 0.4 : 1.6, ease: 'easeOut', delay: reduced ? 0.6 : 4.6 }}
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
