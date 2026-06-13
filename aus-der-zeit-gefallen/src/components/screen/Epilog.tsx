import { motion } from 'framer-motion';
import { epilog, outroActions } from '../../data/content';
import { Button } from '../ui/Button';

// Der Epilog. Vier Zeilen erscheinen nacheinander, die Verben einzeln und mit
// Praesenz, denn sie sind das Herz. Ein feiner Trenner setzt eine Pause, dann
// kommt die Frage gross und akzentuiert als echter Schlusspunkt. Erst danach,
// ganz dezent, die Moeglichkeit, noch einmal zu beginnen.
export function Epilog({ reduced, onRestart }: { reduced: boolean; onRestart: () => void }) {
  const t = reduced
    ? { intro: 0.1, verb0: 0.2, verbStep: 0.05, middle: 0.35, rule: 0.45, question: 0.55, again: 0.85, dur: 0.4 }
    : { intro: 0.6, verb0: 2.2, verbStep: 0.85, middle: 6, rule: 7, question: 7.6, again: 10.2, dur: 1.6 };

  const quiet = {
    color: 'var(--ink-soft)',
    fontSize: 'clamp(1.06rem, 1.6vw, 1.28rem)',
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
        style={quiet}
      >
        {epilog.intro}
      </motion.p>

      {/* Die Verben, das Herz, einzeln und mit mehr Gewicht. */}
      <p
        className="mt-[6svh] font-serif"
        style={{ color: 'var(--ink)', fontSize: 'clamp(1.22rem, 2.1vw, 1.5rem)', lineHeight: 1.5, fontWeight: 300, letterSpacing: '0.015em' }}
      >
        {epilog.verbs.map((w, i) => (
          <motion.span
            key={w}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0.4 : 1.3, ease: 'easeOut', delay: t.verb0 + i * t.verbStep }}
            style={{ marginRight: i < epilog.verbs.length - 1 ? '0.55ch' : 0 }}
          >
            {w}
          </motion.span>
        ))}
      </p>

      <motion.p
        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: t.dur, ease: 'easeOut', delay: t.middle }}
        className="mt-[6svh] font-serif"
        style={quiet}
      >
        {epilog.middle}
      </motion.p>

      {/* Ein feiner Trenner, eine museale Pause vor der Frage. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scaleX: reduced ? 1 : 0.4 }}
        animate={{ opacity: 0.4, scaleX: 1 }}
        transition={{ duration: reduced ? 0.3 : 1.4, ease: 'easeOut', delay: t.rule }}
        className="mt-[6svh]"
        style={{ width: '3rem', height: '1px', background: 'var(--ink-faint)' }}
      />

      {/* Die Frage, gross und ruhig, der Schlusspunkt. */}
      <motion.p
        initial={{ opacity: 0, y: reduced ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.4 : 2.2, ease: 'easeOut', delay: t.question }}
        className="mt-[5svh] font-serif"
        style={{
          color: 'var(--ink)',
          fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
          lineHeight: 1.4,
          fontWeight: 300,
          letterSpacing: '0.005em',
          maxWidth: '34rem',
          textWrap: 'pretty',
          textShadow: '0 0 34px color-mix(in srgb, var(--glow) 16%, transparent)',
        }}
      >
        {epilog.question}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0.4 : 1.6, ease: 'easeOut', delay: t.again }}
        className="mt-[9svh]"
      >
        <Button variant="ghost" onClick={onRestart}>
          {outroActions.again}
        </Button>
      </motion.div>
    </div>
  );
}
