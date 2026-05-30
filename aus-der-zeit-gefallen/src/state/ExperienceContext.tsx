import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

// Schlanker State. Gespeichert werden der eingegebene Beruf und ob die Reise
// begonnen hat. Der runKey setzt das Stueck fuer "noch einmal" sauber zurueck.
interface ContextValue {
  profession: string;
  setProfession: (value: string) => void;
  started: boolean;
  setStarted: (value: boolean) => void;
  runKey: number;
  reset: () => void;
}

const ExperienceContext = createContext<ContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [profession, setProfession] = useState('');
  const [started, setStarted] = useState(false);
  const [runKey, setRunKey] = useState(0);

  const reset = useCallback(() => {
    setProfession('');
    setStarted(false);
    setRunKey((k) => k + 1);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  const value = useMemo(
    () => ({ profession, setProfession, started, setStarted, runKey, reset }),
    [profession, started, runKey, reset]
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
