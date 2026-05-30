import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useExperience } from '../../state/ExperienceContext';
import { intro } from '../../data/content';
import { palettes, paletteVars } from '../../styles/palettes';
import { Button } from '../ui/Button';

// Der Eingang, der Vorhang, der sich hebt. Zwei strikt getrennte Screens.
//
// Screen A zeigt nur Titel und Eroeffnungssatz, sonst nichts. Erst nach einem
// dezenten Schritt erscheint Screen B mit der Frage. Beide sind nie gleichzeitig
// sichtbar, damit der Nutzer den Eroeffnungssatz nicht sofort mit der Frage nach
// dem eigenen Beruf verknuepft und die Pointe vorab durchschaut.
type Step = 'a' | 'b';

export function Intro({ reduced }: { reduced: boolean }) {
  const { setProfession, setStarted } = useExperience();
  const [step, setStep] = useState<Step>('a');
  const [value, setValue] = useState('');

  const begin = () => {
    setProfession(value);
    setStarted(true);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    begin();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden px-6 text-center"
      style={{ ...paletteVars(palettes.intro), background: palettes.intro.bgDeep }}
    >
      {/* Das warme Aufglimmen einer Gaslaterne, ueber beide Screens hinweg ruhig. */}
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

      <AnimatePresence mode="wait">
        {step === 'a' ? (
          <motion.div
            key="screen-a"
            className="relative flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: reduced ? 0.2 : 0.8, ease: 'easeOut' } }}
          >
            <motion.h1
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.5 : 1.8, ease: 'easeOut', delay: reduced ? 0.1 : 1.5 }}
              className="font-serif"
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
              transition={{ duration: reduced ? 0.5 : 2, ease: 'easeOut', delay: reduced ? 0.25 : 3.2 }}
              className="mt-8 font-serif"
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

            {/* Erst nach einer Stille der eine, sehr dezente Hinweis weiterzugehen. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0.5 : 1.6, ease: 'easeOut', delay: reduced ? 0.5 : 5.4 }}
              className="mt-16 flex flex-col items-center"
            >
              <Button variant="ghost" onClick={() => setStep('b')}>
                {intro.forward}
              </Button>
              <motion.span
                aria-hidden
                animate={reduced ? { opacity: 0.4 } : { opacity: [0.25, 0.55, 0.25] }}
                transition={reduced ? undefined : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ color: 'var(--ink-faint)', fontSize: '1.2rem', lineHeight: 1, marginTop: '0.6rem' }}
              >
                ↓
              </motion.span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="screen-b"
            className="relative flex w-full max-w-md flex-col items-center"
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: reduced ? 0.3 : 1.2, ease: 'easeOut', delay: reduced ? 0 : 0.3 } }}
            exit={{ opacity: 0, transition: { duration: reduced ? 0.2 : 0.6, ease: 'easeOut' } }}
          >
            <p
              className="font-serif"
              style={{ color: 'var(--ink-soft)', fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', lineHeight: 1.6, fontWeight: 300 }}
            >
              {intro.question}
            </p>

            <form onSubmit={onSubmit} className="mt-8 flex w-full flex-col items-center gap-6">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                autoFocus={!reduced}
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
        )}
      </AnimatePresence>
    </div>
  );
}
