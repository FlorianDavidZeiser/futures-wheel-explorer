import { motion } from 'framer-motion';
import { palettes, paletteVars } from '../../styles/palettes';
import { stations, type StationId } from '../../data/content';
import { SceneBox } from './SceneBox';
import { LamplighterScene } from '../scenes/LamplighterScene';
import { KnockerUpScene } from '../scenes/KnockerUpScene';
import { SwitchboardScene } from '../scenes/SwitchboardScene';
import { HumanComputerScene } from '../scenes/HumanComputerScene';
import type { SceneProps } from '../scenes/sceneTypes';

const sceneFor: Record<StationId, (p: SceneProps) => JSX.Element> = {
  lamplighter: LamplighterScene,
  knockerup: KnockerUpScene,
  switchboard: SwitchboardScene,
  computer: HumanComputerScene,
};

export type Beat = 'welt' | 'story' | 'nachher';

// Ein Beat einer Station, ein abgeschlossener Screen. Gleiches Layout-Geruest wie
// alle, nur der Inhalt wechselt. Beat 1, Welt-Einstieg, Beat 2, die Geschichte,
// Beat 3, das Nachher. Der Text blendet ruhig ein.
export function StationScreen({
  stationId,
  beat,
  reduced,
}: {
  stationId: StationId;
  beat: Beat;
  reduced: boolean;
}) {
  const station = stations.find((s) => s.id === stationId)!;
  const palette = palettes[stationId];
  const Scene = sceneFor[stationId];

  const showName = beat !== 'welt';
  const body = beat === 'welt' ? station.worldEntry : beat === 'story' ? station.story : station.aftermath;
  const bodyIsWorld = beat === 'welt';

  const fade = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, ease: 'easeOut' } }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.1, ease: [0.22, 0.61, 0.36, 1] as const, delay: 0.25 } };

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center px-6 pt-[15svh] pb-[7svh]"
      style={paletteVars(palette)}
    >
      <SceneBox patina={palette.patinaBase}>
        <Scene palette={palette} reduced={reduced} active />
      </SceneBox>

      <motion.div
        {...fade}
        className="mt-[5svh] flex w-full max-w-2xl flex-col items-center text-center"
        style={{ maxHeight: '40svh', overflowY: 'auto' }}
      >
        {showName && (
          <h2
            className="mb-[2.4svh] font-serif"
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(1.5rem, 3.4vw, 2.25rem)',
              fontWeight: 400,
              letterSpacing: '0.01em',
            }}
          >
            {station.profession}
          </h2>
        )}
        <p
          className="font-serif"
          style={
            bodyIsWorld
              ? {
                  color: 'var(--ink)',
                  fontSize: 'clamp(1.2rem, 2.3vw, 1.7rem)',
                  lineHeight: 1.7,
                  fontWeight: 300,
                  maxWidth: '36rem',
                  textWrap: 'pretty',
                }
              : {
                  color: 'var(--ink-soft)',
                  fontSize: 'clamp(1.02rem, 1.5vw, 1.18rem)',
                  lineHeight: 1.8,
                  fontWeight: 300,
                  maxWidth: '38rem',
                  textWrap: 'pretty',
                }
          }
        >
          {body}
        </p>
      </motion.div>
    </div>
  );
}
