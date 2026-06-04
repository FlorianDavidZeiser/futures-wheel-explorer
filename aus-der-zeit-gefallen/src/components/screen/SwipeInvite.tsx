import { motion } from 'framer-motion';
import { intro } from '../../data/content';

// Eine einmalige, dezente Wisch-Einladung beim allerersten Uebergang. Sie macht
// die Vorwaertsbewegung ein, zwei Mal vor und verschwindet dann fuer immer. Bei
// Reduced Motion ein kurzer statischer Hinweis ohne Bewegung.
export function SwipeInvite({ reduced, onDone }: { reduced: boolean; onDone: () => void }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 flex items-end justify-center"
      style={{ paddingBottom: '22svh' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
      transition={{ duration: reduced ? 0.4 : 1.2, ease: 'easeOut', delay: reduced ? 0.3 : 1 }}
    >
      <div
        className="flex items-center gap-3 font-sans"
        style={{ color: 'var(--ink-faint)', letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '0.8rem' }}
      >
        {reduced ? (
          <span>‹ {intro.swipe}</span>
        ) : (
          <motion.div
            className="flex items-center gap-2"
            initial={{ x: 34, opacity: 0 }}
            animate={{ x: [34, -34], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.9, times: [0, 0.2, 0.75, 1], repeat: 1, ease: 'easeInOut', delay: 1.6 }}
            onAnimationComplete={onDone}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>‹</span>
            <span>{intro.swipe}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
