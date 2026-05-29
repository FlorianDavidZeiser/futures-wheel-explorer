import { motion } from 'framer-motion';
import { SCENE_VIEWBOX, type SceneProps } from './sceneTypes';

// 1950. Ein nuechterner Raum, angedeutete Tischreihen, eine gebeugte Silhouette
// ueber Papier. Die Bewegung ist minimal, eine sich ganz langsam fuellende
// Tabelle aus Ziffern. Die kaelteste, ruhigste, fast erstarrte Bewegung.
export function HumanComputerScene({ palette, reduced }: SceneProps) {
  const { bg, bgDeep, glow, accent, accentSoft } = palette;

  // Die langsam fuellende Tabelle.
  const gridCols = 7;
  const gridRows = 5;
  const gx = 372;
  const gy = 276;
  const cw = 26;
  const ch = 20;

  const cells: { x: number; y: number; order: number }[] = [];
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      cells.push({ x: gx + c * cw, y: gy + r * ch, order: r * gridCols + c });
    }
  }
  const total = cells.length;

  return (
    <svg viewBox={SCENE_VIEWBOX} className="h-full w-full" role="img" aria-label="Ein menschlicher Computer trägt unter der Lampe Zahlen in eine Tabelle ein.">
      <defs>
        <linearGradient id="hc-room" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bg} />
          <stop offset="100%" stopColor={bgDeep} />
        </linearGradient>
        <radialGradient id="hc-ceil" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor={glow} stopOpacity="0.22" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="460" fill="url(#hc-room)" />
      {/* Sachliches Deckenlicht. */}
      <rect x="0" y="0" width="800" height="300" fill="url(#hc-ceil)" />

      {/* Angedeutete Tischreihen, zurueckweichend. */}
      <g stroke={accentSoft} strokeWidth={2} opacity={0.5}>
        <line x1="40" y1="408" x2="760" y2="408" />
        <line x1="120" y1="372" x2="680" y2="372" />
        <line x1="190" y1="344" x2="610" y2="344" />
      </g>

      {/* Das Blatt Papier, fahles Papiergruen. */}
      <rect x="352" y="252" width="216" height="150" rx="2" fill="#d7ddcd" opacity={0.92} />
      <rect x="352" y="252" width="216" height="150" rx="2" fill="none" stroke={accentSoft} strokeWidth={1} opacity={0.4} />

      {/* Die ganz langsam fuellende Tabelle aus Ziffern, als feine Striche. */}
      {cells.map((cell) => (
        <motion.rect
          key={cell.order}
          x={cell.x} y={cell.y} width="13" height="2.4" rx="1" fill={accent}
          initial={reduced ? { opacity: 0.7 } : { opacity: 0 }}
          animate={reduced ? { opacity: 0.7 } : { opacity: [0, 0, 0.85, 0.85, 0] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: 24,
                  repeat: Infinity,
                  ease: 'linear',
                  times: [0, cell.order / total, Math.min(1, cell.order / total + 0.02), 0.97, 1],
                }
          }
        />
      ))}

      {/* Die gebeugte Silhouette ueber dem Papier. */}
      <g fill={bgDeep}>
        <path d="M232 404 C 236 360, 224 322, 262 300 C 286 286, 320 292, 332 300 L 352 312 L 348 322 L 322 314 C 318 348, 320 376, 322 404 Z" />
        <circle cx="300" cy="286" r="19" />
        {/* Der ruhende Arm und die Hand am Papier, die eine Zahl eintraegt. */}
        <path d="M322 314 Q 352 322 372 322" stroke={bgDeep} strokeWidth={9} fill="none" strokeLinecap="round" />
      </g>
      {/* Die feine Spitze des Bleistifts. */}
      <circle cx="376" cy="322" r="2.4" fill={accentSoft} />
    </svg>
  );
}
