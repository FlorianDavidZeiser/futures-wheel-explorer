import { motion } from 'framer-motion';
import { SCENE_VIEWBOX, type SceneProps } from './sceneTypes';

// 1890. Eine enge Gasse vor Sonnenaufgang, kaltes Schiefergrau. Eine Figur mit
// langem Rohr, das zum Fenster zeigt. Die eine Bewegung ist das warme Licht des
// einen erwachenden Fensters, das ruhig atmet, der emotionale Anker der kalten
// Szene. Alles andere steht still.
export function KnockerUpScene({ palette, reduced, active = true }: SceneProps) {
  const { bg, bgDeep, glow, accent, accentSoft } = palette;
  const still = reduced || !active;

  // Dunkle, kalte Fensterreihen als Andeutung der schlafenden Stadt.
  const cold: { x: number; y: number }[] = [];
  for (let r = 0; r < 4; r++) {
    cold.push({ x: 70, y: 92 + r * 66 }, { x: 110, y: 92 + r * 66 });
    cold.push({ x: 690, y: 92 + r * 66 });
  }

  return (
    <svg viewBox={SCENE_VIEWBOX} className="h-full w-full" role="img" aria-label="Ein Weckdienst steht mit langem Rohr in der dunklen Gasse vor einem erleuchteten Fenster.">
      <defs>
        <linearGradient id="ku-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bgDeep} />
          <stop offset="52%" stopColor={bg} />
          <stop offset="100%" stopColor="#0b1116" />
        </linearGradient>
        <linearGradient id="ku-wet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.2" />
          <stop offset="100%" stopColor={bgDeep} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ku-win" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe2ab" stopOpacity="0.95" />
          <stop offset="42%" stopColor={glow} stopOpacity="0.6" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="460" fill="url(#ku-sky)" />

      {/* Tiefe durch gestaffelte Fassaden, die die enge Gasse rahmen. */}
      <polygon points="0,40 150,40 150,460 0,460" fill={bgDeep} />
      <polygon points="150,70 232,104 232,460 150,460" fill={bgDeep} opacity={0.92} />
      <polygon points="800,40 640,40 640,460 800,460" fill={bgDeep} />
      <polygon points="640,64 566,100 566,460 640,460" fill={bgDeep} opacity={0.92} />
      {/* Angedeutete Dachkante mit Schornstein. */}
      <rect x="86" y="20" width="20" height="22" fill={bgDeep} />

      {/* Kalte, schlafende Fenster. */}
      {cold.map((w, i) => (
        <rect key={i} x={w.x} y={w.y} width="22" height="30" rx="1.5" fill={accent} opacity={0.16} />
      ))}

      {/* Das eine erleuchtete Fenster, die eine ruhige Bewegung. */}
      <motion.circle
        cx="701" cy="158" r="62" fill="url(#ku-win)"
        animate={still ? { opacity: 0.92 } : { opacity: [0.74, 1, 0.86, 0.74] }}
        transition={still ? undefined : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <rect x="690" y="143" width="22" height="30" rx="1.5" fill={glow} opacity={0.95} />
      <line x1="701" y1="143" x2="701" y2="173" stroke={bgDeep} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      <line x1="690" y1="158" x2="712" y2="158" stroke={bgDeep} strokeWidth={1} vectorEffect="non-scaling-stroke" />

      {/* Nasses Pflaster, eine ruhige Spiegelung des Lichts. */}
      <rect x="150" y="360" width="490" height="100" fill="url(#ku-wet)" />
      <rect x="676" y="360" width="18" height="96" fill={glow} opacity={0.1} />
      <rect x="230" y="372" width="330" height="2" fill={glow} opacity={0.08} />

      {/* Die Figur mit dem langen Rohr, zum erleuchteten Fenster gehoben. */}
      <g fill={bgDeep}>
        <line x1="352" y1="262" x2="640" y2="176" stroke={bgDeep} strokeWidth={3} strokeLinecap="round" />
        <path d="M330 360 C 332 332, 328 300, 340 286 C 347 278, 360 278, 366 288 C 374 302, 370 334, 372 360 Z" />
        <circle cx="350" cy="272" r="10" />
        <path d="M336 266 L366 266 L362 258 L340 258 Z" />
        <path d="M320 360 L380 360 L374 404 L326 404 Z" />
      </g>

      <ellipse cx="360" cy="450" rx="120" ry="14" fill={accentSoft} opacity={0.14} />
    </svg>
  );
}
