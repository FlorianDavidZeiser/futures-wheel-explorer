import { motion } from 'framer-motion';
import { SCENE_VIEWBOX, type SceneProps } from './sceneTypes';

// 1958. Ein nuechterner Raum, angedeutete Tischreihen, eine gebeugte Silhouette
// ueber Papier. Die eine Bewegung ist die sich ganz langsam fuellende Tabelle.
// Im dritten Beat leert sich der Tisch, die Figur ist weg, ein kuehles
// Maschinenlicht bleibt. Die kaelteste, ruhigste Szene.
export function HumanComputerScene({ palette, reduced, active = true, beat = 0 }: SceneProps) {
  const { bg, bgDeep, glow, accent, accentSoft } = palette;
  const still = reduced || !active;
  const aged = beat >= 2;

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
        <radialGradient id="hc-machine" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7fb0ec" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3a6ea5" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="460" fill="url(#hc-room)" />
      <rect x="0" y="0" width="800" height="320" fill="url(#hc-ceil)" />

      <g stroke={accentSoft} strokeWidth={2} opacity={0.45} vectorEffect="non-scaling-stroke">
        <line x1="40" y1="414" x2="760" y2="414" />
        <line x1="120" y1="372" x2="680" y2="372" />
        <line x1="196" y1="340" x2="604" y2="340" />
        <line x1="252" y1="316" x2="548" y2="316" />
      </g>

      {/* A5, das kuehle Maschinenlicht im Nebenraum, das im Nachher bleibt. */}
      <motion.g initial={false} animate={{ opacity: aged ? 1 : 0 }} transition={{ duration: reduced ? 0.3 : 2, ease: 'easeInOut' }}>
        <ellipse cx="690" cy="300" rx="150" ry="150" fill="url(#hc-machine)" opacity={0.5} />
        <rect x="648" y="250" width="96" height="150" rx="3" fill={bgDeep} stroke={accentSoft} strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
        <motion.circle
          cx="696" cy="276" r="5" fill="#9fd0ff"
          animate={still ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={still ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <rect x="664" y="300" width="64" height="3" rx="1.5" fill="#7fb0ec" opacity={0.5} />
        <rect x="664" y="312" width="48" height="3" rx="1.5" fill="#7fb0ec" opacity={0.4} />
        <rect x="664" y="324" width="56" height="3" rx="1.5" fill="#7fb0ec" opacity={0.45} />
      </motion.g>

      {/* Die zweite, kleinere Silhouette an einem hinteren Tisch, verblasst im Nachher. */}
      <motion.g fill={bgDeep} initial={false} animate={{ opacity: aged ? 0 : 0.55 }} transition={{ duration: reduced ? 0.3 : 1.8, ease: 'easeInOut' }}>
        <path d="M566 338 C 568 312, 560 292, 584 282 C 600 276, 618 282, 624 294 C 628 306, 626 324, 628 338 Z" />
        <circle cx="592" cy="276" r="12" />
        <rect x="612" y="312" width="44" height="28" rx="1.5" fill="#cfd6c6" opacity={0.5} />
      </motion.g>

      {/* Das Blatt Papier und die fuellende Tabelle, leeren sich im Nachher. */}
      <motion.g initial={false} animate={{ opacity: aged ? 0 : 1 }} transition={{ duration: reduced ? 0.3 : 1.8, ease: 'easeInOut' }}>
        <rect x="338" y="252" width="214" height="154" rx="2" fill="#d7ddcd" opacity={0.94} />
        <rect x="338" y="252" width="214" height="154" rx="2" fill="none" stroke={accentSoft} strokeWidth={1} opacity={0.4} vectorEffect="non-scaling-stroke" />
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
      </motion.g>

      {/* A1 und A5, die gebeugte Silhouette traegt ein, verblasst im Nachher. */}
      <motion.g fill={bgDeep} initial={false} animate={{ opacity: aged ? 0 : 1 }} transition={{ duration: reduced ? 0.3 : 1.8, ease: 'easeInOut' }}>
        <path d="M252 408 C 256 360, 244 318, 284 296 C 312 280, 344 286, 360 300 L 384 318 L 379 330 L 352 314 C 344 350, 348 380, 350 408 Z" />
        <circle cx="320" cy="280" r="20" />
        <motion.path
          d="M352 314 Q 378 326 398 330" stroke={bgDeep} strokeWidth={10} fill="none" strokeLinecap="round"
          animate={still ? undefined : { d: ['M352 314 Q 378 326 398 330', 'M352 314 Q 376 330 394 336', 'M352 314 Q 378 326 398 330'] }}
          transition={still ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="402" cy="330" r="2.6" fill={accentSoft} />
      </motion.g>
    </svg>
  );
}
