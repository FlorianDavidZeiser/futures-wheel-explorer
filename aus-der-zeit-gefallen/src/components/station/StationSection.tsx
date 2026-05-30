import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { palettes, paletteVars } from '../../styles/palettes';
import { reveal } from '../../styles/motionPresets';
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

// Teilt die Geschichte an einer natuerlichen Satzgrenze in zwei Teile, ohne den
// Wortlaut zu veraendern. Die beiden Teile ergeben zusammengesetzt exakt das
// Original. Geschnitten wird an der Satzgrenze, die der Mitte am naechsten liegt.
function splitStory(story: string): [string, string] {
  const boundaries: number[] = [];
  for (let i = 0; i < story.length - 1; i++) {
    if (story[i] === '.' && story[i + 1] === ' ') boundaries.push(i);
  }
  if (boundaries.length === 0) return [story, ''];
  const mid = story.length / 2;
  let best = boundaries[0];
  for (const b of boundaries) {
    if (Math.abs(b - mid) < Math.abs(best - mid)) best = b;
  }
  return [story.slice(0, best + 1), story.slice(best + 2)];
}

interface StationSectionProps {
  station: StationContent;
  reduced: boolean;
  register: (el: HTMLElement | null) => void;
}

const storyStyle = {
  color: 'var(--ink-soft)',
  fontSize: 'clamp(1.02rem, 1.5vw, 1.18rem)',
  lineHeight: 1.85,
  fontWeight: 300,
  maxWidth: '38rem',
  textWrap: 'pretty',
} as const;

// Eine Station der Reise. Erst der Welt-Einstieg, der den Nutzer sinnlich in die
// Zeit versetzt, dann, beim Weiterscrollen, das lebende Bild, dann der Berufsname,
// dann die Geschichte in zwei ruhigen Schritten. Jede Schicht erscheint fuer sich,
// mit viel Raum dazwischen. Die Szenen-Bewegung startet erst beim Erreichen.
export function StationSection({ station, reduced, register }: StationSectionProps) {
  const palette = palettes[station.id];
  const Scene = sceneFor[station.id];
  const sceneRef = useRef<HTMLDivElement>(null);
  const active = useInView(sceneRef, { amount: 0.35 });
  const [storyA, storyB] = splitStory(station.story);

  useEffect(() => {
    register(sceneRef.current);
    return () => register(null);
  }, [register]);

  return (
    <section
      className="relative flex min-h-[192vh] w-full flex-col items-center px-6 py-[26vh]"
      style={paletteVars(palette)}
    >
      {/* Welt-Einstieg. Erst die Welt, dann der Mensch darin. */}
      <motion.p
        variants={reveal(reduced)}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.7 }}
        className="font-serif"
        style={{
          color: 'var(--ink)',
          fontSize: 'clamp(1.2rem, 2.3vw, 1.7rem)',
          lineHeight: 1.7,
          fontWeight: 300,
          maxWidth: '36rem',
          textAlign: 'center',
          textWrap: 'pretty',
        }}
      >
        {station.worldEntry}
      </motion.p>

      {/* Das lebende Bild. */}
      <motion.div
        ref={sceneRef}
        className="mt-[20vh] w-full max-w-2xl"
        variants={reveal(reduced)}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.4 }}
      >
        <SceneFrame patina={palette.patinaBase}>
          <Scene palette={palette} reduced={reduced} active={active} />
        </SceneFrame>
      </motion.div>

      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <motion.h2
          variants={reveal(reduced, 0.05)}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.8 }}
          className="mt-[12vh] font-serif"
          style={{
            color: 'var(--ink)',
            fontSize: 'clamp(1.5rem, 3.4vw, 2.25rem)',
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          {station.profession}
        </motion.h2>

        {/* Die Geschichte in zwei ruhigen Schritten. */}
        <motion.p
          variants={reveal(reduced)}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-[7vh] font-serif"
          style={storyStyle}
        >
          {storyA}
        </motion.p>

        {storyB && (
          <motion.p
            variants={reveal(reduced)}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, amount: 0.7 }}
            className="mt-[5vh] font-serif"
            style={storyStyle}
          >
            {storyB}
          </motion.p>
        )}
      </div>
    </section>
  );
}
