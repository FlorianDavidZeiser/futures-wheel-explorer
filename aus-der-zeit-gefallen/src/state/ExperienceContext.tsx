import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

// Schlanker State. In der Scroll-Fassung treibt der Scroll selbst die Reise,
// gespeichert werden muss nur der eingegebene Beruf. Der runKey setzt das Stueck
// fuer "noch einmal" sauber zurueck, indem die Reise neu aufgebaut wird.
interface ContextValue {
  profession: string;
  setProfession: (value: string) => void;
  runKey: number;
  reset: () => void;
}

const ExperienceContext = createContext<ContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [profession, setProfession] = useState('');
  const [runKey, setRunKey] = useState(0);

  const reset = useCallback(() => {
    setProfession('');
    setRunKey((k) => k + 1);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const value = useMemo(
    () => ({ profession, setProfession, runKey, reset }),
    [profession, runKey, reset]
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience(): ContextValue {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error('useExperience muss innerhalb von ExperienceProvider verwendet werden.');
  }
  return ctx;
}
