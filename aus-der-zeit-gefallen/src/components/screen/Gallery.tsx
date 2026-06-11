import { motion } from 'framer-motion';
import { palettes } from '../../styles/palettes';
import { stations } from '../../data/content';
import { SceneFrame } from '../station/SceneFrame';
import { LamplighterScene } from '../scenes/LamplighterScene';
import { KnockerUpScene } from '../scenes/KnockerUpScene';
import { SwitchboardScene } from '../scenes/SwitchboardScene';
import { HumanComputerScene } from '../scenes/HumanComputerScene';
import { SilhouetteScene } from '../scenes/SilhouetteScene';
import type { StationId } from '../../data/content';
import type { SceneProps } from '../scenes/sceneTypes';

const sceneFor: Record<StationId, (p: SceneProps) => JSX.Element> = {
  lamplighter: LamplighterScene,
  knockerup: KnockerUpScene,
  switchboard: SwitchboardScene,
  computer: HumanComputerScene,
};

// Die Pointe als Bild. Nach der Schlusszeile reiht sich die eigene Vitrine neben
// die vier verschwundenen, fuenf gleiche, gleich vergilbte Kaesten. Deiner der
// fuenfte. Kein Text sagt es, das Bild zeigt es. Die Miniaturen ruhen still.
export function Gallery({ reduced, profession }: { reduced: boolean; profession: string }) {
  void profession; // Der Beruf ist als hervorgehobene fuenfte Vitrine praesent.

  interface Card {
    key: string;
    year: number;
    scene: JSX.Element;
    you: boolean;
  }

  const cards: Card[] = stations.map((s) => ({
    key: s.id,
    year: s.year,
    scene: (() => {
      const Scene = sceneFor[s.id];
      return <Scene palette={palettes[s.id]} reduced={reduced} active={false} beat={1} />;
    })(),
    you: false,
  }));
  cards.push({
    key: 'you',
    year: 2026,
    scene: <SilhouetteScene palette={palettes.today} reduced={reduced} />,
    you: true,
  });

  return (
    <div className="flex w-full items-end justify-center gap-[1vw] px-1" style={{ maxWidth: '52rem' }}>
      {cards.map((c, i) => (
        <motion.div
          key={c.key}
          className="flex flex-col items-center"
          style={{ width: 'min(15.5vw, 112px)' }}
          initial={{ opacity: 0, y: reduced ? 0 : 14, scale: reduced ? 1 : 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          // Die eigene Vitrine (die fuenfte) zuerst, dann reihen sich die anderen ein.
          transition={{
            duration: reduced ? 0.4 : 1.1,
            ease: 'easeOut',
            delay: reduced ? 0 : c.you ? 0 : 0.5 + i * 0.45,
          }}
        >
          <div
            className="relative w-full"
            style={{
              aspectRatio: '800 / 460',
              boxShadow: c.you ? '0 0 0 1px color-mix(in srgb, var(--glow) 55%, transparent)' : undefined,
              borderRadius: 2,
            }}
          >
            <SceneFrame patina={c.you ? 0.5 : 0.62}>{c.scene}</SceneFrame>
            {/* Die eigene Vitrine, das Fragezeichen als einzige offene Stelle. */}
            {c.you && (
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center font-serif"
                style={{ color: 'var(--glow)', fontSize: 'clamp(1.1rem, 3vw, 1.7rem)', opacity: 0.85 }}
              >
                ?
              </span>
            )}
          </div>
          <span
            className="mt-[1.2svh] font-sans tabular-nums"
            style={{
              color: c.you ? 'var(--glow)' : 'var(--ink-faint)',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              opacity: c.you ? 0.95 : 0.7,
            }}
          >
            {c.year}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
