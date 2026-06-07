import { motion } from 'framer-motion';
import { intro } from '../../data/content';
import { palettes, paletteVars } from '../../styles/palettes';

// Screen A, nur die Eroeffnung. Warmes Licht glimmt auf, der Titel, der
// Eroeffnungssatz. Sonst nichts, keine Frage, kein Feld, kein Knopf. Viel Stille,
// dann ein sehr dezenter Hinweis weiterzugehen.
export function IntroA({ reduced, onNext }: { reduced: boolean; onNext: () => void }) {
  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ ...paletteVars(palettes.intro), background: palettes.intro.bgDeep }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        initial={{ opacity: 0, scale: reduced ? 1 : 0.55 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0.5 : 3, ease: 'easeOut', delay: reduced ? 0 : 0.2 }}
        style={{
          width: 'min(78vw, 560px)',
          height: 'min(78vw, 560px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--glow) 52%, transparent) 0%, transparent 62%)',
          filter: 'blur(10px)',
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: reduced ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.5 : 1.8, ease: 'easeOut', delay: reduced ? 0.1 : 1.4 }}
        className="relative font-serif"
        style={{
          color: 'var(--ink)',
          fontSize: 'clamp(2.4rem, 7vw, 4.6rem)',
          fontWeight: 300,
          letterSpacing: '0.005em',
          lineHeight: 1.05,
        }}
      >
        {intro.title}
      </motion.h1>

      {/* Das Eroeffnungszitat, kleiner und kursiv. */}
      <motion.p
        initial={{ opacity: 0, y: reduced ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.5 : 1.6, ease: 'easeOut', delay: reduced ? 0.18 : 2.6 }}
        className="relative mt-5 font-serif italic"
        style={{
          color: 'var(--ink-soft)',
          fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
          fontWeight: 300,
          letterSpacing: '0.01em',
        }}
      >
        {intro.quote}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.5 : 2, ease: 'easeOut', delay: reduced ? 0.3 : 4.2 }}
        className="relative mt-9 font-serif"
        style={{
          color: 'var(--ink-soft)',
          fontSize: 'clamp(1.02rem, 1.7vw, 1.22rem)',
          lineHeight: 1.8,
          fontWeight: 300,
          maxWidth: '34rem',
          textWrap: 'pretty',
        }}
      >
        {intro.lead}
      </motion.p>

      {/* Sehr dezenter Hinweis, selbst weiterzugehen. */}
      <motion.button
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0.5 : 1.6, ease: 'easeOut', delay: reduced ? 0.5 : 6.2 }}
        className="absolute bottom-[7svh] flex flex-col items-center font-sans"
        style={{ color: 'var(--ink-faint)' }}
      >
        <span style={{ fontSize: '0.78rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          {intro.forward}
        </span>
        <motion.span
          aria-hidden
          animate={reduced ? { opacity: 0.5 } : { x: [0, 5, 0] }}
          transition={reduced ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '1.1rem', lineHeight: 1, marginTop: '0.4rem' }}
        >
          ›
        </motion.span>
      </motion.button>
    </div>
  );
}
