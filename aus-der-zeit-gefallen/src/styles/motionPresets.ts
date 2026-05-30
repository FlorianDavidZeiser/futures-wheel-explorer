import type { Variants } from 'framer-motion';

// Animationsgrundsaetze. Alles ease-out, ruhig, organisch. Keine Bounces, kein
// Springen. Die Elemente erscheinen scroll-getrieben, ein Atemzug nach dem
// anderen. Bei Reduced Motion bleiben nur einfache, kurze Fades, die
// Scroll-Struktur aber unveraendert.

const SOFT = [0.22, 0.61, 0.36, 1] as const;

// Ein Element taucht ruhig auf, wenn es in den Blick scrollt.
export function reveal(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      shown: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut', delay: Math.min(delay, 0.2) } },
    };
  }
  return {
    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
    shown: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.5, ease: SOFT, delay },
    },
  };
}

// Der Vorhang des Eingangs, langsamer und schwerer als ein gewoehnliches Auftauchen.
export function curtain(reduced: boolean, delay = 0): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      shown: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut', delay: Math.min(delay, 0.3) } },
    };
  }
  return {
    hidden: { opacity: 0, y: 14 },
    shown: { opacity: 1, y: 0, transition: { duration: 2, ease: SOFT, delay } },
  };
}
