import { motion } from 'framer-motion';
import { SCENE_VIEWBOX, type SceneProps } from './sceneTypes';

// 1850. Eine Stadt im naechtlichen Indigo, ein Mensch mit langer Stange hebt sie
// an eine Laterne, das Licht flammt warm auf und flackert. Hinter ihm eine Kette
// bereits brennender Laternen, leiser Nebel zieht.
export function LamplighterScene({ palette, reduced }: SceneProps) {
  const { bg, bgDeep, glow, accent, accentSoft } = palette;

  // Die zurueckweichende Kette aus Licht.
  const chain = [
    { x: 250, y: 250, r: 5, lit: true },
    { x: 360, y: 238, r: 4, lit: true },
    { x: 455, y: 230, r: 3.2, lit: true },
    { x: 535, y: 224, r: 2.6, lit: true },
    { x: 600, y: 220, r: 2.1, lit: false },
  ];

  return (
    <svg viewBox={SCENE_VIEWBOX} className="h-full w-full" role="img" aria-label="Ein Laternenanzünder hebt seine Stange an eine Gaslaterne.">
      <defs>
        <linearGradient id="ll-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bgDeep} />
          <stop offset="60%" stopColor={bg} />
          <stop offset="100%" stopColor={bgDeep} />
        </linearGradient>
        <radialGradient id="ll-lamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3d6" stopOpacity="0.95" />
          <stop offset="35%" stopColor={glow} stopOpacity="0.8" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="460" fill="url(#ll-sky)" />

      {/* Driftender Nebel, ganz langsam und unterschwellig. */}
      {!reduced && (
        <>
          <motion.ellipse
            cx="300" cy="360" rx="260" ry="34" fill={accent} opacity={0.05}
            animate={{ cx: [300, 520, 300] }}
            transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.ellipse
            cx="560" cy="395" rx="320" ry="30" fill={accent} opacity={0.04}
            animate={{ cx: [560, 320, 560] }}
            transition={{ duration: 46, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}

      {/* Stadtsilhouette, dunkle Daecher. */}
      <path
        d="M0 360 L0 300 L40 300 L40 270 L90 270 L90 310 L150 310 L150 250 L175 250 L175 230 L200 230 L200 285 L260 285 L260 300 L330 300 L330 262 L360 240 L390 262 L390 300 L470 300 L470 275 L520 275 L520 250 L545 250 L545 300 L620 300 L620 285 L690 285 L690 305 L760 305 L760 290 L800 290 L800 460 L0 460 Z"
        fill={bgDeep}
        opacity={0.96}
      />

      {/* Kette bereits brennender Laternen, zurueckweichend. */}
      {chain.map((c, i) => (
        <g key={i}>
          {c.lit && (
            <motion.circle
              cx={c.x} cy={c.y} r={c.r * 4.5} fill="url(#ll-lamp)"
              animate={reduced ? undefined : { opacity: [0.7, 1, 0.78, 0.95, 0.7] }}
              transition={reduced ? undefined : { duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <circle cx={c.x} cy={c.y} r={c.r} fill={c.lit ? '#fff3d6' : accentSoft} opacity={c.lit ? 0.95 : 0.5} />
          <line x1={c.x} y1={c.y + c.r} x2={c.x} y2={c.y + c.r + 26} stroke={bgDeep} strokeWidth={1.4} />
        </g>
      ))}

      {/* Der vordere Laternenpfahl mit warmem Glimmen. */}
      <g>
        <motion.circle
          cx="610" cy="196" r="74" fill="url(#ll-lamp)"
          animate={reduced ? undefined : { opacity: [0.82, 1, 0.86, 0.98, 0.82], scale: [1, 1.03, 0.99, 1.02, 1] }}
          transition={reduced ? undefined : { duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '610px 196px' }}
        />
        <rect x="606" y="196" width="8" height="170" fill={bgDeep} />
        {/* Laternenkopf */}
        <path d="M592 196 L628 196 L622 168 L598 168 Z" fill={bgDeep} />
        <rect x="598" y="170" width="24" height="24" rx="2" fill={glow} opacity={0.92} />
        <path d="M600 168 L620 168 L610 156 Z" fill={bgDeep} />
      </g>

      {/* Die Figur mit der gehobenen Stange. */}
      <g fill={bgDeep}>
        {/* Stange, zur Laterne gehoben */}
        <line x1="540" y1="300" x2="606" y2="184" stroke={bgDeep} strokeWidth={3.2} strokeLinecap="round" />
        {/* Koerper */}
        <path d="M520 300 C 522 286, 520 270, 528 258 C 533 250, 543 248, 548 256 C 553 264, 552 282, 552 300 Z" />
        {/* Kopf mit Huetchen */}
        <circle cx="538" cy="246" r="9" />
        <path d="M526 240 L552 240 L550 234 L528 234 Z" />
        <rect x="532" y="226" width="12" height="10" rx="2" />
        {/* Mantelsaum */}
        <path d="M512 300 L560 300 L556 336 L516 336 Z" />
      </g>
    </svg>
  );
}
