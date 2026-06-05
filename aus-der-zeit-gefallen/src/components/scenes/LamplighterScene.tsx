import { motion } from 'framer-motion';
import { SCENE_VIEWBOX, type SceneProps } from './sceneTypes';

// 1850. Eine Stadt im naechtlichen Indigo, ein Mensch mit langer Stange an einer
// Laterne. Beim Eintreten gehen die Laternen nacheinander an. Die Kernbewegung
// ist das langsame Heben der Stange, die Flamme flackert sanft. Im dritten Beat
// verblasst die Figur, die Laternen leuchten gleichmaessig und kuehl von selbst.
export function LamplighterScene({ palette, reduced, active = true, beat = 0 }: SceneProps) {
  const { bg, bgDeep, glow, accent, accentSoft } = palette;
  const still = reduced || !active;
  const aged = beat >= 2;

  const chain = [
    { x: 250, y: 250, r: 5 },
    { x: 360, y: 238, r: 4 },
    { x: 455, y: 230, r: 3.2 },
    { x: 535, y: 224, r: 2.6 },
  ];

  return (
    <svg viewBox={SCENE_VIEWBOX} className="h-full w-full" role="img" aria-label="Ein Laternenanzünder hebt seine Stange an eine Gaslaterne.">
      <defs>
        <linearGradient id="ll-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bgDeep} />
          <stop offset="58%" stopColor={bg} />
          <stop offset="100%" stopColor={bgDeep} />
        </linearGradient>
        <radialGradient id="ll-lamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3d6" stopOpacity="0.95" />
          <stop offset="35%" stopColor={glow} stopOpacity="0.8" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ll-dot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3d6" stopOpacity="0.85" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="460" fill="url(#ll-sky)" />

      {/* A3, Dunst, der ganz langsam ueber den Daechern zieht. */}
      <motion.ellipse
        cx="320" cy="362" rx="300" ry="36" fill={glow} opacity={0.05}
        animate={still ? undefined : { cx: [300, 360, 300] }}
        transition={still ? undefined : { duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <ellipse cx="540" cy="398" rx="340" ry="30" fill={glow} opacity={0.04} />

      {/* Stadtsilhouette, dunkle Daecher. */}
      <path
        d="M0 360 L0 300 L40 300 L40 270 L90 270 L90 310 L150 310 L150 250 L175 250 L175 230 L200 230 L200 285 L260 285 L260 300 L330 300 L330 262 L360 240 L390 262 L390 300 L470 300 L470 275 L520 275 L520 250 L545 250 L545 300 L620 300 L620 285 L690 285 L690 305 L760 305 L760 290 L800 290 L800 460 L0 460 Z"
        fill={bgDeep}
        opacity={0.96}
      />

      {/* A4, die Kette aus Laternen geht beim Eintreten nacheinander an. */}
      {chain.map((c, i) => (
        <motion.g
          key={i}
          initial={still ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={still ? { duration: 0 } : { duration: 1, ease: 'easeOut', delay: 0.3 + i * 0.5 }}
        >
          <circle cx={c.x} cy={c.y} r={c.r * 4.2} fill="url(#ll-dot)" opacity={0.8} />
          <circle cx={c.x} cy={c.y} r={c.r} fill="#fff3d6" opacity={0.95} />
          <line x1={c.x} y1={c.y + c.r} x2={c.x} y2={c.y + c.r + 26} stroke={bgDeep} strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
        </motion.g>
      ))}

      {/* A2, die Flamme der vorderen Laterne flackert sanft und unregelmaessig. */}
      <motion.circle
        cx="610" cy="196" r="74" fill="url(#ll-lamp)"
        initial={still ? false : { opacity: 0 }}
        animate={still ? { opacity: 1 } : { opacity: [0, 0.86, 1, 0.9, 0.99, 0.88, 0.96], scale: [0.9, 1.02, 0.99, 1.03, 1, 1.02, 1] }}
        transition={still ? { duration: 0 } : { duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: still ? 0 : 2.4 }}
        style={{ transformOrigin: '610px 196px' }}
      />

      {/* Der vordere Laternenpfahl. */}
      <g>
        <rect x="606" y="196" width="8" height="170" fill={bgDeep} />
        <path d="M592 196 L628 196 L622 168 L598 168 Z" fill={bgDeep} />
        <rect x="598" y="170" width="24" height="24" rx="2" fill={glow} opacity={0.92} />
        <path d="M600 168 L620 168 L610 156 Z" fill={bgDeep} />
      </g>

      {/* A1 und A5, die Figur hebt langsam die Stange. Im dritten Beat verblasst sie. */}
      <motion.g
        fill={bgDeep}
        initial={false}
        animate={{ opacity: aged ? 0 : 1, y: aged ? 6 : 0 }}
        transition={{ duration: reduced ? 0.3 : 1.8, ease: 'easeInOut' }}
      >
        <motion.g
          animate={still ? undefined : { y: [0, -3, 0], rotate: [0, -1.2, 0] }}
          transition={still ? undefined : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '540px 300px' }}
        >
          <line x1="540" y1="300" x2="606" y2="184" stroke={bgDeep} strokeWidth={3.2} strokeLinecap="round" />
          <path d="M520 300 C 522 286, 520 270, 528 258 C 533 250, 543 248, 548 256 C 553 264, 552 282, 552 300 Z" />
          <circle cx="538" cy="246" r="9" />
          <path d="M526 240 L552 240 L550 234 L528 234 Z" />
          <rect x="532" y="226" width="12" height="10" rx="2" />
          <path d="M512 300 L560 300 L556 336 L516 336 Z" />
        </motion.g>
      </motion.g>

      {/* A5, im Nachher legt sich ein kuehler, gleichmaessiger Schein ueber die Stadt,
          die Laternen brennen von selbst weiter. */}
      <motion.rect
        x="0" y="0" width="800" height="460" fill={accent}
        initial={false}
        animate={{ opacity: aged ? 0.16 : 0 }}
        transition={{ duration: reduced ? 0.3 : 2, ease: 'easeInOut' }}
        style={{ mixBlendMode: 'screen' }}
      />

      <ellipse cx="400" cy="450" rx="380" ry="20" fill={accentSoft} opacity={0.12} />
    </svg>
  );
}
