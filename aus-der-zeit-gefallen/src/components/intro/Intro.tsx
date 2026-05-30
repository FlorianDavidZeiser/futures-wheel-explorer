import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useExperience } from '../../state/ExperienceContext';
import { intro } from '../../data/content';
import { palettes, paletteVars } from '../../styles/palettes';
import { Button } from '../ui/Button';

// Der Eingang, der Vorhang, der sich hebt. Aus dem Dunkel glimmt das warme Licht
// auf, dann der Titel, dann zwei, drei ruhige Saetze, dann die Frage. Er laesst
// sich Zeit. Danach beginnt die Scroll-Reise.
export function Intro({ reduced, onBegin }: { reduced: boolean; onBegin: () => void }) {
  const { setProfession } = useExperience();
  const [value, setValue] = useState('');

  const begin = () => {
    setProfession(value);
    onBegin();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    begin();
  };

  // Zeitliche Taktung des sich hebenden Vorhangs.
  const t = reduced
    ? { glow: 0, title: 0.1, lead: 0.25, ask: 0.45 }
    : { glow: 0.2, title: 1.8, lead: 3.2, ask: 5.0 };

  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ ...paletteVars(palettes.intro), background: palettes.intro.bgDeep }}
    >
      {/* Das warme Aufglimmen einer Gaslaterne. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        initial={{ opacity: 0, scale: reduced ? 1 : 0.55 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0.5 : 3, ease: 'easeOut', delay: t.glow }}
        style={{
          width: 'min(78vw, 560px)',
          height: 'min(78vw, 560px)',
          top: '12%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--glow) 55%, transparent) 0%, transparent 62%)',
          filter: 'blur(10px)',
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: reduced ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.5 : 1.8, ease: 'easeOut', delay: t.title }}
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

      <motion.p
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.5 : 2, ease: 'easeOut', delay: t.lead }}
        className="relative mt-8 font-serif"
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

      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.5 : 1.6, ease: 'easeOut', delay: t.ask }}
        className="relative mt-16 flex w-full max-w-md flex-col items-center"
      >
        <p
          className="font-serif"
          style={{ color: 'var(--ink-soft)', fontSize: '1.02rem', lineHeight: 1.6, fontWeight: 300 }}
        >
          {intro.question}
        </p>

        <form onSubmit={onSubmit} className="mt-7 flex w-full flex-col items-center gap-6">
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
          <Button type="submit" onClick={begin}>
            {intro.start}
          </Button>
        </form>
      </motion.div>

      {/* Ein leiser Hinweis, dass es nach unten weitergeht. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[5vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduced ? 0.4 : [0.2, 0.5, 0.2] }}
        transition={
          reduced
            ? { duration: 0.5, delay: t.ask }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: t.ask + 1 }
        }
        style={{ color: 'var(--ink-faint)', fontSize: '1.3rem', lineHeight: 1 }}
      >
        ↓
      </motion.div>
    </section>
  );
}
