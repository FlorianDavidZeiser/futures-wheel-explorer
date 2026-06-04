import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SceneFrameProps {
  children: ReactNode;
  /** Museale Patina, 0 bis 1. Bei den historischen Stationen leicht, im Heute 0,
   *  in der Wendung steigend. */
  patina: number;
}

// Die Vitrine. Jedes Bild steht im selben Rahmen, mit derselben Matte, derselben
// Patina und Vignette. Sie fuellt ihren Container vollstaendig, die Groesse und
// das Seitenverhaeltnis gibt das Layout-Geruest vor, damit alle Screens dieselbe
// feste Bildflaeche teilen.
export function SceneFrame({ children, patina }: SceneFrameProps) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[2px]"
      style={{
        background: 'var(--bg-deep)',
        boxShadow:
          '0 1px 0 color-mix(in srgb, var(--ink-faint) 18%, transparent) inset, 0 30px 80px -40px rgba(0,0,0,0.8)',
        border: '1px solid color-mix(in srgb, var(--ink-faint) 22%, transparent)',
      }}
    >
      <div className="absolute inset-0">{children}</div>
      <motion.div
        className="patina"
        initial={false}
        animate={{ opacity: patina }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.div
        className="patina-grain"
        initial={false}
        animate={{ opacity: Math.min(1, patina * 1.1) }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <div className="vignette" />
    </div>
  );
}
