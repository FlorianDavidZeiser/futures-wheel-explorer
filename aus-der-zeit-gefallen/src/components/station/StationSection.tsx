import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { palettes } from '../../styles/palettes';
import { reveal } from '../../styles/motionPresets';
import { paletteVars } from '../../styles/palettes';
import type { StationContent, StationId } from '../../data/content';
import { SceneFrame } from './SceneFrame';
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

interface StationSectionProps {
  station: StationContent;
  reduced: boolean;
  /** Meldet die Szene als Stuetzpunkt der Jahreszahl an. */
  register: (el: HTMLElement | null) => void;
}

// Eine Station der Reise. Viel vertikaler Raum, sodass sie fuer sich steht. Beim
// Hereinscrollen erscheint zuerst das lebende Bild, dann der Berufsname, dann,
// beim Weiterscrollen, die Geschichte. Die Szenen-Bewegung startet erst, wenn die
// Station erreicht ist.
export function StationSection({ station, reduced, register }: StationSectionProps) {
  const palette = palettes[station.id];
  const Scene = sceneFor[station.id];
  const sceneRef = useRef<HTMLDivElement>(null);
  const active = useInView(sceneRef, { amount: 0.35 });

  useEffect(() => {
    register(sceneRef.current);
    return () => register(null);
  }, [register]);

  return (
    <section
      className="relative flex min-h-[132vh] w-full flex-col items-center justify-center px-6 py-[14vh]"
      style={paletteVars(palette)}
    >
      <motion.div
        ref={sceneRef}
        className="w-full max-w-2xl"
        variants={reveal(reduced)}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.4 }}
      >
        <SceneFrame patina={palette.patinaBase}>
          <Scene palette={palette} reduced={reduced} active={active} />
        </SceneFrame>
      </motion.div>

      <div className="mt-10 flex w-full max-w-2xl flex-col items-center text-center">
        <motion.h2
          variants={reveal(reduced, 0.05)}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.8 }}
          className="font-serif"
          style={{
            color: 'var(--ink)',
            fontSize: 'clamp(1.5rem, 3.4vw, 2.25rem)',
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          {station.profession}
        </motion.h2>

        <motion.p
          variants={reveal(reduced)}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.55 }}
          className="font-serif"
          style={{
            color: 'var(--ink-soft)',
            fontSize: 'clamp(1.02rem, 1.5vw, 1.18rem)',
            lineHeight: 1.85,
            fontWeight: 300,
            marginTop: '1.6rem',
            maxWidth: '38rem',
            textWrap: 'pretty',
          }}
        >
          {station.story}
        </motion.p>
      </div>
    </section>
  );
}
