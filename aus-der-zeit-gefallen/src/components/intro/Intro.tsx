import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useExperience } from '../../state/ExperienceContext';
import { intro } from '../../data/content';
import { sceneVariants } from '../../styles/motionPresets';
import { Button } from '../ui/Button';

// Der Eingang. Aus dem Dunkel glimmt ein warmer Lichtschein auf, dann der Titel,
// dann eine einzige Frage und ein schlichtes Eingabefeld. Die Frage wirkt
// beilaeufig, in Wahrheit ist sie die Saat fuer den Schluss.
export function Intro({ reduced }: { reduced: boolean }) {
  const { dispatch } = useExperience();
  const [value, setValue] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'BEGIN', profession: value });
  };

  return (
    <motion.div
      variants={sceneVariants(reduced)}
      initial="initial"
      animate="enter"
      exit="exit"
      className="relative flex min-h-[80vh] w-full flex-col items-center justify-center px-6 text-center"
    >
      {/* Das warme Aufglimmen einer Gaslaterne. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        initial={{ opacity: 0, scale: reduced ? 1 : 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0.4 : 2.6, ease: 'easeOut', delay: reduced ? 0 : 0.2 }}
        style={{
          width: 'min(70vw, 540px)',
          height: 'min(70vw, 540px)',
          top: '-6%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--glow) 60%, transparent) 0%, transparent 62%)',
          filter: 'blur(8px)',
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.4 : 1.4, ease: 'easeOut', delay: reduced ? 0.1 : 1.5 }}
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

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.4 : 1.2, ease: 'easeOut', delay: reduced ? 0.2 : 2.7 }}
        className="relative mt-12 flex w-full max-w-md flex-col items-center"
      >
        <p
          className="font-serif"
          style={{
            color: 'var(--ink-soft)',
            fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
            lineHeight: 1.6,
            fontWeight: 300,
          }}
        >
          {intro.question}
        </p>

        <form onSubmit={onSubmit} className="mt-7 flex w-full flex-col items-center gap-5">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            aria-label={intro.question}
            className="w-full bg-transparent text-center font-sans"
            style={{
              color: 'var(--ink)',
              fontSize: '1.05rem',
              padding: '0.55rem 0.5rem',
              borderBottom: '1px solid color-mix(in srgb, var(--ink-faint) 50%, transparent)',
              outline: 'none',
            }}
          />
          <Button type="submit" onClick={() => undefined}>
            {intro.start}
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}
