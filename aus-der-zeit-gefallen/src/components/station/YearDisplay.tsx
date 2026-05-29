import { motion, type MotionValue } from 'framer-motion';

// Die Jahreszahl. Das durchlaufende Element des ganzen Stuecks, immer an
// derselben Stelle, gross, ruhig, in der Serif. Sie ist an einen geteilten
// MotionValue gebunden und zaehlt ohne React-Neurender hoch.
interface YearDisplayProps {
  value: MotionValue<number>;
}

export function YearDisplay({ value }: YearDisplayProps) {
  return (
    <div
      className="select-none font-serif leading-none"
      style={{
        color: 'var(--ink)',
        fontSize: 'clamp(3.2rem, 9vw, 6rem)',
        fontWeight: 300,
        letterSpacing: '0.01em',
        fontVariantNumeric: 'tabular-nums',
      }}
      aria-hidden
    >
      <motion.span>{value}</motion.span>
    </div>
  );
}
