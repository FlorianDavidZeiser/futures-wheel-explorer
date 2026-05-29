import { useEffect } from 'react';
import { animate, motion, useTransform, type MotionValue } from 'framer-motion';
import { useExperience } from '../../state/ExperienceContext';
import { palettes } from '../../styles/palettes';
import { turn, closingLine, outroActions, labels } from '../../data/content';
import { sceneVariants } from '../../styles/motionPresets';
import { SceneFrame } from '../station/SceneFrame';
import { SilhouetteScene } from '../scenes/SilhouetteScene';
import { Button } from '../ui/Button';

interface FinaleProps {
  /** Die geteilte, durchlaufende Jahreszahl. Hier treibt die Wendung sie an. */
  yearMotion: MotionValue<number>;
  reduced: boolean;
}

// Die Wendung und der Ausklang.
//
// Der Nutzer wird zur fuenften Station, im selben Aufbau wie die vier
// historischen. Eine leere, gesichtslose Silhouette, der eigene Beruf in
// derselben musealen Serif, und an der Stelle der Abloese-Ursache nur ein
// Fragezeichen. Dann bleibt die Jahreszahl nicht stehen. Sie laeuft, erst
// zoegerlich, dann unaufhaltsam, ueber den Nutzer hinweg, waehrend sich die
// vergilbte Patina ueber den eigenen Beruf legt. Bei 2070 kommt sie zur Ruhe,
// und nach einer Stille erscheint eine einzige, leise Zeile.
export function Finale({ yearMotion, reduced }: FinaleProps) {
  const { state, dispatch } = useExperience();

  const profession = state.profession.trim() || turn.fallbackProfession;
  const isOutro = state.phase === 'outro';

  // Patina des Bildes, live an die Jahreszahl gebunden.
  const scenePatina = useTransform(yearMotion, [turn.startYear, turn.endYear], [0, 0.62]);
  // Sepiahafte Alterung von Berufsname und Abloese-Zeile.
  const textFilter = useTransform(yearMotion, (v) => {
    const t = Math.max(0, Math.min(1, (v - turn.startYear) / (turn.endYear - turn.startYear)));
    return `sepia(${t.toFixed(3)}) saturate(${(1 - t * 0.35).toFixed(3)}) brightness(${(1 - t * 0.12).toFixed(3)})`;
  });

  // Das Hochlaufen der Jahreszahl. Erst zoegerlich, dann unaufhaltsam.
  useEffect(() => {
    if (reduced) {
      yearMotion.set(turn.endYear);
      const t = window.setTimeout(() => dispatch({ type: 'CONCLUDE' }), 500);
      return () => window.clearTimeout(t);
    }
    let controls: ReturnType<typeof animate> | undefined;
    const start = window.setTimeout(() => {
      controls = animate(yearMotion, turn.endYear, {
        duration: 7.5,
        // ease-in, damit die Zeit unter den Fuessen spuerbar beschleunigt.
        ease: [0.5, 0, 0.85, 0.3],
        onComplete: () => dispatch({ type: 'CONCLUDE' }),
      });
    }, 1500);
    return () => {
      window.clearTimeout(start);
      controls?.stop();
    };
    // Laeuft genau einmal, beim Eintritt in die Wendung.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Aus der Zeit gefallen', url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // Stilles Scheitern. Der Ausklang bleibt ungestoert.
    }
  };

  return (
    <motion.div
      variants={sceneVariants(reduced)}
      initial="initial"
      animate="enter"
      exit="exit"
      className="w-full"
    >
      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-2xl">
          <SceneFrame patina={scenePatina}>
            <SilhouetteScene palette={palettes.today} reduced={reduced} />
          </SceneFrame>
        </div>

        <div className="mt-8 flex w-full max-w-2xl flex-col items-center text-center">
          <motion.h2
            className="font-serif"
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(1.5rem, 3.4vw, 2.25rem)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              filter: textFilter,
            }}
          >
            {profession}
          </motion.h2>

          <motion.p
            className="font-serif italic"
            style={{
              color: 'var(--ink-faint)',
              fontSize: 'clamp(0.92rem, 1.2vw, 1.02rem)',
              lineHeight: 1.6,
              marginTop: '1.75rem',
              fontWeight: 300,
              filter: textFilter,
            }}
          >
            <span className="not-italic" style={{ opacity: 0.7, marginRight: '0.5ch' }}>
              {labels.replacedByLead}
            </span>
            {turn.replacedBy}
          </motion.p>

          {/* Nach der Stille die einzige, leise Zeile. Dann, nach einer Weile,
              zwei kaum sichtbare Moeglichkeiten. */}
          {isOutro && (
            <>
              <motion.p
                initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0.3 : 2.6, ease: 'easeOut', delay: reduced ? 0.2 : 1.1 }}
                className="font-serif"
                style={{
                  color: 'var(--ink-soft)',
                  fontSize: 'clamp(1.1rem, 1.9vw, 1.4rem)',
                  lineHeight: 1.6,
                  fontWeight: 300,
                  marginTop: '3rem',
                  maxWidth: '34rem',
                  textWrap: 'pretty',
                }}
              >
                {closingLine}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0.3 : 1.6, ease: 'easeOut', delay: reduced ? 0.5 : 4.8 }}
                className="mt-16 flex items-center gap-8"
              >
                <Button variant="ghost" onClick={() => dispatch({ type: 'RESET' })}>
                  {outroActions.again}
                </Button>
                <Button variant="ghost" onClick={onShare}>
                  {outroActions.share}
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
