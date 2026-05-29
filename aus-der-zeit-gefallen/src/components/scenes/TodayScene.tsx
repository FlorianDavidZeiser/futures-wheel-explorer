import { motion } from 'framer-motion';
import { SCENE_VIEWBOX, type SceneProps } from './sceneTypes';

// 2026. Das Heute, bewusst gewoehnlich. Ein Schreibtisch, ein Bildschirm, das
// kalte blaue Leuchten eines Monitors in einem ansonsten dunklen Raum. Der
// kaelteste Punkt des ganzen Stuecks. Die Waerme ist erloschen.
export function TodayScene({ palette, reduced }: SceneProps) {
  const { bgDeep, glow, accent, accentSoft } = palette;

  return (
    <svg viewBox={SCENE_VIEWBOX} className="h-full w-full" role="img" aria-label="Ein Mensch sitzt im kalten blauen Licht eines Bildschirms in einem dunklen Raum.">
      <defs>
        <radialGradient id="td-screenglow" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor={glow} stopOpacity="0.5" />
          <stop offset="45%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="td-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fb0ec" />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
      </defs>

      {/* Der dunkle Raum. */}
      <rect x="0" y="0" width="800" height="460" fill={bgDeep} />

      {/* Das kalte Leuchten des Monitors in den Raum. */}
      <motion.rect
        x="0" y="0" width="800" height="460" fill="url(#td-screenglow)"
        animate={reduced ? undefined : { opacity: [0.9, 1, 0.94, 1, 0.9] }}
        transition={reduced ? undefined : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Der Schreibtisch. */}
      <rect x="120" y="356" width="560" height="10" rx="2" fill={accentSoft} opacity={0.7} />
      <rect x="150" y="366" width="8" height="70" fill={accentSoft} opacity={0.5} />
      <rect x="642" y="366" width="8" height="70" fill={accentSoft} opacity={0.5} />

      {/* Der Monitor. */}
      <g>
        <rect x="356" y="150" width="200" height="128" rx="6" fill={bgDeep} stroke={accentSoft} strokeWidth={3} />
        <rect x="368" y="162" width="176" height="104" rx="2" fill="url(#td-screen)" opacity={0.92} />
        {/* Kalte Zeilen auf dem Bildschirm. */}
        <g fill="#cfe3ff" opacity={0.5}>
          <rect x="380" y="178" width="120" height="4" rx="2" />
          <rect x="380" y="192" width="148" height="4" rx="2" />
          <rect x="380" y="206" width="96" height="4" rx="2" />
          <rect x="380" y="232" width="132" height="4" rx="2" />
        </g>
        <rect x="448" y="278" width="16" height="46" fill={accentSoft} />
        <rect x="416" y="324" width="80" height="8" rx="3" fill={accentSoft} />
      </g>

      {/* Die im Gegenlicht sitzende Figur. */}
      <g>
        <path
          d="M300 356 C 304 312, 292 280, 332 262 C 366 248, 408 256, 420 280 C 430 300, 426 332, 428 356 Z"
          fill={bgDeep}
        />
        <circle cx="372" cy="244" r="24" fill={bgDeep} />
        {/* Kalter Lichtsaum vom Bildschirm. */}
        <path d="M396 232 A 24 24 0 0 1 396 256" stroke={glow} strokeWidth={2.2} fill="none" opacity={0.7} />
        <path d="M418 286 Q 426 320 426 352" stroke={glow} strokeWidth={2} fill="none" opacity={0.45} />
      </g>
    </svg>
  );
}
