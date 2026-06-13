import { motion, useTransform, type MotionValue } from 'framer-motion';

interface YearHudProps {
  value: MotionValue<number>;
  opacity: MotionValue<number>;
  color: MotionValue<string>;
  /** Impuls beim Hochzaehlen, 0 bis 1 bis 0. Macht den Sprung sichtbar. */
  pulse: MotionValue<number>;
}

// Die durchlaufende Jahreszahl. Das mitlaufende Element der ganzen Reise, an
// fester Stelle oben, immer sichtbar, sobald der Vorhang sich gehoben hat. Beim
// Hochzaehlen ein dezenter Impuls, kurz groesser und heller, damit man den Sprung
// wirklich sieht.
export function YearHud({ value, opacity, color, pulse }: YearHudProps) {
  const scale = useTransform(pulse, (v) => 1 + v * 0.12);
  const brightness = useTransform(pulse, (v) => `brightness(${(1 + v * 0.55).toFixed(3)})`);

  return (
    <motion.div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center pt-[3.4vh]"
    >
      <motion.span
        className="font-serif leading-none"
        style={{
          color,
          scale,
          filter: brightness,
          transformOrigin: 'center',
          fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
          fontWeight: 300,
          letterSpacing: '0.03em',
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 2px 40px rgba(0,0,0,0.55)',
        }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
}
