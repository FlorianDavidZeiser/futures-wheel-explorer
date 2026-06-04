import { motion } from 'framer-motion';
import { palettes, paletteVars } from '../../styles/palettes';
import { turn, closingLine, outroActions } from '../../data/content';
import { SceneBox } from './SceneBox';
import { SilhouetteScene } from '../scenes/SilhouetteScene';
import { Button } from '../ui/Button';

// Die Heute-Station und die Wendung, gleiches Layout-Geruest wie die historischen.
// Leere Silhouette an der Stelle der Szene, der eigene Beruf an der Stelle des
// Namens, an der Nachher-Stelle ein Fragezeichen. Die Patina kommt pro Screen
// herein und altert Beruf und Bild. Provisorisch, wird spaeter final gefeilt.
export function SilhouetteScreen({
  profession,
  patina,
  showToday,
  showClosing,
  reduced,
  onRestart,
}: {
  profession: string;
  patina: number;
  showToday: boolean;
  showClosing: boolean;
  reduced: boolean;
  onRestart: () => void;
}) {
  const name = profession.trim() || turn.fallbackProfession;
  const t = Math.max(0, Math.min(1, patina));
  const aged = `sepia(${t.toFixed(3)}) saturate(${(1 - t * 0.35).toFixed(3)}) brightness(${(1 - t * 0.12).toFixed(3)})`;
  const markOpacity = 0.2 + 0.8 * t;

  const fade = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, ease: 'easeOut' } }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1.1, ease: [0.22, 0.61, 0.36, 1] as const, delay: 0.25 } };

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center px-6 pt-[15svh] pb-[7svh]"
      style={paletteVars(palettes.today)}
    >
      <SceneBox patina={patina}>
        <SilhouetteScene palette={palettes.today} reduced={reduced} />
      </SceneBox>

      <motion.div
        {...fade}
        className="mt-[5svh] flex w-full max-w-2xl flex-col items-center text-center"
        style={{ maxHeight: '40svh', overflowY: 'auto' }}
      >
        {showToday && (
          <p
            className="mb-[3svh] font-serif"
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(1.2rem, 2.3vw, 1.7rem)',
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: '36rem',
              textWrap: 'pretty',
            }}
          >
            {turn.todayLine}
          </p>
        )}

        <h2
          className="font-serif"
          style={{
            color: 'var(--ink)',
            fontSize: 'clamp(1.5rem, 3.4vw, 2.25rem)',
            fontWeight: 400,
            letterSpacing: '0.01em',
            filter: aged,
          }}
        >
          {name}
        </h2>

        {/* Die Nachher-Stelle, ein Fragezeichen, das mit der Patina deutlicher wird. */}
        <span
          className="mt-[3svh] font-serif"
          style={{
            color: 'var(--ink-faint)',
            fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
            lineHeight: 1.4,
            fontWeight: 300,
            opacity: markOpacity,
            filter: aged,
          }}
        >
          {turn.mark}
        </span>

        {showClosing && (
          <>
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0.4 : 2.4, ease: 'easeOut', delay: reduced ? 0.3 : 1.4 }}
              className="mt-[5svh] font-serif"
              style={{
                color: 'var(--ink-soft)',
                fontSize: 'clamp(1.1rem, 1.9vw, 1.4rem)',
                lineHeight: 1.6,
                fontWeight: 300,
                maxWidth: '34rem',
                textWrap: 'pretty',
              }}
            >
              {closingLine}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0.4 : 1.6, ease: 'easeOut', delay: reduced ? 0.6 : 4.6 }}
              className="mt-[6svh]"
            >
              <Button variant="ghost" onClick={onRestart}>
                {outroActions.again}
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
