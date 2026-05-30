import { forwardRef } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { useExperience } from '../../state/ExperienceContext';
import { palettes, paletteVars } from '../../styles/palettes';
import { turn, closingLine } from '../../data/content';
import { SceneFrame } from '../station/SceneFrame';
import { SilhouetteScene } from '../scenes/SilhouetteScene';

interface TurnSectionProps {
  reduced: boolean;
  /** Wirksame Patina des Bildes, 0 bis 1, an den Scroll-Fortschritt gebunden. */
  patina: MotionValue<number>;
  /** Fortschritt im gepinnten Abschnitt, 0 bis 1. Steuert den Ausklang. */
  pin: MotionValue<number>;
}

// Die Wendung. Ein hoher, gepinnter Abschnitt. Waehrend der Nutzer scrollt, bleibt
// die Szene stehen und die Zeit dehnt sich, ruhig erst, dann beschleunigend. Die
// Jahreszahl laeuft ueber die Station des Nutzers hinaus, die Patina legt sich
// langsam ueber den eigenen Beruf. Am Ende, nach einer Stille, die Schlusszeile.
export const TurnSection = forwardRef<HTMLDivElement, TurnSectionProps>(function TurnSection(
  { reduced, patina, pin },
  ref
) {
  const { profession } = useExperience();
  const name = profession.trim() || turn.fallbackProfession;

  // Sepiahafte Alterung von Berufsname und Markierung, live an die Patina gebunden.
  const aged = useTransform(patina, (v) => {
    const t = Math.max(0, Math.min(1, v));
    return `sepia(${t.toFixed(3)}) saturate(${(1 - t * 0.35).toFixed(3)}) brightness(${(1 - t * 0.12).toFixed(3)})`;
  });

  const closingOpacity = useTransform(pin, [0.86, 1], [0, 1]);
  const closingY = useTransform(pin, [0.86, 1], [reduced ? 0 : 14, 0]);

  return (
    <div
      ref={ref}
      className="relative min-h-[300vh] w-full"
      style={paletteVars(palettes.today)}
    >
      <div className="sticky top-0 flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-[8vh]">
        <div className="w-full max-w-2xl">
          <SceneFrame patina={patina}>
            <SilhouetteScene palette={palettes.today} reduced={reduced} />
          </SceneFrame>
        </div>

        <div className="mt-10 flex w-full max-w-2xl flex-col items-center text-center">
          <motion.h2
            className="font-serif"
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(1.5rem, 3.4vw, 2.25rem)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              filter: aged,
            }}
          >
            {name}
          </motion.h2>

          {/* Die Stelle, wo bei den anderen die Andeutung stand. Nur ein Fragezeichen. */}
          <motion.p
            className="font-serif"
            style={{
              color: 'var(--ink-faint)',
              fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
              lineHeight: 1.6,
              fontWeight: 300,
              marginTop: '1.6rem',
              filter: aged,
            }}
          >
            {turn.mark}
          </motion.p>

          {/* Nach der Stille, am Ende des gepinnten Abschnitts, die Schlusszeile. */}
          <motion.p
            style={{ opacity: closingOpacity, y: closingY }}
            className="font-serif"
            >
            <span
              style={{
                display: 'block',
                color: 'var(--ink-soft)',
                fontSize: 'clamp(1.1rem, 1.9vw, 1.4rem)',
                lineHeight: 1.6,
                fontWeight: 300,
                marginTop: '3.5rem',
                maxWidth: '34rem',
                textWrap: 'pretty',
              }}
            >
              {closingLine}
            </span>
          </motion.p>
        </div>
      </div>
    </div>
  );
});
