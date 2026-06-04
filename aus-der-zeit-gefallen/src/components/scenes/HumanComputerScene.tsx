import { motion } from 'framer-motion';
import { SCENE_VIEWBOX, type SceneProps } from './sceneTypes';

// 1958. Ein nuechterner Raum, angedeutete Tischreihen, eine gebeugte Silhouette
// ueber Papier, dahinter eine zweite, kleinere fuer Saaltiefe. Die eine Bewegung
// ist die sich ganz langsam, fast erstarrt fuellende Tabelle aus Ziffern. Die
// kaelteste, ruhigste Szene.
export function HumanComputerScene({ palette, reduced, active = true }: SceneProps) {
  const { bg, bgDeep, glow, accent, accentSoft } = palette;
  const still = reduced || !active;

  const gridCols = 6;
  const gridRows = 5;
  const gx = 360;
  const gy = 278;
  const cw = 30;
  const ch = 23;

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
        <radialGradient id="hc-ceil" cx="50%" cy="0%" r="78%">
          <stop offset="0%" stopColor={glow} stopOpacity="0.22" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="460" fill="url(#hc-room)" />
      <rect x="0" y="0" width="800" height="320" fill="url(#hc-ceil)" />

      {/* Angedeutete, zurueckweichende Tischreihen, Tiefe ohne Aufwand. */}
      <g stroke={accentSoft} strokeWidth={2} opacity={0.45} vectorEffect="non-scaling-stroke">
        <line x1="40" y1="414" x2="760" y2="414" />
        <line x1="120" y1="372" x2="680" y2="372" />
        <line x1="196" y1="340" x2="604" y2="340" />
        <line x1="252" y1="316" x2="548" y2="316" />
      </g>

      {/* Eine zweite, kleinere Silhouette an einem hinteren Tisch, fuer Saaltiefe. */}
      <g fill={bgDeep} opacity={0.55}>
        <path d="M566 338 C 568 312, 560 292, 584 282 C 600 276, 618 282, 624 294 C 628 306, 626 324, 628 338 Z" />
        <circle cx="592" cy="276" r="12" />
        <rect x="612" y="312" width="44" height="28" rx="1.5" fill="#cfd6c6" opacity={0.5} />
      </g>

      {/* Das Blatt Papier, fahles Papiergruen, zentral. */}
      <rect x="338" y="252" width="214" height="154" rx="2" fill="#d7ddcd" opacity={0.94} />
      <rect x="338" y="252" width="214" height="154" rx="2" fill="none" stroke={accentSoft} strokeWidth={1} opacity={0.4} vectorEffect="non-scaling-stroke" />

      {/* Die eine Bewegung, die ganz langsam fuellende Tabelle, deutlichere Striche. */}
      {cells.map((cell) => (
        <motion.rect
          key={cell.order}
          x={cell.x} y={cell.y} width="18" height="3" rx="1.2" fill={accent}
          initial={false}
          animate={still ? { opacity: 0.72 } : { opacity: [0, 0, 0.88, 0.88, 0] }}
          transition={
            still
              ? undefined
              : {
                  duration: 26,
                  repeat: Infinity,
                  ease: 'linear',
                  times: [0, cell.order / total, Math.min(1, cell.order / total + 0.02), 0.97, 1],
                }
          }
        />
      ))}

      {/* Die gebeugte Silhouette, ueber das Papier gelehnt, die Hand traegt ein. */}
      <g fill={bgDeep}>
        <path d="M252 408 C 256 360, 244 318, 284 296 C 312 280, 344 286, 360 300 L 384 318 L 379 330 L 352 314 C 344 350, 348 380, 350 408 Z" />
        <circle cx="320" cy="280" r="20" />
        <path d="M352 314 Q 378 326 398 330" stroke={bgDeep} strokeWidth={10} fill="none" strokeLinecap="round" />
      </g>
      {/* Die feine Spitze des Bleistifts auf dem Papier. */}
      <circle cx="402" cy="330" r="2.6" fill={accentSoft} />
    </svg>
  );
}
