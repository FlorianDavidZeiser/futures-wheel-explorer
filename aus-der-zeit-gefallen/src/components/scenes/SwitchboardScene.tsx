import { motion } from 'framer-motion';
import { SCENE_VIEWBOX, type SceneProps } from './sceneTypes';

// 1930. Ein Innenraum, eine grosse Wand aus Klinkenfeldern als geometrisches
// Muster, eine Frau mit Kopfhoerer, ein gestecktes Kabel. Die eine Bewegung ist
// ein ruhiges, gemeinsames Glimmen der Verbindungslichter, ein einziger Atem.
export function SwitchboardScene({ palette, reduced, active = true }: SceneProps) {
  const { bg, bgDeep, glow, accent, accentSoft } = palette;
  const still = reduced || !active;

  const cols = 14;
  const rows = 6;
  const x0 = 96;
  const y0 = 70;
  const dx = 44;
  const dy = 32;

  // Wenige Felder tragen ein Indikatorlicht, alle im selben ruhigen Rhythmus.
  const lit = new Set(['1-2', '3-8', '0-11', '4-5', '2-13', '5-1']);

  return (
    <svg viewBox={SCENE_VIEWBOX} className="h-full w-full" role="img" aria-label="Ein Fräulein vom Amt am Klinkenfeld, ein Kabel ist gesteckt.">
      <defs>
        <linearGradient id="sb-room" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bg} />
          <stop offset="100%" stopColor={bgDeep} />
        </linearGradient>
        <radialGradient id="sb-light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff0cc" stopOpacity="0.95" />
          <stop offset="60%" stopColor={glow} stopOpacity="0.5" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sb-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accentSoft} stopOpacity="0.18" />
          <stop offset="100%" stopColor={bgDeep} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="800" height="460" fill="url(#sb-room)" />
      {/* Sanfter Lichtfall von oben auf die Wand. */}
      <rect x="0" y="0" width="800" height="240" fill={glow} opacity={0.04} />

      {/* Die Wand aus Klinkenfeldern, ruhiges geometrisches Muster. */}
      <rect x={x0 - 30} y={y0 - 28} width={cols * dx + 16} height={rows * dy + 20} rx="5" fill={bgDeep} opacity={0.5} />
      <rect x={x0 - 30} y={y0 - 28} width={cols * dx + 16} height={rows * dy + 20} rx="5" fill="none" stroke={accentSoft} strokeWidth={1} opacity={0.35} vectorEffect="non-scaling-stroke" />

      {/* Das eine gemeinsame Glimmen, hinter den verbundenen Feldern. */}
      <motion.g
        animate={still ? { opacity: 0.55 } : { opacity: [0.25, 0.7, 0.35, 0.6, 0.25] }}
        transition={still ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        {[...lit].map((key) => {
          const [r, c] = key.split('-').map(Number);
          return <circle key={key} cx={x0 + c * dx} cy={y0 + r * dy} r="13" fill="url(#sb-light)" />;
        })}
      </motion.g>

      {/* Die Loecher des Feldes und die Stecker. */}
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const key = `${r}-${c}`;
          const cx = x0 + c * dx;
          const cy = y0 + r * dy;
          const isLit = lit.has(key);
          return (
            <g key={key}>
              <circle cx={cx} cy={cy} r="4.5" fill={accentSoft} opacity={0.9} />
              <circle cx={cx} cy={cy} r="2" fill={isLit ? glow : accent} opacity={isLit ? 0.95 : 0.5} />
            </g>
          );
        })
      )}

      {/* Ein gestecktes Kabel, ruhig, still. */}
      <path d="M322 300 Q 408 342 470 158" stroke={glow} strokeWidth={2.2} fill="none" opacity={0.7} strokeLinecap="round" />
      <circle cx="470" cy="158" r="5" fill="#fff0cc" opacity={0.9} />

      {/* Bodenschatten als Tiefe. */}
      <rect x="0" y="392" width="800" height="68" fill="url(#sb-floor)" />

      {/* Die Frau mit Kopfhoerer im Vordergrund. */}
      <g fill={bgDeep}>
        <path d="M250 360 C 252 326, 244 296, 268 286 C 292 278, 318 286, 326 308 C 332 326, 330 344, 332 360 Z" />
        <circle cx="296" cy="266" r="20" />
        <path d="M278 258 Q 296 236 314 258" stroke={bgDeep} strokeWidth={3} fill="none" />
        <circle cx="278" cy="266" r="5" />
        <path d="M312 312 Q 322 300 322 296" stroke={bgDeep} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
