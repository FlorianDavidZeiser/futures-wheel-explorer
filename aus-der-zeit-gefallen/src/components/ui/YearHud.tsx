import { motion, useTransform, type MotionValue } from 'framer-motion';

interface YearHudProps {
  value: MotionValue<number>;
  opacity: MotionValue<number>;
  color: MotionValue<string>;
  /** Impuls beim Hochzaehlen, 0 bis 1 bis 0. Macht den Sprung sichtbar. */
  pulse: MotionValue<number>;
  reduced: boolean;
}

// Die durchlaufende Jahreszahl. Das mitlaufende Element der ganzen Reise, an
// fester Stelle oben. Sie glimmt ganz ruhig, und beim Hochzaehlen ein deutlicher
// Impuls, kurz groesser und heller, damit man den Sprung wirklich sieht.
export function YearHud({ value, opacity, color, pulse, reduced }: YearHudProps) {
  const scale = useTransform(pulse, (v) => 1 + v * 0.16);
  const brightness = useTransform(pulse, (v) => `brightness(${(1 + v * 0.75).toFixed(3)})`);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center pt-[3.4vh]"
    >
      <motion.span
        className="font-serif leading-none"
        // Ein ruhiges Glimmen, damit die Zahl lebt, ohne abzulenken.
        animate={reduced ? undefined : { opacity: [1, 0.8, 1] }}
        transition={reduced ? undefined : { duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          color,
          scale,
          filter: brightness,
          transformOrigin: 'center',
          fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
          fontWeight: 300,
          letterSpacing: '0.03em',
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 0 24px color-mix(in srgb, var(--glow) 22%, transparent), 0 2px 40px rgba(0,0,0,0.55)',
        }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
}
