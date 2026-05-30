import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { palettes, paletteVars } from '../../styles/palettes';
import { reveal } from '../../styles/motionPresets';
import { SceneFrame } from '../station/SceneFrame';
import { TodayScene } from '../scenes/TodayScene';

interface TodaySectionProps {
  reduced: boolean;
  register: (el: HTMLElement | null) => void;
}

// Der Schnitt ins Heute. Bewusst gewoehnlich, das kalte Bildschirmlicht. Fuer
// einen Moment der sichere Endpunkt der Reise. Kein Text, nur das Bild und die
// Jahreszahl, die hier bei 2026 steht.
export function TodaySection({ reduced, register }: TodaySectionProps) {
  const palette = palettes.today;
  const sceneRef = useRef<HTMLDivElement>(null);
  const active = useInView(sceneRef, { amount: 0.35 });

  useEffect(() => {
    register(sceneRef.current);
    return () => register(null);
  }, [register]);

  return (
    <section
      className="relative flex min-h-[124vh] w-full flex-col items-center justify-center px-6 py-[14vh]"
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
        <SceneFrame patina={0}>
          <TodayScene palette={palette} reduced={reduced} active={active} />
        </SceneFrame>
      </motion.div>
    </section>
  );
}
