import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

// Schlanker State. Gespeichert wird nur der eingegebene Beruf. Der Ablauf selbst
// liegt als Screen-Index in der Buehne. reset leert den Beruf fuer "noch einmal".
interface ContextValue {
  profession: string;
  setProfession: (value: string) => void;
  reset: () => void;
}

const ExperienceContext = createContext<ContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [profession, setProfession] = useState('');

  const reset = useCallback(() => {
    setProfession('');
  }, []);

  const value = useMemo(() => ({ profession, setProfession, reset }), [profession, reset]);

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience(): ContextValue {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error('useExperience muss innerhalb von ExperienceProvider verwendet werden.');
  }
  return ctx;
}
