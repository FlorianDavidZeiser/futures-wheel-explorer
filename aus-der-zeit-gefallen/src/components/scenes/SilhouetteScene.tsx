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
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accentSoft} stopOpacity="0.42" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="800" height="460" fill="url(#si-room)" />

      {/* Eine leere Vitrinen-Nische, in der sonst die Szene staende. */}
      <rect x="250" y="44" width="300" height="372" rx="3" fill={bgDeep} opacity={0.35} />
      <rect x="250" y="44" width="300" height="372" rx="3" fill="none" stroke={accentSoft} strokeWidth={1} opacity={0.35} />

      {/* Der gesichtslose Umriss, Kopf, Hals, Schultern. Keine Zuege. */}
      <g>
        <path
          d="M400 120
             C 372 120 352 144 352 176
             C 352 200 366 220 386 230
             C 360 238 344 252 344 268
             L 348 360
             C 348 372 360 380 400 380
             C 440 380 452 372 452 360
             L 456 268
             C 456 252 440 238 414 230
             C 434 220 448 200 448 176
             C 448 144 428 120 400 120 Z"
          fill="url(#si-bust)"
          stroke={accentSoft}
          strokeWidth={1.2}
          strokeOpacity={0.5}
        />
      </g>
    </svg>
  );
}
