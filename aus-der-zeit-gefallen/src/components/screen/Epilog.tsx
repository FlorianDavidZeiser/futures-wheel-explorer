import { motion } from 'framer-motion';
import { epilog, outroActions } from '../../data/content';
import { Button } from '../ui/Button';

// Der Epilog. Vier Zeilen erscheinen nacheinander, die Verben einzeln und am
// langsamsten. Die Frage bleibt offen stehen, kein Eingabefeld, kein Aufruf.
// Erst danach, ganz dezent, die Moeglichkeit, noch einmal zu beginnen.
export function Epilog({ reduced, onRestart }: { reduced: boolean; onRestart: () => void }) {
  // Taktung der Zeilen. Bei Reduced Motion stehen sie fast sofort da.
  const t = reduced
    ? { intro: 0.1, verb0: 0.2, verbStep: 0.05, middle: 0.35, question: 0.5, again: 0.8, dur: 0.4 }
    : { intro: 0.6, verb0: 2.4, verbStep: 0.85, middle: 6.2, question: 7.8, again: 10, dur: 1.6 };

  const line = {
    color: 'var(--ink-soft)',
    fontSize: 'clamp(1.1rem, 1.9vw, 1.35rem)',
    lineHeight: 1.6,
    fontWeight: 300,
    maxWidth: '34rem',
    textWrap: 'pretty',
  } as const;

  return (
    <div className="flex w-full max-w-2xl flex-col items-center text-center">
      <motion.p
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: t.dur, ease: 'easeOut', delay: t.intro }}
        className="font-serif"
        style={line}
      >
        {epilog.intro}
      </motion.p>

      {/* Die Verben einzeln, die langsamste Zeile. */}
      <p className="mt-[5svh] font-serif" style={{ ...line, color: 'var(--ink)' }}>
        {epilog.verbs.map((w, i) => (
          <motion.span
            key={w}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0.4 : 1.3, ease: 'easeOut', delay: t.verb0 + i * t.verbStep }}
            style={{ marginRight: i < epilog.verbs.length - 1 ? '0.5ch' : 0 }}
          >
            {w}
          </motion.span>
        ))}
      </p>

      <motion.p
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: t.dur, ease: 'easeOut', delay: t.middle }}
        className="mt-[5svh] font-serif"
        style={line}
      >
        {epilog.middle}
      </motion.p>

      {/* Die Frage bleibt offen stehen, der Schlusspunkt. */}
      <motion.p
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.4 : 2, ease: 'easeOut', delay: t.question }}
        className="mt-[6svh] font-serif"
        style={{
          color: 'var(--ink)',
          fontSize: 'clamp(1.3rem, 2.4vw, 1.7rem)',
          lineHeight: 1.5,
          fontWeight: 300,
          maxWidth: '34rem',
          textWrap: 'pretty',
        }}
      >
        {epilog.question}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0.4 : 1.6, ease: 'easeOut', delay: t.again }}
        className="mt-[8svh]"
      >
        <Button variant="ghost" onClick={onRestart}>
          {outroActions.again}
        </Button>
      </motion.div>
    </div>
  );
}
