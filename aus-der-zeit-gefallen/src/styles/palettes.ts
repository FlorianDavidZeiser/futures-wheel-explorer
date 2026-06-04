// Der Temperaturbogen.
//
// Die Farbwelt kuehlt von Station zu Station ab, waehrend die Zeit auf die
// Gegenwart zulaeuft. Das wird nie erklaert, nur gezeigt. Am Anfang traegt ein
// Mensch warmes Feuer durch die dunkle Stadt, am Ende sitzt ein Mensch im kalten
// Licht des Bildschirms.

import type { CSSProperties } from 'react';

export interface Palette {
  /** Seitenhintergrund, oben. */
  bg: string;
  /** Seitenhintergrund, unten, tiefer. */
  bgDeep: string;
  /** Primaerer Text, Titel, Jahreszahl, Berufsname. */
  ink: string;
  /** Sekundaerer Text, die Geschichte. */
  inkSoft: string;
  /** Tertiaerer Text, die Abloese-Zeile, leiser. */
  inkFaint: string;
  /** Warmer Lichtakzent der Szene. */
  glow: string;
  /** Flaechiger Szenenakzent. */
  accent: string;
  /** Gedaempfter Szenenakzent. */
  accentSoft: string;
  /**
   * Grundlegende museale Patina dieser Station, 0 bis 1.
   * Die historischen Stationen tragen sie von Anfang an. Nur das Heute ist
   * zuerst klar und kalt und bekommt seine Patina erst in der Wendung.
   */
  patinaBase: number;
}

export type LookId =
  | 'intro'
  | 'lamplighter'
  | 'knockerup'
  | 'switchboard'
  | 'computer'
  | 'today';

export const palettes: Record<LookId, Palette> = {
  // Der Eingang. Fast schwarz, ein einzelner warmer Schein glimmt auf.
  intro: {
    bg: '#0a0e1a',
    bgDeep: '#05070f',
    ink: '#f1e6d0',
    inkSoft: '#c9b89b',
    inkFaint: '#b3a37c',
    glow: '#ffcf87',
    accent: '#f2a94e',
    accentSoft: '#7a5a2a',
    patinaBase: 0.05,
  },

  // 1850. Am waermsten. Tiefes naechtliches Indigo, warmer Bernstein, Goldgelb.
  lamplighter: {
    bg: '#0e1530',
    bgDeep: '#070b1c',
    ink: '#f3e7cf',
    inkSoft: '#d6c5a4',
    inkFaint: '#c2aa7d',
    glow: '#ffcf87',
    accent: '#f2a94e',
    accentSoft: '#6f4e22',
    patinaBase: 0.16,
  },

  // 1890. Kuehler, haerter. Nasses Schiefergrau, kaltes Blau der Daemmerung.
  // Ein einziger warmer Lichtpunkt, das Fenster, das aufwacht.
  knockerup: {
    bg: '#121a24',
    bgDeep: '#080d14',
    ink: '#e6ddcc',
    inkSoft: '#bcbdb4',
    inkFaint: '#aab4bd',
    glow: '#f0c074',
    accent: '#46606f',
    accentSoft: '#243441',
    patinaBase: 0.16,
  },

  // 1930. Drinnen, kuenstliches Licht. Messing, gedaempftes Creme, Warmweiss,
  // aber schon ohne Naturwaerme. Geordnet, technisch.
  switchboard: {
    bg: '#16161b',
    bgDeep: '#0c0c10',
    ink: '#ede0c4',
    inkSoft: '#cbb792',
    inkFaint: '#c2ad7e',
    glow: '#e8c987',
    accent: '#c79a4e',
    accentSoft: '#5e4a28',
    patinaBase: 0.16,
  },

  // 1950. Fast kalt. Nuechternes Grau, fahles Papiergruen, sachliches Licht.
  computer: {
    bg: '#161a18',
    bgDeep: '#0c100e',
    ink: '#dde2da',
    inkSoft: '#b1bcae',
    inkFaint: '#a6b1a6',
    glow: '#cfd8c4',
    accent: '#879a85',
    accentSoft: '#46524a',
    patinaBase: 0.16,
  },

  // 2026. Das kalte Blau eines Bildschirms in einem dunklen Raum.
  // Der kaelteste Punkt. Zuerst klar und unverfremdet, ohne Patina.
  today: {
    bg: '#070a10',
    bgDeep: '#03050a',
    ink: '#cdd9e6',
    inkSoft: '#9aacbe',
    inkFaint: '#92a2b4',
    glow: '#5b93d6',
    accent: '#3a6ea5',
    accentSoft: '#1d3a5c',
    patinaBase: 0,
  },
};

// Stuetzpunkte des Temperaturbogens, an die Jahreszahl gebunden. Zwischen ihnen
// kuehlt die Farbwelt waehrend des Scrollens ruhig und stetig ab. Jenseits von
// 2026 bleibt es beim kalten Heute, die Patina altert dann nur das Bild.
export const ARC_YEARS = [1850, 1890, 1930, 1950, 2026];
export const ARC_LOOKS: LookId[] = ['lamplighter', 'knockerup', 'switchboard', 'computer', 'today'];

/** Liefert die Farbwerte eines Feldes ueber alle Stuetzpunkte des Bogens. */
export function arcStops(field: keyof Palette): string[] {
  return ARC_LOOKS.map((l) => palettes[l][field] as string);
}

/** Wandelt eine Palette in CSS-Variablen fuer einen Container. */
export function paletteVars(p: Palette): CSSProperties {
  return {
    ['--bg' as string]: p.bg,
    ['--bg-deep' as string]: p.bgDeep,
    ['--ink' as string]: p.ink,
    ['--ink-soft' as string]: p.inkSoft,
    ['--ink-faint' as string]: p.inkFaint,
    ['--glow' as string]: p.glow,
    ['--accent' as string]: p.accent,
    ['--accent-soft' as string]: p.accentSoft,
  };
}
