import { motion, type MotionValue } from 'framer-motion';

interface YearHudProps {
  value: MotionValue<number>;
  opacity: MotionValue<number>;
  color: MotionValue<string>;
}

// Die durchlaufende Jahreszahl. Das mitlaufende Element der ganzen Reise, an
// fester Stelle oben, immer sichtbar, sobald der Vorhang sich gehoben hat. Sie
// klettert mit dem Scrollen, die koerperliche Erfahrung vergehender Zeit.
export function YearHud({ value, opacity, color }: YearHudProps) {
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
