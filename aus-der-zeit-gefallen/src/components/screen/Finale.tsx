import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useTransform, type MotionValue } from 'framer-motion';
import { palettes, paletteVars } from '../../styles/palettes';
import { turn, closingLine, headings } from '../../data/content';
import { SceneFrame } from '../station/SceneFrame';
import { TodayScene } from '../scenes/TodayScene';
import { SilhouetteScene } from '../scenes/SilhouetteScene';
import { Gallery } from './Gallery';
import { Epilog } from './Epilog';

const sceneBox = {
  width: '100%',
  maxWidth: '40rem',
  aspectRatio: '800 / 460',
  maxHeight: '38svh',
  margin: '0 auto',
} as const;

// Der Schluss als ein durchgehender Fluss. Erst das gewoehnliche Heute, das
// sichere Scharnier, dann die Ueberblendung zur leeren Silhouette mit dem eigenen
// Beruf, dann laeuft die Zeit darueber hinweg. Die eigene Vitrine reiht sich neben
// die vier verschwundenen, darunter der eine Satz. Und zuletzt, von selbst, der
// Epilog, der echte letzte Akkord.
export function Finale({
  reduced,
  profession,
  stage,
  heutePatina,
  runDone,
  onRestart,
}: {
  reduced: boolean;
  profession: string;
  stage: number;
  heutePatina: MotionValue<number>;
  runDone: boolean;
  onRestart: () => void;
}) {
  const name = profession.trim() || turn.fallbackProfession;
  const agedFilter = useTransform(heutePatina, (v) => {
    const t = Math.max(0, Math.min(1, v));
    return `sepia(${t.toFixed(3)}) saturate(${(1 - t * 0.35).toFixed(3)}) brightness(${(1 - t * 0.12).toFixed(3)})`;
  });
  const markOpacity = useTransform(heutePatina, (v) => 0.2 + 0.8 * Math.max(0, Math.min(1, v)));

  // Die Galerie oeffnet sich erst nach einer Stille, wenn der Satz wirkt.
  const [gallery, setGallery] = useState(false);
  useEffect(() => {
    if (!runDone) {
      setGallery(false);
      return;
    }
    const t = window.setTimeout(() => setGallery(true), reduced ? 700 : 3600);
    return () => window.clearTimeout(t);
  }, [runDone, reduced]);

  // Nach dem Laternenanzuender-Satz eine Stille, dann blendet der Epilog von
  // selbst ein, ohne Klick.
  const [epilog, setEpilog] = useState(false);
  useEffect(() => {
    if (!gallery) {
      setEpilog(false);
      return;
    }
    const t = window.setTimeout(() => setEpilog(true), reduced ? 1400 : 8000);
    return () => window.clearTimeout(t);
  }, [gallery, reduced]);

  const small = reduced
    ? { duration: 0.3, ease: 'easeOut' as const }
    : { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as const };

  const isToday = stage === 0;

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center px-6 pt-[12svh] pb-[7svh]"
      style={paletteVars(palettes.today)}
    >
      <AnimatePresence mode="wait">
        {!gallery ? (
          <motion.div
            key="vitrine"
            className="flex w-full flex-col items-center"
            initial={false}
            exit={{ opacity: 0, transition: { duration: reduced ? 0.3 : 1 } }}
          >
            <div style={sceneBox}>
              <SceneFrame patina={heutePatina}>
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: isToday ? 1 : 0 }}
                  transition={{ duration: reduced ? 0.3 : 1.4, ease: 'easeInOut' }}
                >
                  <TodayScene palette={palettes.today} reduced={reduced} active={isToday} />
                </motion.div>
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: isToday ? 0 : 1 }}
                  transition={{ duration: reduced ? 0.3 : 1.4, ease: 'easeInOut' }}
                >
                  <SilhouetteScene palette={palettes.today} reduced={reduced} />
                </motion.div>
              </SceneFrame>
            </div>

            <div
              className="no-scrollbar mt-[4svh] flex w-full max-w-2xl flex-col items-center text-center"
              data-scroll
              style={{ maxHeight: '40svh', overflowY: 'auto' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isToday ? 'today' : 'job'}
                  initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                  transition={small}
                  className="flex w-full flex-col items-center"
                >
                  <motion.h2
                    className="font-serif"
                    style={{
                      color: 'var(--ink)',
                      fontSize: 'clamp(1.5rem, 3.4vw, 2.25rem)',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      filter: isToday ? undefined : agedFilter,
                    }}
                  >
                    {isToday ? headings.today : name}
                  </motion.h2>
                  {isToday && (
                    <p
                      className="mt-[2.4svh] font-serif"
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
                </motion.div>
              </AnimatePresence>

              {stage >= 2 && (
                <motion.span
                  className="mt-[2.6svh] font-serif"
                  style={{
                    color: 'var(--ink-faint)',
                    fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
                    lineHeight: 1.4,
                    fontWeight: 300,
                    opacity: markOpacity,
                    filter: agedFilter,
                  }}
                >
                  {turn.mark}
                </motion.span>
              )}
            </div>
          </motion.div>
        ) : !epilog ? (
          <motion.div
            key="gallery"
            className="flex w-full flex-col items-center"
            initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: reduced ? 0.3 : 1.2 } }}
            transition={{ duration: reduced ? 0.4 : 1.4, ease: 'easeOut' }}
          >
            <Gallery reduced={reduced} profession={profession} />

            {/* Der eine, letzte Satz unter der Galerie. */}
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
                textAlign: 'center',
                textWrap: 'pretty',
              }}
            >
              {closingLine}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="epilog"
            className="flex w-full flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0.4 : 1.6, ease: 'easeOut' }}
          >
            <Epilog reduced={reduced} onRestart={onRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
