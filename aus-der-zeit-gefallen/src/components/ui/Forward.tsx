import { motion, type MotionValue } from 'framer-motion';

// Ein dezenter Weiter-Indikator am rechten Rand. Hilft besonders am Desktop und
// macht die Richtung der Reise sichtbar, nach rechts, vorwaerts in der Zeit.
export function Forward({
  onClick,
  visible,
  color,
  reduced,
}: {
  onClick: () => void;
  visible: boolean;
  color: MotionValue<string>;
  reduced: boolean;
}) {
  return (
    <motion.button
      aria-label="weiter"
      onClick={onClick}
      initial={false}
      animate={{ opacity: visible ? 0.5 : 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ color, pointerEvents: visible ? 'auto' : 'none' }}
      className="fixed right-[2.5vw] top-1/2 z-30 -translate-y-1/2 font-serif"
    >
      <motion.span
        animate={reduced ? { x: 0 } : { x: [0, 6, 0] }}
        transition={reduced ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ display: 'inline-block', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1 }}
      >
        ›
      </motion.span>
    </motion.button>
  );
}
