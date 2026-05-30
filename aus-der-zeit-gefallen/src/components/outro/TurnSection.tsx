import { forwardRef } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { useExperience } from '../../state/ExperienceContext';
import { palettes, paletteVars } from '../../styles/palettes';
import { turn, closingLine } from '../../data/content';
import { reveal } from '../../styles/motionPresets';
import { SceneFrame } from '../station/SceneFrame';
import { SilhouetteScene } from '../scenes/SilhouetteScene';

interface TurnSectionProps {
  reduced: boolean;
  /** Wirksame Patina des Bildes, 0 bis 1, an den Scroll-Fortschritt gebunden. */
  patina: MotionValue<number>;
  /** Fortschritt im gepinnten Abschnitt, 0 bis 1. */
  pin: MotionValue<number>;
}

// Die Wendung, der Klappmoment, der wichtigste Teil des Stuecks.
//
// Die fuenfte Station, im exakt gleichen Aufbau und derselben Vitrinengroesse wie
// die historischen. Wo dort der Welt-Einstieg stand, steht hier die Heute-Zeile.
// Wo dort das lebende Bild stand, die leere Silhouette im gleichen Rahmen. Wo dort
// der Berufsname stand, der eigene Beruf in derselben Serif. Ein sehr hoher,
// gepinnter Abschnitt. Erst haelt alles ruhig bei 2026, dann laeuft die Jahreszahl
// in Schritten ueber den Nutzer hinweg, die Patina legt sich, ein Fragezeichen
// blendet ein. Bei 2070 ein Halt, eine Stille, dann die Schlusszeile.
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

  // Das Fragezeichen blendet langsam ein, waehrend die Zeit klettert.
  const markOpacity = useTransform(pin, [0.2, 0.62], [0, 1]);
  // Die Schlusszeile erst nach dem Halt und der Stille bei 2070.
  const closingOpacity = useTransform(pin, [0.9, 0.98], [0, 1]);
  const closingY = useTransform(pin, [0.9, 0.98], [reduced ? 0 : 14, 0]);

  return (
    <div ref={ref} className="relative min-h-[600vh] w-full" style={paletteVars(palettes.today)}>
      <div className="sticky top-0 flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-[8vh]">
        {/* Die fuenfte Station, gleiche Abfolge wie die historischen. Heute-Zeile an
            der Stelle des Welt-Einstiegs, darunter die Bildflaeche, darunter der Beruf. */}
        <motion.div
          variants={reveal(reduced)}
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.3 }}
          className="flex w-full max-w-2xl flex-col items-center"
        >
          <p
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
            {turn.todayLine}
          </p>

          <div className="mt-[8vh] w-full">
            <SceneFrame patina={patina}>
              <SilhouetteScene palette={palettes.today} reduced={reduced} />
            </SceneFrame>
          </div>
        </motion.div>

        <div className="flex w-full max-w-2xl flex-col items-center text-center">
          {/* Der eigene Beruf, in derselben Serif und Groesse wie die historischen. */}
          <motion.h2
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: reduced ? 0.4 : 1.2, ease: 'easeOut' }}
            className="mt-[8vh] font-serif"
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

          {/* Die Stelle der Ablöse-Andeutung. Ein langsam einblendendes Fragezeichen. */}
          <motion.p style={{ opacity: markOpacity, filter: aged }} className="mt-[6vh] font-serif">
            <span
              style={{
                display: 'block',
                color: 'var(--ink-faint)',
                fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
                lineHeight: 1.4,
                fontWeight: 300,
              }}
            >
              {turn.mark}
            </span>
          </motion.p>

          {/* Nach dem Halt und der Stille, die Schlusszeile. */}
          <motion.p style={{ opacity: closingOpacity, y: closingY }}>
            <span
              style={{
                display: 'block',
                color: 'var(--ink-soft)',
                fontSize: 'clamp(1.1rem, 1.9vw, 1.4rem)',
                lineHeight: 1.6,
                fontWeight: 300,
                marginTop: '4vh',
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
