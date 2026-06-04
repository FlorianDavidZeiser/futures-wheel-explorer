import { type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { intro } from '../../data/content';
import { palettes, paletteVars } from '../../styles/palettes';
import { Button } from '../ui/Button';

// Screen B, nur die Frage. Eigener Screen, nie gleichzeitig mit A. Das Eingabefeld
// schreibt direkt in den Zustand, sodass jedes Vorwaertsgehen, Knopf, Wisch oder
// Taste, den eingegebenen Beruf uebernimmt.
export function IntroB({
  reduced,
  profession,
  setProfession,
  onNext,
}: {
  reduced: boolean;
  profession: string;
  setProfession: (v: string) => void;
  onNext: () => void;
}) {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center"
      style={{ ...paletteVars(palettes.intro), background: palettes.intro.bgDeep }}
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.3 : 1.1, ease: 'easeOut', delay: reduced ? 0 : 0.3 }}
        className="flex w-full max-w-md flex-col items-center"
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
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
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
          <Button type="submit" onClick={onNext}>
            {intro.start}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
