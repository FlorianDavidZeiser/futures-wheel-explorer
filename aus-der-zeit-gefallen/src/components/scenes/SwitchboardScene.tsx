import { motion } from 'framer-motion';
import { SCENE_VIEWBOX, type SceneProps } from './sceneTypes';

// 1930. Ein Innenraum, eine grosse Wand aus Klinkenfeldern als geometrisches
// Muster. Eine Frau mit Kopfhoerer zieht ein Kabel und steckt es, kleine Lichter
// leuchten auf und ab im Rhythmus der Verbindungen. Geordnet, technisch.
export function SwitchboardScene({ palette, reduced }: SceneProps) {
  const { bg, bgDeep, glow, accent, accentSoft } = palette;

  const cols = 14;
  const rows = 6;
  const x0 = 96;
  const y0 = 70;
  const dx = 44;
  const dy = 32;

  // Wenige Felder bekommen ein ruhig pulsierendes Indikatorlicht.
  const lit = new Set(['1-2', '3-8', '0-11', '4-5', '2-13', '5-1']);

  return (
    <svg viewBox={SCENE_VIEWBOX} className="h-full w-full" role="img" aria-label="Ein Fräulein vom Amt steckt am Klinkenfeld ein Kabel.">
      <defs>
        <linearGradient id="sb-room" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bg} />
          <stop offset="100%" stopColor={bgDeep} />
        </linearGradient>
        <radialGradient id="sb-light" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff0cc" stopOpacity="0.95" />
          <stop offset="60%" stopColor={glow} stopOpacity="0.55" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="460" fill="url(#sb-room)" />

      {/* Die Wand aus Klinkenfeldern, ein geometrisches Muster. */}
      <rect x={x0 - 28} y={y0 - 26} width={cols * dx + 12} height={rows * dy + 16} rx="4" fill={bgDeep} opacity={0.55} />
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const key = `${r}-${c}`;
          const cx = x0 + c * dx;
          const cy = y0 + r * dy;
          const isLit = lit.has(key);
          return (
            <g key={key}>
              {isLit && !reduced && (
                <motion.circle
                  cx={cx} cy={cy} r="13" fill="url(#sb-light)"
                  animate={{ opacity: [0.2, 1, 0.3, 0.85, 0.2] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: (r + c) * 0.4 }}
                />
              )}
              <circle cx={cx} cy={cy} r="4.5" fill={accentSoft} opacity={0.9} />
              <circle cx={cx} cy={cy} r="2" fill={isLit ? glow : accent} opacity={isLit ? 0.95 : 0.5} />
            </g>
          );
        })
      )}

      {/* Das Kabel, gezogen und gesteckt. */}
      {reduced ? (
        <path d="M322 300 Q 410 342 470 158" stroke={glow} strokeWidth={2.4} fill="none" opacity={0.85} />
      ) : (
        <motion.path
          stroke={glow} strokeWidth={2.4} fill="none" opacity={0.85} strokeLinecap="round"
          animate={{ d: ['M322 300 Q 408 340 470 158', 'M322 300 Q 436 340 558 158'] }}
          transition={{ duration: 5.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      )}
      {/* Der Stecker am Kabelende. */}
      {!reduced ? (
        <motion.circle
          r="5" fill="#fff0cc"
          animate={{ cx: [470, 558], cy: [158, 158] }}
          transition={{ duration: 5.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      ) : (
        <circle cx="470" cy="158" r="5" fill="#fff0cc" />
      )}

      {/* Die Frau mit Kopfhoerer im Vordergrund. */}
      <g fill={bgDeep}>
        <path d="M250 360 C 252 326, 244 296, 268 286 C 292 278, 318 286, 326 308 C 332 326, 330 344, 332 360 Z" />
        <circle cx="296" cy="266" r="20" />
        {/* Kopfband des Kopfhoerers */}
        <path d="M278 258 Q 296 236 314 258" stroke={bgDeep} strokeWidth={3} fill="none" />
        <circle cx="278" cy="266" r="5" />
        {/* Hochgefuehrter Arm zum Kabel */}
        <path d="M312 312 Q 322 300 322 296" stroke={bgDeep} strokeWidth={7} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}
