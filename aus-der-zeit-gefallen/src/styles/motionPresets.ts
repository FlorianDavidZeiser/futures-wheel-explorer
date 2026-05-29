import type { Variants } from 'framer-motion';

// Animationsgrundsaetze. Alles ease-out, ruhig, organisch. Keine Bounces, kein
// Springen. Uebergaenge wie ein langsames, schweres Umblaettern. Bei Reduced
// Motion bleiben nur einfache, kurze Fades.

export function sceneVariants(reduced: boolean): Variants {
  if (reduced) {
    return {
      initial: { opacity: 0 },
      enter: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
      exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    };
  }
  return {
    initial: { opacity: 0, y: 14, filter: 'blur(6px)' },
    enter: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.95, ease: [0.22, 0.61, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -10,
      filter: 'blur(6px)',
      transition: { duration: 0.5, ease: [0.4, 0, 0.4, 1] },
    },
  };
}

// Ruhiges, gestaffeltes Erscheinen der Textzeilen innerhalb einer Station.
export function stagger(reduced: boolean, delay = 0) {
  return reduced
    ? { duration: 0.25, ease: 'easeOut', delay: 0 }
    : { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] as const, delay };
}
