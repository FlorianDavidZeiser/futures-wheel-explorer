import { SCENE_VIEWBOX, type SceneProps } from './sceneTypes';

// Die fuenfte Station. Kein gemaltes Bild, sondern eine leere, gesichtslose
// Silhouette, ein menschlicher Umriss ohne Zuege. Die vier Vergangenen haben ein
// Gesicht und eine Szene, die Zukunft des Nutzers hat noch keine. Diese Leere
// ist unheimlicher als jedes Bild.
export function SilhouetteScene({ palette }: SceneProps) {
  const { bg, bgDeep, accent, accentSoft } = palette;

  return (
    <svg viewBox={SCENE_VIEWBOX} className="h-full w-full" role="img" aria-label="Eine leere, gesichtslose Silhouette eines Menschen.">
      <defs>
        <linearGradient id="si-room" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={bg} />
          <stop offset="100%" stopColor={bgDeep} />
        </linearGradient>
        <linearGradient id="si-bust" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.52" />
          <stop offset="100%" stopColor={accentSoft} stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="si-vignette" cx="50%" cy="42%" r="60%">
          <stop offset="60%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="460" fill="url(#si-room)" />

      {/* Eine leere Vitrinen-Nische, in der sonst die Szene staende. */}
      <rect x="262" y="40" width="276" height="380" rx="3" fill={bgDeep} opacity={0.32} />
      <rect x="262" y="40" width="276" height="380" rx="3" fill="none" stroke={accentSoft} strokeWidth={1} opacity={0.32} vectorEffect="non-scaling-stroke" />

      {/* Ein angedeuteter Sockel, auf dem die Bueste steht. */}
      <ellipse cx="400" cy="392" rx="92" ry="12" fill={accentSoft} opacity={0.28} />
      <rect x="338" y="378" width="124" height="16" rx="2" fill={accentSoft} opacity={0.22} />

      {/* Der gesichtslose Umriss als ruhige museale Bueste, Kopf, Hals, Schultern. */}
      <path
        d="M400 112
           C 374 112 356 134 356 164
           C 356 190 368 210 386 220
           C 372 226 360 238 354 256
           C 332 262 312 276 300 300
           L 300 372
           C 300 378 308 382 400 382
           C 492 382 500 378 500 372
           L 500 300
           C 488 276 468 262 446 256
           C 440 238 428 226 414 220
           C 432 210 444 190 444 164
           C 444 134 426 112 400 112 Z"
        fill="url(#si-bust)"
        stroke={accentSoft}
        strokeWidth={1.1}
        strokeOpacity={0.45}
        vectorEffect="non-scaling-stroke"
      />

      <rect x="0" y="0" width="800" height="460" fill="url(#si-vignette)" />
    </svg>
  );
}
