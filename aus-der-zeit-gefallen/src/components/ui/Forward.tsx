import { motion, type MotionValue } from 'framer-motion';

// Ein dezenter Richtungshinweis am Rand. Vorwaerts (rechts) ist leise lebendig,
// ein ruhiger kleiner Zug, der den Blick fuehrt. Zurueck (links) bleibt noch
// dezenter, kaum sichtbar, nur als Moeglichkeit. Bei Reduced Motion statisch.
export function Forward({
  onClick,
  visible,
  color,
  reduced,
  dir = 'next',
}: {
  onClick: () => void;
  visible: boolean;
  color: MotionValue<string>;
  reduced: boolean;
  dir?: 'next' | 'prev';
}) {
  const isNext = dir === 'next';
  const restOpacity = isNext ? 0.5 : 0.26;
  const drift = isNext ? [0, 6, 0] : [0, -4, 0];

  return (
    <motion.button
      aria-label={isNext ? 'weiter' : 'zurück'}
      onClick={onClick}
      initial={false}
      animate={{ opacity: visible ? restOpacity : 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        color,
        pointerEvents: visible ? 'auto' : 'none',
        minWidth: '44px',
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.6rem',
      }}
      className={`fixed top-1/2 z-30 -translate-y-1/2 font-serif ${isNext ? 'right-[1.4vw]' : 'left-[1.4vw]'}`}
    >
      <motion.span
        animate={reduced ? { x: 0 } : { x: drift }}
        transition={reduced ? undefined : { duration: isNext ? 2.6 : 3.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ display: 'inline-block', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1 }}
      >
        {isNext ? '›' : '‹'}
      </motion.span>
    </motion.button>
  );
}
