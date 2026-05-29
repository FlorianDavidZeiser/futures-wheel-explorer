import { useEffect, useState } from 'react';

// Reduced-Motion-Einstellung respektieren. Ist sie aktiv, werden alle Bewegungen
// auf einfache, kurze Fades reduziert und das Hochzaehlen der Jahreszahl wird zu
// einem schlichten Wechsel.
export function usePrefersReducedMotion(): boolean {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setReduced(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
