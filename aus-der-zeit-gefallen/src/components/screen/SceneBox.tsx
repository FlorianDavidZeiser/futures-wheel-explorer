import type { ReactNode } from 'react';
import { SceneFrame } from '../station/SceneFrame';

// Die feste Bildflaeche des Layout-Geruests. Immer dieselbe Position, dieselbe
// Groesse und dasselbe Seitenverhaeltnis, auf allen Screens. Sie passt sich der
// Hoehe kleiner Geraete an, ohne ihre Proportion zu verlieren.
export function SceneBox({ children, patina }: { children: ReactNode; patina: number }) {
  return (
    <div
      className="w-full"
      style={{
        maxWidth: '40rem',
        aspectRatio: '800 / 460',
        maxHeight: '38svh',
        margin: '0 auto',
      }}
    >
      <SceneFrame patina={patina}>{children}</SceneFrame>
    </div>
  );
}
