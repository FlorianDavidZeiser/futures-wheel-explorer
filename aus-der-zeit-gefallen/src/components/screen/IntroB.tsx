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

        {/* Hebel 6, das Feld als museales Vitrinen-Etikett. Die Antwort wird zum
            Exponat, das beim Beginnen mit in die Reihe wandert. */}
        <form onSubmit={onSubmit} className="mt-10 flex w-full flex-col items-center gap-8">
          <div className="flex w-full max-w-xs flex-col items-center gap-3">
            <span
              className="font-sans"
              style={{ color: 'var(--ink-faint)', fontSize: '0.66rem', letterSpacing: '0.26em', textTransform: 'uppercase' }}
            >
              Tätigkeit
            </span>
            <div
              className="w-full"
              style={{
                border: '1px solid color-mix(in srgb, var(--ink-faint) 42%, transparent)',
                borderRadius: 2,
                background: 'color-mix(in srgb, var(--ink-faint) 7%, transparent)',
                boxShadow: '0 1px 0 color-mix(in srgb, var(--ink-faint) 16%, transparent) inset',
              }}
            >
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                aria-label={intro.question}
                className="w-full bg-transparent text-center font-serif"
                style={{
                  color: 'var(--ink)',
                  fontSize: '1.18rem',
                  padding: '0.72rem 0.8rem',
                  outline: 'none',
                  letterSpacing: '0.01em',
                }}
              />
            </div>
          </div>
          <Button type="submit" onClick={onNext}>
            {intro.start}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
