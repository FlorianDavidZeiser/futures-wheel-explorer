import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { SceneFrame } from './SceneFrame';
import { stagger } from '../../styles/motionPresets';
import { labels } from '../../data/content';

interface StationLayoutProps {
  scene: ReactNode;
  /** Patina des lebenden Bildes, 0 bis 1. */
  patina: number;
  /** Patina ueber Berufsname und Abloese-Zeile, 0 bis 1. Altert den Text mit. */
  textPatina?: number;
  profession?: string | null;
  story?: string | null;
  /** Die Ursache der Abloesung. Bei der fuenften Station nur ein Fragezeichen. */
  replacedBy?: string | null;
  reduced: boolean;
  /** Aktionsbereich, etwa der weiter-Knopf. */
  children?: ReactNode;
}

// Der gemeinsame Aufbau jeder Station, damit eine ruhige, fast rituelle
// Wiederkehr entsteht und sich die fuenfte Station, der Nutzer selbst, nahtlos
// einreiht. Die Jahreszahl liegt als durchlaufendes Element darueber, ausserhalb.
export function StationLayout({
  scene,
  patina,
  textPatina = 0,
  profession,
  story,
  replacedBy,
  reduced,
  children,
}: StationLayoutProps) {
  // Die sepiahafte Alterung, die sich in der Wendung ueber den eigenen Beruf legt.
  const agedStyle =
    textPatina > 0
      ? {
          filter: `sepia(${textPatina}) saturate(${1 - textPatina * 0.35}) brightness(${1 - textPatina * 0.12})`,
        }
      : undefined;

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full max-w-2xl">
        <SceneFrame patina={patina}>{scene}</SceneFrame>
      </div>

      <div className="mt-8 flex w-full max-w-2xl flex-col items-center text-center">
        {profession && (
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(reduced, 0.1)}
            className="font-serif"
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(1.5rem, 3.4vw, 2.25rem)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              ...agedStyle,
            }}
          >
            {profession}
          </motion.h2>
        )}

        {story && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={stagger(reduced, 0.25)}
            className="font-serif"
            style={{
              color: 'var(--ink-soft)',
              fontSize: 'clamp(1.02rem, 1.5vw, 1.18rem)',
              lineHeight: 1.75,
              fontWeight: 300,
              marginTop: '1.25rem',
              maxWidth: '38rem',
              textWrap: 'pretty',
            }}
          >
            {story}
          </motion.p>
        )}

        {replacedBy && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={stagger(reduced, 0.45)}
            className="font-serif italic"
            style={{
              color: 'var(--ink-faint)',
              fontSize: 'clamp(0.92rem, 1.2vw, 1.02rem)',
              lineHeight: 1.6,
              marginTop: '1.75rem',
              fontWeight: 300,
              ...agedStyle,
            }}
          >
            <span className="not-italic" style={{ opacity: 0.7, marginRight: '0.5ch' }}>
              {labels.replacedByLead}
            </span>
            {replacedBy}
          </motion.p>
        )}

        {children && <div className="mt-12">{children}</div>}
      </div>
    </div>
  );
}
