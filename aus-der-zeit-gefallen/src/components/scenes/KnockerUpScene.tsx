import { motion } from 'framer-motion';
import { SCENE_VIEWBOX, type SceneProps } from './sceneTypes';

// 1920. Eine dunkle, enge Gasse vor Sonnenaufgang. Eine Figur mit langem Rohr
// schiesst eine Erbse ans Fenster, hinter dem Glas glimmt ein einzelnes warmes
// Licht. Dieser eine Lichtpunkt ist der emotionale Anker der kalten Szene.
export function KnockerUpScene({ palette, reduced }: SceneProps) {
  const { bg, bgDeep, glow, accent } = palette;

  // Dunkle Fensterreihen als Andeutung.
  const windows: { x: number; y: number }[] = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 2; c++) {
      windows.push({ x: 78 + c * 34, y: 96 + r * 64 });
      windows.push({ x: 648 + c * 34, y: 96 + r * 64 });
    }
  }

  return (
    <svg viewBox={SCENE_VIEWBOX} className="h-full w-full" role="img" aria-label="Ein Weckdienst schiesst in der dunklen Gasse eine Erbse an ein erleuchtetes Fenster.">
      <defs>
        <linearGradient id="ku-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bgDeep} />
          <stop offset="55%" stopColor={bg} />
          <stop offset="100%" stopColor="#0c1218" />
        </linearGradient>
        <linearGradient id="ku-wet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor={bgDeep} stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ku-win" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe2ab" stopOpacity="0.95" />
          <stop offset="40%" stopColor={glow} stopOpacity="0.7" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="460" fill="url(#ku-sky)" />

      {/* Zwei hohe Hausfassaden rahmen die enge Gasse. */}
      <rect x="0" y="40" width="190" height="420" fill={bgDeep} />
      <rect x="610" y="40" width="190" height="420" fill={bgDeep} />
      <polygon points="190,40 250,90 250,460 190,460" fill={bgDeep} opacity={0.9} />
      <polygon points="610,40 550,90 550,460 610,460" fill={bgDeep} opacity={0.9} />

      {/* Dunkle Fenster, kalt. */}
      {windows.map((w, i) => (
        <rect key={i} x={w.x} y={w.y} width="22" height="30" rx="1.5" fill={accent} opacity={0.18} />
      ))}

      {/* Das eine erleuchtete Fenster, der warme Anker. */}
      <g>
        <motion.circle
          cx="659" cy="143" r="60" fill="url(#ku-win)"
          animate={reduced ? undefined : { opacity: [0.78, 1, 0.85, 0.78] }}
          transition={reduced ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <rect x="648" y="128" width="22" height="30" rx="1.5" fill={glow} opacity={0.95} />
        <line x1="659" y1="128" x2="659" y2="158" stroke={bgDeep} strokeWidth={1} />
        <line x1="648" y1="143" x2="670" y2="143" stroke={bgDeep} strokeWidth={1} />
      </g>

      {/* Nasses Pflaster, eine Spiegelung. */}
      <rect x="190" y="360" width="420" height="100" fill="url(#ku-wet)" />
      <rect x="250" y="372" width="300" height="3" fill={glow} opacity={0.12} />

      {/* Die fliegende Erbse, von der Rohrspitze ans Glas. */}
      {!reduced && (
        <motion.circle
          r="3"
          fill="#ffe2ab"
          initial={{ cx: 372, cy: 250, opacity: 0 }}
          animate={{
            cx: [372, 520, 648],
            cy: [250, 175, 148],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeIn', times: [0, 0.55, 0.92, 1] }}
        />
      )}

      {/* Die Figur mit dem langen Rohr. */}
      <g fill={bgDeep}>
        <line x1="352" y1="262" x2="430" y2="206" stroke={bgDeep} strokeWidth={3.4} strokeLinecap="round" />
        <path d="M330 360 C 332 332, 328 300, 340 286 C 347 278, 360 278, 366 288 C 374 302, 370 334, 372 360 Z" />
        <circle cx="350" cy="272" r="10" />
        <path d="M336 266 L366 266 L362 258 L340 258 Z" />
        <path d="M320 360 L380 360 L374 404 L326 404 Z" />
      </g>
    </svg>
  );
}
