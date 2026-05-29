import { motion, useTransform, type MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';

interface SceneFrameProps {
  children: ReactNode;
  /**
   * Wirksame Patina, 0 bis 1. Als Zahl bei den historischen Stationen und im
   * Heute. Als MotionValue in der Wendung, damit sie live und synchron zum
   * Hochlaufen der Jahreszahl steigt.
   */
  patina: number | MotionValue<number>;
}

const frameStyle = {
  background: 'var(--bg-deep)',
  boxShadow:
    '0 1px 0 color-mix(in srgb, var(--ink-faint) 18%, transparent) inset, 0 30px 80px -40px rgba(0,0,0,0.8)',
  border: '1px solid color-mix(in srgb, var(--ink-faint) 22%, transparent)',
  aspectRatio: '800 / 460',
} as const;

// Die Vitrine. Jedes lebende Bild steht im selben Rahmen, mit derselben Matte und
// derselben Vignette. Genau diese Gleichbehandlung traegt spaeter die Pointe.
export function SceneFrame({ children, patina }: SceneFrameProps) {
  return typeof patina === 'number' ? (
    <StaticFrame patina={patina}>{children}</StaticFrame>
  ) : (
    <LiveFrame patina={patina}>{children}</LiveFrame>
  );
}

// Ruhige Patina, animiert auf einen Zielwert.
function StaticFrame({ children, patina }: { children: ReactNode; patina: number }) {
  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-[2px]" style={frameStyle}>
      <div className="absolute inset-0">{children}</div>
      <motion.div className="patina" initial={false} animate={{ opacity: patina }} transition={{ duration: 0.6, ease: 'easeOut' }} />
      <motion.div className="patina-grain" initial={false} animate={{ opacity: Math.min(1, patina * 1.1) }} transition={{ duration: 0.6, ease: 'easeOut' }} />
      <div className="vignette" />
    </div>
  );
}

// Live mitlaufende Patina, an die Jahreszahl der Wendung gebunden.
function LiveFrame({ children, patina }: { children: ReactNode; patina: MotionValue<number> }) {
  const grain = useTransform(patina, (v) => Math.min(1, v * 1.1));
  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-[2px]" style={frameStyle}>
      <div className="absolute inset-0">{children}</div>
      <motion.div className="patina" style={{ opacity: patina }} />
      <motion.div className="patina-grain" style={{ opacity: grain }} />
      <div className="vignette" />
    </div>
  );
}
